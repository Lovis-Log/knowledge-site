---
slug: "04-sequences-convergence"
title: "Sequences and Convergence: The ε-N Definition, Limit Laws, and Subsequences"
summary: "We turn 'getting closer' into the ε-N definition and practise it on 1/n and 0.999…; prove that convergent sequences are bounded; prove the limit laws one by one, including the inserted-middle-term trick for products and the away-from-zero bound for reciprocals; and define subsequences, proving that convergence is equivalent to all subsequences converging to the same limit."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [mathematics]
tags: [real-analysis, sequences, convergence, limit-laws, subsequences]
sources:
  - kind: video
    title: "Lecture 4: Sequences; Convergence"
    url: "https://www.youtube.com/watch?v=PzeCGelnheE"
    author: "Tobias Holck Colding, MIT OpenCourseWare"
    publishedAt: "2025-09-02"
---

## From "getting closer" to a definition

The previous lecture wrote $\sqrt2$ as the limit of its truncations, but "limit" was still intuition. This lecture turns it into something checkable.

The intuitive version says: $a_n$ gets closer and closer to $a$. The trouble is that "closer" is not quantified — how close counts, and do the first hundred messy terms matter?

The definition hands the notion of closeness to a challenger. Whatever accuracy $\varepsilon>0$ is demanded, you must produce a threshold $N$ beyond which every term lies within $\varepsilon$ of $a$. Surviving every $\varepsilon$ is what convergence means.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | A sequence is a function $\mathbb N\to\mathbb R$; the definition of convergence |
| 9:19 | Example: a rigorous proof that $0.999\ldots=1$ |
| 15:56 | Theorem: convergent sequences are bounded |
| 25:29 | Four limit laws |
| 31:10 | Formal proofs for scalar multiples and sums |
| 42:47 | Products: inserting a middle term |
| 54:44 | Reciprocals: the denominator stays away from zero |
| 1:04:00 | Subsequences: definition and non-examples |
| 1:11:43 | Theorem: convergence iff every subsequence converges to the same limit |

## The definition

**Definition.** A sequence $(a_n)$ **converges to** $a$ if

$$
\forall \varepsilon>0\ \ \exists N\in\mathbb N\ \ \forall n\ge N:\quad |a_n-a|<\varepsilon .
$$

One writes $a_n\to a$ or $\lim_{n\to\infty}a_n=a$. A sequence that does not converge **diverges**.

The reading matters: the first two quantifiers belong to different people. $\varepsilon$ is chosen by the challenger, $N$ by you; $N$ may depend on $\varepsilon$ but **not on $n$**. Once $N$ is fixed, every later index must satisfy the demand. That is what "eventually" means: finitely many exceptions are irrelevant.

Geometrically, draw the interval $(a-\varepsilon,a+\varepsilon)$ around $a$. The definition says that however narrow the interval, the sequence eventually falls inside it and stays there.

## Three examples

### $a_n=(-1)^n$ diverges

The sequence jumps between $-1$ and $1$. No candidate $a$ can capture it: for $\varepsilon=1/2$, the interval around $a$ cannot contain both $-1$ and $1$, and both values recur in every long tail.

Formally: suppose $a_n\to a$ and take $\varepsilon=1/2$, giving $N$. For even $n\ge N$, $|1-a|<1/2$; for odd $m\ge N$, $|-1-a|<1/2$. Then

$$
2=|1-(-1)|\le|1-a|+|a-(-1)|<\frac12+\frac12=1,
$$

a contradiction.

### $a_n=1/n\to0$

Given $\varepsilon>0$, the Archimedean property provides $N\in\mathbb N$ with $N>1/\varepsilon$, i.e. $1/N<\varepsilon$. For $n\ge N$,

$$
\left|\frac1n-0\right|=\frac1n\le\frac1N<\varepsilon .
$$

So $1/n\to0$. This is the standard pattern: **build $N$ from the Archimedean property, then verify**.

### $0.999\ldots=1$

Define the infinite decimal through its truncations

$$
a_n=\underbrace{0.999\ldots9}_{n\text{ nines}}=1-10^{-n}.
$$

Given $\varepsilon>0$, choose $N$ with $1/N<\varepsilon$. For $n\ge N$,

$$
|a_n-1|=10^{-n}\le\frac1n\le\frac1N<\varepsilon .
$$

(The first inequality holds because $10^n\ge n$, provable by induction.) Hence $0.999\ldots=1$.

Note something important: every truncation is strictly below $1$, yet the limit equals $1$. **A limit need not be one of the terms**; it describes only the behaviour of the tail.

## Convergent sequences are bounded

**Theorem.** If $(a_n)$ converges, then the set $\{a_n:n\in\mathbb N\}$ is bounded.

**Proof.** Let $a_n\to a$. Take $\varepsilon=1$; there is $N_0$ with $|a_n-a|<1$ for $n\ge N_0$. By the triangle inequality,

$$
|a_n|=|a_n-a+a|\le|a_n-a|+|a|<1+|a| \quad (n\ge N_0).
$$

Only the first $N_0-1$ terms remain, a finite set. Let

$$
C=\max\{|a_1|,|a_2|,\dots,|a_{N_0-1}|\}
$$

(with $C=0$ if $N_0=1$). Then for every $n$,

$$
|a_n|\le\max\{C,\,|a|+1\},
$$

so the sequence is bounded. $\square$

The structure is worth remembering: **the tail is infinite but orderly, the head finite but wild**. One fixed $\varepsilon$ controls the tail; a maximum controls the head. Many later proofs reuse this cut-in-two device.

The converse fails: $(-1)^n$ is bounded yet divergent. Boundedness is necessary, not sufficient.

## The limit laws

Suppose $a_n\to a$ and $b_n\to b$. Then

1. $ca_n\to ca$ for $c\in\mathbb R$;
2. $a_n+b_n\to a+b$;
3. $a_nb_n\to ab$;
4. if all $a_n\ne0$ and $a\ne0$, then $1/a_n\to1/a$.

The lecture writes (1) and (2) as formal proofs and gives detailed outlines for (3) and (4).

### (1) Scalar multiples

If $c=0$ both sides vanish and the claim is trivial. Let $c\ne0$. Given $\varepsilon>0$, the number $\varepsilon/|c|$ is positive. Since $a_n\to a$, there is $N$ with $|a_n-a|<\varepsilon/|c|$ for $n\ge N$. Multiplying by $|c|$,

$$
|ca_n-ca|=|c|\,|a_n-a|<\varepsilon .
$$

Hence $ca_n\to ca$.

The key move: **convert the given $\varepsilon$ into the accuracy you need**, $\varepsilon/|c|$. Since the definition holds for every positive number, any positive substitute is allowed.

### (2) Sums

Given $\varepsilon>0$. Since $a_n\to a$ there is $N_a$ with $|a_n-a|<\varepsilon/2$ for $n\ge N_a$; since $b_n\to b$ there is $N_b$ with $|b_n-b|<\varepsilon/2$ for $n\ge N_b$.

Set $N=\max\{N_a,N_b\}$. For $n\ge N$ both inequalities hold, so

$$
|(a_n+b_n)-(a+b)|\le|a_n-a|+|b_n-b|<\frac\varepsilon2+\frac\varepsilon2=\varepsilon .
$$

Hence $a_n+b_n\to a+b$.

Two errors are split in half, and the thresholds are combined by taking the maximum — because both conditions must hold **simultaneously**.

### (3) Products: insert a middle term

Comparing $a_nb_n$ with $ab$ directly is hard because both factors move. The trick is to insert $ab_n$:

$$
a_nb_n-ab=a_nb_n-ab_n+ab_n-ab=a_n(b_n-b)+b(a_n-a).
$$

Each piece now has only one moving factor:

$$
|a_nb_n-ab|\le|a_n|\,|b_n-b|+|b|\,|a_n-a| .
$$

The second piece carries the constant $|b|$ and is easy. The first carries $|a_n|$, which is not constant, but the previous theorem gives boundedness: there is $C$ with $|a_n|\le C$ for all $n$. Hence

$$
|a_nb_n-ab|\le C|b_n-b|+|b|\,|a_n-a| .
$$

Now given $\varepsilon>0$, arrange

$$
|b_n-b|<\frac{\varepsilon}{2(C+1)},
\qquad
|a_n-a|<\frac{\varepsilon}{2(|b|+1)}
$$

for $n\ge N_b$ and $n\ge N_a$ respectively, and set $N=\max\{N_a,N_b\}$. For $n\ge N$,

$$
|a_nb_n-ab|<\frac{C\varepsilon}{2(C+1)}+\frac{|b|\varepsilon}{2(|b|+1)}<\frac\varepsilon2+\frac\varepsilon2=\varepsilon .
$$

So $a_nb_n\to ab$.

The denominators $C+1$ and $|b|+1$ rather than $C$ and $|b|$ avoid division by zero: the expressions stay meaningful even when $C=0$ or $b=0$.

**This insertion trick recurs.** The lecture notes that the product rule for derivatives (Leibniz) uses the same split, inserting $f(x+h)g(x)$ into $f(x+h)g(x+h)-f(x)g(x)$.

### (4) Reciprocals: the denominator stays away from zero

We want $1/a_n\to1/a$. First put over a common denominator:

$$
\left|\frac1{a_n}-\frac1a\right|
=\left|\frac{a-a_n}{a_na}\right|
=\frac{|a_n-a|}{|a_n|\,|a|}.
$$

The numerator tends to $0$; the danger is the denominator, since a small $|a_n|$ inflates the quotient. So we must show that **eventually $|a_n|$ is not small**.

Since $a\ne0$, $|a|/2>0$. Because $a_n\to a$, there is $N_1$ with

$$
|a_n-a|<\frac{|a|}{2}\quad (n\ge N_1).
$$

By the reverse triangle inequality $|a|-|a_n|\le|a-a_n|$,

$$
|a_n|>|a|-\frac{|a|}{2}=\frac{|a|}{2}\quad (n\ge N_1).
$$

Thus for $n\ge N_1$,

$$
\left|\frac1{a_n}-\frac1a\right|
=\frac{|a_n-a|}{|a_n|\,|a|}
<\frac{|a_n-a|}{(|a|/2)\cdot|a|}
=\frac{2|a_n-a|}{|a|^2}.
$$

Finally, given $\varepsilon>0$, choose $N\ge N_1$ so that $|a_n-a|<\dfrac{\varepsilon|a|^2}{2}$ for $n\ge N$. Then

$$
\left|\frac1{a_n}-\frac1a\right|<\varepsilon .
$$

Hence $1/a_n\to1/a$.

The core fact is one sentence: **a nonzero limit eventually pushes the sequence at least $|a|/2$ away from zero**. Every division argument rests on it.

## Subsequences

### Definition

Let $(a_n)$ be a sequence and $g:\mathbb N\to\mathbb N$ **strictly increasing**. Then

$$
b_k=a_{g(k)}
$$

is a **subsequence** of $(a_n)$, usually written $(a_{n_k})$.

Strict increase means $n_1<n_2<n_3<\cdots$: only forward, never backward, never standing still. This rules out two fake subsequences:

- repeating a term, e.g. taking $1,1,2,\dots$ from $1,2,3,4,\dots$;
- reordering, e.g. taking $3,2,4,5,\dots$.

Legal examples from $(-1)^n$: all even indices give the constant sequence $1,1,1,\dots$; all odd indices give $-1,-1,-1,\dots$; a mixed pattern such as "two odd, then two even" is also legal, provided the indices strictly increase.

### Theorem: convergence iff every subsequence converges

**Theorem.** $a_n\to a$ if and only if every subsequence of $(a_n)$ converges to $a$.

**Proof.** "$\Leftarrow$" is trivial: take $g(k)=k$ (strictly increasing); the corresponding subsequence is the original sequence. If every subsequence converges to $a$, the sequence itself does.

"$\Rightarrow$": let $a_n\to a$ and let $(a_{n_k})$ be any subsequence. Given $\varepsilon>0$, there is $N$ with $|a_n-a|<\varepsilon$ for $n\ge N$.

Because $g$ is strictly increasing with natural values, induction gives $n_k\ge k$: $n_1\ge1$ and each step increases by at least $1$. Hence for $k\ge N$, $n_k\ge k\ge N$, so

$$
|a_{n_k}-a|<\varepsilon .
$$

Therefore $a_{n_k}\to a$. $\square$

The most useful form is the contrapositive: **two subsequences with different limits force divergence**. For $(-1)^n$, the even terms converge to $1$ and the odd terms to $-1$, so the sequence diverges — far less work than negating the definition directly.

Note that a single convergent subsequence does **not** imply convergence of the original. A constant subsequence can be extracted whenever some value occurs infinitely often, while the original may still jump around.

## What this lecture establishes

- $a_n\to a$ means: $\forall\varepsilon>0\ \exists N\ \forall n\ge N$, $|a_n-a|<\varepsilon$; $N$ may depend on $\varepsilon$, not on $n$.
- Convergence constrains only the tail; finitely many exceptions are irrelevant, and the limit need not be a term.
- Convergent implies bounded; bounded does not imply convergent.
- Limit laws: scale $\varepsilon$ by $|c|$; split $\varepsilon/2$ and take the maximum threshold for sums; insert $ab_n$ and use boundedness for products; use $|a_n|>|a|/2$ for reciprocals.
- A subsequence comes from a strictly increasing index map; it preserves order and never repeats.
- Convergence is equivalent to every subsequence converging to the same limit; two different subsequential limits prove divergence.

## Comprehension check

**1. Why may $N$ depend on $\varepsilon$ but not on $n$? What would the definition become if $N$ could depend on $n$?**

Reference answer: Convergence requires that one threshold works for every sufficiently large index. Dependence on $\varepsilon$ is allowed because the challenger fixes the accuracy first and you respond with a threshold. Dependence on $n$ would let you choose $N=n$ for each term, reducing the condition to $|a_n-a|<\varepsilon$ for every $n$ — which every sequence satisfies, so the definition would carry no content.

**2. Prove from the definition that $a_n=\dfrac{2n+1}{n}\to2$.**

Reference answer: Simplify first: $|a_n-2|=\left|\frac{2n+1-2n}{n}\right|=\frac1n$. Given $\varepsilon>0$, the Archimedean property gives $N\in\mathbb N$ with $N>1/\varepsilon$. For $n\ge N$, $|a_n-2|=\frac1n\le\frac1N<\varepsilon$. Hence $a_n\to2$.

**3. Why must the boundedness proof split the sequence into the first $N_0-1$ terms and the tail? What does using only $\varepsilon=1$ miss?**

Reference answer: Taking $\varepsilon=1$ yields $|a_n|<|a|+1$ only for $n\ge N_0$; it says nothing about the finitely many earlier terms, which may be arbitrarily large and unrelated to $a$. Those must be handled separately: they form a finite set, so take $C$ to be their maximum absolute value, then take the maximum of $C$ and $|a|+1$ to cover everything. Without this step one only proves eventual boundedness, not boundedness of the whole sequence.

**4. In the product proof, why insert $ab_n$, and why prove boundedness of $(a_n)$ first?**

Reference answer: Directly estimating $|a_nb_n-ab|$ leaves two varying factors that cannot be separated. Inserting $ab_n$ splits it into $a_n(b_n-b)+b(a_n-a)$: the first piece has only $b_n-b$ varying, the second only $a_n-a$ varying, with $b$ constant. Controlling the first piece requires replacing $|a_n|$ by a constant $C$, which is exactly what boundedness supplies. Without it the bound for the first piece would itself vary with $n$ and could not be made uniformly less than $\varepsilon/2$.

**5. If two subsequences converge to different limits, does the original sequence converge? Conversely, does one convergent subsequence imply convergence?**

Reference answer: In the first case the original diverges: if $a_n\to a$, the theorem makes every subsequence converge to $a$, so two distinct limits are impossible. In the second case convergence does not follow: the even-indexed subsequence of $(-1)^n$ is constantly $1$ and converges, yet the sequence diverges. One convergent subsequence only shows regularity along a sparse set of indices.

**6. Use subsequences to show that $a_n=(-1)^n+\frac1n$ diverges.**

Reference answer: The even terms give $a_{2k}=1+\frac1{2k}\to1$; the odd terms give $a_{2k-1}=-1+\frac1{2k-1}\to-1$. Both subsequences converge, to different limits, so by the contrapositive the sequence diverges. This is simpler than negating the $\varepsilon$ definition for every candidate limit.

## Relation to neighbouring lectures

This lecture supplies the definition and the basic toolkit. The next lecture uses completeness to prove the **monotone convergence theorem**: a monotone bounded sequence converges — the first time "bounded" becomes sufficient. Lecture 6's Cauchy criterion rewrites existence of a limit without referring to the limit, preparing Lecture 7's Bolzano–Weierstrass theorem.

The thread is becoming clear: definition (this lecture) → sufficient condition (monotone plus bounded) → intrinsic criterion (Cauchy) → compactness (Bolzano–Weierstrass).
