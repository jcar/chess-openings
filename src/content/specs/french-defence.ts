// French Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const frenchDefence: OpeningSpec = {
  id: "french-defence",
  name: "French Defence",
  eco: "C00–C19",
  side: "black",
  family: "1e4-other",
  firstMoves: "1.e4 e6",
  tabiyaFen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
  pitch:
    "A pawn chain, not a pawn race: ...e6 and ...d5 build a wall, then you hit the base of White's chain with ...c5 while their attack is still forming. " +
    "It teaches the single most useful middlegame skill there is — where to strike a pawn chain — and it is rock solid against every kind of aggression.",

  setup: {
    pieces: [
      { piece: "N", squares: ["c6", "d7"], why: "The queen's knight to c6 adds a second attacker on d4." },
      { piece: "N", squares: ["e7", "f6", "h6"], why: "The king's knight goes to e7 (never f6 while a white pawn sits on e5)." },
      { piece: "B", squares: ["e7", "b4", "d6", "c5"], why: "The dark bishop developed — ...Bb4 pins Nc3; ...Be7 is the quiet choice." },
      { piece: "Q", squares: ["b6", "c7", "d8"], why: "...Qb6 piles onto d4 and b2; otherwise the queen stays home." },
    ],
    pawns: ["e6", "d5", "c5"],
    order: [{ before: "c5", after: "cxd4", why: "Keep the tension: ...c5 presses d4 for many moves. Only take when it wins something." }],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "french-chain",
      title: "Hit the base of the chain: ...c5",
      oneLiner: "White's chain is d4–e5. Attack d4 with ...c5, ...Nc6 and ...Qb6, and don't release the tension.",
      why: "A pawn chain is only as strong as its base. d4 holds e5 up; pile onto d4 and White has to defend passively. ...cxd4 early just solidifies their centre — keep pressing.",
    },
    {
      id: "french-no-nf6",
      title: "Never ...Nf6 while a pawn sits on e5",
      oneLiner: "e5 covers f6. The knight goes to e7 (or h6), not f6.",
      why: "In the Advance, ...Nf6?? simply hangs the knight to exf6. Route it ...Nge7–f5 (hitting d4) or ...Nh6–f5. In lines without e5, ...Nf6 is fine.",
      trigger: { kind: "opponent_piece_on", piece: "P", squares: ["e5"] },
      response: "Knight to e7, aiming for f5.",
    },
    {
      id: "french-bishop",
      title: "The French bishop problem — and its fixes",
      oneLiner: "Your c8-bishop is behind ...e6. Trade it with ...b6 and ...Ba6, or activate it via ...Bd7–b5.",
      why: "That bishop is the one price you pay for the wall. Don't ignore it: once the queenside is stable, ...b6 and ...Ba6 offers a trade of your worst piece for their best.",
    },
    {
      id: "french-vs-nc3",
      title: "Against Nc3: pin with ...Bb4",
      oneLiner: "3.Nc3 Bb4 — the knight that defends e4 is pinned. After e5 c5 a3, take on c3 and put the knight on e7.",
      why: "The Winawer. Bxc3+ bxc3 gives White doubled pawns and a weakened queenside; your play against c3 and d4 is easy to understand. Never ...Ba5 after a3 — b4 hunts the bishop.",
      trigger: { kind: "opponent_san", sans: ["Nc3"] },
      response: "...Bb4; after e5, ...c5; after a3, ...Bxc3+.",
    },
    {
      id: "french-vs-exchange",
      title: "Against exd5: mirror and castle",
      oneLiner: "...exd5, ...Nf6, ...Bd6, ...O-O. Your bishop is free and the position is equal.",
      why: "The Exchange solves your bishop problem for you. Develop naturally, castle, and use the open e-file. Avoid early queen checks — they just help you develop.",
      trigger: { kind: "opponent_san", sans: ["exd5"] },
      response: "...exd5, then ...Nf6 and ...Bd6.",
    },
    {
      id: "french-vs-nd2",
      title: "Against Nd2: ...c5 at once",
      oneLiner: "3.Nd2 avoids the pin, but it blocks the bishop. Hit d4 immediately with ...c5.",
      why: "The Tarrasch. With the knight on d2, White can't pressure d5 quickly; ...c5 strikes while their pieces are tangled. After exd5 exd5 you get open lines for the bishop.",
      trigger: { kind: "opponent_san", sans: ["Nd2"] },
      response: "...c5, then ...Nc6.",
    },
    {
      id: "french-book-end",
      title: "When the book runs out",
      oneLiner: "Your play is on the queenside and against d4; White's is on the kingside. Push your break first.",
      why: "Every French middlegame is a race: ...c5, ...Qb6, ...Nc6 and sometimes ...f6 against the chain, versus White's kingside attack. Don't defend passively — keep hitting d4.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "e6", howToAnswer: "...e6 — the French.", why: "Two thirds of your games." },
        { san: "d4", verdict: "good", answer: "e6", howToAnswer: "...e6 keeps everything open: if e4 comes you're in the French, and if c4 comes you play ...d5 for a Queen's Gambit Declined.", why: "...e6 is useful against both pawns — one of the French's quiet advantages." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...e6 and ...c5 — the same pawn structure you know.", why: "Flexible." },
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...d5 — a Queen's Gambit shape where your ...c5 break still applies.", why: "The English." },
        { san: "e3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...c5 and ...Nc6 — you have the freer game.", why: "Passive." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...e6, ...Nf6 — a solid wall.", why: "A fianchetto setup." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — if e4 then ...e6 and you're home; if d4 then ...Nf6.", why: "Usually heads for e4." },
        { san: "b3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...e6, ...Nf6 — take the centre.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...e6 — solid, and their kingside is loose.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...e5 — more space for you.", why: "Timid." },
      ],
    },
    [P("e4")]: { yourMove: { san: "e6", why: "Prepare ...d5 with the e-pawn. Solid, and the queen's diagonal to h4 opens later." } },
    [P("e4 e6")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — build the wall and hit e4.", why: "Main line." },
        { san: "Nf3", verdict: "dubious", answer: "d5", howToAnswer: "...d5. If e5, ...c5 as usual.", why: "Slow." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...c5, ...Nc6, ...Nf6, ...Be7 — the King's Indian Attack setup is met by normal development.", why: "The King's Indian Attack. Harmless if you develop." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5; after e5 or exd5, the usual plans.", why: "Normal." },
        { san: "Bc4", verdict: "bad", answer: "d5", howToAnswer: "...d5! The bishop is hit and must move again.", why: "Walks into ...d5." },
        { san: "Qh5", verdict: "bad", answer: "Nf6", howToAnswer: "...Nf6 — attack the queen and develop. f7 is safe.", why: "A Scholar's-mate try; with ...e6 played, Qxf7 isn't a threat." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...c5, ...Nc6.", why: "Loosens White's king." },
        { san: "c4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — take the centre.", why: "Odd." },
      ],
    },
    [P("e4 e6 d4")]: { yourMove: { san: "d5", why: "The wall: e6 supports d5, d5 hits e4. White must decide what to do with e4." } },
    [P("e4 e6 d4 d5")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit the base of the chain at once.", why: "The Advance." },
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin the defender of e4.", why: "The Winawer/Classical branch." },
        { san: "Nd2", verdict: "good", answer: "c5", howToAnswer: "...c5 at once.", why: "The Tarrasch." },
        { san: "exd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5, then ...Nf6 and ...Bd6.", why: "The Exchange." },
        { san: "Bd3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 Bxe4 Nf6 — hit the bishop and develop.", why: "Drops e4 for tempo." },
        { san: "f3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 fxe4 Qh4+! — the check picks up e4 next.", why: "Opens the e1–h4 diagonal." },
        { san: "Nf3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — a pawn. If Ng5 or Ne5, ...Nf6 keeps it.", why: "Hangs e4." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — kick it, then ...dxe4 or ...Nf6.", why: "A check that loses time." },
      ],
    },

    // --- Advance ---------------------------------------------------------------------------------
    [P("e4 e6 d4 d5 e5")]: {
      yourMove: { san: "c5", why: "Strike the base of the chain right away. Everything you do next piles onto d4." },
      mistakes: [
        { san: "Nf6", why: "Careful — the e5-pawn covers f6, so ...Nf6?? hangs the knight to exf6. In the Advance the knight goes to e7 (or h6)." },
        { san: "f6", why: "Premature: it weakens your king before a single piece is out. ...c5 first; ...f6 is a later idea." },
      ],
    },
    [P("e4 e6 d4 d5 e5 c5")]: {
      replies: [
        { san: "c3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — second attacker on d4.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6; c3 usually follows.", why: "Normal." },
        { san: "dxc5", verdict: "dubious", answer: "Bxc5", howToAnswer: "...Bxc5 — develop with the recapture. Then ...Nc6, ...Nge7.", why: "Gives up the chain." },
        { san: "Nc3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...cxd4 and ...Bc5 — d4 falls apart without c3.", why: "Can't support d4 with c3." },
        { san: "Bb5+", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop and block.", why: "A check that develops you." },
        { san: "Qg4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4, then ...Nc6 — the queen is out early and d4 is gone.", why: "Early queen." },
        { san: "f4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...Qb6 — more pressure on d4 while White's king loosens.", why: "Over-extends." },
      ],
    },
    [P("e4 e6 d4 d5 e5 c5 c3")]: { yourMove: { san: "Nc6", why: "Second attacker on d4. ...Qb6 will be the third." } },
    [P("e4 e6 d4 d5 e5 c5 c3 Nc6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Qb6", howToAnswer: "...Qb6 — hits d4 and b2; White's bishop can't go to d3.", why: "Main line." },
        { san: "Be3", verdict: "dubious", answer: "Qb6", howToAnswer: "...Qb6 — b2 is loose.", why: "Loosens b2." },
        { san: "f4", verdict: "dubious", answer: "Qb6", howToAnswer: "...Qb6, ...Nh6–f5.", why: "Over-extends." },
        { san: "Bd3", verdict: "bad", answer: "cxd4", howToAnswer: "...cxd4 cxd4 Nxd4! — the bishop on d3 blocks the queen's guard of d4, so the pawn just falls.", why: "Hangs d4." },
        { san: "a3", verdict: "dubious", answer: "Qb6", howToAnswer: "...Qb6.", why: "Slow." },
        { san: "Bb5", verdict: "dubious", answer: "Qb6", howToAnswer: "...Qb6 (or ...Bd7) — hits b5 and d4.", why: "Loosens." },
      ],
    },
    [P("e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3")]: {
      yourMove: { san: "Qb6", why: "Third attacker on d4 and pressure on b2 — White's bishop can't develop to d3, and they're tied to defence." },
      mistakes: [
        { san: "cxd4", why: "Don't release the tension early. After cxd4 cxd4 White's centre is rock-solid and you've given up your main lever. Keep pressing with ...Qb6." },
        { san: "Nf6", why: "e5 covers f6 — the knight is simply lost to exf6. Route it via e7." },
      ],
      checkpoint: {
        question: "You've hit d4 with ...c5 and ...Nc6. What's the plan now?",
        options: ["...Qb6: a third attacker on d4, and pressure on b2.", "...cxd4 to open the c-file.", "...Nf6 to develop."],
        correctIndex: 0,
        explanation: "Keep piling on d4 — the base of the chain. ...cxd4 solidifies White's centre; ...Nf6 hangs the knight to exf6.",
      },
    },
    [P("e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6")]: {
      replies: [
        { san: "a3", verdict: "good", answer: "Bd7", howToAnswer: "...Bd7, then ...Nge7–f5 or ...Rc8.", why: "Main line: prepares b4." },
        { san: "Be2", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 cxd4 Nge7 — now take, and the knight heads to f5 against d4.", why: "Normal." },
        { san: "Bd3", verdict: "bad", answer: "cxd4", howToAnswer: "...cxd4 cxd4 Nxd4 — a free pawn (Bd3 blocked the queen).", why: "The Milner-Barry idea, but at your level it's just a pawn." },
        { san: "Be3", verdict: "bad", answer: "Qxb2", howToAnswer: "...Qxb2 — take it; the bishop left b2 undefended.", why: "Hangs b2." },
        { san: "Nbd2", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7, ...Nge7.", why: "Passive." },
        { san: "b3", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7, ...Rc8 — weakened queenside.", why: "Weakens c3." },
      ],
    },

    // --- Winawer -------------------------------------------------------------------------------
    [P("e4 e6 d4 d5 Nc3")]: {
      yourMove: { san: "Bb4", why: "Pin the knight that guards e4. Now e5 or exd5 — either way you get the structure you want." },
    },
    [P("e4 e6 d4 d5 Nc3 Bb4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit the base.", why: "Main line." },
        { san: "exd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5, then ...Nf6, ...O-O.", why: "Exchange." },
        { san: "Bd3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 Bxe4 Nf6 — tempo on the bishop.", why: "Loose." },
        { san: "Nge2", verdict: "good", answer: "dxe4", howToAnswer: "...dxe4; after a3 Be7 Nxe4 Nf6, you're fine.", why: "Avoids the doubled pawns." },
        { san: "a3", verdict: "dubious", answer: "Bxc3+", howToAnswer: "...Bxc3+ bxc3 dxe4 — a pawn, and their queenside is wrecked.", why: "Gives up e4." },
        { san: "Qg4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — hits the queen and develops.", why: "Early queen." },
        { san: "Bd2", verdict: "good", answer: "dxe4", howToAnswer: "...dxe4, then ...Nf6.", why: "Unpins." },
      ],
    },
    [P("e4 e6 d4 d5 Nc3 Bb4 e5")]: { yourMove: { san: "c5", why: "Hit the base of the chain, as always." } },
    [P("e4 e6 d4 d5 Nc3 Bb4 e5 c5")]: {
      replies: [
        { san: "a3", verdict: "good", answer: "Bxc3+", howToAnswer: "...Bxc3+ bxc3 Ne7 — doubled pawns for White, knight to e7 for you.", why: "Main line." },
        { san: "Qg4", verdict: "dubious", answer: "Ne7", howToAnswer: "...Ne7 — guards g7 and develops.", why: "Early queen, eyeing g7." },
        { san: "Bd2", verdict: "good", answer: "Ne7", howToAnswer: "...Ne7, then ...Nbc6 and ...Qb6.", why: "Unpins." },
        { san: "Nf3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...Qb6.", why: "Normal." },
        { san: "dxc5", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — regain c5 later; e5 becomes weak.", why: "Gives up the chain." },
      ],
    },
    [P("e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3")]: {
      yourMove: { san: "Bxc3+", why: "Take: bxc3 leaves White with doubled c-pawns and a weak queenside — your long-term target." },
      mistakes: [
        { san: "Ba5", why: "b4! and the bishop is hunted around the board. Just take on c3." },
        { san: "Bxa3", why: "bxa3 and you've given a bishop for a pawn. Take the KNIGHT on c3, not the pawn." },
      ],
    },
    [P("e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3")]: {
      yourMove: { san: "Ne7", why: "The knight goes to e7 — never f6 while e5 is there — heading for f5 or c6. Qc7 and ...Nbc6 next." },
      mistakes: [{ san: "Nf6", why: "exf6 — the knight hangs to the e5-pawn." }],
    },
    [P("e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7")]: {
      replies: [
        { san: "Qg4", verdict: "good", answer: "Qc7", howToAnswer: "...Qc7 — covers g7 indirectly and hits e5; or ...O-O if you're brave.", why: "The sharp main line: eyes g7." },
        { san: "Nf3", verdict: "good", answer: "Nbc6", howToAnswer: "...Nbc6, ...Qa5 or ...Qc7.", why: "Quiet." },
        { san: "a4", verdict: "good", answer: "Nbc6", howToAnswer: "...Nbc6, ...Qa5.", why: "Prepares Ba3." },
        { san: "Bd3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 cxd4 Qc7 — d4 is loose again.", why: "Blocks the queen's guard of d4." },
      ],
    },

    // --- Exchange -----------------------------------------------------------------------------------
    [P("e4 e6 d4 d5 exd5")]: { yourMove: { san: "exd5", why: "Recapture. Your bishop is free now — develop and castle." } },
    [P("e4 e6 d4 d5 exd5 exd5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Bd6, ...O-O.", why: "Main line." },
        { san: "Bd3", verdict: "good", answer: "Bd6", howToAnswer: "...Bd6 — mirror; then ...Nf6 and ...O-O.", why: "Normal." },
        { san: "c4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6; if c5, ...Be7 and the pawn on c5 is loose.", why: "Loosens." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Bd6.", why: "Normal." },
        { san: "Qe2+", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — develop while blocking; the queen must move again.", why: "A check that helps you." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — kicks the bishop and supports d5.", why: "Loses time." },
        { san: "Bf4", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 — offer the trade of your good bishop for theirs? Actually you keep it: if Bxd6 Qxd6 you're fine.", why: "Normal." },
      ],
    },
    [P("e4 e6 d4 d5 exd5 exd5 Nf3")]: { yourMove: { san: "Nf6", why: "Develop — no e5-pawn, so f6 is safe." } },
    [P("e4 e6 d4 d5 exd5 exd5 Nf3 Nf6")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Bd6", howToAnswer: "...Bd6, then ...O-O.", why: "Main line." },
        { san: "Bg5", verdict: "good", answer: "Be7", howToAnswer: "...Be7, ...O-O.", why: "Normal." },
        { san: "c4", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, ...O-O; take on c4 only if it's safe.", why: "Loosens." },
        { san: "Ne5", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 — hits the knight.", why: "Premature." },
        { san: "Be2", verdict: "good", answer: "Bd6", howToAnswer: "...Bd6, ...O-O.", why: "Quiet." },
        { san: "h3", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6.", why: "Slow." },
      ],
    },
    [P("e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3")]: { yourMove: { san: "Bd6", why: "Mirror: the bishop eyes h2 and you castle next." } },
    [P("e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O.", why: "Main line." },
        { san: "Bg5", verdict: "good", answer: "O-O", howToAnswer: "...O-O; the pin is harmless.", why: "Normal." },
        { san: "c3", verdict: "good", answer: "O-O", howToAnswer: "...O-O.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...c6.", why: "Normal." },
        { san: "Qe2+", verdict: "dubious", answer: "Qe7", howToAnswer: "...Qe7 — offer the trade; equal and easy.", why: "Check for nothing." },
      ],
    },
    [P("e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6 O-O")]: { yourMove: { san: "O-O", why: "King safe. Now ...Bg4, ...Nc6 or ...c6 and a rook to e8." } },

    // --- Tarrasch --------------------------------------------------------------------------------------
    [P("e4 e6 d4 d5 Nd2")]: { yourMove: { san: "c5", why: "Hit d4 at once: the knight on d2 can't help defend it, and it blocks White's bishop." } },
    [P("e4 e6 d4 d5 Nd2 c5")]: {
      replies: [
        { san: "exd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — open lines for your bishop; ...Nc6 next.", why: "Main line." },
        { san: "Ngf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6; after exd5 exd5.", why: "Normal." },
        { san: "c3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...Nf6? No e5 yet, so ...Nf6 is fine here.", why: "Normal." },
        { san: "dxc5", verdict: "dubious", answer: "Bxc5", howToAnswer: "...Bxc5 — develop with the recapture.", why: "Gives up the centre." },
        { san: "e5", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...Qb6 — the Advance plan, with White's knight misplaced on d2.", why: "Transposes to a worse Advance." },
      ],
    },
    [P("e4 e6 d4 d5 Nd2 c5 exd5")]: { yourMove: { san: "exd5", why: "Recapture with the pawn; your bishop gets the c8–h3 diagonal and the e-file opens." } },
    [P("e4 e6 d4 d5 Nd2 c5 exd5 exd5")]: {
      replies: [
        { san: "Ngf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Bd6 and ...Nf6.", why: "Main line." },
        { san: "Bb5+", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — block and develop.", why: "Normal." },
        { san: "dxc5", verdict: "dubious", answer: "Bxc5", howToAnswer: "...Bxc5; if Nb3, ...Bb6.", why: "Gives up the centre." },
        { san: "Nb3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — if dxc5, ...Bxc5.", why: "Aims at c5 slowly." },
      ],
    },
    [P("e4 e6 d4 d5 Nd2 c5 exd5 exd5 Ngf3")]: { yourMove: { san: "Nc6", why: "Develop and keep pressure on d4." } },
    [P("e4 e6 d4 d5 Nd2 c5 exd5 exd5 Ngf3 Nc6")]: {
      replies: [
        { san: "Bb5", verdict: "good", answer: "Bd6", howToAnswer: "...Bd6 — develop; the pin is harmless.", why: "Main line." },
        { san: "dxc5", verdict: "dubious", answer: "Bxc5", howToAnswer: "...Bxc5, ...Nf6, ...O-O.", why: "Normal." },
        { san: "Be2", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Bd6, ...O-O.", why: "Quiet." },
        { san: "Nb3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Nbxd4 Bd6 — you're developed and the d-pawn stays.", why: "Slow." },
        { san: "c3", verdict: "good", answer: "Bd6", howToAnswer: "...Bd6, ...Nf6.", why: "Normal." },
      ],
    },
    [P("e4 e6 d4 d5 Nd2 c5 exd5 exd5 Ngf3 Nc6 Bb5")]: {
      yourMove: { san: "Bd6", why: "Develop actively toward the kingside; ...Nge7 or ...Nf6 and castle." },
      mistakes: [{ san: "a6", why: "Bxc6+ bxc6 and your pawns are doubled for nothing. Develop instead: ...Bd6." }],
    },
  },

  traps: [
    {
      name: "Bd3?? hangs d4",
      sans: sans("1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Bd3 cxd4 6.cxd4 Nxd4 7.Nf3 Nxf3+ 8.Qxf3"),
      punisher: "black",
      tell: "White develops the bishop to d3 while d4 is only defended by the queen.",
      why: "Bd3 blocks the queen's guard of d4. ...cxd4 cxd4 Nxd4 wins the pawn cleanly; after Nf3 Nxf3+ Qxf3 you're a pawn up with a healthy position.",
    },
    {
      name: "...Nf6 into exf6 (don't do this)",
      sans: sans("1.e4 e6 2.d4 d5 3.e5 Nf6 4.exf6"),
      punisher: "white",
      tell: "White's pawn is on e5 and you want to 'develop' the knight.",
      why: "e5 covers f6: the knight is simply captured. In the Advance the knight develops via e7 (or h6), aiming for f5.",
    },
  ],

  modelGames: [
    { label: "Advance Variation", sans: sans("e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6"), summary: "Hit the base of the chain: ...c5, ...Nc6, ...Qb6 pile onto d4 while White's attack is still a plan." },
    { label: "Winawer Variation", sans: sans("e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7"), summary: "Pin the knight, take on c3 when asked, and route your knight to e7 — never f6 while e5 stands." },
    { label: "Exchange Variation", sans: sans("e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6 O-O O-O"), summary: "Symmetrical and equal: develop, castle, use the e-file." },
    { label: "Tarrasch Variation (3.Nd2)", sans: sans("e4 e6 d4 d5 Nd2 c5 exd5 exd5 Ngf3 Nc6 Bb5 Bd6"), summary: "Against Nd2, ...c5 at once; after exd5 exd5 your bishop is free and your pieces develop actively." },
  ],

  middlegamePlan:
    "The French is a pawn-chain battle. Strike the BASE of White's chain with ...c5 (and sometimes ...f6 against an e5-chain) and pile up on d4 — don't release the tension early. " +
    "Solve your 'French bishop' (the c8-bishop hemmed in by ...e6): trade it via ...b6 and ...Ba6, or activate it with ...Bd7–b5. Your play is on the queenside and against d4; White's is the kingside, so push your break before White's attack lands.",

  structureDiagram: {
    fen: "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6",
    orientation: "black",
    arrows: [{ from: "c5", to: "d4" }, { from: "b6", to: "d4" }],
    caption: "The Advance French: ...c5, ...Nc6 and ...Qb6 all point at d4, the base of White's chain.",
  },
};
