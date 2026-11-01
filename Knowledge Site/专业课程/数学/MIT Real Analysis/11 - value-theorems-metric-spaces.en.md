---
slug: 11-value-theorems-metric-spaces
title: "Extreme and Intermediate Value Theorems; Metric Spaces"
summary: "Continuity is first characterized by sequences, then Bolzano-Weierstrass proves the extreme value theorem: the image is bounded and the supremum is attained. The intermediate value theorem follows from a supremum construction. Finally, distance is abstracted into a metric space, with Euclidean, taxicab and function-space examples, and convergence and Cauchy sequences are generalized."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, extreme-value, intermediate-value, metric-spaces, continuity]
sources:
  - kind: video
    title: "Lecture 11: Extreme and Intermediate Value Theorem; Metric Spaces"
    url: https://www.youtube.com/watch?v=bhBQbi9sWFA
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Two languages for continuity

The first lecture announced the intermediate value theorem and described continuity with the image of chalk that may not leave the blackboard. The tools are now in place — monotone convergence, Bolzano–Weierstrass and Cauchy convergence are all proved — so the theorem can be proved properly.

Recall the definition: $f$ is continuous at $x_0$ if for every $\varepsilon>0$ there is $\delta>0$ such that whenever $|x-x_0|<\delta$ (and $x$ lies in the domain),
$$
|f(x)-f(x_0)|<\varepsilon .
$$
In general $\delta$ depends on both $\varepsilon$ and $x_0$.

For proving theorems, however, $\varepsilon$-$\delta$ is not always the easiest language. The following lemma translates it into sequences, and both value theorems are proved with it.

## Sequential characterization

**Lemma.** Let $f$ be defined on $A\subseteq\mathbb R$ and continuous at $x\in A$. If $(x_n)$ is a sequence in $A$ with $x_n\to x$, then
$$
f(x_n)\to f(x).
$$

**Proof.** Given $\varepsilon>0$. Continuity of $f$ at $x$ gives $\delta>0$ such that
$$
|y-x|<\delta,\ y\in A \ \Rightarrow\ |f(y)-f(x)|<\varepsilon .
$$
Since $x_n\to x$, for this $\delta$ there is $N$ with $|x_n-x|<\delta$ whenever $n\ge N$. Hence for $n\ge N$,
$$
|f(x_n)-f(x)|<\varepsilon .
$$
So $f(x_n)\to f(x)$. $\square$

In one phrase: **a continuous function commutes with limits**,
$$
f\!\left(\lim_{n\to\infty}x_n\right)=\lim_{n\to\infty}f(x_n).
$$

The converse also holds (the equivalence is standard): if $f(x_n)\to f(x)$ for every sequence converging to $x$, then $f$ is continuous at $x$. This lecture uses only the forward direction.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Continuity recap; statements of the two value theorems |
| 7:24 | Lemma: continuity commutes with sequential limits |
| 15:16 | EVT, step one: the image is bounded |
| 20:28 | Step two: the supremum is attained |
| 26:25 | IVT: build the set $E$ and take its supremum |
| 39:57 | Metric spaces: definition and three axioms |
| 44:55 | Examples: $\mathbb R$, Euclidean, taxicab, $C[0,1]$ |
| 53:57 | A strange example: $|1/n-1/m|$ on the integers |
| 57:23 | The French railway metric |
| 1:01:22 | Convergence and Cauchy sequences in metric spaces |
| 1:12:12 | Continuous functions on metric spaces; the evaluation map |

## Extreme value theorem

**Theorem (EVT).** Let $f$ be continuous on the closed interval $[a,b]$. Then there exist $x_M,x_m\in[a,b]$ such that for all $x\in[a,b]$,
$$
f(x_m)\le f(x)\le f(x_M).
$$
That is, $f$ attains a maximum and a minimum on $[a,b]$, and is therefore bounded.

### Step one: the image is bounded

First show it is bounded above. Suppose not. Then for every integer $n$, the number $n$ is not an upper bound, so there is $x_n\in[a,b]$ with
$$
f(x_n)\ge n .
$$
$(x_n)$ is bounded (it lies in $[a,b]$), so Bolzano–Weierstrass gives a convergent subsequence $x_{n_k}\to x^*$. Since $a\le x_{n_k}\le b$, passing to the limit gives $x^*\in[a,b]$.

By continuity and the sequence lemma, $f(x_{n_k})\to f(x^*)$. Convergent sequences are bounded, so $(f(x_{n_k}))$ is bounded. But $f(x_{n_k})\ge n_k\to\infty$, which is unbounded. Contradiction.

The lower bound is identical. Hence $f([a,b])$ is bounded.

### Step two: the supremum is attained

Set
$$
M=\sup f([a,b]),
$$
finite by step one.

For each $n$, the number $M-\dfrac1n$ is strictly below the supremum and hence **not** an upper bound, so there is $x_n\in[a,b]$ with
$$
M-\frac1n<f(x_n)\le M .
$$
The right inequality holds because $M$ is an upper bound. Bolzano–Weierstrass again gives a convergent subsequence $x_{n_k}\to x_M$, and again $x_M\in[a,b]$.

Continuity gives $f(x_{n_k})\to f(x_M)$. Along the subsequence,
$$
M-\frac{1}{n_k}<f(x_{n_k})\le M .
$$
Both ends tend to $M$, so by squeezing,
$$
f(x_M)=M .
$$
The supremum is attained, and $x_M$ is a maximum point. Repeating the argument for the infimum (or applying the result to $-f$) gives the minimum point $x_m$. $\square$

The structure is worth remembering: **a supremum need not be attained** — for the set $(0,1)$ the supremum $1$ is not in the set. Continuity plus a closed interval guarantees exactly two things: the image is bounded, and points approaching the supremum have a convergent subsequence whose limit still lies in the domain.

Neither hypothesis can be dropped:

- The interval must be closed: $f(x)=x$ on $(0,1)$ is continuous but attains neither maximum nor minimum.
- The function must be continuous: $f(x)=x$ for $x<1$ and $f(1)=0$ on $[0,1]$ is bounded but never attains the supremum.

## Intermediate value theorem

**Theorem (IVT).** Let $f$ be continuous on $[a,b]$ with $f(a)<0<f(b)$. Then there is $x_0\in(a,b)$ with $f(x_0)=0$.

The lecture proves this special case. The general statement (every value between $f(a)$ and $f(b)$ is attained) follows by applying the special case to $g(x)=f(x)-v$.

**Proof.** Define
$$
E=\{\,x\in[a,b] : f(y)\le0\ \text{for all}\ y\in[a,x]\,\}.
$$
Intuitively, $E$ collects the positions reachable from $a$ while $f$ stays non-positive.

**$E$ is nonempty and bounded.** $a\in E$ because on $[a,a]$ only $f(a)<0$ matters. And $E\subseteq[a,b]$, so it is bounded.

Set
$$
x_0=\sup E .
$$
Since $a\in E$ and $E\subseteq[a,b]$, we have $x_0\in[a,b]$.

**Claim: $f(x_0)\le0$.**

For each $n$, the number $x_0-\dfrac1n$ is not an upper bound of $E$, so there is $x_n\in E$ with
$$
x_0-\frac1n<x_n\le x_0 .
$$
Thus $x_n\to x_0$. Since $x_n\in E$, we have $f(x_n)\le0$. Continuity and the sequence lemma give $f(x_n)\to f(x_0)$, and limits preserve inequalities, so
$$
f(x_0)\le0 .
$$

**Claim: $f(x_0)\ge0$.**

Suppose $f(x_0)<0$. Choose $\varepsilon>0$ with
$$
f(x_0)+\varepsilon<0 .
$$
Continuity at $x_0$ gives $\delta>0$ such that $|x-x_0|<\delta$ implies
$$
|f(x)-f(x_0)|<\varepsilon,
\quad\text{hence}\quad
f(x)<f(x_0)+\varepsilon<0 .
$$

This contradicts $x_0=\sup E$. Pick
$$
x_1\in\left(x_0,\ \min\{x_0+\delta,\ b\}\right).
$$
The interval is nonempty because $f(b)>0$ forces $x_0\ne b$, and $x_1\in[a,b]$.

- If $y\in[a,x_0)$: since $x_0=\sup E$, there is $e\in E$ with $e>y$ (otherwise $y$ would be a smaller upper bound). By definition of $E$, $f\le0$ on $[a,e]$, and $y\le e$, so $f(y)\le0$.
- If $y\in[x_0,x_1]$: from $|y-x_0|\le|x_1-x_0|<\delta$ we get $f(y)<0$.

Together, $f\le0$ on all of $[a,x_1]$, so $x_1\in E$. But $x_1>x_0=\sup E$, a contradiction.

Therefore $f(x_0)\ge0$. With the first claim, $f(x_0)=0$, and $x_0\ne a,b$ since the endpoints have nonzero values, so $x_0\in(a,b)$. $\square$

The skeleton is two sentences: **the supremum is approached from the left, and continuity carries $f\le0$ to it; if the value were strictly negative, a short stretch to the right would also qualify, so the supremum was not large enough**. This is exactly the chalk-on-the-blackboard intuition from the first lecture, with every step made checkable.

## Metric spaces

Everything so far rested on $|x-y|$. Abstracting "distance" gives a metric space.

**Definition.** A metric space is a set $X$ with a map $d:X\times X\to\mathbb R$ satisfying three axioms:

1. **Positive definite**: $d(x,y)\ge0$, and $d(x,y)=0\iff x=y$;
2. **Symmetric**: $d(x,y)=d(y,x)$;
3. **Triangle inequality**: $d(x,z)\le d(x,y)+d(y,z)$.

The third is the substantive one: a detour is never shorter.

### Examples

**Usual distance on $\mathbb R$.** $d(x,y)=|x-y|$.

**Euclidean distance on $\mathbb R^2$.**
$$
d(x,y)=\sqrt{(x_1-y_1)^2+(x_2-y_2)^2}.
$$
The triangle inequality is "the straight path is shortest", whose proof is nontrivial (it needs Cauchy–Schwarz). The same works on $\mathbb R^3$ with a third term under the root.

**Taxicab (box) distance.**
$$
d(x,y)=|x_1-y_1|+|x_2-y_2|.
$$
All three axioms are easy: positive definiteness and symmetry are clear, and the triangle inequality follows coordinate by coordinate from the one on $\mathbb R$. It measures the distance when one may only travel parallel to the axes.

**The space $C[0,1]$. Let $X$ be the continuous functions on $[0,1]$ and
$$
d(f,g)=\max_{x\in[0,1]}|f(x)-g(x)| .
$$
The maximum exists because $|f-g|$ is continuous, by the **extreme value theorem**. Positive definiteness comes from "a continuous function that vanishes everywhere has distance zero"; symmetry is clear; the triangle inequality is applied pointwise and then maximized.

There is a pleasant interplay here: defining this metric needs the EVT, whose proof uses only the structure of $\mathbb R$ and not $C[0,1]$. The logic is therefore clean.

**A strange distance on the integers.**
$$
d(n,m)=\left|\frac1n-\frac1m\right| .
$$
Positive definiteness and symmetry are clear. The triangle inequality need not be checked by hand: the map $n\mapsto1/n$ injects $\mathbb Z$ into $\mathbb R$, and this distance is simply the usual distance pulled back along that injection, so the triangle inequality is inherited.

The effect is counterintuitive: $1000$ and $1001$ are one unit apart in the usual sense but about $10^{-6}$ apart here. **Distance is added structure, not something a set carries by itself.**

**The French railway metric.** Let $X=\mathbb R^2$, with the origin playing the role of Paris:
$$
d(x,y)=
\begin{cases}
|x-y|, & x,y\ \text{collinear with the origin},\\[2pt]
|x|+|y|, & \text{otherwise}.
\end{cases}
$$
Two towns on the same line through Paris can travel directly; otherwise the journey must pass through Paris. Cannes and Nice are close on the map but far by rail — hence the name.

## Convergence and Cauchy sequences in metric spaces

The definitions transfer almost verbatim:

- $(x_n)$ converges to $x$: for every $\varepsilon>0$ there is $N$ with $d(x_n,x)<\varepsilon$ for $n\ge N$.
- $(x_n)$ is Cauchy: for every $\varepsilon>0$ there is $N$ with $d(x_m,x_n)<\varepsilon$ for $m,n\ge N$.

**Theorem.** In a metric space, every convergent sequence is Cauchy.

**Proof.** Let $x_n\to x$. Given $\varepsilon>0$, choose $N$ with
$$
d(x_n,x)<\frac{\varepsilon}{2}
$$
for $n\ge N$. Then for $m,n\ge N$, the triangle inequality gives
$$
d(x_m,x_n)\le d(x_m,x)+d(x,x_n)<\frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon . \qquad\square
$$

**The converse fails.** This is the key difference from $\mathbb R$. Take
$$
X=(0,1],\qquad d(x,y)=|x-y|,
$$
and $x_n=1/n$. In $\mathbb R$ it converges to $0$, so it is Cauchy; but $0$ is not in $X$, so it does not converge in $X$.

A metric space in which every Cauchy sequence converges is **complete**. $\mathbb R$ is complete (that is the Cauchy convergence theorem); $(0,1]$ is not. A natural question is whether the space can be enlarged so that all Cauchy sequences converge — sometimes yes (completion), sometimes no. The lecture leaves this as a direction for later.

## Continuous functions on metric spaces

Let $(X,d)$ be a metric space and $f:X\to\mathbb R$. Then $f$ is continuous at $x_0$ if for every $\varepsilon>0$ there is $\delta>0$ such that
$$
d(x,x_0)<\delta\ \Rightarrow\ |f(x)-f(x_0)|<\varepsilon .
$$
The only change from $\mathbb R$ is replacing $|x-x_0|$ by $d(x,x_0)$.

**Example: the evaluation map.** On $X=C[0,1]$ define
$$
F(f)=f(0).
$$
Then $F$ is continuous. For any $f,g$,
$$
|F(f)-F(g)|=|f(0)-g(0)|\le\max_{x\in[0,1]}|f(x)-g(x)|=d(f,g).
$$
Given $\varepsilon>0$, take $\delta=\varepsilon$. In fact $F$ does not stretch distances (it is Lipschitz with constant $1$).

Small as it is, the example carries a point: **a function can be a point of another space**, and "evaluate at a point" is a continuous function on that space. The language of metric spaces makes this hierarchy natural.

Finally, the sequence lemma holds in metric spaces with an unchanged proof: if $f$ is continuous at $x$ and $x_n\to x$, then $f(x_n)\to f(x)$; one simply reads $|y-x|$ as $d(y,x)$.

## What this lecture establishes

- Continuous functions commute with sequential limits: $x_n\to x$ implies $f(x_n)\to f(x)$.
- EVT: a continuous function on a closed interval is bounded and attains its maximum and minimum. The proof has two steps — bounded image (contradiction plus Bolzano–Weierstrass), then attainment of the supremum (approximation, subsequence, squeezing).
- IVT: take the supremum $x_0$ of $E=\{x: f\le0\ \text{on}\ [a,x]\}$ and prove both $f(x_0)\le0$ and $f(x_0)\ge0$.
- A metric space is a set with a distance satisfying positive definiteness, symmetry and the triangle inequality.
- Euclidean and taxicab distances give different geometries; the sup metric on $C[0,1]$ relies on the EVT; $|1/n-1/m|$ on the integers and the French railway metric show how counterintuitive distance can be.
- Convergent implies Cauchy, but the converse needs completeness; the sequence $1/n$ in $(0,1]$ is the standard counterexample.
- Continuity on a metric space just replaces the absolute value by the distance; the evaluation map $f\mapsto f(0)$ is continuous.

## Comprehension check

**1. Why does the EVT need both "closed interval" and "continuity"? Give an example showing the conclusion fails without each.**

Reference answer: Closedness guarantees two things: in the boundedness argument the approximating sequence $x_n\in[a,b]$ is bounded, hence has a convergent subsequence; and the limit stays in the domain, since $a\le x_{n_k}\le b$ passes to the limit. Continuity gives $f(x_{n_k})\to f(x^*)$, setting up the contradiction between "$f(x_{n_k})\ge n_k$" and "convergent sequences are bounded". Without closedness: $f(x)=x$ on $(0,1)$ is continuous but attains neither extreme. Without continuity: $f(x)=x$ for $x<1$, $f(1)=0$ on $[0,1]$ is bounded but never attains the supremum $1$.

**2. In the IVT proof, why must $x_0=\sup E$ satisfy $f(x_0)\le0$?**

Reference answer: For each $n$, $x_0-1/n$ is not an upper bound of $E$, so there is $x_n\in E$ with $x_0-1/n<x_n\le x_0$, hence $x_n\to x_0$. Since $x_n\in E$, $f(x_n)\le0$. Continuity gives $f(x_n)\to f(x_0)$, and limits preserve inequalities (if $f(x_0)>0$, taking $\varepsilon=f(x_0)/2$ contradicts $f(x_n)\le0$), so $f(x_0)\le0$.

**3. If $f(x_0)<0$, how does the proof derive a contradiction, and which property of $E$ is essential?**

Reference answer: Choose $\varepsilon>0$ with $f(x_0)+\varepsilon<0$. Continuity gives $\delta>0$ such that $|x-x_0|<\delta$ implies $f(x)<0$. Pick $x_1\in(x_0,\min\{x_0+\delta,b\})$. For $y<x_0$, the supremum property yields $e\in E$ with $e>y$, so $f\le0$ on $[a,e]$ and in particular $f(y)\le0$. For $y\in[x_0,x_1]$, continuity gives $f(y)<0$. Hence $f\le0$ on $[a,x_1]$, i.e. $x_1\in E$, contradicting that $x_0$ is an upper bound. The essential property: elements of $E$ keep $f$ non-positive from $a$ onward, and the supremum can be approached from below by elements of $E$.

**4. Verify that $d(n,m)=|1/n-1/m|$ is a metric on $\mathbb Z$, and explain why $1000$ and $1001$ are close in it.**

Reference answer: Let $\varphi(n)=1/n$; then $d(n,m)=|\varphi(n)-\varphi(m)|$. Since $\varphi$ is injective, $d(n,m)=0$ iff $n=m$; non-negativity and symmetry are inherited from the absolute value; the triangle inequality follows from that on $\mathbb R$:
$$
|\varphi(n)-\varphi(m)|\le|\varphi(n)-\varphi(k)|+|\varphi(k)-\varphi(m)|.
$$
And $d(1000,1001)=|0.001-0.000999\ldots|\approx10^{-6}$, because $1/n$ changes very slowly for large $n$. Distance is extra structure, unrelated to numerical size.

**5. Why does "convergent ⇒ Cauchy" hold in every metric space, while "Cauchy ⇒ convergent" fails?**

Reference answer: The first needs only the triangle inequality and the definition of convergence: $d(x_m,x_n)\le d(x_m,x)+d(x,x_n)<\varepsilon/2+\varepsilon/2$. The second requires the limit point to exist in the space. Counterexample: $X=(0,1]$ with the usual distance, $x_n=1/n$ is Cauchy, but if it converged in $X$ the limit would have to be $0$ (unique in $\mathbb R$), and $0\notin X$. Such spaces are incomplete; completeness of $\mathbb R$ is exactly the Cauchy convergence theorem.

**6. Prove that the evaluation map $F(f)=f(0)$ is continuous on $C[0,1]$, and explain why it is Lipschitz.**

Reference answer:
$$
|F(f)-F(g)|=|f(0)-g(0)|\le\max_{x\in[0,1]}|f(x)-g(x)|=d(f,g).
$$
Given $\varepsilon>0$, take $\delta=\varepsilon$; then $d(f,g)<\delta$ implies $|F(f)-F(g)|\le d(f,g)<\varepsilon$. Since the inequality holds for all $f,g$ with constant $1$, $F$ is Lipschitz with constant $1$.

## Relation to neighbouring lectures

This lecture redeems the promise of the first: the intermediate value theorem is proved in lecture eleven, using only completeness, Bolzano–Weierstrass and the definition of continuity — exactly "the reals are a complete ordered field".

Metric spaces lift the viewpoint one level. Convergence, Cauchy sequences and continuity depend only on the three distance axioms, not on addition or multiplication. That is why the same notions carry over verbatim to function spaces. The next lecture studies open sets, closed sets, coverings and compactness — which characterize the sets on which continuous functions still enjoy the extreme value theorem, and explain uniformly what separates $(0,1)$ from $[0,1]$.
