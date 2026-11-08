---
slug: "07-why-laplace-useful"
title: "Why Laplace Transforms Are So Useful: Turning Calculus into Algebra"
summary: "Differentiation becomes multiplication by s, so a whole differential equation collapses into a polynomial. The four poles of a driven oscillator split neatly into a transient pair in the left half-plane and a steady pair on the imaginary axis."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [laplace-transform, forced-oscillator, poles, partial-fractions]
sources:
  - kind: "video"
    title: "Why Laplace transforms are so useful"
    url: "https://www.youtube.com/watch?v=FE-hM1kRK4Y"
    author: "3Blue1Brown"
    publishedAt: "2025-11-05"
---

## The thread of the lecture

The lecture opens with a simulation: a mass on a spring pushed by an external force that oscillates back and forth, at a frequency unrelated to the spring's natural one.

Watch the start. The trajectory is irregular — stronger, then weaker, then stronger again — before it settles into a steady rhythm.

Three questions follow naturally:

1. What exactly is that odd startup trajectory?
2. How long until the system finds its stride?
3. Once it does, how large are the swings?

The Laplace transform answers all three at once.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | A driven oscillator simulation with an irregular start |
| 0:52 | Three questions: the startup, the transition time, the steady amplitude |
| 4:43 | Third property: the transform of a derivative is s times the transform, minus the initial value |
| 6:13 | The driven oscillator: adding a cosine force |
| 10:19 | The left side becomes a polynomial — the heart of the method |
| 12:24 | Four roots of the denominator, in two groups |
| 14:23 | The solution is transient plus steady state |
| 15:24 | Inversion by partial fractions |
| 17:04 | The steady amplitude depends on the gap between the two frequencies |
| 19:13 | First explanation: check it on an exponential |

## Starting from a spring simulation

Recap three established facts:

- In $e^{st}$, $s$ is complex; a larger imaginary part means faster oscillation, a negative real part decay, a positive one growth.
- Many functions decompose into exponential pieces, and poles on the $s$-plane mark those pieces.
- Two basic properties: $\mathcal{L}\{e^{at}\}=1/(s-a)$, and the transform is linear.

Those alone support qualitative analysis: poles with imaginary parts mean oscillation, negative real parts mean decay, positive real parts mean instability.

But physics rarely hands you the solution first. It hands you a differential equation, so what is needed is a route **from the equation straight to the transform of its solution**.

## The third property: differentiation becomes multiplication

$$
\mathcal{L}\{f'\}(s)=sF(s)-f(0).
$$

In words: **differentiating in time becomes multiplying by $s$** in the $s$-domain, with a correction term subtracting the initial value.

This is the same idea as "differentiating an exponential multiplies by $s$", and ultimately the same underlying reason.

That $-f(0)$ looks at first like a blemish on an otherwise elegant formula, but it is a **feature**: applied to a differential equation, it absorbs the initial conditions automatically, with no extra step.

## Solving the driven oscillator

$$
m\ddot x+\mu\dot x+kx=F_0\cos(\omega t).
$$

The extra term on the right makes the equation inhomogeneous, and guessing $e^{st}$ no longer works.

The strategy has three steps: transform every term, solve for $X(s)$, then invert back to the time domain.

### Transforming term by term

Write $\mathcal{L}\{x\}=X(s)$. By the third property,

$$
\mathcal{L}\{\dot x\}=sX-x_0,
$$

and applying it again — a good exercise —

$$
\mathcal{L}\{\ddot x\}=s\left(sX-x_0\right)-v_0=s^2X-sx_0-v_0 .
$$

Note that $x'(0)$ is the initial velocity $v_0$. **The initial conditions enter automatically**, which is exactly what that "blemish" buys.

Substituting and collecting every term containing $X$:

$$
\left(ms^2+\mu s+k\right)X
=\text{initial-value terms}+F_0\,\mathcal{L}\{\cos\omega t\}.
$$

The quadratic in brackets is the mirror image of the left side: each derivative raises the power of $s$ by one.

**Differential expressions become polynomials, and polynomials can be handled with algebra** — that is the heart of the method.

### Setting the initial conditions to zero

For a clean first pass, take $x_0=v_0=0$, so the mass starts at rest. The general case simply keeps those terms.

The forcing term was computed last lecture:

$$
\mathcal{L}\{\cos\omega t\}=\frac{s}{s^2+\omega^2},
$$

whose denominator puts poles at $s=\pm\omega i$.

Hence

$$
X(s)=\frac{F_0\,s}{(s^2+\omega^2)\left(ms^2+\mu s+k\right)} .
$$

### Four roots in the denominator

Poles sit where the denominator vanishes, and there are four:

- Two from $ms^2+\mu s+k=0$ — precisely the characteristic equation of the undriven system. The quadratic formula shows they generally have negative real parts, plus imaginary parts when damping is not too large.
- Two from $s^2+\omega^2=0$, namely $s=\pm\omega i$, purely imaginary, coming from the driving force.

## Reading the physics off the poles

Before any inversion, the answer is already visible.

**The pair in the left half-plane**: negative real part means decay, imaginary part means oscillation. They describe what the spring would do on its own — oscillating at its natural frequency while dying away. The **transient**.

**The pair on the imaginary axis**: purely imaginary, neither growing nor decaying, a pure cosine at the driving frequency. The **steady state**.

So the solution reads as a sum:

$$
x(t)=\underbrace{\text{oscillation at the natural frequency, decaying}}_{\text{transient}}
+\underbrace{\text{cosine synchronized with the driving force}}_{\text{steady state}} .
$$

That explains the opening simulation: during startup the two frequencies compete and the transient has not yet died out, producing the wobble; once it fades, only the pure cosine remains and the system has found its stride.

![Left: two pairs of poles on the s-plane, the pair in the left half-plane being the transient and the pair on the imaginary axis the steady state. Right: three curves showing the decaying transient, the constant-amplitude steady state, and their sum with its beats](/images/07-transient-steady-en.svg)

*Figure: where a pole sits decides how long that term lives; the three curves are "transient + steady = actual trajectory".*

Pushing a child on a swing is the right analogy: your pushes need not match the swing's natural frequency, but in the end the swing moves at **your** frequency, after a messy transition.

## Inversion by partial fractions

For an explicit formula the work is routine if tedious.

Knowing the four roots, split $X(s)$ into four terms whose denominators are $s-s_k$:

$$
X(s)=\frac{A_1}{s-s_1}+\frac{A_2}{s-s_2}+\frac{A_3}{s-s_3}+\frac{A_4}{s-s_4}.
$$

The labour lies in finding the constants — the procedure called **partial fraction decomposition**.

Once they are known, inversion is the key rule run backwards:

$$
\frac{1}{s-s_k}\;\longleftrightarrow\; e^{s_k t}.
$$

**The pole positions go into the exponents; the constants stay out in front.**

For the $\pm\omega i$ pair, the two complex exponentials combine into the steady cosine. A worthwhile exercise is left hanging: how does the steady amplitude depend on the gap between the spring's natural frequency and the driving frequency, and what happens as they approach each other? Think of a bridge you would rather not have wobble to ruin.

## Why the property holds

### First explanation: check it on an exponential

Try the object we know best, $e^{at}$. Its derivative is $a e^{at}$, so by linearity the transform of the derivative is $a/(s-a)$.

That looks wrong: the factor is the constant $a$, not the new variable $s$.

But rearrange:

$$
\frac{a}{s-a}
=\frac{s}{s-a}-\frac{s-a}{s-a}
=\frac{s}{s-a}-1
=sF(s)-f(0).
$$

And $1$ is exactly the value of $e^{at}$ at $t=0$. The identity holds.

This checks one function, but the seed is general: any combination of exponentials follows by linearity of both the transform and the derivative. Still not a proof, yet it covers every example seen so far.

### Second explanation: integration by parts

From the definition,

$$
\mathcal{L}\{f'\}=\int_0^\infty f'(t)e^{-st}dt
=\Big[f(t)e^{-st}\Big]_0^\infty
+s\int_0^\infty f(t)e^{-st}dt
=sF(s)-f(0).
$$

Short and tidy. But 3B1B's complaint is fair: the moment integration by parts appears, intuition tends to evaporate — where the $s$ came from and why an initial value is subtracted both look like accidents of calculation.

### Third explanation: through inversion

The satisfying account needs the **inverse transform**: what happens when the result cannot be split into clean fractions, or when the original function is not a discrete sum of exponentials at all?

That is the next lecture, which introduces contour integrals and reinvents the transform from the wish to have a rule turning differentiation into multiplication.

## Takeaways

- The third key property: $\mathcal{L}\{f'\}=sF(s)-f(0)$ — differentiation becomes multiplication by $s$.
- The subtracted initial value lets initial conditions enter automatically; it is a feature.
- Applying it to a linear differential equation collapses the left side into a polynomial, turning calculus into algebra.
- For the driven oscillator, the denominator of $X(s)$ has four roots: two from the spring (left half-plane, transient) and two from the forcing (imaginary axis, steady state).
- Pole positions give the physics directly: real part for growth or decay, imaginary part for frequency.
- The solution is a decaying natural oscillation plus a driven cosine; the messy startup is the transient still present.
- Inversion uses partial fractions: $1/(s-s_k)$ maps to $e^{s_k t}$, poles into exponents, constants into coefficients.
- The steady amplitude depends on the gap between the two frequencies — the heart of resonance and of bridge engineering.
- Three explanations of the derivative property: checking an exponential (limited but vivid), integration by parts (clean but opaque), and inversion (deepest, deferred).

## Check your understanding

**1. Why is $\mathcal{L}\{\ddot x\}=s^2X-sx_0-v_0$? Show the derivation.**

Reference answer: apply the first-derivative rule twice. First, $\mathcal{L}\{\dot x\}=sX-x_0$. Then treat $\dot x$ as a new function $g$ and use $\mathcal{L}\{g'\}=s\mathcal{L}\{g\}-g(0)=s(sX-x_0)-\dot x(0)$. Since $\dot x(0)$ is the initial velocity $v_0$, expanding gives $s^2X-sx_0-v_0$.

**2. What do the four poles of the driven oscillator correspond to, and why is the solution "transient plus steady state"?**

Reference answer: two poles come from $ms^2+\mu s+k=0$, the characteristic equation of the undriven system; they generally have negative real and nonzero imaginary parts, giving oscillation at the natural frequency with exponential decay. Two poles at $s=\pm\omega i$ come from the forcing term, purely imaginary, giving an undamped cosine. Inversion is linear, so the time-domain solution is the sum of these four exponentials: the first pair dies away (transient), the second persists (steady state). After enough time only the steady state remains.

**3. Why does the startup show beating — strong, weak, strong again?**

Reference answer: the transient and steady components have different frequencies, and adding two cosines of different frequencies produces beats: the envelope rises and falls at the difference frequency. As the transient decays exponentially, the beating fades and a single steady cosine survives. The duration of the transition is set by the real part of the transient poles — the more negative it is, the faster the decay.

**4. Verify $\mathcal{L}\{f'\}=sF(s)-f(0)$ on $e^{at}$ and state the limitation of that check.**

Reference answer: the derivative of $e^{at}$ is $ae^{at}$, whose transform is $a/(s-a)$ by linearity. Meanwhile $sF(s)-f(0)=s/(s-a)-1=(s-(s-a))/(s-a)=a/(s-a)$, so the two agree. The limitation is that it verifies a single function; linearity extends it to finite combinations of exponentials but not to general functions, which require integration by parts or inversion theory.

**5. Why does the dependence of the steady amplitude on the two frequencies matter?**

Reference answer: in the limit of small damping the steady coefficient behaves like a factor proportional to $1/(\omega_0^2-\omega^2)$. As the driving frequency approaches the natural frequency the denominator shrinks and the amplitude grows sharply — resonance. In engineering, if an external excitation such as wind, earthquakes, or footsteps approaches a structure's natural frequency, the response can far exceed expectations; the Tacoma Narrows collapse is the standard cautionary example. Design therefore keeps natural frequencies away from likely excitation frequencies, or adds damping to cap the peak.

## How it connects

This lecture puts the transform to work and leaves one visible gap: inversion is convenient only when the result splits into clean fractions. What if it does not? The next lecture closes that gap, reinventing the transform from the wish to turn differentiation into multiplication, introducing contour integrals, and relating the whole construction to the Fourier transform and its inversion. With that, the main arc on differential equations is complete, and the final lecture generalizes exponentials to matrices to give a unified view of linear systems.
