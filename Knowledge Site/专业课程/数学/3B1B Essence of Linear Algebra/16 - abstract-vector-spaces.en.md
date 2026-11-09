---
slug: "16-abstract-vector-spaces"
title: "Abstract Vector Spaces: What a Vector Really Is"
summary: "Functions can be added and scaled, so they are vectors too; differentiation is a linear transformation on them and can even be written as a matrix. Mathematicians decline to answer \"what is a vector\" and instead list axioms — anything obeying them inherits all of linear algebra."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [abstract-vector-space, axioms, functions, operator]
sources:
  - kind: "video"
    title: "Abstract vector spaces | Chapter 16, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=TgKwz5Ikpc8"
    author: "3Blue1Brown"
    publishedAt: "2016-09-25"
---

## The thread of the lecture

Chapter 1 offered three views of a vector: an arrow, a list of numbers, an abstract object. The third was postponed to the end.

This is the end.

The question is plain: **what is a vector, really?**

- Saying "a list of numbers" is clear but narrow — four-dimensional vectors sound concrete, while "an arrow in space" becomes hard to describe;
- Saying "an arrow in space" is intuitive but tied to coordinates — yet determinants and eigenvectors are visibly independent of the coordinate choice.

The answer here: mathematicians **decline the question** and instead list rules. Anything satisfying the rules counts as a vector.

## Timeline

| Time | Topic |
| --- | --- |
| 1:50 | Coordinates are arbitrary; determinants and eigenvectors are not |
| 2:19 | Functions add: pointwise addition |
| 3:11 | Functions scale: pointwise scaling |
| 3:59 | The derivative is a linear transformation of functions |
| 4:39 | The two properties of linearity: additivity and scaling |
| 6:56 | Describing the derivative with a matrix (on polynomials) |
| 8:26 | The polynomial $x^2+3x+5$ has coordinates $(5,3,1,0,\dots)$ |
| 9:06 | The derivative matrix: $1,2,3,\dots$ on the superdiagonal |
| 11:11 | Dot products and eigenvectors have function-world counterparts |
| 12:36 | The eight axioms: an interface for vector spaces |

## Functions are vectors too

Start with something that is neither an arrow nor a list: a **function**.

![Left: the curves sin x, cos x, and sin x+cos x, showing functions can be added; right: differentiation written as a 4×4 matrix in the basis 1, x, x², x³](/images/la16-derivative-matrix-en.svg)

*Figure: functions close under addition and scaling, so they are vectors; once a basis is chosen, differentiation is a matrix.*

Two functions can be added. The definition is natural: add the outputs point by point.

$$
(f+g)(x) = f(x) + g(x).
$$

This is nearly vector addition coordinate by coordinate — except there are infinitely many "coordinates," one per input.

A function can also be multiplied by a number: multiply every output by it.

$$
(cf)(x) = c\,f(x).
$$

Again, scaling coordinate by coordinate, with infinitely many coordinates.

Since all a vector can do is be added and scaled, and functions can do exactly those two things, **every tool in linear algebra built on those operations should in principle apply to functions**.

## Differentiation is a linear transformation

An operation that turns one function into another is called an **operator**, or a transformation. The most familiar example is the **derivative**.

It turns a function into another function. Is it "linear"?

This needs a more formal definition. Chapter 3 described linearity as "grid lines stay parallel and evenly spaced," which only applies to points in the plane. The abstract definition has just two clauses.

**Additivity**:

$$
T(\vec{v} + \vec{w}) = T(\vec{v}) + T(\vec{w}).
$$

**Scaling**:

$$
T(c\vec{v}) = c\,T(\vec{v}).
$$

Together: **a linear transformation preserves addition and scalar multiplication**.

"Grid lines parallel and evenly spaced" is merely how those two properties look in the plane.

### The derivative satisfies both

Calculus students use this daily without the terminology:

$$
(f+g)' = f' + g',
\qquad
(cf)' = c f'.
$$

So differentiation is a linear transformation.

And chapter 3's key consequence carries over: **a linear transformation is completely determined by what it does to the basis vectors**, because every vector is a combination of them and linearity makes "the image of a combination" equal "the combination of the images."

That holds for functions just as well.

## Writing the derivative as a matrix

If differentiation is linear, it should be expressible as a matrix. That sounds absurd, but it works.

Narrow the scope first: consider only **polynomials**. Each has finitely many terms, though the space contains polynomials of arbitrarily high degree.

### Choosing a basis

Polynomials are already written as scaled powers of $x$, so the natural basis is the pure powers:

$$
b_0(x) = 1,\quad b_1(x) = x,\quad b_2(x) = x^2,\quad b_3(x) = x^3,\ \dots
$$

They play the role that $\hat{\imath}$, $\hat{\jmath}$, $\hat{k}$ play for arrows.

Because there are infinitely many, a polynomial's "coordinates" form an infinite sequence.

### Coordinates

$$
x^2 + 3x + 5 \;\longleftrightarrow\; (5,\ 3,\ 1,\ 0,\ 0,\ \dots).
$$

Meaning: five copies of $b_0$, three of $b_1$, one of $b_2$, and nothing after.

$$
4x^7 - 5x^2 \;\longleftrightarrow\; (0,\ 0,\ -5,\ 0,\ 0,\ 0,\ 0,\ 4,\ 0,\ \dots).
$$

In general each polynomial has finitely many terms, so its coordinates are finitely many nonzero numbers followed by an infinite tail of zeros.

### The derivative matrix

In this coordinate system, differentiation becomes an infinite matrix that is almost all zeros, with the positive integers on one off-diagonal:

$$
D = \begin{bmatrix}
0 & 1 & 0 & 0 & \cdots \\
0 & 0 & 2 & 0 & \cdots \\
0 & 0 & 0 & 3 & \cdots \\
0 & 0 & 0 & 0 & \cdots \\
\vdots & & & & \ddots
\end{bmatrix}.
$$

Why? Because $b_n = x^n$ differentiates to $n x^{n-1}$, which is $n$ copies of $b_{n-1}$. So column $n$ has an $n$ in row $n-1$.

### Trying it out

Take $x^3 + 5x^2 + 4x + 5$, with coordinates $(5,4,5,1,0,\dots)$.

Multiply by the matrix:

- The first coordinate of the result is $1 \times 4 = 4$ — exactly the derivative of $4x$ being the constant 4;
- The second is $2 \times 5 = 10$ — the derivative of $5x^2$ is $10x$;
- The third is $3 \times 1 = 3$ — the derivative of $x^3$ is $3x^2$;
- Everything after is zero.

So the derivative is $3x^2 + 10x + 4$, matching direct differentiation.

**Matrix-vector multiplication and differentiation, which look like entirely different animals, belong to the same family.**

It also shows how to build the matrix: differentiate each basis function and put the coordinates of the result in the corresponding column.

## Vector spaces and axioms

In the world of functions, nearly every concept from this series has a counterpart, sometimes under a different name:

| Arrow world | Function world |
| --- | --- |
| dot product | inner product |
| eigenvector | eigenfunction |
| linear transformation | linear operator |

So back to the original question: **what is a vector**?

The mathematician's answer: **a collection of things that can be sensibly added and scaled**.

Such a collection is a **vector space**.

But mathematicians do not want to reprove every theorem for each strange space. Instead they list **axioms** — eight rules that addition and scaling must obey (commutativity, associativity, a zero element, inverses, distributivity, and so on).

Anything satisfying those eight rules inherits the entire body of linear algebra for free.

### Axioms as an interface

The elegance is that **the axioms are an interface between the mathematician and the user**:

- The mathematician proves theorems using only the axioms, never worrying about what bizarre spaces someone might invent;
- The user checks that their objects satisfy the axioms and then applies every theorem, even if the mathematician never imagined their setting.

Grant's image: if someone defines "the set of all pie creatures" with some notion of addition and scaling, the eight axioms are a checklist — verify them one by one and all of linear algebra opens up.

This also explains why textbooks sound so abstract: they must speak only in axioms, never relying on a concrete picture like arrows.

## But learn the concrete first

The closing attitude is worth recording.

Grant concedes that the abstract style, though general, is **bad for beginners**. Building intuition with arrows in the plane first is far more effective — it is how he learned it.

The value of abstraction comes later: once fluent, you know the tools reach far beyond arrows in a plane, and you understand why textbooks are written the way they are.

## What this chapter establishes

- Coordinates depend on the basis, but determinants and eigenvectors do not — they describe the space itself.
- Functions add and scale pointwise, so they are vectors with infinitely many coordinates.
- Differentiation is a linear operator: additive and scaling.
- The abstract definition of linearity is just those two properties; "parallel, evenly spaced grid lines" is their 2D picture.
- A linear transformation is determined by its action on basis vectors, and this holds for functions too.
- With basis $1,x,x^2,\dots$, polynomials acquire coordinates and differentiation becomes an infinite matrix with positive integers on the superdiagonal.
- Dot products and eigenvectors have counterparts called inner products and eigenfunctions.
- A vector space is a collection that can be sensibly added and scaled; the eight axioms are the interface it must satisfy.
- Mathematicians prove results from axioms; users verify axioms — neither needs to know the other's setting.
- Learn concretely before abstractly; abstraction pays off by revealing the scope of the tools.

## Check your understanding

**1. Why are functions "also vectors"?**

Answer: because the only things a vector can do are be added and be scaled, and functions have both operations: two functions add pointwise into a new function, and a function scales pointwise by a constant. Those operations obey the same rules vectors do (commutativity, associativity, distributivity). Since every tool in linear algebra depends only on these two operations, functions fall inside its scope.

**2. How does the abstract definition of linearity relate to "grid lines stay parallel and evenly spaced"?**

Answer: the latter is the 2D visual appearance of the former. The abstract definition is two algebraic properties: additivity $T(v+w)=T(v)+T(w)$ and scaling $T(cv)=cT(v)$. In the plane, maps satisfying both happen to look like "grid lines parallel and evenly spaced, origin fixed." But the definition itself refers to no picture, so it transfers to functions, matrices, polynomials — settings where no grid can be drawn.

**3. Why can differentiation be written as a matrix?**

Answer: because differentiation is linear, and a linear transformation is determined by its action on basis vectors. Take the basis $1,x,x^2,\dots$ and write each basis function's derivative ($0,1,2x,3x^2,\dots$) as coordinates to form the matrix's columns. Differentiating any polynomial then amounts to multiplying its coordinates by that matrix. This works precisely because linearity guarantees "the image of a combination is the combination of the images."

**4. Why are coordinates in the polynomial space "finitely many nonzero numbers plus an infinite tail of zeros"?**

Answer: because each individual polynomial has finitely many terms, so in the basis $1,x,x^2,\dots$ only finitely many coefficients are nonzero; but the basis itself is infinite, so the coordinate sequence is infinite with zeros elsewhere. This does not mean the space is finite-dimensional — it contains polynomials of arbitrary degree and is infinite-dimensional; each individual element simply uses finitely many basis vectors.

**5. What do the eight axioms do, and why call them an interface?**

Answer: they specify the basic properties addition and scaling must satisfy (commutativity, associativity, a zero element, inverses, distributivity, and so on). Their role is that of an interface: the mathematician proves theorems from the axioms alone and need not know the user's objects; the user verifies the axioms for their objects and then applies every theorem. Neither side needs to understand the other's setting, and the theory stays maximally general.
