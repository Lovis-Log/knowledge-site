---
slug: "03-linear-transformations"
title: "Linear Transformations and Matrices: Just Watch the Two Basis Vectors"
summary: "A linear transformation moves space while keeping grid lines parallel and evenly spaced and the origin fixed. It is fully determined by where î and ĵ land — stack those four numbers into columns and matrix-vector multiplication is nothing but \"use the coordinates as weights and add the columns.\""
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [linear-transformation, matrix, basis-vectors, matrix-vector-product]
sources:
  - kind: "video"
    title: "Linear transformations and matrices | Chapter 3, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=kYB8IZa5AuE"
    author: "3Blue1Brown"
    publishedAt: "2016-08-08"
---

## The thread of the lecture

This chapter is the hinge of the series. The first two built up "a vector is an arrow or a list of numbers"; this one brings **functions** into the same language. If a function eats a vector and spits out a vector, then it is moving space itself.

The question becomes: how do you describe "moving space" with numbers?

The answer is startlingly small: **record only where the two basis vectors land**. Four numbers, arranged in a $2\times2$ table, is a matrix. And the rule for matrix-vector multiplication — the one usually memorized — is just "weight the columns by the coordinates and add."

Once that clicks, a matrix stops being a grid of numbers to process and becomes **an action on space**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:43 | "Transformation" is just another word for function |
| 1:11 | Read it as motion: every point moves to its output |
| 2:39 | Two conditions for linearity: lines stay lines, the origin stays put |
| 3:48 | Only the landing spots of $\hat{\imath}$ and $\hat{\jmath}$ matter |
| 4:19 | $v=-1\hat{\imath}+2\hat{\jmath}$ lands according to those two |
| 5:38 | The landing formula for a general $(x,y)$ |
| 6:18 | Four numbers packaged as a $2\times2$ matrix, columns as landing spots |
| 7:22 | Matrix-vector product = weight the columns and add |
| 8:04 | Example: a 90-degree counterclockwise rotation |
| 9:21 | Linearly dependent columns squash the plane onto a line |

## Transformation is just function

"Transformation" sounds grander than "function," but it means the same: take an input, return an output.

The word is chosen to suggest a way of seeing: **read the function as motion**.

If an input vector is sent to an output vector, imagine that arrow sliding from its old place to its new one. To grasp the transformation as a whole, imagine **every** input vector sliding at once.

Ten thousand arrows crowd the picture, so use the previous chapter's trick: treat each vector as a point at its tip. Then a transformation becomes "every point in the plane moves somewhere."

In two dimensions the best drawing puts a grid on it: all points move together and the grid stretches, squashes, and flips. Keep a copy of the original grid behind it and you can see exactly where each point went.

## The two conditions for linearity

An arbitrary transformation can be a mess. Linear algebra restricts itself to a well-behaved kind, called **linear**.

Geometrically there are two tests:

1. **Every line stays a line** — no curving;
2. **The origin stays fixed**.

Both are needed. The first alone is not enough: some maps keep the horizontal and vertical grid lines straight yet bend a diagonal into a curve. The stronger, correct statement is: **grid lines stay parallel and evenly spaced**.

Note what the second condition implies: a fixed origin means the zero vector always maps to zero. That rules out translations, and it is precisely why matrices can describe these maps — matrix multiplication always sends zero to zero.

## Only two basis vectors matter

![Left: the original square grid with î, ĵ, and a vector v; right: the same space after the map, the grid sheared, î landing at (1,−2), ĵ at (3,0), and v at (5,2)](/images/la03-linear-transformation-en.svg)

*Figure: the grid stays parallel and evenly spaced; only the two basis vectors' landing spots move, and every other point follows them.*

Now: how do you describe a linear transformation numerically?

By **knowing only where $\hat{\imath}$ and $\hat{\jmath}$ land**.

The reason is linearity. Any vector is a combination of the basis vectors:

$$
\vec{v} = -1\hat{\imath} + 2\hat{\jmath}.
$$

If the transformation is linear, then "combine, then transform" equals "transform, then combine":

$$
\vec{v} \mapsto -1\cdot(\text{where } \hat{\imath} \text{ lands}) + 2\cdot(\text{where } \hat{\jmath} \text{ lands}).
$$

That property follows from "grid lines stay parallel and evenly spaced": scaling and addition are preserved by the map.

So record the two landing spots and every vector's destination is computable — no need to watch the whole transformation.

## From geometry to numbers: the matrix

A concrete case. Some transformation sends $\hat{\imath}$ to $(1,-2)$ and $\hat{\jmath}$ to $(3,0)$.

Then $\vec{v} = -1\hat{\imath} + 2\hat{\jmath}$ lands at

$$
-1\begin{bmatrix}1\\-2\end{bmatrix} + 2\begin{bmatrix}3\\0\end{bmatrix}
= \begin{bmatrix}-1+6\\2+0\end{bmatrix}
= \begin{bmatrix}5\\2\end{bmatrix}.
$$

Stack the two landing spots as columns and you get a $2\times2$ table:

$$
\begin{bmatrix} 1 & 3 \\ -2 & 0 \end{bmatrix}.
$$

That is the **matrix**. It means exactly one thing: **the first column is $\hat{\imath}$'s new home, the second is $\hat{\jmath}$'s**.

A two-dimensional linear transformation is pinned down by four numbers. That deserves a moment of surprise.

## Matrix-vector multiplication

Write the reasoning in general form. Let the matrix be

$$
\begin{bmatrix} a & b \\ c & d \end{bmatrix},
$$

meaning $\hat{\imath}\mapsto(a,c)$ and $\hat{\jmath}\mapsto(b,d)$.

Then any vector $(x,y)$ lands at

$$
x\begin{bmatrix}a\\c\end{bmatrix} + y\begin{bmatrix}b\\d\end{bmatrix}
= \begin{bmatrix} ax+by \\ cx+dy \end{bmatrix}.
$$

That is the definition:

$$
\begin{bmatrix} a & b \\ c & d \end{bmatrix}
\begin{bmatrix} x \\ y \end{bmatrix}
= \begin{bmatrix} ax+by \\ cx+dy \end{bmatrix}.
$$

**It is not a rule to memorize but shorthand for "use the coordinates as weights and add the columns."**

The matrix sits on the left because it plays the role of the function, acting on what is on its right.

## Two examples: rotation and shear

**Rotate 90 degrees counterclockwise**: $\hat{\imath}$ goes to $(0,1)$ and $\hat{\jmath}$ to $(-1,0)$, so

$$
\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}.
$$

**Shear**: $\hat{\imath}$ stays put and $\hat{\jmath}$ slides to $(1,1)$, so

$$
\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}.
$$

A shear looks like pushing a stack of paper sideways: horizontal lines stay horizontal, vertical lines tilt, and the further right you go the further they lean.

## Reading a transformation off a matrix

Go the other way: given a matrix, say with columns $(1,2)$ and $(3,1)$, how do you picture it?

Move $\hat{\imath}$ to $(1,2)$, move $\hat{\jmath}$ to $(3,1)$, then **let every other point follow while grid lines stay parallel and evenly spaced**.

Those two moves determine the entire transformation. Nothing else is needed.

## One important consequence

What if the two landing spots are **linearly dependent** — say the second column is a multiple of the first?

Recall the previous chapter: two collinear vectors span only a line. Since the whole plane is governed by these two directions, every point is crushed onto that line.

Geometrically: **two-dimensional space collapses into one dimension**.

This reappears when determinants arrive: a zero determinant is precisely the algebraic signature of space being flattened.

## What this chapter establishes

- A transformation is a function; the word is chosen to suggest motion in space.
- Linearity means lines stay lines and the origin stays fixed — more strongly, grid lines stay parallel and evenly spaced.
- A linear transformation is determined by where $\hat{\imath}$ and $\hat{\jmath}$ land, since every vector is a combination of them.
- Stacking those landing spots as columns gives a $2\times2$ matrix: first column for $\hat{\imath}$, second for $\hat{\jmath}$.
- Matrix-vector multiplication weights the columns by the vector's coordinates and adds.
- A 90-degree rotation is $\begin{bmatrix}0&-1\\1&0\end{bmatrix}$; a shear is $\begin{bmatrix}1&1\\0&1\end{bmatrix}$.
- Given a matrix, picture it by moving the two basis vectors and letting everything else follow.
- Linearly dependent columns squash the plane onto a line, the geometric face of a zero determinant.
- **Seeing a matrix should call up a transformation of space** — the key to everything that follows.

## Check your understanding

**1. Why does recording the two basis vectors' landing spots suffice?**

Answer: because every vector is uniquely $\vec v = x\hat{\imath}+y\hat{\jmath}$, and linearity guarantees "the image of a combination equals the combination of the images," so $T(\vec v)=xT(\hat{\imath})+yT(\hat{\jmath})$. Knowing $T(\hat{\imath})$ and $T(\hat{\jmath})$ therefore fixes every vector's image — which is why four numbers are enough.

**2. Why is "lines stay lines" insufficient to define linearity? What else is needed?**

Answer: the origin must also stay fixed, and more strongly the grid must stay parallel and evenly spaced. Some maps keep horizontal and vertical grid lines straight while bending a diagonal into a curve (their restrictions to the axes happen to be linear). And even if all lines stayed straight, a translation would move the origin and fail linearity, since a linear map must send zero to zero. The correct criterion is "grid lines parallel and evenly spaced, origin fixed."

**3. Where does the formula $\begin{bmatrix}a&b\\c&d\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}ax+by\\cx+dy\end{bmatrix}$ come from?**

Answer: from weighting the columns. The first column $(a,c)$ is where $\hat{\imath}$ lands and the second $(b,d)$ where $\hat{\jmath}$ lands. The vector $(x,y)$ means $x\hat{\imath}+y\hat{\jmath}$, and linearity sends it to $x(a,c)+y(b,d)$, which is $(ax+by,\,cx+dy)$ term by term. So the formula is not a convention but a direct translation of "the basis vectors determine the map."

**4. Why does matrix multiplication always send the zero vector to zero, and how does that relate to the fixed origin?**

Answer: substituting $(x,y)=(0,0)$ gives $(a\cdot0+b\cdot0,\ c\cdot0+d\cdot0)=(0,0)$; any matrix times zero is zero. This is the algebraic face of the geometric requirement that the origin stay fixed. It also explains why a translation — which moves the origin — cannot be written as matrix multiplication, except by tricks such as homogeneous coordinates.

**5. If the matrix's two columns are linearly dependent, what happens geometrically, and why?**

Answer: the whole plane is flattened onto a single line through the origin. The columns are the images of the basis vectors, so collinear columns mean only one independent direction survives after the map; the image of $x\hat{\imath}+y\hat{\jmath}$ lies on that line. This is also the geometric reason such a map is not invertible: flattening destroys information that cannot be recovered.
