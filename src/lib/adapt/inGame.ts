// In-game adaptivity: a rolling read of how the game is going, turned into a
// momentum nudge (−1 / 0 / +1) for the NEXT game's bot strength.
//
// Six consecutive user moves at ≥ 80% win chance → +1 (you're crushing it).
// Six consecutive at ≤ 35% → −1 (it's too hard). Otherwise 0.

export interface MomentumTracker {
  streakHigh: number;
  streakLow: number;
  momentum: number;
}

export const HIGH = 80;
export const LOW = 35;
export const STREAK = 6;

export const newTracker = (): MomentumTracker => ({ streakHigh: 0, streakLow: 0, momentum: 0 });

export function observe(t: MomentumTracker, userWinPct: number): MomentumTracker {
  const streakHigh = userWinPct >= HIGH ? t.streakHigh + 1 : 0;
  const streakLow = userWinPct <= LOW ? t.streakLow + 1 : 0;
  let momentum = t.momentum;
  if (streakHigh >= STREAK) momentum = 1;
  else if (streakLow >= STREAK) momentum = -1;
  return { streakHigh, streakLow, momentum };
}
