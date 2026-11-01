---
slug: 09-limsup-continuity
title: "Limsup, Radius of Convergence and Continuous Functions"
summary: "Limits superior repair the root test, shrinking the convergence set of a power series to a single interval centred at 0. The exponential function is then defined by its power series and its rational values are matched to e^m. Finally, epsilon-delta continuity is defined, two basic examples and five algebraic rules are proved, and polynomials and rational functions are shown continuous."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, limsup, power-series, continuity, exponential]
sources:
  - kind: video
    title: "Lecture 9: Limsup and Liminf; Power Series; Continuous Functions; Exponential Function"
    url: https://www.youtube.com/watch?v=MjRb8R33Ucc
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## A gap to close

The root test of the previous lecture required that $\sqrt[n]{|a_n|}$ **have a limit**. If it does not — for instance if it oscillates between several values — the test simply fails. This lecture replaces the limit by the limit superior, repairs the test, and applies it immediately to power series.

The second half turns to functions: the exponential is defined by a power series, and continuity is introduced through an $\varepsilon$-$\delta$ definition. The two halves eventually meet — continuity is exactly what is needed to extend "the exponential on the rationals" to "the exponential on the reals".

## Limsup and liminf

Let $(a_n)$ be bounded above and set
$$
b_n=\sup\{a_k : k\ge n\}=\sup\{a_n,a_{n+1},a_{n+2},\dots\}.
$$

Since $\{a_k:k\ge n+1\}\subseteq\{a_k:k\ge n\}$ and a supremum over a smaller set cannot be larger,
$$
b_{n+1}\le b_n .
$$
So $(b_n)$ decreases. If it is bounded below, monotone convergence gives a limit, and one defines
$$
\limsup_{n\to\infty}a_n=\inf_{n}b_n .
$$
If $(a_n)$ is unbounded above, set $\limsup a_n=+\infty$.

Symmetrically, if $(a_n)$ is bounded below, let
$$
c_n=\inf\{a_k:k\ge n\},
$$
which increases, and define
$$
\liminf_{n\to\infty}a_n=\sup_{n}c_n .
$$

A key fact: **the limsup always exists** (in the extended real line), whether or not the sequence converges. When the limit exists,
$$
\liminf a_n=\lim a_n=\limsup a_n .
$$

Intuitively, the limsup is the smallest eventual upper bound: a sequence may exceed a value repeatedly, but if it eventually stays below that value, the value is not the limsup.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Tail suprema; monotonicity; definition of limsup and liminf |
| 3:55 | Power series recap and the exponential series |
| 11:49 | Radius of convergence: why convergence occupies one interval |
| 14:16 | Root test 2.0 (limsup version) and its proof |
| 21:08 | $R=1/\limsup|a_n|^{1/n}$ and the boundary cases |
| 37:23 | Defining the exponential by a power series |
| 43:35 | Defining $e=E(1)$; checking integer and rational powers |
| 54:58 | Continuity as the bridge from $\mathbb Q$ to $\mathbb R$ |
| 57:18 | The $\varepsilon$-$\delta$ definition |
| 59:57 | Constant functions and $f(x)=x$ are continuous |
| 1:03:48 | Five algebraic rules; polynomials and rational functions |
| 1:14:34 | The example $1/x$: $\delta$ depends on $x_0$ |

## Root test 2.0

**Theorem.** For any series $\sum d_n$, let
$$
d=\limsup_{n\to\infty}\sqrt[n]{|d_n|}.
$$
Then:

1. if $d<1$ the series converges absolutely;
2. if $d>1$ the series diverges;
3. if $d=1$ the test is inconclusive.

The only change from the previous lecture is the hypothesis: the $n$-th roots need not converge — only their limsup matters, and that always exists.

**Proof ($d<1$).** Choose $\bar d$ with $d<\bar d<1$. By the definition of limsup there is $N$ such that for $n\ge N$,
$$
\sup_{k\ge n}\sqrt[k]{|d_k|}\le\bar d,
$$
hence $\sqrt[k]{|d_k|}\le\bar d$ for every $k\ge N$, i.e.
$$
|d_k|\le\bar d^{\,k}.
$$
The right side is a geometric series with ratio $\bar d<1$, so by comparison $\sum|d_k|$ converges.

The point is that the definition of limsup itself provides "from some index on, every term is controlled by $\bar d$", with no limit required. That is exactly what makes it more useful than the limit.

**Proof ($d>1$).** Choose $\bar d$ with $1<\bar d<d$. Then infinitely many $n$ satisfy $\sqrt[n]{|d_n|}>\bar d$, i.e. $|d_n|>\bar d^{\,n}>1$. So the terms do not tend to zero (infinitely many have absolute value exceeding $1$), and the series diverges.

## Radius of convergence of a power series

For $\sum a_n x^n$, fix $x$ and set $d_n=a_n x^n$. Then
$$
\sqrt[n]{|d_n|}=\sqrt[n]{|a_n|}\,|x|,
$$
so
$$
\limsup_{n\to\infty}\sqrt[n]{|d_n|}=|x|\cdot\limsup_{n\to\infty}\sqrt[n]{|a_n|}=\frac{|x|}{R},
$$
where the **radius of convergence** is defined by
$$
R=\frac{1}{\limsup_{n\to\infty}\sqrt[n]{|a_n|}} .
$$

Conventions: if $\limsup|a_n|^{1/n}=0$ then $R=+\infty$; if $\limsup|a_n|^{1/n}=+\infty$ then $R=0$.

Applying root test 2.0 to $\sum a_nx^n$:

- $|x|/R<1$, i.e. $|x|<R$: **absolute convergence**;
- $|x|/R>1$, i.e. $|x|>R$: **divergence**;
- $|x|=R$: inconclusive; both endpoints must be checked separately.

**Theorem (convergence interval).** A power series converges on $(-R,R)$, diverges outside $(-R,R)$, and needs a separate check at $x=\pm R$.

This rules out something that is a priori conceivable but never happens: convergence at $x=5$, divergence at $x=10$, convergence again at $x=20$. The convergence set is always a symmetric interval about $0$, never a scattered or alternating pattern.

### Examples

- Geometric $\sum x^n$: $a_n=1$, $\limsup|a_n|^{1/n}=1$, so $R=1$; neither endpoint converges.
- Exponential $\sum x^n/n!$: the previous lecture used the ratio test to get convergence for all $x$, consistent with $R=\infty$ (since $n!$ grows so fast that $\sqrt[n]{1/n!}\to0$).

## The exponential function defined by a power series

There are two common definitions: the solution of $y'=y$ with $y(0)=1$, or a power series. This lecture takes the second.

**Definition.**
$$
E(x)=\sum_{n=0}^{\infty}\frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots
$$

This really is a function: the previous lecture proved absolute convergence for every $x$, so the radius is $\infty$ and the domain is all of $\mathbb R$.

### Basic properties

**$E(0)=1$.** At $x=0$ every term with $n\ge1$ vanishes, while $0^0=1$ by convention and $0!=1$.

**$E(x)>0$ for $x\ge0$.** Every term $\dfrac{x^n}{n!}\ge0$ and the first is $1$, so the sum is at least $1$.

**$E(x)>0$ for $x<0$ (borrowing from the next lecture).** The next lecture proves
$$
E(x+y)=E(x)E(y).
$$
Granting it, take $x<0$ so that $-x>0$. Then
$$
E(x)E(-x)=E(0)=1 .
$$
The right side is positive and $E(-x)$ is positive, hence $E(x)=\dfrac{1}{E(-x)}>0$. So $E(x)>0$ for every real $x$.

The lecture explicitly flags this as a loan to be repaid: it states what is needed and marks what is not yet proved. The pattern is worth noticing.

### Defining $e$ and integer powers

**Definition.** $e=E(1)$.

Now check that $E$ agrees with the usual powers of $e$. For positive integers, iterating the addition formula gives
$$
E(1)E(1)=E(2),\quad E(1)E(1)E(1)=E(3),\quad\dots
$$
so for $m\in\mathbb N$,
$$
e^m=\underbrace{e\cdot e\cdots e}_{m\text{ copies}}=E(m).
$$
For $m=0$, $e^0=1=E(0)$. For negative integers $m$, from
$$
E(m)E(-m)=E(0)=1
$$
we get
$$
E(m)=\frac{1}{E(-m)}=\frac{1}{e^{-m}}=e^{m}.
$$
So $e^m=E(m)$ for every integer $m$.

### Rational powers

Let $q=\dfrac{m}{n}$ with $m\in\mathbb Z$, $n\in\mathbb N$. We want
$$
e^{q}=E\!\left(\frac{m}{n}\right).
$$

Define $e^q$ as the unique $\alpha$ with
$$
\alpha>0,\qquad \alpha^n=e^{m}.
$$
Uniqueness comes from strict monotonicity of powers of positive numbers: if $\alpha_1,\alpha_2>0$ and $\alpha_1^n=\alpha_2^n$, then $\alpha_1=\alpha_2$.

Then check that this $\alpha$ really is $E(m/n)$. First, $E(m/n)>0$ as shown above. Second, applying the addition formula $n$ times,
$$
\left(E\!\left(\frac mn\right)\right)^{n}
=E\!\left(n\cdot\frac mn\right)
=E(m)=e^{m}.
$$
So $E(m/n)$ satisfies both defining properties of $e^q$, and uniqueness forces it to be $\alpha$:
$$
e^{q}=E(q)\qquad(q\in\mathbb Q).
$$

Note: the argument uses the existence of the positive $n$-th root, which completeness guarantees (a least-upper-bound construction) but which the course defers. Only uniqueness is used in the definition itself, so the reasoning is self-consistent.

## Continuity

To promote $E$ from $\mathbb Q$ to $\mathbb R$, continuity is exactly what is needed.

### Definition

Let $f$ be defined on a set containing $x_0$. It is **continuous at $x_0$** if for every $\varepsilon>0$ there is $\delta>0$ such that whenever $|x-x_0|<\delta$ (and $x$ lies in the domain),
$$
|f(x)-f(x_0)|<\varepsilon .
$$
If $f$ is continuous at every point of its domain, it is **continuous**.

Two points to keep in mind:

- $\delta$ generally depends on both $\varepsilon$ and $x_0$;
- the definition has the same quantified shape as the limit of a sequence: an arbitrary precision is given, and a corresponding neighbourhood must be produced.

### Two basic examples

**Constant $f(x)=c$.** Given $\varepsilon>0$, take $\delta=1$ (or any positive number). If $|x-x_0|<1$ then
$$
|f(x)-f(x_0)|=|c-c|=0<\varepsilon .
$$
So constant functions are continuous everywhere. Here $\delta$ depends on neither $\varepsilon$ nor $x_0$.

**Identity $f(x)=x$.** Given $\varepsilon>0$, take $\delta=\varepsilon$. If $|x-x_0|<\varepsilon$ then
$$
|f(x)-f(x_0)|=|x-x_0|<\varepsilon .
$$
So the identity is continuous everywhere.

### Five algebraic rules

If $f,g$ are continuous, then:

1. $f+g$ is continuous;
2. $cf$ is continuous for constant $c$;
3. $fg$ is continuous;
4. if $f$ never vanishes, $1/f$ is continuous;
5. whenever the composition makes sense, $g\circ f$ is continuous.

These parallel the algebra of limits of sequences, and so do the proofs: split the error into two parts and allot $\varepsilon/2$ to each.

**Proof of the product rule (rule 3).** Estimate
$$
f(x)g(x)-f(x_0)g(x_0).
$$
Insert a cross term to create two controllable differences:
$$
f(x)g(x)-f(x_0)g(x_0)
=g(x)\bigl(f(x)-f(x_0)\bigr)+f(x_0)\bigl(g(x)-g(x_0)\bigr).
$$
Hence
$$
|f(x)g(x)-f(x_0)g(x_0)|
\le |g(x)|\,|f(x)-f(x_0)|+|f(x_0)|\,|g(x)-g(x_0)| .
$$

Control each piece:

- Continuity of $g$ at $x_0$ with $\varepsilon=1$ gives $\delta_1$ such that $|x-x_0|<\delta_1$ implies $|g(x)-g(x_0)|<1$, hence
$$
|g(x)|<|g(x_0)|+1=:M .
$$
- Continuity of $f$: there is $\delta_2$ with $|f(x)-f(x_0)|<\dfrac{\varepsilon}{2M}$ when $|x-x_0|<\delta_2$.
- Continuity of $g$: there is $\delta_3$ with $|g(x)-g(x_0)|<\dfrac{\varepsilon}{2(|f(x_0)|+1)}$ when $|x-x_0|<\delta_3$.

Take $\delta=\min\{\delta_1,\delta_2,\delta_3\}$. For $|x-x_0|<\delta$,
$$
|f(x)g(x)-f(x_0)g(x_0)|
\le M\cdot\frac{\varepsilon}{2M}+|f(x_0)|\cdot\frac{\varepsilon}{2(|f(x_0)|+1)}
<\frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon .
$$
So $fg$ is continuous at $x_0$. $\square$

Two technical habits are worth keeping: **first show one factor is bounded near $x_0$**, then allocate the error; and add $1$ in a denominator to avoid dividing by zero when $f(x_0)=0$.

### Polynomials and rational functions

Starting from the two basic examples and applying rules 1–3 repeatedly:

- $x$ is continuous ⇒ $x^2=x\cdot x$ is continuous ⇒ $x^n$ is continuous;
- constants are continuous ⇒ $cx^n$ is continuous;
- finite sums of continuous functions are continuous.

**Theorem.** Every polynomial is continuous.

Adding rule 4:

**Theorem.** Every rational function (a quotient of two polynomials) is continuous wherever the denominator does not vanish.

The zeros of the denominator are finitely many; the function is not defined there, so continuity is not even in question. Sometimes it can be extended continuously to such a point, but that produces a different function.

### How $\delta$ depends on $x_0$: the example $1/x$

Take $f(x)=1/x$ on $x\ne0$ (say the positive branch). Fix $x_0>0$ and prove continuity there. Directly,
$$
\left|\frac1x-\frac1{x_0}\right|=\frac{|x-x_0|}{|x|\,|x_0|}.
$$
If first we require $|x-x_0|<\dfrac{x_0}{2}$, then $x>\dfrac{x_0}{2}$ and
$$
\left|\frac1x-\frac1{x_0}\right|<\frac{2|x-x_0|}{x_0^2}.
$$
Making this smaller than $\varepsilon$ needs $|x-x_0|<\dfrac{\varepsilon x_0^2}{2}$. So
$$
\delta=\min\left\{\frac{x_0}{2},\ \frac{\varepsilon x_0^2}{2}\right\}
$$
works.

The key observation: $\delta$ contains $x_0^2$. **As $x_0$ approaches $0$, $\delta$ must be taken very small**, because the function changes violently near $0$. That is exactly what "$\delta$ depends on $x_0$" means in practice.

If a continuous function admits a $\delta$ depending only on $\varepsilon$, uniformly in $x_0$, it is called **uniformly continuous**. That is a later topic; the lecture plants the hook and notes that excluding $0$ from the domain of $1/x$ is not an accident — a continuous function on a closed interval would automatically be uniformly continuous.

## What this lecture establishes

- The limsup is the infimum of tail suprema and always exists; the liminf is defined symmetrically.
- Root test 2.0 uses the limsup instead of a limit and applies to any series.
- Radius of convergence $R=1/\limsup|a_n|^{1/n}$; absolute convergence for $|x|<R$, divergence for $|x|>R$, endpoints checked separately.
- The convergence set is always an interval centred at $0$, never a scattered set.
- $E(x)=\sum x^n/n!$ is defined on all of $\mathbb R$ and is everywhere positive (positivity at negative $x$ borrows the next lecture's addition formula).
- $e=E(1)$; for integers and rationals $q$, $e^q=E(q)$.
- Continuity is an $\varepsilon$-$\delta$ condition with $\delta$ depending on $\varepsilon$ and $x_0$.
- Constants and the identity are continuous; sums, scalar multiples, products, reciprocals and compositions preserve continuity; polynomials are continuous everywhere and rational functions wherever the denominator is nonzero.
- The $\delta$ for $1/x$ contains $x_0^2$, showing the neighbourhood must shrink drastically near $0$.

## Comprehension check

**1. Prove that $b_n=\sup_{k\ge n}a_k$ decreases, and explain why the limsup always exists.**

Reference answer: Since $\{a_k:k\ge n+1\}\subseteq\{a_k:k\ge n\}$, a supremum over the smaller set cannot exceed one over the larger, so $b_{n+1}\le b_n$. The sequence $(b_n)$ decreases; if bounded below, monotone convergence gives a limit, which is the limsup; if unbounded below, one sets it to $-\infty$ (dually $+\infty$ when the original sequence is unbounded above). Either way the limsup is defined in the extended real line without requiring convergence of $(a_n)$.

**2. If $\limsup a_n=2$, can we conclude that $a_n<2$ for all sufficiently large $n$?**

Reference answer: No. The limsup controls tail suprema in the limit: for every $\eta>0$ there is $N$ such that $a_n<2+\eta$ for $n\ge N$, i.e. the sequence eventually stays below $2+\eta$, but it may approach or exceed $2$ infinitely often. For example $a_n=2+1/n$ has limsup $2$ yet every term exceeds $2$. What is guaranteed is the inequality with an arbitrary $\eta>0$, eventually.

**3. Why must the convergence set of a power series be an interval centred at $0$, and not something like "converges at $x=5$, diverges at $x=10$, converges again at $x=20$"?**

Reference answer: The root test gives the criterion $|x|\cdot\limsup|a_n|^{1/n}<1$ or $>1$, i.e. $|x|<R$ or $|x|>R$, where $R$ depends only on the coefficients, not on $x$. Convergence therefore depends only on how $|x|$ compares with the single threshold $R$. If $x=20$ converges then $20<R$, so every $y$ with $|y|<20$ also has $|y|<R$ and converges — contradicting divergence at $x=10$. Such an alternating pattern is impossible.

**4. With $E$ defined by its power series, why does positivity at negative $x$ need an extra step, and what does that step rely on?**

Reference answer: For $x\ge0$ every term is non-negative and the first is $1$, so the sum is positive. For $x<0$ the terms alternate and no termwise argument applies. One uses the addition formula $E(x)E(-x)=E(0)=1$: since $-x>0$ gives $E(-x)>0$ and the product is $1>0$, we get $E(x)=1/E(-x)>0$. This depends on the addition formula, proved only in the next lecture; the lecture flags it explicitly as a loan.

**5. When verifying $e^{m/n}=E(m/n)$, which properties of $E$ are used?**

Reference answer: Three: (a) $E(x)>0$, so its positive $n$-th root makes sense; (b) the iterated addition formula $E(x)^n=E(nx)$, giving $(E(m/n))^n=E(m)=e^m$; (c) uniqueness of the positive $n$-th root, i.e. at most one $\alpha>0$ satisfies $\alpha^n=e^m$. Together these identify $E(m/n)$ with the number called $e^{m/n}$.

**6. Prove that constant functions are continuous, and explain how their $\delta$ differs from the general case.**

Reference answer: Let $f(x)=c$. Given $\varepsilon>0$, take any $\delta>0$, say $\delta=1$. If $|x-x_0|<\delta$ then $|f(x)-f(x_0)|=|c-c|=0<\varepsilon$, so $f$ is continuous everywhere. The difference: here $\delta$ depends on neither $\varepsilon$ nor $x_0$, whereas in general $\delta$ depends on both — for $1/x$ it contains $x_0^2$.

**7. Why must boundedness of $g$ near $x_0$ be established before proving that $fg$ is continuous?**

Reference answer: The estimate
$$
|fg-f(x_0)g(x_0)|\le|g(x)|\,|f(x)-f(x_0)|+|f(x_0)|\,|g(x)-g(x_0)|
$$
contains the varying factor $|g(x)|$, which cannot be treated as a constant. Continuity of $g$ at $x_0$ with $\varepsilon=1$ gives $|g(x)|<|g(x_0)|+1=:M$ on a neighbourhood. With this bound the first term can be pushed below $M\cdot\frac{\varepsilon}{2M}=\frac{\varepsilon}{2}$. Without it, no fixed error budget can be assigned to $|f(x)-f(x_0)|$.

## Relation to neighbouring lectures

Two threads meet here. On the series side, the limsup completes the root test and gives power series the clean structure of a radius of convergence. On the function side, the exponential is defined by a power series and extended from $\mathbb Q$ to $\mathbb R$ by continuity.

The next lecture does three things: it proves the addition formula $E(x+y)=E(x)E(y)$ (borrowed twice here); it proves that two continuous functions agreeing on $\mathbb Q$ agree everywhere, completing the definition of the exponential; and it begins the systematic study of continuous functions. After that come the extreme value theorem, the intermediate value theorem and metric spaces — at which point the theorem from the very first lecture is finally proved.
