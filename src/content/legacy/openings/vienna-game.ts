import type { Opening } from "./types";

// Vienna Game — original prose; lines are standard public theory.
export const viennaGame: Opening = {
  id: "vienna-game",
  name: "Vienna Game",
  eco: "C25–C29",
  family: "1e4-e5",
  trainerColor: "white",
  tier: "explorer",
  firstMoves: "1.e4 e5 2.Nc3",
  character:
    "A flexible 1.e4 e5 weapon that develops the queen's knight first and keeps " +
    "the f-pawn free. White can play it quietly, Italian-style, or strike with " +
    "an early f4 — the Vienna Gambit — which is sound precisely because the " +
    "knight already guards e4. Low on forced theory, rich in practical chances.",
  whitePlan:
    "Develop with Nc3 and Bc4, eyeing d5 and the f7-square. Choose between a " +
    "calm build-up with d3 and Nf3, or the aggressive f4 break to open lines " +
    "toward the black king.",
  blackPlan:
    "Develop naturally and contest the centre. Against the quiet lines mirror " +
    "with ...Nc6, ...Nf6 and ...Bc5; against f4, hit back in the centre with " +
    "...d5 rather than grabbing the pawn.",
  middlegamePlan:
    "The Vienna's flexibility is the whole point: the c3-knight already guards e4, so you " +
    "choose the plan. Quiet route — Bc4, d3, Nf3, O-O, then expand or pop a knight into d5. " +
    "Aggressive route — play f4, and once the f-file opens, aim Bc4 and the f1-rook at f7 " +
    "and the black king. Because the knight defends e4, f4 never simply drops a pawn — meet " +
    "...d5 counters calmly and keep developing toward the attack.",
  ideaQuiz: {
    question: "Why is the Vienna Gambit (an early f4) sound, when a loose f-pawn push usually isn't?",
    options: [
      "The knight already on c3 guards e4, so f4 doesn't leave e4 hanging.",
      "Because it forces an immediate checkmate.",
      "Because Black is not allowed to capture on f4.",
    ],
    correctIndex: 0,
    explanation:
      "In most ...e5 lines an early f4 abandons e4. The Vienna plays 2.Nc3 first, so the knight covers e4 — now f4 opens the f-file and challenges the centre without dropping anything. That extra defender is exactly why the gambit is respectable rather than reckless.",
  },
  tabiyaFen:
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
  structureDiagram: {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 2 5",
    orientation: "white",
    arrows: [{ from: "f2", to: "f4" }],
    caption:
      "The Vienna develops the queen's knight first (2.Nc3), keeping the thematic f4 push in reserve — flexible King's-Pawn play that can turn quiet or sharp.",
  },
  lines: [
    {
      label: "Quiet main line",
      summary: "You develop Italian-style with Bc4, d3 and Nf3, eyeing f7 and d5 for a comfortable, flexible game with f4 still in reserve.",
      sans: ["e4", "e5", "Nc3", "Nc6", "Bc4", "Nf6", "d3", "Bc5", "Nf3"],
      notes: [
        "Claiming the centre.",
        "Black answers symmetrically.",
        "The Vienna: develop the knight, eye d5, and keep f2–f4 in reserve.",
        "Black develops the queen's knight.",
        "Aiming the bishop at the f7 weak spot.",
        "Developing and hitting the e4-pawn.",
        "Defending e4 solidly and opening the c1-bishop.",
        "Black mirrors, targeting f2.",
        "Completing development into a comfortable, Italian-like game.",
      ],
    },
    {
      label: "Vienna Gambit",
      summary: "You strike with f4, sound because the c3-knight already guards e4, opening the f-file to fight for the initiative against Black's king.",
      branch: { from: "Quiet main line", atPly: 3, tryMove: "Nf6" },
      sans: ["e4", "e5", "Nc3", "Nf6", "f4", "d5", "fxe5", "Nxe4", "Nf3"],
      notes: [
        "Claiming the centre.",
        "Black answers symmetrically.",
        "The Vienna.",
        "Black develops and pressures e4.",
        "The gambit! Sound because the knight already guards e4.",
        "Black's best — counterstrike in the centre instead of grabbing on f4.",
        "Taking the e-pawn.",
        "Black regains the pawn on e4.",
        "Developing and fighting for the initiative in a lively position.",
      ],
      commonMistakes: [
        {
          ply: 8,
          move: "d3",
          why: "Develop the knight, not the pawn. After 4...Nxe4, the move 5.d3? kicks the knight but walks into 5...Qh4+! 6.g3 Nxg3! 7.hxg3 Qxg3+ and Black wins material with a raging attack. Play 5.Nf3 — it develops and covers h4.",
        },
      ],
    },
  ],
};
