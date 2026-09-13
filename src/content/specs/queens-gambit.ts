// Queen's Gambit — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines reused from ChessHall (facts). Prose original.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const queensGambit: OpeningSpec = {
  id: "queens-gambit",
  name: "Queen's Gambit",
  eco: "D06–D69",
  side: "white",
  family: "1d4",
  firstMoves: "1.d4 d5 2.c4",
  tabiyaFen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
  pitch:
    "A gambit in name only: c4 leans on d5 and you always get the pawn back with a lead in development. " +
    "You learn one thing that lasts a chess lifetime — how to fight for the centre with pawns — and Black's popular replies each have a simple, calm answer.",

  setup: {
    pieces: [
      { piece: "N", squares: ["c3"], why: "Adds a second attacker on d5." },
      { piece: "N", squares: ["f3"], why: "Covers e5 and d4, ready to castle." },
      { piece: "B", squares: ["g5", "f4"], why: "The dark bishop comes OUT before e3 — pinning on g5 or eyeing c7 from f4." },
      { piece: "B", squares: ["d3", "e2", "c4"], why: "The light bishop develops after e3; on c4 when Black has taken the pawn." },
    ],
    pawns: ["d4", "e3"],
    order: [{ before: "Bg5|Bf4", after: "e3", why: "Dark bishop out before e3, or it's stuck behind its own pawn — the same rule as the London." }],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "qg-pressure",
      title: "c4 leans on d5",
      oneLiner: "You're not giving a pawn away. You're asking Black a question about the centre every single move.",
      why: "If Black takes on c4, e3 and Bxc4 win it back and your pieces are out. If Black defends with ...e6, their bishop is shut in. If ...c6, they've spent a move that develops nothing. Whatever they choose, you keep developing toward a better centre.",
    },
    {
      id: "qg-vs-declined",
      title: "Against ...e6: pin with Bg5",
      oneLiner: "Nc3, Bg5, e3, Nf3, Bd3, castle. Keep the pin — Bh4 when ...h6 asks.",
      why: "The pin on f6 means d5 has one less defender and Black's kingside development is awkward. Trading on f6 gives that away for nothing; step back to h4 and keep asking.",
      trigger: { kind: "opponent_san", sans: ["e6"] },
      response: "Nc3, then Bg5.",
    },
    {
      id: "qg-vs-accepted",
      title: "Against ...dxc4: don't chase, develop",
      oneLiner: "Nf3, e3, Bxc4. The pawn comes back by itself.",
      why: "Qa4+ to win the pawn immediately works but brings your queen out for nothing. Nf3 first stops ...e5, e3 prepares Bxc4, and you castle with a lead. If Black tries to hold the pawn with ...b5, a4 breaks it up.",
      trigger: { kind: "opponent_san", sans: ["dxc4"] },
      response: "Nf3, e3, Bxc4, O-O.",
    },
    {
      id: "qg-vs-slav",
      title: "Against ...c6: Nf3, Nc3, and a4 if they take",
      oneLiner: "The Slav keeps Black's bishop free. Develop normally; after ...dxc4 play a4 so ...b5 can't hold the pawn.",
      why: "Black's plan is ...dxc4 and ...Bf5 with a solid structure. a4 stops ...b5, then e3 and Bxc4 regain the pawn while your pieces are better placed.",
      trigger: { kind: "opponent_san", sans: ["c6"] },
      response: "Nf3, Nc3; after ...dxc4, a4.",
    },
    {
      id: "qg-early-bishop",
      title: "An early ...Bf5 or ...Bg4? Take on d5",
      oneLiner: "cxd5 Qxd5 Nc3 — the queen is chased and b7 is loose. Qb3 next hits it.",
      why: "When Black develops the bishop before dealing with the centre, d5 is under-defended. cxd5 forces the queen out, Nc3 kicks it, and Qb3 attacks the b7-pawn the bishop left behind.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["f5", "g4"] },
      response: "cxd5, then Nc3 and Qb3.",
    },
    {
      id: "qg-albin",
      title: "If they play ...e5: take, and don't play e3",
      oneLiner: "2...e5 3.dxe5 d4 — then Nf3, not e3. The Lasker trap punishes e3.",
      why: "After 3.dxe5 d4 the pawn on d4 looks annoying. 4.e3? runs into ...Bb4+ 5.Bd2 dxe3! and the trap that ends with a promotion to a knight. 4.Nf3 keeps everything calm and the extra pawn.",
      trigger: { kind: "opponent_san", sans: ["e5"] },
      response: "dxe5, then Nf3 against ...d4.",
    },
    {
      id: "qg-book-end",
      title: "When the book runs out",
      oneLiner: "In the QGD, the minority attack (b4–b5) or a central e4 break; in the QGA, use the extra space and castle.",
      why: "Your structure is healthier and your pieces better placed. Pick one plan: b4–b5 to create a weakness on c6, or prepare e4 with Re1 and Qe2. Don't do both at once.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "d4", why: "Take the centre with the queen's pawn." } },
    [P("d4")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "c4", howToAnswer: "c4 — the gambit. Lean on d5.", why: "The classical reply and what this opening is for. More than half your games start here." },
        { san: "e6", verdict: "good", answer: "c4", howToAnswer: "c4. If ...d5 you have the Queen's Gambit Declined; if ...Nf6 a Nimzo-Indian.", why: "Usually a French or QGD player keeping options open." },
        { san: "Nf6", verdict: "good", answer: "c4", howToAnswer: "c4 anyway — then Nc3 and you meet whatever Indian setup they choose.", why: "An Indian Defence. The same c4 plan works." },
        { san: "d6", verdict: "dubious", answer: "c4", howToAnswer: "c4, then Nc3 and e4 — you get the whole centre while their bishop sits behind the d-pawn.", why: "Passive." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "dxe5 — take it and keep it. After ...Nc6 play Nf3; after ...Qe7 Nf3 too. Don't hand the pawn back.", why: "The Englund Gambit: a pawn for tricks that only work if you panic." },
        { san: "Nc6", verdict: "dubious", answer: "d5", howToAnswer: "d5! The knight is hit at once and has to go backwards while you take space.", why: "The knight blocks Black's own c-pawn and can be kicked immediately." },
        { san: "g6", verdict: "good", answer: "c4", howToAnswer: "c4, then Nc3 and e4 — take the full centre against the fianchetto.", why: "A King's Indian or Modern setup." },
        { san: "c6", verdict: "good", answer: "c4", howToAnswer: "c4 — if ...d5 you're in the Slav, which your Queen's Gambit already handles.", why: "Slav-style." },
        { san: "c5", verdict: "dubious", answer: "d5", howToAnswer: "d5 — take space (the Benoni). c4 next and you're comfortable.", why: "The Benoni. Space is yours if you push." },
        { san: "f5", verdict: "dubious", answer: "c4", howToAnswer: "c4, then Nc3 and g3 — solid against the Dutch, and ...f5 has loosened their king.", why: "The Dutch." },
        { san: "b6", verdict: "dubious", answer: "c4", howToAnswer: "c4, then Nc3 and e4 — build the big centre their bishop will stare at.", why: "A queenside fianchetto." },
      ],
    },
    [P("d4 d5")]: { yourMove: { san: "c4", why: "The gambit: lean on d5. Whatever Black does, you'll regain the pawn or gain space." } },
    [P("d4 d5 c4")]: {
      replies: [
        { san: "e6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, then Bg5 pinning the knight.", why: "The Declined — the main line. Solid, but Black's light bishop is shut in." },
        { san: "c6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Nc3. After ...dxc4, a4.", why: "The Slav. Black keeps the bishop's diagonal open." },
        { san: "dxc4", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, e3, Bxc4 — calm. Don't chase with Qa4+.", why: "The Accepted. You get the pawn back with development." },
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3; if ...dxc4 then e3 and Bxc4, if ...e6 then Bg5.", why: "Develops but leaves d5 to be resolved later." },
        { san: "Nc6", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 Qxd5 Nc3 — gain time on the queen, then e3 and Nf3.", why: "The Chigorin. It blocks Black's c-pawn, so d5 is hard to hold." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "dxe5! Then against ...d4 play Nf3 — never e3 (the Lasker trap).", why: "The Albin Counter-Gambit. A pawn for tricks; take it and stay calm." },
        { san: "c5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 Qxd5 Nc3 — the queen is chased and you develop.", why: "Symmetrical. It hands you a tempo on the queen." },
        { san: "Bf5", verdict: "bad", answer: "cxd5", howToAnswer: "cxd5 Qxd5 Nc3, then Qb3 hitting b7 and the queen.", why: "Bishop before centre: d5 is now under-defended and b7 is loose." },
        { san: "Bg4", verdict: "bad", answer: "cxd5", howToAnswer: "cxd5 — and if ...Qxd5, Nc3.", why: "Pins nothing (no knight on f3 yet) and abandons d5." },
      ],
    },

    // --- Declined ------------------------------------------------------------------------
    [P("d4 d5 c4 e6")]: { yourMove: { san: "Nc3", why: "A second attacker on d5. Bg5 next." } },
    [P("d4 d5 c4 e6 Nc3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Bg5", howToAnswer: "Bg5 — pin the knight.", why: "Main line." },
        { san: "c6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then e3 — the Semi-Slav. Watch for ...dxc4 and ...b5.", why: "Solid; Black may take on c4 later." },
        { san: "Be7", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bg5 or Bf4.", why: "Calm development." },
        { san: "Bb4", verdict: "dubious", answer: "a3", howToAnswer: "a3 — ask the bishop. After ...Bxc3+ bxc3 you have the centre and the bishop pair.", why: "A Nimzo-style pin without a knight on f6 to protect it." },
        { san: "dxc4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Bxc4.", why: "Takes late; you regain it comfortably." },
        { san: "c5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 exd5 Nf3 — Black's d5-pawn will be isolated.", why: "The Tarrasch. Fine for Black in theory, but it needs precise play they rarely have." },
        { san: "Nc6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Bg5 or cxd5.", why: "Blocks the c-pawn." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6")]: {
      yourMove: { san: "Bg5", why: "Pin the knight that defends d5. This is the classical QGD; e3 comes AFTER the bishop is out." },
      mistakes: [
        { san: "e3", why: "Playable, but you've just shut in your dark bishop. Bg5 first, then e3 — the same rule as the London." },
        { san: "cxd5", why: "Also playable (the Exchange), but at your level the pin with Bg5 is simpler: it keeps the tension and the plan." },
      ],
      checkpoint: {
        question: "Black is solid with ...e6 and ...Nf6. What's your plan?",
        options: ["Bg5 to pin the knight, then e3, Nf3, Bd3 and castle.", "e3 first, to protect d4.", "cxd5 right away to open the centre."],
        correctIndex: 0,
        explanation: "The pin removes a defender of d5 and makes Black's development awkward. e3 first locks in your bishop; cxd5 is fine but gives up the tension for nothing yet.",
      },
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5")]: {
      replies: [
        { san: "Be7", verdict: "good", answer: "e3", howToAnswer: "e3, then Nf3, Bd3, O-O.", why: "Main line: unpins." },
        { san: "Nbd7", verdict: "good", answer: "e3", howToAnswer: "e3 — and NOT cxd5 exd5 Nxd5?? (the Elephant Trap: ...Nxd5 Bxd8 Bb4+ wins your queen back with interest).", why: "Sets a famous trap for greedy players. Just develop." },
        { san: "Bb4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Nf3 and Bd3; a3 asks the bishop later.", why: "Pins your knight, but your king isn't in danger." },
        { san: "h6", verdict: "dubious", answer: "Bh4", howToAnswer: "Bh4 — keep the pin. Bxf6 hands Black the bishop pair.", why: "Asks the bishop; the answer is to step back, not trade." },
        { san: "dxc4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Bxc4.", why: "Regained easily." },
        { san: "c6", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3, Bd3.", why: "Solid." },
        { san: "c5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 exd5 Nf3 (or dxc5) — d5 becomes a target.", why: "Loosens Black's centre." },
        { san: "Nc6", verdict: "dubious", answer: "e3", howToAnswer: "e3 and Nf3.", why: "Blocks the c-pawn." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7")]: { yourMove: { san: "e3", why: "Now e3: the bishop is out, so this just supports d4 and frees the f1-bishop." } },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bd3 and O-O.", why: "Normal." },
        { san: "h6", verdict: "dubious", answer: "Bh4", howToAnswer: "Bh4 — keep the pin.", why: "Asks the bishop." },
        { san: "Nbd7", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, Bd3.", why: "Standard." },
        { san: "c6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, Bd3.", why: "Standard." },
        { san: "dxc4", verdict: "dubious", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back, bishop developed.", why: "Gives up the centre." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O")]: { yourMove: { san: "Nf3", why: "Develop the last knight; Bd3 and castle follow." } },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3")]: {
      replies: [
        { san: "h6", verdict: "dubious", answer: "Bh4", howToAnswer: "Bh4. Keep the pin.", why: "The classic question." },
        { san: "Nbd7", verdict: "good", answer: "Bd3", howToAnswer: "Bd3, O-O, then Rc1 and the minority attack or e4.", why: "Standard." },
        { san: "b6", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 exd5 Bd3 — the bishop on b7 stares at a pawn.", why: "The Tartakower idea, badly timed." },
        { san: "c6", verdict: "good", answer: "Bd3", howToAnswer: "Bd3 and castle.", why: "Solid." },
        { san: "dxc4", verdict: "dubious", answer: "Bxc4", howToAnswer: "Bxc4.", why: "Regained." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6")]: {
      yourMove: { san: "Bh4", why: "Keep the pin. Black's knight stays tied to the king's defence and d5 keeps one defender fewer." },
      mistakes: [{ san: "Bxf6", why: "Don't relieve the pressure. Trading hands Black the bishop pair and frees their game — for nothing. Bh4 keeps the pin." }],
    },

    // --- Accepted ---------------------------------------------------------------------------
    [P("d4 d5 c4 dxc4")]: {
      yourMove: { san: "Nf3", why: "Develop and stop ...e5. e3 and Bxc4 win the pawn back next; no need to chase it." },
      mistakes: [{ san: "Qa4+", why: "Wins the pawn back at once, but your queen is out on move 3 and Black develops with ...Nc6 or ...Bd7 for free. Nf3, e3, Bxc4 does the same job calmly." }],
      checkpoint: {
        question: "Black took the pawn on c4. What now?",
        options: ["Nf3 and e3 — regain it calmly with Bxc4.", "Qa4+ to win it back immediately.", "e4 — gambit it and grab the centre."],
        correctIndex: 0,
        explanation: "The pawn can't be held. Nf3 stops ...e5, e3 prepares Bxc4, and you castle with a lead. Qa4+ works but wastes the queen's time; e4 is real theory you don't need yet.",
      },
    },
    [P("d4 d5 c4 dxc4 Nf3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "e3", howToAnswer: "e3, then Bxc4.", why: "Main line." },
        { san: "e6", verdict: "good", answer: "e3", howToAnswer: "e3, Bxc4, O-O.", why: "Solid." },
        { san: "c5", verdict: "dubious", answer: "e3", howToAnswer: "e3 — if ...cxd4 then Bxc4 and exd4; you're ahead.", why: "Hits d4 too early." },
        { san: "b5", verdict: "bad", answer: "a4", howToAnswer: "a4! After ...c6 axb5 cxb5 e3 — the b5-pawn falls or Black's queenside collapses.", why: "Trying to keep the pawn just creates targets." },
        { san: "Nc6", verdict: "dubious", answer: "e3", howToAnswer: "e3, Bxc4.", why: "Blocks the c-pawn." },
        { san: "a6", verdict: "dubious", answer: "e3", howToAnswer: "e3 — if ...b5 then a4 breaks it.", why: "Prepares ...b5 but develops nothing." },
        { san: "Bg4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Bxc4. The pin is harmless — your queen is happy on d1.", why: "A pin on nothing." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6")]: { yourMove: { san: "e3", why: "Prepare Bxc4. Simple and safe." } },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3")]: {
      replies: [
        { san: "e6", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4, then O-O.", why: "Main line." },
        { san: "Bg4", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4 — the pin is harmless; castle next.", why: "Develops the bishop outside the chain." },
        { san: "c5", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4, O-O.", why: "Standard." },
        { san: "b5", verdict: "bad", answer: "a4", howToAnswer: "a4 — the pawn can't be held.", why: "Greedy." },
        { san: "a6", verdict: "dubious", answer: "Bxc4", howToAnswer: "Bxc4 before ...b5 arrives.", why: "Slow." },
        { san: "Be6", verdict: "dubious", answer: "Nbd2", howToAnswer: "Nbd2, then Nxc4 — the bishop on e6 blocks Black's e-pawn.", why: "Holds the pawn awkwardly." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6")]: { yourMove: { san: "Bxc4", why: "Pawn back, bishop developed, castling next. You're ahead in development." } },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4")]: {
      replies: [
        { san: "c5", verdict: "good", answer: "O-O", howToAnswer: "O-O, then Qe2 and Rd1.", why: "Main line." },
        { san: "Be7", verdict: "good", answer: "O-O", howToAnswer: "O-O.", why: "Solid." },
        { san: "a6", verdict: "good", answer: "O-O", howToAnswer: "O-O; if ...b5 then Bd3 or Be2.", why: "Prepares ...b5." },
        { san: "Nc6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O.", why: "Blocks ...c5." },
      ],
    },

    // --- Slav --------------------------------------------------------------------------------
    [P("d4 d5 c4 c6")]: { yourMove: { san: "Nf3", why: "Develop first. If Black takes on c4, e3 and Bxc4; Nc3 next." } },
    [P("d4 d5 c4 c6 Nf3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3.", why: "Main line." },
        { san: "dxc4", verdict: "dubious", answer: "e3", howToAnswer: "e3 — and if ...b5, a4.", why: "Early; easily regained." },
        { san: "Bf5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 cxd5 Qb3! — b7 and d5 are both attacked.", why: "Bishop out before the centre is settled." },
        { san: "Bg4", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 cxd5 Qb3 — same idea; the bishop left b7 unguarded.", why: "Pins the knight but drops the queenside." },
        { san: "e6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, e3.", why: "Semi-Slav." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6")]: { yourMove: { san: "Nc3", why: "Second attacker on d5. Now ...dxc4 is met by a4." } },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3")]: {
      replies: [
        { san: "dxc4", verdict: "good", answer: "a4", howToAnswer: "a4 — stop ...b5, then e3 and Bxc4.", why: "Main line of the Slav." },
        { san: "e6", verdict: "good", answer: "e3", howToAnswer: "e3, Bd3 — the Semi-Slav.", why: "Solid." },
        { san: "a6", verdict: "dubious", answer: "e3", howToAnswer: "e3 (or c5!?); keep developing.", why: "Prepares ...b5." },
        { san: "Bf5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 cxd5 Qb3 hitting b7 and d5.", why: "Loosens b7." },
        { san: "Bg4", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 cxd5 Qb3.", why: "Same problem." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4")]: { yourMove: { san: "a4", why: "Stop ...b5, which would hold the pawn. Then e3 and Bxc4." } },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4")]: {
      replies: [
        { san: "Bf5", verdict: "good", answer: "e3", howToAnswer: "e3, then Bxc4 and O-O.", why: "Main line." },
        { san: "e6", verdict: "good", answer: "e3", howToAnswer: "e3, Bxc4.", why: "Solid." },
        { san: "Bg4", verdict: "dubious", answer: "e3", howToAnswer: "e3 (or Ne5 hitting the bishop and c4).", why: "Fine." },
        { san: "Na6", verdict: "dubious", answer: "e3", howToAnswer: "e3, Bxc4 — the knight on a6 is offside.", why: "Tries to keep c4 with ...Nb4." },
      ],
    },
  },

  traps: [
    {
      name: "The Elephant Trap (don't fall for it)",
      sans: sans("1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Nbd7 5.cxd5 exd5 6.Nxd5 Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8"),
      punisher: "black",
      tell: "Black plays ...Nbd7, apparently leaving the f6-knight pinned and d5 loose.",
      why: "Nxd5 looks like it wins a pawn because the f6-knight is pinned. It isn't: ...Nxd5 Bxd8 Bb4+ and Black wins the queen back with a piece to spare. Just play e3.",
    },
    {
      name: "The Lasker Trap (don't fall for it)",
      sans: sans("1.d4 d5 2.c4 e5 3.dxe5 d4 4.e3 Bb4+ 5.Bd2 dxe3 6.Bxb4 exf2+ 7.Ke2 fxg1=N+"),
      punisher: "black",
      tell: "Black plays the Albin (2...e5) and after dxe5 pushes ...d4.",
      why: "e3 looks like it undermines the pawn. Instead ...Bb4+ Bd2 dxe3! Bxb4 exf2+ Ke2 fxg1=N+ and Black is winning. Play 4.Nf3 and keep the extra pawn quietly.",
    },
  ],

  modelGames: [
    { label: "Declined (2...e6)", sans: sans("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4"), summary: "The classical QGD: pin the knight, build the e3/Nf3/Bd3 setup, and keep the pin with Bh4 when asked." },
    { label: "Accepted (2...dxc4)", sans: sans("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O"), summary: "Regain the pawn calmly with e3 and Bxc4, castle, and enjoy the lead in development." },
    { label: "Slav (2...c6)", sans: sans("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3"), summary: "Against the Slav's ...dxc4, a4 stops ...b5 and e3, Bxc4 regains the pawn." },
  ],

  middlegamePlan:
    "In the Declined, once developed and castled, choose one plan: the minority attack (Rb1, b4–b5) to create a weak pawn on c6, or a central e4 break prepared by Re1 and Qe2. " +
    "In the Accepted and the Slav you have more space and better development — keep pieces on, use the open c-file, and don't rush to trade.",

  structureDiagram: {
    fen: "rnbq1rk1/ppp1bpp1/4pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R b KQ - 1 7",
    orientation: "white",
    arrows: [{ from: "b2", to: "b4" }],
    caption: "The classical QGD: pin kept with Bh4, solid centre. White's long-term plan on the queenside is the minority attack, b4–b5.",
  },
};
