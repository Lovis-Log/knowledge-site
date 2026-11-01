---
slug: 03-how-i-use-llms
title: "How I use LLMs: from chat box to toolbox"
summary: "Following Karpathy's everyday usage: context windows, model tiers, reasoning models, web search, deep research, files and code tools, voice, images and video, plus memory, custom instructions and Custom GPTs. The focus is what each capability is good for and where it fails."
updatedAt: 2026-11-01
content_type: video-course
categories: [ai-agents]
tags: [llm, tool-use, multimodal, workflows]
sources:
  - kind: video
    title: "How I use LLMs"
    url: https://www.youtube.com/watch?v=EWvNQjAaOHw
    author: "Andrej Karpathy"
    publishedAt: 2025-02-28
---

## From one text box to a toolbox

The previous lecture covered how models are trained. This one covers how to actually use them. Karpathy starts from a simple observation: ChatGPT was the first product, in 2022, that let people talk to a large model through a text box, but by 2025 the ecosystem is a crowd of competing chat apps, each adding its own tools.

His operating principle fits in one sentence: **decide what kind of capability the task needs, then choose the model, the tool, and whether to supply material**. Everything else in the lecture elaborates on that sentence.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The LLM app ecosystem: ChatGPT, Gemini, Copilot, Claude, Grok and others |
| 3:04 | The token stream and context window behind a chat |
| 13:31 | Everyday knowledge questions: caffeine, cold medicine |
| 18:18 | Model tiers and pricing: free, Plus, Pro |
| 23:07 | Thinking models and when to use them |
| 31:31 | Tool use: web search |
| 42:08 | Tool use: deep research |
| 51:22 | Uploading files into context |
| 59:11 | Tool use: the Python interpreter and a fragmented ecosystem |
| 1:04:42 | Advanced Data Analysis: plots, fits and a failure |
| 1:09:10 | Claude Artifacts: small apps and concept diagrams |
| 1:14:18 | Cursor and Composer: writing code inside a repository |
| 1:22:48 | Speech input and read-aloud output |
| 1:27:47 | Advanced Voice: audio handled natively |
| 1:37:30 | NotebookLM and podcast generation |
| 1:40:37 | Image input and OCR |
| 1:47:08 | Image generation |
| 1:49:29 | Video input: pointing a camera at things |
| 1:52:24 | Video generation |
| 1:53:53 | Memory and custom instructions |
| 1:58:53 | Custom GPTs: freezing a prompt into a tool |
| 2:06:45 | Summary |

## First, understand what you are operating

### A chat is a token stream

The screen shows alternating bubbles. Underneath there is a single one-dimensional token sequence: you write a segment, the model continues it, then emits a special "I am done" token and hands control back.

Starting a new chat wipes that sequence and begins again.

That sequence is the **context window**, the model's **working memory**: anything inside it can be read directly at every step; anything outside it is invisible.

### The model is a compressed archive

Karpathy's rough but useful metaphor: the model is like a multi-terabyte archive.

- Pretraining compresses the internet into parameters. It is **lossy**: what remains is statistical structure and vague recollection, not a searchable copy of the web.
- Post-training adds an assistant persona, like a smiley sticker on the archive.
- The archive cannot browse, calculate, or run code on its own — unless you attach tools.

Two practical rules follow immediately:

1. Knowledge has a cutoff; recent and obscure facts are the least reliable.
2. By default there are no tools, so "look it up" and "calculate it" are really "guess from memory".

## Everyday use and two habits

### When it is safe to just ask

For questions like caffeine content, common medicine ingredients or travel suggestions, Karpathy asks directly, because:

- the topic does not change recently;
- it is discussed abundantly online, so the model has strong recollection;
- it is not a high-stakes decision, so an error is tolerable.

Even then he checks primary sources. For medicine ingredients he reads the box — because the model is producing a probabilistic recollection, not performing a lookup.

### Habit one: start a new chat when switching topics

A long context costs twice:

- **Attention cost** — irrelevant history dilutes attention and degrades answers;
- **Compute cost** — more tokens means slower and more expensive generation.

Starting a new chat is the cheapest quality optimisation available.

### Habit two: know which model you are using

Each provider sells several tiers: the free tier may be a small model, the paid tier the flagship. Karpathy makes a point of knowing which model is active and deciding whether a task justifies an upgrade.

His personal trade-off: use the flagship non-reasoning model for most daily work, switch to a reasoning model for hard problems, and subscribe to several providers to form his "LLM council" — the same question asked of several models, answers compared.

## When reasoning models help

Reasoning models receive extra reinforcement-learning training. They spend more tokens thinking, backtracking and recomputing. The cost is latency; the benefit is accuracy on hard problems.

A concrete example: Karpathy's gradient check failed, so he pasted the code into GPT-4o. The model listed several plausible causes but missed the real one. Swapping to a reasoning model, it thought for a minute and found that the parameters were packed and unpacked in the wrong order.

Two caveats:

- Reasoning models are wasted on simple lookups and chit-chat;
- Reasoning is not exclusive to reasoning models. For the same bug, Claude 3.5 Sonnet — not a thinking model at the time — also found the issue immediately.

Practical strategy: start with the fast model; if the answer is clearly not good enough, resend the same prompt to a reasoning model.

## Tools: let the model read instead of remember

### Web search

Model knowledge stops at training time, so recent information is simply unavailable. Search works like this: the model emits special search tokens, the application pauses generation, queries a search engine, pastes the retrieved page text into the context window, and the model answers from that text with citations.

Search is the right tool when the answer is:

- time-sensitive (today's market, this week's release date);
- obscure (where a show was filmed);
- subject to change (whether a company offers a feature).

**Citations must be opened and checked.** Search reduces hallucination but does not remove it: the model can misread a page or cite something that does not support the claim.

Integration varies by product. Some models decide to search automatically, some require a manual toggle, some have no search tool at all — the same question can give completely different results across apps.

### Deep research

Deep research combines search, reasoning and long run time: the model issues dozens of searches, reads papers and pages, and returns a cited report tens of minutes later.

It suits:

- topics that require synthesising many sources (a supplement's mechanism, safety and human trials);
- product comparisons (privacy policies of two browsers).

It does not suit:

- precise numeric tables. Asked to compile "major US LLM labs" with size and funding, the result omitted xAI and included a non-US organisation.

Treat the output as a **strong first draft and a bibliography**, not a database of facts.

## Putting material into context

### Uploading files

Instead of hoping the model remembers a paper, drag the PDF into the chat. It is converted to text, loaded into context, and can be questioned section by section.

One practice Karpathy uses heavily is reading a book together with the model: find the raw text of a chapter, paste it in, ask for a summary, then read and ask questions as he goes. He reports a marked improvement in comprehension and retention, especially for other fields or very old texts.

Note the underlying detail: images inside large PDFs are likely discarded, leaving only text; scanned documents are only as good as the OCR.

### The Python interpreter

Mental arithmetic is unreliable; code is not. ChatGPT is trained to write Python, run it, and read the result when a calculation exceeds what it can do in its head.

The comparison is instructive:

- ChatGPT called the interpreter and got the right answer;
- Grok 3, without an interpreter, guessed in its head and was very close but wrong;
- Claude wrote JavaScript and was correct;
- Gemini did the arithmetic mentally: right on the easy case, wrong once the numbers grew.

**The tool decides correctness.** So for numbers, dates and string manipulation, explicitly ask the model to use code.

### Advanced Data Analysis

With a data file uploaded, the model writes code, computes statistics and draws charts. It produces figures quickly, but it also makes assumptions silently.

Karpathy's example: plotting OpenAI's valuation over time, the 2015 entry was N/A, and the model wrote 0.1 (i.e. $100M) into the code without saying so. Later, extrapolating to 2030, the narrative claimed $1.7 trillion while the printed variable implied a different order of magnitude entirely.

The lesson: **treat it as an absent-minded junior analyst**. Read the code, check the assumptions, and do not trust the conclusion alone.

### Artifacts and concept diagrams

Claude Artifacts renders generated React code directly in the browser, producing a small app — flashcards, for example. Convenient for personal use, with no backend or database.

What Karpathy uses most is **concept diagrams**: ask Claude to draw a chapter as a Mermaid diagram, turning the argument structure into something spatial. For visual thinkers this is easier to remember than a linear summary.

### Working inside a codebase

Web chat is not enough for professional programming because it cannot see your files. Tools like Cursor read the project, assemble the relevant context, and call the model.

The evolution is clear: `Cmd-K` to change a line → `Cmd-L` to explain a block → `Cmd-I` (Composer) to let an agent edit across files and run commands. Handing over control and hoping it works is what people now call vibe coding.

The risks are real: it may import nonexistent dependencies or download resources from unknown sources. Karpathy's stance is that **you can always fall back to ordinary programming** — the files are there and you can edit them yourself.

## Multimodality: voice, images, video

### Speech in and out

The simplest form is speech-to-text: the microphone transcribes your voice, and the rest is an ordinary text conversation; on the output side, read-aloud converts text back to speech. On desktop without a built-in microphone, a system-wide transcription tool fills the gap.

The mechanism is still text — only the input and output are faster. Karpathy estimates about half his queries are spoken because typing is too slow.

### Advanced Voice

Advanced Voice is **true audio**: audio is chunked, quantised into tokens, and processed by the same machinery as text. It listens and speaks directly, with no text in between.

The difference is audible in the demo: it can change voice, tell a story, count, imitate animals; it also refuses some requests because of safety policies.

Styles differ sharply between products: some are highly constrained, others barely at all.

### NotebookLM and podcasts

Upload sources, and NotebookLM can generate a podcast-style conversation, with the ability to break in and ask questions. Useful for commutes and walks when you have a passing interest in an obscure topic.

### Image input

Images are split into patches, quantised into tokens, and fed to the same model. Karpathy's habit is worth copying: **first ask the model to transcribe the key information into a table**, confirm it read the numbers correctly, then ask questions about the text.

He has used this on nutrition labels, blood-test screenshots, toothpaste ingredients and memes. For medical information his judgement is that common lab values are well represented in training data, but a doctor should still be consulted.

### Image and video generation

Image generation is not the same model: the language model writes a caption, which is passed to a dedicated image model. Video generation works the same way, with Sora, Veo and similar tools handling that stage.

Video input is real-time camera conversation: point the lens at a book, an instrument, a map, and the model identifies and explains. Under the hood it is probably sampling frames, but the experience feels like streaming video.

## Making it know you: memory and customisation

### Memory

By default every conversation starts from zero. ChatGPT's memory feature stores a small set of facts about you in a separate database and prepends them to every conversation.

Karpathy's experience: over time it does become more relevant to his preferences, but it must be triggered explicitly and can be reviewed and edited. Other products did not have an equivalent at the time.

### Custom instructions

Write down how you want the model to speak: tone, whether to expand explanations, the level of formality for a language you are learning. This removes the need to repeat it every conversation.

### Custom GPTs

In essence, **freezing a frequently used prompt into a tool**. Karpathy uses them for Korean:

- a vocabulary extractor that turns a sentence into "Korean;English" pairs ready for Anki;
- a detailed translator that gives the whole sentence, then breaks it down piece by piece, with follow-up questions allowed;
- a screenshot translator that OCRs, translates, then breaks down.

The key is that the prompt contains **concrete examples** (few-shot), not just a description. This mirrors how models themselves are trained: the description sets direction, the examples set precision.

## Takeaways

- The context window is working memory; start a new chat when switching topics to save both attention and money.
- Know which model and tier you are using before deciding whether to upgrade.
- Reasoning models are for hard problems, not daily ones; start fast, escalate when needed.
- Search, deep research, file uploads and code execution all do the same thing: **put reliable information into context** instead of relying on memory.
- Check citations, re-verify numbers, read the code. Tools reduce hallucination but do not remove it.
- Multimodality is just audio and images turned into tokens; the machinery is unchanged.
- Memory, custom instructions and Custom GPTs all reduce repetition by moving stable preferences to the front.

## Comprehension check

**1. Why does starting a new chat both improve quality and reduce cost?**

Reference answer: Attention weights are normalised over all visible tokens in a request, so irrelevant history takes weight away from the current instruction and dilutes the model's focus, making drift or missed constraints more likely. On cost, a longer context means more content to read and compute for every generated token, raising latency and price; if prompt caching is active, a changed prefix also invalidates the cache. A new chat clears the window, concentrating attention on the current task and shrinking each request.

**2. Why does web search reduce hallucination, and why can it not eliminate it?**

Reference answer: Search places page text in the context window, so the model can rely on text in front of it rather than on vague parameter memory. This addresses both the knowledge cutoff and poorly remembered obscure facts, and it provides sources that can be checked. It cannot eliminate hallucination because the model may misread a page, cite a source that does not support the claim, or draw a wrong inference while combining several passages. Search changes the information available, not the underlying next-token prediction.

**3. In Karpathy's multiplication comparison, why do models differ so much, and what does that imply?**

Reference answer: The difference comes mainly from whether the model actually invoked a code-execution tool. Models with an interpreter hand the calculation to Python and get an exact result; models without one, or that choose to compute mentally, must finish the whole multiplication inside a single token and frequently err — and the error is close to the right answer, which makes it deceptive. The implication: for arithmetic, string processing and date conversion, explicitly require code execution rather than accepting a mental result, and be aware that different apps expose different tools.

**4. What is deep research good for, and why can't its tables be trusted directly?**

Reference answer: It suits tasks that need many sources synthesised, that require reading papers and web pages, and where some fuzziness is acceptable — for example the mechanism and safety of a supplement, or the privacy policies of two browsers. It is unsuitable for precise, complete, verifiable numeric tables. The report is assembled over a long run and can omit a key entity (xAI was missing), include an out-of-scope one, or state numbers that were not verified. Use it as a strong first draft and a bibliography, then check the primary sources.

**5. What risk does the Advanced Data Analysis example illustrate, and what should you inspect?**

Reference answer: The model silently replaced a missing N/A value with 0.1 ($100M) in the code, and later reported an extrapolated 2030 valuation of $1.7 trillion while the printed variable implied a different order of magnitude. The risks are **silent assumptions** and **inconsistency between the narrative and the code output**. Inspect three things: how missing values and outliers were handled; whether key constants and units in the code are correct; and whether the stated conclusion matches what the code actually prints. Treat the model as a careless junior analyst.

**6. Why do Custom GPTs and custom instructions improve results, and what are they really?**

Reference answer: They freeze a stable prompt — role, task description and several examples — so it need not be retyped each time and every run uses the same constraints. The improvement comes from two things: concrete examples (few-shot) constrain output format and judgement more tightly than description alone, and global instructions move long-term preferences to the front, reducing repetition and omission per turn. They do not add capability; they turn prompt engineering into a reusable, manageable configuration.

## How this connects

This lecture is the map of the usage layer: which capabilities exist, what each is good for, and where each fails. The deep-dive lecture explains how those capabilities were trained; the attention and KV-cache note explains why context management matters so much. Together they form a chain from mechanism to daily practice. The next step is engineering: combining these capabilities into agent workflows that deliver reliably.
