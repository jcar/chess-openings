// What the game tells Caissa. These fire from the async function bodies inside
// useTrainGame, after its `seq` guard and outside any setState updater — so Strict
// Mode's updater replay can't double-fire them, and the transient facts that make
// her lines good (judgement, tags, loss, whether a pause was offered) survive.

import type { IdeaCard } from "@/content/spec";
import type { CoachMessage } from "@/lib/coach/explain";
import type { MoveJudgement } from "@/lib/coach/classify";
import type { MoveTag } from "@/lib/coach/tags";
import type { ThinkAbout } from "@/lib/coach/prompt";
import type { GameOverInfo, Ply } from "@/lib/game/useTrainGame";

export type TrainEvent =
  | { t: "game_start" }
  | { t: "user_move"; plyIndex: number; ply: Ply; tags: MoveTag[] }
  | {
      t: "user_judged";
      plyIndex: number;
      message: CoachMessage;
      judgement: MoveJudgement | null;
      winPct: number | null;
      deltaPct: number | null;
      tags: MoveTag[];
      pause: boolean;
      stepping: boolean;
    }
  | {
      t: "bot_move";
      plyIndex: number;
      ply: Ply;
      coach: CoachMessage | null;
      tags: MoveTag[];
      ideas: IdeaCard[];
      think: ThinkAbout | null;
      fenAfter: string;
    }
  | { t: "bot_coach_refresh"; plyIndex: number; coach: CoachMessage }
  /** `by` is who played the move that left the book, which is the difference
   *  between "you did something wrong" and "they did something unusual". */
  | { t: "book_ended"; plyIndex: number; by: "you" | "them"; san: string; bookMove?: string }
  | { t: "book_resumed"; plyIndex: number }
  | { t: "hint"; plyIndex: number; text: string; from?: string; to?: string }
  | { t: "pickup"; plyIndex: number; square: string; fen: string }
  | { t: "truncate"; toPlyIndex: number }
  | { t: "reset" }
  | { t: "game_over"; info: GameOverInfo };
