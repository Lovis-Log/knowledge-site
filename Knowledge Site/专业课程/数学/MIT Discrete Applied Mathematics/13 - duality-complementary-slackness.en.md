---
slug: 13-duality-complementary-slackness
title: "Duality for General Linear Programs and Complementary Slackness"
summary: "We extend duality beyond canonical form, prove complementary slackness and use it to recover a dual optimum from a primal one, prove strong duality via a mechanical analogy, and finish with König's theorem."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [linear-programming, duality, complementary-slackness, matching]
sources:
  - kind: video
    title: "Lecture 13: Duality in Linear Programming"
    url: https://www.youtube.com/watch?v=oyVZ3rao6M4
    author: Peter Shor, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## From canonical form to arbitrary programs

The previous lecture defined the dual only for canonical form, where every constraint is $Ax\le b$ and every variable is non-negative. Real problems mix constraint directions and allow variables of either sign, so this lecture supplies the general rules and then proves the two central theorems: complementary slackness and strong duality.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap: the canonical dual and weak duality |
| 2:42 | Three fates of an LP: finite optimum, infeasible, unbounded |
| 4:16 | Consequences: an unbounded primal has an infeasible dual |
| 6:41 | Sign rules for taking the dual of an arbitrary LP |
| 14:42 | An easier route: normalise to canonical form first |
| 19:18 | The complementary slackness theorem |
| 28:45 | Using it to recover a dual optimum from a primal optimum |
| 33:23 | Three proof routes to strong duality |
| 36:47 | The mechanical proof of strong duality |
| 53:17 | Application: König's theorem (max matching = min vertex cover) |

## Three possible fates

Every linear program is exactly one of:

1. **Finite optimum**: feasible, and the optimal value is finite.
2. **Infeasible**: the feasible set is empty, e.g. $x_1\ge5$ and $x_1\le3$.
3. **Unbounded**: feasible, but the objective can be made arbitrarily large (or small), e.g. $\max x$ with $x\ge3$.

Weak duality gives two consequences at once:

- If the primal is unbounded, the dual is **infeasible**. Otherwise any dual feasible $y$ would give an upper bound $b^Ty$, contradicting unboundedness.
- If the dual is unbounded, the primal is infeasible.

Primal and dual may also be **infeasible simultaneously**. This is rare but not contradictory: weak duality only says that if both are feasible, the inequality holds.

## Duals of arbitrary programs

Let the primal be a maximisation. One table decides everything:

| Primal | Dual |
| --- | --- |
| Constraint $i$ is $\le$ | $y_i\ge0$ |
| Constraint $i$ is $\ge$ | $y_i\le0$ |
| Constraint $i$ is $=$ | $y_i$ free |
| Variable $x_j\ge0$ | Dual constraint $j$ is $\ge$ |
| Variable $x_j\le0$ | Dual constraint $j$ is $\le$ |
| Variable $x_j$ free | Dual constraint $j$ is $=$ |

The reason is the proof of weak duality: to add constraints without flipping inequalities, weights on $\le$ constraints must be non-negative, weights on $\ge$ constraints non-positive, and weights on equations arbitrary. Symmetrically, the sign of $x_j$ fixes the direction of the dual constraint.

**Example.** Primal:

$$
\max\;3x_1+5x_2-2x_3
$$
$$
\text{s.t.}\quad
x_1+x_2\le8,\qquad
x_1-x_3\ge1,\qquad
x_2+x_3=4,
$$
$$
x_1,x_3\ge0,\qquad x_2\ \text{free}.
$$

The table gives $y_1\ge0$, $y_2\le0$, $y_3$ free, so the dual is

$$
\min\;8y_1+1\cdot y_2+4y_3
$$
$$
\text{s.t.}\quad
y_1+y_2\ge3,\qquad
y_1+y_3=5,\qquad
-y_2+y_3\ge-2,
$$
$$
y_1\ge0,\quad y_2\le0,\quad y_3\ \text{free}.
$$

(The coefficient of $y_2$ is $1$ because the right-hand side of the second constraint is $1$; writing that constraint as $-x_1+x_3\le-1$ would produce $-1$ instead, with the same dual.)

### An easier route

The lecture admits a dislike for the "negative variable" rule, because mistakes are easy. The alternative is to **normalise the primal to canonical form first, then apply the previous lecture's formula**.

For the example: negate the second constraint to $-x_1+x_3\le-1$, keep the free variable but give its dual constraint an equality, and read off

$$
\min\;8y_1-y_2+4y_3
\quad\text{s.t.}\quad
y_1-y_2\ge3,\;\;
y_1+y_3=5,\;\;
y_2+y_3\ge-2,\;\;
y_1,y_2\ge0,\;y_3\ \text{free}.
$$

Now every dual variable points the intuitive way; nothing says "$y_2\le0$".

## Complementary slackness

**Theorem.** Let $x$ be primal feasible and $y$ dual feasible, for the canonical pair. Then $x$ and $y$ are **both optimal** if and only if

$$
\text{for every } i:\quad y_i=0\ \text{or}\ (Ax)_i=b_i,
$$
$$
\text{for every } j:\quad x_j=0\ \text{or}\ (A^Ty)_j=c_j .
$$

In words: **a tight constraint may carry a nonzero dual weight; a slack constraint must carry zero weight.** Conversely, a nonzero primal variable forces its dual constraint to be tight.

### Proof

The chain behind weak duality is

$$
c^Tx\;\le\;(A^Ty)^Tx\;=\;y^TAx\;\le\;y^Tb .
$$

If both are optimal, strong duality makes the ends equal, so both inequalities must be equalities.

For the first: $A^Ty\ge c$ and $x\ge0$, so

$$
(A^Ty-c)^Tx\ge0 .
$$

Equality forces this non-negative quantity to be $0$. It is a sum of $m$ non-negative terms $\sum_j (A^Ty-c)_jx_j$, so every term is zero: for each $j$, either $x_j=0$ or $(A^Ty)_j=c_j$.

For the second: $b-Ax\ge0$ and $y\ge0$, so

$$
y^T(b-Ax)\ge0 .
$$

Equality forces every term $y_i(b_i-(Ax)_i)$ to vanish: for each $i$, either $y_i=0$ or $(Ax)_i=b_i$.

Conversely, if all these conditions hold, both inequalities are equalities, so $c^Tx=y^Tb$ and weak duality makes both optimal.

### Recovering a dual solution

Return to the example. Suppose $x=(4,4,0)$ is known to be optimal (check: $4+4=8$ tight, $4-0=4\ge1$ slack, $4+0=4$ tight; objective $3\cdot4+5\cdot4-2\cdot0=32$).

Complementary slackness gives:

- $x_1=4\ne0$, so dual constraint 1 is tight: $y_1+y_2=3$.
- $x_2=4\ne0$, so dual constraint 2 is tight: $y_1+y_3=5$.
- Primal constraint 2 is slack ($4>1$), so $y_2=0$.

Solving gives $y_1=3$, $y_3=2$, $y_2=0$. Dual objective: $8\cdot3-1\cdot0+4\cdot2=24+8=32$, equal to the primal value — strong duality confirmed.

The practical lesson: **you do not have to solve a second LP; write down the linear system and solve it.**

## Three proofs of strong duality

The lecture lists three routes:

1. **The simplex tableau.** When the algorithm stops, the tableau yields optimal solutions of both problems, and they are equal. Completely rigorous, but depends on algorithmic detail.
2. **Farkas' lemma.** Taken from analysis. The objection is that Farkas' lemma is essentially strong duality in different notation, so the proof adds no insight.
3. **Mechanics in $n$ dimensions.** A few classical theorems from mechanics, with the LP pictured as a ball rolling on surfaces. The lecture chooses this one for its geometric intuition.

### The mechanical proof

Treat each constraint $A_ix\ge b_i$ as a hyperplane. Gravity points in the direction $\min c^Tx$, pulling the ball down until it comes to rest at the lowest point of the feasible region — the optimum.

Rest means force balance: **the support forces from all hyperplanes the ball touches sum to the gravitational force**. Let the force from hyperplane $i$ be

$$
\text{force}_i=y_i\,A_i,\qquad y_i\ge0,
$$

along the normal $A_i$ (pointing out of the feasible region) with magnitude $y_i$. Balance reads

$$
\sum_i y_iA_i=c,
\quad\text{i.e.}\quad
A^Ty=c .
$$

Now the contact conditions:

- If the ball touches hyperplane $i$, then the constraint is tight, $(Ax)_i=b_i$;
- If it does not touch it, that hyperplane exerts no force, so $y_i=0$.

That is exactly complementary slackness. Therefore

$$
y^T(Ax-b)=\sum_i y_i\big((Ax)_i-b_i\big)=0,
$$

while $A^Ty=c$ gives $y^TAx=c^Tx$, hence

$$
c^Tx=y^Tb .
$$

Primal and dual optima coincide, which is strong duality. The appeal is that "strong duality for linear programming" and "$n$-dimensional statics is consistent" become the same statement.

## Application: König's theorem

**Setting.** Let $G=(L\cup R,E)$ be a bipartite graph. A **matching** is a set of edges with no shared endpoint; a **vertex cover** is a set of vertices meeting every edge.

**Theorem (König).** The size of a maximum matching equals the size of a minimum vertex cover.

**One direction is immediate.** Any vertex cover must cover every matching edge, and matching edges are disjoint, so the cover needs at least as many vertices as the matching has edges.

**The other direction uses an LP.** Give each edge $e$ a variable $x_e\in[0,1]$ and write the matching as

$$
\max\;\sum_e x_e
\quad\text{s.t.}\quad
\sum_{e\ni v}x_e\le1\ \ \text{for every vertex }v,
\qquad x_e\ge0 .
$$

Each edge is chosen at most once and each vertex is used by at most one chosen edge — the "fractional" version of a matching. Its dual assigns $y_v\ge0$ to each vertex:

$$
\min\;\sum_v y_v
\quad\text{s.t.}\quad
y_u+y_v\ge1\ \ \text{for every edge }uv .
$$

That is a fractional vertex cover.

**Why can the optimum be integral?** Given a fractional solution, follow an alternating path or an even cycle of fractional edges and add $\pm\varepsilon$ alternately. Vertex constraints stay satisfied and the objective is unchanged; choosing $\varepsilon$ maximal drives some variable to $0$ or $1$. Bipartiteness rules out odd cycles, so the adjustment always exists, and all fractional values eventually disappear. Hence the matching LP has an integral optimum; the same argument works for the dual. The two integral optima are equal, which is König's theorem.

The lecture does not finish every detail, but the skeleton is complete: **write the combinatorial problem as an LP, show the relaxation still has integral optima, and let strong duality do the counting.**

## What this lecture establishes

- An LP has exactly one of three fates: finite optimum, infeasible, unbounded; an unbounded primal implies an infeasible dual.
- The dual of an arbitrary LP follows one sign table; normalising to canonical form first is safer.
- Complementary slackness: only tight constraints may carry dual weight, and only nonzero primal variables force tight dual constraints.
- It recovers a dual optimum directly from a primal optimum.
- Strong duality has a mechanical proof: force balance is $A^Ty=c$, contact conditions are complementary slackness.
- König's theorem — max matching equals min vertex cover — is strong duality for the matching LP.

## Comprehension check

**1. The primal is $\max c^Tx$; constraint 1 is $\ge$, variable 2 is free, variable 3 is $\le0$. What are the dual variable signs and dual constraint directions?**

Reference answer: Constraint 1 being $\ge$ gives $y_1\le0$; variable 2 being free makes dual constraint 2 an equality; variable 3 being $\le0$ makes dual constraint 3 a $\le$. If the negative-variable rule is unwelcome, negate constraints and variables first so everything is canonical, then apply the canonical formula.

**2. Use complementary slackness: primal $\max 3x_1+5x_2-2x_3$ with $x_1+x_2\le8$, $x_1-x_3\ge1$, $x_2+x_3=4$, and $x=(4,4,0)$ optimal.**

Reference answer: $x_1,x_2\ne0$ make dual constraints 1 and 2 tight; primal constraint 2 is slack ($4>1$), so $y_2=0$. Then $y_1+y_2=3$ gives $y_1=3$, and $y_1+y_3=5$ gives $y_3=2$. The dual objective is $8y_1-y_2+4y_3=24+0+8=32$, matching the primal value $32$.

**3. Prove complementary slackness in canonical form.**

Reference answer: Weak duality gives $c^Tx\le(A^Ty)^Tx\le y^Tb$. If both are optimal, strong duality makes the ends equal, so both inequalities are equalities. The first equality means $(A^Ty-c)^Tx=0$; since $A^Ty-c\ge0$ and $x\ge0$, this is a sum of non-negative terms, so each vanishes: $x_j=0$ or $(A^Ty)_j=c_j$. The second means $y^T(b-Ax)=0$; since $y\ge0$ and $b-Ax\ge0$, each term vanishes: $y_i=0$ or $(Ax)_i=b_i$. The converse follows by running the same chain backwards.

**4. In the mechanical proof, what is $y_i$, and why does "no contact" mean $y_i=0$?**

Reference answer: $y_i$ is the magnitude of the support force exerted by hyperplane $i$ on the ball, directed along the normal $A_i$. Without contact there is no force, so $y_i=0$; with contact the constraint is tight, $(Ax)_i=b_i$. Together these are complementary slackness. Force balance $\sum_i y_iA_i=c$ gives $A^Ty=c$, hence $c^Tx=y^TAx=y^Tb$ and strong duality.

**5. Why does the LP relaxation of bipartite matching always have an integral optimum?**

Reference answer: Take a fractional optimum. If a fractional edge exists, there is an alternating path or even cycle of fractional edges (bipartiteness excludes odd cycles). Add $\pm\varepsilon$ alternately along it: vertex constraints remain satisfied and the objective is unchanged, while the maximal feasible $\varepsilon$ sends at least one variable to $0$ or $1$. Iterating eliminates all fractional values, yielding an integral optimum. The same holds for the dual, so the two integral optima agree — König's theorem.

## Relation to neighbouring lectures

The previous lecture built the duality formula and weak duality; this one completes the general rules, complementary slackness and strong duality, and uses König's theorem to show the LP-plus-integrality pattern. The next lecture applies the toolkit to zero-sum games: the primal yields the row player's optimal mixed strategy, the dual the column player's, and strong duality becomes the minimax theorem. The max-flow min-cut theorem after that is the third appearance of the same template.
