import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { getOpening } from "@/content";
import { MergedBook } from "@/lib/book/merged";
import { moveHint, thinkAbout, trapOnPath } from "@/lib/coach/prompt";
import type { PlyRecord } from "@/lib/coach/features";
import { describeThreats, scanThreats } from "@/lib/coach/threats";
import { setupProgress } from "@/lib/setup/progress";

function play(line: string) {
  const g = new Chess();
  const history: PlyRecord[] = [];
  for (const san of line.split(/\s+/).filter(Boolean)) {
    const m = g.move(san);
    history.push({ san: m.san, uci: m.from + m.to + (m.promotion ?? ""), color: m.color === "w" ? "white" : "black" });
  }
  return { fen: g.fen(), history };
}

describe("scanThreats", () => {
  it("finds the user's hanging piece and the opponent's free piece", () => {
    // 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Nc3 Nxe4 — Black's knight on e4 hangs to Nc3; White to move.
    const { fen } = play("e4 e5 Nf3 Nc6 Bc4 Nf6 Nc3 Nxe4");
    const s = scanThreats(fen, "white");
    expect(s.theirs.map((p) => p.square)).toContain("e4");
    expect(s.inCheck).toBe(false);
    const text = describeThreats(s, fen);
    expect(text.join(" ")).toMatch(/Their knight on e4 is undefended/);
  });
  it("reports the user's attacked, undefended bishop", () => {
    // 1.e4 d5 2.Bb5+ c6 — White's bishop attacked by the c6 pawn.
    const { fen } = play("e4 d5 Bb5+ c6");
    const s = scanThreats(fen, "white");
    expect(s.mine[0].square).toBe("b5"); // worst first; the e4 pawn hangs too
    expect(describeThreats(s, fen)[0]).toMatch(/Your bishop on b5 is attacked by the pawn/);
  });
  it("reports check", () => {
    const { fen } = play("e4 d5 Bb5+");
    expect(scanThreats(fen, "black").inCheck).toBe(true);
  });
});

describe("thinkAbout", () => {
  const italian = getOpening("italian-game")!;
  const book = new MergedBook(italian, null, null);
  it("gives a setup-based plan prompt in book without naming the move", () => {
    const { fen, history } = play("e4 e5 Nf3 Nc6");
    const setup = setupProgress(fen, italian.setup, "white", history);
    const t = thinkAbout({ spec: italian, book, fen, setup, leftBook: false, firedIdeas: [] });
    expect(t.plan).toMatch(/bishop belongs on c4/);
    expect(t.facts).toEqual([]);
    expect(t.trap).toBeNull();
  });
  it("surfaces a trap the user is walking toward", () => {
    // Italian: 3...Nd4 — the Blackburne Shilling path; White must NOT take e5.
    const { fen, history } = play("e4 e5 Nf3 Nc6 Bc4 Nd4");
    const setup = setupProgress(fen, italian.setup, "white", history);
    const t = thinkAbout({ spec: italian, book, fen, setup, leftBook: false, firedIdeas: [] });
    expect(t.trap?.trap.name).toMatch(/Blackburne/);
    expect(t.trap?.forYou).toBe(false);
  });
  it("falls back to the middlegame plan once out of book", () => {
    const { fen, history } = play("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Nbd2 a6 Re1 Ba7 Bb3 h6 Nf1 Be6 Ng3 Qd7");
    const setup = setupProgress(fen, italian.setup, "white", history);
    const t = thinkAbout({ spec: italian, book, fen, setup, leftBook: true, firedIdeas: [] });
    expect(t.plan).toMatch(/knight walk|Giuoco Pianissimo/i);
  });
});

describe("hint", () => {
  const italian = getOpening("italian-game")!;
  const london = getOpening("london-system")!;
  const book = new MergedBook(italian, null, null);

  it("gives the move and the book's reason in one step", () => {
    const { fen, history } = play("e4 e5 Nf3 Nc6");
    const setup = setupProgress(fen, italian.setup, "white", history);
    const h = moveHint({ spec: italian, book, fen, setup, leftBook: false, firedIdeas: [], history }, "f1c4")!;
    expect(h.text).toMatch(/^Bc4 — The Italian bishop/);
    expect(h.from).toBe("f1");
    expect(h.to).toBe("c4");
  });

  it("falls back to the setup's reason when the position isn't annotated", () => {
    const lbook = new MergedBook(london, null, null);
    // 1.d4 d5 2.Nf3 Nf6 3.Bf4 e6 4.e3 c5 5.c3 Nc6 — Nbd2 is the setup move, not annotated as yourMove here.
    const { fen, history } = play("d4 d5 Nf3 Nf6 Bf4 e6 e3 c5 c3 Nc6");
    const setup = setupProgress(fen, london.setup, "white", history);
    const h = moveHint({ spec: london, book: lbook, fen, setup, leftBook: false, firedIdeas: [], history }, "b1d2")!;
    expect(h.text).toMatch(/^Nbd2 — /);
    expect(h.text.length).toBeGreaterThan("Nbd2 — ".length + 20);
  });

  it("explains from the position itself when out of book", () => {
    const { fen, history } = play("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O Nbd2 a6 Re1 h6 Bb3 Be6 Bxe6 fxe6");
    const setup = setupProgress(fen, italian.setup, "white", history);
    const h = moveHint({ spec: italian, book, fen, setup, leftBook: true, firedIdeas: [], history }, "d2f1")!;
    expect(h.text).toMatch(/^Nf1/);
    expect(h.text).toContain("—");
  });

  it("says so politely while the engine is still thinking", () => {
    const { fen, history } = play("e4 e5");
    const setup = setupProgress(fen, italian.setup, "white", history);
    const h = moveHint({ spec: italian, book, fen, setup, leftBook: false, firedIdeas: [], history }, null)!;
    expect(h.text).toMatch(/still checking/);
    expect(h.from).toBeUndefined();
  });

  it("trapOnPath ignores positions after the trap has fired", () => {
    const { fen } = play("e4 e5 Nf3 Nc6 Bc4 Nd4 Nxe5 Qg5 Nxf7 Qxg2 Rf1 Qxe4+ Be2 Nf3#");
    expect(trapOnPath(italian, fen)).toBeNull();
  });
});
