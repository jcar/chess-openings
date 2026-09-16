"use client";

// Theory page: the ideas, the setup, and (M4) what you'll face at your level.
// One tap to "Spar this".

import Link from "next/link";
import type { OpeningSpec } from "@/content/spec";
import { Board } from "@/components/board/Board";
import { ArrowLeftIcon } from "@/components/icons";
import { OpponentReplies } from "@/components/OpponentReplies";

/** One heading treatment for the whole page. Every section used to be the same
 *  grey card with the same border, so nothing could be skimmed: the main idea,
 *  the traps and the move list all carried identical weight. */
function SectionHead({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "warn" }) {
  return (
    <h2 className={`flex items-center gap-2 font-display text-lg font-bold ${tone === "warn" ? "text-clay" : "text-ink"}`}>
      {children}
      <span aria-hidden className={`h-px flex-1 ${tone === "warn" ? "bg-clay/30" : "bg-line"}`} />
    </h2>
  );
}

export function TheoryView({ spec }: { spec: OpeningSpec }) {
  const pieceName = { N: "Knight", B: "Bishop", R: "Rook", Q: "Queen", K: "King" } as const;
  return (
    <div className="pb-dock mx-auto w-full max-w-lg">
      <header className="flex items-center gap-2 px-3 pt-2">
        <Link href="/openings" aria-label="All openings" className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-lg font-bold leading-tight">{spec.name}</h1>
          {/* The ECO code used to sit here. It is a librarian's index, and it
              earns nothing from a player rated under 1200 — it moves to the
              details further down, where it is labelled. */}
          <div className="truncate font-mono text-xs text-ink-soft">{spec.firstMoves}</div>
        </div>
      </header>

      <div className="mt-3 w-full">
        <Board fen={spec.tabiyaFen} orientation={spec.side} interactive={false} />
      </div>

      <div className="flex flex-col gap-4 px-4 pt-4">
        <p className="text-[17px] leading-relaxed text-ink">{spec.pitch}</p>

        <Link
          href={`/train/${spec.id}/`}
          className="flex min-h-[52px] items-center justify-center rounded-2xl bg-primary px-4 font-bold text-white active:scale-[0.99]"
        >
          Spar this opening
        </Link>

        {spec.setup.pieces.length > 0 && (
          <section className="flex flex-col gap-2">
            <SectionHead>Your setup</SectionHead>
            <ul className="flex flex-col divide-y divide-line text-sm">
              {spec.setup.pieces.map((p, i) => (
                <li key={i} className="flex justify-between gap-3 py-1.5">
                  <span>{pieceName[p.piece]}</span>
                  <span className="font-mono text-ink-soft">{p.squares.join(" / ")}</span>
                </li>
              ))}
              {spec.setup.pawns.length > 0 && (
                <li className="flex justify-between gap-3 py-1.5">
                  <span>Pawns</span>
                  <span className="font-mono text-ink-soft">{spec.setup.pawns.join(" ")}</span>
                </li>
              )}
              {spec.setup.castle !== "none" && (
                <li className="flex justify-between gap-3 py-1.5">
                  <span>Castle</span>
                  <span className="font-mono text-ink-soft">{spec.setup.castle === "either" ? "either side" : spec.setup.castle}</span>
                </li>
              )}
            </ul>
            {spec.setup.order?.map((r, i) => (
              <p key={i} className="rounded-xl border border-clay/40 bg-clay/5 px-3 py-2 text-sm leading-snug text-ink">
                <span className="font-bold text-clay">
                  <span className="font-mono">{r.before.split("|").join(" or ")}</span> before <span className="font-mono">{r.after}</span>.
                </span>{" "}
                {r.why}
              </p>
            ))}
          </section>
        )}

        <section>
          <SectionHead>Ideas</SectionHead>
          <div className="mt-2 flex flex-col gap-3">
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
          <figure className="m-0 flex flex-col gap-2">
            <SectionHead>The structure</SectionHead>
            <Board fen={spec.structureDiagram.fen} orientation={spec.structureDiagram.orientation ?? spec.side} interactive={false} arrows={spec.structureDiagram.arrows} />
            {spec.structureDiagram.caption && <figcaption className="text-sm leading-snug text-ink-soft">{spec.structureDiagram.caption}</figcaption>}
          </figure>
        )}

        {spec.traps.length > 0 && (
          <section>
            <SectionHead tone="warn">Traps</SectionHead>
            <div className="mt-2 flex flex-col gap-3">
              {spec.traps.map((t) => (
                <div key={t.name} className="rounded-2xl border border-clay/40 bg-clay/[0.06] p-4">
                  <div className="font-display text-base font-bold text-clay">{t.name}</div>
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
          <SectionHead>Model games</SectionHead>
          <div className="mt-1 flex flex-col divide-y divide-line">
            {spec.modelGames.map((g) => (
              <div key={g.label} className="py-3">
                <div className="font-semibold">{g.label}</div>
                <div className="mt-1 overflow-x-auto font-mono text-xs leading-relaxed text-ink-soft">{g.sans.join(" ")}</div>
                {g.summary && <p className="mt-1.5 text-sm leading-snug text-ink-soft">{g.summary}</p>}
              </div>
            ))}
          </div>
        </section>

        {spec.eco && (
          <p className="text-xs text-ink-soft">
            Catalogued as <span className="font-mono">{spec.eco}</span> in the Encyclopaedia of Chess Openings, the
            reference index most databases sort by.
          </p>
        )}
      </div>
    </div>
  );
}
