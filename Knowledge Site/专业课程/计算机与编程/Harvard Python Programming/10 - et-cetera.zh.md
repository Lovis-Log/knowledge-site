---
slug: 10-et-cetera
title: "收尾工具箱：集合、类型提示、argparse 与生成器"
summary: "最后一章补齐散落的工具：用 set 去重、用 global 处理模块级状态、用常量与类型提示防错、用 docstring 写文档、用 argparse 解析命令行，再用 * 与 ** 解包、推导式、enumerate 收紧代码；最后用 yield 解决「一百万只羊」的内存问题。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, set, type-hints, argparse, generators]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 10 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=48548s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

这是长视频（约 16 小时）的最后一章，对应 CS50P 第 9 次讲座「Et Cetera」，时间区间 13:29:08–15:57:18。前面九章覆盖了函数、条件、循环、异常、库、测试、文件、正则与面向对象；这一章收拢那些没归进任何大主题、但迟早会用到的工具。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 13:30:20 | `set`：自动去重的集合 |
| 13:36:33 | 全局变量、`UnboundLocalError` 与 `global` |
| 13:46:32 | 用类重写银行账户 |
| 13:53:15 | 常量：大写命名只是约定 |
| 13:58:02 | 类型提示：`n: int`、`-> None` 与 mypy |
| 14:16:14 | 文档字符串：三引号与 reST 风格 |
| 14:23:28 | 命令行参数：`sys.argv` 与 `argparse` |
| 14:39:06 | 解包：`*list` 与 `**dict` |
| 14:57:04 | 变长参数：`*args` 与 `**kwargs` |
| 15:06:59 | `map`、列表推导式、`filter`、字典推导式 |
| 15:34:15 | `enumerate`：同时拿索引与值 |
| 15:36:59 | 生成器与 `yield`：一次只给一个 |

## `set`：自动去重

给一串学生记录，想知道霍格沃茨到底有几个学院。手写去重：

```python
houses = []
for student in students:
    if student["house"] not in houses:
        houses.append(student["house"])
```

`set` 直接解决：

```python
houses = set()
for student in students:
    houses.add(student["house"])
```

- 创建空集合必须写 `set()`，`{}` 是空字典；
- 添加元素用 `.add()`，不是 `.append()`；
- 重复元素自动合并；判断成员用 `in`，与列表语法相同。

集合是无序的，打印顺序不保证。要固定顺序就再 `sorted(houses)`。

注意大小写与拼写：`Slytherin` 与 `Slytherinn` 是两个不同的字符串，集合会当作两个元素。数据来自用户时，先统一大小写或做清洗。

## 全局变量与 `global`

```python
balance = 0

def main():
    print("Balance:", balance)
    deposit(100)
    withdraw(50)
    print("Balance:", balance)

def deposit(n):
    balance += n

def withdraw(n):
    balance -= n
```

运行会得到

```
UnboundLocalError: cannot access local variable 'balance' where it is not associated with a value
```

原因：函数里只要出现对 `balance` 的**赋值**，Python 就把这个名字当作局部变量；于是 `balance += n` 里的读取发生在赋值之前，读的是一个尚未存在的局部变量。

读取全局变量没问题，写入才需要声明：

```python
def deposit(n):
    global balance
    balance += n
```

`global` 告诉 Python：这个名字指向模块级的那个变量，不要新建局部变量。

### 为什么不推荐

- 变量藏在文件顶部，函数却在别处修改它，阅读时必须来回跳；
- 函数不再自包含，测试与复用都变难；
- 名称遮蔽容易出错：函数里再定义同名变量，会悄悄盖住全局的。

课程给出的更好写法是类：

```python
class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    def deposit(self, n):
        self._balance += n

    def withdraw(self, n):
        self._balance -= n
```

状态与操作它的方法放在一起，`_balance` 用下划线提示「外部别碰」。`global` 适用于很小的脚本，规模一大就该换成类。

## 常量：只是约定

```python
MEOWS = 3

for _ in range(MEOWS):
    print("meow")
```

大写命名是在告诉读者：这是常量，不要改。但 Python **不阻止**你写 `MEOWS = 4`。Java 的 `final`、C++ 的 `const` 会在编译期拦截，Python 不会。

类里也一样：

```python
class Cat:
    MEOWS = 3

    def meow(self):
        for _ in range(Cat.MEOWS):
            print("meow")
```

写成 `cat.MEOWS` 会在实例上查找，找不到再回到类；写成 `Cat.MEOWS` 更明确。修改实例属性不会影响类属性，这也是容易踩的坑。

## 类型提示与 mypy

```python
def meow(n: int) -> None:
    for _ in range(n):
        print("meow")

number: int = int(input("Number: "))
meow(number)
```

`n: int` 与 `-> None` 是**注解**，不是强制约束。Python 运行时完全不检查，传字符串照样报运行时错误。

想要提前发现，用 mypy：

```bash
pip install mypy
mypy meow.py
```

它会静态分析代码，指出「这里期望 int，却传了 str」。这相当于把错误从「用户运行时遇到」提前到「提交代码前」。

代价是要维护注解，且在动态类型代码里经常需要额外声明。课程的态度是：小脚本可以不用，团队项目值得用。

## 文档字符串

```python
def meow(n: int) -> str:
    """
    Meow n times.

    :param n: Number of times to meow
    :type n: int
    :raise TypeError: If n is not an int
    :return: A string of n meows, one per line
    :rtype: str
    """
    return "meow\n" * n
```

三引号写在函数体第一行，就是 docstring。`help(meow)` 与 `meow.__doc__` 都能读到它。`:param:`、`:type:` 这一套是 reST 风格，Sphinx 等工具可以据此生成网页或 PDF 文档。

注意：这是**约定**，不是 Python 语法。工具只能按约定的格式解析，所以团队要统一风格。

## 命令行参数

### `sys.argv`

```python
import sys

if len(sys.argv) == 1:
    print("meow")
elif len(sys.argv) == 3 and sys.argv[1] == "-n":
    n = int(sys.argv[2])
    for _ in range(n):
        print("meow")
else:
    print("usage: meow.py")
```

`sys.argv` 是字符串列表，第一个元素是脚本名。参数一多，判断就会爆炸：`-n`、`-a`、`--number`，还要考虑顺序。

### `argparse`

```python
import argparse

parser = argparse.ArgumentParser(description="Meow like a cat")
parser.add_argument("-n", default=1, help="number of times to meow", type=int)
args = parser.parse_args()

for _ in range(args.n):
    print("meow")
```

- `ArgumentParser` 是类，`parser` 是对象；
- `add_argument` 声明参数：名字、默认值、帮助文本、类型；
- `parse_args()` 自动读取 `sys.argv` 并解析；
- `args.n` 直接是 `int`，不用手动转换；
- `-h` / `--help` 自动生成帮助信息；
- 用户传了非数字，argparse 自己报错并打印 usage。

这正是「标准库替你处理通用问题」的又一例。

## 解包：`*` 与 `**`

```python
def total(galleons, sickles, knuts):
    return (galleons * 17 + sickles) * 29 + knuts

coins = [100, 50, 25]
print(total(*coins), "Knuts")
```

`*coins` 把列表展开成三个位置参数，等价于 `total(100, 50, 25)`。

```python
coins = {"galleons": 100, "sickles": 50, "knuts": 25}
print(total(**coins), "Knuts")
```

`**coins` 把字典展开成三个**关键字参数**，等价于 `total(galleons=100, sickles=50, knuts=25)`。字典的键必须与参数名一致，否则报 `unexpected keyword argument`。

### 变长参数

反过来，函数也可以接收任意多个参数：

```python
def f(*args, **kwargs):
    print("Positional:", args)
    print("Named:", kwargs)

f(100, 50, 25, galleons=100, sickles=50)
```

- `*args` 收集位置参数，得到一个元组；
- `**kwargs` 收集关键字参数，得到一个字典。

`print` 本身就是这样的函数：`print(*objects, sep=" ", end="\n")`。所以 `print()` 可以没有参数，`print("a")` 可以一个，`print("a", "b")` 可以多个。

## `map`、`filter` 与推导式

### `map`：对每个元素应用函数

```python
words = ["This", "is", "CS50"]
uppercase = map(str.upper, words)
print(*uppercase)          # THIS IS CS50
```

`map` 接收一个函数和一个序列，把函数应用到每个元素。注意 `str.upper` 后面**没有括号**——传的是函数本身，由 `map` 负责调用。

### 列表推导式

```python
uppercase = [word.upper() for word in words]
```

读法是「给我 `word.upper()`，对每个 `word` 在 `words` 里」。它把循环、`append` 和表达式压缩成一行。

加条件：

```python
gryffindors = [
    student["name"]
    for student in students
    if student["house"] == "Gryffindor"
]
```

### `filter`：按条件筛选

```python
def is_gryffindor(s):
    return s["house"] == "Gryffindor"

gryffindors = filter(is_gryffindor, students)
```

`filter` 要求第一个函数返回布尔值，只保留返回 `True` 的元素。也可以直接传 lambda：

```python
filter(lambda s: s["house"] == "Gryffindor", students)
```

### 怎么选

| 目的 | 常用写法 |
| --- | --- |
| 变换每个元素 | 列表推导式 / `map` |
| 按条件筛选 | 列表推导式带 `if` / `filter` |
| 一次变换 + 筛选 | 推导式更清楚 |

`map`/`filter` 返回的是迭代器，`print` 时不会显示列表内容，需要 `list(...)` 或 `*` 解包。推导式直接返回列表。

### 字典推导式

```python
gryffindors = {student["name"]: "Gryffindor" for student in students}
```

外层用花括号、内部写 `键: 值`，就从列表构造出字典。

## `enumerate`

```python
for i, student in enumerate(students):
    print(i + 1, student)
```

`enumerate` 同时给出索引与值，省掉 `range(len(...))` 加下标访问。默认从 0 开始，也可以 `enumerate(students, start=1)`。

## 生成器与 `yield`

```python
def sheep(n):
    flock = []
    for i in range(n):
        flock.append("🐑" * i)
    return flock
```

`n = 10000` 还能跑，`n = 1_000_000` 直接把内存打满，程序被系统杀掉。原因是函数要先造出**全部**结果，再一次性返回。

```python
def sheep(n):
    for i in range(n):
        yield "🐑" * i
```

`yield` 每次只交出一个值，函数暂停在这里，下一次迭代再从暂停处继续。内存里同时只存在一行羊，所以一百万次也能立刻开始输出。

这就是**生成器**：它返回一个**迭代器**，可以用 `for` 逐个取值。函数的状态（循环进行到第几次）由 Python 保存，不需要你手动维护。

两点区别：

- `return` 结束整个函数，`yield` 只是暂停；
- 生成器只能遍历一次，取完就空了；需要重复使用就重新创建。

## 本章结论

- `set` 自动去重，用 `set()` 创建、`.add()` 添加，无序。
- 函数内给全局变量赋值需要 `global`；规模一大应改用类封装状态。
- 常量只是大写约定，Python 不强制；类常量写成 `ClassName.NAME`。
- 类型提示不参与运行，mypy 等工具可以静态检查。
- docstring 用三引号写在函数体首行，reST 风格可被工具生成文档。
- `sys.argv` 手工解析会迅速失控，`argparse` 负责参数、类型、默认值与帮助。
- `*list` 解包为位置参数，`**dict` 解包为关键字参数；反向的 `*args` / `**kwargs` 接收任意数量参数。
- 推导式与 `map`/`filter` 是同一类问题的不同写法；推导式返回列表，`map`/`filter` 返回迭代器。
- `enumerate` 同时给出索引与值。
- 生成器用 `yield` 逐个产出值，把「一次生成全部」变成「按需生成」，解决内存问题。

## 理解检验

**1. 用列表去重与用 `set` 去重，代码与行为上有什么差别？为什么 `{}` 不能创建空集合？**

参考答案：列表去重要手动写 `if x not in list: list.append(x)`，每次插入还要线性扫描，整体复杂度是 $O(n^2)$；`set` 内部用哈希表，`.add()` 平均 $O(1)$，重复元素自动合并，整体接近 $O(n)$。行为上列表保留首次出现的顺序，集合无序，打印顺序不保证，需要顺序时再 `sorted()`。`{}` 在 Python 中已经被字典占用，空字典与空集合必须有不同写法，因此集合用 `set()`。

**2. 为什么在函数里写 `balance += n` 会报 `UnboundLocalError`？`global` 做了什么？**

参考答案：Python 在编译函数时，只要函数体中出现对某个名字的**赋值**，就把这个名字判定为局部变量。`balance += n` 等价于 `balance = balance + n`，右侧的读取发生在赋值之前，而局部变量此时尚未绑定，于是抛出 `UnboundLocalError`。`global balance` 声明这个名字指向模块级变量，赋值和读取都作用于全局那份，不再创建局部变量。注意只读全局变量不需要 `global`，只有写入才需要。

**3. 类型提示会在运行时阻止传错类型吗？那它有什么用？**

参考答案：不会。`def meow(n: int)` 里的 `int` 只是注解，Python 解释器运行时完全不检查，传字符串照样执行到 `range(n)` 才报 `TypeError`。它的价值在于让静态检查工具（如 mypy）在运行前分析代码，指出「这里期望 int、实际是 str」，把错误提前到开发阶段；同时它也是给读者和 IDE 的文档。注解需要维护，所以小脚本可以省略，团队项目更值得使用。

**4. `*coins` 与 `**coins` 有什么区别？`*args` 与 `**kwargs` 又对应什么？**

参考答案：`*coins` 把列表（或元组等可迭代对象）展开成一个个**位置参数**，`total(*coins)` 等价于 `total(100, 50, 25)`；`**coins` 把字典展开成**关键字参数**，`total(**coins)` 等价于 `total(galleons=100, sickles=50, knuts=25)`，因此字典的键必须与参数名一致。反过来定义函数时，`*args` 把任意多个位置参数收集成元组，`**kwargs` 把任意多个关键字参数收集成字典。`print(*objects, sep=" ", end="\n")` 就是这个机制的实际应用。

**5. 列表推导式与 `map`/`filter` 各适合什么场景？为什么 `print(map(...))` 看不到结果？**

参考答案：推导式适合「变换 + 可选筛选」且希望直接得到列表的场景，可读性通常更好；`map` 适合把已有函数直接套用到每个元素，`filter` 适合用现成的布尔函数筛选，二者更贴近函数式风格。`map`/`filter` 返回的是**迭代器**而不是列表，`print` 只会打印迭代器对象本身，看不到内容；要用 `list(...)` 转成列表，或用 `*` 解包传给 `print` 才会逐个输出。

**6. 为什么生成 100 万只羊的版本会崩溃，而 `yield` 版本不会？生成器与普通函数在控制流上有什么不同？**

参考答案：普通函数先把 100 万行字符串全部放进 `flock` 列表再返回，内存占用与 $n$ 成正比，超过可用内存后进程被系统终止。`yield` 版本每产出一行就暂停，内存里只保留当前一行，占用与 $n$ 无关。控制流上，`return` 结束整个函数并交出唯一结果；`yield` 暂停在当前位置，保存局部状态，下一次迭代从暂停处继续。生成器返回的是迭代器，只能遍历一次，取完即空。

**7. 为什么 `argparse` 比手写 `sys.argv` 判断更好？它替你做了哪些事？**

参考答案：手写判断要逐一检查参数个数、位置与名称，支持 `-n`、`--number`、可选参数、默认值时会出现大量嵌套 `if/elif`，顺序变化或新增参数就要重写逻辑。`argparse` 声明式地登记参数（名字、类型、默认值、帮助文本），自动解析 `sys.argv`、按名称取值、把 `type=int` 的转换做好、生成 `-h/--help` 帮助信息，并在用户输入非法时给出标准错误与 usage。它把「通用且重复」的解析工作外包给标准库，让代码只保留业务逻辑。

## 与前后章的关系

这一章是整门课的工具箱收尾：`set` 补充了第 7 章的数据结构，`global` 与类常量把第 9 章的封装讲完整，类型提示与 docstring 让第 6 章的工程习惯延伸到接口层，`argparse` 把第 5 章的库使用推进到「写自己的命令行工具」，推导式与生成器则把前面反复出现的循环写法收束成更紧凑、更省内存的形式。第 8 章的正则、第 7 章的文件读写与本章的 `argparse` 组合起来，就是一个完整的命令行数据处理脚本。
