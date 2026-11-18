---
slug: 08-all-code-is-slop
title: "All Code Is Slop (Except Mine): Lauren Tan on Code Quality in the Agent Era"
summary: "Lauren Tan uses the Grok Bot team to show that when agents let one person ship about 3,000 PRs to production in a month, quality cannot rest on line-by-line review; it rests on an environment of architecture, lint, types, runtime verification and a little prose that makes the wrong code hard to write."
updatedAt: 2026-11-18
content_type: technical-tutorial
categories:
  - ai-era
tags:
  - ai-coding-agents
  - code-quality
  - verification
  - software-architecture
sources:
  - kind: video
    title: "All Code Is Slop (Except Mine) — Lauren Tan, SpaceXSI"
    url: "https://www.youtube.com/watch?v=O_zcc6Xl12g&t=33s"
    author: "AI Engineer (Lauren Tan / poteto)"
    publishedAt: "2026-11-15"
---

## How to keep quality up across thousands of PRs

Lauren Tan opens with a mildly provocative hand raise: how many people have looked at code someone else wrote and thought, "that's all slop"? She says she has too, then states what the talk is meant to prove — slop can be turned into gold.

Her argument is not that agent-written code is better. It is a claim about the engineer's role: **the meta-job of a software engineer is to keep, or even improve, code quality while massively increasing output.** Some people call the resulting setup a software factory. She prefers to reduce it to one thing: trust. Not blind trust, but investing in the agent's environment until you can trust the agent to do the right thing.

That investment is not free. She says it took her six months to reach a point where she could ship thousands of PRs a month, many of them while asleep, and she expects others to get there faster.

## Timeline

| Time | Segment |
| --- | --- |
| 0:01 | Opening: from "everyone else's code is slop" to turning slop into gold |
| 2:03 | The trust pyramid: code first, then verification, prose last |
| 5:00 | Dune and enforceable architecture |
| 6:56 | Replacing comments with lint rules |
| 9:40 | Runtime verification and the feature map |
| 10:50 | Formal verification and UI property testing |
| 13:32 | 11,000 team PRs and a roughly 0.5% revert rate |
| 15:11 | Foundations before software factories |

## The trust pyramid: put trust in the environment

![The pyramid prioritizes architecture and APIs, then static constraints and tests, runtime and formal verification, and finally written guidance](/images/all-code-is-slop-trust-en.svg)
*Figure. Tan prioritizes the codebase and executable checks, with written guidance for decisions that require judgment.*

**Author's view:** she arranges where to spend time on the agent's environment as an inverted pyramid. The widest layer is the code itself — good API design, architecture, refactoring, plus lint rules, type systems, compilers and different kinds of testing. These are deterministic and constrain what the agent can do, forcing the right thing by default. The next layer is verification, both runtime and formal, which finds bugs, checks properties and invariants that must hold, and tests whether the agent understood the goal. The narrowest layer is a little prose: rules, skills, `AGENTS.md`, and the things that require judgment.

The order matters: start with the codebase. Agents generate output from input, and the codebase is one of the largest inputs. Any workaround, anti-pattern, deprecated code or tech debt left in the repo is likely to be copied by the next agent because it looks like the established pattern. Her metaphor is a garden: weeds and pests spread before you notice. Make the codebase as pristine as possible so agents copy the good stuff.

The operating principle follows: **whenever you correct an agent, first ask whether the correction can become a deterministic check instead of another line in the rules or `AGENTS.md`.** A constraint written in code is more reproducible and more worthy of trust.

| Layer | Tools | What it mainly guarantees | What it cannot guarantee |
| --- | --- | --- | --- |
| Architecture and API | Directory boundaries, banning APIs that require nuance, refactoring | The wrong shape has nowhere to live | A wrong requirement or product call |
| Static constraints and tests | Lint, types, compiler, unit/integration tests | Enumerable rules and covered regressions | Bad habits no rule covers; environment differences |
| Verification | Runtime (DevTools, feature map), formal (TLA+/Lean), property tests | Real execution paths, state-space properties, UI invariants | Unmodeled flows; a wrong specification |
| Prose | Rules, skills, `AGENTS.md` | Judgment, background and preference | Not enforceable; goes stale; can be used as an excuse |

This table is a **note**: the talk supplies the layers and examples; the "guarantees / cannot guarantee" framing is this draft's summary.

## Architecture and lint: make the wrong code unwritable

### Dune: ban what requires nuance

**Source fact:** Dune is the client framework they built for Grok Bot. Technically it is not that interesting — think Next.js for Electron apps. What matters is that it encodes lessons from building desktop apps into constraints and lint rules.

One lesson: **anything that requires nuance to use well tends to produce slop.** Her example is React's `useEffect`. It has real use cases but is often misused; people joke that you need a PhD to use it well. Agents are not good at that kind of nuance. Their solution is to ban it in product code, allowing it only in a few places inside Dune's own APIs. The problem is categorically eliminated, and code review never has to catch it again.

### Directory structure as context

**Source fact:** in Cursor, an Electron app, they saw agents regularly import main-thread code into the renderer thread, causing long tasks and jank. In Grok Bot and the Dune apps, that became highly conventional: two top-level directories literally named `electron-renderer` and `electron-main`, with imports between them banned by a dependency graph analyzer and lint rules.

Her point is modest: these are simple lint rules to set up, but they remove one more thing to think about during review.

### Why comments become an escape hatch

**Source fact:** she observed agents using Markdown — docs, code comments, rules, skills — to write down justifications for not doing the right thing. They also over-rotate on a small correction and treat it as a hard rule that can never be broken again.

The clearest case is again Cursor. Agents loved imperative timers — `setTimeout`, `requestAnimationFrame`, `requestIdleCallback` — as quick fixes patching over an architecture clash between VS Code's imperative style and React's declarative style. Their architectural choice made both the client and the agent perform worse. Anyone who has done JavaScript performance work knows that rapidly creating and destroying timers causes major garbage collection, which shows up as lag and jank.

Worse, agents wrote large blocks of comments explaining why the patch was justified. Soon timers were everywhere and app performance suffered.

In Grok Bot they banned 99% of comments: comments go stale, humans do not really read them, and they give the agent an escape hatch to justify not doing the hard thing. The deeper problem is that comments are **not enforceable** — telling the next agent not to do something is not a constraint anyone can verify.

The replacement is lint rules with helpful error messages that tell the agent to fix the root cause rather than patch around it. She generalizes: every correction should become a deterministic check, or else a categorical elimination through better API design and architecture. Do it enough and there is less to look for in review; at some point there is nothing left to review, and agents can merge most of their own PRs.

## Runtime verification: review becomes evidence

**Source fact:** their code review process has shrunk into looking at verification artifacts — videos, screenshots, diagrams, formal verification. The most basic layer is runtime verification: giving the agent a way to run the code itself and use the debugging tools human developers use, such as the Chrome DevTools Protocol.

Inside their runtime verification skill is a **feature map**: a site map of everything the application can do, from the user's point of view. When you say "the thingy in the left sidebar," the agent no longer has to guess; both sides share vocabulary.

They also wrap custom CLIs in these skills so the agent reuses the same CLI and driver every time. That cuts token usage and is testable.

**Note:** this changes what "review" means. The reviewer used to read a diff; now the reviewer reads behavioral evidence. A diff answers "what changed"; evidence answers "what it does now." Evidence is better at catching a mismatch between implementation and intent, but it is also easier to cherry-pick, so how the evidence is produced has to be reproducible.

## Formal verification and property testing: what they can and cannot check

**Source fact:** they have recently started experimenting with formal verification. TLA+ is used for model checking major user flows such as notifications across multiple devices and platforms; Lean is used to prove properties of certain algorithms, for example their own virtualization library, to check that it does not flicker or jitter. She says the approach is still experimental, looks promising, and has already found quite a few bugs, but it is certainly not a silver bullet — just another layer in the agent's environment.

For UI, they have started property-based testing with a library called Bombadil, which has already caught a few UI bugs.

She also built a state-chart skill in her plugin set, pstack, which visualizes state machines from the user's point of view; she finds it easier to review alongside videos and screenshots.

**Note:** formal verification checks the properties you managed to write into a specification. TLA+ is strong on invariants in concurrent and cross-device state spaces; Lean is strong on algorithm-level theorems. Neither can prove that the specification matches what users want, and neither covers flows that were never modeled. The modeling and maintenance cost is real. It raises confidence; it does not replace runtime tests or human product judgment.

## Verification is the new cost center

**Source fact:** she cites a tweet from six months earlier: the author could not trust her agents because subtle bugs kept getting merged, and what she lacked was a verification process. Six months later, the same author says 70% of her daily tokens go into verification. Tan says this tracks with what she sees — most of her own token usage goes to verification.

Her judgment is that none of these techniques are new. They are good software engineering tools that used to be prohibitively expensive to understand, write or maintain. Agents drastically cut that cost. She argues this opens a golden age of software testing and verification: we can test everything to a degree that used to be uneconomical. Formal verification also helps you reason about how the product should work, and whether the agent really understands your intent.

## Put the numbers in context: 3,000, 11,000 and 0.5%

**Source fact:** last month she personally shipped **3,000 pull requests** to production. Before agents, she says, nobody cared much about volume except for outliers — the "coding machines," like the engineer who famously rewrote all of Google Maps in a weekend. With agents, anyone can be a coding machine.

At the team level, Grok Bot shipped **11,000 pull requests** last month. The client release pace increased too, cutting a new stable version about once a day, and in October about **227 people** contributed at least one PR, including many drive-by contributors with little context.

On quality, she says the number of reverted PRs has actually fallen on a relative basis and is steady at about **0.5%**. At the same time, Grok Bot's performance has not just stayed stable but improved on several dimensions: startup, typing, opening a new chat, switching chats. She reminds the audience that it is still an Electron app, so there is a ceiling.

She also offers a comparison for review volume: in 2024 she went to work and reviewed the three PRs her colleagues wrote; today that number is more like 300.

| Number | Scope | What it must not be read as |
| --- | --- | --- |
| 3,000 PRs/month | Tan personally, one month, a heavily automated setup | Team output, or a baseline for an average engineer |
| 11,000 PRs/month | The Grok Bot team, same month | Company-wide output across all repositories |
| About 0.5% | The share of that team's PRs reverted in that period | A personal metric, an incident rate, or a permanent quality floor |
| 227 people | Contributors with at least one PR in October | The size of the core team |
| One stable release/day | Client release cadence | The cadence of every product |

**Note:** these numbers answer "what this team, on these foundations, did in this month." They do not answer "what agents generally deliver." Her six-month ramp, the product's stage and the specifics of an Electron client are all part of the context. Treating them as an industry benchmark produces the wrong conclusion.

## When this works: foundations before factories

**Author's view:** before building a software factory and automating everything, improve the codebase every time you correct an agent. Her order: start with a lint rule that prevents new occurrences of the anti-pattern, then clean up the old ones; then make the verification story strong.

The causal chain is the point: much of this work is a prerequisite for automation. If the inner coding loop produces slop, automating that loop produces more slop, and you end up throwing more and more tokens at the problem — which is expensive.

Once the foundations exist — code, static analysis, runtime verification, formal verification — many things become possible, and you can build your own factory on top. At that point Grok Bot's connectors, routines, Cursor cloud agents and projects can orchestrate hundreds or thousands of agents. She gives one concrete example: on every new release, Grok Bot spins up a Cursor project that fuzzes the entire application and build, uses it like a real user to find bugs, opens a fix PR for each bug, and auto-merges them.

She immediately supplies the precondition: **the codebase is good enough that PRs tend to be good by default**, and most product code no longer requires deep human review. The lesson is not "auto-merge is cool"; it is "auto-merge only works when every prior layer holds."

## Understanding check

**1. Why is banning `useEffect` in product code more reliable than telling agents not to use it in `AGENTS.md`?**

The ban is a deterministic constraint enforced at the lint or compiler layer; it does not depend on whether the agent reads, remembers or correctly interprets a sentence. A prose rule goes stale, can be ignored, and can be argued around in comments or other rules. Her principle is to turn each correction into an executable check, or eliminate the pattern through architecture.

**2. What do TLA+ and Lean each check, and why does she call them not a silver bullet?**

TLA+ model-checks major user flows such as cross-device notifications, checking state-machine-level properties. Lean proves algorithm-level properties, for example that their virtualization library does not flicker or jitter. Each can only check what has been modeled; the specification itself can be wrong, and modeling and maintenance carry real cost. They are another layer, not a replacement for runtime tests or human product judgment.

**3. What are the scopes of 3,000, 11,000 and 0.5%?**

3,000 is Tan's personal count of PRs shipped to production in one month. 11,000 is the Grok Bot team's count in the same month. About 0.5% is the team revert rate she reported. Tan says the rate had fallen and then held steady at roughly that level. Do not turn 3,000 into team output, or 0.5% into a personal or company-wide metric.

## Source

- Lauren Tan (poteto), *All Code Is Slop (Except Mine)*, AI Engineer, 2026-11-15: <https://www.youtube.com/watch?v=O_zcc6Xl12g>

This draft is based on the clipped video description and transcript; the transcript contains some speech-recognition errors, and the numbers are read with their surrounding scope.
