// Events in, Caissa's lines out. Pure: no React, no engine calls, no clock — so
// a whole game's worth of conversation can be asserted in a unit test.

import type { OpeningSpec } from "@/content/spec";
import type { CoachMessage } from "@/lib/coach/explain";
import { describeRecurring, type MistakeEntry } from "@/lib/progress/mistakes";
import type { Session } from "@/lib/progress/sessions";
import { missingGoals } from "@/lib/setup/plan";
import type { SetupProgress } from "@/lib/setup/progress";
import { clearedBy, orMoves, RETIRE_AFTER, type Slip } from "@/lib/progress/slips";
import { anticipate } from "./anticipate";
import { recall } from "./recall";
import type { TrainEvent } from "./events";
import { type BeatKind, type CompanionLine, type Priority, type Tone } from "./types";

export interface BeatContext {
  spec: OpeningSpec;
  /** What she remembers about you in this opening. */
  recurring: MistakeEntry[];
  lastSession: Session | null;
  /** Slips still worth raising this game (see slips.ts `activeSlips`). */
  slips?: Slip[];
}

interface Draft {
  kind: BeatKind;
  text: string;
  more?: string;
  priority: Priority;
  tone?: Tone;
  key?: string;
  dedupeKey?: string;
  actions?: CompanionLine["actions"];
  deco?: CompanionLine["deco"];
  grade?: CompanionLine["grade"];
  detail?: CompanionLine["detail"];
}

/** Her lines. */
function caissa(plyIndex: number, d: Draft): CompanionLine {
  return {
    id: `${plyIndex}:${d.kind}${d.key ? `:${d.key}` : ""}`,
    plyIndex,
    speaker: "caissa",
    kind: d.kind,
    text: d.text,
    more: d.more,
    priority: d.priority,
    tone: d.tone,
    dedupeKey: d.dedupeKey,
    actions: d.actions,
    deco: d.deco,
    grade: d.grade,
    detail: d.detail,
  };
}

function record(plyIndex: number, speaker: "you" | "them", san: string, tone?: Tone): CompanionLine {
  return {
    id: `${plyIndex}:${speaker === "you" ? "your_move" : "their_move"}`,
    plyIndex,
    speaker,
    kind: speaker === "you" ? "your_move" : "their_move",
    text: san,
    san,
    priority: 2,
    tone,
    actions: [{ kind: "jump", label: san, index: plyIndex - 1 }],
  };
}

/** A coach message's kind maps onto her register. */
function verdictKind(m: CoachMessage): BeatKind {
  if (m.kind === "warn") return "verdict_bad";
  if (m.kind === "praise") return "verdict_good";
  return "verdict_note";
}

/** A verdict on YOUR OWN move is priority 1 whatever its tone. Praise used to sit
 *  at 2, which the Normal ceiling drops, so the coach spoke when you erred and
 *  went silent when you got it right — the one feedback loop a trainer must have.
 *  Idle colour and remarks about the opponent still sit at 2. */
function verdictPriority(m: CoachMessage): Priority {
  if (m.severity === "blunder" || m.severity === "mistake") return 0;
  return 1;
}

const toneOf = (m: CoachMessage): Tone | undefined =>
  m.kind === "warn" ? "warn" : m.kind === "praise" ? "praise" : m.kind === "punish" ? "punish" : m.kind === "book" ? "book" : "note";

/** The long text under a bubble: the body plus whatever to look for. */
function moreOf(m: CoachMessage): string | undefined {
  return [m.body, m.lookFor].filter(Boolean).join(" ") || undefined;
}

export function eventToLines(e: TrainEvent, ctx: BeatContext): CompanionLine[] {
  switch (e.t) {
    case "game_start":
      return [greeting(ctx)];

    case "user_move":
      return [record(e.plyIndex, "you", e.ply.san)];

    case "user_judged": {
      const out: CompanionLine[] = [];
      const m = e.message;
      out.push(
        caissa(e.plyIndex, {
          kind: verdictKind(m),
          text: m.headline,
          more: moreOf(m),
          priority: verdictPriority(m),
          tone: toneOf(m),
          grade: m.grade,
          detail: m.detail,
        }),
      );

      // A slip from an earlier game, put right this time.
      const fixed = clearedBy(ctx.slips ?? [], ctx.spec.side, {
        fenBefore: e.fenBefore,
        fenAfter: e.fenAfter,
        san: e.move.san,
        from: e.move.from,
        historyBefore: e.historyBefore,
        pause: e.pause,
        source: m.source,
        why: "",
      })[0];
      if (fixed) {
        const retiring = fixed.cleared + 1 >= RETIRE_AFTER;
        out.push(
          caissa(e.plyIndex, {
            kind: "remembered",
            text: fixed.kind === "order" ? `Remembered — ${e.move.san} first this time.` : `Remembered — not ${fixed.san} this time.`,
            more: `${fixed.why}${retiring ? " That's twice running, so I'll stop reminding you." : ""}`,
            priority: 1,
            tone: "praise",
            key: fixed.key.slice(0, 40),
          }),
        );
      }

      // Something she's watched you do before.
      const repeat = m.tag ? ctx.recurring.find((r) => r.tag === m.tag) : undefined;
      if (repeat && m.kind === "warn") {
        out.push(
          caissa(e.plyIndex, {
            kind: "repeat_mistake",
            text: `${ordinal(repeat.count + 1)} game running.`,
            more: describeRecurring({ ...repeat, count: repeat.count + 1 }),
            priority: 0,
            tone: "warn",
            key: m.tag,
          }),
        );
      }

      if (e.deltaPct !== null && e.deltaPct <= -18) {
        out.push(caissa(e.plyIndex, { kind: "swing_down", text: "That one hurt.", priority: 1, tone: "warn", dedupeKey: "swing" }));
      }

      // A pause no longer posts a bubble: the stop-down panel replaces the
      // conversation while the game is held, and owns the take-back. Leaving a
      // "Want that one back?" line here would strand dead buttons in the
      // transcript once play resumes.
      if (!e.pause && e.stepping) {
        out.push(
          caissa(e.plyIndex, {
            kind: "step_continue",
            text: "Ready?",
            priority: 1,
            actions: [{ kind: "continue", label: "Continue" }],
          }),
        );
      }
      return out;
    }

    case "bot_move": {
      const out: CompanionLine[] = [record(e.plyIndex, "them", e.ply.san)];
      const m = e.coach;
      if (m) {
        out.push(
          caissa(e.plyIndex, {
            kind: m.kind === "punish" ? "their_blunder" : "orient",
            text: m.headline,
            more: moreOf(m),
            priority: m.kind === "punish" ? 0 : 1,
            tone: toneOf(m),
            dedupeKey: m.kind === "book" ? "book-note" : undefined,
          }),
        );
      }
      for (const idea of e.ideas.slice(0, 1)) {
        out.push(
          caissa(e.plyIndex, {
            kind: "orient",
            text: idea.oneLiner,
            more: idea.why,
            priority: 2,
            tone: "note",
            key: idea.id,
          }),
        );
      }
      if (e.think?.trap) {
        const t = e.think.trap;
        out.push(
          caissa(e.plyIndex, {
            kind: t.forYou ? "trap_for_them" : "trap_ahead",
            text: t.forYou ? `${t.trap.name} is on. Look for it.` : `Careful — this is the ${t.trap.name}.`,
            more: `${t.trap.tell} ${t.trap.why}`,
            priority: 0,
            tone: t.forYou ? "praise" : "warn",
            key: t.trap.name.slice(0, 24),
          }),
        );
      }
      const danger = e.think?.facts[0];
      if (danger) {
        out.push(
          caissa(e.plyIndex, {
            kind: "hanging_now",
            text: danger,
            priority: /hanging|attacked|check/i.test(danger) ? 0 : 1,
            tone: "warn",
            dedupeKey: "danger",
          }),
        );
      }
      return out;
    }

    case "bot_coach_refresh":
      // Edits the line already on screen — see mergeLines/replaceLine.
      return [
        caissa(e.plyIndex, {
          kind: e.coach.kind === "punish" ? "their_blunder" : "orient",
          text: e.coach.headline,
          more: moreOf(e.coach),
          priority: e.coach.kind === "punish" ? 0 : 1,
          tone: toneOf(e.coach),
        }),
      ];

    case "book_ended": {
      // Jason's London game: an offbeat second move by the opponent produced
      // "that's the end of the book", and he could not tell whether he had done
      // something wrong. Who left the book is the whole answer, so say it.
      const them = e.by === "them";
      // When THEY leave theory, the useful answer is almost always "that changes
      // nothing" — below 1200 it happens in nearly every game. Concrete threats
      // are caught separately by the threat scan, which speaks for itself.
      const text = them ? `${e.san}. Doesn't change your plan.` : `${e.san} takes us off book.`;
      const why = them
        ? `${e.san} isn't a move this book lists, which below 1200 is the norm rather than the exception. Your setup doesn't depend on what they choose: keep completing it.`
        : e.bookMove
          ? `The line here was ${e.bookMove}. ${e.san} isn't necessarily worse — it just isn't the move this book follows, so from here you're on your own.`
          : `From here you're past what the book covers.`;
      // The full middlegame plan used to be the whole tap-to-reveal and read as a
      // wall. Lead with the situation, then the plan's opening sentence.
      const plan = ctx.spec.middlegamePlan.split(/(?<=\.)\s/)[0];
      return [
        caissa(e.plyIndex, {
          kind: "book_end",
          text,
          more: `${why} ${plan}`,
          priority: them ? 2 : 1,
          tone: "book",
          dedupeKey: "book-boundary",
        }),
      ];
    }

    case "book_resumed":
      return [
        caissa(e.plyIndex, {
          kind: "book_resumed",
          text: "We're back in the book.",
          more: "The game transposed into a line this opening does cover, so the guidance picks up again.",
          priority: 1,
          tone: "book",
          dedupeKey: "book-boundary",
        }),
      ];

    case "hint":
      return [
        caissa(e.plyIndex, {
          kind: "hint",
          text: e.text,
          priority: 0,
          tone: "note",
          deco: e.from && e.to ? { arrow: { from: e.from, to: e.to } } : undefined,
        }),
      ];

    case "pickup": {
      const out: CompanionLine[] = [];
      // Memory first: it is about this exact moment in your own games.
      const r = e.history ? recall(e.fen, e.square, e.history, ctx.spec, ctx.slips ?? []) : null;
      if (r) {
        out.push(
          caissa(e.plyIndex, {
            kind: "recall",
            text: r.text,
            more: r.more,
            priority: 0,
            tone: "warn",
            key: r.slip.key.slice(0, 40),
            deco: r.deco,
          }),
        );
      }
      const a = anticipate(e.fen, e.square, ctx.spec.side);
      if (!a) return out;
      return [
        ...out,
        caissa(e.plyIndex, {
          kind: a.kind === "pin" ? "anticipation_pin" : a.kind === "only_defender" ? "anticipation_only_defender" : "anticipation_all_covered",
          text: a.text,
          more: a.more,
          priority: 0,
          tone: "warn",
          key: e.square,
          deco: a.deco,
          dedupeKey: `anticipate:${a.kind}`,
        }),
      ];
    }

    case "game_over": {
      const { info } = e;
      const text = info.result === "win" ? "That's the game. Nicely done." : info.result === "loss" ? "He got there first." : "Drawn.";
      const report = info.setup ? setupReport(info.setup) : undefined;
      const caveat = info.takebacks || info.hintsUsed ? "Not rated — you used take-backs or hints, which is what they're for." : undefined;
      return [
        caissa(e.info.history.length, {
          kind: "game_over",
          text,
          more: [report, caveat].filter(Boolean).join(" ") || undefined,
          priority: 0,
          tone: info.result === "win" ? "praise" : "note",
          actions: [
            { kind: "review", label: "Walk me through it" },
            { kind: "newgame", label: "Again" },
          ],
        }),
      ];
    }

    case "truncate":
    case "reset":
      return [];
  }
}

function greeting(ctx: BeatContext): CompanionLine {
  const worst = ctx.recurring[0];
  const last = ctx.lastSession;
  let text = `${ctx.spec.name}. Let's go.`;
  let more: string | undefined;

  // The most recent slip is the most useful thing to walk in with.
  const slip = [...(ctx.slips ?? [])].sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))[0];
  if (slip) {
    text =
      slip.kind === "order" && slip.rule
        ? `${ctx.spec.name} again. ${orMoves(slip.rule.before)} before ${orMoves(slip.rule.after)} this time.`
        : `${ctx.spec.name} again. Last time ${slip.san} cost you.`;
    more = slip.better ? `${slip.why} The move was ${slip.better}.` : slip.why;
  } else if (worst && worst.count >= 2) {
    text = `${ctx.spec.name} again. Watch ${worst.square} this time.`;
    more = describeRecurring(worst);
  } else if (last && last.openingId === ctx.spec.id) {
    text = last.result === "win" ? `${ctx.spec.name} again — you won the last one.` : `${ctx.spec.name} again. Let's get this one.`;
    more = last.worst ? `Last game your worst moment was ${last.worst.san} on move ${last.worst.moveNo}.` : undefined;
  }

  return caissa(0, { kind: "greeting", text, more, priority: 1, tone: "note" });
}

function ordinal(n: number): string {
  if (n === 2) return "Second";
  if (n === 3) return "Third";
  if (n === 4) return "Fourth";
  return `${n}th`;
}

/** The post-game line that actually builds the habit: how much of the opening's
 *  own setup you completed, and what you left out. */
function setupReport(setup: SetupProgress): string {
  if (!setup.total) return "";
  const head = `You reached ${setup.met} of ${setup.total} setup goals.`;
  const broken = setup.orderViolations[0];
  const missing = missingGoals(setup);
  const parts = [head];
  if (broken) parts.push(`${broken.after} came before ${broken.before}, which is the one order rule here.`);
  if (missing.length) parts.push(`Still outstanding: ${missing.slice(0, 3).join("; ")}.`);
  return parts.join(" ");
}
