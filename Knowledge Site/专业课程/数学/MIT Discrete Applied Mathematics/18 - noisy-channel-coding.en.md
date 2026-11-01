---
slug: 18-noisy-channel-coding
title: "Transmitting Reliably over a Noisy Channel: Shannon’s Coding Theorem"
summary: "A binary symmetric channel flips each bit with probability p. Repetition codes drive the error to zero and the rate to zero with it. Shannon's theorem shows a constant positive rate 1−H(p) is achievable: random codebooks and ring decoding prove achievability, while counting and a union bound prove the converse."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [information-theory, channel-coding, shannon-theorem, probabilistic-method]
sources:
  - kind: video
    title: "Lecture 18: Transmitting Information Reliably over a Noisy Channel & Shannon’s Noisy Coding Theorem"
    url: https://www.youtube.com/watch?v=kWs_J_JDuFaI
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## The problem: bits get flipped

Earlier lectures compressed: how to send the same information in fewer bits. This one goes the other way — the channel itself makes mistakes.

The **binary symmetric channel** (BSC) has a parameter $p$: each input bit is flipped with probability $p$ and passed through with probability $1-p$, independently across positions. The receiver does not know which bits were flipped.

Take $p=1/3$ concretely. After compressing the message to its shortest form, every bit has a one-in-three chance of being wrong. Can the original message still be recovered reliably?

## Repetition codes: correction at a steep price

The straightforward idea is a **repetition code**: send each bit $T$ times and decode each block by majority vote.

Choose $T=100\log_2 k$, where $k$ is the message length. A block of $T$ bits has a binomial number of flips with mean $Tp=T/3$, and majority vote fails only when more than half are flipped. Chernoff's bound makes that probability decay exponentially in $T$; a large enough constant gets it below $1/k^2$ per block. A union bound over the $k$ blocks then gives overall failure probability at most $1/k$.

So the error does go to zero. But look at the rate:

$$
R=\frac{\text{message length}}{\text{transmission length}}=\frac{k}{kT}=\frac1T=\frac{1}{100\log_2 k}\xrightarrow[k\to\infty]{}0 .
$$

To drive the error to zero we spend about $100\log_2 k$ channel bits per information bit, so almost no information gets through. That is not what we want.

**The central question: can the error go to zero while the rate stays bounded away from zero?**

Shannon's answer is yes, and there is a sharp threshold.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Definition of the binary symmetric channel BSC(p) |
| 3:19 | Repetition codes and majority vote; Chernoff controls per-block error |
| 9:29 | Definition of rate $R$; repetition codes have rate tending to 0 |
| 15:31 | Encode/decode functions and the min-max error $\lambda^*(R,n)$ |
| 18:49 | Shannon's theorem: $R>1-H(p)$ fails, $R<1-H(p)$ succeeds |
| 21:39 | Universality of capacity; many channels have no explicit formula |
| 22:36 | Sanity checks for $p=1/2$, $p=2/3$, and the symmetry $p\leftrightarrow1-p$ |
| 26:57 | Proof strategy: random codebooks |
| 29:51 | Rings: Hamming distance near $pn$ |
| 32:53 | Key lemma: the received vector lies in its own ring and no other |
| 36:43 | Stirling: the exponential growth rate of $\binom{n}{pn}$ is $H(p)$ |
| 46:19 | Proof of the key lemma: weak law plus union bound |
| 53:37 | Probabilistic method: from "usually good" to "one fixed good codebook" |
| 59:49 | Markov bound: discard half the codewords and keep the rate |
| 1:03:49 | Sketch of the converse counting argument |

## Rate, encoding, decoding

Write the message as $k=Rn$ bits and transmit $n$ bits. Formally:

- **encoding** $\mathrm{Enc}:\{0,1\}^{Rn}\to\{0,1\}^{n}$;
- **decoding** $\mathrm{Dec}:\{0,1\}^{n}\to\{0,1\}^{Rn}$;
- **rate** $R=k/n\in(0,1)$.

Message $m$ becomes $c=\mathrm{Enc}(m)$, the channel returns $\tilde c$, and the decoder produces $\hat m=\mathrm{Dec}(\tilde c)$. For fixed $R$ and $n$, define the optimal worst-case error

$$
\lambda^*(R,n)=\min_{\mathrm{Enc},\mathrm{Dec}}\ \max_{m\in\{0,1\}^{Rn}}\ \Pr\big[\hat m\ne m\big].
$$

The order of $\min$ and $\max$ matters: one encoder-decoder pair must work for **every** message, not merely on average. Shannon's theorem describes the behaviour of $\lambda^*(R,n)$ as $n\to\infty$.

## Shannon's noisy coding theorem

Let $H(p)=-p\log_2 p-(1-p)\log_2(1-p)$ be the binary entropy and call

$$
C=1-H(p)
$$

the **capacity** of the channel. The theorem has two directions.

**Converse.** If $R>C$, then $\lambda^*(R,n)\to1$.

Above capacity, no encoder-decoder pair can do better than fail: some messages have success probability tending to zero, so the error approaches one.

**Achievability.** If $R<C$, then $\lambda^*(R,n)\to0$.

Below capacity, some pair drives the error of every message to zero while holding the rate constant.

Together: **capacity is the exact rate at which reliable communication is possible**.

### Numbers and intuition

For $p=1/3$,

$$
H\!\left(\tfrac13\right)=-\tfrac13\log_2\tfrac13-\tfrac23\log_2\tfrac23\approx0.918,
\qquad
C\approx0.082 .
$$

Small but strictly positive — repetition codes have rate tending to zero, while the optimum reliably sends about $0.082$ bits per channel use.

Boundary cases:

- $p=0$: no flips, $H(0)=0$, $C=1$; transmit at full rate.
- $p=1$: every bit flips, $H(1)=0$, $C=1$; the receiver complements every bit and recovers everything.
- $p=1/2$: $H(1/2)=1$, $C=0$. The output is independent of the input, so no information can pass.
- $p=2/3$: $H(2/3)=H(1/3)<1$, so $C\approx0.082>0$. Majority vote fails, but **minority vote** works: because more than half the bits flip, take the opposite of the majority.

Note $H(p)=H(1-p)$, so capacity is symmetric about $p=1/2$.

## Proof strategy: random codebooks

Repetition fails because the codebook is small and rigid. Shannon's proof does the opposite: **choose the codebook at random**.

Let

$$
M=2\cdot 2^{Rn}
$$

and draw $M$ vectors $c_1,\dots,c_M$ independently and uniformly from $\{0,1\}^n$ as codewords for $M$ messages. The extra factor of 2 is slack for a pruning step later.

The virtue of randomness is that questions about "does another codeword fall in this region" become pure counting: no structure to analyse.

### Rings

For $c\in\{0,1\}^n$ and a width $\gamma>0$, the **ring**

$$
\mathrm{Ring}_\gamma(c)=\Big\{\tilde c\in\{0,1\}^n:\ \big|d_H(c,\tilde c)-pn\big|\le\gamma n\Big\},
$$

where $d_H$ is the **Hamming distance**, the number of coordinates on which the two strings differ.

Why radius $pn$? After sending $c$, each bit flips independently with probability $p$, so $d_H(c,\tilde c)$ has mean exactly $pn$. The weak law puts the actual distance near the mean with overwhelming probability. The parameter $\gamma$ is a tolerance that tends to zero as $n\to\infty$.

### The key lemma

**Lemma.** With a random codebook, if $c_i$ is a codeword and $\tilde c$ is its output through the BSC, then for a suitable $\gamma$ and large $n$,

$$
\Pr\Big[\tilde c\in\mathrm{Ring}_\gamma(c_i)\ \text{and}\ \tilde c\notin\bigcup_{j\ne i}\mathrm{Ring}_\gamma(c_j)\Big]\ \ge\ 1-\varepsilon,
$$

where $\varepsilon\to0$.

**Why this suffices.** If the event holds, decoding has a simple rule: on receiving $\tilde c$, check which codeword's ring contains it. The lemma guarantees exactly one such codeword, namely $c_i$, so the message is recovered. The decoder only walks the codebook computing Hamming distances.

## Three tools for the lemma

### Tool 1: Stirling gives the ring size

Start from $\binom{n}{pn}$ and use $n!\approx(n/e)^n\sqrt{2\pi n}$:

$$
\binom{n}{pn}
=\frac{n!}{(pn)!\,((1-p)n)!}
\approx
\frac{(n/e)^n}{(pn/e)^{pn}\,((1-p)n/e)^{(1-p)n}}\cdot\frac{\sqrt{2\pi n}}{\sqrt{2\pi pn}\sqrt{2\pi(1-p)n}} .
$$

The first factor simplifies to

$$
\frac{1}{p^{pn}(1-p)^{(1-p)n}}=2^{-n\big(p\log_2 p+(1-p)\log_2(1-p)\big)}=2^{nH(p)} .
$$

The second is $\Theta(1/\sqrt n)$, contributing only $O(\log n)$ after taking logs. Hence

$$
\frac1n\log_2\binom{n}{pn}\xrightarrow[n\to\infty]{}H(p).
$$

Summing over the distances with $|d-pn|\le\gamma n$ adds at most $2\gamma n+1$ layers, so

$$
\big|\mathrm{Ring}_\gamma(c)\big|\ \le\ 2^{(H(p)+\gamma)n}.
$$

This is where entropy enters channel coding: **the volume of a ring is governed by entropy**.

### Tool 2: the weak law keeps us in our own ring

$d_H(c_i,\tilde c)$ is a sum of $n$ independent indicators, each 1 with probability $p$. Chebyshev gives

$$
\Pr\Big[\big|d_H(c_i,\tilde c)-pn\big|>\gamma n\Big]\ \le\ \frac{p(1-p)}{\gamma^2 n}\ \xrightarrow[n\to\infty]{}\ 0 .
$$

With a suitable $\gamma$ (for instance $\gamma\to0$ but $\gamma^2n\to\infty$), this failure probability drops below $\varepsilon/2$.

### Tool 3: a union bound keeps us out of other rings

Fix $j\ne i$. The key step is to rewrite the event:

$$
\tilde c\in\mathrm{Ring}_\gamma(c_j)
\iff
c_j\in\mathrm{Ring}_\gamma(\tilde c),
$$

because the ring condition only involves Hamming distance, which is symmetric. After the rewrite, $\tilde c$ is fixed and $c_j$ is an **independent uniform** vector, so

$$
\Pr\big[\tilde c\in\mathrm{Ring}_\gamma(c_j)\big]
=\frac{\big|\mathrm{Ring}_\gamma(\tilde c)\big|}{2^n}
\le\frac{2^{(H(p)+\gamma)n}}{2^n}.
$$

This is the technical heart of the proof. Without the rewrite we would need the distribution of the received vector; with it, the probability is a simple volume ratio.

A union bound over all $j\ne i$ gives

$$
\Pr\Big[\tilde c\in\bigcup_{j\ne i}\mathrm{Ring}_\gamma(c_j)\Big]
\le M\cdot\frac{2^{(H(p)+\gamma)n}}{2^n}
=2^{1+Rn}\cdot 2^{(H(p)+\gamma)n-n}.
$$

The exponent is

$$
1+n\big(R+H(p)+\gamma-1\big)=1+n\big(R-(1-H(p))+\gamma\big).
$$

If $R<1-H(p)$, choose $\gamma<\tfrac12\big(1-H(p)-R\big)$ and the exponent goes to $-\infty$ linearly. The probability vanishes.

Tools 2 and 3 together prove the key lemma.

## From "usually good" to "one good codebook"

The lemma says: averaging over random codebooks and random messages, the failure probability is at most $\varepsilon$. What we need is a **single fixed codebook that is good for every message**. Two steps close the gap.

### Step 1: the probabilistic method

For a codebook $\mathcal C$ and message $i$, let $E_i(\mathcal C)$ be the event that message $i$ decodes correctly and $\lambda_i(\mathcal C)=1-\Pr[E_i(\mathcal C)]$ its failure probability. The lemma gives

$$
\mathbb E_{\mathcal C}\left[\frac1M\sum_{i=1}^{M}\lambda_i(\mathcal C)\right]\le\varepsilon .
$$

A nonnegative random variable with mean at most $\varepsilon$ must take some value at most $\varepsilon$. Hence **some codebook $\mathcal C$** has average failure probability at most $\varepsilon$.

### Step 2: Markov's bound prunes bad codewords

Now the average is good, but individual codewords may be bad. By Markov's bound, if the average is at most $\varepsilon$, then the indices with $\lambda_i>2\varepsilon$ form at most half of all indices; otherwise the average would exceed $\varepsilon$.

Delete the bad codewords. At least $M/2=2^{Rn}$ remain, which is exactly an $(Rn,n)$ code: the message count is $2^{Rn}$. For every surviving codeword the failure probability is at most $2\varepsilon$. Relabel the messages and we have a code correct for all messages with error at most $2\varepsilon$.

Letting $n\to\infty$ so that $\varepsilon\to0$ gives $\lambda^*(R,n)\to0$. Achievability is proved.

## Converse: why exceeding capacity must fail

The lecture sketches the converse; a full proof needs additional technical lemmas. Suppose a scheme with rate $R$ succeeds with probability at least $\varepsilon$.

Send $c_i$. The received vector lies in $\mathrm{Ring}_\gamma(c_i)$ with probability close to 1 (Tool 2). Since the overall success probability is at least $\varepsilon$, at least an $\varepsilon/2$ fraction of the ring must decode correctly to $i$ (discarding the part outside the ring changes the fraction only slightly).

Now consider the sets "ring vectors that decode to $i$" for different $i$. They must be **pairwise disjoint**: the decoder maps each received vector to a single message, so one vector cannot belong to two messages' decoding sets.

Therefore the total volume is at most the whole space:

$$
M\cdot\frac{\varepsilon}{2}\cdot\big|\mathrm{Ring}_\gamma(c)\big|\ \le\ 2^n .
$$

Substituting $|\mathrm{Ring}_\gamma(c)|\approx2^{H(p)n}$,

$$
M\ \le\ \frac{2^{n(1-H(p))}}{\varepsilon/2},
\qquad\text{so}\qquad
R=\frac{\log_2 M}{n}\ \le\ 1-H(p)+o(1).
$$

If $R>1-H(p)$, the assumed success probability $\varepsilon$ cannot be maintained — a contradiction.

## Limits of this proof

The random codebook makes the proof clean but is just as impractical as Shannon's compression scheme: $2^{Rn}$ codewords of length $n$ require exponential storage, and decoding scans the entire codebook at exponential cost.

The next lecture turns to **linear codes**: instead of listing codewords, describe them with a matrix. Messages are vectors, encoding is a matrix product, and the codebook is given implicitly, in $O(n^2)$ space, with linear-algebraic decoding.

A second hidden assumption is that the channel flips bits **randomly**. Under an adversary with a budget of $pn$ corruptions, the same theorem does not hold and needs separate analysis.

## What this lecture establishes

- BSC(p) flips each bit independently with probability $p$; repetition codes drive the error to zero but the rate to zero.
- Rate $R=k/n$; $\lambda^*(R,n)$ is the worst-case-over-messages, best-over-codes failure probability.
- Capacity $C=1-H(p)$: above it the error tends to 1, below it the error tends to 0.
- At $p=1/2$, $C=0$ (the channel ignores its input); at $p=2/3$ communication is still possible via minority vote.
- Achievability uses a random codebook with ring decoding.
- A ring has volume $2^{H(p)n}$; this is where entropy enters channel coding.
- The key trick rewrites $\Pr[\tilde c\in\mathrm{Ring}(c_j)]$ as $\Pr[c_j\in\mathrm{Ring}(\tilde c)]$ to exploit uniformity.
- The probabilistic method plus Markov's bound converts "good on average" into "a fixed codebook good for all messages".

## Comprehension check

**1. Why are repetition codes unsatisfactory? Give the concrete rate-error tradeoff.**

Reference answer: Repeating each bit $T$ times makes the per-block majority-vote error decay exponentially in $T$ by Chernoff. With $T=100\log_2 k$, the per-block error is below $1/k^2$, and a union bound over $k$ blocks gives overall error at most $1/k$, which does tend to zero.

But the rate is

$$
R=\frac{k}{kT}=\frac1T=\frac{1}{100\log_2 k}\to0 .
$$

Almost all transmitted bits are redundancy: roughly $100\log_2 k$ channel bits per information bit. Reliability and rate cannot both be won this way — exactly the intuition Shannon's theorem overturns.

**2. Why is capacity zero at $p=1/2$? Why can we still communicate at $p=2/3$?**

Reference answer: At $p=1/2$, the received bit is 0 or 1 with equal probability regardless of what was sent. The output distribution is independent of the input, so the receiver learns nothing, and $C=1-H(1/2)=0$.

At $p=2/3$, each bit flips with probability $2/3$ and $H(2/3)=H(1/3)$, so the capacity is $1-H(1/3)\approx0.082>0$. Majority vote fails, but **minority vote** succeeds: take the opposite of the majority. Equivalently, view the channel as one that flips with probability $1/3$ and invert every received bit. Flipping and not flipping are interchangeable roles.

**3. The key lemma rewrites $\Pr[\tilde c\in\mathrm{Ring}(c_j)]$ as $\Pr[c_j\in\mathrm{Ring}(\tilde c)]$. Why?**

Reference answer: Before the rewrite, $\tilde c$ is random (it depends on the channel flips) while $c_j$ is treated as fixed; computing "the random output lands in a fixed codeword's ring" requires the output distribution.

After the rewrite, $\tilde c$ is fixed and $c_j$ is an independent uniform vector. The probability becomes a volume ratio:

$$
\Pr[c_j\in\mathrm{Ring}(\tilde c)]=\frac{|\mathrm{Ring}(\tilde c)|}{2^n},
$$

which Tool 1 can estimate. The rewrite relies on two facts: Hamming distance is symmetric, so membership can be swapped, and the codewords are drawn independently and uniformly, so $c_j$ is independent of $\tilde c$.

**4. Which three tools prove the key lemma, and what does each contribute?**

Reference answer:

1. **Stirling's formula** estimates the binomial coefficient, giving ring volume $\le2^{(H(p)+\gamma)n}$;
2. **the weak law / Chebyshev** shows $d_H(c_i,\tilde c)$, a sum of $n$ independent indicators with mean $pn$, lies in its own ring with probability at least $1-\varepsilon/2$;
3. **a union bound** over the other $M-1$ codewords bounds the probability of landing in any foreign ring by $M\cdot2^{(H(p)+\gamma)n}/2^n$, which vanishes when $R<1-H(p)$.

Together they give probability at least $1-\varepsilon$ of being in one's own ring and in no other.

**5. We already showed "a random codebook is good on average". Why are the probabilistic method and Markov's bound still needed?**

Reference answer: The lemma averages over **random codebooks** and over **random messages**. We need one **fixed codebook** good for **every message**, so both averages must be removed.

The probabilistic method removes the codebook average: a nonnegative random variable with mean at most $\varepsilon$ attains some value at most $\varepsilon$, so some codebook has average failure at most $\varepsilon$.

Markov's bound removes the message average inside that codebook: if more than half the codewords had failure probability above $2\varepsilon$, the average would exceed $\varepsilon$, a contradiction. So at least half satisfy $\lambda_i\le2\varepsilon$. Deleting the rest leaves $2^{Rn}$ codewords — still an $(Rn,n)$ code — with every message's failure probability at most $2\varepsilon$.

**6. Why is the ring radius chosen near $pn$? What role does $\gamma$ play?**

Reference answer: Each bit flips independently with probability $p$, so $d_H(c,\tilde c)$ has mean $pn$. The weak law puts the received vector near that mean with overwhelming probability, so a shell at radius $pn$ captures almost all the probability mass.

$\gamma$ is the half-width of the shell. It tends to zero as $n\to\infty$ but must be large enough for Chebyshev to apply (typically $\gamma^2n\to\infty$). It contributes only a factor $2^{\gamma n}$ to the volume estimate; as long as $\gamma$ is below half of $1-H(p)-R$, the union bound still vanishes.

**7. Use a counting argument to show that rates above $1-H(p)$ cannot be reliable.**

Reference answer: Suppose a scheme succeeds with probability at least $\varepsilon$. On sending $c_i$, the output lands in $\mathrm{Ring}(c_i)$ with probability close to 1, so at least an $\varepsilon/2$ fraction of that ring must decode correctly to $i$.

For different $i$, the sets of vectors decoding to $i$ must be pairwise disjoint — otherwise one received vector would map to two messages, contradicting that decoding is a function.

Hence the total volume is bounded by the whole space:

$$
M\cdot\frac{\varepsilon}{2}\cdot|\mathrm{Ring}|\ \le\ 2^n .
$$

With $|\mathrm{Ring}|\approx2^{H(p)n}$ this gives $M\le2^{(1-H(p))n}/\varepsilon$, i.e. $R\le1-H(p)+o(1)$. So $R>1-H(p)$ forces $\varepsilon\to0$, and success disappears.

**8. The random codebook is theoretically optimal but impractical. How does the next lecture fix this?**

Reference answer: The codebook holds $2^{Rn}$ codewords of length $n$ — exponential storage — and decoding scans all of them at exponential cost. This mirrors the earlier compression story, where the existence proof did not yield an efficient scheme.

The next lecture introduces **linear codes**: the codebook is described by a matrix $G$ and encoding is $m\mapsto mG$. Storage drops to $O(n^2)$, structure comes from linear algebra, and decoding uses a parity-check matrix and its syndrome in polynomial time. The price is that one must design good linear codes (Hamming, Reed–Solomon) rather than rely on a random draw.

## Relation to neighbouring lectures

The previous lecture solved noiseless compression with $H\le L\le H+1$; this one switches to noisy transmission and obtains the capacity $C=1-H(p)$ together with the threshold theorem. Both proofs share the same machinery: Stirling turns combinatorial counts into entropy, and tail bounds characterise typicality.

The next lecture, by Peter Shor, covers linear codes: a matrix describes the codebook implicitly, minimum distance measures correction capability, and Hamming codes give a concrete construction. After that, Reed–Solomon codes reach larger minimum distance using polynomials over finite fields. The course then moves on to cryptography and secret sharing.
