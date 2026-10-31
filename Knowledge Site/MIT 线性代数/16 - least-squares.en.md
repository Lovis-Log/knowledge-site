---
slug: "16-least-squares"
title: "Projection Matrices and Least Squares"
summary: "The projection matrix carried through a numerical example: the best line through three points is C = 2/3, D = 1/2, and AᵀA is invertible exactly when the columns of A are independent."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "least-squares"
  - "projection-matrix"
  - "normal-equations"
sources:
  - kind: "video"
    title: "16. Projection Matrices and Least Squares"
    url: "https://www.youtube.com/watch?v=osh80YCg_GM"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Two extreme cases as a check

$$
P=A(A^\top A)^{-1}A^\top .
$$

**Case one: $\mathbf{b}$ is already in the column space.** Then $\mathbf{b}=A\mathbf{x}$, and

$$
P\mathbf{b}=A(A^\top A)^{-1}A^\top A\mathbf{x}=A\mathbf{x}=\mathbf{b}.
$$

The projection does not move it.

**Case two: $\mathbf{b}$ is perpendicular to the column space.** Then $\mathbf{b}\in N(A^\top)$, so $A^\top\mathbf{b}=\mathbf{0}$ and $P\mathbf{b}=\mathbf{0}$.

A general vector splits as

$$
\mathbf{b}=P\mathbf{b}+(I-P)\mathbf{b},
$$

the first part in the column space and the second perpendicular to it. $I-P$ is also a projection matrix, onto the orthogonal complement. It is likewise symmetric and idempotent:

$$
(I-P)^\top=I-P,\qquad (I-P)^2=I-P.
$$

## Computing least squares

Fit a line $b=C+Dt$ to the points $(1,1),(2,2),(3,2)$.

$$
A=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix},
\qquad
\mathbf{x}=\begin{bmatrix}C\\D\end{bmatrix},
\qquad
\mathbf{b}=\begin{bmatrix}1\\2\\2\end{bmatrix}.
$$

### Step 1: form $A^\top A$ and $A^\top\mathbf{b}$

$$
A^\top A=
\begin{bmatrix}1&1&1\\1&2&3\end{bmatrix}
\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix}
=
\begin{bmatrix}3&6\\6&14\end{bmatrix}.
$$

$$
A^\top\mathbf{b}=
\begin{bmatrix}1&1&1\\1&2&3\end{bmatrix}
\begin{bmatrix}1\\2\\2\end{bmatrix}
=
\begin{bmatrix}5\\11\end{bmatrix}.
$$

### Step 2: solve the normal equations

$$
\begin{cases}
3C+6D=5,\\
6C+14D=11.
\end{cases}
$$

Multiply the first by 2: $6C+12D=10$. Subtract from the second:

$$
2D=1\quad\Longrightarrow\quad D=\frac12.
$$

Back-substitute: $3C+3=5$, so

$$
C=\frac23.
$$

The best line is

$$
b=\frac23+\frac12 t.
$$

### Step 3: projection and error vectors

$$
\mathbf{p}=A\hat{\mathbf{x}}=
\begin{bmatrix}
\frac23+\frac12\\
\frac23+1\\
\frac23+\frac32
\end{bmatrix}
=
\begin{bmatrix}7/6\\5/3\\13/6\end{bmatrix}.
$$

$$
\mathbf{e}=\mathbf{b}-\mathbf{p}=
\begin{bmatrix}1\\2\\2\end{bmatrix}
-
\begin{bmatrix}7/6\\5/3\\13/6\end{bmatrix}
=
\begin{bmatrix}-1/6\\1/3\\-1/6\end{bmatrix}.
$$

Check orthogonality:

$$
\mathbf{e}\cdot(1,1,1)=-\frac16+\frac13-\frac16=0,
$$

$$
\mathbf{e}\cdot(1,2,3)=-\frac16+\frac23-\frac12=0.
$$

The error is perpendicular to both columns of $A$, hence to the whole column space. Also

$$
\mathbf{p}\cdot\mathbf{e}
=\frac76\left(-\frac16\right)+\frac53\cdot\frac13+\frac{13}{6}\left(-\frac16\right)
=\frac{-7+20-13}{36}=0.
$$

### Two pictures of one calculation

- **Data picture:** three points, a line, and three vertical errors. Minimize $e_1^2+e_2^2+e_3^2$.
- **Vector picture:** $\mathbf{b}$ decomposes into $\mathbf{p}$ in the column space and $\mathbf{e}$ perpendicular to it.

$C$ and $D$ are the coefficients that combine the two columns into $\mathbf{p}$. The pictures are the same numbers drawn two ways.

## The normal equations from calculus

Minimize

$$
E(C,D)=(C+D-1)^2+(C+2D-2)^2+(C+3D-2)^2.
$$

Set the partial derivative with respect to $C$ to zero:

$$
2(C+D-1)+2(C+2D-2)+2(C+3D-2)=0,
$$

which simplifies to $3C+6D=5$.

Set the partial derivative with respect to $D$ to zero:

$$
2(C+D-1)\cdot1+2(C+2D-2)\cdot2+2(C+3D-2)\cdot3=0,
$$

which simplifies to $6C+14D=11$.

These are exactly the normal equations. Squaring pays off here: the derivative stays linear.

### A limitation

A point far from the line has its error squared, so it can dominate and drag the fit. Statisticians call such a point an **outlier** and have developed robust regression in response. Least squares remains the most widely used method, but it is not the only one.

## Proof: AᵀA is invertible when the columns are independent

This is the central fact of the chapter, since the whole computation depends on $(A^\top A)^{-1}$ existing.

Assume the columns of $A$ are independent. To show $A^\top A$ is invertible, it suffices to show $N(A^\top A)=\{\mathbf{0}\}$.

Suppose

$$
A^\top A\mathbf{x}=\mathbf{0}.
$$

Multiply on the left by $\mathbf{x}^\top$:

$$
\mathbf{x}^\top A^\top A\mathbf{x}=0.
$$

The left side is

$$
(A\mathbf{x})^\top(A\mathbf{x})=\|A\mathbf{x}\|^2.
$$

A zero norm forces $A\mathbf{x}=\mathbf{0}$.

Independence of the columns means the null space contains only the zero vector, so

$$
\mathbf{x}=\mathbf{0}.
$$

Hence $N(A^\top A)=\{\mathbf{0}\}$ and $A^\top A$ is invertible.

### The converse

If the columns are dependent, some nonzero $\mathbf{x}$ has $A\mathbf{x}=\mathbf{0}$, hence $A^\top A\mathbf{x}=\mathbf{0}$, so $A^\top A$ is singular. Therefore

$$
A^\top A\text{ is invertible}\iff \text{the columns of }A\text{ are independent}.
$$

## Checking the example

For

$$
A=\begin{bmatrix}1&1\\1&2\\1&3\end{bmatrix},
$$

$$
A^\top A=\begin{bmatrix}3&6\\6&14\end{bmatrix},
\qquad
\det=3\cdot14-36=42-36=6\neq0.
$$

The columns $(1,1,1)$ and $(1,2,3)$ are not multiples, so they are indeed independent.

## Takeaways

- A projection splits $\mathbf{b}$ into a column-space part $P\mathbf{b}$ and an orthogonal part $(I-P)\mathbf{b}$.
- Least squares is given by the normal equations and is geometrically a projection.
- The three-point fit is $b=2/3+t/2$, with an error vector orthogonal to the column space.
- The normal equations also follow by differentiating the squared error.
- $A^\top A$ is invertible exactly when $A$ has independent columns, proved via $N(A^\top A)=N(A)$.

## Check your understanding

1. Why is $I-P$ a projection matrix, and onto which space does it project?
2. Differentiate $E(C,D)$ and verify that you recover the normal equations.
3. For the three-point example, verify $\mathbf{p}\cdot\mathbf{e}=0$.
4. Prove $N(A^\top A)=N(A)$, naming what each step uses.
5. If the points were $(1,1),(2,2),(3,3)$, what would the best line and the error be?

## How this connects to the course

The previous lecture built the projection formula; this one finishes the arithmetic and proves invertibility. The next changes the basis to the best possible columns — orthonormal vectors — so that projection and least squares require almost no inversion.
