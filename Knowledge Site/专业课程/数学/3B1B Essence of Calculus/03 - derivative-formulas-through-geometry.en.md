---
slug: "03-derivative-formulas-through-geometry"
title: "Derivative Formulas, Seen Geometrically"
summary: "Read x² as a square, x³ as a cube, 1/x as a puddle of fixed area, and sin θ as a height on the unit circle — and the derivative rules stop being things to memorize and become answers to \"what appears when I stretch this a little?\""
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [derivative, power-rule, geometry, trigonometric-functions]
sources:
  - kind: "video"
    title: "Derivative formulas through geometry | Chapter 3, Essence of calculus"
    url: "https://www.youtube.com/watch?v=S0_qX4VJhMQ"
    author: "3Blue1Brown"
    publishedAt: "2017-04-30"
---

## The thread of the lecture

The previous lecture defined the derivative. This one asks how to compute it.

Most calculus courses turn this into a table: the power rule, the derivatives of the trigonometric functions, the exponential — memorize them, then do exercises. Grant argues against that, for a practical reason: once the rules become a chant, people forget that they all say the same thing — **push the input up a little, see how much the output moves**.

Four geometric images carry the whole lecture:

- $x^2$ is a square;
- $x^3$ is a cube;
- $1/x$ is a puddle whose area stays fixed at 1;
- $\sin\theta$ is a height on the unit circle.

Each image hands you the formula directly, with no algebra required.

## Timeline

| Time | Topic |
| --- | --- |
| 1:41 | Starting with $f(x)=x^2$: nudge $x$ by $dx$, what is $dF$? |
| 2:30 | Reading $x^2$ as a square of side $x$ |
| 3:06 | The new area splits into two strips and a small square |
| 4:07 | Drop $dx^2$ and $dF = 2x\,dx$ remains |
| 4:45 | Reading $x^3$ as a cube |
| 5:33 | Three faces, each contributing $x^2\,dx$ |
| 7:18 | The power rule: the derivative of $x^n$ is $nx^{n-1}$ |
| 8:30 | Why: choosing exactly one $dx$ from $n$ brackets |
| 10:42 | $1/x$: a rectangular puddle of area 1 |
| 12:36 | $\sin\theta$: a small step $d\theta$ around the unit circle |

## Why bother with abstract functions

A fair question first: why study the derivatives of $x^2$ and $\sin x$ rather than real rate-of-change problems?

Because real-world models are built out of exactly these functions. Polynomials, trigonometric functions, and exponentials are the standard bricks, and fluency with their derivatives gives you a vocabulary for rates of change. Faced with a concrete problem, you translate it into a combination of these bricks and the rest is lookup.

The danger is right there: **this material degenerates into recitation very easily**. And once it does, the underlying idea — that a derivative watches one small change produce another — disappears. Hence the geometric rebuild, here and in the next lecture.

## $x^2$: a square being stretched

Asking for the derivative of $f(x)=x^2$ is asking: starting from some $x$, increase it by a tiny $dx$; how much does $f$ grow? Call that growth $dF$. The derivative is $dF/dx$.

![Left: a square of side x grows by dx, giving two strips of area x·dx and a corner dx²; middle: the right triangle inside the unit circle with legs cosθ and sinθ; right: the similar triangle at the circle, hypotenuse dθ and adjacent side cosθ·dθ](/images/03-derivative-formulas-en.svg)

*Figure: growing a square gives d(x²)=2x·dx; the little triangle at the circle is similar to the big one, giving d(sinθ)=cosθ·dθ.*

The graph gives a first impression. The parabola's tangent gets steeper as $x$ grows: flat at $x=0$ with slope 0, steeper at $x=1$, steeper still at $x=2$. That tells you the derivative is increasing, but **no amount of staring at a graph yields the exact formula**.

For the formula, return to what $x^2$ literally means: the area of a square with side $x$.

Stretch the side from $x$ to $x + dx$. The new area comes in three pieces:

- A vertical strip on the right, $dx$ wide and $x$ tall: area $x \cdot dx$;
- A horizontal strip on top, $x$ wide and $dx$ tall: area $x \cdot dx$;
- A small square in the corner, side $dx$: area $dx^2$.

Therefore

$$
dF = 2x\,dx + dx^2 .
$$

### Why $dx^2$ can be dropped

This is the crucial step. Take $x=3$ and $dx=0.01$: the two strips contribute $2 \cdot 3 \cdot 0.01 = 0.06$, the corner square contributes $0.0001$. The first is 600 times the second.

The smaller $dx$ is, the wider that ratio. The reason is that $dx^2$ is a fraction $dx$ of $dx$ — it vanishes as $dx \to 0$, and vanishes faster. So after dividing by $dx$:

$$
\frac{dF}{dx} = 2x + dx \;\longrightarrow\; 2x .
$$

Hence $(x^2)' = 2x$. Starting at $x=3$, each extra unit of side length adds 6 units of area; starting at $x=5$, it adds 10.

A useful rule of thumb: **any term containing $dx$ to a power above 1 can be discarded**. You are going to divide by one $dx$ at the end, and whatever $dx$ remains goes to zero in the limit. This rule reappears in every section below.

## $x^3$: a cube being stretched

Same idea, one dimension up. $x^3$ is the volume of a cube with side $x$.

Stretch the side to $x + dx$. Where does the new volume sit?

- Three faces: each is a square of side $x$, pushed outward by $dx$, giving $x^2 \cdot dx$ each;
- Three edges: long thin slabs whose volumes scale as $dx^2$;
- One corner: a tiny cube of volume $dx^3$.

So

$$
dV = 3x^2\,dx + (\text{terms with } dx^2 \text{ and } dx^3) .
$$

Dropping the rest gives $(x^3)' = 3x^2$.

This matches the algebraic expansion of $(x+dx)^3$ from the previous lecture exactly — one version expands three brackets, the other counts three faces. **One fact, two languages.**

The graph is consistent with this: $x^3$ is steep on the left, flat at the origin, steep again on the right, and $3x^2$ has precisely that shape (never negative, zero at the origin). But notice: the graph can only confirm the shape. The coefficient 3 comes from the structural fact that a cube has three faces.

## The power rule: one $dx$ out of $n$ brackets

Two gives 2, three gives 3, and the pattern is clear: $(x^n)' = n x^{n-1}$. This is the **power rule**.

Once fluent, the move becomes "the exponent hops down front and decrements itself," and nobody asks why. But why does it hold for every $n$?

Write $x^n$ as $n$ copies of $(x+dx)$ multiplied together:

$$
(x+dx)^n = \underbrace{(x+dx)(x+dx)\cdots(x+dx)}_{n\ \text{copies}} .
$$

Expanding means picking one factor from each bracket. Group the resulting terms by how many $dx$'s they contain:

- Zero $dx$'s: you get $x^n$ — the original area or volume;
- Exactly one $dx$: since the $dx$ can come from any of the $n$ brackets, there are $n$ such terms, each equal to $x^{n-1} \cdot dx$;
- Two or more $dx$'s: every such term carries $dx^2$ or higher, and is discarded by the rule above.

So the increase is $n x^{n-1} dx$, and dividing by $dx$ gives $n x^{n-1}$.

This explains why the pictures look the way they do: a square has 2 sides to pick from, a cube has 3 faces, an $n$-dimensional cube has $n$ faces. **The $n$ in the power rule is the number of places a $dx$ can come from.**

## $1/x$: a puddle of fixed area

Next, $f(x) = 1/x$.

Symbolically it is easy: $1/x = x^{-1}$, apply the power rule, the $-1$ hops down and the exponent becomes $-2$, so the derivative is $-x^{-2} = -1/x^2$.

But something more interesting is available: derive it geometrically, with no formula.

$1/x$ answers "what number times $x$ equals 1?" Picture a rectangular puddle of water with area 1: width $x$, so the height must be $1/x$. Stretch the width to 2 and the height is forced down to $1/2$; stretch to 3 and it drops to $1/3$. The area stays 1.

That image also gives the right way to read the graph of $1/x$: the height above $x$ is whatever height is needed to keep the area at 1.

Now widen from $x$ to $x + dx$. A strip of new area appears on the right:

$$
\text{gained} = \frac{1}{x} \cdot dx .
$$

But the total area must remain 1, so an equal amount must be shaved off the top. Let the height change be $d(1/x)$ — a negative number. The area lost is

$$
\text{lost} = x \cdot \left| d(1/x) \right| .
$$

Set them equal:

$$
x \cdot \left| d(1/x) \right| = \frac{1}{x}\,dx
\quad\Longrightarrow\quad
\frac{d(1/x)}{dx} = -\frac{1}{x^2} .
$$

The sign is negative because the height is shrinking.

The result agrees with a blind application of the power rule. **So the power rule survives negative exponents** — but here that is established by geometry, not guaranteed by the formula.

## $\sqrt{x}$: left as an exercise

Grant leaves one exercise: derive the derivative of $\sqrt{x}$ with similar geometric reasoning.

The route: let a square have side $s$ and area $s^2$. If $s = \sqrt{x}$, then that square's area is exactly $x$.

Now increase the side by a tiny $ds$. How much area appears? By the square argument, about the two strips:

$$
dx \approx 2s \cdot ds .
$$

Hence

$$
\frac{ds}{dx} \approx \frac{1}{2s} = \frac{1}{2\sqrt{x}} .
$$

Check against the power rule: $\sqrt{x} = x^{1/2}$, the exponent hops down to give $\tfrac12 x^{-1/2}$ — identical.

Note the trick: **the question "what is the derivative of $\sqrt{x}$" is converted into "how fast does the side grow when the area grows"**, which the square picture already answered. The same geometric object, read forwards for area and backwards for side length.

## $\sin\theta$: a small step around the unit circle

The last example is trigonometric, with $\sin$ as the protagonist.

The prerequisite is the unit circle: radius 1, centred at the origin. For a given angle $\theta$, walk counterclockwise from the rightmost point until you have covered arc length $\theta$ (radius 1, so arc length equals angle). Then $\sin\theta$ is the height of that point above the horizontal axis.

As $\theta$ grows, the point travels and its height bobs between $-1$ and $1$ — the sine wave.

### First, the shape

The graph suggests the outline of the derivative: at $\theta=0$ the sine is rising, so the slope is positive; approaching the peak the slope falls to 0; past the peak the sine falls, so the slope is negative; near the trough it returns to 0. That outline matches $\cos\theta$ — the peaks and valleys line up.

But "the shape matches" does not prove the derivative *is* $\cos\theta$. Some other function could share the shape and the peak positions. To be sure, return to what $\sin$ means.

### Then, the small step

Zoom in on that point of the circle and take a small step $d\theta$ along the circumference. How much does the height rise? Call it $d\sin\theta$.

Zoomed in enough, the arc looks like a straight line. So draw a small right triangle:

- Hypotenuse: the step along the circumference, length $d\theta$;
- Vertical leg: the change in height, $d\sin\theta$;
- The triangle is similar to the big one at the centre — hypotenuse the radius 1, making angle $\theta$ with the horizontal.

Similarity means the little triangle's corresponding angle also equals $\theta$. And in that little triangle, **the leg adjacent to the angle $\theta$ is exactly $d\sin\theta$**, with hypotenuse $d\theta$.

Therefore

$$
\frac{d\sin\theta}{d\theta}
= \frac{\text{adjacent}}{\text{hypotenuse}}
= \cos\theta .
$$

The last step is the definition of cosine: on the unit circle, $\cos\theta$ is the adjacent side of that angle, with the radius normalized to 1.

That is the whole reason $\sin$ differentiates to $\cos$. It relies on nothing but "a circle zoomed in looks straight" and "similar triangles" — both middle-school material.

One exercise is left open: differentiate $\cos\theta$ the same way. The answer carries a minus sign, and the sign comes from the geometric fact that the height is decreasing as you walk forward.

## What this lecture establishes

- Derivative rules are not a chant; each answers "how much does the output grow when the input grows a little?"
- $(x^2)' = 2x$: stretching a square adds two $x \cdot dx$ strips; the corner $dx^2$ is negligible.
- $(x^3)' = 3x^2$: stretching a cube adds three $x^2 \cdot dx$ faces.
- $(x^n)' = nx^{n-1}$: exactly one $dx$ chosen from $n$ brackets, with $n$ ways to choose it, each giving $x^{n-1}dx$.
- $(1/x)' = -1/x^2$: in a rectangle of fixed area, extra width must be paid for by lost height.
- $(\sqrt{x})' = 1/(2\sqrt{x})$: the area is $x$, so a side increase $ds$ adds $2s\,ds$.
- $(\sin\theta)' = \cos\theta$: the small step around the unit circle forms a triangle similar to the central one, and height change over step length is $\cos\theta$.
- General technique: drop any term with a higher power of $dx$, since one $dx$ gets divided out.

## Check your understanding

**1. In deriving $(x^2)'=2x$, why may $dx^2$ be dropped while $2x\,dx$ may not?**

Answer: because the final step divides by $dx$. Dividing $2x\,dx$ by $dx$ leaves $2x$, independent of $dx$ — that is the surviving main term. Dividing $dx^2$ by $dx$ leaves $dx$, which still contains $dx$ and goes to zero in the limit. The test is not "this term is numerically small" but "does this term still contain $dx$ after dividing by $dx$." If yes, drop it.

**2. What does the coefficient $n$ in the power rule represent geometrically?**

Answer: the number of places a single $dx$ can be chosen from. Expanding $(x+dx)^n$, the terms containing exactly one $dx$ number $n$ (the $dx$ may come from any of the $n$ brackets), each contributing $x^{n-1}dx$. Geometrically: a square has 2 sides, a cube has 3 faces, an $n$-cube has $n$ faces, and each face pushed outward contributes $x^{n-1}dx$.

**3. In the geometric derivation of $(1/x)'$, what role does "the area stays constant" play?**

Answer: it ties the two changes together. Widening by $dx$ adds $\frac{1}{x}dx$ of area; lowering the height by $|d(1/x)|$ removes $x|d(1/x)|$ of area. A constant area forces the two to be equal, giving $x|d(1/x)| = \frac{1}{x}dx$ and hence the derivative. Without that constraint the width and height could vary independently, and no relation between them could be established.

**4. Why is it legitimate to treat the arc as a straight line when deriving the derivative of $\sin$?**

Answer: that is differentiability showing its geometric face — any smooth curve, in a small enough neighbourhood, differs from its tangent by a higher-order quantity. Keeping only first-order terms in $d\theta$, the gap between arc and tangent segment is of order $d\theta^2$, which disappears after dividing by $d\theta$. So replacing the arc with a straight segment leaves the first-order ratio unchanged, and therefore leaves the derivative unchanged.

**5. Why does the derivative of $\cos\theta$ carry a minus sign?**

Answer: because walking a small step counterclockwise in the first quadrant lowers the height, so $d\cos\theta$ and $d\theta$ have opposite signs. Geometrically, the leg of the small triangle adjacent to $\theta$ points downward, so its vertical projection carries a minus sign, and the ratio is $-\sin\theta$. The minus is not decoration; it records the fact that the height is decreasing.
