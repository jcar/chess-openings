// Minimal shared content primitives. ChessHall's `@/content/types` is a large
// Module/Lesson/Activity model; this app only needs the board orientation type,
// which the copied board components import from this path.
export type Orientation = "white" | "black";
