// Lichess Opening Explorer client for bake scripts.
// Docs: https://lichess.org/api#tag/Opening-Explorer
// Since March 2026 every request needs an OAuth token (25 requests/minute).
// The token comes from LICHESS_TOKEN (env or .env); it is never written anywhere.

import { setDefaultResultOrder } from "node:dns";
import { lichessToken } from "./env";

// This machine (and many home networks) has no working IPv6 route, but the
// explorer host publishes an AAAA record; Node then fails fast with ETIMEDOUT
// where curl silently falls back to IPv4. Prefer IPv4 up front.
setDefaultResultOrder("ipv4first");

export interface ExplorerMove {
  uci: string;
  san: string;
  averageRating?: number;
  white: number;
  draws: number;
  black: number;
}

export interface ExplorerResponse {
  white: number;
  draws: number;
  black: number;
  moves: ExplorerMove[];
  opening?: { eco: string; name: string } | null;
}

export interface ExplorerFilter {
  /** Lichess rating buckets: 0, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2500 */
  ratings: number[];
  speeds: ("ultraBullet" | "bullet" | "blitz" | "rapid" | "classical" | "correspondence")[];
}

export const SUB_1200: ExplorerFilter = { ratings: [0, 1000], speeds: ["blitz", "rapid", "classical"] };

const HOST = process.env.EXPLORER_HOST ?? "https://explorer.lichess.ovh";
const MIN_SPACING_MS = 2500; // 24 req/min, under the 25 rpm limit
let lastRequestAt = 0;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function throttle() {
  const wait = lastRequestAt + MIN_SPACING_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastRequestAt = Date.now();
}

export class ExplorerClient {
  private token: string;
  requests = 0;

  constructor(token?: string) {
    const t = token ?? lichessToken();
    if (!t) throw new Error("LICHESS_TOKEN missing");
    this.token = t;
  }

  async lichess(fen: string, filter: ExplorerFilter, moves = 12): Promise<ExplorerResponse> {
    const url = new URL("/lichess", HOST);
    url.searchParams.set("variant", "standard");
    url.searchParams.set("fen", fen);
    url.searchParams.set("speeds", filter.speeds.join(","));
    url.searchParams.set("ratings", filter.ratings.join(","));
    url.searchParams.set("moves", String(moves));
    url.searchParams.set("topGames", "0");
    url.searchParams.set("recentGames", "0");

    for (let attempt = 0; attempt < 12; attempt++) {
      await throttle();
      this.requests++;
      let res: Response;
      try {
        res = await fetch(url, {
          headers: { Authorization: `Bearer ${this.token}`, Accept: "application/json" },
          signal: AbortSignal.timeout(20_000),
        });
      } catch (e) {
        // Network hiccup (ETIMEDOUT, reset, DNS). Back off and retry; the cache
        // makes a later rerun resume anyway.
        const wait = Math.min(60, 5 * 2 ** attempt);
        console.warn(`  network error (${(e as Error).message}) — retrying in ${wait}s`);
        await sleep(wait * 1000);
        continue;
      }
      if (res.status === 429) {
        const retry = Number(res.headers.get("Retry-After") ?? "60");
        console.warn(`  429 — waiting ${retry}s`);
        await sleep(retry * 1000);
        continue;
      }
      if (res.status === 401) throw new Error("Lichess rejected the token (401). Check LICHESS_TOKEN.");
      if (!res.ok) {
        if (attempt === 11) throw new Error(`Explorer ${res.status} ${res.statusText}`);
        await sleep(2000 * (attempt + 1));
        continue;
      }
      return (await res.json()) as ExplorerResponse;
    }
    throw new Error("Explorer: retries exhausted");
  }
}
