// Baked engine evaluations (public/data/evals/<id>.json) from scripts/bake-evals.ts.
// { "<epd>": [[uci, cp], ...] } best-first, cp from the side-to-move's view;
// mates are saturated to ±(10000 − plies).

import { withBasePath } from "@/lib/basePath";
import type { EPD } from "./key";

export type BakedEval = [string, number][];
export type EvalTable = Record<EPD, BakedEval>;

const cache = new Map<string, Promise<EvalTable | null>>();

export function loadEvals(openingId: string): Promise<EvalTable | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  let p = cache.get(openingId);
  if (!p) {
    p = fetch(withBasePath(`/data/evals/${openingId}.json`))
      .then((r) => (r.ok ? (r.json() as Promise<EvalTable>) : null))
      .catch(() => null);
    cache.set(openingId, p);
  }
  return p;
}

/** Centipawn loss of `uci` vs the best baked line at this position, or null if
 *  the move isn't among the baked lines (unknown, not necessarily bad). */
export function bakedLoss(table: EvalTable | null, key: EPD, uci: string): number | null {
  const lines = table?.[key];
  if (!lines || !lines.length) return null;
  const best = lines[0][1];
  const hit = lines.find(([u]) => u === uci);
  return hit ? Math.max(0, best - hit[1]) : null;
}
