---
slug: "12-graphs-networks-incidence"
title: "Graphs, Networks, and Incidence Matrices"
summary: "An incidence matrix turns a graph into linear algebra: the null space is constant potential, the left null space is loops, and rank plus loop count gives Euler's formula."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "graphs"
  - "incidence-matrix"
  - "networks"
sources:
  - kind: "video"
    title: "12. Graphs, Networks, Incidence Matrices"
    url: "https://www.youtube.com/watch?v=6-wh6yvk6uc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Why this lecture matters

Earlier matrices were invented on the spot for illustration. This lecture uses a matrix with **genuine structure**: the incidence matrix of a graph. Real problems produce matrices with structure, and structure lets you answer questions without computing.

A graph is a set of **nodes** and **edges**. It can model an electrical grid, a water network, a bridge, a friendship relation, or the web. Strang calls it the most important discrete model in applied mathematics.

The example graph has 4 nodes and 5 edges, each given an arbitrary direction:

- $e_1: 1\to2$
- $e_2: 2\to3$
- $e_3: 1\to3$
- $e_4: 1\to4$
- $e_5: 3\to4$

## The incidence matrix

One row per edge, one column per node. An edge leaving a node contributes $-1$; entering contributes $+1$:

$$
A=\begin{bmatrix}
-1& 1& 0& 0\\
 0&-1& 1& 0\\
-1& 0& 1& 0\\
-1& 0& 0& 1\\
 0& 0&-1& 1
\end{bmatrix}.
$$

This is a sparse $5\times4$ matrix: every row has exactly two nonzero entries, so the total is $2m$ for $m$ edges. A large graph gives a large but extremely regular matrix.

## Null space: constant potential

Multiply $A$ by $\mathbf{x}=(x_1,x_2,x_3,x_4)^\top$:

$$
A\mathbf{x}=
\begin{bmatrix}
x_2-x_1\\
x_3-x_2\\
x_3-x_1\\
x_4-x_1\\
x_4-x_3
\end{bmatrix}.
$$

If $x_i$ is the potential at node $i$, then $A\mathbf{x}$ is exactly the **potential difference across each edge**.

Setting $A\mathbf{x}=\mathbf{0}$ forces every difference to vanish. The constant vector $(1,1,1,1)$ works, and so does any constant vector. Hence

$$
N(A)=\operatorname{span}\{(1,1,1,1)\},\qquad \dim N(A)=1.
$$

The physical meaning: **potentials are determined only up to a constant**. Current is driven by differences. Raising every potential by the same amount changes nothing. To fix a reference, ground one node by setting its potential to zero; that column disappears and the remaining three are independent.

## Rank and column space

$A$ is $5\times4$ with a one-dimensional null space, so

$$
r=n-1=4-1=3.
$$

Any three potentials are independent variables; the fourth is fixed by the zero-difference condition. The column space is a three-dimensional subspace of $\mathbb{R}^5$, consisting of all potential-difference patterns that satisfy Kirchhoff's voltage law.

## Left null space: loops

$A^\top\mathbf{y}=\mathbf{0}$ is one of the fundamental equations of applied mathematics. Written row by row:

$$
\begin{aligned}
-y_1-y_3-y_4&=0 &&\text{(node 1)}\\
y_1-y_2&=0 &&\text{(node 2)}\\
y_2+y_3-y_5&=0 &&\text{(node 3)}\\
y_4+y_5&=0 &&\text{(node 4)}
\end{aligned}
$$

Each line says that current into a node equals current out. This is **Kirchhoff's current law (KCL)** — a balance equation. Charge does not accumulate at nodes.

The dimension is

$$
\dim N(A^\top)=m-r=5-3=2.
$$

Two independent loops give a basis:

- loop $e_1,e_2,e_3$: $\mathbf{y}=(1,1,-1,0,0)$;
- loop $e_3,e_4,e_5$: $\mathbf{y}=(0,0,1,-1,1)$.

Current around the outer loop, $(1,1,0,-1,1)$, is also a solution, but it is the sum of the first two and adds nothing to the basis. **The number and placement of loops are exactly the dimension and basis of the left null space.**

## Euler's formula

From $\dim N(A^\top)=m-r$ and $r=n-1$ for a connected graph,

$$
\#\text{loops}=m-(n-1)=m-n+1.
$$

Rearranged:

$$
\#\text{nodes}-\#\text{edges}+\#\text{loops}=1.
$$

This is Euler's formula. Nodes are zero-dimensional, edges one-dimensional, loops two-dimensional, and the count holds for every connected planar graph. Linear algebra supplies a proof of a topological fact.

## Three equations: the skeleton of applied math

Chain the electrical quantities:

1. **Potential differences:** $\mathbf{e}=A\mathbf{x}$, with $\mathbf{x}$ the node potentials.
2. **Ohm's law:** $\mathbf{y}=C\mathbf{e}$, where $C$ is diagonal with conductances (reciprocals of resistance).
3. **Kirchhoff's current law:** $A^\top\mathbf{y}=\mathbf{f}$, with $\mathbf{f}$ external current sources.

Combining them:

$$
A^\top C A\,\mathbf{x}=\mathbf{f}.
$$

The matrix $A^\top C A$ is the prototype that dominates the rest of the chapter. It is symmetric, sparse, and encodes the graph's connectivity in an algebraic system. Numerical linear algebra is full of systems with this shape.

### About $A^\top A$

$A^\top A$ is always symmetric:

$$
(A^\top A)^\top=A^\top (A^\top)^\top=A^\top A.
$$

For an incidence matrix, $A^\top A$ is a **graph Laplacian**: diagonal entries are node degrees, and off-diagonal entries are $-1$ between adjacent nodes. It reappears in network and clustering problems.

## Takeaways

- Each row of the incidence matrix is an edge; each column is a node.
- The null space is the constant-potential vector, dimension 1; grounding a node removes that freedom.
- The left null space is the loop space, dimension $m-r$.
- For a connected graph $r=n-1$, so nodes minus edges plus loops equals 1: Euler's formula.
- Potential differences, Ohm's law, and current conservation give $A^\top C A\mathbf{x}=\mathbf{f}$.

## Check your understanding

1. Why does every row of the incidence matrix have only two nonzero entries, and what does that imply for sparsity?
2. Why must every vector in the null space be constant?
3. Why is the outer loop not an additional basis vector?
4. For a connected graph with 6 nodes and 8 edges, what are the rank and the number of independent loops?
5. What do the diagonal and off-diagonal entries of $A^\top A$ mean?

## How this connects to the course

The previous lecture treated matrices and functions as vector spaces; this one grounds vector spaces in real graphs. The next lecture reviews the first half of the course, after which orthogonality shows that the row space and null space are not merely dimension-complementary but perpendicular.
