"use client";

// Principles Mode on the same stream, with the benchmark scoreboard available in
// place of the conversation when you want to see where you stand.

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { PRINCIPLES_SPEC } from "@/content/principlesSpec";
import { Board } from "@/components/board/Board";
import { EvalStrip } from "@/components/board/EvalStrip";
import { ScoreBoard } from "@/components/ScoreBoard";
import { CaissaHeader } from "@/components/companion/CaissaHeader";
import { CompanionStream } from "@/components/companion/CompanionStream";
import type { CaissaStatus } from "@/components/companion/CaissaAvatar";
import { estimateFor, useRating } from "@/lib/adapt/rating";
import { difficultyFor, personaFor } from "@/lib/adapt/strength";
import { moveHint } from "@/lib/coach/prompt";
import type { MoveTag } from "@/lib/coach/tags";
import { useCompanion } from "@/lib/companion/useCompanion";
import { useCompanionPrefs } from "@/lib/companion/prefs";
import { useSpeech } from "@/lib/companion/useSpeech";
import type { LineAction } from "@/lib/companion/types";
import { useTrainGame, type GameOverInfo } from "@/lib/game/useTrainGame";
import { scoreBenchmarks } from "@/lib/principles/benchmarks";
import { recordMistake } from "@/lib/progress/mistakes";
import { finishGame } from "@/lib/progress/recordGame";
import { readyToGraduate, useSessions } from "@/lib/progress/sessions";
import { setupProgress } from "@/lib/setup/progress";

export function PrinciplesView() {
  const spec = PRINCIPLES_SPEC;
  const rating = useRating();
  const sessions = useSessions();
  const estimate = estimateFor(rating, spec.id);
  const difficulty = useMemo(() => difficultyFor(estimate.rating, estimate.momentum), [estimate.rating, estimate.momentum]);
  const { voice } = useCompanionPrefs();
  const companion = useCompanion(spec);
  const [showScore, setShowScore] = useState(false);

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

  const { state, book, userColor, userToMove, playUserMove, playOn, takeBack, reset, showHint, legalDestinations } = useTrainGame(spec, difficulty, {
    onGameOver,
    onJudged,
    onEvent: companion.say,
  });

  const results = useMemo(() => scoreBenchmarks(state.history, userColor), [state.history, userColor]);
  const setup = useMemo(() => setupProgress(state.fen, spec.setup, userColor, state.history), [state.fen, spec.setup, userColor, state.history]);
  const graduate = readyToGraduate(sessions);
  const last = state.history[state.history.length - 1];
  const moveNo = Math.floor(state.history.length / 2) + 1;
  const canTakeBack = state.history.some((p) => p.byUser) && !state.botThinking && !state.checking;
  const canHint = userToMove && !state.hintShown;

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

  const onAction = (a: LineAction) => {
    if (a.kind === "takeback") takeBack();
    else if (a.kind === "playon" || a.kind === "continue") playOn();
    else if (a.kind === "newgame") reset();
  };

  const passed = results.filter((r) => r.pass).length;

  return (
    <div className="mx-auto flex h-dvh w-full max-w-lg flex-col">
      <CaissaHeader
        title="Principles Mode"
        subtitle={`Move ${moveNo} · vs ${personaFor(difficulty.botElo)} · ${passed}/${results.length} benchmarks`}
        status={status}
        backHref="/"
        backLabel="Back"
      />

      <div className="shrink-0">
        <EvalStrip userWinPct={state.userWinPct} userIsWhite={userColor === "white"} />
      </div>

      <div className="w-full shrink-0 touch-none select-none">
        <Board
          fen={state.fen}
          orientation={userColor}
          interactive={userToMove}
          onDrop={(from, to) => (userToMove ? playUserMove(from, to) : false)}
          getLegalMoves={legalDestinations}
          onMove={(from, to) => void playUserMove(from, to)}
          onSelect={(square) => {
            if (userToMove) companion.say({ t: "pickup", plyIndex: state.history.length, square, fen: state.fen });
          }}
          lastMove={last ? { from: last.uci.slice(0, 2), to: last.uci.slice(2, 4), mine: last.byUser } : undefined}
          arrows={arrows}
          highlightSquares={highlight}
        />
      </div>

      <div className="flex shrink-0 items-center justify-between px-3 py-1">
        <button type="button" onClick={() => setShowScore((v) => !v)} className="min-h-[36px] text-xs font-semibold text-primary-strong">
          {showScore ? "← Back to Caissa" : "See benchmarks →"}
        </button>
        {state.result && graduate && (
          <Link href="/train/italian-game/" className="min-h-[36px] text-xs font-bold text-sage">
            Ready for the Italian →
          </Link>
        )}
      </div>

      {showScore ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
          <ScoreBoard results={results} />
        </div>
      ) : (
        <CompanionStream lines={companion.lines} onAction={onAction} />
      )}

      <div className="flex shrink-0 border-t border-line bg-[var(--rail)] px-1 pb-[env(safe-area-inset-bottom)]">
        <Btn label="Take back" onClick={takeBack} disabled={!canTakeBack} glyph="↶" />
        <Btn label="Hint" onClick={askForHint} disabled={!canHint} glyph="?" />
        <Btn label="New game" onClick={reset} glyph="⟲" />
        <Link href="/summary/" className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
          <span className="text-base leading-none">≡</span>Summary
        </Link>
      </div>
    </div>
  );
}

function Btn({ label, onClick, disabled = false, glyph }: { label: string; onClick: () => void; disabled?: boolean; glyph: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink disabled:opacity-35">
      <span className="text-base leading-none">{glyph}</span>
      {label}
    </button>
  );
}
