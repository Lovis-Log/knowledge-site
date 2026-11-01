---
slug: "21-virtual-functions-polymorphism"
title: "虚函数与多态：动态绑定、切片与 override"
summary: "virtual 让调用在运行时按真实对象选择版本；多态对象因虚表指针而变大；把派生对象按值存进基类容器会切片，引用不能存进容器，指针与智能指针可以；override 防止签名写错，重载与覆盖会互相遮蔽；多态可以在任意层级建立；静态成员不随继承各自独立；final 限制覆盖与继承；默认参数在编译期绑定，虚析构保证整条链被销毁。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, polymorphism, virtual-functions, object-slicing, override, final]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 21 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=96910s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

本章是 31 小时长视频的第 21 章，对应 **26:55:10–29:35:36**。上一章最后的反例说明：通过基类指针调用普通函数，只会执行基类版本。这一章用 `virtual` 把「编译期决定」换成「运行期决定」，并把它带来的所有副作用一次讲清。

## 这一章在讲什么

一条继承链 `Shape → Oval → Circle` 贯穿全章。核心问题只有一个：**怎样让一个 `Shape*` 调用到它实际管理的那个对象的版本？**

答案是给函数加上 `virtual`。但这一个关键字会牵出一连串后果：

- 对象为什么突然变大了？
- 把派生对象装进基类数组，为什么调用的还是基类版本？
- 为什么引用不能放进数组，指针却可以？
- `override` 与 `final` 各自防的是什么错？
- 默认参数为什么不受多态影响？
- 为什么析构函数也必须是虚的？

这些问题构成了本章的全部内容。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 26:55 | 给函数加 `virtual`，基类指针/引用得到动态绑定 |
| 27:05 | 一个 `draw_shape` 函数处理所有形状；基类指针数组 |
| 27:09 | 非虚函数不参与多态：`get_x_rad` 编译失败 |
| 27:14 | 多态对象的大小：虚表指针使对象变大 |
| 27:17 | 对象切片：派生对象按值赋给基类对象 |
| 27:26 | 把多态对象放进容器：按值切片、引用不可存、指针可用 |
| 27:45 | `override`：签名写错时由编译器拦住 |
| 27:52 | 重载、覆盖、遮蔽三者的关系 |
| 28:07 | 在不同层级建立多态：Animal / Feline / Bird |
| 28:33 | 静态成员与继承：同名静态变量不自动独立 |
| 28:49 | `final`：禁止进一步覆盖，或禁止继承 |
| 29:07 | 虚函数与默认参数：参数在编译期绑定 |
| 29:23 | 虚析构函数：通过基类指针删除派生对象 |

## 从静态绑定到动态绑定

![图示](/images/virtual-table-rich-zh.svg)

*图：类层次、对象与虚函数表，以及一次调用的四步。*

```cpp
class Shape {
public:
    virtual void draw() const { std::cout << "Shape draw\n"; }
};

class Oval : public Shape {
public:
    void draw() const override { std::cout << "Oval draw\n"; }
};

class Circle : public Oval {
public:
    void draw() const override { std::cout << "Circle draw\n"; }
};

Shape* p = new Circle();
p->draw();   // Circle draw
```

只加了一个 `virtual`，行为就完全不同：

- **没有 virtual**：编译器看 `p` 的静态类型 `Shape*`，调用 `Shape::draw`；
- **有 virtual**：编译器生成「运行时再查」的调用，看 `p` 实际指向的对象类型，调用 `Circle::draw`。

课程把后者称为**动态绑定**（也叫晚绑定、多态）。派生类里的 `draw` 建议同时写 `override`（见后文），它不是必需的，但能防止签名写错。

### 一个函数处理所有形状

有了动态绑定，就不必为每种形状写一个绘制函数：

```cpp
void draw_shape(const Shape* s) {
    s->draw();
}

// 也可以接受引用
void draw_shape_ref(const Shape& s) {
    s.draw();
}

draw_shape(&shape1);   // Shape draw
draw_shape(&oval1);    // Oval draw
draw_shape(&circle1);  // Circle draw
```

容器也一样：只要存的是基类指针，循环一次就能处理所有派生类型：

```cpp
std::vector<Shape*> shapes{&shape1, &oval1, &circle1};
for (const Shape* s : shapes) {
    s->draw();
}
```

这正是多态存在的理由：**代码针对基类编写，行为随实际对象变化**。没有它，一百种形状就要一百个函数、一百个容器。

### 非虚函数不参与多态

```cpp
Shape* p = new Oval();
p->get_x_rad();   // 编译错误：Shape has no member named get_x_rad
```

`get_x_rad` 只在 Oval 里声明、且不是虚函数。编译器按 `p` 的静态类型 `Shape*` 查找，找不到就报错。**只有基类中声明为 virtual 的函数，才能通过基类指针被多态调用。**

## 多态的代价：对象变大

多态不是免费的。编译器要实现「运行时查表」，就得给每个多态对象塞一个指针，指向该类型的虚函数表（vtable）。课程在演示机上量到的结果是：

| 类型 | 关闭多态（无 virtual） | 开启多态（有 virtual） |
| --- | --- | --- |
| Shape | 32 字节 | 40 字节 |
| Oval | 48 字节 | 56 字节 |
| Circle | — | 56 字节 |

（具体数值取决于编译器和标准库实现，但「多态对象更大」这条结论普遍成立。）

多出来的部分主要是虚表指针。对象越多、越小，这份额外开销的相对比例就越高。所以：**只在确实需要运行时多态的地方使用 virtual**，而不是给所有函数都加上。

## 对象切片

当派生对象被**按值**赋给基类对象时，多出来的派生部分会被切掉：

```cpp
Circle circle1(10, "circle one");
Shape shape1 = circle1;   // 切片：Circle、Oval 部分被丢弃
shape1.draw();            // Shape draw，不是 Circle draw
```

原因是空间：`shape1` 只有 Shape 那么大，装不下 Oval 与 Circle 的成员。编译器只能复制基类那一层，其余部分丢掉。这不是错误，编译器不会报错，但**多态信息永久丢失**。

切片发生在这些场合：

- 派生对象按值赋给基类对象；
- 派生对象按值传给「接受基类对象」的函数；
- 派生对象被复制进存放基类对象的容器。

### 容器里的三种存法

```cpp
std::vector<Shape> shapes;        // 存对象 → 切片，全部退化为 Shape
shapes.push_back(circle1);        // 只复制 Shape 那一层

std::vector<Shape&> refs;         // 编译错误：不能存引用
std::vector<Shape*> ptrs;         // 可以，多态保留
std::vector<std::shared_ptr<Shape>> smart;  // 也可以
```

三个结论：

1. **存对象会切片。** 数组/容器为元素分配的空间是基类的大小，派生信息放不下。
2. **不能存引用。** 容器要求元素类型可赋值（left-assignable），而引用一旦绑定就不能改指别处，所以对引用赋值等于改它指向的对象，而不是换一个引用。C++ 因此禁止引用数组。
3. **存指针（裸指针或智能指针）可以。** 指向派生对象的基类指针，恰好就是多态设计的目标形态。

切片之后即便再取地址也救不回来：

```cpp
Shape sliced = circle1;        // 已经丢掉派生部分
Shape* p = &sliced;
p->draw();                     // 仍然是 Shape draw，数据已不存在
```

## override：让编译器检查签名

假设手误把 `draw` 写成了 `Draw`：

```cpp
class Oval : public Shape {
public:
    void Draw() const { ... }   // 新函数，不是覆盖
};
```

这段代码能编译。`Oval` 里多了一个叫 `Draw` 的普通函数，而 `draw` 仍是继承来的 `Shape::draw`。于是通过基类指针调用时，永远走不到这个「本意是覆盖」的函数，而且几乎无法从代码里看出来。

`override` 就是为此设计的：

```cpp
class Oval : public Shape {
public:
    void draw() const override { ... }      // 正确
    void Draw() const override { ... }      // 编译错误
};
```

第二条会报：

```text
error: 'void Oval::Draw() const' marked 'override' but does not override
```

**建议：只要打算覆盖虚函数，就写上 `override`。** 它不改变行为，只把「签名写错」从运行时 bug 变成编译错误。

## 重载、覆盖与遮蔽

三个概念容易混：

| 名称 | 发生位置 | 条件 | 效果 |
| --- | --- | --- | --- |
| 重载 overload | 同一作用域 | 同名、参数不同 | 按参数选择版本 |
| 覆盖 override | 派生类对基类 | 同名、同签名、基类函数为 virtual | 运行时按真实对象选择 |
| 遮蔽 hide | 派生类对基类 | 同名即可，参数无关 | 基类同名成员不可见 |

最反直觉的是「遮蔽压过重载」：

```cpp
class Shape {
public:
    virtual void draw() const { ... }
    virtual void draw(int color_depth) const { ... }   // 重载
};

class Oval : public Shape {
public:
    void draw() const override { ... }   // 只覆盖了无参版本
};

Oval o;
o.draw(44);   // 编译错误：Oval 里只有一个 draw()
```

`Oval` 声明了 `draw()` 之后，基类的**所有**同名函数都被遮蔽，包括 `draw(int)`。要保留它们，必须：

- 在 Oval 中把 `draw(int)` 也覆盖一遍；或
- 在 Oval 中写 `using Shape::draw;` 把基类重载重新引入。

同理，在派生层新增的重载（比如 `Oval::draw(int, std::string)`）并不在基类中声明，**不参与 Shape 多态**：通过 `Shape*` 调不到它，因为基类根本不知道这个函数存在。

**规则：只有基类中声明、且为 virtual 的函数，才参与基类多态。**

## 在不同层级建立多态

多态不要求一定从最顶层开始。设想：

```text
Animal
├─ Feline ── Dog, Cat
└─ Bird   ── Pigeon, Crow
```

可以在 Animal 层声明 `breathe` 虚函数，所有动物都覆盖它——这是 Animal 多态。也可以在 Feline 层声明 `run` 虚函数，只有猫科动物覆盖它——这是 Feline 多态。

```cpp
Feline* f1 = new Dog();
Feline* f2 = new Cat();
f1->run();   // Dog::run
f2->run();   // Cat::run

Feline* bad = new Pigion();   // 编译错误：鸟不是猫科
Animal* a = new Animal();     // 编译错误（若 Animal 抽象）
Feline* bad2 = a;             // 编译错误：不能把父类赋给子类指针
```

**多态在哪个层级建立，就只能在该层级及其派生类中生效。** Feline 指针装不下 Bird；Animal 指针也调不到只在 Feline 声明的 `run`。这提供了很实用的设计自由度：不需要为整个体系找一个共同的顶层接口，只要在真正共享行为的层级建立多态即可。

## 静态成员与继承

静态成员属于类本身，不属于对象。派生类可以直接使用基类的静态成员，但**不会自动获得一份独立的副本**：

```cpp
class Shape {
public:
    Shape() { ++m_count; }
    virtual int get_count() const { return m_count; }
    static int m_count;
protected:
    std::string m_description;
};
int Shape::m_count = 0;

class Ellipse : public Shape { /* 没有自己的 m_count */ };

Shape s1, s2, s3;
Ellipse e1;
std::cout << Shape::m_count;     // 4
std::cout << Ellipse::m_count;   // 4 —— 是同一个变量
```

如果希望每种类型单独计数，需要在派生类中**声明同名的静态成员**，并覆盖 `get_count`：

```cpp
class Ellipse : public Shape {
public:
    Ellipse() { ++m_count; }              // 自己的计数
    int get_count() const override { return m_count; }
    static int m_count;
};
int Ellipse::m_count = 0;
```

此时 `Shape::m_count` 是 4，`Ellipse::m_count` 是 1。而通过基类指针调用 `get_count()` 会触发多态：指向 Shape 的对象返回 4，指向 Ellipse 的对象返回 1。

一个容易忽略的细节：派生类构造函数会先调用基类构造，所以创建一个 Ellipse 会让**两个**计数都加一。若要只统计派生类型，就不能在派生构造里重复自增，或需要在设计上分清两层语义。

## final：两种限制

`final` 有两种用法。

**一、禁止进一步覆盖某个虚函数：**

```cpp
class Feline : public Animal {
public:
    virtual void run() const { ... }
};

class Dog : public Feline {
public:
    void run() const final { ... }   // 到此为止，不允许再覆盖
};

class Bulldog : public Dog {
public:
    void run() const override;       // 编译错误
};
```

**二、禁止从某个类继承：**

```cpp
class Cat final : public Feline { ... };

class WildCat : public Cat { ... };  // 编译错误：cannot derive from final base
```

课程还演示了两个「合法但没意义」的写法，用来说明这条规则的边界：

- 在 `final` 类里声明新的 virtual 函数——没人能继承，永远不可能被覆盖；
- 同时写 `virtual` 和 `final`——virtual 表示「希望被覆盖」，final 表示「禁止覆盖」，final 生效，函数永远停在当前实现。

这些写法编译器不报错，但读代码的人会被误导。

## 虚函数与默认参数

这是本章最隐蔽的陷阱。默认参数在**编译期**按静态类型填入，函数体在**运行期**按动态类型选择。两者可能来自不同的类：

```cpp
class Base {
public:
    virtual double add(int a = 5, int b = 5) const { return a + b + 1; }
};

class Derived : public Base {
public:
    double add(int a = 10, int b = 10) const override { return a + b + 2; }
};
```

```cpp
Base* p = new Derived();
p->add();        // 12 = 5 + 5 + 2
Derived d;
d.add();         // 22 = 10 + 10 + 2
Base b;
b.add();         // 11 = 5 + 5 + 1
```

`p->add()` 是最容易看错的：**函数体来自 Derived（+2），参数却来自 Base（5, 5）**。因为编译器只看到 `Base*`，就在编译期把默认值填成 `5, 5`。

结论：**默认参数永远走静态绑定。** 混合使用虚函数与默认参数会得到难以解释的结果，课程的建议是直接避免这种组合。

## 虚析构函数

用基类指针删除派生对象时，析构函数必须是虚的：

```cpp
class Animal {
public:
    virtual ~Animal() { std::cout << "Animal destructor\n"; }
};

class Feline : public Animal {
public:
    ~Feline() override { std::cout << "Feline destructor\n"; }
};

class Dog : public Feline {
public:
    ~Dog() override { std::cout << "Dog destructor\n"; }
};

Animal* p = new Dog();
delete p;   // Dog → Feline → Animal，全部被调用
```

如果析构函数不是虚的，`delete p` 只调用 `Animal::~Animal`。后果有两层：

1. **资源泄漏**：派生层在构造中分配的内存永远不会被释放；
2. **未定义行为**：C++ 标准规定，通过基类指针删除派生对象而基类析构非虚，属于未定义行为，不同编译器可能表现不同。

**规则：只要类里有虚函数，就把析构函数也设为 virtual。** 这是几乎无成本、却能避免严重问题的习惯。

## 本章结论

- `virtual` 启用动态绑定：调用按真实对象类型选择版本。
- 只有基类中声明为 virtual 的函数才参与多态；非虚函数按静态类型解析。
- 多态对象因虚表指针而变大，多态不是零成本。
- 按值存入基类对象或容器会切片，派生信息永久丢失。
- 容器不能存引用（不可赋值），存指针或智能指针可以保留多态。
- 覆盖虚函数时写 `override`，把签名错误提前到编译期。
- 覆盖一个重载会遮蔽基类所有同名重载；需要 `using` 或逐个覆盖。
- 多态可在任意层级建立，但只在该层级及其派生类中生效。
- 静态成员不会随继承自动独立；需要独立计数时在派生类声明同名静态成员。
- `final` 可禁止覆盖某函数，或禁止从某类继承。
- 默认参数在编译期绑定，与虚函数混用会产生反直觉结果。
- 有虚函数的类必须使用虚析构函数。

## 理解检验

**1. 加上 `virtual` 之后，编译器生成的调用具体做了什么改变？为什么这会让对象变大？**

参考答案：没有 virtual 时，编译器在编译期就确定调用哪个函数，直接生成对该函数的调用指令。加上 virtual 后，编译器不再写死目标，而是通过对象内的**虚表指针**找到该对象所属类型的虚函数表，再按函数槽位取出地址并调用，因此目标在运行时才确定。虚表指针是每个多态对象额外存储的一个指针，所以 `sizeof` 增加（演示中是 32→40、48→56）。存储它正是「运行时查表」的前提。

**2. 一个派生对象按值传进「参数为基类对象」的函数，会发生什么？如果参数改成 `const Base&` 呢？**

参考答案：按值传参会在函数内部构造一个基类对象，只复制基类那一层，派生部分被切掉，函数内部无法得到派生类型的信息，虚调用也只会落在基类版本。改成 `const Base&` 后不产生新对象，引用直接绑定到原派生对象上，虚调用依然按真实类型解析，多态保留。这解释了为什么多态接口通常用引用或指针作参数。

**3. 为什么 `std::vector<Base&>` 编译失败，而 `std::vector<Base*>` 可以？**

参考答案：容器的元素类型必须是可赋值的（left-assignable），因为容器需要能对已有元素执行 `elem = new_value` 来替换内容。引用一旦绑定就不能改指其他对象，对引用赋值实际上修改的是被引用的对象，不是「替换这个引用」，所以引用不满足可赋值要求，语言禁止引用数组。指针本身是可赋值的变量：给指针赋新地址只是让它指向别处，因此指针容器合法，而且指向派生对象的基类指针正好保留多态。

**4. `override` 与 `virtual` 分别解决什么问题？为什么建议两者都写？**

参考答案：`virtual` 在基类中声明「这个函数允许在运行期被覆盖」。`override` 在派生类中声明「我确实打算覆盖基类的某个虚函数」，编译器会核对签名；若基类没有匹配的虚函数（例如手误写成 `Draw`、漏写 `const`、参数类型不符），直接报错。只写 `virtual` 能得到多态，但签名写错时会悄悄变成一个新函数，运行时表现为「多态没生效」，极难排查。两者都写，既启用多态，又让编译器守住签名。

**5. 在 `Oval` 中只覆盖了 `draw()`，为什么 `draw(int)` 在 Oval 对象上也不可用了？怎样恢复？**

参考答案：派生类一旦声明了名为 `draw` 的成员，就会遮蔽基类作用域中所有叫 `draw` 的成员，与参数列表无关。因此 `Shape::draw(int)` 在 Oval 中被隐藏，`o.draw(44)` 找不到匹配的重载。恢复方式有两种：在 Oval 中把 `draw(int)` 也覆盖一遍；或写 `using Shape::draw;` 把基类的全部 `draw` 重载重新引入 Oval 的作用域。注意，即使恢复了，通过 `Shape*` 调用 `draw(int)` 仍然只有基类版本参与多态——因为 Oval 没有覆盖它。

**6. `class Cat final : public Feline` 中再声明一个 `virtual void meow()` 有意义吗？**

参考答案：没有实际意义。把 Cat 标记为 final 意味着任何类都不能从 Cat 继承；而 `virtual` 的意义在于允许派生类覆盖。没有派生类，这个函数永远不会被覆盖，`virtual` 完全落空。这段代码能编译，但会误导读者以为存在覆盖的可能。同理，同时写 `virtual` 和 `final` 也是自相矛盾的：final 生效，函数停在当前实现。

**7. 为什么 `Base* p = new Derived(); p->add();` 会得到 12，而不是 22？**

参考答案：`add` 是虚函数，函数体按动态类型选择，所以执行的是 `Derived::add`（+2）。但默认参数在**编译期**按静态类型填入：编译器只看到 `Base*`，于是用 `Base::add` 的默认参数 `5, 5`。两者相加得到 $5+5+2=12$。直接用 Derived 对象调用时静态类型就是 Derived，默认参数取 `10, 10`，结果才是 22。这正说明默认参数不参与动态绑定。

**8. 如果基类析构函数不是虚的，`delete base_ptr` 会发生什么？**

参考答案：编译器按 `base_ptr` 的静态类型调用 `Base::~Base`，派生类的析构函数不会执行。后果有两层：派生层在构造时分配的资源（堆内存、文件句柄等）永远不会释放，造成泄漏；并且 C++ 标准把「通过基类指针删除派生对象而基类析构非虚」定义为未定义行为，实际表现依编译器而异，可能崩溃也可能看似正常。因此只要类中有虚函数，就应把析构函数也声明为 virtual。

## 与前后章的关系

本章建立了运行时多态，也把它的边界讲清楚了：非虚函数、按值存储、默认参数都不参与动态绑定。下一章继续在这套体系上扩展：用 `dynamic_cast` 把基类指针安全地转回派生类指针，用纯虚函数定义抽象类，再用「只有纯虚函数、没有成员变量」的类描述接口。
