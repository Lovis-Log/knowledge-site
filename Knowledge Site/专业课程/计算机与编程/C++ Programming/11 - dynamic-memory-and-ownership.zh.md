---
slug: "11-dynamic-memory-and-ownership"
title: "动态内存：悬空指针、分配失败、泄漏与动态数组"
summary: "这一章讲三类悬空指针及其对策、new 失败时的异常与 nothrow 两种处理、delete 空指针的安全性，以及三种内存泄漏和动态数组 new[]/delete[] 的限制。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, dynamic-memory, dangling-pointer, memory-leak, heap]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 11 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=39924s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## 这一章在讲什么

这是 31 小时长视频的第 11 章，对应 **11:05:24–12:22:23**。

上一章引入了 `new` 与 `delete`，这一章处理它们带来的全部麻烦。讲者的组织方式很清晰：先列出**三类悬空指针**（指向无效地址的指针），再给出对应的三条纪律；然后是 `new` 分配失败时怎么办；接着是**内存泄漏**的三种典型场景；最后是**动态数组**——`new[]` 与 `delete[]`，以及它和栈数组的两个关键差别。

这一章几乎没有新语法，全是「怎么不把程序写崩」的工程经验。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 11:05:24 | 悬空指针的定义：指向已失效地址的指针 |
| 11:06:32 | 情形一：未初始化的指针 |
| 11:06:54 | 情形二：`delete` 之后继续使用 |
| 11:07:40 | 情形三：多个指针指向同一块内存 |
| 11:08:32 | 三条对策：初始化、归还后置空、主从指针 |
| 11:12:24 | VS Code 实操：三种情形逐一复现 |
| 11:24:20 | `new` 为什么会失败：堆不是无限的 |
| 11:26:26 | 方案一：`try` / `catch` 捕获 `std::bad_alloc` |
| 11:27:46 | 方案二：`new (std::nothrow)` 返回空指针 |
| 11:37:51 | 空指针安全：用 `if (p)` 检查后再使用 |
| 11:39:28 | 对空指针调用 `delete` 是安全的 |
| 11:45:27 | 内存泄漏：指针被重新赋值 |
| 11:46:52 | 内存泄漏：重复分配同一指针 |
| 11:48:03 | 内存泄漏：指针随作用域销毁 |
| 11:55:39 | 动态数组：`new double[n]` |
| 11:57:28 | 动态数组的初始化与部分初始化 |
| 11:59:04 | 动态数组不能用 `std::size` 与范围 for |
| 12:00:21 | VS Code 实操：分配、遍历、`delete[]` |

## 三类悬空指针

悬空指针（dangling pointer）指向的地址已经无效。课程列出三种来源：

### 情形一：未初始化

```cpp
int* p_number5;      // 内容是垃圾地址
*p_number5 = 55;     // 未定义行为
```

指针声明后没有赋值，它保存的是栈上残留的字节。这个地址可能属于别的变量、别的程序，或者操作系统。

### 情形二：`delete` 之后继续使用

```cpp
int* p_number1 {new int {67}};
delete p_number1;
*p_number1 = 55;     // 未定义行为：内存已经归还
```

`delete` 只归还内存，**不会清空指针本身**。指针仍然保存着旧地址，但这个地址已经不属于你。

这里有一个反直觉的现象：程序**有时候**看起来正常运行，输出还是 67。原因是那块内存暂时没被别人占用。但这不是保证——讲者在演示里连续运行几次，结果并不稳定。**「这次没崩」不等于代码正确。**

### 情形三：多个指针指向同一块内存

```cpp
int* p_number3 {new int {83}};
int* p_number4 {p_number3};   // 两个指针指向同一地址

delete p_number3;             // 内存已归还
std::cout << *p_number4;      // 读已释放的内存
```

两个指针都指向同一块堆内存。通过其中一个 `delete` 之后，另一个立刻变成悬空指针。

## 三条对策

### 对策一：声明时就初始化

```cpp
int* p_number5 {};                 // 空指针
int* p_number6 {new int {82}};     // 或直接分配
```

不知道指向哪里就先给 `nullptr`，用之前再检查：

```cpp
if (p_number6) {
    std::cout << *p_number6 << std::endl;
} else {
    std::cout << "Invalid address" << std::endl;
}
```

### 对策二：`delete` 之后立刻置空

```cpp
delete p_number7;
p_number7 = nullptr;
```

这样后续任何检查 `if (p)` 都能发现它无效，而不是悄悄读写一块已易主的内存。

### 对策三：主从指针

多个指针指向同一块内存时，指定一个**主指针**负责 `delete`，其余都是**从指针**，只读不释放。使用前先检查主指针：

```cpp
int* master {new int {382}};
int* slave {master};

if (master) {
    std::cout << *slave << std::endl;
}

delete master;
master = nullptr;

if (!master) {
    std::cout << "Memory already released" << std::endl;
}
```

这条纪律的核心是**所有权唯一**：一块内存只能有一个负责人。

## 当 `new` 失败

堆不是无限的。一次申请极大的内存，或在循环里不断 `new` 而不释放，都会让分配失败。默认情况下 `new` 失败会抛出 `std::bad_alloc`，程序若不捕获就会终止。

### 方案一：异常

```cpp
try {
    int* data {new int[100000000]};
    // 使用 data
    delete[] data;
} catch (const std::exception& ex) {
    std::cout << "Something went wrong: " << ex.what() << std::endl;
}
```

失败时控制流跳到 `catch`，程序继续运行。`ex.what()` 返回描述错误的字符串，通常是 `std::bad_alloc`。

### 方案二：`std::nothrow`

```cpp
#include <new>

int* data {new (std::nothrow) int[100000000]};
if (data) {
    // 分配成功
    delete[] data;
} else {
    std::cout << "Allocation failed" << std::endl;
}
```

`std::nothrow` 让 `new` 失败时返回 `nullptr` 而不是抛异常，适合不想引入异常处理的场景。

课程同时提醒：实践中 `new` 失败很罕见，所以很多代码根本不检查。但服务器这类长期运行的程序需要处理，否则一次失败就整体退出。

## 空指针安全

核心原则只有一句：**使用指针前，确认它持有有效地址。**

```cpp
int* p_number {};
if (p_number) {
    std::cout << *p_number << std::endl;
} else {
    std::cout << "Invalid address" << std::endl;
}
```

`if (p_number)` 等价于 `if (p_number != nullptr)`：指针可以隐式转换为 `bool`，空指针为假，非空为真。前者更简洁，两种写法都常见。

一个常被过度使用的地方是 `delete`：

```cpp
int* p_number1 {};
delete p_number1;        // 完全安全，什么也不做
```

**对空指针调用 `delete` 是合法的**，标准规定它不做任何事。所以不需要写成：

```cpp
if (p_number1) {         // 多余
    delete p_number1;
}
```

这一点值得记住：它让「释放后置空」的写法更自然——即使代码路径重复走到 `delete`，只要指针是空的就无害。

## 内存泄漏

泄漏是指**丢失了指向堆内存的指针**：内存仍被本程序占用，但程序再也无法访问它，也无法归还。

### 情形一：指针被重新赋值

```cpp
int* p_number {new int {67}};
int number {55};
p_number = &number;      // 原来那块堆内存失去了唯一的指针
```

从此没有任何指针指向那块内存，`delete` 也无从下手。

### 情形二：重复分配

```cpp
int* p_number1 {new int {55}};
p_number1 = new int {44};   // 第一块内存泄漏
delete p_number1;           // 只释放了第二块
```

### 情形三：指针随作用域销毁

```cpp
{
    int* p_number2 {new int {57}};
    // 作用域结束，p_number2 销毁，但它指向的堆内存不会自动释放
}
```

局部指针变量在栈上，离开作用域就消失；堆上的内存不会跟着消失。此时既没有指针能访问它，也没有指针能释放它。

课程强调泄漏的长期后果：服务器程序可能连续运行数月，泄漏会不断累积，最终耗尽堆，导致后续 `new` 失败甚至进程被杀。

## 动态数组

栈数组的大小必须是编译期常量（或至少是 `const`），而动态数组允许运行期决定大小：

```cpp
size_t size {10};

double* p_salaries {new double[size]};              // 未初始化
int* p_students {new (std::nothrow) int[size] {}};  // 全部置 0
int* p_scores {new (std::nothrow) int[size] {1, 2, 3, 4, 5}};  // 前五个赋值，其余 0
```

三种写法的差别只在初始化方式：不写花括号是未初始化（垃圾值），写 `{}` 是全部置 0，写部分初始值则剩余元素补 0——与栈数组的规则一致。

### 访问与释放

```cpp
for (size_t i {0}; i < size; ++i) {
    std::cout << p_scores[i] << std::endl;      // 下标
    // 或 *(p_scores + i)                      // 指针算术
}

delete[] p_salaries;
p_salaries = nullptr;
delete[] p_students;
p_students = nullptr;
delete[] p_scores;
p_scores = nullptr;
```

数组必须用 **`delete[]`**，不是 `delete`。混用是未定义行为。

### 两个关键限制

```cpp
std::cout << std::size(p_scores);        // 编译错误
for (auto s : p_scores) { /* ... */ }    // 编译错误
```

原因是：`p_scores` 的类型是 `int*`，**它已经退化为指针**，不再是数组对象。`std::size` 需要知道数组类型才能算出元素个数，范围 for 也需要数组或带 `begin()`/`end()` 的容器。指针本身不携带长度信息，所以两者都失效。

解决方法是自己保存长度：

```cpp
size_t count {10};
int* p_scores {new int[count] {1, 2, 3, 4, 5}};
for (size_t i {0}; i < count; ++i) {
    std::cout << p_scores[i] << std::endl;
}
```

对比之下，栈数组 `int scores[10]` 仍然可用 `std::size` 与范围 for，因为它还是数组对象。

> **一句话总结：** 指针失效有三种来源，对应初始化、置空、明确所有权三条纪律；`new` 可能失败，用异常或 `nothrow` 处理；泄漏的根源是丢失指针；动态数组用 `new[]`/`delete[]`，并且必须自己记住长度。

## 本章结论

- 悬空指针的三种来源：未初始化、`delete` 后继续使用、多指针共享内存。
- 三条对策：声明即初始化、`delete` 后置空、主指针唯一负责释放。
- `new` 失败默认抛 `std::bad_alloc`；`new (std::nothrow)` 改为返回空指针。
- 使用指针前用 `if (p)` 检查；对空指针 `delete` 是安全的，无需额外判断。
- 内存泄漏的三种场景：指针被覆盖、重复分配、指针随作用域销毁。
- 动态数组用 `new T[n]` 分配、`delete[]` 释放，大小可在运行期决定。
- 动态数组退化为指针，因此 `std::size` 与范围 for 都不可用，长度需要自己保存。

## 理解检验

**1. 悬空指针有哪三种来源？分别给出一个最小复现。**

参考答案：第一，未初始化的指针：`int* p; *p = 55;`，`p` 里是垃圾地址。第二，`delete` 之后继续使用：`int* p {new int{67}}; delete p; *p = 55;`，内存已归还但指针未置空。第三，多个指针指向同一块内存：`int* a {new int{83}}; int* b {a}; delete a; std::cout << *b;`，`b` 在主指针释放后失效。

**2. 为什么「使用已释放指针」有时看起来没有崩溃？这说明代码正确吗？**

参考答案：`delete` 只是把内存归还给分配器，并不会立刻抹掉内容，也不会使指针变成空。若这块内存还未被重新分配，读到的仍是旧值，程序看起来「正常」。但这是未定义行为：内存随时可能被其他分配复用，读到垃圾、崩溃或破坏数据都可能发生，多次运行结果也可能不同。所以「这次没崩」不能作为正确性的证据。

**3. `new` 失败时，`try`/`catch` 与 `new (std::nothrow)` 两种处理方式有什么区别？各适合什么场景？**

参考答案：默认的 `new` 在失败时抛出 `std::bad_alloc`，不捕获就会终止程序；`try`/`catch` 捕获后可以继续运行并给出提示，适合项目已经统一使用异常处理的情况。`new (std::nothrow)` 则要求 `new` 不抛异常，失败时返回 `nullptr`，调用方用 `if (data)` 判断即可，适合不想引入异常、或局部处理分配失败的场景。两者都能避免「一次分配失败就整体崩溃」。

**4. 对空指针调用 `delete` 会发生什么？为什么这会影响写代码的方式？**

参考答案：对空指针调用 `delete` 是合法的，标准规定它什么也不做，不会崩溃。因此不需要在 `delete` 之前写 `if (p)` 检查。受益最大的是「释放后立即置空」的写法：即使某条代码路径重复执行 `delete`，只要指针已经被置空，重复调用也安全；这减少了分支，也让清理逻辑更简单。

**5. 内存泄漏的三种典型场景是什么？为什么最后一种最隐蔽？**

参考答案：一，指针被重新赋值，原本指向的堆内存失去唯一入口；二，对同一个指针再次 `new`，前一次分配的内存失去指针；三，指针是局部变量，作用域结束时指针销毁，而它指向的堆内存不会自动释放。第三种最隐蔽，因为代码里看不出「覆盖」或「重复分配」，泄漏发生在作用域边界处，而且局部指针本身在栈上，看起来「正常销毁」了。

**6. 动态数组为什么不能用 `std::size` 和范围 for？应该怎么补足？**

参考答案：`new T[n]` 返回的是 `T*`，它在类型上已经是指针，不再是数组对象。`std::size` 依赖数组类型来推导元素个数，范围 for 需要数组或提供 `begin()`/`end()` 的容器；指针两者都不满足，所以编译失败。补足办法是自己保存长度：用变量记录 `n`，再用传统 `for` 加下标（或指针算术）遍历。栈数组 `int a[10]` 仍然是数组对象，因此两种写法都能用。

**7. 释放动态数组为什么必须用 `delete[]` 而不是 `delete`？**

参考答案：`new T[n]` 分配的是「数组」，分配器除了元素本身还要记录元素个数，以便逐个调用析构函数并正确释放整块内存。`delete[]` 会按数组方式处理：析构每个元素并释放整个块；`delete` 只按单个对象处理，二者混用是未定义行为，可能只释放一部分或破坏分配器的内部记录。规则就是 `new` 配 `delete`、`new[]` 配 `delete[]`。

## 与前后章的关系

这一章把第 10 章引入的 `new`/`delete` 用到了边界：失败、悬空、泄漏、数组。下一章（第 12 章）讲引用——一种不能为空、不能改指向的「指针」，它能绕开本章一半的麻烦。再往后，第 18 章的类会引入构造函数与析构函数，把「分配与释放必须成对」这件事交给编译器自动完成，这正是本章这些手工纪律的最终归宿。
