// King's Indian Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const kingsIndian: OpeningSpec = {
  id: "kings-indian",
  name: "King's Indian Defence",
  eco: "E60–E99",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 Nf6 2.c4 g6",
  tabiyaFen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  pitch:
    "Let White build the big centre, then hit it. ...Nf6, ...g6, ...Bg7, ...O-O, ...d6 and the strike ...e5 — the same five moves against everything, " +
    "and a kingside attack that beginners love to play and hate to face.",

  setup: {
    pieces: [
      { piece: "B", squares: ["g7"], why: "The fianchettoed bishop: it guards the king and aims at d4 and the long diagonal." },
      { piece: "N", squares: ["f6", "e8", "d7", "h5"], why: "The king's knight starts on f6 and later steps aside (e8/d7) so the f-pawn can advance." },
      { piece: "N", squares: ["c6", "d7", "a6", "e7"], why: "The queen's knight: c6 to hit d4, or d7; after d5 it reroutes to e7." },
    ],
    pawns: ["g6", "d6"],
    order: [{ before: "d6", after: "e5", why: "...d6 first. ...e5 without ...d6 lets dxe5 take the pawn with nothing to recapture." }],
    castle: "O-O",
    castleBy: 6,
  },

  ideas: [
    {
      id: "kid-let-them-build",
      title: "Let them build the centre, then strike",
      oneLiner: "You don't fight for the centre with pawns early. You develop, castle, and hit it with ...e5 when everything is ready.",
      why: "White's big centre (c4, d4, e4) is a target as much as an asset. ...Bg7 and ...e5 pressure d4; when White pushes d5 the centre locks and your kingside attack begins.",
    },
    {
      id: "kid-d6-not-d5",
      title: "...d6, not ...d5",
      oneLiner: "The pawn goes to d6, supporting ...e5. ...d5 hands White a big centre with tempo.",
      why: "After ...d5 exd5 White's pawns roll forward and your bishop on g7 stares at a wall. ...d6 keeps the position flexible and prepares the real strike.",
    },
    {
      id: "kid-castle-fast",
      title: "Castle by move 5 or 6",
      oneLiner: "...Bg7 then ...O-O before anything else. Your king is safest behind the fianchetto.",
      why: "Everything in the King's Indian depends on a safe king: the ...e5 strike, the ...f5 attack, and rerouting the knights all need the king tucked away first.",
    },
    {
      id: "kid-e5",
      title: "The strike: ...e5",
      oneLiner: "Once ...d6 and ...O-O are in, ...e5 asks d4 the question: push, take, or hold.",
      why: "If dxe5 dxe5, the queens may come off — that's fine, you're equal and solid. If d5, the centre locks and you start the kingside attack. If White holds, keep the tension with ...Nc6.",
      trigger: { kind: "epd", epds: [] },
    },
    {
      id: "kid-vs-d5",
      title: "When White plays d5: ...Ne7 and ...f5",
      oneLiner: "The centre is locked. Reroute: ...Ne7, then ...Nd7 or ...Ne8 so the f-pawn can go ...f5.",
      why: "A locked centre means a race on the wings. Your race is ...f5, ...f4, ...g5, rook lifts. White's is c5 and b4–b5. Whoever attacks faster wins, so don't defend — attack.",
      trigger: { kind: "opponent_piece_on", piece: "P", squares: ["d5"] },
      response: "...Ne7 (if the knight is on c6), then ...Nd7/...Ne8 and ...f5.",
    },
    {
      id: "kid-vs-f4",
      title: "Against f4 (Four Pawns): hit with ...c5",
      oneLiner: "Four pawns is too many. ...c5 undermines d4 before White's attack starts.",
      why: "The Four Pawns Attack leaves White behind in development. ...c5 forces d5 (then ...e6 breaks it) or dxc5, and their over-extended pawns become targets.",
      trigger: { kind: "opponent_san", sans: ["f4"] },
      response: "...O-O then ...c5.",
    },
    {
      id: "kid-vs-fianchetto",
      title: "Against g3: ...d6, ...Nbd7, then ...e5",
      oneLiner: "The Fianchetto is quiet. Prepare ...e5 with ...Nbd7 first so dxe5 doesn't win a pawn.",
      why: "With the bishop on g2 White has no direct attack. ...Nbd7 supports ...e5; then ...e5 and you're comfortable.",
      trigger: { kind: "opponent_san", sans: ["g3"] },
      response: "...O-O, ...d6, ...Nbd7, ...e5.",
    },
    {
      id: "kid-book-end",
      title: "When the book runs out",
      oneLiner: "Locked centre → ...f5, ...f4, ...g5, ...Rf7–g7. Open centre → pieces to the centre and trade when equal.",
      why: "The King's Indian is a race on opposite wings. Push your kingside pawns and pieces at maximum speed; passive defence loses.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — then ...g6, ...Bg7, ...O-O, ...d6.", why: "The main move, and what the King's Indian answers." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...g6 and ...Bg7 — the same five moves.", why: "The English. Your setup doesn't change." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7, ...O-O.", why: "Flexible; your setup fits whatever follows." },
        { san: "e4", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nf6, ...g6 and ...Bg7 — that's the Pirc: the same fianchetto and the same ...e5 strike.", why: "Your King's Indian structure transfers almost move for move." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 — two fianchettos facing each other.", why: "A quiet setup." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 — and ...d5 or ...e5 is easy to get.", why: "Passive." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...d6 — normal.", why: "Usually transposes." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7, ...d5 — take the centre they ignored.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...g6 — and note f4 loosens their king.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7, ...d5.", why: "Timid." },
      ],
    },
    [P("d4")]: { yourMove: { san: "Nf6", why: "Develop first; keep the d-pawn back so ...d6 and ...e5 stay available." } },
    [P("d4 Nf6")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "g6", howToAnswer: "...g6 — the King's Indian.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O, ...d6.", why: "Same setup." },
        { san: "Bf4", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O, ...d6, then ...c5 or ...Nbd7–e5 ideas.", why: "The London. Your setup works fine against it." },
        { san: "Bg5", verdict: "dubious", answer: "Ne4", howToAnswer: "...Ne4 — hits the bishop; after Bf4 or Bh4, ...c5 or ...d5.", why: "The Trompowsky. ...Ne4 asks it to move again." },
        { san: "e3", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O.", why: "Passive." },
        { san: "Nc3", verdict: "dubious", answer: "g6", howToAnswer: "...g6; watch for e4 — then ...d6 and normal play.", why: "Normal." },
        { san: "g3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O, ...d6, ...Nbd7, ...e5.", why: "Fianchetto." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4")]: { yourMove: { san: "g6", why: "Prepare the fianchetto. The bishop on g7 will be your best piece." } },
    [P("d4 Nf6 c4 g6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, then ...d6 or ...O-O.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O.", why: "Normal." },
        { san: "g3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...d6, ...Nbd7, ...e5.", why: "Fianchetto." },
        { san: "f3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...d6, then ...e5 or ...c5.", why: "Sämisch-style; slow." },
        { san: "e3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7; if Bxf6 Bxf6 you're happy.", why: "Trades a good bishop for a knight." },
        { san: "Bf4", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...d6.", why: "Normal." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3")]: { yourMove: { san: "Bg7", why: "Fianchetto complete next move; castle right after." } },
    [P("d4 Nf6 c4 g6 Nc3 Bg7")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "d6", howToAnswer: "...d6 — never ...d5 here.", why: "The classical centre." },
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...d6.", why: "Normal." },
        { san: "g3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...d6, ...Nbd7, ...e5.", why: "Fianchetto." },
        { san: "f3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...d6 and ...e5.", why: "Sämisch." },
        { san: "e3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O; ...h6 later if it annoys you.", why: "Normal." },
        { san: "Bf4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6; e4 can be met by ...Nh5 hitting the bishop.", why: "Normal." },
        { san: "d5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6, ...e5 or ...c6.", why: "Early; locks the centre before you commit." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4")]: {
      yourMove: { san: "d6", why: "The pawn supports ...e5 and keeps the position flexible. ...d5 would just give White a big centre with tempo." },
      mistakes: [
        { san: "d5", why: "In the King's Indian Black plays ...d6, not ...d5. After ...d5 exd5 White gets a big centre with tempo. Let them build it, then strike with ...e5." },
        { san: "e5", why: "Without ...d6, dxe5 takes the pawn and you're scrambling to get it back. ...d6 first, castle, then ...e5." },
      ],
      checkpoint: {
        question: "White has pawns on c4, d4 and e4. What's the King's Indian plan?",
        options: ["...d6, castle, then strike with ...e5.", "...d5 — hit the centre now.", "...c5 — hit d4 from the side."],
        correctIndex: 0,
        explanation: "Let White build; ...d6 prepares ...e5 and keeps everything flexible. ...d5 hands over a big centre with tempo; ...c5 is a different opening (the Benoni).",
      },
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...e5.", why: "The Classical." },
        { san: "f3", verdict: "good", answer: "O-O", howToAnswer: "...O-O; after Be3, ...e5.", why: "The Sämisch." },
        { san: "f4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...c5!", why: "The Four Pawns — over-extended." },
        { san: "Be2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...e5.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O; ...h6 or ...c5 next.", why: "Averbakh-style." },
        { san: "h3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...e5.", why: "Slow." },
        { san: "Be3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...e5 or ...Ng4!? hitting the bishop.", why: "Normal." },
        { san: "g3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...Nbd7, ...e5.", why: "Fianchetto." },
        { san: "Nge2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...e5.", why: "Slow." },
        { san: "d5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...e5 (or ...c6) and the ...f5 plan.", why: "Locks the centre early." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3")]: { yourMove: { san: "O-O", why: "King safe by move 5. Now ...e5 is coming." } },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O")]: {
      replies: [
        { san: "Be2", verdict: "good", answer: "e5", howToAnswer: "...e5 — the strike.", why: "Main line." },
        { san: "h3", verdict: "good", answer: "e5", howToAnswer: "...e5.", why: "Normal." },
        { san: "Be3", verdict: "good", answer: "e5", howToAnswer: "...e5 — if dxe5 dxe5 Qxd8 Rxd8, you're equal and fine.", why: "Normal." },
        { san: "Bd3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — Bd3 blocks the queen's guard of d4.", why: "Misplaced bishop." },
        { san: "g3", verdict: "good", answer: "e5", howToAnswer: "...e5.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — ask the bishop; then ...c5 or ...e5.", why: "Pins nothing important." },
        { san: "d5", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — lock it and start ...Ne8/...f5.", why: "Locks early." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2")]: {
      yourMove: { san: "e5", why: "The strike. d4 must decide: push d5 (centre locks, your attack starts), take (equal), or hold (keep the tension with ...Nc6)." },
      mistakes: [
        { san: "b6", why: "Don't drift. The King's Indian lives on the central strike — slow moves like ...b6 let White's space suffocate you. ...e5 now." },
        { san: "c5", why: "Playable, but that's a Benoni — a different set of plans. In the King's Indian the strike is ...e5." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — keep the tension on d4.", why: "Main line." },
        { san: "d5", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 (or ...a5), then ...Nc5 and ...f5 ideas.", why: "The Petrosian." },
        { san: "dxe5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 — if Qxd8 Rxd8, the endgame is equal and comfortable.", why: "The Exchange: a draw-ish line." },
        { san: "Be3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 (…Ng4 hitting the bishop is the sharp alternative).", why: "Normal." },
        { san: "h3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O")]: {
      yourMove: { san: "Nc6", why: "Second attacker on d4. Now White usually pushes d5 — and your kingside plan begins." },
      mistakes: [{ san: "exd4", why: "Releases the tension: Nxd4 gives White a comfortable centre and your bishop stares at nothing. Keep pressing with ...Nc6." }],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "Ne7", howToAnswer: "...Ne7 — reroute; then ...Nd7 or ...Ne8 and ...f5.", why: "Main line: the centre locks." },
        { san: "Be3", verdict: "good", answer: "Ng4", howToAnswer: "...Ng4 — hits the bishop; after Bg5 f6, the bishop is chased.", why: "The Gligorić." },
        { san: "dxe5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 — equal; if Qxd8 Rxd8.", why: "Releases the tension." },
        { san: "Re1", verdict: "good", answer: "Re8", howToAnswer: "...Re8 — mirror; keep the tension.", why: "Waits." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5")]: {
      yourMove: { san: "Ne7", why: "Reroute: from e7 the knight covers d5 and f5, and the f6-knight can step to d7 or e8 to let ...f5 go." },
      mistakes: [
        { san: "Nd4", why: "Nxd4 exd4 Qxd4 — the knight is just lost for a pawn. Reroute to e7." },
        { san: "Nb4", why: "a3 sends it home to a6 — two moves wasted. ...Ne7 is the square." },
      ],
      checkpoint: {
        question: "White has pushed d5 and the centre is locked. What's your plan?",
        options: ["...Ne7, then ...Nd7/...Ne8 and ...f5 — a kingside attack.", "...Nd4 — centralise the knight.", "...a6 and ...b5 — attack on the queenside."],
        correctIndex: 0,
        explanation: "A locked centre means a race on the wings, and yours is the kingside: reroute the knights so the f-pawn can advance. ...Nd4 just gets taken; the queenside is White's side of the board.",
      },
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7")]: {
      replies: [
        { san: "Ne1", verdict: "good", answer: "Nd7", howToAnswer: "...Nd7, then ...f5.", why: "Main line: prepares f3 and Nd3." },
        { san: "b4", verdict: "good", answer: "Nh5", howToAnswer: "...Nh5, then ...f5.", why: "The Bayonet Attack." },
        { san: "Nd2", verdict: "good", answer: "Nd7", howToAnswer: "...Nd7, ...f5.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — if Be3, ...f5 comes anyway; if Bh4, ...g5 gains time.", why: "Provocative." },
        { san: "Qc2", verdict: "dubious", answer: "Nd7", howToAnswer: "...Nd7, ...f5.", why: "Slow." },
      ],
    },

    // --- Fianchetto ---------------------------------------------------------------------------------------
    [P("d4 Nf6 c4 g6 Nf3")]: { yourMove: { san: "Bg7", why: "Fianchetto, castle next." } },
    [P("d4 Nf6 c4 g6 Nf3 Bg7")]: {
      replies: [
        { san: "g3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...d6, ...Nbd7, ...e5.", why: "The Fianchetto." },
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...d6, then ...e5 after e4.", why: "Classical." },
        { san: "e3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6.", why: "Passive." },
        { san: "Bf4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6.", why: "London-style." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O; ...h6 later.", why: "Normal." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nf3 Bg7 g3")]: { yourMove: { san: "O-O", why: "Castle first; ...d6 and ...Nbd7 prepare ...e5." } },
    [P("d4 Nf6 c4 g6 Nf3 Bg7 g3 O-O")]: {
      replies: [
        { san: "Bg2", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nbd7 and ...e5.", why: "Main line." },
        { san: "Nc3", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nbd7.", why: "Normal." },
        { san: "b3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...e5 — the double fianchetto is slow.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nf3 Bg7 g3 O-O Bg2")]: { yourMove: { san: "d6", why: "Prepare ...e5; ...Nbd7 supports it first." } },
    [P("d4 Nf6 c4 g6 Nf3 Bg7 g3 O-O Bg2 d6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...e5.", why: "Main line." },
        { san: "Nc3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, ...e5.", why: "Normal." },
        { san: "d5", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Nc5 or ...e5.", why: "Early lock." },
        { san: "b3", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, ...e5.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nf3 Bg7 g3 O-O Bg2 d6 O-O")]: {
      yourMove: { san: "Nbd7", why: "Support ...e5 before playing it — otherwise dxe5 dxe5 Nxe5 nets a pawn." },
      mistakes: [{ san: "e5", why: "dxe5 dxe5 Nxe5 — the pawn falls (…Qxd1 Rxd1 doesn't get it back). ...Nbd7 first, then ...e5." }],
    },

    // --- Sämisch & Four Pawns -----------------------------------------------------------------------------
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3")]: { yourMove: { san: "O-O", why: "Castle first; ...e5 comes next against the Sämisch." } },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O")]: {
      replies: [
        { san: "Be3", verdict: "good", answer: "e5", howToAnswer: "...e5 — if d5, ...Nh5 and ...f5.", why: "Main line." },
        { san: "Nge2", verdict: "good", answer: "e5", howToAnswer: "...e5 (or ...c5).", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...e5 or ...a6/...Rb8 with ...b5.", why: "Aims at f6." },
        { san: "Be2", verdict: "dubious", answer: "e5", howToAnswer: "...e5.", why: "Normal." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3")]: { yourMove: { san: "e5", why: "The strike, as always. If d5, ...Nh5 and ...f5; if dxe5 dxe5, equal." } },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4")]: { yourMove: { san: "O-O", why: "Castle, then ...c5 to undermine the over-extended centre." } },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4 O-O")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "c5", howToAnswer: "...c5! If d5, ...e6 breaks it; if dxc5, ...Qa5.", why: "Main line." },
        { san: "Be2", verdict: "good", answer: "c5", howToAnswer: "...c5.", why: "Normal." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 fxe5 Nfd7 — the e5-pawn is a target.", why: "Over-extends further." },
        { san: "Be3", verdict: "dubious", answer: "c5", howToAnswer: "...c5.", why: "Normal." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4 O-O Nf3")]: {
      yourMove: { san: "c5", why: "Against four pawns, hit d4 from the side right away: White's centre is over-extended and under-developed." },
      mistakes: [{ san: "e5", why: "Here ...e5 helps White: fxe5 dxe5 d5 and the centre is theirs. Against f4 the strike is ...c5." }],
    },
  },

  traps: [],

  modelGames: [
    { label: "Classical Variation", sans: sans("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6"), summary: "Develop, castle, ...d6 then the ...e5 strike; ...Nc6 keeps the tension until White pushes d5." },
    { label: "Fianchetto Variation", sans: sans("d4 Nf6 c4 g6 Nf3 Bg7 g3 O-O Bg2 d6 O-O Nbd7"), summary: "Against the quiet g3 setup, ...Nbd7 supports ...e5 so the strike doesn't drop a pawn." },
    { label: "Sämisch Variation", sans: sans("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 e5"), summary: "f3 is slow; castle and strike with ...e5 as usual." },
    { label: "Four Pawns Attack", sans: sans("d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4 O-O Nf3 c5"), summary: "Four pawns is too many: ...c5 undermines d4 while White is behind in development." },
  ],

  middlegamePlan:
    "The King's Indian is a race on opposite wings. Once ...e5 meets d5 and the centre LOCKS, Black attacks the king: play ...f5 (then ...f4), reroute the f6-knight (...Ne8 or ...Nd7) so the f-pawn can roll, lift a rook (...Rf6–h6), and throw ...g5–g4 at the white king. " +
    "White counters on the queenside with c5 and b4–b5, opening the c-file. Whoever's attack arrives first wins — so don't defend passively; push your kingside pawns and pieces at maximum speed.",

  structureDiagram: {
    fen: "r1bq1rk1/ppp2pbp/2np1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 2 8",
    orientation: "black",
    arrows: [{ from: "f7", to: "f5" }],
    caption: "The Classical King's Indian: king castled, ...d6 and ...e5 in, ...Nc6 pressing d4. When d5 comes, the knights reroute and ...f5 launches the attack.",
  },
};
