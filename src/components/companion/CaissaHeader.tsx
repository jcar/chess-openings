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
}: {
  title: string;
  subtitle: string;
  status: CaissaStatus;
  backHref: string;
  backLabel: string;
  /** Always-visible answer to "am I still playing this opening right?" */
  plan?: PlanStatus;
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
          <div className="truncate text-xs text-ink-soft">
            {plan && (
              <>
                <span className={plan.state === "off_plan" ? "font-bold text-clay" : "font-bold text-sage"}>
                  {plan.label}
                  {plan.total ? ` ${plan.met}/${plan.total}` : ""}
                </span>
                <span aria-hidden> · </span>
              </>
            )}
            {plan?.detail ? plan.detail : subtitle}
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
      {settingsOpen && <CompanionSettings onClose={() => setSettingsOpen(false)} />}
    </>
  );
}
