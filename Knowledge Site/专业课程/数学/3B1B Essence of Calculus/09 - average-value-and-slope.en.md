---
slug: "09-average-value-and-slope"
title: "Average Value and Slope: Why Area Over Width"
summary: "The average of a continuous variable cannot be defined by adding everything and dividing by how many, but approximating with finite samples shows it equals an integral divided by the interval's length. Read another way, that quotient is the slope of the antiderivative between the endpoints — and area finally meets slope."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [average-value, integral, antiderivative, mean-value]
sources:
  - kind: "video"
    title: "What does area have to do with slope? | Chapter 9, Essence of calculus"
    url: "https://www.youtube.com/watch?v=FnJqaIESC2s"
    author: "3Blue1Brown"
    publishedAt: "2017-05-06"
---

## The thread of the lecture

The last lecture proved that the derivative of an area function is the curve's height. This one looks at the same fact from another direction — not "how do I compute an area," but a question that seems to have nothing to do with calculus:

**What is the average value of $\sin x$ on $0$ to $\pi$?**

It has a real motivation: daylight hours over a year follow something close to a sine wave, and estimating the average efficiency of a solar panel in summer versus winter means averaging a sine curve over part of its period.

It also carries a conceptual snag. An average usually means "add up the numbers, divide by how many." But between $0$ and $\pi$ there are **infinitely many** values of $\sin x$, and you cannot add them and divide by infinity.

Working through the snag yields two things: a formula for average value, and a second way to understand the fundamental theorem.

## Timeline

| Time | Topic |
| --- | --- |
| 0:40 | The question: the average height of $\sin x$ on $0$ to $\pi$ |
| 1:33 | Averaging a continuous variable: you cannot divide by infinity |
| 2:20 | Approximating with a finite sample first |
| 3:07 | An integral adds height times $dx$, not height |
| 4:27 | The number of samples is about $\pi/dx$ |
| 4:59 | The average approaches $\int_0^\pi \sin x\,dx \big/ \pi$ |
| 5:42 | The antiderivative is $-\cos x$ |
| 6:37 | The area is exactly 2, so the average is $2/\pi$ |
| 7:30 | That quotient is a slope on the antiderivative's graph |
| 10:31 | In general: average value is the slope between endpoints |

## A question that looks meaningless

Start by admitting the oddity.

Averaging finitely many numbers is clear: add them, divide by how many. Three steps, no ambiguity.

But "the average of all $\sin x$ values between $0$ and $\pi$"? There are infinitely many. Add them all? You never finish. Divide by infinity? Undefined.

That sensation — wanting to accumulate infinitely many values over a continuum when the operation does not make sense — is common in mathematics. And almost every time it appears, the answer is the same: **use an integral**.

## Finite samples: replacing infinity with something finite

The first move replaces infinity with finiteness.

![Left: the shaded area under sin x from 0 to π equals 2; right: a rectangle of the same width π and height 2/π≈0.637, still area 2](/images/09-average-value-en.svg)

*Figure: flatten the area under the curve into a rectangle of the same width, and its height is the average 2/π.*

Take $n$ evenly spaced points between $0$ and $\pi$, read off $\sin x$ at each, add and divide by $n$. Perfectly legal.

If the notion of a continuous average means anything at all, then more samples should bring the sample average closer to it.

Now compare that sample average with an integral.

The integral $\int_0^\pi \sin x\,dx$ also samples the continuum, but it adds **height times spacing**, not height:

$$
\sum \sin x \cdot dx .
$$

An integral adds **little areas**, not heights. So the "divide by how many" has to be translated into "divide by spacing."

### How many relates to spacing

If the spacing is $dx$ and the interval is $\pi$ long, the number of samples is about

$$
n \approx \frac{\pi}{dx} .
$$

(Round down if it does not divide evenly; as an approximation this is plenty.)

Substitute back into the sample average:

$$
\text{average} \approx \frac{\sum \sin x}{n}
= \frac{\sum \sin x}{\pi / dx}
= \frac{\sum \sin x \cdot dx}{\pi} .
$$

Look at the numerator: $\sum \sin x \cdot dx$ is exactly the shape of an integral. Let $dx \to 0$ and it becomes one. Hence

$$
\text{average} = \frac{1}{\pi}\int_0^\pi \sin x\,dx .
$$

In words: **average value is area divided by width.**

The units agree, too: area is height times width, so dividing by width returns a height.

## Evaluating the integral

As the previous lecture established, computing an integral means finding an antiderivative. What is the antiderivative of $\sin x$?

The derivative of $\cos x$ is $-\sin x$, so negate it:

$$
\frac{d}{dx}(-\cos x) = \sin x .
$$

A quick check: $-\cos x$ has slope 0 at $0$, its steepest slope at $\pi/2$, and slope 0 again at $\pi$ — matching the height of $\sin x$ at each point.

Therefore

$$
\int_0^\pi \sin x\,dx = \left[-\cos x\right]_0^\pi
= (-\cos\pi) - (-\cos 0)
= 1 + 1 = 2 .
$$

**The area under one arch of the sine curve is exactly 2** — a result clean enough to be surprising.

So the average height is

$$
\frac{2}{\pi} \approx 0.637 .
$$

## Another reading: average slope

Now the genuinely interesting step.

Look back at the computation. The average equals

$$
\frac{-\cos\pi - (-\cos 0)}{\pi - 0} .
$$

The numerator is the change in the antiderivative's height between the endpoints; the denominator is the length of the input interval. That quotient has a geometric name: **the slope of the line joining two points**.

So the average of $\sin x$ on $[0,\pi]$ equals the slope of the segment joining the point at $x=0$ to the point at $x=\pi$ on the graph of $-\cos x$.

Why does that make sense?

Because by definition $\sin x$ is the derivative of $-\cos x$ — it gives the tangent slope of $-\cos x$ at every point.

So "the average of $\sin x$" can be restated as "**the average of all tangent slopes of $-\cos x$ between $0$ and $\pi$**."

And the average of a pile of tangent slopes equals the total slope from start to end. That is intuitively obvious: your average speed over a trip is total distance over total time, and you never need to know the speed at each moment.

As a supplement: the rigorous version of this intuition is the **mean value theorem** — for a differentiable function on a closed interval, some point has a tangent slope exactly equal to the slope between the endpoints. So "average slope" is not merely a metaphor; some tangent actually attains it.

## The general formula

Generalise to any $f$ on $[a,b]$:

$$
\text{average} = \frac{1}{b-a}\int_a^b f(x)\,dx .
$$

Note that this is **signed** area: parts below the axis count as negative, so a stretch where $f$ is negative pulls the average down — exactly as intuition demands.

The derivation again, in three steps:

- The number of samples is about $\dfrac{b-a}{dx}$;
- Adding $f$ at each sample and dividing by the count equals adding $f(x)\,dx$ and dividing by $b-a$;
- Letting $dx \to 0$ turns the sum into an integral.

Identical to before, with $\pi$ replaced by $b-a$.

### Written with an antiderivative

If $F$ is an antiderivative of $f$, then

$$
\text{average} = \frac{F(b) - F(a)}{b - a} .
$$

The right side is exactly the slope of $F$'s graph between the two endpoints.

Shifting $F$ up or down does not affect the difference, so the choice of antiderivative is irrelevant — the constant cancels in the subtraction, just as in the previous lecture.

## A second signal that says "integral"

The previous lecture offered one signal: **if a problem can be broken into a sum of many small things, think integral**.

This lecture adds a second: **if you have an idea that works in a finite setting and involves adding up several values, and you want it to apply to a continuum, try phrasing it as an integral**.

Average value is the model case: averaging finitely many numbers is elementary, and extending it to a continuous variable requires an integral.

This happens constantly in probability — an expected value is the integral of "value times probability density," which is precisely the continuous version of a weighted average.

## What this lecture establishes

- A continuous average cannot be defined by adding everything and dividing by the count, but it can be approached with finite samples.
- The sample count is about the interval length divided by $dx$; rewriting "divide by count" as "divide by length, times $dx$" turns the sum into an integral.
- The formula: $\dfrac{1}{b-a}\int_a^b f(x)\,dx$ — area divided by width.
- $\int_0^\pi \sin x\,dx = 2$, so the average of $\sin x$ on $[0,\pi]$ is $2/\pi \approx 0.637$.
- Written with an antiderivative, the average is $\dfrac{F(b)-F(a)}{b-a}$, the slope between the endpoints of $F$'s graph.
- Since $f$ is the derivative of $F$, "the average of $f$" equals "the average of the tangent slopes of $F$," which equals the total slope.
- This gives a second view of the fundamental theorem: evaluating an integral only compares the antiderivative at two endpoints, never tallying the points in between.
- The second "think integral" signal: extending a finite accumulation idea to a continuum.

## Check your understanding

**1. Why can't "add up infinitely many values of sin x and divide by infinity" serve as the definition of the average?**

Answer: because neither step is defined. An infinite sum of real numbers does not converge to a finite value here (the sum diverges), and "dividing by infinity" is not a legal arithmetic operation. An average must be defined on finite samples and then extended by a limit; operating directly on infinity produces something meaningless.

**2. Why is rewriting "divide by the number of samples" as "divide by the interval length, then multiply by $dx$" the key step?**

Answer: because it changes the numerator from "a sum of heights" to "a sum of height times spacing." The former diverges as $dx \to 0$ (the number of points and the sum both blow up), while the latter converges to an integral. In one move it does two things: the numerator takes the form of an integral, and the denominator becomes a fixed interval length, so the quotient acquires a finite limit.

**3. Why is $\int_0^\pi \sin x\,dx$ exactly 2?**

Answer: because the antiderivative of $\sin x$ is $-\cos x$, and evaluating at the limits gives $(-\cos\pi)-(-\cos 0) = 1-(-1)=2$. Geometrically, $\sin x$ on $[0,\pi]$ is symmetric about $\pi/2$ with peak 1, average height $2/\pi \approx 0.637$, and multiplying by the width $\pi$ returns exactly 2.

**4. Why is "the average of $\sin x$ equals the slope between the endpoints of $-\cos x$" true?**

Answer: because $\sin x$ is the derivative of $-\cos x$, i.e. the tangent slope of $-\cos x$ at each point. The average of $\sin x$ is therefore the average of those tangent slopes. And an average slope equals total change in height over total width — the slope of the segment joining the endpoints. This is what converts "evaluate at every point, then average" into "look only at two endpoints," which is exactly the efficiency the fundamental theorem provides.

**5. If $f$ is negative on part of the interval, does the average formula still hold?**

Answer: yes, but the result must be read as a signed average. The integral counts the region below the axis as negative, so the negative stretch pulls the average down — consistent with intuition: if the velocity is negative for a while (the car reverses), that stretch contributes negatively to the average velocity. If "average speed" without regard to direction is wanted, integrate $\lvert f\rvert$ instead, which is a different quantity.
