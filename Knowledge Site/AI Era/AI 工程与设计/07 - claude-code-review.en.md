---
slug: 07-claude-code-review
title: "How the Claude Code Team Reviews Code"
summary: "When agents write about 90% of the code and merged PRs more than double between June and September, the Claude Code team stops asking whether a human read the diff and starts asking which layer should catch which kind of failure: pre-PR self-verification, parallel AI review, blocking CI and security checks, risk-tiered human approval, then merge queues, flags and rollback."
updatedAt: 2026-11-18
content_type: technical-tutorial
categories:
  - ai-era
tags:
  - code-review
  - ai-agents
  - engineering-process
  - risk-management
sources:
  - kind: article
    title: "How the Claude Code team does code review"
    url: "https://claude.dev/blog/solving-code-review-at-anthropic/"
    author: "Addy Osmani, Morgan Westlee Lunt, and Qing Wang"
    publishedAt: "2026-10-15"
---

## The real question: what does "reviewed" measure?

Start with the premise the Claude Code team states plainly: Claude writes roughly 90% of Claude Code's own code. The volume is not shrinking; it is growing. Between June and September, merged pull requests to the Claude Code repository more than doubled, while the share that had to be reverted fell by more than 40%.

So the question is not whether review should exist. It is where human attention should go when output multiplies. The article replaces "did a human read this?" with a more useful question: "what could go wrong with this change, and which check — automated or human — is best placed to catch it?"

That substitution matters. The first question has a yes/no answer and treats every diff as equally risky. The second can be decomposed into failure modes and routed to different layers of defense.

Review also moves in time. It used to be a gate at the end of the road: write the code, open a PR, wait for a colleague. Now it behaves more like spellcheck while you write. Most changes have already been reviewed and fixed by Claude at least once before a person is asked to look, which leaves human attention for direction, architecture and the expensive risks.

## The path of a change

![A change passes self-verification, PR checks, risk-based approvals and merge-queue checks before monitored rollout](/images/claude-code-review-flow-en.svg)
*Figure. Where checks happen from the first working change to production.*

| Stage | Check | Executed by | What it mainly catches |
| --- | --- | --- | --- |
| Before the PR | Tests, build, linter, screenshot comparison; a fresh-context subagent reads the diff | Agent | Errors the author can already see |
| Every PR | Required CI: lint, types, cross-platform tests, build and packaging | Machine | Enumerable, reproducible regressions |
| Every PR | Claude code review: parallel bug hunts, verifier vote | Agent | Semantic defects and missed spots |
| Every PR | Separate security review; open findings block the merge | Agent | Security boundaries and sensitive paths |
| Every PR | Human approval scaled by risk (zero, one or two people) | Classifier + human | Direction, architecture, irreversible risk |
| Merge | Merge queue re-runs every check against latest main | Machine | Two passing PRs combining into a broken main |
| After merge | Internal flag, latest → stable, on-call watch | Human + machine | What slipped through |

These are not seven equal steps. They form a funnel divided by what each layer is best at catching: the earlier a problem is caught, the cheaper it is to fix; the later the layer, the more expensive the fallback, which is why rollback sits underneath all of it.

### Before the pull request: turn "looks done" into runnable evidence

**Source fact:** most review now happens before a PR exists. Claude is given something it can run — tests, a build, or a screenshot to compare against a design — and is asked to show the output rather than announce completion. A subagent then reviews the diff with fresh context. UI changes are also checked against design guidelines, and many engineers run internal skills that hunt bugs, simplify the diff, and verify behavior end to end.

The article quotes Boris Cherny, who created Claude Code: giving Claude a way to verify its work is probably the single most important thing for getting good results. He estimates a two-to-three-times improvement in the final result, and notes that verification looks different in every domain — a bash command, a test suite, or actually exercising the app in a browser or phone simulator.

**Note:** this layer buys down the cost of rework. An error is cheapest to fix while the author still holds the context that produced it. But the same session is also a blind spot: the agent that wrote the code tends to inherit its own assumptions. A fresh-context reviewer is not duplicate work; it separates the author's view from the reviewer's view.

### AI review: find candidates, then have another group vote

**Source fact:** every pull request gets a Claude review before a person looks. It reads the diff against the whole repository and the PR's stated intent, and asks whether the change solves its problem, fits the system, and avoids breaking something else. Bug fixes are checked for root cause.

The mechanics are not "one model says something and it counts." Several agents hunt for bugs in parallel; a separate group votes on each finding, and it is posted only if enough of them agree it is real. Findings about style, diagnostics or cleanup are dropped. The article says these filters were A/B tested on the team's own PRs before being kept. Survivors appear as inline comments sorted by severity and tagged Important, Nit, or Pre-existing — the last tag keeps a bug the PR did not introduce from looking like the author's fault.

The headline number comes from the research preview: the share of internal PRs receiving substantive review comments went from 16% to 54%. Most PRs over 1,000 lines get findings; most small ones come back clean. Admins choose Quick, Standard or Deep per repository, with Deep reserved for places where one missed bug costs more than the extra review time.

Every finding must be answered: fix it, or resolve the thread with a reason. Agents often pick up the fix overnight, so the author returns to a PR that has already been through another round.

**Note:** voting improves the trade-off between recall and noise; it is not a proof of correctness. It lowers the chance that one model's false positive reaches a human, and it cannot establish that an unreported problem does not exist. That the filters were A/B tested is a useful signal: noise is treated as a product metric, not an accepted side effect.

### Hard checks and security review: give enumerable errors to machines

**Source fact:** required CI covers lint, type checks, tests on every platform, and the build. Red blocks the merge. A typical CLI pull request may run dozens of checks before anyone looks at it.

Security gets its own automated pass. A PR cannot merge while any finding from the bug review or the security review is still open; a false positive is cleared by closing the thread with a short reason, and a later commit that actually fixes the issue clears the finding automatically.

The PR template asks how the change was tested and how to undo it. Claude can fill it in, but the person who asked for the change signs off.

**Note:** CI and lint catch errors that someone has already turned into a rule. Their strength is that they are deterministic, reproducible and free of human attention. Their limit is the same: they cannot see a bad habit no rule covers, a wrong requirement, or a wrong architectural choice. The stronger the machine layer, the more deliberately human time should be spent outside its coverage.

### Human approval: scaled by the change, not the author

| Risk | Examples | Human approvals |
| --- | --- | --- |
| Low | Docs, copy, internal-only features, additive changes behind a flag | None required once automated review and security checks are green |
| Medium | Ordinary product changes, plus sensitive areas such as caching, the auto-updater or system prompts | One person |
| High | The highest-risk code, plus a small set of paths that always need two people | Two people |

**Source fact:** the change sets the tier, not the author. One classifier reads the change and assigns a risk tier; a second asks whether this particular change needs another person even when its tier says it does not. Some paths always need a person: anything owners have listed as sensitive, and any CI workflow file.

Only authors on the repository's trusted list get the lighter paths, and that list is mostly the team that owns the repo. Everyone else needs a second person to approve. An agent's approval never counts as a person's. Conversely, whoever prompted the change is on the hook for it: on an agent-written PR, the person directing the agent counts as one of the required reviewers, exactly as if they had typed the code.

An approval covers one specific commit. If new commits land that the system cannot vouch for — an agent's push, or a merge someone resolved by hand — the approval has to be given again.

**Note:** this design assumes risk can be predicted from the shape of a diff. Classifiers will misjudge some changes, which is why AI review sits before them and security review, the merge queue and rollback sit after. Tiering is not an attempt at perfect prediction; it is an attempt to make misjudgments land in a cheaper layer.

### The merge queue, staged release and rollback

**Source fact:** the merge queue re-runs every check against main with the change applied, so two PRs that pass separately cannot combine into a broken main. New behavior usually ships behind a flag to Anthropic employees first, where heavy internal use often surfaces regressions before users do. Public releases go to the `latest` channel first; `stable` trails it.

The last layer is fast detection and fast undo. Flags turn off without a deploy; broken builds get reverted; the team runs a weekly on-call rotation, and incident reviews ask which layer should have caught the issue.

The article is explicit about what does not exist yet: there are no circuit breakers that automatically tighten approval when revert or incident numbers move, and engineers want them before more code moves to zero-human merges. It also preserves a colleague's observation: slowing down does lower your error rate, but mostly because you are doing less of everything.

## Three metrics that should not be conflated

| Metric | The question it answers | What the article reports | Common misreading |
| --- | --- | --- | --- |
| Merge volume | How much output the system produces | Merged PRs to the Claude Code repo more than doubled from June to September; the Anthropic monorepo went from about 2,500 changes per day in May to more than 30,000 in September | Treating the two repositories as one curve |
| Revert share | What fraction of changes had to be undone | The share of merged PRs needing a revert fell by more than 40% from June to September | Reading it as "revert counts fell," or as a total quality score |
| Incidents | How bad the failures were | Used as a guardrail; no specific incident number is given | Substituting revert rate for incident rate |
| Human time | How much attention people spent | Human approvals per PR (median and 95th percentile), human comments, time a PR waits on a person | Counting approvers while ignoring waiting and rework |

**Source fact:** the team measures human cost with approvals per PR, human comments and wait time; revert and incident rates are the guardrail. If those rise, human time was not saved — it was moved from reviewing to fixing.

Suppose 10 of 100 merged PRs were reverted in June, a 10% revert rate. In September, a 5% revert rate on 220 merged PRs would mean 11 reverts. The rate would have fallen by 50% while the count rose from 10 to 11. These numbers are illustrative. The relative changes the article reports do not establish the absolute revert count or incident count.

## Making review converge

**Source fact:** an agent author and an agent reviewer can keep each other busy indefinitely. One CLI PR went through more than fifty rounds of review and fixes overnight before its author stopped it.

Git blame on the code the reviewer kept flagging showed that about 59% of it had been there since the reviewer's first pass. The reviewer was rarely finding new bugs; it was finding a few more old ones each round.

The team admits it made this worse: because each pass caught something, running several rounds became the default. That can be worthwhile on a risky change, but not on every PR.

They changed four things: a cap of three rounds, after which the reviewer asks the author to step back and reconsider the approach; diff-only re-review after the first few passes; flagging the class of bug so the author fixes every instance rather than one line; and no repeats of findings already posted. Review agents also run nightly over existing code.

The resulting internal-PR numbers: passing after one review-and-fix round rose from 65% to 78%; needing five or more rounds fell from 8.9% to 1.5%; mean reviews to pass fell from 2.08 to 1.32.

**Note:** this is review budgeting. Marginal information per round declines, while marginal cost is higher when the author is an agent — a person can wave off a nit in seconds, but an agent fixes it, producing another commit and another round. Tracking rounds-to-pass alongside recall means the team is measuring not only how much it caught, but what it cost to catch it.

## Where humans stay

**Author's view:** removing people from routine mistakes is not removing people. The team keeps human judgment for five things:

- Deciding whether to build it: direction, taste, scope. One team that declared its review bottleneck solved still kept human review for changes from outside the team, so someone asks "should we even do this?"
- Reviewing risky code: billing, the auto-updater, CI workflows.
- Reviewing architecture that sets a pattern others will copy.
- Reading the evidence: test output, the command that ran and what it returned, a screenshot, the reviewer's findings. If you cannot say what the checks would miss, ask for a real review rather than a quick approval.
- Owning the outcome: a person is accountable for every change that ships, whoever typed it.

"You land it, you own it" does not turn into blame because of five conditions: changes are small enough to read, debug and revert; everything is reversible through flags, reverts and staged releases; blast radius sets the bar, so expensive code gets more people and checks; regressions surface fast through telemetry and internal use; and ownership is not blame — the person fixing it has the most context, and incident reviews examine the system.

As for review's second job — spreading codebase understanding — the article says there is no formal process, and nobody needs the whole of Claude Code in their head. When someone wants to understand a slice, they ask Claude for an explainer of exactly that slice; it takes minutes and reflects the code as it is today. Some go further and have Claude build a small artifact that visualizes the slice. Reading a one-line copy diff teaches almost nothing; an explainer for the module you are about to change teaches a lot.

## When this process fits

This is not "install an AI reviewer and you are done." It depends on a chain of preconditions: small PRs; new behavior that can sit behind a flag; usable tests, builds and screenshots; telemetry and on-call; a trusted-author list; and a willingness to turn incidents and reverts into a daily eval set.

Invert those conditions — irreversible changes, no tests, no monitoring, thousand-line diffs, contributors who do not know the repo — and the zero-human threshold should not be copied. Even the product itself only posts findings; it does not approve pull requests. The team's own repos go further because they have the rest of the machinery.

The costs are also in the article: building CI, writing `CLAUDE.md` and `REVIEW.md`, maintaining an eval set, tuning classifiers, running A/B tests. The stated goal is deliberately modest: most PRs merge with at most one human in the loop, who can be the author, with no increase in reverts or incidents. That is not replacing people with machines; it is using machines to move people away from the places they do not need to be.

## Understanding check

**1. The article says merged volume more than doubled from June to September while the revert share fell by more than 40%. Does that prove the number of reverts fell?**

The two changes alone cannot answer that. The revert count equals the number of merged PRs times the revert rate. As the number of merged PRs grows, the rate has to fall far enough for the count to fall.

**2. If the change sets the risk tier rather than the author, why keep a trusted-author list?**

They answer different questions. The tier asks how dangerous this diff is, which prevents a senior author from getting an easier pass on risky code. The trusted list asks whether this person has enough history in this repository to be allowed the lighter path. A low-risk change from someone outside the list still needs a second person.

**3. AI review already runs parallel bug hunts, votes and severity ranking. Why keep human approval at all?**

Because review identifies describable defects; it cannot replace judgment about direction, architecture, irreversible risk and accountability. The article keeps humans on whether to build, risky code, architecture, reading evidence and owning the outcome, and it explicitly refuses to count an agent's approval as a human slot. Zero-human merges hold only in the narrow case of low risk, trusted authors and all automated checks green.

## Source

- Addy Osmani, Morgan Westlee Lunt, and Qing Wang, *How the Claude Code team does code review*, 2026-10-15: <https://claude.dev/blog/solving-code-review-at-anthropic/>

This draft is based on the clipped article; the figures and judgments are the source's, and external links were not independently verified.
