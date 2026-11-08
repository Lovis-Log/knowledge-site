---
slug: "13-infinitely-repeated-games"
title: "Infinitely Repeated Games: The Discount Factor Decides Whether Cooperation Holds"
summary: "Remove the artificial last period and backward induction loses its starting point. The prisoner's dilemma acquires a cooperative equilibrium for the first time: grim trigger is subgame perfect whenever δ ≥ 1/3. The gentler tit-for-tat, by contrast, works only when δ is exactly 1/3."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "infinitely-repeated-games"
  - "grim-trigger"
sources:
  - kind: "video"
    title: "Lecture 13: Infinitely Repeated Games"
    url: "https://www.youtube.com/watch?v=HRZeLYNhOUw"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Last lecture's conclusion was bleak: in a finitely repeated prisoner's dilemma, cooperation does not hold. Ball opens by naming what drives it — the **last period**. Because everyone knows exactly that there is no round after some date, backward induction has a starting point; and once that point is fixed, every earlier period is flattened in turn.

This lecture removes the device. The reason is not the philosophical question of whether the future is truly infinite, but a plainer observation: **many interactions have no natural last period.** Firms setting prices do not think "we will never set prices again"; governments negotiating do not think "the world ends on some date and there will be no further talks". What the model wants to capture is exactly this absence of a natural endpoint.

The cost is that payoffs can no longer simply be added — an infinite sum may diverge. So we return to discounting: the flow payoff at date $t$ is multiplied by $\delta^t$ and summed. There are three standard readings of $\delta$: an interest rate (a dollar today can be invested), a probability $1-\delta$ that the game ends each period (so $\delta^t$ is the chance of surviving to date $t$), and sheer impatience (ice cream today beats ice cream tomorrow for no further reason).

There is one crucial technical simplification. In a finite game, the further along you are the fewer periods remain, so subgames differ; in an infinite game, **the future is the same length wherever you stand**. Every subgame is therefore structurally the same object, differing only in its history. And the influence of history can be factored out: past payoffs are a constant, and adding a constant or multiplying by a positive number changes no preference, so a subgame's incentives depend only on the discounted sum "from today onward".

With that, equilibria can be built. **Grim trigger**: cooperate as long as nobody has defected, and defect forever once anyone has. It is subgame perfect whenever $\delta\ge 1/3$, with an equilibrium path of permanent cooperation. The intuition: defecting gains 1 today but loses 2 every period thereafter, and with enough patience that trade is not worth making.

Finally Ball examines a strategy that looks more sensible — **tit for tat**, which copies the opponent's previous action. Its outcome is also permanent cooperation, yet it is **not** subgame perfect except when $\delta$ is exactly $1/3$. That contrast is the most interesting thing in the lecture: the strength of a punishment is not a matter of being gentler, it has to be just enough.

## Timeline

| Time | Topic |
| --- | --- |
| 0:31 | Motivation: many interactions have no natural last period |
| 1:26 | The finite result is driven by the endgame; backward induction flattens everything |
| 3:42 | Framework: the same stage game repeated forever, history fully observed |
| 5:40 | Payoffs become discounted sums, $\delta\in(0,1)$ |
| 9:22 | Reading one: interest and inflation, $\delta=1/(1+r)$ |
| 11:29 | Reading two: the game ends each period with probability $1-\delta$ |
| 13:21 | Reading three: pure impatience |
| 14:35 | Written $G(\delta)$: "infinite" alone does not pin down the game |
| 15:21 | A strategy maps histories to actions |
| 24:20 | Every history starts a subgame, and the future is still infinite |
| 28:35 | Factoring out $\delta^t$: a subgame looks only forward |
| 34:01 | Always-defect is still an SPNE with an infinite horizon |
| 42:11 | The grim trigger strategy |
| 46:50 | Intuition: larger $\delta$ makes cooperation easier to sustain |
| 50:13 | Splitting histories by whether they contain D |
| 1:03:36 | The condition $2/(1-\delta)\ge 3$, i.e. $\delta\ge 1/3$ |
| 1:09:40 | Tit for tat: copy the opponent's last action |
| 1:21:40 | Tit for tat is an SPNE only at $\delta=1/3$ |

## Why remove the last period

Look first at where last lecture's conclusion came from. In a finitely repeated prisoner's dilemma, the final period has no future, so it must play the stage-game Nash equilibrium; since final-period behaviour is then independent of history, the second-to-last period loses the channel through which it could influence the future; and once that channel is gone, the second-to-last period is left with the current incentive alone. All the way back, everything collapses into defection.

Every step of that argument leans on the same thing: a known, common endpoint. Much of the world has no such endpoint. Ball gives two examples: firms setting prices do not believe pricing stops next month; international negotiations have no agreed "end of the world". Applying finite-horizon models to such settings systematically understates the scope for cooperation.

So the motive for an infinite-horizon model is not "the future really is infinite" but **removing an endpoint that does not belong to reality**, and seeing what the conclusion becomes.

Ball also sets the two maps side by side. With a finite horizon the scope for rewards and punishments is narrow, and in a game like the prisoner's dilemma there is none at all; with an infinite horizon the possibilities multiply, especially when players are patient — a heavy future can support a great many distinct equilibria. He leaves the "almost anything can happen" result to the next lecture (the folk theorem); today builds the framework and works one example through completely.

## Payoffs: from sums to discounted sums

With a finite horizon we averaged: add up the payoffs and divide by the number of periods. That is impossible here, since there are infinitely many terms and the sum may diverge.

So we use a **discounted sum**. Given an action path $a^0,a^1,a^2,\dots$ (each $a^t$ an action profile, not one player's action), player $i$'s payoff is

$$
U_i=\sum_{t=0}^{\infty}\delta^t\,u_i(a^t)=u_i(a^0)+\delta u_i(a^1)+\delta^2u_i(a^2)+\cdots
$$

with $0<\delta<1$. $\delta=1$ is excluded: the sum may fail to converge and the framework collapses.

Here $a^t$ is the **profile** played in period $t$. The whole sequence $a^0,a^1,a^2,\dots$ is the infinite-horizon stand-in for a **terminal node**: a finite tree has leaves, each corresponding to a complete path of play, while an infinite game has no end, so "an infinitely long action path" plays that role. Ball calls this a useful psychological step — the outcome of the game is no longer a point but a trajectory.

**Three readings of $\delta$.** Ball pauses to ask the room why a dollar tomorrow is worth less than a dollar today; the answers come in layers:

- **Interest and inflation.** A dollar today can go into a bank account or Treasury bills and become $1+r$ tomorrow. So a dollar tomorrow is worth $1/(1+r)$ today, i.e. $\delta=1/(1+r)$. This reading only applies to monetary payoffs.
- **The game may end.** Suppose each period the game ends with probability $1-\delta$ and continues with probability $\delta$. Then the chance of surviving to date $t$ is exactly $\delta^t$, and $\delta^t u_i(a^t)$ is the expected value of that payoff. This reading works for any payoff, and it is the natural bridge between the finite and infinite models.
- **Pure impatience.** Even with certainty of tomorrow and no inflation, most people prefer the ice cream today. Ball calls this a basic behavioural preference, documented in the lab over and over.

In reality $\delta$ is some mixture. The mathematical conclusions do not depend on which reading you keep, so the course takes no stance and simply fixes some $\delta$.

**Notation.** The finite game was $G(T)$; the infinite one is more often written $G(\delta)$, because "infinite" alone does not determine the game — you also need the discount factor. Finite repetitions usually involve no discounting, hence no second parameter.

## Strategies, subgames, and one key simplification

A **strategy** is still a map from histories to actions:

$$
s_i:H\to A_i,\qquad H=\{\varnothing\}\cup A\cup A^2\cup\cdots
$$

$H$ is the union of all possible histories: period 0 has only the empty history, period 1 has $|A|$, period $t$ has $|A|^t$. Ball flags a notational trap: $A^t$ is the $t$-fold Cartesian product of the set $A$, not "$A$ raised to the power $t$" in any numerical sense; superscripts always index time and subscripts always index players. He says the biggest obstacle in learning repeated games is usually just getting the notation right.

There is also a nesting that is easy to miss: $a^t$ is itself a vector $(a_1^t,\dots,a_n^t)$. A history $(a^0,\dots,a^{t-1})$ is therefore a vector of vectors — what every player did in every period is written inside it. Ball suggests picturing a table with players as rows and periods as columns; a history is the content of the first few columns. Seen that way, $s_i:H\to A_i$ demands an answer for every possible way of filling in that table.

**Subgames are still histories.** Last lecture's result carries over unchanged: because everything earlier is observed at the start of each period, each history corresponds to a subgame and conversely.

**The key difference is here.** In a finite game, standing at period $t$ leaves $T-t$ periods, so subgames at different dates have different structures. In an infinite game, standing anywhere leaves **an infinite future**. Every subgame is therefore structurally identical, differing only in what has already happened.

**Simplifying the payoff.** At history $h^t=(a^0,\dots,a^{t-1})$ a player's total payoff is

$$
u_i(a^0)+\delta u_i(a^1)+\cdots+\delta^{t-1}u_i(a^{t-1})+\delta^t\Big[u_i(a^t)+\delta u_i(a^{t+1})+\cdots\Big].
$$

The leading block has already happened and is a constant; the bracketed block is "from today onward". Factoring out $\delta^t$ leaves the discounted sum starting today. By the properties of von Neumann–Morgenstern utility, adding a constant or multiplying by a positive number changes no preference, so **incentives inside the subgame are determined entirely by the bracket**.

From here on the course simply writes a subgame payoff as "today plus $\delta$ tomorrow plus $\delta^2$ the day after, and so on", ignoring the past. Ball concedes this could be written more formally, but the intuition is clear: by period $t$ the earlier numbers are already in the ledger, cannot be changed, and do not affect today's comparison.

## Always-defect is still an equilibrium

First confirm the unsurprising: last lecture's "defect every period" survives the infinite horizon.

Use the one-shot deviation principle. Fix any history $h$ and look at player 1.

- **No deviation**: defect today, the opponent defects, payoff 0; the same tomorrow, forever. The stream is $0,0,0,\dots$.
- **One-shot deviation to cooperate**: today the opponent defects and I cooperate, payoff $-1$; from tomorrow the strategy resumes and both defect forever, payoff 0.

The two differ only in today: $0$ against $-1$. The deviation is strictly worse.

Ball stresses an easy mistake here. One might think: "since we are testing the equilibrium 'always defect', it is enough to check histories where everyone has always defected." **It is not.** The one-shot deviation principle requires checking **every** history, including histories that never occur under this profile — for instance a history of uninterrupted cooperation. The reason is the one that keeps recurring: non-credible threats. A history may be unreachable precisely because someone is supposed to do something foolish there, and planning to do something foolish is itself what breaks the equilibrium.

## Grim trigger: making cooperation an equilibrium

**Definition.** For player $i$:

$$
s_i(h)=
\begin{cases}
C, & \text{if } h \text{ contains no } D,\\[2pt]
D, & \text{if } h \text{ already contains } D.
\end{cases}
$$

"Contains $D$" means **either** player has defected, including oneself. So: cooperate while the record is clean; once it is dirty, defect forever. Ball calls it grim because the punishment is maximal — once triggered, there is no way back.

**A strange-looking implication.** Suppose period 0 actually produced $(C,D)$: player 1 cooperated, player 2 defected. In period 1 both defect. Player 1's motive is obvious — you defected, I punish you. Player 2's is odd: I was the one who defected and you cooperated, so why do I defect too?

The answer is not self-punishment but **anticipating the other's punishment**. Player 2 knows player 1 will defect tomorrow; since tomorrow is $(D,D)$ regardless, defecting today at least salvages something. Ball flags the detail because behaviour that looks like self-punishment is really a response to being punished.

**Verification.** There are infinitely many histories, so they cannot be checked one by one; they are grouped according to the strategy's own structure.

**Group one: histories already containing $D$.** By the strategy both defect today, tomorrow, and forever. Consider a one-shot deviation by player 1 (switching to cooperate):

- No deviation: $(D,D)$ today, 0, and 0 forever after.
- Deviation: $(C,D)$ today, $-1$; thereafter the history still contains $D$, so both defect forever, all 0.

Strictly worse. This group holds for every $\delta$, with no condition.

**Group two: histories containing no $D$.** By the strategy both cooperate today and keep cooperating forever. Player 1's one-shot deviation is to defect today:

- No deviation: 2 every period, discounted sum $2+\delta\cdot2+\delta^2\cdot2+\cdots=\dfrac{2}{1-\delta}$.
- Deviation: $(D,C)$ today, 3; but from tomorrow the history contains $D$, both defect forever, 0 each period. The stream is $3+0+0+\cdots=3$.

So the condition is

$$
\frac{2}{1-\delta}\ \ge\ 3 .
$$

Multiply by $1-\delta>0$: $2\ge 3-3\delta$, hence $3\delta\ge 1$, that is

$$
\delta\ \ge\ \frac{1}{3}.
$$

Equality is allowed, since there the deviation pays exactly the same and Nash equilibrium uses a weak inequality.

**What the threshold means.** Defecting once gains $3-2=1$ today and costs $2-0=2$ every period thereafter. The present value of losing 2 forever is $\delta\cdot 2/(1-\delta)$, and requiring it to cover 1 gives

$$
\frac{2\delta}{1-\delta}\ge 1 \iff 2\delta \ge 1-\delta \iff \delta\ge\frac13 ,
$$

the same condition read differently. Ball notes this reading is useful in exams: if you derive something like $\delta\le 3$, the sign has gone wrong — the threshold must have the form "$\delta$ at least something", because more patience can only help sustain cooperation.

![The grim trigger threshold: the value of cooperating, 2/(1−δ), rises with δ and crosses the one-shot gain from defecting, 3, at δ=1/3; only the shaded region δ≥1/3 is an equilibrium](/images/infinitely-repeated-games-grim-trigger-en.svg)

*Figure: the two lines cross at $\delta=1/3$ — defection pays to the left, cooperation to the right, and the crossing point is the threshold.*

**Outcome and strategy must be separated.** A student asks whether, since the equilibrium has us cooperating forever, one may say "the equilibrium is cooperate forever". Ball says no. The **outcome** is $(C,C),(C,C),\dots$, the path the profile generates; the **strategy** is the piecewise function above, which prescribes very different behaviour at histories that would follow a deviation. And the profile's **outcome** is permanent cooperation for every $\delta$; it is an **equilibrium** only when $\delta\ge1/3$. The two statements must be kept apart.

## Tit for tat: why a gentler punishment fails

**Definition.** Copy the opponent's previous action each period, and cooperate in period 0:

$$
s_i(\varnothing)=C,\qquad s_i(h)=a_{-i}^{\,\text{last period}} .
$$

Ball notes that "copy the opponent's last action" does not yet define a strategy, because period 0 has no previous action. Adding "cooperate in period 0" completes it.

**The outcome.** Period 0 both cooperate; period 1 each copies the other's cooperation; and so on, forever. The outcome is the same as under grim trigger.

**But it is not an SPNE.** Group histories by what happened yesterday: $(C,C)$, $(C,D)$, $(D,C)$, $(D,D)$, with the empty history folded into the $(C,C)$ group because cooperation is played there.

Two groups suffice to make the point.

**Group $(C,C)$, including the empty history.** Following: cooperate today, tomorrow, forever, paying $\dfrac{2}{1-\delta}$. One-shot deviation (defect today): today $(D,C)$ pays 3; tomorrow the opponent copies my $D$ while I copy the opponent's $C$, giving $(C,D)$ and $-1$; the day after it returns to $(D,C)$. The stream is

$$
3,\ -1,\ 3,\ -1,\ \dots
$$

with discounted sum

$$
\frac{3-\delta}{1-\delta^2}.
$$

**Group $(C,D)$ (I cooperated yesterday, the opponent defected).** Following: today I copy the opponent's $D$ and the opponent copies my $C$, so $(D,C)$ pays 3; tomorrow it reverses to $(C,D)$ and $-1$. Following therefore yields exactly $3,-1,3,-1,\dots$. A one-shot deviation (cooperate today instead): today $(C,C)$ pays 2, and thereafter both keep cooperating, so the stream is $2,2,2,\dots$.

**The two streams have swapped.** In the first group, "follow" means cooperate forever and "deviate" means alternate; in the second, the reverse. Hence:

- If "cooperate forever" beats "alternate", deviating in the second group pays — TFT is not an equilibrium.
- If "alternate" beats "cooperate forever", deviating in the first group pays — TFT is not an equilibrium either.

**The only way both can fail to pay is for the two streams to be equal.** Set

$$
\frac{2}{1-\delta}=\frac{3-\delta}{1-\delta^2}=\frac{3-\delta}{(1-\delta)(1+\delta)} .
$$

Cancelling $1/(1-\delta)$ gives $2=\dfrac{3-\delta}{1+\delta}$, i.e. $2+2\delta=3-\delta$, hence $3\delta=1$ and $\delta=\dfrac13$.

This is the check Ball invites: **tit for tat is subgame perfect only when $\delta$ is exactly $1/3$.** Slightly higher or lower and it breaks.

**What the result means.** Tit for tat looks far more reasonable than grim trigger — the punishment lasts one period and then offers a fresh start. But precisely because the punishment is light, it cannot hold for most $\delta$: either it is too weak to offset the temptation, or it is too costly to carry out (at a $(C,D)$ history, continuing to punish hurts the punisher). Grim trigger works because its punishment is heavy enough that no fine calculation is needed.

Ball adds that this explains why TFT does well in real prisoner's dilemma tournaments yet is fragile as a theoretical prediction: it depends on a knife-edge parameter value.

## What this lecture establishes

1. The infinite-horizon model exists to remove the artificial last period, not to assert that the future really is infinite.
2. Payoffs are discounted sums $\sum_t\delta^t u_i(a^t)$; $\delta$ can be read as an interest rate, a survival probability, or pure impatience, and the mathematics does not depend on which.
3. Every subgame in an infinite game has an equally long future, so they are structurally identical; after factoring the past out as a constant, a subgame depends only on the discounted sum from today.
4. Always-defect remains an SPNE, but **every** history must be checked, including unreached ones — otherwise non-credible threats slip through.
5. Grim trigger is an SPNE whenever $\delta\ge1/3$, with permanent cooperation on path; the threshold compares a one-shot gain of 1 with a permanent loss of 2.
6. Tit for tat also yields permanent cooperation, but is an SPNE only at $\delta=1/3$: too weak or too costly a punishment both break it, which makes it a knife-edge case.

## Check your understanding

**1. Why can a subgame's payoff be written as the discounted sum "from today", ignoring the past?**

Because the earlier payoffs are already determined and form a constant; factoring it out leaves $\delta^t$ times a discounted sum from today. By VNM utility, adding the same constant to all outcomes, or multiplying all by the same positive number, leaves the preference ordering unchanged. So the optimal choice inside the subgame depends only on the forward-looking part. Ball stresses this is an equivalence, not an approximation.

**2. Why can't the check that "always defect" is an SPNE be confined to histories where everyone has always defected?**

Because SPNE requires a Nash equilibrium in every subgame, including subgames that are never reached. A history may be unreachable precisely because someone is required there to do something they would not want to do after the fact — which is exactly a non-credible threat. Checking only the realised path would miss all of that. It is also why the grouping must cover all histories, not just those on the equilibrium path.

**3. Why is the grim trigger threshold $\delta\ge1/3$?**

Because defecting once gains $3-2=1$ today and costs $2-0=2$ every period afterwards. The present value of losing 2 forever is $\delta\cdot2/(1-\delta)$; requiring it to cover 1 gives $\delta\ge1/3$. The other route compares the two streams: cooperation pays $2/(1-\delta)$ and defection pays 3, and the former must be at least the latter — the same threshold.

**4. Under grim trigger, after $(C,D)$ in period 0, why does even the defector defect in period 1?**

Because they expect to be punished. The opponent's history contains $D$ (the defector put it there), so the opponent will certainly defect tomorrow; since tomorrow is $(D,D)$ regardless, defecting today at least salvages something. This is not self-punishment but a response to anticipated punishment. Ball highlights it because it looks like self-punishment and is easy to misread.

**5. Why does tit for tat work only at $\delta=1/3$?**

Because the two groups of histories give exactly reversed comparisons. At a $(C,C)$ history, following pays permanent cooperation $2/(1-\delta)$ and deviating pays the alternating stream $(3-\delta)/(1-\delta^2)$; at a $(C,D)$ history the two swap. So unless the streams are equal, one group always has a profitable deviation. Setting them equal gives $\delta=1/3$ exactly. It is a knife-edge case, not a robust conclusion.

**6. If $\delta$ is small, say 0.1, does grim trigger still work? Why should intuition agree?**

No. At $\delta=0.1$, $2/(1-0.1)\approx2.22<3$, so defecting pays. Intuitively, a small $\delta$ makes the future nearly irrelevant: the extra 1 today is real, while losing 2 every period from tomorrow is discounted almost to nothing. The extreme case $\delta=0$ is the one-shot game, whose only equilibrium is defection — consistent with last lecture.
