// Pirc Defence (1.e4 d6 2.d4 Nf6 3.Nc3 g6) — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines are standard public theory. Prose original.
//
// The Pirc is a coiled spring. You concede the centre on purpose, put the bishop
// on g7 and the king behind it, and only then hit back with ...e5 (or ...c5).
// Against the Classical (Nf3, Be2) that means ...Bg4, ...Nc6, ...e5. Against
// the Austrian (f4) it means castling fast and striking in the centre before the
// pawn storm arrives. Same first six moves in every game.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const pirc: OpeningSpec = {
  id: "pirc",
  name: "Pirc Defence",
  eco: "B07–B09",
  side: "black",
  family: "1e4-other",
  firstMoves: "1.e4 d6 2.d4 Nf6 3.Nc3 g6",
  tabiyaFen: "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
  pitch:
    "Play the same six moves against anything: ...d6, ...Nf6, ...g6, ...Bg7, castle, and only then hit the centre with ...e5. " +
    "You never have to memorise what White does, your king is safe by move six, and opponents under 1200 who grab space early usually cannot hold it once you strike back.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6"], why: "The king's knight attacks e4 and shields your king. It is the first piece out, after ...d6." },
      { piece: "B", squares: ["g7"], why: "The Pirc bishop. It covers your king and, once ...e5 opens the diagonal, it hits the centre and the queenside." },
      { piece: "N", squares: ["c6", "d7"], why: "The second knight supports the ...e5 break. c6 hits d4 directly; d7 keeps ...c6 and ...c5 available." },
      { piece: "B", squares: ["g4", "e6", "d7"], why: "The light bishop. On g4 it pins the knight that holds d4, which is what makes ...e5 work." },
      { piece: "R", squares: ["e8"], why: "The rook stands behind the ...e5 push once the king has castled." },
    ],
    pawns: ["d6", "g6"],
    order: [
      {
        before: "Bg7",
        after: "e5",
        why: "The bishop must be on g7 before you push ...e5. Without it, dxe5 dxe5 Qxd8+ Kxd8 Nxe5 wins a pawn and your king has lost castling. With the bishop on g7, ...Nxe4 and ...Bxe5 get the pawn back.",
      },
      {
        before: "d6",
        after: "Nf6",
        why: "...d6 first. If the knight comes out before ...d6, e5 kicks it and you are in an Alekhine you did not choose. With ...d6 in, e5 is never a threat.",
      },
    ],
    castle: "O-O",
    castleBy: 7,
  },

  ideas: [
    {
      id: "pirc-spring",
      title: "The coiled spring",
      oneLiner: "Concede the centre, castle, then hit it with ...e5 or ...c5.",
      why: "White gets e4 and d4 for free and it looks like a lot. It is only a lot if it can be held. You develop behind your pawns, get the king safe, and then strike at d4 with a pawn and pieces at the same time. A big centre with too few defenders becomes a target.",
    },
    {
      id: "pirc-bishop-first",
      title: "Bishop first, break second",
      oneLiner: "...Bg7 and castle before ...e5. Never the other way round.",
      why: "The ...e5 push opens the d-file. If your king is still on e8 and the bishop is still on f8, White trades on e5, trades queens with check, and takes the pawn. Once the bishop is on g7 and you are castled, the same push is your best move.",
      trigger: { kind: "epd", epds: [P("e4 d6 d4 Nf6 Nc3 g6 Nf3"), P("e4 d6 d4 Nf6 Nc3 g6 f4")] },
      response: "...Bg7, then ...O-O.",
      ifIgnored: "A premature ...e5 costs a pawn and castling after dxe5 dxe5 Qxd8+ Kxd8 Nxe5.",
    },
    {
      id: "pirc-austrian",
      title: "Austrian Attack: strike back at once",
      oneLiner: "f4 means a pawn storm is coming. Castle and hit the centre before it arrives.",
      why: "With pawns on e4, d4 and f4 White wants e5 and f5 and a kingside attack. You cannot out-wait that. Castle, put the knight on c6 to hit d4, and play ...e5 as soon as it is safe: it forces White to resolve the centre before the storm has any pieces behind it.",
      trigger: { kind: "opponent_san", sans: ["f4"] },
      response: "...Bg7, ...O-O, then ...Nc6 and ...e5.",
      ifIgnored: "e5 and f5 arrive with tempo and your knight gets kicked around while the g7-bishop stares at a wall of pawns.",
    },
    {
      id: "pirc-150",
      title: "Be3 and Qd2: they want Bh6",
      oneLiner: "Bishop to e3, queen to d2 means Bh6 is coming. Answer with ...c6, ...b5 and keep playing.",
      why: "The plan is to trade off your g7-bishop and attack down the h-file. Do not sit still: ...c6 and ...b5 give you queenside play, ...Nbd7 covers your king's dark squares, and if Bh6 comes you can trade it and carry on. Your counterplay is faster than it looks.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["e3"] },
      response: "...c6, ...b5, ...Nbd7 — and castle when it is safe.",
    },
    {
      id: "pirc-bc4",
      title: "Bishop on c4: ...Nxe4 is safe",
      oneLiner: "If e4 is guarded only by the c3-knight, ...Nxe4 Nxe4 d5 forks bishop and knight.",
      why: "A bishop on c4 and a knight on c3 with nothing else guarding e4 is a pattern worth knowing. Take on e4, and when the knight recaptures ...d5 hits both the bishop and the knight, so you get the piece straight back. Material stays level, but White's centre is gone and the bishop has spent two moves achieving nothing. If you are not castled yet, check that Bxf7+ is not a problem first.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["c4"] },
      response: "...Nxe4, then ...d5 after Nxe4. Castle first if Bxf7+ is possible.",
    },
    {
      id: "pirc-e5-break",
      title: "The moment for ...e5",
      oneLiner: "Bishop on g7, king castled, knight on c6: now push ...e5.",
      why: "This is what the whole opening has been building toward. ...e5 attacks d4 with a pawn while your knight already attacks it. If White pushes d5, the knight goes to e7 and your bishop is free. If White trades, you recapture and the g7-bishop looks through to the queenside.",
      trigger: { kind: "epd", epds: [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4 Be3 Nc6 Qd2")] },
      response: "...e5.",
    },
    {
      id: "pirc-book-end",
      title: "When the book runs out",
      oneLiner: "Castled, bishop on g7, centre challenged. Now bring the rook to e8 and the second knight into the fight.",
      why: "The Pirc middlegame rewards patience. If the centre is still closed, keep adding pressure with ...Re8, ...Nbd7 or ...Nc6, ...c6 and ...Qc7. If White has traded on e5, the g7-bishop is your best piece; keep it. If White storms the kingside, trade the attackers and hit back in the centre.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "d6", howToAnswer: "...d6 — the Pirc. Same setup every game.", why: "Most of your games." },
        { san: "d4", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nf6, ...g6, ...Bg7 — the same pieces on the same squares.", why: "A King's Indian by another road. Your setup does not change." },
        { san: "c4", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nf6, ...g6, ...Bg7, castle.", why: "The English. Same setup." },
        { san: "Nf3", verdict: "good", answer: "d6", howToAnswer: "...d6 and the usual pieces.", why: "Flexible; usually becomes a d4 game." },
        { san: "Nc3", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — if e4 follows you are in the Pirc.", why: "Often transposes." },
        { san: "f4", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...Nf6, ...g6 — your king will be safer than theirs.", why: "Bird's Opening loosens the kingside early." },
        { san: "g3", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nf6, ...g6 — mirror and see.", why: "A fianchetto setup." },
        { san: "d3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, then ...e5 is fine too — White is not fighting for the centre.", why: "Timid." },
        { san: "b3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...Nf6, ...e5 — take the centre they ignored.", why: "Ignores the centre." },
        { san: "e3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...Nf6, ...g6, and ...e5 when ready.", why: "Passive." },
      ],
    },
    [P("e4")]: { yourMove: { san: "d6", why: "Flexible and solid. It prepares ...Nf6 without letting e5 kick the knight." } },
    [P("e4 d6")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — attack e4 and make White defend it.", why: "The main line. White takes the whole centre." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...g6 — the same setup.", why: "Development first. Usually d4 follows." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7.", why: "Development. Fine." },
        { san: "Bc4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — e4 needs a defender now, and once Nc3 arrives the ...Nxe4 trick is on.", why: "Aims at f7 before there is anything to aim at." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 and castle quickly.", why: "A pawn storm before development." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 — a King's Indian.", why: "Same setup." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...e5 — White has left the centre to you.", why: "Timid." },
        { san: "Qf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — the knight blocks the f-file and f7 is safe.", why: "Early queen with an eye on f7. One developing move ends it." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — the bishop must move again.", why: "A check that gains you a tempo." },
      ],
    },
    [P("e4 d6 d4")]: {
      yourMove: { san: "Nf6", why: "Attack e4 at once. Whatever defends it, you play ...g6 next." },
      mistakes: [{ san: "e5", why: "dxe5 dxe5 Qxd8+ Kxd8 and you have lost castling for nothing. Keep the centre closed until the bishop is on g7." }],
    },
    [P("e4 d6 d4 Nf6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "g6", howToAnswer: "...g6 — the Pirc. Bishop to g7 next.", why: "The main line. The knight defends e4 and develops." },
        { san: "Nf3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, castle.", why: "Development without defending e4 yet. Nc3 usually follows." },
        { san: "f3", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O — then ...c6 and ...b5 against the coming Be3 and Qd2.", why: "Defends e4 with a pawn and takes f3 from the knight. It prepares a slow kingside plan." },
        { san: "Bd3", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — e4 is defended, so develop normally.", why: "Solid but it blocks the c2-pawn." },
        { san: "Nd2", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7 — the knight on d2 blocks White's own bishop.", why: "Passive." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 dxe5 Qxd1+ Kxd1 Ng4 — queens off, their king stuck on d1, and e5 or f2 falls.", why: "Pushing before developing. It opens the d-file onto White's own queen." },
        { san: "Bc4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — a pawn. If Qf3 (eyeing f7), back to ...Nf6. If Bxf7+ Kxf7 Qh5+ Kg8 Qd5+ e6 Qxe4, material is level and you are fine.", why: "Aims at f7 and drops e4." },
        { san: "Bg5", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — the pin is harmless. ...Bg7 and ...h6 come later.", why: "An early pin on a knight that does not mind." },
        { san: "c4", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7 — a King's Indian.", why: "Same setup." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3")]: {
      yourMove: { san: "g6", why: "The Pirc move. The bishop goes to g7, the king follows, and only then do you hit the centre." },
      mistakes: [
        { san: "Nxe4", why: "The knight on c3 defends e4. Nxe4 and you have lost a knight for a pawn." },
        { san: "e5", why: "dxe5 dxe5 Qxd8+ Kxd8 and your king has lost castling. This push waits until the bishop is on g7." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, then ...O-O — the Classical.", why: "Your most common opponent. Simple development." },
        { san: "f4", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, then ...Nc6 and ...e5 — strike before the storm.", why: "The Austrian Attack. Ambitious and the sharpest test." },
        { san: "Be3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 — then ...c6, ...b5 and ...Nbd7 against Qd2 and Bh6.", why: "The 150 Attack setup. Solid for White and easy to play, so know your answer." },
        { san: "Bg5", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 — the pin is harmless. ...O-O next, ...h6 later if you want the bishop gone.", why: "Development with a pin that does not bite." },
        { san: "Be2", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O — into the Classical.", why: "Quiet development." },
        { san: "f3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, then ...c6 and ...b5.", why: "Over-protects e4 and takes the natural square from the knight." },
        { san: "Bc4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 Nxe4 d5 — the pawn forks bishop and knight and you get the piece back with a free centre. If Bxf7+ Kxf7 Nxe4 instead, material is still level and your king tucks back to g8.", why: "A bishop on c4 with only the c3-knight guarding e4. This is the trick to know." },
        { san: "e5", verdict: "dubious", answer: "Nfd7", howToAnswer: "...Nfd7 — the knight steps back and the e5-pawn is a target for ...c5.", why: "Pushing before developing gives you targets." },
        { san: "h3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...e5 when ready.", why: "Stops ...Bg4 at the cost of a whole move." },
      ],
    },

    // --- Classical: 4.Nf3 ------------------------------------------------------
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3")]: {
      yourMove: { san: "Bg7", why: "The bishop before anything else. It covers your king and makes the ...e5 push safe." },
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7")]: {
      replies: [
        { san: "Be2", verdict: "good", answer: "O-O", howToAnswer: "...O-O — king safe, then ...Bg4 and ...Nc6 to prepare ...e5.", why: "The Classical main line." },
        { san: "Bc4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — castle, and next move ...Nxe4 Nxe4 d5 forks bishop and knight with no Bxf7+ to worry about.", why: "The bishop points at a king that is about to castle behind a rook." },
        { san: "Bg5", verdict: "good", answer: "O-O", howToAnswer: "...O-O — the pin is harmless. ...h6 later kicks it.", why: "Development with a pin that has no target." },
        { san: "Be3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Ng4 or ...c6 and ...b5.", why: "Solid, heading for Qd2 and a queenside castle." },
        { san: "h3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...Nc6 and ...e5 — the pawn move changed nothing.", why: "Stops ...Bg4 but costs a move." },
        { san: "Bd3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...Nc6 — the bishop on d3 blocks the queen's protection of d4.", why: "Natural, but d4 has one defender fewer." },
        { san: "e5", verdict: "dubious", answer: "Nfd7", howToAnswer: "...Nfd7, then ...O-O and ...c5. The e5-pawn is a target now.", why: "Pushing before castling." },
        { san: "Bf4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...Nc6 or ...Nh5 hitting the bishop.", why: "Aims at d6 but leaves the bishop exposed to ...Nh5." },
        { san: "Qd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...c6 and ...b5.", why: "Preparing Bh6 too early; your queenside play is faster." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2")]: {
      yourMove: { san: "O-O", why: "Castle before the fight in the centre. Everything you do next is safer with the king on g8." },
      mistakes: [
        { san: "Nxe4", why: "Nxe4 and White has a knight for a pawn. The bishop is on e2, not c4, so ...d5 does not fork anything." },
        { san: "e5", why: "Too early: dxe5 dxe5 Qxd8+ Kxd8 Nxe5 and your king is out with no castling. Castle first, then ...e5 is fine." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin the knight that holds d4. Then ...Nc6 and ...e5.", why: "The main line. Both kings are safe and the centre fight begins." },
        { san: "Be3", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4, then ...Nc6 — d4 is under pressure.", why: "Development that also prepares Qd2." },
        { san: "h3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — no pin, so hit d4 directly; ...e5 next.", why: "Stops ...Bg4 for the price of a move." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 — after Nxe5 play ...Nbd7 to challenge the knight; after dxe5 play ...Ng4 and the pawn is a target.", why: "Releasing the tension with your king already safe suits you." },
        { san: "Bg5", verdict: "dubious", answer: "Bg4", howToAnswer: "...Bg4 — pin for pin, and d4 is the one that matters.", why: "The pin on f6 threatens nothing." },
        { san: "Bf4", verdict: "dubious", answer: "Nh5", howToAnswer: "...Nh5 — hit the bishop; after Bg5 play ...h6.", why: "The bishop has no safe job on f4." },
        { san: "Qd2", verdict: "dubious", answer: "Bg4", howToAnswer: "...Bg4, then ...Nc6 and ...e5.", why: "Prepares Bh6 but leaves d4 with fewer defenders." },
        { san: "d5", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — challenge the pawn at once; after dxc6 Nxc6.", why: "Advances before the pieces are ready." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O")]: {
      yourMove: { san: "Bg4", why: "Pin the knight that defends d4. This is what makes ...Nc6 and ...e5 bite." },
      mistakes: [{ san: "Nxe4", why: "Nxe4 d5 and the knight simply retreats: no bishop on c4 means no fork. You have lost a knight for a pawn." }],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4")]: {
      replies: [
        { san: "Be3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — d4 has two attackers. ...e5 next.", why: "The main line: hold d4 and prepare Qd2." },
        { san: "h3", verdict: "good", answer: "Bxf3", howToAnswer: "...Bxf3 Bxf3 Nc6 — then ...e5. The knight that defended d4 is gone.", why: "Asking the question. Trade and carry on." },
        { san: "Re1", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...e5.", why: "Quiet." },
        { san: "Qd2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — d4 is attacked twice and the queen on d2 is in the way of Be3.", why: "Wrong order for White's own plan." },
        { san: "Bg5", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...e5 — the bishop on g5 does nothing about d4.", why: "A pin with no point." },
        { san: "d5", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — hit the pawn. After dxc6 Nxc6 your pieces are freer than theirs.", why: "Pushing the pawn you were attacking." },
        { san: "b3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...e5.", why: "Slow." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4 Be3")]: {
      yourMove: { san: "Nc6", why: "A second attacker on d4. Now ...e5 is coming and White must decide what to do with the centre." },
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4 Be3 Nc6")]: {
      replies: [
        { san: "Qd2", verdict: "good", answer: "e5", howToAnswer: "...e5 — the break. If d5 then ...Ne7; if dxe5 then ...dxe5.", why: "The main line. White completes the setup and you strike." },
        { san: "d5", verdict: "good", answer: "Bxf3", howToAnswer: "...Bxf3 Bxf3 Ne5 — the knight lands on e5 and hits the bishop.", why: "Kicks the knight but gives up d4 and leaves e5 empty." },
        { san: "h3", verdict: "good", answer: "Bxf3", howToAnswer: "...Bxf3 Bxf3 e5 — the break, with the defender of d4 gone.", why: "Asking the bishop. Trade and push." },
        { san: "Re1", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — if d5 then ...Ne7; if dxe5 dxe5 you have a fine game.", why: "Quiet, and it gives you the break for free." },
        { san: "Nd2", verdict: "dubious", answer: "Bxe2", howToAnswer: "...Bxe2 Qxe2 e5 — trade and break.", why: "Unpins by retreating, and hands you the bishop trade." },
        { san: "Qd3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — the queen is exposed on d3 and d4 is falling.", why: "The queen blocks nothing and defends nothing new." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4 Be3 Nc6 Qd2")]: {
      yourMove: { san: "e5", why: "The push the whole opening was for. d4 is attacked by pawn and knight, the g7-bishop is about to open, and your king is safe." },
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4 Be3 Nc6 Qd2 e5")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "Ne7", howToAnswer: "...Ne7 — the knight goes round to g6 or c8; ...f5 or ...c6 later.", why: "Closing the centre. The main line." },
        { san: "dxe5", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 — if Qxd8 then ...Rfxd8; if Bc5 then ...Re8.", why: "Opening the centre while both sides are developed." },
        { san: "Rad1", verdict: "good", answer: "Re8", howToAnswer: "...Re8 — keep the tension; the rook backs the e-pawn.", why: "Quiet." },
        { san: "h3", verdict: "dubious", answer: "Bxf3", howToAnswer: "...Bxf3 Bxf3 Re8 — trade and keep the tension on d4.", why: "Asking the bishop one move too late." },
        { san: "Bc4", verdict: "bad", answer: "exd4", howToAnswer: "...exd4 Bxd4 Nxe4 — the knight grabs e4; after Nxe4 Nxd4 Nxd4 Bxd4 you are a pawn up.", why: "Moving a defender away from d4 while your pawn and knight both attack it." },
      ],
    },

    // --- Austrian Attack: 4.f4 ---------------------------------------------------
    [P("e4 d6 d4 Nf6 Nc3 g6 f4")]: {
      yourMove: { san: "Bg7", why: "Same move as always. Against the Austrian you castle fast, so the bishop comes first." },
      mistakes: [
        { san: "e5", why: "dxe5 dxe5 Qxd8+ Kxd8 fxe5 and you are a pawn down with no castling." },
        { san: "Nxe4", why: "Nxe4 and the knight is gone for a pawn." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 f4 Bg7")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O — castle at once. Then ...Nc6 and ...e5.", why: "The main line." },
        { san: "e5", verdict: "dubious", answer: "Nfd7", howToAnswer: "...Nfd7 — then ...c5 and ...O-O. The e5-pawn is overextended.", why: "Pushing before developing a single piece." },
        { san: "Bd3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Nc6 — the bishop on d3 blocks the queen's defence of d4.", why: "Natural development." },
        { san: "Be3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Nc6 and ...e5.", why: "Solid." },
        { san: "Bc4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — then ...Nxe4 Nxe4 d5 is on, with no Bxf7+ to fear.", why: "The bishop on c4 walks into the fork trick." },
        { san: "Qf3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — f7 is covered by the rook; then ...Nc6 and ...e5.", why: "An early queen aiming at f7 with nothing to support it." },
        { san: "Be2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Nc6 and ...e5.", why: "Quiet development." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3")]: {
      yourMove: { san: "O-O", why: "Castle before you challenge the centre. Against the Austrian, king safety first is not optional." },
      mistakes: [
        { san: "e5", why: "dxe5 dxe5 Qxd8+ Kxd8 fxe5 — a pawn down and no castling. Castle first." },
        { san: "Nxe4", why: "Nxe4 and you have lost a knight for a pawn." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — hit d4, which the bishop on d3 has just unprotected. ...e5 next.", why: "The main line. Aggressive, aiming at your king." },
        { san: "Be2", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...e5.", why: "Calm." },
        { san: "e5", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 — after fxe5 the knight goes to h5 or d5; after dxe5 it hops to g4.", why: "The pawn storm begins. Trade and reroute the knight; do not let it be kicked to e8." },
        { san: "Be3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...e5 — strike before Qd2 and 0-0-0.", why: "Solid, heading for a long castle." },
        { san: "Bc4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 Nxe4 d5 — bishop and knight forked; you get the piece back and White's centre is gone.", why: "The bishop on c4 with e4 guarded only by the knight. The trick." },
        { san: "h3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 and ...e5.", why: "A slow move in a fast line." },
        { san: "Qe2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 and ...e5 — the queen blocks the bishop.", why: "Misplaced." },
      ],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Bd3")]: {
      yourMove: { san: "Nc6", why: "The bishop on d3 blocks the queen's protection of d4, so the knight attacks a pawn that only the f3-knight defends. ...e5 comes next." },
      mistakes: [{ san: "Nxe4", why: "Bxe4 — the bishop on d3 defends e4. A knight for a pawn." }],
    },
    [P("e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Bd3 Nc6")]: {
      replies: [
        { san: "Be3", verdict: "good", answer: "e5", howToAnswer: "...e5 — after fxe5 dxe5 d5 play ...Nd4. The centre opens with your pieces ready.", why: "The main line: hold d4 and keep the attack alive." },
        { san: "e5", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 fxe5 Nh5 — the knight is safe and e5 is a target for ...Bg4 and ...f6.", why: "The critical push. Trade and keep the knight out of the way of the pawns." },
        { san: "d5", verdict: "dubious", answer: "Nb4", howToAnswer: "...Nb4 — hit the bishop. After Be2, ...c5 or ...Bg4.", why: "Pushing kicks the knight to a square that hits the bishop." },
        { san: "O-O", verdict: "good", answer: "e5", howToAnswer: "...e5 — if d5 then ...Nd4; if fxe5 dxe5 d5 the same.", why: "Sensible, and it lets you break." },
        { san: "h3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — the break, while White wastes time.", why: "Slow." },
        { san: "Ne2", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — d4 has lost a defender.", why: "Rerouting the knight away from the centre." },
      ],
    },
  },

  traps: [
    {
      name: "...e5 before the bishop",
      sans: sans("1.e4 d6 2.d4 Nf6 3.Nc3 g6 4.Nf3 e5 5.dxe5 dxe5 6.Qxd8+ Kxd8 7.Nxe5"),
      punisher: "white",
      tell: "You have played ...g6 and the urge is to hit the centre now, before the bishop has reached g7.",
      why: "With the bishop still on f8 nothing covers e5 after the trades. White takes on e5, trades queens with check, and takes the pawn: you are a pawn down and your king has lost castling. One move later, with the bishop on g7 and the king castled, the same push is your best move.",
    },
    {
      name: "d4 has too few defenders",
      sans: sans("1.e4 d6 2.d4 Nf6 3.Nc3 g6 4.Nf3 Bg7 5.Be2 O-O 6.O-O Bg4 7.Be3 Nc6 8.Qd2 e5 9.Bc4 exd4 10.Bxd4 Nxe4 11.Nxe4 Nxd4 12.Nxd4 Bxd4"),
      punisher: "black",
      tell: "Your pawn and knight both hit d4 and White moves a piece away from the centre instead of answering the threat.",
      why: "After ...exd4 Bxd4 the d4-bishop is the only thing holding the centre together, and ...Nxe4 removes its support: the c3-knight has to recapture, then ...Nxd4 and ...Bxd4 clear the board. You come out a pawn up with the better bishop. The lesson is the count: two attackers on d4 need two defenders.",
    },
    {
      name: "The hasty e5 push",
      sans: sans("1.e4 d6 2.d4 Nf6 3.e5 dxe5 4.dxe5 Qxd1+ 5.Kxd1 Ng4"),
      punisher: "black",
      tell: "White pushes e5 on move three with nothing developed, and recaptures with the d-pawn.",
      why: "The d-file is open and White's queen is on it. You trade queens with check, the king must recapture and loses castling, and then ...Ng4 hits the loose e5-pawn and f2 at once. White cannot hold everything.",
    },
  ],

  modelGames: [
    {
      label: "Classical: pin, knight, break",
      sans: sans("e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O Bg4 Be3 Nc6 Qd2 e5 d5 Ne7 Rad1 Bxf3 Bxf3 c6"),
      summary: "The whole plan in eleven moves: bishop, castle, pin the f3-knight, second knight to c6, then ...e5. When White closes with d5 the knight reroutes via e7 and you chip at the chain with ...c6.",
    },
    {
      label: "Austrian: castle and strike",
      sans: sans("e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Bd3 Nc6 Be3 e5 fxe5 dxe5 d5 Nd4 Nxd4 exd4 Bxd4 Nxe4 Nxe4 Bxd4"),
      summary: "White grabs space with f4 and aims at your king. You castle immediately, hit d4 with the knight, and push ...e5 before the storm has any pieces behind it. The centre opens and the g7-bishop comes alive.",
    },
    {
      label: "Against Be3 and Qd2: queenside first",
      sans: sans("e4 d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 c6 f3 b5 Bh6 Bxh6 Qxh6 Qa5 Bd3 Nbd7 Nge2 e5"),
      summary: "White sets up the Bh6 trade. You do not fight it: ...c6 and ...b5 start your own play, the queen comes to a5, and once the bishops are off you break with ...e5 as usual.",
    },
  ],

  middlegamePlan:
    "You have conceded space, so your middlegame is about using it against White. Keep the g7-bishop unless trading it wins something; it is your best piece once the centre opens. " +
    "If the centre is still closed after ...e5 d5, reroute the knight via e7 and prepare ...f5 or ...c6, and put the rook on e8 behind the pawn. " +
    "If the centre has opened, occupy d4 or e5 with a knight and use the half-open files for your rooks. " +
    "Against a kingside pawn storm, trade the attacking pieces and hit back in the centre rather than defending passively. Your king is safe behind the fianchetto as long as the bishop is there.",

  structureDiagram: {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 5 6",
    orientation: "black",
    arrows: [
      { from: "e7", to: "e5" },
      { from: "g7", to: "d4" },
    ],
    caption: "The Pirc picture: bishop on g7, king castled, and the e-pawn ready to strike at the centre White has been given.",
  },
};
