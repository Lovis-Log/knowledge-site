---
slug: "05-transposes-permutations-spaces"
title: "Transposes, Permutations, and the Vector Space R^n"
summary: "Transposes flip rows and columns, permutation matrices reorder rows, and both obey a reversal rule. A vector space is closed under addition and scalar multiplication — which forces it to contain the zero vector."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "transpose"
  - "permutation"
  - "vector-space"
  - "subspace"
sources:
  - kind: "video"
    title: "Lecture 5: Transposes, Permutations, Spaces R^n"
    url: "https://www.youtube.com/watch?v=JibVXBElKL0"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Three topics

1. Permutation matrices: how to write elimination when rows must be exchanged.
2. Transposes and symmetric matrices: an almost free way to build a symmetric matrix.
3. Vector spaces and subspaces: from "a bunch of vectors" to "a space".

The first two finish the previous lecture. The third is where the course properly begins.

## Timeline

| Time | Topic |
| --- | --- |
| 0:21 | Permutations and elimination with row exchanges |
| 2:06 | Exchanging rows to get a pivot |
| 3:44 | How MATLAB records row exchanges |
| 9:13 | The inverse of a permutation matrix |
| 10:33 | An example of a transpose |
| 12:52 | Symmetric matrices |
| 15:44 | $R^TR$ is always symmetric |
| 18:27 | The transpose rule: reverse the order |
| 21:17 | Vectors, addition and linear combinations |
| 26:54 | Vectors in $R^3$ |
| 32:32 | The definition of a subspace |
| 36:03 | All subspaces of $R^2$ |
| 42:46 | The column space of a matrix |
| 44:58 | The column space as a plane |
| 47:22 | Other subspaces |

## Permutations and elimination with row exchanges

If a zero appears in a pivot position, rows must be swapped. A permutation matrix $P$ is **the identity with its rows rearranged**; the identity itself counts as a permutation (the one that does nothing).

There are $n!$ permutation matrices of size $n$: six of size $3$, twenty-four of size $4$, one hundred twenty of size $5$.

They form a group:

- the product of two permutations is a permutation;
- every permutation is invertible;
- the inverse is the transpose:

$$
P^T P=I \;\Longrightarrow\; P^{-1}=P^T.
$$

The intuition: swapping two rows twice restores the original, so many permutations are their own inverse; for longer cycles, transposing reverses "who moves where".

With row exchanges, elimination is written

$$
PA=LU.
$$

$P$ records the correct row order, and $L$ and $U$ keep their structure.

> **Background:** In actual numerical software, MATLAB does not merely test whether a pivot is zero; it tests whether it is **large enough**. A pivot very close to zero amplifies rounding error, so the software uses partial pivoting: it moves the largest-magnitude entry in the column into the pivot position. Algebra does not require this; numerical accuracy does.

## Transposes

### Definition and example

The transpose swaps rows and columns:

$$
(A^T)_{ij}=A_{ji}.
$$

For example,

$$
R=\begin{bmatrix}1&2&4\\3&3&1\end{bmatrix},
\qquad
R^T=\begin{bmatrix}1&3\\2&3\\4&1\end{bmatrix}.
$$

$R$ is $2\times3$; $R^T$ is $3\times2$.

### The transpose of a product reverses the order

$$
(AB)^T=B^T A^T.
$$

The same reversal rule as for inverses.

### Symmetric matrices

If $A^T=A$, the matrix is symmetric: entries mirror across the main diagonal.

There is an almost free way to produce one: for any matrix $R$, the product $R^T R$ is always symmetric. The proof takes two lines:

$$
(R^T R)^T=R^T (R^T)^T=R^T R.
$$

With the $R$ above:

$$
R^T R=
\begin{bmatrix}
1&3\\2&3\\4&1
\end{bmatrix}
\begin{bmatrix}1&2&4\\3&3&1\end{bmatrix}
=
\begin{bmatrix}
10&11&7\\
11&13&11\\
7&11&17
\end{bmatrix}.
$$

Entry $(1,2)$ is $1\cdot2+3\cdot3=11$, and entry $(2,1)$ is $2\cdot1+3\cdot3=11$. The equality is not a coincidence.

> **One-sentence summary:** Symmetry is not luck; it is forced by the rule that transposing twice returns the original matrix.

## Vector spaces: operations first, sets second

### Two basic operations

Linear algebra does two things:

1. add vectors;
2. multiply vectors by scalars.

A collection of vectors is a vector space when it is **closed** under both operations — the results stay in the collection — and the usual algebraic laws hold.

### $R^2$ and $R^n$

$R^2$ is all pairs of real numbers; geometrically, the whole plane. $R^3$ is three-dimensional space. $R^n$ is all vectors with $n$ real components.

Convention: the course uses **column vectors**.

### Why zero must be included

Take the plane with the origin removed. It is not a vector space:

- multiply $[3,2]^T$ by $0$ and the result $[0,0]^T$ is missing;
- add $[3,2]^T$ and $[-3,-2]^T$ and you return to the origin, which is also missing.

So **every vector space contains the zero vector**. This is not an extra axiom; it follows from closure under scalar multiplication.

### Counterexample: the first quadrant

Take only vectors with nonnegative coordinates. Addition is fine: $[3,2]+[5,6]=[8,8]$ stays in the quadrant. But multiplying by $-5$ lands in the third quadrant, so closure fails. It is not a vector space.

## Subspaces

A subspace is a set **inside a larger space that is itself a vector space** under the same operations.

### All subspaces of $R^2$

Only three:

1. all of $R^2$;
2. a line through the origin;
3. the zero vector alone, $\{\mathbf{0}\}$.

A line not through the origin is not a subspace: multiply one of its vectors by $0$ and you leave the line.

A line through the origin in $R^2$ looks like $R^1$, but they are not the same: vectors in the line have two components, vectors in $R^1$ have one.

### All subspaces of $R^3$

Four:

1. all of $R^3$;
2. a plane through the origin;
3. a line through the origin;
4. $\{\mathbf{0}\}$.

Dimensions run from 3 down to 0.

## Building a subspace from a matrix: the column space

Take

$$
A=\begin{bmatrix}
1&3\\
2&3\\
4&1
\end{bmatrix}.
$$

Its columns $\mathbf{c}_1=[1,2,4]^T$ and $\mathbf{c}_2=[3,3,1]^T$ live in $R^3$.

Two columns by themselves are not a subspace. To get one, include **all linear combinations**:

$$
\{x_1\mathbf{c}_1+x_2\mathbf{c}_2\mid x_1,x_2\in R\}.
$$

This is the **column space** of $A$, written $C(A)$.

Geometrically, two non-collinear vectors span a plane through the origin. So this column space is a plane inside $R^3$.

If the two columns happened to be collinear, the column space would shrink to a line. How large the subspace is depends on independence among the columns — the quantity the next lecture makes precise.

### Higher dimensions

Take five vectors in $R^{10}$. Their combinations form some subspace. It cannot be $R^5$ — the vectors have ten components — but it is a five-dimensional flat object through the origin (if the five are independent); if they are all collinear, it is only a line.

> The lecture's warning: you must genuinely **see** two vectors spanning a plane in $R^3$ before you can trust the same conclusion in $R^{10}$.

## Takeaways

- A permutation matrix is the identity with reordered rows; there are $n!$ of them, and $P^{-1}=P^T$.
- With row exchanges, elimination is $PA=LU$.
- $(AB)^T=B^T A^T$: the order reverses.
- $R^T R$ is always symmetric; a symmetric matrix satisfies $A^T=A$.
- A vector space is closed under addition and scalar multiplication, hence contains zero.
- A subspace is a vector space sitting inside a larger one.
- The subspaces of $R^2$ are the whole space, lines through the origin, and $\{\mathbf{0}\}$.
- The column space consists of all linear combinations of the columns; it is always a subspace.

## Check your understanding

**1. Why is the inverse of a permutation matrix its transpose? Use "swap twice and you are back".**

Reference answer: A permutation matrix rearranges rows once; its inverse must undo that rearrangement, i.e. permute back. Row swap is the basic case: swapping twice restores the original, so a single swap matrix satisfies $P^2=I$, and it is symmetric ($P^T=P$), hence $P^{-1}=P=P^T$. A general permutation is a composite of swaps, and transposing reverses the order of the composite, which is exactly what undoing requires. Formally $P^TP=I$: the columns of $P$ are mutually orthogonal standard basis vectors, so the dot product of row $i$ of $P^T$ with column $j$ of $P$ is $1$ only when $i=j$.

**2. Write the two-line proof that $R^T R$ is symmetric and identify where $(AB)^T=B^T A^T$ is used.**

Reference answer:
$$
(R^T R)^T=R^T(R^T)^T=R^T R .
$$
The first step is the reversed-order rule $(AB)^T=B^TA^T$ with $A=R^T$ and $B=R$; the second uses $(R^T)^T=R$. Hence $(R^TR)^T=R^TR$, which is symmetry by definition. For the $R$ in the lecture, $R^TR=\begin{bmatrix}10&11&7\\11&13&11\\7&11&17\end{bmatrix}$, and entries $(1,2)$ and $(2,1)$ are both $1\cdot2+3\cdot3=11$ — not a coincidence.

**3. Why is the first quadrant not a subspace of $R^2$? Give a concrete counterexample.**

Reference answer: A subspace must be closed under scalar multiplication, and the first quadrant is not. Take $\mathbf{v}=[3,2]^T$, which lies in the quadrant, and $c=-5$:
$$
c\mathbf{v}=\begin{bmatrix}-15\\-10\end{bmatrix},
$$
both coordinates negative, in the third quadrant. The quadrant is closed under addition and nonnegative scaling only; a general scalar breaks closure, so it is not a subspace.

**4. Why is a line not through the origin not a subspace?**

Reference answer: A subspace must contain the zero vector. Take any $\mathbf{v}\ne\mathbf{0}$ on a line $L$ that misses the origin; then $0\cdot\mathbf{v}=\mathbf{0}$, so if $L$ were a subspace the origin would have to lie on it — contradiction. Geometrically, scaling a point on the line down to zero jumps off the line.

**5. For $A=\begin{bmatrix}1&3\\2&3\\4&1\end{bmatrix}$, explain why its column space is a plane rather than all of $R^3$.**

Reference answer: $A$ has only two columns, $\mathbf{c}_1=[1,2,4]^T$ and $\mathbf{c}_2=[3,3,1]^T$, and they are not multiples of each other (the ratios $3,\ 3/2,\ 1/4$ differ), so they are independent. Two independent vectors in $R^3$ span a two-dimensional subspace, a plane through the origin. It cannot be all of $R^3$: reaching every point needs three directions, while $x_1\mathbf{c}_1+x_2\mathbf{c}_2$ has only two degrees of freedom, so vectors off the plane are unreachable.

## How it connects

This lecture builds the language of spaces. The next one uses it to rewrite $A\mathbf{x}=\mathbf{b}$: a solution exists exactly when $\mathbf{b}$ lies in the column space. It also introduces the nullspace, the other subspace a matrix naturally produces.
