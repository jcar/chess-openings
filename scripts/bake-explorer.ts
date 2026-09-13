// Bake the Lichess Opening Explorer's sub-1200 statistics into static JSON, one
// tree per opening, so the bot can play what real opponents play at this level
// and the theory page can show "what you'll face" — with no runtime API calls.
//
// Run: npm run bake:explorer -- [--only <id>[,<id>]] [--maxPly 14] [--minFreq 0.05]
//                                [--minGames 200] [--topK 6] [--maxNodes 500]
// Expansion is BEST-FIRST by game share (the product of move frequencies from the
// root), capped at --maxNodes per opening, so the most-played lines are covered
// first and every opening costs a predictable number of requests.
// Needs LICHESS_TOKEN (env or .env). Without it: warn, exit 0, touch nothing.
// Output: public/data/explorer/<id>.json + public/data/explorer/index.json
// Resumable: raw responses are cached in scripts/.cache/explorer by EPD.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Chess } from "chess.js";
import { OPENINGS } from "../src/content";
import { definingSans } from "../src/lib/content/adaptLegacy";
import { epd, type EPD } from "../src/lib/book/key";
import { cached } from "./lib/cache";
import { ExplorerClient, SUB_1200, type ExplorerResponse } from "./lib/lichess";
import { lichessToken } from "./lib/env";

import type { BakedNode, ExplorerTree } from "../src/lib/book/explorer";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}
const num = (name: string, fallback: number) => {
  const v = Number(arg(name));
  return Number.isFinite(v) ? v : fallback;
};

const ONLY = arg("only")?.split(",").filter(Boolean);
const MAX_PLY = num("maxPly", 14);
const MIN_FREQ = num("minFreq", 0.05);
const MIN_GAMES = num("minGames", 200);
const TOP_K = num("topK", 6);
const MAX_NODES = num("maxNodes", 500);
const OUT_DIR = "public/data/explorer";

async function fetchNode(client: ExplorerClient, fen: string): Promise<{ res: ExplorerResponse; hit: boolean }> {
  const key = epd(fen);
  const { value, hit } = await cached<ExplorerResponse>("explorer-sub1200", key, () => client.lichess(fen, SUB_1200));
  return { res: value, hit };
}

/** White's score as an integer percentage (v2 schema: half the bytes of w/d/b). */
const scorePct = (w: number, d: number, b: number) => {
  const n = w + d + b;
  return n ? Math.round(((w + d / 2) / n) * 100) : 50;
};

function toNode(res: ExplorerResponse): BakedNode {
  return {
    n: res.white + res.draws + res.black,
    s: scorePct(res.white, res.draws, res.black),
    m: res.moves.map((m) => [m.uci, m.white + m.draws + m.black, scorePct(m.white, m.draws, m.black)]),
  };
}

async function bakeOpening(client: ExplorerClient, id: string): Promise<ExplorerTree> {
  const spec = OPENINGS.find((o) => o.id === id)!;
  // Seed lines: defining moves + every model game. Positions on these lines are
  // always expanded (they are the authored theory) regardless of frequency.
  const seedLines = [definingSans(spec), ...spec.modelGames.map((g) => g.sans)];
  const seedEpds = new Set<EPD>();
  const seedMoves = new Map<EPD, Set<string>>(); // epd -> uci moves that are on a seed line
  for (const sans of seedLines) {
    try {
      const game = new Chess();
      for (const san of sans) {
        const before = epd(game.fen());
        const mv = game.move(san);
        seedEpds.add(before);
        (seedMoves.get(before) ?? seedMoves.set(before, new Set()).get(before)!).add(mv.from + mv.to + (mv.promotion ?? ""));
      }
      seedEpds.add(epd(game.fen()));
    } catch (e) {
      console.warn(`  [${id}] illegal seed line skipped: ${sans.join(" ")} (${(e as Error).message})`);
    }
  }

  const nodes: Record<EPD, BakedNode> = {};
  const start = new Chess();
  // Priority queue by mass (share of root games reaching the node); seed-line
  // positions get mass 1 so authored theory is always covered.
  const queue: { fen: string; ply: number; mass: number }[] = [{ fen: start.fen(), ply: 0, mass: 1 }];
  const seen = new Set<EPD>();
  let hits = 0, misses = 0;

  while (queue.length && Object.keys(nodes).length < MAX_NODES) {
    queue.sort((a, b) => b.mass - a.mass);
    const { fen, ply, mass } = queue.shift()!;
    const key = epd(fen);
    if (seen.has(key)) continue;
    seen.add(key);

    const { res, hit } = await fetchNode(client, fen);
    if (hit) hits++;
    else misses++;
    const node = toNode(res);
    nodes[key] = node;
    if (misses % 10 === 0 && !hit) console.log(`  [${id}] ${Object.keys(nodes).length} nodes, ${client.requests} requests…`);

    if (ply >= MAX_PLY) continue;
    const onSeed = seedMoves.get(key) ?? new Set<string>();
    const children = node.m
      .filter(([uci, games]) => onSeed.has(uci) || (games >= MIN_GAMES && games / Math.max(1, node.n) >= MIN_FREQ))
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_K + onSeed.size);
    for (const [uci, games] of children) {
      const g = new Chess(fen);
      try {
        g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never });
      } catch {
        continue;
      }
      const childMass = onSeed.has(uci) ? Math.max(mass, 1) : mass * (games / Math.max(1, node.n));
      queue.push({ fen: g.fen(), ply: ply + 1, mass: seedEpds.has(epd(g.fen())) ? 1 : childMass });
    }
  }

  console.log(`  [${id}] done: ${Object.keys(nodes).length} nodes (${hits} cached, ${misses} fetched)`);
  return { v: 1, bakedAt: new Date().toISOString(), filter: { ...SUB_1200 }, root: epd(start.fen()), nodes };
}

async function main() {
  const token = lichessToken();
  if (!token) {
    console.warn("LICHESS_TOKEN not set — skipping explorer bake (existing JSON left untouched).");
    console.warn("Create a token at https://lichess.org/account/oauth/token (no scopes needed) and put it in .env");
    return;
  }
  const client = new ExplorerClient(token);
  const ids = OPENINGS.map((o) => o.id).filter((id) => !ONLY || ONLY.includes(id));
  if (ONLY) for (const id of ONLY) if (!ids.includes(id)) console.warn(`unknown opening id: ${id}`);
  mkdirSync(OUT_DIR, { recursive: true });

  const index: Record<string, { nodes: number; bakedAt: string }> = existsSync(`${OUT_DIR}/index.json`)
    ? JSON.parse(readFileSync(`${OUT_DIR}/index.json`, "utf8"))
    : {};

  let failed = 0;
  for (const id of ids) {
    console.log(`Baking ${id}…`);
    try {
      const tree = await bakeOpening(client, id);
      writeFileSync(`${OUT_DIR}/${id}.json`, JSON.stringify(tree));
      index[id] = { nodes: Object.keys(tree.nodes).length, bakedAt: tree.bakedAt };
      writeFileSync(`${OUT_DIR}/index.json`, JSON.stringify(index, null, 2));
    } catch (e) {
      // Network gave out mid-opening. Everything fetched so far is cached; a
      // rerun resumes. Don't let one opening sink the whole run.
      failed++;
      console.error(`  [${id}] FAILED: ${(e as Error).message} — rerun to resume from cache.`);
    }
  }
  if (failed) console.error(`\n${failed} opening(s) failed.`);
  console.log(`\nDone. ${client.requests} live requests this run.`);
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
