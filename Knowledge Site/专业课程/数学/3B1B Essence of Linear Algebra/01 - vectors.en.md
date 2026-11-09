---
slug: "01-vectors"
title: "Vectors: An Arrow and a List of Numbers Are the Same Thing"
summary: "Physicists see vectors as arrows in space, programmers see them as ordered lists of numbers, mathematicians ask only that they can be added and scaled. Linear algebra's real power lies in translating between these views."
updatedAt: "2026-11-09"
content_type: "video-course"
categories: [mathematics]
tags: [vectors, coordinates, vector-addition, scalar-multiplication]
sources:
  - kind: "video"
    title: "Vectors | Chapter 1, Essence of linear algebra"
    url: "https://www.youtube.com/watch?v=fNk_zzaMoSs"
    author: "3Blue1Brown"
    publishedAt: "2016-08-06"
---

## The thread of the lecture

Linear algebra offers three stories about what a vector is, and they describe the same object:

1. **The physicist's view**: a vector is an arrow in space, fixed by a length and a direction;
2. **The computer scientist's view**: a vector is an ordered list of numbers, and the order matters;
3. **The mathematician's view**: a vector is anything for which adding two of them and multiplying one by a number both make sense.

The third is the most abstract and the easiest to turn into empty words. This series handles it by setting it aside: build intuition with the first view, compute with the second, and return to the third in chapter 16.

This chapter establishes the two most basic facts: **how arrows and lists correspond one-to-one**, and **the only two operations vectors have** — addition and scalar multiplication.

## Timeline

| Time | Topic |
| --- | --- |
| 0:30 | The physicist's view: vectors are arrows in space |
| 0:51 | The computer scientist's view: ordered lists of numbers |
| 2:04 | In linear algebra, arrows are always rooted at the origin |
| 2:52 | Coordinates: walk along $x$, then along $y$ |
| 4:45 | Vector addition: put the second tail on the first tip |
| 6:06 | Numerically, addition is component by component |
| 6:54 | Scalar multiplication: stretch, squash, flip |
| 7:41 | Why numbers are called scalars |
| 8:42 | The real value is translating between the two views |

## Three views

A physicist says a vector is an arrow: length and direction determine it, and its position is irrelevant — slide it elsewhere and it is still the same vector.

A computer scientist says a vector is a list: model a house by a pair of numbers, the first its floor area and the second its price. **Order carries meaning**; swap the two and you describe a different house. Here "two-dimensional" only means the list has length two, with no reference to space at all.

A mathematician tries to subsume both: anything for which you can sensibly define "add two of these" and "multiply one by a number" may be called a vector.

The third sounds hollow, but it points at something important: **the entire subject revolves around those two operations**. Understand them and the subject has begun.

## Arrows, rooted at the origin

This series chooses geometry as its home. So whenever a vector appears, picture an arrow — and **with its tail pinned at the origin**.

This differs from the physicist's view, where an arrow may sit anywhere. In linear algebra it almost always starts at the origin.

Why? Because an arrow rooted at the origin has its tip at one definite place, and that place can be described by coordinates. Geometry and numbers acquire a bridge.

## Coordinates: from arrow to numbers

Draw two axes in the plane: $x$ horizontal, $y$ vertical, meeting at the origin.

Pick a length to represent 1 and mark ticks. When the whole of space needs to be in view, extend the ticks into a grid.

![An arrow from the origin to (2,1) in the plane, with dashed legs showing two steps right then one step up; on the right the numbers 2 and 1 stacked in brackets](/images/la01-vector-coordinates-en.svg)

*Figure: coordinates are nothing mystical — they are instructions for reaching the tip, and arrows correspond one-to-one with lists of numbers.*

A vector's coordinates are a pair of numbers that amount to **walking instructions from the origin to the arrow's tip**:

- The first number: how far along $x$, positive right, negative left;
- The second: how far parallel to $y$ afterwards, positive up, negative down.

The convention is to write the pair vertically in square brackets, to distinguish it from a point:

$$
\begin{bmatrix} 2 \\ 1 \end{bmatrix}.
$$

**Every pair of numbers gives exactly one vector, and every vector gives exactly one pair.** That one-to-one correspondence is the foundation of the subject.

Three dimensions work the same way: add a $z$-axis perpendicular to both, and each vector corresponds to an ordered triple.

## Vector addition

To add two vectors: slide the second so its **tail** sits on the first's **tip**, then draw from the first's tail to the second's tip. That new arrow is the sum.

This is the only moment in the whole series where vectors are allowed to leave the origin — because they must be joined tip to tail.

### Why this definition

Because a vector can be read as a movement: a step of some distance in some direction.

Step along the first vector, then along the second; the net effect is the same as stepping along their sum from the start.

This is the same idea as adding numbers on a number line. Children are taught $2+5$ as "two steps right, then five more steps right, which is seven steps right." Vector addition merely lets "right" become "any direction."

### Numerically

Take $\begin{bmatrix}1\\2\end{bmatrix}$ and $\begin{bmatrix}3\\-1\end{bmatrix}$.

Joined tip to tail, the path from origin to end has four legs: right 1, up 2, right 3, down 1.

Combine steps in the same direction: right $1+3$, up $2-1$. So the sum is

$$
\begin{bmatrix}1\\2\end{bmatrix} + \begin{bmatrix}3\\-1\end{bmatrix}
= \begin{bmatrix}1+3\\2+(-1)\end{bmatrix}
= \begin{bmatrix}4\\1\end{bmatrix}.
$$

In general: **add component by component**.

## Scalar multiplication

The other operation multiplies a vector by a number.

- Times 2: stretch to twice the length;
- Times $1/3$: squash to a third;
- Times $-1.8$: flip first, then stretch by 1.8.

Stretching, squashing, and reversing is called **scaling**, and a number playing that role is called a **scalar**.

Throughout linear algebra a number's main job is to scale vectors, so "scalar" and "number" are used almost interchangeably.

Numerically, scalar multiplication multiplies every component:

$$
2 \cdot \begin{bmatrix}3\\1\end{bmatrix} = \begin{bmatrix}6\\2\end{bmatrix}.
$$

## Translating between the two views

A natural question: should a vector be thought of as an arrow or as a list?

Grant's answer: **the value lies less in choosing than in being able to translate**.

- For a data analyst, drawing a column of numbers as points or arrows in space makes patterns visible and shows at a glance what an operation does globally;
- For a physicist or graphics programmer, translating spatial operations into numbers is what lets a computer carry them out.

When he animates mathematics, the workflow is exactly this: think through what happens in space, have the computer represent it numerically, then compute where each pixel goes. Every step leans on linear algebra.

So the skill is not picking a side but **switching freely**. Every later chapter repeats the move: build intuition geometrically, then translate it into computation.

## What this chapter establishes

- Vectors have three readings: physical arrows, computational lists, abstract mathematical objects.
- The series works geometrically: arrows start at the origin, and the tip uniquely determines the vector.
- Coordinates are walking instructions from origin to tip, written vertically in brackets; vectors and coordinate pairs correspond one-to-one.
- Addition is defined tip to tail, meaning "two moves compose into one"; numerically it is componentwise.
- Scalar multiplication scales: positive stretches or squashes, negative flips then scales; numerically every component is multiplied.
- A number's main role in the subject is scaling vectors, hence the name scalar.
- Linear algebra revolves around addition and scalar multiplication.
- The ability to translate between views matters more than choosing one.

## Check your understanding

**1. Why must arrows be rooted at the origin in linear algebra but not in physics?**

Answer: because linear algebra describes vectors with coordinates, and coordinates are positions relative to an origin. Only when the tail sits at the origin does "the tip's position" correspond one-to-one with "this pair of numbers." Physics cares only about length and direction, so an arrow may be slid anywhere; as soon as numbers are needed, a common reference point must be chosen, and the origin is that reference.

**2. Why is addition defined tip to tail rather than componentwise?**

Answer: componentwise addition is a **consequence** of tip-to-tail in coordinates, not the definition. The motivation is composition of movements: take one step, then another, and the net effect equals a single step along the sum. That geometric definition is compatible with decomposing into "along $x$, along $y$," which is why it expands into componentwise addition. Starting from componentwise addition instead would leave unexplained why the operation corresponds to composing motion in space.

**3. Are $\begin{bmatrix}1\\2\end{bmatrix}$ and $\begin{bmatrix}2\\1\end{bmatrix}$ the same vector?**

Answer: no. As arrows, the first is "right 1, up 2" and the second is "right 2, up 1" — different directions. As lists, a different order is a different list. Both views agree here. Only in the purely physical reading, where position is irrelevant and only length and direction matter, would one need a separate check — and even then they differ in direction, so they remain distinct.

**4. What do multiplying by $-1$ and by $1$ do geometrically?**

Answer: multiplying by 1 changes nothing; multiplying by $-1$ rotates the vector by 180 degrees with length unchanged. More generally, multiplying by a negative $-\lambda$ (with $\lambda>0$) flips and then scales by $\lambda$. Numerically, every component changes sign.

**5. Why is "translating between the two views" more important than "picking the right view"?**

Answer: because each view solves a different problem. Geometry supplies intuition — why an operation looks the way it does and what it accomplishes globally. Numbers supply computability — handing the operation to a machine, and coping with high dimensions. The hard part is rarely understanding one side; it is knowing which side a given problem needs, and how to carry a conclusion from one to the other. Most techniques in the subject — matrices, determinants, eigenvectors — are products of exactly that translation.
