// The coach's voice: turns facts (annotations, setup, tags, engine verdict)
// into one message per move. Layering for the user's move:
//   authored annotation → setup order rule → top negative tag → engine-only.
// For the opponent's move: authored reply → generated punish card → book note.

import { Chess, type Square } from "chess.js";
import type { IdeaCard, OpeningSpec } from "@/content/spec";
import type { MergedBook } from "@/lib/book/merged";
import { epd } from "@/lib/book/key";
import type { SetupProgress } from "@/lib/setup/progress";
import type { MoveJudgement, Severity } from "./classify";
import { PIECE_NAME, VALUE, extractFeatures, type MoveInfo, type PlyRecord } from "./features";
import { NEGATIVE_TAGS, topNegativeTag, topTag, type MoveTag } from "./tags";
import { templateThey, templateYou, type Bucket, type Slots } from "./templates";

export type CoachKind = "praise" | "note" | "warn" | "punish" | "book" | "idea";
export type CoachSource = "authored" | "setup" | "idea" | "tag" | "engine" | "book";

export interface CoachMessage {
  kind: CoachKind;
  headline: string;
  body: string;
  lookFor?: string;
  /** Revealed only when the user asks for a hint. */
  hint?: string;
  bestSan?: string | null;
  severity?: Severity;
  source: CoachSource;
  /** Offer a takeback before the bot replies. */
  pause: boolean;
  tag?: MoveTag;
}

export type Verbosity = "verbose" | "normal" | "terse";

function bucketOf(sev: Severity | undefined): Bucket {
  if (!sev) return "meh";
  if (sev === "blunder" || sev === "mistake") return "bad";
  if (sev === "inaccuracy") return "meh";
  return "good";
}

function sanOf(fen: string, uci: string | null | undefined): string | null {
  if (!uci) return null;
  try {
    return new Chess(fen).move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] as never }).san;
  } catch {
    return null;
  }
}

/** Fill template slots from the position after the move. */
function slotsFor(fenAfter: string, move: MoveInfo, history: PlyRecord[], bestSan: string | null): Slots {
  const f = extractFeatures(fenAfter, [...history, { san: move.san, uci: move.uci, color: move.color }]);
  const mine = f[move.color];
  const worst = [...mine.hanging].sort((a, b) => VALUE[b.piece] - VALUE[a.piece])[0];
  let attacker: string | undefined;
  if (worst) {
    const g = new Chess(fenAfter);
    const opp = move.color === "white" ? "b" : "w";
    const sq = g.attackers(worst.square as Square, opp)[0];
    if (sq) attacker = PIECE_NAME[g.get(sq)!.type];
  }
  return {
    piece: PIECE_NAME[move.piece],
    from: move.from,
    to: move.to,
    hangingPiece: worst ? PIECE_NAME[worst.piece] : undefined,
    hangingSquare: worst?.square,
    attacker,
    bestSan,
    capturedPiece: move.captured ? PIECE_NAME[move.captured] : undefined,
  };
}

export interface UserMoveContext {
  spec: OpeningSpec;
  book: MergedBook;
  fenBefore: string;
  fenAfter: string;
  move: MoveInfo;
  /** History BEFORE this move. */
  history: PlyRecord[];
  tags: MoveTag[];
  judgement: MoveJudgement | null;
  bestUci: string | null;
  setupBefore: SetupProgress;
  setupAfter: SetupProgress;
  verbosity: Verbosity;
  inOpening: boolean;
}

export function explainUserMove(ctx: UserMoveContext): CoachMessage {
  const { spec, fenBefore, fenAfter, move, history, tags, judgement, verbosity } = ctx;
  const sev = judgement?.severity;
  const bucket = bucketOf(sev);
  const bestSan = ctx.bestUci && ctx.bestUci !== move.uci ? sanOf(fenBefore, ctx.bestUci) : null;
  const slots = slotsFor(fenAfter, move, history, bestSan);
  const a = spec.annotations[epd(fenBefore)];
  const negative = topNegativeTag(tags);
  const bad = bucket === "bad";
  const trim = (s: string) => (verbosity === "terse" ? s.split(/(?<=\.)\s/)[0] : s);

  // 1) Authored knowledge about exactly this move.
  const authoredMistake = a?.mistakes?.find((m) => m.san === move.san);
  if (authoredMistake) {
    return {
      kind: "warn",
      headline: `${move.san}? The book warns against that.`,
      body: authoredMistake.why,
      bestSan: a?.yourMove?.san ?? bestSan,
      lookFor: a?.yourMove ? `The book move is ${a.yourMove.san}.` : undefined,
      severity: sev,
      source: "authored",
      pause: true,
      tag: negative ?? undefined,
    };
  }
  if (a?.yourMove && a.yourMove.san === move.san) {
    return { kind: "praise", headline: `${move.san}. Book move.`, body: trim(a.yourMove.why), severity: sev, source: "authored", pause: false };
  }
  // The opening's OWN rule outranks its move list. Playing e3 before Bf4 is a
  // real London error; playing Bf4 before Nf3 is not, even though the authored
  // line happens to start with Nf3. Checking the order rule first is what stops
  // a correct transposition being reported as a deviation.
  const violationNow = ctx.setupAfter.orderViolations.find((v) => !ctx.setupBefore.orderViolations.some((o) => o.before === v.before && o.after === v.after));
  if (violationNow) {
    return {
      kind: "warn",
      headline: `${violationNow.after} before ${violationNow.before} — wrong order.`,
      body: violationNow.why,
      severity: sev,
      source: "setup",
      pause: bad,
      bestSan,
    };
  }

  // A move that completes one of the setup's own goals is on plan, whatever move
  // order the book was written in.
  if (!bad && !negative && ctx.setupAfter.met > ctx.setupBefore.met) {
    const goal = ctx.setupAfter.pieces.find((g) => g.done && !ctx.setupBefore.pieces.find((q) => q.piece === g.piece && q.squares.join() === g.squares.join())?.done);
    const why = goal ? spec.setup.pieces.find((g) => g.piece === goal.piece && g.squares.join() === goal.squares.join())?.why : undefined;
    return {
      kind: "praise",
      headline: `${move.san}. On plan.`,
      body: trim(why ?? "Another piece of the structure in place."),
      lookFor: a?.yourMove && a.yourMove.san !== move.san ? `The book's move order here is ${a.yourMove.san}, but this reaches the same setup.` : undefined,
      severity: sev,
      source: "setup",
      pause: false,
    };
  }

  if (a?.yourMove && a.yourMove.san !== move.san) {
    if (!bad && !negative) {
      return {
        kind: "note",
        headline: `${move.san} works too.`,
        body: trim(`The book move here is ${a.yourMove.san}: ${a.yourMove.why}`),
        bestSan: a.yourMove.san,
        severity: sev,
        source: "authored",
        pause: false,
      };
    }
    const tpl = negative ? templateYou(negative, bucket, slots) : null;
    return {
      kind: "warn",
      headline: tpl?.headline ?? `${move.san} steps off the plan.`,
      body: trim(tpl ? `${tpl.why} The book move was ${a.yourMove.san}: ${a.yourMove.why}` : `The book move was ${a.yourMove.san}: ${a.yourMove.why}`),
      lookFor: tpl?.lookFor,
      bestSan: bestSan ?? a.yourMove.san,
      severity: sev,
      source: "authored",
      pause: bad,
      tag: negative ?? undefined,
    };
  }

  // 3) Feature tag with the engine's verdict.
  if (negative && (bad || bucket === "meh" || verbosity === "verbose")) {
    const tpl = templateYou(negative, bucket, slots);
    return { kind: bad ? "warn" : "note", headline: tpl.headline, body: trim(tpl.why), lookFor: tpl.lookFor, bestSan, severity: sev, source: "tag", pause: bad, tag: negative };
  }

  // 4) Engine says it's bad but no tag explains why.
  if (bad) {
    return {
      kind: "warn",
      headline: sev === "blunder" ? "That one is expensive." : "That costs you.",
      body: bestSan ? `The engine much prefers ${bestSan}. Look at what it attacks or defends that ${move.san} doesn't.` : "The engine dislikes this move.",
      bestSan,
      severity: sev,
      source: "engine",
      pause: true,
    };
  }

  // 5) Good move: praise the best positive tag, or a setup milestone.
  const positive = topTag(tags.filter((t) => !NEGATIVE_TAGS.has(t) && t !== "captures" && t !== "common_reply"));
  if (ctx.setupAfter.met > ctx.setupBefore.met && ctx.setupAfter.total) {
    const goal = ctx.setupAfter.pieces.find((p) => p.done && !ctx.setupBefore.pieces.find((q) => q.piece === p.piece && q.squares.join() === p.squares.join())?.done);
    return {
      kind: "praise",
      headline: goal ? `${PIECE_NAME[goal.piece.toLowerCase() as never] ?? "Piece"} where it belongs.` : `Setup: ${ctx.setupAfter.met} of ${ctx.setupAfter.total}.`,
      body: trim(goal ? spec.setup.pieces.find((p) => p.piece === goal.piece && p.squares.join() === goal.squares.join())?.why ?? "Part of your setup." : "Another piece of the structure in place."),
      severity: sev,
      source: "setup",
      pause: false,
    };
  }
  if (positive) {
    const tpl = templateYou(positive, "good", slots);
    return { kind: "praise", headline: tpl.headline, body: verbosity === "terse" ? "" : tpl.why, severity: sev, source: "tag", pause: false, tag: positive };
  }
  return { kind: "note", headline: sev === "best" ? "Best move." : "Fine.", body: "", severity: sev, source: "engine", pause: false };
}

export interface BotMoveContext {
  spec: OpeningSpec;
  book: MergedBook;
  fenBefore: string;
  fenAfter: string;
  move: MoveInfo;
  history: PlyRecord[];
  tags: MoveTag[];
  /** Baked/engine loss of the bot's move vs best, if known. */
  loss: number | null;
  /** Best reply for the user in the resulting position, if known. */
  bestReplyUci: string | null;
  freq?: number;
  inOpening: boolean;
  /** The move is on the opening's defining line or an authored model game. */
  bookLine?: boolean;
}

const pct = (f: number) => `${Math.round(f * 100)}%`;

export function explainBotMove(ctx: BotMoveContext): CoachMessage | null {
  const { spec, fenBefore, fenAfter, move, history, tags, loss } = ctx;
  const a = spec.annotations[epd(fenBefore)];
  const bestReply = sanOf(fenAfter, ctx.bestReplyUci);
  const freqText = ctx.freq !== undefined ? `Played in ${pct(ctx.freq)} of games at your level.` : "";

  const authored = a?.replies?.find((r) => r.san === move.san);
  if (authored) {
    if (authored.verdict !== "good") {
      return {
        kind: "punish",
        headline: `${move.san}? ${authored.verdict === "bad" ? "That's a mistake." : "Questionable."}`,
        body: [authored.why, freqText].filter(Boolean).join(" "),
        lookFor: "Work out how to punish it before you move.",
        hint: authored.howToAnswer,
        bestSan: authored.answer ?? bestReply,
        source: "authored",
        pause: false,
      };
    }
    return {
      kind: "book",
      headline: ctx.freq !== undefined ? `${move.san}. ${pct(ctx.freq)} play that here.` : `${move.san}. Straight from the book.`,
      body: [authored.why, freqText].filter(Boolean).join(" "),
      hint: authored.howToAnswer,
      bestSan: authored.answer ?? bestReply,
      source: "authored",
      pause: false,
    };
  }

  const negative = topNegativeTag(tags);
  const clearlyBad = (loss !== null && loss >= 100) || negative === "hangs_piece" || negative === "leaves_piece_hanging";
  if (negative && clearlyBad) {
    const slots = slotsFor(fenAfter, move, history, bestReply);
    const tpl = templateThey(negative, slots);
    if (tpl) {
      return {
        kind: "punish",
        headline: tpl.headline,
        body: [tpl.why, freqText].filter(Boolean).join(" "),
        lookFor: tpl.lookFor,
        hint: bestReply ? `${bestReply} is the engine's answer.` : undefined,
        bestSan: bestReply,
        source: "tag",
        pause: false,
        tag: negative,
      };
    }
  }

  if (ctx.freq !== undefined) {
    return { kind: "book", headline: `${move.san}. ${pct(ctx.freq)} play that at your level.`, body: freqText, hint: bestReply ? `${bestReply} is a good reply.` : undefined, bestSan: bestReply, source: "book", pause: false };
  }
  const positive = topTag(tags.filter((t) => !NEGATIVE_TAGS.has(t)));
  const body = ctx.bookLine
    ? "The main line — exactly what this opening expects. Keep building."
    : ctx.inOpening
    ? "Not in the book — they're improvising. Stick to your setup."
    : positive === "captures" || positive === "wins_material"
      ? "A capture. Check what you can take back, and what's attacked now."
      : positive === "gives_check"
        ? "Check. Deal with it first; then look for what changed."
        : "";
  const headline = ctx.bookLine ? `${move.san}. The main line.` : ctx.inOpening ? `${move.san}. They're improvising now.` : `${move.san}.`;
  return { kind: "book", headline, body, hint: bestReply ? `${bestReply} is a good reply.` : undefined, bestSan: bestReply, source: "book", pause: false };
}

/** Idea cards whose trigger fires on the opponent's move (or on leaving book). */
export function firedIdeas(spec: OpeningSpec, fenAfter: string, move: MoveInfo | null, tags: MoveTag[], bookJustEnded: boolean): IdeaCard[] {
  const g = new Chess(fenAfter);
  const oppColor = spec.side === "white" ? "b" : "w";
  const out: IdeaCard[] = [];
  for (const idea of spec.ideas) {
    const t = idea.trigger;
    if (!t) continue;
    switch (t.kind) {
      case "book_end":
        if (bookJustEnded) out.push(idea);
        break;
      case "opponent_san":
        if (move && t.sans.includes(move.san.replace(/[+#]/g, ""))) out.push(idea);
        break;
      case "opponent_piece_on":
        if (
          move &&
          t.squares.some((sq) => {
            const p = g.get(sq as Square);
            return p && p.color === oppColor && p.type.toUpperCase() === t.piece && sq === move.to;
          })
        )
          out.push(idea);
        break;
      case "tag":
        if (t.tags.some((x) => tags.includes(x as MoveTag))) out.push(idea);
        break;
      case "epd":
        if (t.epds.includes(epd(fenAfter))) out.push(idea);
        break;
    }
  }
  return out;
}
