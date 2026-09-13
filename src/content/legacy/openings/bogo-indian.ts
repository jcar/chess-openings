import type { Opening } from "./types";

// Bogo-Indian Defence — original prose; lines are standard public theory.
export const bogoIndian: Opening = {
  id: "bogo-indian",
  name: "Bogo-Indian Defence",
  aliases: ["Bogo Indian"],
  eco: "E11",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+",
  character:
    "A flexible, low-theory cousin of the Nimzo-Indian. With the check " +
    "3...Bb4+ Black eases development and sidesteps the heaviest opening " +
    "preparation. The bishop is usually traded or retreated, and Black settles " +
    "into a sound, comfortable position without committing to anything sharp.",
  whitePlan:
    "Meet the check simply (Bd2 or Nbd2), keep the bishop pair if it can be " +
    "won, build a broad centre with e4, and use the extra space for a small, " +
    "lasting edge.",
  blackPlan:
    "Trade or retreat the b4-bishop to finish development smoothly, keep the " +
    "position solid and flexible, and aim for the freeing ...d6/...e5 or ...d5 " +
    "breaks once the pieces are out.",
  middlegamePlan:
    "The Bogo is a low-theory cousin of the Nimzo: the check ...Bb4+ eases development and " +
    "dodges sharp preparation. After White blocks (Bd2 or Nbd2), trade or back up the " +
    "bishop, then aim for the classic ...d6 and ...e5 freeing break (sometimes ...d5 " +
    "instead), with ...Qe7 and ...Nc6 supporting it. You're not refuting anything — develop " +
    "smoothly, keep the position sound and flexible, and equalise comfortably while White's " +
    "extra space stays harmless.",
  ideaQuiz: {
    question: "What is the point of the early check 3...Bb4+ in the Bogo-Indian?",
    options: [
      "It eases development and sidesteps heavy theory; the bishop then trades or retreats.",
      "It wins the d4-pawn by force.",
      "It sets up an immediate kingside attack.",
    ],
    correctIndex: 0,
    explanation:
      "The Bogo is the practical, low-maintenance Indian. ...Bb4+ develops with tempo and avoids the dense theory of the Nimzo and Queen's Indian; after White interposes, Black trades or retreats the bishop and settles into a solid, flexible position aiming for ...e5 or ...d5. It's about ease, not a knockout.",
  },
  tabiyaFen:
    "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4",
  structureDiagram: {
    fen: "r1b1k2r/ppppqppp/2n1pn2/8/2PP4/5NP1/PP1bPPBP/RN1QK2R w KQkq - 0 7",
    orientation: "black",
    caption:
      "The Bogo-Indian checks with 3...Bb4+ to provoke a small concession, then plays a calm, low-theory game with ...d5 or ...b6 — the Nimzo's quieter cousin when White avoids 3.Nc3.",
  },
  lines: [
    {
      label: "Main Line (4.Bd2)",
      summary: "After White blocks with the bishop, you back up with ...Qe7 and ...Nc6, trade off cleanly on d2, and head for a smooth ...e5 break.",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nf3", "Bb4+",
        "Bd2", "Qe7", "g3", "Nc6", "Bg2", "Bxd2+",
      ],
      notes: [
        "White claims the centre.",
        "Black develops flexibly.",
        "Grabbing space and pressuring the centre.",
        "Solid and flexible, opening the bishop's path.",
        "Developing and avoiding committal central pawn moves.",
        "The Bogo-Indian check — easing development and dodging theory.",
        "The simplest reply, blocking the check with a developing move.",
        "Backing the bishop and preparing a later ...e5 break.",
        "Fianchettoing to contest the centre from the side.",
        "Developing toward the centre and supporting ...e5.",
        "Completing the fianchetto.",
        "Trading off the bishop to ease Black's game cleanly.",
      ],
    },
    {
      label: "Nimzowitsch (4.Nbd2)",
      summary: "White blocks with the knight to keep the bishop pair; you castle, trade on d2 anyway, and settle into a solid ...d6 and ...e5 setup.",
      branch: { from: "Main Line (4.Bd2)", atPly: 6, tryMove: "Nbd2" },
      sans: [
        "d4", "Nf6", "c4", "e6", "Nf3", "Bb4+",
        "Nbd2", "O-O", "a3", "Bxd2+", "Bxd2", "d6",
      ],
      notes: [
        "White claims the centre.",
        "Black develops flexibly.",
        "Grabbing space.",
        "Solid and flexible.",
        "Developing the knight.",
        "The Bogo-Indian check.",
        "Blocking with the knight, keeping the bishop pair in reserve.",
        "King safety first — Black castles before resolving the bishop.",
        "Putting the question to the bishop.",
        "Capturing rather than retreating, doubling no pawns.",
        "Recapturing toward the centre.",
        "A solid set-up, preparing the ...e5 break with a kingside fianchetto.",
      ],
    },
  ],
};
