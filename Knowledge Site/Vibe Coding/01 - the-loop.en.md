---
slug: "01-the-loop"
title: "From Zero to a Paying SaaS: The Full Vibe Coding Loop"
summary: "A complete pipeline: fundamentals, deploy on day one, plan before designing, build the whole UI on fake data, review code with AI, wire a database and auth, take payments with Polar, deep-scan security, add legal pages, and connect a domain."
updatedAt: "2026-10-31"
content_type: "technical-tutorial"
tags:
  - "ai-coding"
  - "saas"
  - "workflow"
  - "code-review"
  - "deployment"
sources:
  - kind: "video"
    title: "The Ultimate Vibe Coding Tutorial for Beginners"
    url: "https://www.youtube.com/watch?v=XLhdE-qV87E"
    author: "Codesistency"
    publishedAt: "2026-10-16"
---

## What this tutorial actually builds

Not a landing page. The goal is a **real SaaS that can take money**: authentication, database, an AI feature, subscription payments, legal pages, and a custom domain.

The sample product is an AI resume builder, modeled on competitors the author says generate roughly $250K in monthly recurring revenue and more than $10M all-time. The tutorial reproduces the core flow, not the full product.

> **Disclosure:** the video description contains promotional links and discount codes for Cloudways and CodeRabbit. The tools are worth knowing, but they are not the only options.

### The loop underneath

The whole course is one repeatable cycle:

1. Plan the project and write the plan down.
2. Generate a UI direction from that plan.
3. Break the product into features (login, dashboard, database, payments).
4. Build one feature at a time.
5. Self-check it manually.
6. Run an AI code review.
7. Fix what it finds, confirm the feature is done, move to the next.

The tutorial's thesis: **writing code is becoming the cheap part; reviewing and securing it is the bottleneck.**

## 1. Setup and the minimum vocabulary

### Tools

| Role | Choice | Note |
| --- | --- | --- |
| AI agent | Claude Code or Codex | Use whichever subscription you have; both run inside VS Code |
| Editor | VS Code | Seeing the file tree helps beginners build intuition |
| Runtime | Node.js | Required by Next.js |
| Version control | Git + GitHub | Local history plus off-machine backup |
| Hosting | Cloudways Velocity (or similar) | Connects to GitHub and redeploys on every commit |
| Backend | Neon | Postgres, auth, storage |
| Payments | Polar (or Stripe, Lemon Squeezy) | Sandbox mode charges no real money |
| Code review | CodeRabbit | Pull-request review plus whole-repo deep scan |

The author puts the minimum spend at **one $20/month AI subscription**; everything else has a free tier.

### Six concepts worth understanding

1. **Frontend vs backend.** The frontend is what you see and touch; the backend is the data and logic behind it. Both together make a full-stack app.
2. **Database.** An organized place to store data, with tables, rows, and columns. The course uses Postgres.
3. **Authentication vs authorization.** Authentication answers *who you are* (email, Google login). Authorization answers *what you may do* (a customer can buy; an admin can add or delete products).
4. **Git vs GitHub.** Git records changes locally as commits, so you can go back. GitHub stores the repository online for collaboration and disaster recovery.
5. **API and API key.** An API lets two applications talk — your app and Stripe, for example. The API key identifies the caller.
6. **Environment variables and `.env`.** Secrets such as API keys and database URLs live in `.env`, which is listed in `.gitignore` and never pushed.

## 2. Deploy on day one

Most tutorials deploy at the end. This one deploys as soon as a first page exists.

1. Create a Velocity server and pick the region closest to your users.
2. Authorize GitHub and select the repository.
3. Press deploy. The platform detects Next.js, builds, and returns a temporary URL.

After that, every push to the repository triggers a redeploy. The tutorial demonstrates the full loop: change the brand name and color palette locally, commit, watch production update.

> **Why it matters:** you have a shareable URL from day one, and every feature can be verified in the real environment instead of discovering deployment problems at the end.

The host also exposes logs, deployment history, and monitoring. When something breaks you can inspect logs and roll back to the last working version — more valuable to a solo developer than the deployment itself.

If a deploy fails, paste the logs to an AI agent with a one-line description of the platform and what failed; the fix is usually immediate.

## 3. Planning: remove the model's room to guess

### Find a proven direction

The author recommends starting from products that already make money (for example, revenue-ranked lists on trustmrr.com) rather than inventing an idea. Pick one with clear scope and build a simplified version.

### Have the AI analyze the competitor

```text
This is an AI resume builder SaaS I like, and I want to build a simplified version.
Analyze the whole website, list its core features, and give me a v1 feature list.
Do not include nice-to-haves; core features only. Also draft a pricing plan.
```

Then narrow it: "simplified version only, nothing complicated."

### Interview instead of guess

This is the step beginners skip, and it is the most expensive one to skip. Ask for a plan directly and the model will invent pricing, trial length, and target users on its own.

Instead, make the AI **interview you first**:

```text
Your job right now is not to write code or scaffold the project.
Interview me in batches, covering target users, the core flow, pricing,
technical constraints, and what "ready to launch" means.
When I describe the project at the end, turn it into a plan.
```

Answer in plan mode, batch by batch, until the plan is complete. The author's warning: **actually read the questions**; do not click the recommended option every time.

### Pin the stack

Fix the technology during planning or the model will pick at random. The example: Next.js + Neon (Postgres, auth, storage) + Cloudways for hosting.

Finally, have it write `plan.md` — a durable reference for every later session.

### Three files, three readers

| File | Reader | Purpose |
| --- | --- | --- |
| `README.md` | Humans | What the project is and how to run it |
| `plan.md` | Humans and AI | The full requirements and implementation plan |
| `AGENTS.md` | AI | Rules loaded automatically at the start of every session |

`AGENTS.md` is the project brief for the agent: "always use Tailwind", "commit after every change", "tests must pass before delivery". Put these there once instead of repeating them in every chat. The older `CLAUDE.md` convention has been folded into the same idea.

## 4. UI: references first, fake data first

### The default output is recognizable

Without references, AI-generated interfaces share a look: emoji instead of icons, purple gradients, the same card and animation patterns everywhere. Anyone who has used these tools for a week can spot it.

The fix is not a longer prompt. It is **giving a reference**: search Pinterest for web or mobile app design, pick a screenshot you like, attach it, and ask the model to follow its layout, palette, and mood without copying the content.

### Images and video

- Stills: have the agent call an image model such as GPT Image.
- Motion: the tutorial uses Higgsfield's MCP — generate an image, animate it, place the result in the hero section.
- On a budget: ChatGPT or Gemini free tiers can produce stills; the workflow is just less integrated.

Then iterate. Remove the non-functional play button, drop the scroll hint, replace the logo, generate more scenes with the same character. The author's experience: **UI almost never lands in one shot; it converges through references and specific feedback.**

### Build the entire frontend on fake data

A key strategy: finish the whole frontend with hard-coded data before writing any backend.

That includes the landing page, sign-in page, dashboard, resume list, editor, billing page, and interactions such as live preview. Walking through the complete product first validates the information architecture and flow. Afterwards, you only need to ask the agent to replace fake data with real sources.

## 5. Code review as the quality gate

A single UI feature produced 43 changed files in the video; later features will produce hundreds. Line-by-line review is not realistic.

The loop:

1. Create a feature branch.
2. Commit and open a pull request.
3. Let CodeRabbit review the PR.
4. It returns a summary, changes grouped by area, and fix instructions you can copy as prompts.
5. Hand the fix prompts to the agent, then commit to the same branch.
6. Merge and sync the main branch.

The review focuses on security: injection, authorization bypass, XSS, broken OAuth. The tutorial's point is that agents write these "without realizing it", and a human reading a 300-file diff will not catch them all.

> **Caveat:** a review lowers risk; it is not a security certification. Verify the main flows and permissions yourself before launch.

## 6. Backend: database, login, AI feature

### Create the Neon project

Enable Postgres plus whichever modules you need (auth, realtime, storage, functions). Neon produces a setup prompt containing organization and project IDs. Give that prompt to the agent together with the project context:

```text
Right now every piece of data in this project is hard-coded fake data.
I want Neon to be the entire backend. Following these instructions,
connect the database and authentication.
```

### Authentication

Configure a provider in the Neon console (the example uses Google only). For console fields you do not understand, take a screenshot and ask the agent whether the values belong in the code.

The author treats "screenshot plus question" as a general technique — he used it for App Store forms as well.

### Verify

After setup, `.env` contains the database URL, auth URL, and JWK values; the file is already ignored by Git. Sign up, sign in, and confirm the user appears in Neon's auth table.

Then move the resume CRUD from fake data to the database and verify create, edit, and PDF download.

### The AI feature

1. Create an API key with OpenAI (or Gemini, Anthropic).
2. Put it in `.env.local`.
3. Ask the agent to implement generation with that key.
4. Test with real data: credits decrease, suggestions can be accepted or rejected.

### Production environment variables

Add each `.env` key to the host's environment-variable panel, mark them sensitive, and **redeploy** — new variables do not apply by themselves.

Also add the production domain to Neon's allowed auth domains, or production login will fail.

## 7. Payments with Polar

### Product and credentials

Create a product in Polar's sandbox: recurring subscription, $9/month, fixed price. You need three values:

| Value | Purpose |
| --- | --- |
| Product ID | Identifies what is being purchased |
| Access token | Lets the server call Polar's API |
| Webhook secret | Proves a callback really came from Polar |

### What a webhook is

When a payment succeeds, Polar sends your backend an automated message: this user paid. You grant access in response.

The security detail matters: without signature verification, anyone can forge "I paid". The webhook secret is how you confirm the message came from Polar. The tutorial forwards webhooks to localhost through a CLI tunnel and keeps that terminal running during testing.

### Test

In sandbox, use a test card: a string of 42s, any future expiry, any CVC. A successful payment should redirect to the success page and unlock Pro. In the video the first attempt errors after the redirect; screenshotting the error and asking the agent fixes it.

For production, replace the three sandbox values with live values, add them to the host's environment variables, and redeploy.

## 8. Deep scan and legal pages

### AI deep scan

A pull-request review only sees the diff. A deep scan examines the **entire repository**, including code untouched for years, and can run on a schedule. Billing is usage-based.

To validate it, the author created a separate repository, had an AI plant vulnerabilities, and ran the scan. It reported 8 critical/high, 2 medium, and 1 low issue. Findings can be turned into fix requests, tickets, or dismissals, and shared with an agent or teammates.

Typical categories: IDOR, authorization bypass, XSS, broken OAuth, injection.

### Legal pages

The author's prompt generates terms of service and a privacy policy from the codebase, placed at `/terms` and `/privacy`. Because it reads what the app actually collects, the first draft is usually closer than a generic template.

**Replace every placeholder**: legal entity name, address, contact details. The model cannot know them. Give it all real values in one pass.

## 9. Custom domain

1. Buy the domain at Cloudflare (the author says pricing is usually lower).
2. Add it in the host's domain management (root plus `www`).
3. Copy the CNAME name and target the host provides.
4. In Cloudflare DNS, add two CNAME records — `@` and `www` — with that target, proxy status **DNS only**.
5. Wait for propagation (minutes to 24 hours).

If the app errors after the domain resolves, check that production environment variables are complete and redeployed, then check that Neon includes the new domain.

## Reproducible checklist

- [ ] A live URL exists on day one and "commit triggers deploy" works.
- [ ] `plan.md` came from an interview; pricing, users, and scope are explicit.
- [ ] `AGENTS.md` contains commit and test rules.
- [ ] The UI has explicit references and every screen runs on fake data.
- [ ] Every feature went through branch → PR → AI review → fix → merge.
- [ ] Database, auth, and AI keys arrive through environment variables; `.env` is not committed.
- [ ] Payments work in sandbox with a test card and webhook verification.
- [ ] A full-repository deep scan ran before launch.
- [ ] Legal-page placeholders are replaced.
- [ ] Domain, production variables, and auth callback domains agree.

## Limits and cautions

- **This is one toolchain.** Cloudways, Neon, Polar, and CodeRabbit are replaceable; the steps change, but the principles — deploy early, plan first, fake data first, review as a backstop — do not.
- **Generated is not maintainable.** Fake-data UI gets you to a demo fast; real data migration and edge cases still need work.
- **Security is not a single scan.** Deep scans catch known patterns; permission design and business-logic flaws still need judgment.
- **Cost.** Subscriptions, hosting, domains, payment fees, and review services add up. The tutorial leans on sponsors and free tiers; long-term cost needs its own calculation.
