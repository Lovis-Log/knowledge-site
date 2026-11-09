---
slug: "01-essence-of-calculus"
title: "The Essence of Calculus: Starting From a Circle"
summary: "Slice a circle into rings, unwrap each ring into a rectangle, and a sum quietly becomes the area under a graph. Integrals, derivatives, and the fundamental theorem all surface inside one middle-school geometry problem."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [calculus, integral, derivative, fundamental-theorem, geometric-intuition]
sources:
  - kind: "video"
    title: "The essence of calculus"
    url: "https://www.youtube.com/watch?v=WUvTyaaNkzM"
    author: "3Blue1Brown"
    publishedAt: "2017-04-28"
---

## The thread of the lecture

The series states its ambition up front: by the end, you should feel that you could have invented calculus yourself. The first lecture chases that ambition through a single question — **why is the area of a circle $\pi r^2$?**

That sounds too elementary to matter. But the question is treated as an open problem with no formula available: you have a circle, some paper, and an urge to chop it up and rearrange the pieces. Following that urge leads, in order, to three things:

1. Breaking an area into infinitely many small pieces and adding them — an **integral**;
2. Asking how much the output moves when the input is nudged — a **derivative**;
3. Noticing that these two operations undo each other — the **fundamental theorem of calculus**.

So this is not a warm-up. It is the whole route in miniature, and the remaining eleven lectures zoom in on each part of it.

## Timeline

| Time | Topic |
| --- | --- |
| 1:26 | A geometry question to start: the area of a circle |
| 2:05 | Slicing the circle into concentric rings |
| 2:46 | Unwrapping a ring into a rectangle: width $2\pi r$, thickness $dr$ |
| 5:23 | Standing the rectangles side by side along the line $2\pi r$ |
| 6:10 | The sum becomes the area under a graph — a triangle |
| 6:50 | From approximate to exact: why this is not hand-waving |
| 8:30 | The same move elsewhere: velocity times $dt$ gives distance |
| 9:55 | A harder question: the area under $x^2$ |
| 11:48 | Nudging $x$ by $dx$ produces a sliver $dA$ |
| 15:20 | The fundamental theorem: derivatives and integrals are inverses |

## Slicing the circle into rings

Take a circle of radius 3. To find its area, the natural instinct is to cut it up and rearrange the pieces. There are many ways to cut; one deserves special attention: **concentric rings**.

This choice is promising because it respects the circle's symmetry, and mathematics tends to reward you for respecting its symmetries. That is not just a slogan here — every later step stays clean because of it. Every point on a given ring sits at the same distance from the center, so the area of a ring depends on exactly one number, its inner radius $r$.

Pick one ring with inner radius $r$, somewhere between 0 and 3. What is its area?

Cut it along a radius and flatten it out. The result is not quite a rectangle — it is a slightly tapered strip, because the inner circumference $2\pi r$ is a little shorter than the outer circumference $2\pi(r+dr)$. But **approximate it as a rectangle**:

- Width: the circumference of the ring, $2\pi r$. That is essentially the definition of $\pi$;
- Thickness: the gap between one ring and the next, written $dr$.

So the ring's area is approximately

$$
2\pi r \cdot dr .
$$

The thickness $dr$ has no fixed value; it is whatever fineness you chose for the slicing. $0.1$ is fine, $0.01$ is fine. Keep that freedom in mind — it becomes the crux later.

### How wrong is the approximation?

As a supplement, write down the true area of the ring. It is the difference of two disk areas:

$$
\pi(r+dr)^2 - \pi r^2 = 2\pi r\,dr + \pi (dr)^2 .
$$

The approximation drops $\pi (dr)^2$. At $dr = 0.1$ that term is $0.0314$, about half a percent of $2\pi r\,dr$; at $dr = 0.01$ it falls to about five hundredths of a percent. The error is not merely small — **it shrinks faster than $dr$ itself**, since it is second order in $dr$. That is the technical reason the whole scheme works.

## Standing the rings upright

![A radius-3 circle cut into concentric rings, one ring marked with inner radius r and thickness dr; on the right the same rings are unwrapped into rectangles whose tops land on the line 2πr, summing to the area 9π of a triangle with base 3 and height 6π](/images/01-essence-of-calculus-rings-en.svg)

*Figure: each ring's area is about $2\pi r \cdot dr$; stood upright and summed, the rectangles give the triangle's area — which is where $\pi r^2$ comes from.*

You now have a pile of areas: for every inner radius from $0$ up to just under $3$, spaced $dr$ apart, the area is roughly $2\pi r \cdot dr$. Adding them all up should approximate the area of the whole circle.

Here comes a lovely translation. **Stand those rectangles side by side**: each is $dr$ wide and $2\pi r$ tall, starting at $r=0$ and marching right.

Because each rectangle's width equals the spacing between consecutive $r$ values, they tile the axis perfectly — no gaps, no overlaps. And each rectangle's height is precisely the circumference of the ring it stands for.

So "add up the areas of all the rings" becomes "add up the areas of a row of rectangles." The shortest rectangle is nearly zero (the innermost ring); the tallest is nearly $2\pi \cdot 3 \approx 18.85$ (the outermost). That is too tall for the screen, so the drawings squash the vertical axis — a change of scale, not of area.

### The tops land on a straight line

Every rectangle's top corner lands exactly on one line: the graph of $y = 2\pi r$, passing through the origin with slope $2\pi$.

Worth pausing on: it is a straight line **because circumference is proportional to radius**. Slice a sphere instead, or replace the function with $x^2$, and the tops land on a curve. Which curve the tops land on decides whether the final area is a triangle or something you have no formula for.

Now the total area of the rectangles is, geometrically, the area under that line from $0$ to $3$. And that region is a triangle with base $3$ and height $2\pi \cdot 3$. Hence

$$
\frac{1}{2} \cdot 3 \cdot (2\pi \cdot 3) = 9\pi = \pi \cdot 3^2 .
$$

Replace $3$ with a general $R$ and the same argument gives

$$
\frac{1}{2}\cdot R \cdot 2\pi R = \pi R^2 .
$$

The formula for the area of a circle drops out without appealing to any known result.

## Why this is not cheating

The jump from "approximate" to "exact" is the part that needs justification. A staircase of rectangles is obviously not a triangle, so why is the answer *exactly* the triangle's area?

Two facts hold at once:

1. $dr$ plays two roles in this setup: it is the factor inside each term, and it is the spacing between consecutive $r$ values. The first gives rectangles their width, the second lets them tile the axis. These being the same number is not a coincidence — it is the entire content of the construction.
2. Smaller $dr$ means a better approximation. As computed above, the error is second order in $dr$.

Now the argument runs like this. For each $dr$ there is a slightly wrong answer; as $dr$ shrinks, that answer creeps toward a definite value, the triangle's area. But **the true area of the circle is a fixed number that does not depend on $dr$ at all**. A fixed number, together with a family of approximations converging to the triangle's area, forces the two to be equal.

So the move is not "the error is small, ignore it." It is: the error vanishes as $dr \to 0$, and the true value cannot depend on $dr$, therefore the true value *is* the limit. That pattern of reasoning recurs in every later lecture; it is the intuition behind the formal definition of an integral.

## The same move, elsewhere

The value of this move is that it travels. Take a completely different question: a car drives at varying speed — how far did it go?

Cut time into small intervals of length $dt$. Within each interval, multiply the speed at that moment by $dt$ to get the little distance covered, then add them all up:

$$
\text{distance} \approx \sum v(t) \cdot dt .
$$

Structurally identical to the circle: $v(t)$ is the height, $dt$ is the width, and the sum is the area under the curve $v(t)$.

There is one test for whether a problem can be handled this way: **can the small quantities you are adding be viewed as a row of thin rectangles standing side by side?** If yes, the problem is equivalent to finding an area under a curve. Speed, density, work, probability — all pass the test.

## A harder question

The circle problem had a stroke of luck: the tops landed on a line, and the area under a line is a triangle. Change the curve and the luck runs out.

Take $y = x^2$ and ask for the area between $x = 0$ and $x = 3$.

Direct attack is hard. The suggestion is to reframe: **pin the left endpoint at 0 and let the right endpoint float.** Define a new function $A(x)$ giving the area under $x^2$ from $0$ to $x$.

This $A(x)$ is called an **integral** of $x^2$. Right now it is a mystery: you know what it means (an area) but not what it is (a formula).

### Don't attack — play

Faced with a genuinely hard problem in mathematics, a good policy is not to push directly at the answer; that usually ends with your head against a wall.

Instead, play with the idea without a goal. Build familiarity with the interplay between the two functions: the one defining the graph, $x^2$, and the one giving the area, $A(x)$.

Play long enough and something shows up. Push the right endpoint a tiny bit, by $dx$. The area grows by a thin sliver, call it $dA$.

That sliver is nearly a rectangle: its height is $x^2$ (the value at $x$ — the sliver is so thin that the height barely varies), and its width is $dx$. The smaller $dx$ is, the more rectangle-like it becomes. Therefore

$$
dA \approx x^2 \cdot dx ,
$$

and dividing both sides by $dx$,

$$
\frac{dA}{dx} \approx x^2 .
$$

In words: **the tiny change in the area function is proportional to the height of the graph at the input**, with the proportionality set by the tiny change in the input.

Concretely: compare $x = 3$ with $x = 3.001$. The difference in area divided by $0.001$ comes out near $3^2 = 9$. And this holds at every input, not just at 3.

### Half the answer

$A(x)$ is still unknown, but it must satisfy a property: its instantaneous rate of change equals $x^2$.

That is a lot of information. It converts a geometry problem (find an area) into an algebra problem (given the rate of change, recover the function) — precisely the inverse of differentiation.

As a supplement, the answer can be checked directly here. If $A(x) = \dfrac{x^3}{3}$, then

$$
\frac{dA}{dx} = \frac{3x^2}{3} = x^2 ,
$$

which matches. So the area under $x^2$ from $0$ to $x$ is $x^3/3$ — for instance, the area from $0$ to $3$ is exactly $9$. A curved region with an integer area, verified by taking one derivative.

## Enter the derivative

The ratio $\dfrac{dA}{dx}$ has a name: the **derivative** of $A$. Technically it is the limit of that ratio as $dx \to 0$; intuitively it measures how sensitive a function is to small changes in its input.

This lecture needs only one use of it. Notice that nothing above depended on $x^2$ specifically — **any** function defined as the area under a graph has a derivative equal to the height of that graph at the input. That is the first link between area and slope, and lecture 9 pulls it apart completely.

And once you are comfortable differentiating, you can run it backwards: see "the derivative should be $x^2$" and guess that the function is $x^3/3$. The hard area problem is simply sidestepped.

### The fundamental theorem

Trace the round trip:

- Starting from a graph, accumulate area to build $A$;
- Differentiate $A$, and you get the original graph's height back.

The two operations are inverses. This is the **fundamental theorem of calculus**: it binds together two techniques that look unrelated, and it explains why a single subject contains both "find areas" and "find tangent lines."

Lecture 8 gives the full version, including what that notation $\int_a^b f(x)\,dx$ — the one that makes people blink the first time — is actually saying.

## What this lecture establishes

- The area of a circle follows from slicing it into rings, approximating each ring as a rectangle of height $2\pi r$ and width $dr$, and summing.
- Standing those rectangles upright turns the sum into the area under the line $y = 2\pi r$, which is a triangle — giving $\pi R^2$.
- The step from approximate to exact is not "the error is negligible"; it is that the error vanishes as $dr \to 0$ while the true value cannot depend on $dr$.
- The move transfers: whenever the small quantities being added can be written as height times width, the problem becomes an area under a curve.
- For a curve like $x^2$, the area function $A(x)$ has no obvious formula, but its derivative must be $x^2$.
- The derivative measures sensitivity to input; the derivative of an area function equals the graph's height at that point.
- Differentiation and area-finding undo each other — the content of the fundamental theorem.

## Check your understanding

**1. Why is slicing into concentric rings more promising than slicing into squares or sectors?**

Answer: because rings respect the circle's symmetry, so a ring's area depends on a single parameter $r$ — every point on it is equidistant from the center. A square's shape varies with position, so you would need two coordinates to describe it. A sector's area varies with both angle and radius. Reducing to one parameter is what makes the clean expression $2\pi r \cdot dr$ possible, and what allows the pieces to be laid out along a one-dimensional sum.

**2. What does the approximation $2\pi r\,dr$ leave out, and why does leaving it out not spoil exactness?**

Answer: it leaves out $\pi (dr)^2$, the second-order term from expanding the difference of two disk areas. Its size relative to the leading term $2\pi r\,dr$ is $\frac{dr}{2r}$, which tends to zero as $dr \to 0$, so the error is second order in $dr$. Exactness comes not from the error being small but from the true value being independent of $dr$ while the approximations converge to it — the two must coincide.

**3. Why is it essential that $dr$ serves both as a factor and as the spacing?**

Answer: because the same number must do both jobs for the rectangles to represent ring areas (width $dr$) and simultaneously tile the interval (consecutive $r$ values spaced $dr$ apart). If the two differed, gaps or overlaps would appear, and "sum of rectangle areas" would no longer equal "area under the graph." This is also why, in the integral notation that comes later, $dx$ carries a double identity as both a width and the variable of integration.

**4. Why is the derivative of the area function exactly $x^2$, rather than some average of $x^2$?**

Answer: because the sliver added when $x$ moves by $dx$ sits right at $x$. It is so narrow that the height inside it is essentially constant at $x^2$, leaving no room to average over other values. The sliver's area is about $x^2\,dx$; divide by $dx$ and $x^2$ remains. This is also a reminder that the derivative is **local** information: it sees only the neighborhood of the current point.

**5. If the rectangle tops landed on a curve instead of a line, which step of the argument would break?**

Answer: the step "area equals the area of a triangle." The slicing, approximating, standing upright, and summing all still work — the sum still equals the area under the curve, but that area no longer has an elementary formula. That is exactly the situation lectures 8 and 9 address: convert "find the area" into "find a function whose derivative is known," using the fundamental theorem to bypass the geometry.
