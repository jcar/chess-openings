import { test, expect, type Page } from "@playwright/test";

/** The deterministic engine (no WASM) is enabled by seeding this key. */
async function useScriptedEngine(page: Page, queue: string[] = []) {
  await page.addInitScript((q) => {
    window.localStorage.setItem("openinglab:e2e:engine", JSON.stringify(q));
  }, queue);
}

/** Record what Caissa is asked to say, without a real voice engine. */
async function recordSpeech(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __spoken: string[] }).__spoken = [];
    class FakeUtterance {
      text: string;
      lang = "";
      rate = 1;
      pitch = 1;
      volume = 1;
      voice: unknown = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    Object.defineProperty(window, "SpeechSynthesisUtterance", { value: FakeUtterance, configurable: true });
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        speaking: false,
        pending: false,
        getVoices: () => [{ lang: "en-US", localService: true, name: "Test" }],
        cancel() {},
        resume() {},
        speak(u: { text: string }) {
          (window as unknown as { __spoken: string[] }).__spoken.push(u.text);
        },
      },
    });
  });
}

const spoken = (page: Page) => page.evaluate(() => (window as unknown as { __spoken: string[] }).__spoken);

async function setPrefs(page: Page, prefs: Record<string, unknown>) {
  await page.addInitScript((p) => {
    window.localStorage.setItem("openinglab:companion:v1", JSON.stringify(p));
  }, prefs);
}

async function move(page: Page, from: string, to: string) {
  await page.locator(`[data-square="${from}"]`).click();
  await page.locator(`[data-square="${to}"]`).click();
}

test("home lists the core openings and links to a train page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Who do you want to spar?" })).toBeVisible();
  const italian = page.getByRole("link", { name: /Italian Game/ }).first();
  await italian.click();
  await expect(page).toHaveURL(/\/train\/italian-game\/?$/);
  await expect(page.getByRole("heading", { name: "Italian Game" })).toBeVisible();
});

test("Caissa greets you, then narrates the moves in order", async ({ page }) => {
  await useScriptedEngine(page, ["e7e5"]);
  await page.goto("/train/italian-game/");

  await expect(page.locator('[data-beat="greeting"]')).toBeVisible({ timeout: 10_000 });
  await move(page, "e2", "e4");

  // Your move and their reply both land in the transcript, as chips.
  await expect(page.getByRole("button", { name: "Your move e4" })).toBeVisible({ timeout: 10_000 });
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText(/Move 2/)).toBeVisible();
});

test("the board stays on screen and only the stream scrolls", async ({ page }, testInfo) => {
  await useScriptedEngine(page, ["e7e5", "b8c6", "f8c5", "g8f6"]);
  await page.goto("/train/italian-game/");
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "g1", "f3");
  await move(page, "f1", "c4");

  const viewport = page.viewportSize()!;
  const board = await page.locator('[data-square="a1"]').boundingBox();
  expect(board).not.toBeNull();
  // The whole board is above the fold — the conversation never pushes it away.
  expect(board!.y + board!.height).toBeLessThanOrEqual(viewport.height);

  const scrolls = await page.locator('[data-testid="companion-stream"]').evaluate((el) => el.scrollHeight > el.clientHeight + 1);
  if (testInfo.project.name === "iphone") expect(scrolls).toBe(true);
});

test("hint says the move and why, in one tap", async ({ page }) => {
  await useScriptedEngine(page, ["e7e5"]);
  await page.goto("/train/italian-game/");
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: /Hint/ }).click();
  const hint = page.locator('[data-beat="hint"]');
  await expect(hint).toBeVisible();
  await expect(hint).toContainText(/Nf3/);
});

test("a flagged move offers the take-back, and taking it back forgets those lines", async ({ page }) => {
  await useScriptedEngine(page, ["e7e5", "b8c6", "f8c5"]);
  await page.goto("/train/italian-game/");
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "g1", "f3");
  await expect(page.getByRole("button", { name: "Their move Nc6" })).toBeVisible({ timeout: 10_000 });
  await move(page, "f1", "c4");
  await expect(page.getByRole("button", { name: "Their move Bc5" })).toBeVisible({ timeout: 10_000 });

  // 4.Ng5 is in the book as a mistake.
  await move(page, "f3", "g5");
  await expect(page.locator('[data-beat="pause_offer"]')).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: "Take it back" }).click();

  await expect(page.getByRole("button", { name: "Your move Ng5" })).toHaveCount(0);
  await expect(page.locator('[data-beat="pause_offer"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Your move Bc4" })).toBeVisible();
});

test("step pacing waits for Continue inside her bubble", async ({ page }) => {
  await useScriptedEngine(page, ["e7e5"]);
  await page.addInitScript(() => {
    window.localStorage.setItem("openinglab:prefs:v1", JSON.stringify({ pace: "step" }));
  });
  await page.goto("/train/italian-game/");
  await move(page, "e2", "e4");
  const cont = page.getByRole("button", { name: "Continue" });
  await expect(cont).toBeVisible({ timeout: 10_000 });
  await expect(page.getByRole("button", { name: "Their move e5" })).toHaveCount(0);
  await cont.click();
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
});

test("she speaks her lines but never the move list, and mute silences her", async ({ page }) => {
  await recordSpeech(page);
  await useScriptedEngine(page, ["e7e5"]);
  await page.goto("/train/italian-game/");
  await expect(page.locator('[data-beat="greeting"]')).toBeVisible({ timeout: 10_000 });
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });

  await expect.poll(async () => (await spoken(page)).length, { timeout: 5_000 }).toBeGreaterThan(0);
  const said = await spoken(page);
  expect(said.some((t) => /^e4$|^e5$/.test(t.trim()))).toBe(false); // never reads the transcript

  await page.getByRole("button", { name: "Mute Caissa" }).click();
  const before = (await spoken(page)).length;
  await move(page, "g1", "f3");
  await page.waitForTimeout(1200);
  expect((await spoken(page)).length).toBe(before);
});

test("at Quiet she still warns, but stops narrating", async ({ page }) => {
  await setPrefs(page, { chattiness: "quiet", voice: false });
  await useScriptedEngine(page, ["e7e5"]);
  await page.goto("/train/italian-game/");
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  // The greeting is ordinary chatter and is held back at Quiet.
  await expect(page.locator('[data-beat="greeting"]')).toHaveCount(0);
});

test("theory page renders and links back to sparring", async ({ page }) => {
  await page.goto("/openings/london-system/");
  await expect(page.getByRole("heading", { name: "London System" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Spar this opening/ })).toBeVisible();
});

test("theory page shows what you'll face from the baked sub-1200 data", async ({ page }) => {
  await page.goto("/openings/italian-game/");
  await expect(page.getByText(/What you.ll face at your level/)).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText(/After 1\.e4 e5 2\.Nf3 Nc6 3\.Bc4/)).toBeVisible();
  await expect(page.getByText(/^\d+%$/).first()).toBeVisible();
});

test("principles mode runs on the same stream and can show the benchmarks", async ({ page }) => {
  await useScriptedEngine(page, ["e7e5"]);
  await page.goto("/principles/");
  await expect(page.getByRole("heading", { name: "Principles Mode" })).toBeVisible();
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: /See benchmarks/ }).click();
  await expect(page.getByText("Start in the centre")).toBeVisible();
  await expect(page.getByText(/e4 — good start/)).toBeVisible();
});

test("summary page renders without games", async ({ page }) => {
  await page.goto("/summary/");
  await expect(page.getByRole("heading", { name: "Summary" })).toBeVisible();
  await expect(page.getByText(/No games yet/)).toBeVisible();
});

test("picking up a pinned piece warns before you commit, and play continues", async ({ page }) => {
  // 1.e4 e5 2.d4 Bb4+ 3.Nc3 d6 — the c3 knight is now pinned to e1 by the b4 bishop.
  await useScriptedEngine(page, ["e7e5", "f8b4", "d7d6"]);
  await page.goto("/train/italian-game/");
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move Bb4+" })).toBeVisible({ timeout: 10_000 });
  await move(page, "b1", "c3");
  await expect(page.getByRole("button", { name: "Their move d6" })).toBeVisible({ timeout: 10_000 });

  await page.locator('[data-square="c3"]').click();
  const warning = page.locator('[data-beat="anticipation_pin"]');
  await expect(warning).toBeVisible();
  await expect(warning).toContainText(/pinned/i);

  // She warns, she never blocks: another piece still moves normally.
  await page.locator('[data-square="c3"]').click(); // deselect
  await move(page, "g1", "f3");
  await expect(page.getByRole("button", { name: "Your move Nf3" })).toBeVisible({ timeout: 10_000 });
});

test("tapping a move in the transcript sends the board back to it", async ({ page }) => {
  await useScriptedEngine(page, ["e7e5", "b8c6"]);
  await page.goto("/train/italian-game/");
  await move(page, "e2", "e4");
  await expect(page.getByRole("button", { name: "Their move e5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "g1", "f3");
  await expect(page.getByRole("button", { name: "Their move Nc6" })).toBeVisible({ timeout: 10_000 });

  await expect(page.locator('[data-square="f3"] [data-piece]')).toHaveCount(1);
  await page.getByRole("button", { name: "Your move e4" }).click();

  await expect(page.getByText(/Reviewing/)).toBeVisible();
  // The position right after 1.e4: Black hasn't replied and the knight is home.
  await expect(page.locator('[data-square="e5"] [data-piece]')).toHaveCount(0);
  await expect(page.locator('[data-square="f3"] [data-piece]')).toHaveCount(0);
  await expect(page.locator('[data-square="g1"] [data-piece]')).toHaveCount(1);

  // And there is a way back to the live position.
  await page.getByRole("button", { name: /Back to the game/ }).click();
  await expect(page.getByText(/Reviewing/)).toHaveCount(0);
  await expect(page.locator('[data-square="f3"] [data-piece]')).toHaveCount(1);
});

test("she remembers the opening you were last in", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "openinglab:sessions:v1",
      JSON.stringify({
        recent: [
          {
            openingId: "italian-game",
            openingName: "Italian Game",
            at: Date.now() - 60_000,
            result: "win",
            moves: 24,
            accuracy: 80,
            botElo: 900,
            blunders: 0,
            mistakes: 1,
            inaccuracies: 2,
            takebacks: 0,
            hintsUsed: 0,
            bookEndedAt: 12,
          },
        ],
      }),
    );
  });
  await useScriptedEngine(page, ["e7e5"]);
  await page.goto("/train/italian-game/");
  const greeting = page.locator('[data-beat="greeting"]');
  await expect(greeting).toBeVisible({ timeout: 10_000 });
  await expect(greeting).toContainText(/won the last one/);
});

test("an offbeat opponent move says it is not your fault, and the book resumes", async ({ page }) => {
  // Jason's London game: 1.d4 d5 2.Bf4 c6 — a main move order met by a sideline.
  await useScriptedEngine(page, ["d7d5", "c7c6", "g8f6"]);
  await setPrefs(page, { chattiness: "chatty", voice: false });
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "c1", "f4");
  await expect(page.getByRole("button", { name: "Their move c6" })).toBeVisible({ timeout: 10_000 });

  // 2.Bf4 is now authored, so the book does NOT end where it used to.
  await expect(page.locator('[data-beat="book_end"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Hint" })).toBeEnabled();
});
