"use client";

// Caissa's presence. A knight in a ring that changes with what she's doing, so
// you can tell at a glance whether she's watching, thinking, talking or alarmed.

export type CaissaStatus = "idle" | "thinking" | "speaking" | "alert";

const RING: Record<CaissaStatus, string> = {
  idle: "border-line text-ink-soft",
  thinking: "border-primary/50 text-primary-strong",
  speaking: "border-primary text-primary-strong",
  alert: "border-clay text-clay",
};

export function CaissaAvatar({ status = "idle", size = 32 }: { status?: CaissaStatus; size?: number }) {
  const animated = status === "speaking" || status === "alert";
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 bg-card ${RING[status]}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.55),
        lineHeight: 1,
        animation: animated ? "accentPulse 1.6s ease-in-out infinite" : undefined,
      }}
    >
      ♞
    </span>
  );
}
