// Re-copy the pieces this app borrows from ChessHall, verbatim, so both apps can
// share fixes. Run: npm run sync [-- --dry]
// Source dir: CHESSHALL_DIR (default: the LaCie external drive path).
//
// Only the manifest below is synced. Files this app OWNS (content/spec.ts,
// lib/chess/stockfish.ts, components/CoachCard.tsx, …) are never touched.

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const SRC = process.env.CHESSHALL_DIR ?? "/media/jcar/LaCie/source/source/chess";
const DRY = process.argv.includes("--dry");

/** [from (relative to ChessHall), to (relative to this repo)] */
const FILES: [string, string][] = [
  ["src/lib/chess/game.ts", "src/lib/chess/game.ts"],
  ["src/lib/basePath.ts", "src/lib/basePath.ts"],
  ["src/components/board/Board.tsx", "src/components/board/Board.tsx"],
  ["src/components/board/MiniBoard.tsx", "src/components/board/MiniBoard.tsx"],
  ["scripts/lib/engine.ts", "scripts/lib/engine.ts"],
  ["public/stockfish/stockfish-18-lite-single.js", "public/stockfish/stockfish-18-lite-single.js"],
  ["public/stockfish/stockfish-18-lite-single.wasm", "public/stockfish/stockfish-18-lite-single.wasm"],
];

/** Whole directories synced file-by-file (opening content + its type file). */
const DIRS: [string, string, (name: string) => boolean][] = [
  ["src/content/openings", "src/content/legacy/openings", (n) => n.endsWith(".ts") && n !== "index.ts"],
];

function same(a: string, b: string): boolean {
  if (!existsSync(b)) return false;
  return readFileSync(a).equals(readFileSync(b));
}

function main() {
  if (!existsSync(SRC)) {
    console.error(`ChessHall source not found at ${SRC}. Is the external drive mounted? (set CHESSHALL_DIR to override)`);
    process.exit(1);
  }
  const pairs: [string, string][] = [...FILES.map(([f, t]) => [join(SRC, f), t] as [string, string])];
  for (const [from, to, keep] of DIRS) {
    for (const name of readdirSync(join(SRC, from))) {
      if (keep(name) && statSync(join(SRC, from, name)).isFile()) pairs.push([join(SRC, from, name), join(to, name)]);
    }
  }
  let changed = 0;
  for (const [from, to] of pairs) {
    if (same(from, to)) continue;
    changed++;
    console.log(`${existsSync(to) ? "update" : "add   "} ${to}`);
    if (!DRY) {
      mkdirSync(dirname(to), { recursive: true });
      copyFileSync(from, to);
    }
  }
  console.log(changed ? `${changed} file(s) ${DRY ? "would change" : "synced"}.` : "Everything already in sync.");
  if (!DRY && changed) {
    console.log("Type-checking…");
    execSync("npx tsc --noEmit -p .", { stdio: "inherit" });
  }
}

main();
