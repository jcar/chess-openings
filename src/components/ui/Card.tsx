import type { HTMLAttributes } from "react";

// A placard: a carved panel with a faint top sheen and an inner edge highlight,
// so cards read as objects in a room rather than flat divs. `interactive` adds a
// lift + gold edge on hover/press for tappable cards / links.
export function Card({
  interactive = false,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={`placard-sheen rounded-2xl border border-line bg-card shadow-soft ring-1 ring-inset ring-white/[0.04] ${
        interactive
          ? "transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift active:translate-y-0 active:shadow-soft"
          : ""
      } ${className}`}
      {...props}
    />
  );
}
