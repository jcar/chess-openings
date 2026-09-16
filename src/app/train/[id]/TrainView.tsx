"use client";

// Board and conversation. Everything above the stream is fixed; the stream is the
// only scrolling region, which is what keeps the board on screen at 390×844.

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { OpeningSpec } from "@/content/spec";
import { Board } from "@/components/board/Board";
import { EvalStrip } from "@/components/board/EvalStrip";
import { CaissaHeader } from "@/components/companion/CaissaHeader";
import { CompanionStream } from "@/components/companion/CompanionStream";
import { SetupSheet } from "@/components/companion/SetupSheet";
import type { CaissaStatus } from "@/components/companion/CaissaAvatar";
import { estimateFor, useRating } from "@/lib/adapt/rating";
import { difficultyFor, personaFor } from "@/lib/adapt/strength";
import { moveHint } from "@/lib/coach/prompt";
import type { MoveTag } from "@/lib/coach/tags";
import { useCompanion } from "@/lib/companion/useCompanion";
import { useCompanionPrefs } from "@/lib/companion/prefs";
import { useSpeech } from "@/lib/companion/useSpeech";
import type { LineAction } from "@/lib/companion/types";
import { recordMistake } from "@/lib/progress/mistakes";
import { finishGame } from "@/lib/progress/recordGame";
import { setupProgress } from "@/lib/setup/progress";
import { planStatus } from "@/lib/setup/plan";
import { useTrainGame, type GameOverInfo } from "@/lib/game/useTrainGame";

export function TrainView({ spec }: { spec: OpeningSpec }) {
  const rating = useRating();
  const estimate = estimateFor(rating, spec.id);
  const difficulty = useMemo(() => difficultyFor(estimate.rating, estimate.momentum), [estimate.rating, estimate.momentum]);
  const { voice } = useCompanionPrefs();
  const companion = useCompanion(spec);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [setupOpen, setSetupOpen] = useState(false);

  useSpeech(companion.lines, { voice });

  const onGameOver = useCallback(
    (info: GameOverInfo) => {
      finishGame(spec, info.history, info, difficulty.botElo, info.bookEndedAt);
    },
    [difficulty.botElo, spec],
  );
  const onJudged = useCallback(
    ({ message, move }: { message: { kind: string; tag?: MoveTag }; move: { to: string; san: string } }) => {
      if (message.kind === "warn" && message.tag) recordMistake(spec.id, message.tag, move.to, move.san);
    },
    [spec.id],
  );

  const { state, book, userColor, userToMove, playUserMove, playOn, takeBack, reset, answerCheckpoint, showHint, legalDestinations } = useTrainGame(
    spec,
    difficulty,
    { onGameOver, onJudged, onEvent: companion.say },
  );

  const reviewing = reviewIndex !== null;
  const shownFen = reviewing ? state.history[reviewIndex]?.fen ?? state.fen : state.fen;
  const last = reviewing ? state.history[reviewIndex] : state.history[state.history.length - 1];
  const canTakeBack = !reviewing && state.history.some((p) => p.byUser) && !state.botThinking && !state.checking;
  const canHint = userToMove && !state.hintShown;
  const lastUser = [...state.history].reverse().find((p) => p.byUser);
  const delta = lastUser?.judgement ? -lastUser.judgement.drop : null;

  const setup = useMemo(() => setupProgress(state.fen, spec.setup, userColor, state.history), [state.fen, spec.setup, userColor, state.history]);

  // The newest decorated line for the position you're looking at owns the board.
  const decorated = [...companion.lines].reverse().find((l) => l.deco && l.plyIndex >= state.history.length);
  const arrows = decorated?.deco?.arrow ? [{ ...decorated.deco.arrow, color: decorated.deco.arrow.color ?? "rgba(79,143,247,0.85)" }] : [];
  const highlight = decorated?.deco?.squares ?? [];

  const newest = companion.lines[companion.lines.length - 1];
  const status: CaissaStatus = state.checking || state.botThinking ? "thinking" : newest?.priority === 0 ? "alert" : "idle";

  const askForHint = () => {
    showHint();
    const hint = moveHint({ spec, book, fen: state.fen, setup, leftBook: state.leftBook, firedIdeas: state.ideas, history: state.history }, state.hintUci);
    if (hint) companion.say({ t: "hint", plyIndex: state.history.length, text: hint.text, from: hint.from, to: hint.to });
  };

  const onPickUp = (square: string) => {
    if (!userToMove) return;
    companion.say({ t: "pickup", plyIndex: state.history.length, square, fen: state.fen });
  };

  const onAction = (a: LineAction) => {
    switch (a.kind) {
      case "takeback":
        setReviewIndex(null);
        takeBack();
        break;
      case "playon":
      case "continue":
        playOn();
        break;
      case "answer":
        if (a.index !== undefined) answerCheckpoint(a.index);
        break;
      case "jump":
        // Tapping the move you're already looking at returns you to the game.
        setReviewIndex((cur) => (cur === a.index ? null : a.index ?? null));
        break;
      case "review":
        setReviewIndex(Math.max(0, state.history.findIndex((p) => p.byUser && p.judgement && p.judgement.drop >= 12)));
        break;
      case "newgame":
        setReviewIndex(null);
        reset();
        break;
    }
  };

  // What's on screen is "am I playing my opening correctly", not "is this
  // position in our dataset". The second is about our coverage, not his chess.
  const plan = planStatus(setup);
  const subtitle = reviewing
    ? "Reviewing · tap a move to move around"
    : state.result
      ? `Game over · setup ${plan.met}/${plan.total}`
      // The move number lives on every chip in the transcript now, so repeating
      // it here only crowded the opponent's name into an ellipsis.
      : `vs ${personaFor(difficulty.botElo)}`;

  return (
    <div className="mx-auto flex h-dvh w-full max-w-lg flex-col">
      <CaissaHeader
        title={spec.name}
        subtitle={subtitle}
        status={status}
        backHref="/"
        backLabel="Back to openings"
        plan={reviewing || state.result ? undefined : plan}
        onPlanTap={plan.total ? () => setSetupOpen(true) : undefined}
      />
      {setupOpen && <SetupSheet spec={spec} setup={setup} onClose={() => setSetupOpen(false)} />}

      <div className="shrink-0">
        <EvalStrip userWinPct={state.userWinPct} delta={delta} />
      </div>

      <div className="w-full shrink-0 touch-none select-none">
        <Board
          fen={shownFen}
          orientation={userColor}
          interactive={userToMove && !reviewing}
          onDrop={(from, to) => (userToMove && !reviewing ? playUserMove(from, to) : false)}
          getLegalMoves={legalDestinations}
          onMove={(from, to) => void playUserMove(from, to)}
          onSelect={onPickUp}
          lastMove={last ? { from: last.uci.slice(0, 2), to: last.uci.slice(2, 4), mine: last.byUser } : undefined}
          arrows={arrows}
          highlightSquares={highlight}
        />
      </div>

      {reviewing && (
        <div className="flex shrink-0 items-center justify-between border-y border-line bg-[var(--rail)] px-3 py-1">
          <span className="text-xs text-ink-soft">Looking at move {Math.floor(reviewIndex / 2) + 1}</span>
          <button type="button" onClick={() => setReviewIndex(null)} className="min-h-[36px] text-xs font-bold text-primary-strong">
            Back to the game →
          </button>
        </div>
      )}

      <CompanionStream lines={companion.lines} onAction={onAction} activePly={reviewIndex} />

      <div className="flex shrink-0 border-t border-line bg-[var(--rail)] px-1 pb-[env(safe-area-inset-bottom)]">
        <ActionButton label="Take back" onClick={() => onAction({ kind: "takeback", label: "" })} disabled={!canTakeBack} glyph="↶" />
        <ActionButton label="Hint" onClick={askForHint} disabled={!canHint} glyph="?" />
        <ActionButton label="New game" onClick={() => onAction({ kind: "newgame", label: "" })} glyph="⟲" />
        <Link href={`/openings/${spec.id}/`} className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
          <span className="text-base leading-none">≡</span>Theory
        </Link>
      </div>
    </div>
  );
}

function ActionButton({ label, onClick, disabled = false, glyph }: { label: string; onClick: () => void; disabled?: boolean; glyph: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink disabled:opacity-35"
    >
      <span className="text-base leading-none">{glyph}</span>
      {label}
    </button>
  );
}
