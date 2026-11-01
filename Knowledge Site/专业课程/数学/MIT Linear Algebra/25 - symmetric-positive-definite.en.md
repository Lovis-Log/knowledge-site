---
slug: "25-symmetric-positive-definite"
title: "Symmetric Matrices and Positive Definiteness: The Spectral Theorem and Three Tests"
summary: "A symmetric matrix has real eigenvalues and can be orthogonally diagonalized, so A = QΛQᵀ; positive definiteness further requires positive eigenvalues, pivots, and every leading minor."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "symmetric-matrices"
  - "positive-definite"
  - "spectral-theorem"
sources:
  - kind: "video"
    title: "25. Symmetric Matrices and Positive Definiteness"
    url: "https://www.youtube.com/watch?v=UCc9q_cAhho"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## Why symmetric matrices matter most

A symmetric matrix satisfies

$$
A=A^T
$$

Two facts follow:

1. **All eigenvalues are real.**
2. **Eigenvectors can be chosen mutually orthogonal.**

Strictly, the second should read "can be chosen". With distinct eigenvalues each eigenspace is a line, and those lines are automatically perpendicular. With a repeated eigenvalue the eigenspace is a plane or larger, and an orthogonal basis can be selected inside it. The identity is the extreme case: every vector is an eigenvector, yet an orthonormal basis still exists.

### The spectral theorem

Normalize the orthogonal eigenvectors to unit length and put them in

$$
Q=\begin{bmatrix}q_1&\cdots&q_n\end{bmatrix}
$$

Then $Q^TQ=I$, so $Q^{-1}=Q^T$, and diagonalization becomes

$$
A=Q\Lambda Q^T
$$

This is the **spectral theorem** (the principal axis theorem in mechanics). Any symmetric matrix becomes diagonal under a change of basis by an orthogonal matrix, whose inverse is its transpose.

### Expansion into projections

Multiply out $A=Q\Lambda Q^T$ by columns times rows:

$$
A=\lambda_1q_1q_1^T+\lambda_2q_2q_2^T+\cdots+\lambda_nq_nq_n^T
$$

Each $q_iq_i^T$ is the projection onto the line through $q_i$, since $q_i$ is a unit vector. Therefore:

> **One-sentence summary:** A symmetric matrix is a weighted sum of mutually perpendicular projection matrices, with the eigenvalues as weights.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The theme: symmetric matrices have real eigenvalues and orthogonal eigenvectors |
| 1:21 | A counterexample: rotation matrices can have complex eigenvalues |
| 2:36 | The identity is the extreme case where every vector is an eigenvector |
| 5:45 | Eigenvectors can be chosen orthonormal, so $S^{\mathsf T}=S^{-1}$ |
| 7:42 | Spectral decomposition $A=S\Lambda S^{-1}=Q\Lambda Q^{\mathsf T}$ |
| 9:00 | Proving that eigenvalues of a symmetric matrix are real |
| 17:11 | Length and inner product for complex eigenvectors |
| 23:15 | Conclusion: every symmetric matrix is orthogonally diagonalizable |
| 25:23 | The rank-one form of the spectral theorem |
| 29:07 | First test for positive definiteness: all pivots positive |
| 35:31 | Definition of a positive definite matrix, with examples |
| 37:21 | The 2 by 2 case: leading entry and determinant both positive |
| 38:02 | The product of the pivots equals the determinant |
| 40:40 | All leading principal minors positive |
| 42:50 | Positive semidefinite: eigenvalues allowed to be zero |

## Why the eigenvalues are real

Let $Ax=\lambda x$, temporarily allowing $\lambda$ and $x$ to be complex. Conjugate both sides:

$$
A\bar x=\bar\lambda\bar x
$$

(Here $A$ is real, so $\bar A=A$.) Transpose:

$$
\bar x^T A^T=\bar\lambda\bar x^T
$$

Using symmetry $A^T=A$:

$$
\bar x^T A=\bar\lambda\bar x^T
$$

Multiply on the right by $x$:

$$
\bar x^TAx=\bar\lambda\bar x^Tx
$$

On the other hand, multiply the original equation on the left by $\bar x^T$:

$$
\bar x^TAx=\lambda\bar x^Tx
$$

The left sides agree, so the right sides do too:

$$
(\lambda-\bar\lambda)\bar x^Tx=0
$$

The key step: for a nonzero complex vector,

$$
\bar x^Tx=|x_1|^2+|x_2|^2+\cdots+|x_n|^2>0
$$

Hence $\lambda=\bar\lambda$, which means $\lambda$ is real.

### The complex generalization

For a complex matrix, transposition must be paired with conjugation. Define the **Hermitian transpose**

$$
A^H=\bar A^T
$$

The "good matrix" condition becomes $A^H=A$ (a Hermitian matrix), which again gives real eigenvalues and orthogonal eigenvectors. Real symmetric matrices are the special case over the reals.

## Pivots and eigenvalues have the same signs

This is special to symmetric matrices: **the number of positive pivots equals the number of positive eigenvalues**.

It does not say pivots equal eigenvalues. For a $2\times2$ matrix the pivots are $a$ and $\det A/a$, while the eigenvalues are roots of a quadratic and usually irrational.

The practical value: finding fifty eigenvalues of a $50\times50$ matrix numerically is slow and unstable, while elimination for pivots is fast and stable. Knowing the sign counts, you can also shift by $7I$, count pivots again, and learn how many eigenvalues lie above and below 7.

The pivot product equals the eigenvalue product because both equal the determinant.

## Positive definite matrices

### Definition

A **positive definite** matrix is symmetric with all eigenvalues positive:

$$
\lambda_i>0 \quad \text{for all } i
$$

### Three equivalent tests

| Test | Statement |
| --- | --- |
| Eigenvalues | Every $\lambda_i>0$ |
| Pivots | Every pivot is $>0$ |
| Leading minors | Every $k\times k$ determinant from the top-left corner is $>0$ |

The word "every" in the third test cannot be dropped. Checking only the full determinant is not enough.

### A counterexample

$$
\begin{bmatrix}-1&0\\0&-3\end{bmatrix}
$$

Its determinant is $3>0$, but its eigenvalues are $-1,-3$ and its pivots are negative. It is not positive definite. The failure is visible in the first leading minor, $-1<0$.

### A positive example

$$
A=\begin{bmatrix}5&3\\3&2\end{bmatrix}
$$

The pivots:

- the first pivot is $5$;
- the second follows from "pivot product equals determinant": $\det A=10-9=1$, so the second pivot is $1/5$.

Both pivots are positive, so both eigenvalues are positive. Check:

$$
\det(A-\lambda I)=\lambda^2-7\lambda+1
$$

so

$$
\lambda=\frac{7\pm\sqrt{45}}{2}
$$

and both are positive.

> **Background:** In differential equations and optimization, positive definiteness corresponds to an energy function that curves upward: the quadratic form $x^TAx$ is positive for every nonzero $x$, so the equilibrium is a stable minimum.

## Where three threads meet

This lecture ties together the course's three stages:

- **Week one**: elimination and pivots;
- **Middle**: determinants and leading minors;
- **Now**: eigenvalues and signs.

For symmetric matrices these three descriptions are equivalent: all pivots positive $\iff$ all leading minors positive $\iff$ all eigenvalues positive.

## Core review

- Symmetric matrices have real eigenvalues and orthogonal eigenvectors, giving $A=Q\Lambda Q^T$.
- The spectral theorem also reads $A=\sum\lambda_iq_iq_i^T$, a weighted sum of projections.
- The proof of real eigenvalues rests on $\bar x^Tx>0$.
- The complex analogues are Hermitian matrices and unitary matrices.
- For symmetric matrices, positive pivot count equals positive eigenvalue count.
- Positive definite $\iff$ positive eigenvalues $\iff$ positive pivots $\iff$ all leading minors positive.

## Common misconceptions

1. **Thinking eigenvectors are automatically orthogonal.** They can be chosen orthogonal; repeats require a choice.
2. **Writing $A=Q^T\Lambda Q$.** The order matches $A=S\Lambda S^{-1}$.
3. **Using a positive determinant to conclude positive definiteness.** Every leading minor must be checked.
4. **Equating pivots with eigenvalues.** Only the sign counts match.
5. **Using the plain transpose instead of the Hermitian transpose in the complex case.**

## Check your understanding

**1. Why can a symmetric matrix not have a genuinely complex eigenvalue?**

Reference answer: Let $Ax=\lambda x$ with $x\ne0$, allowing complex $\lambda$ and $x$. Since $A=A^T$ and $A$ is real, $A\bar x=\bar\lambda\bar x$; transposing and using $A^T=A$ gives $\bar x^TA=\bar\lambda\bar x^T$. Right-multiplying by $x$ yields $\bar x^TAx=\bar\lambda\,\bar x^Tx$. Left-multiplying the original equation by $\bar x^T$ yields $\bar x^TAx=\lambda\,\bar x^Tx$. Subtracting, $(\lambda-\bar\lambda)\bar x^Tx=0$. But for a nonzero complex vector $\bar x^Tx=\sum|x_i|^2>0$, so $\lambda=\bar\lambda$ and $\lambda$ is real. The decisive point is that $\bar x^Tx$ is strictly positive, the complex analogue of $\|x\|^2>0$.

**2. Find the pivots of $A=\begin{bmatrix}2&2\\2&5\end{bmatrix}$ and decide whether it is positive definite.**

Reference answer: The first pivot is $2$. Since $\det A=2\cdot5-2\cdot2=6$ and the product of pivots equals the determinant, the second pivot is $6/2=3$. Both pivots are positive, so $A$ is positive definite. The leading principal minors confirm it: $2>0$ and $6>0$. The eigenvalues solve $\lambda^2-7\lambda+6=0$, giving $1$ and $6$, both positive.

**3. In the projection form of the spectral theorem, what is the coefficient of each projection?**

Reference answer: The corresponding eigenvalue. $A=Q\Lambda Q^T=\sum_i\lambda_iq_iq_i^T$, where $q_iq_i^T$ is the rank-one orthogonal projection onto the unit eigenvector $q_i$; its coefficient is exactly the eigenvalue $\lambda_i$ paired with it. A symmetric matrix is therefore a weighted sum of mutually orthogonal projections.

**4. A $3\times3$ symmetric matrix has pivots $2,-1,4$. How many positive eigenvalues does it have?**

Reference answer: Two. For a symmetric matrix the number of positive pivots equals the number of positive eigenvalues; here the positive pivots are $2$ and $4$, so there are two positive eigenvalues and one negative one. Only the sign count is determined — the eigenvalues are not equal to $2,-1,4$ — although the product relation $\lambda_1\lambda_2\lambda_3=2\cdot(-1)\cdot4=-8$ does hold.

**5. Give a matrix with positive determinant that is not positive definite.**

Reference answer: $A=\begin{bmatrix}-1&0\\0&-3\end{bmatrix}$ has $\det A=3>0$, but its eigenvalues are $-1$ and $-3$, both negative, so it is not positive definite. The failure shows in the leading $1\times1$ minor $-1<0$: positive definiteness requires **all** leading principal minors to be positive, so checking only the full determinant is not enough. Another example is $\begin{bmatrix}-2&-1\\-1&-2\end{bmatrix}$, with determinant $3>0$ and eigenvalues $-1,-3$.

## How this connects

The previous lecture used Markov matrices to show that special matrices have special eigenvalues. This one systematizes the symmetric case and introduces positive definiteness. The next lecture handles complex numbers: Hermitian matrices, unitary matrices, and the Fourier matrix, whose fast factorization (the FFT) turns matrix decomposition into computational speed.
