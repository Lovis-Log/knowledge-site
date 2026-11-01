---
slug: 07-subsequences-and-series
title: "Bolzano–Weierstrass, Cauchy Sequences and the Beginnings of Series"
summary: "We pay the debt left by the Cauchy convergence theorem: a bisection argument builds nested intervals and squeezes a convergent subsequence out of any bounded sequence. Then series are defined as partial sums; the geometric series is summed exactly, the harmonic series is shown to diverge, and absolute convergence is proved stronger than convergence."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, bolzano-weierstrass, series, convergence]
sources:
  - kind: video
    title: "Lecture 7: Bolzano–Weierstrass Theorem; Cauchy Sequences; Series"
    url: https://www.youtube.com/watch?v=qeDewaJ4n24
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## The gap left by the last lecture

The previous lecture proved the Cauchy convergence theorem: every Cauchy sequence converges. But that proof borrowed another result —

> **Bolzano–Weierstrass theorem.** Every bounded sequence $(a_n)$ has a convergent subsequence $(a_{n_k})$.

The route was: a Cauchy sequence is bounded (proved there) ⇒ Bolzano–Weierstrass supplies a convergent subsequence ⇒ show that the subsequence's limit is the limit of the whole sequence.

Bolzano–Weierstrass itself was never proved. It cannot be proved from the Cauchy theorem, since that would be circular: the correct order is Bolzano–Weierstrass first (using only completeness), Cauchy's theorem afterwards. This lecture fills the gap.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: the Cauchy theorem's proof depended on Bolzano–Weierstrass |
| 3:13 | Strategy: squeeze the subsequence between two monotone sequences |
| 9:58 | Bisection: intervals, endpoints, and subsequence indices |
| 19:26 | Monotone endpoints, interval length $2^{1-k}$, common limit |
| 23:00 | Definition of a series: the partial-sum sequence |
| 27:03 | The geometric series: sum formula and convergence criterion |
| 44:23 | The harmonic series: divergence by grouping |
| 54:07 | Terms must tend to zero; non-negative terms make partial sums monotone |
| 58:30 | Absolute convergence; it implies convergence |
| 1:07:08 | Example: $\sum 1/n^2$ converges |
| 1:17:05 | A survey of tests; the comparison test |

## Bolzano–Weierstrass: squeezing out a subsequence by bisection

### The idea

A bounded sequence $(a_n)$ is trapped in some interval, say $[0,1]$ (any bounded interval works; nothing in the argument uses the endpoints). Infinitely many points crowd into a finite interval, so at least one half contains infinitely many terms. Keep choosing the half that contains infinitely many, and the intervals shrink until the subsequence has nowhere to go but a single limit.

Three objects are constructed simultaneously:

- a subsequence $(a_{n_k})$;
- left endpoints $(b_k)$, increasing;
- right endpoints $(c_k)$, decreasing;

with
$$
b_k\le a_{n_k}\le c_k .
$$

If $b_k$ and $c_k$ converge to the same number, the squeezed subsequence must converge to it too.

### The construction

**Step 1.** Set
$$
b_1=0,\qquad c_1=1,\qquad a_{n_1}=a_1 .
$$
Since $a_1\in[0,1]$, certainly $b_1\le a_{n_1}\le c_1$.

**Step 2.** Split $[0,1]$ into $[0,\tfrac12]$ and $[\tfrac12,1]$. The whole sequence lies in the union, so at least one half contains **infinitely many** terms. Choose such a half (if both qualify, pick either) and set
$$
b_2=\text{its left endpoint},\qquad c_2=\text{its right endpoint}.
$$
Then choose as $a_{n_2}$ the first term after $a_{n_1}$ that lies in this half. The index must satisfy $n_2>n_1$; otherwise the result is not a subsequence.

**Step $k$.** Repeat: bisect $[b_{k-1},c_{k-1}]$, keep a half containing infinitely many terms as $[b_k,c_k]$, and take the first term after $a_{n_{k-1}}$ that lands inside it.

The construction never stalls, thanks to an inductive invariant: after bisecting, the two halves cover the previous interval, which contains infinitely many terms, so at least one half does too.

### The length recursion

Each bisection halves the length:
$$
c_{k+1}-b_{k+1}=\frac12\,(c_k-b_k).
$$
Starting from $c_1-b_1=1$,
$$
c_k-b_k=\left(\frac12\right)^{k-1}=2^{1-k}.
$$

Endpoints move inward, so
$$
b_1\le b_2\le b_3\le\cdots\le c_3\le c_2\le c_1 .
$$

### Convergence

$(b_k)$ is increasing and bounded above by $c_1$; $(c_k)$ is decreasing and bounded below by $b_1$. By the monotone convergence theorem both converge; write
$$
b_k\to b,\qquad c_k\to c .
$$
Since $b_k\le c_k$, passing to the limit gives $b\le c$. But
$$
c-b=\lim_{k\to\infty}(c_k-b_k)=\lim_{k\to\infty}2^{1-k}=0,
$$
so $b=c$.

Finally, for $l\ge k$ the construction gives $a_{n_l}\in[b_l,c_l]\subseteq[b_k,c_k]$, hence
$$
|a_{n_l}-b|\le c_k-b_k=2^{1-k}.
$$
Given $\varepsilon>0$, choose $k$ with $2^{1-k}<\varepsilon$; then $|a_{n_l}-b|<\varepsilon$ for all $l\ge k$. Therefore $a_{n_k}\to b$. $\square$

Only one deep fact is used: **monotone and bounded implies convergent**. The chain is completeness ⇒ monotone convergence ⇒ Bolzano–Weierstrass ⇒ Cauchy convergence, and no link may be used backwards.

## Series: the sequence of partial sums

Given a sequence $(a_n)$, form another:
$$
s_n=a_1+a_2+\cdots+a_n=\sum_{i=1}^{n}a_i .
$$

**Definition.** A sequence of this form $(s_n)$ is called a **series**. If $(s_n)$ converges, the series is said to converge, and its limit is written
$$
\sum_{i=1}^{\infty}a_i .
$$

One notational trap: the symbol $\sum_{i=1}^{\infty}a_i$ denotes both "the series as an object" and, when it converges, "its sum". Convergence does not depend on where the indexing starts (only the value of the sum does).

## The geometric series: the one important series we can sum

Fix $c$ and consider
$$
s_n=\sum_{i=0}^{n}c^i=1+c+c^2+\cdots+c^n .
$$

### The sum formula

Multiply by $c$:
$$
c\,s_n=c+c^2+\cdots+c^{n+1}.
$$

Subtract:
$$
(1-c)s_n=(1+c+\cdots+c^n)-(c+\cdots+c^{n+1})=1-c^{n+1},
$$
because all intermediate terms cancel. Hence for $c\ne1$,
$$
s_n=\frac{1-c^{n+1}}{1-c}.
$$

### Convergence

**Theorem.** The geometric series $\sum_{i=0}^{\infty}c^i$ converges for $|c|<1$ with sum $\dfrac{1}{1-c}$, and diverges for $|c|\ge1$.

**Proof ($|c|<1$).** By the sum formula,
$$
s_n=\frac{1-c^{n+1}}{1-c}.
$$
Since $|c^{n+1}|=|c|^{n+1}\to0$, the algebra of limits gives
$$
s_n\to\frac{1-0}{1-c}=\frac{1}{1-c}.
$$
Division by $1-c$ is legitimate precisely because $|c|<1$ forces $c\ne1$.

**Proof ($|c|\ge1$).** Look at consecutive differences:
$$
s_{n+1}-s_n=c^{n+1}.
$$
If $|c|\ge1$, then $|s_{n+1}-s_n|=|c|^{n+1}\ge1$ for every $n$. A convergent sequence is Cauchy, so any two terms sufficiently far out must be arbitrarily close. Here even consecutive terms stay at distance at least $1$, so $(s_n)$ cannot be Cauchy and diverges. $\square$

This is why the geometric series is called the most important series: it is one of the few whose sum can be computed exactly, and its convergence serves as a yardstick for comparing other series.

## The harmonic series diverges

$$
\sum_{n=1}^{\infty}\frac1n=1+\frac12+\frac13+\cdots
$$

**Theorem.** The harmonic series diverges.

**Proof.** Let $s_n=\sum_{i=1}^{n}1/i$. We show the subsequence at indices $2^n-1$ is unbounded:
$$
s_{2^n-1}\ge\frac{n}{2}\qquad(n\ge1).
$$

*Base case $n=1$:* $s_{2^1-1}=s_1=1\ge\tfrac12$.

*Inductive step:* assume $s_{2^n-1}\ge n/2$. Then
$$
s_{2^{n+1}-1}=s_{2^n-1}+\sum_{i=2^{n}}^{2^{n+1}-1}\frac1i .
$$
The block has $2^{n+1}-1-2^n+1=2^n$ terms, and each is at least the last one, $\dfrac{1}{2^{n+1}-1}$, which exceeds $\dfrac{1}{2^{n+1}}$. Therefore
$$
\sum_{i=2^{n}}^{2^{n+1}-1}\frac1i
\ge 2^n\cdot\frac{1}{2^{n+1}}=\frac12 .
$$
Substituting,
$$
s_{2^{n+1}-1}\ge \frac{n}{2}+\frac12=\frac{n+1}{2}.
$$
The induction is complete. Hence $s_{2^n-1}\ge n/2\to\infty$ is unbounded. A convergent series would have every subsequence convergent, hence bounded — contradiction. So the harmonic series diverges. $\square$

The engine is **grouping**: terms $2^n$ through $2^{n+1}-1$ form a block of $2^n$ terms, each at least $2^{-(n+1)}$, so each block contributes at least $1/2$. Infinitely many halves diverge.

## First check: terms must tend to zero

If $\sum a_i$ converges, then
$$
a_n=s_n-s_{n-1}\to0 .
$$
So **if the terms do not tend to zero, the series diverges** — no further test is needed. The converse fails: the harmonic series has $1/n\to0$ yet diverges.

## Non-negative series: partial sums are monotone

If all $a_n\ge0$, then
$$
s_{n+1}=s_n+a_{n+1}\ge s_n,
$$
so $(s_n)$ is increasing. By monotone convergence: **a non-negative-term series converges if and only if its partial sums are bounded above**.

This turns "decide convergence" into "find a bound", the basis for the examples below and for the comparison test.

## Absolute convergence

**Definition.** $\sum a_i$ **converges absolutely** if $\sum|a_i|$ converges.

**Theorem.** Absolute convergence implies convergence.

**Proof.** Let
$$
s_n=\sum_{i=1}^{n}a_i,\qquad \bar s_n=\sum_{i=1}^{n}|a_i| .
$$
For $m>n$,
$$
|s_m-s_n|=\left|\sum_{i=n+1}^{m}a_i\right|
\le\sum_{i=n+1}^{m}|a_i|
=\bar s_m-\bar s_n .
$$

Since $(\bar s_n)$ converges, it is Cauchy: given $\varepsilon>0$ there is $N$ with $\bar s_m-\bar s_n<\varepsilon$ whenever $m>n\ge N$. The display then gives $|s_m-s_n|<\varepsilon$, so $(s_n)$ is Cauchy and converges. $\square$

The proof uses the triangle inequality and the implication "convergent ⇒ Cauchy", whose own proof is now complete.

### A counterexample: the alternating harmonic series

$$
\sum_{n=1}^{\infty}\frac{(-1)^n}{n}
=-1+\frac12-\frac13+\frac14-\cdots
$$
It converges (stated here; proved with the alternating series test later), but taking absolute values gives the harmonic series, which diverges. Hence
$$
\text{absolute convergence}\Longrightarrow\text{convergence},
\qquad
\text{convergence}\nRightarrow\text{absolute convergence}.
$$

A series that converges but not absolutely is called conditionally convergent.

## Example: $\sum 1/n^2$ converges

$$
\sum_{n=1}^{\infty}\frac{1}{n^2}=1+\frac14+\frac19+\cdots
$$

The lecture uses this to show that convergence can be settled without the integral test. Since terms are non-negative, it suffices to bound the partial sums. Claim:
$$
s_{2^{n}-1}\le\sum_{i=0}^{n-1}\left(\frac12\right)^{i}\qquad(n\ge1).
$$

*Base case $n=1$:* $s_1=1$ and the right side is $(1/2)^0=1$.

*Inductive step:* assume the claim for $n$. Then
$$
s_{2^{n+1}-1}
=s_{2^n-1}+\sum_{i=2^{n}}^{2^{n+1}-1}\frac{1}{i^2}.
$$
The second block has $2^n$ terms and its largest term is the first, $\dfrac{1}{2^{2n}}$, so
$$
\sum_{i=2^{n}}^{2^{n+1}-1}\frac{1}{i^2}
\le 2^n\cdot\frac{1}{2^{2n}}=\frac{1}{2^{n}} .
$$
Substituting the inductive hypothesis,
$$
s_{2^{n+1}-1}\le\sum_{i=0}^{n-1}\frac{1}{2^{i}}+\frac{1}{2^{n}}
=\sum_{i=0}^{n}\frac{1}{2^{i}} .
$$
Induction complete.

Thus every partial sum of the form $s_{2^n-1}$ is controlled by the geometric series $\sum2^{-i}=2$, and that subsequence is increasing, so the whole sequence is bounded by $2$ and the series converges.

The proof is the exact mirror of the harmonic argument: the harmonic series uses the **smallest** term of each block to get a lower bound, $\sum1/n^2$ uses the **largest** to get an upper bound. One bisection scheme, two opposite conclusions.

## The standard tests

The lecture names them and proves only the comparison test; the rest come next time:

- **comparison test**;
- **ratio test**;
- **root test**;
- **integral test**;
- **alternating series test**.

Simplest form of the comparison test: if
$$
0\le a_n\le b_n
$$
for all sufficiently large $n$ and $\sum b_n$ converges, then $\sum a_n$ converges.

It works in both directions: compare a complicated series with a known convergent one to prove convergence, or with a known divergent one (with the inequality reversed) to prove divergence. The geometric series matters precisely because it is the usual yardstick.

## What this lecture establishes

- Bolzano–Weierstrass: every bounded sequence has a convergent subsequence, via nested bisected intervals of length $2^{1-k}\to0$ and monotone convergence.
- A series is its partial-sum sequence; convergence of one means convergence of the other.
- Geometric series: converges for $|c|<1$ with sum $1/(1-c)$; diverges for $|c|\ge1$.
- The harmonic series diverges, since $s_{2^n-1}\ge n/2$.
- Terms not tending to zero ⇒ divergence; tending to zero is not sufficient.
- Non-negative series converge iff partial sums are bounded above.
- Absolute convergence ⇒ convergence; the alternating harmonic series shows the converse fails.
- $\sum1/n^2$ converges, by the same block trick used for the harmonic series but with an upper bound.

## Comprehension check

**1. Why can Bolzano–Weierstrass not be proved from the Cauchy convergence theorem?**

Reference answer: The Cauchy theorem's proof already uses Bolzano–Weierstrass (a Cauchy sequence is bounded → take a convergent subsequence → show the whole sequence converges to that limit). Using Cauchy's theorem to prove Bolzano–Weierstrass would be circular. The logical order is completeness ⇒ monotone convergence ⇒ Bolzano–Weierstrass ⇒ Cauchy convergence. The proof given here uses only "monotone and bounded implies convergent".

**2. In the bisection, why can a half containing infinitely many terms always be found? What if both halves qualify?**

Reference answer: The previous interval contains infinitely many terms, and the two halves cover it, so at least one half contains infinitely many (otherwise the total would be finite). If both do, either may be chosen; the construction only needs the new interval to contain infinitely many terms, not to be unique. The next index can always be chosen strictly larger than the previous one, because infinitely many terms remain beyond any given index.

**3. Use the sum formula to prove $\sum_{i=0}^{\infty}c^i=1/(1-c)$ for $|c|<1$, and explain why the formula fails at $c=1$.**

Reference answer: For $c\ne1$, $(1-c)\sum_{i=0}^{n}c^i=1-c^{n+1}$, so $s_n=(1-c^{n+1})/(1-c)$. If $|c|<1$ then $|c|^{n+1}\to0$, hence $s_n\to1/(1-c)$. At $c=1$ the derivation divides by $1-c=0$, which is illegal; directly, $s_n=n+1\to\infty$, so the series diverges and no sum exists.

**4. In the harmonic proof, why choose the subsequence at indices $2^n-1$?**

Reference answer: Grouping needs a fixed number of terms per block with a uniform lower bound. The block from $2^n$ to $2^{n+1}-1$ has exactly $2^n$ terms, each at least $2^{-(n+1)}$, so the block contributes at least $2^n\cdot2^{-(n+1)}=1/2$. The index $2^n-1$ is exactly the endpoint of these blocks, making block number $n$ contribute $n$ halves in total. An arbitrary subsequence need not give a block contribution bounded below by a constant independent of $n$.

**5. Why does absolute convergence imply convergence, and where is completeness used?**

Reference answer: Let $\bar s_n=\sum_{i=1}^{n}|a_i|$ converge. For $m>n$,
$$
|s_m-s_n|=\left|\sum_{i=n+1}^{m}a_i\right|\le\sum_{i=n+1}^{m}|a_i|=\bar s_m-\bar s_n .
$$
A convergent $(\bar s_n)$ is Cauchy, so the right side becomes arbitrarily small, hence $(s_n)$ is Cauchy and converges. Completeness is used in the last step: "Cauchy ⇒ convergent" is the Cauchy convergence theorem, which rests on completeness via Bolzano–Weierstrass.

**6. Why can the comparison test prove both convergence and divergence?**

Reference answer: It is two-sided. If $0\le a_n\le b_n$ and $\sum b_n$ converges, monotonicity of non-negative partial sums gives $s_n(a)\le s_n(b)$, which is bounded, so $\sum a_n$ converges. Conversely, if $0\le b_n\le a_n$ and $\sum b_n$ diverges, then $s_n(a)\ge s_n(b)$ is unbounded, so $\sum a_n$ diverges. The two directions just reverse the inequality.

## Relation to neighbouring lectures

Bolzano–Weierstrass completes the previous lecture's Cauchy theorem; the three fundamental theorems of the real line (monotone convergence, Cauchy convergence, Bolzano–Weierstrass) are now proved and mutually equivalent. The series story has only begun: next time come the ratio, root, integral and alternating tests, and then power series — the gateway to representing functions by series.

When continuity, limits and derivatives arrive, two tools from this lecture will keep returning: squeezing (the subsequence trapped between $b_k$ and $c_k$) and block estimates (pushing an infinite sum under a geometric bound).
