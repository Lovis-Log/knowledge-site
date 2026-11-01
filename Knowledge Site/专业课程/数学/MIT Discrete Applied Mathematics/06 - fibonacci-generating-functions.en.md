---
slug: 06-fibonacci-generating-functions
title: "Generating functions, Fibonacci numbers and Pascal's triangle"
summary: "Three operations — disjoint union, size-additive product, and sequences — translate combinatorial structures into generating functions. From dot-and-dash messages we get the Fibonacci recurrence, solve it by partial fractions to obtain Binet's formula and an information rate, then verify the same identity along Pascal's diagonals and by double counting."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [combinatorics, generating-functions, fibonacci, recurrences]
sources:
  - kind: video
    title: "Lecture 6: More on Generating Functions"
    url: https://www.youtube.com/watch?v=XfRe9i3FR1U
    author: "Peter Shor, MIT OpenCourseWare"
    publishedAt: 2025-12-18
---

## What this lecture is for

The previous lecture counted Catalan numbers with generating functions. This one turns the method into a **translation machine**: on one side sit combinatorial objects, on the other formal power series. Union, size-additive concatenation and sequences become addition, multiplication and $1/(1-A)$.

With the machine in hand we attack a classical question: how many dot-and-dash messages of length $n$ are there? The answer is a Fibonacci number. Then we push one step further — **how large is the $n$-th Fibonacci number?** The generating function yields a closed formula, and the formula yields an information rate.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: generating functions, disjoint union, product |
| 3:39 | New operation: finite sequences, $S(x)=1/(1-A(x))$ |
| 4:36 | Binary strings as an example |
| 9:03 | Dot-and-dash messages and Fibonacci numbers |
| 15:43 | Solving $F(x)-xF(x)-x^2F(x)=1$ |
| 18:48 | Partial fractions and $\phi_\pm$ |
| 33:02 | Binet's formula |
| 35:03 | Growth rate and information rate $\log_2\phi$ |
| 40:49 | A tiling problem using the sequence formula |
| 51:52 | Pascal's triangle, two-variable generating functions, diagonals |
| 1:09:41 | Double counting proves the diagonal identity |

## Three operations

Let $a_n$ count the objects of size $n$ and let

$$
A(x)=\sum_{n\ge 0}a_nx^n .
$$

### Disjoint union: add

If $C$ is the disjoint union of $A$ and $B$, then $c_n=a_n+b_n$ and

$$
C(x)=A(x)+B(x).
$$

### Product: multiply

If an object of $C$ is a pair consisting of one $A$-object and one $B$-object whose **sizes add**, then

$$
c_n=\sum_{i=0}^{n}a_i\,b_{n-i},
\qquad
C(x)=A(x)B(x).
$$

Size additivity is what makes the convolution index $i+(n-i)=n$ line up.

### Sequences: invert

Suppose every object in $A$ has size at least $1$. Finite sequences of $A$-objects, including the empty one, have generating function

$$
S(x)=1+A(x)+A(x)^2+A(x)^3+\cdots=\frac{1}{1-A(x)} .
$$

The leading $1$ is the empty sequence; $A(x)^k$ counts sequences of exactly $k$ objects. **Why exclude size $0$?** Because a size-zero object could be inserted any number of times without changing the size, so every size would have infinitely many sequences and the coefficients would be meaningless.

For example, with $A=\{0,1\}$ we have $A(x)=2x$ (two strings of length one), so binary strings have generating function

$$
S(x)=\frac{1}{1-2x}=1+2x+4x^2+8x^3+\cdots,
$$

whose coefficient $2^n$ is the number of binary strings of length $n$.

## Dot-and-dash messages: Fibonacci appears

Send messages over a telegraph channel using a dot (one time unit) and a dash (two time units). How many messages last exactly $n$ units?

Enumerating:

- $n=1$: only a dot, $f_1=1$.
- $n=2$: dot-dot or dash, $f_2=2$.
- $n=3$: dot-dot-dot, dot-dash, dash-dot, $f_3=3$.
- $n=4$: five messages; $n=5$: eight.

These are the Fibonacci numbers, and the reason is a single observation: **look at the final symbol**.

$$
f_n=f_{n-1}+f_{n-2}.
$$

If the message ends in a dot, the first $n-1$ units form any message; if it ends in a dash, the first $n-2$ units do.

The course uses the convention

$$
f_0=1,\quad f_1=1,\quad f_2=2,\quad f_3=3,\quad f_4=5,\dots
$$

Here $f_0=1$ is the empty message — sending nothing is one way to send — and this choice keeps later formulas clean. It is shifted by one from the Wikipedia convention $F_0=0,F_1=1$: here $f_n=F_{n+1}$.

## Solving the recurrence with generating functions

### Setting up the equation

Let $F(x)=\sum_{n\ge0}f_nx^n$. Multiply the recurrence by $x^n$ and sum over $n\ge2$:

$$
\sum_{n\ge2}f_nx^n=\sum_{n\ge2}f_{n-1}x^n+\sum_{n\ge2}f_{n-2}x^n .
$$

The left side is $F(x)-f_0-f_1x=F(x)-1-x$. The first term on the right is $x\big(F(x)-f_0\big)=x(F(x)-1)$, the second is $x^2F(x)$. Hence

$$
F-1-x=x(F-1)+x^2F,
$$

so

$$
F(x)\,(1-x-x^2)=1,
\qquad
F(x)=\frac{1}{1-x-x^2}.
$$

### Partial fractions

Factor the denominator by writing

$$
1-x-x^2=(1-\phi_+x)(1-\phi_-x).
$$

Comparing coefficients gives $\phi_++\phi_-=1$ and $\phi_+\phi_-=-1$, so

$$
\phi_+=\frac{1+\sqrt5}{2},\qquad
\phi_-=\frac{1-\sqrt5}{2}.
$$

Now set

$$
\frac{1}{1-x-x^2}=\frac{A}{1-\phi_+x}+\frac{B}{1-\phi_-x}.
$$

The numerator after clearing denominators is $A(1-\phi_-x)+B(1-\phi_+x)$, which must equal $1$ identically. Comparing the constant and linear terms:

$$
A+B=1,\qquad A\phi_-+B\phi_+=0 .
$$

Substituting $B=1-A$ into the second equation,

$$
A\phi_-+(1-A)\phi_+=0
\iff
A(\phi_--\phi_+)=-\phi_+
\iff
A=\frac{\phi_+}{\phi_+-\phi_-}=\frac{\phi_+}{\sqrt5}.
$$

Likewise

$$
B=\frac{-\phi_-}{\sqrt5}.
$$

The lecture states the sign of $B$ incorrectly on the board; testing $n=0$ shows the negative sign is required.

### Binet's formula

Using

$$
\frac{1}{1-\phi x}=\sum_{n\ge0}\phi^nx^n,
$$

we get

$$
F(x)=\frac{1}{\sqrt5}\sum_{n\ge0}\left(\phi_+^{n+1}-\phi_-^{n+1}\right)x^n,
$$

that is,

$$
f_n=\frac{\phi_+^{n+1}-\phi_-^{n+1}}{\sqrt5}.
$$

Check $n=0$: $(\phi_+-\phi_-)/\sqrt5=1$. Check $n=1$: using $\phi_\pm^2=\phi_\pm+1$, the numerator is $\phi_+-\phi_-=\sqrt5$, so $f_1=1$.

### Growth rate and information rate

Since $|\phi_-|<1$, the second term decays exponentially and can be ignored:

$$
f_n\approx\frac{\phi_+^{\,n+1}}{\sqrt5}.
$$

With $\phi_+=(1+\sqrt5)/2\approx1.618$, the number of messages of length $n$ grows like $\phi_+^n$. Hence the information carried per unit time is

$$
\frac{\log_2 f_n}{n}\to\log_2\phi_+\approx0.694\ \text{bits per time unit}.
$$

The constant factor $1/\sqrt5$ and the shift $n+1$ affect only lower-order terms. This is the seed of the later information-theory unit: **channel capacity is governed by the logarithm of the growth rate**.

## A tiling problem: the sequence formula at work

Tile a $2\times n$ strip with two shapes of tiles that may be reflected. Following the lecture, first count **indecomposable** pieces $a_n$: tilings that cannot be split by a vertical line into two separately tileable strips.

Checking small cases gives

$$
a_3=2,\qquad a_5=2,\qquad a_7=2,\qquad a_{2k}=0,
$$

so indecomposable pieces occur only at odd lengths $3,5,7,\dots$, with exactly two at each length (mirror images). Therefore

$$
A(x)=2x^3+2x^5+2x^7+\cdots=\frac{2x^3}{1-x^2}.
$$

Every tiling is a sequence of indecomposable pieces, so

$$
B(x)=\frac{1}{1-A(x)}
=\frac{1}{1-\dfrac{2x^3}{1-x^2}}
=\frac{1-x^2}{1-x^2-2x^3}.
$$

Expanding:

$$
B(x)=1+2x^3+2x^5+4x^6+2x^7+8x^8+\cdots
$$

A strip of length $6$, for instance, is two length-$3$ pieces side by side, with $2\times2=4$ choices.

### Reading the recurrence off the generating function

The denominator $1-x^2-2x^3$ encodes the recurrence; the numerator encodes initial conditions. Comparing coefficients in $B(x)(1-x^2-2x^3)=1-x^2$ gives

$$
b_n-b_{n-2}-2b_{n-3}=
\begin{cases}
1,&n=0,\\
-1,&n=2,\\
0,&\text{otherwise}.
\end{cases}
$$

After the initial terms,

$$
b_n=b_{n-2}+2b_{n-3}.
$$

This also explains the curious value $b_2=0$. Applied at $n=2$, the recurrence would give $b_2=b_0+2b_{-1}=1$, but the numerator contributes a $-1$ at $x^2$ that corrects it. Combinatorially, the empty tiling cannot be extended to length $2$ by adding an indecomposable piece, since the shortest such piece has length $3$.

The recurrence is also visible directly: any nonempty tiling either ends with a vertical piece of length $2$ ($b_{n-2}$ ways) or with a length-$3$ indecomposable piece in one of its two orientations ($2b_{n-3}$ ways).

## Pascal's triangle and Fibonacci numbers

Consider the two-variable generating function

$$
P(x,y)=\sum_{a,b\ge0}\binom{a+b}{a}x^ay^b .
$$

Sum first along a row: for fixed $n=a+b$,

$$
\sum_{a=0}^{n}\binom{n}{a}x^ay^{n-a}=(x+y)^n .
$$

Summing over rows,

$$
P(x,y)=\sum_{n\ge0}(x+y)^n=\frac{1}{1-x-y}.
$$

### Diagonals

Shallow diagonal sums give Fibonacci numbers:

$$
1+1=2,\qquad 1+3+1=5,\qquad 1+6+5+1=13,\dots
$$

The reason: substitute $x=z^2,\ y=z$. Then $x^ay^b=z^{2a+b}$, so

$$
P(z^2,z)=\frac{1}{1-z-z^2}=F(z).
$$

In words, **restricting the Pascal generating function to this parabola produces the Fibonacci generating function**; the coefficient of $z^n$ is $f_n$. Expanding yields

$$
f_n=\sum_{k\ge0}\binom{n-k}{k}.
$$

Check $n=5$: $\binom50+\binom41+\binom32=1+4+3=8=f_5$.

## A double-counting proof

The same identity can be proved without generating functions.

A dot-and-dash message of length $n$ is one of $f_n$ objects. Count them by the **number of dashes** $k$. Each dash occupies two time units, so with $k$ dashes the remaining $n-2k$ units are dots, and the number of symbols is

$$
k+(n-2k)=n-k .
$$

Choose the $k$ positions of the dashes among $n-k$ slots; the rest are dots. This gives $\binom{n-k}{k}$ messages, and summing over $k$:

$$
f_n=\sum_{k=0}^{\lfloor n/2\rfloor}\binom{n-k}{k}.
$$

Two independent routes meet at the same identity — a typical sanity check in combinatorics.

## What this lecture establishes

- Three operations: disjoint union $\to$ add; size-additive product $\to$ multiply; sequences $\to 1/(1-A(x))$, with no size-zero objects.
- Dot-and-dash counts satisfy $f_n=f_{n-1}+f_{n-2}$ with $f_0=1$, and $F(x)=1/(1-x-x^2)$.
- Partial fractions give Binet: $f_n=(\phi_+^{n+1}-\phi_-^{n+1})/\sqrt5$.
- The growth rate is $\phi_+$, giving $\log_2\phi_+\approx0.694$ bits per time unit.
- The tiling generating function is $(1-x^2)/(1-x^2-2x^3)$, i.e. $b_n=b_{n-2}+2b_{n-3}$.
- Pascal's triangle has generating function $1/(1-x-y)$; setting $x=z^2,y=z$ gives Fibonacci.
- The identity $f_n=\sum_k\binom{n-k}{k}$ has both a generating-function proof and a double-counting proof.

## Comprehension check

**1. Why is the generating function for finite sequences $1/(1-A(x))$? Why must $A$ contain no object of size zero?**

Reference answer: A sequence $(\alpha_1,\dots,\alpha_k)$ has size equal to the sum of its parts. If all objects have size at least $1$, a sequence of size $n$ has length at most $n$, and the coefficient of $x^n$ in $A(x)^k$ counts the ways to choose $k$ objects whose sizes sum to $n$. Summing over $k$ gives $\sum_{k\ge0}A(x)^k=1/(1-A(x))$. If a size-zero object existed, it could be inserted arbitrarily often without changing the size, so every size would have infinitely many sequences and the coefficients would diverge.

**2. Why does the lecture take $f_0=1$? What happens with the convention $F_0=0,F_1=1$?**

Reference answer: $f_0=1$ counts the empty message — sending nothing is one way to send — and it makes the recurrence hold from $n=2$ with the clean equation $F(x)(1-x-x^2)=1$. With $F_0=0,F_1=1$ we have $F_n=f_{n-1}$, so the generating function becomes $xF(x)=x/(1-x-x^2)$: same denominator, numerator multiplied by $x$.

**3. Solve for $A$ and $B$ in the partial fractions, and explain why $B$ carries a negative sign.**

Reference answer: From $A+B=1$ and $A\phi_-+B\phi_+=0$, eliminate $B$:

$$
A\phi_-+(1-A)\phi_+=0\Longrightarrow A(\phi_--\phi_+)=-\phi_+
\Longrightarrow A=\frac{\phi_+}{\sqrt5}.
$$

Then $B=1-A=(\sqrt5-\phi_+)/\sqrt5$, and since $\sqrt5=\phi_+-\phi_-$, $B=-\phi_-/\sqrt5$. The sign must be negative: $\phi_-<0$, and with a plus sign $A+B=(\phi_++\phi_-)/\sqrt5=1/\sqrt5\ne1$, contradicting $f_0=1$.

**4. Why is the growth rate $\phi_+$ rather than $\phi_-$? What does it say about bits per time unit?**

Reference answer: $f_n=(\phi_+^{n+1}-\phi_-^{n+1})/\sqrt5$ and $|\phi_-|\approx0.618<1$, so $\phi_-^{n+1}\to0$ and the dominant term is $\phi_+^{n+1}/\sqrt5$. The number of messages of length $n$ is about $\phi_+^n$; the logarithm of the number of distinguishable messages is the information carried, so per unit time it is $\log_2 f_n/n\to\log_2\phi_+\approx0.694$ bits. The $\phi_-$ term only corrects lower-order behaviour.

**5. Prove $f_n=\sum_k\binom{n-k}{k}$ by counting the same set two ways.**

Reference answer: On one hand, the number of dot-and-dash messages of length $n$ is $f_n$ by definition. On the other hand, classify by the number of dashes $k$: the dashes occupy $2k$ units, the remaining $n-2k$ units are dots, so there are $n-k$ symbols; choosing which $k$ of them are dashes gives $\binom{n-k}{k}$ messages. Summing over $0\le k\le\lfloor n/2\rfloor$ counts the same set, so the two expressions are equal.

**6. Read off the recurrence and initial values from $B(x)=(1-x^2)/(1-x^2-2x^3)$, and explain why $b_2=0$ while $b_0=1$.**

Reference answer: Comparing coefficients in $B(x)(1-x^2-2x^3)=1-x^2$ gives $b_n-b_{n-2}-2b_{n-3}=0$ for $n\ne0,2$, i.e. $b_n=b_{n-2}+2b_{n-3}$; at $n=0$, $b_0=1$; at $n=2$, $b_2-b_0=-1$, so $b_2=0$. Combinatorially $b_0=1$ is the empty tiling, while a strip of length $2$ cannot be tiled by pieces of length at least $3$, hence $b_2=0$; the numerator term $-x^2$ records exactly this correction.

## Relation to neighbouring lectures

The previous lecture obtained $C(x)=1+xC(x)^2$ twice for Catalan numbers, once by decomposing full binary trees and once by decomposing Dyck paths. This lecture pushes the same language to linear recurrences, extracting closed formulas and growth rates.

The next lecture applies generating functions to Catalan numbers: solving the recurrence gives $C(x)=(1-\sqrt{1-4x})/(2x)$, and the binomial theorem turns it into $C_n=\frac{1}{n+1}\binom{2n}{n}$. After that the course turns to probability, where generating functions reappear as moment-generating functions.
