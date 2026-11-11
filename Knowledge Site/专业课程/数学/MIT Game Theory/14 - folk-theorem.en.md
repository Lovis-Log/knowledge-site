---
slug: "14-folk-theorem"
title: "The Folk Theorem: With Enough Patience, Every Feasible and Individually Rational Payoff Is an Equilibrium"
summary: "The previous lecture built one cooperative equilibrium by hand; this one asks where that process stops. After normalising payoffs to averages, feasibility and individual rationality give the upper bound, and three versions of the folk theorem show that the bound is attained once players are patient enough."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "folk-theorem"
  - "repeated-games"
sources:
  - kind: "video"
    title: "Lecture 14: Folk Theorem"
    url: "https://www.youtube.com/watch?v=3ws34WgJKzk"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture built a subgame perfect Nash equilibrium of the infinitely repeated prisoner's dilemma in which both players cooperate every period, provided the discount factor satisfies $\delta \ge 1/3$. Having built one such equilibrium, the obvious question is where the process stops. Can every outcome be sustained by some SPNE, or is there a fundamental barrier that rules some outcomes out?

The answer leans towards the first option: as long as players are patient enough, **any feasible and individually rational payoff vector** can be the average payoff of some SPNE. This is the folk theorem. The precise version of "anything can happen" is: any outcome can be induced by a subgame perfect Nash equilibrium, where "patient enough" means the discount factor is close enough to one.

The name has a history. Through the 1950s and 1960s game theorists were convinced the result was true but nobody had a formal proof, so it circulated as folk wisdom; it was formalised in the 1970s and 1980s, and Ball notes that his MIT colleague Drew Fudenberg gave one version in a well-known 1986 paper. "Folk" is therefore an accident of history and says nothing about the content.

Two preparations come before the statement. First, a change of units: switch from the discounted sum to the **average discounted payoff**, otherwise "2 every period" is recorded as $2/(1-\delta)$, which diverges as $\delta \to 1$ and stops being readable. Second, make "feasible" precise: each period delivers exactly one payoff vector of the stage game, so a long-run average can only be a weighted average of those vectors — their convex hull.

The theorem itself is a **template** rather than a single result. Fix a stage game $G$ and a feasible vector $v$. Under certain assumptions there is a patience cutoff $\bar\delta \in (0,1)$ such that every infinitely repeated game $G(\delta)$ with $\delta > \bar\delta$ has an SPNE whose payoff is exactly $v$. The three versions differ only in "certain assumptions": stronger assumptions make the theorem easier to prove but cover fewer vectors; weaker assumptions make it stronger but harder. Ball takes them in that order, ending with the 1986 paper.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | What "anything can happen" in infinitely repeated games actually means |
| 1:38 | The prisoner's dilemma: last lecture's cooperative equilibrium needed $\delta \ge 1/3$ |
| 2:44 | Where the name comes from: 1950s–60s folk wisdom, formalised in 1986 |
| 5:40 | The question: which payoff vectors can some SPNE deliver |
| 7:48 | Average discounted payoffs: multiplying by $1-\delta$ to normalise |
| 12:03 | The feasible set as the convex hull of stage-game payoff vectors |
| 16:43 | Individual rationality: payoffs below 0 are ruled out by always defecting |
| 18:56 | Writing the feasible set $V(G)$ as a weighted average |
| 23:23 | The theorem template: a patience cutoff $\bar\delta$ exists |
| 30:34 | Version one, Nash reversion: using a Nash equilibrium as the punishment |
| 33:56 | The proof, starting with the special case $v=u(a^\ast)$ |
| 47:33 | The one-shot gain from deviating versus the permanent loss |
| 52:35 | Letting $\delta \to 1$ shrinks the gain and leaves the punishment |
| 55:44 | Version two, individualized Nash reversion: punishment depends on who deviated |
| 1:04:29 | Version three, minmax: punishments harsher than Nash |
| 1:11:47 | The pure minmax value as a measure of punishment severity |
| 1:14:33 | Proof idea: minmax for a while, then reward the punishers |

## Normalising payoffs first

Earlier lectures used the discounted sum: if the action profile in period $t$ is $a^t$, player $i$ gets

$$
u_i(a^0)+\delta\,u_i(a^1)+\delta^2 u_i(a^2)+\cdots
$$

The weights satisfy $1+\delta+\delta^2+\cdots = 1/(1-\delta)\neq 1$. So "2 every period" is recorded as $2/(1-\delta)$: at $\delta=0.9$ that is 20, an order of magnitude above the largest stage-game payoff of 2, and as $\delta\to1$ it diverges. The arithmetic is right, but the number no longer carries the intuition "2 every period".

From here on the course uses the **average discounted payoff**:

$$
U_i=(1-\delta)\sum_{t=0}^{\infty}\delta^{t}\,u_i(a^{t}).
$$

The leading $1-\delta$ cancels the $1/(1-\delta)$. Check it on a constant stream $\bar u_i$:

$$
U_i=(1-\delta)\bar u_i\sum_{t=0}^{\infty}\delta^{t}
=(1-\delta)\bar u_i\cdot\frac{1}{1-\delta}=\bar u_i .
$$

"Cooperate every period" now reads 2 and "defect every period" reads 0, independently of $\delta$. Ball stresses that this only multiplies every payoff by a positive constant: preferences are unchanged, the set of equilibria is unchanged, only the bookkeeping changes.

The real payoff of the normalisation is a fixed decomposition: **weight $1-\delta$ on today, weight $\delta$ on everything after today**, because

$$
(1-\delta)\big(\delta+\delta^2+\delta^3+\cdots\big)=(1-\delta)\cdot\frac{\delta}{1-\delta}=\delta .
$$

Every deviation calculation below uses only these two coefficients. Ball warns against reading the decomposition as "today matters more than tomorrow" — of course it does; the comparison is between today and the entire future from tomorrow on. As $\delta\to1$ the infinite future dominates the present.

## The feasible set: payoffs that can be averaged

The prisoner's dilemma has four outcomes and four payoff vectors:

| | Player 2 plays C | Player 2 plays D |
| --- | --- | --- |
| Player 1 plays C | 2, 2 | −1, 3 |
| Player 1 plays D | 3, −1 | 0, 0 |

Plotted in the $(u_1,u_2)$ plane these are four points. Each period delivers exactly one of them, so any long-run average lies in their convex hull. That hull is the **feasible set**, written $V(G)$.

Formally, let $G$ be a finite $n$-player stage game, $A$ the set of action profiles, and $u(a)=(u_1(a),\dots,u_n(a))\in\mathbb{R}^{n}$. Then

$$
V(G)=\Big\{\sum_{a\in A}p(a)\,u(a)\;:\;p\in\Delta(A)\Big\},
$$

where $\Delta(A)$ is the set of probability distributions on $A$ (non-negative weights summing to one). With two players the set lives in the plane, with three in space, and beyond that it stops being drawable.

Two sanity checks. First, points outside the hull are unreachable: if a vector is not in the hull it is not a weighted average of the four vertices, and each period can only produce a vertex. Second, points inside the hull are reachable but need timing. The point $(1,1)$ is exactly the midpoint of $(0,0)$ and $(2,2)$: defect half the time, cooperate half the time, and the average is $(1,1)$. Ball flags a technicality: strict alternation between cooperate and defect does not give exactly $(1,1)$, because discounting puts more weight on early periods; randomisation, or long enough blocks, fixes it. The point of the feasible set is **averages**, not the payoff of any particular period.

![The convex hull of the four prisoner's dilemma payoff vectors (2,2), (3,−1), (−1,3), (0,0) is the feasible set; removing the regions where u1<0 or u2<0 leaves the darker region with vertices (0,0), (0,8/3), (2,2), (8/3,0)](/images/folk-theorem-feasible-set-en.svg)

*Figure: the shaded region consists of feasible payoffs with both components at least 0. The sufficiency result also requires the hypotheses of the particular folk theorem, such as payoffs strictly above the minmax values and a discount factor sufficiently close to 1.*

## Individual rationality: 0 is not magic

The feasible set is not yet the answer. Ball asks the room for a point that is obviously impossible, and $(3,-1)$ is the natural candidate. Player 2 gets $-1$ there, yet player 2 has a simple fallback: defect every period. If the opponent cooperates he gets 3, if the opponent defects he gets 0 — either way no less than 0. So no equilibrium can give player 2 a long-run average below 0, because he could switch strategies and do better. The same argument applies to player 1, so the two pieces of the feasible set with $u_1<0$ and $u_2<0$ are cut away, leaving a smaller region. It is usually called the set of payoffs that are feasible and individually rational; Ball says he does not much like the term, but it is the standard one.

The resulting shape is worth computing, because it shows how tight the constraint is. The upper edge of the hull runs from $(2,2)$ to $(-1,3)$, parametrised as $(2-3s,\,2+s)$; setting $u_1=0$ gives $s=2/3$, so the edge crosses the axis at $(0,8/3)$. The right edge runs from $(2,2)$ to $(3,-1)$, parametrised as $(2+t,\,2-3t)$; setting $u_2=0$ gives $t=2/3$, so it crosses at $(8/3,0)$. The darker region therefore has vertices $(0,0)$, $(0,8/3)$, $(2,2)$ and $(8/3,0)$ — two whole triangles smaller than the hull, and $(2,2)$ survives because $2+2=4>8/3$, lying outside the line joining the two intercepts.

Nothing is special about the number 0 here; it is simply the payoff from always defecting in this game. In another game the floor moves. The general floor is the **minmax value**:

$$
\underline{v}_i=\min_{a_{-i}\in A_{-i}}\ \max_{a_i\in A_i}\ u_i(a_i,a_{-i}).
$$

Read it from the inside out: everyone else jointly picks a profile $a_{-i}$, player $i$ best-responds to it, and since the others want him as badly off as possible there is a min on the outside. This is the payoff player $i$ can guarantee himself. In the prisoner's dilemma $\underline{v}_i=0$, since defecting yields at least 0 whatever the opponent does.

Note that the definition lets player $i$ respond *after* seeing $a_{-i}$. That is more generous than choosing simultaneously, so the value is at least as high as the simultaneous-move one — a conservative measure that favours the deviator. This matters in the proof of the third version.

## The template

Strip the three versions down to their shared skeleton:

> Let $G$ be a stage game and $v\in V(G)$. Under **certain assumptions** there exists $\bar\delta\in(0,1)$ such that for every $\delta>\bar\delta$, $G(\delta)$ has an SPNE whose average payoff vector is exactly $v$.

"Exactly $v$" means: the equilibrium path is a sequence of action profiles, and the average discounted payoff each player derives from that sequence equals $v_i$.

Last lecture's result is an instance: $G$ is the prisoner's dilemma, $v=(2,2)$, $\bar\delta=1/3$. The folk theorem advances on two fronts — $v$ may be any feasible vector, not just $(2,2)$, and $G$ may be any game, not just the prisoner's dilemma.

The assumptions cannot be dropped. The previous section showed that some feasible points, such as $(3,-1)$, cannot be delivered by any SPNE. Since the theorem claims to deliver $v$, those bad points must violate the assumptions. The three versions are three increasingly weak sets of assumptions.

What the theorem asserts is **sufficiency**. "Some SPNE delivers $v$" is the conclusion, not a hypothesis; writing it into the assumptions would make the statement a tautology. Each version must therefore supply a condition that refers only to stage-game data — the existence of a worse Nash equilibrium, or $v$ lying above the minmax value — and then prove that the condition suffices. This also explains why the three proofs look alike: play $a^\ast$ on the path, switch to a punishment off it, and differ only in what the punishment is.

## Version one: Nash reversion

**Assumption**: there is a Nash equilibrium $a^{NE}$ of the stage game with

$$
v_i>u_i(a^{NE})\quad\text{for every player } i .
$$

That is, one Nash equilibrium is worse than $v$ for *everyone*. In the prisoner's dilemma $a^{NE}=(D,D)$ pays $(0,0)$, so the assumption reduces to $v_i>0$, which is precisely the darker region in the figure. The assumption itself screens out the bad points.

**Strategy**: everyone plays $a^\ast$ (with $u(a^\ast)=v$) until somebody deviates; after any deviation, everyone plays $a^{NE}$ forever. This section and the next two prove only the case where $v$ equals the payoff $u(a^\ast)$ of a single action profile. A general $v\in V(G)$ may only be a lottery over action profiles, with no single profile delivering it, so each period has to draw from that lottery — and when the lottery correlates the players' actions, a public randomisation device is needed — which adds one layer of work on mixing: messier, Ball says, but the conclusion is unchanged.

**Verification**. Use the one-shot deviation principle: a profile is an SPNE exactly when no player gains from deviating once and then returning to the profile, at any history. There are infinitely many histories, so the key step is to group them — and here the strategy only distinguishes two cases.

Case one: somebody has already deviated. The strategy says play $a^{NE}$ forever. Since $a^{NE}$ is a Nash equilibrium, no unilateral deviation improves the current payoff, and because play never leaves this state the future does not depend on the past either. So "play $a^{NE}$ forever" is an equilibrium of every such subgame, with no condition on $\delta$.

Case two: nobody has deviated. Playing along gives $u_i(a^\ast)=v_i$ every period, hence average $v_i$. A one-shot deviation to some $a_i'\neq a_i^\ast$ yields $u_i(a_i',a^\ast_{-i})$ today and $u_i(a^{NE})$ from tomorrow on. With the normalised weights, the net gain is

$$
\Delta_i(a_i')=(1-\delta)\big[u_i(a_i',a^\ast_{-i})-u_i(a^\ast)\big]
+\delta\big[u_i(a^{NE})-u_i(a^\ast)\big].
$$

The first term is the gain today, weighted $1-\delta$; the second is the permanent loss, weighted $\delta$. Let $g=u_i(a_i',a^\ast_{-i})-u_i(a^\ast)$ be the one-shot gain and $l=u_i(a^\ast)-u_i(a^{NE})>0$ the per-period loss. Then $\Delta_i(a_i')\le0$ iff

$$
(1-\delta)g-\delta l\le 0
\iff g\le \delta(g+l)
\iff \delta\ge\frac{g}{g+l}.
$$

So the threshold is **gain over gain plus loss**. If $g\le 0$ — deviating does not even pay today — the condition holds automatically.

Plugging in the prisoner's dilemma: $a^\ast=(C,C)$, $a^{NE}=(D,D)$, $g=3-2=1$, $l=2-0=2$, hence $\delta\ge1/3$, matching the previous lecture.

Each pair $(i,a_i')$ yields a threshold $\bar\delta_i(a_i')$. The theorem needs a single cutoff, so take the maximum: once $\delta$ exceeds the largest threshold, no deviation pays. Ball notes that finiteness is doing real work here — only finitely many pairs exist, so the maximum exists. (Supplement: with continuous action sets this step needs extra compactness or continuity, and the maximum may have to be replaced by a supremum.)

The economics of the threshold is now transparent: a larger $\delta$ lowers the weight $1-\delta$ on today, thinning the one-shot gain, while raising the weight $\delta$ on the punishment. "Patient enough" means the future loss outweighs today's temptation.

## Version two: punish according to who deviated

Version one needs a **single** Nash equilibrium that punishes everybody. But games often have several equilibria, one bad for player 1 and another bad for player 2 — Ball points to the Boston game discussed earlier, where different equilibria favour different players. There is no reason to use the same punishment for all.

**Assumption**: for each player $i$ there is a Nash equilibrium $a^{NE,i}$ (possibly different across players) with

$$
v_i>u_i(a^{NE,i}).
$$

This is weaker than version one: instead of one equilibrium that hurts everyone, each player merely needs an equilibrium he dislikes.

**Strategy**: everyone plays $a^\ast$ until a deviation occurs; identify the **first** player $i$ to deviate, and from then on play $a^{NE,i}$ forever.

Each player now faces a punishment tailored to him, so the deterrent is sharper and more vectors $v$ become sustainable.

Two definitional traps. First, what if somebody deviates again later? Answer: only the first deviator matters; whatever happens afterwards, play stays in that punishment equilibrium. Second, what if two players deviate simultaneously? Ball says randomising over whom to punish works, and in fact **any** choice works — a player contemplating a unilateral deviation cannot produce the history "two players deviated at once", so that contingency never enters his own calculation. As long as simultaneous deviations land on some Nash equilibrium, the subgame is fine.

That observation is worth pausing on: subgame perfection constrains only the subgames a deviator can actually reach. What is written at histories nobody can reach matters only for internal consistency.

## Version three: punishments harsher than Nash

Both earlier versions punish with a Nash equilibrium. But in some games the harshest punishment is not a Nash equilibrium. Ball's example is Cournot: the usual punishment is for one firm to flood the market and crash the price, yet flooding is terrible for the flooder too, so it is not a Nash equilibrium — without an external reason, the punisher would not carry it out.

That is the problem the third version solves, and it is the content of the 1986 paper. The limit of punishment is the minmax value $\underline{v}_i$ defined above. **Assumption**:

$$
v_i>\underline{v}_i\quad\text{for every player } i,
$$

plus a technical condition: $V(G)$ has full rank. Ball says explicitly that this will not be examined; he includes it only to avoid stating something false.

These assumptions are weaker than both earlier sets: $v_i$ need not exceed any Nash equilibrium payoff, only the harshest punishment. So more vectors qualify, and the theorem is stronger.

The difficulty is "who punishes the punisher". If player 1 is to punish player 2 severely, the punishment may hurt player 1 badly, so player 1 may prefer not to carry it out; then someone must punish player 1 for not punishing; then someone must punish that player, and so on. Ball says this infinite regress is exactly why the result took so long.

The solution is not another layer of punishment but a **reward**: the strategy has two components — punish deviations, and reward those who actually carry out the punishment. The punisher is compensated afterwards, so punishing becomes worthwhile.

The proof sketch has three stages:

1. Everyone plays $a^\ast$ until a deviation.
2. If player $i$ deviates, everyone minmaxes player $i$ for $n$ periods.
3. If the first two stages are carried out, reward all punishers forever after.

If anyone deviates at any stage, the whole sequence restarts for that deviator: minmax him for $n$ periods, then reward the punishers. The structure is recursive and far more intricate than the first two versions; Ball says the exam will not require the full argument, though a problem set may ask about part of it.

A note on why the punishment is finite (supplement): an endless punishment would never pay the reward, so nobody would carry it out; too short a punishment would not deter. Finite punishment plus "deviate and we restart" delivers both — for large enough $\delta$, the deviator prefers to sit through the punishment and collect the reward rather than retrigger the sequence.

## What this lecture establishes

1. Before analysing a repeated game, change units: use the average discounted payoff $(1-\delta)\sum_t\delta^t u_i(a^t)$, so that "x every period" reads $x$ and the weights are $1-\delta$ today, $\delta$ for the future.
2. The **feasible set** is the convex hull of the stage game's payoff vectors. Points outside it are unreachable because each period produces a single vertex.
3. **Individual rationality** requires each player's average payoff to be at least his minmax value $\underline{v}_i$; below that he can improve by switching strategy. In the prisoner's dilemma the line is 0, but 0 is not special.
4. The folk theorem is a template: given a feasible $v$ and a set of assumptions, there is a cutoff $\bar\delta$ beyond which some SPNE delivers $v$. Weaker assumptions give a stronger theorem and a harder proof.
5. The three versions punish with a common Nash equilibrium, with a deviator-specific Nash equilibrium, and with the minmax value. In the first two the threshold is $\delta\ge g/(g+l)$: one-shot gain over gain plus permanent loss; the third proof has no such form.
6. The obstacle to harshest punishment is that the punisher would rather not execute it; rewarding the punisher, rather than punishing the non-punisher, cuts the infinite regress.

## Check your understanding

**1. How does $\delta\ge1/3$ in the prisoner's dilemma come out of $g/(g+l)$?**

$a^\ast=(C,C)$ pays 2, $a^{NE}=(D,D)$ pays 0, and the best deviation is to switch unilaterally to $D$ for 3. So the one-shot gain is $g=3-2=1$ and the per-period loss is $l=2-0=2$, giving $g/(g+l)=1/3$. Intuitively the deviation buys one extra unit today and costs two units every period afterwards; the future must weigh enough to cancel that.

**2. How is $(1,1)$ achieved inside the feasible set, and why is $(2.5,2.5)$ impossible?**

$(1,1)$ is the midpoint of $(0,0)$ and $(2,2)$: defect half the time, cooperate half the time, and the average is $(1,1)$. Strict implementation has to handle the timing bias introduced by discounting, which randomisation or long blocks take care of. $(2.5,2.5)$ lies outside the hull: the highest single-period payoff is 3, but the period in which a player gets 3 gives the opponent $-1$, so the two payoffs in any period sum to at most 4 (attained only at $(2,2)$), and averaging preserves that, so both components cannot exceed 2.

**3. Why does the Nash reversion proof need only one cutoff, and what changes with continuous actions?**

Each pair $(i,a_i')$ produces its own threshold $\bar\delta_i(a_i')$, and taking the maximum gives a single cutoff. This relies on the action set being finite: only finitely many thresholds exist, so the maximum is attained. (Supplement: with a continuum of actions one needs compactness or continuity, and the maximum becomes a supremum that may not be attained.)

**4. In what sense is the individualized version stronger than Nash reversion?**

Its assumption is weaker. Nash reversion requires one equilibrium that punishes everybody at once; the individualized version only requires each player to have some equilibrium he dislikes, allowing different punishments for different deviators. Weaker assumptions cover more vectors $v$, hence a stronger conclusion. The price is a more elaborate strategy that must specify the first deviator and handle simultaneous deviations.

**5. Why does the minmax version use three stages instead of permanent minmax?**

Permanent minmax need not be subgame perfect: the punisher is hurt by his own punishment and has no reason to carry it out, which calls for someone to punish him, and then someone to punish that player, without end. Splitting the punishment into a finite phase followed by a reward gives the punisher a reason to comply, and the regress stops.

**6. Does the folk theorem say that anything at all can be an equilibrium of a repeated game?**

Feasibility and individual rationality give necessary bounds: discounted averages cannot leave the convex hull of stage payoffs, and a player can guarantee the minmax value. Sufficiency depends on the version’s additional hypotheses, such as strict individual rationality and sufficiently patient players. Even then, the theorem describes attainable payoffs without selecting a unique equilibrium.
