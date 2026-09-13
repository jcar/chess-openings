import type { Opening } from "./types";

// French Defence — original prose; lines are standard public theory.
export const frenchDefence: Opening = {
  id: "french-defence",
  name: "French Defence",
  eco: "C00–C19",
  family: "1e4-other",
  trainerColor: "black",
  tier: "core",
  firstMoves: "1.e4 e6",
  character:
    "Solid and combative. Black answers 1.e4 with 1...e6, preparing to challenge " +
    "the centre with ...d5 behind a sturdy pawn wall. The only initial drawback " +
    "is the light-squared bishop, which is hemmed in by the ...e6 pawn, but the " +
    "resulting structure is famously tough and resilient.",
  whitePlan:
    "Build and defend a broad pawn centre, gain kingside space, and attack on the " +
    "wing where the cramped Black position is most vulnerable, often targeting " +
    "the kingside while Black is slow to develop.",
  blackPlan:
    "Accept a slightly cramped position in return for a rock-solid structure, " +
    "then chip away at White's centre with the ...c5 break (and sometimes ...f6), " +
    "and find good homes for the pieces — especially the problem bishop.",
  middlegamePlan:
    "The French is a pawn-chain battle. Strike the BASE of White's chain with ...c5 " +
    "(and sometimes ...f6 against an e5-chain) and pile up on d4 — don't release the " +
    "tension early. Solve your 'French bishop' (the c8-bishop hemmed in by ...e6): trade " +
    "it via ...b6 and ...Ba6, or activate it with ...Bd7–b5. Your play is on the queenside " +
    "and against d4; White's is the kingside, so push your break before White's attack lands.",
  ideaQuiz: {
    question: "White has a pawn chain (e5–d4). Where does Black strike at it?",
    options: [
      "At the BASE with ...c5 (and sometimes ...f6).",
      "At the head with ...e5.",
      "On the flank with ...h5 and ...g5.",
    ],
    correctIndex: 0,
    explanation:
      "You attack a pawn chain at its base. White's chain rests on d4, so ...c5 (hitting d4) is the thematic French break, often backed by ...Nc6 and ...Qb6. Undermine the base and the whole chain — and White's space — starts to crumble.",
  },
  tabiyaFen:
    "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
  structureDiagram: {
    fen: "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6",
    orientation: "black",
    arrows: [{ from: "c5", to: "d4" }],
    caption:
      "French Advance: White gains space with the c3\u2013d4\u2013e5 pawn chain; Black strikes at its base with ...c5 and piles up on d4 (...Qb6, ...Nc6) while developing the queenside.",
  },
  lines: [
    {
      label: "Advance Variation",
      summary: "White locks the centre with e5; you pile up on the d4-base with ...c5, ...Nc6 and ...Qb6, attacking the chain instead of releasing the tension.",
      sans: [
        "e4", "e6", "d4", "d5", "e5", "c5", "c3", "Nc6", "Nf3", "Qb6",
      ],
      notes: [
        "White grabs the centre.",
        "The French: Black prepares ...d5 to challenge the centre.",
        "Reinforcing the centre and opening lines.",
        "Black hits the e4-pawn, the heart of the French.",
        "The Advance: White pushes past, gaining space and fixing the centre.",
        "Black's thematic break, striking at the base of the chain on d4.",
        "Defending d4 so the centre holds.",
        "Piling more pressure on the d4-pawn.",
        "Defending d4 again and developing.",
        "Hitting d4 a third time and eyeing the weak b2-pawn.",
      ],
      commonMistakes: [
        {
          ply: 5,
          move: "Nf6",
          why: "Careful — White's e5-pawn covers f6, so ...Nf6?? simply hangs the knight to exf6. In the Advance French the knight develops to e7 (or h6); you fight the centre with the ...c5 break, not ...Nf6.",
        },
        {
          ply: 7,
          move: "cxd4",
          why: "Don't release the tension early. After ...cxd4 cxd4 White's centre is rock-solid and you've given up your main lever. Keep the pressure on d4 (...Nc6, ...Qb6) and make White resolve it.",
        },
      ],
    },
    {
      label: "Winawer Variation",
      summary: "You pin and trade on c3 to wreck White's queenside pawns, accepting a cramped but resilient structure with dynamic counterplay against the doubled pawns.",
      sans: [
        "e4", "e6", "d4", "d5", "Nc3", "Bb4", "e5", "c5",
        "a3", "Bxc3+", "bxc3", "Ne7",
      ],
      notes: [
        "White grabs the centre.",
        "The French.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "Developing and defending e4 — the most aggressive try.",
        "The Winawer pin, attacking the knight that guards e4.",
        "Pushing past with gain of space and locking the centre.",
        "Black's thematic break against d4.",
        "Putting the question to the pinning bishop.",
        "Black trades the bishop, damaging White's queenside pawns.",
        "Recapturing — White gets the bishop pair but doubled c-pawns.",
        "Developing the knight toward f5 or g6, eyeing White's centre.",
      ],
    },
    {
      label: "Classical Variation (3.Nc3)",
      summary: "You develop ...Nf6 and meet Bg5 calmly; after White pushes e5 you regroup with ...Nfd7 and break with ...c5 against the d4-base.",
      branch: { from: "Advance Variation", atPly: 4, tryMove: "Nc3" },
      sans: [
        "e4", "e6", "d4", "d5", "Nc3", "Nf6", "Bg5", "Be7",
        "e5", "Nfd7", "Bxe7", "Qxe7",
      ],
      notes: [
        "White grabs the centre.",
        "The French.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "Developing and adding a defender to e4.",
        "The Classical move: developing and hitting e4.",
        "Pinning the knight to maintain the e4-point.",
        "Calmly breaking the pin.",
        "Pushing past, gaining space and chasing the f6-knight.",
        "Retreating to regroup, leaving e7 defended.",
        "Trading off the pinning bishop on Black's terms.",
        "Recapturing with the queen, ready to break with ...c5.",
      ],
    },
    {
      label: "Tarrasch Variation (3.Nd2)",
      summary: "White develops quietly with Nd2; you strike at once with ...c5 and accept an isolated d-pawn, getting fast, active piece play in return.",
      branch: { from: "Advance Variation", atPly: 4, tryMove: "Nd2" },
      sans: [
        "e4", "e6", "d4", "d5", "Nd2", "c5", "exd5", "exd5",
        "Ngf3", "Nc6", "Bb5", "Bd6",
      ],
      notes: [
        "White grabs the centre.",
        "The French.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "The Tarrasch: developing flexibly without blocking the c-pawn.",
        "Black's immediate strike at the d4-base.",
        "Releasing the tension and opening the position.",
        "Recapturing toward the centre, accepting an isolated d-pawn.",
        "Developing and eyeing the d4 and e5 squares.",
        "Developing and pressuring d4.",
        "Pinning the knight to increase pressure on d4.",
        "Developing actively and overprotecting the d-pawn's outpost.",
      ],
    },
    {
      label: "Exchange Variation",
      summary: "White releases the tension with exd5; the position goes symmetrical, so you develop naturally and play for a balanced full game — and your problem bishop is finally free.",
      branch: { from: "Advance Variation", atPly: 4, tryMove: "exd5" },
      sans: [
        "e4", "e6", "d4", "d5", "exd5", "exd5",
        "Nf3", "Nf6", "Bd3", "Bd6", "O-O", "O-O",
      ],
      notes: [
        "White grabs the centre.",
        "The French.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "The Exchange: White clears the centre for a symmetrical structure.",
        "Recapturing — and the light bishop now has the c8–h3 diagonal free.",
        "Natural development.",
        "Mirroring, developing and eyeing the centre.",
        "Developing the bishop to its best diagonal.",
        "Copying — the symmetry keeps everything sound.",
        "King safety.",
        "Castling too; a balanced middlegame where small plans decide.",
      ],
    },
    {
      label: "Rubinstein Variation",
      summary: "You resolve the centre at once with ...dxe4, giving up a little space for a rock-solid, weakness-free position and an easy plan of ...c5 and smooth development.",
      branch: { from: "Classical Variation (3.Nc3)", atPly: 5, tryMove: "dxe4" },
      sans: [
        "e4", "e6", "d4", "d5", "Nc3", "dxe4",
        "Nxe4", "Nd7", "Nf3", "Ngf6", "Nxf6+", "Nxf6",
      ],
      notes: [
        "White grabs the centre.",
        "The French.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "Developing and defending e4.",
        "The Rubinstein: resolving the centre to sidestep any cramping bind.",
        "Recapturing in the centre.",
        "Flexible — preparing ...Ngf6 without allowing doubled pawns.",
        "Calm development.",
        "Challenging the strong e4-knight.",
        "Trading to keep it simple.",
        "Recapturing with a healthy structure; next comes ...c5 and development.",
      ],
    },
  ],
};
