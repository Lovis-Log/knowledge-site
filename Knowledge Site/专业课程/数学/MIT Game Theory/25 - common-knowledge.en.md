---
slug: "25-common-knowledge"
title: "Common knowledge: why a fact everyone knows can still change everything"
summary: "State spaces and information partitions turn 'knowing' into a set-inclusion condition; iterating mutual knowledge gives common knowledge, and the hats riddle shows why 'at least one hat is red' matters only because it upgrades second-order mutual knowledge to common knowledge."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "common-knowledge"
  - "information-partition"
sources:
  - kind: "video"
    title: "Lecture 25: Common Knowledge"
    url: "https://www.youtube.com/watch?v=YHAY9UY9MgE"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The course has repeatedly said "assume the game is common knowledge", and never explained what that means. This lecture supplies the definition.

Common knowledge is an old problem across disciplines: philosophers thought about it, logicians and mathematicians thought about it, economists thought about it. Ball's route is to build a minimal formal frame first, then use a riddle to show the frame is not wordplay.

The frame has three ingredients. A **state space** $\Omega$, the set of all possible worlds. An **information partition** $K_i$ for each player, cutting $\Omega$ into cells; a player does not see the state, only which cell contains it. And an **event** $E\subseteq\Omega$, the set of states satisfying some property. With these three, "at state $\omega$, player $i$ knows $E$" becomes a statement of set inclusion: $K_i(\omega)\subseteq E$.

The beauty of the definition is that it delivers "what you know must be true" for free: if my cell lies entirely inside $E$, then the state I am in must lie in $E$. That property, $K_i(E)\subseteq E$, is proved in class because it is close to the foundation of the whole theory.

Then the step from one player to many. **Mutual knowledge** is "everyone knows". **Second-order mutual knowledge** is "everyone knows that everyone knows". Common knowledge is that chain extended forever:

$$
\mathrm{CK}(E)=K(E)\cap K^2(E)\cap K^3(E)\cap\cdots
$$

This looks like a mathematical game until the hats riddle arrives.

Three students each wear a red or white hat. Each sees the others' hats but not her own. In fact all three are red. The teacher announces publicly that **at least one hat is red** — something every student already knew, since each can see at least two red hats. Then she asks in turn: do you know the colour of your hat? The first says no, the second says no, the third says yes.

The counterintuitive part: without the announcement, all three would say no forever. A sentence everyone already knew changes the entire chain of reasoning.

Ball's explanation is that the sentence is not new information; it changes the **level** of information. At the true state (all red), "at least one hat is red" is second-order mutual knowledge but not third-order, hence not common knowledge. The announcement upgrades it, and the upgrade is concrete: it deletes the all-white state from everyone's consideration, splitting apart information cells that were previously glued together.

The technical content of the lecture is making that splitting precise.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | The course assumed common knowledge without ever defining it |
| 0:48 | The state space $\Omega$: keep only the dimensions that matter |
| 2:13 | The information partition $K_i$: states grouped into cells |
| 5:58 | An event $E$ is a subset of the state space |
| 7:56 | Definition: at $\omega$, player $i$ knows $E$ iff $K_i(\omega)\subseteq E$ |
| 9:37 | Testing it state by state on $E'=\lbrace 1,2,3,4\rbrace$ |
| 14:04 | "Knowing $E$" is itself an event, $K_i(E)$ |
| 16:12 | Theorem $K_i(E)\subseteq E$: knowledge implies truth |
| 19:12 | Two players, two partitions: $K_1(E)=\lbrace 1,2,3,4\rbrace$, $K_2(E)=\lbrace 1,3,5\rbrace$ |
| 25:07 | Mutual knowledge: the intersection over players |
| 29:03 | Common knowledge: the intersection over all orders |
| 30:31 | The hats riddle: all three hats red |
| 33:16 | The teacher announces at least one red hat, then asks in turn |
| 36:28 | The announcement works because it makes mutual knowledge common |
| 44:29 | $K(E_{\ge1})=E_{\ge2}$: two red hats are needed for everyone to know |
| 47:21 | $K^3(E_{\ge1})=\varnothing$: third-order knowledge is already empty |
| 50:47 | The announcement deletes 000, splits the cells, and the questions unfold |

## State spaces and information partitions

Pin the abstraction down with a die.

$$
\Omega=\lbrace 1,2,3,4,5,6\rbrace .
$$

A real world is far richer — a state could specify the position of every atom. That is useless. We keep only the dimensions relevant to the problem and project away the rest.

An **information partition** $K_i$ cuts $\Omega$ into disjoint cells covering every state. The $K$ is for knowledge. Suppose player $i$'s partition is

$$
\lbrace\lbrace 1,2\rbrace,\ \lbrace 3\rbrace,\ \lbrace 5\rbrace,\ \lbrace 4,6\rbrace\rbrace .
$$

The reading: the player does not see the die but sees a signal saying which cell the state is in. In the first cell he knows the roll is 1 or 2 but cannot tell which; in the second he knows it is exactly 3.

This is the same object as an information set in an extensive-form game, under a different name.

Why must it be a **partition** rather than an arbitrary grouping? Because a player must land in exactly one cell in every state: the cells have to cover the space (otherwise some states give the player no information at all), and they must not overlap (otherwise he belongs to two cells and cannot say what he knows). This requirement pays off later — once the announcement deletes a state, the old grouping no longer covers the space, so it must be redone. That is exactly what "the partition changed" means.

To make the notation manageable, let $K_i(\omega)$ be **the cell containing $\omega$**:

$$
K_i(4)=\lbrace 4,6\rbrace,\qquad K_i(3)=\lbrace 3\rbrace .
$$

## Defining knowledge

### Events

An **event** is a subset of the state space. Saying "I know the die is odd" is saying something about

$$
E=\lbrace 1,3,5\rbrace .
$$

That sentence is incomplete on its own, because whether I know depends on the state: if the roll is 6, I certainly do not know it is odd. So the definition must be indexed by the state.

### Knowing at a state

> At state $\omega$, player $i$ knows event $E$ if and only if $K_i(\omega)\subseteq E$.

Read it slowly. The player is not told the state, only the cell. So what he can assert with certainty is exactly what holds throughout the cell. If the whole cell lies inside $E$, then whatever the state is within the cell, $E$ holds, and he can say: I know $E$.

If the cell straddles the boundary of $E$, some states inside make $E$ true and some do not, and he cannot be sure.

Test it. Take

$$
E'=\lbrace 1,2,3,4\rbrace ,
$$

"the roll is at most 4". Go state by state:

- $\omega=1$: $K_i(1)=\lbrace 1,2\rbrace\subseteq E'$, knows.
- $\omega=2$: same, knows.
- $\omega=3$: $K_i(3)=\lbrace 3\rbrace\subseteq E'$, knows.
- $\omega=4$: $K_i(4)=\lbrace 4,6\rbrace\not\subseteq E'$, **does not know**.
- $\omega=5$: $K_i(5)=\lbrace 5\rbrace\not\subseteq E'$, does not know.
- $\omega=6$: $K_i(6)=\lbrace 4,6\rbrace\not\subseteq E'$, does not know.

State 4 is the instructive one. $E'$ **is true** at state 4 (4 belongs to $E'$), yet the player does not know it — his cell $\lbrace 4,6\rbrace$ also contains 6, which is outside $E'$. He can only think "maybe 4, maybe 6", so he cannot assert "at most 4".

This yields three possibilities, not four:

1. $E$ holds and is known (state 1).
2. $E$ holds and is not known (state 4).
3. $E$ fails and is not known (state 5).

The fourth — $E$ fails yet is known — is impossible. That is the theorem below.

### Knowing is itself an event

"Player $i$ knows $E$" depends on the state, so it is itself an event:

$$
K_i(E)=\lbrace \omega\in\Omega : K_i(\omega)\subseteq E\rbrace .
$$

Note that $K_i(E)$ is a set of **states**, not a set of cells. In the example,

$$
K_i(E')=\lbrace 1,2,3\rbrace ,
$$

because only those three states have their cell entirely inside $E'$.

### Knowledge implies truth

**Theorem**: $K_i(E)\subseteq E$.

The proof is two lines, and worth writing out because it shows how the language is used. Take any $\omega\in K_i(E)$.

- By definition, $K_i(\omega)\subseteq E$.
- But $\omega$ always belongs to its own cell: $\omega\in K_i(\omega)$.
- Hence $\omega\in E$.

Geometrically it is one sentence: if the cell I am in lies entirely inside the yellow box, then the point I am at lies inside the box too.

Ball mentions an alternative route: instead of taking partitions as primitive, take "which events are known" as an operator, impose axioms (one of which is exactly "knowledge implies truth"), and prove that any operator satisfying them can be generated by some partition. The two routes are equivalent; the lecture takes the partition route.

## From mutual to common knowledge

### Mutual knowledge

Switch to two players. Still six faces, but two different partitions:

$$
K_1=\lbrace\lbrace 1,2\rbrace,\lbrace 3,4\rbrace,\lbrace 5,6\rbrace\rbrace,
\qquad
K_2=\lbrace\lbrace 1,3,5\rbrace,\lbrace 2,4,6\rbrace\rbrace .
$$

Player 1 learns which adjacent pair the roll falls in; player 2 learns whether it is odd or even. Take

$$
E=\lbrace 1,2,3,4,5\rbrace ,
$$

"the roll is not 6".

- Player 1: $\lbrace 1,2\rbrace\subseteq E$, $\lbrace 3,4\rbrace\subseteq E$, $\lbrace 5,6\rbrace\not\subseteq E$, so $K_1(E)=\lbrace 1,2,3,4\rbrace$.
- Player 2: $\lbrace 1,3,5\rbrace\subseteq E$, $\lbrace 2,4,6\rbrace\not\subseteq E$, so $K_2(E)=\lbrace 1,3,5\rbrace$.

Their intersection is $\lbrace 1,3\rbrace$: in those two states both players know $E$. This is **mutual knowledge**:

$$
K(E)=\bigcap_{i=1}^{n}K_i(E).
$$

### One level deeper

Now a twistier question: does player 1 know that both players know $E$? That requires

$$
K_1\big(K_1(E)\cap K_2(E)\big)=K_1(\lbrace 1,3\rbrace).
$$

Player 1's cells are $\lbrace 1,2\rbrace$, $\lbrace 3,4\rbrace$, $\lbrace 5,6\rbrace$; none lies inside $\lbrace 1,3\rbrace$, so the answer is the **empty set**.

In words: there are states where both players know $E$; but there is **no** state where player 1 knows that both players know $E$.

This is where mutual knowledge turns out to be weaker than it sounds. Define second-order mutual knowledge as $K^2(E)=K(K(E))$, third-order as $K^3(E)$, and so on. Common knowledge is the intersection of the whole chain:

$$
\mathrm{CK}(E)=\bigcap_{n\ge1}K^{n}(E).
$$

Read aloud: everyone knows $E$; everyone knows that everyone knows $E$; everyone knows that everyone knows that everyone knows $E$; however long the chain runs.

Ball calls this a very demanding property, and notes that the course has relied on it implicitly throughout.

## The hats riddle

### Setup

Three students, numbered 1, 2, 3, each wearing a red or white hat. Each sees the other two hats but not her own. Everyone tells the truth, the questioning is public, and the others hear each answer.

The true state: **all three hats are red**.

The teacher first asks whether anyone knows her hat colour. All three say no — obviously, they can only see other people's hats.

Then the teacher announces: **at least one hat is red**.

Then she asks in turn. The first says no, the second says no, the third says yes.

The announcement must be **public**: everyone hears it, and everyone knows that everyone hears it. If the teacher whispered it privately to each student, each would merely receive a redundant fact, no common knowledge would form, and the later reasoning would never start. Publicity is a necessary condition for the mechanism.

Why is this surprising? Because what the teacher said was already known: with all hats red, anyone can see two red hats, so "at least one hat is red" is obvious to him. Yet without the announcement, the three would say no forever.

### What the announcement changes is the level

Ball lets the class guess, then gives the answer: the sentence is **not** new information, it changes the **level** of information.

At the all-red state, "at least one hat is red" is mutual knowledge, and even second-order mutual knowledge — everyone knows that everyone can see a red hat. But it is **not** third-order mutual knowledge. Common knowledge requires all orders, so it is not common knowledge either.

The announcement lifts it to common knowledge: now not only does everyone know, but everyone knows that everyone knows, and so on.

### The eight states, computed

Encode states in binary: white is 0, red is 1. A state is $\omega=(\omega_1,\omega_2,\omega_3)$, giving $2^3=8$ states.

Student $i$'s partition: she sees the other two hats and not her own, so states in the same cell differ only in coordinate $i$. For student 1:

$$
\lbrace 000,100\rbrace,\ \lbrace 001,101\rbrace,\ \lbrace 010,110\rbrace,\ \lbrace 011,111\rbrace .
$$

Define

$$
E_{\ge1}=\lbrace\omega : \omega_1+\omega_2+\omega_3\ge1\rbrace ,
$$

"at least one red hat" — every state except 000.

**First level**: who knows he is in $E_{\ge1}$? Anyone who sees at least one red hat. Student 1 sees $\omega_2,\omega_3$, so

$$
K_1(E_{\ge1})=\lbrace\omega:\omega_2+\omega_3\ge1\rbrace ,
$$

and symmetrically $K_2$ requires $\omega_1+\omega_3\ge1$ and $K_3$ requires $\omega_1+\omega_2\ge1$. Intersecting the three requires all three pairwise sums to be at least 1, which is equivalent to **at least two red hats**:

$$
K(E_{\ge1})=E_{\ge2}.
$$

In words: with only one red hat, its wearer sees two white hats and cannot be sure there is any red hat; with two or more, everyone sees at least one red hat.

**Second level**:

$$
K^2(E_{\ge1})=K(E_{\ge2})=E_3=\lbrace 111\rbrace .
$$

Check: if any hat were white, the person seeing that white hat would see only one red hat and could not be sure there are at least two. So only at all-red does everyone know that at least two are red.

**Third level**:

$$
K^3(E_{\ge1})=K(\lbrace 111\rbrace)=\varnothing .
$$

At all-red, student 1 sees two red hats but not her own, so she cannot be certain the state is 111. Nobody knows that all three are red.

The chain breaks there. So at the true state 111:

- $E_{\ge1}$ is mutual knowledge;
- it is second-order mutual knowledge;
- it is not third-order mutual knowledge, and therefore not common knowledge.

Ball says the riddle confuses people because our intuition for mutual knowledge is good, our intuition for second-order mutual knowledge is weak, and at third or fourth order it fails entirely — yet it **feels** like common knowledge. A small difference in level, a completely different conclusion.

![The eight states ordered from 000 to 111; E≥1 holds in 7 of them, K(E≥1)=E≥2 in 4, K²(E≥1) only at 111, and K³(E≥1) is empty, so each round of iteration removes a layer](/images/common-knowledge-iteration-en.svg)

*Figure: iterating knowledge squeezes seven states into four, then one, then none — common knowledge would need the chain to run forever, which is why it fails at the all-red state.*

### What the announcement actually did

Formally, the announcement does something very specific: it deletes 000 from everyone's consideration.

The consequence is not "everyone learned one more fact" but that **the partitions themselves change**. Student 1's cell $\lbrace 000,100\rbrace$ contains 000; once 000 is gone the cell splits into $\lbrace 100\rbrace$ alone, and 000 disappears. Any cell containing 000 splits the same way.

That is why an old sentence can change the reasoning: it adds no information about the states, it **tears the cells apart**.

The point matters more for game theory than for the riddle. When we say "the game is common knowledge", we exclude not only "someone does not know the payoffs" but also "someone does not know whether the others know", "someone does not know whether the others know that he knows", and so on. A break at any level can invalidate an equilibrium prediction, because equilibrium is itself built on an infinite chain of "I expect that you expect that I". The hats riddle is the shortest, most transparent demonstration of that chain.

### Walking through the questions

After the announcement, seven states remain.

**Student 1 says no.** If the state were 100 (student 1 red, the others white), student 1 would see two white hats and, using the announcement, deduce that her own is red — she would say yes. She says no, so 100 is ruled out.

**Student 2 says no.** Student 2's cells were $\lbrace 000,010\rbrace$, $\lbrace 100,110\rbrace$, $\lbrace 001,011\rbrace$, $\lbrace 101,111\rbrace$. The announcement removed 000 and student 1's answer removed 100, so $\lbrace 010\rbrace$ and $\lbrace 110\rbrace$ are now singletons. In either of those states student 2 would know her colour. She says no, so both are ruled out.

**Student 3 says yes.** The remaining states are 001, 011, 101, 111. Student 3's cells are $\lbrace 000,001\rbrace$, $\lbrace 010,011\rbrace$, $\lbrace 100,101\rbrace$, $\lbrace 110,111\rbrace$; each deletion removed one member, so all four are now singletons. Student 3 therefore knows not only her own colour but the entire state.

Here is the same argument told as a chain of empathy, which is how the lecture closes. Student 3 sees two red hats, so she considers two possibilities: 111 (she is red) or 110 (she is white).

Suppose it were 110. Then student 2 sees "student 1 red, student 3 white". Student 2 would reason: if the state were 100, student 1 would have seen two white hats and answered yes; she answered no, so it is not 100. Having ruled out 100, student 2 would be left with 110 alone and would answer yes. But student 2 answered no — contradiction.

So it is not 110; it must be 111. **My hat is red.**

Every link in that chain uses "what the others think that I think", which is exactly higher-order mutual knowledge at work. The announcement supplies no fact; it supplies the starting point of the chain.

Ball adds a technical note at the end: if the questioning continued, the answers could cycle, depending on the state. But one thing cannot happen — **more information never makes you forget something you already knew**. So any cycling must concern judgments about what others know, never judgments about one's own hat colour.

## What this lecture establishes

1. Common knowledge can be formalized from three primitives: a state space $\Omega$, an information partition $K_i$ per player, and events $E\subseteq\Omega$.
2. Knowing $E$ at $\omega$ means $K_i(\omega)\subseteq E$. This immediately yields $K_i(E)\subseteq E$: what is known is true.
3. "Knowing $E$" is itself an event, so knowledge nests. Mutual knowledge is $\bigcap_i K_i(E)$; common knowledge is the intersection over all orders.
4. Mutual knowledge is not common knowledge. In the die example both players know $E$, yet player 1 does not know that both know, and the relevant set is empty.
5. In the hats riddle, "at least one hat is red" is second-order but not third-order mutual knowledge at the all-red state, hence not common knowledge. The announcement upgrades it.
6. The mechanism is deletion, not addition: removing 000 splits every cell that contained it, and once the cells change, the higher-order reasoning changes with them.

## Check your understanding

**1. Why can "I know $E$" never occur when $E$ is false?**

Because knowledge means "my cell lies entirely inside $E$", and the state I am in necessarily lies in my cell. Squeeze the two together and my state is inside $E$, so $E$ holds. This is not an extra assumption but a consequence of the definition — which is precisely why the language models **knowledge** rather than **belief**: a belief can be false, knowledge cannot.

**2. In the die example, if $E=\lbrace 2,4,6\rbrace$ (even), what is $K_i(E)$?**

The partition is $\lbrace 1,2\rbrace,\lbrace 3\rbrace,\lbrace 5\rbrace,\lbrace 4,6\rbrace$. Check each cell: $\lbrace 1,2\rbrace$ contains 1, so not inside $E$; $\lbrace 3\rbrace$ is not inside; $\lbrace 5\rbrace$ is not inside; $\lbrace 4,6\rbrace\subseteq E$. So $K_i(E)=\lbrace 4,6\rbrace$. Intuition: only in that cell is the player certain the roll is even, because both states in it are even. In $\lbrace 1,2\rbrace$ he thinks "maybe 1, maybe 2" and cannot assert it.

**3. In the hats riddle, why is $K(E_{\ge1})=E_{\ge2}$ rather than $E_{\ge1}$?**

Because knowledge requires the whole cell to lie inside the event, and student $i$'s cells always come in pairs (her own colour varies). With only one red hat, its wearer sees two white hats, and her cell contains both "I am red" and "I am white" — straddling the boundary of $E_{\ge1}$ — so she is unsure. Only with at least two red hats does everyone see at least one red hat, making each cell lie inside $E_{\ge1}$. One extra red hat is exactly what knowledge requires.

**4. What if the teacher had announced "at least two hats are red"?**

That would be higher-order information already. At the true state 111, "at least two red hats" is itself common knowledge — everyone sees two red hats, and everyone knows that everyone does. Announcing it changes no cell, so it changes no answer. The contrast is the point: announcing "at least one" works precisely because it is **not** common knowledge at 111. An announcement has force only when it converts non-common knowledge into common knowledge.

**5. Why is "deleting 000" the same as "changing the partition"?**

Because a partition must cover the whole space with disjoint cells. Once 000 is deleted, any cell that contained it retains a single state, which becomes a singleton cell, while the original two-point cell no longer exists. Strictly speaking, then, it is not that the same partition sees more clearly — **the partition itself is replaced**. That is also why each later question can cut further: every question deletes states, and every deletion refines the partition.

**6. Does the riddle still work with only two students?**

No. With two students and both hats red, the teacher announces at least one red hat and asks the first: she sees one red hat, cannot judge her own, says no. The second sees one red hat and knows the first said no — but the first would say no in every state (whether her own hat is red or white, she always sees the second student's red hat), so the second learns nothing and also says no. The chain needs at least three people, because only at the third level does "someone would have said yes" become a discriminating signal.
