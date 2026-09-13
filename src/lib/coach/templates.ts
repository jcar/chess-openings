// What Caissa SAYS for each tag. Templated, deterministic, verifiable — the facts
// (piece, square, best move) come from the position, never invented. Three
// severity buckets: "bad" (blunder/mistake), "meh" (inaccuracy), "good".
//
// The headline is the line she SPEAKS, so it is short, spoken English, and under
// the word budget (tests/voice.test.ts enforces it). `why` and `lookFor` are the
// tap-to-reveal text: room to teach, never read aloud.

import type { MoveTag } from "./tags";

export type Bucket = "bad" | "meh" | "good";
export type Perspective = "you" | "they";

export interface Slots {
  /** Lowercase piece name of the moved piece, e.g. "knight". */
  piece: string;
  from: string;
  to: string;
  /** Piece name currently hanging (may differ from the moved piece). */
  hangingPiece?: string;
  hangingSquare?: string;
  attacker?: string;
  bestSan?: string | null;
  capturedPiece?: string;
}

export interface Tpl {
  headline: string;
  why: string;
  /** What to look at / do next. */
  lookFor?: string;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Wording for the USER's move. */
export function templateYou(tag: MoveTag, bucket: Bucket, s: Slots): Tpl {
  const best = s.bestSan ? ` ${s.bestSan} was better.` : "";
  switch (tag) {
    case "hangs_piece":
      return {
        headline: `That ${s.hangingPiece ?? s.piece} on ${s.hangingSquare ?? s.to} is hanging.`,
        why: `${cap(s.attacker ?? "An enemy piece")} attacks it and nothing defends it. Count attackers and defenders before you commit a piece to a square.`,
        lookFor: `Move it, defend it, or take something bigger.${best}`,
      };
    case "leaves_piece_hanging": {
      // The endangered piece is somewhere else on the board, so its square is
      // only named when the scan actually found one.
      const where = s.hangingSquare ? ` on ${s.hangingSquare}` : "";
      return {
        headline: `The ${s.hangingPiece ?? "piece"}${where} is still hanging.`,
        why: "You moved something else while it was attacked. A threat doesn't wait its turn — deal with it first.",
        lookFor: `Save the ${s.hangingPiece ?? "piece"}${where}.${best}`,
      };
    }
    case "hangs_pawn":
      return {
        headline: `That pawn on ${s.to} is free for them.`,
        why: "Pawns count. A pawn given away in the opening is usually still missing in the endgame.",
        lookFor: best ? `${s.bestSan} instead.` : "Check what defends a pawn before you push it.",
      };
    case "early_queen":
      return bucket === "good"
        ? {
            headline: "Queen's out early. This time it works.",
            why: "Usually she just becomes a target. Here she does something concrete, so it's fine.",
            lookFor: "Watch that she isn't chased around next move.",
          }
        : {
            headline: "Queen's out early. She'll just get chased.",
            why: "A lone queen threatens nothing that ordinary development doesn't already cover, and every kick costs you a move. Knights and bishops first.",
            lookFor: `Develop a minor piece instead.${best}`,
          };
    case "loses_tempo_same_piece":
      return {
        headline: `Same ${s.piece} twice. Something else needs a square.`,
        why: "Each piece wants one good square in the opening. Moving one twice is a move your other pieces never got.",
        lookFor: `Bring out something still at home.${best}`,
      };
    case "weakens_king_shield":
      return {
        headline: "That pawn was your king's cover.",
        why: "Pawns in front of the king keep enemy pieces out. Once they advance, the squares behind them belong to your opponent.",
        lookFor: "Move those pawns when you must, or when you're the one attacking there.",
      };
    case "moves_king_early":
      return {
        headline: "King moved. No castling now.",
        why: "The king is stuck in the centre, which is where lines open first.",
        lookFor: "In the opening the king moves once, and that's to castle.",
      };
    case "delays_castling":
      return {
        headline: "King's still in the middle.",
        why: "Past move seven with the king uncastled. Castling tucks it away and brings a rook in — two things for one move.",
        lookFor: "Castle now, unless something is hanging.",
      };
    case "delays_development":
      return {
        headline: "A pawn move, with pieces still at home.",
        why: "Every wing pawn move is a move a knight or bishop didn't get. Count how many of your pieces are still on their starting squares.",
        lookFor: `Develop toward the centre.${best}`,
      };
    case "doubles_pawns":
      return {
        headline: "Doubled pawns. They can't defend each other.",
        why: "Two pawns on one file get in each other's way, and the front one usually needs babysitting later.",
        lookFor: "Recapture toward the centre when you have the choice.",
      };
    case "isolates_pawn":
      return {
        headline: "That pawn's on its own now.",
        why: "An isolated pawn has no neighbour to defend it, so pieces have to do the job instead.",
        lookFor: "Keep pawns in chains, where one protects the next.",
      };
    case "wins_material":
      return {
        headline: `Free ${s.capturedPiece ?? "piece"}. Take it and simplify.`,
        why: "Material in hand wins itself: trade pieces, keep your king safe, and let the endgame do the work.",
        lookFor: "Don't get greedy. One piece is plenty.",
      };
    case "rescues_piece":
      return { headline: "You spotted it. Good.", why: "Seeing the threat is most of the game at this level." };
    case "castles":
      return { headline: "Castled. King's tucked away.", why: "The king is safe and the rook joins in. Now you can think about plans." };
    case "develops":
      return { headline: `${cap(s.piece)} out. That's the opening's job.`, why: "Another piece in the game, pointing at the centre. That's what these moves are for." };
    case "claims_centre":
      return { headline: "Space in the centre. Good.", why: "Centre pawns own the squares your pieces want, and they cramp your opponent's." };
    case "gives_check":
      return { headline: "Check. Make sure it buys something.", why: "A check is only good if it wins a piece, a tempo or a square. Otherwise it just helps their king find a better home." };
    case "captures":
      return { headline: "A trade.", why: "Fine when you're ahead, or when the piece you took was better than the one you gave." };
    case "left_authored":
      return { headline: "Off the book line.", why: "Not necessarily wrong. The book move here had a reason, though.", lookFor: best.trim() };
    case "rare_reply":
      return { headline: "Unusual. Let's see where it goes.", why: "Hardly anyone plays this. It might be perfectly fine." };
    case "common_reply":
      return { headline: "Normal move.", why: "Plenty of players go this way." };
  }
}

/** Wording for the OPPONENT's move — the punish card. */
export function templateThey(tag: MoveTag, s: Slots): Tpl | null {
  const answer = s.bestSan ? ` ${s.bestSan} is the engine's answer.` : "";
  switch (tag) {
    case "hangs_piece":
      return {
        headline: `Their ${s.hangingPiece ?? s.piece} on ${s.hangingSquare ?? s.to} is hanging. Take it.`,
        why: `${cap(s.attacker ?? "Your piece")} attacks it and nothing defends it. That's free material.`,
        lookFor: `Capture on ${s.hangingSquare ?? s.to}.`,
      };
    case "leaves_piece_hanging": {
      const where = s.hangingSquare ? ` on ${s.hangingSquare}` : "";
      return {
        headline: `Their ${s.hangingPiece ?? "piece"}${where} is still free.`,
        why: "They moved something else while it was attacked.",
        lookFor: s.hangingSquare ? `Take on ${s.hangingSquare}.` : "Take it.",
      };
    }
    case "hangs_pawn":
      return { headline: `Their pawn on ${s.to} is free.`, why: "Nothing defends it.", lookFor: `Take it, as long as it doesn't cost you development.${answer}` };
    case "early_queen":
      return {
        headline: "Their queen's out early. Develop at it.",
        why: "A lone queen threatens nothing your normal development doesn't already cover, and she's a target.",
        lookFor: `Bring out a piece that hits her or covers what she eyes. Don't chase her with pawns.${answer}`,
      };
    case "loses_tempo_same_piece":
      return { headline: "Same piece twice. That's a free move for you.", why: "You're a whole development move ahead now.", lookFor: `Use it: another piece out, or castle.${answer}` };
    case "weakens_king_shield":
      return { headline: "They loosened the pawns near their king.", why: "The squares in front of that king just got weaker.", lookFor: `Aim pieces at that side of the board.${answer}` };
    case "moves_king_early":
      return { headline: "Their king moved. No castling for them.", why: "It's stuck in the centre, where files and diagonals open first.", lookFor: `Open the centre and bring pieces toward it.${answer}` };
    case "delays_castling":
    case "delays_development":
      return { headline: "They're behind in development.", why: "Wing pawn moves and delays hand you time.", lookFor: `Finish developing, castle, then open the centre while they're behind.${answer}` };
    case "doubles_pawns":
      return { headline: "They doubled their pawns.", why: "A structural weakness you can aim at later.", lookFor: "Remember the front pawn. It will need defending." };
    case "isolates_pawn":
      return { headline: "They've got an isolated pawn now.", why: "No neighbour defends it.", lookFor: "Attack it with pieces, and blockade the square in front." };
    default:
      return null;
  }
}
