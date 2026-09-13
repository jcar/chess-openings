"use client";

// Renders nothing. Listens for the first real gesture anywhere in the app and
// primes speech with it, so Caissa can talk on the train screen without the user
// having to tap something of hers first. iOS requires this; other browsers don't
// mind it.

import { useEffect } from "react";
import { primeAudio, speechSupported } from "@/lib/audio/speech";

export function AudioPrimer() {
  useEffect(() => {
    if (!speechSupported()) return;
    const prime = () => primeAudio();
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("keydown", prime, { once: true });
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, []);
  return null;
}
