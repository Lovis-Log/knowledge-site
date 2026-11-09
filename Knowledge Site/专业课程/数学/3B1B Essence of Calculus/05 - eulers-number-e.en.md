---
slug: "05-eulers-number-e"
title: "Why e Is Special: The Function Equal to Its Own Derivative"
summary: "Every exponential has a derivative proportional to itself, and the constant of proportionality depends on the base: 0.6931 for base 2, 2.079 for base 8. Exactly one base makes that constant equal to 1, and that number is e."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [exponential-function, eulers-number, derivative, natural-log]
sources:
  - kind: "video"
    title: "What's so special about Euler's number e? | Chapter 5, Essence of calculus"
    url: "https://www.youtube.com/watch?v=m2MIpDrF7Es"
    author: "3Blue1Brown"
    publishedAt: "2017-05-02"
---

## The thread of the lecture

One important family has been missing: exponentials. This lecture supplies it, and along the way answers a question many people have memorized without understanding — **what is $e$?**

The usual answer, "$e \approx 2.71828$, the base of the natural logarithm," explains nothing. The answer here is structural: among all exponential functions, $e$ is the one whose derivative is exactly itself.

$$
\frac{d}{dt}e^t = e^t .
$$

Other bases also have derivatives proportional to themselves, but the constant is not 1. For base 2 it is 0.6931, for base 3 it is 1.0986, for base 8 it is 2.079. Those numbers look arbitrary; they are all the same thing — **the natural logarithm of the base**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:32 | Starting from $2^t$: a population mass that doubles daily |
| 1:39 | Over a full day, the gain equals the amount at the day's start |
| 2:53 | But a derivative needs a much shorter timescale |
| 4:14 | The key property: $2^{t+dt} = 2^t \cdot 2^{dt}$ |
| 5:14 | $(2^{dt}-1)/dt$ tends to 0.6931, independent of $t$ |
| 6:32 | Switch to base 3 and the constant becomes 1.0986 |
| 6:58 | Base 8 gives 2.079, exactly three times 0.6931 |
| 7:36 | Is there a base whose constant equals 1? |
| 8:00 | Yes: $e \approx 2.71828$, whose derivative is itself |
| 9:56 | $2 = e^{\ln 2}$, so the constant is $\ln(\text{base})$ |

## Doubling daily: the tempting wrong answer

Start with a concrete reading of $2^t$: $t$ is time in days, and $2^t$ is the **total mass** of an absurdly fertile population that doubles every day. Mass rather than head count, because mass varies continuously — you can ask about half a day.

- $t=0$: mass 1 (one creature's worth);
- $t=1$: mass 2;
- $t=2$: mass 4;
- doubling every day.

Now ask for the derivative $dm/dt$: the rate at which the mass grows.

Take a full-day scale first. From day 3 to day 4 the mass goes from 8 to 16, a gain of 8. And the mass at the start of day 3 was exactly 8.

Another day: from 16 to 32, a gain of 16 — again the size at the start.

The pattern is clear: **the gain over a full day equals the amount at the start of that day**.

So it is tempting to conclude that the derivative of $2^t$ is itself.

That is the right direction and the wrong answer.

### What goes wrong

The problem is the "full day." What was computed is

$$
2^{t+1} - 2^t ,
$$

a difference with step size 1. A derivative requires the step to shrink to zero.

Over that day the population goes from 8 to 16, and its growth rate is not constant across those 24 hours: near 8 at the start, near 16 at the end. Using 8 for the whole day is just sampling the left endpoint.

Shorten the step — half a day, an hour, a second, a billionth of a second — and the rate settles on a value between 8 and 16, specifically a little above 8.

So "the derivative equals itself" mistook "step size 1" for "step size approaching 0." It returns 8, a systematic underestimate.

## Shrinking the day to $dt$

Write the derivative honestly:

$$
\frac{d}{dt}2^t = \lim_{dt \to 0} \frac{2^{t+dt} - 2^t}{dt} .
$$

The key move is the exponent law:

$$
2^{t+dt} = 2^t \cdot 2^{dt} .
$$

That property deserves a sentence of its own: **it translates addition in the exponent into multiplication of the outputs.** It is precisely what lets a small step in time become a ratio of quantities. Without it, the derivative of an exponential cannot even be approached.

Substitute:

$$
\frac{2^{t+dt} - 2^t}{dt}
= \frac{2^t \cdot 2^{dt} - 2^t}{dt}
= 2^t \cdot \frac{2^{dt} - 1}{dt} .
$$

The structure is now visible: the right side factors into two pieces.

- The first factor, $2^t$, depends only on $t$;
- The second, $\dfrac{2^{dt}-1}{dt}$, depends only on $dt$.

**The two are completely separated.** That is unique to exponentials, and it is the heart of the lecture.

### The constant

What does the second factor approach as $dt \to 0$? Try a calculator:

$$
\frac{2^{0.001}-1}{0.001} \approx 0.6931 .
$$

Smaller $dt$ gives the same neighbourhood. Hence

$$
\frac{d}{dt}2^t = 0.6931\ldots \times 2^t .
$$

The derivative really is proportional to the function — but the constant is 0.6931, not 1. That is where the earlier wrong answer lost its factor.

## Different bases, different constants

Nothing is special about 2. The same derivation for $3^t$ gives

![Left: the curve eˣ with its tangent at x=1, rising e units over a run of 1, equal to the height e; right: the curve k=ln b with points at b=2, e, 3 marked 0.693, 1, 1.099](/images/05-e-slope-en.svg)

*Figure: the slope of eˣ equals its height everywhere; for base b the constant becomes ln b, equal to 1 only at b=e.*

$$
\frac{d}{dt}3^t = 1.0986\ldots \times 3^t ,
$$

and for $8^t$ the constant is 2.079.

Now a pattern-hunting game: how are 0.6931, 1.0986, and 2.079 related?

$2.079 \div 0.6931 = 3.000$. And the base is 8, with $8 = 2^3$. So **the constant for base 8 is three times the constant for base 2**, the factor being the exponent 3.

That is informative: the constants are not random, they vary with the base in some logarithmic way. But to see through the pattern, one more question is needed.

## What $e$ is: making the constant 1

Ask the question backwards: **is there a base whose proportionality constant is exactly 1?**

If so, for that base the derivative equals the function itself, with no leftover coefficient.

There is. Call it $e$:

$$
e \approx 2.71828 .
$$

Therefore

$$
\frac{d}{dt}e^t = e^t .
$$

This is not "$e$ happens to have this property." **The property is the definition of $e$.**

The distinction matters. Asking why $e$ of all numbers has this property is like asking why $\pi$ of all numbers is the ratio of a circle's circumference to its diameter — $\pi$ is not coincidentally equal to that ratio; that ratio is what $\pi$ means. Likewise $e$ is the base that makes an exponential its own derivative; there is no more fundamental definition.

### The geometric face

The property has a striking picture: **on the graph of $e^t$, the slope of the tangent at any point equals the height of that point.**

Move right, the curve rises, the slope grows — the slope is always chasing the height. It is the only exponential curve with this self-referential quality.

## Explaining every constant with the chain rule

Now the 0.6931 can be explained, using the chain rule from the previous lecture.

A stepping stone first: differentiate $e^{3t}$. The outer function is $e^{(\cdot)}$, whose derivative is itself; the inner function is $3t$, whose derivative is the constant 3. Hence

$$
\frac{d}{dt}e^{3t} = 3e^{3t} .
$$

In chain-rule language: a small step in $t$ moves $3t$ three times as far, and the $e$ layer then amplifies that change by the current value — the two amplifications multiply.

In general, the derivative of $e^{ct}$ is $c\,e^{ct}$.

### Every base is a power of $e$

What follows is pure algebra. Any positive $a$ can be written as

$$
a = e^{\ln a},
$$

which is just the definition of the natural logarithm: $\ln a$ answers "what power of $e$ gives $a$?"

Therefore

$$
a^t = \left(e^{\ln a}\right)^t = e^{(\ln a)\,t} .
$$

Apply the result above with $c = \ln a$:

$$
\frac{d}{dt}a^t = (\ln a)\, a^t .
$$

The mystery constant is $\ln a$. Check:

- $\ln 2 \approx 0.6931$ ✓
- $\ln 3 \approx 1.0986$ ✓
- $\ln 8 = 3\ln 2 \approx 2.079$ ✓ (which explains the factor of three)

Three puzzles dissolved at once. The "mystery constant" is nothing but the natural logarithm of the base.

## Why everything is written as $e^{ct}$

In applications, exponentials are almost always written $e^{ct}$ rather than $2^t$ or $3^t$. Not because $e$ is more fundamental, but because this form gives the constant in the exponent a readable meaning.

Consider a broad class of phenomena: some quantity whose rate of change is proportional to the quantity itself.

- Population growth: the growth rate is proportional to the current population (absent resource limits);
- Cooling: the rate at which the water–room temperature difference changes is proportional to that difference;
- Investment: the growth rate of money is proportional to the amount present.

In every such case the function describing the quantity over time is an exponential. Written as $e^{ct}$, the constant $c$ **is exactly the proportionality between the quantity and its rate of change**.

In other words, $2^t$ and $e^{(\ln 2)t}$ describe the same curve and are fully equivalent; the second simply puts "how fast is this growing" on the surface, while the first hides it inside the base.

## What this lecture establishes

- The core property of exponentials is $a^{t+dt} = a^t \cdot a^{dt}$, turning addition in the exponent into multiplication of outputs.
- Hence $\dfrac{d}{dt}a^t = a^t \cdot \dfrac{a^{dt}-1}{dt}$, with the $t$-part and the $dt$-part fully separated.
- The second factor tends to a constant, so an exponential's derivative is always proportional to itself.
- The constant is 0.6931 for base 2, 1.0986 for base 3, 2.079 for base 8.
- Exactly one base makes that constant 1: $e \approx 2.71828$, and $e^t$ being its own derivative is the definition of $e$.
- Geometrically, the tangent slope on $e^t$ equals the height at every point.
- In general, $\dfrac{d}{dt}a^t = (\ln a)\,a^t$ — the mystery constant is the natural log of the base.
- Writing $e^{ct}$ in applications is a deliberate choice: $c$ is the proportionality between rate and size.

## Check your understanding

**1. Why is the reasoning "2^t doubles every day, so its derivative is itself" wrong?**

Answer: it computes the difference quotient with step size 1, $(2^{t+1}-2^t)/1 = 2^t$, whereas a derivative takes the step to zero. Across a whole day the growth rate runs from about $2^t$ to about $2^{t+1}$; using the left endpoint for the entire interval is a crude approximation. Shrinking the step stabilizes the ratio at $0.6931 \times 2^t$, somewhat smaller than the function itself.

**2. What role does $a^{t+dt}=a^t \cdot a^{dt}$ play in the derivation?**

Answer: it converts "the input grew a little" into "the output was multiplied by a factor near 1," which lets the difference quotient factor out $a^t$. After factoring, the part depending on $t$ separates from the part depending on $dt$, and the latter tends to a constant as $dt \to 0$. Without this property there is no way to prove that the derivative is proportional to the function, and hence no way to define $e$.

**3. Why say that $e$ is *defined* as the base making the constant 1, rather than as the number 2.71828?**

Answer: 2.71828 is a numerical manifestation, exactly as 3.14159 is for $\pi$. The essential property of $e$ is $\frac{d}{dt}e^t = e^t$; natural logarithms, the derivative of $e^{ct}$, and the compound-interest limit all follow from it. Defining it by its decimal value first would leave unexplained why that particular value has the property; defining it by the property pins down a unique base whose value is then determined.

**4. Why is the constant for base 8 exactly three times the constant for base 2?**

Answer: because $8 = 2^3$, so $\ln 8 = \ln(2^3) = 3\ln 2$. Since the constant is the natural log of the base, the constant for base 8 is three times that for base 2. This also shows the constants vary logarithmically with the base rather than linearly.

**5. Why do applications prefer the form $e^{ct}$?**

Answer: because $c$ is directly the proportionality between the rate of change and the quantity itself. In population growth, cooling, and compound interest, the model's raw content is usually "the rate is proportional to the amount," with a known coefficient. Written as $e^{ct}$, that coefficient appears untouched in the exponent and can be read off immediately; written as $a^t$, it is buried and requires a $\ln a$ conversion to recover.
