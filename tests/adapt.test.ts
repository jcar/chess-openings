import { describe, expect, it } from "vitest";
import { eloUpdate, estimateFor, emptyRating } from "@/lib/adapt/rating";
import { difficultyFor, BOT_MAX, BOT_MIN } from "@/lib/adapt/strength";
import { newTracker, observe, STREAK } from "@/lib/adapt/inGame";

describe("elo", () => {
  it("moves toward the opponent on a win and away on a loss", () => {
    expect(eloUpdate(800, 800, "win")).toBe(816);
    expect(eloUpdate(800, 800, "loss")).toBe(784);
    expect(eloUpdate(800, 800, "draw")).toBe(800);
    expect(eloUpdate(800, 1200, "win")).toBeGreaterThan(816);
  });
  it("prefers the opening's own rating after three games", () => {
    const state = { global: { ...emptyRating(), rating: 900 }, perOpening: { x: { ...emptyRating(), rating: 700, games: 2 } } };
    expect(estimateFor(state, "x").basis).toBe("global");
    state.perOpening.x.games = 3;
    expect(estimateFor(state, "x")).toMatchObject({ rating: 700, basis: "opening" });
  });
});

describe("difficultyFor", () => {
  it("sits below the estimate, clamps, and follows momentum", () => {
    expect(difficultyFor(800, 0).botElo).toBe(750);
    expect(difficultyFor(800, 1).botElo).toBe(850);
    expect(difficultyFor(400, -1).botElo).toBe(BOT_MIN);
    expect(difficultyFor(1800, 1).botElo).toBe(BOT_MAX);
  });
  it("is slack and verbose for beginners, sharp and terse for stronger players", () => {
    const b = difficultyFor(700, 0);
    const s = difficultyFor(1400, 0);
    expect(b.tau).toBeGreaterThan(s.tau);
    expect(b.verbosity).toBe("verbose");
    expect(s.verbosity).toBe("terse");
  });
});

describe("momentum", () => {
  it("flips after a streak and not before", () => {
    let t = newTracker();
    for (let i = 0; i < STREAK - 1; i++) t = observe(t, 90);
    expect(t.momentum).toBe(0);
    t = observe(t, 90);
    expect(t.momentum).toBe(1);
    t = newTracker();
    for (let i = 0; i < STREAK; i++) t = observe(t, 20);
    expect(t.momentum).toBe(-1);
    // A middling move breaks the streak.
    t = newTracker();
    for (let i = 0; i < STREAK - 1; i++) t = observe(t, 90);
    t = observe(t, 60);
    t = observe(t, 90);
    expect(t.momentum).toBe(0);
  });
});
