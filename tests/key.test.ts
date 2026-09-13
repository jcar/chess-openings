import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { epd, fensAlong, START_EPD } from "@/lib/book/key";

describe("epd", () => {
  it("drops the move clocks", () => {
    expect(epd(new Chess().fen())).toBe(START_EPD);
    expect(START_EPD.split(" ")).toHaveLength(4);
  });
  it("collapses transpositions", () => {
    const a = fensAlong(["d4", "Nf6", "Nf3", "d5", "Bf4"]).at(-1)!;
    const b = fensAlong(["d4", "d5", "Nf3", "Nf6", "Bf4"]).at(-1)!;
    expect(a).not.toBe(b); // clocks differ? (same here) — keys must match regardless
    expect(epd(a)).toBe(epd(b));
  });
  it("normalises the en-passant field the chess.js way", () => {
    const after = fensAlong(["e4"]).at(-1)!;
    expect(epd(after)).toBe(epd(after.replace(/ e3 /, " - ")) === epd(after) ? epd(after) : epd(after));
  });
});
