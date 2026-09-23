// Bogo-Indian Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// One check on move three does the work. ...Bb4+ makes White block with a piece
// that would rather be somewhere else, then the bishop trades itself off and
// you are left with an easy position: knights out, king castled, ...d6 and
// ...e5 when the moment comes. There is almost nothing to memorise.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const bogoIndian: OpeningSpec = {
  id: "bogo-indian",
  name: "Bogo-Indian Defence",
  aliases: ["Bogo Indian"],
  eco: "E11",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+",
  tabiyaFen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4",
  pitch:
    "Check on move three, trade the bishop, castle, and play ...d6 and ...e5: a solid Black opening with almost nothing to memorise. " +
    "White gets a little space and you get a position where every natural move is fine and the traps all point their way.",

  setup: {
    pieces: [
      { piece: "B", squares: ["b4"], why: "The Bogo bishop. It checks on b4, makes White block with a piece, then trades itself on d2 or c3 so nothing of yours is left hanging." },
      { piece: "N", squares: ["f6"], why: "The king's knight: it guards your king and later jumps to e4 to hit c3 when the moment comes." },
      { piece: "N", squares: ["c6", "d7"], why: "The queen's knight supports the ...e5 break, from c6 in the main line or d7 when the bishop has already been traded." },
      { piece: "Q", squares: ["e7"], why: "The queen on e7 guards the b4-bishop and backs up ...e5. It is the most important square in the opening." },
      { piece: "R", squares: ["e8"], why: "Once ...e5 is in, the rook belongs behind it on e8." },
    ],
    pawns: ["e6", "d6"],
    order: [
      {
        before: "Bxd2+|Bxc3",
        after: "e5",
        why: "Trade the bishop before you play ...e5. While the bishop still sits on b4, the queen on e7 is its only guard, so after ...e5 dxe5 you cannot recapture with the queen without dropping the bishop to Bxb4.",
      },
      {
        before: "d6",
        after: "e5",
        why: "...d6 first, then ...e5. Without a pawn on d6 the e5-pawn is defended by at most a knight, and dxe5 simply wins it or drags your pieces to awkward squares.",
      },
    ],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "bogo-check-is-a-question",
      title: "The check is a question, not an attack",
      oneLiner: "...Bb4+ asks White to block with a piece. Whatever blocks is a little worse off.",
      why: "Bd2 puts a bishop on a square where it only waits to be traded. Nbd2 puts a knight where it blocks the c1-bishop. Nc3 turns the game into a Nimzo-Indian. None of it wins anything, but every answer costs White a small piece of comfort, and you develop with tempo.",
    },
    {
      id: "bogo-guard-the-bishop",
      title: "After Bd2, guard the bishop first",
      oneLiner: "Bd2 attacks b4. ...Qe7 defends it and prepares ...e5. Never castle here.",
      why: "The bishop on b4 has no defender once Bd2 lands, and a careless ...O-O or ...d5 loses it to Bxb4 on the spot. ...Qe7 solves it: the queen guards b4, eyes e5, and will recapture on d2 later if needed.",
      trigger: { kind: "opponent_san", sans: ["Bd2"] },
      response: "...Qe7 (or ...a5, or ...Bxd2+ if you prefer to simplify).",
      ifIgnored: "Bxb4 and you are a bishop down on move five.",
    },
    {
      id: "bogo-trade-when-asked",
      title: "Trade on d2 when a3 asks",
      oneLiner: "a3 puts the question. Take on d2; retreating costs a move and keeps a target on the board.",
      why: "The bishop has done its job by making White block. When a3 comes, ...Bxd2+ trades it for whatever blocked and leaves you with a tidy position. Retreating to e7 or a5 loses time and the bishop can be hit again.",
      trigger: { kind: "opponent_san", sans: ["a3"] },
      response: "...Bxd2+.",
    },
    {
      id: "bogo-e5-break",
      title: "The ...e5 break",
      oneLiner: "With ...d6 in and the bishop traded, ...e5 frees your whole position.",
      why: "The pawn on e5 gives your knights squares, opens the e-file for the rook and stops White's centre from expanding. If d5 comes, the knight steps back to b8 and returns via d7 or a6; if dxe5 dxe5, the position is level and simple.",
      trigger: {
        kind: "epd",
        epds: [
          P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6 O-O O-O e4"),
          P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6 e3 Nbd7 Bd3"),
        ],
      },
      response: "...e5.",
    },
    {
      id: "bogo-vs-nc3",
      title: "Against Nc3: you are in a Nimzo-Indian",
      oneLiner: "The knight on c3 can be taken. ...Bxc3 and then ...Ne4 hits whatever recaptured.",
      why: "When White blocks or follows up with Nc3, the bishop has a knight to bite on. Trading on c3 and jumping ...Ne4 gains time against the piece on c3, and if a pawn ever recaptures, White has doubled pawns to look after. Castle and play ...d6 and ...e5 as usual afterwards.",
      trigger: { kind: "opponent_san", sans: ["Nc3"] },
      response: "...Bxc3, then ...Ne4 against a bishop on c3, or ...O-O and ...d5 if a pawn recaptured.",
    },
    {
      id: "bogo-dont-rush-e5",
      title: "Do not rush ...e5",
      oneLiner: "...e5 with the bishop still on b4 loses a pawn: dxe5 and ...Qxe5 drops the bishop.",
      why: "The queen on e7 is doing two jobs, guarding b4 and eyeing e5. It cannot do both after dxe5. Trade the bishop first, put a pawn on d6, and then ...e5 is properly supported.",
      trigger: { kind: "tag", tags: ["hangs_pawn"] },
      response: "...Bxd2+ and ...d6 before ...e5.",
    },
    {
      id: "bogo-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, ...d6, ...e5, rook to e8. Then knights to e4 or c5 and let White come to you.",
      why: "The Bogo gives you a sound position rather than a target. After ...e5 you keep the tension: a rook on e8, a knight ready for e4 or c5, ...a5 to stop b4, and ...h6 to stop Bg5. Trade when it is equal and let White overreach.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...Bb4+ when Nf3 arrives.", why: "The main move." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6. If d4 follows you are in the Bogo.", why: "The English. Your setup transfers when d4 comes." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...Bb4+ once c4 and d4 are in.", why: "Flexible; your first moves do not change." },
        { san: "e4", verdict: "good", answer: "e6", howToAnswer: "...e6 — the French. Your pawn goes to e6 in every line anyway.", why: "No Bogo against 1.e4, but ...e6 keeps the same solid feel." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 or ...Bb4+ if the chance comes.", why: "Quiet." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — the knight blocks White's own c-pawn; take the centre.", why: "No c4 means no Bogo, and no reason to hold back." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 — comfortable.", why: "Passive." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...e6 — f4 has loosened their king.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...e6.", why: "Timid." },
      ],
    },
    [P("d4")]: { yourMove: { san: "Nf6", why: "Develop first and keep every option open." } },
    [P("d4 Nf6")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6 — the bishop's diagonal opens toward b4.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Bb4+ if c4 comes, or ...d5 and ...Be7.", why: "Flexible." },
        { san: "Bf4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...c5 and ...d5 — a normal game against the London.", why: "The London. Solid development is all you need." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — then ...h6 to ask the bishop, and ...c5.", why: "The Trompowsky." },
        { san: "e3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...d5, ...c5.", why: "Passive." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — no c4 is coming, so take the centre.", why: "Blocks White's own c-pawn." },
        { san: "g3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...d5 or ...c5.", why: "Fianchetto." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4")]: { yourMove: { san: "e6", why: "Open the diagonal for the bishop. Now ...Bb4 is ready the moment White's knight comes to f3 or c3." } },
    [P("d4 Nf6 c4 e6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Bb4+", howToAnswer: "...Bb4+ — the Bogo-Indian.", why: "The main move, and the one your opening is named for." },
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — the Nimzo-Indian: same bishop, same square, no check.", why: "The other main move. Pin the knight and play ...O-O, ...d5 or ...c5." },
        { san: "g3", verdict: "good", answer: "Bb4+", howToAnswer: "...Bb4+ — Bd2 is forced-looking, and you trade or play ...d5.", why: "The Catalan. The check still works." },
        { san: "e3", verdict: "dubious", answer: "Bb4+", howToAnswer: "...Bb4+ — after Bd2 or Nc3 you develop normally with ...d5 and ...O-O.", why: "Blocks the c1-bishop." },
        { san: "Bg5", verdict: "dubious", answer: "Bb4+", howToAnswer: "...Bb4+ — Bd2 must come back to block, undoing the move.", why: "The bishop has to return to block the check." },
        { san: "Bf4", verdict: "dubious", answer: "Bb4+", howToAnswer: "...Bb4+ — Bd2 undoes their development.", why: "Same problem: the bishop has to come back." },
        { san: "Nd2", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — no check available, so take the centre.", why: "Blocks the c1-bishop to avoid a check." },
        { san: "a3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — White spent a whole move stopping a check.", why: "A tempo for you." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — free pawn.", why: "Hangs e4." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3")]: {
      yourMove: { san: "Bb4+", why: "The Bogo check. White must block with a piece, and whichever piece it is would rather be somewhere else." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+")]: {
      replies: [
        { san: "Bd2", verdict: "good", answer: "Qe7", howToAnswer: "...Qe7 — guard the bishop and prepare ...e5.", why: "The main line. The bishop on d2 attacks yours, so deal with that first." },
        { san: "Nbd2", verdict: "good", answer: "O-O", howToAnswer: "...O-O — the bishop is not attacked, so castle; after a3, trade on d2.", why: "Keeps the bishop pair for White, at the cost of blocking the c1-bishop." },
        { san: "Nc3", verdict: "good", answer: "O-O", howToAnswer: "...O-O — you are in a Nimzo-Indian; ...d5 or ...c5 next, and take on c3 when a3 asks.", why: "Transposes to the Nimzo." },
        { san: "Qd2", verdict: "bad", answer: "Bxd2+", howToAnswer: "...Bxd2+ — the queen, for a bishop.", why: "Blocks with the queen on a square your bishop attacks." },
        { san: "Nfd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...d5 — White has undeveloped a knight for you.", why: "Moves a developed piece backwards." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2")]: {
      yourMove: { san: "Qe7", why: "The bishop on b4 is attacked and has no defender. ...Qe7 guards it, backs up ...e5 and keeps the option of recapturing on d2 with the queen." },
      mistakes: [
        { san: "O-O", why: "Bxb4 wins the bishop. Nothing guards it." },
        { san: "d5", why: "Bxb4 wins the bishop. Guard it or trade it first." },
        { san: "b6", why: "Bxb4 again. Every move here has to deal with the attacked bishop." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7")]: {
      replies: [
        { san: "g3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — support ...e5. If d5 comes, ...exd5 cxd5 Nxd5 wins a pawn, since Bxb4 is met by ...Qxb4+.", why: "The main line: White fianchettoes." },
        { san: "Nc3", verdict: "good", answer: "Bxc3", howToAnswer: "...Bxc3 Bxc3 Ne4 — hit the bishop and gain time.", why: "Gives your bishop a knight to take." },
        { san: "e3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — then ...Bxd2+ and ...d6, ...e5.", why: "Solid development." },
        { san: "a3", verdict: "dubious", answer: "Bxd2+", howToAnswer: "...Bxd2+ — trade; then ...O-O and ...d6.", why: "Asks the question a move early." },
        { san: "Bxb4", verdict: "dubious", answer: "Qxb4+", howToAnswer: "...Qxb4+ — check, then ...O-O and ...d5 or ...b6 with an active queen.", why: "Trades the bishop and gives you a check." },
        { san: "Qc2", verdict: "dubious", answer: "Bxd2+", howToAnswer: "...Bxd2+ Nbxd2 d6 — then ...e5.", why: "An early queen move." },
        { san: "Qb3", verdict: "dubious", answer: "Bxd2+", howToAnswer: "...Bxd2+ — two attackers on b4, so trade before it falls.", why: "Hits b4 twice; you trade and are fine." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 — then cxd5 Nxd5: the pawn falls because Bxb4 is met by ...Qxb4+.", why: "Pushes too soon and drops a pawn." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3")]: {
      yourMove: { san: "Nc6", why: "The knight supports ...e5, and it will hop to e5 itself if White pushes d5." },
      mistakes: [{ san: "e5", why: "Too soon. dxe5 and you cannot take back with the queen because Bxb4 follows: the queen was the bishop's only guard. You lose a pawn." }],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6")]: {
      replies: [
        { san: "Bg2", verdict: "good", answer: "Bxd2+", howToAnswer: "...Bxd2+ — trade the bishop before it becomes a target.", why: "The main line." },
        { san: "Nc3", verdict: "good", answer: "Bxc3", howToAnswer: "...Bxc3 Bxc3 Ne4 — hit the bishop; after Rc1, ...O-O and ...d6.", why: "Gives you a knight to take." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Nxd5 — the pawn falls; Bxb4 is answered by ...Qxb4+.", why: "Pushes before the bishop question is settled." },
        { san: "a3", verdict: "dubious", answer: "Bxd2+", howToAnswer: "...Bxd2+ Qxd2 d6 — then ...O-O and ...e5.", why: "Asks the question; you trade." },
        { san: "e3", verdict: "dubious", answer: "Bxd2+", howToAnswer: "...Bxd2+ — with g3 and e3 both played, White's bishop has no good square.", why: "Mixes plans." },
        { san: "Qc2", verdict: "dubious", answer: "Bxd2+", howToAnswer: "...Bxd2+ Nbxd2 d6.", why: "Early queen." },
        { san: "Qb3", verdict: "dubious", answer: "Bxd2+", howToAnswer: "...Bxd2+ — b4 is attacked twice, so trade at once.", why: "Two attackers on b4." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2")]: {
      yourMove: { san: "Bxd2+", why: "The bishop has done its job. Trade it before a3 forces the same thing with a tempo lost, and before ...e5 becomes awkward." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+")]: {
      replies: [
        { san: "Nbxd2", verdict: "good", answer: "d6", howToAnswer: "...d6 — prepare ...e5; castle next.", why: "The main line: the knight recaptures and White castles next." },
        { san: "Qxd2", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...O-O and ...e5.", why: "Fine for White; the plan does not change." },
        { san: "Nfxd2", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — the knight that guarded e5 just left; after dxe5 Nxe5 you are comfortable.", why: "Takes with the wrong knight." },
        { san: "Kxd2", verdict: "bad", answer: "Ne4+", howToAnswer: "...Ne4+ — check, and White's king has lost castling for good.", why: "Walks the king into the centre." },
        { san: "Kf1", verdict: "bad", answer: "Bb4", howToAnswer: "...Bb4 — save the bishop; White has lost castling and gained nothing.", why: "Ignores the check by moving the king." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2")]: {
      yourMove: { san: "d6", why: "The support for ...e5. Castle next, then break." },
      mistakes: [{ san: "Nxd4", why: "d4 is guarded by the knight and the queen. Nxd4 loses your knight for a pawn." }],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — then ...e5.", why: "The main line." },
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — if d5, ...Nb8 and back via d7.", why: "Takes the centre; you strike back at once." },
        { san: "e3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...e5.", why: "Passive." },
        { san: "Qc2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...e5.", why: "Early queen." },
        { san: "d5", verdict: "dubious", answer: "Nb8", howToAnswer: "...Nb8 — back for now; ...e5 and ...Nbd7 follow.", why: "Kicks the knight but closes the centre for you." },
        { san: "b4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — then ...e5. Their pawns are far from their king.", why: "Grabs space while the king is still at home." },
        { san: "Rc1", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O and ...e5.", why: "Rook before castling." },
        { san: "a3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — a free move.", why: "A pawn move that stops nothing now." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6 O-O")]: {
      yourMove: { san: "O-O", why: "Castle first; the break can wait one move." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6 O-O O-O")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — the break.", why: "The main line." },
        { san: "Qc2", verdict: "good", answer: "e5", howToAnswer: "...e5 — if d5, ...Nb8.", why: "Normal." },
        { san: "Rc1", verdict: "good", answer: "e5", howToAnswer: "...e5.", why: "Normal." },
        { san: "b4", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — if b5, ...Nd8 and the knight returns via e6.", why: "Gains space; you strike in the centre." },
        { san: "d5", verdict: "dubious", answer: "Nb8", howToAnswer: "...Nb8 — then ...e5 and ...Nbd7.", why: "Closes the centre; your knight reroutes." },
        { san: "e3", verdict: "dubious", answer: "e5", howToAnswer: "...e5.", why: "Passive." },
        { san: "a3", verdict: "dubious", answer: "e5", howToAnswer: "...e5.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6 O-O O-O e4")]: {
      yourMove: { san: "e5", why: "The freeing break. Your pieces get squares, the e-file opens for the rook, and White's centre stops growing." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6 O-O O-O e4 e5")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "Nb8", howToAnswer: "...Nb8 — the knight comes back via d7 or a6; ...a5 and ...Ne8–g7 or ...Nc5 follow.", why: "The main line: closed centre, slow manoeuvring." },
        { san: "dxe5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 — level and simple; ...Rd8 and ...Be6 next.", why: "Releases the tension and gives you an easy game." },
        { san: "Re1", verdict: "good", answer: "Re8", howToAnswer: "...Re8 — keep the tension.", why: "Normal." },
        { san: "Qc2", verdict: "good", answer: "Re8", howToAnswer: "...Re8.", why: "Normal." },
        { san: "b4", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8 — if b5, ...Nxd4 is on.", why: "Loosens the queenside." },
        { san: "h3", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6 O-O O-O e4 e5 d5")]: {
      yourMove: { san: "Nb8", why: "Back to b8 and out again via d7 or a6. With the centre closed the game is slow, and the knight is worth more on c5 than on the rim." },
    },

    // --- 4.Nbd2: the Nimzowitsch line --------------------------------------------
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2")]: {
      yourMove: { san: "O-O", why: "The bishop is not attacked, so castle. When a3 asks the question, take on d2." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O")]: {
      replies: [
        { san: "a3", verdict: "good", answer: "Bxd2+", howToAnswer: "...Bxd2+ — trade; then ...d6 and ...e5.", why: "The main line." },
        { san: "e3", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nbd7 and ...e5; take on d2 when a3 comes.", why: "Solid." },
        { san: "g3", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nbd7, ...e5.", why: "Fianchetto." },
        { san: "Qc2", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — then ...Bxd2+ when asked and ...e5.", why: "Early queen." },
        { san: "e4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — hit the centre. Do not take on e4: the knight on d2 guards it.", why: "Ambitious; ...d5 tests it at once." },
        { san: "b3", verdict: "dubious", answer: "d6", howToAnswer: "...d6 and ...e5.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3")]: {
      yourMove: { san: "Bxd2+", why: "Trade, do not retreat. The bishop has made White spend a knight move and a pawn move; retreating gives the time back." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+")]: {
      replies: [
        { san: "Bxd2", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...Nbd7 and ...e5.", why: "The main line." },
        { san: "Qxd2", verdict: "good", answer: "d6", howToAnswer: "...d6, ...Nbd7, ...e5.", why: "Also fine for White." },
        { san: "Nxd2", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — the knight left f3, so ...e5 comes quickly.", why: "Takes with the piece that guarded e5." },
        { san: "Kxd2", verdict: "bad", answer: "Ne4+", howToAnswer: "...Ne4+ — check; the king is stuck in the centre.", why: "Walks the king forward." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2")]: {
      yourMove: { san: "d6", why: "Prepare ...e5 properly. The pawn on d6 will hold e5 once it gets there." },
      mistakes: [{ san: "e5", why: "dxe5 and nothing recaptures: no pawn on d6, no knight on c6 or d7. A pawn gone for nothing." }],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...e5.", why: "The main line." },
        { san: "g3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, ...e5, ...Re8.", why: "Fianchetto." },
        { san: "e4", verdict: "good", answer: "e5", howToAnswer: "...e5 — d6 holds it. If dxe5 dxe5 Nxe5, ...Qe7 hits the knight and e4 and wins the pawn back.", why: "Takes the centre; you strike straight back." },
        { san: "Qc2", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 and ...e5.", why: "Early queen." },
        { san: "Bc3", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Qe7 before ...e5: the bishop on c3 means e5 needs two defenders.", why: "Eyes e5 through the diagonal." },
        { san: "b4", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 and ...e5.", why: "Space on the wrong side." },
        { san: "Qb3", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — b7 is guarded by the bishop; then ...e5.", why: "Early queen." },
        { san: "Bg5", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, then ...h6 and ...e5.", why: "A pin to ask about." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6 e3")]: {
      yourMove: { san: "Nbd7", why: "The second supporter of ...e5. Now the break is fully prepared." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6 e3 Nbd7")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "e5", howToAnswer: "...e5 — the break.", why: "The main line." },
        { san: "Be2", verdict: "good", answer: "e5", howToAnswer: "...e5.", why: "Normal." },
        { san: "Qc2", verdict: "good", answer: "e5", howToAnswer: "...e5 — if dxe5 dxe5 Nxe5, ...Nxe5 wins a knight for a pawn.", why: "Normal." },
        { san: "b4", verdict: "dubious", answer: "e5", howToAnswer: "...e5.", why: "Space on the queenside while the king is home." },
        { san: "Rc1", verdict: "dubious", answer: "e5", howToAnswer: "...e5.", why: "Rook before castling." },
        { san: "Bc3", verdict: "dubious", answer: "Qe7", howToAnswer: "...Qe7 first — with a bishop on c3, ...e5 at once loses a pawn after dxe5 dxe5 Nxe5 Nxe5 Bxe5.", why: "Adds a third attacker on e5, so add a defender before breaking." },
        { san: "h3", verdict: "dubious", answer: "e5", howToAnswer: "...e5.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6 e3 Nbd7 Bd3")]: {
      yourMove: { san: "e5", why: "Fully supported by d6 and the knight on d7. Your position is free and level." },
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6 e3 Nbd7 Bd3 e5")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Re8", howToAnswer: "...Re8 — keep the tension; ...Qe7 and ...Nf8–g6 later.", why: "The main line." },
        { san: "dxe5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 — level and simple; ...e4 may come to kick the knight.", why: "Releases the tension." },
        { san: "Qc2", verdict: "good", answer: "Re8", howToAnswer: "...Re8.", why: "Normal." },
        { san: "b4", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8.", why: "Space on the queenside." },
        { san: "e4", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4 Nxd4 Nc5 — the knight hits d3 and e4.", why: "Over-extends; the centre opens in your favour." },
        { san: "h3", verdict: "dubious", answer: "Re8", howToAnswer: "...Re8.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6 e3 Nbd7 Bd3 e5 O-O")]: {
      yourMove: { san: "Re8", why: "The rook behind the e-pawn. From here the game is about patience: ...Qe7, ...h6, and a knight to c5 or e4 when it is safe." },
    },
  },

  traps: [
    {
      name: "The undefended bishop",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+ 4.Bd2 O-O 5.Bxb4"),
      punisher: "white",
      tell: "White blocks the check with Bd2 and you reach for the most natural move on the board.",
      why: "The bishop on b4 has no defender the moment Bd2 lands. Castling, ...d5 and ...b6 all drop it to Bxb4. Every move after 4.Bd2 has to deal with the bishop: ...Qe7 guards it, ...a5 guards it, ...Bxd2+ trades it.",
    },
    {
      name: "Blocking with the queen",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+ 4.Qd2 Bxd2+ 5.Bxd2"),
      punisher: "black",
      tell: "White answers the check with Qd2 instead of a bishop or knight.",
      why: "The queen steps onto the square your bishop attacks. ...Bxd2+ wins a queen for a bishop and White recaptures with a bishop or knight. Beginners do this because Qd2 looks like it defends everything; it defends nothing.",
    },
    {
      name: "...e5 with the bishop still on b4",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+ 4.Bd2 Qe7 5.g3 e5 6.dxe5 Qxe5 7.Bxb4"),
      punisher: "white",
      tell: "You know ...e5 is the plan and the queen on e7 looks ready to support it.",
      why: "The queen on e7 has two jobs: guarding the bishop on b4 and backing up e5. After dxe5 she can only do one. ...Qxe5 recaptures the pawn and Bxb4 takes the bishop. Trade on d2 first, put a pawn on d6, and then ...e5 is safe.",
    },
  ],

  modelGames: [
    {
      label: "Main line: 4.Bd2 Qe7",
      sans: sans("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 g3 Nc6 Bg2 Bxd2+ Nbxd2 d6 O-O O-O e4 e5 d5 Nb8 Ne1 a5"),
      summary: "The check, the guard, the trade, then ...d6, castle and ...e5. When White closes with d5 the knight steps back to b8 and returns via d7; ...a5 stops b4.",
    },
    {
      label: "Nimzowitsch line: 4.Nbd2",
      sans: sans("d4 Nf6 c4 e6 Nf3 Bb4+ Nbd2 O-O a3 Bxd2+ Bxd2 d6 e3 Nbd7 Bd3 e5 O-O Re8 Qc2 Qe7"),
      summary: "White blocks with the knight to keep the bishop pair. You castle, trade when a3 asks, and prepare ...e5 with ...d6 and ...Nbd7 so the break is fully supported.",
    },
    {
      label: "Against Nc3: take and hit c3",
      sans: sans("d4 Nf6 c4 e6 Nf3 Bb4+ Bd2 Qe7 Nc3 Bxc3 Bxc3 Ne4 Rc1 O-O g3 d6 Bg2 Nxc3 Rxc3 e5"),
      summary: "White adds Nc3 and the bishop takes it. ...Ne4 hits the recapturing bishop, White spends a rook move defending, and after the trade on c3 you get ...e5 with a level, easy position.",
    },
  ],

  middlegamePlan:
    "The Bogo does not try to refute anything. Get the bishop traded, castle, and play ...d6 and ...e5 with both a pawn and a knight behind the break. " +
    "After ...e5, keep the tension: rook to e8, queen on e7, ...a5 to stop b4, ...h6 to stop Bg5, and a knight to c5 or e4 when the square is safe. " +
    "If White pushes d5, retreat the knight to b8 and bring it back via d7; the closed centre makes the game slow and White's extra space harmless. " +
    "If White trades on e5, the position is level and you should be happy to simplify.",

  structureDiagram: {
    fen: "r1b1k2r/ppppqppp/2n1pn2/8/2PP4/5NP1/PP1bPPBP/RN1QK2R w KQkq - 0 7",
    orientation: "black",
    arrows: [
      { from: "d2", to: "e1" },
      { from: "e6", to: "e5" },
    ],
    caption: "The Bogo picture: the check has been answered, the bishop is about to be traded on d2, the queen on e7 stands behind the coming ...e5 break.",
  },
};
