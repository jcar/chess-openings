"use client";

// Turns a finished game into a Session record (and the rating update when the
// game was clean). Shared by the train and principles screens.

import type { OpeningSpec } from "@/content/spec";
import { recordGame as recordRated, recordMomentum } from "@/lib/adapt/rating";
import { moveAccuracy } from "@/lib/coach/classify";
import type { GameOverInfo, Ply } from "@/lib/game/useTrainGame";
import { passedCount, scoreBenchmarks } from "@/lib/principles/benchmarks";
import { setupProgress } from "@/lib/setup/progress";
import { recordSession, type Session } from "./sessions";

export const RATED_MIN_PLIES = 10;

export function finishGame(spec: OpeningSpec, history: Ply[], info: GameOverInfo, botElo: number, bookEndedAt: number | null): { session: Session; rating: { before: number; after: number } | null } {
  const judged = history.filter((p) => p.byUser && p.judgement);
  const accuracy = judged.length ? judged.reduce((s, p) => s + moveAccuracy(p.judgement!.drop), 0) / judged.length : null;
  const worstPly = judged.reduce<Ply | null>((w, p) => (!w || p.judgement!.drop > w.judgement!.drop ? p : w), null);
  const worst = worstPly ? { san: worstPly.san, moveNo: Math.floor(history.indexOf(worstPly) / 2) + 1, drop: worstPly.judgement!.drop } : null;

  const bookEndPly = bookEndedAt ?? history.length;
  const atBookEnd = history[Math.min(bookEndPly, history.length) - 1];
  const setupScore = spec.setup.pieces.length && atBookEnd ? setupProgress(atBookEnd.fen, spec.setup, spec.side, history.slice(0, bookEndPly)).score : null;

  const benchmarks = spec.id === "principles" ? passedCount(scoreBenchmarks(history, spec.side)) : null;

  const clean = info.takebacks === 0 && info.hintsUsed === 0 && info.plies >= RATED_MIN_PLIES;
  const rating = clean ? recordRated(spec.id, botElo, info.result, info.momentum) : (recordMomentum(spec.id, info.momentum), null);

  const session: Session = {
    openingId: spec.id,
    at: new Date().toISOString(),
    result: info.result,
    plies: info.plies,
    clean,
    botElo,
    accuracy: accuracy === null ? null : Math.round(accuracy),
    worst,
    setupScore,
    benchmarks,
  };
  recordSession(session);
  return { session, rating };
}
