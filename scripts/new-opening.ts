// Scaffold a hand-authored OpeningSpec. Run: npm run new-opening -- <id> "<Name>" [white|black]
// Creates src/content/specs/<id>.ts with TODO markers and registers it in specs/index.ts.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const [id, name, sideArg] = process.argv.slice(2);
if (!id || !name) {
  console.error('usage: npm run new-opening -- <id> "<Name>" [white|black]');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(id)) {
  console.error("id must be kebab-case");
  process.exit(1);
}
const side = sideArg === "black" ? "black" : "white";
const path = `src/content/specs/${id}.ts`;
if (existsSync(path)) {
  console.error(`${path} already exists`);
  process.exit(1);
}
const ident = id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

writeFileSync(
  path,
  `// ${name} — hand-authored OpeningSpec (${side}).
// Positions are described as move lists via pos(); the build fails on an illegal one.
// Run \`npm run bake:explorer -- --only ${id}\` then \`npm run sheet -- ${id}\` for the worklist.

import type { OpeningSpec } from "../spec";
import { pos, sans, fenAfter } from "../authoring";

const P = pos;

export const ${ident}: OpeningSpec = {
  id: "${id}",
  name: "${name}",
  eco: "TODO",
  side: "${side}",
  family: "1e4-e5", // TODO: "1e4-e5" | "1e4-other" | "1d4" | "flank"
  firstMoves: "1.e4", // TODO defining moves, e.g. "1.e4 e5 2.Nf3 Nc6 3.Bc4"
  tabiyaFen: fenAfter("e4"), // TODO
  pitch: "TODO two sentences: why play this at your level.",
  setup: {
    pieces: [], // TODO e.g. { piece: "B", squares: ["c4"], why: "…" }
    pawns: [],
    order: [],
    castle: "O-O",
  },
  ideas: [], // TODO 5–8 IdeaCards
  annotations: {
    [P("")]: { yourMove: { san: "e4", why: "TODO" } },
  },
  traps: [],
  modelGames: [{ label: "Main line", sans: sans("e4"), summary: "TODO" }],
  middlegamePlan: "TODO",
};
`,
);

const indexPath = "src/content/specs/index.ts";
let index = readFileSync(indexPath, "utf8");
index = index.replace(/(import type \{ OpeningSpec \} from "\.\.\/spec";\n)/, `$1import { ${ident} } from "./${id}";\n`);
index = index.replace(/export const SPECS: OpeningSpec\[\] = \[([^\]]*)\];/, (_, list) => `export const SPECS: OpeningSpec[] = [${list.trim() ? list.trim().replace(/,\s*$/, "") + ", " : ""}${ident}];`);
writeFileSync(indexPath, index);
console.log(`created ${path} and registered ${ident}. Add "${id}" to CORE_OPENING_IDS if it's a featured opening.`);
