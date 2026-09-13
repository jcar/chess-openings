// Caissa's voice, using the browser's built-in Web Speech API — no network, no
// assets, works offline. Browser-only: every function no-ops on the server and
// wherever speech isn't supported.
//
// Ported from ChessHall's kid-mode narrator, stripped of its clip/character
// layer. The three subtleties below are the ones that bite in the wild; they are
// why this is a port rather than a rewrite.

/** Caissa: level pitch, a touch quicker than default. Warm, dry, unhurried. */
const PITCH = 0.95;
const RATE = 1.03;

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  return window.speechSynthesis ?? null;
}

export function speechSupported(): boolean {
  return synth() !== null && typeof window !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
}

/** True while something is being spoken or is queued. */
export function isSpeaking(): boolean {
  const s = synth();
  return !!s && (s.speaking || s.pending);
}

/** Prefer a local English voice; fall back to any English, then anything. */
function chooseVoice(s: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = s.getVoices();
  if (!voices.length) return null;
  return voices.find((v) => /^en[-_]/i.test(v.lang) && v.localService) ?? voices.find((v) => /^en[-_]/i.test(v.lang)) ?? voices[0];
}

export interface SpeakOptions {
  /** Cut off whatever is being said. Urgent lines only. */
  interrupt?: boolean;
}

/**
 * Say something. Best-effort and synchronous: it must stay inside the user
 * gesture for iOS, and it must never throw into the UI or block the game loop.
 * Returns true if the utterance was handed to the browser.
 */
export function speak(text: string, opts: SpeakOptions = {}): boolean {
  const s = synth();
  if (!s || !text.trim() || !speechSupported()) return false;
  try {
    // Chrome DROPS a speak() issued immediately after cancel(), so only cancel
    // when something is actually playing or queued. The common case — a new line
    // after the last one finished — needs no cancel and plays cleanly.
    if (opts.interrupt && (s.speaking || s.pending)) s.cancel();

    const Utterance = window.SpeechSynthesisUtterance;
    const u = new Utterance(text);
    const voice = chooseVoice(s);
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-US";
    u.rate = RATE;
    u.pitch = PITCH;
    u.volume = 1;
    s.speak(u);
    // Nudge Chrome out of its occasional post-cancel "stalled" state.
    s.resume();
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
  try {
    synth()?.cancel();
  } catch {
    /* best-effort */
  }
}

// Browsers block programmatic speech until the user has interacted. Calling this
// once from inside the first real gesture blesses the pipeline for the session,
// so Caissa can speak later without a tap of her own.
let primed = false;

export function primeAudio(): void {
  if (primed || typeof window === "undefined") return;
  primed = true;
  try {
    const s = synth();
    if (!s || typeof window.SpeechSynthesisUtterance === "undefined") return;
    // An empty utterance is silent but satisfies the autoplay gate.
    const Utterance = window.SpeechSynthesisUtterance;
    s.speak(new Utterance(""));
    s.resume();
  } catch {
    /* best-effort */
  }
}

/** Test seam: forget that priming happened. */
export function resetPrimedForTests(): void {
  primed = false;
}
