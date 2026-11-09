---
slug: "04-chain-rule-and-product-rule"
title: "Chain Rule and Product Rule: Three Number Lines and a Stretchable Box"
summary: "Every complicated function is built from simple ones by adding, multiplying, or nesting. The sum rule stacks heights, the product rule grows a rectangle, and the chain rule passes a nudge down three number lines."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [derivative, chain-rule, product-rule, composition]
sources:
  - kind: "video"
    title: "Visualizing the chain rule and product rule | Chapter 4, Essence of calculus"
    url: "https://www.youtube.com/watch?v=YG15m2VwSjA"
    author: "3Blue1Brown"
    publishedAt: "2017-05-01"
---

## The thread of the lecture

The last two lectures handled the derivatives of simple functions. But almost every function you meet in modelling is those simple functions glued together, so the next question is: **what happens to the derivative when two functions are added, multiplied, or nested?**

There are only three ways to combine:

1. **Add** them: $f(x) + g(x)$;
2. **Multiply** them: $f(x) \cdot g(x)$;
3. **Compose** them: shove one inside the other, $f(g(x))$.

Subtraction and division are not new: subtracting is multiplying by $-1$ and adding, and dividing is taking a reciprocal and multiplying. Master the three and any monstrous expression can be peeled apart layer by layer.

Each combination has its own picture: the sum rule stacks two heights, the product rule grows a rectangle whose sides both depend on $x$, and the chain rule passes a nudge down three number lines.

## Timeline

| Time | Topic |
| --- | --- |
| 1:50 | The sum rule: the derivative of a sum is the sum of derivatives |
| 2:16 | Walking through $\sin x + x^2$: two heights stacked |
| 4:33 | A product as a rectangle whose two sides are the two functions |
| 5:50 | The new area splits into three pieces, two of them substantial |
| 7:02 | Product rule: left times right's derivative, plus right times left's |
| 8:53 | Composition: putting $x^2$ inside $\sin$ |
| 9:13 | Three number lines: $x$ → $x^2$ → $\sin(x^2)$ |
| 11:10 | The intermediate nudge: $d\sin h = \cos h \cdot dh$ |
| 12:29 | Chain rule: outer derivative times inner derivative |
| 13:53 | The $dh$'s really do cancel |

## Three ways to combine

First, what "complicated function" means. It is rarely something genuinely new; almost always it is $\sin$, $x^2$, $e^x$ and friends, glued together repeatedly.

Glue comes in three kinds. Subtraction and division reduce to them:

$$
f - g = f + (-1)\cdot g,
\qquad
\frac{f}{g} = f \cdot \frac{1}{g},
$$

and $1/g$ is "put $g$ inside $1/x$," which is composition. So three basic operations cover everything.

The problem therefore compresses to three questions: given $f'$ and $g'$, find $(f+g)'$, $(fg)'$, and $(f\circ g)'$.

## The sum rule: stacking two heights

The sum rule is the easy one: **the derivative of a sum is the sum of the derivatives**,

$$
(f+g)' = f' + g' .
$$

That sentence is a bit of a tongue-twister, but the picture is immediate. Take $f(x) = \sin x + x^2$ at $x = 0.5$: sine gives one height, $x^2$ gives another, and the function's value is the two bars stacked end to end.

Now push $x$ to $0.5 + dx$. How much did each bar change?

- The sine bar changed by $d\sin x$, and "the derivative of sine is cosine" means exactly $d\sin x \approx \cos x \cdot dx$;
- The $x^2$ bar changed by $d(x^2) \approx 2x \cdot dx$.

The total change is their sum:

$$
df = \cos x \cdot dx + 2x \cdot dx .
$$

Divide by $dx$ and you get $\cos x + 2x$ — the two derivatives added.

No cross term appears, because addition itself creates no coupling between the parts. That is why the sum rule is this simple.

## The product rule: a stretchable box

Products are harder. $f(x) = \sin x \cdot x^2$ is not two heights stacked; it is **two sides multiplied**, which means an area.

Picture a rectangle of width $\sin x$ and height $x^2$. Both lengths move with $x$: starting from 0, the width climbs to 1 at sine's peak and then falls back, while the height keeps growing as $x^2$.

So $f(x)$ is the area of that rectangle. Differentiating asks: **push $x$ a little, how much area appears?**

Increasing $x$ by $dx$ changes the width by $d\sin x$ and the height by $d(x^2)$. Where does the new area sit?

- A vertical strip on the right: height $x^2$, width $d\sin x$, area $x^2 \cdot d\sin x$;
- A horizontal strip along the bottom: width $\sin x$, height $d(x^2)$, area $\sin x \cdot d(x^2)$;
- A small square in the corner: area proportional to $dx^2$, negligible.

Substitute the two known derivatives:

$$
df = x^2 \cdot (\cos x\,dx) + \sin x \cdot (2x\,dx) .
$$

Divide by $dx$:

$$
\frac{df}{dx} = x^2 \cos x + 2x \sin x .
$$

### The mnemonic and what it means

That is the product rule:

$$
(fg)' = f \cdot g' + g \cdot f' .
$$

Many people memorize it as "left d right, right d left."

Out of context, that sounds like an incantation. But back in the rectangle, every symbol has a place:

- **Left d right** ($\sin x \cdot 2x$) is the **bottom horizontal strip** — its width from the left function, its height from the change in the right one;
- **Right d left** ($x^2 \cdot \cos x$) is the **right vertical strip** — its height from the right function, its width from the change in the left one.

The chant is just the names of those two areas. Hold the picture and the chant becomes unnecessary.

## Constant multiples: a special case

If one factor is a constant, say $2\sin x$, everything simplifies:

$$
(2\sin x)' = 2\cos x .
$$

The constant comes straight out front. This also follows from the product rule: let $g(x)=2$, so $g'=0$, and $(fg)' = f g' + g f'$ collapses to $2f'$.

Geometrically: the rectangle's width is fixed, so only the "right vertical strip" exists and the "bottom horizontal strip" disappears — the side along that direction is not changing.

## The chain rule: three number lines

The third combination is composition, one function inside another. Take $\sin(x^2)$: square first, then take the sine.

A different visualization helps here: three parallel number lines.

- The top holds $x$;
- The middle holds $x^2$;
- The bottom holds $\sin(x^2)$.

The function $x^2$ carries a value from the top line to the middle, and $\sin$ carries it from the middle to the bottom.

![Three number lines labelled x, h = x², and sin h; at x = 3 a nudge dx is amplified sixfold into dh, then multiplied by cos 9 ≈ −0.91 into a leftward d sin h ≈ −5.47dx, for a total amplification of −5.47](/images/04-chain-rule-three-lines-en.svg)

*Figure: the chain rule is a relay of three nudges; the intermediate $dh$ is one and the same number in both stages, which is why it cancels.*

### Passing the nudge down

Start at $x = 1.5$. Nudge the top point by $dx$; the middle point moves to $x^2 + d(x^2)$ — call that intermediate change $dh$.

Here is the crucial move: **give the intermediate quantity a name.** Call $x^2$ by the name $h$. Then the bottom value is $\sin h$, and its change is $d\sin h$.

Why not write $d\sin(x^2)$ directly? Because what we know about the derivative of sine is stated in terms of *its own input*: if the input changes by $dh$, the output changes by $\cos h \cdot dh$. How big $dh$ actually is is a separate question, to be unfolded later.

So write first:

$$
d\sin h = \cos h \cdot dh .
$$

Then substitute $h = x^2$ back:

$$
d\sin h = \cos(x^2) \cdot d(x^2) .
$$

And finally expand $d(x^2) \approx 2x\,dx$:

$$
df = \cos(x^2) \cdot 2x \cdot dx .
$$

Divide by $dx$:

$$
\frac{d}{dx}\sin(x^2) = \cos(x^2) \cdot 2x .
$$

### The general form

For arbitrary functions $g$ and $h$:

$$
\frac{d}{dx}\,g(h(x)) = g'(h(x)) \cdot h'(x),
$$

or in Leibniz notation:

$$
\frac{dg}{dx} = \frac{dg}{dh} \cdot \frac{dh}{dx} .
$$

This is the **chain rule**.

Notice the outer derivative is written $dg/dh$, not $dg/dx$. That is not a casual change of letters: it reminds you that the outer derivative is evaluated at the **intermediate quantity $h$**, not at $x$. The derivative of sine is cosine, but the thing you plug in is $h = x^2$, so it is $\cos(x^2)$.

## Why the $dh$'s cancel

Written as $\dfrac{dg}{dh}\cdot\dfrac{dh}{dx}$, the two $dh$'s look like fractions that cancel to give $\dfrac{dg}{dx}$.

Is that genuine, or just notation that happens to look nice?

Grant's answer: it is genuine, and it reflects the machinery of tiny nudges underneath every derivative.

Recall the three lines:

1. The nudge $dx$ on the top line produces a nudge $dh$ on the middle line;
2. The nudge $dh$ on the middle line produces a nudge $dg$ on the bottom line;
3. What we want is the ratio of $dg$ to $dx$.

The first ratio $dh/dx$ is the amplification of the first transmission; the second $dg/dh$ is the amplification of the second. The total amplification is their product — and $dh$, being a single intermediate quantity, is literally the same number in both places. Cancelling it just writes that fact down.

If the two $dh$'s referred to different quantities, the cancellation would be invalid. It works because the middle step has exactly one change to report.

## What this lecture establishes

- Functions combine in only three basic ways: addition, multiplication, composition; subtraction and division reduce to these.
- Sum rule: $(f+g)' = f' + g'$, because the two heights change independently.
- Product rule: $(fg)' = f g' + g f'$, the two terms being the bottom strip and the right strip of the growing rectangle; the corner piece is negligible.
- Constant multiples are a special case: $(cf)' = c f'$, because one side of the rectangle does not move.
- Chain rule: $(g\circ h)' = g'(h)\cdot h'$, amplification factors multiplying along the chain.
- The outer derivative must be evaluated at the inner function's value — that is what $dg/dh$ encodes.
- The cancellation of $dh$ is not a notational trick; it records that there is only one intermediate change.
- Understanding the rules is not the same as fluency with them; fluency only comes from practice.

## Check your understanding

**1. Why does the sum rule produce no cross term of the kind the product rule has?**

Answer: because addition lets each function contribute its increment independently. The value is a sum of two heights; when $x$ moves by $dx$, each height changes on its own, and the total change is the sum of the two changes. No term can depend on both functions' changes at once. In the product case two terms appear because the area depends on both sides, so a change in either side creates new area — while the piece created when both change at once is second order and gets dropped.

**2. Which piece of the rectangle does each term of the product rule correspond to?**

Answer: $f \cdot g'$ is the bottom horizontal strip — width $f$ (the side that is not changing in that term), height $dg$ (the change in $g$). $g \cdot f'$ is the right vertical strip — height $g$, width $df$. The small corner square, produced when both sides change at once, scales as $dx^2$; dividing by $dx$ still leaves a $dx$, so it vanishes.

**3. In the chain rule, why is the outer derivative written $g'(h(x))$ rather than $g'(x)$?**

Answer: because the outer function's input is not $x$ but the intermediate $h(x)$. A derivative says how much the output moves per unit input *at a particular input value*, so the value matters. The derivative of sine is cosine, but evaluated at $h = x^2$, giving $\cos(x^2)$; writing $\cos x$ would be simply wrong. The notation $dg/dh$ is a reminder of where the evaluation happens.

**4. Why is the cancellation of $dh$ in the chain rule more than a notational coincidence?**

Answer: because both $dh$'s denote the same concrete intermediate change — the displacement on the middle number line caused by $dx$ on the top line. $dg/dh$ is the amplification of the second transmission and $dh/dx$ that of the first; the total amplification is their product, and the intermediate quantity cancels out of that product. The cancellation is valid precisely because there is only one intermediate change; if the two stages used different intermediates, it would mean nothing.

**5. If you forget the inner derivative when differentiating $\sin(x^2)$, what do you get, and what is wrong with it?**

Answer: you get $\cos(x^2)$. The error is treating the outer derivative as the whole answer. $\cos(x^2)$ says how fast $\sin h$ changes per unit change in $h$; but the question is how fast $\sin(x^2)$ changes per unit change in $x$. When $x$ moves one unit, $h = x^2$ moves $2x$ units, so that amplification must be included. Dropping it amounts to assuming $h$ moves in lockstep with $x$, which happens to be true only at $x = 1/2$.
