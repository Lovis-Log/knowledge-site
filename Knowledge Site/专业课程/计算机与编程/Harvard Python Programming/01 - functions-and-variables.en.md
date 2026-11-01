---
slug: "01-functions-and-variables"
title: "Functions and Variables: From hello, world to Your Own Functions"
summary: "CS50P week 0: write a first Python program with a text editor and a terminal, understand functions, arguments and side effects, work with variables, string methods, int and float conversions and formatting, then define your own functions with def, return and scope."
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "functions"
  - "variables"
  - "strings"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 1 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=0s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## What this chapter covers

This is the first of ten CS50P lectures, on **functions and variables**. The course was originally published as one very long, unchaptered video of about sixteen hours; this chapter covers the opening overview and week 0 (00:00–1:50:39).

The overview maps the whole course: functions and variables → conditionals → loops → exceptions → libraries → unit tests → file I/O → regular expressions → object-oriented programming → a final round of tools. The lecture then starts from a single `print` line and walks the full loop of writing, running, breaking and fixing code, before adding input, variables, string manipulation, numeric types, and finally custom functions and scope.

The goal is not to memorise syntax but to build mental models used for the rest of the course: **a function is a verb, an argument is its input, a side effect is what it does to the world, and a return value is what it hands back; a variable is a container in memory; `=` assigns rather than asserts equality; Python interprets your file literally, top to bottom.**

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Course overview: the ten topics and how the course works |
| 5:02 | Week 0 begins: text editor, VS Code, terminal |
| 6:20 | The first program `print("hello, world")` and `python hello.py` |
| 10:00 | Functions, arguments and side effects |
| 12:59 | A deliberate syntax error: an unclosed parenthesis |
| 16:37 | Talking to the user with `input()` |
| 19:46 | Variables and the assignment operator (right to left) |
| 24:31 | Comments and pseudo-code |
| 29:48 | Joining strings: `+`, multiple arguments, `sep` and `end` |
| 45:34 | Quotes inside quotes and the escape character `\` |
| 48:10 | f-strings: embedding variables in text |
| 50:02 | String methods: `strip`, `capitalize`, `title`, `split` |
| 1:03:59 | Integers, arithmetic and the modulo operator `%` |
| 1:05:18 | Interactive mode (the REPL) |
| 1:07:23 | A calculator, and the trap that `input` returns a string |
| 1:19:20 | Floats, `round` and number formatting |
| 1:30:51 | Custom functions: `def`, parameters, default values |
| 1:40:10 | Functions must exist before they are called; the `main()` convention |
| 1:44:00 | Scope and `NameError` |
| 1:45:54 | `return`: separating return values from side effects |

## Starting with one line

Writing Python needs only two things: a **text editor** for the code and a **terminal** to run it. VS Code provides both. Files end in `.py`, which tells the computer this is a Python program.

The first program is one line:

```python
print("hello, world")
```

Run it in the terminal:

```bash
python hello.py
```

Output:

```text
hello, world
```

That line already contains three core ideas:

- **Function**: `print` is an action, a verb. Python ships with a set of such verbs.
- **Argument**: the `"hello, world"` in parentheses is the input that decides what gets printed.
- **Side effect**: what the function does to the world. For `print`, it is displaying text on screen.

Computers only understand zeros and ones, and `print(...)` is plainly neither. The translator is the **Python interpreter**: it reads the file top to bottom and left to right, turning each line into operations the machine can execute.

## Errors are normal: syntax errors

Drop the closing parenthesis and the program never starts:

```python
print("hello, world"
```

```text
  File "hello.py", line 1
    print("hello, world"
         ^
SyntaxError: '(' was never closed
```

> **Takeaway:** the computer takes you literally. A typo a human would ignore is, to the interpreter, an unfinished sentence.

Error messages are sometimes precise, as above, and sometimes vague or even misleading. The lecture's advice: read the message, find the line number, and rebuild from a minimal working version.

## Input, variables and assignment

To greet a specific person, use `input()`:

```python
name = input("What's your name? ")
print(f"hello, {name}")
```

A variable has appeared. `name` is a container in memory holding the text the user typed.

The key is the equals sign: **it does not mean equality, it means assignment**, and the direction is right to left — evaluate `input(...)`, then place its return value into `name`.

Assignment can happen repeatedly, overwriting the old value:

```python
name = "David"
name = name.strip()   # process the old value, store it back on the left
```

### Why you cannot write `print("hello, name")`

Because whatever is inside quotes is printed literally. Remove the quotes to read the variable:

```python
print("hello,", name)   # two arguments; print separates them with a space
```

So the presence or absence of quotes decides whether you print literal text or the value of a variable.

## Comments and pseudo-code

Anything after `#` is a comment, which the interpreter ignores:

```python
# Ask user for their name
name = input("What's your name? ")

# Say hello to user
print(f"hello, {name}")
```

Comments also serve as **pseudo-code**: outline the steps in plain language first, then translate them into Python one at a time. The longer the program, the more this habit pays off.

## Joining strings: five ways

The same "hello, someone" has five implementations, which the lecture uses to make a point: in Python there is often more than one way to solve a problem.

```python
# 1. Concatenation
print("hello, " + name)

# 2. Multiple arguments (separated by a space)
print("hello,", name)

# 3. Override end to suppress the newline
print("hello, ", end="")
print(name)

# 4. f-string (recommended)
print(f"hello, {name}")

# 5. Build the string first
greeting = "hello, " + name
print(greeting)
```

Ways 2 and 3 expose two **named parameters** of `print`:

- `sep`: the separator between arguments, defaulting to one space;
- `end`: the trailing character, defaulting to a newline `\n`.

`print("hello,", name, sep="???")` outputs `hello,???David`. Both parameters have defaults, so they are usually invisible.

### Quotes inside quotes

Printing a quoted phrase creates a conflict:

```python
print("hello, "friend"")   # syntax error
```

Two fixes: use single quotes outside, or escape the inner quotes with a backslash:

```python
print('hello, "friend"')
print("hello, \"friend\"")
```

`\` is an **escape character**: it tells Python the next character is literal rather than syntax. `\n` is a newline; `\"` is a double quote character.

## String methods: cleaning user input

User input often carries stray spaces and erratic capitalisation. Strings come with methods — functions attached to a value, called with a dot:

```python
name = input("What's your name? ")
name = name.strip()        # remove leading and trailing whitespace
name = name.title()        # capitalise each word
print(f"hello, {name}")
```

Input `"   dAvId mAlAn  "` produces `hello, David Malan`.

Methods can be chained on one line:

```python
name = input("What's your name? ").strip().title()
```

Evaluation goes right to left: call `input`, then `strip`, then `title`, and finally assign to the left-hand side.

Some common methods:

| Method | Effect | Example |
| --- | --- | --- |
| `strip()` | Remove leading/trailing whitespace | `"  hi  ".strip()` → `"hi"` |
| `capitalize()` | Capitalise first letter, lower the rest | `"dAvId".capitalize()` → `"David"` |
| `title()` | Capitalise every word | `"david malan".title()` → `"David Malan"` |
| `split(sep)` | Split into a list on `sep` | `"David Malan".split(" ")` → `["David", "Malan"]` |
| `lower()` / `upper()` | All lower / all upper | `"Hi".lower()` → `"hi"` |

`split` pairs well with multiple assignment:

```python
first, last = input("What's your name? ").split(" ")
print(f"hello, {first}")
```

## Integers, floats and conversion

### int

The integer type `int` has no decimal point. Core operations:

| Operation | Symbol | Example |
| --- | --- | --- |
| Add | `+` | `1 + 2` → `3` |
| Subtract | `-` | `5 - 2` → `3` |
| Multiply | `*` | `3 * 4` → `12` |
| Divide | `/` | `6 / 2` → `3.0` (a float) |
| Remainder | `%` | `7 % 3` → `1` |

`%` is not a percentage; it is **modulo**, the remainder after division.

### The calculator trap: input always returns a string

```python
x = input("What's x? ")
y = input("What's y? ")
print(x + y)
```

Typing `1` and `2` prints `12`. The reason: `input` returns a **string**, and `+` on strings concatenates rather than adds.

The fix is conversion:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))
print(x + y)      # 3
```

`int` is both a type name and a function: it turns a string that looks like an integer into an actual integer. Calls can be nested — `input` first, then `int`:

```python
print(int(input("What's x? ")) + int(input("What's y? ")))
```

The deeper the nesting, the harder the line is to read, and the lecture's advice is to **prioritise readability** over saving a line.

### Floats and formatting

A `float` is a number with a decimal point:

```python
x = float(input("What's x? "))
y = float(input("What's y? "))
print(x + y)
```

Typing `1.2` and `3.4` gives `4.6`.

`round` rounds, with an optional second argument for digits:

```python
z = round(x + y)          # 4.6 → 5
z = round(x / y, 2)       # 2/3 → 0.67
```

f-strings can format directly:

```python
print(f"{z:,}")     # 1000 → 1,000
print(f"{z:.2f}")   # 0.666... → 0.67
```

`:,` inserts thousands separators; `:.2f` keeps two decimals. These format specifiers are not worth memorising — look them up when needed.

Two precision facts:

- Python's `int` has no upper bound and can represent arbitrarily large integers;
- `float` has limited precision (about 15–17 significant digits), so `2/3` displays as `0.6666666666666666`.

## Defining your own functions

When the same job keeps recurring, give it a name. Use `def`:

```python
def hello(to="world"):
    print("hello,", to)

name = input("What's your name? ")
hello()
hello(name)
```

Output:

```text
hello, world
hello, David
```

Breaking it down:

- `def` is short for define;
- `hello` is the function name;
- `to="world"` is a **parameter with a default**: if the caller passes nothing, `world` is used;
- the colon and indentation delimit the body;
- the `name` passed at the call site is an **argument**, while `to` inside the function is a **parameter** — different variables.

On a call, the argument's value is copied into the parameter, so changing `to` inside does not affect `name` outside.

### Order matters

Python executes top to bottom. A function must be defined before it is called:

```python
hello()        # NameError: name 'hello' is not defined

def hello():
    print("hello")
```

There are two fixes. Move the definition above the call, or — the more common convention — define a `main()` holding the program logic and call `main()` on the last line:

```python
def main():
    name = input("What's your name? ")
    hello(name)


def hello(to="world"):
    print("hello,", to)


main()
```

Now `main` reads like a table of contents, details follow underneath, and the single call to `main()` sits at the end. Reading order is natural, and no `NameError` occurs.

### Scope

A variable created inside `main` is not visible in another function:

```python
def main():
    name = input("What's your name? ")
    hello()          # no argument

def hello():
    print("hello,", name)   # NameError: name 'name' is not defined

main()
```

The cause is **scope**: `name` exists only in `main`'s local scope, and `hello` cannot see it.

The correct fix is to pass the value:

```python
def main():
    name = input("What's your name? ")
    hello(name)      # hand the value over

def hello(to="world"):
    print("hello,", to)
```

## Return values: a function's other output

Some functions have only side effects (`print`); others hand a result back (`input`, `int`, `float`). When defining your own, use `return`:

```python
def main():
    x = int(input("What's x? "))
    print("x squared is", square(x))


def square(n):
    return n * n


main()
```

`return` lets the result be used further — passed to `print`, assigned to a variable, fed into another computation. Side effects and return values are two distinct kinds of output, and a well-written function knows which one it produces.

Squaring has three equivalent spellings:

```python
def square(n):
    return n * n        # multiplication
    # return n ** 2     # exponentiation
    # return pow(n, 2)  # built-in function
```

## Chapter summary

- Writing code = a text editor + a terminal; Python files end in `.py` and run with `python file.py`.
- A function is a verb; arguments are inputs; side effects affect the world; return values come back to the caller.
- `=` assigns, right to left; a variable is a container in memory that can be overwritten.
- `input` always returns a string; arithmetic requires `int()` or `float()`.
- `print` has named parameters `sep` and `end`, both with defaults; `\` is the escape character.
- f-strings embed variables and format numbers (`:,`, `:.2f`).
- String methods are called with a dot and can be chained; `strip`, `title` and `split` are the most used.
- `def` defines a function, whose parameters may have defaults; definitions must precede calls.
- `main()` plus a final call is the standard structure; local variables stay local.
- `return` hands back a value, which is not the same as `print`'s side effect.

## Comprehension check

**1. Why does adding the `1` and `2` obtained from `input()` produce `12`? Give two fixes.**

Reference answer: `input()` returns a `str`, and `+` on strings concatenates, so `"1" + "2"` is `"12"`. Fix one converts each value:

```python
x = int(input("What's x? "))
y = int(input("What's y? "))
print(x + y)
```

Fix two converts inline:

```python
print(int(input("What's x? ")) + int(input("What's y? ")))
```

Both give 3, but the first is easier to read and to debug, since `x` and `y` can be inspected separately.

**2. Do `print("hello,", name)` and `print(f"hello, {name}")` produce the same output? What if the name has leading spaces?**

Reference answer: both print `hello, David`, but the mechanisms differ. The first passes two arguments, and `print` inserts one space by default via `sep`. The second embeds the variable in the string, where the space is part of the literal text.

If `name` is `"  David  "`, the first prints `hello,   David  ` (separator plus the user's spaces) and the second prints `hello,   David  ` (embedded verbatim). To get a clean result in both cases, run `name = name.strip()` first.

**3. Why does the following raise `NameError: name 'name' is not defined`, and how should it be fixed?**

```python
def main():
    name = input("What's your name? ")
    hello()

def hello():
    print("hello,", name)

main()
```

Reference answer: `name` is local to `main`, and `hello` is a different function with a different local scope, so it cannot see it. Pass the value as a parameter:

```python
def main():
    name = input("What's your name? ")
    hello(name)

def hello(to="world"):
    print("hello,", to)

main()
```

Now `hello` depends only on its own parameter, which is more general and easier to test.

**4. Using `strip()` and `title()`, process the input `"   dAVid mAlAn  "`. Give the code and the output, and explain why `strip` cannot remove spaces between words.**

Reference answer:

```python
name = input("What's your name? ").strip().title()
print(f"hello, {name}")
```

With `"   dAVid mAlAn  "` the output is `hello, David Malan`. `strip()` removes only leading and trailing whitespace, leaving interior characters untouched. To collapse interior runs of spaces, split and rejoin:

```python
name = " ".join(input("What's your name? ").split())
```

**5. What is the difference between `return n * n` and `print(n * n)`, and why must the former be used inside `print("x squared is", square(x))`?**

Reference answer: `print(n * n)` only has a side effect — the value appears on screen — and the function's own return value is `None`. `return n * n` hands the value back, so the call expression itself equals that value.

In `print("x squared is", square(x))`, the value of `square(x)` is passed to the outer `print` as an argument. If `square` merely printed, `square(x)` would evaluate to `None`, and the output would be `x squared is None`. Hence `return` is required.

**6. Why does the program still work when `hello` is defined at the bottom of the file? What happens if `hello(name)` is called on the very first line instead?**

Reference answer: defining `hello` at the bottom works because the call to `main()` on the last line runs after the interpreter has already executed every `def` statement in the file. What matters is that the **call happens later than the definition**.

Calling `hello(name)` on the first line instead raises `NameError: name 'hello' is not defined`, because the interpreter reaches that line before it has seen the `def`. Python only guarantees that names defined earlier in execution are available — it does not hoist function definitions ahead of the file.

## Relation to neighbouring chapters

This chapter supplies the vocabulary for everything that follows: functions, parameters, return values, variables, types and scope. The next chapter introduces **conditionals**, letting a program branch on boolean values; loops, exceptions and libraries then reuse the `input`, `print`, conversion and function machinery established here.

The `main()` structure introduced at the end recurs throughout the course. When file I/O, testing and object-oriented programming arrive, the program skeleton is still this one.
