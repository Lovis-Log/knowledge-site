---
slug: "18-determinant-properties"
title: "Properties of Determinants: Deriving Everything from Three Rules"
summary: "Start from det I = 1, sign reversal under row exchange, and linearity in each row, then derive zero rows, triangular matrices, elimination, products, and transposes."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "determinant"
  - "elimination"
sources:
  - kind: "video"
    title: "18. Properties of Determinants"
    url: "https://www.youtube.com/watch?v=srxexLishgY"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Where this lecture sits

The first half of 18.06 dealt with rectangular matrices: elimination, rank, the four subspaces. This lecture turns to square matrices, starting with determinants and heading toward eigenvalues. A determinant assigns one number to every square matrix, and its most important job is the invertibility test:

$$
A \text{ is invertible} \iff \det A \neq 0
$$

Strang deliberately refuses to start with the formula. The general $n \times n$ formula has $n!$ terms, which hides the structure. Instead he states three properties and claims: **these three properties define the determinant**, and everything else follows.

## The three defining properties

| Number | Property | Meaning |
| --- | --- | --- |
| 1 | $\det I = 1$ | The identity has determinant 1 |
| 2 | Exchanging two rows reverses the sign | $\det(\text{after exchange}) = -\det A$ |
| 3A | Scaling one row by $t$ scales the determinant by $t$ | Each row scales separately |
| 3B | Splitting one row into a sum splits the determinant into a sum | Each row adds separately |

Together, 3A and 3B say the determinant is **linear in each row separately, holding the other rows fixed**. This is easy to misread. The determinant is not linear in the whole matrix:

$$
\det(A+B) \neq \det A + \det B
$$

It is linear only when a single row changes. Once that sentence is clear, the derivations stop going wrong.

### Immediate consequences

- **Permutation matrices.** They come from the identity by row exchanges, so their determinant is $+1$ or $-1$ according to the parity of the number of exchanges.
- **The $2 \times 2$ case.** For $A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$, split the first row into $(a,0)+(0,b)$ and then split the second row. Four matrices appear; two contain a zero column and vanish, while the other two give $ad$ and $-bc$. Hence $\det A = ad-bc$.

That derivation is the template for the whole lecture: **split rows, let most terms die on zero columns, and let permutation parity fix the signs of the survivors**.

## Properties that follow

### Property 4: Two equal rows give zero

If row 1 equals row 3, exchanging them leaves the matrix unchanged, so the determinant is unchanged. But property 2 demands a sign flip. A number equal to its own negative must be zero.

The proof uses only property 2, so it holds at every size.

### Property 5: Subtracting a multiple of one row from another changes nothing

Replace row $k$ by row $k$ minus $\ell$ times row $i$. By 3B this splits into two determinants: the original, plus one whose row $k$ is $-\ell$ times row $i$. Property 3A pulls out $-\ell$, leaving a matrix with proportional rows, which is zero by property 4. Therefore

$$
\det(\text{matrix after elimination}) = \det A
$$

This is why elimination can be used to compute determinants.

### Property 6: A zero row gives zero

By 3A with $t=0$: a zero row is $0$ times any row, so the determinant is $0$ times the original.

### Property 7: A triangular matrix has determinant equal to its diagonal product

Let $U$ be upper triangular with diagonal $d_1,\dots,d_n$. Property 5 clears every entry above the diagonal using the rows below, leaving a diagonal matrix with the same determinant. Then 3A pulls out $d_1,\dots,d_n$ one row at a time, leaving the identity, whose determinant is 1. Hence

$$
\det U = d_1 d_2 \cdots d_n
$$

This also gives the practical algorithm: **eliminate to triangular form, then multiply the pivots**.

### Property 8: The determinant is the pivot product, with a sign from row exchanges

If elimination needed an odd number of row exchanges, multiply by $-1$:

$$
\det A = (-1)^{\#\text{exchanges}} \, d_1 d_2 \cdots d_n
$$

Check on $2 \times 2$: the pivots are $a$ and $d-\frac{c}{a}b$, whose product is $ad-bc$. If $a=0$, an exchange is required; if no pivot can be found, the matrix is singular.

### The complete invertibility proof

- If $A$ is invertible, elimination produces $n$ nonzero pivots, so $\det A = \prod d_i \neq 0$.
- If $A$ is singular, elimination produces a zero row, so $\det A = 0$ by property 6.

Together: invertible $\iff$ determinant nonzero.

## Two multiplicative properties

### Property 9: $\det(AB) = \det A \cdot \det B$

This is the most surprising property in the lecture. The determinant behaves terribly under addition but multiplicatively under products. Immediate consequences:

$$
\det(A^{-1}) = \frac{1}{\det A}, \qquad
\det(A^2) = (\det A)^2, \qquad
\det(2A) = 2^n \det A
$$

The last one is commonly misremembered. Doubling the whole matrix doubles each of the $n$ rows, and 3A extracts one factor of 2 per row, so the factor is $2^n$. Geometrically, doubling every edge of an $n$-dimensional box multiplies its volume by $2^n$.

### Property 10: $\det(A^T) = \det A$

Direct check for $2 \times 2$: $ad-bc$ is unchanged by transposition.

The proof uses $LU$ (ignoring row exchanges): $A = LU$ and $A^T = U^T L^T$. By property 9,

$$
\det A = \det L \det U, \qquad \det A^T = \det U^T \det L^T
$$

$L$ is lower triangular with ones on the diagonal, so $\det L = 1$, and likewise for $L^T$. $U$ and $U^T$ are triangular with the same diagonal, so property 7 makes their determinants equal. The two sides match.

The practical value: **every statement about rows is also true about columns**. Column exchanges flip the sign, a zero column kills the determinant, and linearity holds column by column, because transposing turns columns into rows and back.

## Why the sign is well defined

Property 2 says one exchange flips the sign. For the definition to be consistent, the same permutation must have the same parity no matter how it is built. Otherwise seven exchanges and ten exchanges would give opposite signs, and the determinant would not be well defined.

Strang closes by noting that every permutation is either odd or even. That fact is what makes the determinant uniquely determined by properties 1–3.

## Core review

- Three properties define the determinant: $\det I=1$, exchange flips the sign, linear in each row.
- Equal rows, a zero row, or proportional rows all give zero.
- Elimination leaves the determinant unchanged; a triangular determinant is the diagonal product.
- The algorithm: eliminate, multiply pivots, apply the sign from row exchanges.
- The determinant is multiplicative, not additive.
- Transposition leaves it unchanged, so row facts become column facts.

## Common misconceptions

1. **Treating row-wise linearity as global linearity.** $\det(A+B)$ is generally not $\det A+\det B$.
2. **Forgetting the exchange sign.** An odd number of row exchanges in elimination requires a minus sign.
3. **Writing $\det(2A)=2\det A$.** The correct value is $2^n\det A$.
4. **Thinking $\det A=0$ means a row is zero.** A zero row is only one way to be singular; linearly dependent rows also make the determinant zero.

## Check your understanding

1. Use the three properties to prove that proportional rows give determinant zero.
2. Why does elimination leave the determinant unchanged? Give the full argument using 3A, 3B, and property 4.
3. If every entry of a $5\times5$ matrix is multiplied by 3, what happens to the determinant?
4. If $\det A = 2$, find $\det(A^{-1})$ and $\det(A^2)$.
5. Why does property 10 imply that exchanging two columns also flips the sign?

## How this connects

The previous stage used elimination to study rank and subspaces of rectangular matrices. This lecture applies elimination to square matrices and produces the determinant and the invertibility test. The next lecture gives explicit formulas (the big formula and cofactors), then Cramer's rule and volume, before the course moves to eigenvalues.
