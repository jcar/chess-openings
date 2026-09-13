// Helpers for hand-authored specs. Annotations are keyed by EPD; typing FENs by
// hand is error-prone, so specs describe positions as move lists and compute the
// key at module load. Illegal move lists throw at import time — which is what we
// want: the build fails loudly instead of shipping a dead annotation.

import { Chess } from "chess.js";
import { epd, type EPD } from "@/lib/book/key";

/** EPD after the given SAN moves from the start position, e.g. pos("e4 e5 Nf3"). */
export function pos(sans: string): EPD {
  const game = new Chess();
  for (const san of sans.trim().split(/\s+/).filter(Boolean)) {
    const clean = san.replace(/^\d+\.(\.\.)?/, "");
    if (!clean) continue;
    game.move(clean);
  }
  return epd(game.fen());
}

/** FEN after the given SAN moves (for diagrams). */
export function fenAfter(sans: string): string {
  const game = new Chess();
  for (const san of sans.trim().split(/\s+/).filter(Boolean)) {
    const clean = san.replace(/^\d+\.(\.\.)?/, "");
    if (clean) game.move(clean);
  }
  return game.fen();
}

/** SAN list from a spaced string, tolerating move numbers: "1.e4 e5 2.Nf3" → ["e4","e5","Nf3"]. */
export function sans(line: string): string[] {
  return line
    .trim()
    .split(/\s+/)
    .map((t) => t.replace(/^\d+\.(\.\.)?/, ""))
    .filter(Boolean);
}
