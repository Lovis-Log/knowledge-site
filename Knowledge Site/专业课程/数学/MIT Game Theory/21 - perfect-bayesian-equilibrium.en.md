---
slug: "21-perfect-bayesian-equilibrium"
title: "Perfect Bayesian Equilibrium: Putting Beliefs into the Definition of Equilibrium"
summary: "A two-item VCG example closes the auction block, then a small change to the entry game shows subgame perfection losing its bite under incomplete information. The application game reveals that credibility depends on beliefs at unreached nodes, so equilibrium must be upgraded from a strategy profile to an assessment — strategies plus a belief system — satisfying sequential rationality and belief consistency."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "perfect-bayesian-equilibrium"
  - "credible-threats"
sources:
  - kind: "video"
    title: "Lecture 21: Perfect Bayesian Equilibrium"
    url: "https://www.youtube.com/watch?v=yDNNcall_ho"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

This is the fourth and final box of the course. Ball opens by drawing the whole subject as a 2×2 table: static versus dynamic, complete versus incomplete information. Three boxes are already filled — Nash equilibrium for static complete information, subgame perfect Nash for dynamic complete information, Bayes-Nash for static incomplete information. The remaining cell is **dynamic incomplete information**, and the concept that fills it is perfect Bayesian equilibrium.

Why can't the existing tools simply be reused? Two reasons, one for each axis.

First, Bayes-Nash handles "I know more than you", but it does nothing about incredible threats. Second, subgame perfection handles incredible threats, but its weapon is "every subgame must itself be a Nash equilibrium" — and in incomplete-information games many games **have no proper subgames at all**, because a single information set spans several nodes, so no legal subgame can be cut out. The weapon stops working.

Ball demonstrates the failure with a tiny change: in the entry game, let the potential entrant have two ways of entering (two product lines, say), and let the incumbent be unable to tell which. The two nodes fall into one information set, so the whole game has no proper subgame, and all three Nash equilibria pass the subgame-perfect test — including the obviously incredible "enter and I will fight".

The way out is to write **beliefs** into the definition. An equilibrium used to be a strategy profile; now it must be a strategy profile plus a belief system, an object called an **assessment**. An assessment is a perfect Bayesian equilibrium if it satisfies two conditions: **sequential rationality** (at every information set, given beliefs and others' strategies, the prescribed action is optimal) and **belief consistency** (at information sets reached with positive probability, beliefs must follow Bayes' rule).

The first half also closes the auction block with a VCG example on two items, which illustrates charging the externality outside the advertising setting and yields a useful observation: VCG payments are always nonnegative, because the actual allocation can never beat the allocation optimised for the others.

## Timeline

| Time | Topic |
| --- | --- |
| 0:26 | A VCG example with two items, A and B |
| 4:54 | Efficient allocation: A to bidder 1, B to bidder 2, total 11 |
| 6:18 | Payments as externalities: $t_1=7-6$, $t_2=8-5$ |
| 13:00 | Four boxes: static/dynamic against complete/incomplete information |
| 16:39 | Incredible threats: reviewing the entry game |
| 23:18 | A small change: two entry methods in one information set |
| 28:03 | Why it fails: no proper subgame, so no bite |
| 29:55 | The application game: what an optional essay actually screens |
| 31:52 | Nature draws the type: passionate $P$ or not $N$, each with probability $1/2$ |
| 35:03 | The school sees only whether an essay arrived, giving two information sets |
| 41:19 | Candidate pooling equilibrium: both types submit |
| 47:38 | With no essay the belief is $0/0$, hence undefined |
| 51:58 | Conclusion: beliefs must be part of the equilibrium |
| 53:30 | Defining an assessment: strategy profile plus belief system |
| 59:14 | Sequential rationality: optimal at every information set |
| 1:03:18 | Rejection must be credible, which requires $p\le 2/5$ |
| 1:07:05 | Separating equilibrium: the passionate submit, the rest do not |
| 1:14:30 | Existence of the separating equilibrium requires $1\le c\le 2$ |

## A VCG example with two items

### Reports

The auctions so far concerned one item, or several but ranked (ad slots). Here we return to the plainest case of two distinct objects and handle it with VCG.

Two items, A and B, and two bidders. What each bidder reports is not a single number but **three valuations**: A alone, B alone, and both together. Why can't the third be the sum of the first two? Ball gives examples in both directions: a left shoe and a right shoe are worth far more together than the sum of the parts (complements); two apples are worth less than twice one apple (substitutes). So bundle value has to be reported separately.

Suppose the reports are:

| | A alone | B alone | Both |
| --- | --- | --- | --- |
| Bidder 1 | 5 | 3 | 8 |
| Bidder 2 | 2 | 6 | 7 |

Bidder 1's bundle value happens to equal the sum of the parts ($5+3=8$); bidder 2's is below it ($2+6=8>7$) — for her B may be an upgraded version of A, so having both is barely better than having B.

### Efficient allocation

VCG allocates to maximise the sum of reported values. Four possibilities:

- A to 1, B to 2: $5+6=11$.
- A to 2, B to 1: $2+3=5$.
- Both to 1: $8$.
- Both to 2: $7$.

The maximum is 11, so A goes to bidder 1 and B to bidder 2.

### Payments

Payment is the externality: how well off the others would be without me, minus how well off they actually are with me.

**Bidder 1's payment.** Without bidder 1, only bidder 2 remains, and the best is to give her both items, worth 7. Under the actual allocation bidder 2 gets only B, worth 6. The difference is

$$
t_1=7-6=1 .
$$

Read it as: bidder 1's presence pushes bidder 2 from "both items" down to "B only", a loss of 1, and that is what bidder 1 pays.

**Bidder 2's payment.** Without bidder 2, bidder 1 gets both items, worth 8. In fact bidder 1 gets only A, worth 5. The difference is

$$
t_2=8-5=3 .
$$

Bidder 2 imposes the larger externality and therefore pays more.

One detail is worth noticing: the payment has nothing to do with how much value I receive, only with how much loss I cause. Bidder 1 receives an item worth 5 and pays 1; bidder 2 receives one worth 6 and pays 3.

### Why payments are never negative

A student asks whether a payment could be negative — whether the mechanism might pay you.

It cannot. The externality is defined as "what the others get under the allocation optimised for them" minus "what they get under the actual allocation", and the actual allocation can never leave them better off than the one optimised for them — otherwise the word "optimal" would be violated. The difference is therefore always $\ge 0$.

Ball notes that "externality" here is narrower than in general economics, where externalities can be positive or negative (my action might benefit you). Here only the "I take the resource and push you down" side is counted, so the sign is one-sided.

One more point: computing the externality requires knowing others' true valuations, which are unobservable. VCG's convention is the usual one — compute **from reports**, i.e. assume truthful reporting. That is exactly why proving "truthful reporting is weakly dominant" matters: if the assumption failed, the numbers the mechanism computes would mean nothing.

## Four boxes: why a new concept is needed

### The map

Ball arranges the course as a table:

| | Complete information | Incomplete information |
| --- | --- | --- |
| Static | Nash equilibrium | Bayes-Nash equilibrium |
| Dynamic | Subgame perfect Nash equilibrium | Perfect Bayesian equilibrium |

Three boxes have been covered. The fourth is hard because it inherits two problems at once: players hold different information (from the right column) and moves are sequential (from the bottom row). So it must handle both beliefs and credibility.

Here Ball offers a rare warning: the first three concepts enjoy broad agreement; the fourth does not. A great deal of recent work argues about what the right equilibrium notion is for dynamic incomplete information, a dozen definitions could fill that cell, each more demanding than the last, and the argument continues. This course presents the most classical one and stays on well-trodden ground.

### Review: incredible threats

Return to the complete-information entry game.

Firm 1 is a potential entrant choosing to enter ($E$) or not ($N$); firm 2 is the incumbent, and if entry occurs it chooses to accommodate ($A$) or fight ($F$). Payoffs: no entry $(0,5)$; entry with accommodation $(1,1)$; entry with fighting $(-10,-10)$.

In strategic form:

| | 2 plays $A$ | 2 plays $F$ |
| --- | --- | --- |
| 1 plays $N$ | 0, 5 | 0, 5 |
| 1 plays $E$ | 1, 1 | −10, −10 |

Underlining best responses: given $A$, firm 1 wants to enter; given $F$, it does not; given $N$, firm 2 is indifferent; given $E$, firm 2 wants to accommodate. Two Nash equilibria result: $EA$ and $NF$.

The trouble with $NF$ is that the threat is not credible: if entry actually happens, firm 2 faces "fight for −10 or accommodate for 1" and will certainly accommodate. "Enter and I will fight" is an empty sentence.

Subgame perfection formalises exactly this objection: in the subgame starting after entry, $F$ is not a Nash equilibrium (strictly worse than $A$ for firm 2), so $NF$ is eliminated and only $EA$ survives.

Ball clarifies a point that often confuses: a subgame may have only one player moving. The "equilibrium" of a one-player game simply means that player is doing the best she can, so the concept does not degenerate.

### A small change that disarms the weapon

Now make a small modification: firm 1 has two ways of entering, $E_1$ and $E_2$ (two slightly different product lines, or two different advertising agencies). Payoffs are identical — accommodation gives $(1,1)$ either way, fighting gives $(-10,-10)$ either way.

The crucial assumption: **firm 2 cannot tell which route was taken**. It sees only that entry occurred. So the two nodes sit in one information set.

Firm 2 therefore has a single decision and cannot accommodate one route while fighting the other — it cannot distinguish them. Strategy spaces: firm 1 chooses from $\{N,E_1,E_2\}$, firm 2 from $\{A,F\}$.

There are now three Nash equilibria:

- $E_1A$: firm 2 accommodates, firm 1 enters (by either route).
- $E_2A$: the same.
- $NF$: firm 2 fights, firm 1 stays out.

$NF$ still feels incredible for exactly the same reason as before. But ask: is $NF$ subgame perfect?

To answer, find the subgames. A subgame must start at a **single node** and must not cut through any information set. Firm 2's two nodes now share one information set, so starting at either would split it — illegal; starting at both is illegal too, since a subgame starts at one node. Therefore **the only subgame is the whole game**.

And subgame perfection only requires "a Nash equilibrium in every subgame". With no proper subgames, that requirement collapses to "the whole thing is a Nash equilibrium" — which says nothing extra. All three equilibria pass.

Ball's conclusion is blunt: subgame perfection has no teeth here. It depends on being able to cut out subgames, and incomplete information destroys exactly that precondition.

## The application game: what an optional essay screens

### Setup

This is the lecture's central example, and Ball notes it matches many people's experience of applying for internships, jobs or schools: some materials are marked optional, and everyone suspects that skipping them means rejection.

An applicant and a school. The applicant has private information about **how enthusiastic** she is, with two types:

- $t_P$: genuinely wants to go, excited about what the school does.
- $t_N$: wants to go, but less excited.

The school's preference is simple: **it wants to admit $t_P$ and not $t_N$**.

Timing: nature draws the type, $P$ and $N$ with probability $1/2$ each; the applicant observes her type and decides whether to submit the optional essay; the school observes "essay" or "no essay" and decides to admit ($A$) or reject ($R$).

Payoffs: the school gets 3 from admitting a passionate student, $-2$ from admitting an unenthusiastic one, and 0 from rejecting. The student, if admitted, gets 2 when passionate and 1 when not; 0 if rejected; and pays a cost $c$ for the essay regardless of the outcome.

So the terminal payoffs (school, student) are:

- passionate, essay, admit: $(3,\ 2-c)$
- passionate, essay, reject: $(0,\ -c)$
- passionate, no essay, admit: $(3,\ 2)$
- passionate, no essay, reject: $(0,\ 0)$
- unenthusiastic, essay, admit: $(-2,\ 1-c)$
- unenthusiastic, essay, reject: $(0,\ -c)$
- unenthusiastic, no essay, admit: $(-2,\ 1)$
- unenthusiastic, no essay, reject: $(0,\ 0)$

Note that "essay submitted but rejected" still pays $c$ — a student in the room pointed this out and Ball corrected the board on the spot. It is easy to miss: the cost is sunk and is not refunded with the outcome.

### Information sets

The school cannot see the type, only whether an essay arrived. So it has **two** information sets:

- essay received: two nodes (passionate, unenthusiastic) in one information set;
- no essay: the same two nodes.

This is the hinge of the whole problem. The school's strategy can only say "if essay then this, if no essay then that" — it cannot treat the types differently.

### First, a pooling equilibrium: both types submit

Suppose $c<1$, so the cost of the essay is below the extra 1 that even an unenthusiastic student gains from being admitted. Then even the unenthusiastic are willing to write.

Candidate: both types submit; the school admits on an essay and rejects otherwise.

Check beliefs first. On seeing an essay, Bayes' rule gives

$$
\Pr(t_P\mid\text{essay})
=\frac{\Pr(t_P\cap\text{essay})}{\Pr(\text{essay})}
=\frac{1/2}{1/2+1/2}=\frac12 .
$$

Because both types submit, the essay event screens nothing and the posterior equals the prior.

The school's expected payoff: admitting gives $\tfrac12(3)+\tfrac12(-2)=0.5>0$, rejecting gives 0. So admitting is optimal. ✓

Now the students. Given "essay means admit, no essay means reject", a passionate student gets $2-c$ from submitting and 0 from not, so she submits whenever $c<2$; an unenthusiastic student gets $1-c$ versus 0, so she submits whenever $c<1$. Under $c<1$ both hold. ✓

Everything looks consistent. But there is a hole: **what does the school believe at the "no essay" information set?**

Bayes' rule gives

$$
\Pr(t_P\mid\text{no essay})=\frac{\Pr(t_P\cap\text{no essay})}{\Pr(\text{no essay})}=\frac{0}{0}.
$$

The denominator is zero because this information set lies off the equilibrium path — nobody skips the essay. Bayes' rule defines conditional probabilities only for positive-probability events, so it fails here.

### Why the hole is fatal

Because whether "reject" is credible depends entirely on this undefined belief.

- If the school believes a student without an essay is probably $t_P$, rejecting her means giving up a student worth 3, which is not optimal — so "no essay means rejection" is not credible.
- If the school believes such a student is probably $t_N$, rejecting is exactly right — the threat is credible.

Ball says this is precisely the point he wants to convey: **the situation is genuinely murky**. Several beliefs are defensible, and credibility depends on which one is chosen.

So the way out is not to find a cleverer application of Bayes' rule, but to concede that **beliefs themselves must be part of the equilibrium**. It is not enough to write down strategies; one must also write down what is believed at each information set.

This also explains why the classroom produced several reasonable answers to "what should the school believe here" — the prior of $1/2$, the view that anyone skipping the essay cannot be keen, or a story about the applicant being busy preparing for an exam and therefore keener. Bayes' rule cannot rule any of them out; extra principles are needed, and supplying those principles is exactly what the dozen competing definitions attempt. This course chooses to impose **no restriction** for now.

### Adding the belief

The equilibrium becomes: both types submit; the school admits on an essay and rejects otherwise; the belief on seeing an essay is $1/2$; the belief on seeing no essay is $p$ (the probability of being passionate), with $1-p$ for unenthusiastic.

$p$ is unconstrained by Bayes' rule but constrained by **sequential rationality**. At the "no essay" information set the school must choose reject, which pays 0, over admit, which pays

$$
p\cdot 3+(1-p)\cdot(-2)=5p-2 .
$$

Rejection is optimal exactly when

$$
0\ \ge\ 5p-2\quad\Longrightarrow\quad p\le \tfrac25 .
$$

So for any $p\le 2/5$ this is a perfect Bayesian equilibrium. Ball's phrasing: we have constructed a **family** of equilibria — same strategies, with the belief varying continuously over an interval.

![The school's expected payoff from admitting, 5p − 2, rises with the belief p and crosses zero at p = 2/5; rejection is sequentially rational only when p does not exceed 2/5, while the pooling equilibrium's p = 1/2 sits in the acceptance region](/images/perfect-bayesian-equilibrium-credibility-en.svg)

*Figure: credibility is an inequality. The belief has to place rejection at the optimum for the threat to hold; once p passes 2/5 the school would rather admit, and the threat collapses.*

There is a mistake students often make, and Ball singles it out: **"p can be anything" does not mean "p can be omitted"**. Writing down an equilibrium requires choosing a specific $p$. The freedom is real, but the choice must actually be made.

### The separating equilibrium: making the essay a signal

Now drop the restriction on $c$ and ask when the essay can **separate** the two types.

Candidate: the passionate submit, the unenthusiastic do not.

Under this strategy both information sets are on the equilibrium path (each is reached with positive probability), so Bayes' rule applies on both sides and there is no $0/0$.

- On seeing an essay: only a passionate student could have sent it, so the belief is $(1,0)$.
- On seeing no essay: only an unenthusiastic student could have skipped it, so the belief is $(0,1)$.

The school's best response follows: admit on an essay (worth 3), reject without one (worth $-2$). Sequential rationality holds at both of the school's information sets.

Now the students. The passionate type is meant to submit, yielding $2-c$; deviating to no essay means rejection, hence 0. The requirement is

$$
2-c\ \ge\ 0\quad\Longrightarrow\quad c\le 2 .
$$

The unenthusiastic type is meant to skip, yielding 0; deviating to an essay fools the school and yields $1-c$. The requirement is

$$
0\ \ge\ 1-c\quad\Longrightarrow\quad c\ge 1 .
$$

Together:

$$
1\le c\le 2 .
$$

### What the two boundaries say

The interval is informative.

- **$c$ too small** ($c<1$): the unenthusiastic find "it's only a paragraph, worth it" and submit too. The essay stops separating and we fall back to the pooling equilibrium.
- **$c$ too large** ($c>2$): even the passionate find it not worth it, and nobody applies. The screen drives away good and bad alike.

So if the school can treat $c$ as a design variable — through the difficulty, length or requirements of the essay — what it wants is **moderate difficulty**: hard enough to deter the unenthusiastic, easy enough to keep the passionate. Ball says this is exactly what admissions offices and recruiters think about. What they want is not "as hard as possible" but a value inside this interval.

He adds a joke: before GPT, writing an essay had a real cost; now, for many people, that cost is close to zero, so on this model the separating equilibrium fails, everyone submits, and the essay loses its signalling power.

## Defining perfect Bayesian equilibrium

### Assessments

Before the definition, Ball corrects a sentence he has repeated all semester.

Throughout, he has said "an equilibrium is a strategy profile". That is no longer true, because an equilibrium must contain beliefs. The new object is called an **assessment**, with two parts:

1. A **strategy profile**: what each player does at each information set — a complete contingent plan.
2. A **belief system**: a probability distribution at **every non-singleton information set**.

Singleton information sets need no belief — there is only one possible node, so the probability is necessarily 1 and writing it changes nothing. Non-singleton sets are where one must say which node is more likely.

A belief is a distribution **over the nodes inside that information set**; it cannot put positive probability on nodes outside it. That looks obvious, but it is what makes the belief a legitimate conditional distribution.

In the application game, the student has two information sets ($t_P$, $t_N$), both singletons, so the student needs no beliefs; the school has two information sets, each with two nodes, so it needs two beliefs. That is why the entire analysis turns on just two numbers, $p$ and $1/2$.

### The two conditions

**Definition**: an assessment is a perfect Bayesian equilibrium if it satisfies

1. **sequential rationality**, and
2. **belief consistency**.

**Belief consistency**: beliefs agree with Bayes' rule — **wherever possible**.

"Wherever possible" is vague, so Ball gives the precise version: **at every information set reached with positive probability under the strategy profile**. Reachability is judged from the strategy profile itself: given that everyone plays their strategies, some information sets are visited and some never are. Beliefs at the former must be computed by Bayes' rule; beliefs at the latter are entirely free.

This maps exactly onto the two cases in the application game: in the separating equilibrium both information sets are reached, so the beliefs are pinned to $(1,0)$ and $(0,1)$; in the pooling equilibrium the "no essay" set is never reached, so $p$ is free.

**Sequential rationality**: at **every** information set, the action prescribed by the strategy is optimal given the belief and the rest of the strategy profile.

Unpack it: on arriving at an information set I do not know which node I am at, so I weight by my belief; and how play continues afterwards is determined by the rest of the strategy profile. Combining the two gives an expected payoff for each action, and the optimal one must be the one my strategy prescribes.

Ball says the mathematical statement is longer and more confusing, so he states it in words. Its substance is: take the requirement of subgame perfection and extend it from subgames to **every information set** — no longer requiring that a subgame can be cut out, only that play is optimal everywhere.

### What each condition does

Looking back at the two examples, the division of labour is clear:

- **Belief consistency** handles "what can be computed must be computed". In the pooling equilibrium the posterior on an essay must be $1/2$, not an arbitrary $0.9$.
- **Sequential rationality** handles "where it cannot be computed, it must still make sense". In the pooling equilibrium the posterior on no essay is free, but not free enough to make rejection a dominated action — hence $p\le 2/5$.

Together they exclude incredible threats: a threat is credible only if there exists a belief under which carrying it out is optimal. That is what subgame perfection was trying to do, restated in a form that survives incomplete information.

## What this lecture establishes

1. In the two-item VCG example, the efficient allocation maximises the sum of reports ($5+6=11$), payments equal externalities ($t_1=7-6=1$, $t_2=8-5=3$), and payments are never negative.
2. Four boxes correspond to four concepts: Nash, subgame perfect Nash, Bayes-Nash, perfect Bayesian. The fourth remains contested, and the course presents only the classical definition.
3. Subgame perfection relies on being able to cut out proper subgames. Once one information set spans several nodes, no subgame can be cut, the requirement collapses to "the whole thing is Nash", and incredible threats survive.
4. In the application game, whether "no essay means rejection" is credible depends on the school's belief at a zero-probability information set, where Bayes' rule returns $0/0$. Beliefs therefore have to be part of the equilibrium.
5. A perfect Bayesian equilibrium is an assessment — strategies plus a belief system — satisfying belief consistency (Bayes' rule at positive-probability information sets) and sequential rationality (optimal at every information set given beliefs).
6. The pooling equilibrium requires $p\le 2/5$; the separating equilibrium requires $1\le c\le 2$. Too cheap an essay and everyone writes it (no signal); too expensive and even the passionate stay away.

## Check your understanding

**1. In the VCG example, why does bidder 1 pay only 1 for an item worth 5, while bidder 2 pays 3 for one worth 6?**

Payment is unrelated to what I receive and depends only on the loss I impose. Without bidder 1, bidder 2 could take both items (worth 7); with bidder 1 present she gets only B (worth 6), a loss of 1. Without bidder 2, bidder 1 could take both (worth 8); with bidder 2 present she gets only A (worth 5), a loss of 3. So the externalities are 1 and 3, and so are the payments.

**2. In the modified entry game, why are all three Nash equilibria subgame perfect?**

Because a subgame must start at a single node and must not split an information set. After the modification firm 2's two nodes share one information set, so starting at either splits it, and starting at both violates the single-node requirement. The only subgame is the whole game, and subgame perfection reduces to "the whole thing is Nash", imposing nothing further.

**3. In the pooling equilibrium, why can't Bayes' rule compute the belief at the "no essay" information set?**

Because under that equilibrium both types submit, so the event "no essay" has probability zero. Bayes' rule reads $\Pr(A\mid B)=\Pr(A\cap B)/\Pr(B)$, undefined when the denominator is zero. This is not a computational inconvenience: conditional probability is simply not defined for zero-probability events.

**4. Why does the pooling equilibrium require $p\le 2/5$ rather than allowing any $p$?**

Because the school must choose rejection at the "no essay" information set. Rejection pays 0; admission pays $3p-2(1-p)=5p-2$. Rejection is optimal when $0\ge 5p-2$, i.e. $p\le 2/5$. The belief is unconstrained by Bayes' rule but constrained by sequential rationality: if $p$ were larger the school would rather admit, so "no essay means rejection" would not be credible and the equilibrium would fail.

**5. Why is the separating equilibrium's range $1\le c\le 2$, and what failure does each boundary represent?**

The passionate must prefer submitting ($2-c$) to not ($0$), giving $c\le 2$; the unenthusiastic must prefer skipping ($0$) to submitting ($1-c$), giving $c\ge 1$. Below 1 the cost is so low that the unenthusiastic also write, the essay stops separating, and play returns to pooling. Above 2 the cost is so high that even the passionate do not write and nobody applies. The school therefore wants the cost in the middle.

**6. What does each of "belief consistency" and "sequential rationality" accomplish, and is one alone enough?**

Belief consistency ensures that computable posteriors are computed correctly: at positive-probability information sets the belief is uniquely determined by Bayes' rule and cannot be chosen freely. Sequential rationality ensures that where computation fails, play must still make sense: at every information set the action must be optimal given the belief. With consistency alone, beliefs at zero-probability sets could be arbitrary and credibility could not be assessed; with rationality alone, beliefs at positive-probability sets could be fabricated and the equilibrium would lose its grip. Only together do they pin down what can be computed and discipline what cannot.
