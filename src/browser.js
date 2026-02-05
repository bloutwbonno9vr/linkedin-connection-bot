import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/**
 * Browser helpers.
 * This repo is a SAFE QA template: it verifies UI elements only.
 */

export function resolveRepoPath(...parts) {
  return path.resolve(process.cwd(), ...parts);
}

export async function launchBrowser({ headless, slowMoMs }) {
  return chromium.launch({
    headless: Boolean(headless),
    slowMo: Number(slowMoMs || 0),
  });
}

export async function newContextWithCookies(browser, cookiesPath) {
  const context = await browser.newContext();

  // Optional: load cookies for your OWN test account.
  // If missing/invalid, we proceed unsigned (some pages may redirect).
  try {
    if (cookiesPath && fs.existsSync(cookiesPath)) {
      const raw = fs.readFileSync(cookiesPath, "utf-8").trim();
      if (raw) {
        const cookies = JSON.parse(raw);
        if (Array.isArray(cookies) && cookies.length) {
          await context.addCookies(cookies);
        }
      }
    }
  } catch {
    // Ignore cookie parsing errors intentionally.
  }

  return context;
}
