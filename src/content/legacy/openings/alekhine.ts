import type { Opening } from "./types";

// Alekhine Defence — original prose; lines are standard public theory.
export const alekhine: Opening = {
  id: "alekhine",
  name: "Alekhine Defence",
  eco: "B02–B05",
  family: "1e4-other",
  trainerColor: "black",
  firstMoves: "1.e4 Nf6",
  character:
    "A daring, hypermodern reply to 1.e4. Black ignores the centre and instead " +
    "pokes White's e-pawn with the knight, inviting the pawns forward. The plan " +
    "is to let White build an impressive-looking pawn front, then attack and " +
    "undermine it from the wings — if the centre overextends, it becomes a " +
    "target rather than a strength.",
  whitePlan:
    "Accept the invitation to expand: chase the knight with pawns, occupy the " +
    "centre with broad gains of space, and try to convert that space into a " +
    "lasting bind before Black can chip the pawns away.",
  blackPlan:
    "Provoke the pawns forward, retreat the knight to safe squares, and then " +
    "strike at the overextended centre with breaks like ...d6 and ...c5 or " +
    "...f6, proving the pawns are weak and winning them as targets.",
  middlegamePlan:
    "The Alekhine is a deliberate provocation: you let White build a big pawn front so you " +
    "can demolish it. Retreat the knight to safety (Nd5–b6), then chip at the centre with " +
    "...d6 and ...c5 (and sometimes ...dxe5 or ...f6), trading off and hitting the e5/d4 " +
    "pawns. Get the pieces behind the breaks — ...Bg7 or ...Bg4/...Bf5, ...Nc6 — and prove " +
    "the advanced pawns are weak. If White plays modestly you equalise easily; if White " +
    "overextends (the Four Pawns Attack), strike fast with ...c5/...dxe5 before the centre " +
    "stabilises.",
  ideaQuiz: {
    question: "What is Black's entire strategy in the Alekhine?",
    options: [
      "Provoke White's pawns forward, then attack and win the overextended centre as a target.",
      "Trade queens early and grind a safe endgame a pawn up.",
      "Build Black's own matching big pawn centre.",
    ],
    correctIndex: 0,
    explanation:
      "The Alekhine is the purest hypermodern idea: a big pawn centre is only strong if it can't be attacked. Black invites the pawns forward (1...Nf6, 2...Nd5–b6), then undermines them with ...d6, ...c5 and piece pressure. Overextended, those proud pawns become weaknesses to win.",
  },
  tabiyaFen:
    "rnbqkb1r/pppppppp/8/3nP3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3",
  structureDiagram: {
    fen: "rnbqk2r/ppp1ppbp/6p1/3nN3/3P4/8/PPP1BPPP/RNBQK2R w KQkq - 2 7",
    orientation: "black",
    caption:
      "The Alekhine tempts White's pawns forward (1...Nf6 attacks e4), then attacks the over-extended centre from afar with ...g6, ...Bg7, and piece pressure — pure hypermodern provocation.",
  },
  lines: [
    {
      label: "Modern Variation",
      summary: "White develops calmly rather than over-pushing; you provoke and then undermine the centre with ...d6 and ...dxe5, fianchettoing to g7 to pressure it.",
      sans: [
        "e4", "Nf6", "e5", "Nd5", "d4", "d6",
        "Nf3", "dxe5", "Nxe5", "g6", "Be2", "Bg7",
      ],
      notes: [
        "White takes the centre.",
        "The Alekhine: the knight pokes the e-pawn instead of fighting for the centre.",
        "Chasing the knight — exactly what Black invited.",
        "Retreating to a safe, active outpost.",
        "Building the broad centre.",
        "Striking at the head of the pawn chain at once.",
        "The Modern, calm approach: simple development over more pawn pushes.",
        "Black resolves the centre tension.",
        "Recapturing with the knight.",
        "Preparing to fianchetto and pressure the long diagonal.",
        "A flexible, solid developing move.",
        "The bishop bears down on White's centre — Black is ready to undermine it.",
      ],
      commonMistakes: [
        {
          ply: 5,
          move: "e6",
          why: "Too passive, and off-plan. ...e6 walls in your light-squared bishop and lets White keep the big centre unchallenged — the exact opposite of the Alekhine's idea. Hit the chain first with ...d6 (then ...c5), undermining e5 and d4 before they get comfortable.",
        },
      ],
    },
    {
      label: "Four Pawns Attack",
      summary: "White builds a huge but loose pawn front; you strike fast with ...dxe5 and ...Nc6, attacking the overextended d4 and e5 pawns before they stabilise.",
      branch: { from: "Modern Variation", atPly: 6, tryMove: "c4" },
      sans: [
        "e4", "Nf6", "e5", "Nd5", "d4", "d6",
        "c4", "Nb6", "f4", "dxe5", "fxe5", "Nc6",
      ],
      notes: [
        "White takes the centre.",
        "The Alekhine.",
        "Chasing the knight.",
        "Retreating to d5.",
        "Building the centre.",
        "Hitting the chain at its head.",
        "The most ambitious try: kicking the knight again to grab even more space.",
        "The knight steps back to b6, eyeing c4 and d5.",
        "The Four Pawns Attack: a huge, aggressive but loose pawn front.",
        "Black challenges the centre, opening the d-file.",
        "Recapturing and keeping the big chain.",
        "Developing with pressure on the overextended d4 and e5 pawns.",
      ],
    },
  ],
};
