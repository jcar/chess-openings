import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { getOpening } from "@/content";
import type { ExplorerTree } from "@/lib/book/explorer";
import { epd } from "@/lib/book/key";
import { opponentNodes, withNumbers } from "@/lib/book/opponentNodes";

function fenAfter(sans: string): string {
  const g = new Chess();
  for (const s of sans.split(/\s+/).filter(Boolean)) g.move(s);
  return g.fen();
}

describe("opponentNodes", () => {
  const italian = getOpening("italian-game")!; // White; opponent moves after e4, after Nf3, after Bc4
  const tree: ExplorerTree = {
    v: 1,
    bakedAt: "",
    filter: { ratings: [0, 1000], speeds: [] },
    root: epd(new Chess().fen()),
    nodes: {
      [epd(fenAfter("e4"))]: { n: 1000, w: 500, d: 50, b: 450, m: [["e7e5", 600, 300, 30, 270], ["c7c5", 250, 120, 10, 120], ["e7e6", 150, 80, 10, 60]] },
      [epd(fenAfter("e4 e5 Nf3 Nc6 Bc4"))]: { n: 400, w: 200, d: 20, b: 180, m: [["f8c5", 200, 100, 10, 90], ["g8f6", 120, 60, 5, 55], ["h7h6", 40, 25, 2, 13], ["c6d4", 40, 15, 3, 22]] },
    },
  };

  it("lists opponent-to-move positions along the defining line, deepest first, with authored verdicts", () => {
    const nodes = opponentNodes(italian, tree);
    expect(nodes.map((n) => n.label)).toEqual(["After 1.e4 e5 2.Nf3 Nc6 3.Bc4", "After 1.e4"]);
    const tabiya = nodes[0];
    expect(tabiya.games).toBe(400);
    expect(tabiya.replies.map((r) => r.san)).toEqual(["Bc5", "Nf6", "h6", "Nd4"]);
    expect(tabiya.replies[2]).toMatchObject({ verdict: "dubious", answer: "d4" });
    expect(tabiya.replies[0].freq).toBeCloseTo(0.5, 5);
  });
  it("skips thin nodes and returns nothing without a tree", () => {
    expect(opponentNodes(italian, null)).toEqual([]);
    const thin: ExplorerTree = { ...tree, nodes: { [epd(fenAfter("e4"))]: { n: 10, w: 5, d: 0, b: 5, m: [["e7e5", 10, 5, 0, 5]] } } };
    expect(opponentNodes(italian, thin)).toEqual([]);
  });
  it("works for a Black opening (opponent moves first)", () => {
    const scandi = getOpening("scandinavian")!;
    const t: ExplorerTree = { ...tree, nodes: { [tree.root]: { n: 5000, w: 2600, d: 200, b: 2200, m: [["e2e4", 3000, 1500, 100, 1400], ["d2d4", 1500, 800, 50, 650]] } } };
    const nodes = opponentNodes(scandi, t);
    expect(nodes[0].label).toBe("From the start");
    expect(nodes[0].replies[0].san).toBe("e4");
  });
  it("numbers moves", () => {
    expect(withNumbers(["e4", "e5", "Nf3"])).toBe("1.e4 e5 2.Nf3");
  });
});
