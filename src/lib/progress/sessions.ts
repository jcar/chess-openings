"use client";

// The last 20 games, for the summary screen and the Principles graduation rule.

import { createLocalStore, useLocalStore } from "@/lib/adapt/store";
import type { Result } from "@/lib/game/useTrainGame";

export interface Session {
  /** Opening id, or "principles" for Principles Mode. */
  openingId: string;
  at: string;
  result: Result;
  plies: number;
  /** Rated (no takebacks/hints, ≥10 plies). */
  clean: boolean;
  botElo: number;
  /** Mean move accuracy of the user's judged moves (0–100), if any were judged. */
  accuracy: number | null;
  /** Worst user move by win% drop. */
  worst: { san: string; moveNo: number; drop: number } | null;
  /** Share of the opening's setup reached at book end (0–1), if the spec has a setup. */
  setupScore: number | null;
  /** Principles benchmarks passed / total, if scored. */
  benchmarks: { passed: number; total: number } | null;
}

export interface SessionState {
  recent: Session[];
}

const KEEP = 20;

export const sessionStore = createLocalStore<SessionState>("openinglab:sessions:v1", { recent: [] });

export function recordSession(s: Session): void {
  sessionStore.update((st) => ({ recent: [s, ...st.recent].slice(0, KEEP) }));
}

export function lastSession(state: SessionState): Session | null {
  return state.recent[0] ?? null;
}

export function useSessions(): SessionState {
  return useLocalStore(sessionStore);
}

/** Principles Mode graduation: ≥4/5 benchmarks in 3 of the last 4 principles games. */
export function readyToGraduate(state: SessionState): boolean {
  const recent = state.recent.filter((s) => s.openingId === "principles").slice(0, 4);
  if (recent.length < 3) return false;
  const good = recent.filter((s) => s.benchmarks && s.benchmarks.passed >= 4).length;
  return good >= 3;
}
