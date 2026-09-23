// Benko Gambit — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// You give a wing pawn on move three and never ask for it back. What you buy is
// two half-open files (a and b) pointed straight at White's queenside, a bishop
// on g7 looking down the long diagonal, and a position where every natural
// move for Black is also a good one. The pressure does not fade in an endgame,
// which is why this is the safest gambit a beginner can play.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const benkoGambit: OpeningSpec = {
  id: "benko-gambit",
  name: "Benko Gambit",
  aliases: ["Volga", "Volga Gambit"],
  eco: "A57–A59",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 Nf6 2.c4 c5 3.d5 b5",
  tabiyaFen: "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4",
  pitch:
    "Give one wing pawn on move three and get two open files and a monster bishop that press White's queenside for the whole game. " +
    "Your moves are the same every time (...a6, ...Bxa6, ...d6, ...g6, ...Bg7, castle) and the pressure never wears off, so a pawn down feels like nothing.",

  setup: {
    pieces: [
      { piece: "B", squares: ["g7"], why: "The Benko bishop. From g7 it looks down the long diagonal at b2 and a1, which is exactly where your rooks are also aiming." },
      { piece: "B", squares: ["a6"], why: "The light bishop comes to a6 and trades itself for White's f1-bishop, dragging the king to f1 and costing White the right to castle." },
      { piece: "N", squares: ["f6"], why: "The king's knight: it guards the king, watches e4, and later hops to g4 or e8 to make room." },
      { piece: "N", squares: ["d7", "b6", "a6"], why: "The queen's knight goes to d7, then b6 to hit c4 and a4, or lands on a6 after a bishop trade." },
      { piece: "Q", squares: ["a5", "b6"], why: "The queen sits on a5 or b6, where she leans on the a- and b-files and the pawn on b2." },
      { piece: "R", squares: ["b8"], why: "One rook stays on a8 and the other comes to b8: two rooks, two half-open files, one target." },
    ],
    pawns: ["c5", "d6", "g6"],
    order: [
      {
        before: "c5",
        after: "b5",
        why: "...c5 first, and only then ...b5. The gambit works because White's pawn is stuck on d5 and the a- and b-files open onto a cramped queenside. Play ...b5 before ...c5 and cxb5 is simply a free pawn with no bind to show for it.",
      },
    ],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "benko-what-you-buy",
      title: "You are buying files, not a knockout",
      oneLiner: "The pawn pays for the a- and b-files and the g7-bishop. Squeeze, do not attack.",
      why: "Most gambits want a quick attack and fall apart if it fails. The Benko wants pressure that never goes away: rooks on a8 and b8, queen on a5 or b6, bishop on g7, all pointing at a2, b2 and c3. White spends the whole game defending pawns instead of using the extra one.",
    },
    {
      id: "benko-bishop-swap",
      title: "The bishop trades itself for White's castle",
      oneLiner: "When White plays e4, ...Bxf1 forces Kxf1. Their king is stuck in the centre.",
      why: "Your bishop on a6 stares at f1. The moment the e-pawn moves, the bishop on f1 is undefended by anything but the king, and Kxf1 is forced. White loses the right to castle and spends two extra moves (g3, Kg2) getting the king to safety by hand.",
      trigger: { kind: "epd", epds: [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4")] },
      response: "...Bxf1.",
      ifIgnored: "White plays Bxa6 and castles normally, and you have paid a pawn for nothing.",
    },
    {
      id: "benko-no-nxe4",
      title: "The e4-pawn is not free",
      oneLiner: "While a knight sits on c3, ...Nxe4 just loses your knight to Nxe4.",
      why: "It is the most natural grab on the board and it is wrong nearly every time in this opening. The pawn on e4 is guarded by the knight on c3. Count the defenders before you take: if c3 has a knight, leave e4 alone and play ...Bxf1 or ...g6 instead.",
      trigger: { kind: "opponent_piece_on", piece: "P", squares: ["e4"] },
      response: "...Bxf1 if the bishop on f1 is still there; otherwise ...g6 and ...Bg7.",
      ifIgnored: "Nxe4 and you are a full piece down for a pawn you were already behind on.",
    },
    {
      id: "benko-fianchetto-first",
      title: "Castle before you squeeze",
      oneLiner: "...g6, ...Bg7, ...O-O, ...Nbd7. Then the queen and rooks go to work.",
      why: "The squeeze needs every piece, and pieces need a safe king behind them. The bishop on g7 is both a shield and a weapon, so getting it there and castling is never a wasted move. Only then bring the queen to a5 or b6 and a rook to b8.",
    },
    {
      id: "benko-declined",
      title: "If White declines: take on c4",
      oneLiner: "White develops instead of taking? ...bxc4 grabs a pawn and opens the b-file anyway.",
      why: "Nf3, Nd2, e3, g3 and Qc2 all leave the pawn on c4 hanging. Take it. White usually wins it back with Bxc4 or Nxc4 later, but you have the same open b-file, the same ...d6 and ...g6 setup, and no pawn deficit to worry about.",
      trigger: {
        kind: "epd",
        epds: [
          P("d4 Nf6 c4 c5 d5 b5 Nf3"),
          P("d4 Nf6 c4 c5 d5 b5 Nd2"),
          P("d4 Nf6 c4 c5 d5 b5 g3"),
          P("d4 Nf6 c4 c5 d5 b5 Qc2"),
          P("d4 Nf6 c4 c5 d5 b5 Nc3"),
          P("d4 Nf6 c4 c5 d5 b5 a4"),
        ],
      },
      response: "...bxc4, then ...d6, ...g6 and ...Bg7.",
    },
    {
      id: "benko-b6-return",
      title: "When White hands the pawn back with b6",
      oneLiner: "5.b6 gives the pawn back to keep the files shut. Take it with the queen and play normally.",
      why: "Some players know the Benko is annoying and return the pawn immediately with b6 so that your a- and b-pawns stay blocked. ...Qxb6 gets the material back and the queen sits well on b6 anyway. Then ...d6, ...g6, ...Bg7 as usual.",
      trigger: { kind: "opponent_san", sans: ["b6"] },
      response: "...Qxb6.",
    },
    {
      id: "benko-book-end",
      title: "When the book runs out",
      oneLiner: "Queen to a5 or b6, rook to b8, knight to b6 or c4. Aim everything at a2, b2 and c3.",
      why: "Once you are castled with the bishop on g7 and knights on f6 and d7, the plan writes itself: ...Qa5 or ...Qb6, ...Rfb8, ...Nb6 heading for c4, and ...Ne8–c7 to add to the queenside. Trade pieces freely; the pressure survives every trade and even a pawn down the endgame is comfortable.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5 and if d5 comes, ...b5.", why: "The main move, and the one the Benko is built for." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5. If d4 follows you are in the Benko; if not, you have an English with a healthy position.", why: "The English. Your setup transfers if White adds d4." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5. If d4 and d5 come you can still play ...b5.", why: "Flexible. Your first two moves do not change." },
        { san: "e4", verdict: "good", answer: "c5", howToAnswer: "...c5 — the Sicilian. Same fighting spirit, same c5-pawn.", why: "No Benko against 1.e4, but ...c5 gives you a similar counter-punching game." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5 and ...d5 or ...g6.", why: "A quiet setup. You develop normally." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — take the centre; the knight on c3 has blocked White's own c-pawn.", why: "Blocks the c-pawn, so there is no c4 to gambit against." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...c5, ...d5 — you get the centre for free.", why: "Passive: it shuts in the c1-bishop." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...d5 and ...c5 to grab the centre White ignored.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...c5 — and note f4 has loosened their king.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...c5 — take the space they declined.", why: "Timid." },
      ],
    },
    [P("d4")]: { yourMove: { san: "Nf6", why: "Develop first and keep every option. The knight belongs on f6 in every line of this opening." } },
    [P("d4 Nf6")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "c5", howToAnswer: "...c5 — invite d5, then ...b5.", why: "Main line. This is the pawn your gambit will be aimed at." },
        { san: "Nf3", verdict: "good", answer: "c5", howToAnswer: "...c5. After d5 you can still play ...b5, or ...g6 and ...d6 for a Benoni-style game.", why: "Flexible. The c5 strike works here too." },
        { san: "Bf4", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit d4 at once. After d5 play ...Qb6 to hit b2, or ...e6.", why: "The London. ...c5 is the sharpest reply and the bishop on f4 does not guard b2." },
        { san: "Bg5", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — if d5, ...Ne4 hits the bishop; if dxc5, ...Qa5+ regains it.", why: "The Trompowsky. ...c5 gives you a good game either way." },
        { san: "e3", verdict: "dubious", answer: "c5", howToAnswer: "...c5, then ...d5 — a comfortable Queen's Pawn game.", why: "Passive: the c1-bishop is shut in." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — take the centre; with the knight on c3 there is no c4 to gambit against.", why: "Blocks White's own c-pawn." },
        { san: "g3", verdict: "good", answer: "c5", howToAnswer: "...c5 and after d5, ...b5 or ...g6.", why: "Fianchetto. Your setup barely changes." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4")]: {
      yourMove: { san: "c5", why: "Hit d4 at once. You want White to push d5, because a pawn on d5 is what makes ...b5 work." },
      mistakes: [{ san: "b5", why: "Not yet. Without ...c5 and d5 on the board, cxb5 is just a free pawn: there is no bind to compensate and ...a6 has nothing to open." }],
    },
    [P("d4 Nf6 c4 c5")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "b5", howToAnswer: "...b5 — the Benko Gambit.", why: "The main move. White takes space and gives you the target you want." },
        { san: "Nf3", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 Nxd4, then ...e6 or ...g6 — a Symmetrical English where you are fine.", why: "Declining the fight. No gambit, but an easy game." },
        { san: "Nc3", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nc6 — the queen must move again.", why: "Allows a trade that costs White time." },
        { san: "e3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 exd4 d5 — a level centre and free development.", why: "Solid but passive." },
        { san: "dxc5", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...Bxc5 — the pawn comes straight back with a developing move.", why: "Gives up the centre for a pawn you regain at once." },
        { san: "g3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nc6 — the queen is kicked and you develop.", why: "Ignores d4." },
        { san: "Bg5", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nc6 — develop with a threat, and ...Qa5+ is coming.", why: "Develops a bishop while the centre falls." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5")]: {
      yourMove: { san: "b5", why: "The gambit. The pawn on d5 is locked in place; ...b5 asks White to open the a- and b-files for you." },
      mistakes: [{ san: "Nxd5", why: "The d5-pawn is guarded by c4. cxd5 and you have given a knight for a pawn." }],
    },
    [P("d4 Nf6 c4 c5 d5 b5")]: {
      replies: [
        { san: "cxb5", verdict: "good", answer: "a6", howToAnswer: "...a6 — offer the second pawn to blow the files open.", why: "Accepting. The main line and the one you want." },
        { san: "Nf3", verdict: "good", answer: "bxc4", howToAnswer: "...bxc4, then ...d6, ...g6, ...Bg7 — the same setup with a free pawn for now.", why: "Declining. The c4-pawn is simply hanging." },
        { san: "Nc3", verdict: "good", answer: "bxc4", howToAnswer: "...bxc4, then ...d6 and ...g6. White wins it back with Bxc4 but you have the open b-file.", why: "Development first; the pawn on c4 falls." },
        { san: "Nd2", verdict: "dubious", answer: "bxc4", howToAnswer: "...bxc4, then ...e6 or ...d6 — White takes on c4 later.", why: "Passive development that still drops c4 for now." },
        { san: "g3", verdict: "dubious", answer: "bxc4", howToAnswer: "...bxc4, then ...g6 and ...d6 — a pawn up while White fianchettoes.", why: "Ignores the pawn." },
        { san: "a4", verdict: "dubious", answer: "bxc4", howToAnswer: "...bxc4, then ...Ba6 and ...d6 — the b-file is yours and c4 is a thorn.", why: "Weakens b4 and does nothing for development." },
        { san: "Qc2", verdict: "dubious", answer: "bxc4", howToAnswer: "...bxc4 Qxc4 Ba6 — the queen is hit and you develop.", why: "An early queen move that ends up chased." },
        { san: "Bg5", verdict: "dubious", answer: "Ne4", howToAnswer: "...Ne4 — hits the bishop. Then ...Qa5+ and ...bxc4.", why: "The bishop has nothing to bite on and becomes a target." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — grab it. After cxb5 hit back with ...Qa5+ and ...Bb7.", why: "Hangs e4 with no knight on c3 to guard it." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5")]: {
      yourMove: { san: "a6", why: "The second offer. If bxa6 the a- and b-files both open; if not, ...axb5 gets the pawn back with the a-file already half open." },
      mistakes: [{ san: "Nxd5", why: "The queen on d1 guards d5. Qxd5 wins the knight and hits your rook on a8." }],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6")]: {
      replies: [
        { san: "bxa6", verdict: "good", answer: "Bxa6", howToAnswer: "...Bxa6 — recapture with the bishop, which now stares at f1.", why: "Fully accepted. This is the Benko you came for." },
        { san: "Nc3", verdict: "good", answer: "axb5", howToAnswer: "...axb5, then ...e6 or ...Ba6 — material is level and your a-file is open.", why: "Develops and waits. You take back and are not even a pawn down." },
        { san: "b6", verdict: "good", answer: "Qxb6", howToAnswer: "...Qxb6 — the pawn comes back; then ...d6, ...g6, ...Bg7.", why: "Returns the pawn to keep the files closed. Sensible, and you are equal." },
        { san: "e3", verdict: "good", answer: "axb5", howToAnswer: "...axb5, then ...Ba6 to trade off White's bishop, and ...d6, ...g6 as usual.", why: "Solid. You take back and develop." },
        { san: "Nf3", verdict: "good", answer: "axb5", howToAnswer: "...axb5, then ...d6 and ...g6 — a level game with your a-file open.", why: "Develops; you regain the pawn." },
        { san: "a4", verdict: "bad", answer: "axb5", howToAnswer: "...axb5! Now if axb5 the a-file is wide open and ...Rxa1 takes a rook the knight on b1 cannot defend.", why: "Opens the a-file toward White's own rook." },
        { san: "Qa4", verdict: "dubious", answer: "axb5", howToAnswer: "...axb5 — the queen must move again, and ...Bb7 or ...Ba6 comes next.", why: "An early queen sortie that gets kicked." },
        { san: "Bg5", verdict: "dubious", answer: "axb5", howToAnswer: "...axb5, then ...Qa5+ or ...Ne4 hitting the bishop.", why: "Develops to a square where the bishop is a target." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6")]: {
      yourMove: { san: "Bxa6", why: "The bishop, not the knight. From a6 it looks at f1 and will trade itself for White's castling rights the moment e4 is played." },
      mistakes: [{ san: "Nxd5", why: "Qxd5 takes the knight and hits a8 at the same time. The d5-pawn is never free while the queen guards it." }],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "d6", howToAnswer: "...d6 — the Benko pawn chain, and now e4 will always be answered by ...Bxf1.", why: "The main line. White develops toward e4." },
        { san: "Nf3", verdict: "good", answer: "g6", howToAnswer: "...g6, then ...Bg7 and ...d6.", why: "Natural development. Your plan does not change." },
        { san: "g3", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...g6 and ...Bg7. No ...Bxf1 here: White keeps the bishop, so aim at the queenside instead.", why: "The Fianchetto line: White avoids the bishop trade by castling through g2." },
        { san: "e3", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — if Bxa6, ...Qa5+ and ...Nxa6 recaptures with tempo.", why: "Solid but slow; e3 blocks the c1-bishop." },
        { san: "b3", verdict: "dubious", answer: "g6", howToAnswer: "...g6 and ...Bg7 — your bishop now looks at a weakened long diagonal and the loose rook on a1.", why: "Weakens the exact diagonal your g7-bishop will use." },
        { san: "Nd2", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7, ...d6 — normal.", why: "Passive: the knight on d2 blocks the c1-bishop." },
        { san: "a4", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7 and ...Qa5 — the b4-square is now yours.", why: "A pawn move with pieces still at home." },
        { san: "e4", verdict: "bad", answer: "Bxf1", howToAnswer: "...Bxf1! After Kxf1 the e4-pawn has no knight to guard it and ...Nxe4 gets your pawn back.", why: "Premature: there is no knight on c3 yet, so e4 hangs after the bishop trade." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3")]: {
      yourMove: { san: "d6", why: "The Benko pawn chain: c5 and d6 lock White's d5-pawn in place and give your knight the d7-square." },
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "Bxf1", howToAnswer: "...Bxf1 — forced Kxf1, and White has lost the right to castle.", why: "The main line. White takes the centre and pays for it with the king." },
        { san: "Nf3", verdict: "good", answer: "g6", howToAnswer: "...g6 and ...Bg7. When e4 comes, ...Bxf1 as always.", why: "Delays e4 but does not avoid the trade." },
        { san: "g3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O, ...Nbd7 — then queen and rooks to the queenside.", why: "White plans Bg2 and castling. The squeeze still works." },
        { san: "e3", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — if Bxa6 Nxa6 the knight reaches c7 or b4.", why: "Blocks the c1-bishop to avoid the trade on f1." },
        { san: "f4", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7 and castle — after e4 you still trade on f1.", why: "Ambitious but loosens the king." },
        { san: "Bf4", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — d6 is guarded by the queen and e7-pawn, so Bxd6 loses a bishop for a pawn.", why: "Points at d6 but achieves nothing." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — block with the knight you wanted on d7 anyway.", why: "A check that costs White time: the queen will be kicked." },
        { san: "a4", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7 and ...Qa5 — b4 is now a hole.", why: "Weakens b4 and develops nothing." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4")]: {
      yourMove: { san: "Bxf1", why: "The point of the bishop on a6. Kxf1 is forced and White's king will need two more moves (g3, Kg2) to find shelter." },
      mistakes: [{ san: "Nxe4", why: "The knight on c3 guards e4. Nxe4 and you are a knight down for a pawn." }],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1")]: {
      replies: [
        { san: "Kxf1", verdict: "good", answer: "g6", howToAnswer: "...g6, then ...Bg7 and castle.", why: "Forced. White's king has lost castling for good." },
        { san: "Nf3", verdict: "bad", answer: "Bxg2", howToAnswer: "...Bxg2 — and after Rg1 Bxf3 Qxf3 you are a knight up.", why: "Ignores the bishop, which keeps eating." },
        { san: "Nge2", verdict: "bad", answer: "Bxe2", howToAnswer: "...Bxe2 — a second piece for the bishop.", why: "Blocks nothing and hangs the knight." },
        { san: "Qe2", verdict: "bad", answer: "Bxe2", howToAnswer: "...Bxe2 — the queen.", why: "Puts the queen on the bishop's diagonal." },
        { san: "a4", verdict: "bad", answer: "Bxg2", howToAnswer: "...Bxg2 — a second pawn, and the rook on h1 is next.", why: "Leaves the bishop loose on f1." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1")]: {
      yourMove: { san: "g6", why: "Fianchetto next. The bishop on g7 is the other half of the pressure, and it shields your king while White's still wanders." },
      mistakes: [{ san: "Nxe4", why: "Still guarded by the knight on c3. Nxe4 and you are a piece down." }],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6")]: {
      replies: [
        { san: "g3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 — White walks the king to g2 by hand.", why: "The main line: the king finds shelter on g2." },
        { san: "Nf3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, castle, ...Nbd7.", why: "Develops before hiding the king." },
        { san: "Nge2", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, castle, ...Nbd7 — normal.", why: "Keeps f3 free for a pawn." },
        { san: "f3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — the king will sit on f2 or g2 behind a loose wall.", why: "Slow and loosens the king further." },
        { san: "Bg5", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — if Bxf6 Bxf6 you have a fine bishop and White has fewer defenders of the queenside.", why: "Trades the bishop that should be guarding b2." },
        { san: "Qe2", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, castle, ...Qa5 — the queen on e2 does not help the queenside.", why: "An early queen move." },
        { san: "h4", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 and castle. White's king is in the middle; a pawn storm with the king exposed is their problem, not yours.", why: "Attacks before the king is safe." },
        { san: "a4", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, then ...Qa5 and ...Nbd7 — b4 is a hole.", why: "Weakens b4 for nothing." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6 g3")]: {
      yourMove: { san: "Bg7", why: "The Benko bishop arrives. From g7 it looks down the long diagonal at c3, b2 and a1." },
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6 g3 Bg7")]: {
      replies: [
        { san: "Kg2", verdict: "good", answer: "O-O", howToAnswer: "...O-O — your king is safe in one move; theirs took three.", why: "The main line. White's king has finished its walk." },
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Nbd7.", why: "Develops first." },
        { san: "Nge2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...Nbd7, ...Qa5.", why: "Normal." },
        { san: "h4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — then ...Qa5 and ...Rfb8. Their h-pawn is not scary with the king on f1.", why: "Starts an attack before the king is safe." },
        { san: "f4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...Nbd7, ...Qa5 — the f-pawn has loosened the king.", why: "More pawns forward, fewer defenders at home." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — if Bxf6 Bxf6 your bishop is even better.", why: "Trades a defender of the queenside." },
        { san: "Qe2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...Nbd7 — normal.", why: "An early queen move." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6 g3 Bg7 Kg2")]: {
      yourMove: { san: "O-O", why: "Safe king, rook on f8 ready to swing to b8. Now the squeeze can start." },
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6 g3 Bg7 Kg2 O-O")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — then ...Qa5 or ...Qb6 and ...Rfb8.", why: "The main line. Both sides are fully developed and the squeeze begins." },
        { san: "Nge2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, ...Qa5, ...Rfb8.", why: "Normal." },
        { san: "h3", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 and ...Qa5 — a tempo for you.", why: "A pawn move with a knight still on g1." },
        { san: "f4", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, ...Qa5 — and note ...Ng4 is coming to e5 later.", why: "Loosens the king's cover." },
        { san: "Rb1", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, ...Qa5, ...Rfb8 — the rook on b1 is already on defence.", why: "Defends b2 before it is attacked: passive, and it tells you the plan is working." },
        { san: "Bf4", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — then ...Qb6 hits b2, which the bishop just stopped guarding.", why: "The bishop leaves b2 undefended." },
        { san: "Qe2", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, ...Qa5, ...Rfb8.", why: "The queen is not a queenside defender from e2." },
        { san: "a4", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Qb6 and ...Nb6 hitting a4.", why: "Weakens b4 and gives your queen the b4-square." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6 g3 Bg7 Kg2 O-O Nf3")]: {
      yourMove: { san: "Nbd7", why: "The last developing move. The knight heads for b6 to hit a4 and c4, and the queen and rooks follow onto the a- and b-files." },
    },

    // --- 4.Nf3: the declined line ---------------------------------------------
    [P("d4 Nf6 c4 c5 d5 b5 Nf3")]: {
      yourMove: { san: "bxc4", why: "Take the pawn White left hanging. You are not gambiting anything now; you have the same open b-file and a pawn in hand." },
    },
    [P("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...g6 and ...Bg7. White wins c4 back with Bxc4 but you have the b-file.", why: "The main line of the declined gambit." },
        { san: "e4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — a second pawn. White regains one with Bxc4 and you play ...g6 and ...Bg7.", why: "Hangs another pawn to speed up development." },
        { san: "e3", verdict: "good", answer: "d6", howToAnswer: "...d6 — after Bxc4 play ...g6, ...Bg7 and ...Nbd7.", why: "Prepares to take c4 back quietly." },
        { san: "Nbd2", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...g6. If Nxc4 the knight is on the rim.", why: "Aims at c4 with the knight." },
        { san: "g3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, ...g6, ...Bg7 — you keep the pawn a while longer.", why: "Ignores c4." },
        { san: "a4", verdict: "dubious", answer: "d6", howToAnswer: "...d6, then ...Ba6 and ...Nbd7 — the c4-pawn is a thorn.", why: "A pawn move that does not win c4 back." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4 Nc3")]: {
      yourMove: { san: "d6", why: "The Benko pawn chain again. White will take c4 back; you get the b-file and the usual g7-bishop." },
    },
    [P("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4 Nc3 d6")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "g6", howToAnswer: "...g6, then ...Bg7 and castle. Bxc4 comes; let it.", why: "The main line. White takes the centre." },
        { san: "e3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, castle.", why: "Quieter but the same idea." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — block and develop; the queen takes c4 later but has moved twice.", why: "A check that only costs time." },
        { san: "g3", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7 — the c4-pawn keeps living.", why: "Ignores c4 again." },
        { san: "Nd2", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — after Nxc4 the knight is offside and ...Ba6 hits it.", why: "Loses time with a piece already developed." },
        { san: "Bg5", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — if Bxf6 exf6 is fine; the f-pawns cover e5 and your bishop pair works.", why: "Puts the bishop where it can be traded off." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4 Nc3 d6 e4")]: {
      yourMove: { san: "g6", why: "Fianchetto as always. Do not defend c4; White will take it and you will be no worse off than in the accepted line, minus the pawn deficit." },
      mistakes: [{ san: "Nxe4", why: "The knight on c3 guards e4. Nxe4 and you have lost a piece." }],
    },
    [P("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4 Nc3 d6 e4 g6")]: {
      replies: [
        { san: "Bxc4", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, castle, then ...Ba6 to trade the bishop off or ...Nbd7–b6 to hit it.", why: "Material is level and White has the bishop you will later swap." },
        { san: "Be2", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 and castle — White takes c4 next anyway.", why: "Castles first." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — then ...Bg7; Qxc4 has cost White two queen moves.", why: "Slow." },
        { san: "Bg5", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — Bxf6 Bxf6 is welcome.", why: "Trades off a useful bishop." },
        { san: "h3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 and castle — a free move for you.", why: "A pawn move with the king still home." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4 Nc3 d6 e4 g6 Bxc4")]: {
      yourMove: { san: "Bg7", why: "The bishop reaches g7 and your king is one move from safety. Then ...Nbd7 and the queenside pressure, exactly as in the accepted line." },
    },
    [P("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4 Nc3 d6 e4 g6 Bxc4 Bg7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Ba6 to trade bishops or ...Nbd7 and ...Nb6.", why: "Normal. Both kings safe, and your files are open." },
        { san: "h3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...Nbd7 — normal.", why: "A slow pawn move." },
        { san: "Qe2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...Nbd7 and ...Nb6 hitting the bishop.", why: "Early queen move." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — Bxf6 Bxf6 suits you.", why: "Trades the bishop that guards b2." },
        { san: "Bf4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — d6 is guarded by the queen and e7-pawn; then ...Nbd7.", why: "Aims at d6 without a real threat." },
      ],
    },
  },

  traps: [
    {
      name: "The e4-pawn is not free",
      sans: sans("1.d4 Nf6 2.c4 c5 3.d5 b5 4.cxb5 a6 5.bxa6 Bxa6 6.Nc3 d6 7.e4 Nxe4 8.Nxe4"),
      punisher: "white",
      tell: "White plays e4 and your knight on f6 sees a pawn it has been trained to grab in every other opening.",
      why: "The knight on c3 guards e4. After Nxe4 you have given a knight for a pawn, and you were already a pawn down for the gambit. The correct reply to e4 is ...Bxf1, taking White's castling instead of a pawn.",
    },
    {
      name: "The open a-file bites",
      sans: sans("1.d4 Nf6 2.c4 c5 3.d5 b5 4.cxb5 a6 5.a4 axb5 6.axb5 Rxa1"),
      punisher: "black",
      tell: "White supports the b5-pawn with a4 instead of taking on a6 or developing.",
      why: "After ...axb5 axb5 both a-pawns are gone and the a-file is completely open. White's rook on a1 is defended only by the queen on d1, and the knight on b1 stands in the way, so ...Rxa1 simply wins a rook. White has to see this and play something other than axb5.",
    },
    {
      name: "The bishop takes their castle",
      sans: sans("1.d4 Nf6 2.c4 c5 3.d5 b5 4.cxb5 a6 5.bxa6 Bxa6 6.Nc3 d6 7.e4 Bxf1 8.Kxf1"),
      punisher: "black",
      tell: "White plays e4 while the bishop is still on f1 and yours is on a6.",
      why: "No material changes hands, but White loses the right to castle for good and will spend two more moves (g3 and Kg2) walking the king to safety by hand. Those are two moves you spend on ...g6, ...Bg7 and castling. This is the reason the bishop went to a6 rather than the knight.",
    },
  ],

  modelGames: [
    {
      label: "Accepted: the full squeeze setup",
      sans: sans("d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6 g3 Bg7 Kg2 O-O Nf3 Nbd7 Re1 Qa5 h3 Rfb8"),
      summary: "Every Benko idea in thirteen moves: both pawns offered, the bishop traded for White's castling, the fianchetto, the castled king, and finally queen and rook onto the a- and b-files.",
    },
    {
      label: "Declined with 4.Nf3: take c4, trade the bishop",
      sans: sans("d4 Nf6 c4 c5 d5 b5 Nf3 bxc4 Nc3 d6 e4 g6 Bxc4 Bg7 O-O O-O h3 Ba6 Bxa6 Nxa6 Bf4 Nd7 Qe2 Nc7"),
      summary: "White declines and wins c4 back later. You get the same structure with level material, trade off the light bishops, and reroute the knight to c7 to support ...b5 again.",
    },
    {
      label: "White returns the pawn with 5.b6",
      sans: sans("d4 Nf6 c4 c5 d5 b5 cxb5 a6 b6 Qxb6 Nc3 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Nbd7"),
      summary: "The pawn comes back on b6 and the queen is well placed there. Material is level, your development is easy, and the a-pawn is ready to march to a5 and a4.",
    },
  ],

  middlegamePlan:
    "Finish the setup before you press: bishop on g7, king castled, knights on f6 and d7. " +
    "Then aim everything at the queenside: queen to a5 or b6, rook from f8 to b8, knight from d7 to b6 and on to c4 when it is safe. " +
    "The targets are a2, b2 and the knight on c3; White is tied to defending them and rarely gets to use the extra pawn. " +
    "Do not rush ...Nxe4 or a kingside attack: the whole point is that the pressure lasts, and it survives into any endgame, so trade pieces whenever White offers.",

  structureDiagram: {
    fen: "rn1qkb1r/4pp1p/3p1np1/2pP4/4P3/2N5/PP3PPP/R1BQ1KNR w kq - 0 9",
    orientation: "black",
    arrows: [
      { from: "a8", to: "a2" },
      { from: "f8", to: "b8" },
      { from: "g6", to: "g7" },
    ],
    caption: "The Benko picture: a pawn down, but the a- and b-files are open, the bishop is about to land on g7, and White's king has lost its castle.",
  },
};
