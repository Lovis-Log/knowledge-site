---
slug: "18-classes-constructors-methods"
title: "类、构造与析构：从圆柱体到 this 指针"
summary: "用 Cylinder 类建立成员变量与成员函数的分工，讲清 public/private 默认规则、构造函数与编译器默认构造、setter/getter、多文件拆分与 include guard、用指针管理对象、析构函数的调用时机与逆序销毁，以及 this 指针的三种用法。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, classes, constructors, destructors, this-pointer, header-files]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 18 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=73058s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

本章是 31 小时长视频的第 18 章，对应 **20:17:38–22:33:31**。前面一直在用「函数 + 结构体」写程序；从这一章起，数据和行为被装进同一个类型，正式进入面向对象。

## 这一章在讲什么

课程用一个圆柱体作为贯穿例子：圆柱由半径 $r$ 与高 $h$ 决定，可以算底面积 $\pi r^2$、体积 $\pi r^2 h$。这正好对应类的两个部分：

- **成员变量**：描述对象「是什么」，这里是 `base_radius`、`height`；
- **成员函数（方法）**：描述对象「能做什么」，这里是 `volume()`。

本章沿着这个例子依次解决六个问题：类怎么声明、对象怎么构造、外部怎么安全地读写数据、代码怎么拆文件、对象怎么用指针管理、对象什么时候被销毁。最后讲 `this` 指针，它是成员函数内部指向「当前对象」的句柄。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 20:17 | 用 Cylinder 定义第一个类；public/private 与默认私有 |
| 20:37 | 构造函数：无返回类型、与类同名、可带参数；编译器默认构造 |
| 20:53 | `= default` 让编译器生成默认构造 |
| 20:59 | setter 与 getter：在私有成员外提供受控接口 |
| 21:09 | 拆成多个文件：`constants.h`、`cylinder.h`、`cylinder.cpp`、include guard |
| 21:30 | 用指针管理对象：栈对象地址、`new`/`delete`、`->` |
| 21:42 | 析构函数：何时被调用、为什么需要释放资源 |
| 22:05 | 构造与析构的调用顺序：构造正序、析构逆序 |
| 22:11 | `this` 指针：打印地址、解决同名冲突、链式调用 |

## 类的声明：成员变量与成员函数

```cpp
const double PI {3.14159265358979323846};

class Cylinder {
public:
    double volume() {
        return PI * base_radius * base_radius * height;
    }

private:
    double base_radius {0.0};
    double height {0.0};
};
```

几个必须记住的规则：

1. **类定义末尾要有分号**。少写一个 `;`，编译器会报出一条看起来毫不相干的错误。
2. **`class` 的成员默认是 private**；`struct` 默认是 public（第 19 章展开）。
3. `public:` 之后直到下一个访问说明符之前，全部是公开的；`private:` 同理。
4. 成员函数写在类体内时，可以直接使用成员变量，无论它们是 public 还是 private——因为函数本身就在类的作用域里。

如果在 `main` 里访问 `cylinder1.base_radius`，会得到类似

```text
error: 'double Cylinder::base_radius' is private within this context
```

这正是封装的第一次体现：类内部可以随意使用自己的数据，类外部必须走公开接口。

### 成员变量不能是引用

成员变量可以是普通变量，也可以是指针，但**不能是引用**。原因是引用创建时必须绑定到一个对象，而类在声明成员时还没有对象可绑；声明成员时「先留空、以后再赋值」是常态，引用做不到这一点。

## 构造函数：对象如何被创建

构造函数是编译器在创建对象时自动调用的特殊成员函数，特点很明确：

- **没有返回类型**（连 `void` 都不写）；
- **名字与类名相同**；
- 可以有参数，也可以没有；
- 通常用来把成员变量初始化到可用状态。

```cpp
class Cylinder {
public:
    Cylinder() {                 // 默认构造：不带参数
        base_radius = 2.0;
        height = 2.0;
    }

    Cylinder(double radius_param, double height_param) {  // 带参构造
        base_radius = radius_param;
        height = height_param;
    }

    double volume() { return PI * base_radius * base_radius * height; }

private:
    double base_radius {1.0};
    double height {1.0};
};
```

调用时，`Cylinder c1;` 走无参构造；`Cylinder c2(10.0, 4.0);` 走带参构造。带参构造的参数是**按值传递**的，函数体里拿到的是副本——对 `double` 这种基本类型无所谓，但对大对象就要考虑引用（第 15 章）。

### 编译器会自动补一个默认构造

如果一个类**完全没有**写任何构造函数，编译器会自动生成一个「空的默认构造函数」：不带参数，函数体为空。所以下面这段能编译：

```cpp
class Cylinder {
public:
    double volume() { /* ... */ }
private:
    double base_radius {1.0};
    double height {1.0};
};

Cylinder c1;   // 编译器生成的默认构造被调用，成员用花括号初值
```

但**一旦你自己写了任意一个构造函数**，编译器就不再生成默认构造。此时 `Cylinder c1;` 会报错：

```text
error: no matching function for call to 'Cylinder::Cylinder()'
```

如果既想自定义构造、又想保留无参构造，可以显式写一个空的，或者用 C++11 的语法让编译器生成：

```cpp
Cylinder() = default;
```

`= default` 的意思不是「什么都不做」，而是「请编译器按默认规则生成」，它比手写空函数更清晰，也不会阻止编译器做优化。

### 构造函数必须是 public

构造函数若放在 private 区，外部就无法创建对象，编译器会报 `is inaccessible`。只有一种情况例外：单例模式等设计会故意把构造函数设为私有——那属于后续话题。

## setter 与 getter：把成员变量保护起来

把成员变量设为 private 后，外部仍然需要读写它们。标准做法是提供一对公开函数：

```cpp
class Cylinder {
public:
    double get_base_radius() const { return base_radius; }
    double get_height() const { return height; }

    void set_base_radius(double radius_param) { base_radius = radius_param; }
    void set_height(double height_param) { height = height_param; }

private:
    double base_radius {1.0};
    double height {1.0};
};
```

注意几点：

- setter/getter 必须放在 **public** 区，否则外部调用会得到 `is private within this context`。
- getter 加上 `const`，表示它不修改对象；这是好习惯，也让 const 对象能够调用它。
- getter 按值返回时，调用方拿到的是**副本**，改副本不会影响原对象。需要修改必须走 setter。

这套接口的价值在后面的继承里会更明显：外部只依赖「能问半径、能改半径」，不依赖内部到底怎么存。

## 把类拆到多个文件

所有代码堆在 `main.cpp` 里很快就会失控。标准的拆分方式是：

```text
constants.h      // const double PI
cylinder.h       // 类声明（成员变量、函数原型）
cylinder.cpp     // 成员函数的实现
main.cpp         // 只负责使用
```

`cylinder.h`：

```cpp
#ifndef CYLINDER_H
#define CYLINDER_H

class Cylinder {
public:
    Cylinder();
    Cylinder(double radius_param, double height_param);
    double volume() const;
    double get_base_radius() const;
    void set_base_radius(double radius_param);

private:
    double base_radius {1.0};
    double height {1.0};
};

#endif
```

`cylinder.cpp`：

```cpp
#include "cylinder.h"
#include "constants.h"

Cylinder::Cylinder() = default;

Cylinder::Cylinder(double radius_param, double height_param)
    : base_radius{radius_param}, height{height_param} {}

double Cylinder::volume() const {
    return PI * base_radius * base_radius * height;
}
```

三个新语法：

1. **`::` 作用域解析运算符**：`Cylinder::volume` 表示「`Cylinder` 类里的 `volume`」，告诉编译器这是类内声明的那个函数的实现。
2. **初始化列表** `: base_radius{...}, height{...}`：在进入函数体之前完成初始化，比在函数体里赋值更直接。
3. **头文件保护**（include guard）：

```cpp
#ifndef CYLINDER_H
#define CYLINDER_H
// ... 内容 ...
#endif
```

预处理阶段会把 `#include` 的内容原样复制进来。如果 `cylinder.h` 里又包含了 `constants.h`，而 `main.cpp` 也直接包含了 `constants.h`，同一份定义就会出现两次：

```text
error: redefinition of 'const double PI'
```

`#ifndef / #define / #endif` 让第二次包含直接跳过。现代 C++ 也可以写 `#pragma once`，效果相同。

### 一个容易踩的坑：头文件里留了实现

把成员函数搬到 `.cpp` 后，头文件里必须只留**声明**：

```cpp
double volume() const;        // 对
double volume() const { ... } // 错：头文件中还有定义
```

两边都保留定义时，编译能过，链接阶段会报：

```text
multiple definition of 'Cylinder::volume() const'
```

链接器不知道该用哪一个。这个错误很难一眼看出，因为问题出在「两份定义」而不是某一行语法。

## 用指针管理对象

对象可以放在栈上，也可以放在堆上：

```cpp
Cylinder c1(10.0, 3.0);              // 栈对象

Cylinder* p_c1 = &c1;                // 指向栈对象
std::cout << p_c1->volume() << "\n"; // -> 自动解引用

Cylinder* p_c2 = new Cylinder(100.0, 10.0); // 堆对象
std::cout << p_c2->volume() << "\n";
delete p_c2;                          // 必须手动释放
```

`->` 运算符等价于「先解引用，再用 `.`」：

```cpp
(*p_c1).volume();   // 等价写法，括号不能省
```

`*p_c1.volume()` 是错的，因为 `.` 的优先级高于 `*`，会先算 `p_c1.volume()`。

用 `new` 创建的对象不会自己消失，必须配对的 `delete`。忘记 `delete` 就是内存泄漏；对同一个指针 `delete` 两次则是未定义行为，可能直接崩溃。

## 析构函数：对象如何被销毁

析构函数在对象生命结束时由编译器调用，语法是在类名前加 `~`：

```cpp
class Dog {
public:
    Dog(std::string_view name) : m_name{name} {
        m_age = new int{2};          // 在堆上分配
    }

    ~Dog() {
        delete m_age;                // 释放构造时分配的内存
        m_age = nullptr;
    }

private:
    std::string m_name;
    int* m_age {nullptr};
};
```

规则：

- 析构函数**不能有参数**，也不能重载；
- 没有返回值；
- 一个类只能有一个析构函数。

### 析构函数在什么时候被调用

1. **栈对象离开作用域**：函数结束、代码块结束时；
2. **对堆对象执行 `delete`**：`delete p;` 会先调用析构，再释放内存；
3. **对象按值传给函数**：函数内部有一份副本，函数返回时副本析构；
4. **函数按值返回局部对象**：可能产生一份额外副本并析构，但编译器常做返回值优化（RVO），所以不保证能看到这次调用。

第 3 条有一个必须警惕的后果：默认的拷贝是**逐成员浅拷贝**。如果成员里有裸指针，两个对象会指向同一块堆内存，析构时各 `delete` 一次，就是双重释放。要正确处理，需要自定义拷贝构造与拷贝赋值，或者改用智能指针（后续章节）。

## 构造与析构的顺序

同一作用域里创建多个对象时：

```cpp
Dog d1("one"), d2("two"), d3("three");
```

输出顺序是：

```text
Dog constructor called for one
Dog constructor called for two
Dog constructor called for three
Dog destructor called for three
Dog destructor called for two
Dog destructor called for one
```

**构造按声明顺序，析构严格逆序。** 这像叠盘子：先放的在最下面，最后放的先拿走。编译器这样安排，是因为后创建的对象可能依赖先创建的对象；先销毁依赖者，才不会留下悬空引用。

## this 指针

`this` 是编译器在每个非静态成员函数里隐式传入的指针，指向**当前正在被操作的对象**。它有三种典型用法。

### 1. 打印当前对象的地址

```cpp
void print_info() const {
    std::cout << "object at " << this << "\n";
}
```

没有 `this` 的话，只有调用方才知道对象地址；有了它，成员函数内部也能拿到自己。

### 2. 区分同名参数与成员变量

```cpp
void set_name(std::string_view name) {
    this->name = name;   // 左边是成员，右边是参数
}
```

如果不写 `this->`，`name = name;` 只是把参数赋给自己。编译器可能接受这种写法而不报错，但它什么也没做——这是一个非常隐蔽的 bug，因为代码能编译、能运行，只是数据没变。

### 3. 实现链式调用

让 setter 返回当前对象的引用（或指针），就能连续调用：

```cpp
class Dog {
public:
    Dog* set_name(std::string_view n) {
        this->name = n;
        return this;
    }
    Dog* set_breed(std::string_view b) {
        this->breed = b;
        return this;
    }
    Dog* set_age(int a) {
        this->age = a;
        return this;
    }

private:
    std::string name;
    std::string breed;
    int age {0};
};

Dog* p = new Dog();
p->set_name("Fluffy")->set_breed("Shepherd")->set_age(4);
```

也可以返回引用：

```cpp
Dog& set_name(std::string_view n) { this->name = n; return *this; }
```

此时调用方用 `.`：`d.set_name("Fluffy").set_breed("Shepherd");`。区别只在于句柄是「指针」还是「引用」，链式调用的本质都是「返回自己，让下一个函数继续作用在同一个对象上」。

## 本章结论

- `class` 成员默认 private；`struct` 默认 public。
- 成员变量可以是值或指针，不能是引用。
- 构造函数无返回类型、与类同名；写了任意构造函数后，编译器不再生成默认构造，需要时用 `= default`。
- setter/getter 必须 public；getter 加 `const`，按值返回得到副本。
- 多文件组织：头文件放声明与 include guard，`.cpp` 放实现，用 `::` 关联。
- 堆对象必须 `delete`；`->` 等价于 `(*p).`。
- 析构函数无参数、不可重载；构造正序、析构逆序。
- `this` 指向当前对象，可用于打印地址、消除同名歧义、实现链式调用。

## 理解检验

**1. 为什么类定义末尾那个分号不能省？如果省了会发生什么？**

参考答案：类定义是一条声明语句，语法上必须以分号结束，和 `int x;` 一样。省略后，编译器会把下一条语句当成类定义的一部分来解析。例如紧接着写 `int main() {`，编译器会报出类似「expected ';' after class definition」或一大串与 `main` 无关的错误。错误信息往往指向后面的行，所以看到莫名其妙的报错时，先回头看上一个类定义的分号。

**2. 一个类只写了带参构造 `Cylinder(double, double)`，此时写 `Cylinder c;` 为什么编译失败？怎样恢复无参构造？**

参考答案：只要用户声明了任意构造函数，编译器就不再隐式生成默认构造函数。`Cylinder c;` 需要无参构造，而类里只有带两个参数的版本，于是报 `no matching function for call`。恢复方式有两种：显式写 `Cylinder() {}`，或者写 `Cylinder() = default;` 让编译器按默认规则生成。后者语义更清楚，也保留编译器优化的空间。

**3. `cylinder1.base_radius = 10;` 报 private 错误，但 `volume()` 内部同样访问 `base_radius` 却没问题。为什么？**

参考答案：访问控制检查的是「访问发生的代码位置相对于类的作用域」，而不是「访问者是不是对象」。`volume()` 定义在类体内部，属于类的作用域，因此可以访问所有成员，包括 private。`main()` 在类外，只能访问 public 成员。这正是封装的意义：类的实现细节对内部开放，对外部封闭，外部必须通过公开接口（如 setter）间接修改。

**4. 头文件里同时有 `#ifndef` 保护和 `#include "constants.h"`，为什么仍然可能报重定义？**

参考答案：include guard 防止的是**同一个头文件被包含多次**。如果 `main.cpp` 直接 `#include "constants.h"`，而 `cylinder.h` 也包含了它，两次包含的是同一个文件，guard 会生效，不会重复。但若两个不同的头文件各自**定义了**同一个实体（例如都在头文件里写 `const double PI = ...;`，或都在头文件里给了函数体），guard 保护不了——它们不是同一个文件。此时会报 `redefinition` 或多重定义。正确做法是：头文件只放声明，定义放进 `.cpp`；C++17 起也可以用 `inline constexpr` 变量。

**5. 构造与析构为什么采用相反的调用顺序？**

参考答案：对象可能依赖先创建的对象，所以构造必须按依赖顺序进行（先创建被依赖者）。销毁时要保证「依赖者先消失、被依赖者后消失」，否则被依赖对象已经销毁，依赖者还持有指向它的引用或指针，就会访问悬空数据。因此析构必须严格逆序。这与栈的规则一致：后进先出。

**6. `this->name = name;` 与 `name = name;` 在 `set_name(std::string_view name)` 中有什么区别？**

参考答案：`this->name` 明确指成员变量 `name`，右边是参数 `name`，于是把参数写入成员，完成了赋值。写成 `name = name;` 时，两边的 `name` 都解析为参数本身（局部作用域优先），等于把参数赋给自己，成员变量完全没变。有些编译器会给出 `-Wself-assign` 之类的警告，但不保证报错；这正是它危险的地方——程序能编译、能运行，只是数据没更新。

## 与前后章的关系

本章把「数据 + 行为」装进了类，并解决了对象的生命周期问题。下一章先比较 `class` 与 `struct` 的默认访问差异，再看对象在内存中的大小与对齐，然后第一次使用继承：在已有类的基础上叠加新特性。本章的构造函数、析构函数与 `this` 指针，正是继承章节反复使用的三块基石。
