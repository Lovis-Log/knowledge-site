---
slug: "18-auctions"
title: "Auctions I: Why the Second Price Tells the Truth, and How Far the First Price Shades"
summary: "Six case-by-case comparisons show that truthful bidding is weakly dominant in a second-price auction; the two formats then turn out to raise the same 1/3 in the uniform two-bidder case. The lecture closes by solving the first-price equilibrium bid function in the symmetric independent private values model, and reading it as the same conditional expectation the second price pays."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "auctions"
  - "revenue-equivalence"
sources:
  - kind: "video"
    title: "Lecture 18: Auctions"
    url: "https://www.youtube.com/watch?v=7dTlS_PLo6I"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture solved a first-price auction in the special case of two bidders whose valuations are independent and uniform on $[0,1]$: the equilibrium is to bid half your valuation. This lecture moves outward from that special case in three steps.

The first step turns "bid truthfully" in a second-price auction from an intuition into a full argument. Ball's method is plain: fix your valuation $v_1$ and an alternative bid $b_1'$ on a number line, then treat the opponent's bid $b_2$ as a parameter you can slide left and right, comparing the two bids in each of three regions. Two regions show no difference at all; one shows a difference, and that difference always punishes the deviation. The conclusion is therefore stronger than "this is an equilibrium": truthful bidding is a **weakly dominant strategy**, optimal no matter what the opponent does.

The second step asks the question an auctioneer actually cares about: which format raises more money? The first price collects the higher of the two bids, but everyone shades; the second price collects the lower bid, but everyone tells the truth. The two effects offset, and expected revenue is $1/3$ either way. Ball explains $E[\max]=2/3$ by bending the unit interval into a circle, and in passing hands over the tidy structure of uniform order statistics.

The third step generalises. SIPV — symmetric, independent, private values — replaces two bidders with $n$ and the uniform distribution with an arbitrary $F$. Inside that model we guess a symmetric, increasing, differentiable bid function $\beta$, write the first-order condition, and obtain a differential equation whose left side, $\beta'(v)G(v)+\beta(v)g(v)$, happens to be the derivative of the product $\beta G$. One integration finishes it.

The solution then admits a striking reading: $\beta(v)$ is the expected value of the highest opponent valuation, conditional on that maximum being no larger than $v$. In a second-price auction the winner's payment has exactly the same conditional expectation. That is the first hint of revenue equivalence, and the subject of the next lecture.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: two bidders, uniform values, $b=v/2$ |
| 2:27 | The second-price payment rule: the winner pays the opponent's bid |
| 3:18 | Graphical argument: cutting the opponent's bid into three regions |
| 5:54 | Bidding above value: the middle region turns a win into a loss |
| 7:54 | Bidding below value: the middle region forfeits a profitable win |
| 10:07 | Conclusion: truthful bidding is weakly dominant |
| 11:58 | Turning to a comparison of the two formats' revenue |
| 14:34 | The circle argument for $E[\max]=2/3$ |
| 17:01 | Second-price revenue is $\min\{v_1,v_2\}$, also $1/3$ in expectation |
| 20:13 | Generalisation: the $k$-th highest has expectation $(n+1-k)/(n+1)$ |
| 21:21 | The four words of SIPV: symmetric, independent, private, interval |
| 27:21 | What "private values" rules out: resale and common values |
| 31:34 | Guessing a symmetric, strictly increasing, differentiable $\beta$ |
| 42:11 | The distribution of the highest opponent value, $G=F^{\,n-1}$ |
| 49:00 | The first-order condition in $b_1$ |
| 53:51 | Substituting $b_1=\beta(v_1)$ to obtain a differential equation |
| 1:04:56 | Solving for $\beta$ and reading it as a conditional expectation |
| 1:18:14 | Matching the second price's conditional payment: the first hint of revenue equivalence |

## The second-price auction: why truth is weakly dominant

### Rules and notation

First-price and second-price auctions share the same allocation rule: the highest bidder takes the object. Only payment differs. In a first-price auction the winner pays her own bid; in a second-price auction she pays the second-highest bid, meaning the highest bid among everyone else:

$$
p^{SPA}=\max_{j\neq i}b_j .
$$

With two bidders, the second-highest bid is simply the lower of the two.

Start with the intuition. If you bid your value $v_1$, then whenever you win you pay $b_2$, and you keep a positive surplus as long as $b_2<v_1$. In a first-price auction, bidding $v_1$ leaves exactly zero surplus when you win — which is why you cannot bid truthfully there. The second price is different because payment is decoupled from the bid.

### Two deviations, six regions

Fix your valuation $v_1$ and consider deviating in either direction. Ball draws the number line and walks through it region by region.

**Bidding above value**, $b_1'>v_1$. Split the opponent's possible bid $b_2$ into three regions:

1. $b_2<v_1$: bidding $v_1$ wins and pays $b_2$; bidding $b_1'$ also wins and also pays $b_2$. **No difference.**
2. $v_1<b_2<b_1'$: bidding $v_1$ loses and pays nothing; bidding $b_1'$ wins but pays $b_2>v_1$, for a net $v_1-b_2<0$. **Strictly worse.**
3. $b_2>b_1'$: both bids lose and pay nothing. **No difference.**

**Bidding below value**, $b_1'<v_1$:

1. $b_2<b_1'$: both win and both pay $b_2$. **No difference.**
2. $b_1'<b_2<v_1$: bidding $v_1$ wins, pays $b_2<v_1$, and nets $v_1-b_2>0$; bidding $b_1'$ loses and gets $0$. **Strictly worse.**
3. $b_2>v_1$: both lose. **No difference.**

Four regions out of six show no difference, two are strictly worse, and none is strictly better. Hence

$$
u_1(v_1,\,b_{-1})\ \ge\ u_1(b_1',\,b_{-1})\quad\text{for all } b_{-1},
$$

so truthful bidding weakly dominates every other bid.

Boundary cases: when $b_2$ equals $v_1$ or $b_1'$ exactly, the tie-breaking rule decides the winner. But a single point carries probability zero and does not affect the expectation; Ball says these points "just add some complications" and skips them. This is also one reason for assuming $\beta$ strictly increasing later — strict monotonicity makes ties a probability-zero event, so they never need discussing.

![Left: when bidding above value, only the region where the opponent's bid falls between v1 and b1-prime makes the deviation worse. Right: when bidding below value, only the region between b1-prime and v1 does](/images/auctions-second-price-deviation-en.svg)

*Figure: cut the opponent's bid into three regions; only the middle one differs, and there the deviation always loses. That is the whole content of weak dominance here.*

### The one property the argument uses

A student asks why raising the bid when the opponent bids very low is not profitable. Ball's answer isolates the key: in a second-price auction, **my bid can affect whether I win, but not how much I pay if I win**. Payment depends only on the opponent's bid.

The first property makes bidding higher valuable — it wins more often. The second guarantees that bidding higher has no side effect beyond winning more often, and the extra wins are precisely the $v_1<b_2<b_1'$ region, where the trade is a loss I should not have made. Conversely, shading saves no money at all; it only forfeits wins I should have had.

The same argument collapses immediately in a first-price auction, where payment equals the bid and both properties fail at once.

It is worth separating "this is an equilibrium" from "this is weakly dominant". Saying truthful bidding is an equilibrium means: if everyone else bids truthfully, I do best by bidding truthfully too. It says nothing about what I should do if others bid wildly. Saying it is weakly dominant means: **whatever others do**, truthful bidding is no worse. The latter is far stronger, because it requires no belief about opponents at all — exactly the "weakest behavioural assumption, safest conclusion" logic from lecture three. The price of that strength is scarcity: in most auctions the optimal bid does depend on what opponents are likely to do.

Note also that the argument uses neither the uniform distribution nor any particular distribution. It uses only the structural fact that the winner's payment is independent of her own bid, and therefore holds for arbitrary value distributions. That robustness is a large part of why second-price logic shows up so often in practice.

## Revenue in the two formats: one third and one third

### Computing each case

Let the auctioneer be risk neutral and care only about expected revenue $\Pi$.

Under the first price, both bidders bid $v_i/2$, so revenue is the higher bid:

$$
\Pi^{FPA}(v_1,v_2)=\max\left\{\tfrac{v_1}{2},\,\tfrac{v_2}{2}\right\}=\tfrac12\max\{v_1,v_2\},
$$

and in expectation

$$
E[\Pi^{FPA}]=\tfrac12\,E\big[\max\{v_1,v_2\}\big].
$$

Under the second price, both bid truthfully and the winner pays the second-highest bid, which is the smaller of the two:

$$
\Pi^{SPA}(v_1,v_2)=\min\{v_1,v_2\},\qquad E[\Pi^{SPA}]=E\big[\min\{v_1,v_2\}\big].
$$

### Bending the interval into a circle

We need $E[\max]$ and $E[\min]$. Ball's geometric argument: glue the two ends of $[0,1]$ together to form a circle of circumference one, identifying $0$ and $1$. The circle now carries three points — $v_1$, $v_2$, and the glued point.

Three points cut the circle into three arcs. Since the valuations are dropped uniformly, the arcs are equal in expectation, each of length $1/3$. Therefore:

- $\min\{v_1,v_2\}$ is the arc from the glued point to the nearer of the two, with expectation $1/3$.
- $\max\{v_1,v_2\}$ is the sum of the remaining two arcs, with expectation $2/3$.

Substituting, $E[\Pi^{FPA}]=\tfrac12\cdot\tfrac23=\tfrac13$ and $E[\Pi^{SPA}]=\tfrac13$.

Ball concedes the argument is "maybe not quite rigorous". Supplement: the rigorous route is direct integration. The maximum has CDF $F_{\max}(v)=v^2$ and density $2v$, so $E[\max]=\int_0^1 v\cdot 2v\,dv=2/3$. The circle's value is not rigour but simultaneity — it delivers $\min$ and $\max$ at once, and generalises by inspection to $n$ points.

### The general pattern: equally spaced order statistics

Sort $n$ independent uniform draws as $v^{(1)}\ge v^{(2)}\ge\cdots\ge v^{(n)}$. Then

$$
E\big[v^{(k)}\big]=\frac{n+1-k}{n+1}.
$$

The maximum is $n/(n+1)$, the minimum is $1/(n+1)$, and consecutive order statistics differ by exactly $1/(n+1)$. On the circle this is $n+1$ equal arcs, with the $k$-th highest equal to the length of $n+1-k$ of them.

Worth memorising, because it turns "how much does one more bidder earn the auctioneer" into a single line: $E[\max]$ climbs from $2/3$ to $3/4$ to $4/5$, always rising, always with diminishing increments.

### The two effects offset

Ball's summary: the first price collects the higher bid but everyone shades; the second price collects the lower bid but everyone tells the truth. The two effects offset exactly, and revenue is $1/3$ either way.

One point is easy to misread: **the offset is exact, not approximate**. If bidders behaved identically in the two formats, revenue would certainly differ — the first price always collects more, since $\max\ge\min$. It is precisely because bidders re-optimise against the rule that the effects cancel. Format and equilibrium behaviour have to be read together; the rules alone tell you nothing.

There is a further structural point worth flagging. The general formula derived later gives, for $n$ bidders with uniform values,

$$
\beta(v)=\frac{n-1}{n}\,v ,
$$

so the shading fraction $1/n$ falls with the number of bidders. Two bidders shade half, three shade a third, ten shade a tenth. The intuition is clean: with more bidders the highest opponent value sits closer to my own, so the gap between the conditional expectation and my valuation narrows, and there is less room to shade. Competition does the auctioneer's shading for her.

Ball stresses that none of this is an artefact of the uniform assumption: "many different auction formats will generate the same expected revenue for the auctioneer", a phenomenon the course returns to later.

## The SIPV model: writing the environment down

### Four words

- **S**ymmetric: every bidder's valuation is drawn from the same distribution $F$. Before the auction nobody is expected to value the object more than anyone else; afterwards some do, but that is a sampling outcome, not an ex ante difference.
- **I**ndependent: $v_1,\dots,v_n$ are statistically independent. Knowing my own valuation tells me nothing about anyone else's. This rules out both positive correlation (one high value makes others high) and negative correlation.
- **P**rivate values: each bidder knows exactly how much she values the object, and other bidders' information does not enter her valuation.
- **V**alues: valuations lie in an interval $[\underline v,\overline v]$ with $0\le\underline v<\overline v$. Non-negativity is safe because a bidder who disliked the object could throw it away.

The distribution is described by a CDF $F$ and density $f$:

$$
F(v)=\Pr(v_i\le v)=\int_{\underline v}^{v}f(x)\,dx,\qquad F(\underline v)=0,\quad F(\overline v)=1 .
$$

"Private values" is the assumption most easily skipped, and it has real content. Ball's example: if the object is a painting I might resell, then other people's opinions about the painting raise my own valuation — the value is no longer private but partly common. SIPV closes that channel. The next lecture uses a wallet auction to show how much rides on closing it, and what happens when it stays open.

Ball also insists that **environment and format are different objects**. The environment — who participates, what each values — is a fact about the world that the auctioneer cannot choose. The format is the set of rules she can choose. Some of revenue equivalence's hypotheses concern the environment, so no amount of rule-tinkering can escape them.

### A strategy is a function

Bidder $i$'s strategy is a bid function

$$
b_i:[\underline v,\overline v]\to[0,\infty),\qquad v_i\mapsto b_i(v_i).
$$

This is where the technical difficulty comes from: the object to be found is not a number but an entire curve, one bid for every possible valuation. In the uniform special case one can guess linearity, $b=\alpha v$, and compress the problem to a single parameter. With a general distribution there is no reason to expect linearity, so a different approach is needed.

Ball's approach is still to guess, but a more disciplined guess: look for a **symmetric, strictly increasing, differentiable** equilibrium, meaning a single $\beta$ used by everyone, with $\beta'>0$.

- Symmetric: the environment is symmetric, so look for a symmetric solution first.
- Increasing: a bidder who values the object more wants it more, so bidding more is natural. Technically it guarantees that the highest bidder is the highest-valuation bidder, a fact used repeatedly below.
- Differentiable: needed to differentiate, hence a technical assumption.

The problem shrinks from "$n$ arbitrary functions" to "one function $\beta$".

## Solving the symmetric first-price equilibrium

### The objective

Stand in bidder 1's shoes. You know your valuation $v_1$, you believe everyone else uses $\beta$, and you bid $b_1$ — a number, not a function. Expected utility is

$$
U_1(b_1\mid v_1,\beta)=(v_1-b_1)\cdot\Pr(\text{win}).
$$

Losing pays zero, so only the winning branch survives. You win when your bid exceeds everyone else's:

$$
\Pr(\text{win})=\Pr\Big(b_1>\max\{\beta(v_2),\dots,\beta(v_n)\}\Big).
$$

The randomness comes from other people's valuations, not from $b_1$; $b_1$ is a number I choose. Ball explicitly corrects the common confusion of seeing $b_1$ inside a probability and assuming it is random.

### Simplifying the win probability

Because $\beta$ is strictly increasing, the highest bidder is the highest-valuation bidder:

$$
\max\{\beta(v_2),\dots,\beta(v_n)\}=\beta\Big(\max\{v_2,\dots,v_n\}\Big).
$$

Let $G$ be the distribution of the highest opponent valuation:

$$
G(v)=\Pr\Big(\max_{j\neq 1}v_j\le v\Big)=\prod_{j=2}^{n}\Pr(v_j\le v)=F(v)^{\,n-1}.
$$

The product step uses independence: the maximum is below $v$ exactly when every draw is. Differentiating with the chain rule,

$$
g(v)=G'(v)=(n-1)F(v)^{\,n-2}f(v).
$$

That $G(v)\le F(v)$ is as it should be: requiring all $n-1$ opponents to fall below $v$ is harder than requiring one.

The win probability becomes

$$
\Pr(\text{win})=\Pr\Big(\beta^{-1}(b_1)\ge\max_{j\neq 1}v_j\Big)=G\big(\beta^{-1}(b_1)\big).
$$

Read $\beta^{-1}(b_1)$ as **the valuation that would bid $b_1$**. I win exactly when every opponent's valuation sits below that threshold. Hence

$$
U_1(b_1\mid v_1,\beta)=(v_1-b_1)\,G\big(\beta^{-1}(b_1)\big).
$$

The trade-off is unchanged: raising $b_1$ lowers the first factor (less surplus when winning) and raises the second (winning more often).

### The first-order condition

Differentiate with respect to $b_1$, using the chain rule and the inverse-function rule $(\beta^{-1})'=1/\beta'$:

$$
\frac{\partial U_1}{\partial b_1}
=-G\big(\beta^{-1}(b_1)\big)+(v_1-b_1)\,g\big(\beta^{-1}(b_1)\big)\cdot\frac{1}{\beta'\big(\beta^{-1}(b_1)\big)}=0 .
$$

Now impose equilibrium. This is the step Ball calls "a little subtle": the expression above is a condition satisfied by the **optimal** bid, and in equilibrium the optimal bid is exactly $\beta(v_1)$. Substituting $b_1=\beta(v_1)$, so that $\beta^{-1}(b_1)=v_1$:

$$
0=-G(v_1)+\frac{\big(v_1-\beta(v_1)\big)\,g(v_1)}{\beta'(v_1)} .
$$

Rearranging and renaming $v_1$ as $v$:

$$
\beta'(v)G(v)+\beta(v)g(v)=v\,g(v).
$$

### Reading the first-order condition without calculus

Before solving, Ball offers a version that needs no derivatives, and it is worth keeping.

Suppose my valuation is $v$ and I am meant to bid $\beta(v)$. Consider raising the bid slightly to $\beta(v)+\varepsilon$ with $\varepsilon>0$ small. By Taylor expansion the extra bid is about $\varepsilon\beta'(v)$.

- **Extra cost**: whenever I win I now pay $\varepsilon\beta'(v)$ more. Winning happens with probability $G(v)$, so expected extra cost is $\varepsilon\beta'(v)G(v)$.
- **Extra benefit**: the higher bid changes the outcome only in one new event — the highest opponent valuation falls in $(v,v+\varepsilon)$. There, bidding $\beta(v)$ loses and the higher bid wins. That event has probability about $g(v)\varepsilon$, and a win is worth $v-\beta(v)$, so expected extra benefit is $(v-\beta(v))\,g(v)\,\varepsilon$.

At an optimum the two must balance:

$$
\varepsilon\beta'(v)G(v)=(v-\beta(v))\,g(v)\,\varepsilon ,
$$

and cancelling $\varepsilon$ returns the same equation. Ball adds that $\varepsilon$ could equally be negative, so "no profitable deviation" forces the two sides to be **equal**, not merely for one to be no larger than the other — which is exactly what setting the derivative to zero delivers.

This reading is more durable than the algebra: it maps each term onto a marginal cost and a marginal benefit, and it can be redone for other auction formats.

### The left side is a product derivative

$$
\frac{d}{dv}\big[\beta(v)G(v)\big]=\beta'(v)G(v)+\beta(v)g(v).
$$

So the equation becomes

$$
\frac{d}{dv}\big[\beta(v)G(v)\big]=v\,g(v).
$$

Integrate both sides from $\underline v$ to $v$:

$$
\beta(v)G(v)-\beta(\underline v)G(\underline v)=\int_{\underline v}^{v}x\,g(x)\,dx .
$$

Since $G(\underline v)=F(\underline v)^{n-1}=0$, the second term vanishes:

$$
\beta(v)=\frac{1}{G(v)}\int_{\underline v}^{v}x\,g(x)\,dx .
$$

Ball cautions that this is only a **necessary** condition. We have shown that *if* an equilibrium of this form exists, $\beta$ must look like this; we have not shown that a $\beta$ of this form is an equilibrium — just as setting a derivative to zero can land on a minimum. He notes the function can be verified to be an equilibrium, with the check left to the notes.

### Checking against the uniform example

Two bidders, uniform $[0,1]$: $n=2$, so $G(v)=F(v)=v$, $g(v)=f(v)=1$, and $\underline v=0$. Substituting,

$$
\beta(v)=\frac{1}{v}\int_0^v x\cdot 1\,dx=\frac{1}{v}\cdot\frac{v^2}{2}=\frac{v}{2}.
$$

This matches the guess from the previous lecture. The check matters: if a general formula fails its own special case, the derivation is wrong. Ball's "phew, we didn't get it wrong" at the board is exactly this test.

### What the formula says

The expression $\beta(v)=\dfrac{\int_{\underline v}^{v}x\,g(x)\,dx}{G(v)}$ is a conditional expectation. Recall the conditional density: given that the highest opponent valuation is at most $v$, the density is $g(x)/G(v)$ — the denominator is the normalising constant that makes it integrate to one over $[\underline v,v]$. Hence

$$
\beta(v)=E\Big[\max_{j\neq 1}v_j\ \Big|\ \max_{j\neq 1}v_j\le v\Big].
$$

In words: **bid the average value of the highest opponent, among the cases where that opponent is no stronger than you**.

This is not "what I expect the opponent to be worth". It is "what the strongest opponent is worth, in the worlds where I can actually win". The two differ a lot: the first is unconditional, the second deletes the worlds where the opponent outbids me, and is therefore lower. That gap is exactly the source of shading.

A student asks what happens if the opponent's valuation is in fact above $v$. Ball's answer: the object is just a function defined for each $v$, a thought experiment. In a real auction the opponent may well be higher, in which case I lose and pay nothing. The formula describes what I bid, not what the opponent is worth.

## The first hint of revenue equivalence

Line the formula up against the second-price auction.

There everyone bids truthfully. I win exactly when $v_1\ge\max_{j\neq1}v_j$. When I win I pay the second-highest bid, which is the highest opponent valuation $\max_{j\neq1}v_j$. Therefore

$$
E[\text{payment}\mid\text{win}]
=E\Big[\max_{j\neq 1}v_j\ \Big|\ \max_{j\neq 1}v_j\le v_1\Big]
=\beta(v_1).
$$

In the first price, a win means paying $\beta(v_1)$, a fixed number.

On one side: pay a random amount whose conditional expectation equals $\beta(v_1)$. On the other: pay $\beta(v_1)$ outright. Same expectation. So **each type of bidder pays the same in expectation**, and the auctioneer's expected revenue is the same too.

Two layers of averaging deserve separating, because conflating them yields false conclusions. The first is **averaging over opponents**: fix $v_1$ and average out the others, giving what this type expects to pay. The second is **averaging over types**: average over $v_1$ according to $F$, giving total revenue. Equivalence holds at both layers, but the first is stronger — it says the payment function is identical type by type, not merely that the totals coincide. Type-by-type equality implies equal totals; the converse fails.

Payment and revenue also deserve separating. A bidder's payment is revenue, but revenue is not only the winner's payment: losers pay zero, so "expected payment" already weights by the probability of winning. In the first price the winner pays $\beta(v_1)$ with probability $G(v_1)$; in the second price the winner pays $\max_{j\neq1}v_j$ with the same probability $G(v_1)$, since the allocation rule is the same. Equal win probabilities plus equal conditional payments give equal unconditional payments.

Ball's phrasing: the bidding is completely different, the distribution of payments is completely different — in the second price it can be any number below $v_1$, in the first it is always $v_1/2$ — yet the conditional expectations coincide. That does not look like coincidence. The next lecture turns it into a theorem resting on two conditions, and shows when those conditions fail.

## What this lecture establishes

1. In a second-price auction, truthful bidding is **weakly dominant**: splitting the opponent's bid into three regions yields two with no difference and one that strictly punishes any deviation.
2. The argument uses a single structural property: **the bid affects whether you win, not what you pay when you win**. That is precisely why it fails in a first-price auction.
3. With two bidders and uniform values, both formats raise $1/3$ in expectation: the first price collects the higher bid but everyone shades, the second collects the lower bid but everyone tells the truth, and the two effects offset exactly.
4. Uniform order statistics are equally spaced: $E[v^{(k)}]=(n+1-k)/(n+1)$, with consecutive gaps of $1/(n+1)$, which the circle argument makes visible at a glance.
5. SIPV pins down the environment — symmetric, independent, private values, values on an interval — and forces the object of study to be a bid *function* rather than a number.
6. The symmetric first-price equilibrium satisfies $\beta(v)G(v)=\int_{\underline v}^{v}x\,g(x)\,dx$, so $\beta(v)$ is the expected highest opponent value conditional on being below $v$; the second price's conditional payment is the same object, which is the first hint of revenue equivalence.

## Check your understanding

**1. Bidding above your value never raises your payment in a second-price auction, so why can it still hurt?**

It cannot raise your payment — when you win you pay the opponent's bid, independent of your own. But it changes *whether* you win. When the opponent's bid falls between $v_1$ and $b_1'$, truthful bidding loses (payoff $0$) while the higher bid wins and pays $b_2>v_1$, a negative net. The harm is not in the price but in completing a losing trade.

**2. With three bidders and uniform $[0,1]$ values, what is the first-price equilibrium bid function?**

$G(v)=F(v)^2=v^2$ and $g(v)=2v$. Then $\beta(v)=\frac{1}{v^2}\int_0^v x\cdot 2x\,dx=\frac{1}{v^2}\cdot\frac{2v^3}{3}=\frac{2v}{3}$. Shading is milder with three bidders ($2v/3$ rather than $v/2$): more competition leaves less room to shade.

**3. Why is $G(v)=F(v)^{n-1}$, and why does $g(v)$ carry an extra factor $(n-1)$?**

$G$ is the probability that all $n-1$ independent opponents fall below $v$, which by independence is $F(v)$ raised to the $n-1$. Differentiating brings the exponent down by the power rule and multiplies by $F'(v)=f(v)$ through the chain rule, giving $(n-1)F(v)^{n-2}f(v)$.

**4. In $\beta(v)=E[\max_{j\neq1}v_j\mid \max_{j\neq1}v_j\le v]$, why condition on "at most $v$" rather than "equal to $v$"?**

Because the event "the highest opponent value equals $v$ exactly" has probability zero, so the conditional expectation would be undefined. The event that corresponds to "I win" is "the highest opponent value is at most $v$". Conditioning on "at most" selects precisely the worlds in which I win; in the others I have already lost and pay nothing.

**5. What is the expected utility of a bidder who bids exactly her valuation in a first-price auction?**

Zero. Winning means paying exactly her valuation, for a net of $0$; losing pays $0$. Bidding $v$ is therefore never strictly better and forfeits all positive surplus. This is why the equilibrium must have $\beta(v)<v$ for $v>\underline v$: any surplus has to be squeezed out by shading.

**6. Both formats raise $1/3$ here — does that mean the choice of format does not matter?**

It does in this example and for these two equilibria, but the conclusion does not generalise freely. Equality relies on symmetry, independence, private values, values on a continuum, and both sides playing the equilibrium. The next lecture makes the point sharp: revenue equivalence compares *an equilibrium* of one auction with *an equilibrium* of another, not one format with another, and different equilibria of the same format can raise very different revenue.
