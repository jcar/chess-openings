// Jason played 1.d4 d5 2.Bf4 in the London, his opponent answered 2...c6, and
// Caissa said "That's the end of the book. Now it's just chess." He could not
// tell whether he had done something wrong. He hadn't — the opponent had left
// the book, and the line he chose is a main move order.
//
// These tests pin both halves of that fix: she names who left the book, and the
// 2.Bf4 order is covered so it doesn't happen there at all.

import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { getOpening } from "@/content";
import { MergedBook } from "@/lib/book/merged";
import { eventToLines, type BeatContext } from "@/lib/companion/beats";
import { MAX_SPOKEN_WORDS, wordCount } from "@/lib/companion/types";

const london = getOpening("london-system")!;
const ctx: BeatContext = { spec: london, recurring: [], lastSession: null };

const fenAfter = (line: string) => {
  const g = new Chess();
  for (const san of line.trim().split(/\s+/).filter(Boolean)) g.move(san);
  return g.fen();
};

describe("leaving the book says who did it", () => {
  it("blames nobody when the opponent goes off book", () => {
    const [line] = eventToLines({ t: "book_ended", plyIndex: 4, by: "them", san: "c6" }, ctx);
    expect(line.kind).toBe("book_end");
    expect(line.text).toContain("c6");
    expect(line.text).toMatch(/nothing you did/i);
    expect(wordCount(line.text)).toBeLessThanOrEqual(MAX_SPOKEN_WORDS);
    expect(line.more).toMatch(/opponent/i);
  });

  it("names the move the line wanted when you go off book", () => {
    const [line] = eventToLines({ t: "book_ended", plyIndex: 3, by: "you", san: "Bf4", bookMove: "Nf3" }, ctx);
    expect(line.text).toContain("Bf4");
    expect(line.more).toContain("Nf3");
    // Explicitly not a verdict — the judgement line is a separate beat.
    expect(line.more).toMatch(/isn't necessarily worse/i);
    expect(wordCount(line.text)).toBeLessThanOrEqual(MAX_SPOKEN_WORDS);
  });

  it("says so when the game transposes back in", () => {
    const [line] = eventToLines({ t: "book_resumed", plyIndex: 6 }, ctx);
    expect(line.kind).toBe("book_resumed");
    expect(wordCount(line.text)).toBeLessThanOrEqual(MAX_SPOKEN_WORDS);
  });

  it("never dumps the whole middlegame plan into one bubble", () => {
    const [line] = eventToLines({ t: "book_ended", plyIndex: 4, by: "them", san: "c6" }, ctx);
    expect(london.middlegamePlan.length).toBeGreaterThan(400); // the wall it used to show
    expect(line.more!.length).toBeLessThan(london.middlegamePlan.length);
  });
});

describe("the 2.Bf4 London move order is covered", () => {
  const book = new MergedBook(london, null, null);

  it("keeps Jason's actual game in the book", () => {
    // Annotations alone, with no baked tree — the tree had pruned these away.
    for (const line of ["d4 d5 Bf4", "d4 d5 Bf4 c6", "d4 d5 Bf4 c6 e3", "d4 d5 Bf4 c6 e3 Nf6"]) {
      expect(book.inBook(fenAfter(line)), line).toBe(true);
      expect(book.hasGuidance(fenAfter(line)), line).toBe(true);
    }
  });

  it("transposes into the main line after ...Nf6 Nf3", () => {
    expect(fenAfter("d4 d5 Bf4 Nf6 Nf3")).toBe(fenAfter("d4 d5 Nf3 Nf6 Bf4"));
  });

  it("answers ...c5 and ...Qb6, the counter the plan warns about", () => {
    expect(book.inBook(fenAfter("d4 d5 Bf4 c5"))).toBe(true);
    const a = london.annotations[fenAfter("d4 d5 Bf4 c6 e3").split(" ").slice(0, 4).join(" ")];
    expect(a?.replies?.find((r) => r.san === "Qb6")?.answer).toBe("Qc1");
  });
});
