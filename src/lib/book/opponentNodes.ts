// "What you'll face": along the opening's defining moves, the positions where
// the OPPONENT is to move, with their real sub-1200 replies and the spec's
// authored verdict/answer where one exists. Deepest (most specific) first.

import { Chess } from "chess.js";
import type { OpeningSpec, Verdict } from "@/content/spec";
import { repliesAt, type ExplorerTree } from "./explorer";
import { epd } from "./key";

export interface OpponentReply {
  san: string;
  freq: number;
  verdict?: Verdict;
  answer?: string;
  why?: string;
}

export interface OpponentNode {
  label: string;
  fen: string;
  games: number;
  replies: OpponentReply[];
}

export const MIN_NODE_GAMES = 50;

export function opponentNodes(spec: OpeningSpec, tree: ExplorerTree | null, opts: { max?: number; replies?: number } = {}): OpponentNode[] {
  if (!tree) return [];
  const max = opts.max ?? 3;
  const perNode = opts.replies ?? 6;
  const out: OpponentNode[] = [];
  const g = new Chess();
  const oppToMove = () => (g.turn() === "w" ? "white" : "black") !== spec.side;

  const push = (label: string) => {
    const key = epd(g.fen());
    const node = tree.nodes[key];
    if (!node || node.n < MIN_NODE_GAMES) return;
    const a = spec.annotations[key];
    const replies = repliesAt(tree, key, g.turn() === "w")
      .slice(0, perNode)
      .flatMap((r) => {
        try {
          const c = new Chess(g.fen());
          const san = c.move({ from: r.uci.slice(0, 2), to: r.uci.slice(2, 4), promotion: r.uci[4] as never }).san;
          const auth = a?.replies?.find((x) => x.san === san);
          return [{ san, freq: r.freq, verdict: auth?.verdict, answer: auth?.answer, why: auth?.why }];
        } catch {
          return [];
        }
      });
    out.push({ label, fen: g.fen(), games: node.n, replies });
  };

  const tokens = spec.firstMoves.trim().split(/\s+/).map((t) => t.replace(/^\d+\.(\.\.)?/, "")).filter(Boolean);
  if (oppToMove()) push("From the start");
  const played: string[] = [];
  for (const san of tokens) {
    try {
      g.move(san);
    } catch {
      break;
    }
    played.push(san);
    if (oppToMove()) push(`After ${withNumbers(played)}`);
  }
  return out.reverse().slice(0, max);
}

export function withNumbers(sans: string[]): string {
  return sans.map((s, i) => (i % 2 === 0 ? `${i / 2 + 1}.${s}` : s)).join(" ");
}
