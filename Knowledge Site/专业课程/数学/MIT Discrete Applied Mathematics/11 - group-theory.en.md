---
slug: 11-group-theory
title: "Groups, Lagrange's Theorem and Fermat's Little Theorem"
summary: "We abstract the invertible elements of modular arithmetic into groups, cut a group into equal-sized cosets to prove that a subgroup's order divides the group's order, and use that to derive Fermat's little theorem and Euler's theorem."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [abstract-algebra, group-theory, modular-arithmetic, fermat-theorem]
sources:
  - kind: video
    title: "Lecture 11: Basic Group Theory"
    url: https://www.youtube.com/watch?v=hUtdHAeyY6Y
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## From "does an inverse exist?" to an abstract structure

The previous lecture asked: given $a$ and $n$, is there a $b$ with $ab\equiv1\pmod n$? The answer is decided by the greatest common divisor: such a $b$ exists exactly when $\gcd(a,n)=1$, and it can be found with the extended Euclidean algorithm.

This lecture looks at the same fact from a different angle: **promote invertibility into a whole algebraic structure**. Once the language of groups is in place, several theorems that look unrelated — Lagrange's theorem, Fermat's little theorem, Euler's theorem — become different spellings of one proof.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: modular arithmetic and multiplicative inverses |
| 2:09 | Definition of a group: closure, associativity, identity, inverse |
| 6:19 | Examples: $\mathbb Z$ under addition, $\mathbb Z$ under multiplication (not a group), $\mathbb Q\setminus\{0\}$ |
| 9:21 | Finite groups: $\mathbb Z_n$ under addition |
| 10:28 | $\mathbb Z_n\setminus\{0\}$ is a group under multiplication iff $n$ is prime |
| 15:08 | The hidden group $\mathbb Z_n^*$: elements coprime to $n$ |
| 17:09 | Order of a group; $|\mathbb Z_p\setminus\{0\}|=p-1$, $|\mathbb Z_{pq}^*|=(p-1)(q-1)$ |
| 22:15 | Definition of a subgroup |
| 25:34 | Statement of Lagrange's theorem and an example |
| 30:41 | Proof via left cosets |
| 47:02 | Fermat's little theorem and its group-theoretic proof |
| 56:20 | A combinatorial proof of Fermat's little theorem (necklaces) |
| 1:03:31 | Euler's theorem |
| 1:09:49 | Fields and the bound on the number of roots (groundwork for later cryptography) |

## Definition of a group

A **group** is a set $G$ with a binary operation $*$ satisfying four axioms:

1. **Closure**: $a,b\in G\Rightarrow a*b\in G$.
2. **Associativity**: $(a*b)*c=a*(b*c)$ for all $a,b,c\in G$.
3. **Identity**: there is $e\in G$ with $e*a=a*e=a$ for all $a$.
4. **Inverse**: for every $a\in G$ there is $a^{-1}\in G$ with $a^{-1}*a=a*a^{-1}=e$.

If in addition $a*b=b*a$ for all $a,b$, the group is **abelian** (commutative).

The axioms do not state that the identity or the inverse is unique — both follow from the axioms, and proving that is one of the first exercises in group theory.

## Examples and non-examples

| Set and operation | A group? | Why |
| --- | --- | --- |
| $\mathbb Z$ under addition | Yes | Identity $0$, inverse $-a$, commutative |
| $\mathbb Z$ under multiplication | No | $2$ has inverse $1/2\notin\mathbb Z$; $0$ has none |
| $\mathbb Q\setminus\{0\}$ under multiplication | Yes | Inverse is the reciprocal, identity $1$ |
| $\mathbb Z_n$ under modular addition | Yes | Identity $0$, inverse $n-a$ |
| $\mathbb Z_n\setminus\{0\}$ under modular multiplication | Only when $n$ is prime | See below |

### Why $\mathbb Z_n\setminus\{0\}$ is a group exactly when $n$ is prime

**If $n$ is prime, it is a group.** Closure follows from the definition of modular multiplication: a product of two residues, reduced again, is a residue. Associativity is inherited from integer multiplication. The identity is $1$. The only nontrivial axiom is the inverse: by the lemma from last lecture, $a$ has an inverse whenever $\gcd(a,n)=1$. For prime $n$ and $a\in\{1,\dots,n-1\}$ we have $\gcd(a,n)=1$, so every nonzero element is invertible.

**If $n$ is composite, it is not a group.** Write $n=pq$ with $p,q>1$. Then $p\in\mathbb Z_n\setminus\{0\}$ and $\gcd(p,n)=p\ne1$. By the contrapositive of the same lemma, $p$ has no multiplicative inverse, so the inverse axiom fails.

The lesson: **being a group depends not only on the set but on the operation attached to it.**

### The group hiding inside

When $n$ is composite, $\mathbb Z_n\setminus\{0\}$ is not a group, but a subset of it is:

$$
\mathbb Z_n^*=\{a\in\mathbb Z_n:\gcd(a,n)=1\}.
$$

It is closed under multiplication (a product of two numbers coprime to $n$ is coprime to $n$), has identity $1$, and every element is invertible by the lemma; the inverse is also coprime to $n$. So $\mathbb Z_n^*$ is a group. It will reappear when we discuss RSA.

## Order, and two counts

The **order** of a finite group $G$, written $|G|$, is its number of elements.

- $|\mathbb Z_p\setminus\{0\}|=p-1$ for prime $p$.
- $|\mathbb Z_{pq}^*|=(p-1)(q-1)$ for distinct primes $p,q$.

The second count is inclusion–exclusion. Start with the $pq-1$ numbers $1,\dots,pq-1$ and remove those not coprime to $pq$, i.e. multiples of $p$ or of $q$. The multiples of $q$ are $q,2q,\dots,(p-1)q$, giving $p-1$ of them; the multiples of $p$ are $p,2p,\dots,(q-1)p$, giving $q-1$. There is no overlap, because $pq$ is out of range. Hence

$$
|\mathbb Z_{pq}^*|=(pq-1)-(p-1)-(q-1)=pq-p-q+1=(p-1)(q-1).
$$

This number is Euler's totient $\varphi(pq)$.

## Subgroups

Let $H\subseteq G$. If $H$ is itself a group under the same operation, it is a **subgroup** of $G$.

The key is a *stronger* closure: for $a,b\in H$ we need $a*b\in H$, not merely $a*b\in G$ (the latter is automatic). Likewise $a^{-1}$ must lie in $H$. Inside $H$ you never have to step outside $H$ to multiply or invert.

**Example.** Let $G=\mathbb Z_7\setminus\{0\}$, so $|G|=6$, and take $H=\{1,2,4\}$. Check: $1\cdot2=2$, $1\cdot4=4$, $2\cdot4=8\equiv1$, all in $H$; and $2^{-1}=4$, $4^{-1}=2$, $1^{-1}=1$.

A cleaner way to see it: $H$ is exactly the set of powers of $2$ modulo $7$:

$$
2^0=1,\qquad 2^1=2,\qquad 2^2=4,\qquad 2^3=8\equiv1.
$$

Multiplying powers adds exponents, so closure is automatic; $2^3=1$ supplies the inverses ($2^1\cdot2^2=1$). This is the standard way to build a subgroup: **take all powers of one element**.

## Lagrange's theorem

**Theorem.** If $G$ is a finite group and $H\le G$ is a subgroup, then $|H|$ divides $|G|$.

Its power is out of proportion to its hypotheses: from four axioms it constrains which subgroup sizes can exist at all. If $|G|=6$, a subgroup can only have order $1,2,3$ or $6$; orders $4$ or $5$ are impossible.

### Left cosets

For $x\in G$, define

$$
xH=\{xh:h\in H\}.
$$

This is $H$ translated by $x$, called a **left coset**. If $x\in H$ then $xH=H$; otherwise it is a shifted copy of $H$.

### The two-step proof

**Plan.** Write $G$ as a disjoint union of left cosets,

$$
G=x_1H\;\dot\cup\;x_2H\;\dot\cup\cdots\dot\cup\;x_kH ,
$$

with every coset the same size as $H$. Then $|G|=k|H|$, which gives divisibility.

The cosets are produced greedily: pick any uncovered element as $x_1$ and remove $x_1H$; pick any still-uncovered element as $x_2$ and remove $x_2H$; continue.

**Step 1: every coset has the same size as $H$.** Consider $h\mapsto xh$. It is injective: if $xh_1=xh_2$, left-multiply by $x^{-1}$ and use associativity,

$$
x^{-1}(xh_1)=x^{-1}(xh_2)
\;\Longrightarrow\;
(x^{-1}x)h_1=(x^{-1}x)h_2
\;\Longrightarrow\;
eh_1=eh_2
\;\Longrightarrow\;
h_1=h_2 .
$$

It is surjective by definition of $xH$. Hence $|xH|=|H|$. This argument uses the inverse, associativity and the identity — all of the group axioms appear here.

**Step 2: distinct cosets are disjoint.** Suppose $x_iH$ and $x_jH$ share an element, so

$$
x_ih_1=x_jh_2
$$

for some $h_1,h_2\in H$. Right-multiply by $h_2^{-1}$:

$$
x_j=x_ih_1h_2^{-1}.
$$

Since $H$ is a subgroup, $h_2^{-1}\in H$ and, by closure, $h_1h_2^{-1}\in H$. Therefore $x_j\in x_iH$.

But $x_j$ was chosen as an element *not yet covered*, while $x_iH$ had already been removed and covers $x_j$ — a contradiction. So distinct cosets cannot intersect.

Together: $G$ is partitioned into $k$ disjoint blocks of size $|H|$, so $|G|=k|H|$ and $|H|\mid|G|$.

## Fermat's little theorem

**Theorem.** If $p$ is prime and $p\nmid a$, then

$$
a^{p-1}\equiv1\pmod p .
$$

**Corollary.** $a^{p-2}$ is the multiplicative inverse of $a$ mod $p$, since $a^{p-2}\cdot a=a^{p-1}\equiv1$. This gives a second way to invert, by exponentiation instead of the extended Euclidean algorithm.

### Proof

Let $k$ be the smallest positive integer with $a^k\equiv1\pmod p$.

**$k$ exists.** Consider the residues of $a^1,a^2,a^3,\dots$ modulo $p$. There are only $p$ possible residues but infinitely many powers, so by the pigeonhole principle there are $i<j$ with

$$
a^i\equiv a^j\pmod p .
$$

Because $p$ is prime and $p\nmid a$, $a$ is invertible; multiply by $a^{-i}$:

$$
a^{j-i}\equiv1\pmod p .
$$

So $k=j-i$ works. The invertibility of $a$ — which comes from $p$ being prime — is what makes this step valid.

**The powers form a subgroup.** Let $H=\{a^0,a^1,\dots,a^{k-1}\}$. It is closed under multiplication (add exponents, reduce modulo $k$), contains the identity $a^0=1$, and the inverse of $a^m$ is $a^{k-m}$. Hence $H$ is a subgroup with $|H|=k$, since minimality of $k$ makes $a^0,\dots,a^{k-1}$ distinct.

**Finish with Lagrange.** $H\le\mathbb Z_p\setminus\{0\}$ and $|\mathbb Z_p\setminus\{0\}|=p-1$, so $k\mid p-1$. Write $p-1=ck$. Then

$$
a^{p-1}=a^{ck}=(a^k)^c\equiv1^c\equiv1\pmod p .
$$

Only two ingredients are used: invertibility of $a$ (so $k$ exists) and Lagrange's theorem (so $k\mid p-1$).

### A second proof: counting necklaces

Fermat's little theorem is equivalent to $p\mid a^p-a$ (multiply both sides by $a$). Take $a=2$, $p=5$.

String $5$ beads, each red or blue, and join the ends to form a necklace; rotations count as the same necklace. There are $2^5=32$ strings. A non-monochromatic necklace comes from exactly $5$ different strings, because $5$ is prime and a non-constant string has no nontrivial rotational symmetry. The only monochromatic necklaces are all-red and all-blue, each coming from a single string. So $32-2=30$ strings split into $30/5=6$ groups, proving $5\mid2^5-2$.

In general, with $a$ bead colours and length $p$, there are $a^p$ strings, $a$ of them monochromatic, and the remaining $a^p-a$ group into blocks of $p$. Hence $p\mid a^p-a$ — the same theorem, proved combinatorially.

## Euler's theorem

**Theorem.** Let $m=pq$ with distinct primes $p,q$, and suppose $\gcd(a,m)=1$. Then

$$
a^{(p-1)(q-1)}\equiv1\pmod m .
$$

The proof is the same as for Fermat's little theorem with two substitutions:

- $\gcd(a,m)=1$ makes $a$ invertible mod $m$, so the pigeonhole argument produces $k$;
- Lagrange applied to $H$ gives $k\mid|\mathbb Z_m^*|=(p-1)(q-1)$.

The exponent changes from $p-1$ to $(p-1)(q-1)$ not because the theorem is new, but because **the order of the ambient group changed**. That is the payoff of abstraction: two seemingly different identities are one statement in the language of groups.

## Fields and the number of roots (groundwork)

A **field** is a set $F$ with two operations such that $(F,+)$ is an abelian group with identity $0$, $(F\setminus\{0\},\cdot)$ is an abelian group with identity $1$, and distributivity $a(b+c)=ab+ac$ holds.

**Theorem (stated).** A polynomial of degree $d$ with coefficients in a field $F$ has at most $d$ roots in $F$.

So "a degree-$d$ polynomial has at most $d$ roots" is not special to the reals; it follows from the field axioms. The secret-sharing scheme discussed later exploits exactly this: hide the secret in the constant term and hand out evaluations at points of a finite field.

## What this lecture establishes

- A group is closure, associativity, identity and inverse; adding commutativity gives an abelian group.
- $\mathbb Z_n\setminus\{0\}$ is a group under multiplication iff $n$ is prime; for composite $n$ the group is $\mathbb Z_n^*$.
- $|\mathbb Z_p\setminus\{0\}|=p-1$ and $|\mathbb Z_{pq}^*|=(p-1)(q-1)$.
- Lagrange's theorem: $|H|$ divides $|G|$, proved by partitioning into left cosets.
- Fermat's little theorem and Euler's theorem are one proof; only the group order differs.
- $a^{p-2}$ is the inverse of $a$ modulo $p$.

## Comprehension check

**1. Prove that $\mathbb Z_n\setminus\{0\}$ is a group under multiplication if and only if $n$ is prime.**

Reference answer: If $n$ is prime, closure, associativity and the identity $1$ are immediate; for any $a\in\{1,\dots,n-1\}$ we have $\gcd(a,n)=1$, so the extended-Euclid lemma gives $b$ with $ab\equiv1$, hence every element is invertible. If $n$ is composite, write $n=pq$ with $1<p,q<n$; then $p$ is not coprime to $n$, so by the contrapositive of the lemma $p$ is not invertible and the inverse axiom fails.

**2. Compute $|\mathbb Z_{pq}^*|$ and justify each counting step.**

Reference answer: The candidates are $1,\dots,pq-1$, giving $pq-1$ numbers. Those not coprime to $pq$ are precisely the multiples of $p$ or of $q$. The multiples of $q$ are $q,2q,\dots,(p-1)q$, so $p-1$ of them; the multiples of $p$ are $p,2p,\dots,(q-1)p$, so $q-1$. They are disjoint because $pq$ is out of range. Hence

$$
|\mathbb Z_{pq}^*|=(pq-1)-(p-1)-(q-1)=(p-1)(q-1).
$$

**3. Prove that every left coset $xH$ has the same cardinality as $H$.**

Reference answer: Consider $\varphi:H\to xH$, $\varphi(h)=xh$. If $\varphi(h_1)=\varphi(h_2)$, left-multiplying by $x^{-1}$ and using associativity gives $(x^{-1}x)h_1=(x^{-1}x)h_2$, i.e. $h_1=h_2$; so $\varphi$ is injective. It is surjective by the definition of $xH$. Hence $|xH|=|H|$. The proof uses the inverse, associativity and the identity.

**4. Prove Fermat's little theorem using Lagrange's theorem, and explain why the existence of $k$ needs the pigeonhole principle.**

Reference answer: Let $k$ be the least positive integer with $a^k\equiv1\pmod p$. Pigeonhole gives $i<j$ with $a^i\equiv a^j$; since $p$ is prime and $p\nmid a$, $a$ is invertible, so multiplying by $a^{-i}$ yields $a^{j-i}\equiv1$, and $k=j-i$ exists. Let $H=\{a^0,\dots,a^{k-1}\}$; it is closed under multiplication, contains the identity and has inverses $a^{k-m}$, so it is a subgroup of $\mathbb Z_p\setminus\{0\}$ of order $k$. Lagrange gives $k\mid p-1$; writing $p-1=ck$ gives $a^{p-1}=(a^k)^c\equiv1$.

**5. A group has $6$ elements. Can it have a subgroup of order $4$? Of order $3$?**

Reference answer: No subgroup of order $4$, since $4\nmid6$, contradicting Lagrange. A subgroup of order $3$ is possible since $3\mid6$ (for instance $\{1,2,4\}$ inside $\mathbb Z_7\setminus\{0\}$). Lagrange gives only a necessary condition: $d\mid|G|$ does not guarantee that a subgroup of order $d$ exists.

## Relation to neighbouring lectures

The previous lecture solved "find the inverse" with the extended Euclidean algorithm; this lecture organises the invertible elements into a group and derives Fermat and Euler from Lagrange's theorem in one stroke. The next lecture leaves algebra for linear programming, but duality will return in the guise of zero-sum games — another structure altogether. Later, in cryptography, the order $(p-1)(q-1)$ of $\mathbb Z_n^*$ becomes the whole secret behind RSA.
