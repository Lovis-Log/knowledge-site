---
slug: 04-functions-and-scope
title: "Functions, Parameters and Scope"
summary: "Chapter 4 of the long-form course: define reusable logic with def, work with positional and keyword parameters and defaults, understand local versus global scope, and see why return differs from print."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, functions, parameters, scope, return]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 4 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=7570s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## What this chapter covers

This is chapter 4 of the long-form video, covering 2:06:10–2:49:11. The previous three chapters gathered the parts; this one assembles them — naming a piece of logic, packaging it, calling it repeatedly. It covers defining and calling functions, parameters (positional, keyword, defaults), local versus global variables, return values, and finally modules and `import`, the real entrance to Python's ecosystem.

One distinction drives the whole chapter and all later code: **`print` only displays a value; `return` hands it back to the caller**. Without that distinction, functions cannot be composed.

## Timeline

| Time | Topic |
| --- | --- |
| 2:06:10 | Why functions: avoid repetition, package complex logic |
| 2:07:40 | Syntax: `def`, name, parentheses, colon, indentation |
| 2:09:11 | Calling; defining alone does nothing |
| 2:10:29 | Naming: snake_case, verb first |
| 2:14:52 | Parameters: giving functions input |
| 2:17:34 | Positional parameters and order; 2:19:23 keyword arguments |
| 2:19:48 | Defaults: parameters without defaults must come first |
| 2:23:01 | Local versus global variables |
| 2:29:07 | `return`: handing the result back |
| 2:33:17 | Composing expressions with return values |
| 2:35:57 | Returning several values |
| 2:38:25 | External tools: modules, packages, the start of import |

## From writing once to defining once

A loop handles a single repeated line. Real logic has several steps: read data, compute, format, output. Rewriting it each time is verbose and easy to break.

A function names that logic and lets you call it by name:

```python
def greet():
    print("Hello")

greet()
# Hello
```

Defining without calling does nothing — the definition only stores the logic in memory. `greet()` executes it.

### Anatomy

```python
def greet():
    print("Hello")
```

- `def`: the keyword that defines a function;
- `greet`: the name, snake_case, usually a verb;
- `()`: the parameter list, empty for now;
- `:`: starts the block;
- four spaces: the body.

Prefer names such as `calculate_total` or `send_email` over `thing` or `my_func`: the call site should read like a sentence.

## Parameters: giving functions input

The `greet` above is hard-coded and always prints the same thing. Parameters make it dynamic:

```python
def greet(name):
    print(f"Hello, {name}")

greet("Dave")
# Hello, Dave

greet("Alice")
# Hello, Alice
```

Inside the function, `name` is just a variable whose value comes from the call.

### Positional parameters

Several parameters match by position:

```python
def greet(first_name, last_name):
    print(f"Hello, {first_name} {last_name}")

greet("Dave", "Ebbelaar")
# Hello, Dave Ebbelaar
```

Too few or too many arguments raise an error:

```python
greet("Dave")
# TypeError: greet() missing 1 required positional argument: 'last_name'
```

Reversed order does not raise — it silently produces the wrong result:

```python
greet("Ebbelaar", "Dave")
# Hello, Ebbelaar Dave
```

### Keyword arguments

Naming the parameters at the call site removes the ordering problem:

```python
greet(last_name="Ebbelaar", first_name="Dave")
# Hello, Dave Ebbelaar
```

The instructor's recommendation: with more than one parameter, name them. A few extra characters buy a readable call and prevent ordering bugs.

### Default parameters

```python
def greet(first_name="John", last_name="Doe"):
    print(f"Hello, {first_name} {last_name}")

greet()
# Hello, John Doe

greet(first_name="Dave")
# Hello, Dave Doe
```

Rule: **parameters with defaults must follow those without**. Otherwise Python cannot tell which argument was omitted:

```python
def greet(first_name="John", last_name):
    ...
# SyntaxError: non-default argument follows default argument
```

### A realistic example

```python
def calculate_total(price, tax_rate, discount):
    tax = price * tax_rate
    final_price = price + tax - discount
    print(f"Final price: {final_price:.2f}")

calculate_total(price=100, tax_rate=0.08, discount=10)
# Final price: 98.00
```

Called with keyword arguments, a wrong order still computes the right thing; the body computes tax first, then the total, keeping the steps visible.

## Local and global variables

Python executes top to bottom, but a function body has its own scope.

```python
discount = 20          # global

def calculate_total(price):
    discount = 10      # local, shadows the global
    return price - discount

print(calculate_total(100))  # 90
print(discount)              # 20
```

Key points:

- a variable assigned inside a function is **local** and invisible outside;
- when names collide, the local one wins inside the function;
- globals are readable from inside functions.

```python
def show_discount():
    print(discount)

discount = 20
show_discount()
# 20
```

The reverse fails:

```python
def calculate_total(price):
    local_discount = 10
    return price - local_discount

print(local_discount)
# NameError: name 'local_discount' is not defined
```

The advice: **do not hide dependencies in globals**. If a function needs a value, make it a parameter. Otherwise changing the global elsewhere, or moving the function to another file, silently breaks it — and the error appears far from the cause.

```python
# avoid: hidden dependency
def calculate_total(price):
    return price - discount

# prefer: explicit input
def calculate_total(price, discount):
    return price - discount
```

## return: handing the result back

This is the most important section of the chapter.

```python
def add_print(a, b):
    print(a + b)

add_print(5, 10)
# 15
```

The 15 appears on screen and is then gone: no variable holds it, so it cannot be added to 50 or written to a file.

`return` hands the value to the caller:

```python
def add(a, b):
    return a + b

result = add(5, 10)
print(result)        # 15
print(result + 50)   # 65
```

The difference:

| | `print` | `return` |
| --- | --- | --- |
| Purpose | show a value to a human | hand a value to the program |
| Usable afterwards | no | yes — store it, compute with it |
| Typical use | debugging, final output | almost all real logic |

A common trap: a function that prints, captured into a variable, yields `None`.

```python
result = add_print(5, 10)  # prints 15
print(result)              # None
```

### Composing with return values

Returned values participate in expressions, so functions behave like building blocks:

```python
def double(n):
    return n * 2

print(double(5) + double(3))  # 16
print(double(5) > 8)          # True
```

### Returning several values

Separate with commas; the caller unpacks in order:

```python
def first_and_last(numbers):
    first = numbers[0]
    last = numbers[-1]
    return first, last

f, l = first_and_last([1, 2, 3, 4, 5])
print(f)  # 1
print(l)  # 5
```

Under the hood it returns one tuple, so it can also be captured whole:

```python
pair = first_and_last([1, 2, 3, 4, 5])
print(pair)     # (1, 5)
print(pair[0])  # 1
```

## From functions to modules

Functions reuse logic within one file; modules reuse it across files. This is only a transition; the next chapter goes deeper.

Terminology:

- **module**: a `.py` file;
- **package**: a folder containing modules;
- **function**: a specific tool inside a module;
- **class**: a blueprint for building objects (covered later).

A useful image: a module is a toolbox, a package is a garage of toolboxes, a function is a hammer in a box, and a class is a blueprint for making tools.

```python
import math

print(math.sqrt(16))  # 4.0
```

Importing the module and calling `module.function`. Or take only what is needed:

```python
from math import sqrt, pi

print(sqrt(16))  # 4.0
print(pi)        # 3.141592653589793
```

The difference is the namespace: after `from ... import ...` the names are directly available, and also easier to collide with your own variables.

## Takeaways

- `def name(params):` defines a function; defining alone does nothing.
- Use snake_case names that start with a verb and read well at the call site.
- Parameters make functions dynamic; prefer keyword arguments once there is more than one.
- Parameters with defaults must come last.
- Variables assigned inside a function are local; do not rely on globals — pass dependencies in.
- `return` hands the value back, `print` only displays it.
- Returning several values really returns a tuple.
- A module is a `.py` file, a package is a folder of modules; `import` enables reuse across files.

## Check your understanding

**1. Why does running a script that only defines `def greet(): ...` produce no output?**

Reference answer: A `def` statement compiles the body into a function object and binds it to a name; it does not execute the body. The body runs only when `greet()` is called. So the script finishes after the definition with nothing printed.

**2. After `result = add(5, 10)`, what is `result` for each version, and why?**

```python
def add_print(a, b):
    print(a + b)

def add(a, b):
    return a + b
```

Reference answer: `add_print` has no `return`, so Python returns `None` by default and `result` is `None`; only 15 appears on screen. `add` returns 15, so `result` is 15 and can be used in further computation. The difference is display versus hand-back.

**3. What error does `def greet(first_name="John", last_name):` raise, and what is the rule?**

Reference answer: `SyntaxError: non-default argument follows default argument`. Parameters with defaults must come after all parameters without them, because omitted arguments are matched from the right; if a defaulted parameter comes first and a required one follows, the interpreter cannot tell which position was omitted. The correct form is `def greet(first_name, last_name="Doe")`.

**4. What does the code print, and how should the function obtain `discount` from outside?**

```python
discount = 20

def calculate_total(price):
    discount = 10
    return price - discount

print(calculate_total(100))
print(discount)
```

Reference answer: `90` and `20`. The assignment inside the function creates a local variable that shadows the global; the function returns `100 - 10 = 90`, while the global `discount` stays 20. The right fix is not to depend on the global but to take it as a parameter: `def calculate_total(price, discount): return price - discount`, called with `discount=20`.

**5. Why is "returning several values" really returning one value?**

Reference answer: `return first, last` first builds the tuple `(first, last)` and returns that tuple, so the function's real return value is a single tuple. At the call site, `f, l = ...` unpacks the tuple into two names; writing `pair = first_and_last(...)` shows the tuple itself.

## How it connects

Functions turn the parts from the first four chapters into reusable units and give code a modular shape. The next chapter crosses from reuse within a file to reuse across files: module and package imports, installing third-party libraries with `pip`, pinning dependencies in `requirements.txt`, and calling a first API with `requests`. Every later chapter organises code in functions.
