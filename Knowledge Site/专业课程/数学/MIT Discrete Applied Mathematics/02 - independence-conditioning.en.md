---
slug: 02-independence-conditioning
title: "Conditional Probability, Independence and Expectation: Bayes to the Dice Paradox"
summary: "A dartboard makes conditioning intuitive, four events on two dice separate 'looks independent' from 'is independent', the law of total probability and Bayes' rule follow, real mammogram data and Mossel's dice paradox show where intuition fails, and the lecture closes with random variables, expectation and indicators."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [probability, conditional-probability, independence, expectation]
sources:
  - kind: video
    title: "Lecture 2: Independence and Conditioning"
    url: https://www.youtube.com/watch?v=DxpSDeG7lL4
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## One-sentence orientation

The previous lecture said what probability is; this one says how probability changes once something is known. Everything rests on two definitions — conditional probability and independence — yet their consequences keep colliding with intuition: doctors read $8\%$ as $75\%$, and an expectation that looks like $3$ is actually $3/2$.

The collision is not caused by hard formulas. It is caused by **renormalising the sample space while leaving human intuition un-updated**. A single dartboard picture settles the matter.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Review: sample space, probability measure, uniform distribution, events |
| 2:51 | Conditional probability: definition and the dartboard picture |
| 7:32 | Independence: definition, equivalent form, two-dice example |
| 17:55 | Law of total probability: two-part and general partitions |
| 22:17 | Tree diagrams as a picture of the law |
| 26:48 | Monty Hall, settled by the tree |
| 31:24 | Bayes' rule and its derivation |
| 34:14 | Real data: mammography, $P(\text{cancer}\mid\text{positive})\approx 8\%$ |
| 41:18 | Random variables and the definition of expectation |
| 45:38 | Expected coin flips: $\sum k/2^k=2$ |
| 50:33 | Mean time to failure: $E[T]=1/p$ |
| 54:11 | Indicator functions and linearity of expectation |
| 1:00:52 | Mossel's dice paradox: why the conditional expectation is $3/2$, not $3$ |

## Review: four tools from last time

- **Sample space** $\Omega$: the set of all possible outcomes, possibly infinite.
- **Probability measure** $p$: $p(x)\ge0$ and $\sum_{x\in\Omega}p(x)=1$.
- **Uniform distribution**: on a finite $S$, every outcome gets $p(x)=1/|S|$.
- **Event**: a subset $T\subseteq\Omega$, with probability the sum of the probabilities of its outcomes.

The union $T_1\cup T_2$ means "at least one happens"; the intersection $T_1\cap T_2$ means "both happen". This lecture adds a third way to combine: **given that something happened**.

## Conditional probability: shrink the world to $B$

### Definition

For $P(B)>0$,

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)} .
$$

There is nothing mysterious here: **the probability is renormalised onto $B$**. The original measure spread mass $1$ over $\Omega$; once the outcome is known to lie in $B$, every outcome inside $B$ is divided by $P(B)$ so that the new total mass is again $1$.

### The dartboard picture

Draw the sample space as a rectangle, with probability corresponding to "a dart thrown at random lands in a region with probability proportional to its area".

- Unconditionally, $P(A)$ is the fraction of the whole rectangle covered by $A$.
- Given that the dart lies in $B$, the world shrinks to $B$: $P(A\mid B)$ is the fraction of $B$ covered by $A\cap B$.

The key sentence: **what matters is not how much of $S$ that $A$ occupies, but how much of $B$ that $A\cap B$ occupies**. A set $A$ of fixed size has a small conditional probability if most of it lies outside $B$, and a large one if most of it lies inside.

## Independence: conditioning changes nothing

### Definition and equivalent form

Events $A$ and $B$ are **independent** if

$$
P(A\cap B)=P(A)\,P(B).
$$

When $P(B)>0$, dividing by $P(B)$ and using the definition of conditional probability gives

$$
P(A\mid B)=P(A).
$$

The two conditions are equivalent; use whichever is convenient. In words: **learning whether $B$ happened does not change your assessment of $A$**.

### Example: two rolls of a die

Roll a fair die twice. The sample space is the $36$ ordered pairs $(x_1,x_2)$, each with probability $1/36$.

Let

- $A$: $x_1$ is odd;
- $B$: $x_2\le 3$.

They look independent, since one constrains only the first roll and the other only the second. Compute:

$$
P(A)=\frac{3}{6}=\frac12,\qquad
P(B)=\frac{3}{6}=\frac12,
$$

and $A\cap B$ consists of all pairs with $x_1\in\{1,3,5\}$ and $x_2\in\{1,2,3\}$, namely $3\times3=9$ outcomes, so

$$
P(A\cap B)=\frac{9}{36}=\frac14=\frac12\cdot\frac12=P(A)P(B).
$$

The product structure is exactly where independence comes from: the two events constrain different coordinates, so the counts multiply.

### Counterintuitive case one: $x_1-x_2=3$ is not independent

Let $C$: $x_1-x_2=3$. The outcomes are

$$
(4,1),\ (5,2),\ (6,3),
$$

so $P(C)=3/36$. Now $A\cap C$ contains only $(5,2)$ (since $x_1=5$ is odd), so $P(A\cap C)=1/36$. But

$$
P(A)P(C)=\frac12\cdot\frac{3}{36}=\frac{3}{72}=\frac{1}{24}\ne\frac{1}{36}.
$$

Hence $A$ and $C$ are **not** independent. The reason is visible: $C$ involves both $x_1$ and $x_2$, and therefore shares the dependence on the first roll with $A$.

### Counterintuitive case two: replace $3$ by $4$ and independence appears

Let $D$: $x_1-x_2=4$. The outcomes are

$$
(5,1),\ (6,2),
$$

so $P(D)=2/36$, while $A\cap D=\{(5,1)\}$, so $P(A\cap D)=1/36$. Now

$$
P(A)P(D)=\frac12\cdot\frac{2}{36}=\frac{1}{36}=P(A\cap D).
$$

So $A$ and $D$ **are** independent.

This deserves a pause: both events clearly depend on $x_1$, yet the definition is satisfied. Independence is a **computational property, not a causal one**. When intuition is unsure, substitute into the formula.

## The law of total probability: split a hard probability

### Two-part version

For any events $A$ and $B$,

$$
P(A)=P(A\cap B)+P(A\cap B^{c}),
$$

where $B^{c}$ is the complement of $B$. The reason is one sentence: $A$ splits into "$A$ and $B$" together with "$A$ and not $B$"; the pieces are disjoint and their union is $A$.

Rewriting each piece with conditional probability,

$$
P(A)=P(A\mid B)P(B)+P(A\mid B^{c})P(B^{c}).
$$

This is powerful in practice: when $P(A)$ is hard to compute directly but "the probability of $A$ within each scenario" is easy, split it.

### General version

Let $B_1,\dots,B_k$ be **pairwise disjoint** with union the whole sample space (such a family is a **partition**). Then

$$
P(A)=\sum_{i=1}^{k}P(A\cap B_i)=\sum_{i=1}^{k}P(A\mid B_i)P(B_i).
$$

The two-part version is the special case $B_1=B$, $B_2=B^{c}$.

### The tree diagram

The law has a picture that barely needs memorising: **think of the random process as a tree**.

1. The first level splits into branches $B_1,B_2,\dots$, taken with probabilities $P(B_i)$.
2. After each branch, $A$ happens with probability $P(A\mid B_i)$.
3. The probability of a complete path is the product $P(B_i)P(A\mid B_i)$.
4. Summing the probabilities of all paths that end in $A$ gives $P(A)$.

The leaves are outcomes; the first level is not "the final answer" but "which region the outcome falls in". The value of the picture is that it displays the causal order — what happens first, what happens next.

## Application: Monty Hall

Three doors, a car behind one and goats behind the others. You pick a door; the host, who knows the answer, opens a different door revealing a goat; then you may switch to the remaining unopened door.

**Result: switching wins with probability $2/3$; staying wins with probability $1/3$.**

The tree makes it obvious. The prize is placed uniformly, so

- your first pick is a goat with probability $2/3$;
- your first pick is the car with probability $1/3$.

If your first pick is a goat (probability $2/3$), the host has **no choice**: he must open the only other goat door. The remaining door is then necessarily the car, so switching wins for sure.

If your first pick is the car (probability $1/3$), the host may open either goat door, and switching loses.

Fix the strategy "always switch". Then

$$
P(\text{win})=P(\text{first pick goat})\cdot 1+P(\text{first pick car})\cdot 0=\frac23 .
$$

The tree exposes the point people miss: the host is not opening a door at random — he is forced to avoid the car. Treating his action as an event independent of the prize location is precisely the error.

## Bayes' rule: turn the conditional around

### Formula and derivation

For $P(A)>0$ and $P(B)>0$,

$$
P(B\mid A)=\frac{P(A\mid B)P(B)}{P(A)} .
$$

**Proof.** By definition $P(A\mid B)=P(A\cap B)/P(B)$. Multiply both sides by $P(B)/P(A)$:

$$
P(A\mid B)\cdot\frac{P(B)}{P(A)}=\frac{P(A\cap B)}{P(A)} .
$$

The right-hand side is $P(B\mid A)$, since $A\cap B=B\cap A$. $\square$

The derivation is one line, but its use is subtle: **it converts "the chance of a positive test given disease" into "the chance of disease given a positive test"**. Those two numbers often differ by an order of magnitude.

### Real data: mammography

The lecture stresses that all numbers are real:

- about $1\%$ of women aged $40$–$50$ have breast cancer, so $P(B)=0.01$, where $B$ denotes disease;
- the false positive rate is $10\%$, i.e. $P(A\mid B^{c})=0.10$, where $A$ denotes a positive test;
- the false negative rate is $10\%$, i.e. $P(A^{c}\mid B)=0.10$, equivalently sensitivity $P(A\mid B)=0.90$.

Question: **given a positive test, what is the probability of actually having the disease?**

First compute the denominator with the law of total probability:

$$
P(A)=P(A\mid B)P(B)+P(A\mid B^{c})P(B^{c})
=0.90\times0.01+0.10\times0.99
=0.009+0.099=0.108 .
$$

Then Bayes:

$$
P(B\mid A)=\frac{0.90\times0.01}{0.108}=\frac{0.009}{0.108}\approx0.0833 .
$$

**About $8.3\%$, not $90\%$.**

### Why intuition fails

Lay out the population. Among $10{,}000$ women:

| | Disease | No disease | Total |
| --- | --- | --- | --- |
| Positive | $90$ | $990$ | $1{,}080$ |
| Negative | $10$ | $8{,}910$ | $8{,}920$ |
| Total | $100$ | $9{,}900$ | $10{,}000$ |

There are $1{,}080$ positives, of whom only $90$ truly have the disease — about $8.3\%$.

The error is to stare at "false positives are only $10\%$" while forgetting that **people without the disease outnumber those with it $99$ to $1$**. The base rate decides: even a low error rate produces a large number of false alarms.

The lecture notes that a survey of hundreds of physicians averaged $75\%$ — an order of magnitude too high. This is not a hard calculation; it is a failure to put the prior into the computation.

## Random variables and expectation

### Definition

Events are subsets of the sample space; a **random variable** is a function on the sample space,

$$
f:\Omega\to\mathbb{R},
$$

assigning a real number to each outcome.

The **expectation** is the weighted average

$$
\mathbb{E}[f]=\sum_{x\in\Omega}p(x)\,f(x),
$$

with each outcome weighted by its probability. Payoffs, lifetimes and numbers of coin flips all become random variables.

### Example one: flip until heads

Flip a fair coin until the first head. The sample space consists of

$$
H,\ TH,\ TTH,\ TTTH,\dots
$$

where the sequence with $i$ tails has probability $2^{-(i+1)}$.

Let $f$ be the total number of flips. Then

$$
\mathbb{E}[f]=\sum_{k=1}^{\infty}k\cdot\frac{1}{2^{k}} .
$$

Sum column by column:

$$
\begin{aligned}
&\frac12+\frac14+\frac18+\cdots=1,\\
&\frac14+\frac18+\cdots=\frac12,\\
&\frac18+\cdots=\frac14,
\end{aligned}
$$

so the column totals are $1,\ \frac12,\ \frac14,\dots$ and

$$
1+\frac12+\frac14+\cdots=2 .
$$

Hence the expected number of flips is $2$. The closed form $\sum_{k\ge1}k r^{k-1}=1/(1-r)^2$ with $r=1/2$ gives $4$, times $1/2$, again $2$.

### Example two: mean time to failure

A machine fails independently each day with probability $p$. Let $T$ be the number of days it survives. Then

$$
P(T=1)=p,\qquad P(T=2)=(1-p)p,\qquad P(T=3)=(1-p)^2p,\ \dots
$$

Summing directly is painful, but a recursion settles it. Split on the first day:

- with probability $p$ it fails immediately, $T=1$;
- with probability $1-p$ it survives, at which point **the whole process restarts, one day older**, so the remaining expected lifetime is again $\mathbb{E}[T]$.

Therefore

$$
\mathbb{E}[T]=p\cdot1+(1-p)\cdot(1+\mathbb{E}[T]).
$$

Rearranging,

$$
\mathbb{E}[T]=1+(1-p)\mathbb{E}[T]
\;\Longrightarrow\;
p\,\mathbb{E}[T]=1
\;\Longrightarrow\;
\mathbb{E}[T]=\frac1p .
$$

This memorylessness is the heart of the geometric distribution: having survived so far does not make tomorrow more likely to fail. For the coin example $p=1/2$ gives $\mathbb{E}[f]=2$, matching the column sum.

## Indicator functions and linearity

### Turning events into random variables

For an event $A$, define the **indicator**

$$
\mathbf{1}_A(x)=
\begin{cases}
1, & x\in A,\\
0, & x\notin A .
\end{cases}
$$

Its expectation is exactly the probability of $A$:

$$
\mathbb{E}[\mathbf{1}_A]=\sum_{x\in\Omega}p(x)\mathbf{1}_A(x)=\sum_{x\in A}p(x)=P(A),
$$

because only the terms with $x\in A$ survive. Events and random variables can therefore be translated back and forth at will.

### Linearity

For any random variables $f,g$ and constants $a,b$,

$$
\mathbb{E}[af+bg]=a\mathbb{E}[f]+b\mathbb{E}[g].
$$

This holds for **all** random variables, with no independence required. The proof just splits and rearranges the sum:

$$
\sum_x p(x)\bigl(af(x)+bg(x)\bigr)
=a\sum_x p(x)f(x)+b\sum_x p(x)g(x).
$$

### A trap worth naming

Linearity gives

$$
\mathbb{E}[\mathbf{1}_A+\mathbf{1}_B]=P(A)+P(B).
$$

**But this is not $P(A\cup B)$.** The sum $\mathbf{1}_A+\mathbf{1}_B$ is no longer a $0$–$1$ indicator: on $A\cap B$ it equals $2$. The intersection is counted twice.

The correct relation is

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B),
$$

which is the seed of the next lecture's **inclusion–exclusion**. In expectation language: linearity always holds, but adding indicators is not the same as taking the union of events.

## Mossel's dice paradox

### The question

Roll a fair die until the first $6$ appears, and let $T$ be the number of rolls. Given that **every roll was even**, what is $\mathbb{E}[T\mid\text{all even}]$?

### The wrong intuition: $3$

A natural argument: since every roll is even, only $2,4,6$ are possible; each roll shows $6$ with probability $1/3$; so the expected number of rolls is $1/(1/3)=3$.

It sounds airtight. It is wrong.

### The correct value: $3/2$

First compute the probability of the conditioning event. For the process to stop at roll $k$ with all rolls even, the first $k-1$ rolls must be $2$ or $4$ (probability $2/6=1/3$ each) and the last must be $6$ (probability $1/6$). Hence

$$
P(T=k,\ \text{all even})=\left(\frac13\right)^{k-1}\frac16 .
$$

Summing over $k$,

$$
P(\text{all even})=\sum_{k=1}^{\infty}\left(\frac13\right)^{k-1}\frac16
=\frac16\cdot\frac{1}{1-\frac13}
=\frac16\cdot\frac32=\frac14 .
$$

The conditional distribution is therefore

$$
P(T=k\mid \text{all even})
=\frac{\left(\frac13\right)^{k-1}\frac16}{\frac14}
=\frac23\left(\frac13\right)^{k-1},
$$

a geometric distribution with success probability $2/3$, whose expectation is

$$
\mathbb{E}[T\mid \text{all even}]=\frac{1}{2/3}=\frac32 .
$$

As a check,

$$
\mathbb{E}[T\cdot \mathbf{1}_{\text{all even}}]
=\sum_{k\ge1}k\left(\frac13\right)^{k-1}\frac16
=\frac16\cdot\frac{1}{(1-\frac13)^2}
=\frac16\cdot\frac94=\frac38,
$$

and dividing by $P=1/4$ gives $3/2$.

### What went wrong

Conditioning is not "replace each roll's distribution by the uniform distribution on $\{2,4,6\}$". The event "all rolls are even" **biases the length of the sequence**: the probability of satisfying it decays like $(1/3)^{k-1}$, so long sequences are heavily down-weighted.

The conditional law makes this plain: $\mathbb{E}[T\mid\text{all even}]=3/2<3$, and

$$
P(T=1\mid \text{all even})=\frac{1/6}{1/4}=\frac23 .
$$

That is, **given that all rolls were even, the first roll was a $6$ with probability $2/3$** — because a first roll of $6$ ends the experiment immediately and satisfies the condition automatically, whereas a first roll of $2$ or $4$ forces the process to continue and to stay even for longer and longer.

The lesson: correctness of conditional probability can only be guaranteed by computing. Here intuition is systematically wrong.

## What this lecture establishes

- Conditional probability $P(A\mid B)=P(A\cap B)/P(B)$ **renormalises onto $B$**; what matters is the share of $B$ occupied by $A\cap B$.
- Independence has two equivalent forms: $P(A\cap B)=P(A)P(B)$ or $P(A\mid B)=P(A)$; it must be verified by definition, not by appearance.
- The law of total probability splits $P(A)$ as $\sum_i P(A\mid B_i)P(B_i)$ over a partition; the tree diagram is its picture.
- Bayes' rule $P(B\mid A)=P(A\mid B)P(B)/P(A)$ reverses the conditional; in the mammogram example a positive test implies disease with probability only about $8\%$, because the prior is $1\%$.
- A random variable is a function $\Omega\to\mathbb R$; its expectation is $\sum p(x)f(x)$.
- The geometric distribution has expectation $1/p$: $2$ flips on average to see a head, and $1/p$ days to failure.
- $\mathbb{E}[\mathbf{1}_A]=P(A)$; linearity is unconditional, but $\mathbf{1}_A+\mathbf{1}_B$ is not the indicator of a union — the intersection is double-counted.
- Conditional expectation can depart sharply from naive intuition: Mossel's paradox gives $3/2$, not $3$.

## Comprehension check

**1. Using the dartboard, explain why $P(A\mid B)$ does not depend on the share of the whole sample space occupied by $A$.**

Reference answer: Conditioning shrinks the world from $\Omega$ to $B$: knowing the outcome lies in $B$, we renormalise so that the total probability of $B$ becomes $1$. The only place where $A$ can still occur is $A\cap B$, so
$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}=\frac{\text{share of }B\text{ covered by }A\cap B}{1}.
$$
Any part of $A$ lying outside $B$ is excluded and contributes nothing; conversely, a small $A$ lying almost entirely inside $B$ can have a large conditional probability. The deciding quantity is the size of $A\cap B$ relative to $B$.

**2. Roll a fair die twice. Let $A=\{x_1\text{ odd}\}$, $C=\{x_1-x_2=3\}$, $D=\{x_1-x_2=4\}$. Verify that $A$ and $C$ are dependent while $A$ and $D$ are independent.**

Reference answer: $A$ contains $18$ outcomes, $P(A)=1/2$. $C=\{(4,1),(5,2),(6,3)\}$ with $P(C)=3/36$; $A\cap C=\{(5,2)\}$ with $P(A\cap C)=1/36$. But $P(A)P(C)=\frac12\cdot\frac{3}{36}=\frac1{24}\ne\frac1{36}$, so they are dependent.
$D=\{(5,1),(6,2)\}$ with $P(D)=2/36$; $A\cap D=\{(5,1)\}$ with $P(A\cap D)=1/36$. And $P(A)P(D)=\frac12\cdot\frac{2}{36}=\frac1{36}$, equal, so they are independent. Both events depend on $x_1$, yet independence holds — a computational property, not a causal one.

**3. State the general law of total probability and explain what each condition on the $B_i$ is needed for.**

Reference answer: If $B_1,\dots,B_k$ are pairwise disjoint with $\bigcup_i B_i=\Omega$, then
$$
P(A)=\sum_{i=1}^{k}P(A\mid B_i)P(B_i).
$$
Pairwise disjointness ensures $A$ is cut into non-overlapping pieces $A\cap B_i$, so nothing is counted twice; covering $\Omega$ ensures nothing is missed, so every part of $A$ lies in some $B_i$. Without either condition the identity fails. The two-part version takes $B_1=B$, $B_2=B^c$.

**4. In the mammogram example, if the prevalence were $10\%$ instead of $1\%$ (all else equal), what would $P(B\mid A)$ be, and what does that show?**

Reference answer: $P(A)=0.9\times0.1+0.1\times0.9=0.09+0.09=0.18$, so
$$
P(B\mid A)=\frac{0.9\times0.1}{0.18}=0.5 .
$$
Raising prevalence from $1\%$ to $10\%$ raises the post-positive probability from about $8.3\%$ to $50\%$. The test's sensitivity and false positive rate are unchanged; only the composition of the tested population changed. Ignoring the base rate is the most common conditional-probability error in medicine.

**5. Why is $\mathbb{E}[\mathbf{1}_A+\mathbf{1}_B]=P(A)+P(B)$ true, and why does it not imply $P(A\cup B)=P(A)+P(B)$?**

Reference answer: Linearity of expectation holds for arbitrary random variables with no independence requirement, so the left side indeed equals $P(A)+P(B)$. But $\mathbf{1}_A+\mathbf{1}_B$ and $\mathbf{1}_{A\cup B}$ are different random variables: on $A\cap B$ the former equals $2$ while the latter equals $1$. Hence $P(A\cup B)=\mathbb{E}[\mathbf{1}_{A\cup B}]$ is not $\mathbb{E}[\mathbf{1}_A+\mathbf{1}_B]$. The correct identity is
$$
P(A\cup B)=P(A)+P(B)-P(A\cap B),
$$
the inclusion–exclusion principle; the subtracted term is exactly the double-counted intersection.

**6. In Mossel's paradox, why is "only $2,4,6$ remain, so the expectation is $3$" wrong, and what is the intuitive reading of $3/2$?**

Reference answer: The error is treating conditioning as "each roll is independently uniform on $\{2,4,6\}$". The event is actually "the entire sequence is even", whose probability decays like $(1/3)^{k-1}$, so the conditional law heavily down-weights long sequences. Precisely,
$$
P(T=k\mid\text{all even})=\frac{(1/3)^{k-1}(1/6)}{1/4}=\frac23\left(\frac13\right)^{k-1},
$$
a geometric law with success probability $2/3$, expectation $3/2$. Intuition: under the condition, the first roll is $6$ with probability $P(T=1)/P(\text{all even})=(1/6)/(1/4)=2/3$ — a first roll of $6$ ends the experiment at once and satisfies the condition for free, while a first roll of $2$ or $4$ forces a longer run that must stay even throughout. Conditioning systematically favours early stopping.

## Relation to neighbouring lectures

This lecture pushes the language of events to its limit: conditioning, independence, partitions, trees, Bayes. The next lecture uses inclusion–exclusion to count "at least one event occurs", which answers the double-counting problem raised at the end here. Generating functions, tail bounds and coding theory later reuse these tools, especially the law of total probability and linearity of expectation.

One sentence to keep: **the prior sets the order of magnitude of the posterior, and conditioning changes the whole distribution, not just a number.**
