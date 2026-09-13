import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { describeRecurring, type MistakeEntry } from "@/lib/progress/mistakes";
import { readyToGraduate, type Session } from "@/lib/progress/sessions";
import { passedCount, scoreBenchmarks, type GamePly } from "@/lib/principles/benchmarks";

function game(line: string, userSide: "white" | "black"): GamePly[] {
  const g = new Chess();
  const out: GamePly[] = [];
  for (const san of line.trim().split(/\s+/)) {
    const m = g.move(san);
    const color = m.color === "w" ? "white" : "black";
    out.push({ san: m.san, uci: m.from + m.to + (m.promotion ?? ""), color, fen: g.fen(), byUser: color === userSide });
  }
  return out;
}

describe("benchmarks", () => {
  it("a clean Italian passes all five", () => {
    const h = game("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Nbd2 a6 Re1 Ba7 Bb3 h6 Nf1 Be6 Ng3 Qd7 Be3 Bxb3 axb3 Rae8", "white");
    const r = scoreBenchmarks(h, "white");
    expect(passedCount(r)).toEqual({ passed: 5, total: 5 });
  });
  it("early queen, no castling, and a hung piece fail", () => {
    // Wayward queen, king never castles, knight hung on e4 at the end.
    const h = game("e4 e5 Qh5 Nc6 Qf3 Nf6 Ne2 d5 Ng3 dxe4 Nxe4 Nxe4 Qxe4 Be7 a3 O-O h3 Bd6 g4 Re8 Qc4 Bf5 Nc3 Qd7", "white");
    const r = scoreBenchmarks(h, "white");
    const byId = Object.fromEntries(r.map((x) => [x.id, x]));
    expect(byId.queenQuietBefore10.pass).toBe(false);
    expect(byId.castledBy10.pass).toBe(false);
    expect(byId.minorsOutBy12.pass).toBe(false);
  });
  it("hanging detection catches a piece left en prise", () => {
    const h = game("e4 e5 Nf3 Nc6 Bc4 Nf6 Nc3 Nxe4", "black");
    const r = scoreBenchmarks(h, "black");
    expect(r.find((x) => x.id === "noHangingPieces")!.pass).toBe(false);
  });
});

describe("recurring mistakes", () => {
  it("phrases an entry", () => {
    const e: MistakeEntry = { tag: "hangs_piece", square: "e5", count: 3, lastSeen: "", sample: "Nxe5" };
    expect(describeRecurring(e)).toBe("3rd game where you left a piece hanging on e5.");
  });
});

describe("graduation", () => {
  const s = (passed: number, openingId = "principles"): Session => ({
    openingId, at: "", result: "win", plies: 40, clean: true, botElo: 700, accuracy: 80, worst: null, setupScore: null, benchmarks: { passed, total: 5 },
  });
  it("needs 3 of the last 4 principles games at 4/5 or better", () => {
    expect(readyToGraduate({ recent: [s(5), s(4)] })).toBe(false);
    expect(readyToGraduate({ recent: [s(5), s(4), s(2), s(4)] })).toBe(true);
    expect(readyToGraduate({ recent: [s(5), s(3), s(2), s(4)] })).toBe(false);
    expect(readyToGraduate({ recent: [s(5, "italian-game"), s(5, "italian-game"), s(5), s(5), s(5)] })).toBe(true);
  });
});
