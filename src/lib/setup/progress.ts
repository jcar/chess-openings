// Scores the user's position against the opening's target SETUP. This is what
// lets the coach say something useful when the opponent leaves theory: "your
// bishop still needs to reach f4", "you castled — good", "e3 before Bf4 locked
// your bishop in".

import { Chess, type Square } from "chess.js";
import type { PieceLetter, SetupSpec, Side } from "@/content/spec";

export interface PlyRecord {
  san: string;
  /** Who played it. */
  color: Side;
}

export interface PieceGoal {
  piece: PieceLetter;
  squares: string[];
  done: boolean;
  /** Where the piece currently is, if found on a target square. */
  on?: string;
}

export interface SetupProgress {
  pieces: PieceGoal[];
  pawns: { square: string; done: boolean }[];
  castled: boolean;
  castleWanted: boolean;
  orderViolations: { before: string; after: string; why: string }[];
  /** 0–1 share of goals met (castling counts as one goal when wanted). */
  score: number;
  /** Total and met goal counts, for a "5 of 8" readout. */
  met: number;
  total: number;
}

const strip = (san: string) => san.replace(/[+#!?]/g, "");

function hasCastled(history: PlyRecord[], side: Side): boolean {
  return history.some((p) => p.color === side && /^O-O(-O)?$/.test(strip(p.san)));
}


const LIGHT_SQUARE = (sq: string) => (sq.charCodeAt(0) - 97 + Number(sq[1])) % 2 === 1;

/** Could the side still play one of these moves at all? Only the piece's
 *  existence and, for a bishop, its colour complex — not a full search. */
export function canStillSatisfy(game: Chess, color: "w" | "b", alternatives: string): boolean {
  const alts = alternatives.split("|").map((a) => strip(a.trim())).filter(Boolean);
  if (!alts.length) return true;
  const present = game
    .board()
    .flat()
    .filter((c): c is NonNullable<typeof c> => !!c && c.color === color);

  return alts.some((alt) => {
    const to = alt.slice(-2);
    if (!/^[a-h][1-8]$/.test(to)) return true;
    const head = alt[0];
    if (!/[KQRBN]/.test(head)) return present.some((p) => p.type === "p"); // a pawn move
    const type = head.toLowerCase();
    const candidates = present.filter((p) => p.type === type);
    if (!candidates.length) return false;
    // A bishop can only ever reach squares of its own colour.
    if (type === "b") return candidates.some((p) => LIGHT_SQUARE(p.square) === LIGHT_SQUARE(to));
    return true;
  });
}

export function setupProgress(fen: string, setup: SetupSpec, side: Side, history: PlyRecord[]): SetupProgress {
  const game = new Chess(fen);
  const color = side === "white" ? "w" : "b";

  const pieces: PieceGoal[] = setup.pieces.map((goal) => {
    const on = goal.squares.find((sq) => {
      const p = game.get(sq as Square);
      return p && p.color === color && p.type.toUpperCase() === goal.piece;
    });
    return { piece: goal.piece, squares: goal.squares, done: !!on, on };
  });

  const pawns = setup.pawns.map((sq) => {
    const p = game.get(sq as Square);
    return { square: sq, done: !!p && p.color === color && p.type === "p" };
  });

  const castleWanted = setup.castle !== "none";
  const castled = hasCastled(history, side);

  const mine = history.filter((p) => p.color === side).map((p) => strip(p.san));
  // `before`/`after` may list alternatives with "|" (e.g. "Bf5|Bg4"): the rule
  // is satisfied if ANY alternative of `before` came before the first `after`.
  const firstIndex = (alts: string) => {
    const idxs = alts.split("|").map((a) => mine.indexOf(strip(a))).filter((i) => i !== -1);
    return idxs.length ? Math.min(...idxs) : -1;
  };
  const orderViolations = (setup.order ?? []).filter((rule) => {
    const iAfter = firstIndex(rule.after);
    const iBefore = firstIndex(rule.before);
    if (iAfter === -1 || (iBefore !== -1 && iBefore < iAfter)) return false;
    // A rule protects a piece. Once that piece is off the board there is nothing
    // left to protect, and the rule is moot: the Caro-Kann's "bishop out before
    // ...e6" means nothing after the bishop has been traded.
    return canStillSatisfy(game, color, rule.before);
  });

  const total = pieces.length + pawns.length + (castleWanted ? 1 : 0);
  const met = pieces.filter((p) => p.done).length + pawns.filter((p) => p.done).length + (castleWanted && castled ? 1 : 0);

  return {
    pieces,
    pawns,
    castled,
    castleWanted,
    orderViolations,
    score: total ? met / total : 0,
    met,
    total,
  };
}

/** The first unmet goal, phrased for a coach hint (or null when the setup is complete). */
export function nextSetupHint(progress: SetupProgress): string | null {
  const piece = progress.pieces.find((p) => !p.done);
  if (piece) {
    const name = { N: "knight", B: "bishop", R: "rook", Q: "queen", K: "king" }[piece.piece];
    return `Your ${name} belongs on ${piece.squares.join(" or ")}.`;
  }
  const pawn = progress.pawns.find((p) => !p.done);
  if (pawn) return `The structure wants a pawn on ${pawn.square}.`;
  if (progress.castleWanted && !progress.castled) return "Castle — get the king safe before opening the position.";
  return null;
}
