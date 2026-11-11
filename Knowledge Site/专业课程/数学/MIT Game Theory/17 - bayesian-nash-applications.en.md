---
slug: "17-bayesian-nash-applications"
title: "Applying Bayesian Nash Equilibrium: Cournot under Unknown Demand and Sealed-Bid Auctions"
summary: "Two concrete problems put last lecture's definition to work: solving Cournot when the demand intercept is a firm's private type, and showing why the symmetric linear equilibrium of a first-price sealed-bid auction asks each bidder for only half of her valuation."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "bayesian-nash-equilibrium"
  - "auctions"
sources:
  - kind: "video"
    title: "Lecture 17: Bayesian Nash Equilibrium: Applications"
    url: "https://www.youtube.com/watch?v=9_jcdMsPomQ"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Last lecture defined Bayesian Nash equilibrium and closed with Ball's own warning that the material is abstract and unlikely to make sense on a first pass. This lecture computes: first Cournot competition under unknown demand, then auctions — one of his favourite topics, which will occupy several lectures.

The Cournot set-up is deliberately restrained. Earlier analysis assumed both firms knew the demand curve exactly, including the price implied by any pair of quantities; that is plainly unrealistic. Now inverse demand is $P=\theta-Q$ and the intercept $\theta$ is private information: firm 1 observes it, firm 2 does not. Ball's story is that firm 1 is an experienced incumbent that reads fashions and can forecast demand, while firm 2 is a new entrant without the data or the experience. This is especially realistic for a new product — nobody knows how popular it will be.

The auction part begins with why auctions exist at all. Most things are sold at posted prices: coffee, clothes, cinema tickets. Some are auctioned: government bonds, the cars and holidays at a charity gala, Google's ad slots, paintings and antiques. Ball's criterion is **uncertainty**: for a one-of-a-kind antique the seller has no idea what anyone will pay, and posting ten million might leave a fortune on the table; Dunkin' Donuts sells millions of coffees and knows the market price very well. An auction is a price-discovery device.

Then the model: a first-price sealed-bid auction, actually played in class on MobLab. The results are striking — allocation was highly efficient (three groups at 100%, two more at 93% and 82%), but almost everyone bid too high. Repeating the exercise as a second-price auction, bids landed almost exactly on valuations. The contrast between the two experiments puts the incentive difference between the formats on the table.

The lecture closes by solving the simplest first-price equilibrium: two bidders with valuations drawn independently and uniformly from $[0,1]$. Guess a symmetric linear strategy $b=\alpha v$, compute the expected payoff, and the first-order condition delivers $b=v/2$, hence $\alpha=1/2$.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | From definitions to examples: Cournot and auctions |
| 3:09 | Firm 1 observes the demand intercept $\theta$, firm 2 does not |
| 5:05 | A strategy maps types to quantities — it is not a single number |
| 9:34 | BNE: one optimality condition per type |
| 13:31 | Three conditions: two types for firm 1, one for firm 2 |
| 19:41 | Reducing them to first-order conditions |
| 22:28 | Firm 2's output is exactly the average of the two types' outputs |
| 25:10 | Google Ads as the world's largest private auctioneer |
| 29:00 | Why auction at all: price discovery under uncertain willingness to pay |
| 31:22 | The rules of a first-price sealed-bid auction |
| 33:07 | The valuation as the most one would pay |
| 39:19 | Lab result: efficient allocation, but systematic overbidding |
| 40:34 | Second price: the winner pays the second-highest bid |
| 46:15 | Writing the payoff function in three cases |
| 55:18 | Guessing a symmetric linear equilibrium $b=\alpha v$ |
| 1:04:19 | Expected payoff and the win-more versus earn-more trade-off |
| 1:08:15 | The optimal bid is $v/2$, so $\alpha=1/2$ |

## Cournot under unknown demand

The model: two firms, inverse demand $P=\theta-Q$ with $Q=q_1+q_2$, and zero marginal cost to keep the algebra clean. (Supplement: with a positive cost the form is unchanged; replace each $\theta$ by $\theta-c$ and the first-order condition becomes $q_1=(\theta-c-q_2)/2$, with the averaging result intact.) The intercept takes two values $\theta_L<\theta_H$ with probability $1/2$ each, and this distribution is common knowledge.

Firm 1 observes $\theta$; firm 2 does not. The type spaces are

$$
T_1=\{t_L,t_H\},\qquad T_2=\{t_0\},
$$

where $t_L$ means "firm 1 knows demand is low". To save notation we write $q_1(\theta_L)$ and $q_1(\theta_H)$, but the meaning must stay clear: this is the output of the **type who knows the state is $\theta_L$** (respectively $\theta_H$).

**Step one is to work out what a strategy is.** Ball says this is usually the hardest step and the commonest mistake in exams. In reality firm 1 chooses a single number — he wakes up, sees whether demand is high, and sets an output. But a strategy must be a complete contingent plan, so it specifies two numbers:

$$
s_1=\big(q_1(\theta_L),\,q_1(\theta_H)\big),\qquad s_2=q_2 .
$$

Firm 2 has one type, so his strategy is a single number. If firm 1's strategy did not specify both, firm 2 could not form expectations at all: without knowing what the opponent produces in the high state, he cannot compute his best response.

**Step two is to write the equilibrium conditions.** BNE requires optimality at every type of every player, so there are three conditions, not two:

$$
q_1(\theta_L)\in\arg\max_{q_1'}\ q_1'\big(\theta_L-q_1'-q_2\big),
$$

$$
q_1(\theta_H)\in\arg\max_{q_1'}\ q_1'\big(\theta_H-q_1'-q_2\big),
$$

$$
q_2\in\arg\max_{q_2'}\ \tfrac12 q_2'\big(\theta_H-q_2'-q_1(\theta_H)\big)
+\tfrac12 q_2'\big(\theta_L-q_2'-q_1(\theta_L)\big).
$$

The first two are transparent: knowing the state is $\theta_L$, price is computed with $\theta_L$; knowing it is $\theta_H$, with $\theta_H$. Ball stresses that $q_1'$ is just a number, not a function evaluated somewhere, and the prime is not a derivative.

The third deserves a closer look. Firm 2 does not know the state, so he takes an expectation with weights $1/2$ and $1/2$. And the state affects his payoff through **two channels**: it shifts the intercept directly (high demand means a higher price, which helps him), and it shifts firm 1's output (high demand makes firm 1 produce more, which lowers the price and hurts him). The two effects point in opposite directions, which is the most interesting feature of the model. Note also that $q_2'$ inside the brackets is **the same number** in both states: firm 2 cannot observe the state, so he cannot produce more in the high state and less in the low one.

**Step three: first-order conditions.** All three objectives are downward-opening quadratics of the form $q(A-q)$, so the first-order conditions give global maxima and second-order conditions are automatic. For the first two, use the familiar "$q(A-q)$ is maximised at $q=A/2$":

$$
q_1(\theta_L)=\frac{\theta_L-q_2}{2},\qquad
q_1(\theta_H)=\frac{\theta_H-q_2}{2}.
$$

One fact is immediate: $q_1(\theta_H)>q_1(\theta_L)$, since the right-hand sides differ only in $\theta$ while $q_2$ is common. Higher demand means more output, as intuition suggests.

For the third, expand first. The factor $1/2$ does not affect the location of the maximum (just as maximising $3x^2$ and $2x^2$ have the same maximiser), so it can be dropped, and the two pieces combined:

$$
q_2'\big(\theta_H-q_2'-q_1(\theta_H)\big)+q_2'\big(\theta_L-q_2'-q_1(\theta_L)\big).
$$

Differentiating in $q_2'$ and setting to zero:

$$
\theta_H+\theta_L-4q_2-q_1(\theta_H)-q_1(\theta_L)=0,
$$

that is,

$$
q_2=\frac{\theta_L+\theta_H-q_1(\theta_L)-q_1(\theta_H)}{4}.
$$

**Step four: read the structure.** Adding the two first-order conditions gives

$$
q_1(\theta_L)+q_1(\theta_H)=\frac{\theta_L+\theta_H}{2}-q_2 .
$$

Substituting into the expression for $q_2$ yields

$$
q_2=\frac{\theta_L+\theta_H}{6},
$$

and then

$$
\frac{q_1(\theta_L)+q_1(\theta_H)}{2}
=\frac{1}{2}\left[\frac{\theta_L+\theta_H}{2}-q_2\right]
=\frac{1}{2}\left[\frac{\theta_L+\theta_H}{2}-\frac{\theta_L+\theta_H}{6}\right]
=\frac{\theta_L+\theta_H}{6}.
$$

Hence

$$
q_2=\frac{q_1(\theta_L)+q_1(\theta_H)}{2},
$$

which is exactly Ball's remark in class: **the uninformed firm produces the average of the informed firm's two type-contingent outputs**. This matches the ex ante intuition — I face high demand with probability one half and low demand with probability one half, so I plan for the average.

One coincidence is worth recording: in a complete-information game with the intercept set to the mean $\bar\theta=(\theta_L+\theta_H)/2$ and known to both, the symmetric Cournot equilibrium ($n=2$, $c=0$) is $\bar\theta/3=(\theta_L+\theta_H)/6$, precisely $q_2$. Ball calls this a detail, but it shows that "take expectations" here coincides with "run the complete-information analysis at the average parameter".

The ordering is always determined:

$$
q_1(\theta_L)<q_2<q_1(\theta_H).
$$

On the left: $q_1(\theta_L)<q_2\iff(\theta_L-q_2)/2<q_2\iff\theta_L<3q_2=(\theta_L+\theta_H)/2\iff\theta_L<\theta_H$. The right-hand inequality is identical. So "the uninformed firm's output lies between the informed firm's two" is not an artefact of the parameterisation but a necessity. All of this presumes an interior solution: if $\theta_H>5\theta_L$, then $q_1(\theta_L)=(\theta_L-q_2)/2$ comes out negative, the constraint $q_1\ge0$ binds, the low type produces nothing, and both the first-order conditions and the averaging result have to be redone.

## Why auctions

A row of examples first. **Treasury auctions**: when a government borrows it sells debt, and the price — hence the yields you see quoted — is set endogenously by the auction. **Charity auctions**: cars, holidays; Ball notes the game-like element, since people want to display both wealth and generosity, which is why a gala auctions a car rather than posting a price and asking for a donation. **Google ads**: the example nobody volunteers and he always supplies — Google is the largest private auctioneer in the world, earning roughly 250 billion dollars a year from auctions. Most people think of Christie's or Sotheby's; that market is far smaller.

Google's business has two halves: sponsored ads at the top of search results, where firms bid on keywords, and third-party sites — much of what you see advertised on the New York Times is auctioned by Google, with advertisers paying Google and Google passing a share to the site. These ads are extremely targeted by demographic, location and behaviour. Ball remarks in passing that the search algorithm's real contribution was to capture attention, which is then monetised through ads.

So why auction some things and post prices for others? Ball's criterion is **uncertainty about willingness to pay**. For a unique antique the seller has no idea what someone might pay; posting ten million risks leaving fifty million on the table. An auction makes buyers reveal their valuations. Dunkin' Donuts, by contrast, has sold millions of coffees and knows very well what people will pay, and running a live auction for a cup of coffee would be costly — although, as Ball concedes, Google's transactions are tiny too, so small stakes are not an obstacle in principle, just not yet worth doing.

He also flags a direction that is arriving: Google Ads was once the hot new thing, and is now losing ground as everyone uses large language models; there is talk of letting firms bid for "the next token" — you ask a model where to go on holiday, and the sentence naming a destination might be auctioned. Ball says we are not there yet, at least not visibly, but that may be where things go.

## First-price sealed-bid auctions

**Sealed** means bids are not observed: the old-fashioned version puts your number in an envelope for the auctioneer, rather than the movie scene of escalating calls (that is an open outcry auction). **First price** means the winner pays **her own** bid: the highest bidder wins the object and pays what she bid.

The private information is the **valuation** $v_i$: the most the object is worth to me. Ball gives a precise reading — if I win, take the object, and pay exactly my valuation, I am exactly as well off as if I had not won. The valuation is the price at which I break even. That definition matters, because every argument about bidding above your valuation uses it.

The class actually played a round (groups of three, with robots added where the class size did not divide). Three columns: **optimal surplus** (the maximum of the three valuations, i.e. the value created by giving the object to whoever values it most), **realised surplus** (the value actually created), and **revenue** (which under first price is simply the winning bid). Three groups achieved 100% efficiency — the object went to the highest valuation — and two more reached 93% and 82%, meaning the object went to someone who valued it almost as much. Ball notes in passing that optimal surplus is usually above 50 because the maximum of three uniform draws tends to be high; that is extreme-value arithmetic, not a badly formed group.

Revenue showed the classic patterns: one winner bid exactly her valuation (94 out of 94, winning but gaining nothing), one bid 72 against a valuation of 73 and gained a little, and one bid 40 against a valuation of 44 and came away with the largest surplus in the room.

Most telling is the equilibrium line the software draws: **almost everyone bid above the theoretical optimum**. Ball says this is a very common finding in the lab and attributes it to the specification of preferences — people enjoy winning, even when winning leaves them worse off in money terms. He suggests this may be one reason first-price auctions are so common in practice: sellers like high bids.

There is a lesson buried in the anecdote. A student with a low valuation did not gamble on a high bid, and Ball praised the choice: with a low valuation you are unlikely to win, but if you buy the win with an overbid you have lost money — you paid more than the object is worth to you. Winning and profiting are two different things.

## Second price: taking the guesswork out of bidding

The **second-price** rule: the highest bidder wins but pays the **second-highest** bid. The class played again, and this time bids landed almost exactly on the 45-degree line — everyone bidding their valuation. Ball says he was surprised, since this is not the usual lab result (in past years, after being told they had overbid in round one, students would underbid sharply in round two).

Why is bidding your valuation optimal under second price? The key is that **your bid determines whether you win, but not what you pay if you win**. If you win, you pay someone else's bid, and that number must be below your valuation (otherwise you would not have won). So the first-price problem — "bid your valuation and you never make money" — simply does not arise.

There is a practical dividend too: under second price you need not guess how others will bid. Under first price you must estimate the distribution of opponents' bids in order to decide how far to shade; under second price that entire calculation disappears. Ball promises the formal argument next lecture.

## Solving the first-price equilibrium

The model: two bidders $i=1,2$, with valuations $v_i$ drawn independently and uniformly from $[0,1]$. Uniform means the probability of the valuation falling in any subinterval equals its length — the probability of $[0,0.2]$ is $0.2$ — equivalently the density is identically 1. Independent means knowing my own valuation tells me nothing about my opponent's: I still think his is uniform on $[0,1]$. Both submit non-negative bids $b_i$ simultaneously.

The payoff function has three cases, and this trichotomy *is* the definition of a first-price auction:

$$
u_1(b_1,b_2,v_1)=
\begin{cases}
0, & b_1<b_2,\\[2pt]
v_1-b_1, & b_1>b_2,\\[2pt]
\tfrac12(v_1-b_1), & b_1=b_2 .
\end{cases}
$$

The third case is a tie: a coin decides the winner, so the expectation is "one half chance of $v_1-b_1$, one half chance of nothing". With continuous distributions ties have probability zero, so the convention does not matter.

For comparison, under second price only the second case changes, to $v_1-b_2$: the winner pays the opponent's bid. The first case is still 0, and in a tie $b_1=b_2$ so either subscript will do.

A **strategy** is a function of the valuation:

$$
b_i:[0,1]\to\mathbb{R}_{+}.
$$

This step is where the difficulty lies. In the Cournot example firm 1 had two types, so two numbers sufficed; now the type is continuous, so a continuum of numbers must be specified. Ball's image is that a function is a continuous vector. That is also why auction equilibria are hard: one must know not only what a bidder actually bids, but what she would have bid had her valuation been different.

**Guess.** Look for a symmetric equilibrium, in which both bidders use the same function,

$$
b_1(v)=b_2(v)\quad\text{for all } v .
$$

Symmetry does not mean identical bids — the valuations may differ; it means the same valuation produces the same bid. Guess further that the function is linear:

$$
b(v)=\alpha v .
$$

The coefficient should lie between 0 and 1: bids cannot be negative, and one wants to **shade** the bid, so it is below the valuation; higher valuations produce higher bids, so it is positive.

**Check.** Here is a methodological point Ball emphasises: it is not enough to say "if the opponent bids linearly, my best linear bid is also linear", because I could deviate to a **nonlinear** strategy. One must allow an arbitrary $b_1$, compute the best response, and see whether it happens to fall back inside the linear family.

Suppose the opponent uses $b_2(v_2)=\alpha v_2$. My valuation is $v_1$ (known), my bid is $b_1$ (chosen). Expected payoff:

$$
\mathbb{E}\big[u_1(b_1,\alpha v_2,v_1)\big]
=(v_1-b_1)\cdot\Pr\big[b_1>\alpha v_2\big].
$$

Losing pays zero, so only the winning branch matters; the tie branch drops out as well, since $v_2$ is continuous and $\alpha v_2$ equals the fixed number $b_1$ with probability zero — the point made when the payoff function was written down. And $\Pr[b_1>\alpha v_2]=\Pr[v_2<b_1/\alpha]$, which under uniformity equals $b_1/\alpha$, provided $b_1\le\alpha$ — that is, provided I do not bid above the highest bid my opponent could make. That proviso is safe: bidding above $\alpha$ guarantees a win, so raising the bid further only raises the price paid.

Hence

$$
\max_{b_1}\ (v_1-b_1)\frac{b_1}{\alpha}.
$$

Since $\alpha$ is a constant it does not affect the maximiser, and $b_1(v_1-b_1)$ has the familiar $q(A-q)$ shape, maximised at $b_1=v_1/2$. So

$$
b_1^\ast=\frac{v_1}{2}.
$$

One check remains on the proviso used above: at $\alpha=1/2$ the solution satisfies $b_1^\ast=v_1/2\le 1/2=\alpha$ for every $v_1\in[0,1]$, so no type falls into the $b_1>\alpha$ case and $\Pr[b_1>\alpha v_2]=b_1/\alpha$ is valid across the whole type space.

**Matching coefficients.** The guess was $b=\alpha v$ and the best response is $b=v/2$, which is indeed in the linear family with coefficient $1/2$. Consistency requires $\alpha=1/2$, so

$$
b^\ast(v)=\frac{v}{2}
$$

is the symmetric linear equilibrium: both bidders bid half their valuation.

![Left: a triangle between the equilibrium bid line b = v/2 and the 45-degree line where bid equals valuation, showing the shaded surplus; right: with the valuation fixed at 0.8, expected payoff rises then falls, peaking at 0.32 when b = 0.4](/images/bayesian-nash-applications-bid-shading-en.svg)

*Figure: what shading actually gives up. The triangle between the two lines on the left is the part one could have bid but chose not to; on the right, with the valuation fixed, expected payoff is a downward parabola whose peak sits exactly at $v/2$.*

The trade-off behind the result deserves its own paragraph. **Bid higher**: you earn less when you win, but you win more often. **Bid lower**: you earn more when you win, but you win less often. The optimal bid balances the two. The derivative makes it concrete: differentiating $b_1(v_1-b_1)$ gives $v_1-2b_1$, zero at $b_1=v_1/2$, and the second derivative is $-2<0$, so this is a maximum. The expression $v_1-2b_1$ reads as "the marginal benefit of one more unit of bid (a higher chance of winning) minus the marginal cost (less profit when winning)"; the two are equal at $b_1=v_1/2$. Note that the objective is not to win but to earn a lot when winning — bidding the valuation would win more often and earn exactly nothing.

Finally, back to the methodological point: we have only shown that within the linear family the best response is $v/2$. Strictly, one must also rule out nonlinear deviations. Here the objective $(v_1-b_1)b_1/\alpha$ is concave in $b_1$, so the first-order condition identifies the global maximum and the worry dissolves. Ball leaves the verification as an exercise.

## What this lecture establishes

1. The first step in any BNE problem is to work out what a strategy is. Firm 1 has two types, so its strategy must specify two outputs; writing a single number is the commonest mistake.
2. The number of BNE conditions equals the total number of types across all players, not the number of players. In the Cournot example there are three: two for firm 1's types, one for firm 2.
3. The uninformed player optimises against an expectation over the state, and must recognise that the state enters through two channels — the intercept directly, and the informed player's behaviour. The two point in opposite directions.
4. In the Cournot example $q_2=(q_1(\theta_L)+q_1(\theta_H))/2$: the uninformed firm produces the average of the informed firm's two type-contingent outputs, and that average necessarily lies between them.
5. In a first-price sealed-bid auction the bid determines both whether you win and how much you earn if you do; in a second-price auction it determines only whether you win. That is why bidding your valuation is optimal under second price and why shading is required under first price.
6. With two bidders and valuations uniform on $[0,1]$, the symmetric linear equilibrium is $b(v)=v/2$. The verification must allow nonlinear deviations rather than comparing only linear strategies.

## Check your understanding

**1. Why must firm 1's strategy specify two numbers when in reality he picks one output?**

Because a strategy is a complete contingent plan: it says what I would do at each type I might have. In reality he wakes up, sees one state, and picks one number; but firm 2 does not know which state he saw, so it must be able to form an expectation about his output in the high state. With a single number, firm 2 could not compute a best response. This is the commonest mistake in exams.

**2. Why are there three optimality conditions rather than two in the Cournot example?**

Because BNE requires optimality at every type of every player. Firm 1 has two types, giving two independent conditions (one using $\theta_L$, one using $\theta_H$); firm 2 has one type, giving one condition. Three types in total, hence three conditions.

**3. Through which two channels does the state affect firm 2's payoff?**

First the intercept: higher demand raises the price directly, which helps firm 2. Second the opponent's behaviour: higher demand makes firm 1 produce more, which lowers the price and hurts firm 2. The effects work in opposite directions, so one cannot simply say "high demand is good for me". Note also that $q_2'$ is the same number in both states — he cannot condition on a state he does not see.

**4. Why must $q_1(\theta_L)<q_2<q_1(\theta_H)$ hold?**

Use the first-order conditions. $q_1(\theta_L)<q_2$ is equivalent to $(\theta_L-q_2)/2<q_2$, i.e. $\theta_L<3q_2$; since $3q_2=(\theta_L+\theta_H)/2$, this is equivalent to $\theta_L<\theta_H$, which holds. The right-hand inequality is the same argument: $q_2<(\theta_H-q_2)/2$ is equivalent to $3q_2<\theta_H$, again $\theta_L<\theta_H$. So the ordering does not depend on particular numbers.

**5. Which line of the payoff function captures the difference between first and second price?**

The second case ($b_1>b_2$): under first price the winner pays $b_1$ and receives $v_1-b_1$; under second price she pays $b_2$ and receives $v_1-b_2$. The change looks like a single subscript, but it reshapes the incentives: under first price my bid determines both whether I win and how much I earn, and the two forces offset each other, so I shade; under second price the bid determines only whether I win, and what I pay is set by someone else, so bidding my valuation is optimal.

**6. Why can't the verification of $b=\alpha v$ be confined to linear strategies?**

Because equilibrium requires optimality against **all** deviations, including nonlinear ones. Comparing only linear strategies proves merely that this is the best linear strategy, and does not exclude a better nonlinear one. The correct procedure allows an arbitrary $b_1$, derives the best response $b_1=v_1/2$, observes that it happens to lie in the linear family, and matches coefficients to get $\alpha=1/2$.
