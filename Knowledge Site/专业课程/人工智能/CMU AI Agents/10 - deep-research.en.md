---
slug: "10-deep-research"
title: "Deep Research Agents: Retrieval, Evaluation, and Training"
summary: "Deep research agents answer questions that have no single source by planning, searching, and reflecting repeatedly. This lecture covers benchmarks, rubric evaluation, three-stage training, and agent-aware retrieval."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "ai-agents"
  - "deep-research"
  - "retrieval"
  - "evaluation"
sources:
  - kind: "video"
    title: "CMU AI Agents 2026: 10. Deep Research"
    url: "https://www.youtube.com/watch?v=nKUBrXFQBUM"
    author: "Akari Asai"
    publishedAt: "2026-10-10"
  - kind: "article"
    title: "CMU CS 11-768 course site"
    url: "https://cmu-agents.com"
---

## What kind of question needs deep research

"What is my office number at CMU?" takes one search, one page, and one extracted field. That is the classic retrieval-augmented generation (RAG) setting.

"Can an AI agent synthesize scientific literature as well as a human expert?" is not that kind of question: **no single document contains the answer**. The agent must decide what evidence it needs, search several times, notice gaps after reading, revise its queries, and finally synthesize a long, cited answer.

That is the basic shape of a deep research agent:

1. Produce a plan describing what information is needed.
2. Issue a search call; the retrieval system returns documents.
3. Reflect on the evidence: is it enough? What is missing?
4. Revise the query and search again.
5. Synthesize a final, cited answer once the evidence is sufficient.

This raises three research problems at once: how to evaluate, how to train, and how to build better retrieval.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Opening: deep research answers questions with no single source |
| 4:29 | Building benchmarks from real user queries annotated with Wikipedia |
| 8:38 | How current models perform on these benchmarks |
| 13:00 | What makes a question complex: cross-domain, multi-step retrieval |
| 15:18 | Why lexical overlap and similar metrics miss correctness |
| 17:17 | Using a language model to check each rubric criterion |
| 20:46 | The FACT framework: extract claims and verify them one by one |
| 25:47 | Training recipe: mid-training, then SFT, then RL |
| 29:57 | Agentic mid-training on large mixtures of agent trajectories |
| 34:20 | Tool calls are slow: asynchronous parallel execution and caching |
| 38:24 | Sampling several trajectories for the same question and comparing them |
| 42:48 | Results and ablations for rubric-based RL |
| 47:11 | Retrieval is not a backdrop: domain corpora and local stores |
| 48:49 | Encoding documents offline and training embeddings with negatives |
| 49:58 | Generic retrievers ignore the agent's full history |
| 50:34 | AgentIR: feeding reasoning tokens into retrieval |
| 51:25 | Higher accuracy with fewer searches |
| 59:51 | Strong general models versus specialized small models |
| 1:08:17 | Open questions: do benchmark questions reflect real information needs |

## Why classic QA benchmarks fall short

Benchmarks such as Natural Questions collect real search queries and label answers against a snapshot of Wikipedia. Their limitations map directly onto what deep research needs:

| Classic QA | Deep research |
| --- | --- |
| One page is enough | Must combine many sources |
| Mostly English search | Multilingual, multi-region |
| Sports, entertainment, common knowledge | Expert domains, long-tail needs |
| Short entity answers | Open-ended long-form output |
| No provenance required | Evidence must be traceable |

## Four families of evaluation

### 1. Complex but verifiable short answers

**BrowseComp** (OpenAI) is the best-known benchmark here. Its construction is distinctive: start from a known answer (a person, event, or artifact), collect several clues, and combine them into a hard question.

Validation checks that a base model, or five Google searches, cannot answer it directly; a subset is also given to humans to confirm it takes more than ten minutes. The answer is a short entity, so scoring is automatic: check whether it appears in the response.

The results: frontier models around 2025 still struggled even with web access; human experts scored about 25%; a model trained specifically for the task reached roughly 50%.

The cost is high and reproducibility is poor. A single question may need a hundred search calls, the API costs money and adds latency, and Google's results change daily.

**BrowseComp-Plus** fixes reproducibility by freezing a corpus of about 100,000 documents — plausible documents selected by a model and verified by humans, mixed with hard negatives that look relevant but are not — across 830 questions. A fixed corpus makes runs repeatable and makes retrieval itself a research object.

### 2. Expert domains

- **FinSearchComp**: finance, written by MBAs or practitioners, with answers requiring exact computation and often a calculator tool.
- **MedBrowseComp**: medicine.
- **ResearchBench**: find the one paper satisfying several conditions at once.

The common thread: high-quality items require expert annotation and expert verification, which is expensive.

### 3. Open-ended long-form answers

The traditional approach prepares one or a few reference answers and measures similarity. On open-ended tasks this fails for several reasons:

- There are countless valid ways to answer, so references cannot be exhaustive.
- Lexical overlap does not imply correctness — a response can overlap heavily with the reference while contradicting its main point.
- The cited work finds BLEU, ROUGE, and BERTScore agree with expert preference only 57%–62% of the time, barely above chance.

**Rubrics** replace references: experts list what a good answer must contain, each item weighted; a language model then checks whether the response satisfies each item, and the weighted sum becomes the score.

OpenScholar reports expert-expert agreement around 80% and model-expert agreement around 79% on rubric judgments. If the rubrics are good, models can scale the evaluation.

The catch is that rubrics are expensive: a single question can take a PhD-level expert close to an hour to annotate.

### 4. Citation quality

**DeepResearch Bench** uses the FACT framework: extract claims paired with cited URLs, fetch each source, and judge whether it supports the claim. If two claims share a citation and only one is supported, citation accuracy is 50%.

This checks whether citations support claims, not whether the cited evidence itself is trustworthy — still an open question.

### The trap in auto-generated rubrics

ResearchQA generates questions and rubrics from survey papers, producing 21,000 questions and 120,000 rubrics. An expert audit found about 15% of rubrics were wrong: citing papers that do not exist, repeating the question, or stating criteria so generic they cannot distinguish good from bad answers.

The conclusion: **model-generated rubrics must be grounded in external evidence, or at least sampled and checked by humans**.

## Training a deep research agent

The lecture uses Alibaba's Tongyi DeepResearch as an example. It has three stages, though not every system uses all of them.

### Stage 1: mid-training to expose the base model to agent behavior

Mix a large number of agent trajectories into continual pretraining, then run the usual downstream SFT. The intuition: familiarize the base model with the "think — call — read result" format so SFT has more to build on.

The experiment compares a standard Qwen base with a mid-trained checkpoint, using identical SFT data. On the harder BrowseComp, the mid-trained starting point is clearly better.

### Stage 2: SFT to imitate a teacher

The key question is where the data comes from.

**Question construction** uses a knowledge graph such as Wikidata. Entities are nodes, relations are directed edges; a random walk from a target entity gathers a set of connected facts, which are combined into a multi-hop question, with the starting entity as the gold answer.

This is almost exactly how BrowseComp is built — **the training data reverse-engineers the benchmark**. Whether it transfers to other benchmarks is still open, but it is a scalable way to produce hard questions.

**Trajectory generation**: a stronger teacher model produces multiple trajectories per question; filter by answer match or format reward and keep the successful ones for SFT.

The cost: SFT is bounded by the teacher, and teacher trajectories may carry a style the student cannot imitate.

### Stage 3: reinforcement learning

For short, verifiable answers, RLVR works directly: the policy samples several trajectories, an exact match or a model judge scores them, and GRPO updates the policy.

Search-R1 was an early representative of this route. The essential difference from SFT is that **training data comes from the policy's own attempts**, so the model experiences failure and learns to recover.

The lecture stresses two stabilizers used in practice: clipping to limit the size of each update, and a KL penalty keeping the model close to the initial policy. Both matter at long horizons and large scale.

### Engineering to make training feasible

- Run rollouts asynchronously: while one trajectory waits on a search API, others keep generating.
- Cache search results.
- Wrap APIs robustly.
- Use a local index to simulate external search and reduce dependence on live APIs.

## Open-ended tasks: evolving rubrics

Exact match works for short answers, not for long reports. The speaker's group turns rubric evaluation into a training reward and lets the rubrics **evolve with the policy**:

1. Start with rubrics grounded in external retrieval.
2. For each question, sample several trajectories from the policy (eight in the final training).
3. Use a language model to contrast the trajectories and generate new positive rubrics (reward desirable behavior) and negative rubrics (penalize specific errors).
4. Maintain a rubric buffer, score responses with it, and update the policy.

The core idea: **feedback is not fixed at the start of training; it develops alongside the model**. As the policy learns new distinctions, the rubrics can capture them.

### What the ablations show

- **SFT is needed to start.** RL from the base model reaches only about 40% at 600 steps; using just 5% of the SFT data adds about ten points.
- **Random rewards do nothing.** Online RL with random reward shows no improvement.
- **Grounded rubrics matter.** Initial rubrics supported by search evidence beat purely model-generated ones, which can even hurt.
- **Better rubric generators help.** GPT-4.1 rubrics outperform Qwen rubrics by about ten points at that time. Open rubric models are emerging, but they are mostly evaluated on short-answer reward benchmarks; replacing a strong generator remains open.
- **Evolving rubrics pay off over longer training.** The longer the run, the larger the gain from updating rubrics.

The resulting models approach or exceed proprietary deep research systems at a small fraction of the inference cost — hundreds to a thousand times less in the reported comparison.

## Retrieval is not background plumbing

If retrieval cannot find the right documents, no agent can compensate.

### Local corpora versus external APIs

- When the target corpus is known (Wikipedia, say), build a local index with BM25 or neural embeddings; Search-R1 used the 2018 Wikipedia dump.
- Open-ended questions need web search APIs, browsing APIs, or paper search (Semantic Scholar, Google Scholar).
- Domain tasks such as finance should build a domain corpus or use domain-specific APIs.

### Embedding basics

Offline, a document encoder turns the corpus into a vector database. At inference, encode the query and run nearest-neighbor search.

Training typically uses contrastive learning: each query has a positive document and a set of negatives, and the objective raises the positive's score relative to the negatives. Negatives can come from other questions' positives in the same batch (in-batch negatives), or from harder candidates mined with BM25.

### Retrieval for agents: the last query is not enough

Standard embedding models are optimized for a human typing one query, but an agent has a rich history: the original task, earlier queries, what it read, and its current reasoning.

The speaker's **AgentIO** passes **the current reasoning text together with the query** into the retrieval model and trains briefly on that format. Results:

- Adding reasoning to the query alone helps.
- Training a reasoning-aware embedding model helps more.
- A 4B model beats an 8B baseline while issuing fewer searches.
- Passing the entire trajectory hurts, because the context becomes too long; the single reasoning step immediately before the query works best.

## Open problems

- **Evaluation is the current bottleneck.** Knowing how to evaluate is what enables data construction, rejection sampling, and reward design.
- **Rubric bias.** Rubric judges may favor longer answers, and rubrics themselves may drift from real user needs.
- **Question realism.** BrowseComp-style items are built backward from clues and may not represent real information needs.
- **External validity.** Benchmarks score the final answer, not whether the research helps someone make a better decision or fix a bug.
- **Contamination.** Models may memorize training answers; evaluation must also block retrieval of the original dataset.
- **Small-model limits.** On benchmarks requiring many search calls and long context management, small models still trail frontier models; the gap is smaller on open-ended synthesis.

## Takeaways

- Deep research addresses information needs with no single source, through repeated planning, retrieval, reflection, and synthesis.
- Evaluation splits into verifiable short answers, expert domains, open-ended long-form (rubrics), and citation quality.
- Training has three stages — mid-training, SFT, RL — and the SFT cold start is essential for RL to take off.
- Open-ended training uses evolving rubrics as rewards, and rubrics must be grounded in external evidence.
- Retrieval must be adapted for agents: reasoning context helps, but only in the right amount.

## Check your understanding

**1. Why does BrowseComp construct questions backward from answers, and what transfer risk does that create for training data?**

Reference answer: The construction starts from a known answer (a person, event or work), collects several clues, and combines them into a complex question. That buys three things: the answer is definite and unique, so exact-match scoring is automatic; the question requires retrieval across multiple sources, which matches deep research; and a validation step — the base model or five Google searches cannot answer it — filters out questions solvable from memory or a single lookup. The transfer risks are twofold. First, question realism: such items are assembled from clues and need not reflect real user information needs. Second, training data built the same way from a knowledge graph (random walks over entities and relations producing multi-hop questions) is effectively reverse-engineering the benchmark; whether it transfers to other benchmarks is open, and data contamination remains a risk.

**2. Why do reference-based similarity metrics fail on open-ended long-form answers?**

Reference answer: Three reasons from the lecture. First, there are infinitely many valid phrasings, so reference answers cannot be enumerated. Second, surface overlap does not imply correctness — text heavily overlapping a reference can still reverse its core claim. Third, empirically BLEU, ROUGE and BERTScore agree with expert preference only 57–62%, barely above chance. Open-ended long-form answers therefore need rubrics that judge each criterion, not similarity.

**3. Where is the main cost of scaling rubric evaluation, and what kinds of errors do auto-generated rubrics make?**

Reference answer: The main cost is producing the rubrics themselves: a question may take a PhD-level expert nearly an hour, and only once rubric quality is high enough can models take over scoring — expert–expert agreement is about 80% and model–expert about 79%. ResearchQA generated 21k questions and 120k rubrics automatically from survey papers, but expert auditing found about 15% were wrong: citing papers that do not exist, duplicated questions, or rubrics so vague they cannot separate good from bad answers. The conclusion: model-generated rubrics must be grounded in external evidence, or at least human spot-checked.

**4. Why do evolving rubrics outperform fixed rubrics over long training runs?**

Reference answer: A fixed rubric only encodes the distinctions known at the start; as the policy improves it produces new correct behaviours and new failure modes that the fixed rubric cannot see. Evolving rubrics sample several rollouts per question each round (8 at final training), have a language model compare them, and generate new positive rubrics that reward good behaviour and negative rubrics that punish specific mistakes, storing them in a buffer. The ablation shows gains from rubric updates grow the longer training runs — the feedback develops together with the model rather than being frozen at the start.

**5. Why does feeding the whole trajectory to an embedding model hurt retrieval?**

Reference answer: AgentIO's comparisons show that prepending the current reasoning text to the query helps, training a reasoning-aware embedding model helps more (a 4B model beat an 8B baseline while making fewer search calls), but feeding the entire trajectory makes things worse. The reason is length: the original task, all previous queries and all retrieved results dilute the signal of the current query and exceed what the embedding model handles well. The most effective input is only the reasoning step immediately preceding the current query, encoded together with the query.

## How this connects to the course

The previous lecture gave policy gradients and GRPO; this one applies them to both verifiable and open-ended deep research. The next lecture goes deeper into advanced RL algorithms and stabilization, and retrieval connects back to the memory and skills lecture.
