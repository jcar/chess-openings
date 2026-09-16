"use client";

// "What you'll face at your level": the opponent's actual replies (from the
// baked sub-1200 Lichess data) at the positions along the opening's defining
// moves where THEY are to move, with the spec's verdict and answer when authored.
// Renders nothing until a baked tree exists for this opening.

import { useEffect, useMemo, useState } from "react";
import type { OpeningSpec } from "@/content/spec";
import { loadExplorer, type ExplorerTree } from "@/lib/book/explorer";
import { opponentNodes } from "@/lib/book/opponentNodes";
import { compactCount } from "@/lib/format";

const VERDICT: Record<string, { label: string; text: string; chip: string }> = {
  good: { label: "Normal", text: "text-ink-soft", chip: "border-line text-ink-soft" },
  dubious: { label: "Loose", text: "text-amber", chip: "border-amber/50 bg-amber/10 text-amber" },
  bad: { label: "Mistake", text: "text-clay", chip: "border-clay/50 bg-clay/10 text-clay" },
};

export function OpponentReplies({ spec }: { spec: OpeningSpec }) {
  const [tree, setTree] = useState<ExplorerTree | null>(null);
  useEffect(() => {
    let live = true;
    loadExplorer(spec.id).then((t) => live && setTree(t));
    return () => {
      live = false;
    };
  }, [spec.id]);

  const nodes = useMemo(() => opponentNodes(spec, tree), [tree, spec]);

  if (!nodes.length) return null;
  return (
    <section>
      <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-ink">
        What you&apos;ll face
        <span aria-hidden className="h-px flex-1 bg-line" />
      </h2>
      <p className="mb-3 text-sm text-ink-soft">
        From games rated under 1200 on Lichess. Anything marked <span className="font-semibold text-amber">Loose</span> or{" "}
        <span className="font-semibold text-clay">Mistake</span> is a reply you should be ready to punish.
      </p>
      <div className="flex flex-col gap-3">
        {nodes.map((n) => (
          <div key={n.fen} className="rounded-2xl border border-line bg-card p-4">
            <div className="flex items-baseline justify-between gap-3">
              <div className="font-display text-base font-bold">{n.label}</div>
              <div className="shrink-0 font-mono text-[11px] text-ink-soft">{compactCount(n.games)} games</div>
            </div>
            <ul className="mt-2 flex flex-col divide-y divide-line">
              {n.replies.map((r) => (
                <li key={r.san} className="flex flex-col gap-0.5 py-2">
                  <div className="flex items-center gap-3">
                    <span className="w-14 font-mono text-sm font-semibold">{r.san}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                      <div className="h-full rounded-full bg-primary/70" style={{ width: `${Math.max(2, Math.round(r.freq * 100))}%` }} />
                    </div>
                    <span className="w-10 text-right font-mono text-xs text-ink-soft">{Math.round(r.freq * 100)}%</span>
                  </div>
                  {r.verdict && (
                    <div className="flex items-start gap-2 pl-14">
                      {/* Only the exceptions are labelled. A chip on every ordinary
                          reply was noise that buried the two that matter. */}
                      {r.verdict !== "good" && (
                        <span className={`mt-0.5 shrink-0 rounded-full border px-1.5 py-px text-[10px] font-bold uppercase tracking-wide ${VERDICT[r.verdict]?.chip ?? "border-line text-ink-soft"}`}>
                          {VERDICT[r.verdict]?.label ?? r.verdict}
                        </span>
                      )}
                      <span className={`text-xs leading-snug ${VERDICT[r.verdict]?.text ?? "text-ink-soft"}`}>
                        {r.answer ? `Answer: ${r.answer}. ` : ""}
                        {r.why}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
