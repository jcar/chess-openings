import type { Opening } from "./types";

// Nimzo-Indian Defence — original prose; lines are standard public theory.
export const nimzoIndian: Opening = {
  id: "nimzo-indian",
  name: "Nimzo-Indian Defence",
  aliases: ["Nimzo","Nimzo Indian"],
  eco: "E20–E59",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4",
  character:
    "A sophisticated, flexible defence and one of Black's most respected " +
    "answers to 1.d4. Instead of meeting pawns with pawns, Black pins the " +
    "c3-knight with the bishop and fights for the central squares — above all " +
    "e4 — with pieces. Black is willing to give up the bishop for the knight " +
    "to damage White's pawn structure and seize lasting control of the light " +
    "and central squares.",
  whitePlan:
    "Keep the strong pawn duo on c4 and d4 and use the bishop pair if Black " +
    "captures on c3. Choose a set-up — quiet e3 (Rubinstein) or the " +
    "queen-supported Qc2 — that lets you build a big centre and break with e4.",
  blackPlan:
    "Pin and pressure the c3-knight, dispute the e4-square, and be ready to " +
    "trade the bishop for the knight to leave White with doubled, vulnerable " +
    "pawns. Strike at the centre with ...c5 and ...d5 once developed.",
  middlegamePlan:
    "The Nimzo is a battle over e4 and White's pawns. Your bishop pins c3 and, at the right " +
    "moment, takes it — saddling White with doubled, immobile c-pawns. Then play against " +
    "them: clamp with ...c5 and ...d6, route a knight to a5 (or ...Na6–c7) to hit c4, and " +
    "blockade the light squares (...b6, ...Ba6, ...Qa6 piling on c4). If instead you keep " +
    "the bishop (Rubinstein), break with ...d5 and ...c5 for a classical centre fight. " +
    "Either way: control e4, and make those doubled pawns a long-term target.",
  ideaQuiz: {
    question: "Why is Black happy to give up the bishop for a knight with ...Bxc3 in the Nimzo?",
    options: [
      "It leaves White with doubled, immobile c-pawns and hands Black the light squares (above all e4).",
      "It wins a pawn on the spot.",
      "It opens an immediate direct attack on the white king.",
    ],
    correctIndex: 0,
    explanation:
      "The Nimzo trades a long-term concession (the bishop pair) for a structural one (White's shattered c-pawns) plus firm control of e4 and the light squares. Black then blockades and targets the c4/c3 pawns. It's the classic 'structure vs bishops' trade-off — and Black's structure usually does the talking.",
  },
  tabiyaFen:
    "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
  structureDiagram: {
    fen: "rnbq1rk1/pp3ppp/4pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 7",
    orientation: "black",
    arrows: [{ from: "b4", to: "c3" }],
    caption:
      "The Nimzo-Indian pins the c3-knight with ...Bb4 to fight for the e4-square and, by trading bishop for knight, saddle White with doubled pawns — control and structure over the bishop pair.",
  },
  lines: [
    {
      label: "Rubinstein Variation",
      summary: "Against the quiet e3 set-up you keep the bishop and fight for the centre, striking with ...d5 and ...c5 for a balanced classical battle.",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nc3", "Bb4",
        "e3", "O-O", "Bd3", "d5", "Nf3", "c5",
      ],
      notes: [
        "White grabs the centre and opens lines for the dark-squared bishop.",
        "A flexible reply that controls e4 and keeps options open.",
        "Gaining space and supporting a future central advance.",
        "Preparing to develop the bishop and freeing the king's path.",
        "Defending d4 and adding a guard to the key e4-square.",
        "The signature Nimzo move: pinning the knight and fighting for e4.",
        "The restrained Rubinstein set-up — solid and free of weaknesses.",
        "King safety first, getting the king out of the centre.",
        "Developing toward the kingside while eyeing e4 and h7.",
        "Striking at the centre and contesting White's c4-pawn.",
        "Completing development and defending the d4-pawn.",
        "The thematic counter-strike at White's centre.",
      ],
    },
    {
      label: "Classical (Qc2) Variation",
      summary: "White keeps a healthy structure with Qc2 and gains the bishop pair after ...Bxc3+; you fight back by controlling the light squares with ...b6 and ...Bb7.",
      branch: { from: "Rubinstein Variation", atPly: 6, tryMove: "Qc2" },
      sans: [
        "d4", "Nf6", "c4", "e6", "Nc3", "Bb4",
        "Qc2", "O-O", "a3", "Bxc3+", "Qxc3", "b6",
      ],
      notes: [
        "White takes the centre.",
        "A flexible developing move.",
        "Gaining space on the queenside.",
        "Pinning the knight to fight for e4.",
        "Defending c3 in advance and avoiding doubled pawns.",
        "King safety before the central tension grows.",
        "Putting the question to the bishop right away.",
        "Trading the bishop for the knight to disrupt White's structure.",
        "Recapturing with the queen, keeping the pawns healthy and eyeing the centre.",
        "Preparing to fianchetto and blockade the light squares with ...Bb7.",
      ],
    },
    {
      label: "Sämisch Variation",
      summary: "White spends a tempo on a3 to win the bishop pair immediately, taking on doubled c-pawns to build a big centre; you target those pawns and blockade with ...c5, ...b6 and ...Nc6.",
      branch: { from: "Rubinstein Variation", atPly: 6, tryMove: "a3" },
      sans: [
        "d4", "Nf6", "c4", "e6", "Nc3", "Bb4",
        "a3", "Bxc3+", "bxc3", "c5", "e3", "O-O",
      ],
      notes: [
        "White takes the centre.",
        "A flexible developing move.",
        "Gaining queenside space.",
        "Freeing the bishop and preparing to develop.",
        "Defending d4 and guarding the e4-square.",
        "The Nimzo pin, fighting for e4.",
        "The Sämisch: forcing the trade at once to grab the bishop pair.",
        "Trading — and saddling White with doubled c-pawns as the price.",
        "Recapturing, building a broad centre.",
        "Striking at the doubled-pawn centre immediately.",
        "A modest, solid centre.",
        "King safety; Black will pile up on c4 and the light squares.",
      ],
    },
  ],
};
