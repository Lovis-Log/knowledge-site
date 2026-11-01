---
slug: 16-derivatives-rules
title: "Derivatives: From Difference Quotients to the Chain Rule"
summary: "Defining the derivative through difference quotients, proving differentiability implies continuity, using three examples to separate continuity from differentiability, then proving the sum, Leibniz, quotient and chain rules in full, and closing with the necessary condition at a local extremum."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, derivatives, continuity, chain-rule]
sources:
  - kind: video
    title: "Lecture 15: Derivatives; Laws for Differentiation"
    url: https://www.youtube.com/watch?v=UP--RL-YKhE
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## The problem: capturing instantaneous rate of change with a limit

The previous lectures lived in metric spaces and measured how far apart points are. This lecture leaves metric spaces, returns to $\mathbb R$, and begins differential calculus.

The idea of a derivative is plain: to capture the instantaneous rate of change of $f$ near $x_0$, take a nearby point $x$ and compute the secant slope

$$
\frac{f(x)-f(x_0)}{x-x_0},
$$

then let $x\to x_0$. This quotient is the **difference quotient**; defining it requires $x\ne x_0$, otherwise the denominator vanishes.

**Definition.** If the limit

$$
\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}
$$

exists, then $f$ is **differentiable at $x_0$**, and the limit is the **derivative** $f'(x_0)$.

This is a **two-sided** limit: $f$ must be defined in a neighbourhood of $x_0$, and approaching from the left and from the right must give the same number. That is exactly why $|x|$ is not differentiable at $0$ — the two one-sided difference quotients are $-1$ and $1$.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Difference quotients and the definition of the derivative |
| 2:19 | Derivatives of constant and identity functions |
| 5:10 | Overview of the four differentiation rules |
| 7:02 | Sum rule (proof) |
| 10:52 | Statement of the Leibniz rule |
| 13:12 | Differentiable implies continuous (proof) |
| 21:01 | Three examples: $|x|$, $x\sin(1/x)$, $x^2\sin(1/x)$ |
| 36:54 | Leibniz rule (proof) |
| 42:58 | Quotient rule (proof) |
| 53:50 | Using the rules on polynomials and rational functions |
| 1:00:07 | Chain rule (proof by cases) |
| 1:16:06 | Necessary condition at a local extremum (stated) |

## The two basic derivatives

### Constant functions

If $f(x)\equiv C$, then for any $x\ne x_0$,

$$
\frac{f(x)-f(x_0)}{x-x_0}=\frac{C-C}{x-x_0}=0 .
$$

The difference quotient is identically $0$, so $f'(x_0)=0$ for every $x_0$.

### The identity function

If $f(x)=x$, then

$$
\frac{f(x)-f(x_0)}{x-x_0}=\frac{x-x_0}{x-x_0}=1,
$$

so $f'(x_0)=1$ for every $x_0$.

These two examples are the seeds of the whole chain: every polynomial and rational function is assembled from them using the rules.

## Differentiable implies continuous

**Theorem.** If $f$ is differentiable at $x_0$, then $f$ is continuous at $x_0$.

**Proof.** Write $L=f'(x_0)$. By the definition of the derivative, taking $\varepsilon=1$ gives $\delta>0$ such that $0<|x-x_0|<\delta$ implies

$$
\left|\frac{f(x)-f(x_0)}{x-x_0}-L\right|<1 .
$$

Multiply both sides by $|x-x_0|$:

$$
\left|f(x)-f(x_0)-L(x-x_0)\right|<|x-x_0| .
$$

Split the left side and apply the triangle inequality:

$$
|f(x)-f(x_0)|\le\left|f(x)-f(x_0)-L(x-x_0)\right|+|L|\,|x-x_0|<(1+|L|)\,|x-x_0| .
$$

Now given $\varepsilon>0$, set

$$
\delta_1=\min\left\{\delta,\ \frac{\varepsilon}{1+|L|}\right\}>0 .
$$

For $0<|x-x_0|<\delta_1$,

$$
|f(x)-f(x_0)|<(1+|L|)\cdot\frac{\varepsilon}{1+|L|}=\varepsilon .
$$

At $x=x_0$ the left side is $0<\varepsilon$ anyway. Hence $f$ is continuous at $x_0$. $\square$

The proof is worth reading closely: it first translates "the difference quotient is close to the derivative" into "the function difference is close to $L(x-x_0)$", then separates the error from the linear term with the triangle inequality. The same decomposition reappears in the product rule.

**The converse fails.** Continuity does not imply differentiability; the three examples below go from bad to good.

## Three examples

### Example 1: $f(x)=|x|$ at $0$

$|x|$ is continuous everywhere. At $x_0=0$ the difference quotient is

$$
\frac{|x|-0}{x-0}=\frac{|x|}{x}=
\begin{cases}
1, & x>0,\\
-1, & x<0.
\end{cases}
$$

The right limit is $1$, the left limit is $-1$; they differ, so the limit does not exist and $f$ is not differentiable at $0$.

The lesson: differentiability requires the two sides to agree on a slope; a corner does not qualify.

### Example 2: $f(x)=x\sin\dfrac1x$ at $0$

Set $f(0)=0$ and $f(x)=x\sin(1/x)$ for $x\ne0$.

**Continuity.** Since $|\sin(1/x)|\le1$,

$$
|f(x)-f(0)|=|x|\left|\sin\frac1x\right|\le|x|\to0,
$$

so $f$ is continuous at $0$ (in fact everywhere).

**Non-differentiability.** The difference quotient at $0$ is

$$
\frac{f(x)-f(0)}{x-0}=\frac{x\sin(1/x)}{x}=\sin\frac1x .
$$

As $x\to0$, $\sin(1/x)$ oscillates infinitely often between $-1$ and $1$ and has no limit. So $f$ is not differentiable at $0$.

This example is worse than $|x|$: restricting $|x|$ to $x>0$ makes it differentiable from the right, whereas $x\sin(1/x)$ fails from either side — the oscillation happens in every neighbourhood, in every direction.

### Example 3: $f(x)=x^2\sin\dfrac1x$ at $0$

Again set $f(0)=0$. The difference quotient is now

$$
\frac{x^2\sin(1/x)}{x}=x\sin\frac1x .
$$

Since $|x\sin(1/x)|\le|x|\to0$, the difference quotient has limit $0$, so $f'(0)=0$.

The same oscillation is flattened by one extra factor of $x$. Together the two examples pin down the distinction: **continuity controls the size of function values, differentiability also controls the oscillation of the difference quotient**; multiplying by $x$ cancels the denominator and damps the amplitude.

## The sum rule

**Theorem.** If $f$ and $g$ are differentiable at $x_0$, then so is $f+g$, and

$$
(f+g)'(x_0)=f'(x_0)+g'(x_0).
$$

**Proof.** Compute the difference quotient directly:

$$
\frac{(f+g)(x)-(f+g)(x_0)}{x-x_0}
=
\frac{f(x)+g(x)-f(x_0)-g(x_0)}{x-x_0}.
$$

Regroup:

$$
=
\frac{f(x)-f(x_0)}{x-x_0}+\frac{g(x)-g(x_0)}{x-x_0}.
$$

As $x\to x_0$ the two quotients converge to $f'(x_0)$ and $g'(x_0)$; the sum rule for limits gives the sum. $\square$

This proof is almost a restatement of the definition; the later rules need actual technique.

## The Leibniz (product) rule

**Theorem.** If $f$ and $g$ are differentiable at $x_0$, then so is $fg$, and

$$
(fg)'(x_0)=f'(x_0)g(x_0)+f(x_0)g'(x_0).
$$

**The key move** is to insert a cross term and split the difference quotient into two parts:

$$
\frac{f(x)g(x)-f(x_0)g(x_0)}{x-x_0}
=
\frac{f(x)g(x)-f(x_0)g(x)+f(x_0)g(x)-f(x_0)g(x_0)}{x-x_0}.
$$

The inserted terms cancel exactly. Split into two fractions:

$$
=
g(x)\cdot\frac{f(x)-f(x_0)}{x-x_0}
+
f(x_0)\cdot\frac{g(x)-g(x_0)}{x-x_0}.
$$

Now take limits term by term. Differentiability gives continuity of $f$ at $x_0$, so $g(x)\to g(x_0)$; the first quotient tends to $f'(x_0)$. In the second term $f(x_0)$ is constant and the quotient tends to $g'(x_0)$. Therefore

$$
\lim_{x\to x_0}\frac{f(x)g(x)-f(x_0)g(x_0)}{x-x_0}
=
g(x_0)f'(x_0)+f(x_0)g'(x_0).
$$

$\square$

**Why was "differentiable implies continuous" needed first?** Because the proof requires $g(x)\to g(x_0)$, while $g$ is only assumed differentiable. That is exactly where the earlier theorem earns its place — it is not decoration, it is a hypothesis of this line.

The same trick appeared when proving that the product of two convergent sequences converges: write $a_nb_n-ab=a_n(b_n-b)+b(a_n-a)$. Same idea, different setting.

## The quotient rule

**Theorem.** If $f$ and $g$ are differentiable at $x_0$ and $g$ is nonzero near $x_0$, then $f/g$ is differentiable at $x_0$ and

$$
\left(\frac fg\right)'(x_0)=\frac{f'(x_0)g(x_0)-f(x_0)g'(x_0)}{g(x_0)^2}.
$$

**Proof.** Put the difference quotient over a common denominator:

$$
\frac{\dfrac{f(x)}{g(x)}-\dfrac{f(x_0)}{g(x_0)}}{x-x_0}
=
\frac{f(x)g(x_0)-f(x_0)g(x)}{(x-x_0)\,g(x)g(x_0)} .
$$

Insert the cross term $f(x_0)g(x_0)$ in the numerator:

$$
f(x)g(x_0)-f(x_0)g(x)
=
g(x_0)\bigl(f(x)-f(x_0)\bigr)-f(x_0)\bigl(g(x)-g(x_0)\bigr).
$$

Divide term by term:

$$
=
\frac{1}{g(x)}\cdot\frac{f(x)-f(x_0)}{x-x_0}
-\frac{f(x_0)}{g(x)g(x_0)}\cdot\frac{g(x)-g(x_0)}{x-x_0}.
$$

Let $x\to x_0$. Since $g$ is differentiable hence continuous, $g(x)\to g(x_0)\ne0$, so $1/g(x)\to1/g(x_0)$. The two difference quotients tend to $f'(x_0)$ and $g'(x_0)$. Hence

$$
\frac{f'(x_0)}{g(x_0)}-\frac{f(x_0)g'(x_0)}{g(x_0)^2}
=
\frac{f'(x_0)g(x_0)-f(x_0)g'(x_0)}{g(x_0)^2}.
$$

$\square$

The lecturer notes an alternative: prove the special case $1/g$ first (take $f\equiv1$), then apply Leibniz to $f\cdot(1/g)$. Both work; the direct common-denominator version finishes in one pass but has longer algebra.

## Building whole classes of functions

With four rules, enormous families of derivatives follow mechanically from two basic ones.

**Polynomials.** Since $x\mapsto x$ has derivative $1$, induction with Leibniz gives

$$
(x^n)'=nx^{n-1}.
$$

Concretely, $x^2=x\cdot x$ gives $(x^2)'=1\cdot x+x\cdot1=2x$; multiply by another $x$ and repeat. Hence for

$$
P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0,
$$

the sum rule differentiates term by term:

$$
P'(x)=na_nx^{n-1}+(n-1)a_{n-1}x^{n-2}+\cdots+a_1 .
$$

The constant term contributes $0$.

**Rational functions.** If $R(x)=P(x)/Q(x)$ with $P,Q$ polynomials, the quotient rule gives, wherever $Q(x)\ne0$,

$$
R'(x)=\frac{P'(x)Q(x)-P(x)Q'(x)}{Q(x)^2}.
$$

So **every polynomial and every rational function is differentiable wherever its denominator does not vanish**, and the derivative can be computed explicitly.

## The chain rule

The first three rules handle sums, products and quotients; the chain rule handles **composition**.

Let $f$ be defined on an interval and $g$ on an interval containing the image of $f$, with composition

$$
(g\circ f)(x)=g(f(x)).
$$

**Theorem.** If $f$ is differentiable at $x_0$ and $g$ is differentiable at $y_0=f(x_0)$, then $g\circ f$ is differentiable at $x_0$ and

$$
(g\circ f)'(x_0)=g'(y_0)\,f'(x_0).
$$

### Proof: first the case of nonzero derivative

Write $y=f(x)$ and $y_0=f(x_0)$. When $y\ne y_0$, the difference quotient factors as

$$
\frac{g(f(x))-g(f(x_0))}{x-x_0}
=
\frac{g(y)-g(y_0)}{y-y_0}\cdot\frac{f(x)-f(x_0)}{x-x_0}.
$$

This is pure algebra: multiply and divide by $y-y_0$.

**Assume $f'(x_0)\ne0$.** Then for $x$ sufficiently close to $x_0$ with $x\ne x_0$, the quotient $\dfrac{f(x)-f(x_0)}{x-x_0}$ stays close to the nonzero number $f'(x_0)$, hence is nonzero, so $y\ne y_0$ and the factorisation is legitimate.

Let $x\to x_0$:

- $f$ differentiable implies $f$ continuous, so $y\to y_0$;
- hence the first factor $\dfrac{g(y)-g(y_0)}{y-y_0}\to g'(y_0)$;
- the second factor $\to f'(x_0)$.

The product tends to $g'(y_0)f'(x_0)$.

### The remaining case: zero derivative

If $f'(x_0)=0$, split into two subcases.

- **$y=y_0$:** the numerator of the composite difference quotient is $g(y_0)-g(y_0)=0$, so the quotient is identically $0$ and the limit is $0=g'(y_0)\cdot0$.
- **$y\ne y_0$:** use the factorisation above. The second factor tends to $f'(x_0)=0$; the first factor $\dfrac{g(y)-g(y_0)}{y-y_0}$ is **bounded** near $y_0$ — it converges to the finite number $g'(y_0)$, and a convergent sequence is bounded. A bounded quantity times one tending to zero tends to $0$.

Both subcases give the limit $0=g'(y_0)f'(x_0)$. $\square$

**Why not divide by $y-y_0$ from the start?** Because it can happen that $f(x)=f(x_0)$ with $x\ne x_0$, making the denominator zero and the factorisation meaningless. Assuming $f'(x_0)\ne0$ rules this out (a quotient staying away from zero forces $f$ to separate nearby points), and the zero-derivative case is handled separately. This is a standard analytic strategy: **push the technical obstruction aside with an extra hypothesis, then return and patch it**.

## The necessary condition at a local extremum

The lecture closes by stating the next theorem; the proof comes next time.

**Definition.** $x_0$ is a **local maximum** of $f$ if there is $\delta>0$ such that $f(x)\le f(x_0)$ for all $x\in(x_0-\delta,x_0+\delta)$. A local minimum is the same with the inequality reversed.

**Theorem (Fermat).** If $f$ is differentiable at $x_0$ and $x_0$ is a local maximum or minimum, then $f'(x_0)=0$.

Intuitively the tangent at an extremum must be horizontal: a positive slope would mean larger values just to the right, a negative slope larger values just to the left, so neither can be an extremum.

This theorem is the seed of Rolle's theorem, hence of the mean value theorem, hence of L'Hôpital's rule and Taylor expansion — the main line of the next lecture.

## What this lecture establishes

- The derivative is the (two-sided) limit of the difference quotient; $x\ne x_0$ and a neighbourhood of $x_0$ are required.
- The derivative of a constant is $0$; the derivative of the identity is $1$.
- Differentiable implies continuous; continuous does not imply differentiable. $|x|$ and $x\sin(1/x)$ are continuous but not differentiable; $x^2\sin(1/x)$ is differentiable.
- The sum, Leibniz and quotient rules are proved by inserting cross terms and using limit algebra; Leibniz and the quotient rule rely on "differentiable implies continuous".
- The chain rule splits into $f'(x_0)\ne0$ and $f'(x_0)=0$; the latter needs separate treatment of $f(x)=f(x_0)$.
- From these rules every polynomial and rational function is differentiable, with an explicit derivative.
- At a local extremum the derivative vanishes (Fermat's lemma), the seed of the mean value theorem.

## Comprehension check

**1. Use the definition to prove that $f(x)=x^2$ is differentiable at every $x_0$, and find the derivative.**

Reference answer: The difference quotient is

$$
\frac{x^2-x_0^2}{x-x_0}=\frac{(x-x_0)(x+x_0)}{x-x_0}=x+x_0 \qquad (x\ne x_0).
$$

Letting $x\to x_0$ gives $2x_0$. So $f'(x_0)=2x_0$, i.e. $f'(x)=2x$. The factorisation cancels the denominator, the most direct way to differentiate a polynomial.

**2. Prove that differentiability implies continuity (show how $\delta_1$ is chosen).**

Reference answer: Let $f'(x_0)=L$. With $\varepsilon=1$ there is $\delta>0$ such that $0<|x-x_0|<\delta$ implies $\left|\frac{f(x)-f(x_0)}{x-x_0}-L\right|<1$. Multiplying out gives $|f(x)-f(x_0)-L(x-x_0)|<|x-x_0|$, so

$$
|f(x)-f(x_0)|\le|f(x)-f(x_0)-L(x-x_0)|+|L||x-x_0|<(1+|L|)|x-x_0|.
$$

Given $\varepsilon>0$, take $\delta_1=\min\{\delta,\varepsilon/(1+|L|)\}$; then $0<|x-x_0|<\delta_1$ gives $|f(x)-f(x_0)|<\varepsilon$, and at $x=x_0$ the left side is $0$. Hence $f$ is continuous.

**3. Why is $|x|$ not differentiable at $0$, while $x^2\sin(1/x)$ is?**

Reference answer: The difference is in the quotient. For $|x|$ the quotient is $\operatorname{sgn}(x)$, with right limit $1$ and left limit $-1$, so the two-sided limit fails. For $x^2\sin(1/x)$ the quotient is $x\sin(1/x)$; although $\sin(1/x)$ oscillates between $-1$ and $1$, the factor $x$ damps it, $|x\sin(1/x)|\le|x|\to0$, and the limit exists and equals $0$. The first fails because a corner gives different one-sided slopes; the second is flattened because the amplitude decays.

**4. Prove the Leibniz rule and identify where continuity is used.**

Reference answer: Write the quotient as

$$
\frac{f(x)g(x)-f(x_0)g(x_0)}{x-x_0}
=
g(x)\frac{f(x)-f(x_0)}{x-x_0}+f(x_0)\frac{g(x)-g(x_0)}{x-x_0},
$$

inserting $-\,f(x_0)g(x)+f(x_0)g(x)$ in the middle. As $x\to x_0$ the first quotient tends to $f'(x_0)$ and the second to $g'(x_0)$. **Continuity is used to replace the limit of $g(x)$ by $g(x_0)$**; since $g$ is only assumed differentiable, "differentiable implies continuous" must come first. Without it the limit of $g(x)$ is not available.

**5. Use the quotient rule to differentiate $f(x)=1/x$ and state the domain restriction.**

Reference answer: Take numerator $1$ and denominator $x$. The quotient rule gives

$$
f'(x)=\frac{0\cdot x-1\cdot1}{x^2}=-\frac{1}{x^2},\qquad x\ne0 .
$$

The quotient rule requires the denominator to be nonzero near the point, so the conclusion holds only for $x\ne0$. It also shows $1/x$ is not differentiable at $0$ — it is not even defined there.

**6. In the chain rule proof, why can the limit of a product not be applied directly to $\dfrac{g(f(x))-g(f(x_0))}{x-x_0}$?**

Reference answer: To write it as a product one must multiply and divide by $f(x)-f(x_0)$, but when $f(x)=f(x_0)$ this factor is zero and the division is illegal. The proof therefore splits into cases: first assume $f'(x_0)\ne0$, which keeps the difference quotient away from zero and guarantees $f(x)\ne f(x_0)$ near $x_0$, making the division legitimate; then handle $f'(x_0)=0$, where terms with $f(x)=f(x_0)$ give a zero quotient and terms with $f(x)\ne f(x_0)$ have one bounded factor times one tending to zero.

**7. Give a function that is differentiable at a point but whose derivative is discontinuous there.**

Reference answer: Take

$$
f(x)=
\begin{cases}
x^2\sin\dfrac1x, & x\ne0,\\
0, & x=0.
\end{cases}
$$

It is differentiable at $0$ with $f'(0)=0$ (the quotient is $x\sin(1/x)\to0$). But for $x\ne0$,

$$
f'(x)=2x\sin\frac1x-\cos\frac1x,
$$

and $\cos(1/x)$ does not converge as $x\to0$, so $f'$ is discontinuous at $0$. Thus differentiability does not imply continuity of the derivative; that is a genuinely stronger condition.

## Relation to neighbouring lectures

This lecture establishes the definition of the derivative and four rules, turning "differentiable" from a limit condition into a workable algebraic tool. The next lecture starts from Fermat's lemma and proves Rolle's theorem, the mean value theorem, L'Hôpital's rule and Taylor expansion. Later, integration arrives, and the differentiation rules become one half of the fundamental theorem of calculus. The logic of the course never changes: give a rigorous definition, prove a lemma that looks routine, then use it to lever a whole chain of theorems.
