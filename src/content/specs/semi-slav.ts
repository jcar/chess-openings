// Semi-Slav Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// Two pawns hold d5: ...c6 and ...e6 together. That wall is dull on its own,
// so the whole plan is to turn it into a queenside wave: take on c4 once the
// bishop has committed to d3, hit it with ...b5, put the c8-bishop on b7, and
// free everything with ...c5. Follow the Meran and you follow the plan.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const semiSlav: OpeningSpec = {
  id: "semi-slav",
  name: "Semi-Slav Defence",
  aliases: ["Meran", "Semi Slav"],
  eco: "D43–D49",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6",
  tabiyaFen: "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
  pitch:
    "Hold d5 with two pawns, ...c6 and ...e6, so nothing White does in the centre ever quite works. " +
    "Then the wall turns into a wave: you take on c4, chase the bishop with ...b5, and open your own bishop on b7 while White is still wondering what happened.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6"], why: "The king's knight holds d5 and watches e4. It goes here before anything else." },
      { piece: "N", squares: ["d7"], why: "The queen's knight sits behind the c-pawn, not in front of it. From d7 it supports ...c5 later and never blocks ...c6." },
      { piece: "B", squares: ["b7", "f5"], why: "The light bishop is the problem piece of every ...e6 opening. In the Meran it comes to b7 after ...b5 and looks straight down the long diagonal. In the Exchange line it goes to f5." },
      { piece: "B", squares: ["d6", "e7", "b4"], why: "The dark bishop. d6 aims at the kingside; e7 is solid; b4 pins the c3-knight when White has been slow." },
      { piece: "Q", squares: ["c7", "b6"], why: "The queen leaves the d-file before it opens. On c7 it supports ...c5 and eyes h2." },
    ],
    pawns: ["c6", "e6"],
    order: [
      {
        before: "dxc4",
        after: "b5",
        why: "Take on c4 first, then play ...b5. The other way round the c4-pawn is still on the board: cxb5 cxb5 and Bxb5+ picks up your pawn with check.",
      },
    ],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "semi-slav-wall",
      title: "Two pawns hold d5",
      oneLiner: "...c6 and ...e6 both guard d5. White cannot win the centre by force.",
      why: "The Queen's Gambit is an attack on d5. You answer by defending it twice with pawns, so that cxd5 always has a recapture and e4 never comes for free. The cost is a shut-in bishop on c8, and the rest of the opening is about letting it out.",
    },
    {
      id: "semi-slav-wait-for-bd3",
      title: "Take on c4 once the bishop has moved",
      oneLiner: "Wait for Bd3, then ...dxc4. The bishop moves again and you gain time.",
      why: "If you take before the bishop has moved, Bxc4 develops it in one move. If you wait until it stands on d3, it has to capture on c4 and then run from ...b5, three moves for one piece. Patience here is worth a whole tempo.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["d3"] },
      response: "...dxc4, then ...b5.",
      ifIgnored: "White plays e4 next and the bishop on d3 never has to move again.",
    },
    {
      id: "semi-slav-b5",
      title: "The ...b5 wave",
      oneLiner: "After Bxc4, ...b5 hits the bishop and claims the queenside.",
      why: "This is the Meran signature. The pawn gains space, kicks the bishop for a second time, and prepares ...Bb7 and ...a6. Your whole queenside starts moving while White's bishop is still looking for a home.",
      trigger: { kind: "epd", epds: [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4")] },
      response: "...b5, then ...Bb7 and ...a6.",
    },
    {
      id: "semi-slav-c5",
      title: "...c5 frees everything",
      oneLiner: "Once ...a6 guards b5, ...c5 opens the position for your bishops.",
      why: "The c6-pawn has done its job holding d5. Moving it to c5 hits d4, opens the b7-bishop's diagonal, and gives your queen the c-file. But it also stops defending b5, so play ...a6 first: without it, Bxb5 just takes the pawn.",
      trigger: { kind: "epd", epds: [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7 O-O a6 e4")] },
      response: "...c5.",
    },
    {
      id: "semi-slav-bg5",
      title: "Against Bg5: take the pawn",
      oneLiner: "5.Bg5 dxc4, then ...b5 to keep it. Expect a wild game.",
      why: "With the bishop on g5 rather than e3, White cannot recapture on c4 quickly, so you take and hold with ...b5. White will throw e4 and e5 at you and the position gets sharp fast. If that is not your idea of fun, 5...h6 asks the bishop to decide first and is far calmer.",
      trigger: { kind: "opponent_san", sans: ["Bg5"] },
      response: "...dxc4, then ...b5 after e4.",
    },
    {
      id: "semi-slav-exchange",
      title: "Against cxd5: mirror and get the bishop out",
      oneLiner: "...cxd5, then ...Nf6, ...Nc6 and ...Bf5 before ...e6.",
      why: "When White trades on d5 early, your c-pawn recaptures and the position becomes symmetrical. The one thing to get right is the light bishop: with the c-pawn gone it can come to f5 straight away, so do that before you play ...e6 and shut it in.",
      trigger: { kind: "opponent_san", sans: ["cxd5"] },
      response: "...cxd5, ...Nf6, ...Nc6, ...Bf5.",
    },
    {
      id: "semi-slav-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, put the queen on c7, and race your queenside against White's centre.",
      why: "Your trumps are the b7-bishop and the queenside pawns; White's is the centre. Get castled, keep the c-file for your queen and rook, and push ...c5 or ...c4 when your pieces are ready. Do not open the centre yourself while your king is still on e8.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — meet the centre pawn with a centre pawn. ...c6 follows when c4 arrives.", why: "The main move, and the one this opening is built for." },
        { san: "e4", verdict: "good", answer: "c6", howToAnswer: "...c6 — the Caro-Kann. The same ...c6 and ...d5 idea against the other centre pawn.", why: "Your Semi-Slav habits transfer straight across: support d5 with the c-pawn." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...Nf6, ...c6 and ...e6 as usual.", why: "Flexible. It almost always becomes a d4 game a move later." },
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...d5. If d4 comes you are in your opening; if not, develop normally.", why: "The English. Your structure works unchanged against it." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...Nf6, ...c6 — solid against the fianchetto. Keep ...Bf5 in mind since the bishop is not shut in yet.", why: "A quiet setup with no early pressure on d5." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5. If e4 follows, ...dxe4 or ...c6 and you have a Caro-Kann.", why: "It puts the knight in front of the c-pawn, so there is no Queen's Gambit to worry about." },
        { san: "e3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — their bishop is behind a pawn and yours is not.", why: "Passive." },
        { san: "b3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...e6 and ...c5 — take the centre they declined.", why: "Larsen's Opening. It ignores the centre, so take it." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bg4 or ...Bf5 — their king is a little airy already.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 and ...e5 — take all the space on offer.", why: "Timid." },
      ],
    },
    [P("d4")]: { yourMove: { san: "d5", why: "Claim your half of the centre. Everything else in the opening hangs off this pawn." } },
    [P("d4 d5")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "c6", howToAnswer: "...c6 — support d5 with the c-pawn.", why: "The Queen's Gambit, and the start of your opening." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c6 and ...e6 when c4 arrives.", why: "Flexible. Usually c4 comes next anyway." },
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5 or ...c6 and ...Bf5 — copy their setup.", why: "The London System. It is solid and it gives you no trouble." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...Bf5 or ...Bg4 while their bishop is stuck behind e3.", why: "It locks in White's own bishop." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. If Bg5, ...Nbd7 or ...Ne4; if e4, ...dxe4.", why: "The knight blocks the c-pawn, so there is no gambit coming." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 — take the pawn. After Nc3 Nf6 f3, take again and develop; do not get greedy beyond that.", why: "The Blackmar-Diemer Gambit gives up a pawn for open lines. Take it and stay calm." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bf5, ...e6 — normal development.", why: "Passive; the c-pawn is doing nothing on c3." },
        { san: "Bg5", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. If Bxf6 exf6 you have two bishops and an open file for the rook.", why: "An odd early bishop move with no target yet." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...c6, ...Bf5 — the bishop can come out here since White is not hitting d5.", why: "A quiet fianchetto setup." },
      ],
    },
    [P("d4 d5 c4")]: {
      yourMove: { san: "c6", why: "Support d5 with a pawn that does not shut in a bishop. ...e6 will add the second support later." },
      mistakes: [
        { san: "dxc4", why: "You cannot keep it. e3 or e4 and Bxc4 win it back with free development, and the centre is White's." },
        { san: "Nf6", why: "cxd5 Nxd5 e4 kicks the knight and hands White the whole centre for nothing. Support d5 first." },
      ],
    },
    [P("d4 d5 c4 c6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — develop toward the centre.", why: "The main line." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6. Do not take on c4 yet: without Nf3 played, e4 would give White a huge centre.", why: "Normal and equally common." },
        { san: "cxd5", verdict: "good", answer: "cxd5", howToAnswer: "...cxd5, then ...Nf6, ...Nc6 and ...Bf5 before ...e6.", why: "The Exchange. Symmetrical and quiet; get the bishop out while you can." },
        { san: "e3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Bf5 or ...Bg4 since White's bishop is behind e3.", why: "Solid but it shuts in the c1-bishop." },
        { san: "Qb3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — b7 is still covered by your bishop on c8. Just develop.", why: "An early queen that attacks nothing yet." },
        { san: "Nd2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6 and ...Bd6 — the knight on d2 is in the way of everything.", why: "Passive." },
        { san: "e4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — a pawn. After Nc3 Nf6 White has some play but you are simply up material.", why: "A gambit. You have a wall on c6, so take and hold." },
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...Bd6 to challenge the bishop.", why: "A London-style setup." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Bf5 and ...e6 — bishop out first.", why: "The Catalan idea. White's bishop on g2 will stare at d5, so keep it well defended." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3")]: { yourMove: { san: "Nf6", why: "Develop the knight that guards d5 and e4 in one move." } },
    [P("d4 d5 c4 c6 Nf3 Nf6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "e6", howToAnswer: "...e6 — the Semi-Slav. Now two pawns hold d5.", why: "The main line: a third attacker on d5 needs a second defender." },
        { san: "e3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Nbd7, ...Bd6 — a quiet game where you still get ...dxc4 and ...b5.", why: "Solid but slow." },
        { san: "cxd5", verdict: "good", answer: "cxd5", howToAnswer: "...cxd5, then ...Nc6 and ...Bf5.", why: "The Exchange. Keep the light bishop free." },
        { san: "Nbd2", verdict: "dubious", answer: "e6", howToAnswer: "...e6 and ...Bd6. White's knight on d2 blocks its own bishop.", why: "Passive." },
        { san: "Bg5", verdict: "good", answer: "e6", howToAnswer: "...e6 — the pin is harmless, and ...Nbd7 or ...Be7 breaks it when you like.", why: "A natural pin, but Nc3 has not arrived yet so nothing is really threatened." },
        { san: "g3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Nbd7, ...Bd6 and castle. ...dxc4 is fine once Bg2 is played, because ...b5 keeps the pawn for a while.", why: "A Catalan setup. The g2-bishop hits d5, so hold it firmly." },
        { san: "Qc2", verdict: "dubious", answer: "e6", howToAnswer: "...e6 and ...Bd6 — develop normally.", why: "Early queen; it supports e4 later but achieves nothing now." },
        { san: "Qb3", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — b7 is defended by the c8-bishop. Develop.", why: "An early queen aimed at a pawn that is not loose." },
        { san: "Bf4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Bd6 to trade off their good bishop.", why: "London-style." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3")]: {
      yourMove: { san: "e6", why: "The Semi-Slav move. d5 is now held by two pawns and the f8-bishop can come out. The c8-bishop waits; ...b5 and ...Bb7 will free it." },
      mistakes: [
        { san: "Bf5", why: "cxd5 cxd5 Qb3 and both b7 and d5 are attacked. The bishop you just developed has to go back. Support d5 first, bishop later." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — the Meran. Now wait for Bd3 before taking on c4.", why: "The main line. Quiet, and it leads to the ...dxc4 and ...b5 plan." },
        { san: "Bg5", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 — take it. After e4, ...b5 holds the pawn and the game gets sharp. If you would rather stay calm, ...h6 is the other good move.", why: "The sharpest try. With the bishop on g5 White cannot recapture on c4 quickly." },
        { san: "Qc2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Bd6 and castle. Take on c4 when the bishop comes to d3.", why: "A common way to prepare e4 without committing the bishop." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — recapture with the e-pawn here so the c8-bishop's diagonal opens.", why: "The Exchange arriving late. It is equal and your bishop is happy." },
        { san: "g3", verdict: "dubious", answer: "dxc4", howToAnswer: "...dxc4 — the pawn is hard to win back with the bishop headed to g2 and no e3 played. ...b5 and ...Bb7 follow.", why: "Slow. Fianchettoing here lets you take on c4 for free." },
        { san: "Qb3", verdict: "dubious", answer: "dxc4", howToAnswer: "...dxc4 — after Qxc4, ...b5 hits the queen and gains space with tempo.", why: "An early queen that becomes a target the moment you take on c4." },
        { san: "Bf4", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 — offer the trade of their active bishop for your passive one.", why: "Less accurate than Bg5: the bishop on f4 has no target and ...Bd6 challenges it." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 and after Nxe4, ...Nxe4 — nothing recaptures, so you are a knight up. If White does not take back, you are a clean pawn up.", why: "The pawn on e4 is attacked twice and defended once. It just loses material." },
        { san: "a3", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Bd6 and castle.", why: "It stops ...Bb4, which you were not going to play anyway." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3")]: {
      yourMove: { san: "Nbd7", why: "Develop behind the c-pawn and prepare ...dxc4. The knight also supports ...c5 later and can jump to b6 if the bishop needs another kick." },
      mistakes: [
        { san: "dxc4", why: "Too early: Bxc4 develops the bishop in one move. Wait for Bd3 so the bishop has to move twice." },
        { san: "b5", why: "cxb5 cxb5 Bxb5+ and the pawn is gone with check. Take on c4 first, then ...b5." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 — now. The bishop must move again to take back.", why: "The main line and the moment the Meran begins." },
        { san: "Qc2", verdict: "good", answer: "Bd6", howToAnswer: "...Bd6, then castle. Take on c4 the moment the bishop lands on d3.", why: "Anti-Meran: White delays the bishop so ...dxc4 gains nothing yet." },
        { san: "Be2", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 — the bishop has moved, so Bxc4 costs a second move and ...b5 comes next.", why: "Same idea as Bd3, slightly more modest." },
        { san: "Bd2", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 and castle. The bishop on d2 is doing nothing.", why: "Passive." },
        { san: "a3", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6, castle, and keep ...dxc4 for when the bishop moves.", why: "Slow. It waits for you to commit." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — open the diagonal for the c8-bishop.", why: "Releases the tension and lets your bishop breathe." },
        { san: "b3", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 and castle. With b3 played, ...dxc4 bxc4 gives White a wall, so leave the pawn and develop.", why: "It guards c4 but weakens the long diagonal your bishop will later use." },
        { san: "Ne5", verdict: "dubious", answer: "Nxe5", howToAnswer: "...Nxe5 dxe5 and then ...Nd7 or ...Ng4 to hit the e5-pawn.", why: "Premature. The knight can be traded and the e5-pawn becomes a target." },
        { san: "Qb3", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 — b7 is covered by your bishop. Castle next.", why: "An early queen with nothing to attack." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3")]: {
      yourMove: { san: "dxc4", why: "Now the bishop has spent a move on d3, taking makes it spend another on c4 and a third running from ...b5." },
      mistakes: [
        { san: "Bd6", why: "Playable, but you have missed the point: e4 comes next and the bishop on d3 never has to move again. Take on c4 while it costs White time." },
        { san: "b5", why: "cxb5 cxb5 Bxb5 and the pawn is simply gone. ...dxc4 first." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4")]: {
      replies: [
        { san: "Bxc4", verdict: "good", answer: "b5", howToAnswer: "...b5 — kick the bishop again and claim the queenside.", why: "The only sensible recapture, and the start of the Meran proper." },
        { san: "Bc2", verdict: "dubious", answer: "b5", howToAnswer: "...b5 — keep the pawn and gain space. ...Bb7 next.", why: "Retreating without taking back leaves you a pawn up with an easy game." },
        { san: "Be2", verdict: "dubious", answer: "b5", howToAnswer: "...b5, then ...Bb7 and ...a6 — you keep the pawn for now.", why: "Same story: White has given up a pawn to save a tempo." },
        { san: "Qa4", verdict: "dubious", answer: "b5", howToAnswer: "...b5 — the queen has to move and c4 is still yours.", why: "An early queen that gets hit by the same pawn." },
        { san: "e4", verdict: "bad", answer: "cxd3", howToAnswer: "...cxd3 — the bishop was still on d3. You win it for a pawn.", why: "White forgot the bishop is attacked." },
        { san: "Ne5", verdict: "bad", answer: "cxd3", howToAnswer: "...cxd3 — take the bishop. After Nxd7 Bxd7 you are a piece up.", why: "The knight jump ignores the hanging bishop." },
        { san: "O-O", verdict: "bad", answer: "cxd3", howToAnswer: "...cxd3 Qxd3 — you have won a bishop for a pawn.", why: "Castling into a lost bishop." },
        { san: "Bb1", verdict: "dubious", answer: "b5", howToAnswer: "...b5 — you keep the pawn and the bishop is buried on b1.", why: "The worst square for the bishop." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4")]: {
      yourMove: { san: "b5", why: "The Meran signature. The bishop moves for the third time, you gain queenside space, and ...Bb7 is coming." },
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — the problem bishop finds the long diagonal.", why: "The main line. The bishop goes back to its best square." },
        { san: "Be2", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, then ...a6 and ...c5.", why: "Slightly passive but sound." },
        { san: "Bb3", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7, then ...a6 and ...c5 — the bishop on b3 stares at your solid e6-pawn.", why: "The bishop points at a pawn that is not going anywhere." },
        { san: "e4", verdict: "dubious", answer: "b4", howToAnswer: "...b4 — hit the knight. After it moves, ...Nxe4 or ...c5 is coming.", why: "Ignoring the attacked bishop by pushing e4 walks into ...b4." },
        { san: "O-O", verdict: "bad", answer: "bxc4", howToAnswer: "...bxc4 — the bishop was attacked. Free piece.", why: "Castling while a bishop hangs." },
        { san: "Qe2", verdict: "bad", answer: "bxc4", howToAnswer: "...bxc4 Qxc4 — you have won a bishop for a pawn.", why: "Defending the bishop does not help when a pawn is attacking it." },
        { san: "a3", verdict: "bad", answer: "bxc4", howToAnswer: "...bxc4 — a free bishop.", why: "White forgot the bishop." },
        { san: "Bxb5", verdict: "bad", answer: "cxb5", howToAnswer: "...cxb5 — bishop for a pawn.", why: "Desperation: the b5-pawn is defended by c6." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3")]: {
      yourMove: { san: "Bb7", why: "The bishop that ...e6 shut in finds the long diagonal. From b7 it supports ...c5 and later looks at White's king." },
      mistakes: [
        { san: "c5", why: "The c6-pawn was guarding b5. Move it and Bxb5 takes a pawn for free. ...Bb7 and ...a6 first." },
        { san: "b4", why: "Too soon: Ne4 trades your knight and the pawn on b4 becomes a target. Keep the pawns together and develop." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "a6", howToAnswer: "...a6 — guard b5 so that ...c5 can follow.", why: "The main line. White gets the king safe before the centre opens." },
        { san: "e4", verdict: "good", answer: "b4", howToAnswer: "...b4 — hit the knight. After Na4 or Ne2, ...c5 opens the b7-bishop.", why: "The direct approach. Your queenside pawns answer in kind." },
        { san: "a3", verdict: "dubious", answer: "a6", howToAnswer: "...a6, then ...c5 and castle.", why: "It stops ...b4 but spends a move doing so." },
        { san: "Qe2", verdict: "dubious", answer: "a6", howToAnswer: "...a6, then ...c5 — your plan does not change.", why: "Prepares e4 slowly." },
        { san: "b3", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 and castle; ...c5 when ready.", why: "Weakens the long diagonal your bishop has just found." },
        { san: "Ne4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 Bxe4 — then ...Nf6 hits the bishop and you develop with tempo.", why: "A trade that helps you: your knight was in the way of the b7-bishop anyway." },
        { san: "Bd2", verdict: "dubious", answer: "a6", howToAnswer: "...a6 and ...c5.", why: "Passive development." },
        { san: "Qc2", verdict: "good", answer: "a6", howToAnswer: "...a6, then ...c5 — and keep an eye on Bxb5 tricks before you push.", why: "The queen eyes the b5-pawn and the h7-square." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7 O-O")]: {
      yourMove: { san: "a6", why: "Guard b5 so the c-pawn can move. Without this, ...c5 loses the b5-pawn to Bxb5." },
      mistakes: [
        { san: "c5", why: "Bxb5 — the pawn is gone because c6 no longer defends it. ...a6 first." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7 O-O a6")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "c5", howToAnswer: "...c5 — the freeing break. Everything you have built points at d4.", why: "The main line. White takes the centre and you hit back at once." },
        { san: "a4", verdict: "good", answer: "b4", howToAnswer: "...b4 — kick the knight. Then ...c5.", why: "White tries to break up your queenside before it gets going." },
        { san: "Qe2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — break while White is preparing.", why: "Slow." },
        { san: "a3", verdict: "dubious", answer: "c5", howToAnswer: "...c5, then ...Bd6 and castle.", why: "Slow." },
        { san: "b3", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6, castle, then ...c5.", why: "Weakens the diagonal your bishop owns." },
        { san: "Ne4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 Bxe4 and then ...Nf6 or ...c5 with tempo.", why: "Trading the knight that blocks your bishop suits you." },
        { san: "Bd2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 and castle.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7 O-O a6 e4")]: {
      yourMove: { san: "c5", why: "The break the whole opening has been preparing. It hits d4, opens the b7-bishop and gives your queen the c-file." },
      mistakes: [
        { san: "Bd6", why: "Too slow. e5 kicks your knight and the bishop has to move again. ...c5 first, develop afterwards." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7 O-O a6 e4 c5")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "c4", howToAnswer: "...c4 — hit the bishop and gain a square. After Bc2, ...Qc7 and the d5-pawn becomes the target.", why: "The main line: White pushes past before you can take on d4." },
        { san: "e5", verdict: "good", answer: "Nd5", howToAnswer: "...Nd5 — centralise. After Nxd5 Bxd5, your bishops are both alive.", why: "White kicks the knight, and the knight is happy to go to d5." },
        { san: "dxc5", verdict: "dubious", answer: "Nxc5", howToAnswer: "...Nxc5 — the knight hits the bishop and you are fully developed.", why: "Trading releases the pressure and your pieces come out with tempo." },
        { san: "Be3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Nxd4 and then ...Bc5 or ...Nc5 with active pieces.", why: "Defending d4 passively." },
        { san: "Bg5", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 — and after Nxd4, ...Be7 breaks the pin.", why: "The pin does not bite while d4 is under attack." },
      ],
    },

    // --- 5.Bg5: take the pawn ------------------------------------------------
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 Bg5")]: {
      yourMove: { san: "dxc4", why: "With the bishop on g5 there is no e3 yet, so Bxc4 is two moves away. Take and hold with ...b5." },
      mistakes: [
        { san: "Be7", why: "Not bad, but now it is a Queen's Gambit Declined and you have given up the ...c6 and ...b5 play you chose this opening for." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 Bg5 dxc4")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "b5", howToAnswer: "...b5 — keep the pawn. After e5 h6 Bh4 g5 it gets wild; ...Nd5 is the calmer option.", why: "The Botvinnik. White takes the centre and asks whether you dare keep the pawn." },
        { san: "e3", verdict: "good", answer: "b5", howToAnswer: "...b5 — hold the pawn for now; ...Bb7 and ...Nbd7 follow.", why: "Quieter. White will need a4 to break up your pawns." },
        { san: "a4", verdict: "dubious", answer: "Bb4", howToAnswer: "...Bb4 — pin the knight so that ...b5 cannot be met by a4xb5 with a discovered hit.", why: "Stops ...b5 immediately but does nothing for development." },
        { san: "Bxf6", verdict: "dubious", answer: "Qxf6", howToAnswer: "...Qxf6 — you keep the pawn and the bishop pair.", why: "Giving up the bishop for nothing." },
        { san: "Qa4", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — defend nothing in particular, develop, and keep ...b5 for after the queen moves.", why: "The queen eyes c4 and c6 but can be kicked later." },
        { san: "Ne5", verdict: "dubious", answer: "b5", howToAnswer: "...b5 — hold the pawn; the knight on e5 is loose after ...Nbd7.", why: "Aggressive but premature." },
      ],
    },

    // --- 3.cxd5: the Exchange -------------------------------------------------
    [P("d4 d5 c4 c6 cxd5")]: {
      yourMove: { san: "cxd5", why: "Recapture with the c-pawn to keep the e-pawn at home and the c8-bishop free. Symmetrical and comfortable." },
    },
    [P("d4 d5 c4 c6 cxd5 cxd5")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Nc6 and ...Bf5.", why: "Normal development." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...Bf5 — bishop out before ...e6.", why: "Normal." },
        { san: "Bf4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Nf6 and ...Bf5 — mirror White's setup.", why: "White gets the bishop out first. You do the same." },
        { san: "Qb3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — b7 is defended by your bishop on c8, so the queen has nothing to bite on. Develop.", why: "An early queen with no real threat." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...Bf5 or ...Bg4.", why: "Locks in White's own bishop." },
        { san: "Nd2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...Bf5.", why: "Passive." },
      ],
    },
    [P("d4 d5 c4 c6 cxd5 cxd5 Nc3")]: { yourMove: { san: "Nf6", why: "Develop and guard d5. ...Nc6 and ...Bf5 come next." } },
    [P("d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6")]: {
      replies: [
        { san: "Bf4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Bf5 and ...e6.", why: "The main Exchange setup." },
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Bf5.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — if Bxf6 exf6 you get two bishops and an open e-file.", why: "The pin has no follow-up." },
        { san: "e3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 and ...Bf5 while their bishop is stuck.", why: "Blocks the c1-bishop." },
        { san: "Qb3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — d5 is held by knight and queen, b7 by the bishop.", why: "The queen attacks two pawns that are both defended." },
      ],
    },
  },

  traps: [
    {
      name: "...b5 before ...dxc4",
      sans: sans("1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6 5.e3 b5 6.cxb5 cxb5 7.Bxb5+"),
      punisher: "white",
      tell: "You want the Meran's ...b5 and the c4-pawn is still on the board.",
      why: "With c4 still there, cxb5 cxb5 opens the f1–b5 diagonal and the bishop takes on b5 with check. The order is fixed: take on c4 first, and only then ...b5 hits a bishop instead of losing a pawn.",
    },
    {
      name: "...c5 before ...a6",
      sans: sans("1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6 5.e3 Nbd7 6.Bd3 dxc4 7.Bxc4 b5 8.Bd3 c5 9.Bxb5"),
      punisher: "white",
      tell: "Your pieces are ready for the ...c5 break and the a-pawn is still on a7.",
      why: "The c6-pawn was the only thing guarding b5. The moment it moves, Bxb5 takes a free pawn. One quiet move, ...a6, makes the break safe.",
    },
    {
      name: "Castling into a loose bishop",
      sans: sans("1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6 5.e3 Nbd7 6.Bd3 dxc4 7.Bxc4 b5 8.O-O bxc4"),
      punisher: "black",
      tell: "White has recaptured on c4 and reaches for the king instead of the bishop.",
      why: "...b5 attacks the bishop and it must move. Players under 1200 often castle on autopilot here. Take it: a full bishop for nothing.",
    },
  ],

  modelGames: [
    {
      label: "Meran main line",
      sans: sans("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 Bb7 O-O a6 e4 c5 d5 c4 Bc2 Qc7"),
      summary: "The whole plan: the wall on c6 and e6, ...dxc4 once the bishop commits, ...b5 and ...Bb7, ...a6 to guard, then ...c5 to free everything. When White pushes d5, ...c4 and ...Qc7 keep the queenside rolling.",
    },
    {
      label: "The Exchange: bishop out first",
      sans: sans("d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Nf3 Nc6 Bf4 Bf5 e3 e6 Bd3 Bxd3 Qxd3 Bd6"),
      summary: "When White trades on d5 you mirror the setup and get the light bishop to f5 before ...e6. Trade it when White offers; then ...Bd6 challenges the other bishop and the position is level.",
    },
    {
      label: "Botvinnik: holding the pawn",
      sans: sans("d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 Bg5 dxc4 e4 b5 e5 h6 Bh4 g5 Nxg5 hxg5 Bxg5 Nbd7"),
      summary: "Against 5.Bg5 you take on c4 and keep it with ...b5. White breaks with e5 and sacrifices a knight on g5 to keep the pin; Black gets three pawns for the piece and a wild game. Know that it exists, and choose 5...h6 if you would rather not.",
    },
  ],

  middlegamePlan:
    "Your wall on c6 and e6 holds d5 so that White never wins the centre by force; your job is to turn that wall into a queenside wave. " +
    "Take on c4 once the bishop has moved to d3, hit it with ...b5, put the bishop on b7 and the queen on c7, and play ...a6 before you break with ...c5. " +
    "After ...c5 the b7-bishop and the c-file are your assets; White's is the pawn centre, so let White push d5 or e5 and attack the pawns that arrive rather than the ones that stay home. " +
    "Castle before the centre opens, keep the knights near d5 and c5, and do not trade the b7-bishop cheaply.",

  structureDiagram: {
    fen: "r1bqkb1r/p2n1ppp/2p1pn2/1p6/2BP4/2N1PN2/PP3PPP/R1BQK2R w KQkq - 0 8",
    orientation: "black",
    arrows: [
      { from: "b5", to: "c4" },
      { from: "c6", to: "c5" },
    ],
    caption: "The Meran picture: two pawns have held d5, ...b5 chases the bishop, and the c-pawn is about to break to c5 and open the b7-bishop.",
  },
};
