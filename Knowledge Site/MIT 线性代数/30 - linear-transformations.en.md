---
slug: "30-linear-transformations"
title: "Linear Transformations and Their Matrices: Transformation First, Coordinates Second"
summary: "A linear transformation is a coordinate-free map preserving addition and scaling; once input and output bases are chosen it becomes a matrix, whose j-th column is the coordinate vector of T(v_j)."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "linear-transformation"
  - "change-of-basis"
sources:
  - kind: "video"
    title: "30. Linear Transformations and Their Matrices"
    url: "https://www.youtube.com/watch?v=Ts3o2I8_Mxc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Reversing the usual order

Many linear algebra courses start with transformations and only then introduce matrices. Strang saves this topic for late in the course, when enough machinery exists — bases, coordinates, null spaces, eigenvalues — to understand the same object from several sides.

The central claim:

> **A linear transformation is the object; a matrix is its coordinate representation in a chosen basis.**

A matrix is not a table of numbers that appears from nowhere. It depends on the bases. Change the bases and the same transformation is written as a different matrix.

## What makes a transformation linear

A map $T$ sends vectors from an input space to an output space. It is **linear** exactly when it preserves the two vector operations:

$$
T(v+w)=T(v)+T(w),
$$

$$
T(cv)=c\,T(v).
$$

The two combine into one statement:

$$
T(cv+dw)=c\,T(v)+d\,T(w).
$$

In words: **transforming a linear combination gives the same result as combining the transformed pieces.**

### An immediate consequence

$$
T(0)=0.
$$

Proof: take $v=0$ and $c=3$. Then $T(0)=T(3\cdot0)=3T(0)$, so $2T(0)=0$, hence $T(0)=0$.

This is the fastest test for non-linearity: if the origin moves, the map cannot be linear.

## Four examples, two of them not linear

### Projection

Project every vector in the plane onto a line through the origin. Doubling $v$ doubles its projection; replacing $v$ by $-v$ reverses the projection. So projection is linear.

The description needs no coordinates and no matrix.

### Rotation

Rotate the plane by $45^\circ$ about the origin. Rotation preserves addition and scaling, so it is linear.

If the input is the outline of a house, the output is the rotated house. A linear transformation acts on a whole region at once: once the boundary points are known to move, the entire figure moves.

### Translation

Send every $v$ to $v+v_0$ for a fixed $v_0$. Natural as it looks, it is **not linear**:

$$
T(2v)=2v+v_0\neq 2(v+v_0)=2v+2v_0.
$$

More directly, $T(0)=v_0\neq0$: the origin moved.

> This is why an affine map (a linear map plus a translation) needs one extra coordinate before it can be written as a matrix.

### Length

Send a vector to its length $\lVert v\rVert$. It satisfies $T(0)=0$ and $T(2v)=2T(v)$, but

$$
T(-v)=\lVert -v\rVert=\lVert v\rVert\neq -T(v).
$$

Scaling by a negative number fails, so it is not linear.

## The linear transformations matrices produce

For any matrix $A$, the map

$$
T(v)=Av
$$

is linear, because matrix multiplication distributes over addition and commutes with scaling:

$$
A(v+w)=Av+Aw,\qquad A(cv)=cAv.
$$

Conversely, in finite dimensions, **every linear transformation comes from some matrix** — once bases are chosen.

The shape of the matrix is fixed by the dimensions: a map from $\mathbb R^3$ to $\mathbb R^2$ corresponds to a $2\times3$ matrix.

## Knowing a basis is enough

This is the key structural fact of the lecture.

Let $v_1,\dots,v_n$ be a basis of the input space. Every input has a unique expansion

$$
v=c_1v_1+\cdots+c_nv_n.
$$

By linearity,

$$
T(v)=c_1T(v_1)+\cdots+c_nT(v_n).
$$

So knowing what $T$ does to the basis vectors determines what it does to every vector.

Conversely, those values are all that must be specified: $n$ basis vectors, each with $m$ output coordinates, give $mn$ numbers — exactly an $m\times n$ matrix.

## Coordinates come from a basis

In the standard basis, the entries of $\begin{bmatrix}3\\2\\4\end{bmatrix}$ are its coordinates, because the basis $e_1,e_2,e_3$ is implicit.

But any basis will do. For a basis $v_1,\dots,v_n$, the **coordinates** of $v$ are the unique coefficients $c_1,\dots,c_n$ with

$$
v=c_1v_1+\cdots+c_nv_n.
$$

Change the basis and the coordinates change. The same vector has different coordinates; the same transformation has different matrices.

## The rule for constructing the matrix

Let:

- the input space $\mathbb R^n$ have basis $v_1,\dots,v_n$;
- the output space $\mathbb R^m$ have basis $w_1,\dots,w_m$.

The $j$-th column of $A$ is obtained as follows:

1. Apply $T$ to the $j$-th input basis vector, producing $T(v_j)$.
2. Expand it in the output basis:

$$
T(v_j)=a_{1j}w_1+a_{2j}w_2+\cdots+a_{mj}w_m.
$$

3. The coefficients $\begin{bmatrix}a_{1j}\\ \vdots\\ a_{mj}\end{bmatrix}$ form the $j$-th column.

The resulting matrix satisfies: **input coordinates multiplied by $A$ give output coordinates**.

### Why the j-th column is exactly that

Take the input coordinate vector $(0,\dots,1,\dots,0)$ with a one in position $j$. The corresponding input vector is $v_j$. Multiplying by $A$ returns the $j$-th column. By construction, that column is the output coordinate vector of $T(v_j)$. The two agree.

It holds for every basis vector, and by linearity it holds for every vector.

## Example one: the same projection, two bases

Project the plane onto the $45^\circ$ line.

### In the eigenvector basis

Take

$$
v_1=\frac{1}{\sqrt2}\begin{bmatrix}1\\1\end{bmatrix}\quad(\text{along the line}),\qquad
v_2=\frac{1}{\sqrt2}\begin{bmatrix}1\\-1\end{bmatrix}\quad(\text{perpendicular}).
$$

Use this basis for both input and output.

- $T(v_1)=v_1$, since a vector along the line is unchanged;
- $T(v_2)=0$, since the perpendicular component is annihilated.

So

$$
T(v_1)=1\cdot v_1+0\cdot v_2,\qquad
T(v_2)=0\cdot v_1+0\cdot v_2,
$$

and the matrix is

$$
A=\begin{bmatrix}1&0\\0&0\end{bmatrix}.
$$

Diagonal, with the eigenvalues $1$ and $0$ on the diagonal. **The eigenvector basis is the good basis**: it writes the transformation in its simplest form.

### In the standard basis

Take $e_1=\begin{bmatrix}1\\0\end{bmatrix}$ and $e_2=\begin{bmatrix}0\\1\end{bmatrix}$ for both input and output.

The projection matrix onto the line through $a=\begin{bmatrix}1\\1\end{bmatrix}$ is

$$
P=\frac{aa^{\mathsf T}}{a^{\mathsf T}a}
=\frac{1}{2}\begin{bmatrix}1\\1\end{bmatrix}\begin{bmatrix}1&1\end{bmatrix}
=\begin{bmatrix}\frac12&\frac12\\[2pt]\frac12&\frac12\end{bmatrix}.
$$

Check:

$$
P\begin{bmatrix}1\\0\end{bmatrix}
=\begin{bmatrix}\frac12\\[2pt]\frac12\end{bmatrix},
\qquad
P\begin{bmatrix}0\\1\end{bmatrix}
=\begin{bmatrix}\frac12\\[2pt]\frac12\end{bmatrix}.
$$

Both standard basis vectors land on the line, as projection requires.

One transformation, two matrices: $\operatorname{diag}(1,0)$ in the eigenvector basis, $\frac12\begin{bmatrix}1&1\\1&1\end{bmatrix}$ in the standard basis. The matrix changes; the transformation does not.

## Example two: differentiation is linear

Let the input space be polynomials of degree at most two,

$$
p(x)=c_1+c_2x+c_3x^2,
$$

with basis $1,x,x^2$. Let the output space be polynomials of degree at most one, with basis $1,x$.

Differentiation gives

$$
\frac{d}{dx}p(x)=c_2+2c_3x.
$$

Following the rule:

- $T(1)=0$, with output coordinates $\begin{bmatrix}0\\0\end{bmatrix}$;
- $T(x)=1$, with output coordinates $\begin{bmatrix}1\\0\end{bmatrix}$;
- $T(x^2)=2x$, with output coordinates $\begin{bmatrix}0\\2\end{bmatrix}$.

So the matrix is

$$
D=\begin{bmatrix}0&1&0\\0&0&2\end{bmatrix}.
$$

Check:

$$
D\begin{bmatrix}c_1\\c_2\\c_3\end{bmatrix}
=\begin{bmatrix}c_2\\2c_3\end{bmatrix},
$$

exactly the coordinates of the derivative.

> Background: differentiation is efficient precisely because it is linear. Knowing the derivatives of a few basic functions lets you differentiate every linear combination. That is the structural reason the differentiation rules work.

## Matrix operations as transformation operations

Once matrices are understood as coordinate representations, the operations acquire natural meanings:

- **Matrix multiplication** is composition: apply $B$, then $A$, and the matrix is $AB$.
- **The inverse matrix** is the inverse transformation: it sends outputs back to inputs.
- **Similarity** $M^{-1}AM$ is a change of basis: the same transformation in a new basis.

The row-by-column rule for matrix multiplication is not an arbitrary convention. It is forced by the requirement that composition of transformations compose correctly in coordinates.

## Common mistakes

1. **Treating a translation as linear.** It moves the origin, violating $T(0)=0$.
2. **Believing the matrix is unique.** A matrix depends on the basis; one transformation has many matrices.
3. **Specifying only the input basis.** Constructing the matrix needs both bases; the output basis determines how columns are read off.
4. **Confusing a vector with its coordinates.** A vector is a geometric object; coordinates are its coefficients in a chosen basis.

## Takeaways

- A linear transformation preserves addition and scaling, hence all linear combinations.
- Linearity forces $T(0)=0$; translation and length are not linear.
- Knowing the image of a basis determines the whole transformation.
- With input and output bases chosen, column $j$ of the matrix is the coordinate vector of $T(v_j)$.
- A good basis (the eigenvectors) diagonalizes the matrix; the standard basis is convenient but usually not simple.
- Matrix multiplication, inversion, and similarity correspond to composition, inverse maps, and change of basis.

## Check your understanding

1. Prove $T(0)=0$ from the definition, and explain why translation fails it.
2. Why does "take the length" satisfy the rule for $c=2$ but fail for $c=-2$?
3. Why does knowing the images of a basis determine $T$ on every vector?
4. For the $45^\circ$ projection, what matrices arise in the eigenvector basis and in the standard basis, and why are they similar?
5. What is the null space of the derivative matrix $\begin{bmatrix}0&1&0\\0&0&2\end{bmatrix}$, and what does it correspond to among polynomials?

## How this connects to the course

The previous lecture used SVD to diagonalize any matrix by choosing two orthonormal bases. This one returns to the more basic layer: transformations come before matrices, and matrices depend on bases. The remaining lectures build on this to discuss change of basis, image compression, and the course's overall synthesis.
