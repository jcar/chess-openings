// Thin, framework-agnostic wrapper around chess.js. Activity players use this
// instead of touching chess.js directly, so the rest of the app deals in plain
// FEN strings and simple move objects.

import { Chess } from "chess.js";

export interface SimpleMove {
  from: string;
  to: string;
  /** Promotion piece ("q" | "r" | "b" | "n"); only set for promotions. */
  promotion?: string;
}

/** Convert a UCI string ("e2e4", "e7e8q") into a SimpleMove. */
export function uciToMove(uci: string): SimpleMove {
  const from = uci.slice(0, 2);
  const to = uci.slice(2, 4);
  const promotion = uci.length > 4 ? uci[4] : undefined;
  return { from, to, promotion };
}

/** Convert a SimpleMove into a UCI string. */
export function moveToUci(move: SimpleMove): string {
  return `${move.from}${move.to}${move.promotion ?? ""}`;
}

export type GameStatus =
  | "playing"
  | "checkmate"
  | "stalemate"
  | "draw"
  | "check";

export interface MoveResult {
  /** Whether the move was legal and applied. */
  ok: boolean;
  /** FEN after the move (unchanged if the move was illegal). */
  fen: string;
  /** SAN of the move, when legal. */
  san?: string;
  /** UCI of the move, when legal. */
  uci?: string;
  status: GameStatus;
}

function statusOf(game: Chess): GameStatus {
  if (game.isCheckmate()) return "checkmate";
  if (game.isStalemate()) return "stalemate";
  if (game.isDraw()) return "draw";
  if (game.isCheck()) return "check";
  return "playing";
}

/**
 * A lightweight handle around a single chess.js instance. Construct from a FEN,
 * apply moves, and read status. Players keep the FEN in React state and create
 * a fresh ChessGame per operation, which keeps the engine state out of React.
 */
export class ChessGame {
  private game: Chess;

  constructor(fen?: string) {
    this.game = fen ? new Chess(fen) : new Chess();
  }

  get fen(): string {
    return this.game.fen();
  }

  /** "w" or "b" — side to move. */
  get turn(): "w" | "b" {
    return this.game.turn();
  }

  get status(): GameStatus {
    return statusOf(this.game);
  }

  isGameOver(): boolean {
    return this.game.isGameOver();
  }

  /** Try to apply a move. Returns ok:false (not throwing) on an illegal move. */
  tryMove(move: SimpleMove): MoveResult {
    try {
      const applied = this.game.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion,
      });
      return {
        ok: true,
        fen: this.game.fen(),
        san: applied.san,
        uci: `${applied.from}${applied.to}${applied.promotion ?? ""}`,
        status: statusOf(this.game),
      };
    } catch {
      return { ok: false, fen: this.game.fen(), status: statusOf(this.game) };
    }
  }

  /** Apply a move given in SAN (used by guided replays). Returns the new FEN. */
  applySan(san: string): string {
    this.game.move(san);
    return this.game.fen();
  }

  /** Legal destination squares from a given square (for move-hint highlighting). */
  legalDestinations(square: string): string[] {
    return this.game
      .moves({ square: square as never, verbose: true })
      .map((m) => m.to);
  }
}

/**
 * Replay helper: given a start FEN and a list of SAN moves, return the FEN at
 * every step (index 0 = before any move). Used by the ReplayPlayer so stepping
 * is just an array index.
 */
export function buildReplayFens(steps: string[], startFen?: string): string[] {
  const game = new Chess(startFen);
  const fens = [game.fen()];
  for (const san of steps) {
    game.move(san);
    fens.push(game.fen());
  }
  return fens;
}

/**
 * The from/to squares of each replay move, so the UI can draw an arrow for the
 * move that produced each step (index i corresponds to step i+1's position).
 */
export function replayMoveSquares(
  steps: string[],
  startFen?: string,
): { from: string; to: string }[] {
  const game = new Chess(startFen);
  return steps.map((san) => {
    const m = game.move(san);
    return { from: m.from, to: m.to };
  });
}

/**
 * Convert a SAN move (e.g. "Nf3", "O-O", "exd5") legal in `fen` into its UCI
 * string ("g1f3"), or null if it isn't legal here. Lets non-UI libs turn book
 * theory (stored as SAN) into a playable move without importing chess.js.
 */
export function sanToUci(fen: string, san: string): string | null {
  const game = new Chess(fen);
  try {
    const m = game.move(san);
    return `${m.from}${m.to}${m.promotion ?? ""}`;
  } catch {
    return null;
  }
}

/**
 * If the side to move in `fen` is in check, return its king's square (for a
 * "danger" highlight); otherwise null.
 */
export function kingInCheckSquare(fen: string): string | null {
  let game: Chess;
  try {
    game = new Chess(fen);
  } catch {
    return null;
  }
  if (!game.isCheck()) return null;
  const turn = game.turn();
  const board = game.board();
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const sq = board[r][f];
      if (sq && sq.type === "k" && sq.color === turn) {
        return "abcdefgh"[f] + (8 - r);
      }
    }
  }
  return null;
}
