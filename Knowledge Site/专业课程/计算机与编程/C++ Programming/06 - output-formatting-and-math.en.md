---
slug: 06-output-formatting-and-math
title: "Chapter 6: Output Formatting, Type Ranges and Math"
summary: "Covers 5:55:57–7:03:15 of the long video. It treats the iomanip manipulators systematically — width, alignment, fill, bases, floating-point format and precision — then queries type ranges with limits and does arithmetic with cmath, and ends with the integral promotion of types narrower than int."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, iomanip, formatting, numeric-limits, cmath, integral-promotion]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 6 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=21357s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter covers

Chapter 6 spans 5:55:57–7:03:15 and is the longest so far in the first half of the course. Three subjects:

- **Laying output out properly**: width, alignment, fill characters, bases, floating-point format, precision.
- **Finding a type's limits**: `<limits>` supplies `min()`, `max()`, `lowest()` and friends.
- **Doing mathematics**: `<cmath>` supplies rounding, absolute value, exponential, logarithm, powers, roots and trigonometry.

It ends with an easily overlooked but important fact: integer types narrower than four bytes are **implicitly promoted** to `int` before arithmetic.

## Timeline

| Time | Topic |
| --- | --- |
| 5:55:57 | Why formatting: turning loose data into a table |
| 5:58:34 | `endl` versus `'\n'`; flush and the output buffer |
| 6:00:05 | `setw` for width |
| 6:00:56 | `left` / `right` / `internal` |
| 6:01:41 | `setfill` |
| 6:02:02 | `boolalpha`, `showpos` |
| 6:03:15 | `dec` / `hex` / `oct`, `showbase`, `uppercase` |
| 6:06:19 | `fixed` / `scientific` and the default float format |
| 6:08:16 | `setprecision`; `showpoint` |
| 6:33:24 | `numeric_limits`: min, max, lowest |
| 6:41:09 | `cmath`: floor, ceil, abs, exp, pow, log, sqrt, round |
| 6:54:21 | Types narrower than four bytes and integral promotion |

## Where the manipulators come from

Formatting lives in two headers:

```cpp
#include <iostream>   // cout, cerr, endl
#include <iomanip>    // setw, setfill, setprecision, ...
```

No memorisation required: cppreference's page for `std::setw` names `<iomanip>` on its first line. The course keeps repeating one lesson — **learn to read the documentation**; knowing which header holds each manipulator is less valuable than knowing where to look it up.

### endl versus '\n'

```cpp
std::cout << "Hello" << std::endl << "World" << std::endl;
std::cout << "Hello" << '\n' << "World" << '\n';
```

On a terminal they look identical, but `std::endl` also **flushes the buffer** while `'\n'` only writes a newline. In tight output loops that flush costs something; for now the useful fact is simply that both break the line.

### flush and the buffer

`std::cout` does not send every character straight to the terminal. Output is collected in a **buffer** and sent when it fills up or is flushed. `std::flush` forces the send:

```cpp
std::cout << "Computing..." << std::flush;
```

Useful when the user must see progress immediately; ordinary programs can let the buffer do its job.

## Layout: width, alignment, fill

An unformatted table:

```cpp
std::cout << "Daniel" << "Gray" << 33 << std::endl;
std::cout << "Woods" << "Smith" << 27 << std::endl;
```

The data is jammed together. `setw` gives each column a width:

```cpp
#include <iomanip>

int width {10};

std::cout << std::setw(width) << "Lastname"
          << std::setw(width) << "Firstname"
          << std::setw(width) << "Age" << std::endl;

std::cout << std::setw(width) << "Daniel"
          << std::setw(width) << "Gray"
          << std::setw(width) << 33 << std::endl;
```

Three details matter:

1. **`setw` applies only to the next output**, so every column needs its own call.
2. **Right alignment is the default**: data sits at the right, padding at the left.
3. **The width can live in a variable**, so one edit adjusts the whole table instead of editing every line.

### Alignment

```cpp
std::cout << std::right << std::setw(10) << "Gray";
std::cout << std::left  << std::setw(10) << "Gray";
```

`std::left` and `std::right` are **sticky**: they apply to all subsequent output until changed.

### internal: sign left, digits right

```cpp
std::cout << std::internal << std::setw(10) << -12.34 << std::endl;
```

Produces `-    12.34`: the minus sign hugs the left edge, the digits the right. Handy for ledgers and aligned signed columns.

### Fill characters

```cpp
std::cout << std::left << std::setfill('-') << std::setw(10) << "Daniel";
```

Spaces become dashes. `setfill` is sticky; `setw` still lasts one output only.

## Booleans, signs and bases

### boolalpha

```cpp
bool condition {true};
std::cout << condition << std::endl;                     // 1
std::cout << std::boolalpha << condition << std::endl;   // true
std::cout << std::noboolalpha << condition << std::endl; // 1
```

### showpos

```cpp
std::cout << 34 << " " << -45 << std::endl;                 // 34 -45
std::cout << std::showpos << 34 << " " << -45 << std::endl; // +34 -45
```

Positive numbers hide their sign by default; `showpos` forces it. Negative numbers always show `-`.

### Bases

```cpp
int number {42};
std::cout << std::dec << number << std::endl;   // 42
std::cout << std::hex << number << std::endl;   // 2a
std::cout << std::oct << number << std::endl;   // 52
```

The base affects **integers only**; floating-point values ignore it.

### showbase and uppercase

```cpp
std::cout << std::showbase;
std::cout << std::hex << 42 << std::endl;   // 0x2a
std::cout << std::oct << 42 << std::endl;   // 052

std::cout << std::uppercase << std::hex << 42 << std::endl;  // 0X2A
```

`showbase` adds the prefix: `0x` for hex, `0` for octal, nothing for decimal. `uppercase` turns `a`–`f` into `A`–`F`, and `0x` into `0X`.

> **Warning:** the base setting is **sticky**. Switch to `hex`, forget to switch back, and every later integer prints in hex. This is a common reason for "why did my numbers turn into letters?"

## Floating-point format and precision

### Default, fixed and scientific

```cpp
double a {3.14159265358979};
double b {1.0};
double c {1.34e-10};

std::cout << a << " " << b << " " << c << std::endl;
// 3.14159 1 1.34e-10

std::cout << std::fixed << a << std::endl;        // 3.141593
std::cout << std::scientific << a << std::endl;   // 3.141593e+00
```

The default format uses scientific notation when it needs to; `fixed` forces decimal notation, `scientific` forces exponent notation.

### Restoring the default

The standard library offers no manipulator for "go back to the default float format". The course's workaround:

```cpp
std::cout.unsetf(std::ios::floatfield);
std::cout.setf(std::ios::fmtflags(0), std::ios::floatfield);
```

This is an engineering workaround; copy it for now, the explanation is out of scope here.

### setprecision

```cpp
std::cout << std::setprecision(6)  << a << std::endl;
std::cout << std::setprecision(10) << a << std::endl;
std::cout << std::setprecision(20) << a << std::endl;
```

Precision controls how many digits are **displayed**, and **cannot exceed the type's own precision**. A `double` holds roughly 15–17 significant digits; anything beyond that is noise:

```cpp
double value {1.234567890123456789};
std::cout << std::setprecision(20) << value << std::endl;
// 1.2345678901234567 followed by garbage
```

In `fixed` mode `setprecision` means digits after the decimal point; in default or scientific mode it means total significant digits. That difference is a real trap.

### showpoint

```cpp
std::cout << 12.0 << std::endl;                   // 12
std::cout << std::showpoint << 12.0 << std::endl; // 12.0000
```

`showpoint` forces the decimal point and pads trailing zeros.

## Querying type ranges: numeric_limits

```cpp
#include <limits>

std::cout << std::numeric_limits<short>::min() << std::endl;   // -32768
std::cout << std::numeric_limits<short>::max() << std::endl;   // 32767

std::cout << std::numeric_limits<float>::min() << std::endl;    // smallest positive
std::cout << std::numeric_limits<float>::lowest() << std::endl; // most negative
std::cout << std::numeric_limits<float>::max() << std::endl;    // largest
```

The distinction to remember:

- For **integers**, `min()` is the smallest value (negative), and `lowest()` equals it.
- For **floating point**, `min()` is the **smallest positive** value (closest to zero), and `lowest()` is the most negative. The naming misleads almost everyone the first time.

Other members such as `is_signed` and `digits` help when code must adapt to the platform.

## Math functions: cmath

```cpp
#include <cmath>

std::floor(7.7);    // 7    round down
std::ceil(7.2);     // 8    round up
std::abs(-5000);    // 5000 absolute value
std::exp(10);       // e^10 ≈ 22026.5
std::pow(3, 4);     // 81
std::log(54.59);    // base e
std::log10(10000);  // 4
std::sqrt(81);      // 9
std::round(2.5);    // 3    halfway away from zero
std::round(2.4);    // 2
```

Three easy mistakes:

- `std::log` is base $e$, not base 10; for base 10 use `std::log10`.
- `std::round` sends halfway values **away from zero**: `2.5 → 3`, `-2.5 → -3`.
- Trigonometry takes radians, not degrees.

`<cmath>` has far more than this list; consult cppreference when needed.

## Types narrower than four bytes and integral promotion

The standard says: **integer types narrower than `int` (`char`, `short`) are implicitly converted to `int` before arithmetic.** The reason is hardware — the CPU's integer unit works natively at `int` width.

```cpp
short a {10};
short b {20};

auto result = a + b;
std::cout << sizeof(a) << std::endl;       // 2
std::cout << sizeof(b) << std::endl;       // 2
std::cout << sizeof(result) << std::endl;  // 4, not 2
```

The addition promotes both `short`s to `int` first, and the sum is an `int`, so `auto` deduces a four-byte `int`. The same happens with `char`:

```cpp
char c1 {'a'};
char c2 {'b'};
auto result2 = c1 + c2;    // int, value 195 ('a' 97 + 'b' 98)
```

The rule is invisible most of the time, but it bites whenever code depends on `sizeof` or exact widths — serialisation, binary protocols, template specialisation.

## Chapter summary

- Formatting needs `<iomanip>`; `setw` affects the next output only, while `left`/`right`/`internal`/`setfill` persist.
- `boolalpha` controls boolean display, `showpos` controls the plus sign.
- `dec`/`hex`/`oct` affect integers only and persist; `showbase` adds prefixes, `uppercase` uppercases.
- Float formats are default, `fixed` and `scientific`; `setprecision` means decimals in `fixed` mode, significant digits otherwise.
- `numeric_limits::min()` is the smallest positive float; `lowest()` is the most negative.
- `<cmath>` supplies rounding, absolute value, exponential, logarithm, powers, roots and trigonometry; `log` is base $e$.
- Types narrower than four bytes are promoted to `int`, so the result type can be wider than the operands.

## Comprehension check

**1. Why is one `setw(10)` not enough while one `std::left` is?**

Reference answer: `setw` is a one-shot manipulator: it sets the field width for the single value that follows and then expires, so every column needs its own call. `left`/`right`/`internal`/`setfill` modify the stream's **persistent formatting state**; once set they apply to all later output until changed. The first is a per-item argument, the second a switch.

**2. After `std::cout << std::hex << 42;`, what does printing `100` show?**

Reference answer: `64`. `hex` sets a persistent stream state, so `100` is interpreted and printed in hexadecimal: $100 \div 16 = 6$ remainder 4, giving `64`. Restoring decimal output requires an explicit `std::dec`. This is the classic case of formatting state leaking into later output.

**3. What is the difference between `numeric_limits<float>::min()` and `lowest()`, and why is it confusing?**

Reference answer: For floating-point types `min()` returns the **smallest positive normalised value** (closest to zero, about $1.18\times10^{-38}$), while `lowest()` returns the most negative finite value (about $-3.4\times10^{38}$). The English word "min" suggests "smallest value", but in floating-point context it means "smallest positive". Integer types do not have this confusion: `min()` and `lowest()` coincide.

**4. Can `std::setprecision(20)` show 20 significant digits of a `double`?**

Reference answer: No. `setprecision` requests a display width, but the type's own precision limits the real information: `double` carries roughly 15–17 significant digits, and digits beyond that are conversion noise, not data. `float` degrades from about 7 digits. Genuinely more precision requires `long double` (still finite) or an arbitrary-precision library.

**5. What is the type of `c` in `short a = 10, b = 20; auto c = a + b;` and why?**

Reference answer: `c` is an `int` (4 bytes). The integral promotion rule converts any type narrower than `int` to `int` before arithmetic, so both `short`s are promoted, the sum is an `int`, and `auto` deduces accordingly. `sizeof(c)` confirms 4 rather than 2.

**6. How do you print `3.14159` with three decimals and a leading plus sign for positive values?**

Reference answer:

```cpp
std::cout << std::fixed << std::setprecision(3) << std::showpos;
std::cout << 3.14159 << std::endl;   // +3.142
```

`fixed` makes `setprecision(3)` mean three digits after the point, and `showpos` forces the plus sign. The output 3.142 is rounded, not truncated. All three settings persist, so later output keeps the plus and three decimals until `std::noshowpos` and a format reset undo them.

## How it connects

This chapter turns output from a statement into a configurable layout system, and adds the tools for querying ranges and doing mathematics. Chapter 7 enters control flow — `if`, `else if`, `switch` — using the comparisons and logical results from chapter 5 to choose a branch. Chapter 8 then covers loops, handing repetition to the CPU.
