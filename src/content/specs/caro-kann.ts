// Caro-Kann Defence — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines reused from ChessHall (facts). Prose original.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const caroKann: OpeningSpec = {
  id: "caro-kann",
  name: "Caro-Kann Defence",
  eco: "B10–B19",
  side: "black",
  family: "1e4-other",
  firstMoves: "1.e4 c6",
  tabiyaFen: "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
  pitch:
    "Solid without being passive: ...c6 supports ...d5 so you challenge e4 at once and your light bishop still gets out. " +
    "No holes, no bad bishop, and a healthy structure that survives whatever your opponent throws at it.",

  setup: {
    pieces: [
      { piece: "B", squares: ["f5", "g6", "g4"], why: "The light bishop comes OUT (f5, often retreating to g6) before ...e6." },
      { piece: "N", squares: ["f6"], why: "The king's knight, often via ...Ngf6 once ...Nd7 is in." },
      { piece: "N", squares: ["d7", "c6"], why: "The queen's knight to d7, ready to recapture on f6." },
      { piece: "B", squares: ["e7", "d6", "b4"], why: "The dark bishop developed; ...Bd6 aims at the kingside." },
    ],
    pawns: ["c6", "e6"],
    order: [
      {
        before: "Bf5|Bg4",
        after: "e6",
        // Not in the Panov. After White's c4 the structure is an isolated
        // queen's pawn fight, ...e6 before the bishop is the main line, and the
        // "French bishop" worry does not apply.
        unlessOpponent: "c4",
        why: "Bishop out before ...e6 — otherwise you've built a French with a locked-in bishop, exactly what the Caro-Kann avoids.",
      },
    ],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "caro-c6-d5",
      title: "...c6 then ...d5: challenge e4 with the bishop still free",
      oneLiner: "Unlike the French, your c8-bishop isn't blocked. That's the whole opening.",
      why: "...c6 supports ...d5 without putting a pawn on e6. When White takes or protects, your bishop comes to f5 or g4 first — then ...e6 closes the door behind it, not in front of it.",
    },
    {
      id: "caro-bishop-first",
      title: "Bishop out, then ...e6",
      oneLiner: "...Bf5 (or ...Bg4) before ...e6. Every time.",
      why: "The bishop's only good diagonals run through f5 and g4. Play ...e6 first and you've locked it in for the game.",
    },
    {
      id: "caro-classical",
      title: "Against Nc3: take, then ...Bf5",
      oneLiner: "3.Nc3 dxe4 4.Nxe4 Bf5 — the bishop hits the knight and gets out in one move.",
      why: "Trading on e4 removes White's centre pawn and brings their knight to e4 where your bishop hits it. Ng3 Bg6 is normal; if h4 comes, ...h6 gives the bishop h7 so it can't be trapped.",
      trigger: { kind: "opponent_san", sans: ["Nc3"] },
      response: "...dxe4, then ...Bf5 after Nxe4.",
    },
    {
      id: "caro-advance",
      title: "Against e5: ...Bf5 at once",
      oneLiner: "3.e5 Bf5 — then ...e6 and the ...c5 break against d4.",
      why: "White gains space but your bishop is out on move 3. Then ...e6, ...Nd7, ...Ne7 or ...c5: attack the d4-pawn that holds e5 up. Against g4 kicking the bishop, ...Bg6 and ...h5.",
      trigger: { kind: "opponent_san", sans: ["e5"] },
      response: "...Bf5, ...e6, then ...c5.",
    },
    {
      id: "caro-exchange",
      title: "Against exd5: ...cxd5, then ...Nc6 and the bishop",
      oneLiner: "The Exchange gives you a free c-file and easy development. ...Nc6, ...Bg4 or ...Bf5, ...Nf6, ...e6.",
      why: "After exd5 cxd5 the structure is symmetrical and your c8-bishop still has its diagonal. Get it out before ...e6, castle, and use the c-file.",
      trigger: { kind: "opponent_san", sans: ["exd5"] },
      response: "...cxd5, then ...Nc6 and the bishop before ...e6.",
    },
    {
      id: "caro-h4",
      title: "h4 chasing the bishop — ...h6",
      oneLiner: "When h4 comes, ...h6 gives the bishop a permanent home on h7.",
      why: "White's h4–h5 wants to trap your bishop on g6. ...h6 makes h7 available and the bishop is never in danger again; it also stops Ng5 ideas.",
      trigger: { kind: "opponent_san", sans: ["h4"] },
      response: "...h6.",
    },
    {
      id: "caro-book-end",
      title: "When the book runs out",
      oneLiner: "Finish developing, castle, then the ...c5 break. Trade when cramped — your structure wins endgames.",
      why: "White has a little more space; you have no weaknesses. Complete ...Nd7, ...Ngf6, ...Bd6 or ...Be7, castle, and hit d4 with ...c5 when your pieces are ready.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "c6", howToAnswer: "...c6 — the Caro-Kann.", why: "Two thirds of your games. Everything in this opening starts here." },
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5, and if c4 comes then ...c6 — that's the Slav, the same ...c6 idea against the other pawn. The app has a Slav trainer.", why: "A queen's pawn game. Your ...c6 plan transfers directly." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5, then ...c6 and develop as usual.", why: "Flexible; it usually becomes a d4 or c4 game." },
        { san: "c4", verdict: "good", answer: "c6", howToAnswer: "...c6! Then ...d5 — the Slav structure again.", why: "The English. ...c6 and ...d5 give you a share of the centre." },
        { san: "e3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...Nf6, ...Bf5 — your bishop gets out before ...e6, as always.", why: "Passive: White locks in their own bishop." },
        { san: "g3", verdict: "good", answer: "d5", howToAnswer: "...d5, ...Nf6, ...c6 — a solid wall against the fianchetto.", why: "A quiet setup." },
        { san: "Nc3", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — if e4 then ...dxe4 or transpose with ...c6.", why: "Often heads for e4 anyway." },
        { san: "b3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — take the centre they are giving you.", why: "A fianchetto that ignores the centre." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...Bf5 — and remember f4 has loosened their king.", why: "Bird's Opening." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, ...Nf6, ...c5 — you get more space than they do.", why: "Timid." },
      ],
    },
    [P("e4")]: { yourMove: { san: "c6", why: "Prepare ...d5 with the c-pawn, keeping the c8-bishop's diagonal open." } },
    [P("e4 c6")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d5", howToAnswer: "...d5 — challenge the centre.", why: "Main line." },
        { san: "Nc3", verdict: "good", answer: "d5", howToAnswer: "...d5; after Nf3, ...Bg4.", why: "The Two Knights setup." },
        { san: "Nf3", verdict: "good", answer: "d5", howToAnswer: "...d5. If exd5 cxd5; if Nc3 then ...Bg4.", why: "Flexible." },
        { san: "c4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — after cxd5 cxd5 exd5 Nf6 you regain the pawn with a fine position.", why: "The accelerated Panov. Nothing to fear." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...Nf6 and ...Bg4 or ...g6.", why: "Timid." },
        { san: "f4", verdict: "dubious", answer: "d5", howToAnswer: "...d5 — if e5, ...Bf5 and ...e6; if exd5 cxd5.", why: "Loosens White's king." },
        { san: "Bc4", verdict: "bad", answer: "d5", howToAnswer: "...d5! The bishop is hit at once and must move again.", why: "The bishop walks into ...d5 with tempo." },
        { san: "Qh5", verdict: "bad", answer: "g6", howToAnswer: "...g6 — kick the queen; then ...Nf6 develops with another threat.", why: "A Scholar's-mate try that just loses time." },
      ],
    },
    [P("e4 c6 d4")]: { yourMove: { san: "d5", why: "Hit e4. White must take, push, or defend — each has a simple answer." } },
    [P("e4 c6 d4 d5")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "dxe4", howToAnswer: "...dxe4, then ...Bf5 after Nxe4.", why: "The Classical." },
        { san: "e5", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5 right away, then ...e6.", why: "The Advance." },
        { san: "exd5", verdict: "good", answer: "cxd5", howToAnswer: "...cxd5, then ...Nc6 and the bishop out.", why: "The Exchange (or Panov if c4 follows)." },
        { san: "Nd2", verdict: "good", answer: "dxe4", howToAnswer: "...dxe4 Nxe4 Bf5 — same as the Classical.", why: "Same idea as Nc3." },
        { san: "f3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 fxe4 e5! — hits d4 and opens the queen's diagonal; if dxe5 then ...Qh4+.", why: "The Fantasy Variation. Sharp, but ...e5 is a clean answer." },
        { san: "Bd3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 Bxe4 Nf6 — the bishop is hit and you develop.", why: "Blocks White's own d-pawn." },
        { san: "Nf3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — take it. After Ng5, ...Bf5 or ...Nf6 keeps the pawn.", why: "Gives up e4 for nothing." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 (or ...dxe4). Then ...e6 and develop.", why: "Panov-style pressure." },
      ],
    },

    // --- Classical ---------------------------------------------------------------------
    [P("e4 c6 d4 d5 Nc3")]: {
      yourMove: { san: "dxe4", why: "Take. White's knight comes to e4 where your bishop will hit it." },
      mistakes: [
        { san: "e6", why: "That locks in your light-squared bishop — exactly the French problem the Caro-Kann exists to avoid. Take on e4, then ...Bf5." },
        { san: "Nf6", why: "e5 kicks the knight and you've lost time. Take on e4 first." },
      ],
      checkpoint: {
        question: "White defends e4 with the knight. What's your plan?",
        options: ["Take on e4, then ...Bf5 hitting the knight.", "Play ...e6 — solid.", "Develop ...Nf6."],
        correctIndex: 0,
        explanation: "...dxe4 Nxe4 Bf5 gets your bishop out with a threat — the whole point of ...c6. ...e6 locks the bishop in; ...Nf6 runs into e5.",
      },
    },
    [P("e4 c6 d4 d5 Nc3 dxe4")]: {
      replies: [
        { san: "Nxe4", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5 — bishop out with a threat.", why: "Main line." },
        { san: "f3", verdict: "dubious", answer: "exf3", howToAnswer: "...exf3 — take. If Nxf3, ...Bg4 or ...Nf6; if Qxf3, ...Nf6 develops with the queen in view.", why: "A gambit for development; you're a pawn up with no weaknesses." },
        { san: "Bc4", verdict: "bad", answer: "Qxd4", howToAnswer: "...Qxd4 — a free pawn; the d4-pawn is defended only by the queen, and Qxd4 Qxd4 is just an even trade of queens with you a pawn up.", why: "Hangs the d-pawn." },
      ],
    },
    [P("e4 c6 d4 d5 Nc3 dxe4 Nxe4")]: {
      yourMove: { san: "Bf5", why: "Out before ...e6, hitting the knight. This is the move the opening is built around." },
      mistakes: [{ san: "e6", why: "Bishop first! ...e6 now locks it in for good. ...Bf5, then ...e6." }],
    },
    [P("e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5")]: {
      replies: [
        { san: "Ng3", verdict: "good", answer: "Bg6", howToAnswer: "...Bg6. Then ...h6 if h4 comes.", why: "Main line." },
        { san: "Nc5", verdict: "dubious", answer: "b6", howToAnswer: "...b6 — kick it (…e5 also works). Then ...e6 and ...Nf6.", why: "A knight jump that costs time." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...e6.", why: "Retreats for nothing." },
        { san: "Bd3", verdict: "dubious", answer: "Qxd4", howToAnswer: "...Qxd4! The d-pawn hangs (Bd3 blocked the queen's defence of it), and the bishop is loose too.", why: "Drops a pawn." },
        { san: "Qf3", verdict: "dubious", answer: "Bxe4", howToAnswer: "...Bxe4 Qxe4 Nf6 — trade, then hit the queen and develop.", why: "Early queen." },
      ],
    },
    [P("e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3")]: { yourMove: { san: "Bg6", why: "The bishop is still out and still on its diagonal. If h4 comes, ...h6." } },
    [P("e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6")]: {
      replies: [
        { san: "h4", verdict: "good", answer: "h6", howToAnswer: "...h6 — give the bishop h7.", why: "Main line: White tries to trap the bishop." },
        { san: "Nf3", verdict: "good", answer: "Nd7", howToAnswer: "...Nd7, then ...Ngf6, ...e6.", why: "Quiet development." },
        { san: "Bc4", verdict: "good", answer: "e6", howToAnswer: "...e6 (the bishop is already out), then ...Nf6.", why: "Aims at f7; ...e6 blunts it." },
        { san: "N1e2", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6.", why: "Normal." },
        { san: "f4", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...Nf6 — f4 weakens White's king.", why: "Aggressive but loose." },
      ],
    },
    [P("e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4")]: {
      yourMove: { san: "h6", why: "Give the bishop a home on h7 so h5 never traps it, and stop Ng5 ideas." },
    },
    [P("e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Nd7", howToAnswer: "...Nd7, so ...Ngf6 can be recaptured by a knight.", why: "Main line." },
        { san: "h5", verdict: "good", answer: "Bh7", howToAnswer: "...Bh7 — safe.", why: "The bishop is fine." },
        { san: "N1e2", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...e6.", why: "Normal." },
        { san: "Bc4", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Nf6.", why: "Normal." },
      ],
    },
    [P("e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3")]: {
      yourMove: { san: "Nd7", why: "So that after ...Ngf6 a Nxf6 can be met by ...Nxf6, keeping your structure intact." },
    },

    // --- Advance ----------------------------------------------------------------------------
    [P("e4 c6 d4 d5 e5")]: {
      yourMove: { san: "Bf5", why: "The bishop gets out at once. ...e6 comes next, behind it." },
      mistakes: [
        { san: "e6", why: "Bishop first. ...e6 now leaves it stuck behind the pawn chain — a bad French." },
        { san: "c5", why: "Playable, but the bishop is the priority: ...Bf5, ...e6, and THEN ...c5." },
      ],
      checkpoint: {
        question: "White pushes e5. Bishop or pawn first?",
        options: ["...Bf5 now, ...e6 next.", "...e6 first — solid.", "...c5 first — hit d4."],
        correctIndex: 0,
        explanation: "The bishop's whole future depends on this move. Out to f5 first; then ...e6 supports d5, and ...c5 attacks d4 when your pieces are ready.",
      },
    },
    [P("e4 c6 d4 d5 e5 Bf5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...c5 or ...Nd7.", why: "Main line." },
        { san: "Nc3", verdict: "good", answer: "e6", howToAnswer: "...e6. If g4, ...Bg6 and ...c5.", why: "Prepares g4 ideas." },
        { san: "c3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Nd7, ...c5.", why: "Solid." },
        { san: "g4", verdict: "dubious", answer: "Bg6", howToAnswer: "...Bg6 — the bishop is safe on g6; h4 is met by ...h5.", why: "Aggressive, but g4 weakens White's own king." },
        { san: "h4", verdict: "dubious", answer: "h5", howToAnswer: "...h5 — stop h5 and keep the bishop's squares.", why: "Tries to trap the bishop." },
        { san: "Bd3", verdict: "dubious", answer: "Bxd3", howToAnswer: "...Bxd3 Qxd3 e6 — trade their good bishop for yours.", why: "Offers a trade that suits you." },
        { san: "Ne2", verdict: "good", answer: "e6", howToAnswer: "...e6, ...c5.", why: "Heading for g3 or f4." },
        { san: "c4", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — keep d5 solid; dxc4 later if it suits.", why: "Loosens the centre." },
      ],
    },
    [P("e4 c6 d4 d5 e5 Bf5 Nf3")]: { yourMove: { san: "e6", why: "Now ...e6 is right: the bishop is out, the pawn chain is solid, and ...c5 is coming." } },
    [P("e4 c6 d4 d5 e5 Bf5 Nf3 e6")]: {
      replies: [
        { san: "Be2", verdict: "good", answer: "c5", howToAnswer: "...c5 — the break against d4.", why: "Main line." },
        { san: "Bd3", verdict: "dubious", answer: "Bxd3", howToAnswer: "...Bxd3 Qxd3 c5.", why: "Trade suits you." },
        { san: "c3", verdict: "good", answer: "c5", howToAnswer: "...c5, ...Nd7, ...Ne7.", why: "Solid." },
        { san: "Nbd2", verdict: "good", answer: "c5", howToAnswer: "...c5.", why: "Normal." },
        { san: "Be3", verdict: "good", answer: "Nd7", howToAnswer: "...Nd7, then ...Ne7 and ...c5.", why: "Normal." },
        { san: "g4", verdict: "dubious", answer: "Bg6", howToAnswer: "...Bg6.", why: "Loosens the king." },
      ],
    },
    [P("e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2")]: { yourMove: { san: "c5", why: "The freeing break: hit d4, the pawn that holds e5 up." } },

    // --- Exchange & Panov -----------------------------------------------------------------
    [P("e4 c6 d4 d5 exd5")]: { yourMove: { san: "cxd5", why: "Recapture with the pawn. Symmetrical structure, and your bishop still has its diagonal." } },
    [P("e4 c6 d4 d5 exd5 cxd5")]: {
      replies: [
        { san: "Bd3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, then ...Bg4 or ...Nf6.", why: "The Exchange." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6 and ...Bb4 or ...Be7.", why: "The Panov Attack." },
        { san: "Nf3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...Bg4.", why: "Normal." },
        { san: "c3", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6, ...Nf6, ...Bg4.", why: "Normal." },
        { san: "Nc3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Nc6.", why: "Normal." },
        { san: "Bb5+", verdict: "dubious", answer: "Bd7", howToAnswer: "...Bd7 — offer the trade; your structure stays clean.", why: "A check that develops nothing." },
      ],
    },
    [P("e4 c6 d4 d5 exd5 cxd5 Bd3")]: {
      yourMove: { san: "Nc6", why: "Hit d4 and prepare ...Bg4 or ...Nf6. The bishop is still coming out before ...e6." },
      mistakes: [{ san: "e6", why: "Bishop first: ...Nc6 and ...Bg4 before ...e6, or the c8-bishop is locked in." }],
    },
    [P("e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6")]: {
      replies: [
        { san: "c3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...Bg4.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin, then ...e6.", why: "Normal." },
        { san: "Ne2", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...Bg4 or ...g6.", why: "Avoids the pin." },
        { san: "Bf4", verdict: "dubious", answer: "Qb6", howToAnswer: "...Qb6 — hits b2 and d4 at once.", why: "Leaves b2 and d4 loose." },
      ],
    },
    [P("e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3")]: { yourMove: { san: "Nf6", why: "Develop; ...Bg4 next before ...e6." } },
    [P("e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6")]: {
      replies: [
        { san: "Bf4", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — bishop out first. If Qb3 then ...Qd7 (or ...Qc8).", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4.", why: "Normal." },
        { san: "h3", verdict: "dubious", answer: "g6", howToAnswer: "...g6 and ...Bg7 — the bishop pair stays flexible.", why: "Stops ...Bg4 but costs a move." },
      ],
    },
    [P("e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4")]: {
      yourMove: { san: "Bg4", why: "Bishop out with tempo ideas before ...e6. If Qb3, ...Qd7 covers b7." },
      mistakes: [{ san: "e6", why: "Bishop first — ...Bg4, then ...e6." }],
    },
    [P("e4 c6 d4 d5 exd5 cxd5 c4")]: { yourMove: { san: "Nf6", why: "Develop and hit d5's attacker later with ...e6 and ...Bb4." } },
    [P("e4 c6 d4 d5 exd5 cxd5 c4 Nf6")]: {
      replies: [
        { san: "Nc3", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Bb4 or ...Be7.", why: "Main line." },
        { san: "Nf3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Be7.", why: "Normal." },
        { san: "cxd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5, then ...Nc6 and ...e6.", why: "Isolated pawn for White." },
        { san: "Bd3", verdict: "dubious", answer: "dxc4", howToAnswer: "...dxc4 Bxc4 e6 — a tempo gained.", why: "Misplaced bishop." },
      ],
    },
    [P("e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3")]: { yourMove: { san: "e6", why: "Solid centre; ...Bb4 or ...Be7 next and castle." } },
    [P("e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Bb4", howToAnswer: "...Bb4 — pin, then ...O-O and ...dxc4.", why: "Main line." },
        { san: "Bg5", verdict: "good", answer: "Be7", howToAnswer: "...Be7, ...O-O.", why: "Normal." },
        { san: "cxd5", verdict: "good", answer: "exd5", howToAnswer: "...exd5 — keep the structure; the e-file opens for your rook.", why: "Trades." },
        { san: "c5", verdict: "dubious", answer: "Be7", howToAnswer: "...Be7, ...O-O, then ...b6 to undermine c5.", why: "Overextends." },
      ],
    },

    // --- Two Knights --------------------------------------------------------------------------
    [P("e4 c6 Nc3")]: { yourMove: { san: "d5", why: "Same plan: hit e4." } },
    [P("e4 c6 Nc3 d5")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin the knight; White struggles to hold e4.", why: "The Two Knights." },
        { san: "d4", verdict: "good", answer: "dxe4", howToAnswer: "...dxe4, ...Bf5.", why: "Transposes to the Classical." },
        { san: "exd5", verdict: "good", answer: "cxd5", howToAnswer: "...cxd5.", why: "Normal." },
        { san: "e5", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5, then ...e6 and ...d4 hitting the knight.", why: "Gains space but ...d4 comes with tempo." },
        { san: "Qf3", verdict: "dubious", answer: "d4", howToAnswer: "...d4! — kicks the knight; the queen is misplaced.", why: "Early queen." },
        { san: "Bc4", verdict: "bad", answer: "dxc4", howToAnswer: "...dxc4 — a free bishop.", why: "Walks into the pawn." },
      ],
    },
    [P("e4 c6 Nc3 d5 Nf3")]: {
      yourMove: { san: "Bg4", why: "Pin the knight that guards e4. White's usual h3 lets you trade and simplify." },
      mistakes: [{ san: "e6", why: "Bishop first: ...Bg4. ...e6 now locks it in." }],
    },
    [P("e4 c6 Nc3 d5 Nf3 Bg4")]: {
      replies: [
        { san: "h3", verdict: "good", answer: "Bxf3", howToAnswer: "...Bxf3 — simplest. Then ...Nf6, ...e6.", why: "Main line." },
        { san: "d4", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — take; Nxe4 Bxf3 Qxf3 Qxd4? No: ...Nf6 or ...e6 is enough.", why: "Loosens e4." },
        { san: "e5", verdict: "dubious", answer: "e6", howToAnswer: "...e6, ...Nd7, ...c5.", why: "Space, but the bishop is out." },
        { san: "Be2", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6; if e5, ...Nfd7.", why: "Normal." },
        { san: "exd5", verdict: "good", answer: "cxd5", howToAnswer: "...cxd5.", why: "Normal." },
      ],
    },
    [P("e4 c6 Nc3 d5 Nf3 Bg4 h3")]: {
      yourMove: { san: "Bxf3", why: "Trade and keep it simple. Retreating to h5 invites g4 and the bishop gets chased around." },
      mistakes: [{ san: "Bh5", why: "g4 Bg6 and Ne5 — the bishop gets pushed around and White gains time. Take on f3." }],
    },
    [P("e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3")]: {
      replies: [
        { san: "Qxf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...e6.", why: "Main line." },
        { san: "gxf3", verdict: "dubious", answer: "dxe4", howToAnswer: "...dxe4 — take; White's structure is wrecked.", why: "Ruins the kingside." },
      ],
    },
    [P("e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3")]: { yourMove: { san: "Nf6", why: "Develop toward e4. ...e6 next (the bishop is gone, so it's fine)." } },
    [P("e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 Nf6")]: {
      replies: [
        { san: "d3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Nbd7, ...Bd6.", why: "Main line." },
        { san: "e5", verdict: "dubious", answer: "Nfd7", howToAnswer: "...Nfd7, then ...e6 and ...c5.", why: "Overextends." },
        { san: "d4", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 Nxe4 Qxd4 — a free pawn.", why: "Drops the d-pawn." },
        { san: "Bc4", verdict: "dubious", answer: "e6", howToAnswer: "...e6.", why: "Normal." },
      ],
    },
    [P("e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 Nf6 d3")]: { yourMove: { san: "e6", why: "With the bishop traded, ...e6 is simply solid. ...Nbd7, ...Bd6, castle." } },
  },

  traps: [
    {
      name: "Bd3?? drops the d-pawn",
      sans: sans("1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Bd3 Qxd4"),
      punisher: "black",
      tell: "White defends the e4-knight with Bd3, blocking the queen's guard of d4.",
      why: "Bd3 cuts the d1-queen off from d4, so ...Qxd4 is a free pawn — and the bishop on d3 and knight on e4 are both loose afterwards. Count before you copy 'natural' moves.",
    },
    {
      name: "The Fantasy punished",
      sans: sans("1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 5.dxe5 Qh4+ 6.g3 Qxe4+ 7.Qe2 Qxh1"),
      punisher: "black",
      tell: "White supports e4 with f3 instead of a piece.",
      why: "f3 opens the e1–h4 diagonal. ...dxe4 fxe4 e5! and if White grabs the pawn, ...Qh4+ wins the e4-pawn with check and then the rook on h1.",
    },
  ],

  modelGames: [
    { label: "Classical Variation", sans: sans("e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 h6 Nf3 Nd7"), summary: "Take on e4, bishop to f5 then g6, ...h6 against the h-pawn, and ...Nd7 so ...Ngf6 can be recaptured by a knight." },
    { label: "Advance Variation", sans: sans("e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5"), summary: "Bishop out at once, ...e6 behind it, then the ...c5 break against d4." },
    { label: "Panov–Botvinnik Attack", sans: sans("e4 c6 d4 d5 exd5 cxd5 c4 Nf6 Nc3 e6 Nf3 Bb4"), summary: "Against c4, develop with ...Nf6 and ...e6, then ...Bb4 pins the knight." },
    { label: "Exchange Variation", sans: sans("e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4 Bg4"), summary: "Symmetrical structure; ...Nc6, ...Nf6 and the bishop out to g4 before ...e6." },
    { label: "Two Knights Attack", sans: sans("e4 c6 Nc3 d5 Nf3 Bg4 h3 Bxf3 Qxf3 Nf6 d3 e6"), summary: "Pin with ...Bg4, trade on f3 when asked, and develop calmly." },
  ],

  middlegamePlan:
    "The Caro's whole selling point is a healthy structure with no bad bishop. Once the light bishop is out (f5/g6) and you've played ...e6, finish developing — ...Nd7, ...Ngf6, ...Bd6 or ...Be7, castle — " +
    "then free yourself with the ...c5 break against d4. Because your pieces are sound, happily trade when cramped and steer toward a solid middlegame or a good endgame, where White's extra space matters far less.",

  structureDiagram: {
    fen: "r2qkbnr/pp1nppp1/2p3bp/8/3P3P/5NN1/PPP2PP1/R1BQKB1R w KQkq - 2 8",
    orientation: "black",
    arrows: [{ from: "c6", to: "c5" }],
    caption: "The Classical Caro-Kann: bishop safely on g6 with h7 available, ...e6 played behind it, and the ...c5 break coming against d4.",
  },
};
