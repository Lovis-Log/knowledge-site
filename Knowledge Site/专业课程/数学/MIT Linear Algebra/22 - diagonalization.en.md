---
slug: "22-diagonalization"
title: "Diagonalization and Powers of A: Splitting Evolution into Independent Directions"
summary: "A = SΛS⁻¹ turns powers of a matrix into powers of eigenvalues; this gives stability tests, solves difference equations, and explains the growth rate of Fibonacci numbers."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "diagonalization"
  - "eigenvalues"
  - "difference-equations"
sources:
  - kind: "video"
    title: "22. Diagonalization and Powers of A"
    url: "https://www.youtube.com/watch?v=13r9QY6cmjc"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## What diagonalization does

The previous lecture produced $Ax=\lambda x$. This one assembles those equations into a matrix identity. Put $n$ independent eigenvectors in the columns of $S$:

$$
S = \begin{bmatrix} x_1 & x_2 & \cdots & x_n \end{bmatrix}
$$

Multiply column by column:

$$
AS = \begin{bmatrix} \lambda_1 x_1 & \lambda_2 x_2 & \cdots & \lambda_n x_n \end{bmatrix}
= S\Lambda
$$

where $\Lambda$ is diagonal with entries $\lambda_1,\dots,\lambda_n$. Left-multiply by $S^{-1}$:

$$
A = S\Lambda S^{-1}, \qquad \Lambda = S^{-1}AS
$$

This is **diagonalization**, the third decomposition in the course alongside $A=LU$ and $A=QR$, and the centerpiece of the eigenvalue chapter.

The condition is explicit: $S$ must be invertible, which means **$n$ linearly independent eigenvectors**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:10 | Second lecture: diagonalization and powers |
| 3:16 | Writing $AS=S\Lambda$ as $A=S\Lambda S^{-1}$ |
| 6:23 | The condition: $n$ independent eigenvectors |
| 9:28 | Eigenvalues and eigenvectors of $A^2$ |
| 12:44 | $A^k=S\Lambda^kS^{-1}$ |
| 15:50 | Stability: all $\lvert\lambda\rvert<1$ |
| 19:08 | Distinct eigenvalues guarantee diagonalization |
| 22:14 | When diagonalization fails |
| 25:36 | Failure caused by repeated eigenvalues |
| 28:40 | Difference equations $u_{k+1}=Au_k$ |
| 31:41 | $u_k=S\Lambda^kS^{-1}u_0$ |
| 34:54 | The Fibonacci recurrence |
| 37:59 | Turning the recurrence into a 2D system |
| 41:02 | The eigenvalues satisfy $\lambda^2=\lambda+1$ |
| 44:16 | $\lambda_1\approx1.618$ dominates |
| 50:25 | The general recipe for first-order systems |


## Why it matters: powers

### From the definition

If $Ax=\lambda x$, multiply by $A$ again:

$$
A^2x = A(\lambda x) = \lambda Ax = \lambda^2 x
$$

So $A^2$ has the squared eigenvalues and the same eigenvectors. In general,

$$
A^k x = \lambda^k x
$$

### From the decomposition

$$
A^2 = (S\Lambda S^{-1})(S\Lambda S^{-1}) = S\Lambda^2 S^{-1}
$$

The inner $S^{-1}S$ cancels. For the $k$-th power,

$$
A^k = S\Lambda^k S^{-1}
$$

and $\Lambda^k$ is just the diagonal matrix of $k$-th powers.

This is the payoff. Computing $A^{100}$ from $LU$ would mean multiplying a hundred $LU$ factors; eigen-decomposition reduces it to taking powers of scalars.

### The stability theorem

$A^k \to 0$ exactly when every eigenvalue has absolute value below 1:

$$
|\lambda_i| < 1 \quad \text{for all } i
$$

The reason is that $S$ and $S^{-1}$ are fixed while only $\Lambda^k$ changes. Numbers below 1 shrink, numbers equal to 1 persist, numbers above 1 blow up. Eigenvalues may be negative or complex, so the absolute value is essential.

## Which matrices diagonalize

| Case | Diagonalizable? | Explanation |
| --- | --- | --- |
| Distinct eigenvalues | Always | A random matrix almost surely falls here |
| Repeated eigenvalues with enough eigenvectors | Yes | The identity: every vector is an eigenvector |
| Repeated eigenvalues with too few eigenvectors | No | Example: $\begin{bmatrix}2&1\\0&2\end{bmatrix}$ |

### Two fates for a repeated eigenvalue

**The identity** has eigenvalue 1 repeated $n$ times, but every vector is an eigenvector, so $n$ independent ones can be chosen. It is already diagonal.

**The counterexample**:

$$
A=\begin{bmatrix}2&1\\0&2\end{bmatrix}
$$

The characteristic polynomial is $(2-\lambda)^2$, so $\lambda=2$ has multiplicity two. But

$$
A-2I=\begin{bmatrix}0&1\\0&0\end{bmatrix}
$$

has a one-dimensional null space spanned by $(1,0)$. There is no second independent eigenvector, so the matrix cannot be diagonalized.

Two notions appear:

- **Algebraic multiplicity**: the multiplicity as a root of the characteristic polynomial, here 2.
- **Geometric multiplicity**: the dimension of the eigenspace, here 1.

Diagonalizability requires that for every eigenvalue, **geometric multiplicity equals algebraic multiplicity**.

## Difference equations: multiply by $A$ each step

Consider the first-order system

$$
u_{k+1} = A u_k
$$

With initial vector $u_0$, the solution is

$$
u_k = A^k u_0
$$

Compact, but not directly computable. The real method is to **expand $u_0$ in eigenvectors**:

$$
u_0 = c_1 x_1 + c_2 x_2 + \cdots + c_n x_n = Sc
$$

Each application of $A$ multiplies each component by its own eigenvalue:

$$
u_k = c_1\lambda_1^k x_1 + c_2\lambda_2^k x_2 + \cdots + c_n\lambda_n^k x_n
$$

In matrix form this is $u_k = S\Lambda^k c$, identical to $A^k u_0 = S\Lambda^k S^{-1}u_0$.

> **One-sentence summary:** Eigenvectors split a coupled system into $n$ independent one-dimensional problems.

## Fibonacci: where the growth rate comes from

### Turning a second-order recurrence into a first-order system

$$
F_{k+2} = F_{k+1} + F_k
$$

Introduce the vector

$$
u_k = \begin{bmatrix}F_{k+1}\\F_k\end{bmatrix}
$$

and add the trivial equation $F_{k+1}=F_{k+1}$:

$$
u_{k+1} =
\begin{bmatrix}1&1\\1&0\end{bmatrix} u_k
$$

Call this matrix $A$.

### Eigenvalues

The characteristic polynomial:

$$
\det(A-\lambda I)
=
\begin{vmatrix}1-\lambda&1\\1&-\lambda\end{vmatrix}
=
\lambda^2-\lambda-1
$$

By the quadratic formula,

$$
\lambda = \frac{1\pm\sqrt5}{2}
$$

so

$$
\lambda_1 = \frac{1+\sqrt5}{2}\approx 1.618,
\qquad
\lambda_2 = \frac{1-\sqrt5}{2}\approx -0.618
$$

Check: the sum is 1 (the trace) and the product is $-1$ (the determinant).

Notice that $\lambda^2-\lambda-1=0$ is exactly the original recurrence in disguise; the two approaches agree.

### What controls growth

The initial vector is

$$
u_0=\begin{bmatrix}F_1\\F_0\end{bmatrix}=\begin{bmatrix}1\\0\end{bmatrix}
$$

Write it as a combination of the two eigenvectors. Then

$$
u_k = c_1\lambda_1^k x_1 + c_2\lambda_2^k x_2
$$

Since $|\lambda_1|>1$ and $|\lambda_2|<1$, the second term decays quickly and the first dominates:

$$
F_k \approx c_1\left(\frac{1+\sqrt5}{2}\right)^k
$$

This is why the golden ratio appears. **The growth rate is the modulus of the largest eigenvalue**, not a guess.

### Eigenvectors

In the $2\times2$ case one can spot that $\begin{bmatrix}\lambda\\1\end{bmatrix}$ works:

$$
\begin{bmatrix}1&1\\1&0\end{bmatrix}
\begin{bmatrix}\lambda\\1\end{bmatrix}
=
\begin{bmatrix}\lambda+1\\\lambda\end{bmatrix}
=
\lambda\begin{bmatrix}\lambda\\1\end{bmatrix}
$$

The last step uses $\lambda^2=\lambda+1$.

## Core review

- $A=S\Lambda S^{-1}$, provided there are $n$ independent eigenvectors.
- $A^k=S\Lambda^k S^{-1}$: eigenvalues are powered, eigenvectors are unchanged.
- $A^k\to0$ exactly when every $|\lambda_i|<1$.
- Distinct eigenvalues guarantee diagonalizability; repeats require checking multiplicities.
- Difference equations: expand the initial vector in eigenvectors and let each component evolve independently.
- Fibonacci growth equals the largest eigenvalue, $(1+\sqrt5)/2$.

## Common misconceptions

1. **Thinking distinct eigenvalues are necessary.** They are sufficient, not necessary.
2. **Checking only algebraic multiplicity.** Repeats are fine if the eigenspace is large enough.
3. **Dropping the absolute value in the stability test.** Negative eigenvalues alternate in sign, but still need $|\lambda|<1$.
4. **Writing $A=S^{-1}\Lambda S$.** The mnemonic is "$A$ multiplies $S$": $AS=S\Lambda$.
5. **Calling Fibonacci growth linear.** It is exponential, with base the golden ratio.

## Check your understanding

**1. Derive $A=S\Lambda S^{-1}$ from $AS=S\Lambda$ and identify where invertibility of $S$ is used.**

Reference answer: Start from $AS=S\Lambda$ and multiply on the **right** by $S^{-1}$:
$$
(AS)S^{-1}=(S\Lambda)S^{-1}\quad\Longrightarrow\quad A=S\Lambda S^{-1}.
$$
This uses the existence of $S^{-1}$, i.e. the $n$ eigenvectors (columns of $S$) are linearly independent. With too few eigenvectors, $S$ is singular and one can only write $AS=S\Lambda$, not a diagonalization of $A$. Mind the order: it is $S\Lambda S^{-1}$, not $S^{-1}\Lambda S$.

**2. If the eigenvalues are $2$ and $0.5$, does $A^k$ tend to zero?**

Reference answer: No. The stability criterion requires $|\lambda_i|<1$ for every eigenvalue. Here $|2|>1$, so the component along that eigenvector grows like $2^k$ and $A^k$ diverges in that direction. The decay of $0.5^k$ in the other direction cannot save it. Only when all eigenvalues have modulus below 1 does $A^k\to0$.

**3. Construct one matrix with a repeated eigenvalue that diagonalizes and one that does not.**

Reference answer: Diagonalizable: $A=\begin{bmatrix}2&0\\0&2\end{bmatrix}=2I$. The eigenvalue $2$ has algebraic multiplicity 2, but every nonzero vector is an eigenvector, so the geometric multiplicity is also 2 and $S=I$ works. Not diagonalizable: $B=\begin{bmatrix}2&1\\0&2\end{bmatrix}$. The eigenvalue $2$ is still double, but
$$
B-2I=\begin{bmatrix}0&1\\0&0\end{bmatrix}
$$
has nullspace $\operatorname{span}\{(1,0)\}$ of dimension 1, so the geometric multiplicity 1 is below the algebraic multiplicity 2 and no two independent eigenvectors exist.

**4. Why does the second Fibonacci eigenvalue ultimately stop mattering?**

Reference answer: $\lambda_1=\frac{1+\sqrt5}{2}\approx1.618$ and $\lambda_2=\frac{1-\sqrt5}{2}\approx-0.618$. Since $|\lambda_2|<1$, $\lambda_2^k\to0$; the negative sign makes the term alternate, but its magnitude decays exponentially. Dividing $u_k=c_1\lambda_1^k x_1+c_2\lambda_2^k x_2$ by $\lambda_1^k$ leaves $c_2(\lambda_2/\lambda_1)^k x_2$, and $|\lambda_2/\lambda_1|<1$, so the relative contribution vanishes and growth is governed by $\lambda_1^k$.

**5. A $3\times3$ matrix has eigenvalues $1,1,1$. Can you conclude it is diagonalizable?**

Reference answer: No. The algebraic multiplicity is 3, but diagonalizability requires the geometric multiplicity to be 3 as well, i.e. $\dim N(A-I)=3$ (equivalently $A=I$). For instance $A=I$ diagonalizes; but
$$
A=\begin{bmatrix}1&1&0\\0&1&0\\0&0&1\end{bmatrix}
$$
has $A-I$ of rank 1, so $\dim N(A-I)=2<3$ and it is not diagonalizable. One must compare the two multiplicities for each eigenvalue before concluding.

## How this connects

This lecture treats discrete time. The next moves the same machinery to continuous time: replace $\lambda^k$ with $e^{\lambda t}$ and $A^k$ with the matrix exponential $e^{At}$. The stability region changes from the unit disk to the left half-plane.
