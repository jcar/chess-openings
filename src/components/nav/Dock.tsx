"use client";

// Bottom dock: the thumb-zone navigation on a phone. Hidden on the train screen,
// which has its own action bar.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OpeningDrillIcon, InfoIcon, ChevronRightIcon } from "@/components/icons";

function HomeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1.2" />
      <rect x="13" y="3" width="8" height="8" rx="1.2" opacity=".45" />
      <rect x="3" y="13" width="8" height="8" rx="1.2" opacity=".45" />
      <rect x="13" y="13" width="8" height="8" rx="1.2" />
    </svg>
  );
}

const NAV = [
  { href: "/", label: "Spar", Icon: HomeGlyph, exact: true },
  { href: "/openings", label: "Openings", Icon: OpeningDrillIcon, exact: false },
  { href: "/summary", label: "Summary", Icon: ChevronRightIcon, exact: false },
  { href: "/about", label: "About", Icon: InfoIcon, exact: false },
];

export function Dock() {
  const pathname = usePathname() || "/";
  if (pathname.startsWith("/train") || pathname.startsWith("/principles")) return null;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-[var(--rail)] pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg items-stretch justify-around">
        {NAV.map(({ href, label, Icon, exact }) => {
          const on = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[56px] min-w-[72px] flex-col items-center justify-center gap-1 text-[11px] font-semibold ${on ? "text-primary-strong" : "text-ink-soft"}`}
            >
              <Icon className="h-6 w-6" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
