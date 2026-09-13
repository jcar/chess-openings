import { describe, expect, it } from "vitest";
import { fensAlong } from "@/lib/book/key";
import { setupProgress, nextSetupHint } from "@/lib/setup/progress";
import type { SetupSpec } from "@/content/spec";

const london: SetupSpec = {
  pieces: [{ piece: "B", squares: ["f4", "g3"] }, { piece: "N", squares: ["f3"] }, { piece: "N", squares: ["d2"] }, { piece: "B", squares: ["d3", "e2"] }],
  pawns: ["d4", "e3", "c3"],
  order: [{ before: "Bf4", after: "e3", why: "Bishop out before e3 shuts it in." }],
  castle: "O-O",
};

describe("setupProgress", () => {
  it("counts reached squares and detects castling", () => {
    const sans = ["d4", "d5", "Nf3", "Nf6", "Bf4", "e6", "e3", "c5", "c3", "Nc6", "Nbd2", "Bd6", "Bg3", "O-O", "Bd3", "b6", "O-O"];
    const fen = fensAlong(sans).at(-1)!;
    const hist = sans.map((san, i) => ({ san, color: i % 2 === 0 ? ("white" as const) : ("black" as const) }));
    const p = setupProgress(fen, london, "white", hist);
    expect(p.pieces.every((x) => x.done)).toBe(true);
    expect(p.pawns.every((x) => x.done)).toBe(true);
    expect(p.castled).toBe(true);
    expect(p.orderViolations).toHaveLength(0);
    expect(p.score).toBe(1);
    expect(nextSetupHint(p)).toBeNull();
  });
  it("flags e3 before Bf4", () => {
    const sans = ["d4", "d5", "e3", "Nf6", "Bd3"];
    const fen = fensAlong(sans).at(-1)!;
    const hist = sans.map((san, i) => ({ san, color: i % 2 === 0 ? ("white" as const) : ("black" as const) }));
    const p = setupProgress(fen, london, "white", hist);
    expect(p.orderViolations).toHaveLength(1);
    expect(nextSetupHint(p)).toMatch(/bishop belongs on f4 or g3/);
  });
});
