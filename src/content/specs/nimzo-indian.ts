// Nimzo-Indian Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.
//
// One pin does the work. ...Bb4 ties the c3-knight to the king so that e4 never
// comes, and if White spends a move on a3 to ask the question, you take on c3
// and leave them with doubled c-pawns to play against for the rest of the game.
// We teach three answers to three White setups: the Rubinstein (4.e3: castle,
// ...d5, ...c5), the Classical (4.Qc2: castle, take when asked, ...b6 and ...Bb7)
// and the Sämisch (4.a3: take at once, ...c5, castle, hit c4).

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const nimzoIndian: OpeningSpec = {
  id: "nimzo-indian",
  name: "Nimzo-Indian Defence",
  aliases: ["Nimzo", "Nimzo Indian"],
  eco: "E20–E59",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4",
  tabiyaFen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
  pitch:
    "One pin on move three stops White's centre in its tracks: the bishop on b4 ties down the knight that was going to support e4. " +
    "You get a solid position with no weak pawns, a clear plan against every White setup, and the chance to leave them with doubled c-pawns that you attack for the rest of the game.",

  setup: {
    pieces: [
      { piece: "B", squares: ["b4"], why: "The Nimzo bishop. It pins the c3-knight against the king so e4 cannot be supported. It only leaves b4 to take on c3, and only when White has spent a move to ask." },
      { piece: "N", squares: ["f6"], why: "The king's knight covers e4 and d5. With the bishop pinning c3, e4 is now watched twice and White cannot play it without preparation." },
      { piece: "N", squares: ["c6", "d7", "a6"], why: "The queen's knight hits d4 from c6, or goes to d7 to support ...c5 and ...e5. If White's c-pawns are doubled, a5 is where it lands to hit c4." },
      { piece: "B", squares: ["b7", "a6", "d7"], why: "The light bishop fights for e4 from b7 after ...b6, or goes to a6 to hit a doubled c4-pawn straight on." },
      { piece: "Q", squares: ["c7", "e7"], why: "The queen sits behind the c-pawn on c7 eyeing h2 and c4, or on e7 backing the ...e5 break." },
    ],
    pawns: ["e6", "c5"],
    order: [
      {
        before: "Nf6",
        after: "Bb4",
        why: "Knight first. ...Bb4+ with no knight on c3 to pin is a check into thin air: Bd2 or Nc3 blocks it and a3 chases the bishop back having achieved nothing.",
      },
    ],
    castle: "O-O",
    castleBy: 6,
  },

  ideas: [
    {
      id: "nimzo-pin-is-about-e4",
      title: "The pin is about e4",
      oneLiner: "...Bb4 stops the c3-knight from supporting e4. That is the whole idea.",
      why: "White's dream after 1.d4 and 2.c4 is e4: two centre pawns side by side. The c3-knight is what makes e4 possible, and the pin takes it out of the game. While the bishop sits on b4, White has to find another way to support e4 (Qc2, f3, Bd3 and Nge2) and each one costs time you use to castle and strike with ...d5 or ...c5.",
    },
    {
      id: "nimzo-take-when-asked",
      title: "Take on c3 only when asked",
      oneLiner: "When a3 comes, ...Bxc3+. Never retreat the bishop, and don't trade it for free.",
      why: "The trade bishop-for-knight is a fair deal only if White pays: either with doubled pawns after bxc3, or with a wasted move on a3. Taking without being asked gives White the bishop pair for nothing. Retreating along the diagonal after a3 is worse: b4 and c5 can trap the bishop. When a3 appears, take, every time.",
      trigger: { kind: "opponent_san", sans: ["a3"] },
      response: "...Bxc3+ (or ...Bxc3 if the king has castled).",
      ifIgnored: "...Ba5 walks into b4 and c5, and ...Be7 has wasted two bishop moves to reach a square it could have gone to in one.",
    },
    {
      id: "nimzo-doubled-pawns",
      title: "Doubled c-pawns: blockade, then hit c4",
      oneLiner: "After bxc3, put a pawn on c5, a knight on a5 or c6, and a bishop on a6. The c4-pawn is the target.",
      why: "White's pawns on c3 and c4 cannot defend each other, and the front one on c4 is stuck. ...c5 fixes them, ...Nc6 or ...Na5 and ...Ba6 pile onto c4, and ...d6 with ...e5 makes sure d4 cannot advance to relieve the pressure. White has the bishop pair; you have a target that never goes away.",
      trigger: { kind: "epd", epds: [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3"), P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ bxc3")] },
      response: "...c5, then ...Nc6, ...b6 and ...Ba6.",
    },
    {
      id: "nimzo-vs-e3",
      title: "Against e3: castle, ...d5, ...c5",
      oneLiner: "The Rubinstein is quiet. Castle, then hit the centre with both pawns and keep the bishop.",
      why: "4.e3 is White's most common and most sensible move: it develops without committing. You answer with the most classical plan in chess. ...O-O for safety, ...d5 to fight for the centre, ...c5 to hit d4, and ...Nc6 to hit it again. The bishop stays on b4 until a3 asks it to leave.",
      trigger: { kind: "opponent_san", sans: ["e3"] },
      response: "...O-O, then ...d5 and ...c5.",
    },
    {
      id: "nimzo-vs-qc2",
      title: "Against Qc2: castle, take when asked, fianchetto",
      oneLiner: "The queen guards c3 so the pawns stay healthy. Fight for e4 with ...b6 and ...Bb7 instead.",
      why: "4.Qc2 means White will recapture on c3 with the queen and keep a clean structure, at the cost of a slow queen move. There are no doubled pawns to attack, so the plan changes: castle, take when a3 comes, then ...b6 and ...Bb7 to fight for e4 and d5 with the bishop. Watch for e4 played too early: the queen on c3 does not guard it.",
      trigger: { kind: "opponent_san", sans: ["Qc2"] },
      response: "...O-O, then after a3 Bxc3+ Qxc3, ...b6 and ...Bb7.",
    },
    {
      id: "nimzo-e4-not-free",
      title: "e4 is not free for them either",
      oneLiner: "When White pushes e4 without support, check who guards it. Often nothing does.",
      why: "White wants e4 so badly that it often comes a move too soon: after Qxc3 the queen does not see e4, and after Bd3 the bishop blocks the queen's view of d4. Every time a centre pawn advances, count its defenders before you decide it is safe. Half the Nimzo's free pawns come this way.",
      trigger: { kind: "opponent_san", sans: ["e4"] },
      response: "Count defenders of e4 and d4. If one is short, take.",
    },
    {
      id: "nimzo-book-end",
      title: "When the book runs out",
      oneLiner: "Doubled pawns? Hit c4. Healthy pawns? ...d5, ...c5 and play for e4.",
      why: "The plan depends on one question: did White's pawns get doubled? If yes, everything goes at c4: ...c5, ...Na5, ...Ba6, ...Qc7, and ...e5 to keep d4 from moving. If no, play a normal centre game with the extra piece on the board: ...d5 and ...c5 to open lines, a knight to e4 if it is safe, and the b7-bishop on the long diagonal. Either way, stay solid; the Nimzo wins slowly.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...Bb4 once a knight lands on c3.", why: "The main move; the Nimzo answers it." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6 — after Nc3 and d4 it is a Nimzo by transposition.", why: "The English. Your setup usually transposes." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6 — then ...Bb4+ if Nc3 arrives, or ...b6 and ...Bb7 if it doesn't.", why: "Flexible. White may avoid Nc3, in which case you fight for e4 with the light bishop instead." },
        { san: "e4", verdict: "good", answer: "e6", howToAnswer: "...e6 — the French. Same pawn, same fight for d4 and e4, and ...Bb4 still appears after Nc3.", why: "Not a Nimzo game, but the French is its closest relative." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 — take the centre they have not claimed.", why: "Quiet." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6 — then ...Bb4 as soon as d4 is on the board.", why: "Usually transposes." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 — take the centre they ignored.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 — Bird's Opening; a normal centre beats it.", why: "It loosens their king for no gain." },
      ],
    },

    [P("d4")]: { yourMove: { san: "Nf6", why: "Develop and cover e4. The d-pawn stays home so the position stays flexible." } },

    [P("d4 Nf6")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "e6", howToAnswer: "...e6 — opening the bishop's road to b4.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6 — if c4 then ...Bb4+ (Bogo-Indian) or ...b6 (Queen's Indian); if Nc3 then ...Bb4.", why: "White keeps options. So do you." },
        { san: "Bf4", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...d5, ...c5 and ...Bd6 — the London.", why: "Solid and slow." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — if Bxf6 Qxf6 you have a fine position and no pin.", why: "The Trompowsky. ...e6 unpins at once." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — stop e4; then ...e6 and ...Bb4 or ...Be7.", why: "The Veresov. Take e4 away with a pawn." },
        { san: "e3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...d5, ...c5 — normal moves.", why: "Passive." },
        { san: "g3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...d5 — the Catalan-shaped game; ...Be7 and ...O-O.", why: "A fianchetto." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn.", why: "Nothing defends e4." },
        { san: "c3", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...d5, ...c5.", why: "Timid." },
      ],
    },
    [P("d4 Nf6 c4")]: {
      yourMove: { san: "e6", why: "Open the diagonal for the f8-bishop so it can reach b4 the moment a knight appears on c3." },
    },
    [P("d4 Nf6 c4 e6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — the Nimzo. The knight is pinned and e4 is off.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "Bb4+", howToAnswer: "...Bb4+ — the Bogo-Indian. Same bishop, same idea; after Bd2 either ...Bxd2+ or ...Qe7 keeping it.", why: "White avoids the Nimzo pin by not putting a knight on c3." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5 — the Catalan. Take the centre; ...Be7, ...O-O and ...dxc4 later.", why: "White's bishop will look at your queenside from g2." },
        { san: "Bg5", verdict: "dubious", answer: "Bb4+", howToAnswer: "...Bb4+ — after Nc3 it is a Nimzo with their bishop out early; after Nd2, ...c5 or ...h6.", why: "A pin before you have anything to unpin with." },
        { san: "e3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — take the centre while White is slow; ...c5 next.", why: "Shuts in the c1-bishop." },
        { san: "Bf4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...c5, ...Bd6 — the bishop on f4 is a target for ...Bd6 and ...Nh5.", why: "A London without the London setup." },
        { san: "a3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — White spent a move stopping ...Bb4. Use it to hit the centre.", why: "A whole move to prevent a pin." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3")]: {
      yourMove: { san: "Bb4", why: "The Nimzo-Indian. The bishop pins the knight to the king, so e4 has no support and White must spend moves working around it." },
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "O-O", howToAnswer: "...O-O — then ...d5 and ...c5. The Rubinstein.", why: "White's most common and most solid choice." },
        { san: "Qc2", verdict: "good", answer: "O-O", howToAnswer: "...O-O — then after a3 Bxc3+ Qxc3 you play ...b6 and ...Bb7. The Classical.", why: "The queen guards c3 so the pawns stay healthy. It costs White a slow queen move." },
        { san: "a3", verdict: "good", answer: "Bxc3+", howToAnswer: "...Bxc3+ bxc3 c5 — take at once and start hitting the doubled pawns. The Sämisch.", why: "White asks the question immediately and accepts the doubled pawns." },
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...d5 or ...c5 and ...b6.", why: "Flexible development." },
        { san: "Bg5", verdict: "good", answer: "h6", howToAnswer: "...h6 — kick it; after Bh4, ...c5 hits d4 while your knight is pinned only against the queen.", why: "The Leningrad Variation. A pin against your knight to answer yours." },
        { san: "Qb3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4; if dxc5 then ...Nc6 develops and c5 falls later.", why: "The queen defends c3 from b3 but is exposed to ...Nc6 and ...Na5." },
        { san: "f3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — strike before e4 arrives; cxd5 exd5 leaves e4 impossible.", why: "Preparing e4 with a pawn move. It weakens the king." },
        { san: "g3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 while the bishop is still on f1.", why: "A slow fianchetto that leaves d4 short of support." },
        { san: "Bd2", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...d5 — the bishop on d2 blocks their queen and does nothing else.", why: "Unpinning with the wrong piece." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — the pawn had no support. If Qg4 then ...Nxc3 and ...d5.", why: "The move the pin exists to prevent, played anyway." },
      ],
    },

    // --- Rubinstein: 4.e3 ---------------------------------------------------------------
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3")]: {
      yourMove: { san: "O-O", why: "King safe before the centre opens. ...d5 and ...c5 come next, and the bishop stays on b4 until a3 asks it to leave." },
      mistakes: [{ san: "Bxc3+", why: "Nobody asked. White gets the bishop pair without spending a move on a3. Take only when a3 forces the decision." }],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "d5", howToAnswer: "...d5 — fight for the centre; ...c5 next.", why: "Main line. The bishop eyes h7, which is why castling first matters." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...c5 — same plan.", why: "Normal." },
        { san: "Ne2", verdict: "good", answer: "d5", howToAnswer: "...d5 — the knight on e2 means a3 will hit the bishop; ...Be7 then, keeping it.", why: "The Reshevsky Variation: a3 will come and White wants to recapture with the knight." },
        { san: "a3", verdict: "good", answer: "Bxc3+", howToAnswer: "...Bxc3+ bxc3 — then ...c5, ...d6, ...Nc6 and ...e5 against the doubled pawns.", why: "Asking the question." },
        { san: "Bd2", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...c5 — the bishop on d2 blocks the d-file for their own queen.", why: "Passive unpin." },
        { san: "Qc2", verdict: "good", answer: "d5", howToAnswer: "...d5 — the same plan; if cxd5 exd5.", why: "Guarding c3 and e4 with the queen." },
        { san: "Qb3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4; ...Nc6 and ...Na5 will chase the queen.", why: "Early queen." },
        { san: "f3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — before e4 arrives.", why: "Slow and loosening." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3")]: {
      yourMove: { san: "d5", why: "Fight for the centre with a pawn. It also blunts the bishop on d3, which was looking at h7." },
      mistakes: [
        { san: "Ne4", why: "The bishop on d3 takes it for free. Nothing defends e4 yet." },
        { san: "Bxc3+", why: "Still nobody asked. Keep the bishop until a3." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "c5", howToAnswer: "...c5 — the second pawn hits d4. ...Nc6 next.", why: "Main line." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — keep a pawn on d5 and open the c8-bishop.", why: "Simplifying the centre." },
        { san: "a3", verdict: "good", answer: "Bxc3+", howToAnswer: "...Bxc3+ bxc3 dxc4 Bxc4 c5 — take, grab c4, then hit d4.", why: "Asking the question." },
        { san: "Ne2", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 Bxc4 c5 — the bishop has to recapture and d4 is hit.", why: "White wants to recapture on c3 with the knight." },
        { san: "Qc2", verdict: "good", answer: "c5", howToAnswer: "...c5 — same plan.", why: "Normal." },
        { san: "Bd2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 while their pieces are tangled.", why: "Passive." },
        { san: "Qb3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — then ...Nc6 and ...Na5 against the queen.", why: "Early queen." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3")]: {
      yourMove: { san: "c5", why: "The second strike at d4. Now both your centre pawns are hitting White's, and the game is a classical centre fight where you have no weaknesses." },
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — a third piece on d4. Then a3 Bxc3 bxc3 dxc4 Bxc4 Qc7 is the main line.", why: "The main line." },
        { san: "a3", verdict: "good", answer: "Bxc3+", howToAnswer: "...Bxc3+ bxc3 dxc4 Bxc4 — then ...Qc7 or ...Nc6.", why: "Asking the question." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — keep the centre; ...Nc6 next.", why: "Simplifying." },
        { san: "dxc5", verdict: "good", answer: "Bxc5", howToAnswer: "...Bxc5 — the bishop lands on a better diagonal than b4.", why: "Releasing tension." },
        { san: "Bd2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — keep hitting d4.", why: "Passive." },
        { san: "Qc2", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — normal.", why: "Normal." },
        { san: "h3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — a free move for you; keep developing.", why: "A pawn move that does nothing." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O")]: {
      yourMove: { san: "Nc6", why: "Develop and add a third attacker on d4. White's centre is now under more pressure than yours." },
      mistakes: [{ san: "cxd4", why: "Releasing the tension gives White a free hand: exd4 and their pieces come to life. Keep hitting d4 with pieces and let White be the one who has to resolve it." }],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6")]: {
      replies: [
        { san: "a3", verdict: "good", answer: "Bxc3", howToAnswer: "...Bxc3 bxc3 dxc4 Bxc4 Qc7 — the main line.", why: "The main line. White gets the bishop pair; you get a target on c3." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — keep the d5-pawn; ...Bg4 or ...Re8 next.", why: "Simplifying." },
        { san: "dxc5", verdict: "good", answer: "Bxc5", howToAnswer: "...Bxc5 — the bishop is better on c5 than b4.", why: "Releasing tension." },
        { san: "Qe2", verdict: "dubious", answer: "dxc4", howToAnswer: "...dxc4 Bxc4 — then ...cxd4 exd4 leaves an isolated d-pawn to play against.", why: "Normal but passive." },
        { san: "h3", verdict: "dubious", answer: "dxc4", howToAnswer: "...dxc4 Bxc4 — and keep developing; the pawn move was free for you.", why: "A tempo wasted." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3")]: {
      yourMove: { san: "Bxc3", why: "Asked, so take. White has to recapture with the pawn and now has c3 and c4 side by side, which cannot defend each other." },
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3")]: {
      replies: [
        { san: "bxc3", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 Bxc4 Qc7 — the main line.", why: "The only recapture that keeps the material level." },
        { san: "Qd2", verdict: "bad", answer: "Bxd2", howToAnswer: "...Bxd2 — the queen for a bishop.", why: "Attacking the bishop with the queen when the bishop can take it." },
        { san: "Rb1", verdict: "bad", answer: "Ba5", howToAnswer: "...Ba5 — keep the extra knight and step out of danger.", why: "White forgot to take back." },
        { san: "Bd2", verdict: "bad", answer: "Bxd2", howToAnswer: "...Bxd2 Qxd2 — you are up a knight.", why: "Trading bishops does not get the knight back." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3")]: {
      yourMove: { san: "dxc4", why: "Take before the bishop settles. White recaptures on c4 and has spent a move; you have a queen move that hits it coming." },
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 dxc4")]: {
      replies: [
        { san: "Bxc4", verdict: "good", answer: "Qc7", howToAnswer: "...Qc7 — the queen eyes c4 and h2; ...e5 next fixes d4.", why: "The main line." },
        { san: "Bxh7+", verdict: "bad", answer: "Nxh7", howToAnswer: "...Nxh7 — the pawn was guarded by your knight and your king.", why: "A bishop for a pawn." },
        { san: "Be2", verdict: "dubious", answer: "Qa5", howToAnswer: "...Qa5 — hit c3; the c4-pawn is still yours until they take it.", why: "Leaving c4 loose to develop somewhere else." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 dxc4 Bxc4")]: {
      yourMove: { san: "Qc7", why: "The queen looks at c4 and along the c-file at the doubled pawn, and ...e5 next stops d4 from advancing. White has two bishops; you have a target." },
    },

    // --- Classical: 4.Qc2 -----------------------------------------------------------------
    [P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2")]: {
      yourMove: { san: "O-O", why: "Castle first. White's queen move guards c3, so there is no rush to take; get the king safe and let a3 come." },
      mistakes: [{ san: "Bxc3+", why: "Qxc3 recaptures with a healthy structure and White has the bishop pair for nothing. Make them spend a move on a3." }],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O")]: {
      replies: [
        { san: "a3", verdict: "good", answer: "Bxc3+", howToAnswer: "...Bxc3+ Qxc3 b6 — then ...Bb7 on the long diagonal.", why: "Main line. White asks and you answer." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5 — fight for the centre; if cxd5 exd5.", why: "Normal development." },
        { san: "e3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...c5.", why: "Transposing toward Rubinstein lines." },
        { san: "Bg5", verdict: "good", answer: "h6", howToAnswer: "...h6 — kick it; after Bh4, ...c5.", why: "The pin against your knight." },
        { san: "e4", verdict: "good", answer: "d5", howToAnswer: "...d5 — hit the centre; if e5 then ...Ne4 sits on your square and ...c5 follows.", why: "Ambitious. The centre is big but it is also a target." },
        { san: "g3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — the fianchetto is slow.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3")]: {
      yourMove: { san: "Bxc3+", why: "Asked, so take. The queen recaptures and White keeps a clean structure, but the queen is now on c3 doing a pawn's job." },
      mistakes: [{ san: "Be7", why: "Two moves to reach e7, and White got a3 for free. The whole point of ...Bb4 was to take when asked." }],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+")]: {
      replies: [
        { san: "Qxc3", verdict: "good", answer: "b6", howToAnswer: "...b6 — then ...Bb7 fights for e4 and d5.", why: "The point of Qc2: healthy pawns." },
        { san: "bxc3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit the doubled pawns; the queen on c2 has gained nothing.", why: "Doubling the pawns after spending a move to avoid it." },
        { san: "Bd2", verdict: "bad", answer: "Bxd2+", howToAnswer: "...Bxd2+ Qxd2 — you are up a knight.", why: "Blocking a check when a recapture was available." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3")]: {
      yourMove: { san: "b6", why: "With no doubled pawns to attack, you fight for e4 with the light bishop instead: ...Bb7 next, and the long diagonal is yours." },
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3 b6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — then ...d6 and ...Nbd7, or ...d5.", why: "Normal." },
        { san: "Bg5", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7 — after f3, ...h6 and ...d5.", why: "The main line. The pin is annoying but harmless." },
        { san: "e3", verdict: "good", answer: "Bb7", howToAnswer: "...Bb7, ...d6, ...Nbd7.", why: "Normal." },
        { san: "f3", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7 — e4 will come, so ...d5 is ready to meet it.", why: "Preparing e4 with a pawn move." },
        { san: "b4", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7 — queenside space does not change your plan.", why: "Slow." },
        { san: "Bf4", verdict: "dubious", answer: "Bb7", howToAnswer: "...Bb7, then ...d6 and ...Nh5 if the bishop stays.", why: "Normal." },
        { san: "e4", verdict: "bad", answer: "Nxe4", howToAnswer: "...Nxe4 — the queen on c3 does not see e4, and nothing else does either.", why: "e4 played too early hangs the pawn." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3 b6 Nf3")]: {
      yourMove: { san: "Bb7", why: "The bishop takes the long diagonal and e4 is watched again. ...d6 and ...Nbd7, or ...d5, complete the setup." },
    },

    // --- Sämisch: 4.a3 ------------------------------------------------------------------
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3")]: {
      yourMove: { san: "Bxc3+", why: "Take. White accepts doubled c-pawns to get the bishop pair and a big centre; your whole game is now the c4-pawn." },
      mistakes: [
        { san: "Ba5", why: "b4 hits it, Bb6 is forced, and c5 traps it. The bishop has no squares left." },
        { san: "Be7", why: "Two bishop moves to reach e7 and White has a3 for free. Take when asked." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+")]: {
      replies: [
        { san: "bxc3", verdict: "good", answer: "c5", howToAnswer: "...c5 — fix the doubled pawns and hit d4.", why: "The Sämisch structure: c3, c4, d4 and the bishop pair." },
        { san: "Bd2", verdict: "bad", answer: "Bxd2+", howToAnswer: "...Bxd2+ Qxd2 — you are up a knight.", why: "Blocking instead of recapturing." },
        { san: "Qd2", verdict: "bad", answer: "Bxd2+", howToAnswer: "...Bxd2+ Bxd2 — a queen and a knight for a bishop.", why: "Blocking with the queen." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3")]: {
      yourMove: { san: "c5", why: "Fix the pawns. The c-pawn stops d4 from advancing freely and makes c4 a permanent target." },
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3 c5")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "O-O", howToAnswer: "...O-O — then ...Nc6, ...b6, ...Ba6 against c4.", why: "Main line." },
        { san: "f3", verdict: "good", answer: "d5", howToAnswer: "...d5 — hit c4 before e4 arrives; cxd5 Nxd5 is fine.", why: "Preparing e4. Strike first." },
        { san: "Nf3", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...d6, ...Nc6 and ...e5.", why: "Normal." },
        { san: "e4", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — then ...Nc6 and ...e5 makes the e4-pawn a target.", why: "The big centre, played without f3 to support it." },
        { san: "d5", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — the pawn on d5 is fixed; ...e5 and ...Nbd7 follow.", why: "Advancing before developing." },
        { san: "Bg5", verdict: "dubious", answer: "h6", howToAnswer: "...h6 — kick it; Bh4 or Bxf6 Qxf6 are both fine for you.", why: "A pin with nothing behind it." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3 c5 e3")]: {
      yourMove: { san: "O-O", why: "King safe. The pawn on c4 is not going anywhere; you have time." },
      mistakes: [{ san: "cxd4", why: "cxd4 repairs their pawns: the doubled c-pawn becomes a healthy d4. The whole point of the Sämisch for you was the target you just removed." }],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3 c5 e3 O-O")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — then ...b6 and ...Ba6 against c4.", why: "Main line." },
        { san: "Ne2", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...b6, ...Ba6 — same plan.", why: "The knight guards c3 and prepares e4." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5 — hit c4; with the knight on f3 the e4 push is slower.", why: "Normal." },
        { san: "f3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — strike before e4.", why: "Preparing e4 with a pawn move." },
        { san: "Qc2", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6, then ...b6 and ...Ba6.", why: "Slow." },
      ],
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3 c5 e3 O-O Bd3")]: {
      yourMove: { san: "Nc6", why: "Develop toward the pawns. The knight hits d4 and can go to a5 to attack c4 whenever the c4-pawn becomes the weakest point." },
    },
    [P("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3 c5 e3 O-O Bd3 Nc6")]: {
      replies: [
        { san: "Ne2", verdict: "good", answer: "b6", howToAnswer: "...b6 — then ...Ba6 hits c4 and ...Ne8 prepares ...f5 or ...d6.", why: "The Botvinnik main line." },
        { san: "Nf3", verdict: "good", answer: "b6", howToAnswer: "...b6, then ...Ba6 against c4.", why: "Normal." },
        { san: "e4", verdict: "dubious", answer: "cxd4", howToAnswer: "...cxd4 cxd4 Nxd4 — the bishop on d3 blocks the queen, so d4 is undefended.", why: "e4 before Ne2 leaves d4 short of a defender." },
        { san: "d5", verdict: "dubious", answer: "Ne5", howToAnswer: "...Ne5 — the knight hits the bishop and sits on a great square.", why: "Advancing the pawn everything was attacking." },
        { san: "Qc2", verdict: "dubious", answer: "b6", howToAnswer: "...b6, then ...Ba6.", why: "Slow." },
        { san: "f3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — hit c4 before e4 arrives.", why: "Loosening the king to prepare e4." },
      ],
    },
  },

  traps: [
    {
      name: "Retreating along the diagonal",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.a3 Ba5 5.b4 Bb6 6.c5"),
      punisher: "white",
      tell: "a3 hits the bishop and you want to keep it rather than trade it.",
      why: "b4 kicks the bishop to b6, c5 attacks it again, and it has no squares: a5 is covered by the pawn on b4, c5 is a pawn, and a7 and c7 are your own pieces. When a3 comes, ...Bxc3+ is the only move.",
    },
    {
      name: "The queen that does not see e4",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.Qc2 O-O 5.a3 Bxc3+ 6.Qxc3 b6 7.e4 Nxe4"),
      punisher: "black",
      tell: "White gets the healthy structure they wanted and pushes e4 out of relief.",
      why: "The queen on c3 looks along the third rank and the long diagonal, and e4 is on neither. Nothing else guards it. A free pawn, and the knight sits on the square the whole opening was about.",
    },
    {
      name: "Bd3 blocks the queen",
      sans: sans("1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.a3 Bxc3+ 5.bxc3 c5 6.e3 O-O 7.Bd3 Nc6 8.e4 cxd4 9.cxd4 Nxd4"),
      punisher: "black",
      tell: "White pushes e4 in the Sämisch before the knight has reached e2.",
      why: "The bishop on d3 sits between the queen and d4. After ...cxd4 cxd4 the pawn on d4 has no defender left, and the knight takes it. The centre White was building becomes the pawn you win.",
    },
  ],

  modelGames: [
    {
      label: "Rubinstein main line: doubled pawns and ...Qc7",
      sans: sans("d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 dxc4 Bxc4 Qc7 Bd3 e5"),
      summary: "The classical picture. You castle, hit the centre with both pawns, take on c3 when asked, and put the queen on c7. ...e5 fixes d4 and the c3-pawn is a target for the rest of the game.",
    },
    {
      label: "Classical: fianchetto against the healthy structure",
      sans: sans("d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3 b6 Bg5 Bb7 f3 h6 Bh4 d5"),
      summary: "White keeps clean pawns and the bishop pair; you fight for e4 with the b7-bishop and ...d5. Solid, sound and easy to play.",
    },
    {
      label: "Sämisch: the Botvinnik setup",
      sans: sans("d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3 c5 e3 O-O Bd3 Nc6 Ne2 b6 e4 Ne8 O-O Ba6"),
      summary: "White gets the centre and the bishop pair; you get the c4-pawn as a target. ...b6 and ...Ba6 hit it straight on, ...Ne8 reroutes the knight to d6, and every white piece ends up defending pawns.",
    },
  ],

  middlegamePlan:
    "The Nimzo is a fight over e4 and, usually, over White's doubled c-pawns. If the pawns are doubled, attack the front one: ...c5 fixes them, ...Nc6 or ...Na5 and ...Ba6 pile onto c4, ...Qc7 adds to it, and ...d6 with ...e5 stops d4 from moving to relieve the pressure. " +
    "If White kept the structure healthy with Qc2, play the classical centre game instead: ...d5 and ...c5 to open lines, the bishop on b7 on the long diagonal, and a knight to e4 when it is safe. " +
    "In both cases keep your own structure clean, castle early, and remember that White's e4 push is often a pawn you can take. " +
    "You have given up a bishop for a knight; do not hurry, because the position rewards the side with fewer weaknesses, and that is you.",

  structureDiagram: {
    fen: "rnbq1rk1/pp3ppp/4pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 7",
    orientation: "black",
    arrows: [
      { from: "b4", to: "c3" },
      { from: "c5", to: "d4" },
    ],
    caption: "The Rubinstein Nimzo after 6...c5: the bishop pins the c3-knight so e4 never comes, the king is castled, and both centre pawns hit d4. When a3 arrives you take on c3 and play against the doubled pawns.",
  },
};
