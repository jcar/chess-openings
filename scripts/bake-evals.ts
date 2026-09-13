// Pre-compute Stockfish MultiPV evaluations for every position in the baked
// explorer trees (plus every model-game position), so opening-phase coaching is
// instant in the browser and never waits on the WASM engine.
//
// Run: npm run bake:evals -- [--only <id>[,<id>]] [--depth 18] [--multiPV 3]
// Output: public/data/evals/<id>.json  = { "<epd>": [[uci, cp], ...top3] }
//         cp is from the SIDE-TO-MOVE's perspective; mate = ±(10000 − plies).
// Resumable via scripts/.cache/evals.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Chess } from "chess.js";
import { OPENINGS } from "../src/content";
import { epd, type EPD } from "../src/lib/book/key";
import { cached } from "./lib/cache";
import { getEngine, quitEngine, type Score } from "./lib/engine";
import type { ExplorerTree } from "../src/lib/book/explorer";
import type { BakedEval, EvalTable } from "../src/lib/book/evals";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}
const ONLY = arg("only")?.split(",").filter(Boolean);
const DEPTH = Number(arg("depth") ?? 18);
const MULTI_PV = Number(arg("multiPV") ?? 3);
const OUT_DIR = "public/data/evals";

const toCp = (s: Score) => ("mate" in s ? (s.mate > 0 ? 10000 - s.mate : -10000 - s.mate) : s.cp);

/** EPD → a FEN chess.js accepts (clocks added back). */
const fenOf = (key: EPD) => `${key} 0 1`;

async function main() {
  const ids = OPENINGS.map((o) => o.id).filter((id) => !ONLY || ONLY.includes(id));
  mkdirSync(OUT_DIR, { recursive: true });
  const engine = getEngine();
  let analyzed = 0, hits = 0;

  for (const id of ids) {
    const spec = OPENINGS.find((o) => o.id === id)!;
    const keys = new Set<EPD>();
    const treePath = `public/data/explorer/${id}.json`;
    if (existsSync(treePath)) {
      const tree = JSON.parse(readFileSync(treePath, "utf8")) as ExplorerTree;
      for (const k of Object.keys(tree.nodes)) keys.add(k);
    }
    for (const g of spec.modelGames) {
      try {
        const game = new Chess();
        keys.add(epd(game.fen()));
        for (const san of g.sans) {
          game.move(san);
          keys.add(epd(game.fen()));
        }
      } catch {
        /* validator reports illegal lines */
      }
    }
    if (!keys.size) {
      console.log(`[${id}] nothing to evaluate (no explorer tree, no model games)`);
      continue;
    }
    console.log(`[${id}] evaluating ${keys.size} positions at depth ${DEPTH}, MultiPV ${MULTI_PV}…`);
    const table: EvalTable = {};
    let i = 0;
    for (const key of keys) {
      const { value, hit } = await cached<BakedEval>(`evals-d${DEPTH}-pv${MULTI_PV}`, key, async () => {
        const g = new Chess(fenOf(key));
        if (g.isGameOver()) return [];
        const { lines } = await engine.analyze(g.fen(), { depth: DEPTH, multiPV: MULTI_PV });
        return lines.map((l) => [l.move, toCp(l.score)] as [string, number]);
      });
      if (hit) hits++;
      else analyzed++;
      table[key] = value;
      if (++i % 25 === 0) console.log(`  ${i}/${keys.size}`);
    }
    writeFileSync(`${OUT_DIR}/${id}.json`, JSON.stringify(table));
    console.log(`[${id}] wrote ${Object.keys(table).length} positions`);
  }
  quitEngine();
  console.log(`\nDone: ${analyzed} analyzed, ${hits} from cache.`);
}

main().catch((err) => {
  console.error(err);
  quitEngine();
  process.exit(1);
});
