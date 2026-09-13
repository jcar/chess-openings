// Adapts a synced ChessHall `Opening` (linear lines + captions) into an
// `OpeningSpec` so the 21 non-core openings are playable on day one.
//
// Facts (moves, FENs) carry over verbatim. Prose is reused as-is; the adapter
// cannot invent a `setup` or idea triggers, so legacy specs coach more thinly
// (the coach falls back to feature tags + universal principles).

import { Chess } from "chess.js";
import type { LegacyOpening } from "@/content/legacy";
import type { Annotation, IdeaCard, OpeningSpec, Side } from "@/content/spec";
import { epd, type EPD } from "@/lib/book/key";

function parseFirstMoves(firstMoves: string): string[] {
  return firstMoves
    .split(/\s+/)
    .map((tok) => tok.replace(/^\d+\.(\.\.)?/, ""))
    .filter((tok) => tok.length > 0);
}

function userToMove(fen: string, side: Side): boolean {
  return (fen.split(" ")[1] === "w" ? "white" : "black") === side;
}

function checkpointKey(o: LegacyOpening, side: Side): EPD | null {
  if (userToMove(o.tabiyaFen, side)) return epd(o.tabiyaFen);
  const tabiya = epd(o.tabiyaFen);
  const main = o.lines.find((l) => !l.startFen);
  if (!main) return null;
  const game = new Chess();
  let passed = false;
  for (const san of main.sans) {
    if (epd(game.fen()) === tabiya) passed = true;
    if (passed && userToMove(game.fen(), side)) return epd(game.fen());
    try {
      game.move(san);
    } catch {
      return null;
    }
  }
  return passed && userToMove(game.fen(), side) ? epd(game.fen()) : null;
}

export function adaptLegacy(o: LegacyOpening): OpeningSpec {
  const side: Side = o.trainerColor;
  const annotations: Record<EPD, Annotation> = {};

  const at = (key: EPD): Annotation => (annotations[key] ??= {});

  for (const line of o.lines) {
    if (line.startFen) continue; // keep "from the standard start" invariant
    const game = new Chess();
    for (let i = 0; i < line.sans.length; i++) {
      const before = epd(game.fen());
      const mover: Side = game.turn() === "w" ? "white" : "black";
      const san = line.sans[i];
      const note = line.notes?.[i];

      if (mover === side) {
        const a = at(before);
        if (note && !a.yourMove) a.yourMove = { san, why: note };
        for (const m of line.commonMistakes ?? []) {
          if (m.ply === i) {
            a.mistakes ??= [];
            if (!a.mistakes.some((x) => x.san === m.move)) a.mistakes.push({ san: m.move, why: m.why });
          }
        }
      } else if (note) {
        const a = at(before);
        a.replies ??= [];
        if (!a.replies.some((r) => r.san === san)) {
          a.replies.push({ san, verdict: "good", howToAnswer: line.sans[i + 1] ?? "", why: note });
        }
      }

      try {
        game.move(san);
      } catch {
        break; // validator reports illegal legacy SAN; don't crash the app
      }
    }
  }

  if (o.ideaQuiz) {
    // A checkpoint pauses before the USER's move, so it must sit on a position
    // where the user is to move. Prefer the tabiya; otherwise the first
    // user-to-move position at or after the tabiya along the main line.
    const key = checkpointKey(o, side);
    if (key) {
      at(key).checkpoint = {
        question: o.ideaQuiz.question,
        options: o.ideaQuiz.options,
        correctIndex: o.ideaQuiz.correctIndex,
        explanation: o.ideaQuiz.explanation,
      };
    }
  }

  const ideas: IdeaCard[] = [
    {
      id: `${o.id}-your-plan`,
      title: side === "white" ? "Your plan as White" : "Your plan as Black",
      oneLiner: side === "white" ? o.whitePlan : o.blackPlan,
      why: o.character,
    },
    {
      id: `${o.id}-their-plan`,
      title: side === "white" ? "What Black wants" : "What White wants",
      oneLiner: side === "white" ? o.blackPlan : o.whitePlan,
      why: "Knowing the opponent's goal tells you which of their moves are real threats and which are noise.",
    },
  ];
  if (o.middlegamePlan) {
    ideas.push({
      id: `${o.id}-middlegame`,
      title: "When the book runs out",
      oneLiner: o.middlegamePlan,
      why: "The opening is over when both sides are developed; this is what to do next.",
      trigger: { kind: "book_end" },
    });
  }

  return {
    id: o.id,
    name: o.name,
    aliases: o.aliases,
    eco: o.eco,
    side,
    family: o.family,
    firstMoves: o.firstMoves,
    tabiyaFen: o.tabiyaFen,
    pitch: o.character,
    setup: { pieces: [], pawns: [], castle: "either" },
    ideas,
    annotations,
    traps: [],
    modelGames: o.lines
      .filter((l) => !l.startFen)
      .map((l) => ({ label: l.label, sans: l.sans, summary: l.summary ?? "" })),
    middlegamePlan: o.middlegamePlan ?? (side === "white" ? o.whitePlan : o.blackPlan),
    structureDiagram: o.structureDiagram,
    legacy: true,
  };
}

/** SAN tokens of the defining moves (used to seed the bake). */
export function definingSans(spec: OpeningSpec): string[] {
  return parseFirstMoves(spec.firstMoves);
}
