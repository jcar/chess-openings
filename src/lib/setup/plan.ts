// "Am I still playing my opening correctly?" — answered from the opening's own
// setup rather than from whether the position happens to sit in our baked tree.
//
// This is the distinction that matters to a player: the book running out is a
// fact about our data coverage, while breaking the setup's own order rule is a
// fact about their chess. Only the second is worth putting on screen.

import type { SetupProgress } from "./progress";

export type PlanState = "on_plan" | "off_plan" | "complete";

export interface PlanStatus {
  state: PlanState;
  /** Short enough for the header. */
  label: string;
  /** The rule that was broken, when one was. */
  detail?: string;
  met: number;
  total: number;
}

export function planStatus(setup: SetupProgress): PlanStatus {
  const { met, total } = setup;
  if (!total) return { state: "on_plan", label: "on plan", met, total };

  const broken = setup.orderViolations[0];
  if (broken) {
    return {
      state: "off_plan",
      label: "off plan",
      detail: `${broken.after} came before ${broken.before}`,
      met,
      total,
    };
  }
  if (met >= total) return { state: "complete", label: "setup done", met, total };
  return { state: "on_plan", label: "on plan", met, total };
}

/** What's still missing, for the end-of-game report. */
export function missingGoals(setup: SetupProgress): string[] {
  const out: string[] = [];
  for (const p of setup.pieces) if (!p.done) out.push(`${p.piece} never reached ${p.squares.join(" or ")}`);
  for (const p of setup.pawns) if (!p.done) out.push(`no pawn on ${p.square}`);
  if (setup.castleWanted && !setup.castled) out.push("never castled");
  return out;
}
