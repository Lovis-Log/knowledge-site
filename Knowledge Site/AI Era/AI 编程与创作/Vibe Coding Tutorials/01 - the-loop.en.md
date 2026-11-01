---
slug: "01-the-loop"
title: "From Zero to a Paid SaaS: The Full Vibe-Coding Loop"
summary: "A complete pipeline: first the vocabulary (frontend, backend, database, auth, Git, APIs, environment variables), then the loop — plan, build the UI from references, implement one feature at a time, check it yourself, run an AI code review, commit — and finally database, payments, security scanning, legal pages and a custom domain."
updatedAt: "2026-11-01"
content_type: "technical-tutorial"
categories: [ai-coding]
tags: ["ai-coding", "saas", "workflow", "code-review", "deployment"]
sources:
  - kind: "video"
    title: "The Ultimate Vibe Coding Tutorial for Beginners"
    url: "https://www.youtube.com/watch?v=XLhdE-qV87E&t=3421s"
    author: "Codesistency"
    publishedAt: "2026-10-16"
---

## What this walkthrough covers

It starts from an empty folder and ends with a chargeable AI resume builder — modelled on reszy.ai, which the author cites as a Stripe-verified product doing around $250k a month. The course does not rebuild the whole thing; it keeps the core: generating resume content with AI, and charging for it.

The point is not the finished interface. **Every AI run produces a different result, so copying the output is useless — the workflow is what transfers.** The loop:

1. Plan the project — the step beginners skip, and the most expensive one to skip.
2. Design the UI from the plan, **with visual references**.
3. Break the product into features (auth, dashboard, database, …).
4. Build one feature at a time.
5. Click through it yourself (manual check).
6. Run an AI code review — AI touches dozens or hundreds of files at once, and no human can read all of them.
7. Fix, commit, move to the next feature.

Deployment and domain come last in a normal course, but the author deploys almost first — for a reason explained below.

## Timeline

| Time | Topic |
| --- | --- |
| 2:44 | Tools: Claude, Codex, Cursor, VS Code, Node.js; three ways to use an AI agent |
| 9:41 | Create a Next.js app, run it, change the page for the first time |
| 19:47 | Concepts: frontend/backend, database, auth vs authorization, Git/GitHub, API, env vars |
| 37:20 | Deployment: connect GitHub; every commit redeploys |
| 52:27 | Planning: analyse a competitor, extract core features, plan-mode interview, PLAN.md |
| 1:10:55 | UI: Pinterest references, generated assets, the whole app with fake data |
| 1:28:42 | Code review: branch and PR, CodeRabbit, fix in one prompt, merge |
| 1:40:26 | Backend: Neon database, auth, .env, production variables and domain |
| 2:01:40 | Payments: Polar sandbox, product and token, webhook verification, test card |
| 2:17:30 | Deep security scan and fixes |
| 2:22:08 | Legal pages: terms of service and privacy policy |
| 2:25:29 | Domain: buy, configure CNAME, wait for propagation |

## Six concepts worth twenty minutes

The author's view: people who only say "build me an app" are not blocked by syntax, they are blocked by not understanding what the AI is talking about. Six ideas are enough.

### Frontend and backend

- **Frontend**: what you see and touch — buttons, text, images, forms, animation.
- **Backend**: what you do not see but makes everything work — checking whether an email exists, verifying a password, sending notifications, processing payments, saving data.

An application with both is **full-stack**.

### Database

A place to store and organise data, using tables, rows and columns rather than random piles. A social app stores posts and messages; an e-commerce app stores products and orders; this project stores users and resumes. There are many kinds; this course uses **Postgres**.

### Authentication and authorization

- **Authentication**: who you are — email, Google or Apple sign-in.
- **Authorization**: what you are allowed to do — a normal user can buy; an admin can add, delete, discount or mark items out of stock.

The words are often confused; the distinction is identity versus permission.

### Git and GitHub

- **Git** runs locally and records every change, so you can return to an earlier version. Each saved checkpoint is a **commit**.
- **GitHub** stores the code online — for collaboration, and so a lost laptop does not mean a lost project.

### API and API key

An API lets one application talk to another service. Implementing payments means your app talks to Stripe through one; a weather app talks to a weather service through one. An **API key** is the secret that identifies your application when it makes those calls.

### Environment variables and .env

Environment variables are the values your app needs to run: API keys, database URLs, secrets. They live in a `.env` file, separate from the code, and `.env` is listed in `.gitignore` so it is **never pushed to GitHub** — pushing it would expose every secret.

## Environment setup

You need VS Code, Node.js, and an AI subscription ($20/month is enough to start).

### Three ways to use the agent

1. **In the terminal** — least beginner-friendly.
2. **Desktop app** — friendly, but you never see the files or code generated.
3. **VS Code extension** — the course's choice: chat, see files, edit code, run the terminal in one place.

The third option's advantage is visibility. Even without a technical background, watching the file tree grow builds familiarity.

### Create the project

Make an empty folder on the desktop and drag it into VS Code, then ask the agent to scaffold Next.js:

```bash
npx create-next-app@latest .
```

The trailing dot means "generate in the current folder". Accept the defaults, then:

```bash
npm run dev
```

Open `localhost:3000` and the default page appears. Then make the first edit:

```text
This is a fresh Next.js template with no logic.
Build me a nice landing page — pretend we are building a social app like Instagram.
Just the design for now, keep it simple; I am only testing.
```

The page updates live. The author notes the tell-tale signs of an "AI-generated" design: purple palettes, emoji instead of icons, the same components everywhere. That is what the UI section fixes.

## Deploy early — why not wait until the end

Most tutorials deploy last. This one deploys before any business logic:

> Building an application and making it available on the internet are two different things. The first runs on your laptop; the second needs a deployment.

### Two clicks

1. Create a GitHub repository and push the local code (if unsure of the commands, paste GitHub's snippet into the agent and have it run them).
2. In Cloudways Velocity, connect GitHub, choose the repository, and deploy.

The platform detects Next.js and returns a temporary URL within minutes — something you can already send to a friend.

### Auto-deploy is the real win

The platform watches the repository and **redeploys on every commit**:

```text
Rename the app — not Momento; change the palette too.
Nothing purple or pink; use a green like Spotify.
```

The agent edits, commits, pushes; production updates a few minutes later. The author calls this "commit to live".

When a deployment fails, the logs appear in the platform. Do not read them alone — paste them:

```text
I deployed with Cloudways Velocity and it failed. Here are the logs. Help me out.
```

The platform also provides monitoring, logs and deployment history, so you can roll back to a working version. For a solo developer, the author argues, this replaces a good part of a DevOps role.

## Planning: let the AI interview you

### Extract core features from a competitor

Ask for the core only:

```text
This is an AI resume builder SaaS I like, and I want a simplified version.
Analyse the whole site, list its features, and give me the core features
I should build for version one. No nice-to-haves.
Also give me a pricing plan as a single list I can copy.
```

Six features came back: sign-in and a resume dashboard (create, edit, duplicate, delete), a resume editor, AI content generation, PDF export, credits/upgrade, and a pricing page.

### The interview prompt

The beginner mistake is saying "build it" and letting the AI guess every detail — the Pro price, whether there is a free trial, which features are in scope. The fix is to make the AI **interview you**:

> Your job right now is not to write code or scaffold. It is to interview me about the project I am about to describe. Ask in batches and cover every detail and decision.

Then paste the description, the core features, and the stack:

```text
I want to build an AI resume builder. Core features: ...
Stack: Next.js, already deployed on Cloudways; the whole backend on Neon,
including Postgres, storage and authentication.
```

The stack must be stated. Otherwise the AI may pick technologies you have never heard of.

Plan mode asks several rounds of questions, each with a recommended option. The same warning appears as in the other courses: **do not blindly accept the recommendations.** In a product you intend to sell, each choice changes shape and cost.

### PLAN.md and AGENTS.md

Persist the plan:

```text
Write the full plan into PLAN.md.
```

A project usually ends up with three documentation files:

| File | Reader | Purpose |
| --- | --- | --- |
| `README.md` | Humans | What the project is, how to start it |
| `PLAN.md` | Humans and AI | What is being built, architecture and decisions |
| `AGENTS.md` | AI | Rules to always follow, e.g. "always use Tailwind", "commit every change" |

`AGENTS.md` (which absorbed Claude's older `CLAUDE.md`) is **loaded into context at the start of every session**, so rules like "always use this stack" are written once, not repeated in every chat.

## UI: references, then fake data

### Why references are mandatory

Without a reference, the output looks AI-generated: emoji icons, identical cards, flashy animation. The routine is to search Pinterest for `website design` (or `mobile app design`), save a screenshot you actually like into a `design/` folder, then:

```text
Read my PLAN.md and understand the product, then build the landing page.
I attached a UI reference — get inspired by it.
Animate the hero section; the video reference is attached too.
Use the Higgsfield MCP to generate it: image first, then animate.
```

### Where assets come from

- Images: Claude, or free generation in GPT / Gemini.
- Video: Higgsfield's MCP (paid; the author pays about $60/month), generating in the editor.
- Sensible settings: 1080p, 10–12 seconds. 4K burns credits fast.

The author is explicit: **the first generation is rarely right; keep adding references and keep following up.** Many people give up after two or three prompts and conclude that AI cannot design — usually the references were too thin.

### Build the entire UI on fake data

Before touching the backend, build the landing page, the sign-in page and the dashboard with hardcoded data:

```text
Besides the landing page, build the dashboard users actually use,
including generating resumes. Use fake data only for now;
do not implement auth, database or AI yet — simulate everything with hardcoded data.
```

The payoff: you see the finished product immediately, and once the design is settled you ask the AI to delete the fake data and connect the real backend. Swapping the data layer is far cheaper than redoing the interface.

## Code review: when no human can read the diff

After the UI, the agent changed 43 files. The author is blunt: **line-by-line review is impossible**, and it only gets worse — two or three hundred changed files is normal.

The flow is a standard pull request:

1. Create a branch (`ui-design`) from the status bar.
2. Stage everything, let the AI write the commit message, commit.
3. Publish the branch and open a pull request on GitHub.
4. Let CodeRabbit review it.

CodeRabbit returns a summary, a change stack grouped by area (dashboard, account and billing, resume editing, UI, backend), and issues graded by severity. **The most useful part is that every issue ships with a ready-to-paste fix prompt** — no screenshots, no re-describing.

Multiple issues can be fixed in one pass: a "fix all" prompt at the top of the findings list goes to the agent, it commits to the same branch, then you merge the PR and sync the main branch.

The author's summary of this step is worth keeping: **the future of the job is not writing code, it is reviewing and securing it.**

## Backend: Neon in one pass

Neon provides Postgres, auth, storage, realtime, functions and an AI gateway. Create a project with the capabilities you need and it produces setup instructions for an agent.

The key is to state present and target together:

```text
All the data in this project is hardcoded fake data right now.
I want to use Neon as the entire backend and replace it with real data.
Here are the instructions Neon gave me.
```

The agent writes `.env`, creates tables and wires auth. When a console screen is confusing — a wall of URLs, which one to copy — **screenshot it and ask**:

```text
This is what I see in neon.com. Do I need to copy any of these values into the code?
If so, tell me and I will provide them.
```

The author says this screenshot-and-ask habit carried him through publishing an app to the App Store.

Verification happens in the database: sign in with Google once, register with email once, then check Neon's auth panel for the new users and confirm the tables actually contain rows.

### Two things before launch

1. **Add the production domain to the auth provider's trusted domains** (screenshot it and let the agent configure it).
2. **Copy every `.env` value into the hosting platform's environment variables and redeploy** — otherwise production keeps running on old values.

Mark secrets as sensitive so they are masked in the console.

## Payments: Polar and webhooks

Payments are, the author notes, the part almost every tutorial skips. He uses Polar (Stripe and Lemon Squeezy are the alternatives) and starts in **sandbox** so no real money moves.

The console steps can also come from the agent:

```text
Everything in my app works except payments. I want to use Polar but I have never used it.
The screenshot is the sandbox. Give me the steps in order, in simple terms, without over-explaining.
```

Roughly:

1. Create a product in sandbox: name, recurring subscription, $9.
2. Copy the product ID.
3. Create an access token under settings → developers.
4. Put the product ID and token into `.env`.
5. Run the command it gives you to obtain the **webhook secret**; keep that terminal running.
6. Remove the demo billing logic.
7. Tell the agent "all four steps are done" and let it finish the integration.

### What a webhook is

One sentence: **an automated message sent when something happens.**

A user pays, Polar sends a "user paid" event to your backend, and your backend grants access.

Why the secret? Because **you cannot trust events from anyone.** Without verification, anyone could forge "I paid, give me access". The secret proves the event really came from Polar — a security step, not a formality.

### Test, then go live

Sandbox test card: a long string of `42`s, any future expiry, any CVC. A successful payment should redirect to the success page, upgrade the account and add credits.

For production, take the same three values (product ID, access token, webhook secret) from the **live** Polar account rather than the sandbox, and add them to the hosting environment variables.

## Deep security scan

CodeRabbit's AI Deep Scan looks at **the entire codebase**, not just the current PR, including code nobody has touched in years, and it can be scheduled (every Monday at 10 a.m., for example).

To prove it works, the author created a separate repository, had the agent plant vulnerabilities, and ran a deep scan: eight high-severity issues, two medium, one low — covering IDOR, authorization bypass, XSS, broken OAuth configuration, injection and more.

Each finding points at the exact line and can be fixed, turned into a ticket, dismissed, or handed to an AI agent or teammate.

**Why this step is non-negotiable**: AI does not think about security while generating code, and nobody reviewing their own live-coded changes catches IDOR or auth bypass by eye.

## Legal pages

Terms of service and a privacy policy are required to launch, whether a website, a game or a mobile app. The method is again a prompt:

```text
Based on my whole codebase, generate terms of service for my app at /terms.
```

Privacy policy at `/privacy`, same pattern. Afterwards **replace the placeholders by hand**: legal entity name, address, contact details. The AI cannot guess them; feed it the real values once and have it substitute them.

The author notes that an App Store submission built with these exact prompts was accepted on the first try.

## Domain

1. Buy a domain at Cloudflare (the author's recommendation; typically cheaper), sorted by price.
2. In Cloudways, open the project → domain management, add `www.yourdomain`.
3. Cloudways returns a CNAME record (name and host name).
4. In Cloudflare DNS records, add two CNAMEs: one with name `@`, one with `www`, both targeting the Cloudways value.
5. **Turn the proxy off** (DNS only), or certificates and resolution may misbehave.
6. Wait — minutes, sometimes up to 24 hours.

## Check your understanding

**1. Why does the author deploy before writing business logic instead of at the end?**

Reference answer: Once deployed, every commit redeploys automatically, so "live on the internet" stops being a one-off step at the end and becomes a feedback loop throughout. Each feature can be seen at the real URL immediately, and environment, domain or build problems surface early instead of at launch. A companion course on the same theme makes the same choice and notes that working locally does not imply working in production — the sooner that gap shows, the cheaper it is.

**2. What does the interview-style planning prompt solve?**

Reference answer: When you describe requirements directly, every unstated detail is guessed by the AI — the Pro price, whether there is a free trial, which features are in scope. The interview prompt turns the AI into a questioner that asks in batches and makes implicit assumptions explicit. The author stresses reading each question rather than accepting every recommendation, because choices change the product's shape and cost, and stresses stating the stack so the AI does not pick unfamiliar technologies.

**3. Why build the UI on hardcoded fake data instead of wiring the backend first?**

Reference answer: Fake data fills the landing page, sign-in page and dashboard immediately, letting layout and interaction be validated without waiting on the backend. Once the design is settled, the change is confined to replacing the data source rather than redoing the interface. The author's phrasing: build the whole UI with fake data, then have the AI delete it and connect the backend.

**4. What role does a tool like CodeRabbit play in an AI coding workflow, and why can't manual review replace it?**

Reference answer: An AI can change dozens to hundreds of files in one pass, which no human can read line by line without missing things. The review tool scans the pull request automatically, returning a summary, a categorised change stack, issues graded by severity, and a ready-to-paste fix prompt per issue; a deep scan additionally covers the whole codebase and legacy code. Hence the author's claim that the job is shifting from writing code to reviewing and securing it.

**5. What is the webhook secret for, and what happens without it?**

Reference answer: A webhook is an automatic message emitted when an event occurs — for example, the payment provider telling the backend that a user has paid. The secret verifies that the message really came from the provider. Without verification, anyone could forge "I paid" and obtain paid access for free, so the backend must verify the signature instead of trusting arbitrary sources.

**6. Why must environment variables be added to the hosting platform and followed by a redeploy?**

Reference answer: `.env` only affects the local machine; production runs with a different environment. Without adding the variables there, the deployed code cannot read the database URL or secrets and the feature fails. And after changing environment variables, the running instance still holds the old values until a new deployment reads them again — which is why the author redeploys after adding keys.

## How it connects

This note is the complete beginner loop: concepts → environment → deployment → planning → UI → code review → backend → payments → security → legal → domain.

The other two notes in this book are contrasts. One distils the workflow into five steps and three non-negotiables (version control, letting the AI self-test, manual acceptance), useful as a checklist. The other walks a real SaaS project through interview planning, reference-driven UI, Neon backend, Stream realtime and Sentry's automated fixes, with more emphasis on how each step is verified. Together they cover the skeleton, the principles, and the practical detail.
