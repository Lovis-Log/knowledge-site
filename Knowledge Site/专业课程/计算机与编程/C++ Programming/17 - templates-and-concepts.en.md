---
slug: "17-templates-and-concepts"
title: "Templates and Concepts: From Function Blueprints to Compile-Time Constraints"
summary: "A function template is not code but a blueprint the compiler instantiates into real functions. Deduction decides which instance is generated, explicit template arguments override it, specialization replaces the default implementation, and concepts write the type's requirements into the signature."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "templates", "concepts", "template-specialization", "cpp20"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 17 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=63699s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

This is **chapter 17** of a 31-hour single video, covering 17:41:39–20:17:38 — the longest chapter in the course. It starts from overload fatigue and works through function templates, deduction, explicit arguments, reference parameters, specialization, and finally C++20 concepts.

## What this chapter covers

The problem with overloading is concrete: five `max` versions with identical bodies. A template extracts the logic once and lets the compiler generate a concrete function per type used at the call site.

The chapter answers five questions along the way:

1. What is a template? — **a blueprint, not code**.
2. How does the compiler know which one to generate? — **deduction**.
3. What if deduction is not suitable? — **explicit template arguments**.
4. What if the default instance is wrong for a type? — **template specialization**.
5. How do you state "this type must support X" in the signature? — **concepts**.

## Timeline

| Time | Topic |
| --- | --- |
| 17:41:39 | The first function template removes overload repetition |
| 17:43:45 | How template instances are generated |
| 17:47:18 | In VS Code: trying out function templates |
| 17:53:36 | Using cppinsights to inspect generated instances |
| 17:55:21 | Only called instances are generated |
| 18:00:23 | The type must support the operations in the body |
| 18:05:08 | A single `T` forces all arguments to share a type |
| 18:07:03 | Observing instances in the debugger |
| 18:14:14 | Counterexample: pointer arguments compare addresses |
| 18:19:46 | Template type deduction |
| 18:22:44 | Explicit template arguments |
| 18:35:22 | Passing template parameters by reference |
| 18:38:02 | Value and reference templates overloaded → ambiguity |
| 18:49:05 | Motivation for specialization |
| 18:52:15 | Specializing for `const char*` with `strcmp` |
| 19:04:40 | Concepts: one of the four big C++20 features |
| 19:06:53 | Standard-library concepts |
| 19:08:00 | Syntax 1: a `requires` clause |
| 19:11:51 | Syntax 2: the concept inside `template<>` |
| 19:12:06 | Syntax 3: a concept before `auto` |
| 19:13:02 | Syntax 4: `requires` after the parameter list |
| 19:25:36 | Writing your own concept |
| 19:30:38 | In VS Code: building your own concepts |
| 19:42:52 | Three kinds of requirements |
| 19:44:45 | Simple versus nested requirements |
| 19:45:38 | Compound requirements |
| 19:59:32 | Combining concepts with `&&` and `||` |
| 20:09:37 | Concepts and `auto` variables |

## Function templates: one blueprint

### Starting from duplicated overloads

```cpp
int    maximum(int a, int b)    { return a > b ? a : b; }
double maximum(double a, double b) { return a > b ? a : b; }
```

The bodies are identical; only the types differ. A template makes the type a placeholder:

```cpp
template <typename T>
T maximum(T a, T b) {
    return a > b ? a : b;
}
```

`T` appears in the return type and both parameters, so **all three must be the same type**.

### A template is not code

The lecture stresses this repeatedly: a function template is not executable code. The compiler generates the real function only when it sees a call:

```cpp
int x{5}, y{7};
auto r1 = maximum(x, y);          // generates maximum<int>
auto r2 = maximum(5.5, 78.7);     // generates maximum<double>
```

What is generated is called a **template instance**:

```cpp
// roughly what the compiler produces
int maximum(int a, int b) { return a > b ? a : b; }
```

Three consequences:

- **Generated on demand**: if `maximum<std::string>` is never called, that version never exists.
- **Generated once**: repeated calls with the same type reuse the existing instance.
- **Observable**: cppinsights.io displays the instantiated code, and the debugger's call stack shows signatures such as `maximum<int>`.

### The type must support the body

```cpp
template <typename T>
T multiply(T a, T b) { return a * b; }

multiply(5, 7);          // multiply<int>, returns 35
multiply(5.1, 7.0);      // multiply<double>, returns 35.7
multiply(std::string{"a"}, std::string{"b"});   // compile error
```

The error is `no match for 'operator*'`. The template itself never checks whether `T` can be multiplied; the failure appears only at instantiation — **exactly the problem concepts address**.

### The single-`T` restriction

```cpp
maximum(4.5, 9);   // error: conflicting types for 'T'
```

`4.5` deduces `double`, `9` deduces `int`, and the two conflict. Either write `9.0`, or use an explicit template argument.

### Counterexample: pointers

```cpp
int x{5}, y{7};
int* px{&x};
int* py{&y};

auto result = maximum(px, py);   // maximum<int*>, compares addresses
```

Which address is larger depends on memory layout, not on whether 5 or 7 is larger. The lecture demonstrates a return of `5` because `px` happens to live at a higher address. **The template instantiated fine; the semantics are wrong.**

## Deduction and explicit template arguments

### Default: deduce from the arguments

```cpp
template <typename T>
T maximum(T a, T b);

maximum(10, 23);   // T = int
maximum(5.5, 7.4); // T = double
```

The compiler looks only at the argument types at the call. This is **template type deduction**.

### Explicit: `maximum<double>(...)`

```cpp
auto result = maximum<double>(4, 9);   // force the double instance
```

The type in angle brackets tells the compiler which `T` to use, which also permits differing argument types — `int` converts implicitly to `double`:

```cpp
maximum<double>(a, d);   // a is int, d is double → both become double
maximum<double>(a, e);   // e is std::string → not convertible, compile error
```

Terminology matters:

| Term | Appears at | Example |
| --- | --- | --- |
| template parameter | the declaration | `T` in `template <typename T>` |
| template argument | the call | `double` in `maximum<double>` |

### Passing template parameters by reference

By default parameters are by value, which copies large objects. Write the reference directly in the template:

```cpp
template <typename T>
const T& maximum(const T& a, const T& b) {
    return a > b ? a : b;
}
```

- `const T&` avoids copies and forbids modification inside;
- The debugger shows the instance as `const double& maximum(const double&, const double&)`;
- Addresses match the caller's, proving no copy was made.

One trap: **a by-value and a by-reference template of the same name cannot coexist**.

```cpp
template <typename T> T maximum(T a, T b);
template <typename T> const T& maximum(const T& a, const T& b);

maximum(5.5, 7.9);   // ambiguous: both candidates match
```

## Specialization: a different implementation for one type

The default instance is wrong for `const char*` — it compares pointers. Fix it by writing a separate version for that type:

```cpp
template <>
const char* maximum<const char*>(const char* a, const char* b) {
    return (std::strcmp(a, b) > 0) ? a : b;
}
```

Syntax points:

- `template <>`: empty angle brackets, introducing no new parameter;
- `maximum<const char*>`: the specialized type is written explicitly;
- The parameter list matches the primary template.

`strcmp` returns a value that already fits: positive means the first string is larger.

```cpp
const char* g{"wild"};
const char* h{"animal"};
std::cout << maximum(g, h);   // with specialization: wild; without: animal (address comparison)
```

**Without the specialization**, the comparison is between the addresses of two string literals and may have nothing to do with lexicographic order.

## Concepts: constraints in the signature

Template diagnostics have always been painful: errors surface at instantiation and drag a pile of template internals behind them. Concepts make "what this type must satisfy" part of the signature, so violations report an unsatisfied constraint.

### Standard concepts

```cpp
#include <concepts>

template <typename T>
requires std::integral<T>
T add(T a, T b) { return a + b; }
```

- `add(6, 7)`: `int` is integral, accepted;
- `add(11.1, 1.9)`: `double` fails `std::integral`, compile error reading `use of function 'add' with unsatisfied constraints`.

Common built-ins: `std::integral`, `std::floating_point`, `std::same_as`, `std::convertible_to`.

### Four syntaxes

```cpp
// 1. requires clause
template <typename T>
requires std::integral<T>
T add(T a, T b);

// 2. concept in the template parameter list
template <std::integral T>
T add(T a, T b);

// 3. constrained auto
std::integral auto add(std::integral auto a, std::integral auto b);

// 4. requires after the parameter list
template <typename T>
T add(T a, T b) requires std::integral<T>;
```

All four are equivalent; pick by readability. Syntax 2 is the shortest, syntax 4 suits constraints depending on several parameters.

### Writing your own concept

**From a type trait**:

```cpp
template <typename T>
concept MyIntegral = std::is_integral_v<T>;
```

`std::integral` itself is defined in essentially this way.

**From a requires expression** — useful when the requirement is not a single trait:

```cpp
template <typename T>
concept Multipliable = requires(T a, T b) {
    a * b;        // checks syntax only
};

template <typename T>
concept Incrementable = requires(T a) {
    a += 1;
    ++a;
    a++;
};
```

The key point: **a requires expression only checks whether the expressions compile, not what they evaluate to**.

### Simple, nested, and compound requirements

```cpp
// simple: only guarantees the expression is syntactically valid
template <typename T>
concept TinyType = requires(T t) {
    sizeof(T) < 4;        // always valid syntax → always satisfied
};

// nested: also requires the expression to be true
template <typename T>
concept TinyTypeStrict = requires(T t) {
    requires sizeof(T) < 4;
};

// compound: constrains the result type
template <typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<int>;
};
```

The lecture's experiment makes the trap concrete: `TinyType` accepts `double` (8 bytes) because `sizeof(T) < 4` is a valid expression regardless of its value; adding a nested `requires` actually checks truth.

### Combining concepts

```cpp
template <typename T>
requires std::integral<T> || std::floating_point<T>
T add(T a, T b);

template <typename T>
requires std::integral<T> && TinyTypeStrict<T>
T add(T a, T b);
```

`||` means either, `&&` means both. `long long` is integral but fails `TinyType` (8 bytes), which is exactly how the `&&` case is demonstrated.

### Concepts and `auto` variables

```cpp
std::integral auto x = add(5, 8);        // fine: returns int
std::floating_point auto y = add(5, 8);  // fails: int is not floating point
```

For literal initialization this adds little value; for a function's return value it confirms at compile time that you received the type you expected.

## Takeaways

- A function template is a blueprint; the compiler instantiates it per call, only for used types, once per type.
- Operations in the body must be supported by the argument types, or instantiation fails.
- A single `T` forces all occurrences to share a type; `f<double>(...)` overrides deduction and permits implicit conversions.
- Template parameters may be `const T&` to avoid copies; by-value and by-reference templates of the same name cannot coexist.
- Specialization `template <>` replaces the default implementation for one type, e.g. `strcmp` for `const char*`.
- Concepts put constraints in the signature, with four equivalent syntaxes and clearer diagnostics.
- A custom concept comes from a type trait or a requires expression; requires checks syntax, so checking values needs a nested `requires`.
- Concepts combine with `&&` and `||`, and can constrain `auto` variables.

## Comprehension check

**1. Why is "a function template is not C++ code", and what does that imply for the build output?**

Reference answer: a template is a blueprint with a type placeholder; it generates nothing executable by itself. Only when a concrete call appears does the compiler substitute the argument type, generate the real function (the template instance), and place it in the object file. Therefore: (a) types never used produce no code; (b) each type is instantiated once and reused; (c) errors in the template typically surface at instantiation rather than definition.

**2. Why does `maximum(4.5, 9)` fail to compile, and what are two fixes?**

Reference answer: the arguments deduce `double` and `int`, but the template has a single `T`, producing `conflicting types for 'T'`. Fix one: make the arguments the same type, e.g. `maximum(4.5, 9.0)`. Fix two: name the template argument explicitly, `maximum<double>(4.5, 9)`, so `9` converts implicitly to `double`.

**3. Why does the default template give the wrong answer for `const char*`, and how does specialization fix it?**

Reference answer: the default instance deduces `T = const char*`, so `a > b` compares pointer addresses rather than string contents, and the result depends on memory layout. The specialization `template <> const char* maximum<const char*>(const char* a, const char* b)` compares with `std::strcmp(a, b) > 0` instead. When the arguments are `const char*`, the compiler prefers this more specialized definition.

**4. Why does this concept fail to reject `double`, and how would you fix it?**

```cpp
template <typename T>
concept TinyType = requires(T t) {
    sizeof(T) < 4;
};
```

Reference answer: a requires expression checks only whether the enclosed statements are **syntactically valid**. `sizeof(T) < 4` is a valid expression for every type (its result is `bool`), so the concept is always satisfied and `double` passes. The fix is a nested requirement that forces the expression to be true:
```cpp
template <typename T>
concept TinyType = requires(T t) {
    requires sizeof(T) < 4;
};
```
Then `double` (8 bytes) fails.

**5. What is the difference between `requires std::integral<T> || std::floating_point<T>` and the `&&` version? Give a passing and a failing type for each.**

Reference answer: `||` requires either constraint, `&&` requires both. For `||`: `int` passes (integral), `double` passes (floating point), `std::string` fails (neither). For `&&`: no type is both integral and floating point, so every type fails — which shows that `&&` combining complementary concepts is usually a mistake; it is useful for combining constraints that can hold together, such as integral plus a size limit.

**6. What does the compound requirement `{ a + b } -> std::convertible_to<int>` check?**

Reference answer: two things — that `a + b` is a valid expression, and that its result type is convertible to `int`. For example, `char + char` yields `int`, so it passes; `std::string + std::string` yields `std::string`, which is not convertible to `int`, so it fails. The check is about type-level convertibility, not runtime values.

## Relation to neighbouring chapters

The previous chapter made functions into values; this chapter makes one piece of logic serve many types, and concepts add a compile-time contract to templates. The next chapter moves to classes — from blueprints to user-defined types — and template parameters will soon combine with classes to form class templates, the foundation of the standard containers.
