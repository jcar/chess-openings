// Numbers as a reader would say them out loud.

/** 1,545,089 -> "1.5M". Big counts are read for scale, not audited, and the
 *  exact figure wrapped onto two lines on a phone. */
export function compactCount(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0";
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${m >= 10 ? Math.round(m) : Math.round(m * 10) / 10}M`;
  }
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  return n.toLocaleString();
}
