// The catalog. Hand-authored specs win; every other synced ChessHall opening is
// adapted so it stays playable. Order: core openings first (in CORE order),
// then the rest grouped by family.

import type { OpeningSpec } from "./spec";
import { LEGACY_OPENINGS } from "./legacy";
import { adaptLegacy } from "@/lib/content/adaptLegacy";
import { CORE_OPENING_IDS, isCore } from "./core";
import { SPECS } from "./specs";

const byId = new Map<string, OpeningSpec>();
for (const legacy of LEGACY_OPENINGS) byId.set(legacy.id, adaptLegacy(legacy));
for (const spec of SPECS) byId.set(spec.id, spec); // hand-authored replaces adapted

const coreOrder = new Map<string, number>(CORE_OPENING_IDS.map((id, i) => [id, i]));
const familyOrder: Record<OpeningSpec["family"], number> = { "1e4-e5": 0, "1e4-other": 1, "1d4": 2, flank: 3 };

export const OPENINGS: OpeningSpec[] = [...byId.values()].sort((a, b) => {
  const ca = coreOrder.get(a.id), cb = coreOrder.get(b.id);
  if (ca !== undefined || cb !== undefined) return (ca ?? 99) - (cb ?? 99);
  return familyOrder[a.family] - familyOrder[b.family] || a.name.localeCompare(b.name);
});

export function getOpening(id: string): OpeningSpec | undefined {
  return byId.get(id);
}

export function coreOpenings(): OpeningSpec[] {
  return OPENINGS.filter((o) => isCore(o.id));
}

export function otherOpenings(): OpeningSpec[] {
  return OPENINGS.filter((o) => !isCore(o.id));
}

export type { OpeningSpec } from "./spec";
