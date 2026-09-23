// Réti Opening (1.Nf3 d5 2.c4) — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// The Réti never puts a pawn on d4 or e4 in the opening. It develops the
// knight, hits d5 from the side with c4, fianchettoes, castles by move five,
// and only then decides what the centre should look like. It is the calmest
// opening in the book for White and the hardest for a beginner to attack.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const reti: OpeningSpec = {
  id: "reti",
  name: "Réti Opening",
  eco: "A04–A09",
  side: "white",
  family: "flank",
  firstMoves: "1.Nf3 d5 2.c4",
  tabiyaFen: "rnbqkbnr/ppp1pppp/8/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 0 2",
  pitch:
    "Develop the knight, hit d5 from the side with c4, fianchetto and castle by move five: the same five moves against nearly everything, and no early tactics to fall into. " +
    "You keep the centre pawns at home until you see what Black has done, then choose the structure that suits you.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f3"], why: "The first move. It controls e5 and d4 without committing a pawn, and it will never be kicked by ...e5 because your c4-pawn and g2-bishop make ...e5 hard to arrange." },
      { piece: "B", squares: ["g2"], why: "The Réti bishop. From g2 it looks through d5 to b7. Together with c4 it makes Black's centre pawn a target rather than a strength." },
      { piece: "B", squares: ["b2", "e2", "d3"], why: "The dark bishop goes to b2 for the double fianchetto, looking at e5 and the kingside. In the Advance line, e2 or d3 gets you castled fast." },
      { piece: "N", squares: ["c3", "d2"], why: "The queen's knight comes out AFTER c4, never before, so the c-pawn is not stuck behind it. c3 presses on d5; d2 supports e4." },
      { piece: "Q", squares: ["e2", "c2"], why: "The queen leaves the d-file quietly. On e2 it supports e4 and connects the rooks; on c2 it backs the c-file once cxd5 opens it." },
    ],
    pawns: ["c4", "g3"],
    order: [
      {
        before: "c4",
        after: "Nc3",
        why: "The c-pawn goes first. A knight on c3 with the pawn still on c2 blocks the one pawn move the Réti is built around, and you are left playing a passive Queen's Pawn game without the d-pawn.",
      },
    ],
    castle: "O-O",
    castleBy: 6,
  },

  ideas: [
    {
      id: "reti-pressure-from-side",
      title: "Hit d5 from the side",
      oneLiner: "Nf3, c4 and Bg2 all pressure d5. Your centre pawns stay home.",
      why: "Black's d5-pawn is the centre of their position. Instead of fighting it with d4, you attack it from c4 and from g2 and wait. Black must either defend it, trade it, or push it, and each of those tells you what to do next.",
    },
    {
      id: "reti-c4-before-nc3",
      title: "c4 before Nc3",
      oneLiner: "Never put the knight in front of the c-pawn.",
      why: "The whole opening is c4 against d5. A knight on c3 with the pawn behind it means that push never comes, and you are left with a passive game where Black has the centre for free.",
      trigger: { kind: "opponent_san", sans: ["d5"] },
      response: "c4, then g3 and Bg2. Nc3 only afterwards.",
      ifIgnored: "Black gets a free centre and your c-pawn is stuck for the whole game.",
    },
    {
      id: "reti-dxc4",
      title: "When Black takes c4",
      oneLiner: "Qa4+ or e3 and Bxc4 gets it back. Never chase the pawn with pieces.",
      why: "The c4-pawn is not a gambit. If Black takes it early, Qa4+ picks it up at once after the block, or e3 and Bxc4 recover it with development. If Black tries to keep it with ...b5, a4 breaks the pawns and your bishop lands on b5 with check.",
      trigger: { kind: "opponent_san", sans: ["dxc4"] },
      response: "Qa4+ then Qxc4, or e3 then Bxc4.",
    },
    {
      id: "reti-d4-push",
      title: "Against ...d4: undermine, don't blockade",
      oneLiner: "If Black pushes ...d4, play e3 and trade it off. A pawn on d3 would only fix it.",
      why: "A pawn on d4 looks impressive but has nothing behind it. e3 attacks it at once; after exd4 the file opens and your pieces come out with tempo. Blockading with d3 turns their pawn into a permanent wedge and shuts in your own bishop.",
      trigger: { kind: "opponent_san", sans: ["d4"] },
      response: "e3, then exd4 and Nxd4 when the knight can recapture.",
      ifIgnored: "Black's pawn on d4 cramps you for the rest of the game.",
    },
    {
      id: "reti-double-fianchetto",
      title: "The second bishop: b3 and Bb2",
      oneLiner: "Castled? Now b3 and Bb2 so both bishops look at the centre.",
      why: "The b2-bishop watches e5 and d4, and it gives you the tidy bxc4 recapture if Black ever takes on c4. With both bishops on long diagonals, Black's centre pawns become targets rather than assets, and you can choose between e3 and d4 or a slow cxd5 later.",
      trigger: { kind: "epd", epds: [P("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O")] },
      response: "b3, then Bb2.",
    },
    {
      id: "reti-qgd",
      title: "Or just play d4",
      oneLiner: "Against ...d5 and ...e6, d4 gives you a Queen's Gambit Declined.",
      why: "The Réti is also a move-order weapon. Because you played Nf3 first, Black has committed their d- and e-pawns before you have shown anything. If you prefer a classical centre, d4 and Nc3 now give you a Queen's Gambit Declined with none of the Indian defences allowed.",
      trigger: { kind: "opponent_san", sans: ["e6"] },
      response: "g3 and Bg2 for the Réti, or d4 for the Queen's Gambit.",
    },
    {
      id: "reti-book-end",
      title: "When the book runs out",
      oneLiner: "Castled with both bishops out? Choose the centre: cxd5 and d4, or e3 and Qe2.",
      why: "By now Black has shown their structure. If they have ...c5 and ...d5, trade cxd5 and push d4 to open lines for your bishops. If they are solid, e3, Qe2 and Rd1 build slowly. Never rush: the Réti wins by being ready when the centre opens, not by opening it early.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "Nf3", why: "Develop first and commit nothing. The knight controls e5 and d4 and can never be kicked by a pawn on move one." } },
    [P("Nf3")]: {
      replies: [
        { san: "f6", verdict: "bad", answer: "e4", howToAnswer: "e4 — take the centre. The f6-pawn blocks Black's own knight and loosens the king.", why: "The worst first move Black can play against a knight on f3." },
        { san: "b6", verdict: "dubious", answer: "g3", howToAnswer: "g3, Bg2 and c4 — your bishop stares straight at theirs.", why: "A fianchetto answering a fianchetto. Fine, but you moved first." },
        { san: "d5", verdict: "good", answer: "c4", howToAnswer: "c4 — the Réti. Hit the pawn from the side.", why: "The main line. Black takes the centre and you question it at once." },
        { san: "Nf6", verdict: "good", answer: "c4", howToAnswer: "c4, then g3 and Bg2 — the same setup.", why: "Flexible. Black waits, and so do you." },
        { san: "c5", verdict: "good", answer: "c4", howToAnswer: "c4 — a Symmetrical English. g3, Bg2, Nc3, castle.", why: "Black takes d4 away; you take d5." },
        { san: "e6", verdict: "good", answer: "c4", howToAnswer: "c4, g3, Bg2. If ...d5 comes you are in the main line.", why: "Preparing ...d5." },
        { san: "g6", verdict: "good", answer: "c4", howToAnswer: "c4, then g3 and Bg2 — mirror the fianchetto. d4 can come later.", why: "A King's Indian setup. Your bishop answers theirs." },
        { san: "d6", verdict: "dubious", answer: "c4", howToAnswer: "c4, g3, Bg2, then d4 — take the space Black declined.", why: "Passive." },
        { san: "f5", verdict: "dubious", answer: "c4", howToAnswer: "c4, g3, Bg2 — the bishop looks at the king ...f5 loosened.", why: "A Dutch. Your g2-bishop enjoys the weakened diagonal." },
        { san: "Nc6", verdict: "dubious", answer: "c4", howToAnswer: "c4 — if ...e5, then Nc3 and g3 and you are in a reversed Sicilian.", why: "Unusual order; it usually transposes." },
        { san: "e5", verdict: "bad", answer: "Nxe5", howToAnswer: "Nxe5 — a free pawn. After ...Qe7, d4 and Nf3 keep it; do not get greedy beyond that.", why: "The pawn is simply undefended." },
        { san: "c6", verdict: "good", answer: "c4", howToAnswer: "c4, then g3 or d4 — a Slav where you have not committed the centre.", why: "A Slav setup." },
      ],
    },
    [P("Nf3 d5")]: {
      yourMove: { san: "c4", why: "The Réti move. It attacks d5 from the side and keeps d4 free for later. Black must now decide what to do with the pawn." },
      mistakes: [{ san: "Nc3", why: "The knight blocks the c-pawn, so c4 never comes and the pressure on d5 never starts. c4 first, knight later." }],
    },
    [P("Nf3 d5 c4")]: {
      replies: [
        { san: "e6", verdict: "good", answer: "g3", howToAnswer: "g3 — the fianchetto. Bg2 and castle follow.", why: "The main line: Black supports d5 and gets ready to develop." },
        { san: "c6", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, castle, then b3 — the double fianchetto.", why: "Slav-style support. Solid and slow." },
        { san: "d4", verdict: "good", answer: "e3", howToAnswer: "e3 — question the pawn at once. exd4 and the file opens.", why: "Black grabs space. The pawn has no support and you undermine it." },
        { san: "dxc4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Bxc4 — the pawn comes back with a developed bishop. If ...b5, a4 breaks it up.", why: "Taking a pawn you cannot keep." },
        { san: "Nf6", verdict: "good", answer: "g3", howToAnswer: "g3, Bg2, castle — the usual setup.", why: "Natural development." },
        { san: "c5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 Qxd5 Nc3 — the queen has to move again and you have a free knight move.", why: "Leaves d5 weak: after the trade the queen recaptures and gets kicked." },
        { san: "Bg4", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 — if ...Bxf3 exf3 and after ...Qxd5 Nc3 chases the queen; you keep two bishops against one.", why: "Bishop out before the centre is settled; the d5-pawn is loose." },
        { san: "Bf5", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 Qxd5 Nc3 — the queen is chased and b7 is now loose with the bishop gone from c8.", why: "Same problem: the bishop leaves d5 with one fewer defender." },
        { san: "Nc6", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 Qxd5 Nc3 — tempo on the queen.", why: "The knight blocks their c-pawn and does not help d5." },
      ],
    },

    // --- Main line: ...e6 -------------------------------------------------------
    [P("Nf3 d5 c4 e6")]: { yourMove: { san: "g3", why: "Prepare the bishop that makes c4 bite. Everything else waits until you are castled." } },
    [P("Nf3 d5 c4 e6 g3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Bg2", howToAnswer: "Bg2 — the bishop takes the long diagonal.", why: "The main line." },
        { san: "dxc4", verdict: "dubious", answer: "Qa4+", howToAnswer: "Qa4+ — after the block, Qxc4 has the pawn back and the queen is centralised.", why: "Grabbing a pawn you cannot hold." },
        { san: "c5", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, castle, then cxd5 and d4 to open lines.", why: "Black takes d4. Fine; you will open the centre later on your terms." },
        { san: "Nc6", verdict: "dubious", answer: "Bg2", howToAnswer: "Bg2, castle, then d4 — with ...Nc6 played, ...c5 is slow.", why: "The knight blocks their c-pawn." },
        { san: "c6", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, castle, b3.", why: "Very solid." },
        { san: "Be7", verdict: "good", answer: "Bg2", howToAnswer: "Bg2, castle.", why: "Normal." },
        { san: "d4", verdict: "dubious", answer: "Bg2", howToAnswer: "Bg2, castle, then e3 to undermine the pawn.", why: "Space grab with nothing behind it." },
        { san: "Bd6", verdict: "dubious", answer: "Bg2", howToAnswer: "Bg2, castle, then d4 or e4 — the bishop on d6 will be hit.", why: "The bishop blocks their own d-pawn's support." },
      ],
    },
    [P("Nf3 d5 c4 e6 g3 Nf6")]: { yourMove: { san: "Bg2", why: "The Réti bishop. From g2 it looks through d5 to b7." } },
    [P("Nf3 d5 c4 e6 g3 Nf6 Bg2")]: {
      replies: [
        { san: "Be7", verdict: "good", answer: "O-O", howToAnswer: "O-O — king safe by move five.", why: "The main line." },
        { san: "c5", verdict: "good", answer: "O-O", howToAnswer: "O-O, then cxd5 and d4.", why: "Black takes d4." },
        { san: "dxc4", verdict: "dubious", answer: "Qa4+", howToAnswer: "Qa4+ then Qxc4 — pawn back.", why: "Cannot be held." },
        { san: "c6", verdict: "good", answer: "O-O", howToAnswer: "O-O, then b3 and Bb2.", why: "Solid." },
        { san: "Bd6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then d4 or Nc3 and e4 — the bishop is a target.", why: "Misplaced bishop." },
        { san: "Nc6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then d4.", why: "Blocks the c-pawn." },
        { san: "Nbd7", verdict: "good", answer: "O-O", howToAnswer: "O-O, then b3 or d4.", why: "Normal." },
        { san: "b6", verdict: "good", answer: "O-O", howToAnswer: "O-O — their bishop to b7 will face yours on g2. cxd5 later makes it stare at its own pawn.", why: "Queen's Indian style." },
      ],
    },
    [P("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7")]: { yourMove: { san: "O-O", why: "Castled by move five, every game. Now you can spend the next moves on the centre." } },
    [P("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "b3", howToAnswer: "b3 — the second fianchetto. Bb2 next.", why: "The main line. Both kings safe, the fight starts." },
        { san: "c5", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 exd5 then d4 — the g2-bishop stares at d5.", why: "Black takes d4; you open the centre." },
        { san: "c6", verdict: "good", answer: "b3", howToAnswer: "b3, Bb2, then d3 and Nbd2 or e4.", why: "Solid." },
        { san: "Nbd7", verdict: "good", answer: "b3", howToAnswer: "b3, Bb2.", why: "Normal." },
        { san: "dxc4", verdict: "dubious", answer: "Qa4+", howToAnswer: "Qa4+ then Qxc4 — pawn back with a centralised queen.", why: "Cannot be held." },
        { san: "Nc6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — with the knight blocking ...c5, take the centre.", why: "Misplaced knight." },
        { san: "b6", verdict: "good", answer: "b3", howToAnswer: "b3, Bb2, then cxd5 when their bishop lands on b7.", why: "Queen's Indian style." },
      ],
    },
    [P("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O")]: {
      yourMove: { san: "b3", why: "Second fianchetto. The b2-bishop watches e5 and d4, and if Black ever takes on c4 the b-pawn recaptures cleanly." },
    },
    [P("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O b3")]: {
      replies: [
        { san: "c5", verdict: "good", answer: "Bb2", howToAnswer: "Bb2 — then cxd5 and d4 or e3 depending on their setup.", why: "The main line." },
        { san: "b6", verdict: "good", answer: "Bb2", howToAnswer: "Bb2, then cxd5 exd5 d4 — their b7-bishop looks at its own pawn.", why: "Queen's Indian." },
        { san: "Nbd7", verdict: "good", answer: "Bb2", howToAnswer: "Bb2, then d3 and Nbd2 or e3 and Qe2.", why: "Normal." },
        { san: "c6", verdict: "good", answer: "Bb2", howToAnswer: "Bb2, d3, Nbd2, then e4.", why: "Solid." },
        { san: "dxc4", verdict: "dubious", answer: "bxc4", howToAnswer: "bxc4 — that is why b3 came first. Your centre is intact.", why: "Cannot be held now." },
        { san: "a5", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2 — ignore it; a3 if ...a4 comes.", why: "A wing pawn move with no plan." },
        { san: "Nc6", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2, then d4.", why: "Blocks the c-pawn." },
        { san: "d4", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2 — the pawn on d4 is loose; e3 next undermines it.", why: "Overextending." },
      ],
    },
    [P("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O b3 c5")]: {
      yourMove: { san: "Bb2", why: "Both bishops on long diagonals. Now cxd5 and d4 opens the position while Black's pieces are still at home." },
    },
    [P("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O b3 c5 Bb2")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 Nxd5 or exd5, then d4 — lines open for both bishops.", why: "The main line." },
        { san: "b6", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 exd5 then d4.", why: "Queen's Indian." },
        { san: "d4", verdict: "dubious", answer: "e3", howToAnswer: "e3 — undermine the pawn; exd4 next.", why: "Overextending." },
        { san: "dxc4", verdict: "dubious", answer: "bxc4", howToAnswer: "bxc4 — clean recapture.", why: "Cannot be held." },
        { san: "Nbd7", verdict: "good", answer: "cxd5", howToAnswer: "cxd5 exd5 then d4.", why: "Normal." },
        { san: "b5", verdict: "bad", answer: "cxb5", howToAnswer: "cxb5 — a free pawn, and d5 has lost a defender.", why: "The b5-pawn is undefended." },
        { san: "Qc7", verdict: "dubious", answer: "cxd5", howToAnswer: "cxd5 exd5 then Nc3 and d4.", why: "The queen comes out before the centre is settled." },
      ],
    },

    // --- 2...dxc4: getting the pawn back ----------------------------------------
    [P("Nf3 d5 c4 dxc4")]: {
      yourMove: { san: "e3", why: "Bxc4 comes next. The pawn was never a gift, and you get it back with a developed bishop. Qa4+ also works, but this keeps the queen at home." },
    },
    [P("Nf3 d5 c4 dxc4 e3")]: {
      replies: [
        { san: "Bg4", verdict: "dubious", answer: "Bxc4", howToAnswer: "Bxc4 — recapture first; the pin on f3 has nothing behind it yet.", why: "Develops with a pin against a knight that is defended and a queen that has not moved." },
        { san: "e6", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4, then O-O and d4 — a Queen's Gambit Accepted with colours you like.", why: "Solid. Black gives the pawn back and develops." },
        { san: "Bf5", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4, castle, then Qb3 leaning on b7 and f7.", why: "Gets the bishop out before ...e6 shuts it in — sensible for Black." },
        { san: "Nf6", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back, bishop developed.", why: "Normal." },
        { san: "e5", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back, and the bishop eyes f7.", why: "Black takes space." },
        { san: "b5", verdict: "bad", answer: "a4", howToAnswer: "a4 — the pawns cannot hold together. After ...c6 axb5 cxb5 b3, the chain collapses and Bxb5+ arrives with check.", why: "Clinging to the pawn wrecks Black's queenside." },
        { san: "Be6", verdict: "dubious", answer: "Na3", howToAnswer: "Na3 — a second attacker on c4; Bxc4 or Nxc4 follows.", why: "Defending the pawn with a piece that belongs elsewhere." },
        { san: "Nc6", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back.", why: "Normal." },
        { san: "c5", verdict: "good", answer: "Bxc4", howToAnswer: "Bxc4 — pawn back, then O-O.", why: "Normal." },
      ],
    },

    // --- 2...d4: the Advance ------------------------------------------------------
    [P("Nf3 d5 c4 d4")]: {
      yourMove: { san: "e3", why: "Question the pawn at once. It has nothing behind it, and after exd4 the e-file opens for your pieces." },
      mistakes: [
        { san: "Nxd4", why: "Qxd4. The pawn is defended by the queen; you have given a knight for it." },
        { san: "d3", why: "This fixes their pawn on d4 for good and buries your own c1-bishop. Undermine with e3 instead." },
      ],
    },
    [P("Nf3 d5 c4 d4 e3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "exd4", howToAnswer: "exd4 — take. If ...Nxd4, Nxd4 Qxd4 and then Nc3 develops with the queen in front of you.", why: "The main line: Black defends d4 with a piece." },
        { san: "c5", verdict: "good", answer: "exd4", howToAnswer: "exd4 cxd4 then d3, g3 and Bg2 — their d4-pawn is a target, not a wedge.", why: "Black keeps a pawn on d4 at the cost of an open e-file for you." },
        { san: "dxe3", verdict: "dubious", answer: "fxe3", howToAnswer: "fxe3 — two centre pawns and the queens stay on. d4 next.", why: "Trading gives you a strong centre for free." },
        { san: "e5", verdict: "dubious", answer: "exd4", howToAnswer: "exd4 exd4 then d3, g3 and Bg2 — the pawn on d4 is isolated and your bishop hits b7.", why: "Overextending on both centre files." },
        { san: "c6", verdict: "dubious", answer: "exd4", howToAnswer: "exd4 Qxd4 Nc3 — the queen is in the middle and d3 with Be3 will kick her.", why: "Passive support that ends with the queen chased around." },
        { san: "Nf6", verdict: "good", answer: "exd4", howToAnswer: "exd4 Qxd4 Nc3 — tempo on the queen.", why: "Developing, but the pawn falls and the queen has to recapture." },
        { san: "Bg4", verdict: "dubious", answer: "exd4", howToAnswer: "exd4 Bxf3 Qxf3 Qxd4 Nc3 — level material and your pieces are out.", why: "Trading the bishop early." },
        { san: "g6", verdict: "dubious", answer: "exd4", howToAnswer: "exd4 Qxd4 Nc3 — tempo.", why: "Ignoring the centre." },
      ],
    },
    [P("Nf3 d5 c4 d4 e3 Nc6")]: {
      yourMove: { san: "exd4", why: "Take. Black must recapture with the knight, since ...Qxd4 walks into Nxd4." },
      mistakes: [
        { san: "b4", why: "Nxb4 — the pawn is undefended. The b4 push belongs later, with a3 behind it." },
      ],
    },
    [P("Nf3 d5 c4 d4 e3 Nc6 exd4")]: {
      replies: [
        { san: "Nxd4", verdict: "good", answer: "Nxd4", howToAnswer: "Nxd4 — trade. After ...Qxd4, Nc3 and d3 with Be3 kick the queen.", why: "The correct recapture." },
        { san: "Qxd4", verdict: "bad", answer: "Nxd4", howToAnswer: "Nxd4 — the f3-knight was watching d4. Queen for a knight.", why: "A blunder: the queen lands on a square your knight attacks." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "dxe5 — a pawn up. If ...Nxe5, Nxe5 and nothing recaptures.", why: "Pushing a second pawn into a square you control." },
        { san: "Nf6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — develop; you are a pawn up until they take on d4 and your knight is out.", why: "Developing but not recapturing." },
        { san: "Bg4", verdict: "dubious", answer: "Be2", howToAnswer: "Be2 — break the pin and prepare to castle; you are a pawn up.", why: "A pin that leaves the pawn unrecovered." },
        { san: "Bf5", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — a pawn up with development. If ...Nxd4, Nxd4 Qxd4 d3.", why: "Bishop out, pawn still lost." },
      ],
    },
    [P("Nf3 d5 c4 d4 e3 Nc6 exd4 Nxd4")]: {
      yourMove: { san: "Nxd4", why: "Trade. Their queen will have to recapture, and a queen in the centre this early is a target for Nc3, d3 and Be3." },
    },
    [P("Nf3 d5 c4 d4 e3 Nc6 exd4 Nxd4 Nxd4")]: {
      replies: [
        { san: "Qxd4", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — develop; d3 and Be3 will kick the queen next.", why: "The only recapture. Anything else leaves Black a knight down." },
        { san: "e5", verdict: "bad", answer: "Nb3", howToAnswer: "Nb3 — keep the knight. You are a knight up.", why: "Attacking the knight instead of taking it back." },
        { san: "Nf6", verdict: "bad", answer: "Nf3", howToAnswer: "Nf3 — retreat and keep the extra knight.", why: "Developing while a piece down." },
        { san: "c5", verdict: "bad", answer: "Nb3", howToAnswer: "Nb3 — the knight is safe and hits c5.", why: "Attacking the knight instead of recapturing." },
        { san: "e6", verdict: "bad", answer: "Nf3", howToAnswer: "Nf3 — keep the knight and the extra material.", why: "A knight down for nothing." },
      ],
    },
    [P("Nf3 d5 c4 d4 e3 Nc6 exd4 Nxd4 Nxd4 Qxd4")]: {
      yourMove: { san: "Nc3", why: "Develop. d3 and Be3 come next and the queen must retreat. You are a full move ahead in an open position." },
    },
  },

  traps: [
    {
      name: "The greedy queen on d4",
      sans: sans("1.Nf3 d5 2.c4 d4 3.e3 Nc6 4.exd4 Qxd4 5.Nxd4"),
      punisher: "white",
      tell: "Black recaptures on d4 with the queen while your f3-knight is still watching the square.",
      why: "The queen looks safe because the knight on c6 defends d4. It does not matter: Nxd4 takes the queen first, and ...Nxd4 only gets a knight back. Recapturing with the knight was the right order for Black.",
    },
    {
      name: "Nxd4 too early",
      sans: sans("1.Nf3 d5 2.c4 d4 3.Nxd4 Qxd4"),
      punisher: "black",
      tell: "Black pushes ...d4 and the pawn looks free because nothing sits next to it.",
      why: "The pawn is defended from behind by the queen on d8. Taking it with the knight loses a piece for a pawn. Undermine it with e3 and let the trade happen on your terms.",
    },
    {
      name: "Clinging to c4",
      sans: sans("1.Nf3 d5 2.c4 dxc4 3.e3 b5 4.a4 c6 5.axb5 cxb5 6.b3 cxb3 7.Bxb5+"),
      punisher: "white",
      tell: "Black takes on c4 and tries to keep the pawn with ...b5.",
      why: "The queenside pawns cannot hold each other. a4 hits b5, ...c6 props it up, and b3 breaks the chain. You end with a bishop on b5 giving check, Qxb3 coming, and every Black piece still at home. Material is level, development is not.",
    },
  ],

  modelGames: [
    {
      label: "Main line: double fianchetto",
      sans: sans("Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O b3 c5 Bb2 Nc6 e3 b6 Nc3 Bb7 cxd5 Nxd5 Nxd5 Qxd5 d4"),
      summary: "Five moves of development and a castled king before anything happens in the centre. Then b3 and Bb2, Nc3, and only after Black has committed does cxd5 and d4 open the board for both bishops.",
    },
    {
      label: "The Advance: undermine and develop",
      sans: sans("Nf3 d5 c4 d4 e3 Nc6 exd4 Nxd4 Nxd4 Qxd4 Nc3 e5 d3 Nf6 Be3 Qd8 Be2 Be7 O-O O-O"),
      summary: "Black grabs space with ...d4 and you take it apart with e3. Knights come off, the queen has to recapture, and Nc3, d3 and Be3 chase her home while you finish developing.",
    },
    {
      label: "Into the Queen's Gambit Declined",
      sans: sans("Nf3 d5 c4 e6 d4 Nf6 Nc3 Be7 Bg5 O-O e3 h6 Bh4 b6"),
      summary: "The same opening with the other centre plan: after ...e6, d4 and Nc3 give a Queen's Gambit Declined that Black never had the chance to avoid. Nf3 first means the Indian defences never appear.",
    },
  ],

  middlegamePlan:
    "You have a castled king, both bishops on long diagonals and no pawn weaknesses; Black has a centre that is now a target. " +
    "If Black has pawns on c5 and d5, trade cxd5 and push d4 to open the lines your bishops already sit on. " +
    "If Black is solid, build slowly with e3, Qe2, Rd1 and Nc3, and let them make the first commitment. " +
    "Against a pawn on d4, undermine with e3 and trade rather than blockade, and use the e-file that opens. " +
    "The Réti wins by being ready when the centre opens, so do not open it before your rooks are connected.",

  structureDiagram: {
    fen: "rnbq1rk1/ppp1bppp/4pn2/3p4/2P5/5NP1/PP1PPPBP/RNBQ1RK1 w - - 5 6",
    orientation: "white",
    arrows: [
      { from: "c4", to: "d5" },
      { from: "g2", to: "d5" },
      { from: "b2", to: "b3" },
    ],
    caption: "The Réti picture: castled by move five, the c-pawn and the g2-bishop both leaning on d5, and b3 coming to put the second bishop on the long diagonal.",
  },
};
