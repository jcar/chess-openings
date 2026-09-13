// Move classification in win-percentage space (Lichess's model), not raw
// centipawns: a 150cp swing matters at 0.00 and is noise at +9.00.
// Reference: https://lichess.org/page/accuracy
//
// Thresholds are TIGHTER than Lichess's (30/20/10): for a 0–1200 audience,
// hanging a knight from an equal position (~300cp ≈ 25 win%) must read as a
// blunder, not a "mistake". Ours: blunder ≥25, mistake ≥12, inaccuracy ≥7
// (so +9 → +6 is NOT flagged, but 0 → −0.8 is).

export interface Score {
  cp: number | null;
  mate: number | null;
}

/** Centipawns → expected win % for the side the score favours (0–100). */
export function winPct(cp: number): number {
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);
}

/** Engine score → one comparable centipawn number; mates saturate. */
export function scoreToCp(s: Score): number {
  if (s.mate != null) return s.mate > 0 ? 10000 - s.mate : -10000 - s.mate;
  return s.cp ?? 0;
}

export const BLUNDER = 25;
export const MISTAKE = 12;
export const INACCURACY = 7;

export type Severity = "blunder" | "mistake" | "inaccuracy" | "ok" | "good" | "best";

export interface MoveJudgement {
  /** Win % for the mover before the move. */
  before: number;
  /** Win % for the mover after the move (from the same side's perspective). */
  after: number;
  /** before − after; positive = the move cost the mover. */
  drop: number;
  severity: Severity;
}

/**
 * Judge the mover's move. `cpBefore` is from the MOVER's perspective in the
 * position before the move; `cpAfterOpp` is the engine score in the resulting
 * position, which is from the OPPONENT's perspective (side to move), so we negate.
 * `cpBest` (optional) is the score of the best move, for the "best" label.
 */
export function judge(cpBefore: number, cpAfterOpp: number, bestUciPlayed = false): MoveJudgement {
  const before = winPct(cpBefore);
  const after = winPct(-cpAfterOpp);
  const drop = before - after;
  let severity: Severity;
  if (drop >= BLUNDER) severity = "blunder";
  else if (drop >= MISTAKE) severity = "mistake";
  else if (drop >= INACCURACY) severity = "inaccuracy";
  else if (bestUciPlayed || drop <= 1) severity = "best";
  else if (drop <= 4) severity = "good";
  else severity = "ok";
  return { before, after, drop, severity };
}

/** Lichess move accuracy (0–100) from a win% drop. */
export function moveAccuracy(drop: number): number {
  const a = 103.1668 * Math.exp(-0.04354 * Math.max(0, drop)) - 3.1669;
  return Math.max(0, Math.min(100, a));
}
