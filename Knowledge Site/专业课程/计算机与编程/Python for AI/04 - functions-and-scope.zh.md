---
slug: 04-functions-and-scope
title: "函数、参数与作用域"
summary: "长视频第四章：用 def 定义可复用逻辑，讲清位置参数与关键字参数、默认值、局部与全局变量，以及 return 与 print 的本质区别。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, functions, parameters, scope, return]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 4 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=7570s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

这是长视频的第四章，对应 2:06:10–2:49:11。前三章把零件备齐了，这一章开始组装：把一段逻辑命名、封装、重复调用。内容包括函数的定义与调用、参数（位置、关键字、默认值）、局部变量与全局变量的区别、返回值，最后引出模块与 `import`——Python 生态真正的入口。

作者反复强调一个区分，它决定了后面所有代码的写法：**`print` 只是把值显示出来，`return` 才把值交还给调用者**。分不清这两件事，函数就没法组合。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 2:06:10 | 为什么需要函数：避免重复，封装复杂逻辑 |
| 2:07:40 | 定义函数的语法：`def`、名字、括号、冒号、缩进 |
| 2:09:11 | 调用函数；只定义不调用不会执行 |
| 2:10:29 | 命名规范：snake_case，动词开头 |
| 2:14:52 | 参数：让函数接受输入 |
| 2:17:34 | 位置参数与顺序；2:19:23 关键字参数 |
| 2:19:48 | 默认参数：无默认值的参数必须在前 |
| 2:23:01 | 局部变量与全局变量 |
| 2:29:07 | `return`：把结果交出去 |
| 2:33:17 | 用返回值组合表达式 |
| 2:35:57 | 返回多个值 |
| 2:38:25 | 外部工具：模块、包与 import 的开始 |

## 从「写一遍」到「定义一次」

如果只是打印一行，循环足够。但真实逻辑往往包含多个步骤：读取数据、计算、格式化、输出。每次都重写一遍既冗长，也容易改漏。

函数把这段逻辑包起来并命名，之后按名字调用：

```python
def greet():
    print("Hello")

greet()
# Hello
```

只定义不调用，什么也不会发生——定义只是把逻辑存进内存。必须显式调用 `greet()` 才执行。

### 语法拆解

```python
def greet():
    print("Hello")
```

- `def`：定义函数的关键字；
- `greet`：函数名，遵循 snake_case，通常用动词开头；
- `()`：参数列表，暂时为空；
- `:`：块开始；
- 缩进四空格：函数体。

命名建议：`calculate_total`、`send_email`，而不是 `thing` 或 `my_func`。函数名要让调用处读起来像一句话。

## 参数：让函数接受输入

上一节的 `greet` 是硬编码的，永远输出同一句话。参数让函数接受输入：

```python
def greet(name):
    print(f"Hello, {name}")

greet("Dave")
# Hello, Dave

greet("Alice")
# Hello, Alice
```

`name` 在函数内部就是一个变量，值由调用时传入。

### 位置参数

多个参数按顺序匹配：

```python
def greet(first_name, last_name):
    print(f"Hello, {first_name} {last_name}")

greet("Dave", "Ebbelaar")
# Hello, Dave Ebbelaar
```

少传或多传都会报错：

```python
greet("Dave")
# TypeError: greet() missing 1 required positional argument: 'last_name'
```

顺序反了不会报错，但结果会错：

```python
greet("Ebbelaar", "Dave")
# Hello, Ebbelaar Dave
```

### 关键字参数

在调用时写出参数名，顺序就不再重要：

```python
greet(last_name="Ebbelaar", first_name="Dave")
# Hello, Dave Ebbelaar
```

作者的建议是：参数超过一个时，尽量显式写出名字。多敲几个字符，换来调用处一眼可读，也避免顺序错误。

### 默认参数

```python
def greet(first_name="John", last_name="Doe"):
    print(f"Hello, {first_name} {last_name}")

greet()
# Hello, John Doe

greet(first_name="Dave")
# Hello, Dave Doe
```

规则：**有默认值的参数必须放在没有默认值的参数之后**。否则 Python 无法判断省略的是哪一个：

```python
def greet(first_name="John", last_name):
    ...
# SyntaxError: non-default argument follows default argument
```

### 多个参数的实际例子

```python
def calculate_total(price, tax_rate, discount):
    tax = price * tax_rate
    final_price = price + tax - discount
    print(f"Final price: {final_price:.2f}")

calculate_total(price=100, tax_rate=0.08, discount=10)
# Final price: 98.00
```

这里用关键字参数调用，顺序写错也不会算错；函数体内先算税、再得总价，步骤清晰。

## 局部变量与全局变量

Python 按「从上到下」执行，但函数内部有独立的作用域。

```python
discount = 20          # 全局变量

def calculate_total(price):
    discount = 10      # 局部变量，遮蔽同名的全局变量
    return price - discount

print(calculate_total(100))  # 90
print(discount)              # 20
```

要点：

- 函数内部赋值的变量是**局部**的，函数外访问不到；
- 同名时，函数内部优先使用局部变量；
- 函数外部的变量（全局）在函数内可以读取。

```python
def show_discount():
    print(discount)

discount = 20
show_discount()
# 20
```

反过来则不行：

```python
def calculate_total(price):
    local_discount = 10
    return price - local_discount

print(local_discount)
# NameError: name 'local_discount' is not defined
```

作者的建议：**不要把依赖藏在全局变量里**。函数需要的输入，就写成参数。否则别人改动全局变量、或把函数挪到别的文件，函数就悄悄坏掉，而且报错位置离原因很远。

```python
# 不推荐：依赖外部 discount
def calculate_total(price):
    return price - discount

# 推荐：把依赖变成参数
def calculate_total(price, discount):
    return price - discount
```

## return：把结果交出去

这是本章最重要的一节。

```python
def add_print(a, b):
    print(a + b)

add_print(5, 10)
# 15
```

屏幕上出现了 15，但**这个 15 已经消失了**：没有任何变量持有它，无法再加 50，也无法存进文件。

`return` 则把值交给调用者：

```python
def add(a, b):
    return a + b

result = add(5, 10)
print(result)        # 15
print(result + 50)   # 65
```

区别可以概括为：

| | `print` | `return` |
| --- | --- | --- |
| 作用 | 显示给人看 | 把值交给程序 |
| 之后能否使用 | 不能 | 能，可存变量、参与运算 |
| 典型场景 | 调试、最终输出 | 绝大多数真实逻辑 |

一个常见的坑：函数里写了 `print` 却用变量接收，得到的是 `None`。

```python
result = add_print(5, 10)  # 屏幕打印 15
print(result)              # None
```

### 用返回值组合

返回值可以参与表达式，这让函数像积木一样拼起来：

```python
def double(n):
    return n * 2

print(double(5) + double(3))  # 16
print(double(5) > 8)          # True
```

### 返回多个值

用逗号分隔即可，调用方也按顺序接收：

```python
def first_and_last(numbers):
    first = numbers[0]
    last = numbers[-1]
    return first, last

f, l = first_and_last([1, 2, 3, 4, 5])
print(f)  # 1
print(l)  # 5
```

底层其实是返回了一个元组，所以也可以整体接收：

```python
pair = first_and_last([1, 2, 3, 4, 5])
print(pair)   # (1, 5)
print(pair[0])  # 1
```

## 从函数到模块

函数解决「同一文件内复用」，模块解决「跨文件复用」。这一节只是过渡，细节在下一章。

术语约定：

- **模块（module）**：一个 `.py` 文件；
- **包（package）**：包含多个模块的文件夹；
- **函数**：模块里的具体工具；
- **类**：构造对象的蓝图（第五章之后讲）。

可以这样记：模块是工具箱，包是放多个工具箱的车库，函数是箱里的锤子，类是造工具的图纸。

```python
import math

print(math.sqrt(16))  # 4.0
```

整份模块导入，用 `模块名.函数名` 调用。也可以只取需要的部分：

```python
from math import sqrt, pi

print(sqrt(16))  # 4.0
print(pi)        # 3.141592653589793
```

区别在于命名空间：`from ... import ...` 之后，名字直接可用，但也更容易与自己的变量重名。

## 本章结论

- `def 名字(参数):` 定义函数；只定义不调用不会执行。
- 函数名用 snake_case，动词开头，调用处要读得通。
- 参数让函数动态化；多参数时优先用关键字参数。
- 有默认值的参数必须放在最后。
- 函数内部赋值的变量是局部的；不要让函数依赖全局变量，把依赖写成参数。
- `return` 把值交给调用者，`print` 只是显示；绝大多数真实逻辑要用 `return`。
- 函数可以返回多个值，本质是返回元组。
- 模块是 `.py` 文件，包是模块的文件夹；`import` 让代码跨文件复用。

## 理解检验

**1. 为什么只写 `def greet(): ...` 而不调用，运行脚本什么也不会发生？**

参考答案：`def` 语句的作用是把函数体编译成一个函数对象并绑定到名字上，它不会执行函数体。函数体只在显式调用 `greet()` 时运行。所以脚本从上到下执行完定义后正常结束，没有任何输出。

**2. 下面两种写法的函数，`result = add(5, 10)` 之后 `result` 分别是什么？为什么？**

```python
def add_print(a, b):
    print(a + b)

def add(a, b):
    return a + b
```

参考答案：`add_print` 没有 `return`，Python 默认返回 `None`，所以 `result` 是 `None`，屏幕上只会出现 15。`add` 用 `return` 把 15 交给调用者，`result` 就是 15，可以继续参与运算。`print` 与 `return` 的区别在于「显示」和「交出」。

**3. 把 `def greet(first_name="John", last_name):` 这样定义会报什么错？规则是什么？**

参考答案：报 `SyntaxError: non-default argument follows default argument`。Python 要求有默认值的参数放在所有无默认值参数之后。原因是调用时省略参数只能从右往左匹配，如果默认参数在前、必填参数在后，解释器无法判断某个位置省略的是哪一个。正确写法是 `def greet(first_name, last_name="Doe")`。

**4. 下面代码输出什么？如果想让函数使用外部的 `discount`，应该怎么改？**

```python
discount = 20

def calculate_total(price):
    discount = 10
    return price - discount

print(calculate_total(100))
print(discount)
```

参考答案：输出 `90` 和 `20`。函数内的 `discount = 10` 创建的是局部变量，遮蔽了同名的全局变量；函数返回 `100 - 10 = 90`，而函数外的全局 `discount` 没有被修改，仍是 20。若希望函数使用外部的值，正确做法不是依赖全局变量，而是把它变成参数：`def calculate_total(price, discount): return price - discount`，调用时传入 `discount=20`。

**5. 为什么说「函数返回多个值」本质上还是返回一个值？**

参考答案：`return first, last` 会先把两个值组成一个元组 `(first, last)` 再返回，所以函数真正的返回值是一个元组。调用处的 `f, l = ...` 只是在把这个元组解包到两个名字上；写成 `pair = first_and_last(...)`，`pair` 就是那个二元组。

## 与前后章的关系

函数把前四章的所有零件组装成了可复用的单元，也让代码第一次具备「模块化」的形状。下一章从「同一文件内复用」跨到「跨文件复用」：模块与包的导入方式、`pip` 安装第三方库、`requirements.txt` 锁定依赖，以及用 `requests` 调用第一个 API。之后所有章节都以函数为单位组织代码。
