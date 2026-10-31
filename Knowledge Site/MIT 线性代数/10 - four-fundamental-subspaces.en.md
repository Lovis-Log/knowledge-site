---
slug: "10-four-fundamental-subspaces"
title: "The Four Fundamental Subspaces"
summary: "Every m by n matrix carries four subspaces — column, null, row, and left null — and their bases and dimensions form the backbone of linear algebra."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "four-subspaces"
  - "rank"
  - "row-space"
sources:
  - kind: "video"
    title: "10. The Four Fundamental Subspaces"
    url: "https://www.youtube.com/watch?v=nHlE7EgJFds"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## An error corrected, and the lecture it opens

At the end of the previous lecture Strang tried to replace the standard basis of $\mathbb{R}^3$ with

$$
\mathbf{v}_1=\begin{bmatrix}1\\1\\2\end{bmatrix},\quad
\mathbf{v}_2=\begin{bmatrix}2\\2\\5\end{bmatrix},\quad
\mathbf{v}_3=\begin{bmatrix}3\\3\\8\end{bmatrix},
$$

assuming the third vector stepped out of the plane spanned by the first two. A student pointed out that the three are dependent.

The check does not require solving for coefficients. Form the matrix

$$
A=\begin{bmatrix}1&2&3\\1&2&3\\2&5&8\end{bmatrix}.
$$

**Rows one and two are identical**, so $A$ is singular and its columns must be dependent. Direct calculation confirms

$$
\mathbf{v}_1-2\mathbf{v}_2+\mathbf{v}_3=\mathbf{0}.
$$

The lesson opens the lecture: **relations among rows constrain the columns**. To say that precisely, rows have to be treated as a space of their own.

## The four subspaces

For an $m\times n$ matrix $A$:

| Subspace | Notation | Definition | Lives in | Dimension |
| --- | --- | --- | --- | --- |
| Column space | $C(A)$ | All combinations of the columns | $\mathbb{R}^m$ | $r$ |
| Null space | $N(A)$ | All $\mathbf{x}$ with $A\mathbf{x}=\mathbf{0}$ | $\mathbb{R}^n$ | $n-r$ |
| Row space | $C(A^\top)$ | All combinations of the rows | $\mathbb{R}^n$ | $r$ |
| Left null space | $N(A^\top)$ | All $\mathbf{y}$ with $A^\top\mathbf{y}=\mathbf{0}$ | $\mathbb{R}^m$ | $m-r$ |

Writing the row space as $C(A^\top)$ just stands the rows up so that every fact proved for column spaces applies. The left null space earns its name by transposing:

$$
A^\top\mathbf{y}=\mathbf{0}
\quad\Longleftrightarrow\quad
\mathbf{y}^\top A=\mathbf{0}.
$$

Now $\mathbf{y}^\top$ is a row vector multiplying $A$ **from the left**.

### Where the spaces sit

In $\mathbb{R}^n$, the row space and null space have dimensions adding to $n$. In $\mathbb{R}^m$, the column space and left null space have dimensions adding to $m$. Each pair splits one ambient space completely — and, as later lectures show, each pair is an orthogonal complement.

## Four bases, four dimensions

### Column space: the pivot columns

Run elimination on $A$ and identify the pivot columns. **Take those columns from the original $A$**; they form a basis, and there are $r$ of them.

Why not the pivot columns of the reduced form $R$? Because row operations preserve the row space but change the column space. The columns of $R$ generally span a different space.

### Row space: the first $r$ rows of $R$

Row operations combine rows with rows, so the **row space is unchanged**. Once $A$ is reduced to $R$, the nonzero rows of $R$ form a basis.

More precisely, the first $r$ (nonzero) rows of $R$ form a basis of the row space. This also proves **row rank equals column rank**: both count pivots.

### Null space: the special solutions

For each free variable, set it to 1 and the other free variables to 0, then solve for the pivot variables. The $n-r$ resulting vectors form a basis of the null space.

### Left null space: via the elimination matrix $E$

This basis is less immediate. Use the augmented Gauss-Jordan form:

$$
[A \mid I]\ \longrightarrow\ [R \mid E],
$$

where $E$ records every row operation and satisfies

$$
EA=R.
$$

$E$ is $m\times m$. Its **last $m-r$ rows** form a basis of the left null space.

#### A small example

Take

$$
A=\begin{bmatrix}1&2&3\\2&4&6\end{bmatrix}.
$$

The second row is twice the first, so $r=1$. Elimination does $r_2-2r_1=0$, and the elimination matrix is

$$
E=\begin{bmatrix}1&0\\-2&1\end{bmatrix}.
$$

Its last $m-r=1$ row is $(-2,1)$. Check:

$$
(-2,1)\begin{bmatrix}1&2&3\\2&4&6\end{bmatrix}=(0,0,0).
$$

So $(-2,1)$ is a basis of the left null space. The meaning is concrete: **row two minus twice row one gives the zero row**, and those coefficients are the vector.

## Why the dimensions split this way

The four dimensions satisfy two additive relations:

$$
\dim C(A)+\dim N(A)=r+(n-r)=n,
$$

$$
\dim C(A^\top)+\dim N(A^\top)=r+(m-r)=m.
$$

The first mirrors "$n$ variables = $r$ pivot variables + $n-r$ free variables". The second applies the same logic to $A^\top$, which is $n\times m$ and therefore has $m$ columns.

### Row rank equals column rank

This is the central theorem of the lecture:

$$
\dim C(A)=\dim C(A^\top)=r.
$$

It resolves the opening error: two identical rows mean the row space has dimension at most 2, so the column space does too, and three columns must be dependent.

## Matrices are themselves vectors

The last minutes widen the definition once more. All $3\times3$ matrices form a vector space $M$: they can be added and scaled, and the zero matrix is the zero element. Note that **matrix multiplication is not used** — a vector space only needs addition and scalar multiplication.

Subspaces follow:

| Subspace | Constraint | Dimension |
| --- | --- | --- |
| All $3\times3$ matrices, $M$ | none | 9 |
| Symmetric matrices, $S$ | $a_{ij}=a_{ji}$ | 6 |
| Upper triangular matrices, $U$ | $a_{ij}=0$ for $i>j$ | 6 |
| Diagonal matrices, $D=S\cap U$ | all off-diagonal entries zero | 3 |

A basis of $D$ is the three matrices with a single 1 on one diagonal position, so the dimension is 3.

### Intersection and sum

- **Intersection** $S\cap U$: symmetric and upper triangular forces diagonal, dimension 3.
- **Union** is not a subspace: two differently directed lines fail closure under addition.
- **Sum** $S+U$: any symmetric plus any upper triangular can produce an arbitrary $3\times3$ matrix, so $S+U=M$, dimension 9.

Dimensions obey

$$
\dim S+\dim U=\dim(S\cap U)+\dim(S+U),
$$

that is, $6+6=3+9$. This is not a coincidence but a general formula for subspaces.

## Takeaways

- Every matrix carries four subspaces, living in $\mathbb{R}^m$ and $\mathbb{R}^n$.
- Bases: pivot columns of $A$, first $r$ rows of $R$, special solutions, last $m-r$ rows of $E$.
- Dimensions: $r$, $n-r$, $r$, $m-r$.
- Row rank equals column rank — the quantitative form of "rows constrain columns".
- Matrices can be treated as vectors, with their own subspaces, bases, and dimensions.

## Check your understanding

1. Why must a column-space basis use the pivot columns of $A$ rather than the columns of $R$?
2. Why do the last $m-r$ rows of the elimination matrix $E$ form a basis of the left null space?
3. For a $4\times6$ matrix of rank 2, give the four dimensions and the ambient space of each.
4. What are the intersection and sum of the symmetric and upper triangular matrix spaces? Do the dimensions satisfy the formula?
5. If a matrix has two identical rows, what can you say immediately about its rank?

## How this connects to the course

The previous lecture defined independence, basis, and dimension. This one applies them to a matrix's four subspaces. The next lecture widens "vector space" again: matrix spaces, function spaces, and rank-one matrices as the building blocks of all matrices.
