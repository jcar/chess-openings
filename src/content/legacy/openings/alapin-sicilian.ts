import type { Opening } from "./types";

// Alapin Sicilian (2.c3) — original prose; lines are standard public theory.
export const alapinSicilian: Opening = {
  id: "alapin-sicilian",
  name: "Alapin Sicilian (2.c3)",
  aliases: ["c3 Sicilian","Sicilian c3"],
  eco: "B22",
  family: "1e4-other",
  trainerColor: "white",
  tier: "explorer",
  firstMoves: "1.e4 c5 2.c3",
  character:
    "An anti-Sicilian for players who'd rather build a big centre than memorize " +
    "razor-sharp main lines. With 2.c3 White prepares d2–d4 fully supported, " +
    "reaching open, classical positions — often an isolated-queen-pawn middlegame " +
    "where White's freer development and central space give an easy game.",
  whitePlan:
    "Play c3 and d4 to occupy the centre, develop quickly (Nf3, Bishops out, " +
    "castle), and use the central space and active pieces to press — frequently " +
    "in IQP-style positions with kingside attacking chances.",
  blackPlan:
    "Strike at the centre early — with ...d5 to trade White's e-pawn, or ...Nf6 " +
    "to hit e4 — and aim to blockade or win the isolated d-pawn in the endgame.",
  middlegamePlan:
    "The Alapin plays for a healthy big centre and, very often, an isolated queen's pawn " +
    "(IQP) after the d-file opens. Embrace the IQP as a dynamic asset, not a weakness: use " +
    "the half-open e-file, plant a knight on e5, aim both bishops at the kingside (Bd3/Bc2 " +
    "plus Bg5), and play for the d4–d5 break or a direct attack while Black is tied to " +
    "blockading. Press in the middlegame — if many pieces come off, the isolated pawn can " +
    "become a target, so make your space and activity count first.",
  ideaQuiz: {
    question: "What kind of middlegame is White typically steering for with the Alapin?",
    options: [
      "An open, isolated-queen-pawn position where White's space and active pieces attack.",
      "A closed, slow manoeuvring battle with locked pawns.",
      "An immediate material win straight out of the opening.",
    ],
    correctIndex: 0,
    explanation:
      "2.c3 prepares a fully supported d4. When the centre opens, White usually accepts an isolated d-pawn in return for free development, central space, and the e5-outpost — a classic IQP attacking position. The plan is dynamic pressure (and often a kingside attack), not a quiet manoeuvre or a quick win.",
  },
  tabiyaFen:
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2",
  structureDiagram: {
    fen: "r1b1kbnr/pp2pppp/2n5/2pq4/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5",
    orientation: "white",
    caption:
      "The Alapin (2.c3) answers the Sicilian by building a classical centre with d4 — sound, low-theory play that sidesteps the sharpest main-line Sicilians.",
  },
  lines: [
    {
      label: "vs 2...d5",
      summary: "Black trades on d5 and recaptures with the queen; you build the centre with d4 and gain tempo chasing the exposed queen for an easy, free game.",
      sans: ["e4", "c5", "c3", "d5", "exd5", "Qxd5", "d4", "Nc6", "Nf3"],
      notes: [
        "Claiming the centre.",
        "The Sicilian.",
        "The Alapin: prepare d2–d4 with full pawn support.",
        "A principled try — hitting the centre before White completes it.",
        "Capturing.",
        "Black recaptures with the queen.",
        "Building the centre with tempo; the queen will be harried later.",
        "Black develops.",
        "Developing and preparing to chase the queen with tempo — easy play for White.",
      ],
    },
    {
      label: "vs 2...Nf6",
      summary: "Black pokes e4, so you push e5 to kick the knight and grab space, then build d4 and Nf3 for a comfortable central edge.",
      branch: { from: "vs 2...d5", atPly: 3, tryMove: "Nf6" },
      sans: ["e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4", "Nf3"],
      notes: [
        "Claiming the centre.",
        "The Sicilian.",
        "The Alapin.",
        "Attacking e4 immediately.",
        "Push! The knight must move and White grabs central space.",
        "The knight hops to its best square.",
        "Building the broad centre.",
        "Black trades to relieve the tension.",
        "Developing and preparing to recapture on d4, with a pleasant space edge.",
      ],
    },
  ],
};
