import fs from "node:fs";
import path from "node:path";
import { launchBrowser, newContextWithCookies, resolveRepoPath } from "./browser.js";
import { assertDryRun, humanDelay, withRetries } from "./safeguards.js";

const CONFIG_PATH = resolveRepoPath("config", "runtime.config.json");
const LOG_PATH = resolveRepoPath("logs", "execution.log");
const COOKIES_PATH = resolveRepoPath("sessions", "cookies.store.json");

function log(line) {
  const stamp = new Date().toISOString();
  const out = `[${stamp}] ${line}`;
  console.log(out);
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, out + "\n", "utf-8");
}

async function verifyProfileUI(page, selectors) {
  // Verify that the profile top card exists.
  await page.locator(selectors.profileTopCard).first().waitFor({ state: "visible", timeout: 20000 });

  // Check presence of common buttons without clicking them.
  const connectCount = await page.locator(selectors.connectButton).count();
  const messageCount = await page.locator(selectors.messageButton).count();
  const moreCount = await page.locator(selectors.moreButton).count();

  return { connectCount, messageCount, moreCount, title: await page.title() };
}

async function run() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  assertDryRun(config.mode);

  const targetsPath = resolveRepoPath(config.targetsFile || "profiles/targets.json");
  const targets = JSON.parse(fs.readFileSync(targetsPath, "utf-8")).targets || [];

  const browser = await launchBrowser(config);
  const context = await newContextWithCookies(browser, COOKIES_PATH);
  const page = await context.newPage();
  page.setDefaultTimeout(Number(config.timeoutMs || 45000));

  try {
    for (const t of targets) {
      const url = t.profileUrl;
      await withRetries(async (attempt) => {
        log(`Open profile: ${url} (attempt ${attempt + 1})`);
        await page.goto(url, { waitUntil: "domcontentloaded" });

        // Allow UI hydration
        await humanDelay(config.minDelayMs, config.maxDelayMs);

        const state = await verifyProfileUI(page, config.selectors);
        log(`Verified profile UI. title="${state.title}" connect=${state.connectCount} message=${state.messageCount} more=${state.moreCount}`);

        await humanDelay(config.minDelayMs, config.maxDelayMs);
      }, { retries: Number(config.maxRetries || 2) });
    }

    log("Completed dry-run verification.");
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

run().catch((err) => {
  log(`ERROR: ${err?.message || String(err)}`);
  process.exitCode = 1;
});
