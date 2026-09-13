"use client";

// Whether this browser can speak, answered in a way that survives hydration.
//
// `speechSupported()` reads `window`, so calling it during render gives one
// answer on the server and another in the browser. React then throws the whole
// tree away and rebuilds it — visible as a flicker, and it was costing us a
// hydration error on every page with the companion header. Same rule as reading
// localStorage during render: the server snapshot has to be the honest "don't
// know yet" answer, and the real one arrives after hydration.

import { useSyncExternalStore } from "react";
import { speechSupported } from "./speech";

/** The capability never changes for the life of the page, so there's nothing to
 *  subscribe to — but useSyncExternalStore is still the right tool, because it
 *  is what gives us a separate server snapshot. */
const subscribe = () => () => {};
const getSnapshot = () => speechSupported();
const getServerSnapshot = () => false;

export function useSpeechSupported(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
