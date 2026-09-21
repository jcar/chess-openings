// Caissa's voice, enforced rather than trusted.
//
// A template headline is what she SAYS OUT LOUD, so it lives under the same word
// budget as any other spoken line. The rest of these checks exist because the old
// copy drifted into textbook register move by move, and nothing caught it.

import { describe, expect, it } from "vitest";
import { TAG_PRIORITY, type MoveTag } from "@/lib/coach/tags";
import { templateThey, templateYou, type Bucket, type Slots } from "@/lib/coach/templates";
import { MAX_HEADLINE_WORDS, wordCount } from "@/lib/companion/types";

const TAGS = Object.keys(TAG_PRIORITY) as MoveTag[];
const BUCKETS: Bucket[] = ["bad", "meh", "good"];

const FULL: Slots = {
  piece: "knight",
  from: "f3",
  to: "g5",
  hangingPiece: "bishop",
  hangingSquare: "c4",
  attacker: "the d-pawn",
  bestSan: "d3",
  capturedPiece: "rook",
};

/** Only the optional slots are dropped — piece/from/to always exist. */
const BARE: Slots = { piece: "knight", from: "f3", to: "g5" };

/** Register, not content: each of these was in the old copy and none of them is
 *  something a person says out loud. */
const BANNED = [
  /is attacked and undefended/i,
  /\byou should\b/i,
  /before every move, ask/i,
  /\bconsider\b/i,
  /\bnecessarily bad\b/i,
  /\bBetter was\b/i,
  /\bThey played\b/i,
];

const texts = (t: { headline: string; why: string; lookFor?: string }) => [t.headline, t.why, t.lookFor ?? ""];

describe("her spoken lines fit the budget", () => {
  for (const tag of TAGS) {
    for (const bucket of BUCKETS) {
      it(`templateYou(${tag}, ${bucket}) headline is speakable`, () => {
        for (const slots of [FULL, BARE]) {
          const h = templateYou(tag, bucket, slots).headline;
          expect(wordCount(h), `"${h}"`).toBeLessThanOrEqual(MAX_HEADLINE_WORDS);
          expect(h.length).toBeGreaterThan(0);
        }
      });
    }
    it(`templateThey(${tag}) headline is speakable`, () => {
      for (const slots of [FULL, BARE]) {
        const tpl = templateThey(tag, slots);
        if (!tpl) continue;
        expect(wordCount(tpl.headline), `"${tpl.headline}"`).toBeLessThanOrEqual(MAX_HEADLINE_WORDS);
      }
    });
  }
});

describe("she never invents a fact", () => {
  it("no template leaks an undefined slot", () => {
    for (const tag of TAGS) {
      for (const bucket of BUCKETS) {
        for (const slots of [FULL, BARE]) {
          for (const t of texts(templateYou(tag, bucket, slots))) expect(t, `${tag}/${bucket}`).not.toMatch(/undefined|null|\[object/);
          const they = templateThey(tag, slots);
          if (they) for (const t of texts(they)) expect(t, `they/${tag}`).not.toMatch(/undefined|null|\[object/);
        }
      }
    }
  });

  it("a best move is named only when one was supplied", () => {
    for (const tag of TAGS) {
      for (const bucket of BUCKETS) {
        const bare = texts(templateYou(tag, bucket, BARE)).join(" ");
        expect(bare, tag).not.toMatch(/\bd3\b/); // FULL's bestSan, which BARE doesn't have
        const they = templateThey(tag, BARE);
        if (they) expect(texts(they).join(" "), tag).not.toMatch(/\bd3\b/);
      }
    }
  });
});

describe("the facts from the position actually appear", () => {
  it("names the hanging piece and its square", () => {
    const you = templateYou("hangs_piece", "bad", FULL);
    expect(you.headline).toContain("bishop");
    expect(you.headline).toContain("c4");
    const they = templateThey("hangs_piece", FULL)!;
    expect(they.headline).toContain("bishop");
    expect(they.headline).toContain("c4");
  });

  it("falls back to the moved piece and its destination", () => {
    const you = templateYou("hangs_piece", "bad", BARE);
    expect(you.headline).toContain("knight");
    expect(you.headline).toContain("g5");
  });

  it("offers the better move when one is known", () => {
    const you = templateYou("early_queen", "bad", FULL);
    expect(you.lookFor).toContain("d3");
  });

  it("names the captured piece", () => {
    expect(templateYou("wins_material", "good", FULL).headline).toContain("rook");
  });
});

describe("register", () => {
  it("avoids textbook phrasing everywhere", () => {
    for (const tag of TAGS) {
      for (const bucket of BUCKETS) {
        for (const slots of [FULL, BARE]) {
          for (const t of texts(templateYou(tag, bucket, slots))) {
            for (const banned of BANNED) expect(t, `${tag}/${bucket}: ${t}`).not.toMatch(banned);
          }
          const they = templateThey(tag, slots);
          if (they) for (const t of texts(they)) for (const banned of BANNED) expect(t, `they/${tag}: ${t}`).not.toMatch(banned);
        }
      }
    }
  });

  it("every headline is a finished sentence", () => {
    for (const tag of TAGS) {
      for (const bucket of BUCKETS) {
        const h = templateYou(tag, bucket, FULL).headline;
        expect(h, tag).toMatch(/[.!?]$/);
        expect(h[0], tag).toBe(h[0].toUpperCase());
      }
    }
  });
});
