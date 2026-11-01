---
slug: 14-zero-sum-games
title: "Zero-Sum Games, Mixed Strategies and the Minimax Theorem"
summary: "A payoff matrix describes a two-player zero-sum game. Pure Nash equilibria may fail to exist, so we pass to mixed strategies, write 'no profitable deviation' as linear inequalities, and prove von Neumann's minimax theorem by linear programming duality."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [game-theory, zero-sum-games, linear-programming, minimax]
sources:
  - kind: video
    title: "Lecture 14: Zero-Sum Games"
    url: https://www.youtube.com/watch?v=o6blhvYXfq4
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## Four ingredients of a game

A **two-player zero-sum game** consists of:

- the **row player**, Alice, with $m$ strategies (the $m$ rows);
- the **column player**, Bob, with $n$ strategies (the $n$ columns);
- a **payoff matrix** $C\in\mathbb R^{m\times n}$, where $C_{ij}$ is the amount Bob pays Alice when Alice plays $i$ and Bob plays $j$ (negative means Alice pays Bob);
- the name "zero-sum" because the two players' gains add to $0$: whatever Alice wins, Bob loses.

General games can give each player their own payoff matrix; only in the zero-sum case does one matrix carry all the information, and only then can the linear programs be written.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Definition and the payoff matrix |
| 3:38 | Matching pennies: the $2\times2$ example |
| 6:46 | A $3\times3$ example, played live in class |
| 14:09 | Pure Nash equilibrium |
| 19:08 | Matching pennies has no pure equilibrium |
| 21:33 | Mixed strategies and mixed Nash equilibrium |
| 28:23 | Why it suffices to check deviations to pure strategies |
| 33:57 | von Neumann's minimax theorem |
| 41:51 | Corollary: every zero-sum game has a mixed equilibrium |
| 48:14 | The lemma reducing infinitely many constraints to finitely many |
| 55:07 | Proof of the minimax theorem by LP duality |
| 1:02:37 | Solving the $3\times3$ example and the game value |

## Example 1: matching pennies

Both players reveal heads (H) or tails (T). If the coins match, Alice wins $\$1$; otherwise she loses $\$1$. The payoff matrix (rows for Alice, columns for Bob) is

$$
C=\begin{bmatrix}
1&-1\\
-1&1
\end{bmatrix}.
$$

(first row H, second T; first column H, second T). The matrix is symmetric under transposition, so the players are in identical positions — intuitively neither has an edge.

## Example 2: a $3\times3$ game

Two students play live in class with payoff matrix

$$
C=\begin{bmatrix}
2&-1&3\\
2&2&-3\\
-1&2&-3
\end{bmatrix}.
$$

Even at $3\times3$ it is no longer obvious who is favoured. That is exactly where theory is needed: staring at the matrix does not answer the question.

## Pure Nash equilibrium

A strategy pair $(i,j)$ is a **pure Nash equilibrium** if neither player gains by changing unilaterally. In a zero-sum game this becomes a pair of inequalities:

- row player does not deviate: for all $i'$, $C_{i'j}\le C_{ij}$;
- column player does not deviate: for all $j'$, $C_{ij'}\ge C_{ij}$.

The directions are opposite because Bob's payoff is $-C_{ij}$: Bob wants to lose less, which means Alice wins less, and multiplying by $-1$ flips the inequality.

**Matching pennies has no pure equilibrium.** Check the four cells: at $(H,H)$ Bob switches to T and wins $\$1$; at $(H,T)$ Alice switches to T and wins $\$1$; at $(T,H)$ Alice switches to H and wins; at $(T,T)$ Bob switches to H and wins. Every cell gives someone a profitable deviation.

The deeper reason: a pure strategy is **announced and exploitable**. Once the opponent knows your deterministic choice, they can always respond to it.

## Mixed strategies

A **mixed strategy** is a probability distribution over the strategy set. Write

$$
\Delta_m=\Big\{x\in\mathbb R^m: x_i\ge0,\ \sum_i x_i=1\Big\},
$$

and $\Delta_n$ similarly. A player announces a distribution $x$ (or $y$), not a single strategy.

Expected payoff:

$$
\mathbb E[C]=x^TCy=\sum_{i=1}^{m}\sum_{j=1}^{n}x_iC_{ij}y_j .
$$

A **mixed Nash equilibrium** is a pair $(x,y)$ with $x\in\Delta_m$, $y\in\Delta_n$ such that neither player has a profitable deviation:

- row: for all $i'$, $(C^Ty)_{i'}\le x^TCy$;
- column: for all $j'$, $(Cx)_{j'}\ge x^TCy$.

### Why checking deviations to pure strategies suffices

The definition checks "deviate from $x$ to some pure strategy $i'$" and never checks another distribution $x'$. The reason is an averaging identity:

$$
(x')^TCy=\sum_{i'}x'_{i'}(C^Ty)_{i'} .
$$

If every pure payoff $(C^Ty)_{i'}$ is at most $x^TCy$, then every weighted average is too. Conversely, if some distribution $x'$ did better, some coordinate with positive probability would have to do better. So **checking pure deviations is equivalent to checking all deviations**, and the constraints collapse from infinitely many to finitely many.

That reduction is what makes the game writable as a linear program.

## The minimax theorem

**Theorem (von Neumann).** There is a real number $\lambda^*$ with

$$
\lambda^*=\max_{x\in\Delta_m}\min_{y\in\Delta_n}x^TCy
=\min_{y\in\Delta_n}\max_{x\in\Delta_m}x^TCy .
$$

This carries far more meaning than it appears to.

- The left order: the row player picks $x$ first and the column player responds. That disadvantages the row player — they must commit.
- The right order: the column player picks $y$ first and the row player responds. That disadvantages the column player.

With pure strategies the order matters enormously: in matching pennies, if Alice must reveal first, Bob always wins. The theorem says that with **mixed** strategies the order no longer matters: both orders produce the same number $\lambda^*$, the **value of the game**. Simultaneous play is equivalent to either.

### Corollary: every zero-sum game has a mixed equilibrium

Take $x^*$ optimal for the inner problem on the right and $y^*$ optimal for the inner problem on the left. By the meaning of the value,

$$
\text{for all }y\in\Delta_n:\quad (x^*)^TCy\ge\lambda^*,
\qquad
\text{for all }x\in\Delta_m:\quad x^TCy^*\le\lambda^* .
$$

The first says $x^*$ guarantees Alice at least $\lambda^*$; the second says $y^*$ holds Bob's loss to at most $\lambda^*$. Taking $x=x^*$, $y=y^*$,

$$
(x^*)^TCy^*\ge\lambda^*\quad\text{and}\quad (x^*)^TCy^*\le\lambda^*,
$$

so $(x^*)^TCy^*=\lambda^*$. Neither player can improve, so $(x^*,y^*)$ is a mixed Nash equilibrium.

## Proof by linear programming duality

### A lemma

Turn infinitely many constraints into finitely many:

$$
\Big(\forall y\in\Delta_n:\ x^TCy\ge\lambda\Big)
\iff
\Big(\forall j:\ x^TCe_j\ge\lambda\Big),
$$

where $e_j$ is the $j$-th standard basis vector (the pure strategy $j$).

"$\Rightarrow$" is immediate. For the converse, any $y\in\Delta_n$ is $y=\sum_j y_je_j$ with non-negative weights summing to one, so by linearity

$$
x^TCy=\sum_j y_j\,(x^TCe_j)\ge\sum_j y_j\lambda=\lambda .
$$

Hence constraints over all distributions follow from constraints over pure strategies.

### Two mutually dual programs

**Scenario 2 (row commits first):**

$$
\begin{aligned}
\max\quad & \lambda\\
\text{s.t.}\quad & x^TCe_j\ge\lambda &&\forall j\\
& \textstyle\sum_i x_i=1\\
& x\ge0 .
\end{aligned}
$$

Find a distribution $x$ guaranteeing expected payoff at least $\lambda$ however Bob responds, and make $\lambda$ as large as possible.

**Scenario 1 (column commits first):**

$$
\begin{aligned}
\min\quad & \lambda\\
\text{s.t.}\quad & e_i^TCy\le\lambda &&\forall i\\
& \textstyle\sum_j y_j=1\\
& y\ge0 .
\end{aligned}
$$

Find a distribution $y$ holding expected loss to at most $\lambda$ however Alice responds, and make $\lambda$ as small as possible.

**They are dual.** Each constraint supplies a dual variable: the $m$ row constraints give the coordinates of $x$, the $n$ column constraints the coordinates of $y$, and the free dual variables of the two equality constraints are exactly $\lambda$. In matrix form, $C^Tx\ge\lambda\mathbf 1$ is dual to $Cy\le\lambda\mathbf 1$ with the transpose relation.

**Both are feasible**: pick any $x\in\Delta_m$ and $y\in\Delta_n$ and choose $\lambda$ small (or large) enough. Strong duality then gives equal optimal values:

$$
\max_x\min_y x^TCy=\min_y\max_x x^TCy .
$$

That is the minimax theorem. The lecture also reads weak duality this way: a feasible solution in one scenario is a **certificate** for the other — exhibiting a strategy for Bob proves Alice cannot do better.

## Back to the $3\times3$ game

Feeding the matrix to a solver (or solving by hand) gives

$$
\lambda^*=\frac13,\qquad
x^*=\Big(\tfrac59,0,\tfrac49\Big),\qquad
y^*=\Big(0,\tfrac23,\tfrac13\Big).
$$

Check:

$$
(x^*)^TC=\Big(\tfrac23,\tfrac13,\tfrac13\Big),
\qquad
Cy^*=\Big(\tfrac13,\tfrac13,\tfrac13\Big)^T,
$$

so $(x^*)^TCy^*=\frac59\cdot\frac13+\frac49\cdot\frac13=\frac13$.

Two conclusions:

- **The row player is favoured.** The positive game value means that under rational play Alice averages $\$1/3$ per round. The live classroom game briefly favoured Bob, but that was before play converged to equilibrium.
- **Some strategies should never be played.** Alice's strategy 2 has probability $0$ and Bob's strategy 1 has probability $0$, even if both appeared in class; they are not part of optimal play.

### Reading it with complementary slackness

The first component of $(x^*)^TC$ is $\frac23>\frac13$; the other two equal $\frac13$. Why is $y^*_1=0$?

Complementary slackness: a dual constraint that is not tight forces its primal variable to zero. If Bob put positive probability on column 1, Alice's expected payoff would exceed $\frac13$, contradicting the value. So column 1 must receive probability zero. Conversely, all three components of $Cy^*$ equal $\frac13$, so no extra constraint is placed on $x^*$.

The game-theoretic reading is: **optimal strategies and the vectors of expected payoffs must be compatible** — where the payoff is not tight, no weight may be placed.

## What this lecture establishes

- A zero-sum game is fully described by $C$; Alice receives $C_{ij}$, Bob receives $-C_{ij}$.
- A pure Nash equilibrium is a pair nobody wants to leave after announcing; matching pennies has none.
- A mixed strategy is a distribution; expected payoff is $x^TCy$.
- Only deviations to pure strategies need checking, since distribution payoffs are weighted averages.
- Minimax: $\max_x\min_y x^TCy=\min_y\max_x x^TCy=\lambda^*$; commitment order is irrelevant.
- Every zero-sum game has a mixed equilibrium, proved by strong LP duality.
- The game value says who is favoured; complementary slackness explains which strategies get zero probability.

## Comprehension check

**1. Write the matching-pennies matrix and prove there is no pure Nash equilibrium.**

Reference answer:

$$
C=\begin{bmatrix}1&-1\\-1&1\end{bmatrix}.
$$

Check all four cells: at $(H,H)$ Bob gains by switching to T; at $(H,T)$ Alice gains by switching to T; at $(T,H)$ Alice gains by switching to H; at $(T,T)$ Bob gains by switching to H. Every cell admits a profitable deviation, so no pure equilibrium exists.

**2. Why is it enough to check deviations to pure strategies in a mixed equilibrium?**

Reference answer: Fix $y$. The payoff of any distribution $x'$ is $(x')^TCy=\sum_i x'_i(C^Ty)_i$, a weighted average of pure-strategy payoffs. If every pure payoff is at most $x^TCy$, so is every average; conversely, a better distribution implies a better pure strategy with positive weight. The two conditions are therefore equivalent.

**3. State the minimax theorem and explain the game-theoretic meaning of the two orders.**

Reference answer: $\max_x\min_y x^TCy=\min_y\max_x x^TCy=\lambda^*$. The left side has the row player commit to $x$ first and the column player respond — the order that disadvantages the row player; the right side has the column player commit first. The theorem says that with mixed strategies both orders give the same value, so committing first costs nothing.

**4. Prove the minimax theorem with LP duality.**

Reference answer: Scenario 2 is $\max\lambda$ subject to $x^TCe_j\ge\lambda$, $\sum x_i=1$, $x\ge0$. Scenario 1 is $\min\lambda$ subject to $e_i^TCy\le\lambda$, $\sum y_j=1$, $y\ge0$. They are dual: the constraint matrices transpose, objective and right-hand sides swap, and the free dual variables of the equalities are $\lambda$. Both are feasible (any distributions, with suitable $\lambda$), so strong duality makes the optimal values equal — the minimax theorem.

**5. For the $3\times3$ example verify $x^*=(5/9,0,4/9)$, $y^*=(0,2/3,1/3)$ gives value $1/3$, and explain $y^*_1=0$ via complementary slackness.**

Reference answer: $(x^*)^TC=\frac59(2,-1,3)+\frac49(-1,2,-3)=(2/3,1/3,1/3)$ and $Cy^*=\frac23(-1,2,2)+\frac13(3,-3,-3)=(1/3,1/3,1/3)$. Hence $(x^*)^TCy^*=\frac59\cdot\frac13+\frac49\cdot\frac13=\frac13$. Since the first component of $(x^*)^TC$ is $2/3>1/3$, that dual constraint is not tight, so complementary slackness forces $y^*_1=0$; otherwise Bob's weight on column 1 would raise Alice's payoff above the value.

## Relation to neighbouring lectures

The previous lecture's strong duality and complementary slackness receive their first game-theoretic reading here: primal and dual are the two players' optimal strategies and the game value is their common optimum. The next lecture carries the same LP machinery to network flows, deriving max-flow min-cut as the dual — the third full run of the "write the LP, take the dual, read off the combinatorial meaning" template.
