---
slug: "02-conditionals"
title: "条件语句：让代码在岔路口做选择"
summary: "CS50P 第 1 周：用比较运算符构造布尔表达式，靠 if / elif / else 控制执行路径，用 and、or 与链式比较简化条件，再用取模与布尔返回值写出 is_even，最后用 match / case 替代冗长的分支。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "conditionals"
  - "boolean"
  - "control-flow"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 2 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=6639s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## 这一章在讲什么

这是长视频的第 2 章，对应 CS50P 第 1 周（01:50:39–02:46:38），主题是**条件语句**。

上一章的函数与变量只能让程序从上到下一条道走到黑。条件语句给了程序「岔路口」：根据问题的真假，决定执行哪一段代码。本章先讲比较运算符与布尔表达式，再依次用 `if`、`elif`、`else` 重构同一个程序，比较三种写法的控制流图；接着用 `and`、`or` 与链式比较精简条件；然后用取模运算与布尔返回值写出 `is_even` 函数；最后介绍 `match` / `case`。

贯穿全章的主线是：**代码正确还不够，还要设计得好——问题问得越少，分支越少，越不容易出错。**

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 1:50:39 | 本周主题：条件语句与代码中的岔路口 |
| 1:51:08 | 比较运算符：`>`、`>=`、`<`、`<=`、`==`、`!=` |
| 1:52:28 | 第一个 `if` 程序 `compare.py` |
| 1:56:35 | 控制流图：菱形表示判断，箭头表示走向 |
| 1:58:58 | 三个独立 `if` 的问题：问题问得太多 |
| 2:00:02 | `elif`：让条件互斥 |
| 2:04:59 | `else`：把最后一个问题也省掉 |
| 2:08:47 | `or`：把两个条件合并成一个 |
| 2:12:11 | 直接问 `!=`，分支还能更少 |
| 2:14:31 | 缩进与冒号是语法要求 |
| 2:15:37 | `grade.py`：成绩分级与 `and` |
| 2:20:01 | 链式比较 `90 <= score <= 100` |
| 2:20:58 | 去掉上界：利用 `elif` 的互斥性 |
| 2:24:22 | `parity.py`：取模判断奇偶 |
| 2:30:16 | 布尔类型与 `is_even` 函数 |
| 2:34:30 | Pythonic 写法：`return n % 2 == 0` |
| 2:38:20 | `match` / `case` 与通配符 `_` |
| 2:44:55 | 用 `\|` 合并多个 case |

## 比较与布尔表达式

Python 用来提问的符号：

| 运算 | 符号 | 例子 | 结果 |
| --- | --- | --- | --- |
| 大于 | `>` | `3 > 2` | `True` |
| 大于等于 | `>=` | `3 >= 3` | `True` |
| 小于 | `<` | `2 < 3` | `True` |
| 小于等于 | `<=` | `2 <= 1` | `False` |
| 等于 | `==` | `2 == 2` | `True` |
| 不等于 | `!=` | `2 != 3` | `True` |

这里最容易混淆的是 `=` 与 `==`：

- `x = 5` 是**赋值**，把右边的值放进左边的变量；
- `x == 5` 是**比较**，问「两边相等吗」，返回 `True` 或 `False`。

疑问句在编程里叫**布尔表达式**（Boolean expression），名字来自数学家 George Boole。它只有两种答案：真或假。正因为只有两种答案，计算机才能据此决定走哪条路。

## 从 if 开始

```python
x = int(input("What's x? "))
y = int(input("What's y? "))

if x < y:
    print("x is less than y")
```

三处语法细节：

1. `if` 后面跟一个布尔表达式；
2. 这一行以**冒号**结尾；
3. 下一行**缩进**（四个空格或一个 Tab）。

缩进不是装饰，而是语法：它告诉 Python「这一行属于上面那个 `if` 的分支」。Python 靠缩进划分代码块，不用花括号。

### 三个并列的 if

```python
if x < y:
    print("x is less than y")

if x > y:
    print("x is greater than y")

if x == y:
    print("x is equal to y")
```

程序能跑对，但设计不好：无论前面的答案是什么，**三个问题都会被问一遍**。输入 `1` 和 `2` 时，第一问为真并打印，后两问仍然被计算。程序越复杂，这种浪费越明显。

控制流图能把这个结构画出来：从 `start` 出发，依次经过三个菱形判断，每个菱形都产生一条 true 分支和一条 false 分支，而所有分支最后都汇入下一个菱形。三条路径，六个出口，问三次。

### 用 elif 让条件互斥

```python
if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
elif x == y:
    print("x is equal to y")
```

`elif` 是 else if 的缩写：**只有前面的条件都为假，才会检查这一条**。第一问为真，后两问直接跳过。

### 用 else 省掉最后一个问题

既然 `x` 只能小于、大于或等于 `y`，前两条都排除后，剩下的必然相等，不需要再问：

```python
if x < y:
    print("x is less than y")
elif x > y:
    print("x is greater than y")
else:
    print("x is equal to y")
```

`else` 没有条件，是兜底分支。三条路径、三个出口，最多问两次。

## 合并条件：or 与 and

如果只关心「是否相等」，前两问其实可以合成一个：

```python
if x < y or x > y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

`or` 在两个条件中任一为真时返回真；`and` 要求两个都为真。于是还可以更直接：

```python
if x != y:
    print("x is not equal to y")
else:
    print("x is equal to y")
```

**只问一个真正关心的问题**，分支从四个缩到两个。这就是全章反复强调的「少问问题」。

## 成绩分级：从冗长到紧凑

目标：90–100 为 A，80–89 为 B，70–79 为 C，60–69 为 D，其余为 F。

第一版，每级都写上下界：

```python
score = int(input("Score: "))

if score >= 90 and score <= 100:
    print("Grade: A")
elif score >= 80 and score <= 89:
    print("Grade: B")
elif score >= 70 and score <= 79:
    print("Grade: C")
elif score >= 60 and score <= 69:
    print("Grade: D")
else:
    print("Grade: F")
```

能跑对，但每个分支都问两个问题。Python 支持**链式比较**，可以把两个条件写成一个：

```python
if 90 <= score <= 100:
    print("Grade: A")
```

更进一步：`elif` 本身已经保证前面的条件为假，所以上界是多余的。如果分数没到 90，它必然小于 90：

```python
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

每个分支只问一个问题，读起来也最接近人的判断方式。

> **陷阱：** 这套写法只在 `elif` 下成立。如果把 `elif` 全改成独立的 `if`，输入 95 会同时满足「≥90」「≥80」「≥70」「≥60」，四行全被打印。**互斥性是推理的前提，不是语法自动给你的。**

## 奇偶判断：布尔类型与自定义函数

`%` 是取模运算符，返回除法余数：

| 表达式 | 余数 |
| --- | --- |
| `1 % 3` | 1 |
| `2 % 3` | 2 |
| `3 % 3` | 0 |
| `4 % 3` | 1 |

偶数就是「除以 2 余数为 0」：

```python
x = int(input("What's x? "))

if x % 2 == 0:
    print("Even")
else:
    print("Odd")
```

### 把判断封装成函数

```python
def main():
    x = int(input("What's x? "))
    if is_even(x):
        print("Even")
    else:
        print("Odd")


def is_even(n):
    if n % 2 == 0:
        return True
    else:
        return False


main()
```

这里出现了**布尔类型** `bool`：它只有 `True` 和 `False` 两个值，首字母必须大写。函数可以返回布尔值，而布尔值正好可以当作 `if` 的条件——函数调用本身就是一个布尔表达式。

### 三种更紧凑的写法

```python
# 1. 条件表达式（三元运算）
def is_even(n):
    return True if n % 2 == 0 else False

# 2. 直接返回布尔表达式
def is_even(n):
    return n % 2 == 0

# 3. 直接写在调用处
if x % 2 == 0:
    ...
```

第 2 种是所谓 **Pythonic** 的写法：`n % 2 == 0` 本身已经是 `True` 或 `False`，再写 `if ... return True else return False` 等于把同一个问题问两遍。第 1 种虽然啰嗦，但对初学者更直观，课程明确说两种都可以接受——**可读性优先于简短**。

## match / case：另一种分支写法

Python 3.10 引入了 `match`，作用类似其他语言的 `switch`：

```python
name = input("What's your name? ")

match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
    case "Draco":
        print("Slytherin")
    case _:
        print("Who?")
```

- `match` 后面是要匹配的值；
- 每个 `case` 是一个候选，`|` 表示「或」；
- `_` 是通配符，匹配所有还没被处理的情况，相当于 `else`；
- 不需要 `break`，也不会有「贯穿」问题。

与 `if` / `elif` 相比，`match` 在「一个值对应多个固定选项」时更紧凑；如果条件是范围或复杂表达式，`if` 更合适。

## 本章结论

- `=` 是赋值，`==` 是比较；`!=` 是不等。
- 布尔表达式只有 `True` 和 `False`，`if` 根据它决定是否执行缩进块。
- 冒号与缩进是语法要求，不是风格建议。
- 独立的多个 `if` 会全部求值；`elif` 保证互斥；`else` 是兜底。
- `and`、`or` 与链式比较能把多个条件合成一个。
- `elif` 互斥后可以省略上界，但改成独立 `if` 就会出错。
- `%` 返回余数；偶数即 `n % 2 == 0`。
- 函数可以返回 `bool`，而布尔表达式可以直接作为返回值。
- `match` / `case` 适合「一个值对多个固定选项」，`_` 是兜底。

## 理解检验

**1. 为什么 `if x = y:` 会报错？应该怎么写？**

参考答案：单个 `=` 是赋值运算符，它要求左边是一个可以被赋值的变量名，并把右边的值存进去；`x = y` 是一个语句，不是布尔表达式，不能放在 `if` 后面。比较两个值是否相等要用 `==`：

```python
if x == y:
    print("x is equal to y")
```

**2. 把成绩分级的 `elif` 全部改成 `if`，输入 95 会发生什么？为什么？**

参考答案：四行会全部打印：

```text
Grade: A
Grade: B
Grade: C
Grade: D
```

因为 95 同时满足 `>= 90`、`>= 80`、`>= 70`、`>= 60`，而独立的 `if` 之间没有互斥关系，每一个都会被单独求值。原来的写法能正确工作，靠的是 `elif`「前面为假才继续」的语义，而不是条件本身互斥。

**3. 用 `and` 写出的 `score >= 90 and score <= 100`，怎样改写成链式比较？两者等价吗？**

参考答案：

```python
90 <= score <= 100
```

两者等价。链式比较先算 `90 <= score`，再算 `score <= 100`，两个都为真时整个表达式为真。它比 `and` 版本更短，也更容易读。注意链式比较不能随意拆开成两个独立表达式来理解顺序，它本质上是 `and` 的语法糖。

**4. 写出 `is_even` 的三种实现，并说明哪一种最 Pythonic，为什么。**

参考答案：

```python
# 1
def is_even(n):
    if n % 2 == 0:
        return True
    else:
        return False

# 2
def is_even(n):
    return True if n % 2 == 0 else False

# 3
def is_even(n):
    return n % 2 == 0
```

第 3 种最 Pythonic。`n % 2 == 0` 本身就是一个布尔表达式，它的值就是 `True` 或 `False`；第 1、2 种都把这个表达式算出来之后，又用条件语句把同一个信息翻译一遍，属于冗余。不过第 1 种对初学者更直观，课程认为只要理由成立，两种都可以接受。

**5. `match` 中的 `_` 起什么作用？它和 `else` 有什么共同点？**

参考答案：`_` 是通配符模式，匹配所有前面 `case` 没有处理的值，因此必须放在最后。它和 `else` 的共同点是都作为兜底分支：前面的选项都不匹配时才执行。区别是 `else` 属于 `if` 语句，`_` 属于 `match` 语句。

**6. 下面这段代码有什么问题？给出修正。**

```python
match name:
    case "Harry":
        print("Gryffindor")
    case "Hermione":
        print("Gryffindor")
    case "Ron":
        print("Gryffindor")
```

参考答案：代码本身能运行，但三个分支输出相同，属于重复。可以用 `|` 合并：

```python
match name:
    case "Harry" | "Hermione" | "Ron":
        print("Gryffindor")
```

这样新增同院角色时只需在同一行追加，比较不容易漏改。

## 与前后章的关系

条件语句把上一章的「顺序执行」升级为「按情况执行」。下一章引入**循环**，把「按情况执行一次」升级为「重复执行若干次」；两者结合，程序才真正具备完整的控制流。之后讲异常时，也会用到这里的判断思路——先检查条件，再决定是否继续。

本章反复出现的「少问问题、早排除」的推理方式，会在循环的边界条件、`try` / `except` 的分支设计里再次出现。
