---
slug: 02-first-program-and-workflow
title: "Chapter 2: Comments, Errors, Statements and Functions"
summary: "Covers 1:55:35–3:00:43 of the long video. Starting from comments and the three kinds of problems, it builds the model of statements, functions and I/O streams, uses a simplified memory model to explain how the CPU executes a program line by line, and separates the core language, the standard library and the STL."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, functions, io-streams, error-handling, memory-model]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 2 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=6935s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter covers

Chapter 2 spans 1:55:35–3:00:43. It moves from "it compiles" to "it is organised": how to write comments, how to tell which of the three kinds of problems you are looking at, how statements and functions compose a program, and how data enters from the keyboard and leaves for the terminal. The chapter closes with a simplified memory model that explains what actually happens at run time, and with a clear separation of three terms that are often confused: core language, standard library, STL.

## Timeline

| Time | Topic |
| --- | --- |
| 1:55:37 | Line and block comments; block comments do not nest |
| 2:01:51 | Three kinds of problems: compile-time, run-time, warnings |
| 2:13:01 | Statements: semicolon-terminated, executed in order |
| 2:16:10 | Functions: return type, name, parameters, body |
| 2:31:29 | Output streams cout / cerr / clog, input stream cin |
| 2:37:16 | Reading input with spaces: getline |
| 2:50:02 | Execution model and simplified memory model |
| 2:56:50 | Core language, standard library, STL |

## Comments

A comment is for humans; the compiler ignores it completely.

```cpp
// A line comment: from // to the end of the line

/*
   A block comment:
   may span several lines
*/

int main() {
    std::cout << "Hello World" << std::endl; // also fine after a statement
    return 0;
}
```

One limit must be remembered: **block comments do not nest**. In `/* ... /* ... */ ... */` the comment ends at the first `*/`; everything after is parsed as code and produces a pile of confusing errors.

Use comments sparingly. The lecturer's phrasing is blunt: too many comments turn a program into a novel. A good comment explains *why*, not what the code already says.

## Three kinds of problems

When turning source into an executable, problems can only appear at three points:

| Kind | When | Consequence | Example |
| --- | --- | --- | --- |
| Compile-time error | at build time | no binary produced | missing semicolon, undeclared variable |
| Warning | at build time | binary still produced | integer division by zero, implicit narrowing |
| Run-time error | while running | wrong result or crash | using the result of a division by zero |

### Compile-time errors

```cpp
std::cout << "Hello World" << std::endl   // semicolon missing
return 0;
```

The compiler reports `expected ';' before 'return'`. The defining feature: **the build fails and there is no executable**. That is a good thing — the problem is stopped before it can run.

### Warnings

```cpp
int value = 7 / 0;   // compiles with a warning
```

gcc warns "division by zero" but the build succeeds. A warning is not decoration: it says the compiler finds something suspicious, and it should normally be fixed rather than ignored.

### Run-time errors

Print the result of that division:

```cpp
int value = 7 / 0;
std::cout << value << std::endl;
```

The program may terminate abruptly. Integer division by zero is undefined behaviour in C++; the compiler is not obliged to detect it, so it surfaces only when the program runs. A run-time error is precisely something invisible at build time that appears while running.

> **In one line:** a compile-time error leaves you with no program, a warning leaves you with a risky program, a run-time error leaves you with a program that misbehaves.

## Statements

A statement is the basic unit of execution, ends with a semicolon, and **runs top to bottom**.

```cpp
int first_number {3};      // statement 1
int second_number {7};     // statement 2
int sum = first_number + second_number;   // statement 3
std::cout << sum << std::endl;            // statement 4
```

Miss any semicolon and you get a compile-time error. A statement may span several lines; the compiler follows semicolons, not newlines.

The closing brace of `main` marks the end of `main`, and the end of `main` is the end of the program; the return value goes to the operating system.

## Functions

A function is a reusable block: give it inputs (parameters), get an output (return value).

```cpp
int add_numbers(int first, int second) {
    int result = first + second;
    return result;
}
```

Four parts:

- **Return type**: `int` — it returns an integer.
- **Name**: `add_numbers`.
- **Parameter list**: `(int first, int second)`; every parameter needs a type.
- **Body**: inside the braces, ending with `return` to hand back the result.

Calling it:

```cpp
int main() {
    int sum = add_numbers(25, 7);
    std::cout << sum << std::endl;   // 32
    std::cout << add_numbers(3, 42) << std::endl;  // 45
    return 0;
}
```

Two rules matter:

1. **A function must be defined (or declared) before use.** Putting `add_numbers` after `main` without a declaration fails to compile.
2. **Parameters are passed by value.** At the call, `25` and `7` are copied into `first` and `second`; the function modifies copies.

Moving the addition out of `main` buys reuse: call it again with other numbers instead of copying the logic.

## I/O streams

C++ models input and output as **streams**: data flows along a pipe.

### Output: cout, cerr, clog

```cpp
std::cout << "Hello C++20" << std::endl;
std::cerr << "Something went wrong" << std::endl;
std::clog << "A log message" << std::endl;
```

All three use `<<`; only the intent differs:

| Stream | Purpose |
| --- | --- |
| `std::cout` | ordinary output |
| `std::cerr` | errors, unbuffered |
| `std::clog` | log messages, buffered |

Many terminals render `cerr` in red, which is exactly the value of expressing intent through different streams. For now, all three reach the terminal.

The arrow direction is worth noticing: `cout`'s `<<` points left, data flows from program into the stream; `cin`'s `>>` points right, data flows from the stream into a variable.

### Input: cin

```cpp
int age {0};
std::string name;

std::cout << "Please type your name and age: " << std::endl;
std::cin >> name >> age;

std::cout << "Hello " << name << ", you are " << age << " years old" << std::endl;
```

`cin >> name >> age` shows chained input: two values read at once, separated by whitespace. `#include <string>` is required for `std::string`.

### Input with spaces: getline

`cin >>` stops at whitespace. Type `Daniel Gakwaya` and `name` receives only `Daniel`; `Gakwaya` is then handed to `age`, and the program falls apart.

`std::getline` reads up to the newline instead:

```cpp
std::string full_name;
std::cout << "Please type your full name: ";
std::getline(std::cin, full_name);
```

The two arguments are the stream to read from and the variable to store into. Afterwards `cin >> age` reads the age normally.

> **Supplement:** mixing `cin >>` and `getline` has a classic trap: `cin >>` leaves the newline in the buffer, and the following `getline` immediately reads an empty line. The usual fix is `std::cin.ignore()` first. It is not needed yet, but worth remembering.

## How a program runs

The course gives a simplified model that is enough to explain memory, pointers and function calls later.

1. The compiler turns `main.cpp` into the binary `rooster.exe` on disk.
2. At run time the operating system loads the whole binary into **RAM**.
3. The CPU starts at the first statement of `main` and executes statements one after another.
4. A variable declaration reserves space in memory and writes the initial value.
5. A function call records the **return address**, jumps to the function, runs it, and jumps back.

Example:

```cpp
int add_numbers(int a, int b) { return a + b; }

int main() {
    int a {10};
    int b {5};
    int c;
    std::cout << "Statement 1" << std::endl;
    c = add_numbers(a, b);
    std::cout << "Statement 2" << std::endl;
    return 0;
}
```

At `c = add_numbers(a, b)` the CPU saves the return address, jumps into the body, copies `10` and `5` into `a` and `b`, adds them to get `15`, hands the result back to `c`, and returns to where it left off.

Two consequences:

- The uninitialised `int c;` holds **garbage** — the space was reserved but never written.
- Function calls cost something: the jump, the parameter copies, the saved return address. The compiler may **inline** a small function, expanding it at the call site and removing the jump. Understanding the memory model is what makes such optimisations intelligible.

## Core language, standard library, STL

Three terms are routinely mixed up; the course separates them:

| Name | Meaning | Examples |
| --- | --- | --- |
| Core language | C++ syntax and fundamental types, the rules themselves | `int`, function definition rules, statements, scope |
| Standard library | Ready-made, high-quality components shipped with the compiler | `iostream`, `string`, `vector` |
| STL | The container + algorithm + iterator part of the standard library | `std::vector`, `std::sort`, iterators |

`iostream` is standard library; writing `int` uses the core language; `std::vector` and `std::sort` belong to the STL. The distinction helps when reading documentation: language questions go to the grammar reference, `setw`-style tools to the library reference.

## Chapter summary

- Comments use `//` and `/* */`; block comments do not nest.
- Problems are compile-time errors (no program), warnings (a program with a hidden risk), or run-time errors (a program that fails while running).
- Statements end with semicolons and run in order; functions have a return type, a name, parameters and a body, and must exist before use.
- `cout`/`cerr`/`clog` are three output streams, `cin` is the input stream; `getline` reads spaces.
- The program is loaded into memory and executed statement by statement; calls save a return address and therefore cost something.
- Core language, standard library and STL are three layers; do not conflate them.

## Comprehension check

**1. Both compile-time errors and warnings appear during the build. Why does the course call the former "better"?**

Reference answer: A compile-time error prevents the executable from being produced, forcing the issue to be fixed before anything runs. A warning lets the program be built and shipped with the hidden risk intact. The former failure is deterministic and localisable; the latter depends on inputs and environment and may surface much later. In engineering terms, "it does not compile" is usually safer than "it ships with warnings".

**2. Why can block comments not nest? What exactly does `/* a /* b */ c */` parse as?**

Reference answer: Comment handling is lexical: the first `*/` closes the comment, with no bracket matching. Here the comment contains only `a /* b`; the remaining ` c */` is code, where `c` is an undeclared identifier and `*/` is an invalid token, producing compile errors.

**3. What happens if `add_numbers` is defined after `main` with no declaration in between, and why?**

Reference answer: The build fails with "`add_numbers` was not declared in this scope". C++ processes a source file top to bottom; at the call inside `main` the name has not been seen, so the compiler cannot know its parameter and return types. The fix is a declaration before `main` (`int add_numbers(int, int);`) or moving the definition earlier.

**4. After `cin >> name` receives `Daniel Gakwaya`, what is in `name`, and what does the following `cin >> age` get?**

Reference answer: `name` holds only `Daniel`, because `>>` stops at whitespace. The buffer still holds ` Gakwaya\n`; `cin >> age` tries to parse `Gakwaya` as an integer, fails, and (since C++11) sets `age` to 0, with the stream left in a failed state. Reading the whole line with `std::getline(std::cin, name)` avoids the problem.

**5. Why may an uninitialised `int c;` contain "garbage", and how does the memory model explain it?**

Reference answer: Declaring `int c;` only reserves four bytes on the stack; nothing is written. That memory may have been used by another function and still holds old data, so reading it yields a meaningless value. In the conventional model, automatic local variables are not zero-initialised (only `static` and global variables are), so they must be initialised explicitly — `int c{};` or `int c = 0;`.

**6. Why does a function call have a cost, and how does the compiler reduce it?**

Reference answer: A call must save the return address, copy arguments into parameters, jump to the function, then jump back — all of which take instructions and time. The compiler can **inline** short, frequently called functions, expanding the body at the call site and removing the jump and return. The memory model in this chapter is what makes the saved "jump" visible, and therefore what makes inlining comprehensible.

## How it connects

This chapter builds the skeleton: a program made of statements and functions, exchanging data with the world through streams. Chapter 3 turns to the data itself — what a variable is, how zeros and ones are written in binary, octal and hexadecimal, and how many bytes integers and floating-point numbers occupy. Chapter 4 completes the fundamental types with booleans, characters and `auto`.
