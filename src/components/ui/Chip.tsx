type Tone = "sage" | "primary" | "amber" | "clay" | "kid" | "neutral";

const TONE: Record<Tone, string> = {
  sage: "border-sage/35 bg-sage/12 text-sage",
  primary: "border-primary/35 bg-primary/12 text-primary-strong",
  amber: "border-amber/35 bg-amber/12 text-amber",
  clay: "border-clay/35 bg-clay/12 text-clay",
  kid: "border-kid-teal/35 bg-kid-teal/12 text-kid-teal",
  neutral: "border-line bg-ink/5 text-ink-soft",
};

// An engraved tournament tag: bordered, tinted, uppercase, letter-spaced, with a
// faint top sheen so it reads as inlaid rather than a flat pill.
export function Chip({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
