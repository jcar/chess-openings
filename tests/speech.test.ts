import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isSpeaking, primeAudio, resetPrimedForTests, speak, speechSupported, stopSpeaking } from "@/lib/audio/speech";

/** A stand-in for the browser's speech engine, recording what it was asked to do. */
function stubSynth(opts: { speaking?: boolean; pending?: boolean; voices?: Partial<SpeechSynthesisVoice>[] } = {}) {
  const calls: string[] = [];
  const spoken: string[] = [];
  const synth = {
    speaking: opts.speaking ?? false,
    pending: opts.pending ?? false,
    getVoices: () => (opts.voices ?? [{ lang: "en-US", localService: true, name: "Local EN" }]) as SpeechSynthesisVoice[],
    cancel: () => calls.push("cancel"),
    resume: () => calls.push("resume"),
    speak: (u: SpeechSynthesisUtterance) => {
      calls.push("speak");
      spoken.push(u.text);
    },
  };
  class Utterance {
    text: string;
    lang = "";
    rate = 1;
    pitch = 1;
    volume = 1;
    voice: SpeechSynthesisVoice | null = null;
    constructor(text: string) {
      this.text = text;
    }
  }
  vi.stubGlobal("window", { speechSynthesis: synth, SpeechSynthesisUtterance: Utterance });
  return { calls, spoken, synth };
}

beforeEach(() => resetPrimedForTests());
afterEach(() => vi.unstubAllGlobals());

describe("speak", () => {
  it("does not cancel when nothing is playing (Chrome drops a speak() right after cancel)", () => {
    const { calls, spoken } = stubSynth({ speaking: false, pending: false });
    expect(speak("That knight's hanging.", { interrupt: true })).toBe(true);
    expect(calls).toEqual(["speak", "resume"]);
    expect(spoken).toEqual(["That knight's hanging."]);
  });

  it("cancels first when interrupting something already playing", () => {
    const { calls } = stubSynth({ speaking: true });
    speak("Mate in one.", { interrupt: true });
    expect(calls).toEqual(["cancel", "speak", "resume"]);
  });

  it("does not cancel a line in flight unless asked to interrupt", () => {
    const { calls } = stubSynth({ speaking: true });
    speak("Nothing urgent.", { interrupt: false });
    expect(calls).toEqual(["speak", "resume"]);
  });

  it("ignores empty text", () => {
    const { calls } = stubSynth();
    expect(speak("   ")).toBe(false);
    expect(calls).toEqual([]);
  });

  it("never throws when the engine misbehaves", () => {
    stubSynth();
    (window.speechSynthesis as unknown as { speak: () => void }).speak = () => {
      throw new Error("engine exploded");
    };
    expect(() => speak("anything")).not.toThrow();
    expect(speak("anything")).toBe(false);
  });

  it("no-ops with no speech support at all", () => {
    vi.stubGlobal("window", {});
    expect(speechSupported()).toBe(false);
    expect(speak("hello")).toBe(false);
    expect(isSpeaking()).toBe(false);
    expect(() => stopSpeaking()).not.toThrow();
  });
});

describe("voice choice", () => {
  it("prefers a local English voice", () => {
    stubSynth({
      voices: [
        { lang: "fr-FR", localService: true, name: "FR" },
        { lang: "en-GB", localService: false, name: "Remote EN" },
        { lang: "en-US", localService: true, name: "Local EN" },
      ],
    });
    let chosen: SpeechSynthesisVoice | null = null;
    (window.speechSynthesis as unknown as { speak: (u: SpeechSynthesisUtterance) => void }).speak = (u) => {
      chosen = u.voice;
    };
    speak("test");
    expect(chosen).not.toBeNull();
    expect(chosen!.name).toBe("Local EN");
  });

  it("falls back to a remote English voice, then to anything", () => {
    stubSynth({ voices: [{ lang: "fr-FR", localService: true, name: "FR" }, { lang: "en-GB", localService: false, name: "Remote EN" }] });
    let chosen: SpeechSynthesisVoice | null = null;
    (window.speechSynthesis as unknown as { speak: (u: SpeechSynthesisUtterance) => void }).speak = (u) => {
      chosen = u.voice;
    };
    speak("test");
    expect(chosen!.name).toBe("Remote EN");
  });
});

describe("priming", () => {
  it("speaks one silent utterance, once, then never again", () => {
    const { calls } = stubSynth();
    primeAudio();
    primeAudio();
    primeAudio();
    expect(calls).toEqual(["speak", "resume"]);
  });
});

describe("isSpeaking", () => {
  it("reports queued work as speaking", () => {
    stubSynth({ speaking: false, pending: true });
    expect(isSpeaking()).toBe(true);
  });
});
