---
slug: "22-signaling"
title: "Signaling: when a degree is an expensive certificate"
summary: "In Spence's job-market model education teaches nothing and is priced by type; with continuous education, pooling yields a single threshold e* while separation yields an interval, both pinned down by the requirement that the wage premium cover the cost of schooling."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "signaling"
  - "spence-model"
sources:
  - kind: "video"
    title: "Lecture 22: Signaling"
    url: "https://www.youtube.com/watch?v=H-wFpqnDrhs"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture built a first signaling game out of a binary choice: submit an essay or not. This lecture pushes the same logic onto a **continuous** choice. The sender picks a level of education $e\in[0,1]$; the receiver observes $e$ and sets a wage $w(e)$.

Continuity changes the shape of a strategy. Before, the sender's strategy was a single 0/1 label; here it is a pair of numbers $(e_l,e_h)$ — how long the low type stays in school and how long the high type stays. And the receiver's strategy is no longer a number but a **function**: for every conceivable $e$, a wage must be specified in advance. An equilibrium therefore becomes a wage curve, two education choices, and a belief system.

Continuity also changes the verification step. To show that nobody wants to deviate, one would in principle compare the equilibrium payoff against every point in a continuum. Ball's move is to look at the shape of the wage curve first and identify the **single deviation worth checking**: $e=0$ in the pooling case, and $e_h$ for the low type and $e_l$ for the high type in the separating case. Compressing infinitely many comparisons into one or two is where the technical work of the lecture sits.

The story is Spence's (1973) job-market signaling. Its assumption is deliberately extreme: **education teaches nothing useful**. Its only role is to make employers believe you are able. Ball is explicit that this is not his own view of education; the point is to isolate one mechanism. That schooling raises wages by teaching skills is obvious and needs no model. Spence's novelty is that even with zero learning, a degree can raise wages, and the effect is **causal** — had you not gone, you would have earned less.

There are two layers to the conclusion. The first is possibility: in a world with no productivity effect at all, education can still carry a positive return, because it is a credible signal. The second is comparison: **pooling** and **separating** equilibria coexist in this model, and the pooling equilibrium has everyone acquiring strictly less education than the high type acquires under separation. Both worlds are self-consistent; which one obtains depends on what the market believes.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The general shape: a sender with private information, a receiver who sees only the action |
| 2:38 | Luxury goods: wealth is the type, the brand is the action |
| 4:55 | College: ability is the type, the degree is the action |
| 6:09 | Spence 1973 and the college wage premium |
| 8:00 | Causal stories versus selection |
| 13:34 | The formal model: type $t\in\lbrace l,h\rbrace$, education $e\in[0,1]$ |
| 16:09 | Sender payoff $w-e^2/t$: type affects cost only, not the taste for wages |
| 17:25 | Receiver payoff $-(w-t)^2$, so the optimal wage is the expected type |
| 20:08 | An assessment is a strategy profile plus a belief system, written out |
| 32:25 | Separating ($e_l\neq e_h$) versus pooling ($e_l=e_h$) |
| 38:30 | Pooling: the on-path wage is pinned at $\mu$; off-path wages can only range over $[l,h]$ |
| 41:43 | Building the step function: pay $l$ below $e^\ast$, pay $\mu$ at or above it |
| 47:25 | Sender optimality reduces to a single deviation, $e=0$ |
| 53:16 | The key condition $\mu-l\ge e^{\ast 2}/l$: the premium must cover the cost |
| 59:47 | In any separating equilibrium the low type must choose $e_l=0$ |
| 1:09:08 | The high type's constraint $h-l\ge e_h^2/h$ and the low type's |
| 1:15:10 | Indifference curves draw the feasible interval for $e_h$ |

## Why a degree might be a signal

### One fact, three explanations

Start with the fact: the **college wage premium**. In the United States, people with a college degree earn more over a lifetime than people without one. Ball puts the order of magnitude at half a million to a million dollars, and stresses that the estimate moves with the measurement and the sample.

Why? The first cut is between **causal** and **selection**:

- **Causal**: take someone who did not go to college; had they gone, their earnings would have risen.
- **Selection**: people who go to college differ from those who do not — smarter, more ambitious, or endowed with some trait that is hard to measure. They earn more, but not because of college.

Ball says the best evidence points to both. This distinction is not itself game theory, but it determines which piece the model has to explain. The selection branch has a familiar name — spurious correlation: people who eat five almonds a day live longer, but they also run and eat well in other ways.

The model lives inside the causal branch, and there a second cut is needed:

- **Human capital formation**: you learn to code, to write, to talk to people; you become more productive and therefore more valuable. This is the story colleges like to tell.
- **Signaling**: you learn nothing, but **obtaining the degree** proves to employers that you are able, so they pay more.

The second is still causal: skip college and your wage falls. What differs is the mechanism in the middle — belief rather than productivity.

### A thought experiment that separates them

Ball's thought experiment: imagine a school that teaches something worthless but is extremely hard to complete. Its graduates might still do well in the labor market.

His example is athletics. Being a good runner does not make you better at finance, but it certifies that you finished something hard, which reveals something about diligence and work ethic, and that is why firms hire you. Likewise, students who leave after three and a half years earn substantially less than those who finish four. If college were only about skills, three and a half years should already have delivered most of them; if it is a signal, **the act of dropping out** reveals something about the person, and the size of the earnings drop makes sense.

Ball flags this as one argument for signaling, open to debate. He also refuses to treat the model as a full description of reality: in practice both mechanisms operate, and the model simply magnifies the signaling channel.

## The model

### Players and strategies

- **Sender** (student): privately knows the type $t\in\lbrace l,h\rbrace$ and chooses education $e\in[0,1]$.
- **Receiver** (a firm, or a competitive market of firms): observes $e$ but not $t$, and sets a wage $w$.

Here $l$ and $h$ are **numbers**, not labels. Ball insists on this: a low type might be 0.7 and a high type 2.3, and the values matter because we take expectations of them and subtract them from each other.

The type is interpreted as "how expensive schooling is for you" — intelligence, work ethic, or the quality of your secondary school. The model does not distinguish among these; one parameter absorbs them all.

Continuous education is a simplification. Real education arrives in discrete gates (high-school diploma, college degree), but continuity makes "one more unit" meaningful, and nearly every argument in this lecture is a marginal comparison.

Strategies:

$$
\text{sender: }(e_l,\,e_h),\qquad \text{receiver: }w:[0,1]\to[0,\infty).
$$

The receiver's strategy is a complete contingent plan: a wage for every $e$, including levels that never occur in equilibrium.

### Payoffs

Sender:

$$
u_S(e,w;t)=w-\frac{1}{t}e^{2}.
$$

Wages are good; schooling is costly, with marginal cost $2e/t$. The type sits in the denominator, so a larger $t$ means a smaller coefficient $1/t$ and a **lower marginal cost**. That is the formal version of "ability makes school cheaper".

Note that this is the mirror image of the previous lecture. There, the type affected how badly you wanted the outcome (keen students wanted the slot more) but not the cost of the essay. Here the type does not affect how much anyone wants a high wage — everybody does — only how costly schooling is. Ball suggests this fits labor markets better: almost everyone wants a higher wage, so that is not the dimension along which people differ.

Receiver:

$$
u_R(w,t)=-(w-t)^{2}.
$$

At first this looks odd: why would a firm care about the gap between the wage it pays and the worker's type? Ball's reading is that it is a **reduced form for a competitive labor market**. With many firms bidding, pay less than expected ability and the worker goes elsewhere; pay more and you lose money. In equilibrium the wage is pushed to expected ability.

The quadratic loss has a convenient algebraic property: given a belief about $t$, the optimal wage is exactly the **expectation**,

$$
w^\ast=\mathbb{E}[t\mid e].
$$

Certain low type means pay $l$; certain high type means pay $h$; fifty-fifty means pay $\tfrac12 l+\tfrac12 h$. Every wage below is computed this way, and no other optimization problem appears.

Prior: a fraction $\pi$ are high types and $1-\pi$ are low types.

### Beliefs and assessments

The receiver's belief system is

$$
b(h\mid e)\in[0,1],
$$

the probability assigned to the high type upon seeing education $e$. The low-type probability is $1-b(h\mid e)$, so one function suffices.

An **assessment** is a strategy profile plus a belief system, i.e. the triple $\big((e_l,e_h),\,w(\cdot),\,b(h\mid\cdot)\big)$.

## What an equilibrium must satisfy

Perfect Bayesian equilibrium splits into three conditions here.

**Sender sequential optimality**: for each $t\in\lbrace l,h\rbrace$,

$$
w(e_t)-\frac{1}{t}e_t^{2}\;\ge\;w(e)-\frac{1}{t}e^{2}\quad\text{for all }e\in[0,1].
$$

The wage function appears on the right-hand side: if I deviate to another level of education, the wage I get is dictated by **someone else's** strategy.

**Receiver sequential optimality**: for each $e$,

$$
w(e)=\mathbb{E}[t\mid e]=h\cdot b(h\mid e)+l\cdot\big(1-b(h\mid e)\big).
$$

**Belief consistency**: at **on-path** levels of $e$ the belief must come from Bayes' rule; at **off-path** levels Bayes' rule would divide by zero, so beliefs are unconstrained.

Only two levels are on-path here, $e_l$ and $e_h$ (one, if they coincide). Ball notes that a mixed sender strategy would enlarge the on-path set, and sets that aside.

**A constraint that is easy to miss**: off-path beliefs are free, but off-path **wages are not**. Given any belief, the optimal wage must lie in $[l,h]$ — the most pessimistic belief implies wage $l$, the most optimistic implies $h$, and intermediate beliefs imply intermediate values. So punishing a deviator with a wage of zero is not allowed: it violates receiver optimality. A student raises exactly this in the lecture, and it becomes the pivot of the separating construction.

## The pooling equilibrium

### The shape of the wage curve

Pooling means $e_l=e_h=e^\ast$: both types acquire the same education, so education reveals nothing.

Only $e^\ast$ is on-path, and Bayes' rule returns the prior:

$$
b(h\mid e^\ast)=\pi,
$$

so

$$
w(e^\ast)=h\pi+l(1-\pi)\;\equiv\;\mu .
$$

$\mu$ is the prior mean, and Ball gives it a name because it recurs throughout.

How should off-path wages be set? The goal is to remove any reason to deviate. The only temptation is to acquire **less** schooling — schooling is costly and does not raise the wage. To block it, the wage below the threshold must fall hard. How far can it fall? To $l$. Hence

$$
w(e)=
\begin{cases}
l, & e<e^\ast,\\[2pt]
\mu, & e\ge e^\ast .
\end{cases}
$$

Matching beliefs: below $e^\ast$ the receiver is certain of the low type ($b=0$); at or above $e^\ast$ it keeps the prior ($b=\pi$). Note that the wage is **flat** above $e^\ast$: extra schooling earns nothing and costs something, so nobody takes it, and that segment creates no deviation.

The curve is a diploma threshold: below it you are paid as a low type, at it you are paid the population average, above it nothing extra.

### How high can the threshold be

Belief consistency holds (the only on-path point uses Bayes' rule), and receiver optimality holds by construction (each wage equals the expectation under the local belief). What remains is sender optimality.

To compare against a continuum, find the best deviation. Three observations pin it down:

- Deviating upward ($e>e^\ast$): same wage, higher cost, never worth it.
- Deviating down to any $e\in(0,e^\ast)$: the wage is $l$ regardless, and cost rises with $e$, so less is better.
- Therefore the only case to check is $e=0$.

Low type:

$$
\mu-\frac{1}{l}e^{\ast 2}\;\ge\;l
\quad\Longleftrightarrow\quad
e^{\ast 2}\le l(\mu-l).
$$

High type:

$$
\mu-\frac{1}{h}e^{\ast 2}\;\ge\;l
\quad\Longleftrightarrow\quad
e^{\ast 2}\le h(\mu-l).
$$

Since $l<h$, we have $l(\mu-l)<h(\mu-l)$, so the low type's condition binds. The intuition: both types collect the same premium $\mu-l$, but schooling is more expensive for the low type, so the low type is the first to give up. **If the low type is willing to go, the high type certainly is.**

Rewriting the binding condition:

$$
\underbrace{\mu-l}_{\text{wage premium}}\;\ge\;\underbrace{\frac{e^{\ast 2}}{l}}_{\text{cost of schooling}}.
$$

That is the skeleton of the whole model: **the premium must cover the cost**. Ball remarks that in practice the college premium and the cost of schooling are of comparable magnitude, so the constraint is not a formality.

### A family of equilibria

Any $e^\ast$ with $e^{\ast 2}\le l(\mu-l)$ supports a pooling equilibrium. The equilibrium is therefore not unique but a whole range: the threshold can sit at 0.3 or at 0.4, as long as it is not too high. Higher thresholds cost more to clear and approach the point where the low type refuses.

## The separating equilibrium

### The low type must acquire nothing

Separation means $e_l\neq e_h$. Two points are now on-path, and Bayes' rule pins the beliefs:

$$
b(h\mid e_l)=0,\qquad b(h\mid e_h)=1,
$$

hence $w(e_l)=l$ and $w(e_h)=h$.

Off-path wages still lie in $[l,h]$. To deter deviations, push the wage for $e<e_h$ down to $l$; above $e_h$ it can stay at $h$ (extra schooling earns nothing, so nobody goes there).

The first conclusion is immediate: **$e_l$ must be $0$**. Put yourself in the low type's position. Following the equilibrium, you pay $e_l>0$ and the market becomes certain you are the worst type, so the wage is $l$. Once the belief is already the worst possible, why pay? Choosing $e=0$ delivers the same $l$ at no cost, which is strictly better. Any separating equilibrium with $e_l>0$ is overturned by the low type.

### Two inequalities

With $e_l=0$, two constraints remain.

The high type is willing to study to $e_h$:

$$
h-\frac{1}{h}e_h^{2}\;\ge\;l
\quad\Longleftrightarrow\quad
e_h^{2}\le h(h-l).
$$

The low type is unwilling to follow:

$$
l\;\ge\;h-\frac{1}{l}e_h^{2}
\quad\Longleftrightarrow\quad
e_h^{2}\ge l(h-l).
$$

Together:

$$
l(h-l)\;\le\;e_h^{2}\;\le\;h(h-l).
$$

The constant on the right is $h$, not $\mu$: the separating premium is $h-l$, larger than the pooling premium $\mu-l$, because high education now **fully reveals** the high type and the market pays $h$.

The two inequalities read in opposite directions. The upper bound says schooling must not be so costly that even the high type gives up. The lower bound says it must not be so cheap that the low type is tempted to imitate. Ball draws the parallel with the essay problem of the previous lecture: the essay had to be cheap enough for keen students and expensive enough for unenthusiastic ones. The mechanism is identical.

### Comparison with pooling

Put the two thresholds side by side:

$$
e^{\ast 2}\le l(\mu-l)\;<\;l(h-l)\;\le\;e_h^{2}.
$$

The strict inequality in the middle follows from $\mu<h$ ($\mu$ is a weighted average of $l$ and $h$, strictly below $h$ whenever $\pi>0$). Hence

$$
e^\ast<e_h .
$$

This is the comparison worth remembering:

- **Separating world**: the low type acquires nothing, the high type acquires a lot, the return to education is large and so is the cost.
- **Pooling world**: everyone acquires an intermediate amount, the return is modest, and everyone goes.

Both are equilibria, and in both nobody can do better given what everyone else is doing. What differs is the market's belief about the education-ability link; people best-respond to that belief, and their responses make the belief self-fulfilling. Ball suggests this may map onto the different roles education plays in different countries.

## The feasible interval, drawn

The algebra is done; the geometry is more immediate.

With education on the horizontal axis and the wage on the vertical, fix a utility level $\bar u$. The indifference curve of type $t$ is

$$
\bar u=w-\frac{1}{t}e^{2}
\quad\Longleftrightarrow\quad
w=\bar u+\frac{1}{t}e^{2}.
$$

This is an upward-opening parabola, and **higher curves mean higher utility** (same $e$, higher wage).

Which type's curve is steeper? At the margin, how much extra wage is needed to compensate one more unit of schooling? The compensation rate is $2e/t$, which is smaller when $t$ is larger. So **the high type's indifference curves are flatter**. Intuition: someone who finds school easy needs only a little extra pay to stay two more years; someone who finds it hard needs a lot.

Draw both types' curves through the point $(0,l)$. They meet only there, and to the right the high type's curve lies below the low type's, because it demands less compensation.

Now overlay the separating wage step: pay $l$ below $e_h$ and $h$ at or above it. The admissible $e_h$ are exactly the segment between the two points where the curves cross the horizontal line $w=h$:

- The low type's curve crosses $w=h$ at $e=\sqrt{l(h-l)}$ — the lower bound. To the left of it, the low type finds "a little schooling for $h$" attractive and separation collapses.
- The high type's curve crosses $w=h$ at $e=\sqrt{h(h-l)}$ — the upper bound. To the right, even the high type finds it unattractive.

Inside the interval the high type goes and the low type does not, and separation holds.

![Left: pooling, the wage steps from 1 to 1.25 at e*=0.5 and the low type's indifference curve passes exactly through that point; right: separation, the wage steps from 1 to 1.5 at e_h and the two indifference curves bracket the feasible interval for e_h](/images/signaling-wage-ladder-en.svg)

*Figure: one step function plus two indifference curves explain why the pooling threshold has only an upper bound while the separating threshold has an interval.*

Supplementary: the figure takes $l=1$, $h=1.5$, $\pi=\tfrac12$, so $\mu=1.25$, $e^\ast=0.5$ (at its upper bound) and $e_h\in[0.71,\,0.87]$. In the pooling panel the low type's curve passes exactly through $(0.5,\,1.25)$, which is what makes that $e^\ast$ the highest threshold that can be sustained; any higher and the low type prefers to take $l$ and skip school.

## What this lecture establishes

1. The skeleton of a signaling game is "informed player moves first, uninformed player sees only the action". Credibility requires the action's **cost to vary with type**; if everyone can afford it, a luxury good conveys nothing.
2. Spence's model assumes education raises no productivity and is priced by type alone. Even in that extreme setting a degree can carry a positive return, because it is credible evidence about ability.
3. The receiver's quadratic loss makes the optimal wage the **conditional expectation** of the type, collapsing the entire receiver side into one formula.
4. In pooling, the threshold need only satisfy $\mu-l\ge e^{\ast 2}/l$: the premium must cover the low type's cost. Pooling equilibria therefore form a family, not a point.
5. In separation, the low type must choose $e_l=0$ (paying a cost to be identified as the worst type is never worth it), and $e_h$ is squeezed between $\sqrt{l(h-l)}$ and $\sqrt{h(h-l)}$: high enough that the low type will not follow, low enough that the high type will.
6. The two kinds of equilibrium coexist, with $e^\ast<e_h$. Given the same technology, education can be a universal hurdle or a hurdle only a few clear, depending on which belief the market holds.

## Check your understanding

**1. If schooling cost the same for both types (no $1/t$ in the payoff), would signaling still work?**

No. With a cost $c(e)$ independent of type, the calculation "study $e$ for a higher wage" is identical for everyone: either both types want to go or neither does, and the choice cannot separate them. Separation needs a single-crossing condition — flatter indifference curves for the high type, so the two curves cross once — which is what creates an interval that only the high type is willing to clear. The luxury good and the peacock's tail share this feature: what is expensive is not the action but the action **for a particular kind of person**.

**2. In pooling, why can an off-path wage fall only to $l$ and not to $0$?**

Because the receiver must also be optimizing. For any belief, the optimal wage equals the expected type, and the type takes only the values $l$ and $h$, so the expectation lies in $[l,h]$. Even a firm convinced that a deviator is a low type should pay $l$, not $0$. Cutting to $0$ hurts the firm itself, so it is not a credible punishment. Beliefs can be arbitrarily pessimistic; wages cannot be arbitrarily low.

**3. Why is it the low type who acquires nothing in separation, rather than the high type?**

Reverse the roles: suppose the high type chose $0$ and the low type chose $e>0$. Seeing $e$, the market is certain of the low type and pays $l$; at $0$ the market is certain of the high type and pays $h$. The player who chose $e$ paid a cost and received a lower wage, so she would switch to $0$. The direction "low education means low wage" is forced by the monotonicity of wages: whoever is paid the low wage has no reason to pay a positive cost.

**4. If $\pi=1$ (everyone is a high type), what happens to the pooling condition?**

Then $\mu=h$, and the condition $e^{\ast 2}\le l(\mu-l)$ becomes $e^{\ast 2}\le l(h-l)$, matching the separating upper bound. But the type is now known, so beliefs carry no information and the model collapses to complete information: the firm pays $h$ directly and no schooling is needed as proof. The bound can still be computed, but its meaning has changed — $e^\ast=0$ is also an equilibrium and is the only sensible one.

**5. Why is the low type's indifference curve steeper in the figure?**

Differentiate $w=\bar u+e^{2}/t$ to get slope $2e/t$. Since $l<h$, we have $1/l>1/h$, so at any given point the low type's curve is steeper. The economic reading is the marginal compensation rate: one more unit of schooling requires a larger wage increase to keep the low type indifferent, because school hurts more. That slope gap is the geometric basis for separation — the curves touch only at $(0,l)$ and diverge to the right.

**6. Can this model speak to grade inflation or "the diploma is worth less"?**

Within the model one can say something directional: if $\pi$ rises (more high types), $\mu$ rises, the pooling bound $\sqrt{l(\mu-l)}$ rises, and a higher threshold can still be sustained; conversely, if schooling becomes cheaper (higher $l$), the same threshold is easier to clear and the diploma is less of a hurdle. But these comparative statics depend entirely on which parameter moves, and the model has no endogenous human capital and no feedback from diploma expansion to beliefs. Treat them as directional hints, not as a quantitative account of credential inflation.
