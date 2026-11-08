---
slug: "04-rationalizability"
title: "Rationalizability: Peeling Back \"I Know That You Know\""
summary: "Rationality alone — playing a best response to some belief — barely constrains behaviour. Add \"I know my opponent is rational\" and then \"I know that he knows I am rational\", and the strategy sets shrink round by round; what survives is rationalizable."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "rationalizability"
  - "iterated-elimination"
sources:
  - kind: "video"
    title: "Lecture 4: Rationalizability"
    url: "https://www.youtube.com/watch?v=ZdwIokL0P_U"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture reduced rationality to a single line: **do not play a strictly dominated strategy**, equivalently **play a best response to some belief**. This lecture pushes that line harder. If not only am I rational but **I know you are rational**, and **I know that you know I am rational**, how sharp can the prediction get?

The answer: each additional layer of knowledge thins the strategy sets by one round. The procedure is called **rationalizability**, and operationally **iterated elimination of strictly dominated strategies**.

Ball warns at the start that the notation gets heavier. He also announces a simplification: from now on the course uses **lowercase $u$** throughout, no longer distinguishing VNM utility (capital $U$) from expected utility, because once beliefs and mixed strategies enter, policing the case distinction costs more than it is worth.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Rationalizability: the notation-heavy lecture |
| 3:37 | Two sides of one coin: best response, or strictly dominated |
| 4:39 | Rationality defined as a best response to some belief |
| 5:48 | The definition is weak because beliefs are unconstrained |
| 6:18 | First-order knowledge: I know my opponents are rational |
| 9:15 | Higher-order knowledge: I know that he knows that I know |
| 9:42 | The bimatrix example, now with player 2's payoffs |
| 11:06 | Step one: player 1's best responses to L and R |
| 13:12 | M is strictly dominated by $\tfrac12 T+\tfrac12 B$ |
| 14:16 | Step one: both of player 2's strategies remain viable |
| 15:22 | Rationality does not always eliminate anything |
| 16:07 | Step two: each player knows the other is rational |
| 19:38 | Step three: second-order knowledge |
| 21:25 | Player 1 narrows to B alone |
| 23:37 | Dominance solvable games |
| 26:29 | Conditional best-response and conditional dominance sets |
| 36:51 | Restating last week's theorem in set notation |
| 46:22 | The recursion $S_i^{k+1}=\mathrm{BR}_i(S_{-i}^{k})$ |
| 1:04:35 | Running the algorithm on the prisoner's dilemma |

## Rationality, formalised

Compress the previous lecture into one sentence:

> Player $i$ is **rational** if the strategy she chooses is a best response to **some** belief.

One feature deserves attention: **all the restriction sits on "best response"; the belief is unconstrained**. You may believe your opponent will do something absurd; as long as your strategy is optimal against that belief, you remain "rational".

Ball is blunt: taken alone this is an **extremely weak** requirement. It speaks only about player $i$ and says nothing about whether anyone else is rational. So it eliminates very little.

Sharpening requires layers:

- **First-order knowledge**: I know the others are rational.
- **Second-order knowledge**: I know that they know I am rational.
- **Third-order knowledge**: I know that they know that I know…

Each layer narrows the admissible beliefs, and with them the set of best responses.

## The bimatrix example

This time player 2's payoffs are filled in as well (last week only player 1's were shown):

| Player 1 | Player 2 picks L | Player 2 picks R |
| --- | --- | --- |
| T | 2, 0 | −1, 1 |
| M | 0, 10 | 0, 0 |
| B | −1, −6 | 2, 0 |

### Step one: only mutual rationality

**Player 1**: against L the three strategies pay 2, 0, −1, so T is best; against R they pay −1, 0, 2, so B is best. Both T and B are viable. What about M? It is not a best response to L or R, and last week showed it is strictly dominated by $\tfrac12 T+\tfrac12 B$, so it is **no belief's best response**. Hence

$$
S_1'=\{T,B\}.
$$

**Player 2**: against T, L pays 0 and R pays 1, so R is better; against M, L pays 10 and R pays 0, so L is better; against B, L pays −6 and R pays 0, so R is better.

Each strategy is a best response to some pure strategy, so **nothing can be eliminated**:

$$
S_2'=\{L,R\}.
$$

A lesson hides here: **rationality does not always eliminate anything**. Player 1's rationality killed M; player 2's rationality killed nothing, because what suits player 2 depends entirely on what player 1 does.

### Step two: each knows the other is rational

**Player 1** knows player 2 is rational, hence knows player 2 will choose from $S_2'=\{L,R\}$. That set is the whole strategy set, so **no new information** arrives, and $S_1''$ stays $\{T,B\}$.

**Player 2** knows player 1 is rational, hence knows player 1 will choose T or B. Now something happens: against T, R is better; against B, R is also better. **Whatever mixture of T and B player 1 uses, R is strictly better.** So

$$
S_2''=\{R\}.
$$

The crucial point: what shrank the set was not "player 2 is rational" — that was already used — but the **new knowledge** that player 1 is rational.

### Step three: second-order knowledge

Player 2 is down to R and stays there.

Player 1 knows that player 2 knows player 1 is rational, so player 1 can infer that player 2 must play R. Against R, player 1's best response is B (payoff 2, against −1 for T). Hence

$$
S_1'''=\{B\}.
$$

Both players are now down to one strategy each, and the prediction is the unique profile $(B,R)$. Notice that **both numbers in that cell have been underlined** at some point: B is a best response to R, and R is a best response to B.

### The rhythm of elimination

The shape of the process is worth remembering: $S_i^{k+1}$ depends on the **previous round's** $S_{-i}^{k}$, so the dependence is **crisscrossed** — my feasible set this round is determined by your feasible set last round. That is exactly why the procedure must be iterated rather than solved in one step.

![Three rounds of rationalizability: player 1 shrinks from {T,M,B} to {T,B} to {B}, player 2 from {L,R} to {R}; each round uses the opponent's set from the previous round](/images/rationalizability-rounds-en.svg)

*Figure: crisscross dependence is the skeleton of the algorithm. Player 2 shrinks only in round two, not because she becomes rational then, but because only then does she learn that player 1 is rational.*

## The formal definitions

### Two sets

Fix player $i$ and a **subset** $S_{-i}' \subseteq S_{-i}$ of opponent profiles. Define two sets.

**Conditional best-response set**:

$$
\mathrm{BR}_i(S_{-i}') = \left\{\, s_i \in S_i \;:\; \exists \beta_{-i},\ \beta_{-i}(S_{-i}')=1,\ s_i \text{ is a best response to } \beta_{-i} \,\right\}.
$$

Reading: if all I know is that the opponent will choose from $S_{-i}'$, which of my strategies are defensible? Exactly those that remain optimal when the entire belief is placed inside that set.

**Conditional strict-dominance set**:

$$
\mathrm{SCD}_i(S_{-i}') = \left\{\, s_i \in S_i \;:\; s_i \text{ is strictly dominated given } S_{-i}' \text{ by some mixture } \sigma_i \,\right\}.
$$

Beginners routinely trip on one point, and Ball stops the lecture to ask it: whose mixed strategy does the dominating? **Player $i$'s own.** Beliefs are about opponents, but a dominance relation always holds between two strategies of the *same* player, because a player compares only things she can choose.

### The theorem in set notation

Last week's theorem reads more cleanly in the new notation:

$$
S_i = \mathrm{BR}_i(S_{-i}) \cup \mathrm{SCD}_i(S_{-i}), \qquad
\mathrm{BR}_i(S_{-i}) \cap \mathrm{SCD}_i(S_{-i}) = \varnothing .
$$

The first says "at least one", the second "at most one", and together "exactly one".

The theorem generalises: **replace $S_{-i}$ with any subset $S_{-i}'$ and it still holds.**

### Monotonicity

The generalisation yields a clean monotonicity:

- As $S_{-i}'$ shrinks, $\mathrm{BR}_i(S_{-i}')$ **shrinks**. Fewer admissible beliefs means fewer strategies can be optimal.
- As $S_{-i}'$ shrinks, $\mathrm{SCD}_i(S_{-i}')$ **grows**. Fewer inequalities need checking, so it is easier to be judged dominated.
- The two always sum to $S_i$, so one shrinking forces the other to grow.

Ball explains the second by counting inequalities: a larger $S_{-i}'$ means more constraints to satisfy simultaneously, so dominance is harder; a stronger condition is easier to meet.

In the extreme, if $S_{-i}'$ has a single element, $\mathrm{BR}_i$ degenerates to "the set of best responses to that particular strategy" — the naive definition we started from.

## The algorithm

Formalised as a recursion. The input is a **finite** strategic form game (Ball stars "finite": formal results are only guaranteed there, since infinite games admit pathological counterexamples, though the course still applies the ideas to well-behaved infinite games).

- **Base case**: $S_i^{0}=S_i$ for every player.
- **Recursion**: $S_i^{k+1}=\mathrm{BR}_i\!\left(S_{-i}^{k}\right)$.

Each round keeps only the strategies that are best responses given the opponent's feasible set from the previous round. In a finite game the process stabilises after finitely many steps, since the sets only shrink and are finite.

The strategies that survive are the **rationalizable** ones. A game is **dominance solvable** if the process leaves each player with exactly one strategy, yielding a unique prediction.

Mind the index: the recursion reads $S_{-i}^{k}$, not $k+1$ — **always the opponent's previous round**.

### Running it on the prisoner's dilemma

- $S_1^0=S_2^0=\{C,D\}$.
- Round one: C is strictly dominated by D (better when the opponent cooperates, better when the opponent defects), so $S_1^1=S_2^1=\{D\}$.
- Each player has one strategy left; the algorithm halts at $(D,D)$.

This is also why the prisoner's dilemma is "easy": it converges in a single round. Most games are not so lucky.

## What this lecture establishes

1. **Rationality = a best response to some belief.** The definition is weak because beliefs are unconstrained, so behaviour is barely constrained.
2. Each layer of **knowledge** thins the sets by one round: I know you are rational, I know you know I am rational, and so on — all working through restrictions on beliefs.
3. **Conditional best response** and **conditional strict dominance** remain complementary on any restricted set: every strategy lies in exactly one.
4. The two sets move in **opposite directions** as the restriction tightens: the best-response set shrinks, the dominance set grows.
5. The algorithm is $S_i^{k+1}=\mathrm{BR}_i(S_{-i}^{k})$ with **crisscross** dependence on the opponent's previous round.
6. Convergence to a unique profile is **dominance solvability**; the survivors are **rationalizable strategies**.

## Check your understanding

**1. Why does the definition of rationality barely constrain behaviour?**

Because the restriction lands on "best response" while the belief is free. Any strategy for which **some** belief makes it optimal satisfies the definition — even a belief that assigns probability one to an obviously dominated opponent strategy. So rationality alone eliminates only strategies that are optimal under **no** belief, namely those strictly dominated by a mixture.

**2. In the example, why does player 2's set not shrink in step one but does in step two?**

Step one uses only "player 2 is rational". But player 2's best choice depends entirely on player 1: R against T, L against M. Her own rationality therefore rules out neither L nor R. Step two adds "player 2 knows player 1 is rational", so she knows M will not be played; over the remaining T and B, R is strictly better in both cases, and L drops out.

**3. If $S_{-i}'$ shrinks, why does $\mathrm{SCD}_i$ grow?**

Because being dominated requires a mixture to be strictly better against **every** admissible opponent strategy. Fewer admissible strategies means fewer inequalities to satisfy at once, so the condition is easier to meet. It looks backwards but is exactly what "conditional" dominance means: the stronger the condition, the easier the conclusion.

**4. Why does the recursion use $S_{-i}^{k}$ rather than $S_{-i}^{k+1}$?**

Because a round of elimination may only use information already established in the previous round. What I can rule out now depends on what I knew last round about your play. Allowing same-round cross-reference would turn the procedure into an implicit simultaneous equation rather than a step-by-step deduction. Crisscross dependence is the defining feature of the iteration.

**5. If a game is dominance solvable, does that mean players will certainly play the surviving profile?**

No. Dominance solvability says: if both are rational, and each knows the other is rational, and each knows that the other knows, ad infinitum, then the only surviving profile is that one. It is a **conditional** prediction resting on that tower of knowledge. In practice people reason only two or three layers deep — as the beauty contest in lecture one showed — and then the surviving set is larger and the prediction weaker.

**6. Why does the algorithm require a finite game?**

Because finiteness guarantees that the decreasing sequence $S_i^0 \supseteq S_i^1 \supseteq \cdots$ stabilises in finitely many steps and that each best-response set is non-empty (a continuous function on a finite set attains a maximum). With infinite strategy sets, best responses may fail to exist or the elimination may never converge. Ball says the course still uses infinite games as examples but makes no formal claims about them.
