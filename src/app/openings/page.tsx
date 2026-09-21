import Link from "next/link";
import { OPENINGS } from "@/content";
import { isCore } from "@/content/core";

const FAMILY_LABEL: Record<string, string> = {
  "1e4-e5": "1.e4 e5 — Open games",
  "1e4-other": "Other answers to 1.e4",
  "1d4": "1.d4 openings",
  flank: "Flank openings",
};

export default function OpeningsIndex() {
  const families = ["1e4-e5", "1e4-other", "1d4", "flank"] as const;
  return (
    <div className="pb-dock mx-auto w-full max-w-lg px-4 pt-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Openings</h1>
      <p className="mt-2 text-sm text-ink-soft">Ideas first, moves second. Read the plan, then go spar it.</p>
      {families.map((fam) => {
        const list = OPENINGS.filter((o) => o.family === fam);
        if (!list.length) return null;
        return (
          <section key={fam} className="mt-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">{FAMILY_LABEL[fam]}</h2>
            <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-card">
              {list.map((o) => (
                <Link key={o.id} href={`/openings/${o.id}/`} className="flex min-h-[56px] items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <div className="font-semibold leading-tight">
                      {o.name}
                      {isCore(o.id) && <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-strong">core</span>}
                    </div>
                    {/* The move list used to sit here. It is the least readable
                        thing we can show someone under 1200, and the same claim
                        is made on the home page — both pages now lead with
                        words. The moves are on the opening's own page. */}
                    <div className="truncate text-xs text-ink-soft">{o.pitch.split(/(?<=\.)\s/)[0]}</div>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{o.side}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
