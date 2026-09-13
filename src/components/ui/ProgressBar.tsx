// A slim "rating climbing" bar: an inset track with a tinted fill, a soft glow,
// and a top sheen. The label is set in the notation mono for a scoreboard feel.
export function ProgressBar({
  pct,
  tone = "sage",
  showLabel = false,
  className = "",
}: {
  pct: number; // 0–100
  tone?: "sage" | "kid" | "primary";
  showLabel?: boolean;
  className?: string;
}) {
  const fill =
    tone === "kid" ? "var(--kid-teal)" : tone === "primary" ? "var(--primary)" : "var(--sage)";
  const v = Math.max(0, Math.min(100, pct));
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/12 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
        <div
          className="h-full rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-[width] duration-700 ease-out"
          style={{
            width: `${v}%`,
            background: `linear-gradient(90deg, color-mix(in oklab, ${fill}, #000 12%), ${fill})`,
            boxShadow: v > 0 ? `0 0 8px -2px ${fill}` : undefined,
          }}
        />
      </div>
      {showLabel && (
        <span className="w-9 text-right font-mono text-[11px] font-semibold text-ink-soft">
          {Math.round(v)}%
        </span>
      )}
    </div>
  );
}
