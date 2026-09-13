import type { Opening } from "./types";

// Petroff Defence — original prose; lines are standard public theory.
export const petroff: Opening = {
  id: "petroff",
  name: "Petroff Defence",
  aliases: ["Petrov","Russian Defence","Russian Game"],
  eco: "C42–C43",
  family: "1e4-e5",
  trainerColor: "black",
  firstMoves: "1.e4 e5 2.Nf3 Nf6",
  character:
    "Instead of defending the e5-pawn, Black immediately counterattacks White's " +
    "e4-pawn with 2...Nf6 — meeting a threat with a threat. The result is " +
    "famously solid and symmetrical, a favourite of players who want a reliable, " +
    "low-risk answer to 1.e4. It trades early fireworks for clarity and balance.",
  whitePlan:
    "Grab the e5-pawn, then retreat the knight in good order; build a small " +
    "central edge with d4 and natural development, and try to make Black's " +
    "symmetry slightly passive.",
  blackPlan:
    "Recover the pawn by counterattacking e4, develop quickly and harmoniously, " +
    "and reach a sound, symmetrical middlegame where there are no weaknesses to " +
    "target.",
  middlegamePlan:
    "The Petroff is about harmony and zero weaknesses. After you regain the pawn with " +
    "...Nxe4, don't cling to that knight — be ready to retreat it (...Nf6/...Nd6) the moment " +
    "it's challenged. Develop everything to natural squares (...Be7 or ...Bd6, ...O-O, " +
    "...Nc6, an active ...Bf5 or ...Bg4), contest the open e-file with a rook, and steer " +
    "toward a sound, symmetrical position where White's first-move edge simply fizzles. " +
    "Accuracy and patience, not counterattack, win Petroff games.",
  ideaQuiz: {
    question: "After 3.Nxe5, why does Black play 3...d6 first instead of grabbing 3...Nxe4 at once?",
    options: [
      "3...Nxe4?? walks into 4.Qe2! — the knight is loose and 4...Nf6?? 5.Nc6+ even wins the queen.",
      "To open the light-squared bishop's diagonal before recapturing.",
      "To prepare quick queenside castling.",
    ],
    correctIndex: 0,
    explanation:
      "The signature Petroff trap. Recapturing immediately with 3...Nxe4?? loses, because 4.Qe2 pins/skewers along the e-file and threatens the knight; if Black unpins with 4...Nf6?? then 5.Nc6+ forks king and queen. So Black kicks the e5-knight first with 3...d6, and only then plays ...Nxe4 safely.",
  },
  tabiyaFen:
    "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
  structureDiagram: {
    fen: "rnbq1rk1/ppp1bppp/8/3p4/3Pn3/3B1N2/PPP2PPP/RNBQ1RK1 w - - 4 8",
    orientation: "black",
    caption:
      "The Petroff is Black's rock-solid equalizer: instead of defending e5, Black counter-attacks e4 with ...Nf6, mirrors White's setup, and trades into a comfortable, symmetrical game.",
  },
  lines: [
    {
      label: "Classical Variation",
      summary: "You kick the e5-knight before recapturing on e4, then develop harmoniously into a sound, symmetrical position with no weaknesses to target.",
      sans: [
        "e4", "e5", "Nf3", "Nf6", "Nxe5", "d6",
        "Nf3", "Nxe4", "d4", "d5", "Bd3", "Be7",
        "O-O", "O-O",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "Attacking e5.",
        "The Petroff move: counterattacking e4 rather than defending e5.",
        "White grabs the pawn — but the knight is now loose.",
        "Kicking the knight back before recapturing on e4.",
        "Retreating in good order (taking on f7 would be a famous trap).",
        "Now Black regains the pawn, restoring the material balance.",
        "Striking in the centre and gaining space.",
        "Black supports the e4-knight and stakes a central claim.",
        "Developing and challenging the strong knight on e4.",
        "Calm development, preparing to castle.",
        "King safety.",
        "Black castles too — a balanced, healthy position for both sides.",
      ],
      commonMistakes: [
        {
          ply: 5,
          move: "Nxe4",
          why: "The Petroff trap! Grabbing the pawn at once with 3...Nxe4?? runs into 4.Qe2 — the knight is loose and the e-file pins it. Worse, 4...Nf6?? 5.Nc6+ forks king and queen. Kick the e5-knight first with 3...d6, THEN recapture on e4 safely.",
        },
      ],
    },
    {
      label: "Steinitz Variation (3.d4)",
      summary: "When White strikes with d4 instead of grabbing e5, you hit back with ...d5 and ...exd6 to reach a lively, roughly balanced middlegame.",
      branch: { from: "Classical Variation", atPly: 4, tryMove: "d4" },
      sans: [
        "e4", "e5", "Nf3", "Nf6", "d4", "exd4",
        "e5", "Ne4", "Qxd4", "d5", "exd6", "Nxd6",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "Attacking e5.",
        "The Petroff counterattack on e4.",
        "Striking in the centre instead of grabbing e5 — the Steinitz idea.",
        "Black captures the d4-pawn.",
        "Pushing past to gain space and harass the f6-knight.",
        "The knight jumps forward rather than retreat.",
        "Recapturing and centralising the queen.",
        "Black blunts the centre and gains a foothold.",
        "Capturing en passant to open lines.",
        "Recapturing with the knight; a lively, roughly balanced middlegame.",
      ],
    },
  ],
};
