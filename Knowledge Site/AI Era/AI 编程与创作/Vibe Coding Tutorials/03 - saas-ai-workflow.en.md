---
slug: 03-saas-ai-workflow
title: "Shipping a Full-Stack SaaS with AI: Planning, UI, Backend, and Self-Healing"
summary: "A reusable end-to-end workflow, demonstrated on a personal-training platform: interview-style planning, UI built from visual references, one feature at a time with manual checks; Neon for the backend, Stream agent skills for chat and video, and Sentry for monitoring and automated fixes."
updatedAt: 2026-11-01
content_type: technical-tutorial
categories: [ai-coding, software-engineering]
tags: [ai-coding, saas, full-stack, deployment, debugging]
sources:
  - kind: video
    title: "How Senior Developers Use AI to Build SaaS - Full Workflow"
    url: "https://www.youtube.com/watch?v=-QCBtAfPHo0&t=10s"
    author: "Codesistency"
    publishedAt: "2026-10-30"
---

## What this walkthrough is about

Building a pretty static site with AI is easy. Turning that site into a real application is not: you need authentication, payments, a database, realtime updates, video calling, messaging — and all of those pieces have to work together.

The demo project is a **personal training and coaching platform**. Users discover trainers, buy workout programs, watch video lessons, chat with trainers, and book one-on-one sessions. Trainers get a dashboard to manage clients, upload lessons, and track earnings; the platform takes a commission.

The stack is the author's example, not a universal recommendation:

| Layer | Tool | Role |
| --- | --- | --- |
| Framework | Next.js | Full-stack app |
| Backend | Neon | Postgres, auth, storage, functions, realtime |
| Chat & video | Stream | Messaging, replies, threads, typing indicators, 1:1 calls |
| Media | ImageKit | Video upload, image optimization, adaptive player |
| Payments | Stripe | One-time purchases and platform commission |
| Observability | Sentry | Error tracking, session replay, AI debugging |
| Hosting | Cloudways Velocity | Deployment and auto-redeploy |

The author stresses repeatedly: **the application is not the point — the workflow is.** Plan first, then design the UI, then implement one feature at a time, checking manually and having AI review each one before committing and moving on.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Project preview and workflow overview |
| 3:02 | Environment: Node.js, VS Code, choosing an AI tool, bootstrapping a small Next.js app |
| 12:00 | Deploy to Cloudways Velocity; connect GitHub for auto-deploy |
| 24:32 | Planning: plan mode where the AI interviews you; produce PLAN.md |
| 41:37 | UI: build the full interface from a Pinterest reference with fake data |
| 54:12 | Backend: Neon auth, database, realtime |
| 1:17:43 | Stream agent skills: chat and video calls |
| 1:33:48 | Sentry: monitoring, session replay, automated fixing |
| 1:58:41 | ImageKit: image optimization and the video player |
| 2:07:32 | Wrap-up: Stripe left as an exercise; commit and deploy |

## The workflow is a loop

Remember the shape before the details:

1. **Plan** — what you are building, which pages, user flows, stack. If you do not know, the AI guesses.
2. **Design the UI** — from a visual reference, not from thin air.
3. **Implement one feature.**
4. **Check it manually** — click through it yourself.
5. **Have the AI review the code.**
6. **Fix, then commit** — save progress when the feature is done; otherwise repeat.
7. More features? Back to step 3. None left? Done.

The order of steps 4 and 5 matters: **confirm the feature behaves correctly before asking AI to review the code.** Otherwise it may optimise toward the wrong target.

## Step 1: Environment and deployment

### Get the smallest possible app running

After installing Node.js and VS Code, create an empty folder and drag it into the editor. Any agent works (Claude Code, Codex, Cursor); the commands differ, the workflow does not. The author suggests at least the $20/month tier, which is enough to follow along.

Validate the toolchain with the simplest possible request:

```text
build me a nextjs project, keep it simple, a habit tracker application
```

The habit tracker is not the real project — it only proves the agent can create and run an app.

```bash
npm run dev
```

Add a habit, reload, confirm the data persists. Toolchain verified.

### Deploy early, and wire up auto-deploy

The author deploys before writing any business code. The value is easy to underestimate: **from day one there is a real, reachable URL**, and every later feature can be seen in production immediately.

Create a GitHub repository and push (you can hand the agent the git commands to run). In Cloudways Velocity, connect GitHub, pick the repository, and deploy. The platform detects Next.js automatically; a temporary domain appears within a minute or two.

The important part is auto-deploy: the platform watches the repository and **redeploys on every new commit**. Day-to-day work becomes:

```text
Add a light/dark mode switch to this project, then commit and push to my repo.
```

The agent edits, commits, pushes; the platform redeploys; the live URL is updated a few minutes later. No dashboard visit required.

## Step 2: Planning — let the AI interview you

The most common beginner mistake is opening the editor and saying "I want to build X, please build it." You cannot think of every detail on day one, but there is a way to surface them: **plan mode plus an interview prompt.**

The prompt's core instruction:

> Your job is to interview me about the project I am about to describe. Ask about every detail and every decision; do not guess features.

The example is concrete: when payments come up, the AI asks whether to use Stripe, whether it is one-time or subscription, and whether the monthly price should be $20 or $50. A single pass can produce 20–30 questions.

Describe the stack along with the product:

```text
I want to build a full-stack personal training and coaching platform with Next.js.
Users discover trainers, buy workout programs, watch video lessons,
chat with trainers, and book one-on-one sessions.
Trainers get a dashboard to manage clients and see programs and earnings.
Stack: Neon for Postgres, auth and realtime; Stripe for payments;
Stream for chat with reactions, replies and threads plus 1:1 video;
Sentry for error tracking and automated debugging;
Cloudways for hosting; ImageKit for image/video upload, optimization and player.
The UI should look modern and premium.
```

### Answer the questions with judgment

One easily missed detail: **do not blindly accept every "recommended" option.** In a tutorial it is fine to save time, but in a project you intend to monetize, different answers change the product's shape and cost. Read each question.

When the plan appears, read it end to end, reject it with your edits if something is wrong, then accept.

Finally, persist it:

```text
Save this plan to a file called PLAN.md.
```

### How PLAN.md and AGENTS.md differ

- `PLAN.md` — what this project is: architecture decisions, stack, assumptions.
- `AGENTS.md` — rules for the AI, like a README whose audience is the agent: "always use this stack, never that one", "commit after every change".

`AGENTS.md` is special because **it is loaded into context even when you do not reference it.** That makes it the right home for constraints that must always hold.

## Step 3: UI — references, not adjectives

Asking for "a really nice UI" produces something generic. The author's routine has three fixed steps:

1. Create a `design/` folder.
2. Search Pinterest for `website design`, narrowed by domain (`fitness website design`), and save a screenshot you actually like.
3. Attach the image and say it is the inspiration.

The instruction is roughly:

```text
Analyze PLAN.md and build the entire UI for the application.
Use fake data for now; do not integrate auth, database or payments yet,
just the UI with hardcoded data.
Get inspired by the image I attached.
```

Two details worth copying:

- **Full UI first, real data later.** Fake data lets you see the whole product immediately; once the UI is settled, swap the data source. That is exactly what the backend section does.
- **Generate assets separately.** Screenshot the reference, send it to GPT or Gemini, and ask for "this background image without text or logos"; or use a tool such as Higgsfield through MCP so images are generated without leaving the editor.

Some interactions in the generated UI are fake (booking a slot does nothing). That is intentional. Screenshot what is wrong, describe it, and let the agent iterate until it is right.

## Step 4: Backend — Neon

With the UI in place, replace fake data with real data. Neon provides Postgres, auth, storage, functions, an AI gateway, and realtime.

The key move is not "have the AI write code" but **have the AI tell you what it needs**:

```text
Here is the integration documentation I got from Neon. Read PLAN.md first,
then implement authentication and create some real data in the database.
If I need to do anything in the Neon dashboard, give me a to-do list.
If you need any values, tell me and I will fetch them.
```

That "give me a to-do list" pattern recurs throughout. The first time you use a console you do not know which value to copy or which button to press; asking the agent to enumerate its requirements beats guessing.

Practical points:

- Put the database URL, auth URL and similar values in `.env.local`; strip the quotes you get when copying.
- Authentication runs on Better Auth; before going live, add the production domain to the trusted domains list.
- **Changing environment variables requires a new deployment**, or production keeps the old values.
- When unsure (for example, "do I need to allow localhost in development?"), screenshot and ask instead of guessing.

Verification is concrete: sign in with Google once, register with email once, then check the Neon auth panel — new users appearing there proves the chain works.

### Test realtime with two accounts

After booking is implemented, open a second browser, sign in as another user, and put the windows side by side: book a slot in one; the other should disable that slot **without reloading**.

The first attempt failed. The fix was not log reading but **screenshot + description + requirement**:

```text
This is what I get every time I try to book a session (image attached).
Please fix it and make sure everyone receives the update in realtime.
```

After the fix, the realtime update worked. This is one of the most useful debugging habits in the whole video: a screenshot carries far more signal than a paragraph.

## Step 5: Realtime chat and video — Stream agent skills

Building chat and video from scratch is expensive — signalling, media servers, scaling. Stream provides the SDKs. Its **agent skills** solve a different problem: teaching the AI how to use those SDKs correctly.

Install the CLI, log in, and initialise:

```bash
npm install -g @stream-io/stream-cli
stream login
stream init
```

Initialisation asks for the organisation and app, then which tool to install skills for (Claude Code, Cursor, Codex). The skill pack documents the current SDK inside your project. You can then type `stream` in the editor and ask things like "how do I generate a user token in Node.js".

**Why it matters:** without the skills, the AI guesses at APIs from its training data, which may be outdated. With them, it reads the current official documentation.

The integration prompt should state boundaries:

```text
Integrate Stream chat and video into my existing Next.js application.
Preserve our current authentication backend and UI design.
Add realtime messaging with channels, reactions, replies and threads,
plus video calls with camera and microphone controls.
Use secure server-side token generation and follow the latest official SDK docs.
```

Then verify each capability: camera on/off, microphone on/off, join, reactions, recording, screen sharing, ending the call.

The chat UI was broken at first — buttons hidden, threads unreachable. Again: screenshot plus "the UI is completely broken, fix it; you can use the browser to test until it looks right." With the Chrome MCP connected, the agent could open the page itself, and one prompt fixed it.

Then exercise the chat: send messages, react, open a thread, send to the main chat as well, attach files, use the GIF command, edit, delete, quote. Commit when it holds up.

### A real deployment failure

The deploy after committing failed. The cause was plain: **the Stream API key and secret existed only locally, not in the hosting platform's environment variables.** Add them, save, redeploy — success.

This failure is typical. Local working does not imply production working; environment variables are the most common gap.

## Step 6: Observability — Sentry and automated fixes

Users do not email you when something breaks. They close the tab and do not come back. Sentry is the watchtower: it captures the error, records the session, and supplies context.

Three capabilities matter here:

1. **Error monitoring** — when, how often, the stack trace, request and user context.
2. **Session replay** — a screen recording around the error, so you can see what the user clicked before it broke.
3. **AI debugging (Seir)** — reads the code, finds the root cause, proposes a fix, and opens a pull request for review.

Setup is now "let the agent do it": copy the agent setup command from the Sentry console, run it in the terminal, paste the generated prompt into your coding agent. OAuth happens through MCP — the author's first attempt failed, and re-running `/mcp` and authenticating again fixed it.

### Manual path: analyse → plan → fix → PR

Trigger a deliberate error, open the issue, and:

1. Start the analysis; Seir reports the root cause and reproduction steps.
2. Ask it to make a plan.
3. Ask it to write the fix.
4. Generate a pull request.
5. Review and merge.

**One trap:** Seir reads code from GitHub, not from your local disk. Push before asking for a fix, and configure the GitHub integration and repository mapping.

### Automated path: threshold-triggered fixes

With code mappings configured, an error that fires more than a threshold (about ten times in the demo) causes Seir to analyse, fix, and draft a PR automatically. The author had the agent fire an error 15+ times, then found ready-made PRs on GitHub; merging is the only human step.

Then sync locally:

```text
I just merged a pull request. Please pull the latest changes into my codebase.
```

### Logs and traces

Do not ship `console.log` to production. Sentry's structured logs are tagged, queryable, stored in the cloud, and linked to traces, errors, and replays. With a handful of users it feels unnecessary; with hundreds or thousands it is the only way to find out what happened.

## Step 7: Media — ImageKit

ImageKit handles upload, storage, transformation, and delivery for images and video.

- **Transformation in the URL** — resize, crop, rotate, overlay by changing URL parameters; one upload serves an avatar, a header, and a card.
- **Automatic optimization** — compression and modern formats such as WebP and AVIF.
- **Video player** — adaptive bitrate, subtitles, chapters, preview thumbnails; lesson videos can stay private so only buyers can watch.

The integration prompt follows the same pattern:

```text
Add ImageKit to this application, covering phases three and four in PLAN.md.
Features: ...(list)
Tell me which environment variables you need and which ones to add to Cloudways.
```

Every ImageKit documentation page has a "Copy for LLM" button, which hands the whole page to the agent without manual rewriting.

## Methods that carry across the whole build

1. **Plan before building.** The interview prompt turns "AI guesses features" into "you answer questions" — the highest-leverage step in the video.
2. **Give references, not adjectives.** "Modern and premium" carries almost no information; one screenshot aligns taste instantly.
3. **One feature at a time, verified and committed.** Implement → check manually → AI review → fix → commit.
4. **Let the AI tell you what it needs.** Which console button to press, which value to copy — ask for a to-do list.
5. **Screenshots are the most efficient bug reports.** An error screen, a misplaced button, a failed state — image plus requirement beats prose.
6. **Local ≠ production.** Environment variables, domain allow-lists, and redeploys are the three usual suspects.
7. **Add observability early.** Once real users exist, invisible errors cost more than visible ones.

## Check your understanding

**1. Why does the author check a feature manually before asking the AI to review the code, rather than the other way round?**

Reference answer: An AI review covers the implementation layer — structure, edge cases, latent bugs — and assumes the code is doing the right thing. If the feature does not behave as intended, reviewing first may optimise toward the wrong target and waste a round. Confirming behaviour manually and then asking for a code review checks two different layers; reversing the order blurs them.

**2. What problem does the interview-style plan-mode prompt solve, and why is it better than describing the requirements directly?**

Reference answer: When you describe requirements directly, every unstated detail is filled in by the AI's guesses, which is how finished products drift from expectations. The interview prompt turns the AI into a questioner: it confirms decisions one by one — payment method, subscription price, how trainers onboard — making implicit assumptions explicit. A pass can generate 20–30 questions covering exactly what you had not thought about. The author also warns against blindly taking every recommended answer, since some choices change the product's shape and cost.

**3. Why build the UI with fake data first and connect real data only after the design is settled?**

Reference answer: The UI phase aims to validate layout and interaction quickly. Fake data fills every page immediately, independent of backend progress; wiring real data and auth first means any backend problem blocks UI iteration. Once the design is final, replacing the data source does not require rebuilding the interface, so the change stays contained. The backend section follows exactly this order.

**4. Why must the GitHub integration and code mappings be configured before Seir can fix anything?**

Reference answer: Seir reads source code from the GitHub repository, not from your local working copy. Without the integration it has no code; without mappings (project → repo → branch) it does not know where to look. If either is missing, analysis fails or changes the wrong place. Also, push local changes first, otherwise the fix is generated against stale code.

**5. What is the most common cause of deployment failure, and which two examples does the walkthrough give?**

Reference answer: Environment drift between local and production, most often environment variables. Example one: the Stream API key and secret existed only locally, so the deploy failed until they were added to the host and redeployed. Example two: after changing environment variables you must trigger a new deployment, or production keeps the old values. A related case is the auth provider requiring the production domain to be added to its trusted list — another difference that only appears on launch.

**6. What do Stream's agent skills actually solve? What happens without them?**

Reference answer: They package the current official SDK documentation as AI-readable skills inside the project, so the agent writes Stream code against the current API instead of outdated training data. Without them, the AI tends to use stale or invented interfaces — code that looks plausible but fails at runtime. With them you can ask "how do I generate a user token in Node.js" and get an answer for the current version, and the integration prompt can legitimately require following the latest official docs.

## How it connects

This is the hands-on version of shipping a full application with AI: planning, UI, backend, realtime, observability, and media stitched into one pipeline. What matters most is each step's **verification method** and the **form of the input you give the agent** — a plan file, a reference image, a to-do list, a screenshot.

The other notes in this book provide contrast. One distils a general five-step workflow and three non-negotiables (version control, letting the AI self-test, and manual acceptance); another builds a monetisable SaaS from scratch, covering deployment, database, payments, and security scanning. Read together, they separate the workflow skeleton, the practical detail, and the tool choices, so you can swap one layer when the project changes.
