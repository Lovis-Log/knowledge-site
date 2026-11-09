---
slug: "05-3d-transformations"
title: "Three-Dimensional Linear Transformations: Nine Numbers Are Enough"
summary: "The 3D story is the 2D story unchanged: grid lines stay parallel and evenly spaced, the origin stays fixed, and the map is fully determined by where î, ĵ, and k̂ land. Stack those three landing spots as columns and nine numbers pin down a motion of all space."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [three-dimensions, linear-transformation, basis-vectors, rotation]
sources:
  - kind: "video"
    title: "Three-dimensional linear transformations | Chapter 5, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=rHLEWRxRGiM"
    author: "3Blue1Brown"
    publishedAt: "2016-08-10"
---

## The thread of the lecture

This is a short chapter with one job: carry the previous two chapters' conclusions into three dimensions unchanged.

Nothing new appears in the move, but one number is worth noticing: **two dimensions need four numbers, three dimensions need nine**. Nine numbers completely determine a 3D linear transformation — still a fact worth being surprised by.

## Timeline

| Time | Topic |
| --- | --- |
| 0:52 | A 3D linear transformation: grid parallel and evenly spaced, origin fixed |
| 1:38 | The three basis vectors: $\hat{\imath}$, $\hat{\jmath}$, $\hat{k}$ |
| 2:05 | Recording the three landing spots as the columns of a $3\times3$ matrix |
| 2:17 | Example: a 90-degree rotation about the $y$-axis |
| 2:56 | Where $(x,y,z)$ lands: weight the three columns by the coordinates |
| 3:32 | Multiplying two $3\times3$ matrices composes two transformations |

## Linear transformations in 3D

As in 2D, a 3D linear transformation kneads space while requiring:

- grid lines stay parallel and evenly spaced;
- the origin stays fixed.

You can still imagine every point moving in its capacity as a vector, watching all inputs slide to their outputs.

But drawing the whole 3D grid gets messy. The practical move: **follow only the three basis vectors**.

## The three basis vectors

Three standard basis vectors:

![Left: 3D axes and a 2×1×1 box with coloured arrows for î, ĵ, k̂; right: after a 90° turn about y the box is 1×1×2, with î pointing to −z and k̂ to +x](/images/la05-3d-rotation-en.svg)

*Figure: a 3D linear map is fixed by where the three basis vectors land; those landings are the columns.*

$$
\hat{\imath} = \begin{bmatrix}1\\0\\0\end{bmatrix},
\qquad
\hat{\jmath} = \begin{bmatrix}0\\1\\0\end{bmatrix},
\qquad
\hat{k} = \begin{bmatrix}0\\0\\1\end{bmatrix}.
$$

They point along $x$, $y$, and $z$ respectively.

Keep the original axes in the background as a reference, and you can read off where each basis vector lands.

Stack the three landing spots as columns and you get a $3\times3$ matrix:

$$
\begin{bmatrix}
| & | & | \\
\text{where } \hat{\imath} \text{ lands} & \text{where } \hat{\jmath} \text{ lands} & \text{where } \hat{k} \text{ lands} \\
| & | & |
\end{bmatrix}.
$$

**Nine numbers, a complete description of a 3D linear transformation.**

## Example: rotate 90 degrees about the $y$-axis

Take the transformation that rotates space 90 degrees counterclockwise about the $y$-axis.

- $\hat{\imath}$ swings to the negative $z$ direction: $(0,0,-1)$;
- $\hat{\jmath}$ lies on the axis, so it stays at $(0,1,0)$;
- $\hat{k}$ swings to the positive $x$ direction: $(1,0,0)$.

Hence the matrix is

$$
\begin{bmatrix}
0 & 0 & 1 \\
0 & 1 & 0 \\
-1 & 0 & 0
\end{bmatrix}.
$$

Its three columns are the three landing spots, in order.

## How to use it

Given $(x,y,z)$, where does it land?

Exactly as in 2D: **use the coordinates as weights and add the three columns**.

$$
x\begin{bmatrix}0\\0\\-1\end{bmatrix}
+ y\begin{bmatrix}0\\1\\0\end{bmatrix}
+ z\begin{bmatrix}1\\0\\0\end{bmatrix}
= \begin{bmatrix} z \\ y \\ -x \end{bmatrix}.
$$

The reason is the same: $(x,y,z)$ means $x\hat{\imath}+y\hat{\jmath}+z\hat{k}$, and linearity guarantees "combine then transform" equals "transform then combine."

So the rule for matrix-vector multiplication has not changed; only the number of terms went from two to three.

## Composition

Multiplying two $3\times3$ matrices means what it did in 2D: **apply the right-hand transformation first, then the left-hand one**.

The arithmetic is the same too: each column of the product is the left matrix times the corresponding column of the right matrix.

This matters a great deal in computer graphics and robotics. A 3D rotation is hard to describe in words, but breaking it into simple rotations about individual axes and composing them by matrix multiplication makes it tractable. An object's changing orientation in an animation is typically a chain of such matrix products.

## What this chapter establishes

- The test for linearity in 3D is the same: grid parallel and evenly spaced, origin fixed.
- The landing spots of $\hat{\imath}$, $\hat{\jmath}$, and $\hat{k}$ determine the transformation completely.
- Stacking them as columns gives a $3\times3$ matrix: nine numbers for the whole map.
- A 90-degree rotation about the $y$-axis is $\begin{bmatrix}0&0&1\\0&1&0\\-1&0&0\end{bmatrix}$.
- Matrix-vector multiplication still weights the columns and adds, now with three terms.
- Multiplying two $3\times3$ matrices is still right-then-left composition, the basic tool for describing 3D rotation in graphics and robotics.

## Check your understanding

**1. Why does a 3D linear transformation need only nine numbers?**

Answer: because every vector is $x\hat{\imath}+y\hat{\jmath}+z\hat{k}$, and linearity makes its image $xT(\hat{\imath})+yT(\hat{\jmath})+zT(\hat{k})$. Each of the three images needs three coordinates, nine in total; knowing them determines the image of any vector. The nine is not a coincidence but "three basis vectors times three components each."

**2. In a 90-degree rotation about the $y$-axis, why does $\hat{\jmath}$ stay put?**

Answer: because the rotation axis is the $y$-axis, and any vector lying on the axis is unchanged by the rotation. $\hat{\jmath}$ points exactly along the positive $y$-axis, so it lands back at $(0,1,0)$. This also gives a check: for a rotation about any axis, the column belonging to the basis vector on that axis should be that unit vector itself.

**3. Why does "weight the columns by the coordinates" still hold in 3D?**

Answer: because it rests on linearity, not on dimension. The vector $(x,y,z)$ is a linear combination of the basis vectors, and a linear map preserves combination structure, so the image is the same combination of the images of the basis vectors. In 2D that is two terms, in 3D three; higher dimensions follow identically, with more columns.

**4. Why is 3D matrix multiplication especially important in graphics?**

Answer: because orientations in space are hard to describe precisely in words, yet any of them can be decomposed into simple rotations about coordinate axes. Each simple rotation has an easy matrix, and a complicated orientation is their product. The computer only needs matrix multiplications to compute each vertex's new position — the basic operation of a rendering pipeline.

**5. If the three columns of a 3D matrix are coplanar (linearly dependent), what happens geometrically?**

Answer: all of 3D collapses onto a plane through the origin (or something of even lower dimension). The three landing spots span only a two-dimensional subspace, so every vector's image lies in that plane and one dimension is crushed out of existence. This is the dimension-raised version of "two collinear columns squash the plane onto a line," and the geometric meaning of a zero 3D determinant.
