import type { Opening } from "./types";

// Caro-Kann Defence — original prose; lines are standard public theory.
export const caroKann: Opening = {
  id: "caro-kann",
  name: "Caro-Kann Defence",
  aliases: ["Caro Kann"],
  eco: "B10–B19",
  family: "1e4-other",
  trainerColor: "black",
  tier: "core",
  firstMoves: "1.e4 c6",
  character:
    "As solid as the French but more harmonious. Black plays 1...c6 to prepare " +
    "...d5, and crucially gets the problem light-squared bishop out to f5 BEFORE " +
    "playing ...e6 — so it never gets trapped behind its own pawns. The result is " +
    "a rock-solid pawn structure with no bad pieces.",
  whitePlan:
    "Use the central pawns and lead in development for a space advantage, often " +
    "gaining kingside room and chasing Black's light-squared bishop, then play " +
    "for a long-term squeeze against the slightly passive Black set-up.",
  blackPlan:
    "Develop the light-squared bishop outside the pawn chain to f5 or g6, then " +
    "play ...e6 with a sound, harmonious position, completing development and " +
    "aiming for a safe, resilient middlegame.",
  middlegamePlan:
    "The Caro's whole selling point is a healthy structure with NO bad bishop. Once the " +
    "light bishop is out (f5/g6) and you've played ...e6, finish developing — ...Nd7, " +
    "...Ngf6, ...Bd6 or ...Be7, castle — then free yourself with the ...c5 break against d4. " +
    "Because your pieces are sound, happily trade when cramped and steer toward a solid " +
    "middlegame or a good endgame, where White's extra space matters far less.",
  ideaQuiz: {
    question: "Why does Black develop ...Bf5 BEFORE playing ...e6 in the Caro-Kann?",
    options: [
      "So the light-squared bishop gets OUTSIDE the pawn chain and is never bad.",
      "To attack the e4-pawn and win it.",
      "To clear the way to castle queenside quickly.",
    ],
    correctIndex: 0,
    explanation:
      "This is the single idea that defines the Caro-Kann. In the French, ...e6 traps the light bishop behind its own pawns. The Caro plays ...c6 and gets that bishop OUT to f5/g6 first — only then ...e6. Same solidity as the French, but no bad bishop.",
  },
  tabiyaFen:
    "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
  structureDiagram: {
    fen: "r2qkbnr/pp1nppp1/2p3bp/8/3P3P/5NN1/PPP2PP1/R1BQKB1R w KQkq - 2 8",
    orientation: "black",
    arrows: [{ from: "c6", to: "c5" }],
    caption:
      "Caro-Kann Classical: Black develops the light-squared bishop OUTSIDE the pawn chain (...Bf5\u2013g6), builds a rock-solid structure, and frees the position with the ...c5 break.",
  },
  lines: [
    {
      label: "Classical Variation",
      summary: "You trade on e4 and develop the bishop to f5 before ...e6 locks it in, reaching a sound structure with no bad pieces.",
      sans: [
        "e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Bf5",
        "Ng3", "Bg6", "h4", "h6", "Nf3", "Nd7",
      ],
      notes: [
        "White grabs the centre.",
        "The Caro-Kann: Black prepares ...d5 with pawn support.",
        "Reinforcing the centre.",
        "Black challenges e4 at once.",
        "Developing and defending the e4-pawn.",
        "Black resolves the tension and opens lines.",
        "Recapturing with the knight in the centre.",
        "The whole point: the bishop develops OUTSIDE the pawn chain.",
        "Chasing the bishop to gain a tempo.",
        "The bishop steps back to a safe, active diagonal.",
        "Gaining space and threatening to trap the bishop with h5.",
        "Making luft so the bishop keeps its retreat square.",
        "Calm development, getting ready to castle.",
        "Developing the knight flexibly toward f6 or b6.",
      ],
      commonMistakes: [
        {
          ply: 5,
          move: "e6",
          why: "That locks in your light-squared bishop — exactly the French problem the Caro-Kann exists to avoid. You'd just be a worse French (having also spent a move on ...c6). Resolve the centre with ...dxe4 first, get the bishop out to f5, THEN play ...e6.",
        },
      ],
    },
    {
      label: "Advance Variation",
      summary: "White grabs space with e5; you get the light-squared bishop out to f5 before ...e6, then chip at d4 with ...c5.",
      branch: { from: "Classical Variation", atPly: 4, tryMove: "e5" },
      sans: [
        "e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6", "Be2", "c5",
      ],
      notes: [
        "White grabs the centre.",
        "The Caro-Kann.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "The Advance: White pushes past for space and fixes the centre.",
        "The key Caro-Kann idea — the bishop comes out before ...e6 locks it in.",
        "Developing and eyeing the centre.",
        "Now ...e6 is fine because the bishop is already outside the chain.",
        "A modest, flexible developing move.",
        "Black's thematic break against the base of the chain on d4.",
      ],
    },
    {
      label: "Panov–Botvinnik Attack",
      summary: "White opens the game with c4 and an isolated d-pawn; you blockade and pressure d5 with ...Nf6, ...e6 and the ...Bb4 pin for active piece play.",
      branch: { from: "Classical Variation", atPly: 4, tryMove: "exd5" },
      sans: [
        "e4", "c6", "d4", "d5", "exd5", "cxd5",
        "c4", "Nf6", "Nc3", "e6", "Nf3", "Bb4",
      ],
      notes: [
        "White grabs the centre.",
        "The Caro-Kann: preparing ...d5 with support.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "Releasing the tension and clearing the centre.",
        "Recapturing toward the centre.",
        "The Panov idea: striking at d5 to open the game and play with an isolated pawn.",
        "Developing and pressing back on d5.",
        "Developing and adding pressure to the d5-pawn.",
        "Solidly defending d5 and opening the bishop's path.",
        "Developing and supporting the centre.",
        "Pinning the knight to ease the pressure on d5.",
      ],
    },
    {
      label: "Exchange Variation",
      summary: "White releases the tension with exd5 and sets up the modest Bd3 line; you develop naturally and comfortably, with easy equality and no bad bishop.",
      branch: { from: "Classical Variation", atPly: 4, tryMove: "exd5" },
      sans: [
        "e4", "c6", "d4", "d5", "exd5", "cxd5",
        "Bd3", "Nc6", "c3", "Nf6", "Bf4", "e6",
      ],
      notes: [
        "White grabs the centre.",
        "The Caro-Kann.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "The Exchange: White clears the centre for a quiet, symmetrical structure.",
        "Recapturing toward the centre.",
        "White's set-up: the bishop eyes the kingside.",
        "Developing and pressing d4.",
        "Bolstering d4 before Black hits it.",
        "Natural development.",
        "White develops the bishop actively before ...e6 shuts it in.",
        "Solid: the light bishop is already fine, so ...e6 costs nothing.",
      ],
    },
    {
      label: "Two Knights Attack",
      summary: "White develops both knights and lets you trade off your light bishop for the f3-knight; you get a rock-solid, slightly passive structure with the two knights well placed.",
      branch: { from: "Classical Variation", atPly: 2, tryMove: "Nc3" },
      sans: [
        "e4", "c6", "Nc3", "d5", "Nf3", "Bg4",
        "h3", "Bxf3", "Qxf3", "Nf6", "d3", "e6",
      ],
      notes: [
        "White grabs the centre.",
        "The Caro-Kann.",
        "The Two Knights: developing before committing the d-pawn.",
        "Black challenges the centre at once.",
        "Developing and eyeing e5.",
        "The bishop comes out — but here it heads for a trade rather than f5.",
        "Questioning the bishop immediately.",
        "Trading it off before it can be shut in; White gets the bishop pair, Black a solid game.",
        "Recapturing with the queen, aiming at the kingside.",
        "Developing and covering d5.",
        "A restrained centre.",
        "Completing a compact, resilient set-up.",
      ],
    },
  ],
};
