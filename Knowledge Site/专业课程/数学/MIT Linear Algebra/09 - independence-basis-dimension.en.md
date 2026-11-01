---
slug: "09-independence-basis-dimension"
title: "Independence, Basis, and Dimension"
summary: "Four words get precise meanings: independence asks whether a zero combination is unique, spanning asks for all combinations, a basis does both, and dimension is the shared size of every basis."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "independence"
  - "basis"
  - "dimension"
sources:
  - kind: "video"
    title: "9. Independence, Basis, and Dimension"
    url: "https://www.youtube.com/watch?v=yjBerM5jWsc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Four words this lecture defines

This is the pivot of 18.06. Until now the work was computation: elimination, solving systems, finding null spaces. From here on, the course names structure.

| Term | Applies to | Question it answers |
| --- | --- | --- |
| Linear independence | A set of vectors | Is the all-zero combination the only one that gives $\mathbf{0}$? |
| Spanning | A set of vectors and a space | Is every vector in the space a combination of the set? |
| Basis | A set of vectors and a space | Independent and spanning: exactly the right size |
| Dimension | A space | How many vectors does any basis contain? |

Grammar matters: **a set of vectors is independent**, not a matrix. A matrix has rank; a space has dimension. Getting the words right is part of getting the idea right.

### The opening fact: more unknowns than equations

Let $A$ be $m\times n$ with $n>m$. Then $A\mathbf{x}=\mathbf{0}$ has a nonzero solution.

Elimination explains it: with at most $m$ pivots among $n$ variables, at least $n-m$ variables are free. Assign a nonzero value to a free variable, solve for the pivots, and you have a nonzero solution. In one sentence:

> More unknowns than equations forces a null space larger than $\{\mathbf{0}\}$.

This fact drives the whole lecture. It is the matrix form of "too many vectors in a lower-dimensional space must be dependent".

## Timeline

| Time | Topic |
| --- | --- |
| 0:09 | Opening: the four words this lecture defines |
| 1:52 | More unknowns than equations forces free variables |
| 3:55 | Nonzero choices of free variables give a combination equal to zero |
| 5:36 | Combinations of $v$ and $2v$ |
| 9:18 | Three coplanar vectors are always dependent |
| 11:00 | Definition of independence: only zero coefficients give zero |
| 14:33 | Column combinations written as $A\mathbf{x}$ |
| 16:14 | Counting pivots to test the columns |
| 17:54 | Independent exactly when the null space is trivial |
| 21:36 | Spanning: the columns reach every vector |
| 25:02 | The standard basis $e_1,e_2,e_3$ |
| 26:45 | Bases are not unique |
| 28:26 | Adding a vector off the plane gives another basis |
| 30:19 | When three vectors in $R^3$ form a basis |
| 33:57 | Every basis of a space has the same size |
| 37:27 | Basis = independent and spanning |
| 40:48 | Picking a basis: the pivot columns |
| 42:28 | Dimensions: $r$ and $n-r$ |
| 45:54 | Another basis: pivot columns and special solutions |
| 49:17 | The lecture's closing formulas |

## Independence

Vectors $\mathbf{v}_1,\dots,\mathbf{v}_n$ are linearly independent exactly when

$$
c_1\mathbf{v}_1+c_2\mathbf{v}_2+\cdots+c_n\mathbf{v}_n=\mathbf{0}
$$

has only the solution $c_1=\cdots=c_n=0$. If some nonzero choice of coefficients also produces $\mathbf{0}$, the vectors are dependent.

### Three quick cases

1. **$\mathbf{v}$ and $2\mathbf{v}$.** Take $2\mathbf{v}_1-\mathbf{v}_2=\mathbf{0}$. The coefficients $(2,-1)$ are not all zero, so the pair is dependent.
2. **$\mathbf{v}$ and the zero vector.** Take $0\cdot\mathbf{v}+5\cdot\mathbf{0}=\mathbf{0}$. Any set containing the zero vector is dependent.
3. **Three vectors in the plane.** Put them as the columns of a $2\times3$ matrix. Three unknowns, two equations, so a nonzero null-space vector exists. Three planar vectors are always dependent.

The third case makes the general principle visible: **excess alone creates dependence**. In an $n$-dimensional space, any set of more than $n$ vectors is dependent.

## Independence through the null space

Put $\mathbf{v}_1,\dots,\mathbf{v}_n$ into the columns of $A$. Then

$$
A\mathbf{c}=c_1\mathbf{v}_1+\cdots+c_n\mathbf{v}_n.
$$

Therefore:

- the columns are independent iff $N(A)=\{\mathbf{0}\}$;
- they are dependent iff $N(A)$ contains a nonzero vector;
- independent means rank $r=n$: every column is a pivot column, with no free variables;
- dependent means $r<n$: some free column exists.

For a square matrix this becomes: **the columns form a basis of $\mathbb{R}^n$ iff the matrix is invertible**.

## Spanning

A set of vectors spans a space when the space consists of **all linear combinations** of those vectors.

There is an equivalent description: among all subspaces containing the vectors, the span is the **smallest** one. Any subspace that contains the vectors must contain every combination of them, so stopping at the combinations gives the minimum.

The columns of a matrix span its column space. Spanning does not require economy: redundant vectors may be present, they are simply unnecessary.

## Basis: not too few, not too many

A basis of a space $V$ is a set of vectors that is

1. linearly independent (nothing redundant), and
2. spanning (nothing missing).

Bases are not unique. The standard basis of $\mathbb{R}^3$,

$$
\mathbf{e}_1=\begin{bmatrix}1\\0\\0\end{bmatrix},\quad
\mathbf{e}_2=\begin{bmatrix}0\\1\\0\end{bmatrix},\quad
\mathbf{e}_3=\begin{bmatrix}0\\0\\1\end{bmatrix},
$$

is the most convenient one, but the columns of any invertible $3\times3$ matrix also form a basis.

### Example: two are too few, three can be too many

In $\mathbb{R}^3$ take

$$
\mathbf{v}_1=\begin{bmatrix}1\\1\\2\end{bmatrix},\qquad
\mathbf{v}_2=\begin{bmatrix}2\\2\\5\end{bmatrix}.
$$

They are independent (not multiples), but they span only a plane, not all of $\mathbb{R}^3$.

Adding $\mathbf{v}_3=(3,3,7)^\top$ does not help: it equals $\mathbf{v}_1+\mathbf{v}_2$, so the three vectors still span the same plane and are now dependent.

Adding $\mathbf{v}_3=(3,3,8)^\top$ looks better, but form the matrix with these vectors as columns:

$$
A=\begin{bmatrix}1&2&3\\1&2&3\\2&5&8\end{bmatrix}.
$$

**Rows one and two are identical**, so $A$ is singular and its columns must be dependent. Directly,

$$
\mathbf{v}_1-2\mathbf{v}_2+\mathbf{v}_3=\mathbf{0}.
$$

Two lessons follow. Picking the third vector by geometric intuition is unreliable. And **relations among rows constrain the columns** — the seed of the next lecture on row space.

## Dimension

Any two bases of a given space contain the same number of vectors. That number is the **dimension** of the space.

$$
\dim(\mathbb{R}^n)=n,\qquad \dim(\text{column space})=\text{rank }r.
$$

Dimension is "exactly enough": one vector fewer cannot span, one more must be dependent.

## Dimensions of the column and null spaces

For $A$ of size $m\times n$ and rank $r$:

- **Column space basis:** the $r$ pivot columns of the original $A$. They must come from $A$, not from the reduced form $R$, because row operations change the column space.
- **Null space basis:** the special solutions associated with the $n-r$ free variables.
- Hence

$$
\dim C(A)=r,\qquad \dim N(A)=n-r.
$$

The two add to the number of columns $n$, because the $n$ variables split into $r$ pivot variables and $n-r$ free variables.

### A useful corollary

If you already know a space has dimension $d$, then any $d$ independent vectors in it automatically form a basis. If they failed to span, you would need a $(d+1)$-st vector, which would have to be dependent on the first $d$ — a contradiction.

This saves work in both exercises and engineering: **when the dimension is known, independence alone suffices**.

## Takeaways

- Independent means the zero combination is unique; dependent means a nonzero combination gives zero.
- Spanning means taking every linear combination; it is the smallest subspace containing the set.
- A basis is independent and spanning. Bases vary; their size does not.
- Dimension is the number of vectors in any basis.
- The column space has dimension $r$; the null space has dimension $n-r$.

## Check your understanding

**1. Why does a set containing the zero vector have to be dependent?**

Reference answer: Suppose $\mathbf{v}_k=\mathbf{0}$. Choose $c_k=1$ and all other $c_i=0$. Then
$$
c_1\mathbf{v}_1+\cdots+c_n\mathbf{v}_n=1\cdot\mathbf{0}=\mathbf{0},
$$
with coefficients not all zero, so the set is dependent by definition. The zero vector supplies no new direction: it contributes nothing to the span while destroying independence.

**2. If three vectors in $\mathbb{R}^3$ are dependent, must one be a combination of the other two? What if two of them are collinear?**

Reference answer: Yes, some one of them is a combination of the rest. Dependence gives $c_1\mathbf{v}_1+c_2\mathbf{v}_2+c_3\mathbf{v}_3=\mathbf{0}$ with some coefficient nonzero. If, say, $c_3\ne0$, then
$$
\mathbf{v}_3=-\frac{c_1}{c_3}\mathbf{v}_1-\frac{c_2}{c_3}\mathbf{v}_2,
$$
so $\mathbf{v}_3$ is a combination of the other two.

If two are collinear, say $\mathbf{v}_1=\lambda\mathbf{v}_2$, then $\mathbf{v}_1-\lambda\mathbf{v}_2=\mathbf{0}$ is already a nontrivial combination, so the triple is dependent regardless of the third vector. The vector being represented is one of the collinear pair, and the third may point in a completely independent direction — the collinear pair is what spoils independence, not the third vector.

**3. Why does a column-space basis use the pivot columns of $A$ rather than those of $R$?**

Reference answer: Row operations preserve the null space but change the column space. The columns of $R$ have been rewritten, so they generally do not span $C(A)$; using them would give the wrong space.

The pivot columns of $A$ satisfy both requirements:

- Independence: their counterparts in $R$ are pivot columns and are independent, and row operations preserve all linear relations among columns, so the pivot columns of $A$ are independent too.
- Spanning: every column of $R$ is a combination of its pivot columns, with coefficients unchanged by the row operations, so every column of $A$ is the same combination of the pivot columns of $A$.

Independent and spanning, the pivot columns of $A$ form a basis of $C(A)$, and there are $r$ of them.

**4. Why do four independent vectors in a four-dimensional space automatically form a basis?**

Reference answer: Only spanning remains to be checked. If they failed to span, some vector $\mathbf{w}$ of the space would lie outside their span; adjoining $\mathbf{w}$ would produce five independent vectors (otherwise $\mathbf{w}$ would lie in the span, a contradiction). But any set of more than $d$ vectors in a $d$-dimensional space is dependent, which contradicts $\dim=4$. So the four vectors already span the space. Equivalently, every independent set extends to a basis; a basis has four vectors, and the set already has four, so there is nothing to add.

**5. For a $5\times7$ matrix of rank 3, what are the dimensions of the column and null spaces?**

Reference answer: Here $m=5$, $n=7$ and $r=3$. The column-space dimension equals the rank:
$$
\dim C(A)=r=3 .
$$
The null-space dimension equals the number of free variables:
$$
\dim N(A)=n-r=7-3=4 .
$$
The two add to $3+4=7=n$, matching "pivot variables plus free variables equal all variables." (For reference, the row space also has dimension 3, and the left null space has dimension $m-r=2$.)

## How this connects to the course

The previous lecture computed null spaces; this one names what those computations produce. The next lecture extends the language to the four fundamental subspaces and proves the surprising fact that the row space and column space have the same dimension.
