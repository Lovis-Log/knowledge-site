---
slug: "01-individual-decision-making"
title: "Individual Decision Making: From Preferences to Expected Utility"
summary: "Game theory studies people whose decisions interact. Before adding interaction, the course isolates a single decision maker: under certainty utility is only an ordering, while under uncertainty the numbers themselves start to matter."
updatedAt: "2026-11-08"
content_type: "video-course"
tags:
  - "game-theory"
  - "expected-utility"
  - "risk-aversion"
sources:
  - kind: "video"
    title: "Lecture 1: Introduction to Individual Decision-Making"
    url: "https://www.youtube.com/watch?v=WRibE2nt8wM"
    author: "Ian Ball, MIT OpenCourseWare"
    publishedAt: "2026-05-19"
---

## The shape of this lecture

This course is about game theory, which Aumann compressed into four words: **interactive decision theory**. People make choices, and the consequence of a choice depends on what other people do. The first lecture deliberately sets interaction aside and studies one isolated decision maker. The reason is structural: if we cannot say how a single person chooses when only their own preferences are at stake, there is no foundation for analysing two people reading each other.

So the lecture splits in two, and the split is easy to miss:

1. **Certainty.** Coffee or tea, with known consequences. Utility only needs to encode an **ordering**; the numbers carry no meaning.
2. **Uncertainty.** Walk or take the subway, with unknown weather. Now uncertainty must be converted into beliefs and then into expected utility, and the **size and spacing** of utility numbers suddenly count.

One person, one set of preferences, two different notions of utility. That line runs through the whole course: every later topic — Bayesian games, auctions, signalling — lives on the second side of it.

## Timeline

| Time | Topic |
| --- | --- |
| 0:21 | Myerson's and Aumann's definitions of game theory |
| 1:12 | The beauty contest: guess closest to two-thirds of the average |
| 2:24 | Round one: average about 36, winning guess about 24 |
| 4:06 | Round two: average 21, winning guess 14 |
| 5:00 | The infinite regress of interactive reasoning |
| 6:00 | How preferences and stakes distort predictions |
| 12:17 | Rationality as consistency, not as preference content |
| 17:02 | A three-way choice problem at a cafe |
| 19:12 | Preferences defined by choice behaviour |
| 20:44 | Ordinal utility and its non-uniqueness |
| 25:10 | Decision making under uncertainty |
| 28:35 | Forming beliefs in the face of uncertainty |
| 29:55 | The expected utility assumption and its limits |
| 33:23 | Cardinal utility and the VNM function |
| 36:07 | Expected utility for walking versus the subway |
| 41:11 | The VNM setting: outcome set $Z$ and lotteries $\Delta Z$ |
| 45:50 | Lotteries and expected utility defined |
| 51:46 | Money lotteries as a special case |
| 55:29 | Concavity and risk aversion |

## What game theory is

### Three words in one definition

Two definitions frame the course, both from Nobel laureates. Myerson calls game theory the study of mathematical models of conflict and cooperation between intelligent, rational decision makers. Aumann's version is shorter and, in Ball's view, captures the essentials: **interactive decision theory**.

Ball unpacks it from the easiest word to the hardest.

**Decision makers.** Someone is choosing. What they choose does not matter, and that abstraction is exactly why the theory travels: picking a drink at a cafe, deciding whether to come to MIT, a firm setting a price, a party choosing a platform before an election, a voter choosing a candidate. The applications in this course sit mostly in economics, with some reach into political science and political bargaining.

**Rational.** This is the word that causes trouble. Ball reports that whenever he tells a seatmate on a plane that he is a game theorist, the reply is always the same: "But aren't people irrational?" His answer is that rationality in game theory is not the everyday notion.

In ordinary speech, saying "it is so irrational for that person to support that candidate" evaluates the **content of their preferences**. Game theory never says that. In the rational choice model, **preferences cannot be irrational** — if you like chocolate ice cream, that is simply what you like; how much weight you put on income versus leisure is your business. What can be irrational is a **choice**: if your preference is chocolate and you order vanilla, that is irrational, because you are not maximising your own objective.

So the operative meaning of rationality here is **consistency**: the agent acts with an eye to some coherent objective. Ball is candid that he has only moved the burden from "rational" to "consistent", and that this assumption also holds sometimes and fails sometimes. Over a lifetime, your preferences at twenty differ from your preferences at two, and the model would be a poor description; over today and tomorrow, it is a very good one.

**Interacting.** This is what separates game theory from other decision problems. It is not that many people are choosing — on a morning commute everyone chooses when to leave, but your choice and mine do not affect each other, so that is not a game. The distinguishing feature is **strategic interdependence**: when I choose, I must take account of what you will do, because your action changes my outcome. Penalty kicks and tennis serves are the cleanest illustration. There is no inherent reason to shoot left rather than right; it depends on which way the keeper dives.

### The beauty contest: when reasoning starts to nest

The class plays a game: everyone guesses an integer from 1 to 100, and whoever is closest to **two-thirds of the class average** wins. (A student asks whether each person is first assigned a random number; Ball initially goes along, then corrects himself — no numbers were assigned in this round. That version appears on the problem set.)

Round one: average about 36, winning guess about 24. Round two: average falls to 21, winning guess 14.

The winner's reasoning is worth recording. He began from the idea that random guesses average about 50, took two-thirds to get 33, then judged that others would do the same and took two-thirds again, landing near 22 — right next to the winning 24.

This is the trouble with interactive decisions: **the reasoning refers to itself**. I think about my number, then about what you will guess; to guess what you will guess I must imagine how you think about me; and when you think about me you must consider how I think about you. Ball notes that for a long time people treated this as an infinite regress that could not be analysed at all. Game theory exists to give that regress a formal resting place.

![Iterated reasoning in the beauty contest: starting from a random average of 50 and repeatedly taking two-thirds, guesses converge to zero, while the two classroom rounds produced averages of 36 and 21 and winning guesses of 24 and 14](/images/beauty-contest-regress-en.svg)

*Figure: each layer of reasoning compresses the candidate value to two-thirds of the previous one, converging to zero in theory. Real classrooms reason only two or three layers deep, so intermediate values like 24 and 14 win.*

### Two modelling lessons

Ball closes the game with two warnings, both about what goes wrong when you write a model.

**First, get the preferences right.** After the rules were explained, several people moved their guess to 100. Why? Because their objective was not to win but to make the prediction look silly, or to amuse their friends. That is fine — it is their preference. But a model that assumes everyone wants to win will mispredict. **Before analysing a game, establish what the participants actually care about.**

**Second, the stakes change preferences.** The prize here was pride, so mischief was cheap. With ten dollars on the line, fewer people would sabotage the result; with a hundred thousand, almost nobody would. A large part of the gap between laboratory results and the world comes from this.

## Individual decision making: certainty

### From preference to choice

Strip out interaction and what remains is a standard choice problem. A cafe offers coffee $C$, espresso $E$, and tea $T$. Ignore prices; you may pick exactly one.

The first object to write down is the preference, say

$$
C \succ E \succ T .
$$

A transitivity assumption is hidden in that notation: since $C$ beats $E$ and $E$ beats $T$, $C$ must beat $T$. It is not written out, but it is implied.

Then Ball asks a question that sounds redundant: **what does it mean to prefer coffee?** Philosophers argue about it for a long time; cognitive scientists go to the lab and measure brain activity. Economics takes an almost tautological view — **a preference means a choice**: offered coffee or espresso, I take coffee. That is all. This is the decision-based view of preferences.

One consequence matters later: a preference is a **pairwise** object. It describes which of any two items I would take, i.e. what I would choose from any two-item menu. Only from that primitive can we talk about choices from richer menus.

### Ordinal utility: only order counts

Pairs of inequality signs are clumsy, so replace them with a utility function:

$$
u(C)=5,\qquad u(E)=4,\qquad u(T)=1 .
$$

These numbers represent the preferences because $u(C)>u(E)>u(T)$. Transitivity comes for free: if one number exceeds a second and the second exceeds a third, the first exceeds the third.

But this representation is not unique. The function

$$
u'(C)=100,\qquad u'(E)=50,\qquad u'(T)=0
$$

encodes **the same preferences**. This is an **ordinal** utility representation: only the order carries information.

Two consequences follow:

- The same preferences have **infinitely many** utility representations.
- The **units and magnitudes carry no meaning**. People sometimes call the unit a "util", but from the preference standpoint the claim "I like coffee more in this world than in that one" has no content — the two numberings are two notations for one fact.

A student raises a modelling trap: if tea makes you miserable, must you include a "drink nothing" option? Yes. When you write down a choice problem, **every available option belongs in the set**. And if you can order both coffee and espresso, the bundle is a separate option in its own right, not something to be fudged by adding two utilities together.

## Individual decision making: uncertainty

### Beliefs and expected utility

Now the problem becomes uncertain: walk home or take the subway (Ball writes $T$ for the T to avoid two words starting with S). The weather may be sunny or rainy. You prefer walking when it is sunny and the subway when it rains.

If the weather were known, there would be nothing to solve. The difficulty is that you do not know. What do you do? A student answers: check the weather app. And the app gives you more than sun or rain — it gives you a likelihood.

**In the face of uncertainty, you form beliefs.** This is the foundational move of the whole course. Game theory takes a thoroughly Bayesian view: not knowing whether it will rain is no obstacle to assigning probability $p$ to sun and $1-p$ to rain.

Put utilities on the four outcomes:

| | Sunny | Rainy |
| --- | --- | --- |
| Walk $W$ | 7 | 2 |
| Subway $T$ | 5 | 5 |

Given beliefs, how do you choose? Ball first disposes of two plausible alternatives:

- The **optimist** says: walking can yield 7, the subway at best yields 5, so walk.
- The **pessimist** says: walking can fall to 2, the subway guarantees 5, so take the subway.

The course adopts **expected utility** instead. Optimism and pessimism should live in your beliefs, not in your decision rule: an optimist can believe $p$ is high and a pessimist can believe it is low, but given beliefs both apply the same rule.

Ball is explicit that this is an **assumption**, not a theorem. The lecture notes carry an appendix on its axiomatic foundations; the course simply takes it as given. He also names its weak point. Estimating the chance of rain tomorrow is easy; estimating the probability that your income in fifteen years falls in some range is hard; estimating whether a great-great-grandchild will be short of money is close to absurd. Belief formation is realistic in simple problems and questionable in very rich ones.

### Walking or the subway: a worked example

With sunny probability $p$,

$$
U(W)=7p+2(1-p)=2+5p,\qquad U(T)=5p+5(1-p)=5 .
$$

The subway's expected utility is 5 regardless of the weather, since it pays 5 either way. Walking rises linearly in $p$. Comparing,

$$
2+5p \ge 5 \iff p \ge \tfrac{3}{5}.
$$

So you walk whenever you believe the chance of sun exceeds 60 percent.

A student asks what happens exactly at $p=\tfrac{3}{5}$. Ball concedes the board was written loosely and gives the correct statement: there are **three** possibilities — strictly prefer walking, strictly prefer the subway, or be **indifferent**. At $p=\tfrac{3}{5}$ both expected utilities equal 5, so there is no intrinsic reason to favour either; the person might randomise, might pick one, might pick the other, and the model takes no position on behaviour under indifference.

Where did the 60 percent come from? From the numbers in the utility table. Raise the sunny-walking payoff from 7 to 700 and you walk unless rain is nearly certain. **That is precisely what cardinal utility means: the magnitudes change the conclusion.**

### Cardinal utility: why the numbers suddenly matter

The earlier claim that numbers are meaningless is not contradicted here; the setting has changed.

- **Ordinal**: only order matters, used when there is no uncertainty.
- **Cardinal**: magnitudes and gaps matter, used when there is uncertainty.

Why must the second be cardinal? Because expected utility takes a weighted average. If $u(W\mid\text{sun})$ changes from 7 to 700, then $7p+2(1-p)$ becomes $700p+2(1-p)$ and the answer flips. **Anything that gets averaged must support addition and multiplication, and therefore must treat its values as meaningful.**

Almost the entire course lives under uncertainty, so its utility functions are cardinal. The formal name is the **Von Neumann–Morgenstern utility function**, or VNM.

![How ordinal and cardinal utility divide the work: under certainty only the ordering matters and rescaling changes nothing; under uncertainty expected values are computed and the magnitudes change the answer](/images/ordinal-vs-cardinal-en.svg)

*Figure: these are not old and new versions of one idea but two tools for two problems. The dividing line is uncertainty; the test is whether a weighted average is taken.*

## The VNM setting

With the example in hand, Ball abstracts. This three-step rhythm — small example, general model, substantive application — repeats in every lecture.

### Outcomes, lotteries, and expected utility

Let $Z=\{z_1,\dots,z_m\}$ be the **outcome set**, each $z$ a complete consequence. The definition of an outcome needs care: the walking example has **four** outcomes, not two — walk in sun, walk in rain, subway in sun, subway in rain. An outcome must capture everything relevant about the situation. It is not what you choose directly; what you choose is a **lottery over outcomes**.

The VNM utility function maps

$$
u: Z \to \mathbb{R},
$$

assigning a cardinal utility to each outcome.

A **lottery** is a probability vector $p=(p_1,\dots,p_m)$ with

$$
p_i \ge 0,\qquad \sum_{i=1}^{m} p_i = 1 .
$$

The set of all lotteries is written $\Delta Z$. The word is abstract here: it does not mean buying a ticket, only "outcome $z_i$ occurs with probability $p_i$".

**Expected utility** is a function on lotteries,

$$
U:\Delta Z \to \mathbb{R},\qquad U(p)=\sum_{i=1}^{m} p_i\, u(z_i).
$$

Keep the two symbols apart:

| Symbol | Domain | Question it answers |
| --- | --- | --- |
| small $u$ | outcome set $Z$ | how satisfied am I with an **outcome** |
| big $U$ | lottery set $\Delta Z$ | what is my expected utility from a **lottery** |

Back to the example. Label the four outcomes $z_1$ (sun, walk), $z_2$ (rain, walk), $z_3$ (sun, subway), $z_4$ (rain, subway). The choice "walk" corresponds to the lottery

$$
p=(p,\;1-p,\;0,\;0),
$$

with the last two entries zero because walking rules out the subway. Then

$$
U(p)=p\,u(z_1)+(1-p)\,u(z_2)+0+0=7p+2(1-p),
$$

matching the earlier hand calculation.

### Preferences versus the choice set

A student asks whether computing this function already presupposes a chosen lottery.

Ball's answer separates two objects. **Preferences** are defined over **all** lotteries: in principle you can ask yourself whether you would prefer a stock that always returns 1000 percent to one that always returns negative 1000 percent, and the answer is obvious even though no such stock is listed. **Choice** happens on a **limited menu**: in reality you pick among a few available lotteries.

That distinction matters later. In individual decision making, uncertainty is entirely **exogenous** — you do not control the weather, you only form beliefs about it. Once interaction enters, the question becomes how to form beliefs about other people's choices, and those beliefs need more structure. That is exactly what Nash equilibrium supplies.

## Money lotteries and risk aversion

### Expected value is not expected utility

The last special case is the most important one: a **money lottery**, where the outcome set is the real line, $Z=\mathbb{R}$, and each outcome is an amount of money.

Take two lotteries:

- Lottery A: 10 dollars with probability $0.99$, zero with probability $0.01$.
- Lottery B: 1000 dollars with probability $0.01$, zero with probability $0.99$.

Their monetary expected values are

$$
\mathbb{E}[A]=0.99\times 10=9.90,\qquad \mathbb{E}[B]=0.01\times 1000=10 .
$$

B has the higher expected value. Yet most people in the room say they prefer A, because it is safer. They are not miscalculating; the point is that **people maximise expected utility, not expected money**.

This answers a puzzle dating to the eighteenth century: if B has the higher expected value, why would anyone take A? Because $u$ is not money. When $u$ is **concave**, the person is **risk averse**.

### Concavity and the definition of risk aversion

Formally, a person is risk averse if, between a lottery $p$ and the certain receipt of that lottery's expected value, they always prefer the latter:

$$
u\!\left(\sum_i p_i z_i\right) \;>\; \sum_i p_i\, u(z_i)
$$

for every non-degenerate lottery (non-degenerate meaning it is not "outcome $z$ with probability one"). The left side takes the expected value first and then applies utility; the right side applies utility first and then averages. **A concave function makes the left side larger** — this is Jensen's inequality.

![A concave utility curve and risk aversion: at the lottery's expected value EV the curve sits above the chord, so u(EV) exceeds the expected utility EU, and the gap is the risk premium](/images/risk-aversion-concavity-en.svg)

*Figure: for a lottery paying 0 or 1000 with equal probability, the utility of the expected value, $u(500)$, sits well above the chord's midpoint; the certainty equivalent is only 250, and the missing 250 is what this person would pay to remove the risk.*

If $u$ is convex the person is risk loving; if $u$ is linear, so that utility is proportional to money, maximising expected utility coincides with maximising expected money and the person is risk neutral. All three attitudes are encoded in the shape of $u$, with no extra assumption needed.

## What this lecture establishes

1. Game theory is **interactive decision theory**: I choose while accounting for what you will do. The mark of a game is **strategic interdependence**, not the mere presence of many people.
2. **Rationality here means consistency**, not the content of preferences. Preferences cannot be irrational; choices can.
3. **Certainty calls for ordinal utility.** Only the order counts; one preference ordering has infinitely many representations; magnitudes and units mean nothing.
4. **Uncertainty calls for cardinal (VNM) utility.** Because a weighted average is taken, magnitudes and gaps must count. This is the working environment for the rest of the course.
5. **Decision making has two steps**: form beliefs about the uncertainty, then maximise expected utility given those beliefs. Optimism and pessimism belong in the beliefs, not the rule.
6. **Expected utility is not expected money.** A person with a concave utility function is risk averse and will give up expected value to remove variance.

## Check your understanding

**1. A classmate objects: "I don't buy the rationality assumption, because I know plenty of people who buy lottery tickets that obviously lose money." Does the objection land?**

Not really. Buying a ticket can be perfectly consistent: if the days spent imagining the win are worth enough to that person, then under their utility function the ticket maximises expected utility. Game theory does not police preference content; it requires choices to be consistent with preferences. A sharper objection would be **inconsistency** — the same person buying lottery tickets (risk loving) and full insurance (risk averse) with no belief difference to explain it. Behavioural economics documents such patterns; that is a separate argument.

**2. Under ordinal utility, $u(C)=5,u(E)=4,u(T)=1$ and $u'(C)=100,u'(E)=50,u'(T)=0$ represent the same preferences. What about $u''(C)=5,u''(E)=4.9,u''(T)=1$?**

Also the same preferences. The only test is whether the induced pairwise comparisons agree, and all three order $C \succ E \succ T$. Note that $u'$ stretches the gap between $C$ and $E$ from 1 to 50 and $u''$ compresses it to 0.1; in an ordinal world that is meaningless. Under uncertainty those gaps would enter an expected-utility comparison, and the three functions would no longer be equivalent.

**3. In the walking example, if the sunny payoff to walking rises to 12 with everything else unchanged, what is the new threshold?**

$U(W)=12p+2(1-p)=2+10p$, so $2+10p\ge 5$ gives $p\ge 0.3$. The threshold falls from 60 to 30 percent: raising the sunny payoff from 7 to 12 makes this person willing to walk even when they expect rain more often than not. This is cardinal utility doing visible work.

**4. Why does the VNM outcome set have four elements rather than two (walk, subway)?**

Because an outcome must record the full combination of action and state. Walking in sun and walking in rain are different consequences with utilities 7 and 2. With only two outcomes you could not express that the same action pays differently in different states, and expected utility could not be computed at all. Confusing **actions** with **outcomes** is the most common beginner's modelling error here.

**5. What shape does a risk-neutral utility function have, and which lottery would such a person pick above?**

Linear: $u(x)=ax+b$ with $a>0$. Then $U(p)=a\sum p_i z_i+b$, a monotone transform of expected money, so maximising expected utility is the same as maximising expected money. This person picks B, whose expected value of 10 beats A's 9.90. Only strict concavity produces the willingness to trade expected value for lower variance.

**6. Why did some students guess 100 in the classroom game, and what does that reveal about modelling?**

Their objective was not to win but to scramble the result and amuse their friends. The model's **preference specification** was wrong for them: assuming everyone maximises the probability of winning produces systematically bad predictions. The lesson is to establish participants' actual objectives before writing the game, and to watch the **stakes** — when the prize is pride, mischief is cheap; when it is a hundred thousand dollars, almost nobody sabotages. Extrapolating lab results to the world usually goes wrong exactly here.
