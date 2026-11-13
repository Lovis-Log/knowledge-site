---
slug: 03-new-full-stack-designer
title: "The Full-Stack Designer: Prototypes Persuade Faster Than Documents"
summary: "Shopify's product design studio lead Marvin Schwaibold on demoting Figma to a scratch pad, building clickable prototypes with Codex, and the interface judgments that recur across six live site reviews."
updatedAt: 2026-11-09
content_type: podcast-interview
tags:
  - product-design
  - interaction-design
  - prototyping
  - ai-coding-workflow
categories: [ai-era]
sources:
  - kind: video
    title: "The New Full-Stack Designer"
    url: https://www.youtube.com/watch?v=eojywvxqoLc
    author: Y Combinator
    publishedAt: 2026-10-26
---

> **In one sentence:** once generation is nearly free, the designer's job shifts from producing screens to defining the problem, decomposing the complexity, and choosing among a flood of candidates — and that judgment is the scarce part.

## Quick orientation

### What this is

An episode of YC's Design Review. Aaron Epstein interviews Marvin Schwaibold, who leads the product design studio at Shopify; before that he ran the Brooklyn studio Molly with a partner, working with clients including Collins, Apple and Google. The first half walks through his own workflow with AI. The second half is a live review of six websites submitted by viewers.

The first half is rich in screen demos: the redesigned Shopify admin, Sidekick's suggestion cards, a carousel that took 91 prompts to feel right, and a weekend project that rebuilt real grass as a shader. The second half is the most portable part — six critiques, two or three notes each, all circling the same handful of principles.

### The question underneath

If AI can write code, generate interfaces and animate them, what is left for a designer? And more concretely: why do so many "AI-built" sites look more polished than before, while making it harder for a visitor to know where to start?

### What he concludes

1. **The process hasn't changed; the tooling has.** His words: the work is still "extremely iterative and sequenced out." What moved is the chain — Figma has been demoted from canvas to scratch pad, and the real artifact is now a prototype you can tap on a phone.
2. **The designer has become an editor.** Output is no longer the constraint; the constraint is being "extremely selective" about which output survives.
3. **Prototypes replace PRDs.** Inside Shopify a running prototype spreads "like wildfire" — far faster than a document — and a prototype the CEO likes is enough to greenlight work.
4. **The model does not know what looks good.** It can execute complexity you could not hand-write, but taste and quality control stay with the human.
5. **Almost every review failure is the same failure:** no single primary goal, no progressive disclosure, and controls taken away from the user.

### How the episode moves

The first half is his own workflow: how the tool chain changed, why the human moved into the editor's seat, what Shopify's two projects (the admin redesign and Sidekick) show about designers building their own material, and a weekend grass-shader project that demonstrates how to decompose a vague intent for a model. The second half is six site reviews, each landing on the same few rules.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Opening: the process is unchanged, Figma demoted from canvas to scratch pad |
| 3:25 | The two halves of Shopify's studio: admin redesign and Sidekick |
| 15:32 | Sidekick suggestion cards: bring UI to the user instead of making them click through |
| 21:58 | The grass shader: splitting a video into light, shadow and terrain |
| 23:48 | The terrain-map insight: the ground is not flat, it is small hills |
| 26:16 | DialKit: turning parameters into sliders instead of tuning through chat |
| 33:12 | Review one: one primary goal per page |
| 38:25 | Review two: AI illustrations that look like explanations and are not |
| 49:35 | Review three: every homepage section is the first chapter of a child page |
| 56:06 | Review four: scroll hijacking takes control away from the user |

## Going deeper

### The loop is the same; the waiting is gone

The line most likely to be misread is "the process itself hasn't really changed." He does not mean the craft stood still. He means the shape of design is still sketch, iterate, choose — but the waiting inside each stage has collapsed.

At Molly, a site went through hand-drawn layouts, high-fidelity screens in Figma, an engineer implementing the motion, and rounds of correction. His current loop looks more like: sketch a few crude boxes in Figma to describe a behavior, split the request into subtasks for Codex or Claude Code, get a prototype running on his phone, then judge it directly.

![Design loop from sketch to running prototype, with the human at both ends](/images/new-full-stack-designer-loop-en.svg)

*Figure: the loop answers what an AI-assisted design day actually looks like — the human sits at both ends (framing the problem, judging the result) while the model carries the middle.*

His description of the division of labor is restrained: he drives the AI to do the heavy lifting, but quality control and decision-making stay with designers, because "the output isn't the issue anymore, it's us being extremely selective." Then the sharper claim: AI raised everyone's ceiling but it is "not a crafter." It can execute technical complexity he could never hand-write, yet "it doesn't know what looks good and what looks bad."

That is also why he insists on understanding the complexity and breaking it into subtasks. The model is not incapable; hand it an undifferentiated lump and it can only return an undifferentiated result.

### Figma as a scratch pad: drawing what you cannot say

The grass shader weekend project is the best lesson in the episode about expressing intent to a model.

He fed a video of real grass to Codex and asked for pixel-level fidelity, matching hex codes, and an understanding of every part of the frame before rebuilding it. The first output did not resemble grass. So he screenshotted it, brought it back alongside the original video, explained what he was trying to do, and asked a second agent why the first one could not understand him. The advice that came back was concrete: say where the light comes from, describe the shadows, split the image into six parts and do them separately, then recombine.

The real turning point was a representation problem. He asked for a topographic map of the structure underneath the grass — and discovered he had never explained that the ground was not a flat layer but a field of small hills. Once the height structure was supplied, blades could grow on the terrain and the image snapped into place.

There is a second lesson here worth keeping. A colleague glanced at it and said the blade length looked wrong. He asked Codex how many blade variations existed: around two hundred thousand, differing by fractions of a parameter. So they built a panel that exposed length and wind as sliders and tuned it by hand. Exposing the underlying structure, he says, did more than save a conversation: it revealed that his terrain implementation had been skewed all along — a misunderstanding from five prompts earlier that was invisible in the chat log.

This is what "fine-grained controllability" means in practice. Chat is good for exploring; it is bad for tuning. Precision needs visible, draggable variables.

### From "design it and hand it off" to "build it and show it"

Shopify's studio does two things that sound contradictory: rebuilding the entire admin interface, and building Sidekick, which operates the store through conversation. He calls them "two almost controversial, paradoxic sectors" that meet on the same product line — the less the interface asks you to click, the more the product has to bring suggestions to you.

Sidekick's suggestion cards are the concrete version. The system notices that a product description should be rewritten, puts the proposed change and a publish action into the home feed, and a confirmation rewrites the store. The framing: can we bring UI to the user, into context, instead of making the user click through the interface.

What enables that cadence is organizational. At Molly a direction required coordinating a thousand counterparts; now a team of two can do the work of many, because validating an idea got cheaper. And the vehicle for validation is the prototype, not the document. He is blunt about it: prototypes are "a million times more useful than any PRD," and they spread through the company like wildfire. A prototype the CEO likes is enough to go build.

There is an important boundary here. What designers build lives in a playground, not production code, and would not be allowed into Shopify's main repository. They are building **evidence for a decision**, not code to merge. That distinction is what makes "designers who build" practical rather than reckless.

### DialKit: expose the variables

The carousel that took 91 prompts was inspired by designer Mike Matas's portfolio: you drag an artifact downward, release it, and energy ripples outward, colliding with the artifacts on either side.

That feel cannot be specified in prose. "The faster I pull, the stronger the boost" is a parameter you have to test with your hands. So he built a side panel that turns pull boost, rebound and collision range into sliders. His account is plain: I know when it feels off, but going back and forth with chat just doesn't work — you need to expose those values.

The transferable rule: **if you can judge it with your eyes and hands, do not negotiate it in text.** A numeric intermediate layer — sliders, toggles, a rendered terrain — gets closer to what a designer actually wants to control than any prompt.

### Six reviews, seven rules

The second half is six rapid diagnoses. The sites differ, the failure modes repeat.

**1. One primary goal per page.** Endstack put an entire desktop environment on its homepage. Clever — you are already inside the product — but overloaded: sidebar, chat history, hero, and several same-colored buttons all competing. Schwaibold quotes his German typography professor: this poster does not dictate; nothing tells you where to look. When there is no primary goal, the user clicks nothing. The fix is to collapse the noise and leave a headline plus one obvious way in.

**2. Content behind tabs does not exist.** SkillSync showed its features as a row of sidebar tabs. His verdict is harsh: users will not open every tab, so whatever is hidden behind them will never be seen. The alternative is subtraction first — compress the feature set into the three things that matter, show them as tappable cards, and disclose detail one layer down. He adds a counterintuitive note: people are perfectly comfortable scrolling, so a longer page is fine; compressing and hiding is the problem.

**3. Deliver the aha moment before asking for a sign-up.** Instaplay generates small games from a prompt, but its title sat above no explanation at all. Both reviewers went straight to the thumbnails, played somebody else's game, and missed the actual point — that you can make your own. Worse, submitting a prompt led to a sign-in wall; charging admission before the user has seen anything they made almost guarantees a loss. His reading: acquisition cost should be spent getting someone to the moment they play their own game, and sign-up belongs at the point where they want to save or share it.

**4. AI illustrations often only look like explanations.** Pointing at a set of animated graphics, he notes the machine fingerprints: tiny text, a dot sliding between corners that no human would have bothered to program. They fill space without improving understanding. The positive counterexample is Gemini's braided helix animation, which was itself an explanation of what the model could do, and therefore remembered. The lesson is not "don't generate visuals" — it is that explanatory graphics need information-design skill, sometimes a specialist.

**5. Social proof belongs in the right place, and visuals must not drown the copy.** Mintlify is the positive case: clean headline, one supporting sentence, a prominent button, a restrained network graphic in the background, and a logo wall of Microsoft, Anthropic, Coinbase and Spotify — in a crowded market, that wall is the reason to look twice. But he still finds faults: card headlines too small, the braided animation reused until it loses its magic, and a genuinely important claim ("you can build on top of your existing setup") buried under a screenshot.

**6. Every homepage section is the first chapter of a child page.** This is the "primal" method he and his partner worked with: if product, solutions, resources and pricing are the four important parts, they belong on the homepage in that order, because attention drops as people scroll. Each section then leads into its child page.

![Homepage sections as the first chapter of each child page, ordered by scroll depth](/images/new-full-stack-designer-chapters-en.svg)

*Figure: the diagram answers why navigation content belongs on the homepage — the order of sections is itself a statement of priority.*

**7. Do not take scrolling away from the user.** The last two sites hijack scroll with smoothed animation; you try to stop on a frame and the page keeps pushing. His language is strong — smooth scrolling is "a disaster in the industry." The reason is not taste but cognition: thought is interruptible, you will half-think something and click elsewhere. Apple has shipped interruptible interfaces for decades. He closes with Diderot: enter politely and quietly.

He ends by pointing at an open-source carousel kit (Blossom Carousel) that fixes the recurring problem in the reviews — carousels that cannot be dragged or swiped, only clicked with buttons.

## Making it yours

### The compressed version

- **Division of labor:** humans frame, decompose and judge; models generate, execute complexity and absorb infinite retries.
- **Expression:** draw what you cannot describe, turn parameters into sliders, and give the model the right representation (a terrain map) rather than more adjectives.
- **Organization:** a prototype is a decision tool, not a deliverable; it travels faster than a document, which is why it changes how a company moves.
- **Critique:** one primary goal, progressive disclosure, nothing hidden behind tabs, the aha moment before the sign-up, visuals that serve the copy, homepage as chapters, scroll left to the user.

### Where else this transfers

None of this is web-specific. The same tests apply to a deck, a report, or a product doc: one idea per page; never bury the conclusion in a collapsed section; delete the decorative chart you cannot explain in one sentence; treat the reader as someone who may leave at any moment rather than someone who will read to the end.

The collaboration habits transfer too: decompose into subtasks, keep intermediate artifacts, and externalize tacit judgment into something adjustable or comparable.

### Check your understanding

**1. He says the process hasn't changed. What did change?**

Reference answer: the tool chain and the waiting time. Design is still sketch, iterate, choose, but Figma has become a scratch pad and the intermediate artifact is a runnable prototype. Ideas that used to require an engineer to validate can now be seen by a designer within hours, which multiplies both the number of iterations and the space of options.

**2. Why does he describe the designer as an editor?**

Reference answer: because generation stopped being the bottleneck. The model produces candidates cheaply, so value moves to selection — setting the bar, deciding which version meets it, deciding what to cut. His phrasing is that output is not the issue; being selective is.

**3. What did the terrain map actually solve in the grass project?**

Reference answer: a representation problem. The model was treating grass as a single flat layer, so no amount of prompting produced realism. Rendering the height structure underneath let blades grow on real relief. It also exposed that his own terrain implementation had been skewed — a mistake made five prompts earlier that the conversation never surfaced.

**4. Why is a tool like DialKit better than more chatting?**

Reference answer: because many judgments are tactile rather than propositional. "The faster I pull, the stronger the boost" is hard to state precisely in words and easy to feel through a slider. Chat suits exploring direction; tuning needs continuous, immediate, reversible control.

**5. Why is content behind tabs effectively invisible?**

Reference answer: because users do not open every tab. The designer knows what is behind each one; the visitor does not, and has no reason to find out. The fix is to subtract first — compress features into the three that matter, present them as tappable cards, and push detail one level down.

**6. What is his standard for criticizing AI-generated explanatory graphics?**

Reference answer: whether they make anything clearer. Those animations carried machine fingerprints — tiny text, pointless dot motion — and merely filled space. The counterexample, Gemini's braided helix, turned a capability into visible motion and was remembered for it. Explanatory graphics need information design, not just generation.

**7. Why is he against smooth scrolling?**

Reference answer: it removes control from the user, and attention is inherently interruptible. If you want to stop on a frame and the page keeps advancing, you end up fighting the trackpad. His rule is native scroll that follows the user's speed instead of forcing the user to follow the page's.

### Common misreadings

- **"AI makes designers faster, so we can think less."** The opposite: faster generation raises the density of decisions, and a vague bar drowns you in candidates.
- **"A prototype is just a visual aid."** Here it is decision evidence — it replaces the PRD for getting a project approved and replaces argument inside a review.
- **"Showing every feature makes a page complete."** That is precisely what the reviews keep punishing; completeness serves the author, clarity serves the reader.
- **"More motion means more modern."** Nearly every failing site had motion; the problem was motion that explained or guided nothing.
