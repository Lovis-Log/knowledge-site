---
slug: "20-inheritance-constructors-scope"
title: "继承中的构造、拷贝与名称遮蔽"
summary: "用 using 复活被 private 继承遮蔽的成员；派生对象按基类到派生类的顺序分层构造，自定义构造通过初始化列表向基类转发参数；拷贝构造要用切片写法复用基类版本；基类构造函数可用 using 继承但只初始化基类部分；析构顺序与构造相反；同名成员会遮蔽基类版本，需要 Parent:: 显式指定。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, inheritance, constructors, copy-constructor, name-hiding]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 20 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=87986s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

本章是 31 小时长视频的第 20 章，对应 **24:26:26–26:55:10**。上一章讲清了继承的访问规则，但派生类还不会「正确地出生」：构造顺序是什么、参数怎么传回基类、拷贝怎么复用、析构怎么收尾，都是这一章的内容。

## 这一章在讲什么

围绕同一条继承链 `Person → Engineer → CivilEngineer`，依次解决六个问题：

1. private 继承把成员全封死后，怎么把个别成员放出来？
2. 创建一个三层对象时，构造函数按什么顺序运行？
3. 派生类怎么把参数交给基类的构造函数？
4. 拷贝一个派生对象时，怎么复用基类的拷贝构造？
5. 能不能直接「继承」基类的构造函数？
6. 派生类与基类有同名成员时，到底调用哪一个？

最后一个问题自然引出静态绑定，为下一章的虚函数做铺垫。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 24:26 | 用 `using` 复活被遮蔽的成员；不能复活基类的 private 成员 |
| 24:46 | 继承下的默认构造顺序：基类先、派生类后 |
| 24:57 | 自定义构造：初始化列表调用基类构造，转发参数 |
| 25:18 | 两种错误写法：构造体内赋值、初始化列表直接写基类成员 |
| 25:26 | 拷贝构造与继承：默认逐成员拷贝的问题 |
| 25:31 | 正确写法 `Person(source)`：切片后复用基类拷贝构造 |
| 25:52 | `using Person::Person` 继承基类构造函数；拷贝构造不继承 |
| 26:05 | 析构顺序：与构造严格相反 |
| 26:12 | 同名成员遮蔽与 `Parent::` 显式调用 |
| 26:21 | 静态绑定：为什么基类指针调不到派生类的版本 |

## 用 using 复活成员

回顾上一章的结论：`Engineer : private Person` 会把 Person 的 public 与 protected 成员全部降为 Engineer 的 private 成员，导致 `CivilEngineer` 完全访问不到它们。如果确实需要其中几个成员继续向下传递，可以在派生类里用 `using` 声明把它们「复活」：

```cpp
class Engineer : private Person {
public:
    void do_something() const { std::cout << "Engineer work\n"; }

protected:
    using Person::get_full_name;   // 复活为 protected
    using Person::get_age;
    using Person::get_address;
};
```

规则有三条：

1. **复活后的访问级别取决于 `using` 所在的小节。** 写在 `public:` 下就是 public，写在 `protected:` 下就是 protected。
2. **只能复活「基类允许派生类访问」的成员。** 若成员在上游类里是 private，`using Person::m_address` 会直接编译失败——private 成员连名字都不可见，谈不上复活。
3. **对函数名使用 `using` 会带回该名字的全部重载。** `using Person::add;` 一次性恢复 `add(int,int)` 与 `add(int,int,int)`，不需要逐个写。

课程对这个特性持保留态度：private 继承本来就是为了切断传递，再用 `using` 一个个放出来，代码会变得难以预测。**如果这些成员本来就应该向下传递，一开始就用 public 或 protected 继承更直接。**

## 构造顺序：从基类到派生类

```cpp
class Person {
public:
    Person() { std::cout << "Person default constructor\n"; }
};

class Engineer : public Person {
public:
    Engineer() { std::cout << "Engineer default constructor\n"; }
};

class CivilEngineer : public Engineer {
public:
    CivilEngineer() { std::cout << "CivilEngineer default constructor\n"; }
};

CivilEngineer ce1;
```

输出：

```text
Person default constructor
Engineer default constructor
CivilEngineer default constructor
```

原因还是「套娃」结构：要构造 CivilEngineer，必须先有 Engineer 子对象；要构造 Engineer，必须先有 Person 子对象。所以自底向上逐层完成。

**如果派生类没有显式指定调用哪个基类构造，编译器就调用基类的默认构造。** 这带来一个实际要求：**继承链上的每个类都应该提供默认构造**，或者每个派生类都显式调用某个基类构造，否则一旦有人创建对象，编译就会失败：

```text
error: no matching function for call to 'Person::Person()'
```

## 自定义构造：初始化列表转发参数

假设要一次把姓名、年龄、地址、合同数都传进来：

```cpp
class Person {
public:
    Person(std::string_view full_name, int age, std::string_view address)
        : m_full_name{full_name}, m_age{age}, m_address{address} {}
    // ...
};

class Engineer : public Person {
public:
    Engineer(std::string_view full_name, int age, std::string_view address,
             int contract_count)
        : Person(full_name, age, address), m_contract_count{contract_count} {}
    // ...
};

class CivilEngineer : public Engineer {
public:
    CivilEngineer(std::string_view full_name, int age, std::string_view address,
                  int contract_count, std::string_view speciality)
        : Engineer(full_name, age, address, contract_count), m_speciality{speciality} {}
    // ...
};
```

关键在初始化列表的第一项 `Person(...)` / `Engineer(...)`：它调用的是**基类构造函数**，而不是给某个成员赋值。参数沿着继承链一路向上转发，每一层只初始化属于自己的部分。

### 两种错误写法

**错误一：在构造函数体内给基类成员赋值。**

```cpp
CivilEngineer::CivilEngineer(std::string_view fn, int age, std::string_view addr, ...) {
    m_full_name = fn;    // 可以（public）
    m_age = age;         // 可以（protected，如果基类允许）
    m_address = addr;    // 编译错误：private to Person
}
```

即使前两个能过，`m_address` 也永远写不进去。而且这种写法跳过了基类构造，基类部分只能靠默认构造初始化，数据被丢掉。

**错误二：在初始化列表里直接写基类成员。**

```cpp
CivilEngineer::CivilEngineer(...)
    : m_full_name{fn}, m_age{age}, m_address{addr}   // 全部编译错误
{}
```

报错类似 `CivilEngineer does not have any field called m_full_name`。原因很直接：**初始化列表只能初始化「本类声明的成员」**。`m_full_name` 属于 Person，不属于 CivilEngineer；派生类没有资格直接初始化它，只能请基类自己来做——也就是调用基类构造函数。

## 拷贝构造与继承

默认的拷贝是逐成员拷贝。对不含裸指针的类，这通常能工作：

```cpp
Engineer e1("Daniel", 41, "Some address", 12);
Engineer e2 = e1;   // 默认拷贝构造：逐成员复制
```

问题出现在需要自定义拷贝构造时（例如类里有动态分配的内存）。先给基类写：

```cpp
Person::Person(const Person& source)
    : m_full_name{source.m_full_name},
      m_age{source.m_age},
      m_address{source.m_address} {}
```

再写派生类，有三种写法，只有第三种是对的。

**写法一：只初始化自己的成员。**

```cpp
Engineer::Engineer(const Engineer& source)
    : m_contract_count{source.m_contract_count} {}
```

基类部分会调用 **Person 的默认构造**，姓名、年龄、地址全部变成默认值（如 `"None"`、`0`），数据丢失。

**写法二：调用基类的普通构造，把成员逐个传上去。**

```cpp
Engineer::Engineer(const Engineer& source)
    : Person{source.m_full_name, source.m_age, source.get_address()},
      m_contract_count{source.m_contract_count} {}
```

能编译（如果通过 getter 拿 private 数据），但有两个代价：先构造一个**临时的 Person 对象**，再从它拷贝到基类部分；而且完全绕开了刚刚辛苦写好的 Person 拷贝构造，等于重复实现了一遍拷贝逻辑。

**写法三：直接传整个派生对象，让编译器切片。**

```cpp
Engineer::Engineer(const Engineer& source)
    : Person{source},                       // 切片：只取 Person 那一层
      m_contract_count{source.m_contract_count} {}
```

`source` 是 Engineer，而 `Person` 的拷贝构造要的是 `const Person&`。编译器看到 Engineer 内含 Person 子对象，就自动截取那一层传进去，正好命中 Person 的拷贝构造。没有临时对象，没有重复代码，也复用了基类的逻辑。

三层时同样写法：

```cpp
CivilEngineer::CivilEngineer(const CivilEngineer& source)
    : Engineer{source},                     // 切片到 Engineer 层，复用其拷贝构造
      m_speciality{source.m_speciality} {}
```

## 继承基类构造函数

C++11 起，可以用一句声明把基类的构造函数「搬」到派生类：

```cpp
class Engineer : public Person {
public:
    using Person::Person;   // 继承 Person 的全部构造函数
    // ...
};
```

效果是：编译器为 Engineer 生成一批与 Person 签名相同的构造函数，它们只负责把参数转给 Person 构造，**不会初始化 Engineer 自己的成员**。

```cpp
Engineer e1("Daniel", 41, "Some address");   // 可用，m_contract_count 保持默认值
```

几个必须知道的限制：

- **拷贝构造与移动构造不会被继承。** 需要时得自己写。
- **访问级别随基类中的声明。** 基类里是 public 就 public，是 protected 就只能被派生类使用。
- **它只初始化基类部分**，派生类成员仍是默认值。这也是课程反复提醒「容易让人误解」的原因：看到 `Engineer(...)` 自然以为它初始化了 Engineer 的成员，其实没有。

课程的建议很明确：这是「能做但不建议做」的特性，除非确有需要，否则自己写构造函数更清楚。看到别人的代码用了它，至少要知道它只负责基类那一段。

## 析构顺序与构造相反

```cpp
CivilEngineer ce1;
```

输出顺序是：

```text
Person constructor
Engineer constructor
CivilEngineer constructor
CivilEngineer destructor
Engineer destructor
Person destructor
```

构造自底向上，析构自上而下——最后构造的最先销毁。理由与第 18 章相同：派生层可能依赖基类层的数据，必须先把依赖者拆掉。

## 同名成员：遮蔽与显式调用

派生类可以声明与基类同名的成员变量或成员函数，编译器允许：

```cpp
class Parent {
public:
    void print_var() const { std::cout << "Parent: " << m_var << "\n"; }
protected:
    int m_var{100};
};

class Child : public Parent {
public:
    void show() const {
        std::cout << "Child: " << m_var << "\n";          // Child 的 m_var
        std::cout << "Parent: " << Parent::m_var << "\n"; // 显式访问基类版本
    }
protected:
    int m_var{1000};
};
```

规则：**派生类的成员会遮蔽（hide）基类的同名成员**。在 `Child` 的成员函数里写 `m_var`，得到的是 `m_var{1000}`；`Parent::m_var` 才是基类那份。

成员函数同理：

```cpp
Child c;
c.print_var();          // 如果 Child 没有 print_var，调用 Parent 的
c.Parent::print_var();  // 显式指定基类版本，始终可用
```

注意区分三个概念：

- **重载（overload）**：同一作用域内，同名不同参数；
- **遮蔽（hide）**：派生类同名成员挡住基类成员，与参数无关；
- **覆盖（override）**：派生类用相同签名重写基类的**虚函数**，下一章的主题。

派生类的同名函数一旦出现，基类的**所有**同名重载都会被遮蔽，需要 `using Parent::func;` 才能一并带回（这与前面复活成员是同一机制）。

## 一个重要的铺垫：静态绑定

本章最后，课程开始比较「用对象直接调用」与「用基类指针调用」：

```cpp
class Shape {
public:
    void draw() const { std::cout << "Shape draw\n"; }
};
class Oval : public Shape {
public:
    void draw() const { std::cout << "Oval draw\n"; }
};

Oval oval;
Shape* p = &oval;
p->draw();   // 输出 Shape draw
```

尽管 `p` 实际指向 Oval，调用的却是 `Shape::draw`。原因是编译器只看**指针的静态类型**（`Shape*`），在编译期就把调用绑定到 `Shape::draw`。这叫**静态绑定**。

要让调用跟着「真实对象」走，需要虚函数与动态绑定——那是下一章的全部内容。这一章先让人看清默认行为：**没有 `virtual`，多态不会发生。**

## 本章结论

- `using Base::name` 可把被 private 继承遮蔽的成员复活，级别由所在小节决定；不能复活基类的 private 成员；对函数名复活会带回全部重载。
- 派生对象构造顺序：基类 → 中间层 → 派生类；未指定时调用基类默认构造。
- 自定义构造用初始化列表调用基类构造，把参数逐层转发。
- 初始化列表只能初始化本类成员，基类成员必须由基类构造处理。
- 派生类拷贝构造用 `Base{source}` 切片，复用基类拷贝构造，避免临时对象与重复代码。
- `using Base::Base` 可继承基类构造函数，但只初始化基类部分，且不继承拷贝构造。
- 析构顺序与构造相反。
- 同名成员会遮蔽基类版本，用 `Parent::` 显式指定；遮蔽会隐藏同名函数的全部重载。
- 没有虚函数时，通过基类指针调用得到的是基类版本（静态绑定）。

## 理解检验

**1. `using Person::get_full_name;` 放在 `protected:` 下和 `public:` 下，效果有什么不同？为什么不能写成 `using Person::m_address;`？**

参考答案：`using` 声明把成员引入派生类，并赋予它所在小节的访问级别。写在 protected 下，派生类及其派生类可用、外部不可用；写在 public 下则完全公开。至于 `m_address`：若它在 Person 中是 private，那么它的名字在 Person 作用域之外根本不可见，`using` 无从引用，编译直接失败。`using` 只能调整「已经可被派生类访问的成员」的级别，不能穿透 private。

**2. `using Person::add;` 为什么能一次带回两个 `add` 重载？如果要只带回其中一个，能做到吗？**

参考答案：`using` 针对的是**名字**，不是某个签名。`using Person::add;` 把 Person 作用域里所有叫 `add` 的声明一并引入，因此 `add(int,int)` 与 `add(int,int,int)` 都回来了。标准没有提供只引入某一个重载的语法；若只想保留其中一个，通常的做法是不用 `using`，而是在派生类中写一个同名转发函数，或者在基类中为不同重载取不同的名字。

**3. 构造 `CivilEngineer` 对象时，为什么 Person 的构造函数必须先运行？**

参考答案：CivilEngineer 对象内部包含一个 Engineer 子对象，Engineer 子对象内部又包含一个 Person 子对象。构造一个对象的前提是它的所有子对象已经就绪，否则派生类构造函数可能读到未初始化的基类数据。编译器因此严格按「最底层基类 → 中间层 → 最派生类」的顺序执行。反过来说，析构必须按相反顺序进行，先拆掉依赖基类的派生层。

**4. 在 `CivilEngineer` 构造函数体内写 `m_address = addr;` 为什么失败？直接把 `m_address` 写进初始化列表为什么也失败？**

参考答案：两处失败的原因不同。函数体内赋值失败，是因为 `m_address` 在 Person 中是 private，CivilEngineer 的成员函数无权访问，报 `is private within this context`。写进初始化列表失败，是因为初始化列表只能初始化**当前类声明的成员**；`m_address` 属于 Person，CivilEngineer 根本没有这个字段，编译器报 `does not have any field called m_address`。正确做法是在初始化列表里调用 `Person(full_name, age, address)`，由 Person 自己初始化自己的成员。

**5. 为什么 `Engineer::Engineer(const Engineer& source) : Person{source}, ...` 被称为最优写法？它与 `Person{source.m_full_name, ...}` 有什么本质区别？**

参考答案：`Person{source}` 把整个 Engineer 对象传给 `const Person&` 形参，编译器截取其中的 Person 子对象（切片），正好调用 Person 的拷贝构造函数。这样复用了基类已经写好的拷贝逻辑，不产生临时对象。另一种写法调用的是 Person 的**普通三参数构造**，需要先读三个成员、构造一个临时 Person，再拷贝到基类部分；既多了一次临时对象，又把拷贝逻辑重复实现了一遍。一旦 Person 的拷贝逻辑以后修改，这种写法不会自动同步。

**6. 派生类与基类有同名成员变量时，在派生类成员函数里写 `m_var` 指的是哪一个？怎样访问另一个？**

参考答案：派生类作用域优先，`m_var` 指派生类自己的成员，基类同名成员被遮蔽。要访问基类版本，写 `Parent::m_var`（在类外则是 `obj.Parent::m_var`）。同名成员函数也一样：派生类一旦声明同名函数，基类的所有同名重载都被遮蔽，需要 `using Parent::func;` 才能一并带回可见。这个机制与「覆盖虚函数」不同：遮蔽只看名字，与签名和 virtual 都无关。

**7. 用 `using Person::Person;` 继承构造函数后，创建 `Engineer("Daniel", 41, "addr")`，`m_contract_count` 的值是什么？为什么？**

参考答案：是它声明时的默认值（例如 0），而不是由参数决定的。继承来的构造函数只是「转发表」：它把收到的参数原样交给 Person 的构造函数，用来构建基类子对象，而 Engineer 自己的成员由默认初始化处理。因此派生类成员不会被这个构造设置。正是这种「看起来初始化了派生类、实际只初始化基类」的错觉，让课程不建议在实际项目中使用继承构造函数。

## 与前后章的关系

本章把继承的「生命周期」补齐了：怎么构造、怎么拷贝、怎么析构、同名成员怎么区分。同时用一个反例暴露了默认行为的局限——通过基类指针调用非虚函数，只会执行基类版本。下一章引入 `virtual`，把这种编译期决定的静态绑定换成运行时决定的动态绑定，也就是多态。
