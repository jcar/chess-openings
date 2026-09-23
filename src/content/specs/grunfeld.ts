// Grünfeld Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// The idea is a dare. You let White build the biggest pawn centre they have
// ever had, then take it apart: the g7-bishop looks down the long diagonal at
// d4, ...Nxc3 doubles the c-pawns, and ...c5 hammers what is left. We teach the
// Exchange Variation (4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7 7.Bc4 c5) with the
// Russian System (4.Nf3 Bg7 5.Qb3) as the main branch.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const grunfeld: OpeningSpec = {
  id: "grunfeld",
  name: "Grünfeld Defence",
  aliases: ["Gruenfeld"],
  eco: "D70–D99",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 Nf6 2.c4 g6 3.Nc3 d5",
  tabiyaFen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4",
  pitch:
    "You let White build a huge pawn centre on purpose, then hit it with the g7-bishop and ...c5 until it cracks. " +
    "It is the most active reply to 1.d4 you can learn as a beginner, and most opponents under 1200 have no idea that a big centre can be a target rather than a trophy.",

  setup: {
    pieces: [
      { piece: "B", squares: ["g7"], why: "The Grünfeld bishop. From g7 it stares at d4 down the long diagonal and every plan you have depends on that line staying open." },
      { piece: "N", squares: ["f6", "d5"], why: "The king's knight goes to f6, then to d5 after the trade on d5, where it either takes on c3 or gets kicked and comes back to b6." },
      { piece: "N", squares: ["c6", "d7", "a6"], why: "The queen's knight hits d4 from c6 once ...c5 is in. If d5 kicks it, it lands on a5 or e5 with tempo." },
      { piece: "B", squares: ["g4", "e6", "b7"], why: "The light bishop pins the knight that defends d4 from g4, or comes to e6 to hit c4 when the enemy bishop sits there." },
      { piece: "Q", squares: ["a5", "c7", "d7"], why: "The queen leans on c3 from a5 and joins the attack on d4. It should not grab pawns while your development is unfinished." },
      { piece: "R", squares: ["d8", "c8"], why: "The rooks belong on the c- and d-files, the two files White's centre lives on." },
    ],
    pawns: ["g6", "c5"],
    order: [
      {
        before: "g6",
        after: "d5",
        why: "...g6 first. ...d5 with no bishop coming to g7 is met by cxd5 Nxd5 e4 and White gets the big centre with tempo and nothing looking at it.",
      },
      {
        before: "Nf6",
        after: "d5",
        why: "The knight must be on f6 before ...d5. Otherwise cxd5 leaves only your queen to take back, and e4 kicks it around while White develops.",
      },
    ],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "grunfeld-dare",
      title: "Let them build it, then hit it",
      oneLiner: "A big centre is only strong if nothing attacks it. Everything you own attacks it.",
      why: "White gets pawns on c3, d4 and e4 and feels wonderful. Then the g7-bishop, ...c5, ...Nc6, ...Bg4 and ...Qa5 all land on d4 and c3 at once, and the centre has to be defended instead of used. The one thing you must not do is sit still: a centre nobody pressures simply rolls forward and wins.",
    },
    {
      id: "grunfeld-knight-recaptures",
      title: "Recapture with the knight, not the queen",
      oneLiner: "After cxd5 it is ...Nxd5. The queen on d5 gets kicked by e4 and loses the game's tempo.",
      why: "The knight on d5 is happy: e4 invites ...Nxc3 doubling the pawns, and Nxd5 Qxd5 leaves your queen central and their e4 impossible. The queen on d5 is miserable: e4 hits it, it must move again, and White's centre arrives for free. This one recapture is most of what the opening asks you to remember.",
      trigger: { kind: "epd", epds: [P("d4 Nf6 c4 g6 Nc3 d5 cxd5")] },
      response: "...Nxd5.",
      ifIgnored: "...Qxd5 e4 and the queen runs while White develops. Worse, ...Qxe4 there loses the queen to Nxe4.",
    },
    {
      id: "grunfeld-double-the-pawns",
      title: "Trade on c3 and double the pawns",
      oneLiner: "When e4 hits the knight, ...Nxc3 bxc3. The c3-pawn is your target for the rest of the game.",
      why: "White can only recapture with the b-pawn, and now the queenside pawns are c3, d4 and a2 with a hole on b2. Your bishop hits c3 the moment d4 moves, ...Qa5 leans on it, and ...c5 makes d4 hard to hold. Retreating the knight instead hands White a healthy centre and keeps all their pieces.",
      trigger: { kind: "epd", epds: [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4")] },
      response: "...Nxc3.",
      ifIgnored: "After ...Nb6 White's pawns are untouched and the centre rolls forward.",
    },
    {
      id: "grunfeld-c5",
      title: "...c5 is the hammer",
      oneLiner: "Bishop to g7, then ...c5. Keep the tension; taking on d4 fixes their pawns for them.",
      why: "The pawn on c5 attacks d4 and combines with the bishop and ...Nc6. Do not play ...cxd4 without a reason: cxd4 repairs the doubled c-pawn, closes your bishop's diagonal, and turns their weakness into a healthy centre. Let White be the one who has to resolve it.",
      trigger: { kind: "epd", epds: [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4")] },
      response: "...c5, then ...Nc6, ...O-O and ...Bg4.",
    },
    {
      id: "grunfeld-vs-qb3",
      title: "Against Qb3: take c4 and castle",
      oneLiner: "The queen wants your d5-pawn. Give it c4 instead, castle, and hit the queen with your knights.",
      why: "In the Russian System White's queen goes to b3 to win the d5-pawn or make you defend it awkwardly. ...dxc4 Qxc4 gives it up in exchange for time: the queen is now a target on c4, ...Nc6 and ...Na5 or ...Nd7–b6 hit it, and your ...c5 or ...Bg4 comes while White is still moving the queen.",
      trigger: { kind: "opponent_san", sans: ["Qb3"] },
      response: "...dxc4, then ...O-O and knights toward the queen.",
    },
    {
      id: "grunfeld-no-greed",
      title: "Their pawns are targets, not free food",
      oneLiner: "d4 is guarded twice. Pile up before you take, and never grab with the queen.",
      why: "Every White pawn in the Exchange looks loose and almost none of them are. d4 has c3 and the queen behind it, e4 has the bishop or Nd2, and a2 is guarded by the rook. Count defenders before you take. The Grünfeld wins by pressure that forces a concession, not by snatching a pawn on move eight.",
      trigger: { kind: "tag", tags: ["grabs_pawn", "early_queen"] },
      response: "Count the defenders of the pawn; if it is guarded, add another attacker instead.",
    },
    {
      id: "grunfeld-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, then attack d4 with everything: ...Nc6, ...Bg4, ...Qa5, ...Rd8.",
      why: "Out of book you have one job: make White's centre uncomfortable. Pin the knight that defends d4 with ...Bg4, put a knight on c6, lean on c3 with ...Qa5, and bring a rook to d8. If White pushes d5 to escape the pressure, your bishop's diagonal opens and the c3-pawn hangs; if they hold, they spend all their moves defending. Either way you are doing the asking.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...g6 and ...d5 once a knight sits on c3.", why: "The main move; the Grünfeld is built for it." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 — and ...d5 when d4 and Nc3 are both in.", why: "The English. Your setup works and usually transposes." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7, then ...d5.", why: "Flexible; often becomes a Grünfeld a move later." },
        { san: "e4", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nf6, ...g6, ...Bg7 — the Pirc, the closest cousin of your setup.", why: "Not a Grünfeld game. The fianchetto still works; the ...d5 strike does not." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7, ...d5 — two fianchettos facing each other.", why: "Quiet. Your setup does not change." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — stop e4 first; ...Nf6 and ...g6 follow.", why: "The knight wants e4. Take the square." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 and ...d5 — take the centre they ignored.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7, ...d5 — and note f4 has loosened their king.", why: "Bird's Opening. The long diagonal now points at a weakened king." },
      ],
    },

    [P("d4")]: { yourMove: { san: "Nf6", why: "Develop and cover e4. The d-pawn stays home until a white knight lands on c3 for it to trade against." } },

    [P("d4 Nf6")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "g6", howToAnswer: "...g6 — the bishop is going to g7.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, then ...d5 — a Grünfeld by another route.", why: "Normal. ...d5 still comes once the bishop is on g7." },
        { san: "Bf4", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, ...d5, ...O-O and ...c5 — the London is a slow centre you can hit the same way.", why: "The London. Nothing in your setup changes." },
        { san: "Bg5", verdict: "dubious", answer: "Ne4", howToAnswer: "...Ne4 — hit the bishop; after Bf4 or Bh4, ...d5 or ...c5.", why: "The Trompowsky. ...Ne4 asks it to move again." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — stop e4; if Bg5, ...Nbd7 and ...g6 or ...c6.", why: "The Veresov. Take e4 away with a pawn." },
        { san: "e3", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O, ...d5.", why: "Passive; it shuts in their c1-bishop." },
        { san: "g3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, ...d5 — the Neo-Grünfeld.", why: "A fianchetto against yours." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Nothing defends e4." },
        { san: "c3", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7, ...d5 — take the centre they did not.", why: "Timid." },
      ],
    },
    [P("d4 Nf6 c4")]: {
      yourMove: { san: "g6", why: "Prepare the bishop. It goes to g7 and looks at d4 for the rest of the game." },
      mistakes: [{ san: "d5", why: "Not yet. cxd5 Nxd5 e4 kicks the knight and White has the big centre with no bishop on g7 to hit it. ...g6 first, ...d5 only when a knight on c3 gives yours something to trade for." }],
    },
    [P("d4 Nf6 c4 g6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "d5", howToAnswer: "...d5 — the Grünfeld. Now the knight on c3 is the piece you trade for.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, then ...d5 — when Nc3 comes, it is a Grünfeld; if g3, a Neo-Grünfeld.", why: "Normal; White keeps options." },
        { san: "g3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, then ...d5 and ...O-O.", why: "The fianchetto. ...d5 is still your move." },
        { san: "f3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — after cxd5 Nxd5 e4 the knight goes to b6, and f3 has cost White a developing move.", why: "Preparing e4 with a pawn move. Slow, and it weakens the king." },
        { san: "e3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...d5.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — if Bxf6 Bxf6 you are happy; otherwise ...Ne4 asks the bishop to move.", why: "A bishop that will be hit by your knight." },
        { san: "Bf4", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...d5, ...O-O, ...c5.", why: "Normal, slightly slow." },
        { san: "h4", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — develop; if h5 then ...Nxh5 or ...gxh5 is fine, and their king has no pawn cover left.", why: "A pawn thrown at a fianchetto that has not even happened yet." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Nothing defends e4." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3")]: {
      yourMove: { san: "d5", why: "The Grünfeld. You strike at c4 before the bishop is even on g7, because the knight on c3 is now there for yours to trade against." },
    },
    [P("d4 Nf6 c4 g6 Nc3 d5")]: {
      replies: [
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 — the knight, never the queen.", why: "The Exchange Variation, White's most common choice." },
        { san: "Nf3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 — develop; if Qb3 then ...dxc4 and castle.", why: "Heading for the Russian System or a quiet line." },
        { san: "Bf4", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, then ...O-O and ...c5 — the bishop on f4 does not stop the plan.", why: "Solid development." },
        { san: "Bg5", verdict: "good", answer: "Ne4", howToAnswer: "...Ne4 — hit the bishop and the knight behind it; after Bf4 or Bh4, ...Nxc3 bxc3 and ...Bg7.", why: "A real line, and ...Ne4 is the standard answer." },
        { san: "e3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...c5 — normal moves.", why: "Solid but it shuts in the c1-bishop." },
        { san: "Qb3", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 Qxc4 Bg7 — the queen is a target on c4; castle and hit it with your knights.", why: "The Russian System idea a move early." },
        { san: "Qa4+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block with a developing move; the queen must move again.", why: "A check that develops nothing and loses time." },
        { san: "g3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O — then ...dxc4 or ...c6 depending on what White does.", why: "The fianchetto line." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 — a pawn. If Nxe4 Nxe4 nothing can take back: the queen's path along the fourth rank is blocked by their own c4 and d4 pawns.", why: "A pawn thrown into the centre with nothing behind it." },
      ],
    },

    // --- Exchange Variation ------------------------------------------------------
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5")]: {
      yourMove: { san: "Nxd5", why: "The knight. From d5 it either takes on c3 and doubles the pawns or, if Nxd5 Qxd5, leaves your queen in the centre where e4 is impossible." },
      mistakes: [{ san: "Qxd5", why: "e4 kicks the queen and White's centre arrives with tempo. Worse, ...Qxe4 there is not a pawn: Nxe4 takes the queen. The knight belongs on d5." }],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 — double the pawns. Then ...Bg7 and ...c5.", why: "The main line. White takes the centre and you take the structure." },
        { san: "Nf3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...c5 — the knight on d5 stays until e4 asks it to leave.", why: "Quiet development." },
        { san: "Nxd5", verdict: "dubious", answer: "Qxd5", howToAnswer: "...Qxd5 — now the queen is happy on d5, and e4 is impossible: ...Qxe4+ wins a pawn with check.", why: "White trades off the knight that guarded e4." },
        { san: "Qb3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 — whether bxc3 or Qxc3 follows, ...Bg7 and ...O-O. The b7-pawn is guarded by your bishop.", why: "Attacking d5 and b7 with the queen too early." },
        { san: "Bd2", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...c5 — the bishop on d2 blocks their own queen.", why: "It avoids doubled pawns at the cost of an awkward bishop." },
        { san: "g3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, then ...c5 or ...Nb6.", why: "The fianchetto." },
        { san: "e3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...O-O, ...c5.", why: "Passive." },
        { san: "Qa4+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block with development; if Qb3 then ...Nxc3 as usual.", why: "A check that only loses time." },
        { san: "Bg5", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 Bg7 — the bishop on g5 hits nothing.", why: "Aimed at an e7-pawn you are not going to move." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4")]: {
      yourMove: { san: "Nxc3", why: "Trade the knight for the one piece that keeps White's queenside tidy. bxc3 is the only recapture, and the c3-pawn is your target for the rest of the game." },
      mistakes: [
        { san: "Nb6", why: "It keeps White's pawns healthy and gives them the big centre for nothing. Take on c3 and make them pay for it." },
        { san: "Nf6", why: "e5 kicks it again. Three knight moves to end up where you started, and White's centre came for free." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3")]: {
      replies: [
        { san: "bxc3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 — the bishop looks at d4 through c3.", why: "The only sensible recapture. White's pawns are now c3, d4, e4 with a hole on b2." },
        { san: "Nf3", verdict: "bad", answer: "Nxd1", howToAnswer: "...Nxd1 — the knight takes the queen.", why: "White forgot the knight on c3 is theirs to lose." },
        { san: "Bd2", verdict: "bad", answer: "Nxd1", howToAnswer: "...Nxd1 Rxd1 — a queen for a knight.", why: "Attacking a knight that is already attacking the queen." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3")]: {
      yourMove: { san: "Bg7", why: "The Grünfeld bishop arrives. It hits d4 now and c3 the moment d4 moves." },
      mistakes: [{ san: "Qxd4", why: "d4 is guarded by the c3-pawn and the queen. You lose the queen for a pawn." }],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7")]: {
      replies: [
        { san: "Bc4", verdict: "good", answer: "c5", howToAnswer: "...c5 — the hammer. ...Nc6, ...O-O and ...Bg4 follow.", why: "The classical main line: the bishop eyes f7 and White wants Ne2 to keep the f3-square free of pins." },
        { san: "Nf3", verdict: "good", answer: "c5", howToAnswer: "...c5, ...O-O, then ...Bg4 pins the knight that defends d4.", why: "The modern main line." },
        { san: "Be3", verdict: "good", answer: "c5", howToAnswer: "...c5 — if dxc5 then ...Qa5 hits c3 and c5 at once.", why: "Defending d4 in advance." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — block with the pawn; the bishop must move again and ...c5 or ...O-O follows.", why: "A check that gains nothing." },
        { san: "Qb3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — f7 now has a rook and the king behind it, and b7 is guarded by your bishop. ...c5 next.", why: "An early queen aiming at b7 and f7. Neither is loose." },
        { san: "Rb1", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — the rook eyes b7, which your bishop guards. ...c5 next.", why: "A reasonable idea a move too early." },
        { san: "e5", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — the e-pawn went forward and d4 lost a defender's neighbour. ...Nc6 and ...O-O follow.", why: "Overextending. The pawn on e5 is easier to attack than to use." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4")]: {
      yourMove: { san: "c5", why: "The break the whole opening is built around. d4 is attacked by pawn and bishop; White must decide how to hold it." },
      mistakes: [{ san: "Qxd4", why: "d4 is guarded twice. After Qxd4 Bxd4 cxd4 you have given a bishop for a pawn, and the queen trade helped nobody but White." }],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5")]: {
      replies: [
        { san: "Ne2", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — a third attacker on d4. Then ...O-O and ...Bg4.", why: "Main line. The knight goes to e2 so a bishop on g4 has nothing to pin." },
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Bg4 pins the knight that holds d4.", why: "Natural, and it hands you the pin." },
        { san: "d5", verdict: "dubious", answer: "Bxc3+", howToAnswer: "...Bxc3+ — the pawn moved off the long diagonal and c3 has no defender. After Bd2 Bxa1 Qxa1 you have won a rook and a pawn for the bishop.", why: "Advancing the pawn everything was attacking uncovers the c3-pawn behind it." },
        { san: "dxc5", verdict: "dubious", answer: "Qxd1+", howToAnswer: "...Qxd1+ Kxd1 Bxc3 — queens off, their king stuck in the centre, and the c3-pawn gone.", why: "Releasing the tension loses the c3-pawn and their castling rights." },
        { san: "Be3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — keep piling on d4; ...O-O and ...Bg4 next.", why: "Solid." },
        { san: "Qb3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — b7 is guarded and f7 now has a rook. ...Nc6 next.", why: "The queen aims at f7 and b7; neither is available." },
        { san: "Rb1", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...Nc6 — b7 is guarded by your bishop.", why: "Eyeing b7 too early." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2")]: {
      yourMove: { san: "Nc6", why: "A third piece on d4. White now has to keep spending moves on the centre they were so proud of." },
      mistakes: [{ san: "cxd4", why: "cxd4 repairs the doubled pawn, closes your bishop's diagonal, and gives White a healthy centre. Keep the tension; let them be the one who has to resolve it." }],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2 Nc6")]: {
      replies: [
        { san: "Be3", verdict: "good", answer: "O-O", howToAnswer: "...O-O — castle, then ...Bg4 and ...Qc7 or ...Na5.", why: "Main line; d4 gets its third defender." },
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — and now ...Bg4, ...Qc7, ...Rd8 all pile on.", why: "Natural." },
        { san: "d5", verdict: "dubious", answer: "Ne5", howToAnswer: "...Ne5 — the knight lands on a great square and hits the c4-bishop. Then ...O-O.", why: "Pushing releases the pressure but leaves the knight a perfect outpost." },
        { san: "dxc5", verdict: "dubious", answer: "Qa5", howToAnswer: "...Qa5 — hits c5 and c3 at once; White cannot hold both.", why: "Releasing the tension leaves loose pawns on c3 and c5." },
        { san: "Rb1", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — b7 is guarded; then ...cxd4 cxd4 Qa5+ is a real idea now the rook has left a1.", why: "Reasonable but slow." },
        { san: "h4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — a pawn charge with nothing behind it. Continue with ...Bg4 and ...cxd4.", why: "Attacking before developing." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2 Nc6 Be3")]: {
      yourMove: { san: "O-O", why: "King safe before the fight. Your pieces are all pointing at d4 and nothing needs doing in a hurry." },
      mistakes: [{ san: "cxd4", why: "It lets White repair the pawns with cxd4. And do not follow with ...Nxd4: it is guarded by the bishop, the knight and the queen, and you lose a piece for a pawn." }],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2 Nc6 Be3 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin the knight that props up d4. If f3 kicks it, ...Bd7 or ...Na5 and the c4-bishop has to move.", why: "Main line. Both kings are safe and the fight is about d4." },
        { san: "Rb1", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 cxd4 Qa5+ — with the rook off a1 the check gains time and the d4-pawn is a target.", why: "The rook eyes b7, which your bishop guards." },
        { san: "Qd2", verdict: "dubious", answer: "Bg4", howToAnswer: "...Bg4 — the pin; after f3 ...Bd7.", why: "Defending d4 with the queen from d2." },
        { san: "d5", verdict: "dubious", answer: "Ne5", howToAnswer: "...Ne5 — the knight lands on a great square and hits the bishop on c4.", why: "Pushing gives the knight an outpost." },
        { san: "h4", verdict: "dubious", answer: "Bg4", howToAnswer: "...Bg4 — ignore the pawn charge and pin the knight.", why: "Attacking with a pawn while the centre is still under pressure." },
        { san: "dxc5", verdict: "dubious", answer: "Qc7", howToAnswer: "...Qc7 — hits c5, and the queen eyes h2 later.", why: "Releasing the tension leaves c5 loose." },
      ],
    },

    // --- Russian System: 4.Nf3 Bg7 5.Qb3 ---------------------------------------------
    [P("d4 Nf6 c4 g6 Nc3 d5 Nf3")]: {
      yourMove: { san: "Bg7", why: "Develop. White has kept the tension on d5, so you finish the fianchetto and let them decide." },
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7")]: {
      replies: [
        { san: "Qb3", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 Qxc4 O-O — give up d5 for time; the queen on c4 is a target.", why: "The Russian System. White's queen goes hunting for the d5-pawn." },
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 — then e4 Nxc3 bxc3 c5 as usual.", why: "The Exchange with the knight already on f3." },
        { san: "Bf4", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...c5 hits d4 — e3 c5 is the main line.", why: "Solid development." },
        { san: "e3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...c5 or ...dxc4 and ...c6.", why: "Quiet." },
        { san: "Bg5", verdict: "good", answer: "Ne4", howToAnswer: "...Ne4 — hit the bishop; after cxd5 Nxg5 Nxg5 e6 you are fine.", why: "A real line; ...Ne4 is the standard answer." },
        { san: "Qa4+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block and develop; if Qb3 then ...dxc4 Qxc4 O-O.", why: "A check that loses time." },
        { san: "g3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...dxc4 or ...c6.", why: "The fianchetto." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3")]: {
      yourMove: { san: "dxc4", why: "Give up the pawn White is fishing for and take the time instead. The queen recaptures on c4, where your knights will hit it." },
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4")]: {
      replies: [
        { san: "Qxc4", verdict: "good", answer: "O-O", howToAnswer: "...O-O — castle; then ...Bg4 or ...Nc6 and knights toward the queen.", why: "Main line." },
        { san: "Qxb7", verdict: "bad", answer: "Bxb7", howToAnswer: "...Bxb7 — the pawn was guarded by your bishop.", why: "Greed. The queen is lost for a pawn." },
        { san: "e4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — the c4-pawn is still yours; if Qxc4 then ...Bg4 as usual.", why: "Taking the centre before recovering the pawn." },
      ],
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4")]: {
      yourMove: { san: "O-O", why: "King safe. You are fully developed on the kingside and White's queen is out early; time is on your side." },
    },
    [P("d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin the knight; then ...Nfd7 and ...Nb6 hits the queen.", why: "Main line. White has the centre; you have the moves." },
        { san: "Bf4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — hits d4; if d5 then ...Na5 hits the queen.", why: "Development that keeps e4 for later." },
        { san: "e3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...Be6 or ...Na5 against the queen.", why: "Solid but the c1-bishop is shut in." },
      ],
    },
  },

  traps: [
    {
      name: "The queen recapture",
      sans: sans("1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Qxd5 5.e4 Qxe4+ 6.Nxe4"),
      punisher: "white",
      tell: "You recapture on d5 with the queen and the e4-pawn looks free.",
      why: "The knight on c3 guards e4. ...Qxd5 already loses time to e4; ...Qxe4 loses the queen. Recapture with the knight on d5, and trade it on c3 when e4 comes.",
    },
    {
      name: "The knight trade that hangs e4",
      sans: sans("1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.Nxd5 Qxd5 6.e4 Qxe4+"),
      punisher: "black",
      tell: "White simplifies with Nxd5 and then pushes e4 out of habit.",
      why: "The knight on c3 was the only thing guarding e4. Once it is traded, your queen on d5 sits on the diagonal and e4 is just a pawn with check. Look for it every time a queen lands on d5.",
    },
    {
      name: "d5 uncovers c3",
      sans: sans("1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 Bg7 7.Bc4 c5 8.d5 Bxc3+ 9.Bd2 Bxa1 10.Qxa1"),
      punisher: "black",
      tell: "The pawn on d4 is under fire and White pushes it forward to get away.",
      why: "The d4-pawn was the only thing between your bishop and c3. Push it and the bishop takes on c3 with check, then on a1. White gets a bishop for a rook and a pawn. The lesson is the whole opening in one move: a big centre that moves forward under pressure leaves holes behind it.",
    },
  ],

  modelGames: [
    {
      label: "Exchange main line: the bishop pair on c4 and e3",
      sans: sans("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Bc4 c5 Ne2 Nc6 Be3 O-O O-O Bg4 f3 Na5 Bd3 cxd4 cxd4 Be6"),
      summary: "The classical picture: White gets the centre, you get pressure. ...Bg4 pins, ...Na5 kicks the bishop, and after ...cxd4 the d4-pawn is isolated and your bishop on e6 owns the light squares.",
    },
    {
      label: "Exchange with Nf3: grabbing a2",
      sans: sans("d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Nf3 c5 Rb1 O-O Be2 cxd4 cxd4 Qa5+ Bd2 Qxa2 O-O"),
      summary: "The modern main line. Once the rook has left a1, ...cxd4 and ...Qa5+ pick up the a2-pawn. White gets a lead in development for it; you get a pawn and a queen that must find its way home. Sharp, and worth knowing exists.",
    },
    {
      label: "Russian System: hitting the queen",
      sans: sans("d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7 Qb3 Nb6 Rd1 Nc6 d5 Ne5"),
      summary: "You give up d5 for time. ...Bg4 pins, the knight reroutes to b6 to hit the queen, and when White pushes d5 to escape, ...Ne5 lands on the best square on the board.",
    },
  ],

  middlegamePlan:
    "White has the centre; you have the pieces aimed at it, and the game is decided by whether the pressure tells before the centre rolls. " +
    "Attack d4 with everything: the bishop on g7, the pawn on c5, a knight on c6, ...Bg4 pinning the defender, ...Qa5 or ...Qc7 leaning on c3, and a rook on d8. " +
    "Keep the tension as long as you can; ...cxd4 only when it wins something, because cxd4 repairs White's pawns. " +
    "If White pushes d5 to escape, your bishop's diagonal opens and the c3-pawn becomes the target, and your knight gets e5 or a5. " +
    "Do not grab pawns with the queen while your development is unfinished; the Grünfeld wins by making White's pieces defend pawns instead of attacking.",

  structureDiagram: {
    fen: "rnbqk2r/pp2ppbp/6p1/2p5/2BPP3/2P5/P4PPP/R1BQK1NR w KQkq - 0 8",
    orientation: "black",
    arrows: [
      { from: "c5", to: "d4" },
      { from: "g7", to: "d4" },
    ],
    caption: "The Exchange Grünfeld after 7...c5: White's pawns on c3, d4 and e4 look proud, and the bishop on g7 and pawn on c5 are already leaning on d4. The doubled c-pawn is the weakness you created with ...Nxc3.",
  },
};
