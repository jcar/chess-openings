// What a stop-down teaches. The coach already produces the words; this works out
// what to SHOW on the board, so the lesson points at the position rather than
// describing it.

import { Chess, type Square } from "chess.js";
import type { Side } from "@/content/spec";
import type { CoachMessage } from "./explain";

export interface LessonDeco {
  squares: string[];
  arrow?: { from: string; to: string };
}

const PIECE_LETTERS = new Set(["K", "Q", "R", "B", "N"]);

/** "Bf4" -> { piece: "b", to: "f4" }; "e3" -> { piece: "p", to: "e3" }. */
function parseTarget(san: string): { piece: string; to: string } | null {
  const clean = san.replace(/[+#!?]/g, "");
  const to = clean.slice(-2);
  if (!/^[a-h][1-8]$/.test(to)) return null;
  const head = clean[0];
  return { piece: PIECE_LETTERS.has(head) ? head.toLowerCase() : "p", to };
}

/**
 * For a broken order rule, point at the piece the rule was protecting and the
 * square it can no longer reach — for the London, the bishop still on c1 and the
 * f4 it wanted, now blocked by your own pawn on e3.
 */
export function lessonDeco(fenAfter: string, message: CoachMessage, side: Side, lastMoveTo?: string): LessonDeco | null {
  const squares: string[] = lastMoveTo ? [lastMoveTo] : [];

  if (message.source !== "setup" || !message.bestSan) return squares.length ? { squares } : null;
  const target = parseTarget(message.bestSan);
  if (!target) return { squares };

  let board;
  try {
    board = new Chess(fenAfter).board();
  } catch {
    return { squares };
  }
  const colour = side === "white" ? "w" : "b";
  for (const row of board) {
    for (const cell of row) {
      if (!cell || cell.color !== colour || cell.type !== target.piece) continue;
      // The piece that wanted that square, wherever it is stranded now.
      return { squares: [...squares, cell.square as Square, target.to], arrow: { from: cell.square, to: target.to } };
    }
  }
  return { squares: [...squares, target.to] };
}
