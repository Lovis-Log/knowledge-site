---
slug: 01-pigeonhole-principle
title: "The Pigeonhole Principle: Pigeons, Holes, and the Craft of Proof"
summary: "Starting from a sock-drawer problem, we state and prove the pigeonhole principle, then use it on degree collisions at a party, equal-sum subsets among twenty four-digit numbers, the Erdős–Szekeres subsequence theorem and inbreeding in family trees, ending with the basic formalism of probability."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [discrete-mathematics, pigeonhole-principle, proof, probability]
sources:
  - kind: video
    title: "Lecture 1: Pigeonhole Principle"
    url: https://www.youtube.com/watch?v=Z1zgrgstVAw
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## A problem everyone faces each morning

Your drawer holds socks in five colours. It is still dark, and you want a matching pair. **How many socks must you pull out to guarantee a pair, no matter how unlucky you are?**

The answer is $6$. The worst case is five socks, one of each colour; whatever the sixth is, it matches one already in your hand.

The reasoning works because there are only $5$ colours and you took $6$ socks. The course names this after pigeons and holes: put $n$ pigeons into $m$ holes; if $n>m$, some hole contains at least two pigeons.

The principle sounds trivially obvious, yet its power comes from **seeing the problem from a different angle**. The difficulty is never the principle — it is deciding what counts as a pigeon and what counts as a hole. The lecture trains exactly that skill with five examples of increasing difficulty.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Course overview: 18.200 and its goal of writing proofs people can follow |
| 1:58 | Requirements of the communication-intensive subject (CIM) |
| 4:47 | The pigeonhole principle: the sock problem |
| 6:56 | General statement: $n$ pigeons, $m$ holes |
| 9:39 | Proof by contradiction, as a model of proof writing |
| 12:31 | Application 1: two people at a party know equally many others (graph model) |
| 21:01 | Application 2: twenty four-digit numbers contain two disjoint nonempty equal-sum subsets |
| 36:50 | Application 3: the Erdős–Szekeres increasing/decreasing subsequence theorem |
| 55:11 | A playful application: every family tree contains a close-relative marriage |
| 1:02:21 | The basic formalism of probability: sample space, events, complements |

## Where this course is going

The aim is not only to teach mathematics but to teach **how to write a proof clearly**. The course compares a good proof to good code: modular, with the complicated part extracted into a lemma, and with the overall blueprint visible before the details.

This lecture demonstrates three habits while proving things:

1. Announce the method up front (for instance "we argue by contradiction"), so the reader is never lost until the final line.
2. Choose notation with meaning ($I$ in $I_s$ stands for increasing).
3. Distinguish steps that are mathematically necessary from steps that merely help the reader understand.

## The precise statement

**Pigeonhole principle (basic form).** Let $n$ pigeons be placed in $m$ holes. If $n>m$, then some hole contains at least two pigeons.

**Pigeonhole principle (quantitative form).** If $n$ pigeons are placed in $m$ holes, then some hole contains at least $\lceil n/m\rceil$ pigeons.

### Proof of the quantitative form

Suppose the claim fails: every hole contains at most $\lceil n/m\rceil-1$ pigeons. Let $N_h$ be the number in hole $h$. Since $\lceil n/m\rceil-1<n/m$,

$$
N_h\le \left\lceil \frac{n}{m}\right\rceil-1<\frac{n}{m}
$$

for every $h$. Summing over all holes,

$$
n=\sum_{h=1}^{m}N_h<\sum_{h=1}^{m}\frac{n}{m}=n .
$$

This gives $n<n$, a contradiction. Hence some hole holds at least $\lceil n/m\rceil$ pigeons. $\square$

Only one idea is at work: **count the same pigeons two ways** — once hole by hole, once by knowing the total is $n$. This double-counting pattern returns throughout the course.

The lecture treats the write-up itself as teaching material: state the method first, then name the contradiction explicitly at the end. None of this affects correctness, but all of it affects whether a reader can follow.

## Application 1: two people who know equally many others

**Claim.** At a party with $n\ge 2$ people (yourself included), there are always two people who know the same number of other people.

This looks nothing like a pigeonhole problem. Translating it into graph theory fixes that.

### Model: people are vertices, acquaintance is an edge

Draw each person as a vertex, and connect two vertices when those people know each other. The result is a simple graph with $n$ vertices.

The **degree** of a vertex is the number of edges meeting it — here, the number of people that person knows. The claim becomes: **every simple graph with $n\ge2$ vertices has two vertices of equal degree.**

### First attempt: why it falls just short

Use vertices as pigeons and degrees as holes. Each degree lies in $\{0,1,\dots,n-1\}$, giving $n$ possible values, while there are $n$ vertices. Pigeons and holes are equal in number, and the principle requires strictly more pigeons than holes.

### The key observation: degrees $0$ and $n-1$ cannot coexist

- If someone knows everybody else, that person has degree $n-1$; then nobody knows no one, so degree $0$ does not occur.
- If nobody has degree $n-1$, all degrees lie in $\{0,1,\dots,n-2\}$, only $n-1$ possible values.

Now split into cases.

**Case 1: a vertex of degree $n-1$ exists.** Then degree $0$ is absent, leaving $n-1$ holes. With $n$ pigeons and $n-1$ holes, two vertices share a degree by the pigeonhole principle.

**Case 2: no vertex of degree $n-1$ exists.** All degrees lie in $\{0,\dots,n-2\}$, again $n-1$ holes, and the same conclusion follows.

The two cases exhaust all possibilities, so the claim holds. $\square$

The lesson: pigeons and holes do not come for free. One must first find the right abstraction (a graph), then correct the count of holes. The lecture deliberately keeps the failed first attempt, because real proofs are found this way.

## Application 2: equal-sum subsets among twenty four-digit numbers

**Claim.** Given any $20$ strictly positive four-digit integers $x_1,\dots,x_{20}$, there exist two **disjoint nonempty** subsets with equal sums.

Three sentences to state, yet the proof needs care. First translate the English into mathematics: find $I,J\subseteq\{1,\dots,20\}$ with

$$
I\ne\varnothing,\qquad J\ne\varnothing,\qquad I\cap J=\varnothing,\qquad \sum_{i\in I}x_i=\sum_{j\in J}x_j .
$$

### Choosing pigeons and holes

- **Pigeons**: nonempty subsets. There are $2^{20}-1$ of them.
- **Holes**: possible sums. The largest possible sum is less than $20\times 10^4=2\times 10^5$, and every sum is a nonnegative integer, so there are fewer than $2\times10^5$ holes.

Why $2^{20}-1$? Each element has two fates — chosen or not — corresponding to a $20$-bit string. There are $2^{20}$ strings; discard the empty subset and $2^{20}-1$ remain. This "subset ↔ bit string" correspondence is the simplest **bijection**, to be developed formally when counting begins.

Numerically, $2^{20}-1=1\,048\,575>200\,000$. Pigeons greatly outnumber holes, so two distinct nonempty subsets $A\ne B$ have equal sums.

### The catch: $A$ and $B$ may intersect

The principle only guarantees "two different subsets with the same sum"; it says nothing about disjointness. If both $A$ and $B$ contain $x_1$, the conclusion is not yet what was promised.

Fix it by **removing the common part from both**: set

$$
I=A\setminus B,\qquad J=B\setminus A .
$$

These are disjoint by construction. Because

$$
\sum_{i\in A}x_i=\sum_{j\in B}x_j,
$$

subtracting the shared contribution $\sum_{k\in A\cap B}x_k$ from both sides gives

$$
\sum_{i\in I}x_i=\sum_{j\in J}x_j .
$$

So $I$ and $J$ still have equal sums.

### Why $I$ and $J$ are nonempty

Suppose $I=\varnothing$. Then $A\subseteq B$ and

$$
0=\sum_{i\in I}x_i=\sum_{j\in J}x_j .
$$

A sum of positive numbers is zero only when nothing is summed, so $J=\varnothing$. Then $A\subseteq B$ and $B\subseteq A$, hence $A=B$, contradicting $A\ne B$. Therefore $I\ne\varnothing$; the same argument gives $J\ne\varnothing$. $\square$

### Existence is not construction

The result has a striking feature: it guarantees that equal-sum subsets exist without saying how to find them. Searching $2^{20}$ subsets for a colliding pair is exponential. The lecture notes that subsets of countries with literally equal populations exist in real data, yet **no fast algorithm is known**; the problem is connected to cryptography.

In the language of the lecture: **proving that something exists is far easier than constructing it.**

## Application 3: every permutation has a long monotone subsequence

**Theorem (Erdős–Szekeres).** In any permutation of $nm+1$ distinct real numbers, there is either an increasing subsequence of length $n+1$ or a decreasing subsequence of length $m+1$.

Definitions first:

- A **permutation** is an arrangement of $1,2,\dots,nm+1$ in any order.
- A **subsequence** selects terms in their original relative order; the chosen positions need not be adjacent.

Take $n=m=3$ and the permutation

$$
3,\ 2,\ 1,\ 6,\ 5,\ 4,\ 9,\ 8,\ 7,\ 10 .
$$

The increasing subsequence $3,6,9,10$ has length $4=n+1$, exactly what the theorem promises. The example is also **tight**: the longest decreasing subsequence has length only $3$ (for instance $3,2,1$), short of $m+1=4$.

### Proof: two labels per position

This is the delicate construction of the lecture. For the $s$-th position of the sequence define

- $I_s$: the length of the longest increasing subsequence ending at position $s$;
- $D_s$: the length of the longest decreasing subsequence ending at position $s$.

The phrase "ending at position $s$" matters: it assigns each position a unique pair $(I_s,D_s)$ of progress markers.

**Lemma.** If $s\ne t$, then $(I_s,D_s)\ne(I_t,D_t)$.

**Proof.** Assume without loss of generality that $s>t$. Write $a_s$ and $a_t$ for the corresponding terms. Since all terms are distinct, exactly one of two cases holds.

- If $a_s>a_t$: take the increasing subsequence of length $I_t$ ending at $t$ and append $a_s$. Because $s>t$ (so $a_s$ comes later) and $a_s>a_t$, the result is still increasing, of length $I_t+1$. Hence $I_s\ge I_t+1>I_t$.
- If $a_s<a_t$: similarly, take the decreasing subsequence of length $D_t$ ending at $t$ and append $a_s$, obtaining a decreasing subsequence of length $D_t+1$. Hence $D_s\ge D_t+1>D_t$.

In either case the two ordered pairs differ in at least one coordinate, so $(I_s,D_s)\ne(I_t,D_t)$. $\square$

### Finish: count the holes

Argue by contradiction. Suppose the theorem is false: there is no increasing subsequence of length $n+1$ and no decreasing subsequence of length $m+1$. Then for every position $s$,

$$
1\le I_s\le n,\qquad 1\le D_s\le m .
$$

The pair $(I_s,D_s)$ therefore takes at most $n\cdot m$ values — those are the $nm$ holes. But the sequence has $nm+1$ positions, that is, $nm+1$ pigeons. By the pigeonhole principle, two distinct positions $s\ne t$ land in the same hole:

$$
(I_s,D_s)=(I_t,D_t),
$$

contradicting the lemma. Hence the theorem holds. $\square$

### Where the construction comes from

The lecture admits that inventing this definition on the spot in an exam would be extraordinary. Its origin is **dynamic programming**: to learn the length of the longest increasing subsequence ending here, combine answers to earlier subproblems. Once the ending element is fixed, two pieces of information — length, and whether the run is increasing — suffice to decide whether the next term can extend it.

This explains the elegance: the proof compresses "the length of a subsequence", which seems to require remembering the whole sequence, into a single pair of numbers.

## A playful application: every family tree contains a close-relative marriage

**Claim.** Every person's ancestry contains someone whose parents are blood relatives.

The proof uses four biological assumptions that are hard to dispute:

1. Every person has two biological parents.
2. Nobody has children after age $100$.
3. The human species is at least $4{,}000$ years old.
4. At most $10^{12}$ humans have ever lived.

### Model: ancestor slots are vertices

Trace upward from yourself: two parents, four grandparents, eight great-grandparents, and so on. Generation $k$ has $2^k$ slots. A slot is a **role**, not a person — "mother's father" and "father's mother" are different slots that may happen to be filled by the same individual.

By assumptions 2 and 3, the ancestry extends back at least

$$
\frac{4000}{100}=40
$$

generations. Hence there are at least

$$
2^{40}=1\,099\,511\,627\,776>10^{12}
$$

ancestor slots. But at most $10^{12}$ humans have ever lived. Slots outnumber people by roughly ten percent, so by the pigeonhole principle **at least two distinct ancestor slots are occupied by the same person**.

One person appearing in two distinct slots means the ancestry tree "merges": two different upward paths meet at the same individual. That means the two lines of descent from that person eventually came together, so some ancestor had parents who were blood relatives. $\square$

Strictly speaking, the last step needs a small argument: if two paths merge at someone, two distinct descendants of that person later produced a child together, making their shared ancestry the source of consanguinity. The lecture gives this as the intuitive conclusion; the point is to display the power of translating biological facts into counting.

## The formalism of probability: groundwork for the next lectures

The lecture closes with the basic framework, preparing for conditional probability.

### Sample space

The **sample space** $\Omega$ is the set of all possible outcomes. Rolling an ordinary die gives $\Omega=\{1,2,3,4,5,6\}$.

The sample space may be infinite. For "flip a coin until the first head appears", the number of flips can be any positive integer, so $\Omega=\{1,2,3,\dots\}$.

### Probability

Assign a real number $p(x)$ to each outcome $x\in\Omega$, subject to two axioms:

$$
p(x)\ge 0\quad\text{for all }x\in\Omega,
\qquad
\sum_{x\in\Omega}p(x)=1 .
$$

A fair die takes $p(x)=1/6$. Infinite sample spaces satisfy the axioms too: for example

$$
p(k)=2^{-k}\quad(k=1,2,3,\dots),
\qquad
\sum_{k=1}^{\infty}2^{-k}=1,
$$

which is exactly the distribution of "the first head appears on flip $k$".

### Events and complements

An **event** is a subset $E\subseteq\Omega$, with probability equal to the sum of the probabilities of its outcomes:

$$
P(E)=\sum_{x\in E}p(x).
$$

Rolling an even number corresponds to $E=\{2,4,6\}$, with probability $1/2$.

The **complement** $\overline{E}$ (also written $\neg E$) consists of everything in $\Omega$ outside $E$. Since $E$ and $\overline{E}$ are disjoint and together cover $\Omega$,

$$
P(E)+P(\overline{E})=\sum_{x\in\Omega}p(x)=1,
$$

so

$$
P(\overline{E})=1-P(E).
$$

This simple identity will be used constantly: **when the event itself is hard to count, count its complement**.

## What this lecture establishes

- Pigeonhole principle: $n$ pigeons in $m$ holes with $n>m$ force a repeat; the quantitative form gives $\lceil n/m\rceil$.
- The proof is double counting: summing by hole must agree with the known total.
- The work is always in choosing pigeons and holes:
  - Party problem: vertices are pigeons, degrees are holes, and "$0$ and $n-1$ are exclusive" removes one hole.
  - Subset sums: nonempty subsets are pigeons, attainable sums are holes; intersections are deleted.
  - Longest subsequences: positions are pigeons, pairs $(I_s,D_s)$ are holes.
  - Family trees: ancestor slots are pigeons, the historical population is the hole.
- An existence proof is not a construction: equal-sum subsets exist, but finding them quickly is hard.
- Probability rests on three objects: a sample space, the probability axioms, and events with complements.

## Comprehension check

**1. With socks in 5 colours, why do 6 socks guarantee a pair? How many are needed to guarantee three socks of one colour?**

Reference answer: In the worst case the first 5 socks are one of each colour, so the 6th must match one of them — a direct application with $n=6>m=5$. For three of one colour use the quantitative form: we need $\lceil n/5\rceil\ge3$, i.e. $n/5>2$, so the least integer is $n=11$. Check: two socks of each colour give $10$ socks with no colour reaching three; the 11th forces some colour to three.

**2. Prove the quantitative pigeonhole principle: $n$ pigeons in $m$ holes force some hole to hold at least $\lceil n/m\rceil$ pigeons.**

Reference answer: Suppose every hole holds at most $\lceil n/m\rceil-1$. Since $\lceil n/m\rceil-1<n/m$, every hole holds strictly fewer than $n/m$ pigeons. With $N_h$ pigeons in hole $h$,
$$
n=\sum_{h=1}^{m}N_h<\sum_{h=1}^{m}\frac{n}{m}=n,
$$
so $n<n$, a contradiction. (The step uses integrality: $N_h\le\lceil n/m\rceil-1$ is the integer version of $N_h<n/m$.)

**3. In the party problem, why can we not simply use the $n$ possible degrees $0,\dots,n-1$ as holes?**

Reference answer: Because there are also $n$ pigeons, and the principle needs strictly more pigeons than holes; $n>n$ fails. The number of holes must be reduced to $n-1$. The key observation is that degrees $0$ and $n-1$ cannot both occur: if someone knows everybody (degree $n-1$), nobody knows no one (degree $0$). Case 1: a vertex of degree $n-1$ exists, so degrees range over $1,\dots,n-1$ — only $n-1$ values. Case 2: no vertex of degree $n-1$, so degrees range over $0,\dots,n-2$ — again $n-1$ values. Either way, $n$ pigeons enter $n-1$ holes.

**4. Why may the two equal-sum subsets $A,B$ produced by the pigeonhole principle intersect, and why does deleting the intersection preserve both disjointness and nonemptiness?**

Reference answer: The principle only guarantees two distinct nonempty subsets with the same sum; it imposes no disjointness. Set $I=A\setminus B$ and $J=B\setminus A$. Since the two sums are equal, subtracting the shared amount $\sum_{k\in A\cap B}x_k$ from both leaves them equal, and $I\cap J=\varnothing$ by construction. For nonemptiness: if $I=\varnothing$ then $A\subseteq B$ and $\sum_{j\in J}x_j=0$; a sum of positive terms is zero only if $J=\varnothing$, giving $A=B$ and contradicting $A\ne B$. Hence $I\ne\varnothing$, and symmetrically $J\ne\varnothing$.

**5. In the Erdős–Szekeres proof, why must the pair $(I_s,D_s)$ be used? Would $I_s$ alone not suffice?**

Reference answer: No. Two positions with equal $I_s$ can coexist perfectly legally — they merely have equally long increasing subsequences ending there, which is no contradiction. What is needed is a label rich enough that any two distinct positions must differ in at least one coordinate. The lemma proves exactly that: for $s>t$, if $a_s>a_t$ then $I_s>I_t$, and if $a_s<a_t$ then $D_s>D_t$; either way the pairs differ. Then $nm+1$ positions must occupy $nm+1$ distinct pairs, whereas if the theorem failed we would have $I_s\le n$ and $D_s\le m$, only $nm$ pairs. The second coordinate supplies the missing "decreasing" half of the information.

**6. In the family-tree argument, what exactly does $2^{40}>10^{12}$ establish, and how does it imply that someone's parents were blood relatives?**

Reference answer: $2^{40}$ counts ancestor **slots** forty generations back — each slot is a role such as "mother's father's mother". At most $10^{12}$ humans have ever lived, and slots outnumber people, so by the pigeonhole principle one real person occupies two distinct slots. A person appearing on two different upward paths means the paths merge: two distinct descendant lines from that person later produced a child together, so some ancestor had parents who were related by blood. Note that the principle directly yields "someone repeats in the ancestor tree"; the final step to "the parents were blood relatives" uses the tree structure and is an intuitive inference beyond pure counting.

## Relation to neighbouring lectures

This lecture supplies the course's first tool and sets the tone for proof writing: announce the method, choose meaningful notation, and design the reader's path through the argument.

The next two lectures turn to probability — first conditional probability and independence, then inclusion–exclusion for counting when at least one event occurs. Counting and probability recur everywhere afterwards: generating functions, tail bounds, coding theory and linear programming all return to the same act of counting how many possibilities exist.
