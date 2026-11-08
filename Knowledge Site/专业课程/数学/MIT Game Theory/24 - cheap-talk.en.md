---
slug: "24-cheap-talk"
title: "Cheap talk: how much of it can you believe"
summary: "Replace costly signals with free messages. In Crawford-Sobel the advisor wants the decision pushed up by a fixed bias β, so full honesty is impossible, yet cutting the state space into cells and saying one word per cell is still an equilibrium; the maximum number of cells is pinned down by β."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "cheap-talk"
  - "crawford-sobel"
sources:
  - kind: "video"
    title: "Lecture 24: Cheap Talk"
    url: "https://www.youtube.com/watch?v=SsdSpzJ-d7s"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

The two previous lectures conveyed information through **costly actions**: schooling takes time, and a posted price affects revenue. Ball summarizes these as actions that are "costly or payoff-relevant". But most information in the world travels through speech — messages, memos, briefings. Talking is nearly free, so what makes it credible?

This lecture takes on that contrast. The model is Crawford and Sobel (1982). The setup is minimal: an **advisor** (sender) observes a one-dimensional state $t$ and sends a message to a **decision maker** (receiver), who cannot see the state and chooses a decision $y$.

Two extreme cases are dispatched first. If interests are perfectly aligned, talk is obviously credible and there is nothing to model. If interests are perfectly opposed — an applicant insisting "I am a good employee" — everyone says the same thing and the information content is zero. The interesting territory is in between: **interests conflict, but not by much**. There, talk can still transmit something.

Ball's analogy is a policy advisor. A president or a Fed chair has no time to study every issue and relies on experts. The experts do know more, but they also have leanings: some are hawkish on inflation, some dovish; some favour intervention, some restraint. The model compresses the leaning into one parameter: the advisor wants the decision to be **higher than the decision maker wants, by a fixed amount** $\beta$.

This captures a real feature of policy disputes: **the two sides agree on direction and disagree on magnitude**. The economy worsens, everyone agrees rates should fall; the argument is over how far. Ball says this is why the model speaks to the feeling that "we talked for hours, nothing was said, and yet it was not entirely nothing".

The conclusions come in three layers. First, full transparency is impossible: if the advisor reported honestly, the decision maker would follow, and the advisor would rather report $t+\beta$. Second, coarse communication is possible: cut the state into two cells, one word each, and it is an equilibrium as long as $\beta$ is not too large. Third, precision has a ceiling: $k$ cells require $\beta$ below $\frac{1}{2k(k-1)}$. Smaller bias buys finer partitions; at $\beta=0$ full transparency returns.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | From costly signals to free messages |
| 2:26 | Aligned interests need no model; opposed interests carry no information |
| 3:01 | Crawford and Sobel 1982: advisor and decision maker |
| 8:44 | The bias $\beta$: the advisor wants $y=t+\beta$ |
| 10:42 | Strategies: $m:[0,1]\to M$ and $y:M\to\mathbb{R}$ |
| 16:05 | Babbling: one message always, decision always $1/2$ |
| 21:27 | Full honesty is not an equilibrium: the advisor would report $t+\beta$ |
| 25:12 | Two-cell talk: a threshold $t_1$, message Low or High |
| 27:24 | Decisions are the cell midpoints, $t_1/2$ and $(t_1+1)/2$ |
| 31:07 | Indifference at the threshold, or the cutoff drifts |
| 35:39 | Solving gives $t_1=\tfrac12-2\beta$ |
| 39:55 | Requires $\beta<\tfrac14$, otherwise only babbling survives |
| 47:29 | Generalizing to a $k$-cell partition equilibrium |
| 51:08 | Cell $j$'s decision is the midpoint of $t_{j-1}$ and $t_j$ |
| 57:32 | Consecutive cells differ in length by $4\beta$ |
| 1:00:26 | A $k$-cell equilibrium exists iff $\beta<\frac{1}{2k(k-1)}$ |
| 1:06:33 | The finest equilibrium is best for both players |

## The model

### Players and payoffs

- **State** $t\sim U[0,1]$, observed only by the sender. It can also be called the sender's type. Ball suggests reading $t$ as "the decision the receiver would take if he knew the state" — the ideal interest rate is 3%, the actual rate is $y$.
- **Message** $m\in M$, an abstract set, as large as needed.
- **Decision** $y\in\mathbb{R}$.

Payoffs:

$$
u_R(y,t)=-(y-t)^{2},
\qquad
u_S(y,t)=-\big(y-(t+\beta)\big)^{2},\quad \beta>0 .
$$

The receiver wants to match the state; the sender wants to match the state plus a bias. $\beta$ is the **bias**, the advisor's positional difference from the decision maker.

Two features matter. First, the two agree completely on **direction**: a higher state calls for a higher decision. Second, they disagree on **level**, always: whatever the state, the advisor thinks the decision should be a little higher. Ball says this matches much policy argument — hawks and doves both want rate cuts in a downturn, and argue forever about how deep.

$\beta$ is common knowledge. A student asks whether the decision maker could be unsure of the advisor's leanings; Ball says that is an interesting extension that people have studied, but today $\beta$ is public: I know the advisor I hired has a certain leaning, what I do not know is the state.

### Strategies and equilibrium concept

$$
\text{sender: }m:[0,1]\to M,
\qquad
\text{receiver: }y:M\to\mathbb{R}.
$$

Note that $M$ can be any set. An equilibrium only ever uses $k$ distinct messages; the richness of the language generates no information by itself. What matters is which message maps to which stretch of the state space.

The solution concept is perfect Bayesian equilibrium. The receiver's side is easy: with quadratic loss, the optimal decision given a belief is the **expected state**,

$$
y(m)=\mathbb{E}[t\mid m].
$$

On-path messages are updated by Bayes' rule; off-path beliefs are unconstrained, but the decision must still lie in $[0,1]$, because the state does and every expectation of it does. So "reply to a strange message with $y=2$" is not allowed.

Ball notes that off-path beliefs matter less here than in the signaling model. The reason becomes clear below: because messages are free, the trick of "treat any off-path message exactly like some on-path message" is always available.

## The two extremes

### Babbling

The simplest equilibrium carries **no information**. The advisor is a broken record: whatever the state, the same message $m^\ast$.

$$
m(t)=m^\ast\quad\text{for all }t .
$$

Seeing $m^\ast$, the receiver learns nothing, keeps the prior, and its mean is $\tfrac12$, so $y(m^\ast)=\tfrac12$.

What about other messages? If the receiver answered one with, say, $\tfrac13$, the advisor would deviate in some states. To kill every deviation, the cheapest construction is to answer **every** message with $\tfrac12$. Then it does not matter what the advisor says, so she may as well say $m^\ast$.

The structure is transparent: the receiver says "I will not listen", the advisor says "then I will say anything". Ball calls this **babbling**: words are noise. It is always an equilibrium, and obviously not the only one.

### Full honesty is impossible

The other extreme is $m(t)=t$. For the receiver this is ideal: seeing $m$, he infers $t=m$ and sets $y=m$.

Now stand in the advisor's shoes. If the state is $t$ and the receiver will set $y=m$, then reporting $m=t+\beta$ delivers the ideal decision $t+\beta$. So honest reporting is always overturned.

Ball gives two real versions. An advisor who favours intervention does not say "I favour intervention"; she says "this conflict is extremely serious, you must step in". Someone who wants rate cuts does not say "I like low rates"; he says "inflation is simply not a problem". **Dressing a preference as a fact** is the direct consequence of a bias.

So we face a puzzle: full transparency is impossible, yet total silence is plainly not the whole of reality. Is there anything in between?

## Two-cell talk

### Construction

Try the coarsest partition: pick a threshold $t_1$, say "low" below it and "high" above it.

$$
m(t)=
\begin{cases}
L, & t<t_1,\\
H, & t\ge t_1 .
\end{cases}
$$

Hearing $L$, the receiver knows the state is uniform on $[0,t_1)$ and takes the midpoint:

$$
y(L)=\frac{t_1}{2}.
$$

Hearing $H$, the state is uniform on $[t_1,1]$:

$$
y(H)=\frac{1+t_1}{2}.
$$

Off-path messages use the trick above: treat them all as $L$, i.e. answer $\frac{t_1}{2}$. Then the advisor has no reason to send a third message — it would be treated as $L$ anyway, so she may as well send $L$.

This trick deserves emphasis because it **only works for free messages**. Ball contrasts it with the signaling model: could an employer announce "if you skip school I will treat you as if you had gone and pay the same wage"? No. Schooling is costly, so the student strictly prefers to skip it and collect the same wage. In cheap talk, when two messages induce the same decision the sender is **exactly indifferent**, because the message itself costs nothing. That is the whole meaning of "cheap".

### Indifference at the threshold

Now check sender optimality. The key observation: if the cutoff is $t_1$, then at $t=t_1$ the advisor must be **exactly indifferent** between saying low and saying high. With a strict preference, states on one side of the cutoff would want to jump across, and $t_1$ would not be a cutoff.

The indifference condition can be read straight off the symmetry of the quadratic loss. The advisor's payoff as a function of the decision is

$$
u_S(y)=-\big(y-(t_1+\beta)\big)^{2},
$$

a parabola peaking at $t_1+\beta$ and symmetric about it. For the two decisions $y(L)$ and $y(H)$ to yield the same payoff, they must be **equidistant from the peak**:

$$
t_1+\beta=\frac{y(L)+y(H)}{2}.
$$

Substituting $y(L)=\frac{t_1}{2}$ and $y(H)=\frac{1+t_1}{2}$:

$$
t_1+\beta=\frac{1}{2}\left(\frac{t_1}{2}+\frac{1+t_1}{2}\right)
=\frac{1+2t_1}{4}.
$$

Multiply by 4: $4t_1+4\beta=1+2t_1$, hence

$$
t_1=\frac12-2\beta .
$$

![The state space is cut into two cells whose decisions are 0.15 and 0.65; the sender's payoff peaks at t₁+β=0.4, equidistant from both decisions, so the sender is indifferent exactly at the threshold](/images/cheap-talk-partition-en.svg)

*Figure: decisions are cell midpoints, and indifference forces the two midpoints to straddle t₁+β — that single condition fixes the threshold.*

Supplementary: the figure takes $\beta=0.1$, giving $t_1=0.3$, $y(L)=0.15$, $y(H)=0.65$ and $t_1+\beta=0.4$. One can check that $0.4$ is exactly the average of $0.15$ and $0.65$.

### Why the threshold leans left

In $t_1=\tfrac12-2\beta$, one thing stands out: for any $\beta>0$ the threshold sits **below** $\frac12$, so the right cell is longer.

Here is the intuition. Suppose the threshold were exactly $\frac12$. The cells would be equal, the two midpoints would be symmetric about $\frac12$, and the advisor standing at $\frac12$ would compare two decisions equidistant from her ideal point $t_1+\beta$. But her ideal point is to the right, so she prefers the higher decision — every state would want to say "high", and the cutoff collapses.

To block that, the right cell must be **longer**. The longer the cell, the further its midpoint from its left endpoint, so saying "high" produces a much higher decision — high enough that even the biased advisor finds it too high and prefers to say "low". The threshold slides left until the two midpoints straddle $t_1+\beta$ symmetrically.

Ball offers a second reading: the left cell is shorter, so saying "low" is **more precise**. The advisor therefore trades off the direction of the bias against the informativeness of the message, and the equilibrium balances the two.

This also explains why the mechanism cannot be refined indefinitely. The finer the cell, the closer its midpoint to the endpoint, and the larger the gain from lying up one cell; past some point no placement of thresholds can hold.

A student asks: the receiver knows the advisor is biased and knows that "high" may be said in states that are not high — why still follow the midpoint? Because he does not need to trust the advisor's **motives**, only her **strategy**. Conditional on the message $L$, the state really is uniform on $[0,t_1)$ — not because the advisor is honest, but because in equilibrium the low states do say $L$. The receiver's best response depends only on that conditional distribution. Nobody needs the other to become better, only to play the strategy.

### The existence condition

$t_1$ must lie in $[0,1]$. Since $t_1\le\frac12<1$ automatically, the only constraint is

$$
t_1>0 \quad\Longleftrightarrow\quad \beta<\frac14 .
$$

At $\beta\ge\frac14$ even two-cell talk disappears and **babbling is the only equilibrium**. Once the bias is that large, no credible transmission is possible. Ball maps this onto "I am a good employee": when the advisor's position is too far away, the decision maker can only stop listening.

Supplementary: the value of coarse talk can be computed. The receiver's expected loss is the average within-cell variance of the state. A uniform on an interval of width $w$ has variance $w^2/12$. With $\beta=0.1$ the cells are $0.3$ and $0.7$ wide:

$$
0.3\cdot\frac{0.3^2}{12}+0.7\cdot\frac{0.7^2}{12}
=0.00225+0.02858\approx0.031 .
$$

Under babbling there is no information and the loss is the variance of $U[0,1]$, namely $1/12\approx0.083$. So two-cell talk removes more than sixty percent of the loss — the quantitative version of "you cannot believe all of it, but it is not nothing".

By symmetry, a negative bias (the advisor always wants a lower decision) gives $t_1=\frac12+2\lvert\beta\rvert$ with the left cell longer; the analysis is otherwise identical.

## Partition equilibria

### k cells

Two cells are a special case. In general, cut $[0,1]$ into $k$ pieces:

$$
0=t_0<t_1<\cdots<t_{k-1}<t_k=1,
$$

with cell $j$ mapped to message $m_j$ and decision $y_j$.

Receiver optimality: hearing $m_j$, the state is uniform on $[t_{j-1},t_j]$, so

$$
y_j=\frac{t_{j-1}+t_j}{2},\qquad j=1,\dots,k .
$$

Sender optimality: indifference at every cutoff,

$$
t_j+\beta=\frac{y_j+y_{j+1}}{2},\qquad j=1,\dots,k-1 .
$$

Count them: $k$ receiver conditions (one midpoint per cell) and $k-1$ sender conditions (one indifference per cut), against $k-1$ unknowns $t_1,\dots,t_{k-1}$. Ball flags the classic fence-post arithmetic: $k-1$ cuts make $k$ pieces.

Equations equal unknowns does not mean every $k$ works. The solution must lie inside $[0,1]$ and be strictly increasing, and that requirement produces the restriction on $\beta$. Put differently, for large $\beta$ the system still has a formal solution, but the partition "runs off the end": the last cell would have to extend past 1, or the first cell would need negative length. The existence condition is read off that failure.

### The length recursion

The algebra can be done, but there is a nicer reading. Look at two adjacent cells, $[t_{j-1},t_j]$ and $[t_j,t_{j+1}]$, meeting at $t_j$.

If the cells were equal, the two midpoints would be symmetric about $t_j$, and the advisor standing at $t_j$ (ideal point $t_j+\beta$, to the right) would strictly prefer the higher decision. To make her indifferent, the average of the two midpoints must shift **right by $\beta$**, i.e. equal $t_j+\beta$.

Moving the right endpoint $t_{j+1}$ to the right moves the midpoint by only half as much, so the endpoint must move by $2\beta$ to move the midpoint by $\beta$; combining with the fixed left endpoint gives

$$
t_{j+1}-t_j=(t_j-t_{j-1})+4\beta .
$$

Check against the two-cell case: the first cell has length $t_1=\frac12-2\beta$ and the second $1-t_1=\frac12+2\beta$, a difference of exactly $4\beta$. ✓

So every partition equilibrium has the same shape: **cells grow longer from left to right, each by $4\beta$**. The first has length $\delta$, the second $\delta+4\beta$, the third $\delta+8\beta$, and the last must land exactly on 1.

### The existence theorem

This yields: a $k$-cell partition equilibrium exists if and only if

$$
\beta<\frac{1}{2k(k-1)} .
$$

Check the two known cases:

- $k=2$: $\frac{1}{2\cdot2\cdot1}=\frac14$, matching $\beta<\frac14$.
- $k=3$: $\frac{1}{2\cdot3\cdot2}=\frac1{12}$.

The direction is clear: $k$ sits in the denominator, squared, so **finer communication demands a much smaller bias**. As $\beta\to0$, $k$ can grow without bound and communication approaches full transparency.

Ball stresses that this inequality is the core result of the paper. It also answers "why not just cut finer": the finer the cut, the narrower each cell, the closer its midpoint to the endpoint, and the larger the relative gain from claiming the next cell up — eventually someone always wants to jump.

### Which equilibrium is best

For a fixed $\beta$ there may be several equilibria: babbling, two cells, three cells, up to some $k_{\max}$. Which one do we expect?

Ball's answer is clean: **the one with the most cells is best for both players**.

For the receiver this is obvious: more cells means finer information, decisions closer to the truth, smaller loss.

For the sender it is less obvious but true. Because the receiver always sets the decision at the expected state, and expectation is linear, the **expected decision equals the expected state** under any partition — the advisor cannot shift the decision systematically. All she can obtain is accuracy: higher decisions in higher states. Finer cells improve exactly that, so she gains too. Ball mentions the formal version: a bias-variance decomposition in which the bias term is fixed and the variance term shrinks with finer cells.

That yields a testable prediction: in an environment with a given bias, expect the most informative equilibrium rather than an arbitrary one. A caveat: the argument relies on treating equilibrium selection as the long-run outcome. The model shows that the finest equilibrium is Pareto best for both players; it does not show how players get there from a coarser one.

## What this lecture establishes

1. Signals work through costly actions; cheap talk works through free messages. Because messages cost nothing, the construction "treat any off-path message as some on-path message" is always available — and it fails in signaling.
2. Perfectly aligned interests need no analysis and perfectly opposed interests transmit nothing. The substantive case is the middle: **same direction, different level**.
3. Full transparency cannot be an equilibrium: if the receiver believed the message, the sender would report $t+\beta$. This is the formal version of dressing a preference as a fact.
4. Two-cell talk works: the threshold is $t_1=\frac12-2\beta$, the decisions are the cell midpoints, and the sender is indifferent at the cutoff. It requires $\beta<\frac14$.
5. The threshold must lean toward 0, making the right cell longer: only a long right cell pushes the high decision far enough to offset the upward bias.
6. A $k$-cell equilibrium exists iff $\beta<\frac{1}{2k(k-1)}$; more cells means finer information, and the finest equilibrium is best for both players.

## Check your understanding

**1. Why does "treat an off-path message as an on-path message" work in cheap talk but not in signaling?**

Because the cost of deviating differs. In cheap talk, when two messages induce the same decision the sender's payoff is identical, so she is indifferent and may as well send the on-path one; no profitable deviation exists. In signaling the action itself is costly: if the employer promised "skip school and I will pay as if you had gone", the student would skip school — strictly better, not indifferent. The difference is not in beliefs but in whether the action enters the payoff function.

**2. With $\beta=0.1$, what are the threshold and the two decisions?**

$t_1=0.5-0.2=0.3$, $y(L)=0.15$, $y(H)=0.65$. Check indifference: $t_1+\beta=0.4$ and $(0.15+0.65)/2=0.4$. Check the boundary: just below $0.3$ the ideal point is just below $0.4$, closer to $0.15$ than to $0.65$, so low is better; just above $0.3$ the reverse. The partition is self-consistent.

**3. Why must the threshold be below 1/2 rather than above it?**

Because the bias is positive. If the threshold exceeded $\frac12$, the left cell would be longer and the right shorter, so the decision induced by "high" would sit close to the threshold while the one induced by "low" would sit far away. An advisor at the threshold has an ideal point $t_1+\beta$, to the right, and would find the high decision closer — so she would say high and the cutoff would not hold. Only a sufficiently long right cell pushes the high decision far enough that even the biased advisor finds it too high.

**4. If β rises from 0.1 to 0.2, does two-cell talk survive?**

Yes. The condition is $\beta<\frac14=0.25$, and $0.2$ satisfies it, so two cells survive — but the threshold becomes $t_1=0.5-0.4=0.1$, the left cell is only $0.1$ wide against $0.9$, and the information content is poor. At $\beta\ge0.25$ we get $t_1\le0$, two-cell talk vanishes, and only babbling remains. So $0.2$ is "alive but bad" and $0.25$ is the boundary.

**5. Why does the requirement on β become so much stricter (quadratically) as k grows?**

Because finer cuts make cells narrower and midpoints closer to endpoints. Lying up one cell buys a decision change of roughly half a cell width, which shrinks like $\frac1k$; meanwhile indifference at each cutoff requires adjacent cells to differ in length by a **fixed** $4\beta$. To fit $k$ cells with lengths differing by $4\beta$ into an interval of length 1, the cumulative difference is about $4\beta\cdot\frac{k(k-1)}{2}$, and requiring this to stay below 1 gives $\beta<\frac{1}{2k(k-1)}$. A fixed difference spread over more and more cells needs a smaller $\beta$.

**6. The advisor is biased, so why is the finest equilibrium good for her too?**

Because she cannot move the average. The receiver always sets the decision at the expected state, and expectation is linear, so under any partition the **expected decision equals the expected state**: the systematic shift is zero. All the advisor can get is accuracy — decisions that rise with the state. Finer cells reduce the variance of the error without touching its bias, so both players gain.
