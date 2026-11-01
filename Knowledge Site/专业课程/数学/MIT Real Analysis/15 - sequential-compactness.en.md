---
slug: 15-sequential-compactness
title: "How Compactness Restores Bolzano–Weierstrass"
summary: "Two sets that are closed and bounded yet not compact — the interval (0,1] and the unit ball of the continuous function space — then the nested-closed-set lemma for compact sets, and from it the construction of nested closed balls that proves the metric-space Bolzano–Weierstrass theorem."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, metric-spaces, compactness, subsequences]
sources:
  - kind: video
    title: "Lecture 14: Sequential Compactness; Bolzano–Weierstrass Theorem in a Metric Space"
    url: https://www.youtube.com/watch?v=eGKpOd_0oSY
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## The problem: closed and bounded is not enough

The previous lecture defined compactness — every open cover has a finite subcover — and proved that **compact implies closed and bounded**. The natural question is whether the converse holds.

- In $\mathbb R^n$ with the Euclidean metric, **closed and bounded implies compact**; that is a privilege of $\mathbb R^n$.
- In a general metric space it **fails**.

This lecture gives two counterexamples, one mundane and one deep, then proves the main theorem: **every sequence in a compact set has a convergent subsequence**. That is the metric-space Bolzano–Weierstrass theorem, and the real purpose of compactness.

Why is it needed? In $\mathbb R$, the Cauchy convergence theorem is proved via BW; BW fails in a general metric space, so the Cauchy convergence theorem does too. Compactness fills the gap. The lecturer also stresses that the proof **may not assume completeness**, so both the subsequence and its limit must be constructed — which is exactly what the nested-ball lemma delivers.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: covers and compactness |
| 2:51 | Compact implies closed and bounded; converse holds in $\mathbb R^n$, fails in general |
| 4:50 | Counterexample 1: $X=(0,1]$ is closed and bounded but not compact |
| 7:00 | Counterexample 2: the closed unit ball of $C[0,1]$ is not compact |
| 10:42 | Constructing functions pairwise at distance $1$ |
| 19:31 | Half-radius balls show no finite subcover exists |
| 28:57 | Main theorem: every sequence in a compact set has a convergent subsequence |
| 30:17 | Lemma: nested nonempty closed sets in a compact set intersect (proof) |
| 43:29 | Corollary: nested closed balls with radii to zero meet in one point |
| 54:03 | Constructing nested closed balls via covers and doubling |
| 1:13:47 | Completing the proof of BW |

## Recap and two counterexamples

### What is known

Compactness: every open cover of $A$ has a finite subcover. The previous lecture proved two consequences:

1. Compact sets are bounded — cover with radius-$1$ balls, extract a finite subcover, estimate the radius by the triangle inequality.
2. Compact sets are closed — build the open cover $E_n=\{y:d(y,x)>1/n\}$, take a finite subcover, and contradict $x_n\to x$.

### Counterexample 1: $(0,1]$ is not compact

Take $X=(0,1]$ with the usual distance.

- It is **closed** as a subset of itself: the whole space is always closed (its complement is empty, and the empty set is open).
- It is **bounded**: contained in the ball of radius $1$ about $1/2$.
- Yet it is **not compact**. Take

$$
U_n=\left(\frac1n,1\right],\qquad n\in\mathbb N .
$$

For any $x\in(0,1]$, choose $n>1/x$; then $x>1/n$, so $x\in U_n$, and the family covers $X$. But given finitely many $U_{n_1},\dots,U_{n_k}$, let $N=\max n_i$; their union is $U_N=(1/N,1]$, and $1/(N+1)$ lies outside it. No finite subcover exists.

The lesson: **closed and bounded does not imply compact in a general space**. The failure is that the space is missing the point $0$.

### Counterexample 2: the closed unit ball of $C[0,1]$ is not compact

Take $X=C[0,1]$ with

$$
d(f,g)=\max_{x\in[0,1]}|f(x)-g(x)|.
$$

Consider the **closed unit ball**

$$
\overline{B_1(0)}=\{f\in C[0,1] : \max_{x}|f(x)|\le1\}.
$$

**It is closed.** Check the complement is open: if $\max|g|=M>1$, put $s=M-1>0$. If $d(g,h)<s$, then

$$
\max|h|\ge\max|g|-\max|g-h|>M-s=1,
$$

so $h$ also lies in the complement. Hence the complement is open and the ball is closed.

**It is obviously bounded** — it is a ball.

**But it is not compact.** For each $n\in\mathbb N$ define

$$
f_n(x)=
\begin{cases}
1, & 0\le x\le \dfrac{1}{n+1},\\[4pt]
(n+1)(1-nx), & \dfrac{1}{n+1}\le x\le \dfrac1n,\\[4pt]
0, & \dfrac1n\le x\le 1.
\end{cases}
$$

The graph is a step: constant $1$ on the first piece, linear descent to $0$, then $0$. Each piece is continuous and the pieces agree at the joins ($1$ at $x=1/(n+1)$, $0$ at $x=1/n$), so $f_n\in C[0,1]$; and $\max|f_n|=1$, so $f_n\in\overline{B_1(0)}$.

**The key estimate: $d(f_n,f_m)=1$ whenever $n\ne m$.**

Assume $n<m$. At $x=1/(n+1)$:

- $f_n(x)=1$;
- since $m\ge n+1$, we have $1/(n+1)\ge1/m$, so $f_m(x)=0$.

The difference is exactly $1$, so $d(f_n,f_m)\ge1$; both functions take values in $[0,1]$, so $d\le1$. Hence the distance is exactly $1$.

Now consider the family of open balls

$$
\mathcal U=\{B_{1/2}(f) : f\in\overline{B_1(0)}\}.
$$

It covers the ball (each $f$ lies in the ball centred at itself) and every member is open.

**No finite subcover exists.** If $g,h\in B_{1/2}(f)$, the triangle inequality gives

$$
d(g,h)\le d(g,f)+d(f,h)<\frac12+\frac12=1 .
$$

Since distinct $f_n,f_m$ are at distance $1$, **any half-radius ball contains at most one $f_n$**. Finitely many balls therefore contain only finitely many $f_n$, leaving infinitely many uncovered. So no finite subcover exists. $\blacksquare$

This example is far deeper than the first: the space is complete (with the sup norm), closed and plainly bounded, yet not compact. The cause is not a missing point but **infinite dimension** — the unit ball can hold infinitely many points pairwise at distance $1$.

## The nested closed set lemma

The main proof needs one tool.

**Lemma.** Let $A$ be compact. Let $C_1\supseteq C_2\supseteq\cdots$ be a sequence of **nonempty closed** sets contained in $A$ (each closed in $X$). Then

$$
\bigcap_{i=1}^{\infty}C_i\ne\varnothing .
$$

**Proof.** Suppose the intersection is empty. By De Morgan,

$$
X=\left(\bigcap_i C_i\right)^c=\bigcup_i (X\setminus C_i).
$$

Each $X\setminus C_i$ is open (since $C_i$ is closed), so this is an open cover of $A$.

By compactness of $A$ there is a finite subcover:

$$
A\subseteq (X\setminus C_{i_1})\cup\cdots\cup(X\setminus C_{i_k}).
$$

Because the $C_i$ decrease, the complements $X\setminus C_i$ increase; with $N=\max\{i_1,\dots,i_k\}$ the finite union equals $X\setminus C_N$. Hence

$$
A\subseteq X\setminus C_N,
\qquad\text{i.e.}\qquad A\cap C_N=\varnothing .
$$

But $C_N\subseteq A$ and $C_N\ne\varnothing$, a contradiction. Therefore the intersection is nonempty. $\square$

Intuition: compactness compresses "infinitely many conditions hold simultaneously" into "finitely many conditions hold simultaneously", and finitely many nested nonempty sets intersect.

### Corollary: nested closed balls meet in one point

**Corollary.** Let $A$ be compact and let $\overline{B_{R_i}(x_i)}\cap A$ be a nested sequence of nonempty closed sets (each containing the next) with $R_i\to0$. Then their intersection is exactly one point.

**Proof.** Nonemptiness comes from the lemma. If $p,q$ both lie in every set, then for each $i$,

$$
d(p,q)\le d(p,x_i)+d(x_i,q)\le 2R_i .
$$

Letting $i\to\infty$ gives $d(p,q)=0$, so $p=q$. $\square$

Radii tending to zero give uniqueness; compactness gives existence. Together they conjure a limit point out of nothing — exactly what the BW proof needs.

## Main theorem: Bolzano–Weierstrass on compact sets

**Theorem.** Let $A$ be compact and let $(x_n)$ be a sequence in $A$. Then $(x_n)$ has a convergent subsequence, and its limit lies in $A$.

The proof has three moves: use finite covers to single out a chain of balls each holding infinitely many terms, double them to obtain nested closed sets, then use the corollary to extract the unique intersection point as the limit.

### Step 1: one covering

For each $y\in A$ take $B_1(y)$. These cover $A$ and are open. By compactness, finitely many $y_1,\dots,y_k$ satisfy

$$
A\subseteq B_1(y_1)\cup\cdots\cup B_1(y_k).
$$

The sequence has infinitely many terms but lands in finitely many balls, so **at least one ball contains infinitely many terms**. Denote it $B_{r_1}(y_1)$ with $r_1=1$.

From now on, look only at the terms in this ball — they form a subsequence. Call its first term $x_{n_1}$.

### Step 2: refining

Suppose we have an open ball $B_{r_k}(y_k)$ containing infinitely many terms of the current subsequence, with $y_k\in A$.

Set

$$
C_k=\overline{B_{2r_k}(y_k)}\cap A .
$$

$C_k$ is a closed subset of the compact set $A$ (a closed ball intersected with $A$), hence **compact** — this is exactly where the previous lecture's "closed subsets of compact sets are compact" is used.

Cover $C_k$ with open balls of radius $r_{k+1}=r_k/4$ centred at points of $C_k$. By compactness finitely many suffice. The current subsequence has infinitely many terms in $C_k$ (they already lie in $B_{r_k}(y_k)\subseteq C_k$), so **one of these finitely many balls still contains infinitely many terms**. Call it $B_{r_{k+1}}(y_{k+1})$, and choose the next index $n_{k+1}>n_k$ from it.

### Step 3: verifying nestedness

We need $C_{k+1}\subseteq C_k$, otherwise the lemma does not apply.

Both $B_{r_{k+1}}(y_{k+1})$ and $B_{r_k}(y_k)$ contain infinitely many terms, so they intersect. Pick $q$ in the intersection; then

$$
d(y_{k+1},y_k)\le d(y_{k+1},q)+d(q,y_k)<r_{k+1}+r_k .
$$

For any $w\in B_{2r_{k+1}}(y_{k+1})$,

$$
d(w,y_k)\le d(w,y_{k+1})+d(y_{k+1},y_k)<2r_{k+1}+r_{k+1}+r_k=3r_{k+1}+r_k .
$$

Substituting $r_{k+1}=r_k/4$:

$$
3\cdot\frac{r_k}{4}+r_k=\frac{7r_k}{4}<2r_k .
$$

So $B_{2r_{k+1}}(y_{k+1})\subseteq B_{2r_k}(y_k)$, hence $C_{k+1}\subseteq C_k$.

**That is why the ball is doubled.** Using $B_{r_{k+1}}$ directly, part of it could stick outside the previous ball and nestedness would fail; after doubling to $2r_{k+1}=r_k/2$, the triangle inequality fits it inside the ball of radius $2r_k$. Since $r_k$ quarters at each step, $2r_k\to0$.

### Step 4: extracting the limit

By the corollary, $\bigcap_k C_k$ consists of exactly one point $p$. Since $C_k\subseteq A$, we have $p\in A$.

For each $k$, $x_{n_k}\in B_{r_k}(y_k)$ and $p\in\overline{B_{2r_k}(y_k)}$, so

$$
d(x_{n_k},p)\le d(x_{n_k},y_k)+d(y_k,p)<r_k+2r_k=3r_k\to0 .
$$

Hence $x_{n_k}\to p$, completing the proof. $\square$

Nothing assumes completeness: the limit $p$ is **constructed** from nested closed balls rather than presumed. This differs from the $\mathbb R$ argument, where completeness is free and one first extracts a subsequence by BW before showing the whole Cauchy sequence converges.

## What this lecture establishes

- Compact implies closed and bounded; the converse holds in $\mathbb R^n$ but not in general metric spaces.
- $(0,1]$ shows that a missing point breaks compactness; the unit ball of $C[0,1]$ shows that in infinite dimensions even a complete, closed, bounded set may fail to be compact.
- Nested nonempty closed sets in a compact set intersect; if their radii tend to zero, the intersection is a single point.
- Every sequence in a compact set has a convergent subsequence with limit in the set — the metric-space Bolzano–Weierstrass theorem.
- The technique: finite cover to filter → doubling to build nested closed balls → nested lemma to extract the unique limit.
- The theorem does not need completeness, so compactness can replace "complete plus bounded" as the working hypothesis in analysis.

## Comprehension check

**1. Why does the closed unit ball of $C[0,1]$ contain infinitely many functions pairwise at distance $1$? Verify $d(f_n,f_m)=1$.**

Reference answer: Take the step functions $f_n$: equal to $1$ on $[0,1/(n+1)]$, $0$ on $[1/n,1]$, linear in between. Let $n<m$. At $x=1/(n+1)$, $f_n(x)=1$; and since $m\ge n+1$ we have $x\ge1/m$, so $f_m(x)=0$. The difference is $1$, hence $d(f_n,f_m)\ge1$. Both functions take values in $[0,1]$, so the difference never exceeds $1$ and $d\le1$. Therefore $d(f_n,f_m)=1$.

**2. Use this family to show the closed unit ball is not compact.**

Reference answer: Consider the open balls $\{B_{1/2}(f) : f\in\overline{B_1(0)}\}$; they cover the ball. If $g,h\in B_{1/2}(f)$, then $d(g,h)<1$, so one ball cannot contain two distinct $f_n$. Hence finitely many balls contain only finitely many $f_n$, while the ball contains infinitely many, so some are uncovered. No finite subcover exists and the ball is not compact.

**3. Prove the nested closed set lemma: a decreasing sequence of nonempty closed sets in a compact set has nonempty intersection.**

Reference answer: Suppose the intersection is empty. By De Morgan, $\bigcup_i(X\setminus C_i)=X$, so $\{X\setminus C_i\}$ is an open cover of $A$ (each $X\setminus C_i$ is open because $C_i$ is closed). Compactness gives a finite subcover $X\setminus C_{i_1},\dots,X\setminus C_{i_k}$. Since the $C_i$ decrease, with $N=\max i_j$ the finite union equals $X\setminus C_N$, so $A\subseteq X\setminus C_N$, i.e. $A\cap C_N=\varnothing$. But $C_N\subseteq A$ and is nonempty, a contradiction.

**4. In the BW proof, why must the ball of radius $r_{k+1}$ be doubled to $2r_{k+1}$?**

Reference answer: The small balls covering $C_k$ are centred inside $C_k$ and may stick partly outside the previous ball $B_{r_k}(y_k)$, so they cannot be used directly to get nestedness. After doubling, for $w\in B_{2r_{k+1}}(y_{k+1})$ the triangle inequality gives

$$
d(w,y_k)<3r_{k+1}+r_k=\frac{7r_k}{4}<2r_k,
$$

so the doubled ball lies inside $\overline{B_{2r_k}(y_k)}$ and nestedness holds. The radii $2r_k$ still tend to $0$, so uniqueness is preserved.

**5. Why can the proof not simply say "the subsequence is Cauchy, hence convergent"?**

Reference answer: Because "Cauchy implies convergent" fails in a general metric space; it requires completeness, while the hypothesis here is only compactness. The limit must genuinely be constructed: the nested-ball lemma produces a unique intersection point $p$ inside the compact set, and the subsequence is then shown to converge to $p$. Assuming completeness would work but would hide the role of compactness.

**6. Give a compact set and explain why it satisfies the definition; then give a closed, bounded, non-compact set.**

Reference answer: A compact example is $[0,1]\subseteq\mathbb R$: every open cover admits a finite subcover, by Heine–Borel (or via BW on $\mathbb R$). A closed, bounded, non-compact example is $X=(0,1]$ as a subset of itself: the open cover $\{(1/n,1]\}$ has no finite subcover. Another is the closed unit ball of $C[0,1]$.

**7. Let $A$ be compact, $(x_n)\subseteq A$ and $x_n\to x$. Must $x\in A$? Use this lecture's theorem.**

Reference answer: Yes. Since $A$ is compact, BW gives a subsequence $x_{n_k}\to p\in A$. But the whole sequence converges to $x$, so every subsequence converges to $x$; uniqueness of limits gives $p=x$, hence $x\in A$. This also yields a new proof that compact sets are closed.

## Relation to neighbouring lectures

The previous lecture defined compactness by open covers and showed it implies closed and bounded; this one fills the crucial gap in the converse — closed and bounded is not enough in a general space, but compactness guarantees a convergent subsequence for every sequence. The next lecture leaves metric spaces for differentiation: the derivative is defined through difference quotients, differentiability is shown to imply continuity, and the same "insert an intermediate term" trick proves the sum, product, quotient and chain rules.
