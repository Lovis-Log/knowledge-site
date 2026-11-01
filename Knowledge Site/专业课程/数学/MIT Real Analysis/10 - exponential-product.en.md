---
slug: 10-exponential-product
title: "Products of Series, the Exponential Addition Formula, and a Nowhere Continuous Function"
summary: "The product theorem for non-negative series is proved first, then combined with the binomial expansion to give E(x+y)=E(x)E(y). The lecture returns to continuity, constructs the Dirichlet function (0 on rationals, 1 on irrationals) and proves it continuous nowhere, and completes the proofs of the composition and reciprocal rules."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, series, exponential, continuity, dirichlet-function]
sources:
  - kind: video
    title: "Lecture 10: Continuous Functions; Exponential Function (cont.)"
    url: https://www.youtube.com/watch?v=1qHVpGA_qfs
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Two debts from the last lecture

The previous lecture defined
$$
E(x)=\sum_{n=0}^{\infty}\frac{x^n}{n!},
$$
and borrowed the addition formula $E(x+y)=E(x)E(y)$ twice without proof: once to show $E(x)>0$ for negative $x$, once to verify $e^{m/n}=E(m/n)$. This lecture repays the debt.

Two further facts are assigned as exercises (problem set 5) rather than proved in class:

- $E$ is continuous on $\mathbb R$;
- two continuous functions on $\mathbb R$ that agree on $\mathbb Q$ agree everywhere.

Together they say that $E$ is the unique continuous extension of the function $e^x$ first defined on $\mathbb Q$. In other words, the exponential function is pinned down by these two properties — it must be the one given by the power series.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap of power series and $E$; the two outstanding debts |
| 5:23 | To be proved in the pset: $E$ is continuous; continuous functions agreeing on $\mathbb Q$ agree everywhere |
| 7:17 | Product theorem for non-negative series |
| 12:43 | Full proof of the product theorem (two inequalities) |
| 30:03 | Corollary: products of absolutely convergent series converge absolutely |
| 35:56 | Why non-negativity is essential: rearrangements change the sum |
| 43:16 | The addition formula via the product theorem and the binomial theorem |
| 51:05 | Review of continuity |
| 54:07 | The Dirichlet function: continuous nowhere |
| 1:02:50 | Algebraic rules; proofs for composition and reciprocal |

## Product theorem for non-negative series

**Theorem.** Let $\sum a_n$ and $\sum b_n$ be convergent series of non-negative terms. Define
$$
c_n=\sum_{i=0}^{n}a_i b_{n-i},
$$
so that the two indices always sum to $n$. Then $\sum c_n$ converges and
$$
\sum_{n=0}^{\infty}c_n=\left(\sum_{n=0}^{\infty}a_n\right)\left(\sum_{n=0}^{\infty}b_n\right).
$$

Write the partial sums as
$$
S_n^a=\sum_{i=0}^{n}a_i,\qquad S_n^b=\sum_{i=0}^{n}b_i,\qquad S_n^c=\sum_{k=0}^{n}c_k .
$$

### Proof

For non-negative series, convergence is equivalent to boundedness of partial sums, so two inequalities suffice.

**Upper bound: $S_n^c\le S_n^a S_n^b$.**

Expand $S_n^aS_n^b$, obtaining every $a_ib_j$ with $0\le i,j\le n$. Group by $i+j=k$:

- for $k\le n$, every split $(i,k-i)$ has both indices at most $n$, so each term of $c_k=\sum_{i=0}^{k}a_ib_{k-i}$ appears in the product;
- for $k>n$, some terms are absent (for instance $a_{n+1}b_0$ never appears).

So $S_n^aS_n^b$ contains all of $c_0,\dots,c_n$ and possibly extra non-negative terms:
$$
S_n^c\le S_n^aS_n^b .
$$

**Lower bound: $S_n^aS_n^b\le S_{2n}^c$.**

Every product term $a_ib_j$ has $i+j\le2n$, so it appears inside $c_{i+j}$, which is counted in $S_{2n}^c$:
$$
S_n^aS_n^b\le S_{2n}^c .
$$

**Squeeze.** Combining,
$$
S_n^c\le S_n^aS_n^b\le S_{2n}^c .
$$
As $n\to\infty$, the left and right sides both tend to $\sum c_n$ (monotone convergence), while the middle tends to $(\sum a_n)(\sum b_n)$. Hence
$$
\sum_{n=0}^{\infty}c_n=\left(\sum a_n\right)\left(\sum b_n\right). \qquad\square
$$

The key point: **both inequalities use only non-negativity**. No estimate of constants is needed, and neither sum must be known.

### Corollary: the absolutely convergent case

If $\sum a_n$ and $\sum b_n$ **converge absolutely**, then $\sum c_n$ converges absolutely, with the same product formula.

Proof: by the triangle inequality,
$$
|c_n|=\left|\sum_{i=0}^{n}a_ib_{n-i}\right|\le\sum_{i=0}^{n}|a_i|\,|b_{n-i}| .
$$
The right side is exactly the product series formed from the non-negative series $\sum|a_n|$ and $\sum|b_n|$, which converges by the theorem. Comparison gives convergence of $\sum|c_n|$.

This corollary is precisely what extends the addition formula beyond $x,y\ge0$.

### Why non-negativity matters: order changes the sum

For a non-negative series the order of summation is irrelevant: one may add the fifth, seventh and hundred-and-nineteenth terms first and fill in the first term later, and the sum is unchanged.

Once negative terms appear and absolute convergence fails, order becomes decisive. Take the alternating harmonic series
$$
\sum_{n=1}^{\infty}\frac{(-1)^n}{n},
$$
which converges (by the alternating series test) but not absolutely. The lecture notes that rearranging its terms can make it diverge, or make it converge to any prescribed real number: add enough negative terms to push the sum far down, then a few positive ones to pull it back, and repeat — the limit is determined entirely by the ordering.

Note: this statement is usually called the Riemann rearrangement theorem; the lecture mentions it only in words.

This explains why the product theorem restricts to non-negative terms: the proof compares different groupings of the same terms, and only in the non-negative case is such a comparison safe.

## The exponential addition formula

**Theorem.** For all real $x,y$,
$$
E(x+y)=E(x)E(y).
$$

The lecture proves the case $x,y\ge0$; the general case follows from the corollary.

**Proof ($x,y\ge0$).** Set
$$
a_n=\frac{x^n}{n!},\qquad b_n=\frac{y^n}{n!},\qquad c_n=\frac{(x+y)^n}{n!}.
$$
The first two series converge for every real argument (ratio test), with sums $E(x)$ and $E(y)$; the $c_n$ are non-negative. If we show
$$
c_n=\sum_{i=0}^{n}a_ib_{n-i},
$$
the product theorem yields $\sum c_n=E(x)E(y)$, and the left side is $E(x+y)$ by definition.

That identity is just the binomial theorem:
$$
(x+y)^n=\sum_{i=0}^{n}\binom{n}{i}x^i y^{n-i},
\qquad
\binom{n}{i}=\frac{n!}{i!\,(n-i)!}.
$$
Therefore
$$
c_n=\frac{(x+y)^n}{n!}
=\frac{1}{n!}\sum_{i=0}^{n}\frac{n!}{i!\,(n-i)!}x^iy^{n-i}
=\sum_{i=0}^{n}\frac{x^i}{i!}\cdot\frac{y^{n-i}}{(n-i)!}
=\sum_{i=0}^{n}a_ib_{n-i},
$$
exactly the required shape. $\square$

For general signs the corollary applies: both sides can be written as products of absolutely convergent series, and matching terms gives equality. The lecture does not spell this out, saying only that it is not hard.

Note: with the addition formula in hand, both borrowed facts from the previous lecture follow — $E(x)=1/E(-x)>0$ for negative $x$, and $e^{m/n}=E(m/n)$.

## Review of continuity

$f$ is continuous at a point $x_0$ of its domain if for every $\varepsilon>0$ there is $\delta>0$ such that whenever $x$ lies in the domain and $|x-x_0|<\delta$,
$$
|f(x)-f(x_0)|<\varepsilon .
$$

Nothing is assumed about the domain: it may be an interval, a scattered set, or $\mathbb Q$. That freedom is what makes the next counterexample possible.

## A function continuous nowhere

**Dirichlet function.**
$$
f(x)=
\begin{cases}
0, & x\in\mathbb Q,\\[2pt]
1, & x\notin\mathbb Q.
\end{cases}
$$

**Theorem.** $f$ is continuous at no point.

### At rational points

Let $x_0\in\mathbb Q$, so $f(x_0)=0$, and let $\delta>0$ be arbitrary. Since $\sqrt2\notin\mathbb Q$, for every positive integer $n$ the number
$$
x=x_0+\frac{\sqrt2}{n}
$$
is irrational (rational plus irrational is irrational), and $|x-x_0|=\dfrac{\sqrt2}{n}<\delta$ for $n$ large enough. But $f(x)=1$, so
$$
|f(x)-f(x_0)|=|1-0|=1 .
$$
Taking $\varepsilon=\tfrac12<1$, no neighbourhood of any size works. So $f$ is discontinuous at $x_0$.

### At irrational points

Let $x_0\notin\mathbb Q$, so $f(x_0)=1$. Every open interval contains a rational number (density of $\mathbb Q$), so for any $\delta>0$ there is $x\in\mathbb Q$ with $|x-x_0|<\delta$. Then
$$
|f(x)-f(x_0)|=|0-1|=1,
$$
and again $\varepsilon=\tfrac12$ disproves continuity.

### Intuition

The graph consists of two "horizontal lines": one at $0$ over the rationals, one at $1$ over the irrationals. The two sets are densely interleaved, so the graph cannot be drawn — but the example makes a sharp point: continuity is not about behaving well among points of the same kind, but about **all points in a neighbourhood**. This answers the student's question: among rationals the function does look constant, but continuity does not let you choose your neighbours.

## Two algebraic rules proved

The previous lecture listed five rules; two are proved here.

### Composition (rule 5)

Let $f:A\to B$ and $g:B\to\mathbb R$ be continuous, and let $h=g\circ f$. Show $h$ is continuous at $x_0$; write $y_0=f(x_0)$.

Given $\varepsilon>0$. Since $g$ is continuous at $y_0$, there is $\delta_g>0$ with
$$
|y-y_0|<\delta_g\ \Rightarrow\ |g(y)-g(y_0)|<\varepsilon .
$$
Now use $\delta_g$ as the "$\varepsilon$" for $f$: since $f$ is continuous at $x_0$, there is $\delta_f>0$ with
$$
|x-x_0|<\delta_f\ \Rightarrow\ |f(x)-f(x_0)|=|f(x)-y_0|<\delta_g .
$$
Then for $|x-x_0|<\delta_f$, putting $y=f(x)$ into the first statement,
$$
|h(x)-h(x_0)|=|g(f(x))-g(f(x_0))|<\varepsilon .
$$
So $h$ is continuous at $x_0$. $\square$

The proof runs **from the outside in**: the continuity of $g$ supplies $\delta_g$, which then becomes the target accuracy for $f$. This is the same structure as for compositions of sequences, with $N$ replaced by $\delta$.

### Reciprocal (rule 4)

Let $f$ be continuous at $x_0$ with $f(x_0)\ne0$. Show $1/f$ is continuous at $x_0$.

Compute
$$
\left|\frac{1}{f(x)}-\frac{1}{f(x_0)}\right|
=\frac{|f(x_0)-f(x)|}{|f(x)|\,|f(x_0)|}.
$$
The numerator is controllable; the difficulty is that $|f(x)|$ may be small. So **first keep $f(x)$ away from zero**.

Since $f(x_0)\ne0$ and $f$ is continuous, applying continuity with "$\varepsilon$" equal to $\dfrac{|f(x_0)|}{2}$ gives $\delta_1>0$ such that $|x-x_0|<\delta_1$ implies
$$
|f(x)-f(x_0)|<\frac{|f(x_0)|}{2}.
$$
The reverse triangle inequality,
$$
|f(x_0)|=|f(x_0)-f(x)+f(x)|\le|f(x_0)-f(x)|+|f(x)|,
$$
gives
$$
|f(x)|\ge|f(x_0)|-|f(x_0)-f(x)|>\frac{|f(x_0)|}{2}.
$$
Hence for $|x-x_0|<\delta_1$,
$$
\left|\frac{1}{f(x)}-\frac{1}{f(x_0)}\right|
<\frac{2}{|f(x_0)|^2}\,|f(x)-f(x_0)| .
$$
Choose $\delta_2>0$ so that $|f(x)-f(x_0)|<\dfrac{\varepsilon|f(x_0)|^2}{2}$ whenever $|x-x_0|<\delta_2$, and set $\delta=\min\{\delta_1,\delta_2\}$. Then
$$
\left|\frac{1}{f(x)}-\frac{1}{f(x_0)}\right|<\varepsilon .
$$
So $1/f$ is continuous at $x_0$. $\square$

The pattern matches the product rule's "first prove boundedness": **push the denominator away from zero, then allocate the error**. Only this time a lower bound, not an upper bound, is needed.

## What this lecture establishes

- Product theorem: for non-negative series, $c_n=\sum_{i=0}^{n}a_ib_{n-i}$ gives $\sum c_n=(\sum a_n)(\sum b_n)$, proved by $S_n^c\le S_n^aS_n^b\le S_{2n}^c$.
- Products of absolutely convergent series converge absolutely.
- Non-negativity cannot be dropped: rearrangements change the sum of a conditionally convergent series, even arbitrarily.
- The binomial theorem writes $((x+y)^n/n!)$ as a product series, giving $E(x+y)=E(x)E(y)$.
- The Dirichlet function is discontinuous at rational and irrational points alike, because each set is dense in the other.
- Compositions pass $\delta$ from outside in; reciprocals are handled by first pushing the denominator below $|f(x_0)|/2$ in absolute value.

## Comprehension check

**1. Which inequality does each half of the product-theorem proof use, and why is neither alone enough?**

Reference answer: $S_n^c\le S_n^aS_n^b$ shows the product contains at least the first $n$ blocks, using termwise non-negativity (extra terms cannot shrink the sum). $S_n^aS_n^b\le S_{2n}^c$ shows every term of the expanded product sits in some $c_k$ with $k\le2n$, again using non-negativity. With only the upper bound, $\sum c_n$ could be smaller than the product; with only the lower bound, larger. Squeezing gives equality. Without non-negativity, cancellation can break both comparisons.

**2. Why expand $(x+y)^n$ binomially before applying the product theorem? Which objects correspond?**

Reference answer: The product theorem handles $c_n=\sum_{i=0}^{n}a_ib_{n-i}$, while the term of $E(x+y)$ is $(x+y)^n/n!$. The binomial theorem gives
$$
\frac{(x+y)^n}{n!}=\sum_{i=0}^{n}\frac{x^i}{i!}\cdot\frac{y^{n-i}}{(n-i)!},
$$
so $c_n$ takes the required shape with $a_i=x^i/i!$ and $b_j=y^j/j!$. Matching done, the theorem yields $\sum c_n=(\sum a_n)(\sum b_n)=E(x)E(y)$.

**3. In the Dirichlet-function proof at rational points, why construct $x_0+\sqrt2/n$?**

Reference answer: One needs a sequence of **irrational** numbers approaching the rational point $x_0$. Since $x_0$ is rational and $\sqrt2$ irrational, $x_0+\sqrt2/n$ is irrational (a rational plus an irrational is irrational), and it tends to $x_0$ as $n\to\infty$. Hence every neighbourhood, however small, contains a point with value $1$ while $f(x_0)=0$; the gap is $1$, so any $\varepsilon<1$ disproves continuity. At irrational points one instead uses density of the rationals.

**4. Why take $\delta_1$ making $|f(x)-f(x_0)|<|f(x_0)|/2$ in the reciprocal proof?**

Reference answer: In
$$
\left|\frac1{f(x)}-\frac1{f(x_0)}\right|=\frac{|f(x_0)-f(x)|}{|f(x)||f(x_0)|}
$$
the denominator contains $|f(x)|$, which can be arbitrarily small near $x_0$; controlling the numerator alone is not enough. With $|f(x)-f(x_0)|<|f(x_0)|/2$, the reverse triangle inequality gives $|f(x)|>|f(x_0)|/2$, a positive lower bound independent of $x$. Only then can the expression be bounded by a constant multiple of $|f(x)-f(x_0)|$, and $\varepsilon$ allocated.

**5. Why does the definition of continuity allow a domain such as $\mathbb Q$, and what is that good for here?**

Reference answer: The $\varepsilon$-$\delta$ condition only quantifies over points of the domain within $\delta$ of $x_0$; the domain need not be an interval or connected. So continuity of $E$ restricted to $\mathbb Q$ makes sense. This allows one to define $e^x$ first on $\mathbb Q$, then prove $E$ continuous on $\mathbb R$ and agreeing with it on $\mathbb Q$; since two continuous functions agreeing on $\mathbb Q$ agree everywhere, $E$ is the unique extension.

## Relation to neighbouring lectures

With the addition formula proved, the exponential is complete as an object: defined by a power series and satisfying $E(x+y)=E(x)E(y)$. It also makes a broader point: **a power series is not merely a formal infinite polynomial — it can carry a function's definition**.

On continuity, the lecture supplies two of the harder algebraic rules and a counterexample showing how strong the notion is. The next lecture turns to the two fundamental theorems about continuous functions — extreme values and intermediate values — and moves the discussion into metric spaces, preparing for compactness. The intermediate value theorem announced in the very first lecture will then be genuinely proved.
