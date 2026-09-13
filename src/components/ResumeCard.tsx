"use client";

// "Which opening was I working on?" is the returning player's first question, and
// the app already records the answer in its session history. It just never showed
// it, so every visit started from a cold list.

import Link from "next/link";
import { getOpening } from "@/content";
import { lastSession, useSessions } from "@/lib/progress/sessions";

const RESULT_LABEL = { win: "you won", loss: "you lost", draw: "drawn" } as const;

export function ResumeCard() {
  const sessions = useSessions();
  const last = lastSession(sessions);
  if (!last) return null;
  const opening = getOpening(last.openingId);
  if (!opening) return null;

  const outcome = RESULT_LABEL[last.result as keyof typeof RESULT_LABEL] ?? "unfinished";
  const tone = last.result === "win" ? "text-sage" : last.result === "loss" ? "text-clay" : "text-ink-soft";

  return (
    <Link
      href={`/train/${opening.id}/`}
      className="mb-4 flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-4 active:scale-[0.99]"
    >
      <div className="min-w-0 flex-1">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-primary-strong">Pick up where you left off</div>
        <div className="mt-1 font-display text-lg font-bold leading-tight">{opening.name}</div>
        <p className="mt-0.5 text-xs text-ink-soft">
          Last game <span className={tone}>{outcome}</span> in {Math.ceil(last.plies / 2)} moves
          {last.worst ? `, worst moment ${last.worst.san} on ${last.worst.moveNo}` : ""}.
        </p>
      </div>
      <span aria-hidden className="shrink-0 text-xl text-primary-strong">→</span>
    </Link>
  );
}
