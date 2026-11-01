---
slug: "17-templates-and-concepts"
title: "模板与 Concepts：从函数蓝图到编译期约束"
summary: "函数模板不是代码，而是编译器据以生成实际函数的蓝图；类型推导决定生成哪一份实例，显式模板实参可以覆盖它，特化可以替换默认实现，concepts 则把「这个类型必须支持什么」写进签名。"
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "templates", "concepts", "template-specialization", "cpp20"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 17 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=63699s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

这是 31 小时长视频的**第 17 章**，对应时间轴 17:41:39–20:17:38，是全课最长的一章。它从「重载写腻了」出发，依次讲函数模板、类型推导、显式实参、按引用传模板参数、模板特化，最后进入 C++20 的 concepts。

## 这一章在讲什么

重载的问题很具体：`max` 写五个版本，函数体一模一样。模板把「逻辑」抽出来一次，让编译器按调用时用的类型生成具体函数。

沿着这条线，本章回答五个问题：

1. 模板到底是什么？——**蓝图，不是代码**。
2. 编译器怎么知道生成哪一份？——**类型推导**。
3. 推导不适用时怎么办？——**显式模板实参**。
4. 某个类型的默认实现不对怎么办？——**模板特化**。
5. 怎样在签名里写清「这个类型必须支持什么」？——**concepts**。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 17:41:39 | 第一个函数模板：消除重载重复 |
| 17:43:45 | 模板实例如何生成 |
| 17:47:18 | VS Code：trying out function templates |
| 17:53:36 | 用 cppinsights 查看编译器生成的实例 |
| 17:55:21 | 只生成被调用到的实例 |
| 18:00:23 | 类型必须支持函数体中的操作 |
| 18:05:08 | 同一个 `T` 强制所有参数同类型 |
| 18:07:03 | 用调试器观察模板实例 |
| 18:14:14 | 反例：传指针时比较的是地址 |
| 18:19:46 | 模板类型推导 |
| 18:22:44 | 显式模板实参 |
| 18:35:22 | 模板参数按引用传递 |
| 18:38:02 | 按值与按引用两个模板重载 → 歧义 |
| 18:49:05 | 模板特化的动机 |
| 18:52:15 | 用 `strcmp` 写 `const char*` 特化 |
| 19:04:40 | concepts 简介（C++20 四大特性之一） |
| 19:06:53 | 标准库内置 concepts |
| 19:08:00 | 语法一：`requires` 子句 |
| 19:11:51 | 语法二：概念写在 `template<>` 里 |
| 19:12:06 | 语法三：概念写在 `auto` 前 |
| 19:13:02 | 语法四：`requires` 放在参数列表后 |
| 19:25:36 | 自定义 concept |
| 19:30:38 | VS Code：building your own concepts |
| 19:42:52 | requires 子句中的三类要求 |
| 19:44:45 | 简单要求 vs 嵌套要求 |
| 19:45:38 | 复合要求 |
| 19:59:32 | 用 `&&`、`||` 组合 concepts |
| 20:09:37 | concepts 与 `auto` 变量 |

## 函数模板：一份蓝图

### 从重复的重载开始

```cpp
int    maximum(int a, int b)    { return a > b ? a : b; }
double maximum(double a, double b) { return a > b ? a : b; }
```

两份函数体完全一样，只是类型不同。模板把类型抽成占位符：

```cpp
template <typename T>
T maximum(T a, T b) {
    return a > b ? a : b;
}
```

`T` 在返回类型和两个参数里出现三次，因此**这三处必须是同一个类型**。

### 模板不是代码

这一点课件反复强调：函数模板本身不是可执行代码，编译器在**看到调用**时才生成真正的函数：

```cpp
int x{5}, y{7};
auto r1 = maximum(x, y);          // 生成 maximum<int>
auto r2 = maximum(5.5, 78.7);     // 生成 maximum<double>
```

生成出来的东西叫**模板实例**（template instance）：

```cpp
// 编译器实际生成的（大致）
int maximum(int a, int b) { return a > b ? a : b; }
```

几个随之而来的事实：

- **按需生成**：从没调用过 `maximum<std::string>`，就不会生成字符串版本。
- **只生成一次**：同一个实例被多次调用，编译器复用已生成的那份。
- **可用工具观察**：cppinsights.io 会把推导后的代码显示出来；调试器的调用栈里也能看到 `maximum<int>` 这样的签名。

### 类型必须支持函数体的操作

```cpp
template <typename T>
T multiply(T a, T b) { return a * b; }

multiply(5, 7);          // 生成 multiply<int>，返回 35
multiply(5.1, 7.0);      // 生成 multiply<double>，返回 35.7
multiply(std::string{"a"}, std::string{"b"});   // 编译错误
```

报错是 `no match for 'operator*'`。模板本身不检查 `T` 能不能相乘，直到实例化时才暴露——**这就是下一节 concepts 要解决的问题**。

### 同一个 `T` 的限制

```cpp
maximum(4.5, 9);   // 错误：推导出 conflicting types for 'T'
```

`4.5` 推出 `double`，`9` 推出 `int`，两处冲突。要么把字面量写成 `9.0`，要么用显式模板实参（见下）。

### 反例：传指针

```cpp
int x{5}, y{7};
int* px{&x};
int* py{&y};

auto result = maximum(px, py);   // 生成 maximum<int*>，比较的是地址
```

两个地址谁大取决于变量在内存里的位置，与 `5`、`7` 谁大毫无关系。课件现场演示了结果返回 `5`——因为 `px` 的地址更大。**模板实例化了，但语义完全错了。**

## 类型推导与显式模板实参

### 默认：从实参推导

```cpp
template <typename T>
T maximum(T a, T b);

maximum(10, 23);   // T = int
maximum(5.5, 7.4); // T = double
```

编译器只看调用处实参的类型，没有其他线索。这是**模板类型推导**。

### 显式指定：`maximum<double>(...)`

```cpp
auto result = maximum<double>(4, 9);   // 强制生成 double 版本
```

尖括号里的类型告诉编译器「用这个 `T`」，于是允许实参类型不同——`int` 会隐式转换成 `double`：

```cpp
maximum<double>(a, d);   // a 是 int，d 是 double → 都转成 double
maximum<double>(a, e);   // e 是 std::string → 无法转成 double，编译错误
```

术语要分清：

| 术语 | 出现位置 | 例子 |
| --- | --- | --- |
| 模板参数（template parameter） | 函数声明/定义 | `template <typename T>` 里的 `T` |
| 模板实参（template argument） | 调用处 | `maximum<double>` 里的 `double` |

### 按引用传模板参数

默认按值，对于大对象会产生拷贝。可以在模板里直接写引用：

```cpp
template <typename T>
const T& maximum(const T& a, const T& b) {
    return a > b ? a : b;
}
```

- 用 `const T&` 避免拷贝，同时禁止在函数内修改；
- 训练器/调试器里能看到生成的实例是 `const double& maximum(const double&, const double&)`；
- 地址与外部相同，证明没有拷贝。

一个陷阱：**同名的按值版和按引用版不能共存**。

```cpp
template <typename T> T maximum(T a, T b);
template <typename T> const T& maximum(const T& a, const T& b);

maximum(5.5, 7.9);   // ambiguous：两个候选都能匹配
```

## 模板特化：为某个类型换实现

默认实例对 `const char*` 是做错的——它比较指针。要修正，就为这个类型单独写一份：

```cpp
template <>
const char* maximum<const char*>(const char* a, const char* b) {
    return (std::strcmp(a, b) > 0) ? a : b;
}
```

语法要点：

- `template <>`：空的尖括号，表示不引入新的模板参数；
- `maximum<const char*>`：显式写出特化的类型；
- 参数列表与主模板一致。

`strcmp` 的返回值正好可以直接用：大于 0 表示第一个字符串更大。

```cpp
const char* g{"wild"};
const char* h{"animal"};
std::cout << maximum(g, h);   // 有特化：wild；无特化：animal（比地址）
```

**没有特化时**，比较的是两个字符串字面量的地址，输出可能与字典序完全无关。

## Concepts：把约束写进签名

模板的报错历来难读：错误发生在实例化处，往往牵出一长串模板内部信息。concepts 让「类型必须满足什么」变成签名的一部分，违反时直接报「约束不满足」。

### 标准库内置的 concepts

```cpp
#include <concepts>

template <typename T>
requires std::integral<T>
T add(T a, T b) { return a + b; }
```

- `add(6, 7)`：`int` 是整型，通过；
- `add(11.1, 1.9)`：`double` 不满足 `std::integral`，编译错误，信息是 `use of function 'add' with unsatisfied constraints`。

常用内置 concepts：`std::integral`、`std::floating_point`、`std::same_as`、`std::convertible_to`。

### 四种写法

```cpp
// 1. requires 子句
template <typename T>
requires std::integral<T>
T add(T a, T b);

// 2. 直接放在模板参数列表
template <std::integral T>
T add(T a, T b);

// 3. 约束 auto
std::integral auto add(std::integral auto a, std::integral auto b);

// 4. requires 放在参数列表之后
template <typename T>
T add(T a, T b) requires std::integral<T>;
```

四种等价，按可读性选择；语法 2 最简洁，语法 4 适合约束依赖多个参数的场合。

### 自定义 concept

**用类型萃取定义**：

```cpp
template <typename T>
concept MyIntegral = std::is_integral_v<T>;
```

`std::integral` 在标准库里就是类似这样定义的。

**用 requires 表达式定义**：当约束不止一条，用 requires 块：

```cpp
template <typename T>
concept Multipliable = requires(T a, T b) {
    a * b;        // 只检查语法是否合法
};

template <typename T>
concept Incrementable = requires(T a) {
    a += 1;
    ++a;
    a++;
};
```

关键点：**requires 表达式只检查「这段表达式能否编译」，不检查结果的值**。

### 简单要求、嵌套要求、复合要求

```cpp
// 简单要求：只保证 size_t 相关表达式语法合法
template <typename T>
concept TinyType = requires(T t) {
    sizeof(T) < 4;        // 永远为合法语法 → 永远通过
};

// 嵌套要求：还要求表达式为真
template <typename T>
concept TinyTypeStrict = requires(T t) {
    sizeof(T) < 4;
    requires sizeof(T) < 4;
};

// 复合要求：约束表达式的返回类型
template <typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<int>;
};
```

课件的实验很能说明问题：`TinyType` 配上 `double`（8 字节）居然编译通过，因为 `sizeof(T) < 4` 本身是合法表达式；加上嵌套 `requires` 后才真正检查真假。

### 用逻辑运算符组合

```cpp
template <typename T>
requires std::integral<T> || std::floating_point<T>
T add(T a, T b);

template <typename T>
requires std::integral<T> && TinyTypeStrict<T>
T add(T a, T b);
```

`||` 表示「满足其一」，`&&` 表示「两个都要」。`long long` 是整型但不满足 `TinyType`（8 字节），正好用来验证 `&&`。

### concepts 与 `auto` 变量

```cpp
std::integral auto x = add(5, 8);      // 通过：返回 int
std::floating_point auto y = add(5, 8); // 失败：int 不是浮点
```

对字面量初始化，这种写法用处不大；但对函数返回值，它能在编译期确认「我拿到的是我想要的类型」。

## 本章结论

- 函数模板是蓝图，编译器按调用生成模板实例；只生成被用到的，且同一实例只生成一次。
- 模板体中的操作必须被实参类型支持，否则在实例化时报错。
- 同一个 `T` 强制所有出现处同类型；显式模板实参 `f<double>(...)` 可覆盖推导并允许隐式转换。
- 模板参数可写成 `const T&` 以避免拷贝；按值与按引用的同名模板不能共存。
- 模板特化 `template <>` 为特定类型替换默认实现，例如用 `strcmp` 比较 `const char*`。
- concepts 把约束写进签名，有四种等价语法，报错更清晰。
- 自定义 concept 可用类型萃取或 requires 表达式；requires 只检查语法，要检查值需嵌套 `requires`。
- concepts 可用 `&&`、`||` 组合，也可用于 `auto` 变量。

## 理解检验

**1. 为什么说「函数模板不是 C++ 代码」？这对编译产物意味着什么？**

参考答案：模板只是一份带类型占位符的蓝图，本身不生成可执行代码。编译器在看到具体调用时，才用实参类型替换占位符，生成真正的函数（模板实例）并放进目标文件。因此：(a) 没被调用过的类型不会生成任何代码；(b) 同一类型只生成一次并被复用；(c) 模板中的错误往往在实例化时才暴露，而不是定义时。

**2. `maximum(4.5, 9)` 为什么编译失败？给出两种修复方式。**

参考答案：两个参数分别推导出 `double` 和 `int`，而模板只有一个 `T`，出现 `conflicting types for 'T'`。修复一：让两个实参同类型，如 `maximum(4.5, 9.0)`；修复二：显式指定模板实参 `maximum<double>(4.5, 9)`，此时 `9` 隐式转换为 `double`。

**3. 对 `const char*` 调用 `maximum`，默认模板为什么给出错误结果？特化如何修正？**

参考答案：默认实例把 `T` 推导为 `const char*`，`a > b` 比较的是两个指针的地址，而不是字符串内容，因此结果取决于内存布局。特化 `template <> const char* maximum<const char*>(const char* a, const char* b)` 改用 `std::strcmp(a, b) > 0` 判断字典序，从而得到正确结果。编译器看到 `const char*` 实参时会优先选择这个更匹配的特化。

**4. 下面这个 concept 为什么拦不住 `double`？如何修正？**

```cpp
template <typename T>
concept TinyType = requires(T t) {
    sizeof(T) < 4;
};
```

参考答案：requires 表达式只检查花括号内语句的**语法合法性**。`sizeof(T) < 4` 对任何类型都是合法表达式（结果是 `bool`），所以 concept 恒为真，`double` 也能通过。修正方法是加一条嵌套要求，强制表达式求值为真：
```cpp
template <typename T>
concept TinyType = requires(T t) {
    requires sizeof(T) < 4;
};
```
这样 `double`（8 字节）就会失败。

**5. `requires std::integral<T> || std::floating_point<T>` 与 `requires std::integral<T> && std::floating_point<T>` 有什么区别？各举一个通过、一个失败的例子。**

参考答案：`||` 表示满足其中之一即可，`&&` 表示两个都必须满足。对 `||`：`int` 通过（整型），`double` 通过（浮点），`std::string` 失败（两者都不是）。对 `&&`：没有任何类型能同时是整型和浮点，所以所有类型都失败——这说明 `&&` 用于组合互补概念时通常是笔误，真正有用的是把「整型」与「尺寸约束」这类可同时满足的概念组合起来。

**6. 复合要求 `{ a + b } -> std::convertible_to<int>` 检查的是什么？**

参考答案：它检查两件事：`a + b` 必须是合法表达式；其结果的类型必须能转换为 `int`。例如 `char` 与 `char` 相加结果为 `int`，可转换，通过；`std::string` 与 `std::string` 相加结果是 `std::string`，不能转换为 `int`，失败。注意它检查的是类型层面的可转换性，不是运行时的值。

## 与前后章的关系

上一章的 lambda 让函数成为值，本章的模板让「一份逻辑服务多种类型」成为可能；concepts 则为模板补上编译期的契约。下一章进入类——从「蓝图」到「用户自定义类型」，模板参数随后会与类结合，形成类模板，这也是标准库容器的基础。
