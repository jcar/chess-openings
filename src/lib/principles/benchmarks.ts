// Principles Mode scoring: Heisman-style benchmarks a sub-800 player can hit
// in every game without knowing a single line of theory.

import type { Side } from "@/content/spec";
import { extractFeatures, type PlyRecord } from "@/lib/coach/features";

export interface BenchmarkResult {
  id: "castledBy10" | "minorsOutBy12" | "noHangingPieces" | "queenQuietBefore10" | "centrePawnFirst";
  title: string;
  pass: boolean;
  detail: string;
  /** Has this actually been decided yet? On move two, four of the five cannot
   *  have been: you have not reached move ten or twelve. Counting them as passes
   *  told the player 5 of 5 before anything had been tested. */
  settled: boolean;
}

export interface GamePly extends PlyRecord {
  /** FEN after the move. */
  fen: string;
  byUser: boolean;
}

/** Score the user's opening play. Works on partial games (benchmarks not yet
 *  decidable count as passing so far, with `pending` in the detail). */
export function scoreBenchmarks(history: GamePly[], side: Side): BenchmarkResult[] {
  const mine = history.filter((p) => p.byUser);
  const moveOf = (i: number) => Math.floor(i / 2) + 1; // ply index → move number
  const total = history.length;

  // castledBy10
  const castleIdx = history.findIndex((p) => p.byUser && /^O-O/.test(p.san));
  const castled = castleIdx !== -1;
  const castledBy10 = castled && moveOf(castleIdx) <= 10;
  const past10 = total >= 20;

  // minorsOutBy12: at the position after the user's move 12 (or the last one), all four minors developed (or gone).
  const at12 = history.filter((p) => p.byUser).slice(0, 12);
  const posAt12 = at12.length ? at12[at12.length - 1].fen : null;
  let minorsOut = true;
  let minorsHome: string[] = [];
  if (posAt12) {
    const f = extractFeatures(posAt12, history.slice(0, history.indexOf(at12[at12.length - 1]) + 1));
    minorsHome = f[side].minorsHome;
    minorsOut = minorsHome.length === 0;
  }
  const past12 = at12.length >= 12;

  // noHangingPieces: after each user move, no own piece (≥3) hangs.
  const hangs: string[] = [];
  history.forEach((p, i) => {
    if (!p.byUser) return;
    const f = extractFeatures(p.fen, history.slice(0, i + 1));
    const bad = f[side].hanging.filter((h) => h.piece !== "p");
    if (bad.length) hangs.push(`${p.san} (${bad[0].square})`);
  });

  // queenQuietBefore10: at most one queen move in the first 9 moves.
  const earlyQueenMoves = mine.filter((p, i) => i < 9 && /^Q/.test(p.san)).length;

  // centrePawnFirst: the user's first move is a centre pawn (e4/d4 or e5/d5/c5/c6/e6/d6 as Black).
  const first = mine[0]?.san ?? null;
  const centreFirst = first ? (side === "white" ? /^(e4|d4|c4)$/.test(first) : /^(e5|d5|c5|c6|e6|d6|Nf6)$/.test(first)) : true;

  return [
    {
      id: "centrePawnFirst",
      title: "Start in the centre",
      pass: centreFirst,
      settled: !!first,
      detail: first ? (centreFirst ? `${first} — good start.` : `${first} doesn't fight for the centre.`) : "Waiting for your first move.",
    },
    {
      id: "queenQuietBefore10",
      title: "Queen stays home early",
      pass: earlyQueenMoves <= 1,
      settled: earlyQueenMoves > 1 || mine.length >= 9,
      detail: earlyQueenMoves <= 1 ? `${earlyQueenMoves} queen move${earlyQueenMoves === 1 ? "" : "s"} before move 10.` : `${earlyQueenMoves} queen moves before move 10 — too many.`,
    },
    {
      id: "minorsOutBy12",
      title: "All knights and bishops out by move 12",
      pass: past12 ? minorsOut : true,
      settled: past12 || minorsOut,
      detail: past12 ? (minorsOut ? "All four developed." : `Still at home: ${minorsHome.join(", ")}.`) : minorsOut ? "On track." : `Still at home: ${minorsHome.join(", ")} (pending).`,
    },
    {
      id: "castledBy10",
      title: "Castled by move 10",
      pass: past10 ? castledBy10 : true,
      settled: castled || past10,
      detail: castled ? `Castled on move ${moveOf(castleIdx)}.` : past10 ? "Never castled in time." : "Not yet (pending).",
    },
    {
      id: "noHangingPieces",
      title: "No pieces left hanging",
      pass: hangs.length === 0,
      // A failure is conclusive the moment it happens. A pass is only conclusive
      // once the opening is over, since nothing hanging so far is not the same
      // as nothing ever hanging. Move 12 is the same horizon the others use.
      settled: hangs.length > 0 || past12,
      detail: hangs.length ? `Hanging after: ${hangs.slice(0, 3).join(", ")}${hangs.length > 3 ? "…" : ""}.` : "Nothing left en prise.",
    },
  ];
}

/** Counts only what has actually been decided. */
export function passedCount(results: BenchmarkResult[]): { passed: number; total: number } {
  const settled = results.filter((r) => r.settled);
  return { passed: settled.filter((r) => r.pass).length, total: settled.length };
}

/** The header chip, in the same shape the opening trainer's plan chip uses. */
export function benchmarkStatus(results: BenchmarkResult[]): { state: "on_plan" | "off_plan"; label: string; detail?: string; met: number; total: number } {
  const { passed, total } = passedCount(results);
  const missed = results.filter((r) => r.settled && !r.pass);
  return {
    state: missed.length ? "off_plan" : "on_plan",
    label: missed.length ? "off track" : total ? "on track" : "starting",
    detail: missed[0]?.title,
    met: passed,
    total,
  };
}
