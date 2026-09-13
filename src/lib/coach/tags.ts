// The coach's vocabulary: what a move DID, in chess terms a beginner can act on.
// Tags are computed from position features (features.ts) and sit under the
// engine's verdict (classify.ts). Priority decides which one we talk about.

export type MoveTag =
  // things that cost you
  | "hangs_piece"
  | "hangs_pawn"
  | "leaves_piece_hanging"
  | "early_queen"
  | "loses_tempo_same_piece"
  | "weakens_king_shield"
  | "delays_castling"
  | "delays_development"
  | "doubles_pawns"
  | "isolates_pawn"
  | "moves_king_early"
  // things that help you
  | "wins_material"
  | "develops"
  | "castles"
  | "claims_centre"
  | "rescues_piece"
  | "gives_check"
  | "captures"
  // book status
  | "left_authored"
  | "rare_reply"
  | "common_reply";

/** Lower = talked about first. */
export const TAG_PRIORITY: Record<MoveTag, number> = {
  hangs_piece: 0,
  leaves_piece_hanging: 1,
  hangs_pawn: 2,
  early_queen: 3,
  loses_tempo_same_piece: 4,
  weakens_king_shield: 5,
  moves_king_early: 6,
  delays_castling: 7,
  delays_development: 8,
  doubles_pawns: 9,
  isolates_pawn: 10,
  left_authored: 11,
  rare_reply: 12,
  wins_material: 20,
  rescues_piece: 21,
  castles: 22,
  develops: 23,
  claims_centre: 24,
  gives_check: 25,
  captures: 26,
  common_reply: 27,
};

export const NEGATIVE_TAGS = new Set<MoveTag>([
  "hangs_piece",
  "hangs_pawn",
  "leaves_piece_hanging",
  "early_queen",
  "loses_tempo_same_piece",
  "weakens_king_shield",
  "delays_castling",
  "delays_development",
  "doubles_pawns",
  "isolates_pawn",
  "moves_king_early",
]);

export function topTag(tags: MoveTag[]): MoveTag | null {
  if (!tags.length) return null;
  return [...tags].sort((a, b) => TAG_PRIORITY[a] - TAG_PRIORITY[b])[0];
}

export function topNegativeTag(tags: MoveTag[]): MoveTag | null {
  return topTag(tags.filter((t) => NEGATIVE_TAGS.has(t)));
}
