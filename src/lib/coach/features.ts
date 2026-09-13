// Position features and move tagging — the rule-based half of the coach.
// Everything here is computed with chess.js only (no engine), so it runs
// instantly on every move, in the browser, offline.

import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import type { Side } from "@/content/spec";
import type { MoveTag } from "./tags";

export const VALUE: Record<PieceSymbol, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };
export const PIECE_NAME: Record<PieceSymbol, string> = { p: "pawn", n: "knight", b: "bishop", r: "rook", q: "queen", k: "king" };

const FILES = "abcdefgh";
const CENTRE: Square[] = ["d4", "e4", "d5", "e5"];
const HOME_MINORS: Record<Color, Square[]> = { w: ["b1", "g1", "c1", "f1"], b: ["b8", "g8", "c8", "f8"] };

export interface Hanging {
  square: Square;
  piece: PieceSymbol;
  attackers: number;
  defenders: number;
  /** Value of the cheapest attacker. */
  cheapestAttacker: number;
}

export interface SideFeatures {
  /** Minor pieces still on their starting squares. */
  minorsHome: Square[];
  developedMinors: number;
  castled: boolean;
  canStillCastle: boolean;
  kingSquare: Square | null;
  /** Own pawns on the three files around the king, on the two ranks in front of it. */
  kingShieldPawns: number;
  /** Own pawns on the four centre squares. */
  centrePawns: number;
  /** Number of own attacks on the four centre squares. */
  centreControl: number;
  hanging: Hanging[];
  material: number;
  doubledFiles: string[];
  isolatedFiles: string[];
}

export interface PositionFeatures {
  white: SideFeatures;
  black: SideFeatures;
  /** Plies played so far. */
  ply: number;
}

export interface PlyRecord {
  san: string;
  uci: string;
  color: Side;
}

function sideFeatures(game: Chess, color: Color, history: PlyRecord[]): SideFeatures {
  const board = game.board();
  const side: Side = color === "w" ? "white" : "black";
  const own: { square: Square; type: PieceSymbol }[] = [];
  for (const row of board) for (const cell of row) if (cell && cell.color === color) own.push({ square: cell.square, type: cell.type });

  const minorsHome = HOME_MINORS[color].filter((sq) => {
    const p = game.get(sq);
    return p && p.color === color && (p.type === "n" || p.type === "b");
  });

  const king = own.find((p) => p.type === "k");
  const kingSquare = king?.square ?? null;
  const castled = history.some((h) => h.color === side && /^O-O(-O)?/.test(h.san));
  const rights = game.getCastlingRights(color);
  const canStillCastle = !!(rights.k || rights.q);

  let kingShieldPawns = 0;
  if (kingSquare) {
    const kf = FILES.indexOf(kingSquare[0]);
    const kr = Number(kingSquare[1]);
    const dir = color === "w" ? 1 : -1;
    for (const df of [-1, 0, 1]) {
      const f = kf + df;
      if (f < 0 || f > 7) continue;
      for (const dr of [1, 2]) {
        const r = kr + dir * dr;
        if (r < 1 || r > 8) continue;
        const p = game.get((FILES[f] + r) as Square);
        if (p && p.color === color && p.type === "p") kingShieldPawns++;
      }
    }
  }

  const centrePawns = CENTRE.filter((sq) => {
    const p = game.get(sq);
    return p && p.color === color && p.type === "p";
  }).length;
  const centreControl = CENTRE.reduce((n, sq) => n + game.attackers(sq, color).length, 0);

  const opp: Color = color === "w" ? "b" : "w";
  const hanging: Hanging[] = [];
  for (const p of own) {
    if (p.type === "k") continue;
    const attackers = game.attackers(p.square, opp);
    if (!attackers.length) continue;
    const defenders = game.attackers(p.square, color);
    const cheapest = Math.min(...attackers.map((sq) => VALUE[game.get(sq)!.type]));
    if (defenders.length === 0 || cheapest < VALUE[p.type]) {
      hanging.push({ square: p.square, piece: p.type, attackers: attackers.length, defenders: defenders.length, cheapestAttacker: cheapest });
    }
  }

  const material = own.reduce((s, p) => s + (p.type === "k" ? 0 : VALUE[p.type]), 0);

  const pawnFiles = own.filter((p) => p.type === "p").map((p) => p.square[0]);
  const counts = new Map<string, number>();
  for (const f of pawnFiles) counts.set(f, (counts.get(f) ?? 0) + 1);
  const doubledFiles = [...counts.entries()].filter(([, n]) => n > 1).map(([f]) => f);
  const isolatedFiles = [...counts.keys()].filter((f) => {
    const i = FILES.indexOf(f);
    return !counts.has(FILES[i - 1] ?? "") && !counts.has(FILES[i + 1] ?? "");
  });

  return {
    minorsHome,
    developedMinors: 4 - minorsHome.length,
    castled,
    canStillCastle,
    kingSquare,
    kingShieldPawns,
    centrePawns,
    centreControl,
    hanging,
    material,
    doubledFiles,
    isolatedFiles,
  };
}

export function extractFeatures(fen: string, history: PlyRecord[]): PositionFeatures {
  const game = new Chess(fen);
  return { white: sideFeatures(game, "w", history), black: sideFeatures(game, "b", history), ply: history.length };
}

export interface MoveInfo {
  san: string;
  uci: string;
  color: Side;
  piece: PieceSymbol;
  captured?: PieceSymbol;
  from: Square;
  to: Square;
  isCheck: boolean;
  isCastle: boolean;
}

/** Describe a move (from the position BEFORE it). */
export function describeMove(fenBefore: string, uci: string): MoveInfo | null {
  try {
    const g = new Chess(fenBefore);
    const m = g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never });
    return {
      san: m.san,
      uci,
      color: m.color === "w" ? "white" : "black",
      piece: m.piece,
      captured: m.captured,
      from: m.from,
      to: m.to,
      isCheck: g.isCheck(),
      isCastle: m.isKingsideCastle() || m.isQueensideCastle(),
    };
  } catch {
    return null;
  }
}

const OPENING_PLIES = 20;

/**
 * Tag what the move did. `history` is the game BEFORE this move (so the last
 * entry is the opponent's reply to the mover's previous move).
 */
export function tagMove(fenBefore: string, fenAfter: string, move: MoveInfo, history: PlyRecord[]): MoveTag[] {
  const before = extractFeatures(fenBefore, history);
  const after = extractFeatures(fenAfter, [...history, { san: move.san, uci: move.uci, color: move.color }]);
  const me = move.color;
  const mine = after[me];
  const mineBefore = before[me];
  const ply = history.length;
  const inOpening = ply < OPENING_PLIES;
  const tags: MoveTag[] = [];

  // --- material / safety -------------------------------------------------------
  const wasHanging = new Set(mineBefore.hanging.map((h) => h.square));
  const newlyHanging = mine.hanging.filter((h) => !wasHanging.has(h.square) || h.square === move.to);
  const bigNew = newlyHanging.filter((h) => VALUE[h.piece] >= 3);
  if (bigNew.length) tags.push("hangs_piece");
  else if (newlyHanging.some((h) => h.piece === "p") && !move.captured) tags.push("hangs_pawn");

  const stillHanging = mine.hanging.filter((h) => wasHanging.has(h.square) && h.square !== move.to && VALUE[h.piece] >= 3);
  const capturedValue = move.captured ? VALUE[move.captured] : 0;
  if (stillHanging.length && capturedValue < Math.max(...stillHanging.map((h) => VALUE[h.piece]))) tags.push("leaves_piece_hanging");

  if (move.captured) {
    tags.push("captures");
    const movedNowHanging = mine.hanging.some((h) => h.square === move.to);
    if (!movedNowHanging && capturedValue >= 1) tags.push("wins_material");
  }
  if (wasHanging.has(move.from) && !mine.hanging.some((h) => h.square === move.to)) tags.push("rescues_piece");

  // --- development & tempo ----------------------------------------------------------
  if (move.isCastle) tags.push("castles");
  const isMinor = move.piece === "n" || move.piece === "b";
  if (isMinor && HOME_MINORS[me === "white" ? "w" : "b"].includes(move.from)) tags.push("develops");
  if (move.piece === "p" && (CENTRE.includes(move.to) || move.to === "c4" || move.to === "c5")) tags.push("claims_centre");
  if (move.isCheck) tags.push("gives_check");

  if (inOpening) {
    if (move.piece === "q" && !move.captured && !move.isCheck && ply < 12) tags.push("early_queen");

    // Same piece twice in a row (not a capture, not fleeing an attack).
    const myLast = [...history].reverse().find((h) => h.color === me);
    if (myLast && myLast.uci.slice(2, 4) === move.from && !move.captured && !move.isCheck && !wasHanging.has(move.from) && move.piece !== "p") {
      tags.push("loses_tempo_same_piece");
    }

    if (move.piece === "k" && !move.isCastle) tags.push("moves_king_early");

    // Flank pawn moves (or a repeat move) while two or more minors sit at home.
    const flankPawn = move.piece === "p" && !move.captured && "abcfgh".includes(move.to[0]) && !CENTRE.includes(move.to);
    if (flankPawn && mineBefore.minorsHome.length >= 2 && !move.isCheck) tags.push("delays_development");

    // Move 8+, could castle, king still uncastled and this move wasn't it.
    if (ply >= 14 && !mine.castled && mine.canStillCastle && !move.isCastle && !move.captured && !move.isCheck) tags.push("delays_castling");
  }

  // --- king shield & structure -------------------------------------------------------
  if (move.piece === "p" && !move.captured && mine.kingShieldPawns < mineBefore.kingShieldPawns) tags.push("weakens_king_shield");
  if (mine.doubledFiles.length > mineBefore.doubledFiles.length) tags.push("doubles_pawns");
  if (mine.isolatedFiles.length > mineBefore.isolatedFiles.length) tags.push("isolates_pawn");

  return tags;
}
