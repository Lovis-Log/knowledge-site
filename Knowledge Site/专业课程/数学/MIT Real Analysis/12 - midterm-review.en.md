---
slug: 12-midterm-review
title: "Midterm Review: From Completeness to Power Series"
summary: "A single chain linking suprema, sequences, Cauchy sequences, continuity and series, with the decision tools and common traps for each problem type, plus two worked examples of exam-style writing."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, exam-review, sequences, series, continuity]
sources:
  - kind: video
    title: "Review for 18.100B Real Analysis Midterm"
    url: https://www.youtube.com/watch?v=r_AGxxITsbQ
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## How to use a review lecture

This is a full midterm review. It does not re-derive definitions; it strings the first half of the semester into one chain and supplies the **decision tools** and the **counterexample library** you actually use in an exam.

The lecturer states the theme outright: mathematics is built layer on layer. Individual steps are usually trivial; the difficulty is knowing which layer to call on. "A convergent sequence is bounded" is almost a restatement of the definition, yet it later becomes the supporting point for products of limits, boundedness of Cauchy sequences, and more.

Exam format, as announced: five main problems plus six bonus problems, each with its point value, so start with whatever looks easiest. The notes below are organised as concept → tool → trap, ending with two worked examples.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Bounded above, supremum, least upper bound property |
| 3:39 | Sequences and the $\varepsilon$-$N$ definition of convergence |
| 6:34 | Convergent implies bounded; algebra of limits |
| 9:11 | Subsequences and "all subsequences converge" |
| 12:36 | Monotone convergence theorem, increasing and decreasing versions |
| 14:55 | Cauchy sequences: definition and purpose |
| 17:40 | Cauchy convergence theorem; Bolzano–Weierstrass |
| 20:50 | Continuity: $\varepsilon$-$\delta$ and the sequential characterisation |
| 26:19 | Extreme value theorem and intermediate value theorem |
| 29:44 | Series, geometric series, harmonic series |
| 36:56 | Absolute convergence |
| 40:58 | Comparison, ratio and root tests |
| 48:21 | Power series and radius of convergence |
| 1:10:40 | Two examples: a recursive sequence and a comparison test |

## First chain: the reals → sequences

### Suprema and completeness

A set $A\subseteq\mathbb R$ is bounded above if some $M$ satisfies $a\le M$ for all $a\in A$. The number $M$ is the **least upper bound** (written $\sup A$) exactly when $M$ bounds $A$ above and every upper bound $\bar M$ satisfies $M\le\bar M$.

The key property of the reals is the **least upper bound property**: every nonempty set bounded above has a supremum; every set bounded below has an infimum. Every convergence result in the course ultimately traces back to this.

### The quantifiers of convergence

$(x_n)$ converges to $x$ means

$$
\forall \varepsilon>0\ \exists N\in\mathbb N\ \text{such that}\ n\ge N\Rightarrow |x_n-x|<\varepsilon .
$$

The two directions people mix up: $\varepsilon$ is chosen by someone else, $N$ is chosen by you; $N$ may depend on $\varepsilon$, but once fixed it must work for every $n\ge N$ simultaneously.

### Algebra of limits

If $a_n\to a$ and $b_n\to b$, then

$$
a_n+cb_n\to a+cb,
\qquad
a_nb_n\to ab,
\qquad
\frac{1}{a_n}\to\frac1a\ (\text{for }a\ne0,\ a_n\ne0).
$$

The reciprocal needs the denominator to stay away from zero: from $a_n\to a\ne0$ we get $|a_n|>|a|/2$ eventually, hence

$$
\left|\frac1{a_n}-\frac1a\right|=\frac{|a_n-a|}{|a_n||a|}<\frac{2|a_n-a|}{|a|^2}\to0 .
$$

## Second chain: bounded, monotone, Cauchy

### Convergent implies bounded

Take $\varepsilon=1$; the tail satisfies $|a_n-a|<1$, so $|a_n|<|a|+1$. Bound the finitely many earlier terms separately and take the maximum. The converse fails: $(-1)^n$ is bounded but divergent.

### Subsequences

A subsequence is $x_{n_k}$ with strictly increasing indices $n_1<n_2<\cdots$ — order preserved, terms may be skipped, no index repeated.

**Theorem.** $(x_n)$ converges if and only if **every** subsequence converges (to the same limit).

The "if" direction is trivial: the original sequence is its own subsequence (take the index map to be the identity). The "only if" direction uses $n_k\ge k$.

The trivial theorem earns its keep by contradiction: exhibit two subsequences with different limits and the original sequence diverges. For $(-1)^n$ the even terms are constantly $1$ and the odd terms constantly $-1$, so it diverges.

### Monotone convergence

- If $(x_n)$ is increasing ($x_{n+1}\ge x_n$), it converges if and only if it is bounded above, and then $\lim x_n=\sup\{x_n\}$.
- If $(x_n)$ is decreasing, it converges if and only if it is bounded below, and then $\lim x_n=\inf\{x_n\}$.

This is the standard tool when you know a sequence is bounded but do not know its limit. It converts existence into the existence of a supremum, which completeness guarantees.

### Cauchy sequences

$(x_n)$ is Cauchy if

$$
\forall\varepsilon>0\ \exists N\ \text{such that}\ m,n\ge N\Rightarrow |x_m-x_n|<\varepsilon .
$$

Cauchy-ness says the tail bunches together and mentions no candidate limit. Its value: **when you do not care what the limit is, checking Cauchy is usually easier than checking convergence.**

In $\mathbb R$ every Cauchy sequence converges (the Cauchy convergence theorem), so the two notions agree; in a general metric space only "convergent $\Rightarrow$ Cauchy" survives.

### Bolzano–Weierstrass

In $\mathbb R$, **every bounded sequence has a convergent subsequence**.

This is the key ingredient in the Cauchy convergence theorem: extract a convergent subsequence by BW, then show the whole Cauchy sequence converges to that subsequence's limit. The review stresses that both the Cauchy convergence theorem and BW can be *stated* in any metric space but need not *hold* there — they depend on completeness of the reals.

## Third chain: continuous functions

### Definition and sequential form

$f$ is continuous at $x_0$ if

$$
\forall\varepsilon>0\ \exists\delta>0\ \text{such that}\ |x-x_0|<\delta\Rightarrow|f(x)-f(x_0)|<\varepsilon .
$$

**Lemma.** If $f$ is continuous at $x_0$ and $x_n\to x_0$, then $f(x_n)\to f(x_0)$.

This lemma translates function questions into sequence questions and is the bridge to the extreme value and intermediate value theorems.

### Algebra of continuous functions

If $f,g$ are continuous and $c$ is constant, then $f+cg$ and $fg$ are continuous; if $g$ never vanishes, so are $1/g$ and $f/g$.

With two starting points — constant functions are continuous, and $f(x)=x$ is continuous — induction gives:

- every polynomial is continuous;
- every rational function is continuous wherever its denominator does not vanish.

That is the standard assembly line for building complicated continuous functions from simple ones.

### Two theorems

**Extreme value theorem.** If $f$ is continuous on a **closed** interval $[a,b]$, then $f$ attains a maximum and a minimum (and is therefore bounded).

**Intermediate value theorem.** If $f$ is continuous on $[a,b]$ and $y$ lies between $f(a)$ and $f(b)$, then some $x\in[a,b]$ satisfies $f(x)=y$.

Both proofs use the same parts: BW (extract a convergent subsequence), "continuity preserves sequential limits", and the supremum property of the reals. All three are needed.

## Fourth chain: series

### Partial sums

Given $(a_n)$, the partial sums $S_n=\sum_{k=0}^{n}a_k$ form another sequence. **A series converges exactly when its partial sums converge**, so every tool for sequences applies immediately.

The first thing to check: if $\sum a_n$ converges, then $a_n\to0$, because $a_n=S_n-S_{n-1}$ and the difference of two convergent sequences tends to $0$.

The converse fails: the harmonic series $\sum 1/n$ has terms tending to $0$ yet diverges. "Terms tend to zero" filters out obvious divergence; it is not a criterion.

### Three series to memorise

**Geometric series.** $\sum_{n=0}^{\infty}c^n$ converges for $|c|<1$, and

$$
\sum_{n=0}^{\infty}c^n=\frac{1}{1-c};
$$

it diverges for $|c|\ge1$.

Two details that cost marks:

1. **The sum depends on where you start.** $\sum_{n=1}^{\infty}c^n=\dfrac{c}{1-c}$, not $\dfrac{1}{1-c}$.
2. **Convergence is independent of the starting index; the value is not.** Shift the index freely when testing convergence, but subtract the removed terms when computing the sum.

**Harmonic series** $\sum_{n=1}^{\infty}\dfrac1n$: divergent.

**Alternating harmonic series** $\sum_{n=1}^{\infty}\dfrac{(-1)^{n-1}}{n}$: convergent, but not absolutely convergent.

Another useful convergent series is $\sum 1/n^2$, the yardstick for the comparison test.

### Absolute convergence

$\sum a_n$ is **absolutely convergent** if $\sum|a_n|$ converges. Absolute convergence implies convergence, but not conversely (the alternating harmonic series).

Absolute convergence buys two extra properties: the sum is unchanged under any reordering, and the product of two absolutely convergent series converges. The course uses exactly this when estimating remainder terms.

### Three tests

**Comparison test (version A).** If $0\le a_n\le b_n$ and $\sum b_n$ converges, then $\sum a_n$ converges; if $\sum a_n$ diverges, then $\sum b_n$ diverges.

**Comparison test (version B).** If $a_n,b_n>0$ and $\lim a_n/b_n=L$ with $0<L<\infty$, the two series share their convergence behaviour.

**Ratio test.** Suppose $a_n\ne0$ and $c=\lim\left|\dfrac{a_{n+1}}{a_n}\right|$ exists. If $c<1$ the series converges; if $c>1$ it diverges; if $c=1$ the test is inconclusive.

**Root test.** Let $c=\limsup\sqrt[n]{|a_n|}$. If $c<1$ the series converges; if $c>1$ it diverges; if $c=1$ the test is inconclusive.

Both the ratio and root tests are descendants of the geometric series: the idea is to compare the terms with some $c^n$. The root test uses the limsup rather than the limit so that it is defined in more situations — a limsup always exists, a limit need not.

### Power series

A series $\sum a_nx^n$ is an ordinary series for each fixed $x$. Define

$$
R=\frac{1}{\limsup\sqrt[n]{|a_n|}}\quad(\text{with }1/0=\infty,\ 1/\infty=0).
$$

Then

- for $|x|<R$ the series converges absolutely;
- for $|x|>R$ it diverges;
- at the two endpoints $|x|=R$ **nothing general can be said**; they must be checked separately.

That is why the standard answer to a power series problem reads "radius $R=\cdots$; endpoints must be handled separately".

**Example 1:** $\sum n^5x^n$. The ratio test gives

$$
\left|\frac{a_{n+1}}{a_n}\right|=\left(\frac{n+1}{n}\right)^5|x|\to|x| ,
$$

so the series converges for $|x|<1$, diverges for $|x|>1$, and $R=1$.

**Example 2:** $\sum \dfrac{n^5x^n}{n!}$. The ratio test gives

$$
\left|\frac{a_{n+1}}{a_n}\right|
=\left(\frac{n+1}{n}\right)^5\frac{|x|}{n+1}\to 0\cdot|x|=0 ,
$$

so it converges for every $x$ and $R=\infty$.

In an exam, do not just write "$R=\infty$": compute the ratio and draw the conclusion. Partial credit rewards the process.

## Problem types and traps

### Type 1: prove convergence from the definition

Template: guess the limit, then "given $\varepsilon>0$, take $N=\lceil\cdots\rceil$", and verify the inequality for $n\ge N$. The Archimedean property and the triangle inequality do most of the work.

Trap: letting $N$ depend on $n$. $N$ may depend only on $\varepsilon$.

### Type 2: use monotone convergence

You need two things: monotonicity (often by induction) and boundedness. The conclusion gives existence only, not the value — unless you also compute the supremum.

Trap: proving boundedness but not monotonicity, or assuming convergence to deduce boundedness (circular).

### Type 3: prove the Cauchy property

Estimate $|x_m-x_n|$, usually with $m>n$, by writing $|x_m-x_n|\le\sum_{k=n}^{m-1}|x_{k+1}-x_k|$ and bounding the tail with a geometric series or an integral.

Trap: confusing Cauchy-ness with "successive differences shrink". Shrinking successive differences does not imply Cauchy (e.g. $x_n=\sqrt n$).

### Type 4: radius of convergence

Decide between ratio and root first. Factorials and powers of $n$ usually favour the ratio test; an overall $n$-th power structure favours the root test.

Trap: forgetting the absolute value; forgetting the endpoints; confusing $R$ with the interval of convergence.

### Type 5: give a counterexample

The counterexample list that recurs throughout the review is worth memorising:

| Claim | Counterexample |
| --- | --- |
| Bounded implies convergent | $(-1)^n$ |
| Terms tend to 0 implies series converges | $\sum 1/n$ |
| Convergent implies absolutely convergent | $\sum(-1)^{n-1}/n$ |
| Cauchy implies convergent in a general metric space | $x_n=1/n$ in $X=(0,1]$ |
| Bounded implies a convergent subsequence in a general metric space | same example |

### A recursive sequence

Let $x_1=a$ and $x_{n+1}=\dfrac{x_n}{n}$. Find the limit.

Write the first few terms:

$$
x_1=a,\quad x_2=\frac{a}{1}=a,\quad x_3=\frac{a}{2},\quad x_4=\frac{a}{6},\quad x_5=\frac{a}{24}.
$$

The pattern is $x_n=\dfrac{a}{(n-1)!}$ for $n\ge1$. Induction confirms it: $x_{n+1}=\dfrac{x_n}{n}=\dfrac{a}{n!}$. Hence

$$
|x_n|=\frac{|a|}{(n-1)!}\le\frac{|a|}{n-1}\to0 ,
$$

so $\lim x_n=0$ regardless of $a$.

Listing the first few terms is not a proof; you must derive and verify the closed form, then argue convergence.

### A comparison test

Suppose $0\le a_n<1/n^2$. Does $\sum a_n$ converge?

Since $0\le a_n<1/n^2$ and $\sum 1/n^2$ converges, the comparison test gives convergence immediately.

The hypothesis $a_n\ge0$ is essential; without it, $a_n<1/n^2$ holds for divergent series too (take $a_n=-1$), and the claim is false.

## What this lecture establishes

- Every convergence statement ultimately rests on the **least upper bound property**.
- Convergent ⟹ Cauchy ⟹ bounded; neither arrow reverses, except Cauchy ⟹ convergent in $\mathbb R$.
- Monotone plus bounded implies convergence, with the limit equal to the supremum or infimum.
- Continuity transports sequential limits to function values; the extreme value and intermediate value theorems use BW, continuity, and completeness.
- For series: check the terms first, use the geometric series as a yardstick, then apply comparison, ratio or root tests.
- For power series: compute $R$ first, then treat the endpoints separately.
- Counterexamples matter as much as theorems: they mark the boundary of each theorem's validity.

## Comprehension check

**1. Why does "all subsequences converge" imply the original sequence converges, while "one convergent subsequence exists" does not?**

Reference answer: "All subsequences converge" includes the original sequence itself — take the index map $g(k)=k$. "One convergent subsequence exists" only says infinitely many terms cluster near a point while the rest may wander. For example, the even-indexed subsequence of $a_n=(-1)^n$ is constantly $1$ and converges, yet the original sequence diverges.

**2. Prove that a convergent sequence is bounded, and give a bounded but divergent example.**

Reference answer: Let $a_n\to a$. With $\varepsilon=1$ there is $N$ such that $n\ge N$ implies $|a_n-a|<1$, so $|a_n|\le|a|+1$ by the triangle inequality. Let

$$
M=\max\{|a_1|,\dots,|a_{N-1}|,\ |a|+1\};
$$

then $|a_n|\le M$ for all $n$. Counterexample: $a_n=(-1)^n$ is bounded, but its even and odd subsequences converge to $1$ and $-1$, so it diverges.

**3. Why can the monotone convergence theorem not drop "bounded"? Give an increasing divergent sequence.**

Reference answer: The theorem says "convergent $\iff$ bounded". Convergence implies boundedness in general, while boundedness implies convergence only with monotonicity: every term of an increasing sequence is at most the supremum and the sequence approaches it. Without boundedness, $a_n=n$ is increasing and divergent. Conversely, without monotonicity boundedness alone fails: $(-1)^n$. Both hypotheses are needed.

**4. Determine whether $\sum_{n=1}^{\infty}\dfrac{(-1)^{n-1}}{n}$ converges, and whether it converges absolutely.**

Reference answer: It converges by the alternating series test ($1/n$ decreases monotonically to $0$). It is not absolutely convergent, because $\sum 1/n$ is the harmonic series and diverges. So it is the standard example of "convergent but not absolutely convergent", showing absolute convergence is strictly stronger.

**5. Find the radius of convergence of $\sum_{n=0}^{\infty} n^5 x^n$ and discuss the endpoints.**

Reference answer: The ratio test gives

$$
\left|\frac{a_{n+1}}{a_n}\right|=\left(\frac{n+1}{n}\right)^5|x|\to|x|,
$$

so the series converges for $|x|<1$, diverges for $|x|>1$, and $R=1$. At $x=\pm1$ the terms are $\pm n^5$, which do not tend to zero, so the series diverges there. The interval of convergence is $(-1,1)$.

**6. Someone argues: "Since $a_n\to0$, the series $\sum a_n$ converges." What is wrong?**

Reference answer: This mistakes a necessary condition for a sufficient one. Convergence of $\sum a_n$ does imply $a_n\to0$ (because $a_n=S_n-S_{n-1}$), but the converse fails. The harmonic series has $a_n=1/n\to0$ while its partial sums are unbounded: grouping terms in blocks of size $2^k$ gives at least $1/2$ per block, and infinitely many blocks diverge.

**7. Why does "Cauchy implies convergent" fail in a general metric space? Illustrate with $X=(0,1]$.**

Reference answer: Cauchy-ness only says the tail bunches together; it does not say the point it is heading for belongs to the space. In $X=(0,1]$ take $x_n=1/n$. For any $\varepsilon>0$, choose $N>1/\varepsilon$; then $m,n\ge N$ gives $|1/m-1/n|<1/N<\varepsilon$, so the sequence is Cauchy. Its only candidate limit in $X$ would be $0$, which is not in $X$, so it does not converge in $X$. The Cauchy convergence theorem in $\mathbb R$ holds precisely because $\mathbb R$ is complete and has no such missing points.

## Relation to neighbouring lectures

This lecture compresses the first half of the semester into one network. The next lecture moves to metric spaces: convergence, Cauchy-ness and boundedness are transported from $\mathbb R$ to arbitrary distance spaces, and open sets, closed sets and compactness enter. The review's repeated emphasis on "which results depend on completeness" is exactly the dividing line the next lecture makes precise.
