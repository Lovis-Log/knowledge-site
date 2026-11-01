---
slug: "22-dynamic-cast-abstract-classes"
title: "dynamic_cast、抽象类与接口"
summary: "dynamic_cast 在运行时把基类指针或引用安全地转为派生类型，指针失败返回空指针、引用失败抛异常；构造与析构中调用虚函数只得到基类版本；纯虚函数让类成为抽象类，派生类必须实现全部纯虚函数；只有纯虚函数且没有成员变量的类就是接口。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, dynamic-cast, abstract-class, pure-virtual, interface, typeid]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 22 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=106536s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

本章是 31 小时长视频的第 22 章（末章），对应 **29:35:36–31:07:05**。它把多态的边界补齐：怎样安全地把基类指针转回派生类、为什么构造与析构中不能用多态、怎样用纯虚函数定义抽象类，以及怎样把一组能力封装成可复用的接口。

## 这一章在讲什么

前一章解决了「通过基类指针调用派生版本」。但在实际代码里还有两个反向需求：

1. 手上只有 `Animal*`，却想调用只有 `Dog` 才有的普通函数；
2. 想定义一个「只有接口、没有实现」的基类，禁止任何人直接创建它的对象。

第一个需求对应 `dynamic_cast`，第二个对应纯虚函数与抽象类。本章最后把二者结合，做出 C++ 里模拟「接口」的标准写法。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 29:35 | `dynamic_cast`：基类指针转派生类指针，失败返回空指针 |
| 29:41 | 转引用：失败抛 `std::bad_cast`，无法检查 |
| 29:43 | 引用转指针做安全判断；函数参数中的典型用法 |
| 29:44 | 滥用向下转型是坏设计的信号 |
| 30:05 | `dynamic_cast` 只适用于多态类型 |
| 30:08 | 绝不在构造/析构中调用虚函数 |
| 30:24 | 纯虚函数与抽象类：`= 0` |
| 30:36 | 用 `typeid` 查看动态类型 |
| 30:43 | 接口：只有纯虚函数、没有成员变量的抽象类 |
| 30:53 | StreamInsertable 接口演示：让任意类型直接被 `std::cout` 打印 |

## dynamic_cast：安全地向下转型

### 指针版本

```cpp
class Animal {
public:
    virtual void breathe() const {}
    virtual ~Animal() = default;
};

class Feline : public Animal {
public:
    void do_some_feline_thing() const { /* 只在 Feline 中存在 */ }
};

Animal* animal = new Feline();

Feline* f = dynamic_cast<Feline*>(animal);   // 成功，指向同一个对象
if (f) {
    f->do_some_feline_thing();               // 现在可以调用非虚函数
}

Dog* d = dynamic_cast<Dog*>(animal);         // 失败，返回 nullptr
if (!d) {
    std::cout << "cast to Dog failed\n";
}
```

要点：

- 失败时返回 **空指针**，所以转型之后必须检查；
- 转型成功时，指针指向的还是**同一个对象**，只是类型变成了派生类型，因此可以调用该派生类特有的非虚函数；
- 转型是否成功取决于**对象的动态类型**，而不是指针的静态类型。`animal` 实际指向 Feline，所以转 Feline 成功、转 Dog 失败。

### 引用版本

```cpp
Animal& animal_ref = *animal;
Feline& fref = dynamic_cast<Feline&>(animal_ref);   // 成功
Dog& dref = dynamic_cast<Dog&>(animal_ref);         // 失败，抛 std::bad_cast
```

引用没有「空引用」这种东西，所以失败时只能抛出 `std::bad_cast` 异常。这意味着：

- 无法用 `if` 判断转型是否成功；
- 一旦失败，异常会沿调用栈向上传播，若无人捕获就终止程序。

**实践建议：如果转型可能失败，就用指针版本。** 若手上只有引用，可以先取地址再转成指针：

```cpp
Feline* fp = dynamic_cast<Feline*>(&animal_ref);
if (fp) {
    fp->do_some_feline_thing();
} else {
    std::cout << "cast failed\n";
}
```

这样既保留了引用的入参形式，又获得了可检查的失败信号。

### 典型场景：函数参数

向下转型最常出现在这样的函数里——参数是基类，内部却需要调用派生类的接口：

```cpp
void do_something_with_animal(Animal* animal) {
    if (Feline* f = dynamic_cast<Feline*>(animal)) {
        f->do_some_feline_thing();
    } else {
        std::cout << "not a feline\n";
    }
}

void do_something_with_animal(Animal& animal) {
    if (Feline* f = dynamic_cast<Feline*>(&animal)) {
        f->do_some_feline_thing();
    } else {
        std::cout << "not a feline\n";
    }
}
```

课程在这里给了一句重要提醒：**如果频繁需要向下转型才能调用某个函数，说明设计有问题。** 更合理的做法是把那个函数声明为虚函数，让多态直接完成分派，而不是每次转型。

### 只适用于多态类型

`dynamic_cast` 依赖运行时的类型信息，只有**含虚函数的继承体系**才有这份信息。对两个无关类型使用它，编译就会失败：

```cpp
int data = 45;
// std::string s = dynamic_cast<std::string>(data);      // 错误：目标不是指针或引用
// std::string* sp = dynamic_cast<std::string*>(&data);  // 错误：int 不是多态类型
```

规则：**输入与输出必须属于同一个多态继承体系，且一次只能沿着继承关系转。**

## typeid：查看动态类型

```cpp
Animal* p = new Rectangle(10, 10);
std::cout << typeid(*p).name() << "\n";   // 例如 "9Rectangle"
```

`typeid(*p)` 给出的是**动态类型**（解引用之后才看对象），`typeid(p)` 则是静态类型 `Animal*`。调试多态代码时，它比打印地址更直观。

注意：`name()` 的返回值由实现定义，不同编译器格式不同（GCC 会带上长度前缀），不要把它当成稳定的字符串用于逻辑判断。

## 构造与析构中调用虚函数

这是一个必须记住的规则：**绝不在构造函数或析构函数中调用虚函数。**

```cpp
class Base {
public:
    Base() {
        setup();              // 这里调用的是 Base::setup
    }
    virtual ~Base() {
        cleanup();            // 这里调用的是 Base::cleanup
    }
    virtual void setup()   { m_value = 10; }
    virtual void cleanup() { std::cout << "Base cleanup\n"; }
    int get_value() const { return m_value; }
protected:
    int m_value{0};
};

class Derived : public Base {
public:
    void setup() override   { m_value = 100; }
    void cleanup() override { std::cout << "Derived cleanup\n"; }
};

Base* p = new Derived();
std::cout << p->get_value();   // 输出 10，不是 100
```

原因在构造顺序：

1. 构造 Derived 时，先构造 Base 子对象；
2. 执行 Base 构造函数时，Derived 部分**还不存在**；
3. 此时若允许动态绑定，编译器就得调用一个尚未构造的对象上的函数，属于未定义行为；
4. 标准因此规定：构造/析构期间，虚调用只解析到**当前正在构造或析构的那一层**。

析构同理，只是方向相反：Base 析构运行时，Derived 部分已经被销毁，同样只能调用 Base 的版本。

课程给出的替代方案：把 `setup()` / `cleanup()` 放到对象构造完成之后、销毁之前显式调用：

```cpp
Base* p = new Derived();
p->setup();      // 对象完整，动态绑定生效，m_value 变为 100
// ... 使用 ...
p->cleanup();    // 动态绑定生效，执行 Derived::cleanup
delete p;
```

## 纯虚函数与抽象类

设想一个 `Shape` 基类：它能声明「计算周长」「计算面积」两个操作，却无法给出实现——因为不知道具体是圆、矩形还是三角形。

```cpp
class Shape {
public:
    Shape() = default;
    explicit Shape(std::string_view description) : m_description{description} {}
    virtual ~Shape() = default;

    virtual double perimeter() const = 0;   // 纯虚函数
    virtual double surface() const = 0;     // 纯虚函数

protected:
    std::string m_description;
};
```

语法 `= 0` 表示这是**纯虚函数**：只有声明，没有实现（基类中）。由此产生三个后果：

1. `Shape` 成为**抽象类**，不能创建对象：

```cpp
// Shape s;              // 编译错误：object of abstract class type is not allowed
Shape* p = new Shape();  // 同样错误
```

2. 派生类**必须实现全部纯虚函数**，否则它自己也是抽象类：

```cpp
class Rectangle : public Shape {
public:
    double perimeter() const override { return 2 * (m_width + m_height); }
    double surface() const override { return m_width * m_height; }
private:
    double m_width{0}, m_height{0};
};

class Circle : public Shape {
public:
    double perimeter() const override { return 2 * PI * m_radius; }
    double surface() const override { return PI * m_radius * m_radius; }
private:
    double m_radius{0};
};
```

若 `Circle` 只实现了 `surface`，编译创建 `Circle` 对象时会报 `object of abstract class type is not allowed`——原因不是 Circle 自己写了 `= 0`，而是它没有把继承来的纯虚函数全部实现。

3. 抽象类**仍然可以**有构造函数，供派生类构造基类子对象时使用；只是不能从外部直接创建抽象类对象。

抽象类的价值在于：它把「所有形状都必须能算周长和面积」这条约定写进类型系统，任何漏实现的派生类都无法通过编译。同时，基类指针依然可用：

```cpp
std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Rectangle>(10, 10));
shapes.push_back(std::make_unique<Circle>(5));

for (const auto& s : shapes) {
    std::cout << s->surface() << "\n";   // 多态分派
}
```

### 纯虚函数可以有定义吗

可以有，但只能在类外提供实现，且仍然不能直接实例化该类：

```cpp
// Shape.cpp
double Shape::perimeter() const { return 0; }   // 允许，但派生类仍须覆盖
```

更常见的误解是把实现写进类内：`virtual double perimeter() const = 0 { return 0; }` 会报 `pure specifier on function definition`。`= 0` 的语义就是「此处不给实现」。

## 接口：只有纯虚函数的抽象类

课程把「接口」定义为：

> 一个只包含纯虚函数、且没有成员变量的抽象类。

```cpp
class StreamInsertable {
    friend std::ostream& operator<<(std::ostream& out, const StreamInsertable& operand) {
        operand.stream_insert(out);
        return out;
    }

public:
    virtual void stream_insert(std::ostream& out) const = 0;
    virtual ~StreamInsertable() = default;
};
```

这个接口只做一件事：让任何继承它的类型都能被 `std::cout << obj` 打印。

### 它如何工作

1. `operator<<` 是接口的友元，接收任意 `StreamInsertable` 的引用；
2. 它内部调用 `operand.stream_insert(out)`，这是纯虚函数，运行时分派到真实类型；
3. 派生类只需实现 `stream_insert`，就自动获得 `<<` 的能力，**不必自己重载输出运算符**。

```cpp
class Point : public StreamInsertable {
public:
    Point(double x, double y) : m_x{x}, m_y{y} {}

    void stream_insert(std::ostream& out) const override {
        out << "Point[x:" << m_x << ", y:" << m_y << "]";
    }

private:
    double m_x{0};
    double m_y{0};
};

Point p{10, 20};
std::cout << p << "\n";   // Point[x:10, y:20]
```

`Point` 里没有 `operator<<`，却能直接被打印——能力来自接口。

### 接口可以挂到整条继承链上

```cpp
class Animal : public StreamInsertable {
public:
    void stream_insert(std::ostream& out) const override {
        out << "Animal[" << m_description << "]";
    }
protected:
    std::string m_description;
};
```

从 `Animal` 派生的每一层都要实现 `stream_insert`（否则该层仍为抽象类），并在其中打印自己的数据。通过基类指针打印时，`operator<<` 里的虚调用会分派到最具体的一层：

```cpp
std::vector<std::shared_ptr<Animal>> animals;
animals.push_back(std::make_shared<Dog>("dog one"));
animals.push_back(std::make_shared<Cat>("cat one"));

for (const auto& a : animals) {
    std::cout << *a << "\n";   // 各按自己的格式输出
}
```

这就是接口的用法：**把一项能力（可打印、可比较、可序列化）抽出来做成抽象类，任何类型继承它，就获得这项能力**，而不必在每个类里重复实现。

## 本章结论

- `dynamic_cast` 在运行时把基类指针/引用转为派生类型；指针失败返回 `nullptr`，引用失败抛 `std::bad_cast`。
- 转型后必须检查结果；可能失败时优先用指针版本。
- 向下转型只适用于多态类型（含虚函数的继承体系）。
- 频繁向下转型是设计信号：应考虑把该函数改为虚函数。
- 构造与析构期间，虚调用的目标只解析到当前层，因此不要在其中调用虚函数。
- 纯虚函数 `= 0` 使类成为抽象类；派生类必须实现全部纯虚函数，否则自身仍为抽象类。
- 抽象类不能实例化，但可以持有基类指针、管理派生对象。
- 接口 = 只含纯虚函数、无成员变量的抽象类；继承接口即获得一组能力。
- `typeid` 可查看动态类型，但 `name()` 的输出格式由实现决定。

## 理解检验

**1. `dynamic_cast<Derived*>(base_ptr)` 失败时返回什么？`dynamic_cast<Derived&>(base_ref)` 失败时又会怎样？**

参考答案：指针版本失败返回 `nullptr`，因此调用方必须判空；引用版本失败抛出 `std::bad_cast` 异常。引用版本没有「空引用」可供检查，所以失败只能以异常形式出现，若无人捕获就会终止程序。两者的成功条件相同：对象的动态类型必须是目标类型，或是其派生类型。

**2. 为什么课程建议尽量用指针做向下转型，而不是引用？**

参考答案：指针可以表示「转型失败」这一状态（空指针），调用方能用 `if` 检查并选择回退路径。引用一旦绑定就必须指向有效对象，失败只能抛异常，而异常在这种「一次可选的功能分派」场景里代价高、控制流也更难读。如果手上只有引用，可以取地址 `&ref` 再转成指针，既保留引用的入参形式，又获得可检查的失败信号。

**3. `dynamic_cast` 能否把 `int*` 转成 `std::string*`？为什么？**

参考答案：不能。`dynamic_cast` 依赖运行时类型信息，而这类信息只对含虚函数的类（多态类型）存在。`int` 不是多态类型，`int*` 与 `std::string*` 也不在同一个继承体系中，因此编译阶段就会报错（目标不是类指针，或源类型不是多态类型）。它的设计用途只有一种：在同一多态继承体系内，从基类转向派生类。

**4. 为什么在 Base 构造函数里调用虚函数 `setup()`，执行的是 `Base::setup` 而不是 `Derived::setup`？**

参考答案：构造 Derived 时，先构造 Base 子对象；执行 Base 构造函数时，Derived 部分尚未初始化。如果此时允许动态绑定，就会在一个「还没成为 Derived」的对象上调用 Derived 的成员函数，访问未初始化的数据，属于未定义行为。标准因此规定：构造或析构期间，虚调用只解析到当前正在执行构造/析构的那一层。析构同理，Base 析构运行时 Derived 部分已被销毁，也只能调用 Base 版本。正确做法是在对象完整构造之后、销毁之前显式调用这些函数。

**5. 一个派生类只实现了继承来的两个纯虚函数中的一个，会发生什么？报错信息看起来像什么？**

参考答案：该派生类自身仍然是抽象类，因为它还带着一个未实现的纯虚函数。尝试创建它的对象会报错，典型信息是 `object of abstract class type 'Circle' is not allowed`，并附一条说明「因为下列虚函数在 Circle 中是纯虚的」。注意错误出现在**使用对象的地方**，而不是漏实现函数的地方，所以初学者常困惑于「我并没有写 `= 0`」。解决办法是把继承来的纯虚函数全部实现。

**6. 纯虚函数能否在基类中提供实现？怎么写才合法？**

参考答案：可以，但不能写进类内的声明处。`virtual double perimeter() const = 0 { return 0; }` 会报 `pure specifier on function definition`，因为 `= 0` 的语义就是「此处不提供实现」。合法写法是在类外定义：`double Shape::perimeter() const { return 0; }`。即便如此，Shape 仍是抽象类，派生类仍必须覆盖该函数，基类实现只能在派生类显式调用 `Shape::perimeter()` 时才被执行。

**7. 按课程定义，什么样的类才算「接口」？继承接口后为什么不用自己重载 `operator<<`？**

参考答案：接口是只包含纯虚函数、且没有成员变量的抽象类（虚析构函数不算成员变量）。`StreamInsertable` 把 `operator<<` 实现为接口的友元，函数体只做一件事：调用 `operand.stream_insert(out)`。`stream_insert` 是纯虚函数，运行时分派到真实类型。派生类实现 `stream_insert` 之后，`operator<<` 自然可用，因此不需要在每个类里重复写输出运算符。接口的本质就是「把一项能力抽出来，继承即获得」。

## 与前后章的关系

本章结束于继承与多态这一大块内容的边界：动态类型转换、抽象契约与接口。至此课程覆盖了从变量、控制流、指针、函数、类，到继承、多态与抽象设计的完整链条。后续的模板、智能指针、异常与标准库容器，都会以这些概念为地基；回看本章的抽象类与接口，会更容易理解标准库为什么把「可输出」「可比较」这类能力设计成独立的类型约束。
