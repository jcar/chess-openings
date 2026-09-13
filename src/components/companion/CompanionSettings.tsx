"use client";

// How much Caissa talks, and how fast the opponent answers. Two separate
// questions: pace decides when they reply, chattiness decides how much she says.
// Merging them would make Quiet also mean fast, which defeats Step.

import { CHATTINESS_HELP, CHATTINESS_LABEL, companionStore, useCompanionPrefs, type Chattiness } from "@/lib/companion/prefs";
import { PACE_HELP, PACE_LABEL, prefsStore, usePrefs, type Pace } from "@/lib/prefs/pace";
import { speechSupported } from "@/lib/audio/speech";

const CHATTINESS: Chattiness[] = ["quiet", "normal", "chatty"];
const PACES: Pace[] = ["fast", "normal", "step"];

export function CompanionSettings({ onClose }: { onClose: () => void }) {
  const { chattiness, voice } = useCompanionPrefs();
  const { pace } = usePrefs();

  return (
    <div className="fixed inset-0 z-40 flex items-end" role="dialog" aria-label="Caissa settings">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative w-full rounded-t-3xl border-t border-line bg-bg p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />

        <Group label="How much Caissa says" help={CHATTINESS_HELP[chattiness]}>
          {CHATTINESS.map((c) => (
            <Choice key={c} on={c === chattiness} label={CHATTINESS_LABEL[c]} onClick={() => companionStore.update((s) => ({ ...s, chattiness: c }))} />
          ))}
        </Group>

        <Group label="When your opponent replies" help={PACE_HELP[pace]}>
          {PACES.map((p) => (
            <Choice key={p} on={p === pace} label={PACE_LABEL[p]} onClick={() => prefsStore.update((s) => ({ ...s, pace: p }))} />
          ))}
        </Group>

        {speechSupported() && (
          <label className="mt-4 flex min-h-[52px] items-center justify-between rounded-2xl border border-line px-4">
            <span className="text-[15px] font-semibold">Caissa speaks out loud</span>
            <input
              type="checkbox"
              checked={voice}
              onChange={(e) => companionStore.update((s) => ({ ...s, voice: e.target.checked }))}
              className="h-6 w-6 accent-[var(--primary)]"
            />
          </label>
        )}

        <button type="button" onClick={onClose} className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-primary font-bold text-white">
          Done
        </button>
      </div>
    </div>
  );
}

function Group({ label, help, children }: { label: string; help: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-soft">{label}</div>
      <div className="mt-1.5 flex gap-2">{children}</div>
      <p className="mt-1.5 text-xs text-ink-soft">{help}</p>
    </div>
  );
}

function Choice({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`min-h-[44px] flex-1 rounded-xl border px-3 text-sm font-semibold ${on ? "border-primary bg-primary/15 text-primary-strong" : "border-line text-ink-soft"}`}
    >
      {label}
    </button>
  );
}
