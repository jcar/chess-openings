// Position identity. Baked data, annotations and the merged book are all keyed
// by EPD: the FEN minus the halfmove/fullmove clocks, so the same position
// reached by a different move order shares one key (transpositions collapse).
import { Chess } from "chess.js";

export type EPD = string;

/** FEN → EPD (first four fields). Round-trips through chess.js so en-passant and
 *  castling fields are normalized the same way everywhere. */
export function epd(fen: string): EPD {
  let normalized = fen;
  try {
    normalized = new Chess(fen).fen();
  } catch {
    /* keep the raw string; caller passed something chess.js rejects */
  }
  return normalized.split(" ").slice(0, 4).join(" ");
}

export const START_EPD: EPD = epd("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

/** Replay SAN moves from the start (or `fromFen`) and return the FEN after each ply. */
export function fensAlong(sans: readonly string[], fromFen?: string): string[] {
  const game = fromFen ? new Chess(fromFen) : new Chess();
  const out: string[] = [];
  for (const san of sans) {
    game.move(san); // throws on an illegal SAN — content validation catches it
    out.push(game.fen());
  }
  return out;
}
