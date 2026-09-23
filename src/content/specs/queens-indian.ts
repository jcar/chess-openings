// Queen's Indian Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// One square decides the opening: e4. You do not occupy the centre, you
// control it from a distance with the bishop on b7 and the knight on f6, and
// as soon as a White knight lands on c3 your knight jumps to e4 and asks it a
// question. Everything else is calm development: ...Be7, castle, then ...c5
// or ...d5 when the pieces are ready. Against 4.a3 you take the centre with
// ...d5 instead, and against 4.e3 you play the same moves and castle.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const queensIndian: OpeningSpec = {
  id: "queens-indian",
  name: "Queen's Indian Defence",
  aliases: ["QID"],
  eco: "E12–E19",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 Nf6 2.c4 e6 3.Nf3 b6",
  tabiyaFen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4",
  pitch:
    "Put a bishop on b7 and fight for e4 from a distance: White never gets the two centre pawns side by side, and your position has no weak points to attack. " +
    "The moves are the same against almost every White setup, the knight jump to e4 is the one tactic to learn, and the traps in this opening mostly catch White.",

  setup: {
    pieces: [
      { piece: "B", squares: ["b7", "a6"], why: "The Queen's Indian bishop. From b7 it controls e4 and looks at g2; on a6 it hits c4 instead and makes White play b3. It goes out before the knight jumps." },
      { piece: "N", squares: ["f6", "e4"], why: "The king's knight watches e4 from f6 and jumps there the moment a White knight lands on c3. Backed by the b7-bishop it is hard to remove." },
      { piece: "B", squares: ["e7", "b4"], why: "The dark bishop. Modest on e7 so you can castle quickly; on b4 when White's knight is on c3 and you want the Nimzo pin as well." },
      { piece: "N", squares: ["d7"], why: "The queen's knight sits behind the pawns, not in front of the b7-bishop. From d7 it supports ...c5 and ...e5 without blocking the long diagonal." },
      { piece: "Q", squares: ["e7", "c7"], why: "The queen stays off the d-file and backs the pawn breaks: e7 behind ...e5, c7 behind ...c5." },
    ],
    pawns: ["e6", "b6"],
    order: [
      {
        before: "Bb7|Ba6",
        after: "Ne4",
        why: "Bishop first, then the knight jump. The knight on e4 is only safe because the b7-bishop guards it; jump before the bishop is out and Nfd2 or Qc2 chases it while the g2-bishop suddenly sees your queenside.",
      },
    ],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "qid-e4",
      title: "The fight is about e4",
      oneLiner: "You control e4 with pieces instead of occupying it with pawns. Deny it and White's centre never forms.",
      why: "White's dream after d4 and c4 is e4: two centre pawns together and your pieces pushed back. The Queen's Indian says no from a distance. The f6-knight covers e4, the b7-bishop covers e4, and later ...d5 or ...f5 can add a pawn. If White never gets e4 for free, the space advantage stays symbolic and your position has no weaknesses to attack.",
    },
    {
      id: "qid-bishop-first",
      title: "Bishop out before the knight jumps",
      oneLiner: "...b6 and ...Bb7 come before ...Ne4. The bishop is what makes the knight safe.",
      why: "A knight on e4 with nothing behind it is a target: Nfd2 or Qc2 hits it, and if White's f3-knight moves, the g2-bishop looks straight at your b7. With the bishop already on b7 the knight is guarded and the jump gains time. Order matters more than speed here.",
      trigger: { kind: "opponent_san", sans: ["g3"] },
      response: "...Bb7, then ...Be7 and castle. The knight waits for a knight on c3.",
    },
    {
      id: "qid-ne4",
      title: "When a knight lands on c3, jump to e4",
      oneLiner: "...Ne4 hits c3 and asks the question. Qc2 Nxc3 Qxc3 and you have traded your way to an easy game.",
      why: "The knight on c3 is the piece that would support e4. Your knight lands on e4, attacks it, and cannot be kicked cheaply: Nxe4 Bxe4 puts your bishop on the same square, Bd2 lets ...Bf6 lean on d4, and Qc2 Nxc3 Qxc3 trades a pair of knights and leaves you ...c5 with a comfortable position. Watch for one thing: if White plays Qc2, the knight is attacked twice, so take on c3 at once.",
      trigger: { kind: "opponent_piece_on", piece: "N", squares: ["c3"] },
      response: "...Ne4. If Qc2, take on c3 immediately.",
      ifIgnored: "White gets Qc2 and e4 in, and the b7-bishop spends the game looking at a pawn.",
    },
    {
      id: "qid-g2-first",
      title: "When the f3-knight moves, look at g2",
      oneLiner: "Ne5, Ng5 or Nd2 opens two diagonals at once: theirs onto b7, yours onto g2. Take on g2 first.",
      why: "The knights on f3 and your bishop on b7 stand on the same long diagonal as the g2-bishop. Whenever the f3-knight moves, both bishops can take. If it is your move, ...Bxg2 first and then deal with whatever the knight threatened; if you deal with the knight first, Bxb7 comes with the same idea for White. This is how most of the material in the Queen's Indian changes hands.",
      trigger: { kind: "opponent_san", sans: ["Ne5", "Ng5", "Nfd2", "Ne1", "Nh4"] },
      response: "...Bxg2 first, then answer the knight.",
    },
    {
      id: "qid-petrosian",
      title: "Against 4.a3: take the centre with ...d5",
      oneLiner: "a3 stops ...Bb4, so play ...Bb7, ...d5, and recapture on d5 with the knight.",
      why: "The Petrosian move a3 spends a whole tempo to keep your bishop off b4. Use it: ...Bb7 and ...d5 claim the centre, and after cxd5 you recapture with the knight so the b7-bishop's diagonal stays open. ...Nxc3 and ...Be7 follow and you castle into a healthy position while White's doubled c-pawns wait to be attacked with ...c5.",
      trigger: { kind: "opponent_san", sans: ["a3"] },
      response: "...Bb7, ...d5, and after cxd5 recapture ...Nxd5.",
    },
    {
      id: "qid-d5-bait",
      title: "The d5-pawn is bait",
      oneLiner: "When White pushes d5 and trades, do not recapture with a piece that the queen on d1 can take.",
      why: "After d5 exd5 cxd5 the d-file is open and White's queen sees d5 from d1. A knight or bishop that recaptures there is defended only by pieces that may be gone or blocked, and Qxd5 wins it. Look at what still guards d5 before you take: usually the right answer is ...Bf6 or ...d6 and the pawn is dealt with later.",
      trigger: { kind: "opponent_san", sans: ["d5"] },
      response: "...exd5, then count what defends d5 before recapturing.",
    },
    {
      id: "qid-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, put the knight on d7, and break with ...c5 or ...d5 when the b7-bishop is on an open diagonal.",
      why: "Your position is solid and your bishop is your best piece. Keep the long diagonal open, meet e4 with ...d5 or a trade, and put the rooks on c8 and e8. If White's knights leave f3 or c3, look for ...Bxg2 and ...Ne4 tricks. There is no rush: White has to prove the extra space means something.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...b6 once a knight is on f3.", why: "The main move; the Queen's Indian answers it." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...b6 — the same setup works against the English.", why: "Your fianchetto fits the English exactly." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...b6 and ...Bb7 whatever White does next.", why: "Flexible; the setup is the same." },
        { san: "e4", verdict: "good", answer: "e6", howToAnswer: "...e6 — the French. Same pawn, same idea of controlling the centre from behind it.", why: "Not a Queen's Indian game, but the French is its nearest relative." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...b6, ...Bb7 — the bishops meet on the long diagonal.", why: "Quiet." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...d5 — take the centre the knight is not fighting for.", why: "Usually transposes." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 — take the centre they ignored.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 — a normal centre beats Bird's Opening.", why: "It loosens their king for no gain." },
      ],
    },
    [P("d4")]: { yourMove: { san: "Nf6", why: "Develop and cover e4. The d-pawn stays home so you can choose later between ...d5 and ...c5." } },
    [P("d4 Nf6")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6 — open the bishop. ...b6 follows once a knight is on f3.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6 — if c4, ...b6; if Bg5 or Bf4, ...b6 anyway.", why: "Flexible." },
        { san: "Bf4", verdict: "good", answer: "e6", howToAnswer: "...e6, ...b6, ...Bb7 — the London with your bishop on the long diagonal.", why: "Solid and slow." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — if Bxf6 Qxf6 you have a fine position and no pin.", why: "The Trompowsky." },
        { san: "e3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...b6, ...Bb7 — normal.", why: "Passive." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — stop e4; then ...e6 and ...Be7.", why: "The Veresov. Take e4 away with a pawn." },
        { san: "g3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...b6, ...Bb7 — bishops on the same diagonal.", why: "A fianchetto." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Nothing defends e4." },
        { san: "c3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...b6, ...Bb7.", why: "Timid." },
      ],
    },
    [P("d4 Nf6 c4")]: {
      yourMove: { san: "e6", why: "Open the f8-bishop and keep both ...b6 and ...Bb4 available. Which one you play depends on where White's knight goes." },
    },
    [P("d4 Nf6 c4 e6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "b6", howToAnswer: "...b6 — the Queen's Indian. ...Bb7 next.", why: "White keeps the knight off c3 to avoid the Nimzo pin, so you fight for e4 with the bishop instead." },
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — the Nimzo-Indian. Pin the knight that would support e4.", why: "With a knight on c3 the pin is the better version of the same idea." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5 — the Catalan. Take the centre; ...Be7, castle and ...dxc4 later.", why: "White's bishop will look at your queenside from g2, so keep d5 covered." },
        { san: "e3", verdict: "dubious", answer: "b6", howToAnswer: "...b6, ...Bb7, ...Be7 — the same setup.", why: "Shuts in the c1-bishop." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — ask the bishop. Bxf6 Qxf6 is comfortable for you.", why: "A pin before there is anything behind it." },
        { san: "Bf4", verdict: "dubious", answer: "b6", howToAnswer: "...b6 and ...Bb7 — develop normally.", why: "London-style." },
        { san: "a3", verdict: "dubious", answer: "b6", howToAnswer: "...b6, ...Bb7 — White spent a move stopping ...Bb4.", why: "A tempo for you." },
        { san: "Nd2", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — take the centre; the knight on d2 blocks their bishop.", why: "Passive." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3")]: {
      yourMove: { san: "b6", why: "The Queen's Indian. The bishop is coming to b7 to control e4 from a distance." },
      note: "...Bb4+ (the Bogo-Indian) and ...d5 (the Queen's Gambit Declined) are also fine here. This spec follows ...b6.",
    },
    [P("d4 Nf6 c4 e6 Nf3 b6")]: {
      replies: [
        { san: "g3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — the bishops will face each other on the long diagonal.", why: "The main line. White contests the diagonal before you settle on it." },
        { san: "a3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, then ...d5 — the Petrosian; take the centre since ...Bb4 is stopped.", why: "Spends a move to keep your bishop off b4." },
        { san: "e3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, ...Be7, castle, then ...d5.", why: "Solid and a little slow." },
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin the knight. You are in a Nimzo-Indian with ...b6 already played.", why: "The knight arrives on c3, so pin it." },
        { san: "Bg5", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, then ...h6 to ask the bishop, and ...Be7.", why: "A pin with no real threat behind it." },
        { san: "Bf4", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7 and ...Be7.", why: "The bishop has no target on f4." },
        { san: "Nbd2", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7, then ...Be7 and castle. If e4, ...Nxe4 wins a pawn after Nxe4 Bxe4.", why: "Blocks the c1-bishop." },
        { san: "Qc2", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7, then ...Bb4 if Nc3 comes.", why: "An early queen." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Bb7 — and do NOT take on d5 with the knight: Qxd5 wins it.", why: "Overextends; the pawn on d5 is a target, not a threat." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Nothing defends e4." },
      ],
    },

    // --- 4.g3: the main line --------------------------------------------------
    [P("d4 Nf6 c4 e6 Nf3 b6 g3")]: {
      yourMove: { san: "Bb7", why: "The Queen's Indian bishop takes the long diagonal before the knight does anything." },
      note: "...Ba6, hitting c4, is the sharper alternative: after b3 Bb4+ Bd2 Be7 you have made White play b3 for free.",
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7")]: {
      replies: [
        { san: "Bg2", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — develop calmly and castle.", why: "The main line. The bishops face off." },
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin it; you have both a Nimzo and a Queen's Indian.", why: "The knight arrives before the bishop on g2." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2")]: {
      yourMove: { san: "Be7", why: "Develop and prepare to castle. The knight jump waits for a knight on c3." },
      mistakes: [
        { san: "Ne4", why: "Nfd2 asks the knight to leave, and once the f3-knight has moved the g2-bishop stares at b7. You lose time and your best bishop." },
        { san: "c5", why: "d5! shuts your bishop's diagonal and opens White's. Castle first; ...c5 comes later." },
        { san: "Bxf3", why: "Bxf3 and you have handed White the bishop pair for nothing. The b7-bishop is your best piece." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — both kings safe; now wait for Nc3.", why: "The main line." },
        { san: "Nc3", verdict: "good", answer: "Ne4", howToAnswer: "...Ne4 — hit c3 before White castles. After Qc2 Nxc3 Qxc3 O-O you are in the main line a move early.", why: "The knight arrives before castling; jump at once." },
        { san: "Qc2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...c5.", why: "Prepares e4 slowly." },
        { san: "b3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...d5.", why: "A second fianchetto." },
        { san: "Nbd2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...d5.", why: "Avoids the ...Ne4 hit on c3." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 — then after cxd5, ...Nxd5 is fine because the b7-bishop guards it. Watch for Nd4 later, when the g2-bishop sees b7.", why: "Overextends before castling." },
        { san: "Ne5", verdict: "bad", answer: "Bxg2", howToAnswer: "...Bxg2 — the knight left the diagonal and White's king is on e1, so nothing recaptures. You win a bishop and the h1-rook is next.", why: "The knight jump with the king still uncastled hangs the g2-bishop." },
        { san: "Bf4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...d6 and ...Nbd7.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...h6.", why: "A pin with no bite." },
        { san: "e3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...d5.", why: "Passive." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O")]: {
      yourMove: { san: "O-O", why: "King first. Every trick in this opening works better with your king on g8." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Ne4", howToAnswer: "...Ne4 — hit the knight that would support e4.", why: "The main line and the moment the opening comes alive." },
        { san: "b3", verdict: "good", answer: "d5", howToAnswer: "...d5 — take the centre; ...Nbd7 and ...c5 next.", why: "No knight on c3 to hit, so claim d5." },
        { san: "Re1", verdict: "good", answer: "d5", howToAnswer: "...d5 — the rook prepares e4, so stop it with a pawn.", why: "Prepares e4." },
        { san: "Qc2", verdict: "good", answer: "d5", howToAnswer: "...d5 — the queen wants e4; take the square first.", why: "Prepares e4." },
        { san: "Nbd2", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...c5.", why: "Prepares e4 while avoiding ...Ne4." },
        { san: "Bf4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...c5 — the bishop on f4 has nothing to do.", why: "Passive." },
        { san: "Ne5", verdict: "dubious", answer: "Bxg2", howToAnswer: "...Bxg2 Kxg2 c5 — trade the bishops and hit d4 while the knight is loose.", why: "The knight jump opens the diagonal for both sides; you take first." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Nxd5 — the b7-bishop guards the knight. You are a pawn up.", why: "Overextends." },
        { san: "Bg5", verdict: "dubious", answer: "Ne4", howToAnswer: "...Ne4 — hit the bishop; Bxe7 Qxe7 and your knight is centralised.", why: "The pin runs into the knight jump." },
        { san: "a3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 and ...c5.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3")]: {
      yourMove: { san: "Ne4", why: "The Queen's Indian jump. The knight hits c3, sits on the square White wanted for a pawn, and is guarded by the b7-bishop." },
      mistakes: [
        { san: "c5", why: "d5! and the pawn cannot be taken: exd5 cxd5 Nxd5 Nxd5 Bxd5 Qxd5 wins a piece for White. Your bishop is shut in for the game." },
        { san: "d6", why: "d5 again, and your bishop stares at a pawn. The Queen's Indian bishop needs the diagonal open." },
      ],
      note: "...d5 is a solid alternative if you would rather not calculate; the knight jump is the plan this spec follows.",
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4")]: {
      replies: [
        { san: "Qc2", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 — at once. The knight is attacked twice; take before it is taken.", why: "The main line. The queen hits e4 a second time." },
        { san: "Nxe4", verdict: "good", answer: "Bxe4", howToAnswer: "...Bxe4 — your bishop takes the square. If Ne1 or Nd2, ...Bxg2 and ...d5.", why: "Trades the knights and puts your bishop in the centre." },
        { san: "Bd2", verdict: "good", answer: "Bf6", howToAnswer: "...Bf6 — lean on d4; the knight stays where it is.", why: "Defends c3 quietly." },
        { san: "Ne5", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 Bxg2 Kxg2 d6 — trade everything and kick the knight.", why: "The knight jump opens the diagonal; you take first." },
        { san: "Qb3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 Qxc3 c5 — same as the main line.", why: "Like Qc2 but the queen is worse placed." },
        { san: "d5", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 exd5 cxd5 Bf6 — take the knight first, then the pawn, and do not recapture on d5 with a piece.", why: "Overextends while the knight on c3 is attacked." },
        { san: "Bf4", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 d6 — White's pawns are doubled.", why: "Ignores the threat to c3." },
        { san: "Qd3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 Qxc3 c5.", why: "Like Qc2." },
        { san: "Nb5", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — kick the knight; it has nowhere useful to go.", why: "A knight on the edge." },
        { san: "Ng5", verdict: "bad", answer: "Nxg5", howToAnswer: "...Nxg5 Bxg5 Bxg2 Kxg2 Bxg5 — take the g2-bishop BEFORE you take on g5, and you win a knight.", why: "Both White knights have left the long diagonal. Take in the right order and a piece falls." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2")]: {
      yourMove: { san: "Nxc3", why: "The knight is attacked twice and defended once. Take now; ...c5 follows." },
      mistakes: [
        { san: "c5", why: "Nxe4 Bxe4 Qxe4 — the knight was attacked twice. You lose a piece." },
        { san: "Bf6", why: "Nxe4 Bxe4 Qxe4 — same problem. Deal with the knight first." },
        { san: "d6", why: "Nxe4 Bxe4 Qxe4 — a piece gone. The knight had to move or take." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3")]: {
      replies: [
        { san: "Qxc3", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit d4 and open the c-file.", why: "The main recapture." },
        { san: "bxc3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit d4; the doubled c-pawns are a long-term target and ...Na5 eyes c4.", why: "Keeps the queen active but doubles the pawns." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3")]: {
      yourMove: { san: "c5", why: "Hit d4 and open the c-file. Your bishop pair is aimed at the centre and White has nothing to attack." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 c5")]: {
      replies: [
        { san: "Rd1", verdict: "good", answer: "d6", howToAnswer: "...d6 — cover e5 and c5; ...Bf6 and ...Nd7 next.", why: "The main line." },
        { san: "Be3", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nd7 and ...Bf6.", why: "Normal." },
        { san: "b3", verdict: "good", answer: "Bf6", howToAnswer: "...Bf6 — lean on d4.", why: "Normal." },
        { san: "dxc5", verdict: "good", answer: "bxc5", howToAnswer: "...bxc5 — open the b-file for your rook.", why: "Trades the tension." },
        { san: "Bf4", verdict: "good", answer: "d6", howToAnswer: "...d6 and ...Nd7.", why: "Normal." },
        { san: "Ne5", verdict: "dubious", answer: "Bxg2", howToAnswer: "...Bxg2 Kxg2 — then ...cxd4 or ...d6 and the knight is loose.", why: "The knight jump opens the diagonal for both sides." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Bxd5 — the queen on c3 does not see d5, so the pawn is free. If Rd1, trade ...Bxf3 first.", why: "A pawn push the queen cannot support." },
        { san: "Bg5", verdict: "bad", answer: "Bxg5", howToAnswer: "...Bxg5 Nxg5 Bxg2 Kxg2 Qxg5 — a knight for nothing.", why: "The bishop on g5 is defended only by the f3-knight, and the knight is pinned to g2 by your bishop." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 c5 Rd1")]: {
      yourMove: { san: "d6", why: "Cover e5 and give the knight the d7-square. Your bishop on f6 comes next." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 c5 Rd1 d6")]: {
      replies: [
        { san: "b3", verdict: "good", answer: "Bf6", howToAnswer: "...Bf6 — lean on d4; ...Qe7 and ...Nd7 follow.", why: "The main line." },
        { san: "dxc5", verdict: "good", answer: "bxc5", howToAnswer: "...bxc5 — open the b-file.", why: "Trades the tension." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 c5 Rd1 d6 b3")]: {
      yourMove: { san: "Bf6", why: "The dark bishop joins the fight for d4. Your two bishops now point at the centre and White has no targets." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 c5 Rd1 d6 b3 Bf6")]: {
      replies: [
        { san: "Bb2", verdict: "good", answer: "Qe7", howToAnswer: "...Qe7 — then ...Nd7 and ...Rfd8. The book is done.", why: "Normal." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Nxe4")]: {
      yourMove: { san: "Bxe4", why: "Your bishop takes the square the knight held. From e4 it is a nuisance on f3 and g2." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Nxe4 Bxe4")]: {
      replies: [
        { san: "Ne1", verdict: "good", answer: "Bxg2", howToAnswer: "...Bxg2 Nxg2 d5 — trade and take the centre.", why: "The knight retreats to challenge the bishop." },
        { san: "Bf4", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nd7 and ...Bf6.", why: "Normal." },
        { san: "Ne5", verdict: "good", answer: "Bxg2", howToAnswer: "...Bxg2 Kxg2 d6 — trade first, then kick the knight.", why: "The knight jumps and opens the diagonal; you take first." },
        { san: "Nd2", verdict: "dubious", answer: "Bxg2", howToAnswer: "...Bxg2 Kxg2 d5 — trade and take the centre.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "Bxg5", howToAnswer: "...Bxg5 Nxg5 Bxg2 Kxg2 h6 — trade everything and the knight has to leave.", why: "Runs into the trades." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Bf6 — do NOT take on d5 with the bishop: Qxd5 wins it.", why: "The push opens the d-file for White's queen." },
        { san: "Be3", verdict: "dubious", answer: "d6", howToAnswer: "...d6 and ...Nd7.", why: "Passive." },
        { san: "Ng5", verdict: "bad", answer: "Bxg2", howToAnswer: "...Bxg2 Kxg2 Bxg5 Bxg5 Qxg5 — a knight for nothing, as long as you take on g2 first.", why: "Both knights are off the diagonal and nothing holds g5 but a bishop you can trade." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Nxe4 Bxe4 d5")]: {
      yourMove: { san: "exd5", why: "Take the pawn that was pushed at you. The next move is the one that matters." },
      mistakes: [
        { san: "Bxf3", why: "Bxf3 and you have traded your best piece for a knight while the d5-pawn is still there. Take on d5 first." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Nxe4 Bxe4 d5 exd5")]: {
      replies: [
        { san: "cxd5", verdict: "good", answer: "Bf6", howToAnswer: "...Bf6 — develop with a hit on nothing yet, and leave d5 alone: the queen on d1 sees it.", why: "The recapture that opens the d-file." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Nxe4 Bxe4 d5 exd5 cxd5")]: {
      yourMove: { san: "Bf6", why: "Develop and leave the d5-pawn alone for now. The d-file is open and White's queen sees d5." },
      mistakes: [
        { san: "Bxd5", why: "Qxd5. Nothing defends the bishop on d5: your knight is gone and the queen on d8 is blocked by the d7-pawn." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Bd2")]: {
      yourMove: { san: "Bf6", why: "Lean on d4 and keep the knight where it is. If Nxe4 Bxe4, both bishops point at the centre." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3")]: {
      yourMove: { san: "Ne4", why: "Hit c3 before White castles. After Qc2 Nxc3 Qxc3 O-O you are in the main line a move early." },
      mistakes: [
        { san: "O-O", why: "Playable, but d5! exd5 cxd5 sets a trap: Nxd5 Nxd5 Bxd5 Qxd5 loses a piece. The knight jump keeps it simple." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 Nc3 Ne4")]: {
      replies: [
        { san: "Qc2", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 Qxc3 O-O — the main line by transposition.", why: "Hits the knight twice." },
        { san: "Bd2", verdict: "good", answer: "Bf6", howToAnswer: "...Bf6 — lean on d4.", why: "Quiet." },
        { san: "Nxe4", verdict: "good", answer: "Bxe4", howToAnswer: "...Bxe4, then castle.", why: "Trades the knights." },
      ],
    },

    // --- 4.a3: the Petrosian ---------------------------------------------------
    [P("d4 Nf6 c4 e6 Nf3 b6 a3")]: {
      yourMove: { san: "Bb7", why: "Develop the bishop. a3 has stopped ...Bb4, so your plan changes: ...d5 and the centre." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "d5", howToAnswer: "...d5 — take the centre. After cxd5, recapture with the knight.", why: "The main line of the Petrosian." },
        { san: "e3", verdict: "good", answer: "Be7", howToAnswer: "...Be7, castle, then ...d5.", why: "Quiet." },
        { san: "Bg5", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — break the pin; ...h6 later if you like.", why: "A pin with no real threat." },
        { san: "Qc2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Early queen." },
        { san: "g3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle — the main line with a3 thrown in.", why: "a3 was a wasted move in this setup." },
        { san: "Nbd2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Passive." },
        { san: "Bf4", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "No target on f4." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Nxd5 — the knight is guarded by the bishop. A pawn up.", why: "Overextends." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3")]: {
      yourMove: { san: "d5", why: "Claim the centre. With ...Bb4 stopped, this is your best use of the tempo White spent on a3." },
      mistakes: [
        { san: "Be7", why: "d5! and your bishop is shut in while White's pieces pour through. Take the centre first." },
        { san: "Bb4", why: "axb4. That is what a3 was for." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5")]: {
      replies: [
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 — with the knight, so the b7-bishop stays open and c3 is hit.", why: "The main line." },
        { san: "Bg5", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Normal." },
        { san: "e3", verdict: "good", answer: "Be7", howToAnswer: "...Be7, castle, then ...c5.", why: "Quiet." },
        { san: "Qa4+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — block with a pawn; ...Be7 next.", why: "A check that gains nothing." },
        { san: "Bf4", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Passive." },
        { san: "g3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Slow." },
        { san: "Qc2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Early queen." },
        { san: "Qb3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — d5 is held by three pieces.", why: "Early queen." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5")]: {
      yourMove: { san: "Nxd5", why: "Recapture with the knight. It keeps the b7-bishop's diagonal open and hits the c3-knight at once." },
      mistakes: [
        { san: "exd5", why: "Blocks your own bishop behind a pawn on d5. The knight recapture keeps the diagonal open and hits c3." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5")]: {
      replies: [
        { san: "Qc2", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 Be7 — White has doubled pawns and you castle.", why: "The main line." },
        { san: "e3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — if Bb5+, ...c6.", why: "Quiet." },
        { san: "e4", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 Be7 — castle and hit c4 with ...c5 later.", why: "Takes the centre at the cost of doubled pawns." },
        { san: "Bd2", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Normal." },
        { san: "Qa4+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — block; ...Be7 next.", why: "A check that gains nothing." },
        { san: "Bg5", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — if Bxe7 Qxe7 your queen is well placed.", why: "The bishop has nothing to pin." },
        { san: "Nxd5", verdict: "dubious", answer: "Bxd5", howToAnswer: "...Bxd5 — your bishop is centralised; ...Be7 and castle.", why: "Trades a knight for nothing." },
        { san: "Ne5", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 Bd6 — hit the knight.", why: "The knight jump can be answered with a trade and a hit." },
        { san: "g3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Slow." },
        { san: "Qb3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 Qxc3 Be7.", why: "Like Qc2." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2")]: {
      yourMove: { san: "Nxc3", why: "Trade and double White's pawns. The c4-square becomes a target for ...c5 and ...Nc6 later." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2 Nxc3")]: {
      replies: [
        { san: "bxc3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "The main recapture." },
        { san: "Qxc3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Keeps the pawns healthy but the queen is exposed to ...Bd6 and ...c5." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2 Nxc3 bxc3")]: {
      yourMove: { san: "Be7", why: "Develop and prepare to castle. ...c5 will hit the doubled pawns later." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2 Nxc3 bxc3 Be7")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...c5 — the doubled pawns are the target.", why: "The main line. White takes the centre." },
        { san: "e3", verdict: "good", answer: "O-O", howToAnswer: "...O-O and ...c5.", why: "Quiet." },
        { san: "Bf4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...c5.", why: "Passive." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2 Nxc3 bxc3 Be7 e4")]: {
      yourMove: { san: "O-O", why: "King safe. ...c5 next hits the doubled pawns." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2 Nxc3 bxc3 Be7 e4 O-O")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit the centre and the doubled pawns.", why: "The main line." },
        { san: "Be2", verdict: "good", answer: "c5", howToAnswer: "...c5.", why: "Normal." },
        { san: "Bb2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — the bishop on b2 stares at its own pawn.", why: "Passive." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2 Nxc3 bxc3 Be7 e4 O-O Bd3")]: {
      yourMove: { san: "c5", why: "The break. White's doubled c-pawns and the d4-pawn are under pressure and your bishops have open lines." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 e3")]: {
      yourMove: { san: "Be7", why: "Develop. If Bb5+, block with ...c6 and the bishop has to move again." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 e3 Be7")]: {
      replies: [
        { san: "Bb5+", verdict: "good", answer: "c6", howToAnswer: "...c6 — block with a pawn; the bishop must move again.", why: "A check that costs White a second bishop move." },
        { san: "Bd3", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 O-O — doubled pawns for White.", why: "Normal." },
        { san: "Be2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...c5.", why: "Passive." },
      ],
    },

    // --- 4.e3 -------------------------------------------------------------------
    [P("d4 Nf6 c4 e6 Nf3 b6 e3")]: {
      yourMove: { san: "Bb7", why: "The bishop takes the diagonal. Against e3 the plan is simple: ...Be7, castle, ...d5." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — castle next, then ...d5.", why: "The main line." },
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin the knight; ...O-O and ...d5 follow.", why: "The knight arrives on c3, so pin it." },
        { san: "Be2", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Modest." },
        { san: "b3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Slow." },
        { san: "Nbd2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Passive." },
        { san: "Qc2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Early queen." },
        { san: "a3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Slow." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Nxd5 — the bishop guards the knight. A pawn up.", why: "Overextends." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3")]: {
      yourMove: { san: "Be7", why: "Develop and castle. ...d5 or ...c5 comes once the king is safe." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3 Be7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — then ...d5.", why: "The main line." },
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...d5.", why: "Normal." },
        { san: "Qe2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — then ...d5 to stop e4.", why: "Prepares e4." },
        { san: "b3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...d5.", why: "Slow." },
        { san: "Nbd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...d5.", why: "Passive." },
        { san: "e4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 Bxe4 Bxe4 — the pawn was attacked twice and defended once. A pawn up.", why: "Pushes e4 before it is supported." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Nxd5 — a pawn up.", why: "Overextends." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3 Be7 O-O")]: {
      yourMove: { san: "O-O", why: "King safe. Now ...d5 takes e4 away for good." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3 Be7 O-O O-O")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "d5", howToAnswer: "...d5 — stop e4. ...Nbd7 and ...c5 next.", why: "The main line." },
        { san: "b3", verdict: "good", answer: "d5", howToAnswer: "...d5 and ...c5.", why: "Normal." },
        { san: "Nbd2", verdict: "good", answer: "d5", howToAnswer: "...d5 — the knight wants e4; take the square first.", why: "Prepares e4." },
        { san: "Qe2", verdict: "good", answer: "d5", howToAnswer: "...d5 — stop e4.", why: "Prepares e4." },
        { san: "e4", verdict: "good", answer: "d5", howToAnswer: "...d5 — hit the centre at once; after e5 Ne4 or exd5 exd5 your pieces are active.", why: "White gets e4 in; challenge it immediately." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3 Be7 O-O O-O Nc3")]: {
      yourMove: { san: "d5", why: "Take e4 away with a pawn. Your setup is complete and White has no way to open the position." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3 Be7 O-O O-O Nc3 d5")]: {
      replies: [
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — then ...Nbd7 and ...c5.", why: "Normal." },
        { san: "b3", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit d4.", why: "Normal." },
      ],
    },

    // --- 4.Nc3, 4.Bg5, 4.d5 ------------------------------------------------------
    [P("d4 Nf6 c4 e6 Nf3 b6 Nc3")]: {
      yourMove: { san: "Bb4", why: "A knight has landed on c3, so pin it. You have a Nimzo-Indian with ...b6 already in, and ...Bb7 next." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 Nc3 Bb4")]: {
      replies: [
        { san: "Bg5", verdict: "good", answer: "h6", howToAnswer: "...h6 Bh4 Bb7 — ask the bishop, then develop.", why: "The main try." },
        { san: "Qc2", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — if a3, ...Bxc3+ Qxc3 O-O.", why: "Normal." },
        { san: "e3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, castle, then ...d5.", why: "Quiet." },
        { san: "Qb3", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit d4; the queen guards c3 but not the centre.", why: "Defends c3 with the queen." },
        { san: "Bd2", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 and castle.", why: "Modest." },
        { san: "g3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — the bishops meet on the diagonal.", why: "Normal." },
        { san: "a3", verdict: "good", answer: "Bxc3+", howToAnswer: "...Bxc3+ bxc3 Bb7 — doubled pawns for White.", why: "Asks the question; take." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — the knight on c3 is pinned, so nothing takes back.", why: "The pinned knight does not defend e4." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 Bg5")]: {
      yourMove: { san: "Bb7", why: "Develop the bishop. ...h6 will ask the g5-bishop next." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 Bg5 Bb7")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "h6", howToAnswer: "...h6 — Bh4 Be7 or Bxf6 Qxf6, both comfortable.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "h6", howToAnswer: "...h6 Bh4 Be7 — or ...Bb4 if you want the pin as well.", why: "Normal." },
        { san: "Nbd2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Passive." },
        { san: "Qc2", verdict: "dubious", answer: "h6", howToAnswer: "...h6 and ...Be7.", why: "Early queen." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 Bg5 Bb7 e3")]: {
      yourMove: { san: "h6", why: "Ask the bishop. Whatever it does, you develop with ...Be7 or recapture with the queen." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 Bg5 Bb7 e3 h6")]: {
      replies: [
        { san: "Bh4", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Keeps the pin." },
        { san: "Bxf6", verdict: "good", answer: "Qxf6", howToAnswer: "...Qxf6 — the bishop pair and an easy game.", why: "Gives up the bishop." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 Bg5 Bb7 e3 h6 Bh4")]: {
      yourMove: { san: "Be7", why: "Break the pin for good and prepare to castle." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 Bg5 Bb7 e3 h6 Bh4 Be7")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Ne4 hits both the bishop and the knight.", why: "Normal." },
        { san: "Bd3", verdict: "good", answer: "O-O", howToAnswer: "...O-O and ...d5.", why: "Normal." },
        { san: "Nbd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...d5.", why: "Passive." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 d5")]: {
      yourMove: { san: "exd5", why: "Take the pawn that was pushed at you. ...Bb7 follows, not ...Nxd5." },
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 d5 exd5")]: {
      replies: [
        { san: "cxd5", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — hit the pawn with the bishop, not the knight.", why: "The recapture opens the d-file for White's queen." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 b6 d5 exd5 cxd5")]: {
      yourMove: { san: "Bb7", why: "Attack d5 with the bishop. The pawn is weak and your knight will pick it up when it is safe." },
      mistakes: [
        { san: "Nxd5", why: "Qxd5. The d-file is open and nothing guards the knight." },
      ],
    },
  },

  traps: [
    {
      name: "The d5 bait",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.g3 Bb7 5.Bg2 Be7 6.O-O O-O 7.Nc3 c5 8.d5 exd5 9.cxd5 Nxd5 10.Nxd5 Bxd5 11.Qxd5"),
      punisher: "white",
      tell: "You play ...c5 and White answers d5. Trading on d5 looks like it wins a pawn.",
      why: "After the trades the d-file is open and White's queen sees d5 from d1. Your knight recaptures, White's knight takes it, your bishop takes back, and Qxd5 collects a piece: the bishop on d5 has nothing behind it. Against d5 play ...exd5 and then ...d6 or ...Bf6, and never recapture with a piece the queen can take.",
    },
    {
      name: "Take the g2-bishop first",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.g3 Bb7 5.Bg2 Be7 6.O-O O-O 7.Nc3 Ne4 8.Ng5 Nxg5 9.Bxg5 Bxg2 10.Kxg2 Bxg5"),
      punisher: "black",
      tell: "White's knight jumps to g5 to hit your e4-knight a second time. Both White knights are now off the long diagonal.",
      why: "The order matters. ...Nxg5 Bxg5 and now ...Bxg2 first: the king recaptures and your bishop on e7 takes the g5-bishop for free. Take on g5 before g2 and White plays Bxb7 with the same trick against you.",
    },
    {
      name: "The queen sees d5",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.g3 Bb7 5.Bg2 Be7 6.O-O O-O 7.Nc3 Ne4 8.Nxe4 Bxe4 9.d5 exd5 10.cxd5 Bxd5 11.Qxd5"),
      punisher: "white",
      tell: "Your bishop is on e4, White pushes d5, and recapturing on d5 with the bishop looks free.",
      why: "The f3-knight blocks White's g2-bishop, so d5 looks undefended. It is not: the d-file is open and the queen on d1 sees straight down it. After ...exd5 cxd5, leave the pawn and play ...Bf6. The pawn is weak and will fall later; the bishop is not.",
    },
  ],

  modelGames: [
    {
      label: "Main line: the e4 jump",
      sans: sans("d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 c5 Rd1 d6 b3 Bf6 Bb2 Qe7"),
      summary: "Bishop to b7, castle, and the moment a knight lands on c3 your knight jumps to e4 and trades it. Then ...c5, ...d6 and ...Bf6 lean on d4 with both bishops.",
    },
    {
      label: "Petrosian 4.a3: take the centre",
      sans: sans("d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 Qc2 Nxc3 bxc3 Be7 e4 O-O Bd3 c5"),
      summary: "a3 stops the pin, so you claim d5 instead and recapture with the knight. White ends up with doubled c-pawns and you hit them with ...c5.",
    },
    {
      label: "4.e3: castle and stop e4",
      sans: sans("d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3 Be7 O-O O-O Nc3 d5 b3 c5"),
      summary: "Against the quiet setup you play the same moves, castle, and put a pawn on d5 so e4 never comes. Then ...c5 and the position is level with nothing to fear.",
    },
  ],

  middlegamePlan:
    "Keep the long diagonal open and keep e4 under control: that is the whole opening, and it is the whole middlegame too. " +
    "Put the queen's knight on d7, the queen on e7 or c7, and rooks on c8 and e8, then break with ...c5 against d4 or ...d5 to fix e4. " +
    "Whenever a White knight leaves f3 or c3, look for ...Bxg2 and ...Ne4 before anything else. " +
    "When White pushes d5, take with the pawn and count what guards d5 before recapturing with a piece; the queen on d1 usually does.",

  structureDiagram: {
    fen: "rn1q1rk1/pbppbppp/1p2pn2/8/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 5 7",
    orientation: "black",
    arrows: [
      { from: "b7", to: "e4" },
      { from: "f6", to: "e4" },
    ],
    caption: "The Queen's Indian picture: bishop on b7 and knight on f6 both watching e4, the king castled, and the knight ready to jump the moment a White knight lands on c3.",
  },
};
