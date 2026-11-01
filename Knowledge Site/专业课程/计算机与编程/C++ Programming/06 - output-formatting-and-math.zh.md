---
slug: 06-output-formatting-and-math
title: "第 6 章：输出格式化、数值范围与数学函数"
summary: "本章对应长视频 5:55:57–7:03:15。系统讲解 iomanip 的流操纵器：宽度、对齐、填充、进制、浮点格式与精度；再用 limits 查询类型范围、用 cmath 做数学运算，最后解释小于 4 字节的整型在运算时会被提升为 int。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, iomanip, formatting, numeric-limits, cmath, integral-promotion]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 6 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=21357s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## 这一章在讲什么

第 6 章覆盖 5:55:57–7:03:15，是前半程篇幅最长的一章。它处理三件事：

- **把输出排整齐**：宽度、左右对齐、填充字符、进制、浮点格式、精度。
- **查类型的边界**：`<limits>` 提供 `min()`、`max()`、`lowest()` 等函数。
- **做数学运算**：`<cmath>` 提供取整、绝对值、指数、对数、幂、开方、三角函数。

章末还有一个容易被忽略但很关键的知识点：小于 4 字节的整型参与运算时，会先被**隐式提升**为 `int`。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 5:55:57 | 为什么要格式化：把杂乱数据变成表格 |
| 5:58:34 | endl 与 `'\n'`；flush 与输出缓冲区 |
| 6:00:05 | setw 设置宽度 |
| 6:00:56 | left / right / internal 对齐 |
| 6:01:41 | setfill 填充字符 |
| 6:02:02 | boolalpha、showpos |
| 6:03:15 | dec / hex / oct、showbase、uppercase |
| 6:06:19 | fixed / scientific 与浮点默认格式 |
| 6:08:16 | setprecision 精度；showpoint |
| 6:33:24 | numeric_limits：min、max、lowest |
| 6:41:09 | cmath：floor、ceil、abs、exp、pow、log、sqrt、round |
| 6:54:21 | 小于 4 字节的整型与整型提升 |

## 流操纵器从哪来

格式化工具来自两个头文件：

```cpp
#include <iostream>   // cout、cerr、endl
#include <iomanip>    // setw、setfill、setprecision 等
```

不用背：查 cppreference 上 `std::setw` 的页面，第一行就写着它需要 `<iomanip>`。课程反复强调的一点是——**学会查文档**，比记住每个操纵器属于哪个头文件更重要。

### endl 与 '\n'

```cpp
std::cout << "Hello" << std::endl << "World" << std::endl;
std::cout << "Hello" << '\n' << "World" << '\n';
```

两者在终端里看起来一样，但 `std::endl` 除了换行还会**刷新缓冲区**，`'\n'` 只写一个换行符。频繁输出时，`endl` 的刷新是有成本的；不过现在就把它俩理解为"都能换行"即可，差别属于性能细节。

### flush 与缓冲区

`std::cout` 的输出不是立刻送到终端，而是先写进一块**缓冲区**，等缓冲区满了或遇到刷新时才一次性送出。`std::flush` 强制立即送出：

```cpp
std::cout << "正在计算..." << std::flush;
```

在需要"立刻看到输出"的场景（进度提示、调试）里有用；普通程序交给缓冲区自动处理即可。

## 排版：宽度、对齐、填充

未格式化的表格：

```cpp
std::cout << "Daniel" << "Gray" << 33 << std::endl;
std::cout << "Woods" << "Smith" << 27 << std::endl;
```

数据挤在一起，难以阅读。用 `setw` 给每列指定宽度：

```cpp
#include <iomanip>

int width {10};

std::cout << std::setw(width) << "Lastname"
          << std::setw(width) << "Firstname"
          << std::setw(width) << "Age" << std::endl;

std::cout << std::setw(width) << "Daniel"
          << std::setw(width) << "Gray"
          << std::setw(width) << 33 << std::endl;
```

`setw(10)` 表示"下一个输出至少占 10 个字符宽"，不足的用空格补齐。

三个必须知道的细节：

1. **`setw` 只对下一次输出生效**，每一列都要重新写。
2. **默认右对齐**：数据靠右，空格在左。
3. **宽度可以存进变量**，改一处就能调整整张表，比在每行写死 `10` 好得多。

### 对齐方式

```cpp
std::cout << std::right << std::setw(10) << "Gray";
std::cout << std::left  << std::setw(10) << "Gray";
```

`std::left`、`std::right` 是**持续生效**的设置，一旦设置，后面所有输出都按这个方式对齐，直到再次改变。

### internal：符号靠左，数值靠右

```cpp
std::cout << std::internal << std::setw(10) << -12.34 << std::endl;
```

输出形如 `-    12.34`：负号贴左，数字贴右。做金额表、对齐带符号的数列时很实用。

### 填充字符

```cpp
std::cout << std::left << std::setfill('-') << std::setw(10) << "Daniel";
```

空格被换成 `-`。`setfill` 同样持续生效，`setw` 仍然只管一次。

## 布尔、符号与进制

### boolalpha

```cpp
bool condition {true};
std::cout << condition << std::endl;                    // 1
std::cout << std::boolalpha << condition << std::endl;  // true
std::cout << std::noboolalpha << condition << std::endl; // 1
```

### showpos

```cpp
std::cout << 34 << " " << -45 << std::endl;                // 34 -45
std::cout << std::showpos << 34 << " " << -45 << std::endl; // +34 -45
```

正数默认不显示 `+`，`showpos` 强制显示；负数无论是否开启都带 `-`。

### 进制

```cpp
int number {42};
std::cout << std::dec << number << std::endl;   // 42
std::cout << std::hex << number << std::endl;   // 2a
std::cout << std::oct << number << std::endl;   // 52
```

进制设置**只影响整数**，浮点数会照原样输出。

### showbase 与 uppercase

```cpp
std::cout << std::showbase;
std::cout << std::hex << 42 << std::endl;   // 0x2a
std::cout << std::oct << 42 << std::endl;   // 052

std::cout << std::uppercase << std::hex << 42 << std::endl;  // 0X2A
```

`showbase` 加上前缀：十六进制 `0x`、八进制 `0`、十进制不加。`uppercase` 让 `a`–`f` 变成 `A`–`F`，前缀也变成 `0X`。

> **注意：** 进制设置会**一直生效**。切到 `hex` 之后忘了切回 `dec`，后面所有整数都会以十六进制打印。这是初学者排查"数字怎么变成字母了"的常见原因。

## 浮点格式与精度

### 默认、fixed 与 scientific

```cpp
double a {3.14159265358979};
double b {1.0};
double c {1.34e-10};

std::cout << a << " " << b << " " << c << std::endl;
// 3.14159 1 1.34e-10

std::cout << std::fixed << a << std::endl;        // 3.141593
std::cout << std::scientific << a << std::endl;   // 3.141593e+00
```

默认格式会在必要时自动使用科学计数法；`fixed` 强制定点，`scientific` 强制科学计数法。

### 恢复到默认

标准库没有提供一个"恢复浮点默认格式"的操纵器。课程给出的写法是：

```cpp
std::cout.unsetf(std::ios::floatfield);   // 清掉 fixed / scientific
std::cout.setf(std::ios::fmtflags(0), std::ios::floatfield);
```

这属于工程上的变通做法，现阶段照用即可，不必深究。

### setprecision

```cpp
std::cout << std::setprecision(6)  << a << std::endl;
std::cout << std::setprecision(10) << a << std::endl;
std::cout << std::setprecision(20) << a << std::endl;
```

精度设置"显示多少位"，但**不能突破类型本身的精度**。`double` 大约 15–17 位，超过这个数之后的数字是噪声：

```cpp
double value {1.234567890123456789};
std::cout << std::setprecision(20) << value << std::endl;
// 1.2345678901234567 后面跟的是垃圾
```

在 `fixed` 模式下，`setprecision` 表示小数点后的位数；在默认/科学计数法下，它表示有效数字总位数。这个差别很容易踩坑。

### showpoint

```cpp
std::cout << 12.0 << std::endl;                  // 12
std::cout << std::showpoint << 12.0 << std::endl; // 12.0000
```

`showpoint` 强制显示小数点，并补足尾随的 0。

## 查询类型范围：numeric_limits

```cpp
#include <limits>

std::cout << std::numeric_limits<short>::min() << std::endl;   // -32768
std::cout << std::numeric_limits<short>::max() << std::endl;   // 32767

std::cout << std::numeric_limits<float>::min() << std::endl;   // 最小正数
std::cout << std::numeric_limits<float>::lowest() << std::endl; // 最负的数
std::cout << std::numeric_limits<float>::max() << std::endl;   // 最大数
```

关键区别：

- 对**整数**，`min()` 就是最小值（负数），`lowest()` 与它相同。
- 对**浮点数**，`min()` 是**最小的正数**（靠近 0），`lowest()` 才是最负的数。名字容易误解，这是必须记住的一点。

还可以查 `is_signed`、`digits` 等属性，在需要判断平台特性时很有用。

## 数学函数：cmath

```cpp
#include <cmath>

std::floor(7.7);    // 7  向下取整
std::ceil(7.2);     // 8  向上取整
std::abs(-5000);    // 5000 绝对值
std::exp(10);       // e^10 ≈ 22026.5
std::pow(3, 4);     // 81
std::log(54.59);    // 以 e 为底
std::log10(10000);  // 4
std::sqrt(81);      // 9
std::round(2.5);    // 3  四舍五入，远离零
std::round(2.4);    // 2
```

几个容易出错的地方：

- `std::log` 默认以 $e$ 为底，不是以 10 为底；常用对数要写 `std::log10`。
- `std::round` 对 `.5` 的处理是"远离零"：`2.5 → 3`，`-2.5 → -3`。
- 三角函数用弧度，不是角度。

`<cmath>` 覆盖的函数远不止这些，需要时查 cppreference 即可。

## 小于 4 字节的整型与整型提升

C++ 规定：**小于 `int` 的整型（`char`、`short`）参与算术运算时，会先被隐式转换为 `int`。** 原因是 CPU 的整数运算单元以 `int` 为最小宽度，这样处理最自然。

```cpp
short a {10};
short b {20};

auto result = a + b;
std::cout << sizeof(a) << std::endl;       // 2
std::cout << sizeof(b) << std::endl;       // 2
std::cout << sizeof(result) << std::endl;  // 4，不是 2
```

`a + b` 在计算前先把两个 `short` 提升为 `int`，相加的结果也是 `int`，所以 `auto` 推导出 4 字节的 `int`。`char` 同理：

```cpp
char c1 {'a'};
char c2 {'b'};
auto result2 = c1 + c2;    // int，值是 195（'a' 的 97 加 'b' 的 98）
```

这条规则平时不太显眼，但当程序依赖 `sizeof` 或类型宽度（序列化、二进制协议、模板特化）时，它会带来真实的问题。

## 本章结论

- 格式化需要 `<iomanip>`；`setw` 只影响下一次输出，`left`/`right`/`internal`/`setfill` 持续生效。
- `boolalpha` 控制布尔显示，`showpos` 控制正号。
- `dec`/`hex`/`oct` 只影响整数，且会持续生效；`showbase` 加前缀，`uppercase` 转大写。
- 浮点格式有默认、`fixed`、`scientific`；`setprecision` 在 `fixed` 下是小数位数，否则是有效数字位数。
- `numeric_limits::min()` 对浮点数是"最小正数"，`lowest()` 才是"最负数"。
- `<cmath>` 提供取整、绝对值、指数、对数、幂、开方与三角函数；`log` 以 $e$ 为底。
- 小于 4 字节的整型在运算时提升为 `int`，结果的类型可能比操作数更宽。

## 理解检验

**1. 为什么 `setw(10)` 写一次不够，而 `std::left` 写一次就够？**

参考答案：`setw` 是"只对下一次输出生效"的操纵器，它设置的是紧随其后的那一个值的宽度，输出完就失效，所以每一列都要重新写。`left`/`right`/`internal`/`setfill` 修改的是流的**持久格式化状态**，一旦设置，之后所有输出都沿用，直到再次改变。前者是逐次参数，后者是开关。

**2. 执行 `std::cout << std::hex << 42;` 之后再输出 `100`，会看到什么？**

参考答案：会看到 `64`。`hex` 设置的是流的进制状态，会持续生效；`100` 被解释为十六进制输出，$100 \div 16 = 6$ 余 4，即 `64`。要恢复正常需要显式写 `std::dec`。这是"格式化状态会残留"的典型例子。

**3. `numeric_limits<float>::min()` 与 `lowest()` 有什么区别？为什么容易误解？**

参考答案：对浮点类型，`min()` 返回**最小的正规格化正数**（最接近 0 的正值，约为 $1.18\times10^{-38}$），`lowest()` 返回最负的有限值（约为 $-3.4\times10^{38}$）。名字里的 "min" 容易被理解成"最小值"，但在浮点语境下它指的是"最小正值"。整数类型没有这个问题，因为整数的 `min()` 与 `lowest()` 相同。

**4. `std::setprecision(20)` 能让我们看到 `double` 的 20 位有效数字吗？**

参考答案：不能。`setprecision` 只规定显示多少位，实际精度受类型限制：`double` 约 15–17 位有效数字，超过这个范围后输出的数字没有意义，只是二进制表示转换后的噪声。`float` 更早开始失真，大约 7 位。想真正提高精度要用 `long double`（也有限）或专门的高精度库。

**5. `short a = 10, b = 20; auto c = a + b;` 中 `c` 是什么类型？为什么？**

参考答案：`c` 是 `int`（4 字节）。C++ 的整型提升规则要求：宽度小于 `int` 的整型在参与算术运算前先转换为 `int`。`a` 和 `b` 先各自变成 `int`，相加的结果也是 `int`，`auto` 据此推导。用 `sizeof(c)` 可以验证结果是 4 而不是 2。

**6. 想让 `3.14159` 以固定三位小数输出、并且正数带 `+` 号，应该怎样设置？**

参考答案：

```cpp
std::cout << std::fixed << std::setprecision(3) << std::showpos;
std::cout << 3.14159 << std::endl;   // +3.142
```

`fixed` 让 `setprecision(3)` 表示小数点后三位，`showpos` 让正数显示 `+`。注意输出的 3.142 是四舍五入的结果，不是截断。这三个设置都会持续生效，后续输出会一直带 `+` 和三位小数，需要时用 `std::noshowpos`、恢复默认格式来复位。

## 与前后章的关系

本章把"输出"从一个语句变成了一套可配置的排版系统，同时补齐了查类型范围与做数学运算的工具。第 7 章进入流程控制：`if`、`else if`、`switch`，用第 5 章的比较与逻辑结果决定程序走哪条分支。第 8 章再讲循环，把重复劳动交给 CPU。
