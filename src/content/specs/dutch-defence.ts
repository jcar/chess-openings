// Dutch Defence (1.d4 f5) — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// The opening is one square: e4. The f-pawn takes it away from White on move
// one, and everything after that is about developing behind the pawn without
// dropping anything on the light squares it left behind. We teach the Classical
// (...e6, ...Be7, ...d6, ...Qe8) with the ...e5 break as the goal.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const dutchDefence: OpeningSpec = {
  id: "dutch-defence",
  name: "Dutch Defence",
  aliases: ["Stonewall", "Leningrad"],
  eco: "A80–A99",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 f5",
  tabiyaFen: "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  pitch:
    "One pawn move takes the e4-square away from White for the whole game and tells them the fight is on the kingside. " +
    "Most 1.d4 players under 1200 have a comfortable routine against ...d5 and ...Nf6; against ...f5 they have nothing, and you get the attacking chances.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6", "e4"], why: "The king's knight sits on f6 covering e4, and later jumps into e4 itself when the square is safe." },
      { piece: "B", squares: ["e7", "d6"], why: "The Classical bishop. On e7 it gets you castled; later it often drops back to d6 or swings to h4-ish squares once ...e5 is in." },
      { piece: "N", squares: ["d7", "c6"], why: "The queen's knight supports the ...e5 break. d7 keeps the c-pawn free; c6 hits d4 but can be kicked by d5." },
      { piece: "Q", squares: ["e8", "h5"], why: "The Classical queen move. From e8 it backs up ...e5 and can swing to h5 against the king if the centre closes." },
      { piece: "B", squares: ["d7", "b7"], why: "The light bishop is your slowest piece. It comes out via d7, or via ...b6 and b7 to fight for e4." },
    ],
    pawns: ["f5", "e6", "d6"],
    order: [
      {
        before: "d6",
        after: "e5",
        why: "...d6 first. ...e5 with the d-pawn still on d7 is met by dxe5 and there is nothing to take back with: you are simply a pawn down.",
      },
    ],
    castle: "O-O",
    castleBy: 6,
  },

  ideas: [
    {
      id: "dutch-e4-square",
      title: "The opening is about e4",
      oneLiner: "...f5 stops e4. Keep it stopped: ...Nf6, then a knight of your own lands there.",
      why: "White's whole 1.d4 plan is to get a second pawn to e4 and own the centre. The f5-pawn says no, the f6-knight says no again, and once you have castled the e4-square becomes a home for your knight rather than their pawn. If you are unsure what to do, ask whether e4 is still yours.",
    },
    {
      id: "dutch-d6-before-e5",
      title: "...d6 before ...e5",
      oneLiner: "The break is ...e5, but only after ...d6 guards it.",
      why: "...e5 is the move the whole Classical setup is built for: it opens the e7-bishop, frees the f5-pawn to advance and hits d4. Played too early it just drops a pawn to dxe5. The order is ...e6, ...Be7, ...O-O, ...d6, ...Qe8, ...Nbd7 and then ...e5.",
      trigger: { kind: "epd", epds: [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4")] },
      response: "...d6 now, then ...Qe8, ...Nbd7 and ...e5.",
      ifIgnored: "An early ...e5 loses a pawn to dxe5, and a position without the break has no plan.",
    },
    {
      id: "dutch-light-squares",
      title: "Mind the light squares",
      oneLiner: "...f5 loosened e6, g6 and the e8–h5 diagonal. Castle early and don't chase bishops with pawns.",
      why: "Your king's cover now leaks on the light squares: a queen on h5 is a check, e6 is a target for a knight or a bishop on b3, and ...g5 or ...h6 pawn moves make it worse. The cure is boring and effective: ...Nf6, ...e6, ...Be7, ...O-O, and only then think about attacking.",
      trigger: { kind: "opponent_san", sans: ["Qh5+", "Qh5", "Bb3", "Bc4"] },
      response: "Block or cover with a piece, not a pawn; get castled.",
    },
    {
      id: "dutch-vs-bg5",
      title: "Bg5 on move two: don't chase it with pawns",
      oneLiner: "Meet 2.Bg5 with ...Nf6. ...h6 and ...g5 walk into Qh5 mate.",
      why: "White's bishop on g5 looks annoying, and the pawn-kicking reflex (...h6, ...g5) is exactly what it wants: after e3 the h4-bishop is bait, and Qh5+ is checkmate because ...f5 opened the diagonal. Play ...Nf6 and let Bxf6 exf6 happen if it must; your two bishops and e4-grip are worth the doubled pawn.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["g5"] },
      response: "...Nf6. If Bxf6, ...exf6 and develop.",
      ifIgnored: "...h6, Bh4 g5, e3 gxh4, Qh5 mate is a game that has been lost thousands of times.",
    },
    {
      id: "dutch-staunton",
      title: "The Staunton Gambit: take, then develop",
      oneLiner: "After 2.e4, take the pawn and put the knight on f6. Give it back rather than fall behind.",
      why: "2.e4 fxe4 3.Nc3 Nf6 4.Bg5 is White's most aggressive try. You are a pawn up and White has the moves. Develop with ...Nc6 or ...c6 and ...d5, keep the king safe, and if the pawn costs too much to hold, hand it back with a normal position. Greed is what the gambit is fishing for.",
      trigger: { kind: "opponent_san", sans: ["e4"] },
      response: "...fxe4, then ...Nf6 and ...Nc6.",
    },
    {
      id: "dutch-qe8",
      title: "The Classical queen move",
      oneLiner: "...Qe8 unpins the e-pawn, backs ...e5, and eyes h5.",
      why: "It looks odd, but the queen on e8 does three things at once: it takes the queen off the d-file so ...e5 doesn't run into dxe5 and Qxd8, it backs the e-pawn once a knight supports the break, and it can swing to h5 for a kingside attack when the centre closes. One catch: with the bishop on e7 the queen does not see e5, so ...Nbd7 goes in before the pawn goes forward. Learn it as a set piece: ...d6, ...Qe8, ...Nbd7, ...e5.",
      trigger: { kind: "epd", epds: [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3")] },
      response: "...Qe8.",
    },
    {
      id: "dutch-book-end",
      title: "When the book runs out",
      oneLiner: "Castled, ...d6, ...Qe8 and ...Nbd7 in? Break with ...e5, or plant a knight on e4 and attack.",
      why: "The Dutch is a plan, not a memory test. With the king safe and the setup complete, you have two ways forward: ...e5 (once two pieces guard it) to open the position and free your pieces, or ...Ne4 followed by ...Qh5, ...Rf6 and ...g5 for a direct kingside attack when White has closed the centre with d5. Pick one and commit; sitting still is the only real mistake.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "Nf6 first, then ...f5 or ...d5 depending on what White shows.", why: "A quiet first move. Delay ...f5 by one move so Qh5+ ideas have nothing to bite on." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "Nf6 and develop; White has told you nothing yet.", why: "Passive. Take the centre with normal development and add ...f5 when it is safe." },
        { san: "d4", verdict: "good", answer: "f5", howToAnswer: "...f5 — the Dutch. e4 is yours from move one.", why: "The main move, and the one this opening is built against." },
        { san: "c4", verdict: "good", answer: "f5", howToAnswer: "...f5, then ...Nf6, ...e6 and ...Be7 — the same setup against the English.", why: "White usually follows with d4 anyway, and your moves don't change." },
        { san: "Nf3", verdict: "good", answer: "f5", howToAnswer: "...f5, ...Nf6, ...e6, ...Be7 — the same setup.", why: "Flexible; often transposes after d4." },
        { san: "g3", verdict: "good", answer: "f5", howToAnswer: "...f5, ...Nf6, ...e6 — the fianchetto is coming and you are ready for it.", why: "White's most common Dutch setup, one move early." },
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 or your usual answer to 1.e4. The Dutch is a reply to 1.d4, not to 1.e4 — never play ...f5 here.", why: "1.e4 f5 hands White a free centre and an open diagonal to your king; that is a different, much worse, opening." },
        { san: "b3", verdict: "dubious", answer: "f5", howToAnswer: "...f5, ...Nf6, ...e6 — but note their bishop on b2 will look at your kingside, so castle before you attack.", why: "Larsen's Opening. The long diagonal points at your loosened king, which is the one thing to respect." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...e6 — a Bird's Opening; take the centre they gave you.", why: "The mirror image of your idea, but you are the one with the centre." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — stop e4 before it comes, then ...Nf6 and ...e6.", why: "White wants e4. Take the square with a pawn while the knight is committed." },
      ],
    },

    [P("d4")]: { yourMove: { san: "f5", why: "The Dutch. You take e4 away from White before they have even thought about it, and stake your claim on the kingside." } },

    [P("d4 f5")]: {
      replies: [
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "Nf6, then ...e6 and ...Be7 — a mirror image where you move second but your setup is the one with a plan.", why: "White copies you. Nothing wrong with it, but it gives you the position you wanted." },
        { san: "d5", verdict: "dubious", answer: "Nf6", howToAnswer: "Nf6, then ...e6 or ...c6 to hit the pawn that ran too far.", why: "Grabbing space before developing. That pawn on d5 needs support White has not got yet." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6, ...Be7, ...O-O.", why: "The main line. White fianchettoes to contest the light squares and e4; you develop behind the f-pawn." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...Be7 — normal.", why: "White takes queenside space; g3 and Bg2 usually follow." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...Be7.", why: "Normal development." },
        { san: "Nc3", verdict: "good", answer: "d5", howToAnswer: "...d5 — the knight on c3 wants e4, so take the square with a pawn now. If Bg5, ...Nf6 and ...e6.", why: "An honest attempt at e4. ...d5 stops it and heads for a Stonewall-shaped centre." },
        { san: "Bg5", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — develop. If Bxf6 exf6 you have the two bishops and a grip on e4. Do NOT chase it with ...h6 and ...g5.", why: "The Hopton Attack. It exists to tempt you into pawn moves that open your king." },
        { san: "e4", verdict: "good", answer: "fxe4", howToAnswer: "...fxe4, then ...Nf6 and ...Nc6 or ...c6 — develop, and give the pawn back if holding it costs too much.", why: "The Staunton Gambit. White gives a pawn for open lines; sensible development beats it." },
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...Be7, ...O-O — the London against the Dutch.", why: "Quiet and solid. Nothing special is needed." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...Be7 — normal moves.", why: "Passive: it shuts in the c1-bishop." },
        { san: "Qd3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — the queen came out to push e4, so take the square first. Then ...Nf6.", why: "An early queen move aiming at e4. One pawn move refutes the idea." },
        { san: "h3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...Be7 — develop; if g4 comes you will have ...fxg4 and a loose king to aim at.", why: "Preparing g4 to break up your pawn. Slow, and it weakens their own king." },
      ],
    },

    // --- Main line: 2.g3 --------------------------------------------------------
    [P("d4 f5 g3")]: {
      yourMove: { san: "Nf6", why: "The knight covers e4 a second time and is the first piece of the setup. Everything else goes behind it." },
      mistakes: [{ san: "e5", why: "It looks like a gambit but it is just a pawn: dxe5 and nothing takes back. ...e5 comes much later, after ...d6." }],
    },
    [P("d4 f5 g3 Nf6")]: {
      replies: [
        { san: "Bg2", verdict: "good", answer: "e6", howToAnswer: "...e6 — open the f8-bishop; ...Be7 and ...O-O next.", why: "Main line. The bishop on g2 looks at e4 and b7; your setup covers both." },
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Be7, ...O-O.", why: "Normal; Bg2 comes next." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Be7, ...O-O.", why: "Normal." },
        { san: "Nh3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...Be7 — the knight is heading to f4 to hit e6, so be ready with ...d5 or ...Nc6.", why: "A real idea, but a knight on the rim is slow." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — now Bxf6 Bxf6 gives you a lovely bishop. No pawn kicks needed.", why: "With ...e6 available the bishop trade just helps you." },
        { san: "Nc3", verdict: "good", answer: "d5", howToAnswer: "...d5 — stop e4 for good, then ...e6 and ...Bd6 or ...Be7.", why: "White is angling for e4. A Stonewall-shaped centre answers it." },
        { san: "b3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...Be7, ...O-O — and mind the b2-bishop looking at your kingside.", why: "A second fianchetto. It watches e5, which is where your break goes, so prepare it well." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2")]: {
      yourMove: { san: "e6", why: "The Classical Dutch. It opens the f8-bishop and covers d5; ...Be7 and ...O-O follow." },
      mistakes: [
        { san: "e5", why: "Still too early: dxe5 wins a pawn and Ng4 does not get it back once Nf3 defends." },
        { san: "Nc6", why: "It blocks your c-pawn and asks for d5, which kicks the knight and gains time." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — modest and right. Castle next.", why: "The main line." },
        { san: "c4", verdict: "good", answer: "Be7", howToAnswer: "...Be7, ...O-O, ...d6.", why: "Normal; Nf3 follows." },
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin the knight that wants to support e4; ...O-O and ...d6 follow.", why: "The knight on c3 aims at e4. Pinning it takes the idea away." },
        { san: "Nh3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and ...O-O; if Nf4 then ...d5 or ...Nc6 covers e6.", why: "Heading for f4 to pressure e6. Slow." },
        { san: "Bg5", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — break the pin; Bxf6 Bxf6 gives you the good bishop.", why: "Trading on f6 helps you here." },
        { san: "Qd3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — take e4 for good; the queen has nothing to do on d3.", why: "The queen eyes e4. One pawn move ends that." },
        { san: "e3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, ...O-O, ...d6 — nothing changes.", why: "Passive; it blocks the c1-bishop." },
        { san: "b3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and ...O-O; the b2-bishop watches e5, so support the break with ...Nbd7.", why: "Slow, but the long diagonal is real." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3")]: {
      yourMove: { san: "Be7", why: "Just develop. The bishop is not doing much on e7, but it gets the king castled, and from e7 it can come to d6 or f6 later." },
      mistakes: [{ san: "Bd6", why: "It blocks your own d-pawn. ...d6 is the move that prepares ...e5; the bishop belongs on e7." }],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — king safe before anything else.", why: "Main line. Both sides tuck the king away." },
        { san: "c4", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...d6.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...d6 — if e4 comes, ...fxe4 Nxe4 Nxe4 and the trades suit you.", why: "Angling for e4. You have it covered." },
        { san: "Nbd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6 — the knight on d2 blocks their own bishop.", why: "It prepares e4 but is slow." },
        { san: "b3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6, ...Nbd7 — support e5 before breaking.", why: "The b2-bishop will look at e5." },
        { san: "e4", verdict: "bad", answer: "fxe4", howToAnswer: "...fxe4 — a free pawn. After Ng5, ...d5 holds it.", why: "The pawn on e4 has no support. This is why you played ...f5." },
        { san: "Nh4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — the knight on h4 eyes f5 but e6 guards it. ...d5 next if it bothers you.", why: "A knight on the rim hitting a pawn that is already defended." },
        { san: "c3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...d6 — normal moves.", why: "Timid." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O")]: {
      yourMove: { san: "O-O", why: "Get the king behind its pawns before you do anything with them. ...f5 loosened the light squares; castling is how you pay that back." },
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "d6", howToAnswer: "...d6 — the pawn that makes ...e5 possible. ...Qe8 next.", why: "Main line." },
        { san: "Nc3", verdict: "good", answer: "d6", howToAnswer: "...d6; if e4, ...fxe4 Nxe4 Nxe4 and you are fine.", why: "Normal, aiming at e4." },
        { san: "b3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...Qe8, ...Nbd7 — then ...e5.", why: "Slow." },
        { san: "Nbd2", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...Qe8 — the same plan.", why: "Prepares e4 but blocks the bishop." },
        { san: "Qd3", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — the queen eyes e4 but you already hold it, and on d3 it is in the way of their own pieces.", why: "An early queen move aiming at a square you control." },
        { san: "Ne5", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — the knight jumped in early and must go back.", why: "A tempo spent to be kicked." },
        { san: "Bf4", verdict: "dubious", answer: "d6", howToAnswer: "...d6, then ...Nh5 asks the bishop to move.", why: "The bishop on f4 will be hit by your knight." },
        { san: "Re1", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...Qe8 — same plan.", why: "Preparing e4 slowly." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4")]: {
      yourMove: { san: "d6", why: "The quiet move that makes everything else work. It guards e5 so the break can happen, and it opens the c8-bishop's route to d7." },
      mistakes: [{ san: "e5", why: "Not yet. dxe5 wins a pawn because the d-pawn is not there to take back. ...d6 first, always." }],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Qe8", howToAnswer: "...Qe8 — the Classical move. Then ...Nbd7 and the ...e5 break.", why: "Main line. White's knight eyes e4; your queen prepares the break." },
        { san: "b3", verdict: "good", answer: "Qe8", howToAnswer: "...Qe8, then ...Nbd7 and ...e5 — two pieces on e5 before the pawn goes forward.", why: "Normal; the b2-bishop will watch e5." },
        { san: "Qc2", verdict: "good", answer: "Qe8", howToAnswer: "...Qe8, ...Nbd7 and ...e5.", why: "Normal." },
        { san: "d5", verdict: "good", answer: "e5", howToAnswer: "...e5 — the centre closes. Now ...Nbd7, ...Ne8 and ...g5 with a kingside attack.", why: "White closes the centre. Your plan turns into a King's Indian-style pawn storm." },
        { san: "Nbd2", verdict: "dubious", answer: "Qe8", howToAnswer: "...Qe8, ...Nbd7, then ...e5 — the knight on d2 does not stop it.", why: "Slow." },
        { san: "Re1", verdict: "dubious", answer: "Qe8", howToAnswer: "...Qe8 — same plan.", why: "Preparing e4, which ...fxe4 handles." },
        { san: "Bf4", verdict: "dubious", answer: "Ne4", howToAnswer: "...Ne4 — the knight takes the square this opening is about, and the bishop on f4 is in its way.", why: "The bishop guards e5, so the break is off; occupy e4 instead." },
        { san: "Qb3", verdict: "dubious", answer: "Qe8", howToAnswer: "...Qe8 — the queen on b3 looks at e6 and b7 but nothing lands. ...Nbd7 next.", why: "An early queen move with no target." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3")]: {
      yourMove: { san: "Qe8", why: "The Classical queen. Off the d-file so ...e5 will not run into dxe5 and Qxd8, and ready to swing to h5 if the centre closes. ...Nbd7 next, then the break." },
      mistakes: [{ san: "Nc6", why: "d5 kicks it at once and hits e6 behind it. The knight belongs on d7 in this setup, supporting ...e5 without asking to be chased." }],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8")]: {
      replies: [
        { san: "Qc2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — a second piece on e5 before the break. Not ...e5 yet: dxe5 dxe5 Nxe5 wins a pawn because the e7-bishop blocks your queen.", why: "Main line. White covers e4 and waits; you finish the preparation." },
        { san: "b3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...e5 — with the knight on d7, dxe5 dxe5 Nxe5 Nxe5 is fine.", why: "Normal; the b2-bishop will watch e5, so support the break properly." },
        { san: "Re1", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — then ...e5. If e4 comes first, ...fxe4 Nxe4 Nxe4 Rxe4 and you are level.", why: "Preparing e4." },
        { san: "e4", verdict: "dubious", answer: "fxe4", howToAnswer: "...fxe4 — the pawn is yours. If Nxe4 Nxe4 nothing can recapture, because the g2-bishop is blocked by their own knight. After Ng5, hold it with ...d5.", why: "White pushes the pawn the whole opening was designed to stop, without enough behind it." },
        { san: "d5", verdict: "good", answer: "e5", howToAnswer: "...e5 — closed centre, and here the break is safe because d4 is gone. Then ...Nbd7, ...Ne8, ...g5 and the queen to h5.", why: "White locks the centre; your attack now goes through the kingside pawns." },
        { san: "b4", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 and ...e5 — queenside pawn moves do not stop the break.", why: "Space on the wrong wing." },
        { san: "Bf4", verdict: "dubious", answer: "Nh5", howToAnswer: "...Nh5 — kick the one piece that stops ...e5. Do not play ...e5 while the bishop sits on f4: dxe5 dxe5 Nxe5 and the pawn is simply gone.", why: "The bishop guards e5 and sets a small trap on the e-file. Move it first." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8 Qc2")]: {
      yourMove: { san: "Nbd7", why: "The last piece of preparation. With two knights guarding e5, dxe5 dxe5 Nxe5 is answered by ...Nxe5, and the break is finally safe." },
      mistakes: [{ san: "e5", why: "Not yet. dxe5 dxe5 Nxe5 wins a pawn: the bishop on e7 blocks your queen, so nothing takes back on e5. ...Nbd7 first." }],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8 Qc2 Nbd7")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "fxe4", howToAnswer: "...fxe4 Nxe4 Nxe4 Qxe4 — then ...Nf6 hits the queen and ...e5 follows.", why: "White finally gets e4 in, at the cost of trades that open the f-file for your rook." },
        { san: "b3", verdict: "good", answer: "e5", howToAnswer: "...e5 — the break. dxe5 dxe5 Nxe5 Nxe5 and everything is covered.", why: "Normal." },
        { san: "Re1", verdict: "good", answer: "e5", howToAnswer: "...e5 — safe now; if dxe5 dxe5, your knights hold the pawn.", why: "Preparing e4 too late." },
        { san: "e3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — take the space; after ...e4 the knight on f3 has to move.", why: "Passive." },
        { san: "d5", verdict: "good", answer: "e5", howToAnswer: "...e5 — closed centre; ...Nc5, ...a5 and the kingside pawns follow.", why: "Locking the centre." },
        { san: "Bf4", verdict: "dubious", answer: "Nh5", howToAnswer: "...Nh5 — kick the bishop first. With it on f4 White has three pieces on e5 and ...e5 dxe5 dxe5 Nxe5 Nxe5 Bxe5 still loses a pawn.", why: "The bishop adds a third attacker on e5, so the break has to wait one more move." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8 Qc2 Nbd7 b3")]: {
      yourMove: { san: "e5", why: "The move everything was for. The e7-bishop opens, the f5-pawn is free to advance, and d4 has to decide what to do." },
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8 Qc2 Nbd7 b3 e5")]: {
      replies: [
        { san: "dxe5", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 — recapture with the pawn. Now ...e4 or ...Qh5 are in the air.", why: "The most natural. The position opens and your pieces are the ones pointing at a king." },
        { san: "Bb2", verdict: "good", answer: "e4", howToAnswer: "...e4 — gain space and push the knight back. Then ...Nc5 and ...Qh5.", why: "White keeps developing; you take the centre." },
        { san: "e3", verdict: "dubious", answer: "e4", howToAnswer: "...e4 — the knight must move and your kingside attack has a spearhead.", why: "Passive." },
        { san: "d5", verdict: "good", answer: "Nc5", howToAnswer: "...Nc5 — a fine square; then ...a5 and the kingside pawns.", why: "Locking the centre. A slow kingside attack for you." },
      ],
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8 Qc2 Nbd7 b3 e5 dxe5")]: {
      yourMove: { san: "dxe5", why: "The pawn takes back, keeping a pawn on e5 that stops Nd4 and lets your knight reach e4 later. The d-file opens for your rook." },
    },
    [P("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8 Qc2 Nbd7 e4")]: {
      yourMove: { san: "fxe4", why: "Take. After Nxe4 Nxe4 Qxe4 you play ...Nf6 with tempo and the f-file is open for your rook." },
    },

    // --- 2.c4 ------------------------------------------------------------------
    [P("d4 f5 c4")]: { yourMove: { san: "Nf6", why: "Same setup, different order. The knight covers e4 and the rest follows." } },
    [P("d4 f5 c4 Nf6")]: {
      replies: [
        { san: "g3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Be7, ...O-O — back in the main line.", why: "Transposes." },
        { san: "Nc3", verdict: "good", answer: "e6", howToAnswer: "...e6; if e4 comes, ...fxe4 and develop.", why: "Angling for e4 or Bg5." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Be7, ...O-O.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — if Bxf6 Bxf6 the bishop is yours and it is a good one.", why: "The trade helps you once ...e6 is in." },
      ],
    },

    // --- 2.Nc3 and 2.Bg5 ------------------------------------------------------------
    [P("d4 f5 Nc3")]: { yourMove: { san: "d5", why: "The knight is there to push e4. Put a pawn on d5 and it never happens; ...Nf6, ...e6 and ...Bd6 follow." } },
    [P("d4 f5 Bg5")]: {
      yourMove: { san: "Nf6", why: "Develop and ignore the bishop. If Bxf6 exf6 you have two bishops and a firm grip on e4, and your king is still safe." },
      mistakes: [{ san: "h6", why: "The start of a famous disaster: Bh4 g5, e3 gxh4, Qh5 mate. Your f-pawn opened the e8–h5 diagonal, and pawn kicks open it further." }],
    },

    // --- Staunton Gambit -----------------------------------------------------------
    [P("d4 f5 e4")]: { yourMove: { san: "fxe4", why: "Take. White wants open lines and a lead in development; you take the pawn and make sure you develop just as fast." } },
    [P("d4 f5 e4 fxe4")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — develop and guard e4. If Bg5, ...Nc6 and be ready to give the pawn back.", why: "The main Staunton line." },
        { san: "f3", verdict: "good", answer: "exf3", howToAnswer: "...exf3 Nxf3, then ...Nf6 and ...e6 — you are a pawn up; just develop.", why: "White gets pieces out fast. Keep pace and the extra pawn matters later." },
        { san: "Qh5+", verdict: "bad", answer: "g6", howToAnswer: "...g6 — the queen must move again; then ...Nf6 with tempo.", why: "A check that gains nothing and loses time." },
        { san: "Bc4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6 — the bishop eyes g8 but e6 shuts the diagonal.", why: "Aggressive-looking; ...e6 blunts it." },
      ],
    },
    [P("d4 f5 e4 fxe4 Nc3")]: { yourMove: { san: "Nf6", why: "Develop and defend the extra pawn in one move." } },
    [P("d4 f5 e4 fxe4 Nc3 Nf6")]: {
      replies: [
        { san: "Bg5", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — hit d4; if d5 then ...Ne5 and the knight is a monster in the centre.", why: "The critical line. Counterattack, don't defend." },
        { san: "f3", verdict: "good", answer: "d5", howToAnswer: "...d5 — hold e4 with a pawn; after fxe4 dxe4 the d-file opens for you.", why: "Regaining the pawn by force, at the cost of an open king." },
        { san: "Bc4", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — shut the diagonal, then ...d5.", why: "The bishop looks at g8 but you close the door." },
        { san: "Nge2", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — keep the pawn and the centre.", why: "Slow." },
      ],
    },
    [P("d4 f5 Nc3 d5")]: {
      replies: [
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "Nf6, then ...e6 and ...Bd6 to challenge the bishop.", why: "The most common reply. White develops and eyes c7, so get your own pieces out before it matters." },
        { san: "Bg5", verdict: "good", answer: "Nf6", howToAnswer: "Nf6 — if Bxf6 exf6 your structure is fine and the e-file opens for you.", why: "Pins nothing yet; develop and let White decide whether to trade." },
        { san: "e3", verdict: "good", answer: "Nf6", howToAnswer: "Nf6, ...e6, ...Be7 and castle.", why: "Solid. Build the Stonewall-style centre and castle." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "Nf6, then ...e6 and ...c6.", why: "Normal development. Match it." },
      ],
    },
  },

  traps: [
    {
      name: "The Hopton mate",
      sans: sans("1.d4 f5 2.Bg5 h6 3.Bh4 g5 4.e3 gxh4 5.Qh5#"),
      punisher: "white",
      tell: "White's bishop lands on g5 on move two and the pawn-kicking reflex kicks in.",
      why: "...f5 opened the e8–h5 diagonal, and ...h6 and ...g5 open it further. The bishop on h4 is bait: take it and the queen arrives on h5 with checkmate, because g6 and f7 have no defenders left. Meet 2.Bg5 with ...Nf6 and let Bxf6 exf6 happen if it must.",
    },
    {
      name: "...e5 before ...d6",
      sans: sans("1.d4 f5 2.g3 Nf6 3.Bg2 e5 4.dxe5 Ng4 5.Nf3"),
      punisher: "white",
      tell: "The urge to strike in the centre before the setup is finished.",
      why: "The break is the point of the opening, but without a pawn on d6 there is nothing to recapture with. dxe5 wins a pawn, ...Ng4 attacks it and Nf3 simply defends it. Play ...d6 first, then ...Qe8, then ...e5.",
    },
    {
      name: "The e4 push that hangs a pawn",
      sans: sans("1.d4 f5 2.g3 Nf6 3.Bg2 e6 4.Nf3 Be7 5.e4 fxe4 6.Ng5 d5"),
      punisher: "black",
      tell: "White plays e4 without any piece behind it, hoping you will not take.",
      why: "The whole point of ...f5 is that e4 is not available. After ...fxe4 the pawn is yours, and ...d5 holds it: if Nxe4 dxe4 Bxe4 then ...Nxe4, and if Bxe4 Nxe4 Nxe4 dxe4 you have won a piece for a pawn. White must play f3 or Nc3 first to make e4 work, and both cost time.",
    },
  ],

  modelGames: [
    {
      label: "Classical main line: the ...e5 break",
      sans: sans("d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8 Qc2 Nbd7 b3 e5 dxe5 dxe5 e4 fxe4 Nxe4 Nxe4 Qxe4 Nf6 Qc2 Bd6"),
      summary: "The whole plan: develop behind the f-pawn, castle, ...d6, ...Qe8 and ...Nbd7, then ...e5 opens the position. After the trades on e4 your rook owns the f-file and the bishop on d6 points at their king.",
    },
    {
      label: "Leningrad: the fianchetto Dutch",
      sans: sans("d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8 d5 Na6 Rb1 Bd7"),
      summary: "The other main Dutch setup: bishop on g7 instead of e7, same ...d6, ...Qe8 and ...e5 idea. When White closes with d5 your knight goes to a6 and c5 and the kingside attack begins.",
    },
    {
      label: "Staunton Gambit: give it back, stay level",
      sans: sans("d4 f5 e4 fxe4 Nc3 Nf6 Bg5 Nc6 d5 Ne5 Qd4 Nf7 Bxf6 exf6 Nxe4 f5"),
      summary: "White gambits a pawn for speed. You take, develop with ...Nc6 and ...Ne5, and when White finally regains the pawn you have a solid position, two bishops, and no weaknesses.",
    },
  ],

  middlegamePlan:
    "The Dutch is a fight for e4 and an attack on the king behind it. With the Classical setup complete (...f5, ...e6, ...Be7, ...O-O, ...d6, ...Qe8, ...Nbd7), you have two plans. " +
    "If the centre is open, break with ...e5 once two pieces guard it: it frees the e7-bishop, hits d4 and lets the f-pawn roll. " +
    "If White closes the centre with d5, put a knight on e4 or e5, swing the queen to h5 and push ...g5 with a direct kingside attack. " +
    "Whatever you do, respect the light squares your f-pawn left behind: keep the king castled, cover e6, and never chase a bishop with ...h6 and ...g5.",

  structureDiagram: {
    fen: "rnbq1rk1/ppp1b1pp/3ppn2/5p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 7",
    orientation: "black",
    arrows: [
      { from: "e6", to: "e5" },
      { from: "f6", to: "e4" },
    ],
    caption: "The Classical Dutch after 6...d6: pieces behind the f-pawn, king castled, and the two plans in one picture — the ...e5 break and a knight landing on e4.",
  },
};
