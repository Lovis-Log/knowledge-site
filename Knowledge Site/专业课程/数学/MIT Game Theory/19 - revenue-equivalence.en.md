---
slug: "19-revenue-equivalence"
title: "Revenue Equivalence: Why Changing the Rules Leaves the Auctioneer's Take Alone"
summary: "The coincidence from the previous lecture becomes a theorem: in any equilibrium of any generalised auction, a bidder's expected payment depends only on two things — what the lowest type pays, and how the win probability varies with valuation. The formula is then used backwards to solve the all-pay auction and the first price."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "revenue-equivalence"
  - "mechanism-design"
sources:
  - kind: "video"
    title: "Lecture 19: Revenue Equivalence"
    url: "https://www.youtube.com/watch?v=mu0X3GpDAy8"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture ended on an unexplained coincidence: with two bidders and uniform values, first-price and second-price auctions both raise $1/3$ in expectation, and once the argument is generalised to $n$ bidders and an arbitrary distribution, each type's **expected payment** still matches term by term. Ball opens by naming this a puzzle. The rules differ, the bidding differs, so why is the money the same?

This lecture dissolves the puzzle and then marks out its boundaries.

The route is this. First, put the two formats' expected payments side by side and confirm that both equal $\int_{\underline v}^{v_i}x\,g(x)\,dx$, where $g$ is the density of the highest opponent valuation. Then change the question to a more abstract one: **what is an auction**? Ball breaks an auction into three objects — bid sets, an allocation rule, a transfer rule. Once broken up that way, the first price, the second price, the all-pay auction, and even odd rules like "you may only say like or dislike" all fall under one definition.

At that level of abstraction the whole proof uses a single observation: if this is a Bayes-Nash equilibrium, then bidding according to the equilibrium must be weakly better than pretending your type is $v'$ and bidding as that type would. One sentence suffices, because the "pretend" deviation can be written directly in terms of the equilibrium win-probability function $\hat Q$ and expected-payment function $\hat T$. Hence

$$
v\,\hat Q(v)-\hat T(v)\ \ge\ v\,\hat Q(v')-\hat T(v')\quad\text{for all }v',
$$

which says $v$ maximises $v\hat Q(\cdot)-\hat T(\cdot)$. Differentiate, integrate, and out comes the **revenue formula**:

$$
\hat T(v)=\hat T(\underline v)+\int_{\underline v}^{v}x\,\hat Q'(x)\,dx .
$$

No bid set appears in it, no particular allocation rule, no particular transfer rule. Only two things survive: what the lowest type pays, and the shape of the win-probability curve. Add two familiar conditions — the lowest type pays nothing, and the object always goes to the highest valuation — and it collapses into the concrete integral from the previous lecture.

Ball closes by using the formula backwards to solve two equilibria (the all-pay auction and the first price), and with a warning: revenue equivalence compares **one equilibrium** with **another equilibrium**, not one format with another.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Revenue equivalence: a coincidence not yet explained |
| 2:27 | First-price expected payment is bid times win probability |
| 4:24 | The second price needs win probability times the conditional payment |
| 6:20 | Conditional uniformity: given a win, the opponent's expected value is $v_i/2$ |
| 7:37 | Generalising to $n$ bidders and an arbitrary distribution |
| 8:51 | Notation: the distribution $G$ and density $g$ of the highest opponent value |
| 10:56 | The second price's expected payment as an integral |
| 15:35 | The conditional density $g(x)/G(v_i)$ and its normalisation |
| 17:02 | The first price produces the same integral |
| 23:36 | What an auction is: bid sets, allocation rule, transfer rule |
| 26:38 | Allocation as a subprobability: the auctioneer may keep the object |
| 29:02 | Running the first price through $q(3,4)$ and $t(3,4)$ |
| 36:39 | Defining $\hat Q$ and $\hat T$ under equilibrium play |
| 43:08 | The key observation: pretending to be type $v'$ cannot help |
| 54:40 | The first-order condition $v\hat Q'(v)=\hat T'(v)$ |
| 1:02:06 | Two conditions: the lowest type pays zero, the object goes to the highest value |
| 1:08:30 | Application: the all-pay equilibrium bid is $v^2/2$ |
| 1:18:28 | Caveat: the comparison is between equilibria, not formats |

## Putting the two formats side by side

### First-price expected payment

Two bidders, uniform values on $[0,1]$, first-price equilibrium $b_i=v_i/2$.

Expected payment equals bid times win probability. You pay only when you win, and nothing when you lose:

$$
E[\text{payment}\mid v_i]=b_i(v_i)\cdot\Pr(\text{win}\mid v_i).
$$

What is the win probability? The equilibrium is symmetric and the bid function is increasing, so the winner is the bidder with the highest valuation. I win exactly when the opponent's valuation is below $v_i$, which under uniformity has probability $v_i$:

$$
\Pr(\text{win}\mid v_i)=v_i .
$$

Therefore

$$
E[\text{payment}\mid v_i]=\frac{v_i}{2}\cdot v_i=\frac{v_i^2}{2}.
$$

### Second-price expected payment

In the second price everyone bids truthfully. The win probability is again $v_i$ — same allocation rule, same increasing bid function. But the payment can no longer be written as "what I pay times win probability", because **what I pay when I win is random**: it depends on the opponent's bid.

So it has to be split:

$$
E[\text{payment}]=\underbrace{\Pr(\text{win})}_{\text{probability}}\times\underbrace{E[\text{payment}\mid\text{win}]}_{\text{how much, given a win}} .
$$

Winning means paying the second-highest bid, which is the opponent's valuation $v_j$. The conditional expectation is

$$
E[v_j\mid v_j\le v_i].
$$

Since $v_j$ is uniform on $[0,1]$, conditioning on $v_j\le v_i$ leaves it uniform on $[0,v_i]$, whose mean is the midpoint:

$$
E[v_j\mid v_j\le v_i]=\frac{v_i}{2}.
$$

Substituting back,

$$
E[\text{payment}\mid v_i]=v_i\cdot\frac{v_i}{2}=\frac{v_i^2}{2}.
$$

The two sides agree. This is exactly the puzzling finding from the previous lecture: the same type, under two completely different rules, hands over exactly the same expected amount.

## The same fact in a general environment

### Notation

$n$ bidders with valuations $v_i$ independent and identically distributed on $[\underline v,\overline v]$, density $f$, CDF $F$. Define

$$
G(v)=\Pr\Big(\max_{j\neq i}v_j\le v\Big)=F(v)^{\,n-1},\qquad g(v)=G'(v)=(n-1)F(v)^{\,n-2}f(v).
$$

$G$ is the distribution of the highest valuation among everyone except me. It does not depend on $i$, a direct consequence of symmetry: whoever I am, the others are $n-1$ draws from the same distribution. When $n=2$, $g=f$, because "the maximum of the others" is just "the other one".

### The second price: writing the conditional expectation as an integral

Win probability: $\Pr(\text{win})=G(v_i)$.

Conditional payment: given a win, I pay the highest opponent valuation, so

$$
E[\text{payment}\mid\text{win}]=E\Big[\max_{j\neq i}v_j\ \Big|\ \max_{j\neq i}v_j\le v_i\Big].
$$

Write this as an integral using the conditional density. The general fact: if $X$ has density $g$ and CDF $G$, then given $X\le v$ its conditional density is

$$
g(x\mid X\le v)=\frac{g(x)}{G(v)},\qquad x\le v .
$$

The denominator normalises: $\int_{\underline v}^{v}g(x)\,dx=G(v)$, so dividing by $G(v)$ makes the integral equal one, as a conditional distribution must.

Hence

$$
E[\text{payment}\mid\text{win}]=\int_{\underline v}^{v_i}x\,\frac{g(x)}{G(v_i)}\,dx .
$$

Multiplying by the win probability $G(v_i)$, the denominators cancel:

$$
\hat T^{SPA}(v_i)=G(v_i)\cdot\frac{1}{G(v_i)}\int_{\underline v}^{v_i}x\,g(x)\,dx=\int_{\underline v}^{v_i}x\,g(x)\,dx .
$$

### The first price: reuse the previous lecture

The previous lecture solved

$$
\beta(v_i)=\frac{1}{G(v_i)}\int_{\underline v}^{v_i}x\,g(x)\,dx .
$$

In a first-price auction a win means paying your own bid, a fixed number, so

$$
\hat T^{FPA}(v_i)=\beta(v_i)\cdot G(v_i)=\int_{\underline v}^{v_i}x\,g(x)\,dx .
$$

Identical.

### Why this does not look like coincidence

Ball's reading: if the bidding were the same in both formats, revenue would differ; if the rules were the same, revenue would trivially be the same. Both differ, yet the number matches — so something else must be doing the work.

Check on the uniform two-bidder case: $g(x)=1$, $\underline v=0$, so the integral is $\int_0^{v_i}x\,dx=v_i^2/2$, matching the hand calculation. The check is not decoration; a general formula that fails its own special case contains an error.

One distinction matters here: **equal expectations do not mean equal risk**. In the second price the winner's payment is random — it could be $0.01$ or $0.99$. In the first price it is always $v_i/2$, perfectly certain. For risk-neutral bidders the two payments are equivalent; for risk-averse bidders they are not. Ball assumes risk neutrality throughout, and that assumption later becomes a hidden hypothesis of revenue equivalence. The auctioneer, likewise, is assumed to care only about expected revenue, not its variance.

![Left: the three formats' equilibrium bid functions differ completely — the second price is the 45-degree line, the first price is v/2, the all-pay auction is v-squared over 2. Right: the expected payment of each type coincides across all three, at v-squared over 2](/images/revenue-equivalence-bids-vs-payment-en.svg)

*Figure: different rules, different bids, yet the expected payment sits on one and the same curve. That is precisely what revenue equivalence has to explain.*

## What counts as an auction

### Three objects

To state the theorem generally enough, the definition of an auction has to be general enough. Ball breaks it into three pieces:

1. **Bid sets** $B_1,\dots,B_n$: what each bidder is allowed to submit. Real numbers, multiples of five, or merely "like / dislike". Think of them as messages.
2. **Allocation rule** $q:B_1\times\cdots\times B_n\to\Delta$: given a profile of bids, the probability that each bidder gets the object.
3. **Transfer rule** $t:B_1\times\cdots\times B_n\to\mathbb R^n$: given a profile of bids, how much each bidder pays.

The allocation rule takes values in

$$
\Delta=\Big\{(q_1,\dots,q_n):\ q_i\ge 0,\ \sum_i q_i\le 1\Big\},
$$

and note the **weak** inequality. The shortfall $1-\sum_i q_i$ is the probability that the auctioneer keeps the object — bids were too low, the seller was unimpressed, no sale. The freedom looks innocuous but it is what lets the definition cover reserve prices.

The transfer rule does not require that only the winner pays. In an all-pay auction everyone pays their own bid whether they win or not. So $t$ is an arbitrary function with no structure imposed.

Ball explains why the definition is drawn this wide: he lists third-price, fourth-price, all-pay and more, and notes that a theorem holding only for "pay the second-highest bid" would be uninteresting. Opening up bid sets, allocation and transfers turns the claim from "two auctions happen to agree" into "a whole class of auctions must agree under the same equilibrium conditions".

The cost is abstraction; the benefit is that each layer of abstraction corresponds to a real design lever. Bid sets can be restricted to integers (real bidding increments), allocation can hold back a reserve (that shortfall probability), transfers can charge everyone (all-pay). The definition is not mathematical fastidiousness — it is a list of what an auctioneer can actually turn.

### Running the first price through the notation

Take $n=2$ with bid sets equal to the nonnegative reals, and consider the profile $(3,4)$: bidder 1 bids 3, bidder 2 bids 4.

Allocation:

$$
q(3,4)=(0,1),
$$

meaning bidder 1 gets the object with probability 0 and bidder 2 with probability 1, since 4 beats 3.

Transfers:

$$
t(3,4)=(0,4).
$$

Bidder 1 is outbid, receives nothing, pays 0; bidder 2 wins and, under first-price rules, pays her own bid of 4.

Switch to the second price: $q$ is unchanged (same allocation rule) and $t$ becomes $(0,3)$ — the winner pays the second-highest bid, which is 3.

Switch to all-pay: $t$ becomes $(3,4)$ — both pay their own bids, including the loser.

The comparison makes a structural point: **the first and second price differ only in the transfer rule**; the allocation rule is identical. Many auctions share that same allocation rule (give it to the highest bidder) and differ entirely in how they charge.

### Equilibrium

The phrase "expected payment" only means something once an equilibrium is fixed — from the rules alone, without knowing how people bid, no payment can be computed. So the object of the theorem is a Bayes-Nash equilibrium of some generalised auction.

An equilibrium assigns each bidder a bid function

$$
\hat b_i:[\underline v,\overline v]\to B_i,\qquad v_i\mapsto\hat b_i(v_i),
$$

whose range is the abstract $B_i$, not the reals. If $B_i$ is "like / dislike", then $\hat b_i$ says which valuations make me say "like".

Under that equilibrium, define two functions for bidder 1:

$$
\hat Q_1(v_1)=E_{v_2,\dots,v_n}\Big[q_1\big(\hat b_1(v_1),\hat b_2(v_2),\dots,\hat b_n(v_n)\big)\Big],
$$

$$
\hat T_1(v_1)=E_{v_2,\dots,v_n}\Big[t_1\big(\hat b_1(v_1),\hat b_2(v_2),\dots,\hat b_n(v_n)\big)\Big].
$$

Read them as: if my valuation is $v_1$ and I bid $\hat b_1(v_1)$ while everyone else bids their equilibrium amounts, then $\hat Q_1(v_1)$ is my expected probability of winning and $\hat T_1(v_1)$ is my expected payment.

The expectation is over $v_2,\dots,v_n$ only, never over $v_1$ — $v_1$ is the number I know. Ball calls this the most tripping-up part of the notation: the $v_1$ in the formula is a specific number such as 2, while $v_n$ is a random variable.

One more detail: $\hat Q$ contains a probability of a probability. The inner $q_1$ is deterministic given the bid profile, but the profile is random, so $q_1$ is random too and needs an outer expectation. Ball suggests thinking of the inner object as almost always $0$ or $1$, which removes the awkwardness.

## Deriving revenue equivalence

### One observation

The definition of equilibrium says a great deal, but the proof uses a single implication:

> If my true valuation is $v_1$, then bidding $\hat b_1(v_1)$ is weakly better than any other bid — including the equilibrium bid of some other type, $\hat b_1(v_1')$.

Ball stresses that this is a **one-way** implication. We know the equilibrium bid beats everything, hence it beats this particular family. The converse fails: bid functions need not be onto, many bids are never used in equilibrium, and we do not need to compare them.

He also concedes this throws information away: the definition of equilibrium implies more, and we use only part of it. Like having ten equations and using nine. That is fine — nine is enough.

Why this family of deviations in particular? Because it is the only family that can be written directly in terms of $\hat Q$ and $\hat T$. That is the technical fulcrum of the proof.

### Writing the observation as an inequality

Bidding the equilibrium amount yields expected utility

$$
v_1\,\hat Q_1(v_1)-\hat T_1(v_1),
$$

that is, "receive $v_1$ when you win, weighted by the win probability, minus the expected payment". Risk neutrality is doing the work here: only the expectation matters.

Pretending to be type $v_1'$ and bidding $\hat b_1(v_1')$ yields

$$
v_1\,\hat Q_1(v_1')-\hat T_1(v_1').
$$

Note the first factor is still $v_1$: my true valuation has not changed, only my bid. And $\hat Q_1(v_1')$ is by definition the win probability when bidding $\hat b_1(v_1')$, so it substitutes directly.

Equilibrium requires the first to be no smaller:

$$
v_1\,\hat Q_1(v_1)-\hat T_1(v_1)\ \ge\ v_1\,\hat Q_1(v_1')-\hat T_1(v_1')\qquad\text{for all }v_1,v_1'.
$$

### The first-order condition

Fix $v_1$ and read the right side as a function of $v_1'$. The inequality says that function attains its maximum at $v_1'=v_1$. Hence

$$
v_1\in\arg\max_{z}\big[v_1\hat Q_1(z)-\hat T_1(z)\big],
$$

and the first-order condition (differentiate in $z$, evaluate at $z=v_1$) gives

$$
v_1\,\hat Q_1'(v_1)-\hat T_1'(v_1)=0
\quad\Longrightarrow\quad
\hat T_1'(v_1)=v_1\,\hat Q_1'(v_1).
$$

Ball flags a notational trap: $\hat Q_1'$ is a derivative, whereas the prime in $v_1'$ is just part of a name. Renaming $v_1'$ as $z$ changes nothing.

### Integrating

Rename $v_1$ as $x$ and integrate both sides from $\underline v$ to $v_1$:

$$
\hat T_1(v_1)-\hat T_1(\underline v)=\int_{\underline v}^{v_1}x\,\hat Q_1'(x)\,dx .
$$

Hence the **revenue formula**:

$$
\hat T_1(v_1)=\hat T_1(\underline v)+\int_{\underline v}^{v_1}x\,\hat Q_1'(x)\,dx .
$$

That expression carries more information than it appears to. Only two terms sit on the right:

- $\hat T_1(\underline v)$: what the lowest-valuation bidder expects to pay — think of it as an entry fee for participating.
- $\hat Q_1'$: the derivative of the win probability, i.e. how much a marginal increase in valuation raises the chance of winning.

**The bid sets $B_1,\dots,B_n$ do not appear at all.** Neither does the specific allocation rule, nor the specific transfer rule. Every detail has been compressed into the single curve $\hat Q$.

### Two conditions, one special case

Many auction equilibria satisfy two extra properties:

1. **The lowest type pays nothing**: $\hat T_1(\underline v)=0$. The intuition is that the lowest-valuation bidder never wins, and someone who never wins should not pay.
2. **The object goes to the highest valuation**: $\hat Q_1(v)=G(v)$. This is not a property of the rule but of the equilibrium — it holds only when the highest bidder happens to be the highest-valuation bidder, which is true whenever everyone uses the same increasing bid function.

Under those two conditions, $\hat Q_1'=g$ and the formula collapses to

$$
\hat T_1(v_1)=\int_{\underline v}^{v_1}x\,g(x)\,dx ,
$$

exactly the integral from the previous lecture.

Ball stresses the logical layering: **the general formula always holds** (given an equilibrium and differentiability of $\hat Q$); the special case needs extra conditions. So "revenue equivalence only holds under certain conditions" and "the revenue formula is very general" are not in tension — they describe different statements.

### Supplement: reading the formula again

Integrating the revenue formula by parts produces a more transparent form. Supplement: Ball does not spell this out, but it is a rearrangement of the same identity.

$$
\int_{\underline v}^{v}x\,\hat Q'(x)\,dx
=\Big[x\hat Q(x)\Big]_{\underline v}^{v}-\int_{\underline v}^{v}\hat Q(x)\,dx
=v\hat Q(v)-\int_{\underline v}^{v}\hat Q(x)\,dx,
$$

using $\hat Q(\underline v)=0$ (the lowest type cannot win). Substituting back,

$$
\hat T(v)=v\hat Q(v)-\int_{\underline v}^{v}\hat Q(x)\,dx .
$$

So this type's net utility is

$$
v\hat Q(v)-\hat T(v)=\int_{\underline v}^{v}\hat Q(x)\,dx .
$$

In words: **a type's information rent equals the area under the win-probability curve between the lowest type and her own**. Higher valuations enjoy a larger area and therefore more rent. This also explains why, in auction design, raising the win probability and raising revenue pull against each other: pushing $\hat Q$ up increases the integral in the revenue formula, but increases the rent by the same area.

From this angle, revenue equivalence says: as long as you keep $\hat Q$ fixed and charge the lowest type nothing, no matter which rule you use to implement it, rent and revenue are pinned down. Rules can change *how* the allocation is implemented, never *what it is worth*.

## Using it as a tool: the all-pay auction

The revenue formula is not only explanatory; it solves equilibria. Ball uses it on the all-pay auction.

Rules: the allocation rule is the same as the first price (highest bidder wins), but **everyone pays their own bid whether they win or lose**. Intuitively people bid less, since losing still costs money.

Guess a symmetric equilibrium $\beta$ with $\beta(0)=0$ and $\beta$ strictly increasing. Check the two conditions:

- $\beta(0)=0$ means the zero-valuation bidder pays nothing, so $\hat T(0)=0$. ✓
- $\beta$ strictly increasing means the highest bidder is the highest-valuation bidder, so $\hat Q(v)=G(v)$. ✓

Both hold, so the revenue formula gives

$$
\hat T_1(v_1)=\int_0^{v_1}x\,g(x)\,dx .
$$

With two bidders and uniform values, $g(x)=1$, hence

$$
\hat T_1(v_1)=\int_0^{v_1}x\,dx=\frac{v_1^2}{2}.
$$

On the other hand, the all-pay auction has a property no other format here has: **expected payment equals the bid**, because you pay regardless of the outcome.

$$
\hat T_1(v_1)=\beta(v_1).
$$

Equating the two expressions,

$$
\beta(v_1)=\frac{v_1^2}{2}.
$$

Done. Ball calls this the practical payoff of revenue equivalence: the theorem supplies one side, the format supplies the other, and the equilibrium drops out.

## Running it backwards: the first price

The same trick re-derives the first price.

Assume symmetry, $\beta(0)=0$, $\beta$ strictly increasing. Both conditions hold, so

$$
\hat T_1(v_1)=\frac{v_1^2}{2}.
$$

In a first-price auction you pay only when you win, and you pay your own bid, so

$$
\hat T_1(v_1)=\beta(v_1)\cdot\Pr(\text{win})=\beta(v_1)\cdot v_1 .
$$

Setting them equal,

$$
\beta(v_1)\,v_1=\frac{v_1^2}{2}\quad\Longrightarrow\quad \beta(v_1)=\frac{v_1}{2}.
$$

Same answer as the full lecture spent deriving a differential equation. Ball's comment: you can go forwards (solve the equilibrium, then verify revenue equivalence) or backwards (invoke revenue equivalence, then apply the rules). Facing an unfamiliar auction, backwards is often faster, because the revenue formula is universal and only the "format to payment" mapping needs separate thought.

## A caveat that has to be stated

Ball spends his last minutes correcting a common misreading.

People say "the first-price and second-price auctions raise the same revenue". Strictly, that sentence is false. Revenue equivalence compares

> **an equilibrium of one auction** with **an equilibrium of another auction**.

Not "one format" with "another format".

The difference matters because the two conditions — the lowest type pays nothing, and the object goes to the highest valuation — are **properties of an equilibrium, not of a format**. If everyone switched to a different bidding strategy, either condition could fail, and both terms in the formula would move. So different equilibria of the same format can raise wildly different revenue.

This is also why the theorem cannot be read as "auction design does not matter". What it says is: under these conditions, many apparently very different designs converge to the same revenue; once the conditions break, design matters again. The next lecture supplies concrete cases where they break — common values, discrete valuations — and shows what happens then.

## What this lecture establishes

1. With two bidders and uniform values, both formats give every type an expected payment of $v_i^2/2$: the first price as "bid times win probability", the second as "win probability times the conditional payment". Two routes, one destination.
2. In general, the second price's expected payment is $\int_{\underline v}^{v_i}x\,g(x)\,dx$, while the first price's is $\beta(v_i)G(v_i)$ — and the previous lecture already showed that product equals the same integral.
3. An auction decomposes into bid sets, an allocation rule, and a transfer rule; allocation is a subprobability, letting the auctioneer keep the object; transfers need not be paid only by winners.
4. The revenue formula $\hat T(v)=\hat T(\underline v)+\int_{\underline v}^{v}x\hat Q'(x)\,dx$ depends only on the equilibrium win-probability curve and the lowest type's payment, and on nothing else about the rules.
5. Adding "the lowest type pays nothing" and "the object goes to the highest valuation" reduces it to $\int x\,g(x)\,dx$; both are properties of the **equilibrium**, not of the format.
6. Revenue equivalence works as a tool: the all-pay equilibrium $\beta(v)=v^2/2$ and the first-price $\beta(v)=v/2$ both fall out in one step.

## Check your understanding

**1. Why can't the second price's expected payment be written as "what I pay times win probability"?**

Because in a second-price auction "what I pay" is not a constant when I win: it equals the highest opponent bid and varies with their valuation. In the first price a win always costs $\beta(v_i)$, so the multiplication is immediate; in the second price one needs "win probability times the expected payment conditional on winning", with the conditional expectation computed separately. Different forms, same answer.

**2. Why must the denominator in the conditional density $g(x)/G(v)$ be $G(v)$?**

Because a conditional distribution must integrate to one over the conditioning region. Since $\int_{\underline v}^{v}g(x)\,dx=G(v)$, dividing by $G(v)$ normalises it. It is not an arbitrary constant but the necessary factor for redistributing the mass onto $[\underline v,v]$.

**3. Why do the bid sets $B_1,\dots,B_n$ never appear in the revenue formula?**

Because their influence flows entirely through the equilibrium bid functions $\hat b_i$, and those are in turn absorbed into $\hat Q$ and $\hat T$. The formula says: given the win-probability curve and the lowest type's payment, expected payments are pinned down — how the rules and bids produced those curves is irrelevant to it.

**4. Why compare only the deviation "bid as another type would", rather than every possible bid?**

Because only that family can be written directly with $\hat Q$ and $\hat T$: the win probability from bidding $\hat b_1(v_1')$ is, by definition, $\hat Q_1(v_1')$. Comparing all bids would yield more information, but none of it is needed; using a subset is a deliberate trade of information for tractability.

**5. In the all-pay example, why is $\hat T(v)=\beta(v)$ rather than $\beta(v)\cdot G(v)$?**

Because in an all-pay auction you pay your bid whether you win or lose, so payment does not depend on the outcome and the expected payment is the bid itself, with no win probability multiplying it. That is exactly why the format yields the simplest relation and the equilibrium falls out in one step.

**6. What is imprecise about "the first-price and second-price auctions raise the same revenue"?**

It treats formats as the objects of comparison. The accurate statement is "some equilibrium of the first price and some equilibrium of the second price raise the same revenue". The two conditions — lowest type pays nothing, object to the highest valuation — are properties of an equilibrium; change the equilibrium and they may fail, changing revenue. One format can host equilibria with very different revenues.
