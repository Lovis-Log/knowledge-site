---
slug: 02-syntax-variables-types
title: "Syntax, Variables and Data Types"
summary: "Chapter 2 of the long-form course: computers follow instructions literally, so we cover Python's indentation and PEP 8, how to read error messages, and how variables, numbers, strings, booleans and operators actually work."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, syntax, variables, data-types, operators]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 2 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=3127s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## What this chapter covers

This is chapter 2 of the long-form video, covering 52:07–1:40:34. The previous chapter built the workbench; this one starts writing Python: what basic actions a program is made of, the hard rules and style conventions of the syntax, how to read an error, how variables hold data, the basic data types, and the operators that let data drive decisions.

The framing is explicit: every concept here is small on its own and can even look pointless, but combining four actions — storing, deciding, repeating and calculating — is enough to build a support-ticket router or a document summariser. The goal of the chapter is familiarity, not memorisation.

## Timeline

| Time | Topic |
| --- | --- |
| 52:07 | What programming is: precise instructions a computer can follow |
| 53:56 | Four basic actions: store, decide, repeat, calculate |
| 55:39 | Syntax: indentation, four spaces, colons |
| 57:18 | PEP 8: naming, line length, spacing |
| 57:59 | Breaking code on purpose: `SyntaxError` and reading errors in three steps |
| 1:01:41 | Variables: assignment, naming rules, snake_case |
| 1:06:23 | Comments: `#`, triple quotes, explaining the why |
| 1:09:58 | Data types: int and float |
| 1:13:37 | Strings: quotes, concatenation, repetition, `len` |
| 1:19:44 | Booleans and comparisons |
| 1:24:47 | Operators: arithmetic precedence, comparisons, `and`/`or`/`not`, augmented assignment |
| 1:30:29 | f-strings: embedding variables in text |
| 1:33:14 | String methods: `lower`, `upper`, `title`, `replace` and more |
| 1:36:21 | First look at control flow: `if`, `else`, `elif` |

## What programming is: four basic actions

Computers follow instructions literally. Telling a friend to "make coffee" works because they fill in the cup, the grounds and the hot water themselves. A computer does only what each instruction says, in the order given.

Almost every program is a combination of four actions:

1. **Store**: put data into variables, e.g. `name = "Sarah"`, `age = 25`.
2. **Decide**: branch on a condition, e.g. escalate a ticket to a human if needed.
3. **Repeat**: apply the same processing to many items, e.g. page through a document.
4. **Calculate**: add, subtract, compare.

This chapter covers the groundwork for storing and deciding; repetition comes next.

## Syntax: hard rules and style conventions

### Indentation is syntax

Python groups code with indentation. Other languages use braces to mark a block; Python uses four spaces. Wrong indentation either raises an error or silently changes the logic.

```python
if True:
    print("four spaces of indentation")
```

Colon, newline, indent — that shape defines every block in Python: `if`, `for`, `def`, `class`. The editor fills the indentation in, but you should know it is doing so.

### PEP 8: readability conventions

PEP 8 is the official style guide. It changes no behaviour, only readability: four spaces rather than tabs, lines of at most 79 characters, lowercase names with underscores (snake_case), spaces around operators.

Violating it is not an error, but it marks the code as a beginner's. A later chapter uses Ruff to check and format automatically.

### Reading an error in three steps

The instructor deletes a closing quote to force a `SyntaxError`, then gives a fixed reading order:

1. **Which line**: the traceback reports the line number.
2. **What went wrong**: the last line names the error and explains it, e.g. `SyntaxError: unterminated string literal`.
3. **Exactly where**: a caret points at the offending character.

```python
print("hello world)
# SyntaxError: unterminated string literal (detected at line 1)
```

The cause is an unclosed quote. The advice: paste an unfamiliar error and the code into an AI assistant and ask what it means; and **type the examples rather than copy-paste**, because mistakes come from quotes, brackets and spaces, and only typing them out builds the habit of spotting them.

## Variables

A variable names a piece of data so it can be referenced later.

```python
name = "Alice"
age = 25
is_student = True
```

The equals sign is not equality; it is **assignment** — store the right-hand value under the left-hand name. They are called variables because they can be reassigned.

```python
name = "Alice"
name = "Dave"
print(name)
# Dave
```

Hard rules for names:

- only letters, digits and underscores;
- cannot start with a digit;
- cannot be a Python keyword (`if`, `class`, ...);
- no spaces or hyphens.

```python
# valid
first_name = "Alice"
user_age = 25

# invalid
# 2age = 30      -> SyntaxError
# user-age = 30  -> parsed as subtraction
```

Style (soft): lowercase with underscores, snake_case. `firstName` runs fine but is not idiomatic Python.

## Comments

Comments are notes for humans; Python ignores them.

```python
# this whole line is a comment
subtotal = 100
tax = subtotal * 0.08  # a trailing comment also works
```

Multi-line explanations use triple quotes:

```python
"""
Compute the total price including tax.
Input: subtotal.
Output: subtotal plus 8% tax.
"""
```

A useful rule: **comments explain why, not what**.

```python
# bad: the code already says this
total = subtotal * 1.08  # multiply subtotal by 1.08

# good: explains where the number comes from
total = subtotal * 1.08  # 8% California sales tax
```

## Data types

### Numbers: int and float

```python
age = 25        # int
price = 19.99   # float
```

Python converts between them freely, so day-to-day code rarely distinguishes them; the difference is in storage and efficiency.

Arithmetic works like a calculator:

```python
print(5 + 5)    # 10
print(5 - 5)    # 0
print(5 * 3)    # 15
print(10 / 3)   # 3.3333333333333335
print(10 // 3)  # 3  floor division
print(10 % 3)   # 1  remainder
print(10 ** 2)  # 100 exponent
```

Precedence matches mathematics: multiplication before addition, parentheses first.

```python
print(2 + 3 * 4)    # 14
print((2 + 3) * 4)  # 20
```

### Strings

Text goes in quotes. Single or double quotes both work; pick one and stay consistent (the instructor uses double quotes).

```python
first_name = "Dave"
last_name = "Ebbelaar"

full_name = first_name + " " + last_name
print(full_name)
# Dave Ebbelaar
```

`+` concatenates, `*` repeats:

```python
line = "-" * 30
print(line)
# ------------------------------
```

`len()` returns the number of characters, including spaces:

```python
print(len(full_name))  # 13
print(len(first_name)) # 4
```

Triple quotes hold multi-line text and keep the line breaks:

```python
message = """first line
second line"""
print(message)
```

### Booleans

Only `True` and `False`, with a capital first letter.

```python
is_logged_in = True
has_license = False
```

Booleans usually come from comparisons:

```python
age = 18
can_vote = age >= 18
print(can_vote)  # True

age = 16
print(age >= 18) # False
```

## Operators

### Comparisons

| Operator | Meaning |
| --- | --- |
| `==` | equal (two equals signs) |
| `!=` | not equal |
| `>` / `<` | greater / less than |
| `>=` / `<=` | greater or equal / less or equal |

A common confusion: `=` assigns, `==` compares.

```python
age = 18         # assignment
print(age == 18) # True, comparison
```

### Logical operators

`and`, `or`, `not` combine booleans.

```python
age = 25
has_license = True

can_drive = age >= 16 and has_license
print(can_drive)  # True

has_license = False
print(age >= 16 and has_license)  # False
print(age >= 16 or has_license)   # True, only one is needed
```

Truth table:

| A | B | A and B | A or B |
| --- | --- | --- | --- |
| True | True | True | True |
| True | False | False | True |
| False | True | False | True |
| False | False | False | False |

`not` inverts:

```python
has_license = True
print(not has_license)  # False
```

Combined conditions read almost like English:

```python
is_drunk = False
can_drive = age >= 16 and has_license and not is_drunk
```

Note that a boolean variable is already a truth value; `has_license` is enough, no `== True` needed. Both work, the shorter form is idiomatic.

### Augmented assignment

```python
score = 10
score += 5   # same as score = score + 5
print(score) # 15
```

`-=`, `*=`, `/=` work the same way.

## f-strings: embedding variables

Concatenation is clumsy once variables are involved; f-strings are the standard tool.

```python
name = "Dave"
greeting = f"Hi there, my name is {name}."
print(greeting)
# Hi there, my name is Dave.
```

Key points:

- prefix the string with `f`;
- put variables or expressions inside braces;
- without the `f`, the braces print literally.

This is especially common in AI work, where user input, retrieved context and a system prompt are assembled into one template.

```python
user_input = "Summarise this document"
prompt = f"You are an assistant. User request: {user_input}"
```

## String methods

A method is a function attached to an object, called with a dot:

```python
name = "Dave"
print(name.lower())   # dave
print(name.upper())   # DAVE

sentence = "hi my name is dave"
print(sentence.title())  # Hi My Name Is Dave
```

Common ones:

```python
message = "I love the Python programming language"

print(message.startswith("I"))        # True
print(message.endswith("language"))   # True
print("Python" in message)            # True
print(message.count("Python"))        # 1
print(message.replace("Python", "JavaScript"))
# I love the JavaScript programming language
```

The instructor is explicit that none of this needs memorising: look it up or ask an AI. The point is knowing that Python ships with ready-made capabilities so you are not writing the logic from scratch.

## First look at control flow

`if` branches on a condition:

```python
temperature = 26

if temperature > 25:
    print("It's hot")
```

The shape is fixed: `if`, condition, colon, newline, four spaces.

`else` handles everything else:

```python
temperature = 25

if temperature > 25:
    print("It's hot")
else:
    print("It's nice weather")
# It's nice weather
```

`elif` chains conditions, **evaluated top to bottom, stopping at the first match**:

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "needs improvement"

print(grade)  # B
```

Two independent `if`s would both fire when both conditions hold, which is usually not what you want. `elif` guarantees a single branch runs.

## Takeaways

- Programs combine four actions: store, decide, repeat, calculate.
- Indentation is syntax; PEP 8 is style and never raises an error.
- Read errors in three steps: which line, what error, exact position.
- `=` assigns, `==` compares; names use snake_case.
- Basic types: `int`, `float`, `str`, `bool`; booleans come from comparisons.
- `and`/`or`/`not` combine conditions; `+=` is augmented assignment.
- f-strings are the standard way to insert variables into text.
- `if`/`elif`/`else` evaluate in order and stop at the first match.

## Check your understanding

**1. Why does a wrong indentation break Python, when in other languages it is only formatting?**

Reference answer: Python has no braces to delimit blocks; indentation itself expresses nesting. After a colon, the interpreter uses indentation to decide which lines belong to the block. Inconsistent indentation raises `IndentationError`; a wrong level can attach a statement to a different block, so the program runs but does something else. Indentation is therefore part of the syntax, not optional formatting.

**2. Write a condition for "allowed to drive": at least 16, has a licence, and is not drunk. Explain why `== True` is unnecessary.**

Reference answer:

```python
age = 25
has_license = True
is_drunk = False

can_drive = age >= 16 and has_license and not is_drunk
```

`has_license` already holds `True` or `False`, and `and` consumes it directly. `has_license == True` just compares it again: same result, more noise. `not is_drunk` expresses "has not been drinking" as a negation of the boolean.

**3. With `score = 85`, do these two blocks behave the same? What about `score = 95`?**

```python
# A
if score >= 80:
    print("B")
if score >= 90:
    print("A")
```

```python
# B
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
```

Reference answer: At 85 both print only B. At 95, A prints both B and A, because the two `if`s are independent and both conditions hold; B prints only A because `elif` is skipped once the first condition succeeds. Mutually exclusive grades require `elif`.

**4. What does `print(len("Dave"))` output? And `len(" Dave ")`? What does that say about `len`?**

Reference answer: `4` and `6`. `len` counts characters including spaces and trims nothing. To ignore surrounding spaces, call `strip()` first: `len(" Dave ".strip())` is 4.

**5. Given `name = "Alice"`, what do these two lines print, and why?**

```python
print(f"Hello, {name}")
print("Hello, {name}")
```

Reference answer: The first prints `Hello, Alice`; the second prints `Hello, {name}` literally. The leading `f` tells Python to evaluate expressions inside braces and substitute their values. Without it, braces are ordinary characters.

## How it connects

This chapter supplies the minimal vocabulary: values, variables, types, operators and branching. The next chapter adds repetition (`for` loops) and containers that hold many values at once (lists, dictionaries, tuples, sets) — the structures that later chapters use for JSON returned by APIs and for tabular data.
