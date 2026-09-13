"use client";

// "What you'll face at your level": the opponent's actual replies (from the
// baked sub-1200 Lichess data) at the positions along the opening's defining
// moves where THEY are to move, with the spec's verdict and answer when authored.
// Renders nothing until a baked tree exists for this opening.

import { useEffect, useMemo, useState } from "react";
import type { OpeningSpec } from "@/content/spec";
import { loadExplorer, type ExplorerTree } from "@/lib/book/explorer";
import { opponentNodes } from "@/lib/book/opponentNodes";

const VERDICT_TONE: Record<string, string> = { good: "text-ink-soft", dubious: "text-amber", bad: "text-clay" };

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
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">What you&apos;ll face at your level</h2>
      <p className="mb-3 text-sm text-ink-soft">From games rated under 1200 on Lichess. Amber and red replies are the ones you should be ready to punish.</p>
      <div className="flex flex-col gap-3">
        {nodes.map((n) => (
          <div key={n.fen} className="rounded-2xl border border-line bg-card p-4">
            <div className="flex items-baseline justify-between gap-3">
              <div className="font-display text-base font-bold">{n.label}</div>
              <div className="font-mono text-[11px] text-ink-soft">{n.games.toLocaleString()} games</div>
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
                    <div className={`pl-14 text-xs leading-snug ${VERDICT_TONE[r.verdict] ?? "text-ink-soft"}`}>
                      {r.answer ? `Answer: ${r.answer}. ` : ""}
                      {r.why}
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
