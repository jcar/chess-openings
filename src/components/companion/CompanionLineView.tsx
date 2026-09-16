"use client";

// One line of the conversation. Hers are bubbles; moves are compact chips you can
// tap to send the board back to that moment.

import { useState } from "react";
import { CaissaAvatar } from "./CaissaAvatar";
import type { CompanionLine, LineAction, Tone } from "@/lib/companion/types";

const TONE_TEXT: Record<Tone, string> = {
  warn: "text-clay",
  praise: "text-sage",
  punish: "text-amber",
  book: "text-primary-strong",
  note: "text-ink",
};

const TONE_EDGE: Record<Tone, string> = {
  warn: "border-clay/40",
  praise: "border-sage/40",
  punish: "border-amber/40",
  book: "border-primary/40",
  note: "border-line",
};

export function CompanionLineView({
  line,
  onAction,
  active = false,
}: {
  line: CompanionLine;
  onAction: (a: LineAction) => void;
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const tone = line.tone ?? "note";

  if (line.speaker !== "caissa") {
    const jump = line.actions?.find((a) => a.kind === "jump");
    const mine = line.speaker === "you";
    // plyIndex is 1-based: ply 1 is White's first move. The number is shown on
    // White's move only, the way a scoresheet is written — without it the chips
    // are a list of moves with nothing to count from.
    const moveNo = Math.ceil(line.plyIndex / 2);
    const whiteToPlay = line.plyIndex % 2 === 1;
    return (
      <div className={`flex ${mine ? "justify-end" : "justify-start"}`} data-beat={line.kind}>
        <button
          type="button"
          onClick={() => jump && onAction(jump)}
          aria-label={`${mine ? "Your move" : "Their move"} ${line.san}`}
          className={`flex min-h-[32px] items-baseline gap-1.5 rounded-full border px-3 py-1 font-mono text-sm ${active ? "border-primary bg-primary/15 text-primary-strong" : "border-line text-ink-soft"}`}
        >
          <span className="text-[11px] tabular-nums text-ink-soft/70">{whiteToPlay ? `${moveNo}.` : `${moveNo}…`}</span>
          {line.san}
        </button>
      </div>
    );
  }

  const expandable = !!line.more;
  const choices = (line.actions ?? []).filter((a) => a.kind !== "jump");
  const stacked = choices.length > 2 || choices.some((a) => a.label.length > 16);
  return (
    <div className="flex items-start gap-2" data-beat={line.kind} data-spoken={line.speak ? "true" : "false"}>
      <CaissaAvatar status={line.priority === 0 ? "alert" : "idle"} size={26} />
      <div className={`min-w-0 flex-1 rounded-2xl border bg-card px-3 py-2 ${TONE_EDGE[tone]}`}>
        {expandable ? (
          <button type="button" onClick={() => setOpen((v) => !v)} className="w-full text-left" aria-expanded={open}>
            <span className={`text-[15px] leading-snug ${TONE_TEXT[tone]}`}>{line.text}</span>
            {!open && <span className="ml-1 text-xs text-ink-soft">· why</span>}
          </button>
        ) : (
          <p className={`text-[15px] leading-snug ${TONE_TEXT[tone]}`}>{line.text}</p>
        )}
        {open && line.more && <p className="mt-1.5 text-sm leading-snug text-ink-soft">{line.more}</p>}
        {choices.length > 0 && (
          // Two short actions sit side by side. Three, or anything sentence-length,
          // becomes a column — a 390px screen split three ways turns an answer
          // like "c4 as early as possible to gambit a pawn" into five lines.
          <div className={`mt-2 flex gap-2 ${stacked ? "flex-col" : "flex-row"}`}>
            {choices.map((a, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onAction(a)}
                className={`min-h-[44px] rounded-xl border border-line bg-bg px-3 py-2 text-sm font-semibold active:scale-[0.99] ${
                  stacked ? "w-full text-left" : "flex-1"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
