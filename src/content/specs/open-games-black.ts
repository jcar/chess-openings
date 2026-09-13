// Open Games as Black — hand-authored OpeningSpec for 0–1200 players (Black).
// The one core opening with no ChessHall predecessor: what to do after 1.e4 e5
// against everything beginners actually meet — the Italian, the Ruy Lopez, the
// Scotch, the Bishop's Opening, the King's Gambit and the Wayward Queen.

import type { OpeningSpec } from "../spec";
import { fenAfter, pos, sans } from "../authoring";

const P = pos;

export const openGamesBlack: OpeningSpec = {
  id: "open-games-black",
  name: "Open Games as Black",
  aliases: ["1...e5", "Double King's Pawn"],
  eco: "C20–C99",
  side: "black",
  family: "1e4-e5",
  firstMoves: "1.e4 e5",
  tabiyaFen: fenAfter("e4 e5"),
  pitch:
    "Meet 1.e4 with 1...e5 and know exactly what to do next: defend e5 with the knight, develop the bishop to c5, castle. " +
    "Then the specific answers to what beginners actually see — the Scholar's-mate try, the early Bc4, the King's Gambit, the Scotch and the Ruy Lopez.",

  setup: {
    pieces: [
      { piece: "N", squares: ["c6"], why: "The knight defends e5 first. Everything else comes after." },
      { piece: "N", squares: ["f6", "e7"], why: "The king's knight hits e4 and covers your kingside." },
      { piece: "B", squares: ["c5", "e7", "b4", "b6"], why: "The dark bishop out — c5 mirrors the Italian and eyes f2." },
      { piece: "B", squares: ["e6", "g4", "d7"], why: "The light bishop develops once ...d6 or ...d5 is in." },
    ],
    pawns: ["e5", "d6"],
    order: [{ before: "Nc6", after: "Bc5", why: "Knight first: it defends e5, so the bishop can come out without dropping the pawn to Nxe5." }],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "og-defend-e5",
      title: "Defend e5 with the knight first",
      oneLiner: "After 2.Nf3 the pawn is attacked. ...Nc6 defends it and develops — always this move first.",
      why: "Every other move either drops the pawn (…Bc5? Nxe5) or defends it badly (…d6 locks the bishop, …f6 weakens the king, …Qe7 blocks the bishop). ...Nc6 does the job and gets a piece out.",
      trigger: { kind: "opponent_san", sans: ["Nf3"] },
      response: "...Nc6.",
    },
    {
      id: "og-scholars",
      title: "The Scholar's-mate try: Qh5 or Qf3",
      oneLiner: "...Nc6 (defends e5). When Bc4 comes, ...g6 kicks the queen. Then ...Nf6. Never ...Nf6 while the queen and bishop both eye f7.",
      why: "The queen alone threatens nothing but your e5-pawn; ...Nc6 covers it. Once Bc4 joins in, f7 is the target — ...g6 forces the queen off the diagonal and ...Nf6 blocks the f-file. Three calm moves and you're a tempo ahead with their queen exposed.",
      trigger: { kind: "opponent_piece_on", piece: "Q", squares: ["h5", "f3", "g4"] },
      response: "...Nc6, then ...g6 against Bc4, then ...Nf6.",
    },
    {
      id: "og-bishops-opening",
      title: "The early Bc4: hit e4 with ...Nf6",
      oneLiner: "2.Bc4 Nf6 — the bishop can't take on f7 profitably (…Kxf7 and you're a piece up).",
      why: "Bxf7+ is a bishop for a pawn; your king walks back later. Meanwhile ...Nf6 attacks e4. Only don't take on e4 after Nc3 or Qe2 — those set traps; develop with ...Nc6 instead.",
      trigger: { kind: "opponent_san", sans: ["Bc4"] },
      response: "...Nf6 (or ...Nc6 if the knight is already there).",
    },
    {
      id: "og-italian",
      title: "Against the Italian: mirror with ...Bc5",
      oneLiner: "3.Bc4 Bc5 — the same setup they have. A knight jump to g5 is just a free piece (…Qxg5).",
      why: "The Two Knights (…Nf6) invites Ng5 and the Fried Liver — a theory fight you don't need. ...Bc5 is calm: ...Nf6, ...d6, castle, and the position is level.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nc6 Bc4")] },
      response: "...Bc5, then ...Nf6, ...d6, ...O-O.",
    },
    {
      id: "og-ruy",
      title: "Against the Ruy Lopez: ...a6",
      oneLiner: "3.Bb5 a6 — ask the bishop. Bxc6 dxc6 is fine (Nxe5? Qd4! regains the pawn); Ba4 Nf6 and develop.",
      why: "Bb5 pressures the knight that defends e5. ...a6 forces White to decide: trade (and give you the bishop pair) or retreat (and lose a tempo to ...b5 later). Then ...Nf6, ...Be7, ...b5, ...d6, castle — but never castle before ...b5 and ...d6 while Re1 is in (the Tarrasch trap).",
      trigger: { kind: "opponent_san", sans: ["Bb5"] },
      response: "...a6.",
    },
    {
      id: "og-scotch",
      title: "Against the Scotch: take, then ...Bc5",
      oneLiner: "3.d4 exd4 4.Nxd4 Bc5 — the bishop hits the knight and eyes f2.",
      why: "Taking on d4 is forced (or e5 falls). After Nxd4 the knight is attacked; ...Bc5 develops with a threat. If c3 instead (a gambit), ...d5 declines it calmly.",
      trigger: { kind: "opponent_san", sans: ["d4"] },
      response: "...exd4; after Nxd4, ...Bc5; after c3, ...d5.",
    },
    {
      id: "og-fork-trick",
      title: "The fork trick: ...Nxe4 then ...d5",
      oneLiner: "With knights on c3 and f3 and a bishop on c4, ...Nxe4! Nxe4 d5 wins the piece back with a better centre.",
      why: "...d5 forks the bishop and the knight. Whatever White does you regain the piece, get rid of their Italian bishop, and take the centre. Free equality — and a lesson in forks.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bc4")] },
      response: "...Nxe4.",
    },
    {
      id: "og-kings-gambit",
      title: "Against the King's Gambit: decline with ...Bc5",
      oneLiner: "2.f4 Bc5 — White can't castle, and fxe5?? loses to ...Qh4+.",
      why: "Taking on f4 is real theory; declining isn't. ...Bc5 points at g1, ...d6 holds e5, and if White ever takes on e5, ...Qh4+ is crushing.",
      trigger: { kind: "opponent_san", sans: ["f4"] },
      response: "...Bc5, then ...d6.",
    },
    {
      id: "og-book-end",
      title: "When the book runs out",
      oneLiner: "Knights out, bishop to c5 or e7, castle, then ...d6 or ...d5 depending on how much of the centre you can hold.",
      why: "Open games reward development speed and king safety. Get everything out, castle, and only then look for tactics — most of your opponents won't manage that.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — meet it head on.", why: "Two thirds of your games, and everything here follows from it." },
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — a queen's pawn game. Then ...Nf6 and ...e6 or ...c6; the app's Slav trainer covers this ground.", why: "There's no 1...e5 against 1.d4, so take the centre the same way instead." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...Nf6 and ...Bf5 or ...c6.", why: "Flexible; it stops ...e5 for a move." },
        { san: "c4", verdict: "good", answer: "e5", howToAnswer: "...e5! Then ...Nc6, ...Nf6, ...Bb4 — you're the one with the space.", why: "The English. ...e5 is the same instinct that serves you against 1.e4." },
        { san: "e3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...Nf6 and ...c5 — you get more of the centre.", why: "Passive." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...Nf6, ...e6 (or ...c6) — solid.", why: "A fianchetto setup." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — if e4 then ...d4 kicks the knight, or ...dxe4.", why: "Often heads for e4." },
        { san: "b3", verdict: "dubious", answer: "e5", howToAnswer: "...e5, ...Nc6, ...Nf6 — take the centre they gave up.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — and remember their king is loose.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "e5", howToAnswer: "...e5, ...Nf6, ...Nc6 — more space for you.", why: "Timid." },
      ],
    },
    [P("e4")]: { yourMove: { san: "e5", why: "Claim the centre. The most natural reply, and the one this whole repertoire is built around." } },
    [P("e4 e5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — defend e5 and develop.", why: "The main line, by far." },
        { san: "Bc4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — hit e4. Bxf7+ is just a bishop for a pawn.", why: "The Bishop's Opening; common at this level." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6. If f4, ...d5!", why: "The Vienna." },
        { san: "Qh5", verdict: "bad", answer: "Nc6", howToAnswer: "...Nc6 — defends e5. Then ...g6 against Bc4, then ...Nf6.", why: "The Wayward Queen: a Scholar's-mate try. Three calm moves refute it." },
        { san: "f4", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — decline; White can't castle. fxe5?? Qh4+.", why: "The King's Gambit. Sharp if you accept, tame if you decline." },
        { san: "d4", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4; after Qxd4, ...Nc6 kicks the queen.", why: "The Centre Game. Their queen comes out early." },
        { san: "Qf3", verdict: "bad", answer: "Nc6", howToAnswer: "...Nc6; against Bc4, ...Nf6 blocks the f-file (or ...g6/…Qe7).", why: "Another mate-in-one dream. Develop and it's gone." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 (or ...d5) — c3 did nothing for development.", why: "Slow." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...Bc5 (or ...d5).", why: "Passive." },
        { san: "Ne2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...d5.", why: "Blocks the bishop." },
      ],
    },

    // --- 2.Nf3 ----------------------------------------------------------------------------------
    [P("e4 e5 Nf3")]: {
      yourMove: { san: "Nc6", why: "e5 is attacked. The knight defends it and develops — the only move that does both cleanly." },
      mistakes: [
        { san: "Bc5", why: "Nxe5! — the pawn was attacked and you didn't defend it. Knight first, then the bishop." },
        { san: "f6", why: "Damiano's Defence: Nxe5! fxe5 Qh5+ and your king goes for a walk. Never defend e5 with the f-pawn." },
        { san: "Qf6", why: "A queen out on move two is a target: Nc3 and Nd5 chase it around while White develops for free. ...Nc6." },
        { san: "d5", why: "The Elephant Gambit: exd5 and you're a pawn down for little. ...Nc6 keeps it simple." },
      ],
      checkpoint: {
        question: "White's knight attacks your e5-pawn. What's the plan?",
        options: ["...Nc6 — defend it and develop.", "...d6 — a solid pawn defends it.", "...Bc5 — develop with the bishop first."],
        correctIndex: 0,
        explanation: "...Nc6 defends and develops in one move. ...d6 works but locks in your dark bishop; ...Bc5 simply loses the pawn to Nxe5.",
      },
    },
    [P("e4 e5 Nf3 Nc6")]: {
      replies: [
        { san: "Bc4", verdict: "good", answer: "Bc5", howToAnswer: "...Bc5 — mirror. Then ...Nf6, ...d6, castle.", why: "The Italian — the most common." },
        { san: "Bb5", verdict: "good", answer: "a6", howToAnswer: "...a6 — ask the bishop.", why: "The Ruy Lopez." },
        { san: "d4", verdict: "good", answer: "exd4", howToAnswer: "...exd4; after Nxd4, ...Bc5.", why: "The Scotch." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6; after Bc4, the fork trick ...Nxe4!", why: "Three Knights / Four Knights." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — if d4, ...Nxe4.", why: "The Ponziani. Slow." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bc5 or ...d5.", why: "Passive." },
        { san: "Be2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bc5, ...d5.", why: "Passive." },
        { san: "Nxe5", verdict: "bad", answer: "Nxe5", howToAnswer: "...Nxe5 — a knight for a pawn. If d4, ...Ng6 or ...Nc6.", why: "Hangs the knight." },
        { san: "Bd3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5 — Bd3 blocks White's own d-pawn.", why: "Misplaced." },
        { san: "h3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bc5.", why: "A wasted move." },
      ],
    },

    // --- Italian -----------------------------------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 Bc4")]: {
      yourMove: { san: "Bc5", why: "Mirror the Italian bishop. Calm and solid — and it sidesteps the Fried Liver entirely." },
      mistakes: [
        { san: "Nf6", why: "Playable — but it invites Ng5 and the Fried Liver, a theory fight you don't need at this level. ...Bc5 first; ...Nf6 next move." },
        { san: "Nd4", why: "The Blackburne Shilling Gambit: a bluff that only works if White grabs e5. After Nxd4 exd4 c3 you've just lost the centre." },
        { san: "d6", why: "Solid but it locks in your dark bishop. ...Bc5 first, then ...d6." },
        { san: "h6", why: "Nothing was threatening g5. A whole move on a pawn that develops nothing." },
        { san: "f5", why: "Opens the e8–h5 diagonal to your own king before a piece is out. Develop instead." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5")]: {
      replies: [
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — hit e4. After d4 exd4 cxd4 Bb4+ is fine for you.", why: "The Giuoco Piano." },
        { san: "d3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...d6, ...O-O.", why: "The quiet Italian." },
        { san: "O-O", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...d6, ...O-O.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...d6, ...O-O.", why: "Normal." },
        { san: "b4", verdict: "dubious", answer: "Bb6", howToAnswer: "...Bb6 — decline the Evans; the b-pawn is now a target for ...a5.", why: "The Evans Gambit. Declining is safest." },
        { san: "d4", verdict: "dubious", answer: "Bxd4", howToAnswer: "...Bxd4 — trade down; Nxd4 Nxd4 and you're equal.", why: "The Italian Gambit." },
        { san: "Ng5", verdict: "bad", answer: "Qxg5", howToAnswer: "...Qxg5 — the knight is simply free.", why: "Hangs the knight." },
        { san: "Bxf7+", verdict: "bad", answer: "Kxf7", howToAnswer: "...Kxf7 — you're a piece up. If Nxe5+ Nxe5, even more.", why: "A bishop for a pawn." },
        { san: "Nxe5", verdict: "bad", answer: "Nxe5", howToAnswer: "...Nxe5; if d4, ...Bd6 (or ...Bxd4).", why: "Hangs the knight." },
        { san: "Qe2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d6, ...O-O.", why: "Early queen." },
        { san: "h3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6.", why: "Wasted move." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3")]: { yourMove: { san: "Nf6", why: "Attack e4 and develop. If d4, ...exd4 cxd4 Bb4+ is fine for you." } },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6")]: {
      replies: [
        { san: "d3", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...O-O.", why: "The Giuoco Pianissimo." },
        { san: "d4", verdict: "good", answer: "exd4", howToAnswer: "...exd4 cxd4 Bb4+ — then Nc3 Nxe4.", why: "The classical break." },
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...d6.", why: "Normal." },
        { san: "b4", verdict: "dubious", answer: "Bb6", howToAnswer: "...Bb6.", why: "Late Evans." },
        { san: "Ng5", verdict: "bad", answer: "O-O", howToAnswer: "...O-O — if Nxf7 Rxf7 Bxf7+ Kxf7, you have two pieces for a rook and pawn.", why: "The lunge comes to nothing." },
        { san: "Qe2", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...O-O.", why: "Early queen." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3")]: { yourMove: { san: "d6", why: "Keep e5 firm and free the c8-bishop. Castle next." } },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...a6 and ...Ba7.", why: "Main line." },
        { san: "Nbd2", verdict: "good", answer: "O-O", howToAnswer: "...O-O.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O; ...h6 later if it annoys you.", why: "Harmless." },
        { san: "Be3", verdict: "dubious", answer: "Bb6", howToAnswer: "...Bb6 — keep your good bishop.", why: "Offers a trade." },
        { san: "b4", verdict: "dubious", answer: "Bb6", howToAnswer: "...Bb6.", why: "Loose." },
        { san: "h3", verdict: "good", answer: "O-O", howToAnswer: "...O-O.", why: "Normal." },
        { san: "Bb3", verdict: "good", answer: "O-O", howToAnswer: "...O-O.", why: "Normal." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O")]: { yourMove: { san: "O-O", why: "King safe. Now ...a6 and ...Ba7, or ...Be6 to challenge the bishop." } },

    // --- Ruy Lopez -----------------------------------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 Bb5")]: {
      yourMove: { san: "a6", why: "Ask the bishop. Bxc6 dxc6 gives you the bishop pair (and Nxe5? Qd4! regains the pawn); Ba4 lets you gain time with ...b5 later." },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6")]: {
      replies: [
        { san: "Ba4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — hit e4; ...Be7, ...b5, ...d6 follow.", why: "Main line." },
        { san: "Bxc6", verdict: "good", answer: "dxc6", howToAnswer: "...dxc6 — if Nxe5, ...Qd4! hits the knight and e4.", why: "The Exchange Ruy." },
        { san: "Bc4", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — an Italian where they've lost a move.", why: "Retreats to a square they could have reached directly." },
        { san: "Be2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bc5.", why: "Passive." },
        { san: "Bd3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — Bd3 blocks their d-pawn.", why: "Misplaced." },
        { san: "Nc3", verdict: "bad", answer: "axb5", howToAnswer: "...axb5 — a free bishop.", why: "Ignores the attack on the bishop." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4")]: { yourMove: { san: "Nf6", why: "Hit e4 and develop; ...Be7 and castle next, with ...b5 and ...d6 to come." } },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — then after Re1, ...b5 and ...d6 BEFORE castling.", why: "Main line." },
        { san: "d3", verdict: "good", answer: "b5", howToAnswer: "...b5 Bb3 Be7 (or ...Bc5).", why: "Quiet." },
        { san: "Nc3", verdict: "good", answer: "b5", howToAnswer: "...b5 Bb3 Bc5 (or ...Be7).", why: "The Four Knights Spanish." },
        { san: "Bxc6", verdict: "good", answer: "dxc6", howToAnswer: "...dxc6; if Nxe5, ...Nxe4.", why: "Trades." },
        { san: "d4", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4; Nxd4 Nxd4? No — ...Bc5 or ...Nxe4 both fine.", why: "Loosens." },
        { san: "Qe2", verdict: "dubious", answer: "b5", howToAnswer: "...b5 Bb3 Bc5.", why: "Early queen." },
        { san: "c3", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Be7 (…Nxe4 is playable but sharp).", why: "Prepares d4." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O")]: {
      yourMove: { san: "Be7", why: "Develop and prepare to castle — but ...b5 and ...d6 first if Re1 comes." },
      mistakes: [{ san: "Nxe4", why: "The Open Ruy: after d4 b5 Bb3 d5 dxe5 you're in a theory fight. Playable, but ...Be7 is the calm road." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7")]: {
      replies: [
        { san: "Re1", verdict: "good", answer: "b5", howToAnswer: "...b5! (not ...O-O — Bxc6 dxc6 Nxe5 wins a pawn since ...Qd4 Nf3 Qxe4?? Rxe4).", why: "Main line; sets the Tarrasch trap." },
        { san: "Nc3", verdict: "good", answer: "b5", howToAnswer: "...b5 Bb3 d6.", why: "Normal." },
        { san: "d3", verdict: "good", answer: "b5", howToAnswer: "...b5 Bb3 d6 O-O.", why: "Quiet." },
        { san: "Bxc6", verdict: "good", answer: "dxc6", howToAnswer: "...dxc6.", why: "Trades." },
        { san: "d4", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4 e5 Ne4 — or ...Nxd4 if you like.", why: "Loosens." },
        { san: "Qe2", verdict: "good", answer: "b5", howToAnswer: "...b5 Bb3 d6 O-O.", why: "Normal." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1")]: {
      yourMove: { san: "b5", why: "Kick the bishop first. With Re1 in, e4 is defended, so the old ...Nxe4 idea is gone — and castling now loses a pawn to Bxc6 and Nxe5." },
      mistakes: [
        { san: "O-O", why: "The Tarrasch trap: Bxc6 dxc6 Nxe5 and you can't win the pawn back — ...Qd4 Nf3 Qxe4?? runs into Rxe4. Play ...b5 and ...d6 first." },
      ],
      checkpoint: {
        question: "White has castled and played Re1. What comes first?",
        options: ["...b5, then ...d6 — kick the bishop and secure e5 before castling.", "...O-O — king safety first.", "...Nxe4 — grab the pawn."],
        correctIndex: 0,
        explanation: "Castling now allows Bxc6 dxc6 Nxe5, winning a pawn (…Qd4 Nf3 Qxe4 fails to Rxe4). ...b5 gains time on the bishop and ...d6 makes e5 safe; then castle. ...Nxe4 is met by Rxe4.",
      },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5")]: {
      replies: [{ san: "Bb3", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...O-O.", why: "The only sensible retreat." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3")]: { yourMove: { san: "d6", why: "Secure e5 for good. Now castling is safe." } },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6")]: {
      replies: [
        { san: "c3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Na5 hitting the bishop, or ...Bg4.", why: "Main line." },
        { san: "a4", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin; or ...b4.", why: "Hits b5." },
        { san: "h3", verdict: "good", answer: "O-O", howToAnswer: "...O-O.", why: "Stops ...Bg4." },
        { san: "d4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O; if d5, ...Na5.", why: "Loosens." },
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...Na5.", why: "Normal." },
        { san: "Ng5", verdict: "bad", answer: "O-O", howToAnswer: "...O-O — the knight achieves nothing on g5; ...h6 kicks it next.", why: "A lunge into nothing." },
      ],
    },

    // --- Scotch ----------------------------------------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4")]: {
      yourMove: { san: "exd4", why: "Take, or e5 falls. After Nxd4 the knight will be a target for ...Bc5." },
      mistakes: [
        { san: "d6", why: "dxe5 and you're worse. Just take on d4." },
        { san: "Nxd4", why: "Nxd4 exd4 Qxd4 — White's queen sits happily in the centre. ...exd4 first, then ...Bc5 after Nxd4." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4")]: {
      replies: [
        { san: "Nxd4", verdict: "good", answer: "Bc5", howToAnswer: "...Bc5 — hits the knight.", why: "The Scotch proper." },
        { san: "c3", verdict: "dubious", answer: "d5", howToAnswer: "...d5! — decline the Göring Gambit; after exd5 Qxd5 cxd4 Bg4 you're comfortable.", why: "The Göring Gambit. Declining is calm." },
        { san: "Bc4", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5; if c3, ...Nf6; if O-O, ...d6.", why: "The Scotch Gambit." },
        { san: "e5", verdict: "dubious", answer: "Qe7", howToAnswer: "...Qe7 — hits e5; after Qe2, ...d6.", why: "Over-extends." },
        { san: "Bb5", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 (or ...a6).", why: "Odd." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4")]: {
      yourMove: { san: "Bc5", why: "Develop with a threat on the knight and an eye on f2." },
      mistakes: [
        { san: "Nxd4", why: "Qxd4 — their queen loves d4. Hit the knight with ...Bc5 instead." },
        { san: "Qh4", why: "An early queen sortie: Nc3 and Nf3 (or Nb5) chase it while White develops. ...Bc5." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5")]: {
      replies: [
        { san: "Be3", verdict: "good", answer: "Qf6", howToAnswer: "...Qf6 — hits the knight twice; after c3, ...Nge7.", why: "Main line." },
        { san: "Nxc6", verdict: "good", answer: "Qf6", howToAnswer: "...Qf6! — threatens Qxf2#; after Qd2 (or Qf3), ...dxc6.", why: "Trades — and lets you develop with a mate threat." },
        { san: "Nb3", verdict: "good", answer: "Bb6", howToAnswer: "...Bb6, then ...Nf6 and ...d6.", why: "Retreats." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — hits e4.", why: "Slow." },
        { san: "Nf5", verdict: "dubious", answer: "d5", howToAnswer: "...d5! — hits e4 and opens the bishop; exd5 Qxd5.", why: "A knight on the rim." },
        { san: "Nf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d6.", why: "Retreats for nothing." },
      ],
    },

    // --- Three Knights & the fork trick -------------------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 Nc3")]: { yourMove: { san: "Nf6", why: "Develop and hit e4. If Bc4 next, the fork trick ...Nxe4!" } },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6")]: {
      replies: [
        { san: "Bb5", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — mirror; then ...O-O, ...d6.", why: "The Four Knights Spanish." },
        { san: "Bc4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4! Nxe4 d5 — the fork regains the piece.", why: "Allows the fork trick." },
        { san: "d4", verdict: "good", answer: "exd4", howToAnswer: "...exd4 Nxd4 Bb4.", why: "The Scotch Four Knights." },
        { san: "d3", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5, ...d6, ...O-O.", why: "Passive." },
        { san: "Be2", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5, ...d6.", why: "Passive." },
        { san: "Nxe5", verdict: "bad", answer: "Nxe5", howToAnswer: "...Nxe5 — if d4, ...Ng6 (or ...Nc6) and you're a piece up.", why: "Hangs the knight." },
        { san: "g3", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 (or ...d5!).", why: "Slow." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bc4")]: {
      yourMove: { san: "Nxe4", why: "The fork trick: after Nxe4 d5 hits bishop and knight, you win the piece back with a strong centre." },
      mistakes: [{ san: "Bc5", why: "Now the trick works against YOU: Nxe5! Nxe5 d4 hits both your bishop and knight. Play ...Nxe4 first." }],
      checkpoint: {
        question: "Knights on c3 and f3, bishop on c4. Is there a trick here?",
        options: ["...Nxe4! Nxe4 d5 — a fork wins the piece back with the centre.", "...Bc5 — mirror them.", "...d6 — solid."],
        correctIndex: 0,
        explanation: "...Nxe4 Nxe4 d5 forks bishop and knight. ...Bc5 walks into the same trick from White (Nxe5! Nxe5 d4).",
      },
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bc4 Nxe4")]: {
      replies: [
        { san: "Nxe4", verdict: "good", answer: "d5", howToAnswer: "...d5 — the fork.", why: "Main line." },
        { san: "Bxf7+", verdict: "dubious", answer: "Kxf7", howToAnswer: "...Kxf7 Nxe4 d5 — a piece up for a pawn, and your king walks to g8 later.", why: "Desperado." },
        { san: "O-O", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 dxc3 — a clean pawn up.", why: "Ignores the pawn." },
        { san: "Qe2", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 dxc3 (or Qxe5+? no — Qe2 Nxc3 dxc3 Be7).", why: "Nothing." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bc4 Nxe4 Nxe4")]: { yourMove: { san: "d5", why: "Fork: the bishop on c4 and the knight on e4 are both attacked. Whatever moves, you take the other." } },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bc4 Nxe4 Nxe4 d5")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "dxe4", howToAnswer: "...dxe4 Bxe4 Bd6 — equal, and you have the centre.", why: "Main line." },
        { san: "Bxd5", verdict: "bad", answer: "Qxd5", howToAnswer: "...Qxd5 — a free bishop; the knight is hit too.", why: "Hangs the bishop." },
        { san: "Bb5", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4; if Nxe5, ...Qg5 (or ...Qd5).", why: "Loses the knight anyway." },
        { san: "Bb3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4; if Ng5, ...Qxg5!", why: "Loses the knight." },
        { san: "Neg5", verdict: "bad", answer: "Qxg5", howToAnswer: "...Qxg5 — undefended.", why: "Hangs a knight." },
      ],
    },

    // --- Bishop's Opening ---------------------------------------------------------------------------------
    [P("e4 e5 Bc4")]: {
      yourMove: { san: "Nf6", why: "Hit e4 and develop. Bxf7+?? Kxf7 is a piece up for you." },
    },
    [P("e4 e5 Bc4 Nf6")]: {
      replies: [
        { san: "d3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Bc5 and ...d6 — the Italian setup.", why: "Main line." },
        { san: "Nc3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — NOT ...Nxe4, which runs into Qh5!", why: "Sets a trap: don't take e4." },
        { san: "Nf3", verdict: "good", answer: "Nxe4", howToAnswer: "...Nxe4 — take. After Nc3 Nxc3 dxc3 f6 holds e5; after Nxe5 d5!", why: "Transposes to the Petroff/Boden-Kieseritzky; the pawn is yours." },
        { san: "Qe2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — not ...Nxe4?? Qxe4 d5 and you've lost a knight for a pawn.", why: "Guards e4 with a trap." },
        { san: "Bxf7+", verdict: "bad", answer: "Kxf7", howToAnswer: "...Kxf7 — a piece up. Walk the king back to g8 via e8 later.", why: "A bishop for a pawn." },
        { san: "d4", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4; if e5, ...d5!", why: "The Urusov Gambit." },
        { san: "f4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6; if fxe5, ...Nxe5.", why: "Loosens." },
      ],
    },
    [P("e4 e5 Bc4 Nf6 Nc3")]: {
      yourMove: { san: "Nc6", why: "Develop. ...Nxe4? runs into Qh5! with threats on e5 and f7." },
      mistakes: [{ san: "Nxe4", why: "Qh5! hits e5 and f7 at once — after ...Nd6 Bb3 you're on the back foot. Just develop with ...Nc6." }],
    },
    [P("e4 e5 Bc4 Nf6 Qe2")]: {
      yourMove: { san: "Nc6", why: "Develop and defend e5. ...Nxe4?? loses a knight for a pawn: Qxe4 d5 Bb3." },
      mistakes: [{ san: "Nxe4", why: "Qxe4 d5 — the bishop just steps back and you've lost a knight for a pawn. Develop with ...Nc6." }],
    },

    // --- Centre Game ----------------------------------------------------------------------------------------
    [P("e4 e5 d4")]: { yourMove: { san: "exd4", why: "Take. If Qxd4, ...Nc6 kicks the queen with tempo." } },
    [P("e4 e5 d4 exd4")]: {
      replies: [
        { san: "Qxd4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — develop with a threat.", why: "The Centre Game." },
        { san: "c3", verdict: "dubious", answer: "d5", howToAnswer: "...d5! — decline the Danish; exd5 Qxd5 cxd4 Nc6.", why: "The Danish Gambit. Declining is clean." },
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — a Scotch.", why: "Normal." },
        { san: "Bc4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...Bc5 (or ...Nf6).", why: "Gambits." },
      ],
    },
    [P("e4 e5 d4 exd4 Qxd4")]: { yourMove: { san: "Nc6", why: "Attack the queen while developing. Whatever square it picks, you're a move ahead." } },
    [P("e4 e5 d4 exd4 Qxd4 Nc6")]: {
      replies: [
        { san: "Qe3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Bb4 or ...Be7 and castle.", why: "Main line." },
        { san: "Qa4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bc5.", why: "Offside queen." },
        { san: "Qd1", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — you're two moves ahead.", why: "Goes home." },
        { san: "Qc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bb4? no — ...Bc5 or ...Be7.", why: "Odd square." },
        { san: "Qd2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bc5.", why: "Passive." },
      ],
    },

    // --- King's Gambit --------------------------------------------------------------------------------------
    [P("e4 e5 f4")]: {
      yourMove: { san: "Bc5", why: "Decline: the bishop points at g1 so White can't castle, and fxe5?? loses to ...Qh4+." },
      mistakes: [
        { san: "exf4", why: "Playable — it's the main line — but it's a theory fight. ...Bc5 declines calmly and keeps White's king in the centre." },
        { san: "Qh4+", why: "g3 and the queen must retreat: a wasted move. Develop with ...Bc5." },
        { san: "f6", why: "Weakens your king for nothing." },
      ],
    },
    [P("e4 e5 f4 Bc5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "d6", howToAnswer: "...d6 — hold e5; ...Nf6 and ...Bg4 next.", why: "Main line." },
        { san: "fxe5", verdict: "bad", answer: "Qh4+", howToAnswer: "...Qh4+! g3 Qxe4+ and the h1-rook falls; Ke2 Qxe4+ is worse.", why: "Opens the e1–h4 diagonal to their own king." },
        { san: "c3", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nf6.", why: "Prepares d4." },
        { san: "Nc3", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nf6.", why: "Normal." },
        { san: "d3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...Nf6.", why: "Passive." },
        { san: "Bc4", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nf6, ...O-O.", why: "Normal." },
        { san: "Qh5", verdict: "bad", answer: "g6", howToAnswer: "...g6 — kick the queen (Qxe5+ Qe7 trades and you're fine).", why: "Wayward queen again." },
      ],
    },
    [P("e4 e5 f4 Bc5 Nf3")]: { yourMove: { san: "d6", why: "Hold e5 and free the c8-bishop; ...Nf6 and ...Bg4 next." } },
    [P("e4 e5 f4 Bc5 Nf3 d6")]: {
      replies: [
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 (or ...Bg4).", why: "Main line." },
        { san: "Bc4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...O-O.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...O-O.", why: "Normal." },
        { san: "fxe5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 — Nxe5?? Qd4! wins the knight or f2.", why: "Releases the tension for nothing." },
        { san: "b4", verdict: "dubious", answer: "Bb6", howToAnswer: "...Bb6.", why: "Loose." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6.", why: "Passive." },
      ],
    },

    // --- Wayward Queen -----------------------------------------------------------------------------------------
    [P("e4 e5 Qh5")]: {
      yourMove: { san: "Nc6", why: "Defend e5 and develop. Ignore the queen — she can't do anything alone." },
      mistakes: [
        { san: "Nf6", why: "Qxe5+ wins the pawn with check. Defend e5 first: ...Nc6." },
        { san: "g6", why: "Qxe5+ and after ...Qe7 Qxh8 — the rook is gone. ...Nc6 first; ...g6 comes once Bc4 arrives." },
        { san: "Ke7", why: "You've given up castling to defend a pawn. ...Nc6 does it for free." },
      ],
    },
    [P("e4 e5 Qh5 Nc6")]: {
      replies: [
        { san: "Bc4", verdict: "good", answer: "g6", howToAnswer: "...g6 — kick the queen off the diagonal; then ...Nf6.", why: "The Scholar's-mate setup. One pawn move refutes it." },
        { san: "Nf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — attacks the queen; Qxe5+? Nxe5 loses her.", why: "Develops, but the queen is still a target." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — hits the queen.", why: "Normal." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6.", why: "Passive." },
        { san: "Qf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — blocks the f-file and develops.", why: "Still dreaming of f7." },
      ],
    },
    [P("e4 e5 Qh5 Nc6 Bc4")]: {
      yourMove: { san: "g6", why: "The queen must leave the h5–f7 diagonal. Then ...Nf6 blocks the f-file for good." },
      mistakes: [
        { san: "Nf6", why: "Qxf7# — checkmate. The queen and bishop both hit f7 and only your king defends it. ...g6 first." },
        { san: "d6", why: "Qxf7# — same mate. Kick the queen with ...g6." },
        { san: "Bc5", why: "Qxf7# — the mate is still on. ...g6." },
        { san: "Nd4", why: "Qxf7# — hitting their queen doesn't matter if you're mated first. ...g6." },
      ],
      checkpoint: {
        question: "Queen on h5, bishop on c4: they're aiming at f7. What now?",
        options: ["...g6 — kick the queen off the diagonal, then ...Nf6.", "...Nf6 — attack the queen.", "...d6 — solid."],
        correctIndex: 0,
        explanation: "Anything but ...g6 (or ...Qe7/...Qf6) allows Qxf7#. After ...g6 the queen must move, and ...Nf6 then blocks the f-file for the rest of the game.",
      },
    },
    [P("e4 e5 Qh5 Nc6 Bc4 g6")]: {
      replies: [
        { san: "Qf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — blocks the f-file and develops.", why: "Still eyeing f7." },
        { san: "Qd1", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bg7, ...O-O — two moves ahead.", why: "Goes home." },
        { san: "Qh4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bg7.", why: "Offside." },
        { san: "Qh3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5!", why: "Offside." },
        { san: "Qe2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bg7, ...O-O.", why: "Blocks their bishop." },
        { san: "Qh6", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — the queen on h6 can be hit by ...Bxh6? No: ...Bf8 is home; just develop, ...d5 next.", why: "Offside." },
      ],
    },
    [P("e4 e5 Qh5 Nc6 Bc4 g6 Qf3")]: {
      yourMove: { san: "Nf6", why: "Blocks the f-file (no more Qxf7) and develops. Then ...Bg7 and castle." },
      mistakes: [
        { san: "Bg7", why: "Qxf7# — the f-file is still open. ...Nf6 first." },
        { san: "d6", why: "Qxf7# — still the mate. ...Nf6." },
        { san: "Nd4", why: "Qxf7# comes before your threat matters. ...Nf6." },
      ],
    },
    [P("e4 e5 Qh5 Nc6 Bc4 g6 Qf3 Nf6")]: {
      replies: [
        { san: "g4", verdict: "dubious", answer: "Nd4", howToAnswer: "...Nd4! — hits the queen and c2.", why: "Over-aggressive." },
        { san: "Nc3", verdict: "good", answer: "Nd4", howToAnswer: "...Nd4 — hits the queen; after Qd3, ...d5!", why: "Normal." },
        { san: "Ne2", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...d6.", why: "Normal." },
        { san: "d3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O.", why: "Normal." },
        { san: "h3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O — you're way ahead.", why: "Slow." },
      ],
    },
  },

  traps: [
    {
      name: "Scholar's mate (don't fall for it)",
      sans: sans("1.e4 e5 2.Qh5 Nc6 3.Bc4 Nf6 4.Qxf7#"),
      punisher: "white",
      tell: "Queen on h5 (or f3) and bishop on c4, both aimed at f7.",
      why: "Two attackers on f7, one defender. ...Nf6 attacks the queen but doesn't stop the mate. ...g6 first — then ...Nf6.",
    },
    {
      name: "The fork trick",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bc4 Nxe4 5.Nxe4 d5"),
      punisher: "black",
      tell: "White has knights on c3 and f3 and puts the bishop on c4.",
      why: "...Nxe4 Nxe4 d5 forks bishop and knight: you regain the piece, remove their Italian bishop and take the centre.",
    },
    {
      name: "The free knight on g5",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.Ng5 Qxg5"),
      punisher: "black",
      tell: "White's knight lunges to g5 while your queen still sees the square.",
      why: "With ...Bc5 (not ...Nf6) the knight on g5 is defended by nothing. Just take it.",
    },
    {
      name: "King's Gambit: fxe5?? Qh4+",
      sans: sans("1.e4 e5 2.f4 Bc5 3.fxe5 Qh4+ 4.g3 Qxe4+ 5.Qe2 Qxh1"),
      punisher: "black",
      tell: "You declined with ...Bc5 and White takes on e5 anyway.",
      why: "fxe5 opens the e1–h4 diagonal. ...Qh4+ g3 Qxe4+ wins the e4-pawn with check and then the rook on h1 (Ke2 instead walks into ...Qxe4+ too).",
    },
    {
      name: "The Tarrasch trap (don't fall for it)",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 O-O 7.Bxc6 dxc6 8.Nxe5 Qd4 9.Nf3 Qxe4 10.Rxe4"),
      punisher: "white",
      tell: "In the Ruy Lopez, White plays Re1 before you've played ...b5 and ...d6.",
      why: "Castling here lets Bxc6 dxc6 Nxe5 win a pawn: the natural ...Qd4 Nf3 Qxe4 loses the queen to Rxe4. Play ...b5 and ...d6 first, then castle.",
    },
  ],

  modelGames: [
    { label: "Italian, mirrored", sans: sans("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O"), summary: "Knight defends e5, bishop to c5, knight to f6, ...d6, castle — the same calm build-up your opponent is doing." },
    { label: "Ruy Lopez, the safe way", sans: sans("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O"), summary: "...a6 asks the bishop; ...b5 and ...d6 come BEFORE castling once Re1 is in." },
    { label: "Scotch", sans: sans("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7"), summary: "Take on d4, hit the knight with ...Bc5, then ...Qf6 and the knight to e7." },
    { label: "Wayward Queen, refuted", sans: sans("e4 e5 Qh5 Nc6 Bc4 g6 Qf3 Nf6 Ne2 Bg7"), summary: "...Nc6, ...g6, ...Nf6: the Scholar's-mate try leaves White's queen exposed and you ahead in development." },
    { label: "The fork trick", sans: sans("e4 e5 Nf3 Nc6 Nc3 Nf6 Bc4 Nxe4 Nxe4 d5 Bd3 dxe4 Bxe4 Bd6"), summary: "...Nxe4 and ...d5 regain the piece with the centre; equal and comfortable." },
  ],

  middlegamePlan:
    "Open games are about development speed and king safety. Get both knights out, the bishop to c5 or e7, castle, then decide the centre: ...d6 when you want to keep e5 solid, ...d5 when you can afford to open the game. " +
    "Look for the fork trick (...Nxe4 and ...d5) whenever a white bishop sits on c4 with knights on c3 and f3, and never let a queen-and-bishop battery aim at f7 without ...g6 or ...Nf6 blocking it.",

  structureDiagram: {
    fen: fenAfter("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O"),
    orientation: "black",
    arrows: [{ from: "d6", to: "d5" }],
    caption: "The mirrored Italian: both sides developed and castled. Your freeing idea is ...d5, prepared by ...a6, ...Ba7 and ...Re8.",
  },
};
