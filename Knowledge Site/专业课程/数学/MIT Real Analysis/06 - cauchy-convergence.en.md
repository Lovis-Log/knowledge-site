---
slug: "06-cauchy-convergence"
title: "The Cauchy Convergence Theorem: Proving Existence Without Guessing the Limit"
summary: "We prove that Cauchy sequences are bounded, deduce the Cauchy convergence theorem from Bolzano–Weierstrass, use it to prove the contraction mapping theorem (existence and uniqueness of fixed points), illustrate with Newton's method, and close with ε-δ continuity and the extreme value theorem."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [mathematics]
tags: [real-analysis, cauchy-sequence, contraction-mapping, continuity, extreme-value-theorem]
sources:
  - kind: video
    title: "Lecture 6: Cauchy Convergence Theorem"
    url: "https://www.youtube.com/watch?v=WCCpss6udNs"
    author: "Tobias Holck Colding, MIT OpenCourseWare"
    publishedAt: "2025-09-02"
---

## Why a Cauchy criterion

Until now, proving convergence meant guessing the limit and verifying it with the $\varepsilon$-$N$ definition. But many limits have no closed form — solutions of differential equations and fixed points of contractions, for example.

The Cauchy criterion rewrites "a limit exists" as a condition **about the sequence alone**: distant terms crowd together. Its value is that one can prove existence without knowing the limit.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: monotone convergence and Cauchy sequences |
| 3:53 | Theorem: Cauchy sequences are bounded |
| 9:27 | The Cauchy convergence theorem; the contraction mapping theorem |
| 14:41 | A contraction has at most one fixed point |
| 21:36 | The Cauchy estimate for the iteration $a_{n+1}=T(a_n)$ |
| 28:09 | Proving the contraction mapping theorem via Cauchy convergence |
| 38:06 | Newton's method as an application |
| 50:17 | The Bolzano–Weierstrass theorem (proved next lecture) |
| 59:08 | Continuity and the extreme value theorem |

## Cauchy sequences

**Definition.** A sequence $(x_n)$ is **Cauchy** if

$$
\forall\varepsilon>0\ \exists N\ \forall n,m\ge N:\quad |x_n-x_m|<\varepsilon .
$$

Unlike convergence, no candidate limit $a$ appears. Intuitively: convergence says distant terms cluster around $a$; Cauchy says distant terms cluster around each other.

**Theorem.** Every Cauchy sequence is bounded.

**Proof.** Apply the Cauchy condition with $\varepsilon=1$, obtaining $N$ such that $|x_n-x_m|<1$ whenever $n,m\ge N$.

Fix $m=N$. Then for every $n\ge N$,

$$
|x_n|=|x_n-x_N+x_N|\le|x_n-x_N|+|x_N|<1+|x_N| .
$$

Only $x_1,\dots,x_{N-1}$ remain, finitely many. Let

$$
M=\max\{|x_1|,\dots,|x_{N-1}|,\,1+|x_N|\},
$$

so $|x_n|\le M$ for all $n$. $\square$

The device is identical to "convergent implies bounded" from Lecture 4: **fix a reference point $m=N$, control the tail with the triangle inequality, bound the head by a maximum**. Only the reference changes from the limit $a$ to the $N$-th term itself.

## The Cauchy convergence theorem

**Theorem.** In $\mathbb R$, a sequence converges if and only if it is Cauchy.

"Convergent ⇒ Cauchy" is easy: if $x_n\to x$, given $\varepsilon>0$ choose $N$ with $|x_n-x|<\varepsilon/2$ for $n\ge N$. Then for $n,m\ge N$,

$$
|x_n-x_m|\le|x_n-x|+|x-x_m|<\frac\varepsilon2+\frac\varepsilon2=\varepsilon .
$$

The converse needs completeness. The lecture derives it from the **Bolzano–Weierstrass theorem** (proved next lecture):

> Every bounded sequence has a convergent subsequence.

**Proof (Cauchy ⇒ convergent).** Let $(x_n)$ be Cauchy.

By the previous theorem it is bounded. By Bolzano–Weierstrass there is a subsequence $x_{n_k}\to x$.

We show the whole sequence converges to $x$. Given $\varepsilon>0$:

- Cauchy gives $N_1$ with $|x_n-x_m|<\varepsilon/2$ for $n,m\ge N_1$.
- Subsequence convergence gives $N_2$ with $|x_{n_k}-x|<\varepsilon/2$ for $k\ge N_2$.

Choose $k\ge N_2$ with $n_k\ge N_1$ (possible since $n_k$ strictly increases to infinity). Let $N=\max\{N_1,n_k\}$. For $n\ge N$,

$$
|x_n-x|\le|x_n-x_{n_k}|+|x_{n_k}-x|<\frac\varepsilon2+\frac\varepsilon2=\varepsilon .
$$

Hence $x_n\to x$. $\square$

The logic: **the subsequence supplies an anchor with a known limit, and the Cauchy property prevents the rest of the sequence from drifting away from it**. The subsequence's convergence rests on Bolzano–Weierstrass, whose proof uses completeness — so the theorem is another face of completeness.

## Contractions

**Definition.** A map $T:\mathbb R\to\mathbb R$ is a **contraction** if there is a constant $c$ with

1. $c\ge0$;
2. $c<1$;
3. $|T(x)-T(y)|\le c|x-y|$ for **all** $x,y$.

The third point insists on a single $c$: one cannot use one constant for one pair and another constant for another.

**Definition.** $x$ is a **fixed point** of $T$ if $T(x)=x$.

**Lemma.** A contraction has at most one fixed point.

**Proof.** Let $x,y$ both be fixed points. Then

$$
|x-y|=|T(x)-T(y)|\le c|x-y| .
$$

Rearranging, $(1-c)|x-y|\le0$. Since $c<1$, $1-c>0$, so $|x-y|\le0$, i.e. $x=y$. $\square$

One line, and the key is $c<1$: with $c=1$ the inequality $(1-c)|x-y|\le0$ gives nothing, and the claim fails (the translation $T(x)=x+1$ has no fixed point).

## Why the iteration is Cauchy

"At most one" still leaves existence open. The construction is iteration: pick any $x$ and set

$$
a_0=x,
\qquad
a_{n+1}=T(a_n)=T^{n+1}(x).
$$

**Step one: consecutive distances shrink geometrically.** By contractivity,

$$
|a_{n+1}-a_n|=|T(a_n)-T(a_{n-1})|\le c|a_n-a_{n-1}| .
$$

Iterating,

$$
|a_{n+1}-a_n|\le c^n|a_1-a_0| .
$$

**Step two: any two terms are controlled.** For $m>n$, chain the intermediate differences:

$$
|a_m-a_n|\le\sum_{k=n}^{m-1}|a_{k+1}-a_k|
\le\sum_{k=n}^{m-1}c^k|a_1-a_0| .
$$

Summing the geometric series,

$$
\sum_{k=n}^{m-1}c^k\le\sum_{k=n}^{\infty}c^k=\frac{c^n}{1-c},
$$

hence

$$
|a_m-a_n|\le\frac{c^n}{1-c}\,|a_1-a_0| .
$$

Since $0\le c<1$, $c^n\to0$. Given $\varepsilon>0$, choose $n$ large enough that the right side is below $\varepsilon$; then all $m>n$ satisfy $|a_m-a_n|<\varepsilon$. So $(a_n)$ is Cauchy.

**Both hypotheses are used**: $c<1$ makes the geometric series converge; $c\ge0$ makes $c^n$ decrease to $0$. With $c=1$ the estimate becomes $(m-n)|a_1-a_0|$, unbounded in $m$, and the iterates may wander off.

## The contraction mapping theorem

**Theorem.** A contraction $T:\mathbb R\to\mathbb R$ has a unique fixed point.

**Proof.** Uniqueness is the lemma. For existence:

Pick any $a_0\in\mathbb R$ and set $a_{n+1}=T(a_n)$. By the previous section $(a_n)$ is Cauchy. By the Cauchy convergence theorem, $a_n\to a$ for some $a$.

Show $T(a)=a$. Contractivity gives

$$
|T(a_n)-T(a)|\le c|a_n-a|\to0,
$$

so $T(a_n)\to T(a)$. But $T(a_n)=a_{n+1}\to a$. A sequence has only one limit, so

$$
T(a)=a .
$$

Thus $a$ is a fixed point. $\square$

The theorem is constructive: **it asserts existence and simultaneously gives a method — iterate from any starting point**. Even without a closed form for the fixed point, one can approximate it arbitrarily well. That is exactly what makes it valuable for differential equations (ODE and PDE): rewrite the equation as $x=T(x)$, verify contractivity, and obtain existence and uniqueness. Lecture 24 carries this out.

## Newton's method: an application

To solve $f(x)=0$ with $f$ differentiable and $f'(x)\ne0$, define

$$
T(x)=x-\frac{f(x)}{f'(x)} .
$$

This is Newton's iteration: follow the tangent line down to the axis.

What does a fixed point mean? If $T(x_0)=x_0$, then

$$
x_0=x_0-\frac{f(x_0)}{f'(x_0)}
\implies
\frac{f(x_0)}{f'(x_0)}=0
\implies
f(x_0)=0 .
$$

So fixed points of $T$ are exactly zeros of $f$.

When is $T$ a contraction? Differentiate with the quotient rule:

$$
T'(x)=1-\frac{(f')^2-ff''}{(f')^2}
=\frac{ff''}{(f')^2} .
$$

By the mean value theorem, for $x\ne y$ there is $\xi$ between them with

$$
|T(x)-T(y)|=|T'(\xi)|\,|x-y| .
$$

Hence if on the relevant interval

$$
\left|\frac{f(x)f''(x)}{f'(x)^2}\right|\le c<1,
$$

then $T$ is a contraction and Newton's iteration converges to the unique zero.

A "good initial guess" now has a precise meaning: near the starting point, $|ff''|/(f')^2$ must be small. But the lecture warns that Newton's method only guarantees convergence inside a contracting region; one must also argue that the iterates never leave it, which the theorem alone does not supply.

## The Bolzano–Weierstrass theorem

> **Theorem.** Every bounded sequence has a convergent subsequence.

The proof comes in the next lecture. It has already been used twice here: to derive the Cauchy convergence theorem and to prove the extreme value theorem. It is equivalent to completeness — another way of saying that the real line has no gaps.

## Continuity and exchanging limits

The other application is the extreme value theorem, which needs continuity first.

**Definition.** $f$ is **continuous at** $x_0$ if

$$
\forall\varepsilon>0\ \exists\delta>0:\quad |x-x_0|<\delta\Rightarrow|f(x)-f(x_0)|<\varepsilon .
$$

$f$ is continuous if it is continuous at every point of its domain.

**Theorem (sequential characterisation).** If $f$ is continuous at $x$ and $x_n\to x$, then $f(x_n)\to f(x)$.

**Proof.** Given $\varepsilon>0$, continuity supplies $\delta>0$. Since $x_n\to x$, there is $N$ with $|x_n-x|<\delta$ for $n\ge N$. For those $n$, $|f(x_n)-f(x)|<\varepsilon$. $\square$

This translates continuity into "limits may pass through $f$": $\lim f(x_n)=f(\lim x_n)$. It is the bridge behind every extreme-value and intermediate-value argument.

## The extreme value theorem

**Theorem.** If $f$ is continuous on the closed interval $[a,b]$, then $f$ attains its maximum and minimum there: there are $x_M,x_m\in[a,b]$ with

$$
f(x_M)=\sup_{[a,b]}f,
\qquad
f(x_m)=\inf_{[a,b]}f .
$$

**Proof (maximum).** Let $S=\sup_{[a,b]}f$, temporarily allowing $S=+\infty$. By the definition of supremum there is a sequence $x_n\in[a,b]$ with

$$
f(x_n)\to S .
$$

(Take $\varepsilon=1/n$: since $S-1/n$ is not an upper bound, some $x_n$ has $f(x_n)>S-1/n$.)

Because $a\le x_n\le b$, the sequence $(x_n)$ is bounded. Bolzano–Weierstrass gives a subsequence $x_{n_k}\to X$. Since $[a,b]$ is closed, $X\in[a,b]$ (limits preserve non-strict inequalities: $a\le x_{n_k}\le b$ gives $a\le X\le b$).

By the sequential characterisation, $f(x_{n_k})\to f(X)$. On the other hand $(f(x_{n_k}))$ is a subsequence of a sequence converging to $S$, hence also converges to $S$. Limits are unique, so

$$
S=f(X).
$$

Thus $S$ is a finite real number attained by $f$: the supremum is a maximum. The minimum follows by applying the result to $-f$. $\square$

**The closed interval cannot be dropped.** On $(0,1)$, $f(x)=x$ has supremum $1$, which is never attained. In the proof, "$X\in[a,b]$" is exactly where endpoints being included matters.

## What this lecture establishes

- Cauchy sequences are bounded; the proof mirrors "convergent implies bounded" with $x_N$ as the reference point.
- In $\mathbb R$, Cauchy ⇔ convergent, via Bolzano–Weierstrass.
- A contraction uses one $c<1$ for all pairs; it has at most one fixed point since $(1-c)|x-y|\le0$.
- The iteration satisfies $|a_m-a_n|\le\dfrac{c^n}{1-c}|a_1-a_0|$, hence is Cauchy, yielding existence of a fixed point.
- Newton's method turns $f(x)=0$ into the fixed-point equation $T(x)=x-f/f'$, contracting when $T'=ff''/(f')^2<1$.
- Continuity ⇔ limits may pass through $f$; hence a continuous function on a closed interval attains its extrema.

## Comprehension check

**1. In the boundedness proof for Cauchy sequences, why fix $m=N$ after taking $\varepsilon=1$?**

Reference answer: The Cauchy condition gives $|x_n-x_m|<1$ for all $n,m\ge N$. To obtain an estimate for a single $x_n$, a fixed reference point must be introduced; taking $m=N$ gives $|x_n-x_N|<1$ for every $n\ge N$, and the triangle inequality then yields $|x_n|<1+|x_N|$. Without fixing $m$, the estimate would involve two quantities both varying with $n$ and no uniform bound would follow.

**2. Why does the proof of the Cauchy convergence theorem need Bolzano–Weierstrass? Can Cauchy-ness alone produce convergence?**

Reference answer: Cauchy-ness only says distant terms are close to each other; it cannot manufacture a limit point. Bolzano–Weierstrass uses boundedness to produce a convergent subsequence, supplying a candidate limit $x$; the Cauchy property then ties the whole sequence to that subsequence. Cauchy-ness alone fails in $\mathbb Q$ — the rational truncations of $\sqrt2$ form a Cauchy sequence with no limit — so completeness must enter, and Bolzano–Weierstrass is one of its equivalent forms.

**3. Why must a contraction use one $c$ for all $x,y$, with $c<1$? What happens when $c=1$?**

Reference answer: A single $c$ makes each step shrink the error by a fixed factor, turning successive differences into a geometric series. With $c=1$ the estimate becomes $|a_{n+1}-a_n|\le|a_n-a_{n-1}|$, which only says distances do not grow and cannot force them to zero; for example $T(x)=x+1$ satisfies $|T(x)-T(y)|=|x-y|$ yet has no fixed point. Uniqueness also needs $c<1$: $(1-c)|x-y|\le0$ yields $|x-y|=0$ only when $1-c>0$.

**4. Where does the geometric series come from in the Cauchy estimate, and where is $c\ge0$ used?**

Reference answer: From $|a_{k+1}-a_k|\le c^k|a_1-a_0|$, the triangle inequality expands $|a_m-a_n|$ into a sum of consecutive differences over $k=n,\dots,m-1$, giving $\sum c^k|a_1-a_0|$ — a geometric series bounded by $\frac{c^n}{1-c}|a_1-a_0|$. The condition $c\ge0$ makes $c^n$ decrease monotonically to $0$ and keeps the power estimates free of sign changes; for negative $c$ one usually replaces $c$ by $|c|$.

**5. Why must the extreme value theorem require a closed interval? Which step of the proof fails otherwise?**

Reference answer: The proof chooses $x_n\in[a,b]$ with $f(x_n)\to\sup f$, extracts $x_{n_k}\to X$ by Bolzano–Weierstrass, asserts $X\in[a,b]$, then uses continuity to get $\sup f=f(X)$. On an open interval $(a,b)$, $X$ might equal an endpoint where $f$ is undefined, so $f(X)$ makes no sense and the conclusion can fail: $f(x)=x$ on $(0,1)$ never attains its supremum $1$.

**6. Using the sequential characterisation, prove that continuity at $x$ and $x_n\to x$ imply $f(x_n)\to f(x)$. State how $\delta$ and $N$ depend on each other.**

Reference answer: Given $\varepsilon>0$, continuity gives $\delta>0$ depending only on $\varepsilon$ (and on $x$), such that $|y-x|<\delta$ implies $|f(y)-f(x)|<\varepsilon$. Since $x_n\to x$, for this fixed $\delta$ there is $N$ with $|x_n-x|<\delta$ for $n\ge N$. Then $|f(x_n)-f(x)|<\varepsilon$ for $n\ge N$. The dependency chain is $\varepsilon\mapsto\delta\mapsto N$: $N$ depends on $\varepsilon$ through $\delta$ and never on $n$.

## Relation to neighbouring lectures

This lecture packages completeness into two immediately usable tools: the Cauchy convergence theorem and the contraction mapping theorem. The next lecture proves Bolzano–Weierstrass and connects it with nested intervals and sequential compactness. From Lecture 8 onward series are treated, with the Cauchy criterion becoming a convergence test; Lectures 21–24 on uniform convergence and Picard–Lindelöf apply the contraction iteration directly to differential equations.

One thread runs through: completeness → Cauchy criterion → fixed points and extrema → every later existence theorem.
