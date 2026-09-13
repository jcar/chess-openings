import type { Opening } from "./types";

// London System — original prose; lines are standard public theory.
export const londonSystem: Opening = {
  id: "london-system",
  name: "London System",
  eco: "D02/A48",
  family: "1d4",
  trainerColor: "white",
  tier: "core",
  firstMoves: "1.d4 d5 2.Nf3 Nf6 3.Bf4",
  character:
    "A low-theory 'system' opening: reliable, solid, and easy to learn. The " +
    "appeal is that White can aim for the same comfortable set-up — Bf4, e3, " +
    "Bd3 or Be2, c3, and Nbd2 — against almost anything Black does. You reach " +
    "a pleasant middlegame without memorizing long forcing lines, which makes " +
    "it a favourite for players who want to think rather than recite.",
  whitePlan:
    "Build the trademark structure: bishop out to f4 before locking it in, " +
    "then e3, c3, Nbd2, and a bishop to d3 or e2. Castle, keep the centre " +
    "firm, and look for the e4 break or a kingside attack with the queen and " +
    "rooks.",
  blackPlan:
    "Develop comfortably and challenge White's plan: contest the centre with " +
    "...c5 and ...e6, harass the f4-bishop, and decide whether to play in the " +
    "centre or fianchetto and pressure d4 from the side.",
  middlegamePlan:
    "The London is a setup, so once you've played Bf4–e3–c3–Nbd2 and Bd3, choose a plan. " +
    "The classic one is a kingside attack: plant a knight on e5 (backed by Nd2–f3 and the " +
    "f-pawn), aim Bd3 and Qf3/Qe2 at h7, and roll f4 (sometimes g4). The other is the e4 " +
    "break once it's prepared. Keep your dark-squared bishop healthy — retreat Bg3 rather " +
    "than trade it. Black's critical counter is ...c5 with ...Qb6 hitting b2; defend calmly " +
    "(Qc1 or b3) and carry on with your plan.",
  ideaQuiz: {
    question: "After the standard London setup, what's White's classic attacking plan?",
    options: [
      "Knight to e5 + Bd3 aimed at h7, then f4/Qf3 — a kingside attack.",
      "Trade the dark-squared bishop quickly to simplify.",
      "Push the a- and b-pawns to attack on the queenside.",
    ],
    correctIndex: 0,
    explanation:
      "The London's harmonious setup points at the kingside: occupy e5 with a knight, put the light bishop on d3 eyeing h7, bring the queen to f3/e2, and advance f4 (and sometimes g4). The dark-squared bishop is your prize attacker — keep it (Bg3), don't trade it.",
  },
  tabiyaFen:
    "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 1 3",
  structureDiagram: {
    fen: "r1bqk2r/pp3ppp/2nbpn2/2pp4/3P4/2P1PNB1/PP1N1PPP/R2QKB1R b KQkq - 4 7",
    orientation: "white",
    arrows: [{ from: "f3", to: "e5" }],
    caption:
      "The London System: an easy, repeatable setup (Bf4, e3, c3, Nbd2). White plants a knight on e5, eyes the b1\u2013h7 diagonal, and can build a kingside attack.",
  },
  lines: [
    {
      label: "Main setup vs ...d5",
      summary: "You build the trademark Bf4, e3, c3, Nbd2 structure and keep the bishop with Bg3, aiming a knight at e5 and your pieces at the kingside.",
      sans: [
        "d4", "d5", "Nf3", "Nf6", "Bf4", "e6",
        "e3", "c5", "c3", "Nc6", "Nbd2", "Bd6", "Bg3",
      ],
      notes: [
        "Claiming the centre with the queen's pawn.",
        "A classical, symmetrical reply staking the centre too.",
        "Developing the knight and controlling e5.",
        "Black mirrors, developing toward the centre.",
        "The signature London move: the bishop comes out before e3 locks it in.",
        "Opening a path for the dark-squared bishop and supporting d5.",
        "Building the trademark structure and freeing the light-squared bishop.",
        "Striking at the centre to challenge White's pawn chain.",
        "Reinforcing d4 and giving the bishop a safe retreat on c2.",
        "Developing the knight and adding pressure on d4.",
        "A flexible developing move that supports a later e4 break.",
        "Developing and offering to trade off the active f4-bishop.",
        "Sidestepping the trade and keeping the strong bishop on its diagonal.",
      ],
      commonMistakes: [
        {
          ply: 4,
          move: "e3",
          why: "The one rule of the London: get the dark-squared bishop OUT to f4 BEFORE playing e3. Play e3 first and you've locked the bishop behind its own pawn — the exact 'bad bishop' problem the London is built to avoid. Bf4 first, then e3.",
        },
        {
          ply: 12,
          move: "Bxd6",
          why: "Don't trade your best piece. The f4/g3-bishop is the soul of the London — when ...Bd6 offers the swap, sidestep with Bg3 and keep it. Trading hands Black easy equality and gives up your main attacker.",
        },
      ],
    },
    {
      label: "vs a King's-Indian setup",
      summary: "Get the bishop out to f4 early before ...d6 can hit it, settle into your solid structure, and add h3 to deny Black's pieces the g4-square.",
      branch: { from: "Main setup vs ...d5", atPly: 1, tryMove: "Nf6" },
      sans: [
        "d4", "Nf6", "Bf4", "g6",
        "Nf3", "Bg7", "e3", "O-O", "Be2", "d6", "h3",
      ],
      notes: [
        "Claiming the centre.",
        "A flexible move heading for a kingside fianchetto.",
        "The London bishop comes out early, before ...d6 can hit it.",
        "Black prepares to fianchetto the bishop.",
        "Developing and controlling e5.",
        "Completing the fianchetto, pointing the bishop at the long diagonal.",
        "The familiar London structure, solid and free of weaknesses.",
        "King safety first for Black.",
        "A modest, useful developing square for the bishop.",
        "Preparing ...e5 to challenge the centre.",
        "A handy luft, denying Black's pieces the g4-square and preparing g4 ideas.",
      ],
    },
    {
      label: "Black hits back with ...c5 and ...Qb6",
      summary: "Black's sharpest try hits b2 and d4 with ...c5 and ...Qb6; defend calmly with Qc1 (or b3), hold your structure, and carry on with your usual plan.",
      branch: { from: "Main setup vs ...d5", atPly: 5, tryMove: "c5" },
      sans: [
        "d4", "d5", "Nf3", "Nf6", "Bf4", "c5",
        "e3", "Nc6", "c3", "Qb6", "Qc1", "Bf5",
      ],
      notes: [
        "Claiming the centre.",
        "A classical, symmetrical reply.",
        "Developing and controlling e5.",
        "Black mirrors the development.",
        "The signature London move before e3 shuts the bishop in.",
        "An immediate strike at the centre, the critical try against the London.",
        "Building the structure and freeing the light-squared bishop.",
        "Developing and adding pressure on d4.",
        "Reinforcing d4 and giving the bishop a square on c2.",
        "The point: hitting both b2 and d4, the most testing reply.",
        "Calmly defending b2 while keeping the queen flexible.",
        "Black also develops the bishop outside the chain, mirroring White's idea.",
      ],
    },
    {
      label: "Move-order twin (1...Nf6 first)",
      summary:
        "Black plays ...Nf6 before ...d5, so the moves arrive in the opposite order — and from move 4 the position is identical to the main setup. The London's whole appeal is that the set-up does not depend on the sequence.",
      sans: [
        "d4", "Nf6", "Nf3", "d5",
        "Bf4", "e6", "e3", "c5", "c3", "Nc6", "Nbd2", "Bd6", "Bg3",
      ],
      notes: [
        "Claiming the centre.",
        "Black develops first and keeps the d-pawn back a move.",
        "Developing and covering e5.",
        "Now the pawn comes — and this is the main London position, reached in the other order.",
        "The bishop gets out BEFORE e3 shuts it in. That is the one move-order rule the London really has.",
        "Black builds the classical structure.",
        "Completing the pawn triangle behind the bishop.",
        "The critical strike at d4.",
        "Holding the centre and opening c2 for the bishop.",
        "Adding pressure to d4.",
        "Developing without blocking the c-pawn.",
        "Black develops the bishop outside the chain.",
        "Stepping aside to keep the prized dark-squared bishop.",
      ],
      commonMistakes: [
        {
          ply: 4,
          move: "e3",
          why: "This is the one order that matters in the London. Play e3 before Bf4 and the dark-squared bishop is stuck behind its own pawns — the single piece the whole system is built around. Bishop out first, then e3.",
        },
      ],
    },
  ],
};
