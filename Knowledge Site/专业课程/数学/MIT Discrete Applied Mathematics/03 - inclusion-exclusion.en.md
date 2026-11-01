---
slug: 03-inclusion-exclusion
title: "Inclusion–Exclusion: From Derangements to 1/e"
summary: "A random hand-back of graded problem sets motivates inclusion–exclusion. We correct over- and under-counting on the n=2 and n=3 Venn diagrams, state the general formula and prove it by induction, apply it to get the derangement probability tending to 1/e, then use linearity of expectation to show the expected number of correct returns is 1, solve the coupon collector problem, and introduce independence of random variables, variance and its additivity."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [probability, inclusion-exclusion, binomial-coefficient, expectation, variance]
sources:
  - kind: video
    title: "Lecture 3: Inclusion-Exclusion"
    url: https://www.youtube.com/watch?v=cqPcQ3QqYnE
    author: Ankur Moitra, MIT OpenCourseWare
    publishedAt: 2025-12-18
---

## A problem about handing back problem sets

A class of $n$ students submits one problem set each. After grading, the sets are handed back **at random** — equivalently, a uniformly random permutation of the $n$ sets is chosen.

What is the probability that **nobody receives their own problem set**?

This is the classical derangement problem. Intuitively, when $n$ is large the probability should settle near some constant — and that constant turns out to be $1/e\approx0.368$.

The tool that produces the answer is **inclusion–exclusion**. Its idea is as plain as can be: count in the crudest possible way, notice that you over-counted, subtract the excess, notice that you subtracted too much, add something back, and keep correcting until the count is exact.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Motivation: random hand-back, probability that nobody is correct |
| 1:41 | Splitting into events; the idea of inclusion–exclusion |
| 3:40 | Venn diagram: the correction for $n=2$ |
| 5:21 | $n=3$: why the triple intersection must be added back |
| 8:20 | Concrete numbers in the small cases |
| 12:34 | The general formula |
| 15:49 | Back to the problem: $P(A_i)=1/n$, $P(A_i\cap A_j)=1/(n(n-1))$ |
| 18:27 | Binomial coefficients and the number of terms |
| 22:57 | Summing to $1-1/2!+1/3!-\cdots$ and $1/e$ |
| 26:26 | Inductive proof of the formula |
| 38:31 | Linearity of expectation: expected number of correct returns is $1$ |
| 41:28 | Turning to variance; the birthday problem |
| 43:27 | The coupon collector and $nH_n$ |
| 52:13 | Independence of random variables |
| 1:08:20 | Variance: two formulas and additivity under independence |

## Writing the problem in terms of events

Let $A_i$ be the event that student $i$ receives their own problem set. We want

$$
P(\overline{A_1}\cap\overline{A_2}\cap\cdots\cap\overline{A_n}).
$$

This intersection is hard to compute directly, but its complement is easy to describe: **at least one student receives their own set**. By De Morgan,

$$
\overline{\overline{A_1}\cap\cdots\cap\overline{A_n}}=A_1\cup A_2\cup\cdots\cup A_n .
$$

Hence

$$
P(\text{nobody correct})=1-P(A_1\cup\cdots\cup A_n).
$$

The problem reduces to computing the probability of a union of $n$ events.

## Inclusion–exclusion: over-count, then correct

![Figure](/images/inclusion-exclusion-rich-en.svg)

*Figure：The n=3 derangement example: Venn counts, the correction ladder, the general formula。*

### The case $n=2$

Draw two overlapping disks $A_1$ and $A_2$. The crudest estimate is

$$
P(A_1)+P(A_2).
$$

Under this count the intersection $A_1\cap A_2$ is counted twice, so subtract one copy:

$$
P(A_1\cup A_2)=P(A_1)+P(A_2)-P(A_1\cap A_2).
$$

That is inclusion–exclusion in embryo.

For our problem with $n=2$: the only permutations of two students are "both correct" and "they swap". Therefore

$$
P(A_1)=\frac12,\quad P(A_2)=\frac12,\quad P(A_1\cap A_2)=\frac12,
$$

since the only outcome satisfying both is the identity permutation. Thus

$$
P(A_1\cup A_2)=\frac12+\frac12-\frac12=\frac12,
\qquad
P(\text{nobody correct})=1-\frac12=\frac12 .
$$

Note that $P(A_1\cap A_2)=1/2\ne1/4$: the events are **not independent**. Once the first student receives their own set, the remaining set is forced, so the second student is automatically correct. This is exactly why the problem cannot be handled by naive multiplication.

### The case $n=3$

Adding the three single events over-counts the pairwise overlaps; subtracting the three pairwise intersections over-corrects the **common centre** $A_1\cap A_2\cap A_3$, which was added three times and subtracted three times — net count zero. So add it back once:

$$
P(A_1\cup A_2\cup A_3)
=P(A_1)+P(A_2)+P(A_3)
-P(A_1\cap A_2)-P(A_1\cap A_3)-P(A_2\cap A_3)
+P(A_1\cap A_2\cap A_3).
$$

Plug in: $P(A_i)=1/3$; if two students are correct, the third has no choice, so $P(A_i\cap A_j)=1/6$; and the triple intersection is again only the identity, $P(A_1\cap A_2\cap A_3)=1/6$. Hence

$$
P(\text{at least one correct})=3\cdot\frac13-3\cdot\frac16+\frac16
=1-\frac12+\frac16=\frac23,
$$

$$
P(\text{nobody correct})=1-\frac23=\frac13 .
$$

This matches $D_3/3!=2/6=1/3$, where $D_3$ is the number of derangements.

### The general formula

For arbitrary events $A_1,\dots,A_n$,

$$
P\!\left(\bigcup_{i=1}^{n}A_i\right)
=\sum_{i}P(A_i)
-\sum_{i<j}P(A_i\cap A_j)
+\sum_{i<j<k}P(A_i\cap A_j\cap A_k)
-\cdots
+(-1)^{n+1}P(A_1\cap\cdots\cap A_n).
$$

In words: **singles add, pairs subtract, triples add, quadruples subtract**, signs alternating up to the $n$-fold intersection.

Why must the signs alternate? Consider an outcome lying in exactly $r$ of the events. It is counted

$$
\binom{r}{1}-\binom{r}{2}+\binom{r}{3}-\cdots+(-1)^{r+1}\binom{r}{r}
=1-(1-1)^r=1
$$

times, since the binomial expansion gives $(1-1)^r=0$ for $r\ge1$. Every outcome is therefore counted exactly once.

## Back to the original problem

### The individual probabilities

Handing back the sets is a uniformly random choice among the $n!$ permutations. For any $i$,

$$
P(A_i)=\frac{(n-1)!}{n!}=\frac1n .
$$

For $r$ specified students all to be correct, the other $n-r$ sets can be permuted freely, so

$$
P(A_{i_1}\cap\cdots\cap A_{i_r})
=\frac{(n-r)!}{n!}
=\frac{1}{n(n-1)\cdots(n-r+1)} .
$$

This is the conditional-probability reading: the first student is correct with probability $1/n$; given that, the second is correct with probability $1/(n-1)$; and so on.

### Counting the terms: binomial coefficients

In the inclusion–exclusion formula there are $\binom{n}{r}$ terms at level $r$, where

$$
\binom{n}{r}=\frac{n(n-1)\cdots(n-r+1)}{r!}=\frac{n!}{r!\,(n-r)!}.
$$

It counts the ways to choose $r$ objects from $n$. The numerator chooses them in order — $n$ choices, then $n-1$, and so on — but that counts each set $r!$ times, hence the division. In particular

$$
\binom{n}{2}=\frac{n(n-1)}{2}.
$$

### Summing

Multiply the number of terms by the value of each term:

$$
P\!\left(\bigcup_i A_i\right)
=\binom{n}{1}\frac{1}{n}
-\binom{n}{2}\frac{1}{n(n-1)}
+\binom{n}{3}\frac{1}{n(n-1)(n-2)}
-\cdots
$$

Enormous cancellation occurs. For the second term,

$$
\binom{n}{2}\cdot\frac{1}{n(n-1)}
=\frac{n(n-1)}{2}\cdot\frac{1}{n(n-1)}
=\frac{1}{2!},
$$

and in general the $r$-th term equals $1/r!$. Therefore

$$
P(\text{at least one correct})
=1-\frac{1}{2!}+\frac{1}{3!}-\frac{1}{4!}+\cdots+(-1)^{n+1}\frac{1}{n!}.
$$

So

$$
P(\text{nobody correct})
=1-P(\text{at least one correct})
=\frac{1}{2!}-\frac{1}{3!}+\cdots+(-1)^{n}\frac{1}{n!}.
$$

Padding with the cancelling first two terms $1-1=0$, this is

$$
P(\text{nobody correct})=\sum_{r=0}^{n}\frac{(-1)^r}{r!}.
$$

As $n\to\infty$,

$$
\sum_{r=0}^{\infty}\frac{(-1)^r}{r!}=\frac1e\approx0.3679 .
$$

**The number $e$ emerges from a pure permutation-counting problem.** Numerically: $1/2$ for $n=2$, $1/3$ for $n=3$, $9/24=0.375$ for $n=4$, after which the values oscillate around $1/e$ and converge quickly.

### A useful heuristic

Strictly, the $A_i$ are not independent. But for large $n$ they are "almost independent": whether the first student is correct changes the second student's chance by only about $1/n$. So the loose calculation

$$
P(\text{nobody correct})\approx\prod_{i=1}^{n}\left(1-\frac1n\right)
=\left(1-\frac1n\right)^{n}\xrightarrow[n\to\infty]{}\frac1e
$$

gives the right answer. This is **not a proof** — independence fails — but inclusion–exclusion is exactly what turns the "almost independent" intuition into a theorem.

## Inductive proof of inclusion–exclusion

**Theorem.** The formula above holds for all events $A_1,\dots,A_n$.

**Proof.** Induct on $n$. The case $n=2$ is the Venn-diagram identity.

Assume the formula holds for $n$, and set $C=A_1\cup\cdots\cup A_n$. Consider the formula for $n+1$ events and split its terms into those **not containing** $A_{n+1}$ and those **containing** $A_{n+1}$.

The terms not containing $A_{n+1}$ are precisely the inclusion–exclusion formula for the first $n$ events, so by the induction hypothesis they sum to $P(C)$.

The terms containing $A_{n+1}$ have the opposite sign to their counterparts in the $n$-event formula. Define helper events

$$
B_i=A_i\cap A_{n+1}\qquad(i=1,\dots,n).
$$

Then that group of terms is $-1$ times the inclusion–exclusion formula applied to $B_1,\dots,B_n$, because

$$
B_i\cap B_j=(A_i\cap A_{n+1})\cap(A_j\cap A_{n+1})=A_i\cap A_j\cap A_{n+1}
$$

(intersecting twice with $A_{n+1}$ is the same as once). By the induction hypothesis the group equals

$$
-P(B_1\cup\cdots\cup B_n)
=-P\bigl((A_1\cup\cdots\cup A_n)\cap A_{n+1}\bigr)
=-P(C\cap A_{n+1}).
$$

Adding the two groups gives

$$
P(C)+P(A_{n+1})-P(C\cap A_{n+1}),
$$

which is the $n=2$ identity applied to $C$ and $A_{n+1}$, hence equals $P(C\cup A_{n+1})=P(A_1\cup\cdots\cup A_{n+1})$. This completes the induction. $\square$

What matters here is not the algebra but the **structure**: split the $n+1$ expression into "the old formula" and "minus the old formula", then reinterpret the latter in terms of new helper events. Designing the reader's path through a proof matters more than checking it line by line.

## One line with linearity of expectation

Inclusion–exclusion took a whole lecture to get "nobody correct". Now ask a neighbouring question: **what is the expected number of students who receive their own set?**

Define

$$
X=\sum_{i=1}^{n}\mathbf{1}_{A_i},
$$

the number of correct returns. By linearity of expectation, with no independence assumption whatsoever,

$$
\mathbb{E}[X]=\sum_{i=1}^{n}\mathbb{E}[\mathbf{1}_{A_i}]
=\sum_{i=1}^{n}P(A_i)
=\sum_{i=1}^{n}\frac1n=1 .
$$

**The expectation is exactly one**, independent of $n$.

This is where linearity earns its keep: it sidesteps dependence entirely. The $A_i$ are highly correlated — one correct return drastically changes everyone else's chances — yet additivity of expectation does not care. The lecture stresses the contrast: this works for expectations, but not for products of expectations, and not for variances.

## The coupon collector problem

### The question

Each newspaper comes with one of $n$ coupons, uniformly and independently. How many newspapers must be bought on average to collect all $n$? With $n=365$, this is "how many students must be asked to see every birthday".

### Split into stages

The key trick is again to decompose a complicated random variable into simple ones. Let

$$
T=T_0+T_1+\cdots+T_{n-1},
$$

where $T_i$ is the number of newspapers needed to go from $i$ distinct coupons to $i+1$.

Having collected $i$ kinds, the probability that the next paper brings a **new** one is

$$
p_i=\frac{n-i}{n},
$$

since $n-i$ of the $n$ kinds are still unseen. Attempts are independent, so $T_i$ is geometric with success probability $p_i$, and by the previous lecture

$$
\mathbb{E}[T_i]=\frac1{p_i}=\frac{n}{n-i}.
$$

### Summing

$$
\mathbb{E}[T]=\sum_{i=0}^{n-1}\frac{n}{n-i}
=n\left(\frac1n+\frac1{n-1}+\cdots+\frac11\right)
=nH_n,
$$

where $H_n=\sum_{k=1}^{n}1/k$ is the $n$-th harmonic number. For $n=365$,

$$
H_{365}\approx6.47,
\qquad
\mathbb{E}[T]\approx6.47\times365\approx2361 .
$$

So about $2361$ students must be asked to cover all $365$ birthdays — roughly $6.5$ times the number of days.

### Asymptotics

Since $H_n\approx\ln n+\gamma$ with $\gamma\approx0.577$,

$$
\mathbb{E}[T]=nH_n\approx n\ln n .
$$

The rule of thumb "covering $n$ kinds takes $n\log n$ draws" follows. Intuition: with $k$ kinds still missing, each draw hits a new one with probability $k/n$, so waiting takes $n/k$ draws; summing $k=1,\dots,n$ gives $nH_n$.

## Independence of random variables

The previous lecture defined independence for events; now extend it to random variables.

**Definition.** Random variables $f,g$ are **independent** if for all real $\alpha,\beta$ the events

$$
\{x:f(x)=\alpha\},
\qquad
\{x:g(x)=\beta\}
$$

are independent:

$$
P(f=\alpha,\ g=\beta)=P(f=\alpha)\,P(g=\beta).
$$

Note the quantifier "for all $\alpha,\beta$", which makes verification much harder than for events.

Consistency check: take $f=\mathbf{1}_A$ and $g=\mathbf{1}_B$; then $\alpha,\beta$ need only range over $0,1$ and the definition collapses to independence of the events $A$ and $B$. So independence of random variables genuinely extends independence of events.

### Lemma: the product rule for independent variables

**Lemma.** If $f,g$ are independent, then

$$
\mathbb{E}[fg]=\mathbb{E}[f]\,\mathbb{E}[g].
$$

**Proof.** Expand the definition and partition the sample space according to the values taken:

$$
\mathbb{E}[fg]=\sum_{x}p(x)f(x)g(x)
=\sum_{\alpha,\beta}\alpha\beta\sum_{x:\,f(x)=\alpha,\,g(x)=\beta}p(x).
$$

The inner sum is $P(f=\alpha,\ g=\beta)$. By independence,

$$
\mathbb{E}[fg]
=\sum_{\alpha,\beta}\alpha\beta\,P(f=\alpha)P(g=\beta)
=\left(\sum_{\alpha}\alpha P(f=\alpha)\right)
 \left(\sum_{\beta}\beta P(g=\beta)\right)
=\mathbb{E}[f]\,\mathbb{E}[g].
$$

The last step factors the double sum and recognises each factor as the expectation written by grouping equal values. $\square$

### Independence cannot be dropped

Take $f=\mathbf{1}_A$ and $g=\mathbf{1}_{A^{c}}$ with $0<P(A)<1$. They are clearly dependent. Then

$$
fg=\mathbf{1}_{A}\mathbf{1}_{A^{c}}=0
\quad\Longrightarrow\quad
\mathbb{E}[fg]=0,
$$

yet

$$
\mathbb{E}[f]\,\mathbb{E}[g]=P(A)\,(1-P(A))>0 .
$$

So without independence the lemma fails. The counterexample also pinpoints the step where independence is used: splitting the joint probability into a product.

## Variance

### Definition

The **variance** of a random variable $f$ is

$$
\operatorname{Var}(f)=\mathbb{E}\left[\bigl(f(x)-\mathbb{E}[f]\bigr)^2\right].
$$

It shifts the distribution so its centre is $0$, then averages the squared deviations. Variance is a coarse measure of **how spread out** the random variable is.

### Two equivalent formulas

Expand the square and use linearity:

$$
\begin{aligned}
\operatorname{Var}(f)
&=\mathbb{E}\left[f^2-2f\,\mathbb{E}[f]+(\mathbb{E}[f])^2\right]\\
&=\mathbb{E}[f^2]-2\mathbb{E}[f]\,\mathbb{E}[f]+(\mathbb{E}[f])^2\\
&=\mathbb{E}[f^2]-(\mathbb{E}[f])^2 .
\end{aligned}
$$

The middle line uses one key fact: $\mathbb{E}[f]$ is a **constant**, not a random variable, so it factors out of the expectation. Both forms are useful in different situations.

### Two basic properties

- **Non-negativity**: $\operatorname{Var}(f)\ge0$, since it is the expectation of a non-negative random variable.
- **Zero means constant**: $\operatorname{Var}(f)=0$ if and only if $f$ is constant. If the variance is zero, the expectation of $(f-\mathbb{E}[f])^2$ is zero; being non-negative, it must vanish identically, so $f=\mathbb{E}[f]$ everywhere.

### Variances add for independent variables

**Theorem.** If $f,g$ are independent, then

$$
\operatorname{Var}(f+g)=\operatorname{Var}(f)+\operatorname{Var}(g).
$$

**Proof.** Write $\mu_f=\mathbb{E}[f]$, $\mu_g=\mathbb{E}[g]$. By definition and linearity,

$$
\begin{aligned}
\operatorname{Var}(f+g)
&=\mathbb{E}\left[\bigl((f-\mu_f)+(g-\mu_g)\bigr)^2\right]\\
&=\mathbb{E}\left[(f-\mu_f)^2\right]
+2\,\mathbb{E}\left[(f-\mu_f)(g-\mu_g)\right]
+\mathbb{E}\left[(g-\mu_g)^2\right]\\
&=\operatorname{Var}(f)+\operatorname{Var}(g)
+2\,\mathbb{E}\left[(f-\mu_f)(g-\mu_g)\right].
\end{aligned}
$$

Only the cross term remains. By independence, $f-\mu_f$ and $g-\mu_g$ are independent, so the expectation of the product is the product of expectations:

$$
\mathbb{E}\left[(f-\mu_f)(g-\mu_g)\right]
=\mathbb{E}[f-\mu_f]\,\mathbb{E}[g-\mu_g]=0\cdot0=0 .
$$

The cross term vanishes, proving the claim. $\square$

Linearity alone is not enough here: without independence the cross term is generally nonzero and variances do not add. This is the contrast the lecture keeps emphasising — **linearity of expectation is unconditional; additivity of variance requires independence**.

## Where these tools lead

Additivity of variance is the seed of the concentration inequalities later in the course. Consider polling: sample $n$ people, each supporting a candidate with probability $p$, and let $\hat p$ be the sample proportion,

$$
\hat p=\frac1n\sum_{i=1}^{n}\mathbf{1}_{A_i}.
$$

Each indicator has variance $p(1-p)$; by independence,

$$
\operatorname{Var}(\hat p)=\frac{1}{n^2}\cdot n\,p(1-p)=\frac{p(1-p)}{n}.
$$

The variance decays like $1/n$, so the standard deviation decays like $1/\sqrt n$ — the origin of "quadruple the sample, halve the error". Later lectures turn this into rigorous confidence intervals via tail bounds.

## What this lecture establishes

- Inclusion–exclusion: the probability of a union equals "singles − pairs + triples − …", with alternating signs.
- Why signs alternate: an outcome in exactly $r$ events is counted $\sum_{k=1}^r(-1)^{k+1}\binom rk=1$ time.
- Derangements: $P(\text{nobody correct})=\sum_{r=0}^{n}(-1)^r/r!\to1/e$.
- Binomial coefficients $\binom nr=\frac{n(n-1)\cdots(n-r+1)}{r!}$ count the terms at level $r$.
- Linearity of expectation needs no independence: the expected number of correct returns is always $1$.
- Coupon collector: split into stages to get $\mathbb{E}[T]=nH_n\approx n\ln n$; about $2361$ for $n=365$.
- Independent random variables satisfy $\mathbb{E}[fg]=\mathbb{E}[f]\mathbb{E}[g]$; without independence it can fail ($\mathbf{1}_A$ and $\mathbf{1}_{A^c}$).
- Variance $\operatorname{Var}(f)=\mathbb{E}[(f-\mathbb{E}f)^2]=\mathbb{E}[f^2]-(\mathbb{E}f)^2\ge0$, zero exactly for constants.
- Variances of independent random variables add; without independence the cross term is generally nonzero.

## Comprehension check

**1. For $n=2$, why is $P(A_1\cap A_2)=1/2$ rather than $1/4$?**

Reference answer: The sample space is the set of all permutations of two students, of which there are only two: both correct, or they swap. The event $A_1\cap A_2$ contains only the first, so its probability is $1/2$. Using independence to write $P(A_1)P(A_2)=1/2\cdot1/2=1/4$ is wrong: once the first student receives their own set, only one set remains, so the second must also be correct. In general $P(A_i\cap A_j)=1/(n(n-1))$, not $1/n^2$.

**2. State inclusion–exclusion and explain why the signs must alternate.**

Reference answer:
$$
P\!\left(\bigcup_{i=1}^n A_i\right)=\sum_i P(A_i)-\sum_{i<j}P(A_i\cap A_j)+\sum_{i<j<k}P(A_i\cap A_j\cap A_k)-\cdots+(-1)^{n+1}P(A_1\cap\cdots\cap A_n).
$$
An outcome lying in exactly $r$ events is counted
$$
\binom r1-\binom r2+\binom r3-\cdots+(-1)^{r-1}\binom rr=1-(1-1)^r=1
$$
times, so every outcome is counted once. Without alternating signs this total would depend on $r$ and could not equal $1$ uniformly.

**3. Use inclusion–exclusion to compute the probability that nobody is correct for $n=4$.**

Reference answer:
$$
P(\text{at least one correct})=\binom41\frac14-\binom42\frac{1}{4\cdot3}+\binom43\frac{1}{4\cdot3\cdot2}-\frac{1}{4!}
=1-\frac{6}{12}+\frac{4}{24}-\frac{1}{24}
=1-\frac12+\frac16-\frac1{24}.
$$
Hence
$$
P(\text{nobody correct})=\frac12-\frac16+\frac1{24}=\frac{12-4+1}{24}=\frac{9}{24}=\frac38=0.375,
$$
consistent with $D_4=9$ derangements out of $4!=24$.

**4. Why does "the expected number of correct returns is $1$" need no independence? Where does the coupon collector use the same trick?**

Reference answer: Linearity of expectation holds for arbitrary random variables:
$$
\mathbb{E}\Bigl[\sum_i \mathbf{1}_{A_i}\Bigr]=\sum_i \mathbb{E}[\mathbf{1}_{A_i}]=\sum_i P(A_i),
$$
using only "expectation of a sum is the sum of expectations", with no independence. Since $P(A_i)=1/n$ for every $i$, the sum is $n\cdot(1/n)=1$. The coupon collector splits $T=\sum_{i=0}^{n-1}T_i$ into stages; each $T_i$ is geometric with success probability $(n-i)/n$ and expectation $n/(n-i)$; summing gives $nH_n$. The splitting is justified by linearity alone, regardless of dependence between stages.

**5. Give a counterexample showing $\mathbb{E}[fg]=\mathbb{E}[f]\mathbb{E}[g]$ fails without independence.**

Reference answer: Take $f=\mathbf{1}_A$, $g=\mathbf{1}_{A^{c}}$ with $0<P(A)<1$. No outcome lies in both $A$ and $A^c$, so $fg\equiv0$ and $\mathbb{E}[fg]=0$. But
$$
\mathbb{E}[f]\mathbb{E}[g]=P(A)(1-P(A))>0 .
$$
They differ. These variables are clearly dependent — knowing $f$ determines $g$ — showing that the independence hypothesis is essential.

**6. Why does additivity of variance require independence? Which step fails otherwise?**

Reference answer: Expanding gives
$$
\operatorname{Var}(f+g)=\operatorname{Var}(f)+\operatorname{Var}(g)+2\,\mathbb{E}[(f-\mu_f)(g-\mu_g)].
$$
Under independence the cross term is zero because the product rule applies:
$$
\mathbb{E}[(f-\mu_f)(g-\mu_g)]=\mathbb{E}[f-\mu_f]\,\mathbb{E}[g-\mu_g]=0.
$$
Without independence that step is invalid and the cross term is generally nonzero, so variances do not add. Counterexample: $g=f$ gives $\operatorname{Var}(f+g)=\operatorname{Var}(2f)=4\operatorname{Var}(f)$, while $\operatorname{Var}(f)+\operatorname{Var}(g)=2\operatorname{Var}(f)$; the cross term contributes the missing $2\operatorname{Var}(f)$.

## Relation to neighbouring lectures

This lecture links three tools: inclusion–exclusion for exact counts of "at least one event", linearity of expectation for bypassing dependence, and additivity of variance as a preview of concentration. The next lecture begins the counting unit — permutations, combinations and binomial coefficients — and generating functions later place $1/e$, $nH_n$ and $\binom nr$ inside one algebraic framework.

One sentence to keep: **once you can over-count and then correct, a union becomes a sum; once you can use indicators, counting becomes expectation.**
