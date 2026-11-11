---
slug: "07-limits-and-lhopital"
title: "Limits, L'Hôpital, and ε-δ: Making \"Approach\" Precise"
summary: "A limit is nothing new — it is the word \"approach\" written in symbols. But it does two jobs: it frees the derivative from infinitesimals, and it gives 0/0 ratios an exact value. The second job is L'Hôpital's rule."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [limits, epsilon-delta, lhopital, derivative-definition]
sources:
  - kind: "video"
    title: "Limits, L'Hôpital's rule, and epsilon delta definitions | Chapter 7, Essence of calculus"
    url: "https://www.youtube.com/watch?v=kfF40MiS7zA"
    author: "3Blue1Brown"
    publishedAt: "2017-05-04"
---

## The thread of the lecture

This lecture sits in an unusual place in the series: it introduces no new technique. It goes back and **puts a foundation under** what the previous six lectures have been using all along.

Three things need shoring up:

1. Is the series' talk of "nudging the input by a small $dx$" the same as the textbook definition with a $\lim$ in it?
2. What does "as $h$ approaches 0" actually mean? How do mathematicians say it without ambiguity?
3. When a ratio evaluates to $0/0$, is there a systematic way through?

The answers: yes, it is the same thing; the ε-δ language; and yes, L'Hôpital's rule.

## Timeline

| Time | Topic |
| --- | --- |
| 1:22 | The formal definition: $\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}$ |
| 2:25 | Why textbooks write $h$ rather than $dx$ |
| 4:53 | ε-δ: starting from a $0/0$ example |
| 5:28 | $\frac{(2+h)^3-8}{h}$ has a hole at $h=0$ |
| 6:30 | Shrinking the input range shrinks the output range |
| 7:06 | A counterexample: a jump function approaching different values |
| 8:46 | The formal ε-δ statement |
| 10:09 | L'Hôpital: $\frac{\sin \pi x}{x^2-1}$ at $x=1$ |
| 13:50 | First-order changes divided, $dx$ cancels, giving $-\pi/2$ |
| 15:37 | The general form: the limit is the ratio of derivatives |

## A limit is nothing new

If you know what the word "approach" means, you already know what a limit is. A limit just dresses that intuition in notation.

What needs explaining is why it deserves a whole lecture. The reason: **the previous six lectures have been using a language that is not rigorous, and limits are the tool that makes it rigorous.**

The series kept saying "give $x$ a tiny nudge $dx$." That works — it produced every formula — but it dodges a question: what *is* $dx$? Is it infinitesimal? And if so, what is an infinitesimal?

Limits make those questions disappear: instead of defining "infinitesimal," ask only what the ratio approaches as $dx$ shrinks.

## The formal definition of the derivative

Recall the derivative. Given $f(x)$, find its derivative at, say, $x=2$:

1. Nudge the input, call it $dx$;
2. Look at the change in output, $df = f(2+dx) - f(2)$;
3. Form the ratio $df/dx$ — the slope of the secant between two points on the graph.

That ratio is almost the derivative. The real thing is

$$
\lim_{h \to 0} \frac{f(2+h) - f(2)}{h} .
$$

That is the formal definition printed in every calculus textbook.

### Why $h$ and not $dx$

Textbooks almost never write $dx$ here; they switch to another letter, usually $h$ or $\Delta x$.

The reason is worth spelling out: **the lowercase $d$ already announces an intention to take a limit**. Writing $df/dx$ is shorthand, and hidden inside it is the move "as $dx \to 0$."

Inside a $\lim$ expression, by contrast, $h$ must be treated as an **ordinary, non-zero, finitely small number** — $0.001$, say. It is not "a quantity tending to zero"; it is a number. What tends to zero is the whole limiting process, not $h$ itself.

So the change of letter is not mystification. It emphasises that $h$ is nothing exotic: just a number.

### On "infinitesimal"

Two common attitudes, both of which Grant rejects:

- **Reading $dx$ as infinitesimal.** "Infinitesimal" is a vague word, and asking "is it zero or not" leads straight into contradiction.
- **Treating $dx$ and $df$ as pure symbols not to be taken seriously.** That severs the source of intuition.

He argues for a third: **treat $dx$ as a concrete, finitely small nudge, and always remember to ask what happens as it approaches zero.**

This is not a dodge. Every formula the series derived in that language translates into the formal limit definition — the two say the same thing, one in intuition and one in symbols.

## The $0/0$ hole: a concrete function

Now the second question: what does "approach" mean?

Take a concrete function:

$$
\frac{(2+h)^3 - 8}{h} .
$$

This is exactly the expression that appears when you unwind the definition of the derivative of $x^3$ at $x=2$. But treat it first as any old function of $h$.

Its graph is a tidy parabola (a cubic over a linear gives a quadratic). Yet at $h=0$ there is a hole: substituting gives $0/0$, undefined. Graphs usually mark such a hole with an open circle.

Note: **the function is undefined at $h=0$ but defined arbitrarily close to it.** That is exactly the region a limit cares about.

As $h$ approaches 0, the height approaches 12. From the left and from the right alike. So

$$
\lim_{h\to 0}\frac{(2+h)^3-8}{h} = 12 ,
$$

matching the $3\cdot 2^2 = 12$ computed in the previous lecture.

## ε-δ: making "approach" precise

Take $f(x)=x^2$ near $x=2$. If the output must stay between 3 and 5, the dashed lines mark $\sqrt{3}$ and $\sqrt{5}$, about 1.73 and 2.24. Tightening the output band to $4\pm0.4$ moves those boundaries to about 1.90 and 2.10. The definition uses an input window centred at 2, so choose a radius that fits on both sides. For example, $\delta=0.23$ works for $\varepsilon=1$, and $\delta=0.09$ works for $\varepsilon=0.4$.

![Left: with ε=1 the output band runs from 3 to 5 and the input window is about 1.73 to 2.24; right: with ε=0.4 the band narrows and the input window shrinks to 1.90 to 2.10](/images/07-epsilon-delta-en.svg)

*Figure: the dashed lines mark the input boundaries for each output band. A δ window centred at 2 must fit between those boundaries.*

Suppose someone objects: "what precisely do you mean by *approach*?"

Start with an operational description:

- Take an input interval around $a$ (excluding $a$ itself);
- Look at all corresponding outputs — they form an output interval;
- The tighter the input interval, the tighter the output interval, and **its width can be made as small as you like**.

### A counterexample: the jump

Consider a function that jumps at 0: approaching from the right it tends to 2, from the left to 1.

However tightly you squeeze the input interval, the outputs straddle the gap from 1 to 2, so their spread never drops below 1.

**There is no single, unambiguous value being approached**, so the limit does not exist.

### The formal statement

Put into symbols, this is the ε-δ definition:

> For every $\varepsilon > 0$ there exists $\delta > 0$ such that whenever $0 < \lvert x - a \rvert < \delta$, we have $\lvert f(x) - L \rvert < \varepsilon$.

Piece by piece:

- $\varepsilon$ is the output error you will tolerate, **and it may be arbitrarily small**;
- $\delta$ is the input range you can find, and it depends on $\varepsilon$;
- the requirement: whenever the input lies within $\delta$ of $a$ (and is not $a$), the output lies within $\varepsilon$ of $L$.

The crucial part is the order of the quantifiers: **ε first, then δ**. However demanding the error requirement, you must be able to produce a matching input range.

Conversely, if some $\varepsilon$ exists (0.4, say) such that no matter how small $\delta$ is, some output escapes the error band, the limit fails. That is the jump function: take $\varepsilon = 0.4$; however narrow the input interval, part of the output is more than 0.4 away from any candidate value.

The language looks heavy. But it does something concrete: it replaces the fuzzy verb "approach" with a quantified statement that can be checked line by line.

## L'Hôpital's rule: from local linearisation

All of that was theory. Finish with a technique that computes.

Consider

$$
\frac{\sin \pi x}{x^2 - 1} .
$$

Substitute $x=1$: the numerator is $\sin \pi = 0$ and the denominator is $1-1=0$. Another $0/0$, another hole.

Plugging in $x = 1.00001$ gives roughly $-1.57$. But how do you know the exact value?

### Look at one small step on each side

Same idea as before: push $x$ away from 1 by $dx$ and see how numerator and denominator each change.

The numerator $\sin \pi x$ changes by the chain rule:

$$
d(\sin \pi x) = \cos(\pi x) \cdot \pi \, dx .
$$

At $x=1$, $\cos \pi = -1$, so the change is about

$$
-\pi \, dx .
$$

The denominator $x^2 - 1$ changes by $2x\,dx$, which at $x=1$ is

$$
2\,dx .
$$

### The ratio

So for $x$ very close to 1,

$$
\frac{\sin \pi x}{x^2-1}
\approx \frac{-\pi\,dx}{2\,dx}
= -\frac{\pi}{2} .
$$

The $dx$ cancels and $-\pi/2$ remains. And because both approximations improve as $dx$ shrinks, this ratio is the **exact limit**, not an estimate.

Check: $-\pi/2 \approx -1.5708$, consistent with the $-1.57$ found at $x = 1.00001$.

### The general form

Abstract the procedure. Let $f$ and $g$ both vanish at $x=a$, and both be differentiable there (each looks like a line when zoomed in).

Near $a$, write $x = a + dx$. Since $f(a)=0$,

$$
f(a+dx) \approx f(a) + f'(a)\,dx = f'(a)\,dx .
$$

Likewise

$$
g(a+dx) \approx g'(a)\,dx .
$$

Divide, and $dx$ cancels:

$$
\lim_{x\to a}\frac{f(x)}{g(x)} = \frac{f'(a)}{g'(a)} .
$$

That is **L'Hôpital's rule**: for a $0/0$ limit, differentiate numerator and denominator separately and substitute the troublesome point.

A historical footnote: the rule was discovered by Johann Bernoulli. L'Hôpital was a wealthy nobleman who paid Bernoulli for the rights to some of his mathematical discoveries, so the name went to the patron.

## L'Hôpital cannot discover derivative formulas

A natural thought: the definition of the derivative is itself a $0/0$ limit, so could L'Hôpital's rule compute it and thereby "discover" new derivative formulas?

No — using the rule requires knowing the derivative of the numerator, and the numerator is precisely the function you are trying to differentiate. That is circular.

The limitation is actually good news: **there is no mechanical procedure for deriving derivative formulas; it takes creativity.** And needing creativity usually means you are doing something real rather than filling in a template.

## What this lecture establishes

- A limit is not a new concept but the symbolisation of "approach."
- The formal derivative is $\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}$, where $h$ is an ordinary non-zero finite number, not an infinitesimal.
- Textbooks use $h$ rather than $dx$ to stress this: the lowercase $d$ already implies taking a limit.
- A limit exists when shrinking the input range shrinks the output range, whose width can be made arbitrarily small.
- The ε-δ definition turns that into a quantified statement: for every $\varepsilon$ there is a $\delta$ such that inputs within $\delta$ of $a$ give outputs within $\varepsilon$ of $L$.
- L'Hôpital's rule: a $0/0$ limit equals the ratio of the derivatives at that point, because both local linearisations are proportional to $dx$ and the ratio cancels it.
- L'Hôpital cannot derive derivative formulas; that would be circular.

## Check your understanding

**1. Why does the formal definition use $h$ instead of $dx$?**

Answer: because the lowercase $d$ already carries the intention of taking a limit, so $df/dx$ is shorthand. Inside a $\lim$ expression the quantity must be an ordinary, non-zero, finitely small number such as $0.001$. A different letter makes it explicit that it is neither infinitesimal nor "a quantity in the act of becoming zero" — what tends to zero is the whole limiting process. It also heads off the meaningless question of whether $dx$ is zero.

**2. State in ε-δ language what $\lim_{h\to 0}\frac{(2+h)^3-8}{h}=12$ means.**

Answer: for every $\varepsilon>0$ there is a $\delta>0$ such that whenever $0<\lvert h\rvert<\delta$ (excluding $h=0$, where the function is undefined), $\left\lvert \frac{(2+h)^3-8}{h} - 12 \right\rvert < \varepsilon$. Intuitively: however close to 12 you demand the output be, a small enough range of $h$ achieves it. Concretely the expression equals $12+6h+h^2$, so it suffices to choose $\delta$ with $\lvert 6h+h^2\rvert<\varepsilon$.

**3. Why does the jump function have no limit? Answer in ε-δ terms.**

Answer: because no candidate $L$ satisfies the definition. Take $\varepsilon = 0.4$: if $L$ is near 2, outputs from the left approach 1, at least about 1 away from $L$, exceeding $\varepsilon$; if $L$ is near 1, the right side fails; if $L$ sits in between, both sides fail. So for $\varepsilon=0.4$, no matter how small $\delta$ is, some input within $\delta$ of 0 produces an output outside the band. The definition demands the property for every $\varepsilon$, and here one counterexample suffices.

**4. Why is L'Hôpital's rule true, and why may $dx$ be cancelled?**

Answer: because $f(a)=g(a)=0$, so near $a$ we have $f(a+dx)\approx f'(a)\,dx$ and $g(a+dx)\approx g'(a)\,dx$ — both functions are approximately straight lines through the origin with slopes equal to their derivatives at $a$. The ratio is the ratio of those slopes, and $dx$ is a common factor. Cancelling is valid because both sides use the same $dx$: the same input increment in the same limiting process, hence literally the same number.

**5. Why can't L'Hôpital's rule be used to derive new derivative formulas?**

Answer: because the rule requires differentiating the numerator, and the numerator in the definition of the derivative is built from the very function whose derivative is sought. Using the rule presupposes the answer. That is why the series always derives formulas from geometry or algebraic structure instead of applying a general algorithm.
