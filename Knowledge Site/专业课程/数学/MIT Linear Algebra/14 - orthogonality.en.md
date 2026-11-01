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

## Timeline

| Time | Topic |
| --- | --- |
| 0:11 | Orthogonal vectors and the dot product |
| 3:42 | Right angles and a zero inner product |
| 5:33 | Pythagoras |
| 7:19 | Length squared as $\mathbf{x}^{T}\mathbf{x}$ |
| 10:55 | The zero vector is orthogonal to everything |
| 16:30 | Orthogonal subspaces: every pair of vectors |
| 23:31 | Orthogonal complements |
| 25:34 | Row space and null space are orthogonal complements |
| 27:15 | Their dimensions add to $n$ |
| 30:46 | Normal vectors and planes |
| 34:16 | Least squares: the main problem of the chapter |
| 36:00 | The satellite example |
| 44:26 | When the system is solvable |
| 46:09 | Is $A^{T}A$ always invertible |
| 48:01 | $A^{T}A$ is invertible when the columns are independent |

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

**1. Why is the zero vector orthogonal to everything, and how does that relate to every subspace containing zero?**

Reference answer: For any $\mathbf{y}$, $\mathbf{0}^\top\mathbf{y}=0$, so the dot product always vanishes and the zero vector is orthogonal to every vector.

Every subspace contains zero, so zero is orthogonal to every vector in every subspace. That does **not** make arbitrary subspaces orthogonal: subspace orthogonality requires every vector of $S$ to be orthogonal to every vector of $T$, and if $S\cap T$ contains a nonzero $\mathbf{v}$ then $\mathbf{v}^\top\mathbf{v}=\|\mathbf{v}\|^2>0$, so orthogonality fails at once. "The intersection is only zero" is therefore necessary for orthogonal subspaces — exactly because zero is orthogonal to everything — but not sufficient: two planes through the origin in three dimensions meet in a line and are not orthogonal.

**2. If two planes through the origin share a nonzero line, why can they not be orthogonal?**

Reference answer: Let the shared direction be $\mathbf{v}\ne\mathbf{0}$. Then $\mathbf{v}$ lies in both planes, so take $\mathbf{v}$ from $S$ and $\mathbf{v}$ from $T$; their dot product is
$$
\mathbf{v}^\top\mathbf{v}=\|\mathbf{v}\|^2>0 .
$$
Subspace orthogonality demands that **every** vector of $S$ be orthogonal to **every** vector of $T$, and here is a pair that is not. In short, a nonzero vector can never be orthogonal to itself.

**3. Prove from $A\mathbf{x}=\mathbf{0}$ that the null space is orthogonal to the row space, including combinations of rows.**

Reference answer: Let $\mathbf{x}\in N(A)$, so $A\mathbf{x}=\mathbf{0}$. Writing $A$ by rows, each component of the product is a dot product of a row with $\mathbf{x}$:
$$
A\mathbf{x}=
\begin{bmatrix}
\text{row}_1\cdot\mathbf{x}\\
\vdots\\
\text{row}_m\cdot\mathbf{x}
\end{bmatrix}
=\mathbf{0},
$$
so every row is orthogonal to $\mathbf{x}$.

Any vector of the row space is $\sum_i c_i\,\text{row}_i$, and bilinearity of the dot product gives
$$
\left(\sum_i c_i\,\text{row}_i\right)\cdot\mathbf{x}
=\sum_i c_i(\text{row}_i\cdot\mathbf{x})=\sum_i c_i\cdot 0=0 .
$$
So every row-space vector is orthogonal to $\mathbf{x}$; since $\mathbf{x}$ was arbitrary in $N(A)$, we get $C(A^\top)\perp N(A)$.

**4. Why do $A^\top A$ and $A$ have the same null space? Write the crucial step.**

Reference answer: Two directions.

If $A\mathbf{x}=\mathbf{0}$, then $A^\top A\mathbf{x}=A^\top\mathbf{0}=\mathbf{0}$, so $N(A)\subseteq N(A^\top A)$.

Conversely, if $A^\top A\mathbf{x}=\mathbf{0}$, multiply on the left by $\mathbf{x}^\top$:
$$
0=\mathbf{x}^\top A^\top A\mathbf{x}=(A\mathbf{x})^\top(A\mathbf{x})=\|A\mathbf{x}\|^2 .
$$
The crucial step: **a squared norm is zero only when the vector itself is zero**, so $A\mathbf{x}=\mathbf{0}$ and $N(A^\top A)\subseteq N(A)$.

Hence $N(A^\top A)=N(A)$, with equal dimensions and equal ranks. Therefore $A^\top A$ is invertible exactly when $N(A)=\{\mathbf{0}\}$, i.e. when the columns of $A$ are independent.

**5. If a $5\times2$ matrix has dependent columns, what is the rank of $A^\top A$, and how many least-squares solutions are there?**

Reference answer: With $A$ of size $5\times2$ and dependent columns, $\operatorname{rank}(A)\le1$. If $A\ne0$ then $\operatorname{rank}(A)=1$, and since $\operatorname{rank}(A^\top A)=\operatorname{rank}(A)$,
$$
\operatorname{rank}(A^\top A)=1 .
$$
So the $2\times2$ matrix $A^\top A$ is singular, and $N(A^\top A)=N(A)$ has dimension $2-1=1$.

The normal equations $A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}$ are **always consistent** ($A^\top\mathbf{b}$ lies in the column space of $A^\top A$), but here the solution is not unique:
$$
\hat{\mathbf{x}}=\hat{\mathbf{x}}_p+c\,\mathbf{v},
$$
where $\mathbf{v}$ spans $N(A)$ and $c$ is arbitrary — infinitely many least-squares solutions. (If $A=0$, the rank is 0 and every $\hat{\mathbf{x}}$ is a solution.)

## How this connects to the course

The previous lecture showed only that the row and null spaces intersect at zero. This one proves they are perpendicular orthogonal complements. The next lecture constructs orthogonal bases with Gram-Schmidt and gives the full geometry of least squares.
