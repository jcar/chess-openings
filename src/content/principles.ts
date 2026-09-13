// Universal opening principles — the content for Principles Mode (<800) and the
// coach's fallback layer for every opening. Original wording.

import type { IdeaCard } from "./spec";

export const PRINCIPLES: IdeaCard[] = [
  {
    id: "p-centre-pawn-first",
    title: "Start with a centre pawn",
    oneLiner: "e4 or d4 first. It takes space and lets two pieces out.",
    why: "A centre pawn controls the squares your knights and bishops want and opens a diagonal for the bishop and queen. Wing pawns do neither.",
    trigger: { kind: "tag", tags: ["delays_development"] },
  },
  {
    id: "p-knights-bishops",
    title: "Knights and bishops before the queen",
    oneLiner: "Each minor piece gets ONE good square. Then castle.",
    why: "Minor pieces are the ones that fight for the centre without getting chased. The queen comes out once the small pieces have cleared the way.",
    trigger: { kind: "tag", tags: ["early_queen"] },
  },
  {
    id: "p-castle-early",
    title: "Castle by move 10",
    oneLiner: "Tuck the king away and bring a rook into the game — in one move.",
    why: "In the centre, the king sits on the file and diagonals that open first. Castled, it's behind three pawns and a rook has left the corner.",
    trigger: { kind: "tag", tags: ["delays_castling", "moves_king_early"] },
  },
  {
    id: "p-one-move-each",
    title: "Don't move the same piece twice",
    oneLiner: "Moving a piece again is a move another piece didn't get.",
    why: "The opening is a race to get everything out. Every repeat move puts you a step behind — unless the piece was attacked or the second move wins something.",
    trigger: { kind: "tag", tags: ["loses_tempo_same_piece"] },
  },
  {
    id: "p-count",
    title: "Before every move: what's attacked?",
    oneLiner: "Scan your pieces. Is anything attacked and undefended? Then scan theirs.",
    why: "Almost every lost game under 1200 is decided by a piece left en prise. A two-second scan each move is worth more than any opening line.",
    trigger: { kind: "tag", tags: ["hangs_piece", "leaves_piece_hanging", "hangs_pawn"] },
  },
  {
    id: "p-king-shelter",
    title: "Leave the pawns in front of your king alone",
    oneLiner: "f-, g- and h-pawns are the roof over your king. Don't lift it.",
    why: "Each pawn you push near the king gives up a square in front of it. Attacks come through those squares.",
    trigger: { kind: "tag", tags: ["weakens_king_shield"] },
  },
  {
    id: "p-punish-early-queen",
    title: "When THEY bring the queen out early",
    oneLiner: "Develop with threats. Every move that attacks the queen is a free development move.",
    why: "A queen out early has to keep moving. Each kick gains you a tempo. Don't chase it with pawns that wreck your structure — chase it with pieces you wanted to develop anyway.",
  },
  {
    id: "p-free-piece",
    title: "If it's free, take it",
    oneLiner: "An undefended piece you can capture is worth more than any plan.",
    why: "Material decides games at this level. Count attackers and defenders; if a capture is safe, make it.",
  },
];
