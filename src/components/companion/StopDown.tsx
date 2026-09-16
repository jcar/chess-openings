"use client";

// The teaching moment. When a move breaks the opening's own rule, contradicts the
// book, or drops material, the game stops and this replaces the conversation
// until you choose. The board stays exactly where it is, marked up, because the
// position is what the lesson is about.

import { CaissaAvatar } from "./CaissaAvatar";
import type { CoachMessage } from "@/lib/coach/explain";

export function StopDown({ message, san, onTakeBack, onPlayOn }: { message: CoachMessage; san?: string; onTakeBack: () => void; onPlayOn: () => void }) {
  const severe = message.severity === "blunder" || message.severity === "mistake";

  return (
    <section
      data-testid="stop-down"
      data-severity={message.severity ?? "none"}
      aria-live="assertive"
      className="flex min-h-0 flex-1 flex-col border-t-2 border-clay/60 bg-clay/[0.06]"
    >
      {/* The lesson scrolls; the choice never does. A long explanation used to
          push both buttons below the fold, which is the one thing that must
          always be reachable. */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 pt-3">
      <div className="flex items-start gap-2.5">
        <CaissaAvatar status="alert" size={28} />
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-clay">
            {message.source === "setup" ? "Wrong order" : severe ? "Hold on" : "Not that one"}
          </div>
          <h2 className="mt-0.5 font-display text-lg font-bold leading-tight text-ink">{message.headline}</h2>
        </div>
      </div>

      {message.body && <p className="text-[15px] leading-snug text-ink">{message.body}</p>}

      {(message.lookFor || message.bestSan) && (
        <p className="rounded-xl border border-sage/40 bg-sage/10 px-3 py-2 text-[15px] font-semibold leading-snug text-sage">
          {message.lookFor ?? `${message.bestSan} was the move.`}
        </p>
      )}

      </div>

      <div className="flex shrink-0 items-center gap-2 px-4 pb-3 pt-2">
        <button
          type="button"
          onClick={onTakeBack}
          className="flex min-h-[52px] flex-1 items-center justify-center rounded-2xl bg-primary px-3 font-bold text-white active:scale-[0.99]"
        >
          Take it back{san ? ` (${san})` : ""}
        </button>
        <button
          type="button"
          onClick={onPlayOn}
          className="flex min-h-[52px] shrink-0 items-center justify-center rounded-2xl border border-line px-4 text-sm font-semibold text-ink-soft active:scale-[0.99]"
        >
          Play on
        </button>
      </div>
    </section>
  );
}
