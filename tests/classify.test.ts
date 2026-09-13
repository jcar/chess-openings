import { describe, expect, it } from "vitest";
import { judge, moveAccuracy, winPct } from "@/lib/coach/classify";

describe("win% model (Lichess)", () => {
  it("matches published anchor points", () => {
    expect(winPct(0)).toBeCloseTo(50, 5);
    expect(winPct(100)).toBeCloseTo(59.1, 0);
    expect(winPct(-100)).toBeCloseTo(40.9, 0);
    expect(winPct(1000)).toBeGreaterThan(97);
  });
  it("classifies by win% drop, not raw cp", () => {
    // +900 → +600 is a huge cp swing but barely moves the win%: not a blunder.
    expect(judge(900, -600).severity).not.toBe("blunder");
    // 0 → −300 (a hung knight) is a blunder for our audience.
    expect(judge(0, 300).severity).toBe("blunder");
    // +900 → +600 is not even an inaccuracy.
    expect(["best", "good", "ok"]).toContain(judge(900, -600).severity);
    expect(judge(0, 150).severity).toBe("mistake");
    expect(judge(0, 80).severity).toBe("inaccuracy");
    expect(judge(0, 0).severity).toBe("best");
  });
  it("accuracy is 100 for no loss and decays", () => {
    expect(moveAccuracy(0)).toBeCloseTo(100, 0);
    expect(moveAccuracy(20)).toBeLessThan(50);
  });
});
