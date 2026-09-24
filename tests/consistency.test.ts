// The book must never contradict itself. If a spec's own model game plays a
// move that the same spec lists as a mistake, or that breaks one of its own
// order rules, the trainer would stop the player for following the book.
//
// Twenty-one specs were written in parallel by agents against a legality
// standard. Legality is not consistency, so this walks every defining line and
// every model game as the player and asserts the coach stays quiet.

import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { coreOpenings } from "@/content";
import type { OpeningSpec } from "@/content/spec";
import { epd } from "@/lib/book/key";
import { MergedBook } from "@/lib/book/merged";
import { judge } from "@/lib/coach/classify";
import { explainUserMove } from "@/lib/coach/explain";
import { describeMove, tagMove, type PlyRecord } from "@/lib/coach/features";
import { setupProgress } from "@/lib/setup/progress";

const toSans = (line: string) => line.trim().split(/\s+/).map((t) => t.replace(/^\d+\.(\.\.)?/, "")).filter(Boolean);

interface Finding {
  line: string;
  ply: number;
  san: string;
  problem: string;
}

/** Walk a line as the user. Return every place the book turns on its own move. */
function walk(spec: OpeningSpec, label: string, sans: string[]): Finding[] {
  const book = new MergedBook(spec, null, null);
  const g = new Chess();
  const history: PlyRecord[] = [];
  const out: Finding[] = [];
  for (let i = 0; i < sans.length; i++) {
    const san = sans[i];
    const mover = g.turn() === "w" ? "white" : "black";
    const fenBefore = g.fen();
    if (mover === spec.side) {
      const a = spec.annotations[epd(fenBefore)];
      const listed = a?.mistakes?.find((m) => m.san === san);
      if (listed) out.push({ line: label, ply: i + 1, san, problem: `listed as a mistake at this node ("${listed.why.slice(0, 60)}…")` });

      const before = setupProgress(fenBefore, spec.setup, spec.side, history);
      const m = g.move(san);
      const uci = m.from + m.to + (m.promotion ?? "");
      const after = setupProgress(g.fen(), spec.setup, spec.side, [...history, { san: m.san, uci, color: mover }]);
      const broke = after.orderViolations.find((v) => !before.orderViolations.some((o) => o.before === v.before && o.after === v.after));
      if (broke) out.push({ line: label, ply: i + 1, san, problem: `breaks the opening's own order rule "${broke.before} before ${broke.after}"` });

      const move = describeMove(fenBefore, uci)!;
      const tags = tagMove(fenBefore, g.fen(), move, history);
      const verdict = explainUserMove({
        spec, book, fenBefore, fenAfter: g.fen(), move, history, tags,
        judgement: judge(0, 0, true), // a neutral engine: only the book's own opinion is under test
        bestUci: uci, setupBefore: before, setupAfter: after, verbosity: "normal", inOpening: true,
      });
      if (verdict.pause) out.push({ line: label, ply: i + 1, san, problem: `would stop the game: "${verdict.headline}"` });
      history.push({ san: m.san, uci, color: mover });
    } else {
      const m = g.move(san);
      history.push({ san: m.san, uci: m.from + m.to + (m.promotion ?? ""), color: mover });
    }
  }
  return out;
}

describe.each(coreOpenings().map((o) => [o.id, o] as const))("%s never stops the player for following its own book", (_id, o) => {
  it("along the defining line", () => {
    const findings = walk(o, "firstMoves", toSans(o.firstMoves));
    expect(findings, JSON.stringify(findings, null, 1)).toEqual([]);
  });

  it("through every model game", () => {
    const findings = o.modelGames.flatMap((g) => walk(o, g.label, g.sans));
    expect(findings, JSON.stringify(findings, null, 1)).toEqual([]);
  });

  it("through every trap the player is meant to spring", () => {
    // Traps where WE are the punisher are lines we are supposed to play.
    const findings = o.traps.filter((t) => t.punisher === o.side).flatMap((t) => walk(o, `trap: ${t.name}`, t.sans));
    expect(findings, JSON.stringify(findings, null, 1)).toEqual([]);
  });
});
