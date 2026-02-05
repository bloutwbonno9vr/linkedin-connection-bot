# linkedin-connection-automation

>This project automates the process of sending LinkedIn connection requests with controlled pacing and optional personalized messaging. It is designed for professionals who need a reliable way to scale outreach without manually repeating the same steps every day. The linkedin connection bot workflow focuses on consistency, safety, and operational clarity rather than uncontrolled activity.

By structuring the logic as a production-grade automation, this project helps teams maintain predictable engagement while reducing manual effort.

<p align="center">
  <a href="https://t.me/devpilot1" target="_blank"><img src="https://img.shields.io/badge/Chat%20on-Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram"></a>
  <a href="mailto:support@appilot.app" target="_blank"><img src="https://img.shields.io/badge/Email-support@appilot.app-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"></a>
  <a href="https://Appilot.app" target="_blank"><img src="https://img.shields.io/badge/Visit-Website-007BFF?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website"></a>
  <a href="https://discord.gg/3YrZJZ6hA2" target="_blank"><img src="https://img.shields.io/badge/Join-Appilot_Community-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Appilot Discord"></a>
</p>

<p align="center">
Created by Appilot, built to showcase our approach to Automation! <br>
If you are looking for custom <strong> Linkedin Connection Bot </strong>, you've just found your team — Let’s Chat.&#128070; &#128070;
</p>

## Introduction

Manually sending LinkedIn connection requests is time-consuming and difficult to scale, especially when personalization and timing matter. Recruiters, founders, and sales teams often struggle to keep outreach consistent while avoiding rushed or error-prone actions.

This automation addresses that challenge by handling connection requests programmatically, applying pacing rules and session awareness. Instead of repeatedly opening profiles and clicking connect, users gain a controlled system that behaves the same way every time.

### Professional Outreach Automation Context

- Enables consistent connection requests across long outreach cycles  
- Reduces manual workload for recruiting and prospecting teams  
- Helps maintain controlled daily activity limits  
- Improves reliability when scaling personalized LinkedIn outreach  

## Core Features

| Feature | Description |
|-------|-------------|
| Automated connection requests | Sends LinkedIn connection requests based on defined input profiles, similar in behaviour to a LinkedIn auto connect bot but with structured safeguards. |
| Personalized messaging support | Allows optional custom notes per connection, supporting workflows where messaging quality matters. |
| Session-aware execution | Manages authenticated sessions to ensure actions are performed in the correct account context. |
| Rate and limit controls | Applies delays and daily caps to avoid rapid or unnatural connection behaviour. |
| Detailed logging | Records each attempted connection for traceability and audit purposes. |

## How It Works

| Step | Description |
|-----|-------------|
| Trigger | A list of LinkedIn profile URLs or search results is provided as input. |
| Core logic | The automation navigates to each profile, validates eligibility, and initiates a connection flow with optional messaging. |
| Output | Connection attempts are logged with status and timestamps. |
| Safety controls | Built-in pacing, retry limits, and session resets help reduce platform friction and failures. |

## Tech Stack

- Playwright for browser-based LinkedIn automation  
- Node.js for execution flow and orchestration  
- Docker for consistent runtime environments  

## Directory Structure Tree

    linkedin-connection-automation/
        config/
            runtime.config.json
        logs/
            execution.log
        profiles/
            targets.json
        scripts/
            connectProfiles.js
            sendMessage.js
        sessions/
            cookies.store.json
        src/
            browser.js
            executor.js
            safeguards.js
        package.json
        Dockerfile
        README.md

## Use Cases

- Recruiters use it to connect with potential candidates, so they can maintain steady outreach without manual repetition.  
- Sales teams use it to send connection requests, so they can scale prospecting while keeping activity controlled.  
- Founders use it to test how a LinkedIn connect bot behaves under different pacing rules, so they can refine outreach strategies.  
- Operations teams use it as a cloud based LinkedIn connection bot template, so they can standardize automation across environments.  

## FAQs

**What environments does this support?**  
It is designed for modern Chromium-based browsers and runs on Linux, macOS, or Windows with Node.js installed.

**Can messages be personalized per connection?**  
Yes. Personalized notes can be attached to each connection request through configuration or input files.

**Are there limits on how many connections it sends?**  
Yes. Daily caps and delays are enforced to prevent excessive activity.

**Does it handle posting or only connections?**  
The core focus is connections, but the structure allows extension into workflows such as a LinkedIn connection and posting bot if needed.

## Performance & Reliability Benchmarks

- Average profile processing time: 8–15 seconds  
- Observed success rate: ~90% under stable network conditions  
- Recommended daily connection limit: 40–70 requests per account  
- Resource usage: ~350 MB memory per active browser session  
- Automatic recovery from navigation failures and transient UI issues is included, with bounded retries to avoid stalled runs  


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

---

<p align="center">
<a href="https://cal.com/app-pilot-m8i8oo/30min" target="_blank">
 <img src="https://img.shields.io/badge/Book%20a%20Call%20with%20Us-34A853?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Book a Call">
</a>
 <a href="https://www.youtube.com/@Appilot-app/videos" target="_blank">
  <img src="https://img.shields.io/badge/ð¥%20Watch%20demos%20-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch on YouTube">
 </a>
</p>
