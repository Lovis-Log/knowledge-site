---
slug: "01-karpathy-llm-wiki"
title: "Karpathy's LLM Knowledge Base: Let the Model Maintain a Markdown Wiki"
summary: "Source material lands in raw/, an LLM incrementally compiles it into a Markdown wiki with summaries, backlinks, and concept articles, and then answers questions over that wiki. Humans almost never edit it."
updatedAt: 2026-11-01
content_type: "social-post"
tags:
  - "llm-workflow"
  - "knowledge-base"
  - "markdown"
  - "obsidian"
sources:
  - kind: "article"
    title: "Post by @karpathy on X: LLM Knowledge Bases"
    url: "https://x.com/karpathy/status/2039805659525644595"
    author: "Andrej Karpathy"
---

## The claim

Lately a large fraction of Karpathy's token throughput has gone not into manipulating code but into manipulating **knowledge**, stored as Markdown and images. The reason is simple: current models are quite good at it.

The setup is a personal knowledge base: **source documents land in `raw/`, an LLM incrementally compiles a wiki, and the human reads and asks questions in Obsidian**.

One premise deserves emphasis: the wiki is written and maintained by the LLM, and the human rarely touches it. That is the opposite division of labour from "human writes notes, AI polishes them".

## Six stages of the workflow

### 1. Data ingest

Index source documents — articles, papers, repos, datasets, images — into a `raw/` directory, then use an LLM to incrementally **compile** a wiki, which is just a collection of `.md` files in a directory structure.

The wiki contains:

- summaries of everything in `raw/`
- backlinks
- articles organized by concept, linked to one another

Web articles are converted to Markdown with the Obsidian Web Clipper, and a hotkey downloads related images locally so the model can reference them directly.

### 2. IDE

Obsidian serves as the frontend: it shows the raw data, the compiled wiki, and derived visualizations side by side. The author mentions experimenting with plugins for other renderings, such as Marp for slides.

### 3. Q&A

Once the wiki is large enough — roughly 100 articles and 400K words for one research topic — you can ask it complex questions and let the agent go research the answers.

A counterintuitive result: **no elaborate RAG is needed**. At this scale the model maintains its own index files and short per-document summaries, and reads all the relevant material without much trouble.

### 4. Output

Answers do not have to be text. The model renders Markdown files, Marp slide decks, or matplotlib figures, which are then viewed back in Obsidian. Different questions invite different visual formats.

More importantly, outputs are often filed back into the wiki, enhancing it for later queries. Explorations accumulate instead of scattering across chat logs.

### 5. Linting

"Health checks" run over the wiki to:

- find inconsistent data
- impute missing data with web searches
- surface interesting connections that deserve new articles

This is incremental cleanup aimed at overall data integrity. Models are also good at suggesting what to ask next.

### 6. Extra tools

Small tools get built along the way. One example is a naive search engine over the wiki, vibe-coded, usable directly in a web UI and often handed to an LLM via CLI for larger queries.

### The next step

As the repository grows, the natural ambition is synthetic data generation and fine-tuning, so the model "knows" the data in its weights rather than only in context. This is mentioned as a direction, not described or implemented.

## The one-line summary

Raw data from a set of sources is collected, compiled by an LLM into a `.md` wiki, and then operated on by various CLIs for Q&A and incremental enhancement, all viewable in Obsidian. You rarely write or edit the wiki manually; it belongs to the LLM. The author believes there is room here for an incredible new product rather than a hacky collection of scripts.

## Open questions

The comments raise a question the author does not answer: **the granularity and batching of incremental compilation**.

A commenter notes that processing one document at a time leaves too little context to decide how to divide directories, and asks whether there is an optimal batch size or a multi-stage process. The author replies only that he was thinking of making a video about it.

That exposes the least transparent part of the method. The directory structure, the split into concept articles, and the level of detail in summaries all depend on LLM judgment, and that judgment may drift with batch size. At small scale it is invisible; at several hundred articles, structural drift becomes maintenance cost.

There is also an implicit assumption: **the model can reliably maintain indexes and summaries**. The author's experience is that this holds at his scale, but 400K words is a specific magnitude, and the post offers no data on what happens beyond it.

## Comprehension check

**1. Why does the author say complex RAG is unnecessary, and what does that conclusion depend on?**

Reference answer: At roughly 100 articles and 400K words, the index files and short summaries the LLM maintains are enough for it to locate and read the relevant material, without a separate vector-retrieval or chunking pipeline. The conclusion depends on two premises: the wiki stays at a scale where the model can read the relevant files directly, and the model reliably maintains indexes and summaries. At a much larger scale, or with degraded indexes, it would not necessarily hold.

**2. How does the human/model division of labour here differ from the common pattern?**

Reference answer: The common pattern is that a human writes notes and AI assists with polishing or retrieval. Here it is reversed: the LLM writes and maintains all wiki content, while the human mostly reads, asks questions, and judges in Obsidian, almost never editing the wiki directly. The benefit is continuous incremental compilation and linting; the cost is that the human must trust the model's categorization and summaries, and must be able to notice structural drift.

**3. Why does filing outputs back into the wiki matter?**

Reference answer: It turns each exploration into a knowledge asset. If an answer only lives in a chat, the next query has to rediscover it; once filed, later queries reuse it and the wiki becomes more useful. This is the same loop as linting surfacing new article candidates: the more the base is used, the more complete it becomes.

**4. What unresolved question do the comments raise, and why does it matter?**

Reference answer: The batching and staging of incremental compilation — processing one document at a time leaves too little context to decide directory structure, and the author does not say whether an optimal batch size or multi-stage process exists. It matters because directory structure and concept division determine whether the wiki is usable at all, and different batch sizes can produce inconsistent categorization that gets harder to correct as the wiki grows.

## How this connects

This post gives a framework in which the model maintains the knowledge base. It is the same kind of work as compiling clippings into a reading site — ingest, compile, question, write back — with one difference: here the product is a Markdown site for humans, while Karpathy's product is a wiki for the model to query. For the engineering side of how an agent organizes context and compacts history, see the Codex agent loop chapter in the AI Agent Engineering notes.
