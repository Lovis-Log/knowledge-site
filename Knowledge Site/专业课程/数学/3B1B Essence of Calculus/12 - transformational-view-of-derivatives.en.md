---
slug: "12-transformational-view-of-derivatives"
title: "Another Way to See the Derivative: Local Stretch Factor"
summary: "The derivative is a slope, but only one reading. Treat a function as carrying the input number line onto the output number line and the derivative becomes \"how many times does a neighbourhood get stretched or squashed.\" Applied to a continued fraction, it settles which fixed point wins: stretch factor below 1 pulls points in, above 1 pushes them away."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [derivative, transformation, fixed-point, golden-ratio]
sources:
  - kind: "video"
    title: "The other way to visualize derivatives | Chapter 12, Essence of calculus"
    url: "https://www.youtube.com/watch?v=CfW845LNObM"
    author: "3Blue1Brown"
    publishedAt: "2018-05-19"
---

## The thread of the lecture

Every visual intuition in this series rests on graphs: the derivative is a tangent's slope, the integral an area under a curve.

That works beautifully for functions of one real variable, but it hides a trap: **once you leave that setting, graphs stop existing**. Multivariable functions, complex functions, maps between manifolds — none of them can be drawn as "a curve with a tangent line." If your understanding of the derivative is welded to slope, entering those subjects costs an unnecessary conceptual climb.

This lecture offers another view: **a function is a carrying of points**, moving them from the input number line to the output number line. In that view the derivative is not a slope but **how many times a neighbourhood gets stretched or squashed**.

The view is then used to settle a puzzle about continued fractions, and to answer why only one of two algebraic solutions deserves to be called the value.

## Timeline

| Time | Topic |
| --- | --- |
| 0:45 | The standard picture: the derivative is a tangent's slope |
| 2:22 | The other view: a function maps one number line to another |
| 3:12 | $x^2$ stretches a neighbourhood of 1 by about 2 |
| 3:58 | It compresses a neighbourhood of $1/4$ by half |
| 4:13 | Near 0, the neighbourhood collapses to a point |
| 5:44 | The continued fraction $1+\frac{1}{1+\frac{1}{1+\cdots}}$ |
| 6:36 | Two fixed points: $\varphi$ and $-1/\varphi$ |
| 8:50 | Cobweb diagrams: across to $y=x$, then up to the curve |
| 11:41 | At $\varphi$ the derivative is $-0.38$, so points are pulled in |
| 12:23 | $\lvert f' \rvert < 1$ stable, $>1$ unstable |

## The derivative is a slope — but only one reading

In the graphical view, the derivative is a new function: given $x$, it returns the slope of the tangent there.

Grant's warning: do not take "the derivative is the slope" as the definition. The more fundamental statement is that **the derivative measures how sensitive the function is to tiny nudges in its input**.

Slope is what that sensitivity looks like in one particular representation. Change the representation and the same sensitivity wears a different face.

## The transformational view: a function carries a number line

Here is the new view. A function is a mapping: each point of the input number line is carried to a position on the output number line.

![Left: a small step dx from 3 to 3.01 on the input line; right: the corresponding step 6dx from 9 to 9.06 on the output line; a ×6 chip marks the factor](/images/12-transformational-view-en.svg)

*Figure: near x=3, f(x)=x² stretches an input step of 0.01 into an output step of 0.06 — the factor is the derivative, 6.*

In this view the derivative answers: **near a given input, by what factor is a small distance stretched or shortened?**

Concretely: take a small cluster of evenly spaced points near some input and look at where they land. If the spacing was 0.01 and becomes 0.02, the neighbourhood was stretched by 2, and the derivative is 2.

### Four locations, four behaviours

Try $x^2$.

- **Near $x=1$**: the cluster's spacing roughly doubles. That is what "the derivative of $x^2$ at 1 is 2" looks like in transformation language.
- **Near $x=3$**: the spacing grows about sixfold. Derivative 6.
- **Near $x=1/4$**: the spacing shrinks to half. Derivative $1/2$ — **a derivative below 1 means compression**.
- **Near $x=0$**: however far you zoom, the neighbourhood looks more and more like it is crushed to a single point. Derivative 0.

### Signs and flips

One more place is worth visiting: near $x=-2$.

There the points are not merely stretched; they are **flipped** — what was on the left lands on the right. The stretch is fourfold and the orientation reverses, which together give a derivative of $-4$.

So a negative sign has a clear meaning here: **the local direction is reversed**. This is also why $x^2$ maps the negative half of the line onto the same region as the positive half — two different neighbourhoods land on the same place, one of the inconveniences of the transformational view.

But derivatives only care about the local picture, so the inconvenience is not fatal.

## A continued fraction puzzle

Now put the view to work.

Consider the infinite continued fraction

$$
1 + \frac{1}{1 + \dfrac{1}{1 + \dfrac{1}{1 + \cdots}}}
$$

The standard approach sets it equal to $x$, notices that a complete copy of itself appears inside, and writes

$$
x = 1 + \frac{1}{x}.
$$

Rearranging gives $x^2 - x - 1 = 0$, whose two roots are

$$
\varphi = \frac{1+\sqrt5}{2} \approx 1.618,
\qquad
-\frac{1}{\varphi} \approx -0.618 .
$$

The first is the golden ratio. The second is its "little brother": it inherits most of $\varphi$'s algebraic properties (it too satisfies $x^2 = x + 1$).

So the question: **is the continued fraction also equal to $-0.618$?**

Intuition says no — everything on the left is positive, so how could it equal a negative number? But intuition needs an argument.

## Why $\varphi$ is the elder brother

First, pin down what "the infinite continued fraction equals some number" means.

One natural reading treats it as an iteration: start from some seed and repeatedly apply

$$
f(x) = 1 + \frac{1}{x},
$$

then ask what the sequence approaches.

Under that reading, seeding with $-0.618$ does work in a trivial sense: it is a fixed point, $f(-0.618) = -0.618$, so iterating leaves it exactly where it is.

But one decisive fact remains: **from any other seed, the iteration runs to $1.618$**.

Try it on a calculator. Pick any number and press "$1 + 1/x$" over and over. Positive, negative, or extremely close to $-0.618$ — everything is eventually pulled back to $1.618$.

That is what makes $\varphi$ the elder brother: $\varphi$ is **attracting**, and $-0.618$ is **repelling**.

## Cobweb diagrams: the graphical approach

Before the transformational explanation, the graphical one, for contrast.

Plot $f(x) = 1 + 1/x$ together with the line $y = x$.

To iterate once: from some $x$, move vertically to the curve to get the output $y$; then move **horizontally** to $y = x$, turning that $y$ into a new $x$; then vertically to the curve again, and so on.

The resulting zigzag looks like a spider web, hence the name.

It works, but it is awkward: every step you have to stop and remember whether to go across or up first. And to judge convergence you must watch whether the web spirals inward or outward.

## Explaining stability with stretch factors

The transformational view is far more direct.

Treat $f$ as a carrying of points; iterating means carrying the landed points again.

Now look near $\varphi$. What is the stretch factor there?

$$
f'(x) = -\frac{1}{x^2},
\qquad
f'(\varphi) = -\frac{1}{\varphi^2} \approx -0.382 .
$$

Its magnitude is less than 1, which means **points in the neighbourhood are pulled closer on every iteration**. Two points 0.1 apart end up about 0.038 apart, then closer still. The neighbourhood contracts and everything is drawn toward $\varphi$.

Now near $-0.618$:

$$
f'(-0.618) = -\frac{1}{0.382} \approx -2.618 .
$$

Magnitude greater than 1, which means **points are pushed away on every iteration**, at least doubling their distance, with a flip as well. So even a seed a millionth away is flung out within a few iterations and eventually lands at $\varphi$.

That is why the two fixed points are not equals.

### A general criterion

A useful rule falls out:

> For the iteration $x_{n+1} = f(x_n)$, a fixed point $x^*$ is **stable** if $\lvert f'(x^*)\rvert < 1$, and **unstable** if $\lvert f'(x^*)\rvert > 1$.

Stable means a small perturbation returns; unstable means a small perturbation is amplified and carried away.

The rule explains a purely numerical phenomenon: why hammering the equals key always produces $\varphi$ and never $-0.618$.

As for whether the continued fraction "really equals" $-0.618$ — Grant's position is that it depends on what you take the expression to be. Read as a limiting process, every seed except $-0.618$ converges to $\varphi$, so treating the two as equally valid feels silly; read as a purely algebraic object, like the roots of a polynomial, both values are legitimate. There is no unique right answer, only a convention.

## How far the criterion reaches

Finally, why bother with this view at all.

Grant concedes that drawing an entire function as a carrying between number lines is clunkier than drawing a graph, and less convenient in practice. He recommends it not as a replacement but as a way to make your grasp of the derivative **more flexible**.

The real payoff comes later:

- **Multivariable calculus**: a function carries the plane to the plane, and its derivative becomes a matrix (the Jacobian) describing how a neighbourhood is stretched, rotated, and sheared. Slope is hopeless there; "local linear map" is the correct generalisation.
- **Complex analysis**: a complex function carries the plane to the plane, and its derivative is a complex number whose modulus is the stretch factor and whose argument is the rotation angle. The Cauchy–Riemann equations say precisely that this local map must be a rotation combined with a scaling.
- **Differential geometry**: for maps between manifolds, the derivative is a linear map between tangent spaces at each point.

The shared language of all three is "derivative = local linear approximation / stretch." The graphical picture cannot travel there; the transformational one can.

## What this lecture establishes

- The derivative is a slope, but that is only what sensitivity looks like in the graphical representation, not the definition.
- In the transformational view a function maps the input number line to the output one, and the derivative gives the local stretch or compression factor.
- For $x^2$: stretch 2 at $x=1$, 6 at $x=3$, compression by half at $x=1/4$, collapse at $x=0$ — derivatives $2,6,\tfrac12,0$.
- A negative derivative means a local flip; the magnitude is still the stretch factor.
- The continued fraction satisfies $x = 1+1/x$, giving $\varphi \approx 1.618$ and $-1/\varphi \approx -0.618$.
- Iterating $f(x)=1+1/x$ sends every seed except $-0.618$ to $\varphi$.
- $\lvert f'(\varphi)\rvert \approx 0.382 < 1$ makes $\varphi$ stable; $\lvert f'(-0.618)\rvert \approx 2.618 > 1$ makes the other unstable.
- General criterion: a fixed point is stable when the derivative's magnitude there is below 1, unstable when above.
- The view generalises: Jacobians in multivariable calculus, stretch and rotation in complex analysis, tangent maps in differential geometry.

## Check your understanding

**1. Why should "the derivative is a slope" not be taken as the definition?**

Answer: because slope only means something when inputs and outputs are real numbers that can be drawn as a plane curve. The deeper meaning of the derivative is "how sensitive the function is to tiny input nudges," and slope is that sensitivity rendered geometrically in a graph. Once the function is no longer a real function of one variable — say a map of the plane to itself — no graph exists, yet sensitivity still does, now expressed as a matrix or a complex number.

**2. In the transformational view, what does a derivative of 0 look like, and what does a negative derivative look like?**

Answer: at derivative 0, however far you zoom, a neighbourhood looks increasingly like it is crushed to a single point — the local stretch factor is zero and directional information is lost, as with $x^2$ near 0. At a negative derivative the neighbourhood is stretched (or compressed) and simultaneously flipped: points that were on the left land on the right, as with $x^2$ near $-2$, where the stretch is 4 and the orientation reverses.

**3. Both roots satisfy the same equation, so why is only one a legitimate "value"?**

Answer: because "the infinite continued fraction equals a number" must first be given a meaning. Read as the limit of the iteration $x_{n+1}=1+1/x_n$, only $\varphi$ is attracting: every seed other than $-0.618$ converges to it, while $-0.618$ itself repels, so any tiny deviation is amplified away. Read as a purely algebraic object — a symbolic expression satisfying the equation — both roots qualify. The difference is whether you treat the expression as a process or as an object.

**4. Why does "derivative magnitude below 1" imply stability? Explain in stretch language.**

Answer: let the fixed point be $x^*$ and the distance from a nearby point be $\delta$. After one iteration that distance becomes approximately $\lvert f'(x^*)\rvert \cdot \delta$ to first order. If $\lvert f'\rvert<1$ the distance shrinks proportionally, so repeated iteration drives it to zero and the point is drawn back. If $\lvert f'\rvert>1$ the distance grows proportionally and the point is pushed away. A negative derivative only reverses direction (left–right flip) and does not affect whether distances shrink or grow, which is why only the magnitude matters.

**5. What does the transformational view correspond to in multivariable calculus?**

Answer: the Jacobian matrix. A multivariable function maps a small region around a point to another region, and to first order that map is linear, described by a matrix whose columns are the partial derivative vectors: they say where a small step in each input direction is carried and how much it is stretched. The determinant gives the factor by which area (or volume) is scaled — the higher-dimensional version of the stretch factor.
