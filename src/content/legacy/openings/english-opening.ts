import type { Opening } from "./types";

// English Opening — original prose; lines are standard public theory.
export const englishOpening: Opening = {
  id: "english-opening",
  name: "English Opening",
  eco: "A10–A39",
  family: "flank",
  trainerColor: "white",
  firstMoves: "1.c4",
  character:
    "A flexible, fianchetto-friendly flank opening. Instead of planting pawns " +
    "in the middle right away, White controls the centre from the side and " +
    "fights especially hard for the d5-square. It can transpose into many " +
    "other structures and often resembles a Sicilian with the colours " +
    "reversed and an extra tempo, so it rewards understanding over " +
    "memorization.",
  whitePlan:
    "Press on d5 with the c-pawn, a knight on c3, and a bishop fianchettoed " +
    "to g2. Develop flexibly, castle, and keep transpositional options open — " +
    "expanding on the queenside or breaking in the centre when the moment is " +
    "right.",
  blackPlan:
    "Contest the centre and the d5-square in return — either mirror White " +
    "symmetrically or grab the centre with ...e5 and play for a reversed " +
    "Sicilian, developing harmoniously before committing the structure.",
  middlegamePlan:
    "The English is a fight for d5 and a flexible, transpositional game. Fianchetto Bg2, " +
    "develop Nc3 and Nf3, castle, then pick the plan the centre allows: queenside expansion " +
    "(Rb1, a3, b4–b5 — a reversed-Sicilian space push), the central d4 break, or simply " +
    "piling on d5. In the Symmetrical, use your extra tempo to break the symmetry first; in " +
    "reversed-Sicilian lines, you're playing Black's favourite opening a move up. Understand " +
    "the plans and the moves follow.",
  ideaQuiz: {
    question: "Which central square does the English fight hardest to control?",
    options: [
      "d5 — pressured by the c-pawn, the c3-knight and the g2-bishop.",
      "e4 — by occupying it with a pawn as soon as possible.",
      "f7 — as the target of a quick attack.",
    ],
    correctIndex: 0,
    explanation:
      "1.c4 is a flank move that fights for the centre from the side, and its laser focus is d5: the c-pawn, a knight on c3, and the fianchettoed g2-bishop all bear down on it. Control d5 (or trade to fix it as a target) and the flexible English plans — queenside expansion or a d4 break — flow naturally.",
  },
  tabiyaFen:
    "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
  structureDiagram: {
    fen: "r1bq1rk1/pp1pppbp/2n2np1/2p5/2P5/2N2NP1/PP1PPPBP/R1BQ1RK1 w - - 6 7",
    orientation: "white",
    arrows: [{ from: "c3", to: "d5" }],
    caption:
      "The English (1.c4) fights for the centre from the flank — often a 'reversed Sicilian'. White fianchettoes, fights for the d5-square, and expands on the wings.",
  },
  lines: [
    {
      label: "Symmetrical Variation",
      summary: "Black mirrors your moves, so use your extra tempo to break the symmetry first — fight for d5 and expand on the queenside before Black does.",
      sans: [
        "c4", "c5", "Nc3", "Nc6", "g3", "g6",
        "Bg2", "Bg7", "Nf3", "Nf6", "O-O", "O-O",
      ],
      notes: [
        "Controlling the centre from the flank and fighting for d5.",
        "Black answers symmetrically, contesting d4 in return.",
        "Developing and adding a second guard to d5.",
        "Black mirrors, eyeing d4.",
        "Preparing the fianchetto that defines the English.",
        "Black follows suit on the kingside.",
        "The bishop takes the long diagonal, bearing down on d5 and the centre.",
        "Black completes a matching fianchetto.",
        "Developing the knight and controlling the central squares.",
        "Black keeps the symmetry, contesting the centre.",
        "King safety first.",
        "Both sides are castled with mirrored set-ups; the subtle fight begins.",
      ],
    },
    {
      label: "Reversed Sicilian",
      summary: "When Black grabs the centre with ...e5, you play a Sicilian a tempo up — press on d5, fianchetto to g2, and steer the reversed-colours middlegame.",
      branch: { from: "Symmetrical Variation", atPly: 1, tryMove: "e5" },
      sans: [
        "c4", "e5", "Nc3", "Nf6",
        "Nf3", "Nc6", "g3", "Bb4", "Bg2", "O-O",
      ],
      notes: [
        "The English advance, fighting for d5 from the flank.",
        "Black grabs the centre — a Sicilian set-up with colours reversed.",
        "Developing and pressing on d5.",
        "Defending e5 and developing toward the centre.",
        "Adding pressure to e5 with natural development.",
        "Black defends e5 again and develops.",
        "Preparing the trademark fianchetto.",
        "Pinning the knight to ease the pressure on e5.",
        "The bishop takes the long diagonal, aiming at d5 and beyond.",
        "King safety, with a comfortable reversed-Sicilian middlegame ahead.",
      ],
    },
    {
      label: "Transposing to the Queen's Gambit",
      summary:
        "The English is a move-order weapon: start 1.c4, and if Black answers ...e6 and ...d5 you play d4 and the game becomes a Queen's Gambit Declined — reached without ever allowing the defences that meet 1.d4 directly.",
      sans: [
        "c4", "e6", "Nc3", "d5",
        "d4", "Nf6", "Bg5", "Be7", "e3", "O-O", "Nf3", "h6", "Bh4", "b6",
      ],
      notes: [
        "The English — a flexible first move that keeps d4 in reserve.",
        "Black prepares ...d5, heading for classical structures.",
        "Developing and fighting for d5.",
        "Black stakes the centre.",
        "NOW d4 — and this is the Queen's Gambit Declined. You reached your main line without facing the Nimzo-Indian, Grünfeld or Benoni.",
        "Black develops into the standard set-up.",
        "The Classical pin against the d5-point.",
        "Breaking the pin.",
        "Solid development.",
        "King safety.",
        "Completing development.",
        "Putting the question to the bishop.",
        "Maintaining the pin.",
        "Heading for ...Bb7 — a normal QGD middlegame, arrived at by a flank route.",
      ],
    },
  ],
};
