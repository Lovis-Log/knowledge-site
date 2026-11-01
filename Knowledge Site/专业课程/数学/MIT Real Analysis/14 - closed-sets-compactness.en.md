---
slug: 14-closed-sets-compactness
title: "Closed Sets, Open Covers and Compactness"
summary: "Defining closed sets by complements, proving that closed means limits of convergent sequences stay inside, dualising the union/intersection rules, then defining covers and compactness and proving compact sets are bounded and closed and that closed subsets of compact sets are compact."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, metric-spaces, closed-sets, compactness]
sources:
  - kind: video
    title: "Lecture 13: Open and Closed Sets; Coverings; Compactness"
    url: https://www.youtube.com/watch?v=og-zyMIa5Dc
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## The problem: describing "the boundary is included"

The previous lecture defined open sets: every point can move a little without leaving. Many familiar sets do the opposite — they **contain their boundary**, such as the closed interval $[0,1]$. Describing such sets by "every point has a small ball" is awkward, because boundary points have no ball that stays inside.

This lecture solves the problem in two moves:

1. Define a closed set as one whose **complement is open**, bypassing any direct description of the boundary.
2. Prove a much more usable characterisation: **limits of convergent sequences do not escape**.

Then one step further: use open sets to define **covers**, and "every open cover has a finite subcover" to define **compactness**. Compactness looks abstract, but it solves something concrete: in a general metric space a bounded sequence need not have a convergent subsequence; on a compact set it does.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: open sets and balls |
| 3:13 | Union, intersection, complement |
| 5:51 | Arbitrary unions of open sets are open (proof) |
| 8:20 | Finite intersections of open sets are open (proof) |
| 12:36 | The infinite-intersection counterexample $(-1/n,1/n)$ |
| 15:10 | Lemma: $\{y:d(y,x)>r\}$ is open (proof) |
| 23:37 | Definition of a closed set |
| 25:14 | Theorem: closed iff limits of convergent sequences stay inside (both directions) |
| 38:21 | Examples of closed sets |
| 40:23 | Arbitrary intersections and finite unions stay closed |
| 44:05 | Covers, subcovers, open covers, finite subcovers |
| 51:34 | Definition of compactness |
| 56:53 | Theorem: compact implies bounded (proof) |
| 1:04:28 | Theorem: compact implies closed (proof) |
| 1:14:30 | In $\mathbb R^n$, closed and bounded implies compact (stated) |
| 1:16:10 | A closed subset of a compact set is compact (proof) |

## Recap: open sets, balls and set operations

$O\subseteq X$ is open if for every $x\in O$ there is $r>0$ with $B_r(x)\subseteq O$, where

$$
B_r(x)=\{y : d(x,y)<r\}.
$$

The three set operations: union $\bigcup_\alpha U_\alpha$ (in at least one), intersection $\bigcap_\alpha U_\alpha$ (in all), complement $X\setminus U$ (not in $U$).

They matter because **the properties of open and closed sets are stated entirely through them**. The conversion rules between union, intersection and complement (De Morgan) will be used repeatedly.

## Union and intersection rules for open sets

### Arbitrary unions

**Proposition.** If $\{O_\alpha\}$ is a family of open sets, then $\bigcup_\alpha O_\alpha$ is open.

**Proof.** Take $x\in\bigcup_\alpha O_\alpha$; then $x\in O_{\alpha_0}$ for some $\alpha_0$. Since $O_{\alpha_0}$ is open, some $r>0$ has $B_r(x)\subseteq O_{\alpha_0}\subseteq\bigcup_\alpha O_\alpha$. $\square$

The index set may be arbitrarily large — even uncountable.

### Finite intersections

**Proposition.** If $O_1,\dots,O_n$ are open, then $\bigcap_{i=1}^n O_i$ is open.

**Proof.** Take $x\in\bigcap_i O_i$. For each $i$ choose $r_i>0$ with $B_{r_i}(x)\subseteq O_i$ and set $r=\min\{r_i\}>0$. The minimum of finitely many positive numbers is positive. Then $B_r(x)\subseteq B_{r_i}(x)\subseteq O_i$ for every $i$, so $B_r(x)\subseteq\bigcap_i O_i$. $\square$

### The infinite-intersection counterexample

In $\mathbb R$ take $O_n=(-1/n,1/n)$. Each is open, yet

$$
\bigcap_{n=1}^{\infty}O_n=\{0\}
$$

is not open. The reason is sharp: $\inf_n 1/n=0$, there is no positive lower bound, and the `min` step has no infinite analogue.

The counterexample returns later — it also shows why "infinite intersection of open sets" and "finite union of closed sets" both need the finiteness restriction.

## Definition of a closed set

**Definition.** $C\subseteq X$ is **closed** if its complement $X\setminus C$ is open.

Two immediate facts: $\varnothing$ and $X$ are both closed (they are each other's complements and both are open), so they are **both open and closed**.

**Lemma (the complement of a ball is open).** Fix $x\in X$ and $r>0$. The set

$$
E=\{y\in X : d(y,x)>r\}
$$

is open.

**Proof.** Take $y\in E$, so $d(y,x)>r$. Put

$$
s=d(y,x)-r>0 .
$$

For any $z\in B_s(y)$, the **reverse** triangle inequality gives

$$
d(x,z)\ge d(x,y)-d(y,z)>d(x,y)-s=r .
$$

Hence $z\in E$, i.e. $B_s(y)\subseteq E$, and $E$ is open. $\square$

This is almost the proof that a ball is open, with the triangle inequality used on the other side: to prove a distance is **greater** than something, the quantity being estimated must sit on the right of the inequality. The same trick returns when proving compact implies closed.

It follows at once that the closed ball $\{y : d(y,x)\le r\}$ is closed, since its complement is exactly $E$.

## The sequential characterisation of closed sets

**Theorem.** Let $C\subseteq X$. Then $C$ is closed if and only if: whenever $x_n\in C$ and $x_n\to x$, the limit satisfies $x\in C$.

The practical value: **to show a set is closed you need not check that its complement is open; it suffices to show limits do not escape**. The former is often tedious in examples; the latter is usually a few lines.

### Direction 1: closed ⟹ limits stay inside

Let $C$ be closed, $x_n\in C$, $x_n\to x$. Suppose $x\notin C$, so $x$ lies in the open set $X\setminus C$. Then some $r>0$ satisfies

$$
B_r(x)\subseteq X\setminus C .
$$

But $x_n\to x$ means all sufficiently late terms lie in this ball, which sits entirely in the complement of $C$ — so those $x_n\notin C$, contradicting $x_n\in C$. Hence $x\in C$. $\square$

### Direction 2: limits stay inside ⟹ closed

Assume $C$ has the property that limits of convergent sequences in $C$ stay in $C$; show $X\setminus C$ is open.

Take $x\in X\setminus C$. Suppose no ball around $x$ lies in the complement, i.e. for every $n$ the ball $B_{1/n}(x)$ fails to be contained in the complement. Then we may choose

$$
x_n\in B_{1/n}(x)\cap C .
$$

Since $d(x_n,x)<1/n$, we get $x_n\to x$. By hypothesis the limit belongs to $C$ — but $x$ was chosen in the complement, a contradiction. So the complement is open and $C$ is closed. $\square$

Both directions rest on one translation: **"not in the open set" becomes "there is a ball entirely inside the set"**.

### Examples

- $[0,1]\subseteq\mathbb R$ is closed: its complement $(-\infty,0)\cup(1,\infty)$ is open.
- $[0,1)$ is **neither open nor closed**: its complement $(-\infty,0)\cup[1,\infty)$ omits points just left of $1$, so it is not open.
- $[0,1]\cup[2,3]$ is closed.
- A singleton $\{p\}$ is closed: its complement $\{y : d(y,p)>0\}$ is the $r=0$ limiting case of the lemma, or can be checked directly.

A consequence of the last point: every finite set is closed (a finite union of singletons).

## Union and intersection rules for closed sets

**Theorem.**

- The intersection of **arbitrarily many** closed sets is closed: if $\{C_\alpha\}$ is closed, so is $\bigcap_\alpha C_\alpha$.
- The union of **finitely many** closed sets is closed: if $C_1,\dots,C_n$ are closed, so is $\bigcup_{i=1}^n C_i$.

The statements are **exactly dual** to those for open sets: open sets allow arbitrary unions and finite intersections; closed sets allow arbitrary intersections and finite unions.

**Proof.** Apply De Morgan to exchange union and intersection.

$$
X\setminus\bigcap_\alpha C_\alpha=\bigcup_\alpha (X\setminus C_\alpha).
$$

Each $X\setminus C_\alpha$ is open, and arbitrary unions of open sets are open, so the left side is open; hence $\bigcap_\alpha C_\alpha$ is closed.

$$
X\setminus\bigcup_{i=1}^n C_i=\bigcap_{i=1}^n (X\setminus C_i).
$$

Each $X\setminus C_i$ is open, and finite intersections of open sets are open, so $\bigcup_i C_i$ is closed. $\square$

Correspondingly, **the union of infinitely many closed sets need not be closed**, e.g.

$$
\bigcup_{n=1}^{\infty}\left[\frac1n,1\right]=(0,1],
$$

which is not closed. This is the same phenomenon as the failure of infinite intersections of open sets, read through De Morgan.

## Covers and compactness

### Covers

Let $A\subseteq X$ and let $\{U_\alpha\}$ be a family of subsets. If

$$
A\subseteq\bigcup_\alpha U_\alpha,
$$

the family is a **cover** of $A$.

- A **subcover** is a subfamily that still covers $A$.
- An **open cover** is a cover whose members are all open.
- A **finite subcover** is a subcover consisting of finitely many sets.

A cover imposes no condition on the sets themselves — they may be open, closed, or neither.

**Example.** In $\mathbb R$ take $U_n=(-n,n)$, $n\in\mathbb N$. The family covers $\mathbb R$ and every member is open, so it is an open cover. It has **no finite subcover**: among finitely many, the largest is some $(-N,N)$, which misses $N+1$.

### Compactness

**Definition.** $A\subseteq X$ is **compact** if **every open cover of $A$ has a finite subcover**.

Read the quantifiers slowly:

$$
\forall\ \text{open cover}\ \{U_\alpha\}\ \exists\ \text{finite subfamily}\ \{U_{\alpha_1},\dots,U_{\alpha_k}\}\ \text{still covering } A .
$$

"Finite" appears in the **conclusion**: however large or awkward the open cover someone hands you, you can always extract finitely many sets that finish the job. That is the power of compactness — it compresses an infinite problem into a finite one.

### Why compactness is needed

Recall the main line: in $\mathbb R$, the Cauchy convergence theorem is proved via Bolzano–Weierstrass, which says every bounded sequence has a convergent subsequence.

In a general metric space BW fails (the previous lecture's $X=(0,1]$, $x_n=1/n$). The Cauchy convergence theorem then fails too.

Compactness is exactly the hypothesis that repairs this: **on a compact set every sequence has a convergent subsequence**. That is the metric-space BW theorem proved next lecture, and the main motivation for the definition.

## Compact sets are bounded and closed

**Theorem.** If $A$ is compact, then $A$ is bounded and closed.

### Boundedness

For each $y\in A$ take the open ball $B_1(y)$. These balls cover $A$ (each point lies in its own ball) and are open.

By compactness there are finitely many $y_1,\dots,y_k\in A$ with

$$
A\subseteq\bigcup_{i=1}^{k}B_1(y_i).
$$

Let

$$
r=1+\max_{1\le i\le k}d(y_1,y_i).
$$

For any $x\in A$, some $i$ satisfies $x\in B_1(y_i)$, i.e. $d(x,y_i)<1$. The triangle inequality gives

$$
d(x,y_1)\le d(x,y_i)+d(y_i,y_1)<1+\max_{i}d(y_1,y_i)=r .
$$

So $A\subseteq B_r(y_1)$ and $A$ is bounded. $\square$

### Closedness

Use the sequential characterisation: take $x_n\in A$ with $x_n\to x$ and show $x\in A$.

Suppose $x\notin A$. For each $n$ define

$$
E_n=\left\{y\in X : d(y,x)>\frac1n\right\}.
$$

Each $E_n$ is open by the lemma above, and $\bigcup_n E_n=X\setminus\{x\}$: if $y\ne x$, choose $n>1/d(y,x)$. Since $x\notin A$,

$$
A\subseteq X\setminus\{x\}=\bigcup_{n=1}^{\infty}E_n
$$

is an open cover.

By compactness there is a finite subcover. The sets $E_n$ increase with $n$ (as $1/n$ shrinks the condition loosens), so among finitely many $E_{n_1},\dots,E_{n_k}$ the one with the largest index, say $E_N$, contains all the others. Hence

$$
A\subseteq E_N,\qquad\text{i.e.}\qquad \forall y\in A,\ d(y,x)>\frac1N .
$$

But $x_n\in A$ and $x_n\to x$, so eventually $d(x_n,x)<1/N$ — a contradiction. Therefore $x\in A$ and $A$ is closed. $\square$

The structure is worth remembering: **to prove a point lies outside a closed hull, construct an increasing family of open sets "distance greater than $1/n$" that isolates it**. A similar construction appears next lecture when proving that closed subsets of compact sets are compact.

### The converse fails

In $\mathbb R^n$ with the Euclidean metric, **closed and bounded implies compact**. That is the theorem discussed next lecture, and the reason $\mathbb R^n$ is so convenient.

In a general metric space it **fails**. The previous lecture's $X=(0,1]$: as a subset of itself it is closed and bounded, yet not compact — the open cover $\{(1/n,1]\}$ has no finite subcover.

## Closed subsets of compact sets are compact

**Theorem.** Let $A$ be compact and let $C\subseteq A$ be closed in $X$. Then $C$ is compact.

**Proof.** Let $\{O_\alpha\}$ be an arbitrary open cover of $C$. Since $C$ is closed, $X\setminus C$ is open. Hence

$$
\{O_\alpha\}\cup\{X\setminus C\}
$$

is an open cover of $A$: points of $A$ outside $C$ are covered by $X\setminus C$, points of $C$ by some $O_\alpha$.

By compactness of $A$, extract a finite subcover. If $X\setminus C$ is among the chosen sets, discard it — it contributes nothing to covering $C$ (it is disjoint from $C$). The remaining finitely many $O_\alpha$ still cover $C$. Hence every open cover of $C$ has a finite subcover, so $C$ is compact. $\square$

Short, but it uses two essential facts: $C$ closed (so the complement is open and may join the cover) and $A$ compact (so a finite subcover exists). Neither can be dropped.

## What this lecture establishes

- A closed set is one whose complement is open; $\varnothing$ and $X$ are both open and closed.
- Closed ⟺ limits of convergent sequences stay inside; this is the main tool for proving closedness.
- Open sets: arbitrary unions, finite intersections. Closed sets: arbitrary intersections, finite unions. Infinite cases fail on both sides.
- A cover need not be open; only an open cover plus compactness yields a finite subcover.
- Compact sets are bounded and closed; in $\mathbb R^n$ the converse holds, in general metric spaces it does not.
- Closed subsets of compact sets are compact.

## Comprehension check

**1. Why can a closed set not simply be defined as "every point has a ball that is not entirely outside the set"?**

Reference answer: That phrasing is the negation of the open-set condition and characterises "not open", not "closed". For instance $[0,1)$ is not open, but it is not closed either; and in $\mathbb R$ the complement of $(0,1]$ is $(-\infty,0]\cup(1,\infty)$, which is not open, so $(0,1]$ is not closed. The correct meaning of "closed" is **the complement is open**, which says points in the complement have room to move — a different statement from "every point of the set has a ball inside".

**2. Prove that the complement of a closed ball, $E=\{y:d(y,x)>r\}$, is open.**

Reference answer: Take $y\in E$ and set $s=d(y,x)-r>0$. For any $z\in B_s(y)$, the reverse triangle inequality gives

$$
d(x,z)\ge d(x,y)-d(y,z)>d(x,y)-s=r,
$$

so $z\in E$ and $B_s(y)\subseteq E$. Since $y$ was arbitrary, $E$ is open. The key is to use a difference of distances, not a sum.

**3. Prove: if $C$ is closed, $x_n\in C$ and $x_n\to x$, then $x\in C$.**

Reference answer: Suppose $x\notin C$. Then $x$ lies in the open set $X\setminus C$, so some $r>0$ has $B_r(x)\subseteq X\setminus C$. Since $x_n\to x$, there is $N$ with $x_n\in B_r(x)$ for $n\ge N$, hence $x_n\notin C$, contradicting $x_n\in C$. Therefore $x\in C$.

**4. Give a family of closed sets whose union is not closed, and relate it to the failure of infinite intersections of open sets.**

Reference answer: Take $C_n=[1/n,1]$; each is closed, but $\bigcup_n C_n=(0,1]$, which is not closed ($0$ is a limit point outside the set). Its complement $(-\infty,0)\cup(1,\infty)$ omits points near $0$, so it is not open. Taking complements turns this union into the intersection of the open sets $(-1/n,1/n)$, whose intersection is $\{0\}$ and is not open — the two facts correspond exactly through De Morgan.

**5. Use compactness to prove that a compact set is bounded (show how $r$ is chosen).**

Reference answer: For each $y\in A$, the open balls $B_1(y)$ cover $A$. Compactness gives a finite subcover $B_1(y_1),\dots,B_1(y_k)$. Let $r=1+\max_i d(y_1,y_i)$. For any $x\in A$ some $i$ satisfies $d(x,y_i)<1$, so

$$
d(x,y_1)\le d(x,y_i)+d(y_i,y_1)<1+\max_i d(y_1,y_i)=r,
$$

hence $A\subseteq B_r(y_1)$.

**6. In the proof that a closed subset of a compact set is compact, why must $X\setminus C$ be added to the cover?**

Reference answer: The open cover $\{O_\alpha\}$ covers only $C$ and need not cover points of $A$ outside $C$. To construct an open cover of $A$, those points must be added; closedness of $C$ guarantees $X\setminus C$ is open, so it may legally join the cover. After extracting a finite subcover, $X\setminus C$ contributes nothing to covering $C$ and can be discarded, leaving finitely many $O_\alpha$ that still cover $C$.

**7. In $\mathbb R$, $[0,1]$ is compact but $(0,1]$ is not. Give an open cover of $(0,1]$ with no finite subcover.**

Reference answer: Take $U_n=(1/n,1]$ for $n\in\mathbb N$. Each $U_n$ is open in $(0,1]$ (relative to that space). For any $x\in(0,1]$, choose $n>1/x$; then $1/n<x$, so $x\in U_n$, and the family covers $(0,1]$. Given finitely many $U_{n_1},\dots,U_{n_k}$, let $N=\max n_i$; their union is $U_N=(1/N,1]$, and $1/(N+1)\in(0,1]$ lies outside it. So no finite subcover exists.

## Relation to neighbouring lectures

The previous lecture built open sets and their union/intersection rules; this one dualises them to closed sets and introduces covers and compactness. For now compactness is "a definition plus two properties"; the next lecture cashes it in by proving Bolzano–Weierstrass on compact sets, showing that compactness is exactly the condition that restores "bounded implies a convergent subsequence". The closing result here, that closed subsets of compact sets are compact, appears there as a key tool.
