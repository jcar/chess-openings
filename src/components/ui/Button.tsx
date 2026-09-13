// Button styles for the design system. `buttonClasses` is exported so Next
// <Link> elements can share the exact same look as real <button>s.

import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg" | "kid";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-[filter,transform,background,border-color] duration-150 active:translate-y-px disabled:opacity-40 disabled:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const VARIANT: Record<ButtonVariant, string> = {
  // The move: a beveled sapphire CTA with a lit top edge and a cast shadow.
  primary:
    "text-on-accent bg-[linear-gradient(180deg,var(--primary-strong),var(--primary))] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_-8px_rgba(79,143,247,0.55),0_2px_0_var(--accent-deep)] hover:brightness-[1.07]",
  // Gold-outlined secondary — quiet but unmistakably the same family.
  accent: "bg-primary/10 text-primary-strong border border-primary/40 hover:bg-primary/18 hover:border-primary/60",
  // Carved panel button.
  secondary: "bg-card text-ink border border-line shadow-soft hover:border-primary/45",
  ghost: "text-ink-soft hover:text-ink",
};

const SIZE: Record<ButtonSize, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
  kid: "rounded-2xl px-7 py-4 text-xl font-bold",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${extra}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
