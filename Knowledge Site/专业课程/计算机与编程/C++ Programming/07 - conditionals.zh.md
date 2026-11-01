---
slug: "07-conditionals"
title: "条件分支：if、else if、switch 与三元运算符"
summary: "这一章讲 C++ 的全部条件控制结构：if 与 else 的语法、嵌套与逻辑运算符的等价写法、else if 链的短路语义、switch 的 break 与贯穿陷阱，以及三元运算符。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, control-flow, conditionals, switch, ternary]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 7 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=25395s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## 这一章在讲什么

这是 31 小时长视频的第 7 章，对应 **07:03:15–07:53:35**。

前一章讲完了运算符，其中关系运算与逻辑运算的结果都是 `bool`。这一章回答一个自然的问题：拿到一个 `bool` 之后，怎样让程序走不同的路？

本章覆盖四种工具：`if`、`else`、`else if` 链、`switch`，以及只做二选一的三元运算符。它们解决的是同一件事——**条件执行**——但适用场景不同。讲者用一个贯穿全章的例子（红绿灯、画图工具）说明：同一个逻辑可以用四种方式写，读起来的清晰度差别很大。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 07:03:15 | `if` 语句：用比较结果控制输出 |
| 07:04:52 | `if` 的语法：条件放进括号，语句体放进花括号 |
| 07:05:20 | `else` 子句：把「条件不成立」的情况接住 |
| 07:06:18 | 嵌套 `if` 与红绿灯例子；用逻辑运算符改写 |
| 07:07:42 | VS Code 实操：`result` 变量、`!result` 的读法 |
| 07:15:56 | 红绿灯与警察停车例子：嵌套结构逐行分析 |
| 07:20:46 | `else if` 链：画图应用里「当前工具是哪一个」 |
| 07:24:57 | 实操：`tool` 变量与六个工具常量 |
| 07:28:51 | `switch` 语句：`case`、`break`、`default` |
| 07:31:17 | `switch` 条件只能是整型或枚举 |
| 07:38:07 | 删掉 `break` 之后会发生什么：贯穿（fallthrough） |
| 07:39:55 | 多个 `case` 合并到同一个代码块 |
| 07:42:41 | 三元运算符 `? :` |
| 07:51:39 | 一个意外发现：三元表达式里的隐式转换方向 |

## `if`：最基础的条件执行

`if` 的语法只有三部分：

```cpp
if (condition) {
    // 条件为 true 时执行
}
```

括号里必须是能当作布尔值使用的东西——比较表达式、逻辑表达式，或者一个 `bool` 变量。花括号是语句体；只有一条语句时花括号可以省略，但加上更安全，也更容易在以后追加语句。

课程的第一个例子把条件先存进变量再使用：

```cpp
#include <iostream>

int main() {
    int number1 {55};
    int number2 {60};

    bool result = (number1 < number2);
    std::cout << "result : " << std::boolalpha << result << std::endl;

    if (result) {
        std::cout << number1 << " is less than " << number2 << std::endl;
    }

    if (!result) {
        std::cout << number1 << " is NOT less than " << number2 << std::endl;
    }
    return 0;
}
```

输出：

```text
result : true
55 is less than 60
```

`!result` 是逻辑非。讲者特意强调，新同学常被 `if (!result)` 卡住，其实只要在心里读成「如果 result 为假」就通了。当 `number1` 改成 `65` 时，`result` 变成 `false`，第一个 `if` 不进，第二个进去，输出随之翻转。

### `else`：把「不成立」接住

用两个 `if` 分别测正反两种情况，逻辑正确但啰嗦。`else` 直接把互补情况接住：

```cpp
if (result) {
    std::cout << "number1 is less than number2" << std::endl;
} else {
    std::cout << "number1 is NOT less than number2" << std::endl;
}
```

关键语义：**`if` 分支与 `else` 分支永远只执行一个**。这一点在嵌套时尤其重要——一旦某个块执行，同一层剩下的分支全部跳过，控制流直接落到整条语句之后。

### 表达式可以直接当条件

不必先存 `bool` 变量：

```cpp
if (number1 < number2) { /* ... */ }
```

C++ 允许任何能转换为 `bool` 的表达式出现在条件位置。存变量只是让代码更易读、也方便复用，并不是语法要求。

### 嵌套与逻辑运算符

红绿灯是嵌套的经典例子：

```cpp
bool red_light {false};
bool green_light {true};
bool police_stop {true};

if (green_light) {
    if (police_stop) {
        std::cout << "Stop" << std::endl;
    } else {
        std::cout << "Go" << std::endl;
    }
}
```

输出是 `Stop`：绿灯亮，但警察示意停车。

同样的逻辑可以用 `&&` 压平：

```cpp
if (green_light && !police_stop) {
    std::cout << "Go" << std::endl;
} else {
    std::cout << "Stop" << std::endl;
}
```

结果完全一样，但只有一层判断，读起来更直接。**能用逻辑运算符合并的嵌套，通常比真正的嵌套更好读**；只有当内层条件依赖外层已经成立的事实时（例如内层需要外层的变量），嵌套才无可替代。

## `else if`：多路分支

多个互斥条件用一条 `else if` 链：

```cpp
const int pen {10};
const int marker {20};
const int eraser {30};
const int rectangle {40};
const int circle {50};
const int ellipse {60};

int tool {eraser};

if (tool == pen) {
    std::cout << "Active tool is pen" << std::endl;
} else if (tool == marker) {
    std::cout << "Active tool is marker" << std::endl;
} else if (tool == eraser) {
    std::cout << "Active tool is eraser" << std::endl;
} else if (tool == rectangle) {
    std::cout << "Active tool is rectangle" << std::endl;
} else if (tool == circle) {
    std::cout << "Active tool is circle" << std::endl;
} else if (tool == ellipse) {
    std::cout << "Active tool is ellipse" << std::endl;
}

std::cout << "Moving on" << std::endl;
```

输出：

```text
Active tool is eraser
Moving on
```

两个必须记住的点：

1. **比较用 `==`，不是 `=`。** `if (tool = pen)` 是赋值，赋完的值非零，条件恒为真，编译器通常只给一个警告。这是初学者最常见的 bug 之一。
2. **整条链只会命中一个分支。** 命中后控制流跳到链尾，`Moving on` 照常执行。

`else if` 链在语义上等价于一串嵌套 `if/else`，但扁平的写法没有层层缩进，适合条件多而互斥的场景。

## `switch`：多路分支的紧凑写法

`switch` 把同一个变量与一组常量比较：

```cpp
switch (tool) {
    case pen: {
        std::cout << "Active tool is pen" << std::endl;
        break;
    }
    case marker: {
        std::cout << "Active tool is marker" << std::endl;
        break;
    }
    case eraser: {
        std::cout << "Active tool is eraser" << std::endl;
        break;
    }
    default: {
        std::cout << "No match found" << std::endl;
        break;
    }
}
```

### `break` 不能忘

`break` 告诉程序：这个 `case` 执行完就离开整个 `switch`。**省掉 `break` 不会报错，但会「贯穿」**——从命中的 `case` 开始，把后面所有 `case` 的代码依次执行一遍，直到遇到 `break` 或 `switch` 结束。

课程现场演示了这一点：当前工具是 `marker` 且所有 `break` 都被删掉时，输出变成

```text
Active tool is marker
Active tool is eraser
Active tool is rectangle
...
No match found
```

这种行为偶尔有用（见下面的合并写法），但绝大多数时候是 bug。规则很简单：**每个 `case` 结尾都写 `break`，除非你明确想要贯穿。**

### `switch` 表达式的类型限制

括号里的表达式必须是**整型或枚举**：`int`、`char`、`unsigned`、`short`、`long` 等都可以，`std::string` 不行。课程用一个 `std::string name {"John"}` 做实验，编译器直接拒绝：

```text
error: switch quantity not an integer
```

原因是 `case` 标签要求编译期常量，而字符串不是整型常量。字符串多路分支只能用 `if/else if`。

### 合并多个 `case`

几个 `case` 想执行同一段代码时，可以写成连续标签：

```cpp
switch (tool) {
    case pen: {
        std::cout << "Active tool is pen" << std::endl;
        break;
    }
    case marker: {
        std::cout << "Active tool is marker" << std::endl;
        break;
    }
    case rectangle:
    case circle:
    case ellipse: {
        std::cout << "Drawing shape" << std::endl;
        break;
    }
    default: {
        std::cout << "No match found" << std::endl;
        break;
    }
}
```

当 `tool` 是 `rectangle`、`circle` 或 `ellipse` 中任何一个，都会打印 `Drawing shape`。这正是贯穿语义的正面用法：前面的 `case` 没有语句体，控制流自然落到共享的那一块。

## 三元运算符：二选一的表达式

`if/else` 是语句，三元运算符是**表达式**，可以直接产生一个值：

```cpp
condition ? option1 : option2
```

求最大值的老写法：

```cpp
int a {35};
int b {20};
int max;

if (a > b) {
    max = a;
} else {
    max = b;
}
```

三元版本：

```cpp
int max = (a > b) ? a : b;
```

一行完成，语义完全一致：条件为真取 `a`，否则取 `b`。

### 两个分支的类型必须兼容

`: ` 两侧的类型必须相同，或至少能互相隐式转换，否则编译失败：

```cpp
int a {35};
int max = (a > 20) ? a : "hello";   // 编译错误
```

错误信息类似 `operands to ?: have different types 'int' and 'const char*'`。

课程还演示了一个容易看错的现象：

```cpp
int a {35};
auto max = (a > 22) ? a : 22.5;
```

直觉上会以为 `22.5` 被截断成 `22`、结果类型是 `int`。实际输出是 `max is 35`，但 `auto` 推导出的类型是 **`double`**——编译器把 `a` 提升成了 `double`。也就是说，三元运算符的类型由两侧**共同**决定，转换方向不一定是从「宽」到「窄」。用 `auto` 而不是固定类型声明，正好能看出编译器真正选了哪个类型。

> **一句话总结：** 能用逻辑运算符压平的嵌套就别嵌套；多路互斥分支优先用 `switch`，但别忘了 `break`；只做二选一时，三元运算符比 `if/else` 更紧凑。

## 本章结论

- `if (condition)` 的条件必须能当作布尔值；`if (!x)` 读作「如果 x 为假」。
- `else` 接住互补情况；同一层的 `if` 与 `else` 只会执行一个。
- 嵌套 `if` 通常可以用 `&&`、`||` 合并，合并后的版本更好读。
- `else if` 链适合多个互斥条件，但比较必须用 `==`。
- `switch` 的条件只能是整型或枚举；忘记 `break` 会贯穿到后续 `case`。
- 连续写多个 `case` 标签可以把它们合并到同一个代码块。
- 三元运算符 `cond ? a : b` 是表达式，两侧类型必须兼容，结果类型由编译器统一推导。

## 理解检验

**1. `if (result)` 与 `if (!result)` 分别在什么情况下进入分支？如果把 `result` 声明成 `int` 而不是 `bool`，结果会怎样？**

参考答案：`if (result)` 在 `result` 为真（非零）时进入；`if (!result)` 在 `result` 为假（零）时进入，两者互补。C++ 允许把 `int` 用在条件位置：`0` 视为假，任何非零值视为真。但 `!result` 对 `int` 做的是逻辑取反，结果仍是 `bool`，语义与 `bool` 版本一致。把布尔语义的变量声明成 `int` 会丢失意图，建议坚持用 `bool`。

**2. 为什么 `if (tool = pen)` 是一个危险写法？编译器会怎样提示？**

参考答案：单个 `=` 是赋值而不是比较。`tool = pen` 把 `pen` 的值赋给 `tool`，整个表达式的值就是赋值后的 `tool`，即 `10`，非零，条件恒为真，于是这个分支每次都会执行。编译器通常会给出「suggest parentheses around assignment used as truth value」之类的警告（打开 `-Wall` 才会显示），但不会报错。正确写法是 `if (tool == pen)`。

**3. 删掉某个 `case` 末尾的 `break` 会发生什么？什么情况下这是你想要的行为？**

参考答案：`switch` 命中某个 `case` 后，会从那里开始顺序执行，直到遇到 `break` 或 `switch` 结束；没有 `break` 就会「贯穿」到后面的 `case`，把它们的分支代码也执行一遍。例如 `marker` 的 `break` 被删掉时，输出会依次出现 marker、eraser、rectangle……直到某个 `break`。想要共享代码时这是有用的：把多个 `case` 标签连续写在一起，只在最后一块写 `break`，前面的标签就会自然落到共享代码块。

**4. 为什么 `switch` 不能直接对 `std::string` 做分支？有哪些替代方案？**

参考答案：`case` 标签必须是编译期整型常量表达式，而 `std::string` 不是整型，所以 `switch (name)` 无法通过编译，报错为 `switch quantity not an integer`。替代方案有两种：用 `if/else if` 链比较字符串；或者先把字符串映射成整数（例如一个 `std::map<std::string,int>` 或枚举），再对整数做 `switch`。

**5. 三元运算符 `(a > b) ? a : b` 中，如果 `a` 是 `int`、`b` 是 `double`，结果的类型是什么？**

参考答案：编译期会对两个分支做「常用算术转换」，把 `int` 提升为 `double`，所以整个表达式的类型是 `double`。即使实际被选中的是 `a`，它也会先转换成 `double` 再成为结果。这就是课程里 `auto max = (a > 22) ? a : 22.5;` 推导出 `double` 的原因：转换方向由两侧类型的共同规则决定，而不是由「哪个分支被选中」决定。

**6. 把嵌套的 `if (green) { if (!police_stop) ... }` 改写成 `if (green && !police_stop)`，两者在任何输入下都等价吗？**

参考答案：在这个例子里等价，因为外层条件 `green` 与内层条件 `!police_stop` 互不依赖，合取后语义相同。但一般情形下不一定：如果内层条件依赖外层分支里才有效的变量（例如外层先算出一个值、内层再用它），就不能简单压平；另外 `&&` 会短路——左侧为假时右侧不求值，而嵌套写法里外层为假时内层同样不会执行，这一点两者一致。

## 与前后章的关系

本章是流程控制的第一半：只解决「走哪条路」。下一章（第 8 章）讲循环，解决「重复走多少次」；两者合起来构成所有命令式程序的骨架。再往后，第 15 章的函数参数与第 18 章的类方法都会大量复用这里的条件判断，而 `switch` 的类型限制也会在第 19 章的 `enum` 出现后变得更有用。
