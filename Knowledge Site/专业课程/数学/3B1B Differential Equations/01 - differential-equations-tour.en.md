---
slug: "01-differential-equations-tour"
title: "Differential Equations: The Language of Change"
summary: "Differential equations show up wherever change is easier to describe than amount. This lecture tours projectiles, planets, and the pendulum, then pivots to what to do when nothing can be solved: phase space, vector fields, and simulation."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [differential-equations, phase-space, vector-field, pendulum]
sources:
  - kind: "video"
    title: "Differential equations, a tourist's guide | DE1"
    url: "https://www.youtube.com/watch?v=p_di4Zn4wz4"
    author: "3Blue1Brown"
    publishedAt: "2019-03-31"
---

## The thread of the lecture

The lecture opens with a line from Steven Strogatz: since Newton, mankind has come to realize that the laws of physics are always expressed in the language of differential equations. The weight of that sentence is in "always" — it is not that some phenomena happen to work this way, but that describing change itself naturally takes this form.

The series is framed as a tour: take in the whole landscape first, and dig into details whenever they come up. The route runs through five stops:

1. When differential equations appear (change is easier to describe than amount);
2. How the simplest one is solved (a projectile, integrated twice);
3. What happens when force depends on position (planets, variables pulling on each other);
4. An honest example (the pendulum, whose textbook formula is only an approximation);
5. What to do when nothing can be solved (phase space, vector fields, numerical simulation).

Stop five is the real point. The first four exist to convince you that **being unsolvable is the normal case, not a failure**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Strogatz: physical laws are always written as differential equations |
| 0:44 | Differential equations arise when change is easier to describe than amount |
| 2:13 | The projectile: $y''=-g$, integrated twice into a trajectory |
| 5:50 | The pendulum: the small-angle formula is only an approximation |
| 6:54 | Setting up the pendulum equation $\theta''=-\frac{g}{L}\sin\theta$ |
| 9:39 | Differential equations are genuinely hard to solve |
| 11:37 | The state: two numbers, $\theta$ and $\dot\theta$ |
| 13:25 | Drawing a differential equation as a vector field |
| 22:57 | Numerical solution: simulating with finite steps |
| 25:54 | Chaos as a second limit on prediction |

## When a differential equation is the right tool

There is one test: **change is easier to describe than amount**.

Why a population grows or shrinks is easier to state than why it happens to equal some particular number right now. Why your affection for someone is shifting is easier to state than why it currently sits where it does. Newtonian mechanics is the same story: force determines acceleration, and acceleration is a statement about change.

Two flavours fall out of this:

- **Ordinary differential equations (ODEs)**: the unknown function takes a single input, usually time. The state is a finite collection of values changing with time.
- **Partial differential equations (PDEs)**: the unknown function takes several inputs. The typical image is a whole continuum of values changing together — the temperature at every point of a solid, the velocity of a fluid at every point in space.

This series starts with ODEs and saves PDEs for the next lecture. The single input need not be time, but things changing with time are the prototypical case.

## The simplest example: a projectile

Throw something straight up and ignore air resistance. Gravity near the Earth's surface accelerates it downward at $9.8\ \mathrm{m/s^2}$. Translate that into mathematics by tracking the vertical coordinate $y$: its first derivative is vertical velocity, its second derivative is vertical acceleration, so

$$
\ddot y = -g.
$$

The dot notation keeps things compact: $\dot y$ is the first derivative, $\ddot y$ the second.

This one can be integrated directly. The first integration asks which function has derivative $-g$; the answer is $-gt$ plus a constant, and that constant is the initial velocity:

$$
\dot y = -gt + v_0.
$$

The second integration asks which function has that as its derivative:

$$
y = -\tfrac12 g t^2 + v_0 t + y_0.
$$

Each integration introduces one degree of freedom, pinned down by the initial velocity and the initial position. That is what **initial conditions** do: the differential equation describes a family of functions, and the initial conditions select the single member of that family.

At this point a differential equation has been solved: **a function recovered from information about its rate of change**.

## When force depends on position: from parabolas to planets

The projectile was easy because gravity was treated as constant. Study planets, stars, and moons, and that assumption collapses: the pull between two bodies points along the line joining them, with strength inversely proportional to the square of the distance.

The equation becomes

$$
\ddot{\mathbf r} = \mathbf a(\mathbf r),
$$

acceleration as a function of position. The rate of change of position is velocity, and the rate of change of velocity depends on position — two variables locked in a mutual embrace, like two bodies orbiting each other. The structure of the equation is itself describing that dance.

This is the characteristic difficulty of the subject: **you are looking for a function whose derivatives, even high-order ones, are defined in terms of the function itself**.

Second-order equations dominate physics because Newton's second law produces a second derivative. Third- and fourth-order equations exist too, with "more intricate clues". 3B1B's image for it is apt: meditating on such an equation feels like solving an infinite, continuous jigsaw puzzle — you must find infinitely many numbers, one per instant, constrained by the specific way those values intertwine with their own rate of change, and with the rate of change of that rate of change.

## The pendulum: an honest example

The pendulum is standard fare in introductory physics. Let $\theta$ be the angle from vertical and $L$ the length. The textbook says it oscillates harmonically with period

$$
T = 2\pi\sqrt{\frac{L}{g}}.
$$

**That formula is a lie** — or rather, an approximation valid only for small angles. Measure a real pendulum and you find that pulling it farther out makes the period longer than the formula predicts, and pull it far enough and the graph of $\theta$ against time no longer resembles a sine wave at all.

To see what is actually going on, write the equation down properly.

### Setting up the equation

Mark the bob's position by the arc length $x$. In radians, $x = L\theta$.

Gravity pulls straight down, but the string constrains the motion, so only the component along the direction of motion matters. A small geometry exercise shows that the angle between gravity and the string is also $\theta$. The component along the direction of motion is therefore $-g\sin\theta$, with the minus sign recording that it always points opposite to the displacement:

$$
\ddot x = -g\sin\theta
\quad\Longrightarrow\quad
\ddot\theta = -\frac{g}{L}\sin\theta.
$$

A quick sanity check: at $\theta = 0$, $\sin\theta = 0$, so there is no tangential acceleration at the bottom of the swing; at $\theta = 90°$, $\sin\theta = 1$, and the acceleration matches free fall. Both check out.

### Adding damping

The real world has air resistance. Model it as proportional to velocity:

$$
\ddot\theta = -\frac{g}{L}\sin\theta - \mu\dot\theta,
$$

where $\mu$ bundles air resistance, friction, and anything else that drains energy from the pendulum.

This equation rewards a second look. At first glance you might assume the $\sin$ in the equation produces the sine-shaped swing; the truth is the opposite — **the presence of that $\sin$ is exactly why real pendulums do not swing as sine waves**. In the equation, $\sin$ is a function applied to $\theta$; in the textbook approximation, $\theta$ is the output of a sine.

### The honesty of not solving it

Remove the damping term and an analytic solution barely exists, expressed through functions you have probably never heard of, built out of integrals and inverse integral problems. Put the damping back and no closed form is known at all.

3B1B makes a sharp point here: for any hard problem you can define a new function to be its answer, and even name it after yourself, but that accomplishes nothing unless it buys you computation and understanding.

So the study of differential equations takes a shortcut: since solving is out of reach, skip it and build understanding and computation directly from the equation.

## Phase space: the state as a point

The question is what to hold in your head instead.

Plotting $\theta$ against $t$ and trying to read the interplay of slope, position, and curvature is both hard and not general. A better move is to first draw **every possible state** in a two-dimensional plane.

The state of the pendulum is fully described by two numbers: the angle $\theta$ and the angular velocity $\dot\theta$. Either can change without the other, yet the acceleration is determined entirely by the pair. So every point of the plane describes the pendulum at some instant — you can think of these points as all possible initial conditions.

Know the initial angle and angular velocity, and the future evolution is fixed.

![Phase space of a damped pendulum: angle θ across, angular velocity dθ/dt up, pale arrows forming the vector field, and a red trajectory spiralling inward from θ=2.3 toward the stable origin while θ=π stays unstable](/images/01-phase-space-en.svg)

*Figure: once the state becomes a point, the equation becomes a field of arrows — the trajectory stays tangent to them everywhere, and the inward spiral is energy draining away.*

These diagrams take some getting used to. The inward spiral in the figure is a typical trajectory for the damped pendulum: at the start $\theta$ decreases while $\dot\theta$ (the vertical coordinate) grows more negative, which makes sense — the bob moves fastest as it swings left toward the bottom. One easy confusion to flag: the bob's physical velocity points left, but in this space the magnitude of velocity is always carried by the vertical axis.

It also helps to remember that the state space is abstract, distinct from the physical space where the pendulum swings.

The spiral winds inward because energy leaks to air resistance: each swing has a slightly smaller peak velocity and peak displacement. The point is, in a sense, attracted to the origin, where $\theta = 0$ and $\dot\theta = 0$.

### From second order to first order

Write the state as the vector $(\theta, \dot\theta)$ and differentiate:

$$
\frac{d}{dt}\begin{bmatrix}\theta\\ \dot\theta\end{bmatrix}
=\begin{bmatrix}\dot\theta\\ -\frac{g}{L}\sin\theta-\mu\dot\theta\end{bmatrix}.
$$

The right-hand side is a function of $(\theta,\dot\theta)$ alone. One second-order equation has become **two first-order equations** — the standard trick of the subject: rather than tracking high-order changes of a single quantity, track the first-order change of a vector.

Splitting it also lets you give $\dot\theta$ its own name, making it explicit that two separate quantities are intertwined through their mutual effect on each other's rate of change.

### Vector fields and trajectories

At every point of the plane that derivative vector can be computed and drawn as an arrow attached to the point: a **vector field**.

Its first component is $\dot\theta$, which is just the vertical coordinate — the higher up you are, the more the point drifts right; the lower, the more it drifts left.

Its second component is $\ddot\theta$, which the differential equation expresses entirely in terms of $\theta$ and $\dot\theta$; all the intricacy sits in that vertical component.

When drawing, the arrows are scaled down to avoid clutter, with colour loosely indicating magnitude. This matters because it redefines what a solution is: starting from some initial state, the point moves along a trajectory such that at every instant its velocity matches the field vector at its location.

That "velocity" is not the bob's physical velocity; it is an abstract rate of change encoding both $\theta$ and $\dot\theta$.

Physics can be read straight off the picture: where $\dot\theta$ is large, the arrows send the point travelling right for a long stretch before it settles into a spiral — a pendulum with enough initial angular velocity to rotate several full turns before decaying into back-and-forth swings.

Raise $\mu$ and the trajectories spiral in faster, meaning the pendulum slows sooner. That is obvious when you know $\mu$ is air resistance; it is not at all obvious if you meet the equations out of context. **Having software draw the field is the fastest route to intuition.**

## How general phase space is

Any system of ODEs can be drawn this way, which makes the technique extremely general. The difference is dimensionality, and usually there is a lot more of it.

Take the three-body problem: three masses in three-dimensional space pulling on each other by gravity, with known initial positions and velocities. Each mass carries three position coordinates and three momentum coordinates, so the system has 18 degrees of freedom and an 18-dimensional state space.

3B1B pauses on how strange that is: a single point wandering through an 18-dimensional space we cannot visualize, obediently stepping through time along whatever vector it happens to sit on, fully encoding the positions and momenta of three bodies we watch in ordinary three-dimensional space. Symmetries can reduce the dimension in practice, but more degrees of freedom always means a higher-dimensional state space.

### Two senses of the term

Mathematics calls such a space a **phase space**, and 3B1B uses the term broadly for any space encoding the states of a changing system. In physics, especially Hamiltonian mechanics, the term is often reserved for a more special case: a space whose axes are position and momentum.

A physicist would agree that the 18-dimensional three-body space is a phase space, but might ask for a couple of modifications before granting the pendulum the same title. The lesson is simply that the precise meaning depends on context.

James Gleick, in *Chaos*, calls phase space "one of the most powerful inventions of modern science". Part of that power is that you can ask questions not about one initial condition but about a whole spectrum of them. The collection of all trajectories resembles a flowing fluid, hence **phase flow**.

### Fixed points and stability

The origin corresponds to the pendulum hanging still; the point at $\theta = \pi$ corresponds to it balanced perfectly upright. Both are **fixed points** — states that stay put.

The natural question is whether they are stable: nudge the system slightly, and does it drift back toward the fixed point or away from it?

Physical intuition makes the answer obvious — the bottom is stable, the inverted point is not. But how would you answer from the equations alone, if they turned up in some entirely different and far less intuitive setting? Later lectures show how to compute stability, guided by looking at a small neighbourhood of the fixed point and asking whether the flow there contracts or expands.

## An interlude: the equations of love

Strogatz's column models affection with differential equations. You have been flirting with someone and the reciprocity is maddeningly inconsistent. Your own affection rises when they seem interested and falls when they seem cold — your rate of change of love is proportional to their feelings:

$$
\dot R = aJ.
$$

Your sweetheart is the exact opposite, drawn to you when you seem uninterested and turned off once you seem too keen:

$$
\dot J = -bR.
$$

The phase portrait looks very much like the middle of the pendulum diagram: the two of you cycle endlessly between affection and repulsion. Calling your feelings pendulum swings would not just be a metaphor; it would be mathematically verified.

Add one more term — they pull back when they notice they are falling too hard, say out of a fear of being made vulnerable — and that plays the role of friction in the pendulum. The pair of you are then destined for an inward spiral toward mutual ambivalence.

The point is not the romance. It is that a law of dynamics from physics, with one variable, and one that looks like it comes from chemistry, with two, share a structure that is easiest to recognize in the phase diagram. Even though the equations differ — there is no sine in the romance equations — the phase space exposes the underlying similarity.

Put differently: you are not studying a pendulum. You are studying a class of problems, and the tactics transfer.

## Numerical solution: computing without solving

Phase portraits build understanding, but what about actually computing $\theta(t)$?

The idea is to simulate what the universe does, replacing infinitesimals with finite steps. Standing at a point in phase space, take a step of size $\Delta t$ along the vector beneath you:

$$
\theta \leftarrow \theta + \dot\theta\,\Delta t,\qquad
\dot\theta \leftarrow \dot\theta + \ddot\theta\,\Delta t.
$$

Repeat, and the endpoint approximates $\theta(t)$, where $t$ is the sum of all the steps.

With $\Delta t = 0.5$ the result is grossly inaccurate; drop to $0.01$ and it becomes much better, at the cost of more steps — computing $\theta(10)$ takes 1000 of them. Repeating a simple operation a thousand times is exactly what computers are for:

```python
import math

g, L, mu = 9.8, 1.0, 0.0
dt = 0.01
theta, theta_dot = math.pi / 3, 0.0

for _ in range(1000):
    theta_ddot = -(g / L) * math.sin(theta) - mu * theta_dot
    theta += theta_dot * dt
    theta_dot += theta_ddot * dt

print(theta)
```

This is **solving a differential equation numerically**. Real methods are far more sophisticated, balancing accuracy against efficiency, but this loop carries the basic idea.

## Takeaways

- Differential equations appear wherever change is easier to describe than amount.
- An ODE has one input (usually time); a PDE has several, describing a continuum of values evolving together.
- Integrate when you can: the projectile equation takes two integrations, and the two constants are fixed by initial conditions.
- When force depends on position, position and velocity constrain each other and direct integration fails.
- The pendulum equation $\ddot\theta=-\frac{g}{L}\sin\theta-\mu\dot\theta$ has a closed form only without damping, and that form is hideously complicated; with damping none is known.
- The small-angle formula is an approximation: pull farther and the period grows and the waveform departs from a sine.
- Skipping the solution still leaves plenty to work with: draw states as points in phase space and the equation as a vector field; a solution is a trajectory everywhere tangent to the field.
- A second-order equation can always be split into two first-order equations.
- Phase space generalizes to any dimension: the three-body problem lives in 18.
- Stability of a fixed point can be read from whether the nearby flow contracts or expands.
- Numerical methods approximate trajectories with finite steps: smaller steps, better accuracy, more work.
- Chaos adds a second limit: even with a solution, long-term prediction can fail because tiny errors in initial conditions blow up.

## Check your understanding

**1. Why does the lecture say differential equations appear where change is easier to describe than amount? Use the projectile to explain.**

Reference answer: because the laws of many systems are written in terms of rates of change rather than values at a particular moment. Gravity only says "the acceleration is $-g$"; it says nothing about where the object is or how fast it moves right now. To get an actual trajectory you must add an initial velocity and an initial position. If a law handed you the position directly, no differential equation would be needed. Populations, affection, and planetary motion share this structure: the mechanism explains why things change, not what they currently are.

**2. What is the relationship between the $\sin\theta$ in the pendulum equation and the sine wave of the textbook solution?**

Reference answer: they run in opposite directions. In $\ddot\theta=-\frac{g}{L}\sin\theta$, the sine is a function applied to $\theta$ — $\theta$ is the input. In the approximate solution, $\theta$ varies sinusoidally in time — $\theta$ is the output. It is precisely because the equation contains this nonlinear sine that a real pendulum does not trace a sine wave; only by replacing $\sin\theta$ with $\theta$, valid for small angles, does the harmonic solution appear.

**3. How does a phase-space trajectory relate to the bob's actual motion, and why is the "velocity" in phase space not the bob's velocity?**

Reference answer: the coordinates are $(\theta,\dot\theta)$, so a point is a complete state and the trajectory is the evolution of that state, not the path of the bob through space. The velocity along the trajectory is $\frac{d}{dt}(\theta,\dot\theta)=(\dot\theta,\ddot\theta)$ — an abstract rate of change with one component for the angle and one for the angular velocity. The bob's physical velocity has a single component along the arc; in phase space it appears only as the value of the vertical coordinate, and its direction (left or right) is carried by the sign of that coordinate rather than by the direction of a vector.

**4. Why is the three-body problem 18-dimensional, and can a lower-dimensional space suffice if you only care about positions?**

Reference answer: each body contributes three position coordinates and three momentum coordinates, six in total, and three bodies give eighteen. Momenta are required because Newton's equations are second order: position alone does not determine the future, velocity must be known as well. Dimension can be reduced using conserved quantities (total momentum, angular momentum, energy) and symmetries, but the principle stands — more degrees of freedom means a higher-dimensional state space, and the reduced space is still far beyond three dimensions.

**5. Why does shrinking the numerical step from $0.5$ to $0.01$ improve accuracy, and what does it cost?**

Reference answer: each Euler step extrapolates linearly along the vector at the current point. A large step extrapolates far, over a region where the vector has already changed, so the error is large. A smaller step keeps the linear approximation closer to the true curve and reduces accumulated error. The cost is proportionally more steps: shrinking the step by a factor of fifty requires fifty times as many steps to reach the same $t$. Practical methods trade accuracy against cost, and higher-order schemes such as Runge–Kutta buy more accuracy per step.

## How it connects

This lecture sets the coordinate system for the whole series: **solve when you can, look at phase space when you cannot, simulate when you need numbers**. The next lecture brings in the many-input case with the heat equation as its main character; after that, Fourier series decompose the heat equation into infinitely many simple modes, and the Laplace transform turns differential equations into algebra. The phase space, vector fields, fixed points, and stability introduced here return as the main tools when the series turns to nonlinear systems.
