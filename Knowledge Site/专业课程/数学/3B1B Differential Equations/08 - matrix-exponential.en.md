---
slug: "08-matrix-exponential"
title: "Matrix Exponentials: Raising e to a Matrix"
summary: "e^{Mt} is not repeated multiplication but a matrix substituted into the Taylor series. It turns out to be the solution operator for dx/dt = Mx: apply it to an initial vector and you get the state at time t. For a rotation matrix, both the series and the geometry give a rotation matrix."
updatedAt: "2026-11-08"
content_type: "video-course"
categories: [mathematics]
tags: [matrix-exponential, linear-systems, rotation, vector-field]
sources:
  - kind: "video"
    title: "How (and why) to raise e to the power of a matrix | DE6"
    url: "https://www.youtube.com/watch?v=O85OWBJ2ayo"
    author: "3Blue1Brown"
    publishedAt: "2021-04-01"
---

## The thread of the lecture

An old differential equations textbook contains an odd exercise: compute $e^{At}$, where $A$ is a matrix — with the clear implication that the answer is also a matrix.

Out of context, putting a matrix into an exponent looks like nonsense. But it names a genuinely beautiful operation, and it appears in that textbook because it is useful: it solves an important class of differential equations.

Three questions drive the lecture:

1. What is the operation actually defined to be?
2. Why does it solve $\dot{\mathbf x}=M\mathbf x$?
3. Is there a way to **see** what it does?

The answer to the third is vector fields and flow, and it is the most rewarding part.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | A textbook exercise: compute $e^{At}$ |
| 4:20 | Example: an off-diagonal matrix gives minus the identity |
| 6:43 | Romeo and Juliet: two feelings pulling on each other |
| 10:34 | That matrix is a 90-degree rotation |
| 11:42 | The geometric solution: velocity perpendicular to position means a circle |
| 13:46 | Schrödinger's equation: the same form, with $i$ playing the rotation |
| 17:43 | Computing the rotation matrix's exponential from the series |
| 18:58 | The entries are exactly the sine and cosine series |
| 22:11 | Vector fields: attach $M\mathbf v$ to each point |
| 25:16 | Why it really solves the equation: differentiate term by term |

## An apparently absurd notation

First, a clarification: $e^{At}$ is **not** the constant $e$ multiplied by itself repeatedly. That would be nonsense.

The real definition comes from the Taylor series for $e^x$:

$$
e^{X}=I+X+\frac{X^2}{2!}+\frac{X^3}{3!}+\cdots
=\sum_{n=0}^{\infty}\frac{X^n}{n!}.
$$

For a real number $x$ this is a theorem; for a matrix it **is the definition**. One could call it an abuse of notation, or more charitably an instance of the cycle between discovery and invention.

### Why it must be square

Only when the number of rows equals the number of columns can a matrix multiply itself, so that $X^2$, $X^3$ make sense. Matrix powers are repeated multiplication, exactly as with numbers.

Scaling a matrix and adding matrices are done entry by entry, so every term in the series is meaningful. Whether the infinite sum converges is deferred — a striking example comes shortly.

### A striking example

Take

$$
A=\begin{bmatrix}0 & -\pi\\ \pi & 0\end{bmatrix}.
$$

Term by term: the first is the identity $I$ (that is what the zeroth power means), the second is $A$, the third is $A^2/2$, and so on. Let a computer keep adding and the sum settles near $-I$:

$$
e^{A}=-I.
$$

Anyone familiar with Euler's identity recognizes this at once: it is the matrix version of $e^{i\pi}=-1$.

## From Romeo and Juliet to linear systems

Their feelings pull on each other:

- Juliet's rate of change is **minus** Romeo's feeling — she warms when he seems cool, cools when he dotes;
- Romeo is the opposite: his rate of change equals her feeling.

As equations:

$$
\dot x=-y,\qquad \dot y=x .
$$

Both equations hold at every instant, so any small change in one immediately affects the other's rate of change.

### Writing it as a matrix

Pack the two feelings into a state vector:

$$
\frac{d}{dt}\begin{bmatrix}x\\ y\end{bmatrix}
=\begin{bmatrix}0 & -1\\ 1 & 0\end{bmatrix}
\begin{bmatrix}x\\ y\end{bmatrix}.
$$

The top row encodes Juliet's rule, the bottom row Romeo's. The shape is uniform: **the rate of change of the state equals a matrix times the state itself**.

### The geometric solution: a 90-degree rotation

That matrix is a 90-degree rotation — read it from its columns: it sends $\begin{bmatrix}1\\0\end{bmatrix}$ to $\begin{bmatrix}0\\1\end{bmatrix}$ and $\begin{bmatrix}0\\1\end{bmatrix}$ to $\begin{bmatrix}-1\\0\end{bmatrix}$.

So the equation says: wherever the couple sits in state space, **the velocity is the position rotated by 90 degrees**.

Velocity always perpendicular to position means the length cannot change, so the motion is confined to a circle about the origin. And since the velocity has the same length as the position, each unit of time covers one radius of arc — one radian per unit time, a full turn in $2\pi$.

In matrix form, the general rotation:

$$
R(t)=\begin{bmatrix}\cos t & -\sin t\\ \sin t & \cos t\end{bmatrix},
$$

which rotates any initial state by $t$ radians.

## General linear systems

Can the system be solved without knowing the coefficients — for **any** matrix? Asking that question amounts to rediscovering matrix exponentials.

$$
\frac{d\mathbf x}{dt}=M\mathbf x .
$$

### The one-dimensional case: an exponential acting on an initial value

Start with $\dot x=rx$. Larger values grow faster, producing an ever-steepening curve.

The pattern — rate proportional to the value — is everywhere: compound interest, early population growth, the early phase of an epidemic.

Everyone learns that $\frac{d}{dt}e^{rt}=re^{rt}$, but the better reading is that **the equation has many solutions, one per initial value**:

$$
x(t)=x_0e^{rt}.
$$

$e^{rt}$ is only the solution with initial value $1$; multiplying by any initial value still solves the equation, since $e^0=1$.

Here is the conceptual shift: **do not think of the exponential part as the solution, but as the thing that acts on an initial condition to produce one**.

### The matrix case: $e^{Mt}$ is a matrix

In two dimensions the state is a vector and the rate is constrained by a matrix. The shape of the solution is unchanged — an exponential acting on an initial value — except that the exponential is now a **time-varying matrix** and the initial value is a vector:

$$
\mathbf x(t)=e^{Mt}\mathbf x_0 .
$$

The definition of the matrix exponential is largely forced by the wish to make this true.

## Two roads to the same answer

For the rotation matrix $M=\begin{bmatrix}0&-1\\1&0\end{bmatrix}$, compute $e^{Mt}$ from the definition by substituting $Mt$ into the series.

Because $M$ is a 90-degree rotation, its powers cycle every four steps:

$$
M^2=-I,\quad M^3=-M,\quad M^4=I,\quad\cdots
$$

So every term is a polynomial in $t$ whose coefficients cycle, divided by the matching factorial. Anyone fluent with Taylor series recognizes the result:

$$
e^{Mt}
=\begin{bmatrix}
1-\frac{t^2}{2!}+\cdots & -t+\frac{t^3}{3!}-\cdots\\[4pt]
t-\frac{t^3}{3!}+\cdots & 1-\frac{t^2}{2!}+\cdots
\end{bmatrix}
=\begin{bmatrix}\cos t & -\sin t\\ \sin t & \cos t\end{bmatrix}.
$$

The diagonal entries are the cosine series, the off-diagonal ones the sine series with signs.

**Two completely different lines of reasoning deliver the same matrix**: grinding through the series, and observing that velocity perpendicular to position forces circular motion. The agreement is both reassuring and striking — the two modes of thought could hardly be more different.

The matrix $A$ in the opening example equals $\pi M$. Setting $t=\pi$ in $e^{Mt}$ gives $e^A=-I$, a 180-degree turn.

## Isomorphic to Euler's formula

The example is perfectly isomorphic to imaginary exponents.

The whole Romeo and Juliet system could be packaged into a single complex number whose rate of change is $i$ times itself, since multiplying by $i$ is also a 90-degree rotation. The same analytic and geometric reasoning would produce "e^{it} describes rotation".

The pattern recurs across mathematics and physics: quaternions, many matrices in quantum mechanics. The general picture is:

> Take an operation that rotates by 90 degrees in some plane, multiply it by time, and exponentiate: what you get generates all rotations in that same plane.

Schrödinger's equation is a more elaborate variation. It too has the form "rate of change of the state equals a matrix times the state", and the matrix is of a kind that makes the equation describe a rotation — usually in a function space. The impish $i$ sitting in that fundamental equation plays essentially the same role as the matrix in the Romeo example: it says the rate of change is perpendicular to the state, so the evolution must oscillate.

## Seeing it as flow

Matrix exponentials do far more than rotate.

Any such equation can be visualized with a vector field: at every point $\mathbf v$ attach the vector $M\mathbf v$, indicating the velocity a state must have if it passes through that point.

Given an initial condition, let it flow along the field, its velocity always matching the vector beneath it. That trajectory is the solution.

So $e^{Mt}$ acquires a concrete meaning: **flow every possible initial condition forward for time $t$, and the map from start to finish is $e^{Mt}$**.

For the rotation matrix the field circles the origin, and the flow is circular — consistent with everything above.

![Left: the vector field of the rotation matrix with circular trajectories. Right: the field of a saddle matrix, diverging along one diagonal and decaying along the other](/images/08-flow-en.svg)

*Figure: one equation, different fields, different fates — rotation or stretching is decided entirely by the matrix.*

### A second example: a saddle

Try a more Shakespearean pair of equations, symmetric, each carried away by the other's feelings:

$$
M=\begin{bmatrix}0.6 & 1\\ 1 & 0.6\end{bmatrix}.
$$

This matrix has one positive and one negative eigenvalue. Along one diagonal the feelings feed each other and both run to infinity; along the other they cancel and decay to zero.

So even without computing the exponential, the outcome is predictable: $e^{Mt}$ should stretch along one direction and squeeze along the other, ever more extremely as $t$ grows.

## Why it really solves the equation

Write out the series for $e^{Mt}$ and multiply by the initial vector on the right:

$$
\mathbf x(t)=\left(I+Mt+\frac{M^2t^2}{2!}+\frac{M^3t^3}{3!}+\cdots\right)\mathbf x_0 .
$$

Differentiate with respect to $t$. Since $M$ is constant, the power rule applies to the powers of $t$:

$$
\dot{\mathbf x}=\left(M+M^2t+\frac{M^3t^2}{2!}+\cdots\right)\mathbf x_0 .
$$

The power rule cancels the factorials neatly, and every term carries an extra $M$ that factors out on the left:

$$
\dot{\mathbf x}=M\left(I+Mt+\frac{M^2t^2}{2!}+\cdots\right)\mathbf x_0=M\mathbf x .
$$

So it does satisfy the equation. (Convergence is the detail swept under the rug, but the main idea is here.)

## Takeaways

- $e^{Mt}$ is defined by substituting a matrix into the Taylor series for $e^x$, not by repeated multiplication.
- Only square matrices have powers, so only they fit the definition.
- $e^{Mt}$ acts on an initial vector to give the solution of $\dot{\mathbf x}=M\mathbf x$: $\mathbf x(t)=e^{Mt}\mathbf x_0$.
- The Romeo and Juliet system corresponds to a 90-degree rotation; its solution is a rotation matrix and its trajectories are circles.
- Computing that exponential from the series yields the cosine-and-sine rotation matrix, matching the geometric argument.
- For $A=\pi M$, $e^A=-I$, the matrix analogue of $e^{i\pi}=-1$.
- In general, exponentiating "a 90-degree rotation in some plane" times time generates all rotations in that plane.
- Vector fields make it visual: attach $M\mathbf v$ at each point, and $e^{Mt}$ flows every initial condition forward by $t$.
- A symmetric matrix gives a saddle: stretching along one direction, squeezing along the other.
- Differentiating the series term by term confirms that $e^{Mt}$ solves the equation.

## Check your understanding

**1. Why is the matrix exponential defined only for square matrices?**

Reference answer: the definition rests on powers $M^2,M^3,\dots$, and the product $AB$ is defined only when the number of columns of $A$ equals the number of rows of $B$. For $M$ to multiply itself, it must have as many rows as columns. The constant term of the series is also the identity matrix $I$, which again presupposes a square shape.

**2. How does $e^{Mt}$ relate to the scalar $e^{rt}$, and why insist that the exponential is not "the solution"?**

Reference answer: in one dimension $M$ reduces to a scalar $r$ and $e^{Mt}$ becomes $e^{rt}$. But $e^{rt}$ is only the solution with initial value $1$; the general solution is $x_0e^{rt}$, so the exponential acts as an operator carrying an initial value to a solution. The matrix case makes this plain: $e^{Mt}$ is a matrix and must be applied to a vector $\mathbf x_0$ before it produces a trajectory.

**3. Geometrically, why does $\dot{\mathbf x}=M\mathbf x$ with a 90-degree rotation matrix produce circular motion?**

Reference answer: the equation demands that velocity be the position rotated by 90 degrees, hence perpendicular to it. The rate of change of the squared length is twice the dot product of position and velocity, which vanishes when they are perpendicular, so the length is constant and the path lies on a circle about the origin. Rotation preserves length, so the speed equals the distance from the origin, giving constant arc-length rate: uniform circular motion at one radian per unit time.

**4. Why do powers of the matrix cycle every four steps when computing $e^{Mt}$?**

Reference answer: because $M$ represents a 90-degree rotation, and four successive applications restore the original state, so $M^4=I$. Then $M^2=-I$, $M^3=-M$, $M^4=I$, and the pattern repeats. Even powers collect into multiples of $I$ and odd powers into multiples of $M$, producing the Taylor series of $\cos t$ and $\sin t$ respectively, which together give the rotation matrix.

**5. In the flow picture, what does $e^{Mt}$ mean, and why does the saddle example stretch in one direction and squeeze in another?**

Reference answer: drawing $M\mathbf v$ at every point gives a velocity field, and $e^{Mt}$ is the map obtained by flowing each initial point along that field for time $t$. A saddle matrix has one positive and one negative eigenvalue: along the positive eigenvector, velocity points the same way as position, so the point accelerates outward (stretch); along the negative eigenvector, velocity opposes position, so it slows and approaches zero (squeeze). The net effect is expansion along one direction and contraction along the other.

## How it connects

This lecture pushes the exponential from numbers to matrices and closes the arc: from phase space and vector fields, through the heat equation and Fourier series, to the Laplace transform, and finally to the unified form "linear system = matrix exponential". The natural next step is eigenvalues and eigenvectors, which decompose a matrix exponential into pure scalings along eigen-directions, turning the computation from grinding out a series into changing coordinates and exponentiating scalars. The wilder idea of exponentiating a differential operator leads on to general operator theory.
