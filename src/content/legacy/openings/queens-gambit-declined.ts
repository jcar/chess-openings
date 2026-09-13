import type { Opening } from "./types";

// Queen's Gambit Declined — original prose; lines are standard public theory.
export const queensGambitDeclined: Opening = {
  id: "queens-gambit-declined",
  name: "Queen's Gambit Declined",
  aliases: ["QGD"],
  eco: "D30–D69",
  family: "1d4",
  trainerColor: "black",
  tier: "core",
  firstMoves: "1.d4 d5 2.c4 e6",
  character:
    "The classical, rock-solid way to meet 1.d4. Instead of grabbing the " +
    "offered c4-pawn, Black props up the d5-pawn with ...e6 and builds a " +
    "sturdy wall in the centre. The position is hard to crack: Black unravels " +
    "patiently, completes development, and only then looks for activity. It has " +
    "been a dependable choice at the very highest level for over a century.",
  whitePlan:
    "Develop with Nc3, Bg5 and e3, keep the small space edge the c4/d4 pawns " +
    "give, and pressure Black's slightly cramped position — often with a " +
    "minority attack on the queenside or a central break.",
  blackPlan:
    "Hold the d5-point solidly, finish development with ...Be7, ...O-O and " +
    "...Nf6, then free the position with ...b6 and ...Bb7 (or an eventual " +
    "...c5 / ...dxc4) once the pieces are out.",
  middlegamePlan:
    "The QGD is patient solidity. Hold d5 and complete development (...Be7, ...O-O, " +
    "...Nbd7), then free the game: bring the queenside out with ...b6 and ...Bb7, and aim " +
    "for a freeing break — ...c5, or ...dxc4 followed by ...c5/...e5. Watch for White's " +
    "minority attack (b4–b5, trading to leave you a weak c6-pawn) and meet it by keeping " +
    "your structure compact and finding a ...c5 or ...e5 counter-break before the c6-pawn " +
    "becomes a long-term target.",
  ideaQuiz: {
    question: "In QGD Exchange structures White often plays a 'minority attack' (b4–b5). What's the idea?",
    options: [
      "Push b4–b5 to swap on c6 and leave Black a weak, backward c-pawn to target.",
      "Gain kingside space to launch a mating attack.",
      "Open the a-file so the rook can invade on a8.",
    ],
    correctIndex: 0,
    explanation:
      "With fewer queenside pawns, White advances b4–b5 and trades on c6, leaving Black a weak c6-pawn on a half-open file — a long-term target. Black answers by keeping the structure tight and seeking the ...c5 or ...e5 break for counterplay before that weakness tells.",
  },
  tabiyaFen:
    "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  structureDiagram: {
    fen: "rnbq1rk1/p1p1bpp1/1p2pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 8",
    orientation: "black",
    arrows: [{ from: "c7", to: "c5" }],
    caption:
      "Queen's Gambit Declined: a solid but slightly cramped structure. Black frees it with the ...c5 break (or ...dxc4 and ...e5); White plays for the e4 break or a queenside minority attack.",
  },
  lines: [
    {
      label: "Classical main line",
      summary: "You decline the gambit and build a solid wall on d5, then unravel patiently with ...b6 and ...Bb7 before seeking a freeing break.",
      sans: [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7",
        "e3", "O-O", "Nf3", "h6", "Bh4", "b6",
      ],
      notes: [
        "White claims the centre and prepares c4.",
        "Black contests the centre at once.",
        "The Queen's Gambit: White offers the c-pawn to deflect d5.",
        "Declining — ...e6 supports d5 instead of capturing on c4.",
        "Developing and adding a second attacker to d5.",
        "Defending d5 and developing naturally.",
        "Pinning the knight to pressure the d5-pawn.",
        "Breaking the pin's sting and preparing to castle.",
        "A solid, classical set-up that frees the light bishop.",
        "King safety first.",
        "Completing the kingside development.",
        "Putting the question to the bishop before it gets annoying.",
        "Maintaining the pin rather than conceding the bishop.",
        "Preparing ...Bb7 to free the queenside and challenge the long diagonal.",
      ],
      commonMistakes: [
        {
          ply: 7,
          move: "c5",
          why: "Too early. With your king still in the centre and the f6-knight pinned by Bg5, ...c5 opens the position to White's benefit (cxd5 and pressure down the c- and d-files). Complete development first — ...Be7, ...O-O, ...Nbd7 — THEN break with ...c5.",
        },
      ],
    },
    {
      label: "Exchange Variation",
      summary: "White clarifies with cxd5 and eyes the minority attack b4–b5 at your c6-pawn; develop your bishop actively and ready a ...c5 or ...e5 break.",
      branch: { from: "Classical main line", atPly: 6, tryMove: "cxd5" },
      sans: [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "cxd5", "exd5",
        "Bg5", "c6", "e3", "Bf5",
      ],
      notes: [
        "White takes the centre.",
        "Black contests it.",
        "Offering the gambit.",
        "Declining with ...e6.",
        "Developing toward d5.",
        "Developing and guarding d5.",
        "The Exchange: clarifying the centre and fixing Black's structure.",
        "Recapturing toward the centre, leaving Black a slightly rigid pawn.",
        "Pinning the knight to add pressure on d5.",
        "Bolstering d5 and giving the queen a route out.",
        "A solid set-up, eyeing the minority attack with b4–b5.",
        "Developing the bishop actively outside the pawn chain — a key point of this line.",
      ],
    },
    {
      label: "Facing the Catalan (3.g3)",
      summary: "White fianchettoes the g2-bishop to rake the long diagonal; you grab the c4-pawn with a tempo to ease the cramp before giving it back.",
      sans: [
        "d4", "Nf6", "c4", "e6", "g3", "d5", "Bg2", "Be7",
        "Nf3", "O-O", "O-O", "dxc4",
      ],
      notes: [
        "White claims the centre.",
        "Developing and controlling central squares.",
        "Gaining queenside space and pressuring d5 ideas.",
        "Solid development that keeps the centre flexible.",
        "The Catalan: White prepares a long-diagonal fianchetto.",
        "Staking a claim in the centre.",
        "The Catalan bishop, bearing down the long diagonal toward d5 and b7.",
        "Developing and preparing to castle.",
        "Developing naturally and supporting the centre.",
        "King safety.",
        "Castling into a harmonious set-up.",
        "Grabbing the c-pawn to gain a tempo and ease the cramped position.",
      ],
    },
    {
      label: "Indian move order (1...Nf6)",
      summary:
        "The same QGD by a different door: you play ...Nf6 first and only then ...d5. Learn to recognise the position, not the sequence — from move 6 this is note-for-note the Classical main line.",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nc3", "d5",
        "Bg5", "Be7", "e3", "O-O", "Nf3", "h6", "Bh4", "b6",
      ],
      notes: [
        "White takes the centre.",
        "A flexible Indian start — you have not committed the d-pawn yet.",
        "White grabs more space and pressures d5 before you have played there.",
        "Preparing ...d5 with the pawn rather than playing it at once.",
        "Developing and covering d5 and e4.",
        "NOW the pawn comes — and the position is exactly the Queen's Gambit Declined. Same house, different door.",
        "Pinning the knight to increase the pressure on d5.",
        "Calmly breaking the pin.",
        "Solid, if modest, development.",
        "King safety.",
        "Developing the last minor piece.",
        "Putting the question to the bishop before committing.",
        "Keeping the pin along the diagonal.",
        "Preparing ...Bb7 to fight for the long diagonal — the Tartakower plan.",
      ],
      commonMistakes: [
        {
          ply: 5,
          move: "Bb4",
          why: "That is the Nimzo-Indian, a fine opening — but a different one. If your repertoire is the QGD, play ...d5 here and you reach your own main line by transposition. Choosing between them is a repertoire decision, not a move-order accident.",
        },
      ],
    },
  ],
};
