---
slug: "20-cramers-rule"
title: "Three Uses of Determinants: Inverse, Cramer's Rule, and Volume"
summary: "Cofactors give an explicit formula for A⁻¹, which yields Cramer's rule; then the determinant is interpreted as the volume of a parallelepiped and the area of a triangle."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "determinant"
  - "inverse-matrix"
  - "volume"
sources:
  - kind: "video"
    title: "20. Cramer's Rule, Inverse Matrix, and Volume"
    url: "https://www.youtube.com/watch?v=QNpj-gOXW9M"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Where this lecture sits

The previous two lectures built the properties and formulas of determinants. This one asks what they are good for: an explicit inverse, Cramer's rule for linear systems, and the determinant as volume.

One caveat comes first: these are primarily **theoretical tools**. For actual computation, elimination is faster and more stable. Their value is the algebraic relationships they expose.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Third lecture: Cramer's rule, inverses, volume |
| 3:00 | Cofactors and signs in the inverse formula |
| 6:09 | The 2×2 inverse via cofactors |
| 9:21 | The $n\times n$ case: each column is a cofactor column |
| 12:22 | Why a row times another row's cofactors is zero |
| 15:23 | Checking by expanding along the second row |
| 18:27 | Writing $A^{-1}$ with the formula |
| 21:30 | Cofactors times numbers as determinants |
| 24:36 | Cramer's rule and its proof |
| 27:52 | Elegant but not practical |
| 30:53 | The determinant as a volume |
| 33:58 | The unit cube has volume 1 |
| 37:07 | Deriving volume properties from the axioms |
| 40:21 | Factoring a row scales the volume |
| 43:25 | The area of a parallelogram |
| 46:37 | A triangle is half a parallelogram |
| 49:44 | The geometric meaning of the determinant |


## Application 1: the inverse via cofactors

### What the $2 \times 2$ formula reveals

$$
\begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1}
=
\frac{1}{ad-bc}
\begin{bmatrix}d&-b\\-c&a\end{bmatrix}
$$

Look at the matrix on the right:

- $d$ is the cofactor of $a$ (delete row 1, column 1);
- $-b$ is the cofactor of $c$ (position $(2,1)$, and $2+1$ is odd, so it carries a minus);
- $-c$ is the cofactor of $b$;
- $a$ is the cofactor of $d$.

The right-hand matrix is therefore the **transpose of the cofactor matrix**.

### The general formula

Let $C$ be the cofactor matrix with entries $C_{ij}=(-1)^{i+j}\det M_{ij}$. Then

$$
A^{-1} = \frac{1}{\det A} C^{T}
$$

The matrix $C^T$ is also called the **adjugate** of $A$.

### Why it holds

To show $A \cdot \frac{1}{\det A}C^T = I$, it suffices to show

$$
A C^T = (\det A) I
$$

The $(i,i)$ entry on the left is the inner product of row $i$ of $A$ with column $i$ of $C^T$, which is row $i$ of $C$:

$$
a_{i1}C_{i1} + a_{i2}C_{i2} + \cdots + a_{in}C_{in}
$$

That is exactly the cofactor expansion along row $i$, so it equals $\det A$.

Now the $(i,j)$ entry with $i \neq j$: it is the inner product of row $i$ of $A$ with the cofactors of row $j$. This sum equals the determinant of the matrix obtained by replacing row $j$ of $A$ with row $i$. That matrix has two equal rows, so its determinant is zero.

Hence every diagonal entry is $\det A$ and every off-diagonal entry is zero:

$$
A C^T = (\det A) I
$$

Dividing by the nonzero determinant gives the formula.

### A consequence: how perturbations change the inverse

With an explicit formula you can answer questions like "what happens to $A^{-1}$ if I add 1 to $a_{11}$": examine how the determinant and each cofactor change. Elimination gives no such structural answer.

## Application 2: Cramer's rule

### Starting from the inverse

The solution of $Ax=b$ is $x=A^{-1}b$, so

$$
x = \frac{1}{\det A} C^T b
$$

The $j$-th component is

$$
x_j = \frac{1}{\det A}\sum_{i=1}^{n} C_{ij} b_i
$$

That sum reads as a cofactor expansion of some matrix along column $j$.

### What $B_j$ is

Define $B_j$ as the matrix obtained by replacing column $j$ of $A$ with $b$:

$$
B_j = \begin{bmatrix}
a_{11} & \cdots & b_1 & \cdots & a_{1n}\\
\vdots & & \vdots & & \vdots\\
a_{n1} & \cdots & b_n & \cdots & a_{nn}
\end{bmatrix}
$$

Expanding $\det B_j$ along column $j$:

$$
\det B_j = b_1 C_{1j} + b_2 C_{2j} + \cdots + b_n C_{nj}
$$

The cofactors are the same as those of $A$, because replacing column $j$ does not affect the submatrix left after deleting column $j$. Therefore **Cramer's rule**:

$$
x_j = \frac{\det B_j}{\det A}
$$

### Why it is not practical

Cramer's rule needs $n+1$ determinants. Each costs $O(n!)$ by expansion, or $O(n^3)$ by elimination, so the total is $O(n^4)$. Elimination produces the whole solution once, in $O(n^3)$.

The lecture's verdict is blunt: Cramer's rule is a disastrous way to compute. Its value is **doing algebra with letters**, not numerical work.

## Application 3: the determinant is a volume

### The statement

Take the rows (or columns) of the matrix as the edges of a parallelepiped. Its volume is the absolute value of the determinant:

$$
V = |\det A|
$$

The sign encodes orientation: exchanging two rows exchanges two edges, leaving the volume unchanged but flipping handedness, so the determinant changes sign.

### Proof via the three defining properties

Earlier we proved that a quantity satisfying the three properties is unique. So it suffices to check that "volume" satisfies them too.

1. **Identity.** The three edges are the coordinate unit vectors, spanning the unit cube. Volume 1 matches $\det I=1$.
2. **Orthogonal matrix.** The columns of $Q$ are orthonormal, so they still span a unit cube, merely rotated, with volume 1. And
   $$
   Q^TQ=I \implies (\det Q)^2 = 1 \implies \det Q = \pm 1
   $$
   The absolute value is 1, matching the volume.
3. **Scaling a row by $t$.** Stretching one edge by $t$ multiplies the volume by $t$, matching property 3A.
4. **Splitting a row.** This is 3B. In two dimensions it says a parallelogram splits along a diagonal into two triangles whose areas add. This is the one step the lecture only sketches; the book draws the figure.

All four hold, so the volume and the determinant satisfy the same defining properties and must be equal.

### The two-dimensional formula

A parallelogram with adjacent edges $(a,b)$ and $(c,d)$ has area

$$
\begin{vmatrix}a&b\\c&d\end{vmatrix} = ad-bc
$$

The absolute value is the area. A triangle is half of it:

$$
\text{area} = \frac{1}{2}|ad-bc|
$$

Compared with "base times height", this uses only vertex coordinates: no lengths, angles, or heights, and no square roots.

### A triangle with arbitrary vertices

For vertices $(x_1,y_1),(x_2,y_2),(x_3,y_3)$,

$$
\text{area}
=
\frac{1}{2}
\left|
\det
\begin{bmatrix}
x_1&y_1&1\\
x_2&y_2&1\\
x_3&y_3&1
\end{bmatrix}
\right|
$$

Subtracting the first row from the second and third turns the first two columns into coordinate differences relative to the first vertex, which is the same as translating the triangle to the origin. Translation does not change area.

## Core review

- $A^{-1} = \frac{1}{\det A}C^T$, where $C$ is the cofactor matrix.
- The proof: diagonal entries are cofactor expansions; off-diagonal entries come from matrices with two equal rows.
- Cramer's rule: $x_j = \det B_j / \det A$, with $B_j$ replacing column $j$ by $b$.
- The absolute determinant is the volume; the sign is orientation.
- Volume satisfies the three defining properties, so it equals the determinant.
- Vertex coordinates give area without lengths or angles.

## Common misconceptions

1. **Writing the adjugate as $C$ instead of $C^T$.** The transpose is part of the formula.
2. **Using Cramer's rule for numerical work.** It is for derivations, not computation.
3. **Forgetting the absolute value for volume.** Determinants can be negative; volumes cannot.
4. **Dropping the factor of $\frac12$ in the triangle formula.**
5. **Thinking each entry of $A^{-1}$ is the same-position cofactor over the determinant.** It is the transposed position.

## Check your understanding

**1. Which determinant property proves that the off-diagonal entries of $AC^T$ vanish?**

Reference answer: The property "two equal rows give determinant zero" (property 4). Entry $(i,j)$ with $i\ne j$ is the inner product of row $i$ of $A$ with the cofactors of row $j$; it equals the cofactor expansion along column $j$ of the matrix obtained by replacing row $j$ of $A$ with row $i$. That matrix has two equal rows, so its determinant is zero and the inner product vanishes. Note that replacing a column does not change the cofactors, because column $j$ is deleted in the expansion anyway.

**2. Write Cramer's rule for a $2\times2$ system and compare it with direct inversion.**

Reference answer: Let $A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$ with $\det A=ad-bc\ne0$ and $A\mathbf{x}=\mathbf{b}$, $\mathbf{b}=(b_1,b_2)$. Cramer gives
$$
x_1=\frac{\begin{vmatrix}b_1&b\\b_2&d\end{vmatrix}}{\det A}=\frac{db_1-bb_2}{ad-bc},
\qquad
x_2=\frac{\begin{vmatrix}a&b_1\\c&b_2\end{vmatrix}}{\det A}=\frac{ab_2-cb_1}{ad-bc}.
$$
Direct inversion gives
$$
A^{-1}\mathbf{b}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}\begin{bmatrix}b_1\\b_2\end{bmatrix}
=\frac{1}{ad-bc}\begin{bmatrix}db_1-bb_2\\-cb_1+ab_2\end{bmatrix},
$$
which matches component by component.

**3. Why can an orthogonal matrix only have determinant $\pm1$?**

Reference answer: $Q^TQ=I$; take determinants and use $\det(AB)=\det A\det B$:
$$
\det(Q^T)\det Q=\det I=1 .
$$
Since $\det(Q^T)=\det Q$, we get $(\det Q)^2=1$, hence $\det Q=\pm1$. Geometrically an orthogonal matrix only rotates or reflects, so it does not change volume; the magnitude of the volume factor is 1, and the sign records whether orientation is reversed.

**4. A parallelepiped has volume 5. If one edge is tripled, what is the new volume?**

Reference answer: $15$. Volume is the absolute value of the determinant; multiplying one edge (one row) by 3 multiplies the determinant by 3 by property 3A, hence the volume by 3: $3\times5=15$. The other edges keep their directions, so only that edge grows.

**5. Use the vertex formula to find the area of the triangle with vertices $(0,0),(3,0),(0,4)$.**

Reference answer:
$$
S=\frac12\left|\det\begin{bmatrix}0&0&1\\3&0&1\\0&4&1\end{bmatrix}\right|
=\frac12\left|3\cdot4-0\cdot0\right|
=\frac12\cdot12=6 .
$$
This is the right triangle with legs $3$ and $4$, matching "half base times height".

## How this connects

This lecture ends the determinant chapter. The next begins eigenvalues and eigenvectors: special vectors whose direction is unchanged by the matrix, found by solving $\det(A-\lambda I)=0$. The determinant returns as the key tool.
