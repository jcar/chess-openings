// The merged book: one position-keyed view over (1) the spec's annotations,
// (2) the baked sub-1200 explorer tree, (3) the baked engine evals. Everything
// the bot and the coach ask about a position goes through here.

import { Chess } from "chess.js";
import type { Annotation, OpeningSpec, Reply } from "@/content/spec";
import { bakedLoss, type EvalTable } from "./evals";
import { repliesAt, type ExplorerTree } from "./explorer";
import { epd, type EPD } from "./key";

export type MoveStatus = "authored" | "common" | "known" | "rare" | "off";

export interface BookMove {
  uci: string;
  san: string;
  status: MoveStatus;
  /** Share of sub-1200 games continuing this way (0–1), if baked. */
  freq?: number;
  games?: number;
  /** Win rate for the mover (0–1), if baked. */
  scoreForMover?: number;
  /** Centipawn loss vs best, if baked. */
  loss?: number | null;
  /** Authored text about this move, if any. */
  reply?: Reply;
  yourMove?: { san: string; why: string };
  mistake?: { san: string; why: string };
}

/** Frequency thresholds for status labels. */
export const COMMON_FREQ = 0.1;
export const RARE_FREQ = 0.03;
/** A node with fewer games than this is too thin to call "book". */
export const MIN_NODE_GAMES = 50;

export class MergedBook {
  /** EPD → uci for each ply of the spec's defining moves (the moves that make
   *  the opening the opening). The bot follows these while the game is on them. */
  private defining: Map<EPD, string>;
  /** Positions along the defining moves and every model game: always "in book". */
  private authoredPositions: Set<EPD>;

  constructor(
    readonly spec: OpeningSpec,
    readonly tree: ExplorerTree | null,
    readonly evals: EvalTable | null,
  ) {
    this.defining = new Map();
    this.authoredPositions = new Set();
    for (const g of spec.modelGames) {
      try {
        const c = new Chess();
        this.authoredPositions.add(epd(c.fen()));
        for (const san of g.sans) {
          c.move(san);
          this.authoredPositions.add(epd(c.fen()));
        }
      } catch {
        /* validator reports illegal model games */
      }
    }
    try {
      const g = new Chess();
      for (const tok of spec.firstMoves.trim().split(/\s+/)) {
        const san = tok.replace(/^\d+\.(\.\.)?/, "");
        if (!san) continue;
        const before = epd(g.fen());
        this.authoredPositions.add(before);
        const mv = g.move(san);
        this.defining.set(before, mv.from + mv.to + (mv.promotion ?? ""));
      }
      this.authoredPositions.add(epd(g.fen()));
    } catch {
      /* validator reports a bad firstMoves string */
    }
  }

  /** The defining move at this position, if the game is still on the defining line. */
  definingMoveAt(fen: string): string | null {
    return this.defining.get(epd(fen)) ?? null;
  }

  annotation(key: EPD): Annotation | undefined {
    return this.spec.annotations[key];
  }

  /** Is this position one the book knows anything about? */
  inBook(fen: string): boolean {
    const key = epd(fen);
    if (this.spec.annotations[key] || this.authoredPositions.has(key)) return true;
    const node = this.tree?.nodes[key];
    return !!node && node.n >= MIN_NODE_GAMES;
  }

  /** Does the book have anything to say about what to play here? */
  hasGuidance(fen: string): boolean {
    const key = epd(fen);
    const a = this.spec.annotations[key];
    return !!(a?.yourMove || a?.replies?.length) || (this.tree?.nodes[key]?.m.length ?? 0) > 0;
  }

  /** Baked eval lines for this position (best first), if any. */
  evalLines(fen: string): [string, number][] | undefined {
    return this.evals?.[epd(fen)];
  }

  /** Every move the book knows at this position, most relevant first. */
  movesAt(fen: string): BookMove[] {
    const game = new Chess(fen);
    const key = epd(fen);
    const whiteToMove = game.turn() === "w";
    const a = this.spec.annotations[key];
    const out = new Map<string, BookMove>();

    const sanToUci = (san: string): string | null => {
      try {
        const g = new Chess(fen);
        const mv = g.move(san);
        return mv.from + mv.to + (mv.promotion ?? "");
      } catch {
        return null;
      }
    };
    const uciToSan = (uci: string): string | null => {
      try {
        const g = new Chess(fen);
        return g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never }).san;
      } catch {
        return null;
      }
    };

    for (const r of repliesAt(this.tree, key, whiteToMove)) {
      const san = uciToSan(r.uci);
      if (!san) continue;
      out.set(r.uci, {
        uci: r.uci,
        san,
        status: r.freq >= COMMON_FREQ ? "common" : r.freq >= RARE_FREQ ? "known" : "rare",
        freq: r.freq,
        games: r.games,
        scoreForMover: r.scoreForMover,
        loss: bakedLoss(this.evals, key, r.uci),
      });
    }

    const attach = (san: string, patch: Partial<BookMove>) => {
      const uci = sanToUci(san);
      if (!uci) return;
      const existing = out.get(uci);
      if (existing) Object.assign(existing, patch, { status: "authored" as MoveStatus });
      else out.set(uci, { uci, san, status: "authored", loss: bakedLoss(this.evals, key, uci), ...patch });
    };
    if (a?.yourMove) attach(a.yourMove.san, { yourMove: a.yourMove });
    for (const r of a?.replies ?? []) attach(r.san, { reply: r });
    for (const m of a?.mistakes ?? []) {
      // A known mistake is "authored" knowledge but must not look like a recommendation.
      const uci = sanToUci(m.san);
      if (!uci) continue;
      const existing = out.get(uci);
      if (existing) existing.mistake = m;
      else out.set(uci, { uci, san: m.san, status: "off", mistake: m, loss: bakedLoss(this.evals, key, uci) });
    }

    return [...out.values()].sort((x, y) => {
      const rank = (m: BookMove) => (m.yourMove || m.reply ? 0 : 1);
      return rank(x) - rank(y) || (y.freq ?? 0) - (x.freq ?? 0);
    });
  }

  /** Status of a specific move at this position. */
  status(fen: string, uci: string): MoveStatus {
    const m = this.movesAt(fen).find((x) => x.uci === uci);
    return m?.status ?? "off";
  }
}
