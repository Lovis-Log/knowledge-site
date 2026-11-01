---
slug: "14-odr-linkage-declarations"
title: "程序如何组装：单一定义规则、函数声明与分离编译"
summary: "一个名字在全程序里只能定义一次，类却可以在每个翻译单元各定义一次；函数可以拆成声明与定义，编译器各管一段、链接器负责拼接。这一章把「编译器错误」与「链接器错误」彻底分开。"
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "odr", "linkage", "translation-unit", "functions"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 14 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=51149s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

这是 31 小时长视频的**第 14 章**，对应时间轴 14:12:29–15:42:29。这一章从「为什么同名定义会报错」出发，一路讲到函数、声明与定义、翻译单元与链接器，最后把函数拆进 `.h` 与 `.cpp` 两个文件。

## 这一章在讲什么

一个 C++ 程序在变成可执行文件之前，要经过三个阶段：

1. **预处理**：把 `#include` 的文件原样拷贝进来，得到**翻译单元**（translation unit）。
2. **编译**：每个翻译单元各自编译成一个**目标文件**（object file）。
3. **链接**：链接器把所有目标文件拼成一个可执行文件。

单一定义规则（ODR）约束的是「一个名字可以被定义几次」，而编译器与链接器各自只看得见其中一部分信息：编译器看声明，链接器找定义。把这两件事分开，就能解释为什么有些错误叫 `redefinition`（编译期），有些叫 `undefined reference` / `multiple definition`（链接期）。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 14:12:29 | 单一定义规则概述：变量、函数、类、静态成员 |
| 14:14:04 | VS Code：ODR 与自由变量 |
| 14:15:26 | 同名变量跨文件定义 → 链接器报 `multiple definition` |
| 14:16:34 | 函数同样不能重复定义 |
| 14:18:54 | 类的例外：可以在多个翻译单元各定义一次 |
| 14:20:47 | 同一翻译单元内重复定义类 → 编译错误 |
| 14:21:51 | 带静态成员的类：定义放在哪里 |
| 14:26:22 | 静态成员与构造函数重复定义 → 链接错误 |
| 14:28:35 | 函数是什么：可复用的「机器」 |
| 14:29:18 | 函数语法：返回类型、名字、参数、函数体 |
| 14:30:39 | 签名 = 函数名 + 参数列表（不含返回类型） |
| 14:31:33 | 调用语法：实参传给形参 |
| 14:32:24 | 例子：`into_bar`、`max`、`say_hello`、`lucky_number` |
| 14:37:13 | 隐式转换：`double` 传给 `int` 参数 |
| 14:37:45 | 按值传递：函数内改的是副本 |
| 14:40:10 | VS Code：函数实操 |
| 14:48:13 | 编写 `max` 并调用 |
| 14:54:37 | 同名同参数的两个函数 → 重定义 |
| 14:56:56 | 按值传递的完整演示 |
| 15:00:45 | 声明与定义分离 |
| 15:04:01 | 函数原型：返回类型 + 名字 + 参数 + 分号 |
| 15:08:36 | 只有声明没有定义 → `undefined reference` |
| 15:15:24 | 编译模型：预处理与翻译单元 |
| 15:17:52 | 编译阶段生成目标文件 |
| 15:18:22 | 链接阶段拼接目标文件 |
| 15:20:02 | 把函数拆到多个文件 |
| 15:22:03 | VS Code：multiple files 项目 |
| 15:25:05 | 新建 `compare.h` 与 `compare.cpp` |
| 15:29:01 | 定义可以放在任意翻译单元 |
| 15:32:02 | 删掉定义后观察链接错误（gcc 与 MSVC） |
| 15:36:51 | 练习：`operations.h` / `operations.cpp` |

## 单一定义规则（ODR）

规则本身很短：**同一个名字在整个程序里只能有一个定义**。但「程序」和「定义」都要精确理解。

### 自由变量与函数：跨文件只能定义一次

```cpp
// main.cpp
double weight{7.5};      // 既是声明也是定义

// some_other_file.cpp
double weight{7.5};      // 又一次定义
```

两处一起编译，链接器会报：

```
multiple definition of `weight'
```

注意错误出现的阶段：**同一个文件里重复定义是编译错误（`redefinition`），不同文件里重复定义是链接错误（`multiple definition`）**。区别在于编译器一次只看一个翻译单元，只有链接器才看得到全局。

函数同理：

```cpp
// main.cpp
double add(double a, double b) { return a + b; }

// some_other_file.cpp
double add(double a, double b) { return a + b; }   // multiple definition
```

### 类：唯一允许「每个翻译单元各定义一次」

类定义通常写在头文件里，被多个 `.cpp` 包含。如果类也必须全程序只定义一次，那头文件根本无法使用。所以 ODR 给类开了例外：

> 一个类可以在多个翻译单元中各有一个定义，但这些定义必须**完全相同**（token 序列一致），且每个翻译单元内最多一个。

```cpp
// point.h
struct Point {
    double m_x{};
    double m_y{};
};
```

```cpp
// main.cpp
#include "point.h"

// some_other_file.cpp
#include "point.h"
```

程序可以正常编译链接。但在同一个 `.cpp` 里写两遍 `struct Point {...}`，立刻得到 `redefinition of 'Point'`——**例外只放宽了「跨翻译单元」，没有放宽「同一翻译单元内」**。

### 静态成员与成员函数

类的静态成员变量必须在某个地方给出**类外定义**，而且只能有一处：

```cpp
// person.h
class Person {
public:
    Person(std::string name, int age);
    void print_info() const;
private:
    std::string m_full_name;
    int m_age{};
    static int s_person_count;
};
```

```cpp
// person.cpp
#include "person.h"

int Person::s_person_count{8};        // 唯一一处定义

Person::Person(std::string name, int age)
    : m_full_name{std::move(name)}, m_age{age} {
    ++s_person_count;
}
```

若在 `main.cpp` 里再写一遍 `int Person::s_person_count{8};`，链接器会报两条错误：`multiple definition of Person::s_person_count` 和构造函数的重复定义。**成员函数的定义同样受 ODR 约束，只能出现一次**（写在类体内的成员函数默认是 inline，这是另一条例外，后面章节再展开）。

## 函数：语法与术语

课件用一个类比解释函数：它是一台**机器**，可以给输入、做处理、可选地给输出，而且可以反复使用。

```cpp
返回类型 函数名(参数列表) {
    // 函数体
    return 结果;   // 若返回类型不是 void
}
```

四个组成部分：

| 部分 | 含义 |
| --- | --- |
| 返回类型 | 函数交回什么；`void` 表示不返回 |
| 函数名 | 调用时使用的名字 |
| 参数列表 | 调用者要提供什么；定义时叫**形参 parameter** |
| 函数体 | 具体做什么 |

调用时传入的值叫**实参 argument**：

```cpp
int max(int a, int b) {        // a、b 是形参
    if (a > b) return a;
    return b;
}

int result = max(10, 20);      // 10、20 是实参
```

这两个词经常被混用，但在「定义 vs 调用」的语境下区分清楚很有用。

### 签名：名字 + 参数

**函数签名（signature）= 函数名 + 参数列表**，不包含返回类型。因此下面两个写法冲突：

```cpp
int  max(int a, int b) { return a > b ? a : b; }
void max(int x, int y) { }        // redefinition：签名相同
```

改参数名（`a,b` 改成 `x,y`）没有用——签名只看类型和个数，不看名字。返回类型不同也不行。

### 值传递：函数拿到的是副本

```cpp
double increment_and_multiply(double a, double b) {
    ++a;
    ++b;
    return a * b;
}

int main() {
    double h{3}, i{4};
    double result = increment_and_multiply(h, i);
    // h 仍是 3，i 仍是 4
}
```

调用时编译器把 `h`、`i` 的**副本**交给 `a`、`b`。函数里 `++a` 改的是副本，函数结束副本就销毁，原变量不受影响。想修改调用者的变量，需要传指针或引用——这是第 15 章的主题。

### 隐式转换

```cpp
int minimum(int a, int b) { return a < b ? a : b; }

double f{3.9}, g{4.1};
int m = minimum(f, g);    // 编译通过，f、g 被截断为 3、4
```

编译器发现实参类型与形参不匹配时，会自行插入转换。这里 `3.9` 被截断成 `3` 而不是四舍五入，结果可能与你预期不同。**隐式转换不会报错，只会悄悄发生**，这是排错困难的常见来源。

## 声明与定义分离

### 原型（prototype）

把函数头单独写出来、末尾加分号，就是**函数声明**：

```cpp
int max(int a, int b);      // 声明，也叫原型
```

原型需要出现在**调用之前**。上一章之所以不写原型也能编译，是因为函数定义本身写在 `main` 之前——**定义同时充当了声明**。

```cpp
int max(int a, int b);      // 声明

int main() {
    int m = max(5, 3);      // 编译器此时只需要知道签名
    return 0;
}

int max(int a, int b) {     // 定义可以放在后面
    return a > b ? a : b;
}
```

### 只有声明会怎样

删掉定义、只留声明，编译阶段仍然通过，因为编译器只需要签名就能生成调用代码；但链接阶段找不到函数体：

```
undefined reference to `max()'
```

在 MSVC 下对应 `unresolved external symbol`。**看到 `undefined reference` 就该想到：链接器在找定义，没找到。**

一个容易忽略的细节：声明里的参数名可以省略。

```cpp
int max(int, int);          // 合法
```

课件仍然建议保留参数名，让声明自解释。

## 编译模型：三个阶段

```
main.cpp ──预处理──> 翻译单元 ──编译──> main.o ─┐
other.cpp ─预处理──> 翻译单元 ──编译──> other.o ─┼──链接──> rooster
...                                              ┘
```

- **预处理**：把 `#include <iostream>` 替换成 `iostream` 文件的内容，宏展开，条件编译。产物是完整的**翻译单元**。
- **编译**：每个翻译单元独立编译成一个**目标文件**（`.o` / `.obj`），里面是机器码加上符号表。
- **链接**：链接器把所有目标文件拼成一个可执行文件，顺便解析跨文件的符号引用。

理解这个模型，才能理解错误的归属：

| 现象 | 阶段 | 原因 |
| --- | --- | --- |
| `redefinition of ...` | 编译 | 同一翻译单元内重复定义 |
| `undefined reference` | 链接 | 有声明，全程序找不到定义 |
| `multiple definition` | 链接 | 多个翻译单元各定义了一次 |

gcc 的链接错误末尾常见 `ld returned 1 exit status`，`ld` 就是链接器。

## 拆到多个文件：头文件与实现文件

组织方式：

```
compare.h      // 声明
compare.cpp    // 定义
main.cpp       // #include "compare.h"，调用
```

```cpp
// compare.h
#pragma once
int max(int a, int b);
int min(int a, int b);
```

```cpp
// compare.cpp
#include "compare.h"

int max(int a, int b) { return a > b ? a : b; }
int min(int a, int b) { return a < b ? a : b; }
```

```cpp
// main.cpp
#include <iostream>
#include "compare.h"

int main() {
    std::cout << max(134, 56) << "\n";
    std::cout << min(146, 23) << "\n";
}
```

两个必须记住的点：

1. **自己的头文件用双引号**：`#include "compare.h"`；标准库用尖括号：`#include <iostream>`。
2. **定义不必和同名头文件放在一起**。把 `max` 的定义挪到任意 `.cpp` 文件，链接器仍能找到；头文件只负责让每个翻译单元「看见」声明。

若把 `min` 的定义注释掉，链接器会遍历所有翻译单元后报 `undefined reference to min`——这正是上一节错误的实际版。

## 本章结论

- ODR：自由变量与函数全程序只能定义一次；类可在多个翻译单元各定义一次，但必须完全相同，且同一翻译单元内只能有一次。
- 类的静态成员变量要在类外给出唯一定义；成员函数定义同样只能出现一次。
- 函数签名 = 名字 + 参数列表，不含返回类型；参数名不影响签名。
- 按值传递传的是副本，函数内修改不影响调用者。
- 隐式转换会静默发生，必要时用显式转换或改参数类型。
- 原型让调用方无需看到定义；缺定义会在链接期报 `undefined reference`。
- 编译 = 预处理 + 编译 + 链接；编译只看单个翻译单元，链接才看全局。

## 理解检验

**1. 为什么同一个文件里写两次 `double weight{7.5};` 报的是编译错误，写在不同文件里却报链接错误？**

参考答案：编译器一次只处理一个翻译单元，它能看到同一个 `.cpp` 里出现了两次 `weight` 的定义，于是直接报 `redefinition`。当两处定义分处不同 `.cpp` 时，每个翻译单元单独看都没有问题，编译器放行；直到链接阶段，链接器合并符号表，发现两个同名的强符号，才报 `multiple definition`。错误的归属由「谁看得见这两个定义」决定。

**2. 类为什么被允许在多个翻译单元中重复定义？这种例外有边界吗？**

参考答案：类的定义通常写在头文件里，而头文件会被多个 `.cpp` 包含；如果类也必须全程序只定义一次，头文件就无法使用。因此 ODR 允许类在每个翻译单元中各有一份定义，条件是各份定义完全一致。边界是：**同一翻译单元内仍然只能有一次**，把 `struct Point` 在同一个 `.cpp` 里写两遍，编译器立刻报 `redefinition`。

**3. `int max(int a, int b);` 与 `int max(int a, int b) { return a > b ? a : b; }` 的区别是什么？只保留前者会发生什么？**

参考答案：前者是声明（原型），只告诉编译器签名，不产生函数体；后者是定义，包含函数体并生成代码。只保留声明时，编译阶段仍能通过，因为调用处只需要签名；但链接器在所有目标文件里找不到 `max` 的定义，报 `undefined reference to max()`（MSVC 下为 `unresolved external symbol`）。

**4. 函数签名包含返回类型吗？下面两行能否共存？**

```cpp
int  max(int a, int b);
void max(int x, int y);
```

参考答案：签名只包含函数名与参数列表的类型和个数，不包含返回类型，参数名也不参与。两行的签名都是 `max(int, int)`，因此不能共存；第二个会被判为重复声明/定义，即使参数名不同、返回类型不同也一样。

**5. 下面这段代码输出什么？为什么？**

```cpp
void bump(int a) { ++a; }

int main() {
    int x{5};
    bump(x);
    std::cout << x << "\n";
}
```

参考答案：输出 `5`。`bump` 的参数是**按值传递**，调用时把 `x` 的副本交给 `a`，`++a` 只修改副本；函数返回后副本销毁，`x` 保持原值。若要在函数内修改 `x`，参数应写成 `int& a` 或 `int* a`。

**6. 把 `min` 的函数体从 `compare.cpp` 删掉、但保留 `compare.h` 里的声明，构建会出现什么错误？它发生在哪个阶段？**

参考答案：链接阶段报 `undefined reference to min(int, int)`（MSVC 下 `unresolved external symbol`）。编译阶段可以通过，因为 `main.cpp` 只需要声明就能生成调用；链接器在合并所有目标文件、解析 `min` 的引用时找不到它的定义，于是报错。

## 与前后章的关系

上一章处理字符与字符串，开始接触「类型把细节封装起来」；本章把封装推到文件层面：头文件只暴露接口，实现藏在 `.cpp` 里。下一章专门讨论函数参数的三种传递方式（值、指针、引用），这正是本章「按值传递只给副本」留下的问题。
