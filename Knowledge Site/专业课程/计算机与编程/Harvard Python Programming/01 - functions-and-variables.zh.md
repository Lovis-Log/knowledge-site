---
slug: "01-functions-and-variables"
title: "函数与变量：从 hello, world 到自己的函数"
summary: "CS50P 第一讲：用文本编辑器与终端写出第一个 Python 程序，理解函数、参数与副作用，掌握变量、字符串方法、int 与 float 的转换和格式化，最后用 def、return 与作用域写出自己的函数。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "functions"
  - "variables"
  - "strings"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 1 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=0s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## 这一章在讲什么

这是 CS50P 十次讲座里的第一次，主题是**函数与变量**。整门课原本是一个约 16 小时、没有分章的长视频，本章对应开头的课程导论与第 0 周讲座（00:00–1:50:39）。

导论部分先交代整门课的路线：函数与变量 → 条件 → 循环 → 异常 → 库 → 单元测试 → 文件读写 → 正则表达式 → 面向对象 → 收尾。随后正式开讲，从一行 `print` 出发，把「写代码、跑代码、出错、修错」的完整循环走一遍，再逐步加入输入、变量、字符串处理、数值类型，最后落到自定义函数与作用域。

这一章的目标不是记住语法，而是建立几个会贯穿全课的心智模型：**函数是动词，参数是输入，副作用是函数对外界的影响，返回值是函数交还给调用者的东西；变量是内存里的容器，`=` 是赋值而不是相等；Python 按顺序、逐字面地解释你的代码。**

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 课程介绍：整门课的十个主题与学习方式 |
| 5:02 | 第 0 周开始：文本编辑器、VS Code、终端 |
| 6:20 | 第一个程序 `print("hello, world")` 与 `python hello.py` |
| 10:00 | 函数、参数与副作用（side effect） |
| 12:59 | 故意制造语法错误：未闭合的括号 |
| 16:37 | 用 `input()` 让程序与用户交互 |
| 19:46 | 变量、赋值运算符（从右到左） |
| 24:31 | 注释与伪代码（pseudo-code） |
| 29:48 | 字符串拼接：`+`、多参数、`sep` 与 `end` |
| 45:34 | 引号套引号与转义字符 `\` |
| 48:10 | f-string：在字符串里嵌入变量 |
| 50:02 | 字符串方法：`strip`、`capitalize`、`title`、`split` |
| 1:03:59 | 整数 `int`、算术运算与取模 `%` |
| 1:05:18 | 交互模式（REPL） |
| 1:07:23 | 计算器例子，以及 `input` 返回字符串的坑 |
| 1:19:20 | 浮点数 `float`、`round` 与数字格式化 |
| 1:30:51 | 自定义函数：`def`、参数、默认值 |
| 1:40:10 | 函数必须先定义后使用；`main()` 约定 |
| 1:44:00 | 作用域（scope）与 `NameError` |
| 1:45:54 | `return`：返回值与副作用的分工 |

## 从一行代码开始

写 Python 只需要两样东西：一个**文本编辑器**（写代码）和一个**终端**（运行代码）。VS Code 同时提供两者。代码文件以 `.py` 结尾，告诉计算机这是 Python 程序。

第一个程序只有一行：

```python
print("hello, world")
```

在终端里运行：

```bash
python hello.py
```

输出：

```text
hello, world
```

这一行里已经包含三个核心概念：

- **函数**（function）：`print` 是一个动作，一个动词。Python 自带一批这样的动词。
- **参数**（argument）：括号里的 `"hello, world"` 是传给函数的输入，决定它打印什么。
- **副作用**（side effect）：函数对外界产生的影响。`print` 的副作用就是把文字显示到屏幕上。

计算机只理解 0 和 1，`print(...)` 显然不是 0 和 1。负责翻译的是 **Python 解释器**：它从上到下、从左到右读你的文件，把每一行翻译成机器能执行的操作。

## 出错是常态：语法错误

漏掉右括号，程序连运行都不会开始：

```python
print("hello, world"
```

```text
  File "hello.py", line 1
    print("hello, world"
         ^
SyntaxError: '(' was never closed
```

> **一句话总结：** 计算机按字面理解你写的东西。人可以忽略的笔误，对解释器来说是「这句话没说完」。

错误信息有时精准（如上例），有时含糊甚至误导。课程的建议是：读错误信息、定位行号、从最小可运行版本重新加回代码。

## 输入、变量与赋值

让程序问候具体的人，需要 `input()`：

```python
name = input("What's your name? ")
print(f"hello, {name}")
```

这里出现了变量。`name` 是内存里的一个容器，保存用户输入的文本。

关键是那个等号：**它不是「相等」，而是「赋值」**，方向从右到左——先计算右边的 `input(...)`，把它的返回值放进左边的 `name`。

赋值可以反复进行，覆盖旧值：

```python
name = "David"
name = name.strip()   # 右边的旧值处理后，再存回左边
```

### 为什么不能直接写 `print("hello, name")`

因为引号里的内容会被原样打印。去掉引号才会读取变量：

```python
print("hello, ", name)   # 两个参数，print 自动用空格分隔
```

所以引号的有无，决定你打印的是「字面文本」还是「变量的值」。

## 注释与伪代码

`#` 开头的内容是注释，解释器会忽略：

```python
# Ask user for their name
name = input("What's your name? ")

# Say hello to user
print(f"hello, {name}")
```

注释的另一个用途是**伪代码**：先用人话把步骤列出来，再逐行翻译成 Python。程序越长，这个习惯越值钱。

## 把字符串拼起来：五种写法

同一个「你好，某人」有五种实现，课程用它们反复强调：Python 里解决问题的方式往往不止一种。

```python
# 1. 字符串拼接
print("hello, " + name)

# 2. print 的多个参数（自动用空格分隔）
print("hello,", name)

# 3. 覆盖 end 参数，取消自动换行
print("hello, ", end="")
print(name)

# 4. f-string（推荐）
print(f"hello, {name}")

# 5. 先拼好再打印
greeting = "hello, " + name
print(greeting)
```

第 2 种和第 3 种揭示了 `print` 的两个**命名参数**：

- `sep`：多个参数之间的分隔符，默认是一个空格；
- `end`：结尾字符，默认是换行符 `\n`。

`print("hello,", name, sep="???")` 会输出 `hello,???David`。这两个参数都有默认值，所以平时不用写。

### 引号套引号

想打印带引号的句子，会遇到冲突：

```python
print("hello, "friend"")   # 语法错误
```

两种解法：外层用单引号，或给内层引号加反斜杠转义：

```python
print('hello, "friend"')
print("hello, \"friend\"")
```

`\` 是**转义字符**：它告诉 Python「下一个字符是字面字符，不是语法符号」。`\n` 是换行，`\"` 是双引号本身。

## 字符串方法：清理用户输入

用户输入常常带多余空格、大小写混乱。字符串自带一批方法（method）——挂在某个值上的函数，用点号调用：

```python
name = input("What's your name? ")
name = name.strip()        # 去掉首尾空白
name = name.title()        # 每个单词首字母大写
print(f"hello, {name}")
```

输入 `"   dAvId mAlAn  "`，输出 `hello, David Malan`。

方法可以链式调用，写成一行：

```python
name = input("What's your name? ").strip().title()
```

注意求值顺序：先算等号右边，从左到右依次调用 `input`、`strip`、`title`，最后赋值给左边。

几个常用方法：

| 方法 | 作用 | 例子 |
| --- | --- | --- |
| `strip()` | 去掉首尾空白 | `"  hi  ".strip()` → `"hi"` |
| `capitalize()` | 首字母大写，其余小写 | `"dAvId".capitalize()` → `"David"` |
| `title()` | 每个单词首字母大写 | `"david malan".title()` → `"David Malan"` |
| `split(sep)` | 按分隔符切成列表 | `"David Malan".split(" ")` → `["David", "Malan"]` |
| `lower()` / `upper()` | 全部小写 / 大写 | `"Hi".lower()` → `"hi"` |

`split` 常与「一次赋多个变量」配合：

```python
first, last = input("What's your name? ").split(" ")
print(f"hello, {first}")
```

## 整数、浮点数与转换

### int

整数类型 `int` 没有小数点。常用运算：

| 运算 | 符号 | 例子 |
| --- | --- | --- |
| 加 | `+` | `1 + 2` → `3` |
| 减 | `-` | `5 - 2` → `3` |
| 乘 | `*` | `3 * 4` → `12` |
| 除 | `/` | `6 / 2` → `3.0`（结果是 float） |
| 取余 | `%` | `7 % 3` → `1` |

`%` 不是百分比，是**取模**：除完之后的余数。

### 计算器的坑：input 永远返回字符串

```python
x = input("What's x? ")
y = input("What's y? ")
print(x + y)
```

输入 `1` 和 `2`，输出却是 `12`。原因：`input` 返回的是**字符串**，`+` 对字符串执行的是拼接，不是加法。

修复需要类型转换：

```python
x = int(input("What's x? "))
y = int(input("What's y? "))
print(x + y)      # 3
```

`int` 既是类型名，也是函数：把「看起来像整数」的字符串转成真正的整数。可以嵌套调用——先 `input`，再 `int`：

```python
print(int(input("What's x? ")) + int(input("What's y? ")))
```

嵌套越深越难读，课程的建议是**优先可读性**，不要为了少写一行而牺牲清晰。

### float 与格式化

`float` 是带小数点的数：

```python
x = float(input("What's x? "))
y = float(input("What's y? "))
print(x + y)
```

输入 `1.2` 和 `3.4`，输出 `4.6`。

`round` 可以四舍五入，第二个参数指定保留几位小数：

```python
z = round(x + y)          # 4.6 → 5
z = round(x / y, 2)       # 2/3 → 0.67
```

f-string 也能直接格式化：

```python
print(f"{z:,}")     # 1000 → 1,000
print(f"{z:.2f}")   # 0.666... → 0.67
```

`:,` 是千位分隔符，`:.2f` 是保留两位小数。这些格式说明符不必背，用的时候查文档即可。

两个精度事实：

- Python 的 `int` 没有上限，可以表示任意大的整数；
- `float` 精度有限（约 15–17 位有效数字），`2/3` 只能显示成 `0.6666666666666666`。

## 定义自己的函数

当同一件事反复出现，就该给它起个名字。用 `def` 定义函数：

```python
def hello(to="world"):
    print("hello,", to)

name = input("What's your name? ")
hello()
hello(name)
```

输出：

```text
hello, world
hello, David
```

拆解：

- `def` 是 define 的缩写；
- `hello` 是函数名；
- `to="world"` 是**带默认值的参数**：调用时不传参就用 `world`；
- 冒号与缩进划定函数体；
- 调用时传入的 `name` 是**实参**，函数内部的 `to` 是**形参**，两者是不同的变量。

被调用时，实参的值被复制给形参，所以函数内部改 `to` 不会影响外面的 `name`。

### 顺序很重要

Python 从上到下执行。函数必须先定义、后调用：

```python
hello()        # NameError: name 'hello' is not defined

def hello():
    print("hello")
```

修复有两种。第一种是把定义挪到调用之前。第二种更常见：定义一个 `main()`，把主逻辑放进去，在文件末尾调用 `main()`：

```python
def main():
    name = input("What's your name? ")
    hello(name)


def hello(to="world"):
    print("hello,", to)


main()
```

这样 `main` 在前面读起来像目录，具体实现放在后面，调用 `main()` 放在最后一行——既符合阅读顺序，也不会触发 `NameError`。

### 作用域

在 `main` 里创建的变量，不能在别的函数里直接使用：

```python
def main():
    name = input("What's your name? ")
    hello()          # 不传参

def hello():
    print("hello,", name)   # NameError: name 'name' is not defined

main()
```

错误的原因是**作用域**：`name` 只存在于 `main` 的局部作用域里，`hello` 看不到它。

正确做法是通过参数传递：

```python
def main():
    name = input("What's your name? ")
    hello(name)      # 把值交出去

def hello(to="world"):
    print("hello,", to)
```

## 返回值：函数的另一种产出

有些函数没有返回值，只有副作用（`print`）；有些函数把结果交还给你（`input`、`int`、`float`）。自己定义函数时，用 `return` 显式返回：

```python
def main():
    x = int(input("What's x? "))
    print("x squared is", square(x))


def square(n):
    return n * n


main()
```

`return` 让函数的结果可以被继续使用——传给 `print`、赋给变量、参与下一次计算。副作用与返回值是函数两种不同的「输出」，写函数时应当想清楚自己要哪一种。

同样地，平方有三种写法：

```python
def square(n):
    return n * n        # 乘法
    # return n ** 2     # 幂运算
    # return pow(n, 2)  # 内置函数
```

## 本章结论

- 写代码 = 文本编辑器 + 终端；Python 文件以 `.py` 结尾，用 `python 文件.py` 运行。
- 函数是动词，参数是输入，副作用是它对外界的影响，返回值是它交还的结果。
- `=` 是赋值，从右到左；变量是内存中的容器，可以被反复覆盖。
- `input` 永远返回字符串；要参与算术，必须用 `int()` 或 `float()` 转换。
- `print` 的 `sep` 与 `end` 是命名参数，都有默认值；`\` 是转义字符。
- f-string 用于嵌入变量与格式化数字（`:,`、`:.2f`）。
- 字符串方法用点号调用，可以链式组合；`strip`、`title`、`split` 最常用。
- `def` 定义函数，参数可以有默认值；函数必须先定义后调用。
- `main()` + 末尾调用是组织程序的惯例；局部变量只在所属函数内可见。
- `return` 返回结果，与 `print` 的副作用是两回事。

## 理解检验

**1. 为什么 `input()` 拿到的 `1` 和 `2` 相加会得到 `12`？写出两种修复方式。**

参考答案：`input()` 的返回值类型是 `str`，对字符串使用 `+` 执行的是拼接，所以 `"1" + "2"` 得到 `"12"`。修复一是转换类型：

```python
x = int(input("What's x? "))
y = int(input("What's y? "))
print(x + y)
```

修复二是在使用处转换并嵌套调用：

```python
print(int(input("What's x? ")) + int(input("What's y? ")))
```

两者结果相同，但第一种更易读、也更容易调试（可以单独检查 `x`、`y` 的类型）。

**2. `print("hello,", name)` 与 `print(f"hello, {name}")` 的输出一样吗？如果名字前有空格会怎样？**

参考答案：两者都会输出 `hello, David`，但机制不同。第一种把 `"hello,"` 和 `name` 作为两个参数，`print` 用默认的 `sep=" "` 在中间插入一个空格；第二种把变量嵌进字符串，空格由字符串本身提供。

如果 `name` 是 `"  David  "`，第一种输出 `hello,   David  `（分隔空格 + 用户自己的空格），第二种输出 `hello,   David  `（原样嵌入）。要在两种情况下都得到干净结果，都应先 `name = name.strip()`。

**3. 下面这段代码为什么会报 `NameError: name 'name' is not defined`？怎么改？**

```python
def main():
    name = input("What's your name? ")
    hello()

def hello():
    print("hello,", name)

main()
```

参考答案：`name` 定义在 `main` 的局部作用域内，`hello` 是另一个函数，看不到 `main` 的局部变量，因此报错。修改方式是通过参数把值传进去：

```python
def main():
    name = input("What's your name? ")
    hello(name)

def hello(to="world"):
    print("hello,", to)

main()
```

这样 `hello` 只依赖自己的参数，不依赖调用者的局部变量，函数也更通用。

**4. 用 `strip()` 和 `title()` 处理输入 `"   dAVid mAlAn  "`，写出代码和输出；再说明为什么 `strip` 去不掉单词中间的空格。**

参考答案：

```python
name = input("What's your name? ").strip().title()
print(f"hello, {name}")
```

输入 `"   dAVid mAlAn  "`，输出 `hello, David Malan`。`strip()` 只删除字符串**首尾**的空白，不碰中间；要去掉中间多余的空格，需要先用 `split()` 按空白切分，再用 `" ".join(...)` 重新拼接：

```python
name = " ".join(input("What's your name? ").split())
```

**5. `return n * n` 和 `print(n * n)` 有什么区别？在 `print("x squared is", square(x))` 里，为什么必须用 `return`？**

参考答案：`print(n * n)` 只产生副作用——把结果打到屏幕上，函数本身的返回值是 `None`；`return n * n` 把计算结果交还给调用者，函数调用表达式本身就等于这个值。

在 `print("x squared is", square(x))` 中，`square(x)` 的值要作为参数传给外层 `print`。如果 `square` 只打印不返回，`square(x)` 的值就是 `None`，输出会变成 `x squared is None`。所以这里必须 `return`。

**6. 为什么把 `hello` 的定义挪到文件末尾后，程序仍然能运行？如果直接把 `hello(name)` 放在文件开头调用，会怎样？**

参考答案：把定义挪到末尾之所以可行，是因为文件末尾调用的 `main()` 会先执行 `main` 的函数体；此时整个文件已经被解释器读入并完成了所有 `def` 语句，`hello` 已经存在。关键在于**调用发生的时刻**晚于定义。

如果把 `hello(name)` 直接写在文件开头，解释器执行到那一行时还没有见过 `def hello`，于是抛出 `NameError: name 'hello' is not defined`。Python 只保证「执行到某行时，之前定义过的名字可用」，不做事先的整体声明。

## 与前后章的关系

这一章建立了所有后续内容的基础词汇：函数、参数、返回值、变量、类型、作用域。下一章引入**条件语句**，让程序根据布尔值走不同分支；再往后是循环、异常、库，都会直接复用这里的 `input`、`print`、类型转换与函数定义。

本章末尾的 `main()` 结构会在整门课里反复出现，后面加入文件读写、测试、面向对象时，程序骨架仍然是它。
