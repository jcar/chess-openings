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
    // This used to paste the first setup piece's description onto the end of the
    // sentence, so the London read "...before leaving the book. The London
    // bishop. Out to f4 before e3..." — two unrelated thoughts glued together.
    const goals = spec?.setup.pieces.length ?? 0;
    out.push(
      pct >= 80
        ? `You reached your setup before the book ran out, ${pct}% of it. That is the whole point of a system opening, so keep doing it.`
        : `You reached ${pct}% of your setup before leaving the book.${goals ? ` The other ${goals > 1 ? "pieces" : "piece"} of the structure are what make the plan work, so finish it before starting one.` : ""}`,
    );
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
  // The page kept a history and never showed it, which made "Summary" a
  // last-game page wearing a broader name.
  const earlier = sessions.recent.slice(1, 9);

  return (
    <div className="pb-dock mx-auto w-full max-w-lg px-4 pt-4">
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

          {earlier.length > 0 && (
            <section>
              <h2 className="mb-1 flex items-center gap-2 font-display text-base font-bold">
                Before that
                <span aria-hidden className="h-px flex-1 bg-line" />
              </h2>
              <ul className="flex flex-col divide-y divide-line">
                {earlier.map((g, i) => (
                  <PastGame key={`${g.at}-${i}`} game={g} />
                ))}
              </ul>
            </section>
          )}

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

const RESULT = {
  win: { label: "Won", tone: "text-sage" },
  loss: { label: "Lost", tone: "text-clay" },
  draw: { label: "Drew", tone: "text-ink-soft" },
} as const;

function PastGame({ game }: { game: Session }) {
  const spec = game.openingId === "principles" ? PRINCIPLES_SPEC : getOpening(game.openingId);
  const r = RESULT[game.result as keyof typeof RESULT] ?? RESULT.draw;
  const href = game.openingId === "principles" ? "/principles/" : `/train/${game.openingId}/`;
  return (
    <li>
      <Link href={href} className="flex min-h-[56px] items-center gap-3 py-2.5">
        <span className={`w-11 shrink-0 text-sm font-bold ${r.tone}`}>{r.label}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold leading-tight">{spec?.name ?? game.openingId}</span>
          <span className="block text-xs text-ink-soft">
            {Math.ceil(game.plies / 2)} moves
            {game.accuracy !== null ? ` · ${game.accuracy}% accuracy` : ""}
            {game.worst ? ` · worst ${game.worst.san}` : ""}
            {game.clean ? "" : " · not rated"}
          </span>
        </span>
        <span aria-hidden className="shrink-0 text-ink-soft">›</span>
      </Link>
    </li>
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
