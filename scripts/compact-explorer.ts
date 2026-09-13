// Rewrites any v1 explorer tree (per-move w/d/b) into the v2 compact schema
// ([uci, games, whiteScorePct]), which roughly halves what a phone downloads.
// Idempotent: v2 files are left alone.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import type { ExplorerTree } from "../src/lib/book/explorer";

const DIR = "public/data/explorer";
const pct = (w: number, d: number, b: number) => {
  const n = w + d + b;
  return n ? Math.round(((w + d / 2) / n) * 100) : 50;
};

let changed = 0;
for (const name of readdirSync(DIR)) {
  if (!name.endsWith(".json") || name === "index.json") continue;
  const path = `${DIR}/${name}`;
  const before = statSync(path).size;
  const tree = JSON.parse(readFileSync(path, "utf8")) as ExplorerTree;
  let touched = false;
  for (const node of Object.values(tree.nodes)) {
    if (node.w !== undefined) {
      node.s = pct(node.w, node.d ?? 0, node.b ?? 0);
      delete node.w;
      delete node.d;
      delete node.b;
      touched = true;
    }
    node.m = node.m.map((m) => (m.length === 5 ? [m[0], m[1], pct(m[2], m[3], m[4])] : m));
    if (node.m.some((m) => m.length === 3)) touched = touched || true;
  }
  if (!touched) continue;
  writeFileSync(path, JSON.stringify(tree));
  const after = statSync(path).size;
  changed++;
  console.log(`${name}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
}
console.log(changed ? `compacted ${changed} file(s).` : "nothing to compact.");
