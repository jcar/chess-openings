import type { Opening } from "./types";

// Queen's Indian Defence — original prose; lines are standard public theory.
export const queensIndian: Opening = {
  id: "queens-indian",
  name: "Queen's Indian Defence",
  aliases: ["QID"],
  eco: "E12–E19",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 e6 3.Nf3 b6",
  character:
    "A calm, hypermodern reply to 3.Nf3. Instead of grabbing the centre with " +
    "pawns, Black fianchettoes the light-squared bishop to b7 (sometimes a6) " +
    "and fights for the key e4-square from a distance. The result is a solid, " +
    "flexible position that is famously hard to crack.",
  whitePlan:
    "Fianchetto with g3 and Bg2 to contest the long diagonal, castle, and use " +
    "the central space and the c-file to build slow, lasting pressure.",
  blackPlan:
    "Develop the bishop to b7 (or a6 to hit c4), control e4, complete " +
    "development with ...Be7 and castling, and look for the freeing ...d5 or " +
    "...c5 breaks at the right moment.",
  middlegamePlan:
    "The Queen's Indian is a quiet fight for one square: e4. Your b7-bishop (or ...Ba6, " +
    "hitting c4) controls it from afar; back it up with ...Ne4 jumps, ...d5, or ...f5 ideas. " +
    "Finish developing (...Be7, ...O-O, then ...d5 or ...c5), neutralise White's central " +
    "space by trading, and aim for a rock-solid position where White's edge is symbolic. " +
    "...Ba6 is the sharp try — it pressures c4 directly and provokes a concession (b3) " +
    "before you reposition the bishop.",
  ideaQuiz: {
    question: "What single square is the whole Queen's Indian struggle about?",
    options: [
      "e4 — Black's b7-bishop and pieces contest it from a distance.",
      "h7 — defending against a kingside mating attack.",
      "d4 — winning White's centre pawn outright.",
    ],
    correctIndex: 0,
    explanation:
      "The Queen's Indian is hypermodern control, not occupation. Black doesn't grab the centre with pawns; the b7-bishop (reinforced by ...Ne4, ...d5 or ...f5) fights for e4 from afar. Deny White a free e4 and the big centre never fully forms — Black equalises by control.",
  },
  tabiyaFen:
    "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4",
  structureDiagram: {
    fen: "rn1q1rk1/pbppbppp/1p2pn2/8/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 5 7",
    orientation: "black",
    arrows: [{ from: "b7", to: "e4" }],
    caption:
      "The Queen's Indian fights for the e4-square from afar with the ...b6 and ...Bb7 fianchetto — a flexible, harmonious setup against White's own fianchetto.",
  },
  lines: [
    {
      label: "Main Line (4.g3 Bb7)",
      summary: "You fianchetto on b7 to fight for e4 from afar, then finish development and aim for ...d5 or ...c5, reducing White's edge to a symbol.",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nf3", "b6",
        "g3", "Bb7", "Bg2", "Be7", "O-O", "O-O",
      ],
      notes: [
        "White claims the centre.",
        "Black develops flexibly, keeping options open.",
        "Grabbing space and pressuring a future ...d5.",
        "Solid and flexible, opening the dark-squared bishop's path.",
        "Developing the knight and steering clear of an early ...Bb4 pin.",
        "The Queen's Indian move — preparing the b7 fianchetto.",
        "Contesting the long diagonal before Black settles on it.",
        "The signature bishop — eyeing e4 along the long light diagonal.",
        "White's bishop faces off on the same diagonal.",
        "Calm development, ready to castle.",
        "King safety first.",
        "Both sides castled; a subtle maneuvering struggle over e4 begins.",
      ],
    },
    {
      label: "4...Ba6",
      summary: "Your bishop hits c4 directly, provoking a concession like b3 before you reroute it — a sharper, more concrete way to challenge White's setup.",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nf3", "b6",
        "g3", "Ba6", "b3", "Bb4+", "Bd2", "Be7",
      ],
      notes: [
        "White claims the centre.",
        "Black stays flexible.",
        "Grabbing space.",
        "Solid and flexible.",
        "Developing and avoiding the pin.",
        "Preparing the fianchetto.",
        "Heading for the long diagonal.",
        "The sharp alternative — the bishop hits the c4-pawn directly.",
        "Defending c4 before completing the fianchetto.",
        "A useful check to provoke a concession before retreating.",
        "Blocking the check naturally.",
        "Repositioning the bishop, having extracted the b3 move from White.",
      ],
    },
  ],
};
