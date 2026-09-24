// Four Knights Game — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines are standard public theory. Prose original.
//
// The calmest of the open games. Both sides put all four knights on their best
// squares, then White borrows the Spanish bishop (Bb5), castles, and plays d3.
// Nobody gets mated on move eight. The edge comes from moving first in a
// symmetrical position: you are the one who gets to break the symmetry.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const fourKnights: OpeningSpec = {
  id: "four-knights",
  name: "Four Knights Game",
  eco: "C46–C49",
  side: "white",
  family: "1e4-e5",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6",
  tabiyaFen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4",
  pitch:
    "Knights out, bishop to b5, castle, d3: the same sound moves every game and nothing to memorise. " +
    "You never take a risk, your king is safe by move five, and because you moved first you are always the one who gets to break the symmetry.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f3"], why: "The king's knight attacks e5 and guards your king. It goes out first, before anything else." },
      { piece: "N", squares: ["c3"], why: "The queen's knight defends e4 so you do not need to spend a pawn move on it, and it dreams of the d5 outpost." },
      { piece: "B", squares: ["b5"], why: "The Spanish bishop. It pins the knight that defends e5 and gets you castled next move." },
      { piece: "B", squares: ["g5", "e3"], why: "The dark bishop comes out after d3. On g5 it pins the f6-knight and makes Black's ...d5 break harder to get in." },
      { piece: "K", squares: ["g1"], why: "Castle early. The whole point of this opening is that your king is never in danger." },
    ],
    pawns: ["e4", "d3"],
    order: [
      {
        before: "O-O",
        after: "d4",
        // The danger is the pin on c3. In the Scotch Four Knights d4 comes on
        // move four, long before any ...Bb4, and is the main line.
        onlyIfOpponent: "Bb4",
        why: "Castle before you open the centre. With Black's bishop on b4 pinning your c3-knight to an uncastled king, e4 has no real defender: after d4 exd4 Nxd4 Black plays ...Nxe4 and you cannot take back. Once the king is on g1 the pin is gone and d4 works.",
      },
    ],
    castle: "O-O",
    castleBy: 6,
  },

  ideas: [
    {
      id: "fk-symmetry",
      title: "Symmetry favours the mover",
      oneLiner: "Copy for copy, you are always one move ahead. Cash that in, don't rush it.",
      why: "Black often mirrors you: ...Nc6, ...Nf6, ...Bb4, ...O-O, ...d6. That is fine. Every mirror leaves you with the move, and in a symmetrical position the side with the move is the one who gets to change the structure first: Bg5, Nd5, or the d4 break. Finish development, then choose.",
    },
    {
      id: "fk-bb5",
      title: "Borrow the Spanish bishop",
      oneLiner: "Bb5 pins the knight that guards e5 and clears the way to castle.",
      why: "On b5 the bishop does two jobs at once. It ties the c6-knight to the king so e5 has one defender fewer, and it empties f1 so you can castle on the very next move. Bc4 looks more aggressive but runs into the fork trick ...Nxe4 and ...d5.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nc6 Nc3 Nf6")] },
      response: "Bb5, then O-O.",
    },
    {
      id: "fk-fork-trick",
      title: "The fork trick works for you too",
      oneLiner: "Bishop on c5 with no ...Nf6 yet? Nxe5, then d4 forks and wins the piece back.",
      why: "After 3...Bc5 you can play Nxe5. If Black takes back ...Nxe5, d4 attacks both the bishop and the knight, and you regain the piece with a big centre. If Black tries ...Bxf2+ instead, Kxf2 Nxe5 d4 leaves material level and Black's knight running. It only works while e4 is still defended by your c3-knight and nothing of yours is loose.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nc6 Nc3 Bc5")] },
      response: "Nxe5, and after ...Nxe5, d4.",
    },
    {
      id: "fk-pinned-knight",
      title: "A pinned knight is not a defender",
      oneLiner: "When ...Bb4 pins c3, e4 is loose. Castle to break the pin before opening up.",
      why: "The c3-knight guards e4, but a pinned piece cannot move, so once ...Bb4 lands your e4-pawn is effectively undefended. That is why you play d3 and not d4 in the main line, and why castling comes first. If the bishop takes on c3, bxc3 gives you two bishops and a half-open b-file for the rook.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["b4"] },
      response: "O-O, then d3. Answer ...Bxc3 with bxc3.",
      ifIgnored: "d4 too early and ...exd4 Nxd4 Nxe4 costs you a pawn with no way to take back.",
    },
    {
      id: "fk-bg5-pin",
      title: "Bg5 and the d5 outpost",
      oneLiner: "After d3, Bg5 pins the f6-knight so Nd5 lands with real force.",
      why: "Black's only freeing idea is ...d5. Bg5 pins the knight that would support it, and then Nd5 jumps into the hole with the knight and bishop both aimed at f6 and the black king. Black usually has to give up the b4-bishop to remove your c3-knight, which hands you the two bishops.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6")] },
      response: "Bg5.",
    },
    {
      id: "fk-scotch-flavour",
      title: "The d4 alternative",
      oneLiner: "Prefer open positions? 4.d4 is the Scotch Four Knights: trade on d4, then Nxc6.",
      why: "Instead of Bb5 you can strike with d4 at once, before Black has a bishop on b4. After ...exd4 Nxd4 Bb4 you play Nxc6 bxc6 Bd3 and the game is about Black's doubled c-pawns. It is a sound, honest alternative and a good change of pace if opponents keep mirroring you.",
    },
    {
      id: "fk-book-end",
      title: "When the book runs out",
      oneLiner: "Finish developing, then break the symmetry: Nd5, Bxc6, or a prepared d4.",
      why: "You do not need a knockout. Get castled, put the dark bishop on g5 or e3, and connect the rooks. Then pick the change of structure that suits the position: Nd5 into the outpost, Bxc6 to give Black doubled pawns, or d4 once the c3-knight is no longer pinned. Trade into an endgame where your structure is cleaner and grind.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "e4", why: "Take the centre and open both bishop diagonals with one move." } },

    [P("e4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — attack the pawn and develop toward castling.", why: "The main line and the position this whole opening is built on." },
        { san: "c5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Nc3 and d4 — develop first and fight for d4.", why: "The Sicilian. Different opening, same recipe: knights out, castle, then hit the centre." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — take the whole centre while you can.", why: "The French. Black will play ...d5 next and challenge e4." },
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "exd5 — take. After ...Qxd5 Nc3 kicks the queen and gains a move.", why: "The Scandinavian. Take the pawn and develop with tempo." },
        { san: "c6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — you get the centre before ...d5 arrives.", why: "The Caro-Kann. Solid; nothing to fear." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nc3 and Nf3 — you own the centre.", why: "Passive. Black concedes space." },
        { san: "Nf6", verdict: "dubious", answer: "e5", howToAnswer: "e5 — kick the knight, then d4.", why: "Alekhine's Defence. Push the knight around and take the centre it left behind." },
        { san: "Nc6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then d4 — treat it like a normal open game.", why: "Unusual; it usually transposes after ...e5." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nc3 and Be3 — build a big centre against the fianchetto.", why: "The Modern. Black gives up the centre for a bishop on g7." },
        { san: "f6", verdict: "bad", answer: "d4", howToAnswer: "d4 — take the centre; their king has no cover and the knight lost its best square.", why: "Weakens the king and takes f6 from the knight, on move one." },
      ],
    },

    // --- 1.e4 e5 ------------------------------------------------------------
    [P("e4 e5")]: {
      yourMove: { san: "Nf3", why: "Develop with a threat. The knight attacks e5 and clears the way to castle." },
      mistakes: [{ san: "Qh5", why: "The Wayward Queen. It threatens Qxe5+ and Scholar's mate, but ...Nc6 defends and every later move of yours costs a tempo while the queen gets chased." }],
    },
    [P("e4 e5 Nf3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — second knight out, e4 defended, no pawn move needed.", why: "The main line. Black defends e5 the right way, with a piece." },
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — defend e4 and invite ...Nc6, which is your Four Knights again.", why: "The Petroff. You do not need to take on e5; Nc3 keeps everything calm and usually transposes." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — take the centre while Black's bishop is shut in.", why: "The Philidor. Solid but it blocks the f8-bishop." },
        { san: "Bc5", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 hits the bishop and the pawn together.", why: "The bishop develops but leaves e5 defended only by the pawn on... nothing. c3 and d4 gain time." },
        { san: "Qe7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, Bc4, d3 — the queen on e7 blocks Black's own bishop.", why: "Defends e5 with the piece that least wants the job." },
        { san: "f6", verdict: "bad", answer: "Nxe5", howToAnswer: "Nxe5! If ...fxe5 then Qh5+ and the king or the rook falls; if not, you are a pawn up for free.", why: "Damiano's Defence. It defends e5 with the wrong pawn and hands you the oldest trap in the book." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — take, then Nxe5 or Bb5+ as they let you.", why: "The Elephant Gambit. A pawn for very little; take it and develop." },
        { san: "Qf6", verdict: "bad", answer: "Nc3", howToAnswer: "Nc3, then Nd5 hits the queen and Bc4 aims at f7.", why: "An early queen that takes the knight's square and becomes a target." },
      ],
    },
    [P("e4 e5 Nf3 Nc6")]: {
      yourMove: { san: "Nc3", why: "The second knight guards e4 so no pawn move is needed, and points at d5." },
      mistakes: [{ san: "Nxe5", why: "The pawn is defended. After ...Nxe5 you have given a knight for a pawn, and there is no fork trick because Black has no piece on c5 to hit." }],
    },
    [P("e4 e5 Nf3 Nc6 Nc3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Bb5", howToAnswer: "Bb5 — the Spanish bishop. Castle next.", why: "The Four Knights proper. Everyone is out and the fight is about e5 and d5." },
        { san: "Bc5", verdict: "good", answer: "Nxe5", howToAnswer: "Nxe5! After ...Nxe5 d4 forks bishop and knight and you win the piece straight back with a big centre. After ...Bxf2+ Kxf2 Nxe5 d4, material is level and Black's knight has to run.", why: "Natural, but with no knight on f6 the fork trick works and Black loses the centre." },
        { san: "Bb4", verdict: "dubious", answer: "Nd5", howToAnswer: "Nd5 — hit the bishop and threaten to take it; after ...Nf6 Nxb4 Nxb4 c3 you have gained time and space.", why: "The pin on c3 comes a move early and the bishop is just a target." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — open the centre while Black's bishop is stuck behind d6.", why: "Solid but passive. It blocks Black's own dark bishop." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — and after ...exd4 Nxd4 you have the centre and Black has a hole on f6.", why: "A fianchetto that gives up the fight for d4." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 Nd5 (or Ne2) — trade the adventurer and enjoy the extra tempo.", why: "A knight jump with nothing behind it; trading leaves Black a pawn on d4 that needs babysitting." },
        { san: "Qf6", verdict: "bad", answer: "Nd5", howToAnswer: "Nd5 — the queen must move again, and Bc4 next eyes f7.", why: "The queen takes the knight's best square and becomes the target." },
        { san: "Bd6", verdict: "bad", answer: "d4", howToAnswer: "d4 — the bishop on d6 blocks the d-pawn and so the whole queenside.", why: "It defends e5 but shuts in Black's own position." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6")]: {
      yourMove: { san: "Bb5", why: "Pin the knight that guards e5 and clear f1 so you can castle at once." },
      mistakes: [
        { san: "Bc4", why: "Looks sharper, but Black has the fork trick: ...Nxe4 Nxe4 d5 hits bishop and knight together and gets the piece back with an equal game. Bb5 keeps the small edge." },
        { san: "Nxe5", why: "Black just takes back ...Nxe5, and d4 next only kicks the knight — there is no bishop on c5 to fork. A knight for a pawn." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5")]: {
      replies: [
        { san: "Bb4", verdict: "good", answer: "O-O", howToAnswer: "O-O — castle first, which breaks the pin on c3 before anything opens.", why: "The main line. Black mirrors your bishop and pins c3." },
        { san: "Bc5", verdict: "good", answer: "O-O", howToAnswer: "O-O, then d3 — and remember Nxe5 followed by d4 becomes an idea if e5 is ever loose.", why: "Active and natural. The bishop on c5 becomes a target for d4 later." },
        { san: "Nd4", verdict: "good", answer: "Nxd4", howToAnswer: "Nxd4 exd4 e5 — the knight on f6 has to move and after ...dxc3 exf6 Qxf6 dxc3 you are level and better developed.", why: "Rubinstein's counter. Black offers a pawn to unbalance things; the trade keeps it simple." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — open the centre against a bishop that is stuck behind d6.", why: "Solid, but it blocks Black's own bishop and lets you open up." },
        { san: "a6", verdict: "dubious", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 d3 — Black has doubled pawns and you have the freer game.", why: "Asking the bishop the Spanish question a move too early." },
        { san: "Be7", verdict: "good", answer: "O-O", howToAnswer: "O-O, then d3 — calm development. Your bishop on b5 is doing more than theirs on e7.", why: "Quiet and sound." },
        { san: "Bd6", verdict: "dubious", answer: "d3", howToAnswer: "d3 and O-O — the d6-bishop blocks Black's d-pawn and queenside for a long time.", why: "Passive; it defends e5 at the cost of Black's whole development." },
        { san: "Nxe4", verdict: "bad", answer: "Nxe4", howToAnswer: "Nxe4 — take. After ...d5 the pawn only hits the knight, not your bishop, so Ng3 (or Nc3) keeps the extra piece.", why: "The fork trick copied into the wrong position. With the bishop on b5 instead of c4, ...d5 forks nothing." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4")]: {
      yourMove: { san: "O-O", why: "Castle before touching the centre. The king leaves e1, so the c3-knight is no longer pinned and e4 has its defender back." },
      mistakes: [
        { san: "d4", why: "Not while c3 is pinned. After ...exd4 Nxd4 Nxe4 you cannot recapture, because the knight on c3 cannot move. Castle first." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "d3", howToAnswer: "d3 — solid: e4 is now defended by a pawn and the c1-bishop is free.", why: "The main line. Both kings are safe and the manoeuvring begins." },
        { san: "d6", verdict: "good", answer: "d3", howToAnswer: "d3, then Bg5 — the same setup.", why: "Sensible; it usually transposes." },
        { san: "Bxc3", verdict: "dubious", answer: "bxc3", howToAnswer: "bxc3 — take toward the centre. You have two bishops and a half-open b-file.", why: "Trading the bishop before it has to. You are happy with two bishops against bishop and knight." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 Nd5 — the pawn on d4 is a target and your knight has the outpost.", why: "A knight jump that leaves e5 loose after the trade." },
        { san: "a6", verdict: "dubious", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 d3 — Black's pawns are doubled and yours are clean.", why: "Kicking the bishop only trades it for a worse structure." },
        { san: "Qe7", verdict: "dubious", answer: "d3", howToAnswer: "d3, then Bg5 — the queen on e7 blocks Black's own bishop's retreat.", why: "Over-defending e5." },
        { san: "Nxe4", verdict: "bad", answer: "Nxe4", howToAnswer: "Nxe4 — take. ...d5 attacks only the knight; step it away with Ng3 and you are a piece up.", why: "The fork trick again, and again the bishop on b5 is not on the fork." },
        { san: "h6", verdict: "dubious", answer: "d3", howToAnswer: "d3 — a free move for you.", why: "Prevents Bg5, but costs a move in a position where every tempo counts." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O")]: {
      yourMove: { san: "d3", why: "A pawn now guards e4, the c1-bishop can come out, and the pin on c3 no longer bites." },
      mistakes: [
        { san: "Nd5", why: "Too soon. After ...Nxd5 exd5 e4 or ...Nd4 the knight trade helps Black; play d3 first so the knight has support when it jumps." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3")]: {
      replies: [
        { san: "d6", verdict: "good", answer: "Bg5", howToAnswer: "Bg5 — pin the f6-knight so Nd5 arrives with force.", why: "The main line. Black mirrors once more and the position is fully symmetrical." },
        { san: "Bxc3", verdict: "good", answer: "bxc3", howToAnswer: "bxc3 — toward the centre. Two bishops, and the b-file for a rook.", why: "Black gives up the bishop pair to remove your d5-knight before it exists." },
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "exd5 Nxd5 Nxd5 — and the e5-pawn is looser than it looks with Bb5 pinning its defender. Bxc6 next.", why: "The freeing break, a move early. Trades follow and your structure stays cleaner." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 Nd5 — outpost knight against a stranded pawn.", why: "Trades into a structure where Black's d4-pawn is a target." },
        { san: "Ne7", verdict: "dubious", answer: "Bg5", howToAnswer: "Bg5 — the knight left c6, so e5 has one defender fewer and f6 is pinned.", why: "Rerouting toward g6 but it takes a defender away from e5." },
        { san: "h6", verdict: "dubious", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 Be3 — or simply Be3. Their h6 stopped Bg5 at the cost of a tempo.", why: "Prevents the pin but does nothing else." },
        { san: "a6", verdict: "dubious", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 Be3 — doubled pawns for Black, free development for you.", why: "The question comes with a bad answer for Black." },
        { san: "Qe7", verdict: "dubious", answer: "Bg5", howToAnswer: "Bg5 — pin f6; the queen on e7 has already committed to defending e5.", why: "Over-defending e5 and blocking the bishop's retreat to e7." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6")]: {
      yourMove: { san: "Bg5", why: "Pin the f6-knight. Black's only freeing idea is ...d5, and the knight that supports it can no longer move. Nd5 comes next." },
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6 Bg5")]: {
      replies: [
        { san: "Bxc3", verdict: "good", answer: "bxc3", howToAnswer: "bxc3, then Re1, d4 and Bc1-a3 or Nh4 — you have the bishops and Black has to unpin.", why: "The main line. Black removes the knight before it reaches d5 and gives you two bishops." },
        { san: "Ne7", verdict: "good", answer: "Nh4", howToAnswer: "Nh4 — aim for f5; the knight on e7 has taken a defender off e5.", why: "Rerouting to g6 to challenge your bishop." },
        { san: "h6", verdict: "dubious", answer: "Bh4", howToAnswer: "Bh4 — keep the pin. ...g5 to break it would rip open Black's own king.", why: "Asking the bishop; there is no good way to make it leave." },
        { san: "Bg4", verdict: "dubious", answer: "Nd5", howToAnswer: "Nd5 — jump in. The pin on f6 and the knight on d5 together put f6 under real pressure.", why: "Copying your pin, but Black's pin does not have an outpost to go with it." },
        { san: "Qe7", verdict: "dubious", answer: "Nd5", howToAnswer: "Nd5 — the queen is hit, and Bxf6 next damages their king.", why: "The queen walks into the outpost." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 Nd5 — the outpost knight against a pawn that needs babysitting.", why: "Trades into your favourite structure." },
        { san: "Bd7", verdict: "dubious", answer: "Nd5", howToAnswer: "Nd5 — Bxf6 and Nxb4 both hang over Black.", why: "Slow; it does not address the pin." },
      ],
    },

    // --- 3...Bc5: the fork trick ------------------------------------------------
    [P("e4 e5 Nf3 Nc6 Nc3 Bc5")]: {
      yourMove: { san: "Nxe5", why: "The fork trick. Whatever Black takes back with, d4 comes next and the piece comes home with a big centre." },
    },
    [P("e4 e5 Nf3 Nc6 Nc3 Bc5 Nxe5")]: {
      replies: [
        { san: "Nxe5", verdict: "good", answer: "d4", howToAnswer: "d4 — the fork. After ...Bd6 dxe5 Bxe5 you have the centre and a lead in development.", why: "The natural recapture. It runs straight into the fork." },
        { san: "Bxf2+", verdict: "good", answer: "Kxf2", howToAnswer: "Kxf2 Nxe5 d4 — material is level; your king is a little exposed but Black's knight is being chased and you own the centre.", why: "The tricky try. It costs you castling but nothing more." },
        { san: "Qg5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — the knight retreats and hits the queen, so she has to move again.", why: "Attacking e5 and g2 with the queen. Just defend and develop." },
        { san: "Qf6", verdict: "dubious", answer: "Nxc6", howToAnswer: "Nxc6 dxc6 d3 — up a pawn, with a comfortable position.", why: "Hits e5 and f2 but leaves the knight on c6 undefended." },
      ],
    },
  },

  traps: [
    {
      name: "Castle before you open up",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5 Bb4 5.d4 exd4 6.Nxd4 Nxe4"),
      punisher: "black",
      tell: "The temptation to play the same d4 you know from the Scotch, even though Black's bishop is already on b4.",
      why: "The knight on c3 is pinned to your uncastled king, so it cannot take back on e4. Black wins a pawn for nothing and your centre is gone. Castle first: once the king is on g1 the pin does not exist and d4 is fine.",
    },
    {
      name: "The fork trick that isn't",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5 Nxe4 5.Nxe4 d5 6.Ng3"),
      punisher: "white",
      tell: "Black plays ...Nxe4 and ...d5 as if your bishop were on c4.",
      why: "Against Bc4 the ...d5 fork hits bishop and knight together. Against Bb5 it hits only the knight, and the knight simply steps away. You are a piece up for a pawn.",
    },
    {
      name: "Damiano's f6",
      sans: sans("1.e4 e5 2.Nf3 f6 3.Nxe5 fxe5 4.Qh5+"),
      punisher: "white",
      tell: "Black defends e5 with the f-pawn on move two.",
      why: "The knight sacrifice opens the king's diagonal. After ...g6 Qxe5+ picks up the rook on h8; after ...Ke7 Qxe5+ Kf7 Bc4+ the king is chased into the open. If Black declines the knight you are a pawn up with a lead in development.",
    },
  ],

  modelGames: [
    {
      label: "Spanish Four Knights: the main line",
      sans: sans("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6 Bg5 Bxc3 bxc3 Qe7 Re1 Nd8 d4 Ne6 Bc1"),
      summary: "Full symmetry until Bg5 breaks it. Black gives up the bishop to stop Nd5, you take the two bishops and the centre, then re-route the bishop and play for d4.",
    },
    {
      label: "Scotch Four Knights: doubled pawns",
      sans: sans("e4 e5 Nf3 Nc6 Nc3 Nf6 d4 exd4 Nxd4 Bb4 Nxc6 bxc6 Bd3 d5 exd5 cxd5 O-O O-O Bg5"),
      summary: "The open alternative. Trade on d4 and then on c6, leave Black with doubled c-pawns, castle, and play against the isolated d5-pawn for the rest of the game.",
    },
    {
      label: "Against Rubinstein's ...Nd4",
      sans: sans("e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Nd4 Nxd4 exd4 e5 dxc3 exf6 Qxf6 dxc3 Bc5 O-O O-O"),
      summary: "Black's one sharp try. Trade the knight, push e5 to kick the other one, and take back on c3. Material is level and you are the better developed side.",
    },
  ],

  middlegamePlan:
    "You are playing for a small, permanent edge, not a knockout. Finish development first: Bb5, O-O, d3, Bg5, and connect the rooks with Re1. " +
    "Then break the symmetry on your terms. Nd5 into the outpost is the main idea, usually after Bg5 has pinned the f6-knight. " +
    "If Black takes on c3, recapture bxc3, keep the two bishops, and prepare d4 with Re1 and Bc1 so that the centre opens when it suits you. " +
    "Bxc6 is always available to leave Black with doubled pawns, and trades that lead to an endgame with the better structure are wins in slow motion.",

  structureDiagram: {
    fen: "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/1b2P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7",
    orientation: "white",
    arrows: [
      { from: "c1", to: "g5" },
      { from: "c3", to: "d5" },
    ],
    caption: "The Four Knights picture: full symmetry, both kings castled, and White to move. Bg5 pins the f6-knight, then Nd5 jumps into the hole.",
  },
};
