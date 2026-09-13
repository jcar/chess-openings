// OpeningSpec — the content model for this app.
//
// Content hangs off POSITIONS and IDEAS, not off linear lines. The baked Lichess
// data (public/data/explorer) decides which positions matter for sub-1200 play;
// the spec attaches the "why" to those positions. Chess facts (moves, FENs) are
// reused from anywhere; the prose here is original.

import type { EPD } from "@/lib/book/key";

export type Side = "white" | "black";
export type Family = "1e4-e5" | "1e4-other" | "1d4" | "flank";
export type PieceLetter = "N" | "B" | "R" | "Q" | "K";

/** Where the user's pieces belong in this opening. Machine-checkable, so the
 *  coach can score progress against ANY opponent play, not just theory. */
export interface SetupSpec {
  /** Each entry: this piece type should end up on one of these squares. */
  pieces: { piece: PieceLetter; squares: string[]; why?: string }[];
  /** Pawn squares that define the structure (e.g. d4, e3, c3). */
  pawns: string[];
  /** Ordering rules, in SAN: `before` must be played before `after`.
   *  Either side may list alternatives separated by "|" (e.g. "Bf5|Bg4"). */
  order?: { before: string; after: string; why: string }[];
  castle: "O-O" | "O-O-O" | "either" | "none";
  /** Target move number to be castled by (soft). */
  castleBy?: number;
}

/** What makes an idea card fire during play. */
export type IdeaTrigger =
  | { kind: "opponent_san"; sans: string[] }
  | { kind: "opponent_piece_on"; piece: PieceLetter | "P" | "Q"; squares: string[] }
  | { kind: "tag"; tags: string[] }
  | { kind: "epd"; epds: EPD[] }
  | { kind: "book_end" };

export interface IdeaCard {
  id: string;
  title: string;
  /** One sentence a beginner can hold in their head. */
  oneLiner: string;
  why: string;
  trigger?: IdeaTrigger;
  /** What to do when it fires. */
  response?: string;
  /** What tends to happen if you don't. */
  ifIgnored?: string;
  /** Optional diagram. */
  fen?: string;
  arrows?: { from: string; to: string }[];
}

export type Verdict = "good" | "dubious" | "bad";

export interface Reply {
  san: string;
  verdict: Verdict;
  /** Your recommended answer, in SAN. */
  answer?: string;
  howToAnswer: string;
  why: string;
}

export interface Checkpoint {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Everything authored about one position (keyed by EPD in the spec). */
export interface Annotation {
  /** If it's YOUR move here: what you play and why. */
  yourMove?: { san: string; why: string };
  /** If it's YOUR move here: common wrong moves and why they're wrong. */
  mistakes?: { san: string; why: string }[];
  /** If it's THEIR move here: what they actually play at this level and how to answer. */
  replies?: Reply[];
  /** Pause before the user's move and ask for the plan. */
  checkpoint?: Checkpoint;
  /** Free note shown when this position is reached (either side to move). */
  note?: string;
}

export interface Trap {
  name: string;
  /** Full SAN sequence from the start position. */
  sans: string[];
  /** Who wins material / the game if the trap lands. */
  punisher: Side;
  /** How to recognise it's coming. */
  tell: string;
  why: string;
}

export interface ModelGame {
  label: string;
  sans: string[];
  summary: string;
}

export interface StructureDiagram {
  fen: string;
  orientation?: Side;
  arrows?: { from: string; to: string }[];
  caption?: string;
}

export interface OpeningSpec {
  id: string;
  name: string;
  aliases?: string[];
  eco?: string;
  /** The side the user plays. */
  side: Side;
  family: Family;
  /** Defining moves as display text, e.g. "1.e4 e5 2.Nf3 Nc6 3.Bc4". */
  firstMoves: string;
  tabiyaFen: string;
  /** Two sentences: why play this at your level. */
  pitch: string;
  setup: SetupSpec;
  ideas: IdeaCard[];
  annotations: Record<EPD, Annotation>;
  traps: Trap[];
  modelGames: ModelGame[];
  middlegamePlan: string;
  structureDiagram?: StructureDiagram;
  /** True when produced by the legacy adapter (thinner coaching). */
  legacy?: boolean;
}
