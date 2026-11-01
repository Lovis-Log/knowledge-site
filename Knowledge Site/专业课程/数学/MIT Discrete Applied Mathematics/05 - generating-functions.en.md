---
slug: 05-generating-functions
title: "Generating Functions: From Cayley's Tree Theorem to Mechanical Sums"
summary: "Cayley's theorem — there are n^(n-2) labelled trees on n vertices — is proved by counting the same upgraded objects two ways. We then package a sequence into a formal power series, show that disjoint union adds and Cartesian product multiplies, work through dice and coin-change examples, and use differentiation to evaluate the sum of k times C(n,k)."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [counting, generating-functions, cayley-theorem, combinatorics]
sources:
  - kind: video
    title: "Lecture 5: More Counting and Generating Functions"
    url: https://www.youtube.com/watch?v=HpQUVd1MGso
    author: Peter Shor, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## Two questions, one method

This lecture handles two seemingly unrelated problems:

1. How many **labelled trees** are there on $n$ vertices?
2. How can a whole family of counting problems be turned into mechanical algebra?

The first answer is surprisingly clean: $n^{n-2}$. The proof counts **the same class of objects two ways** — precisely the technique drilled in the previous lecture.

The second topic is **generating functions**. They pack a sequence $a_0,a_1,a_2,\dots$ into a power series, so that "combining structures" becomes "algebra": disjoint union becomes addition, Cartesian product becomes multiplication, and differentiation multiplies the $k$-th term by $k$.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Cayley's tree theorem: counting labelled trees |
| 5:24 | Strategy: count rooted labelled trees, then those with ordered edges |
| 11:10 | Second count: build from a forest, adding one edge at a time |
| 25:52 | Equate the two counts and finish the proof |
| 29:03 | Definition of a generating function; $x$ is only a marker |
| 33:32 | Example one: binomial coefficients and $(1+x)^k$ |
| 36:24 | Example two: a biased coin and $(q+px)^k$ |
| 39:16 | Addition and multiplication of generating functions |
| 41:55 | The sum of a six-sided and an eight-sided die |
| 56:04 | Coin change: six pennies, one nickel, two dimes |
| 1:02:13 | The differentiation trick: computing $\sum k\binom nk$ |

## Cayley's tree theorem

### Statement and small cases

**Theorem (Cayley).** The number of trees on $n$ labelled vertices is $n^{n-2}$.

Small values (labels $1,\dots,n$):

| $n$ | number of trees | $n^{n-2}$ |
| --- | --- | --- |
| $2$ | $1$ | $2^0=1$ |
| $3$ | $3$ | $3^1=3$ |
| $4$ | $16$ | $4^2=16$ |
| $5$ | $125$ | $5^3=125$ |

For $n=4$ a hand check works: the path $1-2-3-4$ has $4!/2=12$ labellings (dividing by $2$ for left-right symmetry), and the star with one centre has $4$ labellings (choose the centre), totalling $16$.

For $n=5$, the lecture sums the cases to $125$, and the pattern becomes visible.

### Strategy: upgrade the objects, then count twice

Counting labelled trees directly is hard. The strategy is to **count an easier-to-construct class first**: rooted labelled trees with an ordering on their edges.

Let $T_n$ be the number of labelled trees on $n$ vertices. Consider objects consisting of

$$
\text{labelled tree} + \text{a chosen root} + \text{an ordering of its } n-1 \text{ edges}.
$$

**First count.** Start from a labelled tree: choose any root ($n$ ways), then order the $n-1$ edges in any way ($(n-1)!$ ways). The total is

$$
T_n\cdot n\cdot (n-1)! .
$$

**Second count.** Build the same objects by construction: start from $n$ isolated vertices (a forest of $n$ one-vertex trees), and repeatedly attach one component to another.

At step $k$ ($k=0,1,\dots,n-2$) there are $n-k$ trees left:

- choose one of the $n$ vertices as the **attachment point**: $n$ ways;
- choose a different tree (not the one containing that vertex): $n-k-1$ ways;
- attach the root of that tree to the attachment point, labelling this the $(k+1)$-st edge.

Each step reduces the number of trees by one; after $n-1$ steps a single tree remains, labelled and rooted, with its edges ordered by insertion. The total is

$$
\prod_{k=0}^{n-2} n\,(n-k-1)
=n^{\,n-1}\cdot (n-1)! ,
$$

since $n$ appears $n-1$ times and $(n-k-1)$ runs from $n-1$ down to $1$.

### Why this is a bijection

The construction is reversible. Given a rooted labelled tree with ordered edges, **look at the edge added last**, cut it, and the two resulting components uniquely recover the previous forest together with all earlier structure. Repeating returns to the $n$ isolated vertices.

Because both directions are unique, the second count enumerates the same class. Hence

$$
T_n\cdot n\cdot (n-1)!=n^{n-1}(n-1)!,
$$

and cancelling $n(n-1)!$ gives

$$
T_n=n^{n-2}. \qquad\square
$$

The elegance lies in **not counting trees directly**, but counting "tree + root + edge order". The extra structure makes construction easy, and it cancels at the end.

The lecture notes that one could instead build a bijection between labelled trees and sequences of length $n-2$ over $\{1,\dots,n\}$ (Prüfer sequences), but that bijection is complicated and unintuitive, so the double-counting route is taken instead.

## Generating functions: turning a sequence into a function

### Definition

Given a sequence $a_0,a_1,a_2,\dots$, its **generating function** is the formal power series

$$
F(x)=\sum_{i=0}^{\infty}a_i x^i .
$$

Here $x$ is not a number and **need not be assigned any value**. Its only job is to record the index: $a_i$ is tied to $x^i$, which keeps the $i$-th and $j$-th terms distinct.

Being formal, the series can be added, multiplied, differentiated and substituted without any convergence worries. Each algebraic operation then corresponds to a combinatorial one — that is the point.

### Example one: binomial coefficients

Take $a_n=\binom kn$ (with $a_n=0$ for $n>k$). Then

$$
F(x)=\sum_{n=0}^{k}\binom kn x^n=(1+x)^k .
$$

This is the binomial theorem. Term by term: view $(1+x)^k$ as $k$ copies of $(1+x)$ multiplied together. To obtain $x^n$ one must take $x$ from exactly $n$ factors and $1$ from the rest — there are $\binom kn$ ways — so the coefficient of $x^n$ is $\binom kn$.

**The generating function encodes a choice problem as an algebraic expansion.**

### Example two: a biased coin

Flip a biased coin $k$ times, heads with probability $p$ and tails with probability $q=1-p$. Let $a_n$ be the probability of exactly $n$ heads:

$$
a_n=\binom kn p^n q^{k-n}.
$$

Its generating function is

$$
A(x)=\sum_{n=0}^{k}\binom kn p^n q^{k-n}x^n=(q+px)^k,
$$

again by the binomial theorem. Here $x$ only marks the number of heads and carries no probabilistic meaning.

## Operations on generating functions

### Disjoint union: add

Let $A,B$ be disjoint classes and $C=A\sqcup B$. Stratified by size, the number of size-$n$ objects in $C$ is

$$
c_n=a_n+b_n,
$$

so

$$
C(x)=\sum_n (a_n+b_n)x^n=A(x)+B(x).
$$

**Combinatorial "or" becomes algebraic addition.**

### Cartesian product: multiply

Let $A,B$ be two classes and let $A\times B$ consist of pairs $(a,b)$ with size defined as the sum of the sizes. Then the number of size-$n$ objects is

$$
c_n=\sum_{k=0}^{n}a_k\,b_{n-k},
$$

counting first components of size $k$ paired with second components of size $n-k$, summed over $k$. This is exactly the coefficient rule for multiplying polynomials, so

$$
C(x)=A(x)\,B(x).
$$

**Combinatorial "choose one, then another, sizes add" becomes algebraic multiplication.**

### Example three: the sum of two dice

A six-sided die ($1$–$6$) has generating function

$$
A(x)=x+x^2+x^3+x^4+x^5+x^6,
$$

and an eight-sided die ($1$–$8$) has

$$
B(x)=x+x^2+\cdots+x^8 .
$$

The distribution of the sum is the product

$$
C(x)=A(x)B(x).
$$

Look at the coefficient of $x^{10}$: it counts ordered pairs with $a+b=10$, $1\le a\le6$, $1\le b\le8$:

$$
(2,8),\ (3,7),\ (4,6),\ (5,5),\ (6,4),
$$

five in total. Expanding the product indeed gives $5x^{10}$.

The pairs are **ordered**: $(6,4)$ and $(4,6)$ count separately because the two dice are distinct.

### Example four: making change

**Finitely many coins.** With $6$ pennies, $1$ nickel and $2$ dimes, in how many ways can $n$ cents be made?

Each coin type contributes a factor:

$$
C(x)=(1+x+x^2+\cdots+x^6)(1+x^5)(1+x^{10}+x^{20}).
$$

The first factor records "use $0$ to $6$ pennies", the second "use $0$ or $1$ nickel", the third "use $0$, $1$ or $2$ dimes". After expansion, the coefficient of $x^n$ is the number of ways to make $n$ cents.

Consider the coefficient of $x^{21}$. Only two combinations work:

$$
6+5+10=21,
\qquad
1+20=21 .
$$

So the answer is $2$ (six pennies, one nickel and one dime; or one penny and two dimes).

**Unlimited coins.** If pennies, nickels and dimes are unlimited, each factor becomes an infinite series:

$$
C(x)=\left(\sum_{i\ge0}x^i\right)\left(\sum_{i\ge0}x^{5i}\right)\left(\sum_{i\ge0}x^{10i}\right)
=\frac{1}{1-x}\cdot\frac{1}{1-x^5}\cdot\frac{1}{1-x^{10}} .
$$

This uses the geometric series

$$
1+x+x^2+\cdots=\frac{1}{1-x}.
$$

So "making change" becomes the problem of extracting coefficients from a rational function.

## Using generating functions to evaluate a sum

### The target

Compute

$$
S=\sum_{k=0}^{n}k\binom nk .
$$

### Step one: write the known generating function

By the binomial theorem,

$$
F(x)=\sum_{k=0}^{n}\binom nk x^k=(1+x)^n .
$$

### Step two: differentiate

Differentiating term by term turns $x^k$ into $kx^{k-1}$:

$$
F'(x)=\sum_{k=0}^{n}k\binom nk x^{k-1}=n(1+x)^{n-1}.
$$

### Step three: substitute $x=1$

The left side becomes $\sum_k k\binom nk$ and the right becomes $n\cdot2^{n-1}$. Hence

$$
\sum_{k=0}^{n}k\binom nk=n\,2^{n-1}.
$$

**The trick:** to multiply the $k$-th term of a generating function by $k$, differentiate, then multiply by $x$ (and if the final substitution is $x=1$, the extra $x$ may be omitted). This operation recurs whenever expectations or recurrences are handled.

### Double-counting check

The same sum can be computed combinatorially: count "choose a $k$-element subset of $n$ elements and mark one special element inside it".

- Choose the special element: $n$ ways.
- Each of the remaining $n-1$ elements independently decides membership: $2^{n-1}$ ways.

The total is $n\,2^{n-1}$.

Both routes agree, but the generating-function route **does not require inventing a clever combinatorial story** — only differentiating and substituting. That is the advantage the lecture stresses: creativity can be traded for algebra.

## What this lecture establishes

- Cayley's theorem: $n$ labelled vertices support $n^{n-2}$ trees.
- The proof counts "rooted labelled trees with ordered edges" two ways: $T_n\cdot n\cdot(n-1)!$ and $n^{n-1}(n-1)!$; equating gives the result.
- A generating function $F(x)=\sum a_i x^i$ encodes a sequence as a formal power series; $x$ is a marker.
- $\sum_n\binom knx^n=(1+x)^k$; a biased coin corresponds to $(q+px)^k$.
- Disjoint union adds generating functions; Cartesian product (sizes adding) multiplies them.
- The sum of two dice is the product of their generating functions; finite coin-change problems give polynomials, unlimited ones give $\frac{1}{(1-x)(1-x^5)(1-x^{10})}$.
- Differentiation multiplies the $k$-th term by $k$, giving $\sum_k k\binom nk=n2^{n-1}$.

## Comprehension check

**1. Check Cayley's formula at $n=5$, and count the labelled path-type and star-type trees at $n=4$.**

Reference answer: The formula gives $5^{5-2}=125$. For $n=4$: the path $1-2-3-4$ has $4!/2=12$ labellings (mirror images are the same tree, hence the division by $2$); the star, with one centre joined to three leaves, has $4$ labellings (choose the centre). Total $12+4=16=4^{4-2}$, matching the formula.

**2. In the second count for Cayley's theorem, why are there $n(n-k-1)$ choices at step $k$?**

Reference answer: At the start of step $k$ the forest has $n-k$ trees. First choose the attachment point among the $n$ labelled vertices: $n$ ways. Then choose a tree to attach: it cannot be the tree containing the attachment point (that would not add an edge), leaving $n-k-1$ choices. Attaching the chosen tree's root to the attachment point determines the step uniquely. Multiplying from $k=0$ to $n-2$ gives $n^{n-1}(n-1)!$.

**3. Why is the "add one edge at a time" construction reversible? Describe the inverse.**

Reference answer: Given the final rooted labelled tree with its edge order, find the **edge added last** and cut it. This splits the tree into two components: the subtree that was attached (its root is the lower endpoint) and the remainder. This uniquely recovers the previous forest and all earlier edges. Iterating returns to $n$ isolated vertices. Since every forward step was determined by "attachment point + chosen tree", the inverse is unique as well, so the map is a bijection.

**4. Write the generating function for the sum of a six-sided and an eight-sided die, and explain why the coefficient of $x^{10}$ is $5$.**

Reference answer:
$$
C(x)=(x+x^2+\cdots+x^6)(x+x^2+\cdots+x^8).
$$
The coefficient of $x^{10}$ counts ordered pairs $(a,b)$ with $a+b=10$, $1\le a\le6$, $1\le b\le8$: $(2,8),(3,7),(4,6),(5,5),(6,4)$, five pairs. On expansion, $x^{10}$ receives exactly one contribution from each feasible pair — first factor $x^a$, second factor $x^{10-a}$ — so the coefficient is $5$.

**5. Use generating functions to prove $\sum_{k=0}^n k\binom nk=n2^{n-1}$, and explain why differentiation multiplies by $k$.**

Reference answer: From $(1+x)^n=\sum_k\binom nk x^k$, differentiate both sides:
$$
n(1+x)^{n-1}=\sum_k k\binom nk x^{k-1}.
$$
At $x=1$ the right side is $\sum_k k\binom nk$ and the left is $n\cdot2^{n-1}$. Differentiation multiplies by $k$ because the derivative of $x^k$ is $kx^{k-1}$, pulling the exponent down as a coefficient; multiplying by $x$ afterwards restores the power $x^k$, which is unnecessary when substituting $x=1$.

**6. With $6$ pennies, $1$ nickel and $2$ dimes, how many ways are there to make $21$ cents? Write the generating function and justify it.**

Reference answer:
$$
C(x)=(1+x+\cdots+x^6)(1+x^5)(1+x^{10}+x^{20}).
$$
The three factors record the choices of $0$–$6$ pennies, $0$–$1$ nickel and $0$–$2$ dimes respectively; the coefficient of $x^n$ after expansion counts the ways to make $n$ cents. For $x^{21}$ the only working combinations are $6+5+10=21$ and $1+20=21$, so the answer is $2$.

## Relation to neighbouring lectures

This lecture closes the counting unit along two lines: **double counting** (Cayley's theorem) and **generating functions** (mechanising counting). Generating functions are still in embryo — only addition, multiplication and differentiation have been used. The next lecture applies them to recurrences, especially Fibonacci numbers; later, the Catalan formula comes out of a quadratic equation, without needing the elegant reflection bijection.

One sentence to keep: **once a counting problem can be written as a combination of structures, it can be written as the algebra of functions — afterwards one computes algebra instead of inventing combinatorics.**
