import type { Opening } from "./types";

// Grünfeld Defence — original prose; lines are standard public theory.
export const grunfeld: Opening = {
  id: "grunfeld",
  name: "Grünfeld Defence",
  aliases: ["Gruenfeld"],
  eco: "D70–D99",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 g6 3.Nc3 d5",
  character:
    "A bold, hypermodern answer to 1.d4. Instead of occupying the centre, " +
    "Black invites White to build a broad pawn front — and then sets out to " +
    "tear it down. The fianchettoed bishop on g7 rakes the long diagonal while " +
    "...c5 and piece pressure pour onto the centre. It is dynamic, double-edged " +
    "chess where Black trades space for activity.",
  whitePlan:
    "Accept the invitation: grab the centre with pawns on d4 and e4, develop " +
    "behind them, and try to prove the space advantage by keeping the pawns " +
    "rolling and the centre intact.",
  blackPlan:
    "Let White overextend, then strike with ...c5 and the g7-bishop down the " +
    "long diagonal, hitting d4 and the queenside until White's proud centre " +
    "becomes a target rather than a strength.",
  middlegamePlan:
    "The Grünfeld is the Alekhine's big brother: invite White's d4/e4 centre, then tear it " +
    "down. The g7-bishop rakes the long diagonal, and ...c5 (backed by ...Nc6, ...Qa5, " +
    "...Bg4 and ...Rd8) hammers d4 and White's pawns. In the Exchange line, target the " +
    "c3-pawn White creates — pile up until the proud centre cracks. Don't sit still: the " +
    "moment White's pawns advance, attack them, because a centre you can't pressure is a " +
    "centre that simply wins.",
  ideaQuiz: {
    question: "White builds a big d4/e4 pawn centre in the Grünfeld. How should Black treat it?",
    options: [
      "As a target — attack it at once with ...c5, the g7-bishop and piece pressure.",
      "As unstoppable — settle into a passive defensive crouch.",
      "By copying it with Black's own central pawns.",
    ],
    correctIndex: 0,
    explanation:
      "The Grünfeld is hypermodern to its core: a pawn centre is only strong if it can't be hit. Black hands White the centre, then assaults it — ...c5 and ...Bg7 strike d4, ...Nc6/...Qa5/...Rd8 pile on, and in the Exchange the doubled c3-pawn becomes a chronic target. Activity, not occupation.",
  },
  tabiyaFen:
    "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4",
  structureDiagram: {
    fen: "rnbqk2r/pp2ppbp/6p1/2p5/2BPP3/2P5/P4PPP/R1BQK1NR w KQkq - 0 8",
    orientation: "black",
    arrows: [{ from: "c5", to: "d4" }],
    caption:
      "The Grünfeld lets White build a big pawn centre, then blasts at it: ...dxc4, the ...Bg7 fianchetto, and ...c5 hitting d4. Black's pieces target the centre from a distance.",
  },
  lines: [
    {
      label: "Exchange Variation",
      summary: "You let White build a big d4/e4 centre, then tear it down with ...c5, the g7-bishop and pressure on d4 and the doubled c3-pawn.",
      sans: [
        "d4", "Nf6", "c4", "g6", "Nc3", "d5",
        "cxd5", "Nxd5", "e4", "Nxc3", "bxc3", "Bg7", "Bc4", "c5",
      ],
      notes: [
        "White claims the centre and opens lines.",
        "A flexible developing move, eyeing the centre from afar.",
        "Adding a second centre pawn and clamping down.",
        "The hypermodern signal: the bishop is heading to g7.",
        "Defending d5 and developing toward the centre.",
        "Black finally stakes a central claim — the Grünfeld is on.",
        "White trades to gain the big centre Black is inviting.",
        "Recapturing with the knight, ready to challenge.",
        "Building the broad pawn centre — exactly what Black wants to attack.",
        "Trading off, doubling White's pawns and creating a target.",
        "Recapturing; White owns the centre but the c3-pawn is a weakness.",
        "The bishop takes its long-diagonal post, raking d4.",
        "The classic Grünfeld bishop, eyeing f7.",
        "The thematic break — Black hits the proud centre at last.",
      ],
      commonMistakes: [
        {
          ply: 9,
          move: "Nb6",
          why: "Trade on c3 first. Retreating with 5...Nb6 lets White keep a broad, healthy e4/d4 centre with NO weakened c-pawns — you've handed back the Grünfeld's main trump. Play ...Nxc3 to saddle White with the doubled c-pawn, then attack d4 with ...c5, ...Bg7 and ...Nc6.",
        },
      ],
    },
    {
      label: "Russian System",
      summary: "White's queen swings to b3 to recover the c4-pawn; you finish the fianchetto, castle, and unleash ...c5 to strike the broad centre.",
      branch: { from: "Exchange Variation", atPly: 6, tryMove: "Nf3" },
      sans: [
        "d4", "Nf6", "c4", "g6", "Nc3", "d5",
        "Nf3", "Bg7", "Qb3", "dxc4", "Qxc4", "O-O",
      ],
      notes: [
        "White claims the centre.",
        "Flexible development.",
        "Reinforcing the centre.",
        "Preparing the fianchetto.",
        "Black completes the central challenge.",
        "Developing the knight before committing the centre.",
        "The bishop reaches its long-diagonal home.",
        "The Russian System: the queen swings out to pressure d5 and b7.",
        "Black grabs the pawn rather than defend d5.",
        "Recapturing, the queen sits actively on c4.",
        "King safety — Black is comfortably developed and ready for ...c5.",
      ],
    },
  ],
};
