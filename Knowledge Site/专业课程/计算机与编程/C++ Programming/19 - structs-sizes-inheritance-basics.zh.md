---
slug: "19-structs-sizes-inheritance-basics"
title: "struct、对象大小与继承入门"
summary: "struct 与 class 的唯一区别是默认访问级别；对象大小由成员变量决定并受对齐影响；继承把基类作为子对象嵌入派生类，public 继承不改变成员的可见性，protected 让派生类可访问但外部不可见，private 继承则把所有继承来的成员降为私有。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, struct, object-size, inheritance, access-specifiers]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 19 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=81211s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

本章是 31 小时长视频的第 19 章，对应 **22:33:31–24:26:26**。它先收尾类的两个细节（`struct` 与对象大小），再从零建立继承：基类如何嵌入派生类、三种访问说明符如何改变可见性。

## 这一章在讲什么

三个问题依次展开：

1. `struct` 和 `class` 到底差在哪？答案只有默认访问级别。
2. 一个对象在内存里占多大？答案是「成员变量之和，加上对齐填充」，函数不计入。
3. 继承是怎么发生的？派生类对象内部**包含一个基类子对象**，像套娃一样逐层叠加。

第三条是整章的骨架。理解了「基类部分是真实存在于派生对象内部的子对象」，后面关于访问权限、构造顺序、对象切片的一切就都有了解释。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 22:33 | `struct` 与 `class`：默认访问级别不同，其余相同 |
| 22:35 | 用 struct 建模 Point：只有公开数据的轻量类型 |
| 22:42 | 对象大小：成员变量之和、指针不计所指内容 |
| 22:44 | 边界对齐导致对象比成员之和略大 |
| 22:52 | 继承的动机：person → engineer → civil engineer |
| 22:56 | 第一次继承：`class Player : public Person` |
| 23:00 | 派生类只能访问基类 public 成员；private 成员不可见 |
| 23:13 | 用调试器验证派生对象内含基类子对象 |
| 23:20 | `protected`：派生类可访问，外部仍不可见 |
| 23:31 | 三种继承方式：public / protected / private 的映射表 |
| 23:36 | 完整演示：Person、Player、Nurse、Engineer、CivilEngineer |

## struct 与 class：只差一个默认值

```cpp
class Dog {
    std::string m_name;   // 默认 private
};

struct Cat {
    std::string m_name;   // 默认 public
};
```

除此之外，二者可以互换：都能有构造函数、成员函数、继承、访问说明符。区别只在于**没有写访问说明符时成员的默认级别**。

```cpp
Dog dog1;
// dog1.m_name = "Fluffy";   // 编译错误：private

Cat cat1;
cat1.m_name = "Johnny";      // 可以，struct 默认 public
```

只要显式写出 `public:` / `private:`，两者的行为完全一致。

### 什么时候该用 struct

课程给出的实用标准：**当一个类型只有公开数据、不打算放成员函数时，用 struct**。

```cpp
struct Point {
    double x;
    double y;
};

void print_point(const Point& p) {
    std::cout << "Point[x:" << p.x << ", y:" << p.y << "]\n";
}
```

`Point` 不维护任何不变量，也没有行为，公开数据就是它的全部意义。用 `struct` 让读代码的人一眼看出「这是数据聚合，不是封装对象」。

反过来，一旦需要控制写入、维护不变量（比如半径不能为负），就应该用 `class` 加 private 成员和 setter。

## 对象大小：成员之和，加上对齐

```cpp
class Wrapper {
    int m_a;
    int m_b;
    std::string m_name;
};
```

打印 `sizeof(Wrapper)`，得到的不是「两个 int 加字符串长度」，而是：

- 两个 `int`：$4+4=8$ 字节；
- 一个 `std::string`：在典型实现上是 **32 字节**，与字符串内容长短无关；
- 合计约 40 字节（具体取决于标准库实现）。

三个结论：

1. **函数不计入对象大小。** 成员函数属于类，不属于某个对象；一万个对象共享同一份函数代码，没有理由让每个对象为它付费。
2. **指针只计入指针本身。** 若成员是 `int*`，对象里只存 8 字节地址；它指向多大的数组与对象大小无关。`std::string` 内部就是指针 + 长度 + 小字符串缓冲区，所以 `"hi"` 与一千个字符的字符串，`sizeof` 相同。
3. **对齐会产生空隙。** 多数编译器要求 4 字节的成员落在 4 的倍数地址上。若成员是 `char`（1 字节）后接 `int`（4 字节），编译器会在中间补 3 个字节，使 `int` 对齐。于是

```cpp
struct Mixed {
    char c;    // 1 字节
    int  i;    // 4 字节，需要 4 字节对齐
};
// sizeof(Mixed) 通常是 8，而不是 5
```

这条规则解释了为什么调整成员顺序有时能减小对象：把大对齐的成员放前面，空隙更少。

## 继承：把类建在类之上

设想一个人员体系：Person 是所有「人」的公共部分；Engineer 是「懂工程的 Person」；CivilEngineer 是「专攻土木的 Engineer」。三者是层层特化的关系，正是继承要表达的东西。

```cpp
class Person {
public:
    Person() = default;
    Person(std::string_view full_name, int age, std::string_view address)
        : m_full_name{full_name}, m_age{age}, m_address{address} {}

    std::string get_full_name() const { return m_full_name; }
    int get_age() const { return m_age; }
    std::string get_address() const { return m_address; }

public:
    std::string m_full_name{"None"};

protected:
    int m_age{0};

private:
    std::string m_address{"None"};
};

class Player : public Person {
public:
    Player() = default;
    explicit Player(std::string_view game) : m_game{game} {}

    void play() const {
        std::cout << "Playing " << m_game << " as " << m_full_name << "\n";
        // m_age 也可以访问（protected）
        // m_address 不行（private）
    }

private:
    std::string m_game{"None"};
};
```

语法 `class Player : public Person` 读作「Player 公开继承自 Person」。创建 Player 对象时，编译器会先在里面构造一个完整的 Person 子对象，再叠加 Player 自己的成员：

```text
Player 对象
├─ Person 子对象
│   ├─ m_full_name   (public)
│   ├─ m_age         (protected)
│   └─ m_address     (private)
└─ m_game           (Player 自己的 private 成员)
```

用调试器展开一个 `Player` 对象，会看到 `Person` 这一层，下面挂着它的三个成员，再往下才是 `m_game`。这就是「派生类对象包含基类子对象」的直接证据。

### 访问规则：private 成员对派生类也关闭

- `m_full_name` 是 public：派生类和外部都能用。
- `m_age` 是 protected：派生类内部能用，外部不能用。
- `m_address` 是 private：**派生类内部也不能用**。它属于 Person 的私有实现，即使在 Player 对象内部，Player 的成员函数也无权直接读写。

```cpp
void Player::change() {
    m_full_name = "Jon Snow";  // 可以
    m_age = 30;                // 可以（protected）
    // m_address = "...";      // 编译错误：private to Person
}
```

如果派生类确实需要读写基类的私有数据，只能走基类提供的 public 接口（getter/setter），或者由基类作者把成员改成 protected。

这解释了一个常被误解的说法：「public 继承保留了成员的访问级别」——对 public 和 protected 成员成立，对 private 成员不成立。private 成员永远属于定义它的那个类。

## 三种继承方式

继承时在冒号后写的关键字，叫**基类访问说明符**，它决定基类成员在派生类中的新级别：

| 基类中的成员 | public 继承 | protected 继承 | private 继承 |
| --- | --- | --- | --- |
| public | public | protected | private |
| protected | protected | protected | private |
| private | 不可访问 | 不可访问 | 不可访问 |

三条要点：

1. **只能收紧，不能放宽。** 继承说明符给出的级别是上限：public 继承保持原样，protected 继承把 public 降为 protected，private 继承把 public 和 protected 都降为 private。
2. **private 成员在任何继承方式下都不可访问。** 表格最后一行是关键，也是初学者最容易忽略的一行。
3. **继承方式影响的是「再往下派生」。** private 继承得到的成员对当前类是私有的，所以当前类的派生类也拿不到。

### private 继承为什么叫「自私」

课程用了一个很贴切的比喻。设：

```cpp
class Engineer : private Person { /* ... */ };
class CivilEngineer : public Engineer { /* ... */ };
```

`Engineer` 私有继承 `Person` 后，`Person` 的 public 成员（`m_full_name`、`get_full_name`）在 `Engineer` 里全部变成 private。于是 `CivilEngineer` 即使公开继承 `Engineer`，也拿不到这些成员——它们在 `Engineer` 那里就被截断了。`Engineer` 等于说：「我从 Person 拿到的一切都归我，不往下传。」

`CivilEngineer` 对象内部**依然有**完整的 Person 子对象（调试器里能看到），只是这些成员的访问权限被上层设计封死了。数据还在，接口没了。

### 一个完整例子

课程用同一套 Person/Player 代码演示三种继承：

```cpp
class Player  : public    Person { /* 内部可用 public、protected；外部可用 public */ };
class Nurse   : protected Person { /* 内部可用 public、protected；外部都不可用 */ };
class Engineer: private   Person { /* 内部可用 public、protected；外部都不可用，且不可再向下传递 */ };
```

在 `main` 中：

```cpp
Player p;
p.m_full_name = "Samwell";   // 可以：public 继承保留 public
// p.m_age = 30;             // 错误：protected，外部不可见
// p.m_address = "Castle";   // 错误：private to Person

Nurse n;
// n.m_full_name = "Davy";   // 错误：protected 继承把 public 降为 protected

Engineer e;
// e.m_full_name = "Olivier"; // 错误：private 继承把它降为 private
```

而 `Engineer` 自己的成员函数里，`m_full_name` 和 `m_age` 都能用，`m_address` 仍然不能用。

## 本章结论

- `struct` 与 `class` 的唯一区别是默认访问级别；只有公开数据时优先用 `struct`。
- 对象大小约等于成员变量大小之和；函数不计入，指针不计所指内容，对齐会引入填充。
- 继承让派生类对象内部包含一个基类子对象，构造、访问、销毁都按这个结构进行。
- public 继承不改变 public/protected 成员的级别；private 成员对任何派生类都不可见。
- protected 继承把 public 降为 protected；private 继承把 public 和 protected 都降为 private。
- private 继承会截断向下的可见性，因此被称作「自私」的继承。

## 理解检验

**1. `struct` 和 `class` 的唯一区别是什么？什么时候应该优先用 `struct`？**

参考答案：唯一区别是未写访问说明符时的默认级别：`class` 的成员默认 private，`struct` 默认 public。二者都支持构造、析构、成员函数、继承和访问说明符。当类型只是把若干数据捆在一起、不维护不变量、不提供行为时（如 `Point{x, y}`），用 `struct` 更直接：读者一眼看出它是数据聚合。一旦需要控制写入或维护约束（半径非负、状态合法），就该用 `class` 加 private 成员。

**2. 为什么 `sizeof(std::string)` 与字符串内容长短无关？对象大小里到底算了什么？**

参考答案：`std::string` 在典型实现里保存的是一个指向字符缓冲区的指针、长度和容量（还可能包含小字符串优化的内联缓冲区），对象本身只占固定大小（常见为 32 字节）。字符串内容分配在堆上，对象里只存地址与元数据，所以 `"hi"` 和一千个字符的字符串占用同样大小的 `string` 对象。把这一点推广：对象大小只统计成员变量本身，指针只计指针的宽度，不计它指向的内存；成员函数属于类，不计入任何对象。

**3. 派生类能否直接访问基类的 private 成员？为什么这个限制在编译期就能发现？**

参考答案：不能。private 成员的访问权限绑定在「定义它的类的作用域」上；派生类的作用域虽然在基类作用域之内查找名字，但访问控制检查会拒绝 private 成员，编译器直接报 `is private within this context`。这个检查完全基于声明与作用域，不需要运行程序，所以编译期就能发现。派生类若确实需要这些数据，只能调用基类的 public 接口，或者请基类作者把成员改成 protected。

**4. 写出 public 继承下，基类三种成员在派生类中的可见性，并说明 private 成员为什么特殊。**

参考答案：public 成员在派生类中仍是 public；protected 成员仍是 protected；private 成员**不可访问**。前两者是「继承下来的成员」，只是级别不变；private 成员虽然物理上存在于派生对象的基类子对象里，但访问控制把它永久绑定在基类作用域内，任何派生类都不能直接读写。所以 public 继承「保持可见性」的说法只对 public 和 protected 成立。

**5. private 继承为什么被形容为「自私」？CivilEngineer 明明包含完整的 Person 子对象，为什么访问不到 Person 的 public 成员？**

参考答案：`Engineer : private Person` 把从 Person 继承来的 public 与 protected 成员统统降为 Engineer 的 private 成员。于是再派生 `CivilEngineer : public Engineer` 时，这些成员已经是 Engineer 的私有成员，按规则任何派生类都不能访问，也无法「恢复」它们的可见性。数据确实还在——CivilEngineer 对象内部有 Engineer 子对象，Engineer 内部又有 Person 子对象——但接口被上层截断了。Engineer 拿走了基类的一切，却不往下一代传，因此称为自私。

**6. `protected` 与 `private` 的区别是什么？各举一个适用场景。**

参考答案：protected 成员对「本类及其派生类的成员函数」可见，对外部不可见；private 成员只对本类可见，派生类也不行。需要让派生类直接读写、又不希望外部碰的状态（例如基类里的 `m_age`，派生类构造时要设置它）适合 protected。纯粹属于本类实现、派生类不应依赖的细节（例如内部缓存、地址字段）应保持 private，避免派生类耦合到实现细节。

## 与前后章的关系

本章建立了继承的基本语法与访问规则，但留下一个明显的问题：private 继承把成员全部封死，派生类再也拿不到；如果确实想让某些成员向下传递怎么办？下一章先用 `using` 声明把被遮蔽的成员「复活」，再依次解决构造顺序、向基类构造传参、拷贝构造、析构顺序与同名成员遮蔽。
