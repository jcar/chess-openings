import type { Opening } from "./types";

// Queen's Gambit (a White 1.d4 repertoire). Original prose; lines are standard
// public theory. Gives a 1.d4 player a real main-line weapon against Black's
// three principal replies — declining (...e6), accepting (...dxc4), and the Slav
// (...c6) — to complement the system-based London already in the catalog.
export const queensGambit: Opening = {
  id: "queens-gambit",
  name: "Queen's Gambit (for White)",
  aliases: ["QG"],
  eco: "D06–D69",
  family: "1d4",
  trainerColor: "white",
  tier: "core",
  firstMoves: "1.d4 d5 2.c4",
  character:
    "The classical way to fight for the centre with 1.d4. White offers the c-pawn " +
    "not as a true sacrifice — Black can't comfortably hold it — but to deflect the " +
    "d5-pawn and build a big pawn centre with a later e4. It leads to rich, " +
    "principled middlegames and is the backbone of a sound White repertoire.",
  whitePlan:
    "Pressure d5 with c4 and Nc3, develop naturally (Bg5/Bf4, e3, Nf3, Bd3 or Be2), " +
    "castle, and aim for the central break e4 or the minority attack (b4-b5) " +
    "depending on Black's setup.",
  blackPlan:
    "Decide how to meet the gambit: support d5 with ...e6 (solid but passive bishop) " +
    "or ...c6 (the Slav, freeing the bishop), or grab the pawn with ...dxc4 and give " +
    "back the centre. In each case, complete development and strike with ...c5 or ...e5.",
  middlegamePlan:
    "The Queen's Gambit isn't really a gambit — Black can't keep the c4-pawn, so you're " +
    "playing for a durable central and developmental edge. After the Declined, pick the plan " +
    "the structure dictates: in Exchange positions (pawns on d-file, symmetrical) run the " +
    "minority attack — push b4–b5 to swap on c6 and saddle Black with a weak, backward c6-pawn " +
    "to gnaw at down the half-open c-file. In other structures, finish developing (Nf3, Bd3, " +
    "O-O, Qc2, Rad1) and prepare the central e3–e4 break to open lines against Black's slightly " +
    "passive setup. Keep the Bg5 pin, pressure d5, and don't rush — your small, lasting edge " +
    "is the asset.",
  ideaQuiz: {
    question: "After the Queen's Gambit Declined, what are White's two main winning plans?",
    options: [
      "The minority attack (b4–b5 to weaken c6), or the central e3–e4 break.",
      "An immediate kingside pawn storm with g4–g5 and a mating attack.",
      "Trade every piece to reach a quick, safe draw.",
    ],
    correctIndex: 0,
    explanation:
      "The QGD gives White a small, lasting structural edge, not an attack. In Exchange structures White runs the minority attack — b4–b5, trade on c6, and target the weak c6-pawn. Otherwise White prepares the central e3–e4 break to open the position against Black's cramped setup. Patient pressure, not a kingside storm.",
  },
  tabiyaFen:
    "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
  structureDiagram: {
    fen: "rnbq1rk1/ppp1bpp1/4pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R b KQ - 1 7",
    orientation: "white",
    arrows: [{ from: "b2", to: "b4" }],
    caption:
      "Queen's Gambit (Declined): White converts the central pressure into a long-term plan \u2014 the queenside minority attack (b4\u2013b5 to create a weak black pawn) or the e4 break.",
  },
  lines: [
    {
      label: "Declined (2...e6)",
      summary: "Black props up d5 with ...e6 and a slightly passive bishop; you pin with Bg5, keep pressure on d5, and play for the minority attack or an e4 break.",
      sans: [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7",
        "e3", "O-O", "Nf3", "h6", "Bh4",
      ],
      notes: [
        "Claim the centre.",
        "Black stakes a symmetrical claim.",
        "The Queen's Gambit — pressure d5 and offer the c-pawn.",
        "Declined: Black supports d5, accepting a slightly passive light bishop.",
        "Develop and pile onto d5.",
        "Defend d5 and develop.",
        "Pin the knight to increase the pressure on d5.",
        "Break the pin and prepare to castle.",
        "Open the f1-bishop and reinforce the centre.",
        "Black castles into safety.",
        "Complete development; the plan is a later minority attack (b4-b5) or e4 break.",
        "Black gains the bishop pair option with ...h6.",
        "Keep the bishop on the h4-d8 diagonal, holding the pin's pressure.",
      ],
      commonMistakes: [
        {
          ply: 12,
          move: "Bxf6",
          why: "Don't relieve the pressure. When ...h6 questions the bishop, keep the pin with Bh4 — trading with Bxf6 hands Black the bishop pair and frees the d5-pawn from its main attacker for nothing. Your edge in the QGD is patient pressure on d5; don't give it away.",
        },
      ],
    },
    {
      label: "Accepted (2...dxc4)",
      summary: "Black grabs the c-pawn but can't hold it; develop calmly, recapture with Bxc4 aiming at f7, and enjoy a lead in development and central space.",
      branch: { from: "Declined (2...e6)", atPly: 3, tryMove: "dxc4" },
      sans: [
        "d4", "d5", "c4", "dxc4", "Nf3", "Nf6", "e3", "e6",
        "Bxc4", "c5", "O-O",
      ],
      notes: [
        "Centre.",
        "Symmetry.",
        "The gambit.",
        "Accepted — but Black can't keep the pawn, so this mainly cedes the centre.",
        "Develop and control e5; don't rush to recapture on c4.",
        "Black develops and eyes the centre.",
        "Open the bishop's path to recapture on c4.",
        "Black prepares ...c5 and development.",
        "Recover the pawn with a well-placed bishop aiming at f7.",
        "Black strikes at the centre — the standard freeing break.",
        "Castle; White has an easy, harmonious game with a lead in development.",
      ],
    },
    {
      label: "Slav (2...c6)",
      summary: "Black supports d5 with ...c6 to free the light bishop; after ...dxc4 you play a4 to stop ...b5, regain the pawn with Bxc4, and keep the freer game.",
      branch: { from: "Declined (2...e6)", atPly: 3, tryMove: "c6" },
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4",
        "a4", "Bf5", "e3",
      ],
      notes: [
        "Centre.",
        "Symmetry.",
        "The gambit.",
        "The Slav — support d5 with the c-pawn, keeping the light bishop free.",
        "Develop and control e5.",
        "Black develops and defends d5.",
        "Add a third attacker to d5; now ...dxc4 is Black's main try.",
        "Black grabs the pawn, planning ...b5 to hold it.",
        "Stop ...b5 cold before recovering the pawn.",
        "The point of the Slav — the bishop comes out before ...e6 locks it in.",
        "Solid development; White will regain c4 with Bxc4 and enjoy the freer game.",
      ],
    },
  ],
};
