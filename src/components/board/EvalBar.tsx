"use client";

// Vertical Stockfish evaluation gauge, sized to sit alongside the board in the
// Strategy Lab. It debounces an `analyze()` call per position, maps the engine's
// centipawn/mate score to a White-win fraction, and animates a two-tone column
// (White fill grows from the bottom as White's advantage grows). The numeric
// readout uses the conventional "+1.4 / M3" form. Browser-only (Stockfish runs
// in a Web Worker); on the server / first paint it renders a neutral 50/50 bar.

import { useEffect, useRef, useState } from "react";
import type { Orientation } from "@/content/types";
import { getEngine, type Analysis } from "@/lib/chess/stockfish";

interface Props {
  fen: string;
  /** Which side sits at the bottom of the board; the bar matches so the side to
   *  move's advantage reads in the same direction as the pieces. */
  orientation?: Orientation;
  /** Search depth — kept modest (a Lab steps through many positions). */
  depth?: number;
  /** Debounce before analysing, so rapid stepping doesn't queue stale work. */
  debounceMs?: number;
}

/** cp (White's perspective) → White win fraction 0..1 (a gentle logistic). */
function winFraction(cp: number): number {
  return 1 / (1 + Math.pow(10, -cp / 400));
}

/** Side-to-move analysis → White's perspective {cp, mate}. */
function toWhite(a: Analysis, whiteToMove: boolean): { cp: number | null; mate: number | null } {
  const sign = whiteToMove ? 1 : -1;
  return {
    cp: a.cp == null ? null : a.cp * sign,
    mate: a.mate == null ? null : a.mate * sign,
  };
}

/** Short human label, e.g. "+1.4", "−0.6", "M3", "0.0". */
function label(cp: number | null, mate: number | null): string {
  if (mate != null) return mate > 0 ? `M${mate}` : `−M${Math.abs(mate)}`;
  if (cp == null) return "0.0";
  const v = cp / 100;
  if (Math.abs(v) < 0.05) return "0.0";
  return `${v > 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}`;
}

export function EvalBar({ fen, orientation = "white", depth = 12, debounceMs = 250 }: Props) {
  const [white, setWhite] = useState<{ cp: number | null; mate: number | null } | null>(null);
  const [thinking, setThinking] = useState(false);
  // Guard against a slow analysis from a previous FEN landing after a newer one.
  const reqId = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const whiteToMove = fen.split(" ")[1] !== "b";
    const id = ++reqId.current;
    const t = setTimeout(() => {
      setThinking(true);
      getEngine()
        .analyze(fen, depth)
        .then((a) => {
          if (id !== reqId.current) return; // a newer position superseded this
          setWhite(toWhite(a, whiteToMove));
          setThinking(false);
        })
        .catch(() => {
          if (id === reqId.current) setThinking(false);
        });
    }, debounceMs);
    return () => clearTimeout(t);
  }, [fen, depth, debounceMs]);

  // White win fraction → fraction shown at the BOTTOM (matches orientation).
  let whiteFrac = 0.5;
  if (white) {
    if (white.mate != null) whiteFrac = white.mate > 0 ? 1 : 0;
    else if (white.cp != null) whiteFrac = winFraction(white.cp);
  }
  const bottomFrac = orientation === "white" ? whiteFrac : 1 - whiteFrac;
  const bottomPct = Math.round(bottomFrac * 100);

  // The readout belongs to whichever side is winning; place it at that end.
  const text = white ? label(white.cp, white.mate) : "0.0";
  const whiteWinning = whiteFrac >= 0.5;
  const labelAtBottom = orientation === "white" ? whiteWinning : !whiteWinning;

  return (
    <div
      className="relative h-full w-7 shrink-0 overflow-hidden rounded-lg bg-[#2b3245] ring-1 ring-black/30 sm:w-8"
      role="img"
      aria-label={`Evaluation ${text} (White ${Math.round(whiteFrac * 100)} percent)`}
    >
      {/* The side-at-bottom's share, growing from the floor. */}
      <div
        className="absolute inset-x-0 bottom-0 bg-[#eef2f8] transition-[height] duration-500 ease-out motion-reduce:transition-none"
        style={{ height: `${bottomPct}%` }}
      />
      {/* Midline marker at 50%. */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-accent/50" />
      {/* Numeric readout, tucked at the winning end and tinted to contrast its band. */}
      <span
        className={`absolute inset-x-0 text-center font-mono text-[10px] font-bold tabular-nums leading-none ${
          labelAtBottom ? "bottom-1 text-[#1a2030]" : "top-1 text-[#dfe6f2]"
        } ${thinking ? "opacity-50" : "opacity-100"}`}
      >
        {text}
      </span>
    </div>
  );
}
