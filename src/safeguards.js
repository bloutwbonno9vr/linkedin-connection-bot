/**
 * Safety guardrails.
 * - Only 'dry-run' is supported.
 * - Any attempt to automate connection requests/messages is blocked by design.
 */

export function assertDryRun(mode) {
  const m = String(mode || "").toLowerCase();
  if (m !== "dry-run") {
    throw new Error(
      "Safety block: This template only supports 'dry-run' verification mode. " +
      "It will NOT perform actions like sending LinkedIn connection requests or messages."
    );
  }
}

export function randInt(min, max) {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export async function humanDelay(minDelayMs, maxDelayMs) {
  const ms = randInt(Number(minDelayMs || 900), Number(maxDelayMs || 2200));
  await new Promise((r) => setTimeout(r, ms));
}

export async function withRetries(fn, { retries = 2 } = {}) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn(i);
    } catch (err) {
      lastErr = err;
      if (i === retries) break;
    }
  }
  throw lastErr;
}
