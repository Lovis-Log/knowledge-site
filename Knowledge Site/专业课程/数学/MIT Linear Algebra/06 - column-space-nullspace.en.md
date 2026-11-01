---
slug: "06-column-space-nullspace"
title: "Column Space and Nullspace: The Two Subspaces a Matrix Creates"
summary: "The column space answers which b are solvable; the nullspace answers which x are sent to zero. Both are subspaces; the solution set of Ax=b is not."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "column-space"
  - "nullspace"
  - "subspace"
sources:
  - kind: "video"
    title: "Lecture 6: Column Space and Nullspace"
    url: "https://www.youtube.com/watch?v=8o5Cmfpeo6g"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Starting from the two subspace tests

A set is a subspace when it satisfies two conditions:

1. closed under addition: if $v,w$ are in the set, so is $v+w$;
2. closed under scalar multiplication: if $v$ is in the set, so is $cv$.

Together: **closed under linear combinations**. These two conditions also force the zero vector into the set (take $c=0$).

In $R^3$ the subspaces are exactly: the whole space, a plane through the origin, a line through the origin, and the zero vector alone.

### Union fails, intersection works

Take a plane $P$ through the origin and a line $L$ through the origin that is not inside $P$.

- $P\cup L$ is **not** a subspace: take a vector from the plane and one from the line; their sum is usually in neither.
- $P\cap L$ **is** a subspace: here the intersection is only the zero vector, and $\{\mathbf{0}\}$ is a subspace.

In general, the intersection of two subspaces is a subspace. Let $S,T$ be subspaces and $v,w\in S\cap T$:

- $v+w\in S$ because $S$ is a subspace, and $v+w\in T$ because $T$ is a subspace, so $v+w\in S\cap T$;
- $cv\in S$ and $cv\in T$, so $cv\in S\cap T$.

An intersection imposes both sets of requirements, so it is smaller, but it stays closed.

## Timeline

| Time | Topic |
| --- | --- |
| 2:04 | Planes and lines in three dimensions |
| 4:50 | The union of a plane and a line |
| 6:14 | Is the union still a subspace? |
| 7:21 | The intersection is a subspace |
| 9:45 | Checking closure of the intersection |
| 12:46 | Subspaces inside $R^4$ |
| 16:19 | Does $A\mathbf{x}=\mathbf{b}$ have a solution for every $\mathbf{b}$? |
| 26:22 | Which columns can be thrown away? |
| 29:12 | The definition of the null space |
| 31:10 | Computing the null space |
| 32:55 | The null space is a vector space |
| 37:53 | The sum of two solutions stays in the null space |
| 43:53 | Subspaces must pass through the origin |

## The column space: spanned by the columns

Take

$$
A=
\begin{bmatrix}
1&1&2\\
2&1&3\\
3&1&4\\
4&1&5
\end{bmatrix}.
$$

This is $4\times3$; its three columns live in $R^4$:

$$
\mathbf{c}_1=\begin{bmatrix}1\\2\\3\\4\end{bmatrix},\quad
\mathbf{c}_2=\begin{bmatrix}1\\1\\1\\1\end{bmatrix},\quad
\mathbf{c}_3=\begin{bmatrix}2\\3\\4\\5\end{bmatrix}.
$$

The **column space** $C(A)$ is all linear combinations:

$$
C(A)=\{x_1\mathbf{c}_1+x_2\mathbf{c}_2+x_3\mathbf{c}_3\mid x_1,x_2,x_3\in R\}.
$$

It is a subspace of $R^4$. Why not all of $R^4$? Three vectors span at most three dimensions. In fact here they span fewer, because

$$
\mathbf{c}_3=\mathbf{c}_1+\mathbf{c}_2,
$$

so the third column adds no new direction. The column space is a **two-dimensional subspace** of $R^4$ — a plane through the origin.

> **One-sentence summary:** The column space is the set of all possible $A\mathbf{x}$; its dimension is the number of genuinely independent columns.

### The connection to $A\mathbf{x}=\mathbf{b}$

This is the lecture's central link:

$$
A\mathbf{x}=\mathbf{b}\ \text{is solvable}
\iff
\mathbf{b}\in C(A).
$$

The reason is immediate: $A\mathbf{x}$ is by definition a combination of the columns, with the entries of $\mathbf{x}$ as coefficients. So:

- if $\mathbf{b}$ is a combination of the columns, those coefficients give a solution;
- if not, no solution exists.

For this $4\times3$ matrix there are four equations and only three unknowns, so most $\mathbf{b}$ are unsolvable. The solvable ones form exactly the plane that is the column space.

Examples:

- $\mathbf{b}=[1,2,3,4]^T=\mathbf{c}_1$ has solution $(1,0,0)$;
- $\mathbf{b}=[1,1,1,1]^T=\mathbf{c}_2$ has solution $(0,1,0)$;
- any $a\mathbf{c}_1+b\mathbf{c}_2$ has solution $(a,b,0)$.

## The nullspace: the $x$ sent to zero

For the same matrix, a completely different subspace. The **nullspace** $N(A)$ is the set of all $\mathbf{x}$ satisfying

$$
A\mathbf{x}=\mathbf{0}.
$$

It contains $x$, not $b$. Since $\mathbf{x}$ has three components, $N(A)$ is a subspace of $R^3$.

### Computing it for this example

Observe that the third column is the sum of the first two:

$$
\mathbf{c}_1+\mathbf{c}_2-\mathbf{c}_3=\mathbf{0}.
$$

Therefore

$$
\mathbf{x}=\begin{bmatrix}1\\1\\-1\end{bmatrix}
$$

is a solution, and so is every multiple:

$$
N(A)=\left\{c\begin{bmatrix}1\\1\\-1\end{bmatrix}\ \middle|\ c\in R\right\}.
$$

Geometrically, this is a line through the origin in $R^3$.

### Why the nullspace must be a subspace

Let $A\mathbf{v}=\mathbf{0}$ and $A\mathbf{w}=\mathbf{0}$. Then

$$
A(\mathbf{v}+\mathbf{w})=A\mathbf{v}+A\mathbf{w}=\mathbf{0}+\mathbf{0}=\mathbf{0},
$$

so $\mathbf{v}+\mathbf{w}$ is also in the nullspace. For scalars,

$$
A(c\mathbf{v})=cA\mathbf{v}=c\mathbf{0}=\mathbf{0}.
$$

The nullspace is closed under linear combinations, hence a subspace.

## The key contrast: solutions of $A\mathbf{x}=\mathbf{b}$ are not a subspace

Change the right-hand side to $\mathbf{b}=[1,2,3,4]^T$. One solution is $(1,0,0)$; another is $(0,-1,1)$:

$$
0\cdot\mathbf{c}_1+(-1)\mathbf{c}_2+1\cdot\mathbf{c}_3
=-\mathbf{c}_2+\mathbf{c}_3
=\begin{bmatrix}1\\2\\3\\4\end{bmatrix}.
$$

But the solution set is **not** a subspace, because the zero vector is not a solution: $A\mathbf{0}=\mathbf{0}\neq\mathbf{b}$.

Its structure is "one particular solution plus the nullspace":

$$
\mathbf{x}=
\begin{bmatrix}1\\0\\0\end{bmatrix}
+c\begin{bmatrix}1\\1\\-1\end{bmatrix}.
$$

Geometrically, this is a line in $R^3$ that does **not** pass through the origin. The solution set is a translate of the nullspace — an affine set, not a subspace.

> **Background:** This is why the homogeneous equation $A\mathbf{x}=\mathbf{0}$ matters so much. Only its solution set contains the origin, so only it can be a subspace; the nonhomogeneous solution set is a translate of it.

## Two ways to describe a subspace

The lecture names the two basic constructions:

| Way | Example | Character |
| --- | --- | --- |
| Give vectors, take all combinations | Column space | spanning from inside |
| Give equations, take all solutions | Nullspace | constraining from outside |

- Column space: here are some columns; take their combinations.
- Nullspace: here are the equations; take the solutions.

Both recur throughout the course: the column space is the image, and the nullspace is the kernel.

## Takeaways

- A subspace is closed under linear combinations and therefore contains zero.
- The intersection of two subspaces is a subspace; the union generally is not.
- The column space $C(A)$ is all combinations of the columns, living in $R^m$.
- $A\mathbf{x}=\mathbf{b}$ is solvable exactly when $\mathbf{b}\in C(A)$.
- The nullspace $N(A)$ is all solutions of $A\mathbf{x}=\mathbf{0}$, living in $R^n$.
- The nullspace is a subspace; the solution set of a nonhomogeneous system is a translate of it.
- More columns than independent columns lowers the dimension of the column space; here the third column is the sum of the first two, so the column space is two-dimensional.

## Check your understanding

**1. Prove that the intersection of two subspaces is a subspace, and give an example showing the union need not be.**

Reference answer: Let $S,T$ be subspaces and $\mathbf{v},\mathbf{w}\in S\cap T$. Since $S$ is a subspace, $\mathbf{v}+\mathbf{w}\in S$; since $T$ is a subspace, $\mathbf{v}+\mathbf{w}\in T$; hence $\mathbf{v}+\mathbf{w}\in S\cap T$. The same holds for scaling: $c\mathbf{v}\in S$ and $c\mathbf{v}\in T$. So the intersection is closed and is a subspace.
For the union, take in $R^3$ the plane $P=\{(x,y,0)\}$ and the line $L=\{(0,0,z)\}$. Then $\mathbf{u}=(1,0,0)\in P$ and $\mathbf{w}=(0,0,1)\in L$, but
$$
\mathbf{u}+\mathbf{w}=(1,0,1),
$$
which is in neither $P$ (third coordinate nonzero) nor $L$ (first coordinate nonzero). The sum escapes the union, so $P\cup L$ is not a subspace.

**2. Why is this column space not all of $R^4$? Answer in terms of how many dimensions three vectors can span.**

Reference answer: $A$ is $4\times3$, so it has only three columns, and three vectors span at most three dimensions — never all of four-dimensional $R^4$. Here it is even smaller: $\mathbf{c}_3=\mathbf{c}_1+\mathbf{c}_2$, so only two independent directions remain and the column space is a two-dimensional plane through the origin. Most $\mathbf{b}\in R^4$ lie off that plane, and those systems have no solution.

**3. Write the nullspace of this matrix and verify $\mathbf{c}_1+\mathbf{c}_2-\mathbf{c}_3=\mathbf{0}$.**

Reference answer: Compute the combination:
$$
\begin{bmatrix}1\\2\\3\\4\end{bmatrix}+\begin{bmatrix}1\\1\\1\\1\end{bmatrix}-\begin{bmatrix}2\\3\\4\\5\end{bmatrix}
=\begin{bmatrix}0\\0\\0\\0\end{bmatrix}.
$$
So $\mathbf{x}=(1,1,-1)^T$ solves $A\mathbf{x}=\mathbf{0}$, and so does every multiple. The nullspace is
$$
N(A)=\left\{c\begin{bmatrix}1\\1\\-1\end{bmatrix}\ \middle|\ c\in R\right\},
$$
a line through the origin in $R^3$.

**4. Why is the solution set of $A\mathbf{x}=\mathbf{b}$ with $\mathbf{b}\neq\mathbf{0}$ not a subspace?**

Reference answer: A subspace must contain the zero vector, but $A\mathbf{0}=\mathbf{0}\ne\mathbf{b}$, so zero is not a solution and the set misses the origin. Closure also fails: if $\mathbf{x}_1,\mathbf{x}_2$ are solutions,
$$
A(\mathbf{x}_1+\mathbf{x}_2)=\mathbf{b}+\mathbf{b}=2\mathbf{b}\ne\mathbf{b}
$$
for $\mathbf{b}\ne\mathbf{0}$, so the sum is not a solution. The set is a translate of the nullspace, not a subspace.

**5. Given one particular solution and the nullspace, how do you write all solutions?**

Reference answer: With $\mathbf{x}_p$ a particular solution and $N(A)$ the nullspace,
$$
\mathbf{x}=\mathbf{x}_p+\mathbf{x}_n,\qquad \mathbf{x}_n\in N(A).
$$
Both directions hold: $A(\mathbf{x}_p+\mathbf{x}_n)=\mathbf{b}+\mathbf{0}=\mathbf{b}$, so each such vector is a solution; and if $\mathbf{x}$ is any solution, $A(\mathbf{x}-\mathbf{x}_p)=\mathbf{0}$, so $\mathbf{x}-\mathbf{x}_p\in N(A)$. Nothing is missing. In this example,
$$
\mathbf{x}=\begin{bmatrix}1\\0\\0\end{bmatrix}+c\begin{bmatrix}1\\1\\-1\end{bmatrix}.
$$

## How it connects

This lecture defines the two central subspaces of a matrix. The next uses elimination to compute the nullspace systematically: pivot columns and free columns produce the "special solutions", and from them comes the dimension formula.
