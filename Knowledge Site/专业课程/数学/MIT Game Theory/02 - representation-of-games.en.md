---
slug: "02-representation-of-games"
title: "Two Ways to Write Down a Game: Extensive and Strategic Form"
summary: "The extensive form draws a game as a decision tree recording players, actions, payoffs, and who can see what; the strategic form compresses it to one plan per player. The bridge between them is the strategy — the most important definition in the course."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "extensive-form"
  - "strategy"
sources:
  - kind: "video"
    title: "Lecture 2: Representation of Games"
    url: "https://www.youtube.com/watch?v=JAib42oAiKE"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture removed interaction and studied a single decision maker. This one puts interaction back and asks how to write such a problem down.

Ball offers two representations, and they are not rivals but a **long version and a short version**:

1. **Extensive form**: draw the game as a decision tree, recording who moves when, what they may do, what they get, and — crucially — **who can see whose move**.
2. **Strategic form**: compress the tree into a table. Each player picks one strategy; payoffs are determined by the whole profile.

The bridge is the **strategy**. Ball calls it the single most important definition in the course, and says most lost points come from it: **a strategy is a complete contingent plan, not an action**.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Replaying the beauty contest: average 18, winning guess 12 |
| 2:04 | Reviewing the notation $Z$, $u$, $U$ |
| 4:31 | How extensive and strategic form divide the work |
| 6:31 | The investment game: one strategic player plus Nature |
| 9:00 | Why preferences must be written down: consequences versus payoffs |
| 10:30 | The BoS game: conflict and coordination together |
| 15:08 | Moving first *and being seen* confers the power to select |
| 16:21 | A dotted line marks an unobserved move |
| 17:40 | Rooted trees: a unique path back to the root |
| 19:29 | PAPI: players, actions, payoffs, information |
| 23:05 | Nodes are histories; terminal nodes are consequences |
| 26:37 | Actions label edges, and the labels are not arbitrary |
| 27:56 | One payoff function per player, $u_i: Z \to \mathbb{R}$ |
| 30:05 | Information sets: the player knows the set, not the node |
| 38:30 | The two restrictions on information sets |
| 41:28 | Three ways Nature differs from a strategic player |
| 44:47 | A strategy is a complete contingent plan |
| 50:21 | The three components of a strategic form game |
| 57:37 | A strategy profile induces a lottery over consequences |
| 1:00:00 | A coin flip decides who moves first |
| 1:05:00 | Counting strategies: $2^3=8$ and $2^2=4$ |
| 1:09:01 | Walking the tree to read off the induced lottery |

## Reviewing the previous lecture

Three symbols must be solid:

- $Z$: the outcome set, each $z$ a complete consequence.
- $u: Z \to \mathbb{R}$: the VNM utility, a real number for each **consequence**.
- $U: \Delta Z \to \mathbb{R}$: expected utility, a real number for each **lottery**, $U(p)=\sum_i p_i u(z_i)$.

Ball also repairs a notational slip from last time: $p$ was used both for a probability and for a vector. The convention is that **the bold $p$ is the vector and the small $p_i$ are numbers**. The course uses this throughout.

## Two examples

### The investment game: a single strategic player

Player 1 chooses between a safe and a risky investment. The safe one pays 2 dollars for certain. The risky one hands the outcome to **Nature**: 3 dollars with probability one half, 1 dollar with probability one half.

Nature is a special "player": it does not strategize, it just draws from a fixed distribution.

Having drawn the tree, Ball immediately points out that it is **incomplete**. What is missing? The room answers at once: preferences.

If the model assumed people maximise expected money, the two options would tie at 2 dollars. But the previous lecture established that people are risk averse or risk loving, so utilities must be written down. Take

$$
u(2)=1.5,\qquad u(3)=2,\qquad u(1)=0.9 .
$$

Then

$$
U(\text{safe})=1.5,\qquad U(\text{risky})=\tfrac12(2)+\tfrac12(0.9)=1.45 .
$$

**Identical expected money, different expected utility**, and the safe investment wins. This is the risk aversion of the previous lecture doing visible work, and it shows why dollars can never stand in for utility.

Keep two words apart: a **consequence** is measured in dollars, a **payoff** in utils. Ball stresses that in this course "payoff" always means utility unless "monetary" is said explicitly.

### The BoS game: conflict and coordination

Two friends choose between a Celtics game and a Red Sox game. Going together is fun; going separately is miserable. But one prefers basketball and the other prefers baseball.

| | Player 2 picks C | Player 2 picks R |
| --- | --- | --- |
| Player 1 picks C | 4, 3 | 0, 0 |
| Player 1 picks R | 0, 0 | 3, 4 |

The convention is that **player 1's payoff comes first**.

The game is canonical because it carries two tensions at once: **conflict** (the two prefer different venues) and **coordination** (both want to be together). Ball shortens the historical name "Battle of the Sexes" to BoS and jokes that it can stand for Boston.

The pointed question is: which player would you rather be? The answer given is player 1, because player 1 moves first — and Ball immediately sharpens it. What matters is not moving first but **moving first and being observed**. Player 2, seeing player 1 head to the Celtics game, follows; so the first mover gains the **power to select the outcome**.

And if player 2 cannot see? Then a dotted line joins the two nodes, declaring them one information set. The tree still has player 1 moving first, but the effect is that of **simultaneous play**.

![Two information structures for the BoS game: on the left player 2 observes player 1's choice, so the first mover can lock in the outcome; on the right a dotted line merges player 2's two decision nodes into one information set, making the game effectively simultaneous](/images/bos-information-sets-en.svg)

*Figure: one tree, one dotted line, and the nature of the game changes. On the left the first mover holds the initiative; on the right the two are effectively choosing at once.*

## The formal definition of an extensive form game

### Rooted trees

The formal vehicle is a **rooted tree**. There is one test: from any node, the path back to the root is **unique**. Equivalently, there are no cycles. If two different paths reached the same node, the question "which history does this node represent?" would have no answer — and recording history is exactly the point.

The root is the start of time; play moves outward toward the leaves.

### PAPI: four ingredients

Ball uses the acronym **PAPI: Players, Actions, Payoffs, Information**.

**Players.** Labelled $i=1,\dots,n$, all strategic; when there is uncertainty, Nature is added. The set of all nodes is $H$ — chosen because it suggests *history*, since **every node corresponds to exactly one history of play**. Terminal nodes form a subset $Z \subset H$; the rest, $H \setminus Z$, are decision nodes.

Using $Z$ for terminal nodes is no accident: it plays exactly the role the outcome set $Z$ played last week.

**Actions.** Actions label the **edges**, not the nodes. Ball warns readers with a maths background not to treat those labels as arbitrary decoration; later in the course they turn out to matter a great deal.

**Payoffs.** One utility function per player,

$$
u_i: Z \to \mathbb{R},\qquad i=1,\dots,n .
$$

On the tree the numbers are grouped by consequence, written as a tuple $(u_1(z), u_2(z))$; in the definition they are grouped by player as $n$ functions. Same numbers, two orderings.

**Information.** This is the delicate one.

### Information sets

Partition player $i$'s decision nodes into groups; each group is an **information set**. Partition means every node lies in exactly one group — none in two, none in none.

The interpretation: when the player moves, they **know which information set they are in but not which node inside it**.

- A **singleton** information set contains one node, so the player knows exactly where they are, which is the same as having observed all prior moves.
- A multi-node information set means the player cannot tell the nodes apart. On the page you can circle them together or join them with a dotted line.

How is simultaneous play represented? Ball is firm: **every node belongs to exactly one player**, and simultaneity is always expressed through information sets — never by hanging two players on one node.

Two restrictions are required, or the model contradicts itself:

1. **Every node in an information set must have the same feasible actions.** The reasoning is direct: a player knows what they can do. If one node offered an extra option "go home", then the moment "go home" is unavailable the player would know they are not at that node, and the information set would split.
2. **The root must sit in a singleton information set.** If even the starting point is uncertain, there must be an earlier unobserved move, and it should be modelled explicitly — usually by handing that move to Nature.

### Three ways Nature differs

| | Strategic player | Nature |
| --- | --- | --- |
| Edge labels | Actions | Probabilities |
| Payoffs | Has $u_i$ | None |
| Information sets | Has them | None (all singletons) |
| Drawn as | Filled circle | Hollow circle |

Nature does not strategize; it spins a wheel and draws an edge. Those probabilities are part of the game and are given; whether a strategic player goes to the Celtics game with probability 0.2 is precisely what we are trying to explain, so it cannot be assumed.

Ball adds that Nature is not only about coin flips. You set the price at your gas station and then a war breaks out and oil moves; you set a price and then your rival is hit with an antitrust case. Events you cannot anticipate and can only form beliefs about are modelled as moves of Nature.

## Strategy: the most important definition

### A complete contingent plan

The intuitive version: **before the game begins, you sit down and work out what you would do in every situation that might arise**. That plan is your strategy.

- **Complete**: every place you might be called on to move must be covered.
- **Contingent**: the plan may depend on what you will have observed. "Go to the Celtics game if my friend goes, Red Sox if he goes to the Red Sox" is a strategy; "I'm going to the Celtics game" is not.

Ball says students ask in office hours whether a particular branch really has to be specified, and the answer has never once been no. **When in doubt, specify it** — writing it out makes life easier later.

### The formal definition

Formally, a strategy assigns an action at **every information set**.

So the first move with any extensive form game is to count: **how many information sets does this player have?** That count is the dimension of the strategy vector, and each slot is filled with an action feasible at that information set. The total number of strategies is the product of the action counts across information sets.

Feasibility can be attached to an information set rather than a node only because of the first restriction above — all nodes in a set share the same feasible actions.

![Converting extensive form to strategic form: count each player's information sets, write the strategy sets accordingly, then let each profile walk the tree to induce a lottery over consequences whose expectation gives the payoff](/images/extensive-to-strategic-en.svg)

*Figure: the three steps of the conversion. Counting information sets is the easy part; the hard part is that a profile is not a consequence — it must first be resolved into a lottery before an expectation can be taken.*

## The strategic form

The definition is short:

- Players: as before.
- Strategy sets: $S_i$ is the set of all strategies for player $i$, with $s_i \in S_i$ one of them.
- Strategy profiles: $S = S_1 \times S_2 \times \cdots \times S_n$, written $s=(s_1,\dots,s_n)$.
- Payoffs: $u_i: S \to \mathbb{R}$.

That last line hides a common mistake Ball flags explicitly: **do not write $u_i: S_i \to \mathbb{R}$**. If a player's payoff depended only on their own strategy there would be no need for game theory at all — it would be an individual decision problem. Writing $S$ rather than $S_i$ is exactly how the interdependence gets encoded.

## Converting extensive to strategic form

### Where the difficulty lies

Players carry over unchanged. The two hard steps are writing the strategy sets and computing $u_i: S \to \mathbb{R}$.

The second is hard because the tree defines payoffs on **terminal nodes**, while the strategic form needs payoffs on **strategy profiles**. Those are not the same object.

### The bridge: an induced lottery

The key sentence: **a strategy profile induces a lottery over consequences**, written $z(s)$.

Once that lottery is in hand, each player's expected utility can be computed, and that is the payoff in the strategic form.

Concretely: highlight the edge each player would take at each of their information sets, then walk the tree from the root. At a Nature node, branch by probability; at a strategic player's node, follow the plan. Reaching the leaves produces a probability distribution.

### An example

Ball builds a richer version: Nature flips a coin. On heads, player 1 moves first and is **not observed**. On tails, player 2 moves first and **is** observed.

Counting information sets:

- Player 1 has three decision nodes, none connected, so three information sets, two choices each: $2^3=8$ strategies.
- Player 2 has two information sets (one containing two nodes), two choices each: $2^2=4$ strategies.

That gives $8\times4=32$ profiles, two numbers each, so **64 numbers** — in a game with two players and two actions.

This is why chess cannot be analysed this way: the strategy count explodes combinatorially, dwarfing the number of atoms in the universe. **It is also why we need equilibrium concepts instead of writing out the whole table.**

### A detail that is easy to miss

When filling in player 2's strategy at an information set containing two nodes, the same action must be entered at **both** nodes. She cannot tell them apart, so she plays the same plan at either. Beginners routinely forget this and end up writing "an action for each node", which is no longer a strategy.

## What this lecture establishes

1. **Extensive form** is the long version: a rooted tree plus PAPI. It turns "who can see what" — usually glossed over in speech — into tree structure.
2. **Information sets** are the only tool for observability. Singleton means observed; multi-node means not; a dotted line is just shorthand.
3. **A strategy is not an action but a complete contingent plan**, assigning an action at every information set. Count information sets before counting strategies.
4. **Strategic form** is the short version: players, strategy sets, payoffs $u_i: S \to \mathbb{R}$. Payoffs are defined on **profiles**, not on a player's own strategy.
5. **The bridge is the induced lottery**: profile → lottery over consequences → expected utility. A profile is not itself a consequence.
6. The number of strategies grows exponentially in information sets, so real games can never be listed in full — which is precisely why equilibrium concepts are needed.

## Check your understanding

**1. Why does an extensive form tree forbid two paths reaching the same node?**

Because a node means **history**. If two different action sequences arrived at one node, then standing there you could not say how you got there, and everything downstream — the contingent structure of strategies, and observability in particular — depends on that history. Banning cycles and multiple paths is what makes "node = unique history" true.

**2. A player has two information sets, the first with three available actions and the second with two. How many strategies does he have?**

$3\times2=6$. A strategy specifies an action at **every** information set, so the total is the product across information sets. Note this depends on information sets and action counts, not on how many nodes the tree has.

**3. Suppose one information set contains two nodes, and at one of them the player can choose C, R, or H while at the other only C or R. What is wrong?**

It violates the requirement that all nodes in an information set share the same feasible actions. The player knows what they can do: as soon as "go home" is unavailable, they know they are not at that node, so the set is really two sets. The fix is to separate them into different information sets or to equalise the action sets.

**4. Why is the strategic-form payoff $u_i: S \to \mathbb{R}$ rather than $u_i: S_i \to \mathbb{R}$?**

Because the essence of a game is **strategic interdependence**: my payoff depends not only on what I do but on what everyone else does. Writing $S_i$ would assert that others' behaviour is irrelevant to my payoff, collapsing the problem into individual decision making and making game theory unnecessary. Writing $S$, the profile, is how the interdependence is encoded.

**5. What are the three differences between Nature and a strategic player, and why does Nature need no information sets?**

First, Nature's edges carry **probabilities** rather than actions; second, Nature has **no payoffs**; third, Nature has **no information sets** (equivalently, all singletons). The reason is that Nature does not strategize — it draws mechanically from a given distribution, so questions about what it knows or believes never arise. The probabilities are part of the specification, not something to be explained.

**6. In the coin-flip example player 1 has 8 strategies. Why not 4?**

Because player 1 has three decision nodes that are mutually unconnected, hence three information sets (two of them lie on the "tails" branch and are independent). A strategy specifies an action at each, giving $2\times2\times2=8$. If those two nodes were merged into a single information set — that is, if player 1 could not tell which situation he was in — the count would drop to 4. **Information structure determines strategy count**, which is why a mis-drawn information set poisons everything downstream.

**7. In the investment game both options have expected money of 2 dollars. Why does the model still pick the safe one?**

Because the criterion is **expected utility**, not expected money. With $u(2)=1.5$, $u(3)=2$, $u(1)=0.9$, the safe option yields 1.5 while the risky one yields $\tfrac12(2)+\tfrac12(0.9)=1.45$. The utility function is concave here, which is exactly risk aversion: for equal expected value, less variance is better. Make $u$ linear, say $u(x)=x$, and the two tie.
