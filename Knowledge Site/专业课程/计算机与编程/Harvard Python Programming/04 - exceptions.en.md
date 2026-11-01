---
slug: "04-exceptions"
title: "Exceptions: Writing Code for the Day Things Go Wrong"
summary: "CS50P week 3: separate syntax errors from runtime errors, catch ValueError with try / except, understand else and the smallest possible try block, then wrap repeated input validation in a reusable get_int function."
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "exceptions"
  - "error-handling"
  - "input-validation"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 4 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=14854s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## What this chapter covers

This is chapter 4 of the long video, covering CS50P week 3 (04:07:34–04:52:00), on **exceptions**.

In everyday English an "exception" is something special or rare; in programming it is the opposite — something has **gone wrong**. The previous chapter left a loose end: `while True` insists that the user enter a positive number, but what if the user types `cat`? `int("cat")` crashes, and it crashes long after you wrote the code, triggered by someone else.

The chapter first separates two kinds of error: **syntax errors** you made while typing, and **runtime errors** that only appear while running. It then introduces `try` / `except` to separate "code that might fail" from "what to do when it does", adds `else`, argues for keeping the `try` block as small as possible, and finally wraps the whole pattern in `get_int(prompt)`. It closes with `pass` and Python's "try it first" style.

## Timeline

| Time | Topic |
| --- | --- |
| 4:07:34 | The week's theme: what counts as an exception |
| 4:08:05 | Syntax error: an unterminated string literal |
| 4:09:28 | Syntax errors must be fixed; they cannot be caught |
| 4:10:36 | `number.py`: the hazard in `int(input(...))` |
| 4:13:27 | Edge-case testing: 0, negatives, and `cat` |
| 4:14:09 | `ValueError`: invalid literal for int() |
| 4:16:05 | `try` / `except ValueError` |
| 4:19:00 | Can you catch everything with a bare except? (Not advised.) |
| 4:20:29 | Keep the `try` block around the line that can fail |
| 4:21:38 | The `NameError` that appears after moving the `print` |
| 4:25:52 | `try` / `except` / `else`: continue only on success |
| 4:29:41 | Use `while True` to ask again rather than quit |
| 4:33:40 | Where to put `break`, and its relation to `return` |
| 4:36:44 | Both designs are valid: readability vs a minimal try block |
| 4:37:07 | Packaging `get_int()` |
| 4:40:39 | Replacing `break` plus `return` with a single `return` |
| 4:42:48 | `pass`: catch it and stay quiet |
| 4:48:47 | Adding a `prompt` parameter to `get_int` |
| 4:51:08 | A preview of `raise` |

## Two kinds of error

### Syntax errors

```python
print("hello, world)
```

```text
SyntaxError: unterminated string literal
```

"Unterminated" means you started something and never stopped it; a "literal" is something you typed directly rather than a variable. In plain terms: you opened a string and never closed it.

The defining feature of a syntax error is that **the program never runs**. It is not a failure during execution; the code itself is invalid. That is why `try` / `except` cannot catch it — the interpreter rejects the file while parsing it.

### Runtime errors

```python
x = int(input("What's x? "))
print(f"x is {x}")
```

Typing `50`, `0` or `-1` is fine. Typing `cat` gives:

```text
ValueError: invalid literal for int() with base 10: 'cat'
```

`ValueError` means the value handed to `int` was not valid. Your code is correct; the problem is the user — and the user's behaviour is something you cannot know in advance.

Runtime errors happen during execution, so they can be anticipated and handled in code.

> **Takeaway:** a syntax error is "you wrote it wrong"; a runtime error is "the world did not behave as you expected".

## try / except

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

The order of execution:

1. attempt the `try` block;
2. if no exception is raised, skip `except` and run `else`;
3. if a `ValueError` is raised, abandon the rest of `try`, run `except`, and skip `else`.

The type in `except ValueError` must be spelled correctly and is case-sensitive.

### Why not a bare except

Python allows `except:` with no type, catching everything. The lecture argues against it:

- if you do not know what went wrong, you cannot handle it correctly;
- it swallows real bugs, so the program keeps running while quietly broken.

The better habit is to **name the exception types you expect**.

### Keep the try block small

```python
try:
    x = int(input("What's x? "))
    print(f"x is {x}")
except ValueError:
    print("x is not an integer")
```

This runs, but `print` is inside `try` too. A `print` will essentially never raise `ValueError`, and including it blurs which line is actually at risk. Prefer:

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

### A subtle trap: NameError

Move the `print` out of `try` but leave it unconditional:

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")

print(f"x is {x}")
```

Typing `cat` now gives:

```text
NameError: name 'x' is not defined
```

The reason is **assignment happens last**. In `x = int(input(...))`, Python evaluates the right side first: `input` returns `"cat"`, `int("cat")` raises `ValueError`. The exception aborts the line before the right-hand value exists, so the assignment never runs and `x` is never created.

`except` only catches the error; it does not give `x` a value. The later `print` then refers to a name that does not exist and raises a second error.

`else` exists precisely for this: **run only when `try` succeeded**.

## Asking again in a loop

The program above gives up after one bad input, which is unfriendly. Keep asking:

```python
while True:
    try:
        x = int(input("What's x? "))
    except ValueError:
        print("x is not an integer")
    else:
        break

print(f"x is {x}")
```

Now `cat` produces a message and another prompt, until a valid integer arrives.

Note that `break` sits in `else`: `else` is attached to `try`, not to `except`, so it runs only when no exception occurred.

You can also drop `else` and put `break` at the end of `try`:

```python
while True:
    try:
        x = int(input("What's x? "))
        break
    except ValueError:
        print("x is not an integer")
```

Both are correct. The lecture's position is that either is good design **as long as you can explain the choice** — the trade-off is between a minimal `try` block and one less layer of nesting.

## Packaging get_int

Once the same validation is written twice, extract it:

```python
def main():
    x = get_int("What's x? ")
    print(f"x is {x}")


def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            pass


main()
```

The evolution is worth following:

1. **Write it plainly**: convert, `break` on success, `return x` after the loop.
2. **Merge**: since `return x` immediately follows `break`, use `return x` directly — `return` both exits the loop and hands back the value.
3. **Compress**: `x` is used once, so drop it and `return int(input(prompt))`.
4. **Parameterise**: let the caller supply the prompt, so `get_int` is not hard-wired to ask for `x`. It can now ask for `x`, `y` or `age`.

`main` is then two lines: get a number, print it. The complexity sits inside the function.

### pass: catch and say nothing

`pass` in an `except` block means "I caught it and will do nothing further". The program does not crash, prints no error, and simply loops round to prompt again.

```python
while True:
    try:
        return int(input(prompt))
    except ValueError:
        pass
```

The user sees only the prompt repeating. Whether that is better depends on the situation: quiet may feel friendlier, or it may leave the user puzzled about what went wrong.

## Two styles: EAFP and LBYL

The Python community leans toward **EAFP** — Easier to Ask Forgiveness than Permission: do it, then handle failure.

```python
try:
    x = int(input("What's x? "))
except ValueError:
    ...
```

Other languages favour **LBYL** — Look Before You Leap: check first, then act.

```python
s = input("What's x? ")
if s.isnumeric():
    x = int(s)
else:
    ...
```

Both are reasonable. Python's inertia is toward EAFP, but checking first works perfectly well; the important part is knowing which style you chose.

## Chapter summary

- Syntax errors cannot be caught and must be fixed; runtime errors can be handled in code.
- `ValueError` means "invalid value"; `int("cat")` raises it.
- `try` / `except` separates risky code from the response to failure.
- Do not write a bare `except:`; name the exception types.
- Keep `try` around only the line that can actually fail.
- Assignment happens last: if the right side fails, the left side never gets a value, and later access raises `NameError`.
- `else` runs only when `try` succeeded; it belongs to `try`.
- `while True` with `try` / `except` / `break` is the standard validation structure.
- `return` exits the loop and returns a value, which is tidier than `break` followed by `return`.
- `pass` catches and silently ignores.
- Wrapping "get a valid integer" in `get_int(prompt)` leaves callers to worry only about the result.

## Comprehension check

**1. What happens when the following receives `cat`, and why? How should it be fixed?**

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")

print(f"x is {x}")
```

Reference answer: it raises `NameError: name 'x' is not defined`. In `x = int(input(...))` the right side is evaluated first: `int("cat")` raises `ValueError`, which aborts the line. The right-hand value never exists, so the assignment never happens and `x` is never created. `except` catches the error but does not assign anything.

Fix it with `else`, so the print runs only on success:

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

**2. Is `else` attached to `try` or to `except`? When does it run?**

Reference answer: attached to `try`. It runs only when the `try` block raises no exception at all. If `try` raises a caught exception, the `except` block runs and `else` is skipped; if it raises an uncaught exception, the error propagates and `else` does not run either.

**3. Why is a bare `except:` discouraged?**

Reference answer: a bare `except:` catches every exception, including types you never anticipated. That causes two problems: you do not know what actually happened, so you cannot respond correctly; and it swallows genuine bugs, so the program keeps running while broken. The correct practice is to name the expected exception types, such as `except ValueError`.

**4. What is wrong with putting `print(f"x is {x}")` inside the `try` block?**

Reference answer: `print` will essentially never raise `ValueError`, so including it widens the "might fail" region and makes it unclear which line is actually being protected. The `try` should cover the smallest region that can raise — normally just `int(input(...))`. That keeps the boundary of error handling explicit and avoids catching the same exception type from unrelated code.

**5. After converting `number.py` to the `while True` version, why does entering `cat` not terminate the program?**

Reference answer: because `except ValueError` catches the exception. After `try` fails, execution continues to the end of the loop body, the `while True` condition is still true, and the loop prompts again. The loop ends only when `try` succeeds and `else` runs `break`. Since the exception is caught, it no longer propagates out of the program.

**6. How could the following `get_int` be improved?**

```python
def get_int():
    while True:
        try:
            x = int(input("What's x? "))
        except ValueError:
            print("x is not an integer")
        else:
            break
    return x
```

Reference answer: merge `break` and `return` — put `return x` in `else` and the post-loop return disappears:

```python
def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("x is not an integer")
```

`return` both ends the loop and hands back the value. Also, the prompt is hard-coded, so the function can only ask for `x`; adding a `prompt` parameter makes it reusable for any variable. If the repeated message is unwanted, the `except` block can become `pass`.

## Relation to neighbouring chapters

Exception handling turns the previous chapter's input validation from "assuming the user cooperates" into "continuing even when they do not", which is the foundation of robust programs. The next chapter on libraries introduces many external functions that can raise, and `try` / `except` is the tool for them.

The `get_int(prompt)` pattern — wrap a fallible operation plus a retry, expose only the result — recurs in file I/O and unit testing.
