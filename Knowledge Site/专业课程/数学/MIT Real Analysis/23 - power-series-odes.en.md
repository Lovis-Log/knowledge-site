---
slug: 23-power-series-odes
title: "Term-by-Term Calculus and Ordinary Differential Equations"
summary: "Under uniform convergence of the derivatives we prove that differentiation commutes with limits, deduce that power series may be differentiated term by term any number of times, and introduce ODEs and the Picard–Lindelöf theorem."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, power-series, uniform-convergence, differential-equations]
sources:
  - kind: video
    title: "Lecture 22: Differentiating and Integrating Power Series; Ordinary Differential Equations (ODEs)"
    url: https://www.youtube.com/watch?v=EDUMN4s44YU
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## One thing left: can derivatives pass through a limit?

Last lecture's conclusion: if $f_n$ is integrable and $f_n\to f$ uniformly, then $f$ is integrable and

$$
\int_a^b f_n\to\int_a^b f .
$$

Integration behaves well under uniform convergence. Differentiation is completely different: **uniform convergence by itself does not imply $f_n'\to f'$**. The reason is straightforward — a derivative sees only the local behaviour near each point, while uniform convergence controls the overall distance between function values. A sequence of functions can be squeezed together at every point while the slopes oscillate wildly.

The course does not give a counterexample but instead supplies a stronger **sufficient condition**: not only the functions converge, but **the derivatives converge uniformly**. Under that condition, differentiation does commute with the limit.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review of uniform convergence and integration |
| 3:06 | Hypotheses and conclusion of the differentiation theorem |
| 6:40 | Reconstruct $f$ by integration: $f(x)=c+\int_{x_0}^x g$ |
| 11:00 | Estimate $|f_n-f|$ and obtain uniform convergence |
| 19:07 | Example: $E_n'=E_{n-1}$, hence $E'=E$ |
| 31:48 | General power series: radius of convergence and term-by-term differentiation |
| 37:22 | The differentiated series has the same radius |
| 42:40 | Formula after differentiating $m$ times |
| 49:28 | Theorem: power series may be differentiated and integrated term by term |
| 1:03:50 | What an ODE is |
| 1:13:35 | Statement of the Picard–Lindelöf theorem |
| 1:16:35 | Preview of the contraction mapping theorem |

## Theorem: differentiation commutes when derivatives converge uniformly

**Theorem.** Let $f_n$ be differentiable on $(A,B)$ with $f_n'$ continuous. Assume:

1. for some $x_0\in(A,B)$, the sequence $f_n(x_0)$ converges to a number $c$;
2. $f_n'$ converges uniformly on $(A,B)$ to a function $g$.

Then there is a function $f$ such that:

- $f$ is differentiable and $f'$ is continuous;
- $f_n\to f$ uniformly on each bounded subinterval $[a,b]\subset(A,B)$;
- $f_n'\to f'$ uniformly on the same subinterval.

### Step 1: build the limit function

By "a uniform limit of continuous functions is continuous", $g$ is continuous.

Define

$$
f(x)=c+\int_{x_0}^{x}g(s)\,ds .
$$

Two points deserve comment. First, $g$ is continuous, so the integral exists. Second, why integrate starting from $c$? Because we need $f(x_0)=c$, and $c$ is precisely the limit of $f_n(x_0)$; only then can $f$ be the limit of $f_n$.

By the fundamental theorem of calculus, $f$ is differentiable and

$$
f'(x)=g(x).
$$

Since $g$ is continuous, so is $f'$. This gives the first half of the conclusion.

### Step 2: uniform convergence

Fix a bounded subinterval $[a,b]\subset(A,B)$ and let $x\in[a,b]$. By the fundamental theorem of calculus, for every $n$,

$$
f_n(x)=f_n(x_0)+\int_{x_0}^{x}f_n'(s)\,ds .
$$

Subtract:

$$
\begin{aligned}
f_n(x)-f(x)
&=\bigl(f_n(x_0)-c\bigr)
+\int_{x_0}^{x}\bigl(f_n'(s)-g(s)\bigr)\,ds .
\end{aligned}
$$

Take absolute values and apply the triangle inequality:

$$
|f_n(x)-f(x)|
\le |f_n(x_0)-c|
+\left|\int_{x_0}^{x}\bigl(f_n'(s)-g(s)\bigr)\,ds\right| .
$$

Bound the integral by "length times maximum error". If $x\ge x_0$,

$$
\left|\int_{x_0}^{x}\bigl(f_n'(s)-g(s)\bigr)\,ds\right|
\le (x-x_0)\,d(f_n',g)
\le (b-a)\,d(f_n',g).
$$

If $x<x_0$, then

$$
\left|\int_{x_0}^{x}\cdots\right|
=\left|\int_{x}^{x_0}\cdots\right|
\le (x_0-x)\,d(f_n',g)
\le (b-a)\,d(f_n',g).
$$

In either case, for all $x\in[a,b]$,

$$
|f_n(x)-f(x)|\le |f_n(x_0)-c|+(b-a)\,d(f_n',g).
$$

The right side is independent of $x$. As $n\to\infty$ the first term tends to $0$ (hypothesis 1) and the second to $0$ (hypothesis 2, uniform convergence of derivatives). So for every $\varepsilon>0$ there is $N$ such that for $n\ge N$ the right side is below $\varepsilon$, simultaneously for all $x$. That is uniform convergence of $f_n$ to $f$ on $[a,b]$.

### Step 3: derivative convergence is free

The second conclusion needs no work: hypothesis 2 already says $f_n'\to g$ uniformly, and $g=f'$. Hence $f_n'\to f'$ uniformly. $\square$

Note the structure of the hypotheses: **convergence of the derivatives is assumed; convergence of the functions is derived**. This is the opposite direction from the integration theorem, where uniform convergence of the functions implied convergence of the integrals.

## Example: the exponential satisfies $E'=E$

Define

$$
E_n(x)=\sum_{k=0}^{n}\frac{x^k}{k!},
\qquad
E(x)=\sum_{k=0}^{\infty}\frac{x^k}{k!}.
$$

**Differentiate term by term.** Since $E_n$ is a polynomial,

$$
E_n'(x)=\sum_{k=1}^{n}\frac{k\,x^{k-1}}{k!}
=\sum_{k=1}^{n}\frac{x^{k-1}}{(k-1)!}
=\sum_{j=0}^{n-1}\frac{x^{j}}{j!}
=E_{n-1}(x),
$$

where the last step is the index shift $j=k-1$. Hence

$$
E_n'=E_{n-1}.
$$

**Check the hypotheses.**

- $E_n'=E_{n-1}$ converges uniformly to $E$ on every $[-L,L]$ (Weierstrass $M$-test).
- At $x_0=0$, $E_n(0)=1$ for every $n\ge0$, so $E_n(0)\to1$.
- $E_n'$ is continuous (a polynomial).

All three hold. The theorem gives a function $f$ with $E_n\to f$ uniformly and $E_n'\to f'$ uniformly on $[-L,L]$.

**Identify the limit.** By the previous lecture, $E_n\to E$ uniformly. A uniform limit is unique (each point has a unique limit), so $f=E$. On the other hand $E_n'=E_{n-1}$ and $E_{n-1}\to E$ uniformly, so $f'=E$. Combining:

$$
E'=E .
$$

The conclusion is not merely that $E$ is differentiable, but that its derivative is itself — exactly the property wanted when $e^x$ is defined by its power series.

## General power series: differentiation preserves the radius

Let

$$
f(x)=\sum_{n=0}^{\infty}a_nx^n
$$

with radius of convergence

$$
R=\frac{1}{M},
\qquad
M=\limsup_{n\to\infty}|a_n|^{1/n},
$$

with the usual conventions for $M=0$ and $M=\infty$. Term-by-term differentiation gives

$$
\sum_{n=1}^{\infty}n\,a_nx^{n-1}.
$$

Its coefficients are $b_{n-1}=n a_n$. Its $M'$ is

$$
M'=\limsup_{n\to\infty}\bigl|n\,a_n\bigr|^{1/n}
=\limsup_{n\to\infty}n^{1/n}\,|a_n|^{1/n}.
$$

The key limit is $n^{1/n}\to1$:

$$
n^{1/n}=e^{\frac{\log n}{n}},
\qquad
\frac{\log n}{n}\to0,
$$

so $n^{1/n}\to e^0=1$. Hence

$$
M'=\limsup_{n\to\infty}|a_n|^{1/n}=M .
$$

**The radius is unchanged.**

A student asked whether the $n$-th root is still the right tool after the powers shift down by one. The answer: both computations work. The radius comes from comparison with a geometric series, and shifting all powers by one does not affect it; using the $(n-1)$-st root gives the same limsup. The difference is bookkeeping, not substance.

### Iterating to the $m$-th derivative

Since one differentiation preserves the radius, repeat. After $m$ differentiations,

$$
f^{(m)}(x)=\sum_{n=m}^{\infty}\frac{n!}{(n-m)!}\,a_n\,x^{n-m}.
$$

The coefficient expands as

$$
\frac{n!}{(n-m)!}
=n(n-1)(n-2)\cdots(n-m+1),
$$

the factors that drop down at each differentiation. Each step preserves the same radius, so this series again has radius $R$.

### Theorem: power series are smooth inside the radius

**Theorem.** Let a power series have radius $R>0$ and let $0<L<R$. Then:

1. the partial sums $f_n(x)=\sum_{k=0}^{n}a_kx^k$ converge uniformly to $f$ on $[-L,L]$;
2. for every $m\ge1$, the $m$-th derivatives of $f_n$ converge uniformly on $[-L,L]$ to

$$
\sum_{k=m}^{\infty}\frac{k!}{(k-m)!}\,a_k\,x^{k-m}.
$$

Consequently $f$ is infinitely differentiable on $(-R,R)$ and

$$
f^{(m)}(x)=\sum_{k=m}^{\infty}\frac{k!}{(k-m)!}\,a_k\,x^{k-m}.
$$

**Idea of the proof.** Take $m=1$. By the Weierstrass $M$-test, both $\sum_k a_kx^k$ and $\sum_k k a_kx^{k-1}$ converge uniformly on $[-L,L]$; that is, the partial sums $f_n$ and their derivatives $f_n'$ both converge uniformly. At $x_0=0$, $f_n(0)=a_0$ converges. The differentiation theorem then gives $f_n\to f$ and $f_n'\to f'$ uniformly, and the limit of $f_n'$ is the term-by-term derivative. Induct on $m$. $\square$

The convergence is on each $[-L,L]$ with $L<R$. At the endpoints $x=\pm R$ the series may diverge, and the differentiated series may lose uniformity, so the theorem is stated on inner closed intervals only.

## Term-by-term integration

The same idea with the previous lecture's integration theorem. Let $a,b$ lie inside the interval of convergence and $f(x)=\sum_k a_kx^k$. The partial sums are polynomials, so

$$
\int_a^b f_n(x)\,dx
=\sum_{k=0}^{n}a_k\int_a^b x^k\,dx .
$$

Since $f_n\to f$ uniformly on some $[-L,L]$ containing $[a,b]$, the interchange theorem gives

$$
\int_a^b f(x)\,dx
=\sum_{k=0}^{\infty}a_k\int_a^b x^k\,dx .
$$

Taking $a=0$, $b=x$, each term is

$$
\int_0^x t^k\,dt=\frac{x^{k+1}}{k+1},
$$

so

$$
\int_0^x f(t)\,dt
=\sum_{k=0}^{\infty}\frac{a_k}{k+1}x^{k+1}.
$$

This is again a power series with the same radius. Integrating a power series, like differentiating one, is a term-by-term operation.

## What an ordinary differential equation is

A differential equation is an equation involving an unknown function and its derivative. Three small examples.

**Example 1.** $f'(x)=x$. The solutions are

$$
f(x)=\frac{x^2}{2}+C,
$$

because the derivative of a constant is $0$ and $(x^2/2)'=x$. These are all the solutions.

**Example 2.** $f'(x)=\bigl(f(x)-1\bigr)^2$. Take

$$
f(x)=1-\frac1x .
$$

Then $f(x)-1=-1/x$, whose square is $1/x^2$, while $f'(x)=1/x^2$. So it solves the equation. This example shows that solutions need not be simple combinations of elementary functions, and that a solution may be defined only on part of the real line (it is undefined at $x=0$).

Note: the lecture transcript mishears this example as something like "$f'$ minus $f$ squared"; checking the algebra, the equation is $f'=(f-1)^2$, matching the board after the instructor corrected a sign in the middle.

**Example 3.** $f\,f'\,f''=0$. At every point at least one factor vanishes; by continuity one of them must vanish identically on the whole interval. So the solutions fall into two classes: $f'\equiv0$ (constants) or $f''\equiv0$ (linear functions, constants included). All solutions are therefore linear, $f(x)=ax+b$.

An **ordinary** differential equation (ODE) is one whose unknown depends on a single variable. If it depends on several variables and partial derivatives appear, it is a partial differential equation.

### The shape studied in this course

Write the unknown as $y=y(x)$ and consider

$$
y'(x)=f\bigl(y(x)\bigr)+g(x),
\qquad
y(0)=a ,
$$

where $f$ is differentiable with $f'$ continuous, $g$ is continuous, and $a$ is a given real number. The unknown enters only through $y$ inside $f$, while $g$ is a known forcing term. Since $f$ may be any nonlinearity, this is a **nonlinear equation**, and explicit solutions generally do not exist.

Two questions:

- **Existence**: given $a$, is there at least one solution?
- **Uniqueness**: if there are two, must they coincide?

### The Picard–Lindelöf theorem

**Theorem.** Let $f$ be differentiable with $f'$ continuous, let $g$ be continuous, and let $a\in\mathbb R$. Then there is $\delta>0$ such that the initial value problem

$$
y'=f(y)+g(x),
\qquad
y(0)=a
$$

has a solution on $(-\delta,\delta)$, and the solution on $(-\delta,\delta)$ is unique.

The essential word is **local**: the conclusion is only that a solution exists on a small interval around the origin. How large the interval can be depends on $f$ and $g$, and in general it cannot be extended to all of $\mathbb R$. The next lecture gives an example where the solution blows up at a finite point and cannot be extended.

### The tool: contraction mappings

The proof does not construct the solution directly. Instead it writes the solution as a fixed point of a map.

**Definition.** Let $(X,d)$ be a metric space and $T:X\to X$. If there is a constant $c<1$ such that

$$
d\bigl(T(x),T(y)\bigr)\le c\,d(x,y)
\quad\text{for all }x,y\in X,
$$

then $T$ is a **contraction**.

**Contraction mapping theorem.** If $(X,d)$ is Cauchy complete and $T:X\to X$ is a contraction, then $T$ has a unique fixed point: there is exactly one $x_0\in X$ with $T(x_0)=x_0$.

This theorem was proved earlier, on $\mathbb R$, for Newton's method of finding zeros. Here its metric-space version is needed: the space is a set of continuous functions on an interval, and the distance is the sup distance.

**How they connect.** Rewrite the initial value problem as the integral equation

$$
y(x)=a+\int_0^x\bigl[f(y(s))+g(s)\bigr]\,ds .
$$

The right side defines a map $T$: it takes a continuous function $y$ to another continuous function. If $y$ is a fixed point, then $y=Ty$, and differentiating (fundamental theorem of calculus) gives $y'=f(y)+g$, while $y(0)=a$. Thus "solve the ODE" becomes "find a fixed point of a contraction".

The difficulty: this $T$ is **not** a contraction on the whole space of continuous functions. The space must be restricted to a sufficiently small closed ball before the contraction constant can be made less than $1$. That restriction is the entire technical content of the next lecture.

## What this lecture establishes

- Differentiation commutes with limits when the derivatives converge uniformly; uniform convergence of the functions alone is not enough.
- The proof reconstructs $f$ by integration and splits the error into an endpoint term plus "length times derivative error".
- Term-by-term differentiation of a power series preserves the radius and may be repeated indefinitely; term-by-term integration holds as well.
- $E_n'=E_{n-1}$ together with $E_n(0)=1$ yields $E'=E$.
- The ODE $y'=f(y)+g(x)$, $y(0)=a$ has a unique local solution (Picard–Lindelöf).
- The proof uses the contraction mapping theorem; the key step restricts the space to a closed ball so that the map becomes a contraction.

## Comprehension check

**1. Why does uniform convergence of $f_n$ fail to imply $f_n'\to f'$? Which hypothesis in the theorem avoids the difficulty?**

Reference answer: Uniform convergence controls $\sup_x|f_n-f|$, i.e. differences of values, whereas derivatives are determined by difference quotients involving two nearby points. Values can be squeezed together while the local slope at each point still oscillates; nothing forces $f_n'$ to converge, let alone to $f'$. The theorem instead assumes that the **derivatives** $f_n'$ converge uniformly to $g$, and reconstructs $f$ as the integral of $g$, so $f'=g$ holds by construction and uniform convergence of the functions becomes the conclusion rather than an assumption.

**2. In the proof, why define $f=c+\int_{x_0}^{x}g$ rather than just $\int_{x_0}^{x}g$?**

Reference answer: To match the hypothesis $f_n(x_0)\to c$. With $f(x)=c+\int_{x_0}^{x}g$, the integral over a single point is zero, so $f(x_0)=c$, exactly the limit of $f_n(x_0)$. Without the constant, $f(x_0)=0$, which generally differs from the limit of the values at $x_0$, and $f_n$ could not converge uniformly to it.

**3. In proving $E'=E$, which facts supply the three hypotheses of the theorem?**

Reference answer: (1) Convergence at a point: take $x_0=0$, then $E_n(0)=1$ for all $n$, so it converges to $1$. (2) Uniform convergence of derivatives: $E_n'=E_{n-1}$, and by the Weierstrass $M$-test $E_{n-1}\to E$ uniformly on every $[-L,L]$. (3) Continuity of derivatives: $E_n'=E_{n-1}$ is a polynomial. The theorem then gives a differentiable limit with derivative equal to the limit of $E_{n-1}$, namely $E$; hence $E'=E$.

**4. Why is the radius of convergence unchanged by term-by-term differentiation? Write the key limit.**

Reference answer: The original coefficients give $M=\limsup|a_n|^{1/n}$; the differentiated series has coefficients $n a_n$, so

$$
M'=\limsup\bigl|n a_n\bigr|^{1/n}
=\limsup n^{1/n}|a_n|^{1/n}.
$$

The key limit is $n^{1/n}\to1$, since $n^{1/n}=e^{(\log n)/n}$ and $(\log n)/n\to0$. Hence $M'=M$ and the radius $R=1/M$ is unchanged.

**5. Why is a fixed point of $T(y)(x)=a+\int_0^x[f(y(s))+g(s)]ds$ a solution of the ODE, and why is every solution a fixed point?**

Reference answer: If $y=Ty$, then $y(x)=a+\int_0^x[f(y(s))+g(s)]ds$. By the fundamental theorem of calculus the right side is differentiable with derivative $f(y(x))+g(x)$; and since the integral over $[0,0]$ vanishes, $y(0)=a$. So $y$ satisfies the ODE and the initial condition. Conversely, if $y$ is differentiable with $y'=f(y)+g$ and $y(0)=a$, integrating $y'$ from $0$ to $x$ and using the fundamental theorem gives $y(x)-y(0)=\int_0^x[f(y(s))+g(s)]ds$, i.e. $y=Ty$. Both directions use only the fundamental theorem of calculus.

## Relation to neighbouring lectures

The previous lecture proved that integration commutes with uniform limits; this lecture supplies the differentiation half and thereby the full calculus of power series. The second half turns to ODEs, rewriting the problem as a fixed point of an integral operator and setting up the next lecture's technical work.

That lecture does three things: define the map $T$ on a closed ball, prove that $T$ maps the ball into itself, and prove that $T$ is a contraction there; the contraction mapping theorem then yields local existence and uniqueness. The following lecture (labelled a final review) completes the global uniqueness argument and uses the blow-up of $y'=y^2$ to show that "local" is not technical caution but a real phenomenon.
