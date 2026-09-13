import type { Opening } from "./types";

// Benko Gambit — original prose; lines are standard public theory.
export const benkoGambit: Opening = {
  id: "benko-gambit",
  name: "Benko Gambit",
  aliases: ["Volga","Volga Gambit"],
  eco: "A57–A59",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 c5 3.d5 b5",
  character:
    "One of the most positionally clear gambits in chess. Black offers the " +
    "b-pawn not for a quick attack but for permanent, low-risk pressure: the " +
    "a- and b-files swing open, and Black's rooks and fianchettoed bishop bear " +
    "down on White's queenside for the rest of the game. Even in endgames the " +
    "pressure lingers, which makes it remarkably safe for a gambit.",
  whitePlan:
    "Decide whether to accept the pawn. If you take, hold the extra material " +
    "while untangling your kingside pieces and neutralising the open-file and " +
    "long-diagonal pressure that Black gets in return.",
  blackPlan:
    "Give up the b-pawn for lasting initiative: open the a- and b-files, " +
    "fianchetto on g7, double rooks against White's queenside, and let the " +
    "pressure grind — comfortable even without the pawn.",
  middlegamePlan:
    "The Benko is the most positionally clear gambit in chess: you give the b-pawn for " +
    "permanent, low-risk pressure. Open the a- and b-files, fianchetto ...Bg7 on the long " +
    "diagonal, play ...d6 and ...Nbd7, then double rooks on the a- and b-files and pile onto " +
    "White's queenside (a2, b2, and the loose pawns). The beauty is that the pressure never " +
    "expires — even in an endgame a pawn down, White stays tied up. Don't chase a quick " +
    "attack; just squeeze the queenside until something drops.",
  ideaQuiz: {
    question: "What does Black get for the pawn in the Benko Gambit?",
    options: [
      "Permanent pressure on the open a- and b-files and the long diagonal — lasting even into endgames.",
      "A fast checkmate against the white king.",
      "An extra pawn back within a few moves by force.",
    ],
    correctIndex: 0,
    explanation:
      "Unlike most gambits, the Benko isn't about a quick attack — it's about lasting structural pressure. The half-open a- and b-files plus the g7-bishop bear down on White's queenside for the entire game, and uniquely the compensation persists into the endgame, which is why it's so safe to play a pawn down.",
  },
  tabiyaFen:
    "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4",
  structureDiagram: {
    fen: "rn1qkb1r/4pp1p/3p1np1/2pP4/4P3/2N5/PP3PPP/R1BQ1KNR w kq - 0 9",
    orientation: "black",
    caption:
      "The Benko Gambit sacrifices a wing pawn with ...b5 for lasting pressure: the open a- and b-files, the g7-bishop, and a queenside bind — long-term initiative that's worth the pawn.",
  },
  lines: [
    {
      label: "Accepted",
      summary: "You give the b-pawn for lasting pressure down the open a- and b-files and the long diagonal — comfort that even lingers into the endgame.",
      sans: [
        "d4", "Nf6", "c4", "c5", "d5", "b5",
        "cxb5", "a6", "bxa6", "Bxa6", "Nc3", "d6", "e4", "Bxf1", "Kxf1", "g6",
      ],
      notes: [
        "White claims the centre.",
        "A flexible developing move.",
        "Striking at the centre.",
        "Gaining space with a central wedge.",
        "The gambit: Black offers the b-pawn to open the queenside.",
        "Accepting the pawn.",
        "Offering a second pawn to blow the queenside wide open.",
        "Taking again; now the a- and b-files are Black's highways.",
        "Recapturing with the bishop, which already eyes White's king.",
        "Developing toward the centre.",
        "Solidifying the centre with the classic Benko structure.",
        "Reinforcing d5 and central space.",
        "Trading the bishop and forcing White's king to move.",
        "White must take with the king, losing the right to castle.",
        "Preparing the fianchetto to complete Black's pressure set-up.",
      ],
    },
    {
      label: "Declined (4.Nf3)",
      summary: "White waves off the pawn and develops; you snatch on c4 instead, then fianchetto and build the same active queenside piece play.",
      branch: { from: "Accepted", atPly: 6, tryMove: "Nf3" },
      sans: [
        "d4", "Nf6", "c4", "c5", "d5", "b5",
        "Nf3", "bxc4", "Nc3", "d6", "e4", "g6",
      ],
      notes: [
        "White claims the centre.",
        "Flexible development.",
        "The Benoni-style strike.",
        "The central wedge.",
        "The gambit offer.",
        "White declines the pawn for now and develops the knight.",
        "Black takes on c4, grabbing a pawn instead.",
        "Developing and eyeing the queenside.",
        "Solidifying with the typical structure.",
        "Building the broad pawn centre.",
        "Heading for the fianchetto and active piece play.",
      ],
    },
  ],
};
