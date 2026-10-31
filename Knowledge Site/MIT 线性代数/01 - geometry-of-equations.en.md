---
slug: "01-geometry-of-equations"
title: "The Geometry of Linear Equations: Rows, Columns, and Matrices"
summary: "One system, three pictures: intersecting lines, a combination of columns, and a matrix acting on a vector. The column picture is the one that generalizes."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "column-picture"
  - "linear-combination"
sources:
  - kind: "video"
    title: "Lecture 1: The Geometry of Linear Equations"
    url: "https://www.youtube.com/watch?v=J7DzL2_Na80"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## The thread of the lecture

The fundamental problem of linear algebra is solving a system of linear equations. Strang looks at a single $2\times 2$ example from three angles:

1. **Row picture.** One equation at a time; each is a line, and the solution is where they meet.
2. **Column picture.** One column at a time; the solution says how much of each column to combine to reach the right-hand side.
3. **Matrix form.** The whole system written as $A\mathbf{x}=\mathbf{b}$.

They are three languages for one object. The row picture is the most visual, the column picture generalizes best, and the matrix form is the one computation uses.

## The example and its matrix

$$
\begin{aligned}
2x - y &= 0,\\
-x + 2y &= 3.
\end{aligned}
$$

The coefficient matrix, unknown vector, and right-hand side are

$$
A=\begin{bmatrix}2 & -1\\ -1 & 2\end{bmatrix},\qquad
\mathbf{x}=\begin{bmatrix}x\\ y\end{bmatrix},\qquad
\mathbf{b}=\begin{bmatrix}0\\ 3\end{bmatrix}.
$$

So the system is $A\mathbf{x}=\mathbf{b}$.

## Row picture: two lines meeting

The first equation $2x-y=0$ passes through the origin: $x=0$ gives $y=0$, and $x=1$ gives $y=2$. Two points determine the line.

The second equation $-x+2y=3$ does not pass through the origin: $y=0$ gives $x=-3$, and $x=-1$ gives $y=1$.

The lines meet at $(1,2)$. Check it:

$$
2(1)-2=0,\qquad -(1)+2(2)=3.
$$

In two dimensions the row picture is completely clear. In three dimensions each equation is a plane; in higher dimensions it cannot be drawn at all. **The row picture is easy to see and hard to generalize.**

## Column picture: a combination of columns

Split the system by columns:

$$
x\begin{bmatrix}2\\ -1\end{bmatrix}+y\begin{bmatrix}-1\\ 2\end{bmatrix}
=\begin{bmatrix}0\\ 3\end{bmatrix}.
$$

The question becomes: how many copies of column 1 plus how many of column 2 produce $\mathbf{b}$?

Here the answer is already known, $x=1,\ y=2$. Check:

$$
1\begin{bmatrix}2\\ -1\end{bmatrix}+2\begin{bmatrix}-1\\ 2\end{bmatrix}
=\begin{bmatrix}2-2\\ -1+4\end{bmatrix}
=\begin{bmatrix}0\\ 3\end{bmatrix}.
$$

Geometrically: walk one copy of $[2,-1]$ from the origin, then two copies of $[-1,2]$, and the endpoint is $(0,3)$. This is a **linear combination** — multiply vectors by coefficients and add. Strang calls it the most fundamental operation in the course.

### Where all combinations can reach

If $x$ and $y$ range over all real numbers, the combinations of these two columns fill the whole plane. For this matrix, **every** right-hand side $\mathbf{b}$ can be represented. That question — does the set of all combinations fill the space? — returns throughout the course under the name of the column space.

## A three-dimensional example: planes and three columns

$$
\begin{aligned}
2x-y &= 0,\\
-x+2y-z &= -1,\\
-3y+4z &= 4.
\end{aligned}
$$

$$
A=\begin{bmatrix}
2 & -1 & 0\\
-1 & 2 & -1\\
0 & -3 & 4
\end{bmatrix},\qquad
\mathbf{b}=\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}.
$$

### Row picture

Each row is a plane:

- $2x-y=0$ does not involve $z$, so it is a vertical plane;
- $-x+2y-z=-1$ is another plane;
- $-3y+4z=4$ is a third.

Two planes meet in a line; the third plane cuts that line at a point. When the planes are in general position, the intersection is a single point — the solution.

Strang does not actually locate the point. His point is that **the row picture already strains at three dimensions**.

### Column picture

$$
x\begin{bmatrix}2\\ -1\\ 0\end{bmatrix}
+y\begin{bmatrix}-1\\ 2\\ -3\end{bmatrix}
+z\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}
=\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}.
$$

The right-hand side is exactly the third column, so $x=0,\ y=0,\ z=1$ works:

$$
0\cdot\begin{bmatrix}2\\ -1\\ 0\end{bmatrix}
+0\cdot\begin{bmatrix}-1\\ 2\\ -3\end{bmatrix}
+1\cdot\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}
=\begin{bmatrix}0\\ -1\\ 4\end{bmatrix}.
$$

The solution is $(0,0,1)$. The example was chosen so the answer is visible; a real problem needs elimination, which is the next lecture.

### A different right-hand side

Keep $A$ fixed and replace $\mathbf{b}$ with the sum of the first two columns:

$$
\mathbf{b}'=\begin{bmatrix}2\\ -1\\ 0\end{bmatrix}+\begin{bmatrix}-1\\ 2\\ -3\end{bmatrix}
=\begin{bmatrix}1\\ 1\\ -3\end{bmatrix}.
$$

Now $x=1,\ y=1,\ z=0$ is obvious. In the row picture, three new planes meet at a new point; in the column picture, the same three columns are combined with new coefficients.

**Same matrix, different $\mathbf{b}$, different combination problem.**

## The central question: is there a solution for every $\mathbf{b}$?

Strang turns the lecture toward one question:

> For every right-hand side $\mathbf{b}$, does $A\mathbf{x}=\mathbf{b}$ have a solution?

In the column picture:

> Do all linear combinations of the columns fill the whole space?

The two are the same statement, because $A\mathbf{x}$ is by definition the combination of the columns of $A$ with the entries of $\mathbf{x}$ as weights.

For this $3\times 3$ example the answer is yes: the three columns are not coplanar, so their combinations reach every point of three-dimensional space. Such a matrix is **nonsingular**, or invertible.

### When it fails

If all three columns lie in one plane, every combination lies in that plane:

- a $\mathbf{b}$ inside the plane has a solution;
- a $\mathbf{b}$ outside it has none.

The clearest failure is when the third column equals the sum of the first two: it adds no new direction. The matrix is **singular** and not invertible.

The same intuition scales. Nine vectors in nine dimensions may span the whole space, or may only span an eight-dimensional plane inside it. A random $9\times 9$ matrix is almost certainly nonsingular; make the ninth column a copy of the eighth and some $\mathbf{b}$ become unreachable.

## Matrix times vector: two algorithms, one meaning

Strang closes by asking what $A\mathbf{x}$ actually computes:

$$
\begin{bmatrix}2 & 5\\ 1 & 3\end{bmatrix}
\begin{bmatrix}1\\ 2\end{bmatrix}
=?
$$

### By columns: a linear combination

$$
1\begin{bmatrix}2\\ 1\end{bmatrix}+2\begin{bmatrix}5\\ 3\end{bmatrix}
=\begin{bmatrix}2\\ 1\end{bmatrix}+\begin{bmatrix}10\\ 6\end{bmatrix}
=\begin{bmatrix}12\\ 7\end{bmatrix}.
$$

This is the column picture: $A\mathbf{x}$ combines the columns of $A$ using the entries of $\mathbf{x}$ as weights.

### By rows: dot products

First row with $\mathbf{x}$:

$$
2\cdot 1+5\cdot 2=12.
$$

Second row with $\mathbf{x}$:

$$
1\cdot 1+3\cdot 2=7.
$$

Same answer. Strang's advice: **compute by rows, understand by columns**. The column view becomes the main line when the course reaches column spaces, rank, and the four fundamental subspaces.

## Takeaways

- Solving a system has three equivalent views: rows (intersecting lines or planes), columns (linear combinations), matrix ($A\mathbf{x}=\mathbf{b}$).
- The column picture is the one that survives in high dimensions.
- $A\mathbf{x}$ means "a linear combination of the columns of $A$".
- "A solution for every $\mathbf{b}$" is the same as "the columns span the whole space".
- Coplanar columns make the matrix singular, and some $\mathbf{b}$ become unreachable.
- Actually finding the solution requires elimination, not inspection.

## Check your understanding

1. Explain the solution $(1,2)$ of the $2\times 2$ example in both the row and column pictures.
2. Why does three coplanar columns imply that some right-hand sides have no solution? Answer in the language of linear combinations.
3. Compute $\begin{bmatrix}1 & 2\\ 3 & 4\end{bmatrix}\begin{bmatrix}2\\ 1\end{bmatrix}$ twice: once by rows, once by columns.
4. Is "a random $9\times 9$ matrix is almost surely invertible" in tension with "it is singular if column nine equals column eight"?

## How it connects

This lecture builds the vocabulary: rows, columns, linear combinations, singularity. The next lecture supplies elimination — the systematic algorithm — and shows what failure looks like computationally.
