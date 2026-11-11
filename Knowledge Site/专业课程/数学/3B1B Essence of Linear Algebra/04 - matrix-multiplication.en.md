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

- **It is not commutative**: for square matrices of the same order, swapping the order may change the result — rotate-then-shear and shear-then-rotate do not agree;
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

Both actions have matrices of their own. As in the previous chapter, the columns record where the basis vectors land:

$$
R=\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix},
\qquad
S=\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}.
$$

The second column of $S$, $(1,1)$, reads "the shear pushes $\hat{\jmath}$ to $(1,1)$"; the first column, $(1,0)$, says $\hat{\imath}$ stays put.

![Three grids: the original with î, ĵ, v; after a 90° rotation î→(0,1), ĵ→(−1,0), v→(−1,1); after the shear î→(1,1), ĵ→(−1,0), v→(0,1)](/images/la04-composition-en.svg)

*Figure: the two columns of the composite are simply where the basis vectors land after both steps.*

How do you find its matrix? The same way as always: **follow the two basis vectors**.

- $\hat{\imath}$ is rotated to $(0,1)$, then sheared to $(1,1)$. So the first column is $(1,1)$;
- $\hat{\jmath}$ is rotated to $(-1,0)$, then sheared to $(-1,0)$ — the shear pushes horizontally only, so points already on the x-axis stay put. So the second column is $(-1,0)$.

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

This holds for every $\vec{v}$; take $\vec{v}=\hat{\imath}$ and then $\vec{v}=\hat{\jmath}$, and column by column $C$ matches what "first $R$, then $S$" produces. So it is natural to call $C$ the **product** of $S$ and $R$:

$$
C = SR.
$$

That is where the definition comes from. It is not "a row-by-column rule someone decreed," but the notation for "two transformations joined end to end."

### Why it reads right to left

In $SR$, **the right factor $R$ acts first**, then the left one $S$.

This matches function notation: in $f(g(x))$, $g$ runs first. Since matrices play the role of functions and sit to the left of the vector, composition inevitably reads right to left.

Grant's joke: Hebrew runs right to left, so this is good news for Hebrew readers and bad news for the rest of us.

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

Why? Follow the $k$-th basis vector $\hat{e}_k$ once. Call the left matrix $A$ and the right one $B$:

$$
\hat{e}_k \;\xrightarrow{\;B\;}\; B\hat{e}_k \;\xrightarrow{\;A\;}\; A\,(B\hat{e}_k).
$$

The first landing spot, $B\hat{e}_k$, is by definition column $k$ of $B$; applying $A$ to that vector gives the final spot; and the final spot, by definition, is arranged into column $k$ of $AB$. Two landings and one arrangement — that is one column of the product.

The row-by-column mnemonic is derived from this column rule as well: the $i$-th entry of column $k$ of the product is row $i$ of the left matrix dotted with column $k$ of the right one. Understand it by columns and there is nothing to memorise — the rule can be rebuilt on demand, and it tells you **why** the arithmetic goes that way.

## Order cannot be swapped

A natural question: does swapping the two matrices change the result?

Not necessarily. **For square matrices of the same order, swapping the order may change the result** — some pairs agree, some do not. Use the same pair, $S$ and $R$.

- **Shear, then rotate** ($RS$): $\hat{\imath}$ ends at $(0,1)$ and $\hat{\jmath}$ at $(-1,1)$ — the two columns are 45° apart;
- **Rotate, then shear** ($SR$): $\hat{\imath}$ ends at $(1,1)$ and $\hat{\jmath}$ at $(-1,0)$ — 135° apart.

The gap between 45° and 135° is visible at a glance: one pair sits close together, the other has swung wide apart. So for these two matrices,

$$
SR \neq RS.
$$

The logic here is worth pausing on. The claim being refuted is "matrix multiplication is commutative," which asserts that $AB=BA$ for **every** pair of square matrices of the same order. A universal claim falls to a single counterexample, and $S$ with $R$ is one. Conversely, a pair that happens to commute shows only that this pair is special; it tells you nothing about the rule.

Note, incidentally, that this judgment **requires no matrix multiplication at all**. Just imagine where the two basis vectors go. That is the payoff of seeing matrices as transformations.

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
- For square matrices of the same order, swapping the order may change the result (multiplication is not commutative); one concrete counterexample (shear and rotation) is enough to refute the claim that it holds for all matrices.
- It is associative, because parentheses do not alter the order of the three transformations.
- Reading multiplication as composition turns its properties from things to prove into things that are evident.

## Check your understanding

**1. Why is matrix multiplication read right to left?**

Answer: because a matrix plays the role of a function and is written to the left of what it acts on. In the composition $S(R\vec v)$, $R$ acts on $\vec v$ first and $S$ acts on the result, which is written $SR$. This matches $f(g(x))$, where $g$ runs first. The right-to-left reading is therefore a consequence of function notation, not a special rule for matrices.

**2. Why does the $k$-th column of a product equal the left matrix times the $k$-th column of the right matrix?**

Answer: the $k$-th column of the right matrix is where the $k$-th basis vector lands after the first transformation. Composition requires that intermediate result to undergo the second transformation, which is exactly the left matrix multiplied by that column vector. The outcome is the final landing spot of the $k$-th basis vector, which by definition is the $k$-th column of the product.

**3. Without computing, how can you tell whether $AB$ and $BA$ agree?**

Answer: picture the two matrices as transformations and track the two basis vectors' final landing spots in your head. If both orders give the same two columns, the products agree; otherwise they differ. For "shear then rotate" versus "rotate then shear," $\hat{\imath}$ lands at $(0,1)$ in one case and $(1,1)$ in the other, which settles it immediately — faster than expanding numbers, and far more explanatory. Note which way this shortcut runs: one differing example is enough to show that commutativity does not hold in general, while a pair whose columns happen to match shows only that this pair commutes.

**4. Why is associativity "obvious" from the transformation view?**

Answer: because $(AB)C$ and $A(BC)$ describe the same string of actions: apply $C$, then $B$, then $A$. The parentheses only specify which two matrices are combined first; they do not change the order in which the transformations are applied. Same actions, same order, same result. This also explains why the property holds for all matrices regardless of their entries.

**5. What happens geometrically if the order of composition is reversed?**

Answer: you get a genuinely different transformation, usually with different basis-vector landing spots. For instance, rotate-then-shear sends $\hat{\imath}$ to $(1,1)$, while shear-then-rotate sends it to $(0,1)$. Intuitively, each transformation reshapes the space that the next one acts on: shearing first means the subsequent rotation acts on an already skewed grid, so the outcome differs.
