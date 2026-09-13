"use client";

// Responsive wrapper around react-chessboard v5. Centralizes the v5 `options`
// API and our board styling. Supports two input modes:
//   • drag (always, when interactive) via onDrop
//   • tap-to-move (when getLegalMoves + onMove are provided) — tap a piece to
//     light up its legal squares as dots, then tap a square to move. This is the
//     friendly path for young children / small fingers.

import { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import type { Orientation } from "@/content/types";

export interface BoardProps {
  /** Current position as a FEN string. */
  fen: string;
  orientation: Orientation;
  /**
   * Called when the user drops a piece. Return true to accept the move, false
   * to snap it back.
   */
  onDrop?: (sourceSquare: string, targetSquare: string) => boolean;
  /** When false, pieces can't be dragged (e.g. guided replay). */
  interactive?: boolean;
  /** Optional square highlights merged under selection/hint styling. */
  squareStyles?: Record<string, React.CSSProperties>;
  /**
   * Enables tap-to-move. Given a square, return the legal destination squares
   * for the piece there (empty array if none / not movable).
   */
  getLegalMoves?: (square: string) => string[];
  /** Called when a tap-to-move completes. */
  onMove?: (from: string, to: string) => void;
  /** Called when a piece is selected by tapping (e.g. to play a sound). */
  onSelect?: (square: string) => void;
  /** Squares to emphasize as a hint (e.g. the correct move's from/to). */
  highlightSquares?: string[];
  /** Arrows to draw, e.g. a move (from→to) or a piece's movement pattern. */
  arrows?: { from: string; to: string; color?: string }[];
  /**
   * The most recent move — its from + to squares get a soft "last move" tint so
   * you can see what just changed after looking away. `mine` picks the color:
   * warm gold for your move, cool slate for the opponent's.
   */
  lastMove?: { from: string; to: string; mine?: boolean };
  /** Squares to flash red as a "danger!" cue (e.g. a king in check). */
  dangerSquares?: string[];
  /**
   * Raw square-tap handler (used by the coordinates game). When provided it
   * takes precedence over tap-to-move.
   */
  onSquareTap?: (square: string) => void;
  /** Show file/rank notation (default true). Hidden for the coordinates game. */
  showNotation?: boolean;
}

/** Which squares are occupied, parsed from a FEN's piece-placement field. */
function occupiedSquares(fen: string): Set<string> {
  const out = new Set<string>();
  const placement = fen.split(" ")[0] ?? "";
  const ranks = placement.split("/");
  for (let r = 0; r < ranks.length; r++) {
    let file = 0;
    for (const ch of ranks[r]) {
      if (/\d/.test(ch)) {
        file += Number(ch);
      } else {
        const sq = "abcdefgh"[file] + (8 - r);
        out.add(sq);
        file += 1;
      }
    }
  }
  return out;
}

// Generic scroll-bounce guard: after a board move, content BELOW the board often
// changes height for a beat (a feedback line shrinking, a button toggling, an
// opponent's auto-reply). If you're scrolled near the bottom, that transient
// shrink drops max-scroll below your position, so the browser clamps you up, then
// scroll-anchoring drops you back — a visible "bounce". Briefly pinning the
// document's min-height to its pre-move value keeps the page from shrinking
// during the transient, so there's nothing to clamp. One place → every board is
// covered (current and future). See memory: board-scroll-bounce.
let releaseHeightTimer: ReturnType<typeof setTimeout> | undefined;
function holdDocumentHeight(ms = 1200): void {
  if (typeof document === "undefined") return;
  const h = document.documentElement.scrollHeight;
  document.body.style.minHeight = `${h}px`;
  clearTimeout(releaseHeightTimer);
  releaseHeightTimer = setTimeout(() => {
    document.body.style.minHeight = "";
  }, ms);
}

// Legal-move dots stay green — the universal "you can go here" cue, and it reads
// instantly against the slate board.
const DOT_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(circle, rgba(70,214,160,0.7) 24%, transparent 26%)",
};
const CAPTURE_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(circle, transparent 62%, rgba(70,214,160,0.72) 64%)",
  borderRadius: "50%",
};
// Selection + hints are sapphire — the house accent, carried onto the board.
const SELECTED_STYLE: React.CSSProperties = {
  background: "rgba(79,143,247,0.5)",
  boxShadow: "inset 0 0 0 3px rgba(134,184,255,0.9)",
};
const HINT_STYLE: React.CSSProperties = {
  background: "rgba(79,143,247,0.6)",
  boxShadow: "inset 0 0 0 4px rgba(134,184,255,0.95)",
};

const DANGER_STYLE: React.CSSProperties = {
  animation: "kidDanger 0.8s ease-in-out infinite",
};

// Last-move tint: warm amber for your move, violet for the opponent's — both
// clearly distinct from the slate board, the green dots, and the sapphire accent.
const LAST_MOVE_SELF: React.CSSProperties = { background: "rgba(240,179,65,0.4)" };
const LAST_MOVE_OPP: React.CSSProperties = { background: "rgba(168,85,247,0.42)" };

export function Board({
  fen,
  orientation,
  onDrop,
  interactive = true,
  squareStyles,
  getLegalMoves,
  onMove,
  onSelect,
  highlightSquares,
  arrows,
  lastMove,
  dangerSquares,
  onSquareTap,
  showNotation = true,
}: BoardProps) {
  const tapEnabled = Boolean(getLegalMoves && onMove);
  // The selection is tied to the position it was made on; if the FEN changes
  // (a move was played, or Reset), the selection is treated as cleared. This
  // derives the cleared state instead of clearing it in an effect.
  const [sel, setSel] = useState<{ square: string; fen: string } | null>(null);
  const selected = sel && sel.fen === fen ? sel.square : null;

  const selectedDests = useMemo(
    () => (selected && getLegalMoves ? getLegalMoves(selected) : []),
    [selected, getLegalMoves],
  );

  const computedStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = { ...(squareStyles ?? {}) };
    // Last-move tint sits at the base layer so selection / hints / dots show on top.
    if (lastMove) {
      const tint = lastMove.mine ? LAST_MOVE_SELF : LAST_MOVE_OPP;
      styles[lastMove.from] = { ...styles[lastMove.from], ...tint };
      styles[lastMove.to] = { ...styles[lastMove.to], ...tint };
    }
    const occupied = selectedDests.length ? occupiedSquares(fen) : null;
    for (const sq of selectedDests) {
      styles[sq] = occupied?.has(sq) ? CAPTURE_STYLE : DOT_STYLE;
    }
    if (selected) styles[selected] = { ...styles[selected], ...SELECTED_STYLE };
    for (const sq of highlightSquares ?? []) {
      styles[sq] = { ...styles[sq], ...HINT_STYLE };
    }
    for (const sq of dangerSquares ?? []) {
      styles[sq] = { ...styles[sq], ...DANGER_STYLE };
    }
    return styles;
  }, [squareStyles, selectedDests, selected, highlightSquares, dangerSquares, fen, lastMove]);

  const boardArrows = useMemo(
    () =>
      (arrows ?? []).map((a) => ({
        startSquare: a.from,
        endSquare: a.to,
        color: a.color ?? "#4f8ff7", // sapphire
      })),
    [arrows],
  );

  function handleSquareClick(square: string) {
    if (!tapEnabled || !getLegalMoves || !onMove) return;
    if (selected && selectedDests.includes(square)) {
      const from = selected;
      setSel(null);
      holdDocumentHeight();
      onMove(from, square);
      return;
    }
    const dests = getLegalMoves(square);
    setSel(dests.length ? { square, fen } : null);
    // Tell the coach about the tap even when the piece can't move: a piece with
    // no legal destinations is usually pinned, which is precisely the case worth
    // warning about. Empty squares and enemy pieces are ignored downstream.
    onSelect?.(square);
  }

  return (
    <div
      data-chessboard
      className="board-frame mx-auto w-full max-w-[min(92vw,560px,72svh)] touch-none select-none"
    >
     <div className="board-inner">
      <Chessboard
        options={{
          position: fen,
          boardOrientation: orientation,
          allowDragging: interactive,
          showAnimations: true,
          animationDurationInMs: 200,
          squareStyles: computedStyles,
          arrows: boardArrows,
          showNotation,
          // CSS vars let kid screens reskin the board (see lib/kids/cosmetics);
          // the hex fallbacks keep every other board exactly as before.
          darkSquareStyle: { backgroundColor: "var(--board-dark, #7c93b5)" },
          lightSquareStyle: { backgroundColor: "var(--board-light, #e6ecf5)" },
          onSquareClick: onSquareTap
            ? ({ square }) => onSquareTap(square)
            : tapEnabled
              ? ({ square }) => handleSquareClick(square)
              : undefined,
          onPieceDrop: ({ sourceSquare, targetSquare }) => {
            if (!onDrop || !targetSquare) return false;
            holdDocumentHeight();
            return onDrop(sourceSquare, targetSquare);
          },
        }}
      />
     </div>
    </div>
  );
}
