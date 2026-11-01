---
slug: "33-pseudoinverse"
title: "Left, Right, and Pseudoinverses: Four Cases by Rank"
summary: "Whether an inverse exists depends on m, n, and r: full-rank square gives a two-sided inverse, full column rank a left inverse, full row rank a right inverse, and the general case a pseudoinverse built from SVD."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "pseudoinverse"
  - "four-subspaces"
  - "least-squares"
sources:
  - kind: "video"
    title: "33. Left and Right Inverses; Pseudoinverse"
    url: "https://www.youtube.com/watch?v=Go2aLo7ZOlU"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Classifying inverses with the four subspaces

Let $A$ be $m\times n$ of rank $r$. Everything turns on the familiar picture:

- row space $\subseteq\mathbb R^n$, dimension $r$;
- null space $\subseteq\mathbb R^n$, dimension $n-r$;
- column space $\subseteq\mathbb R^m$, dimension $r$;
- left null space (null space of $A^{\mathsf T}$) $\subseteq\mathbb R^m$, dimension $m-r$.

Inverses fail exactly because **vectors in the null space are sent to zero, and no map can bring them back**. How much can be inverted depends on how large the null spaces are.

## Timeline

| Time | Topic |
| --- | --- |
| 0:03 | Classifying inverses by the four subspaces |
| 2:26 | Invertible square matrices have two-sided inverses |
| 5:59 | The left inverse when columns are independent |
| 8:55 | $A^{\mathsf T}A$ is invertible in the full column rank case |
| 11:42 | A rectangular matrix has no two-sided inverse |
| 12:34 | The right inverse in the full row rank case |
| 14:38 | The number of solutions of $Ax=b$ |
| 16:13 | Right inverses and projection |
| 18:56 | The matrix $A(A^{\mathsf T}A)^{-1}A^{\mathsf T}$ is a projection |
| 23:03 | The pseudoinverse: row space to column space |
| 24:42 | Row and column spaces share a dimension |
| 26:21 | Definition and picture of the pseudoinverse |
| 28:10 | $A$ is one-to-one on the row space |
| 31:11 | The pseudoinverse and least squares |
| 32:53 | Constructing the pseudoinverse from the SVD |
| 35:48 | Where $\sigma\sigma^+=1$ fails: zero singular values |
| 36:40 | Both $AA^+$ and $A^+A$ are projections |
| 39:59 | What the pseudoinverse can and cannot do |

## Four cases

| Case | Rank | Null spaces | Solutions | Kind of inverse |
| --- | --- | --- | --- | --- |
| Full-rank square | $r=m=n$ | trivial on both sides | unique | two-sided $A^{-1}$ |
| Full column rank | $r=n\le m$ | null space of $A$ trivial | zero or one | left inverse |
| Full row rank | $r=m\le n$ | null space of $A^{\mathsf T}$ trivial | always, infinitely many | right inverse |
| General | $r<\min(m,n)$ | both nontrivial | — | pseudoinverse |

### Case one: full-rank square

$r=m=n$, so $A$ is invertible and both sides give the identity:

$$
A^{-1}A=AA^{-1}=I.
$$

### Case two: full column rank, left inverse

The columns are independent, $r=n$, and the null space of $A$ is trivial. Then $A^{\mathsf T}A$ is $n\times n$, symmetric, and invertible.

Define

$$
A_{\text{left}}=(A^{\mathsf T}A)^{-1}A^{\mathsf T}.
$$

It is $n\times m$, and

$$
A_{\text{left}}A=(A^{\mathsf T}A)^{-1}A^{\mathsf T}A=I_n.
$$

This is the combination that appears throughout least squares. With independent columns, the normal equations have an invertible coefficient matrix and a unique least-squares solution.

Watch the dimensions: $A_{\text{left}}A$ is $n\times n$. The other order, $AA_{\text{left}}$, is $m\times m$ and cannot be the identity because $n<m$.

### Case three: full row rank, right inverse

The rows are independent, $r=m$, and the null space of $A^{\mathsf T}$ is trivial. Then $AA^{\mathsf T}$ is invertible.

Define

$$
A_{\text{right}}=A^{\mathsf T}(AA^{\mathsf T})^{-1}.
$$

It is $n\times m$, and

$$
AA_{\text{right}}=I_m.
$$

Since $r=m<n$, the null space has dimension $n-m>0$, so whenever $Ax=b$ is solvable it has infinitely many solutions.

## The other product is a projection

Put the left inverse on the right and you do not get the identity, but something familiar:

$$
AA_{\text{left}}=A(A^{\mathsf T}A)^{-1}A^{\mathsf T}=P_{\text{col}},
$$

the **projection onto the column space**. It does the best a matrix can do: identity on the column space, zero on the left null space.

Similarly,

$$
A_{\text{right}}A=A^{\mathsf T}(AA^{\mathsf T})^{-1}A=P_{\text{row}},
$$

the **projection onto the row space**.

This explains why a left inverse only works from the left: the other side does not have the right dimension, and a projection is the best available result.

## The general case: the pseudoinverse

When $r<\min(m,n)$, both null spaces are nonzero and no true inverse exists. But $A$ is a perfect bijection **between the row space and the column space**.

### Why it is a bijection

Let $x,y$ lie in the row space and suppose $Ax=Ay$. Then

$$
A(x-y)=0,
$$

so $x-y$ lies in the null space. But $x-y$ is also a difference of two row-space vectors, hence lies in the row space. The null space and the row space are orthogonal complements, so their intersection is only the zero vector. Therefore

$$
x-y=0.
$$

So **distinct row-space vectors map to distinct column-space vectors**. Both spaces have dimension $r$, so the map is invertible. Its inverse is the **pseudoinverse** $A^+$.

### Constructing it from SVD

Let

$$
A=U\Sigma V^{\mathsf T}.
$$

$\Sigma$ is $m\times n$ with $\sigma_1,\dots,\sigma_r>0$ on the diagonal and zeros elsewhere.

Reciprocate each nonzero diagonal entry and transpose to shape $n\times m$:

$$
\Sigma^+=\operatorname{diag}\left(\frac{1}{\sigma_1},\dots,\frac{1}{\sigma_r},0,\dots,0\right).
$$

Then

$$
A^+=V\Sigma^+U^{\mathsf T}.
$$

### Both products are projections

$$
AA^+=U\Sigma\Sigma^+U^{\mathsf T}=P_{\text{col}},
$$

$$
A^+A=V\Sigma^+\Sigma V^{\mathsf T}=P_{\text{row}}.
$$

$\Sigma\Sigma^+$ is $m\times m$ with $r$ ones and zeros; $\Sigma^+\Sigma$ is $n\times n$ with the same structure. They project onto the column and row spaces respectively.

### Why this is the best inverse

The pseudoinverse is the **smallest** possible choice. Along the null spaces there is no information, so no value can be tested; setting it to zero is natural. Adding anything there would not change $AA^+$ or $A^+A$, only make the pseudoinverse larger.

> Background: the pseudoinverse satisfies the four Penrose conditions: $AA^+A=A$, $A^+AA^+=A^+$, $(AA^+)^{\mathsf T}=AA^+$, and $(A^+A)^{\mathsf T}=A^+A$. The first two make it an inverse where possible; the last two say both products are orthogonal projections.

## Why statistics needs it

Least squares centers on the normal equations

$$
A^{\mathsf T}A\hat x=A^{\mathsf T}b.
$$

When $A$ has full column rank, $A^{\mathsf T}A$ is invertible and everything is fine. But repeated measurements or linearly dependent features make $A^{\mathsf T}A$ singular, and the normal equations have infinitely many solutions.

The pseudoinverse gives

$$
\hat x=A^+b,
$$

the solution of smallest norm. That is exactly what statistical software does by default under collinearity.

## Common mistakes

1. **Expecting a rectangular matrix to have a two-sided inverse.** The dimensions forbid it: $AA_{\text{left}}$ is $m\times m$, not $I_n$.
2. **Swapping the left and right inverse formulas.** Left uses $A^{\mathsf T}A$; right uses $AA^{\mathsf T}$.
3. **Thinking the pseudoinverse is just "transpose then invert".** That happens only when all singular values equal one.
4. **Ignoring null-space freedom.** The pseudoinverse cannot recover anything along the null space; no inverse could.

## Takeaways

- The four cases are determined by the relation among $m$, $n$, and $r$.
- Full column rank: left inverse $(A^{\mathsf T}A)^{-1}A^{\mathsf T}$; the other product is the column-space projection.
- Full row rank: right inverse $A^{\mathsf T}(AA^{\mathsf T})^{-1}$; the other product is the row-space projection.
- General case: $A^+=V\Sigma^+U^{\mathsf T}$ is a genuine inverse between row and column spaces.
- $AA^+$ and $A^+A$ are orthogonal projections onto the column and row spaces.
- The pseudoinverse gives the minimum-norm least-squares solution when $A^{\mathsf T}A$ is singular.

## Check your understanding

**1. Why can a rectangular matrix never have a two-sided inverse?**

Reference answer: Let $A$ be $m\times n$. If a left inverse $B$ ($n\times m$) satisfies $BA=I_n$, then $\operatorname{rank}A\ge\operatorname{rank}(BA)=n$, and since $\operatorname{rank}A\le n$ we get $\operatorname{rank}A=n$. If at the same time a right inverse $C$ satisfies $AC=I_m$, then $\operatorname{rank}A\ge m$, so $\operatorname{rank}A=m$. Both can hold only if $m=n$. A direct algebraic proof: from $BA=I_n$ and $AC=I_m$,
$$
B=B(AC)=(BA)C=C,
$$
so $B=C$ is simultaneously a left and a right inverse, making $A$ square and invertible. Hence for $m\ne n$ at most one side can exist.

**2. Why does the left inverse use $A^{\mathsf T}A$ while the right inverse uses $AA^{\mathsf T}$?**

Reference answer: A left inverse must produce $I_n$ on the left, which requires an invertible $n\times n$ matrix — and $A^{\mathsf T}A$ is exactly $n\times n$. It is invertible when the columns are independent ($r=n$), because $A^{\mathsf T}Ax=0\Rightarrow x^{\mathsf T}A^{\mathsf T}Ax=\lVert Ax\rVert^2=0\Rightarrow Ax=0\Rightarrow x=0$. Hence $(A^{\mathsf T}A)^{-1}A^{\mathsf T}$ times $A$ on the left gives $I_n$. A right inverse must produce $I_m$, requiring an $m\times m$ matrix; $AA^{\mathsf T}$ is exactly that and is invertible when the rows are independent ($r=m$), so $A^{\mathsf T}(AA^{\mathsf T})^{-1}$ gives $I_m$ on the right. The dimensions dictate which product to use.

**3. Prove that $A$ is injective on the row space, and identify which two subspace facts the proof uses.**

Reference answer: Take $x,y$ in the row space with $Ax=Ay$. Then $A(x-y)=0$, so $x-y\in N(A)$. On the other hand the row space is closed under subtraction, so $x-y\in C(A^{\mathsf T})$. The first fact used is **$N(A)\perp C(A^{\mathsf T})$**: the null space is orthogonal to the row space. The second is that **the row space is a subspace**, hence closed under linear combinations. Two orthogonal subspaces meet only at zero, so $x-y=0$, i.e. $x=y$. Since the row and column spaces both have dimension $r$, injectivity plus equal dimensions gives a bijection, and its inverse is the pseudoinverse.

**4. Why is $AA^+$ a projection rather than the identity? What is its null space?**

Reference answer: $AA^+=U\Sigma\Sigma^+U^{\mathsf T}$, where $\Sigma\Sigma^+$ is the $m\times m$ diagonal matrix with the first $r$ diagonal entries $1$ and the remaining $m-r$ entries $0$. It acts as the identity on the column space (spanned by $u_1,\dots,u_r$) and as zero on the left null space (spanned by $u_{r+1},\dots,u_m$). It equals the identity only when $r=m$; in general $m-r>0$ and the left-null-space directions are killed, so it can only be a projection. Its null space is precisely the left null space $N(A^{\mathsf T})$, of dimension $m-r$.

**5. When $A^{\mathsf T}A$ is singular, why does least squares need the pseudoinverse, and what is special about the solution it selects?**

Reference answer: $A^{\mathsf T}A$ singular means the columns of $A$ are dependent ($r<n$), so the normal equations $A^{\mathsf T}A\hat x=A^{\mathsf T}b$ have infinitely many solutions — they differ by arbitrary null-space vectors, and "least residual" alone cannot distinguish them. The pseudoinverse gives
$$
\hat x=A^+b=V\Sigma^+U^{\mathsf T}b,
$$
which projects away the component of $b$ in the left null space and maps the column-space component back through $1/\sigma_i$; it assigns zero on the null space. Among all least-squares solutions, $\hat x$ is therefore the one of **minimum norm** (the minimum-norm least-squares solution), which is the default that statistical software uses under collinearity.

## How this connects to the course

The preceding lectures covered eigenvalues, positive definiteness, similarity, and SVD. This one applies SVD to inverting non-square matrices and ties the four subspaces, rank, and least squares into one classification. The next lecture is the final review, revisiting these threads through old exam problems.
