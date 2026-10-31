---
slug: "15-projections"
title: "Projections onto Subspaces"
summary: "The geometry of projection is one condition: the error is perpendicular to the target subspace. From it follow x̂ = (AᵀA)⁻¹Aᵀb and P = A(AᵀA)⁻¹Aᵀ, applied to fitting a line."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "projection"
  - "least-squares"
  - "normal-equations"
sources:
  - kind: "video"
    title: "15. Projections onto Subspaces"
    url: "https://www.youtube.com/watch?v=Y_Ac6KiQ1t0"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Why project

This chapter handles the case where $A\mathbf{x}=\mathbf{b}$ has **no solution**. No solution does not mean no answer: $\mathbf{b}$ is outside the column space, but the column space has a nearest point. Replacing $\mathbf{b}$ by that point makes the system solvable.

That is projection. Geometrically it is a foot of a perpendicular; algebraically it is least squares.

## The one-dimensional case: projecting onto a line

Let the line be spanned by $\mathbf{a}$, and project $\mathbf{b}$ onto it.

The projection lies on the line, so it has the form $\mathbf{p}=x\mathbf{a}$. The key condition is that the **error $\mathbf{e}=\mathbf{b}-x\mathbf{a}$ is perpendicular to the line**:

$$
\mathbf{a}^\top(\mathbf{b}-x\mathbf{a})=0.
$$

Expanding,

$$
\mathbf{a}^\top\mathbf{b}=x\,\mathbf{a}^\top\mathbf{a}
\quad\Longrightarrow\quad
x=\frac{\mathbf{a}^\top\mathbf{b}}{\mathbf{a}^\top\mathbf{a}}.
$$

Therefore

$$
\mathbf{p}=x\mathbf{a}=\frac{\mathbf{a}^\top\mathbf{b}}{\mathbf{a}^\top\mathbf{a}}\,\mathbf{a}.
$$

### Three formulas to remember

| Object | Formula |
| --- | --- |
| Coefficient | $x=\dfrac{\mathbf{a}^\top\mathbf{b}}{\mathbf{a}^\top\mathbf{a}}$ |
| Projection vector | $\mathbf{p}=\mathbf{a}x$ |
| Projection matrix | $P=\dfrac{\mathbf{a}\mathbf{a}^\top}{\mathbf{a}^\top\mathbf{a}}$ |

$P$ is $n\times n$: the numerator is a column times a row (a matrix), the denominator is a scalar.

### Two sanity checks

- Doubling $\mathbf{b}$ doubles the projection.
- Doubling $\mathbf{a}$ leaves the projection unchanged: the line is the same, and numerator and denominator both gain a factor of 4.

### Two properties of a projection matrix

$$
P^\top=P,\qquad P^2=P.
$$

The first follows from $(\mathbf{a}\mathbf{a}^\top)^\top=\mathbf{a}\mathbf{a}^\top$. The second is geometric: projecting twice is the same as projecting once. Algebraically,

$$
P^2=\frac{\mathbf{a}\mathbf{a}^\top\mathbf{a}\mathbf{a}^\top}{(\mathbf{a}^\top\mathbf{a})^2}
=\frac{\mathbf{a}(\mathbf{a}^\top\mathbf{a})\mathbf{a}^\top}{(\mathbf{a}^\top\mathbf{a})^2}
=\frac{\mathbf{a}\mathbf{a}^\top}{\mathbf{a}^\top\mathbf{a}}=P.
$$

Conversely, a symmetric idempotent matrix is a projection matrix.

## Projecting onto a subspace

Let the subspace be the column space of $A$, whose columns form a basis and are therefore independent.

The projection is $\mathbf{p}=A\hat{\mathbf{x}}$, with $\hat{\mathbf{x}}$ the coefficients to be found. The condition is still

$$
\mathbf{e}=\mathbf{b}-A\hat{\mathbf{x}}\perp C(A).
$$

Being perpendicular to the whole column space means being perpendicular to each column:

$$
A^\top(\mathbf{b}-A\hat{\mathbf{x}})=\mathbf{0}.
$$

Rearranging gives the **normal equations**:

$$
A^\top A\,\hat{\mathbf{x}}=A^\top\mathbf{b}.
$$

The solution is

$$
\hat{\mathbf{x}}=(A^\top A)^{-1}A^\top\mathbf{b},
$$

and the projection vector and matrix are

$$
\mathbf{p}=A\hat{\mathbf{x}}=A(A^\top A)^{-1}A^\top\mathbf{b},
$$

$$
P=A(A^\top A)^{-1}A^\top.
$$

### Correspondence with the one-dimensional formula

In one dimension $A$ is the single column $\mathbf{a}$, and $(A^\top A)^{-1}$ is division by $\mathbf{a}^\top\mathbf{a}$:

$$
P=\frac{\mathbf{a}\mathbf{a}^\top}{\mathbf{a}^\top\mathbf{a}}.
$$

In higher dimensions division is replaced by inversion — the difference between a scalar and a matrix.

### Where the error lives

From $A^\top\mathbf{e}=\mathbf{0}$,

$$
\mathbf{e}\in N(A^\top)=C(A)^\perp.
$$

This is exactly the orthogonality from the previous lecture: the error lies in the left null space, perpendicular to the column space. Geometry and the four subspaces meet precisely here.

## Something you must not do

It is tempting to split the inverse:

$$
(A^\top A)^{-1}=A^{-1}(A^\top)^{-1}.
$$

That is wrong, because **$A$ is not square and has no inverse**. This is the typical case of the chapter: more rows than columns. The split is legal only when $A$ is square and invertible, and then the column space is all of $\mathbb{R}^n$ and the projection matrix is the identity $I$.

## Least squares: fitting a line to three points

Given the points $(1,1),(2,2),(3,2)$, find the line

$$
b=C+Dt
$$

with the smallest total error.

If the line passed through all three points, it would satisfy

$$
\begin{aligned}
C+D&=1,\\
C+2D&=2,\\
C+3D&=2.
\end{aligned}
$$

In matrix form:

$$
\underbrace{\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}}_{A}
\underbrace{\begin{bmatrix}C\\D\end{bmatrix}}_{\mathbf{x}}
=
\underbrace{\begin{bmatrix}1\\2\\2\end{bmatrix}}_{\mathbf{b}}.
$$

Three equations, two unknowns, generally unsolvable. Instead of solving it, solve the normal equations:

$$
A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}.
$$

The next lecture finishes the arithmetic, giving $C=2/3$ and $D=1/2$, so the best line is

$$
b=\frac{2}{3}+\frac{1}{2}t.
$$

### Why use every point

The alternative is to discard an equation and solve a square system. That amounts to declaring some measurements perfect and others worthless, with no justification. Least squares lets every point contribute, weighted by squared error.

The price is sensitivity to **outliers**: a point far from the line has its error squared, so it can drag the whole fit. Statistics therefore also offers robust regression.

## Takeaways

- The only geometric condition for a projection is that the error is perpendicular to the target subspace.
- One dimension: $x=\mathbf{a}^\top\mathbf{b}/\mathbf{a}^\top\mathbf{a}$ and $P=\mathbf{a}\mathbf{a}^\top/\mathbf{a}^\top\mathbf{a}$.
- Higher dimensions: $A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}$ and $P=A(A^\top A)^{-1}A^\top$.
- Projection matrices are symmetric and idempotent: $P^\top=P$ and $P^2=P$.
- The error lies in the left null space, orthogonal to the column space.
- Least squares is projection applied to an unsolvable system.

## Check your understanding

1. Why does "the error is perpendicular to the line" determine the projection uniquely?
2. If $\mathbf{a}$ is replaced by $3\mathbf{a}$, does the projection matrix change? Why?
3. Prove that the higher-dimensional projection matrix satisfies $P^2=P$.
4. Why can $(A^\top A)^{-1}$ not be split into $A^{-1}(A^\top)^{-1}$?
5. Write the $A$, $\mathbf{x}$, and $\mathbf{b}$ for fitting a line $b=C+Dt$ through three points.

## How this connects to the course

The previous lecture proved the orthogonality of the four subspaces; this one uses it to construct projections. The next carries the projection matrix through a numerical least-squares example and proves that $A^\top A$ is invertible when the columns of $A$ are independent.
