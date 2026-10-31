---
slug: "14-orthogonality"
title: "Orthogonal Vectors and Subspaces"
summary: "A zero dot product is the test for orthogonality; row space is perpendicular to null space and column space to left null space, each pair an orthogonal complement. This leads directly to the least-squares equation AᵀA x̂ = Aᵀb."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "orthogonality"
  - "orthogonal-complement"
  - "least-squares"
sources:
  - kind: "video"
    title: "14. Orthogonal Vectors and Subspaces"
    url: "https://www.youtube.com/watch?v=YzZUIYRCE38"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## From orthogonal vectors to orthogonal subspaces

Orthogonal means perpendicular. Two vectors $\mathbf{x},\mathbf{y}\in\mathbb{R}^n$ are orthogonal exactly when

$$
\mathbf{x}^\top\mathbf{y}=x_1y_1+x_2y_2+\cdots+x_ny_n=0.
$$

That is the only test needed in this chapter. The zero vector is orthogonal to everything, since every dot product with it is zero.

### Why a zero dot product means perpendicular

Let the legs of a right triangle be $\mathbf{x}$ and $\mathbf{y}$, with hypotenuse $\mathbf{x}+\mathbf{y}$. Pythagoras says

$$
\|\mathbf{x}\|^2+\|\mathbf{y}\|^2=\|\mathbf{x}+\mathbf{y}\|^2.
$$

Expand the right side:

$$
\|\mathbf{x}+\mathbf{y}\|^2
=(\mathbf{x}+\mathbf{y})^\top(\mathbf{x}+\mathbf{y})
=\mathbf{x}^\top\mathbf{x}+\mathbf{x}^\top\mathbf{y}+\mathbf{y}^\top\mathbf{x}+\mathbf{y}^\top\mathbf{y}.
$$

For real vectors $\mathbf{x}^\top\mathbf{y}=\mathbf{y}^\top\mathbf{x}$, so

$$
\|\mathbf{x}+\mathbf{y}\|^2=\|\mathbf{x}\|^2+2\mathbf{x}^\top\mathbf{y}+\|\mathbf{y}\|^2.
$$

The Pythagorean identity holds exactly when

$$
2\mathbf{x}^\top\mathbf{y}=0.
$$

**Pythagoras and the dot-product test are the same statement in two forms.**

### A numerical example

Take $\mathbf{x}=(1,2,3)^\top$. First try $\mathbf{y}=(1,2,-1)^\top$:

$$
\mathbf{x}^\top\mathbf{y}=1+4-3=2\neq0,
$$

so they are not orthogonal. Now take $\mathbf{y}=(2,-1,0)^\top$:

$$
\mathbf{x}^\top\mathbf{y}=2-2+0=0,
$$

so they are orthogonal. Then

$$
\|\mathbf{x}\|^2=14,\qquad \|\mathbf{y}\|^2=5,\qquad \|\mathbf{x}+\mathbf{y}\|^2=\|(3,1,3)\|^2=9+1+9=19,
$$

and $14+5=19$, confirming Pythagoras.

## Orthogonal subspaces

Two subspaces $S$ and $T$ are orthogonal when

> **every** vector in $S$ is orthogonal to **every** vector in $T$.

This is stronger than "the intersection is zero". Two planes through the origin in $\mathbb{R}^3$ (a blackboard and the floor, say) intersect in a line, so they are not orthogonal: a vector on that line cannot be orthogonal to itself.

In $\mathbb{R}^2$ the only subspaces are the zero space, lines through the origin, and the whole plane. Two lines are orthogonal exactly when they meet at 90 degrees; a line is always orthogonal to the zero subspace and never to the whole plane.

## Orthogonality of the four subspaces

### Row space and null space

Let $\mathbf{x}\in N(A)$, so $A\mathbf{x}=\mathbf{0}$. Writing $A$ row by row,

$$
A\mathbf{x}=
\begin{bmatrix}
\text{row}_1\\
\vdots\\
\text{row}_m
\end{bmatrix}\mathbf{x}
=
\begin{bmatrix}
\text{row}_1\cdot\mathbf{x}\\
\vdots\\
\text{row}_m\cdot\mathbf{x}
\end{bmatrix}
=
\begin{bmatrix}0\\\vdots\\0\end{bmatrix}.
$$

Thus $\mathbf{x}$ is orthogonal to every row of $A$.

Any vector in the row space is a combination $\sum c_i\,\text{row}_i$, and

$$
\left(\sum_i c_i\,\text{row}_i\right)\cdot\mathbf{x}
=\sum_i c_i(\text{row}_i\cdot\mathbf{x})=0.
$$

Therefore every null-space vector is orthogonal to every row-space vector:

$$
C(A^\top)\perp N(A).
$$

### Column space and left null space

Apply the same argument to $A^\top$:

$$
C(A)\perp N(A^\top).
$$

### Complementary dimensions

From the previous lecture,

$$
\dim C(A^\top)+\dim N(A)=r+(n-r)=n,
$$

$$
\dim C(A)+\dim N(A^\top)=r+(m-r)=m.
$$

Two orthogonal subspaces whose dimensions add to the whole space are **orthogonal complements**:

$$
N(A)=C(A^\top)^\perp,\qquad N(A^\top)=C(A)^\perp.
$$

"Complement" means more than "contains some orthogonal vectors": the null space consists of **all** vectors orthogonal to the row space, no more and no fewer.

This is part two of the fundamental theorem of linear algebra. Part one is dimensions; part two is orthogonality; part three, next lecture, is orthogonal bases.

### Example: a rank-one matrix

Take the single-row matrix

$$
A=\begin{bmatrix}1&2&5\end{bmatrix}.
$$

- The row space is the line through $(1,2,5)$.
- The null space is the solution set of $x_1+2x_2+5x_3=0$, a plane perpendicular to that line.
- The dimensions are $1+2=3$.

In $\mathbb{R}^3$ a line and a plane can be perpendicular with dimensions summing to 3. Two perpendicular lines have dimensions summing only to 2, so they are not orthogonal complements.

## Least squares: the main problem of the chapter

When $A\mathbf{x}=\mathbf{b}$ has no solution, a best approximation is still required.

The typical setting: $m>n$, more equations than unknowns, and noise in $\mathbf{b}$. A satellite position estimated from a thousand measurements, or a pulse rate measured repeatedly. Discarding equations is unsatisfying because every measurement carries information.

The right move is to multiply both sides by $A^\top$:

$$
A^\top A\,\hat{\mathbf{x}}=A^\top\mathbf{b}.
$$

These are the **normal equations**, and $\hat{\mathbf{x}}$ is the least-squares solution. They always have a solution, and the solution is unique when the columns of $A$ are independent.

### Properties of $A^\top A$

| Property | Reason |
| --- | --- |
| Square | $A$ is $m\times n$, so $A^\top A$ is $n\times n$ |
| Symmetric | $(A^\top A)^\top=A^\top A$ |
| Rank equals $\operatorname{rank}(A)$ | See below |
| Null space equals $N(A)$ | See below |
| Invertible $\iff$ columns of $A$ are independent | Follows from the previous two |

The key step: if $A^\top A\mathbf{x}=\mathbf{0}$, multiply on the left by $\mathbf{x}^\top$:

$$
\mathbf{x}^\top A^\top A\mathbf{x}
=(A\mathbf{x})^\top(A\mathbf{x})
=\|A\mathbf{x}\|^2=0.
$$

A zero norm means $A\mathbf{x}=\mathbf{0}$. Hence

$$
N(A^\top A)=N(A),
$$

and the ranks agree. Therefore $A^\top A$ is invertible exactly when $N(A)=\{\mathbf{0}\}$, that is, when the columns of $A$ are independent.

### A numerical example

$$
A=\begin{bmatrix}1&1\\1&2\\1&5\end{bmatrix}.
$$

Then

$$
A^\top A=
\begin{bmatrix}
1&1&1\\
1&2&5
\end{bmatrix}
\begin{bmatrix}1&1\\1&2\\1&5\end{bmatrix}
=
\begin{bmatrix}3&8\\8&30\end{bmatrix}.
$$

Its determinant is $3\cdot30-8\cdot8=90-64=26\neq0$, so it is invertible, as expected for independent columns.

If the second column is made a multiple of the first, for instance

$$
A=\begin{bmatrix}1&1\\2&2\\3&3\end{bmatrix},
\qquad
A^\top A=
\begin{bmatrix}14&14\\14&14\end{bmatrix},
$$

the rank is 1 and $A^\top A$ is singular. The columns are dependent and the normal equations have infinitely many solutions.

## Takeaways

- Vectors are orthogonal iff their dot product is zero; Pythagoras and the dot-product test are equivalent.
- Subspace orthogonality requires every pair of vectors to be orthogonal, which is stronger than a zero intersection.
- Row space $\perp$ null space and column space $\perp$ left null space, each pair an orthogonal complement.
- When no solution exists, solve $A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}$.
- $A^\top A$ is symmetric, has the same null space and rank as $A$, and is invertible when the columns of $A$ are independent.

## Check your understanding

1. Why is the zero vector orthogonal to everything, and how does that relate to every subspace containing zero?
2. If two planes through the origin share a nonzero line, why can they not be orthogonal?
3. Prove from $A\mathbf{x}=\mathbf{0}$ that the null space is orthogonal to the row space, including combinations of rows.
4. Why do $A^\top A$ and $A$ have the same null space? Write the crucial step.
5. If a $5\times2$ matrix has dependent columns, what is the rank of $A^\top A$, and how many least-squares solutions are there?

## How this connects to the course

The previous lecture showed only that the row and null spaces intersect at zero. This one proves they are perpendicular orthogonal complements. The next lecture constructs orthogonal bases with Gram-Schmidt and gives the full geometry of least squares.
