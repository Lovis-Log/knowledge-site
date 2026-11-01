---
slug: 13-metric-convergence-sets
title: "Metric Spaces: What Survives Away from the Real Line"
summary: "Transporting convergence, the Cauchy property and boundedness from the reals to arbitrary distance spaces; proving convergent implies Cauchy and Cauchy implies relatively bounded; then using balls to introduce open sets, closed sets and the algebra of unions, intersections and complements."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, metric-spaces, convergence, open-sets]
sources:
  - kind: video
    title: "Lecture 12: Convergence in Metric Spaces; Operations on Sets"
    url: https://www.youtube.com/watch?v=VZnB3dGdHP4
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## The question: what can be carried over

The first half of the semester worked on $\mathbb R$: an ordered field, where we can compare sizes, add and multiply, and sum series. This lecture asks: **if $\mathbb R$ is replaced by a set that carries only a notion of distance, which conclusions survive unchanged?**

The answer comes in layers:

- **Survives**: sequences, convergence, subsequences, Cauchy sequences, boundedness.
- **Does not survive**: order (a general metric space has no size comparison), field operations (no addition or multiplication), and therefore **series make no sense**.

The boundary matters. It shows that the essence of convergence is not arithmetic but "distance can be made arbitrarily small". Grasp that and most proofs transfer verbatim.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: $\mathbb R$ is an ordered field; which notions generalise |
| 2:02 | Definition of a metric space: three axioms |
| 4:34 | Examples: $\mathbb R$, $\mathbb R^n$, the box metric, the sup metric on continuous functions |
| 11:54 | Sequences, subsequences, convergence, Cauchy sequences in a metric space |
| 17:27 | Theorem: convergent implies Cauchy (with proof) |
| 20:41 | The Cauchy convergence theorem holds only in $\mathbb R$; counterexample |
| 23:45 | Cauchy completeness |
| 24:59 | Metric balls; tubular neighbourhoods |
| 29:52 | Bounded subsets |
| 32:53 | Lemma: Cauchy sequences are bounded (with proof) |
| 45:52 | Bolzano–Weierstrass fails in a general metric space |
| 48:15 | Open sets and the proof that balls are open |
| 1:03:50 | Closed sets |
| 1:04:46 | Set operations and De Morgan's laws |
| 1:18:46 | Arbitrary unions and finite intersections of open sets |

## Definition of a metric space

A **metric space** is a pair $(X,d)$: a set $X$ and a distance function $d:X\times X\to\mathbb R$ satisfying three axioms.

1. **Positive definite**: $d(x,y)\ge0$, and $d(x,y)=0$ if and only if $x=y$.
2. **Symmetric**: $d(x,y)=d(y,x)$.
3. **Triangle inequality**: $d(x,z)\le d(x,y)+d(y,z)$.

The first two are bookkeeping; the third does the work. The course keeps stressing that **almost every nontrivial proof in a general metric space uses only the triangle inequality**. So build the reflex: when asked to prove an inequality, ask whether inserting an intermediate point via the triangle inequality helps.

## Four examples

### The real line

$X=\mathbb R$, $d(x,y)=|x-y|$. The axioms are immediate; the triangle inequality is the familiar $|x-z|\le|x-y|+|y-z|$.

### Euclidean space

$X=\mathbb R^n$, $x=(x_1,\dots,x_n)$, $y=(y_1,\dots,y_n)$,

$$
d(x,y)=\sqrt{(x_1-y_1)^2+\cdots+(x_n-y_n)^2}.
$$

For $n=1$ this reduces to $|x-y|$. The triangle inequality is the vector form of Pythagoras' argument (a consequence of Cauchy–Schwarz).

### The box (taxicab) metric

The same set $\mathbb R^n$ with

$$
d(x,y)=|x_1-y_1|+\cdots+|x_n-y_n|.
$$

Positive definiteness and symmetry are clear; the triangle inequality follows coordinate by coordinate from the real-line version, then summed. The example shows that **one set can carry different distances and hence different metric spaces**.

### Continuous function spaces

$X=C[a,b]$ (continuous functions on a closed interval),

$$
d(f,g)=\max_{x\in[a,b]}|f(x)-g(x)|.
$$

The maximum is attained: $|f-g|$ is continuous, so the extreme value theorem supplies it. The axioms are routine. This example appeared on the midterm and will reappear in the compactness counterexample.

### Aside: tubular neighbourhoods

The idea of a ball extends to "distance to a set": for a subset $A$,

$$
\{y : \exists x\in A,\ d(y,x)<r\}.
$$

When $A$ is a curve this is a tube of radius $r$ around it, hence the name **tubular neighbourhood**. When $A$ is a single point it is an ordinary ball. The notion resurfaces when discussing open sets.

## Sequences, subsequences, convergence, Cauchy

### Definitions

A **sequence** in $(X,d)$ is a map $f:\mathbb N\to X$, written $x_n=f(n)$.

A **subsequence** is a composition $f\circ g$ where $g:\mathbb N\to\mathbb N$ is **strictly increasing**. Strict increase encodes "same order, terms may be skipped, no repetition".

**Convergence**: $x_n\to x$ means

$$
\forall\varepsilon>0\ \exists N\ \text{such that}\ n\ge N\Rightarrow d(x_n,x)<\varepsilon .
$$

**Cauchy sequence**:

$$
\forall\varepsilon>0\ \exists N\ \text{such that}\ m,n\ge N\Rightarrow d(x_m,x_n)<\varepsilon .
$$

Both definitions are word-for-word those on $\mathbb R$, with $|x_n-x|$ replaced by $d(x_n,x)$.

### Theorem: convergent implies Cauchy

**Theorem.** In any metric space, every convergent sequence is Cauchy.

**Proof.** Let $x_n\to x$. Given $\varepsilon>0$, there is $N$ such that $n\ge N$ implies

$$
d(x_n,x)<\frac{\varepsilon}{2}.
$$

For $m,n\ge N$, insert $x$ and apply the triangle inequality:

$$
d(x_m,x_n)\le d(x_m,x)+d(x,x_n)<\frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon .
$$

Hence $(x_n)$ is Cauchy. $\square$

One line of triangle inequality, but it displays the central technique: **to bound the distance between two points, insert a third point known to be close to both**.

### The converse fails: the space may lack the limit point

In $\mathbb R$ every Cauchy sequence converges (the Cauchy convergence theorem), but that depends on completeness. Change the space and it fails.

**Counterexample.** Let $X=(0,1]$ with $d(x,y)=|x-y|$ and $x_n=1/n$.

- It is Cauchy: given $\varepsilon>0$, choose $N>1/\varepsilon$; for $m,n\ge N$,

$$
\left|\frac1m-\frac1n\right|<\frac1N<\varepsilon .
$$

- It does not converge in $X$: the only possible limit is $0$, and $0\notin X$.

So "Cauchy" guarantees only that the tail bunches together, not that the clustering point belongs to the space.

**Definition.** A metric space is **Cauchy complete** if every Cauchy sequence converges.

$\mathbb R$ is complete; $(0,1]$ is not. Most of the course works in complete or compact spaces precisely to avoid this "off by one point" failure.

## Balls and boundedness

### Metric balls

The **open ball** with centre $x$ and radius $r>0$ is

$$
B_r(x)=\{y\in X : d(x,y)<r\}.
$$

Replacing strict inequality by $\le$ gives the **closed ball** $\overline{B_r(x)}$. The two symbols recur constantly; the only difference is whether the boundary is included.

In $\mathbb R^2$ with the Euclidean metric a ball is a disc; with the box metric it is a diamond. The same word "ball", a shape determined by the distance.

### Bounded subsets

$A\subseteq X$ is bounded if there exist $x\in X$ and $D>0$ with $A\subseteq B_D(x)$.

Three easy-to-miss points:

- The empty set is bounded (it is contained in every set).
- **The whole space may be bounded.** For $X=(0,1]$ with the usual distance, centre $1/2$ and radius $1$ contain everything.
- Boundedness is not the vague "distances between elements are finite"; it must exhibit a single ball containing the set.

### Lemma: Cauchy sequences are bounded

**Lemma.** In any metric space, every Cauchy sequence is bounded.

**Proof.** Take $\varepsilon=1$; there is $N$ such that $m,n\ge N$ implies $d(x_m,x_n)<1$. In particular, for all $n\ge N$,

$$
d(x_n,x_N)<1 .
$$

Control the finitely many earlier terms by setting

$$
r=1+\max_{1\le i\le N-1}d(x_N,x_i)
$$

(with the maximum read as $0$ when $N=1$). Then

- for $n\ge N$, $d(x_N,x_n)<1<r$;
- for $n<N$, $d(x_N,x_n)\le\max\le r-1<r$.

So every $x_n$ lies in $B_r(x_N)$ and the sequence is bounded. $\square$

The extra $1$ is there to make the inequality strict; a non-strict version would do equally well.

Combining with the previous theorem: **convergent ⟹ Cauchy ⟹ bounded**. Neither arrow reverses.

### Bolzano–Weierstrass fails

In $\mathbb R$ every bounded sequence has a convergent subsequence. In a general metric space this **fails**.

The same counterexample works: in $X=(0,1]$ the sequence $x_n=1/n$ is bounded and Cauchy, yet has no convergent subsequence in $X$ (every subsequence can only head for $0\notin X$).

The course notes that BW is restored in **compact** metric spaces. That is precisely the motivation for introducing compactness next.

## Open and closed sets

### Open sets

$O\subseteq X$ is **open** if

$$
\forall x\in O\ \exists r>0\ \text{such that}\ B_r(x)\subseteq O .
$$

Intuitively, every point of an open set can move a little in any direction without leaving. Boundary points cannot, so an open set excludes its boundary.

Two trivial open sets: $\varnothing$ and $X$. The empty set has no elements to check, so the condition holds vacuously; every ball around a point of $X$ lies in $X$.

One relativity warning: take $X=(0,1]$. Then $X$ is open as a subset of itself, although it is not open as a subset of $\mathbb R$. **Before calling a set open or closed, fix the ambient space.**

### Lemma: an open ball is open

**Lemma.** For any $x\in X$ and $r>0$, $B_r(x)$ is open.

**Proof.** Take $y\in B_r(x)$, so $d(x,y)<r$. Let

$$
s=r-d(x,y)>0 .
$$

For any $z\in B_s(y)$, the triangle inequality gives

$$
d(x,z)\le d(x,y)+d(y,z)<d(x,y)+s=r .
$$

Hence $z\in B_r(x)$, i.e. $B_s(y)\subseteq B_r(x)$. Since $y$ was arbitrary, $B_r(x)$ is open. $\square$

Geometrically, the distance from $y$ to the boundary is $r-d(x,y)$, and a ball of that radius stays inside. The strict inequality is what makes $s>0$.

### Closed sets

$C\subseteq X$ is **closed** if its complement

$$
X\setminus C=\{x\in X : x\notin C\}
$$

is open.

It follows at once that $\varnothing$ and $X$ are both open and closed (they are complements of each other, and both are open). There is no contradiction: "open" and "closed" are not opposites.

A fact proved formally later: the closed ball $\{y : d(x,y)\le r\}$ is closed. Intuitively its complement $\{y:d(x,y)>r\}$ is open — there is positive distance to the boundary, so one can move further out.

## Set operations and De Morgan's laws

For $A,B\subseteq X$:

- **Union**: $A\cup B=\{x : x\in A\ \text{or}\ x\in B\}$.
- **Intersection**: $A\cap B=\{x : x\in A\ \text{and}\ x\in B\}$.
- **Complement**: $X\setminus A=\{x : x\notin A\}$.

For a family $\{U_\alpha\}$:

$$
\bigcup_\alpha U_\alpha=\{x : \exists\alpha,\ x\in U_\alpha\},
\qquad
\bigcap_\alpha U_\alpha=\{x : \forall\alpha,\ x\in U_\alpha\}.
$$

**De Morgan's laws**:

$$
\left(\bigcup_\alpha U_\alpha\right)^c=\bigcap_\alpha U_\alpha^c,
\qquad
\left(\bigcap_\alpha U_\alpha\right)^c=\bigcup_\alpha U_\alpha^c .
$$

The course's advice: **do not memorise; re-derive each time**. To prove two sets equal, prove mutual inclusion: left $\subseteq$ right, then right $\subseteq$ left. For De Morgan, translate "not in the union" into "for every $\alpha$, not in $U_\alpha$", then into "in every complement".

Misremembering De Morgan is expensive: it is exactly the source of the duality between open and closed sets.

## Unions and intersections of open sets

### Arbitrary unions are open

**Proposition.** If $\{O_\alpha\}$ is a family of open sets, then $\bigcup_\alpha O_\alpha$ is open.

**Proof.** Take $x\in\bigcup_\alpha O_\alpha$. By definition of union, some $\alpha_0$ satisfies $x\in O_{\alpha_0}$. Since $O_{\alpha_0}$ is open, there is $r>0$ with $B_r(x)\subseteq O_{\alpha_0}$. Hence

$$
B_r(x)\subseteq O_{\alpha_0}\subseteq\bigcup_\alpha O_\alpha .
$$

So the union is open. $\square$

Nothing is assumed about the cardinality of the index set: arbitrarily many open sets may be united.

### Finite intersections are open

**Proposition.** If $O_1,\dots,O_n$ are finitely many open sets, then $\bigcap_{i=1}^{n}O_i$ is open.

**Proof.** Take $x\in\bigcap_i O_i$. For each $i$, openness of $O_i$ gives $r_i>0$ with $B_{r_i}(x)\subseteq O_i$. Let

$$
r=\min\{r_1,\dots,r_n\}>0 .
$$

That the minimum of finitely many positive numbers is positive is the crux. Then for every $i$,

$$
B_r(x)\subseteq B_{r_i}(x)\subseteq O_i,
$$

so $B_r(x)\subseteq\bigcap_i O_i$ and the intersection is open. $\square$

### Infinite intersections fail

**Counterexample.** In $\mathbb R$ let

$$
O_n=\left(-\frac1n,\frac1n\right),\qquad n\in\mathbb N .
$$

Each $O_n$ is open, but

$$
\bigcap_{n=1}^{\infty}O_n=\{0\},
$$

and a singleton is not open (every ball around $0$ contains nonzero points).

The failure is concrete: the infimum of $r_n=1/n$ is $0$, and a positive minimum does not exist. **The sentence "the minimum of finitely many positive numbers is positive" has no infinite analogue.**

Contrast this with unions: arbitrary unions are fine, intersections only finitely many. The next lecture proves the mirror-image statements for closed sets.

## What this lecture establishes

- A metric space is a set plus a distance satisfying positive definiteness, symmetry and the triangle inequality; general spaces have no order and no arithmetic, so series are meaningless.
- Convergence, subsequences, Cauchy sequences and boundedness all transfer from $\mathbb R$; the proofs use almost nothing but the triangle inequality.
- Convergent ⟹ Cauchy ⟹ bounded; the reverse implications need extra hypotheses (complete, compact).
- A Cauchy sequence that fails to converge reflects a missing cluster point; $(0,1]$ with $x_n=1/n$ is the standard example.
- Open balls are open; arbitrary unions of open sets are open, finite intersections are open, infinite intersections need not be.
- A closed set is one whose complement is open; open and closed are not opposites.
- De Morgan's laws exchange unions and intersections and are the technical source of open/closed duality.

## Comprehension check

**1. Why is a series meaningless in a general metric space while a convergent sequence is meaningful?**

Reference answer: Convergence only compares the distance $d(x_n,x)$ between two points, and a distance function suffices. A series requires adding infinitely many terms, i.e. algebraic operations such as addition and scalar multiplication, which a general metric space does not carry. $\mathbb R$ happens to be both an ordered field and a metric space, so both notions exist there; keeping only the distance destroys summation.

**2. Prove that a convergent sequence is Cauchy (show the $\varepsilon/2$ choice).**

Reference answer: Let $x_n\to x$. Given $\varepsilon>0$, choose $N$ such that $n\ge N$ implies $d(x_n,x)<\varepsilon/2$. For $m,n\ge N$,

$$
d(x_m,x_n)\le d(x_m,x)+d(x,x_n)<\frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon .
$$

Symmetry is used to convert both distances into the ones already estimated.

**3. In $X=(0,1]$, the sequence $x_n=1/n$ is Cauchy but not convergent. Does it have a convergent subsequence? Explain.**

Reference answer: No. If a subsequence $x_{n_k}\to L\in(0,1]$, then $L>0$; but $x_{n_k}\to0$ in $\mathbb R$, and limits are unique, a contradiction. More directly, every subsequence stays at distance approaching $0$ from $0$ while eventually being at distance at least $L/2$ from any fixed $L>0$. The example simultaneously shows that BW fails in a general metric space.

**4. Prove that an open ball is open. Why take $s=r-d(x,y)$ rather than $r$?**

Reference answer: See the proof above. The choice $s=r-d(x,y)$ is exactly the remaining distance from $y$ to the boundary of the big ball, so a ball of that radius still fits inside. Choosing $s=r$ would let the small ball poke outside. The key inequality is $d(x,z)\le d(x,y)+d(y,z)<d(x,y)+s=r$, where the second strict inequality comes from $z\in B_s(y)$.

**5. Give a family of open sets whose intersection is not open, and explain why the "minimum" argument breaks.**

Reference answer: Take $O_n=(-1/n,1/n)$; each is open, and the intersection is $\{0\}$, which is not open. The finite-intersection proof uses $r=\min\{r_1,\dots,r_n\}>0$, relying on the fact that finitely many positive numbers have a positive minimum. For an infinite family the corresponding quantity is $\inf_n r_n$, which may be $0$; then no uniform $r>0$ exists. Here $\inf 1/n=0$, so the argument collapses.

**6. Use De Morgan's laws to show that "arbitrary unions of open sets are open" is equivalent to "arbitrary intersections of closed sets are closed".**

Reference answer: Let $C_\alpha=X\setminus O_\alpha$ be closed. By De Morgan,

$$
X\setminus\bigcup_\alpha O_\alpha=\bigcap_\alpha C_\alpha .
$$

If $\bigcup_\alpha O_\alpha$ is open, its complement is closed, so $\bigcap_\alpha C_\alpha$ is closed. Conversely, if arbitrary intersections of closed sets are closed, the complement of that intersection is open, so the union is open. The two statements are dual, and proving one yields the other.

**7. Why is the empty set open? Why is it bounded?**

Reference answer: Openness is the universal statement "for every $x\in\varnothing$ there is $r>0$ with …"; with no elements to check, it holds vacuously. Boundedness is "there exist $x$ and $D$ with $A\subseteq B_D(x)$", and $\varnothing\subseteq B_D(x)$ for any ball. Both illustrate the logical peculiarity of the empty set: universal statements hold vacuously, existential ones do not follow automatically.

## Relation to neighbouring lectures

The previous lecture assembled all the convergence tools on $\mathbb R$; this one moves them to metric spaces and introduces open sets. The next lecture continues the line: closed sets are defined and characterised by "limits of convergent sequences stay inside", then covers and compactness are defined, and compact sets are proved bounded and closed. The closing results here on arbitrary unions and finite intersections reappear there in dual form.
