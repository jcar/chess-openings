// Larsen's Opening (1.b3) — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines are standard public theory. Prose original.
//
// The whole opening is one bishop. From b2 it looks down a1–h8 at e5 and g7, and
// every plan here is about keeping that diagonal working: restrain the centre
// with e3 rather than blocking it with d4, lean on e5 with Bb5 and Nf3, and
// break with c4 or f4 when the pieces are ready.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const larsenOpening: OpeningSpec = {
  id: "larsen",
  name: "Larsen's Opening",
  aliases: ["Nimzo-Larsen", "Nimzowitsch-Larsen", "b3"],
  eco: "A01",
  side: "white",
  family: "flank",
  firstMoves: "1.b3 e5 2.Bb2 Nc6 3.e3",
  tabiyaFen: "r1bqkbnr/pppp1ppp/2n5/4p3/8/1P2P3/PBPP1PPP/RN1QKBNR b KQkq - 0 3",
  pitch:
    "One bishop decides this opening: from b2 it stares down the long diagonal at e5 and g7. " +
    "You play the same four or five moves against almost anything, and most opponents under 1200 have never seen it, so you are out of their preparation on move one.",

  setup: {
    pieces: [
      { piece: "B", squares: ["b2"], why: "The Larsen bishop. Everything in this opening serves the diagonal it sits on — never block it and never trade it cheaply." },
      { piece: "N", squares: ["f3", "e2"], why: "The king's knight, adding a second attacker to e5 and covering d4." },
      { piece: "B", squares: ["b5", "e2", "d3"], why: "The light bishop. On b5 it pins the knight that defends e5; on e2 it just gets you castled." },
      { piece: "N", squares: ["c3", "d2"], why: "The queen's knight. On c3 it supports c4 and e4; d2 keeps the c-pawn free." },
    ],
    pawns: ["b3", "e3"],
    order: [
      {
        before: "c4",
        after: "d4",
        why: "Challenge the centre from the side with c4, not with d4. A pawn on d4 sits directly in front of your own bishop on the long diagonal and turns the best piece in the opening into a spectator.",
      },
    ],
    castle: "O-O",
    castleBy: 10,
  },

  ideas: [
    {
      id: "larsen-diagonal",
      title: "The bishop is the opening",
      oneLiner: "From b2 it hits e5 and g7. Keep that diagonal clear and everything else follows.",
      why: "White's other moves exist to support the bishop: e3 holds the centre without blocking it, Nf3 adds a second attacker to e5, and the c4 or f4 break opens the line further. If you ever find yourself wondering what to do, ask what the b2-bishop can see.",
    },
    {
      id: "larsen-no-d4",
      title: "Never d4 early",
      oneLiner: "d4 blocks your own bishop. Use c4 to hit the centre instead.",
      why: "The squares in front of the b2-bishop are c3 and d4. Put a pawn on either and the bishop bites on granite. This is the one rule of the opening, and it is the mistake almost everyone makes the first few times they play it.",
      trigger: { kind: "tag", tags: ["claims_centre"] },
      response: "c4, not d4.",
      ifIgnored: "The bishop is entombed and you are simply playing a worse version of a Queen's Pawn game.",
    },
    {
      id: "larsen-pressure-e5",
      title: "Lean on e5",
      oneLiner: "Bb5 pins the knight that defends e5, then Nf3 and f4 pile on.",
      why: "Against 1...e5 Black's whole position rests on that pawn. Bb5 pins its defender against the king, Nf3 attacks it a second time, and f4 attacks it with a pawn. You rarely win it outright, but the pressure buys you the centre.",
      trigger: { kind: "opponent_san", sans: ["e5"] },
      response: "Bb2, e3, then Bb5 and Nf3.",
    },
    {
      id: "larsen-f4-break",
      title: "The f4 break",
      oneLiner: "Once you have castled, f4 opens the diagonal your bishop has been waiting on.",
      why: "After exf4 exf4 the e-file opens and the b2-bishop looks straight through to g7. It is the Bird's Opening idea borrowed into Larsen, and it is the most common way this opening turns into an attack.",
      trigger: { kind: "epd", epds: [P("b3 e5 Bb2 Nc6 e3 Nf6 Bb5 Bd6")] },
      response: "f4.",
    },
    {
      id: "larsen-vs-d5",
      title: "Against ...d5: clamp with f4",
      oneLiner: "No target on e5, so take the square instead: e3, f4, Nf3, Be2, castle.",
      why: "When Black plays ...d5 there is no e5-pawn to attack, so you occupy the square rather than besiege it. The pawn on f4 stops ...e5 for good, and the b2-bishop still rakes toward the kingside behind it.",
      trigger: { kind: "opponent_san", sans: ["d5"] },
      response: "Bb2, e3, then f4.",
    },
    {
      id: "larsen-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, then pick a break: c4 against a big centre, f4 against a solid one.",
      why: "Larsen is a plans opening, not a memorisation one. Get the bishop to b2, the king to g1 and the knights out, then decide. If Black owns the centre, undermine it with c4. If Black is solid and slow, clamp with f4 and attack on the kingside.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "b3", why: "Larsen's move. It says nothing about the centre yet and prepares the bishop that will." } },

    [P("b3")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Bb2", howToAnswer: "Bb2 — the bishop goes straight to the pawn it wants to attack.", why: "The most natural and the most common: Black takes the centre and gives your bishop a target in the same move." },
        { san: "d5", verdict: "good", answer: "Bb2", howToAnswer: "Bb2, then e3 and f4 — clamp e5 rather than attack it.", why: "Solid. There is no e5-pawn to lean on, so you take the square instead." },
        { san: "Nf6", verdict: "good", answer: "Bb2", howToAnswer: "Bb2, then e3, Nf3 and c4.", why: "Flexible. Black waits to see what you commit to, which suits you fine." },
        { san: "c5", verdict: "good", answer: "Bb2", howToAnswer: "Bb2, e3, Nf3 and c4 — an English-flavoured game.", why: "Black stakes a claim on d4. Your bishop already looks at that square through the long diagonal." },
        { san: "e6", verdict: "good", answer: "Bb2", howToAnswer: "Bb2, then Nf3 and e3.", why: "Quiet and sensible. Black keeps options between ...d5 and ...c5." },
        { san: "g6", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2 — and now the two bishops face each other down the same diagonal. Trade only if it damages their structure.", why: "A fianchetto against a fianchetto. Your bishop is no worse than theirs and you moved first." },
        { san: "d6", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2, e3, Nf3, c4 — take the space Black declined.", why: "Passive. Black concedes the centre without a fight." },
        { san: "b6", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2, e3 and d4 is fine here — with their bishop also on the long diagonal, blocking it hurts them as much as you.", why: "Mirroring you. Neither bishop achieves much on the blocked diagonal." },
        { san: "f5", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2 — and note the diagonal now runs at their king. e3 and Nf3 next.", why: "A Dutch setup. The b2-bishop is at its happiest against a weakened kingside." },
        { san: "Nc6", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2, then e3 — if ...e5 comes you are in the main line a move up on information.", why: "Unusual move order that usually transposes." },
        { san: "c6", verdict: "dubious", answer: "Bb2", howToAnswer: "Bb2, then e3, Nf3 and c4 — you get the centre while Black prepares.", why: "Slow: it prepares ...d5 without developing anything." },
        { san: "f6", verdict: "bad", answer: "Bb2", howToAnswer: "Bb2 — and note the diagonal now runs straight at the squares they just weakened. e4 next.", why: "It takes the best square from the g8-knight and loosens the king, on move one." },
      ],
    },

    // --- 1...e5: the main line ------------------------------------------------
    [P("b3 e5")]: {
      yourMove: { san: "Bb2", why: "The point of the whole opening. The bishop attacks e5 the moment it arrives." },
      mistakes: [{ san: "e4", why: "This is not that kind of opening. You have spent a move on b3 and now the b2-square is blocked before the bishop ever reaches it." }],
    },
    [P("b3 e5 Bb2")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "e3", howToAnswer: "e3 — hold the centre without blocking the diagonal. Bb5 and Nf3 come next.", why: "The main line. Black defends the pawn with a developing move, exactly as they should." },
        { san: "d6", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Bb5+ comes with check and gains a free move.", why: "Defends e5 but blocks the f8-bishop, and it walks into a check on b5." },
        { san: "Nf6", verdict: "dubious", answer: "Bxe5", howToAnswer: "Bxe5! The pawn really is free here: nothing defends it and the bishop retreats safely after ...Nc6.", why: "Developing without defending. This is the one moment the greedy capture is correct." },
        { san: "f6", verdict: "bad", answer: "e4", howToAnswer: "e4 — take the centre. Their king is airy and the f6-pawn blocks their own knight.", why: "Defending a pawn with the f-pawn weakens the king and takes the best square from the g8-knight." },
        { san: "Bd6", verdict: "dubious", answer: "e3", howToAnswer: "e3 and Nf3 — the bishop on d6 has no future and blocks the d-pawn.", why: "Passive: it defends e5 but shuts in the queenside." },
        { san: "d5", verdict: "good", answer: "e3", howToAnswer: "e3, then Bb5+ or Nf3 — you have a comfortable game against the big centre.", why: "Ambitious. Black takes both centre squares and you undermine them with c4 later." },
        { san: "Qf6", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 and e3 — develop while the queen sits in the knight's way.", why: "The queen defends e5 but occupies the square her own knight wants." },
        { san: "Bc5", verdict: "dubious", answer: "e3", howToAnswer: "e3 — solid. Do NOT grab on e5: after Bxe5 Bxf2+ Kxf2 Qh4+ you lose castling and your king sits in the open for nothing.", why: "It develops without defending e5, but the pawn is poisoned by a check on f2." },
        { san: "e4", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Nc3 or Ne2 and d3 — surround the pawn that ran too far.", why: "Pushing past gains space and leaves a pawn on e4 with nothing behind it." },
      ],
    },
    [P("b3 e5 Bb2 Nc6")]: {
      yourMove: { san: "e3", why: "Modest and exactly right: it holds d4 and frees the light bishop without putting a pawn in front of the big one." },
      mistakes: [
        { san: "Bxe5", why: "Not now. After ...Nxe5 you have given a bishop for a pawn, because the knight on c6 defends it. Take on e5 only when nothing guards it." },
        { san: "d4", why: "The one rule of this opening, broken. A pawn on d4 blocks the bishop on b2, which is the only reason you played b3. Use c4 to hit the centre instead." },
      ],
    },
    [P("b3 e5 Bb2 Nc6 e3")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "Bb5", howToAnswer: "Bb5 — pin the knight that holds e5, Spanish-style.", why: "The main line. Both sides develop naturally and the fight is about the e5-pawn." },
        { san: "d5", verdict: "good", answer: "Bb5", howToAnswer: "Bb5, then f4 — hit the pawn chain at its base.", why: "Black builds the big centre. It looks impressive and it is exactly what c4 and f4 are for." },
        { san: "d6", verdict: "dubious", answer: "Bb5", howToAnswer: "Bb5, Nf3 and f4 — Black is solid but passive and you have all the space.", why: "Solid, and it shuts in the light bishop for a while." },
        { san: "Bc5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — develop and hit e5 again. The bishop on c5 runs into a later c4 and d4 push.", why: "Active, but the bishop can become a target once your queenside pawns advance." },
        { san: "g6", verdict: "dubious", answer: "Bb5", howToAnswer: "Bb5, then Nf3 — with their bishop coming to g7 your own b2-bishop is happy to trade it off.", why: "Their bishop will contest your diagonal, so this is the one line where the trade favours you." },
        { san: "Qf6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — develop with tempo. The queen will have to move again.", why: "An early queen sortie that defends e5 and blocks the knight." },
        { san: "f6", verdict: "bad", answer: "Bb5", howToAnswer: "Bb5, then Nc3 and f4. Their king has no cover and the f6-pawn helps nothing.", why: "Weakens the king to defend a pawn that could be defended by a piece." },
        { san: "Bb4", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — develop. There is nothing on c3 to pin, so the bishop is just exposed.", why: "A pin against a square rather than a piece." },
        { san: "e4", verdict: "dubious", answer: "d3", howToAnswer: "d3! — hit the pawn at once. Note d3 is not on the long diagonal, so the bishop still works.", why: "Black gains space and leaves the e4-pawn without support." },
      ],
    },
    [P("b3 e5 Bb2 Nc6 e3 Nf6")]: {
      yourMove: { san: "Bb5", why: "The pin. The knight on c6 is the only real defender of e5, so tying it to the king is the most useful thing the bishop can do." },
      mistakes: [{ san: "d4", why: "Not this. d4 blocks the b2-bishop and hands Black the simple ...exd4 with a comfortable game. Bb5 first, c4 later." }],
    },
    [P("b3 e5 Bb2 Nc6 e3 Nf6 Bb5")]: {
      replies: [
        { san: "Bd6", verdict: "good", answer: "f4", howToAnswer: "f4! Strike at e5 while it is pinned down. After ...exf4 exf4 your bishop looks straight at g7.", why: "Natural: Black adds a defender. It also puts the bishop where a later f4 and e5 can hit it." },
        { san: "Bc5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bxc6 and Nxe5 is a real idea if they ever castle carelessly.", why: "Active development. Watch for the moment e5 is loose." },
        { san: "a6", verdict: "dubious", answer: "Bxc6", howToAnswer: "Bxc6 dxc6 and now Nf3 hits e5 with the pin gone but the pawn weak.", why: "Asking the question early. Trading gives Black doubled pawns and you a target." },
        { san: "Bb4", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — develop. Their bishop on b4 is doing less than yours on b5.", why: "A pin against a knight that has not moved yet." },
        { san: "d6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then castle and prepare f4 or c4.", why: "Solid, passive, and it blocks the light bishop." },
        { san: "Qe7", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 and castle. The queen on e7 blocks the f8-bishop.", why: "Over-defending e5 with the piece that least wants the job." },
        { san: "d5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — add the second attacker to e5 before deciding between f4 and c4.", why: "Black builds the big centre. It is the critical test and exactly what your breaks exist for." },
      ],
    },
    [P("b3 e5 Bb2 Nc6 e3 Nf6 Bb5 Bd6")]: {
      yourMove: { san: "f4", why: "The break this opening is built around. Black's whole position leans on e5, and after the trade the long diagonal opens onto g7." },
    },
    [P("b3 e5 Bb2 Nc6 e3 Nf6 Bb5 Bd6 f4")]: {
      replies: [
        { san: "exf4", verdict: "good", answer: "exf4", howToAnswer: "exf4 — recapture and look down the diagonal. Nf3 and castling come next.", why: "The critical reply. You get the open e-file and a working bishop." },
        { san: "O-O", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then castle. You keep the tension and the f-file pressure.", why: "Sensible: Black gets the king safe before the position opens." },
        { san: "e4", verdict: "dubious", answer: "Ne2", howToAnswer: "Ne2 — reroute toward g3 and f4 will come again. The e4-pawn is now a weakness, not a spearhead.", why: "Pushing past releases the tension and leaves a pawn you can surround." },
        { san: "Qe7", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — develop; the pawn on e5 is still the problem Black has to solve.", why: "Over-defending rather than resolving." },
      ],
    },

    // --- 1...d5: the clamp -----------------------------------------------------
    [P("b3 d5")]: { yourMove: { san: "Bb2", why: "Same bishop, same diagonal. With no pawn on e5 to attack, you will take the square instead." } },
    [P("b3 d5 Bb2")]: {
      replies: [
        { san: "Nf6", verdict: "good", answer: "e3", howToAnswer: "e3, then f4 — the clamp.", why: "Natural development. The game becomes a Bird's Opening with the bishop already placed." },
        { san: "c5", verdict: "good", answer: "e3", howToAnswer: "e3 and Nf3 — the c5-pawn takes d4 away from you but the diagonal is untouched.", why: "Black grabs space where your bishop is aiming. Nf3 and c4 undermine it." },
        { san: "e6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then e3 and f4 or c4.", why: "Quiet and solid. You have a free hand to choose the break." },
        { san: "Bf5", verdict: "dubious", answer: "e3", howToAnswer: "e3, then Nf3 and Be2 — their bishop is committed and c4 will gain time.", why: "Developing outside the pawn chain, but it leaves b7 loose on your diagonal." },
        { san: "Bg4", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — invite the trade; h3 next if you prefer the two bishops.", why: "A pin on nothing, since your queen is not behind the knight yet." },
        { san: "Nc6", verdict: "good", answer: "e3", howToAnswer: "e3, then Bb5 pins the knight before it can support ...e5.", why: "The most common reply here. Black prepares ...e5, which is the one thing you want to stop." },
        { san: "e5", verdict: "good", answer: "e3", howToAnswer: "e3, then Bb5 and Nf3 — lean on e5 exactly as in the main line.", why: "The full centre. Ambitious, and it hands your bishop the target it wants." },
        { san: "d4", verdict: "dubious", answer: "e3", howToAnswer: "e3! — challenge it at once. After exd4 your diagonal opens all the way.", why: "Black blocks your bishop for you, but a pawn that far forward is easy to undermine." },
        { san: "f6", verdict: "dubious", answer: "e3", howToAnswer: "e3, Nf3, c4 — take the centre while Black guards a square nothing is attacking.", why: "Guarding e5 with the f-pawn costs a developing move and loosens the king." },
      ],
    },
    [P("b3 d5 Bb2 Nf6")]: { yourMove: { san: "e3", why: "Support the f4 push that is coming, and keep the long diagonal open." } },
    [P("b3 d5 Bb2 Nf6 e3")]: {
      replies: [
        { san: "e6", verdict: "good", answer: "f4", howToAnswer: "f4 — the clamp. Nf3, Be2 and castle follow.", why: "Solid. Black's light bishop is now behind its own pawns, which suits you." },
        { san: "Bf5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Be2 and c4 — you have a comfortable game.", why: "Black gets the bishop out first, which is the right idea against this setup." },
        { san: "c5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Be2 and c4 — challenge the centre from the side.", why: "A proper fight for d4." },
        { san: "g6", verdict: "dubious", answer: "f4", howToAnswer: "f4, Nf3 and Be2 — with their bishop on g7 the trade on the long diagonal helps you.", why: "The fianchetto invites exactly the trade you want." },
        { san: "Nc6", verdict: "good", answer: "Bb5", howToAnswer: "Bb5 — pin the knight before it can support ...e5.", why: "The most common continuation here, and it is heading for ...e5." },
      ],
    },

    // --- 1...Nf6 and the fianchetto ---------------------------------------------
    [P("b3 Nf6")]: { yourMove: { san: "Bb2", why: "Always. The bishop comes out before you commit any pawn to the centre." } },
    [P("b3 Nf6 Bb2")]: {
      replies: [
        { san: "g6", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3 and c4 — and be ready to trade the dark bishops when it damages their pawns.", why: "Their bishop will contest your diagonal from g7." },
        { san: "d5", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3 and c4.", why: "Transposes toward the clamp lines." },
        { san: "e6", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3, c4 — a comfortable Queen's Indian in reverse.", why: "Flexible and solid." },
        { san: "c5", verdict: "good", answer: "e3", howToAnswer: "e3, Nf3 and c4 — you are a tempo up on an English.", why: "A fight for d4, which is where your bishop already points." },
      ],
    },
  },

  traps: [
    {
      name: "The e5-pawn is not free",
      sans: sans("1.b3 e5 2.Bb2 Nc6 3.Bxe5 Nxe5"),
      punisher: "black",
      tell: "The bishop lands on b2 staring at an undefended pawn, and the temptation is immediate.",
      why: "Once ...Nc6 is on the board the pawn is defended, and Bxe5 simply loses a bishop for a pawn. The bishop's job is to press on e5 for the whole game, not to trade itself for it. Take on e5 only when genuinely nothing guards it.",
    },
    {
      name: "Burying your own bishop",
      sans: sans("1.b3 e5 2.Bb2 Nc6 3.d4 exd4 4.Bxd4"),
      punisher: "black",
      tell: "The urge to claim the centre with a pawn, the way you would in almost any other opening.",
      why: "A pawn on d4 stands directly in front of the b2-bishop. Even after recapturing, you have spent two moves to reach a position where your best piece does nothing. Play e3 and c4 instead and let the bishop keep its diagonal.",
    },
    {
      name: "The f4 break",
      sans: sans("1.b3 e5 2.Bb2 Nc6 3.e3 Nf6 4.Bb5 Bd6 5.f4 exf4 6.exf4"),
      punisher: "white",
      tell: "Black defends e5 one more time with ...Bd6 and castles into the position.",
      why: "The pawn break removes the blocker. After exf4 the e-file is open, the b2-bishop looks through to g7, and your pieces come with tempo. This is the most common way Larsen turns into a kingside attack.",
    },
  ],

  modelGames: [
    {
      label: "Main line: pressure then break",
      sans: sans("b3 e5 Bb2 Nc6 e3 Nf6 Bb5 Bd6 f4 exf4 exf4 O-O Nf3"),
      summary: "The whole plan in thirteen moves: bishop to b2, restrain with e3, pin with Bb5, then f4 opens the diagonal and the file.",
    },
    {
      label: "Against ...d5: the clamp",
      sans: sans("b3 d5 Bb2 Nf6 e3 e6 f4 Be7 Nf3 O-O Be2 c5"),
      summary: "No pawn on e5 to attack, so you occupy the square. The pawn on f4 stops ...e5 for good and the bishop works behind it.",
    },
    {
      label: "Against the fianchetto",
      sans: sans("b3 Nf6 Bb2 g6 e3 Bg7 Nf3 O-O c4"),
      summary: "Both bishops on the long diagonal. Develop normally, break with c4, and trade the bishops only when it wrecks their pawns.",
    },
  ],

  middlegamePlan:
    "Everything is the b2-bishop. Keep the diagonal clear, which means e3 rather than d4 and c4 rather than c3 whenever you have the choice. " +
    "Against ...e5 the plan is pressure: Bb5 pins the defender, Nf3 adds a second attacker, then f4 breaks the pawn down and opens the line to g7. " +
    "Against ...d5 the plan is the clamp: e3 and f4 take the e5-square for good, then Nf3, Be2 and castle before choosing between a kingside build-up and the c4 break. " +
    "If Black fianchettoes, their bishop contests yours, and the trade is fine when it leaves holes around their king.",

  structureDiagram: {
    fen: "r1bqk2r/pppp1ppp/2nb1n2/1B6/5P2/1P2P3/PBPP2PP/RN1QK1NR b KQkq - 0 5",
    orientation: "white",
    arrows: [
      { from: "b2", to: "g7" },
      { from: "f4", to: "e5" },
    ],
    caption: "The Larsen picture: the bishop on b2 aimed through the long diagonal, the f-pawn breaking on e5, and Bb5 tying down its defender.",
  },
};
