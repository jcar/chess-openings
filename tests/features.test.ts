import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { describeMove, extractFeatures, tagMove, type PlyRecord } from "@/lib/coach/features";
import { topNegativeTag } from "@/lib/coach/tags";

/** Play `line`, then tag the LAST move. */
function tagLast(line: string): { tags: string[]; top: string | null } {
  const sans = line.trim().split(/\s+/);
  const g = new Chess();
  const history: PlyRecord[] = [];
  for (let i = 0; i < sans.length - 1; i++) {
    const m = g.move(sans[i]);
    history.push({ san: m.san, uci: m.from + m.to + (m.promotion ?? ""), color: m.color === "w" ? "white" : "black" });
  }
  const before = g.fen();
  const m = g.move(sans[sans.length - 1]);
  const info = describeMove(before, m.from + m.to + (m.promotion ?? ""))!;
  const tags = tagMove(before, g.fen(), info, history);
  return { tags, top: topNegativeTag(tags) };
}

describe("extractFeatures", () => {
  it("counts development, centre and castling", () => {
    const g = new Chess();
    for (const s of ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "O-O"]) g.move(s);
    const hist: PlyRecord[] = [{ san: "O-O", uci: "e1g1", color: "white" }];
    const f = extractFeatures(g.fen(), hist);
    expect(f.white.developedMinors).toBe(2);
    expect(f.white.minorsHome).toEqual(["b1", "c1"]);
    expect(f.white.castled).toBe(true);
    expect(f.white.kingSquare).toBe("g1");
    expect(f.white.kingShieldPawns).toBe(3);
    expect(f.white.centrePawns).toBe(1);
    expect(f.black.castled).toBe(false);
  });
  it("detects a hanging knight (and not a defended one)", () => {
    // 3...Nd4 is DEFENDED by the e5-pawn: not hanging.
    const g = new Chess();
    for (const s of ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nd4"]) g.move(s);
    expect(extractFeatures(g.fen(), []).black.hanging.map((h) => h.square)).not.toContain("d4");
    // 4...Nxe4 with nothing defending e4: hanging to Nc3.
    const h = new Chess();
    for (const s of ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Nc3", "Nxe4"]) h.move(s);
    expect(extractFeatures(h.fen(), []).black.hanging.map((x) => x.square)).toContain("e4");
  });
});

describe("tagMove", () => {
  it("hangs_piece: a knight captured onto an attacked, undefended square", () => {
    const r = tagLast("e4 e5 Nf3 Nc6 Bc4 Nf6 Nc3 Nxe4");
    expect(r.tags).toContain("hangs_piece");
    expect(r.top).toBe("hangs_piece");
  });
  it("early_queen: Qh5 on move 2", () => {
    const r = tagLast("e4 e5 Qh5");
    expect(r.tags).toContain("early_queen");
  });
  it("loses_tempo_same_piece: moving the same knight twice with no purpose", () => {
    // 1.Nf3 d5 2.Ng1 — retreat for nothing.
    const r = tagLast("Nf3 d5 Ng1");
    expect(r.tags).toContain("loses_tempo_same_piece");
  });
  it("delays_development: an a-pawn push with everything at home", () => {
    const r = tagLast("e4 e5 a3");
    expect(r.tags).toContain("delays_development");
  });
  it("weakens_king_shield: pushing a pawn in front of the castled king", () => {
    const r = tagLast("e4 e5 Nf3 Nc6 Bc4 Bc5 O-O Nf6 g4");
    expect(r.tags).toContain("weakens_king_shield");
  });
  it("develops / castles / claims_centre are positive", () => {
    expect(tagLast("e4").tags).toContain("claims_centre");
    expect(tagLast("e4 e5 Nf3").tags).toContain("develops");
    expect(tagLast("e4 e5 Nf3 Nc6 Bc4 Bc5 O-O").tags).toContain("castles");
    expect(tagLast("e4 e5 Nf3 Nc6 Bc4 Bc5 O-O").top).toBeNull();
  });
  it("wins_material: capturing a free pawn", () => {
    // 1.e4 e5 2.Nf3 Bc5?? 3.Nxe5 — free pawn, knight safe on e5.
    const r = tagLast("e4 e5 Nf3 Bc5 Nxe5");
    expect(r.tags).toContain("wins_material");
    expect(r.top).toBeNull();
  });
  it("leaves_piece_hanging: ignoring an attacked bishop", () => {
    // 1.e4 e5 2.Bc4 Nf6 3.Nf3 Nxe4 4.d3?? — knight on e4 attacked by d3 pawn... we want Black to leave it. 4...Nf6 rescues.
    // Simpler: 1.e4 d5 2.Bb5+ c6 3.a3 — the bishop on b5 is attacked by the c6 pawn and White ignores it.
    const r = tagLast("e4 d5 Bb5+ c6 a3");
    expect(r.tags).toContain("leaves_piece_hanging");
  });
  it("delays_castling fires around move 8 when castling is still possible", () => {
    const r = tagLast("e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 h3 h6 a3 a6 b4");
    expect(r.tags).toContain("delays_castling");
  });
});
