---
slug: "12-references"
title: "References: Aliases That Cannot Be Null, and How They Differ from Pointers"
summary: "This chapter compares references and pointers point by point: a reference must be initialised, cannot be rebound, and needs no dereference; then it covers what const references restrict, and how a pointer-to-const that is itself const reproduces reference behaviour."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, references, pointers, const]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 12 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=44543s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter is about

This is chapter 12 of a single 31-hour video, covering **12:22:23–12:46:10**.

References already appeared at the end of the last chapter: after `int& ref = data;`, writing through `ref` writes through `data`. This chapter answers "if pointers can already do that, why do references exist", and sets out the division of labour.

The answer compresses to three points: **a reference needs no dereference, cannot be rebound, and must be initialised**. Those three make it feel like another name for the original variable, and they remove half of the dangling-pointer problems from the previous chapter. The second half covers `const` references — read-only aliases, the most common form for function parameters.

## Timeline

| Time | Topic |
| --- | --- |
| 12:22:23 | Why both pointers and references exist |
| 12:23:11 | Three differences: no dereference, no rebinding, required initialisation |
| 12:24:11 | Side-by-side syntax for reading and writing |
| 12:25:44 | Assigning to a reference is not rebinding: experiment and addresses |
| 12:26:57 | A reference behaves like a const pointer |
| 12:27:35 | Live coding: both syntaxes and the rebinding experiment |
| 12:32:22 | An uninitialised reference fails to compile |
| 12:37:30 | `const` references as read-only aliases |
| 12:38:56 | Simulating a reference with `const T* const` |
| 12:39:20 | `const` applies to the reference name, not the original object |
| 12:40:05 | Live coding: const references and the write error |

## The three differences

### One: no dereference

```cpp
double double_value {12.34};
double& ref_double_value {double_value};   // reference
double* p_double_value {&double_value};    // pointer

// read
std::cout << double_value << std::endl;      // 12.34
std::cout << ref_double_value << std::endl;  // 12.34
std::cout << *p_double_value << std::endl;   // 12.34 (dereference required)

// write
ref_double_value = 20.0;      // direct
*p_double_value = 30.0;       // dereference required
```

A reference behaves like the original variable: reading, writing and taking its address all match. A pointer always forces you to distinguish "the address" from "the value at the address".

```cpp
std::cout << p_double_value << std::endl;   // prints the address
std::cout << ref_double_value << std::endl; // prints the value
```

### Two: a reference cannot be rebound

```cpp
double other_value {78.45};
ref_double_value = other_value;   // assignment, not rebinding!
```

This line does **not** make `ref_double_value` refer to `other_value`. It assigns the value of `other_value` into `double_value`. The result:

- `double_value` becomes 78.45;
- `ref_double_value` is still bound to `double_value`;
- neither address changes.

C++ has no syntax for rebinding a reference after initialisation. The only opportunity is the declaration itself, **which is also why a reference must be initialised**: a reference declared without one could never be bound to anything and would be useless. The compiler refuses outright:

```text
error: reference variable 'ref' requires an initializer
```

A pointer has no such restriction:

```cpp
double* p {&double_value};
p = &other_value;          // legal: the pointer now points elsewhere
```

### Three: a reference is like a const pointer

Side by side:

| Behaviour | Reference `T&` | Pointer `T*` |
| --- | --- | --- |
| Must be initialised at declaration | yes | no (but uninitialised is dangerous) |
| Can be rebound | no | yes |
| Needs `*` to use | no | yes |
| Can be null | no | yes (`nullptr`) |

"Cannot be rebound" is exactly the property of `T* const`, so a reference is often described as a const pointer that dereferences itself.

## `const` references

```cpp
int age {27};
int& ref_age {age};              // writable reference
const int& cref_age {age};       // read-only reference

ref_age++;                        // legal, age becomes 28
cref_age++;                       // compile error
```

A `const` reference promises that **this name cannot modify the object**. It does not require the object itself to be `const`:

```cpp
const int& cref_age {age};   // age is not const
age = 30;                    // legal, modify the original directly
// cref_age now reads 30
```

So `const` restricts whether the alias may write, not whether the object may change. This matters for function parameters: `const T&` means "I will read you but not modify you", so callers need not worry about side effects and nothing is copied.

### Simulating a reference with a pointer

A reference behaves like a pointer to const that is itself const:

```cpp
const int* const p_age {&age};
```

The two `const`s restrict two different things:

- the left `const` forbids writing through `*p_age`;
- the right `const` forbids making `p_age` point elsewhere.

Both `*p_age = 30;` and `p_age = &other;` fail to compile, matching `const int&`. This shows that a reference is not a new mechanism: it packages those two restrictions into a simpler syntax.

Incidentally, `const int& const` is illegal — a reference has no top-level const to add, because it can never be reseated in the first place.

## Which one to use

- **Function parameters**: `const T&` for read-only, `T&` when the callee must modify the argument. No copy, clear semantics.
- **When "no object" must be expressible**: use a pointer and `nullptr`. A reference cannot be empty.
- **When the target must change**: use a pointer.
- **Arrays and dynamic memory**: pointers are the natural tool.

In one sentence: **prefer references, and fall back to pointers only when you need nullability or rebinding.**

> **One-line summary:** a reference is an alias that must be initialised, cannot be rebound and needs no dereference; assigning to it changes the value, not the binding; `const T&` only forbids writing through the alias, regardless of whether the object itself is const.

## Chapter takeaways

- A reference is another name for an existing object; it must be initialised and cannot be rebound.
- Reading and writing a reference needs no `*`; the syntax matches the original variable.
- Assigning to a reference changes the referenced object's value, not the binding.
- A pointer can be rebound and can be null, but you must separate the address from the value.
- `const T&` forbids modification through the reference without requiring the object to be `const`.
- A reference is equivalent to `const T* const`; `const T& const` does not exist.

## Comprehension check

**1. What are the three main differences between references and pointers?**

Reference answer: First, using a reference needs no dereference operator — read and write look like the original variable — while a pointer needs `*` to reach the value and `&` to take an address. Second, once initialised a reference cannot be rebound to another object, whereas a pointer can be reassigned to point elsewhere. Third, a reference must be initialised at declaration or compilation fails, while a pointer may be declared and assigned later (though an uninitialised pointer is dangerous).

**2. What happens when you execute `ref = other;`, and why is it not a rebinding?**

Reference answer: It assigns the value of `other` into the object `ref` refers to, equivalent to `original = other;`. `ref` stays bound to `original`, and neither address changes. A C++ reference fixes its binding at initialisation and has no syntax to change it afterwards — the declaration is the only opportunity. Printing `&original` and `&ref` before and after the assignment shows identical addresses.

**3. Why must a reference be initialised at declaration?**

Reference answer: Initialisation is the only chance to bind a reference to an object. If a reference were allowed to exist uninitialised, it could never be bound later and every use would be meaningless, so the compiler rejects it. A pointer differs: it can start as null and be assigned afterwards, so initialisation is not mandatory (though it remains good practice).

**4. Is `const int& cref = age;` legal when `age` is not `const`? Can `age` still be modified directly?**

Reference answer: It is legal. The `const` applies to the reference, restricting writes through the name `cref`; it does not require the referenced object to be `const`. `age` can still be assigned directly, for example `age = 30;`, and `cref` then reads 30. The accurate meaning of `const T&` is "read-only alias", not "read-only object".

**5. In `const int* const p = &age;`, what does each `const` restrict, and why does it simulate a reference?**

Reference answer: The left `const` qualifies `int`, forbidding modification of `age` through `*p`; the right `const` qualifies the pointer, forbidding `p` from pointing elsewhere. Together they match the two properties of a reference: no writing through the alias and no rebinding. Add automatic dereferencing and `const T&` behaves exactly like `const T* const`.

**6. Should a function parameter be `T`, `T&`, or `const T&`?**

Reference answer: Use `T&` when the function must modify the caller's object; use `const T&` when it only reads and the object is large enough that copying is wasteful; use plain `T` for small read-only values such as `int`, `double` or a pointer, where copying costs less than indirection. When "there may be no object" must be expressible, use `T*`, because a reference cannot be null.

## How this connects to the neighbouring chapters

References remove a large part of the danger from the previous chapter: no null means no null dereference, and no rebinding means no pointer left aimed at an object that has gone. Chapter 13 turns to text, covering the memory layout and operations of C strings before introducing `std::string`. Passing by `const T&` becomes the default in chapter 15's function parameters and a basic tool for avoiding copies in chapter 18's class methods.
