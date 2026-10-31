---
slug: "24-markov-fourier"
title: "Markov Matrices and Fourier Series: Two Uses of Eigenvalues"
summary: "A nonnegative matrix whose columns sum to one always has eigenvalue 1, and its positive eigenvector is the steady state; the same orthonormal-basis expansion, moved to function space, gives Fourier coefficients."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "markov-matrices"
  - "fourier-series"
  - "eigenvalues"
sources:
  - kind: "video"
    title: "24. Markov Matrices; Fourier Series"
    url: "https://www.youtube.com/watch?v=lGGDIGizcQ0"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## What a Markov matrix is

A matrix is a **Markov matrix** if

1. every entry is nonnegative, and
2. **every column** sums to one.

In a row-vector convention the second condition becomes "every row sums to one". This course uses column vectors, so columns sum to one.

A typical example from the lecture:

$$
A=\begin{bmatrix}
0.1&0.01&0.3\\
0.2&0.99&0.3\\
0.7&0&0.4
\end{bmatrix}
$$

Each column adds to 1. Both properties survive matrix multiplication, so every power of $A$ is again a Markov matrix.

## The key facts

| Fact | Statement |
| --- | --- |
| 1 | $\lambda=1$ is always an eigenvalue |
| 2 | Every other eigenvalue satisfies $|\lambda|<1$ (in exceptional cases it may equal 1, but never exceed 1) |
| 3 | The eigenvector for $\lambda=1$ has no negative entries and gives the steady state |

### Why 1 must be an eigenvalue

Consider $A-I$. Since each column of $A$ sums to 1, each column of $A-I$ sums to 0. Adding the rows of $A-I$ therefore produces the zero row, so the rows are dependent and the matrix is singular:

$$
A-I \text{ singular} \iff \det(A-I)=0 \iff \lambda=1 \text{ is an eigenvalue}
$$

Another way to say it: the all-ones vector $\mathbf{1}$ satisfies

$$
\mathbf{1}^T(A-I)=0
$$

so $\mathbf{1}$ lies in the **left null space** of $A-I$. It is not an eigenvector of $A$ but of $A^T$. Since $A$ and $A^T$ have the same eigenvalues — $\det(A^T-\lambda I)=\det(A-\lambda I)$ — this also proves that 1 is an eigenvalue of $A$.

### Where the steady state comes from

The solution of $u_{k+1}=Au_k$ is

$$
u_k=c_1 1^k x_1+c_2\lambda_2^k x_2+\cdots
$$

When every $|\lambda_i|<1$, all terms except the first decay, so

$$
u_k\to c_1x_1
$$

The steady state is the eigenvector for $\lambda=1$, scaled by a coefficient fixed by the initial total.

## A population example

Two states, California (C) and Massachusetts (M). Each year:

- 90% of California stays, 10% moves to Massachusetts;
- 80% of Massachusetts stays, 20% moves to California.

$$
\begin{bmatrix}u_C\\u_M\end{bmatrix}_{k+1}
=
\begin{bmatrix}0.9&0.2\\0.1&0.8\end{bmatrix}
\begin{bmatrix}u_C\\u_M\end{bmatrix}_{k}
$$

Each column sums to 1, so the total population is conserved.

### Eigenvalues

The trace is $1.7$, so the other eigenvalue is $0.7$:

$$
\lambda_1=1,\qquad \lambda_2=0.7
$$

### Eigenvectors

For $\lambda=1$, solve $(A-I)x=0$ with

$$
A-I=\begin{bmatrix}-0.1&0.2\\0.1&-0.2\end{bmatrix}
$$

whose null space is spanned by $(2,1)$.

For $\lambda=0.7$, solve $(A-0.7I)x=0$ to get $(1,-1)$.

### A concrete trajectory

Start with $u_0=(0,1000)$: everyone in Massachusetts. Expand it in eigenvectors:

$$
\begin{bmatrix}0\\1000\end{bmatrix}
=
c_1\begin{bmatrix}2\\1\end{bmatrix}
+c_2\begin{bmatrix}1\\-1\end{bmatrix}
$$

Solving gives

$$
c_1=\frac{1000}{3},\qquad c_2=-\frac{2000}{3}
$$

so

$$
u_k=\frac{1000}{3}\begin{bmatrix}2\\1\end{bmatrix}
-\frac{2000}{3}(0.7)^k\begin{bmatrix}1\\-1\end{bmatrix}
$$

As $k\to\infty$ the second term vanishes:

$$
u_\infty=\begin{bmatrix}2000/3\\1000/3\end{bmatrix}
$$

The total is still 1000. A one-step check: $u_1=Au_0=(200,800)$, matching the formula.

> **Background:** This model assumes fixed yearly transition probabilities and no births, deaths, or migration outside the two states. A realistic population model would not conserve the total, and the matrix would not be Markov.

## Projection onto an orthonormal basis

Let $q_1,\dots,q_n$ be an orthonormal basis of $\mathbb{R}^n$. Any vector expands as

$$
v=x_1q_1+x_2q_2+\cdots+x_nq_n
$$

Take the inner product of both sides with $q_i$. Orthogonality kills every term except the $i$-th:

$$
q_i^Tv=x_i(q_i^Tq_i)=x_i
$$

Therefore

$$
x_i=q_i^Tv
$$

In matrix form, $Qx=v$ and $Q^{-1}=Q^T$, so $x=Q^Tv$. Orthonormality turns finding coefficients into a single inner product.

## From vectors to functions: Fourier series

Fourier's insight is to carry this structure into function space:

- the vector $v$ becomes a function $f(x)$;
- the basis vectors become the functions $1,\cos x,\sin x,\cos 2x,\sin 2x,\dots$;
- finite dimension becomes infinite dimension.

### The inner product of functions

A vector inner product multiplies components and adds. A function has a continuum of points, so the sum becomes an integral:

$$
\langle f,g\rangle=\int_0^{2\pi} f(x)g(x)\,dx
$$

The interval is $[0,2\pi]$ because every basis function has period $2\pi$.

### Orthogonality

For $\sin x$ and $\cos x$:

$$
\int_0^{2\pi}\sin x\cos x\,dx
=
\frac12\int_0^{2\pi}\sin 2x\,dx
=
0
$$

Other pairs are orthogonal as well: same-frequency sine and cosine, and different frequencies, all integrate to zero.

### The coefficient formulas

Write

$$
f(x)=a_0+\sum_{k=1}^{\infty}\left(a_k\cos kx+b_k\sin kx\right)
$$

Take the inner product with $\cos x$, meaning multiply by $\cos x$ and integrate. Every orthogonal term vanishes and only one survives:

$$
\int_0^{2\pi} f(x)\cos x\,dx
=
a_1\int_0^{2\pi}\cos^2x\,dx
=
a_1\pi
$$

Hence

$$
a_1=\frac{1}{\pi}\int_0^{2\pi} f(x)\cos x\,dx
$$

In general,

$$
a_k=\frac{1}{\pi}\int_0^{2\pi} f(x)\cos kx\,dx,
\qquad
b_k=\frac{1}{\pi}\int_0^{2\pi} f(x)\sin kx\,dx
$$

The constant term is the average value:

$$
a_0=\frac{1}{2\pi}\int_0^{2\pi} f(x)\,dx
$$

> **One-sentence summary:** Fourier coefficients are the coordinates of a function in an orthonormal basis, the exact analogue of $x_i=q_i^Tv$.

## Core review

- A Markov matrix is nonnegative with columns summing to one; its powers are Markov too.
- Column sums of one make $A-I$ singular, so 1 is an eigenvalue.
- Every other eigenvalue has modulus below 1, so $A^k$ converges to the $\lambda=1$ direction.
- The steady-state vector is nonnegative, scaled by the initial total.
- In an orthonormal basis, coefficients are single inner products: $x_i=q_i^Tv$.
- Function inner products are integrals; Fourier coefficients are projection coordinates.

## Common misconceptions

1. **Remembering "rows sum to one" instead of columns.** It depends on the vector convention; this course uses columns.
2. **Assuming every Markov matrix converges to a unique steady state.** Other eigenvalues of modulus 1 can produce oscillation, and a reducible matrix may have several steady states.
3. **Treating the $\lambda=1$ eigenvector as arbitrary up to scale.** The scale is fixed by the initial total.
4. **Writing a function inner product as a plain product.** It must be integrated.
5. **Forgetting the normalization in Fourier formulas.** The integral of $\cos^2$ over $[0,2\pi]$ is $\pi$, not 1.

## Check your understanding

1. Prove that column sums of one force $A-I$ to be singular.
2. Why is the all-ones vector in the null space of $A^T$ rather than of $A$?
3. In the two-state model, what is the steady state if the initial population is $(1000,0)$?
4. Derive the formula for $b_1$ using an inner product.
5. In what sense is a Fourier series an expansion in an infinite orthonormal basis?

## How this connects

This lecture applies eigenvalues to probability models and projection to function spaces. The next session reviews orthogonality, determinants, and eigenvalues together; after that the course turns to symmetric matrices and positive definiteness, where orthogonality, eigenvalues, and quadratic forms meet.
