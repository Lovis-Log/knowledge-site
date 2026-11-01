---
slug: 16-source-coding-entropy
title: "Data Compression and Shannon’s Noiseless Coding Theorem"
summary: "Compression is defined as a map from messages to binary strings, and entropy measures the limit. We prove the converse (no code beats nH) and then build a typical-set code achieving nH + o(n), so entropy is the best asymptotic per-symbol length for a first-order source."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [information-theory, entropy, source-coding, compression]
sources:
  - kind: video
    title: "Lecture 16: Data Compression and Shannon’s Noiseless Coding Theorem"
    url: https://www.youtube.com/watch?v=4OpiI5NLjIE
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## The question: how short can a message be?

Telegrams used to be billed by the word, about a dollar each. People therefore printed code books that replaced long stock phrases with short tokens: `AZKHE` meant *clean bill of health*, `NBET` meant *captain is insane*. Texting `BRB` today is the same move: **give the frequent thing a short symbol**.

The telegraph era did this by hand, choosing phrases by experience. This lecture asks the mathematical version:

> For a given source, what is the lower limit on the average code length of any compression scheme, and can that limit be attained?

Shannon answered in 1948, in the same building: the limit is **entropy**. The lecture proves both directions in full.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | History: telegram code books, texting abbreviations; information theory born in MIT Building 2 in 1948 |
| 5:19 | Definition of a first-order source: alphabet plus distribution, IID sampling |
| 8:14 | Coding functions and decodability; one-shot block codes and the `END` marker |
| 11:34 | Example: $k=2$, $p=(7/8,1/8)$, $n=2$; naive versus improved code |
| 17:21 | Definition of binary entropy |
| 18:38 | The two directions of Shannon's noiseless coding theorem |
| 22:47 | Intuition: the uniform distribution is hardest to compress |
| 26:41 | Lemma: under a uniform distribution the expected length is at least $\log m-O(1)$ (binary tree argument) |
| 30:33 | Fixing symbol counts; the multinomial count $M$ |
| 37:48 | Stirling's formula turns $\log M$ into $nH+O(\log n)$ |
| 44:11 | $\varepsilon$-typical strings and the Chebyshev bound |
| 47:46 | Assembling the lower bound with the law of total expectation |
| 55:12 | Upper bound: an explicit two-branch code |
| 1:05:51 | Why this construction is impractical; the road to Huffman codes |

## First-order sources

A **first-order source** has two parts:

- an alphabet $A=\{a_1,\dots,a_k\}$ of $k$ symbols;
- a distribution $p=(p_1,\dots,p_k)$ with $p_i\ge0$ and $\sum_i p_i=1$.

The lecture pictures a **biased $k$-sided die**: roll it once to get a symbol, roll $n$ times keeping order, and obtain a message $x_1x_2\cdots x_n$ of length $n$. Draws are independent and identically distributed, so

$$
\Pr(x_1\cdots x_n)=\prod_{j=1}^{n}p_{x_j}.
$$

Symbols may be letters or whole words. The lecture stresses that this is the simplest model; real language needs Markov chains, but the theory carries over.

## Coding functions and decodability

A **coding function** $\varphi:A^n\to\{0,1\}^*$ maps every length-$n$ message to a **variable-length** binary string.

Why variable length? Because frequent messages should get short codewords. In the example below, $a_1a_1$ has probability $49/64$; giving it one bit instead of two immediately lowers the average.

Variable length forces one requirement: the map must be **injective**. Two distinct messages encoded identically cannot be decoded. Prefix-freeness is *not* required here, because this is a one-shot block code: the whole message is sent, then `END`, so the decoder knows where the message stops. Prefix-freeness becomes necessary in the next lecture, where Huffman codes must be decoded symbol by symbol on a stream.

Writing $L(\varphi,x)=|\varphi(x)|$, the **expected length** is

$$
\mathbb E[L]=\sum_{x\in A^n}\Pr(x)\,|\varphi(x)|,
$$

and this is the cost to minimize.

## Example: $k=2$, $p=(7/8,1/8)$, $n=2$

There are four messages of length two:

| Message | Probability | Naive code | Improved code |
| --- | --- | --- | --- |
| $a_1a_1$ | $49/64$ | 00 | 0 |
| $a_1a_2$ | $7/64$ | 01 | 10 |
| $a_2a_1$ | $7/64$ | 10 | 110 |
| $a_2a_2$ | $1/64$ | 11 | 111 |

The naive code replaces each symbol by one bit, so every message costs two bits and the expected length is exactly $2$.

The improved code gives the most likely message one bit, at the price of three bits for the two rarer messages. Its expected length is

$$
\mathbb E[L]=\frac{49}{64}\cdot1+\frac{7}{64}\cdot2+\frac{7}{64}\cdot3+\frac{1}{64}\cdot3
=\frac{49+14+21+3}{64}=\frac{87}{64}\approx1.359 .
$$

This is below $2$. The four codewords are distinct and none is a prefix of another — not an accident, since prefix structure is what makes the construction work in general.

What is the limit? For this source,

$$
H\!\left(\tfrac78,\tfrac18\right)
=-\tfrac78\log_2\tfrac78-\tfrac18\log_2\tfrac18
\approx0.169+0.375=0.544\ \text{bits per symbol}.
$$

That is far below one bit. At $n=2$ the best we do is $1.359/2\approx0.68$; the gap is the $o(n)$ correction, which shrinks as $n$ grows.

## Entropy

For a distribution $p=(p_1,\dots,p_k)$, the **binary entropy** is

$$
H(p)=-\sum_{i=1}^{k}p_i\log_2 p_i .
$$

Since $0<p_i\le1$, each $\log p_i\le0$ and the minus sign makes $H(p)\ge0$. The convention is $0\log 0=0$.

Three facts used later:

- the uniform distribution $p_i=1/k$ maximizes entropy, giving $H=\log_2 k$;
- if some $p_i=1$, then $H=0$ — the source carries no uncertainty;
- $H$ depends only on the probabilities, not on the symbol names.

## Shannon's noiseless coding theorem

Let the source have entropy $H$. The theorem has two directions.

**Converse.** For every decodable coding function $\varphi$,

$$
\mathbb E[L]\ \ge\ Hn-o(n).
$$

**Achievability.** There exists a decodable coding function $\varphi$ with

$$
\mathbb E[L]\ \le\ Hn+o(n).
$$

Here $o(n)$ means a quantity growing strictly slower than $n$, such as $O(\log n)$ or $O(\sqrt n)$. Together: **the asymptotic optimum per symbol is $H$**, with relative error $o(n)/n\to0$.

The statement is asymptotic. For small $n$ the $o(n)$ term may exceed $Hn$ and the theorem says nothing useful; its force is in the limit.

## Intuition: the uniform distribution is hardest

Which distribution is hardest to compress? From entropy, the one maximizing $H$; from intuition, the one with **no frequent symbol to exploit**. Both give the same answer: uniform.

For uniform $p_i=1/k$, $H=\log_2 k$, and the naive code already uses about $\log_2 k$ bits per symbol, so nothing can improve. Conversely, any non-uniformity creates room: a frequent event can be given a short codeword.

## The lower bound

### Step 1: a lemma for uniform distributions

**Lemma.** For $m$ equally likely messages, every injective code has expected length at least $\log_2 m-O(1)$.

**Proof idea.** View codewords as nodes of a binary tree: the root is the empty string, appending 0 or 1 goes left or right. Injectivity means assigning $m$ distinct nodes. To minimize average depth, fill the tree level by level: 1 node at depth 0, 2 at depth 1, 4 at depth 2, and so on. Most of the $m$ messages end up at depth $\lfloor\log_2 m\rfloor$ or $\lceil\log_2 m\rceil$, so the average differs from $\log_2 m$ by a constant.

Equivalently, there are at most $2^d$ nodes at depth $d$; if every codeword had depth below $\log_2 m-c$, the total capacity would be less than $m$, a contradiction.

### Step 2: fix the symbol counts

Let $a_i$ occur $n_i$ times, with $\sum_i n_i=n$. The tuple $(n_1,\dots,n_k)$ is the **signature** of the message.

Given a signature, the number of strings is the multinomial

$$
M=\binom{n}{n_1,\dots,n_k}=\frac{n!}{n_1!\,n_2!\cdots n_k!}.
$$

Every such string has the same probability $p_1^{n_1}\cdots p_k^{n_k}$. So **conditioned on the signature, the message is uniform over $M$ strings**, and the lemma yields

$$
\mathbb E[L\mid \text{signature }(n_1,\dots,n_k)]\ \ge\ \log_2 M-O(1).
$$

### Step 3: Stirling turns $\log M$ into entropy

Expand

$$
\log M=\log n!-\sum_{i=1}^{k}\log n_i! .
$$

Using $\log n!=n\log n-n\log e+O(\log n)$,

$$
\begin{aligned}
\log M
&=\Big(n\log n-n\log e+O(\log n)\Big)
-\sum_{i=1}^{k}\Big(n_i\log n_i-n_i\log e+O(\log n)\Big)\\
&=n\log n-\sum_{i=1}^{k}n_i\log n_i+O(\log n),
\end{aligned}
$$

where the two $n\log e$ terms cancel because $\sum_i n_i=n$. Now split $n=\sum_i n_i$:

$$
\log M=\sum_{i=1}^{k}n_i\log\frac{n}{n_i}+O(\log n)
=n\left(-\sum_{i=1}^{k}\frac{n_i}{n}\log\frac{n_i}{n}\right)+O(\log n).
$$

The bracket is the entropy of the **empirical distribution**:

$$
\log M=n\,H\!\left(\frac{n_1}{n},\dots,\frac{n_k}{n}\right)+O(\log n).
$$

Entropy appears here not as an assumption but as the natural output of Stirling's approximation to a multinomial.

### Step 4: typical strings

Step 3 handles a fixed signature, but some signatures may be so unlikely that the bound is useless. Typicality fixes this. A string is **$\varepsilon$-typical** if for every $i$

$$
\left|\frac{n_i}{n}-p_i\right|\le\varepsilon ,
$$

that is, every empirical frequency lies within $\varepsilon$ of its true probability.

By Chebyshev's inequality applied to each coordinate and a union bound over $k$ coordinates,

$$
\Pr(\text{not typical})\ \le\ \frac{k}{\varepsilon^2 n}.
$$

Both $k$ and $\varepsilon$ are fixed while $n\to\infty$, so this probability tends to zero. This is precisely the tail-bound machinery from earlier lectures: **empirical frequencies converge at rate $1/n$**.

### Step 5: assemble the bound

Split the expectation with the law of total expectation:

$$
\mathbb E[L]
=\Pr(\text{typical})\,\mathbb E[L\mid\text{typical}]
+\Pr(\text{not typical})\,\mathbb E[L\mid\text{not typical}]
\ \ge\ \Pr(\text{typical})\,\mathbb E[L\mid\text{typical}].
$$

On a typical string, each $n_i/n$ is within $\varepsilon$ of $p_i$. Entropy is continuous in the probability vector, so

$$
\log M=nH\!\left(\frac{n_1}{n},\dots,\frac{n_k}{n}\right)+O(\log n)
=nH(p)\pm O(\varepsilon n)+O(\log n).
$$

Therefore

$$
\mathbb E[L]\ \ge\ \left(1-\frac{k}{\varepsilon^2 n}\right)\Big(nH(p)-O(\varepsilon n)-O(\log n)\Big).
$$

Let $n\to\infty$ first (removing $k/(\varepsilon^2n)$), then $\varepsilon\to0$:

$$
\mathbb E[L]\ \ge\ nH(p)-o(n).
$$

The converse is proved.

## The upper bound: an explicit code

The converse says nobody can do better; achievability must exhibit a code that does as well. The construction uses three pieces of information.

**Bit 1**: is the message $\varepsilon$-typical?

**If typical**:
- write the signature $(n_1,\dots,n_k)$ using $k\log_2 n$ bits — each $n_i$ has at most $n$ values, so $\log_2 n$ bits each;
- write the index of the string among those with this signature, using $\log_2 M'$ bits, where $M'$ is the largest multinomial over $\varepsilon$-typical signatures.

**If not typical**: fall back to the naive code at $\log_2 k$ bits per symbol, $n\log_2 k$ bits total.

Computing the expectation branch by branch:

$$
\mathbb E[L]\ \le\ \underbrace{1+k\log_2 n+\log_2 M'}_{\text{typical branch}}
+\underbrace{\frac{k}{\varepsilon^2 n}\cdot n\log_2 k}_{\text{contribution of the other branch}}.
$$

Estimate each term:

- $\log_2 M'=nH(p)+O(\varepsilon n)+O(\log n)$, by Step 3 and continuity of entropy;
- $1+k\log_2 n=o(n)$;
- the atypical term equals $\dfrac{k\log_2 k}{\varepsilon^2}$, a **constant**, hence $o(n)$.

Thus

$$
\mathbb E[L]\ \le\ nH(p)+o(n),
$$

which completes the theorem.

Note what the decoder needs: one bit saying whether the message is typical. If it is, the problem reduces to reporting the index of one of $M'$ equally likely strings, whose optimal cost is $\log_2 M'$ — exactly the uniform-distribution lemma from Step 1.

## Why this code is impractical

The code in the proof is a **lookup table**: every possible message is assigned a binary string in advance. There are $k^n$ messages, exponentially many, so storing the table and searching it are both infeasible.

The next lecture changes the approach. Instead of fixing $n$ and encoding the whole block at once, Huffman codes design a **symbol-by-symbol prefix code** represented by a tree, so encoding and decoding cost depend only on the alphabet size, not on $n$.

## What this lecture establishes

- A first-order source is an alphabet, a distribution, and IID sampling.
- A coding function maps length-$n$ messages to variable-length binary strings and must be injective to be decodable.
- Entropy $H(p)=-\sum_i p_i\log_2 p_i$ is the asymptotic per-symbol lower bound.
- The lower bound uses three tools: the uniform-distribution tree lemma, the multinomial plus Stirling, and Chebyshev typicality.
- The upper bound branches on typicality: $k\log n+\log M'$ when typical, the naive code otherwise, and the latter has probability only $O(k/\varepsilon^2n)$.
- The result is $\mathbb E[L]=nH(p)\pm o(n)$, i.e. $H(p)$ bits per symbol.
- The code is optimal but exponentially large; practical schemes use Huffman-type constructions.

## Comprehension check

**1. This lecture only requires injectivity, not prefix-freeness. Why do Huffman codes require prefix-freeness?**

Reference answer: This lecture studies **one-shot block coding**: $n$ is fixed, the entire length-$n$ message is mapped to one binary string, then `END` is sent, and the decoder looks the whole string up in the codebook. Boundaries come from an external marker, so prefix relations among codewords do not create ambiguity.

Huffman codes handle **streaming, symbol-by-symbol encoding**: the message length is unknown in advance and the receiver must split the bit stream on the fly. If one codeword were a prefix of another, the decoder could not tell where the current codeword ends. Prefix-freeness (equivalently, codewords at leaves of a binary tree) guarantees a unique parsing of every bit stream.

**2. In the example $k=2$, $p=(7/8,1/8)$, $n=2$, verify that the improved code has expected length $87/64$, and explain why large $n$ is still needed to approach entropy.**

Reference answer: The probabilities are $49/64,7/64,7/64,1/64$ with lengths $1,2,3,3$, so

$$
\mathbb E[L]=\frac{49\cdot1+7\cdot2+7\cdot3+1\cdot3}{64}=\frac{87}{64}\approx1.359.
$$

That is about $0.680$ bits per symbol against an entropy of about $0.544$. The gap is the $o(n)$ term: codewords have integer lengths, and for a block as small as $n=2$ the overhead of the signature and boundary information is large relative to the payload. As $n$ grows this overhead is amortized, and the average approaches $H$.

**3. Why is the uniform distribution hardest to compress? Give both the intuitive and the entropy argument.**

Reference answer: Intuitively, compression gains come from giving frequent events short codewords. Under a uniform distribution no symbol is frequent, every symbol is interchangeable, and any shortening forces another codeword to lengthen, so the expected length cannot improve.

Formally, $H(p)=-\sum_i p_i\log p_i$ is maximized on the simplex at $p_i=1/k$, with value $\log_2 k$. Shannon's theorem says the optimal per-symbol length approaches $H$, so maximal entropy means maximal length. The naive code already uses about $\log_2 k$ bits per symbol and therefore attains this bound.

**4. Why must the lower-bound proof first fix the signature $(n_1,\dots,n_k)$? Why not apply the uniform lemma to the whole message space?**

Reference answer: The distribution over messages is **not uniform** — probabilities differ enormously (in the example, $49/64$ versus $1/64$). The uniform lemma does not apply.

Conditioning on a signature makes all strings with that signature equally likely, each with probability $p_1^{n_1}\cdots p_k^{n_k}$, so they become $M$ equiprobable objects and the lemma gives $\log M-O(1)$. What remains is to argue that some signature family occurs with high probability — that is typicality, which guarantees $n_i/n\approx p_i$ and hence $\log M\approx nH(p)$.

**5. Derive $\log M=nH(n_1/n,\dots,n_k/n)+O(\log n)$ with Stirling's formula, and identify where $\sum_i n_i=n$ is used.**

Reference answer:

$$
\log M=\log n!-\sum_i\log n_i!
=n\log n-n\log e-\sum_i\big(n_i\log n_i-n_i\log e\big)+O(\log n).
$$

The exponential terms are $-n\log e$ and $+\big(\sum_i n_i\big)\log e$. **This is the only place where $\sum_i n_i=n$ is used**; they cancel, leaving

$$
\log M=n\log n-\sum_i n_i\log n_i+O(\log n).
$$

Writing $n=\sum_i n_i$,

$$
\log M=\sum_i n_i\log\frac{n}{n_i}+O(\log n)
=n\left(-\sum_i\frac{n_i}{n}\log\frac{n_i}{n}\right)+O(\log n)=nH\!\left(\frac{n_1}{n},\dots,\frac{n_k}{n}\right)+O(\log n).
$$

The $O(\log n)$ comes from the error term in Stirling; the $\sqrt{2\pi n}$ factor contributes only $O(\log n)$ after taking logs, which is absorbed by $o(n)$.

**6. In the upper bound, why can the $k\log_2 n$ bits for the signature be ignored? The atypical branch costs $n\log_2 k$ bits, so why can that be ignored too?**

Reference answer: The first is $o(n)$: $k$ is fixed and $\log_2 n$ grows far slower than $n$, so $k\log_2 n=o(n)$ and it fits inside the $nH\pm o(n)$ slack.

The second looks linear, but it is used only on atypical strings, an event of probability $O(k/(\varepsilon^2n))$ by Chebyshev. Multiplying,

$$
\frac{k}{\varepsilon^2 n}\cdot n\log_2 k=\frac{k\log_2 k}{\varepsilon^2},
$$

which is independent of $n$, hence a constant and also $o(n)$. The key is that **atypicality is rare**: however wasteful the fallback, its contribution to the expectation vanishes.

**7. The theorem says the optimal length is $nH$. Why can this code not be used to compress a file?**

Reference answer: The coding function is a codebook assigning a codeword to every message in $A^n$. There are $k^n$ messages, exponentially many, so storing and searching the table is infeasible, and the sender must know the whole message before encoding.

Practical schemes must be incremental and decodable on the fly. Huffman codes use one tree of size comparable to the alphabet, encoding each symbol independently and decoding by walking the tree, with storage and time depending only on $k$. The price is that Huffman achieves between $H$ and $H+1$ bits per symbol rather than the asymptotic $H+o(1)$ — usually an acceptable trade.

## Relation to neighbouring lectures

This lecture pins the theoretical limit of compression at entropy, but its construction is unimplementable. The next lecture gives Huffman coding, an implementable optimal prefix code: an exchange argument shows the two least likely symbols must be siblings, which yields a recursive merge, and the Kraft inequality links prefix codes to their length profile.

The lecture after that turns to noisy channels, where the question changes from "make it shorter" to "make it survive errors". Shannon's second theorem shows that below channel capacity one can drive the error probability arbitrarily low with long enough codes, again via typicality and random coding.
