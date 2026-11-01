---
slug: 08-tail-bounds
title: "Tail bounds, the law of large numbers and the probabilistic method"
summary: "Markov's inequality gives a first bound from non-negativity alone; a squaring trick yields Chebyshev, which proves the weak law of large numbers. We apply these to the error rate of randomized algorithms and to gambler's ruin, then use 'expectation below one implies positive probability of success' to prove a lower bound for van der Waerden numbers."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [probability, tail-bounds, concentration, probabilistic-method]
sources:
  - kind: video
    title: "Lecture 8: Tail Bounds"
    url: https://www.youtube.com/watch?v=HC54KcgvReg
    author: "Ankur Moitra, MIT OpenCourseWare"
    publishedAt: 2025-12-18
---

## What this lecture is for

Expectation tells you what a random variable averages, not how likely it is to drift away from that average. A variable may take a huge value with tiny probability, inflating the expectation while almost always staying near $0$.

A tail bound answers: **how likely is a random variable to be far from its expectation?** The lecture is organised around using more and more information:

| Information used | Tool | Tail decay |
| --- | --- | --- |
| Non-negativity and expectation | Markov | $1/C$ |
| Expectation and variance | Chebyshev | $1/C^2$ |
| Independent, identically distributed | Weak law | probability $\to0$ |
| Mutual independence, all moments | Chernoff (next lecture) | exponential |

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Probability recap; why tail bounds |
| 2:55 | Markov's inequality and proof |
| 7:45 | Where non-negativity is used; a counterexample |
| 8:51 | The corollary form of Markov |
| 10:36 | The height example |
| 15:40 | Chebyshev's inequality and proof |
| 22:41 | A second height example |
| 24:47 | Statement of the weak law |
| 30:29 | Proof via expectation, variance and Chebyshev |
| 36:41 | Gambling and ruin |
| 42:24 | Repeating randomized algorithms |
| 50:42 | Pairwise independence suffices |
| 51:55 | Chernoff preview |
| 56:48 | The probabilistic method and Ramsey theory |
| 1:08:20 | van der Waerden's theorem and a lower bound |

## Markov's inequality

**Theorem.** If $X\ge0$, then for every $C>0$,

$$
\mathbb P(X\ge C)\le\frac{\mathbb E[X]}{C}.
$$

**Proof.** Split the expectation by the law of total expectation:

$$
\mathbb E[X]
=\mathbb E\big[X\mid X\ge C\big]\mathbb P(X\ge C)
+\mathbb E\big[X\mid X<C\big]\mathbb P(X<C).
$$

Given $X\ge C$, the conditional expectation is at least $C$; given $X<C$, non-negativity makes the conditional expectation at least $0$. Hence

$$
\mathbb E[X]\ge C\cdot\mathbb P(X\ge C),
$$

and dividing by $C$ completes the proof. $\square$

### Where non-negativity is used

**Only in dropping the second term.** If $X$ can be negative, $\mathbb E[X\mid X<C]$ may be negative, and discarding it is no longer a lower bound.

Counterexample: let $X=1$ and $X=-1$ each with probability $1/2$, so $\mathbb E[X]=0$. With $C=1$,

$$
\mathbb P(X\ge1)=\tfrac12>0=\frac{\mathbb E[X]}{C}.
$$

The bound fails completely. When the expectation is zero the right side constrains nothing.

### Corollary form

Put $C'=C/\mathbb E[X]$, i.e. $C=C'\mathbb E[X]$:

$$
\mathbb P\big(X\ge C'\,\mathbb E[X]\big)\le\frac{1}{C'}.
$$

The most quoted case is $C'=2$: a non-negative variable exceeds twice its expectation with probability at most $1/2$.

### The height example

The average US male height is about $69$ inches. Hence

$$
\mathbb P(X\ge2\times69=138\text{ inches})\le\frac12 .
$$

That is about $11$ feet $6$ inches. The bound is mathematically correct but practically useless — Markov uses only the expectation. The height example runs through the lecture as a yardstick for each new tool.

## Chebyshev's inequality

**Theorem.** For any random variable $X$ (non-negativity **not** required),

$$
\mathbb P\big(|X-\mathbb E[X]|\ge C\big)\le\frac{\operatorname{Var}(X)}{C^2}.
$$

**Proof.** Two tricks.

First, the two events are the same, so their probabilities are equal:

$$
|X-\mathbb E[X]|\ge C
\iff
\big(X-\mathbb E[X]\big)^2\ge C^2 .
$$

Second, manufacture a non-negative variable so Markov applies. Let

$$
Y=\big(X-\mathbb E[X]\big)^2\ge0 .
$$

Apply Markov to $Y$ with threshold $C^2$:

$$
\mathbb P(Y\ge C^2)\le\frac{\mathbb E[Y]}{C^2}
=\frac{\operatorname{Var}(X)}{C^2}.
$$

The left side is the event from step one. $\square$

### Corollary form

Let $\sigma(X)=\sqrt{\operatorname{Var}(X)}$ be the standard deviation. Taking $C=c\sigma(X)$,

$$
\mathbb P\big(|X-\mathbb E[X]|\ge c\sigma(X)\big)\le\frac{1}{c^2}.
$$

For $c=2$: the probability of straying two standard deviations is at most $1/4$.

### The second height example

Male height has standard deviation about $2.7$ inches, so the probability of exceeding $69+2\times2.7=74.4$ inches (about $6$ feet $2.4$ inches), or symmetrically falling below, is at most $1/4$.

Still loose, but no longer absurd — nothing like the $11$-foot-$6$ answer. More information yields tighter bounds, the theme of the lecture.

## The weak law of large numbers

### Statement

Fix $\varepsilon>0$. Let $X_1,\dots,X_n$ be independent copies of a random variable $X$ with $\mathbb E[X]=C$ and finite variance, and let

$$
S_n=\frac{1}{n}\sum_{i=1}^{n}X_i .
$$

Then

$$
\lim_{n\to\infty}\mathbb P\big(|S_n-C|\ge\varepsilon\big)=0 .
$$

**The order of quantifiers matters**: fix the accuracy $\varepsilon$ first (say a polling error of $0.01$), then find a large enough $n$. The claim is not that the probability is small for every $n$, but that a sufficiently large $n$ exists.

### Proof

First, the mean. By linearity,

$$
\mathbb E[S_n]=\frac1n\sum_{i=1}^{n}\mathbb E[X_i]=C .
$$

So $S_n$ is an unbiased estimator of $C$.

Second, the variance — the heart of the proof. Scaling a random variable by a constant scales the variance by its square:

$$
\operatorname{Var}(S_n)=\frac{1}{n^2}\operatorname{Var}\Big(\sum_{i=1}^{n}X_i\Big).
$$

**Independence enters here**: the variance of a sum of independent variables is the sum of the variances. Hence

$$
\operatorname{Var}\Big(\sum_{i=1}^{n}X_i\Big)=\sum_{i=1}^{n}\operatorname{Var}(X_i)=n\,\sigma^2,
$$

$$
\operatorname{Var}(S_n)=\frac{n\sigma^2}{n^2}=\frac{\sigma^2}{n}.
$$

Third, Chebyshev:

$$
\mathbb P\big(|S_n-C|\ge\varepsilon\big)
\le\frac{\operatorname{Var}(S_n)}{\varepsilon^2}
=\frac{\sigma^2}{n\varepsilon^2}\xrightarrow[n\to\infty]{}0 .
$$

### A quantitative version

The proof also yields a concrete sample size: to make the failure probability at most $\delta$, it suffices that

$$
n\ge\frac{\sigma^2}{\delta\,\varepsilon^2}.
$$

Cutting the error by a factor $k$ multiplies the sample size by $k^2$. Going from $0.05$ to $0.01$ (a factor of $5$) needs $25$ times as many samples.

### Gambling and ruin

In craps, the closest bet to even money has a house edge of about $0.0141$. Let each round win $\$1$ with probability $p$ and lose $\$1$ otherwise. Then

$$
(1-p)-p=0.0141
\Longrightarrow
p=0.4929 .
$$

The expected gain per round is

$$
1\cdot p+(-1)\cdot(1-p)=2p-1=-0.0142<0 .
$$

By the weak law, for large $n$ the average gain per round approaches $-0.0142$ with probability $1$, so cumulative winnings fall roughly linearly at $-0.0142n$.

**Gambler's ruin**, informally: a game with negative expectation eventually bankrupts you. One might hope for a lucky streak, but the law of large numbers says the probability of sustaining one vanishes.

## Failure probability of randomized algorithms

Suppose a randomized algorithm $\mathcal A$ returns the correct answer with probability $2/3$ and an incorrect one with probability $1/3$. How many repetitions are needed to make the error rate acceptable?

Let $X_i\in\{0,1\}$ indicate a correct run, so $\mathbb E[X_i]=2/3$. Take a majority vote, i.e. check whether the average $S_n$ falls below $1/2$. Failure implies

$$
\Big|S_n-\tfrac23\Big|\ge\tfrac16 .
$$

Choose $\varepsilon=1/9<\tfrac16$; then the failure event is contained in $\{|S_n-\tfrac23|\ge\varepsilon\}$, so a bound on the larger event bounds the failure probability. Since

$$
\operatorname{Var}(X_i)=\tfrac23\cdot\tfrac13=\tfrac29 ,
$$

Chebyshev gives

$$
\mathbb P(\text{failure})\le\frac{2/9}{n\cdot(1/9)^2}=\frac{2/9}{n/81}=\frac{18}{n}.
$$

To push the failure probability below $10^{-10}$ requires $n\approx1.8\times10^{11}$ repetitions — impractical. This bottleneck motivates the Chernoff bound of the next lecture, which achieves the same target with $n=O(\log(1/\delta))$.

### A concrete setting: primality testing

Cryptography needs to decide whether a large integer $q$ is prime. The best algorithms are randomized and answer correctly with probability $2/3$. Mistaking a composite for a prime can break the scheme and leak sensitive data, so failure probabilities of $10^{-10}$ or even $10^{-30}$ are wanted.

Chebyshev demands $10^{10}$ to $10^{30}$ repetitions, which is hopeless; Chernoff reduces the count to a logarithmic factor, making randomized primality testing practical.

## Pairwise independence suffices

Look back at the proof of the weak law. Independence is used only to add variances:

$$
\operatorname{Var}\Big(\sum_i X_i\Big)=\sum_i\operatorname{Var}(X_i)+2\sum_{i<j}\operatorname{Cov}(X_i,X_j).
$$

If every pair is independent, all covariances vanish and the variances still add. **Pairwise independence is enough**; no triple or quadruple independence is needed.

That is both good news (a weaker hypothesis) and bad news (Chebyshev uses only second-order information, so the bound is loose). The Chernoff bound will use full mutual independence and buy exponential decay.

## Chernoff preview

Let $X_1,\dots,X_n$ be mutually independent with $X_i\in\{0,1\}$ and $\mathbb P(X_i=1)=p_i$, and let

$$
X=\sum_{i=1}^{n}X_i,\qquad \mu=\mathbb E[X]=\sum_{i=1}^{n}p_i .
$$

Then for $0<\delta<1$,

$$
\mathbb P\big(|X-\mu|\ge\delta\mu\big)\le2e^{-\mu\delta^2/3}.
$$

The right side decays exponentially in $\mu$ (hence in $n$), not polynomially like $1/n$. The proof is the subject of the next lecture.

## The probabilistic method

### The core idea

To prove that an object of a certain kind exists, **do not construct it**; prove that a random object satisfies the requirement with positive probability.

**Lemma.** Let $X$ be a non-negative integer-valued random variable with $\mathbb E[X]<1$. Then $\mathbb P(X=0)>0$.

**Proof.** By definition, grouping by the value of $X$:

$$
\mathbb E[X]=\sum_{i\ge0}i\,\mathbb P(X=i)
\ge\sum_{i\ge1}i\,\mathbb P(X=i)
\ge\sum_{i\ge1}\mathbb P(X=i)
=1-\mathbb P(X=0).
$$

So $\mathbb P(X=0)\ge1-\mathbb E[X]>0$. $\square$

Usage: let $X$ count bad events. If the expected number of bad events is below $1$, some object has none.

### Ramsey: six people at a party

Among any six people, either three are pairwise acquainted or three are pairwise strangers. In graph language: in any two-colouring of the edges of $K_6$ there is a monochromatic triangle. This is the Ramsey number $R(3,3)=6$.

Ramsey theory in general: **in a large enough object, certain ordered substructures cannot be avoided**. The lecture also mentions the "Bible codes" — equally spaced letters in the Torah supposedly revealing names and dates. That is Ramsey theory in disguise: the same "discoveries" appear in a Hebrew translation of *War and Peace* and carry no statistical significance.

### van der Waerden's theorem

A $k$-term arithmetic progression is a set of integers

$$
a,\ a+b,\ a+2b,\ \dots,\ a+(k-1)b .
$$

**Theorem (van der Waerden).** For every $k$ there is an $n$ such that every red-blue colouring of $1,2,\dots,n$ contains a **monochromatic** $k$-term arithmetic progression.

Let $W(k)$ be the least such $n$. It is known that $W(3)=9$: $1$ through $8$ can be coloured to avoid three-term progressions, $1$ through $9$ cannot.

The following colouring (R red, B blue) avoids every three-term progression on $1,\dots,8$:

$$
1,2,3,4,5,6,7,8 \;\longmapsto\; R,R,B,B,R,R,B,B .
$$

One checks all progressions with common difference $b=1,2,3$. Proving that $1,\dots,9$ admits no such colouring requires exhaustive search over all colourings.

### A lower bound by random colouring

**Theorem.** For every $k\ge2$,

$$
W(k)\ge\sqrt{k-1}\cdot2^{(k-1)/2}.
$$

**Proof.** Take $n<\sqrt{k-1}\cdot2^{(k-1)/2}$ and colour $[n]$ independently and uniformly red or blue. Let $X$ count monochromatic $k$-term progressions.

For a fixed progression $Q_{a,b}$, let $I_{a,b}$ indicate that it is monochromatic. The first element may have either colour and the other $k-1$ must match it:

$$
\mathbb E[I_{a,b}]=\mathbb P(Q_{a,b}\text{ monochromatic})=\frac{2}{2^k}=\frac{1}{2^{k-1}}.
$$

The number of progressions inside $[n]$: the starting point satisfies $a\le n$, and the common difference satisfies $b\le\dfrac{n}{k-1}$ (otherwise the last term exceeds $n$). So there are at most

$$
n\cdot\frac{n}{k-1}=\frac{n^2}{k-1}.
$$

By linearity of expectation (no independence needed),

$$
\mathbb E[X]\le\frac{n^2}{k-1}\cdot\frac{1}{2^{k-1}}.
$$

For $n<\sqrt{k-1}\cdot2^{(k-1)/2}$,

$$
\mathbb E[X]<\frac{(k-1)2^{k-1}}{k-1}\cdot\frac{1}{2^{k-1}}=1 .
$$

The lemma then gives $\mathbb P(X=0)>0$: some colouring has no monochromatic $k$-term progression. Hence $W(k)>n$, and taking the supremum over admissible $n$ yields the stated bound. $\square$

The remarkable feature: **we never learn what that colouring looks like, only that it must exist**. The probabilistic method turns a construction problem into an expectation computation.

## What this lecture establishes

- Markov: for $X\ge0$, $\mathbb P(X\ge C)\le\mathbb E[X]/C$; non-negativity is used to drop the second term.
- Chebyshev: $\mathbb P(|X-\mathbb E X|\ge C)\le\operatorname{Var}(X)/C^2$; squaring creates a non-negative variable.
- Weak law: with i.i.d. finite-variance variables, the sample mean converges in probability to the expectation; independence is used to add variances.
- Quantitatively $n\ge\sigma^2/(\delta\varepsilon^2)$: a $k$-fold accuracy gain costs $k^2$ times the samples.
- Negative-expectation games ruin the player in the long run.
- Repeating a randomized algorithm $n$ times, Chebyshev gives an $O(1/n)$ failure rate — insufficient in practice.
- Probabilistic method: if $X\ge0$ is integer-valued with $\mathbb E[X]<1$, some outcome has $X=0$.
- van der Waerden: $W(k)\ge\sqrt{k-1}\,2^{(k-1)/2}$, proved by random colouring.

## Comprehension check

**1. Where does the proof of Markov's inequality use non-negativity? Give a counterexample showing the inequality fails without it.**

Reference answer: After the total-expectation split $\mathbb E[X]=\mathbb E[X\mid X\ge C]\mathbb P(X\ge C)+\mathbb E[X\mid X<C]\mathbb P(X<C)$, the first term is at least $C\mathbb P(X\ge C)$ and the second is discarded — discarding is only a lowering step when the second term is non-negative, which requires $X\ge0$. Without non-negativity the inequality $\mathbb E[X]\ge C\mathbb P(X\ge C)$ can fail. Counterexample: $\mathbb P(X=1)=\mathbb P(X=-1)=1/2$, so $\mathbb E[X]=0$; with $C=1$, $\mathbb P(X\ge1)=1/2$ while $\mathbb E[X]/C=0$.

**2. Write out the proof of Chebyshev: what is the event equivalence, what is the new variable, and why may Markov be applied?**

Reference answer: The events $\{|X-\mathbb E X|\ge C\}$ and $\{(X-\mathbb E X)^2\ge C^2\}$ are identical, hence have equal probability. Set $Y=(X-\mathbb E X)^2$, which is a square and therefore non-negative, so Markov applies. Applying Markov to $Y$ at threshold $C^2$,
$\mathbb P(Y\ge C^2)\le\mathbb E[Y]/C^2=\operatorname{Var}(X)/C^2$.
The left side is the original event, completing the proof.

**3. Where does the proof of the weak law use independence? Why is pairwise independence enough?**

Reference answer: Independence is used only in $\operatorname{Var}(\sum_iX_i)=\sum_i\operatorname{Var}(X_i)$. In general
$\operatorname{Var}(\sum_iX_i)=\sum_i\operatorname{Var}(X_i)+2\sum_{i<j}\operatorname{Cov}(X_i,X_j)$,
and pairwise independence makes every covariance zero, so variances still add. Triple or higher-order independence is never used.

**4. Use Chebyshev to bound the failure probability of majority vote over $n$ runs of a $2/3$-correct algorithm, and compute the $n$ needed for $10^{-10}$.**

Reference answer: Let $X_i$ indicate a correct run, so $\operatorname{Var}(X_i)=\frac23\cdot\frac13=\frac29$. Majority vote fails when $S_n<1/2$, i.e. $|S_n-\frac23|>1/6$. Taking $\varepsilon=\frac19$, the failure event lies inside $\{|S_n-\frac23|\ge\frac19\}$, so Chebyshev gives
$\mathbb P(\text{failure})\le\frac{2/9}{n\cdot(1/81)}=\frac{18}{n}$.
Requiring $18/n\le10^{-10}$ gives $n\ge1.8\times10^{11}$ — impractical.

**5. Prove the probabilistic-method lemma: if $X\ge0$ is integer-valued and $\mathbb E[X]<1$, then $\mathbb P(X=0)>0$.**

Reference answer:
$\mathbb E[X]=\sum_{i\ge0}i\mathbb P(X=i)\ge\sum_{i\ge1}i\mathbb P(X=i)\ge\sum_{i\ge1}\mathbb P(X=i)=1-\mathbb P(X=0)$.
Hence $\mathbb P(X=0)\ge1-\mathbb E[X]>0$. Intuitively, if $X=0$ were almost impossible then $X$ would almost always be at least $1$, and the expectation could not be below $1$.

**6. Prove the van der Waerden lower bound by random colouring, showing each step of the expectation computation.**

Reference answer: Take $n<\sqrt{k-1}\,2^{(k-1)/2}$ and colour each integer independently red or blue with probability $1/2$. Let $X$ count monochromatic $k$-term progressions. For a fixed progression, the first term has $2$ colour choices and the remaining $k-1$ must match, so the monochromatic probability is $2/2^k=2^{-(k-1)}$. The number of progressions inside $[n]$ is at most $n\cdot\frac{n}{k-1}$ (at most $n$ starting points, at most $n/(k-1)$ common differences). Linearity of expectation gives
$\mathbb E[X]\le\frac{n^2}{k-1}2^{-(k-1)}<\frac{(k-1)2^{k-1}}{k-1}2^{-(k-1)}=1$.
The lemma then guarantees a colouring with $X=0$, i.e. no monochromatic $k$-term progression, so $W(k)>n$.

**7. Why does the colouring $RRBBRRBB$ on $1$–$8$ prove only $W(3)\ge9$, not $W(3)=9$?**

Reference answer: Exhibiting one colouring without a three-term progression only shows that $n=8$ is not enough, i.e. $W(3)>8$, hence $W(3)\ge9$. To prove $W(3)\le9$ one must show that **every** red-blue colouring of $1,\dots,9$ contains a monochromatic three-term progression — a check over all $2^9=512$ colourings, which a single example cannot replace.

## Relation to neighbouring lectures

The previous lecture concerned generating functions; this one returns to probability and builds the tail-bound toolkit. The next lecture proves the Chernoff bound, lifting tail decay from polynomial to exponential, and explains why the stronger hypothesis of mutual independence buys so much.

The course then moves to modular arithmetic, group theory and coding theory. The probabilistic method itself recurs throughout the remaining units — it is the standard tool for proving existence in discrete mathematics.
