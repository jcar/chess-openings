// Whether a line earns its place. Pure, so the chattiness rules are testable
// without a game.

import { MAX_PRIORITY, PLY_BUDGET, type Chattiness } from "./prefs";
import type { CompanionLine } from "./types";

/** How far back a dedupeKey looks. Long enough to kill "nothing's hanging" every
 *  move, short enough that a genuine repeat later still lands. */
export const DEDUPE_WINDOW = 6;

export interface AdmitContext {
  chattiness: Chattiness;
  /** Lines already admitted, oldest first. */
  recent: CompanionLine[];
}

/**
 * Move records are the transcript and always go in. Her lines must pass three
 * gates: the chattiness ceiling (which urgent lines ignore), the repeat window,
 * and the per-ply budget.
 */
export function admit(candidate: CompanionLine, ctx: AdmitContext): boolean {
  if (candidate.speaker !== "caissa") return true;

  // 1. Ceiling — never applied to urgent lines.
  if (candidate.priority !== 0 && candidate.priority > MAX_PRIORITY[ctx.chattiness]) return false;

  // 2. Don't say the same kind of thing twice in a row.
  if (candidate.dedupeKey) {
    const window = ctx.recent.slice(-DEDUPE_WINDOW);
    if (window.some((l) => l.dedupeKey === candidate.dedupeKey)) return false;
  }

  // 3. Per-ply budget, urgent lines excepted.
  if (candidate.priority !== 0) {
    const onThisPly = ctx.recent.filter((l) => l.speaker === "caissa" && l.plyIndex === candidate.plyIndex).length;
    if (onThisPly >= PLY_BUDGET[ctx.chattiness]) return false;
  }

  return true;
}

/** Admit a batch in order, so each decision sees the ones already let through. */
export function admitAll(candidates: CompanionLine[], ctx: AdmitContext): CompanionLine[] {
  const out: CompanionLine[] = [];
  let recent = ctx.recent;
  for (const c of candidates) {
    if (admit(c, { chattiness: ctx.chattiness, recent })) {
      out.push(c);
      recent = [...recent, c];
    }
  }
  return out;
}

/** Append, ignoring anything whose id is already present. */
export function mergeLines(prev: CompanionLine[], next: CompanionLine[]): CompanionLine[] {
  const seen = new Set(prev.map((l) => l.id));
  const added = next.filter((l) => !seen.has(l.id));
  return added.length ? [...prev, ...added] : prev;
}

/** Taking back removes everything said about the undone plies. */
export function truncateLines(prev: CompanionLine[], toPlyIndex: number): CompanionLine[] {
  return prev.filter((l) => l.plyIndex <= toPlyIndex);
}
