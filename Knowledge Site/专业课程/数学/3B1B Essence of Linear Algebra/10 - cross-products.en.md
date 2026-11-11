---
slug: "10-cross-products"
title: "Cross Products: Signed Area and the Right-Hand Rule"
summary: "In two dimensions the cross product returns the signed area of the parallelogram the two vectors span, with the sign set by orientation and the arithmetic done by a determinant. In three dimensions it returns a vector: length equal to that area, direction perpendicular, pointing fixed by the right-hand rule."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [cross-product, determinant, orientation, right-hand-rule]
sources:
  - kind: "video"
    title: "Cross products | Chapter 10, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=eu6i7WJeinw"
    author: "3Blue1Brown"
    publishedAt: "2016-09-01"
---

## The thread of the lecture

There are two versions of the cross product, and they are easy to confuse:

- **The 2D version** returns a **number**: the signed area of the parallelogram spanned by the two vectors;
- **The 3D version** returns a **vector**: its length is that area, and its direction is perpendicular to the plane.

This chapter does the 2D version first (it is just a determinant), then the 3D version (the real cross product), and finally explains why the "put the basis vectors in the matrix" recipe is not mere notation.

## Timeline

| Time | Topic |
| --- | --- |
| 1:10 | The 2D cross product is the parallelogram's signed area |
| 1:21 | Negative when $v$ is to the left of $w$ |
| 2:37 | Computing it with a determinant whose columns are $v$ and $w$ |
| 3:32 | A negative determinant means orientation was flipped |
| 4:01 | Example: $(-3,1)$ and $(2,1)$ give $-5$ |
| 5:12 | The real cross product: two 3D vectors give one 3D vector |
| 5:31 | Length equals the parallelogram's area |
| 5:50 | The right-hand rule fixes the direction |
| 6:55 | The 3×3 determinant recipe: basis vectors in the first column |
| 7:51 | Behind that "notational trick" lies duality |

## The 2D version: signed area

Given two 2D vectors $v$ and $w$, they span a parallelogram.

The **magnitude** of the 2D cross product is that parallelogram's area; the **sign** comes from orientation:

- $v$ to the **right** of $w$: positive, equal to the area;
- $v$ to the **left** of $w$: negative, the negative of the area.

So **order matters**:

$$
w \times v = -(v \times w).
$$

How to remember which side is positive? Use the basis vectors: **$\hat{\imath}$ lies to the right of $\hat{\jmath}$, and $\hat{\imath}\times\hat{\jmath}$ is defined to be positive**. The order of the basis vectors defines orientation, and everything else follows.

## Computing it with a determinant

To get the area without being told, use a determinant.

Put $v$'s coordinates in the first column and $w$'s in the second, then take the determinant:

$$
v \times w = \det\begin{bmatrix} v_x & w_x \\ v_y & w_y \end{bmatrix}.
$$

Why a determinant?

Because the matrix with columns $v$ and $w$ is exactly the linear transformation sending $\hat{\imath}$ to $v$ and $\hat{\jmath}$ to $w$. The determinant measures by what factor areas are scaled, and the reference region is the unit square spanned by $\hat{\imath}$ and $\hat{\jmath}$ (area 1).

After the map, that unit square becomes precisely the parallelogram spanned by $v$ and $w$. Since the starting area is 1, the determinant hands you the final area directly.

The sign comes for free: if $v$ is left of $w$, orientation was flipped during the map, so the determinant is negative — exactly as in the previous chapter.

### An example

Let $v = (-3,1)$ and $w = (2,1)$. Then

$$
\det\begin{bmatrix} -3 & 2 \\ 1 & 1 \end{bmatrix}
= (-3)(1) - (2)(1) = -5.
$$

The parallelogram's area is 5, and since $v$ lies to the left of $w$, the cross product is $-5$.

## Two intuitions

**Largest when perpendicular**: the closer the two vectors are to perpendicular, the fatter the parallelogram and the larger the cross product; as their directions align, the area shrinks toward zero.

**Scaling is linear**: triple one vector and the area triples, so $3v \times w = 3(v\times w)$.

Both properties say the cross product is linear in each argument — which is exactly why a determinant can express it.

## The 3D version: the real cross product

Strictly speaking, that number is not "the" cross product. The real one takes two **3D** vectors and returns a **3D vector**.

![Left: the parallelogram spanned by v=(3,1) and w=(1,2), area 5; right: the square spanned by v=(0,0,2) and w=(0,2,0), with the cross product pointing along −x and length 4](/images/la10-cross-product-en.svg)

*Figure: the 2D cross product is a signed area; the 3D one packs that area into a vector perpendicular to the plane.*

The rules:

1. Still look at the parallelogram spanned by the two vectors;
2. The new vector's **length** equals that parallelogram's area;
3. Its **direction** is perpendicular to the plane of the parallelogram.

But there are two perpendicular directions. Which one? The **right-hand rule**:

> Point your right forefinger along $v$ and your middle finger along $w$; your thumb gives the direction of $v\times w$.

### A concrete example

Let $v$ have length 2 pointing along positive $z$, i.e. $(0,0,2)$, and $w$ have length 2 pointing along positive $y$, i.e. $(0,2,0)$.

They are perpendicular and equal in length, so they span a square of side 2 with area 4. The cross product therefore has length 4.

Point your right index finger along the first vector $v$ (positive $z$) and your middle finger along the second vector $w$ (positive $y$). Your thumb points along negative $x$. Hence

$$
v \times w = -4\hat{\imath}.
$$

## The strange recipe

A common way to compute the 3D cross product: write a $3\times3$ matrix with $v$ and $w$ in the second and third columns, and $\hat{\imath}$, $\hat{\jmath}$, $\hat{k}$ in the first:

$$
\det\begin{bmatrix}
\hat{\imath} & v_x & w_x \\
\hat{\jmath} & v_y & w_y \\
\hat{k} & v_z & w_z
\end{bmatrix}.
$$

Expand the determinant in the usual way, treating the basis vectors as ordinary symbols, and you get a linear combination of them — that combination is the cross product.

The classroom explanation is usually: "this is just a notational trick, do it and trust it; the result really is perpendicular, of the right length, and obeying the right-hand rule."

### Why it is not a coincidence

Grant's point: it *can* be used as a trick, but treating it as one misses something.

The determinant reappears here, and putting basis vectors in the first column, are not arbitrary choices. The explanation uses the **duality** from the previous chapter:

- The cross product can be understood as a linear map from 3D to the number line, built out of $v$ and $w$;
- Duality guarantees that every such map corresponds to a unique vector;
- That vector turns out to be the cross product.

So the $3\times3$ determinant is really computing the coordinates of that dual vector. The next chapter develops the argument in full.

Grant also concedes that this part sits "a little outside the essence of linear algebra": what you must grasp is **what the cross product vector means geometrically** — length is area, direction is perpendicular, pointing is fixed by the right-hand rule. The duality story behind the recipe is a bonus.

## What this chapter establishes

- The 2D cross product is a number: the **signed area** of the parallelogram spanned by the two vectors.
- Positive when $v$ is right of $w$, negative when left; hence $w\times v = -(v\times w)$.
- The order of the basis vectors ($\hat{\imath}$ right of $\hat{\jmath}$, $\hat{\imath}\times\hat{\jmath}>0$) defines orientation.
- It is computed as the determinant with $v$ and $w$ as columns, which follows from "determinant measures area scaling."
- The 3D cross product is a vector: length equals the parallelogram's area, direction perpendicular, pointing fixed by the right-hand rule.
- The $3\times3$ determinant recipe is not pure notation; duality explains it.
- What matters most is the geometric meaning, not the computation routine.

## Check your understanding

**1. Why can the 2D cross product be computed as a determinant?**

Answer: because the matrix with columns $v$ and $w$ is precisely the linear map sending $\hat{\imath}$ to $v$ and $\hat{\jmath}$ to $w$. The determinant measures area scaling, and the reference unit square has area 1 and maps exactly onto the parallelogram spanned by $v$ and $w$. So the determinant equals that parallelogram's signed area — the 2D cross product.

**2. Why is the cross product negative when $v$ is to the left of $w$?**

Answer: because orientation has been flipped. The map with columns $v$ and $w$ takes the standard basis (with $\hat{\imath}$ right of $\hat{\jmath}$) to a configuration where $v$ is left of $w$ — an orientation reversal. A determinant records orientation reversal with a minus sign, so the cross product is negative while its magnitude remains the area.

**3. What determines the length and the direction of the 3D cross product?**

Answer: the length is the area of the parallelogram spanned by the two vectors; the direction is perpendicular to the plane of that parallelogram, with the specific one of the two perpendicular directions chosen by the right-hand rule (forefinger along the first vector, middle finger along the second, thumb gives the result). Together these determine the vector uniquely.

**4. Why does the cross product grow as the two vectors approach perpendicular?**

Answer: because its length is the parallelogram's area, which equals the product of the side lengths times the sine of the angle. As the angle approaches 90 degrees the sine approaches 1 and the area grows; as the angle approaches 0 or 180 degrees the sine approaches 0, the parallelogram flattens, and the cross product tends to zero. This is also why parallel vectors have zero cross product.

**5. Why is putting the basis vectors into the 3×3 determinant more than a notational trick?**

Answer: because the recipe actually computes the coordinates of the vector dual to a certain linear map. Using $v$ and $w$ one builds a map from 3D to the number line (taking signed volume against their plane), and duality guarantees that this map corresponds to a unique vector — which is exactly the cross product. The basis vectors appear linearly when the determinant is expanded precisely because the answer is itself a linear combination of the basis vectors, with coefficients fixed by that duality.
