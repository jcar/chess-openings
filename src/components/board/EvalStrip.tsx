"use client";

// Horizontal win-probability strip for phones: your share of the bar, in your
// colour. Shows the last evaluated position's win % for the user.

export function EvalStrip({ userWinPct, userIsWhite, delta }: { userWinPct: number | null; userIsWhite: boolean; delta?: number | null }) {
  const pct = userWinPct ?? 50;
  const mine = userIsWhite ? "bg-[var(--board-light)]" : "bg-[#2b3546]";
  const theirs = userIsWhite ? "bg-[#2b3546]" : "bg-[var(--board-light)]";
  return (
    <div className="px-4 pb-2">
      <div className={`flex h-1.5 overflow-hidden rounded-full ${theirs}`} aria-label={`Your winning chances ${Math.round(pct)}%`}>
        <div className={`${mine} transition-[width] duration-500`} style={{ width: `${Math.max(2, Math.min(98, pct))}%` }} />
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
