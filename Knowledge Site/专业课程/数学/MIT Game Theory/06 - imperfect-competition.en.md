---
slug: "06-imperfect-competition"
title: "Imperfect Competition: Monopoly Markups, Cournot Quantities, Bertrand Prices"
summary: "Writing 'a few firms selling the same good' as a game: first why and how much a monopolist marks up, then a comparison of simultaneous quantity choice (Cournot) and simultaneous price choice (Bertrand), and why the latter drives price to marginal cost with only two firms."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "imperfect-competition"
  - "cournot-bertrand"
sources:
  - kind: "video"
    title: "Lecture 6: Imperfect Competition"
    url: "https://www.youtube.com/watch?v=79Nqii6nQ5U"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Five lectures have assembled the toolkit: strategic form, dominance, rationalizability, Nash equilibrium. Today the toolkit is spent on a single **concrete economic question** — when a few firms sell the same thing, how far down does the price get pushed?

Ball opens by completing last lecture's chain of inclusions. We already know a dominant strategy equilibrium is a pure-strategy Nash equilibrium, and a pure-strategy Nash equilibrium is rationalizable. One more link goes in today: every pure-strategy Nash equilibrium is a profile that appears **with positive probability** in some mixed-strategy Nash equilibrium — simply because a pure strategy is itself a mixed strategy (it puts probability one on one action), so that profile is a mixed equilibrium in which it occurs with probability one. The chain reads

$$
\text{DSE}\;\subseteq\;\text{pure NE}\;\subseteq\;\text{support of mixed NE}\;\subseteq\;\text{rationalizable}.
$$

That is only bookkeeping. The substance is **imperfect competition**.

Ball locates it on a continuum. At one end sits **perfect competition**: many small firms, homogeneous products, each a **price taker** — how much corn my little farm grows this year does not move the world price. At the other end sits **monopoly**: a single firm. Imperfect competition, also called oligopoly, lies between: a few large firms that possess **market power**, meaning their production decisions move the market price. If Saudi Arabia pumps far more oil this year, the price falls; that is market power on display.

So the lecture answers two questions. The descriptive one: given the market structure, what are the equilibrium price and quantity? The methodological one: the same phenomenon — firms competing — admits two equally sensible models, one where firms choose **quantities**, one where they choose **prices**, and the conclusions differ enormously. Under Cournot the price falls slowly as firms are added; under Bertrand two firms suffice to drive it to cost. Ball is explicit that **the economist's job is to judge which model fits a given market**, not to adjudicate which model is "right".

The technical route is uniform. Specify demand (an assumption about consumers), assume constant marginal cost (an assumption about the firm), write profits, then take a first-order condition or a best response. Monopoly is a one-person optimisation and needs no game theory; from two firms onward the price depends on the rival's choice and the problem genuinely becomes a game.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: $S^\infty$, and DSE ⊆ pure NE ⊆ support of mixed NE |
| 3:58 | Imperfect competition sits between perfect competition and monopoly |
| 5:39 | Price takers and market power: wheat, oil, mobile carriers |
| 8:02 | Three sources of market power: location, differentiation, patents |
| 12:08 | What counts as a monopoly depends on the set of substitutes |
| 14:14 | Three apple consumers and individual demand |
| 17:30 | Aggregating into a step-shaped market demand curve |
| 22:27 | Inverse demand $P(Q)$ and demand $Q(P)$ are one correspondence |
| 23:44 | The monopoly problem: constant marginal cost and the profit rectangle |
| 30:21 | The trade-off between per-unit profit and units sold |
| 34:32 | The first-order condition gives $p^\ast=\frac{1+c}{2}$ |
| 38:02 | The markup $p^\ast=c+\frac{1-c}{2}$ |
| 40:50 | Cournot (1838) versus Bertrand (1883): quantities or prices |
| 49:02 | Cournot profits and the best response $\frac{1-q_2-c}{2}$ |
| 56:30 | Symmetric equilibrium $\frac{1-c}{3}$, a smaller markup than monopoly |
| 58:22 | $n$ firms: $q^\ast=\frac{1-c}{n+1}$, $p\to c$, $Q\to 1-c$ |
| 1:07:11 | Bertrand's piecewise payoff and the four-case best response |
| 1:19:31 | The unique equilibrium $p_1=p_2=c$: two firms are enough |

## From price taker to monopolist

The boundaries between the three concepts are blurry, and Ball spends time on that. Perfect competition requires firms so small they cannot move the price, and homogeneous products. The moment my corn is "especially good", I am no longer a small player and market power has appeared.

He lists several sources of market power, worth remembering because they are what later decides which model to use:

- **A few large firms.** Only two or three carriers own nationwide networks in the US, and building one is a steep entry barrier.
- **Location and transport costs.** There are coffee shops all over the world but only a few near MIT. Coffee goes cold on the way from New York, so better coffee there is not effective competition.
- **Product differentiation.** Many firms make phones, but an iPhone is not the same product as a Samsung or a Google phone. People still buy it at a higher price, and that is pricing room.
- **Exclusive rights granted by government.** Patents are the cleanest case: a drug company spends heavily on development and receives a period of exclusive supply so that the investment pays. Antitrust exemptions for sports leagues are another: the NFL may run a draft, while tech firms cannot jointly rank graduates — the former has the exemption, the latter would violate antitrust law.

Ball also notes an institutional fact: **whether something is a monopoly always depends on what counts as a close substitute**. The subway operator will say it competes in "transportation" (bikes, ride-hailing); its accusers define the market narrowly ("fast underground travel unaffected by traffic"). That definition is exactly what firms litigate. It is also why the concept resists clean formalisation.

## Demand: from three consumers to a curve

Demand answers: at a given price, how much will the market buy? Ball makes this concrete in an economy with three consumers and one good, apples.

- Consumer 1 values the first apple at 1 and the second at 0 (not hungry, and apples perish).
- Consumer 2 values the first apple at 2, then 0.
- Consumer 3 loves apples: 3 for the first, 1 for the second, then 0.

Each person's demand is the number of units whose marginal value is at least the price. At a price of 4, consumer 3 buys nothing (the first apple is worth only 3). At 2, she buys one (the second is worth 1, not 2). At 1, she buys two.

Adding the three gives market demand:

- $p=5,4$: 0;
- $p=3$: 1 (consumer 3 enters);
- $p=2$: 2 (consumer 2 enters);
- $p=1$: 4.

The last step deserves a pause: the jump from 2 to 4 is two units, because **two mechanisms fire at once** — consumer 1 enters as a new buyer (+1) and consumer 3 moves from one apple to two (+1). The demand curve is therefore a staircase: as price falls, both the extensive margin (more people buy) and the intensive margin (each buys more) operate.

Three consumers make the curve jagged. Ball notes that a real supermarket faces thousands of people, and once those steps are stacked and the axes rescaled the curve smooths out. So the model writes demand as a continuous function $Q(P)$, trading discreteness for differentiability — "not much is lost, and a lot is gained in tractability".

One convention has to be absorbed: **price on the vertical axis, quantity on the horizontal**. From a mathematician's viewpoint this is backwards, but it is the historical convention. Hence two ways to write the same object:

$$
Q(P)=\max\{1-P,\;0\},\qquad P(Q)=\max\{1-Q,\;0\}.
$$

They are the two directions of one correspondence, mutual inverses, which is why $P(Q)$ is called the **inverse demand function**. The $\max$ cannot be dropped: at a price of 2 there should be no negative demand. Ball concedes that in practice one throws the $\max$ away, solves, and then checks that the resulting price lies in $(0,1)$; if it does, nothing is lost, and if it does not, one has to go back.

## The monopolist's problem: why the markup is exactly half

The monopolist chooses a price $p$; marginal cost is a constant $c\in(0,1)$, so producing $Q$ units costs $cQ$. Profit splits into two pieces:

$$
\pi(p)=\underbrace{(p-c)}_{\text{profit per unit}}\times\underbrace{Q(p)}_{\text{units sold}}=(p-c)(1-p).
$$

The whole tension of the problem sits in that expression. Raise the price and each unit is more profitable; raise it too far and few units sell. **The optimal price balances the two effects.**

Geometry makes it vivid. In the $(Q,p)$ plane demand runs from $(0,1)$ to $(1,0)$ and cost is a horizontal line at height $c$. At price $p$ the rectangle has width $1-p$ and height $p-c$, and its area is profit.

The key observation: the rectangle's "perimeter parameter"

$$
(p-c)+(1-p)=1-c
$$

**does not depend on $p$**. So the monopolist's problem is: given a fixed perimeter, find the rectangle of largest area. The answer is a square, so

$$
p-c=1-p\;\Longrightarrow\;p^\ast=\frac{1+c}{2}.
$$

Check with calculus. By the product rule,

$$
\pi'(p)=\frac{d}{dp}(p-c)\cdot(1-p)+(p-c)\cdot\frac{d}{dp}(1-p)=1\cdot(1-p)+(p-c)(-1),
$$

which simplifies to

$$
\pi'(p)=1-p-p+c=1+c-2p .
$$

Setting it to zero gives $p^\ast=\dfrac{1+c}{2}$. The second derivative is $-2<0$, so this is indeed the maximiser (the function is concave).

Substituting back:

$$
Q^\ast=1-p^\ast=1-\frac{1+c}{2}=\frac{1-c}{2},\qquad
\pi^\ast=\left(\frac{1-c}{2}\right)^{2}.
$$

The price also has an informative decomposition:

$$
p^\ast=\frac{1+c}{2}=c+\frac{1-c}{2}.
$$

The first term is cost; the second is the **markup** — the gap between what you pay and what it costs to produce. Ball's restaurant example: chicken breast you could buy cheaply at a grocery store costs three times as much in a restaurant, and the difference is the markup.

What the expression says is that **a monopolist never prices at cost**, and that the markup shrinks as $c$ rises (a higher cost leaves less absolute room) even though the price itself rises. Both directions are intuitive: expensive things sell for more, but the excess over cost is smaller.

It is also worth confirming that the optimum is interior. At $p=1$ nobody buys and profit is 0; at $p=c$ many buy but nothing is earned per unit and profit is again 0; at $p<c$ revenue falls below cost and profit is negative. All three endpoints are worse than an interior point, and $\pi$ is concave, so the first-order solution is the global maximum. That habit — solve the interior case, then verify the boundary — recurs throughout the applications.

## Cournot competition: quantities chosen simultaneously

Two firms simultaneously decide how many apples to bring to market. **Firms choose quantities; the market sets the price** — exactly the oil example from earlier: the US pumps more, the price falls, and the US takes that price.

Let firm $i$ choose $q_i\ge 0$, market quantity $Q=q_1+q_2$, inverse demand $P(Q)=1-Q$ (truncated at 0 beyond $Q=1$). Firm 1's profit:

$$
\pi_1(q_1,q_2)=q_1\bigl[P(q_1+q_2)-c\bigr]=q_1(1-q_1-q_2-c).
$$

Notice why this is a game: **my profit per unit depends on how much the rival ships**. Every extra ton the rival brings lowers the price and thins my margin. There is no such thing as "my optimal quantity", only "my optimal quantity given the rival's".

A trick recurs here that is worth memorising: maximising $x(a-x)$ with $a>0$ always gives $x=a/2$, since the derivative is $a-2x$. Geometrically it is the square again — the two pieces $x$ and $a-x$ sum to a constant, and the product is largest when they are equal.

Writing $\pi_1$ as $q_1\bigl[(1-q_2-c)-q_1\bigr]$ reveals $a=1-q_2-c$, so

$$
\mathrm{BR}_1(q_2)=\frac{1-q_2-c}{2},\qquad
\mathrm{BR}_2(q_1)=\frac{1-q_1-c}{2}.
$$

Both best-response lines have slope $-\tfrac12$. The economic reading: **each extra unit the rival produces cuts my optimal output by half a unit**. Ball has the room explain the sign — the rival's extra output lowers the price, and at a lower price it is not worth producing as much.

Both lines slope down, a relation called strategic substitutes: you do more, I do less. The sign matters, because it guarantees a single crossing. Written as $q_1$ against $q_2$, one line has slope $-1/2$ and the other $-2$; a shallow line and a steep line cross exactly once, so the equilibrium is unique.

Equilibrium requires each to be best-responding to the other:

$$
q_1^\ast=\frac{1-q_2^\ast-c}{2},\qquad q_2^\ast=\frac{1-q_1^\ast-c}{2}.
$$

Guess symmetry, $q_1^\ast=q_2^\ast=q$, and substitute into one equation:

$$
q=\frac{1-q-c}{2}\;\Longrightarrow\;2q=1-c-q\;\Longrightarrow\;3q=1-c\;\Longrightarrow\;q^\ast=\frac{1-c}{3}.
$$

The price:

$$
p^\ast=1-2\cdot\frac{1-c}{3}=\frac{3-2+2c}{3}=\frac{1+2c}{3}=c+\frac{1-c}{3}.
$$

Isolating the markup gives the first substantive result of the lecture:

| Market structure | Markup |
| --- | --- |
| Monopoly | $\frac{1-c}{2}$ |
| Two-firm Cournot | $\frac{1-c}{3}$ |

Since $\frac{1-c}{3}<\frac{1-c}{2}$, competition compresses the markup. But note that it does **not** compress it to zero: each firm retains some market power, because each understands that producing less would raise the price and thereby benefit the rival. That externality keeps both from expanding to the competitive quantity.

## $n$ firms, and what "efficient" means

Redoing the derivation with $n$ firms gives the general answer, which Ball writes down and says is easy to verify with the same argument:

$$
q_i^\ast=\frac{1-c}{n+1},\qquad
Q^\ast=\frac{n(1-c)}{n+1},\qquad
p^\ast=c+\frac{1-c}{n+1}.
$$

Three things deserve separate attention:

- **Individual output falls in $n$.** The more firms there are, the smaller the residual demand I can capture; the others are already dragging the price down, so there is less point shipping more.
- **Total output rises in $n$.** Since $\frac{n}{n+1}\to 1$, we get $Q^\ast\to 1-c$.
- **Price falls in $n$ and the markup tends to zero.** With $\frac{1-c}{n+1}\to 0$, $p^\ast\to c$.

The limit is perfect competition: price equals marginal cost and the markup vanishes. This also explains why the formula at $n=1$ returns $\frac{1-c}{2}$, precisely the monopoly quantity — with a single firm, choosing price and choosing quantity are equivalent.

So what is special about $1-c$? Ball calls it the **efficient quantity**. To see why, read demand differently: suppose everyone buys at most one unit, so that $Q(p)$ is the number of people whose value is at least $p$. Then

$$
Q(c)=1-c
$$

is the number of people whose value is at least the cost of production. Efficiency requires that a unit be produced exactly when someone values it above its cost. So $1-c$ is the efficient quantity, and the limiting market produces exactly that much and sells to exactly those people.

Any quantity below $1-c$ is inefficient: some people value the good above $c$ and do not get it. Monopoly and Cournot with finitely many firms both sit in that region. This is the lecture's first welfare conclusion, and it is sharper than "prices are too high": **market power shows up as insufficient supply**, which is the same fact viewed from the other side.

## Bertrand competition: prices chosen simultaneously

Swap the strategic variable from quantity to price, keeping everything else. Two firms post prices, all consumers go to the cheaper one, and if prices are equal the market splits by convention. The picture is two shops side by side.

The payoff is therefore piecewise:

$$
\pi_1(p_1,p_2)=
\begin{cases}
0, & p_1>p_2,\\[2pt]
(p_1-c)(1-p_1), & p_1<p_2,\\[2pt]
\dfrac{(p_1-c)(1-p_1)}{2}, & p_1=p_2 .
\end{cases}
$$

This is the **dual** of Cournot: there I chose quantity and the rival's quantity set the price; here I choose price and the rival's price sets my sales.

The best response needs four cases, and this is the part of the lecture that demands care. Fix the rival's price $p_2$.

**Case one: $p_2<c$.** Selling at all loses money, so the goal is to **sell nothing**. Set any price strictly above $p_2$:

$$
\mathrm{BR}_1(p_2)=(p_2,\infty).
$$

There is something counter-intuitive here: I am willing to post a below-cost price, provided the rival is even lower and I make no sales. That is not irrationality, it is the optimal way to avoid a loss.

**Case two: $p_2=c$.** The most I can charge is $c$, so per-unit profit is zero and all I need is not to lose. Charging $c$ itself works: split the market, earn zero on each unit, total zero. Hence

$$
\mathrm{BR}_1(c)=[c,\infty).
$$

Note the **closed** interval, unlike the previous case. The difference: when the rival is strictly below cost, matching means splitting a loss; when the rival is exactly at cost, matching means splitting zero.

**Case three: $c<p_2\le\frac{1+c}{2}$.** Now there is positive profit to take, and I want to be **just barely cheaper**, capturing the whole market. The trouble is that "barely" has no minimum: a dollar cheaper is worse than a cent cheaper, a cent worse than half a cent. So in this range the best response is **empty** — no optimal price exists.

Ball deliberately rings a warning bell here: when a conclusion looks like a mathematical artefact, ask whether the density of the reals is doing the work rather than the economics. He redoes the analysis with prices restricted to a finite grid of cents, and the conclusions are essentially unchanged. The empty set is technical and does not disturb the equilibrium.

**Case four: $p_2>\frac{1+c}{2}$.** The rival's price is absurdly high, so I am effectively a monopolist and should simply charge the monopoly price:

$$
\mathrm{BR}_1(p_2)=\left\{\frac{1+c}{2}\right\}.
$$

The reason: undercutting by a hair would leave a price so high that nobody buys. Charging the monopoly price is both below the rival (so I take the whole market) and the best profit available.

Assembling the four cases leaves a unique equilibrium:

$$
p_1^\ast=p_2^\ast=c .
$$

Verify it: given a rival at $c$, charging more sells nothing (profit 0), charging less loses money on every unit (negative profit), charging $c$ earns 0. Nothing is strictly better, so it is a Nash equilibrium. Uniqueness takes longer: if both are above $c$, the lower one wants to cut slightly; if they are equal and above $c$, each wants to shave a hair and take everything; if either is below $c$, that firm is losing money and prefers to move to $c$. Every other configuration is eliminated.

![Cournot price falls slowly from the monopoly price 0.6 toward marginal cost 0.2 as firms are added, while Bertrand reaches 0.2 with only two firms](/images/imperfect-competition-markup-en.svg)

*Figure: with the same demand and cost, Cournot needs the number of firms to grow without bound before reaching $c$; Bertrand needs two. Both paths end at the same place, an order of magnitude apart in speed.*

The second substantive conclusion follows: **the competitive outcome that Cournot reaches only in the limit, Bertrand reaches with two firms**. The motive to "cut by a hair and take the entire market" is extremely strong, and it pushes the price all the way to cost. Model choice is therefore not a technicality — with the same two firms, one model predicts a markup of $\frac{1-c}{3}$ and the other predicts zero.

Finally, the boundaries. Bertrand's conclusion rests on three assumptions: perfectly homogeneous products, no capacity constraints, and fully informed consumers. None of the three holds for mobile plans, airlines, or coffee, so observing prices above marginal cost is not a refutation. Ball's stance: both models are reasonable and they disagree sharply, so the intellectual work is deciding which one the market in front of you resembles.

## What this lecture establishes

1. Imperfect competition sits between perfect competition and monopoly, and its marker is **market power**: production or pricing decisions move the market price. Its sources include few firms, location and transport costs, product differentiation, and government-granted exclusivity.
2. The monopolist's optimal price is $p^\ast=\frac{1+c}{2}$, decomposable as $c+\frac{1-c}{2}$: **cost plus a markup**. Geometrically it makes the profit rectangle a square at fixed perimeter.
3. In Cournot, firms choose quantities and the market sets the price. The symmetric equilibrium is $q^\ast=\frac{1-c}{n+1}$ with $p^\ast=c+\frac{1-c}{n+1}$; the markup falls in $n$ and tends to zero.
4. The limiting total output $1-c$ is the **efficient quantity**: everyone who values the good above its cost is served. Monopoly and finite-firm Cournot both undersupply.
5. In Bertrand, firms choose prices and the cheaper one takes the whole market. The unique equilibrium is $p_1=p_2=c$, so two firms already deliver the competitive outcome. The empty best response in the middle range is an artefact of the density of the reals and disappears on a discrete price grid.
6. Both models are reasonable but disagree sharply, so the task is not to pick the "correct" model but to judge which fits the market at hand.

## Check your understanding

**1. With $c=0.2$, what are the monopoly price, the two-firm Cournot price, and the Bertrand price?**

Monopoly: $p^\ast=\frac{1+0.2}{2}=0.6$. Cournot: each produces $q^\ast=\frac{0.8}{3}\approx0.267$, total $0.533$, price $1-0.533\approx0.467$; the formula gives $c+\frac{1-c}{3}=0.2+0.267=0.467$. Bertrand: $p=c=0.2$. Side by side, the markups are $0.4$, $0.267$, $0$ — the skeleton of the lecture.

**2. Why does the monopolist's optimal price make the profit rectangle a square?**

Because the rectangle's sides are $p-c$ (profit per unit) and $1-p$ (units sold), and their sum is always $1-c$, independent of $p$. Maximising area therefore becomes maximising the area of a rectangle with a fixed perimeter, whose solution is a square. Algebraically $p-c=1-p$, so $p=\frac{1+c}{2}$. This is also why the result does not depend on the particular value of $c$.

**3. What does the slope of the Cournot best response $\mathrm{BR}_1(q_2)=\frac{1-q_2-c}{2}$ mean?**

The slope is $-\frac12$: each extra unit the rival produces lowers my optimal output by half a unit. The economics is output substitution — the rival's extra supply depresses the price, and at a lower price less of my own output is worth producing. Note the slope is less than one in absolute value, which is what makes the equilibrium unique: one line has slope $-1/2$, the other $-2$ when written as $q_1$ against $q_2$, so they cross exactly once.

**4. In Bertrand, why is there no best response when $c<p_2\le\frac{1+c}{2}$? What happens on a discrete price grid?**

Because the best thing to do is undercut by as little as possible, and "as little as possible" has no minimum in the reals: any $\varepsilon>0$ can be replaced by $\varepsilon/2$. The set of optimal prices is therefore empty, though a supremum exists (namely $p_2$, which is not attained). Restrict prices to whole cents and the best response becomes "one cent below $p_2$", the set is non-empty, and the equilibrium is still $p_1=p_2=c$. So it is a technical artefact, not a hole in the economics.

**5. Why does Cournot need $n\to\infty$ to approach marginal cost while Bertrand needs only two firms?**

The channel of competition differs. In Cournot firms influence price **indirectly through quantity**, and each bears only part of the resulting price decline — the rest falls on the rival — so each has an incentive to hold back and keep the price up, an incentive that is diluted only slowly as firms are added. In Bertrand firms choose price directly, and a slightly lower price captures the **entire** market, so the gain from cutting is the whole market rather than my share; the incentive is far stronger and runs all the way to cost.

**6. Mobile plans are clearly priced above marginal cost. Does that refute Bertrand?**

No, because Bertrand's conclusion rests on strong assumptions: homogeneous products, no capacity limits, fully informed consumers. None holds for mobile plans — networks differ in quality (differentiation), spectrum and cell sites impose capacity limits (supplement: the lecture does not develop this, it is the standard industrial-organisation reading), plan terms are complex (incomplete information), and building a network is a steep entry barrier. In this lecture's framework those are precisely sources of market power, so a model with differentiation fits better. Ball's position: both models are reasonable, and the question is which one matches the market in front of you.
