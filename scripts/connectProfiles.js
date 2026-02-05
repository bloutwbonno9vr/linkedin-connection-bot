/**
 * SAFE verification script.
 * This does NOT send connection requests.
 * It only verifies whether a "Connect" button is visible on target profiles.
 */
import fs from "node:fs";
import { launchBrowser, newContextWithCookies, resolveRepoPath } from "../src/browser.js";
import { assertDryRun, humanDelay } from "../src/safeguards.js";

const CONFIG_PATH = resolveRepoPath("config", "runtime.config.json");
const COOKIES_PATH = resolveRepoPath("sessions", "cookies.store.json");

async function run() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  assertDryRun(config.mode);

  const targets = JSON.parse(fs.readFileSync(resolveRepoPath(config.targetsFile), "utf-8")).targets || [];

  const browser = await launchBrowser(config);
  const context = await newContextWithCookies(browser, COOKIES_PATH);
  const page = await context.newPage();

  try {
    for (const t of targets) {
      await page.goto(t.profileUrl, { waitUntil: "domcontentloaded" });
      await humanDelay(config.minDelayMs, config.maxDelayMs);

      const connectBtn = page.locator(config.selectors.connectButton);
      console.log(`${t.profileUrl} -> connectButtonCount=${await connectBtn.count()}`);
      await humanDelay(config.minDelayMs, config.maxDelayMs);
    }
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
