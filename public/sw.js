/* OpeningLab service worker: cache-first for immutable assets (Next chunks, the
 * Stockfish worker + WASM, baked data), network-first for pages so a republish
 * shows up, with the cache as the offline fallback. */
const VERSION = "openinglab-v1";
const IMMUTABLE = /\/(_next\/static|stockfish|data)\//;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (IMMUTABLE.test(url.pathname)) {
    event.respondWith(
      caches.open(VERSION).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      }),
    );
    return;
  }

  // Pages and everything else: network first, cache fallback.
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      try {
        const res = await fetch(req);
        if (res.ok && (req.mode === "navigate" || url.pathname.endsWith(".webmanifest") || url.pathname.endsWith(".svg"))) cache.put(req, res.clone());
        return res;
      } catch {
        const hit = await cache.match(req);
        if (hit) return hit;
        if (req.mode === "navigate") {
          const home = await cache.match(new URL("./", self.registration.scope).toString());
          if (home) return home;
        }
        throw new Error("offline");
      }
    }),
  );
});
