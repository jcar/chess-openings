// How the bot picks a move.
//
// In the opening it plays like a real sub-1200 opponent: moves are sampled from
// the baked Lichess frequencies with a temperature τ (slack at low difficulty —
// including the junk beginners actually face — sharper at higher difficulty).
// Past the book it hands off to Stockfish at an adaptive strength.

import { Chess } from "chess.js";
import type { EngineLike } from "@/lib/chess/stockfish";
import type { MergedBook } from "@/lib/book/merged";

export interface Difficulty {
  /** Sampling temperature over explorer frequencies. 0.6 = sharp, 1.4 = slack. */
  tau: number;
  /** Stockfish strength once the book runs out. */
  botElo: number;
  /** Drop book moves whose baked loss is ≥ this many cp (Infinity = keep all). */
  maxBookLoss: number;
  /** Ignore book moves rarer than this share of games. */
  minFreq: number;
  /** How much the coach says. */
  verbosity: "verbose" | "normal" | "terse";
}

export const DIFFICULTY_PRESETS: Record<"gentle" | "normal" | "sharp", Difficulty> = {
  gentle: { tau: 1.4, botElo: 650, maxBookLoss: Infinity, minFreq: 0.01, verbosity: "verbose" },
  normal: { tau: 1.0, botElo: 900, maxBookLoss: 400, minFreq: 0.02, verbosity: "normal" },
  sharp: { tau: 0.6, botElo: 1200, maxBookLoss: 250, minFreq: 0.03, verbosity: "terse" },
};

export type BotSource = "explorer" | "authored" | "evals" | "engine";

export interface BotChoice {
  uci: string;
  san: string;
  source: BotSource;
}

/** Softmax-style sampling over `weights` (need not be normalised). */
export function sampleIndex(weights: number[], rand: number): number {
  const total = weights.reduce((s, w) => s + w, 0);
  if (total <= 0) return 0;
  let r = rand * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r < 0) return i;
  }
  return weights.length - 1;
}

function toSan(fen: string, uci: string): string | null {
  try {
    return new Chess(fen).move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never }).san;
  } catch {
    return null;
  }
}

export interface ChooseArgs {
  fen: string;
  book: MergedBook;
  difficulty: Difficulty;
  engine?: EngineLike;
  rng?: () => number;
  /** Middlegame engine think time. */
  moveTimeMs?: number;
}

/** Pick the bot's move. Pure in the book phase (no engine); async only for engine fallback. */
export async function chooseBotMove({ fen, book, difficulty, engine, rng = Math.random, moveTimeMs = 450 }: ChooseArgs): Promise<BotChoice | null> {
  const game = new Chess(fen);
  if (game.isGameOver()) return null;

  // Test seam: a scripted engine may dictate the move outright.
  const scripted = engine?.peekScripted?.(fen);
  if (scripted) {
    const san = toSan(fen, scripted);
    if (san) return { uci: scripted, san, source: "authored" };
  }

  // 0) Stay in the chosen opening: while the game is on the defining moves, the
  //    bot plays its part of them (otherwise 1.e4 would meet ...c5 a third of the time).
  const defining = book.definingMoveAt(fen);
  if (defining) {
    const san = toSan(fen, defining);
    if (san) return { uci: defining, san, source: "authored" };
  }

  // 1) Real-opponent sampling from the baked explorer tree.
  const explorer = book
    .movesAt(fen)
    .filter((m) => m.freq !== undefined && m.freq >= difficulty.minFreq)
    .filter((m) => m.loss == null || m.loss < difficulty.maxBookLoss);
  if (explorer.length) {
    const weights = explorer.map((m) => Math.pow(m.freq!, 1 / difficulty.tau));
    const pick = explorer[sampleIndex(weights, rng())];
    return { uci: pick.uci, san: pick.san, source: "explorer" };
  }

  // 2) Authored theory (a reply the spec recommends for this side).
  const authored = book.movesAt(fen).filter((m) => m.status === "authored" && (m.reply?.verdict === "good" || m.yourMove));
  if (authored.length) {
    const pick = authored[Math.floor(rng() * authored.length)];
    return { uci: pick.uci, san: pick.san, source: "authored" };
  }

  // 3) Baked engine lines: softmax over cp (sharper at higher difficulty).
  const lines = book.evalLines(fen);
  if (lines?.length) {
    const scale = 120 * difficulty.tau; // cp per e-fold
    const best = lines[0][1];
    const weights = lines.map(([, cp]) => Math.exp((cp - best) / scale));
    const [uci] = lines[sampleIndex(weights, rng())];
    const san = toSan(fen, uci);
    if (san) return { uci, san, source: "evals" };
  }

  // 4) Live engine at the adaptive strength.
  if (engine) {
    const uci = await engine.getMoveAtElo(fen, difficulty.botElo, moveTimeMs);
    const san = uci ? toSan(fen, uci) : null;
    if (uci && san) return { uci, san, source: "engine" };
  }

  // 5) Last resort: any legal move (should never be reached with an engine).
  const legal = game.moves({ verbose: true });
  const mv = legal[Math.floor(rng() * legal.length)];
  return mv ? { uci: mv.from + mv.to + (mv.promotion ?? ""), san: mv.san, source: "engine" } : null;
}
