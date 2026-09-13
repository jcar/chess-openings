// Slav Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const slavDefence: OpeningSpec = {
  id: "slav-defence",
  name: "Slav Defence",
  eco: "D10–D19",
  side: "black",
  family: "1d4",
  firstMoves: "1.d4 d5 2.c4 c6",
  tabiyaFen: "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  pitch:
    "The Queen's Gambit answered with ...c6 instead of ...e6: d5 is supported and your light bishop is still free to come out. " +
    "No bad bishop, no cramp, one simple structure against everything White tries.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f6"], why: "The king's knight to its natural square." },
      { piece: "B", squares: ["f5", "g4"], why: "The light bishop OUT before ...e6 — the reason you play the Slav." },
      { piece: "N", squares: ["d7", "c6"], why: "The queen's knight, usually via d7." },
      { piece: "B", squares: ["e7", "b4", "d6"], why: "The dark bishop developed; ...Bb4 pins the c3-knight." },
    ],
    pawns: ["c6", "e6"],
    order: [{ before: "Bf5|Bg4", after: "e6", why: "Bishop out before ...e6, or you've locked it in and built a Queen's Gambit Declined with extra steps." }],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "slav-c6",
      title: "...c6 supports d5 and frees the bishop",
      oneLiner: "The QGD's ...e6 shuts the c8-bishop in. ...c6 does the same job and leaves it free.",
      why: "Everything in the Slav follows from this: you can take on c4 later and get the bishop to f5 or g4 with a healthy structure.",
    },
    {
      id: "slav-take-then-bishop",
      title: "Take on c4 when both white knights are out",
      oneLiner: "After Nf3 and Nc3, ...dxc4 forces a4, then ...Bf5 — bishop out, White has spent a move on a4.",
      why: "Taking too early lets White regain the pawn with e3/Bxc4 and no cost. After Nc3, White must stop ...b5 with a4 — a move that develops nothing.",
      trigger: { kind: "opponent_san", sans: ["Nc3"] },
      response: "...dxc4; after a4, ...Bf5.",
    },
    {
      id: "slav-dont-cling",
      title: "Don't cling to the pawn with ...b5",
      oneLiner: "After a4, ...b5?? drops material: axb5 cxb5 Nxb5. Give the pawn back and enjoy free development.",
      why: "The Slav cheerfully returns the c4-pawn; what you keep is the developed bishop and the sound structure. Holding the pawn opens the a-file onto your rook.",
      trigger: { kind: "opponent_san", sans: ["a4"] },
      response: "...Bf5, then ...e6 and let them recapture.",
    },
    {
      id: "slav-exchange",
      title: "Against cxd5: mirror, and get the bishop out",
      oneLiner: "...cxd5, ...Nf6, ...Nc6, and the bishop to f5 before ...e6. Answer Qb3 with ...Bb4.",
      why: "The Exchange Slav is symmetrical and equal. The only trick is Qb3 hitting b7 and d5 — with the bishop already on f5, ...Bb4 pins the knight and everything holds.",
      trigger: { kind: "opponent_san", sans: ["cxd5"] },
      response: "...cxd5, ...Nf6, ...Nc6, ...Bf5.",
    },
    {
      id: "slav-qb3",
      title: "Qb3 hits b7 — don't panic",
      oneLiner: "If Qb3 comes before your bishop is out, ...Qb6 or ...Qc7 defends; if the bishop is already on f5, ...Bb4.",
      why: "Qb3 attacks b7 (left loose when the bishop leaves c8) and d5. It looks scary and isn't: one calm move covers both.",
      trigger: { kind: "opponent_piece_on", piece: "Q", squares: ["b3"] },
      response: "...Qb6 (offer the trade) or ...Bb4.",
    },
    {
      id: "slav-book-end",
      title: "When the book runs out",
      oneLiner: "Finish: ...e6, ...Be7 or ...Bb4, ...O-O, ...Nbd7. Then free the game with ...c5 or ...e5.",
      why: "You have no weaknesses and an active bishop. Complete development, castle, and hit back in the centre when your pieces are ready.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — then ...c6 when c4 arrives.", why: "The main move, and what the Slav answers." },
        { san: "e4", verdict: "good", answer: "c6", howToAnswer: "...c6! That's the Caro-Kann — the identical ...c6 idea against the other pawn, and the app has a trainer for it.", why: "Your ...c6 knowledge transfers straight across. Nothing new to learn." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...Nf6 and ...c6 — the same setup.", why: "Flexible; usually becomes a d4 game." },
        { san: "c4", verdict: "good", answer: "c6", howToAnswer: "...c6, then ...d5 — the Slav structure, a move early.", why: "The English. Your setup works without changes." },
        { san: "e3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — their bishop is stuck behind the pawn, yours isn't.", why: "Passive." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...Nf6, ...c6 — solid against the fianchetto.", why: "A quiet setup." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — if e4 comes, ...dxe4 or ...c6 transposing to a Caro.", why: "Often heads for e4." },
        { san: "b3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — and their king is airy.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...e5 — take the space.", why: "Timid." },
      ],
    },
    [P("d4")]: { yourMove: { san: "d5", why: "Meet the centre pawn with a centre pawn." } },
    [P("d4 d5")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "c6", howToAnswer: "...c6 — the Slav.", why: "The Queen's Gambit." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c6 and ...Bf5 — the same setup.", why: "Flexible." },
        { san: "Bf4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...c5 or ...c6, ...Bf5 — a London; mirror it.", why: "The London System." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bf5 or ...Bg4.", why: "Locks in White's bishop." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6; if Bg5, ...Ne4 or ...Nbd7.", why: "Aims at e4." },
        { san: "e4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 — a pawn. After Nc3 Nf6 f3, take again and hold.", why: "The Blackmar–Diemer. Take and develop." },
        { san: "c3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bf5.", why: "Passive." },
        { san: "Bg5", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6; if Bxf6 exf6, you have the bishop pair.", why: "Odd." },
      ],
    },
    [P("d4 d5 c4")]: {
      yourMove: { san: "c6", why: "Support d5 with the c-pawn so the c8-bishop stays free. That's the whole difference from the QGD." },
      mistakes: [{ san: "Bf5", why: "Bishop before centre: cxd5 Qxd5 Nc3 chases your queen and Qb3 hits b7. ...c6 first, bishop later." }],
    },
    [P("d4 d5 c4 c6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6. Take on c4 only after Nc3.", why: "Main line." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — don't take yet: without Nf3, e4 would give White a big centre.", why: "Normal." },
        { san: "cxd5", verdict: "good", answer: "cxd5", howToAnswer: "...cxd5, then ...Nf6, ...Nc6, ...Bf5.", why: "The Exchange." },
        { san: "e3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Bf5 or ...Bg4.", why: "Quiet." },
        { san: "Qb3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — b7 is still guarded by the bishop; develop.", why: "Early queen." },
        { san: "Qc2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...Bg4 (the queen eyes f5).", why: "Early queen." },
        { san: "e4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — a pawn; then ...Nf6 or ...e5.", why: "Gambits e4." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Bf5.", why: "Fianchetto." },
        { san: "Bg5", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6; if Bxf6 exf6 you're fine.", why: "Odd." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3")]: {
      yourMove: { san: "Nf6", why: "Develop. Wait for Nc3 before taking on c4 so a4 costs White a move." },
      mistakes: [{ san: "Bf5", why: "cxd5 cxd5 Qb3! hits b7 and d5 at once. Knight first, bishop after ...dxc4." }],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "dxc4", howToAnswer: "...dxc4 — now a4 costs them a move, then ...Bf5.", why: "Main line." },
        { san: "e3", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5 (or ...Bg4), then ...e6.", why: "Quiet; the bishop gets out at once." },
        { san: "cxd5", verdict: "good", answer: "cxd5", howToAnswer: "...cxd5, ...Nc6.", why: "Exchange." },
        { san: "Nbd2", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5, ...e6.", why: "Passive." },
        { san: "Qb3", verdict: "dubious", answer: "dxc4", howToAnswer: "...dxc4 Qxc4 Bf5 — the bishop comes out with tempo-free development.", why: "Early queen." },
        { san: "Qc2", verdict: "dubious", answer: "Bg4", howToAnswer: "...Bg4 — pin; the queen on c2 stops ...Bf5 but not this.", why: "Early queen." },
        { san: "g3", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5, ...e6.", why: "Fianchetto." },
        { san: "Bg5", verdict: "dubious", answer: "Ne4", howToAnswer: "...Ne4 — hits the bishop; if Bh4, ...Qb6 or ...g5.", why: "Loose." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3")]: {
      yourMove: { san: "dxc4", why: "Take now: White must play a4 (a non-developing move) to stop ...b5, and then your bishop comes out to f5." },
      mistakes: [
        { san: "e6", why: "That's the Semi-Slav — playable, but your bishop is locked in. In our Slav the bishop comes out first: ...dxc4, then ...Bf5." },
        { san: "Bf5", why: "cxd5 cxd5 Qb3! — b7 and d5 are both attacked. Take on c4 first." },
        { san: "Bg4", why: "cxd5 cxd5 Qb3 — same problem. ...dxc4 first." },
      ],
      checkpoint: {
        question: "Both white knights are out. What's the Slav move here?",
        options: ["...dxc4 — after a4, the bishop comes out to f5.", "...e6 — solid.", "...Bf5 — bishop out right now."],
        correctIndex: 0,
        explanation: "Now is the moment: White must spend a4 to stop ...b5, and your bishop develops to f5 with no Qb3 problems. ...e6 locks the bishop in; ...Bf5 now allows cxd5 cxd5 Qb3.",
      },
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4")]: {
      replies: [
        { san: "a4", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5. Never ...b5.", why: "Main line." },
        { san: "e3", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — let them recapture; you're developed.", why: "Allows ...b5 ideas but you don't need them." },
        { san: "e4", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin the knight; then ...e6 and let Bxc4 come.", why: "The Geller Gambit approach; calm development beats it." },
        { san: "Ne5", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7 — challenge the knight; Nxc4 e6.", why: "Jumps to regain c4." },
        { san: "Qa4+", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7; Qxc4 e6 and you're fine.", why: "Early queen check." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4")]: {
      yourMove: { san: "Bf5", why: "The bishop develops outside the pawn chain. This is what ...c6 was for." },
      mistakes: [
        { san: "b5", why: "Don't try to hold the gambit pawn. axb5 cxb5 Nxb5 just drops material and rips open the a-file onto your rook. Give the pawn back." },
        { san: "e6", why: "Bishop first! ...Bf5, then ...e6." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5")]: {
      replies: [
        { san: "e3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Bb4 after Bxc4.", why: "Main line." },
        { san: "Ne5", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 — challenge it; Nxc4 e6.", why: "Krause's idea." },
        { san: "Nh4", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — if Nxf5 exf5, your structure is fine and the e-file is yours.", why: "Hunts the bishop." },
        { san: "g3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Bb4.", why: "Fianchetto." },
        { san: "Bg5", verdict: "dubious", answer: "e6", howToAnswer: "...e6 (or ...Ne4 hitting the bishop).", why: "Normal." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3")]: { yourMove: { san: "e6", why: "Now ...e6: the bishop is out, so this just completes the wall and frees the f8-bishop." } },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6")]: {
      replies: [
        { san: "Bxc4", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin the knight, then castle.", why: "Main line." },
        { san: "Bd3", verdict: "dubious", answer: "Bxd3", howToAnswer: "...Bxd3 Qxd3 — trade; White's bishop was the better one.", why: "Offers your bishop a trade it likes." },
        { san: "Ne5", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7.", why: "Normal." },
        { san: "Nh4", verdict: "dubious", answer: "Bg6", howToAnswer: "...Bg6 — if Nxg6 hxg6, fine.", why: "Hunts the bishop." },
        { san: "Qb3", verdict: "dubious", answer: "Bb4", howToAnswer: "...Bb4 — pins and defends indirectly; b7 is covered by the queen if needed.", why: "Hits b7." },
      ],
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4")]: {
      yourMove: { san: "Bb4", why: "Pin the knight and develop; castle next, then ...Nbd7." },
    },
    [P("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4 Bb4")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O, then ...Nbd7.", why: "Main line." },
        { san: "Qb3", verdict: "dubious", answer: "a5", howToAnswer: "...a5 — the bishop is defended; then ...O-O.", why: "Hits b4 and b7." },
        { san: "Qe2", verdict: "good", answer: "O-O", howToAnswer: "...O-O.", why: "Normal." },
        { san: "Ne5", verdict: "good", answer: "O-O", howToAnswer: "...O-O, ...Nbd7.", why: "Normal." },
      ],
    },

    // --- Exchange ------------------------------------------------------------------------------------
    [P("d4 d5 c4 c6 cxd5")]: { yourMove: { san: "cxd5", why: "Recapture with the c-pawn. Symmetrical and equal; your bishop stays free." } },
    [P("d4 d5 c4 c6 cxd5 cxd5")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Nc6 and ...Bf5.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6.", why: "Normal." },
        { san: "Bf4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Nf6 and ...Bf5.", why: "Normal." },
        { san: "Qb3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — b7 is guarded by the bishop and d5 by the queen.", why: "Early queen." },
        { san: "e3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...Bg4.", why: "Quiet." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6, ...Bf5.", why: "Fianchetto." },
      ],
    },
    [P("d4 d5 c4 c6 cxd5 cxd5 Nc3")]: { yourMove: { san: "Nf6", why: "Develop; ...Nc6 and ...Bf5 next." } },
    [P("d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...Bf5.", why: "Main line." },
        { san: "Bf4", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...Bf5; answer Qb3 with ...Bb4 later.", why: "Normal." },
        { san: "Bg5", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — if Bxf6 exf6, you have the bishop pair.", why: "Normal." },
        { san: "e3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...Bg4.", why: "Quiet." },
        { san: "Qb3", verdict: "dubious", answer: "Nc6", howToAnswer: "...Nc6 — nothing is actually hanging.", why: "Early queen." },
      ],
    },
    [P("d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Nf3")]: { yourMove: { san: "Nc6", why: "Develop toward d4; the bishop to f5 comes next." } },
    [P("d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Nf3 Nc6")]: {
      replies: [
        { san: "Bf4", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5. If e3 e6 Qb3, then ...Bb4.", why: "Main line." },
        { san: "Bg5", verdict: "dubious", answer: "Ne4", howToAnswer: "...Ne4 — hits the bishop; after Bf4 Nxc3 bxc3 the position is equal.", why: "Loose." },
        { san: "e3", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin, then ...e6.", why: "Quiet." },
        { san: "Ne5", verdict: "dubious", answer: "Nxe5", howToAnswer: "...Nxe5 dxe5 Ne4 — trade and hit c3.", why: "Premature." },
        { san: "g3", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5, ...e6.", why: "Fianchetto." },
      ],
    },
    [P("d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Nf3 Nc6 Bf4")]: {
      yourMove: { san: "Bf5", why: "Bishop out, mirroring White. Then ...e6, and if Qb3 comes, ...Bb4." },
      mistakes: [{ san: "e6", why: "Bishop first — ...Bf5, then ...e6." }],
    },
  },

  traps: [
    {
      name: "Holding the pawn with ...b5 (don't do this)",
      sans: sans("1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 b5 6.axb5 cxb5 7.Nxb5"),
      punisher: "white",
      tell: "You've taken on c4 and White plays a4.",
      why: "...b5 looks like it keeps the pawn. Instead axb5 cxb5 Nxb5 wins it back with interest and the a-file opens onto your rook. Just play ...Bf5.",
    },
  ],

  modelGames: [
    { label: "Main line (4...dxc4)", sans: sans("d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4 Bb4"), summary: "Take on c4 once both knights are out, develop the bishop to f5 after a4, then ...e6 and ...Bb4." },
    { label: "Exchange Variation", sans: sans("d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Nf3 Nc6 Bf4"), summary: "Symmetrical: mirror White's development and get the bishop to f5 before ...e6." },
  ],

  middlegamePlan:
    "The Slav's edge over the QGD is that your light-squared bishop gets OUT to f5 or g4 before ...e6 ever locks it in — so you never own a bad bishop. " +
    "The scheme: support d5 with ...c6, develop the bishop actively, then ...e6, ...Be7 (or ...Bb4), ...O-O, ...Nbd7. If you take on c4, don't cling to the pawn with ...b5 (a4 hits it) — give it back and enjoy free development. " +
    "Free the game with a timely ...c5 or ...e5 and steer toward a sound, comfortable middlegame.",

  structureDiagram: {
    fen: "rn1qk2r/pp3ppp/2p1pn2/5b2/PbBP4/2N1PN2/1P3PPP/R1BQK2R w KQkq - 1 8",
    orientation: "black",
    caption: "The Slav main line: bishop out on f5, ...e6 behind it, ...Bb4 pinning the knight. No bad bishop anywhere.",
  },
};
