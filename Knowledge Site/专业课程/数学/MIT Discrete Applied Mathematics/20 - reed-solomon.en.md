---
slug: 20-reed-solomon
title: "Reed–Solomon Codes: Polynomial Evaluation and Error Location"
summary: "Write the message as a polynomial of degree below k and evaluate it at n distinct points to obtain the codeword. The bound on the number of roots immediately gives minimum distance n−k+1 and correction of (n−k)/2 errors. Decoding becomes a linear system: introduce an error-locator f and q=pf, solve, then divide. Concatenated with an inner code, Reed–Solomon drives the failure probability at a 10% bit error rate to about 10⁻⁶⁰."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [coding-theory, reed-solomon, finite-fields, error-correction]
sources:
  - kind: video
    title: "Lecture 20: Reed-Solomon Codes"
    url: https://www.youtube.com/watch?v=OapnQzIDBM0
    author: Peter Shor, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## From Hamming codes to polynomials

Hamming codes have minimum distance 3 and correct one bit. As blocks grow longer, the chance of two errors in one block rises quickly, so single-error correction is no longer enough. A code whose **distance grows with the block length** is needed.

The idea comes from an old algebraic fact:

> A nonzero polynomial of degree at most $d$ over a field has at most $d$ roots.

Encode the message as the values of a polynomial at several points. Two different polynomials then cannot agree at many points — the root bound on their difference gives a distance lower bound. That is a Reed–Solomon code.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | History: Shannon 1948, Hamming 1950, Reed–Solomon 1960 |
| 1:05 | Concatenated codes 1966; Berlekamp–Massey decoding 1969 |
| 2:02 | Voyager 1977 uses RS codes; turbo codes in the 1990s |
| 4:54 | Construction: message → polynomial → evaluations |
| 9:40 | The generator matrix is Vandermonde |
| 13:43 | Theorem: minimum distance $n-k+1$ |
| 17:09 | Correction condition $n-k\ge2e$ |
| 20:16 | Decoding theorem: exist $f$, $q$ with $q(i)=r_if(i)$ |
| 24:31 | Proof: $f$ vanishes at error positions, $q=pf$ |
| 30:23 | Decoding as a linear system |
| 36:28 | One more unknown than equations; normalization makes it unique |
| 45:02 | Concatenation: RS outer, $(19,8,7)$ inner |
| 59:07 | At a 10% bit error rate, failure about $10^{-60}$ |
| 1:02:41 | Inner decoding by table lookup |

## Construction: the message as a polynomial

Let the field be $\mathbb F_q$ (any $\mathbb Z_p$ works; practice uses $\mathbb F_{2^8}$). The message is a list of coefficients

$$
m_0,m_1,\dots,m_{k-1}\in\mathbb F_q ,
$$

defining

$$
p(x)=m_0+m_1x+\cdots+m_{k-1}x^{k-1},
$$

of degree at most $k-1$.

Choose $n$ **distinct** evaluation points $\alpha_1,\dots,\alpha_n\in\mathbb F_q$ and define the codeword

$$
c=\big(p(\alpha_1),\,p(\alpha_2),\,\dots,\,p(\alpha_n)\big).
$$

This lecture takes $\alpha_i=i$, i.e. $0,1,\dots,n-1$.

Two requirements cannot be dropped:

- $n\le q$, since a field with $q$ elements has no more than $q$ distinct points;
- the points must be distinct, otherwise two different polynomials could agree at a shared point and the distance argument collapses.

### Linearity and the generator matrix

Evaluation is linear in the coefficients: if $p\mapsto c$ and $p'\mapsto c'$, then $p+p'\mapsto c+c'$. So RS codes are linear.

The $j$-th row of the generator matrix is the codeword of "coefficient $m_j=1$, all others zero", namely the values of $x^j$ at the points:

$$
G=
\begin{bmatrix}
1&1&1&\cdots&1\\
0&1&2&\cdots&n-1\\
0&1&4&\cdots&(n-1)^2\\
\vdots&\vdots&\vdots&&\vdots\\
0&1&2^{k-1}&\cdots&(n-1)^{k-1}
\end{bmatrix}.
$$

All arithmetic is in $\mathbb F_q$. For $q=13$, for instance, $27\bmod13=1$, so entries never grow without bound.

This is a **Vandermonde matrix**: each column holds the powers of one evaluation point. Since the points are distinct, it has full column rank. The codeword of $m$ is $mG$, whose $i$-th entry is exactly $p(\alpha_i)$.

## Minimum distance: $n-k+1$

**Theorem.** The minimum distance of the RS code is

$$
d=n-k+1 .
$$

**Proof.** A codeword is $(p(0),p(1),\dots,p(n-1))$ with $\deg p\le k-1$.

If $p$ is nonzero, it has at most $k-1$ roots, so at most $k-1$ of $p(0),\dots,p(n-1)$ vanish. Hence every nonzero codeword has Hamming weight at least

$$
n-(k-1)=n-k+1 .
$$

The bound is attained (choose $p$ with roots at $k-1$ evaluation points), so $d=n-k+1$. $\square$

### How many errors can be corrected

By the minimum-distance theorem,

$$
t=\left\lfloor\frac{d-1}{2}\right\rfloor=\left\lfloor\frac{n-k}{2}\right\rfloor .
$$

Equivalently, correcting $e$ errors requires

$$
n-k\ \ge\ 2e .
$$

For a $(255,223)$ RS code, $n-k=32$, so 16 symbol errors can be corrected.

This meets the **Singleton bound** $d\le n-k+1$, so RS codes are **MDS** (maximum distance separable): for fixed $n$ and $k$, the distance cannot be larger.

Note that an "error" here is a **symbol**, an element of $\mathbb F_q$ — one byte in $\mathbb F_{2^8}$ — not a bit.

## The decoding theorem

The received vector is

$$
\tilde c=(r_0,r_1,\dots,r_{n-1}),
$$

where most positions satisfy $r_i=p(i)$ and a few do not.

Let the error positions be $i_1,\dots,i_l$ with $l\le e$, and define

- the **error-locator polynomial** $f(x)=\prod_{j=1}^{l}(x-i_j)$, of degree $l\le e$;
- $q(x)=p(x)f(x)$, of degree at most $(k-1)+e=k+e-1$.

**Theorem.** For every evaluation point $i\in\{0,1,\dots,n-1\}$,

$$
q(i)=r_i\,f(i).
$$

**Proof.** Two cases.

**If $i$ is an error position**, then $f(i)=0$, so the right side is $0$; the left side is $q(i)=p(i)f(i)=0$. Equal.

**If $i$ is not an error position**, then $r_i=p(i)$, so

$$
q(i)=p(i)f(i)=r_if(i).
$$

Equal again. $\square$

The identity looks trivial, but it converts a discrete question — which positions are wrong — into an algebraic one: find a pair of polynomials. The latter can be solved by linear algebra.

## Decoding by linear algebra

Expand $q$ and $f$ by coefficients:

$$
q(x)=q_0+q_1x+\cdots+q_{k+e-1}x^{k+e-1},
\qquad
f(x)=f_0+f_1x+\cdots+f_ex^{e}.
$$

For each $i=0,\dots,n-1$, the equation $q(i)=r_if(i)$ reads

$$
\sum_{j=0}^{k+e-1}q_j\,i^j
=
r_i\sum_{j=0}^{e}f_j\,i^j .
$$

Moving everything to one side:

$$
\sum_{j=0}^{k+e-1}q_j\,i^j-\sum_{j=0}^{e}\big(r_i\,i^j\big)f_j=0 .
$$

This is **linear** in the unknown coefficients $q_0,\dots,q_{k+e-1},f_0,\dots,f_e$. There are

$$
(k+e)+(e+1)=k+2e+1
$$

unknowns and $n$ equations. At the critical rate $n=k+2e$, there is **one more unknown than equation**.

A homogeneous system with more unknowns than equations has a nonzero solution. Because the generator matrix is a full-rank Vandermonde matrix, one shows these equations also have full rank, so the solution space is exactly one-dimensional.

To pin down the scale, use the leading coefficient of $f$: if exactly $e$ errors occurred, $\deg f=e$, so normalize $f_e=1$. The solution is then unique.

Finally,

$$
p(x)=\frac{q(x)}{f(x)},
$$

and polynomial division recovers the message coefficients.

### When fewer than $e$ errors occur

The normalization assumed $l=e$. If fewer errors occurred, $\deg f<e$ and $f_e=0$, so normalizing $f_e=1$ fails.

One fix is to try $l=0,1,\dots,e$ in turn and check consistency; another is to use a more refined algorithm (Berlekamp–Massey or the Euclidean algorithm) that determines the actual degree. The linear-algebra method is conceptually simple but not the most efficient.

## Concatenated codes: making RS practical

A single RS code has a hard limit: $n\le q$. Over $\mathbb F_{2^8}$, $n\le256$, and the correctable fraction $(n-k)/(2n)<1/2$. If every symbol may be wrong, an error rate above one half cannot be handled.

Concretely, let the bit error rate be 10%. A byte of eight bits is wrong with probability

$$
1-(1-0.1)^8=1-0.9^8\approx0.57 .
$$

An RS code tolerates at most $53/256\approx0.207$ symbol errors. Since $0.57>0.207$, **the outer RS code cannot face raw bit errors directly**.

### Two layers

Concatenate an inner code that protects each symbol with an outer RS code that protects the symbol sequence.

**Inner code**: from a code table, the $(19,8,7)$ code — eight message bits into nineteen, minimum distance 7, correcting three bit errors.

**Outer code**: an RS code over $\mathbb F_{2^8}$ with $n=256$, $k=150$, $e=53$.

Encoding proceeds as:

1. split the message into bytes: 150 bytes, i.e. $150\times8=1200$ bits;
2. encode with the RS outer code into 256 bytes;
3. encode each byte with the inner code into 19 bits, giving $256\times19=4864$ bits.

Decoding reverses this: table-decode each 19-bit block (up to three bit errors), obtaining 256 bytes; then RS-decode up to 53 byte errors.

### Performance

The probability that a 19-bit block has four or more errors — the inner-code failure probability — is about

$$
1-\sum_{j=0}^{3}\binom{19}{j}(0.1)^j(0.9)^{19-j}\approx0.115 .
$$

After inner decoding, each byte is still wrong with probability about 11%. Among 256 bytes the expected number of errors is about 29, well below the correctable 53, and a binomial tail bound puts the probability of exceeding 53 at roughly $10^{-60}$.

The cost is bandwidth: 1200 bits become 4864, about a factor of four. Shannon's capacity $1-H(0.1)\approx0.53$ says an ideal code would need only about a factor of two. Being within a factor of two was good enough in the 1970s, and RS codes stayed in service for decades — in CDs, DVDs, deep-space links, and QR codes.

## What this lecture establishes

- An RS codeword is a degree-$\le k-1$ polynomial evaluated at $n\le q$ distinct points.
- It is linear, with a full-column-rank Vandermonde generator matrix.
- A nonzero polynomial has at most $k-1$ roots, so $d=n-k+1$; RS codes meet the Singleton bound and are MDS.
- They correct $\lfloor(n-k)/2\rfloor$ symbol errors.
- The decoding theorem uses the error locator $f=\prod(x-i_j)$ and $q=pf$, giving $q(i)=r_if(i)$ at every point.
- These identities are linear in the coefficients; with one more unknown than equation, normalizing $f_e=1$ yields a unique solution, and $p=q/f$.
- The constraints $n\le q$ and $e<n/2$ make a single layer insufficient at high bit error rates; concatenating the $(19,8,7)$ inner code brings the failure probability at 10% bit errors to about $10^{-60}$.

## Comprehension check

**1. How does "a polynomial of degree at most $k-1$ has at most $k-1$ roots" imply minimum distance $n-k+1$?**

Reference answer: Two distinct codewords come from two distinct polynomials $p_1\ne p_2$. Their difference $p_1-p_2$ is nonzero of degree at most $k-1$, so it has at most $k-1$ roots. Hence among the $n$ evaluation points it vanishes at most $k-1$ times, meaning the two codewords agree in at most $k-1$ positions and differ in at least

$$
n-(k-1)=n-k+1 .
$$

So every pair of codewords has distance at least $n-k+1$. Taking $p_2=0$ (the zero polynomial is a codeword) attains the bound, so the minimum distance is exactly $n-k+1$.

**2. How many symbol errors can a $(255,223)$ RS code correct, and why not more?**

Reference answer: $d=n-k+1=33$, so

$$
\left\lfloor\frac{d-1}{2}\right\rfloor=\left\lfloor\frac{32}{2}\right\rfloor=16
$$

symbol errors.

Correcting 17 would require $d\ge2\cdot17+1=35$, but the Singleton bound gives $d\le n-k+1=33$, a contradiction. The Singleton bound holds for every code, and RS codes attain it, so no code with these $n$ and $k$ can do better.

**3. Why is the generator matrix Vandermonde, and why is it full rank?**

Reference answer: Row $j$ lists the values of $x^j$ at the evaluation points, $(1^j,2^j,\dots,(n-1)^j)$ in this lecture's ordering. Stacking the rows, each column holds increasing powers of one point — the Vandermonde structure.

It has full column rank because the Vandermonde determinant of any $k$ distinct points is

$$
\prod_{i<j}(\alpha_j-\alpha_i)\ne0 .
$$

Hence values at any $k$ distinct points are linearly independent and the rank is $k$. This is precisely why the evaluation points must be distinct.

**4. In the decoding theorem, how are $f$ and $q$ defined, and why does $q(i)=r_if(i)$ hold at every point?**

Reference answer: $f(x)=\prod_{j=1}^{l}(x-i_j)$ where $i_1,\dots,i_l$ are the error positions, and $q(x)=p(x)f(x)$.

Two cases:

- at an error position, $f(i)=0$, so both sides are zero;
- elsewhere $r_i=p(i)$, so $q(i)=p(i)f(i)=r_if(i)$.

The identity matters because the right side uses the known received values $r_i$ while the left side involves the unknown polynomials, so the equations over all $i$ form a linear system in their coefficients.

**5. The system has $k+2e+1$ unknowns but only $n=k+2e$ equations. Why is the solution still unique?**

Reference answer: A homogeneous system with more unknowns than equations always has a nonzero solution, and here the solution space has dimension at least one. The equations have full rank, so the space is exactly one-dimensional: every solution is a scalar multiple of one nonzero solution.

Multiplying both $f$ and $q$ by a constant leaves $q(i)=r_if(i)$ unchanged, so a scale must be fixed externally. When exactly $e$ errors occurred, $\deg f=e$ and $f_e\ne0$; normalizing $f_e=1$ fixes the multiple and makes the solution unique.

If fewer than $e$ errors occurred, $f_e=0$ and this normalization fails, so one tries each $l$ or uses Berlekamp–Massey.

**6. Why does a single RS code fail at a 10% bit error rate? How does concatenation fix it?**

Reference answer: Over $\mathbb F_{2^8}$ a symbol is a byte, and at a 10% bit error rate a byte is wrong with probability

$$
1-0.9^8\approx0.57 .
$$

An RS code corrects a fraction $(n-k)/(2n)<1/2$ of symbols; for the example, $53/256\approx0.207$. Since $0.57$ far exceeds $0.207$, the outer code is overwhelmed.

Concatenation first encodes each byte with the $(19,8,7)$ inner code, correcting three bit errors and reducing the failure probability of a 19-bit block to about 11%. That 11% byte error rate is below the RS threshold of $20.7\%$, so the outer code can finish the job.

**7. RS codes attain the Singleton bound (MDS). Why do they still fall short of Shannon capacity?**

Reference answer: The two bounds optimize different things. The Singleton bound $d\le n-k+1$ fixes $n$ and $k$ and asks for the largest possible distance at that length and dimension; RS codes attain it and are optimal in that sense.

Shannon capacity asks a different question: as $n\to\infty$ with a growing alphabet, what is the largest **rate** at which reliable communication is possible? Attaining capacity needs $q$ growing with $n$ and very long codes, while RS codes require $n\le q$; in the classical construction $q$ and $n$ are comparable and decoding cost grows with $n$, so capacity is out of reach. Concatenation narrows the gap to a constant factor; turbo, LDPC, and polar codes close it.

**8. Why can the inner code be decoded by table lookup? What did that mean for 1977 hardware?**

Reference answer: The $(19,8,7)$ inner code has only $2^8=256$ codewords, but a received block can be any of $2^{19}\approx524288$ nineteen-bit strings. One can precompute a table mapping each possible received string to its nearest codeword; decoding is then a single lookup, $O(1)$ time.

The cost is memory. A modern computer holds half a million entries trivially, but the 1977 Voyager hardware had very little memory and could not store the whole table. Real systems either used a smaller inner code (fewer entries), or a Hamming inner code (trivial decoding, slightly worse performance), or some other structured scheme. The lecture does not state Voyager's exact choice, only that it must have traded memory against performance.

## Relation to neighbouring lectures

Hamming codes from the previous lecture use a parity-check matrix for single-bit correction with distance fixed at 3; this lecture uses polynomial evaluation to raise the distance to $n-k+1$, at the cost of working over finite fields and decoding via a linear system.

Together they mark the two main lines of linear codes: **checking** (Hamming, syndrome decoding) and **algebraic construction** (RS, error-locator polynomials). BCH and algebraic-geometry codes follow the second line, while concatenation and iterative decoding lead to turbo and LDPC codes.

This closes the coding-theory unit. The course then turns to cryptography and secret sharing, where finite fields, polynomials, and linear algebra reappear — but the adversary is no longer noise, it is an opponent.
