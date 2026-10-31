---
slug: "11-matrix-spaces-rank-one"
title: "Matrix Spaces, Rank-One Matrices, and Small-World Graphs"
summary: "Vector spaces go beyond R^n: matrices and functions qualify too. Rank-one matrices are the building blocks of every matrix, and graphs bring linear algebra to networks and friendship chains."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "matrix-space"
  - "rank-one"
  - "graphs"
sources:
  - kind: "video"
    title: "11. Matrix Spaces; Rank 1; Small World Graphs"
    url: "https://www.youtube.com/watch?v=2IdtqGM6KWU"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Vectors need not be arrows

The previous lecture already hinted that matrices can be vectors. This lecture develops the idea. The only requirement is structural: **a set whose elements can be added and scaled is a vector space**. Matrix multiplication plays no role.

The space of all $3\times3$ matrices is called $M$. Its standard basis is the nine matrices $E_{ij}$, each with a single 1 in row $i$, column $j$. Hence

$$
\dim M=9.
$$

Any $3\times3$ matrix is a combination of these nine, and they are independent.

## Three subspaces

### Symmetric matrices, $S$

Symmetry requires $a_{ij}=a_{ji}$. The free choices are the 3 diagonal entries plus the 3 entries above the diagonal; the entries below are determined. Therefore

$$
\dim S=3+3=6.
$$

A warning: the basis of $S$ cannot simply be selected from the standard basis. Only three of the nine $E_{ij}$ are symmetric ($E_{11},E_{22},E_{33}$), and they cannot span all symmetric matrices. The full basis needs combinations such as

$$
\begin{bmatrix}0&1&0\\1&0&0\\0&0&0\end{bmatrix}.
$$

This is a recurring lesson: **a basis of the big space is not automatically a basis of a subspace**.

### Upper triangular matrices, $U$

Entries below the diagonal are zero. The free choices are the 3 diagonal entries plus the 3 above, so

$$
\dim U=6.
$$

Unlike the symmetric case, six of the standard $E_{ij}$ with $i\le j$ happen to form a basis. That is a coincidence of this example, not a general method.

### Diagonal matrices, $D=S\cap U$

Symmetric and upper triangular forces a diagonal matrix. Only the 3 diagonal entries are free:

$$
\dim D=3.
$$

## Intersection, union, and sum

- **Intersection** $S\cap U=D$, dimension 3.
- **Union** $S\cup U$ is not a subspace. A symmetric but non-triangular matrix plus an upper triangular but non-symmetric matrix typically produces something with neither property, so the union is not closed under addition.
- **Sum** $S+U$ is the set of all sums of one element from $S$ and one from $U$. It is the whole space $M$. Given any $A$, set

$$
S=\begin{bmatrix}
\frac{a_{11}}{2}&a_{21}&a_{31}\\[2pt]
a_{21}&\frac{a_{22}}{2}&a_{32}\\[2pt]
a_{31}&a_{32}&\frac{a_{33}}{2}
\end{bmatrix},
\qquad
U=\begin{bmatrix}
\frac{a_{11}}{2}&a_{12}-a_{21}&a_{13}-a_{31}\\[2pt]
0&\frac{a_{22}}{2}&a_{23}-a_{32}\\[2pt]
0&0&\frac{a_{33}}{2}
\end{bmatrix}.
$$

$S$ is symmetric, $U$ is upper triangular, and entry by entry the sum is $A$. Therefore

$$
S+U=M,\qquad \dim(S+U)=9.
$$

The dimension identity follows:

$$
\dim S+\dim U=\dim(S\cap U)+\dim(S+U)
\quad\Longrightarrow\quad
6+6=3+9.
$$

## Functions are vectors too

Consider the differential equation

$$
\frac{d^2y}{dx^2}+y=0.
$$

Its solutions are

$$
y=c_1\cos x+c_2\sin x.
$$

The solution set is a vector space: sums of solutions are solutions, and scalar multiples are solutions. The pair $\{\cos x,\sin x\}$ is a basis, and the dimension is 2.

Another basis is $\{e^{ix},e^{-ix}\}$ — bases vary, dimension does not. Strang's remark is sharp: **a course in linear differential equations is essentially the search for a basis of the solution space**. A second-order equation has a two-dimensional solution space.

The point of the example is that linear algebra does not depend on vectors being arrows. Addition and scalar multiplication are enough.

## Rank-one matrices: the smallest blocks

A rank-one matrix has a clean structure:

$$
A=\mathbf{u}\mathbf{v}^\top,
$$

where $\mathbf{u}$ is a column and $\mathbf{v}^\top$ is a row. Every column of the product is a multiple of $\mathbf{u}$.

### Example

$$
A=\begin{bmatrix}1&4&5\\2&8&10\end{bmatrix}
=
\begin{bmatrix}1\\2\end{bmatrix}
\begin{bmatrix}1&4&5\end{bmatrix}.
$$

- The row space is spanned by $(1,4,5)$, dimension 1.
- The column space is spanned by $(1,2)^\top$, dimension 1.
- The rank is 1, matching both dimensions.

### Every matrix is a sum of rank-one matrices

A rank-$r$ matrix can be written as the sum of $r$ rank-one matrices. A $5\times17$ matrix of rank 4, for instance, decomposes into four outer products.

This is why rank-one matrices are called building blocks: they are the simplest nonzero matrices, and every matrix is assembled from several of them. Determinants and eigenvalues of rank-one matrices are especially simple, which is why they reappear later.

### Rank-one matrices are not a subspace

A natural mistake is to treat the set of all rank-one matrices as a subspace. Add two of them:

$$
\begin{bmatrix}1&0\\0&0\end{bmatrix}
+
\begin{bmatrix}0&0\\0&1\end{bmatrix}
=
\begin{bmatrix}1&0\\0&1\end{bmatrix},
$$

which has rank 2. More generally,

$$
\operatorname{rank}(A+B)\le \operatorname{rank}(A)+\operatorname{rank}(B),
$$

so a sum of two rank-one matrices is usually rank 2. A subspace must be closed under addition, and this set is not.

## A concrete subspace: components summing to zero

In $\mathbb{R}^4$, take all vectors satisfying

$$
v_1+v_2+v_3+v_4=0.
$$

This is a subspace: addition and scaling preserve the zero sum.

It is exactly the null space of

$$
A=\begin{bmatrix}1&1&1&1\end{bmatrix}.
$$

The rank is 1 and there are $n=4$ columns, so

$$
\dim N(A)=n-r=4-1=3.
$$

A natural basis is the three special solutions:

$$
\begin{bmatrix}-1\\1\\0\\0\end{bmatrix},\quad
\begin{bmatrix}-1\\0\\1\\0\end{bmatrix},\quad
\begin{bmatrix}-1\\0\\0\\1\end{bmatrix}.
$$

The four fundamental subspaces follow:

| Subspace | Contents | Dimension |
| --- | --- | --- |
| Row space | Multiples of $(1,1,1,1)$ | 1 |
| Null space | Vectors whose components sum to zero | 3 |
| Column space | All real numbers (a $1\times1$ matrix) | 1 |
| Left null space | Only the zero vector | 0 |

The basis of the left null space is the **empty set** — a zero-dimensional space contains only the zero vector and needs no basis vectors. This detail is easy to skip but follows directly from the definition.

## Graphs: the next stage

The last five minutes introduce graphs. Here a graph is not the plot of a function but a set of **nodes and edges**.

- Let every person in the room be a node, with an edge between friends. That is a friendship graph.
- Let every person in the country be a node. That is a graph with about 260 million nodes.
- Let every web page be a node and every link an edge. That is the web graph.

The central question: **how many steps separate any two people?** This is the origin of "six degrees of separation". Strang's own example: he is two steps from a certain politician, and his students are at most three.

The mathematical interest is that **a few shortcuts collapse the distances dramatically**. The next lecture uses a matrix — the incidence matrix — to translate graph properties into linear algebra, and the four subspaces reappear, this time inside a network.

## Takeaways

- Matrices and functions are vectors whenever addition and scalar multiplication are defined.
- The space of $3\times3$ matrices has dimension 9; symmetric and upper triangular spaces each have dimension 6; diagonal has dimension 3.
- Intersection and sum of subspaces satisfy the dimension identity.
- Rank-one matrices have the form $\mathbf{u}\mathbf{v}^\top$ and build all matrices; the set of rank-one matrices is not a subspace.
- The subspace of $\mathbb{R}^4$ with component sum zero is the null space of $[1,1,1,1]$, of dimension 3.
- Graphs connect linear algebra to networks and distance.

## Check your understanding

1. Why can't a basis of the symmetric matrix space be chosen directly from the standard basis $E_{ij}$?
2. Is it a coincidence that the upper triangular space has a basis inside the standard basis?
3. Give two rank-one matrices whose sum has rank two, and verify subadditivity of rank.
4. What is a basis of the zero-dimensional space, and why?
5. How would you encode a friendship graph as a matrix?

## How this connects to the course

The previous lecture established the four fundamental subspaces. This one extends "space" to matrices and functions and introduces rank-one decomposition. The next lecture uses matrices to describe graphs: nodes, edges, incidence matrices, and what the four subspaces mean on a network.
