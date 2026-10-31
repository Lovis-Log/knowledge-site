---
slug: "02-elimination"
title: "Elimination: From Equations to an Upper Triangular Matrix"
summary: "Elimination is what every software package actually runs: use pivots to clear the entries below, then back-substitute. Written in matrix form, it produces E and U and a test for invertibility."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "elimination"
  - "pivot"
  - "matrix-factorization"
sources:
  - kind: "video"
    title: "Lecture 2: Elimination with Matrices"
    url: "https://www.youtube.com/watch?v=QVKj3LADCnA"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## What this lecture does

The previous lecture gave three ways to see a system but no general method to solve one. This lecture supplies **elimination**, the algorithm every numerical package uses instead of determinants. The goal is to turn $A$ into an upper triangular matrix $U$, then solve from the bottom up.

The process has two halves:

1. Forward elimination: use each pivot to clear the entries below it, producing $U$.
2. Back substitution: start at the last equation and work upward.

It also answers a second question: **when does elimination fail?**

## A $3\times 3$ example

$$
\begin{bmatrix}
1 & 2 & 1\\
3 & 8 & 1\\
0 & 4 & 1
\end{bmatrix}
\begin{bmatrix}x\\ y\\ z\end{bmatrix}
=
\begin{bmatrix}2\\ 12\\ 2\end{bmatrix}.
$$

As equations:

$$
\begin{aligned}
x+2y+z &= 2,\\
3x+8y+z &= 12,\\
4y+z &= 2.
\end{aligned}
$$

### Step one: clear x from row two

The first pivot is the $1$ in the top-left corner. To eliminate the $3$ below it, the multiplier is $3$: subtract three times row one from row two.

$$
\begin{aligned}
\text{row two} &: 3x+8y+z=12\\
3\times\text{row one} &: 3x+6y+3z=6\\
\text{subtract} &: 0x+2y-2z=6.
\end{aligned}
$$

In matrix terms row two becomes $[0,\ 2,\ -2]$, and the right-hand side becomes $12-3\cdot 2=6$.

The first entry of row three is already $0$, so its multiplier is $0$ and the step is skipped.

### Step two: clear y from row three

The first nonzero entry of row two is $2$: the second pivot. Row three has $4$ in the $y$ position, so the multiplier is $2$: subtract twice row two from row three.

$$
\begin{aligned}
\text{row three} &: 0x+4y+z=2\\
2\times\text{row two} &: 0x+4y-4z=12\\
\text{subtract} &: 0x+0y+5z=-10.
\end{aligned}
$$

So

$$
U=
\begin{bmatrix}
1 & 2 & 1\\
0 & 2 & -2\\
0 & 0 & 5
\end{bmatrix},
\qquad
\mathbf{c}=
\begin{bmatrix}2\\ 6\\ -10\end{bmatrix}.
$$

The pivots are $1,\ 2,\ 5$: all on the diagonal, none zero.

> **One-sentence summary:** Elimination repeatedly uses the current pivot to clear the entries beneath it, until the matrix is upper triangular.

### Back substitution

Write $U\mathbf{x}=\mathbf{c}$ back as equations:

$$
\begin{aligned}
x+2y+z &= 2,\\
2y-2z &= 6,\\
5z &= -10.
\end{aligned}
$$

From the last row:

$$
z=-2.
$$

Substitute into the second:

$$
2y-2(-2)=6 \;\Longrightarrow\; 2y+4=6 \;\Longrightarrow\; y=1.
$$

Then the first:

$$
x+2(1)+(-2)=2 \;\Longrightarrow\; x=2.
$$

The solution is $(2,1,-2)$. Check against the original second equation:

$$
3(2)+8(1)+(-2)=6+8-2=12.
$$

## When elimination fails

Failure has a precise meaning: **you cannot produce enough nonzero pivots**.

### Case one: zero in the pivot position, but a nonzero below it

If the first entry is $0$, it cannot serve as a pivot. That does not mean the system is unsolvable: exchange rows and bring a nonzero entry into the pivot position.

In the lecture's variant, changing the $8$ in row two to $6$ makes row two $[0,\ 0,\ -2]$ after the first step, so the second pivot is $0$. But row three has $4$ in the $y$ position, so swapping rows two and three rescues the process. This is a **temporary failure**, fixed by a row exchange.

### Case two: zero pivot with only zeros below

If the pivot position is $0$ and nothing below it is nonzero, the pivot simply does not exist. The matrix is **singular**, not invertible, and the system has either no solution or infinitely many.

The lecture's variant changes the bottom-right $1$ to $-4$. The first two steps are unchanged, but the last row becomes $[0,\ 0,\ 0]$, so the third pivot vanishes:

$$
1 \xrightarrow{\text{original}} 5,\qquad
-4 \xrightarrow{\text{after elimination}} 0.
$$

Two pivots instead of three: the matrix is singular.

### A by-product: the determinant is the product of pivots

When no row exchanges are needed,

$$
\det A = 1\cdot 2\cdot 5 = 10.
$$

The determinant lecture proves this properly; here it arrives as a by-product of elimination.

## Rewriting elimination in matrix language

So far elimination is "operations on rows". The key move in linear algebra is to write the operations themselves as matrices.

### Left versus right multiplication

- **Matrix times vector**: a linear combination of the columns.
- **Row vector times matrix**: a linear combination of the rows.

These two sentences explain elimination matrices. The lecture's rule:

> Left multiplication does row operations; right multiplication does column operations.

Elimination touches rows only, so every elimination matrix sits on the **left**.

### The first step: $E_{21}$

"Subtract three times row one from row two, leaving rows one and three alone" is

$$
E_{21}=
\begin{bmatrix}
1 & 0 & 0\\
-3 & 1 & 0\\
0 & 0 & 1
\end{bmatrix}.
$$

Check row two: it is $-3$ times row one plus $1$ times row two:

$$
-3\begin{bmatrix}1&2&1\end{bmatrix}
+1\begin{bmatrix}3&8&1\end{bmatrix}
=\begin{bmatrix}0&2&-2\end{bmatrix}.
$$

That is exactly the eliminated row. Row one is picked out by $[1,0,0]$ and row three by $[0,0,1]$, so both are unchanged.

### The second step: $E_{32}$

"Subtract twice row two from row three" gives

$$
E_{32}=
\begin{bmatrix}
1 & 0 & 0\\
0 & 1 & 0\\
0 & -2 & 1
\end{bmatrix}.
$$

### Putting them together

$$
E_{32}E_{21}A=U.
$$

The **associative law** lets you move the parentheses:

$$
(E_{32}E_{21})A=E_{32}(E_{21}A).
$$

The **commutative law fails**: $E_{21}E_{32}\neq E_{32}E_{21}$. The matrices must stay in their Gaussian order.

This matters in practice: the order of elimination steps is part of the transformation and cannot be rearranged freely.

## Permutation matrices

Row exchanges also need a matrix. Swap two rows of the identity and you get a **permutation matrix** $P$. For $2\times 2$:

$$
P=\begin{bmatrix}0&1\\1&0\end{bmatrix},
\qquad
P\begin{bmatrix}a&b\\c&d\end{bmatrix}
=\begin{bmatrix}c&d\\a&b\end{bmatrix}.
$$

Because left multiplication acts on rows, $P$ goes on the left to swap rows.

To swap **columns**, $P$ must go on the right:

$$
\begin{bmatrix}a&b\\c&d\end{bmatrix}
\begin{bmatrix}0&1\\1&0\end{bmatrix}
=\begin{bmatrix}b&a\\d&c\end{bmatrix}.
$$

That contrast is the whole "left rows, right columns" rule in one example.

## Inverses: undoing one elimination step

$E_{21}$ subtracts three times row one from row two. To undo it, add three times row one back:

$$
E_{21}^{-1}=
\begin{bmatrix}
1 & 0 & 0\\
3 & 1 & 0\\
0 & 0 & 1
\end{bmatrix}.
$$

Check:

$$
E_{21}^{-1}E_{21}=I.
$$

The intuition is direct: **an inverse is the matrix that performs the step backwards**. The general method for finding inverses is the next lecture.

## Takeaways

- Elimination turns $A$ into upper triangular $U$ and simultaneously turns $\mathbf{b}$ into $\mathbf{c}$.
- A pivot cannot be zero; try a row exchange, and if none is possible the matrix is singular.
- Back substitution starts at the last row and works upward.
- Each elimination step is a left multiplication by an elementary matrix, so $E_{32}E_{21}A=U$.
- Matrix multiplication is associative but not commutative.
- Left multiplication acts on rows, right multiplication on columns; permutations swap rows or columns.
- The inverse of an elementary matrix reverses its operation.

## Check your understanding

1. For the example, write the multiplier of the second elimination step and explain why it is that value.
2. Why is changing the $8$ to $6$ only a "temporary failure", while changing the bottom-right $1$ to $-4$ is a real failure?
3. Write the $2\times 2$ permutation matrix that swaps rows, and verify what left and right multiplication each do.
4. Why is the inverse of $E_{21}$ "add three times row one" rather than "subtract three times row one"?
5. Compute the determinant of the example from the pivots and compare with direct expansion.

## How it connects

This lecture supplies both the algorithm and the matrix language. The next lecture develops matrix multiplication and inverses in general: how to recognize an invertible matrix and how to compute $A^{-1}$ systematically. Later, elimination is rewritten as the factorization $A=LU$.
