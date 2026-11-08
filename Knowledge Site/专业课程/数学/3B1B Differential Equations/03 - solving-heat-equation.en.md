---
slug: "03-solving-heat-equation"
title: "Solving the Heat Equation: Why Sine Waves Behave So Well"
summary: "The PDE is only one of three constraints; boundary and initial conditions supply the rest. A cosine in space times an exponential in time satisfies the first two, and higher frequencies decay faster, yielding a whole family of modes."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [heat-equation, boundary-condition, sine-wave, exponential-decay]
sources:
  - kind: "video"
    title: "Solving the heat equation | DE3"
    url: "https://www.youtube.com/watch?v=ToIXSwZ1pJU"
    author: "3Blue1Brown"
    publishedAt: "2019-06-17"
---

## The thread of the lecture

The previous lecture built the heat equation: curvature in space means change in time. This one starts solving it, but begins by correcting a phrase — calling the whole business "solving an equation" is a little misleading.

The PDE itself is only **one of three constraints** the temperature function must satisfy. There are also boundary conditions (what happens at the ends of the rod) and an initial condition (you do not get to choose the profile at $t=0$). The difficulty lives in those extra constraints.

Fourier's contribution in 1822 can be told as three observations:

1. Certain sine waves are especially simple solutions;
2. A sum of solutions is again a solution;
3. Any function can be written as a sum of sine waves.

Together they give a recipe: decompose the initial profile into modes, let each decay on its own, and add them back.

## Timeline

| Time | Topic |
| --- | --- |
| 0:03 | Back to the heat equation on a one-dimensional rod |
| 0:38 | The PDE is one of three constraints; boundary and initial conditions remain |
| 1:42 | Third: any function is a sum of sine waves |
| 2:50 | Start with an initial profile of $\sin x$ |
| 4:29 | A rate proportional to the value itself points to an exponential |
| 6:49 | But a real rod does not evolve this way |
| 8:42 | Slope is proportional to heat flow, so insulation means zero slope at the ends |
| 9:21 | The boundary condition: $\partial_x T(0,t)=\partial_x T(L,t)=0$ |
| 10:07 | Switching to cosine, which is already flat at $x=0$ |
| 11:20 | The second derivative brings out $\omega^2$, so higher frequencies decay faster |

## "Solving" means three constraints

The PDE only guarantees that the function follows the rule at every interior point. A real rod also has two ends, whose behaviour the equation does not dictate, and the profile at $t=0$ is given rather than derived.

So the complete statement is

$$
\text{PDE} \;+\; \text{boundary conditions} \;+\; \text{initial condition}.
$$

There is a whole ocean of functions satisfying the PDE, and a sizeable subset of that ocean also satisfies the boundary conditions. Selecting the one that matches a given initial profile is the real problem.

Fourier's achievement was to build a set of knobs and dials for navigating that ocean.

## Fourier's three observations

1. **Certain sine waves are extremely simple solutions.** Not any sine wave — specific frequencies.
2. **Solutions add.** If two functions satisfy the equation (and the boundary conditions), so does their sum.
3. **Any function is a sum of sine waves.** A pedantic mathematician will note pathological exceptions, but essentially any distribution met in practice — discontinuous ones included — can be written as a sum, possibly infinite.

The third is what the name "Fourier series" refers to. Why would anyone want to decompose a function into sine waves? Because in many settings sine waves are easier to handle than anything else, and differential equations are the setting where this pays off most visibly: their second derivatives are exceptionally clean, so each mode can be solved separately and then added back.

## Why sine waves behave so well

Start with the simplest case. To avoid messy constants, suppose the profile at $t=0$ is exactly $\sin x$. A rod whose temperature happens to trace a perfect sine is absurd, but mathematics should be happy to play with wildly idealized examples — they are the first step toward something more general, and therefore more realistic.

The right-hand side of the heat equation asks for the second spatial derivative: how much the profile curves along the rod. And

$$
\frac{d}{dx}\sin x=\cos x,\qquad \frac{d^2}{dx^2}\sin x=-\sin x.
$$

The amount the wave curves is equal and opposite to its height at every point.

So at $t=0$ something peculiar happens: every point changes at a rate proportional to its own temperature, with the same constant everywhere. After a tiny time step the whole curve scales down by the same factor and remains a sine; the same argument applies again, and again.

The limit as the step shrinks behaves identically. Unlike other profiles, a sine wave is **scaled uniformly**, staying "some constant times $\sin x$" for all time.

### Guess and verify

When the rate at which a quantity changes is proportional to the quantity itself, an exponential should come to mind: the derivative of $e^{kt}$ is $k$ times itself. An investment growing at $0.05$ times its value follows $e^{0.05t}$ times the initial amount; carbon-14 decaying at a rate proportional to its own count follows $e^{-kt}$ times the initial count.

For the sine wave the right-hand side is $-\alpha$ times the function itself, so guess

$$
T(x,t)=\sin x\cdot e^{-\alpha t}.
$$

Check it. Differentiating twice in $x$, the factor $e^{-\alpha t}$ has no $x$ in it and rides along like any constant:

$$
\frac{\partial^2 T}{\partial x^2}
=-\sin x\cdot e^{-\alpha t}.
$$

Differentiating in $t$, the factor $\sin x$ has no $t$ in it:

$$
\frac{\partial T}{\partial t}
=-\alpha\sin x\cdot e^{-\alpha t}.
$$

The two match exactly, so $\partial_t T=\alpha\,\partial_x^2 T$ holds. The function really is a solution.

## But nature does not cooperate: boundary conditions

If the story ended here it would be too easy. A real rod does not evolve this way.

Even if a perfect sine profile somehow appeared, with **no heat allowed in or out at the ends**, the actual evolution differs: points on the left are warmed slightly at first, while points on the right are cooled by their neighbours toward the interior.

An even simpler "solution" makes the point: a straight line, $T=cx$. Its second spatial derivative is zero (no curvature) and its time derivative is zero (it never changes), so it satisfies the PDE exactly. Yet drop it into a simulation and it does change — drifting slowly toward the mean temperature.

### A boundary point has only one neighbour

The trouble is at the boundary. The intuition from the previous lecture — every point drifts toward the average of its two neighbours — holds in the interior, but **a boundary point has no neighbour on one side**.

Go back to the discrete picture: let the boundary point drift toward its single neighbour at a rate proportional to the difference. Raise the resolution and repeat, and the profile at both ends flattens essentially the moment the clock starts.

In the limit, the slope of the curve at each end is zero for all $t>0$.

Why slope? Because **the slope at a point is proportional to the heat flow there**. Expressing "no heat enters or leaves" means demanding zero slope at both ends:

$$
\frac{\partial T}{\partial x}(0,t)=0,\qquad
\frac{\partial T}{\partial x}(L,t)=0
\quad (t>0).
$$

Compare with the straight line: its slope at the ends is decidedly non-zero, so as soon as time starts the endpoint values shift infinitesimally to make the slope zero, and it stays zero for the rest of the evolution.

In other words, satisfying the heat equation is not enough; the function must also be flat at both endpoints for all positive time. This is a **boundary condition**, and almost any PDE solved in practice drags one along, demanding as much attention as the equation itself.

## The fix: switch to cosine, tune the frequency

It may feel like no progress was made, but the "sine in space, exponential in time" form is already close. It only needs to be flattened at both ends.

First, use cosine instead of sine. It is the same wave shifted a quarter period, and it is already flat at $x=0$. Its second derivative is again minus itself, so $\cos x\cdot e^{-\alpha t}$ still satisfies the PDE.

Second, flatten the far end by adjusting the frequency. Multiply the input by a constant $\omega$:

$$
T(x,t)=\cos(\omega x)\,e^{-\alpha \omega^2 t}.
$$

Higher frequency means faster oscillation and sharper curvature. The chain rule puts one factor of $\omega$ on the first derivative and $\omega^2$ on the second:

$$
\frac{\partial^2}{\partial x^2}\cos(\omega x)=-\omega^2\cos(\omega x).
$$

The extra $\omega^2$ on the right must be balanced on the left, so the decay rate picks up the same factor.

### Frequency and decay rate

The result reads cleanly: **sharper curves decay to equilibrium faster, and quadratically so**. Double the frequency and the decay is four times as fast.

### Harmonics

For a rod of length $L$, the lowest frequency that also flattens the right end is

$$
\omega=\frac{\pi}{L},
$$

because as $x$ runs from $0$ to $L$ the argument of the cosine runs to $\pi$ — half a period — where the cosine sits at a trough with zero slope.

Every other admissible frequency is an integer multiple:

$$
\omega=\frac{n\pi}{L},\qquad n=0,1,2,\dots
$$

$n=0$ counts too: the function becomes constant, satisfying both the PDE and the boundary conditions — a uniform rod indeed does not change.

That gives a whole family satisfying both the PDE and the boundary conditions:

$$
T_n(x,t)=\cos\!\left(\frac{n\pi x}{L}\right)
\exp\!\left(-\alpha\left(\frac{n\pi}{L}\right)^2 t\right).
$$

These are the building blocks from which the general solution will be assembled.

![Four mode curves, all flat at both ends of the rod: n=0 is a constant that never decays, while n=1, 2 and 3 oscillate faster and decay at 1×, 4× and 9× respectively](/images/03-heat-modes-en.svg)

*Figure: one family of building blocks differing only in frequency — the denser the wave, the faster it is flattened.*

## Takeaways

- "Solving the heat equation" means satisfying three constraints at once: the PDE, the boundary conditions, and the initial condition; the last two carry the difficulty.
- Fourier's three steps: sine waves are simple solutions, solutions add, and any function is a sum of sine waves.
- Since the second derivative of $\sin x$ is $-\sin x$, a sine profile scales uniformly, and that scaling is exponential decay.
- A rate proportional to the value itself implies an exponential — the hinge of the whole derivation.
- The PDE alone is insufficient: an insulated rod must stay flat at both ends, so $\partial_x T=0$ there.
- A boundary point has only one neighbour, which is the physical origin of the special endpoint behaviour; slope is proportional to heat flow.
- Cosine handles the $x=0$ end; tuning the frequency to $\omega=n\pi/L$ handles the other.
- The $\omega^2$ from the second derivative makes high frequencies decay faster — double the frequency, quadruple the rate.
- The result is a family of modes $T_n$, ready to be superposed in the next lecture.

## Check your understanding

**1. Why is "solving the heat equation" misleading, and what does the complete statement include?**

Reference answer: the PDE constrains only how the function behaves at interior points, and infinitely many functions satisfy it. A real rod must also meet boundary conditions at both ends (zero slope when insulated) and start from a given initial profile. Only the three together pin down the evolution. Accepting a PDE-only solution would admit absurdities such as a straight-line profile that never changes.

**2. Why does a $\sin x$ profile scale uniformly? Argue from the second derivative.**

Reference answer: because $\frac{d^2}{dx^2}\sin x=-\sin x$ — the curvature at each point equals minus its height. Substituting into the heat equation gives $\partial_t T=-\alpha T$, so every point changes at the same constant times its own value. After any small time step the whole curve shrinks by a common factor and keeps its shape; iterating gives exponential decay of the entire profile.

**3. The straight line $T=cx$ satisfies the PDE. Why is it not a real temperature evolution?**

Reference answer: its second spatial derivative is zero and its time derivative is zero, so the PDE holds trivially. But its slope at the ends is $c\ne 0$, which means heat is flowing in or out there. For an insulated rod the physical requirement is zero slope at both ends for $t>0$. In a simulation the endpoints adjust almost instantly to flatten the slope, after which the profile drifts toward the mean — the boundary condition doing its work.

**4. Why do higher frequencies decay faster, and why quadratically?**

Reference answer: differentiating $\cos(\omega x)$ twice in space produces a factor $\omega^2$, so the right-hand side becomes $-\alpha\omega^2\cos(\omega x)$ and the decay rate is $\alpha\omega^2$. Intuitively, a higher frequency means sharper curvature over the same length, larger temperature differences between neighbours, and therefore faster heat exchange. The quadratic dependence comes from the second derivative itself.

**5. Why are the admissible frequencies integer multiples of $\pi/L$, and what does $n=0$ correspond to?**

Reference answer: $\cos(\omega x)$ already has zero slope at $x=0$; zero slope at $x=L$ requires $\sin(\omega L)=0$, hence $\omega L=n\pi$ and $\omega=n\pi/L$. At $n=0$ the function is constant, with zero second derivative and zero time derivative, satisfying both the PDE and the boundary conditions — physically, a rod at uniform temperature that no longer changes.

## How it connects

This lecture completes only the first piece of the puzzle: a family of modes satisfying both the PDE and the boundary conditions, with high frequencies decaying fastest. The next lecture handles the final constraint — given an arbitrary initial profile, how much of each mode should be mixed in. The answer is the Fourier series, and the act of writing a function as a sum of sine waves grows into a full theory of orthogonality and coefficients.
