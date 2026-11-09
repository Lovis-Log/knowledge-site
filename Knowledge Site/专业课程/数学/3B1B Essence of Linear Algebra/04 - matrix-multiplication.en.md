---
slug: "04-matrix-multiplication"
title: "Matrix Multiplication Is Composition of Transformations"
summary: "Apply one transformation and then another and the total effect is still linear. Its matrix is the left matrix applied to each column of the right one — that is all matrix multiplication means, and why it is read right to left."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [matrix-multiplication, composition, non-commutativity, associativity]
sources:
  - kind: "video"
    title: "Matrix multiplication as composition | Chapter 4, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=XkY2DOUCWMU"
    author: "3Blue1Brown"
    publishedAt: "2016-08-09"
---

## The thread of the lecture

The previous chapter said: a matrix is a transformation of space. This one asks the natural follow-up: **if you perform two transformations in a row, can a single matrix represent the result?**

Yes — and that matrix is the "product" of the two.

So the definition of matrix multiplication is not an arbitrary rule of arithmetic; it is the translation of **composition**. Once that is clear, two properties usually memorized become obvious:

- **It is not commutative**: rotate-then-shear differs from shear-then-rotate;
- **It is associative**: $(AB)C = A(BC)$, because both sides merely say "do $C$, then $B$, then $A$."

## Timeline

| Time | Topic |
| --- | --- |
| 2:01 | Rotate then shear is a new linear transformation |
| 2:36 | Follow $\hat{\imath}$ and $\hat{\jmath}$ to get the composition matrix |
| 3:05 | The composition matrix is the product of the two matrices |
| 4:05 | Read right to left: the right matrix acts first |
| 4:31 | An example: $M_1$ and $M_2$ |
| 5:08 | First column = left matrix times the right matrix's first column |
| 5:56 | The general case, by the same reasoning |
| 7:37 | Order matters: shear-then-rotate ≠ rotate-then-shear |
| 8:21 | Associativity: trivial from the transformation view |

## Composition: one transformation after another

Suppose you first rotate the plane 90 degrees counterclockwise, then shear it. The two actions in sequence produce **another linear transformation** — neither the rotation nor the shear.

![Three grids: the original with î, ĵ, v; after a 90° rotation î→(0,1), ĵ→(−1,0), v→(−1,1); after the shear î→(1,1), ĵ→(−1,0), v→(0,1)](/images/la04-composition-en.svg)

*Figure: the two columns of the composite are simply where the basis vectors land after both steps.*

How do you find its matrix? The same way as always: **follow the two basis vectors**.

- $\hat{\imath}$ is rotated to $(0,1)$, then sheared to $(1,1)$. So the first column is $(1,1)$;
- $\hat{\jmath}$ is rotated to $(-1,0)$, then sheared to $(-1,0)$. So the second column is $(-1,0)$.

Hence the composition matrix is

$$
\begin{bmatrix} 1 & -1 \\ 1 & 0 \end{bmatrix}.
$$

It compresses "rotate then shear" into **one** action.

## Where the product comes from

Now compute the same thing from another angle.

Take any vector, apply the rotation matrix, then the shear matrix:

$$
\vec{v} \;\mapsto\; S\,(R\,\vec{v}).
$$

On the other hand, the composition matrix $C$ we just found should do the same:

$$
\vec{v} \;\mapsto\; C\,\vec{v}.
$$

Since this holds for every $\vec{v}$, it is natural to call $C$ the **product** of $S$ and $R$:

$$
C = SR.
$$

That is where the definition comes from. It is not "a row-by-column rule someone decreed," but the notation for "two transformations joined end to end."

### Why it reads right to left

In $SR$, **the right factor $R$ acts first**, then the left one $S$.

This matches function notation: in $f(g(x))$, $g$ runs first. Since matrices play the role of functions and sit to the left of the vector, composition inevitably reads right to left.

Grant's joke: good news for Hebrew readers, bad news for the rest of us.

## How to compute it

Take two concrete matrices:

$$
M_1 = \begin{bmatrix} 1 & -2 \\ 1 & 0 \end{bmatrix},
\qquad
M_2 = \begin{bmatrix} 0 & 2 \\ 1 & 0 \end{bmatrix}.
$$

Find $M_2M_1$, meaning "first $M_1$, then $M_2$."

**First column: follow $\hat{\imath}$.**

The first column of $M_1$ says $\hat{\imath}$ lands at $(1,1)$. Apply $M_2$ to that:

$$
\begin{bmatrix} 0 & 2 \\ 1 & 0 \end{bmatrix}
\begin{bmatrix} 1 \\ 1 \end{bmatrix}
= \begin{bmatrix} 0\cdot1 + 2\cdot1 \\ 1\cdot1 + 0\cdot1 \end{bmatrix}
= \begin{bmatrix} 2 \\ 1 \end{bmatrix}.
$$

**Second column: follow $\hat{\jmath}$.**

$\hat{\jmath}$ lands first at $(-2,0)$, then under $M_2$:

$$
\begin{bmatrix} 0 & 2 \\ 1 & 0 \end{bmatrix}
\begin{bmatrix} -2 \\ 0 \end{bmatrix}
= \begin{bmatrix} 0 \\ -2 \end{bmatrix}.
$$

Therefore

$$
M_2M_1 = \begin{bmatrix} 2 & 0 \\ 1 & -2 \end{bmatrix}.
$$

### The general rule

Compress the procedure into one sentence:

> Each column of the product is the **left matrix times the corresponding column of the right matrix**.

Why? Because the $k$-th column of the right matrix is where the $k$-th basis vector first lands, and the left matrix carries it to its final home.

This is far more memorable than "multiply rows by columns and add," because it says **why** the arithmetic goes that way.

## Order cannot be swapped

A natural question: does swapping the two matrices change the result?

It does. Try shear and rotation.

- **Shear, then rotate**: $\hat{\imath}$ ends at $(0,1)$ and $\hat{\jmath}$ at $(-1,1)$ — the two end up close together;
- **Rotate, then shear**: $\hat{\imath}$ ends at $(1,1)$ and $\hat{\jmath}$ at $(-1,0)$ — clearly further apart.

The difference is visible at a glance. So

$$
SR \neq RS.
$$

Note that this judgment **requires no matrix multiplication at all**. Just imagine where the two basis vectors go. That is the payoff of seeing matrices as transformations.

## Why associativity is obvious

Linear algebra courses love the homework problem: prove that matrix multiplication is associative,

$$
(AB)C = A(BC).
$$

Expanding it numerically is miserable and unenlightening.

In the language of transformations, however, there is **nothing to prove**.

The left side says: do $C$, then $B$, then $A$.
The right side says: do $C$, then $B$, then $A$.

The parentheses only decide which two matrices get multiplied first; they do not change the order in which the three transformations are applied. Same three actions, same order, therefore the same result.

Grant notes that this feels like cheating but is an honest proof — and a better one than symbolic manipulation, because it explains **why** the property must hold.

## What this chapter establishes

- Applying two linear transformations in succession yields another linear transformation, their composition.
- The columns of the composition are the final landing spots of the two basis vectors after both maps.
- The product $AB$ is defined by "first $B$, then $A$," hence the right-to-left reading.
- To compute: each column of the product is the left matrix times the corresponding column of the right matrix.
- Matrix multiplication is not commutative, because order changes the effect; this can be judged geometrically.
- It is associative, because parentheses do not alter the order of the three transformations.
- Reading multiplication as composition turns its properties from things to prove into things that are evident.

## Check your understanding

**1. Why is matrix multiplication read right to left?**

Answer: because a matrix plays the role of a function and is written to the left of what it acts on. In the composition $S(R\vec v)$, $R$ acts on $\vec v$ first and $S$ acts on the result, which is written $SR$. This matches $f(g(x))$, where $g$ runs first. The right-to-left reading is therefore a consequence of function notation, not a special rule for matrices.

**2. Why does the $k$-th column of a product equal the left matrix times the $k$-th column of the right matrix?**

Answer: the $k$-th column of the right matrix is where the $k$-th basis vector lands after the first transformation. Composition requires that intermediate result to undergo the second transformation, which is exactly the left matrix multiplied by that column vector. The outcome is the final landing spot of the $k$-th basis vector, which by definition is the $k$-th column of the product.

**3. Without computing, how can you tell whether $AB$ and $BA$ agree?**

Answer: picture the two matrices as transformations and track the two basis vectors' final landing spots in your head. If both orders give the same two columns, the products agree; otherwise they differ. For "shear then rotate" versus "rotate then shear," $\hat{\imath}$ lands at $(0,1)$ in one case and $(1,1)$ in the other, which settles it immediately — faster than expanding numbers, and far more explanatory.

**4. Why is associativity "obvious" from the transformation view?**

Answer: because $(AB)C$ and $A(BC)$ describe the same string of actions: apply $C$, then $B$, then $A$. The parentheses only specify which two matrices are combined first; they do not change the order in which the transformations are applied. Same actions, same order, same result. This also explains why the property holds for all matrices regardless of their entries.

**5. What happens geometrically if the order of composition is reversed?**

Answer: you get a genuinely different transformation, usually with different basis-vector landing spots. For instance, rotate-then-shear sends $\hat{\imath}$ to $(1,1)$, while shear-then-rotate sends it to $(0,1)$. Intuitively, each transformation reshapes the space that the next one acts on: shearing first means the subsequent rotation acts on an already skewed grid, so the outcome differs.
