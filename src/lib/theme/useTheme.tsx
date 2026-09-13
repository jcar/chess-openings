"use client";

// Light/dark theme, persisted in localStorage and applied via a `data-theme`
// attribute on <html> (the CSS vars in globals.css flip on it). Dark is the
// default; an inline script in layout.tsx applies the saved theme before paint
// to avoid a flash. Provider-less singleton via useSyncExternalStore, SSR-safe
// (server snapshot is always "dark", matching the default :root).

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "openinglab:theme";
export type Theme = "dark" | "light";

class ThemeStore {
  private cache: Theme | null = null;
  private listeners = new Set<() => void>();

  private load(): Theme {
    if (typeof window === "undefined") return "dark";
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  }

  private apply(theme: Theme): void {
    if (typeof document === "undefined") return;
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): Theme => {
    if (this.cache === null) this.cache = this.load();
    return this.cache;
  };

  getServerSnapshot = (): Theme => "dark";

  set = (theme: Theme): void => {
    this.cache = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
    this.apply(theme);
    this.listeners.forEach((l) => l());
  };

  toggle = (): void => this.set(this.getSnapshot() === "dark" ? "light" : "dark");
}

export const themeStore = new ThemeStore();

export function useTheme(): { theme: Theme; toggle: () => void; set: (t: Theme) => void } {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );
  return { theme, toggle: themeStore.toggle, set: themeStore.set };
}
