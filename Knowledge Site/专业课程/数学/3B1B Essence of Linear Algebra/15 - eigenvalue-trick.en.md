---
slug: "15-eigenvalue-trick"
title: "A Quick Trick for 2×2 Eigenvalues: Mean and Product"
summary: "The trace equals the sum of the eigenvalues and the determinant equals their product. So two numbers with mean m and product p are m ± √(m² − p). For a 2×2 matrix both m and p can be read straight off, with no characteristic polynomial in between."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [eigenvalue, trace, determinant, quadratic]
sources:
  - kind: "video"
    title: "A quick trick for computing eigenvalues | Chapter 15, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=e50Bj7jn9IQ"
    author: "3Blue1Brown"
    publishedAt: "2021-05-08"
---

## The thread of the lecture

A short, technique-focused chapter, restricted to $2\times2$ matrices. The goal: **read the eigenvalues straight off the matrix, without writing a characteristic polynomial**.

Three facts carry it, each worth knowing on its own:

1. The **trace** (sum of diagonal entries) equals the sum of the two eigenvalues;
2. The **determinant** equals their product;
3. Given two numbers with mean $m$ and product $p$, they are $m \pm \sqrt{m^2-p}$.

The first two let you read "mean" and "product" off the matrix; the third turns them back into the two numbers.

## Timeline

| Time | Topic |
| --- | --- |
| 2:03 | Fact one: trace = sum of eigenvalues |
| 2:21 | Fact two: determinant = product of eigenvalues |
| 3:24 | With mean and product known, write the numbers as $m \pm d$ |
| 3:48 | $d^2 = m^2 - p$, from a difference of squares |
| 4:41 | The formula: $m \pm \sqrt{m^2-p}$ |
| 5:12 | Example: $\begin{bmatrix}3&1\\4&1\end{bmatrix}$ gives $2\pm\sqrt5$ |
| 5:49 | Example: $\begin{bmatrix}2&7\\1&8\end{bmatrix}$ gives $9$ and $1$ |
| 6:55 | Pauli matrices: mean 0, determinant $-1$, eigenvalues $\pm1$ |
| 10:04 | Any unit-direction combination still has determinant $-1$ |
| 10:34 | It is really another way to solve a quadratic |

## The three facts

**Fact one: trace = sum of eigenvalues.**

![The parabola λ²−10λ+9 meets the λ-axis at 1 and 9 with vertex (5,−16); a dashed line marks the mean m=5 and a bracket marks d=4](/images/la15-eigenvalue-trick-en.svg)

*Figure: the two roots sit symmetrically about the mean m at distance d=√(m²−p), so λ=m±d.*

$$
\operatorname{tr}(A) = a + d = \lambda_1 + \lambda_2 .
$$

Hence the more useful form: **the mean of the eigenvalues equals the mean of the diagonal entries**.

$$
m = \frac{a+d}{2}.
$$

**Fact two: determinant = product of eigenvalues.**

$$
\det(A) = ad - bc = \lambda_1\lambda_2 = p .
$$

This is intuitive: an eigenvalue says how much one direction is stretched, while the determinant says how much area is scaled overall. Multiplying the stretch factors of all directions gives the area factor.

**Fact three: recovering two numbers from their mean and product.**

Write the two numbers as $m+d$ and $m-d$ (since their mean is $m$, they sit symmetrically about it).

Their product is

$$
(m+d)(m-d) = m^2 - d^2 .
$$

Set this equal to $p$:

$$
d^2 = m^2 - p
\quad\Longrightarrow\quad
d = \sqrt{m^2 - p}.
$$

So the two numbers are

$$
m \pm \sqrt{m^2 - p}.
$$

That is fact three. It is a rewrite of the difference-of-squares identity, easy to re-derive if forgotten.

## How to use it

Given a $2\times2$ matrix, three steps:

1. Compute the mean $m$ of the diagonal entries;
2. Compute the determinant $p$;
3. Write down $m \pm \sqrt{m^2-p}$.

### Example one

$$
A = \begin{bmatrix} 3 & 1 \\ 4 & 1 \end{bmatrix}.
$$

Diagonal entries 3 and 1, so $m = 2$.

Determinant $p = 3\cdot1 - 1\cdot4 = -1$.

Therefore

$$
\lambda = 2 \pm \sqrt{4 - (-1)} = 2 \pm \sqrt5 .
$$

### Example two

$$
A = \begin{bmatrix} 2 & 7 \\ 1 & 8 \end{bmatrix}.
$$

Mean $m = (2+8)/2 = 5$.

Determinant $p = 2\cdot8 - 7\cdot1 = 9$.

So

$$
\lambda = 5 \pm \sqrt{25 - 9} = 5 \pm 4,
$$

that is, 9 and 1.

## A real setting: the Pauli matrices

The three **Pauli spin matrices** from quantum mechanics:

$$
\sigma_x = \begin{bmatrix}0&1\\1&0\end{bmatrix},
\quad
\sigma_y = \begin{bmatrix}0&-i\\i&0\end{bmatrix},
\quad
\sigma_z = \begin{bmatrix}1&0\\0&-1\end{bmatrix}.
$$

All three have diagonal entries summing to 0, so the eigenvalue mean is 0 and the formula collapses to $\pm\sqrt{-p}$.

Their determinants are all $-1$ (the $\sigma_y$ one takes a little complex arithmetic: $0\cdot0-(-i)(i)=-1$). So the eigenvalues are

$$
\pm\sqrt{0 - (-1)} = \pm 1 .
$$

More interestingly, take any linear combination

$$
a\sigma_x + b\sigma_y + c\sigma_z
$$

with $a^2+b^2+c^2=1$. Its trace is still 0 and its determinant is still $-1$, so its eigenvalues are again $\pm1$.

**That is where the trick really pays off**: computing the characteristic polynomial of such a combination is laborious, while "trace 0, determinant $-1$" is visible at a glance.

Grant admits honestly that for an individual Pauli matrix the traditional route (characteristic polynomial $\lambda^2-1$) is just as fast, maybe faster. The speedup shows up in the general combination.

## Relation to the characteristic polynomial

To be clear: this trick and "find the roots of the characteristic polynomial" are **not two different methods**. They solve the same equation.

Seen another way, the mean-product formula is simply **another way to solve a quadratic**.

For a monic quadratic

$$
x^2 + bx + c = 0,
$$

the roots sum to $-b$, so their mean is $-b/2$; their product is $c$. Hence the roots are

$$
-\frac{b}{2} \pm \sqrt{\frac{b^2}{4} - c}.
$$

That is the familiar quadratic formula, written as "mean ± deviation."

### The real advantage

The advantage is not fewer symbols but **meaning in every term**:

- $m$ is the centre of the two eigenvalues, readable from the diagonal;
- $p$ is the area scaling factor, readable from the determinant.

So you never write the characteristic polynomial or apply a formula to it; you jump from the matrix to the answer. What the intermediate polynomial looks like never needs to be known.

## What this chapter establishes

- The trace equals the sum of the eigenvalues, so their mean equals the mean of the diagonal entries.
- The determinant equals the product of the eigenvalues.
- Given mean $m$ and product $p$, the two numbers are $m \pm \sqrt{m^2-p}$.
- For a $2\times2$ matrix both $m$ and $p$ are read directly, so the characteristic polynomial can be skipped.
- Examples: $\begin{bmatrix}3&1\\4&1\end{bmatrix}$ has eigenvalues $2\pm\sqrt5$; $\begin{bmatrix}2&7\\1&8\end{bmatrix}$ has 9 and 1.
- The Pauli matrices have trace 0 and determinant $-1$, hence eigenvalues $\pm1$; so does any unit-direction combination of them.
- The trick is the "mean ± deviation" form of the quadratic formula, and its advantage is that each term carries geometric meaning.

## Check your understanding

**1. Why does the trace equal the sum of the two eigenvalues?**

Answer: expand the characteristic polynomial. For a $2\times2$ matrix, $\det(A-\lambda I)=(a-\lambda)(d-\lambda)-bc=\lambda^2-(a+d)\lambda+(ad-bc)$. The eigenvalues are its two roots, and by Vieta's formulas their sum equals minus the linear coefficient, $a+d$ — the trace. The identity holds for every $2\times2$ matrix.

**2. Why does the determinant equal the product of the two eigenvalues?**

Answer: from the same characteristic polynomial $\lambda^2-(a+d)\lambda+(ad-bc)$: the product of the roots equals the constant term, $ad-bc$, which is the determinant. Geometrically: eigenvalues give the stretch factors along the principal directions, and multiplying them all gives the area (volume) scaling factor, which is precisely the determinant.

**3. Given mean $m$ and product $p$, why are the two numbers $m \pm \sqrt{m^2-p}$?**

Answer: a mean of $m$ means the two numbers sit symmetrically about $m$, so they can be written $m+d$ and $m-d$. Their product is $(m+d)(m-d)=m^2-d^2$; setting that equal to $p$ gives $d^2=m^2-p$, hence $d=\sqrt{m^2-p}$ and the numbers are $m\pm\sqrt{m^2-p}$. This is a direct application of the difference-of-squares identity.

**4. Is there an essential difference between this trick and finding roots of the characteristic polynomial?**

Answer: no — they solve the same equation. The characteristic polynomial is $\lambda^2-(a+d)\lambda+(ad-bc)=0$, and the mean-product formula is just solving that quadratic by "mean ± deviation." The only difference is the route: one writes the polynomial and applies a formula, the other reads $m$ and $p$ directly from the matrix and skips the intermediate step.

**5. Why do unit-direction combinations of the Pauli matrices still have eigenvalues $\pm1$?**

Answer: because such a combination still has trace 0 (all three Pauli matrices are traceless, and the trace is linear) and still has determinant $-1$ (verifiable under the normalization $a^2+b^2+c^2=1$). With mean 0 and product $-1$, the eigenvalues are $\pm\sqrt{0-(-1)}=\pm1$. This matches the physical fact that a spin measurement along any direction yields only $\pm1$.
