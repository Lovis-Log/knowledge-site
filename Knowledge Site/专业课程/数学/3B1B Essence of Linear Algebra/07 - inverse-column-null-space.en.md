---
slug: "07-inverse-column-null-space"
title: "Inverse Matrices, Column Space, and Null Space: Systems as Geometry"
summary: "The system Ax = v reads geometrically as \"which vector lands on v after the transformation A?\" With a non-zero determinant there is an inverse and the solution is unique; with a zero determinant there is no inverse, yet solutions can still exist — rank, column space, and null space are the language for that situation."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [linear-systems, inverse-matrix, column-space, null-space, rank]
sources:
  - kind: "video"
    title: "Inverse matrices, column space and null space | Chapter 7, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=uQhTuRlWMxw"
    author: "3Blue1Brown"
    publishedAt: "2016-08-16"
---

## The thread of the lecture

One reason linear algebra is required in nearly every technical field is that it solves systems of equations.

A system like

$$
\begin{cases}
2x + 5y = 3\\
4x + 3y = 7
\end{cases}
$$

only scales each variable by a constant and adds the results — no squares, no products of variables. That is a **linear system**.

Collect the coefficients into a matrix, the variables into a vector, and the constants into another vector:

$$
A\vec{x} = \vec{v}.
$$

The point of this chapter: **that equation is more than shorthand — it has a geometric reading**, namely "find the vector that lands on $\vec{v}$ after the transformation $A$."

## Timeline

| Time | Topic |
| --- | --- |
| 1:26 | Linear systems: variables only scaled and added |
| 2:47 | Solving $A\vec{x}=\vec{v}$ = finding the vector that lands on $\vec{v}$ |
| 3:51 | $\det\neq0$: a unique solution, the transformation can be played backwards |
| 4:15 | The inverse $A^{-1}$: the transformation in reverse |
| 5:11 | The identity matrix: the transformation that does nothing |
| 6:43 | $\det=0$: no inverse, flattening cannot be undone |
| 7:26 | Yet solutions may exist if $\vec{v}$ lies in the output space |
| 8:06 | Rank = the dimension of the output space |
| 8:54 | Column space = the set of all possible outputs |
| 10:32 | Null space: all vectors that land on the origin |

## The geometric reading

$A$ is a linear transformation, $\vec{x}$ an input, $\vec{v}$ an output. So solving the equation asks:

> **Which vector, after being kneaded by $A$, lands exactly on $\vec{v}$?**

The value of the translation: instead of juggling several mutually constrained unknowns, you picture space being deformed and one vector landing somewhere.

## Non-zero determinant: a unique solution and an inverse

Take the usual case: $\det A \neq 0$, so space is not flattened.

Then every point is sent to exactly one place and no two points collide. Hence for any $\vec{v}$ there is **exactly one** $\vec{x}$ landing on it.

How to find it? **Play the transformation backwards.**

The reverse is itself a linear transformation, called the **inverse** of $A$, written $A^{-1}$.

- If $A$ rotates 90 degrees counterclockwise, $A^{-1}$ rotates 90 degrees clockwise;
- If $A$ is a rightward shear pushing $\hat{\jmath}$ one unit right, $A^{-1}$ pushes it one unit left.

Its defining property: do $A$, then $A^{-1}$, and you are back where you started. In matrix notation,

$$
A^{-1}A = I,
$$

where $I$ is the **identity matrix** — the transformation that does nothing. It leaves $\hat{\imath}$ and $\hat{\jmath}$ untouched, so its columns are $(1,0)$ and $(0,1)$:

$$
I = \begin{bmatrix}1&0\\0&1\end{bmatrix}.
$$

With the inverse in hand, the solution is

$$
\vec{x} = A^{-1}\vec{v}.
$$

Geometrically this is still "rewind the transformation and follow $\vec{v}$ back."

## Zero determinant: no inverse

If $\det A = 0$, the transformation crushes space into a lower dimension.

![Left: an invertible shear turns the square grid into a slanted one, with v and Av still in the plane; right: a projection collapses the whole plane onto the x-axis, the dashed y-axis marking the null space](/images/la07-column-null-space-en.svg)

*Figure: an invertible map keeps the plane, a singular one crushes a line to the origin — that line is the null space.*

Then there is **no inverse**, for a hard reason:

- Flattening destroys information. You cannot un-squash a line into a plane.
- More fundamentally, a function sends one input to one output. Undoing the map would require sending a point on that line back to an entire line of points — no longer a function.

The same holds in 3D: collapsing space to a plane, a line, or a point all give determinant zero and no inverse.

### But a solution may still exist

No inverse does not mean no solution.

If $A$ squashes the plane onto a line and $\vec{v}$ **happens to lie on that line**, then vectors still land on $\vec{v}$ — just more than one.

So "is there a solution" and "is the solution unique" are separate questions:

- Existence: $\vec{v}$ lies in the output range of $A$;
- Uniqueness: $A$ does not flatten space.

## Rank: the dimension of the output

Among zero-determinant cases, some are far more restrictive than others.

For a $3\times3$ matrix, "collapsed to a line" is much worse than "collapsed to a plane" — far fewer $\vec{v}$ can be reached.

So a sharper word than "zero determinant" is needed: **rank**.

> Rank = the dimension of the transformation's output space.

- Output is a line (1D): rank 1;
- Output is a plane (2D): rank 2;
- Output fills 3D: rank 3.

For a $2\times2$ matrix the maximum rank is 2, which corresponds to a non-zero determinant.

## Column space

The set of all possible outputs is the **column space** of the matrix.

The name is transparent: the columns are where the basis vectors land, and the span of those landing spots is exactly the set of all outputs.

> Column space = the span of the matrix's columns.

So another definition of rank: **the dimension of the column space**.

When the rank reaches its maximum possible value (equal to the number of columns), the matrix is **full rank**.

One detail: the zero vector always belongs to the column space, because a linear transformation must keep the origin fixed.

## Null space

At full rank, only the zero vector is sent to the origin.

Otherwise, a **whole family** of vectors gets crushed to zero:

- 2D squashed onto a line: an entire line in another direction lands on the origin;
- 3D squashed onto a plane: an entire line lands on the origin;
- 3D squashed onto a line: an entire plane lands on the origin.

This family is the **null space**, also called the **kernel**.

Its use is direct: when $\vec{v}$ is the zero vector, the solutions of $A\vec{x}=0$ are precisely the null space.

In general, given one particular solution $\vec{x}_0$, every solution can be written as "$\vec{x}_0$ plus some vector in the null space" — adding anything that gets crushed to zero leaves the landing spot unchanged.

As a supplement, this explains why a non-unique solution set is a line or a plane: it is the null space translated to sit at one particular solution.

## What this chapter establishes

- A linear system is $A\vec{x}=\vec{v}$, geometrically asking which vector lands on $\vec{v}$.
- If $\det A \neq 0$ there is an inverse $A^{-1}$ with $A^{-1}A=I$, and the unique solution is $\vec{x}=A^{-1}\vec{v}$.
- The identity matrix $I$ does nothing, with columns $(1,0)$ and $(0,1)$.
- If $\det A = 0$ there is no inverse: a flattened space cannot be restored, since that would require one input mapping to many outputs.
- No inverse does not rule out solutions: if $\vec{v}$ lies in the output space, solutions exist (possibly many).
- Rank is the dimension of the output space; full rank means the rank equals the number of columns.
- The column space is the set of all possible outputs, equal to the span of the columns.
- The null space is the set of vectors sent to the origin; it is exactly the solution set of $A\vec{x}=0$.

## Check your understanding

**1. Why is there no inverse when $\det A = 0$?**

Answer: because the map crushes space into a lower dimension, so distinct inputs are sent to the same output. An inverse would need to restore each output to a unique input, but after flattening those inputs are indistinguishable — restoring a point to an entire line of points is not a function (a function cannot send one input to many outputs). Hence no inverse exists.

**2. When there is no inverse, what possibilities remain for $A\vec{x}=\vec{v}$?**

Answer: two. If $\vec{v}$ is not in the column space (nothing lands on it), there is no solution. If $\vec{v}$ is in the column space, solutions exist and are typically infinitely many, because adding any null-space vector to a particular solution leaves the landing spot unchanged. So "no inverse" rules out uniqueness, not existence.

**3. How do rank and determinant relate?**

Answer: a non-zero determinant is equivalent to full rank (rank equal to the number of columns). A zero determinant says the rank is below the column count, but not by how much — it only reports "flattened," not "flattened to what dimension." Rank supplies that: rank 2 means the output is a plane, rank 1 a line. Rank is the finer classification.

**4. Why is the column space the span of the columns?**

Answer: because the $k$-th column is where the $k$-th basis vector lands. Any input is a linear combination of basis vectors, and its image is the same combination of those landing spots. So the set of all possible outputs is exactly the set of all linear combinations of the columns — their span.

**5. Why does the null space describe the full solution set?**

Answer: let $\vec{x}_0$ be one solution, $A\vec{x}_0=\vec{v}$. If $\vec{n}$ is in the null space ($A\vec{n}=0$), then $A(\vec{x}_0+\vec{n})=A\vec{x}_0+A\vec{n}=\vec{v}$, so $\vec{x}_0+\vec{n}$ also solves it. Conversely, for any two solutions, $A(\vec{x}_1-\vec{x}_2)=\vec{v}-\vec{v}=0$, so their difference lies in the null space. Hence the solution set is exactly "particular solution plus null space," which geometrically is the null space translated to that solution.
