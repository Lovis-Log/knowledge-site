---
slug: 07-catalan-generating-function
title: "The generating function for Catalan numbers"
summary: "The full-binary-tree recurrence C_n=ΣC_jC_{n−j−1} yields C(x)=1+xC(x)²; solving the quadratic and choosing the right root, then expanding by the binomial theorem, gives C_n=(1/(n+1))C(2n,n). A decomposition of Dyck paths at their first return produces the same equation by a different route."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [combinatorics, generating-functions, catalan-numbers, trees]
sources:
  - kind: video
    title: "Lecture 7: Generating Functions for Catalan Numbers"
    url: https://www.youtube.com/watch?v=JNSyyOAeMOc
    author: "Peter Shor, MIT OpenCourseWare"
    publishedAt: 2025-12-18
---

## What this lecture is for

The Catalan numbers $C_0,C_1,C_2,\dots=1,1,2,5,14,42,\dots$ count many objects that look unrelated: full binary trees, Dyck paths, balanced bracketings, triangulations of polygons. The previous lecture solved a linear recurrence with generating functions; this one takes on a **nonlinear** recurrence whose generating function satisfies a quadratic equation.

Three steps: write the equation for $C(x)$; solve it in closed form; expand by the binomial theorem to obtain

$$
C_n=\frac{1}{n+1}\binom{2n}{n}.
$$

## Timeline

| Time | Topic |
| --- | --- |
| 0:01 | What Catalan numbers count: full binary trees, Dyck paths |
| 3:39 | The recurrence for binary trees |
| 7:03 | The functional equation $C=1+xC^2$ |
| 8:34 | Solving the quadratic, comparing the two roots |
| 11:27 | Expanding with the binomial theorem |
| 13:43 | Computing the $x^3$ coefficient as a check |
| 18:21 | Arriving at $C_n=\frac{1}{n+1}\binom{2n}{n}$ |
| 25:43 | A second derivation: decomposing Dyck paths |
| 37:43 | The sequence theorem in general form |
| 43:14 | Application: tiling a $2\times n$ strip and its recurrence |

## Two faces of the Catalan numbers

Two models recur throughout the lecture and give the same sequence.

- **Full binary trees**: every internal vertex has exactly two children. Trees with $2n+1$ vertices number $C_n$; for $n=3$ there are $5$.
- **Dyck paths**: walks of $2n$ steps from $0$, each step $+1$ or $-1$, never below $0$, ending at $0$. There are $C_n$ of these.

Each model supplies a route to $C(x)$, and both routes meet at the same quadratic equation.

## The recurrence from binary trees

A full binary tree that is not a single vertex consists of a root and two subtrees. Suppose the whole tree has $2n+1$ vertices and the left subtree has $2j+1$; then the right subtree has

$$
(2n+1)-1-(2j+1)=2(n-j-1)+1
$$

vertices. The two shapes are chosen independently, so

$$
C_n=\sum_{j=0}^{n-1}C_j\,C_{n-j-1}.
$$

Check $n=3$:

$$
C_3=C_0C_2+C_1C_1+C_2C_0=1\cdot2+1\cdot1+2\cdot1=5 .
$$

This convolution has exactly the shape of a product coefficient. Let $C(x)=\sum_{n\ge0}C_nx^n$. The coefficient of $x^{n-1}$ in $C(x)^2$ is $\sum_{j=0}^{n-1}C_jC_{n-1-j}$, which is $C_n$; multiplying by $x$ raises the degree to $n$:

$$
C(x)=1+x\,C(x)^2 .
$$

The constant $1$ accounts for $C_0=1$ (the single-vertex tree, and also the empty path). This is the key step: **the recurrence becomes an algebraic equation for the unknown function $C(x)$.**

## Solving the quadratic

Rewrite in standard form:

$$
xC(x)^2-C(x)+1=0 .
$$

With $x$ as the quadratic coefficient, the roots are

$$
C(x)=\frac{1\pm\sqrt{1-4x}}{2x}.
$$

Both roots satisfy the equation algebraically; the **initial condition** must eliminate one.

Let $x\to0$. The numerator tends to $1\pm1$ while the denominator tends to $0$:

- With the plus sign the numerator tends to $2$ and the quotient diverges, so it cannot equal $C(0)=1$.
- With the minus sign the numerator tends to $0$ and a limit must be taken.

One application of L'Hôpital (or the expansion in the next section) gives

$$
\lim_{x\to0}\frac{1-\sqrt{1-4x}}{2x}
=\lim_{x\to0}\frac{\frac{2}{\sqrt{1-4x}}}{2}=1 .
$$

Hence

$$
C(x)=\frac{1-\sqrt{1-4x}}{2x}.
$$

The constant term is $1$, matching $C_0$. This check is not cosmetic: a generating function is a formal power series, its value at $x=0$ is its constant term, and the wrong root produces a $1/x$ singularity that prevents expansion altogether.

## Expanding with the binomial theorem

To read off the coefficient of $x^n$ we need the expansion of $\sqrt{1-4x}=(1-4x)^{1/2}$. The generalized binomial theorem applies to fractional exponents:

$$
(1+a)^{1/2}=\sum_{k\ge0}\binom{1/2}{k}a^k ,
$$

where

$$
\binom{1/2}{k}
=\frac{\frac12\left(-\frac12\right)\left(-\frac32\right)\cdots\left(\frac32-k\right)}{k!}
=\frac{(-1)^{k-1}(2k-3)!!}{2^k\,k!}\quad(k\ge1),
$$

and $(2k-3)!!=1\cdot3\cdot5\cdots(2k-3)$ is the double factorial. Substituting $a=-4x$:

$$
\binom{1/2}{k}(-4x)^k
=\frac{(-1)^{k-1}(2k-3)!!}{2^k\,k!}\cdot(-1)^k4^kx^k
=-\frac{(2k-3)!!\,2^k}{k!}x^k .
$$

The signs cancel pairwise and every term is negative, so

$$
1-\sqrt{1-4x}
=\sum_{k\ge1}\frac{(2k-3)!!\,2^k}{k!}x^k .
$$

Dividing by $2x$ shifts $x^k$ to $x^{k-1}$:

$$
C(x)=\sum_{k\ge1}\frac{(2k-3)!!\,2^{k-1}}{k!}x^{k-1}.
$$

Set $n=k-1$, i.e. $k=n+1$:

$$
C_n=\frac{(2n-1)!!\,2^{n}}{(n+1)!}.
$$

### Converting to a binomial coefficient

Use

$$
(2n-1)!!=\frac{(2n)!}{2^n\,n!},
$$

since the product of all integers from $1$ to $2n$ divided by the even factors $2^n n!$ leaves the odd factors. Substituting:

$$
C_n=\frac{(2n)!}{2^n n!}\cdot\frac{2^n}{(n+1)!}
=\frac{(2n)!}{n!\,(n+1)!}
=\frac{1}{n+1}\binom{2n}{n}.
$$

Check: $n=3$ gives $\frac14\binom63=20/4=5$, and $5!!\cdot2^3/4!=15\cdot8/24=5$. Also $C_4=\frac15\binom84=70/5=14$, matching the enumeration.

## A second route: decomposing Dyck paths

Every Dyck path admits a canonical decomposition: **cut it at its first return to $0$**.

Each nonempty path is uniquely

$$
\text{(up step)}+\text{(a Dyck path)}+\text{(down step)}+\text{(another Dyck path)}.
$$

The leading block "up step, Dyck path, down step" is called a **raised Dyck path**: it starts at $0$, begins with an up step, ends with a down step, stays at least $1$ in between, and returns to $0$ only at the end. Removing the first and last steps leaves an ordinary Dyck path lifted one level.

Therefore:

- Raised paths have generating function $D(x)=x\,C(x)$: the factor $x$ records the two extra steps, $C(x)$ the path in between.
- Every Dyck path is a sequence of raised paths (possibly empty), so the sequence theorem gives

$$
C(x)=\frac{1}{1-D(x)}=\frac{1}{1-xC(x)} .
$$

Multiplying by $1-xC(x)$:

$$
C(x)-xC(x)^2=1,
$$

that is,

$$
xC(x)^2-C(x)+1=0 .
$$

This is the **same quadratic equation** obtained from binary trees. Two entirely different combinatorial decompositions landing on one algebraic equation is one of the most attractive features of the method.

## The sequence theorem

The theorem used above deserves a standalone statement.

Let every object of $A$ have size at least $1$, and let $A(x)=\sum_{n\ge1}a_nx^n$. Then finite sequences of $A$-objects, including the empty sequence, have generating function

$$
\frac{1}{1-A(x)} .
$$

**Why must sizes be at least $1$?** If an object of size $0$ existed, any number of copies could be inserted without changing the total size, so every size would admit infinitely many sequences, the coefficients would not be finite numbers, and the generating function would be meaningless.

For Dyck paths the objects being sequenced are raised paths, whose shortest length is $2$ and whose size we take to be $1$, so the hypothesis holds; the empty sequence corresponds to the empty path and contributes the constant term $1$.

## Application: tiling a $2\times n$ strip

Tile a $2\times n$ strip with two shapes that may be reflected. First count **indecomposable** pieces: tilings that no vertical line can split into two separately tileable strips.

- $a_3=2$: the shortest indecomposable piece has length $3$, and reflecting it horizontally gives the second.
- $a_4=0$: length $4$ cannot be built indecomposably.
- $a_5=2$, $a_6=0$, $a_7=2$, and so on.

In general,

$$
a_{2k}=0,\qquad a_{2k+1}=2\quad(k\ge1).
$$

Intuitively, to leave no vertical cut, an "L" piece must cap each end with any number of "Z" pieces between them, so indecomposable pieces have odd length and come in two mirror images.

Hence

$$
A(x)=\sum_{k\ge1}2x^{2k+1}=2x^3\left(1+x^2+x^4+\cdots\right)=\frac{2x^3}{1-x^2}.
$$

Every tiling is a sequence of indecomposable pieces:

$$
B(x)=\frac{1}{1-A(x)}
=\frac{1}{1-\dfrac{2x^3}{1-x^2}}
=\frac{1-x^2}{1-x^2-2x^3}.
$$

### Reading off the recurrence

Comparing coefficients in $B(x)(1-x^2-2x^3)=1-x^2$:

$$
b_n=b_{n-2}+2b_{n-3}\quad(n\ge3),
$$

with initial values

$$
b_0=1,\ b_1=0,\ b_2=0,\ b_3=2,\ b_4=0,\ b_5=2,\ b_6=4,\ b_7=2,\ b_8=8 .
$$

That $b_2=0$ rather than $1$ reflects the fact that adding a piece of length $2$ to the empty tiling is not allowed — the shortest indecomposable piece has length $3$. As in the previous lecture's tiling example, the denominator encodes the recurrence and the numerator encodes the initial conditions.

The recurrence is also visible directly: any nonempty tiling ends either with a vertical piece of length $2$ ($b_{n-2}$ ways) or with a length-$3$ indecomposable piece in one of two orientations ($2b_{n-3}$ ways).

## What this lecture establishes

- $1,1,2,5,14,\dots$ satisfy $C_n=\sum_{j=0}^{n-1}C_jC_{n-j-1}$.
- The generating function satisfies $C(x)=1+xC(x)^2$, with solution $C(x)=\dfrac{1-\sqrt{1-4x}}{2x}$; the minus sign is forced by $C(0)=1$.
- Binomial expansion gives $C_n=\dfrac{(2n-1)!!\,2^n}{(n+1)!}=\dfrac{1}{n+1}\dbinom{2n}{n}$.
- Decomposing Dyck paths at the first return gives $C(x)=\dfrac{1}{1-xC(x)}$, the same equation as for trees.
- Sequence theorem: with all sizes at least $1$, sequences have generating function $1/(1-A(x))$.
- Tiling: $A(x)=\dfrac{2x^3}{1-x^2}$, $B(x)=\dfrac{1-x^2}{1-x^2-2x^3}$, so $b_n=b_{n-2}+2b_{n-3}$.

## Comprehension check

**1. Explain $C_n=\sum_{j=0}^{n-1}C_jC_{n-j-1}$ using vertex counts.**

Reference answer: A full binary tree with $2n+1$ vertices consists of a root, a left subtree and a right subtree. If the left subtree has $2j+1$ vertices, the right has $(2n+1)-1-(2j+1)=2(n-j-1)+1$. There are $C_j$ shapes on the left and $C_{n-j-1}$ on the right, independently, so the count multiplies. Summing $j$ from $0$ to $n-1$ covers all left-subtree sizes.

**2. Why is the minus sign chosen when solving for $C(x)$? Give a rigorous reason.**

Reference answer: The two roots are $(1\pm\sqrt{1-4x})/(2x)$. A generating function must have constant term $C_0=1$, i.e. $\lim_{x\to0}C(x)=1$. The plus sign has numerator tending to $2$ and a vanishing denominator, so the quotient diverges. The minus sign gives, by L'Hôpital,
$\lim_{x\to0}\frac{1-\sqrt{1-4x}}{2x}=\lim_{x\to0}\frac{2/\sqrt{1-4x}}{2}=1$.
Only the minus sign yields a finite constant term; the plus sign produces a $1/x$ term and is not a formal power series.

**3. Derive $C_n=\frac{1}{n+1}\binom{2n}{n}$ from $C(x)=\frac{1-\sqrt{1-4x}}{2x}$, showing the double-factorial step.**

Reference answer: Using $(1+a)^{1/2}=\sum_k\binom{1/2}{k}a^k$ and $\binom{1/2}{k}=(-1)^{k-1}(2k-3)!!/(2^kk!)$, with $a=-4x$ we get $\binom{1/2}{k}(-4x)^k=-(2k-3)!!2^kx^k/k!$. Hence
$1-\sqrt{1-4x}=\sum_{k\ge1}(2k-3)!!2^kx^k/k!$, and dividing by $2x$ gives
$C_n=(2n-1)!!2^n/(n+1)!$.
Then $(2n-1)!!=(2n)!/(2^nn!)$, so the $2^n$ cancels and $C_n=(2n)!/(n!(n+1)!)=\frac{1}{n+1}\binom{2n}{n}$.

**4. Why is the generating function of raised Dyck paths $D(x)=xC(x)$?**

Reference answer: A raised path starts at $0$, its first step is up and its last is down, it stays at least $1$ in between, and it returns to $0$ only at the end. Removing the first and last steps and shifting down by one level leaves an arbitrary Dyck path. So raised paths correspond bijectively to "a Dyck path plus two extra steps". With the lecture's size convention (half the number of steps), the two extra steps contribute a factor $x$, hence $D(x)=xC(x)$.

**5. In the tiling problem, why is $a_{2k}=0$ but $a_{2k+1}=2$? Why is $b_2=0$?**

Reference answer: An indecomposable piece admits no vertical cut into two tileable strips. The two tile shapes force odd length: the shortest case has length $3$, and each extra pair of "Z" pieces adds $2$ while the ends must be capped by mirror-image "L" pieces. So only lengths $2k+1$ occur, each in exactly two mirror forms, giving $a_{2k+1}=2$ and $a_{2k}=0$. $b_2=0$ because the empty tiling cannot be extended to length $2$ by adding an indecomposable piece — the shortest has length $3$; the recurrence itself only starts at $n=3$.

**6. Why does the sequence theorem require objects of size at least $1$? What goes wrong otherwise?**

Reference answer: The sequence generating function is $1+A+A^2+\cdots=1/(1-A)$, and this identity holds as a formal power series only if each $x^n$ receives finitely many contributions. A size-zero object adds a positive constant term $c_0$ to $A(x)$; then $A(x)^k$ contributes on the order of $c_0^k$ at every degree, and summing over all $k$ makes the coefficients diverge. Intuitively, arbitrarily many zero-size objects can be inserted without changing the total size, so every size has infinitely many sequences.

## Relation to neighbouring lectures

The previous lecture used generating functions on a linear recurrence to obtain Binet's formula; this one solves a quadratic to obtain the Catalan formula. Both follow the same pattern: combinatorial decomposition $\to$ functional equation $\to$ solve $\to$ expand.

The next lecture turns to probability, but generating functions do not disappear: the moment-generating function $\mathbb E[e^{bX}]$ is the same technique with counting replaced by moments. Catalan numbers reappear later in binary trees, bracketings and the analysis of algorithms.
