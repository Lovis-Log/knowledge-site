---
slug: "11-one-shot-deviation"
title: "The One-Shot Deviation Principle: Collapsing Infinitely Many Deviations into One"
summary: "The previous lecture's verification quietly skipped a step: deviations that also change your mind after entry. Once games are abstracted into multistage games, one can prove that no profitable one-shot deviation at any history implies no profitable deviation at all — which is what finally makes an endless bargaining problem computable."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "one-shot-deviation"
  - "alternating-offer-bargaining"
sources:
  - kind: "video"
    title: "Lecture 11: One-Shot Deviation Principle and Bargaining"
    url: "https://www.youtube.com/watch?v=iL3XRRI5rQs"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Last lecture's definition was fine; the verification was slightly loose. Checking the Boston example, we confirmed only that "enter and then follow the strategy" does not pay, and never checked the more complicated deviation "enter and **then change your mind**". Ball opens by putting that gap on the table, then explains why it does not matter: the subgame already prescribes a Nash equilibrium, so deviating inside it can only do worse. The reasoning is the same as backward induction — it just cannot be called backward induction, because the game is not perfect information.

With that step filled in, he abstracts the class of games involved and calls them **multistage games**: time is divided into stages, in each stage some subset of players moves simultaneously, and at the start of each stage everyone has observed everything that came before. Finite repetition, infinite repetition, Cournot entry and alternating-offer bargaining are all special cases.

Inside this framework sits a theorem, the **one-shot deviation principle**: a profile is subgame perfect if and only if at every history no player can gain by changing their action at that single history and following the original strategy everywhere else. On its face this only replaces "all deviations" with "one kind of deviation", but the replacement is substantive: a general deviation can pull levers at hundreds of histories at once, while a one-shot deviation pulls exactly one.

With the theorem in hand, the problem last lecture dodged becomes tractable: **infinite-horizon** alternating-offer bargaining. The earlier model needed an artificial deadline, because without a last period there is nowhere for backward induction to start — and the deadline itself distorted the answer, handing almost everything to whoever held the last offer. Remove the deadline and the answer becomes a clean formula: the proposer keeps $1/(1+\delta)$ and offers $\delta/(1+\delta)$, where $\delta$ is the per-period discount factor. As $\delta\to 0$ the first mover takes all; as $\delta\to 1$ the split approaches even.

## Timeline

| Time | Topic |
| --- | --- |
| 1:16 | A step was skipped last time: complicated deviations were never checked |
| 3:44 | What a complicated deviation looks like: enter, then change play inside the subgame |
| 5:36 | Why no separate check is needed: the subgame is already a Nash equilibrium |
| 7:52 | Definition of a multistage game: stages, simultaneous moves, observability |
| 14:25 | Definition of a one-shot deviation: different at exactly one history |
| 17:02 | One history changed, yet every history reached afterwards changes |
| 20:09 | Subgames of a multistage game correspond one-to-one with histories |
| 25:52 | Theorem: SPNE iff no profitable one-shot deviation at any history |
| 31:31 | "No one-shot deviation implies no deviation" is the substance; not proved in class |
| 36:24 | Continuity is required; discounting delivers it |
| 38:17 | Infinite-horizon alternating-offer bargaining |
| 41:22 | Compressing the terms of a deal into a point in utility space |
| 46:03 | Price haggling is the triangle $x_1+x_2=1$ |
| 49:48 | Delay is costly: agreement at date $t$ is discounted by $\delta^t$ |
| 51:30 | Player 1 offers in even periods, player 2 in odd periods |
| 1:03:19 | The candidate equilibrium: $1/(1+\delta)$ and $\delta/(1+\delta)$ |
| 1:08:18 | Checking the proposer: too stingy gets rejected, too generous gives value away |
| 1:13:56 | Checking the responder: the accept/reject threshold matches exactly |

## Filling in a skipped step

Back to the Boston game. Player 1 chooses exit (both get 1.5) or enter; after entry the two pick Celtics or Red Sox simultaneously, with $(C,C)=(2,1)$, $(R,R)=(1,2)$ and $(0,0)$ for either mismatch. Last lecture's verification that $(XR,R)$ is an SPNE ran: the subgame plays $RR$, so entering yields only 1, less than 1.5 from exiting.

Ball says the reasoning is correct but skips a step. Player 1's deviation could be more elaborate: **enter, and then not play $R$ inside the subgame**. Enter and pick $C$, against an opponent picking $R$, gives $(0,0)$ — clearly worse. But that sentence needs an argument; it cannot simply be assumed.

The argument runs as follows. Suppose player 1 enters and then, inside the subgame, switches to an action that is suboptimal there given the opponent's strategy. Relative to "enter and follow the equilibrium inside the subgame", this switch can only lower the subgame payoff, while everything before entry is unchanged. So the complicated deviation pays at most what the simple deviation pays, which is already less than not deviating.

The fact being used is that **the subgame strategy is already a Nash equilibrium of that subgame**. Given the opponent's behaviour inside the subgame, no change I make there can help — that is precisely the definition. Ball calls this "backward-induction reasoning" in quotation marks: strictly, backward induction does not apply to this game, but the logic of fixing the later part and then evaluating the earlier part is the same.

He adds a warning. This step is nearly automatic in finite games, but in **infinite-horizon** games it needs care: there the "later part" is itself an infinitely long game, so you cannot start from the last step and roll back. The multistage framework of the next section exists to handle exactly this.

## Multistage games

**Definition.** A game is a multistage game if:

- time is divided into stages $0,1,2,\dots$, either ending at some $T$ or continuing forever;
- in each stage, **some subset** of the players move simultaneously;
- at the beginning of each stage, all actions from earlier stages have been observed by everyone.

The third clause is the important one, which is why these are sometimes called multistage games with observed actions. Ball avoids that name because **within** a stage the moves are simultaneous — players do not see each other — so the game is not one of perfect information.

The "some subset" in the second clause may depend on history. Cournot entry is the example: in stage one all firms simultaneously decide whether to enter; in stage two only the entrants simultaneously choose quantities. If firms 1 and 2 entered, stage two has firms 1 and 2 moving; if 3 and 4 entered, it has 3 and 4.

The Boston tree also fits, despite looking purely sequential: stage 0 has only player 1 moving (a subset of size one), and stage 1 has both moving simultaneously. It qualifies because player 1 cannot see player 2's choice in stage 1, so the drawn order is irrelevant. One thing must be checked — that at the start of stage 1 both players know what happened in stage 0. They do: wherever you stand on that tree, you know player 1 chose to enter.

## The one-shot deviation principle

**One-shot deviation.** Let player $i$'s strategy be $s_i$. Another strategy $s_i'$ is a **one-shot deviation** from $s_i$ if there is exactly one history $h$ with $s_i'(h)\neq s_i(h)$, and $s_i'(h')=s_i(h')$ at every other history $h'$.

Put differently, a strategy is a complete contingent plan with one instruction written at every history where the player might be called upon. Two strategies can differ a lot, or by a single instruction. Differing by a single instruction is a one-shot deviation; if that instruction sits at $h$, it is a one-shot deviation "at $h$".

**An easy misunderstanding.** Changing one history is not the same as changing one action actually taken. Ball uses the Cournot example: a firm that was going to stay out at the initial history switches to entering. That is one one-shot deviation — one instruction changed, at the initial history. But after entry the number of firms in the market changes, so every firm's stage-two quantity changes and the path is completely different.

The reason is that histories accumulate. What I do in period 9 becomes part of the period-10 history; once the history changes, the input fed into the strategy function changes, and the output may change with it. "One history changed" describes the **plan**; it says nothing about the **path**.

**Subgames of a multistage game.** Last lecture's definition pays off here: because everything earlier is observed at the start of each stage, histories and subgames correspond one-to-one.

- Stage 0 has a single history (the empty one), hence a single subgame: the whole game.
- Each stage-0 history starts a subgame in stage 1.
- Each history $h^t=(a^0,\dots,a^{t-1})$ in stage $t$ starts a subgame.

So "for every subgame" can be rewritten "for every history", and histories are objects one can handle by induction.

**Theorem.** Let $s^\ast$ be a profile in a continuous multistage game. The following are equivalent:

1. $s^\ast$ is a subgame perfect Nash equilibrium;
2. for every history $h$, the restriction of $s^\ast$ to the $h$-subgame is a Nash equilibrium of that subgame;
3. for every history $h$, no player has a profitable unilateral deviation in the $h$-subgame;
4. for every history $h$, no player has a profitable **one-shot** deviation in the $h$-subgame.

1 and 2 are equivalent by substituting "history" for "subgame" in the definition; 2 and 3 by expanding "Nash equilibrium" into "no profitable unilateral deviation"; 3 implies 4 trivially, since a one-shot deviation is a special case of a deviation and if nothing pays, the special case cannot pay either.

The substance is 4 implies 3. Ball calls it "hard, important, substantive" and does not prove it in class. The intuition: if the simplest deviations do not pay, complicated ones cannot either, because a complicated deviation can be decomposed into a chain of one-shot deviations, each unprofitable on its own. Turning that intuition into a proof for infinite games needs a technical condition.

**The technical condition: continuity.** The theorem requires the game to be continuous. Ball's informal gloss: if everyone plays exactly the same way from the billionth period onwards, then how they play beyond a billion periods should not much affect payoffs; equivalently, to know a player's payoff it suffices to look at play a billion periods in. A discount factor delivers this automatically, since very distant payoffs are discounted to almost nothing. Everything in the course is continuous, so the condition never bites.

**What the theorem saves, and what it does not.** It saves you from considering all possible deviations, a space too large to enumerate: one-shot deviations differ at a single history, so their number is "actions minus one" times the number of histories, and they can be checked one at a time. It does not save you the quantifier "for every history": every history must still be checked, including histories that never occur on the equilibrium path. That point comes back repeatedly next lecture.

## Infinite-horizon alternating-offer bargaining

**Why drop the deadline.** The bargaining model of the previous lecture contained something artificial: a day on which the world ended and no further negotiation was possible. That deadline was not a feature of reality but a stand-in for a missing tool. And it was costly: whoever offers in the last period takes almost everything, a conclusion manufactured entirely by the deadline. The infinite-horizon model removes the device.

**Compressing the terms into utility.** Real negotiations are over complicated objects — a twenty-point agreement, a territorial division, the price of a used car. What is strategically relevant is not the clauses but the utilities they deliver. So map each possible agreement to a utility pair $(x_1,x_2)$; the image of all feasible agreements is a set $X$.

The abstraction looks nothing like reality: nobody says "this deal gives you 7 and me 3". Ball's point is that this is nonetheless the information that does the work — people simply transmit it through language, clauses and tone.

**The disagreement point.** Negotiations can break down. What happens then is also compressed into utilities, usually normalised to the origin $(0,0)$, called the **disagreement point**.

We then care only about points of $X$ that are weakly better than the origin for both players. The justification is an assumption of unilateral walk-away power: either side can leave the table and force the disagreement outcome. So

- if a feasible agreement gives player 1 less than 0, player 1 refuses — walking away is better;
- if it gives player 2 less than 0, player 2 refuses.

Ball notes this assumption usually holds in practice: either party can simply say "we're done".

**Price haggling is exactly this picture.** One seller, one buyer who values the good at 1, both risk neutral. At price $p$:

- seller's utility $p$, buyer's $1-p$, so $x_1+x_2=1$: a segment from $(0,1)$ to $(1,0)$;
- $p=1$: seller gets 1, buyer 0 (paying your own valuation is like not getting the good);
- $p=0$: buyer gets 1, seller 0;
- as $p$ slides between 0 and 1, the point slides along the segment.

Strictly, points inside the triangle are also attainable: the buyer pays 0.8 and burns 0.1. Nobody does that, but negotiators do put forward proposals that hurt both sides as threats, which is why taking the convex hull is defensible.

**The cost of delay.** If agreement $(x_1,x_2)$ is reached at date $t$, the players receive

$$
\delta^t x_1,\qquad \delta^t x_2,\qquad 0<\delta<1 .
$$

The closer $\delta$ is to 1, the more patient the players: waiting is cheap. Near 0 they are desperately impatient, equivalent to "the world ends tomorrow", so only agreement in the first period matters.

**Timing.** Player 1 offers in even periods, player 2 in odd periods. An offer is a point of $X$. The responder accepts (the game ends, payoffs are that point discounted to the current period) or rejects (play moves to the next period with the other player proposing). If no offer is ever accepted, the outcome is the disagreement point $(0,0)$.

Ball also answers a student's question: in an infinite horizon it is unclear when "breakdown" actually happens. A cleaner reading is in flow terms — zero utility each period until agreement, then the agreed utility forever, with the whole flow discounted and averaged; that reduces to the same model.

**Is it a multistage game?** It does not look like one, since players take turns rather than moving simultaneously. But the stages here are not periods: each individual move is a stage — player 1's offer is stage 0, player 2's accept-or-reject is stage 1, and a rejection opens a new stage with a new offer. Within each stage a single player moves (a subset of size one), and at its start everything earlier has been observed, so the conditions hold. The one-shot deviation principle therefore applies.

## The candidate equilibrium and its verification

**The candidate.** At any history, whoever is proposing offers:

$$
\text{proposer keeps } \frac{1}{1+\delta},\qquad \text{offers } \frac{\delta}{1+\delta} \text{ to the other player.}
$$

The two sum to 1, so the point lies on the segment. The responder's strategy: **accept anything giving at least $\delta/(1+\delta)$, reject otherwise.**

Worth reading the two numbers immediately. As $\delta\to 0$ the proposer keeps $1/(1+0)=1$ and gives nothing — the first mover takes all. As $\delta\to 1$ both tend to $1/2$ — an even split. In between, say $\delta=1/2$, the proposer keeps $2/3$ and offers $1/3$.

**Where the number comes from.** If the responder rejects, next period they propose and, by the strategy, keep $1/(1+\delta)$ — but that is one period away, so discounted it is worth

$$
\delta\cdot\frac{1}{1+\delta}=\frac{\delta}{1+\delta}.
$$

That is their reservation value. Offer exactly that and the responder is indifferent; offer less and the offer is rejected; offer more and value is thrown away. So the equilibrium offers exactly that.

**Checking the proposer.** Suppose player 1 is proposing at some history, on path for $1/(1+\delta)$. Two kinds of one-shot deviation:

- **Too stingy** (offering $y<\delta/(1+\delta)$): by the responder's strategy the offer is rejected. Next period the other player proposes and, by the strategy, gives player 1 $\delta/(1+\delta)$, which player 1 accepts. Discounted to today:

$$
\delta\cdot\frac{\delta}{1+\delta}=\frac{\delta^2}{1+\delta}<\frac{1}{1+\delta},
$$

since $\delta^2<1$. Strictly worse.

- **Too generous** (offering $y>\delta/(1+\delta)$): the offer is accepted and player 1 keeps $1-y<1-\delta/(1+\delta)=1/(1+\delta)$. Also worse.

So the proposer has no profitable one-shot deviation.

One detail is easy to miss: whether being stingy today pays depends on what I will do tomorrow. The principle's role is precisely to let us hold "what I do tomorrow" fixed and vary only today's history. If player 1 could be stingy today and then also reject the counteroffer tomorrow, that would be a multi-shot deviation requiring separate analysis — and the theorem says it need not be analysed.

**Checking the responder.** Suppose player 1 is responding to an offer of $y$.

- If $y\ge\delta/(1+\delta)$: accept, getting $y$. Rejecting means proposing next period for $1/(1+\delta)$, worth $\delta/(1+\delta)\le y$. Accepting is no worse.
- If $y<\delta/(1+\delta)$: reject, propose next period, get $1/(1+\delta)$ worth $\delta/(1+\delta)>y$. Accepting instead gives $y$ immediately, strictly worse.

Both checks pass, so the profile is an SPNE. Ball notes one can also show it is the **unique** SPNE, but the argument is more involved and is deferred.

**The shape of the outcome.** On the equilibrium path player 1 proposes in period 0, player 2 accepts at once, and the deal is

$$
\left(\frac{1}{1+\delta},\ \frac{\delta}{1+\delta}\right).
$$

No delay, no breakdown. Ball stresses this is not assumed but follows from complete information: both sides agree exactly on what each offer delivers, so nobody needs to probe. Real negotiations drag on largely because that fails — you do not know how much utility the other side gets from a given proposal.

![The bargaining outcome in utility space: the feasible set is the triangle x₁+x₂≤1, and the equilibrium point slides from (1,0) toward (1/2,1/2) as δ rises, sitting at (2/3,1/3) when δ=1/2](/images/one-shot-deviation-frontier-en.svg)

*Figure: the discount factor places the split — more patience shrinks the first-mover advantage, though the midpoint is reached only in the limit $\delta\to1$.*

## What this lecture establishes

1. Last lecture's verification missed "change your mind inside the subgame"; the gap closes because the subgame is already a Nash equilibrium, so changing play there can only hurt.
2. A **multistage game** has stages (finite or infinite), some subset of players moving simultaneously in each, and all earlier actions observed at the start of each stage. The subset may depend on history.
3. In a multistage game, **subgames correspond one-to-one with histories**, so "for every subgame" becomes "for every history".
4. The **one-shot deviation principle**: SPNE is equivalent to "no profitable one-shot deviation at any history". It saves the enumeration of deviations; it does not save the quantifier over histories.
5. Changing one history can change the entire path, because histories accumulate: one altered input changes every later input.
6. The SPNE of infinite-horizon alternating-offer bargaining gives the proposer $1/(1+\delta)$ and the responder $\delta/(1+\delta)$, accepted at once. As $\delta\to0$ the first mover takes all; as $\delta\to1$ the split approaches even.

## Check your understanding

**1. Why is it enough to check only the deviation "enter and then follow the strategy"?**

Because the subgame strategy is already a Nash equilibrium of that subgame. Given the opponent's behaviour there, no change inside the subgame beats following the equilibrium. So "enter and change play inside" pays at most "enter and follow the equilibrium", which has already been shown to be worse than staying out. The argument relies on optimality inside the subgame; in infinite-horizon games that needs separate handling, which is what the multistage framework provides.

**2. A one-shot deviation changes one history — why can the path be completely different? Give the lecture's example.**

Histories accumulate: what happens in period $t$ becomes part of the period $t+1$ history. In the Cournot example a firm changes a single instruction at the initial history, from "stay out" to "enter"; the number of entrants then changes, every firm's stage-two quantity changes with it, and the whole path differs. The strategy function is unchanged; the history fed into it changed, so the output changed.

**3. Which of the theorem's four statements is the substantive one, and why are the others easy?**

The substance is "no profitable one-shot deviation implies no profitable deviation". 1 and 2 merely replace "subgame" with "history", which is legitimate because the two correspond one-to-one in a multistage game; 2 and 3 merely expand "Nash equilibrium" into "no profitable unilateral deviation"; 3 implies 4 by plain logic, since a one-shot deviation is a special case of a deviation and if none pays, the special case cannot. The converse is not obvious: why should checking one kind of deviation settle all of them?

**4. In the bargaining model, why is the responder's threshold exactly $\delta/(1+\delta)$?**

Because rejecting means proposing next period and, by the strategy, keeping $1/(1+\delta)$ — one period away, hence worth $\delta/(1+\delta)$ today. That is what rejection guarantees. Offer exactly that and the responder is indifferent; offer less and rejection is better; offer more and the proposer loses value. So the equilibrium offers exactly that.

**5. Where is the agreement if $\delta=0$? What if $\delta=1$?**

At $\delta=0$ the proposer keeps $1/(1+0)=1$ and the responder gets 0, so the deal is $(1,0)$ — the first mover takes everything, because "the world ends tomorrow" leaves the responder no room to refuse. As $\delta\to1$ both shares tend to $1/2$ and the deal tends to $(1/2,1/2)$, but only in the limit; Ball says $\delta=1$ needs separate treatment, where multiple equilibria can appear, and is not covered.

**6. Why does agreement happen in the first period here, while real negotiations drag on?**

Because of complete information: both sides agree on exactly what each offer delivers, so the proposer knows precisely how much is needed and the responder knows rejection is worth only the discounted amount. There is no information to probe, so delay buys nothing. In reality you do not know how much utility the other side gets from a proposal, so offers get misjudged and rejected, and delay becomes a way to transmit information. Ball lists complete information explicitly as a premise of the result.
