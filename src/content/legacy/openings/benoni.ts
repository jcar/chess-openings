import type { Opening } from "./types";

// Benoni Defence — original prose; lines are standard public theory.
export const benoni: Opening = {
  id: "benoni",
  name: "Benoni Defence",
  aliases: ["Modern Benoni"],
  eco: "A60–A79",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 c5 3.d5 e6",
  character:
    "A fighting, asymmetrical defence for players who hate dull positions. " +
    "Black willingly hands White more space in the centre, accepting a " +
    "cramped but spring-loaded position. In return Black gets a queenside pawn " +
    "majority, a powerful fianchettoed bishop, and the dynamic breaks ...c5 " +
    "(already played) and ...b5 to generate counterplay.",
  whitePlan:
    "Use the extra central space: keep the d5-pawn as a wedge, develop " +
    "harmoniously, and try to clamp down on Black's queenside before the " +
    "counterplay gets rolling.",
  blackPlan:
    "Embrace the imbalance: fianchetto on g7, push the queenside majority with " +
    "...a6 and ...b5, and use the half-open e-file and active pieces to make " +
    "the cramped position bite back.",
  middlegamePlan:
    "The Benoni is a deliberate imbalance: you give White central space for a queenside pawn " +
    "majority, a monster g7-bishop, and the half-open e-file. The plan is dynamite, not " +
    "defence — fianchetto, castle, then roll the majority with ...a6 and ...b5 (the thematic " +
    "break), put rooks on the b- and e-files, and pressure e4. Keep the pieces active around " +
    "the d6/c5 chain. White's danger is a central e4–e5 push or an f4 storm; blunt it with " +
    "...Re8 and ...Na6–c7, then counterpunch on the queenside where you're stronger.",
  ideaQuiz: {
    question: "Black is cramped in the Benoni. Where does the counterplay come from?",
    options: [
      "The queenside majority and the ...b5 break, plus the g7-bishop and half-open e-file.",
      "A direct kingside mating attack straight from the opening.",
      "Trading queens and grinding the cramped position to a draw.",
    ],
    correctIndex: 0,
    explanation:
      "The Benoni trades space for dynamism. Black's assets are all on the queenside and the long diagonal: a 3-vs-2 majority that rolls with ...a6/...b5, the fianchettoed bishop hitting d4, and rooks on the open b- and e-files. The cramp is the price; the queenside break is the payoff.",
  },
  tabiyaFen:
    "rnbqkb1r/pp1p1ppp/4pn2/2pP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4",
  structureDiagram: {
    fen: "rnbqk2r/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 2 8",
    orientation: "black",
    arrows: [{ from: "b7", to: "b5" }],
    caption:
      "The Modern Benoni trades a space disadvantage for dynamism: a queenside pawn majority and the ...b5 break, the fianchettoed bishop on g7, and pressure down the half-open e-file.",
  },
  lines: [
    {
      label: "Modern Benoni",
      summary: "You trade space for dynamism: a queenside majority that rolls with ...a6 and ...b5, the monster g7-bishop, and the half-open e-file.",
      sans: [
        "d4", "Nf6", "c4", "c5", "d5", "e6",
        "Nc3", "exd5", "cxd5", "d6", "e4", "g6", "Nf3", "Bg7",
      ],
      notes: [
        "White claims the centre.",
        "A flexible developing move.",
        "Striking at the centre right away — the Benoni's calling card.",
        "White pushes past, gaining space with a central wedge.",
        "Challenging the d5-pawn and opening the e-file.",
        "Developing and supporting the centre.",
        "Trading to fix the structure and open the e-file for Black.",
        "Recapturing; White keeps the spatial edge.",
        "Setting up the classic Benoni pawn chain with d6 and c5.",
        "Building the broad pawn front — extra space for White.",
        "Preparing the all-important fianchetto.",
        "Developing toward the centre and kingside.",
        "The key Benoni bishop reaches g7, raking the long diagonal.",
      ],
    },
    {
      label: "Fianchetto Variation",
      summary: "White meets your setup with g3 and a fianchetto of his own, blunting the long diagonal, so you press the queenside majority patiently from there.",
      branch: { from: "Modern Benoni", atPly: 10, tryMove: "Nf3" },
      sans: [
        "d4", "Nf6", "c4", "c5", "d5", "e6",
        "Nc3", "exd5", "cxd5", "d6", "Nf3", "g6", "g3", "Bg7",
      ],
      notes: [
        "White claims the centre.",
        "Flexible development.",
        "The Benoni strike at the centre.",
        "Gaining space with the wedge.",
        "Challenging d5 and opening the e-file.",
        "Developing and supporting.",
        "Trading to fix the structure.",
        "Recapturing with the spatial edge.",
        "The classic Benoni chain.",
        "Developing the knight before deciding the kingside plan.",
        "Preparing the fianchetto.",
        "White chooses g3, heading for a Fianchetto set-up of his own.",
        "Black's bishop takes the long diagonal — fianchetto against fianchetto.",
      ],
    },
  ],
};
