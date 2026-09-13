// Principles Mode scoring: Heisman-style benchmarks a sub-800 player can hit
// in every game without knowing a single line of theory.

import type { Side } from "@/content/spec";
import { extractFeatures, type PlyRecord } from "@/lib/coach/features";

export interface BenchmarkResult {
  id: "castledBy10" | "minorsOutBy12" | "noHangingPieces" | "queenQuietBefore10" | "centrePawnFirst";
  title: string;
  pass: boolean;
  detail: string;
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
      detail: first ? (centreFirst ? `${first} — good start.` : `${first} doesn't fight for the centre.`) : "pending",
    },
    {
      id: "queenQuietBefore10",
      title: "Queen stays home early",
      pass: earlyQueenMoves <= 1,
      detail: earlyQueenMoves <= 1 ? `${earlyQueenMoves} queen move${earlyQueenMoves === 1 ? "" : "s"} before move 10.` : `${earlyQueenMoves} queen moves before move 10 — too many.`,
    },
    {
      id: "minorsOutBy12",
      title: "All knights and bishops out by move 12",
      pass: past12 ? minorsOut : true,
      detail: past12 ? (minorsOut ? "All four developed." : `Still at home: ${minorsHome.join(", ")}.`) : minorsOut ? "On track." : `Still at home: ${minorsHome.join(", ")} (pending).`,
    },
    {
      id: "castledBy10",
      title: "Castled by move 10",
      pass: past10 ? castledBy10 : true,
      detail: castled ? `Castled on move ${moveOf(castleIdx)}.` : past10 ? "Never castled in time." : "Not yet (pending).",
    },
    {
      id: "noHangingPieces",
      title: "No pieces left hanging",
      pass: hangs.length === 0,
      detail: hangs.length ? `Hanging after: ${hangs.slice(0, 3).join(", ")}${hangs.length > 3 ? "…" : ""}.` : "Nothing left en prise.",
    },
  ];
}

export function passedCount(results: BenchmarkResult[]): { passed: number; total: number } {
  return { passed: results.filter((r) => r.pass).length, total: results.length };
}
