// Baked Lichess Explorer trees (public/data/explorer/<id>.json), written by
// scripts/bake-explorer.ts. Loaded lazily per opening; absent file → null and the
// app keeps working from authored content + engine.

import { withBasePath } from "@/lib/basePath";
import type { EPD } from "./key";

/** v2: [uci, games, whiteScorePct] — white's score (win + draw/2) as 0–100.
 *  v1 files carry [uci, games, whiteWins, draws, blackWins]; both are read. */
export type BakedMove = [string, number, number] | [string, number, number, number, number];

export interface BakedNode {
  /** Total games reaching this position within the filter. */
  n: number;
  /** v2: white's score at this node, 0–100. */
  s?: number;
  /** v1 only. */
  w?: number;
  d?: number;
  b?: number;
  m: BakedMove[];
}

/** White's score for one move entry, 0–1, from either schema. */
function whiteScore(m: BakedMove): number {
  if (m.length === 3) return m[2] / 100;
  const [, games, w, d] = m;
  return games ? (w + d / 2) / games : 0.5;
}

export interface ExplorerTree {
  v: 1;
  bakedAt: string;
  filter: { ratings: number[]; speeds: string[] };
  root: EPD;
  nodes: Record<EPD, BakedNode>;
}

export interface ExplorerReply {
  uci: string;
  games: number;
  /** Share of games at this node that continued with this move (0–1). */
  freq: number;
  /** Win rate for the SIDE THAT PLAYED the move (0–1). */
  scoreForMover: number;
}

const cache = new Map<string, Promise<ExplorerTree | null>>();

export function loadExplorer(openingId: string): Promise<ExplorerTree | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  let p = cache.get(openingId);
  if (!p) {
    p = fetch(withBasePath(`/data/explorer/${openingId}.json`))
      .then((r) => (r.ok ? (r.json() as Promise<ExplorerTree>) : null))
      .catch(() => null);
    cache.set(openingId, p);
  }
  return p;
}

/** Replies recorded at a position, most played first. Empty if unknown. */
export function repliesAt(tree: ExplorerTree | null, key: EPD, whiteToMove: boolean): ExplorerReply[] {
  const node = tree?.nodes[key];
  if (!node || node.n === 0) return [];
  return node.m
    .map((m) => {
      const white = whiteScore(m);
      return { uci: m[0], games: m[1], freq: m[1] / node.n, scoreForMover: whiteToMove ? white : 1 - white };
    })
    .sort((a, b) => b.games - a.games);
}
