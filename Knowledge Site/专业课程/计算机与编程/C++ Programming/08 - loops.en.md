---
slug: "08-loops"
title: "Loops: the Five Parts of for, while, and do-while"
summary: "This chapter splits every loop into initializer, start, test, advance, and body; it traces the order in which a for loop runs, explains iterator scope, and contrasts while with do-while on \"test first\" versus \"run first\"."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, control-flow, loops, for-loop, while-loop, size-t]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 8 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=28415s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter is about

This is chapter 8 of a single 31-hour video, covering **07:53:35–08:48:27**.

The previous chapter decided *which path* to take; this one decides *how many times to repeat*. The opening question is blunt: printing a message ten times is easy to copy by hand, but ten thousand times? A loop turns repetition from manual labour into one statement.

Three loops are covered: `for`, `while`, and `do-while`. The lecturer keeps returning to one idea: **every loop has five parts** — iterator, starting point, test, advance, and body. The three syntaxes differ only in where those parts are written.

## Timeline

| Time | Topic |
| --- | --- |
| 07:53:35 | Motivation: printing 10 times, 10,000 times, 100,000 times |
| 07:55:19 | `for` syntax and its five parts |
| 07:58:08 | Step-by-step trace: why the loop runs exactly ten times |
| 08:01:04 | Iterator types: `unsigned int` versus `size_t` |
| 08:03:27 | Iterator scope; when the braces may be omitted |
| 08:04:35 | Declaring the iterator outside so it survives the loop |
| 08:05:27 | Do not hard-code the bound: store it in `count` |
| 08:06:28 | Live coding: the for loop and `sizeof(size_t)` |
| 08:16:51 | Scope experiment: the compile error from using `i` after the loop |
| 08:25:18 | `while` syntax and execution order |
| 08:29:21 | Live coding: the while version |
| 08:36:42 | `do-while`: run first, test afterwards |
| 08:45:32 | The `do-while` trap: it runs once even when the count is zero |

## `for`: all five parts on one line

```cpp
for (size_t i {0}; i < 10; ++i) {
    std::cout << i << " : I love C++" << std::endl;
}
```

The parentheses hold three sections separated by **semicolons**:

1. **Initializer**: `size_t i {0}` declares the iterator and sets the start. Runs once, before the loop.
2. **Test**: `i < 10` decides when to stop. Checked before each iteration.
3. **Advance**: `++i` runs after each pass through the body, moving the iterator toward the end.

The body is the code between the braces. Those are the five parts: iterator, start, test, advance, body.

### Execution order

This is the part every beginner should trace by hand:

1. Run the initializer, `i = 0` (only once).
2. Evaluate the test `0 < 10`; true, so enter the body.
3. Finish the body, run the advance `++i`, so `i` becomes 1.
4. Go back to step 2 and test `1 < 10`.

When `i` reaches 10, the test `10 < 10` is false, the loop ends, and control continues after it. **So the body runs ten times and `i` takes the values 0 through 9** — not 1 through 10, and not eleven times.

Output:

```text
0 : I love C++
1 : I love C++
...
9 : I love C++
```

Change the test to `i < 100` and the output becomes 0 through 99; the loop code stays the same length and only the bound moves. That is the value of a loop.

### Which integer type for the iterator

Three common choices:

- `unsigned int`: represents non-negative values, convenient but not guaranteed to be large enough.
- `size_t`: the standard library's unsigned type for sizes; `sizeof(size_t)` is 8 bytes on this machine.
- `int`: signed, and prone to sign-mismatch warnings when combined with functions returning unsigned sizes.

The lecturer recommends `size_t`, since standard-library indices use it and mixing types then raises no sign warnings. Remember it is **unsigned**: assigning a negative value wraps around to a huge positive one, so a `i < COUNT` test stays true for a very long time, which is effectively an infinite loop.

```cpp
std::cout << "sizeof(size_t) : " << sizeof(size_t) << std::endl;
```

On this machine the output is `8`, so it can represent 0 up to roughly $1.8\times10^{19}$.

### Iterator scope

An iterator declared in the `for` initializer is visible **only inside that loop**:

```cpp
for (size_t i {0}; i < 10; ++i) {
    // i is visible here
}
// i is not visible here
```

Using `i` after the loop fails to compile:

```text
error: 'i' was not declared in this scope
```

If the final value is genuinely needed afterwards, there are two forms. Declare the iterator outside:

```cpp
size_t i {0};
for (i = 0; i < 10; ++i) {
    std::cout << i << " : I love C++" << std::endl;
}
std::cout << "Loop done, i = " << i << std::endl;   // i is 10
```

Or drop the initializer entirely and keep the semicolon:

```cpp
size_t j {0};
for (; j < 10; ++j) {
    // ...
}
```

The two are equivalent. The second is a little less obvious to a reader, so the lecture presents it only as something you may meet in other people's code.

### Do not hard-code the bound

```cpp
for (size_t i {0}; i < 10; ++i)   // 10 is hard-coded
```

If that 10 appears in many places, changing the requirement means hunting every occurrence. Store it in a constant instead:

```cpp
const size_t COUNT {10};
for (size_t i {0}; i < COUNT; ++i) {
    std::cout << i << " : I love C++" << std::endl;
}
```

Now there is a single point of control. Upper-case constant names are a C++ convention, not a language rule.

## `while`: test first, then run

`while` spreads the same five parts out:

```cpp
const size_t COUNT {10};
size_t i {0};              // iterator and start

while (i < COUNT) {        // test
    std::cout << i << " : I love C++" << std::endl;
    ++i;                   // advance, at the end of the body
}
```

The execution order matches `for` exactly: test, enter the body only on success, and return to the test after the body. Only the placement differs.

One dangerous difference: in `for` the advance is forced into the parentheses, whereas in `while` it **hides inside the body**. Forget it:

```cpp
size_t i {0};
while (i < 10) {
    std::cout << i << " : I love C++" << std::endl;
    // forgot ++i
}
```

`i` stays 0, the condition stays true, and the program prints forever — the most common source of infinite loops with `while`.

Rule of thumb: use `for` when the number of iterations is known and driven by a counter; use `while` when the loop depends on a state whose duration is unknown, such as reading to the end of a file or waiting for a condition.

## `do-while`: run first, test afterwards

```cpp
const size_t COUNT {10};
size_t i {0};

do {
    std::cout << i << " : I love C++" << std::endl;
    ++i;
} while (i < COUNT);
```

Two syntactic details: the `while (...)` comes **after** the braces, and the whole statement ends with a semicolon.

Semantically, `do-while` differs in one essential way: **the body runs at least once**, because the test happens afterwards. With a count of 10 all three loops print the same thing; the difference only appears at the boundary where the count is zero.

Set `COUNT` to 0:

```cpp
const size_t COUNT {0};
size_t i {0};

do {
    std::cout << i << " : I love C++" << std::endl;
    ++i;
} while (i < COUNT);

std::cout << "Loop done" << std::endl;
```

Output:

```text
0 : I love C++
Loop done
```

The condition `0 < 0` is false from the start, but the body has already run once. If the intent was "do nothing when the count is zero", `do-while` is the wrong tool and `while` or `for` should be used.

The natural use of `do-while` is "do it at least once, then decide whether to repeat", such as asking for input until a valid value arrives.

> **One-line summary:** every loop is a start, a test, an advance and a body around one iterator; `for` packs them into one line, `while` tests first, and `do-while` runs first.

## Chapter takeaways

- A loop has five parts: iterator, start, test, advance, body.
- In `for (init; test; increment)` the initializer runs once, the test runs before every iteration, and the increment runs after every body.
- Starting at 0 with `i < 10` runs the body ten times, with `i` taking 0 through 9.
- Prefer `size_t` for indices; it is unsigned, so negative values wrap around.
- An iterator declared in the `for` header lives only inside that loop; declare it outside if you need its final value.
- Store the iteration count in a constant instead of hard-coding it.
- `while` tests before running; `do-while` runs before testing, so it always executes at least once.

## Comprehension check

**1. Name the five parts of `for (size_t i {0}; i < 10; ++i)` and explain why the body runs ten times rather than nine or eleven.**

Reference answer: The iterator is `i`, the start is `0`, the test is `i < 10`, the advance is `++i`, and the body is the braced statement. The initializer runs once; afterwards the cycle is test, body, advance. `i` takes 0, 1, …, 9, and each test succeeds so the body runs once per value; when `i` becomes 10 the test `10 < 10` fails and the loop ends. So the body runs exactly ten times and `i` visits ten values, 0 through 9.

**2. How does `size_t` differ from `int` as a loop index, and what happens if you assign `-1` to a `size_t`?**

Reference answer: `size_t` is unsigned (8 bytes here) and represents non-negative values only; the standard library uses it for sizes and indices. `int` is signed. Assigning `-1` to a `size_t` wraps around to the largest value of the type (about $1.8\times10^{19}$ on 64-bit). With a test like `i < COUNT`, such a value keeps the condition true for an extremely long time. Unsigned indices are fine as long as values stay non-negative; a decreasing loop that could go below zero needs extra care.

**3. Where does the scope of an iterator declared in the `for` header end, and how do you keep its value after the loop?**

Reference answer: Its scope ends with the loop, including the test and advance parts; code after the loop cannot see it and fails with `'i' was not declared in this scope`. To keep the value, declare the iterator before the loop and use the initializer slot for an assignment or leave it empty: `size_t i {0}; for (; i < COUNT; ++i) { ... }`. After a normal exit, `i` equals `COUNT`.

**4. Why is `while` more prone to infinite loops than `for`? Give a concrete example.**

Reference answer: In `for` the advance is fixed in the header and cannot be overlooked; in `while` it usually sits at the end of the body and is easy to drop. For example

```cpp
size_t i {0};
while (i < 10) {
    std::cout << i << " : I love C++" << std::endl;
    // forgot ++i
}
```

`i` never changes, `0 < 10` stays true, and the program prints forever. Adding `++i` fixes it. The same problem occurs whenever the state the test depends on is never modified inside the body.

**5. With an iteration count of zero, how do `while` and `do-while` differ? Give one suitable use for each.**

Reference answer: `while` tests first, so a false condition at the start means the body never runs; `do-while` runs the body and tests afterwards, so it executes once even when the condition is false from the beginning. With `COUNT = 0`, the `while` version prints only `Loop done`, while the `do-while` version prints `0 : I love C++` and then `Loop done`. `do-while` fits "do it at least once, then decide", such as reading input until it is valid; `while` fits "possibly zero iterations", such as walking a container that may be empty.

**6. Why is `const size_t COUNT {10}` better than writing `10` directly in the loop?**

Reference answer: A hard-coded `10` scatters the decision "how many times" across the program, so a change of requirement means finding and editing every occurrence, with a real risk of missing one. A named constant has a single definition, can be changed in one place, and its name documents what the number means. The compiler can also optimise a `const`, and the qualifier prevents accidental modification inside the loop.

## How this connects to the neighbouring chapters

Chapter 7 decided which path to take; this chapter decides how many times to take it, and together they form the skeleton of every imperative program. Chapter 9 introduces arrays, which immediately need loops to initialise and walk their elements. Later, references in chapter 12, strings in chapter 13 and templates in chapter 17 all keep pairing `for` with `size_t`.
