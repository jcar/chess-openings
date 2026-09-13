// What Caissa notices the moment you pick a piece up, before you commit to
// anything. One board clone and a handful of attacker lookups — cheap enough to
// run on a tap.
//
// She warns; she never blocks. A tap-completed move cannot be rejected by the
// board, and that is the right behaviour: you stay in charge.

import { Chess, type Color, type Square } from "chess.js";
import type { Side } from "@/content/spec";
import { PIECE_NAME } from "@/lib/coach/features";
import type { Deco } from "./types";

export type AnticipationKind = "pin" | "only_defender" | "all_covered";

export interface Anticipation {
  kind: AnticipationKind;
  text: string;
  more: string;
  deco: Deco;
}

const other = (c: Color): Color => (c === "w" ? "b" : "w");

function kingSquare(g: Chess, color: Color): Square | null {
  for (const row of g.board()) {
    for (const cell of row) if (cell && cell.color === color && cell.type === "k") return cell.square;
  }
  return null;
}

/**
 * `square` is the piece the user just selected. Returns the single most useful
 * thing to say about moving it, or null when there's nothing worth saying.
 */
export function anticipate(fen: string, square: string, side: Side): Anticipation | null {
  let g: Chess;
  try {
    g = new Chess(fen);
  } catch {
    return null;
  }
  const me: Color = side === "white" ? "w" : "b";
  const opp = other(me);
  const piece = g.get(square as Square);
  if (!piece || piece.color !== me || piece.type === "k") return null;
  const name = PIECE_NAME[piece.type];

  // --- pinned to the king -----------------------------------------------------
  const king = kingSquare(g, me);
  if (king) {
    const before = new Set(g.attackers(king, opp));
    const probe = new Chess(fen);
    probe.remove(square as Square);
    const pinners = probe.attackers(king, opp).filter((sq) => !before.has(sq));
    if (pinners.length) {
      const by = probe.get(pinners[0])!;
      return {
        kind: "pin",
        text: `That ${name}'s pinned — your king's behind it.`,
        more: `The ${PIECE_NAME[by.type]} on ${pinners[0]} is aiming through it at your king on ${king}. Move it and you lose material, or worse.`,
        deco: { squares: [square, pinners[0], king], arrow: { from: pinners[0], to: king } },
      };
    }
  }

  // --- the only thing defending something that's already attacked --------------
  for (const row of g.board()) {
    for (const cell of row) {
      if (!cell || cell.color !== me || cell.square === square || cell.type === "k") continue;
      if (!g.attackers(cell.square, opp).length) continue;
      const defenders = g.attackers(cell.square, me);
      if (defenders.length === 1 && defenders[0] === square) {
        return {
          kind: "only_defender",
          text: `That ${name}'s the only thing guarding ${cell.square}.`,
          more: `Your ${PIECE_NAME[cell.type]} on ${cell.square} is attacked, and this is its only defender. Move it and the ${PIECE_NAME[cell.type]} drops.`,
          deco: { squares: [square, cell.square], arrow: { from: square, to: cell.square } },
        };
      }
    }
  }

  // --- nowhere safe to go ------------------------------------------------------
  const dests = g.moves({ square: square as Square, verbose: true });
  if (dests.length) {
    // The piece can't defend the square it is moving to, so discount itself.
    const allCovered = dests.every(
      (m) => g.attackers(m.to as Square, opp).length > 0 && g.attackers(m.to as Square, me).filter((sq) => sq !== square).length === 0,
    );
    if (allCovered) {
      return {
        kind: "all_covered",
        text: `Every square that ${name} can reach is covered.`,
        more: `Each destination is attacked and none of them are defended. Improve something else, or change what's attacking those squares first.`,
        deco: { squares: [square, ...dests.map((m) => m.to)] },
      };
    }
  }

  return null;
}
