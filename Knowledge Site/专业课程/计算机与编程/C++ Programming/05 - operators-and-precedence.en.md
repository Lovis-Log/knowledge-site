---
slug: 05-operators-and-precedence
title: "Chapter 5: Arithmetic, Precedence and Logic"
summary: "Covers 4:45:33–5:55:57 of the long video. It explains integer division truncation and modulus, precedence and associativity, prefix and postfix increment, compound assignment, comparison operators and logical operators, and why printing a comparison requires parentheses."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, operators, precedence, integer-division, boolean-logic]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 5 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=17133s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter covers

Chapter 5 spans 4:45:33–5:55:57. The previous two chapters put data into variables; this one starts operating on it. The point is not to memorise symbols but to grasp two facts:

- **Integer division and modulus are not like school arithmetic**: `7 / 2` is 3, and the fraction is thrown away.
- **When an expression contains several operators, precedence and associativity decide the order**; a reader should not have to consult a table, so parentheses should state the intent.

## Timeline

| Time | Topic |
| --- | --- |
| 4:47:39 | Addition, subtraction, multiplication, division, modulus; integer truncation |
| 4:58:05 | Precedence and associativity; the operator table |
| 5:07:14 | Using parentheses to fix the order |
| 5:11:54 | Prefix and postfix increment and decrement |
| 5:23:30 | Compound assignment |
| 5:31:42 | Relational operators produce booleans |
| 5:40:59 | Logical operators: and, or, not |

## Arithmetic

```cpp
int number1 {2};
int number2 {7};
int result {0};

result = number1 + number2;   // 9
result = number2 - number1;   // 5
result = number1 - number2;   // -5
result = number1 * number2;   // 14
```

All of these are integer operations; the result is an integer too.

### Integer division truncates, it does not round

```cpp
result = number2 / number1;   // 7 / 2
std::cout << result << std::endl;   // 3
```

`7 / 2` is 3, not 3.5. Both operands are `int`, so the result is `int` and only the whole part survives. A useful reading is "how many whole times does 2 fit into 7" — three times, with 1 left over and discarded.

To get a fractional result, make at least one operand floating point:

```cpp
double quotient = 7.0 / 2;   // 3.5
```

`7 / 2.0`, `7.0 / 2` and `7.0 / 2.0` all work; the compiler promotes the other operand to `double` before dividing.

### Modulus: the remainder

```cpp
result = number2 % number1;   // 7 % 2
std::cout << result << std::endl;   // 1
```

`%` returns the remainder of integer division. Since $31 = 3\times10 + 1$, `31 % 10` is 1.

Modulus is defined only for integers; `7.5 % 2` does not compile, because a "remainder" for floating point has no accepted definition — use `std::fmod` there.

Common uses: parity (`n % 2 == 0`), ring indexing (`index % size`), and extracting decimal digits (`n % 10` gives the last digit).

## Precedence and associativity

Two rules settle an expression with several operators:

- **Precedence**: which operator binds first. `*`, `/`, `%` bind tighter than `+`, `-`.
- **Associativity**: within one precedence level, whether evaluation goes left to right or right to left. Arithmetic is left to right.

Consider:

```cpp
int a {6}, b {4}, c {6}, d {9}, e {3}, f {2}, g {5};

int result = a + b * c - d / e - f + g;
```

Step by step:

1. Multiplication and division first: `b * c = 24`, `d / e = 3`.
2. The expression becomes `a + 24 - 3 - f + g`, i.e. `6 + 24 - 3 - 2 + 5`.
3. Left to right: `6+24=30`, `30-3=27`, `27-2=25`, `25+5=30`.

The result is 30.

The relevant precedence ladder, highest first:

| Precedence | Operators | Associativity |
| --- | --- | --- |
| high | postfix `++` `--` | left |
| | prefix `++` `--`, unary `+` `-` | right |
| | `*` `/` `%` | left |
| | `+` `-` | left |
| | `<<` `>>` | left |
| | `<` `<=` `>` `>=` | left |
| | `==` `!=` | left |
| | `&&` | left |
| low | `\|\|` | left |
| lowest | assignment `=` `+=` etc. | right |

### Parentheses state intent

```cpp
int result = a + (b * c) - (d / e) - f + g;   // still 30
```

Same result, but the reader does not need the table. The course's advice is explicit: **do not lean on the precedence table; write the intent with parentheses**.

Parentheses also **change** the order:

```cpp
int result = (a + b) * c - d / e - f + g;
// (6+4)*6 - 3 - 2 + 5 = 60
```

Now the addition happens first and the answer moves from 30 to 60.

## Increment and decrement

`++` adds 1; `--` subtracts 1. They can only change a value by one, never by five or seven.

### Postfix: use first, change after

```cpp
int value {5};
std::cout << value++ << std::endl;   // 5
std::cout << value << std::endl;     // 6
```

`value++` yields the current value (5, printed here) and only increments after the statement finishes. Hence 5 then 6.

The same with `--`:

```cpp
int value {5};
std::cout << value-- << std::endl;   // 5
std::cout << value << std::endl;     // 4
```

### Prefix: change first, use after

```cpp
int value {5};
std::cout << ++value << std::endl;   // 6
std::cout << value << std::endl;     // 6
```

`++value` increments first and then yields the new value, so both lines print 6.

The mnemonic: **operator after, old value first; operator before, new value first.**

On a line of its own (`value++;` or `++value;`) the two are equivalent; the difference appears only when the expression's value is used.

## Compound assignment

`+=`, `-=`, `*=`, `/=`, `%=` fuse the operation and the assignment:

```cpp
int value {45};

value += 5;    // value = value + 5;  → 50
value -= 5;    // value = value - 5;  → 45
value *= 2;    // value = value * 2;  → 90
value /= 3;    // value = value / 3;  → 30
value %= 11;   // value = value % 11; → 8
```

The last step: $30 \div 11 = 2$ remainder 8, so the result is 8.

Compound assignment is not merely sugar; it makes "accumulate into this same variable" visible at a glance.

## Relational operators

Relational operators compare two values and produce a `bool`:

| Operator | Meaning |
| --- | --- |
| `<` | less than |
| `<=` | less than or equal |
| `>` | greater than |
| `>=` | greater than or equal |
| `==` | equal |
| `!=` | not equal |

```cpp
int number1 {45};
int number2 {60};

std::cout << std::boolalpha;
std::cout << "number1 < number2: " << (number1 < number2) << std::endl;   // true
std::cout << "number1 > number2: " << (number1 > number2) << std::endl;   // false
std::cout << "number1 == number2: " << (number1 == number2) << std::endl; // false
std::cout << "number1 != number2: " << (number1 != number2) << std::endl; // true
```

### Why the parentheses are mandatory

Remove them:

```cpp
std::cout << "number1 < number2: " << number1 < number2 << std::endl;
```

This does not compile. By the ladder above, `<<` binds tighter than `<`, so the compiler first evaluates `(std::cout << ... << number1)` and then tries to compare that result with `number2` — but `std::ostream` has no `<` against an integer, hence the error.

With `(number1 < number2)` the comparison is evaluated first into a `bool`, which `cout` can print.

### `=` versus `==`

```cpp
if (number1 = number2) { }    // assignment, not comparison
if (number1 == number2) { }   // comparison
```

A single `=` assigns; `==` compares. Writing `=` inside an `if` often still compiles (the assigned value becomes the condition) while being logically wrong. Some compilers warn; do not ignore it.

## Logical operators

Logical operators work on booleans:

| Operator | Name | True when |
| --- | --- | --- |
| `&&` | and | both operands are true |
| `\|\|` | or | at least one is true |
| `!` | not | the operand is false |

Truth table:

| a | b | a && b | a \|\| b |
| --- | --- | --- | --- |
| false | false | false | false |
| false | true | false | true |
| true | false | false | true |
| true | true | true | true |

```cpp
bool a {true}, b {false}, c {true};

std::cout << (a && b) << std::endl;      // false
std::cout << (a && c) << std::endl;      // true
std::cout << (a && b && c) << std::endl; // false (one false is enough)

std::cout << (a || b) << std::endl;      // true
std::cout << (!a) << std::endl;          // false
std::cout << (!b) << std::endl;          // true
```

`a && b && c` shows that "and" chains: **one false makes the whole expression false**; "or" is the mirror image, one true makes it true.

### Combined with relational operators

Relational operators produce `bool`, and logical operators consume `bool`, so they compose naturally:

```cpp
int d {45}, e {20}, f {11};

bool result = (d > e) && (d > f);   // true && true → true
```

Parentheses matter here as well, both for precedence and for readability.

> **Supplement:** `&&` and `||` **short-circuit**: `a && b` skips evaluating `b` when `a` is false, and `a || b` skips `b` when `a` is true. This becomes important when the right-hand side has side effects such as a function call, a situation that appears often once conditions and loops arrive.

## Chapter summary

- `7 / 2` is 3: integer division truncates rather than rounds; make one operand floating point to keep the fraction.
- `%` returns the remainder and is defined only for integers.
- Multiplication and division bind before addition and subtraction; equal precedence evaluates left to right; parentheses can change the order and should express intent.
- `value++` yields the old value then increments; `++value` increments then yields the new one.
- `+=`, `-=`, `*=`, `/=`, `%=` fuse operation and assignment.
- Relational operators produce `bool`; printing a comparison needs parentheses because `<<` binds tighter.
- `&&` needs both true, `||` needs one, `!` negates; all compose with relational results.

## Comprehension check

**1. What do `7 / 2` and `7.0 / 2` produce, and why?**

Reference answer: `7 / 2` gives `3` (`int`); `7.0 / 2` gives `3.5` (`double`). In integer division both operands are `int`, so the result type is `int` and the fraction is discarded — "2 fits into 7 three whole times". With one floating-point operand, the other is promoted to `double` and the division follows floating-point rules.

**2. Evaluate `6 + 4 * 6 - 9 / 3 - 2 + 5`, naming the rule used at each step.**

Reference answer: Multiplication and division first (higher precedence than addition): `4 * 6 = 24` and `9 / 3 = 3` (exact integer division). The expression becomes `6 + 24 - 3 - 2 + 5`. Addition and subtraction share a level and associate left to right: `6+24=30`, `30-3=27`, `27-2=25`, `25+5=30`. The result is 30.

**3. Why does `std::cout << (a < b);` fail to compile without the parentheses?**

Reference answer: `<<` has higher precedence than `<`, so `std::cout << ... < b` parses as `((std::cout << ...) < b)`. The insertion expression yields `std::ostream&`, and there is no `<` operator comparing `std::ostream` with an integer, so the compiler reports an error. With parentheses the comparison runs first and produces a `bool`, which `cout` can print.

**4. After `int v = 5; int a = v++; int b = ++v;`, what are `v`, `a` and `b`?**

Reference answer: `v++` hands the old value 5 to `a`, then increments, so `a = 5`, `v = 6`. Then `++v` increments to 7 and hands that to `b`, so `b = 7`, `v = 7`. Final values: `v = 7`, `a = 5`, `b = 7`. The rule: operator after the variable uses the old value, operator before uses the new one.

**5. Is `value += 5` exactly equivalent to `value = value + 5`? Why does the course still prefer it?**

Reference answer: For built-in integer types the two are semantically identical and produce the same result. The course prefers `+=` because it compresses "accumulate into this same variable" into one symbol, which reads more directly and avoids mistyping the variable name in a long expression. For user-defined types (classes, later in the course) `+=` can also avoid a temporary object, though that belongs to a later chapter.

**6. With `a`, `b`, `c` equal to true, false, true, evaluate `(a && b) || (!c)` and show the steps.**

Reference answer: Inside the parentheses: `a && b` is false because `b` is false; `!c` is false because `c` is true. Then `false || false` is **false**. The whole expression holds only when "a and b are both true" or "c is false", and neither holds here.

## How it connects

This chapter turns data into expressions and decisions, the direct prerequisite for conditionals and loops. Chapter 6 first handles a different matter: laying out output — width, alignment, bases, precision and boolean display — together with the tools in `<limits>` and `<cmath>`. Chapter 7 then moves into `if`, `else if` and `switch`, putting the comparisons and logical results of this chapter to work in control flow.
