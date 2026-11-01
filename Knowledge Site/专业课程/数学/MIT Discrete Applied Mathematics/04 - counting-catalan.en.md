---
slug: 04-counting-catalan
title: "Counting: Binomial Coefficients, Bijections and Catalan Numbers"
summary: "Starting from choosing k objects out of n, we divide out the order by k!, prove Pascal's identity by double counting, and extend to multinomial coefficients. Bijections and stars-and-bars count colourings of balls, and a reflection bijection yields the Catalan formula c_n = C(2n,n)/(n+1), together with its link to Dyck paths and binary trees."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [counting, binomial-coefficient, bijection, catalan-number]
sources:
  - kind: video
    title: "Lecture 4: Counting"
    url: https://www.youtube.com/watch?v=H-Ix7gIt9i4
    author: Peter Shor, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## Two routes through counting

This lecture does one thing: **count how many possibilities exist**. There are only two tools.

The first is **direct computation**: break a choice into ordered steps, multiply the numbers of options, then correct for over-counting. Binomial coefficients arise this way.

The second is **bijection**: if a one-to-one correspondence can be built between unfamiliar objects and familiar ones, the counts are equal. The Catalan formula is proved by exactly such a trick — a reflection that is hard to invent from scratch but beautiful once understood.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Binomial coefficients: choose in order, then divide by $k!$ |
| 3:24 | Pascal's identity by double counting |
| 6:26 | Pascal's triangle and the symmetry $\binom nk=\binom n{n-k}$ |
| 9:25 | Multinomial coefficients |
| 14:13 | Bijections: injective, surjective, inverse |
| 20:03 | Colouring $n$ balls with $j$ colours (only the counts matter) |
| 24:15 | Stars and bars, giving $\binom{n+j-1}{j-1}$ |
| 31:01 | Dyck paths and Catalan numbers |
| 38:17 | Plane trees and binary trees are Catalan objects too |
| 45:37 | The Catalan formula $c_n=\frac{1}{n+1}\binom{2n}{n}$ |
| 54:13 | Reflection bijection: bad paths ↔ paths ending at $-2$ |
| 1:00:34 | The bijection between binary trees and Dyck paths |
| 1:14:33 | Stirling's formula and asymptotics |

## Binomial coefficients

### Choose in order, then divide by $k!$

To choose $k$ objects out of $n$, do it one at a time:

$$
n\ \cdot\ (n-1)\ \cdot\ (n-2)\ \cdots\ (n-k+1).
$$

The first choice has $n$ options, the second has $n-1$, and so on, for $k$ factors.

But this product **over-counts**: choosing $\{3,4\}$ and choosing $\{4,3\}$ are recorded as different. Each $k$-element set can be produced in $k!$ orders, so divide by $k!$:

$$
\binom nk=\frac{n(n-1)\cdots(n-k+1)}{k!}=\frac{n!}{k!\,(n-k)!}.
$$

Multiplying numerator and denominator by $(n-k)!$ gives the factorial form on the right.

### Double counting: Pascal's identity

**Claim.** $\binom nk=\binom{n-1}{k-1}+\binom{n-1}{k}$.

**Proof (double counting).** Count the $k$-element subsets of $n$ objects again, but classify differently: fix one object (say the $n$-th) and split according to whether it is chosen.

- **Chosen**: choose the remaining $k-1$ from the other $n-1$, giving $\binom{n-1}{k-1}$ subsets.
- **Not chosen**: choose all $k$ from the other $n-1$, giving $\binom{n-1}{k}$ subsets.

The two classes are disjoint and exhaustive, so their sum counts the same collection whose size is $\binom nk$. Hence the identity. $\square$

No factorials were expanded; the proof only **classifies the same objects two ways and counts each**. That is why double counting is powerful: it replaces algebra with meaning.

### Pascal's triangle and symmetry

Arranging $\binom nk$ by rows gives Pascal's triangle:

$$
\begin{array}{ccccccc}
& & 1 & & & &\\
& 1 & & 1 & & &\\
1 & & 2 & & 1 & &\\
1 & & 3 & & 3 & & 1\\
1 & & 4 & & 6 & & 4 & & 1
\end{array}
$$

Each entry is the sum of the two above it — exactly Pascal's identity. The symmetry of each row gives

$$
\binom nk=\binom n{n-k},
$$

which is also immediate from $\frac{n!}{k!(n-k)!}$, unchanged when $k$ becomes $n-k$. Combinatorially: choosing $k$ is the same as deciding which $n-k$ to leave out.

### Multinomial coefficients

Split $n$ objects into three labelled groups of sizes $a,b,c$ with $a+b+c=n$; order inside a group is irrelevant. The number of ways is

$$
\binom{n}{a,b,c}=\frac{n!}{a!\,b!\,c!}.
$$

**Proof.** Choose the first group: $\binom na$. Then choose the second from the remaining $n-a$: $\binom{n-a}{b}$. Whatever remains forms the third. Multiplying,

$$
\binom na\binom{n-a}{b}
=\frac{n!}{a!\,(n-a)!}\cdot\frac{(n-a)!}{b!\,(n-a-b)!}
=\frac{n!}{a!\,b!\,c!},
$$

since $n-a-b=c$. $\square$

The "choose one group, then the next" structure extends to any number of groups:

$$
\binom{n}{a_1,\dots,a_k}=\frac{n!}{a_1!\,a_2!\cdots a_k!},
\qquad
a_1+\cdots+a_k=n .
$$

One can also double-count by asking which group the last object fell into, recovering the same type of recurrence as Pascal's identity.

## Bijections: replacing one count by another

### Definitions

Let $f:A\to B$.

- **Injective**: $a_1\ne a_2\Rightarrow f(a_1)\ne f(a_2)$; distinct objects never collide.
- **Surjective**: for every $b\in B$ there is $a\in A$ with $f(a)=b$; every element of $B$ is hit.
- **Bijective**: both injective and surjective.

Equivalently, $f$ is a bijection exactly when there is an inverse $g:B\to A$ with

$$
g(f(a))=a\quad\text{for all }a\in A,
\qquad
f(g(b))=b\quad\text{for all }b\in B .
$$

**Having an inverse forces bijectivity.** Injectivity: if $f(a_1)=f(a_2)$, apply $g$:

$$
a_1=g(f(a_1))=g(f(a_2))=a_2 .
$$

Surjectivity: for any $b\in B$, take $a=g(b)$; then

$$
f(a)=f(g(b))=b .
$$

So every $b$ has a preimage. $\square$

### Why bijections count

If a bijection $f:A\to B$ exists, then $|A|=|B|$. To count $A$, it suffices to build a bijection onto a set $B$ whose size is known. **The difficulty is never verifying the bijection; it is thinking of where to map.**

## Stars and bars: colouring balls

### The question

There are $n$ balls and $j$ colours. Only the number of balls of each colour matters, not which ball got which colour. How many colourings are there?

### Example: $n=4$, $j=3$

Classify by the count vector (red, blue, green):

- $(4,0,0)$: $3$ ways (choose the colour used for all four).
- $(3,1,0)$: $3\times2=6$ ways (choose the colour used three times, then the colour used once).
- $(2,2,0)$: $3$ ways (choose the unused colour).
- $(2,1,1)$: $3$ ways (choose the colour used twice).

Total:

$$
3+6+3+3=15=\binom62 .
$$

Note $\binom62=15$, not $\binom52=10$ — the lecture corrects this slip mid-stream.

### The bijection: stars and bars

Draw each ball as a star and separate colours with bars: $j$ colours need $j-1$ bars.

For $(2,1,1)$:

$$
\star\star\mid\star\mid\star
$$

Read off: everything before the first bar is red, between the bars is blue, after the last bar is green. A colour with zero balls corresponds to adjacent bars or a bar at an end, e.g.

$$
\mid\star\star\star\star\mid
$$

means red $0$, blue $4$, green $0$.

**This is a bijection.** Forward: given a colouring, order the balls by colour and insert the bars. Backward: given an arrangement of stars and bars, read the colour counts off the bar positions. Both directions are unique, so the number of colourings is

$$
\text{choose } j-1 \text{ positions for bars among } n+(j-1)
=\binom{n+j-1}{j-1}.
$$

For $n=4$, $j=3$: $\binom{6}{2}=15$, matching the enumeration.

Equivalently, this counts non-negative integer solutions of $x_1+\cdots+x_j=n$, where $x_i$ is the number of balls of colour $i$.

## Dyck paths and Catalan numbers

### Definition

A **Dyck path** runs from $(0,0)$ to $(2n,0)$ using steps $(1,+1)$ and $(1,-1)$, and **never goes below the horizontal axis**.

Start and end force exactly $n$ up-steps and $n$ down-steps. The first step must go up and the last must go down.

The number of Dyck paths of length $2n$ is $c_n$, the $n$-th **Catalan number**.

Small values:

- $c_1=1$: only "up, down".
- $c_2=2$: "up, down, up, down" and "up, up, down, down".
- $c_3=5$.

The sequence begins

$$
1,\ 1,\ 2,\ 5,\ 14,\ 42,\ 132,\dots
$$

(with $c_0=1$ for the empty path). The lecture notes that Richard Stanley compiled roughly two hundred objects counted by Catalan numbers — they appear all over mathematics.

### Two more Catalan families

- **Plane trees** (rooted, left and right children distinguished): $n$ edges give $c_n$ trees. For $n=3$ there are $5$, and mirror images count as different trees.
- **Full binary trees** (every internal node has exactly two children): $n$ internal nodes give $c_n$ trees.

A basic fact about trees: **a full binary tree always has one more leaf than internal node**. Induction: a single internal node with two leaves satisfies it; replacing a leaf by "one internal node plus two leaves" increases both counts by one, so the difference is preserved. Equivalently, every tree has one more vertex than edge.

## The Catalan formula

**Theorem.** $c_n=\dfrac{1}{n+1}\dbinom{2n}{n}$.

Check $n=2$:

$$
c_2=\frac13\binom42=\frac13\cdot6=2,
$$

matching the enumeration.

### Proof: count the bad paths

All paths from $(0,0)$ to $(2n,0)$ using up/down steps number

$$
\binom{2n}{n},
$$

since one chooses which $n$ of the $2n$ steps go up. Dyck paths are those that never dip below the axis, so

$$
c_n=\binom{2n}{n}-\#\{\text{bad paths}\}.
$$

### The reflection bijection

A bad path must first reach height $-1$ at some point. **Reflect the entire portion of the path after that point across the line $y=-1$.** The new path:

- starts at $(0,0)$ and ends at $(2n,-2)$ instead of $(2n,0)$;
- still uses steps $(1,\pm1)$;
- necessarily lies below the axis, hence is not a Dyck path.

Conversely, given any path from $(0,0)$ to $(2n,-2)$, it must first hit $-1$ somewhere; reflecting the part after that point back across $y=-1$ uniquely recovers a bad path.

The two directions are mutually inverse, so this is a **bijection**. Hence

$$
\#\{\text{bad paths}\}=\#\{\text{paths from }(0,0)\text{ to }(2n,-2)\}.
$$

The latter has two more down-steps than up-steps. With $u$ up and $d$ down,

$$
u+d=2n,\qquad u-d=-2
\;\Longrightarrow\;
u=n-1,\quad d=n+1,
$$

so

$$
\#\{\text{bad paths}\}=\binom{2n}{n-1}.
$$

### Simplifying

$$
\begin{aligned}
c_n
&=\binom{2n}{n}-\binom{2n}{n-1}\\
&=\frac{(2n)!}{n!\,n!}-\frac{(2n)!}{(n-1)!\,(n+1)!}\\
&=\frac{(2n)!}{n!\,n!}\left(1-\frac{n}{n+1}\right)\\
&=\frac{1}{n+1}\binom{2n}{n}.
\end{aligned}
$$

The middle step uses $\binom{2n}{n-1}=\binom{2n}{n}\cdot\frac{n}{n+1}$. $\square$

The lecture admits that the reflection idea is hard to invent from nothing. Generating functions, a few weeks later, produce the same formula mechanically — longer, but less mysterious.

## Binary trees ↔ Dyck paths

### Tree to path

Traverse a full binary tree around its outside (preorder), recording each vertex the first time it is visited. Mark **internal nodes as $+1$ and leaves as $-1$**, then read the sequence as up/down steps.

- A full binary tree with $n$ internal nodes has $n+1$ leaves, so the traversal has $2n+1$ entries;
- the first and last are leaves ($-1$);
- because leaves outnumber internal nodes by one, the running height never drops below $0$.

Dropping the final step yields a Dyck path of length $2n$.

### Path to tree

Conversely, read the path left to right: an up-step creates an internal node with two fresh leaves; a down-step closes the current branch. When the path ends with $n$ internal nodes, a full binary tree has been built.

The operations are mutually inverse, so **full binary trees and Dyck paths correspond one-to-one** and are both counted by Catalan numbers.

The value of this bijection is not just "another Catalan family": it links a **recursive structure** (tree) to a **linear sequence** (path). That link is exactly what turns recursion into algebra when generating functions arrive.

## Stirling's formula and asymptotics

**Stirling's formula.**

$$
n!\approx\sqrt{2\pi n}\left(\frac ne\right)^{n}.
$$

Apply it to the central binomial coefficient by substituting $2n$ and $n$:

$$
\binom{2n}{n}=\frac{(2n)!}{(n!)^2}
\approx\frac{\sqrt{4\pi n}\,(2n/e)^{2n}}{2\pi n\,(n/e)^{2n}}
=\frac{4^n}{\sqrt{\pi n}} .
$$

Therefore

$$
c_n=\frac{1}{n+1}\binom{2n}{n}
\approx\frac{4^n}{\sqrt{\pi}\,n^{3/2}} .
$$

So $c_n$ grows exponentially at rate $4^n$, damped by $n^{3/2}$. The lecture does not prove Stirling's formula, only notes that everything except the constant $\sqrt\pi$ follows from elementary calculus or probability; that constant is the genuinely hard part.

## What this lecture establishes

- $\binom nk=\frac{n!}{k!(n-k)!}$: choose in order, then divide by $k!$.
- Pascal's identity $\binom nk=\binom{n-1}{k-1}+\binom{n-1}{k}$ follows by classifying subsets according to a fixed element.
- $\binom nk=\binom n{n-k}$ by symmetry.
- Multinomial coefficients $\binom{n}{a_1,\dots,a_k}=\frac{n!}{a_1!\cdots a_k!}$ come from choosing groups successively.
- A bijection $f:A\to B$ gives $|A|=|B|$; equivalently it has an inverse.
- Stars and bars: colouring $n$ balls with $j$ colours gives $\binom{n+j-1}{j-1}$ schemes.
- Catalan numbers $c_n=1,2,5,14,42,\dots$ count Dyck paths, plane trees and full binary trees.
- Catalan formula $c_n=\frac{1}{n+1}\binom{2n}{n}$, proved by reflecting bad paths to paths ending at $-2$.
- Asymptotics: $\binom{2n}{n}\approx\frac{4^n}{\sqrt{\pi n}}$, $c_n\approx\frac{4^n}{\sqrt\pi\,n^{3/2}}$.

## Comprehension check

**1. Why divide by $k!$ when choosing $k$ of $n$, and is the correction needed when $k=1$?**

Reference answer: The product $n(n-1)\cdots(n-k+1)$ treats the $k!$ orders in which the same set can be picked as different outcomes. For instance, choosing $k=3$ from $\{1,2,3,4,5\}$ counts the set $\{1,2,3\}$ six times, once for each ordering $123,132,213,231,312,321$. Dividing by $k!$ collapses them. When $k=1$, $1!=1$ and there is nothing to correct, since a single element has no ordering.

**2. Prove Pascal's identity by double counting, and explain why the two classes are disjoint and exhaustive.**

Reference answer: Count the $k$-element subsets of $n$ objects, $\binom nk$. Fix the $n$-th object and split:
- containing it: choose the other $k-1$ from $n-1$, giving $\binom{n-1}{k-1}$;
- not containing it: choose all $k$ from $n-1$, giving $\binom{n-1}{k}$.
Every $k$-subset either contains the fixed object or does not; the cases cannot both hold (disjoint) and there is no third option (exhaustive). Hence
$$
\binom nk=\binom{n-1}{k-1}+\binom{n-1}{k}.
$$

**3. Using stars and bars, how many ways are there to colour $5$ balls with $3$ colours, if only the counts per colour matter?**

Reference answer: There are $j-1=2$ bars and $n+j-1=5+2=7$ positions in total, so the number is
$$
\binom{7}{2}=21 .
$$
Equivalently, it counts non-negative integer solutions of $x_1+x_2+x_3=5$, which is $\binom{5+3-1}{3-1}=21$. Enumerating the partitions of $5$ into three non-negative parts confirms $21$.

**4. Compute $c_3$ and describe what the reflection bijection maps to what.**

Reference answer: $\binom63=20$ total paths and $\binom62=15$ bad paths, so $c_3=20-15=5$. The bijection maps "paths from $(0,0)$ to $(6,0)$ that dip below the axis" to "all paths from $(0,0)$ to $(6,-2)$": find the first point where the path reaches height $-1$ and reflect everything after it across $y=-1$. The inverse takes a path ending at $(6,-2)$, finds its first hit of $-1$, and reflects back. Since the maps are mutually inverse, the number of bad paths equals the number of paths to $(6,-2)$, which require $2$ up-steps and $4$ down-steps, namely $\binom62$.

**5. Why does a full binary tree always have one more leaf than internal node, and where is that used in the tree-to-path bijection?**

Reference answer: Induct on internal nodes. For $n=1$ the tree is a root with two leaves: $2$ leaves, $1$ internal node, difference $1$. In the induction step, replace any leaf by one internal node with two leaves: internal nodes increase by $1$ and leaves go from $1$ to $2$, also increasing by $1$, so the difference is preserved. Hence "leaves − internal nodes = 1" always. In the bijection this guarantees that the traversal sequence has $2n+1$ entries and that every prefix has at least as many $+1$s as $-1$s (each leaf's $-1$ is backed by an earlier internal node's $+1$), so dropping the final step gives a genuine Dyck path.

**6. Use Stirling's formula to estimate $\binom{20}{10}$ and compare with the exact value.**

Reference answer: From $\binom{2n}{n}\approx4^n/\sqrt{\pi n}$ with $n=10$,
$$
\binom{20}{10}\approx\frac{4^{10}}{\sqrt{10\pi}}=\frac{1\,048\,576}{\sqrt{31.416}}\approx\frac{1\,048\,576}{5.605}\approx187\,100 .
$$
The exact value is $184\,756$, a relative error of about $1.3\%$. The approximation is already accurate at moderate $n$ and reveals the exponential base $4$ together with the polynomial factor $n^{-1/2}$.

## Relation to neighbouring lectures

This lecture builds two languages of counting: **direct algebraic computation** and **bijective translation of meaning**. Binomial and multinomial coefficients recur in probability and coding theory; stars and bars is exactly the count of non-negative integer solutions; Catalan numbers return with generating functions, where $c_n=\frac{1}{n+1}\binom{2n}{n}$ falls out of a quadratic equation for $C(x)$.

One sentence to keep: **when the count is out of reach, look for something to correspond it with one-to-one; once found, counting becomes two ways of saying the same thing.**
