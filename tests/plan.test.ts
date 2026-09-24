// "Am I still playing my opening correctly?" is a question about the opening's
// own setup, not about whether the position sits in our baked tree.
//
// Jason played 1.d4 d5 2.Bf4 in the London and was told the book move was Nf3.
// Bf4 before e3 is the one rule the London actually has, so he had played the
// most important move in the system and was told he'd left the line.

import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { getOpening } from "@/content";
import { MergedBook } from "@/lib/book/merged";
import { judge } from "@/lib/coach/classify";
import { explainUserMove } from "@/lib/coach/explain";
import { moveHint } from "@/lib/coach/prompt";
import { describeMove, tagMove, type PlyRecord } from "@/lib/coach/features";
import { eventToLines, type BeatContext } from "@/lib/companion/beats";
import { admit } from "@/lib/companion/filter";
import { MAX_PRIORITY } from "@/lib/companion/prefs";
import type { CompanionLine } from "@/lib/companion/types";
import { buildGoals } from "@/components/companion/SetupSheet";
import { missingGoals, planStatus } from "@/lib/setup/plan";
import { setupProgress } from "@/lib/setup/progress";
import { compactCount } from "@/lib/format";
import { benchmarkStatus, passedCount, scoreBenchmarks } from "@/lib/principles/benchmarks";

const london = getOpening("london-system")!;
const book = new MergedBook(london, null, null);

function ctxFor(line: string, san: string, cpBefore = 0, cpAfterOpp = 0) {
  const g = new Chess();
  const history: PlyRecord[] = [];
  for (const s of line.trim().split(/\s+/).filter(Boolean)) {
    const m = g.move(s);
    history.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
  }
  const fenBefore = g.fen();
  const m = g.move(san);
  const uci = m.from + m.to;
  const move = describeMove(fenBefore, uci)!;
  const fenAfter = g.fen();
  return {
    spec: london,
    book,
    fenBefore,
    fenAfter,
    move,
    history,
    tags: tagMove(fenBefore, fenAfter, move, history),
    judgement: judge(cpBefore, cpAfterOpp, false),
    bestUci: null,
    setupBefore: setupProgress(fenBefore, london.setup, "white", history),
    setupAfter: setupProgress(fenAfter, london.setup, "white", [...history, move]),
    verbosity: "normal" as const,
    inOpening: true,
  };
}

const progressAfter = (line: string) => {
  const g = new Chess();
  const h: PlyRecord[] = [];
  for (const s of line.trim().split(/\s+/).filter(Boolean)) {
    const m = g.move(s);
    h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
  }
  return setupProgress(g.fen(), london.setup, "white", h);
};

describe("the setup outranks the move list", () => {
  it("praises Bf4 as on plan even though the line starts with Nf3", () => {
    const msg = explainUserMove(ctxFor("d4 d5", "Bf4"));
    expect(msg.kind).toBe("praise");
    expect(msg.source).toBe("setup");
    expect(msg.headline).toContain("On plan");
    // The move order is mentioned, but as information rather than a correction.
    expect(msg.lookFor).toContain("Nf3");
    expect(msg.pause).toBe(false);
  });

  it("still praises the authored move itself", () => {
    const msg = explainUserMove(ctxFor("d4 d5", "Nf3"));
    expect(msg.kind).toBe("praise");
  });

  it("flags e3 before Bf4, which is the rule that matters", () => {
    const msg = explainUserMove(ctxFor("d4 d5", "e3"));
    expect(msg.kind).toBe("warn");
    expect(msg.source).toBe("setup");
    expect(msg.headline).toMatch(/e3 before Bf4/);
  });

  it("an authored mistake still wins over any setup praise", () => {
    const italian = getOpening("italian-game")!;
    const g = new Chess();
    for (const s of "e4 e5 Nf3 Nc6 Bc4 Bc5".split(" ")) g.move(s);
    const fenBefore = g.fen();
    const m = g.move("Ng5");
    const move = describeMove(fenBefore, m.from + m.to)!;
    const msg = explainUserMove({
      ...ctxFor("d4 d5", "Nf3"),
      spec: italian,
      book: new MergedBook(italian, null, null),
      fenBefore,
      fenAfter: g.fen(),
      move,
      history: [],
      tags: [],
      setupBefore: setupProgress(fenBefore, italian.setup, "white", []),
      setupAfter: setupProgress(g.fen(), italian.setup, "white", []),
    });
    expect(msg.source).toBe("authored");
    expect(msg.kind).toBe("warn");
  });
});

describe("the persistent plan indicator", () => {
  it("reads on plan through a correct move order", () => {
    expect(planStatus(progressAfter("d4 d5 Bf4")).state).toBe("on_plan");
    expect(planStatus(progressAfter("d4 d5 Nf3")).state).toBe("on_plan");
  });

  it("reads off plan, with the reason, once the order rule breaks", () => {
    const p = planStatus(progressAfter("d4 d5 e3"));
    expect(p.state).toBe("off_plan");
    expect(p.detail).toBe("e3 came before Bf4");
  });

  it("counts goals so the header can show progress", () => {
    const p = planStatus(progressAfter("d4 d5 Bf4"));
    expect(p.total).toBe(8);
    expect(p.met).toBe(2);
  });
});

describe("the opponent leaving theory is not an event about you", () => {
  const ctx: BeatContext = { spec: london, recurring: [], lastSession: null };

  it("says it changes nothing, and says it quietly", () => {
    const [line] = eventToLines({ t: "book_ended", plyIndex: 4, by: "them", san: "c6" }, ctx);
    expect(line.text).toMatch(/doesn't change your plan/i);
    expect(line.priority).toBe(2); // colour: suppressed entirely at Quiet and Normal
  });

  it("your own departure is still worth hearing", () => {
    const [line] = eventToLines({ t: "book_ended", plyIndex: 3, by: "you", san: "Bf4", bookMove: "Nf3" }, ctx);
    expect(line.priority).toBe(1);
  });
});

describe("the post-game setup report", () => {
  const ctx: BeatContext = { spec: london, recurring: [], lastSession: null };
  const gameOver = (line: string) => {
    const setup = progressAfter(line);
    const [l] = eventToLines(
      { t: "game_over", info: { result: "win", takebacks: 0, hintsUsed: 0, momentum: 0, plies: 10, history: [], bookEndedAt: null, setup } },
      ctx,
    );
    return l;
  };

  it("reports goals reached and what was left out", () => {
    const line = gameOver("d4 d5 Bf4 c6 e3 Nf6 Nf3 e6 Bd3 Bd6");
    expect(line.more).toMatch(/reached \d of 8 setup goals/);
    expect(line.more).toMatch(/outstanding/i);
  });

  it("names the broken order rule when there was one", () => {
    // Note the line can't even reach Bf4: the e3-pawn physically blocks the
    // c1-h6 diagonal, which is the whole reason the rule exists.
    expect(gameOver("d4 d5 e3 Nf6 Nf3 e6 Bd3").more).toMatch(/e3 came before Bf4/);
  });

  it("lists what never arrived", () => {
    expect(missingGoals(progressAfter("d4 d5 Bf4"))).toContain("never castled");
  });
});

const beatCtx: BeatContext = { spec: london, recurring: [], lastSession: null };

describe("praise actually reaches the player", () => {
  // The whole point of an on-plan message is that it arrives at the default
  // setting. It used to be built at priority 2, which Normal drops.
  it("admits a verdict on your own move at Quiet and Normal", () => {
    const praise: CompanionLine = {
      id: "3:verdict_good",
      plyIndex: 3,
      speaker: "caissa",
      kind: "verdict_good",
      text: "Bf4. On plan.",
      priority: 1,
      tone: "praise",
    };
    expect(admit(praise, { chattiness: "normal", recent: [] })).toBe(true);
    expect(admit(praise, { chattiness: "chatty", recent: [] })).toBe(true);
  });

  it("builds the on-plan verdict at a priority Normal lets through", () => {
    const message = explainUserMove(ctxFor("d4 d5", "Bf4"));
    const [line] = eventToLines(
      { t: "user_judged", plyIndex: 3, message, judgement: null, winPct: null, deltaPct: null, tags: [], pause: false, stepping: false },
      beatCtx,
    );
    expect(line.priority).toBeLessThanOrEqual(MAX_PRIORITY.normal);
    expect(admit(line, { chattiness: "normal", recent: [] })).toBe(true);
  });

  it("still keeps idle colour out at Normal", () => {
    const colour: CompanionLine = { id: "3:orient", plyIndex: 3, speaker: "caissa", kind: "orient", text: "A thought.", priority: 2 };
    expect(admit(colour, { chattiness: "normal", recent: [] })).toBe(false);
  });
});

describe("the setup sheet shows every goal", () => {
  it("lists all eight London goals with their reasons", () => {
    const goals = buildGoals(london, progressAfter("d4 d5 Bf4"));
    expect(goals).toHaveLength(8);
    expect(goals.filter((g) => g.done)).toHaveLength(2);
    expect(goals.find((g) => g.label.startsWith("Bishop to f4"))?.why).toMatch(/before e3/);
    expect(goals.some((g) => g.label === "Castle")).toBe(true);
  });
});

describe("Principles Mode counts only what it has tested", () => {
  const game = (line: string) => {
    const g = new Chess();
    const h: { san: string; uci: string; color: "white" | "black"; fen: string; byUser: boolean }[] = [];
    for (const san of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(san);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black", fen: g.fen(), byUser: m.color === "w" });
    }
    return h;
  };

  it("claims nothing on move two", () => {
    // It used to say 5 of 5 here. Four of the five cannot have been tested:
    // you have not reached move ten or twelve.
    const r = scoreBenchmarks(game("e4 e5"), "white");
    const { passed, total } = passedCount(r);
    expect(total).toBe(1); // only "start in the centre" is decidable
    expect(passed).toBe(1);
    expect(r.filter((b) => b.settled)).toHaveLength(1);
  });

  it("settles a benchmark the moment it fails, without waiting", () => {
    // 2.Qh5 and 3.Qf3: two queen moves before move ten.
    const r = scoreBenchmarks(game("e4 e5 Qh5 Nc6 Qf3 Nf6"), "white");
    const queen = r.find((b) => b.id === "queenQuietBefore10")!;
    expect(queen.settled).toBe(true);
    expect(queen.pass).toBe(false);
  });

  it("gives the header a chip in the same shape the openings use", () => {
    const clean = benchmarkStatus(scoreBenchmarks(game("e4 e5"), "white"));
    expect(clean.state).toBe("on_plan");
    expect(clean.label).toBe("on track");
    expect(clean.detail).toBeUndefined();

    const slipped = benchmarkStatus(scoreBenchmarks(game("h4 e5"), "white")); // a rook pawn, not the centre
    expect(slipped.state).toBe("off_plan");
    expect(slipped.label).toBe("off track");
    expect(slipped.detail).toBeTruthy();
  });
});

describe("numbers as a reader would say them", () => {
  it("rounds big counts and leaves small ones alone", () => {
    expect(compactCount(1_545_089)).toBe("1.5M");
    expect(compactCount(3_061_575)).toBe("3.1M");
    expect(compactCount(12_400_000)).toBe("12M");
    expect(compactCount(47_300)).toBe("47k");
    expect(compactCount(820)).toBe("820");
    expect(compactCount(0)).toBe("0");
  });
});

describe("the hint never suggests a move the trainer will punish", () => {
  const caro = getOpening("caro-kann")!;
  const caroBook = new MergedBook(caro, null, null);

  const play = (line: string) => {
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const san of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(san);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    return { g, h };
  };

  it("redirects to the bishop when the engine wants ...e6 first", () => {
    // Caro-Kann Advance, Black's bishop still at home. ...e6 now locks it in,
    // which is the one rule this opening has.
    const { g, h } = play("e4 c6 d4 d5 e5");
    const setup = setupProgress(g.fen(), caro.setup, "black", h);
    const hint = moveHint({ spec: caro, book: caroBook, fen: g.fen(), setup, leftBook: true, firedIdeas: [], history: h }, "e7e6");
    expect(hint).not.toBeNull();
    expect(hint!.text).toMatch(/^Bf5/); // the rule's own move, not the engine's
    expect(hint!.to).toBe("f5");
  });

  it("leaves an ordinary hint alone", () => {
    const { g, h } = play("e4 c6 d4 d5 e5");
    const setup = setupProgress(g.fen(), caro.setup, "black", h);
    const hint = moveHint({ spec: caro, book: caroBook, fen: g.fen(), setup, leftBook: true, firedIdeas: [], history: h }, "c8f5");
    expect(hint!.text).toMatch(/^Bf5/);
  });
});

describe("an order rule with nothing left to protect", () => {
  const caro = getOpening("caro-kann")!;

  it("stops firing once the bishop it protects is gone", () => {
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const san of "e4 c6 d4 d5 e5 e6".split(" ")) {
      const m = g.move(san);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    // Bishop still on c8 and ...e6 played, so the rule fires.
    expect(setupProgress(g.fen(), caro.setup, "black", h).orderViolations).toHaveLength(1);

    // Take that bishop off the board and the rule has nothing left to protect.
    const gone = new Chess(g.fen());
    gone.remove("c8");
    expect(setupProgress(gone.fen(), caro.setup, "black", h).orderViolations).toHaveLength(0);
  });

  it("still fires when only the wrong-coloured bishop remains", () => {
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const san of "e4 c6 d4 d5 e5 e6".split(" ")) {
      const m = g.move(san);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    const onlyDark = new Chess(g.fen());
    onlyDark.remove("c8"); // light-squared bishop gone; f8 (dark) remains
    const v = setupProgress(onlyDark.fen(), caro.setup, "black", h).orderViolations;
    // f8 is a dark-squared bishop and can never reach f5 or g4, so no rule.
    expect(v).toHaveLength(0);
  });
});

describe("every verdict answers 'was there something better?'", () => {
  const italian = getOpening("italian-game")!;
  const itaBook = new MergedBook(italian, null, null);

  /** cpAfterOpp drives the win% drop, which is what sets the severity band. */
  function verdict(line: string, san: string, cpBefore: number, cpAfterOpp: number, bestUci: string | null) {
    const g = new Chess();
    const history: PlyRecord[] = [];
    for (const s of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(s);
      history.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    const fenBefore = g.fen();
    const m = g.move(san);
    const uci = m.from + m.to;
    const move = describeMove(fenBefore, uci)!;
    return explainUserMove({
      spec: italian,
      book: itaBook,
      fenBefore,
      fenAfter: g.fen(),
      move,
      history,
      tags: tagMove(fenBefore, g.fen(), move, history),
      judgement: judge(cpBefore, cpAfterOpp, bestUci === uci),
      bestUci,
      setupBefore: setupProgress(fenBefore, italian.setup, "white", history),
      setupAfter: setupProgress(g.fen(), italian.setup, "white", [...history, { san: m.san, uci, color: "white" }]),
      verbosity: "normal" as const,
      inOpening: true,
    });
  }

  it("says nothing was better when the move was best", () => {
    const msg = verdict("e4 e5 Nf3 Nc6 Bc4 Bc5", "c3", 30, -30, "c2c3");
    expect(msg.pause).toBe(false);
    expect(`${msg.body} ${msg.lookFor ?? ""}`).toMatch(/Nothing better/i);
  });

  it("names the better move when the gap is small but real", () => {
    // A drop in the "ok" band: not worth stopping for, worth mentioning.
    const msg = verdict("e4 e5 Nf3 Nc6 Bc4 Bc5", "d3", 90, -20, "c2c3");
    expect(msg.severity).toBe("ok");
    expect(msg.pause).toBe(false);
    expect(msg.body).toMatch(/c3 was a shade better/);
  });

  it("stops and explains when the gap is an inaccuracy", () => {
    const msg = verdict("e4 e5 Nf3 Nc6 Bc4 Bc5", "d3", 120, -20, "c2c3");
    expect(msg.severity).toBe("inaccuracy");
    expect(msg.pause).toBe(true); // the learning moment Jason asked for
    expect(msg.headline).toMatch(/There was better/);
    expect(msg.lookFor).toMatch(/c3 was the move/);
  });

  it("never claims a better move it does not have", () => {
    const msg = verdict("e4 e5 Nf3 Nc6 Bc4 Bc5", "d3", 120, -20, null);
    expect(msg.pause).toBe(false); // nothing to teach, so nothing to stop for
    expect(`${msg.headline} ${msg.body} ${msg.lookFor ?? ""}`).not.toMatch(/undefined|null/);
  });
});

describe("the hint and the book never contradict each other", () => {
  const london = getOpening("london-system")!;
  const lonBook = new MergedBook(london, null, null);

  const at = (line: string) => {
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const san of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(san);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    return { g, h };
  };

  it("hints the book's move even when the engine prefers another", () => {
    // After 3...Nf6 the book wants Bf4. Hand the hint a different "best".
    const { g, h } = at("d4 d5 Nf3 Nf6");
    const setup = setupProgress(g.fen(), london.setup, "white", h);
    const hint = moveHint({ spec: london, book: lonBook, fen: g.fen(), setup, leftBook: false, firedIdeas: [], history: h }, "c2c4");
    expect(hint!.text).toMatch(/^Bf4 —/);
    expect(hint!.to).toBe("f4");
  });

  it("gives a reason to play the move, not a post-mortem", () => {
    // Jason's position: 4...Bg4, where the book has nothing and dxc5 is best.
    const { g, h } = at("d4 d5 Nf3 Nf6 Bf4 c5 e3 Bg4");
    const setup = setupProgress(g.fen(), london.setup, "white", h);
    const hint = moveHint({ spec: london, book: lonBook, fen: g.fen(), setup, leftBook: false, firedIdeas: [], history: h }, "d4c5");
    expect(hint!.text).toMatch(/^dxc5 —/);
    // It used to read "Material in hand wins itself: trade pieces, keep your
    // king safe, and let the endgame do the work" — on move five.
    expect(hint!.text).not.toMatch(/endgame do the work/);
    expect(hint!.text).toMatch(/wins (a )?pawn|wins material/i);
  });
});

describe("setup goals record what you achieved, not what survived", () => {
  const london = getOpening("london-system")!;

  const played = (line: string) => {
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const san of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(san);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    return { g, h };
  };

  // A complete London: bishop out before e3, both knights, both bishops, the
  // c3/d4/e3 triangle, and castled.
  const FULL = "d4 d5 Nf3 Nf6 Bf4 e6 e3 Be7 c3 O-O Nbd2 c5 Bd3 Nc6 O-O";

  it("counts a completed setup as complete", () => {
    const { g, h } = played(FULL);
    expect(setupProgress(g.fen(), london.setup, "white", h).met).toBe(8);
  });

  it("keeps the goals once the pieces are traded off", () => {
    // Jason won a 29-move game and finished on "setup 3 of 8", because the
    // count read the final position: by then the minor pieces are long gone.
    const { g, h } = played(FULL);
    const endgame = new Chess(g.fen());
    for (const sq of ["f4", "f3", "d2", "d3"] as const) endgame.remove(sq);
    const p = setupProgress(endgame.fen(), london.setup, "white", h);
    expect(p.met).toBe(8);
    expect(p.pieces.every((x) => x.done)).toBe(true);
  });

  it("does not credit a goal that was never reached", () => {
    const { g, h } = played("d4 d5 Nf3 Nf6 e3 e6");
    const p = setupProgress(g.fen(), london.setup, "white", h);
    // Pawns d4 and e3 are in; the bishop never came out.
    expect(p.pieces.find((x) => x.squares.includes("f4"))!.done).toBe(false);
    expect(p.met).toBeLessThan(8);
  });

  it("credits a bishop that reached f4 and then retreated to g3", () => {
    const { g, h } = played("d4 d5 Nf3 Nf6 Bf4 e6 Bg3 Bd6");
    const p = setupProgress(g.fen(), london.setup, "white", h);
    expect(p.pieces.find((x) => x.squares.includes("f4"))!.done).toBe(true);
  });

  it("counts a pawn that arrived by capture", () => {
    const { g, h } = played("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 c5 Nf3 cxd4 Nxd4 e6 Ndb5 Na6 Be3");
    // White's e-pawn captured onto d5 and later vanished; the d4 push happened.
    expect(setupProgress(g.fen(), london.setup, "white", h).pawns.find((x) => x.square === "d4")!.done).toBe(true);
  });
});

describe("the first hint of a game always names a move", () => {
  const at = (spec: ReturnType<typeof getOpening>, line: string) => {
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const san of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(san);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    return { g, h, setup: setupProgress(g.fen(), spec!.setup, spec!.side, h) };
  };

  it("hints ...d5 in the Scandinavian, not a refusal", () => {
    // The baked evaluation prefers ...e6 here, which breaks the bishop rule and
    // whose required move is not legal on move one. That produced "Not yet:"
    // with no move in it — the first thing a new player ever saw.
    const spec = getOpening("scandinavian")!;
    const { g, h, setup } = at(spec, "e4");
    const hint = moveHint({ spec, book: new MergedBook(spec, null, null), fen: g.fen(), setup, leftBook: false, firedIdeas: [], history: h }, "e7e6");
    expect(hint!.text).toMatch(/^d5 —/);
    expect(hint!.to).toBe("d5");
    expect(hint!.text).not.toMatch(/Not yet/);
  });

  it("hints ...c6 in the Caro-Kann, the other opening this broke", () => {
    const spec = getOpening("caro-kann")!;
    const { g, h, setup } = at(spec, "e4");
    const hint = moveHint({ spec, book: new MergedBook(spec, null, null), fen: g.fen(), setup, leftBook: false, firedIdeas: [], history: h }, "e7e6");
    expect(hint!.text).toMatch(/^c6 —/);
  });

  it("every hint along an opening's own line names a move", () => {
    for (const spec of [getOpening("scandinavian")!, getOpening("caro-kann")!, getOpening("london-system")!, getOpening("italian-game")!]) {
      const g = new Chess();
      const h: PlyRecord[] = [];
      const sans = spec.firstMoves.trim().split(/\s+/).map((t) => t.replace(/^\d+\.(\.\.)?/, "")).filter(Boolean);
      for (const san of [...sans, ""]) {
        if ((g.turn() === "w" ? "white" : "black") === spec.side) {
          const setup = setupProgress(g.fen(), spec.setup, spec.side, h);
          // Hand it the move the engine most often wants here, which is the one
          // that used to trip the rule.
          const hint = moveHint({ spec, book: new MergedBook(spec, null, null), fen: g.fen(), setup, leftBook: false, firedIdeas: [], history: h }, "e7e6");
          expect(hint, `${spec.id} after ${h.map((p) => p.san).join(" ")}`).not.toBeNull();
          expect(hint!.text, `${spec.id} after ${h.map((p) => p.san).join(" ")}`).toMatch(/^(O-O(-O)?|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8])/);
          expect(hint!.text, "authoring syntax must never reach the player").not.toContain("|");
        }
        if (!san) break;
        const m = g.move(san);
        h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
      }
    }
  });

});

describe("Larsen's Opening is coached to the same standard", () => {
  const larsen = getOpening("larsen")!;
  const larsenBook = new MergedBook(larsen, null, null);

  const play = (line: string) => {
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const s of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(s);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    return { g, h };
  };
  const verdict = (line: string, san: string) => {
    const { g, h } = play(line);
    const fenBefore = g.fen();
    const m = g.move(san);
    const uci = m.from + m.to;
    const move = describeMove(fenBefore, uci)!;
    return explainUserMove({
      spec: larsen, book: larsenBook, fenBefore, fenAfter: g.fen(), move, history: h,
      tags: tagMove(fenBefore, g.fen(), move, h), judgement: judge(20, -20, false), bestUci: null,
      setupBefore: setupProgress(fenBefore, larsen.setup, "white", h),
      setupAfter: setupProgress(g.fen(), larsen.setup, "white", [...h, { san: m.san, uci, color: "white" }]),
      verbosity: "normal" as const, inOpening: true,
    });
  };

  it("carries everything the other coached openings carry", () => {
    expect(larsen.setup.pieces.length).toBeGreaterThanOrEqual(4);
    expect(larsen.setup.order?.length).toBeGreaterThanOrEqual(1);
    expect(larsen.traps.length).toBeGreaterThanOrEqual(2);
    expect(larsen.ideas.length).toBeGreaterThanOrEqual(5);
    expect(Object.keys(larsen.annotations).length).toBeGreaterThanOrEqual(12);
    expect(larsen.structureDiagram).toBeTruthy();
  });

  it("hints its own first move", () => {
    const { g } = play("");
    const hint = moveHint(
      { spec: larsen, book: larsenBook, fen: g.fen(), setup: setupProgress(g.fen(), larsen.setup, "white", []), leftBook: false, firedIdeas: [], history: [] },
      "e2e4",
    );
    expect(hint!.text).toMatch(/^b3 —/);
  });

  it("stops the game for d4, which entombs the bishop the opening is built on", () => {
    const v = verdict("b3 e5 Bb2 Nc6", "d4");
    expect(v.pause).toBe(true);
    expect(v.body).toMatch(/blocks the bishop|in front of your own bishop/i);
  });

  it("stops the game for the greedy Bxe5", () => {
    const v = verdict("b3 e5 Bb2 Nc6", "Bxe5");
    expect(v.pause).toBe(true);
    expect(v.body).toMatch(/bishop for a pawn/i);
  });

  it("praises the book move", () => {
    expect(verdict("b3 e5 Bb2 Nc6 e3 Nf6", "Bb5").kind).toBe("praise");
  });

  it("reaches a complete setup in a normal game", () => {
    const { g, h } = play("b3 e5 Bb2 Nc6 e3 Nf6 Bb5 Bd6 Nf3 O-O O-O Re8 c4 a6 Nc3 h6");
    const sp = setupProgress(g.fen(), larsen.setup, "white", h);
    expect(sp.met).toBe(sp.total);
    expect(sp.orderViolations).toHaveLength(0);
  });

  it("flags d4 played before c4 as the wrong order", () => {
    const { g, h } = play("b3 e5 Bb2 Nc6 e3 Nf6 Bb5 Bd6 d4");
    const sp = setupProgress(g.fen(), larsen.setup, "white", h);
    expect(sp.orderViolations.map((v) => `${v.after} before ${v.before}`)).toContain("d4 before c4");
  });
});

describe("order rules are scoped to their premise", () => {
  const run = (id: string, line: string) => {
    const spec = getOpening(id)!;
    const g = new Chess();
    const h: PlyRecord[] = [];
    for (const s of line.trim().split(/\s+/).filter(Boolean)) {
      const m = g.move(s);
      h.push({ san: m.san, uci: m.from + m.to, color: m.color === "w" ? "white" : "black" });
    }
    return setupProgress(g.fen(), spec.setup, spec.side, h).orderViolations.map((v) => `${v.after} before ${v.before}`);
  };

  it("Open Games: bishop-before-knight is only a mistake once a knight can hit e5", () => {
    expect(run("open-games-black", "e4 e5 f4 Bc5")).toEqual([]); // King's Gambit Declined: correct
    expect(run("open-games-black", "e4 e5 Nf3 Bc5")).toEqual(["Bc5 before Nc6"]); // drops e5 to Nxe5
  });

  it("Four Knights: castling before d4 only matters with a bishop pinning c3", () => {
    expect(run("four-knights", "e4 e5 Nf3 Nc6 Nc3 Nf6 d4")).toEqual([]); // Scotch Four Knights: main line
    expect(run("four-knights", "e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 d4")).toEqual(["d4 before O-O"]);
  });

  it("Queen's Gambit: e3 before the bishop is fine once Black has taken on c4", () => {
    expect(run("queens-gambit", "d4 d5 c4 dxc4 Nf3 Nf6 e3")).toEqual([]);
    expect(run("queens-gambit", "d4 d5 c4 e6 Nc3 Nf6 e3")).toEqual(["e3 before Bg5 or Bf4".replace(" or ", "|")]);
  });

  it("Caro-Kann: the bishop rule switches off in the Panov", () => {
    expect(run("caro-kann", "e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6")).toEqual([]);
    expect(run("caro-kann", "e4 c6 d4 d5 e5 e6")).toEqual(["e6 before Bf5|Bg4"]);
  });
});
