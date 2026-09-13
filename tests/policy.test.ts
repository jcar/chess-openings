import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { chooseBotMove, DIFFICULTY_PRESETS, sampleIndex } from "@/lib/bot/policy";
import { MergedBook } from "@/lib/book/merged";
import type { ExplorerTree } from "@/lib/book/explorer";
import { epd } from "@/lib/book/key";
import type { OpeningSpec } from "@/content/spec";

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (1664525 * s + 1013904223) >>> 0) / 2 ** 32);
}

const start = new Chess().fen();
const tree: ExplorerTree = {
  v: 1,
  bakedAt: "",
  filter: { ratings: [0, 1000], speeds: [] },
  root: epd(start),
  nodes: { [epd(start)]: { n: 1000, w: 500, d: 50, b: 450, m: [["e2e4", 600, 300, 30, 270], ["d2d4", 300, 150, 15, 135], ["g1f3", 100, 50, 5, 45]] } },
};
const spec: OpeningSpec = {
  // No defining moves: pure frequency sampling from move one.
  id: "t", name: "T", side: "black", family: "1e4-other", firstMoves: "", tabiyaFen: start,
  pitch: "", setup: { pieces: [], pawns: [], castle: "either" }, ideas: [], annotations: {}, traps: [], modelGames: [], middlegamePlan: "",
};

describe("sampleIndex", () => {
  it("respects weights", () => {
    expect(sampleIndex([1, 0, 0], 0.5)).toBe(0);
    expect(sampleIndex([0, 1, 0], 0.5)).toBe(1);
  });
});

describe("chooseBotMove from explorer frequencies", () => {
  it("at τ=1 reproduces the frequencies within 5%", async () => {
    const book = new MergedBook(spec, tree, null);
    const rng = lcg(7);
    const counts: Record<string, number> = {};
    const N = 4000;
    for (let i = 0; i < N; i++) {
      const c = await chooseBotMove({ fen: start, book, difficulty: { ...DIFFICULTY_PRESETS.normal, tau: 1 }, rng });
      counts[c!.uci] = (counts[c!.uci] ?? 0) + 1;
      expect(c!.source).toBe("explorer");
    }
    expect(counts.e2e4 / N).toBeCloseTo(0.6, 1);
    expect(Math.abs(counts.e2e4 / N - 0.6)).toBeLessThan(0.05);
    expect(Math.abs(counts.d2d4 / N - 0.3)).toBeLessThan(0.05);
  });
  it("sharper τ concentrates on the top move", async () => {
    const book = new MergedBook(spec, tree, null);
    const rng = lcg(11);
    let top = 0;
    for (let i = 0; i < 1000; i++) {
      const c = await chooseBotMove({ fen: start, book, difficulty: DIFFICULTY_PRESETS.sharp, rng });
      if (c!.uci === "e2e4") top++;
    }
    expect(top / 1000).toBeGreaterThan(0.7);
  });
  it("follows the opening's defining moves before sampling", async () => {
    const italianish: OpeningSpec = { ...spec, side: "white", firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Bc4" };
    const afterE4 = (() => { const g = new Chess(); g.move("e4"); return g.fen(); })();
    const t: ExplorerTree = { ...tree, nodes: { [epd(afterE4)]: { n: 1000, w: 500, d: 50, b: 450, m: [["c7c5", 700, 300, 50, 350], ["e7e5", 300, 150, 15, 135]] } } };
    const book = new MergedBook(italianish, t, null);
    for (let i = 0; i < 20; i++) {
      const c = await chooseBotMove({ fen: afterE4, book, difficulty: DIFFICULTY_PRESETS.normal, rng: lcg(i) });
      expect(c!.san).toBe("e5");
    }
  });
  it("falls back to a legal move with no data and no engine", async () => {
    const book = new MergedBook(spec, null, null);
    const c = await chooseBotMove({ fen: start, book, difficulty: DIFFICULTY_PRESETS.normal, rng: lcg(1) });
    expect(c).not.toBeNull();
    expect(() => new Chess(start).move(c!.san)).not.toThrow();
  });
});
