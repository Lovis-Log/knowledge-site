---
slug: "14-eigenvectors-and-eigenvalues"
title: "Eigenvectors and Eigenvalues: The Directions That Never Turn"
summary: "Most vectors get knocked off their own span by a transformation; a few special ones are merely stretched or squashed and keep their direction. Those are the eigenvectors, and the stretch factor is the eigenvalue. Solving reduces to det(A − λI) = 0, and in a basis made of eigenvectors the matrix becomes diagonal."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [eigenvector, eigenvalue, diagonalization, eigenbasis]
sources:
  - kind: "video"
    title: "Eigenvectors and eigenvalues | Chapter 14, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=PFDu9oVAE-g"
    author: "3Blue1Brown"
    publishedAt: "2016-09-16"
---

## The thread of the lecture

Everything the previous chapters built — matrices as transformations, determinants, linear systems, change of basis — converges here.

The question is simple: **when a linear transformation kneads space, are there directions that stay put?**

Most vectors are knocked off their span (the line through the origin and the tip). A few special ones stay on their line, merely stretched or squashed.

Those are **eigenvectors**, and the stretch factor is the **eigenvalue**.

The concept is not what makes this topic hard; shaky foundations are. Matrices as transformations, determinants, systems, and change of basis — miss one and this chapter stalls.

## Timeline

| Time | Topic |
| --- | --- |
| 1:36 | Most vectors get knocked off their own span |
| 1:57 | Some stay on their line and are merely stretched |
| 4:11 | For a 3D rotation, an eigenvector is the axis of rotation |
| 5:31 | What $A\vec{v}=\lambda\vec{v}$ says |
| 6:54 | Rewriting as $(A-\lambda I)\vec{v}=\vec{0}$ |
| 7:29 | A non-zero solution requires a zero determinant |
| 9:50 | Example: the characteristic polynomial $(3-\lambda)(2-\lambda)$ |
| 10:46 | A 90-degree rotation has no real eigenvalues |
| 13:11 | A diagonal matrix: the basis vectors are eigenvectors |
| 15:37 | In an eigenbasis, the matrix becomes diagonal |

## Eigenvectors: the vectors that stay on their line

Take a concrete transformation: $\hat{\imath}\mapsto(3,0)$ and $\hat{\jmath}\mapsto(1,2)$. Its matrix is

$$
A = \begin{bmatrix} 3 & 1 \\ 0 & 2 \end{bmatrix}.
$$

Fix a vector and the line it spans (through the origin and its tip).

After the map, **most vectors leave that line** — the landing spot is elsewhere. Not surprising, since space has been kneaded.

But some vectors stay on their own line, merely stretched or squashed, exactly as if multiplied by a scalar.

In this example:

- $\hat{\imath}$ is one. Its span is the $x$-axis, and the first column says it lands at $(3,0)$ — still on the $x$-axis, three times as long;
- By linearity, **every** vector on the $x$-axis is stretched by 3, so that whole axis consists of eigenvectors;
- A subtler one is $(-1,1)$. It lands at $(3\cdot(-1)+1\cdot1,\ 0\cdot(-1)+2\cdot1) = (-2,2)$, exactly twice itself. So every vector on the diagonal line it spans is stretched by 2.

Those two families are all of them. Every other vector is turned off its line.

![Left: î, (−1,1), and a generic vector v before the map, with v's span shown dashed; right: after the map î becomes 3î and (−1,1) becomes 2(−1,1), both still on their original lines, while v lands at (4,2), off its former dashed line](/images/la14-eigenvectors-en.svg)

*Figure: the two eigenvectors are merely stretched, keeping their directions, while a generic vector is turned off its own span.*

## Eigenvalues can be negative

There is no essential difference between stretching and squashing, and none between positive and negative.

An eigenvalue of $-1/2$ means the vector is flipped and then squashed to half its length.

What matters is not the factor but the fact that **it stays on its span without being turned off it**.

## Why this is useful: the axis of a 3D rotation

Consider a rotation in three dimensions. If you can find one of its eigenvectors — a vector that stays on its own line — you have found the **axis of rotation**.

And describing a 3D rotation by axis plus angle is far easier than staring at a $3\times3$ matrix.

Incidentally, the eigenvalue here must be 1: a rotation changes direction without changing length, and staying in the same direction with the same length means staying put.

This is the general value of eigenvectors: **they describe what a transformation really does, independent of the coordinates you chose**. A matrix's columns depend on your basis; eigenvectors and eigenvalues do not.

## How to compute them

Symbolically, the definition is

$$
A\vec{v} = \lambda \vec{v}.
$$

The left side is matrix-vector multiplication and the right is scalar-vector multiplication — different forms, awkward to handle. So rewrite the right side as a matrix product:

$$
\lambda\vec{v} = (\lambda I)\vec{v},
$$

where $I$ is the identity, so that $\lambda I$ has $\lambda$ on the diagonal and zeros elsewhere.

Move everything to one side and factor out $\vec{v}$:

$$
(A - \lambda I)\vec{v} = \vec{0}.
$$

The problem is now: find a $\lambda$ such that $(A-\lambda I)$ sends some **non-zero** vector to zero.

And chapter 7 established that a matrix sends a non-zero vector to zero exactly when it flattens space — that is, when its **determinant is zero**.

So the eigenvalues must satisfy

$$
\det(A - \lambda I) = 0.
$$

That is the heart of the whole procedure.

## A complete example

Using the matrix from the start:

$$
A - \lambda I =
\begin{bmatrix} 3-\lambda & 1 \\ 0 & 2-\lambda \end{bmatrix}.
$$

The determinant is

$$
(3-\lambda)(2-\lambda).
$$

Setting it to zero gives $\lambda = 3$ or $\lambda = 2$ — the two eigenvalues.

Now find the eigenvectors. Take $\lambda = 2$:

$$
A - 2I = \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}.
$$

Which vectors does it send to zero? Solve $x + y = 0$: all vectors of the form $(-t, t)$, that is, the diagonal line spanned by $(-1,1)$.

Which matches the geometric observation exactly: vectors on that line are stretched by 2.

## Three special cases

**A 90-degree rotation**: no real eigenvectors, because every vector is turned off its own line.

The algebra agrees: $A-\lambda I = \begin{bmatrix} -\lambda & -1 \\ 1 & -\lambda \end{bmatrix}$ has determinant $\lambda^2+1$, with no real roots.

**A shear** $\begin{bmatrix}1&1\\0&1\end{bmatrix}$: only $\lambda = 1$, and the eigenvectors are just those on the $x$-axis, because the shear pushes every other vector off its line.

**Uniform scaling by 2**: only $\lambda = 2$, yet **every** vector is an eigenvector. So a single eigenvalue does not mean a single line of eigenvectors.

## Diagonal matrices and eigenbases

What if the basis vectors happen to be eigenvectors?

Suppose $\hat{\imath}$ is scaled by $-1$ and $\hat{\jmath}$ by $2$. Then the matrix is

$$
\begin{bmatrix} -1 & 0 \\ 0 & 2 \end{bmatrix}.
$$

**Only the diagonal is non-zero.** Such a matrix is called **diagonal**, and its meaning is direct: each basis vector is merely scaled, by the number on the diagonal.

Diagonal matrices are a pleasure to work with. Take powers: since the matrix only scales each basis vector by its eigenvalue, applying it 100 times scales each basis vector by the 100th power of that eigenvalue, so

$$
\begin{bmatrix} -1 & 0 \\ 0 & 2 \end{bmatrix}^{100}
= \begin{bmatrix} 1 & 0 \\ 0 & 2^{100} \end{bmatrix}.
$$

Try the 100th power of a non-diagonal matrix instead and it is a nightmare.

### The eigenbasis

Usually the basis vectors are not eigenvectors. But if there are enough eigenvectors to span the whole space, you can **change basis** and use them as your new basis.

The recipe is the previous chapter's: stack the eigenvectors as columns of a change-of-basis matrix $P$; then

$$
P^{-1} A P
$$

is the same transformation in the new basis. And because the new basis vectors are eigenvectors, this matrix **must be diagonal**, with the eigenvalues down the diagonal.

Such a basis is called an **eigenbasis**.

So computing high powers has a standard route: switch to an eigenbasis, take the power of the diagonal form, switch back. The prerequisite is having enough eigenvectors — a shear fails, since its eigenvectors occupy only a line and cannot span the plane.

## What this chapter establishes

- Eigenvectors stay on their own span under the transformation; the eigenvalue is the stretch factor.
- The factor may be negative or fractional; what matters is that the direction does not change.
- For a 3D rotation, an eigenvector gives the axis, with eigenvalue 1.
- Solving: $A\vec{v}=\lambda\vec{v}$ → $(A-\lambda I)\vec{v}=0$ → $\det(A-\lambda I)=0$.
- A 2D transformation need not have real eigenvalues: a 90-degree rotation gives $\lambda^2+1$.
- One eigenvalue may correspond to a whole line or even the whole plane of eigenvectors.
- When the basis vectors are eigenvectors, the matrix is diagonal and powers are trivial.
- If an eigenbasis exists, $P^{-1}AP$ is diagonal with the eigenvalues on the diagonal.
- Not every transformation has an eigenbasis — a shear has too few eigenvectors to span the space.

## Check your understanding

**1. Why is "staying on its own span" the essence of an eigenvector rather than "being stretched"?**

Answer: because stretching is only one consequence of staying on the line. The real criterion is that the direction does not change: the image still lies on the line through the origin. Whether the factor is above 1 (stretch), between 0 and 1 (squash), negative (flip then scale), or exactly 1 (unchanged) does not affect the status. The definition captures "the transformation produces no turning in this direction."

**2. Why does finding eigenvalues require $\det(A-\lambda I)=0$?**

Answer: because $(A-\lambda I)\vec{v}=\vec{0}$ must have a non-zero solution. A matrix sends a non-zero vector to zero precisely when it flattens space into a lower dimension (otherwise only the zero vector maps to zero), and that flattening is exactly a zero determinant. So a zero determinant is necessary and sufficient for a non-zero eigenvector to exist, and solving that equation yields all possible eigenvalues.

**3. Why does a 90-degree rotation have no real eigenvectors?**

Answer: geometrically, the rotation turns every non-zero vector off its original line, so no direction is preserved. Algebraically, the determinant of $A-\lambda I$ is $\lambda^2+1$, which has no real roots. The two agree: no real eigenvalue means no real eigenvector. This also shows that "every 2D transformation has an eigenvector" is false.

**4. Why does "only one eigenvalue" not imply "eigenvectors occupy only one line"?**

Answer: because the two facts are independent; it depends on the transformation. The shear $\begin{bmatrix}1&1\\0&1\end{bmatrix}$ has only $\lambda=1$, and its eigenvectors really do occupy just the $x$-axis. But uniform scaling $\begin{bmatrix}2&0\\0&2\end{bmatrix}$ also has only one eigenvalue, 2, yet every vector in the plane is an eigenvector. So the size of the eigenvector set is a question about the dimension of the eigenspace, not about how many eigenvalues exist.

**5. Why must the matrix be diagonal in an eigenbasis?**

Answer: because in the new basis, the $k$-th column records where the $k$-th basis vector lands. Since the new basis vectors are eigenvectors, each lands on a multiple of itself — along its own direction, scaled by $\lambda_k$. Written in the new basis's own coordinates, that landing spot is $(0,\dots,\lambda_k,\dots,0)$, with only the $k$-th component non-zero. Assembling all the columns gives a diagonal matrix whose diagonal entries are the eigenvalues.
