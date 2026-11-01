---
slug: 20-fundamental-theorem
title: "The Fundamental Theorem of Calculus: Turning Integrals into Antiderivatives"
summary: "After proving the algebraic properties of the integral and its additivity over subintervals — including the absolute value inequality — the lecture gives both versions of the fundamental theorem: differentiating the area function returns the integrand, and an antiderivative evaluates a definite integral. Improper integrals are then defined by limits, and arc length closes the lecture."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, fundamental-theorem, integration, improper-integrals]
sources:
  - kind: video
    title: "Lecture 19: Fundamental Theorem of Calculus"
    url: https://www.youtube.com/watch?v=_tZ102Wi0hE
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Where this lecture sits

The previous lecture proved that continuous functions are integrable, but the integral was still only a definition: computing $\int_0^1 x^2\,dx$ meant returning to upper and lower sums. This lecture supplies two things that make integrals usable:

1. **Algebraic properties**: scalar multiples, sums, monotonicity, additivity over subintervals, and the resulting bound $|\int f|\le\int|f|$.
2. **The fundamental theorem of calculus**: integration and differentiation are inverse operations. The first version differentiates the area function; the second evaluates integrals with an antiderivative.

The lecture then extends the integral to two "illegal" situations — unbounded intervals and unbounded functions — which are the improper integrals. It closes with a definition of arc length, the first time an integral defines a geometric quantity.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: partitions, sums, upper/lower integrals, integrability |
| 3:06 | Four algebraic properties; proof for sums |
| 20:58 | Remarks on the notation $\int$ and $dx$ |
| 22:24 | Monotonicity (explained, not proved in detail) |
| 23:58 | Additivity over subintervals: integrability on each piece |
| 35:46 | Corollary: $\left|\int_a^b f\right|\le\int_a^b|f|$ |
| 40:27 | Fundamental theorem, version 1, with proof |
| 53:38 | Version 2 (proof in the notes) |
| 56:19 | Example: $\int_0^1x^2\,dx=1/3$ |
| 58:49 | Improper integrals with unbounded intervals |
| 1:06:47 | $\int_1^\infty \frac{dx}{x^2}=1$ |
| 1:10:15 | $\int_1^\infty \frac{dx}{x}$ diverges |
| 1:12:07 | Improper integrals with unbounded functions |
| 1:13:26 | $\int_0^1 \frac{dx}{\sqrt x}=2$ |
| 1:15:46 | $\int_0^1 \frac{dx}{x}$ diverges |
| 1:18:19 | Definition of arc length |

## Algebraic properties of the integral

Let $f,g$ be Riemann integrable on $[a,b]$.

1. **Scalar multiples**: $cf$ is integrable and $\int_a^b cf=c\int_a^b f$.
2. **Sums**: $f+g$ is integrable and $\int_a^b(f+g)=\int_a^b f+\int_a^b g$.
3. **Monotonicity**: if $f\le g$, then $\int_a^b f\le\int_a^b g$.
4. **Additivity over subintervals**: if $c\in[a,b]$, then $f$ is integrable on $[a,c]$ and on $[c,b]$, and
$$
\int_a^b f=\int_a^c f+\int_c^b f .
$$

Monotonicity is immediate from the picture: $f\le g$ gives $\sup f\le\sup g$ and $\inf f\le\inf g$ on every subinterval, so upper and lower sums compare termwise; take suprema and infima.

### Proof for sums

Use the integrability criterion: for a given $\varepsilon>0$, find a partition with $U(f+g,P)-L(f+g,P)<\varepsilon$.

Since $f$ is integrable, there is $P_1$ with

$$
U(f,P_1)-L(f,P_1)<\frac{\varepsilon}{2};
$$

since $g$ is integrable, there is $P_2$ with

$$
U(g,P_2)-L(g,P_2)<\frac{\varepsilon}{2}.
$$

Let $P$ be the common refinement (union of division points). Then

$$
U(f,P)-L(f,P)<\frac{\varepsilon}{2},
\qquad
U(g,P)-L(g,P)<\frac{\varepsilon}{2}.
$$

The decisive step relates the extrema of a **sum** to those of the summands. On any subinterval,

$$
\sup(f+g)\le\sup f+\sup g,
\qquad
\inf(f+g)\ge\inf f+\inf g .
$$

These are usually **not equalities**: if $f$ and $g$ have opposite signs and cancel, the oscillation of the sum can be much smaller than the sum of the oscillations. But the inequalities point the right way.

Hence, for the same $P$,

$$
\begin{aligned}
U(f+g,P)-L(f+g,P)
&=\sum_i\Big(\sup(f+g)-\inf(f+g)\Big)\Delta x_i\\
&\le\sum_i\Big[(\sup f-\inf f)+(\sup g-\inf g)\Big]\Delta x_i\\
&=\big(U(f,P)-L(f,P)\big)+\big(U(g,P)-L(g,P)\big)\\
&<\varepsilon .
\end{aligned}
$$

The criterion gives integrability of $f+g$.

**The equality of integrals** needs a separate squeeze. For any partition $P$,

$$
L(f,P)+L(g,P)\le L(f+g,P)\le U(f+g,P)\le U(f,P)+U(g,P).
$$

Taking suprema and infima over $P$, the ends give $\int f+\int g$, so the middle is squeezed:

$$
\int_a^b(f+g)=\int_a^b f+\int_a^b g .
$$

### On the notation

The lecture explains the symbols: $\int$ is a stretched $S$, standing for summation; $dx$ shares its origin with $\Delta x$ and is meant as a limiting version of $\Delta x_i$. Thus

$$
\int_a^b f(x)\,dx
$$

reads as "sum $f(x_i)\Delta x_i$ and let the partition get finer". Of course the rigorous definition is still a supremum and infimum, not literally a limit.

## Additivity over subintervals

**Proposition.** If $f$ is integrable on $[a,b]$ and $c\in[a,b]$, then $f$ is integrable on $[a,c]$ and on $[c,b]$.

**Proof.** Given $\varepsilon>0$, integrability on $[a,b]$ gives a partition $P$ with

$$
U(f,P)-L(f,P)<\varepsilon .
$$

If $c$ is not a division point, insert it to obtain the refinement $P^*$. Refinement only decreases the gap, so

$$
U(f,P^*)-L(f,P^*)<\varepsilon .
$$

Now restrict $P^*$ to $[a,c]$; this is a partition of $[a,c]$, and similarly for $[c,b]$. Sums split at the division point:

$$
U(f,P^*)-L(f,P^*)
=
\Big(U(f,P^*|_{[a,c]})-L(f,P^*|_{[a,c]})\Big)
+
\Big(U(f,P^*|_{[c,b]})-L(f,P^*|_{[c,b]})\Big).
$$

Both terms are nonnegative and their sum is less than $\varepsilon$, so each is less than $\varepsilon$. The criterion gives integrability on each piece.

**The equality of integrals** follows from the same splitting: split every upper and lower sum into two parts and take suprema and infima:

$$
\int_a^b f=\int_a^c f+\int_c^b f .
$$

$\square$

This is the second crucial use of refinement: $c$ must first become a division point before the sums can be split cleanly.

## The absolute value inequality

**Corollary.** If $f$ and $|f|$ are integrable on $[a,b]$, then

$$
\left|\int_a^b f\right|\le\int_a^b|f| .
$$

**Proof.** For every $x$,

$$
f(x)\le|f(x)|,
\qquad
-f(x)\le|f(x)| .
$$

Monotonicity gives

$$
\int_a^b f\le\int_a^b|f|,
\qquad
\int_a^b(-f)\le\int_a^b|f| .
$$

The left side of the second is $-\int_a^b f$ by linearity. Hence

$$
-\int_a^b|f|\le\int_a^b f\le\int_a^b|f|,
$$

which is the claim. $\square$

This inequality is used in almost every estimate: it replaces a signed sum by a sum of absolute values, at the cost of losing cancellation.

## The fundamental theorem, version 1

**Theorem.** Let $f$ be continuous on $[a,b]$ and define

$$
F(x)=\int_a^x f(s)\,ds,
\qquad x\in[a,b].
$$

Then $F$ is differentiable on $(a,b)$ and

$$
F'(x)=f(x).
$$

**Proof.** Fix $x_0$ and first take $x>x_0$. Additivity gives

$$
F(x)-F(x_0)
=\int_a^x f-\int_a^{x_0} f
=\int_{x_0}^x f .
$$

On $[x_0,x]$, continuity plus the extreme value theorem give a maximum $M$ and a minimum $m$. Thus

$$
m(x-x_0)\le\int_{x_0}^x f\le M(x-x_0).
$$

Dividing by $x-x_0>0$,

$$
m\le\frac{F(x)-F(x_0)}{x-x_0}\le M .
$$

As $x\to x_0^+$ the interval shrinks to $x_0$, and continuity gives $M\to f(x_0)$ and $m\to f(x_0)$. Squeezing,

$$
\lim_{x\to x_0^+}\frac{F(x)-F(x_0)}{x-x_0}=f(x_0).
$$

For $x<x_0$ the denominator is negative, so the inequalities reverse, but the same squeeze gives the left-hand limit $f(x_0)$. The two sides agree, hence $F'(x_0)=f(x_0)$. $\square$

The structure is a **squeeze**: the integral sits between two rectangles, the quotient between $\inf$ and $\sup$, and both converge to $f(x_0)$. Continuity is used exactly once — to make $M,m\to f(x_0)$.

## The fundamental theorem, version 2

**Theorem.** Let $F$ be differentiable on $[a,b]$ and suppose $f=F'$ is Riemann integrable on $[a,b]$. Then

$$
\int_a^b f(x)\,dx=F(b)-F(a).
$$

The lecture leaves the proof to the notes; here is the argument, which uses only the mean value theorem and the criterion.

**Proof.** Take any partition $P=\{a=x_0<\cdots<x_n=b\}$. On each subinterval the mean value theorem gives $c_i\in(x_{i-1},x_i)$ with

$$
F(x_i)-F(x_{i-1})=F'(c_i)(x_i-x_{i-1})=f(c_i)\Delta x_i .
$$

Summing over $i$, the left side telescopes:

$$
F(b)-F(a)=\sum_{i=1}^n f(c_i)\Delta x_i .
$$

Each $f(c_i)$ lies between the infimum and supremum on its subinterval, so the sum lies between $L(f,P)$ and $U(f,P)$:

$$
L(f,P)\le F(b)-F(a)\le U(f,P).
$$

This holds for **every** partition. Since $f$ is integrable, passing to suprema and infima gives

$$
\int_a^b f\le F(b)-F(a)\le\int_a^b f,
$$

so $F(b)-F(a)=\int_a^b f$. $\square$

The hypothesis "$f$ is integrable" cannot be dropped: a derivative need not be Riemann integrable (derivatives can have bad discontinuities), and then the identity may fail.

### Example

$$
\int_0^1 x^2\,dx .
$$

Take $F(x)=x^3/3$, so $F'=x^2$ and $x^2$ is continuous, hence integrable. Version 2 gives

$$
\int_0^1 x^2\,dx=F(1)-F(0)=\frac13-0=\frac13 .
$$

What would take a long computation with upper and lower sums now takes one step. That is the point of the theorem: **it turns integration from "take a limit" into "find an antiderivative"**.

## Improper integrals

A definite integral requires a bounded interval and a bounded function. Dropping either condition forces a limit.

### Type 1: unbounded interval

Suppose $f$ is integrable on $[a,b]$ for every $b>a$. If

$$
\lim_{b\to\infty}\int_a^b f(x)\,dx
$$

exists, define

$$
\int_a^\infty f(x)\,dx=\lim_{b\to\infty}\int_a^b f(x)\,dx,
$$

and call the improper integral **convergent**; otherwise **divergent**.

**Example 1.**

$$
\int_1^\infty\frac{dx}{x^2}.
$$

Take $F(x)=-1/x$, so $F'=1/x^2$. For finite $b$,

$$
\int_1^b\frac{dx}{x^2}=F(b)-F(1)=-\frac1b+1 .
$$

As $b\to\infty$, $-1/b\to0$, so

$$
\int_1^\infty\frac{dx}{x^2}=1 .
$$

The curve runs on forever, yet the area is finite.

**Example 2.**

$$
\int_1^\infty\frac{dx}{x}.
$$

Take $F(x)=\log x$. Then

$$
\int_1^b\frac{dx}{x}=\log b-\log1=\log b\to\infty .
$$

Divergent. Both functions tend to $0$, but $1/x^2$ decays fast enough and $1/x$ does not — the same boundary that recurs in series tests.

### Type 2: unbounded function

Suppose $f$ is integrable on $[c,b]$ for every $c>a$ (possibly unbounded or undefined near $a$). If

$$
\lim_{c\to a^+}\int_c^b f(x)\,dx
$$

exists, define

$$
\int_a^b f(x)\,dx=\lim_{c\to a^+}\int_c^b f(x)\,dx .
$$

**Example 3.**

$$
\int_0^1\frac{dx}{\sqrt x}.
$$

Take $F(x)=2\sqrt x$, so $F'=1/\sqrt x$. For $a>0$,

$$
\int_a^1\frac{dx}{\sqrt x}=F(1)-F(a)=2-2\sqrt a .
$$

As $a\to0^+$, $\sqrt a\to0$, so

$$
\int_0^1\frac{dx}{\sqrt x}=2 .
$$

The function blows up near $0$, but the area is still finite.

**Example 4.**

$$
\int_0^1\frac{dx}{x}.
$$

Take $F(x)=\log x$. For $a>0$,

$$
\int_a^1\frac{dx}{x}=\log1-\log a=-\log a\to+\infty .
$$

Divergent. The singularity of $1/\sqrt x$ is mild; the singularity of $1/x$ is too strong.

## Arc length

The lecture ends with a definition, not developed further. Let

$$
\gamma(s)=\big(f(s),g(s)\big),
\qquad s\in[a,b],
$$

be a plane curve with $f,g$ differentiable and derivatives continuous. Its arc length is defined as

$$
L=\int_a^b\sqrt{f'(s)^2+g'(s)^2}\;ds .
$$

The intuition: when $s$ increases by a tiny $ds$, the horizontal change is $f'(s)\,ds$ and the vertical change is $g'(s)\,ds$; by Pythagoras the piece of curve is approximately

$$
\sqrt{(f'\,ds)^2+(g'\,ds)^2}=\sqrt{f'^2+g'^2}\;ds .
$$

Adding all these small pieces gives the integral. It is still only a definition; the next lecture asks whether it is well defined and independent of the parametrization.

## What this lecture establishes

- The integral is linear, monotone and additive over subintervals; the sum proof hinges on $\sup(f+g)\le\sup f+\sup g$ and $\inf(f+g)\ge\inf f+\inf g$.
- Additivity requires inserting $c$ into the partition before splitting the sums.
- $\left|\int_a^b f\right|\le\int_a^b|f|$.
- Version 1: $F(x)=\int_a^x f$ is differentiable with $F'=f$, proved by squeezing.
- Version 2: if $F'=f$ and $f$ is integrable, then $\int_a^b f=F(b)-F(a)$, proved by the mean value theorem and a telescoping sum.
- Improper integrals are limits, for unbounded intervals or unbounded functions: $\int_1^\infty x^{-2}=1$, $\int_1^\infty x^{-1}$ diverges, $\int_0^1 x^{-1/2}=2$, $\int_0^1 x^{-1}$ diverges.
- Arc length is $\int_a^b\sqrt{f'^2+g'^2}\,ds$.

## Comprehension check

**1. Prove that $f+g$ is integrable with $\int(f+g)=\int f+\int g$. Why is $\sup(f+g)\le\sup f+\sup g$ usually strict?**

Reference answer: Given $\varepsilon>0$, choose a partition $P$ making both $U(f,P)-L(f,P)<\varepsilon/2$ and $U(g,P)-L(g,P)<\varepsilon/2$ (take partitions for each function, then their common refinement). On every subinterval $\sup(f+g)\le\sup f+\sup g$ and $\inf(f+g)\ge\inf f+\inf g$, so $U(f+g,P)-L(f+g,P)\le[U(f,P)-L(f,P)]+[U(g,P)-L(g,P)]<\varepsilon$, and the criterion gives integrability. The equality follows by squeezing: $L(f,P)+L(g,P)\le L(f+g,P)\le U(f+g,P)\le U(f,P)+U(g,P)$, then taking suprema and infima. The supremum inequality is usually strict: if $g=-f$, then $f+g\equiv0$ and $\sup(f+g)=0$, while $\sup f+\sup g$ can be positive because $f$ takes both signs on the interval.

**2. Prove that integrability on $[a,b]$ implies integrability on $[a,c]$. What role does refinement play?**

Reference answer: Given $\varepsilon>0$, take $P$ with $U(f,P)-L(f,P)<\varepsilon$. If $c\notin P$, insert it to get the refinement $P^*$; refinement decreases the gap, so $U(f,P^*)-L(f,P^*)<\varepsilon$. Restricting $P^*$ to $[a,c]$ gives a partition there, and

$$
U(f,P^*)-L(f,P^*)=\big(U_{[a,c]}-L_{[a,c]}\big)+\big(U_{[c,b]}-L_{[c,b]}\big).
$$

Both terms are nonnegative and their sum is below $\varepsilon$, so the first is below $\varepsilon$, and the criterion applies on $[a,c]$. Refinement is what makes $c$ a division point; otherwise $c$ lies inside a subinterval and the sums cannot be split.

**3. Prove $\left|\int_a^b f\right|\le\int_a^b|f|$.**

Reference answer: For every $x$, $f(x)\le|f(x)|$ and $-f(x)\le|f(x)|$. Monotonicity gives $\int f\le\int|f|$ and $\int(-f)\le\int|f|$, and linearity turns the second into $-\int f\le\int|f|$. Hence $-\int|f|\le\int f\le\int|f|$, which is the claim. The argument presupposes that $|f|$ is integrable; otherwise the right side is undefined.

**4. Prove version 1 of the fundamental theorem and say where continuity is used.**

Reference answer: Let $F(x)=\int_a^x f$ and fix $x_0$. For $x>x_0$, $F(x)-F(x_0)=\int_{x_0}^x f$. On $[x_0,x]$, continuity gives a minimum $m$ and maximum $M$, so $m(x-x_0)\le\int_{x_0}^x f\le M(x-x_0)$, and dividing by $x-x_0$ gives $m\le\frac{F(x)-F(x_0)}{x-x_0}\le M$. As $x\to x_0^+$, continuity gives $M,m\to f(x_0)$, so the right derivative is $f(x_0)$; the left side is analogous, with inequalities reversed because the denominator is negative. Continuity is used precisely here: it makes the extrema converge to $f(x_0)$ as the interval shrinks. Without continuity at the point, $F$ is still differentiable, but its derivative is a limit of averages and need not equal $f(x_0)$.

**5. Prove version 2 using the mean value theorem, and explain why $f=F'$ must be integrable.**

Reference answer: For any partition $P$, the mean value theorem on each subinterval gives $c_i$ with $F(x_i)-F(x_{i-1})=f(c_i)\Delta x_i$. Summing telescopes the left side to $F(b)-F(a)$ and leaves $\sum f(c_i)\Delta x_i$, which lies between $L(f,P)$ and $U(f,P)$. Since this holds for every partition, $\int f\le F(b)-F(a)\le\int f$, hence equality. Integrability of $f=F'$ is required because the squeeze only makes sense when the lower and upper integrals coincide; if the derivative is not integrable the integral may not exist and the identity has no meaning.

**6. Determine convergence of $\int_1^\infty x^{-2}\,dx$ and $\int_1^\infty x^{-1}\,dx$, and explain the difference.**

Reference answer: $\int_1^b x^{-2}\,dx=[-1/x]_1^b=1-1/b\to1$, convergent; $\int_1^b x^{-1}\,dx=[\log x]_1^b=\log b\to\infty$, divergent. Both integrands tend to $0$; the difference is speed. The tail area of $x^{-2}$ decays like $1/b$ and has finite total; the logarithm grows without bound, slowly but surely. In partition language, $x^{-1}$ contributes roughly $1/k$ on the unit interval far out, and the harmonic series $\sum1/k$ diverges — the integral and the series draw the same boundary.

## Relation to neighbouring lectures

Version 1 says the integral of a continuous function is one of its antiderivatives; version 2 says the difference of an antiderivative at the endpoints is the integral. Together they turn calculus from "approximate by rectangles" into "differentiate and evaluate".

The next lecture turns to sequences of functions: pointwise versus uniform convergence, and why uniform convergence is what allows limits to pass through integrals and derivatives. Every estimate in this lecture — squeezing, the absolute value bound, additivity over subintervals — is used there. Later, improper integrals and series tests share the same comparison tools, and arc length returns in the study of curves and surfaces.
