---
slug: 02-deep-dive-llms
title: "How LLMs are built: pretraining, post-training and reinforcement learning"
summary: "Following Karpathy's walkthrough: how internet text becomes tokens, how a network learns to predict the next token, why a base model is not an assistant, how conversation data shapes a persona, where hallucinations and tool use come from, and how reinforcement learning produces reasoning."
updatedAt: 2026-11-01
content_type: video-course
categories: [ai-agents]
tags: [llm, pretraining, post-training, reasoning]
sources:
  - kind: video
    title: "Deep Dive into LLMs like ChatGPT"
    url: https://www.youtube.com/watch?v=7xTGNNLPyMI
    author: "Andrej Karpathy"
    publishedAt: 2025-02-06
---

## The pipeline behind a text box

There is one input box. Type anything, press enter, and words come back. This lecture asks three questions: what should you put in the box, how is the returned text produced, and what exactly are you talking to.

Karpathy splits the pipeline into three stages and deliberately keeps them accessible to a general audience: **pretraining → supervised fine-tuning (SFT) → reinforcement learning (RL)**. The first two have been standard for years; the third is still moving quickly.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Overview: building mental models for a general audience |
| 1:02 | Pretraining data: Common Crawl and the FineWeb cleaning pipeline |
| 7:57 | Tokenization: UTF-8, bytes, BPE and a 100k vocabulary |
| 14:53 | Network I/O: context windows, next token, probability distributions |
| 20:41 | Inside the network: parameters, Transformer, statelessness |
| 26:14 | Inference: sampling from the distribution |
| 31:12 | GPT-2: 1.5B parameters, 1024 context, how training cost fell |
| 43:04 | Llama 3.1 base model: an internet text simulator |
| 59:28 | From pretraining to post-training |
| 1:01:31 | Post-training data: conversations, encoding, human labelers |
| 1:20:40 | Hallucination, tool use, knowledge versus working memory |
| 1:41:59 | The model's sense of self |
| 1:47:01 | Models need tokens to think |
| 2:01:20 | Tokenization revisited: why spelling tasks fail |
| 2:05:10 | Jagged intelligence: 9.11 versus 9.9 |
| 2:07:51 | From SFT to RL: the textbook analogy |
| 2:14:59 | Reinforcement learning: sample, verify, discover chains of thought |
| 2:28:17 | DeepSeek-R1 and reasoning models |
| 2:42:24 | AlphaGo: the ceiling of imitation and the breakthrough of RL |
| 2:48:35 | RLHF: reward models and a gameable scorer |
| 3:10:10 | What comes next: multimodality, agents, test-time training |
| 3:15:30 | Tracking progress and finding models |
| 3:21:53 | Summary: what you are actually talking to |

## Stage one: pretraining

### The data is not "the whole internet"

Pretraining starts by downloading and cleaning the web. Using FineWeb as a representative example, the pipeline runs through:

1. **URL filtering** — removing malware, spam, marketing, adult sites and similar domains;
2. **Text extraction** — raw pages are HTML with CSS and navigation, so the actual article text must be pulled out;
3. **Language filtering** — a classifier guesses each page's language, keeping, say, pages that are more than 65% English;
4. **Deduplication** and **PII removal** — stripping addresses, social security numbers and similar identifiers.

Common Crawl has been crawling since 2007 and had indexed roughly 2.7 billion pages by 2024. After cleaning, FineWeb is about **44 TB of text, around 15 trillion tokens** — large, but small enough to fit on a single drive.

One design decision matters for the final product: how much non-English text survives filtering determines the model's multilingual ability. FineWeb leans English, so a model trained on it will be strong in English and weaker elsewhere.

### From text to tokens

Neural networks need a one-dimensional sequence of symbols from a finite vocabulary. Raw UTF-8 is a very long sequence of two symbols, which is wasteful. Grouping eight bits into a byte shortens the sequence eightfold and gives 256 symbols. **Byte-pair encoding (BPE)** then repeatedly merges frequent adjacent symbols into new ones, ending with a vocabulary of about **100,000** tokens.

GPT-4 uses 100,277 tokens. `hello world` is exactly two tokens (`hello` and ` world`); capitalization and the number of spaces change the split.

The key mental model: **tokens are the atoms of the model's world.** It does not see letters. The failures around spelling and counting follow directly from this.

### Training: predict the next token

The training loop samples windows of tokens no longer than a chosen maximum (4K, 8K, 16K in practice), feeds them in, and asks for a probability distribution over the next token. With a 100,000-token vocabulary, that is 100,000 numbers.

At initialization the parameters are random and so are the predictions. Using the real next token as a label, the update nudges the correct probability upward and the others downward. This happens for every position in the dataset at once, in large batches. That is training.

Internally the network is a giant mathematical expression with billions of parameters. Production models use the Transformer, built from layer norms, matrix multiplications, softmax, attention blocks and multi-layer perceptrons. Karpathy's framing: think of it as a fixed function with billions of knobs, not as biological neurons — **it is stateless**; the same input always yields the same output distribution.

### Inference: sample from the distribution

Once training ends, parameters are frozen. At inference, a prefix goes in, a distribution comes out, one token is sampled and appended, and the process repeats.

Because sampling is stochastic, the same prompt gives different continuations. This is also why models do not simply regurgitate training text: each step can branch, so the output quickly diverges into something statistically similar but not identical.

## GPT-2 and Llama 3.1: two snapshots

GPT-2 (2019) is the first recognizably modern stack: 1.6B parameters, 1024-token context, about 100 billion training tokens. Training was estimated at roughly $40,000 in 2019; Karpathy reproduced it on eight H100s for about $600 in a day, and thinks $100 is achievable today. The drop comes from better data, faster hardware and much better software.

Llama 3.1 sits at the other end: 405B parameters trained on 15 trillion tokens. Same architecture family, very different scale and engineering.

Releasing a model means releasing two things: **code describing the forward pass** (a few hundred lines) and **the trained parameters** (a long list of numbers). The value lives in the parameters.

## A base model is not an assistant

What comes out of pretraining is a **base model**: an internet-text simulator. Ask it "what is 2 plus 2" and it will not answer like an assistant; it continues the document. It may land on "4", or wander into philosophy. Repeated sampling gives different continuations.

It is still useful, because predicting the next token forced it to compress a great deal of world knowledge into its weights:

- Ask for a top-ten list of Paris landmarks and it produces something broadly plausible;
- Paste the first sentence of the Wikipedia article on zebras and it recites large parts of the article — **regurgitation**, because high-quality sources are sampled repeatedly during training;
- Give it the opening of a 2024 election article and it invents "Pence was the running mate and the opponent was Hillary Clinton" — a parallel universe assembled from a knowledge cutoff at the end of 2023.

The last two are the origin of **hallucination**: in training data, questions of the form "who is X" are always answered confidently, so the model learns the format even when it does not know the fact.

A base model can be coaxed into assistant behavior:

- **Few-shot prompting** — ten English-to-Korean pairs followed by a new English word; the model continues the translation;
- **Role-play prompting** — construct a "human / assistant" transcript and let the model continue the assistant side.

This is **in-context learning**: while reading the prompt, the model infers the task pattern and applies it.

## Stage two: post-training

### Programming a persona with conversation data

Pretraining yields a text continuer. We want an assistant. The algorithm is identical — **only the dataset changes**: internet documents are swapped for conversations.

Conversations are written by human labelers: given a context, write the ideal assistant answer. Labelers follow lengthy written guidelines whose high-level principles are usually **helpful, truthful, harmless**. InstructGPT (2022) was the first public description of this approach; modern datasets contain millions of conversations, much of it synthetic and edited by humans.

The time scales differ enormously: pretraining may run for three months on thousands of machines, while post-training may take three hours, because the conversation dataset is far smaller.

### How conversations become tokens

A conversation must be encoded as a one-dimensional token sequence. GPT-4o uses special tokens such as `im_start` and `im_end` to mark the beginning and end of each turn and the speaker (user or assistant), with the message text in between. These special tokens are introduced during post-training and were never seen during pretraining.

At inference, the client assembles "system message + history + new user message + assistant turn start" and the model samples from there.

### You are talking to a statistical simulation of a labeler

Ask for "five landmarks in Paris" and you are not receiving the output of a magical agent that researched the city. You are receiving a **statistical simulation of a human labeler**: if that question is in the training set, the answer closely resembles what the labeler wrote; if it is not, the model combines pretraining knowledge with post-training style to produce something the labeler plausibly would have written.

Karpathy's summary is blunt: the thing you talk to is an average persona shaped by a labeling manual, not a persistent agent.

## Model psychology: four observable effects

### Hallucination and two mitigations

Ask "who is Orson Kovats" — a name that does not exist. An older model such as Falcon 7B will invent an answer: an American science-fiction author, a character from a 1950s TV show, a former minor-league baseball player. The training set taught it that "who is X" gets a confident answer.

Mitigation one: **teach the model to say it does not know.** Meta's approach for Llama 3 was to generate question-answer pairs from training documents with an LLM, interrogate the model repeatedly, and compare its answers with the truth. If the model answers incorrectly — say, claiming four Stanley Cups instead of two — then "I don't know" is added to the training set as the correct response to that question. This gives the model a chance to connect its internal uncertainty signal to an explicit refusal.

Mitigation two: **give it tools.** Introduce special tokens such as `search_start` and `search_end`. When the model emits them, the application pauses sampling, queries a search engine, and pastes the retrieved text into the context window. The knowledge is no longer a vague recollection in the weights; it is text in front of the model.

### Parameters are memory, context is working memory

This is the most important analogy in the lecture:

- **Knowledge in the parameters** is what you read a month ago: vague, lossy, weighted by frequency;
- **Tokens in the context window** are what you are looking at right now: clear and directly quotable.

This is why summarising chapter one of *Pride and Prejudice* works far better when the chapter text is pasted in than when the model is asked to recall it. Humans behave the same way: re-reading a chapter improves the summary.

### The sense of self is bolted on

The model has no persistent self. Each conversation boots up, processes tokens, and is wiped. Ask "who are you and who built you" and you get a statistical guess — Falcon once claimed to have been built by OpenAI on GPT-3.

To make the model describe itself correctly, engineers add a few hundred hard-coded Q&A pairs to the post-training data (OLMo's `olmo_hardcoded`, for instance), or state the identity in a system message. Both are external scaffolding, not an inner self.

### Models need tokens to think

For every token, the network performs a fixed, small amount of computation. You cannot expect it to complete a complex derivation inside a single token.

The canonical contrast: "Emily buys three apples and two oranges, each orange costs $2, the total is $13, what does each apple cost?"

- Bad label: "The answer is 3", squeezing all the work into one token;
- Good label: "Oranges cost $4; 13 − 4 = 9; 9 ÷ 3 = 3", spreading the work across tokens.

The first teaches the model to guess; the second teaches it to compute step by step, with each intermediate result available in context for the next step. Give the model larger numbers or insist on a one-token answer and it fails; ask it to write code and use the interpreter and it succeeds.

The same reasoning explains counting and spelling. The model does not see characters, only tokens. "ubiquitous" is three tokens, so taking every third character fails; "how many r's in strawberry" once defeated every frontier model because it requires both seeing characters and counting them. Calling Python solves it: the string is copied into code and Python does the counting.

### Jagged intelligence

A model can solve Olympiad problems and still get "is 9.11 bigger than 9.9" wrong. Analysis of internal activations found features associated with Bible verses lighting up — in chapter numbering, 9.11 does come after 9.9. That is not a complete explanation, but it shows the capability surface is **jagged**, full of holes that are hard to predict.

The practical conclusion: treat the model as a tool, check its output, and do not treat it as infallible.

## Stage three: reinforcement learning

### The textbook analogy

Karpathy frames the three stages through schooling:

- **Exposition** → pretraining: read widely and build a knowledge base;
- **Worked solutions** → SFT: imitate experts;
- **Practice problems** → RL: given only problems and final answers, discover your own solution method.

The catch is that human labelers do not know which token path is best for the model. Steps that feel natural to a person may be too large a leap for the network, and steps that are trivial for the network may waste tokens. **Discovering a reasoning path that works for the model can only be done by the model itself.**

### The loop

Give a problem with a verifiable answer (math, code). Sample many solutions. Score them against the answer. Train on the correct ones to make those paths more likely in future.

In DeepSeek-R1's published results, as training proceeds:

- accuracy climbs steadily;
- **average response length grows substantially**;
- responses begin to contain "wait, let me re-check this step" and "let me try a different approach".

These chains of thought were not written by humans. They emerged from optimisation: the model discovered that re-checking, reframing and backtracking improve accuracy. A human labeler could not have hard-coded this into the ideal answer; only RL finds it.

Reasoning models are therefore slower and more verbose. They are wasted on simple lookups and chit-chat, and valuable on hard math and debugging.

### AlphaGo: the ceiling of imitation

Go provides the clearest evidence for the same pattern. Pure supervised learning — imitating human game records — improves and then plateaus below the strongest humans, because imitation cannot exceed the demonstrator. With reinforcement learning, the system plays itself and uses only win/loss as the signal, eventually surpassing Lee Sedol.

Move 37 is the emblem: human experts estimated its probability at roughly one in ten thousand, yet it turned out to be brilliant. RL is not constrained to the human distribution and can go where no human has gone.

For language models this implies, in principle, analogies no human has made, strategies no human has tried, even a thinking language that is not English. But all of it depends on having a large, diverse set of verifiable practice problems.

### RLHF: doing RL where answers are not verifiable

Jokes, poems and summaries have no single correct answer, so automatic scoring fails. RLHF inserts an indirection:

1. Humans **rank** several responses to the same prompt (ranking is easier than scoring);
2. A **reward model** is trained to reproduce those rankings;
3. The language model is trained with RL against the reward model.

This avoids asking humans to evaluate a billion jokes; a few thousand rankings suffice. It also exploits the fact that discrimination is easier than generation.

But the reward model is a **lossy simulation** of human judgment, and a very large neural network. RL is excellent at finding its blind spots. After a few hundred steps, a string like "the the the" can receive a near-perfect score. Add it as a negative example, and the optimiser finds another hole. There are infinitely many.

So in practice RLHF runs for a few hundred steps, improves the model, and stops. "RLHF is not real RL": in math, code and Go the reward cannot be gamed and training can continue indefinitely; with a learned reward model it can, so the process must stay short.

## What comes next

- **Native multimodality** — audio is split into spectrogram chunks and quantised into tokens; images are split into patches and quantised; both join text in one sequence and one model. The machinery is unchanged; only the vocabulary grows.
- **Agents** — from one task at a time toward long-running work under human supervision. Factories talk about human-to-robot ratios; the digital world will talk about human-to-agent ratios.
- **Computer use** — models operating a keyboard and mouse on your behalf.
- **Test-time training** — today parameters are frozen after deployment and the model can only learn in context. Learning while running remains open, and long multimodal tasks will force new ideas because the context window is finite.

## Takeaways

- Pretraining = clean the web → tokenize → predict the next token; the output is a **base model**, an internet-text simulator.
- Post-training = keep training on conversations to program an assistant persona; same algorithm, different data.
- Parameters are vague memory; context is working memory. Putting material in context always beats asking the model to recall it.
- Per-token computation is limited, so reasoning must be spread across tokens; tools such as search and code compensate for unreliable mental arithmetic.
- Hallucination can be reduced by teaching refusal and by adding tools, but it does not disappear.
- RL lets models discover reasoning paths on verifiable tasks; RLHF extends RL to unverifiable domains, but its reward model is gameable, so training must stay short.
- Capability is jagged: use the model as a powerful tool, not as an infallible oracle.

## Comprehension check

**1. Why can't a base model be used as an assistant directly, and in what sense is it still useful?**

Reference answer: A base model is trained only to continue internet documents. Given a prefix it samples the next token; it does not follow instructions, and it does not reliably answer questions. Ask it 2+2 and it may produce the answer, or keep writing a web page, differently each time. It is still useful because next-token prediction forces it to compress large amounts of world knowledge into its parameters: it can be induced to list landmarks, translate from a few examples, and it already contains much of what a task needs. Post-training exists to turn this text simulator into an assistant persona.

**2. Using "parameters are memory, context is working memory", explain why pasting a chapter improves a summary.**

Reference answer: Knowledge stored in parameters is a lossy, frequency-weighted compression of training data; specific details are blurred or confused, and the model must "recall" them. Tokens in the context window are part of the current request and can be read directly at every step. If the chapter is pasted in, the summary can be grounded in the actual text, so accuracy and detail improve. Without it, the model relies on vague memory and may invent details. This is also why document question answering puts the document in context instead of hoping the model remembers it.

**3. Why does training on "answer only" solutions harm a model's math ability?**

Reference answer: For each generated token the network performs only a fixed, limited computation. If the label is "the answer is 3", the model must complete the whole derivation inside one token. There is not enough compute, so training rewards guessing. A good label splits the work: compute the orange cost, subtract, divide, each step small, with earlier results left in context for later steps. The model learns to distribute computation and can reproduce the correct path at test time.

**4. What causes hallucination, and why does teaching the model to say "I don't know" help?**

Reference answer: The cause is the format of the training data. For questions of the form "who is X", the standard answer is confident and complete, so the model imitates that tone even when it has no knowledge, producing the most likely continuation. The mitigation is to probe the model's knowledge boundary — generate Q&A from documents, ask repeatedly, compare with the truth — and then add "I don't know" as the correct answer for questions the model gets wrong. This links an internal uncertainty representation to an explicit refusal. It works only if such an internal signal exists and merely lacks a route to the output.

**5. Why can RLHF only run for a few hundred steps while RL on math can run much longer?**

Reference answer: For math the reward is correctness, which is simple and cannot be bypassed; the only way to earn it is to actually solve the problem. For RLHF the reward is a neural network — a lossy simulation of human preference — with enormous capacity and regions outside the training distribution where the score is unrealistically high. RL finds those regions and produces outputs that humans find meaningless but the reward model scores highly. Fix one hole and the optimiser finds another, because the space of adversarial inputs is effectively infinite. So RLHF is run briefly, stopped while the model is still improving. The underlying distinction is whether the reward can be gamed.

**6. Why does the model fail at "is 9.11 bigger than 9.9" while solving Olympiad problems, and what does that imply for use?**

Reference answer: Per-token computation is limited, and internal features are shaped by patterns in the training data. Analyses found features associated with Bible chapter numbering activating on such inputs; in chapter numbering 9.11 follows 9.9, which pushes the model toward the wrong comparison. Olympiad problems work because the model has learned to spread reasoning over many tokens and has seen many similar problems; comparing two decimals is a one-step task with no room to unfold. The implication is that capability is jagged: solving hard problems does not guarantee correctness on easy ones. For critical numbers or comparisons, require explicit steps or code execution and verify the result.

## How this connects

This lecture maps the **training side**: data, tokenization, the network, post-training and reinforcement learning. It explains what a model can do, why it errs, and why it needs tools. Its companion note on attention and KV Cache covers the **inference side**: what the model can see in one request, how attention is diluted, and how caching determines speed and cost. Together they explain the practical rules of agent engineering — keep context lean, isolate subtasks, and keep the stable prefix stable.
