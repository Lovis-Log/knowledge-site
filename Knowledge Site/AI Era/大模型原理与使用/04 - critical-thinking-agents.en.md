---
slug: 04-critical-thinking-agents
title: "Critical thinking when agents do the work"
summary: "As models improve, fewer obvious errors prompt a second look. Osmani maps the slide from cognitive offloading to surrender and gives concrete habits for questioning, verification, review and prompting."
updatedAt: 2026-11-07
content_type: opinion
categories: [ai-era]
tags: [ai-agents, verification, critical-thinking, workflows]
sources:
  - kind: article
    title: "Critical thinking when agents do the work"
    url: https://x.com/addyosmani/status/2117512471930167377
    author: "Addy Osmani"
    publishedAt: 2026-11-03
---

## The claim: by default, nothing will think for you

Cognitive and aesthetic processing used to happen in the gap between question and answer. That gap is now measured in seconds. Addy Osmani is not arguing against agentic workflows: he runs several sessions in parallel every day and says plainly that he is a fan. His concern is different. The better the models get, the fewer obvious errors there are, and the more fluent the output looks, so nothing in the output itself asks you to take a second look.

Even with many agents running at once, there is still only one pair of eyes on the results. Hence the sentence the whole essay hangs on: **you have to build critical thinking into your day, because by default nothing will do it for you.**

This is hard to notice from the inside because the workflow is pleasant. Fast, smooth, mostly-correct answers are a relief in a busy day, and that is exactly why vigilance relaxes. The relaxing has no obvious moment.

## A slope: offloading, deferral, surrender

Osmani describes three positions on a spectrum, from healthy to dangerous:

- **Cognitive offloading**: you delegate the task to AI but keep ownership of the result. The work is outsourced; the judgment is not.
- **Deferral**: the tool's output becomes your new input. The result has stopped being a hypothesis.
- **Cognitive surrender**: the AI's output quietly becomes your own thinking, and you feel no need to check it.

Cognitive surrender is a term coined by Steven Shaw and Gideon Nave at Wharton. Osmani uses it for a pattern he keeps seeing: as trust, or laziness, increases, people drift down the spectrum.

The drift is rarely observed because each step looks reasonable. You read the last answer carefully, so you skim the next one. You scan only the skeleton of the one after that. Then someone asks about a line and you cannot explain it, even with your agent's help.

That is how cognitive debt accumulates. It surfaces when you try to apply a mental model of the system and discover there isn't one. Margaret-Anne Storey has written about the team-level version: an eroding shared understanding of how a system works. Osmani calls the code-shaped version comprehension debt, a term he credits to Jeremy Twei. In the moment it is invisible: the codebase looks pristine and the tests pass. It becomes obvious only when you have to change the system and realize nobody understands it. Reading the table of contents of a strategy doc or a spec and signing off is the same failure in document form.

None of this requires holding the whole system in your head, which is impossible for a large modern codebase. The Claude Code team has said publicly that it rebuilds understanding on demand: when a slice needs to be understood, it asks Claude to explain that slice. Debt of this kind is more recoverable than most engineers expect, provided you can rebuild locally when needed and you know what you are missing.

The boundary fits in one line: **where the stakes are low, delegate entirely; when you cannot explain an answer even with your agent's help, you have ceded ownership.**

Osmani's own example: while recording a course he had to pick one of three similarly rated hotels as a location. He had no time to read the reviews himself, so he delegated the decision to an AI. It worked, and he would do it again. He would not delegate how to invest the family's money, how to advise his kids on their careers, or at work what to build, which users a change affects, or whether it is safe to ship. Take the handoff where being wrong is cheap; keep the reasoning where other people have to live with the consequences.

## Six questions to ask yourself

Osmani's old checklist was deliberately basic: How do I know I am working on the right problem? How do I know I am solving it the right way? Is there evidence for my conclusion? How do I know I am finished? Written out, it looks childlike, but it forces you into categories you would otherwise skip. His updated version is aimed at agentic work.

### Did I form a hypothesis before asking?

Before running an agent on anything non-trivial, write down, even just mentally, what you think the answer is. A bad guess is fine; new information is allowed to change your mind. The difficulty is that once you have read a well-written response, it becomes hard to imagine any other possibility.

If you have no idea where to start, ask for what Thariq Shihipar calls a blind spot pass: give the model what you do know and have it find your unknown unknowns.

### Am I asking it to help me think or to think for me?

Both are acceptable, as long as you know which one you are doing. The first keeps judgment; the second hands it over. Confusing the two is the problem, not the delegation itself.

### What would have to be true for this to be wrong?

Then go find out. A model's self-reported confidence is worth much less than a test you can actually run. The question converts "this feels right" into conditions that can be checked.

### Have I heard the counter-argument from another angle?

When Osmani has taken a hard stance on something open-ended, he asks more than one model to argue the opposite side, then reviews the output and forms his own opinion. It takes longer, and he ends up understanding the subject much better.

### Would I bet on this in front of the person who has to maintain it?

This is the bar for answerability, and it applies to code and to anything else you deliver. It replaces abstract quality with a concrete scene: someone will inherit this, maintain it, and carry the consequences.

### What am I no longer practicing?

Maybe some routine debugging. Letting it go is fine, but Osmani wants the letting go to be intentional rather than unnoticed.

## Verification as a habit

Osmani's claim is that the bottleneck has shifted from writing code to being sure you are right. Give an agent the means to verify its own work, through end-to-end tests, property tests, or real app interactions, and it can make a change, run the check, read the output, and try again before you have looked at anything. Boris Cherny describes this as giving Claude a way to verify its work.

But verification can be surrendered too. "Is there evidence for my conclusion?" degrades into "did the check turn green?" Agents make tests cheap to create, so you will see a lot of green. A passing test can contain the same mistake as the feature, in which case it catches nothing. And a green check only conveys one property; it is far too easy to imagine it covers everything.

**When a check goes green, ask what it proved. Then ask what it did not.**

Define "verified" upfront, because afterwards you will rationalize any outcome. The finish line for agent work should be something tangible: a passing test, a screenshot, a log or a trace. When a completion notification arrives, read the command that was executed and its output before you read the summary.

Osmani also bakes self-critique into the loop: a subagent in a fresh context reviews the work every time, not only when someone remembers. At the end he still asks, "Did I miss anything?" It sounds silly, but after a complex feature it routinely turns up two or three more things.

None of this needs to be the norm; knowing when to go deep is itself a skill. His favorite rule of thumb comes from the Claude Code team's writing on code review: **if you cannot say what the checks would miss, ask for a real review rather than a quick approval.**

The same logic applies beyond code. If an agent has synthesized fifty customer calls or a competitive analysis, open a couple of the source documents and check the summary. If a recommendation depends on a number, check that the number is being calculated correctly. **Agents have made verification cheap to set up; what remains hard is knowing what good verification looks like.**

## Actually reading what you approve

Picture a 600-line PR. You look roughly at the structure, the variable names seem reasonable, the tests pass, and you approve. Somewhere in the middle there may be a subtle ordering change at a transaction boundary, or a flipped default on an edge case you never thought about. You did review it, in a sense, but only for what you already expected to find.

Writing code and reviewing code are different skills, and at some point review turns into rubber stamping. Osmani's advice is to read the diff as if the AI had not written it, then look past the diff at the decisions the agent made. Over a long session it makes many small decisions for you: the defaults, what is out of scope, which requirement it reinterprets when two of them clash. None of that appears in a summary that says everything went well.

So ask it to list the decisions and assumptions it made, then quiz yourself. Pick a few lines at random and ask what each one is doing. For a document, close it and try to write out the main argument from memory. Some people use a stricter version: have Claude write a report on the change and add a quiz at the bottom, with the rule that merging only happens after a perfect score.

**Understand what you are shipping well enough to defend it, because at some point someone could ask.**

Agents can also guard your attention. Osmani's open-source project receives a lot of pull requests; he uses agents to work out what is incoming, what conflicts with the guidelines, and where his attention is likely needed. He rarely lets the agents decide on their own, but they can narrow the field, and then he can think about whether the changes solve the right problem in the right way.

Then there is volume, and you have to be honest about it. Osmani calls the gap between what your agents generate and what you would feel comfortable putting your name on the orchestration tax. If finished work piles up faster than you can get through it, another session will not help. Either tighten the checks so less of it needs you, or slow down.

**When you are producing more than you can stand behind, you are no longer reviewing. You are hoping.**

## Quality in, quality out

The human mental model is still involved, but it has moved from the middle to the front and the back. Your energy goes into the task description and context at the front, and into reviewing the output at the back. That is why good input matters so much, and why Osmani treats good prompting as a critical thinking skill.

Historically, a non-specific request would be challenged by a person, and you might realize you had not actually figured it out. An agent often will not stop you. It fills in what you left out and hands back something that looks done, even though the idea behind it is still fuzzy. Osmani calls this intent debt: the implicit goals, constraints, and rationale embedded in artifacts you did not write. Unlike other kinds of debt, nobody else can repay this one for you. The intent has to come from you.

**Your prompt is a mirror of your understanding of the problem. If you cannot express it clearly, it may not be clear in your own mind.**

Write your own request brief in your own words before asking for help: who the audience is, what is out of scope, and what counts as done. If a second round of corrections still has not got you there, stop tweaking and rewrite the prompt.

The agent can help with this too. Osmani draws on Andy Clark's distinction between delegating to an AI system and collaborating with it. Collaboration is a virtuous cycle of mutual amplification: your prompts sharpen the output, the output sharpens your next prompt, and both sharpen your mental model of the problem. If things are unclear, ask the agent to interview you about what it does not understand. If you close the session with a better mental model than you started with, that is a sign of success.

Watch the input chain as well. It is easy for each agent to pass the previous agent's summary into its context, and before long the third agent has never read the original document.

You also need your own standards for output. Osmani has experimented with AI across many creative mediums, and most of it never gets shown because it does not meet his bar. Everything now comes out nicely formatted and confident, so polish is no longer a useful signal. **AI may have made production faster, but if I would not feel comfortable attributing the output to myself, I will not publish it.** When something falls short, record why in shared config, a hook, or a test so it does not happen again. That is how taste compounds.

## "But the models will be better at this than me"

If a model can detect in a year or two everything you can detect, why maintain the skill? Osmani grants that much of the detection can move to agents. But two things do not move.

First, someone is responsible for what ships. Regardless of how much AI helped, a human has to take responsibility. Second, how much to trust an agent on a given task is itself a judgment call, and because what the models get wrong keeps changing, staying calibrated requires looking at the work. Anthropic's own research on its engineers and researchers calls the trap the paradox of supervision: supervising Claude requires the very coding skills that may atrophy from AI overuse.

There is also a set of questions a better model cannot answer for you: what are you building, why is it worth it, who does it affect, and what are you willing to sacrifice? An agent can help you think them through, but the answers remain yours. **You may offload the work and much of the auditing, but not the accountability.**

## Everyday practices

You do not need to do all of this rigorously; plug in what works.

- Once a week, write a bit of code without an agent, or do one real thing that would be painful to have forgotten. Osmani calls this a calibration exercise, not a moral one.
- Once a month, write down what you have stopped doing and decide which of those you are okay not doing.
- Keep asking: how lost would you be if AI did not exist?
- If something is above your comprehension, go learn it. When Osmani meets an unfamiliar phrase while writing, he does not stop at a one-line search result; he does a little research until he can see where it fits.
- Checking the machine properly is real work. Pretending otherwise is how teams end up not doing it. Schedule it as a line item and it will actually happen.
- **Skills you stop exercising will go away, probably faster than you expect.** Keep doing the ones you are not willing to lose.

## Assumptions and limits

This is a practitioner's essay, not a controlled study. It helps to separate the argument from its premises:

- It assumes output that is broadly correct. That holds in Osmani's coding and writing work, but in domains with slow feedback and low verifiability, errors are more hidden and checking is more expensive.
- It assumes people have the time, authority, and motivation to review. In practice, throughput pressure and organizational incentives often reduce review to a stamp; the problem is then process design, not only personal discipline.
- The spectrum describes an individual's cognitive state, but cognitive debt also appears at team level. An individual can hold the line while the organization rewards speed, and the essay does not explore that tension.
- Against the "models will be stronger" objection, Osmani argues that accountability cannot be transferred, not that human detection will always stay superior. That is a normative argument, not a capability forecast.
- The research cited (Wharton on cognitive surrender, Anthropic on the paradox of supervision, Storey on cognitive debt) is summarized second-hand, without samples, effect sizes, or scope conditions. It supports a direction rather than a quantified conclusion.

A more aggressive counter-argument is available: if verification can also be automated, does a person only need to define the goal? Osmani's reply is that judging what counts as good verification still requires a human, and whether the goal itself is worth pursuing cannot be outsourced at all.

## Key takeaways

- Stronger models give you fewer obvious errors to react to, so critical thinking has to be scheduled into the process.
- Offloading, deferral, and surrender form a continuous slope made of individually reasonable steps.
- Form a hypothesis before asking; know whether the agent is helping you think or thinking for you; ask what would have to be true for the answer to be wrong; hear the counter-argument; be willing to bet on the result in front of its maintainer; notice what you have stopped practicing.
- A green check proves one property. Ask what it proved, then what it did not.
- Read the command and its output before the summary; ask for the decisions and assumptions; spot-check lines; close the document and reconstruct the argument.
- The bottleneck has moved from production to confirmation. The orchestration tax is the gap between output and work you can sign.
- Your prompt reflects your understanding of the problem. State the audience, the scope, and the definition of done. Intent debt is yours alone to repay.
- Accountability cannot be outsourced, and unpracticed skills fade, so keep exercising the ones that matter.

## Check your understanding

**1. What separates cognitive offloading, deferral, and cognitive surrender? Give an example of each.**

Reference answer: Offloading means delegating the work while keeping ownership of the result, for example having an AI draft an email that you then rewrite and stand behind line by line. Deferral means treating the tool's output as your new input rather than a hypothesis to test, for example taking an AI-generated architecture diagram straight into an implementation plan without checking its assumptions. Surrender means the AI's output quietly becomes your own thinking, as when you repeat a conclusion in a meeting and cannot answer a follow-up about its basis. The line is not task size but whether the result still passes through your judgment.

**2. Why does improving model quality make critical thinking harder rather than easier?**

Reference answer: The signals that used to trigger vigilance disappear. Earlier models made obvious mistakes, and the mistakes themselves prompted a check. Now output is usually fluent, well structured, and mostly correct, so it does not demand a second look. At the same time agentic workflows are fast, smooth, and pleasant, which relaxes vigilance without any noticeable moment. The danger is not the occasional large error but a run of "looks right" experiences that steadily lowers the checking effort, until the understanding is gone by the time someone asks for an explanation.

**3. A test turns green. Why is that not proof of verification, and what should you ask next?**

Reference answer: Green proves only the one property encoded in the test. The test can contain the same mistake as the feature: if the developer misunderstood the requirement, the test encodes the same misunderstanding, so a broken feature still passes. Green may also cover only the happy path, missing edge cases, concurrency, error handling, or performance. The next questions are what this check proved and what it did not, followed by whether the uncovered part is where the risk actually lives. If you cannot say what the checks would miss, ask for a real review.

**4. What is intent debt, and why can't someone else repay it the way they might repay technical debt?**

Reference answer: Intent debt is the goals, constraints, and rationale implicit in an artifact, especially one produced by AI rather than written by you. Technical debt can usually be repaid by other people through refactoring, tests, or documentation, because code and requirements are shared. Intent debt is different: why you are doing this, for whom, and what counts as done exist only in the originator's head. Others can help you build it, but they cannot supply the intent. That is why an unclear request has to be rewritten by the person who owns the goal.

**5. What is the orchestration tax, and what two responses does the author give?**

Reference answer: The orchestration tax is the gap between what your agents generate and what you would feel comfortable putting your name on. When finished work accumulates faster than you can absorb and vouch for it, you are no longer reviewing; you are hoping. Osmani gives two responses: tighten the checks so less work needs your personal attention, through better automated verification and clearer definitions of done; or slow down and reduce parallelism until output returns to a range you can stand behind. Opening another session only increases the backlog.

**6. How does Osmani answer "the models will be better at this than me," and where does that answer stop?**

Reference answer: He grants that much detection can move to models, but argues two things do not transfer. First, accountability: someone has to be responsible for what ships. Second, judging how much to trust an agent on a given task, which requires looking at the work because the models' failure modes keep changing. The limit is that this is a normative argument, not a capability forecast: it explains why responsibility stays with people, not why people must retain detection ability equal to the model's. A critic can still ask whether, once verification is heavily automated, humans only need to define goals; Osmani's reply is that judging good verification still needs human judgment, which itself depends on judgment not being allowed to atrophy.