---
slug: "14-odr-linkage-declarations"
title: "How a Program Is Assembled: ODR, Declarations, and Separate Compilation"
summary: "A name may be defined only once per program, yet a class may be defined once per translation unit; functions split into declaration and definition, the compiler handles one unit at a time, and the linker stitches the rest. This chapter draws a hard line between compiler errors and linker errors."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "odr", "linkage", "translation-unit", "functions"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 14 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=51149s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

This is **chapter 14** of a 31-hour single video, covering 14:12:29–15:42:29. It starts from "why does a duplicated definition fail", moves through functions and the declaration/definition split, explains translation units and the linker, and ends by splitting functions into `.h` and `.cpp` files.

## What this chapter covers

Before a C++ program becomes an executable it passes through three stages:

1. **Preprocessing**: every `#include` is replaced by the file's contents, producing a **translation unit**.
2. **Compilation**: each translation unit is compiled independently into an **object file**.
3. **Linking**: the linker merges all object files into one executable.

The one definition rule (ODR) constrains how many times a name may be defined, while the compiler and the linker each see only part of the picture: the compiler sees declarations, the linker looks for definitions. Separating those two explains why some failures are `redefinition` (compile time) and others are `undefined reference` or `multiple definition` (link time).

## Timeline

| Time | Topic |
| --- | --- |
| 14:12:29 | ODR overview: variables, functions, classes, static members |
| 14:14:04 | In VS Code: the ODR and a free-standing variable |
| 14:15:26 | Same variable defined in two files → linker reports `multiple definition` |
| 14:16:34 | Functions cannot be defined twice either |
| 14:18:54 | The class exception: once per translation unit |
| 14:20:47 | Two class definitions in one translation unit → compile error |
| 14:21:51 | A class with a static member: where the definition goes |
| 14:26:22 | Duplicated static member and constructor → linker error |
| 14:28:35 | What a function is: a reusable machine |
| 14:29:18 | Function syntax: return type, name, parameters, body |
| 14:30:39 | Signature = name + parameter list (no return type) |
| 14:31:33 | Calling syntax: arguments fill parameters |
| 14:32:24 | Examples: `into_bar`, `max`, `say_hello`, `lucky_number` |
| 14:37:13 | Implicit conversion: passing `double` to an `int` parameter |
| 14:37:45 | Pass by value: the function modifies a copy |
| 14:40:10 | In VS Code: hands-on functions |
| 14:48:13 | Writing and calling `max` |
| 14:54:37 | Two functions with the same signature → redefinition |
| 14:56:56 | A full demonstration of pass by value |
| 15:00:45 | Separating declaration from definition |
| 15:04:01 | The prototype: return type + name + parameters + semicolon |
| 15:08:36 | Declaration without definition → `undefined reference` |
| 15:15:24 | Compilation model: preprocessing and translation units |
| 15:17:52 | Compilation produces object files |
| 15:18:22 | Linking stitches object files together |
| 15:20:02 | Splitting functions across files |
| 15:22:03 | In VS Code: the multiple-files project |
| 15:25:05 | Creating `compare.h` and `compare.cpp` |
| 15:29:01 | Definitions may live in any translation unit |
| 15:32:02 | Removing a definition to observe linker errors (gcc and MSVC) |
| 15:36:51 | Exercise: `operations.h` / `operations.cpp` |

## The one definition rule

The rule is short: **a name may have only one definition in the whole program**. Both "program" and "definition" need precision.

### Free-standing variables and functions: one definition across all files

```cpp
// main.cpp
double weight{7.5};      // both a declaration and a definition

// some_other_file.cpp
double weight{7.5};      // another definition
```

Compiled together, the linker reports:

```
multiple definition of `weight'
```

Note which stage produced the error. **Two definitions in one file are a compile error (`redefinition`); two definitions in different files are a linker error (`multiple definition`).** The compiler sees one translation unit at a time; only the linker sees the whole program.

Functions behave identically:

```cpp
// main.cpp
double add(double a, double b) { return a + b; }

// some_other_file.cpp
double add(double a, double b) { return a + b; }   // multiple definition
```

### Classes: the one exception

Class definitions live in headers and are included by many `.cpp` files. If a class also had to be defined once per program, headers would be unusable. So the ODR carves out an exception:

> A class may be defined once in each translation unit, provided the definitions are **identical** (same token sequence) and there is at most one per translation unit.

```cpp
// point.h
struct Point {
    double m_x{};
    double m_y{};
};
```

```cpp
// main.cpp
#include "point.h"

// some_other_file.cpp
#include "point.h"
```

This compiles and links. But writing `struct Point {...}` twice in the same `.cpp` immediately yields `redefinition of 'Point'`: **the exception relaxes "across translation units", not "within one translation unit"**.

### Static members and member functions

A class's static member variable needs exactly one out-of-class definition:

```cpp
// person.h
class Person {
public:
    Person(std::string name, int age);
    void print_info() const;
private:
    std::string m_full_name;
    int m_age{};
    static int s_person_count;
};
```

```cpp
// person.cpp
#include "person.h"

int Person::s_person_count{8};        // the single definition

Person::Person(std::string name, int age)
    : m_full_name{std::move(name)}, m_age{age} {
    ++s_person_count;
}
```

Adding `int Person::s_person_count{8};` in `main.cpp` as well produces two linker errors: `multiple definition of Person::s_person_count` and a duplicate constructor. **Member function definitions are bound by the ODR too** — one definition per program. (Defining a member function inside the class body makes it implicitly inline, an exception covered in later chapters.)

## Functions: syntax and vocabulary

The lecture uses a physical analogy: a function is a **machine** that accepts input, performs processing, may return output, and can be reused indefinitely.

```cpp
return_type function_name(parameter_list) {
    // body
    return result;   // unless the return type is void
}
```

Four parts:

| Part | Meaning |
| --- | --- |
| Return type | What the function gives back; `void` means nothing |
| Name | How callers refer to it |
| Parameter list | What callers must supply; called **parameters** in the definition |
| Body | What it does |

Values supplied at the call site are **arguments**:

```cpp
int max(int a, int b) {        // a and b are parameters
    if (a > b) return a;
    return b;
}

int result = max(10, 20);      // 10 and 20 are arguments
```

The two words are often used interchangeably, but the distinction is useful when talking about definition versus call.

### Signature: name plus parameters

**A function's signature is its name plus its parameter list**, and it excludes the return type. So these two conflict:

```cpp
int  max(int a, int b) { return a > b ? a : b; }
void max(int x, int y) { }        // redefinition: same signature
```

Renaming parameters from `a,b` to `x,y` does not help: the signature records types and count, not names. A different return type does not help either.

### Pass by value: the function gets a copy

```cpp
double increment_and_multiply(double a, double b) {
    ++a;
    ++b;
    return a * b;
}

int main() {
    double h{3}, i{4};
    double result = increment_and_multiply(h, i);
    // h is still 3, i is still 4
}
```

The compiler hands `a` and `b` **copies** of `h` and `i`. `++a` modifies a copy that dies when the function returns, so the caller's variables are untouched. Modifying the caller's variables requires pointers or references — the subject of chapter 15.

### Implicit conversions

```cpp
int minimum(int a, int b) { return a < b ? a : b; }

double f{3.9}, g{4.1};
int m = minimum(f, g);    // compiles; f and g are truncated to 3 and 4
```

When argument types do not match the parameters, the compiler inserts a conversion on its own. Here `3.9` is truncated to `3`, not rounded, which may not be what you intended. **Implicit conversions do not raise errors; they happen silently**, making them a common source of hard-to-find bugs.

## Separating declaration from definition

### The prototype

Writing the function header alone, terminated by a semicolon, gives a **declaration**:

```cpp
int max(int a, int b);      // declaration, also called a prototype
```

The prototype must appear before any call. The previous chapter compiled without one only because the definition sat above `main` — **a definition doubles as a declaration**.

```cpp
int max(int a, int b);      // declaration

int main() {
    int m = max(5, 3);      // the compiler only needs the signature here
    return 0;
}

int max(int a, int b) {     // the definition may come later
    return a > b ? a : b;
}
```

### What happens with only a declaration

Delete the definition and keep the declaration, and compilation still succeeds because the compiler only needs the signature to emit the call. Linking then fails:

```
undefined reference to `max()'
```

MSVC phrases it as `unresolved external symbol`. **`undefined reference` means the linker went looking for a definition and did not find one.**

One detail: parameter names in a declaration may be omitted.

```cpp
int max(int, int);          // legal
```

The lecture still recommends keeping them for self-documentation.

## The compilation model: three stages

```
main.cpp ──preprocess──> translation unit ──compile──> main.o ─┐
other.cpp ─preprocess──> translation unit ──compile──> other.o ─┼──link──> rooster
...                                                              ┘
```

- **Preprocessing**: `#include <iostream>` is replaced by the contents of `iostream`; macros expand; conditionals resolve. The result is a complete **translation unit**.
- **Compilation**: each translation unit is compiled independently into an **object file** (`.o` / `.obj`) holding machine code plus a symbol table.
- **Linking**: the linker merges object files into one executable and resolves cross-file symbol references.

This model explains which stage owns which error:

| Symptom | Stage | Cause |
| --- | --- | --- |
| `redefinition of ...` | compile | duplicate definition in one translation unit |
| `undefined reference` | link | declaration exists, no definition anywhere |
| `multiple definition` | link | one definition in each of several units |

gcc link failures usually end with `ld returned 1 exit status`; `ld` is the linker.

## Splitting across files: headers and implementation

```
compare.h      // declarations
compare.cpp    // definitions
main.cpp       // #include "compare.h" and call
```

```cpp
// compare.h
#pragma once
int max(int a, int b);
int min(int a, int b);
```

```cpp
// compare.cpp
#include "compare.h"

int max(int a, int b) { return a > b ? a : b; }
int min(int a, int b) { return a < b ? a : b; }
```

```cpp
// main.cpp
#include <iostream>
#include "compare.h"

int main() {
    std::cout << max(134, 56) << "\n";
    std::cout << min(146, 23) << "\n";
}
```

Two rules to remember:

1. **Your own headers take double quotes**: `#include "compare.h"`; standard headers take angle brackets: `#include <iostream>`.
2. **A definition need not live next to its header.** Move `max`'s definition to any `.cpp` and the linker still finds it; the header only makes the declaration visible to each translation unit.

Comment out `min`'s definition and the linker walks every translation unit before reporting `undefined reference to min` — the previous section's error in practice.

## Takeaways

- ODR: free-standing variables and functions get one definition per program; a class may be defined once per translation unit if all copies are identical, and at most once per unit.
- Static member variables need one out-of-class definition; member function definitions also occur once.
- A signature is the name plus parameter list, excluding the return type; parameter names do not matter.
- Pass by value hands over a copy; changes inside the function do not reach the caller.
- Implicit conversions happen silently; use explicit casts or change the parameter type when needed.
- A prototype lets callers compile without the definition; a missing definition surfaces at link time as `undefined reference`.
- Compilation is preprocessing + compilation + linking; the compiler sees one unit, the linker sees everything.

## Comprehension check

**1. Why is writing `double weight{7.5};` twice in one file a compile error, while doing it in two files is a linker error?**

Reference answer: the compiler processes one translation unit at a time and can see both definitions inside the same `.cpp`, so it reports `redefinition` immediately. When the two definitions sit in different `.cpp` files, each unit looks fine on its own and compilation succeeds; only at link time does the linker merge symbol tables and discover two strong symbols with the same name, producing `multiple definition`. The stage that reports the error is whichever tool can see both definitions.

**2. Why are classes allowed to be defined in multiple translation units, and where does that exception stop?**

Reference answer: class definitions live in headers that many `.cpp` files include; if a class could be defined only once per program, headers would be unusable. The ODR therefore permits one definition per translation unit, provided all copies are identical. The exception stops at the translation unit boundary: writing `struct Point` twice in the same `.cpp` still triggers `redefinition`.

**3. What is the difference between `int max(int a, int b);` and `int max(int a, int b) { return a > b ? a : b; }`, and what happens if only the first is kept?**

Reference answer: the first is a declaration (prototype) that only tells the compiler the signature; the second is a definition with a body that generates code. With only the declaration, compilation still succeeds because call sites need only the signature, but the linker finds no definition in any object file and reports `undefined reference to max()` (MSVC: `unresolved external symbol`).

**4. Does a function's signature include the return type? Can these two lines coexist?**

```cpp
int  max(int a, int b);
void max(int x, int y);
```

Reference answer: the signature consists of the function name and the types and count of its parameters; it excludes the return type, and parameter names do not participate. Both lines have the signature `max(int, int)`, so they cannot coexist — the second is rejected as a redefinition even though the parameter names and return types differ.

**5. What does this program print, and why?**

```cpp
void bump(int a) { ++a; }

int main() {
    int x{5};
    bump(x);
    std::cout << x << "\n";
}
```

Reference answer: it prints `5`. `bump` takes its parameter **by value**, so `a` receives a copy of `x`; `++a` modifies only the copy, which is destroyed on return, leaving `x` unchanged. To modify `x`, the parameter would have to be `int& a` or `int* a`.

**6. If `min`'s body is deleted from `compare.cpp` while its declaration remains in `compare.h`, what error appears and at which stage?**

Reference answer: a link-time error, `undefined reference to min(int, int)` (MSVC: `unresolved external symbol`). Compilation succeeds because `main.cpp` needs only the declaration to emit the call; the linker, while merging object files and resolving the reference to `min`, finds no definition and fails.

## Relation to neighbouring chapters

The previous chapter dealt with characters and strings, introducing the idea of a type hiding details. This chapter pushes the same idea to the file level: headers expose an interface, `.cpp` files hide the implementation. The next chapter examines the three ways to pass function arguments — by value, by pointer, and by reference — which is exactly the problem left open by "pass by value hands over a copy".
