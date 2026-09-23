// Sicilian Defence (1.e4 c5) — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines are standard public theory. Prose original.
//
// The Sicilian is one trade: your c-pawn for White's d-pawn. Everything after
// that is about making the half-open c-file and the d5/d6 squares work for you.
// We teach ONE setup for the Open Sicilian — the Najdorf with ...d6, ...Nf6,
// ...a6, ...e5, ...Be7 — because under 1200 you need a plan you can repeat, not
// a library. The anti-Sicilians (2.c3, the Morra, 3.Bb5+, 2.Nc3 and f4) get more
// space than the main lines do, because they are what you will actually face.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const sicilianDefence: OpeningSpec = {
  id: "sicilian-defence",
  name: "Sicilian Defence",
  aliases: ["Najdorf", "Rossolimo"],
  eco: "B20–B99",
  side: "black",
  family: "1e4-other",
  firstMoves: "1.e4 c5",
  tabiyaFen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
  pitch:
    "You trade a wing pawn for White's centre pawn on move three and spend the rest of the game using the half-open c-file it leaves behind. " +
    "Nothing is symmetrical, so nothing is a draw by default: you get real winning chances as Black, and the same six-move setup (...d6, ...Nf6, ...a6, ...e5, ...Be7, castle) works against everything White usually tries.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6"], why: "The king's knight attacks e4 and guards d5. It is the first piece out after the pawn trade, and it makes every White bishop-check less annoying." },
      { piece: "N", squares: ["d7", "c6"], why: "The queen's knight. On d7 it supports ...e5 and can hop to b6 or c5 later; on c6 (in the anti-Sicilians) it fights for d4 directly." },
      { piece: "B", squares: ["e7", "g7"], why: "The dark bishop. On e7 it covers d6 and lets you castle; on g7 (against f4 setups) it points at the queenside White has left behind." },
      { piece: "B", squares: ["e6", "d7", "b7"], why: "The light bishop. On e6 it guards d5, the square the whole Najdorf fight is about. Against Bb5+ it blocks on d7 and gets traded, which is fine." },
      { piece: "Q", squares: ["c7"], why: "The queen belongs on the c-file, behind the pawn you traded away. From c7 it also covers e5 and d6." },
      { piece: "R", squares: ["c8"], why: "The rook joins the queen on the half-open file. ...Rc8 is the move you play when you cannot think of anything else." },
    ],
    pawns: ["c5", "d6", "a6"],
    order: [
      {
        before: "a6",
        after: "e5",
        why: "...a6 first, then ...e5. The pawn on e5 leaves d5 and d6 soft, and White's knight would love to land on b5 to poke at them. ...a6 takes b5 away from the knight and from the bishop (no Bb5+). Play ...e5 before ...a6 and both arrive at once.",
      },
      {
        before: "d6",
        after: "e5",
        why: "...d6 before ...e5. Without the d-pawn behind it, the e5-pawn is a target rather than a stake: 2.Nf3 e5 simply loses it to Nxe5. With ...d6 in place, ...e5 is a claim on the centre that White has to respect.",
      },
    ],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "sicilian-c-for-d",
      title: "The trade that defines the opening",
      oneLiner: "The moment White plays d4, take it. Your c-pawn for their d-pawn is the whole deal.",
      why: "A wing pawn for a centre pawn is a good exchange on its own. It also opens the c-file halfway for you and leaves White with no pawn on d4 to lean on. Nearly every Sicilian problem a beginner has comes from letting White play d4 and NOT taking, so that dxc5 or d5 arrives instead.",
      trigger: { kind: "opponent_san", sans: ["d4"] },
      response: "...cxd4.",
      ifIgnored: "White gets d5 or dxc5 and you have a cramped or pawn-down version of an opening you chose for the opposite reason.",
    },
    {
      id: "sicilian-najdorf-setup",
      title: "The Najdorf setup, every game",
      oneLiner: "...d6, ...Nf6, ...a6, ...e5, ...Be7, castle. Then ...Be6, ...Nbd7, ...Qc7, ...Rc8.",
      why: "The Open Sicilian is enormous, and you do not need any of it. Once the knights are out you play the same six moves in the same order. ...a6 stops the knight and bishop landing on b5; ...e5 kicks the d4-knight and claims the centre; ...Be7 and castling make the king safe. After that the pieces go to the same squares whatever White does.",
      trigger: { kind: "epd", epds: [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3")] },
      response: "...a6, then ...e5 and ...Be7.",
    },
    {
      id: "sicilian-e4-poison",
      title: "The e4-pawn is never free",
      oneLiner: "Once a knight sits on c3, ...Nxe4 just loses a knight for a pawn.",
      why: "Your knight on f6 stares at e4 all game and the pawn always looks loose. It is defended by the c3-knight, and after ...Nxe4 Nxe4 you are a piece down for nothing. The only time to take on e4 is when NO knight is on c3 and no rook stands on e1. Your counterplay is ...b5, ...Rc8 and the ...d5 break, not a pawn grab.",
      trigger: {
        kind: "epd",
        epds: [
          P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3"),
          P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2"),
          P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3"),
          P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O"),
        ],
      },
      response: "Leave e4 alone. Play the setup move.",
      ifIgnored: "Nxe4 and you are a knight down on move six.",
    },
    {
      id: "sicilian-c3-family",
      title: "Against c3: hit e4 with ...Nf6",
      oneLiner: "2.c3 or the Morra 3.c3: play ...Nf6, hop to d5 after e5, and take on d4 the moment it appears.",
      why: "White plays c3 to recapture on d4 with a pawn and keep a big centre. ...Nf6 forces a decision about e4 before that centre exists. After e5 Nd5 the knight is safe in the middle, your c-pawn still takes on d4, and White's e5-pawn becomes the target of ...d6. Against the Smith-Morra (2.d4 cxd4 3.c3) the same ...Nf6 declines the gambit and lands you in exactly this line, a pawn up in structure and with nothing to memorise.",
      trigger: { kind: "opponent_san", sans: ["c3"] },
      response: "...Nf6. After e5, ...Nd5. After d4, ...cxd4.",
    },
    {
      id: "sicilian-bb5",
      title: "Against Bb5+: block, trade, carry on",
      oneLiner: "...Bd7, let them take, recapture with the queen, and develop as normal.",
      why: "The check on b5 is White avoiding the Open Sicilian, not attacking you. Blocking with the bishop offers a trade that costs you nothing: your light bishop is the piece you have least use for behind a pawn on d6. After ...Qxd7 the queen is well placed on the d-file, and ...Nc6, ...Nf6, ...e6 and ...Be7 follow. If White ever leaves the b5-bishop unprotected, ...Bxb5 is simply a free piece.",
      trigger: { kind: "opponent_san", sans: ["Bb5"] },
      response: "...Bd7.",
    },
    {
      id: "sicilian-grand-prix",
      title: "Against f4 setups: bishop to g7",
      oneLiner: "2.Nc3 and f4 is a kingside attack. Meet it with ...Nc6, ...g6, ...Bg7 and let the bishop watch the queenside.",
      why: "The Grand Prix Attack wants f4, Bc4 or Bb5, and pieces pointing at your king. The fianchetto bishop on g7 is the ideal defender: it covers the dark squares White's f-pawn has loosened and hits d4 and b2 the moment the centre opens. Do not rush ...e5 or ...Nf6 here; e5 would be kicked by f5 and the knight by e5.",
      trigger: { kind: "opponent_san", sans: ["f4"] },
      response: "...Nc6, ...g6, ...Bg7, then ...e6 and ...Nge7.",
    },
    {
      id: "sicilian-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, then ...Be6, ...Nbd7, ...Qc7, ...Rc8. Fight for d5, and break with ...b5 or ...d5.",
      why: "The Sicilian middlegame has a shape you can always fall back on. The queen and a rook go to the c-file. The light bishop guards d5, the one hole your ...e5 created. Then you pick a break: ...b5–b4 to kick the c3-knight and open the queenside, or ...d5 once enough pieces cover it. White will attack on the kingside; do not sit and defend, race them on the other wing.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "c5", howToAnswer: "...c5 — the Sicilian. Most of your games.", why: "The move this whole opening exists to answer." },
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — this is not a Sicilian any more. Develop normally: ...Nf6, ...e6, ...Be7.", why: "A queen's pawn game. ...c5 here is a Benoni and White gets d5 for free; keep it simple instead." },
        { san: "c4", verdict: "good", answer: "c5", howToAnswer: "...c5 — a Symmetrical English. Same pawn, same ideas: ...Nc6, ...g6, ...Bg7.", why: "The English. Your c-pawn still does its job." },
        { san: "Nf3", verdict: "good", answer: "c5", howToAnswer: "...c5 — if e4 comes next you are in the Sicilian a move later.", why: "Flexible. It usually turns into a Sicilian or an English." },
        { san: "Nc3", verdict: "dubious", answer: "c5", howToAnswer: "...c5, then ...Nc6 and ...g6 if f4 follows.", why: "Often heading for a Closed Sicilian by another road." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...Nf6 and ...Bg4 — the Bird loosens White's king early.", why: "Bird's Opening. Take the centre they ignored." },
        { san: "g3", verdict: "good", answer: "c5", howToAnswer: "...c5, ...Nc6, ...g6 — mirror the fianchetto.", why: "A quiet fianchetto setup." },
        { san: "b3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 and ...Nc6 — take the centre and make the b2-bishop bite on your e5-pawn.", why: "Larsen's Opening ignores the centre." },
        { san: "d3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 and develop; White is not fighting for d4.", why: "Timid." },
        { san: "e3", verdict: "dubious", answer: "c5", howToAnswer: "...c5, ...Nc6, ...d5 — take the space.", why: "Passive." },
      ],
    },
    [P("e4")]: { yourMove: { san: "c5", why: "The Sicilian. You refuse to mirror with ...e5, stop d4 from arriving for free, and plan to trade this pawn for White's d-pawn." } },
    [P("e4 c5")]: {
      replies: [
        { san: "Qh5", verdict: "bad", answer: "Nf6", howToAnswer: "Nf6 — the knight hits the queen and develops; she has to move again.", why: "A Scholar's-mate try that threatens nothing yet and hands you a free developing move." },
        { san: "Qf3", verdict: "bad", answer: "Nc6", howToAnswer: "Nc6, then ...Nf6 and ...e6; the queen on f3 blocks White's own knight.", why: "Early queen. It takes the f3 square from the knight and becomes a target." },
        { san: "c4", verdict: "dubious", answer: "Nc6", howToAnswer: "Nc6, ...g6 and ...Bg7 — a Maroczy setup where White has spent a move you can ignore.", why: "Clamps d5 but develops nothing. Build normally." },
        { san: "e5", verdict: "dubious", answer: "Nc6", howToAnswer: "Nc6, then ...Nxe5 or ...d6 to undermine the pawn that ran ahead.", why: "Overextended. The pawn on e5 has no support yet." },
        { san: "Bb5", verdict: "dubious", answer: "a6", howToAnswer: "a6 — ask the bishop to leave; after Bxc6 dxc6 you have the open d-file and the two bishops.", why: "Nothing to pin, so the bishop is just exposed." },
        { san: "Nf3", verdict: "good", answer: "d6", howToAnswer: "...d6 — the Najdorf road. ...Nf6 next, and ...cxd4 when d4 comes.", why: "The main line and the most common move at every level." },
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6! Hit e4 before White builds the centre. After e5 the knight goes to d5.", why: "The Alapin. White wants to recapture on d4 with a pawn. The most common anti-Sicilian under 1200." },
        { san: "d4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 — take it. If 3.c3 (the Smith-Morra) decline with ...Nf6; if 3.Qxd4 kick the queen with ...Nc6.", why: "Early d4 without Nf3 is either a gambit or a queen sortie. Take the pawn and develop." },
        { san: "Nc3", verdict: "good", answer: "d6", howToAnswer: "...d6, and if f4 follows go ...Nc6, ...g6, ...Bg7.", why: "The Closed Sicilian or a Grand Prix. White will play f4 and attack the kingside; your g7-bishop is the answer." },
        { san: "Bc4", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — shut the bishop out of f7 at once, then ...Nc6, ...Nf6 and ...d5 later hits it again.", why: "A bishop aimed at f7 on move two. One pawn move and it stares at a wall." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5! Open the centre while White's king is loose; after exd5 Nf6 you get the pawn back with development.", why: "The Grand Prix without Nc3. The f-pawn has weakened White's king and the centre is not held." },
        { san: "b4", verdict: "dubious", answer: "cxb4", howToAnswer: "...cxb4 — take it. After a3, ...d5 gives the pawn back for a good centre.", why: "The Wing Gambit. A pawn for a little development; keep the pawn and stay calm." },
        { san: "g3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...g6, ...Bg7 — mirror them and fight for d4.", why: "A fianchetto. Slow, and it leaves d4 to you." },
        { san: "Ne2", verdict: "dubious", answer: "d6", howToAnswer: "...d6 and ...Nf6 — usually it becomes a Closed or Open Sicilian a move later.", why: "A knight move that keeps f4 available." },
        { san: "d3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 and ...d5 — White is not fighting for the centre, so you take it.", why: "Timid." },
      ],
    },

    // --- 2.Nf3: the Open Sicilian, Najdorf setup ---------------------------------
    [P("e4 c5 Nf3")]: {
      yourMove: { san: "d6", why: "Flexible and solid. It prepares ...Nf6 without letting e5 kick the knight, and it is the first move of the setup you play every game." },
      mistakes: [
        { san: "Nf6", why: "3.e5 kicks the knight to d5 and White gains time with c4 or d4. ...d6 first, then the knight is never bothered." },
        { san: "e5", why: "3.Nxe5 simply takes it. The pawn has no defender yet, and ...e5 belongs after ...d6 or not at all." },
      ],
    },
    [P("e4 c5 Nf3 d6")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 — the Sicilian trade. Never let this pawn sit.", why: "The Open Sicilian. White opens the centre and you get the trade you came for." },
        { san: "Bb5+", verdict: "good", answer: "Bd7", howToAnswer: "...Bd7 — block, let them trade, recapture ...Qxd7 and develop.", why: "The Moscow variation. White avoids the Open lines by swapping off your light bishop." },
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — hit e4. If e5 then ...dxe5 Nxe5 and nothing is lost; otherwise White has to spend a move defending the pawn.", why: "A delayed Alapin. With ...d6 already in, e5 is no longer a real kick." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — develop; d4 cxd4 next is the Open Sicilian by another order.", why: "Usually transposes." },
        { san: "Bc4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 shuts the bishop out. White's bishop hits a pawn on e6 and nothing else.", why: "Aiming at f7 before the centre is decided." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...g6 — you have the centre and time.", why: "White gives up on d4. Quiet and a little passive." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 Nxe5, then ...Nf6 and ...Nc6 — nothing lost, and White's centre is gone.", why: "A pawn thrust that just trades itself off." },
        { san: "c4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...e5 or ...g6 — the Maroczy clamp without a pawn on d4 is toothless.", why: "White grabs d5 but has no centre to back it." },
        { san: "g3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6 and ...g6 — a slow game where you have the freer development.", why: "A fianchetto setup." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4")]: {
      yourMove: { san: "cxd4", why: "The trade the whole opening is about: your c-pawn for White's d-pawn, and a half-open c-file for the rest of the game." },
      mistakes: [
        { san: "e5", why: "4.dxe5 dxe5 5.Qxd8+ Kxd8 6.Nxe5 wins a pawn and takes your castling. Take on d4 first, every time." },
        { san: "Nc6", why: "4.d5 kicks the knight and White has the big centre for free. ...cxd4 first, then the knight comes out." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4")]: {
      replies: [
        { san: "Nxd4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — attack e4 and make White defend it with Nc3.", why: "The main line. White's knight sits in the centre; you develop with a threat." },
        { san: "Qxd4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — kick the queen and develop in one move.", why: "The queen comes out early and gets chased." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — attack e4. If cxd4 then ...Nxe4 takes a pawn (Qa4+ is met by ...Nc6); if e5 then ...dxe5 Nxe5 dxc3 and you stay a pawn up.", why: "A delayed Morra. With ...d6 already in, White's pushes have no bite." },
        { san: "Bc4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 — the bishop will bite on e6.", why: "Development that ignores the pawn on d4." },
        { san: "Bb5+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block; after Bxd7+ Nbxd7 Qxd4 you are level and well developed.", why: "A check that trades bishops and slows nothing." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 — you are a pawn up. Keep developing: ...Nc6 and ...Bg4.", why: "Pushing a pawn that nothing supports." },
        { san: "Bd3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 and ...Nc6 — the bishop on d3 blocks its own d-file and the d4-pawn is still yours.", why: "Passive; the bishop sits in front of everything." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4")]: {
      yourMove: { san: "Nf6", why: "Develop with a threat. e4 is attacked, so White has to spend a move on Nc3, and your setup starts." },
      mistakes: [{ san: "e5", why: "Too early. 5.Bb5+ Bd7 6.Bxd7+ Qxd7 7.Nf5 and the knight sits on the square ...e5 gave away. ...Nf6 and ...a6 first, then ...e5 with everything covered." }],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "a6", howToAnswer: "...a6 — the Najdorf move. b5 is taken from the knight and the bishop, and ...e5 is next.", why: "The main line. White defends e4 and you begin the setup." },
        { san: "f3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — develop and hit d4. Nc3 and the setup continue normally.", why: "Defending e4 with a pawn, planning c4 or Be3." },
        { san: "Bd3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit the knight; after Nxc6 bxc6 you get the d5 break.", why: "Defends e4 but blocks the d-file and the c1-bishop." },
        { san: "Bc4", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — blunt the bishop first. Do not grab e4: Bxf7+ and Qh5+ gets messy.", why: "Aims at f7 and leaves e4 loose, but the pawn is bait." },
        { san: "Be2", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn. No knight on c3, no rook on e1, nothing to fear.", why: "Develops and forgets the pawn." },
        { san: "Bg5", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — the knight is not pinned to anything, and e4 has no defender.", why: "Pins a knight that can just move." },
        { san: "c4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a clean pawn. Then ...e5 and ...Nc6 develop normally.", why: "The Maroczy bind without defending e4 first." },
        { san: "Nb5", verdict: "bad", answer: "a6", howToAnswer: "...a6 — kick it; the knight goes back and you have gained a move.", why: "A knight hop with nothing behind it." },
        { san: "Nd2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop and hit the knight; you are a move ahead.", why: "Defends e4 but takes the c1-bishop's best square." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3")]: {
      yourMove: { san: "a6", why: "The Najdorf move. It takes b5 away from the knight and the bishop, so that ...e5 can come next without a check or a knight hop to punish it." },
      mistakes: [
        { san: "Nxe4", why: "6.Nxe4 and you have given a knight for a pawn. The c3-knight defends e4 for the whole opening; leave it alone." },
        { san: "e5", why: "6.Bb5+ Bd7 7.Bxd7+ Qxd7 8.Nf5 and the knight lands on the square ...e5 loosened. ...a6 first takes b5 away, then ...e5 is safe." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6")]: {
      replies: [
        { san: "Be2", verdict: "good", answer: "e5", howToAnswer: "...e5 — kick the knight and claim the centre. ...Be7 and castle next.", why: "The classical main line. Quiet development and a race to castle." },
        { san: "Bg5", verdict: "good", answer: "e6", howToAnswer: "...e6 — not ...e5 here, because Nf5 would land with the bishop on g5 pinning. ...Be7 and ...Qc7 follow.", why: "The sharpest try. White pins the knight and plans f4." },
        { san: "Be3", verdict: "good", answer: "e5", howToAnswer: "...e5 — Nb3 and then ...Be6, ...Be7, castle. Same setup.", why: "The English Attack: f3, Qd2 and castling long come next." },
        { san: "Bc4", verdict: "good", answer: "e6", howToAnswer: "...e6 — block the bishop's diagonal. Then ...Be7, ...b5 chasing it, and castle.", why: "The Sozin bishop aims at f7; one pawn move shuts it out." },
        { san: "f4", verdict: "good", answer: "e5", howToAnswer: "...e5 — hit the knight while the f-pawn is committed. After Nf3 ...Nbd7 and ...Be7.", why: "Aggressive. White wants e5 or f5; ...e5 stops both." },
        { san: "f3", verdict: "good", answer: "e5", howToAnswer: "...e5, then ...Be6 and ...Be7 — the same setup.", why: "Also heading for the English Attack." },
        { san: "h3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — the knight retreats and you develop as usual.", why: "A slow move that prepares g4." },
        { san: "g3", verdict: "dubious", answer: "e5", howToAnswer: "...e5, then ...Be7 and castle; White's bishop on g2 stares at your solid queenside.", why: "A fianchetto that gives you time." },
        { san: "Bd3", verdict: "dubious", answer: "e5", howToAnswer: "...e5 — the knight retreats and the bishop on d3 blocks its own queen.", why: "Passive: the bishop is in the way." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2")]: {
      yourMove: { san: "e5", why: "Kick the knight and take the centre. ...a6 has made this safe: no Bb5+, no Nb5. The d5-square is now the middlegame argument, and ...Be6 will guard it." },
      mistakes: [{ san: "Nxe4", why: "7.Nxe4 — a knight for a pawn. e4 is defended by the c3-knight, as it will be all game." }],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5")]: {
      replies: [
        { san: "Nb3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — develop and prepare to castle. ...Be6 and ...Nbd7 follow.", why: "The main retreat. The knight eyes a5 and d5 from b3." },
        { san: "Nf3", verdict: "good", answer: "Be7", howToAnswer: "...Be7, castle, then ...Be6 — same setup.", why: "Back where it came from, eyeing g5." },
        { san: "Nf5", verdict: "dubious", answer: "d5", howToAnswer: "...d5! Strike back in the centre. If exd5 then ...Bxf5 wins the knight for a pawn.", why: "The knight looks dangerous on f5 but has no support." },
        { san: "Ndb5", verdict: "bad", answer: "axb5", howToAnswer: "...axb5 — a free knight. That is what ...a6 was for.", why: "White forgot the a6-pawn." },
        { san: "Bg5", verdict: "bad", answer: "exd4", howToAnswer: "...exd4 — take the knight. After Qxd4 ...Nc6 hits the queen and you stay a piece up.", why: "Ignoring an attacked knight." },
        { san: "O-O", verdict: "bad", answer: "exd4", howToAnswer: "...exd4 — take the knight; Qxd4 Nc6 and you keep it.", why: "Castling while a knight hangs." },
        { san: "Be3", verdict: "bad", answer: "exd4", howToAnswer: "...exd4 Bxd4 Nc6 — you have a knight for a pawn.", why: "Defends d4 once; it is attacked once and worth more than a pawn." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3")]: {
      yourMove: { san: "Be7", why: "Develop the bishop and get ready to castle. It also covers d6, the square White's pieces would like to land on." },
      mistakes: [
        { san: "Nxe4", why: "8.Nxe4 — a knight for a pawn, again. The c3-knight is still there." },
        { san: "d5", why: "Too soon. 8.Nxd5 Nxd5 9.exd5 and your pawn is gone; the ...d5 break only works once ...Be6, ...Nbd7 and a rook cover it." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — king safe, then ...Be6, ...Nbd7, ...Qc7.", why: "The main line. Both sides castle and the middlegame plans begin." },
        { san: "Be3", verdict: "good", answer: "Be6", howToAnswer: "...Be6 — guard d5 first; castle next move. If g4 comes, ...h6 keeps the knight on f6.", why: "Developing toward Qd2 and a possible g4." },
        { san: "Bg5", verdict: "good", answer: "Be6", howToAnswer: "...Be6 — if Bxf6 Bxf6 you have the good bishop and d5 is covered.", why: "Pressure on the knight that guards d5." },
        { san: "f4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — castle into it calmly; ...exf4 or ...Nbd7 next depending on what White does.", why: "An early f-pawn push before castling." },
        { san: "g4", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — stop g5 kicking the knight. Then ...Be6 and castle.", why: "A pawn storm before White's own king is safe." },
        { san: "f3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Be6 and ...Nbd7 as usual.", why: "Solidifying e4 before Be3 and Qd2." },
        { san: "a4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — a4 stops ...b5, so your play comes from ...Nc6 and ...Be6 instead.", why: "Taking b5 away from your pawns." },
        { san: "h4", verdict: "dubious", answer: "Be6", howToAnswer: "...Be6 — develop and keep the king in the centre a moment longer; White's own king is nowhere safe.", why: "A pawn thrust with nothing behind it yet." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O")]: {
      yourMove: { san: "O-O", why: "King safe. Now the plan is ...Be6, ...Nbd7, ...Qc7 and ...Rc8, with ...b5 or ...d5 as the break." },
      mistakes: [{ san: "Nxe4", why: "9.Nxe4 — a knight for a pawn. e4 is defended by the c3-knight and has been since move five." }],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O")]: {
      replies: [
        { san: "Be3", verdict: "good", answer: "Be6", howToAnswer: "...Be6 — guard d5. ...Nbd7 and ...Qc7 come next.", why: "The main line. Both bishops go to their third-rank squares." },
        { san: "Bg5", verdict: "good", answer: "Be6", howToAnswer: "...Be6 — if Bxf6 Bxf6, your bishop is the better one.", why: "Pressure on f6, the knight that holds d5." },
        { san: "f4", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — support e5 and keep ...exf4 in reserve. ...b5 next.", why: "White opens the f-file. Keep e5 solid and play on the other wing." },
        { san: "a4", verdict: "dubious", answer: "Be6", howToAnswer: "...Be6, then ...Nc6 — with ...b5 stopped, the knight goes to c6 and the rooks to c8.", why: "Slows ...b5 but develops nothing." },
        { san: "Kh1", verdict: "dubious", answer: "Be6", howToAnswer: "...Be6 — develop; White's king step does nothing yet.", why: "A prophylactic move that costs a tempo." },
        { san: "f3", verdict: "dubious", answer: "Be6", howToAnswer: "...Be6, ...Nbd7, ...Qc7 — the same squares.", why: "Solid but slow." },
        { san: "Re1", verdict: "dubious", answer: "Be6", howToAnswer: "...Be6 — the rook on e1 changes nothing about your plan.", why: "A rook move with no target." },
      ],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O Be3")]: {
      yourMove: { san: "Be6", why: "The bishop guards d5, the square ...e5 gave away. From here the middlegame is the c-file and the queenside." },
      mistakes: [{ san: "Nxe4", why: "10.Nxe4 — still a knight for a pawn." }],
    },
    [P("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O Be3 Be6")]: {
      replies: [
        { san: "f4", verdict: "good", answer: "exf4", howToAnswer: "...exf4 Bxf4 Nc6 — take, then develop with a threat on the bishop. ...d5 is coming.", why: "The standard break. Taking keeps the centre open for your pieces." },
        { san: "Qd2", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, then ...Qc7 and ...Rc8.", why: "Connecting the rooks. Nothing to fear." },
        { san: "f3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, ...Qc7, ...Rc8 — and ...b5 when it is safe.", why: "Solid; White prepares g4 slowly." },
        { san: "a4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — with ...b5 stopped, the knight belongs on c6 and the rooks on c8.", why: "Prevents ...b5 at the cost of a tempo." },
        { san: "Bf3", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 and ...Qc7 — the same squares.", why: "Rerouting the bishop toward d5." },
        { san: "Nd5", verdict: "dubious", answer: "Nxd5", howToAnswer: "...Nxd5 exd5 Bf5 — trade, then put the bishop where it is not blocked.", why: "The knight arrives on d5 but the trade leaves White with a pawn there and nothing on it." },
      ],
    },

    // --- 2.c3: the Alapin (and the Smith-Morra declined into it) ------------------
    [P("e4 c5 c3")]: {
      yourMove: { san: "Nf6", why: "Hit e4 before White gets d4 in. White's only good answer is e5, and after ...Nd5 the knight is safe in the centre with the c-pawn ready to take on d4." },
      mistakes: [{ san: "d6", why: "Not a blunder, but 3.d4 arrives unbothered and after ...cxd4 cxd4 White has the big centre the Alapin dreams of. ...Nf6 first makes White push e5 and gives you a target." }],
    },
    [P("e4 c5 c3 Nf6")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nd5", howToAnswer: "...Nd5 — the knight is safe in the centre. ...cxd4 and ...d6 will chip at the e5-pawn.", why: "The main line. White gains space and you get a target." },
        { san: "Nf3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop. Do NOT take e4: after ...Nxe4 Qa4+ the knight is lost.", why: "Leaves e4 looking free, but the queen check on a4 makes it poison." },
        { san: "d3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...d5 or ...e5 — White has given up on the centre.", why: "Defends e4 passively." },
        { san: "Qc2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 and ...d5 — the queen is out early and the d5 push hits her.", why: "An early queen move to hold a pawn." },
        { san: "Bd3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...e5, ...d5 — the bishop blocks White's own d-pawn.", why: "Defends e4 by burying the bishop." },
        { san: "Qe2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 and ...e5 — the queen is in the bishop's way.", why: "Holds e4 at the cost of development." },
        { san: "Bc4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — takes a pawn. If Qa4+ then ...Nc6, and White's own bishop on c4 blocks the queen's way back to e4.", why: "Develops a bishop and drops a pawn." },
        { san: "d4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — take it. Then ...d5 and ...Nc6; you are a pawn up.", why: "White plays the move c3 was preparing but forgets the pawn it leaves behind." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5")]: {
      yourMove: { san: "Nd5", why: "The knight belongs in the centre. It cannot be chased by c4 without weakening d4, and ...cxd4 comes next." },
      mistakes: [
        { san: "Ng4", why: "4.Qxg4 — the knight is simply undefended. It looks active and it is a free piece for White." },
        { san: "Ne4", why: "4.d3 and the knight has no square: c5 is blocked by your own pawn, d6 and f6 are covered by the e5-pawn. It goes to f2 and dies. ...Nd5 is the only good square." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 — the trade. If Nf3 then ...e6, guarding the knight before it can be hit.", why: "The main line. White builds the centre and you take half of it." },
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — develop; ...cxd4 and ...d6 come when d4 does.", why: "Develops first, keeping d4 in reserve." },
        { san: "Bc4", verdict: "dubious", answer: "Nb6", howToAnswer: "...Nb6 — hit the bishop; after Bb3 play ...Nc6 and ...d5 or ...d6.", why: "The bishop attacks the knight and gets kicked straight back." },
        { san: "c4", verdict: "dubious", answer: "Nb6", howToAnswer: "...Nb6, then ...Nc6 and ...d6 — the c4-pawn has taken d4 away from White's own pieces.", why: "Kicks the knight but weakens d4 for good." },
        { san: "d3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...d6 — the e5-pawn is a target now, not a spearhead.", why: "Too modest to support the e5 push." },
        { san: "g3", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — hit e5 at once; after exd6 Qxd6 you are developed and White is not.", why: "A fianchetto while the centre is on fire." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4")]: {
      yourMove: { san: "cxd4", why: "The Sicilian trade, Alapin edition. White will recapture with the c-pawn and keep a big centre, so you must hit it fast with ...e6 and ...d6." },
      mistakes: [{ san: "Nc6", why: "5.dxc5 and the pawn you meant to trade is gone. You can win it back, but White has the moves. ...cxd4 first, every time." }],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6 — guard the knight before anything else. Do not take on c3: Qxd5 wins the knight.", why: "The main line. White develops and lets you decide about c3." },
        { san: "cxd4", verdict: "good", answer: "d6", howToAnswer: "...d6 — hit e5 at once. ...Nc6 and ...Be7 follow.", why: "The natural recapture: White has the d4/e5 centre and you start dismantling it." },
        { san: "Qxd4", verdict: "dubious", answer: "e6", howToAnswer: "...e6, then ...Nc6 kicks the queen and ...d6 hits e5.", why: "The queen comes out early and gets chased." },
        { san: "Bc4", verdict: "dubious", answer: "Nb6", howToAnswer: "...Nb6 Bb3 and now ...dxc3 Nxc3 leaves you a clean pawn up.", why: "Attacks the knight but leaves both c3 and d4 loose." },
        { san: "c4", verdict: "dubious", answer: "Nb6", howToAnswer: "...Nb6, then ...Nc6 — the d4-pawn is yours to keep and White's centre has a hole on d4.", why: "Kicks the knight and forgets the pawn." },
        { san: "Bd3", verdict: "dubious", answer: "dxc3", howToAnswer: "...dxc3 Nxc3 Nxc3 bxc3 — a pawn up with a simple position.", why: "A bishop move while two pawns hang." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3")]: {
      yourMove: { san: "e6", why: "The knight on d5 has no defender yet. ...e6 gives it one and frees the bishop, so that ...dxc3 and ...d6 both become safe next move." },
      mistakes: [
        { san: "dxc3", why: "6.Qxd5! The d-file is open and the knight had no defender. The greedy pawn costs a whole piece. ...e6 first." },
        { san: "Nb6", why: "Retreating for no reason. 6.cxd4 and White has the centre while your knight blocks the b-pawn. Guard the knight with ...e6 instead." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6")]: {
      replies: [
        { san: "cxd4", verdict: "good", answer: "d6", howToAnswer: "...d6 — hit e5. After exd6 Bxd6 or Bc4 Nc6 you are fully developed against an isolated d-pawn.", why: "The main recapture. The d4/e5 pair is White's whole plan." },
        { san: "Bc4", verdict: "dubious", answer: "Nb6", howToAnswer: "...Nb6 — hit the bishop; after Bb3 play ...d6 and ...Nc6.", why: "Development that gets kicked at once." },
        { san: "Qxd4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit the queen and develop. ...d6 next.", why: "Recapturing with the queen brings her out early." },
        { san: "Nxd4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit the knight; after Nxc6 bxc6 your centre is solid and ...d6 comes.", why: "Recapturing with the knight gives up the pawn centre." },
        { san: "Bd3", verdict: "dubious", answer: "dxc3", howToAnswer: "...dxc3 Nxc3 Nxc3 bxc3 — a pawn up, and White's queenside is loose.", why: "Ignores the pawn on d4." },
        { san: "Be2", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — hit e5; the bishop on e2 defends nothing that matters.", why: "Quiet development that leaves d4 hanging." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4")]: {
      yourMove: { san: "d6", why: "Hit the head of White's pawn chain. e5 must be traded or defended, and either way your pieces come out with tempo." },
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6")]: {
      replies: [
        { san: "Bc4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — hit d4 and e5 together. ...Be7 and castle next.", why: "The main line: the bishop attacks the knight, which is well guarded by the e6-pawn." },
        { san: "Nc3", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 — trade the knight that was about to be chased. ...Nc6 and ...Be7 follow.", why: "Developing and hitting the knight." },
        { san: "exd6", verdict: "good", answer: "Bxd6", howToAnswer: "...Bxd6 — the bishop develops with the recapture. Castle next.", why: "White gives up the e5-pawn and you get an easy game against the isolated d4-pawn." },
        { san: "Bd3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit d4; the bishop on d3 defends it and blocks the queen.", why: "The bishop points at h7 but you have not castled yet." },
        { san: "a3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — develop; a3 was spent stopping a check you were not planning.", why: "Prevents ...Bb4 at the cost of a move." },
        { san: "Bb5+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block; the bishop retreats and you have developed with the block.", why: "A check that gains nothing." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 Bc4")]: {
      yourMove: { san: "Nc6", why: "Develop with two threats: d4 and e5 are both hit, and the knight on d5 is perfectly safe behind the e6-pawn." },
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 Bc4 Nc6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Be7", howToAnswer: "...Be7 — develop and castle next; ...dxe5 only when it helps.", why: "The main line. White gets the king safe and keeps the tension." },
        { san: "Qe2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle — the queen on e2 cannot hold both d4 and e5 forever.", why: "Defends e5 with the queen." },
        { san: "exd6", verdict: "good", answer: "Bxd6", howToAnswer: "...Bxd6 — develop with the recapture, then castle and aim at the isolated d4-pawn.", why: "Trading the e5-pawn away." },
        { san: "Bxd5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 — you have the two bishops and White's e5-pawn is now the weak one.", why: "Giving up a bishop for a knight for no reason." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 — trade; White's queenside pawns are a mess.", why: "Developing into an exchange that damages White's pawns." },
        { san: "a3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle — White is behind in development now.", why: "A slow prophylactic move." },
        { san: "Bg5", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 — offer the trade; the pin on nothing is not a threat.", why: "A bishop move with no target on f6." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 Bc4 Nc6 O-O")]: {
      yourMove: { san: "Be7", why: "Develop and prepare to castle. The tension on e5 can wait; your pieces are coming out faster than White's." },
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 Bc4 Nc6 O-O Be7")]: {
      replies: [
        { san: "exd6", verdict: "good", answer: "Qxd6", howToAnswer: "...Qxd6 — the queen sits on the d-file eyeing the isolated d4-pawn. Castle next.", why: "The main line. White trades off the advanced pawn." },
        { san: "Qe2", verdict: "good", answer: "O-O", howToAnswer: "...O-O — castle; ...dxe5 and ...Nb4 or ...Nf4 come later.", why: "Holding e5 with the queen." },
        { san: "Re1", verdict: "good", answer: "O-O", howToAnswer: "...O-O — king safe. Then ...Bd7 and ...Rc8 on the half-open file.", why: "Supporting e5 with the rook." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 dxe5 — trade and take; White's queenside pawns are wrecked.", why: "Hits the knight and allows a trade that damages White's structure." },
        { san: "Bb3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — castle; nothing has changed.", why: "Retreating before being asked." },
        { san: "Bxd5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 — the bishop pair and a target on e5.", why: "Giving up the bishop that was White's best piece." },
        { san: "a3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — castle and get on with it.", why: "Slow." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 Bc4 Nc6 O-O Be7 exd6")]: {
      yourMove: { san: "Qxd6", why: "The queen recaptures and looks straight at d4. White's centre is now one isolated pawn, and your rook will join the queen on the d-file." },
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 Bc4 Nc6 O-O Be7 exd6 Qxd6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 O-O — trade, castle, then ...Rd8 and ...b6, ...Bb7 aim at d4.", why: "The main line. White gets active pieces for the weak pawn." },
        { san: "Re1", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Rd8 — every Black piece looks at d4.", why: "Natural development." },
        { san: "Qe2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — castle; ...Nf4 or ...Nb4 will find the queen.", why: "The queen on e2 is a target for knight hops." },
        { san: "Bxd5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 — the bishop pair, and d4 is still weak.", why: "Trading the good bishop for a knight." },
        { san: "Bg5", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — if Bxe7 then ...Ncxe7 or ...Qxe7; nothing changes.", why: "A bishop move that invites a harmless trade." },
        { san: "Nbd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...Rd8 and ...Bd7.", why: "The knight blocks its own bishop." },
      ],
    },

    // --- 2.d4: the Smith-Morra, declined into the Alapin ------------------------
    [P("e4 c5 d4")]: {
      yourMove: { san: "cxd4", why: "Take. Whatever White planned, the trade is yours, and you can decline any gambit that follows with ...Nf6." },
      mistakes: [
        { san: "d6", why: "3.dxc5 and your c-pawn is simply gone. ...Qa5+ gets it back eventually, but White is ahead in development. Take first." },
        { san: "e6", why: "3.d5 and White has the space and the pawn on d4 never gets traded. Take first." },
      ],
    },
    [P("e4 c5 d4 cxd4")]: {
      replies: [
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — decline. After e5 Nd5 you are in the Alapin line you already know.", why: "The Smith-Morra Gambit. Taking is fine in theory; declining means no theory at all." },
        { san: "Qxd4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — kick the queen and develop.", why: "The queen comes out early and gets chased." },
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — develop; after Nxd4 Nf6 Nc3 you are in an Open Sicilian.", why: "Usually just transposes to the main lines." },
        { san: "Bc4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hold the pawn and develop; ...e6 shuts the bishop out next.", why: "A bishop out before the pawn is recovered." },
        { san: "c4", verdict: "bad", answer: "Nc6", howToAnswer: "...Nc6 — the pawn is yours to keep; ...e5 next makes it permanent.", why: "White gives up on ever getting the pawn back." },
      ],
    },
    [P("e4 c5 d4 cxd4 c3")]: {
      yourMove: { san: "Nf6", why: "Decline the gambit by hitting e4. After e5 Nd5 you have reached the Alapin position you already know, and White's gambit has become an ordinary game." },
      mistakes: [{ san: "dxc3", why: "Not losing, but you have accepted exactly the position White spent a pawn to get: Nxc3, Bc4, Qe2, Rd1 and a lot of pressure to know about. ...Nf6 keeps things simple." }],
    },
    [P("e4 c5 d4 cxd4 c3 Nf6")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nd5", howToAnswer: "...Nd5 — the Alapin position. ...e6 and ...d6 follow.", why: "The only way to keep the gambit spirit; now it is just the Alapin." },
        { san: "cxd4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn. ...d5 next holds the knight.", why: "Recaptures a pawn and drops another." },
        { san: "Qxd4", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — hit the queen; ...e5 next.", why: "Queen out, queen chased." },
        { san: "Nf3", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — take. If Qa4+ then ...Nc6 covers everything.", why: "Ignores e4. The Qa4+ trick does not work here: after ...Nc6 your own pawn on d4 blocks the queen's path back to e4." },
        { san: "Bd3", verdict: "dubious", answer: "dxc3", howToAnswer: "...dxc3 Nxc3 Nc6 — a pawn up and developing.", why: "Defends e4 but hangs c3." },
      ],
    },

    // --- 2.Nf3 d6 3.Bb5+: the Moscow variation --------------------------------------
    [P("e4 c5 Nf3 d6 Bb5+")]: {
      yourMove: { san: "Bd7", why: "Block with the bishop you need least. White usually takes, and ...Qxd7 puts the queen on a useful square with the rest of your development untouched." },
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7")]: {
      replies: [
        { san: "Bxd7+", verdict: "good", answer: "Qxd7", howToAnswer: "...Qxd7 — recapture with the queen; then ...Nc6, ...Nf6, ...e6.", why: "The main line. White trades the bishop to keep the position calm." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop; if Bxd7+ then ...Qxd7 as usual.", why: "Preparing d4 but leaving the bishop to be traded on your terms." },
        { san: "O-O", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Nc6 or ...a6 — the bishop will have to decide.", why: "Castling first and leaving the trade for later." },
        { san: "Qe2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop; the queen on e2 blocks the bishop's retreat.", why: "Defending the bishop with the queen." },
        { san: "a4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 and ...Nc6 — a4 developed nothing.", why: "Holding the bishop on b5 with a pawn." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop; ...a6 later asks the bishop the question.", why: "Normal development." },
        { san: "d4", verdict: "bad", answer: "Bxb5", howToAnswer: "...Bxb5 — a free bishop. Nothing on the board defends b5.", why: "White forgot the bishop was only defended by the check." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 — take; if Nxe5 then ...Bxb5 wins the bishop, so White is a pawn down for nothing.", why: "A pawn push while the bishop hangs to ...Bxb5 the moment the knight leaves f3." },
      ],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+")]: {
      yourMove: { san: "Qxd7", why: "Recapture with the queen so the b8-knight keeps c6. The queen on d7 covers the d-file and is never in the way." },
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — knight first, so that e5 never hits a knight on f6 with your queen behind it.", why: "The main line. White castles and prepares c3 and d4." },
        { san: "c4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Nf6 and ...g6 — a Maroczy bind without White's bishop.", why: "Grabbing d5 with a pawn." },
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Nc6 and ...e6; ...cxd4 the moment d4 arrives.", why: "Preparing d4." },
        { san: "d4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 — take; after Qxd4 or Nxd4 play ...Nf6 and ...Nc6.", why: "The Open Sicilian with the light bishops gone, which suits you." },
        { san: "Nc3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 and ...Nf6 — normal development.", why: "Natural." },
        { san: "Qe2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, ...Nf6, ...e6.", why: "The queen defends e4 before it is attacked." },
      ],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O")]: {
      yourMove: { san: "Nc6", why: "The knight first. With it on c6, a later e5 push is never a threat to a knight on f6, and d4 is contested." },
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6")]: {
      replies: [
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — develop; ...e6 and ...Be7 come next.", why: "The main line: White prepares d4." },
        { san: "Re1", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 — do not take on e4 while a rook stands behind it.", why: "The rook supports e4 and a later e5." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 — the bind without a light bishop is comfortable.", why: "The Maroczy setup." },
        { san: "d4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Nxd4 Nf6 — an Open Sicilian with the bishops traded.", why: "Playing d4 without c3 gives up the pawn centre." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop; ...e6 and ...Be7 next.", why: "Natural." },
        { san: "h3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 and ...e6.", why: "A slow move." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...Be7.", why: "A fianchetto with nothing to hit." },
      ],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3")]: {
      yourMove: { san: "Nf6", why: "Develop and hit e4. If e5 comes, ...dxe5 wins a pawn because the d-file opens onto White's queen." },
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6")]: {
      replies: [
        { san: "Re1", verdict: "good", answer: "e6", howToAnswer: "...e6 — solid. ...Be7 and castle; ...cxd4 when d4 comes.", why: "The main line. The rook defends e4 and prepares d4." },
        { san: "d4", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 cxd4 d5 — take, then block the centre and hop to e4 after e5.", why: "White opens the centre." },
        { san: "Qe2", verdict: "dubious", answer: "e6", howToAnswer: "...e6 and ...Be7.", why: "Defends e4 with the queen." },
        { san: "h3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...Be7, castle.", why: "Slow." },
        { san: "d3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...Be7, castle — a quiet game where you are fully developed.", why: "Gives up on d4." },
        { san: "Na3", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — the knight on a3 is going nowhere useful.", why: "A knight on the rim." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 — a pawn up. If Nxe5 then ...Nxe5 and the d-file is open onto White's queen.", why: "The push loses a pawn at least: after ...dxe5 the queens face each other and nothing recaptures." },
      ],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 Re1")]: {
      yourMove: { san: "e6", why: "Solid. It prepares ...Be7 and castling, and it keeps the d5 square covered for later." },
      mistakes: [{ san: "Nxe4", why: "8.Rxe4 — a knight for a pawn. The rook on e1 is exactly why e4 is not free." }],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 Re1 e6")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "cxd4", howToAnswer: "...cxd4 — take; after cxd4 play ...d5 and the knight hops to e4 after e5.", why: "The main line." },
        { san: "d3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle — a quiet game.", why: "Slow." },
        { san: "h3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, castle.", why: "Slow." },
        { san: "Na3", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, castle.", why: "A knight on the rim." },
        { san: "Qe2", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Prepares d4 slowly." },
        { san: "a4", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle.", why: "Nothing to do with the centre." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 Nxe5 Nxe5 Rxe5 — trades, and your development is complete.", why: "A push that just trades pieces." },
      ],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 Re1 e6 d4")]: {
      yourMove: { san: "cxd4", why: "Take, as always. Then ...d5 blocks the centre and your knight gets e4 after White's e5." },
      mistakes: [
        { san: "Be7", why: "9.d5 and the knight on c6 is kicked while the centre closes in White's favour. Take on d4 first." },
        { san: "Nxe4", why: "9.Rxe4 — the rook is on e1." },
      ],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 Re1 e6 d4 cxd4")]: {
      replies: [
        { san: "cxd4", verdict: "good", answer: "d5", howToAnswer: "...d5 — block the centre; after e5 Ne4 the knight is a rock.", why: "The main line." },
        { san: "Nxd4", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7 and castle — an Open Sicilian without light bishops.", why: "Gives up the pawn centre." },
        { san: "Qxd4", verdict: "bad", answer: "Nxd4", howToAnswer: "...Nxd4 — the queen for a knight.", why: "The knight on c6 was looking at d4 all along." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 Nxe5 Nxe5 Rxe5 dxc3 — you come out a pawn up.", why: "Pushing while d4 is still hanging." },
        { san: "Bg5", verdict: "dubious", answer: "dxc3", howToAnswer: "...dxc3 Nxc3 Be7 — a pawn up.", why: "Ignores the pawn." },
        { san: "Na3", verdict: "dubious", answer: "dxc3", howToAnswer: "...dxc3 bxc3 Be7 — a pawn up and White's pawns are a mess.", why: "The knight develops to the wrong square while a pawn hangs." },
      ],
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 Re1 e6 d4 cxd4 cxd4")]: {
      yourMove: { san: "d5", why: "Block the centre. White's e5 will come, and your knight lands on e4 in front of it, a square nothing can take it from." },
    },
    [P("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 Re1 e6 d4 cxd4 cxd4 d5")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Ne4", howToAnswer: "...Ne4 — the knight is a rock. After Nbd2 Nxd2 Bxd2 Be7 and castle.", why: "The main line. A French-style centre where you have no bad bishop." },
        { san: "exd5", verdict: "dubious", answer: "Nxd5", howToAnswer: "...Nxd5 — the knight is centralised and d4 is isolated.", why: "Opens the position when Black is better developed." },
        { san: "Nc3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 Nxe4 Nxe4 Rxe4 Be7 — trades, and the d4-pawn is isolated.", why: "Lets you trade into a comfortable position." },
        { san: "Nbd2", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 Nxe4 Nxe4 Rxe4 Be7 — same trades.", why: "Same idea, same answer." },
        { san: "Bg5", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — take; if Bxf6 gxf6 you have the bishops and the pawn.", why: "Develops while the centre falls." },
      ],
    },

    // --- 2.Nc3: the Closed Sicilian and the Grand Prix ----------------------------
    [P("e4 c5 Nc3")]: {
      yourMove: { san: "d6", why: "Flexible. If Nf3 and d4 follow you are in the Open Sicilian; if f4 comes, ...Nc6, ...g6 and ...Bg7 is the plan." },
    },
    [P("e4 c5 Nc3 d6")]: {
      replies: [
        { san: "f4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...g6 and ...Bg7 — the fianchetto is the antidote to the Grand Prix.", why: "The Grand Prix Attack. White wants Bc4 or Bb5, f5 and a kingside attack." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — if d4 then ...cxd4 and you are in the main line.", why: "Usually an Open Sicilian by another route." },
        { san: "g3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...g6, ...Bg7, ...e5 — a slow game.", why: "The Closed Sicilian. Nobody attacks for a while." },
        { san: "Nge2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — develop; d4 cxd4 Nxd4 is the main line with an odd move order.", why: "Keeping f4 available." },
        { san: "Bc4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 — the bishop hits a wall.", why: "The bishop comes out before it knows where the pawns go." },
        { san: "Bb5+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — block; the trade costs you nothing.", why: "A check with no follow-up." },
        { san: "d4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nc6 — kick the queen and develop.", why: "Without Nf3 the recapture has to be with the queen." },
      ],
    },
    [P("e4 c5 Nc3 d6 f4")]: {
      yourMove: { san: "Nc6", why: "Develop toward d4 and prepare ...g6. Not ...Nf6 yet: e5 would kick it." },
      mistakes: [{ san: "Nf6", why: "4.Nf3 and then e5 kicks the knight with tempo. Against f4 the knight waits; ...Nc6 and ...g6 first." }],
    },
    [P("e4 c5 Nc3 d6 f4 Nc6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "g6", howToAnswer: "...g6, then ...Bg7 — the bishop covers everything f4 loosened.", why: "The main Grand Prix. Bc4 or Bb5 next." },
        { san: "Bb5", verdict: "good", answer: "Bd7", howToAnswer: "...Bd7 — block the pin; ...g6 and ...Bg7 follow.", why: "Pinning the knight to swap it off." },
        { san: "Bc4", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — shut the bishop out of f7; ...Nf6 and ...Be7 or ...g6 next.", why: "The bishop aims at f7 while the centre is open." },
        { san: "g3", verdict: "dubious", answer: "g6", howToAnswer: "...g6, ...Bg7 — mirror the fianchetto.", why: "Slow." },
        { san: "d4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Qxd4 Nf6 — kick the queen with development.", why: "Recapturing with the queen invites ...Nf6." },
      ],
    },
    [P("e4 c5 Nc3 d6 f4 Nc6 Nf3")]: {
      yourMove: { san: "g6", why: "The fianchetto. The g7-bishop covers d4 and the dark squares White's f-pawn has abandoned, and it points at b2 for later." },
      mistakes: [{ san: "e5", why: "4...e5 lets Bb5 pin and fxe5 open the f-file on your king. Keep the pawn on e6 or e7 and put the bishop on g7 instead." }],
    },
    [P("e4 c5 Nc3 d6 f4 Nc6 Nf3 g6")]: {
      replies: [
        { san: "Bc4", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, then ...e6 and ...Nge7 — the bishop on c4 is shut out.", why: "The main Grand Prix bishop, aimed at f7." },
        { san: "Bb5", verdict: "good", answer: "Bd7", howToAnswer: "...Bd7 — block; then ...Bg7 and castle.", why: "White wants Bxc6 to weaken your pawns." },
        { san: "d4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 Nxd4 Bg7 — an Open Sicilian where White's f-pawn is already committed.", why: "Opening the centre a move late." },
        { san: "d3", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7, ...Nf6, castle.", why: "Solid." },
        { san: "Be2", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 and castle; the bishop on e2 is passive.", why: "Quiet development." },
      ],
    },
  },

  traps: [
    {
      name: "The e4-pawn is poisoned",
      sans: sans("1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 Nxe4 6.Nxe4"),
      punisher: "white",
      tell: "Your knight on f6 stares at e4 and nothing seems to guard it.",
      why: "The c3-knight does. After ...Nxe4 Nxe4 you have given a knight for a pawn on move five. This is the single most common Sicilian blunder under 1200, and it repeats: the same pawn looks free after Be2, after Nb3, after castling. It never is while a knight sits on c3.",
    },
    {
      name: "The greedy Alapin pawn",
      sans: sans("1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.Nf3 dxc3 6.Qxd5"),
      punisher: "white",
      tell: "You have a pawn on d4, White has just played Nf3, and c3 is there for the taking.",
      why: "Taking on c3 opens the d-file, and your knight on d5 has no defender yet. Qxd5 takes it for free. Play ...e6 first: it guards the knight, and then ...dxc3 or ...d6 are both fine.",
    },
    {
      name: "The knight that forgot about a6",
      sans: sans("1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be2 e5 7.Ndb5 axb5"),
      punisher: "black",
      tell: "You play ...e5, the knight on d4 is attacked, and White remembers that knights like b5 in the Sicilian.",
      why: "That is exactly what ...a6 was for. The knight hops to b5 and the a-pawn takes it. The other ways White can lose the piece here are just as common: Bg5, Be3 or castling while the knight is attacked all lose it to ...exd4.",
    },
  ],

  modelGames: [
    {
      label: "Najdorf main line: the setup, then the ...d5 break",
      sans: sans("e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be2 e5 Nb3 Be7 O-O O-O Be3 Be6 f4 exf4 Bxf4 Nc6 Kh1 d5 exd5 Nxd5"),
      summary: "The whole setup in order: ...d6, ...Nf6, ...a6, ...e5, ...Be7, castle, ...Be6. When White breaks with f4 you take, develop the last knight, and the ...d5 break frees your game completely.",
    },
    {
      label: "Alapin: dismantle the centre",
      sans: sans("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 e6 cxd4 d6 Bc4 Nc6 O-O Be7 exd6 Qxd6 Nc3 Nxc3 bxc3 O-O"),
      summary: "...Nf6 makes White push e5, ...cxd4 and ...d6 hit the centre, and after exd6 Qxd6 the queen looks at an isolated d4-pawn. Castle, ...Rd8, ...b6 and ...Bb7 all point the same way.",
    },
    {
      label: "Moscow: trade the bishop and block the centre",
      sans: sans("e4 c5 Nf3 d6 Bb5+ Bd7 Bxd7+ Qxd7 O-O Nc6 c3 Nf6 Re1 e6 d4 cxd4 cxd4 d5 e5 Ne4 Nbd2 Nxd2 Bxd2 Be7"),
      summary: "Block the check, recapture with the queen, develop normally. When d4 comes you take, block with ...d5, and the knight on e4 is a rock until it trades itself for White's best piece.",
    },
  ],

  middlegamePlan:
    "After the setup the pieces have fixed jobs: the queen goes to c7 and a rook to c8, so the half-open c-file is always yours; the light bishop sits on e6 guarding d5, the hole your ...e5 created; the queen's knight goes to d7 and later b6 or c5. " +
    "White will attack on the kingside with f4 or g4 and pieces behind them. Do not sit and wait for it. Your play is the other wing: ...b5 and ...b4 to kick the c3-knight, and the ...d5 break once enough pieces cover the square. " +
    "Never grab e4 while a knight is on c3 or a rook is on e1. Trade off White's pieces that want to sit on d5, and remember the endgame usually favours you: your queenside majority makes a passed pawn, White's does not.",

  structureDiagram: {
    fen: "rnbq1rk1/1p2bppp/p2p1n2/4p3/4P3/1NN5/PPP1BPPP/R1BQ1RK1 w - - 4 9",
    orientation: "black",
    arrows: [
      { from: "b7", to: "b5" },
      { from: "c8", to: "e6" },
    ],
    caption: "The Najdorf picture: pawns on a6, d6 and e5, the half-open c-file for the queen and a rook, the bishop heading to e6 to guard d5, and ...b5 as the queenside break while White attacks on the other wing.",
  },
};
