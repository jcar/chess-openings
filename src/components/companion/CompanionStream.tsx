"use client";

// The conversation. The only scrolling region on the screen, so the board never
// moves. Follows the newest line unless you've scrolled back to read something —
// then it leaves you alone until you return to the bottom.

import { useEffect, useRef } from "react";
import { CompanionLineView } from "./CompanionLineView";
import type { CompanionLine, LineAction } from "@/lib/companion/types";

/** Treat "within this far of the bottom" as following along. */
const STICK_PX = 48;

export function CompanionStream({
  lines,
  onAction,
  activePly,
}: {
  lines: CompanionLine[];
  onAction: (a: LineAction) => void;
  activePly?: number | null;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const following = useRef(true);

  useEffect(() => {
    const el = scroller.current;
    if (!el || !following.current) return;
    // A question that fills the panel would otherwise scroll its own opening
    // words out of sight, leaving a fragment above the answer buttons. Anything
    // you have to read and act on is aligned to the TOP; everything else follows
    // the bottom as usual.
    const newest = lines[lines.length - 1];
    const asksSomething = !!newest?.actions?.some((a) => a.kind !== "jump");
    const last = el.lastElementChild as HTMLElement | null;
    if (asksSomething && last) el.scrollTop = Math.max(0, last.offsetTop - el.offsetTop);
    else el.scrollTop = el.scrollHeight;
  }, [lines]);

  const newest = lines[lines.length - 1];
  const announce = newest && newest.speaker === "caissa" ? newest.text : "";

  return (
    <>
      <div
        ref={scroller}
        data-testid="companion-stream"
        onScroll={(e) => {
          const el = e.currentTarget;
          following.current = el.scrollHeight - el.scrollTop - el.clientHeight < STICK_PX;
        }}
        // Content scrolled above the top edge used to be guillotined, which read
        // as a rendering fault rather than as "there is more above". The mask
        // fades the first few pixels instead.
        className="stream-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 pb-3 pt-2"
      >
        {lines.map((l) => (
          <CompanionLineView key={l.id} line={l} onAction={onAction} active={activePly != null && l.plyIndex === activePly + 1} />
        ))}
      </div>
      {/* Only the newest line is announced — the whole stream as a live region
          would re-read itself on every scroll. */}
      <span className="sr-only" aria-live={newest?.priority === 0 ? "assertive" : "polite"}>
        {announce}
      </span>
    </>
  );
}
