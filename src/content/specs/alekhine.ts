// Alekhine Defence (1.e4 Nf6) — hand-authored OpeningSpec for 0–1200 players (Black).
// Positions and lines are standard public theory. Prose original.
//
// The idea is a dare. The knight pokes e4 and invites the pawns to chase it:
// e5, d4, c4, sometimes f4. Then Black hits the front of that chain with ...d6,
// puts the bishop on g7 and the other knight on c6, and asks whether the pawns
// can be defended. Against calm play (4.Nf3) you get a solid game with no
// weaknesses; against the Four Pawns you strike first with ...dxe5 and ...Nc6.

import type { OpeningSpec } from "../spec";
import { pos, sans } from "../authoring";

const P = pos;

export const alekhine: OpeningSpec = {
  id: "alekhine",
  name: "Alekhine Defence",
  eco: "B02–B05",
  side: "black",
  family: "1e4-other",
  firstMoves: "1.e4 Nf6",
  tabiyaFen: "rnbqkb1r/pppppppp/8/3nP3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3",
  pitch:
    "Poke the e4-pawn with your knight on move one and let White chase it: every pawn they push forward is a pawn they have to defend later. " +
    "You get the same few moves in almost every game, and opponents under 1200 either play too calmly and hand you an easy position or push too much and hand you targets.",

  setup: {
    pieces: [
      { piece: "N", squares: ["b6", "d5"], why: "The provoking knight. It goes to d5 when e5 hits it, then to b6 when c4 comes. Never back to g8." },
      { piece: "B", squares: ["g7"], why: "The fianchetto bishop presses on the d4- and e5-pawns from a distance, and covers your king." },
      { piece: "N", squares: ["c6", "d7"], why: "The second knight attacks d4 (and e5 once it is loose). On c6 it is your main hitter." },
      { piece: "B", squares: ["g4", "f5", "e6"], why: "The light bishop comes out early. On g4 it pins the knight that defends d4." },
      { piece: "Q", squares: ["d8", "c7", "d7"], why: "The queen stays home behind the d-file. She trades on d1 if White recaptures dxe5 carelessly." },
    ],
    pawns: ["d6", "g6"],
    order: [
      {
        before: "d6",
        after: "e6",
        why: "Hit the front of the chain with ...d6 before you ever play ...e6. If ...e6 comes first your light bishop is walled in and White's centre stands unchallenged, which is the opposite of the whole opening.",
      },
      {
        before: "d6",
        after: "c5",
        why: "...d6 attacks e5 and can never be kicked. ...c5 on its own lets White answer c4 and d5, chasing your knight again with the centre still intact.",
      },
    ],
    castle: "O-O",
    castleBy: 9,
  },

  ideas: [
    {
      id: "alekhine-provoke",
      title: "Provoke, then punish",
      oneLiner: "Let the pawns come forward. Then hit them with ...d6, ...Nc6 and the g7-bishop.",
      why: "A big pawn centre is only strong if it can be held. White spends moves on e5, d4 and c4; you spend the same moves on pieces that attack those pawns. When the pawns need more defenders than White has developed, they fall or White's pieces become passive holding them.",
    },
    {
      id: "alekhine-knight-route",
      title: "The knight's route: d5, then b6",
      oneLiner: "e5 hits it: go to d5. c4 hits it: go to b6. Never home to g8.",
      why: "From b6 the knight eyes c4 and d5 and is out of the way of your pawns. It costs White two pawn moves to put it there, and both of those pawns now need looking after.",
      trigger: { kind: "opponent_san", sans: ["c4"] },
      response: "...Nb6.",
      ifIgnored: "...Nb4 gets kicked by a3 and ...Nf4 simply hangs to the c1-bishop once d4 is in. The knight has one good square and it is b6.",
    },
    {
      id: "alekhine-d6",
      title: "Hit the front of the chain",
      oneLiner: "...d6 attacks e5 at once. Everything else waits until it is played.",
      why: "The e5-pawn is the tip of White's centre and the one piece of it you can attack with a pawn. ...d6 forces White to decide now: defend it with Nf3 or f4, trade it with exd6, or let it go. Whatever they choose, you have a clear plan.",
      trigger: { kind: "epd", epds: [P("e4 Nf6 e5 Nd5 d4")] },
      response: "...d6.",
      ifIgnored: "...e6 walls in your bishop and lets White build the centre in peace. You would be playing a bad French.",
    },
    {
      id: "alekhine-four-pawns",
      title: "Four Pawns: strike before they settle",
      oneLiner: "After f4, play ...dxe5, ...Nc6 and ...Bg4 fast. d4 is the target.",
      why: "White has spent four moves on pawns and none on pieces. After ...dxe5 fxe5 the d4-pawn is attacked by your knight and queen down the open d-file, and ...Bg4 pins the knight that would defend it. White must spend the next moves holding d4, which is exactly the trade you wanted.",
      trigger: { kind: "epd", epds: [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4")] },
      response: "...dxe5, then ...Nc6 and ...Bg4.",
    },
    {
      id: "alekhine-f7",
      title: "After Nxe5, mind f7",
      oneLiner: "A knight on e5 and a queen that can reach h5 means Nxf7 tricks. Play ...g6, never ...Nd7.",
      why: "Once White's knight sits on e5 the sacrifice Nxf7 followed by Qh5+ is in the air. ...g6 takes h5 away and prepares the bishop; ...Nd7 blocks your own bishop's defence and walks straight into it. Develop the kingside first, then challenge the knight.",
      trigger: { kind: "epd", epds: [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5")] },
      response: "...g6, ...Bg7, castle.",
      ifIgnored: "...Nd7 allows Nxf7 Kxf7 Qh5+ and your king is dragged into the open a pawn down.",
    },
    {
      id: "alekhine-bc4",
      title: "Bc4 hits the knight: kick back",
      oneLiner: "When a bishop lands on c4 aiming at d5, play ...Nb6 and make it move again.",
      why: "The bishop on c4 attacks your knight and looks at f7. ...Nb6 hits it straight back, and after Bb3 your knight is on its best square anyway. You have lost nothing and White has spent two moves on one bishop.",
      trigger: { kind: "opponent_piece_on", piece: "B", squares: ["c4"] },
      response: "...Nb6.",
    },
    {
      id: "alekhine-book-end",
      title: "When the book runs out",
      oneLiner: "Castle, then pick the target: d4 if it is loose, e5 if it is. Trade pieces that defend them.",
      why: "The middlegame is a siege. Count attackers and defenders on d4 and e5, add an attacker where you can (...Nc6, ...Bg4, ...Qc7, rooks to the d- and c-files), and break with ...c5 when the pieces are behind it. If White plays quietly you have equalised with no weaknesses; do not rush.",
      trigger: { kind: "book_end" },
    },
  ],

  annotations: {
    [P("")]: {
      replies: [
        { san: "e4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 — the Alekhine. Hit the pawn at once.", why: "Most of your games. The knight dares the pawn to come forward." },
        { san: "d4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, then ...g6 and ...Bg7 — the same pieces on the same squares, a King's Indian by another road.", why: "No pawn to poke, but your setup still works." },
        { san: "c4", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7, castle — flexible and solid.", why: "The English. Develop and see." },
        { san: "Nf3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6 and mirror until White commits.", why: "Flexible. It usually becomes a d4 game." },
        { san: "Nc3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — if e4 follows, play ...d5 and take the centre they declined.", why: "Often transposes to 1.e4 lines a move later." },
        { san: "f4", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...g6, ...Bg7 — your king will be safer than theirs.", why: "Bird's Opening loosens the kingside early." },
        { san: "d3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, then ...d5 or ...e5 and take the space.", why: "Timid." },
        { san: "e3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...Bf5 — develop freely.", why: "Passive; it shuts in White's own bishop." },
        { san: "b3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6, ...e6, ...d5 — the long diagonal is their whole plan, so keep it blocked.", why: "Ignores the centre." },
        { san: "g3", verdict: "good", answer: "Nf6", howToAnswer: "...Nf6, ...d5, ...c6 — solid.", why: "A fianchetto setup that avoids all your theory." },
      ],
    },
    [P("e4")]: { yourMove: { san: "Nf6", why: "Attack the pawn on move one. White's most natural reply is to kick you, and that is exactly what you want." } },
    [P("e4 Nf6")]: {
      replies: [
        { san: "e5", verdict: "good", answer: "Nd5", howToAnswer: "...Nd5 — the knight steps to the centre. c4 will chase it again to b6.", why: "The main line and the honest test. White accepts the dare." },
        { san: "Nc3", verdict: "good", answer: "d5", howToAnswer: "...d5 — take the centre they declined. After exd5 Nxd5, or e5 Nfd7, you have an easy game.", why: "Declining the challenge. Fine for White but nothing to fear." },
        { san: "d3", verdict: "dubious", answer: "d5", howToAnswer: "...d5, then ...Nc6 and ...e5 if allowed.", why: "Defends e4 in the most timid way and blocks White's own bishop." },
        { san: "Nf3", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — a free pawn. If Qe2 comes, ...d5 protects the knight.", why: "Develops but leaves e4 hanging." },
        { san: "d4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4 — nothing defends it. After Bd3, back to f6 with the pawn in your pocket.", why: "Claiming the centre while forgetting the pawn you already have there." },
        { san: "Bc4", verdict: "dubious", answer: "Nxe4", howToAnswer: "...Nxe4. If Bxf7+ Kxf7 Qh5+, play ...g6 and ...Kg7: material stays level and the attack is over.", why: "Aims at f7 but drops e4. The bishop sacrifice looks scary and gains nothing." },
        { san: "Bd3", verdict: "bad", answer: "e5", howToAnswer: "...e5, ...Nc6, ...d5 — take everything White is not.", why: "Blocks the d-pawn and so the whole queenside." },
        { san: "Qe2", verdict: "dubious", answer: "e5", howToAnswer: "...e5, ...Nc6 — develop and let the queen get in her own way.", why: "Defends e4 with the queen and blocks the f1-bishop." },
        { san: "f3", verdict: "bad", answer: "e5", howToAnswer: "...e5, then ...d5 — hit the centre while their king has no f-pawn cover.", why: "Defends e4 with the pawn that guards the king and takes f3 from the knight." },
      ],
    },
    [P("e4 Nf6 e5")]: {
      yourMove: { san: "Nd5", why: "To the centre. From d5 it eyes c3 and f4 and it will step to b6 when c4 comes." },
      mistakes: [
        { san: "Ne4", why: "d3 kicks it again and it has to go to c5, where d4 kicks it a third time. Three knight moves for nothing." },
        { san: "Ng8", why: "Back home. You have spent two moves to be a tempo down on the starting position." },
      ],
    },
    [P("e4 Nf6 e5 Nd5")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d6", howToAnswer: "...d6 — attack the front of the chain at once.", why: "The main line. White builds the centre you intend to attack." },
        { san: "c4", verdict: "good", answer: "Nb6", howToAnswer: "...Nb6 — the knight's second home. Then ...d6 as usual.", why: "Chasing the knight straight away. It goes exactly where it wanted to." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 — trade and give White a doubled pawn. Then ...d6.", why: "Develops, but offers a trade that damages White's structure." },
        { san: "Nf3", verdict: "good", answer: "d6", howToAnswer: "...d6 — hit e5 before it is properly held.", why: "Calm development. Fine, but it does nothing about your knight." },
        { san: "Bc4", verdict: "dubious", answer: "Nb6", howToAnswer: "...Nb6 — hit the bishop straight back. After Bb3, ...d6 or ...d5.", why: "Aims at d5 and f7 and gets chased away with tempo." },
        { san: "d3", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — e5 is already under pressure and White has not claimed d4.", why: "Too modest for the pawn that has just been pushed to e5." },
        { san: "Qf3", verdict: "dubious", answer: "e6", howToAnswer: "...e6 — the knight is solid and the queen is in the way of the g1-knight.", why: "An early queen that attacks a defended knight." },
        { san: "Qg4", verdict: "bad", answer: "d6", howToAnswer: "...d6 — g7 is covered by your bishop, so the queen threatens nothing. Develop and she will have to move again.", why: "Hoping for Qxg7. The bishop on f8 already guards it." },
        { san: "c3", verdict: "dubious", answer: "d6", howToAnswer: "...d6, then ...Nc6 — White's centre is slow and you are ahead in development.", why: "Prepares d4 without hitting anything." },
      ],
    },

    // --- 3.d4: the main road -----------------------------------------------
    [P("e4 Nf6 e5 Nd5 d4")]: {
      yourMove: { san: "d6", why: "Attack the head of the chain. Now White must defend e5, trade it, or let it go." },
      mistakes: [
        { san: "e6", why: "Passive and off-plan. It walls in your c8-bishop and asks nothing of White's centre. ...d6 first, always." },
        { san: "c5", why: "c4 chases the knight and d5 keeps the centre. ...d6 is the move that hits e5 and cannot be kicked." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 — resolve the centre. After Nxe5 play ...g6 and get the bishop out.", why: "The Modern Variation: calm development. Your most common opponent." },
        { san: "c4", verdict: "good", answer: "Nb6", howToAnswer: "...Nb6 — knight to its square. Then ...dxe5 and ...Nc6 against f4.", why: "The ambitious try. It is heading for the Four Pawns Attack." },
        { san: "exd6", verdict: "good", answer: "exd6", howToAnswer: "...exd6 — recapture and develop: ...Be7, ...O-O, ...Nc6.", why: "The Exchange. Solid, and it hands you an easy position with no weaknesses." },
        { san: "Bc4", verdict: "dubious", answer: "Nb6", howToAnswer: "...Nb6 — kick it. After Bb3, ...dxe5 and the e5-pawn becomes the target: ...Nc6 next.", why: "The bishop walks into a tempo-gaining knight move." },
        { san: "f4", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 fxe5 Nc6 — hit d4 down the open d-file. Then ...Bg4 or ...Bf5.", why: "Four Pawns without c4: your knight stays on d5 and d4 is already loose." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 dxe5 — and if dxe5 then ...Qxd1+ takes their castling away.", why: "Develops into a trade that damages White's pawns." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — block with a pawn that also props up your knight.", why: "A check that gains nothing and loses a tempo." },
        { san: "Qf3", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 dxe5 e6 — solid, and the queen is in the way of White's development.", why: "An early queen that attacks a knight your queen already defends." },
        { san: "Be2", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 dxe5 Nc6 — the e5-pawn is now the target.", why: "Quiet, and it leaves e5 defended only by the d-pawn." },
      ],
    },

    // 4.Nf3: the Modern Variation
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3")]: {
      yourMove: { san: "dxe5", why: "Resolve the tension. Whatever recaptures, the knight on d5 stays put and you get to develop against a single centre pawn." },
      mistakes: [{ san: "e6", why: "Shuts in your bishop for no reason. Take on e5 first; ...e6 can come later if you need it." }],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5")]: {
      replies: [
        { san: "Nxe5", verdict: "good", answer: "g6", howToAnswer: "...g6 — bishop to g7, castle, then hit the knight with ...c5 or ...Nd7 once f7 is safe.", why: "The main line. The knight is active on e5 but it is also a target." },
        { san: "dxe5", verdict: "dubious", answer: "Bg4", howToAnswer: "...Bg4 — pin the knight, then ...Nc6 hits e5.", why: "Keeps a pawn on e5 that will need constant defending." },
        { san: "Bc4", verdict: "bad", answer: "Nb6", howToAnswer: "...Nb6 — the bishop must move again, and then ...exd4 leaves you a pawn up.", why: "Develops with a threat that is not a threat, while d4 and e5 are both hanging." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5")]: {
      yourMove: { san: "g6", why: "Prepares the bishop, takes h5 away from the queen, and so kills the Nxf7 tricks before they start." },
      mistakes: [{ san: "Nd7", why: "The one move to avoid. Nxf7 Kxf7 Qh5+ and your king is dragged out: after ...g6 Qxd5+ you are a pawn down with no castling." }],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6")]: {
      replies: [
        { san: "Be2", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7 — then castle and hit d4 with ...c5 or ...Nc6.", why: "The main line. Simple development." },
        { san: "c4", verdict: "good", answer: "Nb6", howToAnswer: "...Nb6, then ...Bg7 and ...O-O. The c4-pawn is now one more thing to defend.", why: "Gains space and kicks the knight to its favourite square." },
        { san: "Bc4", verdict: "good", answer: "c6", howToAnswer: "...c6 — prop up the knight. Then ...Bg7, ...O-O and ...Nd7 to challenge e5.", why: "Aims at d5 and f7 together. One pawn move takes care of both." },
        { san: "Nc3", verdict: "dubious", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 Bg7 — the c-pawns are doubled and d4 is weaker.", why: "Develops into a trade that spoils White's structure." },
        { san: "Qf3", verdict: "dubious", answer: "Nf6", howToAnswer: "...Nf6 — the knight blocks the f-file and covers f7. Then ...Bg7 and the queen must move again.", why: "Threatens Nxf7 with the queen behind it. One retreat ends the threat." },
        { san: "Bd3", verdict: "good", answer: "Bg7", howToAnswer: "...Bg7, castle, then ...c5 — the bishop on d3 blocks the queen's defence of d4.", why: "Natural, but it leaves d4 with fewer defenders." },
        { san: "h4", verdict: "dubious", answer: "Bg7", howToAnswer: "...Bg7 — develop; h5 is not a threat while your bishop guards the kingside.", why: "A pawn storm with no pieces behind it." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6 Be2")]: {
      yourMove: { san: "Bg7", why: "The bishop looks at e5 and d4 from behind your pawns. Castle next." },
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6 Be2 Bg7")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "O-O", howToAnswer: "...O-O — king safe, then ...c5 or ...Nc6 against d4.", why: "The main line." },
        { san: "c4", verdict: "good", answer: "Nb6", howToAnswer: "...Nb6, then ...O-O and ...Nc6.", why: "Space, at the cost of another pawn to look after." },
        { san: "Nf3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O — the knight has gone back where it came from and you are a move ahead.", why: "Retreating a piece that was not attacked." },
        { san: "Nc3", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 O-O — doubled c-pawns for White, a target on d4 for you.", why: "Develops, but the trade suits you." },
        { san: "h4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...c5 — your counterplay in the centre is faster than a pawn on h4.", why: "Storming before developing." },
        { san: "f4", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...c5 — the f4-pawn props up e5 but weakens the king and leaves d4 thinner.", why: "Over-protecting e5 with the king's pawn cover." },
        { san: "c3", verdict: "dubious", answer: "O-O", howToAnswer: "...O-O, then ...Nd7 to challenge the knight.", why: "Solid but slow. White is asking nothing of you." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6 Be2 Bg7 O-O")]: {
      yourMove: { san: "O-O", why: "Get castled before the fight for d4 and e5 begins. Nothing is hanging and there is no rush." },
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6 Be2 Bg7 O-O O-O")]: {
      replies: [
        { san: "c4", verdict: "good", answer: "Nb6", howToAnswer: "...Nb6, then ...Nc6 hits both e5 and d4.", why: "The main line. White gains space and gives you targets." },
        { san: "Nf3", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — hit d4 at once.", why: "The knight retreats voluntarily." },
        { san: "Nc3", verdict: "good", answer: "Nxc3", howToAnswer: "...Nxc3 bxc3 c5 — the doubled pawns make d4 a real target.", why: "Develops into a trade that suits you." },
        { san: "Re1", verdict: "good", answer: "c5", howToAnswer: "...c5 — attack d4 while the rook does nothing on e1 yet.", why: "Quiet, and it lets you start first." },
        { san: "Nd2", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — d4 has one defender fewer with the knight on d2.", why: "A passive square for the knight." },
        { san: "f4", verdict: "dubious", answer: "c5", howToAnswer: "...c5 — the f-pawn props up e5 but d4 is now thinner.", why: "Weakens the king to hold a pawn a piece could hold." },
        { san: "Bf3", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — hold the knight, then ...Nd7 to challenge e5.", why: "Aims at d5 but leaves the kingside bishop doing very little." },
      ],
    },

    // 4.c4: the Four Pawns Attack (also reached via 3.c4 Nb6 4.d4 d6)
    [P("e4 Nf6 e5 Nd5 d4 d6 c4")]: {
      yourMove: { san: "Nb6", why: "The knight's second home. From b6 it watches c4 and d5, and White's pawns are getting further from their own pieces." },
      mistakes: [
        { san: "Nb4", why: "a3 kicks it again and the knight has to run to c6, where d5 kicks it a third time. It has one good square and that is b6." },
        { san: "Nf4", why: "Just hangs the knight to the c1-bishop." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6")]: {
      replies: [
        { san: "f4", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 fxe5 Nc6 — the d4-pawn is attacked down the open file at once.", why: "The Four Pawns Attack: maximum space, minimum development. The critical test, and the most fun to play against." },
        { san: "exd6", verdict: "good", answer: "exd6", howToAnswer: "...exd6, then ...Be7, ...O-O, ...Nc6 — a solid, easy position.", why: "The Exchange. White gives up the pressure for a quiet game." },
        { san: "Nf3", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 — if Nxe5 then ...g6, if dxe5 then ...Qxd1+ removes their castling.", why: "Calm development. Transposes toward the Modern with c4 in." },
        { san: "Nc3", verdict: "good", answer: "dxe5", howToAnswer: "...dxe5 — after dxe5 Qxd1+ Nxd1 the e5-pawn is weak; play ...Nc6 against it.", why: "Development first. Fine for White, but you get a free hand in the centre." },
        { san: "c5", verdict: "dubious", answer: "Nd5", howToAnswer: "...Nd5 — the c-pawn has run too far and d5 is a fine square again. Then ...e6.", why: "Chasing the knight a third time with a pawn that is now overextended." },
        { san: "Be3", verdict: "dubious", answer: "dxe5", howToAnswer: "...dxe5 dxe5 Qxd1+ Kxd1 Nc6 — queens off, their king on d1, e5 loose.", why: "Develops but leaves the recapture problems unsolved." },
        { san: "Bd3", verdict: "bad", answer: "dxe5", howToAnswer: "...dxe5 dxe5 Qxd1+ Kxd1 — White loses castling for nothing.", why: "The bishop blocks the queen's route and cannot cover d1." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4")]: {
      yourMove: { san: "dxe5", why: "Trade the pawn that has been hitting you and open the d-file. After fxe5 the d4-pawn has your knight and queen to worry about." },
      mistakes: [{ san: "Nxc4", why: "The knight is simply lost after Bxc4. The c4-pawn looks loose but the f1-bishop guards it." }],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5")]: {
      replies: [
        { san: "fxe5", verdict: "good", answer: "Nc6", howToAnswer: "...Nc6 — d4 is attacked by knight and queen. White has to defend it right now.", why: "The main line. White keeps the big centre and must now hold it." },
        { san: "dxe5", verdict: "dubious", answer: "Qxd1+", howToAnswer: "...Qxd1+ Kxd1 Nc6 — queens off, their king stuck on d1, e5 under fire.", why: "Recapturing with the d-pawn opens the d-file onto White's own queen." },
        { san: "Nf3", verdict: "bad", answer: "exd4", howToAnswer: "...exd4 — a pawn up, and the d4-square is yours.", why: "Ignores the pawn that has just been taken." },
        { san: "Nc3", verdict: "dubious", answer: "exd4", howToAnswer: "...exd4 — the pawn hits the knight and you are two up for now.", why: "Develops while the pawns fall." },
        { san: "c5", verdict: "dubious", answer: "Nd5", howToAnswer: "...Nd5 — back to the centre. After fxe5 play ...e6 and the position is level and easy.", why: "Kicks the knight to a better square." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5")]: {
      yourMove: { san: "Nc6", why: "Attack d4 with the knight while your queen already attacks it down the open file. Two attackers, one defender: White must respond." },
      mistakes: [
        { san: "Nxc4", why: "Bxc4 and the knight is gone for a pawn." },
        { san: "Qxd4", why: "Qxd4 and your queen is gone for a pawn. Count the defenders before you take." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6")]: {
      replies: [
        { san: "Nf3", verdict: "good", answer: "Bg4", howToAnswer: "...Bg4 — pin the defender of d4. Then ...e6 and ...Be7.", why: "The natural defence of d4. Now you pin the defender." },
        { san: "Be3", verdict: "good", answer: "Bf5", howToAnswer: "...Bf5, then ...e6, ...Be7 — develop and keep d4 under pressure.", why: "The main line. The bishop holds d4 and White hopes to develop behind it." },
        { san: "Nc3", verdict: "bad", answer: "Nxd4", howToAnswer: "...Nxd4 — a pawn, because Qxd4 loses the queen to ...Qxd4.", why: "Develops without defending d4, which now has two attackers and only a queen that cannot really recapture." },
        { san: "Be2", verdict: "bad", answer: "Nxd4", howToAnswer: "...Nxd4 — a clean pawn.", why: "Same problem: d4 is attacked twice and only the queen defends it." },
        { san: "d5", verdict: "dubious", answer: "Nxe5", howToAnswer: "...Nxe5 — the e5-pawn has lost its support. If c5, retreat ...Nbd7.", why: "Advancing the pawn that was holding e5." },
        { san: "Qf3", verdict: "dubious", answer: "Bf5", howToAnswer: "...Bf5 — develop; d4 is still a target and the queen is in the way of the knight.", why: "An early queen that defends nothing on d4." },
        { san: "Bd3", verdict: "bad", answer: "Nxd4", howToAnswer: "...Nxd4 — the bishop blocks the queen's defence of d4, so the pawn is free.", why: "Puts a piece between the queen and the pawn she was guarding." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Nf3")]: {
      yourMove: { san: "Bg4", why: "Pin the knight that defends d4. The pressure on d4 is the whole point of the line." },
      mistakes: [{ san: "Nxd4", why: "d4 now has two defenders. Nxd4 Qxd4 Qxd4 and you have lost a queen for a pawn." }],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Nf3 Bg4")]: {
      replies: [
        { san: "Be2", verdict: "good", answer: "e6", howToAnswer: "...e6, then ...Be7 and castle. d4 stays a target for the whole game.", why: "The main line: break the pin and develop." },
        { san: "e6", verdict: "good", answer: "fxe6", howToAnswer: "...fxe6 — take, and after c5 play ...Nd5. The pawns are loose and your pieces are out.", why: "A sharp try: White gives a pawn to shatter your structure. Keep calm and develop." },
        { san: "Be3", verdict: "good", answer: "e6", howToAnswer: "...e6, ...Be7, ...O-O.", why: "Holds d4 a second time. Solid." },
        { san: "d5", verdict: "dubious", answer: "Bxf3", howToAnswer: "...Bxf3 Qxf3 Nxe5 — the e5-pawn falls and the knight hits the queen.", why: "The pawn advances and leaves e5 behind." },
        { san: "h3", verdict: "dubious", answer: "Bxf3", howToAnswer: "...Bxf3 Qxf3 Nxd4 — the queen has left d1, so d4 has no defender.", why: "Asking the bishop a question the bishop is happy to answer." },
        { san: "Bd3", verdict: "dubious", answer: "Bxf3", howToAnswer: "...Bxf3 Qxf3 Nxd4 — a pawn.", why: "Blocks the queen's defence of d4." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Nf3 Bg4 Be2")]: {
      yourMove: { san: "e6", why: "Now the bishop is out, ...e6 is right: it frees the f8-bishop and stops any d5 push." },
    },
    [P("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Nf3 Bg4 Be2 e6")]: {
      replies: [
        { san: "O-O", verdict: "good", answer: "Be7", howToAnswer: "...Be7, castle, then ...Qd7 and ...Rd8 pile onto d4.", why: "The main line." },
        { san: "Be3", verdict: "good", answer: "Be7", howToAnswer: "...Be7 and castle. The siege of d4 continues.", why: "Holds d4 again." },
        { san: "Nc3", verdict: "good", answer: "Be7", howToAnswer: "...Be7, ...O-O — then ...Qd7 and ...Rad8.", why: "Development." },
        { san: "d5", verdict: "dubious", answer: "exd5", howToAnswer: "...exd5 cxd5 Nb4 — the knight hits d5 and c2.", why: "Advances the pawn you were attacking into more attackers." },
        { san: "h3", verdict: "dubious", answer: "Bxf3", howToAnswer: "...Bxf3 Bxf3 Be7 — keep developing; the e5-pawn remains a long-term weakness.", why: "Trades your bishop for the knight that held d4." },
        { san: "c5", verdict: "dubious", answer: "Nd5", howToAnswer: "...Nd5 — a superb square, and the c-pawn is now overextended.", why: "A third pawn push at a knight that is happy to move." },
      ],
    },

    // --- 3.c4 first ------------------------------------------------------------
    [P("e4 Nf6 e5 Nd5 c4")]: {
      yourMove: { san: "Nb6", why: "The only good square. ...Nb4 gets kicked by a3, and anything else is passive." },
      mistakes: [{ san: "Nb4", why: "a3 chases it again to c6, and d4 then d5 chases it a third time. Go to b6." }],
    },
    [P("e4 Nf6 e5 Nd5 c4 Nb6")]: {
      replies: [
        { san: "d4", verdict: "good", answer: "d6", howToAnswer: "...d6 — into the main Four Pawns position by another road.", why: "The main line." },
        { san: "c5", verdict: "dubious", answer: "Nd5", howToAnswer: "...Nd5 — back to the centre. The c5-pawn is a target, not a spearhead. Then ...e6 and ...Nc6.", why: "The Chase Variation: three pawn moves at one knight." },
        { san: "Nc3", verdict: "good", answer: "d6", howToAnswer: "...d6 — hit e5.", why: "Development." },
        { san: "Nf3", verdict: "good", answer: "d6", howToAnswer: "...d6, then ...dxe5 or ...Bg4.", why: "Development." },
        { san: "b3", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — the c4-pawn is held but e5 is not.", why: "Protecting c4 before it is attacked." },
        { san: "Be2", verdict: "dubious", answer: "d6", howToAnswer: "...d6 — e5 has no defenders yet.", why: "Passive." },
      ],
    },
    [P("e4 Nf6 e5 Nd5 c4 Nb6 d4")]: {
      yourMove: { san: "d6", why: "Same idea, same move: hit the front of the chain." },
      mistakes: [{ san: "e6", why: "Passive; it blocks your bishop and leaves e5 unchallenged. ...d6 first." }],
    },

    // --- 2.Nc3: declining ---------------------------------------------------------
    [P("e4 Nf6 Nc3")]: { yourMove: { san: "d5", why: "White declined to kick the knight, so take the centre. After exd5 Nxd5 you are a Scandinavian a move up." } },
    [P("e4 Nf6 Nc3 d5")]: {
      replies: [
        { san: "exd5", verdict: "good", answer: "Nxd5", howToAnswer: "...Nxd5 — then ...Nxc3 if it is attacked, or ...e5 and develop.", why: "The natural capture." },
        { san: "e5", verdict: "good", answer: "Nfd7", howToAnswer: "...Nfd7 — then ...e6, ...c5, a French where your bishop can still get out.", why: "Gains space; the e5-pawn is now a target for ...c5." },
        { san: "d3", verdict: "dubious", answer: "d4", howToAnswer: "...d4 — kick the knight and gain space.", why: "Passive." },
        { san: "Nf3", verdict: "bad", answer: "dxe4", howToAnswer: "...dxe4 — a pawn, and Nxe4 loses the knight to ...Nxe4.", why: "Ignores the attack on e4." },
        { san: "Bb5+", verdict: "dubious", answer: "c6", howToAnswer: "...c6 — the bishop must retreat and your centre is stronger.", why: "A check that gains time for you." },
      ],
    },
  },

  traps: [
    {
      name: "The knight's dream, the king's nightmare",
      sans: sans("1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.Nf3 dxe5 5.Nxe5 Nd7 6.Nxf7 Kxf7 7.Qh5+ g6 8.Qxd5+"),
      punisher: "white",
      tell: "White's knight sits on e5 and you feel like challenging it with ...Nd7. The queen can reach h5.",
      why: "...Nd7 blocks your bishop's route and leaves f7 attacked. Nxf7 Kxf7 Qh5+ drags your king out; after ...g6 Qxd5+ you are a pawn down with a king that can never castle. Play ...g6 first and the whole thing disappears.",
    },
    {
      name: "The hasty recapture",
      sans: sans("1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.c4 Nb6 5.f4 dxe5 6.dxe5 Qxd1+ 7.Kxd1 Nc6"),
      punisher: "black",
      tell: "White has pushed four pawns and reaches for the d-pawn to recapture on e5 without looking at the d-file.",
      why: "With the d-file open, dxe5 lets you trade queens on d1 with check. White's king is stuck in the centre, castling is gone, and the e5-pawn has no defenders while your pieces come out hitting it. Not a material win yet, but an endgame you will enjoy.",
    },
    {
      name: "d4 has no real defender",
      sans: sans("1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.c4 Nb6 5.f4 dxe5 6.fxe5 Nc6 7.Nc3 Nxd4"),
      punisher: "black",
      tell: "The d-file is open, your knight lands on c6, and White develops without adding a defender to d4.",
      why: "Your knight and queen both attack d4 and only White's queen defends it. Nxd4 wins the pawn: Qxd4 is answered by ...Qxd4 and there is nothing to recapture. Be3 or Nf3 would have held it; a natural developing move did not.",
    },
  ],

  modelGames: [
    {
      label: "Modern Variation: calm and solid",
      sans: sans("e4 Nf6 e5 Nd5 d4 d6 Nf3 dxe5 Nxe5 g6 Be2 Bg7 O-O O-O c4 Nb6 Nc3 Nc6 Nxc6 bxc6 Be3 Be6"),
      summary: "White develops sensibly and you match it: ...dxe5, ...g6, ...Bg7, castle. Then ...Nb6 and ...Nc6 hit the centre and the c4-pawn, and you have a comfortable game with no weaknesses.",
    },
    {
      label: "Four Pawns: the siege of d4",
      sans: sans("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Nf3 Bg4 Be2 e6 O-O Be7 Be3 O-O"),
      summary: "White pushes four pawns and you answer with pieces: ...dxe5 opens the d-file, ...Nc6 and ...Bg4 pile onto d4, and every White move for the rest of the opening goes to holding it.",
    },
    {
      label: "Exchange: nothing to fear",
      sans: sans("e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 exd6 exd6 Nc3 Be7 Nf3 O-O Be2 Nc6 O-O Bf5"),
      summary: "White trades on d6 and the tension is gone. Recapture with the e-pawn, develop everything to natural squares, castle, and get the light bishop out. Level and easy.",
    },
  ],

  middlegamePlan:
    "The Alekhine middlegame is a siege of the pawns you provoked. Count the attackers and defenders on d4 and e5 every move, and add an attacker whenever you can: ...Nc6, ...Bg4 pinning the f3-knight, ...Qd7 or ...Qc7, rooks to d8 and c8. " +
    "Trade off the pieces that defend the centre and keep the ones that attack it. Break with ...c5 once your pieces are behind it, and use the b6-knight to hit c4 and d5. " +
    "If White has played calmly, you have no weaknesses and a free game: castle, finish development and only then push. " +
    "If White has overextended, do not let the centre stabilise: strike at d4 immediately, before Be3 and Nf3 can both arrive.",

  structureDiagram: {
    fen: "rnbqk2r/ppp1ppbp/6p1/3nN3/3P4/8/PPP1BPPP/RNBQK2R w KQkq - 2 7",
    orientation: "black",
    arrows: [
      { from: "g7", to: "e5" },
      { from: "d5", to: "b6" },
    ],
    caption: "The Alekhine picture: White's pawn came to e5 and got traded, the knight sits in the centre, and the g7-bishop looks down the diagonal at what is left of the pawn chain.",
  },
};
