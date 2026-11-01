---
slug: 10-et-cetera
title: "Et Cetera: Sets, Type Hints, argparse and Generators"
summary: "The final chapter gathers the loose tools: sets for deduplication, global for module-level state, constants and type hints for defence, docstrings for documentation, argparse for command lines, unpacking with * and **, comprehensions and enumerate for tighter code, and yield to solve the million-sheep memory problem."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, set, type-hints, argparse, generators]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 10 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=48548s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

This is chapter 10, the final chapter of the long video (about 16 hours), corresponding to CS50P lecture 9, "Et Cetera", covering 13:29:08–15:57:18. The first nine chapters covered functions, conditionals, loops, exceptions, libraries, testing, files, regex and objects; this one collects the tools that did not belong to any of those themes but will eventually be needed.

## Timeline

| Time | Topic |
| --- | --- |
| 13:30:20 | `set`: a collection that removes duplicates |
| 13:36:33 | Globals, `UnboundLocalError` and `global` |
| 13:46:32 | Rewriting the bank with a class |
| 13:53:15 | Constants: uppercase is only a convention |
| 13:58:02 | Type hints: `n: int`, `-> None`, and mypy |
| 14:16:14 | Docstrings: triple quotes and reST style |
| 14:23:28 | Command-line arguments: `sys.argv` and `argparse` |
| 14:39:06 | Unpacking: `*list` and `**dict` |
| 14:57:04 | Variadic parameters: `*args` and `**kwargs` |
| 15:06:59 | `map`, list comprehensions, `filter`, dict comprehensions |
| 15:34:15 | `enumerate`: index and value together |
| 15:36:59 | Generators and `yield`: one value at a time |

## `set`: duplicate removal

Given a list of student records, find how many houses Hogwarts really has. Doing it by hand:

```python
houses = []
for student in students:
    if student["house"] not in houses:
        houses.append(student["house"])
```

A set handles it directly:

```python
houses = set()
for student in students:
    houses.add(student["house"])
```

- an empty set must be written `set()`; `{}` is an empty dictionary;
- add with `.add()`, not `.append()`;
- duplicates collapse automatically; membership uses `in`, as with lists.

Sets are unordered, so printing order is not guaranteed. For a stable order, use `sorted(houses)`.

Watch spelling and case: `Slytherin` and `Slytherinn` are different strings, and the set keeps both. When data comes from users, normalise case or clean it first.

## Globals and `global`

```python
balance = 0

def main():
    print("Balance:", balance)
    deposit(100)
    withdraw(50)
    print("Balance:", balance)

def deposit(n):
    balance += n

def withdraw(n):
    balance -= n
```

Running it gives

```
UnboundLocalError: cannot access local variable 'balance' where it is not associated with a value
```

The rule: if a **name is assigned anywhere** in a function body, Python treats that name as local throughout the function. In `balance += n`, the read happens before the assignment, so it reads a local variable that does not exist yet.

Reading a global is fine; writing requires a declaration:

```python
def deposit(n):
    global balance
    balance += n
```

`global` tells Python the name refers to the module-level variable rather than a new local.

### Why it is discouraged

- the variable lives at the top of the file while functions elsewhere mutate it, so reading the code means jumping around;
- functions are no longer self-contained, which makes testing and reuse harder;
- name shadowing is easy: a same-named local silently hides the global.

The lecture's better answer is a class:

```python
class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    def deposit(self, n):
        self._balance += n

    def withdraw(self, n):
        self._balance -= n
```

State and the methods that change it live together, and `_balance` signals "do not touch from outside". `global` suits tiny scripts; once the program grows, use a class.

## Constants: a convention only

```python
MEOWS = 3

for _ in range(MEOWS):
    print("meow")
```

The uppercase name tells the reader this is a constant. Python does **not** stop you writing `MEOWS = 4`. Java's `final` and C++'s `const` are enforced at compile time; Python's are not.

Inside a class:

```python
class Cat:
    MEOWS = 3

    def meow(self):
        for _ in range(Cat.MEOWS):
            print("meow")
```

`cat.MEOWS` looks on the instance first and falls back to the class; `Cat.MEOWS` is explicit. Assigning to an instance attribute does not change the class attribute — a common trap.

## Type hints and mypy

```python
def meow(n: int) -> None:
    for _ in range(n):
        print("meow")

number: int = int(input("Number: "))
meow(number)
```

`n: int` and `-> None` are **annotations**, not constraints. The interpreter ignores them; passing a string still fails at runtime.

To catch it earlier, use mypy:

```bash
pip install mypy
mypy meow.py
```

It analyses the code statically and reports "expected int, got str", moving the error from the user's runtime to before the code ships. The cost is maintaining annotations, which can require extra declarations in dynamic code. The lecture's stance: optional for small scripts, worthwhile for team projects.

## Docstrings

```python
def meow(n: int) -> str:
    """
    Meow n times.

    :param n: Number of times to meow
    :type n: int
    :raise TypeError: If n is not an int
    :return: A string of n meows, one per line
    :rtype: str
    """
    return "meow\n" * n
```

Triple quotes on the first line of the body make a docstring. `help(meow)` and `meow.__doc__` both read it. The `:param:` / `:type:` fields are reST style, which Sphinx and similar tools can turn into HTML or PDF documentation.

Note this is a **convention**, not Python syntax; tools can only parse the format the team agrees on.

## Command-line arguments

### `sys.argv`

```python
import sys

if len(sys.argv) == 1:
    print("meow")
elif len(sys.argv) == 3 and sys.argv[1] == "-n":
    n = int(sys.argv[2])
    for _ in range(n):
        print("meow")
else:
    print("usage: meow.py")
```

`sys.argv` is a list of strings whose first element is the script name. With more flags — `-n`, `-a`, `--number`, in any order — the branching explodes.

### `argparse`

```python
import argparse

parser = argparse.ArgumentParser(description="Meow like a cat")
parser.add_argument("-n", default=1, help="number of times to meow", type=int)
args = parser.parse_args()

for _ in range(args.n):
    print("meow")
```

- `ArgumentParser` is a class and `parser` an object;
- `add_argument` declares a flag: name, default, help text, type;
- `parse_args()` reads and parses `sys.argv`;
- `args.n` is already an `int`, no manual conversion;
- `-h` / `--help` is generated automatically;
- a non-numeric value produces a standard error and usage message.

Another case of the standard library absorbing a universal problem.

## Unpacking: `*` and `**`

```python
def total(galleons, sickles, knuts):
    return (galleons * 17 + sickles) * 29 + knuts

coins = [100, 50, 25]
print(total(*coins), "Knuts")
```

`*coins` expands the list into three positional arguments, equivalent to `total(100, 50, 25)`.

```python
coins = {"galleons": 100, "sickles": 50, "knuts": 25}
print(total(**coins), "Knuts")
```

`**coins` expands the dictionary into **keyword arguments**, equivalent to `total(galleons=100, sickles=50, knuts=25)`. The keys must match the parameter names, or Python raises `unexpected keyword argument`.

### Variadic parameters

Functions can also accept any number of arguments:

```python
def f(*args, **kwargs):
    print("Positional:", args)
    print("Named:", kwargs)

f(100, 50, 25, galleons=100, sickles=50)
```

- `*args` collects positional arguments into a tuple;
- `**kwargs` collects keyword arguments into a dictionary.

`print` works this way: `print(*objects, sep=" ", end="\n")`. That is why it accepts zero, one or many arguments.

## `map`, `filter` and comprehensions

### `map`: apply a function to every element

```python
words = ["This", "is", "CS50"]
uppercase = map(str.upper, words)
print(*uppercase)          # THIS IS CS50
```

`map` takes a function and a sequence and applies the function to each element. Note `str.upper` has **no parentheses** — the function itself is passed, and `map` calls it.

### List comprehensions

```python
uppercase = [word.upper() for word in words]
```

Read it as "give me `word.upper()` for each `word` in `words`". It compresses the loop, the `append` and the expression into one line.

With a condition:

```python
gryffindors = [
    student["name"]
    for student in students
    if student["house"] == "Gryffindor"
]
```

### `filter`: keep by predicate

```python
def is_gryffindor(s):
    return s["house"] == "Gryffindor"

gryffindors = filter(is_gryffindor, students)
```

`filter` needs a function returning a boolean and keeps the elements for which it returns `True`. A lambda works too:

```python
filter(lambda s: s["house"] == "Gryffindor", students)
```

### Choosing

| Goal | Usual choice |
| --- | --- |
| transform every element | list comprehension / `map` |
| keep by condition | comprehension with `if` / `filter` |
| transform and filter at once | comprehension |

`map` and `filter` return **iterators**, so `print` shows the object rather than the contents; wrap in `list(...)` or unpack with `*`. Comprehensions return a list directly.

### Dictionary comprehensions

```python
gryffindors = {student["name"]: "Gryffindor" for student in students}
```

Curly braces outside, `key: value` inside, and a dictionary is built from the list.

## `enumerate`

```python
for i, student in enumerate(students):
    print(i + 1, student)
```

`enumerate` yields index and value together, replacing `range(len(...))` plus indexing. It starts at 0, or use `enumerate(students, start=1)`.

## Generators and `yield`

```python
def sheep(n):
    flock = []
    for i in range(n):
        flock.append("🐑" * i)
    return flock
```

`n = 10_000` still runs; `n = 1_000_000` exhausts memory and the process is killed, because the function must build **every** result before returning it.

```python
def sheep(n):
    for i in range(n):
        yield "🐑" * i
```

`yield` hands out one value, pauses the function, and resumes from the same point on the next iteration. Only one row of sheep exists at a time, so a million rows begin printing immediately.

That is a **generator**: it returns an **iterator** that a `for` loop can step through, with Python preserving the function's state.

Two differences from `return`:

- `return` ends the function; `yield` merely pauses it;
- a generator can be iterated only once; when exhausted it is empty, so create a new one to traverse again.

## Takeaways

- `set` removes duplicates; create with `set()`, add with `.add()`, unordered.
- Assigning to a module-level variable inside a function needs `global`; for larger programs, encapsulate state in a class.
- Constants are an uppercase convention; Python does not enforce them. Class constants use `ClassName.NAME`.
- Type hints do not affect runtime; mypy and similar tools check them statically.
- A docstring is triple-quoted on the first body line; reST conventions let tools generate documentation.
- Hand-parsing `sys.argv` gets out of hand quickly; `argparse` handles flags, types, defaults and help.
- `*list` unpacks to positional arguments, `**dict` to keyword arguments; `*args` / `**kwargs` do the reverse in definitions.
- Comprehensions and `map`/`filter` solve the same problems differently; comprehensions return lists, `map`/`filter` return iterators.
- `enumerate` provides index and value together.
- Generators with `yield` produce values on demand, turning "build everything" into "build as needed" and solving the memory problem.

## Comprehension check

**1. How does deduplicating with a list differ from using a `set`, in code and in behaviour? Why can `{}` not create an empty set?**

Reference answer: List deduplication requires `if x not in list: list.append(x)`, scanning on every insert, so the cost is $O(n^2)$ overall. A `set` is hash-based: `.add()` is $O(1)$ on average, duplicates collapse, so the whole loop is about $O(n)$. Behaviourally, lists preserve first-seen order while sets are unordered and print in no guaranteed order; call `sorted()` when order matters. `{}` is already the empty-dictionary literal, so sets need a distinct spelling: `set()`.

**2. Why does `balance += n` inside a function raise `UnboundLocalError`, and what does `global` do?**

Reference answer: Python decides a name is local if it is assigned anywhere in the function body. `balance += n` means `balance = balance + n`, so the read happens before the assignment and refers to a local that has not been bound yet, raising `UnboundLocalError`. Writing `global balance` declares the name refers to the module-level variable, so both read and write touch that one instead of creating a local. Reading a global needs no declaration; only assignment does.

**3. Do type hints stop a wrong type at runtime? What are they for?**

Reference answer: No. The `int` in `def meow(n: int)` is an annotation the interpreter ignores at runtime; passing a string still runs until `range(n)` raises `TypeError`. Their value is that static tools such as mypy analyse the code before it runs and report "expected int, got str", moving the failure into development, and they document intent for readers and IDEs. Annotations cost maintenance, so small scripts may skip them and team projects benefit more.

**4. What is the difference between `*coins` and `**coins`? What do `*args` and `**kwargs` correspond to?**

Reference answer: `*coins` expands a list (or tuple, or other iterable) into separate **positional** arguments, so `total(*coins)` equals `total(100, 50, 25)`. `**coins` expands a dictionary into **keyword** arguments, so `total(**coins)` equals `total(galleons=100, sickles=50, knuts=25)`, which requires the keys to match the parameter names. In a definition, `*args` collects any number of positional arguments into a tuple and `**kwargs` collects keyword arguments into a dictionary. `print(*objects, sep=" ", end="\n")` is the everyday example.

**5. When do you use a list comprehension versus `map`/`filter`? Why does `print(map(...))` show nothing useful?**

Reference answer: Comprehensions suit "transform with optional filtering" when a list is wanted and usually read better. `map` suits applying an existing function to every element, and `filter` suits keeping elements by an existing boolean predicate — both closer to functional style. `map` and `filter` return **iterators**, so `print` shows only the iterator object; convert with `list(...)` or unpack with `*` to see the elements.

**6. Why does the million-sheep version crash while the `yield` version does not? How do generators differ in control flow?**

Reference answer: The ordinary function builds all one million strings in `flock` before returning, so memory grows with $n$ and the process is killed once it exceeds available memory. The `yield` version produces one row, pauses, and resumes later, so only the current row is held and memory is independent of $n$. In control flow, `return` ends the function with a single result; `yield` suspends at the current point, preserving local state, and the next iteration continues from there. A generator returns an iterator that can be traversed once and is empty afterwards.

**7. Why is `argparse` better than hand-written `sys.argv` checks, and what does it take over?**

Reference answer: Hand-written checks must test argument counts, positions and names one by one; supporting `-n`, `--number`, optional flags and defaults produces deeply nested `if/elif`, and any change of order or new flag forces a rewrite. `argparse` declares parameters (name, type, default, help) and then parses `sys.argv`, exposing values by name, converting `type=int` automatically, generating `-h/--help`, and producing a standard usage error for invalid input. It outsources the repeated, generic parsing so the code keeps only the business logic.

## How it connects

This chapter closes the toolbox: `set` extends the data structures of chapter 7; `global` and class constants complete the encapsulation story of chapter 9; type hints and docstrings extend chapter 6's engineering habits to interfaces; `argparse` takes chapter 5's library use to the point of writing your own command-line tools; comprehensions and generators compress the loop patterns that recurred throughout. Combined with chapter 8's regex and chapter 7's file I/O, `argparse` completes a full command-line data-processing script.
