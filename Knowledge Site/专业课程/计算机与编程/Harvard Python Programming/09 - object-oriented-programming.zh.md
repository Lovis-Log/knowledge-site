---
slug: 09-object-oriented-programming
title: "面向对象：从元组、字典到自己的类"
summary: "同一个「学生」问题，从元组、列表、字典一路尝试到类：用 __init__ 构造与校验，用 raise 拒绝非法数据，用 __str__ 控制打印，用 property 守住属性，用 classmethod 表示「只此一个」的排序帽，再用继承和 super() 消除重复，最后用 __add__ 让两个金库相加。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, oop, classes, inheritance, properties]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 9 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=38267s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

这是长视频（约 16 小时）的第 9 章，对应 CS50P 第 8 次讲座「Object-Oriented Programming」，时间区间 10:37:47–13:29:08。前面几章以过程式写法为主：把步骤自上而下排好，再抽出函数。这一章引入第三种范式——面向对象，用「类」把相关的数据和行为打包在一起。

## 一个具体问题：存一个学生

程序要从用户那里拿到姓名和学院，再打印出来。

```python
name = input("Name: ")
house = input("House: ")
print(f"{name} from {house}")
```

它是对的，但没有任何结构。把输入抽成函数：

```python
def main():
    name = get_name()
    house = get_house()
    print(f"{name} from {house}")

def get_name():
    return input("Name: ")

def get_house():
    return input("House: ")
```

函数只是一层抽象。真正的麻烦出现在「一个函数要返回两个值」的时候。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 10:37:47 | 三种编程范式：过程式、函数式、面向对象 |
| 10:39:43 | 从 `student.py` 开始，逐步加功能 |
| 10:44:34 | `get_student` 要返回两个值：元组 |
| 10:47:22 | 元组不可变；改 `Padma` 的学院报 `TypeError` |
| 10:54:06 | 改成列表：可变，但只能按位置访问 |
| 10:56:25 | 改成字典：用键访问，语义更好 |
| 11:05:46 | `class Student`：自己发明数据类型 |
| 11:17:00 | `__init__`、`self`、实例变量与构造调用 |
| 11:30:23 | 在类里校验：`raise ValueError("missing name")` |
| 11:40:30 | `__str__`：让 `print` 输出可读内容 |
| 11:46:36 | 自定义方法 `charm` |
| 12:00:48 | `@property` 与 setter：防止绕过校验 |
| 12:18:26 | Python 只有「荣誉制」，`_house` 仍可被改写 |
| 12:20:04 | `int`、`str`、`list`、`dict` 本来就是类 |
| 12:29:15 | `@classmethod` 与类变量：排序帽 |
| 12:59:02 | 继承：`Wizard` → `Student` / `Professor`，`super().__init__` |
| 13:13:02 | 运算符重载：`__add__` 让两个金库相加 |

## 返回多个值：元组

```python
def get_student():
    name = input("Name: ")
    house = input("House: ")
    return name, house

def main():
    name, house = get_student()
    print(f"{name} from {house}")
```

`return name, house` 看起来返回两个值，实际上返回一个**元组**（tuple）。元组是有序、不可变的序列，可以解包，也可以按索引访问：`student[0]`、`student[1]`。

不可变是设计特性：

```python
student = ("Padma", "Gryffindor")
student[1] = "Ravenclaw"
```

运行会得到

```
TypeError: 'tuple' object does not support item assignment
```

想要「可修改」，就换成列表 `["Padma", "Gryffindor"]`。但列表仍有问题：`student[0]` 是名字、`student[1]` 是学院，这个约定只存在于程序员的记忆里。字段一多，必然记错。

## 字典：语义更好，但仍然松散

```python
def get_student():
    name = input("Name: ")
    house = input("House: ")
    return {"name": name, "house": house}

def main():
    student = get_student()
    print(f"{student['name']} from {student['house']}")
```

用键代替下标，可读性立刻提升。注意 f-string 的引号：外层已是双引号，键要用单引号，否则 Python 无法判断字符串在哪里结束。

字典的问题在于**它来者不拒**。任何键、任何值都能放进去，没有校验，也没有行为。想要「学生只能来自四个学院」「名字不能为空」，字典本身给不了约束。

## 类：自己发明数据类型

```python
class Student:
    ...

def get_student():
    student = Student()
    student.name = input("Name: ")
    student.house = input("House: ")
    return student
```

`class Student:` 定义了一个新类型；`Student()` 创建它的一个**对象**（也叫实例）。`student.name = ...` 在对象上挂了一个**属性**（实例变量）。

术语对照：

| 术语 | 含义 |
| --- | --- |
| 类（class） | 蓝图、模具，定义这类对象长什么样 |
| 对象 / 实例 | 按蓝图造出来的具体东西 |
| 属性 / 实例变量 | 对象内部的数据 |
| 方法 | 定义在类里的函数 |

## `__init__`：构造与校验

手工逐个挂属性太松散。`__init__` 让对象在创建时就确定内容：

```python
class Student:
    def __init__(self, name, house):
        self.name = name
        self.house = house

def get_student():
    name = input("Name: ")
    house = input("House: ")
    return Student(name, house)
```

几个容易困惑的点：

- `Student(name, house)` 是**构造调用**（constructor call），Python 会创建空对象，再自动调用 `__init__`；
- `self` 是 Python 自动传入的第一个参数，指向刚创建的那个对象，所以不用在调用时写它；
- `self.name = name` 把参数存进对象，形成实例变量。

现在可以在 `__init__` 里做校验：

```python
class Student:
    def __init__(self, name, house):
        if not name:
            raise ValueError("Missing name")
        if house not in ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]:
            raise ValueError("Invalid house")
        self.name = name
        self.house = house
```

`raise` 是主动抛出异常。这里不能只 `print` 然后继续——对象已经造出来了，程序必须让调用方知道「这个对象不合法」。也不能 `sys.exit()`：那会终止整个程序，而调用方可能只想捕获这个错误、继续处理下一条数据。

```python
try:
    student = Student(name, house)
except ValueError as e:
    print(e)
```

## `__str__`：控制打印

直接 `print(student)` 会输出

```
<__main__.Student object at 0x102733e80>
```

这是对象的默认表示：类型名加内存地址。定义 `__str__` 可以覆盖：

```python
class Student:
    def __init__(self, name, house):
        ...
        self.name = name
        self.house = house

    def __str__(self):
        return f"{self.name} from {self.house}"
```

现在 `print(student)` 调用 `__str__`，输出 `Harry from Gryffindor`。`__str__` 是「给用户看」的表示；还有一个 `__repr__` 是「给开发者看」的表示，通常包含类型信息。

## 方法：对象会做事

```python
class Student:
    ...
    def charm(self):
        match self.patronus:
            case "Stag":
                return "🐴"
            case "Otter":
                return "🦦"
            case "Jack Russell terrier":
                return "🐶"
            case _:
                return "🪄"
```

方法就是类里的函数，第一个参数永远是 `self`。`student.charm()` 时 Python 自动把 `student` 作为 `self` 传入。与 `__init__`、`__str__` 不同，这个方法不会自动被调用，需要显式写 `student.charm()`。

## `property`：把校验守住

上面的校验有一个漏洞。即使 `__init__` 拒绝了非法值，程序之后仍能直接改写：

```python
student = Student("Harry", "Gryffindor")
student.house = "Number Four, Privet Drive"   # 绕过了校验
```

因为 `__init__` 只在创建时执行一次。要堵住这个口子，用属性（property）：

```python
class Student:
    def __init__(self, name, house):
        self.name = name
        self.house = house      # 注意：这里也走 setter

    @property
    def house(self):
        return self._house

    @house.setter
    def house(self, house):
        if house not in ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]:
            raise ValueError("Invalid house")
        self._house = house
```

机制如下：

- `@property` 把 `house` 定义成 getter，读取 `student.house` 时调用它；
- `@house.setter` 定义 setter，写入 `student.house = ...` 时调用它；
- 真正的存储放在 `self._house`，下划线是为了避免与属性同名冲突；
- `__init__` 里写 `self.house = house`（不带下划线），于是初始化也要经过 setter，校验只写一遍。

### Python 的「荣誉制」

即便如此，仍可以直接写 `student._house = "..."` 绕过一切。Python 没有 Java 那种 `private` 关键字，下划线只是**约定**：一个下划线表示「请不要碰」，两个下划线表示「更强烈地请不要碰」，但语言层面并不阻止。

这不是漏洞，而是设计取向：Python 假设使用者是成年人。需要真正的封装时，靠的是约定、代码评审与文档，而不是编译器。

## 你早就在用类

```python
print(type(50))        # <class 'int'>
print(type("hello"))   # <class 'str'>
print(type([]))        # <class 'list'>
print(type({}))        # <class 'dict'>
```

`int`、`str`、`list`、`dict` 全都是类。`"Hello".lower()` 是在调用 `str` 类的方法，`list.append()` 是 `list` 类的方法。前八章一直在用面向对象，只是没有命名它。

内置类的命名是小写，自定义类按约定用大写开头（`Student`），这是 PEP 8 的风格区分。

## `classmethod` 与类变量

排序帽（Sorting Hat）在故事里只有一个，不需要造很多个对象。这时用类方法：

```python
import random

class Hat:
    houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]

    @classmethod
    def sort(cls, name):
        print(name, "is in", random.choice(cls.houses))

Hat.sort("Harry")
```

- `houses` 写在类里、不在 `__init__` 里，是**类变量**，所有实例共享同一份；
- `@classmethod` 让方法接收 `cls`（类本身）而不是 `self`（某个对象）；
- 调用时直接用 `Hat.sort(...)`，不需要先 `Hat()`。

这解决了一个「鸡生蛋」问题：如果 `get_student` 需要先有学生对象才能调用，逻辑就绕回去了。类方法可以在没有任何实例的情况下工作。

`@staticmethod` 是另一种：既不接收 `self` 也不接收 `cls`，纯粹是「放在类命名空间里的普通函数」，本章没有展开。

## 继承：消除重复

学生和教授都有名字，校验逻辑也一样。复制粘贴是坏味道：

```python
class Wizard:
    def __init__(self, name):
        if not name:
            raise ValueError("Missing name")
        self.name = name

class Student(Wizard):
    def __init__(self, name, house):
        super().__init__(name)
        self.house = house

class Professor(Wizard):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject
```

- `class Student(Wizard)` 表示 `Student` 继承 `Wizard`，自动获得它的属性与方法；
- `super().__init__(name)` 调用父类的初始化，名字校验只写一次；
- 子类可以添加自己的字段（`house`、`subject`），也可以覆盖父类方法。

继承是有层级的：孙类会继承祖父类的功能。多继承在 Python 中可行，但本章只演示单继承链。

补充：Python 的异常体系本身就是继承的——`ValueError` 的父类是 `Exception`，再往上是 `BaseException`。所以 `except Exception` 能捕获几乎所有异常，而 `except ValueError` 只捕获其中一类。自定义异常通常继承已有的异常类，而不是从零开始。

## 运算符重载

两个金库相加，朴素写法要手动取三个字段再构造新对象：

```python
total = Vault(
    potter.galleons + weasley.galleons,
    potter.sickles + weasley.sickles,
    potter.knuts + weasley.knuts,
)
```

希望直接写 `total = potter + weasley`，就要实现 `__add__`：

```python
class Vault:
    def __init__(self, galleons=0, sickles=0, knuts=0):
        self.galleons = galleons
        self.sickles = sickles
        self.knuts = knuts

    def __str__(self):
        return f"{self.galleons} Galleons, {self.sickles} Sickles, {self.knuts} Knuts"

    def __add__(self, other):
        return Vault(
            self.galleons + other.galleons,
            self.sickles + other.sickles,
            self.knuts + other.knuts,
        )
```

`potter + weasley` 时 Python 调用 `potter.__add__(weasley)`，`self` 是左边，`other` 是右边。没有 `__add__` 时，`Vault + Vault` 会报 `TypeError: unsupported operand type(s)`。

`+` 对字符串表示拼接、对列表表示合并，也是同一机制：`str` 与 `list` 类各自实现了 `__add__`。可以重载的运算符不止 `+`，还有 `-`、`<`、`==` 等，但**不能发明新符号**。

## 本章结论

- 元组有序且不可变，列表可变但只能按位置访问，字典用键访问但无约束。
- 类让数据与行为绑定，`class` 定义类型，调用类名创建实例。
- `__init__` 在构造时初始化并校验，`self` 指向当前对象。
- 校验失败用 `raise ValueError`，让调用方决定如何处理，而不是 `print` 或 `sys.exit`。
- `__str__` 决定 `print(obj)` 的输出；`__repr__` 面向开发者。
- `@property` + `@x.setter` 把读写都送进你的代码；真实存储在 `_x`。
- Python 的私有性是约定而非强制，下划线是「请勿触碰」的信号。
- `@classmethod` 接收 `cls`，适合「全类共享一份数据」或「无需实例即可调用」的场景。
- 继承通过 `class Child(Parent)` 与 `super().__init__(...)` 复用代码；异常体系同样是继承结构。
- `__add__` 等特殊方法实现运算符重载，`+` 的语义由类自己定义。

## 理解检验

**1. `return name, house` 到底返回了什么？为什么 `student[1] = "Ravenclaw"` 会报错？**

参考答案：逗号返回的是**一个元组** `(name, house)`，不是两个独立的值；接收方用 `name, house = ...` 是解包。元组是不可变序列，创建后不能修改元素，所以对下标赋值会抛出 `TypeError: 'tuple' object does not support item assignment`。如果需要可修改，应返回列表 `[name, house]`；如果希望语义更清楚，应使用字典或自定义类。

**2. 为什么把校验写在 `__init__` 里还不够？`@property` 补上了什么？**

参考答案：`__init__` 只在对象创建时执行一次。创建之后，代码仍可以写 `student.house = "非法值"` 直接改属性，绕过全部校验。`@property` 把 `house` 变成一个由 getter/setter 控制的属性：读取走 getter，赋值走 setter。setter 里重新执行校验，非法值会抛异常。真正的存储放在 `self._house`，从而避免属性名与实例变量名冲突。这样无论是初始化还是事后修改，都必须经过同一段校验代码。

**3. 既然有 `@property`，为什么还能用 `student._house = ...` 绕过？这说明 Python 的什么设计取向？**

参考答案：Python 没有 `private` 这类语言级访问控制，下划线只是命名约定：`_house` 表示「内部使用，请不要碰」，但它仍是普通属性，可以直接赋值。Python 选择「荣誉制」（honor system）：信任使用者遵守约定，而不是让编译器强制。封装靠约定、代码评审与文档保证，而不是语言机制。这与 Java 的 `private` 有本质区别。

**4. `@classmethod` 与普通实例方法有什么区别？排序帽为什么适合用类方法？**

参考答案：实例方法第一个参数是 `self`，指向某个具体对象，必须先创建实例才能调用；类方法用 `@classmethod` 装饰，第一个参数是 `cls`，指向类本身，可以直接用 `Hat.sort(...)` 调用而无需 `Hat()`。排序帽在设定中只有一个，也不需要保存每个帽子的独立状态，它需要的是一份共享的学院列表和一个排序动作——这正是类变量加类方法的场景。此外，如果「获取学生」的逻辑写成实例方法，就得先有学生对象才能调用它，形成鸡生蛋的循环；类方法避开了这个问题。

**5. `class Student(Wizard)` 加 `super().__init__(name)` 解决了什么重复？如果不写 `super().__init__` 会怎样？**

参考答案：`Student` 与 `Professor` 都需要保存并校验 `name`，这段逻辑原本要在两个类里各写一遍。把 `name` 与校验上移到父类 `Wizard`，子类通过 `super().__init__(name)` 复用，只保留各自的字段（`house`、`subject`）。如果不调用 `super().__init__(name)`，父类的初始化不会执行，`self.name` 根本不会被设置，校验也不会发生；访问 `student.name` 会得到 `AttributeError`。继承只提供方法，不会自动替你调用父类构造。

**6. `potter + weasley` 为什么需要 `__add__`？`self` 与 `other` 分别对应什么？**

参考答案：`+` 对自定义类型没有默认语义，Python 会尝试调用左操作数的 `__add__` 方法；若未定义，就抛出 `TypeError: unsupported operand type(s) for +: 'Vault' and 'Vault'`。定义 `__add__(self, other)` 后，`potter + weasley` 等价于 `potter.__add__(weasley)`：`self` 是左边的 `potter`，`other` 是右边的 `weasley`。方法内部读取两者的三个字段相加，返回一个新的 `Vault`。字符串的拼接、列表的合并，底层也是各自类实现了 `__add__`。

**7. 校验失败时为什么用 `raise ValueError`，而不是 `print("Invalid")` 或 `sys.exit()`？**

参考答案：`print` 只是输出一行文字，程序会继续执行，调用方无法知道对象是否合法，可能把错误数据存进数据库。`sys.exit()` 会终止整个程序，代价过大——批量处理数据时，一条坏记录不应该让整个任务停下。`raise ValueError("Invalid house")` 把错误交给调用方：它可以立刻处理，也可以用 `try/except` 跳过这一条继续处理下一条数据。异常是「可恢复的错误信号」，退出程序不是。

## 与前后章的关系

第 8 章用正则清洗用户输入，本章把清洗后的值装进类，并让类自己负责校验。第 10 章会把多个类与函数组织成命令行程序，届时 `argparse`、文件读写、异常处理与类会一起出现。更往后，任何稍大的 Python 项目都会用类来建模实体，本章的 `__init__`、property、继承与特殊方法是最常用的四个抓手。
