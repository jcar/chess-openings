// The featured openings for 0–1200 players. Order = display order on the home
// screen. Everything else in the catalog comes from the legacy adapter.
export const CORE_OPENING_IDS = [
  "italian-game",
  "london-system",
  "queens-gambit",
  "vienna-game",
  "caro-kann",
  "scandinavian",
  "french-defence",
  "open-games-black",
  "slav-defence",
  "kings-indian",
] as const;

export type CoreOpeningId = (typeof CORE_OPENING_IDS)[number];

export function isCore(id: string): boolean {
  return (CORE_OPENING_IDS as readonly string[]).includes(id);
}
