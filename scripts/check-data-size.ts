// Guards what a phone actually downloads: each opening's data is fetched on its
// own (lazily, then cached by the service worker), so the per-opening cap is the
// one that matters; the total cap covers a full offline install.

import { readdirSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const PER_OPENING_KB = 320;
const TOTAL_KB = 4096;

const kb = (bytes: number) => bytes / 1024;
const rows: { name: string; raw: number; gz: number }[] = [];

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else rows.push({ name: p.replace("public/data/", ""), raw: st.size, gz: gzipSync(readFileSync(p)).length });
  }
}
walk("public/data");

const total = rows.reduce((s, r) => s + r.raw, 0);
const totalGz = rows.reduce((s, r) => s + r.gz, 0);
const over = rows.filter((r) => kb(r.raw) > PER_OPENING_KB);

for (const r of [...rows].sort((a, b) => b.raw - a.raw).slice(0, 6)) {
  console.log(`  ${r.name.padEnd(32)} ${kb(r.raw).toFixed(0).padStart(5)} KB  (${kb(r.gz).toFixed(0)} KB gzipped)`);
}
console.log(`public/data total = ${kb(total).toFixed(0)} KB raw, ${kb(totalGz).toFixed(0)} KB gzipped (caps: ${PER_OPENING_KB} KB per file, ${TOTAL_KB} KB total)`);

if (over.length) {
  console.error(`Too large: ${over.map((r) => r.name).join(", ")} — lower --maxNodes or --topK in the bake.`);
  process.exit(1);
}
if (kb(total) > TOTAL_KB) {
  console.error("Total data budget exceeded — drop an opening from the bake or lower --maxNodes.");
  process.exit(1);
}
