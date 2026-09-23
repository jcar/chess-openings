// King's Gambit (1.e4 e5 2.f4) — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines are standard public theory. Prose original.
//
// You give a pawn on move two and buy three things with it: the f-file, a big
// centre with d4, and a head start at Black's king. Every plan here is about
// spending that head start before Black finishes developing. Nf3 goes first,
// always, because it stops the one check (...Qh4+) that ruins the whole idea.
// Against ...g5 the h-pawn breaks the chain; against ...Bc5 you never take on e5.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const kingsGambit: OpeningSpec = {
  id: "kings-gambit",
  name: "King's Gambit",
  aliases: ["KGA"],
  eco: "C30–C39",
  side: "white",
  family: "1e4-e5",
  firstMoves: "1.e4 e5 2.f4",
  tabiyaFen: "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2",
  pitch:
    "You offer a pawn on move two and get the f-file, a big centre and a head start at their king in return. " +
    "Under 1200 nobody knows how to hold the extra pawn, the positions are open and tactical, and you are the one who knows the plan.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f3"], why: "First, before anything else. It stops ...Qh4+, the check that wrecks every King's Gambit where the knight is late, and it attacks e5." },
      { piece: "N", squares: ["e5", "d3"], why: "The same knight later. In the Kieseritzky it jumps to e5 when ...g4 kicks it, then drops back to d3 to help win the f4-pawn." },
      { piece: "B", squares: ["c4", "e2", "d3"], why: "The light bishop. On c4 it looks at f7 and stops ...d5 from being free; in the Declined it is your main attacking piece." },
      { piece: "B", squares: ["f4", "e3"], why: "The dark bishop takes back on f4 once the pawn has no defenders left. Do not rush it: the pawn is not going anywhere." },
      { piece: "N", squares: ["c3", "d2"], why: "The queen's knight. On c3 it guards e4 and supports d5; on d2 it can recapture on e4 or reroute." },
      { piece: "K", squares: ["g1"], why: "Castle when you can. In the Declined the bishop on c5 covers g1, so kick it with Na4 first." },
    ],
    pawns: ["e4", "d4"],
    order: [
      {
        before: "Nf3",
        after: "d4",
        why: "Knight before centre. After 2...exf4 the diagonal from h4 to your king is open: 3.d4? Qh4+ and the king has to walk to e2, because g3 loses a second pawn. 3.Nf3 covers h4 and only then is d4 safe.",
      },
    ],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "kg-f-file",
      title: "You are buying the f-file",
      oneLiner: "The pawn is gone. What you got is an open f-file, a d4 centre and time.",
      why: "The King's Gambit is not about winning the pawn back. Once Black takes on f4 the f-file is half open for your rook, d4 comes with nothing to stop it, and Black has to spend moves keeping a pawn that is far from home. Spend your moves on development and the pawn tends to fall by itself.",
    },
    {
      id: "kg-nf3-first",
      title: "Nf3 before anything",
      oneLiner: "After ...exf4 the queen check on h4 is the only thing that can hurt you. Nf3 stops it.",
      why: "With the f-pawn gone the e1–h4 diagonal is open, and ...Qh4+ either drives your king to e2 or costs you the g-pawn. 3.Nf3 covers h4 and attacks e5 at the same time. Bishop, centre pawn, other knight: all of it waits one move.",
      trigger: { kind: "epd", epds: [P("e4 e5 f4 exf4")] },
      response: "Nf3.",
      ifIgnored: "3.d4 Qh4+ 4.Ke2 and you have a king in the middle of the board on move four.",
    },
    {
      id: "kg-vs-g5",
      title: "Against ...g5: h4 breaks the chain",
      oneLiner: "The g5-pawn holds f4. Hit it with h4; after ...g4 your knight jumps to e5.",
      why: "3...g5 is the honest way to keep the pawn, and it costs Black their king's cover. 4.h4 attacks the base of the chain. If Black plays ...g4 the knight is kicked to e5, where it eyes f7 and g4 and cannot easily be chased. If Black ignores it, hxg5 opens the h-file.",
      trigger: { kind: "opponent_san", sans: ["g5"] },
      response: "h4. After ...g4, Ne5.",
    },
    {
      id: "kg-declined",
      title: "Against ...Bc5: never fxe5",
      oneLiner: "The bishop on c5 is bait. Take on e5 and ...Qh4+ wins the game.",
      why: "2...Bc5 declines the pawn and sets one trap: 3.fxe5?? Qh4+ and it is either mate on e4 or the rook on h1 goes. So Nf3 first, then Nc3, Bc4 and d3, and remember the c5-bishop also covers g1, so you cannot castle until you kick it with Na4 or block with Be3.",
      trigger: { kind: "opponent_san", sans: ["Bc5"] },
      response: "Nf3, then Nc3, Bc4, d3. Na4 to remove the bishop before you castle.",
      ifIgnored: "3.fxe5 Qh4+ 4.Ke2 Qxe4 is checkmate.",
    },
    {
      id: "kg-bishop-covers-g1",
      title: "That bishop stops you castling",
      oneLiner: "A black bishop on c5 looks straight at g1. Kick it before you plan O-O.",
      why: "With your f-pawn gone the c5–g1 diagonal is wide open, so castling short is illegal while the bishop sits there. Na4 (from c3) hits it and either trades it or drives it to b6, where Nxb6 finishes the job. Only then does O-O come back.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["c5"] },
      response: "d3 and Na4 to remove the bishop, then castle.",
    },
    {
      id: "kg-take-back-f4",
      title: "Take f4 back on your terms",
      oneLiner: "Bxf4 only when the pawn has no defenders. Until then, develop.",
      why: "The f4-pawn is a liability for Black, not an asset: it needs ...g5 to hold it and ...g5 wrecks their king. Let them spend the moves. When the g-pawn has gone to g4 and the knight has moved from f6, Bxf4 recovers the pawn with tempo and your dark bishop lands on its best square.",
      trigger: { kind: "epd", epds: [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4 d6 Nd3 Nxe4")] },
      response: "Bxf4.",
    },
    {
      id: "kg-book-end",
      title: "When the book runs out",
      oneLiner: "Develop toward f7. Open the f-file with a rook, then look for a sacrifice that is real.",
      why: "Count pieces aimed at the king: knight on e5 or f3, bishop on c4, rook on f1, queen ready to come to f3 or g4. If you have more attackers than they have defenders, look for a hit on f7. If not, finish development and play d4 or e5. A King's Gambit played for the pawn is a King's Gambit lost.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "e4", why: "Take the centre and open the bishop and queen. The gambit comes next move." } },

    [P("e4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "f4", howToAnswer: "f4 — the King's Gambit.", why: "The reply this opening exists for. Most of your games start here." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — and after ...Qxd5, Nc3 hits the queen and develops.", why: "The Scandinavian. You develop with tempo." },
        { san: "c5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then either d4 or a Bc4 and f4 setup — you like f-pawns anyway.", why: "The Sicilian. A different game, but your f4 instincts still work." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 or Nd2 — the French.", why: "The French. Take the centre you are offered." },
        { san: "c6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — the Caro-Kann.", why: "The Caro-Kann. Solid; build the centre." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nc3, Nf3 — the whole centre for free.", why: "The Pirc. Space is being handed to you." },
        { san: "Nf6", verdict: "dubious", answer: "e5", howToAnswer: "e5 — kick the knight, then d4. Don't keep chasing it with pawns.", why: "The Alekhine. Take the space, then develop." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nc3, Be3 — a big centre against the fianchetto.", why: "The Modern." },
        { san: "Nc6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — if ...e5 then d5 or Nf3; if ...d5 then e5 or Nc3.", why: "Unusual. Take the centre." },
        { san: "f5", verdict: "bad", answer: "exf5", howToAnswer: "exf5 — a free pawn and their king is already loose.", why: "It weakens the king for nothing." },
      ],
    },

    [P("e4 e5")]: {
      yourMove: { san: "f4", why: "The gambit. You offer the f-pawn to pull their e-pawn off the centre, open the f-file and gain time." },
    },

    [P("e4 e5 f4")]: {
      replies: [
        { san: "exf4", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — stop ...Qh4+ before you do anything else.", why: "Accepting. The main line and the one you should want." },
        { san: "Bc5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — never fxe5, which loses to ...Qh4+. Then Nc3, Bc4 and d3.", why: "The Declined. The bishop eyes g1 and dares you to take on e5." },
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "exd5 — then Nf3 against ...exf4, or d3 against ...e4.", why: "The Falkbeer. Black gives a pawn back to open the centre." },
        { san: "Nc6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — if ...exf4 you are in the accepted lines with d4 to come.", why: "Developing without deciding. Usually transposes." },
        { san: "d6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then d4 — a Fischer Defence by another route.", why: "Solid and a little passive." },
        { san: "Nf6", verdict: "dubious", answer: "d3", howToAnswer: "d3 — keep e4 and let them decide. If ...exf4 then Bxf4.", why: "It hits e4 but leaves e5 hanging; d3 keeps everything covered." },
        { san: "Qh4+", verdict: "bad", answer: "g3", howToAnswer: "g3 — the queen must retreat and you have gained a move.", why: "A check that achieves nothing while the f-pawn still guards g3's future." },
        { san: "Qf6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — develop and threaten to take on e5 with the pawn.", why: "The queen defends e5 but stands on her own knight's square." },
        { san: "f6", verdict: "bad", answer: "Nf3", howToAnswer: "Nf3 — develop. Their knight has lost f6 and their king has lost cover.", why: "Defending with the f-pawn on move two weakens everything around the king." },
        { san: "Bd6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 and d4 — the bishop on d6 blocks their own d-pawn.", why: "It defends e5 but shuts in the queenside." },
      ],
    },

    // --- Accepted: 2...exf4 ------------------------------------------------------
    [P("e4 e5 f4 exf4")]: {
      yourMove: { san: "Nf3", why: "The move the whole opening depends on. It covers h4 so there is no queen check, and it attacks e5 for later." },
      mistakes: [
        { san: "d4", why: "Qh4+ and your king goes to e2, because g3 gives up a second pawn. Nf3 first, then d4 is safe." },
        { san: "Bc4", why: "Not a blunder, but ...Qh4+ Kf1 costs you castling on move four. Grandmasters play it. You should play Nf3." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3")]: {
      replies: [
        { san: "g5", verdict: "good", answer: "h4", howToAnswer: "h4 — hit the pawn that holds f4. After ...g4, Ne5.", why: "The classical way to keep the pawn. It also strips their king." },
        { san: "d6", verdict: "good", answer: "d4", howToAnswer: "d4 — take the centre. Bxf4 later, Bc4 and castle.", why: "The Fischer Defence: ...g5 next without allowing Ne5. Solid." },
        { san: "Nf6", verdict: "good", answer: "e5", howToAnswer: "e5 — kick the knight. ...Nh5 keeps the pawn but the knight is offside; d4 next.", why: "Counterattacking e4 at once." },
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "exd5, then Bc4 or Bb5+ and castle.", why: "The Modern Defence. Black gives the pawn back for open lines." },
        { san: "Be7", verdict: "good", answer: "Bc4", howToAnswer: "Bc4 — if ...Bh4+ then Kf1: the bishop on h4 is offside and d4 comes next.", why: "The Cunningham. It threatens ...Bh4+; you can afford the king step." },
        { san: "Nc6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the centre first, then Bxf4 and Bc4.", why: "Developing without doing anything about your centre." },
        { san: "h6", verdict: "good", answer: "d4", howToAnswer: "d4, then Bc4 — ...g5 is coming and you have the centre already.", why: "The Becker. It prepares ...g5 without allowing h4 to bite." },
        { san: "Bd6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Bxf4 — the bishop on d6 is hit and their d-pawn is blocked.", why: "Guarding f4 with the bishop that should be developing." },
        { san: "Qf6", verdict: "dubious", answer: "e5", howToAnswer: "e5 — the knight guards it, so the queen must move again.", why: "The queen defends f4 and gets chased for it." },
        { san: "Bc5", verdict: "dubious", answer: "d4", howToAnswer: "d4 — hit the bishop, then Bxf4 with a big centre.", why: "It develops but the bishop is immediately kicked." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5")]: {
      yourMove: { san: "h4", why: "Attack the base of the chain. The g5-pawn is the only thing keeping f4, and their king is behind it." },
      mistakes: [
        { san: "Nxg5", why: "The pawn is defended by the queen: ...Qxg5 and you have lost a knight for a pawn." },
        { san: "Bc4", why: "The Muzio: ...g4 and you must let the knight go for an attack. Thrilling, and not what we are doing. h4 first." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4")]: {
      replies: [
        { san: "g4", verdict: "good", answer: "Ne5", howToAnswer: "Ne5 — the Kieseritzky. The knight sits in the centre eyeing f7 and g4.", why: "The main line. Black pushes rather than let the chain be broken." },
        { san: "Bg7", verdict: "dubious", answer: "hxg5", howToAnswer: "hxg5 — open the h-file; d4 and Bxf4 follow.", why: "Developing instead of dealing with the threat to g5." },
        { san: "h6", verdict: "dubious", answer: "hxg5", howToAnswer: "hxg5 hxg5 and the h-file is yours. d4 next and the g5-pawn is a target.", why: "Holding g5 with the h-pawn just gives you an open file." },
        { san: "d6", verdict: "dubious", answer: "hxg5", howToAnswer: "hxg5 — the pawn falls and the h-file opens.", why: "Ignoring the threat." },
        { san: "Nc6", verdict: "dubious", answer: "hxg5", howToAnswer: "hxg5, then d4 — you have the centre and the file.", why: "Development that leaves g5 to its fate." },
        { san: "f6", verdict: "bad", answer: "Nxg5", howToAnswer: "Nxg5! — fxg5 Qh5+ Ke7 Qxg5+ and their king is stuck in the centre for good.", why: "Defending g5 with the f-pawn opens the h5–e8 diagonal to the king." },
        { san: "Qe7", verdict: "dubious", answer: "hxg5", howToAnswer: "hxg5 — the queen guards nothing on g5. Nc3 and d4 next.", why: "The queen comes out early and blocks the bishop." },
        { san: "Nf6", verdict: "dubious", answer: "hxg5", howToAnswer: "hxg5 — then e5 kicks the knight and you keep the initiative.", why: "It hits e4 but abandons g5." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4")]: {
      yourMove: { san: "Ne5", why: "The knight cannot be chased from e5, it eyes f7 and g4, and d4 will support it. The whole line is named after this move." },
      mistakes: [
        { san: "Ng5", why: "The Allgaier: ...h6 and the knight has nowhere to go except a sacrifice on f7. A knight for two pawns is not a plan." },
        { san: "Ng1", why: "Back home. Black is a pawn up with a free hand, and your knight has spent three moves going nowhere." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "d4", howToAnswer: "d4 — the centre first. After ...d6 Nd3, and Bxf4 recovers the pawn.", why: "The main line: Black hits e4 and develops." },
        { san: "d6", verdict: "good", answer: "Nxg4", howToAnswer: "Nxg4 — take the pawn; after ...Nf6 Nxf6+ Qxf6 you are level and their king is bare.", why: "Kicking the knight straight away." },
        { san: "Qe7", verdict: "dubious", answer: "d4", howToAnswer: "d4 — support the knight. The queen on e7 blocks their bishop.", why: "An early queen that gets in the way of development." },
        { san: "h5", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — f7 is weak and the rook on h8 has to defend it.", why: "The Long Whip. It holds g4 but their whole kingside is pawns." },
        { san: "Bg7", verdict: "good", answer: "d4", howToAnswer: "d4 — the knight is supported and Bxf4 comes.", why: "Natural development; the bishop hits your e5-knight." },
        { san: "d5", verdict: "dubious", answer: "d4", howToAnswer: "d4 — hold the knight; after ...Nf6 Bxf4 you are back level.", why: "Striking in the centre with the king still undeveloped." },
        { san: "Nc6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the knight stays on e5 supported, and Bxf4 follows.", why: "Development that ignores the pawns." },
        { san: "Qf6", verdict: "dubious", answer: "Nxg4", howToAnswer: "Nxg4 — the queen on f6 is hit and the g-pawn is gone.", why: "The queen comes out to defend f4 and gets chased." },
        { san: "f3", verdict: "bad", answer: "Nxg4", howToAnswer: "Nxg4 — you win the g-pawn and the f3-pawn is next.", why: "Pushing past hands you two pawns to pick up." },
        { san: "Bd6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the knight is supported and the bishop on d6 blocks their d-pawn.", why: "Hitting the knight with the wrong piece." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6")]: {
      yourMove: { san: "d4", why: "Support the knight and claim the centre. Bc4 was the old move, but ...d6 forces a knight sacrifice you do not want; d4 keeps it simple." },
      mistakes: [{ san: "Qxg4", why: "The knight on f6 guards g4. ...Nxg4 and your queen is gone." }],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4")]: {
      replies: [
        { san: "d6", verdict: "good", answer: "Nd3", howToAnswer: "Nd3 — retreat and hit f4. After ...Nxe4 Bxf4 you are back level with an open game.", why: "The main line. The knight is kicked and your f4 plan starts." },
        { san: "d5", verdict: "good", answer: "Bxf4", howToAnswer: "Bxf4 — the pawn has no defenders now. Nc3 next.", why: "Striking in the centre; the f4-pawn is left loose." },
        { san: "Bg7", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — develop; the knight on e5 is supported and Bxf4 comes.", why: "Sound development. The bishop leans on e5." },
        { san: "Nxe4", verdict: "dubious", answer: "Bxf4", howToAnswer: "Bxf4 — level material and your pieces are far more active.", why: "Grabbing the pawn while their king is bare." },
        { san: "Nc6", verdict: "dubious", answer: "Bxf4", howToAnswer: "Bxf4 — take back with tempo; Nc3 and Bc4 follow.", why: "It hits e5 but lets you recapture cleanly." },
        { san: "Qe7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — develop and guard e4; the queen is in the bishop's way.", why: "Early queen, blocking the bishop." },
        { san: "h5", verdict: "bad", answer: "Bc4", howToAnswer: "Bc4 — f7 is weak, the rook on h8 is tied to it, and d5 is coming.", why: "A pawn move on the flank while the king is in the centre." },
        { san: "Be7", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — aim at f7 and prepare Bxf4.", why: "Modest development; the bishop does nothing on e7." },
        { san: "c6", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — you develop, they have not.", why: "A slow move that prepares ...d5 too late." },
        { san: "Nh5", verdict: "bad", answer: "Qxg4", howToAnswer: "Qxg4 — the knight has left f6, so g4 hangs and the knight on h5 is hit too.", why: "The knight guarded g4; now nothing does." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4 d6")]: {
      yourMove: { san: "Nd3", why: "The knight retreats with a purpose: it attacks f4. Whatever Black does, Bxf4 comes next and the material is level." },
      mistakes: [
        { san: "Nxg4", why: "...Bxg4 and the knight is gone for a pawn. The d-pawn moved, so the c8-bishop reaches g4 now." },
        { san: "Bxf4", why: "...dxe5 and your knight on e5 is lost. Retreat it first." },
        { san: "Nxf7", why: "A knight for two pawns with nothing behind it. ...Kxf7 and Black is simply better." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4 d6 Nd3")]: {
      replies: [
        { san: "Nxe4", verdict: "good", answer: "Bxf4", howToAnswer: "Bxf4 — the pawn is back, your bishop is on its best square and their king has no cover.", why: "The main line. Black takes your centre pawn and you take theirs." },
        { san: "Bg7", verdict: "good", answer: "Nxf4", howToAnswer: "Nxf4 — take with the knight and keep the bishop for e3 or g5.", why: "Developing first. The knight recaptures happily." },
        { san: "Nh5", verdict: "dubious", answer: "Bxf4", howToAnswer: "Bxf4 — the knight on h5 defends f4 no longer, and it is offside.", why: "Guarding f4 from the edge." },
        { san: "Nc6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — hold e4, then Bxf4 or Nxf4.", why: "Development that leaves e4 and f4 to be sorted out." },
        { san: "Be7", verdict: "dubious", answer: "Bxf4", howToAnswer: "Bxf4 — the bishop on e7 hits h4, so keep an eye on it.", why: "Quiet development." },
        { san: "Qe7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — guard e4 and develop; the queen is blocking their bishop.", why: "Queen out early." },
        { san: "f3", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — develop. The f3-pawn is a stray and falls when you want it to.", why: "Pushing past rather than holding." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4 d6 Nd3 Nxe4")]: {
      yourMove: { san: "Bxf4", why: "Now. The pawn has no defenders left, the bishop lands on its best square, and material is back to level with their king in the open." },
      mistakes: [
        { san: "Qxg4", why: "The d-pawn has moved, so ...Bxg4 takes your queen." },
        { san: "Nxf4", why: "The knight is loose on f4 and h4 is undefended: ...Be7 hits both and you lose material." },
      ],
    },
    [P("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4 d6 Nd3 Nxe4 Bxf4")]: {
      replies: [
        { san: "Bg7", verdict: "good", answer: "c3", howToAnswer: "c3 — protect d4, then Nd2 to trade the e4-knight and Be2. Your bishops are the compensation.", why: "The main line. The bishop hits d4 and prepares castling." },
        { san: "Qe7", verdict: "dubious", answer: "Be2", howToAnswer: "Be2 — develop and hit g4. Castle next.", why: "The queen comes to e7 and the bishop is shut in." },
        { san: "Nc6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — trade the strong knight on e4 if they let you.", why: "Developing with pressure on d4." },
        { san: "Be7", verdict: "dubious", answer: "Qe2", howToAnswer: "Qe2 — hit the knight; if it stays, Nc3 or Nd2 trades it.", why: "The bishop hits h4 but the e4-knight is now the question." },
        { san: "Qf6", verdict: "dubious", answer: "Nd2", howToAnswer: "Nd2 — challenge the knight; the queen on f6 is exposed on the f-file.", why: "Queen to the open file, early." },
        { san: "d5", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — trade on e4 and the centre is yours to work with.", why: "Supporting the knight with the pawn." },
      ],
    },

    // --- Declined: 2...Bc5 -------------------------------------------------------
    [P("e4 e5 f4 Bc5")]: {
      yourMove: { san: "Nf3", why: "Develop and cover h4. The bishop on c5 dares you to take on e5; do not." },
      mistakes: [
        { san: "fxe5", why: "...Qh4+ and it is over: Ke2 allows Qxe4 mate, g3 allows Qxe4+ and the rook on h1 goes." },
        { san: "d4", why: "The bishop already covers d4. ...Bxd4 and you are a pawn down; Qxd4 exd4 makes it worse." },
      ],
    },
    [P("e4 e5 f4 Bc5 Nf3")]: {
      replies: [
        { san: "d6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — develop; Bc4 and d3 follow. Do not take on e5.", why: "The main line. Black supports e5 and keeps the bishop on its diagonal." },
        { san: "Nc6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — then Bb5 or Bc4 and d3.", why: "Development that also guards e5." },
        { san: "exf4", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the bishop is hit, then Bxf4 with a big centre.", why: "Accepting late: the bishop on c5 is now a target." },
        { san: "d5", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — keep developing; the centre will open in your favour.", why: "Ambitious, but it loosens e5." },
        { san: "Nf6", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 — now it is safe, because the knight covers h4. After ...Nxe4, d4.", why: "It leaves e5 undefended with the queen check gone." },
        { san: "Qe7", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 — the queen cannot recapture because the knight guards e5.", why: "Defending with the queen, which then cannot do the job." },
        { san: "Qf6", verdict: "bad", answer: "fxe5", howToAnswer: "fxe5 — the pawn is safe and the queen has to move again.", why: "The queen on f6 defends nothing once you take." },
        { san: "a6", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 — a free pawn; nothing defends e5.", why: "A waiting move that forgets the pawn." },
        { san: "Ne7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then Bc4 — the knight on e7 blocks their own bishop.", why: "Passive development." },
      ],
    },
    [P("e4 e5 f4 Bc5 Nf3 d6")]: {
      yourMove: { san: "Nc3", why: "Develop toward Bc4 and d3. The knight also has Na4 in mind, to kick the bishop so you can castle." },
      mistakes: [{ san: "fxe5", why: "...dxe5 gives you nothing, and if you then take on e5 with the knight, ...Qh4+ is back because the knight has left f3." }],
    },
    [P("e4 e5 f4 Bc5 Nf3 d6 Nc3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Bc4", howToAnswer: "Bc4 — aim at f7. d3 and Na4 next.", why: "The main line. Black develops and hits e4." },
        { san: "Nc6", verdict: "good", answer: "Bb5", howToAnswer: "Bb5 — pin the knight and prepare to deal with the c5-bishop before castling.", why: "Natural development." },
        { san: "Be6", verdict: "dubious", answer: "Na4", howToAnswer: "Na4 — kick the c5-bishop; then d4 or Bc4.", why: "A bishop that will be traded or chased." },
        { san: "Bg4", verdict: "dubious", answer: "h3", howToAnswer: "h3 — ask the question. After ...Bxf3 Qxf3 the f-file is yours.", why: "A pin on your knight that is easily broken." },
        { san: "exf4", verdict: "dubious", answer: "d4", howToAnswer: "d4 — hit the bishop and take the centre; Bxf4 follows.", why: "Accepting late, with the bishop in the way." },
        { san: "a6", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — develop; ...b5 will cost them time.", why: "A slow move." },
        { san: "Qe7", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 dxe5 Nd5 — the queen on e7 is in the way of everything.", why: "The queen blocks the bishop and invites Nd5." },
        { san: "Qf6", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 — dxe5 Nd5 hits the queen.", why: "The queen on f6 is a target on the f-file." },
        { san: "Nd7", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — f7 is weak with the knight on d7 blocking the bishop.", why: "Passive: it shuts in the c8-bishop." },
        { san: "c6", verdict: "dubious", answer: "Na4", howToAnswer: "Na4 — kick the bishop first, then Bc4 and d3.", why: "Preparing ...d5 too slowly." },
      ],
    },
    [P("e4 e5 f4 Bc5 Nf3 d6 Nc3 Nf6")]: {
      yourMove: { san: "Bc4", why: "The bishop takes aim at f7 and stops ...d5 from being free. d3 next, then Na4 to remove their bishop." },
      mistakes: [
        { san: "fxe5", why: "...dxe5 opens the f-file for both sides and gives you nothing." },
        { san: "d4", why: "The c5-bishop covers d4: ...exd4 and you are a pawn down." },
        { san: "Bb5+", why: "...c6 kicks the bishop and gains a move. Bc4 is where it belongs." },
      ],
    },
    [P("e4 e5 f4 Bc5 Nf3 d6 Nc3 Nf6 Bc4")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "d3", howToAnswer: "d3 — solid; then Na4 to kick the bishop and castle.", why: "The main line. Everything is developed and the fight is about the e5-pawn." },
        { san: "Be6", verdict: "dubious", answer: "Bxe6", howToAnswer: "Bxe6 fxe6 — their pawns are doubled and the e6-pawn blocks their game.", why: "Offering a trade that helps you." },
        { san: "Bg4", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 — ...dxe5 Bxf7+ Kxf7 Nxe5+ hits the g4-bishop and you are two pawns up.", why: "The pin looks annoying but leaves f7 and e5 loose." },
        { san: "O-O", verdict: "good", answer: "d3", howToAnswer: "d3 — then Na4 and castle yourself.", why: "Sensible: the king is safe before the centre opens." },
        { san: "c6", verdict: "dubious", answer: "Qe2", howToAnswer: "Qe2 — connect the pieces; if ...d5 then Bb3 keeps the bishop.", why: "Preparing ...d5 or ...b5." },
        { san: "exf4", verdict: "dubious", answer: "d4", howToAnswer: "d4 — hit the bishop, take the centre, Bxf4 next.", why: "Late acceptance with the bishop in the way." },
        { san: "Nxe4", verdict: "bad", answer: "Nxe4", howToAnswer: "Nxe4 — the fork trick fails here: after ...d5 Bb5+ or Nxc5 wins material.", why: "The usual ...Nxe4 ...d5 trick does not work with the bishop on c5." },
        { san: "a6", verdict: "dubious", answer: "d3", howToAnswer: "d3 — and Bb3 when ...b5 comes.", why: "Preparing to kick your bishop." },
        { san: "Ng4", verdict: "dubious", answer: "Qe2", howToAnswer: "Qe2 — cover f2 and unpin; the knight has nothing on g4.", why: "Hoping for ...Nf2, which Qe2 stops." },
        { san: "Qe7", verdict: "dubious", answer: "d3", howToAnswer: "d3 — develop; the queen is in the bishop's way.", why: "Early queen." },
      ],
    },
    [P("e4 e5 f4 Bc5 Nf3 d6 Nc3 Nf6 Bc4 Nc6")]: {
      yourMove: { san: "d3", why: "Hold e4 and open the c1-bishop. Then Na4 to kick the c5-bishop, which is the only thing stopping you castling." },
      mistakes: [
        { san: "fxe5", why: "...dxe5 and the pawn is defended by the knight. Nxe5 would lose a piece." },
        { san: "d4", why: "...exd4 and you cannot take back: Nxd4 runs into Nxd4 or Bxd4 and your queen is overloaded." },
      ],
    },
    [P("e4 e5 f4 Bc5 Nf3 d6 Nc3 Nf6 Bc4 Nc6 d3")]: {
      replies: [
        { san: "Bg4", verdict: "good", answer: "Na4", howToAnswer: "Na4 — kick the c5-bishop; after ...Bb6 Nxb6 axb6 you can castle.", why: "The pin is real but your knight has its own business." },
        { san: "O-O", verdict: "good", answer: "Na4", howToAnswer: "Na4 — remove the bishop, then castle.", why: "Black gets the king safe first." },
        { san: "a6", verdict: "dubious", answer: "f5", howToAnswer: "f5 — clamp the kingside; their c8-bishop is shut in.", why: "Preparing ...b5 while the centre is still closed." },
        { san: "Be6", verdict: "dubious", answer: "Bb5", howToAnswer: "Bb5 — keep the bishop and pin the knight.", why: "Offering a trade you need not accept." },
        { san: "exf4", verdict: "dubious", answer: "Bxf4", howToAnswer: "Bxf4 — take back and the f-file is yours.", why: "Late acceptance." },
        { san: "Ng4", verdict: "dubious", answer: "Qe2", howToAnswer: "Qe2 — cover f2; the knight achieves nothing.", why: "Hoping for ...Nf2." },
        { san: "Nd4", verdict: "dubious", answer: "Na4", howToAnswer: "Na4 — hit the bishop; if ...Nxf3+ Qxf3.", why: "A jump into the centre that can be traded off." },
        { san: "Qe7", verdict: "dubious", answer: "Na4", howToAnswer: "Na4 — the bishop first, then castle.", why: "Early queen." },
        { san: "h6", verdict: "dubious", answer: "Na4", howToAnswer: "Na4 — remove the bishop and castle.", why: "A waiting move." },
      ],
    },

    // --- Falkbeer: 2...d5 -------------------------------------------------------
    [P("e4 e5 f4 d5")]: {
      yourMove: { san: "exd5", why: "Take. Black is offering a pawn back to open the centre; you accept and develop." },
    },
    [P("e4 e5 f4 d5 exd5")]: {
      replies: [
        { san: "exf4", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — then Bc4 or Bb5+ and castle. You are a pawn up.", why: "The Modern Defence. Black trades pawns and opens lines." },
        { san: "e4", verdict: "dubious", answer: "d3", howToAnswer: "d3 — hit the e4-pawn at once; after ...Nf6 dxe4.", why: "The Falkbeer proper. The advanced pawn is a target." },
        { san: "c6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — hold d5 for a moment and develop.", why: "The Nimzowitsch, offering a second pawn for development." },
        { san: "Qxd5", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — the queen must move again.", why: "Recapturing with the queen costs a move." },
        { san: "Nf6", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 — hit the knight and keep the extra pawn.", why: "Developing while the e5-pawn is loose." },
        { san: "Bc5", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — develop; do not take on e5 with the queen check available.", why: "The bishop eyes g1 again." },
      ],
    },
  },

  traps: [
    {
      name: "The check you forgot to stop",
      sans: sans("1.e4 e5 2.f4 exf4 3.d4 Qh4+ 4.Ke2"),
      punisher: "black",
      tell: "The f-pawn is gone and the centre is begging for d4. Look at the h4–e1 diagonal first.",
      why: "With the f-pawn off the board nothing covers h4. After 3.d4? Qh4+ the king has to go to e2, because 4.g3 fxg3 costs a second pawn and opens the king further. Nf3 covers h4, and only then is d4 safe. Every King's Gambit starts 3.Nf3 for this reason.",
    },
    {
      name: "The poisoned pawn in the Declined",
      sans: sans("1.e4 e5 2.f4 Bc5 3.fxe5 Qh4+ 4.Ke2 Qxe4#"),
      punisher: "black",
      tell: "Black declines with ...Bc5 and the e5-pawn looks free. The bishop on c5 is the tell: it covers g1, so your king has no escape.",
      why: "3.fxe5 opens the h4–e1 diagonal and Black has the check at once. 4.Ke2 is mate on e4. 4.g3 Qxe4+ 5.Qe2 Qxh1 and the rook is gone. So 3.Nf3 first, always, and the pawn on e5 is left alone.",
    },
    {
      name: "The knight sacrifice against ...f6",
      sans: sans("1.e4 e5 2.f4 exf4 3.Nf3 g5 4.h4 f6 5.Nxg5 fxg5 6.Qh5+ Ke7 7.Qxg5+"),
      punisher: "white",
      tell: "Black defends the g5-pawn with ...f6, opening the h5–e8 diagonal to their king.",
      why: "The knight goes for two pawns and the king comes to e7 with no way back. After 7...Nf6 8.e5 the attack continues and Black's pieces are tied to the king. You are not up material, but the king in the centre is worth far more than a knight for two pawns here.",
    },
  ],

  modelGames: [
    {
      label: "Kieseritzky: pawn back, king in the open",
      sans: sans("e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 d4 d6 Nd3 Nxe4 Bxf4 Bg7 c3 O-O Nd2"),
      summary: "Nf3, h4, Ne5, d4, Nd3: the same moves every time. You are still a pawn down but Black's kingside is pawnless, your bishops are out and the e4-knight is about to be traded off.",
    },
    {
      label: "Declined: kick the bishop, then castle",
      sans: sans("e4 e5 f4 Bc5 Nf3 d6 Nc3 Nf6 Bc4 Nc6 d3 Bg4 Na4 Bb6 Nxb6 axb6 O-O"),
      summary: "Against ...Bc5 you never take on e5. Nf3, Nc3, Bc4, d3, then Na4 removes the bishop that was covering g1 and you castle into a healthy position.",
    },
    {
      label: "Falkbeer: take and develop",
      sans: sans("e4 e5 f4 d5 exd5 exf4 Nf3 Nf6 Bc4 Nxd5 O-O Be7 d4 O-O Bxd5 Qxd5 Nc3"),
      summary: "Black gives the pawn back to open the centre. You develop normally, castle, and trade the bishop for the knight when it kicks the queen around.",
    },
  ],

  middlegamePlan:
    "You are playing for the f-file and the centre, not for the pawn. After ...exf4 get Nf3, d4 and the light bishop out, and only recapture on f4 when nothing defends it. " +
    "In the Kieseritzky the knight comes back to d3, Bxf4 restores material, and your bishops plus Black's shredded kingside are the compensation for a king that may stay in the centre a while. " +
    "In the Declined the game is slower: Nc3, Bc4, d3, then Na4 to remove the c5-bishop so you can castle, and f5 or fxe5 when it opens the f-file for your rook. " +
    "Count attackers against f7 before any sacrifice. When you have more attackers than they have defenders, go; when you do not, develop another piece.",

  structureDiagram: {
    fen: "rnbqkb1r/pppp1p1p/5n2/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    orientation: "white",
    arrows: [
      { from: "e5", to: "f7" },
      { from: "d2", to: "d4" },
    ],
    caption: "The Kieseritzky picture: a pawn down, but the knight sits on e5 eyeing f7, d4 comes next, and Black's kingside pawns have all gone forward.",
  },
};
