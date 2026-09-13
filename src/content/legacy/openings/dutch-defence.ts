import type { Opening } from "./types";

// Dutch Defence — original prose; lines are standard public theory.
export const dutchDefence: Opening = {
  id: "dutch-defence",
  name: "Dutch Defence",
  aliases: ["Stonewall","Leningrad"],
  eco: "A80–A99",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 f5",
  character:
    "An aggressive, unbalancing reply to 1.d4. With the very first move " +
    "1...f5 Black plants a flag on the kingside and fights for control of the " +
    "e4-square. The bargain is clear: Black slightly loosens the king's cover " +
    "in exchange for attacking chances and an asymmetrical battle most 1.d4 " +
    "players are far less comfortable facing.",
  whitePlan:
    "Develop soundly — often with a kingside fianchetto to blunt Black's " +
    "long-diagonal hopes and contest the light squares around e4 — then exploit " +
    "the slight weakening created by ...f5.",
  blackPlan:
    "Stake a kingside claim with ...f5, fight for the e4-square, develop the " +
    "pieces behind the pawn, and aim for a kingside initiative or a firm grip " +
    "on the centre.",
  middlegamePlan:
    "The Dutch is about e4 and a kingside initiative — pick a setup and commit. The " +
    "Leningrad (...g6, ...Bg7, ...d6) is King's-Indian-style: castle and break with ...e5. " +
    "The Classical (...e6, ...d6, ...Be7) prepares the same ...e5. The Stonewall (...d5, " +
    "...e6, ...c6) clamps e4 and parks a knight on e4 for a direct kingside attack. Whichever " +
    "you choose, develop the pieces behind the f5-pawn, mind the e6/king light squares, and " +
    "play for ...e5 or a piece-led assault on White's king.",
  ideaQuiz: {
    question: "What does 1...f5 fight for in the Dutch, and at what cost?",
    options: [
      "It fights for the e4-square and a kingside initiative, at the cost of slightly loosening the king.",
      "It wins the d4-pawn immediately.",
      "It guarantees Black a safer king than White's.",
    ],
    correctIndex: 0,
    explanation:
      "1...f5 stakes a kingside claim and grips e4, the square the Dutch is built around. The trade-off is honest: the f-pawn's advance loosens the king's diagonal (watch the e6/g6 light squares), but in return Black gets an unbalanced fight and genuine attacking chances most 1.d4 players dislike facing.",
  },
  tabiyaFen:
    "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  structureDiagram: {
    fen: "rnbq1rk1/ppp1b1pp/3ppn2/5p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 7",
    orientation: "black",
    arrows: [{ from: "e6", to: "e5" }],
    caption:
      "The Dutch (1...f5) seizes kingside space and fights for e4. In the Classical, Black sets up ...d6 and ...e6, then plays for a kingside attack with the ...e5 break or piece play.",
  },
  lines: [
    {
      label: "Classical Variation",
      summary: "You develop behind the f5-pawn with ...e6, ...Be7 and ...d6, gripping e4 and preparing the thematic ...e5 break for a kingside initiative.",
      sans: [
        "d4", "f5", "g3", "Nf6", "Bg2", "e6",
        "Nf3", "Be7", "O-O", "O-O", "c4", "d6",
      ],
      notes: [
        "White claims the centre.",
        "The Dutch: Black grabs kingside space and fights for e4.",
        "Heading for the fianchetto to contest the light squares.",
        "Developing and controlling e4.",
        "The bishop takes the long diagonal, eyeing the centre.",
        "Supporting the centre and opening a path for the bishop.",
        "Developing the knight toward the centre.",
        "A modest bishop developing move — the Classical set-up.",
        "King safety.",
        "Black castles too; the structure is set.",
        "Staking a central claim with the pawn.",
        "Preparing the thematic ...e5 break behind the Stonewall-free centre.",
      ],
    },
    {
      label: "Leningrad Variation",
      summary: "You fianchetto on g7 King's-Indian style, castle, and fight for e4, then strike with ...e5 to open the centre and the long diagonal.",
      sans: [
        "d4", "f5", "g3", "Nf6", "Bg2", "g6",
        "Nf3", "Bg7", "O-O", "O-O", "c4", "d6",
      ],
      notes: [
        "White claims the centre.",
        "The Dutch, fighting for e4.",
        "Heading for the fianchetto.",
        "Developing and controlling e4.",
        "The bishop takes the long diagonal.",
        "The Leningrad: Black fianchettoes his own bishop too.",
        "Developing the knight.",
        "The g7-bishop lines up against the centre — King's-Indian style.",
        "King safety.",
        "Black castles into a flexible, aggressive set-up.",
        "Staking a central claim.",
        "Preparing the ...e5 break, the heart of the Leningrad plan.",
      ],
    },
  ],
};
