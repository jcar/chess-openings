import type { Opening } from "./types";

// Slav Defence — original prose; lines are standard public theory.
export const slavDefence: Opening = {
  id: "slav-defence",
  name: "Slav Defence",
  eco: "D10–D19",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 d5 2.c4 c6",
  character:
    "As solid as the Queen's Gambit Declined, but with a twist: Black supports " +
    "d5 with ...c6 instead of ...e6, leaving the light-squared bishop free to " +
    "develop actively to f5 or g4 before locking in the centre. That blend of " +
    "rock-solid structure and an active bishop has made it a favourite of " +
    "world champions.",
  whitePlan:
    "Develop the pieces, decide whether to allow ...dxc4 and chase the pawn " +
    "back with a4 and e3/Bxc4, and use the central space to press for an edge.",
  blackPlan:
    "Keep d5 supported by ...c6, get the light bishop out to f5 (or g4) before " +
    "playing ...e6, and complete development comfortably while staying solid.",
  middlegamePlan:
    "The Slav's edge over the QGD is that your light-squared bishop gets OUT to f5 or g4 " +
    "before ...e6 ever locks it in — so you never own a bad bishop. The scheme: support d5 " +
    "with ...c6, develop the bishop actively, then ...e6, ...Be7 (or ...Bb4), ...O-O, " +
    "...Nbd7. If you take on c4, don't cling to the pawn with ...b5 (a4 hits it) — give it " +
    "back and enjoy free development. Free the game with a timely ...c5 or ...e5 and steer " +
    "toward a sound, comfortable middlegame.",
  ideaQuiz: {
    question: "What does the Slav (...c6) do better than the Queen's Gambit Declined (...e6)?",
    options: [
      "It keeps the light-squared bishop free to reach f5/g4 before ...e6 — so no bad bishop.",
      "It wins the c4-pawn by force.",
      "It launches a quick kingside attack.",
    ],
    correctIndex: 0,
    explanation:
      "Both defences prop up d5, but the QGD's ...e6 shuts in the c8-bishop. The Slav plays ...c6 instead, so that bishop can come out to f5 or g4 first; only then ...e6. Same rock-solid structure, but with Black's problem piece solved — that's why it's a world-champion favourite.",
  },
  tabiyaFen:
    "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  structureDiagram: {
    fen: "rn1qk2r/pp3ppp/2p1pn2/5b2/PbBP4/2N1PN2/1P3PPP/R1BQK2R w KQkq - 1 8",
    orientation: "black",
    caption:
      "The Slav supports d5 with ...c6 instead of ...e6 — so the light-squared bishop stays free. Black grabs c4, develops the bishop to f5, and reaches a solid, well-coordinated game.",
  },
  lines: [
    {
      label: "Main line (4...dxc4)",
      summary: "You support d5 with ...c6, get the bishop out to f5, then take on c4 and give the pawn back for comfortable, free development.",
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4",
        "a4", "Bf5", "e3", "e6", "Bxc4", "Bb4",
      ],
      notes: [
        "White takes the centre.",
        "Black contests it.",
        "The Queen's Gambit.",
        "The Slav: ...c6 supports d5 and keeps the c8-bishop's diagonal open.",
        "Developing and eyeing the centre.",
        "Developing and guarding d5.",
        "Adding pressure to d5.",
        "Grabbing the pawn now that the bishop's diagonal is clear.",
        "Stopping ...b5 and preparing to round up the c4-pawn.",
        "The whole point: the bishop gets out actively before ...e6.",
        "Opening lines and preparing to recapture on c4.",
        "Now ...e6 is safe — the bishop is already outside the chain.",
        "Regaining the pawn with a healthy development edge.",
        "Pinning the knight and fighting for the centre.",
      ],
      commonMistakes: [
        {
          ply: 9,
          move: "b5",
          why: "Don't try to hold the gambit pawn. After 6.a4, the move 6...b5?? 7.axb5 cxb5 8.Nxb5 just drops material and rips open the a-file onto your rook. The Slav cheerfully gives c4 back: develop the bishop with ...Bf5 and finish your easy game.",
        },
      ],
    },
    {
      label: "Exchange Variation",
      summary: "White clarifies into a symmetrical structure for a quiet game; develop naturally and aim for a sound, balanced middlegame with easy equality.",
      branch: { from: "Main line (4...dxc4)", atPly: 4, tryMove: "cxd5" },
      sans: [
        "d4", "d5", "c4", "c6", "cxd5", "cxd5", "Nc3", "Nf6",
        "Nf3", "Nc6", "Bf4",
      ],
      notes: [
        "White takes the centre.",
        "Black contests it.",
        "The Queen's Gambit.",
        "The Slav set-up.",
        "The Exchange: clarifying into a symmetrical structure.",
        "Recapturing, restoring the balance.",
        "Developing toward the centre.",
        "Developing and guarding d5.",
        "Natural development.",
        "Developing actively to pressure d4.",
        "Developing the bishop to its best diagonal — a quiet, solid line.",
      ],
    },
  ],
};
