import Link from "next/link";
import { OPENINGS } from "@/content";
import { isCore } from "@/content/core";
import type { OpeningSpec } from "@/content/spec";

/** Openings are split by how much the trainer can actually coach, which is the
 *  only difference that changes what happens when you play one. It is NOT a
 *  ranking: the Sicilian carries more authored positions than anything in the
 *  coached ten, and sits in the lighter group only because nobody has written
 *  its setup goals yet. */
const summary = (o: OpeningSpec) => o.pitch.split(/(?<=\.)\s/)[0];

function Row({ o }: { o: OpeningSpec }) {
  return (
    <Link key={o.id} href={`/openings/${o.id}/`} className="flex min-h-[64px] items-start gap-3 px-4 py-3">
      <span
        aria-label={o.side === "white" ? "You play White" : "You play Black"}
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] text-[11px] font-bold"
        style={{ background: o.side === "white" ? "var(--board-light)" : "var(--board-dark)", color: "#16243b" }}
      >
        {o.side === "white" ? "W" : "B"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-tight">{o.name}</span>
        {/* In full. Clamping put us right back to cutting a sentence mid-word,
            which is the thing that started this. */}
        <span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">{summary(o)}</span>
      </span>
    </Link>
  );
}

function Group({ title, blurb, list }: { title: string; blurb: string; list: OpeningSpec[] }) {
  const ordered = [...list].sort((a, b) => (a.side === b.side ? a.name.localeCompare(b.name) : a.side === "white" ? -1 : 1));
  return (
    <section className="mt-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold">
        {title}
        <span className="font-sans text-xs font-semibold text-ink-soft">{list.length}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </h2>
      <p className="mb-3 mt-1 text-sm leading-snug text-ink-soft">{blurb}</p>
      <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-card">
        {ordered.map((o) => (
          <Row key={o.id} o={o} />
        ))}
      </div>
    </section>
  );
}

export default function OpeningsIndex() {
  const coached = OPENINGS.filter((o) => isCore(o.id));
  const lighter = OPENINGS.filter((o) => !isCore(o.id));
  return (
    <div className="pb-dock mx-auto w-full max-w-lg px-4 pt-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Openings</h1>
      <p className="mt-2 text-sm text-ink-soft">Ideas first, moves second. Read the plan, then go spar it.</p>

      <Group
        title="Coached in depth"
        blurb="A setup to follow with the plan tracked move by move, the order rules that decide the opening, and the traps worth knowing."
        list={coached}
      />
      <Group
        title="Lighter coaching"
        blurb="Real theory and the same opponent, but no setup plan to track and no traps flagged. Not lesser openings — these simply haven't been written up to the same depth yet."
        list={lighter}
      />
    </div>
  );
}
