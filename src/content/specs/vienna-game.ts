// Vienna Game — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines reused from ChessHall (facts). Prose original.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const viennaGame: OpeningSpec = {
  id: "vienna-game",
  name: "Vienna Game",
  eco: "C25–C29",
  side: "white",
  family: "1e4-e5",
  firstMoves: "1.e4 e5 2.Nc3",
  tabiyaFen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
  pitch:
    "Like the Italian, but the queen's knight comes out first — and that keeps f4 in your pocket. " +
    "Against ...Nf6 you play the Vienna Gambit and most opponents under 1200 are lost by move 6; against ...Nc6 you play a quiet Italian setup.",

  setup: {
    pieces: [
      { piece: "N", squares: ["c3"], why: "Out first. It guards e4 so the f-pawn is free to advance." },
      { piece: "B", squares: ["c4", "b3"], why: "The Italian bishop on the a2–g8 diagonal." },
      { piece: "N", squares: ["f3"], why: "Second knight — after d3 or after the gambit, covering h4." },
    ],
    pawns: ["e4", "d3"],
    order: [{ before: "Nc3", after: "f4", why: "The knight on c3 guards e4. Push f4 before it's there and ...Qh4+ or ...Nxe4 punishes you." }],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "vienna-flex",
      title: "Nc3 first keeps f4 in reserve",
      oneLiner: "The knight guards e4, so the f-pawn is free to hit e5 when it suits you.",
      why: "After 2.Nf3 the f-pawn is stuck behind the knight. After 2.Nc3 you decide next move: gambit with f4 against ...Nf6, or a quiet Bc4 setup against ...Nc6.",
    },
    {
      id: "vienna-gambit",
      title: "Against ...Nf6: f4!",
      oneLiner: "The Vienna Gambit. If they take, e5 kicks the knight and you're miles ahead.",
      why: "3.f4 exf4? 4.e5 and the f6-knight has to go backwards — ...Ng8 is a common reply at this level and the game is already decided. The correct answer, 3...d5, is hard to find; then fxe5 Nxe4 Nf3 and you have the centre.",
      trigger: { kind: "opponent_san", sans: ["Nf6"] },
      response: "f4.",
      ifIgnored: "Nothing bad — Bc4 is fine too — but you skip the one line that wins the most games at this level.",
    },
    {
      id: "vienna-quiet",
      title: "Against ...Nc6: don't gambit, build",
      oneLiner: "With the knight on c6, f4 doesn't work. Bc4, d3, Nf3, castle.",
      why: "After 2...Nc6 3.f4 exf4 there's no e5 kick with effect, and ...Qh4+ ideas come fast. Play the Italian setup instead; you can still consider f4 later once d3 and Nf3 are in.",
      trigger: { kind: "opponent_san", sans: ["Nc6"] },
      response: "Bc4, then d3.",
    },
    {
      id: "vienna-qh4",
      title: "The ...Qh4+ trap — Nf3, not d3",
      oneLiner: "After 3.f4 d5 4.fxe5 Nxe4, kick the knight with Nf3, never d3.",
      why: "5.d3? Qh4+ 6.g3 Nxg3 7.hxg3 Qxg3+ and you're losing. 5.Nf3 develops, covers h4, and asks the knight what it's doing on e4.",
      trigger: { kind: "opponent_piece_on", piece: "N", squares: ["e4"] },
      response: "Nf3 (or Qf3 if you know it). Not d3.",
    },
    {
      id: "vienna-knight-back",
      title: "When their knight has to run",
      oneLiner: "After e5 hits the f6-knight, every retreat costs them; develop with threats and castle.",
      why: "...Ng8 undoes their development; ...Ng4 gets hit by h3 (and Nf3 covers e5); ...Qe7 then Qe2 keeps everything. You're up two or three developing moves — cash it in by opening lines, not by grabbing pawns.",
      trigger: { kind: "opponent_piece_on", piece: "N", squares: ["g8", "g4", "h5", "d5"] },
      response: "Nf3, d4, Bc4, castle. Then look at f7.",
    },
    {
      id: "vienna-book-end",
      title: "When the book runs out",
      oneLiner: "Same plan as the Italian: castle, d3 and c3 if quiet, or f4–f5 and a kingside attack after the gambit.",
      why: "In the quiet lines the knight walk Nge2–g3 and a later f4 are your plans. After the gambit the e5 pawn cramps Black and your f- and e-pawns lead a kingside attack.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "e4", why: "Centre first, as always." } },
    [P("e4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — the Vienna.", why: "The reply this opening is built for: about six games in ten." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — and after ...Qxd5, Nc3 hits the queen. Your knight was going to c3 anyway.", why: "The Scandinavian. It plays into your hands: you develop with tempo." },
        { san: "c5", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — keep your move order. Then f4 and Nf3 for a Grand Prix setup, or d4 for the Open Sicilian.", why: "The Sicilian. Nc3 is a real Vienna player's answer." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — the French, and your knight still goes to its favourite square.", why: "The French." },
        { san: "c6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, then d4 — the Two Knights Caro, which keeps the Vienna feel.", why: "The Caro-Kann." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nc3 and Nf3 — you take the whole centre.", why: "The Pirc. Space is free here." },
        { san: "Nf6", verdict: "dubious", answer: "e5", howToAnswer: "e5 — kick the knight, then d4 and Nc3. Don't keep chasing with pawns.", why: "The Alekhine invites you to gain space; take it." },
        { san: "Nc6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — if ...e5 you're in the Vienna; if ...d5 then exd5.", why: "Unusual; your setup fits anyway." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nc3, Be3 — a big centre against the fianchetto.", why: "The Modern." },
        { san: "b6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Bd3 to blunt the long diagonal, Nc3 and Nf3.", why: "Owen's Defence. Take the centre." },
        { san: "f5", verdict: "bad", answer: "exf5", howToAnswer: "exf5 — a free pawn, and their king is already draughty.", why: "The Fred. It weakens the king for nothing." },
      ],
    },
    [P("e4 e5")]: {
      yourMove: { san: "Nc3", why: "The Vienna: develop the queen's knight first. It guards e4, which frees the f-pawn to advance later." },
    },
    [P("e4 e5 Nc3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "f4", howToAnswer: "f4! The Vienna Gambit.", why: "The most common reply — and the one your gambit is designed for." },
        { san: "Nc6", verdict: "good", answer: "Bc4", howToAnswer: "Bc4, then d3 — a quiet Italian setup. No f4 here.", why: "Sensible. With the knight on c6 the gambit doesn't bite." },
        { san: "Bc5", verdict: "good", answer: "Bc4", howToAnswer: "Bc4, then Nf3 — mirror them and keep building.", why: "Fine for Black, though the bishop can become a target for a later Na4." },
        { san: "d6", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — the bishop hits f7 and Black's bishop is shut in.", why: "Passive: ...d6 blocks Black's own dark bishop." },
        { san: "Bb4", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then a3 to ask the bishop; Nd5 is also a nice idea.", why: "A pin on nothing — your knight is defended and you haven't castled." },
        { san: "Qh4", verdict: "bad", answer: "Nf3", howToAnswer: "Nf3! The queen must move again, and you've developed for free.", why: "A one-move Scholar's-mate try. It's a target." },
        { san: "f5", verdict: "bad", answer: "exf5", howToAnswer: "exf5, then Qh5+ ideas if the king is loose; otherwise just develop.", why: "…f5 opens Black's own king before a single piece is out." },
        { san: "c6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 and d4 — take the centre while Black prepares ...d5 slowly.", why: "Slow. ...c6 prepares ...d5 but develops nothing." },
      ],
    },

    // --- the Vienna Gambit --------------------------------------------------------
    [P("e4 e5 Nc3 Nf6")]: {
      yourMove: { san: "f4", why: "The Vienna Gambit. If ...exf4 then e5 kicks the knight and Black's development goes backwards. If ...d5 (correct), fxe5 Nxe4 Nf3 and you own the centre." },
    },
    [P("e4 e5 Nc3 Nf6 f4")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "fxe5", howToAnswer: "fxe5 — then after ...Nxe4, Nf3 (not d3!).", why: "The only good reply, and rare at this level." },
        { san: "exf4", verdict: "bad", answer: "e5", howToAnswer: "e5! The knight must retreat: ...Ng8 is common, and then Nf3, d4, Bxf4 and you're three moves ahead.", why: "Taking looks natural and loses the game's tempo: the f6-knight has no good square." },
        { san: "Nc6", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5 Nxe5 d4 — you take the centre with tempo.", why: "Allows fxe5 and a big centre." },
        { san: "d6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, and fxe5 next. Black is cramped.", why: "Solid but passive; you get f-file pressure for free." },
        { san: "Bc5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — develop and cover h4; d4 will hit the bishop next.", why: "Ignores the threat to e5. fxe5 is also playable but Nf3 needs no calculation." },
        { san: "Bb4", verdict: "dubious", answer: "fxe5", howToAnswer: "fxe5, then after ...Nxe4 Qg4!? or simply Nf3.", why: "The pin doesn't stop fxe5." },
      ],
    },
    [P("e4 e5 Nc3 Nf6 f4 exf4")]: {
      yourMove: { san: "e5", why: "Kick the knight. Every square it can go to is worse than f6, and while it wanders you develop with threats." },
      mistakes: [
        { san: "Nf3", why: "Fine in general, but it lets Black play ...d5 or ...Nc6 and keep a normal position. e5 is the point of the gambit: hit the knight NOW." },
      ],
    },
    [P("e4 e5 Nc3 Nf6 f4 exf4 e5")]: {
      replies: [
        { san: "Ng8", verdict: "bad", answer: "Nf3", howToAnswer: "Nf3, d4, Bxf4, castle. Black's development is back to zero.", why: "The most common retreat at this level — and a full move lost." },
        { san: "Qe7", verdict: "good", answer: "Qe2", howToAnswer: "Qe2. Then Nf3, d4 and Bxf4. If ...Ng8, you're way ahead.", why: "Black's best: pins the e5-pawn against the queen." },
        { san: "Ng4", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 (covering e5), then h3 or d4 — the knight has nowhere good to go.", why: "Looks active, but h3 sends it home again." },
        { san: "Nh5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, d4, Be2 — the knight on h5 is stuck on the edge.", why: "A knight on the rim. It won't get back into the game for a while." },
        { san: "Nd5", verdict: "dubious", answer: "Nxd5", howToAnswer: "Nxd5 and after ...Qxd5? d4! hits the queen with a huge centre (or Nf3 if you prefer to keep it simple).", why: "Blocks the d-pawn and can be traded off." },
        { san: "d5", verdict: "dubious", answer: "exf6", howToAnswer: "exf6 — take the knight. If ...Qxf6, Nf3.", why: "A counter-gambit that just loses a piece for a pawn." },
      ],
    },
    [P("e4 e5 Nc3 Nf6 f4 d5")]: {
      yourMove: { san: "fxe5", why: "Take. After ...Nxe4 you play Nf3 and ask the knight what it's doing; the e5-pawn cramps Black." },
    },
    [P("e4 e5 Nc3 Nf6 f4 d5 fxe5")]: {
      replies: [
        { san: "Nxe4", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — develop and cover h4. Never d3 here.", why: "The main line. Black regains the pawn but your centre and development are better." },
        { san: "d4", verdict: "dubious", answer: "exf6", howToAnswer: "exf6 — take the knight; after ...dxc3 fxg7 Bxg7 dxc3 you're up a piece for two pawns.", why: "A trick that only works if you panic. You don't." },
        { san: "Ng4", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the pawn on e5 is safe (Nxe5? Qxd5? no — count first) and Black's knight is loose on g4.", why: "The knight wants e5 back, but d4 and h3 chase it." },
        { san: "Nfd7", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nf3, and Black is cramped behind the e5-pawn.", why: "Passive: the knight blocks its own bishop." },
      ],
    },
    [P("e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4")]: {
      yourMove: { san: "Nf3", why: "Develop and cover h4 — the square Black's queen wants. Now ...Nxc3 bxc3 or ...Bc5 d4 and you're fine." },
      mistakes: [
        { san: "d3", why: "The trap. After 5.d3? Qh4+! 6.g3 Nxg3! 7.hxg3 Qxg3+ Black wins material with a raging attack. Develop the knight, not the pawn." },
        { san: "Qf3", why: "Playable for experts (5.Qf3 Nc6 6.Bb5), but ...Nxc3 and ...Qh4+ ideas are hard to handle. Nf3 is the simple road." },
        { san: "Nxe4", why: "You trade your best knight and after ...dxe4 the e5-pawn is weak. Keep the tension: Nf3." },
      ],
    },

    // --- the quiet line vs ...Nc6 ----------------------------------------------------
    [P("e4 e5 Nc3 Nc6")]: {
      yourMove: { san: "Bc4", why: "No gambit here — with the knight on c6 f4 misfires. Take the Italian diagonal instead, then d3 and Nf3." },
      mistakes: [
        { san: "f4", why: "With the knight on c6 the gambit doesn't work: ...exf4 and there's no e5 kick, while ...Qh4+ comes fast. Bc4 and d3 first." },
      ],
    },
    [P("e4 e5 Nc3 Nc6 Bc4")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "d3", howToAnswer: "d3 — e4 is guarded twice and f4 becomes an option once you're castled.", why: "Natural." },
        { san: "Bc5", verdict: "good", answer: "d3", howToAnswer: "d3, then Nf3 (or f4 for the brave).", why: "Mirrors your development." },
        { san: "Bb4", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, and a3 next to question the bishop.", why: "Pins a knight that isn't pinned to anything yet." },
        { san: "Nd4", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3! — the d4-knight is defended only by the e5-pawn; Nxd4 exd4 Ne2 and you win the centre.", why: "A one-move idea (…Nxc2? isn't a real threat). Develop and it retreats." },
        { san: "Na5", verdict: "dubious", answer: "Bb3", howToAnswer: "Bb3 — or Qh5!? hitting a5 and f7 if you know it. Keep it simple: Bb3.", why: "Chases the bishop to a square it likes anyway." },
        { san: "d6", verdict: "dubious", answer: "d3", howToAnswer: "d3, Nf3, castle — Black's bishop is locked in.", why: "Passive." },
      ],
    },
    [P("e4 e5 Nc3 Nc6 Bc4 Nf6")]: {
      yourMove: { san: "d3", why: "Protect e4 twice and keep f4 in reserve. Nf3 next (or Nge2 if you want to push f4 later)." },
    },
    [P("e4 e5 Nc3 Nc6 Bc4 Nf6 d3")]: {
      replies: [
        { san: "Bc5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, castle — or f4!? now that d3 is in.", why: "Standard development." },
        { san: "Bb4", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then a3.", why: "Fine." },
        { san: "Na5", verdict: "dubious", answer: "Bb3", howToAnswer: "Bb3.", why: "Offside knight." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 Nxd5, then Nf3 and O-O. The d5-knight becomes a target for Bxd5 or Nxd5.", why: "Premature: it dissolves Black's centre." },
        { san: "h6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 and castle; you're a move ahead.", why: "Prevents a Ng5 that wasn't coming." },
      ],
    },
    [P("e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Bc5")]: {
      yourMove: { san: "Nf3", why: "Complete development, castle next. (f4 is also playable here — the Vienna's signature — once you're comfortable.)" },
    },
  },

  traps: [
    {
      name: "The ...Qh4+ trap (don't fall for it)",
      sans: sans("1.e4 e5 2.Nc3 Nf6 3.f4 d5 4.fxe5 Nxe4 5.d3 Qh4+ 6.g3 Nxg3 7.hxg3 Qxg3+"),
      punisher: "black",
      tell: "Black's knight lands on e4 in the gambit and you're tempted to kick it with a pawn.",
      why: "d3 opens the e1–h4 diagonal. After ...Qh4+ g3 Nxg3! hxg3 Qxg3+ Black has won material and your king is in the open. Kick the knight with Nf3 instead.",
    },
    {
      name: "Vienna Gambit accepted",
      sans: sans("1.e4 e5 2.Nc3 Nf6 3.f4 exf4 4.e5 Ng8 5.Nf3 d6 6.d4 dxe5 7.Qe2"),
      punisher: "white",
      tell: "Black takes on f4 without ...d5.",
      why: "e5 sends the knight home. After Nf3 and d4 you regain the pawn with a huge lead in development — Black has one piece out and it's on g8.",
    },
  ],

  modelGames: [
    { label: "Quiet main line", sans: sans("e4 e5 Nc3 Nc6 Bc4 Nf6 d3 Bc5 Nf3"), summary: "Against ...Nc6 you build an Italian setup with the knight already on c3; f4 stays available for later." },
    { label: "Vienna Gambit", sans: sans("e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3"), summary: "The main line of the gambit: Black finds ...d5, you take, kick the knight with Nf3 and keep the centre." },
    { label: "Gambit accepted", sans: sans("e4 e5 Nc3 Nf6 f4 exf4 e5 Ng8 Nf3 d6 d4"), summary: "The line you'll see most under 1200: Black grabs the pawn, the knight goes home, and you're three moves ahead." },
  ],

  middlegamePlan:
    "The Vienna's flexibility is the whole point: the c3-knight already guards e4, so you can choose. In quiet lines, castle, play d3 and a later f4 (or the knight walk Nge2–g3) for a kingside attack. " +
    "After the gambit, the e5-pawn cramps Black: develop with threats, castle, and push the f- and e-pawns toward their king.",

  structureDiagram: {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 2 5",
    orientation: "white",
    arrows: [{ from: "f2", to: "f4" }],
    caption: "The quiet Vienna: an Italian setup with the knight already on c3, so f4 can come later as a real plan.",
  },
};
