// London System — hand-authored OpeningSpec for 0–1200 players (White).
//
// Positions and lines reused from ChessHall (facts, engine-verified). The setup,
// triggers and every "why" are written for a beginner: the London is a SETUP, so
// the coach can score it against anything Black does.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const londonSystem: OpeningSpec = {
  id: "london-system",
  name: "London System",
  eco: "D02 / A48",
  side: "white",
  family: "1d4",
  firstMoves: "1.d4 d5 2.Nf3 Nf6 3.Bf4",
  tabiyaFen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 1 3",
  pitch:
    "The same eight moves against almost anything: bishop to f4, then e3, c3, Nbd2, Bd3, castle. " +
    "No theory to memorise — you learn one structure deeply and let your opponent make the mistakes.",

  setup: {
    pieces: [
      { piece: "B", squares: ["f4", "g3"], why: "The London bishop. Out to f4 before e3, retreating to g3 when challenged — never traded away." },
      { piece: "N", squares: ["f3"], why: "Covers e5 (your outpost) and your king." },
      { piece: "N", squares: ["d2"], why: "Develops without blocking the c-pawn and supports the e5 outpost and a later e4." },
      { piece: "B", squares: ["d3", "e2"], why: "d3 points at h7 for the kingside plan; e2 is the safer square against …g6 setups." },
    ],
    pawns: ["d4", "e3", "c3"],
    order: [
      {
        before: "Bf4",
        after: "e3",
        why: "The one rule of the London: bishop OUT before e3, or you lock it behind your own pawn — the exact bad bishop the system exists to avoid.",
      },
    ],
    castle: "O-O",
    castleBy: 8,
  },

  ideas: [
    {
      id: "london-bishop-first",
      title: "Bishop out before e3",
      oneLiner: "Bf4 first. Then e3. Never the other way round.",
      why:
        "e3 is coming no matter what, and once it's played the c1-bishop can't get out. Playing Bf4 first costs nothing " +
        "and puts your best piece on its best diagonal, staring at c7 and the queenside.",
      ifIgnored: "You spend the whole game with a bishop stuck behind its own pawns, and every trade favours Black.",
    },
    {
      id: "london-triangle",
      title: "The pawn triangle c3–d4–e3",
      oneLiner: "d4 is the centre; c3 and e3 hold it up. That's the whole structure.",
      why:
        "With c3 and e3 in, nothing Black does to d4 works: …c5 and …Nc6 can hit it, but it's defended twice and the bishop has c2 to retreat to. " +
        "A solid centre means you can spend your other moves on development and a plan.",
    },
    {
      id: "london-keep-bishop",
      title: "When they offer to trade your bishop, say no",
      oneLiner: "…Bd6 offers a swap. Step back to g3 — the bishop is the soul of the London.",
      why:
        "Black's dark bishop is their most awkward piece; yours is your best attacker. Trading them hands Black easy equality. " +
        "Bg3 keeps the diagonal, and if Black ever takes on g3, hxg3 gives you a sturdy structure and an open h-file.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["d6"] },
      response: "Bg3.",
    },
    {
      id: "london-qb6",
      title: "…Qb6 hits b2 — defend calmly",
      oneLiner: "The queen on b6 eyes your b-pawn. Qb3 (after c3) or Qc1 (before it) and carry on.",
      why:
        "…c5 and …Qb6 is Black's sharpest try: two attackers on d4 and one on b2. It looks scary but it isn't — Qb3 offers a queen trade " +
        "that leaves you with the better structure, and Qc1 simply guards b2. Don't play Nc3 to defend it unless you know the trap.",
      trigger: { kind: "opponent_piece_on", piece: "Q", squares: ["b6"] },
      response: "Qb3 if you've played c3; otherwise Qc1.",
    },
    {
      id: "london-knight-e5",
      title: "The plan: a knight on e5, then the kingside",
      oneLiner: "Once set up, plant a knight on e5, aim Bd3 and the queen at h7, and push f4.",
      why:
        "Your structure points at Black's king. Ne5 is supported by d4 and can be recaptured by the other knight from d2 (via f3). " +
        "With Bd3 on the b1–h7 diagonal and Qf3 or Qe2 behind it, f4 and sometimes g4 roll forward. The e4 break is the other plan " +
        "once …c5 has been dealt with.",
      trigger: { kind: "book_end" },
      response: "Ne5, Bd3, Qf3 or Qe2, f4. Keep the dark bishop (Bg3 if hit).",
    },
    {
      id: "london-knight-h5",
      title: "…Nh5 chases the bishop",
      oneLiner: "Retreat Bg3. If they take it, hxg3 is a fine structure with an open h-file.",
      why:
        "The knight on h5 is out on a limb: it defends nothing and blocks Black's own h-pawn. After Bg3 Nxg3 hxg3 your pawns are " +
        "doubled but solid, your rook has the h-file, and Black has spent three knight moves for nothing.",
      trigger: { kind: "opponent_piece_on", piece: "N", squares: ["h5"] },
      response: "Bg3.",
    },
    {
      id: "london-vs-fianchetto",
      title: "Against …g6: same setup, plus h3 and Be2",
      oneLiner: "Fianchetto setups want …Nh5 and …Bg4. h3 stops the bishop; Be2 keeps yours safe.",
      why:
        "When Black fianchettoes, their bishop on g7 looks at your queenside and their knights want g4 and h5. h3 denies g4, " +
        "Be2 (instead of Bd3) doesn't get hit by …Nh5–f4 tricks, and c3 blunts the long diagonal. Then Nbd2 and castle as usual.",
      trigger: { kind: "opponent_san", sans: ["g6"] },
      response: "Nf3, e3, Be2, h3, O-O.",
    },
  ],

  annotations: {
    // --- Your moves on the defining line -------------------------------------
    [P("")]: { yourMove: { san: "d4", why: "Claim the centre with the queen's pawn. Everything in the London hangs off this pawn." } },
    [P("d4")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bf4 — the standard order. (Bf4 at once is also fine.)", why: "The classical reply. Symmetrical and solid." },
        { san: "Nf6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4 right away, before …d6 or …g6 can make it awkward.", why: "Flexible: Black might go …d5 next or fianchetto." },
        { san: "e6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4 — same setup. Watch for …c5 and …Qb6.", why: "Black keeps options open; often a French player." },
        { san: "g6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bf4, e3, Be2 and h3.", why: "A fianchetto setup — your plan changes slightly (see the …g6 idea)." },
        { san: "c5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then e3 and c3 — keep your setup, don't grab on c5.", why: "An early strike at d4. It's fine for Black, but if you stay calm your structure holds." },
        { san: "f5", verdict: "good", answer: "Bf4", howToAnswer: "Bf4 and the usual setup; later Nbd2 and c4 or e4 ideas.", why: "The Dutch. …f5 weakens Black's king a little — your Bd3 will like that." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "dxe5 — take it. If …Nc6 then Nf3, and if …Qe7 then Nf3 too. Don't return the pawn.", why: "The Englund Gambit. Black hopes you'll panic; just keep the pawn and develop." },
        { san: "d6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 first (so …e5 doesn't hit a bishop on f4), then Bf4, e3, and the usual setup.", why: "A Pirc-style setup. Your system works the same way." },
        { san: "Nc6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Bf4 — if …e5 comes, dxe5 is just a pawn.", why: "Blocks Black's own c-pawn." },
        { san: "c6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4, e3, Nf3, Bd3 — same setup.", why: "Slav-style. Solid and slow." },
        { san: "b6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Bf4 and e3; put the bishop on d3 to blunt b7.", why: "The queenside fianchetto." },
      ],
    },
    [P("d4 d5")]: { yourMove: { san: "Nf3", why: "Develop toward the centre and control e5, your future outpost. Bf4 next." } },

    // --- The 2.Bf4 move order -------------------------------------------------
    // 2.Bf4 is at least as common as 2.Nf3 below 1200, and after ...Nf6 3.Nf3 it
    // is literally the same position, so the book picks straight back up. These
    // nodes exist because the baked tree is pruned to 500 nodes and drops some of
    // them, which used to end the coaching two moves into the game.
    [P("d4 d5 Bf4")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — and you're back in the main line.", why: "The natural move. After Nf3 this is exactly the 2.Nf3 Nf6 3.Bf4 position." },
        { san: "c6", verdict: "good", answer: "e3", howToAnswer: "e3, then Nf3, Bd3, c3 and Nbd2. The setup doesn't change.", why: "Black prepares ...Bf5 or ...Qb6. Your bishop is already outside the pawn chain, so e3 costs you nothing." },
        { san: "e6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then e3 and Bd3.", why: "Solid, but it shuts in the light-squared bishop — the piece the London usually has the most trouble with." },
        { san: "c5", verdict: "good", answer: "e3", howToAnswer: "e3. If ...Qb6 follows, answer Nc3 or Qc1, not b3.", why: "The critical try: Black hits d4 at once and eyes b2." },
        { san: "Bf5", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Bd3 to offer the trade on your terms.", why: "Black mirrors you, but committing the bishop this early lets you gain time against it." },
        { san: "Nc6", verdict: "dubious", answer: "e3", howToAnswer: "e3 and Nf3 — Black's knight is in the way of ...c5.", why: "Playable, but ...c5 is Black's real counter and the knight now blocks it." },
        { san: "Qd6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — develop with tempo; the queen will have to move again.", why: "The queen comes out early to defend and gets chased." },
      ],
    },
    [P("d4 d5 Bf4 Nf6")]: { yourMove: { san: "Nf3", why: "Straight into the main line: this is the same position as 2.Nf3 Nf6 3.Bf4." } },
    [P("d4 d5 Bf4 c6")]: { yourMove: { san: "e3", why: "With the bishop already out, e3 is pure gain: it shores up d4 and frees the f1-bishop." } },
    [P("d4 d5 Bf4 c6 e3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bd3, c3 and Nbd2.", why: "Black develops normally and you finish the setup in any order." },
        { san: "Bf5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then c4 or Bd3 — Black's bishop is committed, so you can gain time on it.", why: "The point of ...c6: Black gets the bishop out before ...e6 shuts it in." },
        { san: "Qb6", verdict: "dubious", answer: "Qc1", howToAnswer: "Qc1 — b2 is covered and the queen is fine there. Don't play b3.", why: "The b2-pawn looks loose. It isn't: defending calmly leaves Black's queen misplaced." },
        { san: "e6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, Bd3, Nbd2 and c4 or e4 later.", why: "Passive — Black has walled in the c8-bishop behind their own pawns." },
      ],
    },
    [P("d4 d5 Bf4 c6 e3 Nf6")]: { yourMove: { san: "Nf3", why: "The last piece of the structure. Now Bd3, c3 and Nbd2 in whatever order suits." } },
    [P("d4 d5 Bf4 c6 e3 Bf5")]: { yourMove: { san: "Nf3", why: "Develop and take e5. Black's bishop is out, so keep an eye on c4 and Bd3 to challenge it." } },
    [P("d4 d5 Bf4 c5")]: { yourMove: { san: "e3", why: "Hold the centre first. If ...Qb6 comes, Nc3 or Qc1 defends; b3 weakens exactly the squares your bishop left." } },
    [P("d4 d5 Bf4 e6")]: { yourMove: { san: "Nf3", why: "Develop and claim e5. Black has just locked in the bishop the London fears most." } },
    [P("d4 d5 Bf4 Bf5")]: { yourMove: { san: "e3", why: "Solid, and it prepares Bd3 to challenge Black's bishop on your terms." } },
    [P("d4 d5 Bf4 Nc6")]: { yourMove: { san: "e3", why: "Build normally. Black's knight on c6 gets in the way of their own ...c5 break." } },
    [P("d4 d5 Nf3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4 — the London bishop comes out before e3.", why: "Natural development." },
        { san: "c5", verdict: "good", answer: "Bf4", howToAnswer: "Bf4 as always; e3 and c3 next. If …Qb6 arrives, Qc1 or Qb3.", why: "The main challenge to d4. Your triangle handles it." },
        { san: "e6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4.", why: "Solid; Black's bishop on c8 is a little shut in." },
        { san: "Nc6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4, then e3. …Nc6 blocks Black's own c-pawn.", why: "Develops, but it gives up the …c5 lever." },
        { san: "Bg4", verdict: "dubious", answer: "Bf4", howToAnswer: "Bf4 (or e3). Later h3 asks the bishop where it's going.", why: "Pins nothing important; your queen is happy on d1 for now." },
        { san: "Bf5", verdict: "good", answer: "Bf4", howToAnswer: "Bf4, e3, c4 or Qb3 later — b7 is thinner once the bishop leaves.", why: "Black's bishop gets out early, like yours." },
        { san: "c6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4, e3, Bd3.", why: "Slav-style. Solid and passive." },
        { san: "f6", verdict: "bad", answer: "Bf4", howToAnswer: "Bf4, e3, Bd3 — the king's cover is gone; Qb3 or a later Bxg6 idea will find it.", why: "Weakens the king and blocks the knight's best square." },
        { san: "e5", verdict: "bad", answer: "dxe5", howToAnswer: "dxe5 — a free pawn; keep developing.", why: "Hangs a pawn." },
        { san: "g6", verdict: "good", answer: "Bf4", howToAnswer: "Bf4, e3, Be2, h3 — the fianchetto plan.", why: "A Grünfeld-style setup." },
      ],
    },
    [P("d4 d5 Nf3 Nf6")]: {
      yourMove: { san: "Bf4", why: "The signature move: the bishop comes out BEFORE e3 locks it in. Nothing else about the London matters as much." },
      mistakes: [
        { san: "e3", why: "The one rule of the London, broken. Play e3 first and your bishop is stuck behind its own pawn for the whole game. Bf4 first, then e3." },
        { san: "c4", why: "Not a bad move — but it's a Queen's Gambit, a different opening with different plans. Stay in your system: Bf4." },
      ],
      checkpoint: {
        question: "What is the one move-order rule of the London System?",
        options: ["Bishop to f4 before e3.", "e3 first, to protect d4.", "c4 as early as possible to gambit a pawn."],
        correctIndex: 0,
        explanation: "e3 is coming anyway, and once it's played the c1-bishop is locked in. Bf4 first costs nothing and puts your best piece on its best diagonal.",
      },
    },
    [P("d4 d5 Nf3 Nf6 Bf4")]: {
      replies: [
        { san: "e6", verdict: "good", answer: "e3", howToAnswer: "e3 — now that the bishop is out.", why: "The most common reply." },
        { san: "c5", verdict: "good", answer: "e3", howToAnswer: "e3. If …Qb6 comes next, Qc1 guards b2.", why: "Striking at d4 right away — Black's sharpest setup." },
        { san: "Bf5", verdict: "good", answer: "e3", howToAnswer: "e3, then c4 or Qb3 — b7 is weaker with the bishop gone.", why: "Mirrors your idea." },
        { san: "g6", verdict: "good", answer: "e3", howToAnswer: "e3, Be2, h3, then castle.", why: "A fianchetto: switch to the …g6 plan." },
        { san: "c6", verdict: "good", answer: "e3", howToAnswer: "e3, Bd3, Nbd2, O-O.", why: "Very solid; Black waits." },
        { san: "Nc6", verdict: "good", answer: "e3", howToAnswer: "e3, then c3 and Bd3.", why: "Develops but blocks the …c5 lever." },
        { san: "Nh5", verdict: "dubious", answer: "Bg3", howToAnswer: "Bg3. If …Nxg3 then hxg3 — a fine structure and an open h-file.", why: "The knight chases your bishop but ends up offside. Three knight moves for nothing." },
        { san: "Bg4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then h3 to question the bishop.", why: "Harmless pin." },
      ],
    },
    [P("d4 d5 Nf3 Nf6 Bf4 e6")]: { yourMove: { san: "e3", why: "Now e3 is right: the bishop is already out, and this frees the f1-bishop and shores up d4." } },
    [P("d4 d5 Nf3 Nf6 Bf4 e6 e3")]: {
      replies: [
        { san: "c5", verdict: "good", answer: "c3", howToAnswer: "c3 — complete the triangle and give the bishop c2.", why: "The main line." },
        { san: "Bd6", verdict: "dubious", answer: "Bg3", howToAnswer: "Bg3. Keep the bishop.", why: "Black offers to trade your best piece. Decline." },
        { san: "Be7", verdict: "good", answer: "Bd3", howToAnswer: "Bd3, then Nbd2 and castle.", why: "Quiet development." },
        { san: "Bb4+", verdict: "dubious", answer: "c3", howToAnswer: "c3! The check just helps you: the bishop must retreat and c3 was coming anyway.", why: "A check that loses time." },
        { san: "Nbd7", verdict: "good", answer: "Bd3", howToAnswer: "Bd3, Nbd2, O-O.", why: "Flexible development." },
        { san: "b6", verdict: "good", answer: "Bd3", howToAnswer: "Bd3, Nbd2, O-O; watch the long diagonal after …Bb7.", why: "A queenside fianchetto." },
      ],
    },
    [P("d4 d5 Nf3 Nf6 Bf4 e6 e3 c5")]: { yourMove: { san: "c3", why: "Complete the triangle: d4 is defended twice and the bishop has c2 to retreat to." } },
    [P("d4 d5 Nf3 Nf6 Bf4 e6 e3 c5 c3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "Nbd2", howToAnswer: "Nbd2, then Bd3 and castle.", why: "Adding pressure to d4 — which is defended twice." },
        { san: "Qb6", verdict: "dubious", answer: "Qb3", howToAnswer: "Qb3. Offer the trade; if …Qxb3 axb3 your structure is fine and the a-file opens.", why: "Hits b2 and d4, but it's a queen out early." },
        { san: "Bd6", verdict: "dubious", answer: "Bg3", howToAnswer: "Bg3 — keep the bishop.", why: "The trade offer. Say no." },
        { san: "cxd4", verdict: "good", answer: "exd4", howToAnswer: "exd4 — keep c3 under d4 and open the e-file for your rook.", why: "Releases the tension." },
      ],
    },
    [P("d4 d5 Nf3 Nf6 Bf4 e6 e3 c5 c3 Nc6")]: { yourMove: { san: "Nbd2", why: "Develop the knight without blocking the c-pawn. It supports e5 and a later e4." } },
    [P("d4 d5 Nf3 Nf6 Bf4 e6 e3 c5 c3 Nc6 Nbd2")]: {
      replies: [
        { san: "Bd6", verdict: "dubious", answer: "Bg3", howToAnswer: "Bg3.", why: "The trade offer again. Decline." },
        { san: "Be7", verdict: "good", answer: "Bd3", howToAnswer: "Bd3, O-O, then Ne5.", why: "Solid." },
        { san: "Qb6", verdict: "dubious", answer: "Qb3", howToAnswer: "Qb3.", why: "Hits b2; the trade offer solves it." },
        { san: "cxd4", verdict: "good", answer: "exd4", howToAnswer: "exd4.", why: "Fine for both." },
      ],
    },
    [P("d4 d5 Nf3 Nf6 Bf4 e6 e3 c5 c3 Nc6 Nbd2 Bd6")]: {
      yourMove: { san: "Bg3", why: "Sidestep the trade and keep the bishop on its diagonal. Trading your best piece hands Black easy equality." },
      mistakes: [{ san: "Bxd6", why: "Don't trade your best piece. The f4/g3-bishop is the soul of the London; after …Qxd6 Black is equal and comfortable." }],
      checkpoint: {
        question: "Black's bishop on d6 offers to trade off your f4-bishop. What do you do?",
        options: ["Bg3 — keep the bishop, sidestep the trade.", "Bxd6 — trade and simplify.", "Ignore it and castle."],
        correctIndex: 0,
        explanation: "The dark bishop is your main attacker and Black's is their awkward piece; trading helps only Black. Bg3 keeps it, and if they ever take, hxg3 is a fine structure.",
      },
    },

    // --- 3...c5 without ...e6: the ...Qb6 line -------------------------------------
    [P("d4 d5 Nf3 Nf6 Bf4 c5")]: { yourMove: { san: "e3", why: "Same setup. Black's early …c5 will be met by c3; if …Qb6 comes before c3, Qc1 guards b2." } },
    [P("d4 d5 Nf3 Nf6 Bf4 c5 e3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "c3", howToAnswer: "c3.", why: "Pressure on d4, which you defend twice." },
        { san: "Qb6", verdict: "dubious", answer: "Qc1", howToAnswer: "Qc1 — guards b2 and keeps c3 available. Never Nc3?! unless you know the Nb5 trap.", why: "The sharp try. Calm defence and it fizzles." },
        { san: "e6", verdict: "good", answer: "c3", howToAnswer: "c3, Nbd2, Bd3.", why: "Transposes to the main line." },
        { san: "cxd4", verdict: "good", answer: "exd4", howToAnswer: "exd4.", why: "Fine." },
      ],
    },
    [P("d4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6")]: { yourMove: { san: "c3", why: "Triangle complete; d4 is safe and the bishop has c2." } },
    [P("d4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6 c3 Qb6")]: {
      yourMove: { san: "Qb3", why: "Offer the trade. …Qxb3 axb3 gives you a healthy structure and an open a-file; …c4 Qxb6 axb6 is also comfortable." },
      mistakes: [{ san: "b3", why: "Weakens c3 and the long diagonal for nothing. Qb3 or Qc1 solve the b2 problem without creating another." }],
    },

    // --- 1...Nf6 and the fianchetto setup --------------------------------------------
    [P("d4 Nf6")]: {
      yourMove: { san: "Bf4", why: "Bishop out at once — before …d6 or …g6 can make f4 awkward. Nf3 and e3 follow." },
      mistakes: [{ san: "c4", why: "A fine move, but it's a different opening. In the London the bishop goes to f4 first." }],
    },
    [P("d4 Nf6 Bf4")]: {
      replies: [
        { san: "g6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, e3, Be2, h3, O-O.", why: "King's-Indian style. Switch to the …g6 plan." },
        { san: "e6", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3, Bd3.", why: "Standard." },
        { san: "d5", verdict: "good", answer: "e3", howToAnswer: "e3 (or Nf3) — the main structure.", why: "Transposes to the main line." },
        { san: "c5", verdict: "dubious", answer: "e3", howToAnswer: "e3. If …Qb6, Nc3!? is the trap line — Qc1 is simpler.", why: "Sharp, but your triangle holds." },
        { san: "Nh5", verdict: "dubious", answer: "Bg3", howToAnswer: "Bg3; if …Nxg3 hxg3.", why: "Offside knight." },
        { san: "d6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — covers e5 so ...e5 doesn't hit the bishop; then e3 and h3.", why: "Pirc-style; your bishop needs e5 covered." },
        { san: "Nc6", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3, then c3 or c4 — ...Nc6 blocks their c-pawn.", why: "Develops but blocks the ...c5 lever." },
      ],
    },
    [P("d4 Nf6 Bf4 g6")]: { yourMove: { san: "Nf3", why: "Develop and control e5. Against the fianchetto you'll follow with e3, Be2 and h3." } },
    [P("d4 Nf6 Bf4 g6 Nf3")]: {
      replies: [
        { san: "Bg7", verdict: "good", answer: "e3", howToAnswer: "e3, then Be2, h3, O-O.", why: "The natural continuation." },
        { san: "d6", verdict: "good", answer: "e3", howToAnswer: "e3, h3 (so ...Nh5 has no bite), Be2.", why: "Normal." },
        { san: "d5", verdict: "good", answer: "e3", howToAnswer: "e3, c3, Bd3 — back to the main structure.", why: "Transposes." },
        { san: "c5", verdict: "dubious", answer: "e3", howToAnswer: "e3; if ...Qb6 then Qc1 guards b2 (or Nc3 if you know the Nb5 trick).", why: "Strikes at d4 early." },
      ],
    },
    [P("d4 Nf6 Bf4 g6 Nf3 Bg7")]: { yourMove: { san: "e3", why: "Your bishop is already out, so e3 is right: solid centre, f1-bishop freed." } },
    [P("d4 Nf6 Bf4 g6 Nf3 Bg7 e3 O-O")]: {
      yourMove: { san: "Be2", why: "Safer than Bd3 here: …Nh5 and …Nf4 tricks don't hit anything, and h3 comes next to deny g4." },
    },
    [P("d4 Nf6 Bf4 g6 Nf3 Bg7 e3 O-O Be2 d6")]: {
      yourMove: { san: "h3", why: "Deny Black's pieces the g4-square and give the bishop a retreat on h2. Then castle and consider c4 or Nbd2–c4." },
    },
  },

  traps: [
    {
      name: "The …Qb6 trap (Nb5!)",
      sans: sans("1.d4 d5 2.Nf3 Nf6 3.Bf4 c5 4.e3 Qb6 5.Nc3 Qxb2 6.Nb5"),
      punisher: "white",
      tell: "Black's queen comes to b6 hitting b2 before you've played c3.",
      why: "5.Nc3 dares Black to take b2. After …Qxb2 6.Nb5! threatens Nc7+ forking king and rook, and Rb1 traps the queen. Only play it if you remember 6.Nb5 — otherwise Qc1 is the safe answer.",
    },
  ],

  modelGames: [
    {
      label: "Main setup vs …d5",
      sans: sans("d4 d5 Nf3 Nf6 Bf4 e6 e3 c5 c3 Nc6 Nbd2 Bd6 Bg3"),
      summary: "You build the trademark Bf4, e3, c3, Nbd2 structure and keep the bishop with Bg3, aiming a knight at e5 and your pieces at the kingside.",
    },
    {
      label: "Black hits back with …c5 and …Qb6",
      sans: sans("d4 d5 Nf3 Nf6 Bf4 c5 e3 Nc6 c3 Qb6 Qb3 c4 Qxb6 axb6"),
      summary: "Black's sharpest try hits b2 and d4. Qb3 offers the trade; after …c4 Qxb6 axb6 you have the healthier structure.",
    },
    {
      label: "vs a King's-Indian setup",
      sans: sans("d4 Nf6 Bf4 g6 Nf3 Bg7 e3 O-O Be2 d6 h3"),
      summary: "Get the bishop out early, settle into your structure, and add h3 to deny Black's pieces the g4-square.",
    },
    {
      label: "Move-order twin (1…Nf6 first)",
      sans: sans("d4 Nf6 Nf3 d5 Bf4 e6 e3 c5 c3 Nc6 Nbd2 Bd6 Bg3"),
      summary: "The moves arrive in the other order and from move 4 the position is identical. The London doesn't depend on the sequence.",
    },
  ],

  middlegamePlan:
    "The London is a setup, so once you've played Bf4–e3–c3–Nbd2 and Bd3, choose a plan. The classic one is a kingside attack: " +
    "plant a knight on e5 (backed by Nd2–f3 and the f-pawn), aim Bd3 and Qf3 or Qe2 at h7, and roll f4 (sometimes g4). " +
    "The other is the e4 break once it's prepared. Keep your dark-squared bishop healthy — retreat Bg3 rather than trade it. " +
    "Black's critical counter is …c5 with …Qb6 hitting b2; defend calmly (Qb3 or Qc1) and carry on.",

  structureDiagram: {
    fen: "r1bqk2r/pp3ppp/2nbpn2/2pp4/3P4/2P1PNB1/PP1N1PPP/R2QKB1R b KQkq - 4 7",
    orientation: "white",
    arrows: [{ from: "f3", to: "e5" }],
    caption:
      "The London System: an easy, repeatable setup (Bf4, e3, c3, Nbd2). White plants a knight on e5, eyes the b1–h7 diagonal, and can build a kingside attack.",
  },
};
