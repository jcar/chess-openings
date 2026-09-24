// What she remembers when you pick a piece up: "last time here you played e3".
// Pure — reads the slip ledger, never writes it.
//
// It fires on the pick-up, not when the position arrives, for the same reason the
// pin warning does: that is the moment just before the move, and it says nothing
// at all when you were already reaching for the right piece.

import { Chess, type Square } from "chess.js";
import type { OpeningSpec } from "@/content/spec";
import { epd } from "@/lib/book/key";
import { setupProgress, type PlyRecord } from "@/lib/setup/progress";
import { orMoves, type Slip } from "@/lib/progress/slips";
import type { Deco } from "./types";

export interface Recall {
  slip: Slip;
  text: string;
  more: string;
  deco: Deco;
}

const strip = (san: string) => san.replace(/[+#!?]/g, "");

function times(n: number): string {
  return n <= 1 ? "" : n === 2 ? " It's happened in two games now." : ` It's happened in ${n} games now.`;
}

/** The arrow for the better move, when it's a single legal move from here. */
function arrowFor(fen: string, san: string | undefined): Deco["arrow"] {
  if (!san || san.includes(" or ")) return undefined;
  try {
    const m = new Chess(fen).move(san);
    return { from: m.from, to: m.to, color: "rgba(92,184,122,0.85)" };
  } catch {
    return undefined;
  }
}

export function recall(fen: string, square: string, history: PlyRecord[], spec: OpeningSpec, slips: Slip[]): Recall | null {
  let g: Chess;
  try {
    g = new Chess(fen);
  } catch {
    return null;
  }
  const side = spec.side;
  const me = side === "white" ? "w" : "b";
  const piece = g.get(square as Square);
  if (!piece || piece.color !== me || g.turn() !== me) return null;

  // 1. This exact position, this piece.
  const here = epd(fen);
  const pos = slips.find((s) => s.kind !== "order" && s.epd === here && s.from === square);
  if (pos) {
    const text = pos.better ? `Last time here: ${pos.san}. ${pos.better} instead.` : `Last time here, ${pos.san} cost you.`;
    return {
      slip: pos,
      text,
      more: `${pos.why}${times(pos.games)}`,
      deco: { squares: [square], arrow: arrowFor(fen, pos.better) },
    };
  }

  // 2. A rule you've broken before, which this piece could break again now.
  const rules = slips.filter((s) => s.kind === "order" && s.rule);
  if (!rules.length) return null;
  const before = setupProgress(fen, spec.setup, side, history).orderViolations;
  for (const m of g.moves({ square: square as Square, verbose: true })) {
    for (const s of rules) {
      const r = s.rule!;
      if (!r.after.split("|").some((a) => strip(a.trim()) === strip(m.san))) continue;
      const probe = new Chess(fen);
      probe.move(m.san);
      const after = setupProgress(probe.fen(), spec.setup, side, [...history, { san: m.san, color: side }]).orderViolations;
      const breaks = after.some((v) => v.before === r.before && v.after === r.after) && !before.some((v) => v.before === r.before && v.after === r.after);
      if (!breaks) continue;
      return {
        slip: s,
        text: `Last time ${strip(m.san)} came before ${orMoves(r.before)}. ${orMoves(r.before)} first.`,
        more: `${s.why}${times(s.games)}`,
        deco: { squares: [square], arrow: arrowFor(fen, orMoves(r.before)) },
      };
    }
  }
  return null;
}
