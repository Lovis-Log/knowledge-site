---
slug: "03-dominance"
title: "Dominance: Eliminating Strategies Without Guessing Your Opponent"
summary: "Starting from the prisoner's dilemma, the weakest behavioural assumption yields a first prediction: a strategy is dominant if it is better no matter what the opponent does. Beliefs and mixed strategies then give an exact split between strategies that are best responses to some belief and strategies strictly dominated by a mixture."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "dominance"
  - "best-response"
sources:
  - kind: "video"
    title: "Lecture 3: Dominance"
    url: "https://www.youtube.com/watch?v=b7BAHSV1EBo"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The first two lectures only set things up: individual decision making, then the representation of a game. This lecture starts **analysing** — given a game, predict how people will play.

The course's route is fixed: describe the setting in words, write the extensive form, reduce to the strategic form. Everything today happens on the **strategic form**.

Ball separates two readings of the enterprise at the outset:

- **Positive**: predict how rational players **will** play. The goal is a prediction, valid only if the utility specification and the rationality assumption hold up.
- **Normative**: you are an adviser, and a client asks how they **should** play. The goal is a recommendation, premised on the client pursuing their objectives and knowing that opponents are rational and may be advised too.

Formally the answers do not depend on which reading you keep in mind; only the persuasiveness varies by application.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The three-step route: words, extensive form, strategic form |
| 3:46 | Positive (will play) versus normative (should play) readings |
| 6:23 | The prisoner's dilemma: M (mum) and F (fink) |
| 9:05 | Filling the matrix: $(M,M)=(2,2)$, $(F,M)=(3,-1)$ |
| 12:09 | Case-by-case reasoning: F is better whatever the opponent does |
| 14:14 | Where the dilemma lies: $(F,F)$ gives $(0,0)$, $(M,M)$ gives $(2,2)$ |
| 15:40 | A feature unique to interactive decisions: rationality can hurt everyone |
| 17:14 | Method: weaker assumptions give safer but blunter predictions |
| 19:28 | Notation $s=(s_i,s_{-i})$, where the minus means "everyone else" |
| 22:25 | The definition of strict dominance |
| 25:06 | Weak dominance: never worse, and strictly better somewhere |
| 27:00 | Dominant strategies and dominant strategy equilibrium |
| 34:30 | A 3×2 example where no pure strategy dominates another |
| 36:05 | Turning to beliefs: probabilities over the opponent's strategies |
| 41:43 | The formal definition of a belief |
| 46:36 | The definition of a best response |
| 50:16 | Plotting the three strategies as lines in the belief $p$ |
| 56:01 | Reading the graph: T for $p\le\tfrac12$, B for $p\ge\tfrac12$ |
| 58:53 | Killing M with the mixture $\tfrac12 T+\tfrac12 B$ |
| 1:08:34 | The theorem: best response and strict dominance are exact complements |

## The prisoner's dilemma

### The story and the payoffs

Two prisoners are held in separate cells. Each has two strategies: **M** (stay mum) and **F** (fink). The prosecutor offers a deal: testify against your partner and get a sentence reduction, while your partner is convicted of something worse.

| | Player 2 picks M | Player 2 picks F |
| --- | --- | --- |
| Player 1 picks M | 2, 2 | −1, 3 |
| Player 1 picks F | 3, −1 | 0, 0 |

Player 1 picks the row, player 2 the column, and payoffs are written $(u_1,u_2)$.

The ordering matters more than the exact numbers:

- I fink, he stays mum → **3**, the best.
- Both stay mum → **2**, convicted only of a minor crime.
- Both fink → **0**, serious crime but both get reductions for cooperating.
- I stay mum, he finks → **−1**, the worst.

### Reasoning case by case

Ball lets the room answer first, then gives the key argument. You are player 1 and do not know what the other will do, so split into cases:

- Opponent stays mum: I get 2 by staying mum, 3 by finking. **Finking is better.**
- Opponent finks: I get −1 by staying mum, 0 by finking. **Finking is still better.**

Both cases point to F. So **F strictly beats M regardless of the opponent** — a striking reversal of last lecture's theme. The problem is interactive, yet **my best choice happens not to depend on what the other does**. That is precisely why this game is easy to analyse.

### Where the dilemma lies

If both fink, each gets 0; if both stay mum, each gets 2. **Both strictly prefer the second outcome, yet both arrive at the first.**

This is not irrationality. Ball puts it carefully: **I cannot control what the other does, only what I do**. Moving from $(F,F)$ to $(M,M)$ requires both to change at once, and any unilateral change makes the deviator worse off (from 0 down to −1).

Hence the first substantive conclusion of the course: **in a game, rational behaviour can be inefficient — it can leave everyone worse off than some other feasible outcome**. Ball stresses that this never happens with a single decision maker: maximise your objective and you get the best you can. It is a phenomenon unique to interactive decisions.

### Method

Ball also sets out the course's strategy: **begin with the weakest behavioural assumptions**. Weaker assumptions give conclusions we can trust, but blunter predictions — at the limit, the only prediction may be "anything could happen".

Assumptions are then strengthened gradually: predictions sharpen and confidence falls. Today uses the weakest tier: a player will not choose a strictly dominated strategy.

## Notation

A profile can be decomposed around one player:

$$
s=(s_i,\; s_{-i}),
$$

where $s_{-i}$ collects everyone else's strategies. The minus sign reads as "not", not as subtraction: $s_{-3}$ is just $(s_1,s_2)$, and implies nothing about players 1 and 2 deciding jointly. Ball clarifies this explicitly — it is notation, carrying no behavioural assumption.

Correspondingly, $S_{-i}$ is the set of such partial profiles, with $s_i \in S_i$ and $s_{-i} \in S_{-i}$.

## Dominance

### Strict dominance

Strategy $s_i$ **strictly dominates** $s_i'$ if

$$
u_i(s_i,\,s_{-i}) \;>\; u_i(s_i',\,s_{-i}) \quad \text{for all } s_{-i}\in S_{-i}.
$$

The same $s_{-i}$ appears on both sides. That is the heart of the definition: hold the opponents' behaviour fixed, compare $s_i$ with $s_i'$, and require $s_i$ to be better — for **every** fixed behaviour.

Why write it this way? Because $s_{-i}$ is outside my control, but the opponents will do something. "Whatever they do" is formalised as "for all $s_{-i}$".

### Weak dominance

Replace the strict inequality with a weak one:

$$
u_i(s_i,s_{-i}) \ge u_i(s_i',s_{-i}) \ \text{for all } s_{-i},\quad \text{and strictly for at least one } s_{-i}.
$$

The second clause cannot be dropped. Without it, two identical strategies would weakly dominate each other, and two things break: a strategy could weakly dominate itself, and a player could have several weakly dominant strategies.

A student asks whether several weakly dominant strategies are possible; Ball answers no and gives the argument on the spot. Suppose $s_A$ and $s_B$ are both weakly dominant. Then $s_A$ weakly dominates $s_B$, so $s_A$ is never worse; and $s_B$ weakly dominates $s_A$, so $s_B$ is never worse **and strictly better somewhere**. The two cannot both hold. Hence at most one weakly dominant strategy.

### Dominant strategies and DSE

- If $s_i$ weakly dominates every other strategy of player $i$, it is a **dominant strategy**.
- If in a profile $s^\ast=(s_1^\ast,\dots,s_n^\ast)$ every $s_i^\ast$ is weakly dominant for its player, the profile is a **dominant strategy equilibrium** (DSE).

Note that a prediction must cover **everyone**. Saying "player 1 will pick F" is not a prediction about the game; saying "player 1 picks F and player 2 picks F" is. That is why the word *profile* recurs throughout the course.

## When nothing dominates

### A game with no answer

Ball switches to a 3×2 game and writes only player 1's payoffs, since only player 1's choice is at issue:

| Player 1 | Player 2 picks L | Player 2 picks R |
| --- | --- | --- |
| T | 2 | −1 |
| M | 0 | 0 |
| B | −1 | 2 |

Compare pairwise. T against M: 2>0 under L but −1<0 under R, so T does not dominate M. M against B fails the same way. **No strategy dominates any other.**

So how should you play? The room's answer is right: you need an estimate of how likely the opponent is to play L. That reintroduces **beliefs** from the previous lecture — the same move as checking the weather app in lecture one.

### Beliefs

Assign probabilities to the opponent's strategies. Player 2 has only two, so one number $p$ (the probability of R) suffices; L gets $1-p$.

In general, a **belief** for player $i$ is a probability distribution

$$
\beta_{-i}: S_{-i} \to [0,1], \qquad \sum_{s_{-i}\in S_{-i}} \beta_{-i}(s_{-i}) = 1 .
$$

The subscript $-i$ is used because the belief is **held by** player $i$ but is **about everyone else**.

The utility function then extends to "strategy plus belief":

$$
u_i(s_i,\beta_{-i}) \;=\; \sum_{s_{-i}\in S_{-i}} \beta_{-i}(s_{-i})\; u_i(s_i,s_{-i}).
$$

Ball concedes this is an abuse of notation: $u_i$ was defined on profiles and is now extended to a larger domain. But there is a natural bridge — take the belief that puts probability one on a particular opponent strategy and the sum collapses to a single term, recovering the original definition.

### Best response

**Given a belief $\beta_{-i}$, strategy $s_i$ is a best response** if

$$
u_i(s_i,\beta_{-i}) \;\ge\; u_i(s_i',\beta_{-i}) \quad \text{for all } s_i'\in S_i .
$$

Ball calls this one of the central ideas of game theory: mathematically shallow, conceptually a step forward. **Interactive decisions split into two stages — form a belief, then choose the best action given it.**

The inequality is weak, so **several strategies may be best responses to the same belief**. Forcing uniqueness requires saying *strict* best response; the course generally uses the weak sense.

## Reading best responses off a graph

Let $p$ be the probability the opponent plays R (horizontal axis), with player 1's expected payoff on the vertical axis. Each strategy is a line:

$$
u_1(T,p)=2(1-p)+(-1)p = 2-3p,
$$
$$
u_1(M,p)=0,
$$
$$
u_1(B,p)=(-1)(1-p)+2p = 3p-1 .
$$

Expected utility is **always linear** in beliefs, so two endpoints determine the whole line.

The reading rule: fix a belief on the horizontal axis, look vertically, and **whichever line is highest identifies the best response**. Joining the highest portions gives the **upper envelope**.

The result is clean:

- $p<\tfrac12$: T is highest, so T is the unique best response.
- $p>\tfrac12$: B is highest, so B is the unique best response.
- $p=\tfrac12$: both equal $\tfrac12$, so T and B are **both** best responses.

![Expected payoffs of the three strategies as the belief p varies: T falls from 2 to −1, B rises from −1 to 2, and they cross at p=1/2 with value 0.5; M sits flat at 0, always below the upper envelope](/images/best-response-envelope-en.svg)

*Figure: the bold upper envelope is the best-response correspondence. M's flat line never touches it, so M is not a best response to any belief.*

## M's predicament and mixed strategies

The graph makes it plain: **M is not a best response to any belief**. Should you therefore never play it?

The trouble is that, as checked earlier, **no pure strategy dominates M** either. So M sits in an awkward middle ground — never a best response, yet not dominated. Ball calls this a genuine puzzle and resolves it: M *is* dominated, just not by a pure strategy.

Consider a coin flip:

$$
\sigma = \tfrac12 T + \tfrac12 B .
$$

- Against L: $\tfrac12(2)+\tfrac12(-1)=\tfrac12$.
- Against R: $\tfrac12(-1)+\tfrac12(2)=\tfrac12$.

Either way it pays $\tfrac12$ for sure, while M pays 0. Hence

$$
u_1(\sigma,s_{-1}) = \tfrac12 > 0 = u_1(M,s_{-1}) \quad \text{for all } s_{-1},
$$

so **M is strictly dominated by this mixture**. This also explains the picture: a mixture's payoff is a weighted average of the two lines, and here that average is exactly $\tfrac12$ across the whole range, everywhere above zero.

A student suggests that if you were very unsure about your belief you might play M. Ball carefully names that idea — **ambiguity aversion** — and notes that it is not risk aversion; the course does not treat it, and always assumes beliefs are well defined.

## The theorem: two routes, one answer

There are then two natural approaches:

1. **Positive**: keep only strategies that are best responses to some belief ("reasonable" ones).
2. **Negative**: discard strategies strictly dominated by some (possibly mixed) strategy.

Both leave T and B here. Is that a coincidence?

**Theorem** (finite strategic form games). For every player $i$ and strategy $s_i$, **exactly one** of the following holds:

- $s_i$ is a best response to some belief $\beta_{-i}$;
- $s_i$ is strictly dominated by some mixed strategy of player $i$.

"Exactly one" means neither both nor neither.

The proof splits in two:

- **At most one** (easier): if both held, some mixture would be strictly better against **every** opponent strategy; taking expectations against any belief keeps it strictly better, so $s_i$ could not be a best response. Contradiction.
- **At least one** (harder): requires a separating-hyperplane argument, written up in the appendix and not required for exams.

Ball stresses the payoff of the theorem: **you can look for what is worth playing, or for what must be avoided, and the two searches give the same answer**. It also sets up rationalizability — repeatedly deleting dominated strategies leaves exactly those that can be justified by some belief.

## What this lecture establishes

1. Analysis starts from the **weakest behavioural assumption**: players do not choose strictly dominated strategies. Weaker assumptions mean safer conclusions but blunter predictions.
2. **Strict dominance** requires being strictly better against every opponent strategy; **weak dominance** requires never worse and strictly better somewhere. The strict clause is essential, or several weakly dominant strategies could coexist.
3. The prisoner's dilemma shows that **in interactive settings rational behaviour can leave everyone worse off** — impossible with a single decision maker.
4. Without a dominant strategy you need **beliefs**, and interactive decisions split into forming a belief and then best-responding.
5. Expected utility is **linear** in beliefs, so best responses can be read off an upper envelope.
6. **Not being a best response** and **being dominated** are two sides of one fact: in a finite game, every strategy is either a best response to some belief or strictly dominated by some mixture.

## Check your understanding

**1. In the prisoner's dilemma, if the two could agree in advance to stay mum, would the outcome change?**

Not necessarily. The difficulty is **enforceability**: once in separate cells, each has an incentive to fink — payoff rises from 2 to 3. An agreement does not alter the payoff matrix, so as long as play is one-shot, unobserved, and unpunishable, $(M,M)$ is not stable. Stabilising it requires repetition, contracting, or a different payoff structure — the subject of the later lectures on repeated games.

**2. Why must the definition of weak dominance include "strictly better somewhere"?**

Without it, two strategies with identical payoffs everywhere would weakly dominate each other. Two problems follow: a strategy could weakly dominate itself, and a player could have multiple weakly dominant strategies, destroying uniqueness of the prediction. With the clause, weak dominance is antisymmetric, so at most one weakly dominant strategy exists.

**3. In the 3×2 example, if $p=0.4$, what is player 1's best response?**

$u(T)=2-3(0.4)=0.8$; $u(M)=0$; $u(B)=3(0.4)-1=0.2$. T is highest, so T is the unique best response. Intuitively $p=0.4$ means L is more likely, and T is the strategy that bets on L.

**4. Why are the expected-payoff curves straight lines rather than curves?**

Because $u_i(s_i,\beta_{-i})=\sum \beta_{-i}(s_{-i})u_i(s_i,s_{-i})$ is **linear** in the belief — an expectation is a weighted average. With two opponent strategies it reduces to an affine function of $p$, hence a straight line. That is why knowing the payoffs at $p=0$ and $p=1$ pins down the whole line.

**5. Why does the mixture $\tfrac12T+\tfrac12B$ pay exactly $\tfrac12$?**

Against L: $\tfrac12\times 2+\tfrac12\times(-1)=\tfrac12$. Against R: $\tfrac12\times(-1)+\tfrac12\times 2=\tfrac12$. Both cases agree, so the expected payoff is $\tfrac12$ whatever the belief. It is not a coincidence: T and B have exactly complementary payoffs across the two cases, and equal weighting cancels the difference.

**6. "M is not a best response to any belief" and "M is strictly dominated by a mixture" — why do these not contradict each other?**

They sound opposite: one says nobody would ever want to play it, the other says something else is always better. But the theorem says the two categories are exact complements in a finite game: every strategy is either a best response to some belief or strictly dominated by a mixture, never both and never neither. So placing M in the second category forces it out of the first.

**7. Does the theorem survive if only pure-strategy dominance is allowed?**

No. This very example is the counterexample: M is not dominated by any **pure** strategy (T is worse under R, B is worse under L), yet it is not a best response to any belief. Mixed strategies are needed to classify M as dominated. This is why mixtures are not mathematical decoration — they are what makes the theory close.
