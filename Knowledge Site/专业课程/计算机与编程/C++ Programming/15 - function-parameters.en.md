---
slug: "15-function-parameters"
title: "Parameters and Return Values: By Value, Pointer, Reference, and Output Parameters"
summary: "Passing by value hands over a copy; only pointers and references can modify the caller's variable. Treating a parameter as an output channel is the usual C-style interface. Returns are copies by default, but the compiler's return-value optimization removes the copy."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "functions", "pass-by-value", "pass-by-reference", "rvo"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 15 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=56549s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

This is **chapter 15** of a 31-hour single video, covering 15:42:29–16:34:13. The previous chapter left a question open: pass by value only gives a copy, so how can a function modify the caller's variable? This chapter supplies three passing modes, one output channel, and the copy semantics of returns.

## What this chapter covers

Data flows in two directions:

- **In**: arguments to parameters. Three modes — by value, by pointer, by reference.
- **Out**: function to caller. Two mechanisms — `return`, or a parameter used as an output channel.

One thread runs through the chapter: **whether you can modify the original depends on whether you hold a copy, an address, or an alias.** The lecture reuses `say_age` and compares memory addresses to make this observable.

## Timeline

| Time | Topic |
| --- | --- |
| 15:42:29 | Pass by value: the function receives a copy |
| 15:45:11 | In VS Code: pass by value, comparing addresses inside and outside |
| 15:47:57 | Printing `age` before and after to show the original is unchanged |
| 15:50:29 | Pass by pointer: the parameter is a pointer, the call passes an address |
| 15:53:11 | In VS Code: pass by pointer |
| 15:56:09 | The missing-dereference mistake, live |
| 15:57:45 | Pass by reference: the parameter is a reference |
| 15:59:23 | In VS Code: pass by reference, identical addresses |
| 16:03:26 | Getting data out of a function: output parameters |
| 16:03:56 | Input plus output parameters (`max_str`, `max_int`, `max_double`) |
| 16:08:04 | In VS Code: input and output parameters |
| 16:14:17 | The pointer version of an output parameter |
| 16:17:48 | Getting data out through the return value |
| 16:18:57 | Local variables and the lifetime of a returned value |
| 16:21:28 | Return-value optimization removes the copy |
| 16:23:46 | In VS Code: returning from functions by value |
| 16:32:34 | Preview of the next chapter: function overloading |

## Pass by value: a copy is handed over

```cpp
void say_age(int age) {
    ++age;
    std::cout << "Hello you are " << age << " years old\n";
}

int main() {
    int age{23};
    std::cout << "before call: " << age << " at " << &age << "\n";
    say_age(age);
    std::cout << "after call:  " << age << " at " << &age << "\n";
}
```

Output:

```
before call: 23 at 0x...dec
Hello you are 24 years old
after call:  23 at 0x...dec
```

The address printed inside the function is `0x...dc0`, the one outside is `0x...dec` — two different memory locations. `++age` modifies the copy, which dies on return.

> **Why value is the default**: for small fundamental types such as `int` and `double` the copy is essentially free, and the function cannot accidentally modify the caller's data. The default is the safe choice.

## Pass by pointer: an address is handed over

```cpp
void say_age(int* age) {      // parameter is a pointer
    ++(*age);                 // must dereference to reach the original
    std::cout << "Hello you are " << *age << " years old\n";
}

int main() {
    int age{23};
    say_age(&age);            // the call passes an address
    std::cout << "after call: " << age << "\n";   // 24
}
```

The syntax has to line up in four places:

| Place | Form | Why |
| --- | --- | --- |
| Declaration | `void say_age(int* age);` | the parameter type is a pointer |
| Definition | `void say_age(int* age) { ... }` | same |
| Call | `say_age(&age);` | a pointer stores an address |
| Use | `*age` | dereference to reach the variable |

The lecture drops a dereference live (printing `age` instead of `*age`); the compiler stays silent but the output is wrong. **Forgetting the dereference is the classic bug in this style.**

## Pass by reference: an alias is handed over

```cpp
void say_age(int& age) {      // parameter is a reference
    ++age;                    // no dereference needed
    std::cout << "Hello you are " << age << " years old\n";
}

int main() {
    int age{23};
    say_age(age);             // pass the variable directly
    std::cout << "after call: " << age << "\n";   // 24
}
```

A reference is a **true alias**: `&age` inside the function equals `&age` in `main`. Compared with pointers it removes two pieces of noise — no `&` at the call, no `*` at the use.

### The three modes side by side

| Mode | Parameter | Call | Can modify original | Typical use |
| --- | --- | --- | --- | --- |
| By value | `int age` | `say_age(age)` | no | small objects, read-only input |
| By pointer | `int* age` | `say_age(&age)` | yes (`*`) | optional arguments (`nullptr`), C interfaces |
| By reference | `int& age` | `say_age(age)` | yes | output parameters, large read-only input as `const&` |

Modern C++ guidance: **prefer a reference to a pointer** when possible, because a reference cannot be null and says so in the type; use a pointer only when the argument may be absent, expressed as `nullptr`.

## Output parameters: using a parameter as an exit

C has no references, and a function returns a single value. When several results are needed, the idiom is to write the extras into parameters:

```cpp
void max_str(const std::string& input1,
             const std::string& input2,
             std::string& output) {
    if (input1 > input2) output = input1;
    else                 output = input2;
}
```

The three roles are visible at a glance:

- the first two are **`const` references**: read-only input, avoiding copies of large strings;
- the third is a **non-`const` reference**: the output channel, written inside and visible to the caller.

```cpp
std::string out;
std::string s1{"Alabama"};
std::string s2{"Bellevue"};
max_str(s1, s2, out);          // out == "Bellevue"
```

Mark the third as `const` and the assignment in the body fails to compile — **that is exactly where `const` enforces "input parameters are not modified"**.

### Pointer output parameters

The same pattern works with a pointer:

```cpp
void max_double(const double& input1,
                const double& input2,
                double* output) {
    if (input1 > input2) *output = input1;
    else                 *output = input2;
}

double out{};
max_double(45.8, 6.9, &out);   // pass an address
```

This is what many C interfaces look like: the return value reports success or failure, and the real result travels through a pointer parameter. When reading such code, **a non-`const` pointer parameter is very likely an output parameter**.

### When a return value is better

If there is only one result, `return` is the natural form:

```cpp
int sum(int a, int b) {
    int result = a + b;    // local variable
    return result;
}
```

`result` is local, destroyed when the function ends; on return its value is **copied** into the caller's variable. The lecture proves this by printing both addresses: `0x...dac` inside, `0x...de4` in `main` — genuinely two blocks of memory.

## Return-value optimization: copies by default, but the compiler intervenes

Copying is free for fundamental types; for a `std::string` it may be an allocation.

```cpp
std::string add_str(const std::string& s1, const std::string& s2) {
    std::string result = s1 + s2;
    std::cout << "inside:  " << &result << "\n";
    return result;
}

int main() {
    std::string a{"hello"}, b{"world"};
    std::string out = add_str(a, b);
    std::cout << "outside: " << &out << "\n";
}
```

The two addresses are **identical**. By the language rules `return result;` is a by-value return and should copy; but the compiler sees that `result` dies immediately and constructs the object directly in the caller's storage, skipping the copy. This is the **return-value optimization** (RVO / NRVO).

The lecture's conclusion is worth keeping:

> **Do not build code on the assumption that a return copies.** When the compiler can do better, it removes the copy. Correctness must not depend on "a deep copy happens here".

## Takeaways

- Pass by value gives a copy; changes do not reach the caller. Fine for small types.
- Pass by pointer passes an address and requires dereferencing; it can be `nullptr`, which suits optional arguments.
- Pass by reference is a true alias; no `&` or `*` at call or use, and it is the modern default.
- Mark inputs `const` (large ones `const&`); use non-`const` references or pointers for outputs so roles are obvious.
- Several results can travel through output parameters — the common shape of C-style interfaces.
- `return` copies by default, but the compiler applies return-value optimization; do not rely on the copy.

## Comprehension check

**1. In which situations can each of the three `say_age` versions modify `main`'s `age`?**

Reference answer: `void say_age(int age)` cannot, because the function holds a copy; `void say_age(int* age)` can, provided the call passes `&age` and the body writes `++(*age)`; `void say_age(int& age)` can, because the reference is an alias for the original and `++age` suffices. The difference is not whether modification is possible in principle but whether the parameter holds a copy, an address, or an alias.

**2. Why must an output parameter not be `const`, and why should input parameters be `const`?**

Reference answer: an output parameter is assigned inside the body, and a `const` reference or pointer forbids writing, so the assignment fails to compile. An input parameter is read-only; marking it `const` encodes "not modified" in the type, so any accidental write inside the function is a compile error and callers know their argument will not change. For large objects such as `std::string`, `const&` avoids a copy while keeping the guarantee.

**3. What is wrong with this function?**

```cpp
void max_of(int a, int b, int out) {
    out = (a > b) ? a : b;
}
```

Reference answer: `out` is passed by value, so the assignment modifies a copy that is destroyed on return and the caller's variable never receives the result. It should be `int& out` (or `int* out`, passing an address and dereferencing inside). The function also returns nothing, so the caller cannot even detect failure.

**4. What is the most common mistake with pointer parameters, and will the compiler catch it?**

Reference answer: forgetting to dereference — writing `++age` instead of `++(*age)` moves the pointer rather than the value it points to. This is usually legal C++ and the compiler stays silent; the behaviour is simply wrong, often showing up as bad output or a pointer walking off the array. That is one reason to prefer references: with a reference there is no dereference step to forget.

**5. Why can the addresses inside and outside `add_str` be identical? Does that contradict "return by value"?**

Reference answer: it does not contradict it. Return by value is a language-level guarantee that the caller receives an independent, usable object. When the compiler sees that the returned local is about to be destroyed, it may construct the object directly in the caller's storage, eliminating the copy. That is the return-value optimization (RVO/NRVO), permitted by the as-if rule because observable behaviour is unchanged. Code must not depend on a copy having occurred.

## Relation to neighbouring chapters

The previous chapter established that pass by value hands over a copy; this chapter fills in the alternatives — pointers, references, output parameters, and return values. The next chapter covers function overloading: one function name with several parameter lists, from which the compiler selects the best match. Understanding signatures and parameter types is the prerequisite for overload resolution.
