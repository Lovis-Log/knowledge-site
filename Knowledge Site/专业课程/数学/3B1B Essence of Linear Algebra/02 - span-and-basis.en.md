---
slug: "02-span-and-basis"
title: "Linear Combinations, Span, and Basis: What Coordinates Actually Scale"
summary: "Coordinates are not a property a vector carries; they are scalars that scale a set of basis vectors. Scale two vectors and add them and you get a linear combination; all possible combinations form the span, which may be the whole plane or merely a line."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [linear-combination, span, basis, linear-independence]
sources:
  - kind: "video"
    title: "Linear combinations, span, and basis vectors | Chapter 2, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=k7RM-ot2NWY"
    author: "3Blue1Brown"
    publishedAt: "2016-08-07"
---

## The thread of the lecture

The previous chapter set up a one-to-one match between vectors and coordinates. This one removes a hidden assumption inside that match: **coordinates are coordinates relative to some set of basis vectors**.

Writing $\begin{bmatrix}3\\2\end{bmatrix}$ really says "scale the first basis vector by 3, the second by 2, and add." The default basis is $\hat{\imath}$ and $\hat{\jmath}$ — but that is a choice, not a necessity.

Following that thread yields four ideas: linear combination, span, linear dependence, and basis. Together they form the basic vocabulary of the subject.

## Timeline

| Time | Topic |
| --- | --- |
| 1:30 | $\hat{\imath}$ and $\hat{\jmath}$ form the basis of the coordinate system |
| 1:54 | Choose a different pair of basis vectors and you get a different coordinate system |
| 3:02 | Linear combination: scale each, then add |
| 3:14 | Fix one scalar, free the other, and the tip traces a line |
| 4:02 | Span: the set of all possible linear combinations |
| 4:43 | When handling a collection of vectors, treat them as points |
| 6:04 | In 3D, two vectors span a plane through the origin |
| 7:26 | A third vector lying on that plane leaves the span unchanged |
| 8:30 | Linear dependence: one vector can be removed without shrinking the span |
| 9:12 | The definition of a basis: independent and spanning |

## Basis vectors: what coordinates really scale

In the standard coordinate system there are two special vectors:

$$
\hat{\imath} = \begin{bmatrix}1\\0\end{bmatrix},
\qquad
\hat{\jmath} = \begin{bmatrix}0\\1\end{bmatrix}.
$$

Together they are called the **basis** of that coordinate system.

What this means: **when you read coordinates as a set of scalars, the basis vectors are the things those scalars scale.**

So $\begin{bmatrix}3\\2\end{bmatrix}$ really says

$$
3\hat{\imath} + 2\hat{\jmath}.
$$

The numbers mean nothing on their own; the meaning comes from what they scale.

## A different basis, a different coordinate system

The crucial step: $\hat{\imath}$ and $\hat{\jmath}$ are merely the most convenient choice, not the only one.

Pick any two vectors pointing in different directions — one up-right, say, and one down-right. They work as a basis too: give a pair of numbers and you pin down one vector; give a vector and you pin down one pair.

**Any two non-collinear vectors in the plane span the whole plane**, so any such pair can serve as a basis.

The numbers differ from the standard ones. The same arrow might be $\begin{bmatrix}3\\2\end{bmatrix}$ under the standard basis and something else entirely under another.

Hence a sentence worth remembering: **whenever we describe vectors numerically, an implicit choice of basis is in play**. That choice usually goes unspoken, but it is always there. Chapter 13 is devoted to changing it.

## Linear combinations

Scale two vectors and add:

$$
a\vec{v} + b\vec{w},
$$

with $a$ and $b$ arbitrary real numbers. The result is a **linear combination** of $\vec{v}$ and $\vec{w}$.

This is everything the two basic operations — addition and scalar multiplication — can produce. So asking about linear combinations is asking: **with only these two operations, where can you reach?**

## Why "linear"

The word's justification is geometric rather than etymological.

Fix one scalar (say $a=1$) and let the other vary. The tip of $a\vec{v} + b\vec{w}$ traces a **straight line** — running in the direction of $\vec{w}$, starting from the tip of $\vec{v}$.

Fix $b$ instead and the same happens.

"Linear" names exactly this: free one scalar and you get a line. Only freeing both can fill out a plane.

## Span

![Left: two non-collinear vectors v and w, with the lattice of their scaled sums filling the whole plane; right: two collinear vectors whose combinations all land on a single line](/images/la02-span-en.svg)

*Figure: how far you can reach depends on how many independent directions you have; with collinear vectors only one remains, and the span degenerates to a line.*

Let both scalars vary freely; the set of all vectors you can reach is the **span** of the two vectors.

In two dimensions there are only three possibilities:

1. **The usual case**: the two vectors are not collinear, and the span is the entire plane — every point is hit by some linear combination;
2. **The unlucky case**: the two are collinear, and the span is a single line through the origin;
3. **The degenerate case**: both are zero, and the span is just the origin.

The second case deserves a moment. Why can't collinear vectors escape the line? Because both provide information about the same direction only. Scaling and adding them keeps the result in that direction. **Without a second independent direction, there is no way off the line.**

## Vectors as points

When discussing a whole family of vectors, arrows get in the way: one arrow is fine, but thousands crowd and occlude each other.

The convention: **draw an arrow for a single vector, but treat a collection as points** — the point at the tip, with the tail still at the origin.

Then "all vectors whose tips lie on a certain line" compresses to "that line," and "all two-dimensional vectors" compresses to "the whole plane."

The shift looks like a drawing convenience, but it matters: it turns the span from a pile of arrows into a geometric object — plane, line, or point — that can be pointed at.

## Span in three dimensions

Take two non-collinear vectors in 3D. What do they span?

Picture two knobs controlling the two scalars. Turn them and the tip moves. All reachable tip positions form a **plane through the origin** — a sheet slicing through space.

Not all of 3D, but a two-dimensional sheet. Two vectors offer only two independent directions, so they can only lay out a two-dimensional object.

Now add a third vector:

- If it **lies on that sheet**, the span is unchanged — it contributes no new direction;
- If it **points off the sheet**, scaling it sweeps the sheet through all of space, and the span becomes all of 3D.

In the second case the three free scalars match the three dimensions exactly, no more and no less.

## Linear dependence and independence

That second case needs a word: **at least one vector is redundant**, and removing it leaves the span unchanged.

Such a set is **linearly dependent**. An equivalent phrasing: one of the vectors can be written as a linear combination of the others — because it already lives in their span.

Conversely, if every vector genuinely adds a new dimension to the span, the set is **linearly independent**.

Two 2D examples make the contrast concrete:

- $\hat{\imath}$ and $\hat{\jmath}$: independent, each contributing a direction;
- $\begin{bmatrix}1\\1\end{bmatrix}$ and $\begin{bmatrix}2\\2\end{bmatrix}$: dependent, the second being twice the first, so removing it changes nothing.

## The definition of a basis

Now the formal statement.

> A **basis** of a space is a set of vectors that is **linearly independent** and **spans** the space.

Take the two conditions separately:

- **Spans the space**: guarantees sufficiency — every vector in the space can be represented;
- **Linearly independent**: guarantees no waste — no vector is redundant.

Together: "exactly enough, not one too many." That is why a basis matters: it provides a coordinate system with no redundancy, in which every vector has a unique coordinate representation.

In 2D, any two non-collinear vectors form a basis; in 3D, three vectors that do not lie in a common plane.

## What this chapter establishes

- Coordinates are scalars, and what they scale are basis vectors; the default $\hat{\imath},\hat{\jmath}$ is one choice among many.
- Any two non-collinear 2D vectors can serve as a basis, yielding different coordinate numbers for the same vector.
- A linear combination scales each vector and adds; it is all that addition and scalar multiplication can produce.
- "Linear" comes from the fact that freeing one scalar while fixing the other traces a line.
- The span is the set of all linear combinations: the whole plane, a line, or a single point in 2D.
- Treating a collection as points makes the span a geometric object you can point at.
- In 3D two vectors span a plane through the origin; a third on that plane changes nothing, one off it spans all of space.
- Linear dependence means a vector is redundant and expressible via the others; independence means each contributes a new dimension.
- A basis is independent and spanning — "exactly enough" vectors.

## Check your understanding

**1. Why is it said that "coordinates are not a property a vector carries"?**

Answer: because coordinates are scalars defined relative to a set of basis vectors. The same arrow might be $(3,2)$ under the standard basis and different numbers under another non-collinear basis. The vector itself — its length and direction — has not changed; what changed is the reference used to describe it. Every numerical description therefore hides a choice of basis.

**2. Why can't two collinear vectors span the plane?**

Answer: because collinearity means both supply the same direction. For any scalars $a,b$, the combination $a\vec v + b\vec w$ still points along that one direction, however the scalars are chosen. Laying out a two-dimensional object requires a second independent direction; with collinear vectors that direction is missing, so the span degenerates to a line.

**3. What does "linear" in "linear combination" have to do with lines?**

Answer: fixing one scalar and letting the other vary moves the tip along a straight line. The varying part is a multiple of a fixed vector, and the set of all multiples of a vector is a line through the origin; translating it to the starting tip keeps it a line. So "linear" names the property "vary one parameter alone and you get a line," not "the graph is a straight line."

**4. In 3D, why does a third vector lying in the span of the first two leave the span unchanged?**

Answer: because "lying in that plane" is equivalent to "being some linear combination of the first two." If it is already representable by them, any combination involving it can be rewritten using only the first two, so no new points become reachable. Conversely, if it points off the plane, scaling it sweeps a parallel copy of the plane through space, raising the span to three dimensions.

**5. Why does a basis require both "independent" and "spanning"?**

Answer: spanning without independence means redundant vectors, so coordinate representations are not unique — the same vector has several coefficient sets, and the system is unreliable as a coordinate frame. Independence without spanning means too few vectors, so some vectors cannot be represented at all. With both, "a representation exists" (spanning) and "the representation is unique" (independence) hold together, which is what a legitimate set of axes requires.

As a supplement, uniqueness follows like this: if one vector had two coefficient sets, subtracting them would give a non-trivial linear combination equal to zero — which is precisely linear dependence. So independence is equivalent to uniqueness of representation.
