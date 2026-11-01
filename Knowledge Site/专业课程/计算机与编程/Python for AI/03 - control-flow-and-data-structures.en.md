---
slug: 03-control-flow-and-data-structures
title: "Control Flow and Data Structures"
summary: "Chapter 3 of the long-form course: steer programs with if/elif/else and for loops, then organise many values with lists, dictionaries, tuples and sets, including zero-based indexing and how to choose between them."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, control-flow, lists, dictionaries, data-structures]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 3 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=6034s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## What this chapter covers

This is chapter 3 of the long-form video, covering 1:40:34–2:06:10. The previous chapter ended with a first `if`; this one finishes branching (`elif` chains and nesting), adds the "repeat" action (`for` loops), and then moves to data structures: when a variable must hold many values, Python offers lists, dictionaries, tuples and sets, each with a clear purpose.

This closes the "Python basics" section. The instructor is candid: the material is abstract at first and does not need memorising — the point is a first exposure that later project work will keep reinforcing.

## Timeline

| Time | Topic |
| --- | --- |
| 1:40:34 | `elif` chains: stop at the first match, used for grading |
| 1:42:04 | Conditions combined with `and`/`or`/`not`; nested `if` |
| 1:43:37 | Why loops exist: repeat without copying code |
| 1:44:09 | `for` and `range`: the counter, zero-based indexing |
| 1:46:27 | `range`: start, stop and step |
| 1:47:50 | Overview of containers: list, dict, tuple, set |
| 1:49:00 | Lists: creation, indexing, slicing |
| 1:53:13 | Changing lists: `append`, `insert`, `remove` |
| 1:55:39 | Dictionaries: key-value pairs, lookup, insert, delete |
| 1:59:45 | Tuples: immutable |
| 2:01:37 | Sets: removing duplicates |
| 2:04:05 | Wrapping up the basics section and how to practise |

## Conditionals: writing every branch

### elif chains

Grading is the classic example. `elif` is evaluated top to bottom, and **once a condition holds, every later branch is skipped**:

```python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("needs improvement")
# B
```

Order matters. Put `>= 80` before `>= 90` and a score of 95 matches the first branch and gets a B. Conditions should run from strictest to loosest.

### Combining with logical operators

A condition can be any boolean expression:

```python
age = 12
has_license = True

if age >= 16 and has_license:
    print("can drive")
else:
    print("cannot drive")
# cannot drive
```

### Nesting

An `if` can contain another `if` for layered decisions:

```python
has_ticket = True
age = 15

if has_ticket:
    if age >= 18:
        print("enjoy the movie")
    else:
        print("needs supervision")
else:
    print("please buy a ticket")
# needs supervision
```

Deep nesting gets hard to read; beyond two levels, consider a function or an early return.

## Loops: write the repetition once

Running the same logic five times by copying it is verbose and hard to change. A `for` loop writes it once:

```python
for i in range(5):
    print(i)
# 0
# 1
# 2
# 3
# 4
```

Breaking it down:

- `for` starts the loop;
- `i` is the loop variable, any name works, `i` is conventional;
- `in range(5)` yields 0, 1, 2, 3, 4 in turn;
- the colon and indentation mark the body.

**Python counts from zero (zero-indexed)**, so `range(5)` gives 0 through 4 — five values, not 1 through 5.

### Three forms of range

```python
range(5)        # 0,1,2,3,4
range(1, 6)     # 1,2,3,4,5   includes start, excludes stop
range(0, 10, 2) # 0,2,4,6,8   step of 2
```

"Inclusive start, exclusive stop" is the usual mistake: to get 1 through 6, write `range(1, 7)`. The instructor admits he still checks twice in the interactive window.

### The loop variable is available in the body

```python
for i in range(3):
    print(f"round {i + 1}")
# round 1
# round 2
# round 3
```

When the counter is unused, an underscore signals that:

```python
for _ in range(3):
    print("hello world")
```

## Data structures: many values in one variable

So far each variable held one value. Real data comes in groups: the paragraphs of a document, the fields of an order, a batch of de-duplicated user IDs. Four containers cover four needs:

| Structure | Syntax | Properties | Typical use |
| --- | --- | --- | --- |
| list | `[...]` | ordered, mutable, duplicates allowed | a collection of similar items |
| dict | `{key: value}` | key-value pairs, lookup by key | the fields of one record |
| tuple | `(...)` | ordered, immutable | coordinates, RGB, fixed config |
| set | `{...}` or `set()` | unordered, unique elements | de-duplication, membership |

### Lists

```python
my_list = ["Alice", 25, True]
```

Lists can mix types; Python does not restrict them. **Indexing starts at 0**:

```python
my_list = ["Alice", 25, True]

print(my_list[0])   # Alice
print(my_list[1])   # 25
print(my_list[-1])  # True   last
print(my_list[-2])  # 25     second from the end
```

Slicing takes a range (again inclusive start, exclusive stop):

```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:3])   # [20, 30]
print(numbers[:2])    # [10, 20]
print(numbers[2:])    # [30, 40, 50]
```

Modifying and resizing:

```python
my_list = ["Alice", 25, True]

my_list[0] = "Dave"
print(my_list)                 # ['Dave', 25, True]

my_list.append("New York")     # append to the end
my_list.insert(1, "engineer")  # insert at index 1
my_list.remove("Dave")         # remove first matching value
print(my_list)                 # [25, 'engineer', 'New York']
```

Other methods include `sort()`, `reverse()` and `count()`. The instructor's advice: do not memorise them; know what a list can do and look up the rest.

### Dictionaries

In a list, `Alice` and `25` are merely adjacent; they carry no relationship. A dictionary expresses relationships through keys:

```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

print(person["name"])  # Alice
print(person["age"])   # 25
```

The rule: **create with braces, read with square brackets and a key**. Keys are usually strings, but any immutable type works.

Update, insert, delete:

```python
person["name"] = "Dave"      # update
person["license"] = True     # insert (missing key creates it)
del person["license"]         # delete
print(person)
# {'name': 'Dave', 'age': 25, 'city': 'New York'}
```

Reading a missing key raises `KeyError`; the safe form is:

```python
print(person.get("email"))        # None
print(person.get("email", "n/a")) # n/a
```

Inspecting structure:

```python
print(person.keys())    # dict_keys(['name', 'age', 'city'])
print(person.values())  # dict_values(['Dave', 25, 'New York'])
print(person.items())   # dict_items([('name', 'Dave'), ...])
```

How to choose: lists when position and order matter; dictionaries when fields are looked up by name. JSON from an API parses into nested dictionaries, which is why dictionaries dominate the later chapters.

### Tuples

A tuple cannot change after creation:

```python
point = (3, 5)
color = (255, 0, 0)

print(point[0])  # 3
print(color[-1]) # 0
```

```python
point[0] = 10
# TypeError: 'tuple' object does not support item assignment
```

Why have an immutable container? When a value should never change by design (a coordinate, a colour, a fixed setting), a tuple writes that rule into the type so no other part of the program can alter it accidentally. To change it, build a new tuple.

### Sets

Sets remove duplicates automatically and make membership tests fast:

```python
scores = [90, 85, 90, 85, 70]
unique_scores = set(scores)
print(unique_scores)  # {90, 85, 70}

fruits = {"apple", "banana", "orange", "banana"}
print(fruits)  # {'apple', 'banana', 'orange'}
```

An empty set must be `set()`; `{}` is an empty dictionary.

Sets are unordered and cannot be indexed; their job is de-duplication and membership:

```python
print("apple" in fruits)  # True
```

## Takeaways

- `elif` chains evaluate top to bottom and stop at the first match; order them strictest first.
- `for i in range(n)` repeats work; `range` excludes the stop value and accepts a step.
- Indexing starts at 0; negative indices count from the end.
- Lists: ordered and mutable, square brackets, for collections.
- Dictionaries: key-value pairs, braces to create, brackets to read by key.
- Tuples: immutable, for values that should not change.
- Sets: unique elements, for de-duplication and membership.

## Check your understanding

**1. Which numbers does `range(1, 6)` produce? How do you get 1 through 6, and why?**

Reference answer: `range(1, 6)` yields 1, 2, 3, 4, 5 — the stop value is excluded. To include 6, write `range(1, 7)`. `range(start, stop)` is a half-open interval with length `stop - start`; that convention makes `range(n)` produce exactly n values and keeps slice and loop boundaries consistent.

**2. Given `nums = [10, 20, 30, 40, 50]`, what are `nums[-2]` and `nums[1:4]`?**

Reference answer: `nums[-2]` is `40`, since negative indices count from the end (-1 is last, -2 is second to last). `nums[1:4]` is `[20, 30, 40]`: positions 1, 2 and 3, stopping before index 4.

**3. Why does this print B rather than A? How do you make it print A?**

```python
score = 95
if score >= 80:
    print("B")
elif score >= 90:
    print("A")
```

Reference answer: An `elif` chain evaluates top to bottom; 95 already satisfies `>= 80`, so B prints and later branches are skipped. Put the strictest test first: `if score >= 90: print("A")` followed by `elif score >= 80: print("B")`.

**4. Which storage suits "look up an age by name", and why?**

```python
people_list = [("Alice", 25), ("Dave", 30)]
people_dict = {"Alice": 25, "Dave": 30}
```

Reference answer: The dictionary. `people_dict["Alice"]` returns 25 directly, with roughly constant-time lookup; the list requires scanning and comparing names, which grows linearly. If the requirement were to iterate over everyone in insertion order, the list would be more natural. The access pattern decides: position-based iteration favours lists, name-based lookup favours dictionaries.

**5. Why does `scores = {90, 85, 90}` print only two elements, and what limitation does that imply?**

Reference answer: Braces without key-value pairs create a set, and sets discard duplicates, so 90 appears once. The limitation is that sets are unordered: no indexing, and iteration order is not something to rely on. Elements must also be immutable (numbers, strings, tuples), so a list cannot go into a set.

## How it connects

The "Python basics" section ends here: values, variables, operators, branching, loops and containers are all in place. The next chapter assembles the parts — functions that package reusable logic, with parameters, return values and scope — then modules and external libraries. From there the code starts to look like a real program rather than isolated one-liners.
