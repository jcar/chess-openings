import type { Opening } from "./types";

// Scandinavian Defence — original prose; lines are standard public theory.
export const scandinavian: Opening = {
  id: "scandinavian",
  name: "Scandinavian Defence",
  aliases: ["Center Counter","Centre Counter"],
  eco: "B01",
  family: "1e4-other",
  trainerColor: "black",
  firstMoves: "1.e4 d5",
  character:
    "The most direct answer to 1.e4: Black challenges the king's pawn on the " +
    "very first move. After the centre is exchanged, the queen usually comes " +
    "out early to recapture, which breaks a beginner's rule — but here it is " +
    "well-timed, because the queen retreats to safety while Black completes " +
    "fast, harmonious development.",
  whitePlan:
    "Gain time by harassing Black's early queen with natural developing moves " +
    "like Nc3 and d4, build a broad pawn centre, and use the lead in " +
    "development to press for a lasting space advantage.",
  blackPlan:
    "Recapture on d5, tuck the queen onto a safe square, and develop quickly " +
    "and simply with ...Nf6, ...c6, ...Bf5 and a kingside castle, reaching a " +
    "solid, easy-to-play position with no weaknesses.",
  middlegamePlan:
    "The Scandinavian is solid and scheme-like — you build the same healthy setup almost " +
    "every game. After tucking the queen away, play ...Nf6, then ...c6 (vital: it gives the " +
    "queen a permanent c7 bolt-hole and stops Nb5 ideas), get the light bishop OUT with " +
    "...Bf5 or ...Bg4 before ...e6 locks it in, then ...e6, ...Bd6 or ...Be7, ...O-O, " +
    "...Nbd7. You have no weaknesses; free yourself later with ...c5 or ...e5 and head for a " +
    "comfortable middlegame or endgame. The one rule: never leave the queen where a knight " +
    "or bishop hits it with real tempo.",
  ideaQuiz: {
    question: "Developing the queen early usually breaks the rules. Why is ...Qxd5 (and ...Qa5) fine here?",
    options: [
      "The queen retreats to a safe square and Black develops fast with no weaknesses; ...c6 gives it a permanent bolt-hole.",
      "Because the early queen threatens immediate checkmate.",
      "Because White is not allowed to attack the queen.",
    ],
    correctIndex: 0,
    explanation:
      "White does win a tempo or two chasing the queen — but only a couple, and Black's structure is so sound that it's a fair trade. The key is ...c6: it hands the queen a safe c7 retreat and kills Nb5 tricks, so after that the queen is never harassed with real tempo again.",
  },
  tabiyaFen:
    "rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3",
  structureDiagram: {
    fen: "rn2kb1r/pp2pppp/2p2n2/q4b2/2BP4/2N2N2/PPP2PPP/R1BQK2R w KQkq - 2 7",
    orientation: "black",
    caption:
      "The Scandinavian grabs the centre immediately with 1...d5. After the queen settles on a5, Black develops the bishop to f5 OUTSIDE the pawn chain and reaches a solid, easy-to-play structure.",
  },
  lines: [
    {
      label: "Main Line (3...Qa5)",
      summary: "You recapture with the queen and tuck it on a5, then play ...Nf6, ...c6 and ...Bf5 for a solid, scheme-like setup with no weaknesses.",
      sans: [
        "e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5",
        "d4", "Nf6", "Nf3", "c6", "Bc4", "Bf5",
      ],
      notes: [
        "White takes the centre.",
        "The Scandinavian: Black challenges e4 at once.",
        "Capturing — there is no good way to defend the d5-pawn.",
        "Recapturing with the queen, the point of the opening.",
        "Developing with tempo by attacking the queen.",
        "The main retreat: the queen sits safely on a5, eyeing the c3-knight.",
        "Grabbing the full centre and opening lines.",
        "Developing to the best square and pressuring e4-ideas.",
        "Natural development, getting ready to castle.",
        "A useful move: it gives the queen the c7-square and supports ...d5 ideas.",
        "The Italian bishop comes out to an active diagonal.",
        "The light-squared bishop develops outside the pawn chain — a fine set-up.",
      ],
      commonMistakes: [
        {
          ply: 5,
          move: "Qe5+",
          why: "A tempting check that misplaces the queen. After 3...Qe5+?? 4.Be2 the queen sits exposed in the centre and White gains tempo developing (Nf3 hits it next). Retreat to a safe, useful square instead — 3...Qa5 (eyeing c3 and the a-file) or 3...Qd6.",
        },
      ],
    },
    {
      label: "Modern (2...Nf6)",
      summary: "Instead of the queen, you recapture d5 with the knight and fianchetto to g7, keeping the queen at home for a sound, comfortable game.",
      sans: [
        "e4", "d5", "exd5", "Nf6", "d4", "Nxd5",
        "Nf3", "g6", "Be2", "Bg7",
      ],
      notes: [
        "White takes the centre.",
        "The Scandinavian.",
        "Capturing the d5-pawn.",
        "The Modern approach: instead of the queen, the knight will recapture.",
        "Grabbing space and supporting a central build-up.",
        "Now the knight takes back, keeping the queen at home.",
        "Calm development.",
        "Preparing to fianchetto the dark-squared bishop.",
        "A modest, flexible developing move.",
        "The bishop eyes the long diagonal — a comfortable, sound set-up.",
      ],
    },
    {
      label: "3...Qd6 Variation",
      summary: "The modern queen retreat: from d6 the queen is flexible and hard to attack. You follow with ...Nf6, ...g6 and ...Bg7 for a sound, well-organised set-up.",
      branch: { from: "Main Line (3...Qa5)", atPly: 5, tryMove: "Qd6" },
      sans: [
        "e4", "d5", "exd5", "Qxd5", "Nc3", "Qd6",
        "d4", "Nf6", "Nf3", "g6", "Be2", "Bg7",
      ],
      notes: [
        "White takes the centre.",
        "The Scandinavian.",
        "Capturing the d5-pawn.",
        "Recapturing with the queen.",
        "Developing with tempo by hitting the queen.",
        "The modern retreat: d6 is flexible and dodges the tempo tricks ...Qa5 can face.",
        "Grabbing the full centre.",
        "Developing to the best square.",
        "Natural development.",
        "Preparing the fianchetto.",
        "A modest developing move.",
        "Completing a harmonious, solid set-up.",
      ],
    },
  ],
};
