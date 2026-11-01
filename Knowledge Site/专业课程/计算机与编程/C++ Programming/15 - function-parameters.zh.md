---
slug: "15-function-parameters"
title: "函数参数与返回值：值、指针、引用与输出参数"
summary: "按值传递给的是副本，按指针与按引用才能改到调用者的变量；把参数当输出通道是 C 风格接口的常见做法。返回值默认也是拷贝，但编译器会用返回值优化把拷贝省掉。"
updatedAt: "2026-11-01"
content_type: "video-course"
categories: [software-engineering]
tags: ["cpp", "functions", "pass-by-value", "pass-by-reference", "rvo"]
sources:
  - kind: "video"
    title: "C++ Programming Course - Beginner to Advanced（第 15 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=56549s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: "2022-02-17"
---

这是 31 小时长视频的**第 15 章**，对应时间轴 15:42:29–16:34:13。上一章留下一个问题：按值传递只给副本，那怎样从函数里改到调用者的变量？这一章给出三种传递方式、一种输出通道，以及返回值的拷贝语义。

## 这一章在讲什么

数据的流动有两个方向：

- **进去**：实参 → 形参。三种方式——按值、按指针、按引用。
- **出来**：函数 → 调用者。两种方式——`return`，或者把参数当「输出通道」。

一条主线贯穿全章：**能不能改到原变量，取决于你拿到的是副本、地址，还是别名。** 课件反复用同一个例子 `say_age` 对比三者的内存地址，把这一点讲成了可观察的现象。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 15:42:29 | 按值传递：函数拿到副本 |
| 15:45:11 | VS Code：pass by value，对比函数内外的地址 |
| 15:47:57 | 打印 `age` 前后的值，证明原变量未变 |
| 15:50:29 | 按指针传递：形参是指针，调用时传地址 |
| 15:53:11 | VS Code：pass by pointer |
| 15:56:09 | 忘记解引用的踩坑现场 |
| 15:57:45 | 按引用传递：形参是引用，调用时直接传变量 |
| 15:59:23 | VS Code：pass by reference，内外地址相同 |
| 16:03:26 | 从函数取出数据：输出参数 |
| 16:03:56 | 输入参数 + 输出参数（`max_str`、`max_int`、`max_double`） |
| 16:08:04 | VS Code：input and output parameters |
| 16:14:17 | 用指针作输出参数的版本 |
| 16:17:48 | 通过返回值取数据 |
| 16:18:57 | 局部变量与返回值的生命周期 |
| 16:21:28 | 返回值优化：编译器省掉拷贝 |
| 16:23:46 | VS Code：returning from functions by value |
| 16:32:34 | 下一章预告：函数重载 |

## 按值传递：给的是副本

```cpp
void say_age(int age) {
    ++age;
    std::cout << "Hello you are " << age << " years old\n";
}

int main() {
    int age{23};
    std::cout << "before call: " << age << " at " << &age << "\n";
    say_age(age);
    std::cout << "after call:  " << age << " at " << &age << "\n";
}
```

输出：

```
before call: 23 at 0x...dec
Hello you are 24 years old
after call:  23 at 0x...dec
```

函数内部打印的地址是 `0x...dc0`，外部是 `0x...dec`——两个不同的内存位置。`++age` 改的是副本，函数返回时副本销毁。

> **为什么默认按值**：对 `int`、`double` 这类小的基本类型，拷贝的代价几乎为零，而且函数无法意外修改调用者的数据。默认选择是安全的。

## 按指针传递：给的是地址

```cpp
void say_age(int* age) {      // 形参是指针
    ++(*age);                 // 必须解引用才能改到原变量
    std::cout << "Hello you are " << *age << " years old\n";
}

int main() {
    int age{23};
    say_age(&age);            // 调用时传地址
    std::cout << "after call: " << age << "\n";   // 24
}
```

三处语法必须对齐：

| 位置 | 写法 | 原因 |
| --- | --- | --- |
| 声明 | `void say_age(int* age);` | 形参类型是指针 |
| 定义 | `void say_age(int* age) { ... }` | 同上 |
| 调用 | `say_age(&age);` | 指针里要存地址 |
| 使用 | `*age` | 通过解引用访问原变量 |

课件现场漏写了一个解引用（打印时写成 `age` 而不是 `*age`），编译器不报错但输出不对——**指针忘记解引用是这类代码最常见的错误**。

## 按引用传递：给的是别名

```cpp
void say_age(int& age) {      // 形参是引用
    ++age;                    // 直接改，无需解引用
    std::cout << "Hello you are " << age << " years old\n";
}

int main() {
    int age{23};
    say_age(age);             // 调用时直接传变量
    std::cout << "after call: " << age << "\n";   // 24
}
```

引用是变量的**真正的别名**：函数内 `&age` 与 `main` 里的 `&age` 是同一个地址。相比指针，引用省掉了两处噪音——调用时不用 `&`，使用时不用 `*`。

### 三种方式的对比

| 方式 | 形参写法 | 调用写法 | 能否改原变量 | 典型用途 |
| --- | --- | --- | --- | --- |
| 按值 | `int age` | `say_age(age)` | 不能 | 小对象、只读输入 |
| 按指针 | `int* age` | `say_age(&age)` | 能（需 `*`） | 可选参数（可传 `nullptr`）、C 接口 |
| 按引用 | `int& age` | `say_age(age)` | 能 | 输出参数、大对象只读输入用 `const&` |

现代 C++ 的默认建议：**能按引用就不要按指针**，因为引用不可能为空，语义更清楚；只有「参数可以缺席」时才用指针加 `nullptr`。

## 输出参数：把参数当出口

C 语言没有引用，函数只能返回一个值。当需要「同时返回多个结果」时，惯用做法是把额外的结果写进参数：

```cpp
void max_str(const std::string& input1,
             const std::string& input2,
             std::string& output) {
    if (input1 > input2) output = input1;
    else                 output = input2;
}
```

三个参数的角色一眼可见：

- 前两个是 **`const` 引用**：只读输入，避免拷贝大字符串；
- 第三个是 **非 `const` 引用**：输出通道，函数内写入、调用者可见。

```cpp
std::string out;
std::string s1{"Alabama"};
std::string s2{"Bellevue"};
max_str(s1, s2, out);          // out == "Bellevue"
```

如果把第三个参数也标成 `const`，函数体的赋值会直接编译失败——**`const` 就是在这里守住「输入参数不被改动」这条规矩的**。

### 用指针作输出参数

同样的模式可以换成指针：

```cpp
void max_double(const double& input1,
                const double& input2,
                double* output) {
    if (input1 > input2) *output = input1;
    else                 *output = input2;
}

double out{};
max_double(45.8, 6.9, &out);   // 调用时传地址
```

这就是很多 C 接口的样子：返回值表示成功/失败，真正的结果经由指针参数带出。读这类代码时，**看到非 `const` 指针参数，先怀疑它是输出参数**。

### 什么时候该用返回值

如果只需要一个结果，`return` 更自然：

```cpp
int sum(int a, int b) {
    int result = a + b;    // 局部变量
    return result;
}
```

`result` 是函数内的局部变量，函数结束即销毁；返回时它的值被**拷贝**到调用者的变量里。课件通过打印两边的地址证明这一点：函数内 `0x...dac`，`main` 里 `0x...de4`，确实是两块内存。

## 返回值优化：默认拷贝，但编译器会插手

对于基本类型，拷贝无所谓；对于 `std::string` 这种可能很长的对象，拷贝一次就是一次分配。

```cpp
std::string add_str(const std::string& s1, const std::string& s2) {
    std::string result = s1 + s2;
    std::cout << "inside:  " << &result << "\n";
    return result;
}

int main() {
    std::string a{"hello"}, b{"world"};
    std::string out = add_str(a, b);
    std::cout << "outside: " << &out << "\n";
}
```

两个地址**相同**。按语言规则，`return result;` 是按值返回，应该产生拷贝；但编译器看到局部变量 `result` 在函数返回后立刻销毁，就直接在调用者提供的位置上构造它，省掉一次拷贝。这叫**返回值优化**（RVO / NRVO）。

课件给出的结论值得记住：

> **不要依赖「返回值一定发生拷贝」这个假设。** 编译器发现能做得更好时，就会优化掉拷贝。代码的正确性不应建立在「这里一定有一次深拷贝」之上。

## 本章结论

- 按值传递给副本，函数内修改不影响调用者；小类型默认按值即可。
- 按指针传递传地址，使用时必须解引用；指针可以为 `nullptr`，适合「参数可缺席」。
- 按引用传递是真正的别名，调用与使用都无需 `&`/`*`，是现代 C++ 的首选。
- 输入参数用 `const`（大对象用 `const&`），输出参数用非 `const` 引用或指针，角色一目了然。
- 多个结果可以靠输出参数带出，这是 C 风格接口的常见形态。
- `return` 默认按值返回，但编译器会做返回值优化；不要依赖拷贝发生。

## 理解检验

**1. 三个 `say_age` 版本分别在什么情况下能改到 `main` 里的 `age`？**

参考答案：`void say_age(int age)` 不能，因为函数拿到的是副本；`void say_age(int* age)` 能，前提是调用时传 `&age`，并在函数内写 `++(*age)`；`void say_age(int& age)` 能，引用是原变量的别名，直接 `++age` 即可。三者的区别不在「能不能」，而在「拿到的是副本、地址还是别名」。

**2. 为什么输出参数不能标 `const`？输入参数为什么最好标 `const`？**

参考答案：输出参数要在函数体内被赋值，`const` 引用或 `const` 指针禁止写入，赋值会直接编译失败。输入参数只读，标 `const` 把「不修改」写进类型里：函数体一旦误写就编译报错，调用者也因此知道传进去的值不会被改。对大对象（如 `std::string`）用 `const&`，既避免拷贝又保证只读。

**3. 下面这个函数有什么问题？**

```cpp
void max_of(int a, int b, int out) {
    out = (a > b) ? a : b;
}
```

参考答案：`out` 是按值传递，函数内改的是副本，函数返回后副本销毁，调用者的变量不会得到结果。应改为 `int& out`（或 `int* out` 并在调用时传地址、函数内解引用）。此外该函数没有任何返回值，调用者也无从得知失败与否。

**4. 指针作参数时，最常见的错误是什么？编译器会拦住它吗？**

参考答案：最常见的是忘记解引用，例如把 `++(*age)` 写成 `++age`——后者移动的是指针本身，不是它指向的值。编译器通常不会报错（类型上合法），只是行为错误，往往表现为输出不对或指针跑到数组外。这也是优先使用引用的理由之一：引用没有「解引用」这一步，少一类错误。

**5. 为什么 `add_str` 返回 `std::string` 时，函数内外的地址可能相同？这与「按值返回」矛盾吗？**

参考答案：不矛盾。按值返回是语言层面的语义，编译器必须让调用者得到一个独立可用的对象；但当它发现返回的是即将销毁的局部变量时，可以直接在调用者的存储位置上构造该对象，省去拷贝。这就是返回值优化（RVO/NRVO），属于「as-if」规则允许的优化：可观察行为不变。代码不应依赖「这里发生过一次拷贝」。

## 与前后章的关系

上一章讲清楚「按值传递只给副本」，本章把替代方案补齐：指针、引用、输出参数与返回值。下一章讨论函数重载——同一个函数名配不同的参数列表，编译器按实参类型挑选最合适的那一个。理解了签名与参数类型，重载决议才有基础。
