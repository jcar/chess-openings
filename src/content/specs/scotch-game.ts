// Scotch Game (1.e4 e5 2.Nf3 Nc6 3.d4) — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines are standard public theory. Prose original.
//
// The Scotch trades the centre pawns on move three and plays the rest of the
// game with pieces. The knight recaptures on d4 (never the queen: ...Nxd4
// takes it), then either stays as the best piece on the board or trades on c6
// to leave Black with doubled c-pawns. Develop fast, castle, rooks to the open
// files, and use the lead before Black frees the game with ...d5.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const scotchGame: OpeningSpec = {
  id: "scotch-game",
  name: "Scotch Game",
  eco: "C44–C45",
  side: "white",
  family: "1e4-e5",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.d4",
  tabiyaFen: "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
  pitch:
    "The Scotch opens the centre on move three, so you play with pieces on open lines instead of shuffling pawns. " +
    "There is almost nothing to memorise: recapture on d4 with the knight, develop everything, castle, and the position plays itself in a way most opponents under 1200 never quite keep up with.",

  setup: {
    pieces: [
      { piece: "N", squares: ["d4"], why: "The Scotch knight. It recaptures on d4 and is the best-placed piece on the board — or it trades itself on c6 to wreck Black's pawns." },
      { piece: "N", squares: ["c3"], why: "The queen's knight covers e4 and d5. It comes out only after the d4 recapture, never before: with a black pawn on d4, Nc3 is simply captured." },
      { piece: "B", squares: ["d3", "c4", "e2"], why: "The light bishop. d3 in the main line, where it guards e4 and looks at h7; c4 against ...Bc5 setups; e2 when the black queen is out early." },
      { piece: "B", squares: ["e3", "g5"], why: "The dark bishop. e3 whenever a black bishop lands on c5 and hits d4; g5 once you have castled, to pin the f6-knight." },
      { piece: "R", squares: ["e1", "d1"], why: "Open centre, open files. The rooks belong on d1 and e1, where they do the work the pawns used to do." },
    ],
    pawns: ["e4", "d4"],
    order: [
      {
        before: "Nf3",
        after: "d4",
        why: "Knight first, then d4. With Nf3 already out you recapture on d4 with a piece that cannot be chased. Push d4 first and after ...exd4 you are recapturing with the queen, and ...Nc6 kicks her for free.",
      },
      {
        before: "Nxd4",
        after: "Nc3",
        why: "Take back on d4 before the queen's knight moves. A black pawn on d4 attacks c3: play Nc3 while it is still there and ...dxc3 just takes the knight.",
      },
    ],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "scotch-open-lines",
      title: "Trade the centre, play with pieces",
      oneLiner: "3.d4 swaps the centre pawns. From here the game is activity, not structure.",
      why: "You give up the slow build-up of the Italian or Spanish on purpose. After ...exd4 Nxd4 the d- and e-files are half-open, your knight sits in the centre, and every piece has room. The plan is speed: develop, castle, rooks to the open files, and press before Black catches up.",
    },
    {
      id: "scotch-knight-recapture",
      title: "Take back with the knight",
      oneLiner: "Nxd4, never Qxd4. The knight on c6 is waiting for the queen.",
      why: "Black's knight is already on c6, so a queen on d4 is captured at once. The knight recapture puts your best piece in the centre with nothing able to kick it. This is the one move you must never get wrong in the Scotch.",
      trigger: { kind: "opponent_san", sans: ["exd4"] },
      response: "Nxd4.",
      ifIgnored: "Qxd4 Nxd4 and the game is over on move four.",
    },
    {
      id: "scotch-vs-bc5",
      title: "...Bc5 hits d4: Be3, then c3",
      oneLiner: "When the bishop points at your knight, defend it with Be3, then c3.",
      why: "After ...Bc5 the d4-knight is attacked twice (bishop and knight) and defended once (queen). Be3 adds a defender and c3 adds a pawn, and only then do you bring the other knight out. Nc3 first drops a piece to ...Bxd4.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["c5"] },
      response: "Be3, then c3, then Bc4 or Bd3.",
      ifIgnored: "Nc3?? Bxd4 and you cannot take back without losing the queen.",
    },
    {
      id: "scotch-doubled-pawns",
      title: "Nxc6: give Black doubled pawns",
      oneLiner: "Trading on c6 leaves Black with c7 and c6 pawns that never move well.",
      why: "In the main line the knight has done its job. Nxc6 bxc6 leaves Black's c-pawns doubled and the queenside loose, and it opens d3 for your bishop with e4 covered. You give up your best piece for a structure that stays worse all game.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4")] },
      response: "Nxc6, then Bd3.",
    },
    {
      id: "scotch-early-queen",
      title: "The early queen: develop, do not chase",
      oneLiner: "...Qh4 or ...Qf6 looks scary. Answer with pieces, not pawns.",
      why: "Black's queen comes out to hit e4 or f2. Nc3 covers e4, Be2 covers f3 and g4, Be3 covers d4 and f2. Each of those is a developing move, and the queen has to move again when your pieces arrive. Do not push g3 or f3 to chase her; that is exactly what she wants.",
      trigger: { kind: "opponent_piece_on", piece: "Q", squares: ["h4", "f6"] },
      response: "Nc3 and Be2 against ...Qh4; Be3 and c3 against ...Qf6.",
    },
    {
      id: "scotch-d5-break",
      title: "...d5: trade it and castle",
      oneLiner: "When Black frees the game with ...d5, take it, castle, then pin with Bg5.",
      why: "...d5 is Black's whole point: it opens the c8-bishop and challenges e4. Take it, so the doubled pawn on c6 becomes an isolated pawn on d5. Castle, then Bg5 pins the knight that guards it. The pawn is a target for the rest of the game.",
      trigger: { kind: "opponent_san", sans: ["d5"] },
      response: "exd5, O-O, Bg5.",
    },
    {
      id: "scotch-book-end",
      title: "When the book runs out",
      oneLiner: "Rooks to d1 and e1, pieces at the c6/d5 pawns, no pawn-grabbing.",
      why: "The Scotch middlegame is about the weak black pawn — c6 or d5 — and your lead in development. Put the rooks on the open files, keep the knight central or trade it for a bishop, and aim pieces at the pawn rather than winning it at once. If you find yourself chasing pawns with your queen, stop: the game is won by activity.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "e4", why: "Take the centre and open both bishops." } },

    [P("e4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — attack e5 and prepare d4.", why: "The classical reply, and the one the Scotch is built for." },
        { san: "c5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then d4 — an Open Sicilian. The Scotch spirit still applies: open the centre.", why: "The Sicilian fights for d4 from the side." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — a French.", why: "Solid, and it shuts in Black's light bishop." },
        { san: "c6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — a Caro-Kann.", why: "Prepares ...d5 without blocking the bishop." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — if ...Qxd5, Nc3 gains time.", why: "The Scandinavian brings the queen out early." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nf3 and Nc3.", why: "Passive: the f8-bishop is blocked at once." },
        { san: "Nf6", verdict: "dubious", answer: "e5", howToAnswer: "e5 — kick the knight, then d4. Then stop chasing and develop.", why: "The Alekhine invites you to gain space." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nc3, Be3 — build the centre.", why: "The Modern gives you the centre for free." },
      ],
    },

    [P("e4 e5")]: {
      yourMove: { san: "Nf3", why: "Knight first. It attacks e5 and, more to the point, it will be the piece that recaptures on d4." },
      mistakes: [{ san: "d4", why: "The Centre Game. After ...exd4 you have to take back with the queen, and ...Nc6 kicks her with tempo. Nf3 first, and the knight does the recapturing." }],
    },
    [P("e4 e5 Nf3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "d4", howToAnswer: "d4 — the Scotch. Strike at once.", why: "The main line. Black defends e5 and you open the centre." },
        { san: "Nf6", verdict: "good", answer: "Nxe5", howToAnswer: "Nxe5 — take. After ...d6 Nf3 Nxe4, play d4 and you have an open centre with the knight recapturing later.", why: "The Petrov counterattacks instead of defending. Solid, and a little drawish." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the same strike, against a setup that has already locked in a bishop.", why: "The Philidor is passive." },
        { san: "Bc5", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5 — the pawn is loose. If ...Bxf2+ Kxf2 Qh4+, g3 and the checks run dry with you well ahead.", why: "Develops without defending e5, and the f2 trick does not work." },
        { san: "f6", verdict: "bad", answer: "Nxe5", howToAnswer: "Nxe5! If ...fxe5 then Qh5+ wins material; after ...Qe7 retreat Nf3 and you are a pawn up.", why: "The Damiano: the f-pawn weakens the king and blocks the knight." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — take. If ...e4, Qe2 hits it.", why: "The Elephant Gambit gives a pawn for very little." },
        { san: "Qe7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — cover e4 first. With the queen on e7, d4 exd4 Nxd4 would drop e4 with check.", why: "The queen defends e5 but blocks the bishop, and it aims at e4." },
        { san: "Qf6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then d4 — the queen will be kicked around.", why: "An early queen on the knight's square." },
      ],
    },

    // --- 3.d4 -----------------------------------------------------------------
    [P("e4 e5 Nf3 Nc6")]: {
      yourMove: { san: "d4", why: "The Scotch. Hit e5 with a pawn, trade the centre, and play the rest of the game with pieces." },
      mistakes: [{ san: "Nxe5", why: "...Nxe5 and you have given a knight for a pawn. The knight on c6 guards e5." }],
    },
    [P("e4 e5 Nf3 Nc6 d4")]: {
      replies: [
        { san: "exd4", verdict: "good", answer: "Nxd4", howToAnswer: "Nxd4 — with the knight. Never the queen.", why: "The main line. Black takes and the centre opens." },
        { san: "Nxd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 Qxd4 — now the queen is safe in the centre because no knight is left to kick it.", why: "Trading knights first. It leaves Black's e5-pawn to fall." },
        { san: "d6", verdict: "dubious", answer: "Bb5", howToAnswer: "Bb5 — pin the defender. Then d5 or dxe5 depending on what Black does.", why: "Holding the centre passively. The pin makes e5 hard to keep." },
        { san: "Qe7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — cover e4, keep the tension, develop.", why: "The queen defends e5 but blocks the f8-bishop." },
        { san: "f6", verdict: "bad", answer: "Bc4", howToAnswer: "Bc4 — aim at the king that just lost f7's cover. Do not sacrifice on e5: after ...Nxe5 Qh5+ Black has ...Ng6.", why: "Weakens the king and takes the knight's square. With the knight on c6 there is no Damiano trick, so develop instead." },
        { san: "Bb4+", verdict: "dubious", answer: "c3", howToAnswer: "c3 — the bishop has to move again and d4 is now supported.", why: "A check that gains nothing and loses time." },
        { san: "d5", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5 — trade into a simpler, better position. If ...Nxe5 dxe5 dxe4 Qxd8+, Black loses castling.", why: "Counterattacking in the centre before developing." },
        { san: "Nf6", verdict: "dubious", answer: "dxe5", howToAnswer: "dxe5 — take. If ...Nxe4, Bd3 kicks the knight and you are comfortable.", why: "Ignoring the threat to e5." },
      ],
    },

    // --- 3...exd4 4.Nxd4 ------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4 exd4")]: {
      yourMove: { san: "Nxd4", why: "The knight, never the queen. It lands in the centre and nothing can kick it." },
      mistakes: [
        { san: "Qxd4", why: "...Nxd4. The knight on c6 has been waiting for this since move two. You lose the queen for a knight." },
        { san: "Nc3", why: "The pawn on d4 attacks c3: ...dxc3 simply takes the knight. Recapture first, develop second." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — defend e4 and develop. Nxc6 and Bd3 follow.", why: "The main line. Black develops and hits e4." },
        { san: "Bc5", verdict: "good", answer: "Be3", howToAnswer: "Be3 — defend d4 first. Then c3, then the other pieces.", why: "The Classical. The bishop hits your knight, and d4 is now attacked twice." },
        { san: "Qh4", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then Be2. If the queen grabs e4, Ndb5 hits c7 and the black king has to run.", why: "The Steinitz queen. Scary-looking, but every answer is a developing move." },
        { san: "Nxd4", verdict: "dubious", answer: "Qxd4", howToAnswer: "Qxd4 — now the queen is safe: no knight can reach it. Develop and castle.", why: "Trading off the piece that made the queen recapture impossible." },
        { san: "Qf6", verdict: "dubious", answer: "Be3", howToAnswer: "Be3 — d4 is held, and ...Bc5 next just transposes to the Classical with c3.", why: "Hitting d4 with the queen, aiming at f2 later." },
        { san: "Bb4+", verdict: "dubious", answer: "c3", howToAnswer: "c3 — the bishop moves again and d4 gains a pawn defender.", why: "A check that gains nothing." },
        { san: "d6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then Be2 and castle — a comfortable edge in space.", why: "Passive: the bishop is shut in." },
        { san: "Nge7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — if ...Nxd4 Qxd4, the queen is again safe in the centre.", why: "A clumsy knight that blocks the bishop." },
        { san: "g6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then Be3 and Qd2 — the long diagonal is met by a solid centre.", why: "Slow. You are two moves ahead in development." },
        { san: "d5", verdict: "good", answer: "Nxc6", howToAnswer: "Nxc6 bxc6 exd5 — Black gets the pawn back but the structure is worse.", why: "The freeing break, played early. It equalises but leaves targets." },
      ],
    },

    // --- 4...Nf6 5.Nc3 -----------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6")]: {
      yourMove: { san: "Nc3", why: "Cover e4 and develop. The pawn is off d4, so c3 is safe for the knight now." },
      mistakes: [
        { san: "e5", why: "...Nxe5. The pawn is attacked by both knights and defended by neither. If you want e5 you must trade on c6 first." },
        { san: "Bd3", why: "The bishop blocks your own queen's defence of d4. ...Nxd4 and the knight is simply lost." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3")]: {
      replies: [
        { san: "Bb4", verdict: "good", answer: "Nxc6", howToAnswer: "Nxc6 bxc6 Bd3 — the Scotch Four Knights. Doubled pawns for Black, a smooth game for you.", why: "The main line. Black pins the c3-knight to relieve pressure on e4." },
        { san: "Bc5", verdict: "good", answer: "Be3", howToAnswer: "Be3 — hold d4. If ...Bxd4 Bxd4, your bishop takes over the centre.", why: "Hitting d4 with the bishop. Add a defender." },
        { san: "Nxe4", verdict: "dubious", answer: "Nxe4", howToAnswer: "Nxe4 — take. The fork trick needs ...Nxd4 to work, and Qxd4 covers it. If ...Qe7 instead, f3 holds everything.", why: "The old fork trick. It gives you a pleasant edge rather than a piece, but do take." },
        { san: "d6", verdict: "dubious", answer: "Be2", howToAnswer: "Be2, then castle — solid and pleasant.", why: "Passive." },
        { san: "Be7", verdict: "good", answer: "Nxc6", howToAnswer: "Nxc6 bxc6 Bd3 — the same recipe.", why: "Calm development. The structure play still applies." },
        { san: "Nxd4", verdict: "dubious", answer: "Qxd4", howToAnswer: "Qxd4 — a centralised queen with nothing to kick it. Bg5 and O-O-O is a fine plan.", why: "Trading your best knight, but leaving your queen dominant." },
        { san: "Qe7", verdict: "dubious", answer: "Be2", howToAnswer: "Be2 — develop; the queen on e7 is in the bishop's way.", why: "An awkward queen." },
        { san: "g6", verdict: "dubious", answer: "Be2", howToAnswer: "Be2, then Bg5 — the pin on f6 is annoying for a fianchetto.", why: "Slow." },
      ],
    },

    // --- 5...Bb4 6.Nxc6 -----------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4")]: {
      yourMove: { san: "Nxc6", why: "Trade the knight that has done its job for doubled black c-pawns. It also clears d4 so the queen sees the whole file." },
      mistakes: [
        { san: "Bd3", why: "Blocks the queen's defence of d4 again. ...Nxd4 and you are a piece down." },
        { san: "e5", why: "...Nxe5. Both black knights hit e5 and nothing defends it." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6")]: {
      replies: [
        { san: "bxc6", verdict: "good", answer: "Bd3", howToAnswer: "Bd3 — guards e4, aims at h7, and castling comes next.", why: "The main line. Black's c-pawns are doubled for good." },
        { san: "dxc6", verdict: "dubious", answer: "Qxd8+", howToAnswer: "Qxd8+ Kxd8 — trade queens. Black cannot castle and the doubled pawns remain.", why: "Recapturing with the d-pawn opens the queen file — for you." },
        { san: "Bxc3+", verdict: "dubious", answer: "bxc3", howToAnswer: "bxc3 — then Black still has to recapture on c6. You get the bishop pair and the open b-file.", why: "Trading the bishop first. It gives you doubled pawns too, but yours come with two bishops." },
        { san: "Nxe4", verdict: "bad", answer: "Nxd8", howToAnswer: "Nxd8 — the knight takes the queen. Whatever follows, you are far ahead.", why: "Black forgot the knight on c6 attacks d8." },
        { san: "Qe7", verdict: "bad", answer: "Nxb4", howToAnswer: "Nxb4 — the bishop is simply free.", why: "The queen defends nothing on b4." },
      ],
    },

    // --- 6...bxc6 7.Bd3 ---------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6")]: {
      yourMove: { san: "Bd3", why: "The bishop guards e4, looks at h7, and gets you castled. The d4-knight is gone, so nothing is blocked." },
      mistakes: [
        { san: "Bc4", why: "...Nxe4 is unpleasant, and ...d5 hits the bishop with tempo whenever Black likes. d3 is where the bishop covers e4." },
        { san: "e5", why: "...Qe7 pins the pawn to your king and the knight cannot even be chased. Keep the pawn on e4 and develop." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "exd5 cxd5 O-O — the doubled pawn becomes an isolated one on d5. Bg5 next.", why: "The freeing break. Take it and the target changes shape." },
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "O-O — then ...d5 exd5 cxd5 Bg5, the same plan.", why: "Sensible. Both sides castle before the fight." },
        { san: "d6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — the c6-pawn stays doubled and Black's centre is slow.", why: "Passive; it keeps the pawn structure you wanted." },
        { san: "Qe7", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then Bg5 — the queen on e7 makes the pin awkward for Black.", why: "The queen blocks the bishop's best square." },
        { san: "Bxc3+", verdict: "dubious", answer: "bxc3", howToAnswer: "bxc3 — you have the bishop pair and the open b-file for the rook.", why: "Giving up the bishop to double your pawns as well." },
        { san: "Nxe4", verdict: "bad", answer: "Bxe4", howToAnswer: "Bxe4 — a knight for a pawn. If ...Qe7 tries to win it back through Bxc3+, Qe2 covers everything.", why: "e4 is defended twice." },
        { san: "h6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O.", why: "A waiting move that stops Bg5 and does nothing else." },
      ],
    },

    // --- 7...d5 8.exd5 ------------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5")]: {
      yourMove: { san: "exd5", why: "Take. After ...cxd5 Black's doubled pawn has become an isolated one, and your pieces know where to aim." },
      mistakes: [{ san: "e5", why: "Closing the centre you just opened. ...Ng4 hits e5 and f2 at once and the pawn becomes a target, not a spearhead." }],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5 exd5")]: {
      replies: [
        { san: "cxd5", verdict: "good", answer: "O-O", howToAnswer: "O-O — castle, then Bg5 pins the knight that guards d5.", why: "The main line. Black repairs the doubled pawns but is left with an isolated d5." },
        { san: "Nxd5", verdict: "dubious", answer: "Bd2", howToAnswer: "Bd2 — unpin first. Now ...Nxc3 Bxc3 trades into a comfortable game for you.", why: "The knight recapture keeps the pawns doubled and gives you a pin to worry about." },
        { san: "Qxd5", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — the queen is loose in the centre; Qe2+ and Re1 ideas come with tempo.", why: "Centralising the queen early, where it becomes a target." },
        { san: "O-O", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — castle rather than take on c6 at once; ...cxd5 comes and you have kept the structure edge.", why: "Castling first. Taking dxc6 looks greedy but ...Bg4 and ...Re8 give Black play." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5 exd5 cxd5")]: {
      yourMove: { san: "O-O", why: "King safe before the pin. Bg5 is the next move." },
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5 exd5 cxd5 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Bg5", howToAnswer: "Bg5 — pin the knight that guards d5. Qf3 and Rae1 come next.", why: "The main line. Now the middlegame is about the d5-pawn." },
        { san: "Bxc3", verdict: "dubious", answer: "bxc3", howToAnswer: "bxc3 — two bishops and the b-file, against pawns on c7 and d5.", why: "Giving up the bishop pair to spoil your pawns." },
        { san: "c6", verdict: "dubious", answer: "Bg5", howToAnswer: "Bg5 — the pin stands whether or not d5 has a pawn behind it.", why: "Supporting d5, but slowly." },
        { san: "Bg4", verdict: "dubious", answer: "Bb5+", howToAnswer: "Bb5+ — the g4-bishop hits your queen through the empty f3-square, so check first, then Qd3.", why: "Pinning nothing, but it does attack your queen: with the knight gone from f3, g4 to d1 is open." },
        { san: "Be6", verdict: "good", answer: "Bg5", howToAnswer: "Bg5 — pin, then Qf3 and the rooks to e1 and d1.", why: "Solid support for d5." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5 exd5 cxd5 O-O O-O")]: {
      yourMove: { san: "Bg5", why: "Pin the knight that guards d5. From here the game is about that pawn, and your rooks belong on e1 and d1." },
    },

    // --- 4...Bc5: the Classical ------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5")]: {
      yourMove: { san: "Be3", why: "d4 is attacked twice and defended once. Add a defender first; everything else waits." },
      mistakes: [{ san: "Nc3", why: "...Bxd4. The knight is attacked twice and defended once, and you cannot take back without losing the queen to ...Nxd4." }],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3")]: {
      replies: [
        { san: "Qf6", verdict: "good", answer: "c3", howToAnswer: "c3 — a third defender for d4, and the c5-bishop will be hit by b4 later.", why: "The main line. Black adds a third attacker on d4 and eyes f2." },
        { san: "Bb6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — with d4 held twice, develop normally.", why: "Retreating before being asked." },
        { san: "Nf6", verdict: "bad", answer: "Nxc6", howToAnswer: "Nxc6! Now the e3-bishop sees c5. After ...bxc6 Bxc5 you are a piece up for a pawn.", why: "Black forgets that the d4-knight is the only thing between your bishop and theirs." },
        { san: "Bxd4", verdict: "dubious", answer: "Bxd4", howToAnswer: "Bxd4 — your bishop takes the centre. If ...Nxd4 Qxd4, the queen is safe there.", why: "Trading the bishop that was doing the pressuring." },
        { san: "d6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then Be2 and castle.", why: "Solid, passive." },
        { san: "Nge7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — d4 is held twice; develop.", why: "A quiet knight move that blocks the bishop." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6")]: {
      yourMove: { san: "c3", why: "A pawn now defends d4 too. The knight is safe, and b4 will kick the bishop when you want." },
      mistakes: [{ san: "Nxc6", why: "...Bxe3 fxe3 Qxb2 and your queenside falls apart. With the queen on f6, the knight trade opens the wrong lines." }],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3")]: {
      replies: [
        { san: "Nge7", verdict: "good", answer: "Bc4", howToAnswer: "Bc4 — develop toward f7. After ...Ne5 drop back to e2 and castle.", why: "The main line. Black develops without blocking the queen." },
        { san: "Bb6", verdict: "good", answer: "Bc4", howToAnswer: "Bc4, then castle.", why: "Keeping the bishop off the b4 kick." },
        { san: "d6", verdict: "dubious", answer: "Bd3", howToAnswer: "Bd3 — guards e4 and readies castling; the queen is heading to g6.", why: "Solid." },
        { san: "Qg6", verdict: "dubious", answer: "Qe2", howToAnswer: "Qe2 — covers e4 and keeps g2 out of the queen's reach. Do not play Bd3: ...Qxg2.", why: "Hitting e4 and g2. Answer both at once." },
        { san: "Bxd4", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4 — a full centre and the bishop pair.", why: "Trading the active bishop for the knight." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7")]: {
      yourMove: { san: "Bc4", why: "Develop toward f7 and prepare to castle. If ...Ne5 hits it, Be2 is fine." },
    },

    // --- 4...Qh4 and 4...Nxd4 --------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Qh4")]: {
      yourMove: { san: "Nc3", why: "Cover e4 and develop. Be2 next covers f3 and g4, and the queen has to keep moving." },
      mistakes: [{ san: "Nf3", why: "...Qxe4+ with check. The knight was covering e4 from d4; retreating uncovers it." }],
    },
    [P("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nxd4")]: {
      yourMove: { san: "Qxd4", why: "With the knight gone from c6, the queen is safe in the centre. Develop around it and castle." },
    },
    [P("e4 e5 Nf3 Nc6 d4 Nxd4")]: {
      yourMove: { san: "Nxd4", why: "Take back. After ...exd4 Qxd4 the queen sits in the centre and no knight can chase it." },
    },
    [P("e4 e5 Nf3 Nc6 d4 Nxd4 Nxd4 exd4")]: {
      yourMove: { san: "Qxd4", why: "Now the queen recapture is right: the c6-knight is gone." },
    },
  },

  traps: [
    {
      name: "Taking back with the queen",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Qxd4 Nxd4"),
      punisher: "black",
      tell: "The pawn on d4 looks like it can be recaptured either way, and the queen recapture feels natural from the Centre Game.",
      why: "Black's knight has been on c6 since move two, and d4 is one of its squares. Qxd4 loses the queen for a knight on move four. Nxd4 is the Scotch; there is no other recapture.",
    },
    {
      name: "The bishop that blocks its own queen",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Bd3 Nxd4"),
      punisher: "black",
      tell: "Black hits e4 with ...Nf6 and defending it with the bishop looks tidy.",
      why: "The knight on d4 is defended only by the queen on d1, and a bishop on d3 stands between them. Nxd4 wins a piece for nothing. Defend e4 with Nc3, or trade on c6 first and then play Bd3.",
    },
    {
      name: "The knight was the shield",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Bc5 5.Be3 Nf6 6.Nxc6 bxc6 7.Bxc5"),
      punisher: "white",
      tell: "Black plays ...Bc5 and then develops the other knight as if the bishop were safe.",
      why: "Be3 does not attack c5 while your knight stands on d4, so ...Nf6 looks fine. Nxc6 moves the knight, and suddenly the e3-bishop sees straight through to c5. After ...bxc6 Bxc5 you have a piece for a pawn.",
    },
  ],

  modelGames: [
    {
      label: "Main line: doubled pawns, then the pin",
      sans: sans("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5 exd5 cxd5 O-O O-O Bg5 c6 Qf3"),
      summary: "The whole recipe: knight recapture, Nc3, Nxc6 to double the pawns, Bd3, take on d5, castle, Bg5. Black's d5-pawn is the story of the middlegame.",
    },
    {
      label: "The Classical: Be3, c3, Bc4",
      sans: sans("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 Bc4 Ne5 Be2 Qg6 O-O d6 f3"),
      summary: "Black points bishop and queen at d4. You defend it twice, develop, and castle; the black queen has moved three times and is still looking for a job.",
    },
    {
      label: "Against the early queen",
      sans: sans("e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Qh4 Nc3 Bb4 Be2 Qxe4 Ndb5 Bxc3+ bxc3 Kd8 O-O"),
      summary: "...Qh4 grabs e4, and Ndb5 makes the black king walk to d8 on move eight. You are a pawn down and it does not matter: every white piece is out.",
    },
  ],

  middlegamePlan:
    "The Scotch trades the centre pawns early, so the middlegame is about piece activity and one weak black pawn. " +
    "In the main line that pawn is c6, or d5 after the ...d5 break: pin the f6-knight with Bg5, put the rooks on e1 and d1, and point everything at it without rushing to win it. " +
    "In the Classical the d4-knight is your best piece; keep it defended by Be3 and c3, and trade it only for a bishop. " +
    "Do not chase pawns with your queen and do not push e5 to gain space — the open files are worth more than a pawn, and Black's counterplay depends on you losing the thread. " +
    "If many pieces come off, your better structure carries into the endgame.",

  structureDiagram: {
    fen: "r1bqk2r/p1p2ppp/2p2n2/3p4/1b2P3/2NB4/PPP2PPP/R1BQK2R w KQkq - 0 8",
    orientation: "white",
    arrows: [
      { from: "e4", to: "d5" },
      { from: "c1", to: "g5" },
    ],
    caption: "The Scotch Four Knights structure: Black's c-pawns are doubled after Nxc6, and the ...d5 break is met by exd5, castling and Bg5 against the isolated pawn.",
  },
};
