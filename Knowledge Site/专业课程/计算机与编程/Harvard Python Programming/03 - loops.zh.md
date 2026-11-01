---
slug: "03-loops"
title: "循环：让重复变成结构"
summary: "CS50P 第 2 周：用 while 与 for 把重复劳动变成循环，理解计数、无限循环与输入校验，再借列表、字典与嵌套循环写出行列与方块，最后用函数把问题层层抽象。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "loops"
  - "lists"
  - "dictionaries"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 3 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=9998s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## 这一章在讲什么

这是长视频的第 3 章，对应 CS50P 第 2 周（02:46:38–04:07:34），主题是**循环**。

起点是一个很小的毛病：让猫叫三声，最直接的办法是写三行 `print("meow")`。能跑，但一旦要叫五十声、五百声，或者把「meow」换成「woof」，代码就崩了。循环正是为了解决「同一件事重复做」这一整类问题。

本章按这条线展开：先用 `while` 手工管理计数器，踩一次无限循环的坑；再用 `for` 与 `range` 把计数交给 Python；然后用 `while True` 加 `break` 做输入校验；接着引入列表与字典，让循环能遍历数据而不只是数字；最后用马里奥的砖块例子，把循环、函数与抽象组合起来。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 2:46:38 | 本周主题：为什么要循环 |
| 2:47:00 | `cat.py`：三行 `print` 的问题 |
| 2:49:56 | `while` 循环与计数器 |
| 2:52:06 | 无限循环：为什么危险，怎么用 Ctrl-C 停下 |
| 2:54:11 | 递减计数，程序终于会停 |
| 2:56:26 | 改成递增、从 1 数到 3 |
| 2:58:15 | 从 0 开始计数的惯例与 `i += 1` |
| 3:02:43 | `for` 循环与列表 `[0, 1, 2]` |
| 3:07:16 | `range(3)`：不为极端情况手工列值 |
| 3:09:04 | 用 `_` 表示「不关心的循环变量」 |
| 3:09:35 | 字符串乘法 `"meow\n" * 3` |
| 3:13:11 | 让用户决定叫几声 |
| 3:14:44 | `while True` + `continue` / `break` 做输入校验 |
| 3:18:05 | 把 `meow` 与 `get_number` 封装成函数 |
| 3:21:06 | 列表：`students = ["Hermione", "Harry", "Ron"]` |
| 3:23:04 | 索引从 0 开始；`students[0]` |
| 3:24:03 | `for student in students` 遍历列表 |
| 3:27:26 | `len()` 与 `range(len(students))` |
| 3:32:00 | 字典：键值对与花括号 |
| 3:38:15 | 遍历字典得到的是键 |
| 3:43:18 | 列表套字典：每个学生多个属性 |
| 3:46:00 | `None`：值的缺席 |
| 3:51:28 | 马里奥：打印一列、一行、一个方块 |
| 4:01:55 | 嵌套循环与 `print()` 换行 |
| 4:05:03 | 用字符串乘法简化内层循环 |

## 问题：重复的代码

```python
print("meow")
print("meow")
print("meow")
```

三段一模一样的代码。问题不在「三行」，而在它的延伸：

- 要叫三百声怎么办？复制粘贴三百行？
- 想把猫换成狗，得改三百处；
- 想根据用户输入决定次数，根本做不到。

循环把「重复」从**写多少行**变成**一个参数**。

## while：手工管理计数器

`while` 后面跟一个布尔表达式，只要它为真，就反复执行缩进块。

```python
i = 3
while i != 0:
    print("meow")
    i = i - 1
```

输出三行 `meow`。执行顺序是：

1. `i = 3`；
2. 判断 `i != 0`，为真；
3. 打印，`i` 变成 2；
4. 回到第 2 步，直到 `i` 变成 0，判断为假，退出。

### 无限循环

如果忘了第 3 步的更新：

```python
i = 3
while i != 0:
    print("meow")
```

`i` 永远是 3，条件永远为真，程序会一直打印下去。这类事故叫**无限循环**。在终端里遇到它，按 `Ctrl-C` 即可中断，不需要重启电脑。

> **补充：** 这是 `while` 最典型的错误。写 `while` 时要立刻问自己：**循环体里有没有改变条件的那一步？**

### 递增、递减与 `+=`

从 1 数到 3：

```python
i = 1
while i <= 3:
    print("meow")
    i = i + 1
```

大多数程序员习惯从 0 开始数，因为列表索引从 0 开始：

```python
i = 0
while i < 3:
    print("meow")
    i += 1
```

注意这里是 `< 3` 而不是 `<= 3`：从 0 开始、到 3 之前停止，正好三次。

`i += 1` 是 `i = i + 1` 的简写。Python 没有 `i++`——那是 C、C++、Java 的写法。

## for：把计数交给 Python

```python
for i in [0, 1, 2]:
    print("meow")
```

`for` 会依次把列表里的每个值赋给 `i`，每赋一次执行一遍循环体。计数器不用你初始化、不用你更新，`i` 自动变成 0、1、2。

但手工写出 `[0, 1, 2]` 又回到了老问题：要叫一百万声呢？

### range

```python
for i in range(3):
    print("meow")
```

`range(n)` 返回从 0 开始、到 n 之前（不含 n）的整数序列。`range(3)` 就是 `0, 1, 2`。

要叫一百万声，只需 `range(1_000_000)`。

### 不用的变量叫 `_`

循环变量如果根本不用，Python 的惯例是命名成单个下划线：

```python
for _ in range(3):
    print("meow")
```

这告诉读代码的人：这里需要一个计数器，但我不关心它的值。不要明明在用却叫它 `_`——那只会让人困惑。

### 字符串乘法

Python 允许用 `*` 重复字符串：

```python
print("meow\n" * 3, end="")
```

输出三行 `meow`。`"meow\n"` 是一个带换行的单元，乘以 3 得到三个单元；`end=""` 阻止 `print` 在末尾再加一个换行，避免多出空行。

这行代码很短，但可读性不如循环。课程的态度是：**能用，但别为了炫技牺牲可读性。**

## 输入校验：while True + break

让用户决定叫几声，而且要保证输入是正数。直接 `if` 判断一次不够——用户可能连续输错。用循环：

```python
while True:
    n = int(input("What's n? "))
    if n > 0:
        break
```

`while True` 是**故意**制造无限循环，靠 `break` 跳出。执行流程：

1. 条件恒真，进入循环；
2. 读取输入；
3. 若 `n > 0`，`break` 跳出；
4. 否则什么都不做，回到第 1 步再问一次。

如果只想跳过本次、继续下一轮，用 `continue`：

```python
while True:
    n = int(input("What's n? "))
    if n < 0:
        continue
    break
```

### 封装成函数

```python
def main():
    number = get_number()
    meow(number)


def get_number():
    while True:
        n = int(input("What's n? "))
        if n > 0:
            return n


def meow(n):
    for _ in range(n):
        print("meow")


main()
```

两个细节：

- `get_number` 用 `return n` 直接结束函数并交回值，比 `break` 之后再 `return` 更简洁；
- `meow` 只负责打印，`get_number` 只负责取值，职责分开。

## 列表：把多个值放进一个变量

```python
students = ["Hermione", "Harry", "Ron"]
```

方括号表示列表。访问元素用方括号加索引，**索引从 0 开始**：

```python
print(students[0])   # Hermione
print(students[1])   # Harry
print(students[2])   # Ron
```

### 遍历

```python
for student in students:
    print(student)
```

不需要知道列表有多长，也不需要索引。变量名用 `student` 而不是 `s` 或 `_`，因为它确实代表一个学生。

### 需要索引时

```python
for i in range(len(students)):
    print(i + 1, students[i])
```

`len(students)` 返回列表长度，`range(len(...))` 生成索引序列。`i + 1` 只是为了显示时从 1 开始。

## 字典：键值对

列表用数字索引，字典用**你选的键**索引：

```python
students = {
    "Hermione": "Gryffindor",
    "Harry": "Gryffindor",
    "Ron": "Gryffindor",
    "Draco": "Slytherin",
}

print(students["Hermione"])   # Gryffindor
```

花括号表示字典，`键: 值` 成对出现。查找时把键放进方括号。

遍历字典：

```python
for student in students:
    print(student, students[student], sep=", ")
```

`for` 遍历字典时，拿到的是**键**（不是值）。输出：

```text
Hermione, Gryffindor
Harry, Gryffindor
Ron, Gryffindor
Draco, Slytherin
```

### 列表套字典

一个学生有多个属性时：

```python
students = [
    {"name": "Hermione", "house": "Gryffindor", "patronus": "Otter"},
    {"name": "Harry", "house": "Gryffindor", "patronus": "Stag"},
    {"name": "Ron", "house": "Gryffindor", "patronus": "Jack Russell terrier"},
    {"name": "Draco", "house": "Slytherin", "patronus": None},
]

for student in students:
    print(student["name"], student["house"], student["patronus"], sep=", ")
```

`None` 是 Python 表示「没有值」的关键字，首字母大写。Draco 没有守护神，用 `None` 比用空字符串 `""` 更明确——空字符串可能意味着「忘了填」，`None` 表示「确实没有」。

## 马里奥：用循环与抽象搭方块

### 一列砖

```python
def main():
    print_column(3)


def print_column(height):
    for _ in range(height):
        print("#")


main()
```

想要更高的柱子，改一个参数即可。

### 一行砖

```python
def print_row(width):
    print("?" * width)
```

字符串乘法让「打印一行」变成一行代码。

### 一个方块

```python
def print_square(size):
    for i in range(size):
        for j in range(size):
            print("#", end="")
        print()
```

输出：

```text
###
###
###
```

要点：

- 外层循环负责**行**，内层循环负责**一行里的砖**；
- 内层用 `end=""`，让砖块不要换行，排在同一行；
- 内层结束后调用一次 `print()`，它只输出一个换行，把光标移到下一行；
- 外层变量叫 `i`，内层叫 `j`，这是惯例；再深一层的嵌套通常意味着该拆函数了。

### 用字符串乘法简化

```python
def print_square(size):
    for _ in range(size):
        print("#" * size)
```

外层循环仍然需要，因为要打印多行；内层循环可以用字符串乘法替代。

### 抽象的价值

`print_square` 不需要知道「一行」是怎么打印的，它只需要一个 `print_row`：

```python
def print_square(size):
    for _ in range(size):
        print_row(size)


def print_row(width):
    print("#" * width)
```

这样 `print_row` 的实现可以随便换——用循环、用乘法、甚至以后换成打印图形——只要名字和参数不变，调用方完全不用改。这就是**抽象**：把「怎么做」藏起来，只暴露「做什么」。

## 本章结论

- 重复代码应当改成循环；循环把重复次数变成参数。
- `while` 需要手动初始化、判断、更新计数器；忘记更新就会无限循环，`Ctrl-C` 可中断。
- `i += 1` 是自增简写，Python 没有 `i++`。
- `for ... in range(n)` 自动生成 0 到 n-1；循环变量不用时命名为 `_`。
- 字符串可以用 `*` 重复，配合 `\n` 与 `end=""` 控制排版。
- `while True` + `break` 是输入校验的标准结构；`continue` 跳过本轮。
- 列表用 `[]`，索引从 0 开始；`for x in list` 直接遍历元素，`range(len(list))` 遍历索引。
- 字典用 `{}`，按键查找；遍历字典拿到的是键。
- `None` 表示「没有值」，与空字符串含义不同。
- 嵌套循环按「先行后列」输出；`print()` 单独调用只输出换行。
- 函数可以把复杂输出拆成可复用的抽象。

## 理解检验

**1. 下面这段代码会发生什么？如何修正？**

```python
i = 3
while i != 0:
    print("meow")
```

参考答案：会无限打印 `meow`。循环体里没有任何语句改变 `i`，条件 `i != 0` 永远为真。修正是在循环体里递减：

```python
i = 3
while i != 0:
    print("meow")
    i -= 1
```

在终端中可以按 `Ctrl-C` 中断已经失控的循环。

**2. `range(3)` 产生哪些值？`for i in range(3)` 循环几次？如果要循环到 3（含 3），应该怎么写？**

参考答案：`range(3)` 产生 `0, 1, 2`，循环 3 次。它从 0 开始，到参数之前停止，不包含参数本身。要包含 3，写 `range(4)`，产生 `0, 1, 2, 3`。

**3. 为什么输入校验要用 `while True` 加 `break`，而不是写一次 `if`？**

参考答案：一次 `if` 只能检查一次。用户如果连续输错，程序要么接受错误的值，要么直接结束，都无法继续追问。`while True` 让程序反复询问，直到条件满足才 `break`：

```python
while True:
    n = int(input("What's n? "))
    if n > 0:
        break
```

`while True` 是故意制造无限循环，`break` 是唯一的出口，因此出口条件必须写清楚。

**4. 列表索引从 0 开始，写一个循环按「1. Hermione」这样的编号输出学生名单。**

参考答案：

```python
students = ["Hermione", "Harry", "Ron"]

for i in range(len(students)):
    print(f"{i + 1}. {students[i]}")
```

输出：

```text
1. Hermione
2. Harry
3. Ron
```

`len(students)` 给出长度 3，`range(3)` 给出 0、1、2，`i + 1` 把内部索引转换成人类习惯的编号。

**5. `for student in students` 遍历一个字典时，`student` 拿到的是什么？怎样同时打印键和值？**

参考答案：拿到的是**键**。要打印键和值，用键去索引字典：

```python
students = {"Hermione": "Gryffindor", "Draco": "Slytherin"}

for student in students:
    print(student, students[student], sep=", ")
```

输出：

```text
Hermione, Gryffindor
Draco, Slytherin
```

**6. 解释下面这段代码的每一层在做什么；如果去掉内层的 `end=""` 会发生什么？**

```python
def print_square(size):
    for i in range(size):
        for j in range(size):
            print("#", end="")
        print()
```

参考答案：外层循环 `i` 控制行数，循环 `size` 次；内层循环 `j` 控制每一行里的砖块数，也循环 `size` 次；`print("#", end="")` 打印一个 `#` 且不换行；内层结束后，单独的 `print()` 输出一个换行，把光标移到下一行。

如果去掉 `end=""`，每个 `#` 都会换行，输出会变成一列竖排的 `#`，而不是一个 `size × size` 的方块。

**7. 为什么 `print_square` 调用 `print_row` 比直接写字符串乘法更好？**

参考答案：因为 `print_square` 只关心「打印 size 行」，不关心「一行怎么打印」。把后者交给 `print_row`，两层职责分开：以后要改一行的样式（比如用 `?` 代替 `#`），只改 `print_row`，`print_square` 一行都不用动。这就是抽象的好处——调用方依赖的是名字和参数，不是实现细节。

## 与前后章的关系

循环把上一章的「按条件执行一次」扩展成「反复执行」，三者合起来构成完整的控制流。本章引入的列表与字典，是后面处理文件、数据与对象的基础结构；`while True` 的输入校验模式，会在异常处理一章被 `try` / `except` 取代或补充。

马里奥例子里的「先抽象、再实现」思路，会在函数、测试与面向对象章节不断复用。
