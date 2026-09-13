// Where evaluations come from: baked tables first (instant, offline), then the
// in-page engine. Scores are always from the SIDE-TO-MOVE's perspective.

import type { EngineLike } from "@/lib/chess/stockfish";
import type { MergedBook } from "@/lib/book/merged";

export interface Evaluation {
  /** Centipawns for the side to move (mates saturated to ±10000). */
  cp: number;
  bestUci: string | null;
  /** Best-first candidate lines [uci, cp]. */
  lines: [string, number][];
  source: "baked" | "engine";
  depth?: number;
}

export interface EvalOptions {
  depth?: number;
  signal?: AbortSignal;
  /** Give up (resolve null) after this long. */
  timeoutMs?: number;
}

export async function evaluate(book: MergedBook, fen: string, engine: EngineLike | null, opts: EvalOptions = {}): Promise<Evaluation | null> {
  const baked = book.evalLines(fen);
  if (baked && baked.length) return { cp: baked[0][1], bestUci: baked[0][0], lines: baked, source: "baked" };
  if (!engine) return null;

  const depth = opts.depth ?? 10;
  const run = engine.analyzeMulti(fen, { depth, multiPV: 3, signal: opts.signal });
  const timeout = new Promise<null>((r) => setTimeout(() => r(null), opts.timeoutMs ?? 4000));
  const result = await Promise.race([run, timeout]);
  if (!result || result.aborted || !result.lines.length) {
    if (!result) engine.abortAnalysis();
    return null;
  }
  const lines = result.lines.map((l) => [l.uci, l.mate != null ? (l.mate > 0 ? 10000 - l.mate : -10000 - l.mate) : l.cp ?? 0] as [string, number]);
  return { cp: lines[0][1], bestUci: result.bestMove ?? lines[0][0], lines, source: "engine", depth: result.depth };
}
