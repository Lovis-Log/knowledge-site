---
slug: "16-bayesian-games"
title: "Bayesian Games: Writing 'I Don't Know Who You Are' as a Move by Nature"
summary: "Incomplete information is not the same as imperfect information. When relevant information is already asymmetric at the start of the game, payoffs alone are not enough — you must also say who believes what. Harsanyi's device is to let nature deal first: private information becomes a type, types become a prior, and Bayes' rule turns the prior into beliefs."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "bayesian-games"
  - "incomplete-information"
sources:
  - kind: "video"
    title: "Lecture 16: Bayesian Games"
    url: "https://www.youtube.com/watch?v=-6A59LiKUss"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

A new phase of the course begins here: incomplete information. Ball opens with a warning that the terminology is confusing — the course has been discussing perfect and imperfect information, and now it turns to complete and incomplete information. "Complete" and "perfect" sound similar in ordinary speech but mean very different things in game theory.

Recall the first dimension. **Perfect information** means every information set is a singleton: when it is your turn, you know exactly what everyone did before. Chess is the canonical case — the board is in front of you and you remember every move. **Imperfect information** means some information sets are not singletons: when it is your turn, something that has already happened is hidden from you, whether it was done by nature or by another player. Simultaneous moves are the commonest source — technically someone moves first, but the second mover does not observe it, so his information set contains both "the opponent played left" and "the opponent played right". Poker is the other case: even with sequential betting, you do not know the opponent's cards.

Both of these are **complete information**. The criterion is that at the **beginning** of the game, relevant information is symmetric — in Ball's phrase, common knowledge. The words "at the beginning" cannot be dropped. When you sit down at a poker table nobody has been dealt a hand yet; the rules, the objective, and the fact that everyone wants to win money are all common knowledge. Information becomes asymmetric only once the deal happens. This also explains why complete information does not mean omniscience: I do not know what I will be dealt, but neither do you, so at the starting point nobody knows more than anybody else.

**Incomplete information** is different: at the beginning of the game there is already relevant information that some players know and others do not. The distinction is substantive. Ball observes a pattern: examples of complete-information games almost all come from parlour games, whereas once you analyse real economic situations you are almost always in the incomplete-information case.

Four standard settings. **Buying a used car**: the seller — perhaps an experienced mechanic or dealer — knows the condition of the car, whether the engine has a problem, whether it makes a noise on every drive; the buyer knows how much he needs a car (a job to get to tomorrow, three dealerships already visited, a fondness for red or a dislike of brown). Condition matters to both valuations, so it is relevant private information. **Health insurance**: the buyer knows his medical history, the symptoms that started last week, the family history; the insurer knows its network coverage, how cumbersome reimbursement is, and what its rejection rate is. This is one reason health insurance markets often run badly. **Auctions**: each bidder knows her own valuation, and nobody else does; the valuation might reflect a love of the painting or simply a lot of money that must be spent today. **Bargaining**: in a peace negotiation the other side knows its domestic political constraints and the true state of its army, none of which is visible to the counterparty.

There is a historical turning point here. Game theory began with mathematicians analysing chess, checkers and poker, and the theory of complete information captured those games very well. But a folk view held that the theory could never be applied to the real world, because the real world is not common knowledge — there is simply too much we do not know for the tools to bite. The breakthrough came from Harsanyi in 1967 and 1968, who supplied a framework for analysing such situations. Ball calls it a turning point for the field: before, it was largely a mathematicians' subject; afterwards economists realised this was the right way to think about health insurance markets and bargaining, and the nature of the field shifted. Harsanyi later won the Nobel Prize for this work.

His key insight: **incomplete information can be modelled the way imperfect information is modelled**. In poker there is a dealer whose cards you cannot see. In the real world there is no dealer, but we can pretend there is — a "nature" that moves first and deals each player his private information. What it deals you is not a playing card but your health status, your valuation of the painting, the true condition of your army. Once the deal is made, the situation is a game of imperfect information, and all the existing machinery applies.

The analogy has an interpretive awkwardness: in poker, "before the deal" is a well-defined moment — I am sitting at the table and the cards have not come. What is the moment before nature deals you your health status? Before you were born? This makes "a strategy is a complete contingent plan" slightly strange, and the course keeps running into the issue. A second difficulty is where the prior comes from: drawing from a deck gives obvious probabilities; drawing your health status or your valuation of a painting does not.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | A new phase: incomplete information, and the terminological trap |
| 1:14 | Perfect information: singleton information sets, chess |
| 1:58 | Imperfect information: simultaneous moves and poker |
| 4:01 | The criterion for complete information: symmetry at the start |
| 7:43 | Used cars: the seller knows the condition, the buyer knows how much he needs it |
| 10:30 | Health insurance: the buyer knows his history, the insurer knows its claims process |
| 13:33 | Auctions and bargaining: valuations and political constraints |
| 15:49 | Harsanyi: modelling incomplete information as a deal by nature |
| 19:55 | The group project: $\theta$ is the difficulty, effort is the action |
| 23:46 | The case where only player 1 knows $\theta$ |
| 26:26 | The regress: I know that you know that I know |
| 33:34 | The type as a player's complete mental state |
| 40:03 | The prior $P$ and the four states of the world |
| 47:05 | Example two: a noisy signal with accuracy $q$ |
| 58:47 | Bayes' rule turns the prior into beliefs |
| 1:01:09 | The definition of Bayesian Nash equilibrium |
| 1:17:07 | Equivalence with Nash equilibrium of a strategic-form game |

## Two pairs of terms that are easy to confuse

Put the four concepts side by side and the distinction is plain:

| | Criterion | Typical example |
| --- | --- | --- |
| Perfect information | Every information set is a singleton | Chess, go |
| Imperfect information | Some information set is not a singleton | Simultaneous moves, poker |
| Complete information | Relevant information symmetric at the start | Both of the above |
| Incomplete information | At the start, some know relevant things others do not | Used cars, insurance, auctions |

The first two rows describe **information sets**: whether a player, when called upon to move, knows what has already happened. The last two describe the **starting point**: whether the relevant information everyone holds is the same.

The trap is that "imperfect" sounds milder than "incomplete", yet the two are orthogonal. Poker is imperfect but complete: you cannot see the opponent's cards (imperfect), but the rules and preferences are common knowledge at the start (complete). A used car sale is complete but imperfect: the condition is private information that exists from the outset (incomplete), and during the bargaining neither side sees the other's hand (imperfect). A game can be both at once.

Ball adds a technical caveat: strictly speaking we never have complete information, because there is always irrelevant information — your birthday, say — that only you know. So "information" in the definition must be read as **relevant** information, the part that bears on payoffs and strategies.

## Why "I know that you don't know" is not enough

Ball forces the issue with a group project. Two players $i=1,2$ choose effort $e_i\in[0,1]$, where 0 is doing nothing and 1 is working as hard as possible. Payoffs are

$$
u_i=\theta\,e_1e_2-e_i^{2},
$$

where the first term is the quality of the output (the product of the two efforts, scaled by a difficulty parameter) and the second is the cost of effort. Cost depends only on my own effort; the other player's effort affects output but not my cost.

Now add $\theta$: it measures how **easy** the project is, so a higher $\theta$ means more output for the same effort. This is realistic — when you start a piece of work you often do not know how hard it will be.

**Case one: nobody knows $\theta$**, only that it is drawn from some distribution. This is still a standard complete-information game, because information at the start is symmetric: nobody knows, so nobody knows more than anybody else. The existing tools apply directly.

**Case two: only player 1 knows $\theta$**. Player 1's choice may now depend on $\theta$: if the project is hard he may not think it worth the effort, if easy he may work harder. So player 1's strategy must be written as two numbers, $e_1(\theta_H)$ and $e_1(\theta_E)$.

What should player 2 do? He does not know $\theta$, so he must act on a judgement about it. So far so good — attach a prior to $\theta$ and you are done. But Ball says something is missing, and asks: does player 2 know whether player 1 knows $\theta$?

That question opens the door. Player 2 must predict player 1's effort, and player 1's effort depends on whether he knows $\theta$; so player 2 needs a view about player 1's information. Go one level up: player 1 must predict player 2's effort, and player 2's effort depends on player 2's view about whether player 1 knows; so player 1 needs a view about whether player 2 knows that player 1 knows. And then "I know that you know that I know", without end.

Ball says this is the central difficulty. You start thinking that specifying what each player knows about $\theta$ is enough, and you quickly discover that you must also take a stance on what each player knows about what the others know, with no natural stopping point.

The way out is to separate two things:

- The **physical state** $\theta$: what the world is actually like, entirely outside the players' heads. Whether the project is hard is a fact of nature.
- The **mental state** of each player: what he believes. And not merely his belief about $\theta$, but his belief about the others' mental states.

The formal work consists in packaging the entire mental state into a single object, so that the infinite regress is absorbed in one step.

## Types and the prior: Harsanyi's transformation

A Bayesian game has five ingredients:

1. Players $i=1,\dots,n$.
2. Action sets $A_i$. The word is "action" rather than "strategy", because in a Bayesian game "strategy" must be reserved for the map from types to actions; the two cannot be used interchangeably.
3. A state of nature $\theta\in\Theta$.
4. Payoffs $u_i:A_1\times\cdots\times A_n\times\Theta\to\mathbb{R}$, depending on everyone's actions **and** on the state.
5. Types $t_i\in T_i$ and a prior $P$ on $\Theta\times T_1\times\cdots\times T_n$.

The **type** is Harsanyi's key device. It packages a player's entire mental state: his belief about $\theta$, his belief about others' beliefs, and every level above that. So "the player who knows the project is hard" and "the player who thinks it is hard when it is actually easy" are different types — their mental states differ. $T_i$ is player $i$'s type space.

The **prior** $P$ is defined on $\Theta\times T_1\times\cdots\times T_n$, not merely on $\Theta$. This is easy to overlook: saying "$\theta$ takes each value with probability one half" is not enough; you must also say which type each player has in each state. $P$ is a joint distribution. A complete tuple $(\theta,t_1,\dots,t_n)$ is a **state of the world**, specifying both the physical state and everyone's mental state.

Back to the group project. The physical states are $\Theta=\{\theta_H,\theta_E\}$ (hard, easy). The infinite regress of the previous section has to be cut off here by assumption: player 2 knows that player 1 knows $\theta$, player 1 knows that player 2 knows that player 1 knows, and so on up the hierarchy — these higher-order beliefs are common knowledge. Otherwise, were player 2 unsure whether player 1 knows $\theta$, $T_2$ could not be a singleton: it would need one type for each possibility. Player 1 knows $\theta$, so he has two mental states — "knows the project is hard" and "knows it is easy" — written $t_H$ and $t_E$. Player 2 knows nothing, so he has a single mental state $t_0$:

$$
T_1=\{t_H,t_E\},\qquad T_2=\{t_0\}.
$$

**Example one (perfect observation)**: suppose the two difficulties are equally likely and this is common knowledge. The four states of the world have probabilities

$$
P(\theta_H,t_H,t_0)=\tfrac12,\quad
P(\theta_H,t_E,t_0)=0,\quad
P(\theta_E,t_H,t_0)=0,\quad
P(\theta_E,t_E,t_0)=\tfrac12 .
$$

Why are the middle two zero? Because "player 1 knows $\theta$" means his belief must be correct: if the project really is hard, he cannot believe he is facing an easy one. If $P(\theta_H,t_E,t_0)>0$ were allowed, player 1 would merely be guessing, not knowing. "Knowing" is thus written directly as a restriction on the support of the prior.

**Example two (a noisy signal)**: realistically player 1 cannot see the difficulty at a glance, he only has an impression. Suppose he receives a signal with accuracy $q\in[1/2,1]$: when the project is hard he receives the "hard" signal with probability $q$ and is misled with probability $1-q$, symmetrically when it is easy. The type space is unchanged but the interpretation shifts: $t_H$ no longer means "certainly hard" but "looks more like hard". The prior becomes

$$
P(\theta_H,t_H,t_0)=\tfrac{q}{2},\quad
P(\theta_H,t_E,t_0)=\tfrac{1-q}{2},\quad
P(\theta_E,t_H,t_0)=\tfrac{1-q}{2},\quad
P(\theta_E,t_E,t_0)=\tfrac{q}{2}.
$$

A check: the first two terms sum to $\tfrac{q}{2}+\tfrac{1-q}{2}=\tfrac12$, which is exactly $P(\theta=\theta_H)$. Summing over types given the physical state recovers the marginal on the physical state, as it must.

Two extremes are worth remembering. At $q=1$ the middle rows vanish and we are back to example one: perfect observation. At $q=1/2$ all four cells are $1/4$: the distribution of the signal is the same whichever state obtains, so the signal carries no information and player 1's hunch is useless. Ball remarks that this is a rather good model of how retail stock traders operate.

![A 2x2 prior matrix: rows are the physical states θH and θE, columns are player 1's types tH and tE, with cells q/2, (1−q)/2, (1−q)/2 and q/2, row and column sums 1/2; on the right the same table at q=1 and q=1/2](/images/bayesian-games-types-en.svg)

*Figure: the prior records both how the world is and how the player thinks it is, in one table. At q=1 only the diagonal survives, which is what "knowing" means; at q=1/2 all four cells are equal and the signal carries no information.*

One assumption must be stated: **$P$ is common knowledge**. Player 1 knows his own type, the type space, and the joint distribution; player 2 knows the same. This is strong, but it is what makes the framework run — only a public prior lets you compute "given my type, what are the odds that others are of this or that type". Ball notes there are subtle mathematical questions here (how large the type space must be, what "knowing" means), belonging to epistemic game theory, which the course does not pursue.

A second technical assumption: **every type of every player has positive probability**. Not every cell — the middle cells of example one are zero. The requirement is $\sum_{\theta,t_{-i}}P(\theta,t_i,t_{-i})>0$ for each $t_i$. The reason is practical: Bayes' rule divides by $P(t_i)$, which must not be zero; and a type with probability zero never occurs, so it can simply be deleted from the type space.

## Strategies, beliefs, and Bayes' rule

A **strategy** in a Bayesian game is

$$
s_i:T_i\to A_i .
$$

Why is the domain only my own type? Because a strategy is a complete contingent plan and can only condition on what I observe. In poker I cannot write "if the opponent's hand is weaker than mine, bet heavily" — a magnificent strategy, but not executable, since I cannot see his hand. Likewise $s_i$ cannot depend on $\theta$ or on anyone else's type.

Ball acknowledges an interpretive awkwardness: a strategy is a plan fixed before you know your type. In the used-car example, "what I would do if I had been born liking red, and what I would do if I had been born disliking brown" is a strange hypothetical. His response: in reality each player has one type and takes one action; but **others do not know** which type you are, so for them to form a judgement about you, the theory must write down your action at every type.

**Beliefs**. Suppose I am player $i$ and I know my type $t_i$. I need a view on two things: the physical state $\theta$ and the other players' types $t_{-i}$. Bayes' rule gives

$$
\pi_i(\theta,t_{-i}\mid t_i)
=\frac{P(\theta,t_i,t_{-i})}{\displaystyle\sum_{\theta'\in\Theta}\ \sum_{t'_{-i}\in T_{-i}}P(\theta',t_i,t'_{-i})}.
$$

The numerator is the joint probability that the world is exactly this; the denominator is the marginal probability of my type. The formula turns the public prior $P$ into a private map. Plug example two in and the weights become visible: $\pi_1(\theta_H\mid t_H)=\frac{q/2}{q/2+(1-q)/2}=q$ — the prior $\tfrac12$ times the likelihood $q$, divided by the sum of that product over the two states — while $t_E$ gives $1-q$. Player 2 has a single type, and conditioning gives $\pi_2(t_H\mid t_0)=\frac{q/2+(1-q)/2}{1}=\tfrac12$ regardless of $q$, since the prior is even and the signal symmetric; when he takes an expectation he uses the four joint probabilities themselves, because $\theta$ and $t_1$ are correlated and $\mathbb{E}[\theta e_1]$ does not factor into a product of marginal expectations.

Why do I care about $\theta$? Because it enters my payoff directly — if the project is hard, effort may not be worth it. Why do I care about others' types? **Not because their mental states affect my payoff directly, but because their types affect their actions, and their actions affect my payoff.** That chain is the key to reading Bayesian games: I form beliefs about your type, then use the equilibrium strategy to translate your type into an action.

One more point deserves emphasis: $\pi_i$ is a **property of the game**, not part of the equilibrium. It is pinned down by $P$ alone and is independent of how anyone plays. What the equilibrium supplies is the other half — the map from types to actions, which lets me go from "your type" to "your action".

## Bayesian Nash equilibrium

**Definition**. A strategy profile $s^\ast=(s_1^\ast,\dots,s_n^\ast)$ is a **Bayesian Nash equilibrium** (BNE) if for every player $i$ and every type $t_i\in T_i$,

$$
s_i^\ast(t_i)\ \in\ \arg\max_{a_i\in A_i}\ 
\mathbb{E}\Big[u_i\big(a_i,\ s_{-i}^\ast(t_{-i}),\ \theta\big)\ \Big|\ t_i\Big],
$$

where the expectation is taken under the conditional belief $\pi_i(\cdot\mid t_i)$.

Read it term by term:

- The outer quantifiers range over $i$ and $t_i$. This is the main difference from Nash equilibrium: **every type must be optimal**, not merely optimal on average. A player with two types faces two separate optimality conditions.
- $a_i$ is the action I choose; it is my decision variable.
- $s_{-i}^\ast(t_{-i})$ is the opponents' action vector, randomised through their types. The notation is slightly misleading: it is not one function evaluated at a point but a collection of functions each applied to its own player's type, $(s_2^\ast(t_2),\dots,s_n^\ast(t_n))$.
- $\theta$ is also random, since I do not know it.
- The whole expectation is over $(\theta,t_{-i})$ under $\pi_i(\cdot\mid t_i)$.

Ball says the definition looks abstract but the intuition is the intuition of Nash: I believe others play $s^\ast$, and given that belief I do best; if everyone does so, beliefs are consistent.

What differs is the object of belief. About $\theta$ and others' types, my belief is **about the world**: nobody controls it and it need not be "correct" in any strategic sense — it is determined by $P$ and therefore correct by construction. About the map from others' types to actions, my belief is **about behaviour**, which is the choice of a rational decision maker. Equilibrium requires the two layers to mesh: I expect them to choose this way, and given that expectation they are indeed willing to.

There is a clean equivalence result at the end. Define the ex ante expected payoff of a profile,

$$
U_i(s_1,\dots,s_n)=\mathbb{E}_{P}\Big[u_i\big(s_1(t_1),\dots,s_n(t_n),\theta\big)\Big],
$$

with the expectation under the **unconditional** prior $P$, not conditional on $t_i$. This turns the Bayesian game into an ordinary strategic-form game in which each player's pure strategy is a function from types to actions. **Theorem**: $s^\ast$ is a BNE of the Bayesian game if and only if $s^\ast$ is a Nash equilibrium of this strategic-form game.

The intuition: if my plan goes wrong at some type, then viewed from the position of not yet knowing my type, the plan is not optimal — there is a positive-probability contingency on which it performs badly. Conversely, if it is optimal at every type, it is certainly optimal ex ante. Ball suggests verifying the algebra as a homework exercise.

## What this lecture establishes

1. Perfect and imperfect describe **information sets** (whether a player knows what has already happened); complete and incomplete describe the **starting point** (whether relevant information is symmetric at the outset). The two dimensions are orthogonal: poker is imperfect but complete, a used car sale is complete but imperfect.
2. Incomplete information means that at the start some players hold relevant information others lack. Most real economic problems are of this kind, which is why the field's centre of gravity moved towards economics after Harsanyi.
3. Harsanyi's transformation: treat private information as **a deal by nature**. Once the deal is made, the situation is a game of imperfect information and the existing tools apply.
4. Specifying what each player knows about $\theta$ is not enough; one must also specify what each knows about what the others know, with no natural end. The solution is to package the whole mental state into a **type** $t_i$, absorbing the hierarchy in one step.
5. A Bayesian game is $(\{A_i\},\Theta,\{u_i\},\{T_i\},P)$, where $P$ is a joint distribution on $\Theta\times T_1\times\cdots\times T_n$ and is common knowledge; every type of every player must have positive probability or Bayes' rule breaks down.
6. A strategy is $s_i:T_i\to A_i$, beliefs come from $P$ via Bayes' rule, and BNE requires optimality at **every type**. It is equivalent to Nash equilibrium of the strategic-form game whose pure strategies are maps from types to actions.

## Check your understanding

**1. Is poker a game of perfect or of complete information?**

Imperfect but complete. When betting you cannot see the opponent's cards, so some information sets are not singletons — imperfect. But before the deal, the rules, the objective, and the fact that everyone wants to win money are common knowledge, so information at the start is symmetric — complete. The two words describe different dimensions, so "imperfect but complete" is not a contradiction.

**2. Why must $P(\theta_H,t_E,t_0)$ equal zero in example one?**

Because player 1 is assumed to **know** $\theta$, and knowing means believing correctly: if the project really is hard, he cannot hold the belief that it is easy. If that cell had positive probability, player 1 would sometimes believe he faces an easy project when it is hard — that is guessing, not knowing. "Knowing" is thus encoded as a restriction on the support of the prior.

**3. What does $q=1/2$ mean in example two, and why are all four cells $1/4$?**

At $q=1/2$ the probability of receiving the "hard" signal is one half whichever state obtains. The signal's distribution does not depend on the state, so it carries no information. Substituting: each cell is $\tfrac12\cdot\tfrac12=\tfrac14$. Player 1's posterior then equals the prior and his hunch is worthless.

**4. Why is a strategy's domain only the player's own type?**

Because a strategy must be an executable contingent plan, conditioning only on what the player observes. "If the opponent's hand is weaker than mine, bet heavily" is excellent on paper and impossible in practice. For the same reason $s_i$ cannot depend on $\theta$ or on others' types. This is not a technical restriction but part of what "strategy" means.

**5. What is the core difference between BNE and ordinary Nash equilibrium?**

BNE requires optimality at **every type of every player**, not merely on average. A player with two types faces two optimality conditions, because in the two mental states he holds different beliefs and may choose differently. In the language of the equivalence theorem: BNE is Nash equilibrium of a strategic-form game whose pure strategies are functions from types to actions, so "optimal at every point of the strategy space" becomes "optimal at every type".

**6. Why is the belief $\pi_i$ not part of the equilibrium?**

Because $\pi_i$ is fully determined by the prior $P$ and Bayes' rule, independently of how anyone plays. It is a description of the game, not part of its solution. The equilibrium determines the map from types to actions; combining that map with $\pi_i$ yields "what I think you will do". Ball insists on the distinction: beliefs about the world are data, beliefs about behaviour are the equilibrium object.
