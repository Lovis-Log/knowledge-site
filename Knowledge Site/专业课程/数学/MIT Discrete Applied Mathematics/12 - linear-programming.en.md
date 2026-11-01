---
slug: 12-linear-programming
title: "Introduction to Linear Programming: Modelling, Standard Form and Duality"
summary: "We build linear programs for a diet problem and a bake sale, convert freely between standard and canonical form, then derive the dual by weighting constraints and prove weak duality."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [optimization, linear-programming, duality, modeling]
sources:
  - kind: video
    title: "Lecture 12: Introduction to Linear Programming"
    url: https://www.youtube.com/watch?v=qKNkP6IfjvY
    author: Peter Shor, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## What linear programming does

A linear program (LP) is: **maximise or minimise a linear function subject to linear constraints**. It is the engine behind a great deal of optimisation — the lecture notes that when CPLEX appeared in 1987 it became the dominant solver, and the commercial sums involved show how much it matters.

This lecture does four things: writes two models, defines standard and canonical form, shows how to convert between them, and derives the dual.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Why linear programming matters |
| 1:54 | The diet problem: nutritional requirements and two grains |
| 10:04 | The bake sale: cookies and meringues |
| 14:55 | Feasible and optimal solutions; drawing the feasible region |
| 19:39 | Standard form and canonical form |
| 22:16 | Four transformations that put any LP into either form |
| 28:44 | Why two forms: simplex needs standard form, duality needs canonical form |
| 31:17 | Basic feasible solutions and the idea of the simplex method |
| 41:18 | Duality: upper bounds from weighted combinations of constraints |
| 57:26 | The dual formula for canonical form |
| 59:53 | Weak duality and its proof |
| 1:02:26 | Strong duality (statement) |
| 1:06:48 | The dual of the dual is the primal |

## Example 1: the diet problem

Feed some mice. They need $8$ units of starch, $15$ of protein and $7$ of vitamins. Grain 1 supplies $(5,4,2)$ per unit at $0.60$; grain 2 supplies $(7,2,1)$ at $0.35$.

Let $x_1,x_2$ be the amounts of the two grains:

$$
\begin{aligned}
\min\quad & 60x_1+35x_2\\
\text{s.t.}\quad
& 5x_1+7x_2\ge 8 &&\text{(starch)}\\
& 4x_1+2x_2\ge 15 &&\text{(protein)}\\
& 2x_1+x_2\ge 7 &&\text{(vitamins)}\\
& x_1,x_2\ge 0 .
\end{aligned}
$$

(Prices in cents.) The final line, the **non-negativity constraints**, is easy to forget and is not decoration: without it the model can regard a negative amount of grain as a saving, while negative grain has no physical meaning. Solvers usually treat non-negativity separately from the other constraints.

The modelling recipe is fixed: choose variables, write the objective, write the constraints, hand it to a solver. This course does not teach hand-solving — in practice you would not either.

## Example 2: the bake sale

You sell cookies and meringues. A batch of cookies needs $1$ egg, $2$ cups of sugar and $1.5$ cups of flour; a batch of meringues needs $3$ eggs, $1$ cup of sugar and no flour. You have $9$ eggs, $8$ cups of sugar and $15$ cups of flour. Each batch sells for $\$20$.

Let $x_1$ be batches of cookies and $x_2$ batches of meringues:

$$
\begin{aligned}
\max\quad & 20x_1+20x_2\\
\text{s.t.}\quad
& x_1+3x_2\le 9 &&\text{(eggs)}\\
& 2x_1+x_2\le 8 &&\text{(sugar)}\\
& 1.5x_1\le 15 &&\text{(flour)}\\
& x_1,x_2\ge 0 .
\end{aligned}
$$

**The feasible region.** With two variables it can be drawn. The first constraint's boundary passes through $(0,3)$ and $(9,0)$; the second through $(0,8)$ and $(4,0)$. The flour constraint $x_1\le10$ is redundant: every point satisfying the first two satisfies it. The feasible region is the quadrilateral cut out by the two lines and the axes.

A **feasible solution** satisfies all constraints (not necessarily optimally); an **optimal solution** optimises the objective among feasible points. For instance $(2,2)$ is feasible with value $80$, and $(3,2)$ is feasible with value $100$. We will see that $100$ is optimal.

## Two standard forms

**Standard form:**

$$
\max\; c^Tx
\quad\text{s.t.}\quad
Ax=b,\;\; x\ge0 .
$$

**Canonical form:**

$$
\max\; c^Tx
\quad\text{s.t.}\quad
Ax\le b,\;\; x\ge0 .
$$

**Theorem.** Any linear program can be put into standard or canonical form.

Four transformations:

**1. Minimisation to maximisation.** $\min 3x_1+5x_2$ is equivalent to $\max -3x_1-5x_2$: same optimiser, objective negated.

**2. Split a free variable.** If $x_i$ may have either sign, set

$$
x_i=x_i^+-x_i^-,\qquad x_i^+,x_i^-\ge0 .
$$

Every real number is a difference of two non-negative numbers (for example $-3=0-3$), so all variables become non-negative.

**3. Inequalities to equations with slack or surplus variables.**

$$
x_1+3x_2\le9
\;\Longleftrightarrow\;
x_1+3x_2+s=9,\quad s\ge0 ,
$$

where $s$ is a **slack variable**, and

$$
x_1+3x_2\ge9
\;\Longleftrightarrow\;
x_1+3x_2-s=9,\quad s\ge0 ,
$$

where $s$ is a **surplus variable**.

**4. Equations become two inequalities; $\ge$ becomes $\le$ after negation.**

$$
x_1+3x_2=9
\;\Longleftrightarrow\;
x_1+3x_2\le9 \ \text{and}\ x_1+3x_2\ge9 ,
$$

and $x_1+3x_2\ge9$ is rewritten as $-x_1-3x_2\le-9$, which is canonical.

The division of labour: **the simplex method uses standard form**, since it solves linear systems to find basic feasible solutions; **duality uses canonical form**, since all constraints point the same way and can be added with non-negative weights.

## Basic feasible solutions and the simplex method

**Theorem.** If a linear program has an optimal solution, then some **basic feasible solution** is optimal.

Geometrically, basic feasible solutions are the **vertices** of the feasible region. The bake-sale region is a quadrilateral, and one of its four vertices maximises $20x_1+20x_2$.

Why "basic"? In standard form each slack variable contributes a column. Pick a linearly independent set of columns — a **basis** — set the remaining variables to zero, and solve for the basic variables. The result is a basic solution; if it is non-negative it is a basic feasible solution.

**The simplex method** starts at a basic feasible solution and walks along an edge of the feasible region to a neighbouring vertex, each step improving the objective, until no neighbour is better. Dantzig's method worked extremely well in practice, yet for a long time every pivot rule admitted examples requiring exponentially many steps. Spielman and Teng's **smoothed analysis** finally explained why it is fast almost always.

## Duality: upper bounds from combining constraints

Back to the bake sale. **A feasible solution gives a lower bound**: $(3,2)$ is feasible with value $100$, so the optimum is at least $100$.

**Where does an upper bound come from?** Weight and add the constraints. Take $y_1=4$, $y_2=8$:

$$
4(x_1+3x_2)+8(2x_1+x_2)=20x_1+20x_2 .
$$

The two brackets are at most $9$ and $8$, and the weights are non-negative, so

$$
20x_1+20x_2\le4\cdot9+8\cdot8=36+64=100 .
$$

The bounds meet, so the optimum is exactly $100$. Those weights form a **dual optimal solution** and act as a certificate of optimality.

In general, for canonical form

$$
\max\; c^Tx\quad\text{s.t.}\quad Ax\le b,\;x\ge0,
$$

take weights $y\ge0$, multiply row $i$ by $y_i$ and add. To cover the objective coefficients on the left we need

$$
A^Ty\ge c .
$$

Under that condition,

$$
c^Tx\le (A^Ty)^Tx=y^TAx\le y^Tb,
$$

so $y^Tb$ is an upper bound. The tightest such bound solves

$$
\min\; b^Ty\quad\text{s.t.}\quad A^Ty\ge c,\;y\ge0 ,
$$

the **dual program**. The correspondence:

| Primal (canonical) | Dual |
| --- | --- |
| Maximise $c^Tx$ | Minimise $b^Ty$ |
| Matrix $A$ | Transpose $A^T$ |
| Right-hand side $b$ | Becomes objective coefficients |
| Objective coefficients $c$ | Become right-hand side |
| $x\ge0$ | $y\ge0$ |

Why $y\ge0$? If some $y_i<0$, multiplying a $\le$ constraint flips its inequality, and adding the results would prove nothing.

## Weak and strong duality

**Weak duality.** If $x$ is primal feasible and $y$ is dual feasible, then

$$
c^Tx\le b^Ty .
$$

**Proof.** From dual feasibility $A^Ty\ge c$, left-multiply by $x^T\ge0$:

$$
c^Tx\le (A^Ty)^Tx=y^TAx .
$$

From primal feasibility $Ax\le b$ and $y\ge0$, left-multiply by $y^T$:

$$
y^TAx\le y^Tb .
$$

Chaining the two gives the claim. The whole proof rests on one fact: a non-negative weight times an inequality does not flip it.

**Strong duality (stated; proved next lecture).** If the primal optimum $z^*$ is finite, so is the dual optimum $w^*$, and $z^*=w^*$.

**The dual of the dual is the primal.** Put the dual $\min b^Ty$, $A^Ty\ge c$, $y\ge0$ into canonical form (negate to get a maximisation with $\le$), take the dual to get $\min -c^Tx$, $-Ax\ge-b$, $x\ge0$, then negate again to recover the primal. This is where the name comes from.

## What this lecture establishes

- An LP is a linear objective, linear constraints and non-negativity; model by choosing variables, objective, constraints.
- Standard form is $Ax=b,\ x\ge0$; canonical form is $Ax\le b,\ x\ge0$; either converts to the other.
- Four conversions: negate, split free variables, add slack/surplus, split equations into two inequalities.
- Basic feasible solutions are vertices; simplex walks along edges to the best vertex.
- The dual weights the constraints to bound the optimum; the weights are the certificate.
- Weak duality: no primal feasible value exceeds any dual feasible value.

## Comprehension check

**1. Write the full diet model and explain why non-negativity cannot be dropped.**

Reference answer:

$$
\min\ 60x_1+35x_2\quad\text{s.t.}\quad 5x_1+7x_2\ge8,\;4x_1+2x_2\ge15,\;2x_1+x_2\ge7,\;x_1,x_2\ge0 .
$$

Without $x_1,x_2\ge0$ the model allows negative amounts of grain, which are physically meaningless; the feasible set no longer describes the problem. Non-negativity is part of the problem, not a solution technique.

**2. Convert to canonical form: $\min 3x_1+5x_2$ subject to $x_1+x_2\ge4$, $x_1-2x_2\le6$, $x_1\ge0$, $x_2$ free.**

Reference answer: Set $x_2=x_2^+-x_2^-$ with $x_2^\pm\ge0$; negate the objective to maximise; negate the $\ge$ constraint:

$$
\max\ -3x_1-5x_2^++5x_2^-
\quad\text{s.t.}\quad
-x_1-x_2^++x_2^-\le-4,\;\;
x_1-2x_2^++2x_2^-\le6,\;\;
x_1,x_2^+,x_2^-\ge0 .
$$

**3. Turn $x_1+3x_2\le9$ into an equation; what if it were $\ge9$?**

Reference answer: For $\le$, add a slack $s\ge0$: $x_1+3x_2+s=9$. For $\ge$, subtract a surplus $s\ge0$: $x_1+3x_2-s=9$. Both preserve the solution set of the original inequality.

**4. For the bake sale, give a feasible solution, an upper-bound certificate, and the optimum.**

Reference answer: $x=(3,2)$ is feasible: $3+6=9$ and $6+2=8$, objective $100$. The certificate is the dual feasible $y=(4,8)$: $4(x_1+3x_2)+8(2x_1+x_2)=20x_1+20x_2\le4\cdot9+8\cdot8=100$, with $y_1+2y_2=20\ge20$, $3y_1+y_2=20\ge20$ and $y\ge0$. The bounds agree, so the optimum is $100$.

**5. Prove weak duality.**

Reference answer: From $A^Ty\ge c$ and $x\ge0$ we get $c^Tx\le(A^Ty)^Tx$. Using $(A^Ty)^Tx=y^TAx$, $Ax\le b$ and $y\ge0$ gives $y^TAx\le y^Tb$. Hence $c^Tx\le y^TAx\le y^Tb$: every primal feasible value is at most every dual feasible value.

**6. Why split an equation into two inequalities rather than something else?**

Reference answer: $a^Tx=b$ is exactly equivalent, as a set of solutions, to "$a^Tx\le b$ and $a^Tx\ge b$", and this introduces no new variables. Since canonical form allows only $\le$, the second is rewritten as $-a^Tx\le-b$. The advantage is that every constraint now has the same orientation, so the sign rules for dual weights are uniform.

## Relation to neighbouring lectures

The lecture sets up modelling and duality but leaves strong duality as a statement. The next lecture gives three proof routes (simplex tableau, Farkas' lemma, a mechanical analogy), uses complementary slackness to recover a dual optimum from a primal one, and closes with König's theorem for bipartite graphs. Further on, duality becomes the minimax theorem for zero-sum games and the max-flow min-cut theorem.
