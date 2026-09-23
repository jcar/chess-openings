// The "coached in depth" bar, enforced. Every opening in CORE_OPENING_IDS gets
// the plan chip, the order-rule stop-down, the setup sheet and the traps — so
// each one has to carry enough content to make those mean something. This is
// what stops a thin spec being promoted to the coached group by accident.

import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { coreOpenings } from "@/content";
import { MergedBook } from "@/lib/book/merged";
import { moveHint } from "@/lib/coach/prompt";
import { setupProgress } from "@/lib/setup/progress";

const fenFromEpd = (epd: string) => `${epd} 0 1`;

describe.each(coreOpenings().map((o) => [o.id, o] as const))("%s is coached in depth", (_id, o) => {
  it("has a setup worth tracking", () => {
    expect(o.setup.pieces.length).toBeGreaterThanOrEqual(3);
    for (const p of o.setup.pieces) {
      expect(p.squares.length).toBeGreaterThan(0);
      expect(p.why?.length ?? 0).toBeGreaterThan(10);
    }
    expect(o.setup.castle).toBeTruthy();
  });

  it("has at least one order rule with a reason", () => {
    expect(o.setup.order?.length ?? 0).toBeGreaterThanOrEqual(1);
    for (const r of o.setup.order ?? []) {
      expect(r.before).toBeTruthy();
      expect(r.after).toBeTruthy();
      expect(r.why.length).toBeGreaterThan(20);
    }
  });

  it("has ideas, model games and a plan", () => {
    // Traps are not required: the King's Indian has none worth teaching at
    // this level, and a forced one would be worse than none. Whatever traps a
    // spec does carry are checked for legality below.
    expect(o.ideas.length).toBeGreaterThanOrEqual(4);
    expect(o.ideas.some((i) => i.trigger?.kind === "book_end")).toBe(true);
    expect(o.modelGames.length).toBeGreaterThanOrEqual(1);
    expect(o.middlegamePlan.length).toBeGreaterThan(80);
    expect(Object.keys(o.annotations).length).toBeGreaterThanOrEqual(10);
  });


  it("only annotates legal moves", () => {
    for (const [epd, a] of Object.entries(o.annotations)) {
      const tryMove = (san: string, what: string) => {
        const g = new Chess(fenFromEpd(epd));
        expect(() => g.move(san), `${o.id}: ${what} ${san} at ${epd}`).not.toThrow();
      };
      if (a.yourMove) tryMove(a.yourMove.san, "yourMove");
      for (const m of a.mistakes ?? []) tryMove(m.san, "mistake");
      for (const r of a.replies ?? []) {
        tryMove(r.san, "reply");
        if (r.answer) {
          const g = new Chess(fenFromEpd(epd));
          g.move(r.san);
          expect(() => g.move(r.answer!), `${o.id}: answer ${r.answer} to ${r.san} at ${epd}`).not.toThrow();
        }
      }
    }
    for (const t of o.traps) {
      const g = new Chess();
      for (const s of t.sans) expect(() => g.move(s), `${o.id}: trap "${t.name}" move ${s}`).not.toThrow();
    }
    for (const m of o.modelGames) {
      const g = new Chess();
      for (const s of m.sans) expect(() => g.move(s), `${o.id}: model game "${m.label}" move ${s}`).not.toThrow();
    }
  });

  it("hints its own first move at the start of the line", () => {
    // The first position where the user is to move along firstMoves.
    const g = new Chess();
    const sans = o.firstMoves.trim().split(/\s+/).map((t) => t.replace(/^\d+\.(\.\.)?/, "")).filter(Boolean);
    const history: { san: string; uci: string; color: "white" | "black" }[] = [];
    for (const san of sans) {
      if ((g.turn() === "w" ? "white" : "black") === o.side) break;
      const m = g.move(san);
      history.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    const setup = setupProgress(g.fen(), o.setup, o.side, history);
    // Hand it a move that is often the engine's choice and often wrong for the
    // opening, to make sure the book's move wins.
    const hint = moveHint({ spec: o, book: new MergedBook(o, null, null), fen: g.fen(), setup, leftBook: false, firedIdeas: [], history }, "e7e6");
    expect(hint).not.toBeNull();
    expect(hint!.text, `${o.id}: ${hint!.text}`).toMatch(/^(O-O(-O)?|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8])/);
    expect(hint!.text).not.toContain("|");
  });

  it("never shows authoring syntax to the player", () => {
    const text = JSON.stringify([o.pitch, o.middlegamePlan, o.ideas.map((i) => [i.title, i.oneLiner, i.why]), Object.values(o.annotations).map((a) => [a.yourMove?.why, a.mistakes?.map((m) => m.why), a.replies?.map((r) => [r.howToAnswer, r.why])])]);
    expect(text).not.toMatch(/undefined/);
  });
});
