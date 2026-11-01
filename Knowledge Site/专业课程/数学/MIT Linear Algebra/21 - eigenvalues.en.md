---
slug: "21-eigenvalues"
title: "Eigenvalues and Eigenvectors: Directions the Matrix Leaves Alone"
summary: "Four examples — projection, permutation, rotation, triangular — build intuition; then det(A−λI)=0 finds eigenvalues, and three failure modes appear: complex values, repeats, and too few eigenvectors."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "eigenvalues"
  - "eigenvectors"
  - "determinant"
sources:
  - kind: "video"
    title: "21. Eigenvalues and Eigenvectors"
    url: "https://www.youtube.com/watch?v=cdZnhQjJu4I"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## What an eigenvector asks

A matrix is a function on vectors: input $x$, output $Ax$. Most vectors change direction. A few keep their direction and only change length — those are the **eigenvectors**:

$$
Ax = \lambda x
$$

The scalar $\lambda$ is the **eigenvalue**. It may be negative or zero, or even complex; "same direction" allows reversal.

This equation is not $Ax=b$: $\lambda$ and $x$ are both unknown, and they multiply. Elimination does not apply directly, so a different idea is needed.

### What a zero eigenvalue means

If $\lambda=0$, then $Ax=0$. A zero eigenvalue therefore exists exactly when $A$ is singular, and its eigenvectors are the null space. "Determinant zero" and "a zero eigenvalue" are the same statement.

## Timeline

| Time | Topic |
| --- | --- |
| 0:07 | The big picture: eigenvalues and eigenvectors |
| 3:10 | What it means for $Ax$ to be parallel to $x$ |
| 6:43 | Testing whether a vector is an eigenvector |
| 9:43 | Projection: nullspace and column-space directions |
| 12:50 | Permutation and reflection examples |
| 15:57 | A direction with $\lambda=-1$ |
| 19:15 | The method: solve $\det(A-\lambda I)=0$ |
| 22:25 | Eigenvectors form whole lines |
| 25:32 | The 2×2 characteristic polynomial |
| 31:34 | Shifting by $3I$ adds 3 to the eigenvalues |
| 34:40 | Trace and determinant give the sum and product |
| 37:49 | A $90^\circ$ rotation has complex eigenvalues |
| 41:02 | Complex eigenvalues come in conjugate pairs |
| 47:05 | Repeated eigenvalues and degenerate cases |
| 50:11 | An example of a degenerate matrix |


## Four examples for intuition

### Projection matrix

Let $P$ project onto a plane.

- A vector already in the plane is unchanged: $Px=x$, so $\lambda=1$, and the whole plane consists of eigenvectors.
- A vector perpendicular to the plane projects to zero: $Px=0$, so $\lambda=0$, and the normal direction supplies eigenvectors.

The eigenvalues are only $1$ and $0$, consistent with $P^2=P$, which forces $\lambda^2=\lambda$.

### Permutation matrix

$$
A=\begin{bmatrix}0&1\\1&0\end{bmatrix}
$$

It swaps the two components.

- $x=(1,1)$: unchanged, so $\lambda=1$.
- $x=(-1,1)$: becomes $(1,-1)=-x$, so $\lambda=-1$.

The two eigenvectors are perpendicular. The matrix is symmetric, and that is not a coincidence.

### Rotation matrix

Rotate counterclockwise by $90^\circ$:

$$
Q=\begin{bmatrix}0&-1\\1&0\end{bmatrix}
$$

Geometrically, no nonzero vector can keep its direction after a quarter turn, so there should be no real eigenvector. Algebraically,

$$
\det(Q-\lambda I)
=
\begin{vmatrix}-\lambda&-1\\1&-\lambda\end{vmatrix}
=
\lambda^2+1
$$

so $\lambda=\pm i$. **A real matrix can have complex eigenvalues**, and they occur in conjugate pairs. Here $Q^T=-Q$: the matrix is antisymmetric, and such matrices have purely imaginary eigenvalues.

### Triangular matrix

$$
A=\begin{bmatrix}3&1\\0&3\end{bmatrix}
$$

The eigenvalues can be read directly off the diagonal: $\lambda_1=\lambda_2=3$. But for eigenvectors,

$$
A-3I=\begin{bmatrix}0&1\\0&0\end{bmatrix}
$$

whose null space is only one-dimensional, spanned by $(1,0)$. There is **only one independent eigenvector**, not enough to span the plane. A repeated eigenvalue can create a shortage.

## The method: find $\lambda$ first, then $x$

### The key rearrangement

Move everything to one side:

$$
(A-\lambda I)x=0
$$

For a nonzero $x$ to exist, $A-\lambda I$ must be singular, so

$$
\det(A-\lambda I)=0
$$

This is the **characteristic equation**, a polynomial of degree $n$ in $\lambda$ with $n$ roots counted with multiplicity.

### The convenient $2 \times 2$ form

For a $2\times2$ matrix,

$$
\det(A-\lambda I)=\lambda^2-(\operatorname{tr}A)\lambda+\det A
$$

Hence

$$
\lambda_1+\lambda_2=\operatorname{tr}A, \qquad \lambda_1\lambda_2=\det A
$$

Both identities hold for every $n$: the eigenvalues sum to the trace and multiply to the determinant.

### A full example

$$
A=\begin{bmatrix}3&1\\1&3\end{bmatrix}
$$

The characteristic polynomial:

$$
\det(A-\lambda I)
=
\begin{vmatrix}3-\lambda&1\\1&3-\lambda\end{vmatrix}
=
(3-\lambda)^2-1
=
\lambda^2-6\lambda+8
$$

Factor:

$$
(\lambda-4)(\lambda-2)=0
$$

So $\lambda_1=4$ and $\lambda_2=2$. Check: the sum $4+2=6$ is the trace, and the product $8$ is the determinant.

Now the eigenvectors.

For $\lambda=4$:

$$
A-4I=\begin{bmatrix}-1&1\\1&-1\end{bmatrix}
$$

Its null space is spanned by $(1,1)$.

For $\lambda=2$:

$$
A-2I=\begin{bmatrix}1&1\\1&1\end{bmatrix}
$$

Its null space is spanned by $(-1,1)$ (or $(1,-1)$).

The two eigenvectors are perpendicular. The matrix is symmetric, and both eigenvalues are real.

## Three structural facts

### Adding $cI$ shifts eigenvalues

If $Ax=\lambda x$, then

$$
(A+cI)x=Ax+cx=(\lambda+c)x
$$

The eigenvectors are unchanged and every eigenvalue increases by $c$. In the lecture, adding $3I$ to the permutation matrix $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ produces $\begin{bmatrix}3&1\\1&3\end{bmatrix}$: the eigenvalues move from $1,-1$ to $4,2$, while the eigenvectors stay $(1,1)$ and $(-1,1)$.

### But $A+B$ does not work that way

A common mistake: given $Ax=\lambda x$ and $By=\alpha y$, conclude that $A+B$ has eigenvalue $\lambda+\alpha$. This is **false**, because $x$ is generally not an eigenvector of $B$. It works only when $B$ is a multiple of $I$.

Likewise, the eigenvalues of $AB$ are generally not the products of the eigenvalues.

### The trace and determinant identities always hold

Whatever the matrix, symmetric or not, repeated eigenvalues or not:

$$
\sum_i \lambda_i = \operatorname{tr}A, \qquad \prod_i \lambda_i = \det A
$$

These are the first check on any eigenvalue computation.

## Three "bad cases"

| Case | Example | Consequence |
| --- | --- | --- |
| Complex eigenvalues | $90^\circ$ rotation | No real eigendirection; values come in conjugate pairs |
| Repeated eigenvalues | $\begin{bmatrix}3&1\\0&3\end{bmatrix}$ | The eigenspace may be one-dimensional |
| Too few eigenvectors | Same example | Cannot be diagonalized; the next lecture addresses it |

Symmetric matrices are the good case: real eigenvalues and orthogonal eigenvectors. Antisymmetric matrices are the opposite extreme: purely imaginary eigenvalues. General matrices sit in between.

## Core review

- $Ax=\lambda x$: vectors whose direction survives the matrix.
- A zero eigenvalue is equivalent to singularity.
- Method: solve $\det(A-\lambda I)=0$ for $\lambda$, then $(A-\lambda I)x=0$ for $x$.
- For $2\times2$: $\lambda^2-\operatorname{tr}(A)\lambda+\det A=0$.
- Eigenvalues sum to the trace and multiply to the determinant.
- Adding $cI$ shifts eigenvalues and preserves eigenvectors; $A+B$ generally does not.
- Real matrices can have complex eigenvalues; repeated eigenvalues can leave too few eigenvectors.

## Common misconceptions

1. **Treating $Ax=\lambda x$ as an ordinary system to eliminate.** Two unknowns multiply; eliminate $x$ first.
2. **Expecting a unique eigenvector.** Eigenvectors fill a space; any nonzero multiple works.
3. **Missing the geometry of a zero eigenvalue.** It is the null space.
4. **Adding eigenvalues of $A$ and $B$.** Only valid when one matrix is a multiple of $I$.
5. **Assuming a real matrix has real eigenvalues.** The rotation matrix is the counterexample.

## Check your understanding

**1. Why can a projection matrix only have eigenvalues 0 and 1?**

Reference answer: A projection satisfies $P^2=P$. Suppose $Px=\lambda x$ with $x\ne0$. Apply $P$ again:
$$
P^2x=P(\lambda x)=\lambda Px=\lambda^2 x .
$$
But $P^2x=Px=\lambda x$, so $\lambda^2x=\lambda x$. Since $x\ne0$, $\lambda^2=\lambda$, i.e. $\lambda(\lambda-1)=0$, hence $\lambda=0$ or $\lambda=1$. Geometrically, vectors in the target plane stay put ($\lambda=1$) and the normal direction collapses to zero ($\lambda=0$).

**2. Use the trace and determinant to verify the eigenvalues of $\begin{bmatrix}3&1\\1&3\end{bmatrix}$.**

Reference answer: Trace $=3+3=6$ and determinant $=9-1=8$. The characteristic polynomial is
$$
\lambda^2-(\operatorname{tr}A)\lambda+\det A=\lambda^2-6\lambda+8=(\lambda-2)(\lambda-4),
$$
so $\lambda=2,4$. Check: the sum $2+4=6$ equals the trace and the product $2\cdot4=8$ equals the determinant, matching the text.

**3. Why does a $90^\circ$ rotation have no real eigenvector?**

Reference answer: Geometrically, $Q\mathbf{x}$ is perpendicular to $\mathbf{x}$ and of the same length, so a nonzero vector can never be a real multiple of its image. Algebraically,
$$
\det(Q-\lambda I)=\begin{vmatrix}-\lambda&-1\\1&-\lambda\end{vmatrix}=\lambda^2+1,
$$
and $\lambda^2+1=0$ has no real solution, only $\lambda=\pm i$. Since $Q$ is antisymmetric ($Q^T=-Q$), its eigenvalues must be purely imaginary or zero.

**4. A $3\times3$ matrix has eigenvalues $2,2,5$. What are its trace and determinant?**

Reference answer: Trace equals the sum of the eigenvalues: $2+2+5=9$. Determinant equals their product counted with multiplicity: $2\cdot2\cdot5=20$. Both identities hold for every matrix and are the first check when computing.

**5. Why does $\begin{bmatrix}3&1\\0&3\end{bmatrix}$ have only a one-dimensional eigenspace?**

Reference answer: The only eigenvalue is $\lambda=3$ (double). Solve $(A-3I)x=0$:
$$
A-3I=\begin{bmatrix}0&1\\0&0\end{bmatrix},
$$
whose only equation is $x_2=0$ with $x_1$ free, so the nullspace is $\operatorname{span}\{(1,0)\}$, of dimension 1. The algebraic multiplicity is 2 but the geometric multiplicity is 1; one independent eigenvector is missing, so the matrix is not diagonalizable.

## How this connects

This lecture defines eigenvalues and eigenvectors and shows how to compute them. The next discusses diagonalization: when there are enough independent eigenvectors, $A=S\Lambda S^{-1}$ makes powers and long-term behavior easy to read. The shortage caused by repeated eigenvalues leads to Jordan form.
