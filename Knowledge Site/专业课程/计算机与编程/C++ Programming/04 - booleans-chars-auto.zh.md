---
slug: 04-booleans-chars-auto
title: "第 4 章：布尔、字符与 auto"
summary: "本章对应长视频 4:16:37–4:45:33。补齐剩下三种基本类型：bool 只有两个状态并占 1 字节，char 用 ASCII 编码把字符映射成 0–255，auto 让编译器从初始化式推导类型；最后演示初始化之后重新赋值，以及 auto 配合无符号类型时的静默溢出。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, booleans, ascii, auto, type-deduction]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 4 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=15397s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## 这一章在讲什么

第 4 章覆盖 4:16:37–4:45:33，把基本类型补全。三件事：

- **bool**：只存 `true` 或 `false`，是程序里做判断的基础。
- **char**：占 1 字节，通过 ASCII 编码把字符映射成整数。
- **auto**：不写类型，让编译器从初始化式推导。

章末再讲"初始化"与"赋值"的区别，以及 `auto` 推导出无符号类型后，再赋负值会发生什么。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 4:16:37 | bool：两个状态与条件判断 |
| 4:18:11 | 打印布尔值：默认 1/0，`boolalpha` 显示 true/false |
| 4:18:38 | bool 占 1 字节 |
| 4:24:25 | char 与单引号；ASCII 编码 |
| 4:26:38 | 用字符赋整数值；`static_cast` 转回整数 |
| 4:32:01 | auto：由初始化式推导类型 |
| 4:38:12 | 初始化之后重新赋值；auto 与无符号的陷阱 |

## bool：只有两个状态

```cpp
bool red_light {true};
bool green_light {false};

if (red_light) {
    std::cout << "Stop" << std::endl;
} else {
    std::cout << "Go through" << std::endl;
}
```

`bool` 只能取 `true` 或 `false`。`if (red_light)` 直接判断这个值本身，不需要写 `red_light == true`——两种写法等价，前者更简洁。

打印布尔值时有一个默认行为容易让人困惑：

```cpp
bool condition {true};
std::cout << condition << std::endl;              // 1
std::cout << std::boolalpha << condition << std::endl;  // true
```

默认输出 `1`/`0`；加上 `std::boolalpha` 之后输出 `true`/`false`。这是第 6 章要系统讲的流操纵器的第一个例子。

`bool` 占 **1 个字节**（8 位），但只需要 1 位就能表达两个状态。这确实浪费，不过现代机器上不值得为此优化；内存极其紧张的设备才需要考虑位压缩。

## char：字符就是小整数

字符用单引号表示，且只能用单引号：

```cpp
char letter {'A'};
std::cout << letter << std::endl;   // A
```

双引号 `"A"` 是字符串字面量，类型是 `const char[2]`（含结尾的 `\0`），赋给 `char` 会编译失败。这是初学者最常见的错误之一。

### ASCII 编码

`char` 占 1 字节，能表示 0–255。ASCII 规定其中一部分数值对应哪个字符：

| 数值 | 字符 |
| --- | --- |
| 33 | `!` |
| 48 | `0` |
| 49 | `1` |
| 65 | `A` |
| 70 | `F` |
| 97 | `a` |
| 112 | `p` |

所以字符在内存里本来就是数字，只是 `char` 类型告诉编译器"请把它当字符显示"：

```cpp
char value {65};                       // 存的是 65
std::cout << value << std::endl;       // 按字符解释，输出 A
std::cout << static_cast<int>(value)   // 按整数解释，输出 65
          << std::endl;
```

`static_cast<int>` 是显式类型转换：告诉编译器"把这个值当 `int` 看"。不加它，`cout` 会按 `char` 输出字符。

ASCII 只覆盖 128 个基本字符，处理中文、日文、阿拉伯文需要 Unicode（如 UTF-8），那已经超出本课范围。这里只需建立"字符 = 编码后的整数"这个认识。

## auto：让编译器推导类型

`auto` 不是类型，而是让编译器**根据初始化式**决定类型的关键字：

```cpp
auto var1 {12};        // int
auto var2 {13.0};      // double
auto var3 {14.0f};     // float
auto var4 {15.0l};     // long double
auto var5 {'e'};       // char
```

规则很直接：字面量本身是什么类型，`auto` 就推导成什么类型。后缀在这里起决定作用——`14.0` 是 `double`，`14.0f` 才是 `float`。

整数也可以用后缀控制推导结果：

```cpp
auto v1 {12u};    // unsigned int
auto v2 {12ul};   // unsigned long
auto v3 {12ll};   // long long
```

VS Code 会把推导结果直接显示出来：把鼠标悬停在变量上，就能看到编译器认定的类型。也可以用 `sizeof` 验证：

```cpp
std::cout << sizeof(var1) << std::endl;   // 4
std::cout << sizeof(var2) << std::endl;   // 8
std::cout << sizeof(var5) << std::endl;   // 1
```

`auto` 的价值在于类型名字很长时省事（后面讲模板、迭代器时会非常明显）。代价是**类型不再一眼可见**，所以在关键变量上最好别滥用。

## 初始化与赋值

初始化是变量诞生时给值；赋值是之后改值：

```cpp
int var1 {123};            // 初始化
std::cout << var1;         // 123

var1 = 55;                 // 赋值
std::cout << var1;         // 55
```

这对 `double`、`bool` 同样成立：

```cpp
double var2 {44.50};
var2 = 99.99;

bool state {false};
state = true;
```

### auto 与无符号的陷阱

`auto` 推导出的类型可能和你以为的不一样，赋值时就会出问题：

```cpp
auto var3 {12u};    // 推导为 unsigned int
var3 = -22;         // 不报错！
```

`var3` 是无符号类型，装不下负数。编译器**不会报错**，而是按模 $2^{32}$ 回绕，`-22` 变成约 42.9 亿。程序照常编译、照常运行，只是结果完全不对。

这是本章最需要记住的教训：**使用 `auto` 时，赋值前要确认推导出的类型是什么**。悬停看一下，或者显式写 `unsigned int var3`，都比事后调试便宜。

## 本章结论

- `bool` 只有 `true`/`false`，占 1 字节；`boolalpha` 控制打印成 `true`/`false` 还是 `1`/`0`。
- `char` 占 1 字节，字符用单引号；内存里存的是 ASCII 码，`static_cast<int>` 可以读出数值。
- `auto` 由初始化式推导类型，后缀（`u`、`l`、`f`、`ll`）直接决定结果。
- 初始化发生在变量创建时，赋值发生在之后。
- `auto` 推导为无符号类型后赋负值，不会报错，会静默回绕成大正数。

## 理解检验

**1. `std::cout << true;` 输出什么？怎样才能输出 `true`？**

参考答案：默认输出 `1`，因为 `bool` 的底层值就是 1/0，`cout` 按整数格式打印。加上 `std::boolalpha` 后输出 `true`，例如 `std::cout << std::boolalpha << true;`。这是流的格式化状态，会一直生效，直到用 `std::noboolalpha` 关闭。

**2. `char c = "A";` 为什么编译失败？正确的写法是什么？**

参考答案：双引号 `"A"` 是字符串字面量，类型是 `const char[2]`（`A` 加结尾的 `\0`），本质是一个数组，不能赋给单个 `char`。正确写法是单引号 `char c = 'A';`，它表示一个字符常量。同理，比较时 `if (c == "A")` 也是错的，应写成 `if (c == 'A')`。

**3. `char value {65};` 打印出来为什么是 `A` 而不是 `65`？怎样让它打印 65？**

参考答案：`char` 类型告诉 `cout` 把这块内存按字符解释，65 在 ASCII 表中对应 `A`。要打印数值，需要显式转换：`std::cout << static_cast<int>(value);`。`static_cast` 不改变内存内容，只改变编译器解释这个值的方式。

**4. 写出四个 `auto` 变量分别推导为 `int`、`double`、`float`、`unsigned long` 的初始化式。**

参考答案：

```cpp
auto a {12};      // int
auto b {12.0};    // double
auto c {12.0f};   // float
auto d {12ul};    // unsigned long
```

推导完全由初始化式决定：整数默认 `int`，带小数点的默认 `double`，后缀 `f` 变 `float`，`u` 表示无符号、`l` 表示 long，组合 `ul` 就是 `unsigned long`。

**5. `auto x {12u}; x = -22;` 会发生什么？为什么不报错？**

参考答案：`12u` 推导出 `unsigned int`，装不下负数。赋值时编译器把 `-22` 按模 $2^{32}$ 回绕成 $4294967296-22=4294967274$，`x` 变成一个接近 43 亿的大正数。C++ 对无符号整数的溢出有明确定义（回绕），因此不属于错误，编译器不报错也不警告，问题被静默地带进运行结果。

**6. 初始化与赋值有什么区别？为什么 `auto` 让这个区别变得更需要注意？**

参考答案：初始化发生在变量创建时，决定它的初始值和类型；赋值发生在之后，只改值、不改类型。用显式类型时，类型在声明处一眼可见；用 `auto` 时，类型藏在初始化式里，后面赋值是否合法取决于那个看不见的类型。因此 `auto` 变量在赋值前应先确认推导出的类型，否则容易出现上面那种静默回绕。

## 与前后章的关系

本章把基本类型补齐：数值（第 3 章）、布尔、字符，以及写法上的 `auto`。第 5 章开始对它们做运算——算术与取模、优先级与结合性、自增自减、复合赋值、比较与逻辑运算。第 6 章再回到本章提到的 `boolalpha`，系统讲解输出格式化的整套操纵器。
