---
slug: "08-ax-equals-b"
title: "Solving Ax = b: Particular Solution Plus Nullspace, and What Rank Decides"
summary: "Eliminate the augmented matrix; zero rows give the solvability condition. Set free variables to zero for a particular solution, then add the nullspace. The relation between r, m, and n fixes the number of solutions."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "solvability"
  - "particular-solution"
  - "rank"
sources:
  - kind: "video"
    title: "Lecture 8: Solving Ax = b: Row Reduced Form R"
    url: "https://www.youtube.com/watch?v=9Q1q7s1jTzU"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## The complete theory of $A\mathbf{x}=\mathbf{b}$

Three steps:

1. use elimination to decide **whether a solution exists**;
2. if it does, find one **particular solution**;
3. add the **nullspace** to get all solutions.

This structure recurs throughout the course, because every linear solution set is "one particular solution plus a nullspace".

## The example: same matrix as last time

$$
A=
\begin{bmatrix}
1&2&2&2\\
2&4&6&8\\
3&6&8&10
\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}b_1\\b_2\\b_3\end{bmatrix}.
$$

Row three is the sum of rows one and two. Applying "row one + row two" to the left side gives row three, so the same combination of the right side must give zero:

$$
b_1+b_2-b_3=0.
$$

That is the solvability condition. Elimination should discover it.

### Augmented matrix and elimination

$$
\left[\begin{array}{cccc|c}
1&2&2&2&b_1\\
2&4&6&8&b_2\\
3&6&8&10&b_3
\end{array}\right].
$$

**Step one:** $R_2\leftarrow R_2-2R_1$, $R_3\leftarrow R_3-3R_1$:

$$
\left[\begin{array}{cccc|c}
1&2&2&2&b_1\\
0&0&2&4&b_2-2b_1\\
0&0&2&4&b_3-3b_1
\end{array}\right].
$$

**Step two:** $R_3\leftarrow R_3-R_2$:

$$
\left[\begin{array}{cccc|c}
1&2&2&2&b_1\\
0&0&2&4&b_2-2b_1\\
0&0&0&0&b_3-b_2-b_1
\end{array}\right].
$$

The last row reads

$$
0=b_3-b_2-b_1.
$$

Exactly the predicted condition.

> **One-sentence summary:** If a combination of the left-hand rows gives a zero row, the same combination of the right-hand side must give zero, or there is no solution.

### Choose a $\mathbf{b}$ that satisfies it

Take $\mathbf{b}=(1,5,6)$, since $1+5=6$. Elimination turns the right side into

$$
\Big(b_1,\ b_2-2b_1,\ b_3-b_2-b_1\Big)=(1,\ 3,\ 0).
$$

The system reduces to

$$
\begin{aligned}
x_1+2x_2+2x_3+2x_4 &= 1,\\
2x_3+4x_4 &= 3.
\end{aligned}
$$

## Particular solution: set all free variables to zero

Pivots are in columns 1 and 3, so the free variables are $x_2,x_4$. Set

$$
x_2=0,\qquad x_4=0.
$$

The remaining equations are

$$
\begin{aligned}
x_1+2x_3 &= 1,\\
2x_3 &= 3.
\end{aligned}
$$

Back-substitute:

$$
x_3=\frac{3}{2},\qquad
x_1=1-2\cdot\frac{3}{2}=-2.
$$

So a particular solution is

$$
\mathbf{x}_p=
\begin{bmatrix}
-2\\
0\\
3/2\\
0
\end{bmatrix}.
$$

Substitute into the original system to verify $A\mathbf{x}_p=\mathbf{b}$. Setting free variables to zero is only a convenience; any solution can serve as the particular one.

## General solution: particular plus nullspace

From the previous lecture, two special nullspace vectors are

$$
\mathbf{s}_1=\begin{bmatrix}-2\\1\\0\\0\end{bmatrix},
\qquad
\mathbf{s}_2=\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}.
$$

All solutions are

$$
\mathbf{x}=
\mathbf{x}_p+c_1\mathbf{s}_1+c_2\mathbf{s}_2
=
\begin{bmatrix}-2\\0\\3/2\\0\end{bmatrix}
+c_1\begin{bmatrix}-2\\1\\0\\0\end{bmatrix}
+c_2\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}.
$$

### Why adding is valid

$$
A(\mathbf{x}_p+\mathbf{x}_n)=A\mathbf{x}_p+A\mathbf{x}_n=\mathbf{b}+\mathbf{0}=\mathbf{b}.
$$

Conversely, if $\mathbf{x}$ and $\mathbf{x}_p$ are both solutions, then

$$
A(\mathbf{x}-\mathbf{x}_p)=\mathbf{b}-\mathbf{b}=\mathbf{0},
$$

so $\mathbf{x}-\mathbf{x}_p$ lies in the nullspace. **The general solution is the particular solution plus the nullspace, and nothing else.**

### The geometry

- The nullspace is a two-dimensional subspace of $R^4$ through the origin;
- the solution set is that plane translated so it passes through $\mathbf{x}_p$.

So the solution set is a **plane not through the origin**, hence not a subspace. This is why the solution set of $A\mathbf{x}=\mathbf{b}$ with $\mathbf{b}\neq\mathbf{0}$ cannot be a vector space: it does not contain zero.

## Rank decides the number of solutions

Let $A$ be $m\times n$ with rank $r$. Always

$$
r\le m,\qquad r\le n.
$$

Rank is the number of pivots and the number of pivot columns. The number of free variables is $n-r$.

### Case 1: full column rank $r=n$

Every column has a pivot, so there are no free variables:

$$
N(A)=\{\mathbf{0}\}.
$$

If $A\mathbf{x}=\mathbf{b}$ has a solution, it is unique; otherwise there is none. **Zero or one solution.**

Example (tall and thin):

$$
A=
\begin{bmatrix}
1&3\\
2&1\\
6&1\\
5&1
\end{bmatrix},
\qquad r=2=n.
$$

The two columns are independent, and the reduced form is

$$
R=
\begin{bmatrix}
1&0\\
0&1\\
0&0\\
0&0
\end{bmatrix}
=\begin{bmatrix}I\\0\end{bmatrix}.
$$

Four equations, two unknowns, so not every $\mathbf{b}$ is solvable. With $\mathbf{b}=[4,3,7,6]^T$ (the sum of the columns), the unique solution is $(1,1)$.

### Case 2: full row rank $r=m$

Every row has a pivot, so elimination produces no zero rows, and **every $\mathbf{b}$ is solvable**.

There are $n-r=n-m$ free variables, so:

- if $n>m$, there are infinitely many solutions;
- if $n=m$, this reduces to case 3.

Example: transpose the matrix above,

$$
A^T=
\begin{bmatrix}
1&2&6&5\\
3&1&1&1
\end{bmatrix},
\qquad r=2=m<n=4.
$$

The reduced form is $\begin{bmatrix}I&F\end{bmatrix}$; two free variables, always infinitely many solutions.

### Case 3: full rank square $r=m=n$

Now $R=I$ and the matrix is invertible:

- the nullspace contains only zero;
- every $\mathbf{b}$ has exactly one solution.

Example:

$$
A=\begin{bmatrix}1&2\\3&1\end{bmatrix},
\qquad
\det A=1-6=-5\neq 0.
$$

For any $\mathbf{b}$, the solution is unique.

### Case 4: general $r<m$ and $r<n$

There can be zero rows (restricting $\mathbf{b}$) and free variables (solutions not unique). So the count is **zero or infinitely many**, never exactly one.

## Summary table

| Rank condition | Reduced form | Number of solutions |
| --- | --- | --- |
| $r=m=n$ | $I$ | exactly one |
| $r=n<m$ | $\begin{bmatrix}I\\0\end{bmatrix}$ | zero or one |
| $r=m<n$ | $\begin{bmatrix}I&F\end{bmatrix}$ | infinitely many |
| $r<m,\ r<n$ | $\begin{bmatrix}I&F\\0&0\end{bmatrix}$ | zero or infinitely many |

One sentence: **rank tells you the structure of the solution set; the actual entries only tell you the numbers.**

## Takeaways

- Solvability: each zero row in the reduced form must have a zero on the right; equivalently, $\mathbf{b}\in C(A)$.
- Particular solution: set all free variables to zero and back-substitute.
- General solution: $\mathbf{x}=\mathbf{x}_p+\mathbf{x}_n$, with $\mathbf{x}_n$ ranging over the nullspace.
- The solution set is a translate of the nullspace; it misses the origin, so it is not a subspace.
- Full column rank: zero or one. Full row rank: always infinitely many. Full square rank: exactly one. General: zero or infinitely many.

## Check your understanding

1. For $\mathbf{b}=(1,5,6)$, verify that elimination produces $(1,3,0)$ and find the particular solution.
2. Why does "particular plus nullspace" cover every solution? Prove both directions.
3. How many solutions can a $4\times2$ matrix have? What does it depend on?
4. Can a $2\times4$ matrix be unsolvable? Why or why not?
5. Use the rank conditions to explain why an invertible square matrix has a unique solution for every $\mathbf{b}$.

## How it connects

This lecture completes the theory of linear systems. The next turns to linear independence, bases, and dimension, unifying the counting questions around rank, free variables, and nullspace dimension.
