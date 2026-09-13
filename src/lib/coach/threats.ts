// Concrete, checkable facts about the position the user is looking at: what of
// theirs is attacked, what of the opponent's can be taken, whether they're in
// check. This is the "what should I be thinking about?" layer — teaching the
// scan every move, not handing over the answer.

import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import type { Side } from "@/content/spec";
import { PIECE_NAME, VALUE } from "./features";

export interface AttackedPiece {
  square: Square;
  piece: PieceSymbol;
  attackers: Square[];
  defenders: Square[];
  /** Value of the cheapest attacker. */
  cheapestAttacker: number;
  /** True when the exchange loses material for the owner (undefended, or attacked by something cheaper). */
  losing: boolean;
}

export interface ThreatScan {
  inCheck: boolean;
  /** The user's pieces under attack, worst first. */
  mine: AttackedPiece[];
  /** The opponent's pieces the user can capture favourably, best first. */
  theirs: AttackedPiece[];
}

function attacked(game: Chess, color: Color): AttackedPiece[] {
  const opp: Color = color === "w" ? "b" : "w";
  const out: AttackedPiece[] = [];
  for (const row of game.board()) {
    for (const cell of row) {
      if (!cell || cell.color !== color || cell.type === "k") continue;
      const attackers = game.attackers(cell.square, opp);
      if (!attackers.length) continue;
      const defenders = game.attackers(cell.square, color);
      const cheapest = Math.min(...attackers.map((sq) => VALUE[game.get(sq)!.type]));
      out.push({
        square: cell.square,
        piece: cell.type,
        attackers,
        defenders,
        cheapestAttacker: cheapest,
        losing: defenders.length === 0 || cheapest < VALUE[cell.type],
      });
    }
  }
  return out.sort((a, b) => VALUE[b.piece] - VALUE[a.piece]);
}

/** Scan from the USER's point of view (`side`), regardless of whose turn it is. */
export function scanThreats(fen: string, side: Side): ThreatScan {
  const game = new Chess(fen);
  const me: Color = side === "white" ? "w" : "b";
  const opp: Color = me === "w" ? "b" : "w";
  const inCheck = game.turn() === me && game.isCheck();
  return {
    inCheck,
    mine: attacked(game, me).filter((p) => p.losing),
    theirs: attacked(game, opp).filter((p) => p.losing),
  };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** One-line, verifiable sentences a beginner can act on. Most important first. */
export function describeThreats(scan: ThreatScan, fen: string): string[] {
  const game = new Chess(fen);
  const out: string[] = [];
  if (scan.inCheck) out.push("You're in check — deal with that first.");
  for (const p of scan.mine.slice(0, 2)) {
    const by = PIECE_NAME[game.get(p.attackers[0])!.type];
    out.push(
      p.defenders.length === 0
        ? `Your ${PIECE_NAME[p.piece]} on ${p.square} is attacked by the ${by} and nothing defends it.`
        : `Your ${PIECE_NAME[p.piece]} on ${p.square} is attacked by a ${by} — a cheaper piece. Move it or defend it with something that makes the trade bad for them.`,
    );
  }
  for (const p of scan.theirs.slice(0, 1)) {
    out.push(
      p.defenders.length === 0
        ? `Their ${PIECE_NAME[p.piece]} on ${p.square} is undefended and you attack it.`
        : `${cap(PIECE_NAME[p.piece])} on ${p.square}: you can take it with something cheaper than it's worth.`,
    );
  }
  return out;
}
