---
slug: "32-quiz-3-review"
title: "Quiz 3 Review: Eigenvalue Topics Organized by Problem Type"
summary: "Chapter six compressed into four reusable problem types: differential equations and skew-symmetric matrices, inferring matrix properties from spectrum, SVD in both directions, and symmetric orthogonal matrices."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "eigenvalues"
  - "svd"
  - "exam-review"
sources:
  - kind: "video"
    title: "32. Quiz 3 Review"
    url: "https://www.youtube.com/watch?v=HgC1l_6ySkc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## What this review covers

The third quiz covers Chapter 6: eigenvalues and eigenvectors, systems of differential equations, symmetric matrices, positive definiteness, similar matrices, and SVD. Chapter 7 on linear transformations appears only on the final.

The review does not restate definitions. It works old exam problems to show **what to look for first given a certain condition**. Below, the problems are grouped by type.

## Type one: differential equations and skew-symmetric matrices

### Problem shape

Given a $3\times3$ matrix $A$, find the general solution of $\dfrac{du}{dt}=Au$, then describe its long-term behavior and periodicity.

### Solution order

1. **Check whether $A$ is singular.** Dependent rows or columns immediately give an eigenvalue $0$.
2. **Find the remaining eigenvalues** from $\det(A-\lambda I)=0$.
3. **Write the general solution:**

$$
u(t)=c_1e^{\lambda_1t}x_1+c_2e^{\lambda_2t}x_2+c_3e^{\lambda_3t}x_3.
$$

4. **Match the initial condition.**

### The worked example

$$
A=\begin{bmatrix}
0&-1&0\\
1&0&-1\\
0&1&0
\end{bmatrix}.
$$

The first and third rows are negatives of each other, so the determinant is zero and $\lambda_1=0$.

The matrix satisfies

$$
A^{\mathsf T}=-A,
$$

so it is **skew-symmetric**. Eigenvalues of a skew-symmetric matrix are purely imaginary, so the other two have the form $\pm i\omega$.

Computing directly:

$$
\det(A-\lambda I)
=-\lambda(\lambda^2+2).
$$

Hence

$$
\lambda_1=0,\qquad \lambda_2=i\sqrt2,\qquad \lambda_3=-i\sqrt2.
$$

In the solution, $e^{0t}=1$ neither grows nor decays; $e^{\pm i\sqrt2\,t}$ has magnitude one and moves around the unit circle. The solution **neither blows up nor decays**; it oscillates.

### Periodicity

If some $T>0$ makes every $e^{\lambda_iT}=1$, the solution returns to its initial value. For $\lambda=i\sqrt2$:

$$
e^{i\sqrt2\,T}=1
\iff \sqrt2\,T=2\pi
\iff T=\pi\sqrt2.
$$

This is why skew-symmetric matrices describe conservative oscillation: when $A^{\mathsf T}=-A$, the derivative of $\lVert u(t)\rVert^2$ is zero.

> Background: real solutions are obtained by combining $e^{\pm i\omega t}$ into $\cos\omega t$ and $\sin\omega t$, consistent with purely imaginary eigenvalues.

### The matrix exponential

The solution can also be written

$$
u(t)=e^{At}u(0).
$$

If $A$ is diagonalizable, $A=S\Lambda S^{-1}$, then

$$
e^{At}=Se^{\Lambda t}S^{-1},
$$

where $e^{\Lambda t}$ is diagonal with entries $e^{\lambda_it}$. The formula requires enough eigenvectors; it does not apply to non-diagonalizable matrices.

## Type two: inferring matrix properties from spectrum

### Problem shape

A $3\times3$ matrix is given by its eigenvalues (one containing a parameter $c$) and its eigenvectors. Ask: diagonalizable? symmetric? positive definite? Markov? Is $\frac12A$ a projection?

### The decision chain

**Enough eigenvectors determine diagonalizability.** The three given eigenvectors are orthogonal, hence independent. So the matrix is diagonalizable for every $c$.

**Orthogonal eigenvectors with all-real eigenvalues means symmetric.** Since the eigenvectors are already orthogonal, any real $c$ makes the matrix symmetric.

**Positive definiteness requires all eigenvalues positive.** One eigenvalue is zero, so the matrix is never positive definite; if $c\ge0$, it is at most positive semidefinite.

**A Markov matrix has $|\lambda|\le1$ and an eigenvalue equal to $1$.** Here one eigenvalue is $2$, so it is never Markov.

**A projection matrix has eigenvalues only $0$ or $1$, and satisfies $P^2=P$, $P^{\mathsf T}=P$.** Asking whether $\frac12A$ is a projection means asking whether halving the eigenvalues leaves only $0$ and $1$. So $c=0$ or $c=2$.

### Reusable table

| Question | What to check |
| --- | --- |
| Diagonalizable | Are there $n$ independent eigenvectors? |
| Symmetric | Real eigenvalues and orthogonally choosable eigenvectors |
| Positive definite | Every eigenvalue $>0$ |
| Positive semidefinite | Every eigenvalue $\ge0$ |
| Markov | $|\lambda|\le1$, with $1$ an eigenvalue |
| Projection | Eigenvalues only $0,1$, and the matrix symmetric |

## Type three: SVD, forward and backward

### Forward: matrix to factorization

1. Compute $A^{\mathsf T}A$.
2. Find its eigenvalues and eigenvectors; normalize to get $V$ and $\sigma_i=\sqrt{\lambda_i}$.
3. Get $U$ from $u_i=\dfrac{Av_i}{\sigma_i}$ — this is also the correct way to fix signs.
4. One may instead use eigenvectors of $AA^{\mathsf T}$, but **the signs must be checked against $Av_i=\sigma_iu_i$**.

### Backward: factorization to matrix

- If $\Sigma=\operatorname{diag}(3,2)$, both singular values are nonzero: the matrix is invertible with rank $2$.
- If $\Sigma=\operatorname{diag}(3,0)$, the matrix is singular with rank $1$; the null space is spanned by $v_2$ and the left null space by $u_2$.
- A negative "singular value" is not an SVD at all — singular values are nonnegative by definition.

### Where the sign problem comes from

$A^{\mathsf T}A$ determines each column of $V$ only up to sign. Once a sign is chosen, $U$ must be fixed by

$$
Av_i=\sigma_iu_i,
$$

not chosen independently as eigenvectors of $AA^{\mathsf T}$. Otherwise $U\Sigma V^{\mathsf T}$ may differ by an overall sign.

## Type four: symmetric and orthogonal matrices

### Problem shape

Let $A$ be both symmetric and orthogonal. Decide several statements and prove that $\frac12(A+I)$ is a projection.

### The eigenvalue range

- Symmetric implies real eigenvalues.
- Orthogonal implies eigenvalues of magnitude $1$.

Together:

$$
\lambda\in\{1,-1\}.
$$

### Statement by statement

| Statement | Verdict | Reason |
| --- | --- | --- |
| Must be positive definite | False | An eigenvalue $-1$ is possible |
| Has no repeated eigenvalues | False | In dimension above two, repetition is forced |
| Diagonalizable | True | Symmetric matrices always have a full orthogonal eigenbasis |
| Nonsingular | True | An orthogonal matrix has determinant $\pm1$ |

### Proving $\frac12(A+I)$ is a projection

A projection needs two properties: symmetry and idempotence.

Symmetry is immediate. For the square:

$$
\left(\frac{A+I}{2}\right)^2
=\frac{A^2+2A+I}{4}.
$$

Because $A$ is orthogonal, $A^{\mathsf T}A=I$; because it is symmetric, $A^{\mathsf T}=A$. Hence

$$
A^2=A^{\mathsf T}A=I.
$$

Substituting:

$$
\frac{I+2A+I}{4}=\frac{A+I}{2}.
$$

So it is indeed a projection.

> Background: eigenvalues give a shorter view. The eigenvalues of $A$ are $\pm1$, so those of $A+I$ are $0$ or $2$, and halving gives $0$ or $1$ — exactly the spectrum of a projection.

## A checklist for the quiz

1. For a differential equation, first ask whether the matrix is singular and whether it is symmetric or skew-symmetric.
2. On seeing "orthogonal eigenvectors", think of symmetric matrices, projections, and SVD.
3. On seeing "positive definite", check for zero or negative eigenvalues before pivots or determinants.
4. For SVD, compute $A^{\mathsf T}A$ first, then fix signs with $Av_i=\sigma_iu_i$.
5. For "symmetric and orthogonal", the eigenvalues can only be $\pm1$.

## Check your understanding

1. Why are the eigenvalues of a skew-symmetric matrix purely imaginary, and why is the solution's norm constant?
2. If a matrix has $n$ orthogonal eigenvectors, does that alone imply symmetry? What else is needed?
3. Why does a negative number in $\Sigma$ prove the factorization is wrong?
4. If $A$ is symmetric and orthogonal, what are the eigenvalues of $A+I$, and what is the rank of $\frac12(A+I)$?
5. Given $A=U\Sigma V^{\mathsf T}$, how do you read $U$ directly from $A$ and $V$ without diagonalizing $AA^{\mathsf T}$?

## How this connects to the course

This review drills the problem types of Chapter 6. The next lecture treats left inverses, right inverses, and the pseudoinverse, using SVD to "invert" non-square matrices; the final lecture synthesizes the course and brings Chapter 7's linear transformations into the final exam.
