"use client";

// The wide-angle summary: what the last game was about (not a per-move badge
// list), what keeps recurring in this opening, and where you stand.

import Link from "next/link";
import { getOpening } from "@/content";
import { PRINCIPLES_SPEC } from "@/content/principlesSpec";
import { ArrowLeftIcon } from "@/components/icons";
import { useRating } from "@/lib/adapt/rating";
import { describeRecurring, recurring, useMistakes } from "@/lib/progress/mistakes";
import { lastSession, useSessions, type Session } from "@/lib/progress/sessions";

function bullets(s: Session): string[] {
  const out: string[] = [];
  const spec = s.openingId === "principles" ? PRINCIPLES_SPEC : getOpening(s.openingId);
  if (s.setupScore !== null) {
    const pct = Math.round(s.setupScore * 100);
    out.push(pct >= 80 ? `You reached your setup before the book ran out (${pct}%). That's the whole point of a system opening — keep doing it.` : `You reached ${pct}% of your setup before leaving the book. ${spec?.setup.pieces[0]?.why ?? "Finish the structure before starting a plan."}`);
  }
  if (s.benchmarks) out.push(`${s.benchmarks.passed} of ${s.benchmarks.total} benchmarks — ${s.benchmarks.passed >= 4 ? "that's a graduation-level game." : "aim for four."}`);
  if (s.worst) out.push(s.worst.drop >= 12 ? `The turning point was ${s.worst.san} on move ${s.worst.moveNo} (−${Math.round(s.worst.drop)}% winning chances). One move, not the whole game.` : `No big swings — your worst move only cost ${Math.round(s.worst.drop)}%. The game was decided by small things, which is where plans matter.`);
  if (s.accuracy !== null) out.push(`Move accuracy ${s.accuracy}%.${s.clean ? "" : " Not rated — you used take-backs or hints, which is what training is for."}`);
  return out.slice(0, 3);
}

export function SummaryView() {
  const sessions = useSessions();
  const mistakes = useMistakes();
  const rating = useRating();
  const last = lastSession(sessions);
  const spec = last ? (last.openingId === "principles" ? PRINCIPLES_SPEC : getOpening(last.openingId)) : null;
  const recur = last ? recurring(mistakes, last.openingId) : [];
  const own = last ? rating.perOpening[last.openingId] : undefined;

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-4">
      <header className="mb-4 flex items-center gap-2">
        <Link href="/" aria-label="Home" className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">Summary</h1>
      </header>

      {!last || !spec ? (
        <div className="rounded-2xl border border-line bg-card p-4 text-sm text-ink-soft">No games yet. Spar an opening and come back.</div>
      ) : (
        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border border-line bg-card p-4">
            <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-soft">Last game · {spec.name}</div>
            <div className="mt-1 font-display text-xl font-bold">{last.result === "win" ? "You won" : last.result === "loss" ? "You lost" : "Draw"} in {Math.ceil(last.plies / 2)} moves</div>
            <ul className="mt-3 flex flex-col gap-2">
              {bullets(last).map((b, i) => (
                <li key={i} className="flex gap-2 text-[15px] leading-snug">
                  <span className="text-primary-strong">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {recur.length > 0 && (
            <section className="rounded-2xl border border-amber/40 bg-amber/5 p-4">
              <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-amber">Keeps happening</div>
              <ul className="mt-2 flex flex-col gap-1.5">
                {recur.slice(0, 3).map((e) => (
                  <li key={`${e.tag}${e.square}`} className="text-[15px] leading-snug">
                    {describeRecurring(e)} <span className="font-mono text-xs text-ink-soft">({e.sample})</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="grid grid-cols-2 gap-3">
            <Stat label={`Your ${spec.name} rating`} value={own ? String(own.rating) : "—"} sub={own ? `${own.games} game${own.games === 1 ? "" : "s"}` : "3 clean games to start"} />
            <Stat label="Overall" value={String(rating.global.rating)} sub={`${rating.global.wins}W ${rating.global.losses}L ${rating.global.draws}D`} />
          </section>

          <div className="flex gap-3">
            <Link href={spec.id === "principles" ? "/principles/" : `/train/${spec.id}/`} className="flex min-h-[52px] flex-1 items-center justify-center rounded-2xl bg-primary px-4 font-bold text-white">
              Spar again
            </Link>
            <Link href="/" className="flex min-h-[52px] flex-1 items-center justify-center rounded-2xl border border-line px-4 font-semibold">
              Pick another
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-soft">{label}</div>
      <div className="mt-1 font-display text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-ink-soft">{sub}</div>
    </div>
  );
}
