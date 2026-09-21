"use client";

// How much Caissa says, and whether she says it out loud. Kept separate from the
// `pace` preference on purpose: pace decides when the opponent replies, chattiness
// decides how much she talks. Folding them together would make "quiet" also mean
// "fast", which breaks Step mode.

import { createLocalStore, useLocalStore } from "@/lib/adapt/store";
import type { Priority } from "./types";

export type Chattiness = "quiet" | "normal" | "chatty";

export interface CompanionPrefs {
  chattiness: Chattiness;
}

export const companionStore = createLocalStore<CompanionPrefs>("openinglab:companion:v1", { chattiness: "normal" });

/** The highest priority number she'll volunteer at each setting. Urgent (0) is
 *  never suppressed: quiet means "don't narrate", not "don't warn". */
export const MAX_PRIORITY: Record<Chattiness, Priority> = { quiet: 0, normal: 1, chatty: 2 };

/** How many of her lines a single ply may carry. */
export const PLY_BUDGET: Record<Chattiness, number> = { quiet: 1, normal: 2, chatty: 3 };

export const CHATTINESS_LABEL: Record<Chattiness, string> = { quiet: "Quiet", normal: "Normal", chatty: "Chatty" };

export const CHATTINESS_HELP: Record<Chattiness, string> = {
  quiet: "Danger and results only.",
  normal: "Danger, traps, notable moves, milestones.",
  chatty: "Running commentary, plans and callbacks.",
};

export function useCompanionPrefs(): CompanionPrefs {
  return useLocalStore(companionStore);
}
