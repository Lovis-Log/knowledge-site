---
slug: "08-integration-and-ftc"
title: "Integration and the Fundamental Theorem: Distance From a Speedometer Alone"
summary: "Approximate changing speed as piecewise constant and each interval's distance becomes a thin rectangle; in the limit the sum becomes the area under the curve. Then let the right endpoint vary, and the area function's derivative is the curve's height — the fundamental theorem."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [integral, fundamental-theorem, antiderivative, signed-area]
sources:
  - kind: "video"
    title: "Integration and the fundamental theorem of calculus | Chapter 8, Essence of calculus"
    url: "https://www.youtube.com/watch?v=rfG8ce4nNh0"
    author: "3Blue1Brown"
    publishedAt: "2017-05-05"
---

## The thread of the lecture

This lecture is the dual of lecture 2: that one knew the distance and asked for the speed, this one knows only the speed and asks for the distance.

The setting is concrete. You sit in a car, cannot see out, and have only the speedometer. The car starts, speeds up, and slows to a stop over 8 seconds. **From the speedometer readings alone, can you tell how far you went?**

The difficulty is that speed keeps changing. If it were constant, one multiplication would do. But it changes at every instant; no stretch is constant.

The way through is to turn it back into a constant-speed problem: chop time into small intervals and pretend the speed is constant on each. Each interval's distance is a thin rectangle's area. Finer chopping means better approximation, and in the limit the sum becomes the area under the curve.

Then the decisive step: treat that area as a function of the right endpoint and ask for its derivative. The answer is the height of the curve. That is the **fundamental theorem of calculus**, and it turns "find an area" into "find a function with a known derivative."

## Timeline

| Time | Topic |
| --- | --- |
| 0:55 | A car with only a speedometer, an 8-second trip |
| 1:38 | Modelling the speed as $v(t) = t(8-t)$ |
| 3:00 | At constant speed, distance is a rectangle's area |
| 4:28 | Chopping the time axis into intervals of width $dt$ |
| 6:58 | The double role of $dt$: a factor and a spacing |
| 9:34 | Letting the right endpoint be a variable $T$ |
| 10:23 | Adding a sliver: $ds \approx v(t)\,dt$ |
| 12:22 | The antiderivative: $4t^2 - \tfrac13 t^3$ |
| 15:32 | The theorem: $\int_a^b f = F(b) - F(a)$ |
| 17:46 | Negative area and signed area |

## Only a speedometer: the inverse problem

Lecture 2 asked: given the distance function $s(t)$, find the speed $v(t)$. The answer was differentiation.

Now invert it: given $v(t)$, find $s(t)$. By lecture 2, that is the question **which function has $v(t)$ as its derivative?**

The operation is called **finding an antiderivative**. By that route the problem ends here: guess a function, check its derivative.

But the lecture spends most of its time on another route — translating the problem into "find the area under the curve." It looks like a detour, and it opens onto a whole class of tools.

## Why constant speed is easy: area is distance

At constant speed, distance is speed times time.

On the graph, that product is a rectangle's area: width the time, height the speed.

Describing distance as an area feels odd at first. The units settle it: the horizontal axis is in seconds, the vertical in metres per second, and their product is metres — **the area's units are exactly a length.** That is no coincidence; it is forced by the choice of axes.

## Approximating changing speed by piecewise constants

Speed changing continuously is the whole difficulty. So retreat: pretend speed changes only at a handful of instants and is constant in between.

Say the car is still for one second, then instantly jumps to $7\ \mathrm{m/s}$ for a second, then jumps again, and so on. Physically impossible (the passenger would be thrown about), but arithmetically trivial: for each stretch, constant speed times elapsed time, then add them up.

The strategy is fixed: **approximate the real motion by piecewise constant speed, then watch what refining the approximation does.**

Concretely: chop the 0-to-8-second axis into intervals of width $dt$, say $dt = 0.25$ s.

Look at $t=1$ to $1.25$. The true speed rises from $v(1)=7$ to about $v(1.25)=8.4$. On that interval, any constant between 7 and 8.4 would do — 7, 8.4, or anything in between.

**Which value you pick does not really matter.** What matters is that the whole family of approximations improves as $dt$ shrinks.

For convenience, use the height at the left endpoint, $v(1)=7$. Then this interval's distance is approximately

$$
7 \times 0.25 = 1.75\ \text{metres},
$$

exactly the area of that thin rectangle. The true value is slightly larger, since the speed is rising across the interval, but not by much.

Do the same everywhere: height from the left endpoint, width $dt$. Adding all the rectangle areas approximates the total distance.

## The integral notation

Write the sum of all those rectangle areas as

$$
\int_0^8 v(t)\,dt .
$$

The stretched S comes from "sum"; the 0 and 8 mark the time range.

Two things hide in this notation.

### The double role of $dt$

First, $dt$ plays two parts at once: it is the factor in each term (the rectangle's width) and the spacing between consecutive sample points.

So shrinking $dt$ makes each rectangle narrower but makes the **number** of rectangles larger — filling the same interval takes more, thinner rectangles. The two effects pull in opposite directions, and the sum settles on a definite value.

### Why not $\Sigma$

Second, the summation sign is not used, because $\int_0^8 v(t)\,dt$ is not any particular sum.

It is a **limit**: the value that all the concrete sums (one per choice of $dt$) approach as $dt \to 0$. Writing $\Sigma$ would suggest "this is a sum," when in fact it is "the limit of a family of sums."

And that limit is, geometrically, the area between the curve and the horizontal axis.

**Worth pausing on**: an idea as complicated as adding up a huge number of tiny quantities ends with an answer that can be described this simply — the area under the curve.

## The area function and its sliver

![The region under v(t)=t(8−t) from 0 to T=5.5 filled by eleven thin rectangles, with one heavier sliver at the right of width dt and height v(T), its area about v(T)·dt](/images/08-integration-area-en.svg)

*Figure: the sum of thin rectangles approaches the area under the curve; treat the right endpoint as a variable and the extra sliver is $dA$.*

Someone will object: what does this help? You have traded one hard problem (find the distance) for another equally hard one (find the area).

Fair. If velocity and distance were the only pair of concepts that mattered, all this area business would be a detour and you could go straight to antiderivatives.

But "area under a curve" is a **shared language** for many different problems. Anything that can be broken into a sum of many small pieces ends at the same geometric object, so learning the language pays off generally.

### Let the right endpoint vary

Now the key move: replace the fixed 8 with a variable $T$.

Then

$$
A(T) = \int_0^T v(t)\,dt
$$

is a function: input a time $T$, output the area under the curve from 0 to $T$.

By definition that area is the distance travelled in $T$ seconds, so $A(T)$ is just the distance function $s(T)$.

Now ask: what is the derivative of $A$?

### Two readings

The first comes from physics: a tiny change in distance divided by a tiny change in time is speed — that is what speed means. Hence $A'(T) = v(T)$.

The second uses only the picture, and generalises far better. Nudge the right endpoint by $dt$; the area grows by a sliver, call it $ds$.

The sliver's height is the curve's height there, $v(t)$, and its width is $dt$. For small $dt$ it is essentially a rectangle, so

$$
ds \approx v(t)\,dt
\quad\Longrightarrow\quad
\frac{ds}{dt} = v(t) .
$$

The second reading matters because it never uses the fact that this is distance and speed. **Any** function defined as the area under a curve has a derivative equal to the curve's height. That statement carries over to other settings untouched.

## The antiderivative: guessing $s(t)$

With that, the question becomes: which function has derivative $v(t) = t(8-t)$?

Expand first: $v(t) = 8t - t^2$. Then guess term by term.

- Which function has derivative $8t$? The derivative of $t^2$ is $2t$; scale by 4 and you get $4t^2$.
- Which function has derivative $-t^2$? The derivative of $t^3$ is $3t^2$; shrink by a third to get $t^2$, then negate: $-\tfrac13 t^3$.

Hence

$$
s(t) = 4t^2 - \tfrac13 t^3 + C .
$$

### That constant

$C$ cannot be dropped. Adding any constant leaves the derivative unchanged, because a constant's derivative is zero.

Geometrically: sliding the distance curve up or down leaves every slope untouched. Derivative information fixes the shape of the curve but not its height.

So **there are infinitely many antiderivatives**.

## The lower bound fixes the constant

One piece of information remains unused: the lower limit of the integral.

Drag the right endpoint all the way back to the left endpoint and the area must vanish. How far does the car travel between 0 seconds and 0 seconds? Zero.

So the area function must satisfy $A(0) = 0$. Substituting:

$$
4 \cdot 0^2 - \tfrac13 \cdot 0^3 + C = 0
\quad\Longrightarrow\quad
C = 0 .
$$

In this example the constant happens to be 0, because the lower limit sits at 0 and the expression already vanishes there.

The total distance over 8 seconds is therefore

$$
s(8) = 4 \cdot 64 - \tfrac13 \cdot 512 = 256 - 170.67 = 85.33\ \text{metres}.
$$

### The general case

What if the distance between 1 second and 7 seconds is wanted?

Evaluate the antiderivative at the upper limit and subtract its value at the lower limit:

$$
\int_1^7 v(t)\,dt = F(7) - F(1).
$$

Note that the choice of antiderivative does not matter. If $F$ carried an extra constant 5, that 5 would be subtracted away in $F(7)-F(1)$. **The constant cancels in the subtraction** — which is precisely what subtracting the lower-limit value accomplishes.

## The fundamental theorem

Write the conclusion in general form. If $F$ is any antiderivative of $f$, meaning $F' = f$, then

$$
\int_a^b f(x)\,dx = F(b) - F(a) .
$$

This is the **fundamental theorem of calculus**.

It carries something hard to believe: the integral, by definition, accounts for **every** input between the limits — uncountably many points on the continuum, which is why it is called integration, a bringing-together. Yet computing it only looks at two inputs, the two endpoints.

It almost feels like cheating. The antiderivative implicitly carries all the information needed to add up the values across the whole interval.

## Negative area

One last point: what if the speed is negative on some stretch? The car is reversing.

Then $ds \approx v(t)\,dt$ still holds; the $v$ you substitute is negative, so $ds$ is negative.

On the graph, a rectangle below the horizontal axis stands for distance travelled backwards. If what you finally want is displacement from start to end, that piece must be subtracted.

This is **signed area**: an integral does not measure area as such, it measures the signed area between the graph and the horizontal axis, with the part below the axis counted as negative.

## What this lecture establishes

- Finding distance from speed amounts to finding an antiderivative: a function whose derivative is $v(t)$.
- At constant speed, distance equals speed times time, which is a rectangle's area; the horizontal axis in seconds times the vertical in metres per second gives metres.
- For changing speed, chop time into intervals, treat speed as constant on each, and the distances are thin rectangles whose sum approximates the area under the curve.
- The notation $\int_a^b v(t)\,dt$ denotes not a particular sum but the limit of all sums as $dt \to 0$.
- $dt$ is both the factor in each term and the sampling spacing; shrinking it narrows the rectangles but multiplies their number.
- Letting the right endpoint vary makes the area a function $A(T)$ whose derivative is the curve's height $v(T)$.
- Antiderivatives come in infinitely many, differing by a constant; the lower limit fixes it by requiring zero area at zero width.
- The fundamental theorem: $\int_a^b f = F(b) - F(a)$, using only the two endpoints.
- Area below the axis counts as negative; an integral returns signed area.

## Check your understanding

**1. Why may "speed times time" be read as an area, and where does that reading break down?**

Answer: on a speed–time graph the rectangle's height is speed (m/s) and its width is time (s), so the product has units of metres — a length — and the geometric area matches the physical distance in both value and units. The reading breaks down whenever the vertical quantity times the horizontal quantity is not the thing you want: on a mass–volume graph the area has no physical meaning at all.

**2. Why does the integral use $\int$ rather than $\Sigma$?**

Answer: because $\Sigma$ denotes a definite sum, tied to a specific $dt$ and specific sample points. $\int_a^b v(t)\,dt$ is not any such sum but the limit that all of them approach as $dt \to 0$. Using $\Sigma$ would suggest a single concrete sum and lose the limiting step — and with it the reason the result is exact rather than approximate.

**3. Why are there infinitely many antiderivatives, and what removes the ambiguity?**

Answer: because the derivative of a constant is zero, so adding a constant to any antiderivative leaves the derivative unchanged. Geometrically, the curve slides up or down with every slope intact, so derivative information cannot fix its absolute height. The lower limit of the integral removes the ambiguity: requiring that the integral from the lower limit to itself be zero pins down the constant (equivalently, that the area function vanishes at the lower limit).

**4. Why does the fundamental theorem feel like cheating?**

Answer: because the integral is defined by accounting for every input in the interval — uncountably many points — yet computing it requires only the antiderivative's values at two endpoints. Compressing infinitely many contributions into two numbers defies intuition. Its legitimacy comes from the fact that the area function's derivative is the curve's height: the antiderivative has already absorbed the entire accumulation, and the endpoint values merely read it off at two places.

**5. If the speed is negative for part of the trip, what does the fundamental theorem return?**

Answer: the **displacement** over that interval, with sign, not the total distance travelled. Each small piece contributes $v(t)\,dt$, and where $v$ is negative the contribution is negative, so reversing is subtracted in the accumulation. To obtain total distance one integrates the absolute value of the speed, counting the area below the axis as positive.
