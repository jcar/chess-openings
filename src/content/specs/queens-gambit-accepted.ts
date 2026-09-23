// Queen's Gambit Accepted — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// The pawn on c4 is a loan, not a prize. You take it so that White's d-pawn
// loses its partner, then you hand it back at leisure while your pieces come
// out: ...Nf6, ...e6, ...c5, ...a6, ...b5 and ...Bb7. Every disaster in this
// opening comes from trying to keep the pawn; every good game comes from
// giving it back at the right moment and hitting d4 with ...c5.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const queensGambitAccepted: OpeningSpec = {
  id: "queens-gambit-accepted",
  name: "Queen's Gambit Accepted",
  aliases: ["QGA"],
  eco: "D20–D29",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 d5 2.c4 dxc4",
  tabiyaFen: "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  pitch:
    "Take the pawn on move two, give it back later, and get a free, open game where your pieces come out faster than White's. " +
    "There is no cramped bishop and no wall to defend: you hit d4 with ...c5, expand with ...a6 and ...b5, and the only thing you have to remember is not to be greedy.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6"], why: "The king's knight comes first. It covers d5 and e4 and it is the piece that makes ...e6 and ...c5 safe." },
      { piece: "N", squares: ["d7", "c6"], why: "The queen's knight. On d7 it supports ...c5 and can jump to b6 to hit the bishop; on c6 it leans on d4 directly when the c-pawn has already been traded." },
      { piece: "B", squares: ["d6", "e7"], why: "The dark bishop. Modest on e7, more ambitious on d6 where it eyes h2 once the centre opens." },
      { piece: "B", squares: ["b7"], why: "The light bishop. After ...b5 it lands on b7 and looks down the long diagonal at e4 and g2. This is the piece that makes the QGA feel easy." },
      { piece: "Q", squares: ["c7", "e7"], why: "The queen leaves the d-file before it opens. From c7 it backs the c-file and watches h2." },
    ],
    pawns: ["e6", "c5", "a6"],
    order: [
      {
        before: "a6",
        after: "b5",
        why: "...a6 first, then ...b5. A pawn on b5 with nothing on a6 is a target: a4 hits it, the c-pawn cannot hold it, and the whole queenside comes apart while you have developed nothing.",
      },
    ],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "qga-loan",
      title: "The pawn is a loan",
      oneLiner: "You took c4 to deflect the d-pawn's partner, not to keep it. Give it back and develop.",
      why: "White will always get the pawn back with e3 and Bxc4, and every move you spend trying to stop that is a move you did not spend on a piece. The point of taking is that White's centre is now d4 alone, so ...c5 hits it hard and ...Nc6 or ...Nd7 pile on. Play as if you never won the pawn.",
    },
    {
      id: "qga-c5",
      title: "Hit d4 with ...c5",
      oneLiner: "Once the bishop has taken on c4, ...c5 is the move. Everything else is preparation.",
      why: "After Bxc4 White's centre is a single pawn on d4. ...c5 attacks it, opens the c-file for your queen and rook, and gives your dark bishop the c5 or d6 square. If White trades on c5 you recapture with the bishop and have a free game; if White holds the tension, ...a6 and ...b5 gain space while d4 stays under pressure.",
      trigger: { kind: "epd", epds: [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4"), P("d4 d5 c4 dxc4 e3 Nf6 Bxc4 e6 Nf3")] },
      response: "...c5.",
    },
    {
      id: "qga-a6-b5",
      title: "...a6, then ...b5 and ...Bb7",
      oneLiner: "Gain space on the queenside and kick the bishop off c4. Always ...a6 first.",
      why: "The bishop on c4 is White's best piece: it looks at e6 and f7. ...b5 chases it away and prepares ...Bb7, which turns your worst piece into your best. But ...b5 needs ...a6 behind it, or a4 breaks the pawn chain and the b5-pawn simply falls.",
      trigger: { kind: "epd", epds: [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O")] },
      response: "...a6, then ...b5 and ...Bb7.",
      ifIgnored: "White gets a4 in first and your queenside pawns never move as a unit.",
    },
    {
      id: "qga-vs-e4",
      title: "Against 3.e4: hit back with ...e5",
      oneLiner: "When White grabs the whole centre, strike at once. ...e5, ...exd4, then pieces to c6 and e6.",
      why: "3.e4 is the greedy version of the gambit: two pawns in the centre before a single piece is out. Do not sit back. ...e5 forces the question, ...exd4 leaves White a pawn to recover, and ...Nc6 and ...Be6 develop with threats. Watch for the bishop on c4: when it is attacked, White has to move it or lose it, and several natural White moves forget.",
      trigger: { kind: "opponent_san", sans: ["e4"] },
      response: "...e5, then ...exd4 and ...Nc6.",
    },
    {
      id: "qga-no-b5-grab",
      title: "Never ...b5 to hold the pawn",
      oneLiner: "...b5 before your pieces are out loses the queenside, not just the pawn.",
      why: "The tempting idea after 2...dxc4 is ...b5 to keep the pawn. It fails to a4: after ...c6 axb5 cxb5 the pawns are loose and Qf3 or b3 picks off a rook or a pawn while you have nothing developed. If you want the pawn to matter, make White spend moves recovering it. Do not try to keep it.",
      trigger: { kind: "opponent_san", sans: ["a4"] },
      response: "If you have played ...b5 without ...a6, get the pieces out and accept the pawn is gone.",
    },
    {
      id: "qga-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, trade ...cxd4 when it opens lines for you, and play against White's lone d-pawn.",
      why: "Your pieces are the plan: knights on f6 and d7, bishops on d6 and b7, queen on c7, rooks on c8 and d8. Trade on d4 when it opens the long diagonal or the c-file, keep an eye on e5 pushes that kick your knight, and remember that ...c4 usually helps White by closing the centre.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — meet the centre pawn with a centre pawn. ...dxc4 when c4 arrives.", why: "The main move and the one this opening is built for." },
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — the open games. Same attitude: take the centre and get the pieces out fast.", why: "Not a Queen's Gambit, but the QGA habits of quick development carry over." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...Nf6. If c4 comes, take it.", why: "Flexible. It usually becomes a d4 game a move later." },
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...d5. If d4 follows you take on c4 as usual.", why: "The English. Your structure works unchanged." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...Nf6, ...c5 — take the centre they have not claimed.", why: "Quiet." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5. If e4 follows, ...dxe4 or ...d4.", why: "The knight blocks the c-pawn, so there is no gambit coming." },
        { san: "b3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...e6 and ...c5 — a normal centre.", why: "Larsen's Opening ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bg4 or ...Bf5 — their king is already a little loose.", why: "Bird's Opening." },
      ],
    },
    [P("d4")]: { yourMove: { san: "d5", why: "Claim your half of the centre. When c4 comes you will take it." } },
    [P("d4 d5")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 — accept. White's d-pawn loses its partner and you develop while they win the pawn back.", why: "The Queen's Gambit, and the start of your opening." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6. If c4 follows, ...dxc4 and you are in your lines.", why: "Flexible; c4 usually comes next." },
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6, ...c5 and ...Bd6 to challenge the bishop.", why: "The London System. Solid, and it gives you no trouble." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...Bf5 or ...Bg4 while their bishop is stuck behind e3.", why: "It locks in White's own bishop." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. If Bg5, ...Nbd7 or ...Ne4; if e4, ...dxe4.", why: "The knight blocks the c-pawn." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 — take. After Nc3 Nf6 f3, take again and develop; do not grab more than that.", why: "The Blackmar-Diemer Gambit gives up a pawn for open lines. Take it and stay calm." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bf5, ...e6 — normal development.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. If Bxf6 exf6 you have two bishops and an open file.", why: "An odd early bishop move with no target." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...c6 or ...e6, ...Bf5 — the bishop can come out since nobody is hitting d5.", why: "A quiet fianchetto." },
      ],
    },
    [P("d4 d5 c4")]: {
      yourMove: { san: "dxc4", why: "Accept. White's centre is now a lone d-pawn, and every move White spends recovering c4 is a move you spend on a piece." },
      mistakes: [
        { san: "Nf6", why: "cxd5 Nxd5 and e4 kicks the knight: White gets the whole centre for nothing. Decide about d5 first." },
        { san: "Bf5", why: "cxd5 Qxd5 Nc3 and your queen is chased around while b7 hangs to Qb3. The bishop comes out later, from b7." },
      ],
    },
    [P("d4 d5 c4 dxc4")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — develop. e3 and Bxc4 will follow, and then ...c5.", why: "The main line. White stops ...e5 and prepares to take the pawn back calmly." },
        { san: "e3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...c5 — it becomes the main line by another route. Do NOT play ...b5 here.", why: "The direct way to regain the pawn. It is also where the ...b5 trap lives." },
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — hit back at once. ...exd4 next and pieces to c6 and e6.", why: "The Central Variation. Ambitious: White grabs both centre squares before developing anything." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...c5. If e4 comes, ...e5.", why: "Natural development. Nc3 usually means e4 is on White's mind." },
        { san: "Qa4+", verdict: "dubious", answer: "Nd7", howToAnswer: "...Nd7 — block with a piece that wants to develop. After Qxc4, ...e5 hits the centre.", why: "It wins the pawn back at once but puts the queen where your pieces can kick it." },
        { san: "g3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...c6 — hold the pawn for a while and make White work for it.", why: "Slow. The bishop on g2 does not help regain c4." },
        { san: "Bf4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...c5 — develop as usual.", why: "The bishop comes out but c4 is still waiting." },
        { san: "Qc2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. After Qxc4, ...Bf5 develops with a hit on the queen's diagonal.", why: "An early queen." },
        { san: "Nd2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...c5 — normal moves. The knight on d2 blocks their bishop.", why: "Passive." },
        { san: "b3", verdict: "bad", answer: "cxb3", howToAnswer: "...cxb3 axb3 Nf6 — you have traded a wing pawn for a pawn from their centre and they have a hole on a2.", why: "Gives back nothing and loosens White's own queenside." },
      ],
    },

    // --- 3.Nf3: the main line -------------------------------------------------
    [P("d4 d5 c4 dxc4 Nf3")]: {
      yourMove: { san: "Nf6", why: "Develop the king's knight. It covers d5 and e4 and gets you closer to castling." },
      mistakes: [
        { san: "b5", why: "Trying to keep the pawn. a4 c6 axb5 cxb5 b3 and the pawns come off while you have nothing developed. The c4-pawn was never yours." },
        { san: "e5", why: "Nxe5 and White simply has the pawn back with a knight in the centre." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "e6", howToAnswer: "...e6 — open the bishop. Bxc4 c5 follows.", why: "The main line. Quiet and solid; White gets the pawn back next move." },
        { san: "Nc3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...c5 after Bxc4. If e4, ...Bb4 pins the knight and ...Nxe4 is coming.", why: "Ambitious: White wants e4 before taking back." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — block and develop. After Qxc4, ...e6 and ...c5.", why: "Regains the pawn but puts the queen in front of the pieces." },
        { san: "e4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — the pawn is free. After Bxc4, ...Nd6 hits the bishop and you are a pawn up with a solid position.", why: "It looks like the Central Variation but the knight on f6 is already there to take." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...c5 and ...Be7. There is nothing on the pin.", why: "A pin with no knight on c3 behind it." },
        { san: "Nbd2", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...c5 — the knight will take on c4 and your ...c5 break is ready.", why: "It regains the pawn with a knight instead of the bishop, which is slower." },
        { san: "g3", verdict: "good", answer: "c5", howToAnswer: "...c5, then ...Nc6 — hit d4 while the c4-pawn is still yours.", why: "A Catalan setup. Take the chance to attack d4 straight away." },
        { san: "Qc2", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...c5 after Qxc4.", why: "Early queen." },
        { san: "Bf4", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...c5 and ...Nc6 — develop.", why: "The bishop is out but c4 is still gone." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3")]: {
      yourMove: { san: "e6", why: "Free the bishop and prepare ...c5. Let White have the pawn back; you get your pieces out." },
      mistakes: [
        { san: "b5", why: "a4! c6 axb5 cxb5 b3 and your queenside pawns dissolve while you have developed nothing. The pawn is not worth it." },
        { san: "Bg4", why: "Bxc4 e6 Qb3 and b7 becomes a problem. Bring this bishop out via b7, not g4." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6")]: {
      replies: [
        { san: "Bxc4", verdict: "good", answer: "c5", howToAnswer: "...c5 — the thematic break. d4 is White's whole centre.", why: "The main line. White has the pawn back and you have the freeing move." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then after Bxc4, ...c5 as usual.", why: "The queen check gains nothing." },
        { san: "Nc3", verdict: "good", answer: "c5", howToAnswer: "...c5, then ...a6 after Bxc4.", why: "Natural." },
        { san: "Nbd2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 while the knight is still on the way to c4.", why: "Slower than Bxc4." },
        { san: "Bd2", verdict: "dubious", answer: "c5", howToAnswer: "...c5, then ...Nc6.", why: "Passive." },
        { san: "Qc2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit the centre; the queen recaptures on c4 a move later than the bishop would have.", why: "Early queen." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4")]: {
      yourMove: { san: "c5", why: "The break the whole opening is about. White's centre is one pawn; hit it now, before White gets e4 in." },
      mistakes: [
        { san: "b5", why: "Bd3 or Bb3 and a4 is coming. Without ...a6 the b5-pawn is a target, not a gain. ...c5 and ...a6 first." },
        { san: "Bb4+", why: "Bd2 and the check has achieved nothing: your good bishop is traded or sent back." },
        { san: "Nc6", why: "It blocks the c-pawn your whole plan depends on. ...c5 first, the knight afterwards." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "a6", howToAnswer: "...a6 — prepare ...b5 to kick the bishop.", why: "The main line. White castles and keeps the tension." },
        { san: "Nc3", verdict: "good", answer: "a6", howToAnswer: "...a6, then ...b5 and ...Bb7.", why: "Normal development." },
        { san: "Qe2", verdict: "good", answer: "a6", howToAnswer: "...a6 — the plan does not change. If dxc5, ...Bxc5 and castle.", why: "Prepares Rd1 and dxc5 ideas." },
        { san: "dxc5", verdict: "dubious", answer: "Qxd1+", howToAnswer: "...Qxd1+ Kxd1 Bxc5 — queens off and White's king has lost castling.", why: "Releases all the tension for a queen trade that costs White castling." },
        { san: "a4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit d4. ...b5 is stopped, so develop instead.", why: "It stops ...b5 but spends a move on the edge." },
        { san: "Ne5", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — challenge the knight; if Nxd7, ...Bxd7 and you are fine.", why: "Premature: the knight can be asked to leave." },
        { san: "Nbd2", verdict: "dubious", answer: "a6", howToAnswer: "...a6, then ...b5 and ...Bb7 as usual.", why: "Passive." },
        { san: "Qb3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — b7 is defended by the c8-bishop. Develop.", why: "An early queen aimed at nothing loose." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O")]: {
      yourMove: { san: "a6", why: "Prepare ...b5. The pawn needs a6 behind it or a4 will break it up." },
      mistakes: [
        { san: "b5", why: "Be2 or Bd3 and a4 next: the b5-pawn is loose without ...a6 and White wins time chasing it." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6")]: {
      replies: [
        { san: "Qe2", verdict: "good", answer: "b5", howToAnswer: "...b5 — kick the bishop and prepare ...Bb7.", why: "The main line. Qe2 prepares Rd1 and keeps an eye on b5." },
        { san: "a4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — develop and hit d4. ...cxd4 and ...Be7 follow.", why: "Stops ...b5 for good. Fine, but it costs a move." },
        { san: "Nc3", verdict: "good", answer: "b5", howToAnswer: "...b5, then ...Bb7.", why: "Normal." },
        { san: "dxc5", verdict: "dubious", answer: "Qxd1", howToAnswer: "...Qxd1 Rxd1 Bxc5 — an equal endgame with your pieces active.", why: "Trades the tension away." },
        { san: "Bb3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit d4; ...cxd4 and ...Be7 next.", why: "The bishop retreats before it is asked." },
        { san: "Bd3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...cxd4 and ...Be7.", why: "Same idea, slightly more passive." },
        { san: "b3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 exd4 Be7 — open the position for your pieces.", why: "Slow." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2")]: {
      yourMove: { san: "b5", why: "Chase the bishop and gain space. ...Bb7 next puts your worst piece on its best square." },
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5")]: {
      replies: [
        { san: "Bb3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — the long diagonal is yours.", why: "The main retreat. The bishop watches e6 from b3." },
        { san: "Bd3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, then ...Nbd7 and ...Bd6.", why: "Equally common." },
        { san: "Bd5", verdict: "bad", answer: "exd5", howToAnswer: "...exd5 — the bishop walked into your pawn. A piece for nothing.", why: "The bishop is attacked by the e6-pawn. It just loses." },
        { san: "Rd1", verdict: "bad", answer: "bxc4", howToAnswer: "...bxc4 — the bishop was attacked. Free piece.", why: "White forgot the bishop on c4." },
        { san: "Nc3", verdict: "bad", answer: "bxc4", howToAnswer: "...bxc4 — take the bishop.", why: "Developing while a piece hangs." },
        { san: "dxc5", verdict: "bad", answer: "bxc4", howToAnswer: "...bxc4 Qxc4 Bxc5 — you have won a bishop for a pawn.", why: "The bishop is still on c4 and still attacked." },
        { san: "a4", verdict: "bad", answer: "bxc4", howToAnswer: "...bxc4 Qxc4 — a bishop for a pawn.", why: "Hitting the pawn does not save the bishop." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5 Bb3")]: {
      yourMove: { san: "Bb7", why: "The bishop that was stuck behind e6 finds the long diagonal. It looks at e4, f3 and, later, g2." },
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5 Bb3 Bb7")]: {
      replies: [
        { san: "Rd1", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — develop and keep the queen off the d-file.", why: "The main line. The rook eyes your queen down the d-file." },
        { san: "Nc3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Bd6 and castle.", why: "Normal." },
        { san: "a4", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — if axb5 axb5, the a-file opens for both rooks and your position is fine.", why: "White probes the queenside." },
        { san: "e4", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 Nxd4 Bd6 — trade in the centre and develop with a hit on h2.", why: "White takes the centre; you open lines against it." },
        { san: "dxc5", verdict: "dubious", answer: "Bxc5", howToAnswer: "...Bxc5 — recapture with development.", why: "Releases the tension." },
        { san: "Bd2", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 and ...Bd6.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5 Bb3 Bb7 Rd1")]: {
      yourMove: { san: "Nbd7", why: "Develop the last knight and stay off the d-file. From d7 it supports ...c5 and can go to b6 to hit the bishop." },
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5 Bb3 Bb7 Rd1 Nbd7")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Bd6", howToAnswer: "...Bd6 — develop with a hit on h2, then castle.", why: "The main line." },
        { san: "e4", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 Nxd4 — then ...Bd6 or ...Qb8 with a fine game.", why: "White takes the centre; open it." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 — take. After e4, ...dxe4 and White has given a pawn for little.", why: "A pawn push that loses the pawn." },
        { san: "a4", verdict: "good", answer: "b4", howToAnswer: "...b4 — keep the pawns together and gain a tempo.", why: "White tries to break up the queenside." },
        { san: "dxc5", verdict: "dubious", answer: "Bxc5", howToAnswer: "...Bxc5 — recapture and castle.", why: "Releases the tension." },
        { san: "Nbd2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5 Bb3 Bb7 Rd1 Nbd7 Nc3")]: {
      yourMove: { san: "Bd6", why: "Develop the last piece with a glance at h2. Castling next completes the setup." },
    },
    [P("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5 Bb3 Bb7 Rd1 Nbd7 Nc3 Bd6")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 Nxd4 — open the centre. Do NOT play ...c4 here: it closes the position and hands White e5.", why: "The main test. White claims the centre and you open it." },
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 Nxd5 Nxd5 Bxd5 Bxd5 Rxd5 — a run of trades that leaves you comfortable.", why: "Clears the centre." },
        { san: "dxc5", verdict: "good", answer: "Bxc5", howToAnswer: "...Bxc5 and castle.", why: "Simplifying." },
        { san: "a4", verdict: "dubious", answer: "b4", howToAnswer: "...b4 — kick the knight.", why: "Probing the queenside." },
        { san: "Bd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — castle; your development is done.", why: "Passive." },
      ],
    },

    // --- 3.e4: the Central Variation ------------------------------------------
    [P("d4 d5 c4 dxc4 e4")]: {
      yourMove: { san: "e5", why: "Hit back at once. White has two centre pawns and no pieces; ...exd4 leaves a pawn for them to recover while you develop." },
      mistakes: [
        { san: "Nf6", why: "e5 kicks the knight and White gains space for free." },
        { san: "b5", why: "a4 c6 axb5 cxb5 Nc3 and the b5-pawn is a target while your pieces sit at home." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "exd4", howToAnswer: "...exd4 — take. Bxc4 Nc6 next and you are developing with a pawn in hand.", why: "The main line." },
        { san: "Bxc4", verdict: "good", answer: "exd4", howToAnswer: "...exd4 — then ...Nc6. If Qxd4, ...Qxd4 and nothing recaptures.", why: "Takes back first. Note the queen trick on d4." },
        { san: "dxe5", verdict: "dubious", answer: "Qxd1+", howToAnswer: "...Qxd1+ Kxd1 Nc6 — queens off, White has lost castling, and e5 is a target.", why: "Trades queens at the cost of the king's castling rights." },
        { san: "d5", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...Bc5 — the pawn on d5 is ambitious and loose.", why: "Pushes past and leaves the e5-pawn strong." },
        { san: "Nc3", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4 — and if Qxd4, ...Qxd4 wins the queen: nothing recaptures on d4.", why: "Develops, but the d4-pawn is now attacked and the queen recapture fails." },
        { san: "Be3", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4 Bxd4 Nc6 — hit the bishop and develop.", why: "Defends d4 passively." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3")]: {
      yourMove: { san: "exd4", why: "Take. White must spend time recovering both pawns while your pieces come out." },
      mistakes: [
        { san: "Nc6", why: "d5 kicks the knight and gains space with tempo. Take on d4 first." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4")]: {
      replies: [
        { san: "Bxc4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — defend d4 and develop. ...Be6 next.", why: "The main line." },
        { san: "Nxd4", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — hit the knight and develop. You still have the c4-pawn.", why: "Regains one pawn but lets you develop with tempo." },
        { san: "Qxd4", verdict: "dubious", answer: "Qxd4", howToAnswer: "...Qxd4 Nxd4 — queens off and you keep the extra c4-pawn for now.", why: "A queen trade that leaves you a pawn up." },
        { san: "Bd3", verdict: "bad", answer: "cxd3", howToAnswer: "...cxd3 — your c4-pawn takes the bishop. A piece for a pawn.", why: "The bishop stepped into the c4-pawn's capture." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4")]: {
      yourMove: { san: "Nc6", why: "Defend d4 with development. The knight also stops e5 and eyes b4." },
      mistakes: [
        { san: "Bc5", why: "Bxf7+ Kxf7 Qb3+ and White wins the material back with your king in the open." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Be6", howToAnswer: "...Be6 — offer the bishop trade and take the sting out of the c4-bishop.", why: "The main line." },
        { san: "Nxd4", verdict: "bad", answer: "Nxd4", howToAnswer: "...Nxd4 — a knight for a pawn. Qxd4 loses the queen to ...Qxd4.", why: "The d4-pawn is guarded by your knight and, behind it, your queen." },
        { san: "Qb3", verdict: "good", answer: "Qd7", howToAnswer: "...Qd7 — guard b7 and f7 at once. If Qxb7 Rb8 and ...Nb4 chases the queen.", why: "The most annoying try: it hits b7 and f7." },
        { san: "Bxf7+", verdict: "bad", answer: "Kxf7", howToAnswer: "...Kxf7 — a bishop for a pawn. Your king walks back to g8 in a move or two.", why: "A sacrifice with no follow-up." },
        { san: "Qxd4", verdict: "bad", answer: "Nxd4", howToAnswer: "...Nxd4 Nxd4 — the queen for a knight.", why: "The d4-pawn is defended by your knight." },
        { san: "Nbd2", verdict: "dubious", answer: "Be6", howToAnswer: "...Be6, then ...Bxc4 or ...Bc5.", why: "Slow." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6 O-O")]: {
      yourMove: { san: "Be6", why: "Trade off White's best piece or make it retreat. It also covers d5 and f7." },
      mistakes: [
        { san: "Bg4", why: "The pin does nothing and f7 is left to White's bishop. Be6 asks the question instead." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6 O-O Be6")]: {
      replies: [
        { san: "Bxe6", verdict: "good", answer: "fxe6", howToAnswer: "...fxe6 — the pawn on e6 holds d5 and the f-file opens for your rook.", why: "The main line." },
        { san: "Bb5", verdict: "good", answer: "Bc5", howToAnswer: "...Bc5 — develop and keep d4.", why: "Keeps the bishop with a pin." },
        { san: "Qb3", verdict: "good", answer: "Bxc4", howToAnswer: "...Bxc4 Qxc4 Qd7 — trade and guard b7.", why: "Hits b7 and offers the trade." },
        { san: "Nbd2", verdict: "dubious", answer: "Bxc4", howToAnswer: "...Bxc4 Nxc4 Bc5 — you are developed and a pawn up.", why: "Slow." },
        { san: "Bd3", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — develop; the bishop on d3 blocks their own queen.", why: "Retreats to a square that clogs the d-file." },
        { san: "Ng5", verdict: "bad", answer: "Bxc4", howToAnswer: "...Bxc4 — the bishop was attacked. Free piece.", why: "White attacks your bishop and forgets their own." },
        { san: "Nxd4", verdict: "bad", answer: "Bxc4", howToAnswer: "...Bxc4 — take the bishop; Nxc6 bxc6 and you are a piece up.", why: "The pawn grab ignores the hanging bishop." },
        { san: "Re1", verdict: "bad", answer: "Bxc4", howToAnswer: "...Bxc4 — a free bishop.", why: "A rook move while the bishop hangs." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6 O-O Be6 Bxe6")]: {
      yourMove: { san: "fxe6", why: "Recapture toward the centre. The e6-pawn covers d5, and the f-file is open for your rook after castling." },
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6 O-O Be6 Bxe6 fxe6")]: {
      replies: [
        { san: "Qb3", verdict: "good", answer: "Qd7", howToAnswer: "...Qd7 — guard b7 and e6 with one move.", why: "The main line. The queen hits both loose pawns." },
        { san: "Nbd2", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — develop and hold d4.", why: "Slow." },
        { san: "Qe2", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5, then ...Nf6 and castle.", why: "Prepares Rd1 but does not threaten anything." },
        { san: "Nxd4", verdict: "bad", answer: "Nxd4", howToAnswer: "...Nxd4 — Qxd4 Qxd4 and nothing takes back. A knight for a pawn.", why: "The d4-pawn is guarded by your knight and queen." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6 O-O Be6 Bxe6 fxe6 Qb3")]: {
      yourMove: { san: "Qd7", why: "One move covers both b7 and e6. If Qxb7, ...Rb8 and ...Nb4 chase the queen around while you develop." },
      mistakes: [
        { san: "b6", why: "Qxe6+ — you guarded the wrong pawn." },
        { san: "Rb8", why: "Qxe6+ takes the pawn with check." },
        { san: "Qe7", why: "Qxb7 — a pawn for nothing." },
      ],
    },
    [P("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6 O-O Be6 Bxe6 fxe6 Qb3 Qd7")]: {
      replies: [
        { san: "Qxb7", verdict: "dubious", answer: "Rb8", howToAnswer: "...Rb8 Qa6 Nb4 — the queen is chased and you develop with every move.", why: "Grabs a pawn and spends the next three moves running." },
        { san: "Nbd2", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Bc5 or ...Bd6 and castle.", why: "Normal." },
        { san: "Rd1", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — develop; d4 is still yours.", why: "Pressure on the d-file." },
        { san: "Qxe6+", verdict: "bad", answer: "Qxe6", howToAnswer: "...Qxe6 — your queen was guarding e6. A queen for a pawn.", why: "White forgot who defends e6." },
      ],
    },

    // --- 3.e3: transposes, with one trap --------------------------------------
    [P("d4 d5 c4 dxc4 e3")]: {
      yourMove: { san: "Nf6", why: "Develop. Bxc4 e6 Nf3 c5 and you are in the main line by another road." },
      mistakes: [
        { san: "b5", why: "a4 c6 axb5 cxb5 Qf3 and the rook on a8 has no defender: you lose it, or the knight that steps in front of it. The pawn was never yours." },
      ],
    },
    [P("d4 d5 c4 dxc4 e3 Nf6")]: {
      replies: [
        { san: "Bxc4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...c5.", why: "The pawn comes back and you are in the main line." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6 — Bxc4 c5 next.", why: "Same position as the main line." },
        { san: "Nc3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...c5 after Bxc4.", why: "Normal." },
        { san: "Qa4+", verdict: "dubious", answer: "c6", howToAnswer: "...c6, then ...Bf5 after Qxc4 — the bishop develops with a hit on the queen's diagonal.", why: "Regains the pawn with the queen." },
        { san: "Nd2", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...c5 — Nxc4 is slower than Bxc4.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 dxc4 e3 Nf6 Bxc4")]: {
      yourMove: { san: "e6", why: "Free the bishop. ...c5 comes next." },
      mistakes: [
        { san: "b5", why: "Bd3 or Bb3 and a4 breaks the pawn up. ...a6 first, always." },
      ],
    },
    [P("d4 d5 c4 dxc4 e3 Nf6 Bxc4 e6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "c5", howToAnswer: "...c5 — the main line.", why: "Transposes." },
        { san: "Nc3", verdict: "good", answer: "c5", howToAnswer: "...c5, then ...a6.", why: "Normal." },
        { san: "Qb3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — b7 is covered by your bishop; hit d4.", why: "Early queen." },
        { san: "Qf3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — cover b7 and then ...c5 anyway.", why: "The queen hits b7 with nothing behind it." },
        { san: "Qe2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 and ...a6.", why: "Slow." },
      ],
    },

    // --- 3.Nc3 and 3.Qa4+ -----------------------------------------------------
    [P("d4 d5 c4 dxc4 Nc3")]: {
      yourMove: { san: "Nf6", why: "Develop. Nc3 usually means e4 is coming; your answer will be ...e5." },
    },
    [P("d4 d5 c4 dxc4 Nc3 Nf6")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — hit the centre at once.", why: "The point of Nc3." },
        { san: "e3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...c5 after Bxc4.", why: "Quiet." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6 and ...c5.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...c5 and ...Be7.", why: "The pin has little bite." },
        { san: "Qa4+", verdict: "dubious", answer: "c6", howToAnswer: "...c6, then ...Bf5 after Qxc4.", why: "Regains the pawn with the queen." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nc3 Nf6 e4")]: {
      yourMove: { san: "e5", why: "Strike at d4 before White is developed. ...exd4 next." },
      mistakes: [
        { san: "Nxe4", why: "Nxe4 — the knight on c3 guards e4. This is not the 3.Nf3 line." },
      ],
    },
    [P("d4 d5 c4 dxc4 Nc3 Nf6 e4 e5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "exd4", howToAnswer: "...exd4 — then ...Bc5 or ...Bb4 developing with a hit.", why: "Normal." },
        { san: "Bxc4", verdict: "good", answer: "exd4", howToAnswer: "...exd4 — and if Qxd4, ...Qxd4 wins the queen: nothing recaptures.", why: "Takes back first." },
        { san: "dxe5", verdict: "dubious", answer: "Qxd1+", howToAnswer: "...Qxd1+ Nxd1 Nxe4 — queens off, and the knight that e5 was attacking takes a pawn on the way out. Do NOT leave the knight on f6.", why: "Trades queens, but the e5-pawn now attacks your knight, so the knight must move with a purpose." },
        { san: "Be3", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4 Bxd4 Nc6 — develop with a hit.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 dxc4 Qa4+")]: {
      yourMove: { san: "Nd7", why: "Block with a piece that wants to come out anyway. After Qxc4, ...e5 hits the centre and the knight heads for b6 or f6." },
    },
    [P("d4 d5 c4 dxc4 Qa4+ Nd7")]: {
      replies: [
        { san: "Qxc4", verdict: "good", answer: "e5", howToAnswer: "...e5 — hit d4 while the queen is exposed.", why: "The pawn comes back." },
        { san: "Nf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...c5 as usual.", why: "Delays the recapture." },
      ],
    },
  },

  traps: [
    {
      name: "The pawn you cannot keep",
      sans: sans("1.d4 d5 2.c4 dxc4 3.e3 b5 4.a4 c6 5.axb5 cxb5 6.Qf3"),
      punisher: "white",
      tell: "The urge to hold the c4-pawn with ...b5, then to hold b5 with ...c6.",
      why: "Once the c-pawn moves the long diagonal from f3 to a8 is empty. Qf3 attacks the rook, and anything that blocks on c6 or b7 is taken with the rook to follow. Give the pawn back: ...Nf6, ...e6 and ...c5.",
    },
    {
      name: "The d4-pawn is guarded",
      sans: sans("1.d4 d5 2.c4 dxc4 3.e4 e5 4.Nf3 exd4 5.Bxc4 Nc6 6.Nxd4 Nxd4"),
      punisher: "black",
      tell: "White has taken back on c4 and now wants the other pawn back too.",
      why: "The knight on c6 guards d4, and behind it your queen does as well. Nxd4 loses a knight for a pawn, because Qxd4 runs into ...Qxd4 with nothing to recapture.",
    },
    {
      name: "The forgotten bishop",
      sans: sans("1.d4 d5 2.c4 dxc4 3.e4 e5 4.Nf3 exd4 5.Bxc4 Nc6 6.O-O Be6 7.Nxd4 Bxc4"),
      punisher: "black",
      tell: "Your bishop lands on e6 and White replies with a pawn grab or an attacking move instead of dealing with the attacked bishop.",
      why: "Be6 attacks the bishop on c4. Nxd4, Ng5 and Re1 all ignore that, and Bxc4 simply wins a piece. Before every move here ask what is attacking c4.",
    },
  ],

  modelGames: [
    {
      label: "Main line: give it back, hit d4",
      sans: sans("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 Qe2 b5 Bb3 Bb7 Rd1 Nbd7 Nc3 Bd6"),
      summary: "The whole plan in ten moves: return the pawn, break with ...c5, expand with ...a6 and ...b5, put the bishop on b7 and finish development.",
    },
    {
      label: "Against 3.e4: strike back",
      sans: sans("d4 d5 c4 dxc4 e4 e5 Nf3 exd4 Bxc4 Nc6 O-O Be6 Bxe6 fxe6 Qb3 Qd7"),
      summary: "White grabs the centre and you hit it at once. Every piece develops with a threat, and one queen move covers both loose pawns.",
    },
    {
      label: "Against 7.a4: develop and open the centre",
      sans: sans("d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6 a4 Nc6 Qe2 cxd4 Rd1 Be7 exd4 O-O"),
      summary: "When White stops ...b5, put the knight on c6 instead, trade on d4 and castle. White has an isolated d-pawn to look after.",
    },
  ],

  middlegamePlan:
    "Your pieces are the plan. Knights on f6 and d7, bishops on d6 and b7, queen on c7, rooks on c8 and d8, and the c5-pawn leaning on d4. " +
    "Trade ...cxd4 when it opens the long diagonal or the c-file for you; keep the tension when White's pieces are still tangled. " +
    "White's usual idea is e4 and e5 to kick your knight, so watch that square and be ready with ...cxd4 or ...Nd5. " +
    "Do not play ...c4: it closes the position and gives White e5 for free. And do not go back to guarding pawns you were supposed to give away.",

  structureDiagram: {
    fen: "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7",
    orientation: "black",
    arrows: [
      { from: "c5", to: "d4" },
      { from: "a6", to: "b5" },
    ],
    caption: "The QGA picture: the pawn is back on c4 as a bishop, your c5-pawn leans on d4, and ...b5 is about to chase the bishop and open b7 for your own.",
  },
};
