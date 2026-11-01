---
slug: "07-classes-and-oop"
title: "类与面向对象：把数据和操作打包在一起"
summary: "用工具箱的比方理解类，掌握 class、__init__ 与 self 的写法，分清实例属性与方法，用继承扩展已有类，并判断什么时候该用类、什么时候函数就够了。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - python
  - oop
  - classes
  - inheritance
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 7 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=13549s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

这是整门课里最「进阶」的一章。目标不是让你立刻写出复杂的类层次，而是建立正确的概念：类是什么、`self` 为什么存在、什么时候值得用类。课程反复强调，这一章只要求「见过的次数够多，以后遇到时能认出它」。

这一章对应长视频第 7 章，时间范围 3:45:49–4:10:04。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 3:45:49 | 面向对象是什么：按「相关数据 + 函数」组织代码 |
| 3:46:28 | 工具箱比喻：有组织的工具 vs 散落的工具 |
| 3:48:17 | 类的定义：蓝图、属性、方法 |
| 3:49:13 | 为什么用类：单文件 → 函数 → 多文件 → 类 |
| 3:50:56 | 第一个类：`class Dog`、`__init__`、`self` |
| 3:53:50 | 默认参数、实例属性、不同实例互不影响 |
| 3:56:23 | 真实例子：`APIConfig` 管理配置 |
| 3:59:08 | 类与实例的区别（常见错误） |
| 4:00:38 | 方法：`DataValidator` 累积错误 |
| 4:05:12 | 继承：`Animal` → `Dog` |
| 4:07:44 | 何时用类、何时用函数 |

## 为什么要有类

课程先给了一个诚实的说明：到目前为止学的东西，不用类也都能做。类不是 Python 的隐藏功能，它只是另一种组织代码的方式。

比方是一个工具箱。不用面向对象时，锤子、螺丝刀、钉子全堆在箱子里，需要什么就去翻。用了类，工具箱内部分了格子，锤子有锤子那一格，伸手就能拿到。功能没有变，找东西变快了。

代码里的「工具」就是函数。项目变大以后，相关的一组数据和操作它们的函数散落在各处，读起来很累；把它们收进同一个类，调用时就有一层清晰的边界。

课程给出的成长路径是这样的：

1. 所有代码写在一个文件里；
2. 把重复逻辑抽成函数；
3. 把函数拆到多个文件里；
4. 把相关的函数和数据收进类。

到第 4 步时，代码的「入口」变得更清楚：你面对的不再是十几个散落的函数，而是一个有名字、有状态的对象。

## 类、对象、属性、方法

四个词先分清：

- **类（class）**：创建对象的蓝图，定义「这类东西有什么数据、能做什么」。
- **对象（object）/ 实例（instance）**：按蓝图实际创建出来的一个具体存在。
- **属性（attribute）**：对象上存的数据。
- **方法（method）**：定义在类里的函数，描述对象能做的动作。

`class Dog:` 是蓝图，`jerry = Dog("Jerry", "Labrador")` 是按蓝图造出的一只具体的狗。

## 第一个类：从 `__init__` 和 `self` 开始

```python
class Dog:
    def __init__(self, name, breed="unknown"):
        self.name = name
        self.breed = breed

    def bark(self):
        print(f"{self.name} says woof")
```

逐行看：

- `class Dog:` 定义类，类名习惯用大驼峰。
- `__init__` 是初始化方法，创建对象时自动调用。前后各两个下划线，Python 里称为 dunder（double underscore）方法。
- 第一个参数固定是 `self`，表示「正在被创建的这个对象」。
- `self.name = name` 把参数存到对象上，成为实例属性。
- `breed="unknown"` 是默认值，创建时可以省略。

使用：

```python
jerry = Dog("Jerry", "Labrador")
print(jerry.name)      # Jerry
print(jerry.breed)     # Labrador
jerry.bark()           # Jerry says woof

tim = Dog("Tim")       # breed 使用默认值
print(tim.breed)       # unknown
```

`self` 是这一章最别扭的地方。它存在的原因是：同一个类可以造出很多对象，每个对象要记住自己的数据。`self.name` 表示「这个对象自己的 name」，而不是类上共享的 name。正因为有 `self`，`jerry.name` 和 `tim.name` 才能互不干扰。

## 类与实例：最常见的错误

`APIConfig` 是一个更贴近工作的例子：

```python
class APIConfig:
    def __init__(self, api_key, model, max_tokens, base_url):
        self.api_key = api_key
        self.model = model
        self.max_tokens = max_tokens
        self.base_url = base_url


dev_config = APIConfig(
    api_key="sk-dev",
    model="gpt-3.5-turbo",
    max_tokens=500,
    base_url="https://api.openai.com/v1",
)

prod_config = APIConfig(
    api_key="sk-prod",
    model="gpt-4o",
    max_tokens=4000,
    base_url="https://api.openai.com/v1",
)
```

开发环境用便宜快速的小模型，生产环境换成更强的模型——两套配置都是 `APIConfig` 的实例，各自保存自己的参数。取用时写 `dev_config.model`、`prod_config.max_tokens`，比散落的一堆全局变量清楚得多。

这里有一个初学者几乎一定会踩的坑：

```python
print(APIConfig.model)     # AttributeError
```

报错的原因是：`model` 属于**实例**，不属于**类**。类只是蓝图，蓝图本身没有某个具体模型的名称；必须先创建实例，再从实例上取。

课程列出的其他常见错误：忘记写 `__init__`、方法里漏掉 `self`、创建对象时漏掉括号、把属性设在类上而不是实例上。

## 方法：让对象带有行为

属性存数据，方法给行为。下面的 `DataValidator` 展示了方法如何利用对象自身的状态：

```python
class DataValidator:
    def __init__(self):
        self.errors = []

    def validate_email(self, email):
        if "@" not in email:
            self.errors.append(f"invalid email: {email}")
            return False
        return True

    def validate_age(self, age):
        if not 0 <= age <= 150:
            self.errors.append(f"invalid age: {age}")
            return False
        return True

    def get_errors(self):
        return self.errors
```

使用：

```python
validator = DataValidator()

validator.validate_email("bad-email")   # False
validator.validate_age(200)             # False
validator.validate_email("a@b.com")     # True

print(validator.get_errors())
# ['invalid email: bad-email', 'invalid age: 200']
```

关键在于 `self.errors`：它属于这个 validator 实例。每验证失败一次就往里追加一条，于是这个对象在多次调用之间**记住**了发生过什么。这正是类相对纯函数的价值——不是多了什么能力，而是把状态和行为放在了同一处。

## 继承：在已有类的基础上扩展

继承让一个类直接获得另一个类的属性和方法，再补充或改写自己的部分。

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating")

    def sleep(self):
        print(f"{self.name} is sleeping")


class Dog(Animal):
    def bark(self):
        print(f"{self.name} says woof")


buddy = Dog("Buddy")
buddy.eat()     # Buddy is eating（来自 Animal）
buddy.sleep()   # Buddy is sleeping（来自 Animal）
buddy.bark()    # Buddy says woof（Dog 自己的）
```

`class Dog(Animal)` 括号里的 `Animal` 是父类。`Dog` 没有定义 `eat` 和 `sleep`，但实例可以直接调用，因为它们继承自 `Animal`。

继承还能改写父类的方法（override）：如果父类有 `make_sound`，子类可以重新定义同名方法，让具体动物发出不同声音。

课程对继承的要求很低：知道「子类自动获得父类的东西，并可以加自己的东西」即可，不必在这一章深挖多态与抽象类。

## 什么时候用类，什么时候用函数

这是本章最实用的一节。两种范式都能完成任务，选择标准是「哪种更清楚」。

用函数更合适：

- 简单的输入输出转换；
- 无状态操作，不需要记住上一次发生了什么；
- 一次性的小脚本。

用类更合适：

- 需要在多次操作之间保留状态；
- 一组数据和操作它们的函数天然属于一起；
- 需要创建多个行为相似、数据不同的实例；
- 要给现实中的概念建模型（配置、校验器、数据管道）。

课程的建议是：**从函数开始**。函数更简单，通常也够用。只有当你发现自己反复在多个函数之间传递同一组数据、或者需要维持状态时，再引入类。

## 本章结论

- 类是蓝图，对象是按蓝图创建的实例；属性存数据，方法给行为。
- `__init__` 在创建对象时自动运行，第一个参数必须是 `self`；`self` 让每个实例记住自己的数据。
- `Class.attr` 访问的是类，`instance.attr` 访问的是实例；属性通常定义在实例上。
- 方法可以修改实例属性，于是对象能在多次调用之间累积状态。
- 继承让子类获得父类的属性和方法，并可以增加或改写。
- 优先用函数；需要状态或需要把相关数据和操作打包时，再用类。

## 理解检验

**1. 为什么 `Dog("Jerry", "Labrador")` 创建出来的对象，`self.name` 不会和另一只狗的 `name` 混在一起？**

参考答案：每次调用类都会创建一个新的实例，`__init__` 里的 `self` 指向这次创建的实例。`self.name = name` 把值写在这个实例自己的属性字典上，而不是写在类上。因此 `jerry.name` 与 `tim.name` 是两个独立存储的值，互不影响。如果写成类属性（在 `class` 体内、方法外直接 `name = ...`），所有实例才会共享同一个值。

**2. 执行 `print(APIConfig.model)` 为什么报 `AttributeError`？怎样才能取到模型名？**

参考答案：`model` 是在 `__init__` 中通过 `self.model` 赋值的**实例属性**，只有在创建实例之后才存在。类本身只是蓝图，没有绑定任何具体的模型名。正确写法是先创建实例，例如 `dev_config = APIConfig(...)`，再访问 `dev_config.model`。若确实需要类级别的默认值，可以在类体中定义类属性，但那与实例属性的语义不同。

**3. `def bark(self):` 里漏写 `self` 会怎样？漏写之后调用 `jerry.bark()` 会发生什么？**

参考答案：若定义成 `def bark():`，调用 `jerry.bark()` 时 Python 仍会把实例作为第一个参数传进去，于是报 `TypeError: bark() takes 0 positional arguments but 1 was given`。`self` 不是关键字，只是约定俗成的名字，但位置必须留着：它是实例传入方法的位置。写成 `def bark(this):` 也能工作，但不合约定，读代码的人会困惑。

**4. `DataValidator` 每次验证失败都往 `self.errors` 里追加一条。为什么第二次调用 `validate_email` 时，第一次的错误还在？**

参考答案：`self.errors` 在 `__init__` 中初始化为一个列表，这个列表属于 validator 实例。`validate_email` 通过 `self.errors.append(...)` 修改的是同一个列表对象，而实例在两次调用之间一直存在，所以之前追加的元素仍在。这也解释了为什么应该把 `self.errors = []` 放在 `__init__` 里而不是放在方法里：放在方法里每次调用都会重置，累积就失效了。另外，可变默认参数（例如 `def __init__(self, errors=[])`）会让所有实例共享同一个列表，是另一个需要避免的写法。

**5. `class Dog(Animal)` 中，`Dog` 没有定义 `eat`，为什么 `buddy.eat()` 能正常运行？如果想改变 `Dog` 吃东西的方式，该怎么做？**

参考答案：`Dog` 继承自 `Animal`，属性查找的顺序是先找 `Dog` 自己，再找父类 `Animal`，所以 `eat` 从父类继承而来。要改变行为，在 `Dog` 里重新定义同名方法即可覆盖父类版本：

```python
class Dog(Animal):
    def eat(self):
        print(f"{self.name} eats dog food")
```

这称为方法重写（override）。调用 `buddy.eat()` 时先找到 `Dog.eat`，就不会再用父类的版本；而 `buddy.sleep()` 仍然使用父类的实现。

**6. 有两个需求：(a) 把一批 CSV 的金额统一乘以汇率；(b) 反复校验用户输入并累积所有错误，最后一次性返回。哪个更适合用类？为什么？**

参考答案：(b) 更适合用类。它需要在多次调用之间保留状态（累积的错误列表），并且「错误列表 + 校验方法」天然是一组。用类可以写成 `validator = DataValidator()`，每次校验失败就往 `self.errors` 追加，最后调用 `get_errors()` 一次取回；用函数则需要每次把列表作为参数传进传出，容易漏传或误重置。(a) 是无状态的转换，输入一批数据、输出一批数据，一个函数 `apply_rate(df, rate)` 就够了，引入类只会增加一层没有必要的包装。

## 与前后章的关系

上一章把代码拆成模块，这一章把「数据 + 行为」进一步打包成对象。下一章转向日常工具：Git 记录版本、GitHub 托管代码，配合 VS Code 的图形界面，把「保存—提交—推送」变成几次点击。再下一章处理密钥管理与依赖管理，为真正交付项目做准备。
