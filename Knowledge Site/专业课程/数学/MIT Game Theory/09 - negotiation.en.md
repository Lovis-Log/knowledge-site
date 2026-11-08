---
slug: "09-negotiation"
title: "Negotiation: Alternating Offers, Settlement Thresholds, and the Price of Moving First"
summary: "Writing bargaining as a finite alternating-offer game and solving two models by backward induction: pre-trial settlement predicts agreement in period 0, yet how long talks could have lasted still determines the amount; price haggling gives the first mover v/(1+δ) and the second mover δv/(1+δ) in the limit."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "negotiation"
  - "alternating-offers"
sources:
  - kind: "video"
    title: "Lecture 9: Negotiation"
    url: "https://www.youtube.com/watch?v=_09ziyzbinY"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Negotiation in its everyday form is an exchange of offers: one side proposes, the other refuses and counter-proposes, and after a few rounds a deal is struck or talks collapse. Ball opens with the news of the day — the government has just shut down, which is exactly two party blocs trading offers. This lecture writes that back-and-forth as a game and solves it with last lecture's backward induction.

Two applications: **pre-trial settlement** and **price haggling**. Both feature a cost of delay; they differ in the form the cost takes. In the litigation model the cost is **additive**: each period of negotiation costs each side a lawyer's fee. In the price model the cost is **multiplicative**: each period of waiting shrinks payoffs by a discount factor $\delta$. The two specifications generate different algebra but conclusions of the same shape.

Start with settlement. Ball asks why so many civil cases settle before trial. The room offers lawyers' fees, the cost of delay (a long trial keeps you from productive work), risk aversion (better a certain middling amount than a gamble between a large sum and nothing), and privacy (a trial may expose trade secrets or embarrassing facts). Today's model captures only the **first**: litigation costs plus the cost of negotiating. Risk aversion is explicitly excluded, in order to isolate the cost channel — a familiar modelling trade, pinning down one mechanism before adding others.

One simplification is crucial: **the trial outcome is not uncertain**. Both parties know that if they go to court the judge awards $J$. The dispute is not whether the defendant did wrong but how much is owed, and that number is common knowledge. Ball concedes this is unrealistic, but the baseline is exactly what he wants: if there is not even uncertainty, will bargaining still drag on?

The answer is no — and that "no" is informative, because it tells us that delay in the real world must come from something outside the model.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Negotiation as alternating offers |
| 1:22 | Two models: pre-trial settlement and price haggling |
| 3:56 | Plaintiff and defendant, with the payment flowing from D to P |
| 4:57 | No uncertainty: the award $J$ is known to both |
| 5:59 | Trial costs $\hat C_p$, $\hat C_d$ and per-period costs $c_p$, $c_d$ |
| 7:02 | Timing: periods $0$ to $2n$, trial at $2n$ |
| 11:54 | Backward induction, starting at period $2n-1$ |
| 17:58 | The plaintiff's acceptance threshold $J-\hat C_p$ |
| 22:54 | The defendant offers the lowest acceptable amount |
| 30:52 | $s^\ast_{2n-2}=s^\ast_{2n-1}+c_d$: pay more today, save a period's cost |
| 33:33 | The general pattern: one formula for odd periods, one for even |
| 37:55 | The outcome: settlement in period 0 |
| 41:09 | Why $\hat C_d$ never appears |
| 43:26 | Delay comes from incomplete information, not from costs |
| 44:47 | Price haggling: seller values at 0, buyer at $v$ |
| 53:12 | The last period: the buyer offers 0 |
| 55:21 | Even-period threshold $v-p_t=\delta(v-p_{t+1})$ |
| 1:05:40 | The limit $P_0^\ast=\frac{v}{1+\delta}$ and the first-mover advantage |

## Why settle: costs and timing

Two parties: the **plaintiff**, who is suing and wants as much as possible, and the **defendant**, who is being sued and wants to pay as little as possible. A settlement is a transfer from the defendant to the plaintiff.

Four costs, which must be kept apart:

- **Trial costs** $\hat C_p$ (plaintiff) and $\hat C_d$ (defendant), paid **only if the case actually goes to trial**.
- **Per-period negotiation costs** $c_p$ and $c_d$, paid **in every period of negotiation** until a settlement or a trial.

Ball explains the hats: capital and lowercase letters are indistinguishable on the board, so hats mark the trial costs. The distinction is the skeleton of the model — trial costs are one-off and occur only at the end, while negotiation costs are a flow that accumulates with time.

The timing is as follows. Periods are numbered $0,1,2,\dots,2n-1$, and the trial date is fixed at period $2n$. So there are at most $n$ rounds of offers ($2n$ periods) before trial. **The plaintiff proposes in even periods and the defendant in odd periods**, with the plaintiff opening in period 0.

Within a period: the proposer names a number, the responder accepts or rejects. Acceptance ends the game; rejection moves to the next period with the roles swapped. At period $2n-1$ the defendant makes a final offer and the plaintiff accepts or rejects; **a rejection here goes straight to trial** — there is no further round.

Ball explains why alternating offers rather than simultaneous bids or a one-shot auction: it is the most common format in reality. One side proposes, the other either accepts or counters with something better for itself, for several rounds. Writing it as a game leaves an "accept or continue" decision point in every round, and those decision points are exactly what backward induction processes one at a time.

Counting the costs takes care. Settle in period 0 and each side pays the per-period cost once. Settle in period 3 and, counting from 0, that is four periods, so four times the cost. Bargain all the way to trial and each side pays $2n$ periods of negotiation cost plus the trial cost. Ball flags this off-by-one as the easiest place to slip.

## The last step: the plaintiff's threshold

Backward induction starts at the very end, and the very end is not "period $2n-1$" but "the moment in period $2n-1$ when the plaintiff decides". Ball splits the final period in two and solves the second half first.

Suppose the defendant offers $s_{2n-1}$. The plaintiff's two options:

$$
\text{accept}:\ s_{2n-1}-c_p\cdot 2n,\qquad
\text{reject}:\ J-\hat C_p-c_p\cdot 2n .
$$

Both sides carry $c_p\cdot 2n$, because those fees are already paid whether the offer is accepted or rejected. This is precisely a **sunk cost**: it affects the total but not the comparison at hand. Ball circles it and strikes it out — the only thing to weigh is whether to pay the trial cost $\hat C_p$ on top.

The acceptance condition therefore reduces to

$$
s_{2n-1}\ \ge\ J-\hat C_p .
$$

The threshold is $J-\hat C_p$, a full trial cost below the $J$ available in court. The economics is plain: **the plaintiff accepts less than the judgment because she saves the trial fee**. The larger $\hat C_p$, the weaker her bargaining position and the lower the price she will take.

One technical detail: what if the offer equals the threshold exactly? Ball adopts the convention that **a player accepts when indifferent**. This is not idle: without it the equilibrium may fail to exist, since at the threshold the responder's best response is multi-valued.

Given that threshold, the defendant's optimal offer is **exactly the threshold**:

$$
s^\ast_{2n-1}=J-\hat C_p .
$$

Offer more and it is accepted but money is wasted; offer less and it is rejected, and going to court costs $J$ plus $\hat C_d$ — worse. That "worse" deserves verification, since a defendant might want its offer refused (to look tough). Compute: rejection costs $J+\hat C_d+c_d\cdot 2n$, while offering the threshold and being accepted costs $J-\hat C_p+c_d\cdot 2n$. The former exceeds the latter by $(\hat C_p+\hat C_d)$, paying both trial costs, so it is strictly worse. This "double penalty" observation recurs: **having an offer rejected is never good for the proposer**, because it pays both the higher award and its own trial cost.

## Working backwards: the recursion and the settlement amount

Move back to period $2n-2$, where the plaintiff proposes and the defendant responds.

The defendant's preferences run the other way: he accepts a **sufficiently low** offer, so the threshold has the form $s\le s^\ast_{2n-2}$. It is pinned down by indifference — at the threshold, accepting and rejecting pay the same:

$$
-s^\ast_{2n-2}-c_d(2n-1)\;=\;-s^\ast_{2n-1}-c_d\cdot 2n .
$$

The left side is acceptance: pay $s^\ast_{2n-2}$ having negotiated periods $0$ through $2n-2$, which is $2n-1$ periods. The right side is rejection: settle next period at $s^\ast_{2n-1}$, with $2n$ periods of cost.

Rearranging:

$$
s^\ast_{2n-2}=s^\ast_{2n-1}+c_d .
$$

**The sign is a plus**, and that is worth pausing over. Why would the defendant accept a **higher** amount today than tomorrow? Because settling today saves one period of legal fees $c_d$. For him a "worse offer" means "paying more", and he will pay a little more to finish a period earlier. Ball has the room supply the reason and then compresses it into a memorable line:

> Both sides will accept worse terms than they could get tomorrow, purely to save the cost of waiting. What differs is what "worse" means — for the plaintiff, receiving less; for the defendant, paying more.

One more step back, to period $2n-3$, where the defendant proposes and the plaintiff responds. Accepting $s$ yields $s-c_p(2n-2)$; rejecting yields $s^\ast_{2n-2}-c_p(2n-1)$. Indifference gives

$$
s^\ast_{2n-3}=s^\ast_{2n-2}-c_p=J-\hat C_p+c_d-c_p .
$$

One step further, period $2n-4$ is the plaintiff proposing again, so $c_d$ is added. The pattern emerges. For $k\ge 1$:

- **Odd periods** $2n-2k-1$ (defendant proposes):
$$
s^\ast=J-\hat C_p+(k-1)(c_d-c_p).
$$
- **Even periods** $2n-2k$ (plaintiff proposes):
$$
s^\ast=J-\hat C_p+k\,c_d-(k-1)\,c_p .
$$

Check $k=1$: the odd formula gives $J-\hat C_p$, the last period, and the even formula gives $J-\hat C_p+c_d$, period $2n-2$. Both match.

**What actually happens?** Period 0 is even, corresponding to $2n-2k=0$, i.e. $k=n$. The plaintiff offers

$$
s_0=J-\hat C_p+n\,c_d-(n-1)\,c_p,
$$

the defendant accepts, and the game ends in the very first period.

The result is a little ironic: the model builds $2n$ periods, a pile of legal fees and a chain of thresholds, and the equilibrium path is a single step. Yet **the potential length still shapes the amount** — with no room to negotiate at all ($n=0$) the plaintiff would get only $J-\hat C_p$; it is precisely because talks could drag that the defendant will pay the extra $n c_d$.

Three comparative statics are worth remembering:

- $s_0$ **decreases** in $\hat C_p$. The more expensive the plaintiff's trial, the lower the settlement — fear of court invites a lowball.
- $s_0$ **increases** in $(c_d-c_p)$. A defendant with relatively higher per-period costs is more afraid of delay and pays more. Ball's phrasing: **the side with higher per-period costs is at a strategic disadvantage**, and the other side can drive a hard bargain.
- $s_0$ **increases** in $n$ (as long as $c_d>c_p$). The further the trial date, the more the defendant's per-period disadvantage accumulates.

The oddest item is that $\hat C_d$ **never appears**. The defendant's own trial cost has no effect at all on the settlement. Why? Someone in the room gets it: because **the defendant makes the last offer**, so it can squeeze the plaintiff's trial cost without exposing its own. More precisely, the final threshold is set solely by the plaintiff's comparison ($J-\hat C_p$), while $\hat C_d$ only bears on whether the defendant would rather be refused — and we have already seen that refusal is strictly worse, so that constraint never binds.

Ball adds that with an odd number of periods the roles **flip** and $\hat C_d$ rather than $\hat C_p$ would matter. Bargaining games of this kind are acutely sensitive to who proposes last; timing details are not decoration.

## What the model lacks: why real talks drag

The model predicts settlement in period 0, while reality features long standoffs. Ball's move is worth learning: instead of asking "is the model wrong", ask "**what is missing**".

His answer is a single item: **incomplete information**. In the model both sides know $J$, and know that the other knows, so each round can push the opponent exactly to the brink of acceptance and there is no reason for time to pass. In reality you do not know how much the other side will really take — you do not know their trial costs, their true reservation value, or even whether they are a tough or a soft negotiator.

Once that uncertainty is introduced, delay acquires a function. Suppose you are unsure whether your opponent is tough or soft. You can open with an outrageous price that **only a soft type would accept**: if it is accepted you do very well; if it is refused you have learned that the opponent is probably tough, and you change strategy next round. **Waiting is then the price of information.** That is the subject of the later lectures on bargaining with incomplete information.

Ball also mentions the experimental counterpart: in the ultimatum game people reject unfair offers because rejection teaches the opponent a lesson — and if the game repeats, the lesson shapes future behaviour. That too lies outside the model, in the domain of repeated games.

What is worth taking from this is the method rather than the conclusion. When a model produces a counter-intuitive result ("talks do not drag"), there are two responses: declare the model useless, or ask what must be added to explain reality. Ball chooses the second, and says this is precisely where an economic model earns its keep — **even when the conclusion is counter-intuitive, it identifies which forces are at work**. Because delay is still absent after the cost channel has been isolated, one can say with some confidence that the driver of delay is information, not cost.

## Price haggling: discounting replaces legal fees

The second model changes the setting: one seller and one buyer bargaining over the **price** of a good.

The setup is clean. The seller values the good at 0 (it is already produced, and unsold it is worthless), the buyer values it at $v$. Trading at price $p$ gives

$$
u_{\text{seller}}=p,\qquad u_{\text{buyer}}=v-p .
$$

Individual rationality pins the range immediately: $p\ge 0$ (no seller accepts a negative price) and $p\le v$ (no buyer pays above value). So $p\in[0,v]$, with both sides non-negative. Where inside the interval the price lands is the question of this section.

Note the underlying economics: trade is possible only when the buyer's value exceeds the seller's, and the price lies between the two valuations. Here the seller's value is 0, so the whole of $[0,v]$ is available.

The cost of delay changes form: not addition but **discounting**. If trade occurs in period $t$,

$$
u_{\text{seller}}=\delta^{\,t}p,\qquad u_{\text{buyer}}=\delta^{\,t}(v-p),\qquad \delta\in(0,1).
$$

$\delta$ is the discount factor. It multiplies once per period, so the longer the wait the smaller the utility from any given price. A $\delta$ near 1 means patient players (time barely bites); a $\delta$ near 0 means extreme impatience (one period of waiting wipes almost everything out). Ball offers a financial reading: if the stakes are money, the cost of delay is the interest or return that money could have earned.

The timing mirrors the previous model: periods $0$ to $2n-1$, **the seller proposes in even periods** (opening in period 0), the buyer counters in odd periods, and at period $2n$ "the world ends" — if no trade has occurred, both get 0.

Ball is unhappy with that hard end date and admits the real reason for it: we do not yet have the tools to handle an indefinite horizon. He says taking $n$ large enough gives predictions very close to the infinite-horizon model, and offers two stories to make it palatable: the tour bus leaves in $2n$ periods and this is the last chance to trade, or the ice cream cone melts. The assumption gets relaxed later.

## Backward induction and the limit: what moving first is worth

In the last period $2n-1$ the buyer proposes and the seller accepts or rejects. Rejection means the world ends tomorrow and yields 0, so the seller accepts any $p\ge 0$:

$$
p^\ast_{2n-1}=0 .
$$

The buyer of course offers 0 — the position of the bakery with one croissant left at closing time: unsold it is thrown away, so the buyer holds all the bargaining power. End-of-day discounts exist for exactly this reason.

Step back to an even period $t$ (seller proposes, buyer responds). Accepting $p_t$ yields $\delta^t(v-p_t)$; rejecting means waiting to $t+1$ and trading at $p^\ast_{t+1}$, yielding $\delta^{t+1}(v-p^\ast_{t+1})$. Indifference gives

$$
\delta^{t}(v-p^\ast_t)=\delta^{t+1}(v-p^\ast_{t+1}).
$$

Dividing both sides by $\delta^t$ — the key step, which eliminates absolute time — leaves

$$
v-p^\ast_t=\delta\,(v-p^\ast_{t+1}).
$$

Ball stresses what the cancellation means: only the single discount factor **between today and tomorrow** matters, because how many periods have already passed applies equally to both options.

Now an odd period $t$ (buyer proposes, seller responds). Accepting yields $\delta^t p_t$; rejecting yields $\delta^{t+1}p^\ast_{t+1}$. Hence

$$
p^\ast_t=\delta\,p^\ast_{t+1}.
$$

Two recursions: one presses down from above (the most the buyer will pay), one props up from below (the least the seller will take). Starting from $p^\ast_{2n-1}=0$ and iterating gives the whole strategy. Ball says the algebra becomes ugly, so he skips it and reports the result and the limit.

**The outcome** is again trade in period 0: the seller names $P_0^\ast$ and the buyer accepts. No delay.

**The limit** (as $n\to\infty$, i.e. with room to bargain for a very long time):

$$
P_0^\ast=\frac{v}{1+\delta}\quad(\text{seller proposes first}).
$$

If instead the **buyer** proposes first, the price is

$$
P_0^\ast=\frac{\delta v}{1+\delta}.
$$

The two differ by a factor $\delta$, so **the first mover has an advantage**. The intuition: by moving first I can exploit the fact that you also fear delay, and name a price that is not good for you but that you know beats waiting until tomorrow. Ball calls this a general pattern — the first mover shifts the cost of waiting onto the other side.

![With the seller proposing first the price v/(1+δ) always exceeds the buyer-first price δv/(1+δ), and both converge to v/2 as δ approaches 1](/images/negotiation-first-mover-en.svg)

*Figure: the first-mover advantage fades as patience rises. At δ→1 the two curves meet at v/2, because "tomorrow" is barely different from "today".*

As $\delta\to1$ both curves converge to $v/2$ and the advantage **disappears**. Why? Because $\delta\to1$ means both sides are extremely patient, and "the other side proposes first tomorrow" is then almost indistinguishable from "I propose first today". Ball gives a second reading: $\delta\to1$ can also mean the interval between offers is tiny — if the two of you counter every millisecond, who speaks first really does not matter.

He closes with a **heuristic derivation** that avoids the full recursion, and it is worth memorising. With $n$ large, period 0 and period 2 are nearly identical situations (roughly a billion periods remain in both cases), so set $P_0^\ast\approx P_2^\ast$. The even-period recursion gives

$$
P_0^\ast=(1-\delta)v+\delta P_1^\ast,
$$

and the odd-period recursion gives $P_1^\ast=\delta P_2^\ast$, so

$$
P_0^\ast=(1-\delta)v+\delta^2P_2^\ast\approx(1-\delta)v+\delta^2P_0^\ast .
$$

Rearranging,

$$
(1-\delta^2)P_0^\ast=(1-\delta)v .
$$

Taken literally this gives $\frac{1-\delta}{1-\delta^2}v$, which does not look like the answer, but $1-\delta^2=(1-\delta)(1+\delta)$, and cancelling $1-\delta$ leaves

$$
P_0^\ast=\frac{v}{1+\delta}.
$$

Ball notes that this difference-of-squares factorisation is a trick worth remembering for problem sets and exams.

## What this lecture establishes

1. The settlement model splits costs into **trial costs** $\hat C_p,\hat C_d$ (paid once, at the end) and **per-period negotiation costs** $c_p,c_d$ (accumulating over time). Settlement happens because both sides want to avoid the latter.
2. Backward induction gives the final threshold $J-\hat C_p$: the plaintiff accepts less than the judgment to avoid the trial fee, and the defendant offers exactly the lowest amount that will be accepted.
3. The recursion is $s^\ast_{2n-2}=s^\ast_{2n-1}+c_d$: the defendant pays more today to save one period of fees. In general, odd periods give $J-\hat C_p+(k-1)(c_d-c_p)$ and even periods $J-\hat C_p+k c_d-(k-1)c_p$.
4. The equilibrium is **settlement in period 0** at $J-\hat C_p+n c_d-(n-1)c_p$: decreasing in the plaintiff's trial cost, increasing in the defendant's relative per-period cost and in the distance to trial. $\hat C_d$ is absent because the defendant proposes last; with an odd number of periods the roles flip.
5. The absence of delay shows that **delay comes from incomplete information**: opening with a price only a soft opponent would accept is a way of buying information.
6. Price haggling replaces additive costs with discounting; the recursions $v-p_t=\delta(v-p_{t+1})$ and $p_t=\delta p_{t+1}$ give the limits $P_0^\ast=\frac{v}{1+\delta}$ (seller first) and $\frac{\delta v}{1+\delta}$ (buyer first). As $\delta\to1$ the first-mover advantage vanishes and both get $v/2$.

## Check your understanding

**1. Why does the defendant accept a higher amount in period $2n-2$ than he would pay in period $2n-1$?**

Because settling today saves one period of negotiation cost $c_d$. The threshold comes from indifference: accepting pays $s$ plus $2n-1$ periods of cost, while rejecting pays $s^\ast_{2n-1}$ plus $2n$ periods. Equating the two gives $s^\ast_{2n-2}=s^\ast_{2n-1}+c_d$. For him a "worse term" means "paying more", so he will pay a little extra to finish a period earlier. The plaintiff's logic runs in the opposite direction: she also accepts worse terms, but for her worse means "receiving less", which is why her threshold carries a minus sign ($-\hat C_p$).

**2. With $J=100$, $\hat C_p=20$, $c_p=1$, $c_d=3$ and $n=4$, what is the period-0 settlement?**

Substitute into $s_0=J-\hat C_p+n c_d-(n-1)c_p=100-20+4\times3-3\times1=80+12-3=89$. Sanity check the intuition: with no room to bargain ($n=0$) the plaintiff would get only $J-\hat C_p=80$; because four rounds are possible and the defendant burns 2 more per period than the plaintiff, he will pay an extra $4\times3-3\times1=9$, giving 89. Note that this is still below the judgment of 100, since the plaintiff does after all save the 20 trial fee.

**3. Why does $\hat C_d$ never appear in the settlement, and what changes with an odd number of periods?**

Because the defendant proposes last. The final threshold is set only by the plaintiff's comparison (accept $s$ or go to court for $J-\hat C_p$); the defendant's own trial cost only bears on whether he would rather be refused, and refusal is strictly worse (he pays the full award $J$ and his own $\hat C_d$), so that constraint never binds. With an odd number of periods before trial the last proposer is the plaintiff, the roles flip, and $\hat C_d$ takes over. Bargaining games are extremely sensitive to such timing details.

**4. If the model predicts agreement in period 0, why build $2n$ periods at all?**

Because **the potential length affects the amount**. The equilibrium path is one step, but the thresholds are computed by recursing all the way back from $2n-1$, and each period's cost accumulates into the final number: $s_0$ contains the term $n c_d$. If the trial were imminent ($n$ small), the defendant's disadvantage from delay could not build up and the plaintiff would get close to $J-\hat C_p$. So the possibility of a long negotiation changes the division even though it never happens.

**5. In the price model, why can the indifference condition cancel $\delta^t$ and leave only $\delta$?**

Because accepting and rejecting both happen "today", so both options carry the same leading discount factor. Dividing $\delta^t(v-p_t)$ and $\delta^{t+1}(v-p_{t+1})$ by $\delta^t$ leaves $v-p_t$ and $\delta(v-p_{t+1})$, with only the single $\delta$ between today and tomorrow. That is also why the backward recursion never tracks absolute time: all that matters is whether the current period is even or odd, since each recursion is independent of $t$.

**6. Why does the first-mover advantage vanish as $\delta\to1$?**

Because $\delta\to1$ means waiting costs almost nothing, so "I propose first today" and "the other side proposes first tomorrow" become nearly equivalent. Formally, the seller-first price $\frac{v}{1+\delta}$ and the buyer-first price $\frac{\delta v}{1+\delta}$ both equal $v/2$ at $\delta=1$. Ball offers a second reading: $\delta\to1$ can mean offers follow each other in rapid succession, and if you counter every millisecond, who speaks first is genuinely irrelevant. Conversely, the smaller $\delta$ is (the more impatient the players), the more the first mover can extract and the wider the gap between the two curves.
