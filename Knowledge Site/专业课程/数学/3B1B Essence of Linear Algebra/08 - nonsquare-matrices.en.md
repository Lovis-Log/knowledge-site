---
slug: "08-nonsquare-matrices"
title: "Nonsquare Matrices: Transformations Between Dimensions"
summary: "A matrix need not be square. The number of columns says how many basis vectors the input space has; the number of rows says how many coordinates describe each landing spot — so 3×2 goes from the plane into space, and 2×3 from space onto the plane."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [nonsquare-matrix, dimension, column-space, rank]
sources:
  - kind: "video"
    title: "Nonsquare matrices as transformations between dimensions | Chapter 8, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=v8VSDg_WQlA"
    author: "3Blue1Brown"
    publishedAt: "2016-08-17"
---

## The thread of the lecture

Every matrix so far has been square: $2\times2$ kneading the plane, $3\times3$ kneading space.

But a matrix need not be square. Once rows and columns differ in number, it describes a transformation **between different dimensions**. This chapter extends the "matrix = transformation" language to that case and gives a simple rule for reading a matrix's shape.

## Timeline

| Time | Topic |
| --- | --- |
| 1:46 | A $3\times2$ matrix: two columns mean 2D input, three rows mean 3D landing spots |
| 2:16 | The column space is a plane through the origin in 3D, and the matrix is still full rank |
| 2:42 | A $2\times3$ matrix: 3D input, 2D output |
| 3:12 | A $1\times2$ matrix maps the plane onto the number line |
| 3:37 | Linearity: evenly spaced points stay evenly spaced |
| 3:52 | Such maps are closely tied to the dot product |

## Reading a matrix's shape

The rule is simple once you think it through:

![Three rows: a 3×2 matrix carries the plane into space, a 2×3 presses space onto a plane, and a 1×2 presses the plane onto a number line; each row labels input and output dimensions](/images/la08-nonsquare-en.svg)

*Figure: rows count outputs, columns count inputs — a matrix's shape is a dimension ledger.*

- **Columns = dimension of the input space.** Each column is "where one basis vector lands," so the number of columns is the number of input basis vectors.
- **Rows = dimension of the output space.** Each column is described by that many coordinates, so the landing spots live in that many dimensions.

Hence:

| Shape | Meaning |
| --- | --- |
| $3\times2$ | plane → space |
| $2\times3$ | space → plane |
| $1\times2$ | plane → number line |

## $3\times2$: from the plane into space

A $3\times2$ matrix has two columns, each with three numbers.

Two columns mean the input space has two basis vectors — the input is 2D. Three coordinates per column mean the landing spots sit in 3D.

So it maps the plane into three-dimensional space. All possible landing spots form **a plane through the origin in 3D**, since only two independent directions are available.

Interestingly, this matrix is **still full rank**. Rank is the dimension of the column space, which here is 2 — equal to the input dimension. Full rank means "the input was not squashed further," not "the output fills the whole target space."

## $2\times3$: from space onto the plane

Reverse it: a $2\times3$ matrix has three columns of two numbers each.

Three columns mean three input basis vectors — a 3D input. Two coordinates per column mean the landing spots lie in a plane.

So it crushes all of 3D onto a plane. Imagining an object passing through such a map is genuinely uncomfortable — one dimension of space is squeezed out of existence.

## $1\times2$: from the plane to a number line

One-dimensional space is just the number line. A $1\times2$ matrix has two columns, each with a single entry.

It takes a 2D vector and returns a number.

Here "grid lines stay parallel and evenly spaced" is awkward to draw, because the squashing is so severe. The more useful test for linearity: **a line of evenly spaced dots remains evenly spaced after mapping onto the number line**.

That condition captures linearity in this setting: unchanged spacing means the map is "multiply by a constant," exactly what a linear map looks like when the output is one-dimensional.

Such matrices play a starring role in the next chapter: a $1\times2$ matrix **is** a dot product wearing a matrix costume.

## What this chapter establishes

- Matrices need not be square; nonsquare matrices describe linear maps between dimensions.
- Columns = input dimension (how many input basis vectors).
- Rows = output dimension (how many coordinates per landing spot).
- $3\times2$ maps the plane into 3D, its column space a plane through the origin; it is still full rank because rank equals the input dimension.
- $2\times3$ crushes 3D onto a plane.
- $1\times2$ maps the plane to the number line; linearity shows up as "evenly spaced points stay evenly spaced."
- A $1\times2$ matrix is intimately related to the dot product, the subject of the next chapter.

## Check your understanding

**1. Why is the column space of a $3\times2$ matrix a plane rather than all of 3D?**

Answer: because it has only two columns, and the column space is their span. Two vectors (if not collinear) span only a two-dimensional subspace, which in 3D is a plane through the origin. Filling 3D would require three linearly independent columns.

**2. Why can a $3\times2$ matrix still be called "full rank"?**

Answer: because rank is the dimension of the column space, and full rank means the rank equals the number of columns (the input dimension). Here the column space is 2D and there are two columns, so it is full rank. Full rank means "the input space was not squashed further," not "the output covers the whole target space." The output is only a plane inside 3D, yet no additional information was lost from the input.

**3. Can a $2\times3$ matrix have an inverse?**

Answer: no. It crushes 3D onto 2D, necessarily losing one dimension of information, so distinct inputs land on the same output. An inverse would have to restore each output to a unique input, which is impossible. Only square matrices (with non-zero determinant) can be invertible.

**4. Why does the linearity test for a $1\times2$ matrix use "evenly spaced points stay evenly spaced"?**

Answer: because the output is one-dimensional, so there is no 2D grid to watch and "grid lines parallel and evenly spaced" has nothing to grip. The essence of linearity is preserving linear combinations, which in a 1D output means scaling all distances by one common factor: if equally spaced input points remain equally spaced, the map multiplies by a constant, which is exactly what a linear map looks like in that case.

**5. Why is a $1\times2$ matrix related to the dot product?**

Answer: because applying it to a 2D vector computes "multiply the two coefficients by the two components and add" — the arithmetic form of a dot product. The next chapter shows that this number equals the projection of the vector onto some direction, scaled by that direction's length, which links "matrix multiplication" and "projection," two things that look unrelated.
