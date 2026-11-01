---
slug: "07-ax-equals-zero"
title: "Solving Ax = 0: Pivot Variables, Free Variables, and Special Solutions"
summary: "Elimination produces echelon form; the number of pivot columns is the rank r, leaving n-r free variables. Set each free variable to 1 and the rest to 0 to get the special solutions spanning the nullspace."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "nullspace"
  - "rank"
  - "rref"
  - "special-solutions"
sources:
  - kind: "video"
    title: "Lecture 7: Solving Ax = 0: Pivot Variables, Special Solutions"
    url: "https://www.youtube.com/watch?v=VqP2tREMvt0"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## From definition to algorithm

The previous lecture defined the nullspace $N(A)=\{\mathbf{x}\mid A\mathbf{x}=\mathbf{0}\}$ but did not compute it. This lecture supplies the algorithm, built on elimination.

One key fact: **elimination does not change the nullspace**. Swapping rows and subtracting a multiple of one row from another are legitimate equation operations, so the solution set is unchanged. Elimination does change the column space — a distinction worth keeping straight.

## Timeline

| Time | Topic |
| --- | --- |
| 1:22 | Pivots and rank |
| 3:55 | Elimination produces a zero row |
| 4:59 | Pivot columns and free columns |
| 6:12 | Echelon form |
| 6:48 | The rank |
| 8:13 | Finding pivots and free variables |
| 9:22 | Setting a free variable to one |
| 10:17 | Back substitution |
| 12:14 | The null space is a line |
| 15:10 | Special solutions |
| 17:28 | Counting pivot and free variables |
| 19:25 | Reduced row echelon form |
| 21:53 | Eliminating upward to reach $R$ |
| 29:54 | The null space matrix |
| 33:08 | A second example |
| 37:06 | The number of pivot columns equals the rank |
| 41:28 | The identity block inside the solution |
| 42:39 | Where the minus $F$ comes from |

## Example: a $3\times4$ matrix

$$
A=
\begin{bmatrix}
1&2&2&2\\
2&4&6&8\\
3&6&8&10
\end{bmatrix}.
$$

Two things are visible before any computation:

- column two is twice column one, so it is not independent;
- row three is the sum of rows one and two, so the rows are not independent either.

Elimination should discover both.

### Elimination

**Step one:** use the first pivot $1$ to clear below it.

$$
\begin{aligned}
R_2 &\leftarrow R_2-2R_1=[0,0,2,4],\\
R_3 &\leftarrow R_3-3R_1=[0,0,2,4].
\end{aligned}
$$

**Step two:** the pivot position in column two is $0$, and so is everything below it. That column has no pivot. Do not stop; move to column three.

Column three has a $2$ in row two, which becomes the second pivot. Use $R_3\leftarrow R_3-R_2$:

$$
R_3=[0,0,2,4]-[0,0,2,4]=[0,0,0,0].
$$

The echelon form is

$$
U=
\begin{bmatrix}
1&2&2&2\\
0&0&2&4\\
0&0&0&0
\end{bmatrix}.
$$

There are only **two pivots**. That count is the **rank**:

$$
r=\text{number of pivots}=2.
$$

The zero row records that the original third row was a combination of the first two.

### Pivot columns and free columns

- Pivots are in columns 1 and 3, so $x_1,x_3$ are **pivot variables**;
- Columns 2 and 4 have no pivot, so $x_2,x_4$ are **free variables**.

The number of free variables is

$$
n-r=4-2=2.
$$

"Free" means they may be assigned arbitrarily; the equations then determine the pivot variables uniquely.

> **One-sentence summary:** Elimination finds the r genuinely independent equations; the remaining n-r directions are free choices, and they span the nullspace.

## Special solutions: give free variables 1 and 0

### First special solution: $x_2=1,\ x_4=0$

Write $U\mathbf{x}=\mathbf{0}$ as equations:

$$
\begin{aligned}
x_1+2x_2+2x_3+2x_4 &= 0,\\
2x_3+4x_4 &= 0.
\end{aligned}
$$

Substitute $x_2=1,\ x_4=0$:

The second equation gives $2x_3=0$, so $x_3=0$.

The first gives $x_1+2=0$, so $x_1=-2$.

$$
\mathbf{s}_1=\begin{bmatrix}-2\\1\\0\\0\end{bmatrix}.
$$

It says exactly that column two is twice column one: $-2\mathbf{c}_1+\mathbf{c}_2=\mathbf{0}$.

### Second special solution: $x_2=0,\ x_4=1$

Second equation: $2x_3+4=0$, so $x_3=-2$.

First equation: $x_1+2(-2)+2(1)=0$, so $x_1=2$.

$$
\mathbf{s}_2=\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}.
$$

Check the column relation:

$$
2\mathbf{c}_1-2\mathbf{c}_3+\mathbf{c}_4=\mathbf{0}.
$$

### The whole nullspace

$$
N(A)=\left\{c_1\begin{bmatrix}-2\\1\\0\\0\end{bmatrix}
+c_2\begin{bmatrix}2\\0\\-2\\1\end{bmatrix}
\ \middle|\ c_1,c_2\in R\right\}.
$$

This is a two-dimensional subspace of $R^4$. The two special solutions form a basis.

## Reducing to $R$

The echelon form $U$ is enough, but it can be cleaned further into **reduced row echelon form** (rref):

1. eliminate upward so entries above each pivot are zero;
2. divide each pivot row by its pivot so every pivot is $1$.

For this example:

- $R_1\leftarrow R_1-R_2$: row one becomes $[1,2,0,-2]$;
- $R_2\leftarrow R_2/2$: row two becomes $[0,0,1,2]$.

$$
R=
\begin{bmatrix}
1&2&0&-2\\
0&0&1&2\\
0&0&0&0
\end{bmatrix}.
$$

The structure is now transparent:

- the pivot rows and pivot columns contain an identity matrix;
- the remaining nonzero part $F$ sits in the free columns;
- zero rows lie below.

$$
R=\begin{bmatrix}I&F\\0&0\end{bmatrix},
\qquad
F=\begin{bmatrix}2&-2\\0&2\end{bmatrix}.
$$

### Reading the nullspace off $R$

Write $R\mathbf{x}=\mathbf{0}$ in blocks:

$$
\begin{bmatrix}I&F\end{bmatrix}
\begin{bmatrix}\mathbf{x}_{\text{pivot}}\\ \mathbf{x}_{\text{free}}\end{bmatrix}
=\mathbf{0}.
$$

So

$$
\mathbf{x}_{\text{pivot}}+F\mathbf{x}_{\text{free}}=\mathbf{0}
\;\Longrightarrow\;
\mathbf{x}_{\text{pivot}}=-F\mathbf{x}_{\text{free}}.
$$

Give the free variables the columns of the identity (one gets $1$, the rest $0$, then rotate), and the result is the **nullspace matrix**

$$
N=\begin{bmatrix}-F\\ I\end{bmatrix}
=
\begin{bmatrix}
-2&2\\
1&0\\
0&-2\\
0&1
\end{bmatrix}.
$$

Its columns are exactly $\mathbf{s}_1,\mathbf{s}_2$. The "special solutions" are not a trick; they are $-F$ moved into the pivot-variable slots.

## A second example: the transpose

Take

$$
A^T=
\begin{bmatrix}
1&2&3\\
2&4&6\\
2&6&8\\
2&8&10
\end{bmatrix}.
$$

This is $4\times3$, so $x$ has three components.

Prediction: the first two columns are independent, the third is their sum, so the rank is still $2$ and there is $3-2=1$ free variable.

### Elimination

First pivot $1$:

$$
R_2-2R_1=[0,0,0],\quad
R_3-2R_1=[0,2,2],\quad
R_4-2R_1=[0,4,4].
$$

The pivot position in column two is $0$, but there is a $2$ below it, so swap rows two and three:

$$
\begin{bmatrix}
1&2&3\\
0&2&2\\
0&0&0\\
0&4&4
\end{bmatrix}.
$$

Eliminate row four with row two: $R_4-2R_2=[0,0,0]$. Thus

$$
U=
\begin{bmatrix}
1&2&3\\
0&2&2\\
0&0&0\\
0&0&0
\end{bmatrix},
\qquad r=2.
$$

Pivot columns are 1 and 2; column 3 is free.

### Nullspace

Set $x_3=1$. The second equation gives

$$
2x_2+2=0 \;\Longrightarrow\; x_2=-1.
$$

The first gives

$$
x_1+2(-1)+3=0 \;\Longrightarrow\; x_1=-1.
$$

$$
N(A^T)=\left\{c\begin{bmatrix}-1\\-1\\1\end{bmatrix}\ \middle|\ c\in R\right\}.
$$

This is a line.

### Reducing to $R$

Subtract row two from row one, then divide row two by $2$:

$$
R=
\begin{bmatrix}
1&0&1\\
0&1&1\\
0&0&0\\
0&0&0
\end{bmatrix}
=\begin{bmatrix}I&F\\0&0\end{bmatrix},
\qquad
F=\begin{bmatrix}1\\1\end{bmatrix}.
$$

The nullspace matrix is

$$
N=\begin{bmatrix}-F\\I\end{bmatrix}
=\begin{bmatrix}-1\\-1\\1\end{bmatrix}.
$$

## A basic fact about rank

$A$ and $A^T$ have the same rank. The original $A$ is $3\times4$ with rank $2$; $A^T$ is $4\times3$ with rank $2$.

Rank equals the number of pivots, and also the number of independent directions in the column space. The next lecture explains this fully alongside the four fundamental subspaces.

## Takeaways

- Elimination preserves the nullspace but changes the column space.
- Rank $r$ = number of pivots = number of pivot columns.
- There are $n-r$ free variables, one special solution per free variable.
- To get a special solution, set one free variable to $1$ and the rest to $0$, then back-substitute.
- The nullspace is all combinations of the special solutions, with dimension $n-r$.
- In rref, $R=[I\ F;0\ 0]$, and the nullspace matrix is $[-F;I]$.
- $A$ and $A^T$ have the same rank.

## Check your understanding

**1. For the first example, state the rank, pivot columns, and free columns, and explain why row three became a zero row.**

Reference answer: The rank is $r=2$. The pivot columns are columns 1 and 3, so $x_1,x_3$ are pivot variables; columns 2 and 4 are free, so $x_2,x_4$ are free variables, $n-r=4-2=2$ of them.
Row three became zero because it was already a combination of the first two rows:
$$
[3,6,8,10]=[1,2,2,2]+[2,4,6,8],
$$
i.e. $R_3=R_1+R_2$. Elimination performs $R_3\leftarrow R_3-3R_1$ and then $R_3\leftarrow R_3-R_2$, peeling off exactly that combination until the row vanishes. A zero row means the third equation adds no new information.

**2. Derive the nullspace matrix $[-F;I]$ from the block structure of $R$.**

Reference answer: Write $R=[I\ \ F]$ and $\mathbf{x}=[\mathbf{x}_{\text{pivot}};\mathbf{x}_{\text{free}}]$. Then $R\mathbf{x}=\mathbf{0}$ becomes
$$
I\,\mathbf{x}_{\text{pivot}}+F\,\mathbf{x}_{\text{free}}=\mathbf{0}
\;\Longrightarrow\;
\mathbf{x}_{\text{pivot}}=-F\,\mathbf{x}_{\text{free}}.
$$
Free variables are arbitrary and determine the pivot variables. Taking $\mathbf{x}_{\text{free}}$ to be the columns of the identity (first free variable 1 and the rest 0, then rotate) produces the columns $[-F]$ stacked on $I$:
$$
N=\begin{bmatrix}-F\\ I\end{bmatrix}.
$$
Each column is one special solution, and there are $n-r$ of them, the dimension of the nullspace. Here $F=\begin{bmatrix}2&-2\\0&2\end{bmatrix}$, so $N=\begin{bmatrix}-2&2\\1&0\\0&-2\\0&1\end{bmatrix}$, whose columns are exactly $\mathbf{s}_1,\mathbf{s}_2$.

**3. In the second example, why is the rank still $2$ after the row exchange?**

Reference answer: A row exchange only reorders the equations; equivalently it left-multiplies by an invertible permutation matrix, so it neither creates nor destroys pivots. Before the swap the second pivot slot was zero with a nonzero $2$ below it; after the swap that $2$ is the pivot, and further elimination zeros row four. Two pivots remain:
$$
U=\begin{bmatrix}1&2&3\\0&2&2\\0&0&0\\0&0&0\end{bmatrix}.
$$
Consistently, this matrix is $A^T$ of the earlier matrix, which had rank $2$; transposition preserves rank.

**4. If $A$ is $5\times7$ with rank $3$, what is the dimension of its nullspace?**

Reference answer: With $n=7$ columns and $r=3$ pivots, the number of free variables is
$$
n-r=7-3=4,
$$
so $N(A)$ is a four-dimensional subspace of $R^7$. Intuitively, only three of the seven unknowns are pinned down by independent equations; four directions remain free, one special solution each.

**5. Why does elimination preserve the nullspace but change the column space? Give a concrete change for each.**

Reference answer: The nullspace is preserved because every row operation is invertible: if $A\mathbf{x}=\mathbf{0}$ then the operated system still holds, and reversing the operation recovers $A\mathbf{x}=\mathbf{0}$ from $U\mathbf{x}=\mathbf{0}$. The solution sets coincide.
The column space changes because row operations recombine rows. In the example, the first column of $A$ is $[1,2,3]^T$, which is in $C(A)$; but every column of $U$ has zero third component, so $C(U)$ contains only vectors with third component zero, and $[1,2,3]^T\notin C(U)$. Hence $C(A)\ne C(U)$ even though the nullspaces agree. The slogan: row operations preserve the nullspace and change the column space; column operations do the reverse.

## How it connects

This lecture gives the complete algorithm for the nullspace. The next tackles $A\mathbf{x}=\mathbf{b}$: elimination first decides whether a solution exists, then "particular solution plus nullspace" describes all of them, leading into the four fundamental subspaces.
