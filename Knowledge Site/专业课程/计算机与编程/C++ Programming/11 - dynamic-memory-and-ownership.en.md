---
slug: "11-dynamic-memory-and-ownership"
title: "Dynamic Memory: Dangling Pointers, Failed Allocation, Leaks, and Dynamic Arrays"
summary: "This chapter covers the three sources of dangling pointers and the three habits that prevent them, how to handle a failed new through exceptions or std::nothrow, why deleting a null pointer is safe, the three shapes of memory leak, and new[]/delete[] with the limits that come with dynamic arrays."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, dynamic-memory, dangling-pointer, memory-leak, heap]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 11 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=39924s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter is about

This is chapter 11 of a single 31-hour video, covering **11:05:24–12:22:23**.

The previous chapter introduced `new` and `delete`; this one deals with every complication they bring. The structure is clear: first the **three kinds of dangling pointer** (pointers to addresses that are no longer valid) and the three rules that prevent them; then what to do when `new` fails; then the **three typical shapes of memory leak**; finally **dynamic arrays** — `new[]` and `delete[]` — and the two ways they differ from stack arrays.

There is almost no new syntax here. It is engineering discipline: how not to crash your program.

## Timeline

| Time | Topic |
| --- | --- |
| 11:05:24 | What a dangling pointer is |
| 11:06:32 | Case one: an uninitialised pointer |
| 11:06:54 | Case two: using a pointer after `delete` |
| 11:07:40 | Case three: several pointers to the same memory |
| 11:08:32 | Three remedies: initialise, null after delete, master pointer |
| 11:12:24 | Live coding: reproduce each case |
| 11:24:20 | Why `new` can fail: the heap is finite |
| 11:26:26 | Option one: `try`/`catch` for `std::bad_alloc` |
| 11:27:46 | Option two: `new (std::nothrow)` returns null |
| 11:37:51 | Null-pointer safety with `if (p)` |
| 11:39:28 | `delete` on a null pointer is safe |
| 11:45:27 | Leak one: the pointer is reassigned |
| 11:46:52 | Leak two: the pointer is allocated twice |
| 11:48:03 | Leak three: the pointer dies with its scope |
| 11:55:39 | Dynamic arrays: `new double[n]` |
| 11:57:28 | Initialising a dynamic array |
| 11:59:04 | No `std::size` and no range-based for |
| 12:00:21 | Live coding: allocate, walk, `delete[]` |

## Three kinds of dangling pointer

A dangling pointer refers to an address that is no longer valid. The course lists three sources.

### Case one: uninitialised

```cpp
int* p_number5;      // holds a garbage address
*p_number5 = 55;     // undefined behaviour
```

The pointer was never assigned, so it holds whatever bytes were left on the stack. That address may belong to another variable, another program, or the operating system.

### Case two: used after `delete`

```cpp
int* p_number1 {new int {67}};
delete p_number1;
*p_number1 = 55;     // undefined: the memory has been returned
```

`delete` returns the memory but **does not clear the pointer**. The pointer still holds the old address, which no longer belongs to you.

There is a counter-intuitive effect: the program **sometimes** appears to work and prints 67, because nothing has reused that memory yet. That is not a guarantee — the lecture runs it several times with unstable results. **"It didn't crash this time" is not evidence of correctness.**

### Case three: several pointers to one allocation

```cpp
int* p_number3 {new int {83}};
int* p_number4 {p_number3};   // both point at the same address

delete p_number3;             // memory returned
std::cout << *p_number4;      // reads freed memory
```

Both pointers refer to the same heap block. Once one of them deletes it, the other becomes dangling immediately.

## Three remedies

### Remedy one: initialise at declaration

```cpp
int* p_number5 {};                 // null pointer
int* p_number6 {new int {82}};     // or allocate straight away
```

If you do not yet know what a pointer should refer to, give it `nullptr` and test before use:

```cpp
if (p_number6) {
    std::cout << *p_number6 << std::endl;
} else {
    std::cout << "Invalid address" << std::endl;
}
```

### Remedy two: null the pointer right after `delete`

```cpp
delete p_number7;
p_number7 = nullptr;
```

Now any later `if (p)` sees it as invalid instead of silently reading memory that has changed hands.

### Remedy three: a master pointer

When several pointers share one allocation, designate a **master** that owns the `delete`; the others are **slaves** that may read but never free. Check against the master before use:

```cpp
int* master {new int {382}};
int* slave {master};

if (master) {
    std::cout << *slave << std::endl;
}

delete master;
master = nullptr;

if (!master) {
    std::cout << "Memory already released" << std::endl;
}
```

The rule underneath is **single ownership**: one allocation, one owner.

## When `new` fails

The heap is finite. Asking for an enormous block, or calling `new` in a loop without releasing, eventually fails. By default `new` throws `std::bad_alloc`, and an uncaught exception terminates the program.

### Option one: exceptions

```cpp
try {
    int* data {new int[100000000]};
    // use data
    delete[] data;
} catch (const std::exception& ex) {
    std::cout << "Something went wrong: " << ex.what() << std::endl;
}
```

On failure control jumps to `catch` and the program keeps running. `ex.what()` returns a description, usually `std::bad_alloc`.

### Option two: `std::nothrow`

```cpp
#include <new>

int* data {new (std::nothrow) int[100000000]};
if (data) {
    // allocation succeeded
    delete[] data;
} else {
    std::cout << "Allocation failed" << std::endl;
}
```

`std::nothrow` makes `new` return `nullptr` instead of throwing, which suits code that does not use exceptions.

The lecture notes that failure is rare in practice, so a lot of code never checks. Long-running server programs, however, need to handle it: one failure would otherwise take the whole process down.

## Null-pointer safety

The principle is one sentence: **before using a pointer, confirm it holds a valid address.**

```cpp
int* p_number {};
if (p_number) {
    std::cout << *p_number << std::endl;
} else {
    std::cout << "Invalid address" << std::endl;
}
```

`if (p_number)` is equivalent to `if (p_number != nullptr)`: a pointer converts implicitly to `bool`, false for null and true otherwise. The short form is more common; both are fine.

One place where the check is overused is `delete`:

```cpp
int* p_number1 {};
delete p_number1;        // perfectly safe, does nothing
```

**Deleting a null pointer is legal**; the standard specifies that it does nothing. So this is unnecessary:

```cpp
if (p_number1) {         // redundant
    delete p_number1;
}
```

This matters because it makes "free, then null" natural: even if a code path reaches `delete` twice, an already-null pointer is harmless.

## Memory leaks

A leak means **the pointer to a heap allocation is lost**: the memory is still charged to this program, but the program can no longer reach it or return it.

### Case one: the pointer is reassigned

```cpp
int* p_number {new int {67}};
int number {55};
p_number = &number;      // the heap block loses its only pointer
```

Nothing points at that block any more, so no `delete` can reach it.

### Case two: allocated twice

```cpp
int* p_number1 {new int {55}};
p_number1 = new int {44};   // the first block leaks
delete p_number1;           // only the second is freed
```

### Case three: the pointer dies with its scope

```cpp
{
    int* p_number2 {new int {57}};
    // the scope ends, p_number2 is destroyed, the heap block is not
}
```

The local pointer lives on the stack and disappears at the closing brace; the heap block does not follow. Nothing can reach it and nothing can free it.

The lecture stresses the long-term effect: a server may run for months, leaks accumulate, the heap is exhausted, and later `new` calls fail or the process is killed.

## Dynamic arrays

A stack array's size must be a compile-time constant (or at least `const`); a dynamic array allows the size to be decided at run time:

```cpp
size_t size {10};

double* p_salaries {new double[size]};              // uninitialised
int* p_students {new (std::nothrow) int[size] {}};  // all zero
int* p_scores {new (std::nothrow) int[size] {1, 2, 3, 4, 5}};  // first five set, rest zero
```

The three forms differ only in initialisation: no braces means garbage, `{}` means all zero, and a partial list zero-fills the rest — exactly the rules for stack arrays.

### Access and release

```cpp
for (size_t i {0}; i < size; ++i) {
    std::cout << p_scores[i] << std::endl;      // subscript
    // or *(p_scores + i)                      // pointer arithmetic
}

delete[] p_salaries;
p_salaries = nullptr;
delete[] p_students;
p_students = nullptr;
delete[] p_scores;
p_scores = nullptr;
```

Arrays require **`delete[]`**, not `delete`. Mixing them is undefined behaviour.

### Two key limitations

```cpp
std::cout << std::size(p_scores);        // compile error
for (auto s : p_scores) { /* ... */ }    // compile error
```

The reason: the type of `p_scores` is `int*`. **It has decayed to a pointer** and is no longer an array object. `std::size` needs the array type to compute the element count, and range-based `for` needs an array or a container with `begin()`/`end()`. A pointer carries no length information, so both fail.

The fix is to keep the length yourself:

```cpp
size_t count {10};
int* p_scores {new int[count] {1, 2, 3, 4, 5}};
for (size_t i {0}; i < count; ++i) {
    std::cout << p_scores[i] << std::endl;
}
```

By contrast, the stack array `int scores[10]` is still an array object, so `std::size` and range-based `for` work there.

> **One-line summary:** pointers go invalid in three ways, answered by initialise, null-after-delete, and single ownership; `new` can fail, handled by exceptions or `nothrow`; leaks come from losing the pointer; dynamic arrays need `new[]`/`delete[]` and a length you remember yourself.

## Chapter takeaways

- Dangling pointers come from three sources: uninitialised, used after `delete`, shared between pointers.
- The three remedies: initialise at declaration, null after `delete`, one master pointer that frees.
- A failed `new` throws `std::bad_alloc` by default; `new (std::nothrow)` returns null instead.
- Check `if (p)` before use; `delete` on a null pointer is safe and needs no guard.
- Leaks arise from a reassigned pointer, a second allocation, or a pointer dying with its scope.
- Dynamic arrays use `new T[n]` and `delete[]`, and their size may be decided at run time.
- A dynamic array decays to a pointer, so `std::size` and range-based `for` do not apply; store the length separately.

## Comprehension check

**1. What are the three sources of dangling pointers? Give a minimal reproduction of each.**

Reference answer: First, an uninitialised pointer: `int* p; *p = 55;`, where `p` holds a garbage address. Second, using a pointer after `delete`: `int* p {new int{67}}; delete p; *p = 55;`, where the memory is returned but the pointer is not nulled. Third, several pointers to one allocation: `int* a {new int{83}}; int* b {a}; delete a; std::cout << *b;`, where `b` is invalidated by the master's release.

**2. Why does using a freed pointer sometimes appear to work? Does that mean the code is correct?**

Reference answer: `delete` returns the memory to the allocator without wiping its contents or clearing the pointer. If the block has not been reused, the old value is still there and the program seems fine. This is still undefined behaviour: the memory may be reused at any moment, so garbage, corruption or a crash can occur, and runs may differ. "It didn't crash this time" is not evidence of correctness.

**3. How do `try`/`catch` and `new (std::nothrow)` differ when allocation fails, and when would you use each?**

Reference answer: A default `new` throws `std::bad_alloc`, and an uncaught exception terminates the program; wrapping it in `try`/`catch` lets the program report the problem and continue, which suits projects already using exceptions. `new (std::nothrow)` asks `new` not to throw and to return `nullptr` on failure, which the caller tests with `if (data)`; it suits code that avoids exceptions or handles the failure locally. Both prevent a single failed allocation from bringing the whole process down.

**4. What happens when you `delete` a null pointer, and how does that affect the way you write cleanup code?**

Reference answer: Deleting a null pointer is legal; the standard says it does nothing and it will not crash. So no `if (p)` guard is needed before `delete`. The biggest benefit is for "free then null" cleanup: if a code path reaches `delete` twice and the pointer was nulled the first time, the repeat is harmless. That removes branches and simplifies teardown logic.

**5. What are the three typical memory-leak scenarios, and why is the last one the subtlest?**

Reference answer: One, the pointer is reassigned so the block loses its only entry point. Two, the same pointer is allocated again, orphaning the previous block. Three, a local pointer is destroyed at the end of its scope while the heap block it referenced is not. The third is subtlest because no overwrite or second allocation is visible in the code — the leak happens at a scope boundary, and the local pointer itself is destroyed normally on the stack, so nothing looks wrong.

**6. Why can't a dynamic array be used with `std::size` or range-based `for`, and what replaces them?**

Reference answer: `new T[n]` yields a `T*`, which is a pointer type rather than an array object. `std::size` needs the array type to deduce the element count, and range-based `for` needs an array or a container exposing `begin()`/`end()`; a pointer satisfies neither, so compilation fails. The replacement is to keep the length in a variable and use an ordinary `for` with subscripts or pointer arithmetic. A stack array `int a[10]` is still an array object, so both forms work there.

**7. Why must a dynamic array be released with `delete[]` rather than `delete`?**

Reference answer: `new T[n]` allocates an array, and the allocator must also record the element count so it can destroy each element and release the whole block. `delete[]` handles it as an array: it destroys every element and frees the block. `delete` treats it as a single object and is undefined behaviour here — it may free only part of the block or corrupt the allocator's bookkeeping. The rule is `new` with `delete`, `new[]` with `delete[]`.

## How this connects to the neighbouring chapters

This chapter pushes the `new`/`delete` of chapter 10 to its edges: failure, dangling, leaks, arrays. Chapter 12 introduces references — pointers that cannot be null and cannot be reseated — which avoid half of these problems. Later, classes in chapter 18 bring constructors and destructors that pair allocation with release automatically, which is the final home for the manual discipline taught here.
