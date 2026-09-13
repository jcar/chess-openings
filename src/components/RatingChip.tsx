"use client";

// Small per-opening strength chip for the home screen (client-only store read).

import { useRating } from "@/lib/adapt/rating";

export function RatingChip({ openingId }: { openingId: string }) {
  const r = useRating();
  const own = r.perOpening[openingId];
  if (!own || own.games === 0) return null;
  return (
    <span className="rounded-full border border-line bg-bg px-2 py-0.5 font-mono text-[11px] text-ink-soft">
      {own.rating} · {own.games}g
    </span>
  );
}
