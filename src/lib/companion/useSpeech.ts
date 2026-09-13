"use client";

// Says the newest line out loud, when it earns it.
//
// Policy, in one place: urgent lines interrupt; ordinary lines are DROPPED rather
// than queued if she's mid-sentence, because coaching that arrives two moves late
// is worse than silence. A short trailing delay coalesces a burst so fast play
// doesn't stutter. Nothing here is awaited by the game loop.

import { useEffect, useRef } from "react";
import { isSpeaking, speak, stopSpeaking } from "@/lib/audio/speech";
import type { CompanionLine } from "./types";

/** Long enough to let a burst settle, short enough to feel immediate. */
export const COALESCE_MS = 200;

/** Which lines are eligible to be spoken at all. Pure — unit tested. */
export function shouldSpeak(line: CompanionLine | undefined, opts: { voice: boolean }): boolean {
  if (!line || !opts.voice) return false;
  if (line.speaker !== "caissa") return false; // move records are the transcript
  if (!line.speak) return false; // too long to be bearable aloud
  return line.priority <= 1; // colour is shown, never spoken
}

export function useSpeech(lines: CompanionLine[], opts: { voice: boolean }): void {
  const lastSpokenId = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voice = opts.voice;

  useEffect(() => {
    const line = lines[lines.length - 1];
    if (!shouldSpeak(line, { voice })) return;
    if (lastSpokenId.current === line.id) return;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // Re-check against the newest line: if another landed while we waited, this
      // one is already stale and never gets said.
      if (lastSpokenId.current === line.id) return;
      const urgent = line.priority === 0;
      if (!urgent && isSpeaking()) {
        lastSpokenId.current = line.id; // dropped on purpose, not retried
        return;
      }
      lastSpokenId.current = line.id;
      speak(line.text, { interrupt: urgent });
    }, COALESCE_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [lines, voice]);

  // Muting stops her mid-sentence rather than letting the line finish.
  useEffect(() => {
    if (!voice) stopSpeaking();
  }, [voice]);

  // Don't let her follow you to another screen.
  useEffect(() => () => stopSpeaking(), []);
}
