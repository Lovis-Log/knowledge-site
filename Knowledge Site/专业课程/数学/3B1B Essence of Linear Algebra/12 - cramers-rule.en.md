---
slug: "12-cramers-rule"
title: "Cramer's Rule: Reading Coordinates as Areas"
summary: "In solving Ax = v, each coordinate of the input can be read as a signed area (a volume in 3D). The transformation scales every area by the same factor, det A — so the coordinate equals the transformed area divided by det A. That is Cramer's rule."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [cramers-rule, determinant, linear-systems, area]
sources:
  - kind: "video"
    title: "Cramer's rule, explained geometrically | Chapter 12, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=jBsC34PxzoM"
    author: "3Blue1Brown"
    publishedAt: "2019-03-17"
---

## The thread of the lecture

Up front: Cramer's rule is not the best way to solve a linear system. Gaussian elimination is always faster.

So why study it? Because it exposes a lovely geometric fact: **each coordinate of the unknown vector can be understood as an area (or volume)**, and the transformation scales all those areas by one common factor, the determinant. Understanding that stitches together determinants, linear transformations, and systems of equations.

## Timeline

| Time | Topic |
| --- | --- |
| 1:28 | The geometric view: known matrix and known output, unknown input |
| 3:18 | A promising but wrong idea: reading coordinates with dot products |
| 4:31 | Only orthonormal (rotation) maps preserve dot products |
| 5:47 | Coordinates as areas: the parallelogram spanned by $\hat{\imath}$ and the input |
| 6:54 | In 3D, coordinates as volumes |
| 8:04 | All areas scale by the same factor, the determinant |
| 8:40 | So $y = $ transformed area $/ \det A$ |
| 9:28 | The same for $x$, replacing the first column with the output |
| 10:13 | That is Cramer's rule |

## The setup

Given

$$
A\vec{x} = \vec{v},
$$

with $A$ and $\vec{v}$ known and $\vec{x}$ unknown. This chapter handles only $\det A \neq 0$, where the solution is unique.

Geometrically: $A$ kneads space and sends $\vec{x}$ to $\vec{v}$. Which $\vec{x}$ lands on $\vec{v}$?

## A promising but wrong idea

In standard coordinates, the $x$-coordinate of $(x,y)$ is its dot product with $\hat{\imath}=(1,0)$, and the $y$-coordinate is its dot product with $\hat{\jmath}=(0,1)$.

So one might hope that, after the transformation, dotting the output with the transformed basis vectors reads off $x$ and $y$.

**It does not work.**

Most linear transformations do not preserve dot products. Two vectors roughly aligned (positive dot product) can be pulled apart until their dot product is negative; two perpendicular vectors (dot product zero) usually stop being perpendicular.

Only a special class preserves dot products: **orthonormal transformations**, the rigid motions such as rotations — basis vectors stay mutually perpendicular and of unit length.

For those matrices solving is indeed trivial:

$$
x = \text{first column} \cdot \vec{v},
\qquad
y = \text{second column} \cdot \vec{v}.
$$

But that is a special case, not a general method.

## Coordinates as areas

So switch to a quantity whose behaviour under the map is controllable: **area**.

![Three parallelograms: the columns (2,1) and (1,1) of A give area 1; replacing the first with (−4,−2) gives −2; replacing the second makes the columns collinear, area 0](/images/la12-cramer-en.svg)

*Figure: swapping a column for v changes the area; the ratio of areas is the unknown — x=−2, y=0.*

Look at the parallelogram spanned by $\hat{\imath}$ and the input $(x,y)$:

- The base is $\hat{\imath}$, of length 1;
- The height is the perpendicular distance from $(x,y)$ to the $x$-axis, which is $|y|$.

So the area is $1 \times |y| = |y|$.

More precisely, it is the **signed** area: taking $\hat{\imath}$ as the first of the two vectors, a negative $y$ gives a negative area. Hence

$$
\text{area}\left(\hat{\imath}, (x,y)\right) = y .
$$

Symmetrically, the parallelogram spanned by $(x,y)$ and $\hat{\jmath}$ has signed area equal to $x$:

$$
\text{area}\left((x,y), \hat{\jmath}\right) = x .
$$

Describing coordinates as areas sounds roundabout, but the payoff is immediate.

## The 3D version

In three dimensions the analogue is **volume**.

The $z$-coordinate of $(x,y,z)$ can be read as the signed volume of the parallelepiped spanned by $\hat{\imath}$, $\hat{\jmath}$, and the vector — because the base (the unit square from $\hat{\imath}$ and $\hat{\jmath}$) has area 1, so the volume equals the height, which is $z$.

The general rule: to read a given coordinate, build a parallelepiped from the vector together with **all basis vectors except the one in that direction**, and take the signed volume. Order matters, because it fixes the sign.

## The key: areas scale uniformly

Now apply $A$.

Those parallelogram areas change — but **all areas scale by the same factor**, namely $\det A$.

Therefore:

- The parallelogram spanned by $\hat{\imath}$ and $(x,y)$ becomes the one spanned by the **first column** and the **output $\vec{v}$**;
- Its area equals $\det A \times y$.

So

$$
y = \frac{\text{area of the transformed parallelogram}}{\det A}.
$$

And that area is computed by a determinant: keep $A$'s first column, replace the second with $\vec{v}$.

$$
y = \frac{\det\begin{bmatrix} a & v_x \\ c & v_y \end{bmatrix}}{\det A}.
$$

## The $x$ coordinate

Symmetrically, the parallelogram spanned by $(x,y)$ and $\hat{\jmath}$ had area $x$.

After the map it is spanned by the **output $\vec{v}$** and the **second column**, with area $\det A \times x$. Hence

$$
x = \frac{\det\begin{bmatrix} v_x & b \\ v_y & d \end{bmatrix}}{\det A},
$$

that is, replace $A$'s first column with $\vec{v}$ and leave the second alone.

## A numerical check

Let

$$
A = \begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix},
\qquad
\vec{v} = \begin{bmatrix} -4 \\ -2 \end{bmatrix}.
$$

Then $\det A = 2\cdot1 - 1\cdot1 = 1$.

By the formulas:

$$
x = \det\begin{bmatrix} -4 & 1 \\ -2 & 1 \end{bmatrix} = -4 + 2 = -2,
$$

$$
y = \det\begin{bmatrix} 2 & -4 \\ 1 & -2 \end{bmatrix} = -4 + 4 = 0.
$$

Check: $2(-2) + 1(0) = -4$ ✓ and $1(-2) + 1(0) = -2$ ✓.

(The video works a different example and obtains $x=3$, $y=2$; the reasoning is identical.)

## That is Cramer's rule

Write the argument generally: for $A\vec{x}=\vec{v}$, the $k$-th unknown is

$$
x_k = \frac{\det(A_k)}{\det(A)},
$$

where $A_k$ is $A$ with its $k$-th column replaced by $\vec{v}$.

This is **Cramer's rule**.

Its value is not computational (Gaussian elimination wins), but conceptual: it translates "solve the system" into "compare volumes."

- Each coordinate of the unknown is itself a signed volume;
- The transformation scales every volume by one factor;
- Dividing the transformed volume by that factor recovers the coordinate.

## What this chapter establishes

- Cramer's rule applies when $\det A \neq 0$, where the solution is unique.
- Reading coordinates by dot products works only for orthonormal (rotation) maps; general maps do not preserve dot products.
- Coordinates can be read geometrically as signed areas (2D) or volumes (3D), built from the vector and the remaining basis vectors.
- A linear transformation scales all areas and volumes by the same factor, $\det A$.
- Each coordinate equals the determinant of $A$ with the corresponding column replaced by the output, divided by $\det A$.
- The rule is of little practical computational value but has a beautiful geometric meaning and ties determinants to linear systems.

## Check your understanding

**1. Why does "dot the output with each column" fail to read off the coordinates?**

Answer: because that method relies on the transformation preserving dot products, which general linear maps do not. Vectors that were aligned can be pulled apart into opposition, perpendicular vectors usually stop being perpendicular, and lengths are stretched or compressed. Only orthonormal transformations — rotations and the like — preserve all dot products, so the method works only in that special case.

**2. Why is the signed area of the parallelogram spanned by î and (x,y) equal to y?**

Answer: its base is $\hat{\imath}$, of length 1, and its height is the perpendicular distance from $(x,y)$ to the $x$-axis, namely $|y|$. Area is base times height, so $|y|$. For orientation, taking $\hat{\imath}$ as the first vector makes $y>0$ correspond to positive orientation and $y<0$ to negative, so the signed area is exactly $y$.

**3. Why does the area become exactly $\det A$ times larger after the map?**

Answer: because the determinant is by definition the factor by which area (or volume) is scaled. A linear map scales every grid square by the same factor, so every region's area is multiplied by that one number, $\det A$. Hence a parallelogram of area $y$ becomes one of area $y \cdot \det A$.

**4. Why is the numerator of Cramer's rule the determinant of a matrix with one column replaced?**

Answer: because the transformed parallelogram is spanned by the output vector and by whichever column was not replaced. Its area is the determinant with those two vectors as columns. Which column gets replaced depends on the coordinate being found: for $y$, the original pair was $\hat{\imath}$ and the input, becoming "first column and output," so the second column is replaced; for $x$ it is the first column that is replaced.

**5. If faster methods exist, why learn Cramer's rule?**

Answer: because its value is conceptual rather than computational. It links "solving a system" with "comparing signed volumes," letting the determinant's geometric meaning do direct work in solving equations. That connection helps integrate transformations, determinants, and systems into one picture. It is also a convenient closed-form expression in theoretical work, for instance when studying how solutions depend on parameters.
