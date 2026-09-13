import type { Opening } from "./types";

// King's Gambit — original prose; lines are standard public theory.
export const kingsGambit: Opening = {
  id: "kings-gambit",
  name: "King's Gambit",
  aliases: ["KGA"],
  eco: "C30–C39",
  family: "1e4-e5",
  trainerColor: "white",
  firstMoves: "1.e4 e5 2.f4",
  character:
    "One of the boldest and oldest openings: White offers a pawn on the very " +
    "second move to blow open the f-file and grab the centre. It is romantic, " +
    "attacking chess where the initiative matters more than material. Risky and " +
    "double-edged, it rewards courage and sharp calculation.",
  whitePlan:
    "Tempt Black into ...exf4, then build a big pawn centre and open the f-file " +
    "for the rook. Develop the kingside fast, often castle, and throw pieces at " +
    "Black's king before the extra pawn can be consolidated.",
  blackPlan:
    "Either grab the gambit pawn and try to hold it with ...g5, returning it " +
    "later for a good game, or simply decline with ...Bc5 and develop soundly " +
    "while White's kingside stays loose.",
  middlegamePlan:
    "The King's Gambit isn't about the pawn — it's about the open f-file, a big d4-centre, " +
    "and a lead in development aimed at f7. After ...exf4, build with d4 and Bc4, castle to " +
    "connect a rook to the f-file, and attack the black king before Black untangles the " +
    "kingside (Black's ...g5 holds the pawn but loosens his king). Initiative is the " +
    "currency: if you win the f4-pawn back, do it on your terms, never at the cost of " +
    "momentum — a King's Gambit played for material is a King's Gambit lost.",
  ideaQuiz: {
    question: "What does White get in return for the gambit pawn in the King's Gambit?",
    options: [
      "The open f-file, a big centre with d4, and a fast attack on f7 and the black king.",
      "An immediate forced checkmate.",
      "A safer king than Black's.",
    ],
    correctIndex: 0,
    explanation:
      "White sacrifices the f-pawn for activity, not safety — White's own king is, if anything, the more exposed one. The compensation is concrete: the half-open f-file for the rook, a pawn duo on d4/e4, and a developmental head start to throw at f7 before Black consolidates the extra pawn.",
  },
  tabiyaFen:
    "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2",
  structureDiagram: {
    fen: "rnbqkb1r/pppp1p1p/5n2/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    orientation: "white",
    arrows: [{ from: "e5", to: "f7" }],
    caption:
      "King's Gambit (Kieseritzky): a pawn down, but White has a big centre, the open f-file, and the powerful knight on e5 eyeing f7 — raw initiative as payment for the pawn.",
  },
  lines: [
    {
      label: "Kieseritzky Gambit",
      summary: "After Black holds the pawn with ...g5, you play h4 and Ne5 to leap into the centre and attack a king loosened by its own pawns.",
      sans: [
        "e4", "e5", "f4", "exf4", "Nf3", "g5",
        "h4", "g4", "Ne5", "Nf6",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "The gambit: offering the f-pawn to open lines and seize the centre.",
        "Black accepts the pawn.",
        "Developing and stopping the annoying ...Qh4+.",
        "Black grabs space and tries to hold the extra pawn.",
        "Striking at the pawn chain before it gets comfortable.",
        "The pawn advances, kicking the knight.",
        "The knight leaps into the centre — the Kieseritzky.",
        "Black develops and hits e4, keeping a tense, double-edged fight.",
      ],
    },
    {
      label: "King's Gambit Declined",
      summary: "Black declines with ...Bc5 to eye f2 and keep things solid, so you develop naturally toward f7 for a tense, more positional game.",
      branch: { from: "Kieseritzky Gambit", atPly: 3, tryMove: "Bc5" },
      sans: [
        "e4", "e5", "f4", "Bc5", "Nf3", "d6",
        "Nc3", "Nf6", "Bc4", "Nc6",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "The gambit offer.",
        "Declining: the bishop eyes f2 and discourages an easy fxe5.",
        "Developing and guarding against ...Qh4+.",
        "Solidly supporting e5 and opening the bishop.",
        "Developing the second knight and supporting the centre.",
        "Black develops naturally.",
        "Aiming the bishop at f7.",
        "Black completes development; a tense but more positional game.",
      ],
    },
  ],
};
