---
slug: "05-euler-formula-physics"
title: "The Physics of Euler's Formula: e^{st} and the s-Plane"
summary: "Read e^{st} as a motion whose velocity is always the position multiplied by s. Real s stretches, imaginary s spins at constant speed, and complex s spirals. The spring equation forces complex roots, and with them the s-plane."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [euler-formula, complex-exponential, harmonic-oscillator, s-plane]
sources:
  - kind: "video"
    title: "The Physics of Euler's Formula | Laplace Transform Prelude"
    url: "https://www.youtube.com/watch?v=-j8PzkZ70Lg"
    author: "3Blue1Brown"
    publishedAt: "2025-10-05"
---

## The thread of the lecture

This is the first of a trilogy preparing the Laplace transform. The transform itself waits until the next two chapters; this lecture lays the intuitions it needs. The protagonist is the exponential $e^{st}$, with $s$ free to be complex.

Two threads run through it and merge at the end:

1. Starting from the definition "$e^t$ is its own derivative", read $e^{st}$ dynamically for various $s$ — especially $s=i$, which produces circular motion;
2. Then turn it around: what kind of differential equation **forces** complex numbers into the picture? A spring.

They meet on the $s$-plane, where every point encodes a whole behaviour: growth, decay, or oscillation.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | First of a trilogy on the Laplace transform |
| 1:51 | Starting point: $e^t$ is its own derivative |
| 3:56 | $e^{it}$: velocity perpendicular to position, so motion is circular |
| 6:59 | The $s$-plane: each point corresponds to one exponential |
| 9:57 | The spring: mass, restoring force, damping |
| 12:49 | Guessing $e^{st}$: a trick that looks arbitrary |
| 14:18 | No damping: $s=\pm i\sqrt{k/m}$, purely imaginary roots |
| 16:13 | Adding the two complex solutions yields a real cosine |
| 19:57 | Adding damping: complex roots with negative real part |
| 22:51 | Forced oscillation: prisms and driven oscillators |

## $e^{st}$ as a motion

The derivative of $e^t$ is itself — that is effectively the definition of $e$. Exponentials with other bases have derivatives proportional to themselves; only $e$ has proportionality constant exactly 1.

Calculus courses visualize derivatives as slopes on a graph. That is fine, but not the only reading. Try this instead: let $e^t$ be the position of a point on the number line as a function of time. Then "derivative equals itself" says that **at every instant the velocity vector looks identical to the position vector**.

Add the initial condition $e^0=1$: start at $1$, so the initial velocity is also $1$, pointing right. The farther right the point gets, the faster it moves, and the faster it moves the farther it gets. Even without ever hearing of exponential growth, this property gives a visceral sense of acceleration.

Generalize:

- $e^{2t}$: by the chain rule the derivative is twice the function. Velocity is always twice the position — growth runs away faster.
- $e^{-0.5t}$: the derivative is $-0.5$ times the function. Velocity is the position rotated 180 degrees and halved. The point drifts left, slower and slower as it nears zero, never arriving — exponential decay.
- $e^{it}$: the derivative is $i$ times the function.

### Why an imaginary exponent rotates

Multiplying by $i$ is a 90-degree rotation. Take $a+bi$: $a$ times $i$ lands on the imaginary axis, and $bi$ times $i$ gives $b i^2=-b$ on the real axis. Each component rotates 90 degrees, so the sum does too.

So $e^{it}$ says: **velocity is always the position rotated by 90 degrees**.

Only one motion satisfies that — rotation around a circle. Starting at $1$ with unit speed, the point travels one unit of arc length per unit of time.

Hence the famous identity: after $\pi$ units of time it has gone exactly halfway around, so $e^{i\pi}=-1$.

One point deserves emphasis: **the notation misleads**. Feeding a complex number into an exponential has very little to do with repeated multiplication and not that much to do with the number $e$. What it actually means is substituting the input into the Taylor series for $e^x$. Reading it term by term is fun: each extra factor of $i$ rotates another 90 degrees, the $\pi^n/n!$ terms first grow and then shrink as the factorial takes over, and the whole spiralling sum converges to $-1$.

Still, nothing in that infinite polynomial makes it obvious that varying $t$ walks around a unit circle. That is exactly why **the "its own derivative" property is more useful than the computation**.

## The $s$-plane

The recurring prop is a complex plane whose horizontal axis is the real part of $s$ and vertical axis the imaginary part. Every point corresponds to an entire function $e^{st}$.

- The **imaginary part** $\omega$ (angular frequency) sets how fast and in which direction it rotates;
- The **real part** decides whether the magnitude grows or shrinks: positive grows, negative decays.

![The s-plane: the right half is the growth region, the left half the decay region; points on the imaginary axis oscillate steadily, points inside the left half decay while oscillating, and points on the real axis grow or decay monotonically](/images/05-s-plane-en.svg)

*Figure: one point settles two things at once — how the envelope changes and how fast it spins.*

At $s=2i$ the velocity is the position rotated 90 degrees and stretched to length 2 — twice the rotation rate.

At $s=-0.5+i$ the exponential splits: one factor handles decay, the other rotation. It can also be read geometrically: moving $1$ to $s$ takes a rotation plus a stretch, and that same combination is the constant relation between velocity and position. Since velocity is always rotated by more than 90 degrees relative to position and is shorter, the trajectory can only spiral inward.

Engineers call this picture the $s$-plane: each point encodes the behaviour of one exponential.

## The harmonic oscillator: letting complex numbers in

So far the exponential came first and complex numbers were explained from it. Now reverse the question: which equations force complex numbers out?

The classic example is a mass on a spring.

Let $x(t)$ be the position, with $0$ at equilibrium. The first derivative is velocity, the second acceleration. The defining feature is that the farther the spring is stretched, the harder it accelerates the mass back toward equilibrium. Newton's second law gives a force proportional to position:

$$
m\ddot x=-kx,
$$

with $k>0$ measuring the spring's stiffness. The model is ubiquitous because many forces are, to first order, proportional to some displacement.

Usually a term proportional to velocity is added as **damping**:

$$
m\ddot x=-kx-\mu\dot x .
$$

Here $\mu>0$, and the minus sign says the faster the mass moves the stronger the resistance. It may stand for friction or air resistance — neither actually behaves this way, but as a first-order approximation it works well.

Collect everything on one side:

$$
m\ddot x+\mu\dot x+kx=0 .
$$

Note first that there is no single solution. Different initial positions give different solutions, and initial velocity is a second free parameter. What is wanted is a **family** of solutions, from which the one matching given initial conditions is selected.

### Guessing $e^{st}$

The method is a trick that feels uncomfortable: guess that the solution looks like $e^{st}$, with $s$ a constant to be found.

On first encounter it feels like being asked to know the answer in advance. Physical intuition also suggests a mass on a spring does not move exponentially.

The trick is indeed unsystematic. But **the wish to make it systematic and generalizable is precisely what leads to the Laplace transform**.

See what it gives. If $x=e^{st}$, then

$$
\dot x=s e^{st},\qquad \ddot x=s^2 e^{st}.
$$

Substituting, every term carries the same $e^{st}$, which factors out:

$$
e^{st}\left(ms^2+\mu s+k\right)=0 .
$$

An exponential is never zero, so the bracket must be:

$$
ms^2+\mu s+k=0 .
$$

**The differential equation has become an algebraic one** — a kind of mirror image of the original.

### No damping: purely imaginary roots

Set $\mu=0$. Solving and taking the square root,

$$
s=\pm\sqrt{-\frac{k}{m}}=\pm i\sqrt{\frac{k}{m}} .
$$

Both $k$ and $m$ are positive, so **$i$ enters whether you want it or not**.

Write $\omega=\sqrt{k/m}$. Recall what $s$ means: solutions look like $e^{st}$, and a purely imaginary $s$ means rotation in the complex plane — oscillation.

This is odd: the position of a mass is obviously real, so why a complex solution? But the qualitative feature matches, and so does the quantitative side: increase $k$ (a stiffer spring) and $\omega$ grows, so the oscillation speeds up — exactly what intuition predicts.

### From complex to real solutions

Strictly, what has been found is a complex-valued solution $e^{i\omega t}$ to the pure mathematics of the equation. To reconnect with physics, a real solution must be extracted.

One way is to keep only the real part. A better way, and the one that fits the larger story, is to **add the two complex solutions**. The vectors $e^{i\omega t}$ and $e^{-i\omega t}$ rotate in opposite directions; their imaginary parts cancel, the sum stays on the real axis, and it oscillates as $2\cos(\omega t)$.

Adding two solutions is allowed because the equation is **linear**: the sum of two solutions is a solution, and so is any scaled sum.

Those scaling constants need not be real — they can be complex, in which case they set the initial angle of each rotating vector. The family of all functions obtained by tuning the two constants is the full solution set; real-valued solutions are a special case, and the initial conditions decide which one is wanted.

### Why not just use cosines and sines?

At this point a fair objection: this is needless complication. If the strategy is "guess a function with a free parameter", why not guess a cosine? Indeed, with frequency set to $\sqrt{k/m}$, both cosine and sine solve the equation, and linear combinations give the full family.

That is a **change of coordinates**, and a more natural one when only real solutions matter — just take real coefficients.

The value of exponentials shows up under generalization. Without damping, the two roots are pinned to the imaginary axis; changing $k$ or $m$ slides them along it, giving different frequencies.

### Adding damping

With $\mu\ne 0$, the quadratic formula applies. The algebra does not need dwelling on; look at where the two roots land on the $s$-plane: they acquire **both an imaginary part and a negative real part**.

That is the case described earlier: negative real part decays, imaginary part oscillates, so the solution oscillates while decaying — matching the spring.

There is a nice extra: increase $\mu$ enough and the roots lose their imaginary parts entirely, leaving pure decay with no oscillation. That regime is called **overdamped**.

The whole model is the **damped harmonic oscillator**, one of the most fundamental in physics; understanding it is worthwhile on its own.

## General linear equations

How far does the trick go? Straightforwardly, to any linear equation of the form

$$
a_n x^{(n)}+\cdots+a_1\dot x+a_0x=0 .
$$

Substituting $x=e^{st}$ turns every derivative into the same $e^{st}$ times a power of $s$; factoring out the exponential leaves a polynomial in $s$ to be set to zero.

The **fundamental theorem of algebra** guarantees that, as long as roots may be complex, an $n$th-degree polynomial factors into $n$ linear pieces, exposing $n$ roots. For a fifth-degree equation, the solutions might be five points in the $s$-plane.

The mathematics is saying that $e^{st}$ is a valid solution whenever $s$ takes one of those values. The equation is linear, so scaling each exponential and adding gives the full family. The constants are free knobs, real or complex, controlling amplitude and phase, with values fixed by initial conditions. (Repeated roots carry a nuance that is glossed over here.)

## Beyond the linear case: forced oscillation

Most real equations are not simple linear homogeneous ones.

The prism example is a case in point: charges in glass modelled as damped oscillators, driven by an incoming light wave whose frequency generally has nothing to do with the oscillator's natural frequency. The equation gains one extra term — a cosine driving force.

The solution family is no longer a freely tuned combination of exponentials, and guessing $e^{st}$ no longer works. Yet the answer is closer than expected: solutions still look like a combination of four specific exponentials, only with coefficients that cannot be tuned freely. The whole substance of the prism comes down to how those coefficients depend on the driving frequency.

This is a common outcome: real-world differential equations tend to have solutions that are particular combinations of exponentials. That ubiquity is why engineers benefit from reading points on the $s$-plane as growth, decay, and oscillation.

## Takeaways

- $e^{st}$ can be read as a motion whose velocity is always the position multiplied by $s$.
- Positive real $s$ accelerates along the line; negative real $s$ decays; purely imaginary $s$ rotates at constant speed; complex $s$ spirals, with the real part setting growth or decay and the imaginary part the rotation.
- $e^{i\pi}=-1$ comes from walking halfway around the unit circle; the notation's real content is a Taylor series.
- The "own derivative" property reveals behaviour better than the series computation.
- On the $s$-plane, the imaginary part is angular frequency and the real part the growth or decay rate.
- Substituting $e^{st}$ into $m\ddot x+\mu\dot x+kx=0$ gives $ms^2+\mu s+k=0$: calculus becomes algebra.
- Without damping, $s=\pm i\sqrt{k/m}$: purely imaginary roots mean oscillation. Damping gives roots a negative real part and the motion decays while oscillating; enough damping makes it overdamped.
- The solution family is a sum of scaled exponentials, with coefficients set by initial conditions.
- For a general $n$th-order linear equation, the fundamental theorem of algebra supplies $n$ roots.
- Forced problems keep the exponential form but constrain the coefficients — exactly the problem the Laplace transform is built for.

## Check your understanding

**1. Use "velocity is s times position" to explain why $s=-0.5$ gives exponential decay.**

Reference answer: with $s=-0.5$, velocity is the position rotated 180 degrees and halved. When the position is positive the velocity is negative, so the point moves left; the closer it gets to the origin, the smaller the position and the proportionally smaller the speed. It approaches zero forever without arriving, slowing as it goes — the picture of exponential decay. Because the ratio is fixed, equal time intervals shrink the remaining amount by equal factors.

**2. Why must $e^{it}$ move on a circle?**

Reference answer: multiplying by $i$ rotates by 90 degrees, so the equation demands that velocity be perpendicular to position and of equal length. Perpendicularity means the length of the position vector does not change (its rate of change is the dot product of position and velocity, which vanishes when they are perpendicular), confining the path to a circle about the origin. Equal length means constant speed of 1, one unit of arc per unit of time. Together they give uniform circular motion.

**3. What happens when $x=e^{st}$ is substituted into $m\ddot x+\mu\dot x+kx=0$, and why can the exponential be dropped?**

Reference answer: every term acquires a factor $e^{st}$, giving $e^{st}(ms^2+\mu s+k)=0$. An exponential is never zero, so the equation holds exactly when the bracket vanishes: $ms^2+\mu s+k=0$. The differential equation collapses into a quadratic in $s$, and its roots give the admissible $s$ values.

**4. The undamped case yields purely imaginary $s$. Does that contradict the fact that position must be real?**

Reference answer: no. Purely imaginary $s$ produces complex-valued solutions $e^{\pm i\omega t}$, which are not themselves physical. Real solutions are built from them: adding the two gives $2\cos\omega t$, which lies on the real axis. More generally, linearity means any complex-linear combination of the two solutions is a solution, and conjugate coefficients produce real results. The complex solutions are intermediate objects; real solutions form a subfamily.

**5. Why does damping push the roots off the imaginary axis, and why does strong damping put them back on the real axis?**

Reference answer: the damping term contributes $\mu s$ to the polynomial, reducing the discriminant. While the discriminant stays negative the roots form a conjugate pair with real part $-\mu/(2m)<0$, so the motion oscillates and decays — the roots move from the imaginary axis into the left half-plane. Once damping is large enough that the discriminant is non-negative, the roots become two negative real numbers, the imaginary part disappears, and the motion is pure decay without oscillation, which is overdamping. In every case the roots stay in the left half-plane, reflecting energy loss.

## How it connects

This lecture establishes $e^{st}$ and the $s$-plane as the working language. It also exposes a clear limit: guessing $e^{st}$ works only for linear homogeneous equations and fails once a driving force appears. The next lecture introduces the Laplace transform precisely to turn the guess into a systematic method — mapping an entire function, not just one exponential, onto the $s$-plane so that arbitrary inputs can be handled. The intuitions built here — multiplying by an exponential shifts frequency, the real part decays, the imaginary part oscillates — reappear in the transform's definition and properties.
