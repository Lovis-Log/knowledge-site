---
slug: "10-pointers"
title: "Pointers, Character Pointers, and the Program Memory Model"
summary: "This chapter explains what a pointer stores, address-of and dereference, why every pointer has the same size, and why cross-type assignment is rejected; then character pointers and the read-only nature of string literals, followed by virtual memory, the stack/heap split, and the first use of new and delete."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, pointers, memory-model, heap, c-strings]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 10 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=35739s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter is about

This is chapter 10 of a single 31-hour video, covering **09:55:39–11:05:24**.

The previous chapter ended on a loose thread: `std::cout << numbers` printed an address rather than the array contents. This chapter turns "an address" into something you can manipulate directly.

It has three layers: **pointers themselves** — declaration, address-of, dereference, type constraints; then the special case of **character pointers** and their relation to string literals; finally the **program's memory model** — virtual memory, the division between stack and heap, and the first appearance of `new` and `delete`. The first two layers are syntax; the third is the foundation for everything about dynamic memory, references, and object lifetimes.

## Timeline

| Time | Topic |
| --- | --- |
| 09:56:08 | Declaring a pointer with `*`; a pointer stores only addresses of its own type |
| 09:57:22 | The null pointer `nullptr`; never dereference it |
| 09:57:51 | Every pointer has the same size on a given machine |
| 09:58:42 | Position of `*`, and the comma-declaration trap |
| 10:00:06 | Address-of `&`, assignment, printing an address |
| 10:01:44 | A `double*` cannot be assigned to an `int*` |
| 10:02:23 | Live coding: declarations, sizes, the comma experiment |
| 10:12:20 | Dereferencing `*p` to read through an address |
| 10:14:34 | Character pointers and string literals |
| 10:18:12 | `*p` prints one character, `p` prints the whole string |
| 10:20:10 | Use a character array when the text must be modifiable |
| 10:27:31 | Virtual memory and the MMU |
| 10:34:29 | Layout: text, data, stack, heap |
| 10:38:58 | Writing through an uninitialised or null pointer is undefined |
| 10:41:33 | `new` allocates on the heap, `delete` returns it |
| 10:45:35 | Deleting twice crashes |
| 10:49:00 | Live coding: heap memory and three kinds of mistake |

## Pointers: variables that hold addresses

```cpp
int* p_number {};            // null pointer, same as int* p_number {nullptr};
double* p_fractional {};
```

`int*` reads as "pointer to int". It does not hold an integer; it holds the address in memory of some `int` variable.

### The null pointer

`{}` or `nullptr` means "points at no valid object". Its purpose is to give the pointer a known initial state instead of a random address. **Never dereference a null pointer** — that is accessing an address that is explicitly invalid.

### Every pointer has the same size

```cpp
std::cout << "sizeof(int*) : " << sizeof(int*) << std::endl;
std::cout << "sizeof(double*) : " << sizeof(double*) << std::endl;
```

Both are 8 bytes here. They store memory addresses, and an address has a fixed width on a given machine (64 bits on a 64-bit system). The pointee type only decides how the compiler interprets the memory behind the address; it does not change the size of the pointer itself.

### Position of `*`, and the comma trap

```cpp
int* p_a;     // the lecturer's preference
int *p_b;     // also fine
int * p_c;    // also fine
```

All three are legal; whitespace around `*` does not change the meaning. But this form is a trap:

```cpp
int* p_number5, other_int;   // other_int is a plain int, not a pointer!
```

`*` applies only to the declarator that follows it. `other_int` has type `int`. The lecture verifies this with `sizeof`: `sizeof(p_number5)` is 8 while `sizeof(other_int)` is 4. The conclusion is to **declare one variable per line**, especially pointers.

### Address-of and dereference

```cpp
int int_var {43};
int* p_int {&int_var};          // & takes the address

std::cout << "int_var : " << int_var << std::endl;        // 43
std::cout << "p_int    : " << p_int << std::endl;          // a hex address
std::cout << "*p_int   : " << *p_int << std::endl;         // 43
```

- `&x` yields the address of `x`, with type `int*`.
- `*p` follows the pointer to the value at that address; this is **dereferencing**.

A pointer can be reassigned to another variable of the same type:

```cpp
int int_var1 {65};
p_int = &int_var1;      // now points at int_var1
```

### Types must match

```cpp
int* p_int1 {};
double double_var {33.0};
p_int1 = &double_var;   // compile error
```

The compiler reports something like "cannot convert `double*` to `int*`". Dereferencing interprets memory according to the type: an `int*` reads 4 bytes as an integer, while a `double` occupies 8 bytes with a different encoding. Allowing the assignment would make `*p` produce nonsense, so the type system forbids it. An explicit cast exists, but that is a different conversation.

## Character pointers and string literals

A character pointer is declared and used like any other:

```cpp
char char_var {'A'};
char* p_char {&char_var};
std::cout << *p_char << std::endl;   // A
```

What is special is that it can be initialised from a string literal:

```cpp
const char* p_message {"Hello world"};
```

The compiler expands the literal into a character array with a trailing `'\0'`, and `p_message` points at its first character.

### Why `const` is required

String literals live in read-only storage, and modifying them is undefined behaviour. Modern compilers require `const char*`:

```cpp
char* p_message {"Hello world"};        // ill-formed since C++11
const char* p_message {"Hello world"};  // correct
```

The lecture tries both GCC and MSVC, and both reject the first. This is not pedantry: allowing a `char*` would let you write `p_message[0] = 'B'` on memory that cannot be written.

### Printing the pointer versus the dereference

```cpp
const char* p_message {"Hello world"};

std::cout << p_message << std::endl;    // Hello world
std::cout << *p_message << std::endl;   // H
```

`std::cout` treats a `char*` specially: it prints character by character from the first address until `'\0'`, so printing the pointer gives the whole string; `*p_message` is a single `char`, so it prints one character. This is the same behaviour as the character arrays in the previous chapter — they are the same thing.

### Use an array when you need to modify

```cpp
char message[] {"Hello world"};
message[0] = 'B';                  // legal
std::cout << message << std::endl; // Bello world
```

The array owns a writable copy; the pointer points at a read-only literal. **Read-only text uses `const char*`; modifiable text uses `char[]`.**

## The program's memory model

![Figure](/images/cpp-memory-layout-rich-en.svg)

*Figure：Which segment each declaration lands in, and what a stack frame holds。*

### Virtual memory

The memory a running program sees is not physical RAM but a **virtual address space** defined by the operating system. On a 64-bit system every process believes it owns the range $0$ to $2^{64}$.

The reason is isolation: if every program used physical memory directly, a few hundred processes would exhaust it, and one process could freely read or write another's data. Virtual memory lets each process believe it owns the whole space, while the operating system allocates physical pages on demand.

### The role of the MMU

Addresses in the program are translated to physical addresses by the CPU's **memory management unit (MMU)**. The whole program is not loaded at once; only the parts needed soon stay in RAM, and the rest waits on disk and is paged in when required. The operating system and hardware handle this, so C++ code does not manage it manually — but it is worth knowing that the addresses you see are not physical.

### Memory layout

A process's address space is roughly divided as follows:

| Region | Contents | Lifetime |
| --- | --- | --- |
| text | machine code | the whole process |
| data | globals and statics | the whole process |
| stack | locals and call frames | determined by scope |
| heap | memory from `new` | determined by the programmer |

The course focuses on stack and heap, because those decide when variables live and die.

### Stack versus heap

```cpp
{
    int local_var {23};      // on the stack, destroyed at the closing brace
}
// local_var no longer exists
```

Stack variables are governed by scope: created on entering the block, destroyed on leaving. The programmer can neither end them early nor extend their life.

The heap is the opposite:

```cpp
int* p_number {new int {77}};   // allocate an int on the heap
std::cout << *p_number << std::endl;
delete p_number;                 // give it back
p_number = nullptr;              // avoid a dangling pointer
```

`new int {77}` asks the operating system for enough memory for an `int`, stores 77, and returns the address. That memory belongs to this program until `delete`, even if the scope that created it has long ended. **The heap hands lifetime control to the programmer**, at the price of remembering to return the memory.

### Three forms to avoid

```cpp
int* p_number2;      // uninitialised, holds a garbage address
*p_number2 = 55;     // undefined behaviour, may crash
```

```cpp
int* p_number3 {};   // null pointer
*p_number3 = 55;     // undefined behaviour, always invalid
```

```cpp
int* p4 {new int {99}};
delete p4;
delete p4;           // double free, crash
```

The lecture runs the first two: the program is terminated by the operating system at the write, and the following `std::cout` never executes. The third crashes too, and is subtler — in a real project two pointers may refer to the same allocation, and a `delete` through each one is already a double free.

### The fixed routine for heap memory

1. Receive the address returned by `new` in a pointer.
2. Read and write through the pointer.
3. `delete` to return the memory.
4. Set the pointer to `nullptr`.

Step 4 is often skipped, but it is the cheapest protection against dangling pointers: a later misuse then hits an explicitly null pointer rather than memory that now belongs to someone else.

> **One-line summary:** a pointer holds an address and its type decides how that memory is read; a character pointer refers to a read-only literal, and printing it yields the whole string; the stack ties lifetime to scope, the heap ties it to `new`/`delete`, which must appear once each and as a pair.

## Chapter takeaways

- `int* p` holds the address of an `int`; `&x` takes an address and `*p` dereferences.
- A pointer may hold only addresses of objects of the same type; cross-type assignment fails to compile.
- Every pointer has the same size on a given machine; in `int* p, q;` the `q` is a plain `int`.
- A character pointer to a string literal must be `const char*`; `*p` is the first character, `p` prints the whole string.
- Programs see virtual memory; the MMU maps it to physical memory.
- The stack holds locals with scope-determined lifetimes; the heap is managed manually with `new` and `delete`.
- Uninitialised pointers, null dereferences, and double `delete` are undefined behaviour and usually crash.

## Comprehension check

**1. What does a pointer store, and why do `int*` and `double*` have the same size on one machine?**

Reference answer: A pointer stores a memory address — the location of an object in the virtual address space. Its size is set by the width of an address, 8 bytes on a 64-bit system, independent of the pointee type. The type only affects how dereferencing interprets the memory (how many bytes to read, integer or floating-point encoding); it does not change the size of the pointer. Hence `sizeof(int*)`, `sizeof(double*)` and `sizeof(char*)` are all equal on the same machine.

**2. Why is `int* p; *p = 55;` dangerous? What about `int* p {}; *p = 55;`?**

Reference answer: In the first case `p` is uninitialised and holds whatever address happened to be left there, possibly belonging to another program or to the operating system; writing 55 is undefined behaviour that may crash or corrupt data. In the second, `p` is a null pointer that explicitly points at nothing, so dereferencing it is also undefined behaviour and typically crashes immediately. The correct approach is to point it at a real object (`int x; int* p = &x;`) or allocate with `new` first.

**3. In `int* p_number5, other_int;`, what type is each variable? Why does the lecturer recommend one declaration per line?**

Reference answer: `p_number5` is `int*` and `other_int` is `int`. The `*` belongs only to the declarator that immediately follows it, not to the whole line. The form is easily misread as "both are pointers", and the lecture confirms with `sizeof`: 8 bytes for the first, 4 for the second. Declaring one variable per line removes the ambiguity, especially for pointers.

**4. Why can't the address of a `double` be assigned to an `int*`?**

Reference answer: Dereferencing interprets memory according to the pointer's type. An `int*` reads 4 bytes and decodes them as an integer, while a `double` occupies 8 bytes with an IEEE 754 encoding. If the assignment were allowed, `*p` would read the first half of the `double`'s bytes and produce a meaningless value, possibly reading across object boundaries. The type system rejects the implicit `double*`-to-`int*` conversion at compile time to prevent exactly this.

**5. For `const char* p {"Hello world"};`, what do `std::cout << p` and `std::cout << *p` print? Why is `const` required?**

Reference answer: `std::cout << p` prints `Hello world`, because `std::cout` treats a `char*` as a C string and emits characters from the first address until `'\0'`. `std::cout << *p` prints `H`, because `*p` is a single `char`. `const` is required because a string literal lives in read-only storage and modifying it is undefined behaviour; modern compilers (GCC and MSVC both, as the lecture shows) insist on `const char*` and reject a plain `char*`.

**6. What controls the lifetime of a stack variable versus a heap allocation, and what is the full routine for using heap memory?**

Reference answer: A stack variable's lifetime is controlled by scope: it is created on entering the block and destroyed on leaving, with no programmer control. Heap memory is controlled by the programmer: it stays valid from `new` until `delete`, regardless of the scope that created it. The routine is: receive the address from `new` in a pointer, read and write through it, `delete` to return the memory, then set the pointer to `nullptr` to avoid a dangling pointer.

**7. Why does deleting the same pointer twice crash? Why set it to null right after deleting?**

Reference answer: The first `delete` returns the memory to the operating system while the pointer still holds the old address, making it dangling. The second `delete` tries to free memory this program no longer owns, which is undefined behaviour and usually a runtime crash. Setting `p = nullptr` immediately afterwards puts the pointer into an explicitly invalid state: a later misuse at least reads as a null pointer instead of silently touching memory that has changed hands.

## How this connects to the neighbouring chapters

This chapter resolves the loose end from the previous one — an array name prints an address because it decays to a pointer to its first element. Chapter 11 continues into dynamic memory: dangling pointers, leaks, and dynamic arrays. Later, references in chapter 12 can be understood as pointers that cannot be null and cannot be reseated, and class objects in chapter 18 rely heavily on the `this` pointer and heap allocation.
