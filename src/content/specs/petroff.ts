// Petroff Defence (1.e4 e5 2.Nf3 Nf6) — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines are standard public theory. Prose original.
//
// White attacks e5; you attack e4 back instead of defending. The whole opening
// is one habit and one rule. The habit: when a piece of yours is hit, retreat it
// or trade it, never prop it up with a pawn. The rule: never take on e4 while a
// white knight sits on e5 — kick it with ...d6 first, because 3...Nxe4? 4.Qe2
// pins the knight and 4...Nf6?? 5.Nc6+ wins the queen.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const petroff: OpeningSpec = {
  id: "petroff",
  name: "Petroff Defence",
  aliases: ["Petrov", "Russian Defence", "Russian Game"],
  eco: "C42–C43",
  side: "black",
  family: "1e4-e5",
  firstMoves: "1.e4 e5 2.Nf3 Nf6",
  tabiyaFen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
  pitch:
    "Instead of defending your e-pawn you attack theirs, and the game becomes symmetrical, solid and hard to lose. " +
    "There is one trap to learn and one habit to build, and after that most 1.e4 players under 1200 simply run out of ideas against you.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6", "e4", "d6"], why: "The Petroff knight. It hits e4 on move two, takes on e4 once the white knight has been kicked, and steps back to f6 or d6 the moment it is challenged." },
      { piece: "B", squares: ["e7", "d6"], why: "The dark bishop develops modestly and gets you castled. On d6 it also hits h2 later." },
      { piece: "N", squares: ["c6", "d7"], why: "The queen's knight. c6 is normal; d7 when you want to support ...Nf6 or challenge a knight on e5." },
      { piece: "B", squares: ["f5", "g4", "e6"], why: "The light bishop comes out early. On f5 it guards the e4-knight and looks at c2; on g4 it pins." },
      { piece: "R", squares: ["e8"], why: "The e-file is open. Whoever owns it owns the middlegame, so a rook belongs there by move ten." },
    ],
    pawns: ["d5", "c6"],
    order: [
      {
        before: "d6|exd4",
        after: "Nxe4",
        why: "Never take on e4 while a white knight stands on e5. 3.Nxe5 Nxe4? 4.Qe2 pins your knight to the king, and 4...Nf6?? 5.Nc6+ uncovers check and takes the queen. Kick the knight with ...d6 first, then take. (After 3.d4 exd4 there is no knight on e5 and the capture is safe.)",
      },
      {
        before: "Nxe4|Ne4",
        after: "d5",
        why: "Regain the pawn before you push the d-pawn. 4.Nf3 d5? 5.exd5 and you are simply a pawn down for nothing. ...Nxe4 first; then ...d5 supports the knight and it has a job.",
      },
    ],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "petroff-counter",
      title: "Answer a threat with a threat",
      oneLiner: "White attacks e5. You attack e4. Whoever takes first has to think about taking back.",
      why: "The Petroff idea is that symmetry is fine for Black when nothing is weak. 2...Nf6 does not defend e5 at all; it says that if White grabs a pawn you will grab one too. The result is an open e-file, equal material and a position with no holes for White to aim at.",
    },
    {
      id: "petroff-d6-first",
      title: "Kick before you take",
      oneLiner: "After 3.Nxe5, play ...d6 first. Only then ...Nxe4.",
      why: "3...Nxe4? looks natural and loses to 4.Qe2. The knight is pinned to your king along the e-file, and if you retreat it with 4...Nf6 the e5-knight jumps to c6 with check and takes your queen. 3...d6 sends the knight home first; then 4...Nxe4 is safe because there is nothing on e5 to uncover.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nf6 Nxe5")] },
      response: "...d6, then ...Nxe4.",
      ifIgnored: "3...Nxe4 4.Qe2 and you are either a pawn down after ...Qe7 Qxe4 or losing the queen after ...Nf6 Nc6+.",
    },
    {
      id: "petroff-knight-retreats",
      title: "The e4-knight is a visitor",
      oneLiner: "When something hits the knight on e4, trade it or step back. Never prop it up with ...f5.",
      why: "Your knight on e4 is well placed but it is not a fortress. When White plays Re1, c4, Nc3 or Nbd2 against it, trade (...Nxc3, ...Nxd2) or retreat (...Nf6, ...Nd6) and carry on developing. Defending it with ...f5 opens your king and gives White a target for the rest of the game.",
      trigger: { kind: "opponent_san", sans: ["Re1", "c4", "Nc3", "Nbd2"] },
      response: "Trade it or retreat it. ...Nxc3 and ...Nxd2 are fine; so are ...Nf6 and ...Nd6.",
      ifIgnored: "...f5 and the knight stays, but your king is loose forever and White plays c4 to break the pawn that holds it.",
    },
    {
      id: "petroff-e-file",
      title: "Own the e-file",
      oneLiner: "Both e-pawns are gone. Put a rook on e8 before White puts one on e1.",
      why: "The Petroff opens the e-file on move four. In the middlegame it belongs to whoever gets a rook there first with the squares in front of it covered. ...Bf5 to hold the knight, ...Re8, and the symmetry starts to favour you: White's rook on e1 is staring at your rook, not at your king.",
      response: "...Bf5, ...Re8.",
    },
    {
      id: "petroff-cochrane",
      title: "Take the knight on f7",
      oneLiner: "4.Nxf7 is a real gambit. Take it, walk the king back, and be a piece up for two pawns.",
      why: "The Cochrane Gambit gives a knight for two pawns and an exposed king. It looks terrifying and it is not sound. Take with the king, then ...g6 and ...Kg7 or ...Be7 and ...Rf8 tuck it away. Develop everything, avoid opening lines near your king, and the extra piece decides.",
      trigger: { kind: "opponent_san", sans: ["Nxf7"] },
      response: "...Kxf7, then ...g6 and ...Kg7, or ...Be7 and ...Rf8.",
    },
    {
      id: "petroff-vs-d4",
      title: "Against 3.d4: take, then jump",
      oneLiner: "3.d4 exd4 4.e5 Ne4. The knight goes forward, not back, and ...d5 hits the centre.",
      why: "White can skip Nxe5 and hit the centre with d4. Take the pawn; if e5 kicks your knight, do not retreat to g8 or g4, jump to e4. After Qxd4 the knight is attacked but ...d5 defends it and challenges the centre. When exd6 comes, take back with the knight, not the bishop or the c-pawn, because those leave e4 hanging to the queen.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nf6 d4")] },
      response: "...exd4. After e5, ...Ne4; after Qxd4, ...d5.",
    },
    {
      id: "petroff-book-end",
      title: "When the book runs out",
      oneLiner: "Develop to natural squares, castle, rook to e8. Patience wins Petroff games.",
      why: "There is no attack to launch. Bishops to e7 and f5, knights to c6 or d7, king to g8, rook to e8. Keep the d5-pawn supported with ...c6. Trade the e4-knight when it is challenged. White's first-move edge fades a little every move you do not blunder, and under 1200 that is how these games are won.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — and after 2.Nf3, ...Nf6: the Petroff.", why: "Most of your games. The whole opening starts here." },
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...d5 or ...c5 — a sound Queen's Pawn game.", why: "A different opening. Develop the same knight and stay solid." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — mirror them until they commit a centre pawn.", why: "Flexible. It usually becomes a d4 or e4 game." },
        { san: "c4", verdict: "good", answer: "e5", howToAnswer: "...e5, then ...Nf6 and ...Nc6 — you get the centre they declined.", why: "The English. Take the space in the middle." },
        { san: "Nc3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — if 2.Nf3 Nf6 you are in the Petroff by another route.", why: "Often heads for e4 anyway." },
        { san: "b3", verdict: "dubious", answer: "e5", howToAnswer: "...e5, ...Nc6, ...Nf6 — develop and watch the long diagonal.", why: "Larsen's Opening. The bishop on b2 is the only idea." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — and remember f4 has loosened their king.", why: "Bird's Opening." },
        { san: "g3", verdict: "good", answer: "e5", howToAnswer: "...e5, ...Nf6, ...d5 — a big centre against the fianchetto.", why: "A quiet setup." },
        { san: "d3", verdict: "dubious", answer: "e5", howToAnswer: "...e5, ...Nf6, ...d5 — take more space than they do.", why: "Timid." },
        { san: "e3", verdict: "dubious", answer: "e5", howToAnswer: "...e5, ...Nf6, ...d5 — their own bishop is locked in.", why: "Passive." },
      ],
    },
    [P("e4")]: { yourMove: { san: "e5", why: "Claim your share of the centre. The counterattack on e4 comes next move." } },

    [P("e4 e5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — the Petroff. Attack e4 instead of defending e5.", why: "The main line and most of your games." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — same knight, same job. If f4 comes, ...d5.", why: "The Vienna. Your development does not change." },
        { san: "Bc4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — hit e4; then ...Nc6 or ...c6 and ...d5.", why: "The Bishop's Opening. Nf6 is the right reply again." },
        { san: "f4", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — decline. If fxe5 then ...Qh4+ wins; otherwise ...d6 and develop.", why: "The King's Gambit. Declining keeps it calm and sets a trap for them." },
        { san: "d4", verdict: "good", answer: "exd4", howToAnswer: "...exd4, then ...Nc6 to kick the queen if Qxd4.", why: "The Centre Game. Take, then develop with tempo." },
        { san: "Qh5", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — defend e5; then ...g6 to chase the queen and ...Nf6.", why: "The Wayward Queen. Defend, then chase." },
        { san: "Qf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — the knight blocks the f-file, so f7 is safe. Then ...Nc6.", why: "Aiming at f7. Nf6 stands in the way." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...d5 — you have more space.", why: "Passive." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop; d4 will come and you will take.", why: "Preparing d4 slowly." },
        { san: "Be2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop normally.", why: "Timid development." },
      ],
    },
    [P("e4 e5 Nf3")]: {
      yourMove: { san: "Nf6", why: "The Petroff. You do not defend e5; you hit e4 and let them decide who takes first." },
      mistakes: [
        { san: "f6", why: "Nxe5! and fxe5 Qh5+ costs you the rook or the king's safety. Never defend e5 with the f-pawn." },
        { san: "Bd6", why: "It defends the pawn and blocks your own d-pawn, so the c8-bishop never gets out." },
      ],
    },

    // --- Classical: 3.Nxe5 ---------------------------------------------------------
    [P("e4 e5 Nf3 Nf6")]: {
      replies: [
        { san: "Nxe5", verdict: "good", answer: "d6", howToAnswer: "...d6 — kick the knight first. ...Nxe4 comes next move.", why: "The main line. White takes and you must not take back yet." },
        { san: "d4", verdict: "good", answer: "exd4", howToAnswer: "...exd4 — take; after e5 the knight jumps to e4.", why: "The Steinitz. White strikes the centre instead." },
        { san: "Nc3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — a Four Knights. Develop and castle.", why: "Quiet development." },
        { san: "Bc4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — develop; ...Bc5 or ...Be7 next.", why: "The Two Knights by another route. Nc6 keeps it simple." },
        { san: "d3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...d5 — take the centre they declined.", why: "Passive: it locks their own bishop in." },
        { san: "Qe2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop; the queen on e2 blocks their bishop.", why: "An early queen that gets in the way." },
        { san: "Bd3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop; their bishop blocks their own d-pawn.", why: "The bishop on d3 shuts in the queenside." },
        { san: "Be2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...d5 — you get the centre.", why: "Timid." },
        { san: "h3", verdict: "bad", answer: "Nc6", howToAnswer: "...Nc6 — develop; ...d5 next and you are ahead.", why: "A wasted move. Develop and you are a tempo up." },
        { san: "c3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop; if d4 then ...exd4.", why: "Preparing d4 slowly." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5")]: {
      yourMove: { san: "d6", why: "Kick the knight before you take on e4. The one rule of this opening." },
      mistakes: [
        { san: "Nxe4", why: "Qe2! pins the knight to your king. Retreat with ...Nf6 and Nc6+ takes your queen; defend with ...Qe7 and Qxe4 leaves you a pawn down." },
        { san: "Nc6", why: "Nxc6 dxc6 and you are a pawn down with nothing to show for it." },
        { san: "d5", why: "exd5 and again you are a pawn down. Kick the knight; the e4-pawn comes back next move." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nxe4", howToAnswer: "...Nxe4 — now it is safe. Material is level.", why: "The main line. The knight goes home and you take back." },
        { san: "Nxf7", verdict: "dubious", answer: "Kxf7", howToAnswer: "...Kxf7 — a knight for two pawns. Then ...g6 and ...Kg7, or ...Be7 and ...Rf8.", why: "The Cochrane Gambit. Scary, unsound, and you should take." },
        { san: "Nc4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — level material, and their knight on c4 is in the bishop's way.", why: "An odd retreat." },
        { san: "Nd3", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — level; the knight on d3 blocks their own d-pawn and bishop.", why: "A retreat that blocks everything." },
        { san: "Ng4", verdict: "bad", answer: "Bxg4", howToAnswer: "...Bxg4 — the knight is defended only by the queen, and Qxg4 loses the queen to ...Nxg4.", why: "The knight has run to a square where it just hangs." },
        { san: "d4", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 — the knight is gone. After dxe5 Nxe4 you are a piece up for a pawn.", why: "Defending the knight with a pawn does not save it." },
        { san: "Qe2", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 — a free knight. The queen cannot even take back, because their own e4-pawn is in the way.", why: "The queen defends nothing: the e4-pawn blocks its line to e5." },
        { san: "Bc4", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 — a free knight.", why: "Development that forgets the knight is attacked." },
        { san: "f4", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 — take; fxe5 Nxe4 and you are a piece up.", why: "Another pawn defence that does not work." },
        { san: "Nc6", verdict: "bad", answer: "Nxc6", howToAnswer: "...Nxc6 — the b8-knight takes it for free.", why: "A knight jumping into your pieces." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3")]: {
      yourMove: { san: "Nxe4", why: "Now the pawn comes back. There is no knight on e5 to uncover a check, so the capture is safe." },
      mistakes: [
        { san: "d5", why: "exd5 or e5 and you are a pawn down for nothing. Take on e4 first." },
        { san: "Nc6", why: "You are still a pawn down. Get it back before you develop." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — support the knight and claim the centre.", why: "The main line. White builds the centre." },
        { san: "Qe2", verdict: "good", answer: "Qe7", howToAnswer: "...Qe7 — the knight is pinned, so mirror the queen. After d3 it retreats to f6.", why: "Pinning your knight. Only ...Qe7 handles it." },
        { san: "d3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — retreat and develop; ...Be7 and ...O-O next.", why: "Kicking the knight straight away." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 — trade; dxc3 and their pawns are doubled.", why: "Challenging the knight with the piece you are happy to trade." },
        { san: "Bd3", verdict: "good", answer: "d5", howToAnswer: "...d5 — hold the knight, then ...Be7 and castle.", why: "Natural development against the knight." },
        { san: "c4", verdict: "good", answer: "Be7", howToAnswer: "...Be7, then ...O-O and ...Nc6 — keep it simple.", why: "Taking d5 away from your pawn." },
        { san: "Bc4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — kick the bishop; Bb3 and you have gained a move.", why: "A bishop that gets chased immediately." },
        { san: "Be2", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — hold the knight and develop.", why: "Quiet." },
        { san: "Nd4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — the knight on d4 is exposed and your centre is bigger.", why: "A jump into the centre with nothing behind it." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4")]: {
      yourMove: { san: "d5", why: "Support the knight and take your share of the centre. Now it can only be traded, not chased." },
      mistakes: [{ san: "Nc6", why: "d5 kicks the knight and cramps you. Support your own knight first." }],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — develop and castle; the bishop on e7 keeps everything tidy.", why: "The main line. White's bishop stares at your knight." },
        { san: "c4", verdict: "good", answer: "Be7", howToAnswer: "...Be7, then ...O-O; if cxd5 then ...Qxd5.", why: "Hitting the d5-pawn that holds your knight." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 — their pawns are doubled and you develop.", why: "Offering a trade that suits you." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — the bishop retreats and c6 supports d5 anyway.", why: "A check that gains nothing." },
        { san: "Qe2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — the knight is defended by the pawn; develop and castle.", why: "Pressure on the knight that ...Be7 shrugs off." },
        { san: "Be2", verdict: "good", answer: "Be7", howToAnswer: "...Be7, ...O-O — symmetry.", why: "Quiet and sound." },
        { san: "Nbd2", verdict: "dubious", answer: "Nxd2", howToAnswer: "...Nxd2 Bxd2 — trade it rather than retreat.", why: "Challenging the knight." },
        { san: "Ne5", verdict: "dubious", answer: "Bd6", howToAnswer: "...Bd6 — hit the knight and develop in one move.", why: "The knight returns to e5, where it can be challenged." },
        { san: "h3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — develop; they have spent a move on nothing.", why: "A waste." },
        { san: "Be3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, ...O-O, ...Bf5.", why: "Development that blocks their own e-file." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3")]: {
      yourMove: { san: "Be7", why: "Modest and right. The bishop gets you castled and leaves d6 free for the knight to retreat to." },
      mistakes: [{ san: "f5", why: "Holding the knight with a pawn opens your king. c4 breaks the d5-pawn and the whole structure comes apart." }],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Be7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — castle; ...Bf5 and ...Nc6 next.", why: "The main line. Both kings are safe by move seven." },
        { san: "c4", verdict: "good", answer: "O-O", howToAnswer: "...O-O — if cxd5 then ...Qxd5.", why: "Hitting d5 before castling." },
        { san: "Bxe4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — the pawn kicks the knight and you have the bishops.", why: "Trading their best piece for your knight, for nothing." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 — doubled pawns for them, development for you.", why: "A trade that helps you." },
        { san: "Qe2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — the knight is held by d5; castle and bring the bishop to f5.", why: "Pressure the pawn already answers." },
        { san: "Ne5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — then ...Nd7 or ...Bd6 to challenge the knight.", why: "A knight on e5 that can be chased." },
        { san: "Nbd2", verdict: "dubious", answer: "Nxd2", howToAnswer: "...Nxd2 Bxd2 — trade and castle.", why: "Challenging the knight." },
        { san: "h3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — a free move for you.", why: "Wasted." },
        { san: "c3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...Bf5 — solid.", why: "Slow." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Be7 O-O")]: {
      yourMove: { san: "O-O", why: "King safe, rook ready for e8. From here on it is development and the e-file." },
      mistakes: [{ san: "f5", why: "Propping the knight up with a pawn loosens your king and invites c4. Trade or retreat the knight when it is hit; never ...f5." }],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Be7 O-O O-O")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — retreat; the d5-pawn is challenged so the knight stops leaning on it.", why: "The main try: undermining the pawn that holds the knight." },
        { san: "Re1", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5 — the bishop holds the knight; ...Nc6 and ...Re8 next.", why: "The rook hits the knight down the e-file." },
        { san: "c3", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — develop; the knight stays.", why: "Solid but slow." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 — doubled pawns for them.", why: "A trade in your favour." },
        { san: "Qe2", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — hold the knight and prepare ...Re8.", why: "Pressure on the knight that the bishop answers." },
        { san: "Nbd2", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — or ...Nxd2. Either is fine.", why: "Challenging the knight." },
        { san: "h3", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — develop.", why: "Wasted." },
        { san: "Bxe4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — the pawn kicks the knight; you have the bishop pair.", why: "Giving up their good bishop." },
        { san: "Bf4", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — develop opposite them.", why: "Quiet development." },
        { san: "Ne5", verdict: "dubious", answer: "Nd7", howToAnswer: "...Nd7 — challenge the knight; trade when you can.", why: "A knight on e5 that you can trade off." },
      ],
    },

    // --- 5.Qe2: the pin ------------------------------------------------------------
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Qe2")]: {
      yourMove: { san: "Qe7", why: "The knight is pinned to your king, so it cannot move. Mirror the queen: now the knight is defended and can retreat next move." },
      mistakes: [
        { san: "d5", why: "d3 attacks the pinned knight and you cannot save it. ...Qe7 first." },
        { san: "f5", why: "Same problem: d3 and the pinned knight is lost. Only ...Qe7 works." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Qe2 Qe7")]: {
      replies: [
        { san: "d3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — retreat; after Bg5 trade queens with ...Qxe2+ and the game is level.", why: "The main line. White kicks the knight and the queens usually come off." },
        { san: "Nc3", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 dxc3 Qxe2+ — level and simple.", why: "Challenging the knight." },
        { san: "d4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — the knight is held; ...Nc6 or ...Bf5 next.", why: "Building the centre while the pin does nothing." },
      ],
    },

    // --- Steinitz: 3.d4 ------------------------------------------------------------
    [P("e4 e5 Nf3 Nf6 d4")]: {
      yourMove: { san: "exd4", why: "Take. If e5 kicks your knight, it jumps to e4; if Nxd4, ...Nxe4 is safe because there is nothing on e5." },
      mistakes: [
        { san: "Nc6", why: "d5 kicks the knight and you have lost time on move three." },
        { san: "d6", why: "dxe5 dxe5 Qxd8+ Kxd8 Nxe5 — you lose a pawn and castling in one go." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 d4 exd4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Ne4", howToAnswer: "...Ne4 — forward, not back. After Qxd4, ...d5.", why: "The main line. White kicks the knight and hopes it retreats." },
        { san: "Nxd4", verdict: "good", answer: "Nxe4", howToAnswer: "...Nxe4 — safe, there is no knight on e5. If Qe2 then ...Qe7.", why: "Recapturing in the centre." },
        { san: "Bc4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop; do not grab e4 into the Urusov Gambit.", why: "A gambit try. Decline it by developing." },
        { san: "Qxd4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — the queen must move again.", why: "Early queen recapture that gets chased." },
        { san: "c3", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — take; the c3 pawn does not attack anything yet.", why: "The Göring idea, but your knight has already taken e4." },
        { san: "Bd3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop; their bishop blocks their own d-pawn.", why: "Passive." },
        { san: "Ng5", verdict: "bad", answer: "h6", howToAnswer: "...h6 — the knight must go back.", why: "A knight jump with nothing behind it." },
        { san: "Bg5", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — break the pin. Never ...Nxe4 here: Bxd8.", why: "Pinning the knight to the queen." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 d4 exd4 e5")]: {
      yourMove: { san: "Ne4", why: "Forward. The knight is centralised, hits f2, and ...d5 will support it." },
      mistakes: [
        { san: "Ng4", why: "h3 and the knight has to go back again. Two moves lost." },
        { san: "Ng8", why: "Back to the start. You are behind in development and White has the centre for free." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 d4 exd4 e5 Ne4")]: {
      replies: [
        { san: "Qxd4", verdict: "good", answer: "d5", howToAnswer: "...d5 — defend the knight and hit back in the centre.", why: "The main line. The queen takes and attacks your knight." },
        { san: "Qe2", verdict: "good", answer: "Nc5", howToAnswer: "...Nc5 — retreat; then ...Nc6 and ...Be7.", why: "Pressure on the knight without the pawn grab." },
        { san: "Bd3", verdict: "dubious", answer: "Nc5", howToAnswer: "...Nc5 — hit the bishop; ...Nc6 next.", why: "Development that meets a knight retreat with tempo." },
        { san: "Nxd4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — the knight is held; if exd6 then ...Nxd6.", why: "Quiet recapture." },
        { san: "Bc4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — kick the bishop and hold the knight.", why: "A bishop that gets chased." },
        { san: "c3", verdict: "dubious", answer: "dxc3", howToAnswer: "...dxc3 Nxc3 — trade knights or retreat; you are a pawn up.", why: "Offering a pawn for development." },
        { san: "Nbd2", verdict: "dubious", answer: "Nxd2", howToAnswer: "...Nxd2 Bxd2 — trade and develop.", why: "Challenging the knight." },
        { san: "Bb5", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — kick the bishop; ...d5 next.", why: "A check-less bishop move." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 d4 exd4 e5 Ne4 Qxd4")]: {
      yourMove: { san: "d5", why: "The queen attacks the knight; the pawn defends it and challenges e5 at the same time." },
      mistakes: [
        { san: "Nc6", why: "Qxe4 and the knight is gone. Defend it first." },
        { san: "Bc5", why: "The queen simply takes on e4. Your bishop attacks a queen that has better things to do." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 d4 exd4 e5 Ne4 Qxd4 d5")]: {
      replies: [
        { san: "exd6", verdict: "good", answer: "Nxd6", howToAnswer: "...Nxd6 — take back with the knight. Anything else leaves e4 hanging.", why: "En passant. The main line." },
        { san: "Bd3", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — hit the queen; after Qa4+ ...Nc6 and you are better.", why: "Development that walks into a tempo." },
        { san: "Nc3", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — hit the queen with tempo.", why: "Challenging the knight too late." },
        { san: "Bb5+", verdict: "bad", answer: "c6", howToAnswer: "...c6 — the bishop retreats and c6 supports d5.", why: "A check that costs White time." },
        { san: "c4", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — hit the queen; Qxd5 Qxd5 cxd5 leaves you fine.", why: "Undermining d5 while the queen is exposed." },
        { san: "Be3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — kick the queen; ...Nc6 next.", why: "Solid, but the queen is still in the way." },
        { san: "Nbd2", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — hit the queen and develop.", why: "Challenging the knight too slowly." },
        { san: "Bf4", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — hit the queen with tempo.", why: "Development that ignores the queen's exposure." },
        { san: "Qe3", verdict: "dubious", answer: "Bc5", howToAnswer: "...Bc5 — hit the queen again.", why: "A queen retreat that is still in range." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 d4 exd4 e5 Ne4 Qxd4 d5 exd6")]: {
      yourMove: { san: "Nxd6", why: "The knight takes back. With the d5-pawn gone, e4 is defended by nothing, so this is the only recapture that keeps the piece." },
      mistakes: [
        { san: "Bxd6", why: "Qxe4+ and the knight is gone. Only the knight can take back." },
        { san: "cxd6", why: "Qxe4+ or Bb5+ and you lose the knight." },
      ],
    },
    [P("e4 e5 Nf3 Nf6 d4 exd4 e5 Ne4 Qxd4 d5 exd6 Nxd6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — hit the queen and develop; ...Be7 and castle.", why: "The main line. Both sides develop." },
        { san: "Bd3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — hit the queen; ...Be7 next.", why: "Natural development." },
        { san: "Bf4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit the queen; if Qe3+ then ...Be7.", why: "Pinning nothing." },
        { san: "Qe3+", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — block and develop.", why: "A check that develops you." },
        { san: "Bg5", verdict: "dubious", answer: "f6", howToAnswer: "...f6 — kick the bishop. Never ...Be7 here: Qxg7.", why: "Hitting the queen with the g7-pawn loose behind it." },
        { san: "Bc4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit the queen; Nxc4 is also there.", why: "A bishop that your knight can trade off." },
        { san: "Qe5+", verdict: "dubious", answer: "Qe7", howToAnswer: "...Qe7 — offer the trade; Qxe7+ Bxe7 is level.", why: "A check that leads to trades." },
        { san: "Be2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit the queen and develop.", why: "Quiet." },
      ],
    },
  },

  traps: [
    {
      name: "The Petroff trap",
      sans: sans("1.e4 e5 2.Nf3 Nf6 3.Nxe5 Nxe4 4.Qe2 Nf6 5.Nc6+"),
      punisher: "white",
      tell: "White has a knight on e5 and you are itching to take back on e4.",
      why: "3...Nxe4 puts your knight on the e-file with your king behind it. 4.Qe2 pins it, and if it retreats the e5-knight jumps to c6 with a discovered check and takes your queen. Even the best defence, 4...Qe7 5.Qxe4 d6, leaves you a pawn down. Kick the knight with ...d6 first and none of this exists.",
    },
    {
      name: "Pinned knight, second helping",
      sans: sans("1.e4 e5 2.Nf3 Nf6 3.Nxe5 d6 4.Nf3 Nxe4 5.Qe2 d5 6.d3"),
      punisher: "white",
      tell: "You did everything right and then White plays Qe2 anyway. The knight is pinned again, and ...d5 looks like it defends it.",
      why: "A pinned piece cannot be defended by a pawn: d3 attacks it and it cannot move. Only 5...Qe7 works, mirroring the queen so the knight is protected and can retreat to f6 next move. Then Bg5 Qxe2+ Bxe2 and the position is level and quiet.",
    },
    {
      name: "Defending the knight with a pawn",
      sans: sans("1.e4 e5 2.Nf3 Nf6 3.Nxe5 d6 4.d4 dxe5 5.dxe5 Nxe4"),
      punisher: "black",
      tell: "You kick the knight with ...d6 and White defends it with d4 or f4 instead of moving it.",
      why: "Attacked knights have to move; propping them up with a pawn does not help. ...dxe5 takes the knight, dxe5 takes the pawn back, and ...Nxe4 picks up the other pawn. You are a knight up for a pawn on move five.",
    },
  ],

  modelGames: [
    {
      label: "Classical: kick, take, develop, e-file",
      sans: sans("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Be7 O-O O-O Re1 Bf5 c4 c6 Nc3 Nxc3 bxc3 Bxd3 Qxd3 Nd7"),
      summary: "The whole plan: ...d6 before ...Nxe4, then ...d5, ...Be7, castle. When the rook hits the knight, ...Bf5 holds it; when Nc3 challenges it, trade. Level material, no weaknesses, and ...Re8 is next.",
    },
    {
      label: "5.Qe2: mirror the queen",
      sans: sans("e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 Qe2 Qe7 d3 Nf6 Bg5 Qxe2+ Bxe2 Be7 Nc3 Nc6 O-O O-O"),
      summary: "The pin is answered with ...Qe7, the knight steps back when d3 arrives, and the queens come off. Nothing is weak on either side and Black is fully equal.",
    },
    {
      label: "Steinitz: the knight goes forward",
      sans: sans("e4 e5 Nf3 Nf6 d4 exd4 e5 Ne4 Qxd4 d5 exd6 Nxd6 Nc3 Nc6 Qf4 Be7 Bd3 O-O O-O Re8"),
      summary: "Take on d4, jump to e4, hit back with ...d5, recapture with the knight. Then ...Nc6 kicks the queen, you develop and castle, and the rook takes the e-file.",
    },
  ],

  middlegamePlan:
    "Nothing is weak, so keep it that way. Develop to the natural squares: bishop e7, bishop f5, knight c6 or d7, king g8, rook e8, and ...c6 behind the d5-pawn. " +
    "Your e4-knight is a visitor. When Re1, c4, Nc3 or Nbd2 challenges it, trade it or step back to f6 or d6; never hold it with ...f5. " +
    "Contest the e-file with a rook before White's rook gets there with support, and trade pieces when the trades are equal. " +
    "The position stays symmetrical and White's first-move edge fades a little every move you do not blunder.",

  structureDiagram: {
    fen: "rnbq1rk1/ppp1bppp/8/3p4/3Pn3/3B1N2/PPP2PPP/RNBQ1RK1 w - - 4 8",
    orientation: "black",
    arrows: [
      { from: "f8", to: "e8" },
      { from: "c8", to: "f5" },
    ],
    caption: "The Petroff picture: both e-pawns gone, the knight on e4 held by d5, both kings castled. Next comes ...Bf5 to hold the knight and ...Re8 to take the open file.",
  },
};
