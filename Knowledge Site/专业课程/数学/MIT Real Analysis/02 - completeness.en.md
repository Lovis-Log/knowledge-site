---
slug: "02-completeness"
title: "Completeness: Least Upper Bounds and the Existence of √2"
summary: "We first prove that √2 is irrational, then introduce upper bounds and least upper bounds, and define a complete ordered field as one where every bounded subset has a least upper bound. We then construct √2 inside the reals and prove the Archimedean property and the density of the rationals."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [mathematics]
tags: [real-analysis, completeness, supremum, archimedean-property, density]
sources:
  - kind: video
    title: "Lecture 2: Introduction to Real Numbers (cont.)"
    url: "https://www.youtube.com/watch?v=6i6sV8WIzLc"
    author: "Tobias Holck Colding, MIT OpenCourseWare"
    publishedAt: "2025-09-02"
---

## What was still missing

The previous lecture prepared an ordered field for the intermediate value theorem but left "complete" undefined. This lecture supplies it and answers a concrete question: what kind of number is $\sqrt 2$?

First, compress the previous lecture into a table:

| Concept | Requirements |
| --- | --- |
| Field | five axioms for addition, five for multiplication, distributivity |
| Ordered set | any two elements comparable (trichotomy) plus transitivity |
| Ordered field | field plus order, with $x<y\Rightarrow x+z<y+z$ and $x>0,y>0\Rightarrow xy>0$ |

Transitivity is new here: if $x<y$ and $y<z$ then $x<z$. It is what allows inequalities to be chained, and nearly every later argument uses it.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: fields, ordered sets, ordered fields |
| 8:24 | $\sqrt 2$ is not rational: a complete proof by contradiction |
| 16:18 | Viewing $\sqrt 2$ as a limit of a sequence |
| 20:31 | Upper bounds and least upper bounds |
| 28:03 | Complete ordered fields; the least complete ordered field is $\mathbb R$ |
| 31:25 | Constructing $\sqrt 2$ in $\mathbb R$ via two inequalities |
| 52:52 | Corollary: $\mathbb Q$ is not complete |
| 54:54 | The Archimedean property and its proof |
| 1:01:53 | Corollary: the rationals are dense in the reals |

## $\sqrt 2$ is not rational

$\sqrt 2$ is the positive number satisfying $x^2=2$. To show it is not in $\mathbb Q$ means showing that no $m\in\mathbb Z$, $n\in\mathbb N$ satisfy $(m/n)^2=2$.

**Claim.** No rational $x$ satisfies $x^2=2$.

**Proof (by contradiction).** Suppose $x=m/n$ with $m\in\mathbb Z$, $n\in\mathbb N$ and $x^2=2$.

We may assume $m$ and $n$ share no common factor. Why: a rational has many representations, and if $d>1$ divides both, dividing both by $d$ gives another representation of the same rational. Repeating, we arrive at coprime $m,n$. **This reduction is not cosmetic; it is the hinge of the contradiction.**

From $m^2/n^2=2$,

$$
m^2=2n^2 .
$$

The right side is even, so $m^2$ is even. An even square has an even root: if $m=2k+1$ were odd then $m^2=4k^2+4k+1$ would be odd. Hence $m=2m_1$ with $m_1\in\mathbb Z$.

Substituting,

$$
(2m_1)^2=2n^2
\implies
4m_1^2=2n^2
\implies
2m_1^2=n^2 .
$$

So $n^2$ is even, and by the same argument $n$ is even.

Now $2$ divides both $m$ and $n$, contradicting coprimality. The assumption fails, so $\sqrt 2\notin\mathbb Q$. $\square$

Only two facts are used: cancellation of common factors in a rational, and "an integer whose square is even is even". The latter deserves to be spelled out, since it is part of the proof.

## Where $\sqrt 2$ lives: a limit of a sequence

If $\mathbb Q$ does not contain $\sqrt 2$, how do the reals accommodate it?

Look at the decimal expansion:

$$
\sqrt 2=1.41421356\ldots
$$

Truncating digit by digit gives

$$
1,\quad 1.4,\quad 1.41,\quad 1.414,\quad 1.4142,\ \dots
$$

Each truncation is rational, and the later ones sit closer and closer to $\sqrt 2$. So one idea is: **define $\sqrt 2$ as the limit of this sequence**.

That introduces two notions that will occupy much of the course: sequences and limits. "Getting closer" is only intuition; writing it down needs the $\varepsilon$ language of Lecture 4. Here it only illustrates what completeness must accomplish: the rationals have a hole at $\sqrt 2$, and the reals fill it with a limit.

## Upper bounds and least upper bounds

### Upper bounds

Let $S$ be an ordered set and $A\subseteq S$. An element $M\in S$ is an **upper bound** for $A$ if

$$
a\le M \quad\text{for all } a\in A .
$$

$M$ need not belong to $A$. Examples:

- $S=\mathbb N$, $A=\{1,2,3\}$. Then $4$ is an upper bound, and so is $3$; $2$ is not, because $3>2$.
- $S=\mathbb Q$, $A=\mathbb N$. Then $A$ has no upper bound: however large a rational is chosen, some natural number is larger.

### Least upper bounds

Suppose $A$ has an upper bound. Then $M$ is the **least upper bound** (or supremum, written $\sup A$) if

1. $M$ is an upper bound for $A$;
2. for every upper bound $M_1$ of $A$, $M\le M_1$.

In one phrase: **$M$ is the smallest upper bound**. It plays two roles at once — large enough to dominate every element of $A$, small enough that nothing smaller can.

One detail is easy to miss: the least upper bound need not belong to $A$. For $A=\{x\in\mathbb Q:x<1\}$, $\sup A=1$, but $1\notin A$.

## Complete ordered fields

The definition is short:

> A **complete ordered field** is an ordered field in which every bounded subset has a least upper bound.

"Bounded" means bounded above. The lecture notes that defining only upper bounds loses nothing: replace a set by its "mirror image" and upper bounds become lower bounds, so the two notions are equivalent and stating both would be redundant. Concretely, lower bounds and infima come from applying suprema to $-A=\{-a:a\in A\}$.

Next comes a theorem that is **not proved here**:

**Theorem.** There exists a smallest complete ordered field containing the rationals $\mathbb Q$.

That field is the real numbers $\mathbb R$. Proving existence requires building $\mathbb R$ from $\mathbb Q$ (Dedekind cuts, or Cauchy sequences), which lies outside the course; the lecture takes it as a starting point.

With this theorem the intermediate value theorem finally has the property it needs. But does the definition of completeness really deliver what we want? The lecture tests it on $\sqrt 2$.

## Constructing $\sqrt 2$ in $\mathbb R$

The plan: do not solve an equation. Define $\sqrt 2$ as a least upper bound, then verify that this bound really squares to $2$.

### The set $A$

$$
A=\{\,x\in\mathbb R : x>0,\ x^2<2\,\}.
$$

Check that the definition applies:

- **Nonempty**: $1\in A$, since $1>0$ and $1^2=1<2$.
- **Bounded above**: if $x\in A$ then $x>0$ and $x^2<2$. Since $2^2=4>2$, necessarily $x<2$. Indeed $x\ge2>0$ would force $x^2\ge4>2$. So $2$ is an upper bound.

By completeness, $\sup A$ exists. Set

$$
x=\sup A .
$$

The lecture deliberately avoids writing $\sqrt 2$ during the proof: using that name would tempt one to invoke "$x^2=2$" before it has been proved.

Since $1\in A$ and $x$ is an upper bound, $1\le x$, so $x>0$.

It remains to prove $x^2=2$, in two inequalities.

### Step one: $x^2\le 2$

Suppose instead that $x^2>2$. Then $x^2-2>0$, so we may choose a small positive $h$ with

$$
0<h<\min\left\{x,\ \frac{x^2-2}{2x}\right\}.
$$

(The right side is positive because $x>0$, so such an $h$ exists.) Compute

$$
(x-h)^2=x^2-2xh+h^2\ge x^2-2xh .
$$

Since $h<\dfrac{x^2-2}{2x}$, multiplying by $2x>0$ gives $2xh<x^2-2$, i.e. $x^2-2xh>2$. Hence

$$
(x-h)^2>2 .
$$

Now take any $a\in A$. Because $a>0$, $x-h>0$ (since $h<x$), and $a^2<2<(x-h)^2$, taking square roots preserves the order and yields $a<x-h$. So $x-h$ is an upper bound for $A$, and $x-h<x$, contradicting minimality of $x$.

Therefore $x^2\le2$.

### Step two: $x^2\ge2$

Suppose instead that $x^2<2$. Then $2-x^2>0$. Choose $h$ with

$$
0<h<\min\left\{1,\ \frac{2-x^2}{1+2x}\right\}.
$$

Compute

$$
(x+h)^2=x^2+2xh+h^2 .
$$

Since $0<h<1$, we have $h^2<h$, so

$$
(x+h)^2<x^2+2xh+h=x^2+h(1+2x).
$$

From $h(1+2x)<2-x^2$,

$$
(x+h)^2<x^2+(2-x^2)=2 .
$$

Also $x+h>0$, hence $x+h\in A$. But $x+h>x$, contradicting that $x$ is an upper bound.

Therefore $x^2\ge2$.

Together, $x^2=2$. So $\sup A$ is $\sqrt 2$: the number genuinely exists in $\mathbb R$.

**The device is worth remembering**: to prove that a supremum satisfies an equation, argue twice by contradiction — if it is too large, shift left a little and it still dominates the set; if too small, shift right a little and it lands inside the set. The size of the shift is governed by the gap between $x^2$ and $2$.

## Corollary: $\mathbb Q$ is not complete

**Corollary.** The rationals $\mathbb Q$ do not form a complete ordered field.

**Proof.** Let $F$ be any complete ordered field containing $\mathbb Q$. The construction above uses only field operations, order and completeness, so $\sqrt2=\sup\{x\in F:x>0,x^2<2\}$ must lie in $F$. But the first part of the lecture showed $\sqrt2\notin\mathbb Q$. If $\mathbb Q$ were complete, taking $F=\mathbb Q$ would be a contradiction. $\square$

Concretely, consider $A_{\mathbb Q}=\{x\in\mathbb Q:x>0,x^2<2\}$. It has upper bounds in $\mathbb Q$ (for instance $2$) but no least upper bound. Indeed, let $q\in\mathbb Q$ be any upper bound. Since $1\in A_{\mathbb Q}$, $q\ge1>0$. If $q^2<2$ then $q\in A_{\mathbb Q}$, contradicting that $q$ bounds the set; if $q^2=2$ then $q$ is a rational square root of $2$, which is impossible. Hence $q^2>2$.

Define

$$
q'=\frac{2/q+q}{2}=\frac{q^2+2}{2q}.
$$

Then $q'$ is rational and positive. Compare:

$$
q'<q
\iff
q^2+2<2q^2
\iff
2<q^2,
$$

which holds. Is $q'$ an upper bound? For any $x\in A_{\mathbb Q}$ we have $x^2<2$, and

$$
(q')^2=\frac{(q^2+2)^2}{4q^2}>2
\iff
(q^2-2)^2>0,
$$

true because $q^2>2$. Hence $x^2<2<(q')^2$, so $x<q'$.

Every rational upper bound admits a smaller rational upper bound, so no least upper bound exists. This is the precise sense in which $\mathbb Q$ has a gap — and the gap sits exactly at $\sqrt2$.

## The Archimedean property

**Theorem (Archimedean property).** For every real $x$ there is a natural number $n$ with $n>x$.

It looks obvious — the naturals are unbounded. But "obvious" is precisely what completeness has to prove.

**Proof (by contradiction).** Suppose some real $x$ satisfies $n\le x$ for all $n\in\mathbb N$. Then $x$ bounds $\mathbb N$ above, so $\mathbb N$, viewed as a subset of $\mathbb R$, is bounded above.

By completeness, let

$$
y=\sup\mathbb N .
$$

As an upper bound, $y\ge n$ for every $n\in\mathbb N$. But $n+1$ is also natural, so

$$
n+1\le y
\implies
n\le y-1 \quad\text{for all } n .
$$

Thus $y-1$ is also an upper bound for $\mathbb N$. Yet $y-1<y$, contradicting that $y$ is the least upper bound. $\square$

The proof is short but uses three things: closure of $\mathbb N$ under $+1$, transitivity of order, and minimality of the least upper bound. The lecture stresses that arguments of this kind are the basic craft of analysis.

## Corollary: the rationals are dense in the reals

**Corollary.** If $x<y$ are real, there is a rational $m/n$ with

$$
x<\frac mn<y .
$$

**Proof.** Let $\beta=y-x>0$. By the Archimedean property there is $n\in\mathbb N$ with $n>1/\beta$, equivalently

$$
\frac1n<\beta .
$$

Now take the **smallest** integer $m$ with $m/n>x$. Such an $m$ exists: by the Archimedean property there is an integer $k>nx$, so $k/n>x$ and the set of admissible integers is nonempty; since it is bounded below, it has a least element.

By minimality of $m$, the integer $m-1$ does not satisfy the condition, so

$$
\frac{m-1}{n}\le x .
$$

Therefore

$$
\frac mn=\frac{m-1}{n}+\frac1n\le x+\frac1n<x+\beta=y .
$$

With $m/n>x$, this gives $x<m/n<y$. $\square$

Geometrically: choose a ruler of length $1/n$, shorter than the distance from $x$ to $y$. Walk rightward from $x$ in steps of that length; the first grid point past $x$ cannot yet have passed $y$.

## What this lecture establishes

- $\sqrt2\notin\mathbb Q$; the pivot of the contradiction is reducing to coprime $m,n$.
- Completeness = every bounded subset has a least upper bound (supremum).
- $\mathbb R$ is the smallest complete ordered field, and it contains $\mathbb Q$.
- In $\mathbb R$, $\sup\{x>0:x^2<2\}$ exists and squares to $2$; that is the construction of $\sqrt2$.
- $\mathbb Q$ is not complete: the same set has no least upper bound among the rationals.
- The Archimedean property — the naturals are unbounded — follows from completeness rather than being assumed.
- The rationals are dense in the reals: every open interval $(x,y)$ contains a rational.

## Comprehension check

**1. When proving $\sqrt2$ irrational, why may we assume $m$ and $n$ are coprime? What role does it play?**

Reference answer: A rational has many representations, since $m/n=(dm)/(dn)$. If $d>1$ divides both, divide both by $d$ and repeat until coprime; this does not change the rational, so "there is a rational $x$ with $x^2=2$" is equivalent to "there are coprime $m,n$ with $(m/n)^2=2$". The role is to create a contradiction: the argument forces $2$ to divide both $m$ and $n$, which directly contradicts coprimality. Without the reduction, multiplying a solution by $2$ in numerator and denominator still satisfies $m^2=2n^2$, so no contradiction would arise.

**2. In the proof of $x^2\le2$, why does $h<(x^2-2)/(2x)$ make $x-h$ an upper bound? Complete the logic.**

Reference answer: The goal is $h>0$ with $(x-h)^2>2$. Expanding, $(x-h)^2=x^2-2xh+h^2\ge x^2-2xh$, so it suffices that $x^2-2xh>2$, i.e. $h<(x^2-2)/(2x)$ (the direction is unchanged because $x>0$). Then for any $a\in A$, $a^2<2<(x-h)^2$; with $a>0$ and $x-h>0$, taking roots gives $a<x-h$. So $x-h$ bounds $A$ above. But $x-h<x$, contradicting minimality of $x$. One must also keep $x-h>0$, i.e. $h<x$, which the choice of $\min\{x,(x^2-2)/(2x)\}$ guarantees.

**3. In the proof of $x^2\ge2$, why require $h<1$? Where would the argument break without it?**

Reference answer: The goal is $x+h\in A$, i.e. $(x+h)^2<2$. Expanding gives $x^2+2xh+h^2$, and $h^2$ is not directly controlled. The condition $0<h<1$ gives $h^2<h$, hence $(x+h)^2<x^2+2xh+h=x^2+h(1+2x)$, replacing a quadratic term by a linear one. Choosing $h<(2-x^2)/(1+2x)$ then yields $(x+h)^2<2$. Without $h<1$ the inequality $h^2<h$ fails and $h^2$ cannot be absorbed into $h(1+2x)$, so the estimate collapses.

**4. In the Archimedean proof, why does "$y-1$ is also an upper bound" contradict something?**

Reference answer: $y$ is defined as the least upper bound of $\mathbb N$, so no upper bound is smaller than $y$. But $y-1<y$; if it were an upper bound there would be an upper bound smaller than the least one, violating minimality. The contradiction refutes the assumption that $\mathbb N$ is bounded above. The step "$n+1$ is natural" is what makes $n\le y-1$ hold for every $n$, so that $y-1$ really is an upper bound.

**5. Use density to show that between any two reals there are infinitely many rationals.**

Reference answer: Let $x<y$. Density gives a rational $q_1$ with $x<q_1<y$. Apply density again to $(q_1,y)$ to get a rational $q_2$ with $q_1<q_2<y$. Inductively, given $x<q_k<y$, density applied to $(q_k,y)$ produces $q_{k+1}$ with $q_k<q_{k+1}<y$. The sequence is strictly increasing, so the $q_k$ are distinct, and all lie in $(x,y)$. Only repeated use of density on concrete nonempty open intervals is needed — no extra set-theoretic tools.

## Relation to neighbouring lectures

This lecture completes the definition of $\mathbb R$ as a **complete ordered field**. Limits, however, are still only intuitive. Lecture 3 systematises proof writing — quantifiers, contradiction, $\varepsilon$-arguments — and Lecture 4 finally defines convergence, after which completeness is used to prove the monotone convergence theorem and the Cauchy criterion.

The thread so far: Lecture 1 states the axioms, Lecture 2 completes them and shows how to build numbers from them, and Lectures 3–6 begin proving limit theorems with those axioms.
