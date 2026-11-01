---
slug: 22-uniform-limits-integrals
title: "Uniform Limits: Preserving Continuity, Completeness, and Swapping Integrals"
summary: "We prove that a uniform limit of continuous functions is continuous, recast uniform convergence as convergence in the sup metric, show that C([a,b]) is complete, and use upper and lower sums to prove that integration commutes with uniform limits."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, uniform-convergence, continuity, integration, metric-spaces]
sources:
  - kind: video
    title: "Lecture 21: Integrals and Derivatives under Uniform Convergence"
    url: https://www.youtube.com/watch?v=_4m8hYQ3cR0
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Two notions of convergence, recalled

On an interval $I$ we have a sequence of functions $f_n$ and a function $f$.

- **Pointwise convergence**: for each fixed $x$, the numerical sequence $f_n(x)$ converges to $f(x)$.
- **Uniform convergence**: for every $\varepsilon>0$ there is $N$ such that for $n\ge N$,

$$
|f_n(x)-f(x)|<\varepsilon
\quad\text{for all }x\in I .
$$

The only difference is that last clause: pointwise convergence lets $N$ depend on $x$, uniform convergence does not.

The example used repeatedly in the course is $f_n(x)=x^n$ on $[0,1]$. It converges pointwise to

$$
f(x)=
\begin{cases}
0,&0\le x<1,\\
1,&x=1.
\end{cases}
$$

Every $f_n$ is continuous, yet $f$ jumps at $1$. Why is the convergence not uniform? By the intermediate value theorem, for each $n$ there is $x_n$ with $x_n^n=\tfrac12$, so

$$
|f_n(x_n)-f(x_n)|=\tfrac12 .
$$

This error does not shrink with $n$; hence $\sup_x|f_n(x)-f(x)|\ge\tfrac12$ and cannot tend to $0$.

**Pointwise convergence does not preserve continuity; uniform convergence does.**

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review of pointwise and uniform convergence; the $x^n$ example |
| 6:29 | Theorem: a uniform limit of continuous functions is continuous |
| 9:07 | Proof by splitting into three $\varepsilon/3$ pieces |
| 16:24 | Example: the exponential series converges uniformly on bounded intervals, hence is continuous |
| 19:02 | Uniform convergence as convergence in the sup metric |
| 25:36 | Theorem: $C([a,b])$ is complete in the sup metric |
| 28:31 | First construct a candidate limit $f$ pointwise |
| 35:11 | Then upgrade pointwise convergence to uniform convergence |
| 40:30 | Theorem: integration commutes with uniform limits |
| 46:46 | Proof with upper and lower sums and $\varepsilon/3(b-a)$ |
| 1:13:28 | Application to term-by-term integration of power series |
| 1:18:36 | Preview: differentiation and uniform limits |

## Theorem: uniform limits preserve continuity

**Theorem.** Let $f_n$ be continuous on an interval $I$ and suppose $f_n\to f$ uniformly. Then $f$ is continuous on $I$.

### The full proof

Fix $x_0\in I$; we show $f$ is continuous at $x_0$. Let $\varepsilon>0$.

**Step 1: freeze an index using uniform convergence.** Since $f_n\to f$ uniformly, there is $N$ such that for every $n\ge N$ and **every** $x$,

$$
|f_n(x)-f(x)|<\frac{\varepsilon}{3}.
$$

Take $n=N$:

$$
|f_N(x)-f(x)|<\frac{\varepsilon}{3}
\quad\text{for all }x\in I .
$$

This lets us replace $f$ by the single fixed function $f_N$, at a cost that is uniformly small over all points.

**Step 2: use continuity of $f_N$ to find $\delta$.** Since $f_N$ is continuous at $x_0$, there is $\delta>0$ such that

$$
|x-x_0|<\delta
\Rightarrow
|f_N(x)-f_N(x_0)|<\frac{\varepsilon}{3}.
$$

**Step 3: triangle inequality.** For $|x-x_0|<\delta$, insert $f_N(x)$ and $f_N(x_0)$:

$$
\begin{aligned}
|f(x)-f(x_0)|
&\le |f(x)-f_N(x)| \\
&\quad + |f_N(x)-f_N(x_0)| \\
&\quad + |f_N(x_0)-f(x_0)| \\
&< \frac{\varepsilon}{3}+\frac{\varepsilon}{3}+\frac{\varepsilon}{3}
=\varepsilon .
\end{aligned}
$$

So $f$ is continuous at $x_0$. Since $x_0$ was arbitrary, $f$ is continuous on $I$. $\square$

Note where each piece comes from. The first and third terms come from **uniform convergence**: same point, same index $N$, error controlled for all $x$ at once. The middle term comes from **continuity of $f_N$**: same function, two nearby points. Pointwise convergence cannot supply the first and third terms uniformly, because there the index $N$ would grow with $x$.

### An immediate corollary

Let

$$
E_n(x)=\sum_{k=0}^{n}\frac{x^k}{k!},
\qquad
E(x)=\sum_{k=0}^{\infty}\frac{x^k}{k!}.
$$

Each $E_n$ is a polynomial, hence continuous. By the Weierstrass $M$-test (proved in the previous lecture), on any fixed interval $[-L,L]$ the series is dominated by $\sum L^k/k!<\infty$, so $E_n\to E$ uniformly on $[-L,L]$. The theorem then gives continuity of $E$ on every $[-L,L]$, hence on all of $\mathbb R$.

Watch the scope: the convergence is not uniform on $\mathbb R$, only on each bounded interval. This is usually called locally uniform convergence.

## Uniform convergence is convergence in the sup metric

Let $C([a,b])$ be the set of continuous functions on a closed interval, with

$$
d(f,g)=\max_{x\in[a,b]}|f(x)-g(x)| .
$$

The maximum exists: $f-g$ is continuous, so is $|f-g|$, and the extreme value theorem gives a maximum on the compact interval.

**Proposition.** $f_n\to f$ uniformly if and only if $d(f_n,f)\to0$.

**Proof.** Both directions just rewrite the definitions.

If $f_n\to f$ uniformly: given $\varepsilon>0$, there is $N$ such that for $n\ge N$, $|f_n(x)-f(x)|<\varepsilon$ for all $x$. This single bound is valid for every $x$, so taking the supremum gives $d(f_n,f)\le\varepsilon$, hence $d(f_n,f)\to0$.

Conversely, if $d(f_n,f)\to0$: given $\varepsilon>0$, choose $N$ with $d(f_n,f)<\varepsilon$ for $n\ge N$. Since a value at one point never exceeds the maximum,

$$
|f_n(x)-f(x)|\le d(f_n,f)<\varepsilon
\quad\text{for all }x,
$$

which is exactly uniform convergence. $\square$

This rewriting turns a statement about sequences of functions into a statement about sequences of points in a metric space. All the metric machinery — Cauchy sequences, completeness, contractions — becomes available. That is not a notational convenience; it is the doorway used later to solve differential equations.

## $C([a,b])$ is complete

**Theorem.** The metric space $\bigl(C([a,b]),d\bigr)$ is Cauchy complete: every Cauchy sequence converges to a function in the space.

Let $(f_n)$ be Cauchy. Two things must be done: build a candidate limit $f$, then show it lies in the space and that convergence holds.

### Step 1: build the limit pointwise

Fix $x\in[a,b]$. Since

$$
|f_n(x)-f_m(x)|
\le \max_{z\in[a,b]}|f_n(z)-f_m(z)|
=d(f_n,f_m),
$$

the sequence of real numbers $(f_n(x))$ is Cauchy. The reals are complete, so it converges. Define

$$
f(x)=\lim_{n\to\infty}f_n(x).
$$

Each $x$ gives exactly one real number, so $f$ is a function. At this stage only **pointwise** convergence is known; continuity of $f$ is not yet established.

### Step 2: upgrade pointwise to uniform

Let $\varepsilon>0$. Since $(f_n)$ is Cauchy in the metric, there is $N$ such that for $n,m\ge N$,

$$
d(f_n,f_m)\le\frac{\varepsilon}{2}.
$$

Hence for every $x$,

$$
|f_n(x)-f_m(x)|\le\frac{\varepsilon}{2}.
$$

Fix $n\ge N$ and let $m\to\infty$. The left side tends to $|f_n(x)-f(x)|$ and the right side is constant, so

$$
|f_n(x)-f(x)|\le\frac{\varepsilon}{2}
\quad\text{for all }x .
$$

Only "at most $\varepsilon/2$" survives, because limits preserve non-strict inequalities. Taking the supremum over $x$,

$$
\sup_{x}|f_n(x)-f(x)|\le\frac{\varepsilon}{2}<\varepsilon .
$$

Here one must use $\sup$, not $\max$: continuity of $f$ is not yet known, so the extreme value theorem does not apply and the maximum might not be attained. Once continuity is proved, $\sup=\max$.

Thus $f_n\to f$ uniformly, i.e. $d(f_n,f)\to0$.

### Step 3: the limit stays in the space

Each $f_n$ is continuous and $f_n\to f$ uniformly, so by the first theorem of this lecture, $f$ is continuous. Hence $f\in C([a,b])$, and Step 2 gives $f_n\to f$ in the metric $d$. $\square$

The division of labour is worth remembering: **completeness is used only in Step 1** (completeness of the reals), **uniform convergence is established in Step 2**, and **closure (continuity) is supplied in Step 3**. Each step handles one thing.

## Theorem: integration commutes with uniform limits

Let $f_n$ be integrable on $[a,b]$ and $f_n\to f$ uniformly. The theorem asserts:

1. $f$ is integrable;
2. $\displaystyle\lim_{n\to\infty}\int_a^b f_n=\int_a^b f$; in particular the limit on the left exists.

Only integrability of $f_n$ is assumed, not continuity. The limit $f$ may be discontinuous (as with $x^n$), so the conclusion cannot be smuggled in through "continuous implies integrable".

### Idea of the proof

The Riemann criterion says: for every $\varepsilon>0$ there is a partition $P$ with

$$
U(f,P)-L(f,P)<\varepsilon ,
$$

where $U,L$ are the upper and lower sums. The plan is to squeeze the upper and lower sums of $f$ between those of $f_N$, with an error of $\pm\varepsilon/3$, and then choose for $f_N$ a partition whose upper and lower sums are close.

### Estimating the upper and lower sums

Let $P$ have division points $x_0<\cdots<x_m$, with subintervals $I_i=[x_{i-1},x_i]$ of length $\Delta x_i$. Write

$$
M_i(f)=\sup_{I_i}f,
\qquad
m_i(f)=\inf_{I_i}f .
$$

Because $f_n\to f$ uniformly, choose $n$ large enough that

$$
|f_n(x)-f(x)|<\frac{\varepsilon}{3(b-a)}
\quad\text{for all }x .
$$

Fix this $n$. For every $x$,

$$
f(x)\le f_n(x)+|f(x)-f_n(x)|<f_n(x)+\frac{\varepsilon}{3(b-a)}.
$$

Taking the supremum over $I_i$,

$$
M_i(f)\le M_i(f_n)+\frac{\varepsilon}{3(b-a)}.
$$

Likewise, from $f(x)\ge f_n(x)-|f(x)-f_n(x)|$, taking the infimum gives

$$
m_i(f)\ge m_i(f_n)-\frac{\varepsilon}{3(b-a)}.
$$

Multiply by $\Delta x_i$ and sum over $i$. Since $\sum_i\Delta x_i=b-a$, the constant terms cancel the denominator:

$$
L(f_n,P)-\frac{\varepsilon}{3}
\le L(f,P)
\le U(f,P)
\le U(f_n,P)+\frac{\varepsilon}{3}.
$$

This holds for **every** partition $P$ and uses only uniform convergence.

### Choose a partition; get integrability

With that $n$ fixed, $f_n$ is integrable, so there is a partition $P$ with

$$
U(f_n,P)-L(f_n,P)<\frac{\varepsilon}{3}.
$$

For this $P$,

$$
\begin{aligned}
U(f,P)-L(f,P)
&\le \Bigl(U(f_n,P)+\frac{\varepsilon}{3}\Bigr)
-\Bigl(L(f_n,P)-\frac{\varepsilon}{3}\Bigr)\\
&=\bigl(U(f_n,P)-L(f_n,P)\bigr)+\frac{2\varepsilon}{3}\\
&<\frac{\varepsilon}{3}+\frac{2\varepsilon}{3}=\varepsilon .
\end{aligned}
$$

By the integrability criterion, $f$ is integrable.

### Convergence of the integrals

For any partition $P$, the integral is trapped between the sums:

$$
L(f,P)\le\int_a^b f\le U(f,P).
$$

Take the partition $P$ for which $U(f_N,P)-L(f_N,P)<\varepsilon/3$. The squeezing estimates give

$$
L(f_N,P)-\frac{\varepsilon}{3}\le\int_a^b f\le U(f_N,P)+\frac{\varepsilon}{3},
$$

while also

$$
L(f_N,P)\le\int_a^b f_N\le U(f_N,P).
$$

So both $\int f$ and $\int f_N$ lie in

$$
\Bigl[L(f_N,P)-\frac{\varepsilon}{3},\;U(f_N,P)+\frac{\varepsilon}{3}\Bigr],
$$

an interval of length $\bigl(U(f_N,P)-L(f_N,P)\bigr)+\tfrac{2\varepsilon}{3}<\varepsilon$. Therefore

$$
\left|\int_a^b f-\int_a^b f_N\right|<\varepsilon .
$$

Since $\varepsilon>0$ was arbitrary, $\int f_n\to\int f$. $\square$

At the end of the lecture a student asked about strict versus non-strict inequalities. The lecturer's answer: it does not matter, because $\varepsilon$ is arbitrary; choosing constants like $\varepsilon/4$ produces strict inequalities whenever desired.

## Integrating a power series term by term

Return to $E_n(x)=\sum_{k=0}^n x^k/k!$, which converges uniformly to $E$ on $[a,b]$. Each $E_n$ is a polynomial, so

$$
\int_a^b E_n(x)\,dx
=\sum_{k=0}^{n}\int_a^b\frac{x^k}{k!}\,dx .
$$

By the interchange theorem the left side tends to $\int_a^b E$, hence

$$
\int_a^b E(x)\,dx
=\sum_{k=0}^{\infty}\int_a^b\frac{x^k}{k!}\,dx .
$$

Each term is computed by finding an antiderivative. Since

$$
\frac{d}{dx}\frac{x^{k+1}}{(k+1)!}
=\frac{(k+1)x^{k}}{(k+1)!}
=\frac{x^k}{k!},
$$

we get

$$
\int_a^b \frac{x^k}{k!}\,dx
=\frac{b^{k+1}-a^{k+1}}{(k+1)!}.
$$

So uniform convergence licenses swapping an infinite sum with an integral. Finite sums may be swapped freely; infinite sums may not — uniform convergence is the licence.

## What this lecture establishes

- Uniform limits of continuous functions are continuous; pointwise limits need not be ($x^n$ is the counterexample).
- The proof freezes one $f_N$ and uses a three-part $\varepsilon/3$ estimate.
- Uniform convergence is convergence in the sup metric; the $\sup$ versus $\max$ distinction tracks whether the limit is known to be continuous.
- $C([a,b])$ is Cauchy complete in the sup metric.
- Uniform limits of integrable functions are integrable, and integration commutes with the limit.
- Power series may be integrated term by term inside the radius of convergence; term-by-term differentiation is postponed to the next lecture.

## Comprehension check

**1. Use $f_n(x)=x^n$ to explain why pointwise convergence does not preserve continuity. Write down the points that make uniform convergence fail.**

Reference answer: The pointwise limit is $f(0\le x<1)=0$, $f(1)=1$, which is discontinuous at $1$, although every $f_n$ is continuous. Take $x_n=2^{-1/n}\in(0,1)$; then $f_n(x_n)=1/2$ while $f(x_n)=0$, so $|f_n(x_n)-f(x_n)|=1/2$. Hence $\sup_x|f_n(x)-f(x)|\ge1/2$ for every $n$, which does not tend to $0$; uniform convergence fails.

**2. Prove that $f_n\to f$ uniformly if and only if $d(f_n,f)\to0$, and identify where the proof uses "for all $x$ simultaneously".**

Reference answer: Both directions merely rewrite the definition. If convergence is uniform, then for a given $\varepsilon$ there is $N$ such that for $n\ge N$, $|f_n(x)-f(x)|<\varepsilon$ holds for all $x$ at once; because one bound works for every $x$, taking the supremum gives $d(f_n,f)\le\varepsilon$. Conversely, if $d(f_n,f)<\varepsilon$, then since a pointwise value never exceeds the maximum, $|f_n(x)-f(x)|\le d(f_n,f)<\varepsilon$ for all $x$ simultaneously. The key is exactly that one $\varepsilon$-bound holds for all $x$; under pointwise convergence the bound depends on $x$, and no supremum can be taken.

**3. In the completeness proof we already know $f_n(x)\to f(x)$ pointwise. Why must we still prove uniform convergence?**

Reference answer: Pointwise convergence only controls each point separately. It does not ensure that $f$ is continuous, nor that $(f_n)$ converges in the metric $d$. Completeness requires convergence in **that metric** to a point of the space, and $d$ measures the supremum of the error over all points. Only upgrading to $\sup_x|f_n-f|\to0$ gives $d(f_n,f)\to0$; and only applying "uniform limits preserve continuity" once more confirms $f\in C([a,b])$, i.e. that the limit has not left the space.

**4. In the integration theorem, what roles do the $3$ and the $(b-a)$ in $\varepsilon/(3(b-a))$ play?**

Reference answer: $(b-a)$ cancels the total length produced by summing: a constant error of $\varepsilon/(3(b-a))$ integrated over an interval of length $b-a$ totals $\varepsilon/3$, so each of the upper and lower sums shifts by $\varepsilon/3$. The $3$ splits the total error budget: the two shifts between $f$ and $f_n$ cost $2\varepsilon/3$, leaving $\varepsilon/3$ for the gap $U(f_n,P)-L(f_n,P)$ supplied by integrability, for a total below $\varepsilon$. Any constants with the same total work, e.g. quarters.

**5. The theorem assumes only that $f_n$ is integrable, not continuous. Why can we not simply say "the limit of continuous functions is integrable"?**

Reference answer: Because a uniform limit of continuous functions is continuous, but here the $f_n$ need not be continuous; and even if they were, the pointwise limit can be discontinuous ($x^n$), so the route through continuity is not always available. The conclusion that $f$ is integrable must be proved directly from the Riemann criterion: construct, for a given $\varepsilon$, a partition $P$ with $U(f,P)-L(f,P)<\varepsilon$. The proof squeezes the upper and lower sums of $f$ between those of $f_N$, which is exactly how it avoids continuity and uses only integrability plus uniform convergence.

## Relation to neighbouring lectures

The previous lecture established the Weierstrass $M$-test and the pointwise/uniform distinction; this lecture turns them into a toolkit: preservation of continuity, the metric viewpoint, completeness, and interchange with integrals. The next lecture handles the remaining piece — **whether differentiation commutes with limits** — which needs a stronger hypothesis (uniform convergence of the derivatives). With it, power series can be differentiated term by term arbitrarily often, and the exponential satisfies $E'=E$.

Further on, the completeness of $C([a,b])$ in the sup metric is used directly to prove the Picard–Lindelöf theorem, by writing the solution of a differential equation as a fixed point of an integral operator. The abstract three-step proof in this lecture is the foundation of that line.
