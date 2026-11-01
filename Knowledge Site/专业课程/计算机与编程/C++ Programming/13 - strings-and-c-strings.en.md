---
slug: "13-strings-and-c-strings"
title: "Characters and Strings: cctype, cstring, and std::string"
summary: "Classify and convert single characters as integers, manipulate null-terminated character arrays with cstring, and then meet std::string, which hides length and terminator bookkeeping inside the type."
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "strings", "cstring", "cctype", "std-string"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 13 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=45970s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

This is **chapter 13** of a 31-hour single video, covering 12:46:10–14:12:29. The original video has no chapters; this one is a section of the re-divided timeline, running from character classification through the C-string utilities and finally to `std::string`.

## What this chapter covers

C++ offers three layers for working with text, and the chapter climbs them in order:

1. **Individual characters**: `<cctype>` classifies and converts them; the functions return `int`, with nonzero meaning true.
2. **C-style strings**: null-terminated character arrays, manipulated by `strlen`, `strcmp`, `strchr`, `strcat`, and `strcpy` from `<cstring>`.
3. **`std::string`**: length, growth, and the terminator are all encapsulated, so bounds never have to be tracked by hand.

The through-line is that **each layer absorbs bookkeeping the layer below makes you do**. `strlen` counts up to `'\0'` for you; `std::string` stores the length and reallocates when needed.

## Timeline

| Time | Topic |
| --- | --- |
| 12:46:10 | `<cctype>` overview: what it offers and where the docs are |
| 12:47:23 | `std::isalnum`: letter or digit |
| 12:50:08 | `std::isalpha`: letters |
| 12:50:44 | `std::isblank`: blanks, with a counting example |
| 12:51:52 | `std::islower` / `std::isupper` |
| 12:52:49 | `std::isdigit` |
| 12:53:16 | `std::toupper` / `std::tolower` |
| 12:54:44 | In VS Code: the character-manipulation project |
| 12:59:09 | Building with MSVC to compare compilers |
| 13:00:51 | Counting blanks, and why the counter should be `size_t` |
| 13:03:25 | Counting upper- and lowercase letters |
| 13:06:38 | Case conversion demo |
| 13:08:41 | cctype wrap-up |
| 13:09:36 | `strlen`: length without `'\0'` |
| 13:11:43 | `strcmp`: lexicographic comparison |
| 13:13:38 | `strncmp`: compare only the first n characters |
| 13:14:37 | `strchr`: first occurrence, returns a pointer |
| 13:17:36 | `strrchr`: last occurrence |
| 13:19:05 | In VS Code: the C-string-manipulation project |
| 13:21:39 | `strlen` versus `sizeof` |
| 13:24:17 | Pointers can be repointed; array names cannot |
| 13:30:17 | The `strchr` loop, step by step |
| 13:36:46 | A counterexample: advancing the original pointer loops 25 times |
| 13:39:25 | Pulling a filename out of a path with `strrchr` |
| 13:42:30 | `strcat`: concatenation |
| 13:45:40 | `strncat`: concatenate only n characters |
| 13:46:37 | `strcpy`: copying |
| 13:47:36 | `strncpy`: copy only n characters |
| 13:49:08 | In VS Code: concatenation and copy |
| 14:01:10 | Why `std::string` exists |
| 14:03:34 | Declaring and initializing `std::string` six ways |
| 14:06:23 | In VS Code: declaring `std::string` |
| 14:10:51 | Automatic growth and memory release |

## Character classification: `<cctype>`

Functions in `<cctype>` take a character and return an `int`: **nonzero is true, zero is false**. Do not assume the true value is exactly `1`; the standard only promises nonzero.

```cpp
#include <iostream>
#include <cctype>

int main() {
    char c = 'c';
    char star = '*';
    char seven = '7';

    std::cout << std::isalnum(c)     << "\n";  // nonzero
    std::cout << std::isalnum(star)  << "\n";  // 0

    if (std::isalnum(c)) {
        std::cout << c << " is alphanumeric\n";
    }
    // To get an actual bool:
    bool ok = static_cast<bool>(std::isalnum(c));
    return 0;
}
```

The common predicates:

| Function | Tests |
| --- | --- |
| `isalnum` | letter or digit |
| `isalpha` | letter |
| `isblank` | space or tab |
| `islower` / `isupper` | lowercase / uppercase |
| `isdigit` | digit |
| `toupper` / `tolower` | case conversion |

A counting example that also illustrates two common mistakes: ranging over a character array, and using `std::size_t` for a counter.

```cpp
char message[]{"Hello there, nice to meet you!"};
std::size_t blank_count{0};

for (std::size_t i{0}; i < std::size(message); ++i) {
    if (std::isblank(message[i])) {
        std::cout << "Found a blank at index " << i << "\n";
        ++blank_count;
    }
}
std::cout << "Total blanks: " << blank_count << "\n";
```

- **Why `std::size_t`**: a count cannot be negative, `int` allows negatives, and it can overflow.
- **Why `std::size`**: this is a native array, so `std::size` reports the element count; once the array decays to a pointer, `std::size` stops working.

Case conversion:

```cpp
char original[]{"Hello World"};
char upper[std::size(original)]{};

for (std::size_t i{0}; i < std::size(original); ++i) {
    upper[i] = std::toupper(original[i]);   // original is untouched
}
```

`toupper` returns the converted character; it **does not modify** the input, so the result must be stored somewhere.

> Compiler differences: some compilers, MSVC in particular, flag the `c`-prefixed `cctype` functions as unsafe and emit warnings. The lecture recommends compiling the same code under both gcc and MSVC to see the difference firsthand.

## C strings: null-terminated character arrays

A C string is not a type but a convention: **a character array whose last character is `'\0'`**. Every `str*` function relies on it to find the end.

```cpp
#include <cstring>

char message1[]{"Hello World"};        // the compiler appends '\0'
const char* message2{"Hello World"};   // points at a string literal

std::cout << std::strlen(message1) << "\n";  // 11
std::cout << sizeof(message1) << "\n";       // 12, including '\0'
```

The `strlen` versus `sizeof` distinction is the detail most likely to be tested:

| Expression | Result | Why |
| --- | --- | --- |
| `strlen(message1)` | 11 | counts up to `'\0'`, excluding it |
| `sizeof(message1)` | 12 | byte size of the array, including `'\0'` |
| `strlen(message2)` | 11 | dereferences the pointer and counts bytes |
| `sizeof(message2)` | 8 | size of the pointer itself (64-bit) |

The value of `strlen` is that it **still works on a decayed pointer**; `sizeof` on a pointer only reports the pointer's size.

### Comparison: `strcmp` and `strncmp`

`strcmp(a, b)` compares lexicographically:

- **negative** when `a` comes before `b`;
- **zero** when they are equal;
- **positive** when `a` comes after `b`.

It does **not** promise `-1` or `1`, only the sign.

```cpp
const char* a{"alabama"};
const char* b{"blabama"};
std::cout << std::strcmp(a, b) << "\n";   // negative, 'a' < 'b'

std::cout << std::strncmp("aaa", "aaanca", 3) << "\n";  // 0, first three match
```

```cpp
char arr3[]{"alabama"};
arr3 = "something else";   // compile error: an array name cannot be repointed
```

Pointers can be repointed (unless `const`); array names cannot. That difference matters directly for the memory discussion below.

### Searching: `strchr` and `strrchr`

`strchr(s, c)` returns a pointer to the **first** occurrence of `c`, or `nullptr` if absent. `strrchr` returns the last.

```cpp
const char* message{"Try not. Do or do not. There is no try."};
const char target{'t'};
const char* result{message};
std::size_t iterations{0};

while ((result = std::strchr(result, target)) != nullptr) {
    std::cout << "Found '" << target << "' starting at " << result << "\n";
    ++result;      // pointer arithmetic: continue after the match
    ++iterations;
}
std::cout << iterations << " iterations\n";
```

Two traps:

1. **Advance a separate pointer `result`**, never the original `message`.
2. `std::cout << result` prints through to `'\0'`, so the output is "from the match to the end", not the single character.

The lecture deliberately shows the wrong version:

```cpp
const char* message{"Try not. Do or do not. There is no try."};
const char* result{nullptr};
std::size_t iterations{0};

while ((result = std::strchr(message, 't')) != nullptr) {
    std::cout << result << "\n";
    ++message;          // problem: moves one character instead of jumping to the match
    ++iterations;
}
// loops 25 times instead of 2
```

The reason: each iteration searches from the start of the pointer passed in, and `++message` only shifts the start by one character, so the match is never skipped. The fix is to feed the returned pointer back in, or let a separate pointer walk forward. Declaring the original as `const char* const` makes the mistake a compile error:

```cpp
const char* const message{"..."};
// ++message;   // compile error, safe
```

A classic `strrchr` use is extracting a filename:

```cpp
const char path[]{"D:\\projects\\cpp\\hello.cpp"};
const char* filename{std::strrchr(path, '\\')};
if (filename != nullptr) {
    std::cout << (filename + 1) << "\n";   // hello.cpp
}
```

`filename` points at the last backslash; `+1` skips it and prints to `'\0'`.

## Concatenation and copy: `strcat` / `strcpy`

```cpp
char dest[50]{"Hello "};
char source[]{"World"};
std::strcat(dest, source);      // dest = "Hello World"
std::strcat(dest, " and goodbye");
```

`strcat` starts at `dest`'s `'\0'`, overwrites it, and appends `source`. **The caller must ensure `dest` is large enough**; otherwise it writes out of bounds — exactly why many compilers mark these functions unsafe.

```cpp
char dest[30]{"Hello "};
std::strncat(dest, "there is a bird on my window", 6);  // appends "there "
```

```cpp
char source[]{"C++ is a multi-purpose language"};
char dest[std::strlen(source) + 1];     // +1 for '\0'
std::strcpy(dest, source);
```

`strcpy` overwrites the target from its first character; `strncpy(dest, src, n)` copies only the first n. The overwrite behaviour is easy to see:

```cpp
char dest[]{"abcde f"};
std::strncpy(dest, "hello", 5);   // "hellof": first five characters replaced
```

**Why the target needs `+1`**: `strlen` does not count `'\0'`, but the copy must carry the terminator along.

## `std::string`: hiding the details

Character arrays impose two daily burdens:

1. You must track capacity; overruns crash.
2. You must maintain `'\0'`.

`std::string` puts both under the type's control.

```cpp
#include <string>

std::string empty;                                  // empty
std::string planet{"Where the sky is blue"};
std::string copy{planet};                           // copy
std::string message{"Hello world", 5};              // "Hello"
std::string repeated(4, 'e');                       // "eeee"
std::string saying{"Where the sky is blue", 6, 5};  // from index 6, length 5: "the s"
```

The last form is the easiest to misread: **the first number is the start index, the second is the length**.

```cpp
std::string planet{"Where the sky is blue"};
planet = "A much longer string than before";
```

Assignment grows automatically: the old buffer is freed and a new one allocated as needed. With a `const char*` the old literal is simply abandoned in place while the pointer is repointed — `std::string` avoids that waste.

## Takeaways

- `<cctype>` predicates return `int`; nonzero is true, and the exact value is unspecified.
- Character arrays are native arrays: `std::size` works until they decay to pointers.
- `strlen` excludes `'\0'`; `sizeof` includes it; `sizeof(pointer)` is just the pointer.
- `strcmp` promises only the sign: negative, zero, or positive.
- `strchr` / `strrchr` return pointers, or `nullptr` when not found; let the returned pointer advance.
- `strcat` / `strcpy` never check capacity; the caller must reserve room, including for `'\0'`.
- `std::string` manages length, terminator, and growth, and is the default choice.

## Comprehension check

**1. Why can `std::isalnum('7')` be used directly in an `if`, while writing `== 1` would be wrong?**

Reference answer: the standard only specifies "nonzero when the character is alphanumeric, zero otherwise", not that the nonzero value is `1`. `if (std::isalnum('7'))` relies on zero being false and nonzero true, which is guaranteed. `if (std::isalnum('7') == 1)` assumes a particular return value that another library implementation may not produce.

**2. For `char s[]{"Hello"}`, what are `strlen(s)` and `sizeof(s)`? If `const char* p = s;`, what is `sizeof(p)`?**

Reference answer: `strlen(s)` is 5 (counts up to but excludes `'\0'`); `sizeof(s)` is 6 (includes `'\0'`); `sizeof(p)` is the pointer's own size — commonly 8 on 64-bit platforms — independent of the string length.

**3. In the `strchr` loop, why does the lecture use a separate `result` pointer instead of advancing the original string pointer?**

Reference answer: `strchr` always searches from the pointer it is given. `++message` merely shifts the search start by one character; it never jumps past the match, so the next search rescans almost the whole string and the loop runs once per character (25 times). Assigning the return value back — `result = strchr(result, target)` — makes the next search begin after the match while leaving the original pointer intact. Declaring the original as `const char* const` turns such accidental modification into a compile error.

**4. Why is the following dangerous, and how would you fix it?**

```cpp
char dest[]{"Hello"};
std::strcat(dest, " World");
```

Reference answer: `dest` is initialized from a literal, so it holds 6 characters including `'\0'`. `strcat` appends `" World"`, which needs at least 12 bytes, so it writes past the array — undefined behaviour. Fix it by giving explicit capacity, e.g. `char dest[32]{"Hello"};`, or by using `std::string dest{"Hello"}; dest += " World";`.

**5. When copying a string of length n with `strcpy`, how large must the destination be, and why is n not enough?**

Reference answer: it must hold n + 1 characters. `strlen` returns n without the terminating `'\0'`, but `strcpy` copies the terminator too, so one extra cell is required.

**6. What does `std::string s{"Where the sky is blue", 6, 5};` contain?**

Reference answer: `"the s"`. The 6 is the starting index (`W` is 0, `t` is 6) and the 5 is the count: `t`, `h`, `e`, space, `s`.

## Relation to neighbouring chapters

The previous chapter covered references and `const`, which underpin the read-only pointer discipline used here; `std::string`, introduced at the end, is used from here on. The next chapter turns to the one definition rule, linkage, and declarations versus definitions — the groundwork for organizing multiple source files, and for understanding how a type such as `std::string` works across translation units.
