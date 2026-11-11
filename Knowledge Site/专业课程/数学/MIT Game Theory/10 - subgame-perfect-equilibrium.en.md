---
slug: "10-subgame-perfect-equilibrium"
title: "Subgame Perfection: Driving Out Threats Nobody Would Carry Out"
summary: "Backward induction only works on trees with perfect information; the moment one stage is simultaneous, it stalls. Subgames cut the tree into pieces that can be solved on their own, and requiring Nash equilibrium on every piece screens out non-credible threats even with imperfect information or an infinite horizon."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "subgame-perfect-equilibrium"
  - "entry-deterrence"
sources:
  - kind: "video"
    title: "Lecture 10: Subgame-Perfect Nash Equilibrium"
    url: "https://www.youtube.com/watch?v=byS0I3U3YoQ"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture used backward induction to pick out the one compelling prediction from a game tree. That method has a precondition: every information set contains a single node, which is perfect information. As soon as the tree contains a point where "when it is my turn, I do not know what happened earlier", backward induction stalls — you cannot ask "what should be played at this node" about an information set with two nodes in it, because the player does not know which node they are standing on.

This lecture sets out that difficulty with a very small example. The standard entry game: the incumbent threatens "enter and I will fight", so the entrant stays out. That equilibrium rests on a non-credible threat, since at the moment of truth a price war hurts the incumbent too. Backward induction sees through it, because the tree has perfect information. Then the example changes by one word: after entry the two firms move **simultaneously**. Now two of the three pure-strategy Nash equilibria rest on non-credible threats, and backward induction is no longer available.

The way out is to cut the tree into pieces. A **subgame** is a stretch of the tree that "counts as a game in its own right": it starts at a node, contains all of that node's successors, its starting node sits alone in its information set, and it does not cut any information set in half. A **subgame perfect Nash equilibrium** (SPNE) requires the strategy profile, restricted to **every** subgame, to be a Nash equilibrium of that subgame.

That is stronger than Nash equilibrium, but the direction of the strengthening is specific. Nash equilibrium only requires "no profitable deviation along the path that is actually played". SPNE requires "no profitable deviation at every branch that could be reached — including branches that never are". A non-credible threat is simply the case of a branch that cannot survive that test.

The lecture closes by applying the idea where the numbers are real: Cournot competition with an entry cost. Two stages, entry observed, and a standard Cournot game in stage two, so every subgame has a closed-form solution; then stage one compares entering with staying out. The result is a threshold condition: when the entry cost falls between two adjacent Cournot profits, the number of entrants is pinned down exactly.

## Timeline

| Time | Topic |
| --- | --- |
| 0:41 | The entry tree: player 1 picks N or X, player 2 picks A or F |
| 2:40 | Two pure-strategy Nash equilibria: NA and XF |
| 3:47 | XF rests on a non-credible threat: if entry happens, player 2 picks A |
| 4:34 | Backward induction from the end selects NA |
| 5:23 | The example is modified: after entry, moves become simultaneous |
| 6:31 | Drawing simultaneous moves: pick an order, put the late mover's nodes in one information set |
| 10:42 | Three Nash equilibria: NT·A, XT·F, XB·F |
| 12:43 | Backward induction fails because the game is not perfect information |
| 14:21 | What SPNE is meant to cover: imperfect information and infinite horizons |
| 22:26 | Definition of a subgame: a node plus all of its successors |
| 23:34 | Two conditions: singleton information set, no information set cut |
| 29:40 | SPNE: the restriction to every subgame is a Nash equilibrium |
| 34:30 | The Boston example: CC and RR each yield an SPNE |
| 48:25 | The key point: a profitable deviation may exist only in a subgame never reached |
| 51:00 | Cournot with entry costs: two stages, entry observed |
| 1:02:52 | The subgame solution: $q^\ast=(1-c)/(k+1)$ |
| 1:15:12 | The entry condition $\pi_{k+1}\le F\le \pi_k$ |
| 1:18:50 | Higher fixed costs leave fewer firms in the industry |

## An entry game and a threat nobody would carry out

Two firms. Player 1 decides whether to enter a market (N for enter, X for exit); exiting gives both players 0. After entry, player 2 decides whether to accommodate (A) or fight (F): accommodation gives each 1, fighting gives each $-1$.

| | Player 2 picks A | Player 2 picks F |
| --- | --- | --- |
| Player 1 picks N | 1, 1 | −1, −1 |
| Player 1 picks X | 0, 0 | 0, 0 |

Underline best responses cell by cell:

- If player 2 picks A, player 1 gets 1 from N and 0 from X, so N is better.
- If player 2 picks F, player 1 gets $-1$ from N and 0 from X, so X is better.
- If player 1 picks N, player 2 gets 1 from A and $-1$ from F, so A is better.
- If player 1 picks X, player 2 gets 0 either way, so both are best responses.

So there are two pure-strategy Nash equilibria: $(N,A)$ and $(X,F)$.

The story behind the second: player 1 expects a fight, so stays out; and because player 1 stays out, saying "fight" costs player 2 nothing. But the threat is not credible — if entry actually happened, player 2 would be choosing between 1 and $-1$ and would pick A.

Ball gives the sharper statement: $(X,F)$ violates backward induction. Start at the last decision node and player 2 picks A; anticipating A, player 1 picks N. Backward induction delivers $(N,A)$, exactly the compelling equilibrium. All of this was done last week; here it is only a reminder.

## When backward induction fails

Now change one word: after entry the two players move simultaneously. Player 2 picks A or F, player 1 picks T or B. Accommodation is good for both and fighting is bad for both, but player 1's choice of T or B determines how large the good or bad outcome is:

| | Player 2 picks A | Player 2 picks F |
| --- | --- | --- |
| Player 1 picks T | 2, 2 | −1, −1 |
| Player 1 picks B | 1, 1 | −2, −2 |

**How to draw simultaneous moves.** Pick an arbitrary order, then stipulate that the later mover did not see the earlier one. Here player 2 moves first and player 1 second, but player 1's two nodes sit in a single information set joined by a dotted line. Ball stresses that the order is arbitrary: if you instead had player 1 move first and player 2 move without observing, you would get the same game. As long as "cannot see" is preserved, who is drawn first changes nothing.

**The strategic form.** Player 1 has four strategies: $NT$, $NB$, $XT$, $XB$. Note why it is four and not more — player 1 has exactly two decision points (the initial node, and the information set after entry), two actions each, so $2\times2=4$. Had the two post-entry nodes been in separate information sets, player 1 would move at three points and have eight strategies. Player 2 has two: A and F.

Filling in the matrix: the two rows beginning with $X$ give $(0,0)$ against everything, because the path ends before entry.

| | A | F |
| --- | --- | --- |
| NT | 2, 2 | −1, −1 |
| NB | 1, 1 | −2, −2 |
| XT | 0, 0 | 0, 0 |
| XB | 0, 0 | 0, 0 |

Underlining gives three Nash equilibria: $NT\cdot A$, $XT\cdot F$, $XB\cdot F$.

- $NT\cdot A$: player 1 enters and plays T, player 2 accommodates, $(2,2)$. The compelling one.
- $XT\cdot F$: player 1 exits, player 2 fights, $(0,0)$. If player 1 switched to entering with T the payoff would be $-1$; with B, $-2$; changing only the letter after $X$ leaves it at 0. No profitable deviation. If player 2 switched to A the path would not change and the payoff stays 0, so no deviation either.
- $XB\cdot F$: the same, except player 1 would have played B after entry.

The last two are held up by "player 1 will not come in". As in the first example, that is a non-credible threat. But this time backward induction cannot help: player 1's information set holds two nodes, so "what should be played at this node" has no answer — the player does not know which node they are on. Ball puts it plainly: backward induction compares at each node, and with several nodes in one information set, "at each node" stops meaning anything.

**Isolate the post-entry block.** It is a complete game: player 2 picks A or F, player 1 picks T or B, simultaneously. It has exactly one Nash equilibrium, $(T,A)$:

- Given A, player 1 picks T ($2>1$); given F, player 1 still picks T ($-1>-2$).
- Given T, player 2 picks A ($2>-1$); given B, player 2 still picks A ($1>-2$).

In this small game B is strictly dominated by T and F is strictly dominated by A, so $(T,A)$ is the only equilibrium.

That exposes what is wrong with $XT\cdot F$ and $XB\cdot F$: they require "play T or B after entry while the opponent plays F", and neither $(T,F)$ nor $(B,F)$ is a Nash equilibrium of that small game. If player 1 actually entered, player 2 would want to change their mind on the spot.

Conversely, $NT\cdot A$ passes both tests: it is a Nash equilibrium of the whole game, and its restriction to the post-entry block is $(T,A)$, the block's only equilibrium. So this game has exactly one SPNE, the profile $NT\cdot A$, and the outcome it produces is $(2,2)$.

## Defining subgames

**Definition.** Given an extensive-form game $G$, take a non-terminal node $n$ and collect $n$ together with all of its successor nodes. If

1. $n$ is the only node in its information set (a singleton information set);
2. the collection does not cut any information set — there is no information set with some nodes inside the collection and some outside,

then that collection, with the actions, payoffs and information structure on it, is a **subgame** of $G$.

Each condition has its own reason.

**The singleton condition** makes the block genuinely a game. One clause in the definition of an extensive-form game is that the initial node sits in its own information set. For the subgame's starting node to play the role of an initial node, it must satisfy the same clause. The intuitive reading: when we stand at this history, everybody knows we stand here, with no uncertainty.

**Not cutting information sets** makes the block self-contained. If an information set were sliced, a player inside the subgame would still be reasoning about possibilities outside it, that information set would not belong to the subgame, and the block would no longer be a game one can solve on its own. Ball notes the two conditions can fail together: in the example, the node inside player 1's information set violates both at once.

Two observations:

- **The whole game is always a subgame.** Take the initial node — by definition a singleton information set — and collect every node; nothing can be cut. This is what will prove that SPNE implies Nash equilibrium.
- **Terminal nodes cannot start one.** There is no decision left to make, so what you collect is a single point, not a game.

Back to the example: the initial node starts one (the whole game); the node after entry starts one (singleton, and it does not cut player 1's information set); the two nodes inside player 1's information set start none.

Ball also gives a search procedure: since a subgame must start at a non-terminal node, walk through the non-terminal nodes one by one and ask of each, "can this start a subgame?"

## SPNE, and how it relates to Nash equilibrium

**Definition.** Let $G$ be an extensive-form game and $s^\ast$ a strategy profile. Then $s^\ast$ is a **subgame perfect Nash equilibrium** if, for every subgame $G'$ of $G$, the restriction $s^\ast|_{G'}$ is a Nash equilibrium of $G'$.

Why "restriction"? Because $s^\ast$ is a complete plan defined on the whole game and it also prescribes actions at nodes outside the subgame, while "is a Nash equilibrium of $G'$" only makes sense for a profile inside $G'$. So keep only the part that lives on the information sets contained in $G'$. Ball concedes the notation could be made more formal, but does not want the symbols to hide the idea.

**SPNE implies Nash equilibrium.** Since $G$ is itself a subgame, substitute $G'=G$: the restriction $s^\ast|_G$ is just $s^\ast$, so $s^\ast$ is a Nash equilibrium of $G$. The argument is one line, but it fixes where the concept sits: SPNE is a subset of the Nash set, a refinement rather than a replacement.

**Relation to backward induction**, in Ball's three layers:

- It covers more: games with imperfect information, and games with infinite horizons;
- wherever backward induction applies, it applies too;
- wherever backward induction applies, the two give the **same** answer.

The third layer is what he means by "extends backward induction". The bargaining model of the previous lecture needed an artificial deadline only because there was no tool for a negotiation that might run forever; after this lecture there is one.

## The Boston example: two SPNE and one Nash equilibrium that is not an SPNE

Player 1 first chooses to exit (both get 1.5, as if both stayed home) or enter; after entry the two choose Celtics or Red Sox simultaneously:

| | Player 2 picks C | Player 2 picks R |
| --- | --- | --- |
| Player 1 picks C | 2, 1 | 0, 0 |
| Player 1 picks R | 0, 0 | 1, 2 |

There are only two subgames: the whole game, and the post-entry block.

The post-entry block is the standard coordination game with two pure Nash equilibria, $CC$ and $RR$. Check it: given the opponent picks C, following with C yields 2 (player 1) or 1 (player 2) against 0 for the other choice; given the opponent picks R, following with R yields 1 or 2 against 0 for C — only $CC$ and $RR$ are mutual best responses. Here something differs from backward induction on perfect-information trees: there, each decision point had a single player and usually a unique best action, so you just rolled back. Now the rolling back happens at the level of a **subgame**, and a subgame can have several equilibria. So each equilibrium must be assumed in turn, and the tree rolled back once for each.

**Assume the subgame plays $CC$.** Payoffs are $(2,1)$. Player 1 compares 2 from entering with 1.5 from exiting, and enters. That gives one SPNE: player 1 picks $N$ at the initial node and $C$ at the post-entry information set (written $NC$), player 2 picks $C$.

**Assume the subgame plays $RR$.** Payoffs are $(1,2)$. Player 1 gets 1 from entering against 1.5 from exiting, and exits. That gives a second SPNE: player 1 is $XR$, player 2 picks $R$.

Note that the strategy must be written out in full. "Player 1 exits" is not a strategy, because a strategy also says what would happen after entry. The $R$ inside $XR$ is never executed, yet it is what makes the profile an SPNE or not.

**Now consider $(XC,R)$.** Player 1 exits but "would play C after entry"; player 2 plays R. Is it a Nash equilibrium?

- Player 2: player 1 picks $X$, the path ends before entry, and player 2 gets 1.5 whether they play R or C. No deviation changes the payoff, so no profitable deviation.
- Player 1: exiting gives 1.5. Entering with C ($NC$) gives 0; entering with R ($NR$) gives 1. Both are worse. No profitable deviation either.

So it is a Nash equilibrium. It is not an SPNE. Look at the post-entry subgame: the profile there is $(C,R)$ with payoffs $(0,0)$; player 1 switching to R gets 1, player 2 switching to C gets 1. Both would improve. So $(C,R)$ is not a Nash equilibrium of the subgame.

**The point Ball stops to emphasise.** A profile can be a Nash equilibrium while a profitable deviation exists in a subgame that is **never reached**. The reason is plain: Nash equilibrium only constrains the path actually played. If player 1 changes their mind inside the subgame, the path never goes there and the payoff is unchanged. "I could do better down there" therefore does not imply "I could do better in the whole game".

This is the formal version of a non-credible threat. The content of a threat is "once we are there, I will do something that hurts me"; Nash equilibrium permits such talk, SPNE does not.

The comparison with the previous lecture makes it sharper: Nash equilibrium does not require optimality at unreached **contingencies**; SPNE replaces "contingency" with "subgame" and demands Nash equilibrium inside unreached subgames as well. It is a small substitution, but it separates "just talk" from "would actually do it".

## Cournot competition with entry costs

**The setting.** $n$ firms, constant marginal cost $c$, inverse demand $P(Q)=\max\{1-Q,\,0\}$. In stage one each firm simultaneously decides whether to enter, paying a fixed cost $F$; in stage two the firms that entered observe who else did and simultaneously choose quantities.

The information assumption has to be stated. Ball deliberately pauses to ask "what have I left out?", and the answer is information: entry is **observed**. This cannot be dropped — if you are setting a quantity, the first thing your market research does is check who is present. If entry were unobserved, the stage-two subgames would not exist at all (nobody would know which history they are in) and the analysis would have to be rebuilt.

**The subgames.** The whole game, plus the stage-two subgames parametrised by the set of entrants. Write $I\subseteq\{1,\dots,n\}$ for that set; $I$ must be non-empty, since with no entrants the game has already ended at a terminal node and no subgame starts there. Inside the subgame for $I$, only the firms in $I$ are players; the others have no decision to make. Ball notes that a subgame may involve only a subset of the players.

**Stage two.** Given $k=|I|$, this is ordinary Cournot with $k$ firms. Firm $i$ solves

$$
\max_{q_i\ge 0}\;\Big(1-q_i-Q_{-i}-c\Big)\,q_i ,
$$

with first-order condition $1-c-Q_{-i}-2q_i=0$. The symmetric solution is

$$
q^\ast=\frac{1-c}{k+1}.
$$

Worth memorising: a monopolist ($k=1$) produces $(1-c)/2$; a duopoly $(1-c)/3$; three firms $(1-c)/4$, and so on. Higher cost means less output; more firms means less output each.

**Price and profit.** Total output

$$
Q=k\cdot\frac{1-c}{k+1}=\frac{k}{k+1}(1-c),
$$

hence

$$
P-c=\Big(1-\frac{k}{k+1}(1-c)\Big)-c=(1-c)-\frac{k}{k+1}(1-c)=\frac{1-c}{k+1}.
$$

The margin per unit and each firm's quantity come out equal, both $(1-c)/(k+1)$. So each firm earns

$$
\pi_k=\frac{1-c}{k+1}\cdot\frac{1-c}{k+1}=\frac{(1-c)^2}{(k+1)^2}.
$$

Ball says this is worth memorising for exams and can always be rederived; he also remarks in passing that "quantity equals margin" is the same fact as "a rectangle of given perimeter has maximal area when it is a square", without developing it.

**Back to stage one.** Suppose the equilibrium has $k$ entrants. Two deviations to check:

- A firm that entered: equilibrium payoff $\pi_k-F$, deviation to staying out gives 0. Require $\pi_k-F\ge 0$.
- A firm that stayed out: equilibrium payoff 0, deviation to entering makes $k+1$ entrants and gives $\pi_{k+1}-F$. Require $\pi_{k+1}-F\le 0$.

Together:

$$
\pi_{k+1}\;\le\; F\;\le\;\pi_k .
$$

Since $\pi_k$ is strictly decreasing in $k$ (the denominator is squared), the interval is well defined and each $F$ falls into at most one of them (Ball sets boundary cases aside). Hence:

- $F>\pi_1$: nobody enters. Entry would earn monopoly profit, not enough to cover the fixed cost.
- $\pi_{k+1}\le F\le\pi_k$: exactly $k$ firms enter.
- $F<\pi_n$: all $n$ enter. The chain stops here, since there are only $n$ firms to begin with.

**A numerical illustration.** Normalise $(1-c)^2$ to 1; then $\pi_1=1/4$, $\pi_2=1/9\approx0.111$, $\pi_3=1/16=0.0625$, $\pi_4=1/25=0.04$. Take $F=0.07$: since $0.0625\le 0.07\le 0.111$, the equilibrium has 2 entrants.

![Threshold chart for Cournot entry: entrants k on the horizontal axis, per-firm profit in units of (1−c)² on the vertical, with points 1/4, 1/9, 1/16, 1/25; the horizontal line F = 0.07 falls between π₃ and π₂, so exactly 2 firms enter](/images/subgame-perfect-equilibrium-threshold-en.svg)

*Figure: wherever the fixed cost falls decides how many firms enter — since $\pi_k$ is decreasing, each $F$ corresponds to at most one $k$.*

**The qualitative conclusion.** Industries with high fixed costs end up with few firms. Ball's examples are mobile networks and utilities: building the network is enormously expensive, but once built the marginal cost is tiny. The first entrant earns monopoly profit above the fixed cost; a second entrant pays the same $F$ but earns only the duopoly profit $\pi_2$, which does not justify it. Industries with low fixed costs are the opposite and can support many firms.

**What is left open.** The equilibrium says "k firms enter", not "which k". All firms are identical ex ante, so any subset of size $k$ works — which also means the model does not answer the coordination question: every firm wants to be one of the $k$. Ball leaves it as a question to think about: should they mix? Flip a coin? Or is something missing from the model?

## What this lecture establishes

1. Backward induction requires perfect information. Once an information set holds several nodes, "optimal at each node" loses its meaning and the method goes with it.
2. A **subgame** is a node plus all its successors, with the starting node in a singleton information set and no information set cut. The whole game is always a subgame; terminal nodes never start one.
3. **SPNE** requires the restriction of the profile to every subgame to be a Nash equilibrium. Because the whole game is a subgame, SPNE implies Nash equilibrium; the converse fails.
4. Nash equilibrium constrains only the path played, while SPNE also constrains unreached branches. A non-credible threat is exactly a profitable deviation sitting in an unreached subgame, and that is the whole difference.
5. The procedure is: list every subgame, solve the smallest ones first, and substitute each equilibrium's payoffs one level up. When a subgame has several equilibria, try each.
6. In Cournot with entry costs, SPNE pins down the number of firms: $k$ enter exactly when $\pi_{k+1}\le F\le\pi_k$, and higher fixed costs mean fewer firms.

## Check your understanding

**1. Why is $(X,F)$ a Nash equilibrium yet a poor prediction?**

Because under $(X,F)$, player 2's F is only tested on the path where player 1 stays out. If entry happened, player 2 would be choosing between 1 and $-1$ and would switch to A. In other words the profile is not a Nash equilibrium of the post-entry subgame. Nash equilibrium only rules out profitable deviations along the path actually played, and that path never enters the subgame, so the test never fires. SPNE adds exactly that test.

**2. What does each of the two subgame conditions rule out? Illustrate with this lecture's example.**

The singleton condition rules out a starting node inside a multi-node information set, guaranteeing that everyone knows we are at this history. The no-cutting condition rules out a subgame whose players share an information set with players outside it, guaranteeing the block is closed. In the example, the two nodes inside player 1's information set violate both at once: neither is singleton, and collecting successors from either one slices player 1's two-node information set.

**3. Why is the whole game always a subgame, and what is that good for?**

Take the initial node: by the definition of an extensive-form game it sits in a singleton information set, and collecting all successors collects every node, so no information set can be cut. Both conditions hold. The use is proving that SPNE implies Nash equilibrium: the definition quantifies over every subgame, so substitute the whole game and you get "the whole game is a Nash equilibrium".

**4. In the Boston example, $(XC,R)$ is a Nash equilibrium but not an SPNE. Where exactly does it fail?**

It fails in the post-entry subgame. There the profile is player 1 plays C, player 2 plays R, with payoffs $(0,0)$; player 1 switching to R gets 1 and player 2 switching to C gets 1, so both have profitable deviations and $(C,R)$ is not a Nash equilibrium of the subgame. The whole-game test misses it because player 1 picks $X$, so the path never arrives — whatever they would do down there cannot affect the payoff.

**5. In the Cournot example, if $F=0.07(1-c)^2$, how many firms enter? What happens as $c$ rises?**

Since $\pi_3=1/16=0.0625$ and $\pi_2=1/9\approx0.111$, we have $\pi_3\le F\le\pi_2$, so 2 firms enter. If $c$ rises, $(1-c)^2$ shrinks, every $\pi_k$ falls proportionally, the same $F$ becomes relatively more expensive, and the threshold moves to a smaller $k$: fewer entrants. In the limit as $c$ approaches 1, nobody enters.

**6. Why does each firm's stage-two quantity depend only on the number $k$ of entrants, not on who they are? What if costs differed?**

Because the model assumes symmetry: same marginal cost, same demand, same fixed cost, so the first-order conditions at a symmetric solution involve only $k$. With a lower marginal cost for one firm, the condition becomes $1-c_i-Q_{-i}-2q_i=0$ and the solution depends on $c_i$; you would then have to track identities, and the subgame could no longer be parametrised by $k$ alone. Ball says this explicitly: it is precisely because firms are identical ex ante that we do not care who entered.
