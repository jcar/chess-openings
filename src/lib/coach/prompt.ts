// Before-you-move coaching: what to think about (without giving the move), a
// three-step hint ladder (plan → piece → move), and trap awareness.

import { Chess, type Square } from "chess.js";
import type { IdeaCard, OpeningSpec, Trap } from "@/content/spec";
import type { MergedBook } from "@/lib/book/merged";
import { epd } from "@/lib/book/key";
import { nextSetupHint, type SetupProgress } from "@/lib/setup/progress";
import { describeMove, PIECE_NAME, tagMove, type MoveInfo, type PlyRecord } from "./features";
import { NEGATIVE_TAGS, topTag } from "./tags";
import { templateYou } from "./templates";
import { describeThreats, scanThreats } from "./threats";

export interface ThinkAbout {
  /** Concrete, checkable facts about the position (threats, free pieces). */
  facts: string[];
  /** The plan-level prompt: what your setup still needs, or the live idea. */
  plan: string | null;
  /** A trap whose path this position is on, if any. */
  trap: TrapAlert | null;
}

export interface TrapAlert {
  trap: Trap;
  /** Does the trap punish the user (warning) or the opponent (opportunity)? */
  forYou: boolean;
  /** How many plies until the trap's decisive move. */
  pliesAway: number;
}

/** Is the current position on the path of one of the spec's traps? */
export function trapOnPath(spec: OpeningSpec, fen: string): TrapAlert | null {
  const key = epd(fen);
  // Positions on the opening's own defining moves don't count: every trap shares
  // them, and alerting on move 2 teaches nothing. The alert starts once the
  // trap-specific branch has begun.
  const defining = new Set<string>();
  try {
    const d = new Chess();
    defining.add(epd(d.fen()));
    for (const tok of spec.firstMoves.trim().split(/\s+/)) {
      const san = tok.replace(/^\d+\.(\.\.)?/, "");
      if (!san) continue;
      d.move(san);
      defining.add(epd(d.fen()));
    }
  } catch {
    /* validator reports bad firstMoves */
  }
  for (const trap of spec.traps) {
    const g = new Chess();
    for (let i = 0; i < trap.sans.length; i++) {
      if (epd(g.fen()) === key && !defining.has(key)) {
        const pliesAway = trap.sans.length - i;
        // Only alert while the trap is still ahead (not after it has fired).
        if (pliesAway > 0) return { trap, forYou: trap.punisher === spec.side, pliesAway };
      }
      try {
        g.move(trap.sans[i]);
      } catch {
        break;
      }
    }
  }
  return null;
}

/** Idea cards relevant right now: ones with an epd trigger matching, plus the book-end card once out of book. */
export function liveIdeas(spec: OpeningSpec, fen: string, leftBook: boolean): IdeaCard[] {
  const key = epd(fen);
  return spec.ideas.filter((i) => (i.trigger?.kind === "epd" && i.trigger.epds.includes(key)) || (leftBook && i.trigger?.kind === "book_end"));
}

export interface PromptContext {
  spec: OpeningSpec;
  book: MergedBook;
  fen: string;
  setup: SetupProgress;
  leftBook: boolean;
  /** Idea cards fired by the opponent's last move. */
  firedIdeas: IdeaCard[];
  /** Moves so far, so a hint can say what the move actually does. */
  history?: PlyRecord[];
}

export function thinkAbout(ctx: PromptContext): ThinkAbout {
  const { spec, fen, setup, leftBook } = ctx;
  const facts = describeThreats(scanThreats(fen, spec.side), fen);
  const trap = trapOnPath(spec, fen);

  let plan: string | null = null;
  const fired = ctx.firedIdeas[0] ?? liveIdeas(spec, fen, leftBook)[0];
  if (fired) plan = fired.response ? `${fired.title}: ${fired.response}` : fired.oneLiner;
  else if (!leftBook) plan = nextSetupHint(setup) ?? (setup.total ? "Your setup is complete — castle if you haven't, then look for the plan." : null);
  else plan = spec.middlegamePlan.split(/(?<=\.)\s/)[0];

  return { facts: facts.slice(0, 3), plan, trap };
}

export interface HintStep {
  /** "Bf4. The signature London move: the bishop comes out before e3 locks it in." */
  text: string;
  from?: Square;
  to?: Square;
}

/**
 * The hint: the move, and why it's the move. One tap, no quiz — the
 * before-you-move prompt already does the thinking-out-loud part unasked.
 */
export function moveHint(ctx: PromptContext, bestUci: string | null): HintStep | null {
  const { spec, fen, setup } = ctx;
  if (!bestUci) return { text: "The coach is still checking this position — try again in a moment." };

  const from = bestUci.slice(0, 2) as Square;
  const to = bestUci.slice(2, 4) as Square;
  const move = describeMove(fen, bestUci);
  if (!move) return null;
  const san = move.san;

  // Most specific reason first. What the move DOES beats a general plan: "the
  // king is tucked away" explains O-O better than the opening's middlegame plan.
  const why =
    authoredWhy(spec, fen, san) ??
    setupWhy(spec, setup, move) ??
    ctx.firedIdeas[0]?.response ??
    tagWhy(fen, move, ctx.history ?? []) ??
    liveIdeas(spec, fen, ctx.leftBook)[0]?.oneLiner ??
    "";

  return { text: why ? `${san} — ${why}` : `${san}.`, from, to };
}

/** The book's own reason for this move at this position. */
function authoredWhy(spec: OpeningSpec, fen: string, san: string): string | null {
  const a = spec.annotations[epd(fen)];
  if (a?.yourMove && a.yourMove.san === san) return a.yourMove.why;
  return null;
}

/** "It's where this piece belongs in the setup." */
function setupWhy(spec: OpeningSpec, setup: SetupProgress, move: MoveInfo): string | null {
  if (move.piece === "p") {
    const pawn = setup.pawns.find((p) => p.square === move.to && !p.done);
    return pawn ? `the structure wants a pawn on ${move.to}.` : null;
  }
  const letter = move.piece.toUpperCase();
  const goal = spec.setup.pieces.find((p) => p.piece === letter && p.squares.includes(move.to));
  if (!goal) return null;
  const done = setup.pieces.find((p) => p.piece === goal.piece && p.squares.join() === goal.squares.join())?.done;
  return done ? null : goal.why ?? null;
}

/** What the move does, from the position itself — works outside the book too. */
function tagWhy(fen: string, move: MoveInfo, history: PlyRecord[]): string | null {
  try {
    const g = new Chess(fen);
    g.move({ from: move.from, to: move.to, promotion: move.uci[4] as never });
    const tags = tagMove(fen, g.fen(), move, history);
    const positive = topTag(tags.filter((t) => !NEGATIVE_TAGS.has(t) && t !== "common_reply"));
    if (!positive) return null;
    const tpl = templateYou(positive, "good", {
      piece: PIECE_NAME[move.piece],
      from: move.from,
      to: move.to,
      capturedPiece: move.captured ? PIECE_NAME[move.captured] : undefined,
    });
    return tpl.why; // the headline is a label ("Castled — king safe"); the why is the reason
  } catch {
    return null;
  }
}
