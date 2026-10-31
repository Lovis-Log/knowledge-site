---
slug: "19-determinant-formulas"
title: "Determinant Formulas: The Big Formula and Cofactors"
summary: "Write the determinant as a sum over n! permutations, then reduce it to smaller determinants with cofactors; finish with a tridiagonal example whose sequence has period six."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "determinant"
  - "cofactor"
  - "permutation"
sources:
  - kind: "video"
    title: "19. Determinant Formulas and Cofactors"
    url: "https://www.youtube.com/watch?v=23LLB9mNJvc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## What this lecture delivers

The previous lecture derived every behavior of the determinant from three properties but gave no explicit formula. This lecture supplies two: the **big formula** (a sum over permutations, with $n!$ terms) and the **cofactor formula** (expansion that reduces an $n \times n$ determinant to $n-1$).

Neither is practical for large matrices, but both reveal the structure. Actual computation still uses the previous lecture's recipe: eliminate, then multiply the pivots.

## The big formula: from row splitting to permutations

### Splitting the $2 \times 2$ case

Split the first row into $(a,0)+(0,b)$ and then split the second row the same way. Four matrices appear:

$$
\begin{vmatrix} a & b \\ c & d \end{vmatrix}
=
\begin{vmatrix} a & 0 \\ c & d \end{vmatrix}
+
\begin{vmatrix} 0 & b \\ c & d \end{vmatrix}
$$

Two of the four resulting determinants contain a zero column and vanish. The survivors are

$$
\begin{vmatrix} a & 0 \\ 0 & d \end{vmatrix} = ad,
\qquad
\begin{vmatrix} 0 & b \\ c & 0 \end{vmatrix} = -bc
$$

The second carries a minus because one row exchange turns it into diagonal form.

### The $3 \times 3$ case and the survivors

Splitting each of three rows into three pieces produces $3^3=27$ matrices. Most die on a zero column. The survivors are exactly those that take **one entry from each row and each column**.

How many such choices? Three for the first row, two for the second, one for the third: $3! = 6$. Each corresponds to a permutation of the column indices.

For the permutation $(1,3,2)$:

$$
a_{11}a_{23}a_{32}
\begin{vmatrix}1&0&0\\0&0&1\\0&1&0\end{vmatrix}
$$

The remaining determinant is that of a permutation matrix and equals $-1$, since one exchange of rows 2 and 3 restores the identity.

In general, for a permutation $\sigma$ of $\{1,\dots,n\}$, let $\operatorname{sgn}(\sigma)$ be $+1$ for an even number of exchanges and $-1$ for an odd number. Then

$$
\det A = \sum_{\sigma} \operatorname{sgn}(\sigma)\, a_{1,\sigma(1)} a_{2,\sigma(2)} \cdots a_{n,\sigma(n)}
$$

This is the **big formula**. It has $n!$ terms: $2!=2$, $3!=6$, $4!=24$, $5!=120$.

### Where the three-by-three mnemonic breaks

In the $3 \times 3$ case the three products along the main diagonal carry plus signs and the three along the anti-diagonal carry minus signs, which invites the mnemonic "multiply along the diagonals". That rule **holds only for $3 \times 3$**.

For $4 \times 4$, the anti-diagonal product actually carries a **plus** sign: swapping rows 1 and 4 and then rows 2 and 3 restores the identity, two exchanges, so the sign is $(-1)^2=+1$.

The mnemonic fails because the sign comes from permutation parity, not from which way a line is drawn.

### A $4 \times 4$ example: only two nonzero terms

Take a matrix with many zeros (the lecture writes one on the spot). Scanning one entry per row and column leaves only two complete paths:

- permutation $(4,3,2,1)$: product $1$, two exchanges, sign $+1$;
- permutation $(3,2,1,4)$: product $1$, one exchange, sign $-1$.

The other 22 terms vanish. The total is $1-1=0$, so the matrix is singular.

A row relation confirms it: row 1 plus row 3 is the all-ones row, and row 2 plus row 4 is also the all-ones row, hence

$$
\text{row}_1 - \text{row}_2 + \text{row}_3 - \text{row}_4 = 0
$$

The null space also contains $(1,-1,1,-1)$. The formula gives the number; the row relation gives the reason.

## Cofactors: reducing $n$ to $n-1$

### Grouping the big formula

Group the big formula by the entries of the first row. The group containing $a_{11}$ has as its remaining factor the determinant of the matrix left after deleting row 1 and column 1:

$$
a_{11}\left(a_{22}a_{33} - a_{23}a_{32}\right)
$$

The group containing $a_{12}$ leaves the determinant after deleting row 1 and column 2, but with an extra minus sign. Absorbing that sign into the coefficient produces the cofactor.

### Definition

For $a_{ij}$, delete row $i$ and column $j$ to get the $(n-1)\times(n-1)$ minor $M_{ij}$. The cofactor is

$$
C_{ij} = (-1)^{i+j} \det M_{ij}
$$

The signs form a checkerboard:

$$
\begin{matrix}
+ & - & + & - \\
- & + & - & + \\
+ & - & + & - \\
- & + & - & +
\end{matrix}
$$

### The cofactor expansion

Along any row:

$$
\det A = \sum_{j=1}^{n} a_{ij} C_{ij}
$$

Along any column:

$$
\det A = \sum_{i=1}^{n} a_{ij} C_{ij}
$$

The column version holds because $\det(A^T)=\det A$.

Check on $2 \times 2$:

$$
\det\begin{bmatrix}a&b\\c&d\end{bmatrix} = a\cdot d + b\cdot(-c) = ad-bc
$$

### How the three formulas divide the work

| Formula | Form | Character |
| --- | --- | --- |
| Pivots | $\prod d_i$ with a sign | Most practical; the work is hidden in elimination |
| Big formula | Sum of $n!$ terms | Clearest structure, largest computation |
| Cofactors | Expand along a row or column | In between; best when many zeros |

## The tridiagonal example

Let $A_n$ be the $n \times n$ tridiagonal matrix with ones on the main diagonal and on the two adjacent diagonals, and zeros elsewhere:

$$
A_4 =
\begin{bmatrix}
1&1&0&0\\
1&1&1&0\\
0&1&1&1\\
0&0&1&1
\end{bmatrix}
$$

Expand along the first row. The first 1 has cofactor $\det A_{n-1}$. The second 1 has a cofactor whose matrix, after deleting row 1 and column 2, has a zero in the upper-left corner; expanding further leaves a block identical to $A_{n-2}$, with a minus sign. Therefore

$$
\det A_n = \det A_{n-1} - \det A_{n-2}
$$

With initial values

$$
\det A_1 = 1, \qquad \det A_2 = \begin{vmatrix}1&1\\1&1\end{vmatrix} = 0
$$

the sequence is

$$
1,\ 0,\ -1,\ -1,\ 0,\ 1,\ 1,\ 0,\ -1,\dots
$$

**The period is six.** Hence

$$
\det A_{61} = \det A_1 = 1
$$

The example shows two things: cofactor expansion turns a high-order problem into a recurrence, and the resulting sequence can be periodic rather than growing.

> **Background:** The period of six follows from the characteristic equation of $x_n = x_{n-1}-x_{n-2}$, whose roots are $e^{\pm i\pi/3}$. The lecture does not develop this.

## Core review

- The big formula sums over permutations, $n!$ terms, signed by permutation parity.
- The three-by-three diagonal mnemonic does not generalize.
- Cofactors reduce $n$ to $n-1$, with signs given by $(-1)^{i+j}$.
- Expansion works along any row or any column.
- The all-ones tridiagonal matrix satisfies a two-term recurrence and has period six.

## Common misconceptions

1. **Applying the three-by-three diagonal rule to four-by-four.** The anti-diagonal sign is positive in the $4\times4$ case.
2. **Forgetting the cofactor sign.** $C_{ij}$ already includes $(-1)^{i+j}$; do not add another sign.
3. **Expecting cofactor expansion to be cheap.** For a general matrix it is still factorial; it helps only when many entries are zero.
4. **Confusing the minor with the cofactor.** The minor is a determinant; the cofactor carries the sign.

## Check your understanding

1. How many terms does a $4\times4$ determinant have, and how many are positive?
2. Why does the three-by-three diagonal rule fail at four-by-four? Use the anti-diagonal as the example.
3. Write the expansion of a $3\times3$ determinant along its second row, with signs marked.
4. In the tridiagonal recurrence, where does the minus sign on the second term come from?
5. If $\det A_4=-1$ and $\det A_5=0$, find $\det A_6$.

## How this connects

The previous lecture defined the determinant through properties; this one gives two explicit expressions. The next lecture uses cofactors to invert a matrix (the adjugate), states Cramer's rule, and interprets the determinant as volume, before the course moves to eigenvalues and diagonalization.
