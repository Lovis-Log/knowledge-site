---
slug: "13-change-of-basis"
title: "Change of Basis: The Same Thing Said Differently"
summary: "Coordinates depend on the basis, so translation is a move linear algebra makes constantly. Stack another person's basis vectors as columns and you get a translator from their language into ours; its inverse goes the other way. A transformation expressed in their basis is A⁻¹MA."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [change-of-basis, coordinate-systems, similarity, matrices]
sources:
  - kind: "video"
    title: "Change of basis | Chapter 13, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=P2LTAUO1TdA"
    author: "3Blue1Brown"
    publishedAt: "2016-09-12"
---

## The thread of the lecture

Chapter 2 said coordinates are relative to a basis. This chapter pushes that to its limit.

Imagine another person — call her Jennifer — whose basis vectors are $(2,1)$ and $(-1,1)$ in our coordinates. The same arrow we call $(3,2)$ she calls $(5/3,1/3)$.

**We are saying the same thing in different languages.**

Two translation questions follow:

1. How do you convert a vector between the two coordinate systems?
2. What does a **transformation** look like in each, and how are those two matrices related?

## Timeline

| Time | Topic |
| --- | --- |
| 2:01 | Jennifer's $(5/3,1/3)$ is our $(3,2)$ |
| 2:44 | Her basis vectors are $(2,1)$ and $(-1,1)$ in our terms |
| 3:38 | Space has no intrinsic grid; the grid is just a picture of a coordinate system |
| 4:18 | Translation: what her $(-1,2)$ is in our language |
| 5:18 | The change-of-basis matrix: its columns are her basis vectors |
| 7:18 | The other direction: take the inverse |
| 9:12 | A transformation's matrix also depends on the basis |
| 10:23 | Three steps: translate in, transform, translate back |
| 11:26 | The result is $A^{-1}MA$ |
| 12:07 | Grant calls it mathematical empathy |

## Two languages

Jennifer's basis vectors, written in our coordinates, are

![Left: the arrow (3,2) on the standard grid; right: the slanted grid spanned by b₁=(2,1) and b₂=(−1,1), where the same arrow reads (5/3,1/3)](/images/la13-change-of-basis-en.svg)

*Figure: one arrow, two coordinate readings; a grid is not intrinsic to space, only a way of keeping books.*

$$
b_1 = \begin{bmatrix}2\\1\end{bmatrix},
\qquad
b_2 = \begin{bmatrix}-1\\1\end{bmatrix}.
$$

But to **her**, these are $(1,0)$ and $(0,1)$ — because in her system, $(1,0)$ means "the first basis vector."

So when she says a vector is $(5/3,1/3)$, she means

$$
\frac{5}{3}b_1 + \frac{1}{3}b_2
= \frac{5}{3}\begin{bmatrix}2\\1\end{bmatrix} + \frac{1}{3}\begin{bmatrix}-1\\1\end{bmatrix}
= \begin{bmatrix}3\\2\end{bmatrix}.
$$

One arrow: we call it $(3,2)$, she calls it $(5/3,1/3)$.

A side note: the square grid we draw is not a property of space. It is **a picture of our coordinate system**. Jennifer would draw a different grid, with different directions and spacing, but the same origin — because everyone agrees that $(0,0)$ means "any vector scaled by 0."

## From her language into ours

What is her $(-1,2)$ in our terms?

Her coordinates say: $-1$ times $b_1$ plus $2$ times $b_2$. And $b_1$, $b_2$ are known in our coordinates:

$$
-1\begin{bmatrix}2\\1\end{bmatrix} + 2\begin{bmatrix}-1\\1\end{bmatrix}
= \begin{bmatrix}-2-2\\-1+2\end{bmatrix}
= \begin{bmatrix}-4\\1\end{bmatrix}.
$$

So her $(-1,2)$ is our $(-4,1)$.

### This is just matrix multiplication

"Scale each basis vector by the matching coordinate and add" is exactly matrix-vector multiplication, with her basis vectors as the columns:

$$
\begin{bmatrix} 2 & -1 \\ 1 & 1 \end{bmatrix}.
$$

This is the **change-of-basis matrix**.

### An easy place to get confused

Geometrically, this matrix turns **our grid into her grid**: it sends $\hat{\imath}$ to $b_1$ and $\hat{\jmath}$ to $b_2$.

Numerically, though, its job is to **translate a vector written in her language into our language**.

Grant says this felt backwards to him at first. What made it click: the matrix takes "our misconception of what she means" and turns it into "the thing she actually means."

Concretely: if we read her coordinates $(5/3,1/3)$ as if they were ours, we get the wrong arrow; this matrix corrects it into the arrow she intended.

## From our language into hers

The reverse direction needs the **inverse**.

$$
A = \begin{bmatrix} 2 & -1 \\ 1 & 1 \end{bmatrix},
\qquad
A^{-1} = \begin{bmatrix} 1/3 & 1/3 \\ -1/3 & 2/3 \end{bmatrix}.
$$

Check: what is our $(3,2)$ in her language?

$$
\begin{bmatrix} 1/3 & 1/3 \\ -1/3 & 2/3 \end{bmatrix}
\begin{bmatrix} 3 \\ 2 \end{bmatrix}
= \begin{bmatrix} 1 + 2/3 \\ -1 + 4/3 \end{bmatrix}
= \begin{bmatrix} 5/3 \\ 1/3 \end{bmatrix}.
$$

Exactly the coordinates she gave.

## Transformations need translating too

Vectors get translated; so do **transformations**.

Our matrix for a 90-degree counterclockwise rotation is

$$
M = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix},
$$

because $\hat{\imath}\mapsto(0,1)$ and $\hat{\jmath}\mapsto(-1,0)$.

How would Jennifer describe the same rotation?

A common mistake: translate the two columns of $M$ into her coordinates. **That is wrong.** Those columns record where **our** basis vectors go, while Jennifer needs where **her** basis vectors go, described in her language.

### The correct three steps

Break the whole thing into three moves:

1. Take a vector written in her coordinates;
2. Use the change-of-basis matrix to **translate it into our language**;
3. Apply $M$ to rotate it (the result is still in our language);
4. Use $A^{-1}$ to **translate the result back into her language**.

Chained together:

$$
A^{-1} M A.
$$

It takes a vector in her language and returns the rotated vector, still in her language.

### The numbers

Substituting $A$, $A^{-1}$, and $M$:

$$
A^{-1}MA =
\begin{bmatrix} 1/3 & -2/3 \\ 5/3 & -1/3 \end{bmatrix}.
$$

Its columns are $(1/3, 5/3)$ and $(-2/3, -1/3)$.

That is what a 90-degree rotation looks like in Jennifer's coordinate system. It does not look like a rotation matrix at all — because in her skewed grid, this rotation genuinely does not look like a rotation.

## Mathematical empathy

The expression

$$
A^{-1}MA
$$

shows up everywhere in mathematics under the name **similarity transformation**.

Grant offers a humane reading:

- The middle $M$ is "the transformation as you see it";
- The outer $A^{-1}$ and $A$ are the empathy — the shift in perspective;
- The whole product is "**the same transformation, as someone else sees it**."

This is not merely a metaphor. It states precisely what similar matrices mean: two matrices describe the same linear transformation, expressed in different bases.

The next chapter's eigenvectors put this idea to work: **find a special basis in which the same transformation becomes extremely simple** — a diagonal matrix.

## What this chapter establishes

- Coordinates depend on the basis; different people with different bases are speaking different languages about the same vectors.
- The matrix whose columns are the other person's basis vectors translates their coordinates into ours.
- Its inverse translates the other way.
- Geometrically that matrix turns our grid into theirs; numerically it translates their language into ours — two directions that are easy to conflate.
- A transformation's matrix also depends on the basis: in their language it is $A^{-1}MA$.
- Read $A^{-1}MA$ as: $M$ is the transformation itself, the outer factors are the change of perspective, and the product is how that same transformation looks from elsewhere.
- This relation is called similarity; seeking a basis that simplifies the matrix is the next chapter's subject.

## Check your understanding

**1. Why must the change-of-basis matrix have the other person's basis vectors as its columns?**

Answer: because "describe a vector using their coordinates" means "scale each of their basis vectors by the matching coordinate and add." To write the result in our coordinates, we must know what each of their basis vectors is in our coordinates. Matrix-vector multiplication is precisely "weight the columns by the coordinates," so the columns must be their basis vectors expressed in our language.

**2. Why is the same matrix "our grid becomes their grid" geometrically but "their language becomes ours" numerically?**

Answer: because those are two faces of one linear map. Geometrically, the matrix sends our basis vectors ($\hat{\imath}$, $\hat{\jmath}$) to their basis vectors, so our grid is stretched into theirs. Numerically, the input is interpreted as "their coordinates" — weights on their basis vectors — and the output coordinates give the position in our language. The first describes where basis vectors go; the second describes what the numbers mean going in and coming out.

**3. Why can't you get Jennifer's rotation matrix by simply translating the two columns of the rotation matrix into her coordinates?**

Answer: because those columns record where **our** basis vectors land, whereas Jennifer needs where **her** basis vectors land, recorded in her coordinates. Translating the columns gives "the landing spots of our basis vectors expressed in her language," not "the landing spots of her basis vectors." The correct move is $A^{-1}MA$: translate her vector in, rotate, translate back out.

**4. Why is $A^{-1}MA$ called mathematical empathy?**

Answer: because its structure mirrors putting yourself in someone else's shoes: the middle $M$ is the transformation as you see it, and the outer $A$ and $A^{-1}$ translate inputs and outputs between the two languages. The product describes the same transformation as another person sees it. This is not a loose analogy; it is the precise meaning of similar matrices — two matrices representing one linear map under different bases.

**5. Why does the next chapter look for a "special basis"?**

Answer: because the same transformation has different matrices in different bases ($A^{-1}MA$), and some bases make the matrix extremely simple, such as a diagonal one. A diagonal matrix means each basis vector is merely scaled, never rotated — and such basis vectors are exactly the eigenvectors. Finding them reduces a complicated transformation to a list of independent scalings, simplifying both computation and understanding.
