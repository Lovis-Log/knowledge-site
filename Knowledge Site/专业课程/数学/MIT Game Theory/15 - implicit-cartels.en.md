---
slug: "15-implicit-cartels"
title: "Implicit Cartels: Making 'Produce Less' Self-Enforcing in a Repeated Game"
summary: "A cartel wants to coordinate on lower output and higher prices, but every member wants to overproduce, and contracts are either illegal or unenforceable. Written as an infinitely repeated Cournot game, the model compares the different equilibrium conditions for permanent Nash reversion and finite punishment."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "cartels"
  - "implicit-collusion"
sources:
  - kind: "video"
    title: "Lecture 15: Implicit Cartels"
    url: "https://www.youtube.com/watch?v=9MtmH12aag4"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The previous lecture was pure theory — Ball himself calls it the mathematical one. This lecture returns to applications: cartels, groups of firms that should be competing but instead agree to produce less and push the price up.

The examples come first. The classic is OPEC, whose members coordinate oil production so that the price stays high. Drug cartels belong to the same family, except that they limit competition by carving up territory — one organisation in the north, another in the south, so each market has a single seller and output falls; Ball notes there is violence behind this, and violence stays outside the model, so he only mentions in passing that how criminal organisations use violence to sustain cooperation is an important economic question. Then the vitamin cartel (producers colluding on prices and splitting which vitamins each would make), guilds, even PhD programmes. The least obvious case is the production of doctors: the number of medical school places in the US is capped by agreements with bodies such as the AMA, and fewer doctors means a higher price for a doctor's labour — exactly the OPEC logic applied to a different good. The Quebec maple syrup cartel is explicitly backed by government and written into contracts, so it too falls outside today's model.

What is left is the **implicit cartel**: no violence, no government endorsement, just a group of firms that quietly produce less.

Where is the tension? Collective restraint benefits everyone, but each firm wants to cheat: the price has already been pushed up by everyone else's restraint, so selling a little more earns a little more. In the language of economics this is an **externality**: when I expand output I internalise only the effect on my own profit, while the price I push down is borne by everybody. Pollution and road congestion have the same structure — whoever does not internalise the externality overproduces.

So why not write a contract? Ball gives two reasons. Domestically, the contract is itself illegal: two American firms writing down "we shall each produce this much" would run straight into antitrust law. Internationally, even if Iran and Saudi Arabia signed something, no court could enforce it — there is no supranational enforcement body. With both routes closed, the only mechanism left is **self-enforcement**: no contract, but behaviour arranged so that overproduction is punished by others producing more, and the arrangement must itself be a Nash equilibrium, otherwise the punisher would not carry it out.

The problem therefore becomes a repeated game, and what we want is its (subgame perfect) Nash equilibria, since those describe exactly what self-enforcement can achieve. Today's model is infinitely repeated Cournot competition — Cournot meaning competition in quantities. The horizon is infinite because oil has no known end date: eventually it runs out, but nobody knows when. The model also maintains the assumption that past actions, that is past quantities, are observed. Ball concedes this is strong here — OPEC arguments are always "you overproduced", "no I didn't", and what is actually observable is the price; a better model would have players observe noisy signals, seeing the price fall without knowing who caused it. That is a more modern research topic, mathematically much harder, and not covered.

Cournot is of course a crude picture of OPEC: real members have different costs, quotas are negotiated, politics intrudes. But Ball argues it captures the essential feature — output is an observable, adjustable, substitutable decision variable, and the price is determined by total output. Capture that, and the central tension of a cartel appears.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Back to applications: what a cartel has to solve |
| 0:33 | OPEC: coordinating output to keep the oil price high |
| 1:52 | Drug cartels: limiting competition by splitting territory; violence stays outside the model |
| 3:17 | The vitamin cartel and medical school places: the same logic |
| 5:02 | Quebec maple syrup: government-backed, also outside the model |
| 6:28 | The core tension: every firm wants to overproduce |
| 6:41 | The externality: my extra output lowers the price everyone faces |
| 8:27 | Why not use contracts: illegal at home, unenforceable abroad |
| 10:32 | Implicit cartels and self-enforcement |
| 21:18 | The stage-game Nash output $(1-c)/(n+1)$ |
| 25:44 | The monopoly quantity and an even split |
| 30:31 | Why the cartel quantity is not a Nash equilibrium |
| 39:17 | Punishment by reverting to $q^{NE}$ |
| 43:07 | The automaton representation and value functions |
| 54:51 | The equilibrium condition becomes a cutoff in $\delta$ |
| 1:02:20 | The cutoff rises with the number of firms: small cartels are steadier |
| 1:04:07 | Carrot and stick: punishment of limited duration |

## The model: repeated Cournot

There are $n$ firms, $i=1,\dots,n$, and periods $t=0,1,2,\dots$, with one round of Cournot competition per period.

- Constant marginal cost $c$ with $0<c<1$, identical across firms.
- Inverse demand $P(Q)=\max\{1-Q,\,0\}$ with $Q=\sum_{i=1}^{n}q_i$. Price falls with quantity and cannot go negative; the 1 is just a choice of units, best read as "all the oil the world could possibly produce".
- A common discount factor $\delta$.

Identical costs are a simplification. OPEC members differ a lot in extraction costs, and the model extends to asymmetric costs at the price of much messier algebra, so symmetry comes first. (A note on the infinite horizon: it is not only that nobody knows when the oil runs out — a known finite horizon would change the answer, since backward induction from the last period unravels cooperation.)

Firm $i$'s profit in period $t$ is quantity times the per-unit margin:

$$
\pi_i(q^t)=q_i^{t}\big(P(Q^{t})-c\big)=q_i^{t}\Big(1-\sum_{j}q_j^{t}-c\Big).
$$

Superscripts index time, subscripts index firms, and $q^t=(q_1^t,\dots,q_n^t)$ is the period-$t$ output vector. Average discounted profit is

$$
\Pi_i=(1-\delta)\sum_{t=0}^{\infty}\delta^{t}\,\pi_i(q^{t}),
$$

normalised by $1-\delta$ as in the previous lecture, so that a constant profit $\pi$ reads as $\pi$.

## The stage-game Nash equilibrium

Solve the static game first. Firm $i$ maximises

$$
q_i\Big(1-q_i-\sum_{j\neq i}q_j-c\Big).
$$

The first-order condition is

$$
1-2q_i-\sum_{j\neq i}q_j-c=0
\quad\Longrightarrow\quad
q_i=\frac{1-c-\sum_{j\neq i}q_j}{2}.
$$

This is the familiar "best response is half the residual demand": treat the opponents' output as having taken a share of the market, and take half of what is left after costs. Ball notes the stage game has a unique Nash equilibrium, namely the symmetric one. Set $q_j=q$ for all $j$:

$$
q=\frac{1-c-(n-1)q}{2}
\;\Longrightarrow\;
2q=1-c-(n-1)q
\;\Longrightarrow\;
q(n+1)=1-c,
$$

so

$$
q^{NE}=\frac{1-c}{n+1}.
$$

More firms produce less each; higher costs produce less each. Total output and price follow:

$$
Q^{NE}=\frac{n(1-c)}{n+1},
\qquad
p^{NE}=1-Q^{NE}=\frac{1+nc}{n+1}=c+\frac{1-c}{n+1}.
$$

The last equality uses the add-and-subtract-$c$ trick: $1-Q^{NE}=(1-c)+c-Q^{NE}=c+\big[(1-c)-n(1-c)/(n+1)\big]=c+(1-c)/(n+1)$. The reading is clean — price equals cost plus a markup that shrinks as $n$ grows. Each firm's equilibrium profit is output times markup:

$$
\pi^{NE}=\left(\frac{1-c}{n+1}\right)^{2}.
$$

## The monopoly quantity and the temptation

Can the firms do better than the Nash equilibrium? Yes. If they cared only about **total** profit, they should behave like a monopolist and set total output equal to the monopoly quantity.

The reason is immediate: if firm 1 produces $q_1$, firm 2 produces $q_2$, and so on, total profit equals exactly the profit a single firm would make producing $Q=q_1+\cdots+q_n$. So maximising total profit is maximising monopoly profit:

$$
\max_{Q}\ Q(1-Q-c)
\;\Longrightarrow\;
Q^{M}=\frac{1-c}{2},
$$

with price $(1+c)/2$ and total profit $(1-c)^{2}/4$. A natural split is even, each firm producing

$$
q^{M}=\frac{1-c}{2n},
$$

so that total output is exactly $Q^{M}$. Ball notes that an even split is natural but not the only option: any shares summing to $Q^{M}$ will do. In the extreme, one firm could produce all of $Q^{M}$ and the rest nothing, but that hardly looks like a functioning cartel — "you all produce zero and I produce everything" is not a proposal anyone accepts, which is why real cartels split. Note that $q^{M}$ is strictly below $q^{NE}$: for $n\ge2$, $2n>n+1$, hence $1/(2n)<1/(n+1)$. Everyone produces a little less, the price is higher, and every firm earns strictly more.

So why is this not a Nash equilibrium? Ball frames the puzzle sharply: we just maximised the **sum**, but an individual firm does not care about the sum. Given that everyone else produces $q^{M}$, raising my output a little increases my revenue while lowering the price only slightly — and that small loss is shared by everybody. My private gain exceeds the share of the loss I bear. In the earlier language, I create a negative externality and do not internalise it. The sum falls; I rise.

The structure is worth remembering: **"maximise total profit" and "nobody wants to deviate" are different conditions**. The first is efficiency, the second is equilibrium.

## Sustaining the cartel with Nash reversion

What should the punishment look like? Ball says he expects the room to answer "flood the market" and crash the price. The trouble with that answer is that it may not be self-enforcing: the firm doing the flooding loses badly too, so ex post it has no reason to go through with it. The natural punishment is therefore reversion to the Nash equilibrium, which is itself an equilibrium and needs no further supervision. The strategy is:

1. Every firm produces $q^{M}$ each period until somebody deviates.
2. After any deviation, every firm produces $q^{NE}$ each period forever.

This is exactly the Nash reversion of the previous lecture. The punishment is credible because $q^{NE}$ is a Nash equilibrium of the stage game: once there, nobody wants to move, so nobody needs punishing for failing to punish.

Two functions make the arithmetic manageable. The first is my profit when everyone produces $q$:

$$
f(q)=q\,(1-nq-c),
$$

meaningful only for $q<1/n$ so the price stays positive. The second is my profit when everyone else produces $q$ and I choose the best deviation:

$$
g(q)=\max_{q'}\ q'\big(1-(n-1)q-q'-c\big).
$$

This maximisation again has the shape $q'(A-q')$ with $A=1-c-(n-1)q$, so the best deviation is $q'=A/2$ and the value is $A^{2}/4$:

$$
g(q)=\left(\frac{1-c-(n-1)q}{2}\right)^{2}.
$$

An automaton with two states is the cleanest description: state $M$ produces $q^{M}$ and stays there as long as everyone produced $q^{M}$, otherwise moves to $NE$; state $NE$ produces $q^{NE}$ and stays there no matter what. Abstract as it sounds, the automaton is Ball's "stone on the desk": two positions on the desk, the stone starts on "monopoly", each period you look at what others produced yesterday, move the stone if you must, and play according to where it sits. Real cartels use computers to keep the books, but the logic is this simple.

Value functions give the average discounted profit from today onwards in each state. State $M$ is not absorbing in general, but on the equilibrium path it persists, so

$$
v_M=(1-\delta)f(q^{M})+\delta v_M
\;\Longrightarrow\;
v_M=f(q^{M}),
$$

since the same profit arrives every period. Likewise $v_{NE}=f(q^{NE})$.

Two numbers will be needed later:

$$
f(q^{M})=\frac{1-c}{2n}\cdot\frac{1-c}{2}=\frac{(1-c)^{2}}{4n},
$$

that is, the monopoly profit $(1-c)^{2}/4$ split $n$ ways, while $f(q^{NE})=((1-c)/(n+1))^{2}$, which is smaller.

Only one equilibrium condition needs checking: in state $M$, playing along must be at least as good as a one-shot deviation.

$$
v_M\ \ge\ (1-\delta)\,g(q^{M})+\delta\,v_{NE}.
$$

The right-hand side is "take the best deviation today, then sit in the punishment from tomorrow". Substituting the value functions:

$$
f(q^{M})\ \ge\ (1-\delta)g(q^{M})+\delta f(q^{NE}).
$$

Collecting the $\delta$ terms:

$$
\delta\Big[g(q^{M})-f(q^{NE})\Big]\ \ge\ g(q^{M})-f(q^{M}),
$$

that is,

$$
\delta\ \ge\ \bar\delta=\frac{g(q^{M})-f(q^{M})}{g(q^{M})-f(q^{NE})}
=\frac{g}{g+l},
$$

where $g=g(q^{M})-f(q^{M})$ is the **one-shot gain** and $l=f(q^{M})-f(q^{NE})$ the **per-period loss**. The form is identical to the previous lecture, with "profit" in place of "payoff". By the one-shot deviation principle — it suffices to check that no single deviation at any state pays — this inequality is both necessary and sufficient: for $\delta\ge\bar\delta$ Nash reversion is a subgame perfect equilibrium, and for $\delta<\bar\delta$ deviation in state $M$ is strictly profitable (the condition for state $NE$ holds automatically; see below).

State $NE$ needs no condition: $q^{NE}$ is a best response, and whatever I do today, tomorrow is still $NE$, so deviation cannot help.

The cutoff lies automatically in $(0,1)$: since $l=f(q^{M})-f(q^{NE})>0$, the denominator exceeds the numerator, so $\bar\delta<1$. This guarantees that "patient enough" can always be achieved — there is no case of "no amount of patience suffices". As $n$ grows, $\bar\delta$ approaches 1, so the required patience becomes extreme, which is another way to see why large cartels fail.

Three comparative statics are intuitive:

- Larger $l$ (harsher punishment) lowers $\bar\delta$. The more frightening the punishment, the less patience is needed.
- Larger $g$ (bigger temptation) raises $\bar\delta$, since $\partial\bar\delta/\partial g=l/(g+l)^{2}>0$.
- Larger $n$ raises $\bar\delta$. Substituting the formulas for $f$ and $g$ confirms it (supplementary calculation): with more firms each firm's cartel profit is thinner while the temptation grows in relative terms, so more patience is required.

The last point yields a testable prediction: **cartels with fewer firms are easier to sustain and last longer**. Ball says this matches the empirical evidence — coordinating many firms is hard, and even a few firms often break down. He also insists this is not merely a mathematical story: in the 1980s Saudi Arabia grew tired of others overproducing, flooded the market, and the oil price collapsed with global consequences; a few years later production came back down and prices recovered. "Revert to Nash" is that episode.

A numerical feel (supplementary calculation): with $n=2$ and $c=0$, $q^{M}=1/4$, $q^{NE}=1/3$, $f(q^{M})=1/8$, $f(q^{NE})=1/9$, $g(q^{M})=9/64$, so $\bar\delta=9/17\approx0.53$. A duopoly needs a discount factor above one half to sustain the monopoly output — not harsh, but not automatic either.

## Carrot and stick: punishment of limited duration

Nash reversion punishes **forever**. Real punishments usually have an end: Saudi Arabia flooded for a few years, then cut back and prices recovered. Ball says this is the typical shape — you overproduce, I punish you for a year or two, or a month or two, and then we return to the good outcome, because that is what we actually want.

Hence a second strategy, **carrot and stick**: a carrot is a reward, a stick a punishment; Ball notes in passing that the inherited phrase is a little violent, but the name sticks. Two output levels $q^{c}<q^{s}$: $q^{c}$ is the low output everyone likes, $q^{s}$ the high output nobody likes. They need not equal $q^{M}$ and $q^{NE}$; any two levels will do.

The rule is slightly more involved than Nash reversion but compresses into one sentence: **comply and you are back at the carrot tomorrow; deviate and you are at the stick tomorrow**. Concretely:

- In state $c$: everyone produces $q^{c}$. If everyone was observed producing $q^{c}$, stay in $c$ tomorrow; otherwise move to $s$.
- In state $s$: everyone produces $q^{s}$. If everyone was observed producing $q^{s}$, **return** to $c$ tomorrow; otherwise stay in $s$.

Note the arrow out of $s$: as soon as the punishment is carried out properly, it ends. That is where the limited duration comes from — not a rule of "punish for two periods" but a rule of "punish until it is done".

![Four transitions between two states: complying in C stays in C while deviating moves to S; complying in S returns to C while deviating stays in S, with the value functions v_C and v_S shown below](/images/implicit-cartels-automaton-en.svg)

*Figure: one rule governs everything — comply and go to C, deviate and go to S — so punishment in S lasts only as long as it takes to carry out. The δ·v_C term inside v_S is what makes the stick credible.*

The value functions solve a system:

$$
v_c=(1-\delta)f(q^{c})+\delta v_c
\;\Longrightarrow\;
v_c=f(q^{c}),
$$

$$
v_s=(1-\delta)f(q^{s})+\delta v_c .
$$

The first line is immediate: complying in $c$ keeps you in $c$ forever, so $v_c$ is just $f(q^c)$ every period. The second needs work: today in $s$ you get $f(q^s)$, and complying sends you to $c$ tomorrow, worth $v_c$ from then on. Substituting $v_c$,

$$
v_s=(1-\delta)f(q^{s})+\delta f(q^{c}).
$$

In general $k$ states give $k$ equations in $k$ unknowns, a linear system that always has a solution. This is the elegant part of the automaton method: with ten states, expanding the path by hand means chasing infinitely many sequences; written as a system, it is a $10\times10$ linear solve. Ball says this is why the value function deserves its own discussion.

There is one equilibrium condition per state:

$$
v_c\ \ge\ (1-\delta)g(q^{c})+\delta v_s,
\qquad
v_s\ \ge\ (1-\delta)g(q^{s})+\delta v_s .
$$

The first says deviating in $c$ pays $g(q^c)$ today and sends you to $s$ tomorrow. The second says deviating in $s$ pays $g(q^s)$ today and leaves you **in** $s$ tomorrow, so $\delta v_s$ appears on both sides and cancels:

$$
v_s\ \ge\ g(q^{s}).
$$

The two conditions divide the labour. The first keeps the good times stable: in $c$ it is not worth grabbing one period of extra profit in exchange for a punishment. The second keeps the punishment itself stable: in $s$ it is not worth deviating again, which would prolong the punishment and postpone the return to $c$.

The second condition is the interesting one: it requires that even the best deviation in the punishment state be no better than complying. And $v_s=(1-\delta)f(q^{s})+\delta f(q^{c})$ exceeds $f(q^s)$ precisely because of the $\delta f(q^c)$ term — **the stick is credible because a carrot follows it**. With a permanent punishment, $v_s$ would equal $f(q^s)$ and the condition would read $f(q^s)\ge g(q^s)$, which typically fails, so nobody would carry the punishment out. This also explains why the harshest punishment in the previous lecture had to be paired with a reward phase.

One easily missed detail: a one-shot deviation in state $s$ actually traces the path "deviate today, still in $s$ tomorrow (producing $q^s$ as the strategy says), back to $c$ the day after, then $c$ forever", i.e. $s,s,c,c,c,\dots$. That path is complicated, yet the formula contains only $\delta v_s$. The reason is that $v_s$ already folds in "in $s$ today, in $s$ tomorrow, in $c$ afterwards". The value function means you never track the whole path, only which state you reach tomorrow.

If $q^{c}=q^{M}$ and $q^{s}=q^{NE}$, the condition $v_s\ge g(q^{NE})$ in state $s$ is in fact satisfied automatically: $q^{NE}$ is a best response, so $g(q^{NE})=f(q^{NE})$, and $v_s=(1-\delta)f(q^{NE})+\delta f(q^{M})\ge f(q^{NE})$. The binding condition is the one in state $c$: substituting $v_s$ gives $\delta\ge\big[g(q^{M})-f(q^{M})\big]/\big[f(q^{M})-f(q^{NE})\big]=g_0/l_0$ with $g_0=g(q^{M})-f(q^{M})$ and $l_0=f(q^{M})-f(q^{NE})$, and this ratio exceeds 1 ($(1/64)/(1/72)=9/8$ when $n=2$, $c=0$), so a one-period return to Nash is too mild a punishment and no amount of patience sustains $q^{M}$. For carrot and stick to work with $q^{c}=q^{M}$, the state-$s$ and state-$c$ conditions must hold together; taking $q^{s}$ harsher than $q^{NE}$, the state-$s$ condition reads $\delta\ge\big[g(q^{s})-f(q^{s})\big]/\big[f(q^{M})-f(q^{s})\big]$. The real value of the design is that the punishment need not be permanent, which is closer to observed behaviour.

## What this lecture establishes

1. The core tension in a cartel is an externality: each firm internalises only its own gain from expanding output while the price decline is borne by everyone, so the jointly optimal output is not a Nash equilibrium.
2. Contracts cannot solve it: domestically the cartel is illegal, internationally there is no court to enforce. The only remaining mechanism is self-enforcement, that is, equilibrium of a repeated game.
3. The symmetric stage-game equilibrium is $q^{NE}=(1-c)/(n+1)$, with price equal to cost plus a markup decreasing in $n$, and profit $((1-c)/(n+1))^{2}$ per firm.
4. The cartel targets the monopoly quantity $(1-c)/2$, split evenly into $q^{M}=(1-c)/(2n)$, which is strictly below $q^{NE}$.
5. Nash reversion sustains $q^{M}$ iff $\delta\ge g/(g+l)$: one-shot gain over gain plus permanent loss. The cutoff falls as punishment hardens, rises with the temptation, and rises with the number of firms.
6. Carrot and stick makes punishment finite: comply and return to low output, deviate and move to high output. The stick is credible because a carrot follows it, and value functions turn complicated paths into a linear system.

## Check your understanding

**1. Why is the cartel quantity $q^{M}$ jointly optimal yet not a Nash equilibrium?**

Because maximising the sum and having no profitable deviation are different conditions. Given that everyone else produces $q^{M}$, raising my output increases my revenue while lowering the price slightly, and the price loss is shared across all $n$ firms. My private gain exceeds my share of the loss, so deviation pays. The sum falls while I rise — the definition of a negative externality.

**2. Starting from $q^{NE}=(1-c)/(n+1)$, where does $p^{NE}=c+(1-c)/(n+1)$ come from?**

Total output is $Q^{NE}=n(1-c)/(n+1)$ and the price is $1-Q^{NE}$. Add and subtract $c$: $1-Q^{NE}=c+\big[(1-c)-n(1-c)/(n+1)\big]=c+(1-c)\big[1-n/(n+1)\big]=c+(1-c)/(n+1)$. The reading is cost plus a markup of $1/(n+1)$, falling in $n$. Profit per firm is output times markup, $((1-c)/(n+1))^{2}$.

**3. Why does state $NE$ need no deviation check while state $M$ does?**

In state $NE$ the strategy prescribes $q^{NE}$, which is a best response, so deviating cannot improve today's profit; and whatever happens today, tomorrow is still $NE$, so the future is unaffected. Together, deviation cannot pay. In state $M$ the prescribed $q^{M}$ is not a best response, so deviating pays immediately and the cost is the punishment from tomorrow on — the two must be compared.

**4. In carrot and stick, why does the condition for deviating in state $s$ collapse to $v_s\ge g(q^{s})$?**

Because after a deviation in $s$ the state tomorrow is still $s$ — the rule is "if you did not comply, stay at the stick". So $\delta v_s$ appears on both sides of $v_s\ge(1-\delta)g(q^{s})+\delta v_s$ and cancels, leaving $(1-\delta)v_s\ge(1-\delta)g(q^{s})$, i.e. $v_s\ge g(q^{s})$.

**5. If the punishment were permanent, would carrot and stick still work?**

No. With a permanent punishment $v_s=f(q^{s})$, and the condition becomes $f(q^{s})\ge g(q^{s})$ — complying with the stick is better than the best deviation — which typically fails, so the punisher would not carry it out. Limited punishment is credible precisely because it is followed by a return to the profitable $q^{c}$, and that future reward compensates for the present loss.

**6. Does the assumption that past quantities are observed matter?**

A great deal, and it is strong in practice. OPEC's recurring argument is "you overproduced" versus "I did not", and what is really observable is often just the price. With a noisy signal the question becomes "the price fell, but who did it" — and (supplement) a price fall may also come from weaker demand rather than overproduction, which makes inference harder still. Handling that requires quite different tools, and the mathematics is much harder. Ball calls it a direction for modern research, outside this course.
