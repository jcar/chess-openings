import Link from "next/link";
import { coreOpenings, otherOpenings } from "@/content";
import type { OpeningSpec } from "@/content/spec";
import { RatingChip } from "@/components/RatingChip";
import { ResumeCard } from "@/components/ResumeCard";

/** The side you play, as a board square rather than a sentence. "You play White"
 *  set on every card was wider than the opening's own name. */
function SideMark({ side }: { side: OpeningSpec["side"] }) {
  const white = side === "white";
  return (
    <span
      aria-label={white ? "You play White" : "You play Black"}
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] text-[11px] font-bold"
      style={{
        background: white ? "var(--board-light)" : "var(--board-dark)",
        color: white ? "#16243b" : "#0b1424",
      }}
    >
      {white ? "W" : "B"}
    </span>
  );
}

function OpeningCard({ o }: { o: OpeningSpec }) {
  return (
    <Link
      href={`/train/${o.id}/`}
      className="block rounded-2xl border border-line bg-card p-4 shadow-[0_1px_0_rgba(255,255,255,0.04)] transition active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-display text-lg font-bold leading-tight">{o.name}</div>
          <div className="mt-1 font-mono text-xs text-ink-soft">{o.firstMoves}</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <RatingChip openingId={o.id} />
          <SideMark side={o.side} />
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-snug text-ink-soft">{o.pitch}</p>
    </Link>
  );
}

export default function Home() {
  const core = coreOpenings();
  const rest = otherOpenings();
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      <header className="mb-4">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Who do you want to spar?</h1>
        <p className="mt-1.5 text-sm text-ink-soft">The bot plays like your real opponents.</p>
      </header>

      <ResumeCard />

      <Link
        href="/principles/"
        className="mb-5 flex min-h-[56px] items-center gap-3 rounded-2xl border border-sage/40 bg-sage/10 px-4 py-3 active:scale-[0.99]"
      >
        <div className="min-w-0 flex-1">
          <div className="font-display text-[15px] font-bold leading-tight">Principles Mode</div>
          <p className="text-xs text-ink-soft">New to openings? Start with the ideas, not the lines.</p>
        </div>
        <span aria-hidden className="shrink-0 text-sage">→</span>
      </Link>

      <section aria-labelledby="core">
        <h2 id="core" className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
          Start here
        </h2>
        <div className="flex flex-col gap-3">
          {core.map((o) => (
            <OpeningCard key={o.id} o={o} />
          ))}
        </div>
      </section>

      <section aria-labelledby="more" className="mt-8">
        <h2 id="more" className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
          More openings
        </h2>
        <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-card">
          {rest.map((o) => (
            <Link key={o.id} href={`/train/${o.id}/`} className="flex min-h-[56px] items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <div className="font-semibold leading-tight">{o.name}</div>
                <div className="font-mono text-[11px] text-ink-soft">{o.firstMoves}</div>
              </div>
              <SideMark side={o.side} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
