"use client";

// Holds the conversation. A reducer rather than ad-hoc setState calls: it is pure,
// so Strict Mode replaying it is a no-op, and every line carries a deterministic
// id, so the same moment can never be logged twice however it arrives.

import { useCallback, useReducer, useRef } from "react";
import type { OpeningSpec } from "@/content/spec";
import { lastSession, sessionStore } from "@/lib/progress/sessions";
import { mistakeStore, recurring } from "@/lib/progress/mistakes";
import { activeSlips, slipStore } from "@/lib/progress/slips";
import { eventToLines, type BeatContext } from "./beats";
import type { TrainEvent } from "./events";
import { admitAll, truncateLines } from "./filter";
import { companionStore, type Chattiness } from "./prefs";
import type { CompanionLine } from "./types";

interface LogState {
  lines: CompanionLine[];
}

interface Action {
  e: TrainEvent;
  ctx: BeatContext;
  chattiness: Chattiness;
}

/** The kinds a bot-move comment can take, so a later refresh can find and edit it. */
const BOT_COMMENT_KINDS = new Set(["orient", "their_blunder"]);

export function reduce(state: LogState, { e, ctx, chattiness }: Action): LogState {
  if (e.t === "reset") return state.lines.length ? { lines: [] } : state;
  if (e.t === "truncate") {
    const lines = truncateLines(state.lines, e.toPlyIndex);
    return lines.length === state.lines.length ? state : { lines };
  }

  const drafts = eventToLines(e, ctx);
  if (!drafts.length) return state;

  // The engine came back with a better answer for a comment already on screen:
  // edit it in place rather than saying a second, nearly identical thing.
  if (e.t === "bot_coach_refresh") {
    const draft = drafts[0];
    let replaced = false;
    const lines = state.lines.map((l) => {
      if (replaced || l.plyIndex !== e.plyIndex || l.speaker !== "caissa" || !BOT_COMMENT_KINDS.has(l.kind)) return l;
      replaced = true;
      if (l.text === draft.text && l.more === draft.more) return l;
      return { ...l, kind: draft.kind, text: draft.text, more: draft.more, priority: draft.priority, tone: draft.tone };
    });
    return replaced && lines.some((l, i) => l !== state.lines[i]) ? { lines } : state;
  }

  const known = new Set(state.lines.map((l) => l.id));
  const fresh = drafts.filter((d) => !known.has(d.id));
  if (!fresh.length) return state;

  const admitted = admitAll(fresh, { chattiness, recent: state.lines });
  return admitted.length ? { lines: [...state.lines, ...admitted] } : state;
}

export interface Companion {
  lines: CompanionLine[];
  /** Pass to `useTrainGame({ onEvent })`, and call directly for hint/pickup. */
  say: (e: TrainEvent) => void;
  /** Identifies the game in progress, so a slip is counted once per game. */
  gameId: () => string;
}

export function useCompanion(spec: OpeningSpec): Companion {
  const [state, dispatch] = useReducer(reduce, { lines: [] });
  // A new id per game_start. Assigned inside `say`, which only ever runs from
  // effects and event handlers, never during render.
  const game = useRef("");

  // Preferences and memory are read from the stores at the moment a line is
  // built, not from a hook snapshot. During hydration a snapshot is still the
  // frozen default, which would let the greeting — the very first line — ignore
  // a saved Quiet setting. Reading here is always current and keeps `say`
  // referentially stable, which the game hook's ref depends on.
  const say = useCallback(
    (e: TrainEvent) => {
      if (e.t === "game_start" || !game.current) game.current = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
      const ctx: BeatContext = {
        spec,
        slips: activeSlips(slipStore.getSnapshot(), spec.id, game.current),
        recurring: recurring(mistakeStore.getSnapshot(), spec.id),
        lastSession: lastSession(sessionStore.getSnapshot()),
      };
      dispatch({ e, ctx, chattiness: companionStore.getSnapshot().chattiness });
    },
    [spec],
  );

  const gameId = useCallback(() => game.current, []);
  return { lines: state.lines, say, gameId };
}
