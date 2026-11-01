---
slug: 25-final-review
title: "Finishing Picard–Lindelöf: Connectedness, Uniqueness, and Blow-Up"
summary: "This lecture in fact continues the previous one: it completes the contraction estimate, uses connectedness of intervals to upgrade local uniqueness to global uniqueness, and uses the blow-up of y'=y² to show why the theorem must be local."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, differential-equations, connectedness, uniqueness, exam-review]
sources:
  - kind: video
    title: "Review for the 18.100B Real Analysis Final Exam"
    url: https://www.youtube.com/watch?v=75PZmUc0TK0
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## A note on this lecture's source

The recording is titled "Review for the Final Exam", but the transcript attached to the clipping is not a course-wide review. Its actual content is:

1. a restatement of the Picard–Lindelöf framework and completion of the contraction estimate left unfinished last time;
2. a discussion of connectedness of intervals and a lemma saying that two continuous functions agreeing locally agree globally;
3. the use of both to prove global uniqueness;
4. the explicit solution of $y'=y^2$, showing blow-up at a finite point.

This note is therefore organized as a knowledge map, the core arguments, typical problem types and common pitfalls, but it follows the transcript strictly and does not pretend to be a complete exam syllabus. For the actual exam scope, the course syllabus and lecture notes are authoritative.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Restating the ODE, the initial condition, and the contraction mapping theorem |
| 6:03 | The integral operator $T$; fixed points are solutions |
| 11:22 | Recalling the closed ball $\|y\|\le R$ and the self-map property |
| 16:57 | Shrinking the interval; completing the contraction with $\delta=1/(2L)$ |
| 30:43 | Definition of connectedness |
| 33:04 | Theorem: an interval is connected |
| 46:34 | Lemma: continuous functions that agree locally agree everywhere |
| 54:20 | Applying the lemma to global uniqueness |
| 59:00 | The blow-up example $y'=y^2$ |

## Knowledge map: three layers

The proof of Picard–Lindelöf decomposes into three layers, each answering a separate question.

**Layer one: completeness.** The space $C([-\delta,\delta])$ with the sup metric is Cauchy complete; a closed ball is a closed subset of a complete space, hence complete. This layer answers "does the limit exist".

**Layer two: contraction.** The integral operator $T$ multiplies distances by a constant strictly below $1$ on the ball. This layer answers "does the iteration converge, and is the limit a fixed point".

**Layer three: connectedness.** An interval cannot be split into two nonempty open-and-closed pieces. This layer answers "can local uniqueness be glued into global uniqueness".

Layers one and two were completed last time; layer three is the spine of this lecture.

## Completing the contraction estimate

First, the step left open last time.

**Setup.** $f$ is differentiable with $f'$ continuous, $g$ is continuous, and $y(0)=a$. Take

$$
R=|a|+2,
\qquad
L=\max_{|z|\le R}|f'(z)|,
$$

and shrink the interval to

$$
\delta=\min\Bigl(\delta_0,\ \frac{1}{2L}\Bigr),
$$

where $\delta_0$ is the constant from last time that made $T$ map the ball into itself. Since $\delta\le\delta_0$, $T$ still maps the ball of radius $R$ into itself.

**The contraction estimate.** Take $y_1,y_2$ in the ball. The constants $a$ and the terms $g$ cancel:

$$
\bigl(Ty_1\bigr)(x)-\bigl(Ty_2\bigr)(x)
=\int_0^x\Bigl[f\bigl(y_1(s)\bigr)-f\bigl(y_2(s)\bigr)\Bigr]\,ds .
$$

Take absolute values and move the absolute value inside:

$$
\bigl|(Ty_1)(x)-(Ty_2)(x)\bigr|
\le\left|\int_0^x\bigl|f(y_1(s))-f(y_2(s))\bigr|\,ds\right| .
$$

Fix $s$. Both $y_1(s)$ and $y_2(s)$ lie in $[-R,R]$, so by the mean value theorem there is $\sigma$ between them with

$$
f(y_1(s))-f(y_2(s))=f'(\sigma)\bigl(y_1(s)-y_2(s)\bigr).
$$

Hence

$$
\bigl|f(y_1(s))-f(y_2(s))\bigr|
\le L\,\bigl|y_1(s)-y_2(s)\bigr|
\le L\,d(y_1,y_2).
$$

Substituting back,

$$
\bigl|(Ty_1)(x)-(Ty_2)(x)\bigr|
\le L\,d(y_1,y_2)\,|x|
\le \delta L\,d(y_1,y_2).
$$

Since $\delta\le1/(2L)$,

$$
\delta L\le\frac12 .
$$

This holds for every $x$; taking the supremum,

$$
d(Ty_1,Ty_2)\le\frac12\,d(y_1,y_2).
$$

The contraction constant is $1/2$, independent of $y_1,y_2$. The previous lecture defined $\delta=\min(\delta_0,1/(2M+1))$ and reaches the same conclusion, only with a messier constant:

$$
\delta=\frac{1}{2L}
\quad\Longrightarrow\quad
c=\frac12 .
$$

**What has been proved is local**: inside $(-\delta,\delta)$ the map $T$ has a unique fixed point, hence the ODE has a unique solution. Outside that interval nothing has been said.

## Connectedness

Turning local uniqueness into global uniqueness needs a topological property of intervals.

**Definition.** A metric space $X$ is **connected** if the only subsets that are both open and closed are $\varnothing$ and $X$.

In any space the empty set and the whole space are both open and closed, so the definition says there are no other "open-and-closed" subsets.

**Theorem.** An interval $I\subseteq\mathbb R$ with the usual metric is connected.

### Proof

Let $A\subseteq I$ be nonempty and both open and closed. We show $A=I$.

For simplicity assume first that $I$ is closed; for open and half-open intervals only the endpoint discussion changes.

Pick $x_0\in A$ and define

$$
B=\Bigl\{\,y\in A : y\ge x_0,\ [x_0,y]\subseteq A\,\Bigr\}.
$$

$B$ is nonempty since $x_0\in B$ (the interval $[x_0,x_0]$ is a single point). Let

$$
y_0=\sup B .
$$

Three steps.

**Step 1: $y_0\in A$.** By definition of the supremum there is a sequence $y_n\in B$ with $y_n\to y_0$. Each $y_n\in A$ and $A$ is closed, so the limit $y_0\in A$.

**Step 2: $y_0\in B$, i.e. $[x_0,y_0]\subseteq A$.** Take $z\in[x_0,y_0]$. Since $y_n\to y_0$, for large $n$ we have $y_n\ge z$. And $y_n\in B$ means $[x_0,y_n]\subseteq A$, so $z\in A$. Hence the whole of $[x_0,y_0]$ lies in $A$, so $y_0\in B$.

**Step 3: $y_0$ must be the right endpoint of $I$.** Suppose not. Since $A$ is open and $y_0\in A$, there is $\varepsilon>0$ with

$$
(y_0-\varepsilon,\ y_0+\varepsilon)\subseteq A .
$$

Take $y_1\in(y_0,y_0+\varepsilon)$. By Step 2, $[x_0,y_0]\subseteq A$; adjoining $(y_0,y_1]$ gives $[x_0,y_1]\subseteq A$, so $y_1\in B$. But $y_1>y_0=\sup B$, a contradiction.

So $y_0$ is the right endpoint of $I$ and $[x_0,\text{right endpoint}]\subseteq A$.

Running the same argument on the left (reverse the order, or apply the result to $-I$) gives $[\text{left endpoint},x_0]\subseteq A$. Together, $A=I$. $\square$

Each step uses one property: Step 1 uses **closedness**, Step 2 uses the definition of $B$, Step 3 uses **openness**. Remove any of them and the argument collapses — which is exactly why "both open and closed" is the right hypothesis.

## Lemma: agreeing locally forces agreeing everywhere

Connectedness is used through the following lemma.

**Lemma.** Let $I$ be an interval and $u_1,u_2:I\to\mathbb R$ continuous. Assume:

1. $u_1(x_0)=u_2(x_0)$ for some $x_0\in I$;
2. whenever $u_1(x)=u_2(x)$ at some $x\in I$, there is $\varepsilon>0$ (allowed to depend on $x$) with $u_1=u_2$ on the whole interval $(x-\varepsilon,x+\varepsilon)$.

Then $u_1=u_2$ everywhere on $I$.

### Proof

Define

$$
h(x)=u_1(x)-u_2(x).
$$

Since $u_1,u_2$ are continuous, so is $h$. Let

$$
A=\{x\in I : h(x)=0\}
$$

be the zero set.

**$A$ is nonempty.** Condition 1 gives $h(x_0)=0$, so $x_0\in A$.

**$A$ is closed.** If $x_n\in A$ and $x_n\to x$, continuity gives

$$
h(x)=\lim_{n\to\infty}h(x_n)=0,
$$

so $x\in A$.

**$A$ is open in $I$.** If $x\in A$, condition 2 gives $\varepsilon>0$ with $h=0$ on $(x-\varepsilon,x+\varepsilon)$, i.e. that neighbourhood lies entirely in $A$. So every point of $A$ is interior.

Thus $A$ is nonempty, open and closed, and $I$ is connected, so $A=I$. Hence $h\equiv0$ and $u_1=u_2$. $\square$

The lemma is a discrete version of analytic continuation: two continuous functions that meet at one point, and whose coincidence always spreads to a neighbourhood, must coincide on the entire interval. **All the work in proving uniqueness goes into verifying condition 2.**

## Uniqueness: gluing the local into the global

**Theorem (uniqueness part of Picard–Lindelöf).** Let $y_1,y_2$ both solve

$$
y'=f(y)+g(x),
\qquad
y(0)=a
$$

on some interval $I$ containing $0$. Then $y_1=y_2$.

**Proof.** The two solutions coincide at $0$:

$$
y_1(0)=a=y_2(0).
$$

This is condition 1 of the lemma. It remains to check condition 2.

Suppose $y_1(x_0)=y_2(x_0)$ for some $x_0\in I$. Regard the problem as an initial value problem starting at $x_0$: both solutions have the same initial value and satisfy the same equation. Take the $\delta>0$ from the previous lecture (depending only on $f,g$ and the initial value, not on the starting point). On $(x_0-\delta,x_0+\delta)$ the contraction mapping theorem gives a **unique** solution. Since $y_1$ and $y_2$ both solve on that small interval, they must coincide:

$$
y_1=y_2
\quad\text{on }(x_0-\delta,x_0+\delta).
$$

This is condition 2. By the lemma, $y_1=y_2$ on all of $I$. $\square$

Two results meet here: **the contraction mapping theorem supplies uniqueness near a point, and connectedness propagates it to the whole interval.**

## Blow-up: why the theorem must be local

One question remains: since the proof worked hard to shrink the interval to $\delta$, is that technical caution or a real phenomenon?

It is real. Here is an explicit example.

### Solving $y'=y^2$

Take

$$
f(y)=y^2,
\qquad
g=0,
$$

and the initial condition $y(x_0)=a$ with $a>0$. The equation is

$$
y'=y^2 .
$$

On an interval where the solution is positive, divide by $y^2$:

$$
\frac{y'}{y^2}=1 .
$$

The left side is a derivative: by the chain rule,

$$
\left(-\frac1y\right)'=\frac{y'}{y^2}.
$$

Integrate from $x_0$ to $x$:

$$
-\frac{1}{y(x)}+\frac{1}{y(x_0)}=x-x_0 .
$$

Substituting $y(x_0)=a$,

$$
\frac{1}{y(x)}=\frac1a-(x-x_0)
=\frac{1-a(x-x_0)}{a}.
$$

Taking reciprocals,

$$
y(x)=\frac{a}{1-a(x-x_0)}
=\frac{a}{1+ax_0-ax}.
$$

Note: the transcript writes the denominator as "$1+ax_0-x$", dropping the factor $a$ in front of $x$. Checking the algebra, the denominator is $1+a x_0-a x$; at $x=x_0$ it equals $1$ and gives $y(x_0)=a$.

### Where the solution fails

The denominator $1-a(x-x_0)$ vanishes at

$$
x=x_0+\frac1a .
$$

As $x$ approaches that point from the left, $y(x)\to+\infty$. So the maximal interval of existence is

$$
\Bigl(-\infty,\ x_0+\frac1a\Bigr),
$$

and the solution blows up at the right endpoint.

### Why it cannot be extended

Let $t^*=x_0+1/a$. Suppose a solution extended past $t^*$. By uniqueness it would have to agree with the formula above on $(x_0,t^*)$; but that formula tends to $+\infty$ as $x\to t^{*-}$, whereas a solution near $t^*$ should take finite values and be continuous. Contradiction. So no solution can cross $t^*$.

Intuitively, $y'=y^2$ makes "the larger $y$ is, the faster it grows": once $y$ becomes large, the derivative becomes larger still, and the curve runs to infinity in finite time with a vertical tangent. This is not the proof being conservative; it is the equation's own behaviour.

**Conclusion**: locality cannot be removed. For some $f,g$ the maximal interval of existence can be arbitrarily small.

## Typical problem types

Three kinds of questions follow from this material.

### Type one: verify the contraction and produce a constant

Given $f$ and an initial value, prove that the integral operator is a contraction on some closed ball.

The recipe is fixed:

1. take $R=|a|+2$, compute $L_1=\max_{|z|\le R}|f(z)|$ and $L_2=\max_{|z|\le1}|g(z)|$;
2. take $\delta_0=\min(1,1/(L_1+1),1/(L_2+1))$ and check $|Ty(x)|\le|a|+\delta_0L_1+\delta_0L_2<R$;
3. take $L=\max_{|z|\le R}|f'(z)|$ and shrink the interval to $\delta=1/(2L)$;
4. use the mean value theorem to get $d(Ty_1,Ty_2)\le\delta L\,d(y_1,y_2)\le\frac12 d(y_1,y_2)$.

### Type two: extend uniqueness by connectedness

Given two solutions, prove they agree on their common domain.

The recipe: use local uniqueness near a point where they meet; write the set of meeting points as $h^{-1}(0)$; prove it nonempty, closed ($h$ continuous) and open (local uniqueness); finish with connectedness of the interval.

### Type three: solve a simple ODE and find the maximal interval

For instance $y'=y^2$, $y(x_0)=a>0$. Separate variables, integrate, solve for $y$, locate the zero of the denominator, and explain the blow-up. The essential last step is an argument that the solution **cannot** be extended, not merely the observation that the formula is undefined.

## Common pitfalls

- **Treating $c\le1$ as a contraction**: it must be $c<1$. For $c=1$ the iteration need not converge, and the identity map is a counterexample.
- **Claiming a contraction on all continuous functions**: not true. $f'$ may be unbounded; the closed ball is necessary.
- **Using an open ball**: open balls are not complete, and a Cauchy sequence may converge outside.
- **Confusing local and global uniqueness**: the contraction theorem gives uniqueness inside the ball only; global uniqueness needs the connectedness argument.
- **Reading blow-up as "an ugly formula"**: the solution itself tends to infinity, and no extension exists; no rewriting avoids it.
- **Dropping "closed" or "open" in the connectedness proof**: Step 1 needs closedness, Step 3 needs openness; neither can be omitted.

## Comprehension check

**1. In the connectedness proof, why does $y_0=\sup B$ belong to $A$? Why does it belong to $B$?**

Reference answer: Since $y_0$ is the supremum of $B$, there are $y_n\in B$ with $y_n\to y_0$. Each $y_n\in A$ and $A$ is closed, so the limit $y_0\in A$. To get $y_0\in B$ we also need $[x_0,y_0]\subseteq A$: take $z\in[x_0,y_0]$; since $y_n\to y_0$, for large $n$ we have $y_n\ge z$, and $[x_0,y_n]\subseteq A$, so $z\in A$. Hence all of $[x_0,y_0]$ lies in $A$, and by the definition of $B$, $y_0\in B$.

**2. Prove the lemma that agreeing locally forces agreeing everywhere, and identify where connectedness is used.**

Reference answer: Let $h=u_1-u_2$ and let $A=h^{-1}(0)$ be the zero set. $A$ is nonempty by condition 1. It is closed: if $x_n\in A$ and $x_n\to x$, continuity gives $h(x)=\lim h(x_n)=0$. It is open: if $x\in A$, condition 2 supplies a neighbourhood contained in $A$. So $A$ is nonempty, open and closed; connectedness of the interval forces $A$ to be the whole interval, hence $h\equiv0$. Connectedness is used in that last step: it rules out the possibility that the zero set covers only part of the interval.

**3. Use Picard–Lindelöf and the lemma to prove uniqueness on the common domain.**

Reference answer: Let $y_1,y_2$ be defined on an interval $I$ containing $0$, both satisfying $y(0)=a$. They agree at $0$, so condition 1 of the lemma holds. If they agree at $x_0$, apply Picard–Lindelöf again with starting point $x_0$ and initial value $y_1(x_0)=y_2(x_0)$; the theorem gives a unique solution on $(x_0-\delta,x_0+\delta)$, so $y_1=y_2$ on that neighbourhood, which is condition 2. The lemma then gives $y_1=y_2$ on all of $I$.

**4. Solve $y'=y^2$, $y(0)=1$, give the maximal interval, and prove rigorously that it cannot be extended.**

Reference answer: Separating variables gives $y'/y^2=1$, and since $(-1/y)'=y'/y^2$, integrating from $0$ to $x$ gives $-1/y(x)+1/y(0)=x$. With $y(0)=1$, $1/y(x)=1-x$, so $y(x)=1/(1-x)$. The maximal interval is $(-\infty,1)$. Suppose a solution extended to the right of $1$: by uniqueness it would agree with $1/(1-x)$ on $(0,1)$, but that expression tends to $+\infty$ as $x\to1^-$, contradicting the finite continuous value a solution must take near $1$. Hence no extension exists.

**5. What would the theorem say without the restriction on the length of the interval, and why would it be false?**

Reference answer: Without the restriction the claim would be "a solution exists and is unique on all of $\mathbb R$". This is false; the counterexample is $y'=y^2$, $y(0)=1$, whose solution $y=1/(1-x)$ blows up as $x\to1^-$, so no solution exists on all of $\mathbb R$. Hence the theorem can only assert existence and uniqueness on some small interval $(-\delta,\delta)$, with $\delta$ depending on $f$, $g$ and the initial value and not uniformly choosable.

## Relation to neighbouring lectures

This lecture supplies the last two pieces of the Picard–Lindelöf proof: the contraction constant is finished, global uniqueness follows from connectedness, and the blow-up example shows locality is unavoidable. The main line of the analysis course now closes:

real number axioms → limits and series → continuity and compactness → derivatives and integrals → uniform convergence → metric spaces and completeness → contraction mappings → differential equations.

Each arrow corresponds to a concrete theorem, and the whole chain ends in a purely analytic statement: as soon as $f$ is smooth enough, a local solution exists and is unique.
