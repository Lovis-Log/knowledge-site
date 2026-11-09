---
slug: "10-higher-order-derivatives"
title: "Higher Order Derivatives: The Slope Is Changing Too"
summary: "The second derivative is the derivative of the derivative, so it reports how the slope itself changes: curving upward means positive, downward means negative. Its most visceral meaning is acceleration, and the third derivative describes how the acceleration itself changes."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [second-derivative, acceleration, notation, curvature]
sources:
  - kind: "video"
    title: "Higher order derivatives | Chapter 10, Essence of calculus"
    url: "https://www.youtube.com/watch?v=BLkz5LGWihw"
    author: "3Blue1Brown"
    publishedAt: "2017-05-07"
---

## The thread of the lecture

This lecture is a patch. Ten chapters in, the series has somehow never introduced higher order derivatives, and the next lecture on Taylor series leans on them constantly. So five minutes to fill the gap.

The focus is the second derivative, which has two very useful readings:

1. **Geometric**: it says which way the curve bends;
2. **Physical**: it is acceleration.

Third and higher derivatives get a brief mention. The idea is identical — each differentiation asks how fast the previous quantity is changing.

## Timeline

| Time | Topic |
| --- | --- |
| 0:40 | The first derivative is the slope at a point |
| 1:08 | Curving up → slope increasing → second derivative positive |
| 1:53 | Where the notation comes from: two $dx$, two $df$ |
| 3:43 | $ddf$ is proportional to $dx^2$, hence the squared denominator |
| 3:57 | The most visceral reading: the second derivative is acceleration |
| 4:54 | The third derivative is called jerk: the rate of change of acceleration |

## The second derivative: rate of change of slope

The first derivative gives the slope at a point. Steep means a large value; descending means negative.

The second derivative differentiates that again, so it answers a different question: **how is the slope itself changing?**

The graph shows it at a glance:

- Where the curve bends **upward** (concave up), the slope increases as you move right, so the second derivative is positive;
- Where it bends **downward** (concave down), the slope decreases, so the second derivative is negative;
- Where the curve is nearly straight, with no bending, the second derivative is zero.

And "bending upward" comes in degrees: a sharp bend means the slope grows quickly, giving a second derivative large in magnitude; a gentle bend means a small one. So the second derivative is not merely a sign — its size measures how violently the curve bends.

## Where the notation comes from

Written out honestly, the second derivative is

$$
\frac{d\left(\dfrac{df}{dx}\right)}{dx} ,
$$

that is, "the tiny change in the derivative divided by the tiny change in $x$." Clumsy. The standard abbreviation is

$$
\frac{d^2f}{dx^2} .
$$

This is easily misread as "$d$ squared times $f$," which it is not. Here is where it comes from.

Start at some input and take two steps right, each of size $dx$.

- The first step changes the function by $df_1$;
- The second changes it by $df_2$.

If the slope were constant, the two changes would be identical, $df_1 = df_2$. But the slope is changing, so they differ slightly. That difference,

$$
ddf = df_2 - df_1 ,
$$

is the change in the change.

Its size matters. Each $df$ is proportional to $dx$, but their difference is the gap between two nearly equal quantities, so it is proportional to $dx^2$. With $dx = 0.01$, $ddf$ is roughly proportional to $0.0001$.

Hence the second derivative is

$$
\frac{ddf}{dx^2} ,
$$

with the square in the denominator because the numerator really is of order $dx^2$. Writing $d^2f/dx^2$ merely abbreviates $(dx)^2$, and the parentheses are conventionally dropped.

The notation is not arbitrary typography; it records a fact: **the second derivative is the difference of two first differences divided by the square of the step**, and the orders balance to leave a finite number.

## The most visceral reading: acceleration

The second derivative's most personal meaning comes from motion.

![Three panels: the parabola s=5t−t², the falling line v=5−2t, and the horizontal line a=−2; a dashed line marks t=1.5](/images/10-higher-derivatives-en.svg)

*Figure: the slope of position gives velocity, the slope of velocity gives acceleration; each derivative is another reading.*

Let $s(t)$ be the distance travelled over time. The first derivative $s'(t)$ is velocity — the slope at each instant tells you how fast you are going.

Then the second derivative $s''(t)$ is the rate at which velocity changes: **acceleration**.

A typical trip: the car pulls away from rest, speeds up, reaches a maximum, then slows to a stop.

- In the first half the speed rises, $s'' > 0$ — the sensation of the seat pushing you forward;
- In the second half the speed falls, $s'' < 0$ — the sensation of the seatbelt holding you back as you lean forward;
- At constant speed $s'' = 0$, and there is no push at all.

This also explains why second derivatives are everywhere in physics: the $a$ in Newton's $F = ma$ is the second derivative of position, so force is tied directly to the second time-derivative of distance.

## The third derivative

Differentiate once more.

In physics it has an informal but vivid name: **jerk**.

A nonzero jerk means **the acceleration itself is changing**. The lurching discomfort of a bad driver usually comes not from the size of the acceleration but from its sudden changes — that is, from jerk.

Beyond that, higher derivatives add no new concept; they repeat the same operation. They matter greatly in Taylor series, where a function's behaviour near a point is completely determined by its derivatives there.

## What this lecture establishes

- The second derivative is the derivative of the derivative, describing how the slope changes.
- Curving upward gives a positive second derivative, downward a negative one, and a straight stretch zero; the magnitude reflects how sharply it bends.
- The notation $d^2f/dx^2$ comes from "difference of two first differences over the square of the step," since $ddf$ is proportional to $dx^2$.
- In motion, the first derivative of position is velocity and the second is acceleration.
- The third derivative is the rate of change of acceleration, called jerk in physics.
- Higher derivatives introduce no new concept, but they determine everything in Taylor series.

## Check your understanding

**1. Why does "curving upward" imply a positive second derivative?**

Answer: curving upward (concave up) means that as you move right along the curve the tangent gets steeper, so the slope is increasing. The second derivative is the derivative of the slope, and an increasing slope has a positive derivative. Conversely, curving downward means the tangent flattens as you move right, so the slope decreases and the second derivative is negative.

**2. Why is the denominator $dx^2$ rather than $dx$?**

Answer: because the numerator is the difference of two first differences, $ddf = df_2 - df_1$. Each $df$ is proportional to $dx$, but they are very close, so the first-order parts cancel and only a residue of order $dx^2$ remains. For the ratio to approach a finite number as $dx \to 0$, the denominator must match that order, namely $dx^2$. With only $dx$ underneath, the ratio would tend to zero and no second derivative would result.

**3. Someone says "the car is slowing down." Which sign of the second derivative does that correspond to?**

Answer: slowing down means the velocity is decreasing, so the derivative of velocity is negative, i.e. the second derivative of position is negative. Note the distinction: the velocity itself may be positive (the car still moves forward) while shrinking. So "slowing down" corresponds to $s'' < 0$, which can hold together with $s' > 0$.

**4. Why does a nonzero jerk feel unpleasant?**

Answer: because a sudden change in acceleration means the force on your body changes abruptly. People adapt to a steady acceleration (an elevator accelerating uniformly feels fine), but they are sensitive to sudden changes in force, which the body cannot anticipate. Jerk describes exactly that rate of change of force, so a spike in jerk corresponds to jolts and lurches.
