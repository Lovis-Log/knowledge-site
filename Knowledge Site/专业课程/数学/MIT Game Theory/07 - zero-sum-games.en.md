---
slug: "07-zero-sum-games"
title: "Zero-Sum Games: Worst-Case Guarantees and the Minimax Theorem"
summary: "When one player's gain is exactly the other's loss, a single payoff function suffices: one player maximises it, the other minimises it. That yields security strategies and the value of a game, and von Neumann's minimax theorem says moving first is no disadvantage."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "zero-sum"
  - "minimax-theorem"
sources:
  - kind: "video"
    title: "Lecture 7: Zero-Sum Games"
    url: "https://www.youtube.com/watch?v=CBCf8iWKFZY"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Every solution concept so far rests on "form a belief, then best-respond", with the belief supplied from outside. This lecture takes a different road: never mind what the opponent will do, ask **what can I guarantee**. The road is narrow — it only works for zero-sum games — but it runs a long way, all the way to a striking theorem.

Zero-sum means **interests in complete conflict**: one player gains a unit exactly when the other loses one, so payoffs sum to zero. Ball stresses at the outset that "gain" and "loss" refer to utility, not money. Chess and checkers are the standard examples (assuming players care only about winning): win 1, lose −1, draw 0. Monetary exchange can also be zero-sum, but only under two conditions: **no money enters or leaves** (if someone's parents hand us cash mid-negotiation, it stops being zero-sum), and **both players are risk neutral**. The second is easy to miss: if both are risk averse, a "fair" bet can reduce both players' expected utility, so money is conserved while utility is not, and the game is no longer zero-sum. Risk neutrality here means precisely that the von Neumann–Morgenstern utility of money is linear, making you indifferent between $10 for sure and a lottery paying 0 or 20 with equal probability.

Historically, zero-sum games were the **first** games studied, by mathematicians motivated by chess and checkers. Economists arrived later, and most economic settings are not zero-sum — Ball quotes the politician's line that "this is not a zero-sum game, there is some arrangement that makes us both better off". So today the course steps backwards to lay the earliest foundation. The foundation is elegant: clean conclusions, short proofs, and a payoff at the end that explains why bluffing is rational.

One convention runs through everything and is the main source of confusion: since $u_2=-u_1$, only **one** function survives, $u=u_1$. But the two players do **opposite** things with it — player 1 maximises it, player 2 minimises it. Ball admits this is not the hardest material in the course but probably the easiest to get lost in, because the board fills with mins and maxes over the same $u$.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Zero-sum games: complete conflict of interest |
| 1:21 | Chess and checkers: win 1, lose −1, draw 0 |
| 2:38 | The two conditions for monetary exchange to be zero-sum |
| 6:13 | The definition $u_1(s)+u_2(s)=0$, and the convention $u=u_1$ |
| 10:59 | Rock-paper-scissors with one number per cell |
| 13:10 | Worst-case reasoning: every pure strategy guarantees −1 |
| 14:54 | The mixture $(\frac13,\frac13,\frac13)$ guarantees 0 |
| 17:08 | Worst gain $\mathrm{WG}$ and worst loss $\mathrm{WL}$ |
| 19:10 | The minimum need only range over the opponent's pure strategies |
| 23:43 | Why $\mathrm{WG}$ is a concave function |
| 24:39 | The definition of a security strategy |
| 27:32 | Securable gain $\underline{v}$ and securable loss $\bar{v}$ |
| 30:22 | $\underline{v}\le\bar{v}$, and why moving first is weakly bad |
| 38:46 | The minimax theorem (von Neumann, 1928) |
| 45:03 | The value of chess can only be $+1$, $-1$, or $0$ |
| 47:02 | Example: the game with payoffs $1,1,-4,-8$ has value 1 |
| 54:20 | Nash equilibria and security strategies coincide in zero-sum games |
| 1:14:02 | von Neumann poker: bluffing as a corollary of the theorem |

## Zero-sum: an extreme but clean assumption

The definition is blunt. For every strategy profile $s=(s_1,s_2)$,

$$
u_1(s)+u_2(s)=0 .
$$

Ball notes that this looks like one equation but is really a **family** of equations — one for each pair of strategies. It follows immediately that $u_2(s)=-u_1(s)$: player 2's utility is fully determined by player 1's. So a zero-sum game does not have two independent utility functions, only one.

Hence the convention. Set $u=u_1$ and record **only that number** from now on. Each cell of the strategic-form matrix drops from two numbers to one, and that number carries a double meaning: it is player 1's gain and simultaneously player 2's loss. Ball is careful here: a high $u$ is good for player 1 and bad for player 2, so the same number means opposite things to the two of them.

Two scope restrictions also matter. Everything today happens in **finite** two-player strategic-form games. Finiteness is technical and many results extend beyond it, but **two players** is essential — with three or more players, even pairwise-opposed interests behave quite differently, and none of today's conclusions carry over. Restricting attention to the strategic form is a modelling choice: chess is naturally an extensive-form game, but any extensive form can be reduced to a strategic form, and today we assume that reduction has been done.

Worth keeping one counterexample in mind, because it shows how strong the assumption is: the prisoner's dilemma is not zero-sum. Both stay mum gives $(2,2)$, both fink gives $(0,0)$; the sums are 4 and 0. That is exactly why cooperation can improve both players there, and why it cannot in a zero-sum game, where one player's gain is by construction the other's loss.

## Rock-paper-scissors and worst-case reasoning

The strategic form of rock-paper-scissors, with one number per cell by our convention:

| | Opponent R | Opponent P | Opponent S |
| --- | --- | --- | --- |
| I play R | 0 | −1 | 1 |
| I play P | 1 | 0 | −1 |
| I play S | −1 | 1 | 0 |

The diagonal is a draw, recorded as 0; rock crushes scissors, scissors cut paper, paper wraps rock, giving the three 1s; the remaining three cells are losses for player 1, recorded as −1.

Now change the question. Instead of asking what the opponent will do, ask **what is the worst that can happen if I choose this strategy**. It is a pessimistic, conservative line of reasoning — Ball grants it is not the only sensible one — but it is worth following to the end.

- Play R: worst case is the opponent plays P, giving −1.
- Play P: worst case is the opponent plays S, giving −1.
- Play S: worst case is the opponent plays R, giving −1.

All three pure strategies guarantee exactly the same thing: −1. Restricted to pure strategies, the game has no answer in the "guarantee" sense — whatever you choose, all you can guarantee is a loss.

But mixing is allowed, and someone in the room supplies the answer at once: play each of rock, paper, scissors with probability $\frac13$. Check it: whatever the opponent plays, I win, lose, and draw with probability $\frac13$ each, so expected payoff

$$
\tfrac13(1)+\tfrac13(-1)+\tfrac13(0)=0 .
$$

The worst case has risen from −1 to 0. And 0 is genuinely **guaranteed**: no matter how the opponent plays, including by randomising, my expectation cannot fall below it.

This is the pivot of the lecture. Mixing is not a psychological trick for being unpredictable; it does real mathematical work — **it raises the worst case**. Ball adds that no strategy can guarantee a positive payoff here, so $(\frac13,\frac13,\frac13)$ is already optimal by the guarantee standard.

## Worst gain, worst loss, and security strategies

Formalise the reasoning. If player 1 plays the mixture $\sigma_1$, his **worst gain** is

$$
\mathrm{WG}(\sigma_1)=\min_{\sigma_2\in\Sigma_2} u(\sigma_1,\sigma_2).
$$

Here $\Sigma_2$ is the set of all mixtures for player 2 and $S_2$ the set of his pure strategies, with $S_1$ analogous. One simplification is used constantly: **the minimum need only range over pure strategies**,

$$
\mathrm{WG}(\sigma_1)=\min_{s_2\in S_2} u(\sigma_1,s_2).
$$

The reason: with $\sigma_1$ fixed, $u(\sigma_1,\cdot)$ is a **linear** function of player 2's mixture (an expectation is a weighted average), and a linear function on a simplex attains its minimum at a vertex. So the opponent gains nothing by mixing — whatever damage a mixture can do, some pure strategy can do too.

Symmetrically, if player 2 plays $\sigma_2$, his **worst loss** is

$$
\mathrm{WL}(\sigma_2)=\max_{\sigma_1\in\Sigma_1} u(\sigma_1,\sigma_2)=\max_{s_1\in S_1} u(s_1,\sigma_2).
$$

Watch the direction of the inequality. Test it on rock-paper-scissors: what is player 2's worst loss from playing R? Not −1, but **1**. Because $u$ records player 1's payoff, and when player 1 plays P we get $u=1$, meaning player 2 loses 1. Player 2 wants to minimise that number, so his worst case is the largest. This sign convention is the single most common source of error in the lecture.

With these two quantities in hand, the central concept:

- Player 1's strategy $\sigma_1^\ast$ is a **security strategy** if $\mathrm{WG}(\sigma_1^\ast)\ge \mathrm{WG}(\sigma_1)$ for all $\sigma_1$.
- Player 2's strategy $\sigma_2^\ast$ is a security strategy if $\mathrm{WL}(\sigma_2^\ast)\le \mathrm{WL}(\sigma_2)$ for all $\sigma_2$.

The inequalities point in opposite directions, again because of the asymmetry. And note that the search **must** range over mixed strategies: rock-paper-scissors is the counterexample, where every pure strategy guarantees −1 and only mixing reaches 0.

Name the optimal values:

$$
\underline{v}=\max_{\sigma_1}\mathrm{WG}(\sigma_1),\qquad
\bar{v}=\min_{\sigma_2}\mathrm{WL}(\sigma_2).
$$

Read them as: $\underline{v}$ is the gain player 1 can **secure** (he gets at least this much), and $\bar{v}$ is the ceiling on the loss player 2 can **secure** (he loses at most this much).

An inequality follows at once:

$$
\underline{v}\le\bar{v}.
$$

The proof is two lines but worth reading slowly. Let $\sigma_1^\ast,\sigma_2^\ast$ be security strategies and look at the realised payoff $u(\sigma_1^\ast,\sigma_2^\ast)$:

$$
\underbrace{\mathrm{WG}(\sigma_1^\ast)}_{\underline{v}}\;\le\;u(\sigma_1^\ast,\sigma_2^\ast)\;\le\;\underbrace{\mathrm{WL}(\sigma_2^\ast)}_{\bar{v}} .
$$

The left inequality is the definition of $\mathrm{WG}$ (I am guaranteed at least my worst case, and whatever the opponent actually does can only be better), the right one is the definition of $\mathrm{WL}$ (his loss cannot exceed his worst case). The middle number is squeezed from both sides, so $\underline{v}\le\bar{v}$.

Ball offers a very usable reading: **moving first is weakly bad**. If player 1 moves first and his mixture is observed, player 2 picks the strategy that minimises $u$, so player 1 ends up with exactly $\mathrm{WG}(\sigma_1^\ast)=\underline{v}$. Conversely, if player 2 moves first and is observed, player 1 maximises $u$ and player 2's loss is exactly $\bar{v}$. The two numbers therefore describe "player 1 moves first" and "player 2 moves first", and $\underline{v}\le\bar{v}$ says that **being seen only hurts you**. In a zero-sum game that is entirely natural: interests are opposed, so information is power.

## The minimax theorem: moving first costs nothing

At this point intuition says $\underline{v}$ is usually strictly below $\bar{v}$: whoever moves first and is seen should lose something. von Neumann's 1928 theorem says that in a finite two-player zero-sum game the two numbers are always equal:

$$
\max_{\sigma_1}\min_{\sigma_2}u(\sigma_1,\sigma_2)\;=\;\min_{\sigma_2}\max_{\sigma_1}u(\sigma_1,\sigma_2).
$$

The common value is written $v$ and called the **value of the game**.

The content deserves unpacking. The left side is "player 1 moves first, is observed, and player 2 then does his worst"; the right side is "player 2 moves first, is observed, and player 1 then exploits it". The theorem says player 1's payoff is the same in both. In other words, **if both play optimally, it does not matter who moves first**. This does not contradict the earlier point: "moving first is weakly bad" is $\underline{v}\le\bar{v}$, and the theorem upgrades the weak inequality to an equality.

Ball calls this the most counter-intuitive and most powerful feature of zero-sum theory. It turns "who has the advantage" from a matter of opinion into a computable number. Before von Neumann one would say that who has the advantage in chess depends on who plays better; after the theorem, one can say the game has an objective value measuring the relative advantage under optimal play.

The most striking corollary concerns chess. Chess is a finite zero-sum game, so the minimax theorem guarantees it has a value; Ball goes further and asserts that the value can only be $+1$, $-1$ or $0$, since terminal payoffs are only win 1, lose −1, draw 0. A value of $+1$ means the first player can guarantee a win, $-1$ means the second player can, and $0$ means both can guarantee a draw. Which is it? **Nobody knows, and nobody will know soon**: the strategy space of chess exceeds the number of atoms in the universe, so the optimisation cannot be solved. The theorem's value lies precisely here — it tells us the answer must be one of three numbers even though we can never compute which.

A word on why the value cannot be $0.7$. Values of zero-sum games can be fractions, because security strategies may require mixing: rock-paper-scissors happens to have value 0, but perturbing the payoffs produces fractional values. Ruling fractions out requires the extra structure of **perfect information**, which guarantees that security strategies can be pure, and a pure security strategy yields the payoff at some terminal node. That argument waits for the backward induction of the next lecture.

A historical note is worth keeping: the theorem appeared in 1928, while Nash's existence theorem came in 1950. Zero-sum theory was therefore complete before Nash; Nash's contribution was to **extend game theory beyond zero-sum**, not to invent equilibrium. Ball puts it pointedly — people call Nash the founder of game theory, but more accurately he opened up the territory outside zero-sum, which happens to be the territory economics needs.

Three examples put the language to work.

**Example one.** Player 1 chooses T or B, player 2 chooses L or R, payoffs (player 1's gain) are

| | L | R |
| --- | --- | --- |
| T | 1 | 1 |
| B | −4 | −8 |

At a glance this looks terrible for player 1 — two large negative numbers underneath. But structure beats magnitudes. Playing T yields 1 whatever the opponent does, so $\mathrm{WG}(T)=1$; playing B yields at worst −8. Mixing cannot raise it either: with probability $p$ on T the expectation against L is $5p-4$, below 1 whenever $p<1$, so the maximum is still attained at $p=1$. Hence $\underline{v}=1$ and T is a security strategy. On player 2's side, L has worst loss $\max\{1,-4\}=1$ and R has worst loss $\max\{1,-8\}=1$, so both are security strategies and $\bar{v}=1$. The value is 1, consistent with the theorem. Ball adds a warning: the large negative numbers do not mean the game favours player 2, because those cells are never reached under optimal play.

**Example two.** Make every payoff in the same game positive: against L, player 2 loses only 1 no matter what player 1 does; against R, player 2 may lose 23 or 8. Cell by cell, every payoff is at least as high as in example one. Yet the value is still 1 — player 2 can hold his loss to 1 by playing L, and player 1 can guarantee 1 with either row.

The lesson: **values cannot be compared cell by cell**. Payoffs rise everywhere while the value is unchanged, because what changed is the credibility of threats, not the securable level. Ball also notes that equal values do not make you indifferent: against a fallible human, the game with higher payoffs is obviously better. The value concept presumes an opponent who is perfectly rational and computes as well as you do.

**Example three.** Matching pennies:

| | L | R |
| --- | --- | --- |
| T | 1 | −1 |
| B | −1 | 1 |

We have met this game before, with two numbers per cell. Its value is 0, and each player's unique security strategy is $\frac12 T+\frac12 B$ and $\frac12 L+\frac12 R$. Pure strategies guarantee −1; mixing lifts the guarantee to 0 — the same mechanism as rock-paper-scissors.

![In matching pennies the worst gain traces a tent as the mixing probability p runs from 0 to 1, peaking at 0 when p=1/2 while both pure strategies give only −1](/images/zero-sum-security-gain-en.svg)

*Figure: the worst gain $\mathrm{WG}$ is the lower envelope of two linear payoffs, hence concave, so its maximum is interior — the geometric reason mixing is indispensable.*

A student asks whether the value must be 0 whenever no strictly dominant strategy exists. Ball says no, and adds a useful line: **a player can have a strictly dominant strategy and still lose badly**. Dominance only says "better than my other strategies", not "good". The two ideas are frequently conflated.

## Security strategies are Nash equilibria

Two languages now coexist: Nash equilibrium speaks of **stability** (nobody can improve unilaterally), security strategies speak of **guarantees** (whatever the opponent does, I am not too badly off). The first makes sense in any game, the second only in two-player zero-sum. The theorem says that in a finite two-player zero-sum game the two **coincide exactly**.

Precisely: for any mixed profile $(\sigma_1,\sigma_2)$,

$$
(\sigma_1,\sigma_2)\ \text{is a Nash equilibrium}\iff \sigma_1 \text{ is a security strategy for player 1 and } \sigma_2 \text{ for player 2.}
$$

**Direction one: two security strategies form a Nash equilibrium.** Let $\sigma_1^\ast,\sigma_2^\ast$ be security strategies. By the minimax theorem $\mathrm{WG}(\sigma_1^\ast)=\mathrm{WL}(\sigma_2^\ast)=v$, and the two-sided squeeze gives

$$
v=\mathrm{WG}(\sigma_1^\ast)\le u(\sigma_1^\ast,\sigma_2^\ast)\le \mathrm{WL}(\sigma_2^\ast)=v,
$$

so $u(\sigma_1^\ast,\sigma_2^\ast)=v$ with equality throughout.

Now consider deviations. If player 2 switches to any $\sigma_2'$,

$$
u(\sigma_1^\ast,\sigma_2')\;\ge\;\mathrm{WG}(\sigma_1^\ast)=v .
$$

Why? Because $\mathrm{WG}$ says "whatever the opponent does, I get at least this much", and $\sigma_2'$ is just one thing the opponent can do. So a deviation by player 2 raises $u$ — and for player 2 a higher $u$ means a larger loss, that is, a worse position. Symmetrically, if player 1 switches to $\sigma_1'$,

$$
u(\sigma_1',\sigma_2^\ast)\;\le\;\mathrm{WL}(\sigma_2^\ast)=v,
$$

so player 1's payoff does not rise. Neither can improve strictly, which is the definition of Nash equilibrium.

**Direction two: equilibrium strategies must be security strategies.** By contradiction. Suppose $(\sigma_1,\sigma_2)$ is a Nash equilibrium and $\sigma_1$ is not a security strategy. Then there is a security strategy $\sigma_1^\ast$ with

$$
\mathrm{WG}(\sigma_1)\;<\;\mathrm{WG}(\sigma_1^\ast)=v .
$$

Also $\mathrm{WG}(\sigma_1)\le u(\sigma_1,\sigma_2)$ (the worst case is no better than the realised payoff) and $\mathrm{WG}(\sigma_1^\ast)\le u(\sigma_1^\ast,\sigma_2)$. Chaining the three:

$$
u(\sigma_1,\sigma_2)\;\ge\;\mathrm{WG}(\sigma_1)\;<\;\mathrm{WG}(\sigma_1^\ast)\;\le\;u(\sigma_1^\ast,\sigma_2),
$$

so $u(\sigma_1^\ast,\sigma_2)>u(\sigma_1,\sigma_2)$: player 1 has a strictly profitable deviation, contradicting equilibrium. Hence equilibrium strategies are security strategies, and the argument for $\sigma_2$ is symmetric.

The theorem has a practical use: **computing a Nash equilibrium splits into two independent optimisation problems**. Find player 1's security strategy (one linear program), find player 2's (another), and put them together. Nash equilibrium is usually hard because "my best depends on what you do"; in a zero-sum game the theorem severs that coupling. Ball says this is genuinely easier for a computer, though not necessarily for a human on an exam, where guessing the mixture is often faster.

## Bluffing at the poker table

The last four minutes use a simplified poker game to show the theory's reach.

Player 1 is dealt a hand $x\in[0,1]$, player 2 a hand $y\in[0,1]$, both uniform, higher better. Each antes 1. Player 1 may **bet** a fixed amount $B$ or **check**. If he checks, hands are compared and the higher hand wins the pot ($\pm 1$). If he bets, player 2 may **call** or **fold**: folding gives player 1 a payoff of 1; calling compares hands and the winner takes both antes plus the bet ($\pm(1+B)$).

One structural detail is crucial: **after a check, player 2 has no right to bet**. In real poker the opponent may bet after a check, and in that version the later mover generally has the advantage. This simplification reverses it, giving player 1 the edge.

Two questions arise. "Who has the advantage" is vague; the precise version is **is the value positive or negative**? "How should I play" is vague; the precise version is **what are the two players' security strategies**? Ball's point is that the theory supplies formalisations of both vague questions.

The conclusion, left as a problem set: the value is positive, so player 1 has the advantage, and player 1 **sometimes bluffs** — betting with a very bad hand.

Why is bluffing rational? Because a security strategy must reckon with every response. If player 1 bet only with good hands, player 2 would always fold and player 1 would collect nothing beyond the ante. Only when bad hands are bet with some probability does player 2 face a real trade-off between calling and folding, and only then do player 1's good hands get paid. Ball notes that before von Neumann, bluffing was regarded as a psychological matter beyond mathematical reasoning; the minimax theorem turns it into a derivable equilibrium phenomenon.

## What this lecture establishes

1. A zero-sum game satisfies $u_1(s)+u_2(s)=0$ for every profile, i.e. interests are in complete conflict. Only one payoff function $u=u_1$ survives, with player 1 maximising and player 2 minimising it.
2. Monetary exchange is zero-sum only if **no money enters or leaves** and **both players are risk neutral**; risk aversion can make a fair bet bad for both in expected utility.
3. The **worst gain** $\mathrm{WG}(\sigma_1)=\min_{s_2}u(\sigma_1,s_2)$ and **worst loss** $\mathrm{WL}(\sigma_2)=\max_{s_1}u(s_1,\sigma_2)$ need only range over the opponent's pure strategies, because expectations are linear in the opponent's mixture.
4. A **security strategy** maximises the worst gain (player 1) or minimises the worst loss (player 2), and the search must include mixtures: in rock-paper-scissors pure strategies guarantee −1 while uniform mixing guarantees 0.
5. $\underline{v}\le\bar{v}$ reads as "moving first and being observed is weakly bad"; the **minimax theorem** says the two are equal in a finite two-player zero-sum game, and the common value $v$ measures the players' objective relative advantage.
6. In a zero-sum game, **Nash equilibrium and mutual security strategies are the same thing**, so finding an equilibrium splits into two independent optimisation problems; bluffing in von Neumann poker is a corollary.

## Check your understanding

**1. In rock-paper-scissors, what is player 2's worst loss from playing R? Why not −1?**

It is 1. The matrix records player 1's gain, which is simultaneously player 2's loss. If player 2 plays R and player 1 plays P, then $u=1$ and player 2 loses 1; if player 1 plays S, $u=-1$ and player 2 gains 1. Player 2 minimises his loss, so his worst case is the cell with the largest $u$, namely 1. Reading "worst loss" as "smallest $u$" is the most common mistake in this lecture.

**2. Why does the minimum inside $\mathrm{WG}$ range only over the opponent's pure strategies, while maximising $\mathrm{WG}$ requires mixing on my own side?**

The two operations point in different directions. With my $\sigma_1$ fixed, $u(\sigma_1,\cdot)$ is linear in the opponent's mixture, and a linear function attains its minimum at a vertex of the simplex, so the inner min can run over pure strategies only. But $\mathrm{WG}$ itself is the **minimum of a family of linear functions**, which is concave rather than linear, and a concave function can peak in the interior — the uniform mixture in rock-paper-scissors is exactly that interior peak. So "the opponent need not mix" and "I must mix" are perfectly consistent.

**3. In the game with payoffs $1,1,-4,-8$, why do the large negative numbers not affect the value?**

Because the value measures what can be **guaranteed**, and guarantees are set by worst cases. Playing T gives 1 in both cells, so player 1 can secure 1; playing B gives at worst −8, so B is never chosen. The −4 and −8 appear only on paths where player 1 errs, which optimal play avoids. For the same reason, making every payoff positive (23 and 8, say) leaves the value at 1: player 2 can hold his loss to 1 by playing L, and player 1 can guarantee 1 with either row.

**4. Why does $\underline{v}\le\bar{v}$ read as "moving first is weakly bad"?**

If player 1 moves first and his mixture is observed, player 2 minimises $u$ and player 1 receives $\mathrm{WG}(\sigma_1^\ast)=\underline{v}$; if player 2 moves first and is observed, player 1 maximises $u$ and player 2's loss is $\bar{v}$. The two numbers are therefore the outcomes of "player 1 first" and "player 2 first", and $\underline{v}\le\bar{v}$ says being seen hurts the first mover. The minimax theorem adds that under optimal play the disadvantage is exactly zero.

**5. Why must two security strategies form a Nash equilibrium?**

Because the minimax theorem gives $\mathrm{WG}(\sigma_1^\ast)=\mathrm{WL}(\sigma_2^\ast)=v$, and the two-sided squeeze forces the realised payoff $u(\sigma_1^\ast,\sigma_2^\ast)=v$. Any deviation by player 2 to $\sigma_2'$ satisfies $u(\sigma_1^\ast,\sigma_2')\ge \mathrm{WG}(\sigma_1^\ast)=v$, so $u$ does not fall — and for player 2 a higher $u$ is a larger loss, hence a worse position. A deviation by player 1 gives $u\le v$, so his payoff does not rise. Neither can improve strictly, which is exactly Nash equilibrium.

**6. In the simplified poker game, why is "betting with a bad hand" part of the equilibrium?**

Because the opponent's best response depends on which hands he believes will bet. If player 1 bet only with good hands, player 2 would always fold and player 1 would win only the ante, never the bet. For player 2 to be genuinely torn between calling and folding, enough bad hands must be bet that calling sometimes runs into a strong hand while folding sometimes surrenders to a bluff. Betting bad hands with some probability is therefore not psychology but a necessary condition for denying the opponent a cheap escape — and the minimax theorem turns it into a computable mixing ratio.
