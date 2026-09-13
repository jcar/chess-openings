"use client";

// Theory page: the ideas, the setup, and (M4) what you'll face at your level.
// One tap to "Spar this".

import Link from "next/link";
import type { OpeningSpec } from "@/content/spec";
import { Board } from "@/components/board/Board";
import { ArrowLeftIcon } from "@/components/icons";
import { OpponentReplies } from "@/components/OpponentReplies";

export function TheoryView({ spec }: { spec: OpeningSpec }) {
  const pieceName = { N: "Knight", B: "Bishop", R: "Rook", Q: "Queen", K: "King" } as const;
  return (
    <div className="mx-auto w-full max-w-lg pb-6">
      <header className="flex items-center gap-2 px-3 pt-2">
        <Link href="/openings" aria-label="All openings" className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-bold leading-tight">{spec.name}</h1>
          <div className="truncate font-mono text-xs text-ink-soft">
            {spec.firstMoves}
            {spec.eco ? ` · ${spec.eco}` : ""}
          </div>
        </div>
      </header>

      <div className="mt-3 w-full">
        <Board fen={spec.tabiyaFen} orientation={spec.side} interactive={false} />
      </div>

      <div className="flex flex-col gap-4 px-4 pt-4">
        <p className="text-[15px] leading-relaxed">{spec.pitch}</p>

        <Link
          href={`/train/${spec.id}/`}
          className="flex min-h-[52px] items-center justify-center rounded-2xl bg-primary px-4 font-bold text-white active:scale-[0.99]"
        >
          Spar this opening
        </Link>

        {spec.setup.pieces.length > 0 && (
          <section className="rounded-2xl border border-line bg-card p-4">
            <h2 className="font-display text-base font-bold">Your setup</h2>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm">
              {spec.setup.pieces.map((p, i) => (
                <li key={i} className="flex justify-between gap-3">
                  <span>{pieceName[p.piece]}</span>
                  <span className="font-mono text-ink-soft">{p.squares.join(" / ")}</span>
                </li>
              ))}
              {spec.setup.pawns.length > 0 && (
                <li className="flex justify-between gap-3">
                  <span>Pawns</span>
                  <span className="font-mono text-ink-soft">{spec.setup.pawns.join(" ")}</span>
                </li>
              )}
              {spec.setup.castle !== "none" && (
                <li className="flex justify-between gap-3">
                  <span>Castle</span>
                  <span className="font-mono text-ink-soft">{spec.setup.castle === "either" ? "either side" : spec.setup.castle}</span>
                </li>
              )}
            </ul>
            {spec.setup.order?.map((r, i) => (
              <p key={i} className="mt-2 text-sm text-ink-soft">
                <span className="font-mono text-ink">{r.before}</span> before <span className="font-mono text-ink">{r.after}</span> — {r.why}
              </p>
            ))}
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Ideas</h2>
          <div className="flex flex-col gap-3">
            {spec.ideas.map((idea) => (
              <div key={idea.id} className="rounded-2xl border border-line bg-card p-4">
                <div className="font-display text-base font-bold">{idea.title}</div>
                <p className="mt-1 text-[15px] leading-snug">{idea.oneLiner}</p>
                {idea.why && idea.why !== idea.oneLiner && <p className="mt-2 text-sm leading-snug text-ink-soft">{idea.why}</p>}
              </div>
            ))}
          </div>
        </section>

        <OpponentReplies spec={spec} />

        {spec.structureDiagram && (
          <section className="rounded-2xl border border-line bg-card p-3">
            <Board fen={spec.structureDiagram.fen} orientation={spec.structureDiagram.orientation ?? spec.side} interactive={false} arrows={spec.structureDiagram.arrows} />
            {spec.structureDiagram.caption && <p className="mt-3 px-1 text-sm leading-snug text-ink-soft">{spec.structureDiagram.caption}</p>}
          </section>
        )}

        {spec.traps.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Traps</h2>
            <div className="flex flex-col gap-3">
              {spec.traps.map((t) => (
                <div key={t.name} className="rounded-2xl border border-line bg-card p-4">
                  <div className="font-display text-base font-bold">{t.name}</div>
                  <div className="mt-1 font-mono text-xs text-ink-soft">{t.sans.join(" ")}</div>
                  <p className="mt-2 text-sm leading-snug">
                    <span className="font-semibold">The tell:</span> {t.tell}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-ink-soft">{t.why}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Model games</h2>
          <div className="flex flex-col gap-2">
            {spec.modelGames.map((g) => (
              <div key={g.label} className="rounded-2xl border border-line bg-card p-4">
                <div className="font-semibold">{g.label}</div>
                <div className="mt-1 font-mono text-xs leading-relaxed text-ink-soft">{g.sans.join(" ")}</div>
                {g.summary && <p className="mt-2 text-sm leading-snug text-ink-soft">{g.summary}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
