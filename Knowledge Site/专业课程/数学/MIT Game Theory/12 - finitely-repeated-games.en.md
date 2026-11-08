---
slug: "12-finitely-repeated-games"
title: "Finitely Repeated Games: How the Last Period Eats All the Cooperation"
summary: "Play the prisoner's dilemma three times and half the room really does cooperate. But as long as the number of rounds is public and finite, backward induction flattens cooperation: when the stage game has a unique Nash equilibrium, every finite repetition has exactly one subgame perfect equilibrium, and it plays that equilibrium every period. Rewards and punishments need several equilibria to choose between."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "finitely-repeated-games"
  - "stag-hunt"
sources:
  - kind: "video"
    title: "Lecture 12: Finitely Repeated Games"
    url: "https://www.youtube.com/watch?v=_XM0CRvaWq0"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Every game so far has been played once. Most real interaction is not like that: you deal with someone, you see what happens, you deal again, you see what happens. This lecture starts on that structure in its simplest form — repeated a **finite** number of times, with the number known to both sides.

Ball first has the room actually play it: pairs, three rounds of the prisoner's dilemma, results public after each round, scored on the average payoff. The results are striking — several pairs cooperated all three rounds and averaged 2, while others defected throughout on the grounds that "the other side will defect anyway". The two behaviours correspond to two entirely different theories: one believes "I cooperate today and get repaid tomorrow", the other believes "roll backward and only defection survives".

What the lecture proves is the second. **If the stage game has a unique Nash equilibrium, then for any finite repetition the unique subgame perfect equilibrium plays that equilibrium at every history.** The prisoner's dilemma therefore has exactly one SPNE — defect every period — and cooperation does not survive in theory.

The proof is backward induction, but finer-grained than the perfect-information version. The trick is to split "what I choose today" into two effects: today's payoff, and the change in tomorrow's history — hence in how everyone plays tomorrow. All rewards and punishments in a repeated game live in the second effect. The last period has no tomorrow, so that effect vanishes; and once last-period behaviour is independent of history, the second-to-last period loses its second effect too, and the whole thing collapses forward.

So a punishment needs something to punish **with**: the final stage must contain **more than one** Nash equilibrium, so that "play the good one" can serve as a reward and "play the bad one" as a punishment. Stag hunt has exactly two, which is why it can support a two-period SPNE in which the first period is *not* a Nash equilibrium of the stage game.

## Timeline

| Time | Topic |
| --- | --- |
| 0:30 | The prisoner's dilemma again: defection strictly dominates for both |
| 1:31 | The room plays three rounds, observing after each, scored on average payoff |
| 4:49 | Repetition plus observability is what makes rewards and punishments possible |
| 6:14 | The two-period tree |
| 7:31 | Drawing simultaneous moves: each period-two history gets its own information set |
| 8:22 | Five subgames: one at the start, four in period two |
| 10:26 | All four period-two subgames must play DD |
| 12:01 | Period one has no scope for rewards or punishments either |
| 13:34 | Strategy is not outcome: the plan must fill five slots |
| 16:44 | The general framework: stage game, timing, information, payoffs |
| 19:04 | Periods 0 to T, written $G(T)$, played $T+1$ times |
| 25:08 | A strategy maps histories to actions |
| 31:04 | Theorem: a unique stage-game equilibrium forces a unique SPNE for every $T$ |
| 37:20 | The backward-induction proof, collapsing from the last period |
| 42:01 | An action has two effects: today's payoff and tomorrow's history |
| 46:14 | Stag hunt: two Nash equilibria, the story and the payoffs |
| 53:44 | Constructing an SPNE whose first period is not a Nash equilibrium |
| 1:15:03 | 1.5 against 1: the punishment exactly offsets the temptation |

## Three rounds in the classroom

| | Cooperate | Defect |
| --- | --- | --- |
| Cooperate | 2, 2 | −1, 3 |
| Defect | 3, −1 | 0, 0 |

Defection strictly dominates for both: 3 beats 2 against cooperation, and 0 beats $-1$ against defection. So the one-shot game has a unique Nash equilibrium $(D,D)$ paying $(0,0)$, while $(C,C)$ pays $(2,2)$ — the dilemma.

The three-round rules: move simultaneously, observe the outcome, play again, three rounds total, then average.

The room splits in two. One pair says they cooperated all three rounds; Ball says the payoffs are good, though he might argue somebody was a little irrational, and we will see. Another pair also cooperated but added the key sentence: **"we know each other in real life, so technically this game is infinitely repeated."** Ball praises the point and quotes Milgrom: **the game is always larger than you think.** You wrote down a three-period model, but the players may be thinking about whether they will run into you in the hallway tomorrow.

A third student defected all three rounds, reasoning that the partner would defect too and that this is presumably the intended answer. Ball calls him a paragon of rationality.

These three behaviours map onto three theoretical positions. The first believes in rewards and punishments; the second points at what the model leaves out; the third rolls backward. What the lecture establishes is that **inside the three-period model as written, the third is right**.

## Repetition and observability: the two prerequisites

Ball states the mechanism plainly: **repetition together with observability is what creates the opportunity for rewards and punishments.**

- Repetition is needed because a reward or punishment has to land in the future; a one-shot game has no later.
- Observability is needed because the only way to reward or punish is to make future behaviour depend on what happened in the past. If you cannot see the past, repeating the game changes nothing.

Neither suffices alone. A third condition is subtler: the punishment must be one the punisher is **willing to carry out after the fact**. "Defect forever if you defect" can be expensive for the punisher, who would rather forgive. Subgame perfection is exactly the tool that filters out such talk.

## The two-period version: rolling backward

Three periods is too messy to draw, so Ball draws two and says the pattern repeats.

The tree: in period 0, player 1 picks C or D and player 2 picks C or D without observing (the two nodes share an information set, encoding simultaneity). In period 1, each period-0 outcome leads to a fresh pair of nodes. Player 1's period-1 nodes sit in separate information sets, because player 1 knows what happened; player 2's are likewise separated by history, but the two within each pair are joined by a dotted line, since period 1 is simultaneous too.

**The subgames.** Walk the non-terminal nodes: the initial node starts one (the whole game), and each of the four period-1 nodes starts one, since each is a singleton information set and cuts nothing. Five in total.

**Period 1.** In any period-1 subgame only one period of play remains. The payoffs already earned are **sunk**: whatever happened in period 0 is written in the ledger and does not change with today's choice. So the incentives are exactly those of the one-shot prisoner's dilemma, whose unique Nash equilibrium is $(D,D)$. Four subgames, four $(D,D)$.

**Period 0.** This is where rewards and punishments might have lived: cooperate today and perhaps be repaid tomorrow. But period-1 behaviour is already pinned down — $(D,D)$ no matter what happened. **The future does not depend on the past, so there is nowhere for a reward or a punishment to attach.** Since nothing I do today affects tomorrow, I simply maximise today, and today's unique equilibrium is $(D,D)$.

So the unique SPNE is defect every period.

**Strategy is not outcome.** Ball stops to separate the two. The **outcome** of this equilibrium is $(D,D)$ then $(D,D)$; the **strategy** has to fill five slots:

| History | Player 1 | Player 2 |
| --- | --- | --- |
| empty history (period 0) | D | D |
| last period $(C,C)$ | D | D |
| last period $(C,D)$ | D | D |
| last period $(D,C)$ | D | D |
| last period $(D,D)$ | D | D |

"We defect every period" describes the outcome; "whatever the history, I defect" is the strategy. The difference is that the second also answers "what would I have done had things gone otherwise" — and those counterfactual answers are exactly what subgame perfection inspects.

Ball flags a degree of freedom that will matter later: a strategy may make future play depend on **my own** past action, not only on the opponent's. "If I cooperated in period 0 I cooperate tomorrow; if I defected I defect tomorrow" is a perfectly legitimate strategy, and it becomes essential when punishments are constructed.

## The general framework

Two periods, two actions, two players, and the tree is already unwieldy. Three periods doubles it; ten makes it unreadable. Ball's conclusion is blunt: **no more trees** — from here on, a notation built for repeated games. This is not laziness. A tree has too little information density: it unfolds one branch per history, whereas a repeated game wants precisely to fold isomorphic branches together.

**The stage game.** Written $G$, a strategic-form game: players $1,\dots,n$, action sets $A_1,\dots,A_n$, payoff functions $u_i:A_1\times\cdots\times A_n\to\mathbb{R}$.

There is a deliberate change of notation. Earlier a strategic-form game used $S_i$; now it uses $A_i$, and a choice in the stage game is called an **action** rather than a strategy. The reason is to avoid confusing "a strategy of the stage game" with "a strategy of the repeated game" — the latter is a complete plan spanning many periods, the former a single move in one.

**Timing.** Periods run from 0 to $T$, so the game is played $T+1$ times. $T$ is the **horizon**, and the repeated game is written $G(T)$. Note $G(0)=G$: a horizon of zero is just the stage game once.

**Information.** Past actions are observed. This is the assumption from the previous section.

**Payoffs.** Average payoffs:

$$
U_i(a^0,\dots,a^T)=\frac{1}{T+1}\sum_{t=0}^{T} u_i(a^t).
$$

Dividing by $T+1$ changes no incentive (utilities are defined up to positive affine transformations), but it puts the repeated game on the same scale as the stage game — payoffs of 2 or 3 rather than 7 or 8.

**Strategies.** A strategy for player $i$ is a function

$$
s_i:\bigcup_{t=0}^{T} A^t \to A_i ,
$$

where $A^t$ is the $t$-fold Cartesian product of $A$ (not "$A$ raised to the power $t$", an easy misreading). The period-$t$ history is $(a^0,\dots,a^{t-1})$, which is $t$ action profiles, hence lives in $A^t$.

**It is a special case of a multistage game.** Every player moves in every stage, the same stage game is played each time, and everything earlier is observed at the start of each stage. A multistage game allows the stage game to vary over time; this does not. Consequently last lecture's **one-shot deviation principle** applies directly — a fact used repeatedly when verifying equilibria below.

## The unique-equilibrium theorem

**Theorem.** Let $G$ be a strategic-form game with a unique Nash equilibrium $a^\ast$. Then for every horizon $T$, $G(T)$ has a unique subgame perfect Nash equilibrium, namely

$$
s_i(h)=a_i^\ast \quad \text{for every history } h \text{ and every player } i .
$$

The strategy is history-independent: whatever happened, I play the stage-game equilibrium action.

**Proof (rolling backward).** Start at the last period $T$. At any history $h^T$ only one period remains. That subgame is isomorphic to the stage game: same actions available, and the payoffs differ only by an additive constant (the payoffs already earned). A constant changes no comparison, so the Nash equilibria here are those of the stage game — and there is only one, so $a^\ast$ must be played.

Now period $T-1$. In principle my behaviour here could affect the period-$T$ history and hence period-$T$ behaviour. But we just showed that **period-$T$ behaviour is independent of history** — whatever the history, it is $a^\ast$. So changing my period-$(T-1)$ action changes only the input fed into the strategy function, and the output does not move. The second effect is severed.

What remains in period $T-1$ is the first effect: maximise the flow payoff. And the only way nobody wants to deviate unilaterally is to play the stage-game Nash equilibrium. Hence $s_i(h^{T-1})=a_i^\ast$.

Iterate back to period 0.

**Why the argument must proceed step by step.** Ball stresses that the key is not "the future is fixed" but "the future is **independent of history**". If period-$T$ behaviour depended on history, then what I do in $T-1$ would feed through the history into period-$T$ behaviour, rewards and punishments would reappear, and the conclusion would collapse. Uniqueness, not fixity, is doing the work.

**The two effects, stated generally.** In a repeated game, choosing $a_i^t$ has two consequences:

1. it changes the flow payoff $u_i(a^t)$;
2. it changes every later history (histories accumulate) and may therefore change later actions.

Everything that rewards or punishes lives in the second. The theorem works by shutting the second down entirely.

**Only half the theorem is proved.** What has been shown is that any SPNE must look like this. One must also show that it *is* an SPNE, or there might be none at all. Ball leaves that as an exercise and points at the one-shot deviation principle: at any history a deviation can only change the current payoff, since everything afterwards is unchanged, and $a^\ast$ is a Nash equilibrium of the stage game, so the current payoff cannot be improved either.

## Stag hunt: rewards need more than one equilibrium

Ball calls this one of the oldest formalised games, discussed by Rousseau in the seventeenth century. Two hunters can each hunt hare (easy, one person suffices) or hunt stag together (which requires both).

| | Hunt stag S | Hunt hare H |
| --- | --- | --- |
| Hunt stag S | 2, 2 | 0, 1 |
| Hunt hare H | 1, 0 | 1, 1 |

Two stags beat two rabbits, so $(S,S)$ pays $(2,2)$; hunting hare separately gives each 1. The trouble is the mismatch: if I hunt hare while my partner hunts stag, I still get 1 (a hare needs only me), and my partner gets 0 (a stag needs two).

Two pure Nash equilibria: $(S,S)$ and $(H,H)$. Against stag, joining pays 2 versus 1 for hare alone; against hare, hunting stag pays 0 versus 1. Rousseau's point was that the character of a society matters: a society of mutual trust is a stag-hunting society, a distrustful one is a hare-hunting society, and both are stable.

**The two-period version.** Start with the class that involves no rewards or punishments: tomorrow's behaviour does not depend on today's. Then today only has to be a stage-game Nash equilibrium and so does tomorrow, and each period can pick either equilibrium independently — four combinations:

- $(S,S)$ in both periods;
- $(H,H)$ in both;
- $(S,S)$ then $(H,H)$;
- $(H,H)$ then $(S,S)$.

The third is easily mistaken for a reward structure, since tomorrow differs from today. But a reward means tomorrow's behaviour **depends on** today's, not that tomorrow differs from today. If tomorrow is hare regardless of what happens today, there is no reward and no punishment.

**Now: can we find an SPNE whose first period is not a Nash equilibrium?** Say the first period plays $(H,S)$.

First see why this requires a punishment. $(H,S)$ is not a Nash equilibrium of the stage game, which means player 1 can unilaterally switch to $S$ in period 0 and raise the current payoff from 1 to 2. For that not to pay, the gain must be clawed back **later** — player 1 must be punished.

But tomorrow is the last period, and the last period can only play some Nash equilibrium. So the only instrument left is to **switch equilibria**. Stag hunt has two: $(S,S)$ is the good day, $(H,H)$ the bad one.

**The construction.** Target: play $(H,S)$ in period 0; reward good behaviour with $(S,S)$, punish deviation with $(H,H)$.

| History | Player 1 | Player 2 | Meaning |
| --- | --- | --- | --- |
| empty history | H | S | the target path |
| last period $(H,S)$ | S | S | stayed on course: reward |
| last period $(S,S)$ | H | H | player 1 deviated: punish |
| last period $(H,H)$ | H | H | player 2 deviated: punish |
| last period $(S,H)$ | either equilibrium | either equilibrium | both deviated; unreachable |

The last row needs explaining. To reach $(S,H)$ from $(H,S)$, player 1 must switch from H to S **and** player 2 from S to H — both at once. That is not a unilateral deviation, so Nash equilibrium says nothing about it, and the cell can hold anything, provided it holds a Nash equilibrium so that the period-1 subgame is itself in equilibrium.

**Verification.** First the four period-1 subgames: each cell holds $(S,S)$ or $(H,H)$, both Nash equilibria of the stage game. Fine.

Then period 0. On the equilibrium path:

- Player 1: 1 in period 0, 2 in period 1, average $1.5$.
- Player 2: 0 in period 0, 2 in period 1, average $1$.

Player 1 deviating to $S$ (period 0 becomes $(S,S)$, period 1 is punished to $(H,H)$): 2 then 1, average $(2+1)/2=1.5$. Exactly the same as the $1.5$ without deviating.

Player 2 deviating to $H$ (period 0 becomes $(H,H)$, period 1 stays $(H,H)$): 1 then 1, average $1$. Exactly the same as the $1$ without deviating.

So both deviations are **exactly** unprofitable, resting on weak inequalities. Item by item: player 1 gains 1 in period 0 and loses 1 in period 1; player 2 gains 1 and loses 1. The gain and the loss cancel, which is what Ball means by "the punishment is just large enough to offset the gain today".

The equality is tight. Change $(S,S)$ to $(3,3)$ and player 1's deviation pays $(3+1)/2=2>1.5$, and the equilibrium disappears. Stag hunt supports this example half because it has two equilibria and half because these particular numbers happen to balance.

![The five-cell strategy table for two-period stag hunt: play (H,S) at the empty history, reward with (S,S), punish either deviation with (H,H), and fill (S,H) with either equilibrium; the right panel shows 1.5 against 1.5 for player 1 and 1 against 1 for player 2](/images/finitely-repeated-games-stag-hunt-en.svg)

*Figure: rewards and punishments are written as "which equilibrium next period" — the last period must play some Nash equilibrium, but which one may depend on history.*

**Why this works here and not in the prisoner's dilemma.** Because the last period must play some Nash equilibrium, and **which one** may depend on history. The prisoner's dilemma has only one, so the last period offers no choice, punishment has nothing to work with, and backward induction flattens everything. Stag hunt has two, so the last period becomes a switch that can hand out rewards or punishments.

## What this lecture establishes

1. **Repetition plus observability** is what makes rewards and punishments possible: the future is where they land, and observation is how the future is made to depend on the past.
2. When the stage game has a unique Nash equilibrium, every finite repetition has a unique SPNE: play that equilibrium at every history. The prisoner's dilemma therefore has only "defect every period".
3. The proof is backward induction, but the operative fact is not "the future is fixed" — it is "**the future is independent of history**". Once that holds, the channel from today's action to tomorrow's play is closed.
4. An action in a repeated game has two effects: it changes the flow payoff, and it changes future histories. All rewards and punishments live in the second.
5. Strategy and outcome must be kept apart: the outcome is a path, the strategy an answer at **every** history, including histories never reached.
6. Punishment needs alternatives: the last period must play some Nash equilibrium, but which one can depend on history. Stag hunt's two equilibria support an SPNE whose first period is not an equilibrium at all.

## Check your understanding

**1. Why can't cooperation survive in the three-period prisoner's dilemma?**

Because of backward induction. Period 3 has no future and must play the stage-game equilibrium $(D,D)$. Since period-3 behaviour is then independent of history, nothing done in period 2 affects period 3, so period 2 is left with the current incentive alone — again $(D,D)$. The same argument gives $(D,D)$ in period 1. Cooperation needs the chain "cooperate today, be repaid tomorrow", and that chain breaks at the last period and then breaks all the way back.

**2. Where exactly does the proof use uniqueness? Would the conclusion survive if last-period play were fixed but history-dependent?**

It is used in the second-to-last period. If last-period play is independent of history, changing my action there changes only the input to the strategy and not the output, so the second effect vanishes. If last-period play depended on history — "defect forever if you defect" — then changing today's action would change tomorrow's behaviour, rewards and punishments would return, and the conclusion would fail. The operative condition is independence from history, and uniqueness is what delivers it.

**3. Why does "play $(S,S)$ in period 0 and $(H,H)$ in period 1" not count as a reward or punishment?**

Because a reward requires tomorrow's behaviour to **depend on** today's. In that strategy, period 1 plays $(H,H)$ whatever happened in period 0 — the function is constant, there is no dependence. It is a genuine SPNE (each period plays a Nash equilibrium and the future is independent of the past), but it is not a reward structure.

**4. In the stag hunt example, what does player 1 gain by deviating, and why is the equilibrium "weak"?**

On path player 1 gets $(1+2)/2=1.5$; deviating to $S$ gives $(2+1)/2=1.5$. Identical, so the deviation is not strictly harmful, merely not profitable. Player 2 is the same: $1$ against $1$. The equality makes it a weak equilibrium — perturb the payoffs, say to $(3,3)$ at $(S,S)$, and player 1 deviates for $(3+1)/2=2>1.5$, and the equilibrium vanishes.

**5. Why can the $(S,H)$ cell be filled with anything?**

Because reaching $(S,H)$ from $(H,S)$ requires both players to change action at once, which is not a unilateral deviation. Nash equilibrium constrains only unilateral deviations, so this cell affects nobody's incentive. The one restriction is that it must hold a Nash equilibrium (here $(S,S)$ or $(H,H)$); otherwise that period-1 subgame is not in equilibrium and the profile is not an SPNE.

**6. If the horizon went from 2 to 3, could stag hunt still support a first period that is not an equilibrium?**

Yes, and with more instruments. The last period must still pick one of the two Nash equilibria, and the intermediate periods can also carry rewards and punishments. Ball only works $T=1$, but the pattern is the same: as long as the final period has several equilibria to choose from, the punishment signal can be carried all the way back. Supplement: this is a directional judgement; the lecture does not construct the $T=3$ case.
