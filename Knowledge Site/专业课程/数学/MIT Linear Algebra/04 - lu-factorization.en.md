---
slug: "04-lu-factorization"
title: "A = LU: Writing Elimination as a Factorization"
summary: "Each elimination step is an elementary matrix. Multiplying their inverses in reverse order gives A = LU: L stores the multipliers directly, U stores the pivots and the result."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "lu-factorization"
  - "elimination"
  - "permutation"
sources:
  - kind: "video"
    title: "Lecture 4: Factorization into A = LU"
    url: "https://www.youtube.com/watch?v=MsIvs_6vC38"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2017-04-25"
---

## Two small formulas first

### The inverse of a product reverses the order

If $A$ and $B$ are invertible, then

$$
(AB)^{-1}=B^{-1}A^{-1}.
$$

Check:

$$
(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=AIA^{-1}=I.
$$

The order must reverse, like shoes and socks: shoes come off first, so socks go on first when undoing the process.

### Transpose and inverse commute

Start from $A^{-1}A=I$ and transpose both sides:

$$
(A^{-1}A)^T=I^T=I.
$$

Since $(A^{-1}A)^T=A^T(A^{-1})^T$,

$$
A^T(A^{-1})^T=I,
$$

so

$$
(A^T)^{-1}=(A^{-1})^T.
$$

For a single matrix, transposing and inverting can be done in either order.

## Timeline

| Time | Topic |
| --- | --- |
| 0:12 | Lecture four: $A=LU$ |
| 2:04 | The inverse of a product and of a transpose |
| 2:58 | Products that give the identity |
| 4:23 | The inverse formula |
| 5:47 | $(A^T)^{-1}=(A^{-1})^T$ |
| 9:53 | The elimination matrix $E$ |
| 10:49 | How $L$ relates to $E$ |
| 12:01 | Why the letter $L$ |
| 14:57 | $A=LU$ when no rows are exchanged |
| 16:08 | Inverting the factors in reverse order |
| 17:23 | The $2\times2$ case |
| 23:11 | The $3\times3$ case: multipliers do not interfere |
| 25:56 | Moving the inverses to the other side |
| 29:24 | Counting the operations |
| 31:56 | The cost of elimination |
| 36:31 | The upper bound $n^3$ |
| 39:23 | The cost of handling $\mathbf{b}$ |
| 41:41 | Row exchanges: $PA=LU$ |
| 47:16 | How many $n\times n$ permutation matrices |

## The core: $A=LU$

Assume no row exchanges are needed and no pivot is zero. Each elimination step is an elementary matrix $E_{ij}$, and at the end

$$
E_{32}E_{31}E_{21}A=U.
$$

Call the product $E$, so $EA=U$. To isolate $A$, multiply on the left by $E^{-1}$:

$$
A=E^{-1}U.
$$

The inverse of a product reverses the order:

$$
E^{-1}=(E_{32}E_{31}E_{21})^{-1}
=E_{21}^{-1}E_{31}^{-1}E_{32}^{-1}.
$$

That product is $L$:

$$
A=LU.
$$

$U$ is upper triangular; $L$ is lower triangular with ones on the diagonal.

### A $2\times 2$ example

$$
A=\begin{bmatrix}2&1\\8&7\end{bmatrix}.
$$

The first pivot is $2$, and eliminating the $8$ below it needs multiplier $8/2=4$:

$$
E_{21}=\begin{bmatrix}1&0\\-4&1\end{bmatrix},
\qquad
U=\begin{bmatrix}2&1\\0&3\end{bmatrix}.
$$

Check $E_{21}A=U$: the second row is $-4$ times row one plus row two, $[8,7]-4[2,1]=[0,3]$.

$L$ is $E_{21}^{-1}$: change $-4$ to $+4$.

$$
L=\begin{bmatrix}1&0\\4&1\end{bmatrix},
\qquad
A=\begin{bmatrix}1&0\\4&1\end{bmatrix}
\begin{bmatrix}2&1\\0&3\end{bmatrix}
=
\begin{bmatrix}2&1\\8&7\end{bmatrix}.
$$

### Pulling out the pivots: $LDU$

Factor the diagonal out of $U$:

$$
U=
\begin{bmatrix}2&0\\0&3\end{bmatrix}
\begin{bmatrix}1&1/2\\0&1\end{bmatrix}
=D U'.
$$

Then $A=LDU'$: unit triangular matrices on both sides and a diagonal matrix in the middle. MATLAB may return either form; the course mostly uses $LU$.

## The $3\times 3$ case: why $L$ holds the multipliers directly

For three dimensions the elimination sequence is

$$
E_{32}E_{31}E_{21}A=U,
$$

so

$$
A=E_{21}^{-1}E_{31}^{-1}E_{32}^{-1}U=LU.
$$

The real question is why $L$ is nicer than $E$. Take a typical case:

$$
E_{21}=\begin{bmatrix}1&0&0\\-2&1&0\\0&0&1\end{bmatrix},
\qquad
E_{31}=I,
\qquad
E_{32}=\begin{bmatrix}1&0&0\\0&1&0\\0&-5&1\end{bmatrix}.
$$

First compute $E=E_{32}E_{21}$:

$$
E=
\begin{bmatrix}
1&0&0\\
-2&1&0\\
10&-5&1
\end{bmatrix}.
$$

A $10$ appears in position $(3,1)$. Where from? Subtracting twice row one from row two, then five times the **new** row two from row three, throws $5\times 2=10$ copies of row one into row three.

Nothing is wrong, but $E$ is hard to read: the multipliers $2$ and $5$ are entangled.

Now invert in reverse order:

$$
L=E_{21}^{-1}E_{32}^{-1}
=
\begin{bmatrix}1&0&0\\2&1&0\\0&0&1\end{bmatrix}
\begin{bmatrix}1&0&0\\0&1&0\\0&5&1\end{bmatrix}
=
\begin{bmatrix}
1&0&0\\
2&1&0\\
0&5&1
\end{bmatrix}.
$$

The multipliers $2$ and $5$ sit exactly where they belong, and position $(3,1)$ is $0$.

> **One-sentence summary:** With no row exchanges, $L$ is a ledger of multipliers — whatever multiplier elimination used goes straight into the corresponding slot of $L$.

This is why $LU$ is the right record of elimination: once it is done, all the information in $A$ lives in $L$ and $U$, and the original matrix can be discarded.

## Operation count: why $n^3/3$

How expensive is elimination? For an $n\times n$ matrix, the first step updates about $n^2$ entries. The second works on the remaining $(n-1)\times(n-1)$ block, about $(n-1)^2$ operations. Continuing:

$$
n^2+(n-1)^2+\cdots+2^2+1^2.
$$

There are $n$ terms, the largest is $n^2$, so the crude bound is $n^3$. More precisely,

$$
\sum_{k=1}^{n}k^2=\frac{n(n+1)(2n+1)}{6}\approx\frac{n^3}{3}.
$$

The integral makes the constant visible:

$$
\int_0^n x^2\,dx=\frac{n^3}{3}.
$$

So elimination is $O(n^3)$. The right-hand side $\mathbf{b}$ is a single column, so handling it costs $O(n^2)$.

That yields a practical rule: **when many right-hand sides share the same $A$, factor once into $LU$, then run forward and back substitution at $O(n^2)$ per right-hand side.** It is far cheaper than re-eliminating each time.

## When rows must be exchanged: permutations

If a zero appears in a pivot position, rows must be swapped. A **permutation matrix** $P$ does the swapping; it is the identity with its rows rearranged.

There are $3!=6$ permutation matrices of size $3$, and $4!=24$ of size $4$. They form a group:

- the product of two permutations is another permutation;
- every permutation is invertible, and its inverse is also a permutation;
- in fact, $P^{-1}=P^T$. Swapping two rows twice restores the original, so many $P$ are their own inverse; in general the inverse equals the transpose.

With row exchanges, the factorization becomes

$$
PA=LU.
$$

The permutation records the row order first, and $L$ and $U$ keep the same structure.

## Takeaways

- $(AB)^{-1}=B^{-1}A^{-1}$: the order reverses.
- $(A^T)^{-1}=(A^{-1})^T$.
- Without row exchanges, $E_{32}E_{31}E_{21}A=U$, hence $A=E_{21}^{-1}E_{31}^{-1}E_{32}^{-1}U=LU$.
- $L$ has ones on the diagonal and the multipliers off it; $U$ has the pivots on its diagonal.
- $A=LDU'$ separates the pivots from the unit triangular factors.
- Elimination costs about $n^3/3$; each right-hand side costs about $n^2$.
- With row exchanges, $PA=LU$. There are $n!$ permutation matrices, and $P^{-1}=P^T$.

## Check your understanding

**1. Verify $(AB)^{-1}=B^{-1}A^{-1}$ and explain why the order cannot be preserved.**

Reference answer: Multiply directly:
$$
(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=AIA^{-1}=I,
$$
so $B^{-1}A^{-1}$ really is the inverse of $AB$. The order cannot be kept, because
$$
(AB)(A^{-1}B^{-1})=A(BA^{-1})B^{-1},
$$
and $BA^{-1}$ is generally not $A^{-1}B$ unless the two matrices commute; then the product is not $I$. The picture is getting dressed: socks first, then shoes, so undressing must remove the shoes first and the socks second — reversed order.

**2. For $A=\begin{bmatrix}2&1\\8&7\end{bmatrix}$, write $E_{21}$, $U$, and $L$, and verify $A=LU$.**

Reference answer: The first pivot is $2$; clearing the $8$ uses multiplier $8/2=4$, so
$$
E_{21}=\begin{bmatrix}1&0\\-4&1\end{bmatrix},\qquad
U=\begin{bmatrix}2&1\\0&3\end{bmatrix}.
$$
Check $E_{21}A=U$: row two becomes $[8,7]-4[2,1]=[0,3]$. Then $L=E_{21}^{-1}$ changes $-4$ to $+4$:
$$
L=\begin{bmatrix}1&0\\4&1\end{bmatrix}.
$$
Indeed
$$
LU=\begin{bmatrix}1&0\\4&1\end{bmatrix}\begin{bmatrix}2&1\\0&3\end{bmatrix}
=\begin{bmatrix}2&1\\8&7\end{bmatrix}=A.
$$

**3. In the $3\times 3$ example, why is the $(3,1)$ entry of $E$ equal to $10$, while the same entry of $L$ is $0$?**

Reference answer: Here $E=E_{32}E_{21}$. After $E_{21}$, row two is the original row two minus twice row one; then $E_{32}$ subtracts five times that **new** row two from row three. So row three loses $5\times2=10$ times row one in total, and the $(3,1)$ entry becomes $-5\cdot(-2)=10$: the two multipliers have been multiplied together and mixed. In $L=E_{21}^{-1}E_{32}^{-1}$ the operations are undone in reverse order — first restore five times row two, then twice row one — so the multipliers $2$ and $5$ sit in their own positions and $(3,1)$ is untouched at $0$. That is why $L$ reads as a ledger of multipliers.

**4. Explain the $n^3/3$ count both with the sum of squares and with an integral.**

Reference answer: The first elimination step updates roughly $n^2$ entries; the next works on the remaining $(n-1)\times(n-1)$ block, about $(n-1)^2$ operations, and so on, giving
$$
\sum_{k=1}^{n}k^2=\frac{n(n+1)(2n+1)}{6}=\frac{n^3}{3}+O(n^2)\approx\frac{n^3}{3}.
$$
As an integral, the sum is a Riemann sum for $x^2$ on $[0,n]$:
$$
\int_0^n x^2\,dx=\frac{n^3}{3},
$$
differing only in lower-order terms. Hence elimination costs $O(n^3)$, while each right-hand side costs $O(n^2)$ — which is why one $LU$ factorization pays off when many right-hand sides share $A$.

**5. Why is the inverse of a permutation matrix equal to its transpose?**

Reference answer: A permutation matrix is the identity with its rows rearranged, so each column is a standard basis vector $\mathbf{e}_{\sigma(i)}$. Distinct columns are orthogonal unit vectors, and each has squared length $1$. Therefore
$$
P^{T}P=I,
$$
so $P^{T}$ is the inverse of $P$. In words: $P$ moves rows by a permutation, and $P^{T}$ moves them back; doing both is the identity.

## How it connects

$LU$ turns elimination from a process into an object. The next lecture turns to transposes, permutations, and the vector space $R^n$, preparing the ground for the four fundamental subspaces.
