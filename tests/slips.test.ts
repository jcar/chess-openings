import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { getOpening } from "@/content";
import type { OpeningSpec } from "@/content/spec";
import { eventToLines, type BeatContext } from "@/lib/companion/beats";
import { recall } from "@/lib/companion/recall";
import type { TrainEvent } from "@/lib/companion/events";
import type { MoveInfo } from "@/lib/coach/features";
import type { CoachMessage } from "@/lib/coach/explain";
import { activeSlips, RETIRE_AFTER, settle, type JudgedMove, type SlipState } from "@/lib/progress/slips";
import type { PlyRecord } from "@/lib/setup/progress";
import { wordCount, MAX_HEADLINE_WORDS } from "@/lib/companion/types";

const london = getOpening("london-system")!;
const caro = getOpening("caro-kann")!;
const EMPTY: SlipState = { byOpening: {} };

/** Plays `line` then `san`, returning what the ledger and the beats see. */
function judged(spec: OpeningSpec, line: string, san: string, pause: boolean, source: string, better?: string): JudgedMove & { move: MoveInfo } {
  const g = new Chess();
  const historyBefore: PlyRecord[] = [];
  for (const s of line.split(" ").filter(Boolean)) {
    const m = g.move(s);
    historyBefore.push({ san: m.san, color: m.color === "w" ? "white" : "black" });
  }
  const fenBefore = g.fen();
  const m = g.move(san);
  const move: MoveInfo = { san: m.san, uci: m.from + m.to, color: spec.side, piece: m.piece, from: m.from, to: m.to, isCheck: false, isCastle: false };
  return { fenBefore, fenAfter: g.fen(), san: m.san, from: m.from, historyBefore, pause, source, better, why: "Because.", move };
}

function historyOf(line: string): { fen: string; history: PlyRecord[] } {
  const g = new Chess();
  const history: PlyRecord[] = [];
  for (const s of line.split(" ").filter(Boolean)) {
    const m = g.move(s);
    history.push({ san: m.san, color: m.color === "w" ? "white" : "black" });
  }
  return { fen: g.fen(), history };
}

function judgedEvent(j: ReturnType<typeof judged>): TrainEvent {
  const message: CoachMessage = { kind: j.pause ? "warn" : "praise", headline: `${j.san}.`, body: "", source: j.source as CoachMessage["source"], pause: j.pause };
  return { t: "user_judged", plyIndex: j.historyBefore.length + 1, message, judgement: null, winPct: null, deltaPct: null, tags: [], pause: j.pause, stepping: false, move: j.move, fenBefore: j.fenBefore, fenAfter: j.fenAfter, historyBefore: j.historyBefore };
}

describe("the slip ledger", () => {
  it("files a broken order rule under the rule, not the position", () => {
    const s = settle(EMPTY, london, "g1", judged(london, "d4 d5", "e3", true, "setup", "Bf4"));
    const [slip] = Object.values(s.byOpening["london-system"]);
    expect(slip).toMatchObject({ kind: "order", san: "e3", better: "Bf4", games: 1, rule: { before: "Bf4", after: "e3" } });
    expect(slip.why).toMatch(/bishop OUT before e3/);
  });

  it("files a book mistake under the exact position and the piece that moved", () => {
    const s = settle(EMPTY, caro, "g1", judged(caro, "e4 c6 d4 d5 e5", "e6", true, "authored", "Bf5"));
    const [slip] = Object.values(s.byOpening["caro-kann"]);
    expect(slip).toMatchObject({ kind: "book", san: "e6", from: "e7", better: "Bf5", games: 1 });
  });

  it("counts a slip once per game, however many times it's taken back and replayed", () => {
    let s = settle(EMPTY, london, "g1", judged(london, "d4 d5", "e3", true, "setup"));
    s = settle(s, london, "g1", judged(london, "d4 d5", "e3", true, "setup"));
    expect(Object.values(s.byOpening["london-system"])[0].games).toBe(1);
    s = settle(s, london, "g2", judged(london, "d4 Nf6", "e3", true, "setup"));
    expect(Object.values(s.byOpening["london-system"])[0].games).toBe(2);
  });

  it("ignores moves that didn't stop the game", () => {
    expect(settle(EMPTY, london, "g1", judged(london, "d4 d5", "Bf4", false, "authored"))).toBe(EMPTY);
  });

  it("retires a slip after two clean games in a row, and a relapse resets the count", () => {
    let s = settle(EMPTY, london, "g1", judged(london, "d4 d5", "e3", true, "setup"));
    s = settle(s, london, "g2", judged(london, "d4 d5", "Bf4", false, "authored"));
    expect(activeSlips(s, "london-system", "g3")).toHaveLength(1);
    s = settle(s, london, "g3", judged(london, "d4 Nf6", "Bf4", false, "authored"));
    expect(Object.values(s.byOpening["london-system"])[0].cleared).toBe(RETIRE_AFTER);
    expect(activeSlips(s, "london-system", "g4")).toHaveLength(0);

    let r = settle(EMPTY, london, "g1", judged(london, "d4 d5", "e3", true, "setup"));
    r = settle(r, london, "g2", judged(london, "d4 d5", "Bf4", false, "authored"));
    r = settle(r, london, "g3", judged(london, "d4 d5", "e3", true, "setup"));
    expect(Object.values(r.byOpening["london-system"])[0]).toMatchObject({ cleared: 0, games: 2 });
  });

  it("gets no credit for the right move straight after taking the wrong one back", () => {
    let s = settle(EMPTY, london, "g1", judged(london, "d4 d5", "e3", true, "setup"));
    s = settle(s, london, "g1", judged(london, "d4 d5", "Bf4", false, "authored"));
    expect(Object.values(s.byOpening["london-system"])[0].cleared).toBe(0);
  });
});

describe("recall on pick-up", () => {
  const afterLondonSlip = settle(EMPTY, london, "g1", judged(london, "d4 d5", "e3", true, "setup", "Bf4"));
  const afterCaroSlip = settle(EMPTY, caro, "g1", judged(caro, "e4 c6 d4 d5 e5", "e6", true, "authored", "Bf5"));

  it("warns when you pick up the pawn that broke the rule last game — in any move order", () => {
    const slips = activeSlips(afterLondonSlip, "london-system", "g2");
    for (const line of ["d4 d5", "d4 Nf6", "d4 e6"]) {
      const { fen, history } = historyOf(line);
      const r = recall(fen, "e2", history, london, slips);
      expect(r?.text, line).toBe("Last time e3 came before Bf4. Bf4 first.");
      expect(r?.deco.arrow).toMatchObject({ from: "c1", to: "f4" });
    }
  });

  it("says nothing when you reach for the right piece, or after the rule is kept", () => {
    const slips = activeSlips(afterLondonSlip, "london-system", "g2");
    const { fen, history } = historyOf("d4 d5");
    expect(recall(fen, "c1", history, london, slips)).toBeNull();
    const kept = historyOf("d4 d5 Bf4 Nf6");
    expect(recall(kept.fen, "e2", kept.history, london, slips)).toBeNull();
  });

  it("remembers a book mistake in exactly that position, with the better move", () => {
    const slips = activeSlips(afterCaroSlip, "caro-kann", "g2");
    const { fen, history } = historyOf("e4 c6 d4 d5 e5");
    const r = recall(fen, "e7", history, caro, slips);
    expect(r?.text).toBe("Last time here: e6. Bf5 instead.");
    expect(r?.deco.arrow).toMatchObject({ from: "c8", to: "f5" });
    // Same pawn, different position: not this memory.
    const other = historyOf("e4 c6 d4 d5 exd5 cxd5");
    expect(recall(other.fen, "e7", other.history, caro, slips.filter((s) => s.kind !== "order"))).toBeNull();
  });

  it("stays quiet in the game the slip was made in", () => {
    expect(activeSlips(afterLondonSlip, "london-system", "g1")).toHaveLength(0);
  });

  it("keeps every line inside the headline budget", () => {
    const slips = activeSlips(afterLondonSlip, "london-system", "g2");
    const { fen, history } = historyOf("d4 d5");
    const r = recall(fen, "e2", history, london, slips)!;
    expect(wordCount(r.text)).toBeLessThanOrEqual(MAX_HEADLINE_WORDS);
  });
});

describe("her lines", () => {
  const ledger = settle(EMPTY, london, "g1", judged(london, "d4 d5", "e3", true, "setup", "Bf4"));
  const ctx = (gameId: string): BeatContext => ({ spec: london, recurring: [], lastSession: null, slips: activeSlips(ledger, "london-system", gameId) });

  it("speaks up on the pick-up, urgently enough that Quiet still hears it", () => {
    const { fen, history } = historyOf("d4 d5");
    const lines = eventToLines({ t: "pickup", plyIndex: 2, square: "e2", fen, history }, ctx("g2"));
    expect(lines[0]).toMatchObject({ kind: "recall", priority: 0, text: "Last time e3 came before Bf4. Bf4 first." });
  });

  it("notices when you get it right this time", () => {
    const lines = eventToLines(judgedEvent(judged(london, "d4 d5", "Bf4", false, "authored")), ctx("g2"));
    expect(lines.find((l) => l.kind === "remembered")?.text).toBe("Remembered — Bf4 first this time.");
  });

  it("doesn't praise a repeat, or the right move after a take-back", () => {
    expect(eventToLines(judgedEvent(judged(london, "d4 d5", "e3", true, "setup")), ctx("g2")).some((l) => l.kind === "remembered")).toBe(false);
    expect(eventToLines(judgedEvent(judged(london, "d4 d5", "Bf4", false, "authored")), ctx("g1")).some((l) => l.kind === "remembered")).toBe(false);
  });

  it("walks in with the last slip", () => {
    const [hello] = eventToLines({ t: "game_start" }, ctx("g2"));
    expect(hello.text).toBe("London System again. Bf4 before e3 this time.");
    expect(wordCount(hello.text)).toBeLessThanOrEqual(MAX_HEADLINE_WORDS);
  });
});
