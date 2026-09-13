import { defineConfig, devices } from "@playwright/test";

// Playwright acceptance tests. Runs against the *static export* served on :4321 — this both sidesteps Next's one-dev-server-per-project
// lock (so tests don't fight a running `npm run dev`) and exercises the real
// shipped artifact, identically in CI. basePath must be empty for this build
// (the default locally) so routes live at the root. e2e tests behavior/
// navigation; chess-content correctness is covered separately by `npm run validate`.
const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["html", { open: "never" }], ["list"]]
    : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    // iPhone first: the primary device for this app.
    { name: "iphone", use: { ...devices["iPhone 14"], browserName: "chromium" } },
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Build the static export, then serve it. reuseExistingServer lets a server
    // left running from a prior local run be reused (skips the rebuild).
    command: `npm run build && npx serve out -l ${PORT} --no-port-switching --no-clipboard`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000, // CI cold build + serve
  },
});
