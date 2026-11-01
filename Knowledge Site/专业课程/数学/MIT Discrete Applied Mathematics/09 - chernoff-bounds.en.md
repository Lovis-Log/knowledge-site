---
slug: 09-chernoff-bounds
title: "Chernoff bounds via exponential moments"
summary: "An exponential change of variable turns a deviation event into one about a non-negative variable; Markov plus mutual independence factorises the moment-generating function into a product. The result is an exponentially small upper tail, lower tail and combined bound for sums of independent Bernoullis."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [probability, chernoff-bound, concentration, independence]
sources:
  - kind: video
    title: "Lecture 9: Chernoff Bounds"
    url: https://www.youtube.com/watch?v=FPj3OOM6DEc
    author: "Ankur Moitra, MIT OpenCourseWare"
    publishedAt: 2025-12-18
---

## What this lecture is for

The previous lecture bounded the failure probability of a randomized algorithm by $18/n$ using Chebyshev. Driving that below $10^{-10}$ requires $10^{11}$ repetitions — infeasible in practice.

The trouble is information: Chebyshev uses only the variance. This lecture uses **all moments**, upgrading tail decay from $1/n$ to $e^{-cn}$. Three ingredients:

1. An exponential change of variable, turning " $X$ is large" into " $e^{bX}$ is large" and thereby producing a non-negative random variable;
2. The moment-generating function $\mathbb E[e^{bX}]$, whose Taylor expansion encodes every moment;
3. Mutual independence, which factorises the moment-generating function of a sum.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recap of Markov and Chebyshev; why a stronger bound is needed |
| 2:13 | Upper tail, lower tail and combined form |
| 6:41 | Proof strategy: event equivalence plus exponentiation |
| 11:53 | Applying Markov yields the moment-generating function |
| 13:23 | Definition of the MGF and recovering moments |
| 19:44 | Lemma 1: the MGF of an independent sum is a product |
| 23:37 | Lemma 2: an upper bound for Bernoulli MGFs |
| 28:34 | Choosing $a$ and $b$, assembling the pieces |
| 33:43 | Lemma 3: the final algebraic estimate |
| 37:53 | How the proof is organised, and why that matters pedagogically |
| 47:13 | Limits of the bound: mutual independence, 2008 and CMOs |

## The three forms

Let $X_1,\dots,X_n$ be mutually independent, $X_i\in\{0,1\}$ with $\mathbb P(X_i=1)=p_i$, and

$$
X=\sum_{i=1}^{n}X_i,\qquad \mu=\mathbb E[X]=\sum_{i=1}^{n}p_i .
$$

### Upper tail

For every $\delta>0$,

$$
\mathbb P\big(X\ge(1+\delta)\mu\big)
\le\left(\frac{e^{\delta}}{(1+\delta)^{1+\delta}}\right)^{\mu}.
$$

### Lower tail

For $0<\delta<1$,

$$
\mathbb P\big(X\le(1-\delta)\mu\big)
\le\left(\frac{e^{-\delta}}{(1-\delta)^{1-\delta}}\right)^{\mu}.
$$

### Combined

For $0<\delta<1$, adding the two bounds gives

$$
\mathbb P\big(|X-\mu|\ge\delta\mu\big)\le2e^{-\mu\delta^2/3}.
$$

The combined form trades the precise dependence on $\delta$ for a memorable, easily quoted expression. All three say the same thing: **the failure probability decays exponentially in $\mu$, hence in $n$**.

Note that $\mu$ must be positive. If $\mu=0$ all $p_i$ vanish and the statement is trivial; if the variables can be negative one must shift and scale, which changes the constants in the exponent.

## The architecture of the proof

The proof is assembled from three lemmas, each doing one job. That organisation is itself part of the lesson: build the skeleton first, fill in the computation afterwards.

### Step one: the same event

Fix $a$ and take $b>0$. Since $t\mapsto e^{bt}$ is strictly increasing,

$$
\{X\ge a\}=\{e^{bX}\ge e^{ba}\}.
$$

The two events coincide, so their probabilities agree. This plays the role that squaring played in Chebyshev: replace a possibly negative quantity by a non-negative one without changing the event. The difference is that here the replacement is exponential rather than quadratic.

### Step two: Markov on $Y=e^{bX}$

Since $Y\ge0$, Markov applies:

$$
\mathbb P(X\ge a)=\mathbb P\big(Y\ge e^{ba}\big)
\le\frac{\mathbb E[e^{bX}]}{e^{ba}} .
$$

The numerator is the **moment-generating function**.

### The moment-generating function

Define

$$
M_X(b)=\mathbb E\big[e^{bX}\big].
$$

Expanding the exponential,

$$
e^{bX}=1+bX+\frac{b^2X^2}{2!}+\frac{b^3X^3}{3!}+\cdots,
$$

and using linearity,

$$
M_X(b)=\sum_{i\ge0}\frac{b^i}{i!}\mathbb E[X^i].
$$

So the coefficients in $b$ record the moments: the linear coefficient is $\mathbb E[X]$, the quadratic coefficient is $\mathbb E[X^2]/2!$, and so on. Differentiating at zero recovers them:

$$
M_X'(0)=\mathbb E[X],\qquad M_X''(0)=\mathbb E[X^2].
$$

This is the same device as the combinatorial generating function, with $b^i$ coefficients recording moments instead of counts. **The Chernoff bound beats Chebyshev because it uses every moment at once rather than only the first two.**

### Lemma 1: the MGF of an independent sum is a product

If $X_1,\dots,X_n$ are **mutually independent**, then

$$
M_X(b)=\prod_{i=1}^{n}M_{X_i}(b).
$$

**Proof.** By definition,

$$
M_X(b)=\mathbb E\Big[e^{b\sum_iX_i}\Big]=\mathbb E\Big[\prod_{i=1}^{n}e^{bX_i}\Big].
$$

Functions of independent variables remain independent, so the expectation of the product is the product of the expectations:

$$
\mathbb E\Big[\prod_{i=1}^{n}e^{bX_i}\Big]=\prod_{i=1}^{n}\mathbb E\big[e^{bX_i}\big]=\prod_{i=1}^{n}M_{X_i}(b). \qquad\square
$$

**Mutual independence is essential; pairwise independence is not enough.** Splitting the expectation of a product of $n$ factors requires joint independence of the whole family; pairwise independence only lets you split two factors at a time.

### Lemma 2: Bernoulli MGFs

If $X_i\in\{0,1\}$ with $\mathbb P(X_i=1)=p_i$, then

$$
M_{X_i}(b)=1+p_i(e^b-1)\le e^{\,p_i(e^b-1)} .
$$

**Proof.** Compute the expectation over the two values:

$$
M_{X_i}(b)=p_i\,e^{b}+(1-p_i)\cdot e^{0}
=1+p_i(e^b-1).
$$

Then use the inequality

$$
1+y\le e^{y},
$$

valid for every real $y$, with $y=p_i(e^b-1)$, giving $1+p_i(e^b-1)\le e^{p_i(e^b-1)}$. $\square$

Geometrically, the line $1+y$ lies below the exponential curve and touches it at $y=0$. The step converts "one plus something" into a pure exponential so that, on multiplying, the exponents add and $\sum_ip_i=\mu$ emerges.

### Assembling

Chain the three steps:

$$
\mathbb P(X\ge a)
\le\frac{\mathbb E[e^{bX}]}{e^{ba}}
=\frac{\prod_{i=1}^{n}M_{X_i}(b)}{e^{ba}}
\le\frac{\prod_{i=1}^{n}e^{p_i(e^b-1)}}{e^{ba}}
=\frac{e^{\mu(e^b-1)}}{e^{ba}} .
$$

Now choose the parameters. For the upper tail take

$$
a=(1+\delta)\mu,\qquad b=\ln(1+\delta),
$$

so that $e^b-1=\delta$. The numerator becomes $e^{\delta\mu}$ and the denominator $e^{ba}=(1+\delta)^{(1+\delta)\mu}$:

$$
\mathbb P\big(X\ge(1+\delta)\mu\big)
\le\frac{e^{\delta\mu}}{(1+\delta)^{(1+\delta)\mu}}
=\left[\frac{e^{\delta}}{(1+\delta)^{1+\delta}}\right]^{\mu}.
$$

The choice of $b$ is not a guess: keep $b$ free, differentiate the right side and minimise; the optimum is $b=\ln(1+\delta)$.

### Lemma 3: squeezing into an exponential

We must bound

$$
L=\left[\frac{e^{\delta}}{(1+\delta)^{1+\delta}}\right]^{\mu}.
$$

Take logarithms:

$$
\ln L=\mu\big[\delta-(1+\delta)\ln(1+\delta)\big].
$$

Use the inequality, valid for $x>0$,

$$
\ln(1+x)\ge\frac{2x}{2+x}.
$$

It follows from the Taylor expansion of $\ln(1+x)$ — the linear term is $x$, and the rest must be controlled by a bound that does not change sign; calculus or a plot confirms it.

Substituting $x=\delta$:

$$
\delta-(1+\delta)\ln(1+\delta)
\le\delta-(1+\delta)\cdot\frac{2\delta}{2+\delta}
=\delta\cdot\frac{(2+\delta)-2(1+\delta)}{2+\delta}
=\delta\cdot\frac{-\delta}{2+\delta}
=-\frac{\delta^2}{2+\delta}.
$$

Therefore

$$
\ln L\le-\frac{\mu\delta^2}{2+\delta}\le-\frac{\mu\delta^2}{3}\quad(0<\delta\le1),
$$

since $2+\delta\le3$. Hence

$$
\mathbb P\big(X\ge(1+\delta)\mu\big)\le e^{-\mu\delta^2/3}.
$$

That is the upper tail. $\square$

## The lower tail

The proof runs in parallel: take $a=(1-\delta)\mu$ and $b=\ln(1-\delta)<0$. The exponential is then decreasing, so the event flips direction, and the computation yields

$$
\mathbb P\big(X\le(1-\delta)\mu\big)
\le e^{-\mu\delta^2/2}\le e^{-\mu\delta^2/3}.
$$

Adding upper and lower tails gives the combined bound

$$
\mathbb P\big(|X-\mu|\ge\delta\mu\big)\le2e^{-\mu\delta^2/3}.
$$

The details are in the course notes; the structure matches the upper tail, with the constant $2+\delta$ replaced by $2$.

## Application: from polynomial to logarithmic repetition

Return to the randomized algorithm. Each run is correct with probability $2/3$, so $p_i=2/3$ and $\mu=2n/3$. Failure means the average drops below $1/2$, a deviation of $1/6=\frac14\mu$; thus $\delta=1/4$. The combined bound gives

$$
\mathbb P(\text{failure})\le2e^{-\mu\delta^2/3}
=2\exp\!\left(-\frac{2n}{3}\cdot\frac{1}{16}\cdot\frac13\right)
=2e^{-n/72}.
$$

To push the failure probability below $\varepsilon$, it suffices that

$$
n\ge72\ln\frac{2}{\varepsilon}.
$$

Compare Chebyshev's $n\approx18/\varepsilon$: for $\varepsilon=10^{-10}$ the former needs about $1.8\times10^{11}$ runs, the latter about $1.7\times10^{3}$ — eight orders of magnitude apart.

This is why randomized primality testing is practical: thousands of repetitions, not hundreds of billions. **Exponential tails are what turn "theoretically possible" into "practically possible".**

## Why the proof is organised this way

After finishing, the lecturer discusses presentation, and the points are worth recording:

- **Split into lemmas.** The whole proof becomes an architecture diagram plus three lemmas, letting a reader see the skeleton first and verify details afterwards. A linear "proof begins — proof ends" style leaves the reader without direction.
- **The MGF is not strictly necessary.** Formally one only needs to write $\mathbb E[e^{bX}]$ and factor it by independence. Naming and explaining it is **demystification**: why exponentiate rather than use some other function? Because the exponential's Taylor coefficients record all moments, and all moments are what the proof needs.
- **Connect to what was already taught.** The course had just covered combinatorial generating functions; the MGF is the same language, and the lecturer deliberately links them.

These are choices about exposition, not correctness, yet they decide whether a reader actually understands.

## When the bound does not apply: 2008 and CMOs

The Chernoff bound is powerful, and all of its power comes from **mutual independence**. Forget that, and the conclusions fail catastrophically.

The lecturer recounts the 2008 financial crisis. Subprime mortgages were bundled into collateralised mortgage obligations and sliced into tranches by a waterfall structure: the bottom tranche absorbs the first defaults, while the top tranche loses only if a large fraction defaults at once.

If each mortgage defaulted independently with probability $10\%$, the chance that $40\%$ default simultaneously would be exponentially small by the upper-tail bound, so the top tranche looked extremely safe — and pension funds, restricted to safe assets, bought it.

The flaw: **defaults are not independent.** In a downturn borrowers lose income simultaneously, so defaults are strongly correlated. The Chernoff bound does not apply, and assets rated safer than US Treasury bonds collapsed.

The lesson is not that the bound is wrong, but that **knowing when a tool fails is as important as knowing how to use it.**

## What this lecture establishes

- Upper tail: $\mathbb P(X\ge(1+\delta)\mu)\le\left(\frac{e^\delta}{(1+\delta)^{1+\delta}}\right)^\mu$.
- Lower tail: $\mathbb P(X\le(1-\delta)\mu)\le\left(\frac{e^{-\delta}}{(1-\delta)^{1-\delta}}\right)^\mu$ for $0<\delta<1$.
- Combined: $\mathbb P(|X-\mu|\ge\delta\mu)\le2e^{-\mu\delta^2/3}$.
- The proof has three parts: event equivalence $\{X\ge a\}=\{e^{bX}\ge e^{ba}\}$; Markov giving $\mathbb E[e^{bX}]/e^{ba}$; mutual independence factorising the MGF.
- Key inequalities: $1+y\le e^y$ and $\ln(1+x)\ge\frac{2x}{2+x}$.
- Consequence: repetitions drop from $O(1/\varepsilon)$ to $O(\log(1/\varepsilon))$.
- The hypothesis is mutual independence; where it fails (correlated defaults in 2008), the bound says nothing.

## Comprehension check

**1. Why is $\{X\ge a\}=\{e^{bX}\ge e^{ba}\}$? Where is $b>0$ used?**

Reference answer: For $b>0$ the map $t\mapsto e^{bt}$ is strictly increasing, so $X\ge a$ holds exactly when $e^{bX}\ge e^{ba}$; the events coincide. If $b<0$ the exponential is decreasing and $X\ge a$ would be equivalent to $e^{bX}\le e^{ba}$, reversing the inequality; if $b=0$ both sides are constantly $1$ and the event degenerates. Keeping the direction of the inequality is precisely what $b>0$ buys.

**2. Prove Lemma 1: for mutually independent variables, $M_X(b)=\prod_iM_{X_i}(b)$. Why is pairwise independence insufficient?**

Reference answer:
$M_X(b)=\mathbb E[e^{b\sum_iX_i}]=\mathbb E[\prod_ie^{bX_i}]$. Mutual independence makes $e^{bX_1},\dots,e^{bX_n}$ mutually independent, so the expectation of the product equals the product of the expectations, giving $\prod_i\mathbb E[e^{bX_i}]$. Splitting the expectation of a product of $n$ factors requires joint independence of the whole family; pairwise independence only splits two factors at a time and cannot handle products of three or more.

**3. Prove Lemma 2 and explain the role of $1+y\le e^y$.**

Reference answer: $M_{X_i}(b)=p_ie^b+(1-p_i)=1+p_i(e^b-1)$. With $y=p_i(e^b-1)$, the inequality gives $M_{X_i}(b)\le e^{p_i(e^b-1)}$. Its role is to turn "one plus a positive quantity" into a pure exponential, so that when the factors multiply the exponents add and $\sum_ip_i=\mu$ appears. Stopping at $1+p_i(e^b-1)$ would still be valid but would not collapse the product into a function of $\mu$.

**4. With $a=(1+\delta)\mu$ and $b=\ln(1+\delta)$, derive the upper-tail expression.**

Reference answer: Starting from $\mathbb P(X\ge a)\le e^{\mu(e^b-1)}/e^{ba}$, use $b=\ln(1+\delta)$, so $e^b=1+\delta$ and $e^b-1=\delta$; the numerator is $e^{\delta\mu}$. The denominator is $e^{ba}=e^{b(1+\delta)\mu}=(e^b)^{(1+\delta)\mu}=(1+\delta)^{(1+\delta)\mu}$. Hence
$\mathbb P(X\ge(1+\delta)\mu)\le\left[\frac{e^\delta}{(1+\delta)^{1+\delta}}\right]^\mu$.

**5. Complete Lemma 3 using $\ln(1+x)\ge\frac{2x}{2+x}$, showing each algebraic step.**

Reference answer: Taking logarithms, $\ln L=\mu[\delta-(1+\delta)\ln(1+\delta)]$. Bounding $\ln(1+\delta)\ge\frac{2\delta}{2+\delta}$,
$\delta-(1+\delta)\ln(1+\delta)\le\delta-(1+\delta)\frac{2\delta}{2+\delta}=\delta\cdot\frac{2+\delta-2-2\delta}{2+\delta}=-\frac{\delta^2}{2+\delta}$.
So $\ln L\le-\frac{\mu\delta^2}{2+\delta}$, and since $2+\delta\le3$ for $0<\delta\le1$, $\ln L\le-\frac{\mu\delta^2}{3}$; exponentiating gives $L\le e^{-\mu\delta^2/3}$.

**6. In what sense is Chernoff stronger than Chebyshev, and what hypothesis does that strength require?**

Reference answer: Chebyshev gives polynomial decay $O(1/n)$; Chernoff gives exponential decay $e^{-cn}$. Driving the failure probability to $10^{-10}$ costs about $10^{11}$ repetitions under Chebyshev but only about $10^3$ under Chernoff. The strength comes from using all moments (via the MGF) and from mutual independence, which factorises the MGF. The price is a stronger hypothesis: mutual independence is required, not merely pairwise, and the Bernoulli structure is used to compute each MGF.

**7. Why was the 2008 CMO rating a misuse of the Chernoff bound?**

Reference answer: Rating agencies treated mortgage defaults as independent, so the probability that a large fraction defaults at once was exponentially small by the upper-tail bound, making the top tranche look extremely safe. But defaults are not independent: in an economic downturn borrowers fail together, so defaults are strongly positively correlated. With mutual independence violated, the exponentially small conclusion evaporates, and assets rated as safe defaulted en masse during the crisis.

## Relation to neighbouring lectures

The previous lecture built tail bounds from Markov and Chebyshev, pushing the failure rate of randomized algorithms to $18/n$; this lecture uses the MGF to push the same quantity to $e^{-n/72}$, at the cost of requiring mutual independence.

The next lecture turns to modular arithmetic. Probability returns later: random coding, hashing and the analysis of algorithms all rely on concentration inequalities, and the correspondence between moment-generating and combinatorial generating functions recurs throughout.
