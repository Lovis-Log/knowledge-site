---
slug: "07-conditionals"
title: "Conditionals: if, else if, switch, and the Ternary Operator"
summary: "This chapter covers every conditional construct in C++: if and else, nesting versus logical operators, the short-circuit semantics of else-if chains, switch with its break and fallthrough pitfalls, and the ternary operator."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, control-flow, conditionals, switch, ternary]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 7 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=25395s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter is about

This is chapter 7 of a single 31-hour video, covering **07:03:15–07:53:35**.

The previous chapter finished the operators, and the relational and logical ones all produce `bool`. This chapter answers the obvious follow-up: once you have a `bool`, how do you make the program take different paths?

Four tools are covered: `if`, `else`, `else if` chains, and `switch`, plus the ternary operator for two-way choices. They all do the same job — conditional execution — but suit different situations. The lecturer uses one running example (traffic lights, then a drawing tool) to show that the same logic written with four different constructs reads very differently.

## Timeline

| Time | Topic |
| --- | --- |
| 07:03:15 | The `if` statement: driving output from a comparison |
| 07:04:52 | Syntax: condition in parentheses, body in braces |
| 07:05:20 | The `else` clause: catching the false case |
| 07:06:18 | Nested `if` with the traffic-light example; rewriting with logical operators |
| 07:07:42 | Live demo: the `result` variable and how to read `!result` |
| 07:15:56 | Traffic light and police stop: tracing the nested structure |
| 07:20:46 | `else if` chains: which tool is currently selected |
| 07:24:57 | Coding the `tool` variable and six tool constants |
| 07:28:51 | The `switch` statement: `case`, `break`, `default` |
| 07:31:17 | `switch` conditions must be integral or enum |
| 07:38:07 | Removing `break`: what fallthrough actually does |
| 07:39:55 | Grouping several `case` labels into one block |
| 07:42:41 | The ternary operator `? :` |
| 07:51:39 | A surprise: the direction of implicit conversion inside `?:` |

## `if`: the most basic conditional

An `if` has three parts:

```cpp
if (condition) {
    // runs when condition is true
}
```

The parentheses must hold something usable as a boolean — a comparison, a logical expression, or a `bool` variable. The braces are the body. With a single statement they may be omitted, but keeping them is safer and makes later additions easier.

The first example stores the condition before testing it:

```cpp
#include <iostream>

int main() {
    int number1 {55};
    int number2 {60};

    bool result = (number1 < number2);
    std::cout << "result : " << std::boolalpha << result << std::endl;

    if (result) {
        std::cout << number1 << " is less than " << number2 << std::endl;
    }

    if (!result) {
        std::cout << number1 << " is NOT less than " << number2 << std::endl;
    }
    return 0;
}
```

Output:

```text
result : true
55 is less than 60
```

`!result` is logical negation. The lecturer points out that beginners often trip over `if (!result)`; reading it aloud as "if result is false" resolves the confusion. Change `number1` to `65` and `result` becomes `false`, so the first `if` is skipped and the second runs, flipping the output.

### `else`: catching the other case

Testing both sides with two separate `if`s works but is verbose. `else` catches the complement directly:

```cpp
if (result) {
    std::cout << "number1 is less than number2" << std::endl;
} else {
    std::cout << "number1 is NOT less than number2" << std::endl;
}
```

The key semantics: **exactly one of the `if` and `else` branches runs**. This matters even more when nesting — once a block runs, the remaining branches at that level are skipped and control falls past the whole statement.

### Expressions as conditions

You do not need to store the `bool` first:

```cpp
if (number1 < number2) { /* ... */ }
```

C++ accepts any expression convertible to `bool` in a condition. Storing it is a readability and reuse choice, not a requirement.

### Nesting versus logical operators

The traffic light is the classic nested example:

```cpp
bool red_light {false};
bool green_light {true};
bool police_stop {true};

if (green_light) {
    if (police_stop) {
        std::cout << "Stop" << std::endl;
    } else {
        std::cout << "Go" << std::endl;
    }
}
```

The output is `Stop`: the light is green, but the officer has signalled you to stop.

The same logic flattens with `&&`:

```cpp
if (green_light && !police_stop) {
    std::cout << "Go" << std::endl;
} else {
    std::cout << "Stop" << std::endl;
}
```

Same result, one level, easier to read. **When the inner condition does not depend on anything established by the outer branch, merging with logical operators is usually clearer**; nesting remains necessary only when the inner test needs a value computed in the outer block.

## `else if`: multi-way branching

Mutually exclusive conditions become a chain:

```cpp
const int pen {10};
const int marker {20};
const int eraser {30};
const int rectangle {40};
const int circle {50};
const int ellipse {60};

int tool {eraser};

if (tool == pen) {
    std::cout << "Active tool is pen" << std::endl;
} else if (tool == marker) {
    std::cout << "Active tool is marker" << std::endl;
} else if (tool == eraser) {
    std::cout << "Active tool is eraser" << std::endl;
} else if (tool == rectangle) {
    std::cout << "Active tool is rectangle" << std::endl;
} else if (tool == circle) {
    std::cout << "Active tool is circle" << std::endl;
} else if (tool == ellipse) {
    std::cout << "Active tool is ellipse" << std::endl;
}

std::cout << "Moving on" << std::endl;
```

Output:

```text
Active tool is eraser
Moving on
```

Two things to remember:

1. **Compare with `==`, not `=`.** `if (tool = pen)` assigns, the assigned value is non-zero, and the condition is always true; compilers usually only warn. This is one of the most common beginner bugs.
2. **Only one branch of the chain runs.** After it runs, control jumps to the end of the chain, and `Moving on` still executes.

An `else if` chain is semantically equivalent to a nested `if/else` staircase, but the flat form avoids repeated indentation and suits many mutually exclusive conditions.

## `switch`: the compact multi-way form

`switch` compares one value against a set of constants:

```cpp
switch (tool) {
    case pen: {
        std::cout << "Active tool is pen" << std::endl;
        break;
    }
    case marker: {
        std::cout << "Active tool is marker" << std::endl;
        break;
    }
    case eraser: {
        std::cout << "Active tool is eraser" << std::endl;
        break;
    }
    default: {
        std::cout << "No match found" << std::endl;
        break;
    }
}
```

### Never forget `break`

`break` leaves the whole `switch` after a case runs. **Omitting it compiles fine but falls through** — from the matched case onward, every later case body runs in order until a `break` or the end of the switch.

The lecture demonstrates this live: with `tool` set to `marker` and all `break`s removed, the output becomes

```text
Active tool is marker
Active tool is eraser
Active tool is rectangle
...
No match found
```

Fallthrough is occasionally useful (see grouping below), but most of the time it is a bug. The rule: **end every case with `break` unless you deliberately want fallthrough.**

### Type restriction on the switch expression

The expression in parentheses must be integral or an enum: `int`, `char`, `unsigned`, `short`, `long` are fine, `std::string` is not. The lecture tries `std::string name {"John"}` and the compiler refuses:

```text
error: switch quantity not an integer
```

Case labels must be compile-time integral constants, and a string is neither. String dispatch has to use `if/else if`.

### Grouping cases

Several cases that share a body are written as consecutive labels:

```cpp
switch (tool) {
    case pen: {
        std::cout << "Active tool is pen" << std::endl;
        break;
    }
    case marker: {
        std::cout << "Active tool is marker" << std::endl;
        break;
    }
    case rectangle:
    case circle:
    case ellipse: {
        std::cout << "Drawing shape" << std::endl;
        break;
    }
    default: {
        std::cout << "No match found" << std::endl;
        break;
    }
}
```

Any of `rectangle`, `circle` or `ellipse` prints `Drawing shape`. This is fallthrough used deliberately: the earlier labels have no body, so control lands on the shared block.

## The ternary operator: a two-way expression

`if/else` is a statement; the ternary operator is an **expression** that produces a value:

```cpp
condition ? option1 : option2
```

The old way to compute a maximum:

```cpp
int a {35};
int b {20};
int max;

if (a > b) {
    max = a;
} else {
    max = b;
}
```

The ternary version:

```cpp
int max = (a > b) ? a : b;
```

One line, identical semantics: take `a` if the condition holds, otherwise `b`.

### Both branches must have compatible types

The two sides of `:` must have the same type, or types that convert to a common one, otherwise compilation fails:

```cpp
int a {35};
int max = (a > 20) ? a : "hello";   // error
```

The message is roughly `operands to ?: have different types 'int' and 'const char*'`.

The lecture also shows a result that surprises people:

```cpp
int a {35};
auto max = (a > 22) ? a : 22.5;
```

You might expect `22.5` to be truncated and the result to be `int`. It prints `max is 35`, but `auto` deduces **`double`** — the compiler promoted `a`. The type of a ternary is decided by both branches jointly, and the conversion does not necessarily go from wide to narrow. Declaring with `auto` makes the compiler's actual choice visible.

> **One-line summary:** flatten nesting with logical operators when you can; prefer `switch` for many mutually exclusive branches but never drop `break`; for a pure two-way choice the ternary operator is tighter than `if/else`.

## Chapter takeaways

- `if (condition)` needs something usable as a boolean; `if (!x)` reads as "if x is false".
- `else` catches the complement; exactly one of `if`/`else` at the same level runs.
- Nested `if`s can usually be merged with `&&`/`||`, and the merged version is easier to read.
- `else if` chains fit mutually exclusive conditions, but comparisons need `==`.
- `switch` conditions must be integral or enum; a missing `break` falls through.
- Consecutive `case` labels route several values to one block.
- The ternary operator `cond ? a : b` is an expression; both sides must be type-compatible, and the compiler picks the common type.

## Comprehension check

**1. When does `if (result)` run versus `if (!result)`? What changes if `result` is declared `int` instead of `bool`?**

Reference answer: `if (result)` runs when `result` is true (non-zero); `if (!result)` runs when it is false (zero). The two are complementary. C++ allows an `int` in a condition: `0` is false and any non-zero value is true. `!result` performs logical negation on the `int` and still yields a `bool`, so the behaviour matches the `bool` version. Declaring a boolean-meaning variable as `int` only loses intent; `bool` is the better choice.

**2. Why is `if (tool = pen)` dangerous? What does the compiler say?**

Reference answer: A single `=` assigns instead of comparing. `tool = pen` stores `pen` into `tool`, and the value of the whole expression is that new value, `10`, which is non-zero; the condition is therefore always true and the branch always runs. With warnings enabled the compiler typically says something like "suggest parentheses around assignment used as truth value", but it is not an error. The correct form is `if (tool == pen)`.

**3. What happens if you delete the `break` at the end of a case? When is that behaviour wanted?**

Reference answer: After a case matches, execution continues in order until a `break` or the end of the `switch`. Without `break` it falls through into the following cases and runs their bodies too. With `marker` and no `break`, the output shows marker, then eraser, then rectangle, and so on. Fallthrough is wanted when several cases share code: write the labels consecutively and put a single `break` at the end of the shared block.

**4. Why can't `switch` branch on a `std::string`, and what are the alternatives?**

Reference answer: Case labels must be compile-time integral constant expressions, and `std::string` is not integral, so `switch (name)` fails to compile with `switch quantity not an integer`. The alternatives are an `if/else if` chain comparing strings, or mapping the string to an integer first (through a `std::map<std::string,int>` or an enum) and switching on that integer.

**5. In `(a > b) ? a : b`, if `a` is `int` and `b` is `double`, what is the result type?**

Reference answer: The compiler applies the usual arithmetic conversions to the two branches, promoting `int` to `double`, so the whole expression has type `double`. Even when `a` is the selected branch, it is converted to `double` first. That is why `auto max = (a > 22) ? a : 22.5;` deduces `double`: the conversion follows the common-type rules of both branches, not whichever branch happens to be chosen at run time.

**6. Is rewriting `if (green) { if (!police_stop) ... }` as `if (green && !police_stop)` always equivalent?**

Reference answer: In this example it is, because the inner condition does not depend on the outer one, so the conjunction means the same thing. In general it need not be: if the inner test relies on a value produced inside the outer branch, the two forms are not interchangeable. Short-circuiting also matters in principle — `&&` does not evaluate its right operand when the left is false — but here both forms skip the inner test when `green` is false, so the behaviour agrees.

## How this connects to the neighbouring chapters

This chapter is the first half of flow control: it decides *which path* to take. Chapter 8 covers loops, which decide *how many times* to repeat, and together they form the skeleton of every imperative program. Later, function parameters in chapter 15 and class methods in chapter 18 reuse these conditionals heavily, while the integral-only restriction on `switch` becomes far more natural once `enum` arrives in chapter 19.
