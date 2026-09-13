// Scandinavian Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const scandinavian: OpeningSpec = {
  id: "scandinavian",
  name: "Scandinavian Defence",
  aliases: ["Center Counter", "Centre Counter"],
  eco: "B01",
  side: "black",
  family: "1e4-other",
  firstMoves: "1.e4 d5",
  tabiyaFen: "rnb1kbnr/ppp1pppp/8/3q4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 3",
  pitch:
    "The simplest answer to 1.e4: trade the centre pawn at once, take back with the queen, tuck her on a5, and play the same setup every game. " +
    "No theory to memorise, no cramped bishop, and most of your opponents' tricks are already accounted for.",

  setup: {
    pieces: [
      { piece: "Q", squares: ["a5", "d6", "d8"], why: "The queen recaptures, then sits on a5 (or d6) out of harm's way." },
      { piece: "N", squares: ["f6"], why: "The king's knight to its best square." },
      { piece: "B", squares: ["f5", "g4", "e6"], why: "Light bishop OUT before ...e6 shuts it in." },
      { piece: "N", squares: ["d7", "c6"], why: "The other knight, usually via d7 so ...c6 stays available." },
      { piece: "B", squares: ["e7", "d6", "b4"], why: "Dark bishop developed; ...Bb4 hits the c3-knight." },
    ],
    pawns: ["c6", "e6"],
    order: [
      { before: "Bf5|Bg4", after: "e6", why: "Bishop out before ...e6, or it's locked behind its own pawns — the one thing the Scandinavian is built to avoid." },
      { before: "c6", after: "Bf5|Bg4", why: "...c6 first: it gives the queen a permanent c7 bolt-hole and stops Nb5/Nd5 tricks before the bishop leaves the queenside." },
    ],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "scandi-queen",
      title: "Queen out early — but on purpose",
      oneLiner: "...Qxd5 breaks a rule, then ...Qa5 fixes it: the queen is safe there and eyes c3.",
      why: "White gains a tempo with Nc3, and that's the only one they get. From a5 the queen is hard to attack and already pins the c3-knight against the king on e1 — which is why White usually plays Bd2 at some point.",
    },
    {
      id: "scandi-c6",
      title: "...c6 is the move that makes it work",
      oneLiner: "Play ...c6 early: a bolt-hole on c7 for the queen, and support for ...d5 or ...b5 later.",
      why: "The queen on a5 has one weakness: she can be chased. ...c6 gives her c7 to come home to, so no knight jump or bishop check ever wins material.",
    },
    {
      id: "scandi-bd2",
      title: "Bd2 means Nd5 is coming",
      oneLiner: "Bd2 unpins the knight and aims through it at your queen. When Nd5 arrives, play ...Qd8 (or ...Qb6). Never ...cxd5.",
      why: "Your queen on a5 pins the c3-knight against e1. Bd2 breaks the pin — and now Nd5 is a discovered attack: the knight steps aside and the bishop hits a5. Taking the knight with the c-pawn loses the queen to Bxa5.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["d2"] },
      response: "Keep developing (...Bf5, ...e6), and answer Nd5 with ...Qd8.",
    },
    {
      id: "scandi-bishop-out",
      title: "Bishop out, then ...e6",
      oneLiner: "...Bf5 (or ...Bg4) before ...e6. Never the other way round.",
      why: "The whole point of this opening is that your light bishop gets a good diagonal. Play ...e6 first and you've built a French with a bad bishop.",
    },
    {
      id: "scandi-early-bc4",
      title: "Watch the bishop on c4",
      oneLiner: "Bc4 aims at f7 and can hit your queen's diagonal. Answer with ...c6 and ...Bf5, then ...e6.",
      why: "Bc4 eyes f7 and, together with Bd2, prepares the Nd5 discovery on your queen. ...c6 gives the queen c7 and stops Nb5 ideas; ...e6 later blunts the bishop. When Nd5 comes, ...Qd8 — never take it with the pawn.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["c4"] },
      response: "...c6 if you haven't, then ...Bf5 and ...e6.",
    },
    {
      id: "scandi-declined",
      title: "If they don't take on d5",
      oneLiner: "Nc3: push ...d4. e5: bishop out with ...Bf5, then ...e6 and ...c5. Nf3 or d3: take on e4.",
      why: "2.Nc3 lets you gain space with ...d4. 2.e5 is a French Advance where your bishop gets out first. 2.Nf3 and 2.d3 simply give you the e4-pawn — take it and develop.",
      trigger: { kind: "opponent_san", sans: ["Nc3", "e5", "Nf3", "d3", "d4"] },
    },
    {
      id: "scandi-book-end",
      title: "When the book runs out",
      oneLiner: "You have no weaknesses. Castle, keep the queen safe, and free yourself with ...c5 or ...e5 when the pieces are ready.",
      why: "The Scandinavian middlegame is calm: your structure has no holes. White has a bit more space; your job is to trade a couple of pieces, then hit back in the centre.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "d5", howToAnswer: "...d5 — the Scandinavian.", why: "Two thirds of your games, and the only move this opening needs." },
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — a queen's pawn game. Then ...Nf6 and get the light bishop out before ...e6, exactly as you do here.", why: "No Scandinavian, but the same instincts: challenge the centre, free the bishop." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...Nf6 and ...Bf5 or ...Bg4.", why: "Flexible; usually becomes a d4 game." },
        { san: "c4", verdict: "good", answer: "e5", howToAnswer: "...e5 — take your share of the centre; ...Nf6 and ...Nc6 follow.", why: "The English. ...e5 is the simplest answer." },
        { san: "e3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — they've shut in their own bishop.", why: "Passive." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...Nf6, ...c6 — solid.", why: "A fianchetto setup." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — if e4 then ...dxe4 and you're a pawn up for a moment; just develop.", why: "Often transposes to e4 lines." },
        { san: "b3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5.", why: "Ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — and note their king is loose.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...e5 — take the space.", why: "Timid." },
      ],
    },
    [P("e4")]: { yourMove: { san: "d5", why: "Challenge e4 at once. White almost always takes." } },
    [P("e4 d5")]: {
      replies: [
        { san: "exd5", verdict: "good", answer: "Qxd5", howToAnswer: "Qxd5 — the point of the opening.", why: "The main line; nearly everyone takes." },
        { san: "Nc3", verdict: "dubious", answer: "d4", howToAnswer: "...d4! Kick the knight and gain space. Then ...Nf6, ...e5.", why: "Declining lets you take the centre for free." },
        { san: "e5", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5, then ...e6 and ...c5 — a French where your bishop got out first.", why: "White gains space but gives you your best piece for free." },
        { san: "d3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 dxe4 Qxd1+ Kxd1 — or just ...Nf6. Either way White gets nothing.", why: "Timid." },
        { san: "Nf3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4. If Ng5 then ...Nf6 (guards e4 and h7) and keep the pawn.", why: "The Tennison Gambit try. Take the pawn and develop; the knight tricks fizzle after ...Nf6." },
        { san: "d4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4, then ...Nf6 and hold the pawn: after Nc3 Nf6 f3 exf3 Nxf3 you're a pawn up with a solid position.", why: "The Blackmar–Diemer Gambit. Sound at the club level only if you panic." },
        { san: "Bd3", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 Bxe4 Nf6 — the bishop is hit and you develop with tempo.", why: "Blocks White's own d-pawn." },
        { san: "f3", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 fxe4 Qh4+ — or simply ...e5.", why: "Weakens the king and defends e4 with the wrong pawn." },
      ],
    },
    [P("e4 d5 exd5")]: {
      yourMove: { san: "Qxd5", why: "Recapture with the queen. Yes, she comes out early — and next move she goes to a5 where she's safe." },
    },
    [P("e4 d5 exd5 Qxd5")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "Qa5", howToAnswer: "...Qa5 — safe, and it eyes the c3-knight.", why: "The main line, gaining the one tempo White gets." },
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Bg4 or ...Bf5 and ...c6.", why: "White takes the centre without harassing the queen — fine for you." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 and the usual setup.", why: "Quiet development." },
        { san: "Bc4", verdict: "bad", answer: "Qxc4", howToAnswer: "...Qxc4 — a free bishop.", why: "The bishop is simply undefended." },
        { san: "Qf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6. Don't trade — develop while their queen stares.", why: "Offers a queen trade to punish your early queen; declining with development is stronger." },
        { san: "Qe2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...Bg4 hitting the queen.", why: "Blocks White's own bishop." },
        { san: "Be2", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...Bg4.", why: "Passive." },
      ],
    },
    [P("e4 d5 exd5 Qxd5 Nc3")]: {
      yourMove: { san: "Qa5", why: "The queen retreats to a square where nothing attacks her, while pinning the c3-knight against e1 once ...Bb4 arrives." },
      mistakes: [
        { san: "Qe5+", why: "A tempting check that misplaces the queen. After Be2 (or Nf3? no — Be2) she sits exposed in the centre and Nf3 hits her next. Retreat to a5 or d6." },
        { san: "Qd8", why: "Safe but two moves wasted: the queen just went home. Qa5 does the same job while staying active." },
        { san: "Qc6", why: "Blocks your own c-pawn — and ...c6 is the move this opening lives on. Qa5 instead." },
      ],
      checkpoint: {
        question: "Your queen is attacked by the knight. Where does she go?",
        options: ["...Qa5 — safe, and eyeing the c3-knight.", "...Qe5+ — a check!", "...Qd8 — straight back home."],
        correctIndex: 0,
        explanation: "a5 is the square: nothing attacks it, ...Bb4 later pins the knight against e1, and ...c6 will give her c7 as a permanent retreat. The check on e5 just walks into Be2 and Nf3; d8 wastes two moves.",
      },
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c6 and the bishop out.", why: "The main line." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...c6.", why: "Fine." },
        { san: "Bc4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...c6 quickly — Bd2 and Nd5 ideas are coming.", why: "Eyes f7; harmless once ...c6 is in." },
        { san: "b4", verdict: "dubious", answer: "Qxb4", howToAnswer: "...Qxb4 — take it. After Rb1 Qd6 you're a pawn up.", why: "A gambit that just gives a pawn." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — kicks the bishop and plays your key move at once.", why: "A check that helps you." },
        { san: "Qf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...c6 and ...Bg4 hitting the queen.", why: "Early queen again." },
      ],
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4")]: {
      yourMove: { san: "Nf6", why: "Develop the knight to its best square. ...c6 comes next." },
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "c6", howToAnswer: "...c6 — the bolt-hole, before anything else.", why: "Main line." },
        { san: "Bc4", verdict: "good", answer: "c6", howToAnswer: "...c6! Then ...Bf5 and ...e6.", why: "Aims at f7 and prepares Bd2 + Nd5. ...c6 defuses it." },
        { san: "Bd2", verdict: "good", answer: "c6", howToAnswer: "...c6. Bd2 unpins the knight, so Nd5 now comes with a discovered attack on your queen — answer it with ...Qd8, never ...cxd5.", why: "The sharpest try: it prepares Nd5 hitting the queen through the bishop." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6.", why: "Helps you play your key move." },
      ],
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3")]: {
      yourMove: { san: "c6", why: "The move the Scandinavian lives on: a permanent c7 retreat for the queen, and no more Nb5 or Nd5 tricks." },
      mistakes: [
        { san: "e6", why: "You've just locked your light bishop behind its own pawns — the one problem this opening exists to avoid. ...c6 first, then the bishop out, THEN ...e6." },
        { san: "Nc6", why: "Blocks the c-pawn, and ...c6 is your most important move. Also Bd2 and Nd5 ideas become annoying." },
        { san: "Bg4", why: "Not terrible, but ...c6 first: after Bd2 the threat Nd5 hits queen and c7 and the bishop on g4 doesn't help." },
      ],
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6")]: {
      replies: [
        { san: "Bc4", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5 — outside the pawn chain, then ...e6.", why: "Main line." },
        { san: "Bd2", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5 — but remember: after Nd5 the bishop on d2 hits your queen. Reply ...Qd8, never ...cxd5.", why: "Unpins the knight and sets up the Nd5 discovery." },
        { san: "Bd3", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — f5 is covered, so pin the knight instead. Then ...e6.", why: "Blocks your f5 square; the pin is the answer." },
        { san: "Ne5", verdict: "dubious", answer: "Nbd7", howToAnswer: "...Nbd7, challenging the knight; if Nc4 then ...Qc7.", why: "An aggressive jump; ...Nbd7 asks it to justify itself." },
        { san: "h3", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — h3 stopped ...Bg4 but not ...Bf5.", why: "A tempo spent on nothing." },
        { san: "Be2", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5, ...e6, ...Nbd7.", why: "Quiet." },
      ],
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4")]: {
      yourMove: { san: "Bf5", why: "The light bishop develops outside the pawn chain — this is the whole reason you played ...c6 before ...e6." },
      mistakes: [{ san: "e6", why: "Bishop first! ...e6 now shuts it in for the rest of the game. ...Bf5 (or ...Bg4), then ...e6." }],
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5")]: {
      replies: [
        { san: "Bd2", verdict: "good", answer: "e6", howToAnswer: "...e6. Then ...Bb4 if Qe2 comes, ...Nbd7 otherwise.", why: "Main line: unpins and prepares Qe2/O-O-O." },
        { san: "Ne5", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Nbd7 to challenge it.", why: "Active but manageable." },
        { san: "O-O", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Nbd7, ...Be7, castle.", why: "Normal." },
        { san: "Qe2", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Bb4 pinning.", why: "Prepares O-O-O." },
      ],
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5 Bd2")]: {
      yourMove: { san: "e6", why: "Now ...e6 is right: the bishop is already out. Next ...Bb4 (pinning c3) or ...Nbd7 and castle. If Nd5 comes, ...Qd8." },
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5 Bd2 e6")]: {
      replies: [
        { san: "Nd5", verdict: "dubious", answer: "Qd8", howToAnswer: "...Qd8! The knight is attacked by your c-pawn but you must NOT take: Bd2 hits a5 through it. After Nxf6+ Qxf6 you're fine.", why: "The discovered attack. It only works if you take the knight." },
        { san: "Qe2", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin the knight, then ...Nbd7 and castle.", why: "Prepares O-O-O." },
        { san: "O-O", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7, ...Be7, ...O-O.", why: "Quiet." },
        { san: "a3", verdict: "good", answer: "Nbd7", howToAnswer: "...Nbd7 and castle.", why: "Stops ...Bb4." },
      ],
    },
    [P("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5 Bd2 e6 Nd5")]: {
      yourMove: { san: "Qd8", why: "Step out of the discovered attack. The knight on d5 is now attacked by your c-pawn and has to trade itself off or retreat." },
      mistakes: [{ san: "cxd5", why: "Loses the queen: Bxa5. The knight moved so the bishop on d2 could hit a5 — the whole point of Bd2. Move the queen first." }],
    },
  },

  traps: [
    {
      name: "The loose bishop",
      sans: sans("1.e4 d5 2.exd5 Qxd5 3.Bc4 Qxc4"),
      punisher: "black",
      tell: "White develops the bishop to c4 while your queen is still on d5.",
      why: "The queen on d5 controls c4. Bc4 is simply a free bishop — count before you assume White knows what they're doing.",
    },
    {
      name: "The Bd2–Nd5 discovery (don't fall for it)",
      sans: sans("1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 Nf6 5.Nf3 c6 6.Bd2 Bf5 7.Nd5 cxd5 8.Bxa5"),
      punisher: "white",
      tell: "White's bishop comes to d2 behind the knight your queen is pinning.",
      why: "Bd2 breaks the pin, and Nd5 then uncovers the bishop's attack on a5. Taking the knight with the c-pawn drops the queen. The answer is calm: ...Qd8, and the knight has to go.",
    },
    {
      name: "The b4 pawn grab (it's fine)",
      sans: sans("1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.b4 Qxb4 5.Rb1 Qd6"),
      punisher: "black",
      tell: "White throws in b4 to chase the queen.",
      why: "Take it. After Rb1 the queen steps back to d6 and you're a clean pawn up; White's 'attack' has cost them a pawn and their queenside structure.",
    },
  ],

  modelGames: [
    { label: "Main line (3...Qa5)", sans: sans("e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5"), summary: "Recapture with the queen, tuck her on a5, then ...Nf6, ...c6 and ...Bf5 for a solid setup with no weaknesses." },
    { label: "Modern (2...Nf6)", sans: sans("e4 d5 exd5 Nf6 d4 Nxd5 Nf3 g6 Be2 Bg7"), summary: "The alternative: recapture with the knight and fianchetto, keeping the queen at home. Same spirit, different pieces." },
    { label: "3...Qd6 Variation", sans: sans("e4 d5 exd5 Qxd5 Nc3 Qd6 d4 Nf6 Nf3 g6 Be2 Bg7"), summary: "The queen on d6 is flexible and hard to attack; ...g6 and ...Bg7 give a sound, well-organised setup." },
  ],

  middlegamePlan:
    "The Scandinavian is scheme-like — you build the same healthy setup almost every game. After tucking the queen away, play ...Nf6, then ...c6 (vital: a permanent c7 bolt-hole, and it stops Nb5 ideas), " +
    "get the light bishop OUT with ...Bf5 or ...Bg4 before ...e6 locks it in, then ...e6, ...Bd6 or ...Be7, ...O-O, ...Nbd7. You have no weaknesses; free yourself later with ...c5 or ...e5. " +
    "The one rule: never leave the queen where a knight or bishop hits it with real tempo.",

  structureDiagram: {
    fen: "rn2kb1r/pp2pppp/2p2n2/q4b2/2BP4/2N2N2/PPP2PPP/R1BQK2R w KQkq - 2 7",
    orientation: "black",
    caption: "The Scandinavian setup: queen on a5, ...c6 in, and the light bishop OUT on f5 before ...e6. Solid and easy to play.",
  },
};
