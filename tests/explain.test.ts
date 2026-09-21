import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { getOpening } from "@/content";
import { MergedBook } from "@/lib/book/merged";
import { judge } from "@/lib/coach/classify";
import { explainBotMove, explainUserMove, firedIdeas } from "@/lib/coach/explain";
import { describeMove, tagMove, type PlyRecord } from "@/lib/coach/features";
import { setupProgress } from "@/lib/setup/progress";
import { MAX_HEADLINE_WORDS, wordCount } from "@/lib/companion/types";

const italian = getOpening("italian-game")!;
const book = new MergedBook(italian, null, null);

function play(line: string) {
  const g = new Chess();
  const history: PlyRecord[] = [];
  for (const san of line.trim().split(/\s+/).filter(Boolean)) {
    const m = g.move(san);
    history.push({ san: m.san, uci: m.from + m.to + (m.promotion ?? ""), color: m.color === "w" ? "white" : "black" });
  }
  return { g, history };
}

function userCtx(line: string, san: string, cpBefore = 0, cpAfterOpp = 0, bestUci: string | null = null) {
  const { g, history } = play(line);
  const fenBefore = g.fen();
  const m = g.move(san);
  const uci = m.from + m.to + (m.promotion ?? "");
  const move = describeMove(fenBefore, uci)!;
  const fenAfter = g.fen();
  return {
    spec: italian,
    book,
    fenBefore,
    fenAfter,
    move,
    history,
    tags: tagMove(fenBefore, fenAfter, move, history),
    judgement: judge(cpBefore, cpAfterOpp, bestUci === uci),
    bestUci,
    setupBefore: setupProgress(fenBefore, italian.setup, "white", history),
    setupAfter: setupProgress(fenAfter, italian.setup, "white", [...history, move]),
    verbosity: "normal" as const,
    inOpening: true,
  };
}

describe("explainUserMove layering", () => {
  it("authored mistake beats everything and pauses", () => {
    const msg = explainUserMove(userCtx("e4 e5 Nf3 Nc6 Bc4 Bc5", "Ng5", 30, 20));
    expect(msg.source).toBe("authored");
    expect(msg.kind).toBe("warn");
    expect(msg.pause).toBe(true);
    expect(msg.body).toMatch(/Too early/);
    expect(msg.bestSan).toBe("c3");
  });
  it("book move is praised with its why", () => {
    const msg = explainUserMove(userCtx("e4 e5 Nf3 Nc6 Bc4 Bc5", "c3", 30, -30));
    expect(msg.kind).toBe("praise");
    expect(msg.source).toBe("authored");
    expect(msg.body).toMatch(/Prepare d4/);
  });
  it("praises a different move order that still builds the setup", () => {
    // 4.d3 instead of 4.c3. d3 is one of the Italian's own pawn targets, so it
    // is on plan even though the authored line reaches it via c3 first. The
    // book's order is offered as information, not as a correction.
    const msg = explainUserMove(userCtx("e4 e5 Nf3 Nc6 Bc4 Bc5", "d3", 30, -28));
    expect(msg.kind).toBe("praise");
    expect(msg.source).toBe("setup");
    expect(msg.pause).toBe(false);
    expect(msg.lookFor).toMatch(/c3/);
  });
  it("tag template explains an unannotated blunder", () => {
    // 1.e4 d5 2.Qh5 — not an Italian position, so no annotation; early queen + engine says bad-ish.
    const msg = explainUserMove(userCtx("e4 d5", "Qh5", 30, 150, "e4d5"));
    expect(msg.source).toBe("tag");
    expect(msg.tag).toBe("early_queen");
    // Structural, not a quote: the phrasing is Caissa's to change, but the
    // headline must still be about the queen and short enough to say out loud.
    expect(msg.headline).toMatch(/queen/i);
    expect(wordCount(msg.headline)).toBeLessThanOrEqual(MAX_HEADLINE_WORDS);
    expect(msg.bestSan).toBe("exd5");
  });
  it("engine-only fallback when nothing else explains a bad move", () => {
    // A quiet developing move the (fake) engine hates: no negative tag, no annotation → engine fallback.
    const ctx = userCtx("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Nbd2 a6", "a4", 20, 400, "f1e1");
    ctx.tags = ctx.tags.filter((t) => t !== "delays_development");
    const msg = explainUserMove(ctx);
    expect(msg.source).toBe("engine");
    expect(msg.pause).toBe(true);
    expect(msg.bestSan).toBe("Re1");
  });
});

describe("explainBotMove", () => {
  it("authored dubious reply becomes a punish card with a hidden hint", () => {
    const { g, history } = play("e4 e5 Nf3 Nc6 Bc4");
    const fenBefore = g.fen();
    const m = g.move("Nd4");
    const move = describeMove(fenBefore, m.from + m.to)!;
    const msg = explainBotMove({ spec: italian, book, fenBefore, fenAfter: g.fen(), move, history, tags: [], loss: null, bestReplyUci: null, inOpening: true })!;
    expect(msg.kind).toBe("punish");
    expect(msg.hint).toMatch(/Nxd4/);
    expect(msg.bestSan).toBe("Nxd4");
  });
  it("generated punish card for a hanging piece with no annotation", () => {
    // 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Nc3 Nxe4?! — knight hangs to Nxe4 (no annotation at this node).
    const { g, history } = play("e4 e5 Nf3 Nc6 Bc4 Nf6 Nc3");
    const fenBefore = g.fen();
    const m = g.move("Nxe4");
    const uci = m.from + m.to;
    const move = describeMove(fenBefore, uci)!;
    const tags = tagMove(fenBefore, g.fen(), move, history);
    const msg = explainBotMove({ spec: italian, book, fenBefore, fenAfter: g.fen(), move, history, tags, loss: 120, bestReplyUci: "c3e4", inOpening: true })!;
    expect(msg.kind).toBe("punish");
    expect(msg.tag).toBe("hangs_piece");
    expect(msg.headline).toContain("knight"); // the piece and square come from the position
    expect(msg.headline).toContain("e4");
    expect(wordCount(msg.headline)).toBeLessThanOrEqual(MAX_HEADLINE_WORDS);
    expect(msg.bestSan).toBe("Nxe4");
  });
});

describe("firedIdeas", () => {
  it("fires the Two Knights idea on ...Nf6 and the knight-walk idea at book end", () => {
    const { g } = play("e4 e5 Nf3 Nc6 Bc4");
    const fenBefore = g.fen();
    const m = g.move("Nf6");
    const move = describeMove(fenBefore, m.from + m.to)!;
    expect(firedIdeas(italian, g.fen(), move, [], false).map((i) => i.id)).toContain("italian-two-knights");
    expect(firedIdeas(italian, g.fen(), move, [], true).map((i) => i.id)).toContain("italian-knight-walk");
  });
});
