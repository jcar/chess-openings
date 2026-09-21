import Link from "next/link";
import { coreOpenings, otherOpenings } from "@/content";
import type { OpeningSpec } from "@/content/spec";
import { RatingChip } from "@/components/RatingChip";
import { ResumeCard } from "@/components/ResumeCard";

/** The opening's own first sentence, in full. Every spec carries two sentences
 *  written for a player under 1200; the card used to lead with the move list in
 *  monospace and clip this to two lines, which is backwards. Notation is a
 *  lookup key, not a description. */
const summary = (o: OpeningSpec) => o.pitch.split(/(?<=\.)\s/)[0];

function OpeningCard({ o }: { o: OpeningSpec }) {
  return (
    <Link
      href={`/train/${o.id}/`}
      className="block rounded-2xl border border-line bg-card p-4 shadow-[0_1px_0_rgba(255,255,255,0.04)] transition active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="font-display text-lg font-bold leading-tight">{o.name}</div>
        <RatingChip openingId={o.id} />
      </div>
      <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{summary(o)}</p>
    </Link>
  );
}

/** Which side you play is the only question behind "what should I pick?", so it
 *  organises the page instead of being a badge on every card. */
function SideSection({ heading, list }: { heading: string; list: OpeningSpec[] }) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{heading}</h2>
      <div className="flex flex-col gap-3">
        {list.map((o) => (
          <OpeningCard key={o.id} o={o} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const core = coreOpenings();
  const rest = otherOpenings();
  return (
    <div className="pb-dock mx-auto w-full max-w-lg px-4 pt-6">
      <header className="mb-4">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Who do you want to spar?</h1>
        <p className="mt-1.5 text-sm text-ink-soft">The bot plays like your real opponents.</p>
      </header>

      <ResumeCard />

      <Link
        href="/principles/"
        className="mb-2 flex min-h-[56px] items-center gap-3 rounded-2xl border border-sage/40 bg-sage/10 px-4 py-3 active:scale-[0.99]"
      >
        <div className="min-w-0 flex-1">
          <div className="font-display text-[15px] font-bold leading-tight">Principles Mode</div>
          <p className="text-xs text-ink-soft">New to openings? Start with the ideas, not the lines.</p>
        </div>
        <span aria-hidden className="shrink-0 text-sage">→</span>
      </Link>

      <SideSection heading="When you're White" list={core.filter((o) => o.side === "white")} />
      <SideSection heading="When you're Black" list={core.filter((o) => o.side === "black")} />

      {/* Home answers "what should I play?". The rest of the catalogue is one
          tap away rather than folded into a list of bare titles. */}
      <Link href="/openings/" className="mt-6 flex min-h-[56px] items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 active:scale-[0.99]">
        <div className="min-w-0 flex-1">
          <div className="font-semibold leading-tight">Browse all {core.length + rest.length} openings</div>
          <p className="text-xs text-ink-soft">Including {rest.length} with lighter coaching.</p>
        </div>
        <span aria-hidden className="shrink-0 text-ink-soft">›</span>
      </Link>
    </div>
  );
}
