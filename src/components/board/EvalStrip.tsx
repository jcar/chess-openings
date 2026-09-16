"use client";

// Horizontal win-probability strip for phones: your share of the bar, in your
// colour. Shows the last evaluated position's win % for the user.

export function EvalStrip({ userWinPct, delta }: { userWinPct: number | null; delta?: number | null }) {
  const pct = userWinPct ?? 50;
  // This used to paint your share in your piece colour. On the light theme that
  // meant a near-white bar on a near-white page: the fill vanished and the strip
  // read as though you were losing badly. Your share is now the accent, which is
  // legible on both grounds, and the label carries the precision anyway.
  return (
    <div className="px-4 pb-2">
      <div
        className="flex h-1.5 overflow-hidden rounded-full bg-line ring-1 ring-inset ring-[var(--line)]"
        aria-label={`Your winning chances ${Math.round(pct)}%`}
      >
        <div className="bg-primary transition-[width] duration-500" style={{ width: `${Math.max(2, Math.min(98, pct))}%` }} />
      </div>
      <div className="mt-1 flex justify-between font-mono text-[11px] text-ink-soft">
        <span>You {userWinPct === null ? "–" : `${Math.round(pct)}%`}</span>
        {delta !== undefined && delta !== null && Math.abs(delta) >= 1 && (
          <span className={delta < 0 ? "text-clay" : "text-sage"}>
            {delta > 0 ? "+" : ""}
            {Math.round(delta)}%
          </span>
        )}
      </div>
    </div>
  );
}
