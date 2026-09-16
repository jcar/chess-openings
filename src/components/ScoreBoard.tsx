"use client";

// Principles Mode scoreboard: the five benchmarks, live.

import type { BenchmarkResult } from "@/lib/principles/benchmarks";

export function ScoreBoard({ results }: { results: BenchmarkResult[] }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-3">
      <div className="mb-2 px-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-soft">Benchmarks</div>
      <ul className="flex flex-col divide-y divide-line">
        {results.map((r) => {
          const pending = !r.settled;
          const tone = pending ? "text-ink-soft" : r.pass ? "text-sage" : "text-clay";
          const mark = pending ? "·" : r.pass ? "✓" : "✕";
          return (
            <li key={r.id} className="flex items-start gap-3 px-1 py-2">
              <span className={`w-4 shrink-0 text-center font-bold ${tone}`} aria-hidden>
                {mark}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-tight">{r.title}</div>
                <div className="text-xs leading-snug text-ink-soft">{r.detail}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
