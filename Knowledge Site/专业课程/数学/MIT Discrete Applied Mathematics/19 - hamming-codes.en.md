---
slug: 19-hamming-codes
title: "Linear Codes and Hamming Codes: From Venn Diagrams to Syndrome Decoding"
summary: "Random codebooks are unimplementable, so we need structure. Starting from a four-message-bit, three-parity-bit Venn construction, we abstract linear codes, generator and parity-check matrices; minimum distance measures correction capability, and syndrome decoding corrects a single bit. Hamming codes are perfect codes."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [coding-theory, hamming-codes, linear-codes, error-correction]
sources:
  - kind: video
    title: "Lecture 19: Error-Correcting Codes—Hamming Codes"
    url: https://www.youtube.com/watch?v=N81pBt3KUWI
    author: Peter Shor, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## From Shannon's random codes to implementable ones

Shannon proved that below capacity there exists a code driving the error to zero. But his codebook is drawn at random: $2^{Rn}$ codewords, exponential storage, and decoding compares the received vector against every codeword, also exponential. Worse, **nearest-codeword decoding** for a general linear code is NP-hard, so no generic algorithm is substantially better than scanning.

The task therefore becomes: find **structured codes with efficient decoding**.

Two historical markers:

- 1948: Shannon proves existence;
- 1950: Hamming gives the first implementable error-correcting code.

This lecture starts with the simplest, Hamming(7,4) — four message bits encoded into seven, correcting one bit — then abstracts to linear codes and the Hamming family, and finishes with syndrome decoding.

The naive "blocks of four" scheme has a limit: to send a million bits at a one-percent error rate, some block of four will contain two errors and fail. Codes correcting many errors at once are needed; that is the Reed–Solomon lecture.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap of Shannon's theorem; random codes are impractical for large $n$ |
| 6:23 | Hamming's 1950 construction of the first error-correcting codes |
| 8:29 | Venn-diagram construction of the (7,4) code: four message bits plus three parity bits |
| 12:23 | Locating a single flipped bit |
| 15:48 | Definition of a linear code: closed under addition and scalar multiplication |
| 18:10 | Generator matrix $G$; encoding $c=mG$ |
| 22:32 | Hamming weight and distance |
| 26:51 | Theorem: a code of minimum distance $d$ corrects $\lfloor(d-1)/2\rfloor$ errors |
| 34:13 | For a linear code, minimum distance equals minimum nonzero weight |
| 37:38 | The general Hamming family: $n=2^s-1$, $k=2^s-1-s$ |
| 49:31 | Generator and parity-check matrices; $GH^T=0$ |
| 1:02:15 | The syndrome depends only on the error |
| 1:06:59 | Syndrome decoding on the (7,4) code |
| 1:10:33 | Perfect codes and the Golay code |

## The (7,4) code from three circles

Take four message bits $a,b,c,d$ and add three parity bits $e,f,g$. Draw three mutually overlapping circles and place the message bits in specific regions:

- circle 1: $b,c,d,f$;
- circle 2: $a,b,d,e$;
- circle 3: $a,c,d,g$.

The rule is: **each circle contains an even number of 1s** (its XOR is zero). Hence

$$
e=a\oplus b\oplus d,\qquad
f=b\oplus c\oplus d,\qquad
g=a\oplus c\oplus d .
$$

A codeword is $(a,b,c,d,e,f,g)$.

### Encoding example

For the message $(1,0,1,1)$:

- $e=1\oplus0\oplus1=0$;
- $f=0\oplus1\oplus1=0$;
- $g=1\oplus1\oplus1=1$.

The codeword is $(1,0,1,1,0,0,1)$, and all three parity checks are even.

### Correcting an error

Flip the second bit $b$: receive $(1,1,1,1,0,0,1)$. Recompute the parity of each circle:

- circle 1 ($b,c,d,f$): $1+1+1+0=1$, odd, fails;
- circle 2 ($a,b,d,e$): $1+1+1+0=1$, odd, fails;
- circle 3 ($a,c,d,g$): $1+1+1+1=0$, even, passes.

The error must lie in both failing circles and outside the passing one. Circles 1 and 2 intersect in $\{b,d\}$; removing $d$ (which lies in circle 3) leaves $b$. So the second bit is wrong and is flipped back.

This is parity checking in geometric form: every position has a distinct pattern of circle membership, so the three parity results identify the error position uniquely.

## Linear codes

Abstract the construction. Let $F$ be a field (here mostly $\mathbb F_2=\{0,1\}$). A **linear code** $C\subseteq F^n$ satisfies:

- if $c_1,c_2\in C$, then $c_1+c_2\in C$;
- if $c_1\in C$ and $\alpha\in F$, then $\alpha c_1\in C$.

Every linear combination of codewords is again a codeword. Taking $\alpha=0$ shows **every linear code contains the all-zero vector**.

The Venn construction is linear: if two vectors make all three circle sums zero, their sum does too, since $0+0=0$.

### Generator matrix

By linear algebra, any linear code has a basis. Put the basis vectors as rows of a $k\times n$ matrix $G$; the code is the set of all linear combinations of rows:

$$
C=\{mG:\ m\in F^k\}.
$$

$G$ is a **generator matrix**, $m$ is the message (a row vector of length $k$), and $c=mG$ is the codeword (length $n$). Encoding is one matrix multiplication: add the rows where the message has a 1.

### The (7,4) generator matrix

From the XOR formulas, the codewords of the four unit messages are

$$
G=
\begin{bmatrix}
1&0&0&0&1&0&1\\
0&1&0&0&1&1&0\\
0&0&1&0&0&1&1\\
0&0&0&1&1&1&1
\end{bmatrix}.
$$

Each row's last three entries record which parity bits that message bit enters. Row one: $a$ appears in $e$ and $g$, so the tail is $1,0,1$.

The message $(1,1,1,0)$ encodes to the sum of the first three rows:

$$
(1,1,1,0,0,0,0).
$$

### Parity-check matrix

A **parity-check matrix** $H$ satisfies

$$
GH^{T}=0 .
$$

Each row of $H$ is one parity equation: the codeword's inner product with that row is zero, i.e. the corresponding circle has an even number of 1s.

Writing $G=[I_k\mid P]$ (identity block then parity block), the matrix

$$
H=\big[-P^{T}\mid I_{n-k}\big]
$$

works, since $GH^{T}=[I\mid P]\begin{bmatrix}-P\\ I\end{bmatrix}=-P+P=0$. Over $\mathbb F_2$, $-P=P$, so signs can be dropped; over other fields they cannot.

For the (7,4) code,

$$
H=
\begin{bmatrix}
1&1&0&1&1&0&0\\
0&1&1&1&0&1&0\\
1&0&1&1&0&0&1
\end{bmatrix}.
$$

Column one is $(1,0,1)$ for position 1 ($a$ enters $e$ and $g$); column two is $(1,1,0)$ for position 2 ($b$ enters $e$ and $f$), and so on.

The columns of $H$ are exactly the seven nonzero vectors of $\mathbb F_2^3$, merely reordered. That fact is what makes Hamming codes perfect.

## Weight and distance

For $v\in F^n$:

- the **Hamming weight** $w(v)$ is the number of nonzero coordinates;
- the **Hamming distance** $d_H(v,w)$ is the number of coordinates where they differ.

Distance is the weight of the difference: $d_H(v,w)=w(v-w)$, since equal coordinates contribute 0 and unequal ones contribute a nonzero difference.

Hamming distance satisfies the triangle inequality, hence is a metric.

The **minimum distance** of a code is

$$
d=\min_{c_1\ne c_2}d_H(c_1,c_2).
$$

For a linear code it reduces to the **minimum nonzero weight**:

$$
d=\min_{c\ne0}w(c).
$$

Indeed $d_H(c_1,c_2)=w(c_1-c_2)$, and since the code is closed under subtraction, $c_1-c_2$ ranges over all nonzero codewords.

## Minimum distance determines correction

**Theorem.** A code of minimum distance $d$ corrects

$$
t=\left\lfloor\frac{d-1}{2}\right\rfloor
$$

errors.

**Proof.** Suppose it cannot. Then some received vector $\tilde c$ lies within distance $t$ of two distinct codewords $c_1\ne c_2$:

$$
d_H(\tilde c,c_1)\le t,
\qquad
d_H(\tilde c,c_2)\le t .
$$

The triangle inequality gives

$$
d_H(c_1,c_2)\le d_H(c_1,\tilde c)+d_H(\tilde c,c_2)\le 2t\le d-1<d,
$$

contradicting the definition of $d$. $\square$

Geometrically, the balls of radius $t$ around distinct codewords are disjoint. A received vector inside one ball has a unique owner; near an overlap it would not. The value $t=\lfloor(d-1)/2\rfloor$ is exactly what can be guaranteed: $d=3$ gives $t=1$, $d=7$ gives $t=3$.

## The general Hamming family

(7,4) is one member. Fix $s\ge2$ and set

$$
n=2^s-1,
\qquad
k=2^s-1-s .
$$

Build $G=[I_k\mid P]$ where the columns of $P$ run through all length-$s$ binary vectors with **at least two 1s**.

Why exactly $k$ columns? There are $2^s$ binary strings of length $s$; remove the all-zero string (one) and the unit vectors (s), leaving $2^s-1-s$. And $n=k+s$ is the number of message plus parity positions.

- $s=3$: $k=4$, $n=7$ — the (7,4) code;
- $s=4$: $k=11$, $n=15$ — the (15,11) code;
- $s=5$: $k=26$, $n=31$.

**The minimum distance is 3.** Three cases:

1. **A single row**: the identity block contributes one 1, and the corresponding column of $P$ has at least two 1s, so the weight is at least 3.
2. **A sum of two rows**: the identity block has exactly two 1s; the parity part is the XOR of two distinct columns, which is nonzero, so at least one more 1. Weight at least 3.
3. **A sum of three or more rows**: the identity block alone has at least three 1s.

So $d=3$ and $\lfloor(3-1)/2\rfloor=1$ error is corrected.

This also explains why the columns of $P$ must be **distinct**: two equal columns would XOR to zero, dropping the weight of that two-row sum to 2 and the minimum distance to 2, which detects but cannot correct.

## Syndrome decoding

With $G$ and $H$, encoding and decoding are clean.

### Encoding

$$
c=mG .
$$

### Syndrome

Send $c$, let the channel add an error vector $e$, and receive

$$
\tilde c=c+e .
$$

The **syndrome** is

$$
\sigma=\tilde c\,H^{T}=(mG+e)H^{T}=mGH^{T}+eH^{T}=eH^{T}.
$$

The first term vanishes because $GH^T=0$, so **the syndrome depends only on $e$, not on the message**. That is why it is called a syndrome: like a symptom, it reports only what went wrong.

### From syndrome to error

For a general linear code there is no efficient universal way to invert $\sigma\mapsto e$ — the other face of the NP-hardness mentioned earlier. For Hamming codes it is trivial.

A Hamming code corrects one bit, so only weight-one errors matter. If $e$ has its 1 in position $j$, then

$$
eH^{T}=H^{T}\text{'s }j\text{-th column}.
$$

So **the syndrome is literally column $j$ of $H$**. Since the columns are all nonzero vectors and therefore distinct, a lookup locates the error, which is then flipped.

### Decoding example

Send $m=(1,1,1,0)$, encoded as $c=(1,1,1,0,0,0,0)$.

Suppose position 6 flips, so $\tilde c=(1,1,1,0,0,1,0)$. Compute

$$
\sigma=\tilde cH^{T}=(0,1,0).
$$

In $H$, the vector $(0,1,0)$ is column 6. The error is in position 6; flipping it recovers $(1,1,1,0,0,0,0)$, whose first four bits are the message $(1,1,1,0)$.

The whole procedure is one matrix multiplication and one lookup, costing $O(n(n-k))$ — polynomial in the block length, in sharp contrast with scanning an exponential codebook.

## Perfect codes

**Definition.** A $t$-error-correcting code is **perfect** if every syndrome corresponds to some error of weight at most $t$.

Equivalently, the Hamming balls of radius $t$ around the codewords tile the whole space: no overlaps, no gaps.

For a binary Hamming code:

- there are $2^s$ syndromes (binary strings of length $s$);
- the zero syndrome corresponds to no error;
- the remaining $2^s-1=n$ syndromes correspond to single-bit errors at the $n$ positions.

The counts match exactly, so Hamming codes are perfect.

In general, a $t$-correcting $q$-ary perfect code must satisfy the **sphere-packing condition**

$$
\sum_{L=0}^{t}\binom{n}{L}(q-1)^L=q^{\,n-k}.
$$

The left side is the volume of a radius-$t$ ball (counted layer by layer), the right side the space size divided by the number of codewords. Equality means the balls tile perfectly.

Beyond Hamming codes, the binary solution with $n=23$, $t=3$ is

$$
\binom{23}{0}+\binom{23}{1}+\binom{23}{2}+\binom{23}{3}
=1+23+253+1771=2048=2^{11},
$$

the $(23,12,7)$ **Golay code**, connected to finite simple groups and other deep structures. Over $\mathbb F_3$ there is the $(11,6,5)$ ternary Golay code. Perfect codes are extremely rare, so one cannot rely on perfection for all correction needs.

## What this lecture establishes

- Random codebooks are unimplementable and nearest-codeword decoding is generally exponential or NP-hard; structured linear codes are needed.
- A linear code is closed under addition and scalar multiplication, contains zero, and is described by a generator matrix $G$ with $c=mG$.
- A parity-check matrix satisfies $GH^T=0$, and the syndrome $\sigma=\tilde cH^T=eH^T$ depends only on the error.
- Minimum distance $d$ gives correction of $\lfloor(d-1)/2\rfloor$ errors; for linear codes $d$ is the minimum nonzero weight.
- Hamming codes have $n=2^s-1$, $k=2^s-1-s$, $d=3$, and correct one error; their parity-check columns are all nonzero $s$-bit vectors.
- Hamming decoding is "which column equals the syndrome", costing polynomial time.
- Hamming codes are perfect: $2^s$ syndromes match "no error plus $n$ single-bit errors"; the only binary perfect codes are Hamming and Golay.

## Comprehension check

**1. Using the Venn construction, why can the (7,4) code locate one error but not correct two?**

Reference answer: The three parity circles produce three check bits, and each position has a distinct pattern of circle membership. The seven positions (four message, three parity) have seven distinct patterns, so three check bits identify a single flipped position — equivalently, the seven columns of the parity-check matrix are distinct.

Two errors cannot be corrected because two different pairs may yield the same check result: flipping positions $x,y$ gives the XOR of two columns, and another pair $x',y'$ could give the same XOR, making them indistinguishable. More fundamentally, the minimum distance is 3, so the theorem guarantees only $\lfloor(3-1)/2\rfloor=1$.

**2. Why must a linear code contain the all-zero vector? Use this to show that minimum distance equals minimum nonzero weight.**

Reference answer: A linear code is closed under scalar multiplication. For any $c\in C$ and scalar $0$, $0\cdot c=\mathbf 0\in C$.

For distinct codewords $c_1\ne c_2$, the difference $c_1-c_2$ is a nonzero codeword (closure under additive inverses). Since $d_H(c_1,c_2)=w(c_1-c_2)$, the set of pairwise distances equals the set of weights of nonzero codewords, so their minima agree.

**3. Prove that a code of minimum distance $d$ corrects $\lfloor(d-1)/2\rfloor$ errors.**

Reference answer: Let $t=\lfloor(d-1)/2\rfloor$, so $2t\le d-1$. Suppose some received vector $\tilde c$ is within distance $t$ of two distinct codewords $c_1,c_2$. The triangle inequality gives

$$
d_H(c_1,c_2)\le d_H(c_1,\tilde c)+d_H(\tilde c,c_2)\le2t\le d-1<d,
$$

contradicting the minimality of $d$. Hence $\tilde c$ lies in at most one radius-$t$ ball, and decoding is unique.

**4. For the (7,4) code, write the fourth row of the generator matrix and explain each entry.**

Reference answer: The row for message bit $d$ is $(0,0,0,1,1,1,1)$.

The first four entries are the identity block, with only the fourth equal to 1. The last three record which parity bits $d$ enters: in the Venn diagram $d$ lies in the central region and appears in $e=a\oplus b\oplus d$, $f=b\oplus c\oplus d$, and $g=a\oplus c\oplus d$, so all three are 1.

This is also why that row has weight 4: $d$ is the only bit in the centre.

**5. Why must the columns of a Hamming parity-check matrix be distinct? What goes wrong otherwise?**

Reference answer: Equal columns mean two positions participate in exactly the same set of checks. A single-bit error at either position produces the same syndrome, so the decoder cannot tell which one occurred, and correction fails.

In distance terms: if columns $i$ and $j$ of $H$ coincide, then $H(e_i+e_j)^T=0$, so $e_i+e_j$ lies in the code with weight 2 (the code is the kernel of $H$). The minimum distance is then at most 2, which detects one error but cannot correct it.

The Hamming construction takes all nonzero columns: distinct by construction, exactly exhausting the $s$-bit vectors, which is what makes the code perfect.

**6. Why is the syndrome $\sigma=\tilde cH^T$ independent of the message? What does that buy the decoder?**

Reference answer:

$$
\sigma=\tilde cH^{T}=(c+e)H^{T}=cH^{T}+eH^{T},
$$

and $c=mG$, so $cH^T=mGH^T=0$. Hence $\sigma=eH^T$, depending only on the error.

The decoder therefore does not need to guess the message or search codewords. It locates and corrects the error from the error's own signature, then reads off the message. A problem that seemed to require scanning the codebook becomes a lookup.

**7. Decode the received word $(1,1,1,0,0,1,0)$ for the (7,4) code.**

Reference answer: With

$$
H=
\begin{bmatrix}
1&1&0&1&1&0&0\\
0&1&1&1&0&1&0\\
1&0&1&1&0&0&1
\end{bmatrix},
$$

compute $\tilde cH^T$: row one gives $1+1+0+0+0+0+0=0$; row two gives $0+1+1+0+0+1+0=1$; row three gives $1+0+1+0+0+0+0=0$. The syndrome is $(0,1,0)$.

Column 6 of $H$ is $(0,1,0)$, so the error is at position 6. Flipping it yields $(1,1,1,0,0,0,0)$, whose first four bits are the message $(1,1,1,0)$.

**8. What is a perfect code? Use the sphere-packing condition to explain why Hamming codes are perfect, and why perfect codes are rare.**

Reference answer: A perfect code has every syndrome correspond to an error of weight at most $t$, equivalently the radius-$t$ Hamming balls around codewords tile the space with no overlap or gap.

The sphere-packing condition is

$$
\sum_{L=0}^{t}\binom{n}{L}(q-1)^L=q^{n-k},
$$

the ball volume on the left, the space size divided by the code size on the right. For binary Hamming codes with $t=1$, the left side is $1+n=1+(2^s-1)=2^s$, matching $q^{n-k}=2^s$.

Perfect codes are rare because this is a very tight Diophantine equation in $n$, $t$, and $q$. Over the binary alphabet only Hamming codes and the $(23,12,7)$ Golay code qualify; over $\mathbb F_3$ there is additionally the $(11,6,5)$ ternary Golay code. For most parameters the balls must overlap or leave gaps.

## Relation to neighbouring lectures

The previous lecture used random codebooks to prove capacity is achievable, but the codebook is exponential and decoding NP-hard; this lecture gives the first implementable structured family: linear codes describe the codebook with a matrix, and Hamming codes decode single-bit errors in polynomial time via the syndrome.

The limitation is minimum distance 3 — only one error. The next lecture constructs Reed–Solomon codes from polynomial evaluations over finite fields, raising the minimum distance to $n-k+1$ and correcting many errors with an error-locator polynomial.

Later the course turns to cryptography and secret sharing, where linear algebra returns in a different guise.
