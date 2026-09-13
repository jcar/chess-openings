// Italian Game — hand-authored OpeningSpec for 0–1200 players (White).
//
// Positions, lines, and the standout mistakes are reused from ChessHall's
// engine-verified content (facts). The setup, idea triggers, and every "why"
// below are written for a beginner who will meet ...Nf6, ...h6, ...d6 and ...Nd4
// far more often than the Giuoco Piano main line.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const italianGame: OpeningSpec = {
  id: "italian-game",
  name: "Italian Game",
  aliases: ["Giuoco Piano"],
  eco: "C50–C54",
  side: "white",
  family: "1e4-e5",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Bc4",
  tabiyaFen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
  pitch:
    "Three natural moves put a knight in the centre and a bishop on the one square Black's king has to defend alone. " +
    "You then build slowly — c3, d3, castle — and wait for your opponent to overreach. Nothing to memorise, everything to understand.",

  setup: {
    pieces: [
      { piece: "B", squares: ["c4", "b3"], why: "The Italian bishop: it lives on the a2–g8 diagonal, staring at f7." },
      { piece: "N", squares: ["f3"], why: "Controls e5 and d4 and covers your king." },
      { piece: "N", squares: ["d2", "c3"], why: "Your second knight develops without blocking the c-pawn: d2, then later f1 and g3." },
      { piece: "B", squares: ["e3", "g5", "c1"], why: "The dark bishop stays flexible: it can trade on e3, pin on g5, or wait." },
    ],
    pawns: ["e4", "d3", "c3"],
    order: [
      {
        before: "c3",
        after: "d4",
        why: "Only push d4 once c3 supports it. Without c3, Black trades on d4 and your centre disappears.",
      },
    ],
    castle: "O-O",
    castleBy: 7,
  },

  ideas: [
    {
      id: "italian-f7",
      title: "Your bishop points at f7",
      oneLiner: "f7 is guarded by the king alone — every piece you aim there raises the pressure.",
      why:
        "Before Black castles, f7 is the weakest square on the board. The bishop on c4 doesn't need to capture anything; " +
        "its job is to make ...d5 and ...f5 awkward and to make Ng5 a real threat later. Keep it on that diagonal.",
    },
    {
      id: "italian-quiet-build",
      title: "Build slowly: c3, d3, castle",
      oneLiner: "Don't rush. Support the centre, tuck the king away, then improve.",
      why:
        "The quiet Italian works because White does nothing risky. c3 gives the bishop a retreat on c2 and prepares d4; " +
        "d3 supports e4. Once castled you have a safe king and Black has to find a plan against a position with no targets.",
      ifIgnored: "Push d4 too early and Black trades pieces and equalises; lunge with Ng5 too early and you lose time.",
    },
    {
      id: "italian-two-knights",
      title: "Against ...Nf6, just play d3",
      oneLiner: "When the knight hits e4, defend calmly. Ng5 starts a fight you don't need.",
      why:
        "4.Ng5 attacks f7 and is a famous line, but it leads into the Fried Liver where one slip loses. " +
        "d3 protects e4, keeps every idea of the quiet build, and Black's knight on f6 now blocks its own f-pawn.",
      trigger: { kind: "opponent_san", sans: ["Nf6"] },
      response: "Play d3, then castle.",
    },
    {
      id: "italian-knight-walk",
      title: "The knight walk: Nbd2–f1–g3",
      oneLiner: "Once castled, reroute the queen's knight toward the kingside.",
      why:
        "The b1-knight has no future on the queenside. Via d2 and f1 it reaches g3 (eyeing f5 and h5) or e3 (eyeing d5). " +
        "This is the plan that turns a quiet position into an attack.",
      trigger: { kind: "book_end" },
      response: "Re1, Nbd2, Nf1, Ng3, then h3 and think about d4 or a kingside push.",
    },
    {
      id: "italian-bishop-hunt",
      title: "When they chase your bishop",
      oneLiner: "...Na5 or ...Nd4: step back to b3 (or take the knight); never panic-trade it.",
      why:
        "Your bishop is worth more than their knight here. Against ...Na5, Bb3 keeps the diagonal. Against ...Nd4, " +
        "simply Nxd4 exd4 c3 wins the centre — do NOT grab e5, that walks into a trap.",
      trigger: { kind: "opponent_piece_on", piece: "N", squares: ["a5", "d4"] },
      response: "Bb3 against ...Na5. Nxd4 against ...Nd4.",
    },
    {
      id: "italian-early-queen",
      title: "Early queen? Develop and kick it",
      oneLiner: "...Qf6, ...Qh4 or ...Qg5 wastes Black's time. Punish by developing with threats.",
      why:
        "A queen out early is a target, not an attacker. Nc3 and d3 come with tempo, Nd5 or g3 chases it around, " +
        "and every move it makes is a move Black's other pieces didn't.",
      trigger: { kind: "opponent_piece_on", piece: "Q", squares: ["f6", "h4", "g5", "e7"] },
      response: "Castle and develop toward the queen. Never trade a developed piece just to kick it.",
    },
    {
      id: "italian-d5-break",
      title: "Watch the ...d5 break",
      oneLiner: "...d5 is Black's freeing move. d3 and Re1 make it uncomfortable.",
      why:
        "If Black gets ...d5 in for free the position opens and your small edge is gone. With d3 played, exd5 wins a tempo " +
        "on the recapture, and the e-file rook makes ...d5 cost something.",
      trigger: { kind: "opponent_san", sans: ["d5"] },
      response: "Usually exd5, then keep developing. Don't let the pawn sit on d5 undisturbed.",
    },
  ],

  annotations: {
    // --- Your moves along the defining line ---------------------------------
    [P("")]: { yourMove: { san: "e4", why: "Take space in the centre and open lines for the bishop and queen in one move." } },
    [P("e4")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — develop with a threat on e5.", why: "The classical reply, and the one your Italian is built for. About six games in ten at this level." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5. If ...Qxd5, Nc3 hits the queen with tempo. You've left the Italian — keep developing.", why: "The Scandinavian. Black's queen usually comes out early; develop with threats against it." },
        { san: "c5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bc4, d3 and castle — the Italian setup works fine against the Sicilian at this level.", why: "The Sicilian. Don't learn theory for it yet: play your setup and castle fast." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4 — take the centre. Bc4 would be hit by ...d5, so this time the bishop waits.", why: "The French. Solid for Black, but their light bishop is shut in." },
        { san: "c6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3. After ...dxe4 Nxe4 you're developed and central.", why: "The Caro-Kann. Same idea as against the French: grab the centre." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nf3 and Bc4 — you get the full centre for free.", why: "Passive. Black's bishop is blocked before the game starts." },
        { san: "Nf6", verdict: "dubious", answer: "e5", howToAnswer: "e5! — kick the knight, then d4. Don't chase it with more pawns after that; just develop.", why: "The Alekhine. The knight invites you to gain space; take it." },
        { san: "Nc6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — if ...e5 you're back in the Italian; if ...d5 then exd5 Qxd5 Nc3.", why: "Unusual and fine for you." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nc3, Be3 — a big centre against the fianchetto.", why: "The Modern. Take the centre." },
        { san: "f5", verdict: "bad", answer: "exf5", howToAnswer: "exf5 — a free pawn, and Black's king is already airy.", why: "Weakens the king for nothing." },
        { san: "b6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Bd3 to blunt the b7-bishop, Nf3 and castle.", why: "Owen's Defence. Take the whole centre." },
      ],
    },
    [P("e4 e5")]: { yourMove: { san: "Nf3", why: "Develop toward the centre with a threat on e5. Knights before bishops." } },
    [P("e4 e5 Nf3 Nc6")]: { yourMove: { san: "Bc4", why: "The Italian bishop: it points straight at f7, the square only the king defends." } },

    // --- What Black actually plays after 3.Bc4 -------------------------------
    [P("e4 e5 Nf3 Nc6 Bc4")]: {
      replies: [
        { san: "Bc5", verdict: "good", answer: "c3", howToAnswer: "c3, preparing d4 and giving the bishop a retreat.", why: "Black mirrors you. Fine for both sides — now it's a build-up game." },
        { san: "Nf6", verdict: "good", answer: "d3", howToAnswer: "d3. Defend e4 calmly and keep building.", why: "The Two Knights. Ng5 is the famous punch, but d3 avoids a theory fight you don't need to win." },
        { san: "h6", verdict: "dubious", answer: "d4", howToAnswer: "d4! Take the centre while Black wastes time.", why: "…h6 stops Ng5 — but nothing was threatening it. A whole move spent on a pawn move that develops nothing." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4 or c3 — claim the centre; Black has locked in their own bishop.", why: "Solid but passive. …d6 blocks the f8-bishop and gives you free space." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4! then exd4 c3 and you own the centre. Never take e5 here.", why: "The Blackburne Shilling Gambit. It's a bluff: the knight only works if you grab e5 and walk into …Qg5." },
        { san: "Be7", verdict: "dubious", answer: "d4", howToAnswer: "d4 — Black's bishop is passive on e7, so open the centre.", why: "Playable but timid. The bishop does nothing on e7." },
        { san: "f5", verdict: "bad", answer: "d3", howToAnswer: "d3. Keep e4 solid; Black has weakened their own king.", why: "The Rousseau Gambit. It looks aggressive, but …f5 opens the e8–h5 diagonal to Black's king." },
        { san: "Qf6", verdict: "bad", answer: "Nc3", howToAnswer: "Nc3 and O-O. Develop with tempo; Nd5 will come soon.", why: "A Scholar's-mate try. Nothing is threatened yet, and the queen becomes a target." },
        { san: "f6", verdict: "bad", answer: "d4", howToAnswer: "d4 — open the centre against a king that just lost its cover. Don't sacrifice on e5; it isn't needed.", why: "...f6 weakens the king and defends e5 with the wrong piece." },
        { san: "Nh6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — take the centre. (Bxh6 gxh6 also wrecks their king, but the centre is simpler.)", why: "A knight on the rim, blocking its own h-pawn." },
        { san: "a6", verdict: "dubious", answer: "c3", howToAnswer: "c3, then d4 — Black spent a move on nothing, so build.", why: "Prepares ...b5 but develops nothing." },
      ],
    },

    // --- After 3...Bc5: the quiet main line --------------------------------------
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5")]: {
      yourMove: { san: "c3", why: "Prepare d4 and give the bishop a home on c2. This is the move the whole quiet Italian rests on." },
      mistakes: [
        { san: "Ng5", why: "Too early. The knight lunge at f7 gets hit by …d5 (or …h6) and you lose time chasing nothing. Build first: c3 and d3." },
        { san: "Bxf7+", why: "A bishop for one pawn. After …Kxf7 the king is safe and you're simply down a piece. The bishop's job is to pressure f7, not to give itself up." },
        { san: "Nxe5", why: "Nxe5? Nxe5 and you've traded your best-placed knight for a pawn; after …Nxe5 the bishop on c4 is loose too." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "d3", howToAnswer: "d3, supporting e4.", why: "Natural. Black develops and hits e4." },
        { san: "d6", verdict: "good", answer: "d4", howToAnswer: "d4! With c3 in, the push is supported.", why: "Black is solid but has locked the bishop's retreat." },
        { san: "Qf6", verdict: "dubious", answer: "d4", howToAnswer: "d4! The queen on f6 stops nothing; take the centre with tempo.", why: "Early queen again. d4 hits the bishop and opens lines while the queen is in the way." },
        { san: "Qe7", verdict: "dubious", answer: "d4", howToAnswer: "d4. Black's queen blocks their own bishop.", why: "Passive and self-blocking." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6")]: {
      yourMove: { san: "d3", why: "The 'very quiet' Italian: solidly support e4 instead of rushing d4. Black's knight on f6 now has nothing to attack." },
      checkpoint: {
        question: "Black's knight just hit your e4-pawn. What's your plan?",
        options: ["Defend calmly with d3 and keep building.", "Jump Ng5 and go for f7 right now.", "Ignore it and castle — e4 doesn't matter."],
        correctIndex: 0,
        explanation:
          "d3 protects the pawn, keeps every part of the quiet build intact, and leaves Black nothing to bite on. " +
          "Ng5 starts a fight you don't need, and castling simply drops the e4-pawn.",
      },
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3")]: {
      replies: [
        { san: "d6", verdict: "good", answer: "O-O", howToAnswer: "Castle.", why: "Black mirrors your structure." },
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "Castle too.", why: "Both kings safe; now the maneuvering begins." },
        { san: "a6", verdict: "good", answer: "O-O", howToAnswer: "Castle; if …Ba7 comes, your bishop is fine on c4 or b3.", why: "A useful waiting move that gives the bishop a7." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 Nxd5, then O-O and Re1 — the knight on d5 is a target.", why: "Too early: after exd5 Nxd5 Black's centre is gone and the d5-knight can be hit with tempo." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6")]: { yourMove: { san: "O-O", why: "King safety first. Everything else waits until your king is tucked away." } },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 O-O")]: { yourMove: { san: "O-O", why: "Castle. Then Re1, Nbd2 and the knight walk." } },
    [P("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O")]: {
      yourMove: {
        san: "Nbd2",
        why: "Start the knight walk: d2 now, f1 and g3 later. The b1-knight has no future on the queenside.",
      },
      checkpoint: {
        question: "Both sides are castled and nothing is forced. What's White's typical plan with the b1-knight?",
        options: ["Reroute it Nbd2–f1–g3 (or e3) toward the kingside and d5.", "Trade it off as fast as possible to simplify.", "Leave it on b1 and push the a- and b-pawns."],
        correctIndex: 0,
        explanation:
          "The b1-knight has no good square on the queenside. Via d2 and f1 it reaches g3 (heading for f5) or e3 (eyeing d5 and f5), " +
          "joins a kingside build-up, and helps restrain Black's …d5 break.",
      },
    },

    // --- After 3...Nf6: the Two Knights, kept quiet --------------------------------
    [P("e4 e5 Nf3 Nc6 Bc4 Nf6")]: {
      yourMove: { san: "d3", why: "Defend e4 and keep it quiet. Black's knight now blocks its own f-pawn, and you'll castle next." },
      mistakes: [
        { san: "Ng5", why: "Playable for masters, but after …d5 exd5 Na5 you're in the Fried Liver theory fight. At your level d3 wins more games." },
        { san: "Nc3", why: "Not bad, but it allows …Nxe4! Nxe4 d5, a trick that regains the piece and frees Black completely. d3 avoids it." },
        { san: "O-O", why: "Castling now drops the e4-pawn to …Nxe4. Defend it first with d3." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Nf6 d3")]: {
      replies: [
        { san: "Bc5", verdict: "good", answer: "c3", howToAnswer: "c3, then O-O — the same quiet setup.", why: "Transposes to the main build-up." },
        { san: "Be7", verdict: "good", answer: "O-O", howToAnswer: "Castle, then Re1 and the knight walk.", why: "Solid and a little passive." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 Nxd5, then O-O. The knight on d5 will be hit by Re1 and c3–d4 ideas.", why: "Premature: Black's centre dissolves and the d5-knight becomes a target." },
        { san: "h6", verdict: "dubious", answer: "O-O", howToAnswer: "Castle. Black wasted a move; you didn't.", why: "Guarding against a Ng5 that was never coming." },
        { san: "Na5", verdict: "dubious", answer: "Bb3", howToAnswer: "Bb3 — keep the bishop on its diagonal.", why: "The knight on a5 is offside; your bishop is still perfectly placed." },
        { san: "d6", verdict: "good", answer: "O-O", howToAnswer: "O-O, then c3 and Re1 — the same quiet build.", why: "Solid. Black keeps e5 and prepares ...Be7." },
        { san: "Bb4+", verdict: "dubious", answer: "c3", howToAnswer: "c3 — the check just helps you: the bishop must move and c3 was coming anyway.", why: "A check that loses time." },
        { san: "Nd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 O-O — you win the centre; the d4-pawn will be a target.", why: "Offside knight." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Be7")]: { yourMove: { san: "O-O", why: "King safety, then Re1 to reinforce e4 and Nbd2 to start the knight walk." } },
    [P("e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Bc5")]: { yourMove: { san: "c3", why: "Back into the quiet main line: c3 prepares d4 and gives the bishop c2." } },

    // --- The sidelines beginners actually meet --------------------------------------
    [P("e4 e5 Nf3 Nc6 Bc4 h6")]: { yourMove: { san: "d4", why: "Black spent a move on nothing. Take the centre at once — with d4 you threaten to open the position while their pieces are still at home." } },
    [P("e4 e5 Nf3 Nc6 Bc4 h6 d4")]: {
      replies: [
        { san: "exd4", verdict: "good", answer: "Nxd4", howToAnswer: "Nxd4 — recapture with the knight, then Nc3 and castle. You own the centre and Black has ...h6 to show for it.", why: "The natural capture." },
        { san: "d6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — keep the tension and develop; castle next. If ...exd4, Nxd4.", why: "Passive: now their bishop is blocked too." },
        { san: "Nxd4", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 exd4 Qxd4 — your queen sits in the centre and hits g7.", why: "Trades into a big centre for you." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 d6")]: {
      yourMove: { san: "d4", why: "Grab the centre. With …d6 Black locked in their own bishop and gave you free space; c3 first is also fine." },
      mistakes: [{ san: "Ng5", why: "…d6 protects e5 but not f7 — yet Ng5 still achieves little: …Nh6 or …Be6 and the knight has to retreat. Take the centre instead." }],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 d6 d4")]: {
      replies: [
        { san: "exd4", verdict: "good", answer: "Nxd4", howToAnswer: "Nxd4, then Nc3, O-O. Watch for ...Nxd4 Qxd4 — fine for you.", why: "The natural capture." },
        { san: "Bg4", verdict: "dubious", answer: "dxe5", howToAnswer: "dxe5 — if ...Bxf3 Qxf3 and e5 comes with threats on f7 and b7 (Legal-style ideas).", why: "Pins the knight while e5 is still hanging." },
        { san: "Nf6", verdict: "dubious", answer: "dxe5", howToAnswer: "dxe5 Nxe4 Qd5! — hits the knight and f7 at once.", why: "Allows a dangerous e-pawn push." },
        { san: "Be7", verdict: "dubious", answer: "dxe5", howToAnswer: "dxe5 dxe5 Qxd8+ Bxd8 Nxe5 — a clean pawn.", why: "Passive, and e5 falls." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Nd4")]: {
      yourMove: { san: "Nxd4", why: "Remove the intruder. After …exd4 play c3 and you own the centre while Black's queen's knight is gone." },
      mistakes: [
        { san: "Nxe5", why: "The trap! After …Qg5 Black hits both g2 and the knight; Nxf7 Qxg2 Rf1 Qxe4+ and it's already losing. Never take e5 against …Nd4." },
      ],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Qf6")]: {
      yourMove: { san: "Nc3", why: "Develop with a threat: Nd5 next hits the queen and c7. Castle soon and the queen will run out of good squares." },
      mistakes: [{ san: "Nxe5", why: "Nxe5?? Qxe5 loses a knight for a pawn — the queen on f6 defends e5. Count before you capture." }],
    },
    [P("e4 e5 Nf3 Nc6 Bc4 Be7")]: { yourMove: { san: "d4", why: "Black's bishop is passive on e7, so open the centre: d4 exd4 Nxd4 and you're ahead in development." } },
    [P("e4 e5 Nf3 Nc6 Bc4 f5")]: { yourMove: { san: "d3", why: "Stay solid. Black has opened lines toward their own king; keep e4 protected and castle. exf5 is also fine, but d3 needs no calculation." } },

    // --- Before 3.Bc4: what Black does at move 2 -----------------------------------------
    [P("e4 e5 Nf3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "Bc4", howToAnswer: "Bc4 — the Italian.", why: "The main reply. Defends e5 and develops." },
        { san: "d6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 and Bc4 — you get the centre for free.", why: "The Philidor: solid, but it locks in Black's bishop." },
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3, then Bc4 — keep it simple and develop.", why: "The Petroff. Black counterattacks e4 instead of defending e5." },
        { san: "f6", verdict: "bad", answer: "Nxe5", howToAnswer: "Nxe5! If …fxe5 then Qh5+ wins material or mates.", why: "Damiano's Defence — one of the worst moves on the board. …f6 weakens the king and defends nothing." },
        { san: "Bc5", verdict: "bad", answer: "Nxe5", howToAnswer: "Nxe5 — a free pawn. Count: nothing recaptures.", why: "Black forgot that e5 is attacked." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5, then Nc3 if the queen recaptures.", why: "Loses a pawn for little; the Elephant Gambit." },
        { san: "Qe7", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 and O-O — develop while the queen blocks the bishop.", why: "Defends e5, but the queen sits in front of its own bishop." },
        { san: "Qf6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — Nd5 next hits the queen and c7; Bc4 and castle follow.", why: "A queen out on move two: it defends e5 but becomes a target." },
        { san: "Bd6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the bishop on d6 blocks Black's own d-pawn; open the centre.", why: "Blocks the d-pawn and locks in the c8-bishop." },
      ],
    },
  },

  traps: [
    {
      name: "Légal's mate",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Bc4 d6 4.Nc3 Bg4 5.h3 Bh5 6.Nxe5 Bxd1 7.Bxf7+ Ke7 8.Nd5#"),
      punisher: "white",
      tell: "Black pins your f3-knight with …Bg4 while their king is still on e8 and only …d6 covers e5.",
      why: "Nxe5 looks like it hangs the queen — but after …Bxd1 Bxf7+ Ke7 Nd5 it's checkmate with three minor pieces. If Black declines with …Nxe5 you're just a pawn up.",
    },
    {
      name: "Damiano's Defence",
      sans: sans("1.e4 e5 2.Nf3 f6 3.Nxe5 fxe5 4.Qh5+ Ke7 5.Qxe5+ Kf7 6.Bc4+ d5 7.Bxd5+ Kg6 8.h4"),
      punisher: "white",
      tell: "Black plays …f6 to defend e5 with a pawn.",
      why: "…f6 opens the e8–h5 diagonal. Nxe5! fxe5 Qh5+ and Black's king walks up the board; if …g6 instead, Qxe5+ picks up the rook on h8.",
    },
    {
      name: "Blackburne Shilling Gambit (don't fall for it)",
      sans: sans("1.e4 e5 2.Nf3 Nc6 3.Bc4 Nd4 4.Nxe5 Qg5 5.Nxf7 Qxg2 6.Rf1 Qxe4+ 7.Be2 Nf3#"),
      punisher: "black",
      tell: "Black's knight jumps to d4 on move 3, leaving e5 apparently free.",
      why: "e5 is bait. After Nxe5 Qg5! Black hits g2 and the knight at once; grabbing f7 loses to …Qxg2 and a mating attack. Play Nxd4 and enjoy the centre instead.",
    },
  ],

  modelGames: [
    {
      label: "Giuoco Pianissimo (quiet main line)",
      sans: sans("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O"),
      summary: "You build slowly with c3 and d3, castle, then reroute the b1-knight toward f5 or d5 and pick the wing where you stand better.",
    },
    {
      label: "Classical c3 + d4 break",
      sans: sans("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3"),
      summary: "With c3 in place you strike with d4 and claim a broad pawn centre. Sharper — play it once the quiet line feels easy.",
    },
    {
      label: "Two Knights, kept quiet",
      sans: sans("e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Be7 O-O O-O Re1"),
      summary: "Black hits e4 with the knight; you defend with d3, castle, and steer into the same plan.",
    },
    {
      label: "Evans Gambit",
      sans: sans("e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4"),
      summary: "A pawn for time: b4 deflects the bishop, c3 and d4 build a big centre with tempo. For when you want fireworks.",
    },
  ],

  middlegamePlan:
    "In the quiet Giuoco Pianissimo both sides are castled and nothing is forced, so improve your pieces and prepare a break. " +
    "White's signature plan is the knight walk Nbd2–f1–g3 (eyeing f5) or –e3 (eyeing d5), then h3 and either d4 or a kingside push with g4. " +
    "Black's freeing idea is …d5, often prepared by …a6, …Ba7 and …Re8; if it lands for free your edge is gone. " +
    "So: knight to g3 or e3, keep …d5 uncomfortable, and pick the wing where you're better.",

  structureDiagram: {
    fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 w - - 2 7",
    orientation: "white",
    arrows: [{ from: "b1", to: "d2" }],
    caption:
      "The quiet Giuoco Pianissimo middlegame: both sides castled and solid. White's signature plan is the knight walk Nb1–d2–f1–g3, then a break with d4 or a kingside push.",
  },
};
