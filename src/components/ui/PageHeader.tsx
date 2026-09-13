import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

// A consistent page header: optional back link, optional small eyebrow label,
// a serif title, and an optional subtitle / right-aligned slot.
export function PageHeader({
  title,
  subtitle,
  eyebrow,
  backHref,
  backLabel = "Back",
  right,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="space-y-2">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {backLabel}
        </Link>
      )}
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-1">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl font-semibold tracking-tight text-primary-strong">
            {title}
          </h1>
          {subtitle && <p className="text-ink-soft">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}
