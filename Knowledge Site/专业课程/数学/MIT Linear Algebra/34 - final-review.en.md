---
slug: "34-final-review"
title: "Final Review: Six Old Problems That Span the Course"
summary: "From rank and solvability, four subspaces, and matrix multiplication to orthogonal projection, Markov processes, and least squares, every problem traces back to the same four-subspace picture."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "course-review"
  - "least-squares"
  - "markov"
sources:
  - kind: "video"
    title: "34. Final Course Review"
    url: "https://www.youtube.com/watch?v=RWvi4Vx4CDc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## How the review works

The last lecture does not restate definitions. It works old exam problems live. Every problem maps to one thread of the course; together they form a complete map.

Below, the problems are grouped by type. The point is not the answer but **what to ask first when a condition appears**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:07 | The format of the final review |
| 1:18 | Problem one: inferring $m,n,r$ from $Ax=b$ |
| 3:26 | Pivots and solvability |
| 5:01 | Constructing a matrix with prescribed properties |
| 7:33 | Invertibility and the rank of $A^{\mathsf T}A$ |
| 10:26 | The nullspace of $A^{\mathsf T}A$ |
| 14:40 | $A^{\mathsf T}y=c$ and the nullspace of $A^{\mathsf T}$ |
| 17:06 | Dimensions of the four subspaces |
| 18:28 | Combinations, independence, nullspace |
| 21:29 | Uniqueness is decided by the nullspace |
| 22:53 | Nearest point and projection |
| 25:02 | Eigenvalues, trace, determinant |
| 26:54 | Steady state of a Markov matrix |
| 28:22 | Computing the steady state eigenvector |
| 32:16 | Building a matrix from its properties |
| 34:26 | Using $S\Lambda S^{-1}$ |
| 35:43 | Orthogonal eigenvectors without symmetry |
| 38:49 | Least squares solution and residual |
| 41:07 | Changing $b$ so the least squares solution changes |

## Type one: recover m, n, r from solvability

### Problem

Let $A$ be $3\times n$. Suppose:

- $Ax=(1,0,0)^{\mathsf T}$ has no solution;
- $Ax=(0,1,0)^{\mathsf T}$ has exactly one solution.

Find the relation among $m,n,r$.

### Reasoning

1. The right side is a three-dimensional vector, so $m=3$.
2. Some right side has no solution, so elimination produces a zero row, hence $r<m$, that is $r<3$.
3. "Exactly one solution" means the null space is trivial, so the columns are independent and $r=n$.

Therefore

$$
r=n<3.
$$

### An example

$$
A=\begin{bmatrix}0\\1\\0\end{bmatrix}.
$$

It is $3\times1$ with $r=n=1$. Its column space is the $y$-axis, which contains $(0,1,0)$ uniquely but not $(1,0,0)$.

With two columns, take

$$
A=\begin{bmatrix}0&0\\1&0\\0&1\end{bmatrix},
$$

whose column space is the $yz$-plane and which satisfies the same conditions.

## Type two: true or false about $A^{\mathsf T}A$ and $AA^{\mathsf T}$

Under $r=n<3$, decide three statements.

### Statement one: $\det(A^{\mathsf T}A)=\det(AA^{\mathsf T})$

False. The matrices have different sizes: $A^{\mathsf T}A$ is $n\times n$, while $AA^{\mathsf T}$ is $3\times3$.

The identity $\det(BA)=\det(AB)$ requires square matrices, and then both equal $(\det A)^2$.

### Statement two: $A^{\mathsf T}A$ is invertible

True. Since $r=n$, the columns are independent and $A^{\mathsf T}A$ is $n\times n$ of full rank.

### Statement three: $AA^{\mathsf T}$ is positive definite

False. $AA^{\mathsf T}$ is $3\times3$ but has rank $r=n<3$, so it is singular and at most semidefinite.

In the example, the first row of $AA^{\mathsf T}$ is entirely zero, so it certainly is not positive definite.

## Type three: proving $A^{\mathsf T}y=c$ is always solvable

$A^{\mathsf T}$ is $n\times3$. Since the columns of $A$ are independent, the rows of $A^{\mathsf T}$ are independent, so

$$
\operatorname{rank}(A^{\mathsf T})=n.
$$

Full row rank means every right side is solvable.

Why infinitely many? The null space of $A^{\mathsf T}$ has dimension

$$
m-r=3-r>0.
$$

So once one solution exists, adding any null-space vector gives another.

> This problem combines two facts: full row rank implies solvability, and the left null space has dimension $m-r$.

## Type four: matrix multiplication and null spaces

Let the columns of $A$ be $v_1,v_2,v_3$.

### Solve $Ax=v_1-v_2+v_3$

By the definition of multiplication by columns,

$$
A\begin{bmatrix}1\\-1\\1\end{bmatrix}
=v_1-v_2+v_3.
$$

So

$$
x=\begin{bmatrix}1\\-1\\1\end{bmatrix}.
$$

This is the most basic fact about matrix multiplication: $Ax$ is a combination of the columns, with the entries of $x$ as coefficients.

### If $v_1-v_2+v_3=0$

Then this $x$ lies in the null space of $A$. Any solution can be shifted by it:

$$
A(x+kc)=Ax.
$$

So solutions are not unique. **Uniqueness is exactly the statement that the null space is trivial.**

## Type five: orthonormal vectors and the nearest point

Suppose $v_1,v_2,v_3$ are orthonormal.

Which combination of $v_1,v_2$ is closest to $v_3$?

Since $v_3$ is orthogonal to both, its projection onto $\operatorname{span}(v_1,v_2)$ is zero. The closest combination is therefore

$$
0\cdot v_1+0\cdot v_2=0.
$$

Picture the standard basis: the point in the $xy$-plane closest to the $z$-axis is the origin.

## Type six: Markov matrices and steady state

### The matrix and its eigenvalues

The lecture's matrix has three structural properties:

- every column is nonnegative and sums to $1$ (Markov);
- column one plus column two equals twice column three, so the columns are dependent and the matrix is singular;
- the trace is $0.8$.

The eigenvalues follow immediately:

- Markov forces $1$ to be an eigenvalue;
- singularity forces $0$;
- the trace is the sum, so the third is $0.8-1-0=-0.2$.

> Background: the recorded digits are noisy. One matrix satisfying every stated property is
> $$A=\begin{bmatrix}0.2&0.4&0.3\\0.4&0.2&0.3\\0.4&0.4&0.4\end{bmatrix}.$$
> Its columns sum to $1$, column one plus column two equals $(0.6,0.6,0.8)=2(0.3,0.3,0.4)$, and its trace is $0.8$.

### Steady state

Start from $u_0=(0,10,0)$ and iterate $u_k=A^ku_0$. Expand the initial vector in the eigenbasis:

$$
u_k=c_1\lambda_1^kx_1+c_2\lambda_2^kx_2+c_3\lambda_3^kx_3.
$$

As $k\to\infty$, the terms with $\lambda_1=0$ and $\lambda_3=-0.2$ vanish, leaving only the $\lambda_2=1$ term:

$$
u_\infty=c_2x_2.
$$

Solving $(A-I)x=0$ gives

$$
x_2=\begin{bmatrix}3\\3\\4\end{bmatrix}.
$$

### Why the coefficient is one

A Markov matrix preserves total population:

$$
\mathbf 1^{\mathsf T}Au=\mathbf 1^{\mathsf T}u.
$$

For an eigenvector $x_i$ with $\lambda_i\neq1$,

$$
\mathbf 1^{\mathsf T}Ax_i=\lambda_i\mathbf 1^{\mathsf T}x_i=\mathbf 1^{\mathsf T}x_i,
$$

so $(\lambda_i-1)\mathbf 1^{\mathsf T}x_i=0$, hence $\mathbf 1^{\mathsf T}x_i=0$: eigenvectors for other eigenvalues have zero component sum.

The initial vector sums to $10$, and $x_2$ also sums to $10$, so $c_2=1$. The steady state is

$$
u_\infty=\begin{bmatrix}3\\3\\4\end{bmatrix}.
$$

## Type seven: construct a matrix with given properties

| Requirement | Example | Reason |
| --- | --- | --- |
| Projection onto the line through $a=(4,-3)$ | $\dfrac{1}{25}\begin{bmatrix}16&-12\\-12&9\end{bmatrix}$ | $P=\dfrac{aa^{\mathsf T}}{a^{\mathsf T}a}$ |
| Eigenvalues $0,3$, eigenvectors $(1,2),(2,1)$ | $\begin{bmatrix}4&-2\\2&-1\end{bmatrix}$ | $A=S\Lambda S^{-1}$ |
| Not expressible as $B^{\mathsf T}B$ | $\begin{bmatrix}0&1\\0&0\end{bmatrix}$ | $B^{\mathsf T}B$ is always symmetric |
| Orthogonal eigenvectors but not symmetric | $\begin{bmatrix}0&-1\\1&0\end{bmatrix}$ | Skew-symmetric matrices qualify |

The third point: $B^{\mathsf T}B$ is always symmetric, so any non-symmetric matrix is impossible.

The fourth point: orthogonal eigenvectors are not exclusive to symmetric matrices. Skew-symmetric and orthogonal matrices also satisfy $AA^{\mathsf T}=A^{\mathsf T}A$, and their eigenvectors can be chosen orthogonal, possibly over the complex numbers.

## Type eight: four questions about one least-squares problem

### The setup

$$
A=\begin{bmatrix}1&0\\1&1\\1&2\end{bmatrix},\qquad
b=\begin{bmatrix}3\\4\\1\end{bmatrix}.
$$

### 1. The least-squares solution

$$
A^{\mathsf T}A=\begin{bmatrix}3&3\\3&5\end{bmatrix},\qquad
A^{\mathsf T}b=\begin{bmatrix}8\\6\end{bmatrix}.
$$

Solving the normal equations:

$$
\hat x=\begin{bmatrix}11/3\\-1\end{bmatrix}.
$$

### 2. The projection

The projection is the optimal combination:

$$
p=A\hat x=\frac{11}{3}\begin{bmatrix}1\\1\\1\end{bmatrix}
-\begin{bmatrix}0\\1\\2\end{bmatrix}
=\begin{bmatrix}11/3\\8/3\\5/3\end{bmatrix}.
$$

### 3. The corresponding line

The two columns correspond to an intercept and a slope, so this fits

$$
y=\frac{11}{3}-t.
$$

At $t=0,1,2$ the line gives $11/3,\,8/3,\,5/3$, minimizing the squared error against $3,4,1$.

### 4. When is the least-squares solution zero

Find a nonzero $b$ whose optimal combination is the zero vector. This is equivalent to $b$ being orthogonal to the whole column space.

The column space is spanned by $(1,1,1)$ and $(0,1,2)$. Take

$$
b'=\begin{bmatrix}1\\-2\\1\end{bmatrix},
$$

which satisfies

$$
\begin{bmatrix}1&1&1\end{bmatrix}b'=0,\qquad
\begin{bmatrix}0&1&2\end{bmatrix}b'=0.
$$

So $b'$ is orthogonal to both columns, its projection is zero, and the least-squares solution is zero.

## One thread through the whole course

Put together, the problems repeat a single pattern:

1. **Rank governs everything**: solvability, uniqueness, and the kind of inverse all follow from how $r$ compares with $m$ and $n$.
2. **The four subspaces are the coordinate system**: the null space controls uniqueness, the column space controls solvability, and the row and left null spaces control projection and least squares.
3. **Matrix multiplication is a combination of columns**: this is where every computation starts.
4. **Eigenvalues describe long-term behavior**: exponentials for differential equations, powers for Markov chains.
5. **Special matrices have special spectra**: symmetric (real, orthogonal eigenvectors), skew-symmetric (purely imaginary), orthogonal (unit modulus), projection ($0$ or $1$), Markov ($1$ and no larger).
6. **SVD reduces any matrix to diagonal form**: pseudoinverses, least squares, and bases for all four subspaces follow from it.

## Check your understanding

**1. How do "one right side unsolvable, another uniquely solvable" imply $r=n<m$?**

Reference answer: The right side is a three-dimensional vector, so $m=3$. The existence of an unsolvable right side $Ax=(1,0,0)^{\mathsf T}$ means $A$ cannot be solved for every $\mathbf b\in\mathbb R^3$; the column space is not all of $\mathbb R^3$, hence $r<m$, i.e. $r<3$. On the other hand $Ax=(0,1,0)^{\mathsf T}$ has exactly one solution, so the null space is trivial (otherwise adding any null-space vector would produce more solutions) and the columns are independent, $r=n$. Combining gives $r=n<3$. Here $n$ may be $1$ or $2$, but it must equal $r$.

**2. Why is $A^{\mathsf T}A$ invertible while $AA^{\mathsf T}$ is not positive definite?**

Reference answer: $A$ is $3\times n$ with $r=n$, so its columns are independent and $A^{\mathsf T}A$ is $n\times n$ of full rank, hence invertible; it is even positive definite, since $x^{\mathsf T}A^{\mathsf T}Ax=\lVert Ax\rVert^2>0$ for $x\ne0$. But $AA^{\mathsf T}$ is $3\times3$ with rank $r=n<3$, so it is singular, has a zero eigenvalue, and is at most positive semidefinite — never positive definite. The two products differ in both size and rank and cannot be treated interchangeably; they are both invertible only when $A$ is square and invertible.

**3. If $v_1-v_2+v_3=0$, is the solution of $Ax=v_1$ unique? Why?**

Reference answer: No. The condition says $Ac=v_1-v_2+v_3=0$ for $c=(1,-1,1)^{\mathsf T}$, so $c\in N(A)$ and $c\ne0$ — the null space is nontrivial. The system $Ax=v_1$ has the obvious solution $x=e_1=(1,0,0)^{\mathsf T}$ (the coefficient on the first column); then for every $k$,
$$
A(e_1+kc)=v_1+k\cdot0=v_1,
$$
giving infinitely many solutions. Uniqueness is equivalent to a trivial null space, which fails here.

**4. Why do eigenvectors of a Markov matrix for eigenvalues other than $1$ have zero component sum, and how does that determine the steady-state coefficient?**

Reference answer: A Markov matrix has columns summing to $1$, i.e. $\mathbf 1^{\mathsf T}A=\mathbf 1^{\mathsf T}$. For $Ax_i=\lambda_ix_i$, left-multiply by $\mathbf 1^{\mathsf T}$:
$$
\lambda_i\mathbf 1^{\mathsf T}x_i=\mathbf 1^{\mathsf T}Ax_i=\mathbf 1^{\mathsf T}x_i,
$$
so $(\lambda_i-1)\mathbf 1^{\mathsf T}x_i=0$. If $\lambda_i\ne1$, then $\mathbf 1^{\mathsf T}x_i=0$: the components sum to zero. To get the steady-state coefficient, sum the components on both sides of $u_0=\sum c_ix_i$: every non-$1$ term contributes zero, leaving $c_2\mathbf 1^{\mathsf T}x_2=\mathbf 1^{\mathsf T}u_0$, so $c_2=\mathbf 1^{\mathsf T}u_0/\mathbf 1^{\mathsf T}x_2=10/10=1$. This avoids solving for the coefficients directly.

**5. What is the exact condition for the least-squares solution to be zero, and how do you construct such a $b$?**

Reference answer: The least-squares solution satisfies the normal equations $A^{\mathsf T}A\hat x=A^{\mathsf T}b$, so $\hat x=0$ exactly when $A^{\mathsf T}b=0$, i.e. $b$ is orthogonal to every column of $A$ — equivalently $b\in N(A^{\mathsf T})$ (the left null space), or $b\perp C(A)$. To construct one, take a nonzero left-null-space vector: here the columns of $A$ are $(1,1,1)^{\mathsf T}$ and $(0,1,2)^{\mathsf T}$, so solve $b_1+b_2+b_3=0$ and $b_2+2b_3=0$; setting $b_3=1$ gives $b_2=-2$, $b_1=1$, so $b'=(1,-2,1)^{\mathsf T}$. Then the projection $p=A\hat x=0$ and the least-squares solution is $\hat x=0$.

## Closing

The power of linear algebra is that different problems share the same structure. Rank, subspaces, eigenvalues, and factorizations — master those four, and the computations are just their unfolding.
