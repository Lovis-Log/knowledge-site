---
slug: "06-laplace-transform"
title: "What the Laplace Transform Is Actually Doing"
summary: "Multiply a function by e^{−st} and integrate from zero to infinity, and you get a new function on the s-plane. Every exponential piece hidden in the original leaves a pole at the matching s, so decomposing a function becomes a matter of finding poles."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [laplace-transform, complex-integration, poles, analytic-continuation]
sources:
  - kind: "video"
    title: "But what is a Laplace Transform?"
    url: "https://www.youtube.com/watch?v=j0wJBEZdwLs"
    author: "3Blue1Brown"
    publishedAt: "2025-10-12"
---

## The thread of the lecture

The usual experience of learning the Laplace transform is that you can use it to solve equations while remaining completely in the dark about what it does. 3B1B's analogy fits: learning to drive and learning how an internal combustion engine works are different pursuits — driving is more practical, but understanding the engine is deeply satisfying.

This lecture opens the hood. The goal fits in one sentence:

> Given a function, find which exponential pieces it is made of, and with what coefficients.

The transform's answer is **poles**: plot the transformed function over the $s$-plane and every exponential piece raises a sharp spike at its own location.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The goal: pop the hood on the Laplace transform |
| 2:41 | $\cos t$ splits into two purely imaginary exponentials |
| 4:20 | Why exponentials: differentiating multiplies by $s$ |
| 6:38 | Preview: the transform raises spikes, called poles, at the right places |
| 7:25 | Definition: multiply by $e^{-st}$, then integrate from zero to infinity |
| 8:17 | The $\cos t$ example: at $s=i$ the exponent becomes zero |
| 14:48 | Adding those average vectors tip to tail in the complex plane |
| 20:43 | Analytic continuation: giving meaning beyond the convergence region |
| 25:46 | The key result: the transform of $e^{at}$ is $1/(s-a)$ |
| 32:30 | Running the logic backwards with partial fractions |

## Why exponentials

Two prerequisites.

First, $s$ in $e^{st}$ may be complex: the imaginary part rotates the output, the real part sets exponential growth or decay.

Second, many functions — especially in physics — are combinations of exponential pieces. The friendliest example is the cosine:

$$
\cos t=\tfrac12 e^{it}+\tfrac12 e^{-it}.
$$

Two counter-rotating vectors add, their imaginary parts cancel, and what remains oscillates on the real axis; the sum spans $[-2,2]$, hence the factor of one half.

More complicated functions decompose into more pieces. The driven harmonic oscillator — a mass on a spring pushed by an external force — has a solution made of four exponentials: two oscillating and decaying at the spring's natural frequency, two oscillating at the driving frequency.

So we want a machine: feed in a function (or the differential equation describing it), and have it reveal which exponential pieces the function contains — that is, which values of $s$ appear and with what coefficients.

Why exponentials in particular? Because **differentiating an exponential multiplies it by $s$**. The same machine that decomposes a function into exponentials therefore turns differential equations into algebra: every derivative becomes a multiplication by $s$.

## What the transform does: poles

The word "transform" is a little odd: a function takes a number and returns a number, while a transform is a meta-operation taking a whole function and returning a new one. By convention the new function is written with a capital, $F(s)$.

Look at the effect before the definition. Suppose $f(t)$ really is a sum of exponential pieces. Transform it and you get a new function of $s$; plot that over the $s$-plane and **each exponential piece raises a sharp spike above its own value of $s$**.

Those spikes are called **poles**. So even without knowing the decomposition in advance, reading the poles off the transformed function tells you which exponentials are inside.

![On the left, cos t and its two exponential pieces ½e^(it) and ½e^(−it); after the transform, the s-plane on the right shows a pole at s=i and another at s=−i, combining into F(s)=s/(s²+1)](/images/06-poles-en.svg)

*Figure: two exponential pieces, two spikes — position gives the frequency, height the weight.*

## The definition

$$
F(s)=\mathcal{L}\{f\}(s)=\int_0^\infty f(t)\,e^{-st}\,dt .
$$

Two steps: multiply by $e^{-st}$, then integrate from zero to infinity. Here $s$ is complex, and you can imagine it wandering the $s$-plane, **sniffing out** which exponentials line up most closely with $f(t)$.

Take $\cos t$. Substituting the expansion, each term of $\cos t\cdot e^{-st}$ is a product of exponentials, so the exponents add:

$$
e^{it}\cdot e^{-st}=e^{(i-s)t}.
$$

For almost every $s$ this spirals, decaying or growing with time. But one value makes it uniquely boring: at $s=i$ the exponent is zero, and the whole function sits at the constant $1$.

That is the key: **for most $s$ the integrand keeps changing, but at the values we are hunting for, one term secretly becomes constant**. A constant integrated from zero to infinity blows up — which is where the pole comes from.

The integral's job, then, is to detect whether some term in the sum has quietly turned constant.

## Intuition for complex integration

The integrand is complex-valued, so what does its integral mean?

### A real warm-up

Let $s$ be real and consider $\int_0^\infty e^{-st}dt$. With the familiar area reading: at $s=1$ the result is $1$, meaning the area under the curve is exactly $1$ — the infinite tail just fills out the unit square.

Other values of $s$ squash the graph horizontally, and the area becomes $1/s$. **As $s$ shrinks toward $0$ the area grows, diverging quickly.**

But area is not the only reading. Here is one that generalizes: imagine the area over $[0,1]$ as a pool of water, allowed to level out. The water's height is the function's **average** over that interval. Since the interval has width $1$, area and height coincide numerically.

Then each interval $[1,2]$, $[2,3]$, and so on has its own average; adding all those averages gives the integral from $0$ to infinity.

### Complex: adding average vectors

When $s$ is complex, $e^{-st}$ spirals around the plane while decaying (or growing). Over a unit interval, take the centre of mass of all the outputs — the average for that interval, drawn as an arrow.

Stack those arrows tip to tail in a separate complex plane: the limit of this spiralling sum is $\int_0^\infty e^{-st}dt$.

Sanity check: move $s$ to $1$. With no imaginary part there is no oscillation, and all the little arrows stack neatly onto the number $1$ — matching the area computation.

Move $s$ toward $0$ and the integral grows rapidly toward infinity. Move $s$ along the imaginary axis instead and the integral shrinks — for a different reason: oscillation brings cancellation, so the vector sum stays closer to the origin.

### Why only half the plane converges

Plot the **length** of that limit above the corresponding $s$ and the magnitude plot appears:

- near $0$ it is large (small real part means slow decay, small imaginary part means little cancellation);
- larger imaginary parts mean more cancellation and smaller magnitude;
- the **left half-plane is left blank**: there $e^{-st}$ grows exponentially and the integral diverges.

On the boundary — $s$ purely imaginary — it also fails to converge: $e^{-st}$ merely rotates around the unit circle and the vector sum circles forever. But give $s$ even a little positive real part and the integral converges to a definite value; let the real part shrink back to zero and those values approach a clear limit.

## Analytic continuation

For real $s$ we computed $\int_0^\infty e^{-st}dt=1/s$. The identity survives into the complex case, though that is not obvious. Check one point: as $s$ approaches $i$, the integral approaches $-i$, and indeed $1/i=-i$.

The trouble is that the right-hand side, $1/s$, is defined everywhere except $s=0$, while the left side converges only on the right half-plane. At $s=-1$ the right side says $-1$, yet $\int_0^\infty e^{t}dt$ is plainly not $-1$.

This leads to **analytic continuation**, one of the sharpest differences between real and complex functions.

A real function defined on a limited domain can be extended in infinitely many ways; even demanding smoothness leaves infinitely many choices, like a floppy piece of spaghetti. Complex functions are far more constrained: if a complex function is differentiable throughout its domain and you want to extend it while keeping it differentiable, then **either no extension exists or it is unique**.

That unique extension is the analytic continuation. A powerful theme in mathematics is that understanding the full extended version — especially its poles — reveals hidden information about the original function.

For our purposes: the defining integral usually converges only on a half-plane, but plotting the continuation and locating all its poles is what pays off.

## The transform of an exponential

$1/s$ is the purest pole: it looks like division by zero at $s=0$, and the plot resembles a circus tent with a pole through that point.

It is also the **Laplace transform of the constant function $1$**: the constant maps to $1/s$, with a pole at $0$.

Almost for free this generalizes: **the transform of any exponential is again a simple pole**, just somewhere else.

Try $e^{1.5t}$. The integrand becomes

$$
e^{1.5t}\cdot e^{-st}=e^{(1.5-s)t},
$$

essentially the same object shifted by $1.5$. Every picture is unchanged; only the location of the blow-up moves from $s=0$ to $s=1.5$. Hence

$$
\mathcal{L}\{e^{at}\}(s)=\frac{1}{s-a},
$$

with a pole at $s=a$.

If you remember one fact from this lecture, make it this: **the transform of $e^{at}$ is $1/(s-a)$, with a simple pole at $s=a$. Poles expose the exponential pieces of the original.**

## The full $\cos t$ example

Linearity does the rest: scaling and addition inside pass outside the transform.

$$
\mathcal{L}\{\cos t\}
=\tfrac12\mathcal{L}\{e^{it}\}+\tfrac12\mathcal{L}\{e^{-it}\}
=\frac{1/2}{s-i}+\frac{1/2}{s+i}.
$$

The first term has a pole at $i$, the second at $-i$. Combining over a common denominator gives the form you would find in a table:

$$
\frac{s}{s^2+1}.
$$

The picture agrees. The path of $\cos t\cdot e^{-st}$ is far messier, swinging like a flower petal; stacking the interval averages traces a star pattern. As the imaginary part of $s$ approaches $1$, the exponential's oscillation synchronizes with the cosine, the path stays on the right side, and the integral is flung outward; let the real part go to zero and the integral diverges — a pole.

### Running the logic backwards

The reasoning can be reversed, and that direction is closer to actual practice:

1. Compute $\int_0^\infty \cos t\,e^{-st}dt=s/(s^2+1)$ directly by parts;
2. Split it with **partial fractions**;
3. The poles at $i$ and $-i$ appear immediately, together with the coefficients $\tfrac12$;
4. Hence the original contains $e^{it}$ and $e^{-it}$.

## Relation to the Fourier transform

On the imaginary axis the Laplace transform is essentially the Fourier transform. The differences are the lower limit at $0$ rather than $-\infty$ and the usual constant conventions in the exponent. In essence, the Laplace transform generalizes the Fourier transform: it probes alignment not only with purely imaginary exponentials but with any exponential.

## Takeaways

- The Laplace transform maps a function to a new function on the $s$-plane, exposing its exponential pieces.
- Definition: multiply by $e^{-st}$ and integrate from zero to infinity.
- For most $s$ the integrand spirals and decays; only the $s$ matching an exponential piece makes that term constant, so the integral diverges and a pole appears.
- A complex integral can be read as the limit of average vectors stacked tip to tail.
- The integral converges only for sufficiently large $\mathrm{Re}(s)$; values on the left half-plane come from analytic continuation.
- A differentiable complex function has at most one differentiable extension, which is the basis of analytic continuation.
- $\mathcal{L}\{1\}=1/s$, with a pole at $0$.
- $\mathcal{L}\{e^{at}\}=1/(s-a)$, with a pole at $a$ — the one fact to remember.
- The transform is linear, so the transform of $\cos t$ is a sum of two pole terms, which combine to $s/(s^2+1)$.
- On the imaginary axis the Laplace transform coincides in essence with the Fourier transform.
- In practice the logic often runs backwards: integrate, apply partial fractions, read the poles.

## Check your understanding

**1. Why does $\int_0^\infty \cos t\,e^{-st}dt$ diverge at $s=i$?**

Reference answer: writing $\cos t=\tfrac12e^{it}+\tfrac12e^{-it}$ puts a term $e^{(i-s)t}$ in the integrand. At $s=i$ its exponent is zero, so it becomes the constant $1$, whose integral over $0$ to infinity diverges. The other terms still oscillate or decay and cause no divergence. That divergence is exactly the pole: it marks the presence of an exponential component at frequency $i$.

**2. Use the "average vectors stacked tip to tail" picture to explain why larger imaginary parts give smaller magnitudes.**

Reference answer: the integral over a unit interval is the average (centre of mass) of the outputs there, drawn as an arrow; the total integral is the limit of those arrows stacked tip to tail. A larger imaginary part makes $e^{-st}$ rotate faster, so outputs within and across intervals point in more varied directions and cancel more. The resulting path curls closer to a closed loop and ends nearer the origin, giving a smaller magnitude.

**3. Why is the left half-plane not plotted, and do those values mean anything?**

Reference answer: for $\mathrm{Re}(s)<0$, the modulus of $e^{-st}$ is $e^{-\sigma t}$ with $\sigma<0$, which grows exponentially, so the defining integral diverges and has no value. The analytic expression $1/s$ (or $F(s)$ in general) is still defined there and gives the analytic continuation of the integral. The continuation is not equal to the original integral, but it preserves structural information about the function, especially the location of poles, which is exactly what is needed.

**4. Why do poles expose exponential pieces? Illustrate with $\cos t$.**

Reference answer: since $\mathcal{L}\{e^{at}\}=1/(s-a)$ has a pole at $s=a$, each pole location corresponds to one exponential $e^{at}$ in the original. For $\cos t=\tfrac12e^{it}+\tfrac12e^{-it}$, the transform is $\tfrac12/(s-i)+\tfrac12/(s+i)$ with poles at $i$ and $-i$, matching the two exponentials; the coefficients $\tfrac12$ are read off the partial-fraction numerators. Pole positions give the frequencies, residues give the weights.

**5. How does the Laplace transform on the imaginary axis differ from the Fourier transform?**

Reference answer: setting $s=i\omega$ makes $e^{-st}=e^{-i\omega t}$, the same kernel as the Fourier transform. Two differences remain: the lower limit is $0$ rather than $-\infty$, so only signals for $t\ge 0$ are handled, and conventions about constants such as $2\pi$ vary. More importantly, the Laplace transform lets $s$ have a real part, so it captures growth and decay as well as pure oscillation, whereas the Fourier transform corresponds only to the oscillatory case.

## How it connects

This lecture explains the machine but does not drive it. The next lecture uses it on an actual differential equation: transform both sides, let derivatives become multiplication by $s$, watch the differential equation collapse into algebra, solve for $F(s)$, and read the poles back into the time domain. "Poles are exponential pieces" and partial fractions become the main tools there. The final lecture of the trilogy pushes further, showing that most functions cannot be written as discrete sums of exponentials and require a continuous combination instead.
