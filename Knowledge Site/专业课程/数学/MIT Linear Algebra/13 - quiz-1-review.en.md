---
slug: "13-quiz-1-review"
title: "Quiz 1 Review: Organized by Problem Type"
summary: "The first half of the course compressed into a few problem types: dimension and rank counts, reconstructing a matrix from its complete solution, true or false, null spaces of products, and the intersection of row and null spaces."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "exam-review"
  - "rank"
  - "null-space"
sources:
  - kind: "video"
    title: "13. Quiz 1 Review"
    url: "https://www.youtube.com/watch?v=l88D4r74gtM"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## What this review covers

The first quiz covers the $A\mathbf{x}=\mathbf{b}$ half of the course, with emphasis on rectangular matrices: null spaces, left null spaces, rank, and the four fundamental subspaces. When a matrix is invertible these notions are automatic; when it is rectangular, each one has to be checked.

Below the material is organized by problem type rather than lecture order.

## Timeline

| Time | Topic |
| --- | --- |
| 0:09 | Opening: what this review covers |
| 1:49 | Type 1: the dimension of a span |
| 5:29 | Elimination to echelon form |
| 8:56 | A concrete $3\times3$ example |
| 12:19 | Computing rank and free variables |
| 15:44 | Type 2: counting dimensions from structure |
| 17:26 | When the null space is large |
| 21:06 | Can a matrix square to zero |
| 24:39 | The counterexample and invertibility |
| 26:32 | Type 3: reconstructing a matrix from its solutions |
| 29:59 | The null space of a product |
| 33:27 | Particular solution plus null space |
| 36:54 | Type 4: true or false |
| 40:21 | The answer for an invertible matrix |
| 43:47 | The row space survives row operations |
| 45:33 | Type 6: row space meets null space |

## Type 1: dimension of a span

**Problem.** Let $u,v,w$ be nonzero vectors in $\mathbb{R}^7$. What dimensions can their span have?

**Answer.** 1, 2, or 3.

- At most 3, since there are only three vectors.
- Not 0, since they are nonzero.
- All three occur: collinear gives dimension 1, coplanar but not collinear gives 2, and not coplanar gives 3.

The test is simply "dimension is at most the number of vectors" plus "nonzero rules out zero".

## Type 2: counting dimensions from structure

**Problem.** $U$ is a $5\times3$ echelon matrix of rank $r=3$.

1. What is $N(U)$?
2. What is the rank of $B=\begin{bmatrix}U\\2U\end{bmatrix}$?
3. What is the rank of $C=\begin{bmatrix}U&U\\U&0\end{bmatrix}$?
4. What is $\dim N(C^\top)$?

**Solutions.**

1. With three columns and rank 3, every column is a pivot column. No free variables, so $N(U)=\{\mathbf{0}\}$.
2. The second block is twice the first and is eliminated. The rank remains 3.
3. $C$ is $10\times6$. Block elimination gives $\begin{bmatrix}U&0\\0&-U\end{bmatrix}$; each $U$ contributes 3 pivots, so the rank is 6.
4. $C^\top$ is $6\times10$ with 10 columns and rank 6:
$$
\dim N(C^\top)=10-6=4.
$$

Only two facts are used: $\dim N(A)=n-r$ and block elimination preserves rank.

## Type 3: reconstructing a matrix from its complete solution

**Problem.** For $A\mathbf{x}=\mathbf{b}$, one particular solution is $\mathbf{x}_p=(2,0,0)^\top$, a basis of the null space is $(1,1,0)^\top$ and $(0,0,1)^\top$, and $\mathbf{b}=(2,4,2)^\top$. Find the rank, the column space, and $A$ itself.

**Step 1: rank from the null-space dimension.**

The null space has dimension 2 and the matrix is $3\times3$, so

$$
r=n-2=3-2=1.
$$

**Step 2: the first column from the particular solution.**

$A\mathbf{x}_p$ is twice the first column:

$$
2\cdot\text{col}_1=(2,4,2)^\top
\quad\Longrightarrow\quad
\text{col}_1=(1,2,1)^\top.
$$

**Step 3: the remaining columns from the null-space vectors.**

$(0,0,1)^\top\in N(A)$ forces the third column to be zero.

$(1,1,0)^\top\in N(A)$ gives

$$
\text{col}_1+\text{col}_2=\mathbf{0}
\quad\Longrightarrow\quad
\text{col}_2=(-1,-2,-1)^\top.
$$

Therefore

$$
A=\begin{bmatrix}
1&-1&0\\
2&-2&0\\
1&-1&0
\end{bmatrix}.
$$

Check: all three columns are multiples of $(1,2,1)^\top$, so the rank is 1 and the column space is the line through $(1,2,1)^\top$. The system is solvable exactly when $\mathbf{b}$ is a multiple of $(1,2,1)^\top$.

**Method.** A complete solution $\mathbf{x}_p+N(A)$ carries two kinds of information: the particular solution relates one column to $\mathbf{b}$, and the null-space basis records linear relations among columns. Together they often determine the whole matrix.

## Type 4: true or false

| Statement | Verdict | Reason |
| --- | --- | --- |
| Square $A$ with $N(A)=\{\mathbf{0}\}$ implies $N(A^\top)=\{\mathbf{0}\}$ | True | Full rank is preserved by transpose |
| The invertible $5\times5$ matrices form a subspace | False | The zero matrix is missing; sums can be singular |
| $B^2=0$ implies $B=0$ | False | Counterexample $\begin{bmatrix}0&1\\0&0\end{bmatrix}$ |
| An $m\times m$ matrix with independent columns is solvable for every $\mathbf{b}$ | True | Independent columns in a square matrix mean invertible |
| When $m=n$, the row space equals the column space | False | For $\begin{bmatrix}0&1\\0&0\end{bmatrix}$ the row space is the $(0,1)$ direction and the column space the $(1,0)$ direction |
| $A$ and $-A$ have the same four subspaces | True | Negation preserves every linear relation |
| Same four subspaces implies $A$ is a multiple of $B$ | False | Any two invertible $6\times6$ matrices have the same four subspaces |
| Swapping two rows leaves the row and null spaces unchanged | True | Row operations preserve the row space; solutions are unchanged |
| Swapping two rows leaves the column space unchanged | False | The column space generally changes |

### Why a sum of invertible matrices can be singular

Take

$$
\begin{bmatrix}1&0\\0&1\end{bmatrix}
+
\begin{bmatrix}0&0\\0&-1\end{bmatrix}
=
\begin{bmatrix}1&0\\0&0\end{bmatrix},
$$

which is singular. A simpler argument: the set of invertible matrices does not contain the zero matrix, and a subspace must contain zero, so the set cannot be a subspace at all.

## Type 5: null space of a product

**Problem.** Let $B=CD$ with $C$ invertible. How do $N(B)$ and $N(D)$ compare?

**Answer.** They are equal.

- If $D\mathbf{x}=\mathbf{0}$, then $B\mathbf{x}=C(D\mathbf{x})=\mathbf{0}$, so $N(D)\subseteq N(B)$.
- If $B\mathbf{x}=\mathbf{0}$, multiply on the left by $C^{-1}$ to get $D\mathbf{x}=\mathbf{0}$, so $N(B)\subseteq N(D)$.

Left multiplication by an invertible matrix **does not change the null space**. This is why elimination, which is left multiplication by a product of elementary matrices, can be used to find null spaces.

## Type 6: intersection of row and null spaces

**Problem.** Why can the vector $(1,2,3)$ never be both a row of $A$ and a member of $N(A)$?

Suppose it were the first row and $A\mathbf{v}=\mathbf{0}$. Then the first component of $A\mathbf{v}$ would be

$$
(1,2,3)\cdot(1,2,3)=1+4+9=14\neq0,
$$

contradicting $A\mathbf{v}=\mathbf{0}$.

More generally,

$$
\text{row space}\cap N(A)=\{\mathbf{0}\}.
$$

If $\mathbf{v}$ lies in both, it is orthogonal to every vector in the row space, in particular to itself. Then $\mathbf{v}^\top\mathbf{v}=0$, so $\mathbf{v}=\mathbf{0}$.

This is the doorway to the next lecture: the row space and null space are not only disjoint, they are **perpendicular**, with dimensions adding to $n$. They are orthogonal complements.

## Review points

- Dimension counts: $\dim N(A)=n-r$ and $\dim N(A^\top)=m-r$.
- Block elimination: count pivots contributed by each block.
- The complete solution $\mathbf{x}_p+N(A)$ can reveal the columns of $A$.
- A subspace must contain zero and be closed under addition and scaling; invertible matrices satisfy neither.
- Left multiplication by an invertible matrix preserves the null space.
- The row space and null space share only the zero vector.

## Check your understanding

**1. What dimensions can three nonzero vectors span in $\mathbb{R}^2$, and why?**

Reference answer: Only dimension 1 or dimension 2.

- Upper bound: the span is a subspace of $\mathbb{R}^2$, so its dimension is at most 2.
- Lower bound: all three vectors are nonzero, so the span contains a nonzero direction and has dimension at least 1.
- Both occur: collinear vectors span a line (dimension 1); two non-collinear vectors among them span the plane (dimension 2).

The key point: **the dimension is bounded both by the number of vectors and by the ambient space**. Three vectors in $\mathbb{R}^2$ are necessarily dependent ($3>2$), but dependence does not prevent them from spanning dimension 2.

**2. If $U$ is $5\times3$ with rank 2, what is $\dim N(U)$?**

Reference answer: Use $\dim N(A)=n-r$. Here $n=3$ and $r=2$, so
$$
\dim N(U)=3-2=1 .
$$
In elimination terms: among the three columns exactly two are pivots and one is free, so there is a single free variable and the null space is spanned by one special solution. (For reference, $\dim N(U^\top)=m-r=5-2=3$.)

**3. Given a null-space basis and one particular solution, how do you recover each column of $A$?**

Reference answer: Treat the columns as unknowns; the two kinds of information supply equations.

Let the columns be $\mathbf{c}_1,\dots,\mathbf{c}_n$.

- The particular solution gives $\mathbf{c}_1x_{p1}+\cdots+\mathbf{c}_nx_{pn}=\mathbf{b}$: one known combination of the columns equals $\mathbf{b}$.
- Each null-space basis vector $\mathbf{v}$ gives $\mathbf{c}_1v_1+\cdots+\mathbf{c}_nv_n=\mathbf{0}$: a homogeneous linear relation among the columns.

That is $1+(n-r)$ vector equations for $n$ unknown columns; together with the rank condition they usually determine the columns uniquely (if not, only the column space and the relations are determined). In the lecture's example, the null vector $\mathbf{e}_3$ forces $\mathbf{c}_3=\mathbf{0}$, $(1,1,0)$ forces $\mathbf{c}_1+\mathbf{c}_2=\mathbf{0}$, and the particular solution then fixes $\mathbf{c}_1$, recovering all of $A$.

**4. Why is the row space usually different from the column space when $m=n$? When are they equal?**

Reference answer: Rows and columns are objects in different directions; the row space is spanned by the rows and the column space by the columns, and in general they differ. Counterexample:
$$
A=\begin{bmatrix}0&1\\0&0\end{bmatrix}.
$$
Its row space is the $(0,1)$ direction (second row), while its column space is the $(1,0)$ direction (first column).

They coincide when $A$ is symmetric ($A=A^\top$), since then rows and columns are the same vectors. For example
$$
A=\begin{bmatrix}1&2\\2&3\end{bmatrix}
$$
has identical rows and columns, so both spaces are $\mathbb{R}^2$. More generally, they coincide whenever $A^\top$ has the same column space as $A$.

**5. Prove in one sentence that the row space and null space intersect only at zero.**

Reference answer: If $\mathbf{v}$ lies in both, then $A\mathbf{v}=\mathbf{0}$ makes $\mathbf{v}$ orthogonal to every row, hence to every vector of the row space — in particular to itself, so $\mathbf{v}^\top\mathbf{v}=0$ and therefore $\mathbf{v}=\mathbf{0}$.

## How this connects to the course

This lecture compresses Lectures 1–12 into exam technique. The next moves from "the intersection is only zero" to "they are perpendicular", introducing orthogonal complements and the central least-squares equation $A^\top A\hat{\mathbf{x}}=A^\top\mathbf{b}$.
