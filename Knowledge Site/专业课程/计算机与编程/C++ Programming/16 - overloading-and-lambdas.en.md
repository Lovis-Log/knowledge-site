---
slug: "16-overloading-and-lambdas"
title: "Function Overloading and Lambdas: Choosing Among Same-Named Functions, and Anonymous Functions"
summary: "Overloads may differ only in their parameter lists; the return type is not part of the signature. A lambda is a nameless function object that reaches outer variables through a capture list — by value it holds a copy, by reference it holds an alias."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "overloading", "lambda", "capture-list", "closures"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 16 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=59653s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

This is **chapter 16** of a 31-hour single video, covering 16:34:13–17:41:39. The first half covers overloading: one name, several parameter lists, and the compiler picks by argument type. The second half covers lambdas: functions written as expressions that can be stored and called.

## What this chapter covers

Both mechanisms solve the same problem — **making call sites read naturally**:

- **Overloading** lets you write `max(a, b)` without caring whether `a` and `b` are `int`, `double`, or `std::string_view`; the compiler chooses.
- **Lambdas** let you write a function right where it is needed instead of declaring a named one for a single use.

Both rest on the notion of a signature from chapter 14: overloads are distinguished by their parameter lists, and a lambda's body is a function type.

## Timeline

| Time | Topic |
| --- | --- |
| 16:34:13 | Overloading rules: same name, different parameter lists |
| 16:35:17 | The return type does not distinguish overloads |
| 16:36:31 | The call selects an overload by argument type |
| 16:37:37 | In VS Code: overloading with different parameters |
| 16:39:14 | Return-type-only difference → `cannot overload function distinguished by the return type alone` |
| 16:43:14 | Changing parameter order and count |
| 16:47:06 | A `std::string_view` overload and implicit conversion from literals |
| 16:48:52 | Lambdas: anonymous functions |
| 16:49:51 | Lambda syntax: capture list, parameters, return type, body |
| 16:52:15 | Naming a lambda with `auto` and calling it |
| 16:53:21 | Calling directly by appending `()` |
| 16:54:19 | Lambdas with parameters |
| 16:55:07 | Lambdas that return values, and nesting one in `std::cout` |
| 16:56:26 | Explicit return type `-> int` |
| 16:57:17 | In VS Code: declaring and using lambda functions |
| 17:19:32 | Lambda summary |
| 17:20:18 | Capture lists: why they are needed |
| 17:22:11 | Capture by value: a copy inside |
| 17:24:15 | Capture by reference: an alias inside |
| 17:25:16 | In VS Code: capture lists |
| 17:34:01 | Capturing everything: `=` and `&` |
| 17:36:31 | In VS Code: capture all |
| 17:40:21 | Preview of the next chapter: function templates |

## Function overloading

### The rule: only the parameter list distinguishes

```cpp
int max(int a, int b) { return a > b ? a : b; }
int max(int a, int b) { return a > b ? a : b; }   // error: identical signature
```

The compiler refuses outright:

```
cannot overload function distinguished by the return type alone
```

Chapter 14 established this: **a signature is the name plus the parameter list, excluding the return type**. Of the possible changes, only parameter-list changes are legal:

| Change | New overload? |
| --- | --- |
| Return type only | no |
| Parameter names only | no |
| Parameter types | yes |
| Parameter count | yes |
| Parameter order (with different types) | yes |

```cpp
int    max(int a, int b);
double max(double a, double b);
int    max(int a, double b);
int    max(double a, int b);
int    max(int a, int b, int c);
```

### How the call picks one

```cpp
int x{4}, y{9};
double a{5.4}, b{7.4};

std::cout << max(x, y) << "\n";   // int overload
std::cout << max(a, b) << "\n";   // double overload
```

The compiler matches on the **types** of the arguments. Two details matter:

1. **`auto result = max(x, y);`** takes the type of the selected overload — here `int`.
2. **Implicit conversions participate.** `max("hello", "world")` will convert the literals to `std::string_view`, so that overload is called.

This is also where overloading goes wrong: if several candidates match equally well, the compiler reports ambiguity rather than picking arbitrarily.

> The lecture's caution: being able to write `max(int,double)` and `max(double,int)` does not mean you should. Overloading exists to make call sites natural, not to display syntax. Differences in parameter lists should have a semantic reason.

## Lambdas: anonymous functions

### Syntax

```cpp
[capture](parameters) -> return_type { body }
```

Four parts in order:

| Part | Optional? | Meaning |
| --- | --- | --- |
| `[...]` capture list | no (may be empty) | gives the body access to outer variables |
| `(...)` parameters | no (may be empty) | same as an ordinary function |
| `-> T` return type | yes | deduced from `return` when omitted |
| `{...}` body | no | what it does |

### Naming and then calling

A lambda written on its own merely defines an object; it does not run:

```cpp
[]() {
    std::cout << "Hello World\n";
};                       // defined, never called
```

To call it repeatedly, assign it to a variable:

```cpp
auto greet = []() {
    std::cout << "Hello World\n";
};

greet();
greet();                 // can be called many times
```

The type deduced by `auto` is a **unique closure type** that the compiler generates — its name cannot be written, so `auto` is the only option.

### Calling directly

For a single use, append `()` after the body:

```cpp
[]() {
    std::cout << "Hello World\n";
}();                     // define and call immediately
```

With no name there is no second call.

### Parameters and return values

```cpp
[](double a, double b) {
    std::cout << "a + b = " << a + b << "\n";
}(10.0, 5.0);

auto result = [](double a, double b) {
    return a + b;
}(10.0, 20.0);           // result == 30.0
```

The last form is worth noting: **the whole lambda expression is a value**, so it can sit directly inside `std::cout`:

```cpp
std::cout << "sum = " << [](double a, double b) { return a + b; }(3.0, 4.0) << "\n";
```

### Explicit return type

```cpp
auto f = [](double a, double b) -> int {
    return a + b;        // the double result is converted to int
};

f(6.9, 3.5);             // returns 10, not 10.4
```

Without `-> T`, the return type is deduced from the `return` expression (here `double`); writing `-> int` forces a conversion. `sizeof(result)` shows the difference: `int` is usually 4 bytes, `double` 8.

## Capture lists: how a lambda sees outer variables

A lambda body cannot see local variables from the enclosing scope by default:

```cpp
double a{10}, b{20};

auto f = []() {
    std::cout << a + b;   // compile error: a and b are not captured
};
```

gcc reports `'a' is not captured`. The reason is that a lambda is a self-contained class type; outer variables are not in its scope.

### Capture by value

```cpp
double c{42};

auto f = [c]() {
    std::cout << "inner: " << c << "\n";   // the copy made at creation
};

for (int i{0}; i < 5; ++i) {
    std::cout << "outer: " << c << "\n";
    f();
    ++c;
}
```

`outer` climbs from 42 to 46 while `inner` stays at 42. Printing the addresses shows two distinct locations: **capture by value copies the variable at the moment the lambda is created**.

### Capture by reference

```cpp
auto g = [&c]() {
    std::cout << "inner: " << c << "\n";
};
```

Adding `&` makes it a reference: the addresses match, external changes appear inside immediately, and writes inside are visible outside.

### Capturing everything

```cpp
[=]() { /* every used outer variable captured by value */ }
[&]() { /* every used outer variable captured by reference */ }
```

`=` and `&` are shorthands that avoid listing variables. The lecture warns that `&` is dangerous: **if the lambda outlives the captured variable, the reference dangles**. Capture-all-by-reference is safe only when the lambda's lifetime is clearly shorter than the variables'.

### The three styles compared

| Form | Inside holds | Outer changes visible? | Risk |
| --- | --- | --- | --- |
| `[c]` | a copy | no | none (the copy may go stale) |
| `[&c]` | a reference | yes | dangles if the variable dies first |
| `[=]` | copies of everything used | no | none |
| `[&]` | references to everything used | yes | same as above, harder to spot |

## Takeaways

- Overloads may differ only in parameter types, count, or order; return type and parameter names do not count.
- The call matches on argument types, inserting implicit conversions when needed; equally good candidates cause ambiguity.
- Lambda syntax is `[capture](parameters) -> return_type { body }`, with the return type optional.
- A lambda can be stored in an `auto` variable and called repeatedly, or called immediately with trailing `()`.
- Captures give access to outer variables: `[c]` copies, `[&c]` refers, `[=]` and `[&]` capture all.
- Capture by reference requires the captured variables to outlive the lambda.

## Comprehension check

**1. Which of these lines can coexist?**

```cpp
int  max(int a, int b);
double max(int a, int b);
int  max(int a, int b, int c);
int  max(double a, int b);
```

Reference answer: lines 1 and 2 share the signature `max(int,int)` and differ only in return type, so they cannot coexist; the compiler reports `cannot overload function distinguished by the return type alone`. Line 3 takes three `int`s and line 4 takes `double,int`, so both have distinct signatures and may coexist with line 1. The surviving set is lines 1, 3, and 4.

**2. If both `max(std::string_view, std::string_view)` and `max(const char*, const char*)` exist, which does `max("hello", "world")` call?**

Reference answer: the `const char*` overload. A string literal has type `const char[N]`, and decaying to `const char*` is a standard conversion, whereas converting to `std::string_view` is a user-defined conversion. Overload resolution compares conversion sequences, and a standard conversion beats a user-defined one, so the `const char*` version wins and no ambiguity arises. The compiler reports ambiguity only when neither candidate's sequence is better.

**3. What does `f(6.9, 3.5)` return for `auto f = [](double a, double b) -> int { return a + b; };`, and what changes if `-> int` is removed?**

Reference answer: with `-> int`, `a + b` evaluates to `10.4` and is then converted to `int`, giving `10`. Without the explicit return type, the `return` expression deduces `double`, giving `10.4`. `sizeof` shows the difference: 4 bytes versus 8 on typical platforms.

**4. Why does `inner` keep printing 42 in the loop below?**

```cpp
double c{42};
auto f = [c]() { std::cout << c << "\n"; };
for (int i{0}; i < 5; ++i) { f(); ++c; }
```

Reference answer: `[c]` captures by value, so the lambda copies `c` **when it is created** and thereafter reads that copy. `++c` modifies the outer variable, which the copy knows nothing about, so the copy remains 42. Change the capture to `[&c]` and the lambda reads the outer variable, which then climbs with the loop.

**5. When does `[&]` capture-all-by-reference cause problems?**

Reference answer: when the lambda outlives the captured local variables. Storing a `[&]` lambda and calling it after the enclosing function has returned leaves it referring to destroyed locals — a dangling reference and undefined behaviour. Capturing by value with `[=]` avoids this. `[&]` is appropriate only when the call happens while the captured variables are still alive.

## Relation to neighbouring chapters

The previous chapter covered argument passing; this chapter turns a function itself into a value that can be passed around. The next chapter moves the other way: function templates write one blueprint and let the compiler generate concrete functions, solving the repetition of a dozen overloads with identical bodies. Capture lists and template parameters together are the groundwork for handing lambdas to algorithms.
