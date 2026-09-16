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

/** Some moves now stop the game to teach. Waive the lesson and carry on. */
async function playOnIfStopped(page: Page) {
  const stop = page.locator('[data-testid="stop-down"]');
  if (await stop.isVisible().catch(() => false)) await stop.getByRole("button", { name: /^Play on$/ }).click();
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
  // The move number lives on the chips now, not in the header, which shows who
  // you are playing instead.
  await expect(page.getByRole("button", { name: "Your move e4" })).toContainText("1.");
  await expect(page.locator("header")).toContainText(/vs /);
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

  // 4.Ng5 is in the book as a mistake, so the game stops and teaches.
  await move(page, "f3", "g5");
  const stop = page.locator('[data-testid="stop-down"]');
  await expect(stop).toBeVisible({ timeout: 10_000 });
  await expect(stop).toContainText(/Ng5/);
  await stop.getByRole("button", { name: /Take it back/ }).click();

  await expect(page.getByRole("button", { name: "Your move Ng5" })).toHaveCount(0);
  await expect(stop).toHaveCount(0);
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
  // 2.d4 breaks the Italian's "c3 before d4" rule, so the game now stops first.
  await playOnIfStopped(page);
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

  // And the header answers "am I playing this right?" without being asked.
  await expect(page.getByText(/on plan 2\/8/)).toBeVisible();
});

test("the header says off plan, and why, when the order rule breaks", async ({ page }) => {
  await useScriptedEngine(page, ["d7d5", "g8f6"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });

  await expect(page.getByText(/on plan/)).toBeVisible();
  await move(page, "e2", "e3"); // e3 before Bf4: the one rule the London has
  await expect(page.getByText(/off plan/)).toBeVisible({ timeout: 10_000 });

  // While the lesson is up it carries the reason, so the header does not repeat it.
  await expect(page.locator('[data-testid="stop-down"]')).toBeVisible();
  await expect(page.getByText(/e3 came before Bf4/)).toHaveCount(0);

  // Once you waive it, the header takes the reason back over.
  await playOnIfStopped(page);
  await expect(page.getByText(/e3 came before Bf4/)).toBeVisible({ timeout: 10_000 });
});

test("she says so when you get it right, at the default setting", async ({ page }) => {
  await useScriptedEngine(page, ["d7d5", "g8f6"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "c1", "f4");
  // Praise used to be built at a priority the Normal ceiling dropped, so the
  // coach only ever spoke when you erred.
  const onPlan = page.locator('[data-beat="verdict_good"]', { hasText: "On plan" });
  await expect(onPlan).toBeVisible({ timeout: 10_000 });
});

test("the setup counter opens the goals behind it", async ({ page }) => {
  await useScriptedEngine(page, ["d7d5"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });

  await page.getByRole("button", { name: /setup goals\. Show the setup/ }).click();
  const sheet = page.getByRole("dialog", { name: /setup/i });
  await expect(sheet).toBeVisible();
  await expect(sheet.getByText("Bishop to f4 or g3")).toBeVisible();
  await expect(sheet.getByText(/Pawn on c3/)).toBeVisible();
  await expect(sheet.getByText(/^Castle —/)).toBeVisible();
  await sheet.getByRole("button", { name: "Done" }).click();
  await expect(sheet).toHaveCount(0);
});

test("the transcript is numbered like a scoresheet", async ({ page }) => {
  await useScriptedEngine(page, ["d7d5"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });
  await expect(page.getByRole("button", { name: "Your move d4" })).toContainText("1.");
  await expect(page.getByRole("button", { name: "Their move d5" })).toContainText("1…");
});

test("board coordinates sit beside the squares, not on the pieces", async ({ page }) => {
  await page.goto("/openings/london-system/");
  // The page carries two boards: the tabiya and the structure diagram.
  const board = page.locator("[data-chessboard]").first();
  await board.locator('[data-square="a1"]').waitFor({ timeout: 10_000 });
  const a1 = await board.locator('[data-square="a1"]').boundingBox();

  const labels = board.locator(".board-ranks span");
  await expect(labels).toHaveCount(8);
  const files = board.locator(".board-files span");
  await expect(files).toHaveCount(8);

  // Every rank label finishes before the first file of squares begins.
  const label = await labels.first().boundingBox();
  expect(label!.x + label!.width).toBeLessThanOrEqual(a1!.x + 1);
  // And the file labels sit below the last rank of squares.
  const fileLabel = await files.first().boundingBox();
  expect(fileLabel!.y).toBeGreaterThanOrEqual(a1!.y + a1!.height - 1);
});

test("home offers the opening you last played", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "openinglab:sessions:v1",
      JSON.stringify({
        recent: [
          {
            openingId: "london-system",
            at: new Date().toISOString(),
            result: "win",
            plies: 30,
            clean: true,
            botElo: 900,
            accuracy: 78,
            worst: { san: "Qb6", moveNo: 7, drop: 14 },
            setupScore: 0.75,
            benchmarks: null,
          },
        ],
      }),
    );
  });
  await page.goto("/");
  const resume = page.getByRole("link", { name: /Pick up where you left off/ });
  await expect(resume).toBeVisible();
  await expect(resume).toContainText("London System");
  await expect(resume).toContainText(/you won/);
});

test("a checkpoint asks its question before it locks the board", async ({ page }) => {
  // 1.d4 d5 2.Nf3 Nf6 puts the London's move-order checkpoint on the board with
  // the player on plan 2/8 and to move. The checkpoint blocks input, so if the
  // question is never asked the game is simply stuck with nothing to tap.
  await useScriptedEngine(page, ["d7d5", "g8f6"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "g1", "f3");
  await expect(page.getByRole("button", { name: "Their move Nf6" })).toBeVisible({ timeout: 10_000 });

  const question = page.locator('[data-beat="checkpoint_q"]');
  await expect(question).toBeVisible({ timeout: 10_000 });
  await expect(question).toContainText(/move-order rule/i);

  // Blocked until answered, which is intended — but now it says so.
  await move(page, "c1", "f4");
  await expect(page.locator('[data-square="f4"] [data-piece]')).toHaveCount(0);

  await question.getByRole("button", { name: /Bishop to f4 before e3/ }).click();
  await expect(page.locator('[data-beat="checkpoint_result"]')).toBeVisible({ timeout: 10_000 });

  // And the board is live again.
  await move(page, "c1", "f4");
  await expect(page.locator('[data-square="f4"] [data-piece]')).toHaveCount(1, { timeout: 10_000 });
});

test("the fixed bottom bar never covers page content", async ({ page }) => {
  for (const path of ["/", "/openings/", "/openings/london-system/", "/summary/", "/about/"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(250);
    const dock = await page.locator("nav").last().boundingBox();
    const last = await page.evaluate(() => {
      const root = document.querySelector(".pb-dock");
      const r = root?.getBoundingClientRect();
      return r ? r.bottom : null;
    });
    expect(dock, path).not.toBeNull();
    // The page's content box ends at or above the bar, so nothing hides under it.
    expect(last, path).not.toBeNull();
    expect(last!, path).toBeLessThanOrEqual(dock!.y + dock!.height + 1);
  }
});

test("a question is readable from its first word", async ({ page }) => {
  await useScriptedEngine(page, ["d7d5", "g8f6"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "g1", "f3");

  const q = page.locator('[data-beat="checkpoint_q"]');
  await expect(q).toBeVisible({ timeout: 10_000 });
  const stream = await page.locator('[data-testid="companion-stream"]').boundingBox();
  const box = await q.boundingBox();
  // The top of the question sits inside the panel, not scrolled off above it.
  expect(box!.y).toBeGreaterThanOrEqual(stream!.y - 1);

  // And three sentence-length answers stack rather than sharing a row.
  const opts = q.getByRole("button");
  await expect(opts).toHaveCount(3);
  const a = await opts.nth(0).boundingBox();
  const b = await opts.nth(1).boundingBox();
  expect(b!.y).toBeGreaterThan(a!.y + a!.height - 1);
});

test("the win bar is visible in the light theme", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("openinglab:theme", "light"));
  await useScriptedEngine(page, ["d7d5"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });

  const contrast = await page.evaluate(() => {
    const bar = document.querySelector('[aria-label^="Your winning chances"]');
    const fill = bar?.firstElementChild as HTMLElement | undefined;
    if (!fill) return null;
    const lum = (c: string) => {
      const [r, g, b] = (c.match(/\d+/g) || ["0", "0", "0"]).map(Number).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const a = lum(getComputedStyle(fill).backgroundColor);
    const b = lum(getComputedStyle(document.body).backgroundColor);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
  // It used to be a near-white fill on a near-white page, about 1.05:1.
  expect(contrast).not.toBeNull();
  expect(contrast!).toBeGreaterThan(2);
});

test("breaking the opening's own rule stops the game and teaches", async ({ page }) => {
  // e3 before Bf4 is the one rule the London has. The engine scores it at about
  // minus one percent, so this used to pass with nothing but a note.
  await useScriptedEngine(page, ["d7d5", "g8f6"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "e2", "e3");

  const stop = page.locator('[data-testid="stop-down"]');
  await expect(stop).toBeVisible({ timeout: 10_000 });
  await expect(stop).toContainText(/Wrong order/i);
  await expect(stop).toContainText(/e3 before Bf4/);
  await expect(stop).toContainText(/Play Bf4 first/);

  // The conversation is out of the way while the lesson is up.
  await expect(page.locator('[data-testid="companion-stream"]')).toHaveCount(0);
  // And the board is still there, so the lesson can point at it.
  await expect(page.locator('[data-square="e3"] [data-piece]')).toHaveCount(1);

  // The opponent does not get to reply while you decide.
  await expect(page.getByRole("button", { name: "Their move Nf6" })).toHaveCount(0);

  await stop.getByRole("button", { name: /Take it back/ }).click();
  await expect(stop).toHaveCount(0);
  await expect(page.locator('[data-square="e3"] [data-piece]')).toHaveCount(0);
  await expect(page.locator('[data-testid="companion-stream"]')).toBeVisible();
});

test("you can overrule the stop and play on", async ({ page }) => {
  await useScriptedEngine(page, ["d7d5", "g8f6"]);
  await page.goto("/train/london-system/");
  await move(page, "d2", "d4");
  await expect(page.getByRole("button", { name: "Their move d5" })).toBeVisible({ timeout: 10_000 });
  await move(page, "e2", "e3");

  const stop = page.locator('[data-testid="stop-down"]');
  await expect(stop).toBeVisible({ timeout: 10_000 });
  await stop.getByRole("button", { name: /^Play on$/ }).click();
  await expect(stop).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Their move Nf6" })).toBeVisible({ timeout: 10_000 });
  // No dead take-back buttons left behind in the transcript.
  await expect(page.locator('[data-beat="pause_offer"]')).toHaveCount(0);
});
