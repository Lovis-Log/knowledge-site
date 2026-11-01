---
slug: "16-overloading-and-lambdas"
title: "函数重载与 Lambda：同名函数的挑选规则与匿名函数"
summary: "重载只允许参数列表不同，返回类型不参与签名；lambda 是一个没有名字的函数对象，用捕获列表拿到外部变量——按值捕获是副本，按引用捕获是别名。"
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "overloading", "lambda", "capture-list", "closures"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 16 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=59653s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

这是 31 小时长视频的**第 16 章**，对应时间轴 16:34:13–17:41:39。前半段讲函数重载：同一个名字、不同的参数列表，编译器按实参挑选；后半段讲 lambda：把函数写成一个可以赋值、可以直接调用的表达式。

## 这一章在讲什么

两个机制解决同一个问题——**让调用处的写法更自然**：

- **重载**让你写 `max(a, b)` 时不必关心 `a`、`b` 是 `int`、`double` 还是 `std::string_view`，编译器替你选。
- **lambda** 让你在需要函数的地方就地写一个，不必为了用一次而单独定义一个具名函数。

两者的共同前提都是第 14 章讲的**签名**：重载靠参数列表区分，lambda 的主体也是函数类型。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 16:34:13 | 重载规则：同名、参数列表不同 |
| 16:35:17 | 返回类型不参与区分 |
| 16:36:31 | 调用时按实参类型选重载 |
| 16:37:37 | VS Code：overloading with different parameters |
| 16:39:14 | 仅返回类型不同 → `cannot overload function distinguished by the return type alone` |
| 16:43:14 | 改变参数顺序、个数 |
| 16:47:06 | `std::string_view` 重载与字面量的隐式转换 |
| 16:48:52 | lambda 简介：匿名函数 |
| 16:49:51 | lambda 语法：捕获列表、参数、返回类型、函数体 |
| 16:52:15 | 用 `auto` 给 lambda 起名后调用 |
| 16:53:21 | 直接调用：在函数体后加 `()` |
| 16:54:19 | 带参数的 lambda |
| 16:55:07 | 返回值的 lambda 与嵌套在 `std::cout` 中 |
| 16:56:26 | 显式指定返回类型 `-> int` |
| 16:57:17 | VS Code：declaring and using lambda functions |
| 17:19:32 | lambda 小结 |
| 17:20:18 | 捕获列表：为什么需要 |
| 17:22:11 | 按值捕获：内部是副本 |
| 17:24:15 | 按引用捕获：内部是别名 |
| 17:25:16 | VS Code：capture lists |
| 17:34:01 | 捕获全部：`=` 与 `&` |
| 17:36:31 | VS Code：capture all |
| 17:40:21 | 下一章预告：函数模板 |

## 函数重载

### 规则：只有参数列表能区分

```cpp
int max(int a, int b) { return a > b ? a : b; }
int max(int a, int b) { return a > b ? a : b; }   // 错误：签名相同
```

编译器会直接拒绝：

```
cannot overload function distinguished by the return type alone
```

第 14 章已经说过：**签名 = 名字 + 参数列表，不含返回类型**。所以下面几种改法里，只有改参数列表是合法的：

| 改动 | 是否构成新重载 |
| --- | --- |
| 只改返回类型 | 否 |
| 只改参数名 | 否 |
| 改参数类型 | 是 |
| 改参数个数 | 是 |
| 改参数顺序（类型不同时） | 是 |

```cpp
int    max(int a, int b);
double max(double a, double b);
int    max(int a, double b);
int    max(double a, int b);
int    max(int a, int b, int c);
```

### 调用时如何选择

```cpp
int x{4}, y{9};
double a{5.4}, b{7.4};

std::cout << max(x, y) << "\n";   // int 重载
std::cout << max(a, b) << "\n";   // double 重载
```

编译器按实参的**类型**做匹配。注意两个细节：

1. **`auto result = max(x, y);`** 的结果类型由被选中的重载决定——这里是 `int`。
2. **隐式转换会参与匹配**。`max("hello", "world")` 会尝试把字符串字面量转成 `std::string_view`，因此调用 `string_view` 版本。

```cpp
int max(std::string_view a, std::string_view b) {
    return a > b ? 1 : -1;   // 仅为演示重载选择
}
```

这也是重载容易出问题的地方：如果多组重载都能通过隐式转换匹配，编译器在「歧义」时会报错，而不是随便挑一个。

> 课件提醒：能写出 `max(int,double)` 和 `max(double,int)` 不代表应该写。重载的价值是让调用处自然，不是展示语法。参数列表差异要有语义上的理由。

## Lambda：匿名函数

### 语法

```cpp
[capture](parameters) -> return_type { body }
```

四个部分按顺序：

| 部分 | 是否可省 | 说明 |
| --- | --- | --- |
| `[...]` 捕获列表 | 不可省（可空） | 让函数体访问外部变量 |
| `(...)` 参数列表 | 不可省（可空） | 与普通函数相同 |
| `-> T` 返回类型 | 可省 | 省略时由 `return` 语句推导 |
| `{...}` 函数体 | 不可省 | 具体做什么 |

### 声明后命名调用

单独写一个 lambda 只是「定义了一个对象」，不会执行：

```cpp
[]() {
    std::cout << "Hello World\n";
};                       // 声明了，但没调用
```

要反复调用，就把它赋给变量：

```cpp
auto greet = []() {
    std::cout << "Hello World\n";
};

greet();
greet();                 // 可以调用多次
```

`auto` 推导出的类型是编译器为这个 lambda 生成的**独一无二的闭包类型**——你写不出它的名字，所以只能用 `auto`。

### 直接调用

只调用一次时，在函数体后直接加 `()`：

```cpp
[]() {
    std::cout << "Hello World\n";
}();                     // 声明并立即调用
```

没有名字，也就没有第二次调用的机会。

### 带参数与返回值

```cpp
[](double a, double b) {
    std::cout << "a + b = " << a + b << "\n";
}(10.0, 5.0);

auto result = [](double a, double b) {
    return a + b;
}(10.0, 20.0);           // result == 30.0
```

最后一个写法值得注意：**整个 lambda 表达式是一个值**，可以直接放进 `std::cout`：

```cpp
std::cout << "sum = " << [](double a, double b) { return a + b; }(3.0, 4.0) << "\n";
```

### 显式返回类型

```cpp
auto f = [](double a, double b) -> int {
    return a + b;        // double 结果被转成 int
};

f(6.9, 3.5);             // 返回 10，而不是 10.4
```

省略 `-> T` 时，返回类型由 `return` 表达式推导（这里是 `double`）；写上 `-> int` 就强制转成 `int`。可以用 `sizeof(result)` 观察两者的差异：`int` 通常是 4 字节，`double` 是 8 字节。

## 捕获列表：lambda 如何看到外部变量

lambda 的函数体默认**看不到**外部作用域的局部变量：

```cpp
double a{10}, b{20};

auto f = []() {
    std::cout << a + b;   // 编译错误：a、b 未被捕获
};
```

gcc 的报错是 `'a' is not captured`。原因是 lambda 本质上是一个独立的类类型，外部变量对它而言并不在作用域内。

### 按值捕获

```cpp
double c{42};

auto f = [c]() {
    std::cout << "inner: " << c << "\n";   // 捕获时的副本
};

for (int i{0}; i < 5; ++i) {
    std::cout << "outer: " << c << "\n";
    f();
    ++c;
}
```

输出里 `outer` 从 42 递增到 46，`inner` 始终是 42。打印地址会看到两个不同的位置：**按值捕获在创建 lambda 的那一刻复制了一份**。

### 按引用捕获

```cpp
auto g = [&c]() {
    std::cout << "inner: " << c << "\n";
};
```

加一个 `&` 就变成引用：内外地址相同，外部改 `c`，内部立刻看到；内部改 `c`，外部也改变。

### 捕获全部

```cpp
[=]() { /* 所有用到的外部变量按值捕获 */ }
[&]() { /* 所有用到的外部变量按引用捕获 */ }
```

`=` 与 `&` 是简写，省去逐个列举。课件特意提醒：`&` 很危险——**如果 lambda 活得比外部变量久，引用会悬空**。捕获全部按引用只适合「lambda 的生命周期明显短于外部变量」的场合。

### 三种捕获对比

| 写法 | 内部拿到的是 | 外部修改是否影响内部 | 风险 |
| --- | --- | --- | --- |
| `[c]` | 副本 | 否 | 无（但副本可能过期） |
| `[&c]` | 引用 | 是 | 外部变量先销毁则悬空 |
| `[=]` | 所有用到的变量副本 | 否 | 无 |
| `[&]` | 所有用到的变量引用 | 是 | 同上，且不易察觉 |

## 本章结论

- 重载只允许参数列表不同：类型、个数、顺序；返回类型和参数名都不算。
- 调用时编译器按实参类型匹配，必要时插入隐式转换；多组同样匹配会报歧义。
- lambda 语法为 `[捕获](参数) -> 返回类型 { 函数体 }`，返回类型可省略。
- lambda 可以赋给 `auto` 变量反复调用，也可以在函数体后加 `()` 立即调用。
- 捕获列表让 lambda 访问外部变量：`[c]` 复制，`[&c]` 引用，`[=]` / `[&]` 全部捕获。
- 按引用捕获要保证 lambda 不会比被捕获的变量活得更久。

## 理解检验

**1. 下面哪几行可以同时存在？**

```cpp
int  max(int a, int b);
double max(int a, int b);
int  max(int a, int b, int c);
int  max(double a, int b);
```

参考答案：第 1 行与第 2 行签名相同（都是 `max(int,int)`），只有返回类型不同，不能共存；编译器会报 `cannot overload function distinguished by the return type alone`。第 3 行参数为三个 `int`，第 4 行参数为 `double,int`，签名都不同，可以与第 1 行共存。所以最终保留的是第 1、3、4 行。

**2. 调用 `max("hello", "world")` 时，如果同时存在 `max(std::string_view, std::string_view)` 与 `max(const char*, const char*)` 两个重载，会发生什么？**

参考答案：会选中 `max(const char*, const char*)`。字符串字面量的类型是 `const char[N]`，退化为 `const char*` 属于标准转换；转成 `std::string_view` 则是用户定义转换。重载决议先比较转换序列的优劣，标准转换优于用户定义转换，所以 `const char*` 版本胜出，不会产生歧义。只有当两个候选的转换序列无法分出高下时，编译器才报歧义错误。

**3. `auto f = [](double a, double b) -> int { return a + b; };` 调用 `f(6.9, 3.5)` 返回什么？去掉 `-> int` 呢？**

参考答案：带 `-> int` 时，`a + b` 先算得 `10.4`，再隐式转换成 `int`，结果是 `10`。去掉返回类型后由 `return` 表达式推导为 `double`，结果是 `10.4`。可以用 `sizeof` 观察：前者通常 4 字节，后者 8 字节。

**4. 为什么下面这段代码里 `inner` 一直打印 42？**

```cpp
double c{42};
auto f = [c]() { std::cout << c << "\n"; };
for (int i{0}; i < 5; ++i) { f(); ++c; }
```

参考答案：`[c]` 是按值捕获，lambda 在**创建时**复制了一份 `c`，此后函数体读的是那份副本。循环里的 `++c` 改的是外部变量，与副本无关，所以副本始终是 42。若改成 `[&c]`，内部读到的就是外部变量，会随循环递增。

**5. `[&]` 捕获全部按引用，什么情况下会出问题？**

参考答案：当 lambda 的生命周期超过被捕获的局部变量时。例如把一个 `[&]` 的 lambda 存起来、在函数返回后再调用，此时它引用的局部变量已经销毁，访问就是悬空引用（未定义行为）。按值捕获 `[=]` 没有这个问题。这也说明 `[&]` 只适合「调用发生在被捕获变量仍然存活期间」的场合。

## 与前后章的关系

上一章讲参数传递，本章的 lambda 把「函数」本身变成可以传递的值；下一章的函数模板则走向另一个方向——用一份代码生成多个具体函数，解决「重载写了十几份、函数体却完全一样」的重复问题。捕获列表与模板参数，是后续把 lambda 传给算法的两块基础。
