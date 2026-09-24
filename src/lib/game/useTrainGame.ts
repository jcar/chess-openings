"use client";

// The training game loop as one hook. Owns the position, the move history, the
// merged book (authored + baked), the bot's replies, the coach and the phase.
//
// Flow per user move:
//   tag the move (instant) → evaluate the new position (baked: instant; engine:
//   ≤ ~4s) → judge → explain → if the coach says "pause", wait for the user to
//   take back or play on; otherwise the bot replies.
// Flow per bot move:
//   tag it → prefetch the eval of the new position (doubles as the hint) →
//   explain (authored reply / punish card / book note) → fire idea cards.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import type { IdeaCard, OpeningSpec, Side } from "@/content/spec";
import { MergedBook } from "@/lib/book/merged";
import { loadExplorer, type ExplorerTree } from "@/lib/book/explorer";
import { loadEvals, type EvalTable } from "@/lib/book/evals";
import { bakedLoss } from "@/lib/book/evals";
import { epd } from "@/lib/book/key";
import { chooseBotMove, type BotChoice, type Difficulty } from "@/lib/bot/policy";
import { getEngine, type EngineLike } from "@/lib/chess/stockfish";
import { judge, winPct, type MoveJudgement } from "@/lib/coach/classify";
import { evaluate, type Evaluation } from "@/lib/coach/evalSource";
import { describeMove, tagMove, type MoveInfo, type PlyRecord } from "@/lib/coach/features";
import type { MoveTag } from "@/lib/coach/tags";
import { explainBotMove, explainUserMove, firedIdeas, type CoachMessage } from "@/lib/coach/explain";
import { setupProgress, type SetupProgress } from "@/lib/setup/progress";
import { newTracker, observe, type MomentumTracker } from "@/lib/adapt/inGame";
import type { TrainEvent } from "@/lib/companion/events";
import { thinkAbout, type ThinkAbout } from "@/lib/coach/prompt";
import { READ_MS, usePrefs } from "@/lib/prefs/pace";

export type Phase = "opening" | "middlegame" | "over";
export type Result = "win" | "loss" | "draw";

export interface Ply extends PlyRecord {
  /** FEN after the move. */
  fen: string;
  byUser: boolean;
  source?: BotChoice["source"];
  freq?: number;
  judgement?: MoveJudgement | null;
  /** The coach's note about this move, kept for the post-game review. */
  coach?: CoachMessage | null;
}

export interface TrainState {
  fen: string;
  history: Ply[];
  phase: Phase;
  leftBook: boolean;
  /** Ply count at which the book ended (for the tutor window). */
  bookEndedAt: number | null;
  botThinking: boolean;
  /** The coach is evaluating the user's last move. */
  checking: boolean;
  dataReady: boolean;
  result: Result | null;
  takebacks: number;
  hintsUsed: number;
  coach: CoachMessage | null;
  /** Idea cards fired by the last opponent move / book end. */
  ideas: IdeaCard[];
  /** The coach flagged the last user move; waiting for take back / play on. */
  pendingPause: boolean;
  /** The coach's verdict on YOUR last move. Stays put while the opponent
   *  replies, so the assessment never flashes past. Cleared when you move again. */
  yourMoveCoach: CoachMessage | null;
  /** Step pacing: the reply waits until you tap Continue. */
  awaitingContinue: boolean;
  /** A plan question the user must answer before moving. */
  /** The user's win % after the last evaluated position (0–100). */
  userWinPct: number | null;
  /** Best move in the current position (for hints), when known. */
  hintUci: string | null;
  hintShown: boolean;
  /** Before-you-move prompt for the current position (user to move). */
  think: ThinkAbout | null;
  momentum: MomentumTracker;
}

export interface GameOverInfo {
  result: Result;
  takebacks: number;
  hintsUsed: number;
  momentum: number;
  plies: number;
  history: Ply[];
  bookEndedAt: number | null;
  /** Where the opening setup ended up, for the post-game report. */
  setup?: SetupProgress;
}

const START = new Chess().fen();
/** Coaching continues this many plies after the book ends. */
const TUTOR_PLIES = 12;

function sideOf(g: Chess): Side {
  return g.turn() === "w" ? "white" : "black";
}

export interface TrainOptions {
  onGameOver?: (info: GameOverInfo) => void;
  /** Caissa's feed. Fired from async bodies after the `seq` guard and outside
   *  every state updater, so Strict Mode's updater replay can't double-emit. */
  onEvent?: (e: TrainEvent) => void;
  /** Fired when the coach has judged a user move (for the mistake ledger). */
  onJudged?: (info: { message: CoachMessage; move: MoveInfo; tags: MoveTag[] }) => void;
}

export function useTrainGame(spec: OpeningSpec, difficulty: Difficulty, options: TrainOptions = {}) {
  const userColor: Side = spec.side;
  const { pace } = usePrefs();
  const [tree, setTree] = useState<ExplorerTree | null>(null);
  const [evals, setEvals] = useState<EvalTable | null>(null);
  const [dataReady, setDataReady] = useState(false);

  const initial = (): TrainState => ({
    fen: START,
    history: [],
    phase: "opening",
    leftBook: false,
    bookEndedAt: null,
    botThinking: false,
    checking: false,
    dataReady: false,
    result: null,
    takebacks: 0,
    hintsUsed: 0,
    coach: null,
    ideas: [],
    pendingPause: false,
    yourMoveCoach: null,
    awaitingContinue: false,
    userWinPct: null,
    hintUci: null,
    hintShown: false,
    think: null,
    momentum: newTracker(),
  });
  const [state, setState] = useState<TrainState>(initial);
  const onGameOverRef = useRef(options.onGameOver);
  const onJudgedRef = useRef(options.onJudged);
  const onEventRef = useRef(options.onEvent);
  useEffect(() => {
    onGameOverRef.current = options.onGameOver;
    onJudgedRef.current = options.onJudged;
    onEventRef.current = options.onEvent;
  }, [options.onGameOver, options.onJudged, options.onEvent]);
  const emit = useCallback((e: TrainEvent) => onEventRef.current?.(e), []);
  const gameRef = useRef(new Chess());
  const seq = useRef(0); // invalidates in-flight async work after takeback/reset
  const currentEval = useRef<Evaluation | null>(null); // eval of the position the user is looking at

  useEffect(() => {
    let live = true;
    Promise.all([loadExplorer(spec.id), loadEvals(spec.id)]).then(([t, e]) => {
      if (!live) return;
      setTree(t);
      setEvals(e);
      setDataReady(true);
    });
    return () => {
      live = false;
    };
  }, [spec.id]);

  const book = useMemo(() => new MergedBook(spec, tree, evals), [spec, tree, evals]);
  const engine = (): EngineLike | null => (typeof window !== "undefined" ? getEngine() : null);

  const resultFor = (g: Chess): Result | null => {
    if (!g.isGameOver()) return null;
    if (g.isCheckmate()) return sideOf(g) === userColor ? "loss" : "win";
    return "draw";
  };

  const coachingOn = (s: TrainState, plyCount: number) => !s.leftBook || s.bookEndedAt === null || plyCount - s.bookEndedAt <= TUTOR_PLIES;

  /** Evaluate the current position (user to move) — feeds the win% strip, hints and the next judgement. */
  const prefetch = useCallback(
    async (g: Chess, mySeq: number) => {
      const fen = g.fen();
      const ev = await evaluate(book, fen, engine(), { depth: 10, timeoutMs: 5000 });
      if (mySeq !== seq.current) return null;
      currentEval.current = ev;
      setState((s) => (s.fen === fen ? { ...s, hintUci: ev?.bestUci ?? null, userWinPct: ev ? winPct(ev.cp) : s.userWinPct } : s));
      return ev;
    },
    [book],
  );

  const promptFor = (fen: string, history: Ply[], leftBook: boolean, ideas: IdeaCard[]): ThinkAbout =>
    thinkAbout({ spec, book, fen, setup: setupProgress(fen, spec.setup, userColor, history), leftBook, firedIdeas: ideas });

  const botMove = useCallback(
    async (g: Chess, history: Ply[], mySeq: number) => {
      if (g.isGameOver() || sideOf(g) === userColor) return;
      setState((s) => ({ ...s, botThinking: true }));
      const fenBefore = g.fen();
      const started = Date.now();
      const choice = await chooseBotMove({ fen: fenBefore, book, difficulty, engine: engine() ?? undefined });
      const wait = Math.max(0, 400 - (Date.now() - started));
      if (wait) await new Promise((r) => setTimeout(r, wait));
      if (mySeq !== seq.current) return;
      if (!choice) {
        setState((s) => ({ ...s, botThinking: false }));
        return;
      }
      const info = describeMove(fenBefore, choice.uci)!;
      const tags = tagMove(fenBefore, (() => { const t = new Chess(fenBefore); t.move(choice.san); return t.fen(); })(), info, history);
      g.move(choice.san);
      const fenAfter = g.fen();
      const freq = book.movesAt(fenBefore).find((m) => m.uci === choice.uci)?.freq;
      const ply: Ply = { san: info.san, uci: choice.uci, color: info.color, fen: fenAfter, byUser: false, source: choice.source, freq };
      const newHistory = [...history, ply];
      const wasInBook = book.inBook(fenBefore);
      const nowInBook = book.inBook(fenAfter);
      const result = resultFor(g);

      // Loss of the bot's move vs best, from the eval of the position before it.
      const before = currentEval.current && currentEval.current.lines.length ? currentEval.current : null;
      let loss: number | null = bakedLoss(book.evals, epd(fenBefore), choice.uci);
      if (loss === null && before) {
        const hit = before.lines.find(([u]) => u === choice.uci);
        loss = hit ? Math.max(0, before.cp - hit[1]) : null;
      }

      const ideas = firedIdeas(spec, fenAfter, info, tags, wasInBook && !nowInBook);
      let botCoachForEvent: CoachMessage | null = null;
      let thinkForEvent: ThinkAbout | null = null;
      setState((s) => {
        // Not sticky: a repertoire like the London transposes constantly, and one
        // offbeat sideline used to end the coaching for the rest of the game.
        const leftBook = !nowInBook;
        const bookEndedAt = nowInBook ? null : s.bookEndedAt ?? newHistory.length;
        const bookLine = book.definingMoveAt(fenBefore) === choice.uci || (wasInBook && nowInBook);
        const botCoach = explainBotMove({ spec, book, fenBefore, fenAfter, move: info, history, tags, loss, bestReplyUci: null, freq, inOpening: !leftBook, bookLine });
        botCoachForEvent = botCoach;
        thinkForEvent = result ? null : promptFor(fenAfter, newHistory, leftBook, ideas);
        newHistory[newHistory.length - 1] = { ...ply, coach: botCoach };
        return {
          ...s,
          fen: fenAfter,
          history: [...newHistory],
          botThinking: false,
          leftBook,
          bookEndedAt,
          result,
          phase: result ? "over" : leftBook ? "middlegame" : "opening",
          ideas,
          coach: botCoach,
          think: result ? null : promptFor(fenAfter, newHistory, leftBook, ideas),
          hintUci: null,
          hintShown: false,
        };
      });

      emit({ t: "bot_move", plyIndex: newHistory.length, ply, coach: botCoachForEvent, tags, ideas, think: thinkForEvent, fenAfter });
      if (wasInBook && !nowInBook) emit({ t: "book_ended", plyIndex: newHistory.length, by: "them", san: info.san });
      if (!wasInBook && nowInBook) emit({ t: "book_resumed", plyIndex: newHistory.length });

      // Prefetch the eval of the new position: win%, hint, and the reply for the card.
      if (!result) {
        const ev = await prefetch(g, mySeq);
        let refreshedForEvent: CoachMessage | null = null;
        if (ev && mySeq === seq.current) {
          setState((s) => {
            if (s.fen !== fenAfter) return s;
            const bookLine = book.definingMoveAt(fenBefore) === choice.uci || (wasInBook && nowInBook);
            const refreshed = explainBotMove({ spec, book, fenBefore, fenAfter, move: info, history, tags, loss, bestReplyUci: ev.bestUci, freq, inOpening: !s.leftBook, bookLine });
            const hist = s.history.map((p, i) => (i === s.history.length - 1 && !p.byUser ? { ...p, coach: refreshed ?? p.coach } : p));
            if (refreshed) refreshedForEvent = refreshed;
            return { ...s, coach: refreshed ?? s.coach, history: hist };
          });
          if (refreshedForEvent) emit({ t: "bot_coach_refresh", plyIndex: newHistory.length, coach: refreshedForEvent });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [book, difficulty, prefetch, spec, userColor],
  );

  // Bot opens when the user is Black; otherwise prefetch the start position.
  useEffect(() => {
    if (!dataReady) return;
    const g = gameRef.current;
    if (g.history().length === 0) {
      const mySeq = ++seq.current;
      emit({ t: "game_start" });
      if (sideOf(g) !== userColor) void botMove(g, [], mySeq);
      else {
        void prefetch(g, mySeq);
        setState((s) => ({ ...s, think: promptFor(g.fen(), [], false, []) }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataReady, spec.id]);

  /** Attempt the user's move. Returns false if illegal / not their turn / blocked. */
  const playUserMove = useCallback(
    (from: string, to: string, promotion?: string): boolean => {
      const g = gameRef.current;
      if (g.isGameOver() || sideOf(g) !== userColor || state.botThinking || state.checking || state.pendingPause || state.awaitingContinue) return false;
      const legal = g.moves({ verbose: true }).find((m) => m.from === from && m.to === to);
      if (!legal) return false;
      const promo = legal.promotion ? promotion ?? "q" : undefined;
      const fenBefore = g.fen();
      const uci = from + to + (promo ?? "");
      const info = describeMove(fenBefore, uci)!;
      const historyBefore = state.history;
      const setupBefore = setupProgress(fenBefore, spec.setup, userColor, historyBefore);
      g.move({ from, to, promotion: promo as never });
      const fenAfter = g.fen();
      const tags = tagMove(fenBefore, fenAfter, info, historyBefore);
      const ply: Ply = { san: info.san, uci, color: info.color, fen: fenAfter, byUser: true, freq: book.movesAt(fenBefore).find((m) => m.uci === uci)?.freq };
      const history = [...historyBefore, ply];
      const setupAfter = setupProgress(fenAfter, spec.setup, userColor, history);
      const result = resultFor(g);
      const wasInBook = book.inBook(fenBefore);
      const nowInBook = book.inBook(fenAfter);
      const mySeq = ++seq.current;
      const evBefore = currentEval.current;

      if (historyBefore.length === 0) void engine()?.warmUp();

      setState((s) => {
        const leftBook = !nowInBook;
        return {
          ...s,
          fen: fenAfter,
          history,
          leftBook,
          bookEndedAt: nowInBook ? null : s.bookEndedAt ?? history.length,
          result,
          phase: result ? "over" : leftBook ? "middlegame" : "opening",
          checking: !result,
          coach: null,
          yourMoveCoach: null,
          awaitingContinue: false,
          ideas: [],
          hintUci: null,
          hintShown: false,
          think: null,
        };
      });
      emit({ t: "user_move", plyIndex: history.length, ply, tags });
      if (wasInBook && !nowInBook) {
        // Only worth saying when the book actually wanted a different move. With
        // no recommendation at this node there is nothing to have deviated from:
        // our coverage simply ran out, which is a fact about our data and not
        // about the player. Saying it anyway contradicts our own hint, which can
        // legitimately lead out of a 500-node tree.
        const bookMove = spec.annotations[epd(fenBefore)]?.yourMove?.san;
        if (bookMove && bookMove !== info.san) {
          emit({ t: "book_ended", plyIndex: history.length, by: "you", san: info.san, bookMove });
        }
      }
      if (!wasInBook && nowInBook) emit({ t: "book_resumed", plyIndex: history.length });
      if (result) return true;

      void (async () => {
        const evAfter = await evaluate(book, fenAfter, engine(), { depth: 10, timeoutMs: 4000 });
        if (mySeq !== seq.current) return;
        const judgement = evBefore && evAfter ? judge(evBefore.cp, evAfter.cp, evBefore.bestUci === uci) : null;
        const inOpening = !state.leftBook && nowInBook;
        const message = explainUserMove({
          spec,
          book,
          fenBefore,
          fenAfter,
          move: info,
          history: historyBefore,
          tags,
          judgement,
          bestUci: evBefore?.bestUci ?? null,
          setupBefore,
          setupAfter,
          verbosity: difficulty.verbosity,
          inOpening,
        });
        onJudgedRef.current?.({ message, move: info, tags });
        const on = coachingOn({ ...state, leftBook: state.leftBook || !nowInBook, bookEndedAt: state.bookEndedAt ?? (wasInBook && !nowInBook ? history.length : null) }, history.length);
        const pause = on && message.pause;
        history[history.length - 1] = { ...ply, judgement, coach: message };
        const stepping = !pause && pace === "step";
        emit({
          t: "user_judged",
          plyIndex: history.length,
          message,
          judgement,
          winPct: evAfter ? winPct(-evAfter.cp) : null,
          deltaPct: judgement ? -judgement.drop : null,
          tags,
          pause,
          stepping,
          move: info,
          fenBefore,
          fenAfter,
          historyBefore,
        });
        setState((s) => ({
          ...s,
          history: [...history],
          checking: false,
          coach: on || message.pause ? message : null,
          yourMoveCoach: message,
          pendingPause: pause,
          awaitingContinue: stepping,
          userWinPct: evAfter ? winPct(-evAfter.cp) : s.userWinPct,
          momentum: evAfter ? observe(s.momentum, winPct(-evAfter.cp)) : s.momentum,
        }));
        if (pause || stepping) return; // the user decides when play resumes
        const read = READ_MS[pace];
        if (read) await new Promise((r) => setTimeout(r, read));
        if (mySeq !== seq.current) return;
        void botMove(g, history, mySeq);
      })();
      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [book, botMove, difficulty.verbosity, pace, spec, state.botThinking, state.checking, state.history, state.leftBook, state.bookEndedAt, state.pendingPause, userColor],
  );

  /** After a pause: accept the flagged move and let the bot reply. */
  /** Accept the position and let the opponent reply: used both after a flagged
   *  move ("Play on") and in step pacing ("Continue"). */
  const playOn = useCallback(() => {
    if (!state.pendingPause && !state.awaitingContinue) return;
    const mySeq = ++seq.current;
    setState((s) => ({ ...s, pendingPause: false, awaitingContinue: false }));
    void botMove(gameRef.current, state.history, mySeq);
  }, [botMove, state.awaitingContinue, state.history, state.pendingPause]);

  /** Undo back to the user's previous decision point. */
  const takeBack = useCallback(() => {
    const mySeq = ++seq.current;
    const g = gameRef.current;
    let history = state.history;
    if (history.length && !history[history.length - 1].byUser) {
      g.undo();
      history = history.slice(0, -1);
    }
    if (history.length && history[history.length - 1].byUser) {
      g.undo();
      history = history.slice(0, -1);
    }
    engine()?.abortAnalysis();
    setState((s) => ({
      ...s,
      fen: g.fen(),
      history,
      botThinking: false,
      checking: false,
      pendingPause: false,
      yourMoveCoach: null,
      awaitingContinue: false,
      result: null,
      phase: s.leftBook ? "middlegame" : "opening",
      takebacks: s.takebacks + 1,
      coach: s.coach && s.coach.pause ? { ...s.coach, pause: false, kind: "note", headline: `Try again — not ${history.length ? "" : ""}${s.coach.bestSan ? `${s.coach.bestSan}?` : "that"}`.trim() } : null,
      ideas: [],
      hintUci: null,
      hintShown: false,
      think: promptFor(g.fen(), history, s.leftBook, []),
    }));
    emit({ t: "truncate", toPlyIndex: history.length });
    void prefetch(g, mySeq);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefetch, state.history]);

  const reset = useCallback(() => {
    const mySeq = ++seq.current;
    const g = new Chess();
    gameRef.current = g;
    currentEval.current = null;
    engine()?.abortAnalysis();
    setState({ ...initial(), dataReady });
    emit({ t: "reset" });
    emit({ t: "game_start" });
    if (sideOf(g) !== userColor) void botMove(g, [], mySeq);
    else {
      void prefetch(g, mySeq);
      setState((s) => ({ ...s, think: promptFor(g.fen(), [], false, []) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botMove, dataReady, prefetch, userColor]);

  /** Show the move and why. You asked, so you get the answer. */
  const showHint = useCallback(() => {
    setState((s) => (s.hintShown ? s : { ...s, hintShown: true, hintsUsed: s.hintsUsed + 1 }));
  }, []);

  const legalDestinations = useCallback(
    (square: string): string[] => {
      const g = gameRef.current;
      if (sideOf(g) !== userColor) return [];
      return g.moves({ square: square as Square, verbose: true }).map((m) => m.to);
    },
    [userColor],
  );

  const reportedRef = useRef(false);
  useEffect(() => {
    if (state.result && !reportedRef.current) {
      reportedRef.current = true;
      const info = { result: state.result, takebacks: state.takebacks, hintsUsed: state.hintsUsed, momentum: state.momentum.momentum, plies: state.history.length, history: state.history, bookEndedAt: state.bookEndedAt, setup: setupProgress(state.fen, spec.setup, userColor, state.history) };
      onGameOverRef.current?.(info);
      emit({ t: "game_over", info });
    }
    if (!state.result) reportedRef.current = false;
  }, [emit, spec.setup, userColor, state.fen, state.result, state.takebacks, state.hintsUsed, state.momentum.momentum, state.history, state.bookEndedAt]);

  const turn: Side = state.fen.split(" ")[1] === "w" ? "white" : "black";
  const userToMove = turn === userColor && !state.botThinking && !state.checking && !state.pendingPause && !state.awaitingContinue && !state.result;

  return {
    state: { ...state, dataReady },
    book,
    userColor,
    userToMove,
    playUserMove,
    playOn,
    takeBack,
    reset,
    showHint,
    legalDestinations,
  };
}
