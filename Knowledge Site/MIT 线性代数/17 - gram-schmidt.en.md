---
slug: "17-gram-schmidt"
title: "Orthogonal Matrices and Gram-Schmidt"
summary: "Orthonormal columns give QᵀQ=I, so projection and least squares collapse into dot products; Gram-Schmidt turns any independent columns into orthonormal ones and yields A=QR."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "orthonormal"
  - "gram-schmidt"
  - "qr-decomposition"
sources:
  - kind: "video"
    title: "17. Orthogonal Matrices and Gram-Schmidt"
    url: "https://www.youtube.com/watch?v=0MtwqhIwdrI"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2019-09-25"
---

## Orthonormal vectors

Vectors $\mathbf{q}_1,\dots,\mathbf{q}_n$ are **orthonormal** when

$$
\mathbf{q}_i^\top\mathbf{q}_j=
\begin{cases}
1,&i=j,\\
0,&i\neq j.
\end{cases}
$$

With the Kronecker delta, $\mathbf{q}_i^\top\mathbf{q}_j=\delta_{ij}$.

Put them in the columns of $Q$. The condition becomes

$$
Q^\top Q=I.
$$

That is the cleanest formula in the chapter.

### An immediate consequence

Orthonormal vectors are **automatically independent**. If $\sum c_i\mathbf{q}_i=\mathbf{0}$, take the dot product with $\mathbf{q}_j$:

$$
c_j=0.
$$

All coefficients vanish, so the vectors are independent.

## Orthogonal matrices

When $Q$ is **square**, $Q^\top Q=I$ gives

$$
Q^\top=Q^{-1}.
$$

Such a square matrix is called an **orthogonal matrix**. Note the terminology: a rectangular matrix only has "orthonormal columns"; only the square case earns the name orthogonal matrix.

### Examples

1. **Permutation matrix:**

$$
Q=\begin{bmatrix}0&0&1\\1&0&0\\0&1&0\end{bmatrix}.
$$

Each column is a coordinate unit vector, and they are mutually orthogonal.

2. **Rotation matrix:**

$$
Q=\begin{bmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{bmatrix}.
$$

Both columns are unit vectors and their dot product is $-\cos\theta\sin\theta+\sin\theta\cos\theta=0$.

3. **Hadamard matrix:**

$$
Q=\frac{1}{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix}.
$$

The four-by-four version is

$$
Q=\frac12\begin{bmatrix}
1&1&1&1\\
1&-1&1&-1\\
1&1&-1&-1\\
1&-1&-1&1
\end{bmatrix}.
$$

Orthogonal matrices with only $\pm1$ entries exist for some sizes; exactly which sizes admit them is still open.

### Rectangular case

$Q$ need not be square. For instance

$$
Q=\frac13\begin{bmatrix}1&-2\\2&-1\\2&2\end{bmatrix}
$$

has two orthonormal columns but is $3\times2$. Then

$$
Q^\top Q=I_2,
\qquad
QQ^\top\neq I_3.
$$

$QQ^\top$ is a rank-2 projection matrix.

## Why orthonormal columns are better

### No inversion in the projection

The general formula is

$$
P=A(A^\top A)^{-1}A^\top.
$$

With $A=Q$, $Q^\top Q=I$, so the inverse disappears:

$$
P=QQ^\top.
$$

If $Q$ is also square, $QQ^\top=I$: projection onto the whole space is the identity.

The two properties still hold:

$$
(QQ^\top)^\top=QQ^\top,
$$

$$
(QQ^\top)^2=Q(Q^\top Q)Q^\top=QQ^\top.
$$

### Least squares becomes a dot product

The normal equations $Q^\top Q\hat{\mathbf{x}}=Q^\top\mathbf{b}$ reduce to

$$
\hat{\mathbf{x}}=Q^\top\mathbf{b}.
$$

Component by component,

$$
\hat{x}_i=\mathbf{q}_i^\top\mathbf{b}.
$$

In words: **each coefficient is the projection of $\mathbf{b}$ onto the $i$-th basis vector**. No system to solve, no inverse.

This is the shared structure of Fourier series, spherical harmonics, and much of applied mathematics: in an orthonormal basis, coefficients come directly from inner products.

## Gram-Schmidt: from independent to orthonormal

Given independent $\mathbf{a},\mathbf{b},\mathbf{c}$, construct orthonormal vectors.

### Two vectors

Step one: keep the first direction.

$$
\mathbf{A}=\mathbf{a}.
$$

Step two: subtract from $\mathbf{b}$ its projection onto $\mathbf{A}$.

$$
\mathbf{B}=\mathbf{b}-\frac{\mathbf{A}^\top\mathbf{b}}{\mathbf{A}^\top\mathbf{A}}\,\mathbf{A}.
$$

The remainder is perpendicular to $\mathbf{A}$. Check:

$$
\mathbf{A}^\top\mathbf{B}
=\mathbf{A}^\top\mathbf{b}
-\frac{\mathbf{A}^\top\mathbf{b}}{\mathbf{A}^\top\mathbf{A}}\,\mathbf{A}^\top\mathbf{A}
=0.
$$

Finally normalize:

$$
\mathbf{q}_1=\frac{\mathbf{A}}{\|\mathbf{A}\|},
\qquad
\mathbf{q}_2=\frac{\mathbf{B}}{\|\mathbf{B}\|}.
$$

### Three vectors

The third vector must lose its components along both directions already built:

$$
\mathbf{C}=\mathbf{c}
-\frac{\mathbf{A}^\top\mathbf{c}}{\mathbf{A}^\top\mathbf{A}}\,\mathbf{A}
-\frac{\mathbf{B}^\top\mathbf{c}}{\mathbf{B}^\top\mathbf{B}}\,\mathbf{B}.
$$

Normalize to get $\mathbf{q}_3$.

In general, step $k$ subtracts the projections onto all earlier directions:

$$
\mathbf{v}_k=\mathbf{a}_k-\sum_{i=1}^{k-1}\frac{\mathbf{q}_i^\top\mathbf{a}_k}{\mathbf{q}_i^\top\mathbf{q}_i}\,\mathbf{q}_i.
$$

(If the earlier vectors are already normalized, the denominators are 1.)

### A numerical example

Take

$$
\mathbf{a}=\begin{bmatrix}1\\1\\1\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}1\\0\\2\end{bmatrix}.
$$

Step one:

$$
\mathbf{A}=\begin{bmatrix}1\\1\\1\end{bmatrix},
\qquad
\mathbf{A}^\top\mathbf{A}=3,
\qquad
\mathbf{A}^\top\mathbf{b}=1+0+2=3.
$$

Step two:

$$
\mathbf{B}=\mathbf{b}-\frac{3}{3}\mathbf{A}
=\begin{bmatrix}1\\0\\2\end{bmatrix}-\begin{bmatrix}1\\1\\1\end{bmatrix}
=\begin{bmatrix}0\\-1\\1\end{bmatrix}.
$$

Check: $\mathbf{A}^\top\mathbf{B}=0-1+1=0$.

Step three, normalize:

$$
\mathbf{q}_1=\frac{1}{\sqrt3}\begin{bmatrix}1\\1\\1\end{bmatrix},
\qquad
\mathbf{q}_2=\frac{1}{\sqrt2}\begin{bmatrix}0\\-1\\1\end{bmatrix}.
$$

### The column space does not change

Gram-Schmidt only subtracts projections and rescales, so $Q$ and $A$ have the **same column space**. It merely replaces one basis by a better one: from independent but skewed to orthonormal.

## The A=QR factorization

If the columns of $A$ are $\mathbf{a}_1,\dots,\mathbf{a}_n$, Gram-Schmidt produces $Q$ with

$$
A=QR,
$$

where $R$ is **upper triangular**.

For two columns:

$$
\begin{bmatrix}\mathbf{a}_1&\mathbf{a}_2\end{bmatrix}
=
\begin{bmatrix}\mathbf{q}_1&\mathbf{q}_2\end{bmatrix}
\begin{bmatrix}
\mathbf{q}_1^\top\mathbf{a}_1 & \mathbf{q}_1^\top\mathbf{a}_2\\
0 & \mathbf{q}_2^\top\mathbf{a}_2
\end{bmatrix}.
$$

Why is the lower-left entry zero? Because $\mathbf{q}_2$ was constructed orthogonal to $\mathbf{a}_1$:

$$
\mathbf{q}_2^\top\mathbf{a}_1=0.
$$

More generally, the $j$-th column uses only $\mathbf{q}_1,\dots,\mathbf{q}_j$, so column $j$ of $R$ is zero below row $j$ — exactly upper triangular.

### Analogy with LU

| Factorization | Purpose | Structure |
| --- | --- | --- |
| $A=LU$ | Elimination | lower triangular × upper triangular |
| $A=QR$ | Orthogonalization | orthonormal columns × upper triangular |

Both split a matrix into better-structured factors. QR is especially important numerically: solving least squares with QR is more stable than forming $(A^\top A)^{-1}$ directly.

## Takeaways

- Orthonormal columns satisfy $Q^\top Q=I$; for a square matrix $Q^\top=Q^{-1}$, and it is called orthogonal.
- Orthonormal vectors are automatically independent.
- Projection reduces to $QQ^\top$, and least-squares coefficients to $\hat{x}_i=\mathbf{q}_i^\top\mathbf{b}$.
- Gram-Schmidt builds orthogonal directions by subtracting projections, then normalizes.
- $A=QR$ with $R$ upper triangular; the column space is unchanged.

## Check your understanding

1. Why are orthonormal vectors necessarily independent? Write the dot-product proof.
2. For rectangular $Q$ with $Q^\top Q=I$, why is $QQ^\top\neq I$? What is its rank?
3. Apply Gram-Schmidt to $\mathbf{a}=(1,0,0)$ and $\mathbf{b}=(1,1,0)$; write $Q$ and $R$.
4. Why is the lower-left entry of $R$ zero, and how does the construction force it?
5. In an orthonormal basis, why is the $i$-th least-squares coefficient exactly $\mathbf{q}_i^\top\mathbf{b}$?

## How this connects to the course

This lecture closes the orthogonality chapter: from orthogonal vectors and subspaces to orthogonal bases and orthogonal matrices. The next chapter turns to determinants, where the determinant of $Q$, volume, and the geometry of orthogonal transformations reappear.
