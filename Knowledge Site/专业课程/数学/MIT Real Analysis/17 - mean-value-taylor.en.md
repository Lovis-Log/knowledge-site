---
slug: 17-mean-value-taylor
title: "Rolle, the Mean Value Theorem, and Taylor Expansion: Turning Derivatives into Estimates"
summary: "Starting from the vanishing of the derivative at an interior extremum, we prove Rolle's theorem and derive the mean value theorem and Cauchy's mean value theorem from it. Applying Rolle repeatedly then yields the first-order and general Taylor formulas with a remainder term."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, mean-value-theorem, rolle-theorem, taylor-series]
sources:
  - kind: video
    title: "Lecture 16: Rolle’s Theorem; Mean Theorem; L’Hôpital’s Rule; Taylor Expansion"
    url: https://www.youtube.com/watch?v=v9lcA7lwLlo
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## What this lecture accomplishes

The previous lecture built derivatives and the differentiation rules. This one turns them into a set of **estimation tools**. The whole chain has four links:

1. Differentiable with an interior local extremum implies the derivative vanishes — an observation that barely needs proof.
2. Rolle's theorem: equal heights at the endpoints force a horizontal tangent somewhere inside.
3. The mean value theorem: the average slope is attained somewhere; then Cauchy's version.
4. Applying Rolle repeatedly writes a function near a point as a polynomial plus an estimable remainder — Taylor expansion.

Each step is only a corollary of the previous one, yet the last answers a very practical question: **how large is the error when a polynomial replaces a function?**

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: differentiability, differentiability implies continuity, sum/scalar/Leibniz/quotient/chain rules |
| 5:34 | Local maxima and local minima |
| 10:00 | Theorem: the derivative vanishes at an interior extremum (proof) |
| 17:38 | Critical points; the examples $x^2$ and $x^3$ |
| 20:15 | Rolle's theorem and its three-case proof |
| 25:49 | The mean value theorem via an auxiliary function |
| 32:42 | Cauchy's mean value theorem |
| 43:59 | Taylor expansion: the first-order case first |
| 1:04:07 | The general $(k-1)$-st Taylor polynomial and remainder |
| 1:17:14 | L'Hôpital's rule deferred to the next lecture |

## Recap: differentiability and five rules

$f$ is differentiable at $x_0$ when the difference quotient

$$
\frac{f(x)-f(x_0)}{x-x_0}
$$

has a limit as $x\to x_0$ with $x\ne x_0$; that limit is $f'(x_0)$. The previous lecture proved that **differentiability implies continuity** and established five rules — sum, scalar multiple, the Leibniz product rule, the quotient rule (with nonzero denominator), and the chain rule:

$$
(fg)'=f'g+fg',
\qquad
\left(\frac fg\right)'=\frac{f'g-fg'}{g^2},
\qquad
(g\circ f)'(x)=g'\big(f(x)\big)f'(x).
$$

Together these let us differentiate polynomials, rational functions and sufficiently smooth composites without further thought.

## Local extrema

Let $f$ be defined on an open interval containing $x_0$. Say $f$ has a **local maximum** at $x_0$ if there is $\delta>0$ such that

$$
f(x)\le f(x_0)\quad\text{for all }x\text{ with }|x-x_0|<\delta .
$$

A local minimum reverses the inequality. Two points matter:

- Only a neighbourhood of $x_0$ is involved; values far away are irrelevant.
- Neither differentiability nor even continuity is required.

The picture in the lecture: a local maximum is merely the highest point in some small window, while outside that window the function may climb much higher. Every global maximum is local, but not conversely.

## The derivative vanishes at an interior extremum

**Theorem (Fermat).** Let $f$ be differentiable on an interval, let $x_0$ be an **interior** point, and suppose $f$ has a local maximum or minimum at $x_0$. Then

$$
f'(x_0)=0 .
$$

The interior condition is essential: at an endpoint a function can attain its maximum with nonzero slope.

**Proof.** Take a local maximum; the minimum case is symmetric. Fix $\delta>0$ from the definition.

**Right-hand side.** For $x_0<x<x_0+\delta$ we have $f(x)\le f(x_0)$, so the numerator is nonpositive while $x-x_0>0$, hence

$$
\frac{f(x)-f(x_0)}{x-x_0}\le 0 .
$$

Letting $x\to x_0^+$, the quotient tends to $f'(x_0)$, and limits preserve weak inequalities, so

$$
f'(x_0)\le 0 .
$$

**Left-hand side.** For $x_0-\delta<x<x_0$ the numerator is still nonpositive, but now $x-x_0<0$, hence

$$
\frac{f(x)-f(x_0)}{x-x_0}\ge 0 .
$$

Letting $x\to x_0^-$ gives

$$
f'(x_0)\ge 0 .
$$

Combining, $0\le f'(x_0)\le0$, so $f'(x_0)=0$. $\square$

The key move is to approach **from both sides**: the numerator is always nonpositive, while the denominator flips sign, so the two one-sided limits have opposite signs — and they must be equal.

If $f'(x_0)=0$, call $x_0$ a **critical point** of $f$.

## Two examples: the converse fails

- $f(x)=x^2$ has $f'(x)=2x$, so $x=0$ is the only critical point, and it is a genuine (indeed global) minimum.
- $f(x)=x^3$ has $f'(x)=3x^2$, so $x=0$ is critical, yet $x^3$ takes smaller values to the left and larger values to the right: **no extremum**. The graph flattens at the origin and then keeps rising.

So vanishing derivative is only a **necessary** condition. To decide whether a critical point is an extremum, inspect the sign of the derivative on either side, or use higher derivatives.

## Rolle's theorem

**Theorem.** Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$, with $f(a)=f(b)$. Then some $x_0\in(a,b)$ satisfies

$$
f'(x_0)=0 .
$$

The hypothesis is "equal heights at the ends", not necessarily zero.

**Proof.** Exactly one of three cases occurs:

1. $f$ is constant on $[a,b]$. Then $f'\equiv0$ and any interior point works.
2. Some $x$ has $f(x)>f(a)$.
3. Some $x$ has $f(x)<f(a)$.

Case 2: since $f$ is continuous, the extreme value theorem gives a maximum on $[a,b]$. Because some value strictly exceeds the endpoint value, the maximum cannot occur at an endpoint; it occurs at an interior point $x_0$. That point is a local maximum, so Fermat's theorem gives $f'(x_0)=0$.

Case 3 is the same with the minimum instead of the maximum. $\square$

Two previously established facts do all the work: **a continuous function on a closed interval attains its extrema**, and **the derivative vanishes at an interior extremum**. Rolle's theorem introduces no new idea; it merely joins them.

## The mean value theorem (Lagrange)

**Theorem.** Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then some $x_0\in(a,b)$ satisfies

$$
f'(x_0)=\frac{f(b)-f(a)}{b-a}.
$$

The right side is the slope of the chord joining the endpoints — the average rate of change. The theorem says: **the average slope is attained as an instantaneous slope somewhere**.

**Proof.** Define the auxiliary function

$$
h(x)=f(x)-\frac{f(b)-f(a)}{b-a}(x-a).
$$

Geometrically this is the function minus the chord: $h$ is the vertical gap between the graph and the chord.

Rolle's hypotheses hold: $h$ is $f$ minus a linear function, hence continuous and differentiable. Check the endpoints:

$$
h(a)=f(a)-\frac{f(b)-f(a)}{b-a}\cdot 0=f(a),
$$

$$
h(b)=f(b)-\frac{f(b)-f(a)}{b-a}(b-a)=f(b)-\big(f(b)-f(a)\big)=f(a).
$$

So $h(a)=h(b)$. Rolle gives $x_0\in(a,b)$ with $h'(x_0)=0$. Since

$$
h'(x)=f'(x)-\frac{f(b)-f(a)}{b-a},
$$

setting it to zero is exactly the claim. $\square$

**Where does the auxiliary function come from?** Rolle needs equal endpoint values. The graph and its chord coincide at $a$ and at $b$, so "function minus chord" automatically satisfies the endpoint condition; and its derivative is "$f'$ minus the average slope". That is the entire motivation.

## Cauchy's mean value theorem

**Theorem.** Let $f,g$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then some $x_0\in(a,b)$ satisfies

$$
f'(x_0)\big(g(b)-g(a)\big)=g'(x_0)\big(f(b)-f(a)\big).
$$

If $g(b)\ne g(a)$ and $g'(x_0)\ne0$, this can be written

$$
\frac{f'(x_0)}{g'(x_0)}=\frac{f(b)-f(a)}{g(b)-g(a)}.
$$

It looks like "the mean value theorem for two functions at once". Applied separately, the ordinary theorem gives one point for $f$ and possibly a different point for $g$; the Cauchy version guarantees **one point satisfying both**. That is not obvious.

**Proof.** Move everything to one side and set

$$
h(x)=f(x)\big(g(b)-g(a)\big)-g(x)\big(f(b)-f(a)\big).
$$

Then $h$ is continuous and differentiable, with

$$
h'(x)=f'(x)\big(g(b)-g(a)\big)-g'(x)\big(f(b)-f(a)\big),
$$

which is precisely the expression to be made zero. At the endpoints,

$$
h(a)=f(a)\big(g(b)-g(a)\big)-g(a)\big(f(b)-f(a)\big)
=f(a)g(b)-g(a)f(b),
$$

$$
h(b)=f(b)g(b)-f(b)g(a)-g(b)f(b)+g(b)f(a)
=f(a)g(b)-g(a)f(b).
$$

They agree, so $h(a)=h(b)$ and Rolle gives $x_0$ with $h'(x_0)=0$, which is the claim. $\square$

**Relation to the ordinary theorem.** Take $g(x)=x$. Then $g(b)-g(a)=b-a$ and $g'(x_0)=1$, and Cauchy's identity becomes

$$
f'(x_0)(b-a)=f(b)-f(a),
$$

the ordinary mean value theorem. The Cauchy form is therefore the more general statement.

## Taylor expansion: first order

Let $f$ be differentiable with $f'$ differentiable (so $f$ is twice differentiable). Near $a$, approximate by the linear polynomial

$$
P_1(x)=f(a)+f'(a)(x-a).
$$

It matches value and first derivative: $P_1(a)=f(a)$ and $P_1'(a)=f'(a)$. The question is the size of the error.

**Theorem (first-order Taylor).** Let $f$ be twice differentiable on an interval containing $a$ and $b$. Then some $c$ strictly between $a$ and $b$ satisfies

$$
f(b)=P_1(b)+\frac{f''(c)}{2}(b-a)^2 .
$$

The remainder $\dfrac{f''(c)}{2}(b-a)^2$ is controllable as soon as a bound on $f''$ is known.

**Proof (Rolle twice).** Fix $a,b$ and define the number

$$
M=\frac{2\big(f(b)-P_1(b)\big)}{(b-a)^2},
$$

so that, by construction,

$$
f(b)-P_1(b)-\frac{M}{2}(b-a)^2=0 .
$$

Set

$$
h(x)=f(x)-P_1(x)-\frac{M}{2}(x-a)^2 .
$$

Then $h(b)=0$ by the definition of $M$, and

$$
h(a)=f(a)-P_1(a)-0=0,
$$

because $(a-a)^2=0$ and $P_1(a)=f(a)$.

Thus $h(a)=h(b)$, and Rolle gives $c_1\in(a,b)$ with $h'(c_1)=0$.

Next,

$$
h'(x)=f'(x)-f'(a)-M(x-a),
$$

since $P_1'(x)=f'(a)$. At $x=a$,

$$
h'(a)=f'(a)-f'(a)-0=0 .
$$

Apply Rolle to $h'$ on $[a,c_1]$ — both endpoints vanish — to get $c_2\in(a,c_1)$ with $h''(c_2)=0$.

Finally,

$$
h''(x)=f''(x)-M,
$$

because $P_1$ has zero second derivative and $\frac{M}{2}(x-a)^2$ has second derivative $M$. Hence

$$
0=h''(c_2)=f''(c_2)-M
\implies
M=f''(c_2).
$$

Substituting back into the definition of $M$ gives the formula, with $c=c_2\in(a,b)$. $\square$

## The general Taylor formula

Repeating the argument $k$ times gives the $k$-th order version. Let $f$ be $k$ times differentiable on an interval containing $a$ and $b$, and define the Taylor polynomial of degree $k-1$

$$
P_{k-1}(x)=\sum_{i=0}^{k-1}\frac{f^{(i)}(a)}{i!}(x-a)^i
=f(a)+f'(a)(x-a)+\frac{f''(a)}{2!}(x-a)^2+\cdots+\frac{f^{(k-1)}(a)}{(k-1)!}(x-a)^{k-1}.
$$

**Theorem (Taylor with Lagrange remainder).** Some $c$ strictly between $a$ and $b$ satisfies

$$
f(b)=P_{k-1}(b)+\frac{f^{(k)}(c)}{k!}(b-a)^k .
$$

The last term is the **remainder**. For $k=2$ this is the previous result, since $P_1$ is the polynomial of degree $1$ and the remainder is divided by $2!$.

**Proof sketch.** Identical to the case $k=2$, just repeated.

1. Put $M=\dfrac{k!\,\big(f(b)-P_{k-1}(b)\big)}{(b-a)^k}$, so that $h(b)=0$ for

$$
h(x)=f(x)-P_{k-1}(x)-\frac{M}{k!}(x-a)^k .
$$

2. $h(a)=0$, because $P_{k-1}(a)=f(a)$ and $(a-a)^k=0$.

3. Rolle gives $c_1\in(a,b)$ with $h'(c_1)=0$.

4. For $j=1,\dots,k-1$, the $j$-th derivative of $P_{k-1}$ at $a$ equals $f^{(j)}(a)$, while every derivative of $(x-a)^k$ of order below $k$ vanishes at $a$. Hence

$$
h^{(j)}(a)=0,\qquad j=0,1,\dots,k-1 .
$$

5. Apply Rolle to $h'$ on $[a,c_1]$ to get $c_2\in(a,c_1)$ with $h''(c_2)=0$; then apply Rolle to $h''$ on $[a,c_2]$, and so on. Each application moves the right endpoint leftward. The $k$-th application gives $c_k\in(a,b)$ with

$$
h^{(k)}(c_k)=0 .
$$

6. Since the $k$-th derivative of $P_{k-1}$ is zero and that of $\frac{M}{k!}(x-a)^k$ is $M$,

$$
h^{(k)}(x)=f^{(k)}(x)-M
\implies
M=f^{(k)}(c_k).
$$

Substituting into the definition of $M$ completes the proof. $\square$

The remainder is valuable because it is **estimable**: if $|f^{(k)}|\le C$ on the interval, then

$$
|f(b)-P_{k-1}(b)|\le \frac{C}{k!}|b-a|^k .
$$

The bound shrinks extremely fast in $k$ because the factorial sits in the denominator. For smooth functions, low-degree polynomials therefore give excellent local approximations — the practical meaning of Taylor expansion.

## What this lecture establishes

- Interior local extremum plus differentiability $\Rightarrow$ vanishing derivative; the converse fails ($x^3$).
- Rolle: equal endpoint heights force a horizontal tangent inside; the proof uses the extreme value theorem and Fermat.
- Mean value theorem: $f'(x_0)=\dfrac{f(b)-f(a)}{b-a}$, via "function minus chord".
- Cauchy: $f'(x_0)\big(g(b)-g(a)\big)=g'(x_0)\big(f(b)-f(a)\big)$; taking $g(x)=x$ recovers the ordinary theorem.
- First-order Taylor: $f(b)=f(a)+f'(a)(b-a)+\dfrac{f''(c)}{2}(b-a)^2$.
- General Taylor: $f(b)=P_{k-1}(b)+\dfrac{f^{(k)}(c)}{k!}(b-a)^k$, proved by applying Rolle $k$ times.
- L'Hôpital's rule appears in the notes but was deferred in class.

## Comprehension check

**1. Prove Fermat's theorem from the definition of a local extremum using one-sided difference quotients, and explain why $x_0$ must be interior.**

Reference answer: Suppose $x_0$ is a local maximum and take $\delta>0$ from the definition. For $0<x-x_0<\delta$ the numerator $f(x)-f(x_0)\le0$ and the denominator is positive, so the quotient is $\le0$; letting $x\to x_0^+$ gives $f'(x_0)\le0$. For $-\delta<x-x_0<0$ the numerator is still $\le0$ but the denominator is negative, so the quotient is $\ge0$; letting $x\to x_0^-$ gives $f'(x_0)\ge0$. Both one-sided limits equal $f'(x_0)$, hence $f'(x_0)=0$. Interiority is needed because the argument must approach from both sides; at an endpoint only one side is available and only one inequality survives. For instance $f(x)=x$ on $[0,1]$ attains its maximum at $x=1$, yet $f'(1)=1\ne0$.

**2. Give an example of a point where the derivative vanishes but there is no extremum, and explain why Rolle's theorem cannot be run backwards.**

Reference answer: $f(x)=x^3$ has $f'(x)=3x^2$, so $f'(0)=0$, but $f(x)<f(0)$ for $x<0$ and $f(x)>f(0)$ for $x>0$; the origin is neither a maximum nor a minimum. Rolle only asserts the existence of a point with zero derivative. Its converse would claim that a zero derivative forces equal endpoint heights on some interval, which is false: around the origin of $x^3$ choose any $[a,b]$; then $f(a)\ne f(b)$ while $f'(0)=0$ still holds. The theorem gives existence, never location, and cannot be inverted.

**3. How is the auxiliary function $h(x)=f(x)-\dfrac{f(b)-f(a)}{b-a}(x-a)$ discovered?**

Reference answer: Rolle requires equal values at the endpoints. The graph of $f$ and the chord $L(x)=f(a)+\frac{f(b)-f(a)}{b-a}(x-a)$ agree there: $L(a)=f(a)$ and $L(b)=f(b)$. Hence $h=f-L$ satisfies $h(a)=h(b)=0$. Moreover $h'=f'-\frac{f(b)-f(a)}{b-a}$, so $h'=0$ is exactly the conclusion. Geometrically $h$ is the vertical distance from the graph to the chord, and the mean value theorem says that this distance has a critical point, i.e. the tangent is parallel to the chord.

**4. Prove Cauchy's mean value theorem and verify that $g(x)=x$ recovers the ordinary one.**

Reference answer: Set $h(x)=f(x)(g(b)-g(a))-g(x)(f(b)-f(a))$. It is continuous and differentiable, with

$$
h'(x)=f'(x)\big(g(b)-g(a)\big)-g'(x)\big(f(b)-f(a)\big).
$$

At the endpoints, $h(a)=f(a)g(b)-g(a)f(b)$ and $h(b)=f(b)g(b)-f(b)g(a)-g(b)f(b)+g(b)f(a)=f(a)g(b)-g(a)f(b)$, so the values agree. Rolle yields $h'(x_0)=0$, i.e. $f'(x_0)(g(b)-g(a))=g'(x_0)(f(b)-f(a))$. With $g(x)=x$ we get $g(b)-g(a)=b-a$ and $g'(x_0)=1$, leaving $f'(x_0)(b-a)=f(b)-f(a)$.

**5. Why does the proof of Taylor's theorem apply Rolle repeatedly, and what is the role of $M$?**

Reference answer: $M$ is a constant chosen so that $f(b)-P_{k-1}(b)-\frac{M}{k!}(b-a)^k=0$, which makes the auxiliary function $h(x)=f(x)-P_{k-1}(x)-\frac{M}{k!}(x-a)^k$ vanish at $b$. Because $P_{k-1}$ matches $f$ in value and in all derivatives up to order $k-1$ at $a$, and because every derivative of $(x-a)^k$ of order below $k$ vanishes at $a$, we get $h^{(j)}(a)=0$ for $j=0,\dots,k-1$. That supplies $k$ pairs of equal endpoints: $(h(a),h(b))$, $(h'(a),h'(c_1))$, and so on. Each Rolle application raises the derivative order by one and moves the right endpoint left; the $k$-th gives $h^{(k)}(c)=0$. Since $h^{(k)}=f^{(k)}-M$, this forces $M=f^{(k)}(c)$. In short, $M$ converts the unknown remainder coefficient into a constant that satisfies the endpoint conditions Rolle needs.

## Relation to neighbouring lectures

Rolle's theorem is the single engine here, producing the mean value theorem, Cauchy's theorem and Taylor's formula. The next lecture first uses Cauchy's theorem to prove L'Hôpital's rule (explicitly postponed), then applies Taylor polynomials to concrete functions and begins constructing the Riemann integral. Later, Taylor remainders become a basic tool for testing convergence of series and bounding integration errors.

Note the **reuse pattern** in these proofs: one local observation about extrema, wrapped in different auxiliary functions, answers apparently unrelated questions — where the average slope is attained, and how large the gap between a function and a polynomial can be. Finding an auxiliary function that turns a problem into Rolle's theorem is one of the most common techniques in real analysis.
