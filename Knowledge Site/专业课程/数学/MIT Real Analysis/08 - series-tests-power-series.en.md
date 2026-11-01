---
slug: 08-series-tests-power-series
title: "Tests for Series: Comparison, Ratio, Root, and Power Series"
summary: "Starting from the necessary condition that terms must tend to zero, the lecture builds the two forms of the comparison test, the ratio test and the root test, then applies them to power series: first deciding which x make the series converge, then computing the ratio for the exponential series and finding its limit is zero for every x."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, series, ratio-test, root-test, power-series]
sources:
  - kind: video
    title: "Lecture 8: Convergence Tests for Series; Power Series"
    url: https://www.youtube.com/watch?v=lEMeyFq4-zQ
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Series recap and the first check

Given a sequence $(a_n)$, the series is the sequence of partial sums
$$
s_n=\sum_{i=1}^{n}a_i .
$$
The series converges exactly when $(s_n)$ converges, which by the Cauchy convergence theorem happens exactly when $(s_n)$ is Cauchy.

Taking $m=n-1$ in the Cauchy condition gives
$$
s_n-s_{n-1}=a_n\to0 .
$$

**So the first thing to check is not a test but the terms themselves.** If $a_n$ does not tend to zero, the series diverges immediately. The converse fails: the harmonic series has $1/n\to0$ yet diverges. This check can only rule series out, never in.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap; the Cauchy criterion forces $a_n\to0$ |
| 6:12 | Geometric series: the most important, easiest to decide |
| 10:23 | The $p$-series family: $\alpha=1$ diverges, $\alpha>1$ converges |
| 12:36 | Absolute convergence; why alternating series converge |
| 19:58 | Non-negative terms: partial sums monotone, convergence iff bounded |
| 23:14 | Comparison test, first form, with proof |
| 34:53 | Comparison test, second (limit) form |
| 40:53 | Ratio test and its proof |
| 57:22 | Root test and its proof |
| 1:07:35 | Power series; the exponential series converges for every $x$ |
| 1:19:59 | Preview: limsup and liminf when the limit fails to exist |

## A family of important series: the $p$-series

The harmonic series is not isolated; it sits in
$$
\sum_{n=1}^{\infty}\frac{1}{n^{\alpha}} .
$$

- $\alpha=1$: the harmonic series, divergent.
- $\alpha>1$: convergent. The previous lecture proved only $\alpha=2$, by comparison with a geometric series and induction at the indices $2^n-1$. The general case $\alpha>1$ is normally handled by the integral test, which comes later.

This family is a standard yardstick: any series whose terms have the same order as $1/n^\alpha$ can be compared with it.

## Absolute convergence and alternating series

If $\sum|a_i|$ converges, the series $\sum a_i$ **converges absolutely**. The previous lecture proved that absolute convergence implies convergence.

The converse fails, and the standard counterexample is the alternating harmonic series
$$
\sum_{n=1}^{\infty}\frac{(-1)^n}{n}
=-1+\frac12-\frac13+\frac14-\cdots
$$

### Why it converges

Picture the partial sums walking back and forth on the line:

- starting at $0$, $s_1=-1$ takes a big step down;
- $s_2=-1+\tfrac12=-\tfrac12$ climbs back toward $0$, but not all the way;
- $s_3=-\tfrac12-\tfrac13=-\tfrac56$ goes down, yet stays above the previous low $-1$;
- $s_4=-\tfrac56+\tfrac14=-\tfrac7{12}$ goes up, yet stays below the previous high $-\tfrac12$.

So the even partial sums increase, the odd ones decrease, each set brackets the other, and the step size $1/n\to0$; both converge to the same number. This is the geometric content of the **alternating series test**.

**Test (stated).** If the signs of $a_n$ alternate, $|a_n|$ decreases monotonically, and $|a_n|\to0$, then $\sum a_n$ converges.

Applying absolute values to the alternating harmonic series produces the harmonic series, which diverges. Hence the series converges but not absolutely — the standard illustration that convergence does not imply absolute convergence.

## Non-negative series: monotone and bounded

If all $a_n\ge0$, then
$$
s_{n+1}=s_n+a_{n+1}\ge s_n,
$$
so the partial sums increase. By monotone convergence:
$$
\sum a_n\ \text{converges}\iff (s_n)\ \text{is bounded above}.
$$

This turns "decide convergence" into "find an upper bound" and underlies every test that follows — comparison, ratio and root all amount to **pushing the series under some geometric series**.

## Comparison test, first form

**Theorem.** Let $0\le a_n\le b_n$ for all $n$. If $\sum b_n$ converges, then $\sum a_n$ converges; equivalently, if $\sum a_n$ diverges, then $\sum b_n$ diverges.

### Proof

**Via monotone convergence.** Write $s_n^a=\sum_{i=1}^{n}a_i$ and $s_n^b=\sum_{i=1}^{n}b_i$. Termwise,
$$
s_n^a\le s_n^b .
$$
Convergence of $\sum b_n$ makes $(s_n^b)$ bounded, say $s_n^b\le C$. Then $s_n^a\le C$, and the increasing sequence $(s_n^a)$ converges.

**Via Cauchy.** For $m<n$,
$$
|s_n^a-s_m^a|=\sum_{i=m+1}^{n}a_i\le\sum_{i=m+1}^{n}b_i=|s_n^b-s_m^b| ,
$$
where the absolute values on the left may be dropped because terms are non-negative. If $\sum b_n$ converges, $(s_n^b)$ is Cauchy, so the right side is arbitrarily small, so $(s_n^a)$ is Cauchy and converges.

Both routes work. The Cauchy route has the advantage of **never needing to know the sum** — which is the whole point of a test, since the sum is usually unknowable.

### Example: $\sum 2^{-n}/n$

Since $\dfrac1n\le1$,
$$
0\le\frac{2^{-n}}{n}\le 2^{-n}.
$$
The right side is a geometric series with $c=\tfrac12$, hence convergent. By comparison, $\sum2^{-n}/n$ converges.

The pattern: extract a known-convergent skeleton and check that the remaining factor is uniformly bounded.

## Comparison test, second form (limit comparison)

**Theorem.** Let $a_n\ge0$, $b_n>0$, and
$$
\frac{a_n}{b_n}\to L,
\qquad 0<L<\infty .
$$
Then $\sum a_n$ converges if and only if $\sum b_n$ converges.

Its advantage: no termwise inequality is needed, only a comparison of order.

### Example: $\sum \dfrac{1}{n^2-1}$

Take $a_n=\dfrac{1}{n^2-1}$ (for $n\ge2$) and $b_n=\dfrac{1}{n^2}$. Then
$$
\frac{a_n}{b_n}=\frac{n^2}{n^2-1}=\frac{1}{1-1/n^2}\to1 .
$$
Since $1\in(0,\infty)$ and $\sum1/n^2$ converges, the given series converges.

The first form would require an explicit inequality such as $\frac{1}{n^2-1}\le\frac{2}{n^2}$ for $n\ge2$ — doable, but more roundabout.

## Ratio test

**Theorem.** Suppose $a_n\ne0$ and
$$
\left|\frac{a_{n+1}}{a_n}\right|\to a .
$$
Then:

1. if $a<1$ the series **converges absolutely** (hence converges);
2. if $a>1$ the series diverges;
3. if $a=1$ the test is inconclusive.

The hypothesis requires that **the limit exists**; when it does not, this form cannot be used (limsup in the next lecture handles that case).

### Proof ($a<1$)

Choose $\alpha$ with $a<\alpha<1$. Since the ratio tends to $a$, there is $N$ such that for $n\ge N$,
$$
\left|\frac{a_{n+1}}{a_n}\right|\le\alpha,
$$
that is,
$$
|a_{n+1}|\le\alpha|a_n| .
$$
Iterating,
$$
|a_{N+m}|\le\alpha^{m}|a_N| .
$$
So the tail of $\sum|a_n|$ is dominated by the geometric series $|a_N|\sum\alpha^m$. By the first comparison test, $\sum|a_n|$ converges, i.e. the series converges absolutely.

### Proof ($a>1$)

Choose $\alpha$ with $1<\alpha<a$. For $n\ge N$, $|a_{n+1}|\ge\alpha|a_n|$, hence
$$
|a_{N+m}|\ge\alpha^{m}|a_N|\to\infty .
$$
The terms do not even tend to zero, so the series diverges.

### Why $a=1$ is inconclusive

Both $\sum1/n$ and $\sum1/n^2$ have ratios tending to $1$, yet the first diverges and the second converges. At $a=1$ the ratio test carries no information.

## Root test

**Theorem.** Suppose
$$
\sqrt[n]{|a_n|}=|a_n|^{1/n}\to c .
$$
Then:

1. if $c<1$ the series converges absolutely;
2. if $c>1$ the series diverges;
3. if $c=1$ the test is inconclusive.

### Proof ($c<1$)

Choose $c<c_0<1$. For $n\ge N$, $|a_n|^{1/n}\le c_0$. Raising to the $n$-th power,
$$
|a_n|\le c_0^{\,n}.
$$
The right side is a geometric series with $c_0<1$, so by comparison $\sum|a_n|$ converges.

### Proof ($c>1$)

Choose $1<c_0<c$. For $n\ge N$, $|a_n|^{1/n}\ge c_0$, so
$$
|a_n|\ge c_0^{\,n}\to\infty .
$$
The terms do not tend to zero; the series diverges.

### How the two tests differ

The ratio test looks at **consecutive terms** and asks whether the absolute size shrinks by a fixed factor. The root test looks at the **overall scale**, tolerating occasional jumps provided the long-run growth is controlled. The root test is slightly more general; the ratio test is often easier to compute for factorials and powers.

## Power series

**Definition.** Given coefficients $(a_n)$ and a real $x$, a series of the form
$$
\sum_{n=0}^{\infty}a_n x^n
$$
is a **power series** — an "infinite-degree polynomial".

Basic examples:

- Geometric: $\sum x^n$ with $a_n=1$; converges for $|x|<1$ with sum $\dfrac{1}{1-x}$.
- Exponential: $\displaystyle e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}$.
- Cosine: $\displaystyle \cos x=\sum_{n=0}^{\infty}\frac{(-1)^n x^{2n}}{(2n)!}$.
- Sine: $\displaystyle \sin x=\sum_{n=0}^{\infty}\frac{(-1)^n x^{2n+1}}{(2n+1)!}$.

Not every function admits a power series. Those that do are called **analytic**. The lecture points to a function that is "dead zero" up to a point and only then becomes interesting, which is analytic nowhere. Note: the standard example is $f(x)=e^{-1/x^2}$ for $x\ne0$ and $f(0)=0$; every derivative at $0$ vanishes, so any power series expansion would have to be identically zero, contradicting the function.

### The central question: for which $x$ does it converge?

Fix $x$; the power series becomes an ordinary series, and the tests apply. For the exponential series, set
$$
b_n=\frac{x^n}{n!},\qquad x\ne0 .
$$
The ratio is
$$
\left|\frac{b_{n+1}}{b_n}\right|
=\left|\frac{x^{n+1}}{(n+1)!}\cdot\frac{n!}{x^n}\right|
=\frac{|x|}{n+1}\to 0 .
$$
For every fixed $x$ the limit is $0<1$, so by the ratio test the series converges absolutely **for all** $x$.

Note carefully: $x$ is a fixed parameter and $n$ is what tends to infinity. First decide convergence for a fixed $x$; asking how the sum varies with $x$ is a separate question, taken up later.

## What this lecture establishes

- Terms not tending to zero ⇒ divergence; this is the fastest first check.
- $p$-series: $\alpha=1$ diverges, $\alpha>1$ converges.
- Absolute convergence ⇒ convergence; the alternating harmonic series shows the converse fails.
- Non-negative series converge iff partial sums are bounded above.
- Comparison test, first form: $0\le a_n\le b_n$ transfers convergence downward; second form: $a_n/b_n\to L\in(0,\infty)$ makes the two series share their fate.
- Ratio test: $|a_{n+1}/a_n|\to a$; $a<1$ absolute convergence, $a>1$ divergence, $a=1$ inconclusive.
- Root test: $|a_n|^{1/n}\to c$; same three cases.
- Both tests push the series under a geometric series; one uses consecutive ratios, the other an $n$-th root.
- Power series: fix $x$ and apply a test; the exponential series converges for every $x$.

## Comprehension check

**1. Why can "terms tend to zero" only rule out convergence, never establish it?**

Reference answer: If a series converges then $a_n=s_n-s_{n-1}\to0$, a necessary condition. It is not sufficient: the harmonic series has $1/n\to0$ yet diverges (shown last lecture via $s_{2^n-1}\ge n/2$). So $a_n\to0$ settles nothing and further tests are needed, while $a_n\not\to0$ immediately proves divergence.

**2. Use the comparison test to prove $\sum2^{-n}/n$ converges, and explain why the test cannot be used in the opposite direction.**

Reference answer: Since $1/n\le1$, we have $0\le2^{-n}/n\le2^{-n}$; the right side is the geometric series with $c=1/2$, which converges, so by the first comparison test $\sum2^{-n}/n$ converges. The reverse use fails because $a_n\le b_n$ together with divergence of $\sum a_n$ says nothing about $\sum b_n$ — the larger series could still converge. Proving divergence requires the inequality to go the other way: $0\le b_n\le a_n$ with $\sum b_n$ divergent.

**3. Why does limit comparison require $L$ to be neither $0$ nor $\infty$? Give an example where $L=0$ changes the conclusion.**

Reference answer: $L\in(0,\infty)$ means the terms have the same order, hence share convergence. If $L=0$, $a_n$ is much smaller than $b_n$, and only "$\sum b_n$ converges ⇒ $\sum a_n$ converges" survives. Example: $a_n=1/n^2$, $b_n=1/n$ gives $a_n/b_n=1/n\to0$; $\sum b_n$ diverges while $\sum a_n$ converges, so they do not share their fate.

**4. Why is the ratio test inconclusive at $a=1$? Illustrate with two series.**

Reference answer: At $a=1$ the ratio only says consecutive terms are comparable in size; it cannot distinguish sufficiently fast decay from insufficient decay. For $\sum1/n$ the ratio is $\frac{n}{n+1}\to1$ and the series diverges; for $\sum1/n^2$ the ratio is $\frac{n^2}{(n+1)^2}\to1$ and the series converges. The same limit gives opposite conclusions, so no information is available.

**5. Prove the root test for $c<1$, and identify where the comparison test is used.**

Reference answer: Choose $c<c_0<1$. Since $|a_n|^{1/n}\to c$, there is $N$ such that $|a_n|^{1/n}\le c_0$ for $n\ge N$; raising to the $n$-th power gives $|a_n|\le c_0^n$. Comparing $\sum|a_n|$ termwise with the convergent geometric series $\sum c_0^n$ shows $\sum|a_n|$ converges. The comparison test is used precisely at that step — pushing the series under a geometric series. Finitely many initial terms do not affect convergence.

**6. For the exponential series $\sum x^n/n!$, why is the ratio limit $0$ for every $x$, and what does that say about the range of convergence?**

Reference answer: The ratio is
$$
\left|\frac{x^{n+1}/(n+1)!}{x^n/n!}\right|=\frac{|x|}{n+1}\to0
$$
for any fixed $x$, since the numerator is constant and the denominator grows without bound. The limit $0<1$ gives absolute convergence for every $x$, so the range is the entire real line (indeed the complex plane). This differs from the geometric series, confined to $|x|<1$: the factorial in the denominator outgrows every exponential.

## Relation to neighbouring lectures

This lecture turns "decide whether a series converges" into a workflow: check the terms, check non-negativity, then try comparison, ratio, root. Every test has the same skeleton — dominate by a geometric series — which is why the previous lecture laboured over the geometric sum.

The next lecture closes two gaps: when the ratio or the $n$-th root has no limit, limsup and liminf replace the limit and the tests still work; then the course turns to continuous functions and uses power series to construct the exponential and trigonometric functions.
