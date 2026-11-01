---
slug: 04-booleans-chars-auto
title: "Chapter 4: Booleans, Characters and auto"
summary: "Covers 4:16:37–4:45:33 of the long video. It completes the fundamental types: bool holds two states in one byte, char maps characters to 0–255 through ASCII, and auto lets the compiler deduce a type from the initialiser. It closes with reassignment after initialisation and the silent overflow that auto plus unsigned produces."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, booleans, ascii, auto, type-deduction]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 4 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=15397s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter covers

Chapter 4 spans 4:16:37–4:45:33 and completes the fundamental types. Three pieces:

- **bool**: stores only `true` or `false`, the basis of every decision a program makes.
- **char**: one byte, mapping characters to integers through ASCII.
- **auto**: omit the type and let the compiler deduce it from the initialiser.

It finishes with the difference between initialisation and assignment, and with what happens when an `auto` variable deduces an unsigned type and is then given a negative number.

## Timeline

| Time | Topic |
| --- | --- |
| 4:16:37 | `bool`: two states, decisions |
| 4:18:11 | Printing booleans: 1/0 by default, true/false with `boolalpha` |
| 4:18:38 | `bool` occupies one byte |
| 4:24:25 | `char` and single quotes; ASCII |
| 4:26:38 | Assigning a numeric value to a char; `static_cast` back to int |
| 4:32:01 | `auto`: deducing the type from the initialiser |
| 4:38:12 | Reassigning after initialisation; the auto/unsigned trap |

## bool: exactly two states

```cpp
bool red_light {true};
bool green_light {false};

if (red_light) {
    std::cout << "Stop" << std::endl;
} else {
    std::cout << "Go through" << std::endl;
}
```

A `bool` holds `true` or `false`. `if (red_light)` tests the value itself; writing `red_light == true` is equivalent but noisier.

Printing a boolean has a default that surprises people:

```cpp
bool condition {true};
std::cout << condition << std::endl;                    // 1
std::cout << std::boolalpha << condition << std::endl;  // true
```

By default you get `1`/`0`; `std::boolalpha` switches to `true`/`false`. This is the first example of the stream manipulators that chapter 6 covers systematically.

A `bool` occupies **one byte** (eight bits) although a single bit would do. That is wasteful, but on modern machines not worth optimising; only extremely memory-constrained devices bother packing bits.

## char: a character is a small integer

Characters use single quotes, and only single quotes:

```cpp
char letter {'A'};
std::cout << letter << std::endl;   // A
```

`"A"` with double quotes is a string literal of type `const char[2]` (the character plus the terminating `\0`) and cannot initialise a `char`. This is one of the most common beginner errors.

### ASCII

A `char` is one byte and covers 0–255. ASCII assigns characters to some of those values:

| Value | Character |
| --- | --- |
| 33 | `!` |
| 48 | `0` |
| 49 | `1` |
| 65 | `A` |
| 70 | `F` |
| 97 | `a` |
| 112 | `p` |

So a character already is a number in memory; the `char` type merely tells the compiler to display it as a character:

```cpp
char value {65};                       // stores 65
std::cout << value << std::endl;       // interpreted as a char: A
std::cout << static_cast<int>(value)   // interpreted as an int: 65
          << std::endl;
```

`static_cast<int>` is an explicit conversion: it tells the compiler to treat the bits as an `int`. Without it, `cout` prints the character.

ASCII covers only the 128 basic characters; Chinese, Japanese or Arabic need Unicode (for example UTF-8), which is beyond this course. The idea to keep is simple: **a character is an encoded integer**.

## auto: let the compiler deduce the type

`auto` is not a type but a keyword that makes the compiler **derive** the type from the initialiser:

```cpp
auto var1 {12};        // int
auto var2 {13.0};      // double
auto var3 {14.0f};     // float
auto var4 {15.0l};     // long double
auto var5 {'e'};       // char
```

The rule is direct: the literal's own type becomes the deduced type. The suffix decides — `14.0` is a `double`, only `14.0f` is a `float`.

Integer suffixes work the same way:

```cpp
auto v1 {12u};    // unsigned int
auto v2 {12ul};   // unsigned long
auto v3 {12ll};   // long long
```

VS Code shows the result directly: hover over the variable and the deduced type appears. `sizeof` confirms it:

```cpp
std::cout << sizeof(var1) << std::endl;   // 4
std::cout << sizeof(var2) << std::endl;   // 8
std::cout << sizeof(var5) << std::endl;   // 1
```

`auto` pays off when type names become long (templates and iterators later in the course). The cost is that **the type is no longer visible at the declaration**, so it should be used with care on important variables.

## Initialisation versus assignment

Initialisation gives a value as the variable is created; assignment changes it afterwards:

```cpp
int var1 {123};            // initialisation
std::cout << var1;         // 123

var1 = 55;                 // assignment
std::cout << var1;         // 55
```

The same holds for `double` and `bool`:

```cpp
double var2 {44.50};
var2 = 99.99;

bool state {false};
state = true;
```

### The auto and unsigned trap

A deduced type may not be what you expect, and assignment then goes wrong:

```cpp
auto var3 {12u};    // deduced as unsigned int
var3 = -22;         // no error!
```

`var3` is unsigned and cannot hold a negative value. The compiler **does not complain**; it wraps modulo $2^{32}$, so `-22` becomes about 4.29 billion. The program compiles and runs, with a completely wrong number.

This is the lesson of the chapter: **with `auto`, check the deduced type before assigning.** Hover to inspect it, or write `unsigned int var3` explicitly; both are cheaper than debugging later.

## Chapter summary

- `bool` holds `true`/`false` and takes one byte; `boolalpha` controls whether it prints as `true`/`false` or `1`/`0`.
- `char` takes one byte; characters use single quotes; memory holds the ASCII code, which `static_cast<int>` reveals.
- `auto` deduces from the initialiser, and suffixes (`u`, `l`, `f`, `ll`) decide the result.
- Initialisation happens at creation; assignment happens afterwards.
- Assigning a negative value to an `auto`-deduced unsigned type compiles silently and wraps to a large positive number.

## Comprehension check

**1. What does `std::cout << true;` print, and how do you print `true` instead?**

Reference answer: It prints `1`, because a `bool`'s underlying value is 1/0 and `cout` prints it as an integer. Add `std::boolalpha`: `std::cout << std::boolalpha << true;` prints `true`. This is a formatting state on the stream and stays active until `std::noboolalpha` turns it off.

**2. Why does `char c = "A";` fail to compile, and what is the correct form?**

Reference answer: `"A"` is a string literal of type `const char[2]` — the character plus a terminating `\0` — which is an array and cannot initialise a single `char`. The correct form is `char c = 'A';`, a character literal. For the same reason `if (c == "A")` is wrong and should be `if (c == 'A')`.

**3. Why does `char value {65};` print `A` rather than `65`, and how do you print 65?**

Reference answer: The `char` type tells `cout` to interpret the byte as a character, and 65 is `A` in ASCII. To print the number, convert explicitly: `std::cout << static_cast<int>(value);`. `static_cast` does not change the bits, only how the compiler interprets them.

**4. Write four `auto` initialisers that deduce to `int`, `double`, `float` and `unsigned long`.**

Reference answer:

```cpp
auto a {12};      // int
auto b {12.0};    // double
auto c {12.0f};   // float
auto d {12ul};    // unsigned long
```

Deduction follows the initialiser exactly: an integer literal is `int`, a decimal literal without a suffix is `double`, `f` makes it `float`, `u` means unsigned and `l` means long, so `ul` is `unsigned long`.

**5. What happens with `auto x {12u}; x = -22;`, and why is there no error?**

Reference answer: `12u` deduces `unsigned int`, which cannot hold a negative number. The assignment wraps modulo $2^{32}$, so `-22` becomes $4294967296-22=4294967274$, a number close to 4.3 billion. Unsigned overflow is defined by the standard (wraparound), so it is not an error and the compiler neither complains nor warns; the wrong value enters the program silently.

**6. What is the difference between initialisation and assignment, and why does `auto` make it more delicate?**

Reference answer: Initialisation happens when the variable is created and fixes both its value and its type; assignment changes only the value later. With an explicit type the type is visible at the declaration; with `auto` it is hidden inside the initialiser, and whether a later assignment is legal depends on that invisible type. Hence an `auto` variable should have its deduced type checked before assignment, or the wraparound above will happen quietly.

## How it connects

This chapter completes the fundamental types: numbers (chapter 3), booleans and characters, plus the `auto` notation. Chapter 5 starts operating on them — arithmetic and modulus, precedence and associativity, increment and decrement, compound assignment, comparison and logic. Chapter 6 returns to the `boolalpha` seen here and treats the whole family of output manipulators systematically.
