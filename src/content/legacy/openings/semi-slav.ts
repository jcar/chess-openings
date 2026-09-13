import type { Opening } from "./types";

// Semi-Slav Defence — original prose; lines are standard public theory.
export const semiSlav: Opening = {
  id: "semi-slav",
  name: "Semi-Slav Defence",
  aliases: ["Meran","Semi Slav"],
  eco: "D43–D49",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6",
  character:
    "A rock-solid yet ambitious answer to the Queen's Gambit. Black props up " +
    "the d5-pawn with BOTH ...c6 and ...e6, building a sturdy wall in the " +
    "centre. From this fortress Black can grab the c4-pawn and expand on the " +
    "queenside with ...b5, leading to some of the richest play in all of chess.",
  whitePlan:
    "Develop the pieces, decide between quiet pressure and a sharp pawn storm " +
    "(g4 ideas in the Botvinnik/Anti-Meran), and use the central majority and " +
    "space to keep Black slightly cramped.",
  blackPlan:
    "Hold the d5 strongpoint with ...c6 and ...e6, then unwind: capture on c4, " +
    "play ...b5 to gain queenside space, develop the light-squared bishop " +
    "actively, and aim for a freeing ...c5 or ...e5 break.",
  middlegamePlan:
    "The Semi-Slav is a fortress that turns into a battering ram. You prop up d5 with BOTH " +
    "...c6 and ...e6, then unwind on the queenside: take ...dxc4, play ...b5 to gain space " +
    "and chase the bishop, develop ...Bb7 on the long diagonal, and prepare the freeing " +
    "...c5 break. The Meran (after e3) is the main road — fast queenside play; the Botvinnik " +
    "and Anti-Moscow lines (Bg5) are razor-sharp and reward exact preparation. Your trumps " +
    "are the active light-squared bishop and queenside space; race them against White's " +
    "central majority.",
  ideaQuiz: {
    question: "How does Black turn the solid Semi-Slav wall into active play?",
    options: [
      "Take ...dxc4 and expand on the queenside with ...b5, ...Bb7 and a later ...c5.",
      "Castle queenside and storm the kingside with ...g5.",
      "Trade every piece for a dead-drawn endgame.",
    ],
    correctIndex: 0,
    explanation:
      "The ...c6/...e6 wall is solid but passive on its own. Black animates it by grabbing c4 and then expanding: ...b5 gains space and hits the bishop, ...Bb7 activates the problem piece on the long diagonal, and ...c5 frees the centre. Solidity first, then queenside dynamism.",
  },
  tabiyaFen:
    "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
  structureDiagram: {
    fen: "r1bqkb1r/p2n1ppp/2p1pn2/1p6/2BP4/2N1PN2/PP3PPP/R1BQK2R w KQkq - 0 8",
    orientation: "black",
    arrows: [{ from: "c6", to: "c5" }],
    caption:
      "The Semi-Slav plays both ...c6 and ...e6 — rock-solid yet sharp. In the Meran, Black expands on the queenside with ...b5 and frees the game with the ...c5 break.",
  },
  lines: [
    {
      label: "Meran Variation",
      summary: "After e3 you grab ...dxc4 and fire off ...b5, gaining queenside space, chasing the bishop and racing your majority against White's centre.",
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3",
        "e6", "e3", "Nbd7", "Bd3", "dxc4", "Bxc4", "b5",
      ],
      notes: [
        "White claims the centre.",
        "Black challenges it.",
        "The Queen's Gambit, pressuring d5.",
        "The Slav move — supporting d5 with the c-pawn.",
        "Developing and eyeing the centre.",
        "A natural developer defending d5.",
        "Adding a third attacker to d5.",
        "The Semi-Slav move — now d5 is backed by both ...c6 and ...e6.",
        "Modest but solid, opening the bishop and locking the centre.",
        "Developing toward the queenside and preparing ...dxc4.",
        "Recapturing-square ready: the bishop sits on its natural diagonal.",
        "Now is the moment — grabbing the c4-pawn.",
        "White regains the pawn with an active bishop.",
        "The Meran's signature — gaining space and hitting the bishop.",
      ],
    },
    {
      label: "Botvinnik Variation (5.Bg5)",
      summary: "You snatch the c4-pawn and cling to it through razor-sharp complications, banking on queenside space and the bishop pair where exact prep decides everything.",
      branch: { from: "Meran Variation", atPly: 8, tryMove: "Bg5" },
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3",
        "e6", "Bg5", "dxc4", "e4", "b5",
      ],
      notes: [
        "White claims the centre.",
        "Black challenges it.",
        "The gambit, pressuring d5.",
        "Supporting d5 with the c-pawn.",
        "Developing and eyeing the centre.",
        "Defending d5.",
        "Piling onto d5.",
        "The Semi-Slav move — d5 now has two pawn defenders.",
        "The sharpest try — pinning the knight and inviting complications.",
        "Black grabs the pawn before White can solidify.",
        "Striking in the centre and intending to gain more with e5.",
        "The fearless main line — clutching the extra pawn and gaining space.",
      ],
    },
    {
      label: "Indian move order (...e6 before ...c6)",
      summary:
        "You reach the Semi-Slav triangle in the reverse order — ...Nf6 and ...e6 first, ...c6 last. From move 8 it is the Meran main line exactly; recognising that saves you from re-deriving the plan at the board.",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nf3", "d5", "Nc3", "c6",
        "e3", "Nbd7", "Bd3", "dxc4", "Bxc4", "b5",
      ],
      notes: [
        "White takes the centre.",
        "A flexible Indian move — the d-pawn stays home for now.",
        "White grabs space on the queenside.",
        "Supporting a coming ...d5.",
        "Developing and covering e5 and d4.",
        "Now the centre pawn arrives.",
        "Developing and pressing d5.",
        "...c6 completes the Semi-Slav triangle — and this is the standard position, one move order removed.",
        "Solid, if modest, development.",
        "Developing and preparing ...dxc4 with ...b5.",
        "The bishop takes its natural diagonal.",
        "Grabbing the pawn now that the bishop has committed, gaining a tempo.",
        "Recapturing.",
        "The Meran: seizing queenside space and hitting the bishop.",
      ],
      commonMistakes: [
        {
          ply: 7,
          move: "Be7",
          why: "Playable, but it is a Queen's Gambit Declined, not a Semi-Slav — you have shut in the c8-bishop without gaining the ...c6/...b5 queenside play. If the Semi-Slav is your line, ...c6 here is the move that gets you there.",
        },
      ],
    },
  ],
};
