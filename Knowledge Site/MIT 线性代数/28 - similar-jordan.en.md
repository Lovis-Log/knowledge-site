---
slug: "28-similar-jordan"
title: "Similar Matrices and Jordan Form: One Spectrum, Many Families"
summary: "Similar matrices share all eigenvalues but not necessarily eigenvectors; repeated eigenvalues split matrices into separate similarity classes, and Jordan form picks the canonical representative of each."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "eigenvalues"
  - "jordan-form"
sources:
  - kind: "video"
    title: "28. Similar Matrices and Jordan Form"
    url: "https://www.youtube.com/watch?v=TSdXJw83kyA"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## Finishing positive definiteness

The lecture spends its first ten minutes closing three loose ends.

### Is the inverse of a positive definite matrix positive definite?

Yes. Eigenvalues give the shortest proof: if $A$ has eigenvalues $\lambda_1,\dots,\lambda_n>0$, then $A^{-1}$ has eigenvalues $1/\lambda_1,\dots,1/\lambda_n$, still positive. The inverse is symmetric, so it is positive definite.

### Is the sum of two positive definite matrices positive definite?

Yes. There is no need to know the eigenvalues or pivots of $A+B$; use the quadratic form:

$$
x^{\mathsf T}(A+B)x=x^{\mathsf T}Ax+x^{\mathsf T}Bx.
$$

The right side is a sum of two positive numbers for every $x\neq 0$.

The proof also carries a lesson: **when a positive-definiteness question appears, try the quadratic form first**. It often bypasses eigenvalues and pivots entirely.

### When is $A^{\mathsf T}A$ positive definite?

Let $A$ be $m\times n$. It is usually rectangular, so it is not itself positive definite. But $A^{\mathsf T}A$ is $n\times n$ and symmetric — the central object of least squares.

$$
x^{\mathsf T}A^{\mathsf T}Ax=(Ax)^{\mathsf T}(Ax)=\lVert Ax\rVert^2\ge 0.
$$

So $A^{\mathsf T}A$ is always **positive semidefinite**. It is positive definite exactly when $\lVert Ax\rVert^2>0$ for every $x\neq 0$, that is, when $Ax\neq 0$, meaning the null space of $A$ is trivial.

In rank terms:

$$
A^{\mathsf T}A\text{ positive definite}\iff A\text{ has independent columns}\iff \operatorname{rank}A=n.
$$

This is why the normal equations are safe to solve when the columns are independent: $A^{\mathsf T}A$ is not merely invertible but positive definite.

> Background: positive definite matrices also need no row exchanges during elimination. Pivots never become zero or dangerously small, so $A=LU$ is numerically stable. It is the best-behaved class in numerical linear algebra.

## The definition of similarity

Let $A$ and $B$ be $n\times n$. They are **similar** if there is an invertible $M$ with

$$
B=M^{-1}AM.
$$

The definition is a change of basis: the same linear transformation written in a different basis, where $M$ is the change-of-basis matrix.

### The most important similarity: diagonalization

If $A$ has $n$ independent eigenvectors, put them in the columns of $S$. Then

$$
S^{-1}AS=\Lambda.
$$

So $A$ is similar to the diagonal matrix $\Lambda$, the simplest member of its family.

But $S$ is not the only choice. Any invertible $M$ produces another matrix $M^{-1}AM$ similar to $A$, usually no longer diagonal.

## Similar matrices share eigenvalues

The main theorem:

> Similar matrices have the same eigenvalues.

### Proof

Suppose $Ax=\lambda x$ and $B=M^{-1}AM$. Insert $MM^{-1}$ between $A$ and $x$:

$$
A(MM^{-1})x=\lambda x.
$$

Regroup the left side as $(AM)(M^{-1}x)$ and multiply both sides on the left by $M^{-1}$:

$$
M^{-1}AM\,(M^{-1}x)=\lambda\,(M^{-1}x).
$$

That is,

$$
B(M^{-1}x)=\lambda(M^{-1}x).
$$

So $\lambda$ is also an eigenvalue of $B$, with eigenvector $M^{-1}x$.

**The eigenvalues stay fixed; the eigenvectors are moved by $M^{-1}$.** This matches intuition: changing basis does not change the transformation, only its coordinate representation.

### A hand-checkable example

Take

$$
A=\begin{bmatrix}2&1\\1&2\end{bmatrix},\qquad
M=\begin{bmatrix}1&1\\0&1\end{bmatrix},\qquad
M^{-1}=\begin{bmatrix}1&-1\\0&1\end{bmatrix}.
$$

First compute $AM$:

$$
AM=\begin{bmatrix}2&1\\1&2\end{bmatrix}
\begin{bmatrix}1&1\\0&1\end{bmatrix}
=\begin{bmatrix}2&3\\1&3\end{bmatrix}.
$$

Then multiply on the left by $M^{-1}$:

$$
B=M^{-1}AM=
\begin{bmatrix}1&-1\\0&1\end{bmatrix}
\begin{bmatrix}2&3\\1&3\end{bmatrix}
=\begin{bmatrix}1&0\\1&3\end{bmatrix}.
$$

The eigenvalues of $A$ are $3$ and $1$. The trace of $B$ is $4$ and its determinant is $3$, so its eigenvalues are again $3$ and $1$.

$B$ looks nothing like $A$, yet they belong to the same similarity class.

### The picture of a similarity class

Fix the eigenvalues $3$ and $1$. Every $2\times2$ matrix with these eigenvalues forms one family, and any two members are similar. The representative is the diagonal matrix

$$
\begin{bmatrix}3&0\\0&1\end{bmatrix}.
$$

Upper triangular, lower triangular, and asymmetric forms all join the family as long as the spectrum stays $\{3,1\}$.

## The bad case: repeated eigenvalues

When $\lambda_1=\lambda_2$, something subtler happens: the matrix may not have enough eigenvectors to diagonalize.

### A matrix alone in its class

Consider $4I=\begin{bmatrix}4&0\\0&4\end{bmatrix}$. For any invertible $M$,

$$
M^{-1}(4I)M=4M^{-1}M=4I.
$$

It is similar only to itself. Among all matrices with eigenvalues $4,4$, it forms a class of one.

### The other family

The matrix

$$
\begin{bmatrix}4&1\\0&4\end{bmatrix}
$$

also has eigenvalues $4,4$, but only one independent eigenvector: the null space of $A-4I$ is spanned by $\begin{bmatrix}1\\0\end{bmatrix}$, dimension one. It is not diagonalizable, so it cannot be similar to $4I$.

Every other matrix with eigenvalues $4,4$ lies in one big class, and $\begin{bmatrix}4&1\\0&4\end{bmatrix}$ is its closest-to-diagonal representative.

### More members

Keep the trace at $8$ and the determinant at $16$, and you stay in the same class, for example

$$
\begin{bmatrix}5&1\\-1&3\end{bmatrix},\qquad
\begin{bmatrix}4&17\\0&4\end{bmatrix}.
$$

Both have a single eigenvector and are similar to each other.

## Counting eigenvectors is not enough

A natural guess is that equal eigenvalues plus equal eigenvector counts imply similarity. The guess is false.

Take two $4\times4$ matrices whose eigenvalues are all zero.

**First:** two independent $2\times2$ blocks,

$$
J_1=\begin{bmatrix}
0&1&0&0\\
0&0&0&0\\
0&0&0&1\\
0&0&0&0
\end{bmatrix}.
$$

Its rank is $2$, so its nullity is $4-2=2$: two eigenvectors.

**Second:** one $3\times3$ block and one $1\times1$ block,

$$
J_2=\begin{bmatrix}
0&1&0&0\\
0&0&1&0\\
0&0&0&0\\
0&0&0&0
\end{bmatrix}.
$$

Its rank is again $2$, its nullity again $2$, and it also has two eigenvectors.

Yet $J_1$ and $J_2$ are not similar. The difference is not the count but the **block structure**: $J_1$ is $2+2$, $J_2$ is $3+1$. A complete description of a similarity class needs to know how the eigenvectors are grouped, not just how many there are.

## Jordan blocks and Jordan's theorem

### The Jordan block

A **Jordan block** $J_i$ has the form

$$
J_i=\begin{bmatrix}
\lambda_i&1&&\\
&\lambda_i&\ddots&\\
&&\ddots&1\\
&&&\lambda_i
\end{bmatrix},
$$

with a repeated eigenvalue on the diagonal, ones on the superdiagonal, and zeros elsewhere.

The key property: **a Jordan block has exactly one eigenvector**. The larger the block, the more eigenvectors are missing.

### The theorem

> Every square matrix $A$ is similar to a Jordan matrix $J$, built from Jordan blocks along the diagonal.

$$
J=\begin{bmatrix}
J_1&&\\
&\ddots&\\
&&J_d
\end{bmatrix}.
$$

Two consequences:

1. **The number of blocks equals the number of independent eigenvectors**, since each block contributes one.
2. **The block sizes** record how eigenvectors are missing, and that is exactly what distinguishes similarity classes.

If all eigenvalues are distinct, every block is $1\times1$, so $J$ is diagonal and $d=n$. Diagonalization is the special case.

### Why Jordan form is no longer the climax

Jordan form is algebraically beautiful: it classifies similarity completely. But it is numerically fragile. A tiny perturbation splits repeated eigenvalues, changes the rank, and alters the block structure.

The lecture's verdict: Jordan form is the right language for understanding similarity classes, but it is no longer the centerpiece of the course. The next lecture's singular value decomposition is.

## Takeaways

- The inverse and the sum of positive definite matrices are positive definite; $A^{\mathsf T}A$ is always semidefinite and definite exactly when $A$ has independent columns.
- Similarity means $B=M^{-1}AM$, a change of basis for one linear transformation.
- Similar matrices share all eigenvalues; eigenvectors transform by $M^{-1}$.
- Repeated eigenvalues split the spectrum into several similarity classes; $4I$ is a class of one.
- Counting eigenvectors does not determine similarity; Jordan block structure does.
- Every square matrix is similar to a Jordan matrix, which reduces to a diagonal matrix when eigenvalues are distinct.

## Check your understanding

1. Why is $A^{\mathsf T}A$ always positive semidefinite, and when is it positive definite?
2. Prove that similar matrices have the same eigenvalues and state how their eigenvectors correspond.
3. Why is $4I$ similar only to itself?
4. Two $4\times4$ matrices both have two eigenvectors. Why can they still fail to be similar?
5. What does the Jordan form look like when all eigenvalues are distinct, and why?

## How this connects to the course

The previous lecture characterized positive definiteness through quadratic forms and Hessians; this one finishes its algebraic properties, then introduces similarity and Jordan form. The next lecture turns to the singular value decomposition, which requires neither symmetry nor diagonalizability and applies to every matrix.
