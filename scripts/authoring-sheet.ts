// Authoring sheet: the data-first worklist for writing an OpeningSpec.
//
// Run: npm run sheet -- <opening-id> [--coverage 0.8] [--maxPly 12]
// Reads public/data/explorer/<id>.json (if baked) and public/data/evals/<id>.json,
// walks the tree along the most-played paths until the listed nodes cover the
// requested share of sub-1200 games, and writes a Markdown sheet to
// scripts/.cache/sheets/<id>.md with, per node: the line to reach it, who is to
// move, the top replies with frequency + win rate + baked cp, legacy facts
// already known for the position (your move / mistakes / replies from the
// adapted ChessHall content), and an empty slot for the prose.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Chess } from "chess.js";
import { OPENINGS } from "../src/content";
import { epd, type EPD } from "../src/lib/book/key";
import type { ExplorerTree } from "../src/lib/book/explorer";
import type { EvalTable } from "../src/lib/book/evals";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}
const ID = process.argv[2];
const COVERAGE = Number(arg("coverage") ?? 0.8);
const MAX_PLY = Number(arg("maxPly") ?? 12);

if (!ID || ID.startsWith("--")) {
  console.error("usage: npm run sheet -- <opening-id>");
  process.exit(1);
}
const spec = OPENINGS.find((o) => o.id === ID);
if (!spec) {
  console.error(`unknown opening: ${ID}`);
  process.exit(1);
}

const treePath = `public/data/explorer/${ID}.json`;
const tree: ExplorerTree | null = existsSync(treePath) ? JSON.parse(readFileSync(treePath, "utf8")) : null;
const evalsPath = `public/data/evals/${ID}.json`;
const evals: EvalTable | null = existsSync(evalsPath) ? JSON.parse(readFileSync(evalsPath, "utf8")) : null;

interface Row {
  key: EPD;
  line: string;
  ply: number;
  mass: number; // share of root games passing through this node
  fen: string;
}

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

function walk(): Row[] {
  const rows: Row[] = [];
  if (!tree) return rows;
  const root = tree.nodes[tree.root];
  if (!root) return rows;
  // Priority walk by mass.
  const start = new Chess();
  const frontier: Row[] = [{ key: tree.root, line: "", ply: 0, mass: 1, fen: start.fen() }];
  const seen = new Set<EPD>();
  while (frontier.length) {
    frontier.sort((a, b) => b.mass - a.mass);
    const row = frontier.shift()!;
    if (seen.has(row.key)) continue;
    seen.add(row.key);
    rows.push(row);
    if (row.ply >= MAX_PLY) continue;
    const node = tree.nodes[row.key];
    if (!node) continue;
    for (const [uci, games] of node.m) {
      const g = new Chess(row.fen);
      let san: string;
      try {
        san = g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never }).san;
      } catch {
        continue;
      }
      const childKey = epd(g.fen());
      if (!tree.nodes[childKey]) continue; // not expanded in the bake
      const moveNo = Math.floor(row.ply / 2) + 1;
      const prefix = row.ply % 2 === 0 ? `${moveNo}.` : row.ply === 0 ? "" : "";
      const line = row.line ? `${row.line} ${prefix}${san}` : `${prefix}${san}`;
      frontier.push({ key: childKey, line, ply: row.ply + 1, mass: row.mass * (games / Math.max(1, node.n)), fen: g.fen() });
    }
  }
  return rows;
}

function legacyFacts(key: EPD): string[] {
  const a = spec!.annotations[key];
  if (!a) return [];
  const out: string[] = [];
  if (a.yourMove) out.push(`yourMove: **${a.yourMove.san}** — ${a.yourMove.why}`);
  for (const m of a.mistakes ?? []) out.push(`mistake: **${m.san}** — ${m.why}`);
  for (const r of a.replies ?? []) out.push(`reply: **${r.san}** (${r.verdict}) — ${r.why}`);
  if (a.checkpoint) out.push(`checkpoint: ${a.checkpoint.question}`);
  return out;
}

function main() {
  const rows = walk();
  const lines: string[] = [];
  lines.push(`# Authoring sheet — ${spec!.name} (${spec!.id})`, "");
  lines.push(`You play **${spec!.side}**. Defining moves: \`${spec!.firstMoves}\`.`, "");
  if (!tree) {
    lines.push("> No baked explorer data yet (run `npm run bake:explorer -- --only " + ID + "`). Listing legacy facts only.", "");
    for (const key of Object.keys(spec!.annotations)) {
      lines.push(`## ${key}`, ...legacyFacts(key).map((f) => `- ${f}`), "", "- [ ] why:", "");
    }
  } else {
    let covered = 0;
    // Leaf mass = mass that STOPS here (isn't carried into an expanded child).
    const leafMass = new Map<EPD, number>();
    for (const r of rows) {
      const node = tree.nodes[r.key];
      let carried = 0;
      for (const [uci, games] of node.m) {
        const g = new Chess(r.fen);
        try {
          g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never });
        } catch {
          continue;
        }
        if (tree.nodes[epd(g.fen())]) carried += games / Math.max(1, node.n);
      }
      leafMass.set(r.key, r.mass * (1 - carried));
    }
    lines.push(`Nodes listed until **${pct(COVERAGE)}** of sub-1200 games are covered (by mass), max ply ${MAX_PLY}.`, "");
    for (const r of rows) {
      if (covered >= COVERAGE) break;
      covered += leafMass.get(r.key) ?? 0;
      const node = tree.nodes[r.key];
      const g = new Chess(r.fen);
      const toMove = g.turn() === "w" ? "White" : "Black";
      const yours = (g.turn() === "w" ? "white" : "black") === spec!.side;
      lines.push(`## ${r.line || "(start)"}`);
      lines.push(`- ${toMove} to move (${yours ? "**YOUR move**" : "their move"}) · reached in ${pct(r.mass)} of games · ${node.n} games here`);
      lines.push(`- epd: \`${r.key}\``);
      const ev = evals?.[r.key];
      const cpOf = (uci: string) => ev?.find(([u]) => u === uci)?.[1];
      const best = ev?.[0];
      if (best) lines.push(`- engine best: ${san(r.fen, best[0])} (${best[1]}cp)`);
      lines.push(`- top replies:`);
      for (const m of node.m.slice(0, 6)) {
        const [uci, games] = m;
        const s = san(r.fen, uci);
        const white = m.length === 3 ? m[2] / 100 : games ? (m[2] + m[3] / 2) / games : 0.5;
        const moverScore = g.turn() === "w" ? white : 1 - white;
        const cp = cpOf(uci);
        const loss = best && cp !== undefined ? best[1] - cp : undefined;
        lines.push(`  - **${s}** · ${pct(games / Math.max(1, node.n))} · scores ${pct(moverScore)} for mover${loss !== undefined ? ` · loss ${loss}cp` : ""}`);
      }
      const facts = legacyFacts(r.key);
      if (facts.length) lines.push(`- legacy facts:`, ...facts.map((f) => `  - ${f}`));
      lines.push(yours ? "- [ ] yourMove.why:" : "- [ ] replies[].howToAnswer / why for the dubious ones:");
      lines.push("");
    }
    lines.push(`Covered ${pct(covered)} of games with ${lines.filter((l) => l.startsWith("## ")).length} positions.`);
  }
  mkdirSync("scripts/.cache/sheets", { recursive: true });
  const out = `scripts/.cache/sheets/${ID}.md`;
  writeFileSync(out, lines.join("\n"), "utf8");
  console.log(`wrote ${out}`);
}

function san(fen: string, uci: string): string {
  try {
    return new Chess(fen).move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never }).san;
  } catch {
    return uci;
  }
}

main();
