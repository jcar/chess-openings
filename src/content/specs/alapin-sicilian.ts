// Alapin Sicilian (1.e4 c5 2.c3) — hand-authored OpeningSpec for 0–1200 players (White).
// Positions and lines are standard public theory. Prose original.
//
// The Alapin answers the Sicilian with a promise: d4 is coming, and a pawn will
// recapture on it. That gives White a classical centre without learning a
// single Open Sicilian. Black's two real tries are ...d5 (trade and bring the
// queen out) and ...Nf6 (hit e4, get kicked to d5). Against both you build
// d4, Nf3, a bishop, castle — and let the c3-square, freed once the c-pawn
// recaptures, hand the queen's knight a tempo on the black queen.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const alapinSicilian: OpeningSpec = {
  id: "alapin-sicilian",
  name: "Alapin Sicilian (2.c3)",
  aliases: ["c3 Sicilian", "Sicilian c3"],
  eco: "B22",
  side: "white",
  family: "1e4-other",
  firstMoves: "1.e4 c5 2.c3",
  tabiyaFen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2",
  pitch:
    "The Alapin turns the Sicilian into a normal game: c3 supports d4, a pawn takes back, and you get the big centre you wanted all along. " +
    "There is no forest of theory to learn, and the positions reward plain good habits — develop, castle, use the space — which is exactly what wins games under 1200.",

  setup: {
    pieces: [
      { piece: "N", squares: ["f3"], why: "The king's knight comes out before the bishops and guards d4. Against the early black queen it also keeps g2 covered through f3." },
      { piece: "B", squares: ["e2", "c4", "d3", "b3"], why: "The light bishop: e2 in the ...d5 lines, where it unpins the knight and gets you castled; c4 and then b3 in the ...Nf6 lines, aimed at f7. d3 only once d4 is already in." },
      { piece: "N", squares: ["c3", "d2", "a3"], why: "The queen's knight has no c3 while your pawn sits there. Once cxd4 has been played it jumps to c3, hitting the black queen on d5. Before that it waits, or goes to d2 or a3." },
      { piece: "B", squares: ["e3", "g5", "f4"], why: "The dark bishop. e3 holds d4 in the isolated-pawn positions; g5 or f4 once the centre is settled." },
      { piece: "R", squares: ["e1", "d1"], why: "Rooks to the half-open e-file and behind the d-pawn. In the IQP middlegame they are what make the pawn a weapon." },
    ],
    pawns: ["c3", "d4"],
    order: [
      {
        before: "c3",
        after: "d4",
        why: "c3 first, so a pawn can take back on d4. Push d4 without it and after ...cxd4 you are gambiting the pawn or recapturing with the queen, which ...Nc6 kicks at once. The whole opening is the promise that a pawn recaptures.",
      },
      {
        before: "d4",
        after: "Bd3",
        why: "The bishop goes to d3 only after the d-pawn has left. On d3 in front of its own pawn it blocks d4 for good, buries the c1-bishop, and in the ...d5 lines stops guarding g2 — ...Qxg2 follows.",
      },
    ],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "alapin-pawn-recaptures",
      title: "c3 is a promise: d4 next, and a pawn takes back",
      oneLiner: "The point of 2.c3 is that ...cxd4 is met by cxd4. Keep that promise.",
      why: "Every Open Sicilian gives Black the d4-square in exchange for a knight there. The Alapin refuses: c3 means that when the pawns trade on d4, a pawn stands there afterwards and your centre is intact. Almost every good White move in this opening either prepares d4 or supports it.",
    },
    {
      id: "alapin-vs-d5",
      title: "...d5: trade, then build behind the queen",
      oneLiner: "exd5 Qxd5 d4. The black queen is out early; Nc3 will hit it later.",
      why: "Black's most principled try is to strike at e4 before you finish the centre. Take, and let the queen come to d5. Then d4, Nf3 and Be2, and the moment ...cxd4 cxd4 happens the c3-square is free for the knight, which arrives with tempo on the queen. Never chase her with pawns before that.",
      trigger: { kind: "opponent_san", sans: ["d5"] },
      response: "exd5, then d4, Nf3, Be2, and Nc3 after cxd4.",
    },
    {
      id: "alapin-vs-nf6",
      title: "...Nf6: push e5 and take the space",
      oneLiner: "When the knight hits e4, e5 kicks it to d5. Then d4 and Nf3.",
      why: "The knight on d5 looks well placed, but Bc4 will question it and it has nowhere better to go. Meanwhile your e5-pawn cramps Black's kingside and d4 builds the centre. Do not defend e4 with d3 or Bd3 — that gives up the whole idea.",
      trigger: { kind: "opponent_san", sans: ["Nf6"] },
      response: "e5, then d4 and Nf3.",
      ifIgnored: "d3 or Bd3 makes it a passive game where Black's ...d5 comes for free.",
    },
    {
      id: "alapin-queen-tempo",
      title: "The queen on d5 is not a target yet",
      oneLiner: "Develop around her. Nc3 comes with tempo once cxd4 frees the square.",
      why: "Beginners see the black queen in the centre and reach for c4 to kick it. That gives up d4's support and the queen goes to a comfortable square anyway. Instead: Nf3, Be2, and wait for ...cxd4 cxd4. Then Nc3 develops a piece and hits the queen in the same move.",
      trigger: { kind: "opponent_piece_on", piece: "Q", squares: ["d5"] },
      response: "Nf3 and Be2. Nc3 only after cxd4.",
    },
    {
      id: "alapin-f7-bishop",
      title: "The bishop stares at f7 — do not sacrifice on it",
      oneLiner: "Bc4 and Bb3 aim at f7. That is pressure to keep, not a bishop to give.",
      why: "In the ...Nf6 lines the bishop lands on c4 hitting the d5-knight, then drops back to b3 when kicked. It pins f7 to the king for the whole game, which makes Black's ...e6 and ...Be6 awkward. Bxf7+ Kxf7 only gives it away for a pawn; the exception is when a black piece is loose on g4 and Ng5+ wins it back.",
      trigger: { kind: "opponent_san", sans: ["Nb6"] },
      response: "Bb3. Keep the bishop; use the pin.",
      ifIgnored: "Bxf7+ Kxf7 and Black is a piece for a pawn up with nothing to fear.",
    },
    {
      id: "alapin-iqp",
      title: "The isolated pawn is a weapon",
      oneLiner: "An isolated d4-pawn means open files, a knight on e5 and a kingside attack.",
      why: "In the ...d5 lines the pawns on e and c come off and you are left with a lone pawn on d4. That is the position you wanted: the e-file is half-open for the rook, e5 is an outpost for the knight, and both bishops point at Black's king. Attack while the pieces are on; the pawn only becomes a weakness in an endgame.",
      trigger: { kind: "epd", epds: [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 cxd4 cxd4 e6 Nc3")] },
      response: "O-O, Be3, Rc1 and Re1, then Ne5 or d5 when it works.",
    },
    {
      id: "alapin-book-end",
      title: "When the book runs out",
      oneLiner: "Castled, centre built. Now rooks to the open files and pieces toward the king.",
      why: "The Alapin middlegame is a space game. With the isolated pawn: Re1, Rc1, Bd3 or Bc2 aimed at h7, Ne5, and the d5 break when Black's pieces are badly placed. With the e5-pawn: keep it defended, put a rook on e1, and use the cramped black kingside. Do not trade pieces just because you can; your advantage lives while they are on the board.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: { yourMove: { san: "e4", why: "Take the centre and open both bishops." } },

    [P("e4")]: {
      replies: [
        { san: "c5", verdict: "good", answer: "c3", howToAnswer: "c3 — the Alapin. d4 is coming with a pawn behind it.", why: "The Sicilian. Black fights for d4 from the side and hopes for a sharp Open Sicilian. You decline." },
        { san: "e5", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — a normal open game; the Alapin does not apply.", why: "The classical reply." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — a French.", why: "Solid, and Black's light bishop is shut in." },
        { san: "c6", verdict: "good", answer: "d4", howToAnswer: "d4, then Nc3 — a Caro-Kann.", why: "Prepares ...d5 without blocking the bishop." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "exd5 — if ...Qxd5, Nc3 gains time.", why: "The Scandinavian brings the queen out early." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nf3 and Nc3.", why: "Passive: the f8-bishop is blocked at once." },
        { san: "Nf6", verdict: "dubious", answer: "e5", howToAnswer: "e5 — kick the knight, then d4. Then stop chasing and develop.", why: "The Alekhine invites you to gain space." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4, Nc3, Be3 — build the centre.", why: "The Modern gives you the centre for free." },
      ],
    },

    [P("e4 c5")]: {
      yourMove: { san: "c3", why: "The Alapin. It does nothing dramatic and promises everything: d4 next, with a pawn to take back." },
      mistakes: [{ san: "d4", why: "After ...cxd4 you cannot recapture with a pawn. Either you gambit it with c3 or you play Qxd4 and ...Nc6 kicks the queen. The Alapin exists to avoid exactly this." }],
    },
    [P("e4 c5 c3")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "exd5 — take. After ...Qxd5 play d4 and develop; the queen gets hit by Nc3 later.", why: "The main line. Black strikes at e4 before you have finished building." },
        { san: "Nf6", verdict: "good", answer: "e5", howToAnswer: "e5 — kick the knight to d5, then d4 and Nf3.", why: "The other main line. Black hits e4 and invites you to gain space." },
        { san: "e6", verdict: "good", answer: "d4", howToAnswer: "d4 — a French with c3 already in. After ...d5 exd5 exd5 you play against an isolated pawn.", why: "Solid. Black prepares ...d5 with a pawn to recapture." },
        { san: "Nc6", verdict: "good", answer: "d4", howToAnswer: "d4 — if ...cxd4 cxd4 d5, exd5 Qxd5 Nf3 and you are in the main-line structure.", why: "Flexible development." },
        { san: "d6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then Nf3 and Bd3 — a big centre against a passive setup.", why: "Slow. Black locks the f8-bishop in." },
        { san: "e5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Bc4 — an Italian-flavoured game where c3 is already useful.", why: "Unusual. The pawn on c5 has no job in an open game." },
        { san: "g6", verdict: "dubious", answer: "d4", howToAnswer: "d4 — take the centre; cxd4 and Nc3 next.", why: "A fianchetto that lets you have d4 and e4 for free." },
        { san: "Qa5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — the queen pins c3 to your king, so d4 waits until you have castled or played Bd2.", why: "An early queen that pins the c-pawn. Annoying but not dangerous." },
        { san: "b6", verdict: "dubious", answer: "d4", howToAnswer: "d4, then d5 if the bishop comes to b7 — shut it out.", why: "Slow queenside development." },
        { san: "Qc7", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the queen is doing nothing on c7 yet.", why: "Development by queen." },
      ],
    },

    // --- 2...d5 3.exd5 -----------------------------------------------------------
    [P("e4 c5 c3 d5")]: {
      yourMove: { san: "exd5", why: "Take. Black's queen will come to d5, and that is fine: she becomes the target once Nc3 arrives." },
      mistakes: [{ san: "d4", why: "...dxe4 and you are a pawn down chasing it. dxc5 Qxd1+ Kxd1 gets material back but costs castling. Trade on d5 first." }],
    },
    [P("e4 c5 c3 d5 exd5")]: {
      replies: [
        { san: "Qxd5", verdict: "good", answer: "d4", howToAnswer: "d4 — build the centre. Nf3 and Be2 follow.", why: "The main line. The queen is active on d5 but will be chased later." },
        { san: "Nf6", verdict: "dubious", answer: "Bb5+", howToAnswer: "Bb5+ — check first, then d4 or c4 to hold the extra pawn a while.", why: "A gambit try. Black hopes to regain d5 with a knight; make them work for it." },
      ],
    },
    [P("e4 c5 c3 d5 exd5 Qxd5")]: {
      yourMove: { san: "d4", why: "The centre you promised on move two. It also opens the c1-bishop." },
      mistakes: [{ san: "Bd3", why: "The bishop blocks its own d-pawn, and the queen on d5 sees g2 through the empty f3-square: ...Qxg2 and the rook is next." }],
    },
    [P("e4 c5 c3 d5 exd5 Qxd5 d4")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — develop and guard d4. Be2 next.", why: "The main line. Black hits d4 and develops." },
        { san: "Nf6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Be2 and castle.", why: "Natural development." },
        { san: "e6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Be2 or Na3 — a French-like structure where you have the freer game.", why: "Solid; the c8-bishop is shut in." },
        { san: "cxd4", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — the promised pawn recapture. Then Nf3 and Nc3 hits the queen.", why: "Trading early. Now c3 is free for your knight." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "dxe5 Qxe5+ Be3 — the queen has moved three times and you develop with each answer.", why: "An ambitious pawn that just gets taken." },
        { san: "Bf5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Be3 and Nbd2 — the bishop on f5 is loose to Nh4 or Bd3 later.", why: "Getting the bishop out before ...e6." },
        { san: "g6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Nbd2 and Bc4 hitting the queen.", why: "The fianchetto is slow here." },
        { san: "Qe4+", verdict: "dubious", answer: "Be3", howToAnswer: "Be3 — block with a developing move and keep d4 held.", why: "A check that develops your bishop for you." },
      ],
    },

    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6")]: {
      yourMove: { san: "Nf3", why: "Guard d4 and develop. The knight also covers g2 through f3, which matters with a black queen on d5." },
      mistakes: [{ san: "Bd3", why: "...Qxg2. The bishop leaves the f1–h3 diagonal and the queen on d5 takes the g2-pawn with the rook to follow." }],
    },
    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3")]: {
      replies: [
        { san: "Bg4", verdict: "good", answer: "Be2", howToAnswer: "Be2 — unpin, cover f3 and prepare to castle.", why: "The main line. Black pins the knight that guards d4." },
        { san: "Nf6", verdict: "good", answer: "Be2", howToAnswer: "Be2, then castle; Nc3 comes after cxd4.", why: "Natural." },
        { san: "e6", verdict: "good", answer: "Be2", howToAnswer: "Be2, then castle.", why: "Solid." },
        { san: "cxd4", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — then Nc3 hits the queen and you are ahead in development.", why: "The trade that frees c3 for your knight." },
        { san: "e5", verdict: "dubious", answer: "dxe5", howToAnswer: "dxe5 — take. ...Qxd1+ Kxd1 costs castling but you are a clean pawn up with no queens to punish you.", why: "Lashing out in the centre before developing." },
        { san: "Bf5", verdict: "dubious", answer: "Be3", howToAnswer: "Be3 — hold d4; Bc4 will hit the queen after the trade.", why: "The bishop is out but the queen is still loose." },
        { san: "Qe4+", verdict: "dubious", answer: "Be3", howToAnswer: "Be3 — block and develop. The queen has to move again.", why: "A check that costs Black time." },
      ],
    },

    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4")]: {
      yourMove: { san: "Be2", why: "Unpin the knight and get ready to castle. The bishop also means Bxf3 can be met by Bxf3." },
      mistakes: [{ san: "Bd3", why: "...Bxf3 gxf3 wrecks your kingside, and after ...cxd4 the bishop on d3 is loose. Be2 answers the pin properly." }],
    },
    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2")]: {
      replies: [
        { san: "cxd4", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — with the pawn. Now Nc3 is coming with tempo.", why: "The main line." },
        { san: "e6", verdict: "good", answer: "O-O", howToAnswer: "O-O, then Be3 and Nc3 once the pawns trade.", why: "Solid development." },
        { san: "Nf6", verdict: "good", answer: "O-O", howToAnswer: "O-O, then h3 to ask the bishop.", why: "Natural." },
        { san: "e5", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — get the king safe. The e5-pawn will come off and the files open on Black's uncastled king.", why: "Ambitious with the king still in the centre." },
        { san: "O-O-O", verdict: "dubious", answer: "h3", howToAnswer: "h3 — ask the bishop; then c4 kicks the queen and d5 opens on the king.", why: "Castling long puts the king on the file your pawns are about to open." },
      ],
    },

    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 cxd4")]: {
      yourMove: { san: "cxd4", why: "The pawn recapture the whole opening promised. The centre stands, and c3 is now free for the knight." },
      mistakes: [
        { san: "Nxd4", why: "The knight was guarding g2 through f3. ...Qxg2 hits h1 and your kingside collapses." },
        { san: "Qxd4", why: "...Nxd4. The knight on c6 takes the queen, and cxd4 gets back only a knight for it." },
      ],
    },
    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 cxd4 cxd4")]: {
      replies: [
        { san: "e6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — develop with a hit on the queen.", why: "The main line. Black gets the bishop ready." },
        { san: "Bxf3", verdict: "dubious", answer: "Bxf3", howToAnswer: "Bxf3 — and now d4 is poisoned: ...Qxd4 Bxc6+ bxc6 Qxd4 wins the queen.", why: "Giving up the bishop to get at d4. The pawn only looks loose." },
        { san: "Qxd4", verdict: "bad", answer: "Nxd4", howToAnswer: "Nxd4 — the knight takes the queen. Nothing pins it.", why: "d4 is defended by the knight and the queen." },
        { san: "Nf6", verdict: "good", answer: "Nc3", howToAnswer: "Nc3 — the queen has to move; O-O next.", why: "Development." },
        { san: "e5", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — hit the queen first; the e5-pawn is not going anywhere.", why: "Striking at d4 with the king still at home." },
        { san: "O-O-O", verdict: "dubious", answer: "Nc3", howToAnswer: "Nc3 — hit the queen, then Be3 and castle. Their king sits on the open c-file.", why: "The king goes where the files are about to open." },
      ],
    },

    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 cxd4 cxd4 e6")]: {
      yourMove: { san: "Nc3", why: "The knight develops with tempo on the queen. This is what the pawn recapture was for." },
    },
    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 cxd4 cxd4 e6 Nc3")]: {
      replies: [
        { san: "Qa5", verdict: "good", answer: "O-O", howToAnswer: "O-O — castle, then Be3 and h3. The isolated pawn is your attacking asset.", why: "The main line. The queen stays active and eyes c3." },
        { san: "Qd6", verdict: "good", answer: "O-O", howToAnswer: "O-O, then Be3 and Qb3 ideas.", why: "A safer queen square." },
        { san: "Qd8", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — Black has spent three queen moves to return home.", why: "Retreating all the way." },
        { san: "Bb4", verdict: "good", answer: "O-O", howToAnswer: "O-O — the pin on c3 is answered by a3 or Bd2 when needed.", why: "Pinning the knight that just hit the queen." },
        { san: "Qh5", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — then d5 breaks open the centre while the queen is offside.", why: "The queen goes to the kingside alone." },
        { san: "Qxd4", verdict: "bad", answer: "Nxd4", howToAnswer: "Nxd4 — the queen falls for a pawn.", why: "d4 is defended twice." },
      ],
    },
    [P("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 cxd4 cxd4 e6 Nc3 Qa5")]: {
      yourMove: { san: "O-O", why: "King safe, rook ready for e1. From here the isolated pawn does the attacking: Be3, Rc1, Re1, Ne5." },
    },

    // --- 2...Nf6 3.e5 -----------------------------------------------------------
    [P("e4 c5 c3 Nf6")]: {
      yourMove: { san: "e5", why: "Kick the knight and gain space. d4 and Nf3 follow, and the knight on d5 will be questioned by Bc4." },
      mistakes: [{ san: "Bd3", why: "The bishop in front of the d-pawn: d4 is now impossible, the c1-bishop is buried, and the whole point of c3 is gone." }],
    },
    [P("e4 c5 c3 Nf6 e5")]: {
      replies: [
        { san: "Nd5", verdict: "good", answer: "d4", howToAnswer: "d4 — build the centre. Nf3 and Bc4 next.", why: "The main line. The knight's best square, for now." },
        { san: "Ne4", verdict: "bad", answer: "d3", howToAnswer: "d3 — the knight has nowhere to go. ...Nxf2 Kxf2 is a knight for a pawn.", why: "A knight that walks into a pawn." },
        { san: "Ng4", verdict: "bad", answer: "Qxg4", howToAnswer: "Qxg4 — the queen sees g4 from d1. A free knight.", why: "Black overlooked the diagonal." },
        { san: "Nh5", verdict: "dubious", answer: "d4", howToAnswer: "d4 — the knight on the rim is out of play. Be2 later hits it.", why: "Sideways to nowhere." },
        { san: "Ng8", verdict: "dubious", answer: "d4", howToAnswer: "d4 — Black has undeveloped; take the centre.", why: "Back home, two moves down." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5")]: {
      yourMove: { san: "d4", why: "The centre, supported by c3. Black will trade and you develop behind the pawns." },
      mistakes: [{ san: "c4", why: "Kicking the knight with the pawn that was supposed to support d4. After ...Nb4 or ...Nc7 the knight is fine and your centre has lost its backbone." }],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4")]: {
      replies: [
        { san: "cxd4", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — develop first; cxd4 comes when it suits you.", why: "The main line. Black relieves the tension." },
        { san: "Nc6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bc4 hitting the d5-knight.", why: "Developing and adding pressure on d4." },
        { san: "e6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bd3 or Bc4 and castle.", why: "Solid. Black secures the knight." },
        { san: "d6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3 — if ...dxe5 Nxe5 the knight is happy in the centre; exd6 is also fine.", why: "Challenging the e5-pawn at once." },
        { san: "Nb6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Bd3 — the knight on b6 is out of the game.", why: "Retreating before being asked." },
        { san: "g6", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — hit the knight before it settles; Bb3 next.", why: "A fianchetto against a pawn on e5 that already cramps it." },
        { san: "Qa5", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3 — and note c3 is pinned, so if ...cxd4 take back with Nxd4.", why: "The pin on c3 is a nuisance; do not let it stop you developing." },
        { san: "f6", verdict: "dubious", answer: "exf6", howToAnswer: "exf6 Nxf6 Nf3 — Black's king has lost f7's cover for nothing.", why: "Attacking e5 with the f-pawn weakens the king." },
      ],
    },

    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4")]: {
      yourMove: { san: "Nf3", why: "Develop and keep the option of cxd4 for the right moment. If ...dxc3 Nxc3 you are a pawn down but every piece comes out first." },
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3")]: {
      replies: [
        { san: "Nc6", verdict: "good", answer: "Bc4", howToAnswer: "Bc4 — question the d5-knight. Bb3 when kicked.", why: "The main line. Black develops and adds a hit on d4." },
        { san: "e6", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — then Bc4 or Bd3 and castle; after ...d6 exd6 the position is open and comfortable.", why: "Securing the knight first." },
        { san: "d6", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — then Bc4 or Nc3; the e5-pawn is a bargaining chip, not a weakness.", why: "Challenging e5." },
        { san: "dxc3", verdict: "good", answer: "Nxc3", howToAnswer: "Nxc3 — a pawn down for a big lead in development. Bc4, O-O, Qe2 and Re1 come fast.", why: "Greedy but playable. Black keeps the pawn and falls behind in development." },
        { san: "g6", verdict: "dubious", answer: "Bc4", howToAnswer: "Bc4 — hit the knight; Bb3 next.", why: "Slow against a pawn on e5." },
        { san: "Nb6", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4 — a full centre and the knight on b6 is offside.", why: "Retreating without being asked." },
        { san: "d3", verdict: "dubious", answer: "Bxd3", howToAnswer: "Bxd3 — the pawn is handed back and your bishop develops for free.", why: "Giving the pawn back on your terms." },
        { san: "Qa5", verdict: "dubious", answer: "Bd2", howToAnswer: "Bd2 — break the pin on c3, then take back on d4.", why: "The pin trick again. Unpin, then recapture." },
      ],
    },

    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6")]: {
      yourMove: { san: "Bc4", why: "Hit the knight on d5, which is the only thing Black has really achieved. It has to move or be defended." },
      mistakes: [{ san: "Qxd4", why: "...Nxd4. The knight on c6 takes the queen. Look before you grab." }],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4")]: {
      replies: [
        { san: "Nb6", verdict: "good", answer: "Bb3", howToAnswer: "Bb3 — keep the bishop on the f7 diagonal.", why: "The main line. Black kicks the bishop." },
        { san: "e6", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — then castle; the centre holds.", why: "Securing d5." },
        { san: "d6", verdict: "bad", answer: "Bxd5", howToAnswer: "Bxd5! The d6-pawn blocks the queen's recapture. After ...dxe5 Bxc6+ you are a piece up.", why: "Black's own pawn cuts the queen off from d5." },
        { san: "dxc3", verdict: "good", answer: "Nxc3", howToAnswer: "Nxc3 — hit the knight and develop. If ...Nxc3 bxc3, you are ahead in development for the pawn.", why: "Taking the pawn. Playable, but Black's pieces are behind." },
        { san: "Qc7", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4 — then castle and Nc3.", why: "The queen defends e5-pressure that does not exist yet." },
        { san: "a6", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4 — a free centre.", why: "A waiting move." },
      ],
    },

    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6")]: {
      yourMove: { san: "Bb3", why: "Retreat, keep the pin on f7. The bishop belongs on this diagonal all game." },
      mistakes: [{ san: "Bxf7+", why: "The Fried Liver reflex. ...Kxf7 and you have given a bishop for a pawn with nothing to follow." }],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6 Bb3")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "exd6", howToAnswer: "exd6 — en passant. Otherwise the pawn on d5 shuts your bishop out for good.", why: "The main line. Black claims the centre and you must take at once." },
        { san: "d6", verdict: "good", answer: "exd6", howToAnswer: "exd6 Qxd6 O-O — an open centre where you are better developed.", why: "Challenging e5 directly." },
        { san: "dxc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "Nxc3 — the knight is developed and Nb5 or Ng5 ideas are already in the air.", why: "Grabbing the pawn now, when your knight arrives with threats." },
        { san: "e6", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — a full centre against a cramped position.", why: "Solid but passive." },
        { san: "g6", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4, then Nc3 and castle.", why: "Slow." },
        { san: "Qc7", verdict: "dubious", answer: "O-O", howToAnswer: "O-O — then cxd4 and d5 when the knight on c6 is loose.", why: "Pressuring e5 with the queen instead of a pawn." },
        { san: "a5", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4 — if ...a4 the bishop drops to c2.", why: "Chasing the bishop with pawns. It has squares." },
      ],
    },

    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6 Bb3 d5")]: {
      yourMove: { san: "exd6", why: "Take en passant. A pawn on d5 would lock the centre and bury your bishop; open, the position favours the better-developed side." },
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6")]: {
      replies: [
        { san: "Qxd6", verdict: "good", answer: "O-O", howToAnswer: "O-O — castle; the d4-pawn comes back with Nxd4 or cxd4 in a move or two.", why: "The main line. Black centralises the queen." },
        { san: "exd6", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 — the pawn comes back and d6 is isolated.", why: "Recapturing with the pawn leaves a weak pawn on d6." },
        { san: "Bf5", verdict: "dubious", answer: "Nxd4", howToAnswer: "Nxd4 — then ...Nxd4 Qxd4 Qxd6 Qxd6 exd6 and Black's structure is a mess.", why: "Developing instead of recapturing. Take the pawn back." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6 Qxd6")]: {
      yourMove: { san: "O-O", why: "King safe first. The d4-pawn is not running away: Nxd4 or cxd4 gets it back next." },
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6 Qxd6 O-O")]: {
      replies: [
        { san: "Be6", verdict: "good", answer: "Bxe6", howToAnswer: "Bxe6 Qxe6 Nxd4 — level material, and your pieces are the more active.", why: "The main line. Black offers to trade off your f7-bishop." },
        { san: "dxc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "Nxc3 — developed with tempo; Nb5 hits the queen next.", why: "Taking the pawn while the king is still in the centre." },
        { san: "e6", verdict: "good", answer: "cxd4", howToAnswer: "cxd4 — then Nc3 and Re1.", why: "Solid." },
        { san: "g6", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4, then Re1 and h3.", why: "A fianchetto after the centre has already opened." },
        { san: "Bf5", verdict: "dubious", answer: "cxd4", howToAnswer: "cxd4 — then Nc3 and the d5 push when the knight on c6 is loose.", why: "Development that leaves f7 pinned." },
        { san: "Bg4", verdict: "bad", answer: "Bxf7+", howToAnswer: "Bxf7+! Kxf7 Ng5+ Kg8 Qxg4 — the bishop on g4 was loose, and the king has lost its cover.", why: "Pinning the f3-knight while f7 is only defended by the king." },
      ],
    },
    [P("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6 Qxd6 O-O Be6")]: {
      yourMove: { san: "Bxe6", why: "Trade, then Nxd4 gets the pawn back with level material and the freer pieces." },
    },

    // --- 2...e6 ------------------------------------------------------------------
    [P("e4 c5 c3 e6")]: {
      yourMove: { san: "d4", why: "A French with c3 already in. Take the centre." },
    },
    [P("e4 c5 c3 e6 d4")]: {
      replies: [
        { san: "d5", verdict: "good", answer: "exd5", howToAnswer: "exd5 exd5 Nf3 — Black gets an isolated pawn on d5 and you get targets.", why: "The main line. A French structure in reverse." },
        { san: "cxd4", verdict: "good", answer: "cxd4", howToAnswer: "cxd4, then Nf3 and Bd3.", why: "Trading first." },
        { san: "Nf6", verdict: "dubious", answer: "Bd3", howToAnswer: "Bd3 — hold e4 with the d-pawn already gone; Nf3 next.", why: "Hitting e4 after you have built the centre." },
        { san: "Nc6", verdict: "good", answer: "Nf3", howToAnswer: "Nf3, then Bd3 and castle.", why: "Natural." },
        { san: "d6", verdict: "dubious", answer: "Nf3", howToAnswer: "Nf3, then Bd3 — a big centre against a small one.", why: "Passive." },
      ],
    },
  },

  traps: [
    {
      name: "The poisoned d4-pawn",
      sans: sans("1.e4 c5 2.c3 d5 3.exd5 Qxd5 4.d4 Nc6 5.Nf3 Bg4 6.Be2 cxd4 7.cxd4 Bxf3 8.Bxf3 Qxd4 9.Bxc6+ bxc6 10.Qxd4"),
      punisher: "white",
      tell: "Black trades on f3 and the d4-pawn looks like it hangs to the queen.",
      why: "The queen on d4 is defended only by the knight on c6. Bxc6+ removes it with check, and the queen is lost for a pawn. Your bishop on f3 does two jobs at once: it recaptures, and it sees straight through to c6.",
    },
    {
      name: "The Fried Liver reflex",
      sans: sans("1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.Nf3 Nc6 6.Bc4 Nb6 7.Bxf7+ Kxf7"),
      punisher: "black",
      tell: "Your bishop has just been kicked off c4, and f7 is defended only by the king.",
      why: "There is no knight on g5 and no queen ready to follow. Bxf7+ Kxf7 is a bishop for a pawn, and the black king walks back to g8 in two moves. Bb3 keeps the bishop and the pin, which is worth far more.",
    },
    {
      name: "The loose bishop on g4",
      sans: sans("1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.Nf3 Nc6 6.Bc4 Nb6 7.Bb3 d5 8.exd6 Qxd6 9.O-O Bg4 10.Bxf7+ Kxf7 11.Ng5+ Kg8 12.Qxg4"),
      punisher: "white",
      tell: "Black pins your knight with ...Bg4 while f7 is guarded only by the king.",
      why: "This is the one time Bxf7+ is right. After Kxf7 the knight leaps to g5 with check, uncovering the queen's path to g4, and the pinning bishop is simply lost. You are a pawn up with Black's king exposed.",
    },
  ],

  modelGames: [
    {
      label: "Against ...d5: the isolated pawn game",
      sans: sans("e4 c5 c3 d5 exd5 Qxd5 d4 Nc6 Nf3 Bg4 Be2 cxd4 cxd4 e6 Nc3 Qa5 O-O Nf6 h3 Bh5 Be3 Be7 Rc1 O-O"),
      summary: "Trade on d5, build d4, develop behind it, and let Nc3 arrive with tempo once the c-pawn has recaptured. The isolated d4-pawn gives you the open files and the e5 outpost.",
    },
    {
      label: "Against ...Nf6: kick, build, question the knight",
      sans: sans("e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 Bc4 Nb6 Bb3 d5 exd6 Qxd6 O-O Be6 Bxe6 Qxe6 Nxd4 Nxd4 Qxd4"),
      summary: "e5 gains space, Bc4 and Bb3 stare at f7, and the en passant capture keeps the centre open. When the smoke clears the material is level and your pieces are the active ones.",
    },
    {
      label: "Against ...e6: French structure, your way",
      sans: sans("e4 c5 c3 e6 d4 d5 exd5 exd5 Nf3 Nc6 Bb5 Bd6 dxc5 Bxc5 O-O Nge7 Nbd2 O-O Nb3 Bb6 Re1"),
      summary: "Black plays a French with a Sicilian pawn. After the trades on d5 and c5 Black has an isolated d-pawn instead of you, and your knights head for the squares in front of it.",
    },
  ],

  middlegamePlan:
    "The Alapin middlegame is about space and the centre you built. In the ...d5 lines you usually get an isolated pawn on d4: treat it as an attacking asset while the pieces are on — rooks to c1 and e1, a knight to e5, bishops aimed at the kingside, and the d5 break when Black's pieces are badly placed. " +
    "In the ...Nf6 lines the pawn on e5 cramps Black's kingside; keep it defended and use the pin on f7 that the b3-bishop gives you. " +
    "Do not chase the black queen with pawns and do not trade pieces without a reason: your edge lives in activity, and if the board empties the isolated pawn becomes a target instead of a weapon.",

  structureDiagram: {
    fen: "r1b1kbnr/pp2pppp/2n5/2pq4/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5",
    orientation: "white",
    arrows: [
      { from: "f1", to: "e2" },
      { from: "b1", to: "c3" },
    ],
    caption: "The Alapin against ...d5: the pawn on d4 stands with c3 behind it, Nf3 guards it, Be2 is next, and once the c-pawn recaptures the knight jumps to c3 with tempo on the queen.",
  },
};
