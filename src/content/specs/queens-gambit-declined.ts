// Queen's Gambit Declined — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// You keep the pawn on d5 and build around it: ...e6 behind it, ...Nf6 beside
// it, ...Be7 and castle. Then the position unwinds in a fixed order: ask the
// bishop with ...h6, play ...b6 and ...Bb7, and break with ...c5 once the king
// is safe and the pieces are out. Against the Exchange you get the light
// bishop to f5 before it is shut in; against the Catalan you take on c4 with
// a gain of time and expand with ...a6 and ...b5.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const queensGambitDeclined: OpeningSpec = {
  id: "queens-gambit-declined",
  name: "Queen's Gambit Declined",
  aliases: ["QGD"],
  eco: "D30–D69",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 d5 2.c4 e6",
  tabiyaFen: "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  pitch:
    "Keep the pawn on d5, put a pawn behind it, and build a position that nothing White does in the first ten moves can break. " +
    "It has been the most trusted answer to 1.d4 for a century because every move is a natural one, and the freeing plan of ...h6, ...b6, ...Bb7 and ...c5 is the same every game.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6"], why: "The king's knight defends d5 and covers e4. It goes out before the bishop so that Bg5 has something to pin and nothing to win." },
      { piece: "N", squares: ["d7"], why: "The queen's knight sits behind the c-pawn, not in front of it. From d7 it supports ...c5 and ...e5 and can recapture on f6 if the knight is traded." },
      { piece: "B", squares: ["e7"], why: "The dark bishop. Modest, but it breaks the Bg5 pin and lets you castle. Later it often becomes the queen's square after Bxe7 Qxe7." },
      { piece: "B", squares: ["b7", "f5"], why: "The problem piece of every ...e6 opening. In the main line it comes to b7 after ...b6 and works down the long diagonal; in the Exchange it gets out to f5 before ...e6 shuts the door." },
      { piece: "Q", squares: ["e7", "c7"], why: "After Bxe7 the queen recaptures and sits on e7 watching both wings. If the bishops stay on, c7 backs the ...c5 break." },
    ],
    pawns: ["d5", "e6"],
    order: [
      {
        before: "dxc4",
        after: "b5",
        why: "Take on c4 before you play ...b5. While the c4-pawn is still there, cxb5 simply wins your pawn: nothing on c6 or a6 can take back.",
      },
    ],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "qgd-wall",
      title: "Two pawns hold d5",
      oneLiner: "...e6 behind ...d5 means cxd5 always has a recapture and e4 never comes for free.",
      why: "The Queen's Gambit is an attack on d5. You answer it with a pawn on e6 and a knight on f6 so that the point is held three times. The cost is the c8-bishop stuck behind its own pawn, and the rest of the opening is about getting it out: to b7 in the main line, to f5 in the Exchange.",
    },
    {
      id: "qgd-h6",
      title: "Castle, then ask the bishop",
      oneLiner: "Once you have castled, ...h6 asks the g5-bishop what it wants. Then ...b6 is safe.",
      why: "Bg5 pins your knight to the queen. It is not dangerous while the bishop on e7 is behind the knight, but it stops you playing ...b6 and ...Bb7 in comfort. After ...h6 the bishop either retreats to h4, where ...b6 follows at once, or takes on f6, where ...Bxf6 gives you the bishop pair and a solid game. Do not play ...h6 before castling: the pawn move matters less than king safety.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["g5"] },
      response: "...Be7, ...O-O, then ...h6.",
    },
    {
      id: "qgd-tartakower",
      title: "...b6 and ...Bb7",
      oneLiner: "The Tartakower plan: your light bishop comes to b7 and the position stops feeling cramped.",
      why: "After ...h6 Bh4 the move is ...b6. The bishop that ...e6 shut in comes to b7, looks down the long diagonal, and supports a later ...c5. From here every move is natural: ...Bb7, ...Nbd7, ...c5, and rooks to c8 and d8. If White trades on d5 you recapture with the knight and after Bxe7 Qxe7 Nxd5 exd5 the bishop comes to e6 instead.",
      trigger: { kind: "epd", epds: [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4")] },
      response: "...b6, then ...Bb7 and ...Nbd7.",
    },
    {
      id: "qgd-c5",
      title: "...c5 when the pieces are out",
      oneLiner: "The break that frees everything. Castle first, develop first, then ...c5.",
      why: "Your position is solid but a little short of space until ...c5 hits d4. Played early, with the king on e8 and the f6-knight pinned, it opens the position for White's pieces and loses the d5-pawn. Played after ...O-O, ...Bb7 and ...Nbd7 it opens the c-file for you and asks White what the d4-pawn is doing.",
      trigger: { kind: "epd", epds: [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 Bb7 O-O Nbd7 Qe2")] },
      response: "...c5.",
    },
    {
      id: "qgd-exchange",
      title: "Against cxd5: bishop out to f5",
      oneLiner: "...exd5, then ...c6 and ...Bf5 before the bishop gets shut in.",
      why: "When White trades on d5 early, your e-pawn recaptures and the c8-bishop's diagonal opens. Use it at once: ...c6 covers d5 and guards b7, then ...Bf5 puts the bishop outside the pawn chain and offers to trade off White's good bishop. Later White will try the minority attack, b4 and b5, to leave you a weak c6-pawn. Meet it with ...a5 or ...a6 and by keeping your pieces active in the centre.",
      trigger: { kind: "opponent_san", sans: ["cxd5"] },
      response: "...exd5, ...c6, ...Bf5.",
      ifIgnored: "Qc2 or Bd3 gets there first and your bishop spends the game behind the d5-pawn.",
    },
    {
      id: "qgd-catalan",
      title: "Against the Catalan: take, then ...a6 and ...b5",
      oneLiner: "Castle, take on c4, and when the queen comes to recapture, ...a6 and ...b5 gain a move.",
      why: "With the bishop on g2 White is not going to take back on c4 with a piece, so ...dxc4 costs White a queen move to recover. ...a6 prepares ...b5 so that the queen is hit again and your bishop reaches b7 on the long diagonal, staring straight at White's. Do not play ...b5 before ...a6: a4 breaks it up and the diagonal opens onto your rook.",
      trigger: { kind: "opponent_san", sans: ["g3"] },
      response: "...Nf6, ...Be7, ...O-O, ...dxc4, ...a6, ...b5, ...Bb7.",
    },
    {
      id: "qgd-book-end",
      title: "When the book runs out",
      oneLiner: "Rooks to c8 and d8, then ...c5 or ...Ne4. Keep the structure tight and trade when it frees a piece.",
      why: "Your trumps are solidity and a clear plan; White's are a little more space. Finish development, put the rooks on the c- and d-files, and choose your break: ...c5 against a normal centre, ...Ne4 when the bishop on h4 can be traded. In the Exchange structure the fight is the minority attack: slow b4-b5 down with ...a5 and look for ...Ne4 yourself.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — meet the centre pawn with a centre pawn. ...e6 follows when c4 arrives.", why: "The main move, and the one this opening is built for." },
        { san: "e4", verdict: "good", answer: "e6", howToAnswer: "...e6 — the French. The same pawn pair, ...e6 and ...d5, against the other centre pawn.", why: "Your QGD habits transfer: support d5 and hold the centre." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...Nf6 and ...e6 as usual.", why: "Flexible. It almost always becomes a d4 game." },
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...d5. If d4 comes you are in your opening.", why: "The English. Your structure works unchanged." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...Nf6, ...e6 — a Catalan is coming; take on c4 once you have castled.", why: "A quiet setup." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5. If e4, ...dxe4 or ...d4; if d4, ...Nf6 and ...e6.", why: "The knight blocks the c-pawn, so there is no gambit." },
        { san: "b3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...e6, ...c5 — take the centre they ignored.", why: "Larsen's Opening." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bg4 or ...Bf5 — their king is a little airy.", why: "Bird's Opening." },
      ],
    },
    [P("d4")]: { yourMove: { san: "d5", why: "Claim your half of the centre. Everything in the opening hangs off this pawn." } },
    [P("d4 d5")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6 — decline. The pawn on e6 holds d5 and opens the bishop.", why: "The Queen's Gambit, and the start of your opening." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 when c4 arrives.", why: "Flexible; c4 usually follows." },
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6, ...c5 and ...Bd6 to challenge the bishop.", why: "The London System. Solid, and it gives you no trouble." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...Bf5 or ...Bg4 while their bishop is behind e3.", why: "It locks in White's own bishop." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. If Bg5, ...Nbd7 or ...e6; if e4, ...dxe4.", why: "The knight blocks the c-pawn." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 — take. After Nc3 Nf6 f3, take again and develop; no more grabbing after that.", why: "The Blackmar-Diemer Gambit gives up a pawn for open lines. Take it and stay calm." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bf5, ...e6 — normal development.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. If Bxf6 exf6 you have two bishops and an open e-file.", why: "An odd early bishop move with no target." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...Be7 — the Catalan shape; take on c4 after castling.", why: "A quiet fianchetto." },
      ],
    },
    [P("d4 d5 c4")]: {
      yourMove: { san: "e6", why: "Decline. The e6-pawn holds d5, frees the f8-bishop, and gives you a position White cannot open by force." },
      mistakes: [
        { san: "Nf6", why: "cxd5 Nxd5 e4 kicks the knight and White has the whole centre for nothing. Support d5 first." },
        { san: "Bf5", why: "cxd5 Qxd5 Nc3 and the queen is chased while b7 hangs. The bishop comes out after ...c6, not before." },
        { san: "dxc4", why: "Not wrong, but not this opening: it is the Queen's Gambit Accepted. Here you keep d5 and build around it." },
      ],
    },
    [P("d4 d5 c4 e6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — defend d5 with a piece. Bg5 Be7 next.", why: "The main line: a second attacker on d5." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Be7 and castle. It transposes to the main line.", why: "Equally common." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Be7, ...O-O, then ...dxc4 with a gain of time.", why: "The Catalan. The g2-bishop will stare at d5 and b7." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — recapture with the pawn, then ...c6 and ...Bf5.", why: "The Exchange. Symmetrical and solid; get the bishop out while you can." },
        { san: "e3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Be7 and castle — White's bishop is behind e3, which suits you.", why: "Solid but it shuts in the c1-bishop." },
        { san: "Bg5", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop. Bxf6 Qxf6 is fine for you.", why: "The bishop comes out before there is anything to pin." },
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Be7 or ...Bd6 and ...c5.", why: "London-style." },
        { san: "Qb3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — b7 is covered by the c8-bishop and d5 by the e6-pawn. Develop.", why: "An early queen with nothing to attack." },
        { san: "Nd2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Be7, ...c5 — the knight on d2 blocks their bishop.", why: "Passive." },
        { san: "e4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — a pawn. After Nc3 Nf6 you are simply up material.", why: "A gambit with no compensation once you develop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3")]: {
      yourMove: { san: "Nf6", why: "Defend d5 and develop. The knight also covers e4, so White cannot build the big centre." },
      mistakes: [
        { san: "dxc4", why: "e4 and White has the centre for free. You built the wall to keep d5, not to give it up on move three." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6")]: {
      replies: [
        { san: "Bg5", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — break the pin's sting and prepare to castle.", why: "The main line. The pin on the f6-knight is White's most natural idea." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — then ...c6 and ...Bf5.", why: "The Exchange Variation." },
        { san: "Nf3", verdict: "good", answer: "Be7", howToAnswer: "...Be7, then castle. If Bg5 comes, ...h6 after castling.", why: "Normal development; usually Bg5 follows." },
        { san: "e3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle. White's bishop is behind e3, so no pin is coming.", why: "Solid and a little slow." },
        { san: "Bf4", verdict: "good", answer: "Be7", howToAnswer: "...Be7, castle, then ...c5.", why: "The bishop eyes c7." },
        { san: "g3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, castle, then ...dxc4 as in the Catalan.", why: "A fianchetto with the knight already on c3." },
        { san: "Qc2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Early queen." },
        { san: "Qb3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 while the queen is off the d-file. b7 is still covered.", why: "The queen goes out before the pieces." },
        { san: "a3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle. White spent a move stopping ...Bb4, which you were not going to play.", why: "A tempo for you." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 — take. Nxe4 Nxe4 wins a knight; Bg5 Be7 and you keep the pawn.", why: "The e4-pawn is attacked twice and defended once." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5")]: {
      yourMove: { san: "Be7", why: "The pin is on your queen. Putting the bishop between them removes it and prepares castling." },
      mistakes: [
        { san: "c5", why: "Too early. cxd5 cxd4 Qxd4 and White's pieces come out with tempo while your king is on e8 and your knight is pinned. Castle first." },
        { san: "Bb4", why: "Qa4+ Nc6 and the check gains time for White; there is no knight pin worth having here." },
      ],
      note: "...Nbd7 is also fine here, and it sets the Elephant Trap: cxd5 exd5 Nxd5 Nxd5 Bxd8 Bb4+ wins a piece for you.",
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "O-O", howToAnswer: "...O-O — king first. Then ...h6.", why: "The main line." },
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...h6 and ...b6.", why: "Transposes." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5, then ...c6 and castle.", why: "A late Exchange." },
        { san: "Qc2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...h6 and ...b6.", why: "Prepares Rd1 and e4 slowly." },
        { san: "Bxf6", verdict: "dubious", answer: "Bxf6", howToAnswer: "...Bxf6 — you have the bishop pair and a solid centre.", why: "Gives up the bishop for nothing." },
        { san: "Qb3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — cover d5 and b7; castle next.", why: "Early queen." },
        { san: "Rc1", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...h6 as usual.", why: "Slow." },
        { san: "e4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — take. After Bxf6 Bxf6 Nxe4, ...Bxd4 takes a second pawn: Qxd4 fails to ...Qxd4.", why: "A gambit that loses a pawn or two." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3")]: {
      yourMove: { san: "O-O", why: "King safety first. Every freeing move in this opening waits until the king is on g8." },
      mistakes: [
        { san: "c5", why: "cxd5 exd5 Bxf6 Bxf6 Nxd5 and the d5-pawn falls: your knight was the only thing holding it." },
        { san: "Ne4", why: "Bxe7 Qxe7 Nxe4 dxe4 and the e4-pawn is loose. Lasker's idea needs ...h6 and Bh4 first." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "h6", howToAnswer: "...h6 — ask the bishop.", why: "The main line." },
        { san: "Bd3", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 Bxc4 c5 — the bishop has moved twice and you hit d4.", why: "The bishop commits early, so taking on c4 gains time." },
        { san: "Qc2", verdict: "good", answer: "h6", howToAnswer: "...h6, then ...b6 after Bh4.", why: "Prepares Rd1." },
        { san: "Rc1", verdict: "good", answer: "h6", howToAnswer: "...h6 Bh4 b6 — the usual plan.", why: "Normal." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5, then ...c6 and ...Bf5 if the bishop can get there.", why: "Exchange structure." },
        { san: "Bxf6", verdict: "dubious", answer: "Bxf6", howToAnswer: "...Bxf6 — two bishops and a solid centre.", why: "Gives up the bishop early." },
        { san: "Qb3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — cover both b7 and d5.", why: "Early queen." },
        { san: "f3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 while White prepares e4 slowly.", why: "Slow and it weakens the king." },
        { san: "Nge2", verdict: "dubious", answer: "h6", howToAnswer: "...h6, then ...c5.", why: "The knight blocks the f1-bishop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3")]: {
      yourMove: { san: "h6", why: "Ask the bishop. It retreats to h4 and ...b6 is safe, or it takes on f6 and you get two bishops." },
      mistakes: [
        { san: "b6", why: "Not yet. With the bishop still on g5, cxd5 exd5 lets White pile on the pinned knight. Ask the bishop first." },
        { san: "Ne4", why: "Bxe7 Qxe7 Nxe4 dxe4 Nd2 and the e4-pawn is a weakness. After ...h6 Bh4 the same jump works much better." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6")]: {
      replies: [
        { san: "Bh4", verdict: "good", answer: "b6", howToAnswer: "...b6 — the Tartakower. ...Bb7 next.", why: "The main line. White keeps the pin." },
        { san: "Bxf6", verdict: "good", answer: "Bxf6", howToAnswer: "...Bxf6 — the bishop pair. ...c6 and ...Nd7 next.", why: "Gives up the bishop for a solid structure." },
        { san: "Bf4", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4; the bishop on f4 no longer pins anything.", why: "The bishop leaves the pin voluntarily." },
        { san: "Bd3", verdict: "bad", answer: "hxg5", howToAnswer: "...hxg5 — the bishop was attacked. Free piece.", why: "White forgot the bishop." },
        { san: "Rc1", verdict: "bad", answer: "hxg5", howToAnswer: "...hxg5 — take the bishop.", why: "A rook move while the bishop hangs." },
        { san: "Qc2", verdict: "bad", answer: "hxg5", howToAnswer: "...hxg5 — a free bishop.", why: "Same problem." },
        { san: "cxd5", verdict: "bad", answer: "hxg5", howToAnswer: "...hxg5 — take the bishop. After dxe6 Bxe6 you are a piece up for a pawn.", why: "The trade on d5 does not save the bishop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4")]: {
      yourMove: { san: "b6", why: "The Tartakower move. The bishop that ...e6 shut in is coming to b7, and after that every move is natural." },
      mistakes: [
        { san: "g5", why: "Bg3 and you have loosened your king for nothing. The bishop is perfectly happy on g3." },
        { san: "c5", why: "dxc5 Bxc5 and White gets the freer game while your bishop is still on c8. ...b6 and ...Bb7 first." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — the long diagonal is yours.", why: "The main line." },
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 Bxe7 Qxe7 Nxd5 exd5 Rc1 Be6 — the classical Tartakower position.", why: "White simplifies. Recapture with the knight, not the pawn." },
        { san: "Be2", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, castle is done, ...Nbd7 next.", why: "Slightly more modest than Bd3." },
        { san: "Qc2", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, then ...dxc4 when the bishop comes to d3, and ...Nbd7.", why: "Prepares Rd1." },
        { san: "Rc1", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, ...Nbd7, then ...c5.", why: "Normal." },
        { san: "Qb3", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7 — b7 is now guarded by the bishop itself.", why: "The queen eyes b7 and d5 and achieves neither." },
        { san: "Qa4", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 while the queen is on the edge.", why: "An early queen sortie." },
        { san: "Ne5", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7, then ...Nbd7 to challenge the knight.", why: "Premature." },
        { san: "a3", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7 and ...Nbd7.", why: "Slow." },
        { san: "h3", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7 and ...Nbd7.", why: "Slow." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3")]: {
      yourMove: { san: "Bb7", why: "The problem bishop finds the long diagonal. From b7 it supports ...c5 and looks toward White's king." },
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 Bb7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — the last piece out. ...c5 next.", why: "The main line." },
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 Bxe7 Qxe7 — then Nxd5 Bxd5 and your bishop is centralised.", why: "Simplifying." },
        { san: "Qe2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...c5.", why: "Prepares Rd1." },
        { san: "Rc1", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 and ...c5.", why: "Normal." },
        { san: "Qc2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...c5.", why: "Normal." },
        { san: "Ne5", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — challenge it; Nxd7 Qxd7 is comfortable.", why: "Premature." },
        { san: "Bxf6", verdict: "dubious", answer: "Bxf6", howToAnswer: "...Bxf6 — two bishops, then ...c5.", why: "Gives up the bishop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 Bb7 O-O")]: {
      yourMove: { san: "Nbd7", why: "Develop the last piece behind the c-pawn. From d7 it supports ...c5 and recaptures on f6 if needed." },
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 Bb7 O-O Nbd7")]: {
      replies: [
        { san: "Qe2", verdict: "good", answer: "c5", howToAnswer: "...c5 — the break. Everything is ready.", why: "The main line." },
        { san: "Rc1", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit d4 with everything developed.", why: "Normal." },
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 Bxe7 Qxe7 Nxd5 Bxd5 — trades that leave you comfortable.", why: "Simplifying." },
        { san: "Qc2", verdict: "good", answer: "c5", howToAnswer: "...c5.", why: "Normal." },
        { san: "Ne5", verdict: "dubious", answer: "Nxe5", howToAnswer: "...Nxe5 dxe5 Ne4 — trade the knight and jump into the hole it left.", why: "The knight can be traded off at once." },
        { san: "a3", verdict: "dubious", answer: "c5", howToAnswer: "...c5.", why: "Slow." },
        { san: "Bxf6", verdict: "dubious", answer: "Nxf6", howToAnswer: "...Nxf6 — keep the e7-bishop; ...c5 next.", why: "Gives up the bishop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 Bb7 O-O Nbd7 Qe2")]: {
      yourMove: { san: "c5", why: "The break the whole opening has been waiting for. King safe, pieces out, and d4 is now under real pressure." },
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 Bb7 O-O Nbd7 Qe2 c5")]: {
      replies: [
        { san: "Rfd1", verdict: "good", answer: "Ne4", howToAnswer: "...Ne4 — trade on e7 and jump in. If Nxe4 dxe4 Bxe4, recapture with the bishop: ...Bxe4.", why: "Rooks to the centre; you answer with the knight jump." },
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 Nxd5 Bxd5 — your bishop is centralised and d4 is still a target.", why: "Simplifying." },
        { san: "dxc5", verdict: "good", answer: "Nxc5", howToAnswer: "...Nxc5 — the knight hits the bishop on d3 and you have the freer game.", why: "Releases the tension in your favour." },
        { san: "Bxf6", verdict: "dubious", answer: "Bxf6", howToAnswer: "...Bxf6 — two bishops and a good structure.", why: "Gives up the bishop." },
      ],
    },

    // --- 4.cxd5: the Exchange -------------------------------------------------
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5")]: {
      yourMove: { san: "exd5", why: "Recapture with the pawn. It keeps d5 held and opens the c8-bishop's diagonal, which you will use at once." },
      mistakes: [
        { san: "Nxd5", why: "e4 Nxc3 bxc3 and White has the whole centre for free. Keep a pawn on d5." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5")]: {
      replies: [
        { san: "Bg5", verdict: "good", answer: "c6", howToAnswer: "...c6 — cover d5 and b7, then ...Bf5.", why: "The main line." },
        { san: "Nf3", verdict: "good", answer: "c6", howToAnswer: "...c6, then ...Bf5 and ...Nbd7.", why: "Normal." },
        { san: "Bf4", verdict: "good", answer: "c6", howToAnswer: "...c6, ...Bf5, ...Bd6 — challenge the bishop.", why: "The bishop eyes c7." },
        { san: "e3", verdict: "good", answer: "c6", howToAnswer: "...c6 and ...Bd6 — White's bishop is behind e3.", why: "Solid but passive." },
        { san: "Qc2", verdict: "good", answer: "c6", howToAnswer: "...c6, then ...Be7 — the queen covers f5, so the bishop waits.", why: "Stops ...Bf5 for now." },
        { san: "Qb3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — both pawns covered. Develop.", why: "Early queen." },
        { san: "g3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 and ...Bf5.", why: "A fianchetto that does not fit the structure." },
        { san: "h3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 and ...Bf5.", why: "Slow." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5")]: {
      yourMove: { san: "c6", why: "One pawn covers d5 and b7 at once, so Qb3 has nothing to bite on and ...Bf5 becomes safe." },
      mistakes: [
        { san: "Bf5", why: "Qb3 hits b7 and d5 in one move and you are on the back foot. ...c6 first, then the bishop." },
      ],
      note: "...Nbd7 also works here and sets the same Elephant Trap: Nxd5 Nxd5 Bxd8 Bb4+ wins a piece.",
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5 — the bishop gets out before the door shuts.", why: "The main line." },
        { san: "Qc2", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — the queen covers f5, so develop the other bishop and castle.", why: "The most accurate: it stops ...Bf5." },
        { san: "Nf3", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5, then ...Nbd7 and ...Be7.", why: "Normal." },
        { san: "Qb3", verdict: "dubious", answer: "Qb6", howToAnswer: "...Qb6 — offer the trade; Qxb6 axb6 and your a-pawn has become a healthy b-pawn.", why: "The queen hits b7 and d5, both already covered." },
        { san: "g3", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 and ...Nbd7.", why: "Slow." },
        { san: "Rc1", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5.", why: "Slow." },
        { san: "Qd2", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 and ...Nbd7.", why: "Passive." },
        { san: "f3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle — with e4 coming, keep the bishop home for now.", why: "Prepares e4 slowly and weakens the king." },
        { san: "e4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — a pawn. After Nxe4 Nxe4 the knight on c3 is gone and your bishop comes out.", why: "A gambit with little behind it." },
        { san: "Bxf6", verdict: "dubious", answer: "Qxf6", howToAnswer: "...Qxf6 — the bishop pair and a free game.", why: "Gives up the bishop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3")]: {
      yourMove: { san: "Bf5", why: "The whole point of the Exchange for you. The bishop is outside the pawn chain and offers to trade off White's best piece." },
      mistakes: [
        { san: "Be7", why: "Bd3 next and your light bishop is shut in for the game. It comes out first." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Bxd3", howToAnswer: "...Bxd3 Qxd3 Nbd7 — trade, then develop.", why: "The main line. White offers the trade." },
        { san: "Nf3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Be7 and castle.", why: "Normal." },
        { san: "Nge2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — the knight on e2 is heading for g3 to hit your bishop; ...Bg6 when it arrives.", why: "A common way to challenge the f5-bishop." },
        { san: "Qf3", verdict: "dubious", answer: "Bg6", howToAnswer: "...Bg6 — keep the bishop; Bxf6 Qxf6 Qxf6 gxf6 is fine for you.", why: "An early queen aimed at the bishop." },
        { san: "Qb3", verdict: "dubious", answer: "Qb6", howToAnswer: "...Qb6 — offer the trade.", why: "The queen hits b7 and d5, both covered." },
        { san: "g4", verdict: "dubious", answer: "Bg6", howToAnswer: "...Bg6 — the bishop is fine on g6 and White's king is looser.", why: "Chases the bishop at the cost of the kingside." },
        { san: "Bxf6", verdict: "dubious", answer: "Qxf6", howToAnswer: "...Qxf6 — two bishops.", why: "Gives up the bishop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3")]: {
      yourMove: { san: "Bxd3", why: "Trade. White's light bishop was the piece that would have pressed on h7 and supported b4-b5; now it is gone." },
      mistakes: [
        { san: "Bg6", why: "Keeps the bishop, but Bxg6 hxg6 leaves you a worse structure and White's bishop gone anyway. Take first." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3")]: {
      replies: [
        { san: "Qxd3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — develop; ...Be7 and castle next.", why: "The only sensible recapture." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3 Qxd3")]: {
      yourMove: { san: "Nbd7", why: "Develop behind the pawn. The knight supports f6 and can later reach e4 or b6." },
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3 Qxd3 Nbd7")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "The main line." },
        { san: "Nge2", verdict: "good", answer: "Be7", howToAnswer: "...Be7, castle, and watch for f3 and e4.", why: "Aims the knight at g3 or f4." },
        { san: "f3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, castle, then ...Re8 to meet e4.", why: "Prepares e4 and weakens the king." },
        { san: "Bxf6", verdict: "dubious", answer: "Nxf6", howToAnswer: "...Nxf6 — keep the dark bishop for ...Bd6.", why: "Gives up the bishop." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3 Qxd3 Nbd7 Nf3")]: {
      yourMove: { san: "Be7", why: "Develop and prepare to castle. The bishop also breaks the pin on f6 for good." },
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3 Qxd3 Nbd7 Nf3 Be7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — both kings safe; now ...Re8 and ...a5.", why: "Normal." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3 Qxd3 Nbd7 Nf3 Be7 O-O")]: {
      yourMove: { san: "O-O", why: "Development is done. The middlegame is about White's b4-b5 push and your ...Ne4." },
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3 Qxd3 Nbd7 Nf3 Be7 O-O O-O")]: {
      replies: [
        { san: "Rab1", verdict: "good", answer: "a5", howToAnswer: "...a5 — slow down b4. The minority attack is coming and this is the brake.", why: "The minority attack begins: Rab1, b4, b5." },
        { san: "b4", verdict: "good", answer: "a6", howToAnswer: "...a6 — meet b5 with ...axb5 and keep the c6-pawn covered. ...Ne4 next.", why: "The minority attack in one move." },
        { san: "h3", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8 — the rook belongs on the e-file; ...Ne4 next.", why: "Slow." },
        { san: "Bxf6", verdict: "dubious", answer: "Bxf6", howToAnswer: "...Bxf6 — the bishop pair; then ...Re8 and ...Qd6.", why: "Gives up the bishop." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 Nxe4 Nxe4 Qxe4 Bxg5 — a pawn and a bishop for a knight.", why: "The e4 break is not prepared: too much hangs after the trades." },
        { san: "Ne5", verdict: "dubious", answer: "Nxe5", howToAnswer: "...Nxe5 dxe5 Ne4 — trade and jump into the hole.", why: "The knight can be traded at once." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 Qc2")]: {
      yourMove: { san: "Be7", why: "The queen covers f5, so the light bishop waits. Develop the other one and castle." },
      mistakes: [
        { san: "Bf5", why: "Qxf5. The queen went to c2 for exactly this." },
      ],
    },
    [P("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 Qc2 Be7")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, castle, then ...Re8 and ...Nf8 to cover h7.", why: "Normal." },
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Nbd7 and ...Re8.", why: "Normal." },
      ],
    },

    // --- 3.g3: the Catalan ------------------------------------------------------
    [P("d4 d5 c4 e6 g3")]: {
      yourMove: { san: "Nf6", why: "Develop. The Catalan bishop will stare at d5, so keep it well held for now and take on c4 once you have castled." },
    },
    [P("d4 d5 c4 e6 g3 Nf6")]: {
      replies: [
        { san: "Bg2", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — develop and prepare to castle.", why: "The Catalan bishop." },
        { san: "Nf3", verdict: "good", answer: "Be7", howToAnswer: "...Be7, then castle and ...dxc4.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Normal." },
        { san: "cxd5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 — then ...c6 and ...Bf5; the bishop on g2 stares at a solid pawn.", why: "An Exchange structure where White's bishop points at a wall." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2")]: {
      yourMove: { san: "Be7", why: "Develop toward castling. ...dxc4 waits until the king is safe, when it costs White a queen move." },
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O — then ...dxc4.", why: "The main line." },
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...dxc4.", why: "Normal." },
        { san: "Qc2", verdict: "good", answer: "O-O", howToAnswer: "...O-O — the queen is already committed; ...dxc4 and ...c5 next.", why: "Guards c4 in advance." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — block and develop; castle next.", why: "An early check that gains nothing." },
        { san: "cxd5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5, then ...c6 and castle.", why: "Trades into a structure where the g2-bishop is blocked." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...h6.", why: "The pin has no bite." },
        { san: "e3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...c5.", why: "Passive." },
        { san: "Nd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...c5.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3")]: {
      yourMove: { san: "O-O", why: "King safe first. Now ...dxc4 can be played without any tricks on the e-file." },
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 — take. White must spend a queen move to recover it.", why: "The main line." },
        { san: "Qc2", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 Qxc4 a6 — then ...b5 and ...Bb7.", why: "Guards c4 in advance; you take anyway." },
        { san: "Nc3", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4, then ...Nc6 or ...c5 — hold the pawn a while.", why: "Normal." },
        { san: "Nbd2", verdict: "dubious", answer: "b6", howToAnswer: "...b6 and ...Bb7 — the knight on d2 will recapture on c4 slowly.", why: "Passive." },
        { san: "cxd5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5, then ...c6.", why: "Blocks the g2-bishop with a pawn." },
        { san: "Qb3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — cover both pawns; ...b6 and ...Ba6 later.", why: "Early queen." },
        { san: "b3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4.", why: "Slow." },
        { san: "e3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O")]: {
      yourMove: { san: "dxc4", why: "Take with the king already safe. White has no piece that can recapture, so the queen must come out to do it." },
      mistakes: [
        { san: "c5", why: "dxc5 and the queen trade that follows favours White. Take on c4 first and keep the c-pawn for later." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4")]: {
      replies: [
        { san: "Qc2", verdict: "good", answer: "a6", howToAnswer: "...a6 — prepare ...b5. Not ...b5 yet.", why: "The main line." },
        { san: "Qa4", verdict: "good", answer: "a6", howToAnswer: "...a6, then ...b5 after Qxc4.", why: "Same idea from the other side." },
        { san: "Ne5", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — if Bxc6 bxc6 Nxc6 Qe8 Nxe7+ Qxe7 the material is level and your pieces are active.", why: "The sharp try: the knight hits c4 and c6." },
        { san: "Nbd2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 while the knight takes its time.", why: "Slow." },
        { san: "Na3", verdict: "dubious", answer: "Bxa3", howToAnswer: "...Bxa3 bxa3 Nbd7 — take the knight and leave White doubled pawns.", why: "The knight goes to the edge to recover the pawn." },
        { san: "Nc3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop and keep the pawn a little longer.", why: "Does not threaten c4." },
        { san: "e3", verdict: "dubious", answer: "b5", howToAnswer: "...b5 — the pawn is held for now since the queen is not coming to c4.", why: "Slow." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2")]: {
      yourMove: { san: "a6", why: "Prepare ...b5. With a6 in place the b5-pawn is safe and the queen gets hit a second time." },
      mistakes: [
        { san: "b5", why: "a4! c6 axb5 cxb5 Ng5 and the long diagonal opens onto your rook: Bxa8 is coming. ...a6 first." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6")]: {
      replies: [
        { san: "Qxc4", verdict: "good", answer: "b5", howToAnswer: "...b5 — hit the queen and prepare ...Bb7.", why: "The main line." },
        { san: "a4", verdict: "good", answer: "Bd7", howToAnswer: "...Bd7, then ...Bc6 to trade the Catalan bishop.", why: "Stops ...b5 for good." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4")]: {
      yourMove: { san: "b5", why: "Kick the queen and claim the queenside. ...Bb7 next meets the Catalan bishop head on." },
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5")]: {
      replies: [
        { san: "Qc2", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — the bishops face each other.", why: "The main retreat." },
        { san: "Qd3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, then ...Nbd7 and ...c5.", why: "Equally common." },
        { san: "Qb3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 and ...Nbd7.", why: "Fine." },
        { san: "Qc6", verdict: "dubious", answer: "Ra7", howToAnswer: "...Ra7 — step off the diagonal. ...Bb7 next kicks the queen. Do NOT play ...Bb7 or ...Bd7 first: the rook on a8 is attacked.", why: "The queen invades and hits a8. One accurate move sends it home." },
        { san: "Qxb5", verdict: "bad", answer: "axb5", howToAnswer: "...axb5 — the queen for a pawn.", why: "The b5-pawn is guarded by a6." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5 Qc2")]: {
      yourMove: { san: "Bb7", why: "The bishop meets the Catalan bishop on the long diagonal. Your queenside pawns have gained space and White's queen has moved three times." },
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5 Qc2 Bb7")]: {
      replies: [
        { san: "Bd2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — develop. If Ba5, ...Rc8 first: ...c5 with the bishop on a5 loses the queen.", why: "The main line. The bishop is heading for a5." },
        { san: "Bg5", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...c5.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...c5.", why: "Normal." },
        { san: "Rd1", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 and ...c5.", why: "Normal." },
        { san: "Bf4", verdict: "dubious", answer: "Nd5", howToAnswer: "...Nd5 — block the bishop's path to c7 and hit it.", why: "The bishop eyes c7, so ...Nbd7 would drop the pawn." },
        { san: "Ne5", verdict: "dubious", answer: "Bxg2", howToAnswer: "...Bxg2 Kxg2 Qxd4 — trade bishops and pick up the d-pawn.", why: "The knight jump leaves d4 loose." },
        { san: "Nbd2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 and ...c5.", why: "Normal." },
      ],
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5 Qc2 Bb7 Bd2")]: {
      yourMove: { san: "Nbd7", why: "Develop the last piece. ...c5 is coming, but only once the a5-bishop idea has been dealt with." },
    },
    [P("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5 Qc2 Bb7 Bd2 Nbd7")]: {
      replies: [
        { san: "Ba5", verdict: "good", answer: "Rc8", howToAnswer: "...Rc8 — guard c7. Do NOT play ...c5 while the bishop sits on a5: it opens the diagonal to your queen on d8.", why: "The point of Bd2: the bishop pins c7 to the queen." },
        { san: "Nc3", verdict: "good", answer: "c5", howToAnswer: "...c5 — the break.", why: "Normal." },
        { san: "Rc1", verdict: "good", answer: "c5", howToAnswer: "...c5.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — the bishop has moved twice for nothing.", why: "Slow." },
        { san: "a4", verdict: "dubious", answer: "b4", howToAnswer: "...b4 — keep the pawns together; ...c5 next.", why: "Probes the queenside." },
      ],
    },
  },

  traps: [
    {
      name: "The Elephant Trap",
      sans: sans("1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Nbd7 5.cxd5 exd5 6.Nxd5 Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8"),
      punisher: "black",
      tell: "You have played ...Nbd7 and White sees a pinned knight and a pawn on d5 that looks defended one time too few.",
      why: "Nxd5 wins a pawn only if you recapture and lose the queen. You do recapture, and after Bxd8 the check on b4 wins White's queen back with interest: when the dust settles you are a knight up. It works because the d7-knight recaptures on d5 and the check comes with tempo.",
    },
    {
      name: "The d5-pawn is guarded by the queen",
      sans: sans("1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7 5.e3 O-O 6.Nf3 h6 7.Bxf6 Bxf6 8.cxd5 exd5 9.Nxd5 Qxd5"),
      punisher: "black",
      tell: "White trades the bishop on f6, trades on d5, and sees a pawn with no knight in front of it.",
      why: "With the f6-knight gone the pawn looks loose, but your queen on d8 sees straight down the file. Nxd5 loses a knight for a pawn, because nothing White has covers d5.",
    },
    {
      name: "Keeping the Catalan pawn",
      sans: sans("1.d4 d5 2.c4 e6 3.g3 Nf6 4.Bg2 Be7 5.Nf3 O-O 6.O-O dxc4 7.Qc2 b5 8.a4 c6 9.axb5 cxb5 10.Ng5"),
      punisher: "white",
      tell: "You have taken on c4 and want to hold it with ...b5 before ...a6 is in.",
      why: "a4 attacks b5, ...c6 holds it, and after axb5 cxb5 the long diagonal from g2 to a8 has nothing on it but the f3-knight. Ng5 moves the knight with a threat and Bxa8 follows: you lose the rook for a knight. Play ...a6 first and take on c4 as a loan, not a keepsake.",
    },
  ],

  modelGames: [
    {
      label: "Classical main line: the Tartakower",
      sans: sans("d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Bd3 Bb7 O-O Nbd7 Qe2 c5"),
      summary: "The whole plan in ten moves: hold d5, castle, ask the bishop, get your own bishop to b7, and break with ...c5 once every piece is out.",
    },
    {
      label: "Exchange: bishop out, then hold",
      sans: sans("d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 c6 e3 Bf5 Bd3 Bxd3 Qxd3 Nbd7 Nf3 Be7 O-O O-O"),
      summary: "White trades on d5 and you get the light bishop to f5 before it can be shut in. After the trade the position is solid and the fight is about White's slow b4-b5.",
    },
    {
      label: "Catalan: take with tempo, expand with ...b5",
      sans: sans("d4 d5 c4 e6 g3 Nf6 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5 Qc2 Bb7 Bd2 Nbd7"),
      summary: "Against the fianchetto you castle, take on c4, and make the queen come and fetch the pawn. ...a6 and ...b5 gain space, and your bishop meets theirs on the long diagonal.",
    },
  ],

  middlegamePlan:
    "Finish development before you do anything ambitious: ...Be7, ...O-O, ...h6, ...b6, ...Bb7, ...Nbd7, then ...c5. Rooks go to c8 and d8. " +
    "Your two freeing ideas are ...c5 against the d4-pawn and ...Ne4 to trade a knight for the bishop on h4; use whichever White's setup allows. " +
    "In the Exchange structure White plays for b4-b5 to leave you a weak c6-pawn: slow it with ...a5 or ...a6, keep your pieces in the centre, and look for ...Ne4 yourself. " +
    "Against the Catalan you have gained queenside space with ...b5; support it with ...a6, put the rook on c8, and break with ...c5 only when nothing is pinned along the a5-d8 diagonal.",

  structureDiagram: {
    fen: "rnbq1rk1/p1p1bpp1/1p2pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 8",
    orientation: "black",
    arrows: [
      { from: "c7", to: "c5" },
      { from: "c8", to: "b7" },
    ],
    caption: "The QGD picture: d5 held by two pawns and a knight, the king already castled, ...h6 played so the bishop is on h4, and ...b6 preparing ...Bb7 and the ...c5 break.",
  },
};
