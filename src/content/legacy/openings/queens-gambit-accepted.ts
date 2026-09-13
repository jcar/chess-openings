import type { Opening } from "./types";

// Queen's Gambit Accepted — original prose; lines are standard public theory.
export const queensGambitAccepted: Opening = {
  id: "queens-gambit-accepted",
  name: "Queen's Gambit Accepted",
  aliases: ["QGA"],
  eco: "D20–D29",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 d5 2.c4 dxc4",
  character:
    "Black accepts the gambit pawn on c4 — but the point is not greed. The " +
    "captured pawn is hard to hold, so Black treats it as a loan: grab it, " +
    "develop the pieces freely, and hand it back at the right moment in " +
    "exchange for an easy, active game and the freeing ...c5 break.",
  whitePlan:
    "Recapture the c4-pawn at leisure (usually with the bishop), build a broad " +
    "centre with e3 and pieces on natural squares, and use the extra central " +
    "space to press for the initiative.",
  blackPlan:
    "Don't cling to the extra pawn — develop quickly, complete kingside " +
    "castling, and strike at White's centre with a well-timed ...c5 (and often " +
    "...a6 to gain queenside space), giving the pawn back for free play.",
  middlegamePlan:
    "The QGA's golden rule: don't be greedy — the c4-pawn is a loan, not a prize. Give it " +
    "back, develop fast (...Nf6, ...e6, ...Be7, ...O-O), and hit the centre with ...c5. Gain " +
    "queenside space with ...a6 and ...b5 to kick White's c4-bishop, then fianchetto with " +
    "...Bb7. Once you've traded ...cxd4 and freed your game, you get easy, active piece play " +
    "against White's slightly loose centre. Clinging to the pawn (an early ...b5 to defend " +
    "c4) just loses time and walks into a4/b3 hits.",
  ideaQuiz: {
    question: "What's the correct attitude toward the extra c4-pawn in the QGA?",
    options: [
      "Treat it as a loan — give it back for fast development and the freeing ...c5 break.",
      "Defend it at all costs with ...b5 and ...a6.",
      "It guarantees a winning endgame a pawn up.",
    ],
    correctIndex: 0,
    explanation:
      "The c4-pawn can't be held without falling badly behind in development. The whole point of accepting is to deflect White's d-pawn, then return the c-pawn at leisure and emerge with free, active pieces and the ...c5 break. Hoarding it is the classic beginner's error.",
  },
  tabiyaFen:
    "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  structureDiagram: {
    fen: "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7",
    orientation: "black",
    arrows: [{ from: "c5", to: "d4" }],
    caption:
      "The QGA gives the c4-pawn straight back in return for free, easy development and a quick ...c5 strike at White's centre — active, classical piece play.",
  },
  lines: [
    {
      label: "Main Line",
      summary: "You take the c4-pawn as a loan, develop fast, then break with ...c5 and expand with ...a6 and ...b5 to chase White's bishop and free your game.",
      sans: [
        "d4", "d5", "c4", "dxc4", "Nf3", "Nf6",
        "e3", "e6", "Bxc4", "c5", "O-O", "a6",
      ],
      notes: [
        "White claims the centre and opens lines.",
        "Black challenges the centre at once.",
        "The Queen's Gambit — offering the c-pawn to deflect Black's d-pawn.",
        "Black accepts, planning to return the pawn for easy development.",
        "Developing and stopping any ...e5 freeing break for now.",
        "A natural developing move that eyes the centre.",
        "Opening the bishop's path to recapture on c4.",
        "Solidly supporting the centre and freeing the bishop.",
        "White regains the gambit pawn with a well-placed bishop.",
        "The thematic break — striking at White's centre immediately.",
        "King safety first.",
        "Gaining queenside space and preparing ...b5 to chase the bishop.",
      ],
      commonMistakes: [
        {
          ply: 7,
          move: "b5",
          why: "Don't cling to the pawn. Trying to hold c4 with 4...b5?? runs into 5.a4! c6 6.axb5 cxb5 7.b3! and the queenside falls apart, costing material. Give the pawn back: play ...e6, develop, and break with ...c5.",
        },
      ],
    },
    {
      label: "Central Variation (3.e4)",
      summary: "When White grabs the whole centre with e4, hit back at once with ...e5; trade on d4 and develop quickly to pressure White's loose central pawns.",
      branch: { from: "Main Line", atPly: 4, tryMove: "e4" },
      sans: [
        "d4", "d5", "c4", "dxc4", "e4", "e5",
        "Nf3", "exd4", "Bxc4", "Nc6",
      ],
      notes: [
        "White claims the centre.",
        "Black challenges it immediately.",
        "The gambit, deflecting the d-pawn.",
        "Black accepts the pawn.",
        "The ambitious central try — grabbing the whole centre at once.",
        "Black hits back in the centre before White gets settled.",
        "Developing and attacking the e5-pawn.",
        "Capturing rather than defending — opening the position.",
        "Regaining the gambit pawn with active development.",
        "Developing and pressing the loose d4-pawn.",
      ],
    },
  ],
};
