---
slug: "27-positive-definite-minima"
title: "Positive Definite Matrices and Minima: Four Tests, One Bowl"
summary: "Positive definiteness ties pivots, determinants, eigenvalues, and quadratic forms together; geometrically it is a bowl, and analytically it is the second-order condition for a strict minimum."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "positive-definite"
  - "optimization"
sources:
  - kind: "video"
    title: "27. Positive Definite Matrices and Minima"
    url: "https://www.youtube.com/watch?v=vF7eyJ2g3kU"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Why this lecture is a hinge

Positive definiteness is not a new computational trick. It is where the whole course meets. For a symmetric matrix, four different languages answer the same question:

1. **Eigenvalues:** all are positive.
2. **Determinants:** every leading principal minor is positive.
3. **Pivots:** every pivot after elimination is positive.
4. **Quadratic form:** $x^{\mathsf T}Ax>0$ for every nonzero $x$.

The lecture's job is to explain why these are equivalent, and what geometric object they describe: an upward-opening bowl.

> **One-sentence summary:** A positive definite matrix is one whose quadratic form is always positive, and pivots, determinants, and eigenvalues are three projections of that single fact.

## Timeline

| Time | Topic |
| --- | --- |
| 0:05 | Positive definite matrices and quadratic forms |
| 1:45 | 2 by 2 matrices, determinants and pivots |
| 5:28 | A positive determinant is not enough |
| 6:37 | Positive semidefinite, where an eigenvalue is zero |
| 8:32 | Values of the quadratic form $x^{\mathsf T}Ax$ |
| 10:19 | Completing squares into a sum of squares |
| 12:15 | Deciding definiteness without eigenvalues |
| 16:49 | The picture: a bowl, a saddle, a trough |
| 19:24 | The 2 by 2 test: $a>0$ and $ac-b^2>0$ |
| 22:25 | Level curves and principal axes |
| 24:16 | A necessary condition: first derivatives vanish |
| 26:20 | The second derivative matrix, the Hessian |
| 32:30 | Principal axes and eigenvalues are the same directions |
| 35:24 | The Hessian and the quadratic Taylor term |
| 39:22 | A 3 by 3 example: determinant and pivots |
| 44:42 | Telling a bowl from a saddle and a football |
| 48:20 | The shape when the three eigenvalues are distinct |

## A two-by-two example

Take the symmetric matrix

$$
A=\begin{bmatrix}2 & 6\\ 6 & c\end{bmatrix}.
$$

The first leading minor is $2>0$, so only the full determinant matters:

$$
\det A = 2c-36.
$$

### Three regimes

| $c$ | Determinant | Eigenvalues | Verdict |
| --- | --- | --- | --- |
| $18$ | $0$ | $0,\ 20$ | positive semidefinite |
| $7$ | $-22$ | one positive, one negative | indefinite |
| $20$ | $4$ | both positive | positive definite |

At $c=18$ the second row is three times the first, the rank is one, and there is only one pivot, $2$. The trace is $20$ and the determinant is $0$, so the eigenvalues are $0$ and $20$.

At $c=7$, choose $x=(1,-1)$:

$$
x^{\mathsf T}Ax = 2-12+7=-3<0.
$$

A quadratic form that goes negative in some direction rules out positive definiteness. Geometrically this is a **saddle**: rising along some directions, falling along others.

At $c=20$, the determinant is $4$ and the trace is $22$. A positive product and a positive sum force both eigenvalues positive.

## The quadratic form is the definition

Write $x=(x_1,x_2)$:

$$
x^{\mathsf T}Ax
= \begin{bmatrix}x_1 & x_2\end{bmatrix}
\begin{bmatrix}a & b\\ b & c\end{bmatrix}
\begin{bmatrix}x_1\\ x_2\end{bmatrix}
= ax_1^2+2bx_1x_2+cx_2^2.
$$

This is purely quadratic: no constant, no linear terms, no higher powers. Diagonal entries produce the squares; off-diagonal entries appear in pairs and produce the cross term.

**Definition:** $A$ is positive definite if $x^{\mathsf T}Ax>0$ for every $x\neq 0$.

### Completing the square

For $c=20$:

$$
2x^2+12xy+20y^2 = 2(x+3y)^2+2y^2.
$$

The right side is a sum of nonnegative squares, zero only when $y=0$ and $x=-3y$, that is, only at the origin. Hence positive definite.

For $c=18$:

$$
2x^2+12xy+18y^2 = 2(x+3y)^2.
$$

One square remains, and it vanishes along the whole line $x=-3y$. That is positive semidefinite, not definite.

For $c=7$:

$$
2x^2+12xy+7y^2 = 2(x+3y)^2-11y^2.
$$

A negative coefficient appears, so the form is negative along $y\neq 0$, $x=-3y$.

### Completing the square is elimination

The coefficients are not accidental:

- the outer $2$ is the first pivot;
- the inner $3$ is the elimination multiplier;
- the final $2$ is the second pivot.

Eliminating on $A=\begin{bmatrix}2&6\\6&20\end{bmatrix}$ means subtracting three times row one from row two, giving $\begin{bmatrix}2&6\\0&2\end{bmatrix}$. The pivots are $2$ and $2$; the multiplier is $3$.

So **completing the square is Gaussian elimination**. Positive pivots mean the quadratic form can be written as a sum of squares with positive coefficients. In general, positive definiteness is equivalent to a factorization $A=LDL^{\mathsf T}$ with every diagonal entry of $D$ positive.

## From calculus to matrices: the second-order condition

In one-variable calculus, a minimum needs two conditions: the first derivative vanishes, and the second derivative is positive. The second derivative measures the curvature.

The multivariable statement is exactly parallel. For a smooth $f(x_1,\dots,x_n)$:

1. **First order:** every partial derivative vanishes; the gradient is zero.
2. **Second order:** the **Hessian** matrix of second partials is positive definite.

$$
H=\begin{bmatrix}
\dfrac{\partial^2 f}{\partial x_1^2} & \dfrac{\partial^2 f}{\partial x_1\partial x_2}\\
\dfrac{\partial^2 f}{\partial x_2\partial x_1} & \dfrac{\partial^2 f}{\partial x_2^2}
\end{bmatrix}.
$$

It is always symmetric, because mixed partials do not depend on the order of differentiation: $f_{xy}=f_{yx}$.

For $f(x,y)=2x^2+12xy+20y^2$, the Hessian is exactly $A$. The gradient vanishes at the origin and the Hessian is positive definite, so the origin is a strict minimum.

In two variables this becomes the familiar test

$$
f_{xx}>0,\qquad f_{xx}f_{yy}-f_{xy}^2>0.
$$

The second inequality is the determinant of the Hessian. It forces the two eigenvalues to share a sign, and $f_{xx}>0$ forces that sign to be positive.

### The picture

- **Positive definite:** an upward bowl (elliptic paraboloid) with a unique lowest point at the origin. The level set $x^{\mathsf T}Ax=1$ is an **ellipse**.
- **Indefinite:** a **saddle**, rising in some directions and falling in others. The level set is a **hyperbola**.
- **Semidefinite:** flat in some direction; the bottom is a line or plane, so the minimum is not unique.

## A three-by-three example

$$
A=\begin{bmatrix}
2 & -1 & 0\\
-1 & 2 & -1\\
0 & -1 & 2
\end{bmatrix}.
$$

### Leading minors

$$
\det A_1=2,\qquad
\det A_2=\begin{vmatrix}2 & -1\\ -1 & 2\end{vmatrix}=3,\qquad
\det A_3=4.
$$

All positive, so the matrix is positive definite.

### Pivots

Elimination gives

$$
2,\qquad \frac{3}{2},\qquad \frac{4}{3}.
$$

Their partial products reproduce the leading minors: $2\cdot\frac32=3$ and $2\cdot\frac32\cdot\frac43=4$.

### Eigenvalues

No cubic equation is needed to know they are all positive, but their exact values are

$$
2-\sqrt2,\qquad 2,\qquad 2+\sqrt2.
$$

Check: the sum is $6$, the trace; the product is $2(4-2)=4$, the determinant.

### Quadratic form and geometry

$$
x^{\mathsf T}Ax
=2x_1^2+2x_2^2+2x_3^2-2x_1x_2-2x_2x_3.
$$

The level set $x^{\mathsf T}Ax=1$ is an **ellipsoid** with three principal axes, whose directions come from the eigenvectors.

## The principal axis theorem

For a symmetric matrix,

$$
A=Q\Lambda Q^{\mathsf T},
$$

where the columns of $Q$ are orthonormal eigenvectors and $\Lambda$ is diagonal. This is the **principal axis theorem**, and it is diagonalization for symmetric matrices.

Geometrically:

- eigenvectors give the directions of the ellipsoid's principal axes;
- eigenvalues set their lengths.

More precisely, for the level set $x^{\mathsf T}Ax=1$, the semi-axis along the $i$-th eigenvector has length

$$
\frac{1}{\sqrt{\lambda_i}}.
$$

A larger eigenvalue means a steeper direction, hence a shorter semi-axis.

> Background: the lecture phrases this as "lengths, or half-lengths, or one over the eigenvalues". The exact statement follows by substituting $x=Qy$, which turns the form into $\sum\lambda_i y_i^2=1$; the largest $y_i$ is $1/\sqrt{\lambda_i}$.

## Common mistakes

1. **Checking only the diagonal.** Positive diagonal entries do not imply positive definiteness: $\begin{bmatrix}2&6\\6&7\end{bmatrix}$ has positive diagonal and negative determinant.
2. **Confusing semidefinite with definite.** A zero determinant means the form vanishes along some direction, so the minimum is not unique.
3. **Forgetting symmetry.** Positive definiteness is defined for symmetric matrices; the form $x^{\mathsf T}Ax$ of a non-symmetric matrix depends only on its symmetric part.
4. **Treating the four tests as independent work.** They are equivalent; use whichever is cheapest to compute.

## Takeaways

- The four tests — eigenvalues, leading minors, pivots, quadratic form — are equivalent.
- Completing the square is elimination: pivots outside, multipliers inside.
- A positive definite Hessian is the multivariable version of "second derivative positive", and it certifies a strict minimum.
- Geometrically, positive definite means a bowl and an ellipsoid; indefinite means a saddle and a hyperbola.
- Symmetric matrices factor as $A=Q\Lambda Q^{\mathsf T}$; eigenvectors give directions, eigenvalues give scale.

## Check your understanding

**1. Why is $\begin{bmatrix}2&6\\6&18\end{bmatrix}$ only semidefinite? What is its null space?**

Reference answer: The $2\times2$ determinant is $2\cdot18-6\cdot6=0$, while the leading $1\times1$ minor is $2>0$, so the matrix fails "all leading minors positive" but never makes the quadratic form negative. Completing the square gives $2x^2+12xy+18y^2=2(x+3y)^2$, which is nonnegative everywhere and equals zero along the line $x+3y=0$; hence it is only semidefinite. The null space is that line: $2x+6y=0$ gives $x=-3y$, so $N(A)=\operatorname{span}\{(-3,1)^T\}$. The rank is $1$ and the eigenvalues are $0$ and $20$.

**2. Without computing eigenvalues, how do you know both eigenvalues of $\begin{bmatrix}2&6\\6&20\end{bmatrix}$ are positive?**

Reference answer: Check the leading principal minors. The first is $2>0$; the second is $\det A=2\cdot20-6\cdot6=4>0$. Both are positive, so the matrix is positive definite and both eigenvalues are positive. Equivalently, the pivots are $2$ and $\det A/2=2$, both positive. Each criterion is equivalent to "all eigenvalues positive", so no quadratic formula is needed.

**3. How do the pivots and multipliers of elimination correspond to the coefficients in the completed square?**

Reference answer: Take $2x^2+12xy+20y^2=2(x+3y)^2+2y^2$. The coefficient outside the bracket, $2$, is the first pivot; the $3$ inside is the elimination multiplier; the final coefficient $2$ is the second pivot. Elimination subtracts $3$ times row 1 from row 2, producing $\begin{bmatrix}2&6\\0&2\end{bmatrix}$, whose pivots are exactly $2$ and $2$. In general, completing the square writes $x^{\mathsf T}Ax=\sum_i d_i(\text{linear}_i)^2$, where $d_i$ is the $i$-th pivot and the coefficients of the linear forms are the multipliers — precisely the $A=LDL^{\mathsf T}$ factorization.

**4. For $f(x,y)=x^2+4xy+y^2$, is the origin a minimum, a maximum, or a saddle?**

Reference answer: The gradient is $\nabla f=(2x+4y,\,4x+2y)$, which vanishes at the origin, so the origin is a critical point. The Hessian is
$$
H=\begin{bmatrix}2&4\\4&2\end{bmatrix}.
$$
Its leading minor $2>0$, but its determinant $4-16=-12<0$, so $H$ is indefinite; the eigenvalues are $6$ and $-2$. Along $(1,1)$ the quadratic form is $6>0$, while along $(1,-1)$ it is $-2<0$. The origin is therefore a **saddle point**, not an extremum.

**5. Why is the semi-axis of $x^{\mathsf T}Ax=1$ equal to $1/\sqrt{\lambda}$ rather than $1/\lambda$?**

Reference answer: Set $x=Qy$, where the columns of $Q$ are orthonormal eigenvectors. Since $Q^{\mathsf T}Q=I$,
$$
x^{\mathsf T}Ax=y^{\mathsf T}Q^{\mathsf T}AQ\,y=y^{\mathsf T}\Lambda y=\sum_i\lambda_i y_i^2 .
$$
The level set becomes $\sum_i\lambda_i y_i^2=1$, an ellipsoid in $y$-coordinates whose $i$-th semi-axis satisfies $\lambda_i y_i^2=1$, i.e. $|y_i|=1/\sqrt{\lambda_i}$. Because $Q$ is orthogonal, $x=Qy$ preserves lengths, so the semi-axis in $x$-coordinates has the same length $1/\sqrt{\lambda_i}$. The expression $1/\lambda$ has the wrong dimension: the quadratic form is a squared length, so its eigenvalues must be square-rooted to yield a length.

## How this connects to the course

The previous lecture diagonalized symmetric matrices. This one unifies symmetry, positive definiteness, quadratic forms, and minima. The next lecture first finishes positive definiteness with inverses, sums, and the least-squares matrix $A^{\mathsf T}A$, then turns to similar matrices and Jordan form.
