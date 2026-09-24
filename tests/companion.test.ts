import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { getOpening } from "@/content";
import { anticipate } from "@/lib/companion/anticipate";
import { eventToLines, type BeatContext } from "@/lib/companion/beats";
import { admit, admitAll, mergeLines, truncateLines } from "@/lib/companion/filter";
import { reduce } from "@/lib/companion/useCompanion";
import type { TrainEvent } from "@/lib/companion/events";
import type { CompanionLine } from "@/lib/companion/types";
import type { CoachMessage } from "@/lib/coach/explain";
import type { MistakeEntry } from "@/lib/progress/mistakes";
import type { Ply } from "@/lib/game/useTrainGame";

const italian = getOpening("italian-game")!;
const ctx: BeatContext = { spec: italian, recurring: [], lastSession: null };

function fakeLine(over: Partial<CompanionLine> = {}): CompanionLine {
  return { id: "x", plyIndex: 0, speaker: "caissa", kind: "orient", text: "something", priority: 1, ...over };
}

function ply(san: string, byUser = true): Ply {
  return { san, uci: "e2e4", color: byUser ? "white" : "black", fen: new Chess().fen(), byUser };
}

/** The move facts a judged-move event carries for the slip ledger. None of these
 *  tests exercise the ledger, so a neutral 1.e4 does. */
const J = {
  move: { san: "e4", uci: "e2e4", color: "white", piece: "p", from: "e2", to: "e4", isCheck: false, isCastle: false } as const,
  fenBefore: new Chess().fen(),
  fenAfter: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
  historyBefore: [],
};

function msg(over: Partial<CoachMessage> = {}): CoachMessage {
  return { kind: "note", headline: "Fine.", body: "", source: "engine", pause: false, ...over };
}

describe("mergeLines", () => {
  it("ignores a line whose id is already present (Strict Mode double-emit is a no-op)", () => {
    const a = fakeLine({ id: "1:orient" });
    const once = mergeLines([], [a]);
    const twice = mergeLines(once, [a]);
    expect(once).toHaveLength(1);
    expect(twice).toHaveLength(1);
    expect(twice).toBe(once); // same reference — no needless re-render
  });
  it("appends genuinely new lines in order", () => {
    const out = mergeLines([fakeLine({ id: "1:a" })], [fakeLine({ id: "1:b" }), fakeLine({ id: "2:c" })]);
    expect(out.map((l) => l.id)).toEqual(["1:a", "1:b", "2:c"]);
  });
});

describe("truncateLines", () => {
  it("removes exactly the lines for the undone plies", () => {
    const log = [1, 2, 3, 4].map((n) => fakeLine({ id: `${n}:orient`, plyIndex: n }));
    expect(truncateLines(log, 2).map((l) => l.plyIndex)).toEqual([1, 2]);
  });
});

describe("admit", () => {
  const recent: CompanionLine[] = [];
  it("lets move records through at every setting", () => {
    const rec = fakeLine({ speaker: "you", kind: "your_move", priority: 2 });
    expect(admit(rec, { chattiness: "quiet", recent })).toBe(true);
  });
  it("keeps urgent lines even at Quiet — quiet means don't narrate, not don't warn", () => {
    expect(admit(fakeLine({ priority: 0 }), { chattiness: "quiet", recent })).toBe(true);
  });
  it("drops normal and colour lines at Quiet", () => {
    expect(admit(fakeLine({ priority: 1 }), { chattiness: "quiet", recent })).toBe(false);
    expect(admit(fakeLine({ priority: 2 }), { chattiness: "normal", recent })).toBe(false);
    expect(admit(fakeLine({ priority: 2 }), { chattiness: "chatty", recent })).toBe(true);
  });
  it("suppresses a repeat of the same dedupeKey inside the window", () => {
    const prior = [fakeLine({ id: "a", dedupeKey: "danger" })];
    expect(admit(fakeLine({ id: "b", dedupeKey: "danger" }), { chattiness: "chatty", recent: prior })).toBe(false);
  });
  it("lets the same dedupeKey back once it falls out of the window", () => {
    // Spread over separate plies so the per-ply budget isn't what rejects it.
    const prior = [fakeLine({ id: "a", plyIndex: 1, dedupeKey: "danger" }), ...Array.from({ length: 6 }, (_, i) => fakeLine({ id: `f${i}`, plyIndex: i + 2 }))];
    expect(admit(fakeLine({ id: "b", plyIndex: 9, dedupeKey: "danger" }), { chattiness: "chatty", recent: prior })).toBe(true);
  });
  it("enforces the per-ply budget but never on urgent lines", () => {
    const two = [fakeLine({ id: "a", plyIndex: 4 }), fakeLine({ id: "b", plyIndex: 4 })];
    expect(admit(fakeLine({ id: "c", plyIndex: 4, priority: 1 }), { chattiness: "normal", recent: two })).toBe(false);
    expect(admit(fakeLine({ id: "c", plyIndex: 4, priority: 0 }), { chattiness: "normal", recent: two })).toBe(true);
  });
  it("admitAll accounts for the ones it has already let through", () => {
    const batch = [1, 2, 3].map((n) => fakeLine({ id: `p${n}`, plyIndex: 7, priority: 1 }));
    expect(admitAll(batch, { chattiness: "normal", recent: [] })).toHaveLength(2); // budget of 2
  });
});

describe("beats", () => {
  it("turns a user move into a silent transcript line that can jump the board", () => {
    const [rec] = eventToLines({ t: "user_move", plyIndex: 1, ply: ply("e4"), tags: [] }, ctx);
    expect(rec).toMatchObject({ speaker: "you", kind: "your_move", san: "e4", priority: 2 });
    expect(rec.actions?.[0]).toMatchObject({ kind: "jump", index: 0 });
  });

  it("gives a blunder an urgent verdict, and leaves the take-back to the stop-down", () => {
    const lines = eventToLines(
      { t: "user_judged", ...J, plyIndex: 3, message: msg({ kind: "warn", headline: "That hangs the knight.", severity: "blunder", body: "c3 takes it." }), judgement: null, winPct: 30, deltaPct: -30, tags: [], pause: true, stepping: false },
      ctx,
    );
    const kinds = lines.map((l) => l.kind);
    expect(kinds).toContain("verdict_bad");
    expect(lines.find((l) => l.kind === "verdict_bad")!.priority).toBe(0);
    // The stop-down panel owns the choice now. A bubble here would strand dead
    // buttons in the transcript once play resumes.
    expect(kinds).not.toContain("pause_offer");
    expect(lines.every((l) => !l.actions?.some((a) => a.kind === "takeback"))).toBe(true);
  });

  it("still offers Continue in Step mode, which is not a stop-down", () => {
    const lines = eventToLines(
      { t: "user_judged", ...J, plyIndex: 3, message: msg({ kind: "note", headline: "Fine." }), judgement: null, winPct: 50, deltaPct: 0, tags: [], pause: false, stepping: true },
      ctx,
    );
    expect(lines.find((l) => l.kind === "step_continue")!.actions!.map((a) => a.kind)).toEqual(["continue"]);
  });

  it("remembers a mistake you keep making", () => {
    const recurring: MistakeEntry[] = [{ tag: "hangs_piece", square: "e5", count: 2, lastSeen: "", sample: "Nxe5" }];
    const lines = eventToLines(
      { t: "user_judged", ...J, plyIndex: 5, message: msg({ kind: "warn", headline: "Hanging.", tag: "hangs_piece" }), judgement: null, winPct: 40, deltaPct: -5, tags: [], pause: false, stepping: false },
      { ...ctx, recurring },
    );
    const repeat = lines.find((l) => l.kind === "repeat_mistake")!;
    expect(repeat.text).toMatch(/Third/);
    expect(repeat.more).toMatch(/e5/);
    expect(repeat.priority).toBe(0);
  });

  it("greets with what she remembers", () => {
    const recurring: MistakeEntry[] = [{ tag: "hangs_piece", square: "f7", count: 3, lastSeen: "", sample: "Bxf7" }];
    const [greet] = eventToLines({ t: "game_start" }, { ...ctx, recurring });
    expect(greet.kind).toBe("greeting");
    expect(greet.text).toMatch(/f7/);
    expect(greet.plyIndex).toBe(0);
  });

  it("shows a long line in full rather than truncating it", () => {
    const long = "This explanation goes on and on and on and will never fit inside a single short line at all";
    const [l] = eventToLines(
      { t: "user_judged", ...J, plyIndex: 2, message: msg({ headline: long }), judgement: null, winPct: null, deltaPct: null, tags: [], pause: false, stepping: false },
      ctx,
    );
    expect(l.text).toBe(long);
  });

  it("offers Continue in step pacing", () => {
    const lines = eventToLines(
      { t: "user_judged", ...J, plyIndex: 2, message: msg(), judgement: null, winPct: null, deltaPct: null, tags: [], pause: false, stepping: true },
      ctx,
    );
    const step = lines.find((l) => l.kind === "step_continue")!;
    expect(step.actions![0].kind).toBe("continue");
  });

  it("emits stable ids so the same moment can't be logged twice", () => {
    const e: TrainEvent = { t: "user_move", plyIndex: 9, ply: ply("Nf3"), tags: [] };
    expect(eventToLines(e, ctx)[0].id).toBe(eventToLines(e, ctx)[0].id);
  });
});

describe("anticipate", () => {
  const after = (moves: string[]) => {
    const g = new Chess();
    for (const m of moves) g.move(m);
    return g.fen();
  };

  it("spots an absolute pin", () => {
    const fen = after(["e4", "e5", "Nf3", "Nc6", "Bb5", "d6", "Nc3"]);
    expect(anticipate(fen, "c6", "black")).toMatchObject({ kind: "pin" });
  });

  it("does not cry pin when a pawn still blocks the line", () => {
    const fen = after(["e4", "e5", "Nf3", "Nc6", "Bb5"]); // d7 pawn still home
    expect(anticipate(fen, "c6", "black")?.kind).not.toBe("pin");
  });

  it("spots the only defender of an attacked piece", () => {
    expect(anticipate("4k3/r7/8/8/8/8/2N5/R3K3 w - - 0 1", "c2", "white")).toMatchObject({ kind: "only_defender" });
  });

  it("spots a piece with nowhere safe to go, discounting itself as a defender", () => {
    expect(anticipate("4k3/8/8/8/p7/3p4/8/N6K w - - 0 1", "a1", "white")).toMatchObject({ kind: "all_covered" });
  });

  it("stays quiet when there is nothing to say", () => {
    expect(anticipate(after(["e4", "e5", "Nf3"]), "b8", "black")).toBeNull();
  });

  it("never comments on the king or on the opponent's pieces", () => {
    const fen = after(["e4", "e5"]);
    expect(anticipate(fen, "e1", "white")).toBeNull();
    expect(anticipate(fen, "e5", "white")).toBeNull();
  });
});

describe("reduce (the conversation log)", () => {
  const act = (e: TrainEvent, chattiness: "quiet" | "normal" | "chatty" = "chatty") => ({ e, ctx, chattiness });

  it("is idempotent — replaying the same event changes nothing", () => {
    const e: TrainEvent = { t: "user_move", plyIndex: 1, ply: ply("e4"), tags: [] };
    const once = reduce({ lines: [] }, act(e));
    const twice = reduce(once, act(e));
    expect(once.lines).toHaveLength(1);
    expect(twice).toBe(once);
  });

  it("edits the bot's comment in place when the engine refines it", () => {
    let s = reduce({ lines: [] }, act({ t: "bot_move", plyIndex: 2, ply: ply("e5", false), coach: msg({ kind: "book", headline: "They played e5." }), tags: [], ideas: [], think: null, fenAfter: new Chess().fen() }));
    const before = s.lines.filter((l) => l.speaker === "caissa").length;
    s = reduce(s, act({ t: "bot_coach_refresh", plyIndex: 2, coach: msg({ kind: "book", headline: "They played e5. Nf3 hits it." }) }));
    const after = s.lines.filter((l) => l.speaker === "caissa");
    expect(after).toHaveLength(before); // edited, not appended
    expect(after.some((l) => l.text.includes("Nf3 hits it"))).toBe(true);
  });

  it("forgets the lines for plies you take back", () => {
    let s = reduce({ lines: [] }, act({ t: "user_move", plyIndex: 1, ply: ply("e4"), tags: [] }));
    s = reduce(s, act({ t: "bot_move", plyIndex: 2, ply: ply("e5", false), coach: null, tags: [], ideas: [], think: null, fenAfter: new Chess().fen() }));
    expect(s.lines).toHaveLength(2);
    s = reduce(s, act({ t: "truncate", toPlyIndex: 0 }));
    expect(s.lines).toHaveLength(0);
  });

  it("clears on reset", () => {
    const s = reduce({ lines: [fakeLine()] }, act({ t: "reset" }));
    expect(s.lines).toHaveLength(0);
  });
});

