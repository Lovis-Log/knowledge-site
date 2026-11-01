---
slug: "02-conditionals"
title: "Conditionals: Letting Code Choose at the Fork"
summary: "CS50P week 1: build boolean expressions with comparison operators, steer execution with if / elif / else, tighten conditions with and, or and chained comparisons, write is_even using modulo and boolean returns, and replace long branches with match / case."
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "conditionals"
  - "boolean"
  - "control-flow"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 2 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=6639s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## What this chapter covers

This is chapter 2 of the long video, covering CS50P week 1 (01:50:39–02:46:38) and the subject of **conditionals**.

Functions and variables, from the previous chapter, let a program run straight down a single path. Conditionals add forks: depending on whether a question is true or false, a different block of code runs. The chapter starts with comparison operators and boolean expressions, then rebuilds the same program three times with `if`, `elif` and `else`, comparing their control-flow diagrams. It then tightens conditions with `and`, `or` and chained comparisons, writes `is_even` using modulo and boolean return values, and finishes with `match` / `case`.

The thread running through all of it: **correct code is not enough — the design matters. Fewer questions and fewer branches mean fewer bugs.**

## Timeline

| Time | Topic |
| --- | --- |
| 1:50:39 | The week's theme: conditionals as forks in the code |
| 1:51:08 | Comparison operators: `>`, `>=`, `<`, `<=`, `==`, `!=` |
| 1:52:28 | The first `if` program, `compare.py` |
| 1:56:35 | Control-flow diagrams: diamonds for questions, arrows for paths |
| 1:58:58 | Why three independent `if`s ask too many questions |
| 2:00:02 | `elif`: making the conditions mutually exclusive |
| 2:04:59 | `else`: dropping the final question entirely |
| 2:08:47 | `or`: combining two conditions into one |
| 2:12:11 | Asking `!=` directly, with even fewer branches |
| 2:14:31 | Indentation and the colon are required syntax |
| 2:15:37 | `grade.py`: letter grades and `and` |
| 2:20:01 | Chained comparisons: `90 <= score <= 100` |
| 2:20:58 | Dropping the upper bound, exploiting `elif` |
| 2:24:22 | `parity.py`: modulo for even and odd |
| 2:30:16 | The boolean type and the `is_even` function |
| 2:34:30 | The Pythonic one-liner: `return n % 2 == 0` |
| 2:38:20 | `match` / `case` and the wildcard `_` |
| 2:44:55 | Combining cases with `\|` |

## Comparisons and boolean expressions

The symbols Python uses to ask questions:

| Operation | Symbol | Example | Result |
| --- | --- | --- | --- |
| Greater than | `>` | `3 > 2` | `True` |
| Greater or equal | `>=` | `3 >= 3` | `True` |
| Less than | `<` | `2 < 3` | `True` |
| Less or equal | `<=` | `2 <= 1` | `False` |
| Equal | `==` | `2 == 2` | `True` |
| Not equal | `!=` | `2 != 3` | `True` |

The easiest confusion is `=` versus `==`:

- `x = 5` **assigns**: put the value on the right into the variable on the left;
- `x == 5` **compares**: is the left equal to the right? It evaluates to `True` or `False`.

A yes-or-no question in code is a **Boolean expression**, named after the mathematician George Boole. It has exactly two possible answers. That is precisely why a computer can act on it: true means take one path, false means the other.

## Starting with if

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
```

Three syntactic details:

1. `if` is followed by a boolean expression;
2. the line ends with a **colon**;
3. the next line is **indented** — four spaces or one Tab.

Indentation is not decoration; it is syntax. It tells Python that the line belongs to the branch above it. Python delimits blocks by indentation rather than braces.

### Three parallel ifs

```python
if x < y:
    print("x is less than y")

if x > y:
    print("x is greater than y")

if x == y:
    print("x is equal to y")
```

This runs correctly but is poorly designed: no matter what the earlier answers are, **all three questions are asked**. With inputs `1` and `2`, the first prints and the other two are still evaluated. The waste grows with the program.

A control-flow diagram shows the shape: from `start`, three diamonds in sequence, each producing a true branch and a false branch, with every branch funnelling into the next diamond. Three paths, six exits, three questions.

### Using elif to make conditions exclusive

```python
if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
elif x == y:
    print("x is equal to y")
```

`elif` is short for else if: **the condition is only checked when every earlier one was false**. Once the first is true, the rest are skipped.

### Using else to drop the last question

Since `x` can only be less than, greater than, or equal to `y`, ruling out the first two forces equality:

```python
if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x is equal to y")
```

`else` has no condition; it is the fallback. Three paths, three exits, at most two questions.

## Combining conditions: or and and

If all you care about is equality, the first two questions collapse into one:

```python
if x < y or x > y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

`or` is true when either side is true; `and` requires both. Which leads to the most direct version:

```python
if x != y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

**Ask only the question you actually care about**, and four branches become two. This is the chapter's recurring lesson.

## Letter grades: from verbose to tight

Goal: 90–100 is an A, 80–89 a B, 70–79 a C, 60–69 a D, everything else an F.

First version, with both bounds everywhere:

```python
score = int(input("Score: "))

if score >= 90 and score <= 100:
    print("Grade: A")
elif score >= 80 and score <= 89:
    print("Grade: B")
elif score >= 70 and score <= 79:
    print("Grade: C")
elif score >= 60 and score <= 69:
    print("Grade: D")
else:
    print("Grade: F")
```

It works, but every branch asks two questions. Python supports **chained comparisons**, which fold the two into one:

```python
if 90 <= score <= 100:
    print("Grade: A")
```

Better still: `elif` already guarantees that the previous conditions were false. If the score is not at least 90, it must be below 90, so the upper bound is redundant:

```python
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

One question per branch, and the code reads the way a person decides.

> **Trap:** this only works with `elif`. Replace them with independent `if`s and a score of 95 satisfies `>= 90`, `>= 80`, `>= 70` and `>= 60`, printing four lines. **Mutual exclusion comes from the reasoning you did, not automatically from the syntax.**

## Parity: the boolean type and custom functions

`%` is the modulo operator, returning the remainder:

| Expression | Remainder |
| --- | --- |
| `1 % 3` | 1 |
| `2 % 3` | 2 |
| `3 % 3` | 0 |
| `4 % 3` | 1 |

An even number is one whose remainder on division by 2 is zero:

```python
x = int(input("What's x? "))

if x % 2 == 0:
    print("Even")
else:
    print("Odd")
```

### Wrapping the test in a function

```python
def main():
    x = int(input("What's x? "))
    if is_even(x):
        print("Even")
    else:
        print("Odd")


def is_even(n):
    if n % 2 == 0:
        return True
    else:
        return False


main()
```

Here the **boolean type** `bool` appears: only `True` and `False`, with capital first letters. A function can return a boolean, and a boolean is exactly what an `if` needs — the call itself is a boolean expression.

### Three tighter versions

```python
# 1. Conditional expression
def is_even(n):
    return True if n % 2 == 0 else False

# 2. Return the boolean expression
def is_even(n):
    return n % 2 == 0

# 3. Skip the function
if x % 2 == 0:
    ...
```

The second is **Pythonic**: `n % 2 == 0` is already `True` or `False`, so `if ... return True else return False` asks the same question twice. The first is more verbose but clearer to beginners, and the lecture explicitly accepts either — **readability beats brevity**.

## match / case: another way to branch

Python 3.10 introduced `match`, similar in spirit to `switch` elsewhere:

```python
name = input("What's your name? ")

match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who?")
```

- `match` takes the value being tested;
- each `case` is a candidate, and `|` means "or";
- `_` is the wildcard that catches everything not handled above, like `else`;
- there is no `break` and no fall-through.

Compared with `if` / `elif`, `match` is more compact when one value maps to several fixed options. For ranges or compound expressions, `if` remains the better fit.

## Chapter summary

- `=` assigns; `==` compares; `!=` is inequality.
- A boolean expression is `True` or `False`, and `if` uses it to decide whether to run its indented block.
- The colon and indentation are required syntax, not style preferences.
- Independent `if`s all evaluate; `elif` makes them exclusive; `else` is the fallback.
- `and`, `or` and chained comparisons fold multiple conditions into one.
- Relying on `elif` lets you drop upper bounds — but switching back to independent `if`s breaks it.
- `%` returns the remainder; even means `n % 2 == 0`.
- A function can return a `bool`, and a boolean expression can be the return value directly.
- `match` / `case` fits "one value against several fixed options", with `_` as the fallback.

## Comprehension check

**1. Why does `if x = y:` raise an error, and what should it be?**

Reference answer: a single `=` is the assignment operator. It expects a variable name on the left and stores the right-hand value into it; `x = y` is a statement, not a boolean expression, so it cannot follow `if`. Comparing two values uses `==`:

```python
if x == y:
    print("x is equal to y")
```

**2. What happens if every `elif` in the grading code becomes `if`, and the score is 95? Why?**

Reference answer: all four lines print:

```text
Grade: A
Grade: B
Grade: C
Grade: D
```

Because 95 satisfies `>= 90`, `>= 80`, `>= 70` and `>= 60` simultaneously, and independent `if`s have no mutual exclusion — each one is evaluated and each branch runs. The original works because `elif` only checks its condition when every previous one was false.

**3. Rewrite `score >= 90 and score <= 100` as a chained comparison. Are they equivalent?**

Reference answer:

```python
90 <= score <= 100
```

They are equivalent. The chained form evaluates `90 <= score` and `score <= 100`, and is true when both hold. It is shorter and reads more naturally. The chain is essentially syntactic sugar over the `and` version, not two independent statements executed in sequence.

**4. Give three implementations of `is_even`, and say which is the most Pythonic and why.**

Reference answer:

```python
# 1
def is_even(n):
    if n % 2 == 0:
        return True
    else:
        return False

# 2
def is_even(n):
    return True if n % 2 == 0 else False

# 3
def is_even(n):
    return n % 2 == 0
```

The third is the most Pythonic. `n % 2 == 0` is already a boolean expression whose value is `True` or `False`; versions 1 and 2 compute that value and then restate it through a conditional. Still, version 1 is clearer for beginners, and the lecture accepts either as long as the choice can be justified.

**5. What does `_` do in a `match` statement, and how is it like `else`?**

Reference answer: `_` is a wildcard pattern that matches any value not caught by earlier `case`s, so it must come last. Like `else`, it is the fallback: it runs only when none of the earlier options matched. The difference is that `else` belongs to an `if` statement and `_` belongs to a `match` statement.

**6. What is wrong with the following, and how would you fix it?**

```python
match name:
    case "Harry":
        print("Gryffindor")
    case "Hermione":
        print("Gryffindor")
    case "Ron":
        print("Gryffindor")
```

Reference answer: it runs, but three branches print the same thing, which is duplication. Combine them with `|`:

```python
match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
```

Adding another Gryffindor later means appending to one line rather than risking a missed edit.

## Relation to neighbouring chapters

Conditionals upgrade the sequential execution from the previous chapter into execution by case. The next chapter introduces **loops**, upgrading "run once, depending on a condition" into "run repeatedly". Exception handling later reuses the same reasoning — check a condition, then decide whether to continue.

The design habit emphasised here — ask fewer questions, eliminate cases early — returns when choosing loop bounds and when structuring `try` / `except` branches.
