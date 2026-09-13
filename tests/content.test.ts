import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { OPENINGS, getOpening } from "@/content";
import { CORE_OPENING_IDS } from "@/content/core";
import { epd } from "@/lib/book/key";

describe("catalog", () => {
  it("adapts every legacy opening and keys annotations by legal EPDs", () => {
    expect(OPENINGS.length).toBeGreaterThanOrEqual(31);
    for (const o of OPENINGS) {
      for (const [key, a] of Object.entries(o.annotations)) {
        const g = new Chess(`${key} 0 1`);
        expect(epd(g.fen())).toBe(key);
        if (a.yourMove) expect(() => new Chess(`${key} 0 1`).move(a.yourMove!.san)).not.toThrow();
        for (const r of a.replies ?? []) expect(() => new Chess(`${key} 0 1`).move(r.san)).not.toThrow();
        for (const m of a.mistakes ?? []) expect(() => new Chess(`${key} 0 1`).move(m.san)).not.toThrow();
      }
      for (const g of o.modelGames) expect(() => { const c = new Chess(); for (const s of g.sans) c.move(s); }).not.toThrow();
    }
  });
  it("every core id resolves to a hand-authored spec", () => {
    const missing = CORE_OPENING_IDS.filter((id) => !getOpening(id));
    expect(missing).toEqual([]);
    for (const id of CORE_OPENING_IDS) expect(getOpening(id)!.legacy).toBeFalsy();
  });
  it("hand-authored specs replace the adapted legacy version", () => {
    const italian = getOpening("italian-game")!;
    expect(italian.legacy).toBeFalsy();
    expect(italian.setup.pieces.length).toBeGreaterThan(0);
    expect(italian.ideas.length).toBeGreaterThanOrEqual(5);
    expect(Object.keys(italian.annotations).length).toBeGreaterThanOrEqual(12);
  });
});
