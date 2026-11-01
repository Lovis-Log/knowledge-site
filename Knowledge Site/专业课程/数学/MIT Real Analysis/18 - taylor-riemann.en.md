---
slug: 18-taylor-riemann
title: "Taylor Remainders and Riemann Integrals: From Approximation to Area"
summary: "Cauchy's mean value theorem first proves L'Hôpital's rule. Two examples then calibrate Taylor remainders: the exponential is approximated extremely well, while e^{-1/x^2} shows that smoothness does not guarantee approximation. The lecture closes by building the Riemann integral from partitions, upper and lower sums, and a refinement lemma."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, taylor-series, lhopital, riemann-integral]
sources:
  - kind: video
    title: "Lecture 17: Taylor Polynomials; Remainder Term; Riemann Integrals"
    url: https://www.youtube.com/watch?v=yG4bJnFT5-o
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## From remainders to areas

The previous lecture left two loose ends: Cauchy's mean value theorem had not yet been used, and the Taylor remainder was only a formula. This lecture puts both to work:

- Cauchy's theorem proves **L'Hôpital's rule** for limits of the form $0/0$.
- Two examples calibrate **how good a Taylor remainder can be**: excellent for $e^x$, useless for $e^{-1/x^2}$.
- The topic then changes: starting from the one known area — a rectangle — partitions and upper/lower sums **construct the Riemann integral**.

The first half is estimation, the second half is construction; both turn "infinitely many" into "finitely many, but arbitrarily accurate".

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap of the mean value theorem and Cauchy's version; $g(x)=x$ recovers the ordinary theorem |
| 6:20 | Statement of L'Hôpital's rule ($0/0$ case) |
| 10:08 | Proof via Cauchy's mean value theorem |
| 18:37 | Student question: why is $g(x)-g(y)\ne0$? |
| 19:59 | Review of Taylor polynomials and the remainder |
| 27:32 | Example 1: estimating the remainder for $e^x$ |
| 34:05 | Example 2: $e^{-1/x^2}$, whose Taylor polynomial vanishes |
| 37:00 | For a fixed $\varepsilon$, how far from the expansion point can one go? |
| 40:43 | The idea of the Riemann integral; the only known area |
| 44:05 | Partitions and refinements |
| 50:06 | Upper and lower sums; computing $x^2+1$ on $[-2,2]$ |
| 1:03:44 | Refinement lemma: lower sums rise, upper sums fall |
| 1:10:29 | Upper and lower integrals |
| 1:14:34 | Definition of Riemann integrability; continuity left for next time |

## Recap: two mean value theorems

Mean value theorem: if $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then some $x_0\in(a,b)$ satisfies

$$
f'(x_0)=\frac{f(b)-f(a)}{b-a}.
$$

Cauchy's version: if $f,g$ are likewise continuous and differentiable, then some $x_0\in(a,b)$ satisfies

$$
f'(x_0)\big(g(b)-g(a)\big)=g'(x_0)\big(f(b)-f(a)\big).
$$

Take $g(x)=x$. Then $g(b)-g(a)=b-a$ and $g'(x_0)=1$, so

$$
f'(x_0)(b-a)=f(b)-f(a),
$$

which is the ordinary theorem. Cauchy's form is genuinely stronger; the gain only shows up in applications.

## L'Hôpital's rule

**Theorem ($0/0$ case).** Let $f,g$ be differentiable on $(a,b)$, with $g(x)\ne0$ and $g'(x)\ne0$ for every $x\in(a,b)$. If

$$
\lim_{x\to a}f(x)=0,
\qquad
\lim_{x\to a}g(x)=0,
\qquad
\lim_{x\to a}\frac{f'(x)}{g'(x)}=L,
$$

then

$$
\lim_{x\to a}\frac{f(x)}{g(x)}=L .
$$

All three hypotheses matter: both functions tend to zero (otherwise the quotient is not indeterminate), the denominator and its derivative never vanish (otherwise neither the quotient nor Cauchy's theorem applies), and the ratio of derivatives has a limit.

**Proof.** Fix $x\in(a,b)$ and choose $y$ with $a<y<x$. Apply Cauchy's mean value theorem to $f,g$ on $[y,x]$: there is $x_0\in(y,x)$ with

$$
f'(x_0)\big(g(x)-g(y)\big)=g'(x_0)\big(f(x)-f(y)\big).
$$

Since $g(x)\ne0$ and $g(y)\to0$ as $y\to a$, for $y$ close enough to $a$ we have $g(x)-g(y)\ne0$. Dividing,

$$
\frac{f'(x_0)}{g'(x_0)}
=
\frac{f(x)-f(y)}{g(x)-g(y)} .
$$

Now let $y\to a$. The right side tends to $f(x)/g(x)$, because the numerator and denominator tend to $f(x)$ and $g(x)$. On the left, $x_0$ lies in $(y,x)$, so as $y\to a$ the point $x_0$ tends to $a$ as well.

Care is needed here: $x_0$ depends on $y$ and does not simply equal $a$. The rigorous route is an $\varepsilon$ argument. Given $\varepsilon>0$, the hypothesis on $f'/g'$ gives $\delta>0$ such that $|z-a|<\delta$ implies $|f'(z)/g'(z)-L|<\varepsilon$. Fix $x$ with $x<a+\delta$ and take $y$ with $a<y<a+\delta$; then $x_0\in(y,x)$ also lies in $(a,a+\delta)$, so

$$
\left|\frac{f'(x_0)}{g'(x_0)}-L\right|<\varepsilon .
$$

Letting $y\to a$ turns the left side into $\left|\frac{f(x)}{g(x)}-L\right|$, hence

$$
\left|\frac{f(x)}{g(x)}-L\right|\le\varepsilon .
$$

This holds for every $x$ close enough to $a$, and $\varepsilon$ is arbitrary, so $\lim_{x\to a}f(x)/g(x)=L$. $\square$

The second version (as $x\to\infty$, or $\infty/\infty$) is analogous and was skipped in class.

## Taylor remainders: the formula

Let $f$ be $k$ times differentiable on an interval containing $a$ and $x$, and let $P_{k-1}$ be the Taylor polynomial of degree $k-1$:

$$
P_{k-1}(t)=\sum_{i=0}^{k-1}\frac{f^{(i)}(a)}{i!}(t-a)^i .
$$

Taylor's formula says that for some $c$ between $a$ and $x$,

$$
f(x)=P_{k-1}(x)+R_k(x),
\qquad
R_k(x)=\frac{f^{(k)}(c)}{k!}(x-a)^k .
$$

The polynomial is easy to evaluate; the error is controlled by $R_k$. But the location of $c$ is unknown — only that it lies between $a$ and $x$. All work with remainders is therefore about eliminating $c$.

## Example 1: the exponential

Take $f(x)=e^x$ and $a=0$. Since $f^{(i)}=e^x$, we have $f^{(i)}(0)=1$, so

$$
P_{k-1}(x)=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots+\frac{x^{k-1}}{(k-1)!},
$$

and

$$
R_k(x)=\frac{e^c}{k!}x^k,
\qquad c\text{ between }0\text{ and }x .
$$

On $[0,1]$, $e^c\le e$ and $x\le1$, hence

$$
|R_k(x)|\le \frac{e}{k!}.
$$

For $k=10$ this is about $2.7\times10^{-6}$; for $k=15$ about $7\times10^{-12}$. The factorial drives the convergence, and it is very fast. This is the quantitative statement behind "the exponential is easy to compute with a low-degree polynomial near zero".

**The inverse question: given an error $\varepsilon$ and a degree $k$, how far from $0$ can one go?** Bound

$$
\frac{e^{x}x^k}{k!}<\varepsilon ,
$$

where $c\le x$ has already been used to eliminate $c$. One unknown remains, so the admissible radius can be solved for, numerically if necessary. The lecture stresses that **eliminating $c$ is mandatory**; otherwise nothing can be decided.

## Example 2: smooth but unapproximable

Define

$$
f(x)=
\begin{cases}
0, & x\le0,\\[4pt]
e^{-1/x^2}, & x>0 .
\end{cases}
$$

It is continuous at $0$, since $-1/x^2\to-\infty$ makes $e^{-1/x^2}\to0$ as $x\to0^+$. It is differentiable for $x>0$ by the chain rule, and identically zero for $x<0$.

The crucial fact: **$f$ is infinitely differentiable, and $f^{(n)}(0)=0$ for every $n$.**

Sketch: for $x>0$,

$$
f'(x)=\frac{2}{x^3}e^{-1/x^2},
$$

and every further derivative has the form "a polynomial in $1/x$ times $e^{-1/x^2}$". Write $f^{(n)}(x)=P_n(1/x)e^{-1/x^2}$ with $P_n$ a polynomial. Then

$$
f^{(n+1)}(0)=\lim_{h\to0}\frac{f^{(n)}(h)-0}{h}
=\lim_{h\to0}\frac{P_n(1/h)}{h}e^{-1/h^2}=0,
$$

because the exponential decays faster than any power. Induction gives the claim.

Consequently the Taylor polynomial at $0$ is

$$
P_{k-1}(x)=\sum_{i=0}^{k-1}\frac{0}{i!}x^i=0
$$

for every $k$. Taylor's formula degenerates to

$$
f(x)=0+R_k(x),
$$

so **the remainder is the entire function**; the polynomial carries no information.

The lesson: $f$ is smooth to all orders at $0$ but not analytic there — its Taylor series at $0$ (identically zero) does not converge to $f$. Smoothness alone never guarantees a good polynomial approximation; the quality depends on the function.

## The Riemann integral: the one known quantity

The goal is to define the signed area under a curve: positive above the axis, negative below. The functions allowed are **bounded** on $[a,b]$.

Only one fact is available: the area of a rectangle is base times height. Everything must be built from it.

### Partitions

A **partition** of $[a,b]$ is a finite set of division points

$$
a=x_0<x_1<\cdots<x_k=b .
$$

It splits $[a,b]$ into $k$ subintervals $[x_{i-1},x_i]$, whose lengths are

$$
\Delta x_i=x_i-x_{i-1}.
$$

Finitely many points, by definition; but there are **infinitely many partitions**.

### Refinements

If $P_2$ contains every point of $P_1$ (possibly more), it is a **refinement** of $P_1$. A partition refines itself.

### Upper and lower sums

Let $f$ be bounded on $[a,b]$ and $P$ a partition. On the $i$-th subinterval set

$$
M_i=\sup_{[x_{i-1},x_i]} f,
\qquad
m_i=\inf_{[x_{i-1},x_i]} f .
$$

Boundedness makes both finite. Define

$$
U(f,P)=\sum_{i=1}^{k}M_i\,\Delta x_i,
\qquad
L(f,P)=\sum_{i=1}^{k}m_i\,\Delta x_i .
$$

Geometrically, $U$ uses rectangles that just cover the graph and $L$ uses rectangles that just fit beneath it. Since $m_i\le M_i$,

$$
L(f,P)\le U(f,P).
$$

### A complete computation

Take $f(x)=x^2+1$ on $[-2,2]$ with

$$
P=\{-2,-1,0,1,2\}.
$$

Every subinterval has length $1$. The function decreases on $[-2,0]$ and increases on $[0,2]$.

| Subinterval | $m_i$ | $M_i$ |
| --- | --- | --- |
| $[-2,-1]$ | $f(-1)=2$ | $f(-2)=5$ |
| $[-1,0]$ | $f(0)=1$ | $f(-1)=2$ |
| $[0,1]$ | $f(0)=1$ | $f(1)=2$ |
| $[1,2]$ | $f(1)=2$ | $f(2)=5$ |

Hence

$$
U(f,P)=5+2+2+5=14,
\qquad
L(f,P)=2+1+1+2=6.
$$

The gap of $8$ is large because only four intervals are used. Refining shrinks the gap.

## The refinement lemma

**Lemma.** If $P_2$ refines $P_1$, then

$$
L(f,P_1)\le L(f,P_2)\le U(f,P_2)\le U(f,P_1).
$$

Refinement only raises lower sums and lowers upper sums.

**Proof (upper sums).** Compare interval by interval. If $P_2$ adds no point inside $[x_{i-1},x_i]$, the contributions agree. If it adds a point $y$, the contribution of $P_2$ there is

$$
\sup_{[x_{i-1},y]}f\cdot(y-x_{i-1})
+
\sup_{[y,x_i]}f\cdot(x_i-y).
$$

Both subintervals lie inside $[x_{i-1},x_i]$, so each supremum is at most $M_i$. Therefore the expression is

$$
\le M_i(y-x_{i-1})+M_i(x_i-y)=M_i(x_i-x_{i-1}),
$$

exactly the contribution of $P_1$. Summing over intervals gives $U(f,P_2)\le U(f,P_1)$. Replacing sup by inf reverses the inequalities for lower sums. $\square$

The lemma is nothing but "a supremum over a smaller interval is smaller", yet everything below rests on it.

## Upper and lower integrals, and integrability

**Definition.** For a bounded $f$ on $[a,b]$,

$$
\overline{\int_a^b f}=\inf_{P}U(f,P),
\qquad
\underline{\int_a^b f}=\sup_{P}L(f,P),
$$

the **upper** and **lower integrals**. The infimum and supremum range over **all** partitions.

One clarification: the lecture describes this as "the limit over finer and finer partitions", with quotation marks. The definition is only inf and sup; the "limit" is intuition, since the collection of partitions has no natural ordering into a sequence.

**Integrability.** If

$$
\underline{\int_a^b f}=\overline{\int_a^b f},
$$

then $f$ is **Riemann integrable** on $[a,b]$, and the common value is written

$$
\int_a^b f(x)\,dx .
$$

The definition does not say when equality holds. The lecture notes:

- For every bounded function, $\underline{\int}\le\overline{\int}$ (proved next time).
- **Continuous functions are integrable**, the main theorem of the next lecture.
- Continuity is sufficient, not necessary; bounded non-integrable functions exist (an example is in the notes but was not covered).

## What this lecture establishes

- Cauchy's theorem proves L'Hôpital's rule; fix $x$, let $y\to a$, and control $x_0$ with $\varepsilon$.
- On $[0,1]$, $e^x$ satisfies $|R_k(x)|\le e/k!$; the factorial gives rapid convergence.
- $e^{-1/x^2}$ is infinitely differentiable with all derivatives vanishing at $0$, so its Taylor polynomial is zero — smoothness does not imply approximability.
- A partition is a finite set of points; refinement raises lower sums and lowers upper sums.
- The upper integral is the infimum of all upper sums, the lower integral the supremum of all lower sums; equality defines Riemann integrability.
- For $x^2+1$ on $[-2,2]$ with $\{-2,-1,0,1,2\}$, $U=14$ and $L=6$.

## Comprehension check

**1. Why fix $x$ and let $y\to a$ when proving L'Hôpital's rule? Why not apply the mean value theorem directly to $f/g$?**

Reference answer: Cauchy's theorem relates two functions on an **interval** $[y,x]$ and needs two distinct endpoints. The quotient $f/g$ is undefined at $a$ (both numerator and denominator vanish) and need not be differentiable nearby, so the theorem cannot be applied to it directly. Fixing $x$ makes $g(x)\ne0$ a nonzero constant and makes $[y,x]$ a legitimate interval; letting $y\to a$ removes $f(y)$ and $g(y)$ and sends the right side to $f(x)/g(x)$. Finally, $x_0\in(y,x)$ shows that if both $x$ and $y$ are close to $a$, then $x_0$ is close to $a$, so the left side tends to $L$.

**2. Show that $f(x)=e^{-1/x^2}$ for $x>0$ and $f(x)=0$ for $x\le0$ has all derivatives vanishing at $0$, and explain why its Taylor polynomial is useless.**

Reference answer: for $x>0$, $f'(x)=\frac{2}{x^3}e^{-1/x^2}$, and inductively $f^{(n)}(x)=P_n(1/x)e^{-1/x^2}$ for some polynomial $P_n$. Hence

$$
f^{(n+1)}(0)=\lim_{h\to0}\frac{P_n(1/h)}{h}e^{-1/h^2}=0,
$$

because as $h\to0^+$ the exponential decays faster than any power of $1/h$. By induction every $f^{(n)}(0)=0$. Thus the Taylor polynomial of degree $k-1$ at $0$ is $\sum 0\cdot x^i=0$ for every $k$. Taylor's formula collapses to $f(x)=R_k(x)$: the remainder carries the whole value of the function, and the polynomial gives no approximation. So a function can be infinitely smooth at a point and still not be analytic there.

**3. For $f(x)=x^2+1$ on $[-2,2]$ with partition $\{-2,-1,0,1,2\}$, compute the upper and lower sums and explain the gap.**

Reference answer: each subinterval has length $1$. The function decreases on $[-2,-1]$ and $[-1,0]$ and increases on $[0,1]$ and $[1,2]$, so extrema occur at endpoints: $M=(5,2,2,5)$ and $m=(2,1,1,2)$. Hence $U=14$ and $L=6$. The gap of $8$ comes from the variation inside each interval: with only four intervals, the highest and lowest values on a piece can differ by up to $3$ (as on $[-2,-1]$, from $5$ down to $2$), so rectangles cannot follow the curve. Refining reduces the variation per piece, lowering $U$ and raising $L$.

**4. Prove: if $P_2$ refines $P_1$, then $U(f,P_2)\le U(f,P_1)$.**

Reference answer: compare interval by interval. If $P_2$ inserts a point $y$ in $[x_{i-1},x_i]$, its contribution there is $\sup_{[x_{i-1},y]}f\cdot(y-x_{i-1})+\sup_{[y,x_i]}f\cdot(x_i-y)$. Both subintervals lie inside $[x_{i-1},x_i]$, so both suprema are at most $M_i=\sup_{[x_{i-1},x_i]}f$, and the contribution is at most $M_i(y-x_{i-1})+M_i(x_i-y)=M_i(x_i-x_{i-1})$, which is exactly $P_1$'s contribution on that piece. Inserting several points is handled by repeating the argument; summing over all pieces gives $U(f,P_2)\le U(f,P_1)$. Replacing sup by inf reverses the inequality, giving the lower-sum statement.

**5. Why is the upper integral defined as the infimum of upper sums over all partitions rather than as a limit under refinement? What does Riemann integrability mean?**

Reference answer: the collection of partitions has no natural sequence structure, so "refine indefinitely" is not a precise operation and no limit can be taken directly. An infimum of a set bounded below always exists, so the definition is clean and order-independent. By the refinement lemma, upper sums decrease under refinement, so the infimum is the rigorous version of "the finest upper sum". A bounded $f$ is Riemann integrable when its lower and upper integrals coincide; the common value is then $\int_a^b f$. Integrability is a strong requirement: rectangles must squeeze the same number from above and below.

## Relation to neighbouring lectures

This lecture supplies L'Hôpital's rule and calibrates expectations for Taylor remainders: remainders can be estimated, but how well depends on the function. The integral section only completes the **definition**; no criterion for integrability has been given yet.

The next lecture first proves $\underline{\int}\le\overline{\int}$ for every bounded function, then gives an integrability criterion in terms of the gap between upper and lower sums, and proves that continuous functions are integrable; compactness and uniform continuity are the key tools. After that, the fundamental theorem of calculus links integration back to differentiation, and Taylor remainders meet integral remainders.
