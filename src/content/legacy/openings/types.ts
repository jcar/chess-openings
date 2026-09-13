// Shared opening data model — the single source of truth for opening lines.
//
// The "Chess Openings" module DERIVES its guided replays and guess-the-move
// drills from this data (see ./index.ts helpers), and the future standalone
// "openings trainer" tool will read the same `OPENINGS` registry. Keeping the
// moves here (not duplicated inside each activity) means the lessons and the
// trainer can never drift apart.
//
// All prose is original; all move sequences are standard, public opening theory.

import type { Orientation } from "../types";

/** Which first-move family an opening belongs to (for grouping/ordering). */
export type OpeningFamily = "1e4-e5" | "1e4-other" | "1d4" | "flank";

/** One named line within an opening: a sequence of SAN moves + annotations. */
export interface OpeningLine {
  /** e.g. "Main line", "Exchange Variation". */
  label: string;
  /**
   * One-sentence theory of this specific line — what it's about / what each side
   * is going for — shown on the opening page next to the line. (The move-by-move
   * "why" lives in `notes`; this is the line-level overview.)
   */
  summary?: string;
  /** Moves in SAN from `startFen` (or the standard start). */
  sans: string[];
  /** Per-move annotations, parallel to `sans` (sparse entries allowed). */
  notes?: (string | undefined)[];
  /** Optional start position; defaults to the standard initial position. */
  startFen?: string;
  /**
   * Marks this line as an opponent DEVIATION from another line, so the trainer
   * can frame it: "at move N of {from}, the opponent plays {tryMove} instead —
   * your move?". Presentational only; the drill mechanic is unchanged.
   */
  branch?: { from: string; atPly: number; tryMove: string };
  /**
   * Common WRONG learner replies, by ply (0-based index into `sans`), each with a
   * teaching explanation shown when the learner plays that move in the drill.
   */
  commonMistakes?: { ply: number; move: string; why: string }[];
}

/** A complete opening: its character, plans, key position, and lines. */
export interface Opening {
  /** Stable id, e.g. "italian-game" (used in activity ids and by the trainer). */
  id: string;
  /** Display name, e.g. "Italian Game". */
  name: string;
  /** Common nicknames/alternate names for search (e.g. ["Spanish"] for the Ruy). */
  aliases?: string[];
  /** ECO code or range (public reference), e.g. "C50–C54". */
  eco?: string;
  family: OpeningFamily;
  /** The side the trainer drills for this opening (its natural repertoire color). */
  trainerColor: Orientation;
  /**
   * Curation tier: "core" = a recommended starter repertoire (learn these first,
   * in depth); "explorer" (default) = the broader reference catalog.
   */
  tier?: "core" | "explorer";
  /** Defining moves as a display string, e.g. "1.e4 e5 2.Nf3 Nc6 3.Bc4". */
  firstMoves: string;
  /** Original prose: the personality/character of the opening. */
  character: string;
  /** What White is trying to do. */
  whitePlan: string;
  /** What Black is trying to do. */
  blackPlan: string;
  /** Key tabiya FEN (the position after the defining moves). */
  tabiyaFen: string;
  /**
   * Optional second teaching diagram: the characteristic MIDDLEGAME structure the
   * opening leads to (e.g. the position after the main line), with arrows showing
   * the typical plan or pawn break. Display-only; legality-checked by the validator.
   * Surfaced by `buildConcept` beneath the tabiya so the learner SEES the plan.
   */
  structureDiagram?: {
    fen: string;
    orientation?: Orientation;
    arrows?: { from: string; to: string }[];
    caption?: string;
  };
  /**
   * The concrete plan once the opening/theory ends — the pawn break to aim for,
   * where the pieces belong, the typical maneuver. Richer than whitePlan/blackPlan
   * (which describe the opening's idea); this is "now what do I actually do?".
   */
  middlegamePlan?: string;
  /** A multiple-choice "what's the idea?" question for the trainer's checkpoint. */
  ideaQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  /** Main line first; key variations after. At least one. */
  lines: OpeningLine[];
}

/** The learner's color in a generated opening drill. */
export type LearnerColor = Orientation;
