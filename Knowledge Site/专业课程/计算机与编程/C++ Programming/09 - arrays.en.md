---
slug: "09-arrays"
title: "Arrays: Contiguous Memory, Zero Indexing, and C Strings"
summary: "This chapter covers declaring and initialising arrays, why indexing starts at zero, the garbage in uninitialised elements and the danger of running past the end, plus std::size and the sizeof trick, range-based loops, and why character arrays need a terminating null before they can be printed."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, arrays, c-strings, memory, range-based-for]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 9 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=31707s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter is about

This is chapter 9 of a single 31-hour video, covering **08:48:27–09:55:39**.

The previous chapter gave us loops; this one introduces the first collection type: the array. It groups many variables of the same type into one contiguous block of memory, managed under a single name and accessed by index.

The difficulty is not the syntax but three traps: **indexing starts at zero**, **uninitialised elements hold garbage**, and **the compiler will not stop you from going out of bounds**. The lecturer spends a lot of time on the third, because its consequences range from wrong answers to a crash that can disturb other programs.

## Timeline

| Time | Topic |
| --- | --- |
| 08:48:52 | Declaring an array: type, name, size in `[]` |
| 08:51:38 | Zero indexing, bounds, and garbage before initialisation |
| 08:53:03 | Reading and writing elements with loops |
| 08:55:07 | Brace initialisation; missing elements become zero |
| 08:56:21 | Omitting the size and letting the compiler deduce it |
| 08:57:01 | `const` arrays; summing elements |
| 08:59:02 | Live coding: reading, writing, and the initialisation forms |
| 09:16:05 | `std::size`: querying the element count at run time since C++17 |
| 09:17:24 | The pre-C++17 formula: `sizeof(arr)/sizeof(arr[0])` |
| 09:24:43 | Range-based for: no index, no size |
| 09:27:01 | Character arrays and the null character `'\0'` |
| 09:29:24 | Reserving space makes the compiler supply `'\0'` |
| 09:38:00 | Three ways to build a C string, and string literals |
| 09:45:24 | Why only character arrays can be printed directly |
| 09:46:32 | Out-of-bounds access: compiles, undefined at run time |
| 09:51:28 | Writing far out of bounds crashes the program |

## Declaring, indexing, and bounds

A declaration supplies the element type, the name, and the size:

```cpp
int scores[10];          // ten ints, 40 bytes
```

After this line there is a contiguous block of memory, logically called `scores`. Elements are reached by index:

```cpp
std::cout << scores[0] << std::endl;   // first element
std::cout << scores[9] << std::endl;   // last element
```

### Indexing starts at zero

For an array of size 10 the valid indices are **0 through 9**, not 1 through 10. The lecturer repeats this because almost every beginner miscounts once.

The reason is address arithmetic: the address of `scores[i]` is the base address plus `i * sizeof(int)`. The first element sits at offset zero, so its index is zero. This is not an arbitrary rule but a direct consequence of contiguous layout.

### Uninitialised elements hold garbage

`int scores[10];` only reserves space; nothing is written. Reading `scores[0]` therefore returns whatever bytes happened to be there — possibly 0, possibly any value, and it may differ between runs. Such a value cannot be used for any decision.

### Out-of-bounds access does not raise an error

```cpp
std::cout << scores[12] << std::endl;   // compiles
```

The compiler does not check the index. `scores[12]` lies past the end of the array and reads someone else's memory: possibly another variable of this program, possibly another program's data, possibly an area the operating system reserves. The consequences, in increasing severity:

- it reads garbage and the program keeps running with a wrong result;
- it reads protected memory and the program crashes immediately;
- it writes out of bounds, corrupting other programs' data or this program's own variables.

In the demo a huge index is written, the program crashes on the spot, and the following `std::cout` never executes. **Array bounds are a responsibility C++ hands to the programmer.**

## Reading, writing, and initialising

### Reading and writing with loops

```cpp
const size_t COUNT {10};
int scores[COUNT];

for (size_t i {0}; i < COUNT; ++i) {
    scores[i] = static_cast<int>(i) * 10;   // 0, 10, 20, ...
}

for (size_t i {0}; i < COUNT; ++i) {
    std::cout << scores[i] << std::endl;
}
```

Using the loop iterator as the index is one of the most common patterns in C++.

### Brace initialisation

Values can be supplied at declaration:

```cpp
double salaries[5] {12.7, 7.5, 13.2, 8.1, 9.3};
```

The number of values must match the size; too many gives `too many initializer values`.

When only some values are given, **the rest are initialised to zero**:

```cpp
int families[5] {12, 7, 5};   // elements are 12, 7, 5, 0, 0
```

This differs completely from no initialisation at all: the former gives certain zeros, the latter gives garbage.

Omitting the size lets the compiler deduce it from the initialisers:

```cpp
int class_sizes[] {10, 12, 15, 11, 18, 17};   // size 6
```

But omitting both the size and the initialiser list leaves nothing to deduce, and compilation fails.

### `const` arrays

```cpp
const int birds[] {10, 12, 15, 11, 18, 17};
birds[2] = 8;   // error
```

`const` on the array makes every element read-only, which suits configuration tables or fixed sequences.

### Operating on elements

```cpp
int scores[] {2, 5, 8, 2, 5, 3, 6, 9};
int sum {0};
for (int score : scores) {
    sum += score;
}
std::cout << "Score sum : " << sum << std::endl;   // 42
```

Arrays do not support whole-array arithmetic; elements must be processed one by one.

## Getting the length: `std::size` and `sizeof`

Hard-coding the length is the same bad practice criticised in the previous chapter. C++17 offers a run-time query:

```cpp
#include <iterator>

int scores[] {1, 2, 3, 4, 5, 6, 7, 8};
const size_t count {std::size(scores)};
for (size_t i {0}; i < count; ++i) {
    std::cout << scores[i] << std::endl;
}
```

`std::size` returns the element count, so adding or removing initialisers needs no change to the loop.

Before C++17 the standard trick divided two `sizeof` results:

```cpp
const size_t count {sizeof(scores) / sizeof(scores[0])};
```

The whole array's byte count divided by one element's byte count gives the element count. The lecture prints both: for eight `int`s, `sizeof(scores)` is 32 and `sizeof(scores[0])` is 4, so the quotient is 8.

This only works on a **real array object**. Once an array decays to a pointer — for example when passed to a function — `sizeof` measures the pointer, and the result is wrong. Later chapters return to this trap.

### Range-based for

When only the values matter, a range-based loop is simplest:

```cpp
for (int value : scores) {
    std::cout << value << std::endl;
}
```

It walks every element without a size, iterator, or advance. The cost is losing the index; when the index is needed, go back to a traditional `for`.

## Character arrays and C strings

A character array can be declared element by element like any other:

```cpp
char message[5] {'H', 'e', 'l', 'l', 'o'};
for (auto c : message) {
    std::cout << c;
}
std::cout << std::endl;
```

This prints `Hello`. But character arrays have a special property: they can be printed whole.

```cpp
std::cout << message << std::endl;   // may print Hello plus junk
```

`std::cout` does not treat a `char*` as an array but as a **null-terminated string**: it prints byte after byte from the first address until it meets `'\0'`. The array above has five characters and no `'\0'`, so printing runs past the end until it happens to find a zero.

### Three correct constructions

**Option 1: add the null by hand**

```cpp
char message1[] {'H', 'e', 'l', 'l', 'o', '\0'};
```

The compiler deduces a size of 6.

**Option 2: reserve space and let the compiler fill it**

```cpp
char message2[6] {'H', 'e', 'l', 'l', 'o'};
```

Size 6, five values given, so the remaining slot is value-initialised to 0 — exactly the null character. Its size is 6.

**Option 3: a string literal (recommended)**

```cpp
char message4[] {"Hello"};   // size 6
```

The double quotes tell the compiler to split the text into characters, store them, and append `'\0'`. Spaces are allowed:

```cpp
char message[] {"Hello world, how are you doing"};
```

This is the form the course recommends and the closest to how one naturally writes text.

### The failure case

```cpp
char message3[] {'H', 'e', 'l', 'l', 'o'};   // size 5, no '\0'
```

`message3` is a valid array but **not a valid C string**. `std::cout << message3` prints `Hello` and then keeps reading past the array, producing junk. The only difference is the missing `'\0'`.

The conclusion: **when a `char` array carries text, its last character must be null, and a double-quoted literal is the easiest way to guarantee that.**

### Why only character arrays print whole

```cpp
int numbers[] {1, 2, 3, 4, 5};
std::cout << numbers << std::endl;   // prints an address, not the numbers
```

`numbers` decays to a pointer to its first element, and `std::cout` prints an address for a non-character pointer. The full explanation arrives with pointers in chapter 10; for now remember that **only `char*` receives string treatment.**

> **One-line summary:** an array is contiguous memory plus a name; indices start at zero and you guard the bounds yourself; a character array prints as a whole only because `std::cout` keeps looking for that `'\0'`.

## Chapter takeaways

- `int scores[10];` reserves ten contiguous `int`s; valid indices are 0 through 9.
- Uninitialised elements are garbage; a partial initialiser list zero-fills the rest.
- Omitting the size deduces it from the initialisers; omitting both is an error.
- `const` arrays are read-only element by element.
- `std::size(arr)` (C++17) gives the count; the older form is `sizeof(arr)/sizeof(arr[0])`.
- Range-based `for` suits value-only traversal; traditional `for` is needed for indices.
- A character array must end in `'\0'` to print as text; string literals do this automatically.
- Out-of-bounds access compiles and is undefined at run time — it may crash or corrupt data.

## Comprehension check

**1. Why is the last valid index of an array of size 10 equal to 9 rather than 10?**

Reference answer: Elements sit contiguously, so the address of `scores[i]` is the base address plus `i * sizeof(int)`. The first element is at offset zero, hence index 0; the tenth element is at offset `9 * sizeof(int)`, hence index 9. The valid range is 0 through 9, ten values in total. Accessing `scores[10]` is already past the end and reads the memory that follows the array.

**2. After `int scores[10];`, what does `scores[0]` contain, and why?**

Reference answer: An indeterminate garbage value. The declaration only reserves memory and writes nothing; the bytes left there come from previous use, so the content depends on the environment, may be zero or any integer, and may differ between runs. To get a definite value it must be initialised explicitly, for example `int scores[10] {};` to zero everything.

**3. In `int families[5] {12, 7, 5};`, what are the values at indices 3 and 4? How does this differ from no initialisation at all?**

Reference answer: Both are 0. With a braced initialiser list, elements not listed are value-initialised, which for integral types means zero. With `int families[5];` and no list, every element is garbage rather than zero. The presence of the initialiser list is what turns the missing slots into definite zeros.

**4. What happens when the size is omitted but initial values are given? When does compilation fail?**

Reference answer: The compiler deduces the size from the number of initialisers. `int class_sizes[] {10, 12, 15, 11, 18, 17};` yields an array of size 6, and adding or removing values updates the size automatically. If the size is omitted and there is no initialiser list, as in `int class_sizes[];`, there is nothing to deduce and compilation fails.

**5. What is the `sizeof` formula for the element count, and why is it unreliable for an array passed to a function?**

Reference answer: The formula is `sizeof(arr) / sizeof(arr[0])`, total bytes divided by the bytes of one element. It is valid only for an actual array object. When an array is passed as a function argument it decays to a pointer to its first element, so the parameter has type `int*`; then `sizeof(arr)` measures the pointer itself (8 bytes here), not the array, and the quotient is wrong. Functions should take the length as an extra parameter or use containers that carry their size, such as `std::array` or `std::vector`.

**6. Why can `char message[5] {'H','e','l','l','o'};` print junk with `std::cout << message`, while `char message[] {"Hello"};` does not?**

Reference answer: `std::cout` treats a `char*` as a C string and prints byte after byte until it finds `'\0'`. The first array holds five characters and no null, so printing runs past the end into following memory until it happens to meet a zero, which shows up as junk. The second is initialised from a double-quoted literal, so the compiler appends `'\0'` and the array has size 6; printing stops correctly after `o`. The difference is exactly that terminating null.

## How this connects to the neighbouring chapters

This chapter puts loops to real use and makes "memory is contiguous" concrete for the first time. Chapter 10 on pointers explains why `std::cout << numbers` prints an address, why an array name decays to a pointer, and how to walk an array with a pointer. Later, `std::string` in chapter 13 replaces the character arrays here, and dynamic arrays in chapter 11 solve the case where the length is only known at run time.
