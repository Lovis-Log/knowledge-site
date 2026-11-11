---
slug: "02-paradox-of-the-derivative"
title: "The Paradox of the Derivative: Instantaneous Speed Does Not Exist"
summary: "Speed at a single instant is a contradiction in terms — speed needs two moments. The derivative slips past the paradox: it never asks about an instant, only about what the ratio approaches as the step shrinks."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [derivative, limits, tangent-line, instantaneous-rate]
sources:
  - kind: "video"
    title: "The paradox of the derivative | Chapter 2, Essence of calculus"
    url: "https://www.youtube.com/watch?v=9vKqVkMQHKk"
    author: "3Blue1Brown"
    publishedAt: "2017-04-30"
---

## The thread of the lecture

Lecture 1 already used a derivative: the tiny change in an area function, divided by the tiny change in its input, is approximately the height of the graph. This lecture turns around and asks the more basic question — **what is that ratio, really?**

The answer: it is not a ratio but the number a family of ratios approaches. That sounds like a verbal nicety, but it dissolves a genuine paradox. "Instantaneous speed" is self-contradictory as a phrase: speed needs two moments, and an instant has only one. The derivative is clever because it never touches the instant — it only lets two moments slide closer together.

## Timeline

| Time | Topic |
| --- | --- |
| 0:40 | Change happens between two moments; a single instant contains none |
| 1:07 | The central example: 100 metres in 10 seconds, speeding up then slowing |
| 3:26 | The paradox: speed at a single instant is meaningless |
| 4:37 | What a speedometer does: measure the distance from 3.00 s to 3.01 s |
| 5:31 | $ds/dt$ is rise over run on the zoomed-in graph |
| 8:17 | As the two points close in, the secant's slope approaches the tangent's |
| 9:30 | The healthier reading: the best constant approximation nearby |
| 10:38 | Working one out: the derivative of $t^3$ at $t=2$ |
| 13:01 | The result: the derivative of $t^3$ is $3t^2$ |
| 14:30 | A second paradox: is the car moving at $t=0$? |

## One car, two curves

Picture a car leaving point A, speeding up, then slowing to a stop at B, 100 metres away, over 10 seconds.

Draw two graphs:

- **Distance against time**, $s(t)$: time on the horizontal axis, total distance travelled on the vertical. The curve starts shallow (the car is slow off the line), steepens through the middle (the car is fast), then flattens again as it stops. The letter is $s$ rather than $d$, since $d$ already has a full-time job in calculus.
- **Velocity against time**, $v(t)$: starting near zero, rising to a peak, falling back to zero — a bump.

The two are obviously related: where the distance graph is steep, the speed is high. But "related" is not enough. The question is the **exact correspondence** — given any curve $s(t)$, how do you get $v(t)$?

## The paradox: speed at an instant

Before reaching for a formula, pin down what "speed" means here.

Intuitively, the speed at a moment is whatever the speedometer reads at that moment. A steeper distance graph means more distance per unit time, hence higher speed. That intuition is fine.

The trouble is that **speed at a single instant makes no sense**.

Hand someone a photograph of a car — a single snapshot — and ask how fast it is going. There is no way to answer. You need two moments, the distance covered between them, and a division by the elapsed time. Speed is *defined* as distance per unit time, and that definition quietly contains two moments.

So the contradiction: the function $v(t)$ takes a single $t$, a single instant, and is supposed to return a speed; but computing a speed requires two instants.

This is not nitpicking. Newton and Leibniz ran straight into it, and it is the first real threshold of the subject.

## How a speedometer dodges it

A real speedometer does not solve the paradox. It sidesteps it.

It does not measure "the speed at 3 seconds." It measures how far the car goes between 3.00 and 3.01 seconds, then divides by $0.01$ seconds. What it computes is an **average speed over a short interval** — short enough to pass for an instantaneous one.

Name the two small quantities: a time difference $dt$ (say $0.01$ s) and the resulting distance difference $ds$. Then

$$
v \approx \frac{ds}{dt}.
$$

On the graph this has a clean geometric reading. Zoom in near $t = 3$: $dt$ is a small step right (time is horizontal), $ds$ is the resulting change in height (distance is vertical). So $ds/dt$ is **the slope between two very close points on the graph** — rise over run.

Nothing is special about $t = 3$. The same computation works at every moment, so $ds/dt$ is itself a function: hand it a $t$, it returns the speed there.

That is exactly what the computer did when it drew the bump. Pick $dt = 0.01$; for every $t$ between 0 and 10, compute $s(t+dt) - s(t)$ and divide by $dt$. Feed it any distance curve and it hands back the corresponding velocity curve.

## From secant to tangent

So far $ds/dt$ is only an approximation. What is the real derivative?

For a specific $dt$, $ds/dt$ is the slope of a line through two distinct points on the graph — a **secant**. As $dt$ shrinks, the two points slide together and the secant pivots. It pivots toward one definite direction, where it just grazes the curve: the **tangent**.

So the honest-to-goodness mathematical derivative is not the slope between two nearby points. It is **the slope of the tangent at a single point**.

![The curve t³ at t=2 with its secant and tangent: three panels take dt=0.5, 0.25, 0.05, giving secant slopes of 15.25, 13.56, and 12.30 against a fixed tangent slope of 12](/images/02-paradox-of-the-derivative-secant-en.svg)

*Figure: the same "let the points close in" move, with the secant swinging toward the tangent — the smaller dt, the closer the slope to 12. The limit is the tangent's slope.*

### Three ways to misread this

The step is easy to misread in three ways, each worth ruling out:

1. **Not "$dt$ is infinitesimal."** $dt$ stays a finite, non-zero number; it is merely allowed to be arbitrarily small. "Infinitesimal" is a vague word, and nothing here needs it.
2. **Not "substitute 0 for $dt$."** That makes the denominator zero and the expression meaningless.
3. **Not "pick a very small $dt$ and you're done."** $dt = 0.01$ gives an approximation, not the derivative. The derivative is the **target** of the approximation, not any stop along the way.

So how is it defined? As the limit of $ds/dt$ as $dt \to 0$. That phrasing is clever precisely because it never arrives at $dt = 0$: it says only that as $dt$ gets smaller, the ratio gets closer to some number, and that number is named the derivative.

That is how the paradox is dodged — **it flirts with the paradox without ever touching it**.

### A healthier phrasing

Because "rate of change at an instant" remains an oxymoron, Grant suggests a different reading:

> The derivative is not an instantaneous rate of change; it is **the best constant approximation to the rate of change around that point**.

That survives scrutiny. The derivative tells you: if you insist on replacing the real motion near this point with a single constant speed, which number is the best choice. It is not "what is happening at this instant" but "the best single description of the motion nearby."

## Computing one: $t^3$ at $t=2$

With the definition in hand, compute something concrete. Let the distance function be $s(t) = t^3$ (1 metre after 1 second, 8 metres after 2 seconds, and so on). Find the speed at $t = 2$.

Let $dt$ be a concrete number first; it goes to zero only at the end. The average speed between the two points is

$$
\frac{s(2+dt) - s(2)}{dt} = \frac{(2+dt)^3 - 2^3}{dt}.
$$

Expand the numerator:

$$
(2+dt)^3 = 8 + 12\,dt + 6\,dt^2 + dt^3 .
$$

Subtract $8$; the $8$ cancels, leaving

$$
12\,dt + 6\,dt^2 + dt^3 .
$$

Every term carries a $dt$, so it cancels against the denominator:

$$
\frac{12\,dt + 6\,dt^2 + dt^3}{dt} = 12 + 6\,dt + dt^2 .
$$

Now let $dt \to 0$. Both remaining terms contain $dt$ and vanish, leaving

$$
12 .
$$

So the tangent at $t = 2$ has slope 12 — which is $3 \cdot 2^2$. Nothing is special about 2; replace it with a general $t$ and the same expansion yields $3t^2$. Hence

$$
\frac{d}{dt}\left(t^3\right) = 3t^2 .
$$

### Why the whole derivation is worth watching

It looks like a pile of algebra, but the conclusion deserves attention: **the concept is this complicated and the answer is this simple**.

More interesting is *when* the simplification happens. While $dt$ still has a concrete size, the expression is $12 + 6\,dt + dt^2$ — three terms, all of them necessary. The moment you ask what it approaches as $dt \to 0$, the last two terms can be dropped entirely, leaving $12$.

**Taking the limit does not make the computation harder; it makes it easier** — it licenses you to discard the messy terms. That is one of the core mechanisms behind calculus's usefulness.

In practice nobody expands this every time. Knowing that the derivative of $t^3$ is $3t^2$ is memorized like a multiplication table. The next lecture explains geometrically why the formula looks that way.

## A second paradox: is the car moving at $t=0$?

With a derivative in hand, a sharper paradox becomes available.

Same car, same $s(t) = t^3$. Ask: at $t = 0$, is the car moving?

On one hand, the derivative $3t^2$ equals 0 at $t = 0$. The tangent at that point is perfectly flat. So the "instantaneous speed" is 0 — the car is not moving.

On the other hand, if it is not moving at $t = 0$, when does it start? Any candidate moment can be pushed back one step further.

The root of the paradox is the same: **the question is malformed**. It presumes that something like "the state of motion at an instant" exists, and the derivative does not measure that.

What a derivative of 0 actually says is: near $t = 0$, if you must approximate this car with a constant speed, the best choice is $0\ \mathrm{m/s}$. That is an approximation, and a fairly crude one — it describes "things are slow around here," not "the car is stopped right now."

Concrete numbers settle it. Between $0$ and $0.1$ seconds the car does move: $0.001$ metres. That distance is small, but it is even smaller relative to $0.1$ seconds, giving an average speed of only $0.01\ \mathrm{m/s}$. The smaller $dt$ gets, the closer that average gets to zero — which is precisely what "derivative equals zero" means.

So the car has always been moving, just extremely slowly. Treating its motion as rest is a decent approximation near $t = 0$, and nothing more.

## What this lecture establishes

- "Instantaneous speed" is contradictory on its face: speed needs two moments, an instant has one.
- A speedometer dodges the paradox by measuring distance over a short interval and forming $ds/dt$.
- Geometrically, $ds/dt$ is the slope of a secant; as $dt \to 0$ the secant becomes the tangent, and the derivative is the tangent's slope.
- The derivative is not a ratio of infinitesimals, not a substitution of 0, and not the approximation from some small $dt$ — it is the limit of the ratio.
- The safer reading: the derivative is the best constant approximation to the rate of change near that point.
- $(t^3)' = 3t^2$; terms carrying $dt$ vanish under the limit, which is why the limit makes computation easier.
- A zero derivative at $t=0$ does not mean the car is stopped; it means the best constant approximation nearby is zero.

## Check your understanding

**1. Why is "instantaneous speed" contradictory, and how does the derivative avoid the contradiction?**

Answer: speed is defined as change in distance divided by change in time, which needs two moments; "instantaneous" supplies only one, so the interval has zero length and the ratio is undefined. The derivative never defines speed at an instant. It considers a family of average speeds $ds/dt$ over ever-shorter intervals and asks what that ratio approaches as the interval contracts. Every member of the family has $dt \neq 0$; only the limit is taken, so "displacement over zero time" is never computed.

**2. When computing the derivative of $t^3$ at $t=2$, why do $6\,dt$ and $dt^2$ disappear? Is that "ignoring error"?**

Answer: they do not get ignored; they genuinely go to zero. The expression $12 + 6\,dt + dt^2$ is a function of $dt$, and as $dt \to 0$ that function tends to 12 — that is the definition of the limit, not an approximation. The distinction matters: at a fixed $dt = 0.01$ the value $12.0601$ is only approximate and the $0.0601$ error is real; but the derivative is not the value at any fixed $dt$, it is the limit of the whole family, and that limit is exactly 12.

**3. If the derivative is "the slope of the tangent," how is the tangent defined? Isn't that circular?**

Answer: the tangent is not defined by a loose geometric description like "touches the curve at one point." It is defined as the limiting position of secants. A secant is determined by two distinct points and is perfectly well defined; let the second point slide along the curve toward the first, and the secant's slope tends to a definite value. The line in that limiting position is the tangent. So the tangent is a product of the limit, not a prior object, and there is no circularity.

**4. Why can't a zero derivative be read as "the object is at rest"?**

Answer: the derivative is the best constant approximation nearby, not the actual speed at an instant. For $s(t)=t^3$ at $t=0$ the derivative is 0, meaning that over any short interval starting there the average speed is small and gets smaller as the interval shortens. But the displacement over any positive interval is non-zero (0.001 m from 0 to 0.1 s), so the car is always moving. Rest would require zero displacement over an interval of positive length, which is much stronger than a zero derivative.

**5. Why does taking the limit make the computation simpler rather than harder?**

Answer: at a fixed $dt$, the expression for $ds/dt$ keeps every order — $12 + 6dt + dt^2$ — because each term contributes. After the limit, every term containing a positive power of $dt$ vanishes, leaving only the $dt$-independent part. The limit collapses the infinitely many possible choices of $dt$ into a single definite number, and legally discards whatever varied with $dt$. That is why every derivative formula later in the series can be written in such compact form.
