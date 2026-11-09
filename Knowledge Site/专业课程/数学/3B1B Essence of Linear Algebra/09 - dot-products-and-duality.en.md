---
slug: "09-dot-products-and-duality"
title: "Dot Products and Duality: A Vector Is a Projection in Disguise"
summary: "The dot product computes by multiplying matching coordinates and adding; geometrically it multiplies a projection's length by the other vector's length. Why they agree: every linear map from space to the number line corresponds to a unique vector, and applying that map is exactly dotting with it."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [dot-product, duality, projection, linear-transformation]
sources:
  - kind: "video"
    title: "Dot products and duality | Chapter 9, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=LyGKycYT2v0"
    author: "3Blue1Brown"
    publishedAt: "2016-08-25"
---

## The thread of the lecture

Everyone learns two definitions of the dot product:

- **Numerically**: multiply matching coordinates and add them all up;
- **Geometrically**: project one vector onto the other, then multiply the projection's length by the other vector's length.

The two look unrelated — one is pure arithmetic, the other pure geometry. Why are they the same operation?

The answer is **duality**. The route:

1. A linear map from space to the number line must be representable by a $1\times2$ matrix;
2. Multiplying a $1\times2$ matrix by a vector is formally a dot product;
3. Projecting onto a diagonally placed number line is such a linear map;
4. Therefore "projection" and "dot product" are forced to be the same thing.

## Timeline

| Time | Topic |
| --- | --- |
| 1:24 | The geometric reading: project $w$ onto $v$, multiply lengths |
| 2:11 | The reading is asymmetric, yet order does not matter |
| 4:21 | Duality enters: first study maps from several dimensions to the line |
| 4:59 | Linearity test: evenly spaced points stay evenly spaced |
| 5:41 | A $1\times2$ matrix: each basis vector lands on a single number |
| 6:26 | Multiplying a $1\times2$ matrix is formally a dot product |
| 7:29 | Place the number line diagonally; projection defines a linear map |
| 8:58 | Symmetry gives the matrix's two columns |
| 10:21 | Dotting with a unit vector gives the projection's length |
| 11:49 | Every map to the line corresponds to a unique vector |

## Two definitions

**Numerically**: multiply matching components and add.

$$
\begin{bmatrix}6\\2\\8\\3\end{bmatrix}\cdot\begin{bmatrix}1\\8\\5\\3\end{bmatrix}
= 6\cdot1 + 2\cdot8 + 8\cdot5 + 3\cdot3 .
$$

**Geometrically**: project $w$ onto the line through the origin in the direction of $v$, then multiply the projection's length by $v$'s length.

$$
v \cdot w = \left|v\right| \times \left(\text{length of } w \text{ projected onto } v\right).
$$

Signs follow naturally:

- Roughly the same direction → positive;
- Perpendicular → zero projection, zero dot product;
- Roughly opposite → the projection points against $v$, so negative.

## Why order does not matter

The geometric reading is wildly asymmetric: $v$ is the reference line, $w$ the thing being projected. Yet $v\cdot w = w\cdot v$.

When the two lengths are equal: projecting $w$ onto $v$ and projecting $v$ onto $w$ are mirror images, so the products agree.

When lengths differ, symmetry breaks, but scaling settles it:

- Double $v$. Projecting $w$ onto $v$ leaves the projection's length unchanged while the reference vector doubles, so the dot product doubles;
- Project $v$ onto $w$ instead, and now the projection's length doubles while the reference stays fixed — again the dot product doubles.

Under both readings the effect of scaling is the same, so swapping the order changes nothing.

## A stranger question

The real puzzle is not order but this: **why should "multiply matching coordinates and add" have anything to do with projection?**

To answer it, study a special class of linear maps: **from two dimensions to the one-dimensional number line**.

Such a function eats a 2D vector and returns a number. Its linearity test is vivid: **a line of evenly spaced points stays evenly spaced after landing on the number line**. If some line comes out bunched unevenly, the map is not linear.

As always, the map is determined by where $\hat{\imath}$ and $\hat{\jmath}$ land. But now each basis vector lands on a **single number**, so each column of the matrix has one entry — a $1\times2$ matrix.

For example, let $\hat{\imath}\mapsto1$ and $\hat{\jmath}\mapsto-2$. Then $(4,3) = 4\hat{\imath}+3\hat{\jmath}$ lands on

$$
4\cdot1 + 3\cdot(-2) = -2 .
$$

In matrix form,

$$
\begin{bmatrix}1 & -2\end{bmatrix}\begin{bmatrix}4\\3\end{bmatrix} = -2 .
$$

## A vector on its side

Look at that expression: $\begin{bmatrix}1&-2\end{bmatrix}$ is just a vector lying on its side.

Indeed, a $1\times2$ matrix and a 2D vector correspond naturally: tip the vector over and you have the matrix; stand the matrix up and you have the vector.

Numerically that is a typesetting difference. Geometrically it hints at something striking: there is a connection between **linear maps to the number line** and **vectors themselves**.

## The matrix a projection produces

![A number line placed diagonally in the plane, with the unit vector û pointing at 45 degrees; the vector v = (2,1) is projected perpendicularly onto it, the landing spot marked by a thick red segment about 2.12 long](/images/la09-dot-projection-en.svg)

*Figure: the projection lands on that diagonal line, and the number read off is the dot product û · v; the right panel writes the same move as a 1×2 matrix times a vector.*

Now do something that looks unrelated.

Take a copy of the number line and place it **diagonally** in the plane, with 0 at the origin and 1 somewhere out along it. Name the unit vector from the origin to "1" as $\hat{u}$.

Define a function: take any vector in the plane, **project it perpendicularly** onto that diagonal line, and read off the number where it lands.

This is a function from 2D to 1D. It is linear too — evenly spaced points project to evenly spaced points.

So it must correspond to some $1\times2$ matrix. The only question is which.

### Finding the columns by symmetry

The matrix's columns are the numbers where $\hat{\imath}$ and $\hat{\jmath}$ land under projection.

Here is the key step: **$\hat{\imath}$ and $\hat{u}$ are both unit vectors.**

So "project $\hat{\imath}$ onto the line through $\hat{u}$" and "project $\hat{u}$ onto the $x$-axis" are geometrically symmetric — two unit vectors at the same angle, hence the same projection length.

And projecting $\hat{u}$ onto the $x$-axis merely reads off $\hat{u}$'s $x$-coordinate.

Therefore: **the number $\hat{\imath}$ lands on equals the $x$-coordinate of $\hat{u}$**.

By the same argument, the number $\hat{\jmath}$ lands on equals $\hat{u}$'s $y$-coordinate.

So the matrix's two columns are exactly $\hat{u}$'s two coordinates:

$$
\begin{bmatrix} u_x & u_y \end{bmatrix}.
$$

Multiplying this matrix by any vector gives

$$
u_x \cdot x + u_y \cdot y,
$$

**which is precisely the dot product with $\hat{u}$**.

## Unit vectors and the rest

So dotting with a **unit vector** equals projecting onto its line and taking the length.

What about a non-unit vector? Scale $\hat{u}$ by 3 and every entry of the matrix scales by 3. Linearity then says the map becomes "project first, then multiply the landing number by 3."

Hence dotting with any vector $v$ means:

1. Project the other vector onto the line through $v$;
2. Multiply the projection's length by $v$'s length.

That is exactly the geometric definition we started from.

## Duality

Close the loop:

- Projecting onto a diagonal number line is a linear map from 2D to 1D;
- Every linear map has a $1\times2$ matrix;
- Multiplying a $1\times2$ matrix by a vector is a dot product with some 2D vector.

So **the map must correspond to some vector**, however it was originally defined.

And conversely: **every linear map from space to the number line corresponds to a unique vector**, such that applying the map and dotting with that vector are the same operation.

That is **duality**. In Grant's phrasing:

> The dual of a vector is the linear transformation it encodes; the dual of a linear map to one dimension is a certain vector in that space.

Duality appears all over mathematics and resists a tidy definition, but the gist is: **a natural yet surprising correspondence between two kinds of mathematical object**.

## Why it matters

On the surface the dot product is a handy geometric tool: compute projections, test whether vectors point the same way. That is probably the thing most worth remembering.

Deeper down, **the dot product is how a vector gets translated into a transformation**.

Numerically it looks like two computations that happen to resemble each other. But in mathematics a vector is sometimes better understood not as an arrow in space but as the physical embodiment of a linear map — because our minds find arrows far easier to picture than "crushing all of space onto a line."

The cross product, next chapter, is another lovely instance of this duality in action.

## What this chapter establishes

- The dot product is numerically a sum of products of matching components, and geometrically a projection length times a reference length.
- Order does not matter: symmetry handles equal lengths, scaling handles the rest.
- A linear map from space to the number line is characterized by "evenly spaced points stay evenly spaced" and represented by a $1\times2$ matrix.
- Multiplying a $1\times2$ matrix by a vector is formally a dot product with the tipped-over matrix.
- Projecting onto a diagonal number line is a linear map whose matrix columns are $\hat{u}$'s coordinates, by unit-vector symmetry.
- Dotting with a unit vector gives the projection's length; with a general vector, the projection length times that vector's length.
- Duality: each map to the line corresponds to a unique vector, and applying the map equals dotting with it.
- The deep meaning of the dot product is translating a vector into the language of transformations.

## Check your understanding

**1. Why are the two definitions of the dot product equivalent?**

Answer: because "project onto a diagonal number line" is a linear map from 2D to 1D, and any such map can be written as a $1\times2$ matrix times a vector. Unit-vector symmetry shows the matrix's two columns are exactly the coordinates of that line's unit vector, so matrix multiplication becomes "multiply matching coordinates and add." Geometrically the map's effect is projection (scaled by the reference vector's length). So both definitions describe one operation.

**2. Why is projection onto a diagonal number line linear?**

Answer: because projection preserves even spacing: points equally spaced along one line project to points equally spaced along another, with spacing shrunk by the same factor (the cosine of the angle between the lines). There is no bunching or spreading. It also sends the zero vector to zero, since the origin lies on the number line — both requirements of linearity.

**3. When finding the first column by symmetry, why do "project î onto û" and "project û onto the x-axis" give the same length?**

Answer: because both are projections between two unit vectors at the same angle. If $\hat{\imath}$ makes angle $\theta$ with $\hat{u}$, the projection length is $\cos\theta$; $\hat{u}$ also makes angle $\theta$ with the $x$-axis, so its projection length is $\cos\theta$ as well. Equal lengths, both unit — perfectly symmetric. And $\hat{u}$'s projection onto the $x$-axis is just its $x$-coordinate.

**4. Why does dotting with a general (non-unit) vector equal projection length times that vector's length?**

Answer: because scaling a vector by $k$ scales every entry of its $1\times2$ matrix by $k$. By linearity the map's effect becomes "project the input onto that direction, then multiply the landing number by $k$." And $k$ is precisely the vector's length relative to the unit vector. So the dot product with $v$ equals the projection onto $v$'s direction times $|v|$.

**5. What exactly does duality refer to in this argument?**

Answer: the one-to-one correspondence between "linear maps to one dimension" and "vectors in the space." Each such map has a unique vector such that applying the map equals dotting with that vector; conversely each vector defines such a map. Two apparently different kinds of object — a mapping and an arrow — are tied together by one and the same $1\times2$ matrix, which is duality in concrete form.
