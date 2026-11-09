---
slug: "06-determinant"
title: "The Determinant: How Much Space Gets Stretched"
summary: "The determinant is the factor by which a linear transformation scales area (volume in 3D). A zero determinant means space is flattened into a lower dimension; a negative one means orientation is flipped, while the absolute value remains the scaling factor."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [determinant, area-scaling, orientation, linear-dependence]
sources:
  - kind: "video"
    title: "The determinant | Chapter 6, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=Ip3X9LOh2dk"
    author: "3Blue1Brown"
    publishedAt: "2016-08-11"
---

## The thread of the lecture

A linear transformation kneads space. In the process areas change — some regions stretch, others compress.

The question: **can a single number summarize that change?**

Yes. It is called the **determinant**, and it measures how much any region's area gets scaled. In three dimensions it measures volume.

The point of this chapter is not how to compute a determinant but **what it means**. Grant is blunt: understanding the meaning matters far more than the arithmetic.

## Timeline

| Time | Topic |
| --- | --- |
| 0:47 | $\begin{bmatrix}3&0\\0&2\end{bmatrix}$ turns the unit square into a $2\times3$ rectangle |
| 1:18 | A shear turns the square into a parallelogram of area 1 |
| 1:56 | One square's scaling factor applies to every region |
| 2:28 | That factor is the determinant |
| 2:58 | A zero determinant means space has been flattened |
| 3:54 | Negative values: space is flipped, orientation reversed |
| 5:36 | In 3D the determinant scales volume |
| 7:03 | The right-hand rule decides 3D orientation |
| 7:37 | The formula: $ad-bc$ |
| 9:20 | $\det(AB)=\det(A)\det(B)$ |

## The determinant scales area

Start with a simple matrix:

$$
\begin{bmatrix} 3 & 0 \\ 0 & 2 \end{bmatrix}.
$$

It stretches $\hat{\imath}$ by 3 and $\hat{\jmath}$ by 2.

Now watch one particular region: **the unit square spanned by $\hat{\imath}$ and $\hat{\jmath}$**, with a corner at the origin and side length 1.

After the map it becomes a $2\times3$ rectangle. Its area goes from 1 to 6, so the transformation scales area by **6**.

Now try a shear:

$$
\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}.
$$

$\hat{\imath}$ stays put and $\hat{\jmath}$ slides to $(1,1)$. The unit square is pushed into a parallelogram, but its base is still 1 and its height is still 1, so **the area is still 1**.

The shear distorts the shape without changing its area.

![Left: the unit square spanned by î and ĵ, area 1; right: the parallelogram spanned by the columns (3,0) and (1,2), base 3 and height 2, area 6 — exactly the determinant](/images/la06-determinant-en.svg)

*Figure: the area goes from 1 to 6, and that 6 is the determinant — it reports how much space was stretched.*

## Why one square speaks for everything

Only the unit square was computed. Why does it represent every region?

Two steps:

1. **Every grid square scales by the same factor.** Because the map keeps grid lines parallel and evenly spaced, all unit squares are stretched or squashed identically — wherever they sit.
2. **Any shape can be approximated by grid squares.** The smaller the squares, the better the fit.

So if every small square has its area multiplied by one common factor, the assembled shape has its area multiplied by that same factor.

That common factor is the **determinant** of the transformation.

## A zero determinant: space flattened

If the determinant is 0, every region's area becomes 0.

Geometrically there is only one way: **space is crushed into a lower dimension** — a line, or even a point.

Recall chapter 3: when the two columns are linearly dependent, the plane collapses onto a line. Hence

$$
\det = 0 \iff \text{the two columns are linearly dependent}.
$$

This equivalence matters enormously later. It gives a purely algebraic test for a purely geometric question: **did this transformation flatten space?**

And flattening destroys information — a flattened map cannot be undone. That is the geometric meaning of "the matrix is not invertible," which the next chapter develops.

## Negative values: orientation flipped

Everything so far is not quite right: determinants can be negative.

But what would "scaling area by negative 3" mean?

It concerns **orientation**. Some transformations make space look turned over — if 2D space were a sheet of paper, such a map flips it onto its other side.

The basis vectors give a handy test: **initially $\hat{\jmath}$ sits to the left of $\hat{\imath}$**. If after the map $\hat{\jmath}$ sits to the right of $\hat{\imath}$, orientation has been inverted.

When orientation flips, the determinant is negative. Its **absolute value** still reports how much area was scaled.

For instance, the matrix with columns $(1,1)$ and $(2,-1)$ has determinant $-3$: space is flipped and areas scaled by 3.

### Why a negative number is natural

Imagine a continuous process: let $\hat{\imath}$ slowly rotate toward $\hat{\jmath}$.

As they approach each other, every area is squeezed flatter and the determinant heads to 0.

When $\hat{\imath}$ lines up exactly with $\hat{\jmath}$, the determinant is 0.

Then, as $\hat{\imath}$ continues past, does it not feel natural for **the determinant to keep decreasing into negative numbers**? No jump, no reset — just continuation.

## Three dimensions: volume

In 3D the determinant measures how **volume** is scaled.

Watch the unit cube spanned by $\hat{\imath}$, $\hat{\jmath}$, and $\hat{k}$ (volume 1). After the map it becomes a slanted box — a parallelepiped, one of the great names in mathematics.

Since the volume starts at 1, **the determinant equals the volume of that parallelepiped**.

- Determinant 0: space is crushed to a plane, a line, or a point, with zero volume — equivalent to the three columns being linearly dependent.
- Negative determinant: orientation is inverted.

Orientation in 3D is tested with the **right-hand rule**: point your right forefinger along $\hat{\imath}$, your middle finger along $\hat{\jmath}$, and your thumb naturally points along $\hat{k}$. If after the transformation you can still do this with your right hand, orientation is preserved and the determinant is positive; if only the left hand works, orientation flipped and the determinant is negative.

## How to compute it

The 2D formula is short:

$$
\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc.
$$

The intuition: if $b=c=0$ the matrix is a pure scaling, with $a$ the horizontal factor and $d$ the vertical one, so the area factor is plainly $ad$.

If only one of $b$, $c$ is zero, the resulting parallelogram still has base $a$ and height $d$, so the area remains $ad$.

When both are nonzero, the $-bc$ term corrects for the extra area contributed by the diagonal stretch.

Three dimensions has a formula too, but a heavier one. Grant's position: hand computation is learned by practice, not by explanation; the series cares about **meaning**, not speed.

## A lovely property

One question to close:

$$
\det(AB) = \det(A)\det(B).
$$

Verifying it numerically is painful. In the language of transformations it takes one sentence:

> Do $B$ then $A$; areas are first scaled by $\det(B)$, then by $\det(A)$, so the total factor is their product.

That is why the property must hold — it is simply "factors multiply" written another way.

## What this chapter establishes

- The determinant is the factor by which a linear transformation scales area, and volume in 3D.
- It suffices to watch the unit square (or cube) spanned by the basis vectors, since every region scales by the same factor.
- A zero determinant means space is flattened to a lower dimension, equivalent to linearly dependent columns.
- A negative determinant means orientation is flipped (check whether $\hat{\jmath}$ moved to the right of $\hat{\imath}$ in 2D; use the right-hand rule in 3D); the absolute value is the scaling factor.
- The 2D formula is $\det = ad-bc$; 3D has a similar but heavier one.
- $\det(AB)=\det(A)\det(B)$, because composing transformations multiplies their scaling factors.

## Check your understanding

**1. Why does the unit square's area change determine the change for every region?**

Answer: because the map keeps grid lines parallel and evenly spaced, so every unit square in the grid is scaled by the same factor, wherever it lies. Any shape can be approximated arbitrarily well by sufficiently small grid squares. Since every small square's area is multiplied by one common factor, the assembled shape's area is multiplied by that same factor. Hence the unit square's factor is the global factor.

**2. What does a zero determinant mean geometrically, and why is it equivalent to linearly dependent columns?**

Answer: it means space has been crushed into a lower dimension — a line or point in 2D; a plane, line, or point in 3D — so every region's area (or volume) becomes zero. Geometrically, "crushed" means the transformed basis vectors no longer span the whole space, i.e. they are linearly dependent. So $\det = 0$ and "columns linearly dependent" are the algebraic and geometric faces of one fact.

**3. When the determinant is negative, how should "area scaling factor" be read?**

Answer: the actual area scaling is the absolute value; the minus sign records an orientation flip. In 2D this shows up as space being turned over like a sheet of paper, with the concrete test being that $\hat{\jmath}$ moves from the left of $\hat{\imath}$ to its right. So a negative determinant means "flip plus scale by the absolute value," both facts packed into one number.

**4. Why does the determinant pass smoothly through zero into negative values as $\hat{\imath}$ rotates toward $\hat{\jmath}$?**

Answer: because the determinant is a continuous function of the matrix entries, so it cannot jump as the basis vectors move continuously. As the angle between them shrinks, the parallelogram they span flattens and its area tends to zero. Once $\hat{\imath}$ passes $\hat{\jmath}$, orientation flips, and the determinant continues decreasing into negative values. That continuity is the natural origin of the "minus sign means flip" reading.

**5. Explain $\det(AB)=\det(A)\det(B)$ in one sentence.**

Answer: because $AB$ means do $B$ then $A$; $B$ scales every area by $\det(B)$ and $A$ then scales the result by $\det(A)$, so the composed factor is the product. This also shows the property has nothing to do with particular entries — only with the fact that scaling factors multiply.
