---
slug: 01-intro-and-tools
title: "Chapter 1: The Toolchain and Your First C++ Program"
summary: "The course is one 31-hour video with no built-in chapters; this one covers 0:00–1:55:35. It wires an editor, a compiler and a build configuration together on Windows, Linux and macOS, verifies the setup with a C++20 test program, and then explains what include, main, cout, endl and return actually do."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, toolchain, compiler, vscode, cpp20]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 1 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=0s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## What this chapter covers

This is chapter 1 of a 31-hour single video, spanning 0:00–1:55:35. It teaches no syntax. It solves one prerequisite problem: **how to turn written C++ code into a program the machine can actually run.**

The course splits that into two tools: something to write code in (an editor or IDE) and something to translate code into machine instructions (a compiler). This chapter installs both on Windows, Linux and macOS, wires them into VS Code build tasks, verifies the whole chain with a minimal program, and then explains that program line by line.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Who the course is for and how it is structured |
| 4:37 | Two kinds of tools: editor and compiler |
| 8:19 | Choosing a compiler: gcc, clang/LLVM, MSVC |
| 11:14 | Installing gcc and clang on Windows (winlibs) and setting PATH |
| 20:22 | Installing Visual Studio Community and MSVC |
| 24:42 | Installing VS Code and the C/C++ extension |
| 27:54 | Configuring the VS Code build task and running the test program |
| 45:29 | Wiring MSVC into VS Code |
| 53:04 | Configuring IntelliSense and the C++ standard |
| 57:24 | Linux (Ubuntu 20.04): gcc, clang, gdb |
| 1:03:59 | Linux: VS Code and build configuration |
| 1:22:42 | macOS: Homebrew, Xcode command line tools, clang |
| 1:28:06 | macOS: VS Code and configuration |
| 1:35:20 | Three online compilers: onebox, Kodiru, Compiler Explorer |
| 1:42:57 | First C++ program: include, main, cout, endl, return |

## The two required tools

Writing C++ needs two kinds of software, and their roles must not be confused:

- **Editor / IDE**: text entry, syntax highlighting, completion. It does not understand your program and does not produce an executable.
- **Compiler**: translates `.cpp` text into a binary the target platform can run directly (`.exe` on Windows, an ELF executable on Linux).

The course uses VS Code as the editor because it is cross-platform, easy to install and well supported by extensions. The compiler is **gcc** (provided on Windows through MinGW), with clang/LLVM and MSVC demonstrated alongside it. Compiling the same code with all three is the cheapest way to check portability.

> **In one line:** the editor writes text, the compiler builds the program; VS Code itself compiles nothing — it just invokes the compiler you configured.

## Compilers: gcc, clang, MSVC

The C++ standard keeps growing (C++11, C++14, C++17, C++20, …), and compilers implement features at different speeds. Before choosing, check their support: search for "cpp compiler support" and you will find cppreference's feature-by-compiler matrix.

The course chooses gcc as the main tool: cross-platform, well documented, and relatively honest error messages. clang is friendlier when it complains, MSVC is the native Windows toolchain. Installing all three is harmless as long as the build configuration states which one to use.

## Setting up on Windows

### Install gcc and clang together with winlibs

1. Search for "winlibs" and open the project's releases page.
2. Pick a 64-bit archive that contains **both LLVM/Clang and MinGW**.
3. Extract it somewhere permanent, for example `C:\mingw64`.
4. Open the resulting `bin` folder and confirm `g++.exe`, `gcc.exe`, `clang++.exe` and `gdb.exe` are there.

### Put the compiler on PATH

The compiler is on disk, but a terminal will not find it by name unless its directory is on `Path`. Add `C:\mingw64\bin` to the system `Path` variable, open a new terminal and check:

```bash
g++ --version
clang++ --version
```

Both printing a version means PATH works. This matters because VS Code's *Configure Tasks* discovers compilers by scanning PATH.

### Install MSVC

MSVC does not ship with VS Code; it comes with Visual Studio. Download Community, and in the installer tick **"Desktop development with C++"**. Afterwards, typing `cl` in an ordinary terminal still fails — deliberately, since a machine may hold several MSVC versions. Instead, open **Developer Command Prompt** (or Developer PowerShell) from the Start menu; that terminal pre-sets `INCLUDE`, `LIB` and `PATH`, and `cl.exe` reports its version there.

### Install VS Code and the C/C++ extension

Open the Extensions panel and install Microsoft's **C/C++** extension. Without it VS Code is just a text editor: no completion, no diagnostics, and no C++-specific commands such as *Configure Tasks*.

## The template project: connecting VS Code to a compiler

Every later chapter starts by copying this template. Its point is simple: **configure the build once, then reuse it for every new project**.

### The test program

Create an empty folder, open it in VS Code, and add `main.cpp`:

```cpp
#include <iostream>

int main() {
    auto result = (10 <=> 20) > 0;
    std::cout << result << std::endl;
    return 0;
}
```

The code deliberately uses the C++20 **three-way comparison operator** `<=>`. Ordinary syntax might compile under an older standard by accident; this cannot. If the compiler is not in C++20 mode, the file fails to build. The program prints `0`, because `10 <=> 20` means "less than", so `> 0` is false.

> **Supplement:** `std::strong_ordering` is declared in `<compare>`. Most implementations pull it in through `<iostream>`, but the robust version adds `#include <compare>`; the course omits it to keep the test minimal.

### Where tasks.json comes from

Open the command palette with `Ctrl+Shift+P` and run **Tasks: Configure Task**. VS Code scans PATH, lists the compilers it found, and after you pick `g++` it writes `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "cppbuild",
      "label": "Build with g++ 11.2.0",
      "command": "C:\\mingw64\\bin\\g++.exe",
      "args": [
        "-std=c++20",
        "-g",
        "${workspaceFolder}\\*.cpp",
        "-o",
        "${workspaceFolder}\\rooster.exe"
      ],
      "options": { "cwd": "${workspaceFolder}" },
      "problemMatcher": ["$gcc"],
      "group": { "kind": "build", "isDefault": true }
    }
  ]
}
```

Each argument is worth understanding:

| Argument | Effect |
| --- | --- |
| `-std=c++20` | Compile as C++20; without it, `<=>` is an error |
| `-g` | Emit debug information for gdb |
| `${workspaceFolder}\\*.cpp` | Compile every source file in the project, not just `main.cpp` |
| `-o rooster.exe` | Name the output; the course uses `rooster` so it matches the video |
| `group.isDefault` | Makes `Ctrl+Shift+B` run this task directly |

Save, then run **Terminal → Run Task → Build with g++**. `Build finished successfully` plus a new `rooster.exe` means the chain works.

### Adding clang and MSVC

One project can register several build tasks. Run Configure Task again, choose `clang++.exe`, and a second task appears. Start VS Code from a Developer PowerShell (`code .` inside it) and MSVC shows up in the list too.

*Run Task* then offers a menu: switching compilers is a menu choice, not a code change.

### Configuring IntelliSense

Completion and navigation are controlled separately from the build. Run **C/C++: Edit Configurations (UI)**, choose the compiler path and the C++ standard (`c++20`), and VS Code writes `c_cpp_properties.json`. Once that is right, `<=>` no longer shows red squiggles.

## Linux and macOS

Linux (Ubuntu 20.04) follows the same logic with different commands:

```bash
sudo apt-get install gcc-10 g++-10 gdb
sudo apt-get install clang-12
```

Distribution repositories usually lag behind the newest gcc; Homebrew is the shortcut to a current release. Install VS Code from the `.deb` package, add the same C/C++ extension, and point the `tasks.json` command at `/usr/bin/g++`.

On macOS, run `xcode-select --install` first — it provides Apple's clang — then Homebrew for newer gcc and LLVM:

```bash
brew install gcc
brew install llvm
```

The lecturer has no Mac and describes this section rather than filming it. The practical pitfall is the compiler path: Apple's clang lives in `/usr/bin`, Homebrew's under `/usr/local/opt` or `/opt/homebrew/opt`.

## Online compilers

For a machine you cannot install tools on, or for sending someone a reproducible snippet, online compilers are enough:

- **onebox**: IDE-like, several gcc/clang versions, shareable links.
- **Kodiru**: g++ only, minimal, click Compile and run.
- **Compiler Explorer**: built for reading generated assembly, but it also runs your program; the widest compiler list, including MSVC.

All three share one trap: **you must pass the standard flag yourself**. Leave out `-std=c++20` and the `<=>` test fails — that is the missing flag, not a broken program.

## Reading the first C++ program

Back to the smallest Hello World:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}
```

### `#include <iostream>`

The core language only defines syntax. Console input and output live in the **standard library**. `#include` is a preprocessor directive: before compilation it pastes the contents of `iostream` into the file, lending the program the ability to talk to the console.

Try deleting the line: `std::cout` immediately fails with `namespace std has no member cout`. That is not a typo — the program has never seen the name.

Note that the line ends **without a semicolon**: it is a preprocessor directive, not a statement.

### `main`

`main` is the entry point. When the operating system starts the program, this is the first thing it runs. Statements inside execute top to bottom until the closing brace.

### `std::cout` and `<<`

`std::cout` is the standard output stream — the pipe from your program to the console. `<<` is the stream insertion operator: it pushes the right-hand value into the left-hand stream.

```cpp
std::cout << "Hello World" << std::endl;
```

Both arrows point at `cout`, which is a useful reminder of the direction of data flow. Chaining is just repeated insertion.

### `std::endl` versus `'\n'`

`std::endl` writes a newline **and** flushes the stream; `'\n'` writes a newline only. On a console the difference is invisible, but the flush is real work. For this chapter, the essential fact is simpler: **without a newline, consecutive outputs share a line**.

### `return 0`

`main`'s return value goes to the operating system; `0` conventionally means success, nonzero means failure. Modern C++ lets you omit it (implicit `return 0`), but the course keeps it for clarity.

## Chapter summary

- The editor writes, the compiler translates; VS Code only invokes the compiler.
- gcc, clang and MSVC can coexist; `tasks.json` decides which one builds.
- Compilers must be on PATH for VS Code to find them; MSVC is the exception and needs a Developer Prompt.
- The key `tasks.json` arguments are `-std=c++20`, the source glob, and `-o`.
- `#include <iostream>` brings in console I/O; `main` is the entry point; `std::cout <<` sends data to the console; `std::endl` ends the line; `return 0` reports success.

## Comprehension check

**1. Why is installing VS Code not enough — why a separate compiler?**

Reference answer: VS Code is an editor; it only handles text (highlighting, completion, saving). It has no ability to translate C++ into machine code. The compiler (g++/clang++/cl) reads `.cpp`, performs syntax and type checking, and emits a platform binary. A VS Code build task is literally a wrapper that runs the compiler command in a terminal, so the compiler must be installed and on PATH separately.

**2. What happens if `-std=c++20` is removed from `tasks.json`, and why does the course test with `<=>`?**

Reference answer: Without the flag, g++ 11 compiles as gnu++17 by default. `<=>` is the C++20 three-way comparison operator, so the build fails with an operator/syntax error. The course uses this snippet precisely because it cannot accidentally compile under an older standard: a successful build proves C++20 mode is genuinely active, which a plain Hello World cannot show.

**3. MSVC is installed, yet `cl` is "not recognized" in a normal terminal but works in Developer Command Prompt. Why?**

Reference answer: `cl.exe` is not on the system PATH. Visual Studio's Developer Command Prompt runs a script that sets PATH, INCLUDE, LIB and related variables for that session only. A normal terminal has none of them. By the same logic, to make VS Code use MSVC you start it with `code .` from that Developer terminal so it inherits the environment.

**4. Why does the template's `tasks.json` compile `${workspaceFolder}\\*.cpp` instead of just `main.cpp`?**

Reference answer: The glob compiles every `.cpp` in the project and links them into one executable. Later chapters split code across several source files; with the glob, the build configuration never changes. Listing only `main.cpp` would leave new files uncompiled and produce "undefined symbol" errors at link time.

**5. The `<=>` test fails in Compiler Explorer but builds locally with g++. What is the most likely cause?**

Reference answer: The online compiler is not in C++20 mode. You must add `-std=c++20` to its compiler options; by default it uses the compiler's default standard (often C++14/17), where `<=>` is illegal. The code is fine — the flag is missing.

**6. Why does `#include <iostream>` take no semicolon while `std::cout << ...` requires one?**

Reference answer: `#include` is a preprocessor directive handled before compilation and is not part of the C++ statement grammar, so no semicolon is needed. `std::cout << ...` is an expression statement, and C++ requires statements to end with a semicolon; omitting it yields an "expected ';' before ..." compile error.

## How it connects

This chapter produces a working toolchain and a reusable template project. Chapter 2 starts writing real code — comments, the three kinds of errors, statements and functions, and the I/O streams — using this template for a complete "read a name and age, print a greeting" program. Chapter 3 moves on to variables and data types, explaining how the zeros and ones in memory correspond to the numbers people read.
