---
slug: "03-multiplication-and-inverses"
title: "Matrix Multiplication and Inverses: Five Views and Gauss-Jordan"
summary: "Matrix multiplication has five equivalent views — entries, columns, rows, column-times-row, and blocks. A square matrix is invertible exactly when no nonzero vector maps to zero, and Gauss-Jordan computes the inverse in one pass."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "matrix-multiplication"
  - "inverse"
  - "gauss-jordan"
sources:
  - kind: "video"
    title: "Lecture 3: Multiplication and Inverse Matrices"
    url: "https://www.youtube.com/watch?v=FX4C-JpTFgY"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Two topics

1. What matrix multiplication actually does. There are five equivalent algorithms, and all of them matter.
2. Inverses of square matrices: when one exists, when it does not, and how to compute it.

The previous lecture used multiplication mechanically. This one opens it up, because column spaces, rank, and $LU$ factorization all depend on these views.

## Timeline

| Time | Topic |
| --- | --- |
| 0:08 | The rules for matrix multiplication |
| 1:24 | The $(i,j)$ entry as a row times a column |
| 4:57 | Rectangular matrices |
| 7:09 | Second view: $A$ times the columns of $B$ |
| 9:57 | Columns of $AB$ are combinations of columns of $A$ |
| 11:27 | Rows of $AB$ are combinations of rows of $B$ |
| 18:28 | Block multiplication |
| 24:20 | Invertible versus singular |
| 29:05 | A nonzero $\mathbf{x}$ with $A\mathbf{x}=\mathbf{0}$ rules out an inverse |
| 30:02 | Columns that combine to zero rule out an inverse |
| 36:07 | Gauss-Jordan: $n$ right-hand sides at once |
| 38:32 | Reducing $A$ to the identity |
| 42:01 | Checking the answer the old way |
| 46:12 | The full algorithm for the inverse |

## Five ways to multiply

Let $A$ be $m\times n$, $B$ be $n\times p$, and $C=AB$ be $m\times p$. The number of columns of $A$ must equal the number of rows of $B$.

### 1. By entries: row dot column

The entry in row $i$, column $j$ of $C$ is

$$
C_{ij}=\sum_{k=1}^{n} A_{ik}B_{kj}.
$$

That is the dot product of row $i$ of $A$ with column $j$ of $B$. For example,

$$
C_{34}=A_{31}B_{14}+A_{32}B_{24}+\cdots+A_{3n}B_{n4}.
$$

This is the textbook algorithm and the one used in computation.

### 2. By columns: each column of $C$ is a combination of columns of $A$

Write $B$ as $p$ columns side by side:

$$
B=\begin{bmatrix}\mathbf{b}_1 & \mathbf{b}_2 & \cdots & \mathbf{b}_p\end{bmatrix}.
$$

Then

$$
C=\begin{bmatrix}A\mathbf{b}_1 & A\mathbf{b}_2 & \cdots & A\mathbf{b}_p\end{bmatrix}.
$$

Since $A\mathbf{b}_j$ is a linear combination of the columns of $A$, **every column of $C$ is a combination of the columns of $A$**, with coefficients taken from the corresponding column of $B$.

### 3. By rows: each row of $C$ is a combination of rows of $B$

Similarly, writing $A$ by rows,

$$
A=\begin{bmatrix}\mathbf{a}_1^T\\ \vdots\\ \mathbf{a}_m^T\end{bmatrix},
\qquad
C=\begin{bmatrix}\mathbf{a}_1^T B\\ \vdots\\ \mathbf{a}_m^T B\end{bmatrix}.
$$

Each $\mathbf{a}_i^T B$ is a combination of the rows of $B$, with coefficients from row $i$ of $A$.

### 4. Column times row: a sum of rank-one matrices

This view is the easiest to overlook and the most structural. If $\mathbf{a}_k$ are the columns of $A$ and $\mathbf{b}_k^T$ the rows of $B$, then

$$
AB=\sum_{k=1}^{n}\mathbf{a}_k\mathbf{b}_k^T.
$$

Each term is a full $m\times p$ matrix. For example,

$$
\begin{bmatrix}2\\3\\4\end{bmatrix}
\begin{bmatrix}1 & 6\end{bmatrix}
=
\begin{bmatrix}
2 & 12\\
3 & 18\\
4 & 24
\end{bmatrix}.
$$

Every column is a multiple of $[2,3,4]^T$; every row is a multiple of $[1,6]$. Its row space is a line and its column space is a line — the prototype of a rank-one matrix.

### 5. By blocks

Cut both matrices into four blocks:

$$
A=\begin{bmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{bmatrix},
\qquad
B=\begin{bmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{bmatrix}.
$$

Then

$$
AB=
\begin{bmatrix}
A_{11}B_{11}+A_{12}B_{21} & A_{11}B_{12}+A_{12}B_{22}\\
A_{21}B_{11}+A_{22}B_{21} & A_{21}B_{12}+A_{22}B_{22}
\end{bmatrix}.
$$

The rule is the usual one with scalars replaced by blocks. All five routes agree.

## Inverses: the central question for square matrices

For an $n\times n$ matrix $A$, the important question is: **is it invertible?**

If there is a matrix $A^{-1}$ with

$$
A^{-1}A=I,
$$

then $A$ is invertible, or nonsingular. For square matrices there is a non-obvious fact: **a left inverse is also a right inverse**, so $A^{-1}A=I$ implies $AA^{-1}=I$. For rectangular matrices this fails, simply because the shapes do not allow it.

### Singular matrices: columns that combine to zero

Consider

$$
A=\begin{bmatrix}1&3\\2&6\end{bmatrix}.
$$

The columns $[1,2]^T$ and $[3,6]^T$ lie on the same line; the second is three times the first.

**Reason one (column picture).** $A$ times any matrix has columns that are combinations of the columns of $A$, so they all lie on that one line. But the columns of $I$, $[1,0]^T$ and $[0,1]^T$, do not. So $A$ cannot produce $I$.

**Reason two (nullspace).** There is a nonzero vector

$$
\mathbf{x}=\begin{bmatrix}3\\-1\end{bmatrix},
\qquad
A\mathbf{x}=
\begin{bmatrix}1&3\\2&6\end{bmatrix}
\begin{bmatrix}3\\-1\end{bmatrix}
=
\begin{bmatrix}3-3\\6-6\end{bmatrix}
=
\begin{bmatrix}0\\0\end{bmatrix}.
$$

If $A^{-1}$ existed, multiply both sides on the left:

$$
A^{-1}A\mathbf{x}=A^{-1}\mathbf{0}
\;\Longrightarrow\;
\mathbf{x}=\mathbf{0}.
$$

But $\mathbf{x}=[3,-1]^T$ is not zero. Contradiction: $A^{-1}$ does not exist.

> **One-sentence summary:** A square matrix is singular exactly when some nonzero vector is crushed to zero; once information is destroyed, no matrix can restore it.

This criterion later becomes "the nullspace contains only the zero vector" and "the determinant is zero".

## Gauss-Jordan: solving $n$ systems at once

Assume $A$ is invertible. The key observation is that column $j$ of $A^{-1}$ satisfies

$$
A\,(\text{column }j\text{ of }A^{-1})=\mathbf{e}_j,
$$

where $\mathbf{e}_j$ is column $j$ of the identity. Finding the inverse is therefore **solving $n$ systems with different right-hand sides**.

Gauss stops after forward elimination. Jordan continues upward until the left side is the identity.

### Example

Take

$$
A=\begin{bmatrix}1&3\\2&7\end{bmatrix}.
$$

Form the augmented matrix $[A\mid I]$:

$$
\left[\begin{array}{cc|cc}
1&3&1&0\\
2&7&0&1
\end{array}\right].
$$

**Step one:** subtract twice row one from row two.

$$
\left[\begin{array}{cc|cc}
1&3&1&0\\
0&1&-2&1
\end{array}\right].
$$

The lower-left entry is gone; this is upper triangular. Gauss would stop here.

**Step two:** subtract three times row two from row one, clearing the upper-right entry.

$$
\left[\begin{array}{cc|cc}
1&0&7&-3\\
0&1&-2&1
\end{array}\right].
$$

The left side is $I$, so the right side is

$$
A^{-1}=\begin{bmatrix}7&-3\\-2&1\end{bmatrix}.
$$

### Check

$$
A^{-1}A=
\begin{bmatrix}7&-3\\-2&1\end{bmatrix}
\begin{bmatrix}1&3\\2&7\end{bmatrix}
=
\begin{bmatrix}
7-6 & 21-21\\
-2+2 & -6+7
\end{bmatrix}
=
\begin{bmatrix}1&0\\0&1\end{bmatrix}.
$$

### Why the right side becomes the inverse

Write each elimination step as a matrix $E_1,E_2,\dots$, and let

$$
E=E_k\cdots E_2E_1.
$$

Applying $E$ to the augmented matrix:

$$
E\,[A\mid I]=[EA\mid E].
$$

When elimination finishes, $EA=I$. By definition of the inverse, $E=A^{-1}$. Therefore the right side is

$$
E\,I=E=A^{-1}.
$$

That is the whole idea: **the row operations that turn $A$ into $I$ turn $I$ into $A^{-1}$.**

## Takeaways

- $AB$ has five algorithms: entry dot products, by columns, by rows, sum of column-times-row, and blocks. They agree.
- Columns of $C$ are combinations of columns of $A$; rows of $C$ are combinations of rows of $B$.
- A column times a row is a rank-one matrix; $AB$ is a sum of such matrices.
- A square matrix is invertible exactly when no nonzero $\mathbf{x}$ satisfies $A\mathbf{x}=\mathbf{0}$.
- A singular matrix has linearly dependent columns, which cannot combine to produce the identity's columns.
- Gauss-Jordan reduces $[A\mid I]$; when the left half becomes $I$, the right half is $A^{-1}$.

## Check your understanding

**1. Write $C_{23}$ with the summation formula and state the shape constraints on $A$ and $B$.**

Reference answer:
$$
C_{23}=\sum_{k=1}^{n}A_{2k}B_{k3}=A_{21}B_{13}+A_{22}B_{23}+\cdots+A_{2n}B_{n3},
$$
the dot product of row two of $A$ with column three of $B$. If $A$ is $m\times n$ and $B$ is $n\times p$, then $C$ is $m\times p$; writing $C_{23}$ requires $m\ge2$ and $p\ge3$. The only compatibility condition is that the number of columns of $A$ equals the number of rows of $B$.

**2. Why must every column of $C$ be a combination of columns of $A$? Use the definition of matrix times vector.**

Reference answer: Split $B$ into columns $\mathbf{b}_1,\dots,\mathbf{b}_p$; then column $j$ of $C$ is $A\mathbf{b}_j$. By definition,
$$
A\mathbf{b}_j=\sum_{k=1}^{n}b_{kj}\,\mathbf{a}_k,
$$
a linear combination of the columns $\mathbf{a}_k$ of $A$ with weights taken from column $j$ of $B$. Hence every column of $C$ lies in the span of the columns of $A$, and there are as many columns in $C$ as in $B$.

**3. Show that $[2,3,4]^T[1,6]$ has a one-dimensional row space and a one-dimensional column space.**

Reference answer: The product is
$$
\begin{bmatrix}2\\3\\4\end{bmatrix}\begin{bmatrix}1&6\end{bmatrix}
=\begin{bmatrix}2&12\\3&18\\4&24\end{bmatrix}.
$$
Columns: the second is $6$ times the first, so the column space is $\operatorname{span}\{[2,3,4]^T\}$, a line. Rows: they are $2[1,6]$, $3[1,6]$, $4[1,6]$, so the row space is $\operatorname{span}\{[1,6]\}$, also a line. Both dimensions are 1 — the signature of a rank-one matrix, which collapses the whole plane onto a single line.

**4. Use the nullspace argument to show that $\begin{bmatrix}1&3\\2&6\end{bmatrix}$ is singular.**

Reference answer: Take $\mathbf{x}=[3,-1]^T\ne\mathbf{0}$. Then
$$
\begin{bmatrix}1&3\\2&6\end{bmatrix}\begin{bmatrix}3\\-1\end{bmatrix}
=\begin{bmatrix}3-3\\6-6\end{bmatrix}=\begin{bmatrix}0\\0\end{bmatrix}.
$$
If $A^{-1}$ existed, left multiplication would give
$$
A^{-1}A\mathbf{x}=A^{-1}\mathbf{0}\;\Longrightarrow\;\mathbf{x}=\mathbf{0},
$$
a contradiction. Two different inputs ($\mathbf 0$ and $[3,-1]^T$) map to the same output, so the information is lost and cannot be recovered.

**5. Run Gauss-Jordan on $A=\begin{bmatrix}1&3\\2&7\end{bmatrix}$ and verify the result.**

Reference answer: Starting from the augmented matrix,
$$
\left[\begin{array}{cc|cc}1&3&1&0\\2&7&0&1\end{array}\right]
\xrightarrow{R_2-2R_1}
\left[\begin{array}{cc|cc}1&3&1&0\\0&1&-2&1\end{array}\right]
\xrightarrow{R_1-3R_2}
\left[\begin{array}{cc|cc}1&0&7&-3\\0&1&-2&1\end{array}\right].
$$
The left block is $I$, so $A^{-1}=\begin{bmatrix}7&-3\\-2&1\end{bmatrix}$. Check:
$$
A^{-1}A=\begin{bmatrix}7&-3\\-2&1\end{bmatrix}\begin{bmatrix}1&3\\2&7\end{bmatrix}
=\begin{bmatrix}7-6&21-21\\-2+2&-6+7\end{bmatrix}
=\begin{bmatrix}1&0\\0&1\end{bmatrix}.
$$
The reason it works: with $E$ the product of the row operations, $E[A\mid I]=[EA\mid E]=[I\mid A^{-1}]$, so whatever happens to the right block is exactly $A^{-1}$.

## How it connects

This lecture turns multiplication and inversion into structure. The next one writes elimination as $A=LU$, with $L$ storing the multipliers and $U$ upper triangular. Later, invertibility is translated into equivalent conditions: nonzero pivots, a nonzero determinant, and a nullspace containing only zero.
