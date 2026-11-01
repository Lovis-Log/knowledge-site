---
slug: 15-max-flow-min-cut
title: "Max-Flow Min-Cut: Duality and Augmenting Paths"
summary: "We write network flow as a linear program, take its dual — a program over vertex labels — show the dual optimum can be taken 0/1 and therefore describes a cut, so strong duality yields max flow equals min cut; residual networks then explain integral flows."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [graph-theory, network-flow, optimization, min-cut]
sources:
  - kind: video
    title: "Lecture 15: Max-Flow Min-Cut Theorem"
    url: https://www.youtube.com/watch?v=pX-HnYwO454
    author: Peter Shor, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## Networks and flows

A **network** is a directed graph with a **capacity** $u_{ij}\ge0$ on every edge, plus a source $s$ and a sink $t$. It can model pipes, roads or communication links — anything with bounded throughput.

A **flow** assigns a number $x_{ij}$ to each edge with

$$
0\le x_{ij}\le u_{ij},
\qquad
\sum_{j}x_{ij}=\sum_{k}x_{ki}\quad(i\ne s,t),
$$

i.e. flow is conserved at intermediate vertices. Its **value** is the net inflow at the sink:

$$
z=\sum_{k}x_{kt}-\sum_{j}x_{tj}.
$$

The problem: maximise $z$.

The lecture first works a five-vertex example by hand, pushing flow along paths as far as each allows, and reaches $9$ units. It then immediately asks: **how do you prove $9$ is maximal?**

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Networks, capacities, source and sink |
| 2:08 | Finding paths by hand to build a flow of $9$ |
| 5:39 | A cut: bounding the flow by three edge capacities |
| 6:57 | Definition of a cut and its capacity |
| 8:48 | $\text{max flow}\le\text{min cut}$ |
| 10:38 | The linear program for maximum flow |
| 17:05 | Taking the dual |
| 23:59 | Reading cuts out of dual solutions |
| 31:17 | Why the dual optimum can be taken 0/1 |
| 40:56 | Averaging over layers to prove the dual value is the min cut |
| 49:04 | Integral flows from integer capacities |
| 54:17 | Residual networks and the augmenting-path algorithm |
| 1:08:26 | Application: König's theorem |

## Cuts

![Figure](/images/maxflow-mincut-rich-en.svg)

*Figure：A five-node network: labels are flow/capacity; the dashed cut has capacity 9。*

Split the vertices into $C$ and $\bar C$ with $s\in C$ and $t\in\bar C$. The **capacity of the cut** is the total capacity of edges pointing from $C$ to $\bar C$:

$$
\operatorname{cap}(C)=\sum_{i\in C,\ j\notin C} u_{ij}.
$$

Edges pointing backwards do not count.

**Lemma.** For every flow $x$ and every cut $C$,

$$
z\le\operatorname{cap}(C).
$$

**Proof.** Compute the net outflow from $C$ in two ways. On one hand, conservation kills every vertex except $s$, so

$$
\sum_{i\in C}\Big(\sum_j x_{ij}-\sum_k x_{ki}\Big)
=\sum_{i\in C,\ j\notin C}x_{ij}-\sum_{i\in C,\ k\notin C}x_{ki}
=z .
$$

On the other hand, the first term is at most $\sum_{i\in C,j\notin C}u_{ij}$, and the second is non-negative, so $z\le\operatorname{cap}(C)$.

Thus the hand-worked example proves its own optimality once a cut of capacity $9$ is exhibited; the lecture points to the three edges forming it.

**Theorem.** $\max z=\min_C\operatorname{cap}(C)$.

## The linear program for maximum flow

Variables: a flow $x_{ij}$ per edge and the total value $z$.

$$
\begin{aligned}
\max\quad & z\\
\text{s.t.}\quad
& x_{ij}\le u_{ij} &&\forall(i,j)\in E &&(\alpha_{ij}\ge0)\\
& \sum_{j}x_{ij}-\sum_{k}x_{ki}=0 &&\forall i\ne s,t &&(\beta_i\ \text{free})\\
& z-\sum_{k}x_{kt}=0 && &&(\gamma\ \text{free})\\
& x_{ij}\ge0 .
\end{aligned}
$$

The third line writes "$z$ equals the total inflow at the sink" as a constraint, so the objective is a single variable and the dual comes out tidily.

## Taking the dual

Dual variables: $\alpha_{ij}\ge0$ for capacities, free $\beta_i$ for conservation, free $\gamma$ for the $z$ constraint. Setting $\beta_s=0$ and $\beta_t=\gamma$, the dual is

$$
\min\;\sum_{(i,j)}u_{ij}\alpha_{ij}
$$
$$
\text{s.t.}\quad
\alpha_{ij}+\beta_i-\beta_j\ge0\quad\forall(i,j)\in E,
\qquad
\beta_t\ge1,
$$
$$
\alpha_{ij}\ge0,\qquad \beta_i\ \text{free}.
$$

Check: $x_{ij}$ appears in its capacity constraint (coefficient $1$), in the conservation row of $i$ ($+1$) and of $j$ ($-1$), giving $\alpha_{ij}+\beta_i-\beta_j\ge0$; $z$ appears only in the third equality (coefficient $1$, moved to $\gamma$), giving $\beta_t\ge1$.

Why $\beta_s=0$? The source has no conservation constraint, so its dual variable does not exist; and shifting all $\beta$ by a constant leaves the differences $\beta_i-\beta_j$ unchanged, so $\beta_s$ can be normalised to $0$.

**Why $\beta_t\ge1$?** Because $z$ has coefficient $1$ in the objective, and duality requires the corresponding expression to be at least the objective coefficient. If $\beta_t$ were larger, scaling all $\beta$ down would lower the objective, so the optimum has $\beta_t=1$.

## Reading cuts out of the dual

Given $\beta$, the objective is minimised by taking each $\alpha_{ij}$ as small as allowed:

$$
\alpha_{ij}=\max\big(0,\ \beta_j-\beta_i\big),
$$

so the dual objective is

$$
\sum_{(i,j)}u_{ij}\max(0,\beta_j-\beta_i).
$$

**Key observation.** If every $\beta_i$ is $0$ or $1$, then $\max(0,\beta_j-\beta_i)$ equals $1$ exactly when $\beta_i=0$ and $\beta_j=1$, and $0$ otherwise. Let

$$
C=\{i:\beta_i=0\}.
$$

Then $s\in C$ (since $\beta_s=0$) and $t\notin C$ (since $\beta_t=1$), and the objective is precisely

$$
\sum_{i\in C,\ j\notin C}u_{ij}=\operatorname{cap}(C).
$$

So **a 0/1 dual solution is a cut, and the dual objective is its capacity**.

### Why the optimum can be taken 0/1

Take any dual feasible $\beta$ with $\beta_s=0$, $\beta_t=1$. Sort its distinct values:

$$
0=\tau_0<\tau_1<\cdots<\tau_k=1,
$$

and let $C_r=\{i:\beta_i\le\tau_r\}$. This gives nested cuts $C_1\subseteq C_2\subseteq\cdots\subseteq C_k$, with $C_k$ containing $s$ but not $t$.

An edge from level $\beta_i$ to level $\beta_j$ contributes $(\beta_j-\beta_i)$ times its capacity; splitting that difference across the layers it crosses gives, layer by layer, the capacity crossing that layer times the gap between layers. Hence

$$
\sum_{(i,j)}u_{ij}\max(0,\beta_j-\beta_i)
=\sum_{r=1}^{k}(\tau_r-\tau_{r-1})\operatorname{cap}(C_r).
$$

The right side is a **convex combination** of cut capacities (the weights are non-negative and sum to $1$), and an average is at least the minimum, so

$$
\text{dual objective}\ \ge\ \min_C\operatorname{cap}(C).
$$

Conversely, the 0/1 indicator of a minimum cut attains exactly that cut's capacity. Therefore the dual optimum equals the minimum cut.

**Conclusion.** Strong LP duality gives

$$
\max z=\min_C\operatorname{cap}(C).
$$

Nothing in the proof is a combinatorial trick: write the LP, take the dual, show the dual optimum is integral, then read off the combinatorial meaning.

## Integral flows and augmenting paths

**Observation.** With integer capacities the minimum cut is an integer sum, so the maximum flow *value* is an integer. But an integer value does not mean every edge carries an integer — one edge could carry $6.5$ and another $1.5$ and still sum to $9$.

**Theorem.** With integer capacities there is a maximum flow whose edge flows are all integers.

**The augmenting-path algorithm.** Start from the zero flow and repeat:

1. find a path from $s$ to $t$ in the **residual network**;
2. push along it the smallest residual capacity on the path.

The residual network is defined as follows: if edge $(i,j)$ carries $x_{ij}<u_{ij}$, keep a forward edge of capacity $u_{ij}-x_{ij}$; if $x_{ij}>0$, **add a backward edge** $(j,i)$ of capacity $x_{ij}$, meaning "the flow already sent can be sent back".

Each augmentation pushes an integer amount (a minimum of integers), so the flow stays integral. When the algorithm stops, the flow is integral and maximum.

**Why does "no augmenting path" mean optimal?** Let the current flow have value $v$ and run breadth-first search from $s$ in the residual network. Set

$$
C=\{\text{vertices reachable from } s\}.
$$

Since $t$ is unreachable, $t\notin C$ and $(C,\bar C)$ is a cut. Every edge from $C$ to $\bar C$ has zero residual (else its far endpoint would be reachable), i.e. $x_{ij}=u_{ij}$; every edge from $\bar C$ to $C$ carries zero flow (else its backward residual edge would make its tail reachable). Therefore

$$
v=\sum_{i\in C,j\notin C}x_{ij}=\sum_{i\in C,j\notin C}u_{ij}=\operatorname{cap}(C).
$$

A flow whose value equals a cut's capacity is maximum by the lemma, and that cut is a minimum cut.

**Note: an example where flow must be undone.** Take $s\to a$ (capacity $3$), $s\to b$ ($2$), $a\to b$ ($2$), $a\to t$ ($2$), $b\to t$ ($3$). Pushing $2$ units along $s\to a\to b\to t$ first leaves room for only $2$ more units, total $4$. The true maximum is $5$: send $3$ along $s\to a$ (two to $t$, one to $b$) and $2$ along $s\to b$, filling both edges into $t$. Reaching $5$ requires sending flow *backwards* along $b\to a$ in the residual network, cancelling part of the first decision. This is why the residual network — and not greedy path-finding — is the right object. (This example is supplied for illustration; the lecture's worked network is larger.)

## Application: König's theorem

Let $G=(L\cup R,E)$ be bipartite. Build a network:

- an edge from $s$ to each $v\in L$ of capacity $1$;
- an edge $v\to w$ of capacity $\infty$ for each original edge $vw\in E$;
- an edge from each $w\in R$ to $t$ of capacity $1$.

**Maximum flow gives a maximum matching.** By integrality there is a 0/1 maximum flow. An intermediate edge carrying $1$ is a matched edge; the unit capacities at both ends ensure no vertex is used twice. So the flow value is at most the maximum matching, and any matching yields a flow of the same size; they are equal.

**Minimum cut gives a minimum vertex cover.** A finite cut cannot cut an infinite intermediate edge, so it cuts only edges $s\to v$ ($v\in L$) or $w\to t$ ($w\in R$). Collect the endpoints:

$$
\text{cover}=\{v\in L:\ s\to v\ \text{is cut}\}\cup\{w\in R:\ w\to t\ \text{is cut}\}.
$$

If some edge $vw$ had neither endpoint chosen, then $s\to v\to w\to t$ would be a path of positive capacity, contradicting that the cut separates $s$ from $t$. So the set covers every edge and its size equals the cut capacity.

By max-flow min-cut, maximum matching equals minimum vertex cover — König's theorem. The previous lecture proved it through LP integrality; this is the same fact seen through flows.

## What this lecture establishes

- A flow obeys capacities and conservation; its value is the net inflow at the sink.
- Any flow is bounded by any cut; maximum flow equals minimum cut.
- The dual of the max-flow LP is over vertex labels; its optimum can be taken 0/1 and describes a cut.
- The dual objective is the cut capacity, so strong duality proves max-flow min-cut.
- Integer capacities admit an integral maximum flow, constructible by augmenting paths.
- When no augmenting path remains, the vertices reachable from $s$ form a tight cut.
- König's theorem is max-flow min-cut specialised to bipartite graphs.

## Comprehension check

**1. Define a cut and its capacity, and prove that any flow is bounded by any cut.**

Reference answer: A cut is a partition $(C,\bar C)$ with $s\in C$, $t\notin C$; its capacity is $\operatorname{cap}(C)=\sum_{i\in C,j\notin C}u_{ij}$. Summing the net outflow over all vertices of $C$, conservation cancels internal edges and leaves the flow value $z$. The part from $C$ to $\bar C$ is at most the corresponding capacity sum, and the part from $\bar C$ to $C$ is non-negative, so $z\le\operatorname{cap}(C)$.

**2. Write the max-flow LP and name the dual variable attached to each constraint.**

Reference answer: $\max z$ subject to $x_{ij}\le u_{ij}$ (dual $\alpha_{ij}\ge0$), $\sum_j x_{ij}-\sum_k x_{ki}=0$ (free $\beta_i$), $z-\sum_k x_{kt}=0$ (free $\gamma$), $x_{ij}\ge0$. Normalising $\beta_s=0$ and $\beta_t=\gamma$ gives the dual $\min\sum u_{ij}\alpha_{ij}$ with $\alpha_{ij}+\beta_i-\beta_j\ge0$ and $\beta_t\ge1$.

**3. Why can the dual optimum be taken with $\beta_i\in\{0,1\}$?**

Reference answer: For any feasible $\beta$, the objective is minimised by $\alpha_{ij}=\max(0,\beta_j-\beta_i)$. Sort the distinct values as $0=\tau_0<\dots<\tau_k=1$ and set $C_r=\{i:\beta_i\le\tau_r\}$. Each edge's contribution splits across the layers it crosses, so the objective equals $\sum_r(\tau_r-\tau_{r-1})\operatorname{cap}(C_r)$ — a convex combination of cut capacities, hence at least the minimum cut. The 0/1 indicator of a minimum cut attains that value, so a 0/1 optimum exists.

**4. With integer capacities, why must an integral maximum flow exist?**

Reference answer: The minimum cut is a sum of integers, so the maximum flow value is an integer — but that alone does not make each edge integral. The augmenting-path algorithm starts from the zero flow and always pushes the minimum residual along a path, a difference of integers, so the flow stays integral. It stops only when no augmenting path remains, at which point the flow equals a cut capacity and is therefore maximum.

**5. When no $s$–$t$ path remains in the residual network, how do you construct a minimum cut?**

Reference answer: Let $C$ be the set of vertices reachable from $s$ in the residual network. Since $t\notin C$, $(C,\bar C)$ is a cut. Every edge $C\to\bar C$ has zero residual, so $x_{ij}=u_{ij}$; every edge $\bar C\to C$ carries zero flow (otherwise its backward residual edge would make the tail reachable). Hence the current value $v=\sum_{C\to\bar C}x_{ij}=\operatorname{cap}(C)$, and since no flow exceeds any cut, $v$ is maximal and this cut is minimal.

## Relation to neighbouring lectures

The previous lecture read strong duality as two players' optimal strategies; this lecture reads the same pipeline as a cut — the primal gives the flow, the dual gives the cut, and strong duality is max-flow min-cut. The template "write the LP, take the dual, prove integrality, read off the combinatorial meaning" has now run three times (König's theorem, the minimax theorem, max-flow min-cut). The next lecture turns to information theory, starting from entropy and coding, with a quite different structure.
