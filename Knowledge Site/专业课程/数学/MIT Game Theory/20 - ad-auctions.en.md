---
slug: "20-ad-auctions"
title: "Ad Auctions: Why GSP Invites Shading and VCG Restores Truth"
summary: "Starting from the three hypotheses behind the revenue formula, a wallet auction shows what breaks when private values fail — the winner's curse. Keyword advertising is then modelled as a multi-unit auction with heterogeneous slots, and GSP is compared with VCG: the first charges the next bid and invites shading, the second charges the externality and makes truthful reporting weakly dominant."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "ad-auctions"
  - "vcg-mechanism"
sources:
  - kind: "video"
    title: "Lecture 20: Ad Auctions"
    url: "https://www.youtube.com/watch?v=Myfs7LdkV98"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The lecture has two halves: the first pays a debt left over from the previous one, the second moves to an entirely different application.

The first half sets out the three hypotheses behind the revenue formula: independent private values, values on a continuum, and differentiability of the win-probability function. Ball calls two of them substantive and the third technical. To show why private values matter, he offers a counterexample — the wallet auction, in which two people drop their wallets into a bowl and bid for the total. Now what is in the other person's wallet affects how much the object is worth to me, and private values fail. The consequence is the **winner's curse**: you win precisely because everyone else valued the object low, which means the object is not worth much. Oil lease auctions and government procurement in the 1970s and 80s lost a great deal of money to exactly this.

The second half turns to keyword advertising. These are, in monetary terms, probably the most important auctions in the world: every Google search runs an auction for several ad slots, and hundreds of billions are raised each year. The single-item toolkit does not apply directly, because the objects are **multiple and heterogeneous** — the first slot beats the second, which beats the third.

Ball's model is deliberately spare: $n$ advertisers, $m$ slots, slot $j$ has click-through rate $\alpha_j$ (decreasing), advertiser $i$ values a click at $v_i$, and billing is per click. Then two rules are compared.

**GSP (generalised second price)** is the obvious generalisation: the $k$-th highest bid takes slot $k$ and pays the $(k+1)$-th highest bid. With one item it reduces to the second price, so it looks sensible. It has one fatal flaw: **it no longer rewards truthfulness**. Losing is now a milder punishment — you do not get nothing, you drop one slot. If two slots have similar click-through rates, shading pays well.

**VCG** generalises along a different axis. Instead of asking "pay the next bid", it asks what the second price was really charging: the **externality**. By showing up, I push everyone else from "gets the object" to "gets nothing", and their loss is my payment. In the multi-slot version, occupying slot $j$ pushes everyone below me down one slot, so I should pay the total click-through loss I impose. The result is a weighted average of all lower bids, with weights $(\alpha^{k-1}-\alpha^k)/\alpha^j$ — nonnegative, summing to at most one. The price is therefore strictly below GSP's, the motive to shade disappears, and truthful reporting becomes weakly dominant.

The final fifteen minutes abstract the mechanism: a decision $x$ from some set $X$, each player's value a whole function $v_i:X\to\mathbb R$, reports elicited, the welfare-maximising $x$ chosen, and each player charged "how much better off others could have been" minus "how well off they actually are". That is VCG in general form.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Recalling the revenue formula and its three hypotheses |
| 3:51 | The wallet auction: two wallets in a bowl |
| 5:57 | Why private values fail: another's information enters my valuation |
| 9:44 | Numerical counterexample: $\theta_1=0.4$, $\theta_2=0.3$, paying 0.8 for something worth 0.7 |
| 12:52 | The winner's curse: you win because others estimated low |
| 17:26 | Milgrom's father and the painting business |
| 18:07 | Keyword advertising: organic results versus sponsored slots |
| 21:38 | Why single-item tools fail: multiple heterogeneous objects |
| 22:20 | The model: $n$ advertisers, $m$ slots, click-through rates $\alpha_j$ |
| 29:00 | The rules of GSP |
| 32:21 | Example: $m=2$, $n=3$, bids 7, 8, 5 |
| 36:55 | Shading: dropping one slot costs only a little click-through |
| 40:34 | A different generalisation: charge the externality |
| 46:55 | The VCG payment formula |
| 54:27 | The weights $w_k$ and the telescoping sum |
| 1:02:21 | The extreme case: all slots equally good |
| 1:05:10 | Abstract VCG: decisions, valuation functions, reports |
| 1:14:33 | Truthful reporting is weakly dominant |

## The three hypotheses behind the revenue formula

### The list

The previous derivation used three things, and Ball names each one:

1. **Independent private values.** Independence means one bidder's valuation is statistically unrelated to another's; private values means each bidder knows exactly what the object is worth to her, and information held by others does not enter that valuation. Ball notes that "private" is a misleading word and that "known values" would describe it better.
2. **Values on an interval.** The formula contains an integral, so valuations must be continuously distributed. If a valuation could only be \$1 or \$2, integrating over $[1,2]$ would be meaningless and the formula would fail.
3. **Differentiability of $\hat Q$.** This is a technical hypothesis needed for the first-order condition. Ball is explicit that it is technical: a more involved proof delivers a substantially similar result without it.

The first two are substantive; the third is not. So the interesting question becomes: **when do private values fail**?

### The wallet auction: a deliberately rigged counterexample

The story: two people in a bar each put up their wallet, drop both into a bowl, and bid for the total contents. The higher bid wins the bowl and pays her bid.

The information structure is the point. I know how much is in my wallet, call it $\theta_1$, but not how much is in yours, $\theta_2$. You are symmetrically placed. To keep the comparison clean, let $\theta_1,\theta_2$ be independent and uniform on $[0,1]$ — merely a normalisation, since the real amounts could be scaled arbitrarily.

Why is this not private values? Because "I know $\theta_1$" is not "I know what the bowl is worth". The bowl is worth $\theta_1+\theta_2$, and only you know $\theta_2$. That is, **information held by another bidder directly affects my valuation of the object**. That is the definition of private values failing.

### Where the naive approach goes wrong

A natural fix is to replace the unknown part with its expectation. Since $\theta_2$ is uniform on $[0,1]$ with mean $1/2$, my valuation is

$$
\tilde v_1=\theta_1+\tfrac12 .
$$

Then treat this as an ordinary private-values auction and, in a second-price format, bid $\theta_1+1/2$ truthfully.

Ball kills this with numbers. Let $\theta_1=0.4$ and $\theta_2=0.3$. The naive strategy has bidder 1 bid $0.4+0.5=0.9$ and bidder 2 bid $0.3+0.5=0.8$.

Run the private-values logic: I bid 0.9, I win, I pay 0.8, and I think the bowl is worth 0.9, so I net 0.1. Bidding higher changes nothing (still pay 0.8), bidding lower means losing, so 0.9 is optimal.

**Every step of that is wrong.** The bowl is actually worth $0.4+0.3=0.7$, I paid 0.8, and I lost 0.1.

Which step failed? Treating 0.9 as "my valuation". It is only "the expected value given that I do not know your wallet". And **winning is itself information**: I win because your bid was below 0.9, which means your wallet does not hold much. Condition on that, and the bowl is worth less.

### The winner's curse

Hence the **winner's curse**: you tend to win when the object is worth little.

The mechanism is direct. You win exactly when your bid exceeds everyone else's; your bid is based on your estimate; so winning means your estimate exceeded everyone's. If everyone's estimate is the true value plus noise, then "my estimate is the highest" probably means "I overestimated". Winners therefore tend to overpay.

Ball gives three real examples:

- **Oil leases.** Firms estimate how much oil lies under a tract — Alaska, the Arctic — and bid. Every estimate is noisy. The winner's is the highest of the lot and is therefore probably an overestimate. Firms lost enormous sums this way in the 1970s and 80s.
- **Government procurement.** The government wants a subway and asks firms what they need to be paid, choosing the **lowest** bid. The direction reverses: the winner is whoever estimated cost lowest, i.e. underestimated it, and discovers the overrun after winning.
- **Milgrom's father.** Paul Milgrom, later a Nobel laureate for auction theory, said his father was a painter who complained that every time he won a contract, the job turned out harder than expected. Milgrom wanted to explain that as the lowest bidder his estimate was bound to be low — but his father died before he could. Ball calls it a sad story that illustrates the phenomenon perfectly.

The common structure: **everyone makes noisy estimates, and the winner is the one whose estimate is most biased**. To avoid losses, the bid must build in the fact that winning means having overestimated — that is, shade the valuation down. How far depends on the noise and the number of rivals, which belongs to a more specialised course (Ball points to 14.16 in the spring).

## Keyword advertising: why single-item tools do not transfer

### The setting

Search a term on Google and the page shows **organic results** — the algorithm's judgement of the most relevant pages — alongside **sponsored results**, which advertisers paid for. Users do not always distinguish them, but the difference is that the latter were bought at auction.

Ball's example is vivid: search "Uber" and the top organic result is probably Uber, but the top sponsored result may well be Lyft, because anyone searching for Uber wants a ride and Lyft will pay for that traffic. Uber may buy a slot too, as defence.

Google's key innovation was that **slots respond to the keyword**. Before that, display advertising showed the same banner to everyone, which is worth little; keyword targeting matches intent, and revenue rises sharply. That is why these auctions may be the most important in the world by value.

Note the scope: an entire auction is designed for **one fixed keyword**. A search for Lyft runs one auction, a search for Uber another, and they are unrelated.

### The model

$n$ advertisers ($i=1,\dots,n$) and $m$ slots ($j=1,\dots,m$). Slots are summarised by one number, the **click-through rate** $\alpha_1>\alpha_2>\cdots>\alpha_m$: an ad in slot $j$ is clicked with probability $\alpha_j$.

A strong simplifying assumption lurks here: **the click-through rate depends only on the slot, not on the ad**. Ball concedes this is not quite right — a terrible ad in first place still gets no clicks — but for similar products such as Uber and Lyft it is passable.

A second assumption: advertiser $i$ has a **value per click** $v_i$. A click may or may not lead to a purchase, but its expected value to me is $v_i$. This too simplifies: a click from a bad slot might be worth more because the user really wants you. Ball sets that aside for tractability.

### Two billing conventions

The auction must decide two things: who goes in which slot, and **how money is collected**.

Two conventions dominate:

- **Pay-per-click**: charged only when someone clicks.
- **Pay-per-impression**: charged when the ad is shown, clicked or not.

In Ball's model the two are equivalent, because click-through rates are assumed known exactly — "expected payment = price per click times click-through rate" either way. In a more realistic model with uncertain click-through rates they differ sharply. If my ad might flop, pay-per-click insures me (no clicks, no bill), whereas pay-per-impression leaves me paying for a dud. That is why the industry settled on pay-per-click. Ball also notes the trade-off: too much insurance weakens the incentive to improve the ad — a moral-hazard problem.

Today's lecture uses pay-per-click. A bid $b_i$ means "what I am willing to pay per click".

## Generalised second price (GSP)

### The rules

The obvious generalisation:

- **Allocation**: the $k$-th highest bid takes slot $k$.
- **Payment**: the $k$-th slot pays the $(k+1)$-th highest bid.

The last occupied slot pays the $(m+1)$-th highest bid; if $m=n$, that bid is defined as $0$ and the slot is free. Ball notes that in practice $m$ is usually much smaller than $n$ — many advertisers chasing few slots — so the last slot typically pays something.

### A worked example

Take $m=2$, $n=3$, click-through rates $\alpha_1>\alpha_2$, and bids $b_1=7$, $b_2=8$, $b_3=5$.

- The highest bid, 8, comes from bidder 2, who takes slot 1 and pays the second-highest bid, 7.
- The second-highest bid, 7, comes from bidder 1, who takes slot 2 and pays the third-highest bid, 5.
- Bidder 3, bidding 5, gets nothing.

Using superscripts for slots and subscripts for bidders: $p^1=7$ and $p^2=5$.

### Is truthful bidding still optimal?

In a single-item second price the answer is yes. Here it has to be recomputed.

Let bidder 2's true value per click be 8 and compare two bids.

**Bid 8 truthfully**: take slot 1, pay 7, expected profit

$$
\alpha_1\,(8-7)=\alpha_1 .
$$

**Shade to 6**: now the highest bid is 7 (bidder 1), bidder 2 becomes second-highest, takes slot 2, and pays the third-highest bid, 5, so expected profit is

$$
\alpha_2\,(8-5)=3\alpha_2 .
$$

Which is better depends on the relative sizes of $\alpha_1$ and $\alpha_2$. Shading wins exactly when

$$
3\alpha_2>\alpha_1 .
$$

If the two slots have similar click-through rates, shading is clearly better.

### Where the difference comes from

Ball's summary: in a single-item second price, losing means getting nothing, so there is no room to shade. In a multi-item auction the punishment for losing is milder — you do not get nothing, you **drop one slot**. The cost of dropping is "click-through differential times profit per click", and if the slots are nearly as good as each other that cost is small, so shading is attractive.

One layer deeper: under GSP my optimal bid depends on what others bid, so advertisers must spend real effort guessing rivals. That caused practical trouble — bids can be changed in real time, and bidding behaviour chased itself into cycles. Ball notes that this is why the industry wanted a truth-revealing rule, and also why the transition was feared: in theory the new equilibrium raises the same revenue, but if advertisers have not adjusted and keep bidding the old way, the auctioneer loses money in the interim. A genuine gap between theory and practice.

## VCG: charging the externality

### Rethinking the second price

VCG starts by looking at the second price from a different angle.

Order values $v_1>v_2\ge\cdots\ge v_n$, let everyone bid truthfully, and let me (bidder 1) win. I get $v_1$; everyone else gets nothing.

Now ask: **if I were absent, how well would the others do?** The object would go to bidder 2, worth $v_2$. So with me present the others collectively get 0; without me they could get $v_2$.

The difference $v_2-0=v_2$ is the **externality** I impose: I took the object away from them, and their best arrangement would have given it to bidder 2.

That is exactly what the second price charges. The angle is more fundamental than "pay the second-highest bid", which is why it generalises.

### The slot version

Now there are several slots. Let bids be ordered $b^{(1)}\ge b^{(2)}\ge\cdots\ge b^{(n)}$ and slots $1,\dots,m$ assigned in that order.

I (the highest bidder) take slot 1. If I were absent, bidder 2 would move up to slot 1 and bidder 3 to slot 2 — everyone shifts up one place. Their losses are:

- bidder 2's click-through falls from $\alpha_1$ to $\alpha_2$, a loss of $b^{(2)}(\alpha_1-\alpha_2)$;
- bidder 3's falls from $\alpha_2$ to $\alpha_3$, a loss of $b^{(3)}(\alpha_2-\alpha_3)$;
- and so on.

The total is what I pay.

One technical note: computing the externality requires knowing how much the others value their slots, which we do not observe. VCG's convention is to compute it **as if everyone bid truthfully**, so $b^{(k)}$ is treated as the true per-click value of the $k$-th highest bidder.

### The general formula

The expected payment of the occupant of slot $j$ equals the externality imposed on everyone below:

$$
\alpha^{j}p^{j}=\sum_{k=j+1}^{n}b^{(k)}\big(\alpha^{k-1}-\alpha^{k}\big).
$$

The left side is "price per click times click-through rate = expected payment"; the right side is the externality. Dividing by $\alpha^j$,

$$
p^{j}=\sum_{k=j+1}^{n}b^{(k)}\,\frac{\alpha^{k-1}-\alpha^{k}}{\alpha^{j}}
=\sum_{k=j+1}^{n}w_k\,b^{(k)},
\qquad
w_k=\frac{\alpha^{k-1}-\alpha^{k}}{\alpha^{j}} .
$$

### What the weights are

First the sign: $\alpha^{k-1}>\alpha^{k}$ because higher slots are clicked more, so every $w_k>0$. The price is a **weighted average of all bids below mine**, with strictly positive weights.

Now the total. Summing from $k=j+1$ to $n$,

$$
\sum_{k=j+1}^{n}w_k
=\frac{(\alpha^{j}-\alpha^{j+1})+(\alpha^{j+1}-\alpha^{j+2})+\cdots+(\alpha^{n-1}-\alpha^{n})}{\alpha^{j}}
=\frac{\alpha^{j}-\alpha^{n}}{\alpha^{j}} .
$$

Every interior term cancels: the **telescoping sum** Ball points out. The result is at most 1, with equality exactly when $\alpha^n=0$. If there are fewer slots than bidders, treat every position beyond $m$ as a fictitious slot with click-through rate zero, and the weights sum to exactly 1 — a genuine weighted average.

### Comparing with GSP

| | Price |
| --- | --- |
| GSP | $p^{j}=b^{(j+1)}$, the next bid only |
| VCG | $p^{j}=\sum_{k>j}w_k b^{(k)}$, a weighted average of all lower bids |

Since $b^{(j+1)}$ is the largest of the terms being averaged and the weights sum to at most one,

$$
p^{j}_{VCG}\le b^{(j+1)}=p^{j}_{GSP}.
$$

**VCG charges strictly less** unless every lower bid equals $b^{(j+1)}$.

That explains both phenomena at once. GSP charges too much, so shading pays; VCG shades on your behalf and then charges you, so there is nothing left to gain from shading — truthful bidding is weakly dominant.

![For the same bids, GSP pins the price to the next bid while VCG charges a weighted average of all lower bids, so the VCG price lies inside that interval and is strictly lower](/images/ad-auctions-gsp-vs-vcg-en.svg)

*Figure: where the two rules differ. GSP takes the left end of the interval (the highest of the lower bids); VCG takes a weighted average inside it. A lower price removes the motive to shade.*

### The extreme case: identical slots

Ball offers a sharp sanity check. Suppose there are $n$ advertisers and $n$ slots, and every slot has the same click-through rate. Strictly this violates decreasing $\alpha$, but read it as a limit.

Now there is **no scarcity**: my slot does not matter, and nobody is competing for anything.

- Under GSP, what happens? I shade all the way to 0, because bidding 0 still gets me an equally good slot. Shading is total.
- Under VCG? All the $\alpha$ are equal, so every weight $(\alpha^{k-1}-\alpha^{k})/\alpha^{j}=0$, and the price is identically 0.

Revenue is 0 either way, but for different reasons: GSP because everyone has a strong incentive to bid 0, VCG because the mechanism computes 0 directly. Ball's phrasing is neat: VCG shades on your behalf, shades all the way to zero, and therefore you are willing to tell the truth. There is no free lunch — the price is low because nothing should be charged, not because the mechanism is generous.

## Abstract VCG

### The environment

The last fifteen minutes generalise the mechanism. Let the decision $x$ lie in some set $X$. Here $x$ is a **collective decision**: not "bidder 1 gets slot 1" but the complete assignment of bidders to slots. Other examples: assigning aircraft to airport gates, routing packets through a network.

Each player's valuation is no longer a number but a whole function

$$
v_i:X\to\mathbb R,
$$

specifying how much utility I get if society chooses $x$. Ball notes the cost of this generality: it even allows preferences over others' allocations — I might enjoy watching a rival get a bad slot — because $v_i$ may depend on the entire configuration, not just my own component. Imposing more structure would simplify things, but the definition would be less general.

### The mechanism

The mechanism asks each player to **report** a valuation function $\hat v_i$. That report is essentially a bid: in a second price we say "bid your valuation", and in VCG the sentence becomes literal — what you report is your valuation function.

Then the mechanism does two things.

**Allocation**: choose the decision maximising the sum of reports,

$$
x^{*}(\hat v)\in\arg\max_{x\in X}\sum_{i}\hat v_i(x).
$$

What we would really like is to maximise the sum of true valuations, but those are unobservable, so reports stand in. If several maximisers exist, any of them will do; they are all efficient.

**Payment**: charge $i$ the externality imposed on everyone else,

$$
t_i(\hat v)=\max_{x\in X}\sum_{j\neq i}\hat v_j(x)\;-\;\sum_{j\neq i}\hat v_j\big(x^{*}(\hat v)\big).
$$

Read it as: the first term is how well off the others could be if we ignored me entirely and optimised for them; the second is how well off they actually are under the chosen allocation. The difference is the damage my presence does.

Two properties are worth stating:

- **Nonnegative.** The actual allocation cannot leave others better off than the allocation optimised for them, or "optimal" would be violated. So payments are always $\ge 0$, even though externalities in general economics can have either sign.
- **No knowledge of true values is required.** The whole computation uses reports only, which is what makes the mechanism implementable.

### Truthfulness

**Theorem**: in this mechanism, for every $i$ and every true valuation function $v_i$, reporting $\hat v_i=v_i$ is weakly dominant — whatever anyone else reports.

Ball says the proof is three lines but dense, and leaves it to the notes. Intuitively: your report affects the outcome only through $x^{*}$, which maximises the sum of reports, and what you pay is exactly the loss your report imposes on others. Together these mean that any gain from pretending to want something more is exactly offset by a higher payment. It is the same logic as the single-item second price.

This also closes the arc: second price, then revenue equivalence, then GSP's failure, then VCG's success. The common core is not the specific rule "pay the second-highest bid" but the principle "charge the externality".

## What this lecture establishes

1. The revenue formula needs independent private values, values on a continuum, and differentiability of $\hat Q$; the first two are substantive, the third technical.
2. In a wallet auction private values fail — another's information enters my valuation — so winning is itself bad news. That is the **winner's curse**, and treating an expectation as a valuation loses money systematically.
3. Keyword advertising is a **multi-object, heterogeneous** auction, so single-item tools do not transfer; the primitives are slot click-through rates $\alpha_j$ and per-click values $v_i$.
4. GSP gives slot $k$ to the $k$-th highest bid and charges the $(k+1)$-th. Because losing only costs you one slot, shading becomes attractive and truthful bidding is no longer an equilibrium.
5. VCG charges the externality: the price is a weighted average of all lower bids with weights $w_k=(\alpha^{k-1}-\alpha^k)/\alpha^j$, nonnegative and summing to $(\alpha^j-\alpha^n)/\alpha^j\le 1$, hence strictly below GSP.
6. Abstract VCG works for any collective decision problem: choose the welfare-maximising $x$, charge "what others could have had minus what they got", and truthful reporting is weakly dominant.

## Check your understanding

**1. In the wallet auction, why is "I won" bad news?**

Because winning means my bid exceeded everyone's, and my bid was based on "my wallet plus the expected contents of yours". Winning therefore means your bid was low, hence your wallet is light. But the bowl is worth the sum of both, so winning correlates with the bowl being worth little. It is not bad luck but a selection effect: the cases in which I can win are exactly the cases where the object is cheap.

**2. With $\theta_1=0.4$ and $\theta_2=0.3$, how much does bidder 1 lose under the naive strategy?**

She bids $0.4+0.5=0.9$ while the opponent bids $0.3+0.5=0.8$. She wins and pays 0.8, but the bowl is truly worth $0.4+0.3=0.7$, so she loses $0.8-0.7=0.1$. Note she believes she is gaining $0.9-0.8=0.1$; the sign is reversed, and the entire error comes from treating the expectation 0.9 as a valuation.

**3. In the GSP example with $m=2$, $n=3$ and bids 7, 8, 5, who gets what and who pays what?**

Bidder 2, bidding 8, takes slot 1 and pays the second-highest bid, 7. Bidder 1, bidding 7, takes slot 2 and pays the third-highest bid, 5. Bidder 3, bidding 5, gets nothing and pays 0. Hence $p^1=7$ and $p^2=5$.

**4. If bidder 2's true value is 8 in that example, when does she prefer shading to 6?**

Bidding 8 truthfully gives $\alpha_1(8-7)=\alpha_1$. Shading to 6 drops her to slot 2 and makes her pay 5, giving $\alpha_2(8-5)=3\alpha_2$. Shading is better exactly when $3\alpha_2>\alpha_1$, i.e. $\alpha_2>\alpha_1/3$. The closer the two click-through rates, the more profitable the shading.

**5. Why do the VCG weights sum to at most one?**

Because $w_k=(\alpha^{k-1}-\alpha^k)/\alpha^j$ forms a telescoping sum: interior terms cancel and only $(\alpha^j-\alpha^n)/\alpha^j=1-\alpha^n/\alpha^j$ survives, which is at most 1 with equality iff the last slot has click-through rate zero. A total below one means the price is strictly below what it would be if every lower bid equalled $b^{(j+1)}$ — that is, strictly below GSP.

**6. When all slots are identical, both GSP and VCG raise zero. What is the difference?**

The difference is **why** it is zero. Under GSP the rule is "pay the next bid", so bidders shade to 0, since bidding 0 still wins an equally good slot; the zero is the outcome of strategic shading. Under VCG the weights are all zero, so the mechanism computes 0 directly and nobody needs to shade. Truthful bidding therefore remains optimal under VCG while it is severely exploited under GSP. The point of mechanism design is not to collect more but to make honesty costless.
