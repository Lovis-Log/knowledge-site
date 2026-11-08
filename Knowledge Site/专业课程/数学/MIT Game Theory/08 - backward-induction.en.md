---
slug: "08-backward-induction"
title: "Backward Induction: Why Nash Equilibrium Tolerates Mistakes Off the Path"
summary: "The ultimatum game has a Nash equilibrium in which the responder refuses money handed to her — because that information set is never reached. Backward induction demands optimal play at every contingency, which rules out non-credible threats and yields a constructive proof that every perfect-information game has a pure-strategy equilibrium."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "backward-induction"
  - "credible-threats"
sources:
  - kind: "video"
    title: "Lecture 8: Backward Induction"
    url: "https://www.youtube.com/watch?v=VHex0a2JFWI"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Nash equilibrium carries a hidden premise: the game is a table of strategies, everyone submits a plan at once. This lecture puts **time** back in, and then shows that once moves are sequential and observed, the strategic form throws something away — and that something decides which equilibrium is credible.

Ball opens with a classroom experiment. The ultimatum game: there is a pot (100 dollars in class), a proposer decides how to split it, and a responder can only accept or reject; accepting splits as proposed, rejecting leaves both with nothing. The results are stable: **higher offers are more likely to be accepted, low offers more likely to be rejected**, and somebody offered zero. Two student accounts capture the range. One responder says she accepts any positive amount, since otherwise she gets nothing — the ultra-rational line. Another says that if nobody offers him 50 he is annoyed and refuses — **fairness** at work.

Ball's comment on the second is measured: it is a **cheap punishment**, costing the refuser little while denying the other side too. He adds a limit: if the stake were 50,000 and the offer 49,000, you would probably still accept. So the strength of fairness depends on the amount, which is also why rejections show up with 100 dollars in a lab but large settlements rarely collapse in practice.

He then narrows the question: today only the **static, one-shot version**, with no reputation effect from "if I reject now, he will offer more next round" — that belongs to repeated games.

The analysis starts from a 3-dollar version. The proposer may offer a whole number 0, 1, 2 or 3 (the amount going to the responder), and the responder accepts or rejects. In the extensive form the proposer has four branches, each followed by a responder decision node, and the responder has four information sets (he observes the offer), each with two actions.

In the strategic form the two strategy sets are wildly asymmetric: the proposer's strategy is a single number from $\{0,1,2,3\}$, while the responder's strategy is a **four-tuple** specifying accept or reject at each of the four offers, so there are $2^4=16$ of them. This is the hinge for everything that follows: **a strategy is a complete contingent plan, not the action that happens to be taken**.

A Nash equilibrium can now be built: the responder plays $(\text{R},\text{R},\text{A},\text{A})$ — refuse 0 or 1, accept 2 or 3 — and the proposer offers 2. Check: given that strategy, offering 2 yields 1, offering 0 or 1 is rejected for 0, offering 3 yields 0, so 2 is optimal; given an offer of 2, accepting yields 2 and rejecting 0, so accepting is optimal. The equilibrium holds.

But it is uncomfortable: **at an offer of 1 the responder refuses, giving up 1 to take 0**. That looks like a plain mistake. And yet it is still a Nash equilibrium — which is the paradox this lecture exists to resolve.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The ultimatum experiment: proposer and responder |
| 1:18 | Results and fairness: low offers rejected, at a cost to the refuser |
| 5:06 | The 3-dollar sequential version and its extensive form |
| 8:13 | Strategic form: the responder's strategy is a four-tuple |
| 9:50 | The common strategy $(\text{R},\text{R},\text{A},\text{A})$ and the equilibrium at 2 |
| 13:03 | Why a "mistake" at an unreached information set is permitted |
| 16:08 | Complete contingent plans discard the observability of deviations |
| 19:56 | The Boston game with observed moves |
| 25:47 | Three Nash equilibria, only one optimal everywhere |
| 28:16 | Working backwards: start at the last layer |
| 31:25 | Non-credible threats |
| 33:06 | The algorithm: input, output, three properties |
| 40:27 | Every perfect-information game has a pure-strategy Nash equilibrium |
| 41:47 | The value of chess can only be $+1$, $-1$, or $0$ |
| 46:21 | Stackelberg: sequential quantity competition |
| 1:00:02 | $Q_2^\ast(q_1)=\max\{\frac{1-q_1-C}{2},\,0\}$ |
| 1:04:47 | $q_1^\ast=\frac{1-C}{2}$ against Cournot's $\frac{1-C}{3}$ |
| 1:10:03 | Threatening to flood the market: Nash, but not backward induction |

## The ultimatum game: a valid equilibrium with a hole in it

Write the game down. The proposer (player 1) names $s\in\{0,1,2,3\}$, the amount for the responder; the responder (player 2) sees $s$ and accepts or rejects. Payoffs are

$$
\text{accept}:\ (3-s,\;s),\qquad \text{reject}:\ (0,\;0).
$$

In the extensive form, each of the four branches ends at a responder decision node, and those nodes lie in **four distinct information sets** — the responder sees the offer, so he knows which node he is at. That detail becomes the contrast in the Boston game below.

In the strategic form, player 2's strategy is a function

$$
\sigma_2:\{0,1,2,3\}\to\{\text{A},\text{R}\},
$$

conventionally written as a four-tuple whose positions correspond to offers 0, 1, 2, 3. So $(\text{R},\text{R},\text{A},\text{A})$ means: offer me 0 or 1 and I refuse (it feels unfair and I would rather we both get nothing); offer me 2 or 3 and I accept (I get the majority and I am satisfied).

Given that strategy, what should the proposer offer? Enumerate:

- Offer 0: rejected, payoff 0.
- Offer 1: rejected, payoff 0.
- Offer 2: accepted, payoff $3-2=1$.
- Offer 3: accepted, payoff 0.

The maximum is 1, so offer 2. Ball compresses the logic into one sentence: **make the lowest offer that will be accepted**. Any lower and it is refused; any higher and money is given away.

So $(s_1=2,\ \sigma_2=(\text{R},\text{R},\text{A},\text{A}))$ is a Nash equilibrium. Neither side has a profitable deviation: given an offer of 2, accepting yields 2 against 0 for rejecting; given the responder's strategy, offering 2 yields 1, the largest of the four. It holds.

Now the uncomfortable part: **at the information set following an offer of 1, the strategy says refuse, yet accepting yields 1 and refusing 0**. That is plainly suboptimal. It does not disturb the equilibrium, because given an offer of 2 that information set **is never reached**.

Ball has the room say this and then states it precisely:

> Nash equilibrium does **not** require optimal play at unreached contingencies.

Unpack the sentence. Nash equilibrium only checks whether anyone wants to change unilaterally **along the path that is actually played**. If an information set is off that path, whatever the player has written there does not change the payoff he actually receives, so no optimality condition is violated. Those cells of the strategic form are never opened, and their contents are free.

## What the strategic form throws away

Ball pushes one level deeper: where does the hole come from? His answer is that it comes from **the representation itself**, from complete contingent plans.

In the strategic form, player 2 hands in a full table: refuse 0, refuse 1, accept 2, accept 3. He then forms a belief about player 1 ("he will offer 2") and fills the table optimally given it. One thing is missing from that reasoning: **deviations are observable**.

If player 1 actually offers 1, player 2 **sees** it. Having seen it, his belief that "the opponent offers 2" is refuted — the opponent evidently is not playing as expected. A rational player should re-optimise at that point, not execute a table prepared for a different contingency.

Complete contingent plans forbid that update: they say my action is determined by my belief, and my belief is fixed. So **information arriving over time** is erased.

Ball's phrasing: the strategic form throws away the tree, and the tree is exactly where "who knew what, when" is stored. That is why this lecture **returns to the extensive form**. Every solution concept so far — Nash equilibrium, rationalizability — depended only on the strategic form; from today the structure of the tree itself starts to carry content.

## The Boston game: three equilibria, one credible

A smaller example makes the issue visible. Back to the Boston game: two people choose the Celtics (C) or the Red Sox (R), player 1 prefers basketball, player 2 prefers baseball, going together gives 2 and 1 (or 1 and 2), going separately gives 0 to each.

The original version was simultaneous. Today it is **sequential**: player 1 chooses, player 2 observes, then chooses. Payoffs are unchanged:

$$
(C,C)=(2,1),\quad (C,R)=(0,0),\quad (R,C)=(0,0),\quad (R,R)=(1,2).
$$

Same payoffs, different timing, very different equilibria — the same phenomenon as Cournot versus Stackelberg in the previous lecture.

In the strategic form player 1 has two strategies, C and R; player 2 has two information sets (after C, after R), so a strategy is a four-tuple CC, CR, RC, RR, where the first letter says what he does on seeing C and the second what he does on seeing R.

| | CC | CR | RC | RR |
| --- | --- | --- | --- | --- |
| C | 2, 1 | 2, 1 | 0, 0 | 0, 0 |
| R | 0, 0 | 1, 2 | 0, 0 | 1, 2 |

The rule for filling the table: when player 1 chooses C, the **first** letter of player 2's strategy is what operates, since that is precisely "what to do after seeing C"; when player 1 chooses R, the second letter operates.

Player 1's best response column by column: against CC choose C (2 over 0), against CR choose C (2 over 1), against RC indifferent (0 either way), against RR choose R (1 over 0). Player 2's best response row by row: in row C, CC and CR both give 1 (tied best); in row R, CR and RR both give 2 (tied best).

The intersections give three Nash equilibria:

1. $(C,\ \text{CC})$: both go to basketball.
2. $(C,\ \text{CR})$: player 1 goes to basketball; player 2 follows whatever he observes.
3. $(R,\ \text{RR})$: both go to baseball.

Which is the right one? Ball polls the room and the answer converges quickly on the second, for a direct reason: **only it is optimal at both information sets**.

- At "saw C": playing C gives 1, playing R gives 0, so C.
- At "saw R": playing C gives 0, playing R gives 2, so R.

That is exactly CR. In the first equilibrium player 2 claims "even after seeing R I go to C" — going alone to basketball gives 0 while following gives 2, so the claim would not be carried out if tested. The third equilibrium has the mirror-image problem.

Ball calls such a claim a **non-credible threat**. Player 2 would of course like player 1 to believe "I go to baseball no matter what", because then player 1 goes to baseball himself; but once the threat is actually tested (player 1 goes to basketball), player 2 has no reason to carry it out. Backward induction **systematically eliminates** equilibria of this kind.

## The algorithm: input, output, three properties

Write the backwards procedure as an algorithm.

**Input**: a finite extensive-form game with **perfect information**. Perfect information means every information set is a singleton — whoever moves knows exactly which node he is at. Nature may move, but only visibly (a coin flip everyone watches is fine; a private hand is not, so poker is excluded). Ball explains why this is needed: if two nodes shared an information set, arriving there backwards would leave the player unable to tell which node he is at, and "optimal" would be undefined.

**Output**: a **strategy profile**. Ball hammers this because it is the most common mistake:

> You walk down the tree and read off $(2,1)$. That is not the answer, it is only the payoff. The answer is "player 1 plays C, and player 2 plays C after seeing C and R after seeing R".

**Property one**: the output is a **pure** strategy profile. One action is picked at each node; no mixing is needed.

**Property two**: if no node has a tie (two actions yielding the same payoff), the output is **unique**. With ties, pick one arbitrarily, but pick it, so that a pure profile results.

**Property three**: the output is a **Nash equilibrium**, and a special one — it contains no non-credible threats. The converse fails: other Nash equilibria may exist, and they simply fail this test.

The algorithm also delivers an existence theorem for free:

> **Every finite extensive-form game with perfect information has a pure-strategy Nash equilibrium.**

This does not clash with "some games have only mixed equilibria". Rock-paper-scissors is the counterexample — but it is simultaneous, so in extensive form the first player's three nodes share one information set and it is **not** perfect information; the algorithm does not apply. Nash's theorem (every game has a mixed equilibrium) and this result coexist because perfect information is a very special class.

This also settles a question left open last lecture: why can the value of chess only be $+1$, $-1$, or $0$, and never $0.7$? Because chess is finite, perfect information, and zero-sum. Perfect information makes backward induction deliver a **pure** equilibrium, zero-sum makes equilibrium strategies **security strategies**, so the value equals the payoff at some terminal node. Chess terminals pay only 1, −1, or 0. Hence the value lies in that set. Likewise the value of standard checkers is 0 — optimal play draws (Ball notes that variants may differ and that he had not checked).

The beauty of the argument is that it **never computes anything**. The strategy space of chess exceeds the number of atoms in the universe, so nobody can solve it, yet the theorem pins the answer to three possibilities without saying which.

## Stackelberg: writing "influence" into the objective

The last example applies backward induction to an economic question: **sequential quantity competition**, also called Stackelberg competition.

The setup is nearly the previous lecture's Cournot: two firms, constant marginal cost $C\in(0,1)$, inverse demand $P(Q)=\max\{1-Q,0\}$ with $Q=q_1+q_2$, and profits

$$
\pi_i=q_i\,(1-q_1-q_2-C).
$$

The only change is that **firm 1 moves first and firm 2 observes before moving**. The payoff functions are identical; what changed is the information structure.

The definition of a strategy becomes delicate. Firm 1's strategy is still a number $q_1\ge 0$. Firm 2's cannot be a number, because it must say something at every possible $q_1$, and $q_1$ ranges over all non-negative reals; so the strategy is a **function**

$$
Q_2:\mathbb{R}_+\to\mathbb{R}_+,\qquad q_1\mapsto Q_2(q_1).
$$

Ball stops to correct a notation habit: **$Q_2$ is a function, $Q_2(q_1)$ is a number**. People say "firm 2's strategy is $Q_2(q_1)$", which is mathematically wrong — $Q_2(q_1)$ is the value of the function at one point, "if I observe $q_1$, I produce this much". On problem sets one must be explicit, or the reader cannot tell whether a function or a number is meant.

Note also that $C$ is not part of the strategy. $C$ is a **commonly known parameter** that enters the payoff functions but does not change what players can do. Ball's test: replace $C$ by 3, or rename it $\alpha$, and the strategy sets are unchanged while the payoffs differ. The distinction between strategy sets and utility functions matters throughout the course.

**Step one: solve firm 2.** Given an observed $q_1$, firm 2 maximises

$$
\pi_2=q_2\,(1-q_1-q_2-C)=q_2\bigl[(1-q_1-C)-q_2\bigr].
$$

Using the familiar trick (the optimum of $x(a-x)$ is $a/2$),

$$
Q_2^\ast(q_1)=\frac{1-q_1-C}{2}.
$$

A truncation is needed. If $q_1$ exceeds $1-C$ the market price is already 0, below the cost $C$, so any production loses money. Hence

$$
Q_2^\ast(q_1)=\max\left\{\frac{1-q_1-C}{2},\;0\right\}.
$$

Ball's habit: compute without the truncation, then check the sign; if positive, use it, if negative, take 0. The same "compute then truncate" move recurs later.

**Step two: solve firm 1.** Firm 1 knows firm 2 will react according to $Q_2^\ast$, so its objective is

$$
\pi_1=q_1\bigl[1-q_1-Q_2^\ast(q_1)-C\bigr].
$$

This step is the heart of the example. Substituting $Q_2^\ast$ (assuming no truncation),

$$
1-q_1-C-Q_2^\ast(q_1)=1-q_1-C-\frac{1-q_1-C}{2}=\frac{1-q_1-C}{2}.
$$

Therefore

$$
\pi_1=q_1\cdot\frac{1-q_1-C}{2}.
$$

The factor $\frac12$ multiplies the objective by a constant, so it **does not change the optimum** (only the optimal value). Hence

$$
q_1^\ast=\frac{1-C}{2}.
$$

Substituting back into firm 2's reaction function:

$$
q_2^\ast=Q_2^\ast(q_1^\ast)=\frac{1-\frac{1-C}{2}-C}{2}=\frac{\frac{1-C}{2}}{2}=\frac{1-C}{4}.
$$

Set beside Cournot, the contrast is stark:

| Model | Firm 1 | Firm 2 | Total output | Price |
| --- | --- | --- | --- | --- |
| Cournot (simultaneous) | $\frac{1-C}{3}$ | $\frac{1-C}{3}$ | $\frac{2(1-C)}{3}$ | $C+\frac{1-C}{3}$ |
| Stackelberg (sequential) | $\frac{1-C}{2}$ | $\frac{1-C}{4}$ | $\frac{3(1-C)}{4}$ | $C+\frac{1-C}{4}$ |

The first mover produces **more**, the second mover **less**; total output rises and price falls. Profits can be computed too (these numbers are not on the board; they follow directly from the formulas above): sequentially firm 1 earns $\frac{(1-C)^2}{8}$ and firm 2 $\frac{(1-C)^2}{16}$, while under Cournot each earns $\frac{(1-C)^2}{9}$. So the **first mover is strictly better off and the second mover strictly worse off**.

Why? Ball asks the room for a word and settles on **influence**.

Under Cournot I take the rival's quantity **as given** and optimise against it. Under Stackelberg I know my choice **changes** his choice: produce more, the price falls, he observes and produces less. And "he produces less" benefits me further, because his retreat keeps the price from falling as much.

So the first mover faces a different effective demand: not the residual demand at a fixed rival quantity, but the residual demand given the rival's reaction function, which is flatter because the rival gives way. A flatter demand means marginal revenue declines more slowly, so the optimal quantity is larger. That is the source of the first-mover advantage.

## Credible and non-credible: the threat to flood the market

If backward induction selects one equilibrium, what do the others look like? Ball spends the last minutes constructing one, to show that **Nash equilibrium can accommodate non-credible threats**.

Firm 2's ideal outcome is for firm 1 to produce little. So it can announce a threat strategy:

$$
Q_2(q_1)=
\begin{cases}
\dfrac{1-q_1-C}{2}, & q_1\le \bar q_1,\\[6pt]
100, & q_1>\bar q_1 .
\end{cases}
$$

In words: stay at or below $\bar q_1$ and I respond optimally; exceed it and I **flood the market** — produce 100, crash the price to 0, and leave you with nothing.

Given that strategy, firm 1's best choice is exactly $\bar q_1$: one unit more triggers the flood and zero payoff, one unit less wastes the allowance that does not trigger it. So $(q_1=\bar q_1,\ Q_2)$ is a Nash equilibrium.

Someone immediately objects: is that a threat? Flooding loses firm 2 money too. Ball's answer is the point: **it is not credible, which is why it fails backward induction**. Check the unreached contingencies $q_1\in(\bar q_1,\,1-C)$: flooding yields 0 there, while producing $\frac{1-q_1-C}{2}$ yields positive profit. So firm 2 plays suboptimally at those nodes — precisely "a mistake off the path".

But at the **reached** contingency ($q_1=\bar q_1$) firm 2's response is optimal. So the profile is a Nash equilibrium and not a backward-induction outcome. The structure is identical to the ultimatum case: equilibrium checks the path, backward induction checks the tree.

Ball adds the real-world counterpart: oil cartels run on exactly this threat — "keep production low or I flood the market". And he notes that the natural way to make such a threat credible is to embed it in a **repeated game**: you overproduce today, I flood tomorrow, we return to cooperation the day after, so that punishment becomes rational dynamically. That is the subject of the second half of the course.

![The Boston game in extensive form: player 1 chooses C or R, player 2 decides at two information sets, and backward induction fixes R at I_b first, then C at I_a, giving the profile (C, CR) and the payoff (2, 1)](/images/backward-induction-boston-tree-en.svg)

*Figure: backward induction starts at the rightmost layer, fixes the choice at the unreached information set I_b first, then returns to the root to compare C against R; what comes out is a whole strategy profile, not a payoff.*

## What this lecture establishes

1. Nash equilibrium requires no profitable deviation **on the path that is played** and does **not** require optimal play at unreached contingencies. The responder who refuses 1 in the ultimatum game is therefore compatible with equilibrium.
2. The hole comes from the strategic form: complete contingent plans freeze beliefs and discard the fact that a deviation is observed and should trigger an update.
3. **Backward induction** demands optimal play at every information set, so it eliminates equilibria containing **non-credible threats**. Of the Boston game's three Nash equilibria, only one survives.
4. The algorithm takes a finite perfect-information extensive-form game and returns a **pure strategy profile** (not a payoff), unique absent ties, and necessarily a Nash equilibrium.
5. Hence the existence theorem: **every finite perfect-information game has a pure-strategy Nash equilibrium**. Rock-paper-scissors is no counterexample because it is not perfect information. The value of chess can only be $+1$, $-1$, or $0$ for the same reason.
6. Under sequential quantity competition the first mover can **influence** the second mover's output and therefore produces more: $q_1^\ast=\frac{1-C}{2}$ and $q_2^\ast=\frac{1-C}{4}$, against $\frac{1-C}{3}$ each under Cournot. The first mover strictly gains.

## Check your understanding

**1. In the ultimatum game, why is $(\text{R},\text{R},\text{A},\text{A})$ with an offer of 2 a Nash equilibrium, even though "refuse 1" looks irrational?**

Because given an offer of 2, the information set following an offer of 1 is never reached. Whatever the responder writes there does not change the payoff he actually receives (2), so it creates no missing profitable deviation. Nash equilibrium checks only along the equilibrium path: at an offer of 2, accepting yields 2 and rejecting 0, so accepting is optimal; given the responder's strategy, offering 2 yields 1, the highest of the four. Both conditions hold. If the responder instead accepted 1, the strategy would be $(\text{R},\text{A},\text{A},\text{A})$, still an equilibrium, but the proposer's best offer would drop to 1 with payoff 2.

**2. Why does the strategic form "discard the observability of deviations"?**

The strategic form compresses player 2's choice into a table filled in advance, together with a fixed belief about player 1. In that representation player 2 can never discover that he was wrong: he executes the table, and the table has no input for new information. In the real sequential game, an offer of 1 reveals that the opponent did not offer 2, and that observation should overturn the belief and trigger re-optimisation. The extensive form preserves who knows what and when; the strategic form flattens that structure, which is exactly why it tolerates arbitrary actions on unreachable branches.

**3. Of the Boston game's three Nash equilibria, why does only $(C,\text{CR})$ survive backward induction?**

Because only it is optimal at both information sets. On seeing C, playing C gives 1 against 0 for R, so C; on seeing R, playing C gives 0 against 2 for R, so R. That is CR. $(C,\text{CC})$ requires player 2 to go to C even after seeing R, where going alone yields 0 against 2 for following — suboptimal. $(R,\text{RR})$ makes the mirror-image claim. Both are non-credible threats: they pay only as long as they are never tested.

**4. Why must the output of backward induction be a strategy profile rather than the terminal payoff?**

Because the algorithm determines what happens at every information set, not where the play ends up. In the Boston game the terminal payoff is $(2,1)$, but different profiles can produce it while differing on unreached branches — and those differences are exactly what decides whether a profile passes the test. Reporting only the payoff discards all information about unreached contingencies, which is the entire content of the solution concept. Ball calls this the most common mistake he sees.

**5. Why does "every finite perfect-information game has a pure-strategy Nash equilibrium" not contradict "rock-paper-scissors has only a mixed equilibrium"?**

Because rock-paper-scissors is not a perfect-information game. In extensive form the second mover does not know the first mover's action, so the first mover's three nodes must sit in a single information set, which is not a singleton. The precondition of backward induction fails, the algorithm does not apply, and neither does its conclusion. The two theorems describe different classes: Nash's covers all finite games but guarantees only a mixed equilibrium, backward induction covers perfect-information games but guarantees a pure one.

**6. In sequential quantity competition, why does firm 1 produce more than under Cournot?**

Because its objective changed. Under Cournot firm 1 treats $q_2$ as a constant and its marginal revenue is $1-2q_1-q_2-C$; sequentially it knows $q_2$ falls with $q_1$ (since $\frac{dQ_2^\ast}{dq_1}=-\frac12$), so an extra unit costs only half as much in price. After substitution the objective becomes $q_1\frac{1-q_1-C}{2}$ with marginal revenue $\frac{1-2q_1-C}{2}$. Price falls more slowly, so the optimal quantity is larger, rising from $\frac{1-C}{3}$ to $\frac{1-C}{2}$. The second mover bears the cost: firm 2's output drops from $\frac{1-C}{3}$ to $\frac{1-C}{4}$ and its profit from $\frac{(1-C)^2}{9}$ to $\frac{(1-C)^2}{16}$.
