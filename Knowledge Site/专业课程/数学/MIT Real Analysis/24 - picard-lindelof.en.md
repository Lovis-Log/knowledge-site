---
slug: 24-picard-lindelof
title: "The Picard–Lindelöf Theorem: Turning an ODE into a Fixed Point"
summary: "We prove the contraction mapping theorem, build the integral operator whose fixed points are solutions of the initial value problem, and use a closed ball with explicit constants to show that the operator is a contraction, yielding local existence and uniqueness."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, differential-equations, fixed-points, existence-uniqueness, metric-spaces]
sources:
  - kind: video
    title: "Lecture 23: Existence & Uniqueness for ODEs: Picard–Lindelöf Theorem"
    url: https://www.youtube.com/watch?v=fsbVJxOhRcU
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Does a differential equation always have a solution?

Consider the initial value problem

$$
y'(x)=f\bigl(y(x)\bigr)+g(x),
\qquad
y(0)=a,
$$

where $f$ is differentiable with $f'$ continuous, $g$ is continuous, and $a$ is a given real number.

This is not a problem with a plug-in formula. The nonlinearity $f$ can be arbitrary, and explicit solutions usually do not exist. The right questions are qualitative:

- **Existence**: given $a$, is there at least one solution?
- **Uniqueness**: if there are two solutions, must they coincide?

These questions recur throughout science and engineering: an equation models some natural process, and one first needs to know that a solution exists at all, then that it is unique — otherwise prediction is meaningless.

The **Picard–Lindelöf theorem** answers exactly these questions, and the answer is **local**: there is some $\delta>0$ such that a solution exists on $(-\delta,\delta)$ and is unique there. Why it can only be local is shown in the final lecture by the blow-up of $y'=y^2$.

The route of the proof is unexpected: it uses metric spaces. Specifically, the solution is written as a fixed point of an integral operator, and the contraction mapping theorem is applied to that operator.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Statement: the ODE, the initial condition, local existence and uniqueness |
| 6:14 | The metric space used: continuous functions with the sup distance |
| 8:19 | Tool one: $C([a,b])$ is Cauchy complete |
| 9:20 | Tool two: definition of a contraction |
| 12:21 | A contraction has at most one fixed point |
| 14:57 | Contraction mapping theorem: existence and uniqueness in a complete space |
| 16:19 | The iteration and the Cauchy estimate |
| 31:30 | The limit is a fixed point |
| 36:20 | Turning the ODE into a fixed point of an integral operator |
| 46:47 | Restricting to a closed ball: the constants $R$, $L_1$, $L_2$, $\delta_0$ |
| 51:09 | Proving that $T$ maps the ball into itself |
| 1:11:08 | Defining $M$ and the final $\delta$; beginning the contraction estimate |
| 1:19:30 | The mean value theorem gives $M|y_1-y_2|$ |

## Two tools

### Tool one: the sup metric and completeness

On the space $C(I)$ of continuous functions on an interval $I$, take

$$
d(h_1,h_2)=\max_{x\in I}|h_1(x)-h_2(x)| .
$$

It was proved earlier that $\bigl(C([a,b]),d\bigr)$ is Cauchy complete: every Cauchy sequence converges to a continuous function.

One more simple fact is needed: **a closed subset of a complete space is complete**. If $B$ is closed in a complete space $X$ and $(x_n)\subset B$ is Cauchy, then it converges in $X$ to some $x$; since $B$ is closed, $x\in B$. So Cauchy sequences in $B$ converge inside $B$.

### Tool two: contractions

**Definition.** Let $(X,d)$ be a metric space and $T:X\to X$. If there is a constant $c<1$ with

$$
d\bigl(T(x),T(y)\bigr)\le c\,d(x,y)
\quad\text{for all }x,y\in X,
$$

then $T$ is a **contraction**.

The constant must be strictly less than $1$. Equality is not enough: the identity map has $c=1$ and fixes every point, so the conclusion would collapse.

## Theorem one: a contraction has at most one fixed point

**Theorem.** If $T$ is a contraction, it has at most one fixed point.

**Proof.** Let $x$ and $y$ be fixed points:

$$
T(x)=x,
\qquad
T(y)=y .
$$

By the contraction property,

$$
d(x,y)=d\bigl(T(x),T(y)\bigr)\le c\,d(x,y).
$$

Move the right side over:

$$
(1-c)\,d(x,y)\le0 .
$$

Since $1-c>0$ and $d(x,y)\ge0$, necessarily $d(x,y)=0$, hence $x=y$. $\square$

Only two facts are used: the contraction property and positive definiteness. Completeness is not needed here; it is there for existence in the next theorem.

## Theorem two: the contraction mapping theorem

**Theorem.** Let $(X,d)$ be a Cauchy complete metric space and $T:X\to X$ a contraction. Then $T$ has a unique fixed point.

Uniqueness is already covered by theorem one; existence must be constructed.

### Step 1: iterate from an arbitrary point

Take any $x\in X$ and define

$$
x_0=x,
\qquad
x_1=T(x),
\qquad
x_2=T^2(x),
\qquad\dots
$$

that is, $x_n=T^n(x)$. Unlike Newton's method, no good starting point is needed — any point works, though convergence may be slower.

Goal: show that $(x_n)$ converges and that its limit $x_\infty$ satisfies $T(x_\infty)=x_\infty$.

### Step 2: consecutive errors shrink geometrically

For any $l\ge1$,

$$
\begin{aligned}
d(x_l,x_{l+1})
&=d\bigl(T^l(x),T^{l+1}(x)\bigr)\\
&=d\bigl(T(T^{l-1}x),T(T^{l}x)\bigr)\\
&\le c\,d\bigl(T^{l-1}x,T^{l}x\bigr).
\end{aligned}
$$

Each step back multiplies the error by $c$. Iterating,

$$
d(x_l,x_{l+1})\le c^{\,l}\,d(x_0,x_1).
$$

### Step 3: the distance between any two terms

Let $n\ge0$ and $k\ge1$. First iterate the contraction $n$ times at the level of maps:

$$
\begin{aligned}
d(x_n,x_{n+k})
&=d\bigl(T^n x,T^n(T^k x)\bigr)\\
&\le c^n\,d(x,T^k x).
\end{aligned}
$$

Now estimate $d(x,T^k x)$ by the triangle inequality, splitting it into $k$ consecutive differences:

$$
\begin{aligned}
d(x,T^k x)
&\le\sum_{j=0}^{k-1}d(x_j,x_{j+1})\\
&\le\sum_{j=0}^{k-1}c^j\,d(x,T x)
\le\frac{d(x,Tx)}{1-c}.
\end{aligned}
$$

The last step is the geometric series: since $c<1$, $\sum_{j=0}^{\infty}c^j=1/(1-c)$, and partial sums do not exceed it.

Combining,

$$
d(x_n,x_{n+k})
\le c^n\,\frac{d(x,Tx)}{1-c}.
$$

The right side does not depend on $k$, and $c^n\to0$ as $n\to\infty$. Hence for every $\varepsilon>0$ there is $N$ such that for $n\ge N$ and **every** $k\ge1$, $d(x_n,x_{n+k})<\varepsilon$. That is exactly the Cauchy condition.

The hypothesis $c<1$ is decisive: if $c=1$, $c^n$ does not decay and nothing follows.

### Step 4: take the limit

$X$ is complete, so $(x_n)$ converges. Write

$$
x_\infty=\lim_{n\to\infty}x_n .
$$

### Step 5: the limit is a fixed point

We show $T(x_\infty)=x_\infty$. Apply $T$ to the sequence:

$$
T(x_0),T(x_1),T(x_2),\dots
$$

Since $T(x_n)=x_{n+1}$, this is the original sequence with the first term removed, so it also converges to $x_\infty$.

On the other hand, compare $T(x_\infty)$ with $T(x_n)$ using the contraction property:

$$
d\bigl(T(x_\infty),T(x_n)\bigr)\le c\,d(x_\infty,x_n).
$$

As $x_n\to x_\infty$, the right side tends to $0$, so $T(x_n)\to T(x_\infty)$. But $T(x_n)=x_{n+1}\to x_\infty$. Limits in a metric space are unique, hence

$$
T(x_\infty)=x_\infty .
$$

So $x_\infty$ is a fixed point. $\square$

The structure is worth remembering: **the contraction property produces a Cauchy sequence, completeness supplies the limit, and the contraction property again shows that $T$ commutes with the limit**. The last step is in effect a proof that a contraction is continuous.

## Turning the ODE into a fixed point problem

Now the connection to differential equations.

### The map $T$

Let $I$ be an interval containing $0$. For a continuous $y:I\to\mathbb R$, define

$$
\bigl(T(y)\bigr)(x)=a+\int_0^x\bigl[f(y(s))+g(s)\bigr]\,ds .
$$

Check the properties one by one.

**$T(y)$ is continuous.** $y$ is continuous, $f$ is continuous (differentiable), $g$ is continuous, so the integrand is continuous; an integral with variable upper limit is continuous.

**$T(y)$ is differentiable with derivative $f(y)+g$.** By the fundamental theorem of calculus,

$$
\bigl(T(y)\bigr)'(x)=f\bigl(y(x)\bigr)+g(x).
$$

So the image of $T$ lies not merely in continuous functions but in continuously differentiable ones.

**The initial value is automatic.**

$$
\bigl(T(y)\bigr)(0)=a+\int_0^0\cdots=a .
$$

### Fixed points are exactly solutions

**If $y$ is a fixed point**, $y=T(y)$, then

$$
y(x)=a+\int_0^x\bigl[f(y(s))+g(s)\bigr]\,ds .
$$

The right side is differentiable, and by the fundamental theorem $y'(x)=f(y(x))+g(x)$; also $y(0)=a$. So $y$ solves the ODE.

**Conversely, if $y$ is a solution**, $y'=f(y)+g$ and $y(0)=a$, integrate $y'$ from $0$ to $x$:

$$
y(x)-y(0)=\int_0^x\bigl[f(y(s))+g(s)\bigr]\,ds .
$$

Substituting $y(0)=a$ gives $y=T(y)$. So $y$ is a fixed point.

Both directions are direct applications of the fundamental theorem of calculus. Hence

$$
\text{solutions of the ODE}\quad\longleftrightarrow\quad\text{fixed points of }T .
$$

## Restricting the space: why not work on all continuous functions

$T$ is **not** a contraction on all of $C(I)$. The obstruction is the term

$$
\bigl|f(y_1(s))-f(y_2(s))\bigr|\le M\,|y_1(s)-y_2(s)| ,
$$

where $M$ is the maximum of $|f'|$ on some range. But if $y_1,y_2$ take arbitrarily large values, $f'$ may be unbounded, $M$ may not exist, and the contraction property fails.

This is the same phenomenon as the need for a good starting point in Newton's method: the map is only locally contracting. The remedy is to restrict the space to a **closed ball**, on which $|f'|$ has a maximum and the contraction constant can be computed.

### The closed ball

Fix a radius $R>0$ and define

$$
B_R=\Bigl\{\,y\in C([-\delta_0,\delta_0]) : |y(x)|\le R\ \text{for all }x\,\Bigr\}.
$$

This is the **closed ball** of radius $R$ about the zero function in the space of continuous functions.

Why closed? Because only a closed subset inherits completeness. An open ball is not closed, a Cauchy sequence may converge to a boundary point outside it, and the completeness hypothesis of the contraction theorem would fail.

### Four constants

First take

$$
R=|a|+2 .
$$

The extra $2$ is slack for the integral terms: $a$ plus a quantity strictly below $2$ still lies inside the ball.

Since $f$ and $g$ are continuous, they attain maxima on compact sets. Define

$$
L_1=\max_{|z|\le R}|f(z)|,
\qquad
L_2=\max_{|z|\le1}|g(z)| .
$$

Then set

$$
\delta_0=\min\Bigl(1,\ \frac{1}{L_1+1},\ \frac{1}{L_2+1}\Bigr).
$$

Each choice has a job:

- $1$: ensures $[-\delta_0,\delta_0]\subset[-1,1]$, so that the bound $L_2$ for $g$ applies;
- $1/(L_1+1)$: ensures $\delta_0L_1<1$;
- $1/(L_2+1)$: ensures $\delta_0L_2<1$.

The $+1$ in the denominators only guards against dividing by zero when $L_1$ or $L_2$ vanishes, and it makes the inequalities strict.

### Step one: $T$ maps the ball into itself

We show: if $y\in B_R$ then $T(y)\in B_R$.

Continuity of $T(y)$ is known. It remains to bound the absolute value for $|x|\le\delta_0$. Let $|x|\le\delta_0$. By the triangle inequality and the integral inequality,

$$
\begin{aligned}
\bigl|T(y)(x)\bigr|
&\le |a|+\left|\int_0^x f(y(s))\,ds\right|
+\left|\int_0^x g(s)\,ds\right|\\
&\le |a|+\left|\int_0^x\bigl|f(y(s))\bigr|\,ds\right|
+\left|\int_0^x|g(s)|\,ds\right| .
\end{aligned}
$$

Now bound each piece.

**First piece.** $y\in B_R$ means $|y(s)|\le R$, so the argument of $f$ lies in $|z|\le R$; by the definition of $L_1$,

$$
\bigl|f(y(s))\bigr|\le L_1 .
$$

**Second piece.** $s$ lies between $0$ and $x$, and $|x|\le\delta_0\le1$, so $|s|\le1$; by the definition of $L_2$,

$$
|g(s)|\le L_2 .
$$

**Length.** The interval of integration has length $|x|\le\delta_0$.

Hence

$$
\bigl|T(y)(x)\bigr|\le |a|+\delta_0L_1+\delta_0L_2 .
$$

Substituting the two upper bounds on $\delta_0$,

$$
\delta_0L_1\le\frac{L_1}{L_1+1}<1,
\qquad
\delta_0L_2\le\frac{L_2}{L_2+1}<1 .
$$

Therefore

$$
\bigl|T(y)(x)\bigr|<|a|+2=R
$$

for all $|x|\le\delta_0$. So $T(y)\in B_R$, i.e.

$$
T:B_R\to B_R .
$$

Why this matters: the iteration must not leave the ball. If the map sent points outside, the contraction iteration could not be continued — exactly why the course insists that the space be stable under the map.

### Step two: the contraction property

One more constant. Define

$$
M=\max_{|z|\le R}|f'(z)| .
$$

$f'$ is continuous and attains a maximum on a compact set, so $M$ is a finite nonnegative number. Now shrink the interval to

$$
\delta=\min\Bigl(\delta_0,\ \frac{1}{2M+1}\Bigr).
$$

On $[-\delta,\delta]$, take again the ball of radius $R$, still denoted $B_R$. Since $\delta\le\delta_0$, the "maps into itself" property still holds.

Take $y_1,y_2\in B_R$ and estimate $T(y_1)-T(y_2)$. The constants $a$ cancel, and so do the $g$ terms:

$$
\bigl(T(y_1)\bigr)(x)-\bigl(T(y_2)\bigr)(x)
=\int_0^x\Bigl[f\bigl(y_1(s)\bigr)-f\bigl(y_2(s)\bigr)\Bigr]\,ds .
$$

Take absolute values and move the absolute value inside the integral:

$$
\bigl|T(y_1)(x)-T(y_2)(x)\bigr|
\le\left|\int_0^x\bigl|f(y_1(s))-f(y_2(s))\bigr|\,ds\right| .
$$

**Apply the mean value theorem to the integrand.** Fix $s$ and view $y_1(s)$, $y_2(s)$ as two numbers $z_1,z_2$. Since $y_1,y_2\in B_R$, both lie in $[-R,R]$. The mean value theorem gives a $z_3$ between $z_1$ and $z_2$ with

$$
f(z_1)-f(z_2)=f'(z_3)\,(z_1-z_2).
$$

Hence

$$
\bigl|f(y_1(s))-f(y_2(s))\bigr|
\le M\,\bigl|y_1(s)-y_2(s)\bigr|
\le M\,d(y_1,y_2).
$$

Substituting back into the integral,

$$
\bigl|T(y_1)(x)-T(y_2)(x)\bigr|
\le M\,d(y_1,y_2)\,|x|
\le \delta M\,d(y_1,y_2).
$$

Since $\delta\le1/(2M+1)$,

$$
\delta M\le\frac{M}{2M+1}<\frac12 .
$$

Therefore, for every $x$,

$$
\bigl|T(y_1)(x)-T(y_2)(x)\bigr|\le\frac12\,d(y_1,y_2).
$$

Taking the supremum (here $\sup=\max$, since $T(y_1)-T(y_2)$ is continuous),

$$
d\bigl(T(y_1),T(y_2)\bigr)\le\frac12\,d(y_1,y_2).
$$

So $c=1/2$ works, strictly less than $1$. $\square$

Note: the lecture reached this point just as time ran out; the final step $\delta M\le\tfrac12$ is completed at the start of the next lecture using the same estimate. Here the two halves are written together. The next lecture writes $M$ as $L$ and takes $\delta=1/(2L)$, with the same effect.

## Conclusion

Assembling the pieces:

1. $B_R$ is a closed subset of the complete space $C([-\delta,\delta])$, hence complete.
2. $T:B_R\to B_R$.
3. $T$ is a contraction on $B_R$ with constant $1/2$.
4. By the contraction mapping theorem, $T$ has a unique fixed point $y$.
5. Fixed points are exactly solutions of the ODE.

This proves **existence and local uniqueness** in the Picard–Lindelöf theorem: on $(-\delta,\delta)$ the ODE with initial value $a$ has exactly one solution.

What is proved is uniqueness "inside one small ball". If two solutions are defined on a larger interval, they must agree inside the ball; what happens outside requires the connectedness argument of the next lecture.

## What this lecture establishes

- A contraction has at most one fixed point; in a complete space it has exactly one.
- The iteration starts from an arbitrary point and errors shrink like $c^n$.
- Completeness supplies the limit; contraction supplies the Cauchy property and continuity of $T$.
- Solutions of the ODE are exactly fixed points of the integral operator $T$.
- $T$ is not a contraction on all continuous functions and must be restricted to a closed ball.
- The constants $R=|a|+2$ and $\delta_0=\min(1,1/(L_1+1),1/(L_2+1))$ make $T$ map the ball into itself; $\delta=\min(\delta_0,1/(2M+1))$ makes it a contraction with constant $1/2$.

## Comprehension check

**1. Prove that a contraction has at most one fixed point, and identify where $c<1$ is used.**

Reference answer: If $x,y$ are fixed points, then $d(x,y)=d(Tx,Ty)\le c\,d(x,y)$, so $(1-c)d(x,y)\le0$. Since $d\ge0$ and $1-c>0$, necessarily $d(x,y)=0$ and $x=y$. The hypothesis $c<1$ enters through "$1-c>0$": if $c=1$ the inequality becomes $0\le0$, which yields nothing (the identity map is a counterexample).

**2. Why is the iteration $(T^n x)$ Cauchy? Where does $c^n$ come from?**

Reference answer: Iterating the contraction $n$ times at the level of maps gives $d(T^n x,T^n(T^k x))\le c^n d(x,T^k x)$; each use of the contraction pulls out one factor $c$, and $n$ uses give $c^n$. Then $d(x,T^k x)$ is split by the triangle inequality into $k$ consecutive differences, each bounded by $c^j d(x,Tx)$, and the sum is dominated by the geometric series $d(x,Tx)/(1-c)$. Hence $d(T^n x,T^{n+k}x)\le c^n d(x,Tx)/(1-c)$, independent of $k$ and tending to $0$ with $n$, which is the Cauchy condition.

**3. Why is $T$ not a contraction on the whole space of continuous functions? What does restricting to a closed ball fix?**

Reference answer: The contraction estimate needs $|f(y_1(s))-f(y_2(s))|\le M|y_1(s)-y_2(s)|$, and $M=\max|f'|$ is finite only on a bounded region. If $y$ can take arbitrarily large values, $f'$ may be unbounded, $M$ may not exist, and the estimate fails. On the closed ball $B_R$ we have $|y(x)|\le R$, so $f'$ is continuous on the compact set $[-R,R]$, attains a maximum $M$, and the contraction property can be proved.

**4. What jobs do the $2$ in $R=|a|+2$ and the $+1$ in the denominators of $\delta_0$ do?**

Reference answer: The $2$ is slack for the two integral terms: the estimate gives $|Ty(x)|\le|a|+\delta_0L_1+\delta_0L_2$ with $\delta_0L_1<1$ and $\delta_0L_2<1$, so the two terms total strictly less than $2$ and $|Ty(x)|<R$, keeping the map inside the ball. The $+1$ in the denominators does two things: it avoids division by zero when $L_1$ or $L_2$ vanishes, and it turns $\delta_0L_i\le L_i/(L_i+1)$ into a strict inequality below $1$.

**5. Why must the ball be closed rather than open?**

Reference answer: The contraction mapping theorem requires a Cauchy complete space. A closed subset of a complete space is complete, but an open subset generally is not: a Cauchy sequence may converge to a boundary point lying outside the open ball. With an open ball the limit of the iteration could fall outside, and the theorem's hypothesis would fail. With a closed ball the limit stays inside, so both "maps into itself" and "complete" hold.

## Relation to neighbouring lectures

The previous lecture finished the interchange of differentiation and limits and rewrote the ODE as an integral equation. This lecture completes the technical work: a full proof of the contraction mapping theorem, the construction of the integral operator, the self-map and contraction properties on a closed ball, and finally local existence and uniqueness.

The next lecture does two things: first, use connectedness of intervals to upgrade "unique inside the ball" to "unique on the common domain"; second, use the explicit solution of $y'=y^2$ to show that solutions really can blow up at a finite point, so the theorem can only be local. Together they form the complete Picard–Lindelöf theorem.
