---
slug: "11-cross-products-duality"
title: "The Cross Product Through Duality: Why That Odd Recipe Works"
summary: "Treat the first vector of a 3×3 determinant as a variable and you get a linear map from 3D to the number line, whose geometric meaning is signed volume. Duality guarantees this map corresponds to a unique vector, and the algebraic and geometric routes produce the same one — the cross product."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [cross-product, duality, determinant, dual-vector]
sources:
  - kind: "video"
    title: "Cross products in the light of linear transformations | Chapter 11, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=BaM7OCEm3G0"
    author: "3Blue1Brown"
    publishedAt: "2016-09-01"
---

## The thread of the lecture

The previous chapter left a loose end: why does stuffing $\hat{\imath}$, $\hat{\jmath}$, $\hat{k}$ into the first column of a $3\times3$ determinant produce the cross product?

The classroom answer is usually "it's just a notational trick, do it and trust it." This chapter shows it is **not a trick but a consequence of duality**.

Four steps:

1. Treat the determinant's first vector as a variable, giving a function from 3D to the number line;
2. That function is linear (a determinant is linear in each column);
3. By duality it corresponds to a unique vector $p$, such that applying the function equals dotting with $p$;
4. Compute $p$ algebraically and geometrically — both routes must agree, and that vector is the cross product.

## Timeline

| Time | Topic |
| --- | --- |
| 2:04 | Duality recap: a map to the number line ↔ a unique vector |
| 3:13 | Defining a map from 3D to the line using $v$ and $w$ |
| 4:19 | The 2D cross product is a determinant; the 3D determinant gives volume |
| 5:10 | Treat the first vector as a variable $(x,y,z)$ |
| 5:40 | This function returns signed volume |
| 6:15 | It is linear in the first argument |
| 7:07 | Hence a dual vector $p$ exists |
| 7:47 | Expanding the determinant gives $p$'s coordinates |
| 8:40 | Which is exactly the "stuff the basis vectors in" recipe |
| 10:20 | Geometrically: volume = area × perpendicular component |

## Duality recap

The previous chapter's core result:

![Left: three parallel level-set planes in 3D with the normal p through them; right: the corresponding number line, the planes mapping to −0.9, 0, 0.9](/images/la11-duality-planes-en.svg)

*Figure: a 3D-to-1D linear functional has parallel planes as level sets, and its normal p is the dual representative.*

> Any linear map from a space to the number line corresponds to a unique vector in that space, such that applying the map and dotting with that vector are the same operation.

The numerical reason is simple: such a map is described by a matrix with a single row, and each column reports where one basis vector lands. Multiplying a one-row matrix by a vector is exactly the dot product with that row stood upright.

That vector is called the **dual vector** of the map.

## The 2D analogy

The 2D cross product is clean: put $v$ and $w$ in two columns, take the determinant, get a number — the signed area. No basis vectors stuffed anywhere.

Extrapolating to 3D, you would expect: take three 3D vectors $u$, $v$, $w$ in three columns, take the determinant, get a number — the signed volume.

But the real 3D cross product takes **two** vectors and returns **one** vector, not three in and a number out.

## The key move: let the first vector vary

Since the cross product is two in, one out, leave the first slot empty.

Let $u = (x,y,z)$ be a **variable** while $v$ and $w$ stay fixed. Define

$$
f(u) = \det\begin{bmatrix}
x & v_x & w_x \\
y & v_y & w_y \\
z & v_z & w_z
\end{bmatrix}.
$$

This is a function from 3D to the number line: input a vector, output a number.

Its geometric meaning is clear: **the signed volume of the parallelepiped spanned by $u$, $v$, and $w$**.

### It is linear

A determinant is linear in each column: scaling a column scales the determinant, and splitting a column into a sum splits the determinant accordingly.

So $f$ is linear in the first argument $u$. By duality there is a unique vector $p$ with

$$
f(u) = p \cdot u
$$

for every $u$.

**The question becomes: what is $p$?**

## The algebraic route

Expand the determinant along the first column:

$$
f(u) = \left(v_y w_z - v_z w_y\right)x
+ \left(v_z w_x - v_x w_z\right)y
+ \left(v_x w_y - v_y w_x\right)z .
$$

And $p\cdot u = p_x x + p_y y + p_z z$. Since the two agree for all $(x,y,z)$, the coefficients must match:

$$
p = \begin{bmatrix}
v_y w_z - v_z w_y \\
v_z w_x - v_x w_z \\
v_x w_y - v_y w_x
\end{bmatrix}.
$$

That is the coordinate formula for the cross product.

### Relation to the "stuff the basis vectors in" recipe

Notice: collecting the coefficients as above is computationally identical to putting $\hat{\imath}$, $\hat{\jmath}$, $\hat{k}$ into the first column and expanding.

The difference is only interpretive: stuffing in the basis vectors is notation signalling that those coefficients should be read as a vector's coordinates, while expanding along the first column hands you the three components directly.

So the "notational trick" is really computing the dual vector.

## The geometric route

Now take a completely different path, using only geometry.

$f(u)$ is the signed volume of a parallelepiped. How is volume computed?

$$
\text{volume} = \text{base area} \times \text{height}.
$$

- The base is the parallelogram spanned by $v$ and $w$; call its area $A$;
- The height is the component of $u$ **perpendicular to the base**.

And "taking $u$'s component in some direction" is exactly **projection**. Hence

$$
f(u) = A \times \left(\text{length of } u \text{ projected onto the perpendicular}\right).
$$

Meanwhile the geometric meaning of a dot product is "projection length times $|p|$." For the two to agree for every $u$, $p$ must satisfy:

- **Direction**: perpendicular to $v$ and $w$ (that is, to the base);
- **Length**: equal to $A$.

Which of the two perpendicular directions it points is settled by the sign convention: with the right choice, the cases where the dot product is negative coincide exactly with those where the right-hand orientation of $u$, $v$, $w$ is negative.

## The two routes must meet

- The algebraic route gives $p$'s coordinates as those three combinations;
- The geometric route gives $p$ perpendicular to $v$ and $w$, of length equal to the area, pointing by the right-hand rule.

Both are the **dual vector of the same linear map**, and the dual vector is unique, so they must be the same vector.

Which proves that:

1. The $3\times3$ determinant recipe really does produce a vector perpendicular to $v$ and $w$;
2. Its length really is the parallelogram's area;
3. Its direction really does obey the right-hand rule.

**Not "just memorize it," but "it could not be otherwise."**

## What this chapter establishes

- Duality: every linear map to the number line corresponds to a unique vector, and applying the map equals dotting with it.
- The 2D cross product is the signed area from a determinant; the 3D determinant gives the signed volume of three vectors.
- Treating the first column as a variable $(x,y,z)$ yields a linear function whose meaning is signed volume.
- By duality that function corresponds to a unique $p$; expanding along the first column gives $p$'s coordinates.
- "Stuffing the basis vectors in" and "expanding along the first column" compute the same thing; the former merely signals that the coefficients are vector coordinates.
- Geometrically, volume = base area × perpendicular component, forcing $p$ to be perpendicular to $v$ and $w$ with length equal to the base area, direction fixed by orientation.
- Both routes give the same dual vector, so the cross product's geometric properties are derived, not decreed.

## Check your understanding

**1. Why is the function linear in the first vector once it is treated as a variable?**

Answer: because a determinant is linear in each column: scaling a column by $k$ scales the determinant by $k$, and if a column is a sum of two vectors the determinant splits into the sum of the two corresponding determinants. The first vector is exactly the matrix's first column, so the function is linear in it. This is a basic property of determinants and needs no extra hypothesis.

**2. What is the geometric meaning of that linear function?**

Answer: it returns the signed volume of the parallelepiped spanned by the input $u$ together with the fixed $v$ and $w$. The absolute volume equals the base area (the parallelogram spanned by $v$ and $w$) times the component of $u$ perpendicular to that base; the sign is fixed by the right-hand orientation of the three vectors. So the function expresses volume as a linear function of $u$.

**3. What do the algebraic and geometric routes each give, and why must they agree?**

Answer: the algebraic route expands the determinant along the first column and yields $p$'s three coordinates — the cross product formula. The geometric route starts from "volume = base area × perpendicular component" and concludes that $p$ must be perpendicular to $v$ and $w$ with length equal to the base area. Both describe the dual vector of one and the same linear map, and that dual vector is unique, so they must produce the same vector.

**4. What is the "stuff the basis vectors into the first column" recipe actually doing?**

Answer: computing the coordinates of the dual vector. Treating $\hat{\imath}$, $\hat{\jmath}$, $\hat{k}$ as symbols in the first column and expanding produces a linear combination whose three coefficients equal the coefficients of $x$, $y$, $z$ in the expansion along the first column. The notational move merely packages "collect the coefficients" as "obtain a vector"; the substance is still finding the dual vector.

**5. Why does the cross product's length equal the parallelogram's area?**

Answer: because the dual vector's length must match the area factor in "volume = area × projection length." The dot product $p\cdot u$ equals $|p|$ times the length of $u$'s projection onto $p$; for this to equal the volume for every $u$, $|p|$ must be the base area and $p$ must be perpendicular to the base. So the length is not a coincidence but a consequence forced jointly by the volume formula and the definition of the dot product.
