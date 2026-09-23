// Modern Benoni — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// You hand White the centre on purpose. In return you get a bishop on g7 that
// looks straight through d4, a rook on e8 leaning on e4, and three queenside
// pawns against two that roll forward with ...a6 and ...b5. Cramped for a few
// moves, then all the play is yours.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const benoni: OpeningSpec = {
  id: "benoni",
  name: "Benoni Defence",
  aliases: ["Modern Benoni"],
  eco: "A60–A79",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 Nf6 2.c4 c5 3.d5 e6",
  tabiyaFen: "rnbqkb1r/pp1p1ppp/4pn2/2pP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4",
  pitch:
    "Let White have the big centre and fight it with pieces: a bishop on g7, a rook on e8 and a queenside pawn majority that rolls with ...a6 and ...b5. " +
    "Nothing is symmetrical, nothing is dull, and your moves are the same against almost everything White tries.",

  setup: {
    pieces: [
      { piece: "B", squares: ["g7"], why: "The Benoni bishop. From g7 it looks at d4, c3 and b2, and it is the best defender your king will ever have." },
      { piece: "N", squares: ["f6"], why: "The king's knight watches e4 and d5 and is ready to jump to g4, h5 or e8 when the position asks." },
      { piece: "N", squares: ["d7", "a6", "c7"], why: "The queen's knight: d7 to eye e5 and c5, or the long road a6–c7 to support ...b5." },
      { piece: "R", squares: ["e8"], why: "The rook belongs on the half-open e-file, where it leans on e4 for the rest of the game." },
      { piece: "Q", squares: ["e7", "c7", "b6"], why: "The queen backs up the e-file from e7 or the queenside from c7 and b6." },
    ],
    pawns: ["c5", "d6", "g6"],
    order: [
      {
        before: "d6",
        after: "Bg7",
        why: "...d6 before the bishop lands on g7. With no pawn on d6, White plays e4–e5, your knight on f6 is kicked and the centre rolls forward while your king is still in the middle.",
      },
      {
        before: "a6",
        after: "b5",
        why: "...a6 before ...b5. Once your e-pawn has traded on d5 there is no pawn to guard b5, so an unprepared ...b5 is simply taken by Bxb5 or Nxb5.",
      },
    ],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "benoni-space-for-play",
      title: "Space for dynamite",
      oneLiner: "White gets the centre. You get the g7-bishop, the e-file and three queenside pawns against two.",
      why: "The Benoni is a deal, not a defence. After ...exd5 cxd5 White owns more of the board, but your structure gives you three fixed targets: the pawn on e4 (rook on e8), the dark squares around d4 (bishop on g7), and the queenside where your pawns outnumber White's. Cramped is fine as long as you know where the play is.",
    },
    {
      id: "benoni-d6-first",
      title: "...d6 before anything fancy",
      oneLiner: "The pawn on d6 stops e4–e5. Play it as soon as the centre is fixed.",
      why: "After 5.cxd5 White's dream is e4 and e5, kicking your knight and opening lines toward your king before it has castled. One pawn on d6 stops the dream cold. It also locks the chain c5–d6 that everything else leans on.",
      trigger: { kind: "epd", epds: [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5")] },
      response: "...d6.",
      ifIgnored: "e4 and e5 come with tempo, your knight runs, and White's pieces pour in behind the pawns.",
    },
    {
      id: "benoni-no-nxe4",
      title: "The e4-pawn is guarded",
      oneLiner: "While a knight sits on c3, ...Nxe4 loses your knight. Attack e4 with the rook, not the knight.",
      why: "It looks free and it is not. The knight on c3 recaptures and you are a piece down. Pressure e4 the right way: ...Re8 behind it, ...Bg4 to trade off the knight that defends it, and only then consider ...Nxe4 when a second attacker makes it work.",
      trigger: { kind: "opponent_piece_on", piece: "P", squares: ["e4"] },
      response: "...Re8 and ...Bg4 or ...a6. Count the defenders of e4 before your knight moves.",
      ifIgnored: "Nxe4 and the game is more or less over.",
    },
    {
      id: "benoni-b5-break",
      title: "The ...b5 break",
      oneLiner: "...a6 then ...b5: your three queenside pawns start rolling and White's pieces have to react.",
      why: "The queenside is where you outnumber White. ...a6 prepares it, ...b5 opens lines for the a8-rook and gains space for the c5-pawn to advance later. When White plays a4 to stop it, your knight uses the hole on b4 instead.",
      trigger: { kind: "opponent_san", sans: ["Nd2", "a4"] },
      response: "...a6 and ...b5 if a4 has not been played; ...Na6–c7 or ...Nbd7–b6 if it has.",
    },
    {
      id: "benoni-vs-f4",
      title: "Against f4: castle, then hit e4",
      oneLiner: "The Four Pawns look scary. Castle, ...Re8, and every pawn White pushed becomes a target.",
      why: "e4 and f4 together mean White has spent two moves on pawns and none on the king. Get castled, put the rook on e8 and the knight on a6 heading for c7, and watch for the moment e5 fails because e4 is loose. Never grab with the knight while c3 is guarded.",
      trigger: { kind: "opponent_san", sans: ["f4"] },
      response: "...Bg7, ...O-O, ...Re8, then ...Na6–c7.",
    },
    {
      id: "benoni-vs-bb5",
      title: "Against Bb5+: block with a knight",
      oneLiner: "Bb5+ is a nuisance check. ...Nbd7 or ...Nfd7 blocks and the bishop is soon kicked by ...a6.",
      why: "White checks to gain a tempo and stop your knight going to d7 freely. Block with a knight, not the bishop: you want the c8-bishop free for ...Bg4 later, and after ...a6 White's bishop has to move again anyway.",
      trigger: { kind: "opponent_san", sans: ["Bb5+"] },
      response: "...Nbd7 (or ...Nfd7 if f4 is on the board).",
    },
    {
      id: "benoni-book-end",
      title: "When the book runs out",
      oneLiner: "Rook to e8, knight via a6 to c7 or d7 to b6, pawns ...a6 and ...b5. Pressure e4 and roll the queenside.",
      why: "Two plans and you pick by what White does. If e4 is on the board, everything points at it: ...Re8, ...Bg4 to remove a defender, ...Qe7. If White fianchettoes and skips e4, go queenside: ...a6, ...Rb8, ...b5. Keep the g7-bishop and never trade it for a knight.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5 and ...e6 — the Benoni.", why: "The main move." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5. If d4 comes you are in your opening; if not, it is an English and you are fine.", why: "Your first two moves do not change." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5 — if d4 and d5 you can still play ...e6.", why: "Flexible." },
        { san: "e4", verdict: "good", answer: "c5", howToAnswer: "...c5 — the Sicilian. Same c5-pawn, same fighting spirit.", why: "No Benoni against 1.e4, but ...c5 gives you a similar counterpunching game." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c5 and ...d5 or ...g6.", why: "Quiet." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — the knight blocks White's own c-pawn, so take the centre.", why: "No c4 means no Benoni, and no reason to hold back." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...c5, ...d5 — take the centre.", why: "Passive." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...c5.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...c5 — f4 has loosened their king.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...c5.", why: "Timid." },
      ],
    },
    [P("d4")]: { yourMove: { san: "Nf6", why: "Develop and keep every option. The knight is on f6 in every line." } },
    [P("d4 Nf6")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "c5", howToAnswer: "...c5 — invite d5, then ...e6.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "c5", howToAnswer: "...c5. After d5, ...e6 or ...g6 gives a Benoni-style game; after c4 you are in the main line.", why: "Flexible. The c5 strike still works." },
        { san: "Bf4", verdict: "good", answer: "c5", howToAnswer: "...c5 — hit d4. After d5, ...Qb6 hits b2, which the bishop no longer guards.", why: "The London. ...c5 is the sharpest reply." },
        { san: "Bg5", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — if d5, ...Ne4 hits the bishop; if dxc5, ...Qa5+ regains it.", why: "The Trompowsky." },
        { san: "e3", verdict: "dubious", answer: "c5", howToAnswer: "...c5, then ...d5 — comfortable.", why: "Passive." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — no c4 is coming, so take the centre.", why: "Blocks White's own c-pawn." },
        { san: "g3", verdict: "good", answer: "c5", howToAnswer: "...c5, and after d5, ...e6 or ...g6.", why: "Fianchetto." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4")]: { yourMove: { san: "c5", why: "Hit d4 and invite d5. A pawn on d5 is what gives you the e-file and the queenside majority." } },
    [P("d4 Nf6 c4 c5")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "e6", howToAnswer: "...e6 — challenge the pawn at once.", why: "The main move. White takes space and you start undermining it." },
        { san: "Nf3", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 Nxd4, then ...e6 or ...g6 — an easy Symmetrical English.", why: "Declines the fight." },
        { san: "Nc3", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nc6 — the queen has to move again.", why: "Allows a trade that costs White time." },
        { san: "e3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 exd4 d5 — level centre, free development.", why: "Solid but passive." },
        { san: "dxc5", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...Bxc5 — the pawn comes straight back.", why: "Gives up the centre for a pawn you regain at once." },
        { san: "g3", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nc6 — develop with a threat.", why: "Ignores d4." },
        { san: "Bg5", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nc6 — and ...Qa5+ is in the air.", why: "Develops while the centre falls." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5")]: {
      yourMove: { san: "e6", why: "The Modern Benoni. You ask the d5-pawn a question at once and open the e-file for your rook." },
      mistakes: [{ san: "Nxd5", why: "The pawn on c4 guards d5. cxd5 and you have lost a knight for a pawn." }],
    },
    [P("d4 Nf6 c4 c5 d5 e6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "exd5", howToAnswer: "...exd5, then ...d6 after cxd5.", why: "The main line. White supports d5 before you trade." },
        { san: "Nf3", verdict: "good", answer: "exd5", howToAnswer: "...exd5 cxd5 d6 — the same structure.", why: "Develops first; the structure is identical." },
        { san: "e4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — no knight on c3 guards it. If Bd3 kicks you, ...Nf6 and trade on d5.", why: "Hangs a pawn: c3 is empty." },
        { san: "dxe6", verdict: "dubious", answer: "fxe6", howToAnswer: "...fxe6 — you get a full centre with ...d5 next and the half-open f-file.", why: "Gives up the wedge and hands you the centre." },
        { san: "g3", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 d6 — then ...g6 and ...Bg7 as always.", why: "Fianchetto. The same plan works." },
        { san: "e3", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 d6 — normal.", why: "Solid but blocks the c1-bishop." },
        { san: "Bg5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5, then ...h6 to ask the bishop where it is going.", why: "Develops to a square where ...h6 gains time." },
        { san: "Nd2", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 d6 — normal, and the knight on d2 blocks White's bishop.", why: "Passive." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3")]: {
      yourMove: { san: "exd5", why: "Trade now, while White can only take back with the c-pawn. This fixes the structure you want: d5 for White, c5 and d6 for you, and the e-file half open." },
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5")]: {
      replies: [
        { san: "cxd5", verdict: "good", answer: "d6", howToAnswer: "...d6 — the Benoni pawn chain. Never skip this move.", why: "The main line and the only natural recapture." },
        { san: "Nxd5", verdict: "dubious", answer: "Nxd5", howToAnswer: "...Nxd5 — trade; after cxd5 or Qxd5 you play ...d6 or ...Nc6 with an easy game.", why: "Trades White's best-placed knight." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4! After Nxe4 Nxe4 you are a knight up, and if Qe2, ...Qe7 blocks the e-file.", why: "Hangs the pawn and then the knight: e4 has no support." },
        { san: "Qxd5", verdict: "bad", answer: "Nxd5", howToAnswer: "...Nxd5 — the queen.", why: "Puts the queen on a square your knight attacks." },
        { san: "Nf3", verdict: "good", answer: "d6", howToAnswer: "...d6 — cxd5 comes next and you are in the main line.", why: "Develops first." },
        { san: "e3", verdict: "dubious", answer: "dxc4", howToAnswer: "...dxc4 Bxc4 d5 — kick the bishop and own the centre.", why: "Lets you keep the pawn a while and gain the centre." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — if Bxf6 Qxf6 you have the bishop pair; then ...d6 after cxd5.", why: "A pin that ...h6 dissolves with tempo." },
        { san: "g3", verdict: "good", answer: "d6", howToAnswer: "...d6, then cxd5 g6 — the Fianchetto Benoni.", why: "Fianchetto line." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5")]: {
      yourMove: { san: "d6", why: "The most important pawn move in the opening. It stops e4–e5 for good and completes the c5–d6 chain that your whole setup leans on." },
      mistakes: [{ san: "Nxd5", why: "Guarded by the knight on c3 and the queen. You lose a knight for a pawn." }],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "g6", howToAnswer: "...g6, then ...Bg7 and castle.", why: "The main line. White takes the centre; you target it." },
        { san: "Nf3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, ...O-O — if g3 follows it is the Fianchetto line.", why: "Develops before committing the e-pawn." },
        { san: "g3", verdict: "good", answer: "g6", howToAnswer: "...g6, ...Bg7, castle, then ...a6 and ...b5.", why: "Fianchetto. No e4 to target, so go queenside." },
        { san: "e3", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7, castle — normal.", why: "Slow: the bishop wants e4 to be in first." },
        { san: "f4", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7, castle, ...Re8 — every pawn White pushed is a target.", why: "Grabs space at the cost of development." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — ask the bishop. Bxf6 Qxf6 is fine; Bh4 and you play ...g6 anyway.", why: "A pin that costs White time." },
        { san: "Bf4", verdict: "dubious", answer: "g6", howToAnswer: "...g6 — d6 is guarded by the queen, so Bxd6 loses a bishop for a pawn.", why: "Aims at d6 without a real threat." },
        { san: "Qa4+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block and develop; the queen has to move again.", why: "An early queen check that gains nothing." },
        { san: "Nb5", verdict: "dubious", answer: "Qa5+", howToAnswer: "...Qa5+! Only Nc3 back saves the knight; anything else and ...Qxb5 takes it.", why: "Jumps to a square with no support." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4")]: {
      yourMove: { san: "g6", why: "Fianchetto. The bishop on g7 is your best piece and your king's best guard." },
      mistakes: [{ san: "Nxe4", why: "The knight on c3 guards e4. Nxe4 loses a knight for a pawn." }],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, then castle.", why: "The main line." },
        { san: "f4", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7. If Bb5+, ...Nfd7; otherwise castle and ...Re8.", why: "The Four Pawns Attack: scary-looking and slow." },
        { san: "Be2", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, castle, ...Re8.", why: "Quiet development." },
        { san: "Bd3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, castle, then ...a6 and ...Nbd7 heading for e5.", why: "The bishop guards e4 in advance." },
        { san: "Bg5", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — castle next; Bxf6 Bxf6 gives you the bishop pair.", why: "Pins nothing that matters." },
        { san: "h3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, castle, ...a6 — a free move for you.", why: "A pawn move with pieces at home." },
        { san: "Bb5+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — block with the knight; ...a6 kicks the bishop later.", why: "A check that gains little." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — block and develop; the queen moves again.", why: "Early queen." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3")]: {
      yourMove: { san: "Bg7", why: "The Benoni bishop. Castle next, then the rook goes to e8." },
      mistakes: [{ san: "Nxe4", why: "Still guarded by the knight on c3. A knight for a pawn." }],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7")]: {
      replies: [
        { san: "Be2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Re8.", why: "The classical main line." },
        { san: "Bd3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...a6 and ...Nbd7.", why: "Guards e4 with the bishop." },
        { san: "h3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Re8 or ...a6.", why: "Stops ...Bg4 in advance: a real main line." },
        { san: "Bb5+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then castle and ...a6.", why: "A check that your knight was going to answer anyway." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — Bxf6 Bxf6 is welcome; Bh4 and you castle.", why: "A pin worth asking about." },
        { san: "Bf4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — d6 is guarded by the queen; then ...Bg4.", why: "Aims at d6 with no real threat." },
        { san: "Qa4+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block; the queen is chased again.", why: "Early queen." },
        { san: "Nd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...Na6 and ...Nc7.", why: "Reroutes a knight before castling." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2")]: {
      yourMove: { san: "O-O", why: "King safe, rook ready for e8. Now the pressure on e4 starts." },
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Re8", howToAnswer: "...Re8 — the rook leans on e4.", why: "The main line." },
        { san: "h3", verdict: "good", answer: "Re8", howToAnswer: "...Re8, then ...a6 and ...Nbd7.", why: "Stops ...Bg4." },
        { san: "Nd2", verdict: "good", answer: "Re8", howToAnswer: "...Re8, then ...Na6 and ...Nc7.", why: "Defends e4 in advance." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — Bxf6 Bxf6 is fine; then ...Re8.", why: "A pin to ask about." },
        { san: "Bf4", verdict: "dubious", answer: "a6", howToAnswer: "...a6 — then ...b5 with tempo. d6 is guarded by the queen.", why: "The bishop leaves e4 with fewer defenders." },
        { san: "Qc2", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8, then ...Bg4 to trade off a defender of e4.", why: "Early queen." },
        { san: "a4", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8, then ...Na6 heading for b4.", why: "Stops ...b5 but gives your knight b4." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5, then after Nxe5 play ...Nbd7 — the d5-pawn is isolated and your bishop looks at e5.", why: "Breaks too early; the d5-pawn is left alone." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O")]: {
      yourMove: { san: "Re8", why: "The rook on the half-open file. Every plan White has now has to account for the pawn on e4 being watched." },
      mistakes: [
        { san: "Nxe4", why: "The knight on c3 recaptures. A knight for a pawn." },
        { san: "Nxd5", why: "Guarded by knight and queen. Nxd5 loses your knight." },
        { san: "b5", why: "Not yet: nothing guards b5 and Bxb5 simply takes it. ...a6 first." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Re8")]: {
      replies: [
        { san: "Nd2", verdict: "good", answer: "a6", howToAnswer: "...a6 — prepare ...b5; after a4 play ...Nbd7 and ...Nb6.", why: "The main line: the knight reroutes to c4 and covers e4." },
        { san: "Qc2", verdict: "good", answer: "a6", howToAnswer: "...a6, then ...b5 or ...Bg4 to remove a defender of e4.", why: "Defends e4 with the queen." },
        { san: "h3", verdict: "good", answer: "a6", howToAnswer: "...a6, then ...b5 and ...Nbd7.", why: "Stops ...Bg4." },
        { san: "Bf4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4! Now it works: Nxe4 Rxe4 and you are a pawn up with the rook hitting e2.", why: "The bishop left, and e4 has only one defender against your two attackers." },
        { san: "Re1", verdict: "dubious", answer: "a6", howToAnswer: "...a6, then ...b5 — White's rook defends e4 passively.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — Bxf6 Bxf6 gives you the better bishop.", why: "A pin to ask about." },
        { san: "a4", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Nb6 or ...Ne5 — b4 is a hole for your knight later.", why: "Stops ...b5 but weakens b4." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Re8 Nd2")]: {
      yourMove: { san: "a6", why: "Prepare ...b5. With the knight gone from f3, e4 is covered again, so switch to the queenside where you have three pawns against two." },
      mistakes: [{ san: "b5", why: "Bxb5 takes it for free. Nothing guards b5 until the a-pawn is on a6." }],
    },

    // --- 6.Nf3 and 7.g3: the Fianchetto Variation --------------------------------
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3")]: {
      yourMove: { san: "g6", why: "The same fianchetto. Whether e4 or g3 comes next, the bishop belongs on g7." },
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 — back in the main line.", why: "Transposes to the classical Benoni." },
        { san: "g3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, castle, then ...a6, ...Nbd7 and ...b5.", why: "The Fianchetto Variation: no e4 to target, so the play is on the queenside." },
        { san: "Bg5", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — castle next; Bxf6 Bxf6 is welcome.", why: "Pins nothing important." },
        { san: "Bf4", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — d6 is guarded by the queen; castle and ...Bg4.", why: "Aims at d6 without a threat." },
        { san: "e3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, castle, ...Na6 and ...Nc7.", why: "Slow." },
        { san: "h3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 and castle — a free move.", why: "A pawn move before development." },
        { san: "Qa4+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block; then ...Bg7 after the queen moves.", why: "An early check that gains nothing." },
        { san: "Nd2", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, castle, ...Nbd7.", why: "Reroutes early." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3")]: {
      yourMove: { san: "Bg7", why: "Fianchetto against fianchetto. Their bishop guards d5; yours guards your king and eyes d4 and b2." },
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7")]: {
      replies: [
        { san: "Bg2", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...a6.", why: "The main line." },
        { san: "Bh3", verdict: "bad", answer: "Bxh3", howToAnswer: "...Bxh3 — a whole bishop. Nothing on h3 is defended.", why: "The bishop steps onto a square your c8-bishop attacks, with no defender." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...h6 to ask the bishop.", why: "A pin worth little." },
        { san: "Nd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, ...Na6 and ...Nc7 — normal.", why: "Reroutes before castling." },
        { san: "e4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...Re8 as in the main line.", why: "Mixes plans: g3 and e4 together leave the bishop nowhere good." },
        { san: "Qa4+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — the queen is chased next move.", why: "An early check." },
        { san: "h4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — then ...Re8 and ...Bg4; a pawn storm with the king at home rarely works.", why: "Attacks before developing." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2")]: {
      yourMove: { san: "O-O", why: "Castle first, then the queenside plan: ...a6, ...Nbd7, ...b5." },
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2 O-O")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "a6", howToAnswer: "...a6 — then ...b5. With no e4 to target, the queenside is the whole plan.", why: "The main line." },
        { san: "Nd2", verdict: "good", answer: "a6", howToAnswer: "...a6, then ...Nbd7 and ...b5.", why: "Heads for c4." },
        { san: "Bf4", verdict: "dubious", answer: "a6", howToAnswer: "...a6 — d6 is guarded by the queen; ...b5 next.", why: "Points at d6 with no threat." },
        { san: "h3", verdict: "dubious", answer: "a6", howToAnswer: "...a6 and ...b5.", why: "Slow." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — the bishop retreats or trades.", why: "A pin to ask about." },
        { san: "Qc2", verdict: "dubious", answer: "a6", howToAnswer: "...a6, then ...b5 and ...Bf5 hitting the queen.", why: "Early queen." },
        { san: "e4", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8 — with e4 on the board the rook goes to work on it.", why: "Changes plans; your rook punishes it." },
        { san: "a4", verdict: "dubious", answer: "Na6", howToAnswer: "...Na6 — the knight heads for b4, the hole a4 just made.", why: "Stops ...b5 but gives your knight b4." },
      ],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2 O-O O-O")]: {
      yourMove: { san: "a6", why: "The queenside plan begins. ...b5 next, then ...Nbd7 and ...Rb8 behind it." },
      mistakes: [{ san: "b5", why: "Nxb5 takes it. Nothing guards b5 until ...a6." }],
    },
    [P("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2 O-O O-O a6")]: {
      replies: [
        { san: "a4", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Rb8 and ...Nb6 — b4 is now a hole for your pieces.", why: "The main line: White stops ...b5 and pays with the b4-square." },
        { san: "e4", verdict: "good", answer: "Re8", howToAnswer: "...Re8 — with e4 on the board, the rook leans on it.", why: "Switches to the centre; your rook answers." },
        { san: "Nd2", verdict: "good", answer: "b5", howToAnswer: "...b5 — the break, with the a-pawn behind it.", why: "Reroutes to c4, but ...b5 is already in." },
        { san: "Bf4", verdict: "dubious", answer: "b5", howToAnswer: "...b5 — d6 is guarded by the queen, so Bxd6 loses a piece.", why: "Aims at d6 with no real threat." },
        { san: "Re1", verdict: "dubious", answer: "b5", howToAnswer: "...b5, then ...Nbd7 and ...Rb8.", why: "Normal, and slow." },
        { san: "h3", verdict: "dubious", answer: "b5", howToAnswer: "...b5 — a free move for you.", why: "A pawn move without a purpose." },
        { san: "Qc2", verdict: "dubious", answer: "b5", howToAnswer: "...b5, then ...Nbd7 — and ...Bf5 will hit the queen.", why: "Early queen." },
      ],
    },
  },

  traps: [
    {
      name: "The e4-pawn is guarded",
      sans: sans("1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5 5.cxd5 d6 6.e4 Nxe4 7.Nxe4"),
      punisher: "white",
      tell: "White pushes e4 and your knight on f6 sees a pawn it has been trained to grab in other openings.",
      why: "The knight on c3 recaptures and you are a knight down for a pawn. The Benoni attacks e4 with the rook from e8 and the bishop from g4, never with the knight while c3 is guarded. Play ...g6 instead.",
    },
    {
      name: "e4 without support",
      sans: sans("1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5 5.e4 dxe4 6.Nxe4 Nxe4"),
      punisher: "black",
      tell: "White skips cxd5 and pushes e4 while your pawn is still on d5.",
      why: "Your d5-pawn takes e4, White's knight takes back, and your knight takes the knight. Nothing recaptures: the pawn on e4 had only the c3-knight behind it. If White tries Qe2 to pin the knight against your king, ...Qe7 blocks the file and you stay a piece up.",
    },
    {
      name: "...b5 before ...a6",
      sans: sans("1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5 5.cxd5 d6 6.e4 g6 7.Nf3 Bg7 8.Be2 O-O 9.O-O b5 10.Bxb5"),
      punisher: "white",
      tell: "You know ...b5 is the plan and you are itching to play it as soon as you have castled.",
      why: "Once your e-pawn has traded on d5 there is no pawn to defend b5. Bxb5 takes it for nothing and the queenside plan is dead. Play ...a6 first; then ...b5 is supported and the break gains space instead of losing a pawn.",
    },
  ],

  modelGames: [
    {
      label: "Classical main line",
      sans: sans("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Re8 Nd2 a6 a4 Nbd7"),
      summary: "The whole plan: trade on d5, ...d6 to stop e5, fianchetto, castle, rook to e8 hitting e4, then ...a6 and the knight to d7 heading for b6 and c4.",
    },
    {
      label: "Fianchetto Variation",
      sans: sans("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 Nf3 g6 g3 Bg7 Bg2 O-O O-O a6 a4 Nbd7 Nd2 Rb8"),
      summary: "White skips e4 and fianchettoes. With no centre pawn to target, everything goes queenside: ...a6, ...Nbd7, ...Rb8, and the b4-square left behind by a4.",
    },
    {
      label: "Four Pawns Attack",
      sans: sans("d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 f4 Bg7 Nf3 O-O Be2 Re8 Nd2 Na6 O-O Nc7"),
      summary: "White pushes four pawns and develops nothing. You castle, put the rook on e8 against e4, and bring the knight round to c7 to support ...b5 while the loose pawns wait to be attacked.",
    },
  ],

  middlegamePlan:
    "Two plans, and White's setup tells you which. If e4 is on the board, aim at it: rook on e8, ...Bg4 to remove the knight that defends it, ...Qe7 behind the rook, and the knight to d7 or a6–c7. " +
    "If White fianchettoes and skips e4, roll the queenside: ...a6, ...Rb8, ...b5, and use b4 for a knight whenever a4 has been played. " +
    "Never trade the g7-bishop for a knight; it guards your king and pins down d4 and b2 for the whole game. " +
    "White's only real threat is e4–e5 with support, so keep the d6-pawn firm and ...Re8 ready, and take on e5 only when Nxe5 does not fork anything.",

  structureDiagram: {
    fen: "rnbqk2r/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 2 8",
    orientation: "black",
    arrows: [
      { from: "b7", to: "b5" },
      { from: "g7", to: "c3" },
      { from: "e8", to: "e4" },
    ],
    caption: "The Benoni picture: White owns the centre, you own the long diagonal, the half-open e-file and a queenside majority ready to roll with ...b5.",
  },
};
