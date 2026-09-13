import type { Opening } from "./types";

// Scotch Game — original prose; lines are standard public theory.
export const scotchGame: Opening = {
  id: "scotch-game",
  name: "Scotch Game",
  eco: "C44–C45",
  family: "1e4-e5",
  trainerColor: "white",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.d4",
  character:
    "White opens the position at once instead of maneuvering slowly. By striking " +
    "in the centre with d4 on move three, the pawns come off and the pieces get " +
    "clear, open lines straight away. It is a direct, tactical choice that suits " +
    "players who prefer activity over the long squeeze of the Italian or Ruy Lopez.",
  whitePlan:
    "Open the centre with d4, recapture on d4 with the knight, develop quickly, " +
    "and use the lead in piece activity to seize the initiative in an open game.",
  blackPlan:
    "Capture on d4 to keep things balanced, develop pieces actively with ...Nf6 " +
    "or ...Bc5, challenge White's centralized knight, and aim for the freeing " +
    "...d5 break.",
  middlegamePlan:
    "The Scotch trades the centre pawns early, so the game is about piece activity, not " +
    "pawn structure. Your d4-knight is the star — keep it centralised, or trade it with " +
    "Nxc6 to saddle Black with doubled, immobile c-pawns you can target. Finish developing " +
    "fast (Nc3, Bd3, O-O), put the rooks on the open d- and e-files, and press with your " +
    "lead in development before Black untangles with the freeing ...d5. Don't chase pawns — " +
    "chase activity.",
  ideaQuiz: {
    question: "Why does White play 3.d4, giving up the central tension so soon?",
    options: [
      "To open the position at once and play for fast development and piece activity.",
      "To win the e5-pawn by force.",
      "To set up a slow positional squeeze like the Ruy Lopez.",
    ],
    correctIndex: 0,
    explanation:
      "The Scotch trades the d- and e-pawns immediately, opening lines for the pieces. White isn't winning material — White is buying time: rapid development, a strong central knight on d4, and open files. It's the opposite of the slow Ruy Lopez manoeuvring; activity is the whole point.",
  },
  tabiyaFen:
    "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
  structureDiagram: {
    fen: "r1bqk2r/p1p2ppp/2p2n2/3p4/1b2P3/2NB4/PPP2PPP/R1BQK2R w KQkq - 0 8",
    orientation: "white",
    caption:
      "The Scotch opens the centre at once with 3.d4: White trades the d-pawn for fast development and open lines, while Black returns the pawn and frees the pieces with ...d5.",
  },
  lines: [
    {
      label: "Main line (4...Nf6)",
      summary: "You open the centre, then trade with Nxc6 to hand Black doubled c-pawns and play on your lead in development before ...d5 frees him.",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "d4", "exd4",
        "Nxd4", "Nf6", "Nc3", "Bb4", "Nxc6", "bxc6",
        "Bd3", "d5",
      ],
      notes: [
        "White takes the centre and opens lines.",
        "Black stakes an equal claim in the centre.",
        "Developing and adding a second hit on e5.",
        "Defending e5 with the knight.",
        "The defining strike — White opens the centre immediately.",
        "Black captures, accepting the open game.",
        "Recapturing with the knight to a strong central post.",
        "Developing and attacking the e4-pawn.",
        "Defending e4 and developing toward the centre.",
        "Pinning the knight and putting a question to White.",
        "Trading off to inflict doubled pawns on Black.",
        "Recapturing toward the centre.",
        "A natural, active square for the bishop, eyeing the kingside.",
        "Black hits back with the freeing central break.",
      ],
      commonMistakes: [
        {
          ply: 6,
          move: "Qxd4",
          why: "This drops the queen! Black's knight is already on c6 (developed back on move 2), and it attacks d4 — so 4.Qxd4 Nxd4 simply wins it. (The queen recapture only works in the Center Game, where the knight hasn't reached c6 yet.) Recapture with the knight: Nxd4.",
        },
      ],
    },
    {
      label: "Classical Variation (4...Bc5)",
      summary: "Black aims the bishop at your d4-knight; you bolster it with Be3 and c3 and fight to keep your central post and active pieces.",
      branch: { from: "Main line (4...Nf6)", atPly: 7, tryMove: "Bc5" },
      sans: [
        "e4", "e5", "Nf3", "Nc6", "d4", "exd4",
        "Nxd4", "Bc5", "Be3", "Qf6", "c3", "Nge7",
      ],
      notes: [
        "White takes the centre.",
        "Black answers in the centre.",
        "Developing with pressure on e5.",
        "Defending e5.",
        "Opening the centre at once.",
        "Black captures, opening the game.",
        "Recapturing to the centre.",
        "The classical try — pointing the bishop at the d4-knight.",
        "Supporting the knight and challenging the bishop.",
        "Eyeing f2 and supporting the bishop's pressure on d4.",
        "Bolstering d4 and giving the knight a retreat.",
        "Developing the knight while keeping options open.",
      ],
    },
  ],
};
