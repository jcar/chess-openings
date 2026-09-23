// English Opening (1.c4) — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// The English is a fight for one square, d5, from the side: the c4-pawn, a
// knight on c3 and a bishop on g2 all look at it. You do not need to know
// what Black will do, because your first five moves are nearly always the
// same. What you need is the plan afterwards, and that is what this spec is for.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const englishOpening: OpeningSpec = {
  id: "english-opening",
  name: "English Opening",
  eco: "A10–A39",
  side: "white",
  family: "flank",
  firstMoves: "1.c4",
  tabiyaFen: "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
  pitch:
    "One pawn, one knight and one bishop all point at d5, and you play the same five moves against almost everything Black tries. " +
    "Nobody under 1200 has prepared for it, there are no forced tactics to memorise, and if Black plays ...e6 and ...d5 you can steer into a Queen's Gambit whenever you like.",

  setup: {
    pieces: [
      { piece: "N", squares: ["c3"], why: "The first piece out, every time. It attacks d5 and supports the c4-pawn. Play it before the other knight." },
      { piece: "B", squares: ["g2"], why: "The English bishop. From g2 it looks through d5 to the b7-pawn and the a8-rook, and it shelters your king." },
      { piece: "N", squares: ["f3", "e2"], why: "The king's knight. f3 is normal; e2 keeps the f-pawn free when you want f4 or e4." },
      { piece: "B", squares: ["d2", "e3", "g5"], why: "The dark bishop is the last piece to decide. d2 is modest, e3 hits c5, and g5 is the pin when the game turns into a Queen's Gambit." },
      { piece: "R", squares: ["b1", "c1"], why: "A rook on b1 supports the b4 push; on c1 it sits behind the c-pawn once the file opens." },
    ],
    pawns: ["c4", "g3"],
    order: [
      {
        before: "Nc3",
        after: "Nf3",
        why: "Queen's knight first. Against ...e5 a knight on f3 is a target for ...e4, which kicks it and gains time; with Nc3 already on the board, that push can be met by Ng5 hitting the pawn twice.",
      },
    ],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "english-d5",
      title: "It is all about d5",
      oneLiner: "c4, Nc3 and Bg2 all aim at d5. That is the opening.",
      why: "Instead of occupying the centre with a pawn, you control one central square from the side. If Black plays ...d5 you can trade on it and your pieces flood in; if Black never does, you have the space to expand on the queenside or break with d4 when you are ready.",
    },
    {
      id: "english-nc3-first",
      title: "Against ...e5: Nc3 before Nf3",
      oneLiner: "Play Nc3 first. Then ...e4 can be met by Ng5, and the pawn is a target.",
      why: "You are playing a Sicilian with colours reversed and an extra move. The one thing Black can do to annoy you is push ...e4 at a knight on f3. With the c3-knight already looking at e4, that push just loses time.",
      trigger: { kind: "opponent_san", sans: ["e5"] },
      response: "Nc3, then Nf3, g3 and Bg2.",
      ifIgnored: "2.Nf3 e4 and your knight has to move again before you have developed anything else.",
    },
    {
      id: "english-count-d4",
      title: "Before d4, count the recaptures",
      oneLiner: "Push d4 only when a knight can take back. ...cxd4 Qxd4 walks into ...Nc6.",
      why: "In the Symmetrical, Black's knight on c6 covers d4. If you push d4 and recapture with the queen, ...Nxd4 wins it. Get Nf3 in first so the knight recaptures, then d4 is your best break.",
      trigger: { kind: "tag", tags: ["claims_centre"] },
      response: "Nf3 first, d4 afterwards.",
      ifIgnored: "You are a pawn down or a queen down, depending on how you recapture.",
    },
    {
      id: "english-break-symmetry",
      title: "Break the symmetry first",
      oneLiner: "Both sides castled and mirrored? You move first, so d4 now.",
      why: "In the Symmetrical, Black copies you. The extra move means you get to break the symmetry, and d4 is how: after ...cxd4 Nxd4 your knights hit c6 and d5 and your g2-bishop has an open diagonal. Waiting lets Black play ...d5 and do the same to you.",
      trigger: { kind: "epd", epds: [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O")] },
      response: "d4.",
    },
    {
      id: "english-qgd",
      title: "...e6 and ...d5? Play d4",
      oneLiner: "When Black sets up ...e6 and ...d5, d4 gives you a Queen's Gambit Declined.",
      why: "The English is also a move-order trick. Black who plays ...e6 and ...d5 has committed to a Queen's Gambit structure without you ever allowing the Nimzo-Indian or Grunfeld. Play d4, then Bg5, e3 and Nf3 as in any QGD.",
      trigger: { kind: "opponent_san", sans: ["d5"] },
      response: "d4, then Bg5, e3, Nf3.",
    },
    {
      id: "english-b4",
      title: "The queenside push",
      oneLiner: "Rb1, a3 and b4 gain space where Black's pieces are not.",
      why: "With the centre calm, the English expands on the wing where it already has more pawns. Rb1 takes the rook off the long diagonal, a3 prepares, and b4 kicks a knight or bishop on c5 and opens lines for the g2-bishop. This is the plan when d4 is not available.",
      trigger: { kind: "opponent_piece_on", piece: "P", squares: ["e5"] },
      response: "Rb1, a3, b4.",
    },
    {
      id: "english-book-end",
      title: "When the book runs out",
      oneLiner: "Castled and developed? Choose: d4 in the centre or b4 on the wing.",
      why: "You will have c4, Nc3, g3, Bg2, Nf3 and a castled king. Look at d4: if a knight can recapture there, push it. If not, go Rb1, a3, b4. Keep the g2-bishop's diagonal open and never trade it for a knight without a reason.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "c4", why: "The English. It says nothing about the centre yet, except that d5 belongs to you." } },
    [P("c4")]: {
      replies: [
        { san: "d6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then g3, Bg2 and d4 — take the centre Black is not contesting.", why: "Passive. Black keeps options open and gives you free space." },
        { san: "e5", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — the queen's knight first, so ...e4 has no bite.", why: "The Reversed Sicilian. Black takes the centre; you play a Sicilian a move up." },
        { san: "c5", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, then g3, Bg2 and Nf3 — the same setup.", why: "The Symmetrical. Black mirrors you; you get to break the mirror first." },
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, then g3 and Bg2. If ...e6 and ...d5 follow, d4.", why: "Flexible. Black waits to see what you commit to." },
        { san: "e6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — and if ...d5, then d4 and you have a Queen's Gambit Declined.", why: "Black is heading for ...d5. Let them, then play d4." },
        { san: "c6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, then d4 — a Slav where you have not yet committed the centre.", why: "A Slav setup. Nothing to fear." },
        { san: "d5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 Qxd5 Nc3 — the queen has to move again and you are a move ahead.", why: "It walks into the trade and a tempo for you." },
        { san: "g6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, then g3 and Bg2. Both bishops face each other down the long diagonal.", why: "A King's Indian setup. Your g2-bishop answers it." },
        { san: "f5", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, g3, Bg2 — the bishop looks straight at the loosened king.", why: "A Dutch. The f-pawn move weakens e6 and the king; your bishop enjoys it." },
        { san: "b6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then e4 — take the centre while their bishop is still at home.", why: "Slow. Their bishop will come to b7, and e4 blunts it." },
        { san: "Nc6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then g3 and Bg2. If ...e5 comes, you are in the Reversed Sicilian.", why: "Unusual order; it usually transposes." },
      ],
    },

    // --- Symmetrical ----------------------------------------------------------
    [P("c4 c5")]: {
      yourMove: { san: "Nc3", why: "The first piece out. It hits d5 and supports c4, and it costs nothing." },
      mistakes: [{ san: "d4", why: "cxd4 Qxd4 Nc6 and the queen is chased around before you have a piece out. Nf3 first, d4 later." }],
    },
    [P("c4 c5 Nc3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "g3", howToAnswer: "g3 — start the fianchetto.", why: "The main line; Black covers d4." },
        { san: "Nf6", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, Nf3, castle.", why: "Normal development." },
        { san: "g6", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, Nf3, castle — the mirror.", why: "Black fianchettoes first." },
        { san: "e6", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, Nf3 — and be ready for ...d5 with cxd5.", why: "Black prepares ...d5. Your setup is ready for it." },
        { san: "e5", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, then d3 and Nge2 or Nf3 — a slow game where b4 is your plan.", why: "The Botvinnik setup against you: Black takes d4 and gives up d5." },
        { san: "d6", verdict: "dubious", answer: "g3", howToAnswer: "g3, Bg2, Nf3, castle.", why: "Passive." },
        { san: "b6", verdict: "dubious", answer: "g3", howToAnswer: "g3, Bg2 — your bishops face off along the same diagonal and yours arrived first.", why: "Slow." },
        { san: "Qa5", verdict: "bad", answer: "g3", howToAnswer: "g3 and Bg2. The queen threatens nothing: Qxc3 is met by bxc3. Develop and she becomes a target for Nd5 or a3 and b4.", why: "An early queen that pins a knight defended by two pawns." },
      ],
    },
    [P("c4 c5 Nc3 Nc6")]: {
      yourMove: { san: "g3", why: "Prepare the bishop that makes the English work. It will look through d5 to the a8-corner." },
      mistakes: [{ san: "d4", why: "cxd4 and you cannot take back with the queen because of ...Nxd4. The pawn comes back eventually, but for nothing. Nf3 first." }],
    },
    [P("c4 c5 Nc3 Nc6 g3")]: {
      replies: [
        { san: "g6", verdict: "good", answer: "Bg2", howToAnswer: "Bg2 — the bishop takes the long diagonal.", why: "The full mirror." },
        { san: "Nf6", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, Nf3, castle.", why: "Normal." },
        { san: "e6", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, Nf3, castle — if ...d5, cxd5 and your bishop is on the open diagonal.", why: "Preparing ...d5." },
        { san: "e5", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, then d3, Nf3 or Nge2, and expand with a3 and b4.", why: "Black takes d4 and gives you d5." },
        { san: "d6", verdict: "dubious", answer: "Bg2", howToAnswer: "Bg2, Nf3, castle.", why: "Passive." },
        { san: "Nd4", verdict: "dubious", answer: "Bg2", howToAnswer: "Bg2 — ignore it. e3 will kick the knight when convenient, and it has no support on d4.", why: "A knight jump to a square nothing holds." },
        { san: "Qa5", verdict: "bad", answer: "Bg2", howToAnswer: "Bg2, Nf3, castle — a3 and b4 will hit the queen later.", why: "Early queen, no threat." },
        { san: "h5", verdict: "bad", answer: "Bg2", howToAnswer: "Bg2, Nf3, and castle anyway — the h-pawn alone attacks nothing.", why: "A pawn lunge with no pieces behind it." },
      ],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6")]: { yourMove: { san: "Bg2", why: "The English bishop. From g2 it looks at d5, b7 and a8, and your king will hide behind it." } },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2")]: {
      replies: [
        { san: "Bg7", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — develop and cover d4 before you push it.", why: "The mirror continues." },
        { san: "Nf6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, castle.", why: "Normal." },
        { san: "e6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, castle, and meet ...d5 with cxd5.", why: "Preparing ...d5." },
        { san: "d6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, castle, then d4.", why: "Passive." },
        { san: "e5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, d3, castle, then a3 and b4.", why: "Black takes d4 and hands you d5." },
        { san: "d5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 — a pawn. Black will chase it with ...Nd4 or ...Nb4; d3 and Nf3 keep everything together.", why: "Too early: the pawn falls and Black's compensation is only activity." },
        { san: "Nd4", verdict: "dubious", answer: "e3", howToAnswer: "e3 — kick the knight; it has no support on d4.", why: "A jump with nothing behind it." },
        { san: "h5", verdict: "bad", answer: "Nf3", howToAnswer: "Nf3, castle. h3 stops ...h4 if you want to; the lunge has no pieces behind it.", why: "A single pawn attack against a fianchetto." },
      ],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7")]: {
      yourMove: { san: "Nf3", why: "Cover d4 with a knight so the break can be recaptured by a piece and not by the queen." },
      mistakes: [{ san: "d4", why: "cxd4 and there is no good recapture: Qxd4 loses the queen to ...Nxd4 and Nb5 only chases the pawn. Nf3 first." }],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "O-O", howToAnswer: "O-O — king safe, then d4.", why: "The full Symmetrical." },
        { san: "e6", verdict: "good", answer: "O-O", howToAnswer: "O-O, then d4 or meet ...d5 with cxd5.", why: "Preparing ...d5." },
        { san: "e5", verdict: "good", answer: "O-O", howToAnswer: "O-O, d3, then a3, Rb1 and b4.", why: "Botvinnik-style; Black takes d4 and cedes d5." },
        { san: "d6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then d4.", why: "Passive." },
        { san: "a6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then d4 before Black's ...Rb8 and ...b5 gets going.", why: "Preparing ...b5, slowly." },
        { san: "Nh6", verdict: "bad", answer: "O-O", howToAnswer: "O-O and d4 — the knight on h6 is out of the game.", why: "The wrong square for the knight." },
        { san: "Qa5", verdict: "bad", answer: "O-O", howToAnswer: "O-O, then a3 and b4 or Nd5 hits the queen.", why: "Early queen." },
        { san: "Qb6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — b2 is covered by the c1-bishop. Then d4 or Nd5 with tempo.", why: "The queen eyes b2, but the pawn is defended." },
      ],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6")]: { yourMove: { san: "O-O", why: "King safe before the centre opens. d4 is coming next." } },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "d4", howToAnswer: "d4 — break the symmetry while you have the extra move.", why: "Both castled, everything mirrored. You get to move first." },
        { san: "d6", verdict: "good", answer: "d4", howToAnswer: "d4 — after ...cxd4 Nxd4 your knights hit c6 and d5.", why: "Solid; still, d4 now." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4 — and if ...d5, cxd5 opens the g2-bishop.", why: "Preparing ...d5." },
        { san: "d5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 and then d4 — the centre opens with your bishop on the long diagonal and your king already safe.", why: "The main alternative. Black strikes first; you trade and hit back." },
        { san: "a6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — before ...Rb8 and ...b5.", why: "Slow." },
        { san: "e5", verdict: "good", answer: "d3", howToAnswer: "d3, then a3, Rb1 and b4 — the queenside push.", why: "Black takes d4 away; you take d5 and expand on the wing." },
        { san: "Rb8", verdict: "dubious", answer: "d4", howToAnswer: "d4 — open the centre while their rook is on the wing.", why: "Preparing ...b5, but too slow." },
      ],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O")]: {
      yourMove: { san: "d4", why: "The extra move used well. After ...cxd4 Nxd4 your knights hit c6 and d5, and the g2-bishop looks down an open diagonal." },
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4")]: {
      replies: [
        { san: "cxd4", verdict: "good", answer: "Nxd4", howToAnswer: "Nxd4 — recapture with the knight, never the queen.", why: "The main line." },
        { san: "d6", verdict: "dubious", answer: "dxc5", howToAnswer: "dxc5 dxc5 and Be3 hits the c5-pawn; you have the freer game.", why: "Holds the tension but leaves c5 weak." },
        { san: "d5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 Nxd5 and then dxc5 — the position opens with your pieces better placed.", why: "Black opens the centre with the g2-bishop alive." },
        { san: "Qb6", verdict: "dubious", answer: "d5", howToAnswer: "d5 — hit the knight and gain space with tempo.", why: "The queen leaves before the centre is settled." },
        { san: "Ne8", verdict: "bad", answer: "d5", howToAnswer: "d5 — gain space. The knight on e8 is out of play.", why: "Retreating a developed piece." },
      ],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4 cxd4")]: {
      yourMove: { san: "Nxd4", why: "The knight recaptures. Now it hits c6 and covers b5, and the queen is still safe at home." },
      mistakes: [{ san: "Qxd4", why: "Nxd4. You have lost the queen for a knight. The c6-knight has been watching d4 since move two." }],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4 cxd4 Nxd4")]: {
      replies: [
        { san: "Nxd4", verdict: "good", answer: "Qxd4", howToAnswer: "Qxd4 — now the queen is safe on d4 and hits the g7-bishop's diagonal.", why: "The main line. Black trades before your knight does damage." },
        { san: "d6", verdict: "good", answer: "Nxc6", howToAnswer: "Nxc6 bxc6 — their queenside pawns are split. Qa4 or Qd3 and Rd1 lean on them.", why: "Solid, but it lets you damage the pawns." },
        { san: "Ng4", verdict: "dubious", answer: "e3", howToAnswer: "e3 — cover d4 and f4; h3 kicks the knight next.", why: "A knight jump that threatens nothing." },
        { san: "Qa5", verdict: "dubious", answer: "Nb3", howToAnswer: "Nb3 — hit the queen and cover c5.", why: "Early queen." },
        { san: "a6", verdict: "dubious", answer: "Nc2", howToAnswer: "Nc2, then b3 and Bb2 — keep the knight clear of ...Nxd4 trades and prepare to hit c5-squares.", why: "Slow." },
        { san: "e6", verdict: "dubious", answer: "Nxc6", howToAnswer: "Nxc6 bxc6 and Qa4 hits the split pawns.", why: "Blocks the bishop and weakens d6." },
      ],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4 cxd4 Nxd4 Nxd4")]: {
      yourMove: { san: "Qxd4", why: "Safe now: the c6-knight is gone. The queen sits in the centre and stares at f6 and g7." },
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4 cxd4 Nxd4 Nxd4 Qxd4")]: {
      replies: [
        { san: "d6", verdict: "good", answer: "Qd3", howToAnswer: "Qd3 — step away from ...Be6 and ...Nd7-e5 tricks, then Bd2, Rac1 and b3.", why: "The main line. Black frees the bishop." },
        { san: "Ng4", verdict: "dubious", answer: "Qd3", howToAnswer: "Qd3 — b2 is covered by the c1-bishop. h3 kicks the knight.", why: "Hoping for ...Bxb2; it is not there." },
        { san: "Qa5", verdict: "dubious", answer: "Bd2", howToAnswer: "Bd2 — develop and cover c3.", why: "Early queen." },
        { san: "Qb6", verdict: "dubious", answer: "Qd3", howToAnswer: "Qd3 — keep the queen, cover the queenside, and Bd2 next.", why: "Offering a trade you do not need." },
        { san: "a6", verdict: "dubious", answer: "Qd3", howToAnswer: "Qd3, Bd2, Rac1.", why: "Slow." },
        { san: "Rb8", verdict: "dubious", answer: "Qd3", howToAnswer: "Qd3, then Bd2 and Rac1 — the c-file is yours.", why: "Preparing ...b5 too slowly." },
      ],
    },
    [P("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4 cxd4 Nxd4 Nxd4 Qxd4 d6")]: {
      yourMove: { san: "Qd3", why: "Out of range of ...Be6 and ...Nd7-e5. Bd2, Rac1 and b3 come next, and the c-file belongs to you." },
    },

    // --- Reversed Sicilian ----------------------------------------------------
    [P("c4 e5")]: {
      yourMove: { san: "Nc3", why: "Queen's knight first. It hits d5 and covers e4, so ...e4 will never kick a knight for free." },
      mistakes: [
        { san: "Nf3", why: "e4 and the knight has to move again. Nc3 first; the f3-knight comes once ...e4 can be met by Ng5." },
        { san: "d4", why: "exd4 Qxd4 Nc6 and your queen is chased around before you have developed a piece." },
      ],
    },
    [P("c4 e5 Nc3")]: {
      replies: [
        { san: "Qf6", verdict: "bad", answer: "Nd5", howToAnswer: "Nd5! The knight hits the queen and c7 at once; the queen must move again.", why: "An early queen sortie. It blocks the f6-knight and becomes a target immediately." },
        { san: "c5", verdict: "dubious", answer: "g3", howToAnswer: "g3, Bg2, Nf3 and d3 — your bishop will love the long diagonal with c5 and e5 in the way of Black's.", why: "Two pawns on the same colour squares leave holes on d5 and d4." },
        { san: "d5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 and then Bg2 (via g3) or e4 hitting the knight.", why: "The reversed Sicilian fight for d5. Trade and develop." },
        { san: "Nf6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — now the knight is safe: ...e4 is met by Ng5 hitting the pawn twice.", why: "The main line." },
        { san: "Nc6", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, then Nf3 or d3 and Nge2 — the fianchetto first, since ...f5 and ...e4 ideas are coming.", why: "Black keeps the f6-knight flexible." },
        { san: "Bb4", verdict: "dubious", answer: "Nd5", howToAnswer: "Nd5 — hit the bishop. It has to go back or take on d5 and give you the centre.", why: "A pin on a knight that can simply jump away with tempo." },
        { san: "Bc5", verdict: "good", answer: "e3", howToAnswer: "e3, then Nf3 and d4 — the bishop on c5 will be kicked.", why: "Active, but the bishop becomes a target for d4." },
        { san: "d6", verdict: "dubious", answer: "g3", howToAnswer: "g3, Bg2, Nf3, castle.", why: "Passive; it shuts in the f8-bishop." },
        { san: "f5", verdict: "dubious", answer: "g3", howToAnswer: "g3 and Bg2 — the bishop looks straight at the king that ...f5 loosened. d4 later.", why: "A Grand Prix with colours reversed. It weakens the king." },
        { san: "c6", verdict: "dubious", answer: "d4", howToAnswer: "d4! — exd4 Qxd4 and the queen is safe on d4, because the c6-pawn has taken their knight's square.", why: "Preparing ...d5, but it gives you the centre push for free." },
        { san: "g6", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, Nf3, castle — mirror the fianchetto.", why: "A Closed Sicilian in reverse." },
        { san: "Qh4", verdict: "bad", answer: "Nf3", howToAnswer: "Nf3 — hit the queen. She has to move again and you have developed.", why: "Early queen, no follow-up." },
      ],
    },
    [P("c4 e5 Nc3 Nf6")]: {
      yourMove: { san: "Nf3", why: "Now the knight is safe on f3: if ...e4, Ng5 attacks the pawn twice and it becomes Black's problem." },
      mistakes: [{ san: "d4", why: "exd4 Qxd4 Nc6 and the queen has to move again. Develop first; d4 is a break, not an opening move." }],
    },
    [P("c4 e5 Nc3 Nf6 Nf3")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 g3 — then Bg2 pressures the knight and the long diagonal.", why: "The main line. Take, then develop toward the d5 knight." },
        { san: "Nc6", verdict: "good", answer: "g3", howToAnswer: "g3 — the fianchetto. Bg2 and castle follow.", why: "The Four Knights English, the main line." },
        { san: "e4", verdict: "dubious", answer: "Ng5", howToAnswer: "Ng5 — the pawn is attacked twice and defended once. Black spends moves defending it, or loses it.", why: "The push that Nc3 was played to answer." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — with the pawn on d6 the e5-pawn is stuck; take the centre.", why: "Passive." },
        { san: "Bb4", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2 — if ...Bxc3 bxc3 you get the b-file and a future d4.", why: "Pinning the c3-knight to ease the pressure on e5." },
        { san: "Bc5", verdict: "good", answer: "e3", howToAnswer: "e3, then d4 kicks the bishop with tempo.", why: "Active, but the bishop is exposed to d4." },
        { san: "c6", verdict: "good", answer: "d4", howToAnswer: "d4 — exd4 Nxd4 and you have the centre; the c6-pawn stops ...Nc6 hitting your queen.", why: "Preparing ...d5." },
        { san: "Qe7", verdict: "dubious", answer: "g3", howToAnswer: "g3, Bg2, castle. The queen blocks the f8-bishop.", why: "Defending e5 with the wrong piece." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — exd4 Nxd4 and their dark bishop is still at home.", why: "Slow; it lets you take the centre." },
      ],
    },
    [P("c4 e5 Nc3 Nf6 Nf3 Nc6")]: {
      yourMove: { san: "g3", why: "The fianchetto. The g2-bishop will press on d5 and shelter the king." },
      mistakes: [{ san: "Nxe5", why: "Nxe5 and you have given a knight for a pawn. The c6-knight defends e5." }],
    },
    [P("c4 e5 Nc3 Nf6 Nf3 Nc6 g3")]: {
      replies: [
        { san: "Bb4", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, castle. If ...Bxc3 bxc3, you get the b-file.", why: "The main line: the pin eases the pressure on e5." },
        { san: "d5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 Bg2 — a Dragon in reverse, and the bishop hits the knight on d5.", why: "The most direct: Black trades in the centre." },
        { san: "Bc5", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, castle, then d3 and a3, b4 to kick the bishop.", why: "Active but exposed to b4." },
        { san: "g6", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, castle, then d3 and the b4 push.", why: "Both sides fianchetto." },
        { san: "Be7", verdict: "dubious", answer: "Bg2", howToAnswer: "Bg2, castle, then d3, Rb1 and b4.", why: "Passive." },
        { san: "d6", verdict: "dubious", answer: "Bg2", howToAnswer: "Bg2, castle, d3, Rb1, b4.", why: "Passive; it shuts in the f8-bishop." },
        { san: "e4", verdict: "dubious", answer: "Ng5", howToAnswer: "Ng5 — attacked twice, defended once. ...Qe7 is met by Qc2 keeping the pressure.", why: "Overextending." },
      ],
    },
    [P("c4 e5 Nc3 Nf6 Nf3 Nc6 g3 Bb4")]: { yourMove: { san: "Bg2", why: "Finish the fianchetto. The pin on c3 does not hurt: bxc3 would give you the b-file." } },
    [P("c4 e5 Nc3 Nf6 Nf3 Nc6 g3 Bb4 Bg2")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "O-O — both kings safe. Nd5 or d3 next.", why: "The main line." },
        { san: "d6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then d3 and a3.", why: "Passive." },
        { san: "e4", verdict: "dubious", answer: "Ng5", howToAnswer: "Ng5 — the pawn is hit twice. If ...Bxc3 bxc3 first, it is still hit twice.", why: "Overextending." },
        { san: "Bxc3", verdict: "dubious", answer: "bxc3", howToAnswer: "bxc3 — take the b-file and prepare d4.", why: "Giving up the bishop pair early." },
        { san: "d5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 and then O-O; Nxd5 and d3 will follow.", why: "Direct, and fine for both sides." },
        { san: "Qe7", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then Nd5 hits the queen and the bishop.", why: "The queen blocks the bishop and sits on a knight's fork." },
        { san: "h6", verdict: "bad", answer: "O-O", howToAnswer: "O-O — a wasted move for Black.", why: "It prevents nothing." },
      ],
    },
    [P("c4 e5 Nc3 Nf6 Nf3 Nc6 g3 Bb4 Bg2 O-O")]: { yourMove: { san: "O-O", why: "King safe. Now Nd5 or d3 and the queenside push." } },
    [P("c4 e5 Nc3 Nf6 Nf3 Nc6 g3 Bb4 Bg2 O-O O-O")]: {
      replies: [
        { san: "Re8", verdict: "good", answer: "Nd5", howToAnswer: "Nd5 — hit the bishop and the f6-knight at once.", why: "The main line: the rook supports ...e4." },
        { san: "d6", verdict: "good", answer: "d3", howToAnswer: "d3, then a3, Rb1, b4.", why: "Solid." },
        { san: "e4", verdict: "dubious", answer: "Ng5", howToAnswer: "Ng5 — attacked twice, and your g2-bishop joins in once the f3-knight has moved.", why: "Overextending." },
        { san: "Bxc3", verdict: "dubious", answer: "bxc3", howToAnswer: "bxc3, then d3 and Rb1 on the open file.", why: "Giving up the bishop for the knight." },
        { san: "d5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 Nxd5 Qxd5 d3 — the position simplifies with your bishop on the long diagonal.", why: "Direct." },
        { san: "h6", verdict: "dubious", answer: "Nd5", howToAnswer: "Nd5 — hits b4 and f6.", why: "A wasted move." },
      ],
    },

    // --- ...e6 and ...d5: the Queen's Gambit Declined ---------------------------
    [P("c4 e6")]: { yourMove: { san: "Nc3", why: "Same first piece. If ...d5 comes, d4 gives you a Queen's Gambit Declined." } },
    [P("c4 e6 Nc3")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "d4", howToAnswer: "d4 — the Queen's Gambit Declined, by the side door.", why: "Black takes the centre; you take the QGD." },
        { san: "Nf6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then g3 or d4 depending on what Black does.", why: "Flexible." },
        { san: "c5", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, Nf3 — a Symmetrical with ...e6.", why: "Heading for a Hedgehog or ...d5." },
        { san: "Bb4", verdict: "dubious", answer: "Qc2", howToAnswer: "Qc2 — cover c3, then a3 asks the bishop where it is going.", why: "A pin with nothing behind it." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nf3 — you have the centre.", why: "Passive." },
        { san: "f5", verdict: "dubious", answer: "g3", howToAnswer: "g3, Bg2, Nf3 — the bishop looks at the weakened kingside.", why: "A Dutch. The bishop on g2 loves this structure." },
        { san: "b6", verdict: "dubious", answer: "e4", howToAnswer: "e4 — take the centre before ...Bb7 arrives.", why: "Slow." },
      ],
    },
    [P("c4 e6 Nc3 d5")]: {
      yourMove: { san: "d4", why: "Now it is a Queen's Gambit Declined, and you never had to allow the Nimzo-Indian or the Grunfeld." },
      mistakes: [{ san: "cxd5", why: "exd5 frees their c8-bishop for nothing and hands them the centre. Keep the tension; d4." }],
    },
    [P("c4 e6 Nc3 d5 d4")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Bg5", howToAnswer: "Bg5 — the classical pin.", why: "The main line." },
        { san: "Be7", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bg5 or Bf4 and e3.", why: "Normal." },
        { san: "c6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then e3 and Bd3 — a Semi-Slav.", why: "Solid." },
        { san: "c5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 exd5, then Nf3 and g3 — the g2-bishop will stare at the isolated d5-pawn.", why: "The Tarrasch. It gives Black activity and you a target." },
        { san: "dxc4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Bxc4 — the pawn comes back with development.", why: "Taking too early; you regain it easily." },
        { san: "Bb4", verdict: "dubious", answer: "Qa4+", howToAnswer: "Qa4+ — if ...c6, Qxb4 wins the bishop. ...Nc6 defends it but blocks their c-pawn.", why: "A pin that runs into a check." },
        { san: "Nc6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Bg5 or e3 — the knight on c6 blocks their c-pawn.", why: "Chigorin-style, and the knight is in the way." },
        { san: "f5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, g3, Bg2 — a Stonewall where your bishop hits the weakened diagonal.", why: "Solid but weakens e6 and the king." },
      ],
    },
    [P("c4 e6 Nc3 d5 d4 Nf6")]: { yourMove: { san: "Bg5", why: "The classical pin. The f6-knight is tied to the queen, and pressure on d5 grows." } },
    [P("c4 e6 Nc3 d5 d4 Nf6 Bg5")]: {
      replies: [
        { san: "Be7", verdict: "good", answer: "e3", howToAnswer: "e3 — solid, then Nf3 and Bd3 or Rc1.", why: "Breaking the pin, the main line." },
        { san: "Nbd7", verdict: "good", answer: "e3", howToAnswer: "e3 — and do not grab on d5: cxd5 exd5 Nxd5? Nxd5! Bxd8 Bb4+ and you end a piece down for a pawn.", why: "Fine, and it sets a famous trap for the greedy." },
        { san: "h6", verdict: "good", answer: "Bh4", howToAnswer: "Bh4 — keep the pin.", why: "Asking the bishop." },
        { san: "Bb4", verdict: "dubious", answer: "e3", howToAnswer: "e3 — if ...Bxc3+ bxc3 you keep the bishop pair.", why: "Active but it gives up the bishop." },
        { san: "dxc4", verdict: "dubious", answer: "e4", howToAnswer: "e4 — take the centre. The f6-knight is pinned so it cannot take; Bxc4 comes next.", why: "Grabbing a pawn you cannot keep." },
        { san: "c6", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3, Bd3.", why: "Semi-Slav style." },
        { san: "c5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 exd5 then Nf3 — the d5-pawn is isolated.", why: "Sharp." },
        { san: "Ne4", verdict: "dubious", answer: "Bf4", howToAnswer: "Bf4 — sidestep; if ...Nxc3 bxc3 the knight has been traded for nothing.", why: "A knight jump that wins no time." },
      ],
    },
    [P("c4 e6 Nc3 d5 d4 Nf6 Bg5 Be7")]: { yourMove: { san: "e3", why: "Support d4 and open the f1-bishop. Nf3 next." } },
    [P("c4 e6 Nc3 d5 d4 Nf6 Bg5 Be7 e3")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — develop; Bd3 or Rc1 next.", why: "The main line." },
        { san: "h6", verdict: "good", answer: "Bh4", howToAnswer: "Bh4 — keep the pin.", why: "Normal." },
        { san: "Nbd7", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Rc1 or Bd3.", why: "Normal." },
        { san: "c6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, Bd3.", why: "Solid." },
        { san: "dxc4", verdict: "dubious", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back, bishop developed.", why: "Releases the tension for nothing." },
      ],
    },
    [P("c4 e6 Nc3 d5 d4 Nf6 Bg5 Be7 e3 O-O")]: { yourMove: { san: "Nf3", why: "Last piece out. Now Bd3 or Rc1, then castle." } },
    [P("c4 e6 Nc3 d5 d4 Nf6 Bg5 Be7 e3 O-O Nf3")]: {
      replies: [
        { san: "h6", verdict: "good", answer: "Bh4", howToAnswer: "Bh4 — keep the pin.", why: "The Tartakower approach: ask the bishop before ...b6." },
        { san: "Nbd7", verdict: "good", answer: "Rc1", howToAnswer: "Rc1 — the rook behind the c-pawn before the file opens.", why: "The Orthodox." },
        { san: "b6", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 exd5 then Bd3 — their bishop comes to b7 and stares at its own d5-pawn.", why: "Aiming for ...Bb7." },
        { san: "c6", verdict: "good", answer: "Qc2", howToAnswer: "Qc2, then Bd3 and castle.", why: "Solid." },
        { san: "dxc4", verdict: "dubious", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back with development.", why: "Releases the tension." },
        { san: "Ne4", verdict: "dubious", answer: "Bxe7", howToAnswer: "Bxe7 Qxe7 and then Nxe4 dxe4 Nd2 — the trade favours you.", why: "A jump that only simplifies." },
      ],
    },
    [P("c4 e6 Nc3 d5 d4 Nf6 Bg5 Be7 e3 O-O Nf3 h6")]: { yourMove: { san: "Bh4", why: "Keep the pin. Trading on f6 would give them a free bishop pair." } },
    [P("c4 e6 Nc3 d5 d4 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4")]: {
      replies: [
        { san: "b6", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 Bxe7 Qxe7 Nxd5 exd5 Rc1 — trades, then the rook eyes c7.", why: "The Tartakower, the main line." },
        { san: "Nbd7", verdict: "good", answer: "Rc1", howToAnswer: "Rc1, then Bd3 and castle.", why: "Orthodox." },
        { san: "Ne4", verdict: "dubious", answer: "Bxe7", howToAnswer: "Bxe7 Qxe7, then Nxe4 dxe4 Nd2 and the e4-pawn is weak.", why: "Simplifies and leaves a loose pawn." },
        { san: "c6", verdict: "good", answer: "Bd3", howToAnswer: "Bd3, castle.", why: "Solid." },
        { san: "dxc4", verdict: "dubious", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back with development.", why: "Releases the tension." },
      ],
    },
  },

  traps: [
    {
      name: "The queen recapture on d4",
      sans: sans("1.c4 c5 2.Nc3 Nc6 3.d4 cxd4 4.Qxd4 Nxd4"),
      punisher: "black",
      tell: "You push d4 in the Symmetrical before a knight covers the square.",
      why: "Black's c6-knight has watched d4 since move two. Recapturing with the queen looks automatic and loses her for a pawn, since nothing can even take the knight back. Nf3 first, then d4, then Nxd4.",
    },
    {
      name: "The d5 grab",
      sans: sans("1.c4 e6 2.Nc3 d5 3.d4 Nf6 4.Bg5 Nbd7 5.cxd5 exd5 6.Nxd5 Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8"),
      punisher: "black",
      tell: "The f6-knight is pinned to the queen and d5 looks like it is defended only by that knight.",
      why: "The pin is an illusion. After Nxd5? Nxd5! Black gives up the queen but gets it all back with Bb4+ and Bxd2+, and ends a piece up for a pawn. Play e3 and let the tension be.",
    },
    {
      name: "Qa4+ picks up the bishop",
      sans: sans("1.c4 e6 2.Nc3 d5 3.d4 Bb4 4.Qa4+ c6 5.Qxb4"),
      punisher: "white",
      tell: "Black pins the c3-knight with ...Bb4 while the d7-square is still empty.",
      why: "Qa4+ attacks the bishop and the king at once. Blocking with ...c6 leaves the bishop loose and it falls. Only ...Nc6 saves it, and that knight then blocks Black's own c-pawn for the rest of the opening.",
    },
  ],

  modelGames: [
    {
      label: "Symmetrical: break the mirror",
      sans: sans("c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d4 cxd4 Nxd4 Nxd4 Qxd4 d6 Qd3"),
      summary: "Black copies everything, so you use the extra move: d4, knight recaptures, then the queen once the c6-knight is gone. You end with more space, the c-file and a bishop on an open diagonal.",
    },
    {
      label: "Reversed Sicilian: Nd5 arrives",
      sans: sans("c4 e5 Nc3 Nf6 Nf3 Nc6 g3 Bb4 Bg2 O-O O-O Re8 Nd5 Bf8 d3 d6"),
      summary: "Nc3 before Nf3, the fianchetto, castle, then the knight lands on d5 hitting the bishop and the f6-knight. The plan from here is a3, Rb1 and b4.",
    },
    {
      label: "Into the Queen's Gambit",
      sans: sans("c4 e6 Nc3 d5 d4 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 cxd5 Nxd5 Bxe7 Qxe7 Nxd5 exd5 Rc1"),
      summary: "Black plays ...e6 and ...d5, you play d4, and it is a Queen's Gambit Declined that never allowed the Indian defences. The Tartakower trades leave you the c-file and a target on c7.",
    },
  ],

  middlegamePlan:
    "Your pieces all point at d5: the c4-pawn, the c3-knight and the g2-bishop. Keep it that way and never block the bishop with your own pawn on d5 unless it wins something. " +
    "In the Symmetrical, break with d4 once a knight can recapture; afterwards the c-file and the long diagonal are yours. " +
    "Against ...e5 you are playing a Sicilian a move up: Nd5 when it hits two pieces, then a3, Rb1 and b4 to gain space on the wing where Black's pieces are not. " +
    "Against ...e6 and ...d5, play d4 and follow the Queen's Gambit: Bg5, e3, Nf3, Rc1, and a rook behind the c-pawn when the file opens.",

  structureDiagram: {
    fen: "r1bq1rk1/pp1pppbp/2n2np1/2p5/2P5/2N2NP1/PP1PPPBP/R1BQ1RK1 w - - 6 7",
    orientation: "white",
    arrows: [
      { from: "c3", to: "d5" },
      { from: "g2", to: "d5" },
      { from: "d2", to: "d4" },
    ],
    caption: "The English picture: knight and bishop both aim at d5, everything is mirrored, and White breaks the symmetry first with d4.",
  },
};
