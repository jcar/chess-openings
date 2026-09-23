// Ruy Lopez (1.e4 e5 2.Nf3 Nc6 3.Bb5) — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines are standard public theory. Prose original.
//
// The Spanish is a slow opening about one pawn: Black's e5. The bishop on b5
// leans on the knight that defends it, and White never grabs the pawn — the
// pressure is the point. Castle, Re1, then c3 and d4, and let the bishop
// retreat along a4–b3–c2 as Black kicks it. The one rule: c3 before d4, so the
// bishop always has c2 and the centre pawn always has support.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const ruyLopez: OpeningSpec = {
  id: "ruy-lopez",
  name: "Ruy Lopez",
  aliases: ["Spanish", "Spanish Game"],
  eco: "C60–C99",
  side: "white",
  family: "1e4-e5",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Bb5",
  tabiyaFen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
  pitch:
    "The Spanish is a slow squeeze: the bishop on b5 leans on the knight that guards e5, and you build up behind it instead of grabbing anything. " +
    "The moves are the same almost every game, so you learn one plan deeply, and most opponents under 1200 lose patience long before you have to.",

  setup: {
    pieces: [
      { piece: "B", squares: ["a4", "b3", "c2"], why: "The Spanish bishop. It goes to b5 to pin, retreats to a4 when kicked, and settles on b3 looking at f7. When ...Na5 comes, c2 is its home — which is why c3 must already be in." },
      { piece: "N", squares: ["f3"], why: "The king's knight: it hits e5, guards h2, and later hops to g5 or d4 when the centre opens." },
      { piece: "R", squares: ["e1"], why: "The rook covers e4. Once it is there the bishop can leave the a4–e8 diagonal without the e-pawn falling to ...Nxe4." },
      { piece: "N", squares: ["d2", "c3"], why: "The queen's knight takes the long road: d2, then f1, then g3 or e3. Slow, but it arrives on the kingside just as the position opens." },
    ],
    pawns: ["e4", "c3"],
    order: [
      {
        before: "c3",
        after: "d4",
        why: "c3 first, then d4. The pawn on c3 supports the push, and it opens c2 so the bishop can drop back when ...Na5 and ...c5 come. Push d4 without it and the bishop can be trapped on b3 — the Noah's Ark trap, which beginners fall into every day.",
      },
    ],
    castle: "O-O",
    castleBy: 6,
  },

  ideas: [
    {
      id: "ruy-lean-on-e5",
      title: "Lean on e5, never take it",
      oneLiner: "Bb5 pressures the knight that guards e5. The pawn is not for taking.",
      why: "The whole opening is pressure, not material. With Bb5 pinning the c6-knight and Nf3 attacking, Black has to spend moves keeping e5 alive: ...d6, ...Be7, ...b5. Every one of those moves is a move not spent attacking you. If you ever play Nxe5 while the knight still stands on c6, you have given a knight for a pawn.",
    },
    {
      id: "ruy-a6-retreat",
      title: "...a6: retreat to a4",
      oneLiner: "When the pawn kicks the bishop, drop back to a4 and keep the pressure.",
      why: "Ba4 keeps the bishop on the diagonal to c6, so the knight stays tied to its job. Trading on c6 (the Exchange Variation) is a real opening too, but it gives away the piece that makes the Spanish work. Keep it.",
      trigger: { kind: "opponent_san", sans: ["a6"] },
      response: "Ba4.",
    },
    {
      id: "ruy-e4-bait",
      title: "e4 is bait once you have castled",
      oneLiner: "If they take e4 with the knight, Re1 hits it and you win the pawn back.",
      why: "After 5.O-O the e-pawn is loose on purpose. If Black takes it, Re1 attacks the knight, and Bxc6 followed by Nxe5 gets the pawn back with a better structure for you. The knight on e4 has to run, and Black's development stalls. Grandmasters play 6.d4 here; Re1 is the simpler road and it is just as sound.",
      trigger: { kind: "opponent_san", sans: ["Nxe4"] },
      response: "Re1, then Bxc6 and Nxe5.",
    },
    {
      id: "ruy-b5-bb3",
      title: "...b5 kicks again: go to b3",
      oneLiner: "Retreat to b3, never take on b5. From b3 the bishop stares at f7.",
      why: "Bxb5 axb5 hands over a bishop for a pawn. Bb3 keeps the bishop on the best diagonal on the board, a2–g8, where it points at f7 for the rest of the game. Make sure e4 is covered first — Re1 or d3 — because from b3 the bishop no longer defends it by the Bxc6 trick.",
      trigger: { kind: "opponent_san", sans: ["b5"] },
      response: "Bb3.",
      ifIgnored: "Bxb5 axb5 and you have traded the Spanish bishop for one pawn.",
    },
    {
      id: "ruy-c3-then-d4",
      title: "c3, then d4",
      oneLiner: "The plan: c3 gives the bishop c2 and supports d4. Then push.",
      why: "Once both sides are castled, White's plan is the same every game: c3, h3 to stop ...Bg4, then d4. The pawn on c3 means ...exd4 can be met by cxd4 and the centre stays full. It also means ...Na5 hitting the bishop is answered by Bc2, still pointing at h7.",
      trigger: { kind: "epd", epds: [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6")] },
      response: "c3, then h3 and d4.",
    },
    {
      id: "ruy-noahs-ark",
      title: "Watch for Noah's Ark",
      oneLiner: "...c5 and ...c4 can trap the bishop on b3. c3 gives it c2.",
      why: "With Black's pawns on a6 and b5, a bishop on b3 has exactly one retreat square: c2. If c3 has not been played, ...c5 and ...c4 simply shut the door and the bishop is lost for a pawn or two. The moment ...c5 appears, ask whether c2 is free.",
      trigger: { kind: "opponent_san", sans: ["c5"] },
      response: "Check c2 is open. If it is not, get the bishop out now.",
    },
    {
      id: "ruy-book-end",
      title: "When the book runs out",
      oneLiner: "Castled, c3, h3, d4 in. Now reroute the knight: Nbd2, Nf1, Ng3.",
      why: "The Closed Spanish middlegame is a manoeuvring game. Your knight walks Nbd2–f1–g3 (or e3), the bishop sits on c2, and you decide between keeping the centre closed with d5 or opening it with dxe5. Black will try ...c5 and ...Nc6 on the queenside. Do not hurry. The side that improves its worst piece one more time usually wins.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "e4", why: "Take the centre and open both bishops. Everything else follows." } },

    [P("e4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — attack e5 and develop. Bb5 comes next.", why: "The classical reply, and the one this opening is built for." },
        { san: "c5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Nc3 or c3 — a Sicilian, so the Spanish plan does not apply. Develop and castle.", why: "The Sicilian. Black fights for d4 from the side." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 or Nd2 — a French. Take the centre while it is offered.", why: "The French: solid, and it shuts in Black's own light bishop." },
        { san: "c6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — a Caro-Kann. Same idea: take the space.", why: "The Caro-Kann prepares ...d5 without blocking the bishop." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — take. If ...Qxd5 then Nc3 gains time on the queen.", why: "The Scandinavian. Black gets the queen out early, and you get to chase it." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nf3 and Nc3 — you get the full centre for free.", why: "Passive. Black blocks the f8-bishop before it has moved." },
        { san: "Nf6", verdict: "dubious", answer: "e5", howToAnswer: "e5 — kick the knight, then d4. After that stop chasing and just develop.", why: "The Alekhine invites you to gain space. Take it, but do not overextend." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nc3 and Be3 — build the centre and castle.", why: "The Modern. Black lets you have the centre and hopes to hit it later." },
      ],
    },

    [P("e4 e5")]: {
      yourMove: { san: "Nf3", why: "Develop with a threat. e5 is attacked, and the knight is on its best square for the whole opening." },
      mistakes: [{ san: "Qh5", why: "The Wayward Queen. ...Nc6 defends e5, ...Nf6 kicks the queen, and you have spent two moves achieving nothing." }],
    },
    [P("e4 e5 Nf3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "Bb5", howToAnswer: "Bb5 — the Spanish bishop. Lean on the knight that guards e5.", why: "The main line. Black defends e5 the natural way." },
        { san: "Nf6", verdict: "good", answer: "Nxe5", howToAnswer: "Nxe5 — take. After ...d6 retreat Nf3, and when they take e4 back, Qe2 or d3 is simple and safe.", why: "The Petrov: Black counterattacks instead of defending. Solid, but the queenless positions are drawish." },
        { san: "d6", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4, then Nc3 and d4 — take the centre while Black's bishop is stuck behind the pawn.", why: "The Philidor. Passive: the f8-bishop is blocked before it moves." },
        { san: "Bc5", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5 — the pawn really is loose here. If ...Bxf2+ Kxf2 Qh4+, play g3 and the checks run out with you well ahead.", why: "Develops without defending e5. It sets a trick on f2, but the trick fails." },
        { san: "f6", verdict: "bad", answer: "Nxe5", howToAnswer: "Nxe5! If ...fxe5 then Qh5+ wins material; after ...Qe7 retreat Nf3 and you are a clean pawn up.", why: "The Damiano. Defending a pawn with the f-pawn opens the king and takes f6 from the knight." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — take. If ...e4 then Qe2 hits it; if ...Qxd5 then Nc3.", why: "The Elephant Gambit. Black gives a pawn for activity that never quite arrives." },
        { san: "Qe7", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3, then Bc4 and castle. The queen on e7 blocks Black's own bishop.", why: "It defends e5 with the piece that least wants the job." },
        { san: "Qf6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — develop. Nd5 will hit the queen and c7 soon enough.", why: "An early queen that takes the f6-square from the knight." },
      ],
    },

    // --- 3.Bb5 ----------------------------------------------------------------
    [P("e4 e5 Nf3 Nc6")]: {
      yourMove: { san: "Bb5", why: "The Spanish move. It attacks the knight that defends e5, and Black has to answer it before doing anything else." },
      mistakes: [{ san: "Nxe5", why: "The pawn is defended. After ...Nxe5 you have given a knight for a pawn. The bishop pressures the defender; it does not win the pawn." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5")]: {
      replies: [
        { san: "a6", verdict: "good", answer: "Ba4", howToAnswer: "Ba4 — retreat and keep the pressure on c6.", why: "The Morphy Defence, the main line. Black asks the bishop to decide." },
        { san: "Nf6", verdict: "good", answer: "d3", howToAnswer: "d3 — hold e4 and keep it simple. Castle, c3, Re1 as usual.", why: "The Berlin. Black hits e4 instead of defending the bishop's threat. Solid and respectable." },
        { san: "Bc5", verdict: "good", answer: "O-O", howToAnswer: "O-O — castle, then Nc3 and d3. Watch the trick ...Nd4 and just trade it off.", why: "The Classical. Black develops the bishop actively toward f2." },
        { san: "d6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then c3 and d4 — take the centre against a passive setup.", why: "The Old Steinitz. Solid, but it locks in the f8-bishop." },
        { san: "Nge7", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 — the knight on e7 blocks the f8-bishop, so take the centre while Black untangles.", why: "The Cozio. It unpins in advance but blocks the f8-bishop." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 O-O — the knight trade helps you; Black's d4-pawn will need looking after.", why: "Bird's Defence. Black offers a trade to unpin, at the cost of a loose pawn." },
        { san: "f5", verdict: "dubious", answer: "d3", howToAnswer: "d3 — calm. If ...fxe4 dxe4 you are simply better developed. Do not grab on f5.", why: "The Schliemann gambit wants a wild game. Decline it." },
        { san: "g6", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 — with the bishop heading for g7, the big centre is exactly right.", why: "The fianchetto lets you take the centre for free." },
        { san: "Qf6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — develop and get ready for Nd5, which hits the queen.", why: "An early queen on the knight's square." },
      ],
    },

    // --- 3...a6 4.Ba4 -----------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 Bb5 a6")]: {
      yourMove: { san: "Ba4", why: "Keep the bishop on the diagonal to c6. Trading with Bxc6 is a real line too, but this one keeps your best piece." },
      mistakes: [{ san: "Bd3", why: "Retreating toward the centre puts the bishop in front of your own d-pawn. Now d4 is impossible and the c1-bishop is buried. Black already has ...f5 with a good game." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "O-O", howToAnswer: "O-O — castle and leave e4 as bait. If ...Nxe4, Re1.", why: "The main line. Black develops and hits e4." },
        { san: "b5", verdict: "good", answer: "Bb3", howToAnswer: "Bb3 — the bishop goes to the a2–g8 diagonal. Never Bxb5.", why: "Kicking the bishop again. It gains queenside space but leaves the a6-b5 pawns as long-term targets." },
        { san: "d6", verdict: "good", answer: "c3", howToAnswer: "c3 — prepare d4 with c2 kept free. Do NOT play d4 now: ...b5 Bb3 Nxd4 and ...c5, ...c4 traps the bishop.", why: "The Modern Steinitz. Solid, and it hides the Noah's Ark trap for careless players." },
        { san: "Bc5", verdict: "good", answer: "c3", howToAnswer: "c3, then castle and d4 — the bishop on c5 will be hit and has to move again.", why: "Active development. c3 and d4 puts the question to it." },
        { san: "Nge7", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4.", why: "It unpins but blocks the f8-bishop." },
        { san: "g6", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 — build the centre while Black builds the fianchetto.", why: "Slow. You get the centre for free." },
        { san: "f5", verdict: "dubious", answer: "d3", howToAnswer: "d3 — solid. After ...fxe4 dxe4 and Nxe5 ideas you come out ahead.", why: "A delayed Schliemann. Same answer: decline the mess." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 O-O — the pawn on d4 is now Black's problem.", why: "A trade that costs Black the centre pawn's support." },
        { san: "Be7", verdict: "good", answer: "O-O", howToAnswer: "O-O, then Re1 — the same setup in a different order.", why: "Calm development. It usually transposes to the main line." },
      ],
    },

    // 4...b5
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 b5")]: {
      yourMove: { san: "Bb3", why: "The only sensible retreat. From b3 the bishop looks at f7 for the rest of the game." },
      mistakes: [{ san: "Bxb5", why: "...axb5. A bishop for a pawn, and the Spanish bishop at that." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 b5 Bb3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "d3", howToAnswer: "d3 — hold e4 first, because from b3 the bishop no longer covers it. Castle next.", why: "Natural. It hits e4 while the bishop has just stopped defending it." },
        { san: "Bc5", verdict: "good", answer: "c3", howToAnswer: "c3, then d4 — the bishop will have to move again. Do not try Nxe5 here: ...Qh4 turns it into a mess.", why: "Active, and a target once d4 comes." },
        { san: "Bb7", verdict: "good", answer: "c3", howToAnswer: "c3, then castle and d4.", why: "The bishop eyes e4 from a distance. Keep e4 covered and build." },
        { san: "d6", verdict: "dubious", answer: "c3", howToAnswer: "c3, castle, then d4.", why: "Solid but slow. Black's bishop is locked in." },
      ],
    },

    // 4...d6
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6")]: {
      yourMove: { san: "c3", why: "Prepare d4 with the pawn AND give the bishop c2 to run to. Both matter here." },
      mistakes: [{ san: "d4", why: "Noah's Ark. ...b5 Bb3 Nxd4 Nxd4 exd4 Qxd4 c5, then ...Be6 and ...c4, and the bishop on b3 has nowhere to go. c3 first, every time." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 d6 c3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "d4", howToAnswer: "d4 — supported, and with c2 free for the bishop.", why: "Natural development. Now the push is safe." },
        { san: "f5", verdict: "dubious", answer: "d4", howToAnswer: "d4 — hit the centre back; Black's king is airy.", why: "Aggressive but loosening." },
        { san: "Bd7", verdict: "good", answer: "d4", howToAnswer: "d4, then castle.", why: "Breaking the pin quietly." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — take the centre while they fianchetto.", why: "Slow." },
      ],
    },

    // --- 4...Nf6 5.O-O -----------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6")]: {
      yourMove: { san: "O-O", why: "King safe, rook ready for e1. The e-pawn is left as bait on purpose." },
      mistakes: [{ san: "Nxe5", why: "...Nxe5 and you have lost a knight for a pawn. The c6-knight still guards e5; only Bxc6 first would change that." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O")]: {
      replies: [
        { san: "Be7", verdict: "good", answer: "Re1", howToAnswer: "Re1 — cover e4 so the bishop can retreat to b3 when ...b5 comes.", why: "The Closed Spanish. Both sides build; the fight is about e5 and d4." },
        { san: "Nxe4", verdict: "good", answer: "Re1", howToAnswer: "Re1 — hit the knight. After ...Nc5 Bxc6 dxc6 Nxe5 you have the pawn back and a better structure.", why: "The Open Spanish. Black takes the bait; you get activity for it." },
        { san: "b5", verdict: "good", answer: "Bb3", howToAnswer: "Bb3 — then Re1 or d3 to hold e4. If ...Nxe4 comes anyway, Re1 d5 Nc3 gets it back.", why: "Kicking the bishop first. It leaves e4 momentarily loose, so cover it." },
        { san: "Bc5", verdict: "good", answer: "c3", howToAnswer: "c3, then d4 — the bishop is asked to move again.", why: "Active but exposed to the centre push." },
        { san: "d6", verdict: "good", answer: "c3", howToAnswer: "c3, then Re1 and d4.", why: "Solid, passive." },
        { san: "Nd4", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5! The knight left c6, so e5 has no defender. Then c3 hits the d4-knight.", why: "A trick that backfires: e5 drops as soon as the knight leaves c6." },
      ],
    },

    // 5...Be7 6.Re1
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7")]: {
      yourMove: { san: "Re1", why: "The rook guards e4. Now when ...b5 kicks the bishop to b3, nothing hangs." },
      mistakes: [{ san: "Nxe5", why: "...Nxe5 wins a knight for a pawn. Nothing has changed on c6." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1")]: {
      replies: [
        { san: "b5", verdict: "good", answer: "Bb3", howToAnswer: "Bb3 — the bishop lands on its best diagonal, and Re1 already covers e4.", why: "The main line. Black gains space and commits the queenside pawns." },
        { san: "d6", verdict: "good", answer: "c3", howToAnswer: "c3, then h3 and d4.", why: "Solid. The plan is the same." },
        { san: "O-O", verdict: "good", answer: "c3", howToAnswer: "c3 — if ...b5 Bb3 d5 comes (a Marshall idea), just take: exd5 Nxd5 Nxe5.", why: "Castling first keeps Black's options open." },
        { san: "Nxe4", verdict: "bad", answer: "Rxe4", howToAnswer: "Rxe4 — the knight is simply lost. Even ...d5 forking the rook gets nothing back after Nxe5.", why: "With the rook on e1, e4 is no longer bait; it is a trap." },
        { san: "d5", verdict: "bad", answer: "Nxe5", howToAnswer: "Nxe5 — e5 falls and Bxc6 ideas follow. You come out material up.", why: "Too ambitious: Black's pieces are not ready for the centre to open." },
        { san: "Bc5", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 — the bishop moved twice to get hit.", why: "Losing time." },
      ],
    },

    // 6...b5 7.Bb3
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5")]: {
      yourMove: { san: "Bb3", why: "Retreat to the long diagonal at f7. Re1 already holds e4, so nothing is loose." },
      mistakes: [{ san: "Bxb5", why: "...axb5 and you have given a bishop for a pawn. Retreat, always." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3")]: {
      replies: [
        { san: "d6", verdict: "good", answer: "c3", howToAnswer: "c3 — the Closed Spanish proper. h3 and d4 next.", why: "The main line. Black supports e5 for the long game." },
        { san: "O-O", verdict: "good", answer: "c3", howToAnswer: "c3. If ...d5 (the Marshall) then exd5 Nxd5 Nxe5 Nxe5 Rxe5 — a pawn up, then d4 and defend carefully.", why: "Castling before ...d6 keeps the Marshall gambit in reserve." },
        { san: "Bb7", verdict: "good", answer: "c3", howToAnswer: "c3, then d4 or a4.", why: "The bishop watches e4 from b7. Keep it covered." },
        { san: "Nxe4", verdict: "bad", answer: "Rxe4", howToAnswer: "Rxe4 — the knight is gone. If ...d5 forks, Nxe5 hits c6 and everything unravels for Black.", why: "The rook on e1 makes e4 poison." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 Nxd5 Nxe5 Nxe5 Rxe5 — a pawn up. Then c6 d3 and castle into a solid position.", why: "A Marshall without castling first. You take the pawn and keep it." },
        { san: "Bc5", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4.", why: "Time-wasting." },
        { san: "Na5", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5! The knight left c6, so e5 is loose. After ...Nxb3 axb3 you are a pawn up.", why: "Hitting the bishop before ...d6 leaves e5 undefended." },
      ],
    },

    // 7...d6 8.c3
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6")]: {
      yourMove: { san: "c3", why: "The heart of the Spanish plan. It prepares d4 and gives the bishop c2 for when ...Na5 comes." },
      mistakes: [{ san: "Nc3", why: "The knight takes c3 from the pawn, so there is no c2 for the bishop. ...Na5 and ...Nxb3 trade off your best piece." }],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "h3", howToAnswer: "h3 — stop ...Bg4 before you play d4.", why: "The main line. Both kings are safe and the manoeuvring begins." },
        { san: "Bg4", verdict: "good", answer: "h3", howToAnswer: "h3 — ask the bishop. After ...Bh5, d3 and Nbd2 keep everything covered.", why: "Pinning the knight that will guard d4. Deal with it first." },
        { san: "Na5", verdict: "good", answer: "Bc2", howToAnswer: "Bc2 — the retreat c3 was for. The bishop still points at h7.", why: "Black hits the bishop. Because c3 is in, it has a home." },
        { san: "Bb7", verdict: "good", answer: "d4", howToAnswer: "d4 — supported and safe.", why: "Sensible development." },
        { san: "Qd7", verdict: "dubious", answer: "d4", howToAnswer: "d4 — take the centre; the queen on d7 blocks Black's own bishop.", why: "An odd square for the queen." },
        { san: "Nxe4", verdict: "bad", answer: "Bd5", howToAnswer: "Bd5! It hits the knight and c6 at once. Black loses a piece.", why: "e4 has been poison since Re1. Now it is worse: the bishop joins in." },
      ],
    },

    // 8...O-O 9.h3
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O")]: {
      yourMove: { san: "h3", why: "The famous little move. It takes g4 from Black's bishop, so d4 can be played without the f3-knight being pinned." },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3")]: {
      replies: [
        { san: "Na5", verdict: "good", answer: "Bc2", howToAnswer: "Bc2 — then ...c5 d4 and the middlegame begins.", why: "The Chigorin. Black hits the bishop and prepares ...c5." },
        { san: "Bb7", verdict: "good", answer: "d4", howToAnswer: "d4 — the Zaitsev. Nbd2 next.", why: "The bishop eyes e4 for a later ...d5 or ...exd4." },
        { san: "Re8", verdict: "good", answer: "d4", howToAnswer: "d4, then Nbd2.", why: "Preparing ...Bf8 and a slow regroup." },
        { san: "Be6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — if ...Bxb3 Qxb3, the queen is happy on b3.", why: "Offering to trade your best bishop. You do not mind." },
        { san: "h6", verdict: "dubious", answer: "d4", howToAnswer: "d4.", why: "A waiting move." },
        { san: "Nd7", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nbd2 — the knight on d7 is not doing much.", why: "Slow regrouping." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5")]: {
      yourMove: { san: "Bc2", why: "Exactly why c3 was played. The bishop keeps the b1–h7 diagonal." },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5 Bc2")]: {
      replies: [
        { san: "c5", verdict: "good", answer: "d4", howToAnswer: "d4 — the main line. Nbd2 and the knight tour come next.", why: "Black claims queenside space. Now you claim the centre." },
        { san: "Nc6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the knight came back; you gained a move.", why: "Undoing the last move." },
        { san: "Nc4", verdict: "dubious", answer: "d4", howToAnswer: "d4 — or b3 to kick the knight. Either way you are comfortable.", why: "A knight on c4 looks active but has no support." },
        { san: "Bb7", verdict: "good", answer: "d4", howToAnswer: "d4.", why: "Development." },
        { san: "Re8", verdict: "good", answer: "d4", howToAnswer: "d4.", why: "Regrouping." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5 Bc2 c5")]: {
      yourMove: { san: "d4", why: "Supported by c3, with h3 stopping the pin. This is the centre push the whole opening prepared." },
    },

    // --- 5...Nxe4: the Open Spanish, the simple way ----------------------------------
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4")]: {
      yourMove: { san: "Re1", why: "Hit the knight. It has to run, and Bxc6 followed by Nxe5 gets the pawn back. (6.d4 is the grandmaster move; this is the one you can play without study.)" },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 Re1")]: {
      replies: [
        { san: "Nc5", verdict: "good", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 Nxe5 — pawn back, and Black's c-pawns are doubled.", why: "The knight hits the bishop. Trade first, then take e5." },
        { san: "Nd6", verdict: "good", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 Nxe5 — level material, and Black's knight on d6 blocks its own bishop.", why: "Blocking the diagonal. Same recipe." },
        { san: "Nf6", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5 — the knight went home, so take e5 while the pin still holds.", why: "Retreating gives you the pawn back at once." },
        { san: "Be7", verdict: "bad", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 Rxe4 — a whole knight.", why: "The knight on e4 is attacked and nothing defends it." },
        { san: "d5", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5 — the pin on c6 means e5 comes with tempo. Bxc6+ next.", why: "Ambitious, but the e5-pawn just falls." },
        { san: "f5", verdict: "bad", answer: "d3", howToAnswer: "d3 — kick the knight; then Bxc6 and Nxe5 with Black's king wide open.", why: "Defending a knight with the f-pawn loosens the king for nothing." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 Re1 Nc5")]: {
      yourMove: { san: "Bxc6", why: "Remove the defender of e5 first. Now Nxe5 is safe." },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 Re1 Nc5 Bxc6")]: {
      replies: [
        { san: "dxc6", verdict: "good", answer: "Nxe5", howToAnswer: "Nxe5 — level again, and you have the better structure.", why: "Recapturing toward the centre and opening the bishop." },
        { san: "bxc6", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5 — the c6-pawn is now a target too.", why: "Recapturing away from the centre leaves the queenside pawns ugly." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 Re1 Nc5 Bxc6 dxc6")]: {
      yourMove: { san: "Nxe5", why: "Pawn back. Black has doubled c-pawns, you have the e-file, and the game is calm." },
    },

    // --- 3...Nf6: the Berlin, kept simple -------------------------------------------
    [P("e4 e5 Nf3 Nc6 Bb5 Nf6")]: {
      yourMove: { san: "d3", why: "Hold e4 and keep it a normal Spanish. The queenless Berlin endgame after 4.O-O Nxe4 is a grandmaster's choice; you do not need it." },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 Nf6 d3")]: {
      replies: [
        { san: "Bc5", verdict: "good", answer: "c3", howToAnswer: "c3 — prepare d4 and give the bishop c2. Castle next.", why: "The main line. Black's bishop takes the active diagonal." },
        { san: "d6", verdict: "good", answer: "c3", howToAnswer: "c3, then castle and d4.", why: "Solid." },
        { san: "a6", verdict: "good", answer: "Ba4", howToAnswer: "Ba4 — same bishop, same plan.", why: "Kicking the bishop. It transposes to the main lines." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 O-O — the d4-pawn is a target, not a strength.", why: "A trade that loosens Black's centre." },
        { san: "Be7", verdict: "good", answer: "O-O", howToAnswer: "O-O, then c3 and Re1.", why: "Quiet development." },
        { san: "g6", verdict: "dubious", answer: "O-O", howToAnswer: "O-O, then c3 and d4.", why: "A second bishop move planned before the first is finished." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5")]: {
      yourMove: { san: "c3", why: "The Spanish pawn. It prepares d4 and gives the bishop c2." },
      mistakes: [{ san: "Nxe5", why: "The fork trick misfires here: ...Nxe5 d4 c6! hits your bishop as well, and once the dust settles material is level and Black stands better. Keep it slow." }],
    },

    // --- 3...Bc5: the Classical ------------------------------------------------------
    [P("e4 e5 Nf3 Nc6 Bb5 Bc5")]: {
      yourMove: { san: "O-O", why: "King safe first. The bishop on c5 looks at f2, so castling early is exactly right." },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 Bc5 O-O")]: {
      replies: [
        { san: "Nd4", verdict: "good", answer: "Nxd4", howToAnswer: "Nxd4 Bxd4 c3 — the bishop is kicked and d4 comes next.", why: "Black's trick: the knight hits the bishop. Trade and gain time." },
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — defend e4 and develop. d3 next.", why: "Natural. An Italian-flavoured Spanish." },
        { san: "Nge7", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 — the knight on e7 blocks the bishop's retreat.", why: "Unpinning early at the cost of a clumsy knight." },
        { san: "d6", verdict: "good", answer: "c3", howToAnswer: "c3, then d4.", why: "Solid." },
        { san: "a6", verdict: "dubious", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 Nxe5 — with the knight gone, e5 is simply free.", why: "Kicking the bishop before defending e5 loses the pawn." },
        { san: "Qf6", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 — the queen and bishop both get hit.", why: "An early queen that will be chased." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 Bc5 O-O Nf6")]: {
      yourMove: { san: "Nc3", why: "Cover e4 and develop. With the bishop on c5, a quiet d3 setup is the sensible choice." },
    },
    [P("e4 e5 Nf3 Nc6 Bb5 Bc5 O-O Nf6 Nc3")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "d3", howToAnswer: "d3 — solid. Na4 to trade off the c5-bishop is a good follow-up.", why: "Both kings safe; a slow manoeuvring game." },
        { san: "d6", verdict: "good", answer: "d3", howToAnswer: "d3, then Na4 or Bg5.", why: "Solid support for e5." },
        { san: "Nd4", verdict: "dubious", answer: "Nxe5", howToAnswer: "Nxe5 — the knight left c6, so e5 is loose.", why: "The trick works less well once you have a knight on c3 to cover things." },
        { san: "a6", verdict: "dubious", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 Nxe5 — a free pawn.", why: "Same mistake: kicking the bishop before defending e5." },
        { san: "Ng4", verdict: "dubious", answer: "h3", howToAnswer: "h3 — ask the knight what it is doing there.", why: "An early raid on f2 that h3 sends home." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bb5 Bc5 O-O Nf6 Nc3 O-O")]: {
      yourMove: { san: "d3", why: "A restrained centre. The plan is Na4 to remove the c5-bishop, then c3 and d4 later." },
    },
  },

  traps: [
    {
      name: "Noah's Ark",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 d6 5.d4 b5 6.Bb3 Nxd4 7.Nxd4 exd4 8.Qxd4 c5 9.Qd5 Be6 10.Qc6+ Bd7 11.Qd5 c4"),
      punisher: "black",
      tell: "You push d4 before c3, Black plays ...b5 and trades on d4, and the queen recapture looks free.",
      why: "The bishop on b3 has one retreat square, c2, and without c3 it is blocked by your own pawn. After ...c5 and ...c4 the bishop is caught and goes for a pawn or two. The cure is always the same: c3 before d4.",
    },
    {
      name: "Grabbing e5 too soon",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.Nxe5 Nxe5"),
      punisher: "black",
      tell: "The bishop has pinned the c6-knight for two moves and e5 starts to look undefended.",
      why: "A pin is not a capture. The c6-knight still takes on e5, and you have given a knight for a pawn. Only after Bxc6 removes the defender does Nxe5 become a real threat — which is exactly what happens in the Open Spanish.",
    },
    {
      name: "e4 is poison after Re1",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 Nxe4 8.Rxe4 d5 9.Nxe5"),
      punisher: "white",
      tell: "Black kicks the bishop with ...b5 and, now that it no longer covers e4 through c6, takes the pawn.",
      why: "The rook took over the job of guarding e4 on move six. After Rxe4 the ...d5 fork looks like it wins the rook back, but Nxe5 hits c6 and the whole thing collapses on Black. Material stays firmly in your favour.",
    },
  ],

  modelGames: [
    {
      label: "The Closed Spanish, move by move",
      sans: sans("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3 Na5 Bc2 c5 d4 Qc7 Nbd2"),
      summary: "The whole plan in eleven moves: pin, retreat along a4–b3, castle, Re1, c3, h3, then d4 with the knight setting off on its d2–f1–g3 tour.",
    },
    {
      label: "The Open Spanish, the simple way",
      sans: sans("e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 Re1 Nc5 Bxc6 dxc6 Nxe5 Be7 d3 O-O Nc3 Be6 Be3"),
      summary: "Black takes the bait on e4. Re1 hits the knight, Bxc6 removes the defender, Nxe5 gets the pawn back, and Black is left with doubled c-pawns while you develop quietly.",
    },
    {
      label: "The Berlin, kept quiet",
      sans: sans("e4 e5 Nf3 Nc6 Bb5 Nf6 d3 Bc5 c3 O-O O-O d5 exd5 Qxd5 Qb3 Qd6 Nbd2"),
      summary: "d3 holds e4 and avoids the famous queenless endgame. c3 prepares d4 and gives the bishop c2; Black frees the game with ...d5 and you develop calmly.",
    },
  ],

  middlegamePlan:
    "The Closed Spanish middlegame is about patience. Once c3, h3 and d4 are in, reroute the queen's knight Nbd2–f1–g3 (the Chigorin manoeuvre) and keep the bishop on c2 aimed at h7. " +
    "Decide the centre only when you are ready: d5 closes it and you play on the kingside with Nf5 and g4; dxe5 or dxc5 opens it for your rooks. " +
    "Black's counterplay comes from ...c5 and ...Nc6 on the queenside and from ...Bg4 pinning your knight — h3 exists to stop the pin. " +
    "Never trade the Spanish bishop cheaply, and never let ...c4 trap it: c2 must always be free. The side that improves its worst piece one more time usually wins.",

  structureDiagram: {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 1 9",
    orientation: "white",
    arrows: [
      { from: "d2", to: "d4" },
      { from: "b1", to: "d2" },
    ],
    caption: "The Closed Spanish: the bishop on b3 aims at f7, c3 prepares d4 and keeps c2 free, and the queen's knight is about to set off on its d2–f1–g3 tour.",
  },
};
