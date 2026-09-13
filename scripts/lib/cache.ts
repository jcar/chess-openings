// On-disk JSON cache for bake scripts: scripts/.cache/<namespace>/<sha1(key)>.json
// Makes multi-hour bakes resumable and lets shared positions fetch once.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "scripts/.cache";

function pathFor(ns: string, key: string): string {
  const h = createHash("sha1").update(key).digest("hex");
  return join(ROOT, ns, `${h}.json`);
}

export function cacheGet<T>(ns: string, key: string): T | undefined {
  const p = pathFor(ns, key);
  if (!existsSync(p)) return undefined;
  try {
    return JSON.parse(readFileSync(p, "utf8")) as T;
  } catch {
    return undefined;
  }
}

export function cacheSet<T>(ns: string, key: string, value: T): void {
  const p = pathFor(ns, key);
  mkdirSync(join(ROOT, ns), { recursive: true });
  writeFileSync(p, JSON.stringify(value), "utf8");
}

export async function cached<T>(ns: string, key: string, compute: () => Promise<T>): Promise<{ value: T; hit: boolean }> {
  const hit = cacheGet<T>(ns, key);
  if (hit !== undefined) return { value: hit, hit: true };
  const value = await compute();
  cacheSet(ns, key, value);
  return { value, hit: false };
}
