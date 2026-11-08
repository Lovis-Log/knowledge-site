---
slug: "05-nash-equilibrium"
title: "Nash Equilibrium: From \"I Can Explain It\" to \"I Got It Right\""
summary: "Rationalizability only guarantees that each surviving strategy has some explanation, not that the explanation is true. Nash equilibrium demands that beliefs match actual play, which yields \"no one gains by deviating alone\"; it sits between the other solution concepts, collapses in pure-conflict games, needs mixed strategies and an indifference condition to survive there, and exists in every finite game by Nash's 1948 theorem."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "nash-equilibrium"
  - "mixed-strategy"
sources:
  - kind: "video"
    title: "Lecture 5: Nash Equilibrium"
    url: "https://www.youtube.com/watch?v=ftCXguW2k4o"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

Last lecture's tool was rationalizability: start from every strategy, repeatedly delete strictly dominated ones, and call what survives $S^\infty$. The guarantee it offers is thin — every surviving strategy can be justified, and that is all.

The Boston game exposes how thin. Two friends, one partial to the Celtics and one to the Red Sox, both happier together. All four profiles survive, including the one where I go to the Red Sox, you go to the Celtics, and each of us sits alone in an arena while a unilateral change of venue would make either of us better off.

Ball's diagnosis: rationalizability only requires that a player **has an explanation**. I can explain "I am going to the Red Sox because I believe you are going to the Red Sox", and that belief can be explained by "I believe you believe I am going to the Red Sox", and the chain runs on forever. The trouble is that every link may be false — I really did go to the Red Sox, and you really did go to the Celtics.

Nash equilibrium tightens exactly this: the explanation must not merely exist, it must be **correct**. The strategy you believe your opponents will play has to be the strategy they actually play. Written out, that becomes "given everyone else, nobody can do strictly better by changing only their own action".

The rest of the lecture works out the consequences: how the definition nests with the other solution concepts, what to do when no pure-strategy equilibrium exists, and whether an equilibrium is guaranteed at all. Ball closes with three minutes on a question that is not really technical — whether the definition deserves to be believed.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Starting from rationalizability: $S^0$ pared down to $S^\infty$ |
| 4:46 | What $S^\infty$ means: rationality plus knowledge of rationality at every order |
| 6:03 | The Boston game: $(C,C)=(2,1)$, $(R,R)=(1,2)$, mismatches pay 0 |
| 9:25 | All four profiles survive, yet CR looks like mutual error |
| 10:31 | What rationalizability really says: each player has an explanation |
| 12:41 | Nash adds the requirement that the explanation be true |
| 16:37 | Equivalent form: a best response to the belief that opponents are certain to play it |
| 18:01 | The intuitive form: no strictly profitable unilateral deviation |
| 21:18 | Underlining: mark all best responses for both players, a double-marked cell is an equilibrium |
| 24:44 | Counting in the Boston game: 4 rationalizable, 2 Nash, 0 dominant-strategy |
| 26:53 | The nesting $DSE \subseteq NE \subseteq S^\infty \subseteq S$ |
| 34:24 | Proving $NE \subseteq S^\infty$ by induction on elimination rounds |
| 39:49 | The tempting error: inducting player by player while opponents' sets shrink |
| 45:31 | Hide-and-seek: pure conflict, no pure-strategy equilibrium |
| 52:01 | Defining a mixed-strategy profile, and the split between $\Sigma_i$ and $S_i$ |
| 57:47 | Necessary condition for mixing: indifference over the strategies mixed |
| 1:05:12 | The Boston game: $P_1$ delivers player 2's indifference, giving $2/3$ and $1/3$ |
| 1:15:38 | Nash's existence theorem: every finite game has a mixed equilibrium |

## What rationalizability leaves open

### Reading the elimination rounds

Notation as before: a strategic-form game specifies the players, each player's pure strategy set $S_i$, and payoff functions $u_i$. Iterated elimination of strictly dominated strategies runs

$$
S^0=S,\qquad
S^{k+1}=\big\lbrace (s_1,\dots,s_n)\in S^k:\ \text{each } s_i \text{ is a best response to some belief over } S_{-i}^{k} \big\rbrace ,
$$

until nothing changes, leaving $S^\infty$.

Each round carries a different behavioural assumption, and Ball stops to spell them out:

- $S^0$ assumes nothing; anything is possible.
- $S^1$ assumes **everyone is rational** — each player best-responds to some belief.
- $S^2$ adds that everyone knows the others are rational.
- $S^K$ corresponds to rationality plus $K-1$ orders of knowledge of rationality. The offset is there because round one contains rationality with no knowledge about it.
- $S^\infty$ requires every order at once: **common knowledge of rationality**.

Note that $S^K$ is a product, $S^K=S_1^K\times\cdots\times S_n^K$. That detail becomes load-bearing in the proof later.

### The Boston game: everything survives

Ball changes the numbers this time so that the algebra later comes out clean. Player 1 prefers the Celtics, player 2 prefers the Red Sox, and both want to be together:

| | Player 2 picks C | Player 2 picks R |
| --- | --- | --- |
| Player 1 picks C | 2, 1 | 0, 0 |
| Player 1 picks R | 0, 0 | 1, 2 |

Best responses, one player at a time. Player 1: if the opponent goes to C, C pays 2 against 0, so C; if the opponent goes to R, R pays 1 against 0, so R. Player 2 is symmetric: C against C (1 beats 0), R against R (2 beats 0).

So nothing is ever eliminated and $S^\infty$ holds all four profiles: $CC$, $CR$, $RC$, $RR$, with player 1's letter first.

$CR$ means player 1 at the Red Sox, player 2 at the Celtics. Someone in the room spots the problem immediately: both are losing. Player 1 gets 0 and would get 2 by switching to the Celtics; player 2 gets 0 and would get 1 by switching to the Red Sox. **Both want to move alone.**

### Why it is still rationalizable

Here is the hinge of the lecture. $CR$ survives because it satisfies a weaker condition: given that player 1 believes player 2 will go to R, going to R is indeed optimal (1 beats 0); given that player 2 believes player 1 will go to C, going to C is optimal (1 beats 0).

The two beliefs are mutually inconsistent, but each choice is optimal relative to the belief behind it. Ball puts the point plainly: **rationalizability means the player has an explanation**.

And the explanation can be deepened without limit. Why do you believe she is going to R? Because I believe she believes I am going to R. Why do you believe that? Because... It is the child who keeps asking why, one layer further each time. Rationalizability guarantees the chain never hits a contradiction — if it did, the strategy would already have been eliminated.

Then the cost: **the explanation may exist and still be wrong**. In $CR$, player 1's explanation is "she will go to the Red Sox", and she went to the Celtics. The deeper the chain, the less reason to trust any of it.

Nash equilibrium adds one clause to that sentence: the explanation must accurately describe what opponents actually do.

## The definition: no one can do better alone

### The formal statement

A strategy profile $s^\ast=(s_1^\ast,\dots,s_n^\ast)$ is a **Nash equilibrium** if for every player $i$ and every $s_i'\in S_i$,

$$
u_i\big(s_i^\ast,\,s_{-i}^\ast\big)\ \ge\ u_i\big(s_i',\,s_{-i}^\ast\big).
$$

Three details repay attention:

1. **An equilibrium is a profile.** Ball says this is the most common way students lose marks: asked for an equilibrium, they write down the payoffs. An equilibrium is a prediction of how everyone plays, so it must be a list of strategies. $(2,1)$ is not an equilibrium; $CC$ is.
2. **The same $s_{-i}^\ast$ appears on both sides.** Opponents' play is pinned at the equilibrium and only my own coordinate moves. That is what "unilateral" means.
3. **The inequality is weak.** Setting $s_i'=s_i^\ast$ makes both sides equal, so the condition holds automatically. The definition permits deviations that do not pay; it forbids only deviations that pay strictly.

Point 3 is often misread as making the concept soft. All it does is rule out strict improvement: if a deviation made me better off I would not be sitting still, and if it merely breaks even, either choice will do.

### Three ways to say the same thing

Ball gives the condition three forms:

- **Best-response form**: $s_i^\ast$ is a best response to $s_{-i}^\ast$. There is a technical gap here — lecture three defined best responses to *beliefs*, and $s_{-i}^\ast$ is a profile. Read it strictly as a best response to the degenerate belief $\beta_{-i}$ with $\beta_{-i}(s_{-i}^\ast)=1$.
- **Deviation form**: no player has a strictly profitable unilateral deviation, where "profitable" means higher utility, not more money.
- **Belief-consistency form**: beliefs are invisible in the definition because **beliefs are required to equal reality**. The symbol $s_{-i}^\ast$ is simultaneously the opponents' actual play and my (correct) belief about it. Merging the two into one symbol is exactly what makes the distinction easy to forget.

Ball calls the third point Nash's most important idea: **when reasoning about other people, take their strategies as given**. I cannot control them; I control one coordinate.

### Underlining

In a two-player game there is a pencil-and-paper algorithm:

1. In each column, mark player 1's highest payoff (mark all ties).
2. In each row, mark player 2's highest payoff.
3. Any cell with both numbers marked is a Nash equilibrium.

Ball insists on **all** best responses for **both** players. Marking one side, or only unique best responses, loses equilibria.

Why does it work? Player 1's number is marked exactly when he is best-responding to player 2's strategy in that column; both marked means both are best-responding, which is the definition. The reading only works directly in two-player games, where a cell is a profile; with three players a cell is not a profile.

In the Boston game the diagonal is double-marked: $CC$ and $RR$. Two pure-strategy equilibria.

## How the three solution concepts nest

### Counting in the Boston game

Ball lines the concepts up inside one game:

- Rationalizable profiles: $S^\infty=\lbrace CC,CR,RC,RR\rbrace$, four.
- Nash equilibria: $NE=\lbrace CC,RR\rbrace$, two.
- Dominant-strategy equilibria: $DSE=\varnothing$, none.

The empty set is easy to verify. Does $C$ weakly dominate $R$? Against R, $C$ pays 0 and $R$ pays 1, so no. Does $R$ weakly dominate $C$? Against C, $R$ pays 0 and $C$ pays 2, so no. Neither dominates, so neither is weakly dominant, so there is no $DSE$.

That suggests a guess, and the guess is a theorem:

$$
DSE\ \subseteq\ NE\ \subseteq\ S^\infty\ \subseteq\ S .
$$

The last inclusion is trivial — rationalizable profiles are profiles. The first two need proofs.

### First inclusion: $DSE\subseteq NE$

Let $s^\ast$ be a dominant-strategy equilibrium. To show it is a Nash equilibrium, fix a player $i$ and a deviation $s_i'$ and show $u_i(s_i^\ast,s_{-i}^\ast)\ge u_i(s_i',s_{-i}^\ast)$.

Start from the hypothesis. Since $s^\ast$ is a $DSE$, $s_i^\ast$ is weakly dominant for player $i$: it weakly dominates **every** other strategy of player $i$, and in particular $s_i'$:

$$
u_i(s_i^\ast,s_{-i})\ \ge\ u_i(s_i',s_{-i})\qquad \text{for all } s_{-i}.
$$

That is a statement about every opponent profile. What we need is the statement at one point, $s_{-i}=s_{-i}^\ast$. Substitute and the desired inequality appears.

The whole proof does one thing: **it weakens "for all $s_{-i}$" to "for this one $s_{-i}$"**. Ball's phrase is that we throw information away. That also explains why the converse fails: Nash equilibrium only promises no loss at this single point, dominance promises no loss everywhere, and the latter is strictly stronger.

One logical footnote: the argument shows that *if* a $DSE$ exists it is a $NE$; it does not show that a $DSE$ exists. In the Boston game $DSE$ is empty, so the claim holds vacuously.

### Second inclusion: $NE\subseteq S^\infty$

This one is harder, because $S^\infty$ is defined by an infinite procedure. A student suggests contradiction; Ball agrees it would work, but says induction is the natural route, since $S^\infty$ is itself defined inductively.

We want $s^\ast\in S^\infty$. Since $S^\infty=\bigcap_k S^k$, that is equivalent to

$$
s^\ast\in S^k\qquad \text{for every } k.
$$

In words: the profile survives every round and makes it to the end. The route is to show it survives round 0, and that surviving round $k$ implies surviving round $k+1$.

**Base case** ($k=0$): $S^0=S$ is every profile, and $s^\ast$ is a profile. True by definition, and empty of content.

**Inductive step**: assume $s^\ast\in S^k$, show $s^\ast\in S^{k+1}$.

First unpack the hypothesis. $S^k$ is a product, so $s^\ast\in S^k$ means every coordinate is still alive: $s_i^\ast\in S_i^k$ for all $i$.

Now the step Ball flags as the standard mistake. You **cannot** argue player by player: fix $i$, assume $s_i^\ast\in S_i^k$, conclude $s_i^\ast\in S_i^{k+1}$. That goes nowhere, because the definition of $S_i^{k+1}$ refers to $S_{-i}^k$ — which of player $i$'s strategies survive round $k+1$ depends on which of the **opponents'** strategies survived round $k$. Their sets are shrinking with $k$, and staring at your own coordinate hides that.

So the useful part of the hypothesis is not "$s_i^\ast$ is still in" but

$$
s_{-i}^\ast\in S_{-i}^k ,
$$

the part about the other players. From player $i$'s point of view, Ball notes, that is the information that matters: what I care about is what my opponents might play.

Now just compare definitions. $S_i^{k+1}$ is the set of strategies that best-respond to some belief over $S_{-i}^k$. The definition of Nash equilibrium says outright that $s_i^\ast$ best-responds to $s_{-i}^\ast$. Since $s_{-i}^\ast\in S_{-i}^k$, take the belief putting all mass on $s_{-i}^\ast$ and conclude

$$
s_i^\ast\in S_i^{k+1}.
$$

Repeat for every $i$ and $s^\ast\in S^{k+1}$; the inductive step is done.

Together: $s^\ast$ survives round 0, hence round 1, hence round 2, and so on for every $k$. Therefore $s^\ast\in S^\infty$.

The structure is worth remembering: **the inductive hypothesis has to hold for all players at once**, because what it supplies is "my opponents are still here", not "I am still here". Ball's remark is that no single step is difficult; what is difficult is keeping track of where you started and where you are going.

## Hide-and-seek: no pure-strategy equilibrium

### A game of pure conflict

Player 1 hides, player 2 seeks, and there are two locations:

| | Player 2 looks at A | Player 2 looks at B |
| --- | --- | --- |
| Player 1 hides at A | −1, 1 | 1, −1 |
| Player 1 hides at B | 1, −1 | −1, 1 |

Ball offers two more serviceable costumes: a tax evader hiding and the revenue service seeking, or a penalty taker and a goalkeeper.

The structural difference from the Boston game is the **alignment of interests**. Boston had both conflict (different teams) and common interest (sitting together). Here there is only conflict: player 1 wants the two locations to **differ**, player 2 wants them to **coincide**. Ball calls this zero-sum in a formal sense to be developed later.

### Nothing gets double-marked

Compute best responses. Player 1: opponent looks at A, hide at B; opponent looks at B, hide at A. Player 2: opponent hides at A, look at A; opponent hides at B, look at B.

Run the underlining algorithm and **no cell has both numbers marked**. The game has no pure-strategy Nash equilibrium.

The intuition is immediate. If both are in the same place, the hider is losing and moves; if they are in different places, the seeker is losing and moves. Someone always wants to move, so there is no resting point.

Rationalizability is even less helpful here: hiding at A is explicable as "I believe she looks at B", hiding at B as "I believe she looks at A", and both explanations stand up. $S^\infty$ is still all four profiles.

### So randomise

Ball asks the room how they would take a World Cup penalty. The answer is a mixed strategy: flip a coin, fifty-fifty. He adds that the data on penalty takers roughly bears this out (with footedness subtleties he sets aside). The counterexample is familiar: play hide-and-seek with a child who always hides in the same spot, or in the same spot 95% of the time, and she is easy to find.

So

$$
\Big(\tfrac12 A+\tfrac12 B,\ \tfrac12 A+\tfrac12 B\Big)
$$

should be a mixed-strategy Nash equilibrium. But before verifying it, the notion needs a definition.

## Mixed strategies: randomising only when indifferent

### Definition and notation

Let $\Sigma_i$ be the set of all mixed strategies for player $i$ — probability distributions over $S_i$ — and $\sigma_i\in\Sigma_i$ one of them. A mixed profile $\sigma^\ast=(\sigma_1^\ast,\dots,\sigma_n^\ast)$ is a Nash equilibrium if for every $i$ and every $\sigma_i'\in\Sigma_i$,

$$
u_i\big(\sigma_i^\ast,\sigma_{-i}^\ast\big)\ \ge\ u_i\big(\sigma_i',\sigma_{-i}^\ast\big).
$$

The notation settles into a tidy pattern worth memorising: lowercase $s$ is a pure strategy, uppercase $S$ the set of pure strategies; lowercase $\sigma$ is a mixed strategy, uppercase $\Sigma$ the set of mixed strategies. The payoff $u_i$ now takes mixed profiles and returns expected utility.

A pure strategy is the special case that puts probability one on some $s_i$, so every pure-strategy equilibrium is also a mixed-strategy equilibrium, in degenerate form.

### Checking pure deviations suffices

As written, $\sigma_i'$ ranges over every probability in $[0,1]$ — a continuum, hopeless to check one at a time. Fortunately there is no need:

$$
u_i(\sigma_i^\ast,\sigma_{-i}^\ast)\ge u_i(\sigma_i',\sigma_{-i}^\ast)\ \text{for all } \sigma_i'
\quad\Longleftrightarrow\quad
u_i(\sigma_i^\ast,\sigma_{-i}^\ast)\ge u_i(s_i,\sigma_{-i}^\ast)\ \text{for all } s_i .
$$

The reason is one line of averaging. Any mixed deviation pays a weighted average of pure payoffs, with the deviation's own probabilities as weights:

$$
u_i(\sigma_i',\sigma_{-i}^\ast)=\sum_{s_i\in S_i}\sigma_i'(s_i)\,u_i(s_i,\sigma_{-i}^\ast).
$$

If no pure strategy beats the equilibrium payoff, no weighted average of them can either. The other direction is trivial, since pure strategies are mixed strategies.

There is an asymmetry here that Ball stresses: **the equilibrium strategy may be mixed, but deviations need only be pure**. The first half cannot be dropped — hide-and-seek has no pure equilibrium, so restricting to pure strategies would break the theory exactly where it is needed. The second half cannot be dropped either, or the check runs over a continuum. Both halves together.

### The indifference lemma

Why would I ever flip a coin? If A were strictly better than B, I would play A always and give B no probability. Hence:

**If $\sigma_i$ assigns positive probability to both $s_i$ and $s_i'$, the two must pay the same against $\sigma_{-i}$.**

Otherwise shifting a little probability from the worse one to the better one raises expected utility, and $\sigma_i$ was not a best response.

Ball states the stronger version: it is not merely that you are indifferent over what you mix, it is that you may **only mix over pure best responses**. His three-strategy counterexample:

| Strategy | Payoff |
| --- | --- |
| A | 1 |
| B | 1 |
| C | 2 |

A and B are indifferent, but mixing them pays 1 while C pays 2. Indifference is **necessary**, not sufficient. The common error is to run it backwards — "I am indifferent, so I may mix freely". No: what you mix over must itself be optimal.

(Replace C with another strategy D that also pays 2 and mixing between C and D becomes fine. The test is that every strategy receiving positive probability is a best response.)

### Verifying $(\tfrac12,\tfrac12)$ in hide-and-seek

The standard move is to add a row. Suppose player 1 plays $\tfrac12 A+\tfrac12 B$; player 2 then faces a new row whose payoffs are the two old rows halved and summed:

- Player 2 looks at A: $\tfrac12(1)+\tfrac12(-1)=0$.
- Player 2 looks at B: $\tfrac12(-1)+\tfrac12(1)=0$.

Both pure strategies pay 0, so player 2 is indifferent, and by the converse of the lemma — here both pure strategies are best responses — mixing $\tfrac12,\tfrac12$ is a best response for player 2 as well.

The other direction is symmetric: if player 2 plays $\tfrac12 A+\tfrac12 B$, both of player 1's pure strategies pay 0, so mixing is a best response for player 1.

Both directions hold, so $(\tfrac12 A+\tfrac12 B,\tfrac12 A+\tfrac12 B)$ is a mixed-strategy Nash equilibrium. Ball substitutes a check mark for the second half and notes that this is not acceptable on a problem set.

## The mixed equilibrium of the Boston game

### Two indifference conditions

The Boston game already has $CC$ and $RR$; it also has a genuinely mixed equilibrium. Let player 1 go to C with probability $P_1$ and to R with $1-P_1$, player 2 go to C with probability $P_2$ and to R with $1-P_2$, with $0<P_1<1$ and $0<P_2<1$.

Player 2 first. Going to C scores only when player 1 also goes to C, which happens with probability $P_1$ and pays 1:

$$
u_2(C)=P_1\cdot 1+(1-P_1)\cdot 0=P_1 .
$$

Going to R scores only when player 1 also goes to R, probability $1-P_1$, paying 2:

$$
u_2(R)=P_1\cdot 0+(1-P_1)\cdot 2=2(1-P_1).
$$

For player 2 to be willing to mix, he must be indifferent:

$$
P_1=2(1-P_1)\ \Longrightarrow\ 3P_1=2\ \Longrightarrow\ P_1=\tfrac23 .
$$

Player 1 next. Going to C pays $2P_2$, going to R pays $1-P_2$:

$$
u_1(C)=2P_2,\qquad u_1(R)=1-P_2,
$$

and indifference gives

$$
2P_2=1-P_2\ \Longrightarrow\ 3P_2=1\ \Longrightarrow\ P_2=\tfrac13 .
$$

So the mixed equilibrium is

$$
\left(\tfrac23 C+\tfrac13 R,\ \tfrac13 C+\tfrac23 R\right).
$$

![Best-response correspondences in the Boston game: the horizontal axis is player 1's probability of going to the Celtics and the vertical axis is player 2's; the ink staircase jumps from x=0 to x=1 at y=1/3, the ochre staircase jumps from y=0 to y=1 at x=2/3, and the two staircases cross at (0,0), (1,1) and (2/3,1/3), the two pure equilibria plus the mixed one](/images/nash-equilibrium-best-response-en.svg)

*Figure: the crossings of the two staircases are exactly the Nash equilibria. Note that player 1's mixing probability $P_1=2/3$ sits on player 2's staircase, and $P_2=1/3$ sits on player 1's.*

### Whose indifference whose probability delivers

Lining the two equations up reveals something that looks like a transcription error: $P_1$ appears in player 2's indifference condition, and $P_2$ in player 1's.

It is not an error. $P_1$ is the frequency of player 1's actions, which is precisely the uncertainty player 2 faces; whether player 2 wants to go to C depends on how likely he thinks player 1 is to go to C. The number that makes my opponent indifferent is therefore necessarily **my own** mixing probability, not his.

This yields the lecture's most counter-intuitive point. $P_1=2/3$ says player 1 spends two thirds of the time at the Celtics. The natural reading is "because player 1 likes the Celtics". Ball says flatly that this is wrong. The real reason is that **player 2 does not like the Celtics**: going to C pays 1 against 2 at R, a large gap, so he will only go to C when he is sufficiently convinced player 1 will. $P_1$ has to be high enough that $1\cdot P_1$ catches up with $2(1-P_1)$.

Conversely, $P_2=1/3$ is not because player 2 loves the Red Sox but because player 1 prefers the Celtics (2 against 1), so player 1 will only go to the Red Sox when convinced player 2 is likely to.

Player 1's taste for the Celtics shows up in $P_2=1/3$, not in $P_1=2/3$. Each number encodes the **opponent's** preference gap. The equilibrium mixing probabilities are meshing gears, not a direct readout of anyone's tastes.

## Why anyone would actually randomise

### A question left open

Ball raises the doubt himself: if I am indifferent anyway, why go to the trouble of randomising at exactly the right ratio? What do I get out of making my opponent indifferent? He says the question is left for later in the course.

He offers two stories.

**Story one: repetition and reputation.** If the game is played over and over, always shooting the same way builds an exploitable record. A penalty taker who always goes left will be read. In that light a mixed equilibrium is a more compelling prediction when the interaction repeats. Ball concedes that what "having a reputation" means needs formalising, and that it is not clear how to do it.

**Story two: mixing is not literal.** The decision may depend on a private signal the opponent cannot see: someone picks clothing colours by the weather, which is deterministic to them and looks random to you; a penalty taker feels a direction in one foot during the run-up and makes a deterministic choice, but the opponent cannot see the signal, so it appears random. Sometimes we observe randomisation; sometimes behaviour merely looks random from outside.

Neither story is a theorem. They are what makes the definition credible.

### Existence

Hide-and-seek has no pure equilibrium but does have a mixed one. Could some stranger game have no equilibrium at all? If so the theory would have nothing to say.

Nash's 1948 result says no: **every finite strategic-form game has at least one mixed-strategy Nash equilibrium**. It may have exactly one, or two, or infinitely many, but never none. Pure equilibria are the degenerate case.

The theorem is not proved in the course. Ball calls it the deepest mathematical result in the course, resting on a fixed-point theorem (Brouwer or Kakutani depending on the version); the lecture notes contain a proof built on those theorems, and the real depth lives in the fixed-point theorems themselves. He adds a historical note: those tools had been proved in the early 1940s, and Nash put them to work a few years later, when the frontier of mathematics and the frontier of economics were very close together.

### Three interpretations

Ball does not end by treating the definition as self-evident. It is often called the crowning achievement of game theory, he says, but its justification is less clean than rationalizability's: stronger assumptions, sharper predictions, and the price is credibility. You still have to solve for equilibria on the exam; it is worth thinking about why they should exist. Three readings:

1. **A stable convention.** Why does the US drive on the right and the UK on the left? Not because of fines, but because of oncoming traffic. If everyone drives on the right, I drive on the right; if everyone drives on the left, I drive on the left. Both are stable conventions.
2. **A self-enforcing agreement.** Treaties between countries have no higher court to enforce them. But a well-designed treaty leaves no party wanting to withdraw unilaterally — the force comes from the incentive structure, not from an enforcer.
3. **A steady state.** Always shoot right and goalkeepers start guessing right; so you shoot left; and over time play may converge to the mixed equilibrium. Ball notes that whether the dynamics really converge needs a subtler argument, but at least this much is true: inside a Nash equilibrium there is no reason to move.

## What this lecture establishes

1. Rationalizability only requires that a player **has an explanation**, and permits the explanation to be false. Nash equilibrium requires the explanation to be **true**: the strategies you believe your opponents will play are the ones they play. That is the entire boundary between the two concepts.
2. Formally, for every player, holding everyone else at the equilibrium, no deviation yields strictly higher utility. The inequality is weak, so break-even deviations are allowed and only strict improvement is forbidden.
3. The three concepts nest strictly: $DSE\subseteq NE\subseteq S^\infty\subseteq S$. In the Boston game the counts are 0, 2, 4 and 4.
4. The two inclusions are proved differently. $DSE\subseteq NE$ weakens "for all opponent profiles" to "for this one profile". $NE\subseteq S^\infty$ needs induction on elimination rounds, and the inductive hypothesis must cover all players at once, because what determines my survival is what my opponents still have.
5. Pure-conflict games may have no pure-strategy equilibrium. Mixed strategies fill the gap, with a precise asymmetry: the equilibrium strategy may mix, while deviations need only be checked in pure strategies. Indifference over what you mix is necessary, and sufficient only when everything you mix over is a best response.
6. My mixing probability in equilibrium is pinned down by my **opponent's** indifference condition, so it encodes his preference gap, not mine. Every finite game has a mixed-strategy equilibrium (Nash 1948).

## Check your understanding

**1. In the Boston game, $CR$ is rationalizable but not a Nash equilibrium. Which clause of the definition does it violate?**

One player is enough. Under $CR$ player 1 gets 0; holding player 2 at C, player 1 switching to C pays 2, and $2>0$. So player 1 has a strictly profitable unilateral deviation and the definition fails at $i=1$. Player 2 fails too — holding player 1 at R, switching to R pays 2 rather than 0 — but the definition only needs one failure.

**2. What happens if the $\ge$ in the definition is replaced by $>$?**

The equilibrium set becomes empty. Setting $s_i'=s_i^\ast$ makes both sides the same number, so a strict inequality can never hold, and no profile passes — not even $CC$, which should. The weak inequality is not there to make the definition permissive; it is there to make it consistent. What is excluded is strict improvement, not the absence of improvement.

**3. Why is $(A,A)$ not an equilibrium in hide-and-seek? Who wants to deviate?**

$(A,A)$ pays $(-1,1)$. Player 1 is the hider and moves to B for 1, strictly better than $-1$. $(B,B)$ fails the same way. And $(A,B)$ pays $(1,-1)$, where player 2 moves from B to A and goes from $-1$ to 1. Check all four cells and each has someone who wants to move; that is what "no pure-strategy equilibrium" means concretely.

**4. Why is it enough to check pure deviations when testing a mixed profile?**

Because a mixed deviation pays a weighted average of pure payoffs: $u_i(\sigma_i',\sigma_{-i}^\ast)=\sum_{s_i}\sigma_i'(s_i)u_i(s_i,\sigma_{-i}^\ast)$. If no pure payoff exceeds $u_i(\sigma_i^\ast,\sigma_{-i}^\ast)$, no weighted average can. Two premises are doing work: the weights are non-negative and sum to one, and the equilibrium strategy $\sigma_i^\ast$ itself may be mixed. The second cannot be dropped — in hide-and-seek every pure strategy is beaten, and only a mixture survives.

**5. In the Boston game, is $P_1=2/3$ because player 1 prefers the Celtics?**

No. $P_1$ must satisfy player 2's indifference condition $1\cdot P_1=2(1-P_1)$, and the coefficient 2 on the right is player 2's preference for the Red Sox. Player 1's taste for the Celtics shows up in $P_2=1/3$, because player 2's condition is $2P_2=1-P_2$, where the 2 on the left is player 1's Celtics payoff. Each player's ratio encodes the other's preference gap: the less my opponent likes an outcome, the more often I must play it to leave him indifferent.

**6. If a strategy is indifferent to another given a belief, may I mix between them?**

Not necessarily. Indifference is necessary, not sufficient. With payoffs A = 1, B = 1, C = 2, A and B are indeed indifferent, but mixing them pays 1 while C pays 2, so the mixture is not a best response. The correct test is that **every** strategy receiving positive probability is a best response. Ball notes that students often run the implication backwards — "I am indifferent, so I may mix" — which is false.
