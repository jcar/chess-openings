"use client";

// The top row: who you're playing, what she's doing, and the two controls you
// actually reach for — mute and settings.

import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon } from "@/components/icons";
import { useSpeechSupported } from "@/lib/audio/useSpeechSupported";
import { companionStore, useCompanionPrefs } from "@/lib/companion/prefs";
import type { PlanStatus } from "@/lib/setup/plan";
import { CaissaAvatar, type CaissaStatus } from "./CaissaAvatar";
import { CompanionSettings } from "./CompanionSettings";

export function CaissaHeader({
  title,
  subtitle,
  status,
  backHref,
  backLabel,
  plan,
  onPlanTap,
}: {
  title: string;
  subtitle: string;
  status: CaissaStatus;
  backHref: string;
  backLabel: string;
  /** Always-visible answer to "am I still playing this opening right?" */
  plan?: PlanStatus;
  /** Opens the goals behind the counter. Without it the chip is just a number. */
  onPlanTap?: () => void;
}) {
  const { voice } = useCompanionPrefs();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const canSpeak = useSpeechSupported();

  return (
    <>
      <header className="flex items-center gap-2 px-2 pt-2 pb-1">
        <Link href={backHref} aria-label={backLabel} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <CaissaAvatar status={status} />
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-base font-bold leading-tight">{title}</h1>
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-ink-soft">
            {plan && (
              <button
                type="button"
                onClick={onPlanTap}
                disabled={!onPlanTap}
                aria-label={`${plan.label}, ${plan.met} of ${plan.total} setup goals. Show the setup.`}
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-bold ${
                  plan.state === "off_plan" ? "border-clay/50 bg-clay/15 text-clay" : "border-sage/40 bg-sage/10 text-sage"
                }`}
              >
                {plan.label}
                {plan.total ? ` ${plan.met}/${plan.total}` : ""}
              </button>
            )}
            <span className="truncate">{subtitle}</span>
          </div>
        </div>
        {canSpeak && (
          <button
            type="button"
            onClick={() => companionStore.update((s) => ({ ...s, voice: !s.voice }))}
            aria-label={voice ? "Mute Caissa" : "Unmute Caissa"}
            aria-pressed={!voice}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg ${voice ? "text-primary-strong" : "text-ink-soft"}`}
          >
            {voice ? "🔊" : "🔇"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label="Caissa settings"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg text-ink-soft"
        >
          ⋯
        </button>
      </header>
      {plan?.detail && (
        <p className="shrink-0 px-3 pb-1 text-[11px] leading-snug text-clay">{plan.detail}</p>
      )}
      {settingsOpen && <CompanionSettings onClose={() => setSettingsOpen(false)} />}
    </>
  );
}
