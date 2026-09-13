import type { Opening } from "./types";

// Four Knights Game — original prose; lines are standard public theory.
export const fourKnights: Opening = {
  id: "four-knights",
  name: "Four Knights Game",
  eco: "C46–C49",
  family: "1e4-e5",
  trainerColor: "white",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6",
  character:
    "The most symmetrical of the open games: both sides simply bring out all " +
    "four knights to their best squares before doing anything else. It is calm, " +
    "principled, and very hard to go wrong with — a model lesson in classical " +
    "development. White is not chasing a knockout, just a small, durable edge " +
    "from sound piece play.",
  whitePlan:
    "Complete healthy development, add the king's bishop (usually to b5 or via " +
    "the centre with d4), castle, and convert a tiny lead in space and " +
    "coordination into a lasting positional pull.",
  blackPlan:
    "Match White's development move for move, keep the position solid and " +
    "symmetrical, and look to free the game with a timely ...d5 break once the " +
    "pieces are out.",
  middlegamePlan:
    "The Four Knights is about a one-tempo edge in a symmetrical position. Don't force " +
    "matters — complete development (Bb5 or d4, O-O, d3), then break the symmetry in your " +
    "favour: a well-timed Nd5 outpost, Bxc6 to inflict doubled pawns, or the central d4 " +
    "break. Pressure e5, claim the half-open lines that open after trades, and convert the " +
    "small initiative patiently rather than hunting a knockout.",
  ideaQuiz: {
    question: "In a dead-symmetrical Four Knights, where does White's small advantage come from?",
    options: [
      "The extra tempo of moving first — use it to break the symmetry first (Nd5, Bxc6, or d4).",
      "A direct attack on the f7-square.",
      "Winning the e5-pawn outright.",
    ],
    correctIndex: 0,
    explanation:
      "Symmetry favours the player to move — White is effectively one tempo ahead. The plan isn't a quick attack or a pawn grab; it's to be the first to change the structure on good terms: jump a knight into d5, double Black's pawns with Bxc6, or strike with d4. Whoever breaks the symmetry well gets the pull.",
  },
  tabiyaFen:
    "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4",
  structureDiagram: {
    fen: "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/1b2P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7",
    orientation: "white",
    arrows: [{ from: "d3", to: "d4" }],
    caption:
      "A symmetrical, solid Open Game: everyone develops naturally and castles. White keeps a tiny pull and prepares the central break d4.",
  },
  lines: [
    {
      label: "Spanish Four Knights",
      summary: "You borrow the Ruy idea with Bb5 in a symmetrical setup, develop calmly, and use your extra tempo to break the symmetry first.",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Nc3", "Nf6",
        "Bb5", "Bb4", "O-O", "O-O", "d3", "d6",
      ],
      notes: [
        "White claims the centre and frees the kingside.",
        "Black answers symmetrically.",
        "The first knight comes out, attacking e5.",
        "Defending e5 and developing.",
        "The second knight develops and supports e4.",
        "Black mirrors, eyeing e4 in return.",
        "Borrowing the Ruy idea: the bishop pins toward c6.",
        "Black copies with a pin of his own on c3.",
        "King safety first.",
        "Black castles as well — the position stays balanced.",
        "Solidly supporting e4 and opening the queen's bishop.",
        "Black mirrors, keeping the centre firm; a quiet manoeuvring game lies ahead.",
      ],
    },
    {
      label: "Scotch Four Knights",
      summary: "You strike with d4 instead of pinning, then trade on c6 to inflict doubled pawns and play around them for a small, durable pull.",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Nc3", "Nf6",
        "d4", "exd4", "Nxd4", "Bb4", "Nxc6", "bxc6",
      ],
      notes: [
        "White claims the centre.",
        "Black answers in kind.",
        "The first knight develops, hitting e5.",
        "Defending and developing.",
        "The second knight comes out.",
        "Black mirrors.",
        "Striking in the centre instead of pinning — the Scotch flavour.",
        "Black captures the advanced pawn.",
        "Recapturing with the knight, centralising it.",
        "Black pins the c3-knight to add pressure to e4.",
        "Trading on c6 to damage Black's structure.",
        "Recapturing with the b-pawn; White will play around the doubled pawns.",
      ],
    },
  ],
};
