---
slug: 03-variables-and-types
title: "Chapter 3: Variables, Data Types and Number Systems"
summary: "Covers 3:00:43–4:16:37 of the long video. It first establishes that a variable is a named piece of memory, then uses binary, octal and hexadecimal to explain how the zeros and ones become readable numbers, and finally gives the size, range, three initialisation forms and narrowing traps of integers, integer modifiers and floating-point types."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, data-types, integers, floating-point, binary]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 3 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=10843s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter covers

Chapter 3 spans 3:00:43–4:16:37 and is the first sustained look at data. It answers three questions:

1. What is a variable? — a named piece of memory.
2. Memory holds only zeros and ones; how do humans read it? — through binary, octal and hexadecimal.
3. How many bytes does each type take, and what range can it hold? — integers, integer modifiers and floating-point numbers.

The conclusion carries all the way to pointers and memory management: **every piece of data is ultimately a group of bits, and the type decides how those bits are interpreted.**

## Timeline

| Time | Topic |
| --- | --- |
| 3:00:43 | Recap; the fundamental types predefined by C++ |
| 3:03:26 | Bits, bytes and how data sits in memory |
| 3:05:09 | Number systems: decimal, binary, octal, hexadecimal |
| 3:16:15 | Writing literals in different bases |
| 3:21:36 | `int`: a variable is named memory |
| 3:25:33 | Three initialisation forms and narrowing conversions |
| 3:27:01 | `sizeof`; variable naming rules |
| 3:40:43 | Integer modifiers: signed, unsigned, short, long |
| 3:54:04 | Floating point: float, double, long double; precision and suffixes |
| 4:00:46 | Infinity, NaN and scientific notation |

## A variable is a named piece of memory

C++ predefines a set of fundamental types: `int`, `double`, `float`, `char`, `bool`, `void`, plus `auto` for type deduction. Each type reserves a fixed amount of memory and fixes how the bits are read.

```cpp
int age {27};
```

`age` is the **name in the source code** for that memory; `int` says it occupies 4 bytes and is interpreted as an integer; `27` is the bit pattern written into it. A variable is not an abstract "box" but a real address.

## Bits, bytes and number systems

Each 0 or 1 is a **bit**; eight bits make a **byte**. Eight bits give 256 combinations (0–255); sixteen give 65536.

### Decimal is a weighted sum

$$
2371 = 2\times10^3 + 3\times10^2 + 7\times10^1 + 1\times10^0
$$

Each digit's weight is a power of ten.

### Binary

Binary swaps the weights to powers of two. For `10010`:

$$
1\times2^4 + 0\times2^3 + 0\times2^2 + 1\times2^1 + 0\times2^0
= 16 + 2 = 18
$$

`100101` is $32+4+1=37$. Three bits cover 0–7, four cover 0–15. In general, $n$ bits cover

$$
0 \sim 2^n - 1 .
$$

### Hexadecimal: groups of four

Split the bits into groups of four; each group is one hex digit (0–9, A–F). For example

```
1111 0000 0011 1110 0110
  F    0    3    E    6      →  0xF03E6
```

Thirty-two bits become eight hex symbols, far easier to read than 32 zeros and ones. When the length is not a multiple of four, pad with zeros on the left.

### Octal: groups of three

Octal groups bits by three, with digits 0–7. It is rarely used today; the course mentions it for completeness.

### Writing literals in C++

```cpp
int a = 15;        // decimal
int b = 017;       // octal: leading 0, value 15
int c = 0x0F;      // hex: 0x prefix, value 15
int d = 0b1111;    // binary: 0b prefix, C++14 or later, value 15
```

**The leading zero is a trap**: `017` is not seventeen but fifteen. Printing all four variables yields `15` in every case — the same number in memory, written differently.

## Integers: int

`int` is 4 bytes on most platforms and stores an integer in binary. There are three ways to declare and initialise:

```cpp
int a = 10;     // assignment initialisation
int b {10};     // braced initialisation
int c (10);     // functional initialisation
```

### Uninitialised variables

```cpp
int elephants;   // uninitialised
```

That memory holds **garbage**; reading it is meaningless. Empty braces, `int count {};`, guarantee zero.

### Narrowing: the decisive difference

```cpp
int x {2.9};    // compile error: narrowing conversion
int y (2.9);    // compiles, silently truncates to 2
int z = 2.9;    // compiles, silently truncates to 2
```

In C++20, stuffing a floating-point value into an `int` with braces is an error. That is exactly the value of braced initialisation: **it turns "quietly loses data" into "does not compile"**. Functional and assignment forms silently drop the fraction, 2.9 becomes 2, and the program runs on with a wrong value.

### sizeof

```cpp
std::cout << "sizeof(int): " << sizeof(int) << std::endl;   // 4
std::cout << "sizeof(x): "   << sizeof(x)   << std::endl;   // 4
```

`sizeof` accepts a type or a variable and reports bytes. On common platforms `int` is 4.

### Naming rules

- The first character must be a letter or underscore, never a digit.
- The rest may be letters, digits or underscores.
- Names are case-sensitive: `bikeCount` and `BikeCount` differ.
- No spaces or symbols such as `+` or `-`.

## Integer modifiers

Modifiers change signedness or width. **They apply only to integer types**, never to floating point.

### signed and unsigned

```cpp
int a = 1;              // signed by default; negatives allowed
signed int b = -300;    // explicit
unsigned int c = 4;     // non-negative only
unsigned int d = -5;    // compile error
```

Both occupy the same 4 bytes; the difference is interpretation. Signed treats the top bit as a sign bit, unsigned uses all 32 bits for magnitude. Hence:

$$
\text{unsigned}: 0 \sim 2^n-1,
\qquad
\text{signed}: -2^{n-1} \sim 2^{n-1}-1 .
$$

Four unsigned bytes cover roughly 0–4.2 billion; four signed bytes cover roughly −2.1 to 2.1 billion.

### short, long, long long

| Form | Typical size | Note |
| --- | --- | --- |
| `short` | 2 bytes | same as `short int` |
| `int` | 4 bytes | |
| `long` | 4 or 8 bytes | **platform dependent**; usually 4 on Windows |
| `long long` | 8 bytes | very large range |

The course measures on Windows + gcc: `short` 2, `int` 4, `long` 4, `long long` 8. On Linux `long` is often 8 — so **never assume the size of `long`**; when a fixed width matters, use `int32_t` or `int64_t` from `<cstdint>`.

`short` covers −32768 to 32767, which the formula confirms: $2^{15}=32768$.

## Floating-point numbers

Floating-point types represent numbers with a fractional part. There are three:

| Type | Typical size | Significant decimal digits |
| --- | --- | --- |
| `float` | 4 bytes | about 7 |
| `double` | 8 bytes | about 15–17 |
| `long double` | 12 or 16 bytes | at least as much as double |

"Precision" means how many digits can be represented reliably, counted from the first significant digit. The number `123456789012` has 12 digits: too many for `float`, fine for `double`.

### The suffix decides the literal's type

```cpp
float a = 1.23f;        // f suffix
double b = 1.23;        // double by default
long double c = 1.23L;  // L suffix
```

A missing `f` is a common bug: in `float x = 1.23456789;` the literal is parsed as `double` and then converted to `float`, losing precision in the conversion. Worse is changing the variable to `double` but keeping the `f` — the variable is wide, the stored value is still `float` precision.

### Scientific notation

```cpp
double big = 1.9e8;       // 1.9 × 10^8
double small = 3.498e-11; // 3.498 × 10^-11
```

The exponent after `e` is a power of ten: positive moves the point right, negative moves it left.

### Infinity and NaN

Floating-point division by zero does not crash; it produces special values:

```cpp
double a = 5.6;
double zero = 0.0;
double inf = a / zero;      // +inf
double nan = zero / zero;   // nan (not a number)
```

- A positive number over zero gives `inf`, a negative one gives `-inf`.
- `inf + 5` stays `inf`: a finite quantity added to infinity is still infinite.
- `0.0 / 0.0` gives `nan`, meaning "this operation has no meaningful numeric result". Most arithmetic on `nan` yields `nan`.

Integer division by zero is undefined behaviour; floating-point division by zero has a defined result. That is a real semantic difference between the two families.

### Watching precision with setprecision

```cpp
#include <iomanip>

std::cout << std::setprecision(20);
std::cout << 1.234567890123456789 << std::endl;
```

The default precision is 6. `setprecision` only requests how many digits to display; **it cannot exceed the type's own precision**. A `float` starts producing noise around the eighth digit, a `double` around the seventeenth.

## Chapter summary

- A variable is named memory; its type fixes the size and the interpretation.
- Memory holds bits; binary expands by powers of two, octal groups three bits, hex groups four.
- Literals: `017` is octal, `0x0F` hex, `0b1111` binary.
- Of the three initialisation forms, braces are safest: narrowing is a compile error, the others truncate silently.
- `int` is usually 4 bytes, `short` 2, `long long` 8; `long` depends on the platform.
- `signed`/`unsigned` change signedness; `short`/`long` change width; modifiers apply only to integers.
- Floating point comes as `float`/`double`/`long double` with roughly 7, 15 and more digits; never omit the `f` or `L` suffix.
- Floating-point division by zero gives `inf`, `0.0/0.0` gives `nan`, and the program does not crash.

## Comprehension check

**1. What is the value of `int a = 017;` and why does it print the same as `int b = 15;`?**

Reference answer: `017` is an octal literal, so its value is $1\times8+7=15$. In memory it is the same 32-bit pattern as `15`; only the source notation differs. `std::cout` prints in decimal by default, so both output 15.

**2. How do `int x {2.9};` and `int y (2.9);` differ, and why is the first safer?**

Reference answer: Braced initialisation treats `double → int` as narrowing and, in C++20, reports a "narrowing conversion" compile error, so no binary is produced. Functional initialisation silently drops the fraction, leaving `y == 2`. The first turns data loss into a build-time error; the second hides it until run time. Assignment initialisation behaves like the second.

**3. `unsigned int` and `int` are both 4 bytes — why do their ranges differ?**

Reference answer: 32 bits give $2^{32}$ states either way; the difference is the top bit. Signed uses it as a sign bit and the remaining 31 for magnitude, giving $-2^{31}$ to $2^{31}-1$ (about −2.1 to 2.1 billion). Unsigned uses all 32 bits for magnitude, giving 0 to $2^{32}-1$ (about 0 to 4.2 billion). Same size, different interpretation.

**4. `sizeof(long)` is 4 on Windows but often 8 on Linux. What does that mean for portable code?**

Reference answer: The width of `long` follows the platform's data model (LLP64 on Windows, LP64 on Linux), so the same source can overflow differently on each. Portable code must not assume `long`'s size: use `int32_t`/`int64_t` from `<cstdint>` when an exact width matters, or `long long`, which the standard guarantees is at least 64 bits. This matters especially for serialisation and binary file formats.

**5. What happens with `float x = 1.234567890123;` when the `f` is missing? And when the variable becomes `double` but the `f` stays?**

Reference answer: Without `f`, the literal is a `double` (about 15 significant digits) and the assignment to `float` keeps only about 7, truncating the rest. With `double x = 1.234567890123f;`, the literal is stored as a `float` first and then widened, so the variable holds `float`-precision data and the trailing digits are noise. In both cases the suffix and the variable type must agree.

**6. What is the essential difference between integer `7 / 0` and floating-point `7.0 / 0.0`?**

Reference answer: Integer division by zero is undefined behaviour in C++; the language promises nothing and the program may crash or produce an arbitrary value. Floating point follows IEEE 754: `7.0 / 0.0` is `+inf`, `-7.0 / 0.0` is `-inf`, and `0.0 / 0.0` is `nan`. The program does not crash, but the result can contaminate later arithmetic. The first is a language-level error, the second a numeric special value.

## How it connects

This chapter establishes that a type fixes both the byte count and the range. Chapter 4 completes the fundamental types with booleans, characters (ASCII) and `auto` deduction, and shows the silent overflow that `auto` can produce when combined with unsigned types. Chapter 5 starts operating on this data: arithmetic, precedence, increment and decrement, compound assignment and logical operators.
