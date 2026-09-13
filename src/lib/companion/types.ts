// Caissa's line model. Pure — no React, no chess.js, no DOM — so every beat that
// produces one of these can be unit tested on its own.

export type Speaker = "caissa" | "you" | "them";

/** 0 urgent (never suppressed) · 1 normal · 2 colour. */
export type Priority = 0 | 1 | 2;

export type Tone = "warn" | "praise" | "note" | "book" | "punish";

export type BeatKind =
  // the transcript — her lines read against these, and they are never spoken
  | "your_move"
  | "their_move"
  // her verdict on a move
  | "verdict_good"
  | "verdict_note"
  | "verdict_bad"
  | "pause_offer"
  | "step_continue"
  // danger, now
  | "hanging_now"
  | "mate_available"
  | "mate_against_you"
  | "their_blunder"
  // the character: memory, anticipation, milestones
  | "greeting"
  | "trap_ahead"
  | "trap_for_them"
  | "anticipation_pin"
  | "anticipation_only_defender"
  | "anticipation_all_covered"
  | "book_end"
  | "repeat_mistake"
  | "swing_up"
  | "swing_down"
  | "setup_complete"
  | "castle_late"
  // structure
  | "orient"
  | "hint"
  | "checkpoint_q"
  | "checkpoint_result"
  | "game_over";

export type ActionKind = "takeback" | "playon" | "continue" | "answer" | "jump" | "review" | "newgame";

export interface LineAction {
  kind: ActionKind;
  label: string;
  /** Answer index for a checkpoint, or ply index for a jump. */
  index?: number;
}

export interface Deco {
  squares?: string[];
  arrow?: { from: string; to: string; color?: string };
}

export interface CompanionLine {
  /** Deterministic — `${plyIndex}:${kind}` plus a key when one ply emits two of a
   *  kind. Re-emitting the same moment is a no-op, which is what makes the log
   *  safe under Strict Mode's double invocation. */
  id: string;
  /** history.length when this was emitted. Taking back truncates on it. */
  plyIndex: number;
  speaker: Speaker;
  kind: BeatKind;
  /** What she says. ≤ 12 words whenever `speak` is true. */
  text: string;
  /** The long version: shown when the bubble is tapped, never spoken. */
  more?: string;
  /** Shown on a move record. */
  san?: string;
  deco?: Deco;
  actions?: LineAction[];
  priority: Priority;
  speak: boolean;
  /** Suppresses a near-repeat within the recent window ("nothing-hanging"). */
  dedupeKey?: string;
  tone?: Tone;
}

/** The spoken-word budget. A line longer than this is unbearable read aloud. */
export const MAX_SPOKEN_WORDS = 12;

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function line(l: CompanionLine): CompanionLine {
  return l;
}
