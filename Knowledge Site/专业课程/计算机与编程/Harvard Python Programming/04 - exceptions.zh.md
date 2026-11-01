---
slug: "04-exceptions"
title: "异常：为出错的那一天提前写代码"
summary: "CS50P 第 3 周：区分语法错误与运行时错误，用 try / except 捕获 ValueError，理解 else 与 try 的最小区间，再借 while True 与自定义 get_int 把「反复追问直到输入正确」封装成可复用函数。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "exceptions"
  - "error-handling"
  - "input-validation"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 4 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=14854s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## 这一章在讲什么

这是长视频的第 4 章，对应 CS50P 第 3 周（04:07:34–04:52:00），主题是**异常**。

「异常」在日常英语里是「例外、特别」，在编程里恰恰相反：它指**出了错**。上一章末尾已经埋下伏笔——`while True` 要求用户输入正数，可如果用户输入的是 `cat` 呢？`int("cat")` 会直接崩溃，而这个崩溃发生在你写完代码很久之后，由别人触发。

本章先区分两类错误：写错的**语法错误**，和运行时才出现的**运行时错误**。然后引入 `try` / `except`，把「可能失败的代码」与「失败后的处理」分开；接着补上 `else`，讲清楚 `try` 的范围应当尽量小；最后把整套输入校验封装成 `get_int(prompt)`，并讨论 `pass` 与「先试再说」的 Python 风格。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 4:07:34 | 本周主题：什么算异常 |
| 4:08:05 | 语法错误：未闭合的字符串字面量 |
| 4:09:28 | 语法错误必须自己修，无法被捕获 |
| 4:10:36 | `number.py`：`int(input(...))` 的隐患 |
| 4:13:27 | 边界测试：0、负数、以及 `cat` |
| 4:14:09 | `ValueError`：invalid literal for int() |
| 4:16:05 | `try` / `except ValueError` |
| 4:19:00 | 能不能什么都不写、捕获所有错误？（不推荐） |
| 4:20:29 | `try` 的范围应当只包住会出错的那一行 |
| 4:21:38 | 移动 `print` 之后出现的 `NameError` |
| 4:25:52 | `try` / `except` / `else`：成功才继续 |
| 4:29:41 | 用 `while True` 反复追问，而不是直接退出 |
| 4:33:40 | `break` 的位置与 `return` 的关系 |
| 4:36:44 | 两种写法都合理：可读性 vs 最小尝试范围 |
| 4:37:07 | 封装 `get_int()` |
| 4:40:39 | 用 `return` 代替 `break` 再 `return` |
| 4:42:48 | `pass`：捕获但静默忽略 |
| 4:48:47 | 给 `get_int` 加 `prompt` 参数 |
| 4:51:08 | `raise` 预告 |

## 两类错误

### 语法错误

```python
print("hello, world)
```

```text
SyntaxError: unterminated string literal
```

`unterminated` 是「没有终止」，`literal` 是「你直接写出来的字面量」。翻译过来就是：你开了一个字符串，却没把它关上。

语法错误的特点是：**程序根本不会运行**。它不是程序运行中出的问题，而是代码本身不合法。因此它无法被 `try` / `except` 捕获——解释器在解析阶段就已经拒绝了这个文件。

### 运行时错误

```python
x = int(input("What's x? "))
print(f"x is {x}")
```

输入 `50`、`0`、`-1` 都没问题。但输入 `cat`：

```text
ValueError: invalid literal for int() with base 10: 'cat'
```

`ValueError` 的意思是：`int` 收到了一个值，但这个值不合法。程序写得很对，问题出在**用户**——而用户的行为你无法事先知道。

这类错误发生在运行时，因此可以在代码里提前布置处理逻辑。

> **一句话总结：** 语法错误是「你写错了」，运行时错误是「世界没按你预想的方式运行」。

## try / except

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

执行顺序：

1. 尝试执行 `try` 块；
2. 如果没有异常，跳过 `except`，执行 `else`；
3. 如果抛出 `ValueError`，跳过 `try` 块剩余部分，执行 `except` 块，`else` 不执行。

`except ValueError` 里的类型名必须写对，大小写敏感。

### 为什么不要写裸 except

Python 允许只写 `except:`，捕获一切。但课程明确反对：

- 你不知道到底出了什么错，就不知道该怎么处理；
- 它会把真正的 bug 一起吞掉，程序悄悄出错却继续运行。

好的做法是**明确列出可能发生的错误类型**。

### try 的范围要小

```python
try:
    x = int(input("What's x? "))
    print(f"x is {x}")
except ValueError:
    print("x is not an integer")
```

这段能跑，但 `print` 也被放进了 `try`。`print` 几乎不可能抛 `ValueError`，把它包进去只会让「哪一步可能失败」变得模糊。推荐：

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

### 一个隐蔽的坑：NameError

如果把 `print` 移出 `try`，但写成：

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")

print(f"x is {x}")
```

输入 `cat` 时，输出不是友好的提示，而是：

```text
NameError: name 'x' is not defined
```

原因在于**赋值是最后一步**。执行 `x = int(input(...))` 时，Python 先算右边：`input` 拿到 `"cat"`，`int("cat")` 抛出 `ValueError`。异常打断执行，右边的值从未产生，于是左边那一步赋值根本没发生，`x` 从未被创建。

`except` 只是把错误接住了，并不会给 `x` 一个值。之后那行 `print` 访问一个不存在的名字，于是又抛出一个新错误。

`else` 正是为了解决这个问题：**只有 `try` 成功时才执行**。

## 用循环反复追问

上面的程序遇到错误就结束，对用户不友好。更合理的做法是继续问：

```python
while True:
    try:
        x = int(input("What's x? "))
    except ValueError:
        print("x is not an integer")
    else:
        break

print(f"x is {x}")
```

现在输入 `cat` 会提示并重新询问，直到输入合法整数为止。

注意 `break` 放在 `else` 里：`else` 与 `try` 绑定，不是与 `except` 绑定——它只在没有异常时执行。

也可以不用 `else`，把 `break` 直接放在 `try` 块末尾：

```python
while True:
    try:
        x = int(input("What's x? "))
        break
    except ValueError:
        print("x is not an integer")
```

两种写法都正确。课程的态度是：**只要能说清理由，都算好设计**；差别只在「最小尝试范围」与「少一层嵌套」之间取舍。

## 封装成 get_int

一旦发现自己在反复写同一段输入校验，就该把它抽成函数：

```python
def main():
    x = get_int("What's x? ")
    print(f"x is {x}")


def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            pass


main()
```

几个演进步骤值得注意：

1. **先写清楚**：`x = int(input(prompt))`，成功则 `break`，出了循环再 `return x`。
2. **合并**：`break` 之后紧接着就是 `return x`，直接用 `return x` 更简洁——`return` 既能跳出循环，又能交出值。
3. **再压缩**：`x` 只被用一次，可以省掉变量，直接 `return int(input(prompt))`。
4. **加参数**：把提示语交给调用者决定，`get_int` 不假设自己一定在问 x。这让它既能问 `x`，也能问 `y` 或 `age`。

最终 `main` 只剩两行：取数、打印。取数的复杂度被封装在函数内部。

### pass：捕获但什么都不做

`except` 块里写 `pass`，表示「捕获到异常，但不再做任何处理」。程序不会崩溃，也不会打印错误，而是继续循环、重新提示。

```python
while True:
    try:
        return int(input(prompt))
    except ValueError:
        pass
```

效果是用户只会看到提示语一次次重复。这算不算更好，取决于场景：有人觉得安静更友好，有人觉得不说明原因反而困惑。

## 两种风格：EAFP 与 LBYL

Python 社区偏爱 **EAFP**（Easier to Ask Forgiveness than Permission）：先做，出错再处理。

```python
try:
    x = int(input("What's x? "))
except ValueError:
    ...
```

其他语言常见 **LBYL**（Look Before You Leap）：先检查，再行动。

```python
s = input("What's x? ")
if s.isnumeric():
    x = int(s)
else:
    ...
```

两种都合理。课程的说法是：Python 的惯性偏向 EAFP，但先检查也完全可行，关键是知道自己在选哪一种。

## 本章结论

- 语法错误无法被捕获，必须改代码；运行时错误可以在代码里处理。
- `ValueError` 表示「值不合法」，`int("cat")` 就会触发。
- `try` / `except` 把可能失败的代码与失败后的处理分开。
- 不要写裸 `except:`；明确列出错误类型。
- `try` 只包住真正可能出错的行。
- 赋值是最后一步：右边出错，左边就没有值，后续访问会得到 `NameError`。
- `else` 只在 `try` 成功时执行，与 `try` 绑定。
- `while True` + `try` / `except` / `break` 是输入校验的标准结构。
- `return` 既能跳出循环又能返回值，比 `break` 再 `return` 简洁。
- `pass` 表示捕获后静默忽略。
- 把「取一个合法整数」封装成 `get_int(prompt)`，调用方只关心结果。

## 理解检验

**1. 下面这段代码输入 `cat` 时会怎样？为什么？怎么修？**

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")

print(f"x is {x}")
```

参考答案：会抛出 `NameError: name 'x' is not defined`。因为 `x = int(input(...))` 的执行顺序是先计算右边：`int("cat")` 抛出 `ValueError`，异常打断了这一行，右边的值没有产生，赋值从未发生，`x` 也就从未被创建。`except` 只是接住错误，并没有给 `x` 任何值。

修法是用 `else`，让打印只在成功时执行：

```python
try:
    x = int(input("What's x? "))
except ValueError:
    print("x is not an integer")
else:
    print(f"x is {x}")
```

**2. `else` 是与 `try` 绑定还是与 `except` 绑定？它什么时候执行？**

参考答案：与 `try` 绑定。它只在 `try` 块**没有抛出任何异常**时执行。若 `try` 抛出被捕获的异常，执行 `except` 块，`else` 被跳过；若抛出未被捕获的异常，程序直接向上传播，`else` 同样不执行。

**3. 为什么不建议写裸 `except:`？**

参考答案：裸 `except:` 会捕获所有异常，包括你根本没预料到的类型。这样做有两个问题：一是你不知道实际发生了什么，也就无法正确处理；二是它会把真正的 bug 一并吞掉，程序带着错误继续运行，问题被掩盖。正确做法是明确写出预期会出现的异常类型，例如 `except ValueError`。

**4. 把 `print(f"x is {x}")` 放进 `try` 块有什么不好？**

参考答案：`print` 几乎不可能抛 `ValueError`，把它放进 `try` 会扩大「可能失败」的范围，让读者难以判断哪一行才是真正需要保护的。`try` 应当只包住会抛异常的最小代码，通常就是 `int(input(...))` 这一行。这样错误处理的边界清晰，也避免误捕获其他代码抛出的同类异常。

**5. 把 `number.py` 改成 `while True` 版本后，为什么输入 `cat` 不会退出程序？**

参考答案：因为 `except ValueError` 接住了异常，`try` 失败后程序继续执行到循环末尾，`while True` 的条件仍为真，于是回到循环开头再次询问。只有当 `try` 成功、进入 `else` 执行 `break` 时，循环才会结束。异常被捕获后不再传播，所以程序不会崩溃退出。

**6. 把 `get_int` 写成下面这样，有什么可以改进的地方？**

```python
def get_int():
    while True:
        try:
            x = int(input("What's x? "))
        except ValueError:
            print("x is not an integer")
        else:
            break
    return x
```

参考答案：可以合并 `break` 与 `return`——`else` 里直接 `return x`，就不需要跳出循环后再返回：

```python
def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("x is not an integer")
```

`return` 会同时结束循环并交回值。另外提示语被写死在函数里，只能问 `x`；加一个 `prompt` 参数后，函数可以被复用来问任意变量。若不想每次都打印提示，也可以把 `except` 块改成 `pass`。

## 与前后章的关系

异常处理把上一章的输入校验从「只要用户配合」变成「用户不配合也能继续」，是写出健壮程序的基础。下一章讲库，会引入大量可能抛异常的外部函数，本章的 `try` / `except` 正是应对它们的手段。

`get_int(prompt)` 这样的封装还会在文件读写、单元测试里反复出现：把「可能失败的操作 + 重试」包起来，调用方只处理成功的结果。
