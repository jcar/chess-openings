"use client";

// How quickly the opponent answers after your move. The coach's verdict on your
// move stays on screen either way, but pacing decides how long you get with it
// alone before the reply lands.

import { createLocalStore, useLocalStore } from "@/lib/adapt/store";

export type Pace = "fast" | "normal" | "step";

export interface PrefsState {
  pace: Pace;
}

/** How long the assessment sits alone before the bot replies. */
export const READ_MS: Record<Pace, number> = { fast: 0, normal: 1800, step: 0 };

export const PACE_LABEL: Record<Pace, string> = { fast: "Fast", normal: "Normal", step: "Step" };

export const PACE_HELP: Record<Pace, string> = {
  fast: "The opponent replies at once.",
  normal: "A beat to read the coach before the reply.",
  step: "You tap Continue before the opponent replies.",
};

export const prefsStore = createLocalStore<PrefsState>("openinglab:prefs:v1", { pace: "normal" });

export function nextPace(p: Pace): Pace {
  return p === "fast" ? "normal" : p === "normal" ? "step" : "fast";
}

export function usePrefs(): PrefsState {
  return useLocalStore(prefsStore);
}
