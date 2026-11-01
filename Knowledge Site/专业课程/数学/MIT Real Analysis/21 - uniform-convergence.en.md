---
slug: 21-uniform-convergence
title: "Arc Length, Pointwise and Uniform Convergence"
summary: "Partitions and the mean value theorem explain where the arc length formula comes from, and the unit circle yields an integral representation of arccos. The lecture then separates pointwise from uniform convergence, uses x^n to show they differ, and proves the Weierstrass M-test together with uniform convergence of power series on compact subintervals."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, uniform-convergence, arc-length, power-series]
sources:
  - kind: video
    title: "Lecture 20: Pointwise Convergence; Uniform Convergence"
    url: https://www.youtube.com/watch?v=ISVOH18BIHM
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Two strands

The previous lecture ended with the arc length formula as a definition. This lecture justifies it: why is arc length $\int\sqrt{f'^2+g'^2}\,ds$, and what does the unit circle give? The answer includes the classical integral representation of $\arccos$.

The lecture then turns to a different subject: **convergence of sequences of functions**. A sequence of numbers has one notion of convergence; a sequence of functions has two:

- **Pointwise convergence**: for each fixed $x$, the sequence $f_n(x)$ converges.
- **Uniform convergence**: one $N$ works for all $x$ at once.

The difference looks technical but decides whether limits may be exchanged with integrals and derivatives. The main tool for detecting uniform convergence is the Weierstrass M-test.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Arc length: definition and justification via partitions, the mean value theorem, and Riemann sums |
| 10:29 | Example: $\gamma(s)=(s,s^2)$ on $[0,1]$ |
| 11:44 | Example: the unit circle, giving $\arccos x=\int_x^1\frac{ds}{\sqrt{1-s^2}}$ |
| 21:09 | Differentiating an integral with the variable in the lower limit; $\arccos'(x)$ |
| 27:26 | Pointwise convergence: definition and examples |
| 37:21 | Uniform convergence; uniform implies pointwise |
| 41:22 | Counterexample: $x^n$ on $[0,1]$ is not uniformly convergent |
| 49:48 | Weierstrass M-test and its proof |
| 1:05:44 | Application: $\sum x^n/n!$ converges uniformly on $[-L,L]$ |
| 1:11:17 | Power series, radius of convergence, uniform convergence on compact subintervals |

## Arc length: the definition and its justification

Let

$$
\gamma(s)=\big(f(s),g(s)\big),
\qquad s\in[a,b],
$$

be a plane curve with $f,g$ differentiable and derivatives continuous. Its arc length is defined as

$$
L=\int_a^b\sqrt{f'(s)^2+g'(s)^2}\;ds .
$$

**Why this is reasonable.** Take a partition $a=s_0<s_1<\cdots<s_n=b$. The curve splits into small pieces; the $i$-th piece runs from $\gamma(s_{i-1})$ to $\gamma(s_i)$. Approximate its length by the chord:

$$
\big|\gamma(s_i)-\gamma(s_{i-1})\big|
=\sqrt{\big(f(s_i)-f(s_{i-1})\big)^2+\big(g(s_i)-g(s_{i-1})\big)^2}.
$$

Apply the mean value theorem to $f$ and to $g$ separately: there are $\xi_i,\eta_i\in(s_{i-1},s_i)$ with

$$
f(s_i)-f(s_{i-1})=f'(\xi_i)\Delta s_i,
\qquad
g(s_i)-g(s_{i-1})=g'(\eta_i)\Delta s_i,
$$

where $\Delta s_i=s_i-s_{i-1}$. Substituting,

$$
\big|\gamma(s_i)-\gamma(s_{i-1})\big|
=\sqrt{f'(\xi_i)^2+g'(\eta_i)^2}\;\Delta s_i .
$$

Summing over $i$ produces a Riemann sum. Since $f',g'$ are continuous on a compact interval, they are uniformly continuous; for a fine enough partition, $\xi_i$ and $\eta_i$ lie in the same small piece, and the factor $\sqrt{f'(\xi_i)^2+g'(\eta_i)^2}$ differs from $\sqrt{f'(s)^2+g'(s)^2}$ by a uniformly small amount on that piece. Hence the Riemann sums converge to

$$
\int_a^b\sqrt{f'(s)^2+g'(s)^2}\;ds .
$$

So the formula comes from **cutting the curve into pieces, replacing arcs by chords, and passing to the limit**. The rigorous step uses uniform continuity — exactly the mechanism behind integrability of continuous functions.

## Example 1: a parabolic arc

Take

$$
\gamma(s)=(s,s^2),
\qquad s\in[0,1].
$$

Then $f'=1$ and $g'=2s$, so

$$
L=\int_0^1\sqrt{1+4s^2}\;ds .
$$

The integral can be evaluated by substituting $2s=\sinh t$ or $2s=\tan\theta$; the lecture only asks for the integral. The point is that the arc length formula **turns a geometric question into a definite integral**.

## Example 2: the unit circle and arccos

The upper half of the unit circle $x^2+y^2=1$ can be parametrized by

$$
\gamma(s)=\big(s,\sqrt{1-s^2}\big),
\qquad s\in[-1,1].
$$

Here $f(s)=s$ and $g(s)=\sqrt{1-s^2}$. Differentiating,

$$
f'(s)=1,
\qquad
g'(s)=\frac{1}{2\sqrt{1-s^2}}\cdot(-2s)=-\frac{s}{\sqrt{1-s^2}} .
$$

Hence

$$
f'(s)^2+g'(s)^2
=1+\frac{s^2}{1-s^2}
=\frac{1-s^2+s^2}{1-s^2}
=\frac{1}{1-s^2} .
$$

So the arc length element of the circle is $\dfrac{ds}{\sqrt{1-s^2}}$.

Take the point on the circle with horizontal coordinate $x$ and walk along the circle to $(1,0)$; call the arc length $\theta$. Since $s$ is the horizontal coordinate, $s$ runs from $x$ to $1$:

$$
\theta=\int_x^1\frac{ds}{\sqrt{1-s^2}} .
$$

Geometrically $\theta$ is the central angle subtended by this arc, and the horizontal coordinate is $x=\cos\theta$. Hence $\theta=\arccos x$, giving

$$
\boxed{\ \arccos x=\int_x^1\frac{ds}{\sqrt{1-s^2}}\ }
$$

The formula is not memorized; it follows from "angle equals arc length" combined with the arc length formula.

### The derivative of arccos comes for free

The variable is in the lower limit. Rewrite using additivity:

$$
\int_x^1\frac{ds}{\sqrt{1-s^2}}
=
\int_0^1\frac{ds}{\sqrt{1-s^2}}
-
\int_0^x\frac{ds}{\sqrt{1-s^2}} .
$$

The first term is constant, with derivative zero; the second has derivative equal to the integrand at $x$ by the fundamental theorem. Therefore

$$
\frac{d}{dx}\arccos x
=0-\frac{1}{\sqrt{1-x^2}}
=-\frac{1}{\sqrt{1-x^2}} .
$$

The lecture emphasizes the sign: **when the variable sits in the lower limit, a minus sign appears**, because $\int_x^1=-\int_1^x$.

## Pointwise convergence

Let $I$ be an interval, $(f_n)$ a sequence of functions on $I$, and $f$ a function on $I$. Say $f_n\to f$ **pointwise** if for every fixed $x\in I$,

$$
\lim_{n\to\infty}f_n(x)=f(x).
$$

In $\varepsilon$ language: for every $x\in I$ and every $\varepsilon>0$ there is $N$ such that $n>N$ implies $|f_n(x)-f(x)|<\varepsilon$. The $N$ may depend on $x$.

**Example 1.** On $[0,1]$ let $f_n(x)=x^n$ and

$$
f(x)=
\begin{cases}
0, & 0\le x<1,\\
1, & x=1 .
\end{cases}
$$

For fixed $x<1$, $x^n\to0$; for $x=1$, $1^n=1$. So $f_n\to f$ pointwise. Every $f_n$ is continuous, but the limit $f$ is not — **pointwise convergence does not preserve continuity**.

**Example 2.** On $\mathbb R$ let

$$
f_n(x)=\sum_{k=0}^{n}\frac{x^k}{k!} .
$$

For each fixed $x$ these are partial sums of the exponential series, converging to $e^x$. So $f_n\to e^x$ pointwise.

## Uniform convergence

Say $f_n\to f$ **uniformly** if for every $\varepsilon>0$ there is $N$ such that

$$
n>N
\implies
|f_n(x)-f(x)|<\varepsilon
\quad\text{for all }x\in I .
$$

The only change: **the same $N$ must work for every $x$**.

**Lemma.** Uniform convergence implies pointwise convergence.

**Proof.** Given $x$ and $\varepsilon$, take the $N$ from the uniform definition. It works for all $x$, in particular for this one, so $n>N$ gives $|f_n(x)-f(x)|<\varepsilon$. That is pointwise convergence (with the extra information that $N$ does not depend on $x$). $\square$

The converse fails; the next example shows it.

## Counterexample: $x^n$ on $[0,1]$

![Figure](/images/uniform-convergence-rich-en.svg)

*Figure：Pointwise vs. uniform quantifiers, and why xⁿ cannot enter the ε-band。*

As above, $f_n(x)=x^n\to f$ pointwise, where $f(1)=1$ and $f(x)=0$ for $x<1$. But the convergence is **not uniform**.

**Proof.** Each $f_n$ is continuous, with $f_n(0)=0$ and $f_n(1)=1$. By the intermediate value theorem there is $x_n\in(0,1)$ with

$$
f_n(x_n)=x_n^n=\frac12
$$

(explicitly $x_n=(1/2)^{1/n}$, and $x_n\to1$). Since $x_n<1$, $f(x_n)=0$, so

$$
|f_n(x_n)-f(x_n)|=\frac12 .
$$

Take $\varepsilon=\frac14$. If convergence were uniform, some $N$ would make $|f_n(x)-f(x)|<\frac14$ for **all** $x$ whenever $n>N$. But at $x=x_n$ the gap is $\frac12>\frac14$, a contradiction. $\square$

Geometrically, every $f_n$ climbs from $0$ to $1$ and must pass through $\frac12$; that "half-height point" moves right toward $1$ as $n$ grows. The limit function is $0$ there, so the error stays at $\frac12$ no matter how large $n$ is. **Pointwise convergence only promises that each fixed point eventually becomes accurate; it does not promise that the whole interval becomes accurate at once.**

This also explains why the limit of $x^n$ is discontinuous: uniformity is exactly what would let continuity pass to the limit.

## The Weierstrass M-test

**Theorem.** Let $(f_n)$ be a sequence of functions on an interval $I$, and suppose there are nonnegative numbers $M_n$ with

$$
|f_n(x)|\le M_n
\quad\text{for all }x\in I,
$$

and $\sum_{n=0}^\infty M_n<\infty$. Then $\sum_{n=0}^\infty f_n(x)$ converges uniformly on $I$.

**Proof.** Let

$$
S_n(x)=\sum_{k=0}^{n}f_k(x).
$$

For $n>m$,

$$
S_n(x)-S_m(x)=\sum_{k=m+1}^{n}f_k(x),
$$

so by the triangle inequality and the hypothesis,

$$
|S_n(x)-S_m(x)|
\le\sum_{k=m+1}^{n}|f_k(x)|
\le\sum_{k=m+1}^{n}M_k
\le\sum_{k=m+1}^{\infty}M_k .
$$

Since $\sum M_k$ converges, for every $\varepsilon>0$ there is $N$ such that $m\ge N$ implies the tail is below $\varepsilon$.

**Step 1: pointwise convergence.** For each fixed $x$, the inequality says $(S_n(x))$ is Cauchy, hence convergent; call the limit $S(x)$. This defines a function $S$.

**Step 2: upgrade to uniformity.** In

$$
|S_n(x)-S_m(x)|\le\sum_{k=m+1}^{\infty}M_k,
$$

let $n\to\infty$ (the left side tends to $|S(x)-S_m(x)|$):

$$
|S(x)-S_m(x)|\le\sum_{k=m+1}^{\infty}M_k<\varepsilon
\qquad(m\ge N).
$$

The right side is independent of $x$ and the inequality holds for **all** $x$. That is precisely uniform convergence of $S_m\to S$. $\square$

The last step is the heart: **the tail bound carries no $x$**. That is the purpose of the "$M$" — a sequence of numbers, independent of $x$, controls the tails of a whole family of functions.

### Application: the exponential series

On $[-L,L]$ consider

$$
f_n(x)=\frac{x^n}{n!} .
$$

Take

$$
M_n=\frac{L^n}{n!} .
$$

For $|x|\le L$,

$$
|f_n(x)|=\frac{|x|^n}{n!}\le\frac{L^n}{n!}=M_n .
$$

The series $\sum L^n/n!$ converges (ratio test: consecutive ratios are $L/(n+1)\to0$). By the M-test,

$$
\sum_{n=0}^{\infty}\frac{x^n}{n!}
$$

converges uniformly on $[-L,L]$ to $e^x$. Since $L$ is arbitrary, it converges uniformly on **every bounded interval** — but not on all of $\mathbb R$, for reasons the next lecture makes precise.

## Power series and uniform convergence on compact subintervals

Let

$$
\sum_{n=0}^{\infty}a_nx^n
$$

be a power series and set

$$
M=\limsup_{n\to\infty}|a_n|^{1/n},
\qquad
R=\frac1M,
$$

with the conventions $M=0\Rightarrow R=\infty$ and $M=\infty\Rightarrow R=0$. The number $R$ is the **radius of convergence**.

Known facts:

- the series converges absolutely for $|x|<R$;
- it diverges for $|x|>R$;
- at $|x|=R$ each endpoint must be checked separately; there is no general rule.

**Theorem.** If $0<L<R$, then $\sum a_nx^n$ converges uniformly on $[-L,L]$.

**Proof.** For $|x|\le L$,

$$
|a_nx^n|\le|a_n|L^n .
$$

Since $M=\limsup|a_n|^{1/n}=1/R$,

$$
\limsup_{n\to\infty}\big(|a_n|L^n\big)^{1/n}
=ML=\frac{L}{R}<1 .
$$

The root test gives convergence of $\sum|a_n|L^n$. With $M_n=|a_n|L^n$, the M-test yields uniform convergence on $[-L,L]$. $\square$

The hypothesis $L<R$ is strict. At the endpoints $\pm R$ convergence may or may not hold, and uniformity generally fails. For instance $\sum x^n$ has radius $1$; it converges uniformly on $[-L,L]$ for every $L<1$, but not on $[0,1)$ — the same phenomenon as the $x^n$ counterexample.

The lecture notes that uniformity matters because it permits **term-by-term integration and differentiation**: if $f_n\to f$ uniformly, then

$$
\lim_{n\to\infty}\int_a^b f_n=\int_a^b f,
$$

and under suitable extra hypotheses also $\lim f_n'=f'$. That is the subject of the next lecture.

## What this lecture establishes

- Arc length is $\int_a^b\sqrt{f'^2+g'^2}\,ds$, justified by cutting the curve, using chords, and passing to the limit; the rigorous step needs uniform continuity of the derivatives.
- The unit circle gives $\arccos x=\int_x^1\frac{ds}{\sqrt{1-s^2}}$, and the fundamental theorem gives $\arccos'(x)=-\frac{1}{\sqrt{1-x^2}}$.
- Pointwise convergence: each fixed $x$ converges, with $N$ allowed to depend on $x$.
- Uniform convergence: one $N$ for all $x$; it implies pointwise convergence.
- $x^n$ on $[0,1]$ converges pointwise to a discontinuous function but not uniformly; the half-height points $x_n=(1/2)^{1/n}$ keep the error at $1/2$.
- Weierstrass M-test: if $|f_n|\le M_n$ and $\sum M_n<\infty$, then $\sum f_n$ converges uniformly.
- $\sum x^n/n!$ converges uniformly on every $[-L,L]$; a power series converges uniformly on $[-L,L]$ when $L<R$, with endpoints needing separate treatment.

## Comprehension check

**1. Explain why the arc length formula is reasonable, and state what is needed to turn "sum of chord lengths" into an integral.**

Reference answer: For a partition $a=s_0<\cdots<s_n=b$, the $i$-th piece is approximated by its chord:

$$
|\gamma(s_i)-\gamma(s_{i-1})|=\sqrt{f'(\xi_i)^2+g'(\eta_i)^2}\,\Delta s_i,
$$

where $\xi_i,\eta_i$ come from the mean value theorem and lie in the same small piece. Summing gives a Riemann sum. For it to converge to $\int\sqrt{f'^2+g'^2}\,ds$, the factor $\sqrt{f'^2+g'^2}$ must vary by a uniformly small amount across each piece, i.e. it must be uniformly continuous on $[a,b]$; this holds because $f'$ and $g'$ are continuous on a compact interval. Without compactness, convergence of the chord sums is not guaranteed.

**2. Compute the arc length element of the upper unit circle and derive the integral representation and derivative of arccos.**

Reference answer: With $f'=1$ and $g'=-s/\sqrt{1-s^2}$,

$$
f'^2+g'^2=1+\frac{s^2}{1-s^2}=\frac{1}{1-s^2},
$$

so the element is $ds/\sqrt{1-s^2}$. The arc from horizontal coordinate $x$ to $1$ has length $\theta=\int_x^1 ds/\sqrt{1-s^2}$; geometrically $x=\cos\theta$, hence $\theta=\arccos x$. For the derivative, write the integral as $\int_0^1-\int_0^x$: the first term is constant, the second differentiates to $1/\sqrt{1-x^2}$ by the fundamental theorem, so $\arccos'(x)=-1/\sqrt{1-x^2}$. The minus sign comes from the variable in the lower limit.

**3. Prove that $f_n(x)=x^n$ converges pointwise but not uniformly on $[0,1]$.**

Reference answer: Pointwise, $x^n\to0$ for fixed $x<1$ and $x^n=1$ for $x=1$, so the limit is $f(x)=0$ for $x<1$ and $f(1)=1$. For non-uniformity, each $f_n$ is continuous with $f_n(0)=0<\frac12<1=f_n(1)$, so the intermediate value theorem gives $x_n\in(0,1)$ with $x_n^n=\frac12$. Then $f(x_n)=0$, so $|f_n(x_n)-f(x_n)|=\frac12$. Taking $\varepsilon=\frac14$, after any $N$ such an $x_n$ still violates the uniform bound, so no single $N$ works. Intuitively, the half-height point $x_n=(1/2)^{1/n}$ tends to $1$ and the error stays at $\frac12$.

**4. Prove that uniform convergence implies pointwise convergence, and contrast the two $N$'s.**

Reference answer: Given $x\in I$ and $\varepsilon>0$, take $N$ from the uniform definition; it depends only on $\varepsilon$ and works for every $x$, hence for this $x$, so $n>N$ gives $|f_n(x)-f(x)|<\varepsilon$. The difference is that uniform convergence has $N=N(\varepsilon)$, while pointwise convergence allows $N=N(\varepsilon,x)$. In the $x^n$ example, $x^n<\varepsilon$ requires $n>\log\varepsilon/\log x$, and the required $n$ blows up as $x\to1$, so no uniform $N$ exists.

**5. State and prove the Weierstrass M-test.**

Reference answer: Suppose $|f_n(x)|\le M_n$ for all $x\in I$ and $\sum M_n<\infty$. With $S_n=\sum_{k=0}^n f_k$, for $n>m$,

$$
|S_n(x)-S_m(x)|\le\sum_{k=m+1}^{n}|f_k(x)|\le\sum_{k=m+1}^{n}M_k\le\sum_{k=m+1}^{\infty}M_k .
$$

Since $\sum M_k$ converges, for every $\varepsilon>0$ there is $N$ with tail below $\varepsilon$ once $m\ge N$. For each fixed $x$, $(S_n(x))$ is Cauchy, hence converges; call the limit $S(x)$. Letting $n\to\infty$ in the inequality gives $|S(x)-S_m(x)|\le\sum_{k=m+1}^\infty M_k<\varepsilon$ for all $x$, with a right side independent of $x$; this is uniform convergence.

**6. Use the M-test to show $\sum x^n/n!$ converges uniformly on $[-L,L]$, and explain uniform convergence of a power series on $[-L,L]$ with $L<R$.**

Reference answer: On $[-L,L]$, $|x^n/n!|\le L^n/n!$, and $\sum L^n/n!$ converges (ratio test, ratios $L/(n+1)\to0$), so the M-test applies. For $\sum a_nx^n$ with $L<R=1/M$ and $M=\limsup|a_n|^{1/n}$, we have $|a_nx^n|\le|a_n|L^n$ and

$$
\limsup(|a_n|L^n)^{1/n}=ML=L/R<1,
$$

so the root test gives convergence of $\sum|a_n|L^n$, and the M-test gives uniformity. The inequality $L<R$ must be strict: at the endpoints the series may converge but uniformity generally fails, as with $\sum x^n$ on $[0,1)$.

## Relation to neighbouring lectures

Arc length applies the integral to geometry, while the arccos representation shows another use of the fundamental theorem: define a function geometrically, then differentiate to identify its derivative. This is the reverse of "state a formula, then verify it", and it is the more common construction in analysis.

The second half prepares the next lecture. With the M-test, power series converge uniformly on compact subintervals of the interval of convergence; uniform convergence is precisely the hypothesis needed for **term-by-term integration and differentiation**. The next lecture proves that uniformly convergent sequences may be integrated term by term, and that derivatives may also be exchanged under an additional uniform convergence hypothesis on the derivatives. Those results turn the technical conditions here into working rules.
