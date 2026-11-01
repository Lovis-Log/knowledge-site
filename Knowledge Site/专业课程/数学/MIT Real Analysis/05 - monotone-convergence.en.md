---
slug: "05-monotone-convergence"
title: "The Monotone Convergence Theorem: Bounded Plus Monotone Is Enough"
summary: "After practising limit laws, we prove that a monotone bounded sequence converges, with the supremum as its limit, and show how any bounded sequence yields a pair of monotone sequences. We then rebuild √2 from its decimal truncations and preview Cauchy sequences and the contraction mapping theorem."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [mathematics]
tags: [real-analysis, monotone-convergence, supremum, square-root, cauchy-sequence]
sources:
  - kind: video
    title: "Lecture 5: Monotone Convergence Theorem"
    url: "https://www.youtube.com/watch?v=EjXtpzysDL4"
    author: "Tobias Holck Colding, MIT OpenCourseWare"
    publishedAt: "2025-09-02"
---

## A usable criterion

The previous lecture showed that convergence implies boundedness, but that boundedness alone does not suffice: $(-1)^n$ is bounded and divergent. This lecture supplies a genuine **sufficient condition** — if the sequence is monotone, boundedness is enough.

The result matters because it turns "find the limit" into "check two properties": monotone and bounded. Many sequences have no closed-form limit, yet one can prove that a limit exists.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: sequences, subsequences, convergence, limit laws |
| 7:58 | Example: the limit of $\dfrac{n^2+1}{n^2+n+1}$ via limit laws |
| 14:11 | Monotone increasing and decreasing sequences |
| 18:17 | The monotone convergence theorem, both versions |
| 22:36 | Any bounded sequence yields two monotone sequences $b_n,c_n$ |
| 34:28 | Proof of the monotone convergence theorem |
| 42:47 | Reconstructing $\sqrt2$ from decimal truncations |
| 1:08:49 | Cauchy sequences and the contraction mapping theorem (stated) |

## Computing a limit with the limit laws

Find the limit of

$$
a_n=\frac{n^2+1}{n^2+n+1}.
$$

Divide numerator and denominator by $n^2$:

$$
a_n=\frac{1+\dfrac1{n^2}}{1+\dfrac1n+\dfrac1{n^2}} .
$$

We know $1/n\to0$, $1/n^2\to0$, and the constant sequence $1\to1$. By the sum rule the numerator tends to $1$ and the denominator to $1$. The denominator tends to $1\ne0$ and all its terms are positive, so the reciprocal rule applies; then the product rule gives

$$
a_n\to\frac{1}{1}=1 .
$$

Every step names the rule it uses. This is why the algebra of limits is not decoration: **it decomposes a complicated expression into combinations of known limits**.

## Monotone sequences

**Definition.** A sequence $(a_n)$ is **monotone increasing** if

$$
a_n\le a_{n+1}\quad\text{for all }n .
$$

If the inequality is strict, it is **strictly increasing**. Similarly, **monotone decreasing** means $a_n\ge a_{n+1}$ for all $n$.

Monotonicity alone does not require boundedness. $a_n=n$ is increasing but unbounded, hence divergent; $a_n=-n$ is decreasing and unbounded.

## The monotone convergence theorem

**Theorem.** If $(a_n)$ is monotone increasing and bounded above, then it converges and

$$
\lim_{n\to\infty}a_n=\sup_n a_n .
$$

Symmetrically, a monotone decreasing sequence bounded below converges to $\inf_n a_n$.

An increasing sequence is automatically bounded below by $a_1$, so only the upper bound needs checking; dually for decreasing sequences.

### Proof (increasing case)

Let $a_n$ be increasing and bounded above. By completeness, $a=\sup\{a_n:n\in\mathbb N\}$ exists. We prove $a_n\to a$.

Since $a$ is an upper bound, $a_n\le a$ for all $n$, so

$$
|a_n-a|=a-a_n .
$$

It remains to show: given $\varepsilon>0$, eventually $a-a_n<\varepsilon$.

The key step: **$a-\varepsilon$ is not an upper bound**. If it were, there would be an upper bound smaller than the least one, a contradiction. Hence there is $N$ with

$$
a_N>a-\varepsilon .
$$

(The inequality is strict: if all $a_n\le a-\varepsilon$, then $a-\varepsilon$ would be an upper bound.)

By monotonicity, for $n\ge N$ we have $a_n\ge a_N>a-\varepsilon$. Together with $a_n\le a$,

$$
0\le a-a_n<a-(a-\varepsilon)=\varepsilon \quad (n\ge N).
$$

So $a_n\to a$. $\square$

The heart of the proof is one sentence: **the supremum is exactly the number that just barely dominates the set**, so anything smaller ($a-\varepsilon$) fails to dominate it and must be exceeded by some term. Monotonicity then turns that single crossing into an eventual one.

For the decreasing case apply the result to $-a_n$, which is increasing with supremum $-\inf a_n$.

## Every bounded sequence yields monotone sequences

The theorem seems to apply only to special sequences. But any **bounded** sequence $(a_n)$ produces two monotone ones:

$$
b_n=\sup\{a_k:k\ge n\},
\qquad
c_n=\inf\{a_k:k\ge n\}.
$$

(Boundedness guarantees these suprema and infima exist.)

**$b_n$ decreases.** $b_{n+1}$ is the supremum over the smaller set $\{a_k:k\ge n+1\}$, while $b_n$ ranges over that set plus $a_n$. A larger set has a supremum no smaller:

$$
b_n\ge b_{n+1}.
$$

**$c_n$ increases.** Dually, shrinking the set cannot raise the infimum:

$$
c_n\le c_{n+1}.
$$

**$b_n\ge c_n$.** Both are taken over the same set, and a supremum is at least the infimum.

So $b_n$ decreases and is bounded below by $c_n$, while $c_n$ increases and is bounded above by $b_n$. The monotone convergence theorem gives

$$
b_n\downarrow b,
\qquad
c_n\uparrow c,
\qquad
c\le b .
$$

The last step uses preservation of non-strict inequalities in the limit: if $x_n\le y_n$ for all $n$ and both converge, then $\lim x_n\le\lim y_n$.

These are precisely the **limit superior** and **limit inferior**: $b=\limsup a_n$, $c=\liminf a_n$. The lecture builds them here; Lecture 6 uses them to prove the Cauchy criterion.

## Rethinking $\sqrt2$ with monotone convergence

Lecture 2 constructed $\sqrt2$ as a supremum. Here is another route: build an increasing sequence of decimal truncations, get a limit from monotone convergence, and verify that its square is $2$.

### The construction

For each $n\ge1$, let $b_n$ be the **largest natural number** with

$$
b_n^2\le 2\cdot10^{2n-2}.
$$

Such a largest element exists: the admissible naturals are nonempty (they contain $1$) and bounded.

Set

$$
a_n=\frac{b_n}{10^{n-1}} .
$$

For $n=1$ the condition is $b_1^2\le2$, so $b_1=1$ and $a_1=1$. For $n=2$, $b_2^2\le200$, so $b_2=14$ and $a_2=1.4$. In general $a_n$ is $\sqrt2$ truncated to $n$ significant digits.

### Monotonicity

We claim $a_n\le a_{n+1}$, which is equivalent to

$$
10b_n\le b_{n+1}.
$$

Indeed $a_n\le a_{n+1}$ reads $\dfrac{b_n}{10^{n-1}}\le\dfrac{b_{n+1}}{10^n}$, and multiplying by $10^n$ gives the claim.

Now check that $10b_n$ satisfies the defining inequality for step $n+1$. From $b_n^2\le2\cdot10^{2n-2}$, multiply by $100$:

$$
(10b_n)^2=100b_n^2\le200\cdot10^{2n-2}=2\cdot10^{2n}=2\cdot10^{2(n+1)-2}.
$$

So $10b_n$ is an admissible natural number at step $n+1$. Since $b_{n+1}$ is the **largest** admissible one, $10b_n\le b_{n+1}$.

### Boundedness

Take $2\cdot10^{n-1}$; its square is $4\cdot10^{2n-2}>2\cdot10^{2n-2}$, so it is not admissible and exceeds $b_n$. Hence

$$
b_n<2\cdot10^{n-1}
\implies
a_n=\frac{b_n}{10^{n-1}}<2 .
$$

Since $a_1=1>0$, the sequence is increasing and bounded above by $2$. By monotone convergence, $a_n\to a$ with $a=\sup a_n\le2$.

### The limit squares to 2

First, $a^2\le2$. Since $a_n^2\le2$ and $a_n^2\to a^2$ by the product rule, and limits preserve non-strict inequalities (if $x_n\to x$ and $x_n\le2$ then $x\le2$; otherwise with $\varepsilon=(x-2)/2>0$ we would eventually have $x_n>x-\varepsilon>2$), we get $a^2\le2$.

Second, $a^2\ge2$. By maximality of $b_n$, the number $b_n+1$ is not admissible:

$$
(b_n+1)^2>2\cdot10^{2n-2}.
$$

Divide by $10^{2n-2}=10^{n-1}\cdot10^{n-1}$:

$$
\left(\frac{b_n+1}{10^{n-1}}\right)^2>2 .
$$

But

$$
\frac{b_n+1}{10^{n-1}}=\frac{b_n}{10^{n-1}}+\frac1{10^{n-1}}=a_n+\frac1{10^{n-1}} .
$$

Let $s_n=a_n+10^{-(n-1)}$. The sum rule gives $s_n\to a+0=a$, and the product rule gives $s_n^2\to a^2$. Each $s_n^2>2$, and limits preserve non-strict inequalities, so $a^2\ge2$.

Combining, $a^2=2$. Thus $a=\sqrt2$, obtained as the limit of the increasing truncations — the rigorous version of "the decimal expansion of $\sqrt2$".

Note carefully: **termwise strict inequalities $s_n^2>2$ only yield $a^2\ge2$**. The limit may take equality, and here it does.

## Cauchy sequences and contraction (preview)

So far every limit required knowing the limit in advance. Can existence be decided without it?

**Definition.** A sequence $(a_n)$ is **Cauchy** if

$$
\forall\varepsilon>0\ \exists N\ \forall n,m\ge N:\quad |a_n-a_m|<\varepsilon .
$$

The difference: convergence says distant terms cluster around some $a$; Cauchy says distant terms cluster around each other, with no mention of $a$.

**Theorem (proved in Lecture 6).** In $\mathbb R$, a sequence converges if and only if it is Cauchy.

This removes the need to guess the limit in order to prove that one exists — repeatedly useful when proving existence of solutions to differential equations.

The lecture closes with the **contraction mapping theorem**: if $T:\mathbb R\to\mathbb R$ satisfies

$$
|T(x)-T(y)|\le c|x-y|
$$

for some constant $0<c<1$ and all $x,y$, then $T$ has a unique fixed point $x=T(x)$. The condition $c<1$ is essential: with $c=1$ the conclusion fails (the translation $T(x)=x+1$ has no fixed point). The theorem holds in general metric spaces and is the standard tool for existence and uniqueness of ODE solutions; Lecture 24's Picard–Lindelöf theorem uses it.

## What this lecture establishes

- Monotone plus bounded implies convergence; the limit is the supremum (increasing) or infimum (decreasing).
- The proof turns "the supremum is least" into "some term exceeds $a-\varepsilon$", then uses monotonicity.
- Any bounded sequence yields $b_n=\sup_{k\ge n}a_k$ (decreasing) and $c_n=\inf_{k\ge n}a_k$ (increasing), converging with $c\le b$ — the liminf and limsup.
- $\sqrt2$ is the limit of the increasing bounded truncations $a_n=b_n/10^{n-1}$, and its square is $2$.
- Termwise strict inequalities give only non-strict inequalities in the limit.
- Cauchy sequences avoid the limit value and are equivalent to convergence in $\mathbb R$; the contraction mapping theorem is a major application.

## Comprehension check

**1. In the proof of monotone convergence, why is the step "$a-\varepsilon$ is not an upper bound" indispensable? What does it guarantee?**

Reference answer: To get $a-a_n<\varepsilon$ we need some term $a_N>a-\varepsilon$. If $a-\varepsilon$ were an upper bound, every term would satisfy $a_n\le a-\varepsilon$ and no such $N$ would exist. It fails to be an upper bound precisely because $a$ is the **least** upper bound: nothing smaller can dominate the set. This converts minimality into "some term exceeds $a-\varepsilon$", and monotonicity extends it to "every later term exceeds it".

**2. For a bounded sequence, let $b_n=\sup_{k\ge n}a_k$ and $c_n=\inf_{k\ge n}a_k$. Prove $b_n$ decreases and $c_n$ increases, and explain why $b_n\ge c_n$.**

Reference answer: $b_n$ is the supremum over $\{a_k:k\ge n\}$, while $\{a_k:k\ge n+1\}\subseteq\{a_k:k\ge n\}$; a larger set has a supremum no smaller, so $b_n\ge b_{n+1}$. Dually $c_n\le c_{n+1}$. Over the same set, the supremum is at least the infimum, so $b_n\ge c_n$ for each $n$.

**3. In the construction of $\sqrt2$, why is $a_n\le a_{n+1}$ equivalent to $10b_n\le b_{n+1}$? Write out the verification that $10b_n$ is admissible.**

Reference answer: With $a_n=b_n/10^{n-1}$ and $a_{n+1}=b_{n+1}/10^n$, multiplying by $10^n$ gives the equivalence. Verification: from $b_n^2\le2\cdot10^{2n-2}$, multiplying by $100$ gives $(10b_n)^2\le2\cdot10^{2n}=2\cdot10^{2(n+1)-2}$, so $10b_n$ is an admissible natural number at step $n+1$; since $b_{n+1}$ is the largest admissible one, $10b_n\le b_{n+1}$.

**4. Why do the strict inequalities $s_n^2>2$ yield only $a^2\ge2$ rather than $a^2>2$? Give an example where strictness is lost.**

Reference answer: Limits preserve only non-strict inequalities. If $x_n\to x$ and $x_n>2$, one can only conclude $x\ge2$; for instance $x_n=2+1/n>2$ but the limit is $2$. In the construction, $s_n=a_n+10^{-(n-1)}$ does satisfy $s_n^2>2$ for every $n$, yet $s_n\to a$ and $a^2$ may equal $2$ — and it does. A strict conclusion would require an additional quantitative estimate, not merely a passage to the limit.

**5. What is the essential difference between Cauchy and convergent? Why is the Cauchy condition insufficient in $\mathbb Q$?**

Reference answer: Convergence names a limit $a$ and requires distant terms to approach it; Cauchy requires only that distant terms approach each other, with no candidate limit. In $\mathbb R$ the two are equivalent (completeness). In $\mathbb Q$ they are not: the rational truncations $1,1.4,1.41,\dots$ of $\sqrt2$ form a Cauchy sequence, but they have no limit in $\mathbb Q$ because $\sqrt2\notin\mathbb Q$. So "Cauchy implies convergent" is exactly the content of completeness.

## Relation to neighbouring lectures

This lecture gives the first sufficient condition and sketches limsup/liminf. The next lecture proves the Cauchy criterion — equivalence of Cauchy and convergent in $\mathbb R$ — using the construction of two monotone sequences to squeeze a Cauchy sequence.

Later, Lecture 7's Bolzano–Weierstrass theorem (every bounded sequence has a convergent subsequence) also rests on monotone convergence: either locate peaks or bisect to build a monotone subsequence.
