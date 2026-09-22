// Before-you-move coaching: what to think about (without giving the move), a
// three-step hint ladder (plan → piece → move), and trap awareness.

import { Chess, type Square } from "chess.js";
import type { IdeaCard, OpeningSpec, Trap } from "@/content/spec";
import type { MergedBook } from "@/lib/book/merged";
import { epd } from "@/lib/book/key";
import { nextSetupHint, setupProgress, type SetupProgress } from "@/lib/setup/progress";
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

/** If the engine's move would break an order rule, hint the rule's own move
 *  instead. Returns null when there is nothing to correct. */
function obeyingOrderRules(ctx: PromptContext, bestUci: string): HintStep | null {
  const { spec, fen, setup, history = [] } = ctx;
  if (!spec.setup.order?.length) return null;

  const move = describeMove(fen, bestUci);
  if (!move) return null;

  let after: SetupProgress;
  try {
    const g = new Chess(fen);
    g.move({ from: move.from, to: move.to, promotion: move.uci[4] as never });
    after = setupProgress(g.fen(), spec.setup, spec.side, [...history, { san: move.san, uci: move.uci, color: spec.side }]);
  } catch {
    return null;
  }

  const broken = after.orderViolations.find((v) => !setup.orderViolations.some((o) => o.before === v.before && o.after === v.after));
  if (!broken) return null;

  // Play the move the rule was waiting for, if one of its alternatives is legal.
  const g = new Chess(fen);
  for (const alt of broken.before.split("|").map((a) => a.trim())) {
    try {
      const played = g.move(alt);
      g.undo();
      return { text: `${played.san} — ${broken.why}`, from: played.from as Square, to: played.to as Square };
    } catch {
      /* try the next alternative */
    }
  }
  // Nothing the rule wants is legal yet. A hint that names no move at all is
  // not a hint, so name the one to hold back and why.
  return { text: `Hold off on ${orMoves(broken.after)} — ${broken.why}` };
}

/** "Bf5|Bg4" is authoring syntax for alternatives, never something to show. */
const orMoves = (alts: string) => alts.split("|").map((a) => a.trim()).filter(Boolean).join(" or ");

export function moveHint(ctx: PromptContext, bestUci: string | null): HintStep | null {
  const { spec, fen, setup } = ctx;
  if (!bestUci) return { text: "The coach is still checking this position — try again in a moment." };

  // This is an opening trainer, so the book's move is the hint. It goes FIRST:
  // it cannot break its own opening's rules, and putting the rule check ahead of
  // it meant that after 1.e4 in the Scandinavian — where the book plainly says
  // ...d5 — the engine's preference for ...e6 tripped the rule and the player
  // got a refusal instead of the move.
  const booked = spec.annotations[epd(fen)]?.yourMove;
  if (booked) {
    try {
      const probe = new Chess(fen);
      const played = probe.move(booked.san);
      return { text: `${played.san} — ${booked.why}`, from: played.from as Square, to: played.to as Square };
    } catch {
      /* the authored move isn't legal here; fall through */
    }
  }

  // Off the book, the engine does not know the opening's order rules, so its
  // best move can be one the trainer would stop you for playing.
  const lawful = obeyingOrderRules(ctx, bestUci);
  if (lawful) return lawful;

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

/** Short reasons to PLAY a move. The verdict templates read as post-mortems
 *  ("Material in hand wins itself: trade pieces... let the endgame do the work"),
 *  which is absurd as the reason for a capture on move five. */
const HINT_REASON: Partial<Record<string, (m: MoveInfo) => string>> = {
  wins_material: (m) => `it wins ${m.captured ? PIECE_NAME[m.captured] : "material"}.`,
  rescues_piece: () => "it saves the piece that was under attack.",
  castles: () => "it tucks the king away and connects the rooks.",
  develops: (m) => `it brings the ${PIECE_NAME[m.piece]} into the game.`,
  claims_centre: () => "it takes space in the centre.",
  gives_check: () => "it comes with check.",
  captures: () => "it trades on your terms.",
};

/** What the move does, from the position itself — works outside the book too. */
function tagWhy(fen: string, move: MoveInfo, history: PlyRecord[]): string | null {
  try {
    const g = new Chess(fen);
    g.move({ from: move.from, to: move.to, promotion: move.uci[4] as never });
    const tags = tagMove(fen, g.fen(), move, history);
    const positive = topTag(tags.filter((t) => !NEGATIVE_TAGS.has(t) && t !== "common_reply"));
    if (!positive) return null;
    const short = HINT_REASON[positive];
    if (short) return short(move);
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
