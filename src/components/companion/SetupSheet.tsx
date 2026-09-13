"use client";

// The eight goals behind "2/8". All of this was already computed and written —
// the header counted the goals and gave no way to read them, so the number named
// a score you could not inspect.

import type { OpeningSpec } from "@/content/spec";
import { PIECE_NAME } from "@/lib/coach/features";
import type { SetupProgress } from "@/lib/setup/progress";

interface Goal {
  label: string;
  why?: string;
  done: boolean;
}

export function buildGoals(spec: OpeningSpec, setup: SetupProgress): Goal[] {
  const goals: Goal[] = spec.setup.pieces.map((target) => {
    const scored = setup.pieces.find((p) => p.piece === target.piece && p.squares.join() === target.squares.join());
    const name: string = PIECE_NAME[target.piece.toLowerCase() as keyof typeof PIECE_NAME] ?? "piece";
    return {
      label: `${name.charAt(0).toUpperCase()}${name.slice(1)} to ${target.squares.join(" or ")}`,
      why: target.why,
      done: !!scored?.done,
    };
  });

  for (const pawn of setup.pawns) goals.push({ label: `Pawn on ${pawn.square}`, done: pawn.done });
  if (setup.castleWanted) {
    goals.push({
      label: spec.setup.castle === "O-O-O" ? "Castle queenside" : "Castle",
      why: spec.setup.castleBy ? `The plan wants the king tucked away by move ${spec.setup.castleBy}.` : undefined,
      done: setup.castled,
    });
  }
  return goals;
}

export function SetupSheet({ spec, setup, onClose }: { spec: OpeningSpec; setup: SetupProgress; onClose: () => void }) {
  const goals = buildGoals(spec, setup);
  const broken = setup.orderViolations[0];

  return (
    <div className="fixed inset-0 z-40 flex items-end" role="dialog" aria-label={`${spec.name} setup`}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative flex max-h-[80svh] w-full flex-col rounded-t-3xl border-t border-line bg-bg p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="mx-auto mb-3 h-1 w-10 shrink-0 rounded-full bg-line" />

        <div className="shrink-0">
          <h2 className="font-display text-lg font-bold">The setup</h2>
          <p className="mt-0.5 text-xs text-ink-soft">
            {setup.met} of {setup.total} in place. The order rule matters; the move order doesn&rsquo;t.
          </p>
        </div>

        {broken && (
          <div className="mt-3 shrink-0 rounded-2xl border border-clay/40 bg-card px-3 py-2">
            <div className="text-sm font-bold text-clay">
              {broken.after} came before {broken.before}
            </div>
            <p className="mt-1 text-xs leading-snug text-ink-soft">{broken.why}</p>
          </div>
        )}

        <ul className="mt-3 min-h-0 flex-1 divide-y divide-line overflow-y-auto">
          {goals.map((g, i) => (
            <li key={i} className="flex items-start gap-3 py-2.5">
              <span
                aria-hidden
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  g.done ? "bg-sage/20 text-sage" : "border border-line text-ink-soft"
                }`}
              >
                {g.done ? "✓" : ""}
              </span>
              <div className="min-w-0">
                <div className={`text-[15px] font-semibold ${g.done ? "text-ink" : "text-ink-soft"}`}>
                  {g.label}
                  <span className="sr-only">{g.done ? " — done" : " — not yet"}</span>
                </div>
                {g.why && <p className="mt-0.5 text-xs leading-snug text-ink-soft">{g.why}</p>}
              </div>
            </li>
          ))}
        </ul>

        <button type="button" onClick={onClose} className="mt-3 flex min-h-[52px] shrink-0 items-center justify-center rounded-2xl bg-primary font-bold text-white">
          Done
        </button>
      </div>
    </div>
  );
}
