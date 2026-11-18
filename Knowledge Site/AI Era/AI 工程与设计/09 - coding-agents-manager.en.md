---
slug: 09-coding-agents-manager
title: "Your Coding Agents Made You a Manager"
summary: "Addy Osmani argues that anyone who spends the day with a coding agent is already managing: choosing work, writing briefs, delegating, following up and accepting results. The edge is not prompt craft but giving agents runnable checks, the context they cannot read, corrections that compound into checks, and never delegating the judgment that has to stay human."
updatedAt: 2026-11-18
content_type: opinion
categories:
  - ai-era
tags:
  - ai-agents
  - management
  - delegation
  - code-review
sources:
  - kind: article
    title: "Your coding agents made you a manager"
    url: "https://x.com/addyosmani/status/2119332146485891501"
    author: "@addyosmani"
    publishedAt: "2026-11-08"
---

## The real question: you are already managing

If you spend the day with a coding agent, you are managing. You repeatedly pick tasks, write instructions, delegate, follow up, evaluate results and decide what ships. Addy Osmani's observation is that the engineers who get the most from agents are not necessarily the best prompt engineers; they are the ones who learned to manage, intentionally or otherwise.

The idea can land badly. Many engineers chose the individual-contributor path to stay close to the work, and they have watched friends become managers and disappear into their calendars. Osmani clarifies first: he is not telling you to become that kind of manager, and he is certainly not saying agents replace managers or colleagues. He uses "management" in a narrow sense — **producing good outcomes by enabling someone else's work**.

He offers a useful entry point: every gripe you have about a bad manager is a bug report for interacting with agents. Think about handoffs. A bad one feels vague, lacks context, or keeps shifting expectations. ICs have spent years on the receiving end, so they often know what a good handoff looks like — exactly the experience that transfers to agents.

The original sections are roughly ordered by impact, so the highest-leverage habit comes first. This draft follows that order and adds one clearly marked case at the end to connect the moves.

## Give it a way to check whether it is done

**Source advice:** give the agent a mechanism to validate its work — a test suite, a build, a screenshot — and have it show you the results as proof. The **anti-pattern** is treating "looks done" as confirmation, which makes you the agent's test suite.

The analogy starts with managers. Ask an experienced manager how they can be confident without reading everything, and they will talk about guardrails: CI, code review, dashboards, on-call. An inexperienced manager without guardrails ends up validating everything personally and becomes the bottleneck within a quarter. The agent version is starker: models stop when the work looks done. With no validation, "looks done" is the only validation available.

The mechanism can be almost anything as long as it yields a definitive pass or fail: tests, build exit codes, linters, diff scripts, screenshots. The practice guide Osmani cites goes further, calling the command that runs these validations the single most useful line in `CLAUDE.md`.

Once the mechanism exists, there are four ways to wire it in:

- **Ask.** "Run the auth tests afterwards and keep going until they pass."
- **Set a goal.** `/goal` has a separate model check a condition after every turn, which is most useful for long background work.
- **Enforce.** A Stop hook can prevent the turn from completing until the typecheck passes.
- **Have it reviewed.** `/code-review` sends the diff to a fresh subagent that never saw your conversation, much like authors do not approve their own PRs.

Scope the review, too. Ask it to find problems and it will always find something; ask it to find correctness issues and ignore style, and it will do that. Osmani notes that good managers ask for feedback the same way.

**Note:** the real issue here is ownership of validation. If verification depends on your eyes each time, more agent output simply makes you the bottleneck. If verification is a command the agent can run, it enters a do-run-fail-fix loop by itself. Skills, hooks, subagents and MCP all tighten that loop so your attention goes only where the agent cannot verify.

## Set the context it cannot read

**Source advice:** give the agent a clear summary of what it cannot learn from the repo: the objective and why it matters, constraints, out-of-scope items and success criteria. The **anti-pattern** is a one-line task with the real expectations living in your head — or the reverse, padding the brief with things the agent would discover by reading the code.

Effective managers describe the desired outcome, constraints and objectives, then leave the how to the person doing the work. The military calls it commander's intent; Netflix calls it "context, not control."

The difficulty is knowing what context the agent is missing. A coding agent reads your code first; current models pick up folder structure, conventions and test setup far faster than you could describe them. So think before you write: if the agent can read it in the code and would actually go read it, say nothing. Spend words on what is not in the repo — a meeting decision, someone's internal deploy process, why this task matters, what "done" means this time.

He turns a vague task, "make the dashboard faster," into a brief (the numbers are explicitly examples):

```text
Get p95 load time for the /team dashboard under 2s for orgs with 10k+ members.

Why: enterprise admins open it daily, and slow loads are their top support ticket.

Constraints: no schema changes; keep the API response shape.

Out of scope: UI changes; caching the whole page.

Check: run scripts/perf/team.sh and show before and after numbers.
```

Not every task needs this. Discovery work is fine with a generic prompt, refined as you go. If you are not ready to write a prompt, have the agent interview you until it could write the spec, save that spec to a file, and start a new session from it. The spec also becomes something to review against later.

The agent may also need access to other tools: the issue tracker, the error dashboard, team chat. Treat it like a new hire. For a CLI it already knows, such as `gh`, you often need to say nothing.

## Make every correction compound

**Source advice:** when you correct the same thing more than once, document it in the team's `CLAUDE.md` or turn it into a shared skill. Periodically check whether newer models still need the correction. The **anti-pattern** is manually correcting the same thing every session, or relying on tacit knowledge that exists only on your machine.

Teams that get value from `CLAUDE.md` update it semi-often and record lessons from mistakes worth preventing. Some even mention `@claude` in code reviews, turning feedback into permanent policy.

Keep it short. Four kinds of content belong there:

- how to verify something, with exact commands;
- misleading areas of the code;
- decisions that do not exist in the repo;
- anything you have corrected twice.

**Note:** all four share a property: they come from experience and disappear if not written down. Writing compounds because it outlasts people changing teams and models being replaced. That is also why it bloats easily, and why the article keeps insisting on brevity — a long rule file dilutes the constraints that matter.

## Let it decide, and enforce only what cannot bend

**Source advice:** let the agent decide by default; use hard enforcement such as hooks or deny rules only for the few things that must always or never happen. The **anti-pattern** is ALL-CAPS rules, hooks for optional preferences, or habits kept long after newer models outgrew them.

Osmani cites Andy Grove's task-relevant maturity: the level of supervision should depend on a person's history in that specific task, not their overall capability. An old piece of advice to new managers says the same: give people a little more latitude than you are comfortable with while backing them up and holding them accountable.

Claude Code makes the distinction explicit: prompts, `CLAUDE.md` and skills are **requests** the model can consider and decline; hooks, deny rules and managed settings are **requirements** that are always enforced. In most cases you want the agent to make the call, because a model looking at real code may be better placed to judge whether a guideline applies than a rule you wrote in advance. Save enforcement for hard requirements such as "never edit the generated client" or "always run the license-header script."

The advice cuts both ways. If you keep emphasizing a `CLAUDE.md` line and the agent still ignores it, it should be a hook. If a hook expresses a preference rather than a requirement, remove it and let the agent decide. It is like retiring a process the team no longer needs. Revisit this when a new model arrives: habits you can drop include ALL-CAPS directions, "think harder" (effort is now a setting) and "don't be lazy." On current models these tend to produce over-enforced rules and overwork. With agents, **over-process is the new micromanagement**.

## Plan before it builds

**Source advice:** agree on a plan before coding, read it for underlying assumptions, and partition work into non-overlapping parallel slices. The **anti-pattern** is letting several agents take overlapping tasks and then spending the afternoon on merge conflicts and duplicated decisions.

A good workflow is to enter plan mode, iterate until the plan is right, then delegate the coding. With a good plan, the model can often build it in a single pass. For larger tasks, use a second session to read the plan the way a staff engineer would; that is a design review, the cheapest place to catch a wrong turn. Look for underlying assumptions — in a one-on-one, the question is "what are you unsure about?"

Decomposition is increasingly delegated too. `/batch` takes a large mechanical change, creates 5 to 30 tasks, displays the plan, executes them in separate worktrees (separate checkouts of the repo), and opens a PR for each. You no longer divide the work yourself; you check the slices for overlap and make sure shared interfaces land first. Otherwise you get false parallelism: five agents on overlapping tasks do not produce five times the output, they produce one merge conflict with five authors.

## Steer early, reset fast

**Source advice:** watch the first minute and steer; correct as soon as it goes off course. After two failed attempts to correct the agent, start a fresh session with a better prompt. The **anti-pattern** is a third or fourth attempt to correct the agent instead of correcting the request.

An experienced manager knows that when a capable person misses repeatedly, the problem may be upstream in the instructions, context or scope. The agent version is explicit: hit Esc the moment it drifts. After two failed corrections, clear the session and write a better prompt with what you learned. A third correction mostly adds information the model has to keep re-reading, including the failed attempts.

Cheap rollback changes the calculus. `/rewind` rolls code and conversation back to an earlier point, making it low-risk to try a more ambitious approach first. Good managers do the same with people: if undoing a mistake is cheap, let them try; run the retro afterwards and generalize the fix into `CLAUDE.md`.

**Note:** this advice assumes the failure came from a bad request. If it came from permissions, the environment, an external service or a changed requirement, a restart just repeats the collision; fix the environment or the requirement instead of the prompt.

## Delegate the task, never the judgment

**Source advice:** the agent does the work; you decide the important things — product calls, security boundaries, what ships. Treat every diff as something you will be paged for. The **anti-pattern** is approving a large diff because the tests are green and the names look reasonable: that is not code review, it is code ratification.

No manager can say "my report shipped that, not me." Osmani admits falling into this trap himself. He told an agent to research competitor gaps and write local PRs to close them. He read the research, skimmed the code, and almost pushed changes that added complexity for users with little gain. He had delegated the work and almost delegated the decision. The trap is easy: a 600-line diff, reasonable names, green tests — approve.

His suggested split: let agents handle style, linting, review follow-ups, typical bugs and unit tests; let humans handle security boundaries, compliance and product decisions.

Coordination works the same way. An agent can track handoffs, but choosing between competing requests and getting people to commit is still a human job.

You do not need to be in the inner loop of every change. You need to own the outer loops: what the constraints are, how much of the output you actually read, what evidence you keep, and what a human must sign off on. Keep changes small, because **the unit of review is the unit of comprehension**.

## Design the run that does not need you

**Source advice:** before deploying an autonomous task, define done, self-verification, boundaries, guardrails and human approval. The **anti-pattern** is starting a long run before bed with no definition of done or stopping point, then waking to find the model worked all night on a faulty premise.

Skip-level managers do not manage individual engineers' work; they manage goals, guardrails, checkpoints and leads. Agents are following a similar trajectory: they already delegate to subagents and can run on schedules, after CI failures, or when a new PR opens. The frontier is self-governing systems that start, self-verify, and call for a human only when a decision is needed.

The role shifts from controlling the session to designing the loops. Five questions for an unattended run are the same ones a good manager asks before handing a project to a senior engineer and going on vacation:

- Does it know what done looks like? (A goal condition, a spec file, or a failing test it must turn green.)
- Does it have a self-verification mechanism? (A test suite, a Stop hook, a review step.)
- What are its boundaries? (Permission controls, a sandbox, a worktree, or the one branch it may push to.)
- What are its guardrails? (A turn limit or a spend limit.)
- Where does it produce output, and who approves it? (A PR or summary; a human approval for any irreversible action.)

Two more habits managers will recognize: pilot the job on three files, iterate the prompt, then run the rest; and watch the first few runs of anything new before trusting it unattended. Think of it as a probation period.

## Scale verification, not attention

**Source advice:** scale agent use only as fast as checks, goals and fresh reviewers can take over the watching, and measure quality as well as throughput. The **anti-pattern** is opening more sessions than you can review well, and measuring success by how much code the AI wrote.

Managers learn their span of control quickly: past a certain number of reports, everyone gets less of the manager and quality drops. Agents are the same. Osmani calls it the **orchestration tax**: past the first few agents, each additional one demands more attention than the last. Most days he runs four or five background agents plus a few local sessions, and some days that is too many.

Managing many sessions is not about being hyper-focused; it is about delegating most monitoring to self-evaluation, goals and fresh-context reviewers, and reserving attention for decisions. Notifications instead of polling, plus a centralized view of background jobs, help. The hard conclusion: **you cannot scale the number of agents by monitoring more, only by needing to monitor less.**

Then measure the system, not the activity. Useful metrics include PR cycle time, ramp-up time for new employees, and the frequency of reverts or rework. The percentage of AI-written code is not a useful goal, because what you want is quality and reliability. Grove's rule about measuring with a countermeasure applies: if you measure PRs merged, also measure reverts and rework.

## Decide what not to build

**Source advice:** ask who needs it, how you will know it worked, and what would make you stop; limit work in progress. The **anti-pattern** is throwing every plausible idea into a PR because building is cheap — you end up with a junk drawer the team has to review, secure, support and maintain.

The most important word a manager says is often "no." With agents, "no" is harder: starting work is nearly free, and any plausible idea can become a PR by lunch. But review and validation are the scarce resources now.

Osmani argues the old management questions matter more than they used to: who asked for it, how do we measure success, when do we stop? When building is cheap, the hard question is not "can we?" but "should we?"

## Note: one reusable delegation, end to end

This example applies the article’s practices to one change.

Suppose an internal team dashboard loads slowly for large organizations. The task is to optimize one query and bring the 95th-percentile (p95) load time below two seconds on representative data, while preserving the schema and API response shape.

| Step | What you do | Principle |
| --- | --- | --- |
| 1. Write the brief | Target p95, why it matters, no schema changes, out of scope is whole-page caching, acceptance is `scripts/perf/team.sh` | Give context it cannot read |
| 2. Ask for a plan first | Have it list files, say whether the API shape changes, and explain rollback; review the assumptions | Plan before it builds |
| 3. First run | In the first minute, check whether it opened the schema; require before-and-after numbers from the acceptance command | Give it a way to know it is done |
| 4. Two failed corrections | Start a new session; put the failure and "do not change the API shape" into the new brief | Steer early, reset fast |
| 5. Same correction twice | Add a type or lint constraint, or write it into `CLAUDE.md` | Make correction compound |
| 6. Human review of three things | Does the query preserve access filters, return equivalent results, and qualify for release | Delegate the task, not the judgment |
| 7. Afterwards | Put the acceptance command and the pitfall into a team skill | Design the run that does not need you |

Here the agent owns implementation and self-checking; the human owns whether to do it, where the boundary is, whether the evidence is trustworthy, and whether it ships. Rewrite step two as "let the agent decide whether to change the API" and you have delegated the judgment — exactly what the article warns against.

## Where the analogy breaks

**Author's view:** the analogy is useful but imperfect, and the best practitioners know where it fails:

- **Managing people is harder, and the skills do not transfer back.** Running five agents does not prepare you to manage five people. There is no equivalent for motivation, conflict, career development or months-long trust building.
- **Rework is almost free.** You can ask an agent for things you would never ask a person. A technical debate at the whiteboard becomes "build two or three options and let me compare."
- **Agents have no experience, only a notebook.** Auto memory records notes on one machine and does not transfer to a teammate's session. It is not the judgment you accumulate over a career, so those lessons have to be written down for the whole team.
- **Agents are eager and confident.** Ask a good engineer to do something wrong and they push back; agents are more likely to comply, and you are more likely to overtrust them. Osmani cites Wharton research on cognitive surrender: on the tasks used in that study, participants accepted faulty AI answers most of the time and grew more confident. One countermeasure is to ask the agent to argue against its own answer.
- **You have one agent archetype, and it changes every few months.** Human teams have diverse strengths; your agents share the same strengths and weaknesses, which shift with each model release.
- **You still have to train junior developers.** When agents take over the starter work juniors need for fundamentals, a manager has to create those reps intentionally.
- **The human team still matters.** You can spend a day managing agents and not notice that you crowded out the time it takes to build a cohesive team.

## You do not need the title

**Author's view:** good staff engineers have always worked this way — writing the design doc, setting context, reviewing thoroughly, making the people around them better. Agents let every engineer do it on day one. They are a crash course in management: feedback in minutes instead of quarters, and mistakes you can undo. The job is becoming less about writing code and more about being the reason good code gets written.

Nobody is born a great manager or engineer; skills come from practice, and agents make practice cheap. He closes with six concrete moves:

- Every task needs a check it can run; ask for the proof.
- Tell the agent what it cannot see; omit what it can.
- Walk through the plan before the code.
- Corrected the same thing twice? Log it in `CLAUDE.md`. Repeated workflow? Make it a skill.
- Two failed corrections? Restart and rewrite the prompt.
- Review the diff as if you will be paged for it.

You do not have to want to be a manager. But engineers who do well with agents will learn to manage along the way.

## Understanding check

**1. Why is "give the agent a validation mechanism" more effective than asking it to try harder?**

Models stop when the work looks done. Without validation, "looks done" is the only signal available. With a runnable check, the agent enters a do-run-fail-fix loop and no longer needs you as the test suite. That also moves your attention to the parts only a human can judge.

**2. What exactly does "delegate the task, never the judgment" split, and what does the author's own counterexample show?**

It splits execution from decision: agents can implement, handle style and lint, follow up on review, fix typical bugs and write unit tests; humans keep product calls, security boundaries, compliance and shipping. Osmani let an agent research competitor gaps and write PRs, skimmed the result, and almost shipped changes that added user complexity for little gain. He delegated the work and nearly delegated "should we do this at all" — showing that a large diff, green tests and plausible names cannot replace judgment.

**3. Why can't you scale agents by monitoring more?**

Because attention has a span of control. Past the first few agents, each additional one costs more attention than the last — the orchestration tax. The workable path is to hand monitoring to self-evaluation, goal conditions and fresh-context reviewers, keep humans for decisions and exceptions, and measure system outcomes such as cycle time and rework rather than the share of AI-written code.

## Source

- Addy Osmani (@addyosmani), *Your coding agents made you a manager*, 2026-11-08: <https://x.com/addyosmani/status/2119332146485891501>

This draft is based on the clipped post; the external research and tool behavior it cites were not independently verified and are marked as the source's claims.
