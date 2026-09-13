import type { Opening } from "./types";

// Italian Game — original prose; lines are standard public theory.
export const italianGame: Opening = {
  id: "italian-game",
  name: "Italian Game",
  aliases: ["Giuoco Piano"],
  eco: "C50–C54",
  family: "1e4-e5",
  trainerColor: "white",
  tier: "core",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Bc4",
  character:
    "One of the oldest openings, and the friendliest introduction to 1.e4 e5. " +
    "White develops naturally and points the light-squared bishop straight at " +
    "f7 — the square only the king defends. It can be played very quietly " +
    "(maneuvering for a slow build-up) or sharply (with an early d4 break), so " +
    "it scales with your taste while always teaching sound development.",
  whitePlan:
    "Develop quickly, castle, and aim the bishop at f7. Choose between the " +
    "restrained d3 set-up (the 'Giuoco Pianissimo', a slow maneuvering game) " +
    "or the classical c3 + d4 break to seize a big pawn centre.",
  blackPlan:
    "Mirror White's healthy development with ...Bc5 and ...Nf6, keep e5 " +
    "defended, castle, and be ready to hit back in the centre with ...d5 once " +
    "pieces are out.",
  middlegamePlan:
    "In the quiet Giuoco Pianissimo, both sides are castled and nothing is forced — " +
    "so improve your pieces and prepare a break. White's signature plan is to reroute " +
    "the b1-knight: Nbd2–f1–g3 (eyeing f5) or Nbd2–f1–e3 (eyeing d5/f5), then play for " +
    "d4 or a kingside expansion with h3 and g4. Black's freeing idea is ...d5 (often " +
    "prepared by ...a6, ...Ba7, ...Re8); if you let it land for free, your edge " +
    "evaporates. So: knight to g3/e3, restrain ...d5, and pick the wing where you're better.",
  ideaQuiz: {
    question:
      "It's a quiet Giuoco Pianissimo and nothing is forced. What's White's typical plan with the b1-knight?",
    options: [
      "Reroute it Nbd2–f1–g3 (or e3) toward the kingside / d5.",
      "Trade it off as fast as possible to simplify.",
      "Leave it on b1 and attack on the queenside with the a- and b-pawns.",
    ],
    correctIndex: 0,
    explanation:
      "The b1-knight has no good square on the queenside, so the standard maneuver is Nbd2–f1–g3 (heading for f5) or Nbd2–f1–e3 (eyeing d5 and f5). It joins a kingside build-up and helps restrain Black's ...d5 break — a far better use than trading or leaving it passive.",
  },
  tabiyaFen:
    "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
  structureDiagram: {
    fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 w - - 2 7",
    orientation: "white",
    arrows: [{ from: "b1", to: "d2" }],
    caption:
      "The quiet Giuoco Pianissimo middlegame: both sides castled and solid. White's signature plan is the knight reroute Nb1–d2–f1–g3, then a break with d4 or a kingside push.",
  },
  lines: [
    {
      label: "Giuoco Pianissimo (quiet main line)",
      summary: "You build slowly with c3 and d3, then reroute the b1-knight toward f5 or d5 and pick the wing where you stand better.",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5",
        "c3", "Nf6", "d3", "d6", "O-O", "O-O",
      ],
      notes: [
        "White takes the centre and opens lines for the bishop and queen.",
        "Black stakes an equal claim in the centre.",
        "Natural development that immediately pressures e5.",
        "Defends e5 and develops a knight to its best square.",
        "The Italian bishop takes aim at f7 — the point only the king guards.",
        "Black mirrors, pointing the bishop back at f2.",
        "Preparing the d4 break and giving the bishop a retreat on c2.",
        "Developing and putting a question to the e4-pawn.",
        "The 'very quiet' approach: solidly supporting e4 instead of rushing.",
        "Black answers in kind, keeping the centre firm.",
        "King safety first.",
        "Both sides are castled and developed; now a rich maneuvering game begins.",
      ],
      commonMistakes: [
        {
          ply: 6,
          move: "Ng5",
          why: "Too early. The knight lunge at f7 just gets hit by ...d5 (or ...h6), and you lose time chasing nothing. In the quiet Italian you build slowly — c3 and d3 first.",
        },
        {
          ply: 8,
          move: "Bxf7+",
          why: "Sacking the bishop for one pawn: after ...Kxf7 the king is perfectly safe and you're simply down a piece. The bishop's job is to PRESSURE f7, not give itself up without a concrete follow-up.",
        },
      ],
    },
    {
      label: "Classical c3 + d4 break",
      summary: "You prepare with c3 and strike with d4 to claim a broad pawn centre and open lines for a fast, classical initiative.",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5",
        "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Nc3",
      ],
      notes: [
        "White takes the centre.",
        "Black stakes an equal claim.",
        "Developing with pressure on e5.",
        "Defending e5 and developing.",
        "The bishop eyes f7.",
        "Black mirrors the development.",
        "Preparing the central break d4.",
        "Developing and hitting e4.",
        "The critical thrust the Italian is built around — challenging the centre.",
        "Black accepts the challenge and captures.",
        "Recapturing, White owns a classical broad pawn centre.",
        "A check that forces White to resolve the position.",
        "Blocking the check and defending — the fight for the centre is on.",
      ],
    },
    {
      label: "Evans Gambit",
      summary: "You sacrifice the b-pawn with b4 to deflect Black's bishop, gain time with c3 and d4, and build a big attacking centre.",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5",
        "b4", "Bxb4", "c3", "Ba5", "d4", "exd4",
      ],
      notes: [
        "White takes the centre.",
        "Black stakes an equal claim.",
        "Developing with pressure on e5.",
        "Defending e5 and developing.",
        "The Italian bishop eyes f7.",
        "Black mirrors the development.",
        "The gambit: offering a pawn to deflect the bishop and seize the centre.",
        "Black accepts, snatching the pawn.",
        "Gaining a tempo on the bishop while preparing the big d4 push.",
        "Retreating but keeping the bishop active on the diagonal.",
        "Cashing in on the lead in development to build a broad centre.",
        "Black grabs another pawn, but White's lead and open lines are the payment.",
      ],
    },
    {
      label: "Two Knights (3...Nf6 instead of ...Bc5)",
      summary: "When Black counters e4 with ...Nf6, you keep it calm with d3, sidestepping the wild Fried Liver and steering into a quiet build-up.",
      branch: { from: "Giuoco Pianissimo (quiet main line)", atPly: 5, tryMove: "Nf6" },
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6",
        "d3", "Be7", "O-O", "O-O", "Re1",
      ],
      notes: [
        "Claiming the centre.",
        "A symmetrical reply.",
        "Developing and pressuring e5.",
        "Defending e5 and developing.",
        "The Italian bishop eyes f7.",
        "The Two Knights: instead of mirroring with ...Bc5, Black develops the knight and counter-attacks e4.",
        "Keep it quiet — calmly defend e4. (The sharp 4.Ng5 exists, but d3 gives a sound, easy game and sidesteps the wild Fried Liver theory.)",
        "Black develops and prepares to castle.",
        "King safety first.",
        "Black castles too.",
        "Reinforce e4 and steer into the same plan: Nbd2–f1–g3 and a patient build-up.",
      ],
    },
  ],
};
