// Estimate → bot difficulty. Derived, never chosen by the user: the bot sits a
// little below your estimate so you win more than you lose, momentum nudges it,
// and the same number drives book "slack" and coach verbosity.

import type { Difficulty } from "@/lib/bot/policy";

export const BOT_MIN = 600;
export const BOT_MAX = 1600;

export function difficultyFor(estimate: number, momentum: number): Difficulty {
  const botElo = Math.max(BOT_MIN, Math.min(BOT_MAX, Math.round(estimate - 50 + momentum * 100)));
  // τ: slack (1.4) below 800, sharp (0.6) above 1200, linear between.
  const t = Math.max(0, Math.min(1, (botElo - 800) / 400));
  const tau = 1.4 - 0.8 * t;
  const verbosity: Difficulty["verbosity"] = botElo < 800 ? "verbose" : botElo <= 1100 ? "normal" : "terse";
  return {
    tau,
    botElo,
    maxBookLoss: botElo < 800 ? Infinity : botElo <= 1100 ? 400 : 250,
    minFreq: botElo < 800 ? 0.01 : botElo <= 1100 ? 0.02 : 0.03,
    verbosity,
  };
}

/** Friendly name for the bot at a strength. */
export function personaFor(botElo: number): string {
  if (botElo < 700) return "Pawn";
  if (botElo < 900) return "Beginner";
  if (botElo < 1100) return "Improver";
  if (botElo < 1300) return "Club novice";
  return "Club player";
}
