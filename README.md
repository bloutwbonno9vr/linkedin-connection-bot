# linkedin-connection-automation

This repository is a **safe automation template** for verifying LinkedIn profile pages and common UI elements (navigation, selectors, session handling, logging) in a repeatable way.

**Important:** The code is intentionally **dry-run only** and does **not** send connection requests or messages.

## Quick Start

1. Install dependencies:
   - `npm install`

2. Edit targets:
   - `profiles/targets.json`

3. (Optional) Add your own test-account cookies:
   - `sessions/cookies.store.json`

4. Run:
   - `npm run start`

Logs:
- `logs/execution.log`
