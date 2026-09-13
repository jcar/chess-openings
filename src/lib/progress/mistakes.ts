"use client";

// The recurring-mistake ledger: what keeps going wrong, per opening, across
// games. Powers "3rd game where you left a piece hanging on e5" in the summary
// and lets the coach say "again" when a pattern repeats.

import type { MoveTag } from "@/lib/coach/tags";
import { createLocalStore, useLocalStore } from "@/lib/adapt/store";

export interface MistakeEntry {
  tag: MoveTag;
  /** Square the mistake centred on (the moved-to square, or the hanging square). */
  square: string;
  count: number;
  lastSeen: string;
  /** A sample move that produced it, in SAN. */
  sample: string;
}

export interface MistakeState {
  byOpening: Record<string, Record<string, MistakeEntry>>;
}

export const mistakeStore = createLocalStore<MistakeState>("openinglab:mistakes:v1", { byOpening: {} });

const keyOf = (tag: MoveTag, square: string) => `${tag}@${square}`;

export function recordMistake(openingId: string, tag: MoveTag, square: string, sample: string): MistakeEntry {
  let entry!: MistakeEntry;
  mistakeStore.update((s) => {
    const forOpening = { ...(s.byOpening[openingId] ?? {}) };
    const k = keyOf(tag, square);
    const prev = forOpening[k];
    entry = { tag, square, count: (prev?.count ?? 0) + 1, lastSeen: new Date().toISOString(), sample };
    forOpening[k] = entry;
    return { byOpening: { ...s.byOpening, [openingId]: forOpening } };
  });
  return entry;
}

/** Patterns seen at least twice, most frequent first. */
export function recurring(state: MistakeState, openingId: string, min = 2): MistakeEntry[] {
  return Object.values(state.byOpening[openingId] ?? {})
    .filter((e) => e.count >= min)
    .sort((a, b) => b.count - a.count || b.lastSeen.localeCompare(a.lastSeen));
}

const PHRASE: Partial<Record<MoveTag, (sq: string) => string>> = {
  hangs_piece: (sq) => `left a piece hanging on ${sq}`,
  leaves_piece_hanging: (sq) => `ignored an attacked piece on ${sq}`,
  hangs_pawn: (sq) => `gave away the pawn on ${sq}`,
  early_queen: () => `brought the queen out early`,
  loses_tempo_same_piece: () => `moved the same piece twice`,
  weakens_king_shield: (sq) => `pushed the ${sq[0]}-pawn in front of your king`,
  delays_castling: () => `castled late`,
  delays_development: () => `pushed wing pawns before developing`,
  moves_king_early: () => `walked the king instead of castling`,
  doubles_pawns: (sq) => `doubled pawns on the ${sq[0]}-file`,
  isolates_pawn: (sq) => `isolated the ${sq[0]}-pawn`,
};

const ORDINAL = (n: number) => (n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`);

/** "3rd game where you left a piece hanging on e5" */
export function describeRecurring(e: MistakeEntry): string {
  const phrase = PHRASE[e.tag]?.(e.square) ?? `repeated ${e.tag.replace(/_/g, " ")}`;
  return `${ORDINAL(e.count)} game where you ${phrase}.`;
}

export function useMistakes(): MistakeState {
  return useLocalStore(mistakeStore);
}
