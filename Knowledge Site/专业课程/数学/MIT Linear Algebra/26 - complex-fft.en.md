---
slug: "26-complex-fft"
title: "Complex Matrices and the Fast Fourier Transform: From Hermitian to FFT"
summary: "Complex inner products require conjugation; symmetry becomes Hermitian and orthogonality becomes unitary. The Fourier matrix has orthogonal columns and factors recursively, reducing n² multiplications to (n/2)log₂n."
updatedAt: "2026-10-31"
content_type: "video-course"
tags:
  - "linear-algebra"
  - "complex-numbers"
  - "fourier-matrix"
  - "fft"
sources:
  - kind: "video"
    title: "26. Complex Matrices; Fast Fourier Transform"
    url: "https://www.youtube.com/watch?v=M0Sa8fLOajA"
    author: "Gilbert Strang, MIT OpenCourseWare"
    publishedAt: "2009-05-07"
---

## Why complex numbers enter

A real matrix can have complex eigenvalues: the $90^\circ$ rotation has $\pm i$. So we must settle what changes when vectors, matrices, and inner products become complex.

There is one governing rule: **conjugate whenever you transpose**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:08 | Complex numbers enter: the Fourier matrix and the FFT |
| 1:20 | The FFT cuts $n^2$ operations down to $n\log n$ |
| 4:01 | Complex vector space $\mathbb{C}^n$ |
| 5:16 | Length in the complex case needs conjugation |
| 8:40 | The complex inner product $\bar x^{\mathsf T}y$ |
| 11:27 | Conjugate transpose and Hermitian matrices |
| 13:56 | Unitary matrices: $U^{\mathsf H}U=I$ |
| 17:11 | The Fourier matrix $F_n$ with entries $w^{jk}$ |
| 21:28 | Powers of $w$ are the $n$-th roots of unity |
| 24:53 | The concrete $F_4$ and orthogonality of its columns |
| 28:55 | Inner products of distinct columns vanish |
| 31:56 | The inverse: $F^{-1}$ conjugates the entries |
| 33:09 | Divide and conquer: separating even and odd columns |
| 36:42 | The diagonal correction matrix $D$ |
| 41:28 | Recursion and the $n\log n$ operation count |
| 44:33 | Comparing $64^2$ with $6\times 64$ |

## Length and inner product of complex vectors

### Length

For a complex vector $z$, $z^Tz$ is no longer usable. Take $z=(1,i)$:

$$
z^Tz=1^2+i^2=1-1=0
$$

Yet the vector is not zero. The correct definition is

$$
\|z\|^2=\bar z^Tz=\bar z_1z_1+\cdots+\bar z_nz_n
=|z_1|^2+\cdots+|z_n|^2
$$

For $(1,i)$:

$$
\|z\|^2=1\cdot1+(-i)\cdot i=1+1=2
$$

so the length is $\sqrt2$.

### The Hermitian transpose

Combine transpose and conjugation into one symbol:

$$
z^H=\bar z^T
$$

Then the length squared is $z^Hz$, and the inner product of two complex vectors is

$$
\langle y,x\rangle=y^Hx
$$

It is usually complex; when $y=x$ it is a nonnegative real number, namely the squared length.

### Orthogonality

Two complex vectors are orthogonal when

$$
q_i^Hq_j=0\quad(i\ne j)
$$

and unit length means $q_i^Hq_i=1$.

## Symmetric becomes Hermitian, orthogonal becomes unitary

| Real case | Complex case |
| --- | --- |
| Symmetric $A=A^T$ | Hermitian $A=A^H$ |
| Orthogonal $Q^TQ=I$ | Unitary $Q^HQ=I$ |
| Real eigenvalues, orthogonal eigenvectors | Real eigenvalues, orthogonal eigenvectors |
| $Q^{-1}=Q^T$ | $Q^{-1}=Q^H$ |

The diagonal entries of a Hermitian matrix must be real: transposition leaves them in place, and conjugating must return the same value, which only real numbers satisfy. Off-diagonal entries come in conjugate pairs: if $a_{ij}=3+i$, then $a_{ji}=3-i$.

## The Fourier matrix

### Definition

Let

$$
W=e^{2\pi i/n}
$$

an $n$-th root of unity on the unit circle at angle $2\pi/n$. The $(i,j)$ entry of the $n\times n$ Fourier matrix, with $i,j$ from 0 to $n-1$, is

$$
(F_n)_{ij}=W^{ij}
$$

The exponent is the row index times the column index.

### The $4 \times 4$ case

For $n=4$,

$$
W=e^{2\pi i/4}=e^{i\pi/2}=i
$$

so

$$
F_4=
\begin{bmatrix}
1&1&1&1\\
1&i&-1&-i\\
1&-1&1&-1\\
1&-i&-1&i
\end{bmatrix}
$$

The exponent pattern:

$$
\begin{matrix}
0&0&0&0\\
0&1&2&3\\
0&2&4&6\\
0&3&6&9
\end{matrix}
$$

and then $i^2=-1$, $i^3=-i$, $i^4=1$ simplify the entries.

### Why the columns are orthogonal

Take columns 2 and 4 (indices 1 and 3):

$$
\begin{bmatrix}1\\i\\-1\\-i\end{bmatrix}
\quad\text{and}\quad
\begin{bmatrix}1\\-i\\-1\\i\end{bmatrix}
$$

A plain dot product without conjugation gives

$$
1\cdot1+i\cdot(-i)+(-1)(-1)+(-i)\cdot i
=1+1+1+1=4
$$

which looks nonzero. But the complex inner product conjugates the first vector:

$$
\bar q_2^Tq_4
=
1\cdot1+(-i)(-i)+(-1)(-1)+i\cdot i
=1-1+1-1=0
$$

So they are orthogonal after all. **Forgetting the conjugate is the classic error here.**

Each column has squared length $n$. Dividing $F_n$ by $\sqrt n$ produces a unitary matrix:

$$
\frac{1}{\sqrt n}F_n \text{ is unitary}
$$

and therefore

$$
F_n^{-1}=\frac1nF_n^H
$$

## The fast Fourier transform

### The problem

Multiplying by $F_n$ directly costs $n^2$ multiplications because the matrix is full. The FFT reduces this to about $\frac n2\log_2 n$.

### The factorization

Take $n=64$. The key observation is

$$
W_{64}^2=W_{32}
$$

because doubling the angle $2\pi/64$ gives $2\pi/32$. Hence $F_{64}$ factors as

$$
F_{64}=
\begin{bmatrix}I&D\\I&-D\end{bmatrix}
\begin{bmatrix}F_{32}&0\\0&F_{32}\end{bmatrix}
P
$$

The three factors are:

1. **$P$**, an even-odd permutation matrix: it puts even-indexed components first and odd-indexed ones second. No multiplications, only reordering.
2. **Two copies of $F_{32}$**, acting separately on the even and odd parts.
3. **Fix-up matrices**: $I$ and $-D$ are nearly free; the real cost is multiplying by the diagonal
   $$
   D=\operatorname{diag}(1,W,W^2,\dots,W^{31})
   $$
   which is 32 multiplications.

So $64^2$ multiplications become

$$
2\cdot 32^2+32
$$

### Recursion

Break each $F_{32}$ the same way, producing four $F_{16}$ plus a size-32 permutation and fix-up. Continue down to size 1.

There are $\log_2 64=6$ levels. Each level costs $n/2$ multiplications in its fix-up, so the total is

$$
\frac n2\log_2 n
$$

### The scale

For $n=1024=2^{10}$:

- direct multiplication: $n^2\approx 1{,}048{,}576$;
- FFT: $\frac n2\log_2 n=512\times10=5120$.

About a 200-fold speedup. That is why the FFT changed entire industries.

## Core review

- Complex length uses $z^Hz$; the inner product is $y^Hx$; conjugation is mandatory.
- Symmetry generalizes to Hermitian ($A=A^H$), orthogonality to unitary ($Q^HQ=I$).
- The Fourier matrix is $(F_n)_{ij}=W^{ij}$ with $W=e^{2\pi i/n}$.
- Its columns are orthogonal with squared length $n$, and $F_n^{-1}=\frac1nF_n^H$.
- The FFT uses $W_{2n}^2=W_n$ to recurse, cutting $n^2$ to $\frac n2\log_2 n$.

## Common misconceptions

1. **Dropping the conjugate in a complex inner product**, which breaks orthogonality tests.
2. **Giving a Hermitian matrix complex diagonal entries.** The diagonal must be real.
3. **Writing $F_n^{-1}=F_n^T$.** The correct form is $\frac1nF_n^H$.
4. **Calling the FFT an approximation.** It is an exact factorization; only the order of multiplications changes.
5. **Converting $W$ to sine and cosine before taking high powers.** The exponential form is what reveals the pattern.

## Check your understanding

**1. Compute the squared length of $z=(1,i,1+i)$.**

Reference answer: The squared length is $\bar z^Tz=|z_1|^2+|z_2|^2+|z_3|^2$. Term by term: $|1|^2=1$, $|i|^2=1$, and $|1+i|^2=1^2+1^2=2$. Hence $\|z\|^2=1+1+2=4$ and the length is $2$. Using $z^Tz$ instead gives $1+i^2+(1+i)^2=1-1+2i=-2+2i$, which is neither real nor correct — the complex inner product must conjugate.

**2. Write $F_4$ and verify that columns 2 and 3 are orthogonal, remembering the conjugate.**

Reference answer: With $W=e^{2\pi i/4}=i$,
$$
F_4=\begin{bmatrix}1&1&1&1\\1&i&-1&-i\\1&-1&1&-1\\1&-i&-1&i\end{bmatrix}.
$$
Column 2 (index 1) is $q_2=(1,i,-1,-i)^T$ with conjugate $\bar q_2=(1,-i,-1,i)^T$; column 3 (index 2) is $q_3=(1,-1,1,-1)^T$. Then
$$
\bar q_2^Tq_3=1\cdot1+(-i)(-1)+(-1)\cdot1+i\cdot(-1)=1+i-1-i=0 .
$$
So the columns are orthogonal. Without the conjugate one gets $1-i-1+i=0$ only by coincidence; columns 2 and 4 fail, which is exactly the example in the text.

**3. Why must the diagonal of a Hermitian matrix be real?**

Reference answer: Hermitian means $A=A^H$, i.e. $a_{ij}=\overline{a_{ji}}$. Setting $i=j$ gives $a_{ii}=\overline{a_{ii}}$. A complex number equals its conjugate exactly when its imaginary part is zero, so each diagonal entry is real. Off-diagonal entries come in conjugate pairs: $a_{ij}=\overline{a_{ji}}$, so $a_{ij}=3+i$ forces $a_{ji}=3-i$.

**4. In the factorization of $F_{64}$, which factor carries most of the work?**

Reference answer: The diagonal correction matrix $D=\operatorname{diag}(1,W,\dots,W^{31})$, which costs $32=n/2$ multiplications. The permutation $P$ only reorders entries and costs no multiplications, $I$ and $-D$ cost only cheap additions, and the two $F_{32}$ blocks are handled recursively. Each level spends $n/2$ multiplications and there are $\log_2 n$ levels, giving $\frac n2\log_2 n$ overall.

**5. For $n=1024$, how many times faster is the FFT than direct multiplication?**

Reference answer: Direct multiplication costs $n^2=1024^2=1{,}048{,}576$ multiplications; the FFT costs $\frac n2\log_2 n=512\times10=5120$. The ratio is $1{,}048{,}576/5120=204.8$, about 200 times faster. The FFT is not an approximation — it is an exact factorization that reorders the same multiplications so that repeated work is eliminated.

## How this connects

This lecture completes the complex case and uses the Fourier matrix to show the computational value of matrix factorization. The next lecture returns to real symmetric matrices and develops positive definiteness, where eigenvalues, pivots, and leading minors give three equivalent tests.
