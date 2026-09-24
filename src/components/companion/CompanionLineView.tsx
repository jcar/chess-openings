"use client";

// One line of the conversation. Hers are bubbles; moves are compact chips you can
// tap to send the board back to that moment.

import { useState } from "react";
import { CaissaAvatar } from "./CaissaAvatar";
import type { CompanionLine, LineAction, Tone } from "@/lib/companion/types";
import { GRADE_LABEL, type Grade } from "@/lib/coach/explain";

/** Colour follows the grade and nothing else. The narrator used to set it, so
 *  book moves were blue and praise was green regardless of quality. */
const GRADE_STYLE: Record<Grade, { text: string; edge: string; chip: string }> = {
  best: { text: "text-sage", edge: "border-sage/40", chip: "border-sage/50 bg-sage/15 text-sage" },
  good: { text: "text-ink", edge: "border-sage/25", chip: "border-sage/40 bg-sage/10 text-sage" },
  playable: { text: "text-ink", edge: "border-line", chip: "border-line text-ink-soft" },
  inaccuracy: { text: "text-amber", edge: "border-amber/40", chip: "border-amber/50 bg-amber/10 text-amber" },
  mistake: { text: "text-clay", edge: "border-clay/40", chip: "border-clay/50 bg-clay/10 text-clay" },
  blunder: { text: "text-clay", edge: "border-clay/60", chip: "border-clay/60 bg-clay/15 text-clay" },
};

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

  const graded = line.grade ? GRADE_STYLE[line.grade] : null;
  const textCls = graded ? graded.text : TONE_TEXT[tone];
  const edgeCls = graded ? graded.edge : TONE_EDGE[tone];
  const parts = line.detail
    ? ([
        ["What it did", line.detail.did],
        ["Why the opening wants it", line.detail.why],
        ["Anything better?", line.detail.better],
      ] as [string, string | undefined][]).filter((p): p is [string, string] => !!p[1])
    : [];
  const expandable = !!line.more || parts.length > 0;
  const choices = (line.actions ?? []).filter((a) => a.kind !== "jump");
  const stacked = choices.length > 2 || choices.some((a) => a.label.length > 16);
  return (
    <div className="flex items-start gap-2" data-beat={line.kind}>
      <CaissaAvatar status={line.priority === 0 ? "alert" : "idle"} size={26} />
      <div className={`min-w-0 flex-1 rounded-2xl border bg-card px-3 py-2 ${edgeCls}`}>
        {graded && (
          <span
            data-grade={line.grade}
            className={`mb-1 inline-block rounded-full border px-1.5 py-px text-[10px] font-bold uppercase tracking-wide ${graded.chip}`}
          >
            {GRADE_LABEL[line.grade!]}
          </span>
        )}
        {expandable ? (
          <button type="button" onClick={() => setOpen((v) => !v)} className="w-full text-left" aria-expanded={open}>
            <span className={`text-[15px] leading-snug ${textCls}`}>{line.text}</span>
            {!open && <span className="ml-1 text-xs text-ink-soft">· why</span>}
          </button>
        ) : (
          <p className={`text-[15px] leading-snug ${textCls}`}>{line.text}</p>
        )}
        {open && parts.length > 0 && (
          <dl className="mt-1.5 flex flex-col gap-1.5">
            {parts.map(([label, text]) => (
              <div key={label}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-soft">{label}</dt>
                <dd className="text-sm leading-snug text-ink-soft">{text}</dd>
              </div>
            ))}
          </dl>
        )}
        {open && parts.length === 0 && line.more && <p className="mt-1.5 text-sm leading-snug text-ink-soft">{line.more}</p>}
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
