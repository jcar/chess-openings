import type { Opening } from "./types";

// Larsen's Opening (Nimzo-Larsen Attack) — original prose; lines are standard
// public theory.
export const larsen: Opening = {
  id: "larsen",
  name: "Larsen's Opening",
  aliases: ["Nimzo-Larsen","Nimzowitsch-Larsen","b3"],
  eco: "A01",
  family: "flank",
  trainerColor: "white",
  firstMoves: "1.b3",
  character:
    "A flexible flank opening (the Nimzo-Larsen Attack): White fianchettoes the " +
    "queen's bishop to b2 to rake the long dark-squared diagonal a1–h8, " +
    "pressuring e5 and the centre from the wing. It sidesteps mainstream theory " +
    "and leads to original, hypermodern middlegames where understanding the plans " +
    "matters more than memorizing moves.",
  whitePlan:
    "Fianchetto with b3 and Bb2, control the long diagonal, restrain Black's " +
    "centre with e3 and pieces, and choose a central break (c4, d4, or f4 with " +
    "Nf3) once developed.",
  blackPlan:
    "Grab the centre with ...e5/...d5 and develop naturally; challenge the b2 " +
    "bishop's diagonal (e.g. defending e5 solidly) and aim to prove the " +
    "fianchetto is slow.",
  middlegamePlan:
    "Larsen's Opening is all about the b2-bishop on the long dark diagonal, pressuring e5 " +
    "and the centre from the wing. Fianchetto b3–Bb2, restrain the centre with e3, develop " +
    "the knights (Nf3, sometimes a Bird-like f4 clamp on e5), then choose a central break — " +
    "c4, d4, or f4 — once you're ready. Keep pressure on e5 (Bb5 pins, Nf3, f4) so Black " +
    "never gets a free, unchallenged big centre. It's a plans-over-moves opening: keep the " +
    "diagonal open and trade off Black's best defenders of the dark squares.",
  ideaQuiz: {
    question: "What is the key piece in Larsen's Opening (1.b3)?",
    options: [
      "The b2-bishop, raking the long a1–h8 diagonal and pressuring e5 and the centre.",
      "The queen, swinging out early to attack.",
      "The a-pawn, storming the queenside.",
    ],
    correctIndex: 0,
    explanation:
      "1.b3 prepares Bb2, and that bishop is the whole point — from b2 it controls the long dark-squared diagonal, eyeing e5 and the centre from the flank. White's plans (the e3 restraint, the c4/d4/f4 breaks, even a Bird-like f4) all revolve around keeping that diagonal working.",
  },
  tabiyaFen:
    "r1bqkbnr/pppp1ppp/2n5/4p3/8/1P2P3/PBPP1PPP/RN1QKBNR b KQkq - 0 3",
  structureDiagram: {
    fen: "r1bq1rk1/pppp1ppp/2nb1n2/1B6/3Np3/1P2P3/PBPP1PPP/RN1QK2R w KQ - 2 7",
    orientation: "white",
    caption:
      "Larsen's Opening (1.b3) fianchettoes the queen's bishop to b2, where it rakes the long diagonal toward Black's kingside — offbeat but principled flank development.",
  },
  lines: [
    {
      label: "Classical (1...e5)",
      summary: "Against ...e5 you fianchetto to b2 and pile on the central pawn with Bb5 and Nf3, pressuring Black's strong point from the wing.",
      sans: [
        "b3", "e5", "Bb2", "Nc6", "e3", "Nf6",
        "Bb5", "Bd6", "Nf3", "e4", "Nd4", "O-O",
      ],
      notes: [
        "The Nimzo-Larsen move: White prepares to fianchetto the queen's bishop.",
        "Black grabs the centre.",
        "The point — the bishop rakes the long diagonal toward e5.",
        "Developing and defending e5.",
        "A restrained, flexible setup for the centre.",
        "Black develops and contests the centre.",
        "Pinning/pressuring the e5-defender, Spanish-style.",
        "Black supports e5 and develops actively.",
        "Developing with pressure on e5.",
        "Black gains space and kicks the knight.",
        "The knight reroutes instead of retreating passively.",
        "Black castles; a rich, original middlegame lies ahead.",
      ],
    },
    {
      label: "Reversed setup (1...d5)",
      summary: "Against ...d5 you clamp e5 Bird-style with f4 while the b2-bishop rakes the long diagonal, building kingside space before Black breaks with ...c5.",
      branch: { from: "Classical (1...e5)", atPly: 1, tryMove: "d5" },
      sans: [
        "b3", "d5", "Bb2", "Nf6", "e3", "e6",
        "f4", "Be7", "Nf3", "O-O", "Be2", "c5",
      ],
      notes: [
        "1.b3 again, aiming the bishop down the long diagonal.",
        "Black takes the centre with the d-pawn.",
        "Fianchettoing onto the a1–h8 diagonal.",
        "Black develops the kingside knight.",
        "Supporting a flexible centre.",
        "Black builds a solid pawn chain.",
        "A Bird-like clamp on e5, gaining kingside space.",
        "Black develops and prepares to castle.",
        "Completing the kingside and eyeing e5.",
        "Black tucks the king away.",
        "A modest, flexible bishop developing move.",
        "Black strikes at the centre — the middlegame battle begins.",
      ],
    },
  ],
};
