"use client";

// Your strength, estimated per opening and overall, from clean games (no
// takebacks, no hints) against the bot at a known strength. Standard Elo update
// with a responsive K, since games are few.

import { createLocalStore, useLocalStore } from "./store";

export interface Rating {
  rating: number;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  /** In-game momentum carried into the next game: −1, 0 or +1. */
  momentum: number;
}

export interface RatingState {
  global: Rating;
  perOpening: Record<string, Rating>;
}

export const DEFAULT_RATING = 800;
export const MIN_RATING = 400;
export const MAX_RATING = 1800;
const K = 32;

export const emptyRating = (): Rating => ({ rating: DEFAULT_RATING, games: 0, wins: 0, losses: 0, draws: 0, momentum: 0 });

export const ratingStore = createLocalStore<RatingState>("openinglab:rating:v1", { global: emptyRating(), perOpening: {} });

export type GameResult = "win" | "loss" | "draw";

const clamp = (n: number) => Math.max(MIN_RATING, Math.min(MAX_RATING, Math.round(n)));
const scoreOf = (r: GameResult) => (r === "win" ? 1 : r === "draw" ? 0.5 : 0);

export function eloUpdate(rating: number, opponent: number, result: GameResult, k = K): number {
  const expected = 1 / (1 + 10 ** ((opponent - rating) / 400));
  return clamp(rating + k * (scoreOf(result) - expected));
}

function applyResult(r: Rating, opponent: number, result: GameResult): Rating {
  return {
    ...r,
    rating: eloUpdate(r.rating, opponent, result),
    games: r.games + 1,
    wins: r.wins + (result === "win" ? 1 : 0),
    losses: r.losses + (result === "loss" ? 1 : 0),
    draws: r.draws + (result === "draw" ? 1 : 0),
  };
}

/** Record a finished CLEAN game (the caller checks takebacks/hints). */
export function recordGame(openingId: string, botElo: number, result: GameResult, momentum: number): { before: number; after: number } {
  const s = ratingStore.getSnapshot();
  const prev = s.perOpening[openingId] ?? emptyRating();
  const next = { ...applyResult(prev, botElo, result), momentum };
  ratingStore.set({ global: applyResult(s.global, botElo, result), perOpening: { ...s.perOpening, [openingId]: next } });
  return { before: prev.rating, after: next.rating };
}

/** Store momentum without a rated result (e.g. a game with takebacks). */
export function recordMomentum(openingId: string, momentum: number): void {
  ratingStore.update((s) => ({ ...s, perOpening: { ...s.perOpening, [openingId]: { ...(s.perOpening[openingId] ?? emptyRating()), momentum } } }));
}

/** Best current estimate for an opening: its own rating after 3 games, else the global one. */
export function estimateFor(state: RatingState, openingId: string): { rating: number; momentum: number; basis: "opening" | "global" } {
  const own = state.perOpening[openingId];
  if (own && own.games >= 3) return { rating: own.rating, momentum: own.momentum, basis: "opening" };
  return { rating: state.global.rating, momentum: own?.momentum ?? 0, basis: "global" };
}

export function useRating(): RatingState {
  return useLocalStore(ratingStore);
}
