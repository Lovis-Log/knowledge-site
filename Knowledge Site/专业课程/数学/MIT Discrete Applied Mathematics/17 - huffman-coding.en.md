---
slug: 17-huffman-coding
title: "Huffman Coding: Exchange Arguments and Optimal Prefix Codes"
summary: "Prefix codes make symbol-by-symbol decoding possible. Three exchange arguments pin down the shape of an optimal tree — the two least likely symbols are siblings — which contracts the problem into a smaller one and yields a greedy algorithm. The Kraft inequality then proves the optimal length lies between entropy and entropy plus one."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [information-theory, huffman-coding, prefix-codes, entropy]
sources:
  - kind: video
    title: "Lecture 17: Huffman Coding"
    url: https://www.youtube.com/watch?v=zZN1A0Ufb8E
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## From a giant table to a tree

Shannon's construction from the previous lecture maps a whole length-$n$ message to one binary string. It is asymptotically optimal but impractical: there are $k^n$ messages, so the codebook grows exponentially, and both encoding and decoding require searching it.

Huffman drops a dimension: **encode one symbol at a time**, using a prefix code, and concatenate the codewords. Decoding walks a binary tree from the root and emits a symbol whenever it hits a leaf. Storage and running time depend only on the alphabet size $k$.

A historical footnote from the lecture: in 1951, MIT graduate student David Huffman developed this algorithm for a term paper, partly to avoid a final exam that Bob Fano had offered him. It is still a cornerstone of coding theory.

Two questions organize the lecture:

1. How do we find the **optimal** prefix code? (A greedy algorithm.)
2. How good is it? ($H\le L\le H+1$.)

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap of Shannon coding: asymptotically optimal but exponentially large codebook |
| 4:01 | Definition of a prefix code: no codeword is a prefix of another |
| 5:28 | Prefix codes as binary trees: leaves are symbols, left 0, right 1 |
| 8:59 | Symbol-by-symbol decoding and why the split is unique |
| 12:44 | The problem: minimize the per-symbol expected length $L=\sum_a p_a\ell_a$ |
| 15:43 | Assume an optimal tree exists and reverse-engineer its structure |
| 17:08 | Lemma 1: the least likely symbol is deepest |
| 24:22 | Lemma 2: the second least likely symbol is also deepest |
| 32:16 | Corollary: the two can be siblings |
| 34:36 | Contract the pair and recurse |
| 37:15 | Key lemma: the contracted tree is optimal for the subproblem |
| 51:07 | Walkthrough on the running example |
| 1:01:07 | The Kraft inequality |
| 1:06:07 | Theorem: $H\le L\le H+1$ |
| 1:13:03 | Encoding pairs of symbols to amortize the $+1$ to $+1/n$ |

## Prefix codes

A **prefix code** is a function $\varphi:A\to\{0,1\}^*$ such that for distinct symbols $a_i\ne a_j$, neither $\varphi(a_i)$ is a prefix of $\varphi(a_j)$ nor the reverse.

This is stronger than requiring distinct codewords. For example $\{0,01\}$ is not a prefix code, since $0$ is a prefix of $01$.

### Tree representation

Lay the codewords out as a binary tree: walk left for 0 and right for 1 from the root, and each symbol corresponds to the path to some node.

The prefix condition is equivalent to: **every symbol sits at a leaf**, with no other symbol below it. If a symbol appeared at an internal node, its codeword would be a prefix of every descendant's codeword.

Conversely, any binary tree whose leaves are labelled with the symbols (some branches may be missing, but every internal node has at most two children) yields a prefix code.

### Why decoding is unique

Given a bit stream, start at the root and descend one bit at a time. On reaching a leaf, emit that symbol and return to the root.

Uniqueness follows from the prefix condition. Suppose two parsings disagree at some position: one reads the next segment as symbol $x$, the other as a codeword $y$ of different length. If $\varphi(y)$ is shorter, it is a proper prefix of $\varphi(x)$; if longer, $\varphi(x)$ is a proper prefix of $\varphi(y)$. Both violate the condition.

This gives **instantaneous decoding**: no separators and no lookahead are needed; a symbol is emitted as soon as a leaf is reached.

## The problem: minimize expected length

Let symbol $a$ have probability $p_a$ and codeword length $\ell_a$. The objective is

$$
L=\sum_{a\in A}p_a\ell_a \quad\longrightarrow\quad \min .
$$

Here $L$ is the average length **per symbol**. If length-$n$ blocks are treated as single symbols over an enlarged alphabet of size $k^n$, the same algorithm applies and the expected length scales by $n$. So solving the one-symbol problem suffices.

Throughout, probabilities are assumed distinct, and merged symbols are assumed not to tie with existing ones. Ties require only "at least tied" wording; the algorithm is unchanged.

## Three structural lemmas

The strategy is not to construct the optimal tree directly but to **assume one exists and derive what it must look like**. The constraints turn out to be strong enough to determine the tree.

Every proof uses the same move: **swap two symbols' positions**. A swap leaves the set of codewords untouched, so prefix-freeness is preserved; only the expected length changes.

### Lemma 1: the least likely symbol is deepest

**Lemma.** If $b$ has the smallest probability, then its codeword is at least tied for longest.

**Proof.** Suppose not. Let $c$ be a deepest symbol with $\ell_b<\ell_c$. Swap the codewords of $b$ and $c$, leaving all others fixed. Only two terms change:

$$
\Delta L=p_b\ell_c+p_c\ell_b-p_b\ell_b-p_c\ell_c=(p_b-p_c)(\ell_c-\ell_b).
$$

By assumption $\ell_c-\ell_b\ge1>0$ and $p_b<p_c$ (with no ties), so $\Delta L<0$.

The swap strictly shortens the code, contradicting optimality. Hence $b$ lies at the deepest level. $\square$

### Lemma 2: the second least likely symbol is also deepest

**Lemma.** If $d$ has the second smallest probability, then $\ell_d$ is also maximal.

**Proof, in two steps.**

First, the parent $P$ of $b$ must have another child. If $P$ had only $b$, detach $b$ and attach it to $P$'s parent. Since $P$ carries no symbol (prefix-freeness), deleting it loses nothing, while $b$'s codeword shortens by one, strictly improving $L$ — a contradiction.

Let $c$ be the symbol at $P$'s other child, so $\ell_c=\ell_b$.

Second, suppose $\ell_d<\ell_b$. Swap the codewords of $d$ and $c$. The same computation gives

$$
\Delta L=(p_d-p_c)(\ell_c-\ell_d).
$$

Here $\ell_c-\ell_d>0$ and $p_d<p_c$ (since $d$ is second smallest and $c$ is not the smallest), so $\Delta L<0$, again contradicting optimality.

Hence $\ell_d=\ell_b$, and both sit at the deepest level. $\square$

### Corollary: they can be made siblings

By the two lemmas, both $b$ and $d$ are deepest. The parent $P$ of $b$ has another child $c$ at the same depth. Swap the positions of $b$ and $c$: depths are equal, so $L$ is unchanged, and now $b$ and $d$ share the parent $P$.

Thus **without loss of generality, the two least likely symbols are siblings** in an optimal tree. This is what makes the contraction below legitimate.

## Contraction and recursion

### Building the subproblem

Delete $b$ and $d$ from the alphabet and add a new symbol $\alpha$ with

$$
p_\alpha=p_b+p_d ,
$$

leaving all other probabilities unchanged. This is still a valid distribution.

Do the same on the tree: remove the leaves $b$ and $d$ and turn their parent into a leaf labelled $\alpha$. The resulting tree $T'$ is a prefix code on the new alphabet $A'$.

### Key lemma: $T'$ is still optimal

**Lemma.** If $T$ is optimal for the original problem, then $T'$ is optimal for the reduced alphabet $A'$.

**Proof.** Suppose some tree $S$ is better, with expected length $L''<L'$.

Expand the leaf holding $\alpha$ in $S$ into a small subtree with $b$ and $d$ as children. This yields a valid prefix code on the original alphabet $A$.

What is its expected length? The contributions of all symbols other than $\alpha$ are unchanged. Wherever $\alpha$ appeared, the code now continues one level deeper to reach $b$ or $d$, so the expected length grows by exactly $p_b+p_d$. The expanded length is therefore

$$
L''+p_b+p_d .
$$

The original tree $T$ is obtained from $T'$ by the same expansion, so

$$
L=L'+p_b+p_d .
$$

Since $L''<L'$, we get $L''+p_b+p_d<L'+p_b+p_d=L$: a tree better than $T$, a contradiction. $\square$

This lemma is the hinge of the algorithm: **the optimum of the original problem can be recovered from the optimum of the subproblem**. So contract repeatedly until two symbols remain; a two-symbol tree has only one shape (a root with two leaves), then expand back level by level.

## Huffman's algorithm

![Figure](/images/huffman-tree-rich-en.svg)

*Figure：The merged tree, the code table, and the average length 2.32。*

**Algorithm.** Maintain a set of symbols with probabilities and a record of merges:

1. Take the two symbols (or merged symbols) of smallest probability.
2. Merge them into a new symbol whose probability is the sum, recording "left child, right child".
3. Put it back and repeat until one symbol remains.
4. Expand the merge record from the root, labelling left branches 0 and right branches 1.

### Running example

Symbols and probabilities: $a=0.40$, $b=0.05$, $c=0.18$, $d=0.07$, $e=0.20$, $f=0.10$.

| Step | Merge | New probability | Remaining symbols |
| --- | --- | --- | --- |
| 1 | $b+d\to\alpha$ | $0.12$ | $a\,.40,\ c\,.18,\ e\,.20,\ f\,.10,\ \alpha\,.12$ |
| 2 | $f+\alpha\to\beta$ | $0.22$ | $a\,.40,\ c\,.18,\ e\,.20,\ \beta\,.22$ |
| 3 | $c+e\to\gamma$ | $0.38$ | $a\,.40,\ \beta\,.22,\ \gamma\,.38$ |
| 4 | $\beta+\gamma\to\delta$ | $0.60$ | $a\,.40,\ \delta\,.60$ |
| 5 | $a+\delta\to\text{root}$ | $1.00$ | done |

Expanding back gives the code:

| Symbol | Probability | Codeword | Length |
| --- | --- | --- | --- |
| $a$ | 0.40 | 0 | 1 |
| $f$ | 0.10 | 100 | 3 |
| $b$ | 0.05 | 1010 | 4 |
| $d$ | 0.07 | 1011 | 4 |
| $c$ | 0.18 | 110 | 3 |
| $e$ | 0.20 | 111 | 3 |

Prefix check: 0 is separated from every codeword starting with 1; $100,1010,1011,110,111$ are pairwise prefix-free (101 is not a codeword, but 1010 and 1011 branch below it, which is allowed).

The expected length is

$$
L=0.40(1)+0.05(4)+0.18(3)+0.07(4)+0.20(3)+0.10(3)=2.32 .
$$

The entropy of the source is

$$
H=-\sum_a p_a\log_2 p_a\approx2.255 .
$$

So $2.255\le2.32\le3.255$, inside the promised interval.

Decoding example: the stream `1010 0 110` walks 1→0→1→0 to a leaf, giving $b$; back at the root, 0 gives $a$; then 110 gives $c$. The message is $bac$. We never stop at 101, because 101 is not a leaf.

## The Kraft inequality

**Theorem (Kraft).** Given positive integers $\ell_1,\dots,\ell_k$, a binary tree with leaves at exactly these depths exists if and only if

$$
\sum_{i=1}^{k}2^{-\ell_i}\le1 .
$$

**Necessity.** A node at depth $\ell$ occupies $2^{-\ell}$ of the total "mass": the root has mass 1, and each level splits its mass equally between two children. Leaves occupy disjoint mass, so the total is at most 1.

**Sufficiency.** Sort the depths increasingly and place leaves at the shallowest available positions; a leaf at depth $\ell_i$ consumes all mass below it. The inequality guarantees that space remains when each leaf is placed. Note: the lecture defers the full construction to recitation; this is only a sketch.

## Performance: $H\le L\le H+1$

### Lower bound

For any prefix code, Kraft's inequality gives $K=\sum_i2^{-\ell_i}\le1$. Set $q_i=2^{-\ell_i}/K$; then $q$ is a probability distribution. Gibbs' inequality (nonnegativity of relative entropy) gives

$$
0\le D(p\parallel q)=\sum_i p_i\log_2\frac{p_i}{q_i}
=\sum_i p_i\log_2\big(p_i\,2^{\ell_i}K\big)
=(L-H)+\log_2K .
$$

The last step uses

$$
\sum_i p_i\log_2\big(p_i2^{\ell_i}\big)
=\sum_ip_i\ell_i+\sum_ip_i\log_2p_i=L-H .
$$

So $L-H\ge-\log_2K$, and since $K\le1$ we have $\log_2K\le0$, hence $L\ge H$: no prefix code can beat entropy, matching Shannon's converse from the previous lecture.

### Upper bound

Propose the codeword lengths

$$
\ell_i=\left\lceil-\log_2 p_i\right\rceil .
$$

First check Kraft. Since $\lceil x\rceil\ge x$, we have $-\lceil-\log p_i\rceil\le\log p_i$, so

$$
\sum_i2^{-\ell_i}=\sum_i2^{-\lceil-\log_2 p_i\rceil}\le\sum_i2^{\log_2 p_i}=\sum_i p_i=1 .
$$

A tree with these depths therefore exists. Its expected length satisfies

$$
\sum_i p_i\ell_i=\sum_i p_i\left\lceil-\log_2 p_i\right\rceil
\le\sum_i p_i\left(-\log_2 p_i+1\right)=H+1 .
$$

Huffman's code is optimal among all prefix codes, so $L_{\text{Huffman}}\le H+1$. Together,

$$
H\ \le\ L_{\text{Huffman}}\ \le\ H+1 .
$$

### Amortizing the $+1$

Encoding one symbol at a time costs at most one extra bit per symbol. Bundle two symbols into one: the alphabet becomes $k^2$ symbols and the source is still first order. Its entropy is

$$
\begin{aligned}
H_2
&=-\sum_{i,j}p_ip_j\log_2(p_ip_j)\\
&=-\sum_{i,j}p_ip_j\log_2p_i-\sum_{i,j}p_ip_j\log_2p_j\\
&=-\sum_ip_i\log_2p_i-\sum_jp_j\log_2p_j=2H .
\end{aligned}
$$

Huffman on pairs gives $2H\le L_2\le2H+1$, i.e. $H\le L_2/2\le H+1/2$ per symbol. For blocks of length $n$: $nH\le L_n\le nH+1$, so the per-symbol gap is at most $1/n$.

This improves Shannon's bound: Shannon's error was $o(n)$ (possibly $n/\log n$ or $\sqrt n$), while blocked Huffman reduces it to the constant 1.

## What this lecture establishes

- A prefix code has no codeword a prefix of another; equivalently, all symbols sit at leaves of a binary tree.
- Symbol-by-symbol coding replaces an exponentially large table with a tree, giving unique and instantaneous decoding.
- Three exchange arguments fix the shape of an optimal tree: least likely and second least likely symbols are deepest, and can be made siblings.
- Contracting that pair into a symbol with summed probability preserves optimality, which justifies greedy merging.
- The Kraft inequality characterizes which length profiles are realizable.
- Huffman satisfies $H\le L\le H+1$; blocking amortizes the $+1$ to $+1/n$.

## Comprehension check

**1. Why is prefix-code decoding unambiguous? Explain by assuming an alternative parsing.**

Reference answer: Suppose two parsings disagree at some position: one reads the next segment as symbol $x$, the other as a codeword $y$ of different length.

- If $\varphi(y)$ is shorter, it is a prefix of $\varphi(x)$, violating prefix-freeness;
- if $\varphi(y)$ is longer, $\varphi(x)$ is a prefix of $\varphi(y)$, also a violation.

So only one parsing is legal at every position. Distinctness of codewords alone would only prevent whole-message collisions; it would not allow splitting a stream on the fly.

**2. Use an exchange argument to show that the least likely symbol must be deepest.**

Reference answer: Let $b$ have the smallest probability and suppose its length $\ell_b$ is not maximal. Pick a deepest symbol $c$, so $\ell_c>\ell_b$. Swapping their codewords preserves prefix-freeness (only which symbol occupies which codeword changes), and the expected length changes by

$$
\Delta L=(p_b\ell_c+p_c\ell_b)-(p_b\ell_b+p_c\ell_c)=(p_b-p_c)(\ell_c-\ell_b).
$$

Since $p_b<p_c$ and $\ell_c-\ell_b\ge1$, $\Delta L<0$, contradicting optimality. Hence $b$ is at the deepest level.

**3. Why must the parent of $b$ have another child, and what role does this play?**

Reference answer: If the parent $P$ had only $b$, then $P$ carries no symbol (otherwise prefix-freeness fails). Detaching $b$ and attaching it to $P$'s parent deletes $P$, keeps a valid prefix code, and shortens $b$'s codeword by one, strictly improving $L$ — a contradiction.

The consequence is that $P$'s other child $c$ has the same depth as $b$. That gives a symbol at $b$'s depth to swap with the second least likely symbol $d$, proving $d$ is also deepest; swapping $b$ into $c$'s position then makes $b$ and $d$ siblings.

**4. Let $T$ be optimal and $T'$ its contraction. Prove $T'$ is optimal for the subproblem, and explain why $L=L'+p_b+p_d$.**

Reference answer: Suppose a better tree $S$ exists for the subproblem, with $L''<L'$. Expand the leaf holding $\alpha$ into a parent with children $b$ and $d$; this is a valid prefix code for the original alphabet.

The contributions of all symbols other than $\alpha$ are unchanged. Where $\alpha$ used to end, the code now descends one more level to reach $b$ or $d$, so the expected length increases by exactly $p_b+p_d$. The expanded length is $L''+p_b+p_d$.

Likewise $T$ comes from expanding $T'$, so $L=L'+p_b+p_d$. Then $L''+p_b+p_d<L'+p_b+p_d=L$, giving a tree better than $T$, contradicting optimality.

The identity means: contraction removes one level's contribution from the subproblem, and expansion adds it back.

**5. Run Huffman's algorithm on $a=.40,b=.05,c=.18,d=.07,e=.20,f=.10$, verify $L=2.32$, and relate it to entropy.**

Reference answer: The merges are $b+d=.12$, then $f+.12=.22$, then $c+e=.38$, then $.22+.38=.60$, then $.40+.60=1$.

Expanding back gives $a=0$, $f=100$, $b=1010$, $d=1011$, $c=110$, $e=111$ with lengths $1,3,4,4,3,3$. Hence

$$
L=.40(1)+.05(4)+.18(3)+.07(4)+.20(3)+.10(3)=2.32 .
$$

The entropy is $H=-\sum p\log_2p\approx2.255$, so $H\le L\le H+1$ holds. The gap is about $0.065$, far below 1, because the probabilities are close to negative powers of two.

**6. Use Kraft to show that $\ell_i=\lceil-\log_2 p_i\rceil$ is always realizable, and derive $L\le H+1$.**

Reference answer: Since $\lceil x\rceil\ge x$, we have $-\lceil-\log_2p_i\rceil\le\log_2p_i$, hence

$$
\sum_i2^{-\ell_i}=\sum_i2^{-\lceil-\log_2p_i\rceil}\le\sum_i2^{\log_2p_i}=\sum_ip_i=1 .
$$

Kraft guarantees the tree. Its expected length is

$$
\sum_ip_i\lceil-\log_2p_i\rceil\le\sum_ip_i(-\log_2p_i+1)=H+1 .
$$

Huffman is optimal among prefix codes, so $L_{\text{Huffman}}\le H+1$.

**7. Why does pairing symbols halve the $+1$ loss? What is the general statement for blocks of $n$?**

Reference answer: After pairing, the alphabet has $k^2$ symbols with probabilities $p_ip_j$, and its entropy is

$$
H_2=-\sum_{i,j}p_ip_j\log_2(p_ip_j)=-\sum_ip_i\log_2p_i-\sum_jp_j\log_2p_j=2H,
$$

using $\sum p=1$ in each sum. Huffman on pairs gives $2H\le L_2\le2H+1$, so per symbol $H\le L_2/2\le H+1/2$.

For blocks of length $n$, entropy is $nH$ and $nH\le L_n\le nH+1$, so the per-symbol error is at most $1/n$, tending to zero. This is how Shannon's $o(n)$ becomes a constant 1.

**8. Huffman's code is already optimal among prefix codes. Why might Shannon's theorem still be needed?**

Reference answer: They answer different questions. Huffman gives an **implementable, optimal** prefix code, but optimality holds only within the class of symbol-by-symbol prefix codes. If arbitrary injective block codes are allowed (no prefix structure), a little more can be saved in principle, and Shannon's theorem describes that larger class with the value $nH\pm o(n)$.

Huffman's $H+1$ bound also requires knowing the distribution and rebuilding the tree when it changes; Shannon's result does not depend on any algorithm and tells us whether further improvement is even possible. They are complementary: Huffman gives constructions, Shannon gives limits.

## Relation to neighbouring lectures

The previous lecture proved entropy is the asymptotic limit for arbitrary block codes but gave an unimplementable construction; this lecture provides an implementable optimal prefix code and tightens the loss from $o(n)$ to the constant 1.

The next lecture turns to noisy channels: transmitted bits may flip, so the goal changes from "shorter" to "more reliable". Shannon's second theorem uses random coding and typicality to show that below channel capacity the error probability can be driven arbitrarily low. The two lectures after that give concrete correction schemes: Hamming codes and Reed–Solomon codes.
