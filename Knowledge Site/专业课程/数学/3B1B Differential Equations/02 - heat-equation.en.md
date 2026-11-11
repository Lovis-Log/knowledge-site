---
slug: "02-heat-equation"
title: "The Heat Equation: How a PDE Is Built"
summary: "Temperature is a function of both space and time, so there are two kinds of rate of change. Write the rule that each point drifts toward its neighbours' average, take the continuum limit, and the heat equation appears: ∂T/∂t = α∂²T/∂x²."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [heat-equation, partial-derivative, laplacian, fourier-series]
sources:
  - kind: "video"
    title: "But what is a partial differential equation? | DE2"
    url: "https://www.youtube.com/watch?v=ly4S0oi3Yz8"
    author: "3Blue1Brown"
    publishedAt: "2019-04-22"
---

## The thread of the lecture

The previous lecture dealt with a handful of numbers: an angle and an angular velocity. This one replaces them with an entire function — the temperature at every point of a rod. With two inputs (position and time) instead of one, the language of change has to level up, and that is where partial derivatives enter.

The lecture proceeds like reverse engineering:

1. Admit that we do not know how the temperature distribution evolves;
2. Notice that describing how it changes *this instant* is far easier than describing the whole future;
3. Write that instantaneous rule in partial derivatives — the heat equation;
4. Then explain why the equation looks that way: chop the rod into finitely many points, let each drift toward its neighbours' average, write the difference rule, and take the limit.

Step four is the heart of it. The equation is not handed down; it is the continuum version of a homely intuition about local averaging.

## Timeline

| Time | Topic |
| --- | --- |
| 0:03 | From ODEs to PDEs, with the heat equation as the example |
| 0:39 | Two rods at different temperatures brought into contact |
| 3:32 | Temperature is a function of position and time |
| 5:14 | The partial in $x$: how fast temperature changes along the rod |
| 5:34 | The partial in $t$: how fast one point changes with time |
| 6:52 | The heat equation: $\partial_t T$ proportional to $\partial_x^2 T$ |
| 8:18 | The core intuition: hotter than the neighbours' average means warming |
| 10:54 | The second difference measures departure from the neighbours' average |
| 11:29 | Continuum limit: second difference becomes second derivative |
| 14:31 | Higher dimensions and the Laplacian |

## Starting from two rods

Picture a metal rod whose temperature you know at every point right now. How does that distribution change as heat flows from hot spots to cool ones?

The most concrete one-dimensional version is two rods, each uniform inside but at different temperatures, brought into contact. You know heat flows from the hot one to the cold one until everything evens out — but **how exactly**? What is the distribution at each moment?

This is the situation differential equations are built for: describing the whole evolution is hard, describing the rate of change right now is easy. So the rule is written in derivatives — except that this time there is more than one kind.

Worth noting: variants of the heat equation turn up in Brownian motion, the Black–Scholes equation in finance, and every kind of diffusion. Understanding this one model pays dividends well beyond rods.

## One more input: partial derivatives

### The input space is two-dimensional

Label each point of the rod by a coordinate $x$, so temperature is a function $T(x)$. But temperature also changes with time, so the honest notation is $T(x,t)$ — two inputs.

Think of the input space as a plane: position across, time up, with temperature as a surface above it. Slice along time and you get the distribution at one instant; slice along position and you get one point's temperature history.

One confusion is worth heading off: **this surface is not the temperature map of a two-dimensional plate.** A plate needs two spatial coordinates plus a temperature axis, which is also a three-dimensional picture; here the two inputs are space and time. When reading such figures, always check whether time is drawn as its own axis or shown as literal change in an animation.

### Two rates of change

With two inputs come two rates:

- **The partial in $x$**, $\partial T/\partial x$: how fast temperature changes as you move along the rod. Geometrically, the slope of the surface sliced parallel to the $x$-axis.
- **The partial in $t$**, $\partial T/\partial t$: how fast one fixed point changes with time. The slope of the surface sliced parallel to the time axis.

Each tells only part of the story, hence **partial** derivatives. The notation swaps $\mathrm{d}$ for a curly $\partial$.

3B1B confesses to finding the notation change a little silly — it is essentially the same operation. He would prefer notation that emphasizes that the two $\partial T$'s in the numerator refer to different changes: one caused by a small step in time, the other by a small step in space.

The advice from the calculus series bears repeating: early on, read a derivative as a literal ratio between a small change in the output and the small change in the input that caused it — while remembering that what the symbol really encodes is the limit of that ratio as the nudge shrinks, not the ratio at some finite step. Partial derivatives are no different.

## The heat equation

The heat equation ties the two rates together:

$$
\frac{\partial T}{\partial t}
= \alpha\,\frac{\partial^2 T}{\partial x^2}.
$$

In words: **the rate at which temperature changes in time is proportional to its second partial derivative in space.**

The high-level intuition is that where the temperature profile curves, it tends to change faster in the direction of that curvature. Because the rule is written with partial derivatives, it is called a partial differential equation.

![Heat equation intuition: a point on a bump sits above its neighbours' average and cools, shown by a downward arrow; a point in a dip sits below the average and warms, shown by an upward arrow](/images/02-heat-curvature-en.svg)

*Figure: the sign of the second derivative sets the direction — bumps are flattened, dips are filled.*

The naming has an unfortunate side effect: to an outsider, "partial" sounds like a tamer version of "ordinary". The truth is the opposite — PDEs tell a far richer story and are much harder to solve, largely because they model infinitely many values changing in concert.

The general heat equation covers bodies of any dimension, which means more inputs. This lecture stays with the one-dimensional rod, because giving time its own axis already pushes the picture into three dimensions.

## The discrete version: every point drifts toward its neighbours' average

Where does the equation come from? How would you invent it?

Simplify first: replace the continuous rod with a finite row of points — a pixelated universe with finitely many separate temperatures.

The intuition is a single sentence: **if the two neighbours average hotter than the point itself, it warms up; if they average cooler, it cools down.**

Take three neighbouring points $x_1,x_2,x_3$ with temperatures $T_1,T_2,T_3$. Compare the neighbours' average with $T_2$:

$$
\frac{dT_2}{dt} \;\propto\; \frac{T_1+T_3}{2} - T_2 .
$$

Positive means warming, negative means cooling, and the larger the difference the faster it happens. The constant of proportionality is $\alpha$.

### The second difference

To move toward derivatives, rewrite the right-hand side, factoring out $\frac12$:

$$
\frac{T_1+T_3}{2}-T_2
=\frac{1}{2}\Big[(T_1-T_2)+(T_3-T_2)\Big].
$$

The two forms agree: the top has half of $T_1$, and the bottom's two minus signs make the $T_1$ coefficient $+\frac12$; likewise for $T_3$; and the bottom's $-T_2$ appears twice, so half of it is the single $-T_2$ on top.

The point of rewriting is that it edges closer to the language of derivatives. Name the two gaps

$$
\Delta_1 = T_1-T_2,\qquad \Delta_2 = T_3-T_2 ,
$$

so that

$$
\frac{dT_2}{dt}\propto \frac{1}{2}\left(\Delta_1+\Delta_2\right).
$$

The perspective has shifted: instead of "neighbours' average versus itself", it is now a combination of two first differences. Add them:

$$
\Delta_1+\Delta_2 = (T_1-T_2)+(T_3-T_2) = T_1-2T_2+T_3,
$$

which is exactly twice "neighbours' average minus itself". This quantity is the **second difference**, written $\Delta\Delta T$.

Sanity checks:

- When the second difference is zero, $T_1+T_3=2T_2$: $T_2$ equals the neighbours' average and does not tend to change;
- If the second difference is positive, the neighbours average hotter and $T_2$ rises;
- If it is negative, they average cooler and $T_2$ falls.

In other words, the second difference is a compact way of saying "how far this point sits from its neighbours' average", differing only by a constant factor of 2 — which does not matter, since the equation is written with an unspecified proportionality constant anyway.

### From second difference to second derivative

Push the discrete picture to the continuum: the analogue of the second difference is the second derivative.

Shrink the step to zero. Absolute differences also go to zero, so calculus stops talking about absolute differences and talks about **rates**: how much temperature changes per unit distance. And remember there are two rates at play — change in time and change along the rod.

The core intuition is unchanged from the discrete case: to know how a point differs from its neighbours, look not just at how the function changes from point to point, but at how that rate of change itself changes.

That is written

$$
\frac{\partial^2 T}{\partial x^2}.
$$

Where the graph curves upward the slope increases, so the rate of change of the rate of change is positive; where it curves downward the slope decreases, and that quantity is negative.

This intuition deserves to be stored away for problems far beyond heat flow: **a second derivative measures how a value compares with the average of its neighbours.**

Now the heat equation reads naturally: curved regions move in the direction of their curvature, so **bumps get flattened and dips get filled**. But there is something more satisfying than that slogan — the PDE falls out almost mechanically from the rule that every point drifts toward its neighbours' average.

## Contrast with ODEs

Compare with several bodies tugging at each other gravitationally. What is analysed there is a handful of changing numbers — the coordinates of each body. The rate of change of any one depends on the values of the others, usually written as a system: derivatives on the left, some combination of the other values on the right.

A PDE differs in the number of values: from finitely many to a continuum. Each value's rate of change still depends on other values, but **only on its immediate neighbours**, in the limiting sense of "neighbour". So the right-hand side is not a sum or product of other numbers but a derivative — a derivative with respect to space rather than time.

Seen from another angle, one PDE is really **infinitely many equations**, one for each point of the rod.

## The Laplacian

For a plate or a solid, the equation looks nearly the same, with second partials in the other spatial directions added in:

$$
\frac{\partial T}{\partial t}
=\alpha\left(\frac{\partial^2 T}{\partial x^2}
+\frac{\partial^2 T}{\partial y^2}
+\frac{\partial^2 T}{\partial z^2}\right).
$$

Summing the second spatial derivatives is common enough to earn its own name: the **Laplacian**, written $\nabla^2$ (or $\Delta$).

It is the multivariable version of the second derivative, and the intuition carries over unchanged: it still measures how far a point sits from its neighbours' average, except that the neighbours now surround it rather than sitting to the left and right. With multivariable calculus in hand, it is pleasant to read it as the divergence of the gradient — but this series does not need that.

## Takeaways

- When the object of study is a whole function rather than a few numbers, partial differential equations take over.
- Temperature is $T(x,t)$; the input space is space × time. Do not confuse it with a temperature map of a two-dimensional body.
- $\partial T/\partial x$ and $\partial T/\partial t$ each describe part of the change, hence "partial".
- The heat equation $\partial_t T=\alpha\,\partial_x^2 T$ says the time rate of change is proportional to the second spatial derivative.
- The discrete intuition: every point drifts toward the average of its two neighbours.
- The second difference $T_1-2T_2+T_3$ is twice "neighbours' average minus itself", and becomes the second derivative in the continuum limit.
- A second derivative measures a value against its neighbours' average: bumps flatten, dips fill.
- A PDE is like infinitely many equations, one per point, coupled only to near neighbours.
- In higher dimensions the second spatial derivatives add up into the Laplacian.
- Fourier series is exactly the tool Fourier invented to solve this equation.

## Check your understanding

**1. Why does temperature need two inputs, and what is lost by writing only $T(x)$?**

Reference answer: temperature varies both with position and with time. Writing $T(x)$ describes the distribution at one frozen instant — a snapshot with no way to express how it evolves. Only $T(x,t)$ captures both "different points differ right now" and "one point differs across time", and the heat equation is a statement about $\partial T/\partial t$, which is meaningless without a time variable.

**2. Explain the difference between $\partial T/\partial x$ and $\partial T/\partial t$, and why each is only partial information.**

Reference answer: $\partial T/\partial x$ holds time fixed and looks along the rod, measuring how much temperature changes over a small step in space. $\partial T/\partial t$ holds position fixed and looks along time, measuring how fast one point changes. Both are slopes of the same surface sliced in one direction; neither determines the surface by itself, which is why they are called partial derivatives.

**3. Three neighbouring points have temperatures $T_1=10$, $T_2=6$, $T_3=10$. Does the middle point warm or cool? What if $T_1=2$, $T_2=6$, $T_3=10$?**

Reference answer: in the first case the neighbours average $10$, above $T_2=6$, so the middle point warms; the second difference is $10-12+10=8>0$, consistent. In the second case the neighbours average $6$, exactly $T_2$, so the instantaneous rate is zero; the second difference is $2-12+10=0$, also consistent. Note that the second case has very different neighbours yet no tendency to change — the equation cares about the average, not about symmetry.

**4. Why is the heat equation like infinitely many equations, and how are they coupled?**

Reference answer: every point on the rod contributes an equation of the form $\partial_t T(x,t)=\alpha\,\partial_x^2 T(x,t)$, and a continuum has infinitely many points. The right-hand side depends only on temperatures in an arbitrarily small neighbourhood of that point, so each equation couples only to near neighbours rather than to every other point — in contrast with the many-body problem, where each coordinate interacts with all the others.

**5. "A second derivative compares a value with its neighbours' average." Where else does this idea pay off?**

Reference answer: it underlies average and extremum arguments. In one dimension, a positive second derivative means the value sits below the neighbours' average (a local dip) and a negative one means above it (a local bump), so an interior maximum has non-positive second derivative and an interior minimum non-negative. Numerically, second differences approximate second derivatives; in image processing the Laplacian detects local brightness variation. The comparison is always the same: is this point brighter or darker than its surroundings?

## How it connects

This lecture builds the equation but does not solve it. The next one does, and the strategy is to decompose the initial temperature profile into a family of simple modes, each of which evolves in a trivially simple way; adding them back gives the full solution. That decomposition is the Fourier series, and Fourier was led to it precisely by trying to solve the heat equation. The phase-space tools of the previous lecture step aside for now, but the slogan "second derivative = departure from the neighbours' average" keeps paying off in diffusion, random walks, and image processing.
