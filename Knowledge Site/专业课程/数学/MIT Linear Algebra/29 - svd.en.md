---
slug: "29-svd"
title: "Singular Value Decomposition: The Right Bases for All Four Subspaces"
summary: "Every matrix factors as A = UΣVᵀ; right singular vectors come from AᵀA, left ones from AAᵀ, singular values are square roots of eigenvalues, and the point is an orthonormal input basis mapped to an orthonormal output basis."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "svd"
  - "matrix-factorization"
sources:
  - kind: "video"
    title: "29. Singular Value Decomposition"
    url: "https://www.youtube.com/watch?v=TX_vooSnhm8"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## What SVD fixes

Eigen-decomposition $A=S\Lambda S^{-1}$ has two limitations: the matrix must be square, and it must have enough eigenvectors. Worse, even when it diagonalizes, $S$ is usually not orthogonal, so changing basis distorts lengths and angles.

SVD drops the requirement that input and output share a basis. It allows a separate orthonormal basis on each side:

$$
A=U\Sigma V^{\mathsf T}.
$$

- $U$ is $m\times m$ orthogonal; its columns are the **left singular vectors**.
- $V$ is $n\times n$ orthogonal; its columns are the **right singular vectors**.
- $\Sigma$ is $m\times n$ diagonal with $\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r>0$.

This holds for **every** $m\times n$ matrix, square or not, symmetric or not, diagonalizable or not.

> **One-sentence summary:** SVD finds an orthonormal input basis that $A$ maps to an orthonormal output basis, stretching each direction without coupling them.

## Timeline

| Time | Topic |
| --- | --- |
| 0:14 | The SVD extends good-matrix ideas to any matrix |
| 1:29 | The four subspaces and orthonormal bases |
| 3:05 | The geometry of an arbitrary linear map |
| 5:48 | Choosing $v_1,\dots,v_r$ with $Av_i=\sigma_i u_i$ |
| 8:31 | The matrix form $AV=U\Sigma$ |
| 11:02 | Splitting dimensions between row space and nullspace |
| 13:48 | $A^{\mathsf T}A$ is symmetric and positive definite |
| 15:17 | The $\sigma_i^2$ are eigenvalues of $A^{\mathsf T}A$ |
| 17:12 | Get $V$ from the eigenvectors of $A^{\mathsf T}A$ |
| 21:22 | Then get $U$ from $AA^{\mathsf T}$ |
| 28:15 | A singular example: a rank-one matrix |
| 31:05 | Matching nullspace with left nullspace |
| 32:57 | Computing $u$ and $\sigma$ from $v$ |
| 37:39 | Bases and dimensions in general |
| 40:14 | Summary of the SVD and the four subspaces |

## The geometric goal

View $A$ as a linear map from $\mathbb R^n$ to $\mathbb R^m$. Its row space is an $r$-dimensional subspace of $\mathbb R^n$; its column space is an $r$-dimensional subspace of $\mathbb R^m$.

We want orthonormal bases

$$
v_1,\dots,v_r \text{ in the row space},\qquad
u_1,\dots,u_r \text{ in the column space},
$$

such that

$$
Av_1=\sigma_1u_1,\quad
Av_2=\sigma_2u_2,\quad\dots,\quad
Av_r=\sigma_ru_r.
$$

In matrix form,

$$
A\begin{bmatrix}v_1&\cdots&v_r\end{bmatrix}
=\begin{bmatrix}u_1&\cdots&u_r\end{bmatrix}
\begin{bmatrix}\sigma_1&&\\&\ddots&\\&&\sigma_r\end{bmatrix}.
$$

Completing both sides with the null spaces gives the full $A=U\Sigma V^{\mathsf T}$.

### Why null spaces are not the difficulty

The $n-r$ dimensions outside the row space form the null space, and $A$ sends them to zero. The $m-r$ dimensions outside the column space form the left null space, the null space of $A^{\mathsf T}$. Any orthonormal bases there will do; their singular values are zero.

So the real task is only this: **find paired orthonormal directions in the row and column spaces that $A$ stretches into each other**.

## How to compute: eliminate U

Starting from

$$
A=U\Sigma V^{\mathsf T},
$$

multiply by the transpose to build an equation containing only $V$:

$$
A^{\mathsf T}A
=(U\Sigma V^{\mathsf T})^{\mathsf T}(U\Sigma V^{\mathsf T})
=V\Sigma^{\mathsf T}U^{\mathsf T}U\Sigma V^{\mathsf T}.
$$

Since $U^{\mathsf T}U=I$,

$$
A^{\mathsf T}A=V\Sigma^{\mathsf T}\Sigma V^{\mathsf T}
=V\begin{bmatrix}\sigma_1^2&&\\&\ddots&\\&&\sigma_n^2\end{bmatrix}V^{\mathsf T}.
$$

This is exactly the eigen-decomposition of $A^{\mathsf T}A$:

- the columns of $V$ are eigenvectors of $A^{\mathsf T}A$;
- $\sigma_i^2$ are its eigenvalues;
- $\sigma_i=\sqrt{\lambda_i}$, the positive square root.

Similarly, $AA^{\mathsf T}$ eliminates $V$:

$$
AA^{\mathsf T}=U\Sigma\Sigma^{\mathsf T}U^{\mathsf T},
$$

so the columns of $U$ are eigenvectors of $AA^{\mathsf T}$.

Both $A^{\mathsf T}A$ and $AA^{\mathsf T}$ are symmetric positive semidefinite, so their eigenvalues are nonnegative and square roots exist. Their nonzero eigenvalues coincide, a special case of the fact that $AB$ and $BA$ share eigenvalues.

## Example one: an invertible $2\times2$

$$
A=\begin{bmatrix}4&4\\-3&3\end{bmatrix}.
$$

### Compute $A^{\mathsf T}A$

$$
A^{\mathsf T}A=
\begin{bmatrix}4&-3\\4&3\end{bmatrix}
\begin{bmatrix}4&4\\-3&3\end{bmatrix}
=\begin{bmatrix}25&7\\7&25\end{bmatrix}.
$$

### Eigenvalues and eigenvectors

For $\begin{bmatrix}25&7\\7&25\end{bmatrix}$, the eigenvectors are $\begin{bmatrix}1\\1\end{bmatrix}$ and $\begin{bmatrix}1\\-1\end{bmatrix}$:

$$
A^{\mathsf T}A\begin{bmatrix}1\\1\end{bmatrix}
=\begin{bmatrix}32\\32\end{bmatrix}=32\begin{bmatrix}1\\1\end{bmatrix},
$$

$$
A^{\mathsf T}A\begin{bmatrix}1\\-1\end{bmatrix}
=\begin{bmatrix}18\\-18\end{bmatrix}=18\begin{bmatrix}1\\-1\end{bmatrix}.
$$

Normalized:

$$
v_1=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix},\qquad
v_2=\frac{1}{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}.
$$

### Singular values

$$
\sigma_1=\sqrt{32}=4\sqrt2,\qquad
\sigma_2=\sqrt{18}=3\sqrt2.
$$

### Find $U$

$$
AA^{\mathsf T}=
\begin{bmatrix}4&4\\-3&3\end{bmatrix}
\begin{bmatrix}4&-3\\4&3\end{bmatrix}
=\begin{bmatrix}32&0\\0&18\end{bmatrix}.
$$

This is already diagonal, so the eigenvectors are the standard basis:

$$
u_1=\begin{bmatrix}1\\0\end{bmatrix},\qquad
u_2=\begin{bmatrix}0\\1\end{bmatrix}.
$$

### Check the signs

$$
Av_1=\frac{1}{\sqrt2}\begin{bmatrix}4&4\\-3&3\end{bmatrix}
\begin{bmatrix}1\\1\end{bmatrix}
=\frac{1}{\sqrt2}\begin{bmatrix}8\\0\end{bmatrix}
=\begin{bmatrix}4\sqrt2\\0\end{bmatrix}
=4\sqrt2\begin{bmatrix}1\\0\end{bmatrix},
$$

which matches $\sigma_1u_1$.

But

$$
Av_2=\frac{1}{\sqrt2}\begin{bmatrix}4&4\\-3&3\end{bmatrix}
\begin{bmatrix}1\\-1\end{bmatrix}
=\frac{1}{\sqrt2}\begin{bmatrix}0\\-6\end{bmatrix}
=\begin{bmatrix}0\\-3\sqrt2\end{bmatrix}
=-3\sqrt2\begin{bmatrix}0\\1\end{bmatrix}.
$$

A minus sign appears. The correct choice is $u_2=\begin{bmatrix}0\\-1\end{bmatrix}$, giving $Av_2=3\sqrt2\,u_2$.

> Background: an eigenvector times $-1$ is still an eigenvector, so the columns of $V$ have a sign freedom. $U$ must be chosen consistently with that sign, or $U\Sigma V^{\mathsf T}$ is off by a sign. The sign puzzle left open in the lecture is resolved by taking $u_2=\begin{bmatrix}0\\-1\end{bmatrix}$.

Finally,

$$
A=
\begin{bmatrix}1&0\\0&-1\end{bmatrix}
\begin{bmatrix}4\sqrt2&0\\0&3\sqrt2\end{bmatrix}
\frac{1}{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
$$

## Example two: rank one

$$
A=\begin{bmatrix}4&3\\8&6\end{bmatrix}.
$$

The rows are proportional, so the rank is one.

### Row space and null space

Every row is a multiple of $\begin{bmatrix}4\\3\end{bmatrix}$, so the row space is one-dimensional:

$$
v_1=\frac{1}{5}\begin{bmatrix}4\\3\end{bmatrix}
=\begin{bmatrix}0.8\\0.6\end{bmatrix}.
$$

The null space is orthogonal to it:

$$
v_2=\begin{bmatrix}0.6\\-0.8\end{bmatrix}.
$$

### Column space and left null space

Every column is a multiple of $\begin{bmatrix}4\\8\end{bmatrix}$, whose direction is $\begin{bmatrix}1\\2\end{bmatrix}$:

$$
u_1=\frac{1}{\sqrt5}\begin{bmatrix}1\\2\end{bmatrix}.
$$

The left null space is orthogonal:

$$
u_2=\frac{1}{\sqrt5}\begin{bmatrix}2\\-1\end{bmatrix}.
$$

### Singular values

$$
A^{\mathsf T}A=
\begin{bmatrix}4&8\\3&6\end{bmatrix}
\begin{bmatrix}4&3\\8&6\end{bmatrix}
=\begin{bmatrix}80&60\\60&45\end{bmatrix}.
$$

The rank is one, so one eigenvalue is zero and the other follows from the trace:

$$
125+0=125.
$$

Hence

$$
\sigma_1=\sqrt{125}=5\sqrt5,\qquad \sigma_2=0.
$$

Check:

$$
Av_1=\begin{bmatrix}4&3\\8&6\end{bmatrix}
\begin{bmatrix}0.8\\0.6\end{bmatrix}
=\begin{bmatrix}5\\10\end{bmatrix}
=5\sqrt5\cdot\frac{1}{\sqrt5}\begin{bmatrix}1\\2\end{bmatrix}
=\sigma_1u_1.
$$

## The complete picture of four subspaces

SVD hands you orthonormal bases for all four fundamental subspaces at once:

| Subspace | Lives in | Dimension | Basis |
| --- | --- | --- | --- |
| Row space | $\mathbb R^n$ | $r$ | $v_1,\dots,v_r$ |
| Null space | $\mathbb R^n$ | $n-r$ | $v_{r+1},\dots,v_n$ |
| Column space | $\mathbb R^m$ | $r$ | $u_1,\dots,u_r$ |
| Left null space | $\mathbb R^m$ | $m-r$ | $u_{r+1},\dots,u_m$ |

The difference from Gram-Schmidt is that Gram-Schmidt can orthogonalize any basis, but it will not make $A$ diagonal in that basis. SVD adds the requirement that $A$ send each $v_i$ in the direction of $u_i$, and that is why eigenvalues are unavoidable.

## Common mistakes

1. **Choosing $U$ and $V$ independently.** They must be paired; flipping the sign of $v_i$ requires flipping $u_i$.
2. **Confusing singular values with eigenvalues.** For non-symmetric matrices they differ, and singular values are never negative.
3. **Assuming $A^{\mathsf T}A$ is positive definite.** With rank deficiency it has zero eigenvalues; it is only semidefinite.
4. **Forgetting the ordering.** The standard form requires $\sigma_1\ge\sigma_2\ge\cdots$, with the columns of $U$ and $V$ reordered in step.

## Takeaways

- Every matrix has an SVD: $A=U\Sigma V^{\mathsf T}$.
- The columns of $V$ are eigenvectors of $A^{\mathsf T}A$; the columns of $U$ are eigenvectors of $AA^{\mathsf T}$; $\sigma_i$ are positive square roots of the eigenvalues.
- For symmetric positive definite $A$, $U=V=Q$ and SVD reduces to $A=Q\Lambda Q^{\mathsf T}$.
- SVD's essence is choosing orthonormal input and output bases so that $A$ only stretches.
- It produces orthonormal bases for all four fundamental subspaces in one step.

## Check your understanding

**1. Why must the eigenvalues of $A^{\mathsf T}A$ be nonnegative?**

Reference answer: Let $A^{\mathsf T}Av=\lambda v$ with $v\ne0$. Left-multiplying by $v^{\mathsf T}$,
$$
\lambda\,v^{\mathsf T}v=v^{\mathsf T}A^{\mathsf T}Av=(Av)^{\mathsf T}(Av)=\lVert Av\rVert^2\ge0 .
$$
Since $v^{\mathsf T}v=\lVert v\rVert^2>0$, we get $\lambda=\lVert Av\rVert^2/\lVert v\rVert^2\ge0$. The same computation shows $A^{\mathsf T}A$ is positive semidefinite, and positive definite exactly when $N(A)=\{\mathbf{0}\}$ (independent columns). The singular values are $\sigma_i=\sqrt{\lambda_i}$ precisely because the eigenvalues are nonnegative and the real square root exists.

**2. In example one, why must $u_2$ be $\begin{bmatrix}0\\-1\end{bmatrix}$ rather than $\begin{bmatrix}0\\1\end{bmatrix}$?**

Reference answer: SVD requires $Av_i=\sigma_iu_i$ with $\sigma_i>0$. In example one,
$$
Av_2=\frac1{\sqrt2}\begin{bmatrix}4&4\\-3&3\end{bmatrix}\begin{bmatrix}1\\-1\end{bmatrix}=\begin{bmatrix}0\\-3\sqrt2\end{bmatrix}.
$$
With $u_2=(0,1)^T$ this reads $Av_2=-3\sqrt2\,u_2$, a sign mismatch with $Av_2=\sigma_2u_2=3\sqrt2\,u_2$; taking $u_2=(0,-1)^T$ gives $Av_2=3\sqrt2\,u_2$. Any column of $V$ may be negated (it is still an eigenvector), but the corresponding column of $U$ must be negated with it, otherwise $U\Sigma V^{\mathsf T}$ carries an extra sign.

**3. How many nonzero singular values does a rank-one matrix have, and why?**

Reference answer: Exactly one. The number of nonzero singular values equals $\operatorname{rank}A$, because $A$ maps the $r$-dimensional row space isomorphically onto the column space, one positive stretch factor per direction, while null-space directions give $\sigma=0$. In example two, $A=\begin{bmatrix}4&3\\8&6\end{bmatrix}$ gives $A^{\mathsf T}A=\begin{bmatrix}80&60\\60&45\end{bmatrix}$ with trace $125$ and rank $1$, so the eigenvalues are $125$ and $0$, giving $\sigma_1=5\sqrt5$ and $\sigma_2=0$.

**4. How does the SVD of a symmetric positive definite matrix relate to its eigen-decomposition?**

Reference answer: They coincide. A symmetric positive definite matrix has the spectral decomposition $A=Q\Lambda Q^{\mathsf T}$ with $Q$ orthogonal, $\Lambda=\operatorname{diag}(\lambda_i)$ and all $\lambda_i>0$. Matching this with $A=U\Sigma V^{\mathsf T}$ gives $U=V=Q$ and $\Sigma=\Lambda$, because positive eigenvalues satisfy $\sigma_i=\sqrt{\lambda_i^2}=\lambda_i$. Thus the left and right singular vectors coincide and SVD reduces to orthogonal diagonalization; for a general matrix the singular values differ from the eigenvalues, and singular values are always nonnegative.

**5. If $v_1$ changes sign, how must $U$, $\Sigma$, and $V$ adjust to keep the factorization valid?**

Reference answer: Replace the first column of $V$ by $-v_1$ and simultaneously replace the first column of $U$ by $-u_1$; leave $\Sigma$ unchanged. The reason is $A=\sum_i\sigma_iu_iv_i^{\mathsf T}$, whose first term is $\sigma_1u_1v_1^{\mathsf T}$; under $v_1\to-v_1$, setting $u_1\to-u_1$ gives $(-u_1)(-v_1)^{\mathsf T}=u_1v_1^{\mathsf T}$, so the sum is unchanged. Changing only $V$ would flip the sign of the whole sum. Note that $\sigma_1$ must stay positive: absorbing the sign into $\Sigma$ is not allowed, since SVD requires nonnegative singular values.

## How this connects to the course

The previous lecture characterized "one transformation, many bases" through similarity and Jordan form. This one allows different orthonormal bases on the input and output sides, producing a factorization valid for every matrix. The next lecture steps back to the more basic question: what a linear transformation is, and how a matrix is constructed once bases are chosen.
