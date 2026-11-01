---
slug: 01-real-numbers
title: "Where the Real Numbers Begin: From the IVT to Ordered Fields"
summary: "Starting from the intermediate value theorem, we ask which property of the reals the proof actually needs. We build addition, multiplication and order on the rationals, check that the operations are well defined, then abstract the axioms of a field and an ordered field and prove two basic results."
updatedAt: 2026-11-01
content_type: video-course
categories: [mathematics]
tags: [real-analysis, ordered-fields, rational-numbers, proof]
sources:
  - kind: video
    title: "Lecture 1: Introduction to Real Numbers"
    url: https://www.youtube.com/watch?v=BWvjy0a1Ffg
    author: Tobias Holck Colding, MIT OpenCourseWare
    publishedAt: 2025-09-02
---

## Two goals for one course

18.100B teaches two things: **how to write a rigorous mathematical proof**, and **how to prove theorems**. Both sound abstract, so the first lecture makes them concrete with a single example.

Let $f$ be continuous on $[a,b]$ with $f(a)<0<f(b)$. The intermediate value theorem asserts that some $c\in(a,b)$ satisfies $f(c)=0$. On the picture, the curve starts below the axis and ends above it, so it seems bound to cross.

The course offers a physical image: continuity is like drawing the graph with a piece of chalk that may never leave the table and may never jump. If the chalk travels continuously from the negative side to the positive side, it must pass through $0$.

Intuition stops here. The real question is: **which property of the real numbers does this argument use?**

## Why intuition is not enough

Things that look obvious can still fail when the foundations are not airtight; with loose foundations one quickly reaches a point where something "seems true" without anyone being able to tell whether it is true. Building every step rigorously not only guarantees correctness, it also makes it far easier to predict what should be true.

So the questions unfold:

1. Which property of the reals makes the IVT provable?
2. What is a real number? In particular, what is $\sqrt 2$ — is it a number at all?
3. Can these properties be written down as axioms?

The answer to the third question is the spine of the lecture. The reals $\mathbb R$ form a **complete ordered field** containing the rationals $\mathbb Q$. Completeness is postponed; this lecture treats "field" and "ordered" in full.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Course logistics: 10 weekly problem sets, a midterm, a final; 50% / 20% / 30% |
| 4:36 | Two goals: writing proofs, proving theorems; the IVT as the running example |
| 8:40 | Why intuition is insufficient; which property of the reals is needed |
| 11:18 | The answer: a complete ordered field; notation $\mathbb N,\mathbb Z,\mathbb Q$ |
| 16:32 | Rational numbers: representation, addition, multiplication, order |
| 25:12 | Proving that multiplication is well defined (full proof) |
| 32:47 | Definition of a field: five axioms, five more, plus one |
| 44:43 | Theorem: the additive identity is unique |
| 49:11 | Examples: $\mathbb Q$ is a field; $\mathbb N$ and $\mathbb Z$ are not |
| 51:53 | Ordered sets and ordered fields |
| 58:33 | Theorem: $x<y$ and $z>0$ imply $xz<yz$ |

## Number systems: conventions

- Natural numbers $\mathbb N=\{1,2,3,\dots\}$. In this course they start at $1$; zero is not included.
- Integers $\mathbb Z=\{0,\pm1,\pm2,\pm3,\dots\}$.
- Rationals $\mathbb Q=\{\,m/n : m\in\mathbb Z,\ n\in\mathbb N\,\}$.

The denominator is taken from $\mathbb N$, so it is always positive; comparisons never need a sign discussion.

## Three structures on the rationals

### Representation and equality

A rational is written as a quotient $m/n$, but the presentation is not unique: $1/2=2/4=3/6$. Two quotients denote the same rational exactly when cross-multiplication agrees:

$$
\frac{m_1}{n_1}=\frac{m_2}{n_2}
\iff
m_1n_2=m_2n_1 .
$$

This is where everything starts: a rational is not a pair of integers but the equivalence class of such a pair.

### Addition and multiplication

$$
\frac{m_1}{n_1}+\frac{m_2}{n_2}=\frac{m_1n_2+m_2n_1}{n_1n_2},
\qquad
\frac{m_1}{n_1}\cdot\frac{m_2}{n_2}=\frac{m_1m_2}{n_1n_2}.
$$

The numerator is an integer (possibly negative) and the denominator is natural, so the result is again rational. **This looks routine, but it hides a question that must be settled**: does the answer change if a different representative is used? That is the notion of being well defined.

### Order

Since denominators are positive, cross-multiplication preserves the inequality:

$$
\frac{m_1}{n_1}<\frac{m_2}{n_2}
\iff
m_1n_2<m_2n_1 .
$$

If negative denominators were allowed, the sign would need special care. Taking denominators from $\mathbb N$ removes that annoyance by construction.

## Well defined: the detail that must be checked

Defining an operation is not just writing a formula; one must prove that **the result does not depend on the chosen representatives**.

**Claim.** If
$$
\frac{m_1}{n_1}=\frac{m_2}{n_2},
\qquad
\frac{p_1}{q_1}=\frac{p_2}{q_2},
$$
then
$$
\frac{m_1}{n_1}\cdot\frac{p_1}{q_1}
=
\frac{m_2}{n_2}\cdot\frac{p_2}{q_2}.
$$

**Proof.** Cross-multiplying the hypotheses gives

$$
m_1n_2=m_2n_1,
\qquad
p_1q_2=p_2q_1 .
$$

Multiply the two equalities:

$$
(m_1n_2)(p_1q_2)=(m_2n_1)(p_2q_1).
$$

Rearranging factors (commutativity and associativity of integer multiplication):

$$
(m_1p_1)(n_2q_2)=(m_2p_2)(n_1q_1).
$$

By the criterion for equality of rationals, the two products denote the same rational. $\square$

The proof for addition is identical in structure, only messier to write; the lecture chooses multiplication purely because it is shorter on the board.

The proof also sets the expected level of detail: **every step must name the fact it uses**. Only three facts appear here: the equality criterion for rationals, the ability to multiply equalities, and commutativity and associativity of integer multiplication.

## The axioms of a field: five, five, and one

Now abstract what was observed on $\mathbb Q$. A **field** is a set $F$ with two operations $+$ and $\cdot$.

### Five axioms for addition

1. **Closure**: $x,y\in F\Rightarrow x+y\in F$.
2. **Commutativity**: $x+y=y+x$.
3. **Associativity**: $(x+y)+z=x+(y+z)$.
4. **Zero element**: there is $0\in F$ with $0+x=x$ for all $x$.
5. **Additive inverse**: for every $x$ there is $-x$ with $x+(-x)=0$.

### Five axioms for multiplication

1. **Closure**: $x,y\in F\Rightarrow xy\in F$.
2. **Commutativity**: $xy=yx$.
3. **Associativity**: $(xy)z=x(yz)$.
4. **Unit element**: there is $1\in F$ with $1\cdot x=x$ for all $x$.
5. **Multiplicative inverse**: for every $x\ne0$ there is $x^{-1}$ with $x\cdot x^{-1}=1$.

The fifth axiom carries a patch that cannot be dropped: **zero is excluded**. Zero cannot have an inverse — from $0\cdot u=1$ the distributive law forces $0=1$, and a field requires $1\ne0$. Hence the axiom says "every element other than $0$ has a multiplicative inverse".

### The eleventh axiom: distributivity

The first ten axioms each govern a single operation and barely interact. The only hint of contact is the mention of zero inside the inverse axiom. What actually ties the two operations together is distributivity:

$$
x(y+z)=xy+xz .
$$

It looks bland, but it is the only axiom that permits expanding a product or factoring a common term. It will be the decisive step when we multiply an inequality by a positive number.

## First theorem: the zero element is unique

The axioms guarantee that a zero element **exists**, not that it is **unique**. The theorem supplies that.

**Theorem.** In any field $F$, the additive identity is unique.

**Proof.** Let $0_1$ and $0_2$ both be additive identities, so for every $x$,

$$
0_1+x=x,
\qquad
0_2+x=x .
$$

Compute the single expression $0_1+0_2$ in two ways:

- Treat $0_2$ as the "arbitrary $x$" and use that $0_1$ is an identity: $0_1+0_2=0_2$.
- First commute, treat $0_1$ as $x$, and use that $0_2$ is an identity: $0_2+0_1=0_1$.

By commutativity $0_1+0_2=0_2+0_1$, hence

$$
0_2=0_1+0_2=0_2+0_1=0_1 .
$$

So $0_1=0_2$. $\square$

Three lines, but the pattern is the standard one: **find an expression that involves both objects and can be evaluated in two ways**. The lecturer notes that this style takes time to learn; struggling at first is normal.

The same argument, with the same skeleton, shows that additive inverses, multiplicative units and multiplicative inverses are unique.

## Which sets are fields

- $\mathbb Q$ is a field: addition, multiplication and order satisfy all axioms.
- $\mathbb N$ is **not**: it does not even contain the additive identity $0$, and most elements have no additive inverse.
- $\mathbb Z$ is **not**: it comes close but fails on multiplicative inverses. Take $2\in\mathbb Z$; if $u$ satisfied $2u=1$ then $u=1/2$, and $1/2\notin\mathbb Z$.

The examples show a pattern: $\mathbb N\to\mathbb Z$ adds additive inverses, $\mathbb Z\to\mathbb Q$ adds multiplicative inverses. Each step fills in a missing kind of number.

## Ordered fields: how order interacts with the operations

### Ordered sets

An **order** on a set $S$ is a relation $<$ that compares any two elements: for all $x,y\in S$, exactly one of

$$
x=y,
\qquad
x<y,
\qquad
y<x
$$

holds. This is trichotomy.

### Ordered fields

A field that is also an ordered set, with order compatible with both operations, is an **ordered field**:

- **Compatibility with addition**: $x<y\Rightarrow x+z<y+z$ for every $z$.
- **Compatibility with multiplication**: $x>0$ and $y>0\Rightarrow xy>0$.

$\mathbb Q$ is an ordered field: any two rationals are comparable, and both compatibility axioms hold.

These axioms generate the familiar rules of inequalities. For instance $x>0$ implies $-x<0$: from $0<x$, add $-x$ to both sides. And when $z<0$, multiplying an inequality reverses it (see question 4 below).

## Theorem: multiplying an inequality by a positive number

**Theorem.** Let $F$ be an ordered field, $x<y$ and $z>0$. Then $xz<yz$.

**Proof.** Reduce the goal to the two compatibility axioms.

First, rewrite. Adding $-(xz)$ to both sides and using compatibility with addition,

$$
xz<yz
\iff
xz+(-xz)<yz+(-xz)
\iff
0<yz-xz .
$$

Second, factor out $z$ with distributivity:

$$
yz-xz=(y-x)z .
$$

Third, determine the sign of $y-x$. From $x<y$, add $-x$ to both sides:

$$
0<y-x .
$$

Fourth, $y-x>0$ and $z>0$, so compatibility with multiplication gives

$$
(y-x)z>0 .
$$

Hence $0<yz-xz$, that is $xz<yz$. $\square$

Nothing in this proof is "obvious": each line invokes a named axiom — additive compatibility, distributivity, additive compatibility again, multiplicative compatibility. That is the point of the axiomatic style: the conclusion no longer rests on a picture but follows mechanically from a short list of rules.

## What this lecture establishes

- The IVT needs **completeness**; this lecture settles "ordered field" first.
- Rationals carry addition, multiplication and order, and the operations must be shown **well defined**.
- A field is five additive axioms, five multiplicative axioms and distributivity; the inverse axiom must exclude $0$.
- The zero element is unique, proved by evaluating one expression twice.
- $\mathbb Q$ is an ordered field; $\mathbb N$ and $\mathbb Z$ are not fields.
- In an ordered field, $x<y$ and $z>0$ imply $xz<yz$; multiplying by a negative reverses the inequality.

## Comprehension check

**1. Why must both factors change representatives when checking that multiplication is well defined? Why is changing only one not enough?**

Reference answer: Multiplication maps a pair of equivalence classes to a third class, and the formula is written on representatives: $[m_1/n_1]\cdot[p_1/q_1]=[m_1p_1/(n_1q_1)]$. Well definedness requires that any choice of representatives from the two classes gives the same resulting class. Changing one factor only shows independence from the first factor's representative; it says nothing about the second, nor about the case where both change at once. Only when both slots may be replaced freely does the formula define an operation on classes rather than on presentations.

**2. Imitate the proof that the zero element is unique to prove that additive inverses are unique.**

Reference answer: Let $x$ have additive inverses $u$ and $v$, so $x+u=0$ and $x+v=0$. Compute $u$:

$$
u=u+0=u+(x+v)=(u+x)+v=0+v=v .
$$

The steps use, in order: $0$ is the identity, $x+v=0$, associativity, $u+x=x+u=0$, and $0$ is the identity. Hence $u=v$. The skeleton is identical to the zero-element proof: build one expression and simplify it two ways.

**3. Why are the integers not a field? Name the axiom that fails and give a counterexample.**

Reference answer: The multiplicative inverse axiom fails. A field requires an inverse for every nonzero element. Take $2\ne0$ in $\mathbb Z$; if $u\in\mathbb Z$ satisfied $2u=1$, then $u=1/2$, which is not an integer. So $2$ has no multiplicative inverse in $\mathbb Z$. ($\mathbb N$ fails even earlier — it lacks the additive identity.)

**4. Suppose $x<y$ and $z<0$. Prove $xz>yz$ — the inequality reverses.**

Reference answer: First determine signs. From $z<0$, add $-z$ to both sides to get $0<-z$, i.e. $-z>0$. From $x<y$ get $y-x>0$. The product of two positive elements is positive:

$$
(y-x)(-z)>0 .
$$

Expand: $(y-x)(-z)=-(y-x)z=xz-yz$. Hence $xz-yz>0$, i.e. $xz>yz$. The trick is to translate "multiply by a negative" into "multiply by the positive $-z$, then negate", which is exactly why the direction flips.

**5. The rationals satisfy every ordered-field axiom. Why is that still not enough to prove the IVT?**

Reference answer: The IVT needs **completeness** — every nonempty subset of $\mathbb R$ bounded above has a least upper bound. $\mathbb Q$ is an ordered field but has gaps: no rational $c$ satisfies $c^2=2$. Consider $f(x)=x^2-2$ on $\mathbb Q$. It takes $-1<0$ at $x=1$ and $2>0$ at $x=2$, and as a polynomial it is continuous on $\mathbb Q$, yet $x^2=2$ has no solution in $\mathbb Q$, so no $c\in\mathbb Q$ gives $f(c)=0$. Thus "continuous with opposite signs at the endpoints" does not suffice; one must also assume the number system has no gaps. Note: this standard counterexample is supplied for context, not developed in the lecture; it is precisely the situation that completeness rules out.

## Relation to neighbouring lectures

This lecture builds "ordered field" and leaves "complete" open. The next lecture supplies completeness (the least upper bound property) and shows how it removes the gaps of $\mathbb Q$, making the IVT provable. Lecture 3 turns to the craft of proof itself — quantifiers, contradiction, and $\varepsilon$-arguments — preparing the ground for limits of sequences.

The theme of the whole course is now fixed: **every statement in analysis must be traceable back to the axioms of the real numbers.**
