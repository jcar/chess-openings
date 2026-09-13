import Link from "next/link";
import { coreOpenings, otherOpenings } from "@/content";
import type { OpeningSpec } from "@/content/spec";
import { Chip } from "@/components/ui/Chip";
import { RatingChip } from "@/components/RatingChip";

function SideChip({ side }: { side: OpeningSpec["side"] }) {
  return <Chip tone={side === "white" ? "neutral" : "primary"}>{side === "white" ? "You play White" : "You play Black"}</Chip>;
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
        <div className="flex shrink-0 flex-col items-end gap-1">
          <SideChip side={o.side} />
          <RatingChip openingId={o.id} />
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
      <header className="mb-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Who do you want to spar?</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Pick an opening. The bot plays like your real opponents, and the coach explains the ideas as you go.
        </p>
      </header>

      <Link href="/principles/" className="mb-6 block rounded-2xl border border-sage/40 bg-sage/10 p-4 active:scale-[0.99]">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-sage">New to openings?</div>
        <div className="mt-1 font-display text-lg font-bold leading-tight">Principles Mode</div>
        <p className="mt-1 text-sm leading-snug text-ink-soft">No lines to learn. Develop, castle, don&apos;t hang pieces — scored live. Graduate to a real opening in three games.</p>
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
              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{o.side}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
