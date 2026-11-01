---
slug: "03-writing-proofs"
title: "How to Write a Proof: Suprema, √2, and the Archimedean Property"
summary: "We first fix the definitions of upper and lower bounds and of completeness, including the trap that a bound need not belong to the subset. We then rewrite the existence of √2 as a formal proof suitable for submission, and prove the Archimedean property in the same format before introducing sequences."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [mathematics]
tags: [real-analysis, proof-writing, supremum, archimedean-property, sequences]
sources:
  - kind: video
    title: "Lecture 3: How to Write a Proof; Archimedean Property"
    url: "https://www.youtube.com/watch?v=QJ96fO8Eef4"
    author: "Tobias Holck Colding, MIT OpenCourseWare"
    publishedAt: "2025-09-02"
---

## Two different things

The course has two goals, and this lecture is devoted to the second: **how to turn "why it ought to be true" into a formal mathematical proof**.

These are not the same activity. Lecture 2 argued that $\sqrt2$ exists by imagining the supremum slightly too large or too small and shifting it to create a contradiction. That is scratch-paper reasoning. A proof you hand in is written differently: every quantity (such as $h$) is defined up front, and the argument then follows a fixed structure. A formal proof can look like it comes from nowhere, but it reads far more clearly.

The lecture demonstrates both versions on the same example.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Focus of the lecture: how to write a proof |
| 4:48 | Review: upper and lower bounds; $M$ need not belong to the subset |
| 9:43 | General ordered sets; the half-line counterexample |
| 16:10 | Completeness: suprema and infima |
| 22:39 | Why formal proofs matter |
| 25:18 | Theorem: $\sqrt2$ is real; a complete formal proof |
| 1:08:56 | The Archimedean property in the same format |
| 1:14:57 | Sequences: $\sqrt2$ as the limit of an increasing sequence |

## Upper bounds, lower bounds, boundedness

### Definitions

Let $S$ be an ordered set and $A\subseteq S$.

- $A$ is **bounded above** if there is $M\in S$ with $a\le M$ for all $a\in A$. Such an $M$ is an upper bound.
- $A$ is **bounded below** if there is $m\in S$ with $m\le a$ for all $a\in A$. Such an $m$ is a lower bound.
- $A$ is **bounded** if it is bounded both above and below.

### A bound need not belong to the subset

This was the most frequently asked question on the discussion board: which set must $M$ live in?

The answer: **$M$ only has to lie in the ambient set $S$; it need not belong to $A$.**

Example: $A=(0,1)\subset\mathbb R$. Then $1$ is an upper bound and $0$ is a lower bound, yet neither belongs to $A$. In fact no element of $A$ is an upper bound for $A$: given $x\in A$, the point $(x+1)/2$ lies in $A$ and is larger. Bounds can only come from outside.

In general, suprema and infima may also lie outside $A$. They may belong to $A$, but that is not required.

## A subtle example: which set is A a subset of?

One move inside the definition is easy to miss: all bounds must be taken from $S$, not from all of $\mathbb R$.

Take $S=(0,\infty)$ and $A=(0,1)$, viewed as a subset of $S$.

- $A$ is bounded above: $1$ is an upper bound, since $x<1$ for every $x\in A$ and $1\in S$.
- $A$ has **no lower bound**. Any lower bound $m$ must lie in $S=(0,\infty)$, so $m>0$. Take $x=\min\{m/2,\,1/2\}\in A$; then $x<m$, contradicting that $m$ is a lower bound.

The same $A$, viewed as a subset of $\mathbb R$, does have the lower bound $0$. The difference is not in $A$ but in which set supplies the bounds. Hence **one must always specify the ambient set $S$ before discussing bounds**.

The lecture also clarifies that $+\infty$ and $-\infty$ are not real numbers and cannot serve as bounds in $\mathbb R$.

## Completeness: suprema and infima

Let $S$ be an ordered set and $A\subseteq S$ bounded above. An element $M\in S$ is the **least upper bound** of $A$, written $\sup A$, if

1. $M$ is an upper bound for $A$;
2. $M\le M_1$ for every upper bound $M_1$ of $A$.

Symmetrically, if $A$ is bounded below, the **greatest lower bound** $m=\inf A$ satisfies

1. $m$ is a lower bound;
2. $m_1\le m$ for every lower bound $m_1$.

**Definition.** An ordered set $S$ is **complete** if every subset bounded above has a least upper bound.

$\mathbb R$ is complete, so every bounded subset has both a supremum and an infimum, related by

$$
\inf A=-\sup(-A),
\qquad -A=\{-a:a\in A\}.
$$

So proving the supremum property suffices; the infimum case follows.

## Writing a formal proof: the case of $\sqrt2$

### The theorem and the set

**Theorem.** There is $\alpha\in\mathbb R$ with $\alpha>0$ and $\alpha^2=2$.

**Proof.** Let

$$
A=\{\,x\in\mathbb R : x>0,\ x^2<2\,\}.
$$

The set is written out explicitly, including $x\in\mathbb R$ — a formal proof may not skip this.

**Step 1: $A$ is nonempty.** $1\in A$, since $1>0$ and $1^2=1<2$.

**Step 2: $A$ is bounded above.** Claim that $2$ is an upper bound. If $x\in A$ and $x\ge2$, then $x^2\ge4>2$, contradicting $x^2<2$. Hence $x<2\le2$.

**Step 3: fix $\alpha$.** Since $A$ is nonempty and bounded above and $\mathbb R$ is complete, set

$$
\alpha=\sup A .
$$

**Step 4: $\alpha>0$.** Since $1\in A$ and $\alpha$ is an upper bound, $1\le\alpha$, so in particular $\alpha>0$. Also $\alpha\le2$, because $2$ is an upper bound and $\alpha$ is the least one.

It remains to prove $\alpha^2=2$, in two parts.

### Part one: $\alpha^2\le2$

**Suppose not**, i.e. $\alpha^2>2$. The goal is to build an upper bound smaller than $\alpha$, contradicting minimality.

Define

$$
h=\frac{\alpha^2-2}{4\alpha},
\qquad
\alpha_1=\alpha-h .
$$

**$h>0$**: the numerator is positive because $\alpha^2>2$, and the denominator is positive.

**$\alpha_1>0$**: since

$$
h=\frac{\alpha^2-2}{4\alpha}<\frac{\alpha^2}{4\alpha}=\frac\alpha4,
$$

we get $\alpha_1=\alpha-h>\frac34\alpha>0$.

**$\alpha_1^2>2$**: expand and drop the positive term $h^2$:

$$
\alpha_1^2=(\alpha-h)^2=\alpha^2-2\alpha h+h^2\ge\alpha^2-2\alpha h .
$$

Substituting $h$,

$$
2\alpha h=2\alpha\cdot\frac{\alpha^2-2}{4\alpha}=\frac{\alpha^2-2}{2},
$$

so

$$
\alpha_1^2\ge\alpha^2-\frac{\alpha^2-2}{2}=\frac{\alpha^2+2}{2}>2,
$$

where the last inequality uses the hypothesis $\alpha^2>2$.

Now take any $x\in A$. Since $x>0$, $\alpha_1>0$, and $x^2<2<\alpha_1^2$, taking roots gives $x<\alpha_1$. So $\alpha_1$ is an upper bound for $A$, and $\alpha_1<\alpha$, contradicting that $\alpha$ is the least upper bound.

Hence $\alpha^2\le2$.

### Part two: $\alpha^2\ge2$

**Suppose not**, i.e. $\alpha^2<2$. The goal is to find an element of $A$ larger than $\alpha$, contradicting that $\alpha$ is an upper bound.

Define

$$
h=\frac{2-\alpha^2}{4\alpha},
\qquad
\alpha_2=\alpha+h .
$$

**$0<h<\frac12$**: numerator and denominator are positive, so $h>0$; and since $\alpha\ge1$,

$$
h=\frac{2-\alpha^2}{4\alpha}<\frac{2}{4\alpha}\le\frac12<1 .
$$

**$\alpha_2^2<2$**: expand,

$$
\alpha_2^2=(\alpha+h)^2=\alpha^2+2\alpha h+h^2 .
$$

Because $0<h<1$, we have $h^2<h$, hence

$$
\alpha_2^2<\alpha^2+2\alpha h+h .
$$

Substituting $2\alpha h=\dfrac{2-\alpha^2}{2}$ and using $h\le\dfrac{2-\alpha^2}{2}$ (which follows from $\alpha\ge1$, i.e. $\frac1{2\alpha}\le1$), we obtain

$$
\alpha_2^2<\alpha^2+\frac{2-\alpha^2}{2}+\frac{2-\alpha^2}{2}=2 .
$$

Also $\alpha_2>\alpha>0$, so $\alpha_2\in A$. But $\alpha_2>\alpha$, contradicting that $\alpha$ bounds $A$.

Hence $\alpha^2\ge2$.

Together, $\alpha^2=2$, completing the proof. $\square$

### From scratch paper to formal proof

Compare Lecture 2 with the argument above; the difference is **the order in which information appears**:

| Scratch paper | Formal proof |
| --- | --- |
| Assume $x^2>2$ and look for $h$ with $(x-h)^2>2$ | Write $h=\dfrac{\alpha^2-2}{4\alpha}$ immediately |
| Compute and experiment; pin down $h$ at the end | Define $h$ first, then verify its properties |
| Concerned with *why* one would do this | Concerned with *whether* each step holds |

In the formal version $h$ seems to fall from the sky. Its origin is the scratch calculation: to get $(x-h)^2>2$ it suffices that $2xh<x^2-2$. The formal write-up compresses that calculation into "define $h=\cdots$", sacrificing visible motivation for a gapless logical chain.

One practical rule from the lecture: **prove only the properties you need**. Establishing every property of the set for the sake of completeness makes the argument harder to follow.

## A formal proof of the Archimedean property

**Theorem.** The natural numbers are not bounded above in $\mathbb R$.

Equivalently, for every real $x$ there is $n\in\mathbb N$ with $n>x$.

**Proof (by contradiction).** Suppose $\mathbb N$ is bounded above. By completeness, let

$$
\alpha=\sup\mathbb N .
$$

The contradiction will come from "$\alpha-1$ is also an upper bound".

Since $\alpha$ is an upper bound, $n\le\alpha$ for every $n\in\mathbb N$. Also $n+1\in\mathbb N$, so

$$
n+1\le\alpha
\implies
n\le\alpha-1 \quad\text{for all } n\in\mathbb N .
$$

Thus $\alpha-1$ is an upper bound for $\mathbb N$. But $\alpha-1<\alpha$, contradicting that $\alpha$ is the least upper bound. Therefore $\mathbb N$ is unbounded. $\square$

Four lines, each with a job: the first states the contradictory hypothesis, the second invokes completeness, the third uses closure of $\mathbb N$ under $+1$, the fourth uses minimality. When writing a formal proof, one can ask of every line: which known fact does this use?

## Sequences: placing $\sqrt2$ on the real line

The theorem guarantees that $\sqrt2$ exists as a number. To **locate** it on the line, one good device is its decimal truncations:

$$
1,\quad 1.4,\quad 1.41,\quad 1.414,\quad 1.4142,\ \dots
$$

Each is smaller than the next, and $\sqrt2$ is their limit.

**Definition.** A real sequence is a function $a:\mathbb N\to\mathbb R$, usually written $(a_n)_{n\ge1}$ with $a_n=a(n)$.

Writing the index as a subscript rather than an argument emphasises that a sequence is a function.

The list above is increasing, $a_n<a_{n+1}$, and $\sqrt2=\lim_{n\to\infty}a_n$. But "limit" is still only intuitive; the $\varepsilon$ definition arrives in the next lecture.

## What this lecture establishes

- Upper and lower bounds must come from the ambient set $S$ and need not belong to $A$.
- $(0,1)$ has an upper bound but no lower bound inside $S=(0,\infty)$; inside $\mathbb R$ it has the lower bound $0$.
- Complete = every subset bounded above has a supremum; $\inf A=-\sup(-A)$.
- A formal proof proceeds: state the theorem → build the set → verify nonempty and bounded → take the supremum → argue in two parts by contradiction.
- A quantity such as $h$ that appears "from nowhere" comes from scratch work; the formal draft suppresses the motivation.
- The Archimedean property follows from completeness: $\sup\mathbb N$ would make $\alpha-1$ an upper bound too.
- A sequence is a function $\mathbb N\to\mathbb R$; $\sqrt2$ is the limit of its truncations.

## Comprehension check

**1. Why need an upper bound $M$ not belong to $A$? Give an example where no element of $A$ is an upper bound.**

Reference answer: The definition only requires $M\in S$ and $a\le M$ for all $a\in A$. Take $A=(0,1)\subset\mathbb R$; then $1$ is an upper bound but $1\notin A$. Moreover no element of $A$ bounds $A$: for any $x\in A$, let $y=(x+1)/2$, so $x<y<1$ and $y\in A$ with $y>x$. Bounds must come from outside.

**2. Let $S=(0,\infty)$ and $A=(0,1)$. Why does $A$ have no lower bound as a subset of $S$? How does this differ from viewing $A$ as a subset of $\mathbb R$?**

Reference answer: A lower bound must lie in $S$, so any candidate $m$ satisfies $m>0$. Take $x=m/2$ (or $x=1/2$ if $m/2\ge1$); then $x\in A$ and $x<m$, so $m$ fails. Since $m$ was arbitrary, there is no lower bound. Viewed inside $\mathbb R$, $0\in\mathbb R$ and $0\le x$ for all $x\in A$, so $0$ is a lower bound. The difference lies in which set is allowed to supply bounds, not in $A$.

**3. In the formal proof, $h=(\alpha^2-2)/(4\alpha)$ appears from nowhere. How was it found on scratch paper?**

Reference answer: The scratch goal is $h>0$ with $(\alpha-h)^2>2$. Expanding gives $\alpha^2-2\alpha h+h^2$; dropping $h^2$, it suffices that $\alpha^2-2\alpha h>2$, i.e. $h<(\alpha^2-2)/(2\alpha)$. Choosing a concrete small value — for instance doubling the denominator — gives $h=(\alpha^2-2)/(4\alpha)$, which satisfies the needed inequality and also yields the explicit bound $\alpha_1>\frac34\alpha$. The formal proof hides the search and keeps only the result.

**4. Why must part one verify $\alpha_1>0$ separately? Which later step would fail without it?**

Reference answer: The later step "from $x^2<2<\alpha_1^2$ conclude $x<\alpha_1$" requires $\alpha_1>0$, since taking square roots preserves order only for nonnegative quantities. If $\alpha_1\le0$, a large square would not imply a large value. The verification is $h<\alpha/4$, hence $\alpha_1>\frac34\alpha>0$.

**5. In part two, where exactly is the known fact $\alpha\ge1$ used?**

Reference answer: Twice. First, to bound $h$: $h=\dfrac{2-\alpha^2}{4\alpha}\le\dfrac{2-\alpha^2}{2}$, which needs $4\alpha\ge2$, i.e. $\alpha\ge1/2$; $\alpha\ge1$ is more than enough. Second, to obtain $h<1$ and hence $h^2<h$, which absorbs the quadratic term in $(\alpha+h)^2$. Without that bound the estimate $\alpha_2^2<2$ fails.

## Relation to neighbouring lectures

Lectures 1–2 built the axioms and completeness; this lecture treats them as known and concentrates on writing. The next lecture defines convergence with $\varepsilon$-$N$ language, turning the insistence that "every line names its justification" into a fixed format. The monotone convergence theorem and the Cauchy criterion then build on that format.

The course repeats that proof writing takes time and that early struggles are normal. The two formal proofs here can serve as templates: list the structure, fill in details, then check that every line has a source.
