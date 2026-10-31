---
slug: "01-karpathy-llm-wiki"
title: "Karpathy's LLM Knowledge Base: A Markdown Wiki Maintained by the Model"
summary: "Keep raw sources in raw/, have an LLM incrementally compile them into a Markdown wiki with summaries, backlinks, and concept articles, then query and refine that wiki."
updatedAt: "2026-10-31"
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
    publishedAt: "2026-04-03"
---

## The claim

Karpathy describes a workflow that has recently become practical: **let an LLM maintain a personal knowledge base while the human supplies sources and asks questions**. His token usage has been shifting from manipulating code toward manipulating knowledge stored as Markdown and images.

The interesting part is not "use AI to summarize articles". It is handing the **writing and maintenance** of the wiki to the model; the human rarely edits it directly.

## The pipeline in six stages

### 1. Ingest

Index source documents — articles, papers, repositories, datasets, images — into a `raw/` directory. Web articles are converted to Markdown with Obsidian Web Clipper, and a hotkey downloads the related images locally so the model can reference them.

### 2. Incremental compilation

The LLM incrementally compiles `raw/` into a wiki: a collection of `.md` files in a directory structure containing

- summaries of everything in `raw/`,
- backlinks,
- articles organized by concept, linked to one another.

"Incremental" matters: when new material arrives, only the affected parts are updated rather than regenerating everything.

### 3. IDE

Obsidian is the frontend for viewing raw data, the compiled wiki, and derived visualizations. The model writes; the human reads. Occasional plugins (Marp, for example) provide alternative renderings.

### 4. Q&A

Once the wiki is large enough — roughly 100 articles and 400K words for one of his research topics — you can ask an agent complex questions and it will research the wiki to answer them.

A counterintuitive result: **at this scale, elaborate RAG is unnecessary**. The model maintains index files and short summaries of each document and can read the relevant material fairly easily.

### 5. Output and filing

Answers do not end as terminal text. They are rendered as Markdown files, Marp slide decks, or matplotlib figures and viewed back in Obsidian. More importantly, outputs get **filed back into the wiki**, so each exploration compounds the knowledge base.

### 6. Linting and tooling

- **Linting**: LLM "health checks" find inconsistent data, impute missing fields with web search, and surface connections that suggest new articles.
- **Tools**: small utilities such as a naive wiki search engine, usable directly through a web UI or handed to the model as a CLI tool for larger queries.
- **Further work**: as the corpus grows, synthetic data generation and fine-tuning could put the knowledge into the weights rather than only the context window.

## Why it matters

| Stage | Conventional approach | This approach |
| --- | --- | --- |
| Organization | Human curates and categorizes | Model compiles and links incrementally |
| Retrieval | Vector store plus RAG pipeline | Index files and summaries, read directly |
| Output | A one-off answer | Rendered, filed, and fed back into the wiki |

The value is **compounding**: every question leaves an artifact, and the next question starts from a richer base.

## Limits and open questions

- **Scale.** 400K words is the author's stated magnitude. Whether index files and summaries still suffice for much larger corpora, multiple users, or frequent updates is not addressed.
- **Quality.** A model-maintained wiki can contain duplicates, contradictions, and misclassifications. Linting helps but does not replace review.
- **Compilation granularity.** A commenter asks how incremental compilation should decide directory structure and batch size when documents are processed one at a time without global context, and whether multiple stages are needed. The post does not answer this; it is exactly the part practitioners must work out themselves.
- **Cost.** Compiling, linting, and querying all consume tokens; whether that beats manual upkeep depends on how often the wiki is used.

## Questions worth pressing on

1. When two wiki entries contradict each other, who decides which one wins?
2. How does incremental compilation avoid silently overwriting an older conclusion without a change record?
3. When should you move from "the model reads the wiki" to "fine-tune the knowledge into the weights", and what signals that transition?

## Relation to this vault

The structure here is close: `Clippings/` plays the role of `raw/`, and `Knowledge Site/` is the compiled wiki. The difference is that the current process still generates one note per clipping; it does not yet do the automatic linking, linting, and answer-filing the post describes.
