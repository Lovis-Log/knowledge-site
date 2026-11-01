---
slug: "13-strings-and-c-strings"
title: "字符与字符串：cctype、cstring 与 std::string"
summary: "先把单个字符当作整数来分类与转换，再用 cstring 处理以空字符结尾的字符数组，最后引出 std::string——它把长度与空字符的管理藏到类型内部。"
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

这是 31 小时长视频的**第 13 章**，对应时间轴 12:46:10–14:12:29。原视频没有分章，这一章是重新划分出来的：从「字符分类」讲到「C 字符串工具函数」，最后引出 `std::string`。

## 这一章在讲什么

C++ 里处理文本有三层工具，本章沿着它们由低到高走一遍：

1. **单个字符**：`<cctype>` 提供判断与大小写转换，函数返回 `int`，非零表示真。
2. **C 风格字符串**：以 `'\0'` 结尾的字符数组，用 `<cstring>` 的 `strlen`、`strcmp`、`strchr`、`strcat`、`strcpy` 操作。
3. **`std::string`**：把长度、扩容和空字符全部封装起来，不再需要手动维护边界。

三层之间的关系是本条主线：**每一层都在替下一层管理麻烦**。`strlen` 替你数到 `'\0'`，`std::string` 替你保存长度并在需要时重新分配内存。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 12:46:10 | `<cctype>` 概览：能做什么、文档在哪 |
| 12:47:23 | `std::isalnum`：字母或数字 |
| 12:50:08 | `std::isalpha`：字母 |
| 12:50:44 | `std::isblank`：空白字符，统计例子 |
| 12:51:52 | `std::islower` / `std::isupper` |
| 12:52:49 | `std::isdigit` |
| 12:53:16 | `std::toupper` / `std::tolower` |
| 12:54:44 | VS Code 实机：character manipulation 项目 |
| 12:59:09 | 换用 MSVC 编译，观察不同编译器的差别 |
| 13:00:51 | `isblank` 计数：为什么计数器该用 `size_t` |
| 13:03:25 | 大小写计数 |
| 13:06:38 | 大小写转换演示 |
| 13:08:41 | cctype 小结 |
| 13:09:36 | `strlen`：长度，不含 `'\0'` |
| 13:11:43 | `strcmp`：字典序比较 |
| 13:13:38 | `strncmp`：只比较前 n 个字符 |
| 13:14:37 | `strchr`：找第一次出现，返回指针 |
| 13:17:36 | `strrchr`：找最后一次出现 |
| 13:19:05 | VS Code 实机：c string manipulation |
| 13:21:39 | `strlen` 与 `sizeof` 的差别 |
| 13:24:17 | 指针可改指向、数组名不可改 |
| 13:30:17 | `strchr` 的循环细节 |
| 13:36:46 | 反面例子：直接改原指针导致循环 25 次 |
| 13:39:25 | `strrchr` 从路径里提取文件名 |
| 13:42:30 | `strcat`：拼接 |
| 13:45:40 | `strncat`：只拼前 n 个字符 |
| 13:46:37 | `strcpy`：复制 |
| 13:47:36 | `strncpy`：只复制前 n 个字符 |
| 13:49:08 | VS Code 实机：c string concatenation and copy |
| 14:01:10 | 为什么需要 `std::string` |
| 14:03:34 | `std::string` 的声明与六种初始化 |
| 14:06:23 | VS Code 实机：declaring std::string |
| 14:10:51 | `std::string` 的自动扩容与内存回收 |

## 字符分类：`<cctype>`

`<cctype>` 里的函数接收一个字符、返回 `int`：**非零表示真，零表示假**。不要假设「真」一定是 `1`——标准只保证非零。

```cpp
#include <iostream>
#include <cctype>

int main() {
    char c = 'c';
    char star = '*';
    char seven = '7';

    std::cout << std::isalnum(c)     << "\n";  // 非零
    std::cout << std::isalnum(star)  << "\n";  // 0

    if (std::isalnum(c)) {
        std::cout << c << " is alphanumeric\n";
    }
    // 想得到真正的 bool：
    bool ok = static_cast<bool>(std::isalnum(c));
    return 0;
}
```

常见成员：

| 函数 | 判断 |
| --- | --- |
| `isalnum` | 字母或数字 |
| `isalpha` | 字母 |
| `isblank` | 空格与制表符 |
| `islower` / `isupper` | 小写 / 大写 |
| `isdigit` | 数字 |
| `toupper` / `tolower` | 转换大小写 |

一个计数例子，同时演示两个易错点：范围 `for` 访问字符数组，以及计数器应使用 `std::size_t`。

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

- **为什么用 `std::size_t`**：计数不可能为负，`int` 允许负数，语义不对，还可能溢出。
- **为什么用 `std::size`**：这是原生数组，`std::size` 能拿到元素个数；若数组退化成指针，`std::size` 就失效了。

大小写转换：

```cpp
char original[]{"Hello World"};
char upper[std::size(original)]{};

for (std::size_t i{0}; i < std::size(original); ++i) {
    upper[i] = std::toupper(original[i]);   // 原数组不变
}
```

`toupper` 返回转换后的字符，**不修改原字符**；要保留结果就得写到另一个数组里。

> 编译器差异：部分编译器（尤其 MSVC）会把 `cctype` 中以 `c` 开头的函数视为不安全并给出警告。课件建议同一段代码在 gcc 与 MSVC 下各编译一次，亲眼看看差异。

## C 字符串：以 `'\0'` 结尾的字符数组

C 字符串不是一种类型，而是一个约定：**字符数组的末尾有一个 `'\0'`**。所有 `str*` 函数都靠它判断结束。

```cpp
#include <cstring>

char message1[]{"Hello World"};        // 编译期加上 '\0'
const char* message2{"Hello World"};   // 指向字面量

std::cout << std::strlen(message1) << "\n";  // 11
std::cout << sizeof(message1) << "\n";       // 12（含 '\0'）
```

`strlen` 与 `sizeof` 的区别是本章最常考的细节：

| 表达式 | 结果 | 原因 |
| --- | --- | --- |
| `strlen(message1)` | 11 | 数到 `'\0'` 为止，不含它 |
| `sizeof(message1)` | 12 | 整个数组的字节数，含 `'\0'` |
| `strlen(message2)` | 11 | 解引用指针，逐字节数 |
| `sizeof(message2)` | 8 | 指针本身的大小（64 位平台） |

`strlen` 的好处是**对退化后的指针仍然有效**；`sizeof` 一旦遇到指针就只能给出指针大小。

### 比较：`strcmp` 与 `strncmp`

`strcmp(a, b)` 按字典序比较：

- 返回**负数**：`a` 在 `b` 之前；
- 返回 **0**：两串相同；
- 返回**正数**：`a` 在 `b` 之后。

它**不保证**返回 `-1` 或 `1`，只保证符号。

```cpp
const char* a{"alabama"};
const char* b{"blabama"};
std::cout << std::strcmp(a, b) << "\n";   // 负数，'a' < 'b'

std::cout << std::strncmp("aaa", "aaanca", 3) << "\n";  // 0，前三个字符相同
```

```cpp
char arr3[]{"alabama"};
arr3 = "something else";   // 编译错误：数组名不能重新指向
```

指针可以改指向（只要不是 `const`），数组名不行。这个差异在下一节会直接影响内存管理。

### 查找：`strchr` 与 `strrchr`

`strchr(s, c)` 返回**第一次**出现 `c` 的指针；找不到返回 `nullptr`。`strrchr` 找最后一次。

```cpp
const char* message{"Try not. Do or do not. There is no try."};
const char target{'t'};
const char* result{message};
std::size_t iterations{0};

while ((result = std::strchr(result, target)) != nullptr) {
    std::cout << "Found '" << target << "' starting at " << result << "\n";
    ++result;      // 指针算术：从下一个字符继续找
    ++iterations;
}
std::cout << iterations << " iterations\n";
```

两个容易踩的点：

1. **必须用独立指针 `result` 前进**，不能直接改原指针 `message`（下面会看到原因）。
2. `std::cout << result` 会一直打印到 `'\0'`，所以输出的是「从匹配位置到结尾」而不是单个字符。

课件特意演示了一个反面写法：

```cpp
const char* message{"Try not. Do or do not. There is no try."};
const char* result{nullptr};
std::size_t iterations{0};

while ((result = std::strchr(message, 't')) != nullptr) {
    std::cout << result << "\n";
    ++message;          // 问题：只前进一格，没有跳到匹配处
    ++iterations;
}
// 结果循环 25 次，而不是 2 次
```

原因：每次循环都从**整体**重新搜索，`++message` 只挪动一个字符，匹配位置并没有被跳过。正确做法是把返回值赋回搜索起点，或者像上例那样让 `result` 自己前进。

把原指针声明为 `const char* const` 可以防止这类意外：

```cpp
const char* const message{"..."};
// ++message;   // 编译错误，安全
```

`strrchr` 的经典用途是从路径中取文件名：

```cpp
const char path[]{"D:\\projects\\cpp\\hello.cpp"};
const char* filename{std::strrchr(path, '\\')};
if (filename != nullptr) {
    std::cout << (filename + 1) << "\n";   // hello.cpp
}
```

`filename` 指向最后一个反斜杠，`+1` 跳过它，打印到 `'\0'` 为止。

## 拼接与复制：`strcat` / `strcpy`

```cpp
char dest[50]{"Hello "};
char source[]{"World"};
std::strcat(dest, source);      // dest = "Hello World"
std::strcat(dest, " and goodbye");
```

`strcat` 从 `dest` 的 `'\0'` 处开始覆盖，把 `source` 接上去。**调用者必须保证 `dest` 足够大**，否则会越界写内存，这正是这些函数被许多编译器标记为不安全的原因。

```cpp
char dest[30]{"Hello "};
std::strncat(dest, "there is a bird on my window", 6);  // 只接 "there "
```

```cpp
char source[]{"C++ is a multi-purpose language"};
char dest[std::strlen(source) + 1];     // +1 给 '\0'
std::strcpy(dest, source);
```

`strcpy` 从目标数组的开头覆盖整个数组；`strncpy(dest, src, n)` 只复制前 n 个字符。课件用一个例子说明覆盖行为：

```cpp
char dest[]{"abcde f"};
std::strncpy(dest, "hello", 5);   // "hellof"：前五个字符被覆盖
```

**为什么 `strcpy` 的目标要单独留 `+1`**：`strlen` 不数 `'\0'`，而复制需要把 `'\0'` 一起搬过去。

## `std::string`：把细节藏起来

字符数组的两个日常负担：

1. 必须自己记录容量，越界会崩；
2. 必须自己保证 `'\0'` 存在。

`std::string` 把这两件事交给类型本身处理。

```cpp
#include <string>

std::string empty;                                  // 空串
std::string planet{"Where the sky is blue"};
std::string copy{planet};                           // 拷贝
std::string message{"Hello world", 5};              // "Hello"
std::string repeated(4, 'e');                       // "eeee"
std::string saying{"Where the sky is blue", 6, 5};  // 从下标 6 取 5 个："the s"
```

第六种写法最容易看错：**第一个数字是起始下标，第二个是长度**。

```cpp
std::string planet{"Where the sky is blue"};
planet = "A much longer string than before";
```

赋值会自动扩容：旧内存被释放，新内存按需分配。若用 `const char*` 做同样的事，旧字面量只是被丢在原地，指针换了指向，内存并没有归还——`std::string` 没有这个浪费。

## 本章结论

- `<cctype>` 的谓词返回 `int`，非零为真；不要依赖具体数值。
- 字符数组是原生数组：`std::size` 可用，一旦退化成指针就失效。
- `strlen` 不含 `'\0'`，`sizeof` 含；`sizeof(指针)` 只是指针大小。
- `strcmp` 只保证返回值的符号：负、零、正。
- `strchr` / `strrchr` 返回指针，找不到返回 `nullptr`；搜索时应让返回指针自己前进。
- `strcat` / `strcpy` 不检查目标容量，调用者负责保证足够大，并给 `'\0'` 留位置。
- `std::string` 自动管理长度、空字符与扩容，是本章推荐的默认选择。

## 理解检验

**1. 为什么 `std::isalnum('7')` 在 `if` 里能直接用，却不该写成 `== 1`？**

参考答案：标准只规定「是字母或数字时返回非零值，否则返回零」，没有规定非零值必须是 `1`。写 `if (std::isalnum('7'))` 依赖的是「零为假、非零为真」，这是正确的；写 `if (std::isalnum('7') == 1)` 则假设了具体返回值，换编译器或标准库可能失效。

**2. 对 `char s[]{"Hello"}`，`strlen(s)`、`sizeof(s)` 分别是多少？若 `const char* p = s;`，`sizeof(p)` 又是多少？**

参考答案：`strlen(s)` 是 5，数到 `'\0'` 为止且不含它；`sizeof(s)` 是 6，包含结尾的 `'\0'`；`sizeof(p)` 是指针本身的大小（64 位平台通常为 8），与它指向的字符串长度无关。

**3. `strchr` 的循环里，为什么课件要用一个单独的 `result` 指针，而不能直接对原字符串指针做 `++`？**

参考答案：`strchr` 每次都会从头搜索传入的指针所指的字符串。若直接 `++message`，只是把搜索起点后移一个字符，并没有跳到匹配位置，下一次搜索仍会在几乎整段里重新扫描，于是循环次数变成字符数（25 次）。用 `result = strchr(result, target)` 把返回值赋回搜索起点，才能让下一轮从匹配处之后继续，同时保持原指针不变。把原指针声明为 `const char* const` 可以从编译期阻止这种误改。

**4. 下面这段代码为什么危险？写出一种修复方式。**

```cpp
char dest[]{"Hello"};
std::strcat(dest, " World");
```

参考答案：`dest` 由字面量初始化为长度 6（含 `'\0'`），`strcat` 会把 `" World"` 追加到末尾，需要至少 12 个字节，越界写入属于未定义行为。修复：显式声明足够容量，例如 `char dest[32]{"Hello"};`，或在 C++ 里改用 `std::string dest{"Hello"}; dest += " World";`。

**5. 用 `strcpy` 复制一个长度为 n 的字符串时，目标数组至少要多大？为什么不是 n？**

参考答案：至少要 n + 1 个字符。`strlen` 返回的 n 不含结尾的 `'\0'`，而 `strcpy` 会把 `'\0'` 一并复制过去，所以目标必须额外留一格存放它。

**6. `std::string s{"Where the sky is blue", 6, 5};` 得到的 `s` 是什么？**

参考答案：`"the s"`。第一个数字 6 是起始下标（`W` 为 0，`t` 为 6），第二个数字 5 是取多少个字符：`t`、`h`、`e`、空格、`s`。

## 与前后章的关系

上一章处理引用与 `const`，为本章的「指针只读」打下基础；本章最后引出的 `std::string` 在第 14 章之后会继续使用。下一章转向单一定义规则、链接与声明/定义的区别——那是把多个源文件组织成程序的前提，也是理解 `std::string` 这类类型如何跨翻译单元工作的基础。
