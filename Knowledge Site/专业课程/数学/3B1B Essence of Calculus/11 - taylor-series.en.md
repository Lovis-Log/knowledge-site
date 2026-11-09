---
slug: "11-taylor-series"
title: "Taylor Series: Imitating a Curve With Polynomials"
summary: "Polynomials are easy to compute, differentiate, and integrate, so they are worth using to imitate other functions. The method aligns value, slope, and curvature one layer at a time: each term matches one order of derivative, and dividing by a factorial cancels the accumulation from repeated differentiation."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [taylor-series, polynomial-approximation, factorial, convergence]
sources:
  - kind: "video"
    title: "Taylor series | Chapter 11, Essence of calculus"
    url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4"
    author: "3Blue1Brown"
    publishedAt: "2017-05-07"
---

## The thread of the lecture

Taylor series are among the most powerful tools mathematics offers, turning up across physics, engineering, and numerical work. But the motivation is modest: **polynomials are easier to handle than other functions**.

Polynomials are easy to compute (add and multiply), easy to differentiate (apply the power rule repeatedly), easy to integrate, and completely predictable. So if a polynomial can imitate a complicated function — even just near one point — a great many problems become tractable.

The question is how to find that polynomial.

The answer is to align layer by layer: first match the **value**, then the **slope**, then the **curvature**, and so on. Each added term matches one more order of derivative.

## Timeline

| Time | Topic |
| --- | --- |
| 0:53 | The physical motive: $1-\cos\theta$ in a pendulum's potential energy |
| 2:11 | Approximating $\cos x$ with $c_0+c_1x+c_2x^2$ |
| 2:45 | The constant term fixes the value: $c_0=1$ |
| 3:46 | The linear term fixes the slope: $c_1=0$ |
| 4:54 | The quadratic term fixes the second derivative: $c_2=-\tfrac12$ |
| 7:27 | The fourth-order term: $c_4=1/24$ |
| 8:30 | Why factorials appear naturally |
| 10:22 | Expanding near another point means powers of $(x-a)$ |
| 15:04 | Explaining the quadratic term with an area and a triangle |
| 19:41 | The series for $\ln x$ converges only on $(0,2]$ |

## A motive from physics

Grant says he first understood Taylor series not in a calculus class but in a physics class.

The problem was a pendulum's potential energy. The height of the bob above its lowest point comes out proportional to $1-\cos\theta$, where $\theta$ is the swing angle. That cosine made the problem awkward and obscured how pendulums relate to other oscillating systems.

But replacing $\cos\theta$ with $1-\dfrac{\theta^2}{2}$ made everything fall into place.

To anyone who has not seen this before, the substitution looks like magic. Plot the two curves and they do hug each other near 0 — but **where would that quadratic come from**?

## Imitating a curve with a polynomial

![cos x plotted with its quadratic, quartic, and eighth-order Taylor polynomials: the dashed curves coincide with cosine near the origin, and the higher the order the wider the overlap, while low-order polynomials peel away sooner](/images/11-taylor-cos-en.svg)

*Figure: higher order hugs the curve further out, but every polynomial eventually departs — a Taylor expansion is a local tool.*

State the goal precisely: among all quadratics of the form

$$
c_0 + c_1 x + c_2 x^2 ,
$$

find the one that most resembles $\cos x$ near $x=0$.

"Most resembles" needs a definition. The one used here: **make the derivatives of both functions agree at $x=0$, as far as possible**.

Why derivatives? Because a function's value, slope, and curvature at a point jointly determine how it behaves nearby. Match more of them and the neighbourhood looks closer.

Three unknown coefficients, three pieces of information.

### Layer one: the value

$\cos 0 = 1$, so the approximation must also equal 1 at $x=0$.

Substituting $x=0$ leaves only the constant term, so

$$
c_0 = 1 .
$$

No choice of $c_1$ or $c_2$ affects this — they multiply $x$ and $x^2$, both of which vanish at 0.

### Layer two: the slope

The derivative of $\cos x$ is $-\sin x$, which is 0 at the origin, so cosine has a horizontal tangent there.

The polynomial's derivative is $c_1 + 2c_2 x$, which equals $c_1$ at $x=0$.

Matching slopes forces

$$
c_1 = 0 .
$$

Notice how $c_1$ alone controls the slope near 0 — a structure worth remembering: **each coefficient governs exactly one order of derivative**.

### Layer three: the curvature

Near 0, $\cos x$ bends downward, so its second derivative is negative. Specifically,

$$
(\cos x)'' = -\cos x,
\qquad
-\cos 0 = -1 .
$$

Differentiate the polynomial twice: once for $c_1+2c_2x$, again for $2c_2$.

So $2c_2 = -1$, giving

$$
c_2 = -\frac{1}{2} .
$$

Putting it together:

$$
\cos x \approx 1 - \frac{x^2}{2} .
$$

Check: $\cos 0.1 = 0.995004\ldots$, while $1 - 0.005 = 0.995$. The error is on the order of one part in a hundred thousand.

### Three degrees of freedom, three jobs

Looking back, each coefficient had a role:

| Coefficient | Responsible for |
| --- | --- |
| $c_0$ | matching the value at $x=0$ |
| $c_1$ | matching the first derivative |
| $c_2$ | matching the second derivative |

That is the entire logic of Taylor polynomials: **spend finitely many degrees of freedom to match finitely many orders**.

## Why factorials appear

To do better, add higher-order terms. Try $c_3x^3$.

The third derivative kills everything of degree two or lower, leaving only the contribution of $c_3x^3$. Differentiate $x^3$ three times and the power rule cascades:

$$
\frac{d^3}{dx^3}x^3 = 3 \cdot 2 \cdot 1 = 6 .
$$

Meanwhile the third derivative of $\cos x$ is $\sin x$, which is 0 at the origin. So $c_3 = 0$.

Which means $1 - x^2/2$ is not merely the best quadratic approximation — it is also the best cubic one.

Now add $c_4x^4$. The fourth derivative of cosine returns to cosine itself, which is 1 at 0. And $x^4$ differentiated four times gives

$$
4 \cdot 3 \cdot 2 \cdot 1 = 24 .
$$

So $24c_4 = 1$, that is

$$
c_4 = \frac{1}{24} = \frac{1}{4!} .
$$

Hence

$$
\cos x \approx 1 - \frac{x^2}{2!} + \frac{x^4}{4!} .
$$

### Where the factorial comes from

Why is the denominator always a factorial? Because differentiating $x^n$ repeatedly drags the exponent down:

$$
x^n \;\to\; n x^{n-1} \;\to\; n(n-1)x^{n-2} \;\to\; \cdots \;\to\; n! .
$$

So the $n$-th derivative of $c_nx^n$ at 0 is $n!\,c_n$, not $c_n$.

To make that equal the target derivative, you must **divide by the factorial** to cancel the accumulation:

$$
c_n = \frac{f^{(n)}(0)}{n!} .
$$

The factorial is not a convention; it is the residue of the power rule applied repeatedly.

### New terms do not disturb old ones

One more point matters: after adding $c_4x^4$, none of the earlier coefficients need adjusting.

Because every matching happens at $x=0$, where any term containing $x$ vanishes. The fourth-order term's contribution to the second derivative is $12c_4x^2$, which is 0 at the origin.

So **each derivative at the expansion point is controlled by exactly one coefficient**. That is what allows the layers to be added from low to high without interfering.

## The general formula

In general, the $n$-th Taylor coefficient of $f$ at $x=0$ is

$$
c_n = \frac{f^{(n)}(0)}{n!},
$$

so

$$
f(x) \approx f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \cdots
$$

Abstract as it looks, each term has a concrete job:

- the constant term matches the **value**;
- the linear term matches the **slope**;
- the quadratic term matches the **rate at which the slope changes**;
- and so on.

More terms mean a better approximation, at the cost of a more complicated polynomial.

### Expanding elsewhere

What if the approximation is wanted near $x=a$ rather than near 0?

Write the polynomial in powers of $(x-a)$ and evaluate all derivatives at $a$:

$$
f(x) \approx f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots
$$

The purpose is to make the point $a$ behave like zero: substituting $x=a$ kills every term containing $(x-a)$, leaving only the constant, so the same layer-by-layer matching works.

The choice of $a$ decides where the approximation hugs the original function.

## A geometric reading of the quadratic term

The loveliest passage in the lecture reinterprets the quadratic term as an area.

Consider an area function $A(x)$: the area under a graph from a fixed left endpoint $a$ to a variable right endpoint $x$.

By the fundamental theorem, the graph itself is $A$'s derivative: $A'(x) = f(x)$.

Now, without taking a limit, ask: how much does the area grow when the right endpoint moves from $a$ to $x$, a finite distance?

The first-order answer is a rectangle: height $f(a)$, width $(x-a)$, area $f(a)(x-a)$.

But the true increase exceeds that rectangle by the piece where the curve rises above it — a shape close to a triangle.

- The triangle's base: $(x-a)$;
- Its height: the slope times the base, $f'(a)(x-a)$;
- And since $f' = A''$, that height is $A''(a)(x-a)$.

Half base times height:

$$
\frac{1}{2}A''(a)(x-a)^2 .
$$

Therefore

$$
A(x) \approx A(a) + A'(a)(x-a) + \frac{1}{2}A''(a)(x-a)^2 .
$$

Which is exactly the first three terms of the Taylor polynomial. **Every term can be pointed at on the diagram**: an area already accumulated, a rectangle, and a triangle.

## Infinitely many terms: series and radius of convergence

What if you never stop?

An infinite sum is called a **series**. Finitely many terms give a Taylor polynomial; all infinitely many give a Taylor series.

Care must be taken, because adding infinitely many things is not literally meaningful — you cannot press the plus button infinitely often.

The workable statement: if adding more terms brings the total closer and closer to some definite value, the series **converges** to it. If you are comfortable extending the meaning of equality to that kind of convergence, you may say the series **equals** that value.

### The case of $e^x$

$e^x$ is its own derivative, so every derivative at 0 equals 1. Hence

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

Plug in $x=1$ and the partial sums approach $e$. Plug in $x=2$ and they approach $e^2$.

And this holds for **every** $x$, however far from 0 — even though the series was built from derivative information at 0 alone. $e^x$ equals its own Taylor series on the whole real line.

$\sin$ and $\cos$ share the property.

### Radius of convergence

Not every function is so generous.

Expand $\ln x$ around $x=1$:

$$
\ln x = (x-1) - \frac{(x-1)^2}{2} + \frac{(x-1)^3}{3} - \cdots
$$

For $x$ inside $(0, 2]$, adding terms does approach $\ln x$.

Step outside that range even slightly and the series fails: with more terms the partial sums bounce wildly between two directions and approach nothing — even though $\ln x$ is perfectly well defined there.

In other words, **derivative information gathered at $x=1$ does not propagate that far**.

The largest distance over which it does propagate is called the **radius of convergence**. Beyond it, the series diverges.

## What this lecture establishes

- Taylor series approximate non-polynomial functions with polynomials near a point, because polynomials are easy to compute, differentiate, and integrate.
- The construction matches layer by layer: constant term for value, linear for slope, quadratic for second derivative, and so on.
- Near 0, $\cos x \approx 1 - x^2/2$; adding the fourth-order term gives $1 - x^2/2! + x^4/4!$.
- Coefficients are divided by factorials because the $n$-th derivative of $x^n$ is $n!$, cancelling the accumulation of repeated differentiation.
- Adding higher-order terms leaves lower coefficients untouched, since terms containing $x$ vanish at the expansion point.
- In general $c_n = f^{(n)}(a)/n!$, with the polynomial written in powers of $(x-a)$.
- The quadratic term has a geometric reading: it is the triangle beyond the rectangle, $\tfrac12 A''(a)(x-a)^2$.
- Infinitely many terms form a Taylor series, which approaches the function only inside its radius of convergence.
- The series for $e^x$, $\sin$, and $\cos$ converge everywhere; the series for $\ln x$ around $x=1$ converges only on $(0,2]$.

## Check your understanding

**1. Why use "matching derivatives" to define "most alike"?**

Answer: because a function's behaviour near a point is determined order by order — its value sets the starting height, its slope sets the direction, its second derivative sets how that direction itself changes. Matching through order $n$ means the first $n$ orders of local behaviour agree, so the deviation near the expansion point is of higher order. It also balances the books: a polynomial with $n+1$ coefficients has exactly $n+1$ conditions to satisfy.

**2. Why divide coefficients by factorials? What goes wrong otherwise?**

Answer: because differentiating $x^n$ $n$ times leaves $n!$, not 1. Setting the coefficient equal to the target derivative would make that term contribute $n!$ times too much, and the match would fail. Dividing by $n!$ cancels the factor: the $n$-th derivative of $c_nx^n$ at 0 is $c_n \cdot n!$, so choosing $c_n = f^{(n)}(0)/n!$ yields exactly $f^{(n)}(0)$. The factorial is an unavoidable product of the power rule.

**3. Why does adding an $x^4$ term leave the $x^2$ coefficient unchanged?**

Answer: because all matching happens at $x=0$. The $x^4$ term and its derivatives either still contain powers of $x$ at the origin (when differentiated fewer than four times) or contribute only to derivatives of order four and above. Its contribution to the second derivative is $12c_4x^2$, which is 0 at $x=0$. Hence each derivative at the expansion point is governed solely by its own term, and the layers can be stacked without interference.

**4. In the area interpretation, where does the triangle come from?**

Answer: pushing the right endpoint from $a$ to $x$, the first-order estimate counts only a rectangle of height $f(a)$. But the curve has a slope at $a$, so it rises (or falls) away from the rectangle, leaving an extra (or missing) region above (or below) it. That region is bounded by the curve, the rectangle's top, and the vertical line at $x=a$; it is approximately a triangle with base $x-a$ and height equal to slope times base, $f'(a)(x-a)$. Since $f' = A''$, its area is $\tfrac12 A''(a)(x-a)^2$ — precisely the quadratic Taylor term.

**5. Why does the series for $\ln x$ around $x=1$ work only on $(0,2]$, while the series for $e^x$ works everywhere?**

Answer: this depends on the function, not on the construction. $\ln x$ is undefined at $x=0$ (it tends to minus infinity), and that singularity sits a distance 1 from the expansion point $x=1$; the radius of convergence equals exactly that distance, so the series converges only for $\lvert x-1\rvert<1$, i.e. on $(0,2)$ (at the endpoint $x=2$ the alternating series happens to converge as well). $e^x$ has no singularity anywhere in the complex plane, so its radius is infinite. Complex analysis explains the general rule: the radius of convergence equals the distance from the expansion point to the nearest singularity.
