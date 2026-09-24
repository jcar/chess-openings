"use client";

// Slips: the moves that stopped a game, remembered by the position they were
// played in. The tag ledger (mistakes.ts) knows you "left a piece hanging on e5"
// in general; this knows that in THIS position, last game, you played ...e6 and
// the book wanted ...Bf5. That is specific enough to say something useful the
// next time you reach the position — before you make the same move, not after.
//
// Order-rule slips are kept by rule rather than by position, because the same
// rule can be broken from many move orders: "e3 before Bf4" is one habit whether
// it came on move two or move four.
//
// Everything here except the store is pure, so the whole remember → remind →
// retire cycle can be tested without a browser.

import type { OpeningSpec, Side } from "@/content/spec";
import { epd } from "@/lib/book/key";
import { createLocalStore } from "@/lib/adapt/store";
import { setupProgress, type PlyRecord } from "@/lib/setup/progress";

export type SlipKind = "order" | "book" | "engine";

export interface Slip {
  /** `pos:<epd>|<san>` or `order:<before>><after>`. */
  key: string;
  kind: SlipKind;
  /** The position the move was played from (position slips only). */
  epd?: string;
  /** Square the piece left, so picking that piece up is what recalls it. */
  from?: string;
  /** What you played. */
  san: string;
  /** What to play instead, when known. */
  better?: string;
  /** Why, in the book's or the rule's own words. */
  why: string;
  /** The order rule, for order slips. */
  rule?: { before: string; after: string };
  /** Distinct games it happened in. */
  games: number;
  lastGame: string;
  lastSeen: string;
  /** Games since the last slip in which you reached it and got it right. */
  cleared: number;
  clearedGame?: string;
}

export interface SlipState {
  byOpening: Record<string, Record<string, Slip>>;
}

/** Two clean games in a row and she stops reminding you. */
export const RETIRE_AFTER = 2;
/** Per opening. Oldest go first; a slip that never recurs isn't worth keeping. */
const CAP = 120;

export const slipStore = createLocalStore<SlipState>("openinglab:slips:v1", { byOpening: {} });

const strip = (san: string) => san.replace(/[+#!?]/g, "");
const alts = (s: string) => s.split("|").map((a) => strip(a.trim())).filter(Boolean);
export const orMoves = (s: string) => alts(s).join(" or ");

export const posKey = (fen: string, san: string) => `pos:${epd(fen)}|${strip(san)}`;
export const ruleKey = (r: { before: string; after: string }) => `order:${r.before}>${r.after}`;

/** Slips worth raising in this game: not retired, and not already made in it
 *  (the stop-down just taught that one; repeating it on a re-pick is nagging). */
export function activeSlips(state: SlipState, openingId: string, gameId: string): Slip[] {
  return Object.values(state.byOpening[openingId] ?? {}).filter((s) => s.cleared < RETIRE_AFTER && s.lastGame !== gameId);
}

/** What a judged move tells the ledger. */
export interface JudgedMove {
  fenBefore: string;
  fenAfter: string;
  san: string;
  from: string;
  /** Your history before this move. */
  historyBefore: PlyRecord[];
  /** Did the game stop on it? */
  pause: boolean;
  source: string;
  better?: string | null;
  why: string;
}

/** Order rules this move newly broke. */
function brokenRules(spec: OpeningSpec, side: Side, m: JudgedMove) {
  const ply: PlyRecord = { san: m.san, color: side };
  const before = setupProgress(m.fenBefore, spec.setup, side, m.historyBefore).orderViolations;
  const after = setupProgress(m.fenAfter, spec.setup, side, [...m.historyBefore, ply]).orderViolations;
  return after.filter((v) => !before.some((o) => o.before === v.before && o.after === v.after));
}

/** Slips this move put right: you reached a remembered position and played
 *  something else, or you played the rule's `before` move while it still
 *  mattered. Shared by the praise line and the ledger so the two can't disagree. */
export function clearedBy(slips: Slip[], side: Side, m: JudgedMove): Slip[] {
  if (m.pause) return [];
  const here = epd(m.fenBefore);
  const played = strip(m.san);
  const mine = m.historyBefore.filter((p) => p.color === side).map((p) => strip(p.san));
  return slips.filter((s) => {
    if (s.kind !== "order") return s.epd === here && strip(s.san) !== played;
    const r = s.rule!;
    return alts(r.before).includes(played) && !alts(r.after).some((a) => mine.includes(a)) && !alts(r.before).some((a) => mine.includes(a));
  });
}

export function settle(state: SlipState, spec: OpeningSpec, gameId: string, m: JudgedMove, now = new Date().toISOString()): SlipState {
  const side = spec.side;
  const forOpening = { ...(state.byOpening[spec.id] ?? {}) };
  let changed = false;

  const note = (slip: Omit<Slip, "games" | "lastGame" | "lastSeen" | "cleared">) => {
    const prev = forOpening[slip.key];
    const sameGame = prev?.lastGame === gameId;
    forOpening[slip.key] = {
      ...slip,
      games: (prev?.games ?? 0) + (sameGame ? 0 : 1),
      lastGame: gameId,
      lastSeen: now,
      cleared: 0,
    };
    changed = true;
  };

  if (m.pause) {
    const rules = m.source === "setup" ? brokenRules(spec, side, m) : [];
    if (rules.length) {
      for (const r of rules) {
        note({ key: ruleKey(r), kind: "order", san: m.san, better: orMoves(r.before), why: r.why, rule: { before: r.before, after: r.after } });
      }
    } else {
      note({
        key: posKey(m.fenBefore, m.san),
        kind: m.source === "authored" ? "book" : "engine",
        epd: epd(m.fenBefore),
        from: m.from,
        san: m.san,
        better: m.better ?? undefined,
        why: m.why,
      });
    }
  } else {
    for (const s of clearedBy(activeSlips(state, spec.id, gameId), side, m)) {
      if (s.clearedGame === gameId) continue;
      forOpening[s.key] = { ...s, cleared: s.cleared + 1, clearedGame: gameId };
      changed = true;
    }
  }

  if (!changed) return state;
  const kept = Object.values(forOpening)
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
    .slice(0, CAP);
  return { byOpening: { ...state.byOpening, [spec.id]: Object.fromEntries(kept.map((s) => [s.key, s])) } };
}
