---
slug: "23-bargaining-incomplete-info"
title: "Bargaining with incomplete information: why deals stall and collapse"
summary: "Complete-information bargaining predicts immediate agreement with no delay, which is the opposite of what we see. Adding private information to the same buyer-seller frame yields four outcomes: the seller extracts all surplus, screening prices, adverse selection that shuts the market down, and price as a signal."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "bargaining"
  - "adverse-selection"
sources:
  - kind: "video"
    title: "Lecture 23: Bargaining with Incomplete Information"
    url: "https://www.youtube.com/watch?v=CFELos-uZbE"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The course built a bargaining model earlier. Its conclusion was suspiciously clean: **whenever agreement is possible, agreement is reached, and it is reached in the first period** — no delay, no breakdown. Reality is full of delay and breakdown: strikes, litigation, divorce, mergers that drag on for years.

Ball's diagnosis is that the missing brick is **complete information**, the assumption that each side knows the other's preferences exactly. Once you admit that "I know more than you do", the offer itself becomes information, and information gets in the way of trade.

His opening example is unusually good: **plea bargaining**. A defendant wants to avoid trial, so he makes a generous offer — plead guilty, serve thirty years. Normally a better offer is more likely to be accepted, but what does the prosecutor think when she hears "I'll take thirty years"? She thinks: **the evidence must be overwhelming**, I win for sure in court, so why give you this discount? The more generous the offer, the more likely it is to be refused. Symmetrically, if the prosecutor offers something extremely lenient — plead guilty and serve six months — the defendant becomes suspicious: **she probably has no case**, and maybe I should go to trial.

This perverse effect is the engine of the lecture: an offer is not only a concession, it is a disclosure. Ball notes that legal scholars use exactly this logic to explain delay and disagreement in bargaining.

He then packs the problem into a minimal frame: one buyer, one seller, one indivisible good, a price $p$. The buyer's value is $v$, the seller's cost is $c$. If they trade, payoffs are $v-p$ and $p-c$; if not, both get zero. All the complexity is pushed into "who knows what", which yields four cases:

1. $v$ and $c$ both public — a review, and the answer is that the seller takes the entire surplus.
2. $c$ public, $v$ private to the buyer — **screening**.
3. The buyer's private information affects both $v$ and $c$ — **interdependent values**, with health insurance as the canonical case, and adverse selection as the consequence.
4. Both $v$ and $c$ private to the seller — **signaling**, with used cars as the canonical case.

One payoff structure, four very different conclusions. That is the elegance of the lecture.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The complete-information prediction: no delay, no breakdown, contrary to fact |
| 1:29 | Plea bargaining: why a generous offer is suspicious |
| 2:01 | Thirty years offered, so the prosecutor infers the evidence is strong |
| 3:00 | Six months offered, so the defendant suspects there is no case |
| 4:05 | Signaling versus screening: does the first mover hold private information |
| 6:59 | The frame: buyer's value $v$, seller's cost $c$, price $p$ |
| 9:20 | Case one: $v$ and $c$ public, solved by subgame perfection |
| 16:14 | The seller posts $p=v$ and takes all the gains from trade |
| 20:47 | Case two: $c$ public, $v$ uniform on $[0,1]$ |
| 23:50 | The buyer buys when $v\ge p$, so the sale probability is $1-p$ |
| 25:05 | Optimal price $p^\ast=(1+c)/2$, and the profit box is a square |
| 31:53 | Case three: interdependent values, the buyer's signal moves $v$ and $c$ |
| 33:10 | Health insurance: healthy people value cover less and cost less to cover |
| 40:28 | Adverse selection: the price selects the costliest customers |
| 52:20 | When $\beta<1/2$ profit falls in price, leaving only "cover everyone" or "exit" |
| 1:00:02 | Case four: the seller is informed, used cars and the market for lemons |
| 1:11:19 | Pooling: $p^\ast\le v^\ast$ together with $p^\ast\ge c_H$ |
| 1:16:18 | Three inequalities pin the pooling price |

## Why complete-information bargaining is too easy

Do the review first, because every later comparison leans on it.

With $v$ and $c$ public, any traded price must satisfy

$$
c\le p\le v .
$$

The left inequality is the seller's: below cost he would rather keep the good. The right one is the buyer's: above her value she would rather walk. That is what **voluntary exchange** means — either side can say no, so only prices that leave both weakly better than their outside option can be traded.

This presumes $v>c$. If $v<c$ there is never any trade; if $v=c$ the only possible price is $p=c=v$, nothing changes hands in utility terms, and the case is uninteresting. When $v>c$ we say there are **gains from trade**: the good moves from seller to buyer, the buyer gains $v$, the seller loses $c$, and the net gain is $v-c$.

The timing is that the seller posts a price and the buyer, seeing it, decides whether to buy. Backward induction:

- The buyer accepts if and only if $v-p\ge 0$, i.e. $p\le v$. Ball adds a technical aside: when indifferent, stipulate that she accepts, which avoids a non-existence problem for the seller's optimum.
- Anticipating this, the seller picks the highest acceptable price, $p=v$.

So the buyer gets $v-v=0$ and the seller gets $v-c>0$. **The seller extracts all the gains from trade.** In the split-the-dollar language, $v-c$ is the dollar on the table and the first mover takes all of it, because he can forecast the second mover's response.

No delay, no breakdown: whenever $v>c$, trade happens in period one. That prediction is far from what we observe, so something new is needed.

## Three information structures

Before the algebra, fix two words, because they recur.

- **Signaling**: the **first mover** holds private information. Her action leaks information, and she anticipates that and exploits it.
- **Screening**: the **second mover** holds private information. The first mover has nothing to leak, but she can **choose an action whose response sorts the other side**. Ball calls it fishing for information: I post a price, and whether you accept tells me who you are.

The distinction maps onto two kinds of bargaining: a seller posting a price to a buyer who knows her own value is screening; a seller who knows the quality of the good and posts a price is signaling.

## Screening: the buyer's value is private

### Setup

The seller's cost $c$ is public (everyone knows the number; it is just a symbol, maybe 0.3, maybe 0.7). The buyer's value $v$ is private, and the seller knows only

$$
v\sim U[0,1],
$$

which is common knowledge. To keep the problem interesting, assume $0<c<1$: $c>1$ means no trade ever, $c<0$ means trade always, and neither is interesting.

Prices can be restricted to $[0,1]$. Anything above 1 is never accepted (values top out at 1), and anything below 0 means paying the buyer to take the good, so neither can be optimal. The same restriction reappears in the insurance model as $[\alpha,\alpha+\beta]$, for the same reason.

### The seller's problem

The buyer buys when $v\ge p$. Since $v$ is uniform, the probability of a sale is just the length of the interval:

$$
\Pr(v\ge p)=1-p .
$$

Expected profit from posting $p$ is unit margin times sale probability:

$$
\pi(p)=(p-c)(1-p).
$$

Two forces pull in opposite directions: a higher price earns more per unit but sells less often. Differentiate:

$$
\pi'(p)=(1-p)-(p-c)=1+c-2p=0
\;\Longrightarrow\;
p^\ast=\frac{1+c}{2}.
$$

A sanity check: $p^\ast$ rises with $c$. Higher cost, higher price, as expected.

### The demand-curve connection

Ball deliberately links this to introductory economics, and it is worth seeing.

Treat the sale probability as quantity demanded: at price $p$ the seller moves $1-p$ units. So the seller faces the demand curve

$$
q=1-p ,
$$

a straight line with slope $-1$. At $p=1$ nobody buys; at $p=0$ everybody does.

The profit box has height $p-c$ and width $1-p$, and its area is profit. At the optimum the box is exactly a **square**:

$$
p^\ast-c=\frac{1+c}{2}-c=\frac{1-c}{2},
\qquad
1-p^\ast=1-\frac{1+c}{2}=\frac{1-c}{2}.
$$

This squareness is an artefact of the uniform distribution, not a general law. Ball stresses the point: change the distribution and the box is no longer square, but "maximize the area" survives.

A more general observation follows: **the shape of demand is the distribution of values**. A demand curve shifting out means more people are willing to buy at any given price, which means values in the population are higher. The different demand curves drawn in an intro course can be read as different value distributions.

## Interdependent values: insurance

### Why the buyer would know the seller's cost

In the previous setup the buyer's private information affected only how much she wanted the good, not how expensive it was to supply. In many settings it affects **both**.

Why would a buyer know the seller's cost? The standard answer is **health insurance**. The "buyer" is an individual purchasing cover; the "seller" is the insurer. The applicant knows her own health status, and that status determines two things at once:

- how much she wants cover ($v$): healthy people need it less, unhealthy people need it more;
- how expensive she is to cover ($c$): healthy people rarely see a doctor, so the insurer pays little; unhealthy people see doctors often, so the insurer pays a lot.

So $v$ and $c$ move together. Ball says this is one reason private insurance markets function poorly and governments are so involved.

### A linear model

Let

$$
c\sim U[0,1],\qquad v=\alpha+\beta c,\quad \alpha\ge 0,\ \beta>0 .
$$

Read $c$ as "how unhealthy": a larger $c$ is more expensive to insure. People lie along the line $v=\alpha+\beta c$: the healthiest has cost 0 and value $\alpha$; the least healthy has cost 1 and value $\alpha+\beta$.

A student asks how, in reality, someone could value a treatment a lot while costing little, or the reverse. Ball's answer is wealth. Fixing a toothache costs the same for everyone, but a billionaire is willing to pay far more than a broke student. The model drops that dimension and keeps a one-dimensional monotone link.

### Adverse selection

The key step: after a price $p$ is posted, who buys?

$$
v\ge p
\;\Longleftrightarrow\;
\alpha+\beta c\ge p
\;\Longleftrightarrow\;
c\ge \frac{p-\alpha}{\beta}.
$$

**Only people whose cost exceeds the threshold buy.** This is **adverse selection**: you post a price and the customers who show up are exactly the ones most expensive to cover.

![At a price of 1 only buyers with cost above 0.45 purchase, and their mean cost is 0.725, far above the 0.45 threshold; each unit of price moves the threshold by 0.5 and lifts mean buyer cost by 0.25](/images/bargaining-adverse-selection-en.svg)

*Figure: buyers are not a random sample but the costliest 55%, which is adverse selection and the reason a price rise moves profit by less than one for one.*

Ball tells the story he tells every year: in the 1990s an airline offered a lifetime unlimited-flying pass, roughly \$200,000 in today's money. The company's arithmetic was that most people do not fly that much. The product was a disaster — one customer bought it and then flew first class around the world almost every day for the rest of his life. The airline ended up in court trying to void the contract.

The logic is adverse selection: the person willing to pay \$200,000 for unlimited flying is not the average traveller but someone who **loves flying**, which is exactly the person for whom the product is most expensive. For Ball himself the airline would probably have made money; for that customer it lost a fortune.

The same logic applies in financial markets. If you hold a mortgage-backed security and someone offers to buy it, the willingness to buy is itself evidence that it is valuable and you are selling too cheap. **Always ask why the other side wants this trade.**

### Getting the expectation right

Now compute profit. The previous formula was margin times sale probability, but $c$ is no longer a constant, it is a distribution. The classic mistake is to use the **population** average cost; the correct object is the average among **buyers**:

$$
\pi(p)=\Big(p-\mathbb{E}\big[c\ \big|\ c\ge \tfrac{p-\alpha}{\beta}\big]\Big)\cdot\Pr\Big(c\ge \tfrac{p-\alpha}{\beta}\Big).
$$

Write $c^\ast=\dfrac{p-\alpha}{\beta}$. Since $c$ is uniform, the conditional expectation is the midpoint:

$$
\mathbb{E}[c\mid c\ge c^\ast]=\frac{1+c^\ast}{2},
$$

and the purchase probability is $1-c^\ast$. Hence

$$
\pi(p)=\left(p-\frac{1+c^\ast}{2}\right)(1-c^\ast).
$$

Ball rewrites it explicitly in $p$ and points at the coefficient on $p$:

$$
\pi(p)=\Big(p\big(1-\tfrac{1}{2\beta}\big)-\tfrac{\alpha}{2\beta}\Big)\big(1-c^\ast\big).
$$

### Why the coefficient is not one

In the baseline model, one more dollar of price means one more dollar of profit per sale: coefficient 1. Here the coefficient is $1-\dfrac{1}{2\beta}$, strictly less than 1.

Two effects are superimposed:

- **Direct effect**: a dollar more per sale.
- **Composition effect**: the higher price pushes the threshold $c^\ast$ right by $\dfrac{1}{\beta}$, replacing the buyer pool with unhealthier people whose mean cost is higher by $\dfrac{1}{2\beta}$.

The net is $1-\dfrac{1}{2\beta}$. In Ball's words: I raise the price by a dollar but I do not make a dollar more, I make only $1-\frac{1}{2\beta}$ more — **I do not get the full dollar**.

Supplementary: with $\alpha=0.1$ and $\beta=2$, the coefficient is $0.75$. At $p=1$ the threshold is $c^\ast=0.45$, mean buyer cost $0.725$, margin $0.275$, sale probability $0.55$, profit about $0.151$. The optimum is near $p=1.37$, with threshold $0.63$, mean cost $0.82$, sale probability $0.37$ and profit about $0.20$. Raising the price does pay, just far less than "a dollar per sale" would suggest.

### How large β is decides whether the market exists

$\beta$ is the sensitivity of value to cost, the slope of the line. It governs how bad adverse selection is:

- $\beta$ **large**: the line is steep, a price change barely moves cost, $1-\frac{1}{2\beta}$ is near 1, and adverse selection hardly matters.
- $\beta$ **small**: someone who values the good slightly more is much costlier, $1-\frac{1}{2\beta}$ is well below 1, and adverse selection is severe.

The extreme case is $\beta<\tfrac12$. Then $1-\dfrac{1}{2\beta}<0$, so **profit decreases in price**: raising the price earns less per sale, because the composition effect dominates the direct effect.

Profit then falls over the whole range, so the optimum is at a corner:

- $p=\alpha$: everyone buys (threshold $c^\ast=0$), i.e. **universal coverage**.
- or sell to nobody, for zero profit.

An intermediate price — a premium plan sold only to part of the market — is never optimal. Ball calls this **market breakdown**: not an absence of equilibrium, but the impossibility of **screening**. You would like to use the price to sort the population, but sorting loses money.

The division of labour between the two parameters is worth remembering: $\alpha$ is a **level effect**, deciding whether this market is worth being in; $\beta$ is a **marginal effect**, deciding what happens when the price is nudged. A large $\alpha$ can keep universal coverage profitable even under severe adverse selection; a small $\alpha$ means no private market survives.

Two boundary questions came up and are worth recording. First, there is no necessary ordering between $\alpha+\beta$ and 1: a cheap operation can hugely improve quality of life, with value far above cost, while an expensive new treatment may help little, with cost far above value. The model only requires the two to move together. Second, someone asks whether disaster insurance is adverse selection. Ball thinks that is mainly a different problem: disasters are **correlated**, one hurricane hits everyone at once, so the risk cannot be diversified within the pool, private insurers cannot carry it, and the state steps in. The issue there is not "who wants to buy" but "the risk is too big to insure".

## Signaling: used cars

### The reversed information structure

The last case moves the private information to the seller: the seller knows the quality of the car, the buyer does not. This is Akerlof's market for lemons.

Here $c$ is best read as the **seller's own valuation**, not a production cost: the person selling knows whether the car rattles, whether it has been in accidents — that is, knows the **quality**. Quality determines both how much the buyer will pay and how much the seller needs.

Quality takes two values, $L$ and $H$ (labels, not numbers), with

$$
c_L<c_H,\qquad v_L<v_H,\qquad c_L<v_L,\qquad c_H<v_H .
$$

The first two say higher quality is worth more to both sides; the last two say both qualities generate gains from trade. The prior puts probability $\pi$ on high quality.

The classic corollary is the conversation: someone tells you "I can't sell my car, but I'll give you a great deal", and the question to ask is "**why is it so cheap**". Cheapness is itself information — it is probably a lemon.

### The pooling equilibrium

Pooling means both qualities are posted at the same price $p^\ast$. Seeing $p^\ast$, Bayes' rule returns the prior, so the buyer's valuation is

$$
v^\ast=\pi v_H+(1-\pi)v_L .
$$

The buyer is willing to buy if $p^\ast\le v^\ast$.

To make the seller unwilling to deviate, the cheapest construction is: **buy at any price below $p^\ast$, refuse any price above it**. Then raising the price gains nothing (nobody buys) and lowering it gains nothing (the sale already happens, at a lower margin). The matching beliefs: below $p^\ast$ the buyer is certain of high quality (which is what makes buying rational there), above $p^\ast$ certain of low quality.

One constraint is easy to miss. The low-quality seller has the lowest cost and is therefore the easiest to satisfy; the binding one is the **high-quality** seller:

$$
c_H\le p^\ast .
$$

Otherwise the high-quality seller would rather not sell. Add the requirement that the price not fall below $v_L$: if $p^\ast<v_L$, the buyer would buy even believing quality is certainly low, so the seller could raise the price slightly without losing any customer. Three inequalities:

$$
v_L\;\le\;p^\ast\;\le\;v^\ast,\qquad c_H\le p^\ast .
$$

### Separation and an impossibility

Separation means $p_L\neq p_H$. Both prices are on-path, so beliefs are pinned: $p_L$ certifies low quality, $p_H$ certifies high.

Ball spends his last two minutes on a neat impossibility argument: **there is no separating equilibrium in which the buyer buys at both prices**.

The reason is short. If the buyer buys at $p_L$ and at $p_H$, both qualities sell for certain. Since both sell for certain, why post the lower price? The low-quality seller switches to $p_H$, and separation collapses.

So a separating equilibrium requires the buyer to buy at $p_H$ only **with some probability**, i.e. to mix, making the high-quality seller indifferent between "a high price that may not sell" and "a low price that certainly sells". Ball leaves the construction to the problem set.

## What this lecture establishes

1. Complete-information bargaining predicts immediate agreement with no delay, the opposite of reality; the missing assumption is that each side knows the other's preferences exactly.
2. Offers carry information. In plea bargaining a generous defendant reveals strong evidence, and a generous prosecutor reveals a weak case — that is where delay and breakdown come from.
3. **Signaling** is private information in the first mover; **screening** is private information in the second. Screening uses "post a price, observe accept or reject" to sort the population.
4. In the baseline case the seller posts $p=v$ and takes the entire surplus $v-c$; the buyer gets zero.
5. Screening yields $p^\ast=(1+c)/2$ with a square profit box, and the shape of the demand curve is the distribution of values.
6. Under interdependent values the price selects the costliest customers (adverse selection), and the coefficient of price on profit drops from 1 to $1-\frac{1}{2\beta}$; when $\beta<\tfrac12$ screening is impossible and only universal coverage or exit remains.

## Check your understanding

**1. In plea bargaining, why is a better offer less likely to be accepted?**

Because the offer is information. A defendant willing to accept a heavy sentence reveals that he expects to lose badly in court — the evidence is strong. The prosecutor compares not "how good is this offer" but "how good is this offer plus what it reveals". If the expected payoff at trial exceeds the offer, she refuses. Symmetrically, a very lenient offer from the prosecutor admits a weak case, and the defendant becomes keener on trial. This turns an offer from a pure concession into a signal, a channel absent from the complete-information model.

**2. In the screening model with $c=0.2$, what is the optimal price and the profit?**

$p^\ast=(1+0.2)/2=0.6$. Then $p^\ast-c=0.4$, sale probability $1-0.6=0.4$, profit $0.16$. The box is a square: height $0.4$, width $0.4$. Check the neighbours: at $p=0.5$ profit is $(0.5-0.2)\times0.5=0.15$; at $p=0.7$ it is $0.5\times0.3=0.15$. So $0.6$ is an interior optimum.

**3. Why can't the adverse-selection model use the population's average cost?**

Because buyers are not random, they **select in**. At a price $p$, only people with values above $p$ buy, and under interdependent values those are exactly the high-cost people. So the average cost among buyers is strictly above the population average. Using the population average systematically understates cost and overstates profit — Ball notes that firms have historically made precisely this mistake.

**4. As β rises, does adverse selection get worse or milder? Why?**

Milder. $\beta$ is the slope of $v$ in $c$: a large $\beta$ means "a bit more value" corresponds to "only a bit more cost", so the composition of buyers is insensitive to price. Algebraically, the effect of price on mean cost is $\dfrac{1}{2\beta}$, decreasing in $\beta$, and the coefficient $1-\dfrac{1}{2\beta}$ approaches 1, the no-adverse-selection benchmark. Conversely, with a small $\beta$, anyone who values the good slightly more is drastically more expensive, and a price rise loses money.

**5. In pooling, why can't $p^\ast$ fall below $v_L$?**

Because if $p^\ast<v_L$ the buyer would buy even under the most pessimistic belief (certainly low quality). The seller could then raise the price slightly above $p^\ast$ and still sell — as long as it stays below $v_L$. That is a profitable deviation, so pooling fails. Hence $p^\ast\ge v_L$ is necessary: below that price there is always room to raise it.

**6. Why is there no separating equilibrium in which the buyer buys at both prices?**

Separation requires different prices for the two qualities. If the buyer buys at both, both qualities sell for certain, so the low-quality (and indeed the high-quality) seller would switch to the higher price — more revenue, same volume. The low price then goes unused and separation disappears. Sustaining separation requires that the high price carry a risk of no sale, which means the buyer must mix. This is the same logic as in Spence: something costly or risky must block imitation.
