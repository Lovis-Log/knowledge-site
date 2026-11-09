---
slug: "06-implicit-differentiation"
title: "Implicit Differentiation: Why You May Differentiate Both Sides"
summary: "A circle is not a function graph and y is not an output, so ordinary differentiation does not apply. Read x²+y² as a two-input function instead: 2x dx + 2y dy is how much it changes under any small step — and staying on the curve just means that change is zero."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [implicit-differentiation, related-rates, multivariable, natural-log]
sources:
  - kind: "video"
    title: "Implicit differentiation, what's going on here? | Chapter 6, Essence of calculus"
    url: "https://www.youtube.com/watch?v=qb40J4N1fa4"
    author: "3Blue1Brown"
    publishedAt: "2017-05-03"
---

## The thread of the lecture

Some curves are not function graphs. The circle of radius 5 centred at the origin is defined by $x^2 + y^2 = 25$, but $y$ is not a function of $x$ — the same $x$ gives two values of $y$. So how do you find the slope of its tangent?

The calculus-class procedure is to differentiate both sides,

$$
2x\,dx + 2y\,dy = 0 ,
$$

and rearrange to get $\dfrac{dy}{dx} = -\dfrac{x}{y}$.

Many people find this baffling the first time: **what does it mean to differentiate an expression in two variables, and why may you casually attach $dx$ and $dy$ like that?**

This lecture answers exactly that. The answer comes in two steps: a ladder problem first establishes a setting where differentiating both sides is clearly legitimate, and then the circle turns out to be that setting with the time parameter stripped away.

## Timeline

| Time | Topic |
| --- | --- |
| 0:16 | The circle $x^2+y^2=25$: tangent slope at $(3,4)$ |
| 2:12 | Differentiating both sides: $2x\,dx + 2y\,dy = 0$ |
| 3:09 | A ladder problem: a 5-metre ladder, top sliding down at 1 m/s |
| 5:21 | The left side is a function of time, though its value is constant |
| 8:03 | Naming $x^2+y^2$ as $S$: a function of two inputs |
| 9:35 | $2x\,dx + 2y\,dy$ is the $dS$ caused by any small step |
| 10:20 | Staying on the circle just means $dS = 0$ |
| 10:50 | A second example: $\sin x \cdot y^2 = x$ |
| 13:16 | Using implicit differentiation to find the derivative of $\ln x$ |
| 14:06 | $e^y = x$ collapses the result to $1/x$ |

## The circle: a curve that is not a graph

Points on the circle satisfy $x^2 + y^2 = 25$, which is the Pythagorean theorem in disguise: the distance from the origin to $(x,y)$ is 5, so the sum of the squares of the two legs equals the square of the hypotenuse.

![Left: the tangent at (3,4) on the circle x²+y²=25, slope −3/4, with the dashed radius of slope 4/3; right: a 5 m ladder against a wall, top sliding down at 1 m/s and foot moving out at 4/3 m/s](/images/06-implicit-circle-en.svg)

*Figure: the tangent is perpendicular to the radius, and implicit differentiation gives the same slope; the ladder just adds time to the same constraint.*

We want the tangent slope at $(3,4)$. There is a geometric shortcut: the tangent is perpendicular to the radius at that point. The radius has slope $4/3$, so the tangent has slope $-3/4$.

But that shortcut works only for circles. Another curve offers no "radius" to speak of, so a general method is needed.

The general idea is the familiar one: zoom in until the curve looks like a straight line, then ask for the ratio of vertical to horizontal change along a small step. The vertical component is $dy$, the horizontal $dx$, and the slope is $dy/dx$.

The trouble is that **this curve is not the graph of a function**. $x$ is not an input and $y$ is not an output; they are simply two quantities tied together by an equation. You cannot ask "give $x$ a $dx$, how much does $y$ move," because on the circle one $x$ corresponds to two $y$'s.

Such a curve is called an **implicit curve**: the set of all points $(x,y)$ satisfying some equation.

## The strange procedure

The textbook method is to differentiate each side of the equation.

- $x^2$ becomes $2x\,dx$;
- $y^2$ becomes $2y\,dy$;
- the constant 25 on the right becomes 0.

Hence

$$
2x\,dx + 2y\,dy = 0 ,
$$

and rearranging,

$$
\frac{dy}{dx} = -\frac{x}{y} .
$$

At $(3,4)$ that gives $-3/4$, matching the geometric shortcut.

The answer is right, but the process is unsettling: **what is being differentiated, and with respect to what?**

## The ladder: the same equation, plus time

Set the circle aside and consider a different problem.

A 5-metre ladder leans against a wall. Initially the top is 4 metres above the ground, so by Pythagoras the bottom is 3 metres from the wall. The ladder slips, with the top descending at $1\ \mathrm{m/s}$. How fast is the bottom moving away from the wall at that instant?

The interesting part: **the distance from the bottom to the wall is completely determined by the height of the top.** The ladder's fixed length locks the two together, so the rate of one dictates the rate of the other.

Name the two quantities, and be explicit that they are functions of time:

$$
y(t) = \text{height of the top}, \qquad x(t) = \text{distance of the bottom from the wall}.
$$

The constraint is

$$
x(t)^2 + y(t)^2 = 25 .
$$

Its power lies in holding **at every instant**. It is not a snapshot but an identity running through the whole motion.

### Differentiating with respect to time

Now ask: after a small time $dt$, with $x$ growing a little and $y$ shrinking a little, how much does the left side change?

On one hand, the left side equals 25 at all times, and **a constant does not care about the passage of time**, so its rate of change is 0.

On the other hand, compute that rate directly. The rate of $x(t)^2$ is $2x \cdot \dfrac{dx}{dt}$ (chain rule: square outside, $x(t)$ inside); the rate of $y(t)^2$ is $2y \cdot \dfrac{dy}{dt}$.

Their sum must vanish:

$$
2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0 .
$$

Substitute $x=3$, $y=4$, $\dfrac{dy}{dt} = -1$:

$$
2 \cdot 3 \cdot \frac{dx}{dt} + 2 \cdot 4 \cdot (-1) = 0
\quad\Longrightarrow\quad
\frac{dx}{dt} = \frac{4}{3}\ \mathrm{m/s}.
$$

The bottom slides outward at $4/3$ metres per second.

## The difference between the two cases

Put the ladder and the circle side by side: both differentiate $x^2 + y^2 = 25$ on both sides.

The difference is **what the derivative is taken with respect to**.

- In the ladder, $x$ and $y$ are both functions of time, so the derivative is with respect to $t$. Differentiating both sides then has a clear meaning: let a little time pass, each side changes by some amount, and the two amounts must be equal or the equation would fail.
- In the circle, there is no time. The $dx$ and $dy$ are **floating**, attached to no common parameter.

That is the source of the confusion: the same operation, one with a definite independent variable and one without.

## Reading $x^2+y^2$ as a two-input function

The way out is a change of viewpoint: stop reading $x^2+y^2$ as "the left side of some curve's equation" and read it as **a function that accepts two inputs**.

Give it a name:

$$
S(x,y) = x^2 + y^2 .
$$

Its input is a point $(x,y)$ in the plane; its output is a number. Points on the circle output exactly 25; stepping outward gives more, stepping toward the origin gives less.

Now ask: **take a small step on this function — how much does the output change?**

The step has two components, $dx$ and $dy$. Note that the step **need not stay on the circle**; it may point anywhere in the plane.

Call the change $dS$. Look at the two directions separately:

- Changing $x$ by $dx$ changes $x^2$ by $2x\,dx$ ($y$ is constant in that term);
- Changing $y$ by $dy$ changes $y^2$ by $2y\,dy$ ($x$ is constant in that term).

Together:

$$
dS = 2x\,dx + 2y\,dy .
$$

That is what the "strange expression" actually means. It is not symbol-pushing; it is a **recipe**: given a starting point $(x,y)$ and a small step $(dx,dy)$, it tells you how much $S$ changes.

A concrete number. Start at $(3,4)$ and step $dx = -0.02$, $dy = -0.01$. Then

$$
dS \approx 2 \cdot 3 \cdot (-0.02) + 2 \cdot 4 \cdot (-0.01)
= -0.12 - 0.08 = -0.20 .
$$

So $S$ falls from 25 to about 24.8. Check: $(2.98)^2 + (3.99)^2 = 8.8804 + 15.9201 = 24.8005$. It matches.

Of course this is an approximation, better for smaller $dx$ and $dy$ — as with every derivative.

## Walking along the curve means $dS = 0$

Here is the key step.

If the step is to **stay on the circle**, then $S$ cannot change: it starts at 25 and must still be 25 at the end. That is,

$$
dS = 0 .
$$

Which gives

$$
2x\,dx + 2y\,dy = 0 .
$$

That is exactly the result of the "strange procedure," now with a clear reading: **it is not differentiation with respect to some variable, but the condition that an arbitrary small step leaves the function's value unchanged.**

Strictly speaking, $dS = 0$ keeps the step on the **tangent line** rather than on the circle, since $dS$ is only first-order and ignores second-order terms. But for small enough steps the tangent and the circle nearly coincide, so the condition gives the tangent direction.

And $dy/dx$ is exactly that tangent slope. The whole thing now hangs together:

1. $S$ is a function of two inputs;
2. a step along the curve must leave $S$ unchanged;
3. setting $dS = 0$ and solving for $dy/dx$ gives the tangent slope.

## A second example

Take a more complicated curve:

$$
\sin x \cdot y^2 = x .
$$

This describes a family of U-shaped curves. Again take an arbitrary small step $(dx,dy)$ and see how each side changes.

The left side is a product, so the product rule applies (left d right, right d left):

$$
d(\sin x \cdot y^2) = \sin x \cdot 2y\,dy + y^2 \cdot \cos x\,dx .
$$

The right side is $x$, whose change is just $dx$.

For the step to stay on the curve, the two changes must agree:

$$
\sin x \cdot 2y\,dy + y^2\cos x\,dx = dx .
$$

From here it is algebra. The most common goal is $dy/dx$: keep the $dy$ terms on the left and move the rest over,

$$
2y \sin x \, dy = \left(1 - y^2 \cos x\right) dx ,
$$

so

$$
\frac{dy}{dx} = \frac{1 - y^2\cos x}{2y\sin x} .
$$

Note the result involves both $x$ and $y$. That is natural: a point on the curve is fixed by two coordinates, so the slope may well depend on both.

## Using implicit differentiation to get the derivative of $\ln x$

Implicit differentiation has another important use: **deriving new derivative formulas**.

We know $e^x$ is its own derivative. What about its inverse, $\ln x$?

The graph of $\ln x$ can be read as an implicit curve: all points with $y = \ln x$. Its slope is the derivative of $\ln x$.

Rewrite the equation in exponential form:

$$
e^y = x .
$$

That is just the definition of the natural logarithm: $y$ is the power to which $e$ must be raised to give $x$.

Now take a small step $(dx, dy)$ on both sides. The left side $e^y$ changes by $e^y \cdot dy$ (since $e$ is its own derivative); the right side changes by $dx$. Staying on the curve forces them equal:

$$
e^y\,dy = dx .
$$

Rearrange:

$$
\frac{dy}{dx} = \frac{1}{e^y} .
$$

But on the curve, $e^y$ is $x$ by definition. Therefore

$$
\frac{d}{dx}\ln x = \frac{1}{x} .
$$

The derivation used only two facts: $e^y$ is its own derivative, and $\ln$ and $e$ are inverses. No extra knowledge about logarithms was needed.

As an aside, this line of thinking is a trailer for multivariable calculus, which studies how a function changes when several inputs move at once. This lecture takes a first bite in two dimensions.

## What this lecture establishes

- An implicit curve is a set of points satisfying an equation, not a function graph; $y$ is not an output, so ordinary differentiation does not apply.
- Differentiating both sides is legitimate, most clearly in the ladder: $x$ and $y$ are functions of time, the equation holds at every instant, so the two sides must change at equal rates.
- The circle is that situation with the time parameter removed: $dx$ and $dy$ float free, but still mean the two components of a small step.
- Reading $x^2+y^2$ as a two-input function $S(x,y)$, $dS = 2x\,dx + 2y\,dy$ is the change caused by any small step.
- Requiring the step to stay on the curve means requiring $dS = 0$; strictly this gives the tangent direction, which coincides with the curve for small steps.
- Solving for $dy/dx$ gives the tangent slope, typically depending on both $x$ and $y$.
- The same method yields the derivative of $\ln x$: from $e^y = x$ comes $e^y\,dy = dx$, hence $1/x$.

## Check your understanding

**1. Why can't a circle be differentiated directly the way a parabola can?**

Answer: direct differentiation requires writing $y$ as a function of $x$, so that "an input change $dx$ produces an output change $dy$" has a meaning. On a circle, one $x$ corresponds to two $y$ values (upper and lower arcs), so $y$ is not a function of $x$ and cannot be written as a single $f(x)$. An implicit curve only guarantees that points satisfy an equation; it does not guarantee such a functional relation.

**2. In the ladder problem, why is "differentiate both sides" unambiguous, while in the circle problem it is not?**

Answer: in the ladder, $x$ and $y$ are both functions of time and the equation holds at every instant, so differentiating with respect to $t$ has a definite meaning: time passes by $dt$, each side changes by some amount, and the amounts must match. The circle has no such common parameter, so $dx$ and $dy$ belong to no independent variable and "differentiate with respect to what?" has no answer — until the interpretation is changed.

**3. In $dS = 2x\,dx + 2y\,dy$, are $dx$ and $dy$ independent?**

Answer: at the moment $dS$ is written, yes — they describe an arbitrary small step in any direction of the plane and may be chosen freely. Only when the step is required to stay on the curve does the constraint $dS = 0$ bind them together and fix the ratio $dy/dx$. Keeping the two stages apart matters: first allow any direction, then impose the constraint.

**4. Why does $dS = 0$ strictly describe the tangent line rather than the curve?**

Answer: because $dS$ is a first-order approximation — the linear part of the change in the function's value — and ignores the second-order terms $dx^2$, $dx\,dy$, $dy^2$. Moving along the tangent makes the first-order change zero while the second-order terms do not vanish, so the point drifts slightly off the curve; moving along the curve makes the total change exactly zero. The two agree only as $dx, dy \to 0$, so $dS = 0$ pins down the tangent direction.

**5. When deriving the derivative of $\ln x$, why is it legitimate to replace $e^y$ by $x$?**

Answer: because the derivation stays on the curve, and every point on that curve satisfies $e^y = x$ — that is precisely what $\ln x$ means. The slope expression $\frac{1}{e^y}$ still contains $y$, but the derivative should be a function of $x$, so $y$ must be eliminated. Using the curve's own equation for that substitution is valid, and it yields $\frac{1}{x}$.
