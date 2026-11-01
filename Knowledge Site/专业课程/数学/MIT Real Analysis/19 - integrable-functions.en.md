---
slug: 19-integrable-functions
title: "Which Functions Are Integrable: Criterion, Uniform Continuity, and Continuity"
summary: "The lower integral never exceeds the upper one. The Dirichlet function shows that boundedness is far from sufficient. An if-and-only-if criterion (upper minus lower sum below ε) then leads to uniform continuity: continuous functions on a closed interval are uniformly continuous by Bolzano–Weierstrass, and hence Riemann integrable."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, riemann-integral, uniform-continuity, compactness]
sources:
  - kind: video
    title: "Lecture 18: Integrable Functions"
    url: https://www.youtube.com/watch?v=9rG-bs0TFQ8
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## From definition to criterion

The previous lecture defined the Riemann integral as the common value of the lower and upper integrals, but said nothing about when they agree. This lecture supplies three things:

1. For **every** bounded function the lower integral is at most the upper one, so the definition is consistent.
2. A non-integrable example (Dirichlet's function) shows that boundedness is far from enough.
3. An **if-and-only-if criterion**: for every $\varepsilon>0$ there is a partition whose upper and lower sums differ by less than $\varepsilon$.

The criterion only involves finitely many rectangles, but applying it to continuous functions needs a new tool: **uniform continuity**. The logic of the lecture is

$$
\text{continuous} \xrightarrow{\text{compactness}} \text{uniformly continuous} \xrightarrow{\text{upper/lower sums}} \text{integrable}.
$$

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: partitions, upper and lower sums, refinement lemma |
| 13:32 | Definitions of upper and lower integrals |
| 16:59 | Proof that the lower integral is at most the upper one |
| 24:44 | A digression on Riemann |
| 27:52 | Dirichlet's function: bounded but not integrable |
| 31:45 | The integrability criterion via $U-L$ |
| 41:47 | Continuous functions on closed intervals are integrable; uniform continuity introduced |
| 45:38 | Counterexamples: $x^2$ on $\mathbb R$, $1/x$ on $(0,1]$ |
| 55:28 | Proof: continuity on a compact interval gives uniform continuity |
| 1:04:39 | Applying the criterion to prove integrability |
| 1:14:25 | Four basic properties of the integral (stated only) |

## Review: partitions, sums, refinements

Let $f$ be bounded on $[a,b]$ and $P=\{a=x_0<x_1<\cdots<x_n=b\}$ a partition, with $\Delta x_i=x_i-x_{i-1}$ and

$$
M_i=\sup_{[x_{i-1},x_i]}f,
\qquad
m_i=\inf_{[x_{i-1},x_i]}f .
$$

Then

$$
U(f,P)=\sum_{i=1}^{n}M_i\Delta x_i,
\qquad
L(f,P)=\sum_{i=1}^{n}m_i\Delta x_i,
\qquad
L(f,P)\le U(f,P).
$$

Refinement lemma: if $P_2$ refines $P_1$, then

$$
L(f,P_1)\le L(f,P_2)\le U(f,P_2)\le U(f,P_1).
$$

The upper integral is the infimum of all upper sums, the lower integral the supremum of all lower sums:

$$
\overline{\int_a^b f}=\inf_P U(f,P),
\qquad
\underline{\int_a^b f}=\sup_P L(f,P).
$$

## The lower integral never exceeds the upper

**Proposition.** For every bounded $f$,

$$
\underline{\int_a^b f}\le \overline{\int_a^b f}.
$$

**Proof.** First prove a stronger statement: for **any two partitions** $P,P^*$,

$$
L(f,P)\le U(f,P^*).
$$

Take the union of the division points of $P$ and $P^*$, giving the common refinement $\bar P$. It refines both, so the refinement lemma gives

$$
L(f,P)\le L(f,\bar P)\le U(f,\bar P)\le U(f,P^*).
$$

Hence $L(f,P)\le U(f,P^*)$ for all $P,P^*$.

Fix $P$. The inequality says $L(f,P)$ is a lower bound for the set $\{U(f,P^*):P^*\}$, so it does not exceed the infimum:

$$
L(f,P)\le\inf_{P^*}U(f,P^*)=\overline{\int_a^b f}.
$$

Thus $\overline{\int_a^b f}$ is an upper bound for $\{L(f,P):P\}$, and therefore at least the supremum:

$$
\sup_P L(f,P)=\underline{\int_a^b f}\le \overline{\int_a^b f}.
$$

$\square$

The technique is worth remembering: **first show "any lower sum ≤ any upper sum", then apply the definitions of sup and inf once each**. The refinement lemma does all the work.

## A non-integrable function: Dirichlet's

Define on $[0,1]$:

$$
f(x)=
\begin{cases}
1, & x\in\mathbb Q,\\
0, & x\notin\mathbb Q .
\end{cases}
$$

It is plainly bounded ($0\le f\le1$), yet **not integrable**.

**Reason.** Take any partition $P$. Every nondegenerate subinterval $[x_{i-1},x_i]$ contains rationals and irrationals (both are dense), so

$$
M_i=1,
\qquad
m_i=0 .
$$

Therefore

$$
U(f,P)=\sum_{i=1}^{n}1\cdot\Delta x_i=1,
\qquad
L(f,P)=\sum_{i=1}^{n}0\cdot\Delta x_i=0 .
$$

This holds for **all** partitions. Hence

$$
\overline{\int_0^1 f}=1,
\qquad
\underline{\int_0^1 f}=0,
$$

so the function is not integrable.

The example shows that boundedness is not the issue. Integrability requires that the oscillation over small intervals can be made small in aggregate; here the oscillation is $1$ on every interval.

## The integrability criterion

**Theorem.** Let $f$ be bounded on $[a,b]$. Then $f$ is Riemann integrable if and only if for every $\varepsilon>0$ there is a partition $P$ with

$$
U(f,P)-L(f,P)<\varepsilon .
$$

**Proof (necessity).** Suppose $f$ is integrable with common value $I$. Since

$$
I=\underline{\int_a^b f}=\sup_P L(f,P),
$$

given $\varepsilon>0$ there is $P_1$ with

$$
L(f,P_1)>I-\frac{\varepsilon}{2}.
$$

(Otherwise every lower sum would be $\le I-\varepsilon/2$ and the supremum would be smaller than $I$.) Likewise, since $I=\inf_P U(f,P)$, there is $P_2$ with

$$
U(f,P_2)<I+\frac{\varepsilon}{2}.
$$

Take the common refinement $P$, which refines both. Then

$$
L(f,P)\ge L(f,P_1)>I-\frac{\varepsilon}{2},
\qquad
U(f,P)\le U(f,P_2)<I+\frac{\varepsilon}{2}.
$$

Subtracting,

$$
U(f,P)-L(f,P)<\left(I+\frac{\varepsilon}{2}\right)-\left(I-\frac{\varepsilon}{2}\right)=\varepsilon .
$$

**Proof (sufficiency).** Suppose that for every $\varepsilon>0$ some $P$ has $U(f,P)-L(f,P)<\varepsilon$. For any partition,

$$
L(f,P)\le\underline{\int_a^b f}\le\overline{\int_a^b f}\le U(f,P),
$$

so

$$
0\le\overline{\int_a^b f}-\underline{\int_a^b f}\le U(f,P)-L(f,P)<\varepsilon .
$$

Since $\varepsilon$ is arbitrary, the two integrals agree and $f$ is integrable. $\square$

The point of the criterion: **integrability needs one partition for each $\varepsilon$, not verification over all partitions**. If upper and lower sums can be brought arbitrarily close, the sup and inf are squeezed together.

## Uniform continuity

**Definition.** Let $f$ be defined on a set $E$. Say $f$ is **uniformly continuous** on $E$ if for every $\varepsilon>0$ there is $\delta>0$ such that for **all** $x,y\in E$,

$$
|x-y|<\delta\implies|f(x)-f(y)|<\varepsilon .
$$

The only difference from ordinary continuity is one word: $\delta$ may not depend on the point. Ordinary continuity says "for each $x_0$ and each $\varepsilon$ there is $\delta(\varepsilon,x_0)$"; uniform continuity requires **one $\delta$ that works everywhere**.

Geometrically: given an error band of height $\varepsilon$ on the $y$-axis, there is a uniform horizontal width $\delta$ such that any piece of the graph of width less than $\delta$ stays within a band of height $2\varepsilon$.

### Counterexample 1: $x^2$ on $\mathbb R$

If $x^2$ were uniformly continuous, there would be $\delta>0$ with $|x^2-y^2|<\varepsilon$ whenever $|x-y|<\delta$. Take $y=x+\delta/2$:

$$
|f(x)-f(y)|=\left|x^2-\left(x+\frac{\delta}{2}\right)^2\right|
=\delta x+\frac{\delta^2}{4},
$$

which is unbounded as $x\to+\infty$. So no single $\delta$ works. The function is continuous but not uniformly continuous on $\mathbb R$.

The cause is not the function but the **unbounded domain**: the graph steepens without limit, so a fixed horizontal width produces ever larger vertical change.

### Counterexample 2: $1/x$ on $(0,1]$

Let $f(x)=1/x$ on $(0,1]$ and take

$$
x_n=\frac1n,
\qquad
y_n=\frac1{2n}.
$$

Then

$$
|x_n-y_n|=\frac1{2n}\to0,
\qquad
|f(x_n)-f(y_n)|=|n-2n|=n\to\infty .
$$

So no matter how small $\delta$ is, some pair of points closer than $\delta$ has images more than a given $\varepsilon$ apart. Hence $1/x$ is not uniformly continuous on $(0,1]$.

The cause is not unboundedness but the **domain not being closed**: near $0$ the function steepens without bound, and the endpoint $0$ is missing.

Both counterexamples point to the same thing: uniform continuity depends on **compactness** of the domain.

## Continuity on a compact interval gives uniform continuity

**Theorem.** If $f$ is continuous on $[a,b]$, then $f$ is uniformly continuous on $[a,b]$.

**Proof (contradiction plus sequential compactness).** Suppose not. Negating the definition gives $\varepsilon>0$ such that for **every** $\delta>0$ there are $x,y\in[a,b]$ with

$$
|x-y|<\delta
\quad\text{and}\quad
|f(x)-f(y)|\ge\varepsilon .
$$

Take $\delta=1/n$ for $n=1,2,3,\dots$ to obtain sequences $x_n,y_n\in[a,b]$ with

$$
|x_n-y_n|<\frac1n,
\qquad
|f(x_n)-f(y_n)|\ge\varepsilon .
$$

By Bolzano–Weierstrass (a bounded sequence in a closed bounded interval has a convergent subsequence), some subsequence $x_{n_k}\to x$, and $x\in[a,b]$ because the interval is closed.

Consider $y_{n_k}$. The triangle inequality gives

$$
|y_{n_k}-x|\le|y_{n_k}-x_{n_k}|+|x_{n_k}-x|
<\frac{1}{n_k}+|x_{n_k}-x| .
$$

Both terms tend to $0$, so $y_{n_k}\to x$.

Continuity of $f$ at $x$ gives

$$
f(x_{n_k})\to f(x),
\qquad
f(y_{n_k})\to f(x).
$$

Hence

$$
|f(x_{n_k})-f(y_{n_k})|\to0,
$$

contradicting the fact that it is $\ge\varepsilon>0$ for every $k$. Therefore $f$ is uniformly continuous. $\square$

This is a model compactness argument: **negate uniformity, obtain two sequences whose points converge together but whose images stay apart; use Bolzano–Weierstrass; continuity forces the images together; contradiction.**

## Continuous functions are integrable

**Theorem.** If $f$ is continuous on $[a,b]$, then $f$ is Riemann integrable.

**Proof.** By the criterion it suffices, for each $\varepsilon>0$, to construct a partition with $U-L<\varepsilon$.

Assume $a<b$ (if $a=b$ the integral is zero). Uniform continuity gives $\delta>0$ such that $|x-y|<\delta$ implies

$$
|f(x)-f(y)|<\frac{\varepsilon}{b-a}.
$$

Choose a partition $P$ with every $\Delta x_i<\delta$.

On each $[x_{i-1},x_i]$, the function is continuous, so by the extreme value theorem $M_i$ and $m_i$ are attained at points $y_i,y_i^*$. Those points lie at distance less than $\delta$, hence

$$
M_i-m_i=f(y_i)-f(y_i^*)<\frac{\varepsilon}{b-a}.
$$

Therefore

$$
U(f,P)-L(f,P)
=\sum_{i=1}^{n}(M_i-m_i)\Delta x_i
<\sum_{i=1}^{n}\frac{\varepsilon}{b-a}\Delta x_i
=\frac{\varepsilon}{b-a}\sum_{i=1}^{n}\Delta x_i
=\varepsilon .
$$

The last step uses $\sum\Delta x_i=b-a$. The criterion gives integrability. $\square$

Each ingredient has a job: uniform continuity supplies a uniform $\delta$; the extreme value theorem guarantees that the sup and inf are actually attained (otherwise only nearby points are available and the inequality is not strict); the partition sums the local estimates, and $\sum\Delta x_i=b-a$ cancels the constant.

## Basic properties of the integral

Four properties were stated, with proofs deferred:

1. **Scalar multiples**: if $f$ is integrable and $c\in\mathbb R$, then $cf$ is integrable and $\int_a^b cf=c\int_a^b f$.
2. **Sums**: if $f,g$ are integrable, so is $f+g$, and $\int_a^b(f+g)=\int_a^b f+\int_a^b g$.
3. **Monotonicity**: if $f,g$ are integrable and $f\le g$, then $\int_a^b f\le\int_a^b g$.
4. **Additivity over intervals**: if $f$ is integrable on $[a,b]$ and $c\in[a,b]$, then $f$ is integrable on $[a,c]$ and on $[c,b]$, and
$$
\int_a^b f=\int_a^c f+\int_c^b f .
$$

The last is clearest in terms of area: cutting the graph at $c$ splits the signed area into two parts whose sum is the whole.

## What this lecture establishes

- For every bounded function, $\underline{\int}\le\overline{\int}$; the proof uses a common refinement and the definitions of sup and inf.
- Dirichlet's function has $M_i=1$ and $m_i=0$ on every interval, so $U\equiv1$ and $L\equiv0$; it is not integrable.
- $f$ is integrable iff for every $\varepsilon>0$ some partition has $U-L<\varepsilon$.
- Uniform continuity means one $\delta$ works for all points; $x^2$ on $\mathbb R$ and $1/x$ on $(0,1]$ are continuous but not uniformly continuous.
- Continuity on a compact interval implies uniform continuity (Bolzano–Weierstrass plus contradiction).
- Continuity on a compact interval implies integrability (uniform continuity, extreme value theorem, upper/lower sum estimate).
- The integral is linear, monotone and additive over subintervals (proofs deferred).

## Comprehension check

**1. Prove that $L(f,P)\le U(f,P^*)$ for any two partitions, and deduce that the lower integral is at most the upper one.**

Reference answer: Let $\bar P$ be the common refinement obtained from the union of the division points. The refinement lemma gives $L(f,P)\le L(f,\bar P)$ and $U(f,\bar P)\le U(f,P^*)$, while for any single partition $L(f,\bar P)\le U(f,\bar P)$. Chaining them gives $L(f,P)\le U(f,P^*)$. Fix $P$; the right side holds for every $P^*$, so $L(f,P)\le\inf_{P^*}U(f,P^*)=\overline{\int}f$. Taking the supremum over all $P$ gives $\underline{\int}f=\sup_P L(f,P)\le\overline{\int}f$.

**2. Prove that Dirichlet's function is not Riemann integrable on $[0,1]$.**

Reference answer: Take any partition $P$. Every nondegenerate subinterval contains both rationals and irrationals (both sets are dense), so $M_i=1$ and $m_i=0$. Hence $U(f,P)=\sum1\cdot\Delta x_i=1$ and $L(f,P)=\sum0\cdot\Delta x_i=0$ for every partition. The upper integral is therefore the infimum of the constant $1$, namely $1$, and the lower integral is the supremum of the constant $0$, namely $0$. They differ, so the function is not integrable.

**3. State the integrability criterion and prove its sufficiency.**

Reference answer: A bounded $f$ on $[a,b]$ is Riemann integrable iff for every $\varepsilon>0$ there is a partition with $U(f,P)-L(f,P)<\varepsilon$. For sufficiency, suppose such a partition exists for each $\varepsilon$. For any partition, $L(f,P)\le\underline{\int}f\le\overline{\int}f\le U(f,P)$, hence $0\le\overline{\int}f-\underline{\int}f\le U(f,P)-L(f,P)<\varepsilon$. Since this holds for every $\varepsilon>0$, the two integrals are equal and $f$ is integrable.

**4. Show that $1/x$ is continuous but not uniformly continuous on $(0,1]$, and identify the missing property of the domain.**

Reference answer: Take $x_n=1/n$ and $y_n=1/(2n)$, both in $(0,1]$. Then $|x_n-y_n|=1/(2n)\to0$, while $|f(x_n)-f(y_n)|=|n-2n|=n\to\infty$. So no single $\delta$ works: arbitrarily small horizontal distances can produce arbitrarily large vertical differences. The domain $(0,1]$ is bounded but not closed (the endpoint $0$ is missing), hence not compact; compactness is exactly what upgrades continuity to uniform continuity.

**5. Use Bolzano–Weierstrass to prove that a continuous function on $[a,b]$ is uniformly continuous.**

Reference answer: Suppose not. Then there is $\varepsilon>0$ such that for every $n$ there are $x_n,y_n\in[a,b]$ with $|x_n-y_n|<1/n$ and $|f(x_n)-f(y_n)|\ge\varepsilon$. By Bolzano–Weierstrass, a subsequence $x_{n_k}$ converges to some $x\in[a,b]$. The triangle inequality gives $|y_{n_k}-x|\le|y_{n_k}-x_{n_k}|+|x_{n_k}-x|<1/n_k+|x_{n_k}-x|\to0$, so $y_{n_k}\to x$. Continuity yields $f(x_{n_k})\to f(x)$ and $f(y_{n_k})\to f(x)$, hence $|f(x_{n_k})-f(y_{n_k})|\to0$, contradicting the lower bound $\varepsilon$.

**6. For continuous $f$ on $[a,b]$, prove integrability from uniform continuity and the criterion, and say where the extreme value theorem enters.**

Reference answer: Given $\varepsilon>0$, uniform continuity gives $\delta>0$ with $|x-y|<\delta\Rightarrow|f(x)-f(y)|<\varepsilon/(b-a)$. Choose a partition with every $\Delta x_i<\delta$. On each subinterval, the extreme value theorem guarantees that $M_i$ and $m_i$ are attained at points less than $\delta$ apart, so $M_i-m_i<\varepsilon/(b-a)$. Then $U-L=\sum(M_i-m_i)\Delta x_i<\frac{\varepsilon}{b-a}\sum\Delta x_i=\varepsilon$, and the criterion gives integrability. The extreme value theorem is what makes the sup and inf attained, producing a strict inequality; using $\varepsilon/(2(b-a))$ would also work, but the extreme value theorem makes the argument direct.

## Relation to neighbouring lectures

This lecture turns integrability from a definition into a usable tool: the criterion compresses infinitely many partitions into one $\varepsilon$-argument, and compactness upgrades pointwise continuity to uniform continuity. Both ideas recur constantly.

The next lecture introduces the fundamental theorem of calculus: the function $F(x)=\int_a^x f$ is differentiable with $F'=f$ when $f$ is continuous; this is then used to compute concrete integrals, and improper integrals are discussed. Later, exchanging limits with integrals, and term-by-term integration of series, return to the uniform continuity and uniform convergence ideas from this lecture.
