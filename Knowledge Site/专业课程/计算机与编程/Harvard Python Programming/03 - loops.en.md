---
slug: "03-loops"
title: "Loops: Turning Repetition into Structure"
summary: "CS50P week 2: replace repeated code with while and for loops, learn counting, infinite loops and input validation, traverse lists and dictionaries, build rows and squares with nested loops, and abstract the problem into functions."
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "loops"
  - "lists"
  - "dictionaries"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 3 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=9998s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## What this chapter covers

This is chapter 3 of the long video, covering CS50P week 2 (02:46:38–04:07:34) and the subject of **loops**.

The starting point is a small defect: to make a cat meow three times, the simplest thing is three lines of `print("meow")`. It runs, but ask for fifty meows, five hundred, or a change from "meow" to "woof", and the code collapses. Loops exist to handle this entire class of problem: doing the same thing repeatedly.

The chapter follows that thread: a `while` loop with a hand-managed counter, including an accidental infinite loop; `for` with `range`, which hands the counting to Python; `while True` with `break` for input validation; lists and dictionaries, so loops can traverse data rather than numbers; and finally the Mario bricks, where loops, functions and abstraction come together.

## Timeline

| Time | Topic |
| --- | --- |
| 2:46:38 | The week's theme: why loops exist |
| 2:47:00 | `cat.py`: the trouble with three `print` lines |
| 2:49:56 | The `while` loop and a counter |
| 2:52:06 | Infinite loops: why they are dangerous and how Ctrl-C saves you |
| 2:54:11 | Counting down so the program actually stops |
| 2:56:26 | Counting up from 1 to 3 |
| 2:58:15 | The convention of counting from 0, and `i += 1` |
| 3:02:43 | `for` loops over the list `[0, 1, 2]` |
| 3:07:16 | `range(3)`: stop hand-listing values for extreme cases |
| 3:09:04 | Using `_` for a loop variable you do not care about |
| 3:09:35 | String multiplication: `"meow\n" * 3` |
| 3:13:11 | Letting the user choose how many meows |
| 3:14:44 | `while True` with `continue` / `break` for validation |
| 3:18:05 | Packaging `meow` and `get_number` as functions |
| 3:21:06 | Lists: `students = ["Hermione", "Harry", "Ron"]` |
| 3:23:04 | Zero-based indexing; `students[0]` |
| 3:24:03 | `for student in students` to traverse a list |
| 3:27:26 | `len()` and `range(len(students))` |
| 3:32:00 | Dictionaries: key-value pairs and curly braces |
| 3:38:15 | Iterating a dictionary yields its keys |
| 3:43:18 | A list of dictionaries: several attributes per student |
| 3:46:00 | `None`: the absence of a value |
| 3:51:28 | Mario: a column, a row, a square |
| 4:01:55 | Nested loops and `print()` for a newline |
| 4:05:03 | Simplifying the inner loop with string multiplication |

## The problem: repeated code

```python
print("meow")
print("meow")
print("meow")
```

Three identical lines. The problem is not "three lines" but what comes next:

- How do you meow three hundred times? Copy and paste three hundred lines?
- How do you change the cat to a dog? Edit three hundred places.
- How do you let the user decide the count? You cannot.

Loops turn repetition from **how many lines you write** into **a parameter**.

## while: managing the counter yourself

`while` takes a boolean expression and repeats its indented block as long as that expression is true.

```python
i = 3
while i != 0:
    print("meow")
    i = i - 1
```

This prints three lines. The order of execution:

1. `i = 3`;
2. test `i != 0`, true;
3. print, then `i` becomes 2;
4. back to step 2, until `i` reaches 0 and the test is false.

### Infinite loops

Forget the update in step 3:

```python
i = 3
while i != 0:
    print("meow")
```

`i` stays 3 forever, the condition stays true, and the program prints without end. This accident is an **infinite loop**. In a terminal, press `Ctrl-C` to interrupt it; there is no need to reboot.

> **Note:** this is the classic `while` bug. Whenever you write one, ask immediately: **does the body contain the step that changes the condition?**

### Counting up, down and `+=`

Counting from 1 to 3:

```python
i = 1
while i <= 3:
    print("meow")
    i = i + 1
```

Most programmers count from 0, because list indices start at 0:

```python
i = 0
while i < 3:
    print("meow")
    i += 1
```

Note `< 3` rather than `<= 3`: starting at 0 and stopping before 3 gives exactly three iterations.

`i += 1` abbreviates `i = i + 1`. Python has no `i++` — that is C, C++ and Java syntax.

## for: letting Python count

```python
for i in [0, 1, 2]:
    print("meow")
```

`for` assigns each value in the list to `i` in turn and runs the body once per value. You neither initialise nor update the counter; `i` becomes 0, then 1, then 2.

But writing `[0, 1, 2]` by hand brings back the old problem: what about a million meows?

### range

```python
for i in range(3):
    print("meow")
```

`range(n)` produces the integers from 0 up to but not including n. `range(3)` is `0, 1, 2`.

A million meows is just `range(1_000_000)`.

### Naming an unused variable `_`

If the loop variable is never used, the Python convention is a single underscore:

```python
for _ in range(3):
    print("meow")
```

This tells the reader a counter is required but its value does not matter. Do not name a variable `_` and then use it — that only confuses people.

### String multiplication

Python lets `*` repeat a string:

```python
print("meow\n" * 3, end="")
```

This prints three lines. `"meow\n"` is one unit including its newline; multiplying by 3 produces three units; `end=""` stops `print` from adding a fourth newline, which would leave a blank line.

The line is short, but less readable than a loop. The lecture's stance: **it works, but do not sacrifice readability for cleverness.**

## Input validation: while True + break

Let the user choose the number of meows, while insisting on a positive number. A single `if` is not enough, since the user may get it wrong repeatedly. Use a loop:

```python
while True:
    n = int(input("What's n? "))
    if n > 0:
        break
```

`while True` is a **deliberate** infinite loop with `break` as the exit. The flow:

1. the condition is always true, so enter the loop;
2. read input;
3. if `n > 0`, break out;
4. otherwise do nothing and ask again.

To skip the rest of the current iteration but stay in the loop, use `continue`:

```python
while True:
    n = int(input("What's n? "))
    if n < 0:
        continue
    break
```

### Wrapping it in functions

```python
def main():
    number = get_number()
    meow(number)


def get_number():
    while True:
        n = int(input("What's n? "))
        if n > 0:
            return n


def meow(n):
    for _ in range(n):
        print("meow")


main()
```

Two details:

- `get_number` uses `return n` to leave the function and hand back the value, which is cleaner than breaking and then returning;
- `meow` only prints, `get_number` only obtains a number — separate responsibilities.

## Lists: several values in one variable

```python
students = ["Hermione", "Harry", "Ron"]
```

Square brackets denote a list. Access elements with brackets and an index, and **indices start at 0**:

```python
print(students[0])   # Hermione
print(students[1])   # Harry
print(students[2])   # Ron
```

### Traversal

```python
for student in students:
    print(student)
```

You do not need to know the length or use indices. Name the variable `student` rather than `s` or `_`, because it really is a student.

### When you need indices

```python
for i in range(len(students)):
    print(i + 1, students[i])
```

`len(students)` returns the length, and `range(len(...))` produces the indices. `i + 1` is only for displaying a human-friendly count.

## Dictionaries: key-value pairs

A list is indexed by number; a dictionary is indexed by **a key you choose**:

```python
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Draco": "Slytherin",
}

print(students["Hermione"])   # Gryffindor
```

Curly braces denote a dictionary, with `key: value` pairs. Look up a value by placing its key in brackets.

Iterating a dictionary:

```python
for student in students:
    print(student, students[student], sep=", ")
```

A `for` loop over a dictionary yields its **keys**, not its values. Output:

```text
Hermione, Gryffindor
Harry, Gryffindor
Ron, Gryffindor
Draco, Slytherin
```

### A list of dictionaries

When each student has several attributes:

```python
students = [
    {"name": "Hermione", "house": "Gryffindor", "patronus": "Otter"},
    {"name": "Harry", "house": "Gryffindor", "patronus": "Stag"},
    {"name": "Ron", "house": "Gryffindor", "patronus": "Jack Russell terrier"},
    {"name": "Draco", "house": "Slytherin", "patronus": None},
]

for student in students:
    print(student["name"], student["house"], student["patronus"], sep=", ")
```

`None` is Python's keyword for "no value", capitalised. Draco has no patronus, and `None` says that explicitly — an empty string `""` could equally mean "I forgot to fill this in".

## Mario: building with loops and abstraction

### A column

```python
def main():
    print_column(3)


def print_column(height):
    for _ in range(height):
        print("#")


main()
```

A taller column means one changed argument.

### A row

```python
def print_row(width):
    print("?" * width)
```

String multiplication reduces "print a row" to one line.

### A square

```python
def print_square(size):
    for i in range(size):
        for j in range(size):
            print("#", end="")
        print()
```

Output:

```text
###
###
###
```

Key points:

- the outer loop handles **rows**, the inner loop handles **bricks within a row**;
- the inner `print` uses `end=""` so bricks stay on the same line;
- after the inner loop, a bare `print()` emits one newline and moves to the next row;
- `i` and `j` are conventional names; a third level of nesting usually means it is time to extract a function.

### Simplifying with string multiplication

```python
def print_square(size):
    for _ in range(size):
        print("#" * size)
```

The outer loop is still needed to produce multiple rows; the inner loop can be replaced by multiplication.

### The value of abstraction

`print_square` does not need to know how a row is printed:

```python
def print_square(size):
    for _ in range(size):
        print_row(size)


def print_row(width):
    print("#" * width)
```

`print_row` can now be reimplemented freely — with a loop, with multiplication, or later with graphics — and as long as its name and parameters stay the same, callers need not change. That is **abstraction**: hide the how, expose the what.

## Chapter summary

- Repeated code should become a loop; a loop turns the repetition count into a parameter.
- `while` requires you to initialise, test and update the counter; forget the update and you get an infinite loop, which `Ctrl-C` interrupts.
- `i += 1` abbreviates incrementing; Python has no `i++`.
- `for ... in range(n)` yields 0 through n-1; name an unused loop variable `_`.
- Strings can be repeated with `*`, and `\n` plus `end=""` controls layout.
- `while True` with `break` is the standard validation pattern; `continue` skips one iteration.
- Lists use `[]` and zero-based indices; `for x in list` traverses elements, `range(len(list))` traverses indices.
- Dictionaries use `{}` and are looked up by key; iteration yields keys.
- `None` means "no value", which differs from an empty string.
- Nested loops print row by row; a bare `print()` emits only a newline.
- Functions break complicated output into reusable abstractions.

## Comprehension check

**1. What happens in the following, and how should it be fixed?**

```python
i = 3
while i != 0:
    print("meow")
```

Reference answer: it prints `meow` forever. Nothing in the loop body changes `i`, so `i != 0` remains true. The fix is to decrement inside the loop:

```python
i = 3
while i != 0:
    print("meow")
    i -= 1
```

In a terminal, `Ctrl-C` interrupts a loop that has already run away.

**2. What values does `range(3)` produce? How many iterations does `for i in range(3)` run? How would you loop through 3 inclusive?**

Reference answer: `range(3)` produces `0, 1, 2`, so the loop runs 3 times. It starts at 0 and stops before the argument. To include 3, use `range(4)`, which produces `0, 1, 2, 3`.

**3. Why use `while True` with `break` for input validation instead of a single `if`?**

Reference answer: a single `if` checks once. If the user keeps entering bad values, the program either accepts a wrong value or exits, and cannot keep asking. `while True` keeps asking until the condition is met:

```python
while True:
    n = int(input("What's n? "))
    if n > 0:
        break
```

`while True` is an intentional infinite loop, and `break` is its only exit, so the exit condition deserves careful thought.

**4. List indices start at 0. Write a loop that prints students numbered from 1, like "1. Hermione".**

Reference answer:

```python
students = ["Hermione", "Harry", "Ron"]

for i in range(len(students)):
    print(f"{i + 1}. {students[i]}")
```

Output:

```text
1. Hermione
2. Harry
3. Ron
```

`len(students)` gives 3, `range(3)` gives 0, 1, 2, and `i + 1` converts the internal index into a human numbering.

**5. When `for student in students` iterates over a dictionary, what does `student` hold? How do you print both key and value?**

Reference answer: it holds the **key**. Index the dictionary by that key to print both:

```python
students = {"Hermione": "Gryffindor", "Draco": "Slytherin"}

for student in students:
    print(student, students[student], sep=", ")
```

Output:

```text
Hermione, Gryffindor
Draco, Slytherin
```

**6. Explain each layer of the following code. What happens if the inner `end=""` is removed?**

```python
def print_square(size):
    for i in range(size):
        for j in range(size):
            print("#", end="")
        print()
```

Reference answer: the outer loop `i` runs `size` times and controls rows; the inner loop `j` also runs `size` times and controls bricks per row; `print("#", end="")` prints one brick without a newline; after the inner loop, the bare `print()` emits a newline and moves to the next row.

Without `end=""`, every `#` would end with a newline, producing a single vertical column instead of a `size × size` square.

**7. Why is it better for `print_square` to call `print_row` rather than doing the string multiplication itself?**

Reference answer: `print_square` only cares about printing `size` rows, not how one row is printed. Delegating the latter to `print_row` separates two responsibilities: if the row style changes later (say `?` instead of `#`), only `print_row` changes and `print_square` stays untouched. That is the benefit of abstraction — callers depend on names and parameters, not on implementation details.

## Relation to neighbouring chapters

Loops extend the previous chapter's "run once, conditionally" to "run repeatedly", and together the three constructs form a complete control flow. The lists and dictionaries introduced here underpin files, data processing and objects later in the course. The `while True` validation pattern will later be replaced or supplemented by `try` / `except`.

The "abstract first, implement second" habit from the Mario examples recurs in the chapters on functions, testing and object-oriented programming.
