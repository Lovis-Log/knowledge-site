---
slug: 10-modular-arithmetic
title: "Congruences, Euclid's algorithm and the Chinese remainder theorem"
summary: "The division algorithm supplies the language of congruences, and congruence is equivalent to equality of remainders. Euclid's algorithm computes gcds quickly; the extended version yields Bézout identities, which decide and compute modular inverses. The lecture closes with a proof and a construction for the Chinese remainder theorem."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [number-theory, modular-arithmetic, euclidean-algorithm, chinese-remainder-theorem]
sources:
  - kind: video
    title: "Lecture 10: Modular Arithmetic"
    url: https://www.youtube.com/watch?v=wkmDtvO222A
    author: "Ankur Moitra, MIT OpenCourseWare"
    publishedAt: 2025-12-18
---

## What this lecture is for

"Even plus odd is odd" is elementary, yet it is already arithmetic modulo $2$: knowing only the remainders after division by $2$ predicts the parity of the sum. This lecture pushes the observation to arbitrary moduli and answers three questions:

1. Which algebraic rules carry over to modular arithmetic?
2. When can one "divide" by a number, i.e. when does a multiplicative inverse exist?
3. Can several congruence conditions with different moduli hold at once, and if so is the solution unique and how is it found?

The third question is the Chinese remainder theorem, which reappears throughout coding and cryptography.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | From parity to modular arithmetic |
| 0:57 | Definition of congruence |
| 2:16 | The division algorithm |
| 4:21 | Proof that congruence equals equality of remainders |
| 9:04 | The clock picture |
| 10:25 | Addition and multiplication modulo $n$ |
| 16:25 | Associativity, commutativity, distributivity |
| 18:13 | A zero-knowledge proof with playing cards |
| 23:39 | Multiplicative inverses; the key question |
| 27:50 | Greatest common divisors |
| 29:54 | The lemma behind Euclid's algorithm |
| 42:06 | A numerical example |
| 44:06 | The extended algorithm and Bézout's identity |
| 49:37 | Existence and computation of inverses |
| 54:26 | The Chinese remainder theorem |
| 1:11:08 | A constructive solution |
| 1:14:22 | Application: fountain codes |

## Congruences and division with remainder

### Definition

Let $n$ be a positive integer. We say $a$ and $b$ are **congruent modulo $n$**, written

$$
a\equiv b\pmod n,
$$

exactly when $a-b$ is an integer multiple of $n$, that is $n\mid(a-b)$.

### The division algorithm

For any integers $a$ and $n>0$ there are **unique** integers $q$ and $r$ with

$$
a=qn+r,\qquad 0\le r<n .
$$

Here $q$ is the quotient and $r$ the remainder. Uniqueness follows because the interval $[0,n-1]$ has length $n$: two solutions would differ by a multiple of $n$ of absolute value less than $n$, hence by $0$.

### Congruence equals equality of remainders

**Proposition.**

$$
a\equiv b\pmod n
\iff
a\bmod n=b\bmod n .
$$

**Proof ($\Leftarrow$).** Write $a=qn+r$ and $b=q'n+r$ with the same remainder $r$. Then

$$
a-b=(q-q')n,
$$

a multiple of $n$, so the two are congruent.

**Proof ($\Rightarrow$).** Write $a=qn+r$, $b=q'n+r'$ and assume $a-b$ is a multiple of $n$. On the other hand

$$
a-b=(q-q')n+(r-r').
$$

Therefore $r-r'$ is also a multiple of $n$. But $0\le r,r'<n$, so

$$
-n<r-r'<n .
$$

The only multiple of $n$ in this open interval is $0$, hence $r=r'$. $\square$

This proposition translates an abstract relation into a concrete operation — divide and look at the remainder — and every algorithm below relies on the translation.

### The clock picture

Place $0,1,\dots,n-1$ evenly around a clock face. An integer $k$ corresponds to the position reached by walking $k$ steps from $0$.

Modulo $7$, for example, $5$ lands on position $5$; $12$ goes once around and then five more steps, landing on $5$ as well, so $12\equiv5\pmod7$. Modular arithmetic **does not distinguish** how many laps were made, only where you stop.

## Arithmetic modulo $n$

### Addition and multiplication

If $a\equiv a'$ and $b\equiv b'\pmod n$, then

$$
a+b\equiv a'+b',\qquad ab\equiv a'b'\pmod n .
$$

The practical procedure: compute with ordinary integers, then subtract enough multiples of $n$ to land in $[0,n-1]$.

Example modulo $7$: $10\equiv3$ and $12\equiv5$, so

$$
10\cdot12=120\equiv3\cdot5=15\equiv1\pmod7 .
$$

Check: $120=17\cdot7+1$.

**Why may one compute first and reduce afterwards?** Every integer has the form $qn+r$, and $qn$ is $0$ modulo $n$; only the remainder does any work.

### Three algebraic laws

For all $a,b,c$ and modulus $n$:

- **Associativity**: $(a+b)+c\equiv a+(b+c)$ and $(ab)c\equiv a(bc)$.
- **Commutativity**: $a+b\equiv b+a$ and $ab\equiv ba$.
- **Distributivity**: $a(b+c)\equiv ab+ac$.

These match ordinary integer arithmetic because the two sides differ by a multiple of $n$. Modular arithmetic therefore forms a **ring** — the starting point of the next lecture on groups.

### Not every rule survives

Addition and multiplication are safe, but **cancellation is not**. Modulo $6$,

$$
2\cdot3=6\equiv0,\qquad 2\cdot0=0,
$$

so $2\cdot3\equiv2\cdot0$ yet $3\not\equiv0$. Cancelling a factor requires that factor to be invertible, which is the subject of the next section.

## Multiplicative inverses

### Definition and examples

An element $a$ has a **multiplicative inverse** modulo $n$ if some $b$ satisfies

$$
ab\equiv1\pmod n .
$$

Modulo $7$, $2\cdot4=8\equiv1$, so $4$ is the inverse of $2$ and vice versa. Likewise $3\cdot5=15\equiv1$.

With an inverse, "dividing by $4$" becomes "multiplying by $2$": from $4x\equiv c$ we get $x\equiv2c$. This is the prototype of encryption and decryption in cryptography — multiply to scramble a message, multiply by the inverse to unscramble it.

### The key question

**Modulo $7$, does every nonzero element have an inverse?** Checking the table confirms that $1,2,3,4,5,6$ all do. But for large moduli no one can write down the whole table, so theory must answer two questions:

1. When does an inverse exist?
2. How is it computed without a table?

The answers involve gcds and Euclid's algorithm.

## Greatest common divisors

$\gcd(a,b)$ is the largest positive integer dividing both $a$ and $b$; it is $1$ when no larger common divisor exists.

The brute-force method tries every integer from $1$ to $\min(a,b)$, which is hopeless for large numbers. A fast algorithm is needed.

## Euclid's algorithm

### Lemma 1: subtracting one copy preserves the gcd

For $b\ge a$,

$$
\gcd(a,b)=\gcd(a,\,b-a).
$$

**Proof.** Compare the two sets of common divisors.

If $k\mid a$ and $k\mid b$, then $k\mid(b-a)$, so $k$ is a common divisor of $a$ and $b-a$.

Conversely, if $k\mid a$ and $k\mid(b-a)$, then $b=(b-a)+a$ is also divisible by $k$, so $k$ is a common divisor of $a$ and $b$.

The two sets of common divisors coincide, so their largest elements coincide. $\square$

Logically, this is not a lower-bound argument but a **one-to-one match of common divisors**; equality of sets is stronger and cleaner than comparing sizes.

### Lemma 2: subtract all at once

Write $b=qa+r$ by the division algorithm. Applying Lemma 1 repeatedly,

$$
\gcd(a,b)=\gcd(a,b-a)=\gcd(a,b-2a)=\cdots=\gcd(a,b-qa)=\gcd(a,r).
$$

Hence

$$
\gcd(a,b)=\gcd(a,\ b\bmod a).
$$

One division replaces $q$ subtractions, which is why the algorithm is fast: if $a$ and $b$ are close, one subtraction halves the larger; if they are far apart, one remainder operation brings the larger below $a$. Either way the numbers shrink rapidly.

### A numerical example

Compute $\gcd(46,360)$:

$$
\begin{aligned}
360&=7\cdot46+38,\\
46&=1\cdot38+8,\\
38&=4\cdot8+6,\\
8&=1\cdot6+2,\\
6&=3\cdot2+0.
\end{aligned}
$$

The last nonzero remainder is $2$, so $\gcd(46,360)=2$. Indeed $\gcd(2,0)=2$, since every positive integer divides $0$.

## The extended algorithm and Bézout's identity

The plain algorithm keeps only remainders; the **extended** one also records how each remainder is built from the original pair.

Working backwards:

$$
\begin{aligned}
38&=360-7\cdot46,\\
8&=46-38=8\cdot46-360,\\
6&=38-4\cdot8=5\cdot360-39\cdot46,\\
2&=8-6=47\cdot46-6\cdot360.
\end{aligned}
$$

Thus $s=47$ and $t=-6$ satisfy

$$
46\cdot47+360\cdot(-6)=2162-2160=2 .
$$

**Theorem (Bézout).** For any integers $a,b$ there exist integers $s,t$ with

$$
sa+tb=\gcd(a,b).
$$

### The identity is a certificate

Suppose someone reports the answer $2$. How can you be sure it is the **greatest** common divisor rather than merely some common divisor?

- It divides both: $2\mid46$ and $2\mid360$ are checked directly.
- Nothing larger divides both: if $k$ divides $46$ and $360$, then from $2=47\cdot46-6\cdot360$ dividing by $k$ gives an integer on the left and a sum of integers on the right, so $k\mid2$, hence $k\le2$.

One identity establishes both "is a common divisor" and "no larger one exists". That is the value of Bézout: it turns a comparison of sizes into a divisibility check.

## Inverses: existence and computation

### Why a prime modulus guarantees inverses

Let $p$ be prime and $a\not\equiv0\pmod p$. The only positive divisors of $p$ are $1$ and $p$, and $a$ is not a multiple of $p$, so

$$
\gcd(a,p)=1 .
$$

By Bézout there are $s,t$ with

$$
as+pt=1 .
$$

Reducing modulo $p$ kills $pt$:

$$
as\equiv1\pmod p .
$$

So $s$ is the inverse of $a$. This proves existence and also gives an algorithm: **run the extended Euclidean algorithm on $a$ and $p$ and read off $s$.**

### Non-prime moduli

The real condition is $\gcd(a,n)=1$, independent of whether $n$ is prime. Modulo $6$, $\gcd(5,6)=1$, so $5$ has an inverse, and indeed $5\cdot5=25\equiv1$: it is its own inverse. But $\gcd(2,6)=2\ne1$, so $2$ has no inverse.

### Examples

Modulo $7$, the inverse of $4$: $\gcd(4,7)=1$ and $4\cdot2+7\cdot(-1)=1$, so the inverse is $2$.

Modulo $7$, the inverse of $5$: $5\cdot3+7\cdot(-2)=1$, so the inverse is $3$.

## The Chinese remainder theorem

### Starting from a puzzle

A chest of coins: grouped in fives, four are left over; grouped in sevens, one is left over. What is the smallest possible number?

In congruences:

$$
n\equiv4\pmod5,\qquad n\equiv1\pmod7 .
$$

Guess $29=5\cdot5+4=4\cdot7+1$. A guess, however, needs theory: is the solution unique, and what happens when the moduli share a factor?

### Statement

Let $\gcd(a,b)=1$. Then for any residues $r,s$ the system

$$
n\equiv r\pmod a,\qquad n\equiv s\pmod b
$$

has a **unique** solution with $0\le n<ab$.

Equivalently, the map

$$
n\longmapsto\big(n\bmod a,\ n\bmod b\big)
$$

is a bijection from $\{0,1,\dots,ab-1\}$ onto the $a\times b$ possible residue pairs.

### Proof

Both sides are finite sets with $ab$ elements. It suffices to prove the map is **injective**; counting then upgrades it to a bijection, settling existence and uniqueness at once.

Suppose $x\ne y$ both lie in $[0,ab)$ and have identical residue pairs:

$$
x\equiv y\pmod a,\qquad x\equiv y\pmod b .
$$

Then $a\mid(x-y)$ and $b\mid(x-y)$. Since $\gcd(a,b)=1$, two coprime numbers dividing the same integer force their product to divide it:

$$
ab\mid(x-y).
$$

But $0<|x-y|<ab$ when $x\ne y$, so $ab$ cannot divide $x-y$ — a contradiction. $\square$

**Coprimality cannot be dropped.** With $a=6$ and $b=9$, the conditions $6\mid N$ and $9\mid N$ imply only $18\mid N$, not $54\mid N$; $N=18$ is a counterexample, because the two moduli share the factor $3$.

### A constructive solution

Uniqueness is only a guarantee; to compute $n$, proceed as follows.

Let $t=s$ be the residue modulo $b$ and write

$$
n=kb+t,\qquad 0\le k<a .
$$

Substitute into the first congruence:

$$
kb+t\equiv r\pmod a
\Longrightarrow
kb\equiv r-t\pmod a .
$$

Since $\gcd(b,a)=1$, $b$ is invertible modulo $a$. Multiplying by $b^{-1}$:

$$
k\equiv b^{-1}(r-t)\pmod a .
$$

Because $0\le k<a$, $k$ equals that residue, and substituting back gives $n$.

### Example

Solve $n\equiv4\pmod5$, $n\equiv1\pmod7$. Take $a=5$, $b=7$, $r=4$, $s=t=1$.

The inverse of $7$ modulo $5$: $7\equiv2$ and $2\cdot3=6\equiv1$, so $7^{-1}\equiv3$.

$$
k\equiv3\cdot(4-1)=9\equiv4\pmod5 .
$$

$$
n=4\cdot7+1=29 .
$$

Matching the guess.

## Application: fountain codes

Regard a large file as a huge integer $N$. The server does not transmit the file itself; it continuously broadcasts pairs

$$
(a_i,\ N\bmod a_i),
$$

where the $a_i$ are distinct primes.

A receiver can reconstruct $N$ from **any** set of messages whose moduli satisfy

$$
\prod a_i>N,
$$

by the Chinese remainder theorem (the extension from two moduli to many).

The advantage: every receiver listens to the same broadcast, and each one finishes as soon as it has collected enough — no requirement that all receivers obtain the same pieces. This is the core idea of fountain codes: data sprays out continuously and each cup fills when it has enough. Real systems must also handle transmission errors, but the framework is here.

## Zero-knowledge proofs: the card demonstration

Five cards (three red, two black) support a small experiment.

- A red card is placed face up in the middle.
- Each participant decides privately whether they want to watch a certain embarrassing movie. If yes, they place their red card adjacent to the centre card and their black card outside; if no, the order is reversed.
- The cards are stacked and each participant performs a random cut, i.e. a cyclic shift.

The outcome: **both want to watch** if and only if three red cards appear consecutively in the cyclic order. If only one wants to, there is no run of three reds.

An observer therefore learns only whether both agree, not who wanted what: the cuts erase every distinguishable detail. This is the germ of a zero-knowledge proof — proving that a fact is known without revealing the fact itself.

## What this lecture establishes

- $a\equiv b\pmod n\iff n\mid(a-b)\iff$ the remainders on division by $n$ agree.
- Modular arithmetic preserves addition, multiplication, associativity, commutativity and distributivity; cancellation is not always valid.
- $\gcd(a,b)=\gcd(a,b-a)=\gcd(a,b\bmod a)$, which yields Euclid's algorithm.
- The extended algorithm yields Bézout's identity $sa+tb=\gcd(a,b)$, which certifies maximality.
- $a$ is invertible modulo $n$ iff $\gcd(a,n)=1$; the inverse is read off from the extended algorithm.
- Chinese remainder theorem: when $\gcd(a,b)=1$, the residues modulo $a$ and $b$ determine $n\in[0,ab)$ uniquely.
- Construction: $n=kb+t$ with $k\equiv b^{-1}(r-t)\pmod a$.
- Application: fountain codes reconstruct a file from any sufficiently many fragments via CRT.

## Comprehension check

**1. Prove that $a\equiv b\pmod n$ iff the remainders on division by $n$ are equal.**

Reference answer: Write $a=qn+r$ and $b=q'n+r'$ with $0\le r,r'<n$. If $r=r'$, then $a-b=(q-q')n$ is a multiple of $n$, so the numbers are congruent. Conversely, if $n\mid(a-b)$, then $a-b=(q-q')n+(r-r')$ shows $n\mid(r-r')$; since $-n<r-r'<n$, the only multiple of $n$ in that range is $0$, so $r=r'$.

**2. Prove $\gcd(a,b)=\gcd(a,b-a)$ for $b\ge a$, and explain why this is cleaner than comparing sizes.**

Reference answer: If $k$ divides both $a$ and $b$, then $k$ divides $b-a$, so $k$ is a common divisor of $a$ and $b-a$. Conversely, if $k$ divides $a$ and $b-a$, then $k$ divides $(b-a)+a=b$, so $k$ is a common divisor of $a$ and $b$. The two common-divisor sets coincide, hence so do their maxima. Comparing sizes directly would give only a one-sided bound and require a separate argument for the reverse inequality; proving set equality settles both directions at once.

**3. Compute $\gcd(46,360)$ with Euclid's algorithm, find $s,t$ with $46s+360t=2$, and explain why the identity certifies maximality.**

Reference answer: $360=7\cdot46+38$; $46=1\cdot38+8$; $38=4\cdot8+6$; $8=1\cdot6+2$; $6=3\cdot2+0$. The last nonzero remainder is $2$, so the gcd is $2$. Back-substituting: $38=360-7\cdot46$; $8=46-38=8\cdot46-360$; $6=38-4\cdot8=5\cdot360-39\cdot46$; $2=8-6=47\cdot46-6\cdot360$. Thus $s=47$, $t=-6$. If $k$ divides both $46$ and $360$, then from $2=47\cdot46-6\cdot360$ it follows that $k\mid2$, hence $k\le2$: no larger common divisor exists, without comparing against other candidates.

**4. Why does $\gcd(a,n)=1$ make $a$ invertible modulo $n$? How is the inverse computed? Give examples for $4$ and $5$ modulo $7$.**

Reference answer: Bézout gives integers $s,t$ with $as+nt=1$. Reducing modulo $n$ kills $nt$, leaving $as\equiv1$, so $s$ is the inverse. Computationally, run the extended Euclidean algorithm on $a$ and $n$ and read off $s$. Examples: $4\cdot2+7\cdot(-1)=1$, so $4^{-1}\equiv2$; $5\cdot3+7\cdot(-2)=1$, so $5^{-1}\equiv3$.

**5. Prove the Chinese remainder theorem (uniqueness in $[0,ab)$ when $\gcd(a,b)=1$).**

Reference answer: Consider $n\mapsto(n\bmod a,n\bmod b)$. If $x,y\in[0,ab)$ have identical residue pairs, then $a\mid(x-y)$ and $b\mid(x-y)$. Coprimality forces $ab\mid(x-y)$. But $0<|x-y|<ab$ when $x\ne y$, so $ab$ cannot divide the difference — a contradiction. Hence the map is injective. Both sides have $ab$ elements, so injectivity implies bijectivity, giving existence and uniqueness together.

**6. Solve $n\equiv4\pmod5$, $n\equiv1\pmod7$ by the constructive method.**

Reference answer: Take $t=1$ and write $n=7k+1$. Substituting into the first congruence, $7k+1\equiv4\pmod5$, i.e. $2k\equiv3\pmod5$. The inverse of $2$ is $3$ since $2\cdot3=6\equiv1$, so $k\equiv9\equiv4\pmod5$. With $0\le k<5$, $k=4$, hence $n=4\cdot7+1=29$.

**7. Why does the five-card demonstration achieve zero knowledge? What role does the cut play?**

Reference answer: Each participant's arrangement encodes one bit (wants to watch or not), but after stacking and a random cyclic shift the two arrangements are indistinguishable. The only public information is whether three consecutive red cards appear, which happens exactly when both want to watch. The cut applies a random cyclic shift that erases all positional information about who chose what, leaving only a symmetric yes/no answer, so an observer cannot recover either private choice.

## Relation to neighbouring lectures

The previous lecture proved Chernoff bounds; this one turns to number theory, establishing congruences, Euclid's algorithm and the Chinese remainder theorem. The next lecture abstracts these structures into **groups**, covering the definition, subgroups and the order of an element.

The tools are used directly later in cryptography: RSA rests on modular exponentiation and inverses, Diffie–Hellman on the multiplicative group of a finite field, and Reed–Solomon codes on the polynomial form of the Chinese remainder theorem (interpolation).
