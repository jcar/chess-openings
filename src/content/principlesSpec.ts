// Principles Mode: no opening at all. The same bot and coach, scored against
// the benchmarks every sub-800 player can hit in every game. Not part of the
// catalog (no theory page); `/principles` imports it directly.

import { Chess } from "chess.js";
import { PRINCIPLES } from "./principles";
import type { OpeningSpec } from "./spec";

export const PRINCIPLES_ID = "principles";

export const PRINCIPLES_SPEC: OpeningSpec = {
  id: PRINCIPLES_ID,
  name: "Principles Mode",
  side: "white",
  family: "1e4-e5",
  firstMoves: "",
  tabiyaFen: new Chess().fen(),
  pitch:
    "Forget lines. Get a centre pawn out, develop every knight and bishop once, castle by move 10, and never leave a piece hanging. " +
    "Do that in three games and you're ready for a real opening.",
  setup: {
    pieces: [
      { piece: "N", squares: ["f3", "e2", "h3"], why: "A knight toward the centre." },
      { piece: "N", squares: ["c3", "d2", "a3"], why: "The other knight out." },
      { piece: "B", squares: ["c4", "b5", "d3", "e2", "g2"], why: "The light bishop on a diagonal." },
      { piece: "B", squares: ["e3", "f4", "g5", "d2", "b2", "c1"], why: "The dark bishop developed — or at least not blocked in." },
    ],
    pawns: [],
    castle: "O-O",
    castleBy: 10,
  },
  ideas: PRINCIPLES,
  annotations: {},
  traps: [],
  modelGames: [],
  middlegamePlan:
    "Once everything is out and the king is castled: put your rooks on open files, look for undefended enemy pieces, and only push pawns that gain something.",
};
