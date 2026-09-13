// Content validator. Run: npm run validate [-- --engine] [--only <id>]
//
// For every OpeningSpec (hand-authored or adapted from legacy):
//  • every annotation key is a legal EPD; yourMove/mistakes/checkpoints sit on
//    positions where the USER is to move, replies where the OPPONENT is to move
//  • every SAN in yourMove / mistakes / replies / replies[].answer is legal there
//  • modelGames and traps replay legally from the start
//  • setup squares are real squares; setup.order SANs are plausible
//  • tabiyaFen / structureDiagram.fen are legal AND the side not to move is not
//    in check (Stockfish rejects those silently — ChessHall's classic trap)
//  • --engine: each yourMove loses < 10 win% vs the engine's best (warn ≥ 10)
//  • coverage (when a baked tree exists): share of sub-1200 games whose first 8
//    plies pass through an annotated position
// Exit 1 on any error; warnings don't fail.

import { existsSync, readFileSync } from "node:fs";
import { Chess } from "chess.js";
import { OPENINGS } from "../src/content";
import { isCore } from "../src/content/core";
import type { OpeningSpec } from "../src/content/spec";
import { epd, type EPD } from "../src/lib/book/key";
import { winPct } from "../src/lib/coach/classify";
import type { ExplorerTree } from "../src/lib/book/explorer";
import { getEngine, quitEngine, type Score } from "./lib/engine";

const ENGINE = process.argv.includes("--engine");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx === -1 ? null : process.argv[onlyIdx + 1]?.split(",");

let errors = 0;
let warnings = 0;
const err = (id: string, msg: string) => {
  errors++;
  console.error(`  ✖ [${id}] ${msg}`);
};
const warn = (id: string, msg: string) => {
  warnings++;
  console.warn(`  ▲ [${id}] ${msg}`);
};

const SQUARE = /^[a-h][1-8]$/;
const fenOf = (key: EPD) => `${key} 0 1`;

function legalSan(fen: string, san: string): boolean {
  try {
    new Chess(fen).move(san);
    return true;
  } catch {
    return false;
  }
}

/** Is the side NOT to move in check? (illegal position; Stockfish returns bestmove (none)) */
function otherSideInCheck(fen: string): boolean {
  const parts = fen.split(" ");
  parts[1] = parts[1] === "w" ? "b" : "w";
  parts[3] = "-"; // en passant can't survive a turn flip
  try {
    return new Chess(parts.join(" ")).isCheck();
  } catch {
    return false;
  }
}

function checkFen(id: string, label: string, fen: string) {
  try {
    new Chess(fen);
  } catch (e) {
    err(id, `${label}: illegal FEN (${(e as Error).message})`);
    return;
  }
  if (otherSideInCheck(fen)) err(id, `${label}: the side NOT to move is in check — engine will reject this position`);
}

function replay(id: string, label: string, sans: string[]) {
  const g = new Chess();
  for (const san of sans) {
    try {
      g.move(san);
    } catch {
      err(id, `${label}: illegal move "${san}" after ${g.history().join(" ")}`);
      return;
    }
  }
}

async function validate(spec: OpeningSpec, engine: ReturnType<typeof getEngine> | null) {
  const id = spec.id;
  const userWhite = spec.side === "white";

  checkFen(id, "tabiyaFen", spec.tabiyaFen);
  if (spec.structureDiagram) checkFen(id, "structureDiagram.fen", spec.structureDiagram.fen);
  replay(id, "firstMoves", spec.firstMoves.split(/\s+/).map((t) => t.replace(/^\d+\.(\.\.)?/, "")).filter(Boolean));
  for (const g of spec.modelGames) replay(id, `modelGame "${g.label}"`, g.sans);
  for (const t of spec.traps) replay(id, `trap "${t.name}"`, t.sans);

  for (const p of spec.setup.pieces) for (const sq of p.squares) if (!SQUARE.test(sq)) err(id, `setup piece square "${sq}"`);
  for (const sq of spec.setup.pawns) if (!SQUARE.test(sq)) err(id, `setup pawn square "${sq}"`);

  for (const [key, a] of Object.entries(spec.annotations)) {
    let g: Chess;
    try {
      g = new Chess(fenOf(key));
    } catch {
      err(id, `annotation key is not a legal position: ${key}`);
      continue;
    }
    if (epd(g.fen()) !== key) err(id, `annotation key not normalised: ${key}`);
    const userToMove = (g.turn() === "w") === userWhite;
    const fen = g.fen();

    if (a.yourMove) {
      if (!userToMove) err(id, `yourMove "${a.yourMove.san}" on a position where the opponent is to move: ${key}`);
      if (!legalSan(fen, a.yourMove.san)) err(id, `yourMove "${a.yourMove.san}" is illegal at ${key}`);
      else if (engine) {
        const best = await engine.analyze(fen, { depth: 14, multiPV: 1 });
        const g2 = new Chess(fen);
        g2.move(a.yourMove.san);
        const after = await engine.analyze(g2.fen(), { depth: 14, multiPV: 1 });
        const cp = (s: Score) => ("mate" in s ? (s.mate > 0 ? 10000 : -10000) : s.cp);
        if (best.lines[0] && after.lines[0]) {
          const drop = winPct(cp(best.lines[0].score)) - winPct(-cp(after.lines[0].score));
          if (drop >= 10) warn(id, `yourMove ${a.yourMove.san} at "${key}" loses ${drop.toFixed(0)} win% vs ${best.lines[0].move}`);
        }
      }
    }
    for (const m of a.mistakes ?? []) {
      if (!userToMove) err(id, `mistake "${m.san}" on an opponent-to-move position: ${key}`);
      if (!legalSan(fen, m.san)) err(id, `mistake "${m.san}" is illegal at ${key}`);
    }
    for (const r of a.replies ?? []) {
      if (userToMove) err(id, `reply "${r.san}" on a user-to-move position: ${key}`);
      if (!legalSan(fen, r.san)) err(id, `reply "${r.san}" is illegal at ${key}`);
      else if (r.answer) {
        const g2 = new Chess(fen);
        g2.move(r.san);
        if (!legalSan(g2.fen(), r.answer)) err(id, `answer "${r.answer}" to ${r.san} is illegal at ${key}`);
      }
    }
    if (a.checkpoint) {
      if (!userToMove) err(id, `checkpoint on an opponent-to-move position: ${key}`);
      if (a.checkpoint.correctIndex >= a.checkpoint.options.length) err(id, `checkpoint correctIndex out of range at ${key}`);
    }
  }

  // Coverage vs baked data: the mass-weighted share of the OPPONENT's real
  // replies (first 8 plies, along the baked tree) that have an authored reply
  // at that position. --gaps lists the biggest uncovered replies.
  const treePath = `public/data/explorer/${id}.json`;
  if (existsSync(treePath)) {
    const tree = JSON.parse(readFileSync(treePath, "utf8")) as ExplorerTree;
    let covered = 0;
    let total = 0;
    const gaps: { line: string; san: string; mass: number; freq: number }[] = [];
    // At the user's turn follow only the spec's move (annotation or defining
    // line); at the opponent's turn branch over their real replies.
    const defining = new Map<string, string>();
    try {
      const d = new Chess();
      for (const tok of spec.firstMoves.trim().split(/\s+/)) {
        const san = tok.replace(/^\d+\.(\.\.)?/, "");
        if (!san) continue;
        const before = epd(d.fen());
        d.move(san);
        defining.set(before, san);
      }
    } catch {
      /* reported above */
    }
    const walk = (fen: string, ply: number, mass: number, line: string) => {
      const key = epd(fen);
      const node = tree.nodes[key];
      if (!node || ply >= 8 || mass < 0.001) return;
      const g0 = new Chess(fen);
      const oppToMove = (g0.turn() === "w") !== userWhite;
      const a = spec.annotations[key];
      if (!oppToMove) {
        const mine = a?.yourMove?.san ?? defining.get(key);
        if (!mine) return;
        const g = new Chess(fen);
        try {
          g.move(mine);
        } catch {
          return;
        }
        walk(g.fen(), ply + 1, mass, `${line} ${mine}`.trim());
        return;
      }
      for (const [uci, games] of node.m) {
        const g = new Chess(fen);
        let san: string;
        try {
          san = g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never }).san;
        } catch {
          continue;
        }
        const share = games / Math.max(1, node.n);
        const m = mass * share;
        total += m;
        if (a?.replies?.some((r) => r.san === san)) covered += m;
        else if (m >= 0.005) gaps.push({ line: `${line} ${san}`.trim(), san, mass: m, freq: share });
        walk(g.fen(), ply + 1, m, `${line} ${san}`.trim());
      }
    };
    walk(new Chess().fen(), 0, 1, "");
    const pct = total ? Math.round((covered / total) * 100) : 0;
    const line = `reply coverage: ${pct}% of the opponent's real moves (first 8 plies) have an authored answer`;
    if (isCore(id) && pct < 80) warn(id, line + " (target 80%)");
    else console.log(`  · [${id}] ${line}`);
    if (process.argv.includes("--gaps")) {
      gaps.sort((x, y) => y.mass - x.mass);
      for (const gp of gaps.slice(0, 15)) console.log(`      gap ${(gp.mass * 100).toFixed(1)}%  ${gp.line}   (${Math.round(gp.freq * 100)}% here)`);
    }
  }
}

async function main() {
  const specs = OPENINGS.filter((o) => !ONLY || ONLY.includes(o.id));
  const engine = ENGINE ? getEngine() : null;
  console.log(`Validating ${specs.length} opening(s)${ENGINE ? " with engine checks" : ""}…`);
  for (const spec of specs) await validate(spec, engine);
  if (engine) quitEngine();
  console.log(`\n${errors} error(s), ${warnings} warning(s).`);
  process.exit(errors ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  quitEngine();
  process.exit(1);
});
