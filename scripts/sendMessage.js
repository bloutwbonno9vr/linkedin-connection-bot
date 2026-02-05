/**
 * SAFE verification script.
 * This does NOT send messages.
 * It only verifies whether the messaging UI is present for a profile.
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
  const first = targets[0]?.profileUrl;
  if (!first) throw new Error("No targets configured.");

  const browser = await launchBrowser(config);
  const context = await newContextWithCookies(browser, COOKIES_PATH);
  const page = await context.newPage();

  try {
    await page.goto(first, { waitUntil: "domcontentloaded" });
    await humanDelay(config.minDelayMs, config.maxDelayMs);

    const messageBtn = page.locator(config.selectors.messageButton);
    console.log(`messageButtonCount=${await messageBtn.count()}`);
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
