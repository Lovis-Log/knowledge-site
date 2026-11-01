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

## Timeline

| Time | Topic |
| --- | --- |
| 0:07 | Orthonormal vectors |
| 3:17 | $Q^{T}Q=I$ |
| 4:37 | Ones on the diagonal, zeros elsewhere |
| 6:36 | Orthogonal matrices are square |
| 13:42 | Permutation matrices are orthogonal |
| 15:11 | Rectangular matrices with orthonormal columns |
| 17:38 | Why orthonormal columns help |
| 19:31 | The projection meaning of $QQ^{T}$ |
| 23:42 | Only a left inverse in the rectangular case |
| 25:27 | Gram-Schmidt begins |
| 26:54 | Producing $q_1,q_2$ from $a_1,a_2$ |
| 29:48 | Subtracting the projection |
| 31:04 | The error vector is the perpendicular piece |
| 38:35 | A numerical example with two vectors |
| 41:29 | Normalizing to get $q_1,q_2$ |
| 45:04 | $A$ and $Q$ span the same column space |
| 46:28 | The $R$ in $A=QR$ |

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

**1. Why are orthonormal vectors necessarily independent? Write the dot-product proof.**

Reference answer: Suppose
$$
c_1\mathbf{q}_1+c_2\mathbf{q}_2+\cdots+c_n\mathbf{q}_n=\mathbf{0}.
$$
Take the dot product with $\mathbf{q}_j$ and use $\mathbf{q}_i^\top\mathbf{q}_j=\delta_{ij}$:
$$
c_1(\mathbf{q}_1^\top\mathbf{q}_j)+\cdots+c_n(\mathbf{q}_n^\top\mathbf{q}_j)
=c_j\cdot1=c_j .
$$
The left side equals $\mathbf{0}^\top\mathbf{q}_j=0$, so $c_j=0$. Since $j$ is arbitrary, all coefficients vanish and the set is independent.

The point is that orthogonality turns "solve a system" into "take dot products": each coefficient is isolated.

**2. For rectangular $Q$ with $Q^\top Q=I$, why is $QQ^\top\neq I$? What is its rank?**

Reference answer: Let $Q$ be $m\times n$ with $n<m$, as in the lecture's $3\times2$ example. The relation $Q^\top Q=I_n$ says only that the $n$ columns are orthonormal; but $QQ^\top$ is $m\times m$.

By the rank inequality
$$
\operatorname{rank}(QQ^\top)\le \operatorname{rank}(Q)=n<m,
$$
the rank of $QQ^\top$ is at most $n$, so it cannot be the full-rank $I_m$. Geometrically, $QQ^\top$ projects $\mathbb{R}^m$ onto the $n$-dimensional column space of $Q$, collapsing every orthogonal direction to zero, whereas $I_m$ preserves all directions. Only for square $Q$ does $QQ^\top=I$ hold.

**3. Apply Gram-Schmidt to $\mathbf{a}=(1,0,0)$ and $\mathbf{b}=(1,1,0)$; write $Q$ and $R$.**

Reference answer: Step one: $\mathbf{A}=\mathbf{a}=(1,0,0)$, with $\mathbf{A}^\top\mathbf{A}=1$ and $\mathbf{A}^\top\mathbf{b}=1$.

Step two, subtract the projection:
$$
\mathbf{B}=\mathbf{b}-\frac{\mathbf{A}^\top\mathbf{b}}{\mathbf{A}^\top\mathbf{A}}\mathbf{A}
=(1,1,0)-1\cdot(1,0,0)=(0,1,0).
$$
Both are already unit vectors, so normalizing changes nothing:
$$
\mathbf{q}_1=(1,0,0)^\top,\qquad \mathbf{q}_2=(0,1,0)^\top,
$$
$$
Q=\begin{bmatrix}1&0\\0&1\\0&0\end{bmatrix}.
$$
The entries of $R$ are $r_{ij}=\mathbf{q}_i^\top\mathbf{a}_j$ for $i\le j$, and zero otherwise:
$$
R=\begin{bmatrix}
\mathbf{q}_1^\top\mathbf{a}&\mathbf{q}_1^\top\mathbf{b}\\
0&\mathbf{q}_2^\top\mathbf{b}
\end{bmatrix}
=\begin{bmatrix}1&1\\0&1\end{bmatrix}.
$$
Check:
$$
QR=\begin{bmatrix}1&0\\0&1\\0&0\end{bmatrix}\begin{bmatrix}1&1\\0&1\end{bmatrix}
=\begin{bmatrix}1&1\\0&1\\0&0\end{bmatrix},
$$
whose two columns are exactly $\mathbf{a}$ and $\mathbf{b}$.

**4. Why is the lower-left entry of $R$ zero, and how does the construction force it?**

Reference answer: The entries are $r_{ij}=\mathbf{q}_i^\top\mathbf{a}_j$. For $i>j$ we must show $\mathbf{q}_i\perp\mathbf{a}_j$.

When Gram-Schmidt builds $\mathbf{q}_i$, it starts from $\mathbf{a}_i$ and subtracts its projections onto $\mathbf{q}_1,\dots,\mathbf{q}_{i-1}$, so $\mathbf{q}_i$ is orthogonal to all earlier $\mathbf{q}_1,\dots,\mathbf{q}_{i-1}$. Since $\mathbf{a}_j$ with $j<i$ lies in $\operatorname{span}\{\mathbf{q}_1,\dots,\mathbf{q}_j\}\subseteq\operatorname{span}\{\mathbf{q}_1,\dots,\mathbf{q}_{i-1}\}$, we get $\mathbf{q}_i\perp\mathbf{a}_j$, i.e. $r_{ij}=0$.

So $R$ is zero below the diagonal — the upper triangular structure is a direct consequence of "column $j$ uses only the first $j$ orthogonal directions."

**5. In an orthonormal basis, why is the $i$-th least-squares coefficient exactly $\mathbf{q}_i^\top\mathbf{b}$?**

Reference answer: With orthonormal columns, $A=Q$ and $Q^\top Q=I$. The normal equations
$$
Q^\top Q\hat{\mathbf{x}}=Q^\top\mathbf{b}
$$
have $Q^\top Q=I$ on the left, giving directly
$$
\hat{\mathbf{x}}=Q^\top\mathbf{b}.
$$
Componentwise, the $i$-th coefficient is
$$
\hat{x}_i=\mathbf{q}_i^\top\mathbf{b},
$$
the inner product of $\mathbf{b}$ with the $i$-th basis vector.

The reason is that an orthonormal basis removes the cross terms: in general the $i$-th equation couples to the other coefficients and the system must be solved jointly; when $\mathbf{q}_i^\top\mathbf{q}_j=0$ for $i\ne j$, each equation contains a single unknown, and every coefficient is projected out independently. This is the common source of "coefficient equals inner product" in Fourier series and spherical harmonic expansions.

## How this connects to the course

This lecture closes the orthogonality chapter: from orthogonal vectors and subspaces to orthogonal bases and orthogonal matrices. The next chapter turns to determinants, where the determinant of $Q$, volume, and the geometry of orthogonal transformations reappear.
