---
slug: "04-fourier-series"
title: "Fourier Series: From Heat Flow to Drawing with Circles"
summary: "Break a function into rotating vectors, set them spinning tip to tail, and any shape can be drawn. The coefficients come from one clever integral: freeze the nth vector, average, and every other term completes whole turns and vanishes."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [fourier-series, complex-exponential, orthogonality, heat-equation]
sources:
  - kind: "video"
    title: "But what is a Fourier series? From heat flow to drawing with circles | DE4"
    url: "https://www.youtube.com/watch?v=r6sGWTCMz2k"
    author: "3Blue1Brown"
    publishedAt: "2019-06-30"
---

## The thread of the lecture

The lecture opens with an animation that is hard to look away from: several hundred arrows, each rotating at a constant frequency, joined tip to tail, with the final tip tracing an intricate shape on the plane.

Each arrow does the simplest thing imaginable — steady rotation. Yet the collection is anything but simple, and **the complexity is completely controllable by mathematics**: tune each arrow's initial length and angle, and it will draw essentially anything.

Two questions drive the lecture:

1. How are those coefficients computed? (One integral.)
2. Why is this the same as "writing a function as a sum of sine waves"? (A counter-rotating pair.)

## Timeline

| Time | Topic |
| --- | --- |
| 0:05 | Complex Fourier series: rotating vectors joined tip to tail |
| 1:52 | The familiar "sum of sine waves" is a special case of a more general phenomenon |
| 4:21 | Fourier's question: can any distribution be written as sine waves? |
| 4:54 | The step function: two rods at opposite temperatures brought together |
| 7:06 | What an infinite sum means: partial sums get arbitrarily close |
| 9:53 | Moving to the complex plane: outputs can be any complex number |
| 11:25 | Frequencies 1 and −1 pair up into an oscillation on the real axis |
| 12:58 | The central object: the complex exponential $e^{it}$ |
| 18:49 | Extracting the nth term: multiply by $e^{-2\pi int}$ to freeze it |
| 19:55 | Then average, and every other term vanishes |

## Opening: a shape drawn by three hundred arrows

The animation deserves a pause. A single arrow does one thing — rotate at a steady rate — which is about the simplest behaviour you can imagine. Stack three hundred and the result is wildly complex, and the more you zoom in, the more you see the smallest, fastest, most frenetic arrows contributing detail.

What is strange is that this chaotic swarm moves with a kind of discipline, tracing one specific shape. Stranger still, unlike most emergent complexity in nature, **we have the mathematics to describe and control it completely**. Tune the starting conditions and nothing else, and the swarm conspires to draw whatever you like, given enough arrows.

And the final formula behind all of it is startlingly short.

## From the heat equation to decomposing functions

Fourier series are usually introduced as "writing a real-valued function as a sum of sine waves". That turns out to be a special case of the more general rotating-vector picture, but it is where Fourier himself started.

Recall three facts from the previous lecture:

- The heat equation is **linear**: two solutions add to a solution, and each can be scaled;
- Cosine waves (frequency tuned so the ends are flat) are simple solutions that decay exponentially;
- Higher frequencies decay faster.

Linearity provides the dials: take the family of solutions, scale each by a constant of your choosing, and add them up to build a solution tailored to a particular initial condition.

One consequence is worth noticing: after superposition, the high-frequency terms die first, leaving low frequencies to dominate, so **the profile smooths out over time**. All the complexity of the evolution is captured by the differences in decay rates across frequencies.

### An absurd question

A reasonable person would stop here: fine, I can solve the heat equation when the initial profile is a wave, or a sum of waves, but real profiles never look like that.

Fourier asked a question that sounds absurd: **how do you write a step function as a sum of sine waves?**

Take two rods at temperatures $1$ and $-1$, joined into a rod of length $L=1$. The initial profile is a step function — flat almost everywhere, not remotely wavy, and **discontinuous**.

The constraints are even tighter than that: the waves must satisfy the boundary condition, so only cosines at integer multiples of $\pi/L$ are allowed. Change the boundary condition — say, fixed endpoints — and the toolkit becomes sines instead. The tools change; the strategy does not.

Progress in mathematics often looks less like answering old questions than like asking new ones. Fourier's name has become essentially synonymous with decomposing functions and patterns into simple oscillations, and the source of it all is a piece of physics with no obvious connection to frequency.

## What an infinite sum actually means

First, a technical point: no **finite** sum of sine waves can be perfectly flat (apart from a constant) or discontinuous, so every picture of the sort is an approximation.

Fourier's answer is to consider infinite sums. For the step function,

$$
f(x)=\frac{4}{\pi}\left(
\cos \pi x-\frac{1}{3}\cos 3\pi x+\frac{1}{5}\cos 5\pi x-\cdots
\right),
$$

with coefficients $1,-\frac13,\frac15,-\frac17,\dots$ on the odd frequencies only, all scaled by $\frac{4}{\pi}$.

The phrase "the infinite sum equals" needs unpacking. Consider numbers: $\sum \frac{(-1)^{k}}{2k+1}=\frac{\pi}{4}$. Every partial sum is rational and never actually equals the irrational $\frac{\pi}{4}$, yet they get **arbitrarily close** and stay there. "Equals" is shorthand for that mouthful.

Functions work the same way, with many values converging in parallel. Fix an input $x$:

- for $x<0.5$, the partial sums approach $1$;
- for $x>0.5$, they approach $-1$;
- at $x=0.5$, every cosine is $0$, so the limit is $0$.

That last case is awkward: for the identity to hold strictly, the step function must be assigned the midpoint of the jump at the discontinuity.

Behind this sit real questions — what does it mean to solve a PDE from a discontinuous initial condition, is the limit of solutions still a solution, does every function have a Fourier series — which belong to real analysis and are left to the references. The upshot: adding up all those cosine solutions does give an exact description of how the step function evolves. Doing that in 1822 would have made you immortal.

## The complex plane: a function as a drawing

Now widen the view: the output of the function need not be real — it can be any point in the complex plane.

Why add the complexity? It is more general, the computations become cleaner, and it lays groundwork for the Laplace transform and the centrality of exponentials later in the series.

The input is still a real number in $[0,1]$, but the output may wander anywhere in two dimensions. Think of such a function as a **drawing**: a pencil tip traces a path in the plane as the input runs from $0$ to $1$.

The building blocks are no longer sine waves but **little vectors rotating at constant integer frequencies**.

A real-valued function is just a very boring drawing — a one-dimensional pencil sketch. We usually visualize it as a graph, but that is a different picture: here the path being drawn lives in the output space.

### A counter-rotating pair

Decompose such a one-dimensional drawing and something special happens: the vectors at frequency $1$ and $-1$ have equal length and are horizontal mirror images. As they rotate, their sum stays on the real axis and oscillates up and down — **that is a sine wave**.

This can feel like a strange way to think about a sine wave, since we are used to its graph rather than to a point wandering along the real axis. But in the broader setting of complex-valued functions, this oscillation on a line is what a sine wave is.

Likewise, frequencies $2$ and $-2$ contribute another sine component, and so on. **The sine waves we were looking for correspond to pairs of counter-rotating vectors.**

![A counter-rotating pair on the unit circle: the imaginary parts cancel, the sum oscillates along the real axis, and the matching cosine is traced on the right](/images/04-counter-rotating-en.svg)

*Figure: a sine wave is not one spinning arrow but the sum of two mirrored ones.*

### What $e^{it}$ is

The central object is the complex exponential $e^{it}$: as $t$ advances, it walks around the unit circle at a steady rate.

In principle the whole subject can be told purely in the language of vectors, never mentioning $i$. The formulas become convoluted, and dropping $e^x$ obscures why the idea is so useful for differential equations. For now, treat $e^{it}$ as shorthand for a rotating vector, while keeping in mind that it is more than shorthand.

Each vector has the form

$$
e^{\,n\cdot 2\pi i t},
$$

with $n$ ranging over all integers. As $t$ goes from $0$ to $1$ the exponent covers $n\cdot 2\pi$, that is, $n$ full turns. At $n=0$ it does not move, which is exactly the constant term — writing it as $e^0$ looks silly but keeps the pattern uniform.

The knobs available are each vector's **initial length and direction**, set by multiplying by a complex constant $c_n$.

## Extracting the coefficients

The goal: given an arbitrary $f(t)$, find every $c_n$.

### The constant term is an average

$c_0$ is the easiest. It is the centre of mass of the drawing. Sample the input evenly on $[0,1]$; as the sampling gets finer, the average of the outputs approaches $c_0$. A finer and finer sum is an integral, and since the interval has length $1$, integrating and averaging coincide:

$$
c_0=\int_0^1 f(t)\,dt.
$$

Why does the integral isolate $c_0$? Because integrating the sum equals summing the integrals. Each term is a vector rotating at a constant rate, completing a whole number of turns over $[0,1]$, so its average is $0$. The only exception is the term that does not rotate: its average is just $c_0$.

### Freeze the term, then average

Here is the genuinely clever part. To find $c_2$, first make the frequency-2 vector **hold still** — the mathematical equivalent of settling an overactive child.

Multiply the whole function by $e^{-2\cdot 2\pi i t}$. Multiplying exponentials adds exponents, so every frequency shifts down by $2$:

- the term formerly at $-1$ becomes $-3$, makes whole turns, and averages to $0$;
- the formerly constant $c_0$ term now rotates twice, averaging to $0$;
- only the term formerly at $2$ becomes frequency $0$ and stops.

Average now, and every still-moving term vanishes, leaving just that one:

$$
c_n=\int_0^1 f(t)\,e^{-2\pi i n t}\,dt.
$$

Out of context the expression looks forbidding, but it says something plain: **hold the nth vector still, then average, and everything that still rotates dies.**

All the information in those intricate drawings is compressed into this one integral.

## Rendering: 101 arrows

How is the animation made? The program treats the path as a complex function and computes that integral for a range of $n$.

Where does the path data come from? The easy route is to read an SVG — it describes an image with mathematical curves rather than pixels, so the map from $t$ to points in the plane comes predefined.

The demonstration uses $101$ vectors, $n$ from $-50$ to $50$. Each integral is computed numerically: chop $[0,1]$ into small pieces and accumulate $f(t)e^{-2\pi int}\Delta t$. Fancier quadrature exists; this is the basic idea.

Once the constants are known, each sets an initial angle and length for one small vector. Set them all rotating, add them tip to tail, and the final tip traces an approximation of the original path. As the number of vectors grows, the approximation improves.

## Takeaways

- The complex Fourier series writes a function as a sum of vectors rotating at integer frequencies; initial lengths and angles can be tuned to draw any shape.
- "Decomposing a real function into sine waves" is a special case: a sine wave is a pair of counter-rotating vectors.
- The heat equation is linear, so solutions superpose and scale; high frequencies decay faster, so profiles smooth out.
- Discontinuous profiles such as the step function still have cosine series, with coefficients $\frac{4}{\pi}\left(1,-\frac13,\frac15,\dots\right)$.
- "The infinite sum equals" means partial sums approach the limit arbitrarily closely; at a jump the series takes the midpoint.
- The complex exponential $e^{2\pi int}$ is the building block, with $n=0$ giving the constant term.
- $c_0$ is the average of the function over $[0,1]$.
- To get $c_n$: multiply by $e^{-2\pi int}$ to shift the nth term to frequency zero, then average; everything else completes whole turns and cancels.
- All the information lives in $c_n=\int_0^1 f(t)e^{-2\pi int}\,dt$.

## Check your understanding

**1. Why can no finite sum of sine waves represent a step function exactly?**

Reference answer: a finite sum of continuous functions is continuous, while the step function jumps at $x=0.5$, so no finite sum can equal it. A finite sum of cosines is also smooth and cannot be perfectly flat on an interval. Only an infinite sum, with a limit process, can produce the qualitative change of a discontinuity — the same phenomenon as partial sums staying rational while the limit is irrational.

**2. What does "the infinite sum equals $\frac{\pi}{4}$" mean precisely?**

Reference answer: that the sequence of partial sums converges to $\frac{\pi}{4}$ — for any tolerance there is an index beyond which every partial sum lies within it. The partial sums themselves remain rational and never equal $\frac{\pi}{4}$, but they approach it arbitrarily closely and stay close. Function series work the same way, point by point.

**3. Why must the function's value at the jump be set to $0$?**

Reference answer: because the series' limit there is fixed by the cosines. At $x=0.5$ every $\cos(k\pi x)$ with odd $k$ equals $0$, so every partial sum is $0$ and the limit is $0$. For the identity to hold, the step function must take the midpoint of the jump at that point. The series converges to a version of the function that agrees almost everywhere, with isolated points needing separate conventions.

**4. Why does $\int_0^1 f(t)e^{-2\pi int}dt$ isolate $c_n$?**

Reference answer: multiplying by $e^{-2\pi int}$ shifts every frequency down by $n$. A term originally at frequency $k$ becomes $k-n$, completes $k-n$ whole turns over $[0,1]$, and therefore integrates to zero; only the $k=n$ term becomes frequency zero, stops rotating, and integrates to exactly its coefficient $c_n$. In essence this exploits the orthogonality of complex exponentials on $[0,1]$.

**5. Why does a counter-rotating pair produce an oscillation on the real axis?**

Reference answer: the pair is $c e^{2\pi it}$ and $\bar c e^{-2\pi it}$ — equal length, conjugate. Their imaginary parts are equal and opposite, so they cancel on addition, leaving $2\lvert c\rvert\cos(2\pi t+\varphi)$, a cosine along the real axis. Frequencies $1$ and $-1$ give the fundamental sine component, and higher pairs give the harmonics.

## How it connects

This lecture closes the heat-equation arc: building the equation, finding the modes, then combining them with Fourier coefficients to match any initial profile. It also opens a longer thread — the central role of exponentials, complex and eventually matrix-valued, in solving linear differential equations. The next lecture revisits Euler's formula $e^{i\theta}$ from a physical angle as a prelude to the Laplace transform, where the trick "multiply by an exponential to shift frequencies" will reappear.
