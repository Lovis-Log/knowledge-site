---
slug: 02-syntax-variables-types
title: "语法、变量与数据类型"
summary: "长视频第二章：从「计算机只按字面执行」出发，讲清 Python 的缩进与 PEP 8、如何读错误信息，以及变量、数字、字符串、布尔与运算符的使用方式。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, syntax, variables, data-types, operators]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 2 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=3127s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

这是长视频的第二章，对应 52:07–1:40:34。前一章把工作台搭好，这一章开始写真正的 Python：程序由哪些基本动作组成、语法的硬规则与风格约定、读错误的方法、变量如何存数据、Python 的几种基本数据类型，以及让数据参与判断的运算符。

作者的定位很明确：这一章出现的每个概念单独看都很小，甚至显得没用；但把存数据、做判断、重复执行、做运算这四件事组合起来，就能搭出聊天机器人、票据分流、文档摘要这类系统。所以本章的目标是熟悉语法和手感，而不是背下来。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 52:07 | 编程是什么：把任务拆成计算机能照做的精确指令 |
| 53:56 | 四类基本操作：存储、判断、重复、计算 |
| 55:39 | Python 语法：缩进、四个空格、冒号 |
| 57:18 | PEP 8 风格指南：命名、行长、空格 |
| 57:59 | 故意写错：`SyntaxError` 与三段式读错法 |
| 1:01:41 | 变量：赋值、命名规则、snake_case |
| 1:06:23 | 注释：`#`、三引号、解释「为什么」 |
| 1:09:58 | 数据类型：int 与 float |
| 1:13:37 | 字符串：引号、拼接、重复、`len` |
| 1:19:44 | 布尔值与比较 |
| 1:24:47 | 运算符：算术优先级、比较、`and`/`or`/`not`、复合赋值 |
| 1:30:29 | f-string：把变量嵌进字符串 |
| 1:33:14 | 字符串方法：`lower`、`upper`、`title`、`replace` 等 |
| 1:36:21 | 控制流初探：`if`、`else`、`elif` |

## 编程是什么：四类基本动作

计算机按字面执行。你跟朋友说「去泡杯咖啡」，对方会自动补全找杯子、放咖啡粉、倒热水这一串步骤；计算机不会，它只执行你写下的每一条指令，顺序也必须指定。

几乎所有程序都由四类动作组合而成：

1. **存储**：把数据放进变量，例如 `name = "Sarah"`、`age = 25`；
2. **判断**：根据条件走不同分支，例如「如果票需要升级就转人工」；
3. **重复**：对一批数据做同样的处理，例如逐页提取文档内容；
4. **计算**：加减乘除与比较。

本章覆盖前三类中的存储与判断所依赖的基础，重复留给下一章。

## 语法：硬规则与风格约定

### 缩进是语法，不是排版

Python 用缩进划分代码块。其他语言（如 JavaScript）用花括号标记「这一段属于一起」，Python 用四个空格。缩进错了，程序直接报错或逻辑错位。

```python
if True:
    print("缩进四个空格")
```

冒号加换行加缩进，是 Python 里所有「块」的固定形状：`if`、`for`、`def`、`class` 都是如此。编辑器会自动补缩进，但要知道是它在替你做这件事。

### PEP 8：可读性约定

PEP 8 是 Python 官方风格指南，不给程序功能，只给可读性：用四个空格而不是制表符、单行不超过 79 字符、变量与函数用小写加下划线（snake_case）、运算符两侧留空格。

违反 PEP 8 不会报错，但别人一眼就能看出是新手代码。后续章节会用 Ruff 自动检查并格式化。

### 三段式读错误

作者故意删掉一个引号，制造 `SyntaxError`，然后给出读错误的固定顺序：

1. **在哪一行**：错误信息会指出行号；
2. **是什么错**：最后一行给出错误类型与说明，例如 `SyntaxError: unterminated string literal`；
3. **具体位置**：箭头指向出错的字符。

```python
print("hello world)
# SyntaxError: unterminated string literal (detected at line 1)
```

看懂之后就知道是引号没闭合。作者的建议是：遇到陌生错误，直接把错误信息和代码贴给 AI 助手，问它「这是什么意思、怎么修」；同时**动手敲代码而不是复制粘贴**，因为错误大多来自括号、引号、空格这些细节，只有自己敲才会遇到并记住。

## 变量

变量给数据起名字，之后用名字引用。

```python
name = "Alice"
age = 25
is_student = True
```

等号不是「相等」，而是**赋值**：把右边的值存进左边的名字。变量之所以叫变量，是因为可以重新赋值。

```python
name = "Alice"
name = "Dave"
print(name)
# Dave
```

命名规则（硬性）：

- 只能包含字母、数字、下划线；
- 不能以数字开头；
- 不能使用 Python 关键字（如 `if`、`class`）；
- 不能含空格或连字符。

```python
# 合法
first_name = "Alice"
user_age = 25

# 非法
# 2age = 30      -> SyntaxError
# user-age = 30  -> 被解析成减法
```

风格约定（软性）：小写加下划线，即 snake_case。`firstName` 在 Python 里不报错，但不合习惯。

## 注释

注释是给人看的说明，Python 会完全忽略。

```python
# 这一行是注释
subtotal = 100
tax = subtotal * 0.08  # 行尾注释也可以
```

多行说明可以用三引号：

```python
"""
这个函数负责计算含税总价。
输入：小计金额。
输出：加上 8% 税后的金额。
"""
```

作者给了一条实用准则：**注释解释「为什么」，而不是「是什么」**。

```python
# 差：看一眼代码就知道
total = subtotal * 1.08  # 把 subtotal 乘以 1.08

# 好：解释数字的来历
total = subtotal * 1.08  # 加州销售税 8%
```

## 数据类型

### 数字：int 与 float

```python
age = 25        # int
price = 19.99   # float
```

Python 在两者之间能自动转换，日常使用不必刻意区分；区别在底层存储方式，与效率有关。

基本运算与计算器一致：

```python
print(5 + 5)    # 10
print(5 - 5)    # 0
print(5 * 3)    # 15
print(10 / 3)   # 3.3333333333333335
print(10 // 3)  # 3  整除
print(10 % 3)   # 1  取余
print(10 ** 2)  # 100 乘方
```

运算优先级与数学一致：先乘除后加减，括号优先。

```python
print(2 + 3 * 4)    # 14
print((2 + 3) * 4)  # 20
```

### 字符串

文本用引号包裹，单双引号皆可，但项目内要统一（作者用双引号）。

```python
first_name = "Dave"
last_name = "Ebbelaar"

full_name = first_name + " " + last_name
print(full_name)
# Dave Ebbelaar
```

`+` 拼接，`*` 重复：

```python
line = "-" * 30
print(line)
# ------------------------------
```

`len()` 返回字符数，包含空格：

```python
print(len(full_name))  # 13
print(len(first_name)) # 4
```

多行文本用三引号，换行会保留：

```python
message = """第一行
第二行"""
print(message)
```

### 布尔值

只有 `True` 和 `False`，首字母必须大写。

```python
is_logged_in = True
has_license = False
```

布尔值最常见的来源是比较：

```python
age = 18
can_vote = age >= 18
print(can_vote)  # True

age = 16
print(age >= 18) # False
```

## 运算符

### 比较运算符

| 运算符 | 含义 |
| --- | --- |
| `==` | 等于（注意是两个等号） |
| `!=` | 不等于 |
| `>` / `<` | 大于 / 小于 |
| `>=` / `<=` | 大于等于 / 小于等于 |

一个常见混淆：`=` 是赋值，`==` 是比较。

```python
age = 18        # 赋值
print(age == 18) # True，比较
```

### 逻辑运算符

`and`、`or`、`not` 把布尔值组合起来。

```python
age = 25
has_license = True

can_drive = age >= 16 and has_license
print(can_drive)  # True

has_license = False
print(age >= 16 and has_license)  # False
print(age >= 16 or has_license)   # True，只要一个成立
```

真值表：

| A | B | A and B | A or B |
| --- | --- | --- | --- |
| True | True | True | True |
| True | False | False | True |
| False | True | False | True |
| False | False | False | False |

`not` 取反：

```python
has_license = True
print(not has_license)  # False
```

组合条件可以读起来像英文：

```python
is_drunk = False
can_drive = age >= 16 and has_license and not is_drunk
print(can_drive)  # False（若 has_license 为 False）
```

注意：布尔变量本身已经是真值，不必写 `has_license == True`，直接写 `has_license` 即可，两种写法都能运行，后者更简洁。

### 复合赋值

```python
score = 10
score += 5   # 等价于 score = score + 5
print(score) # 15
```

`-=`、`*=`、`/=` 同理。

## f-string：把变量嵌进字符串

拼接字符串在需要插入变量时很笨重，f-string 是标准做法：

```python
name = "Dave"
greeting = f"Hi there, my name is {name}."
print(greeting)
# Hi there, my name is Dave.
```

要点：

- 字符串前面加 `f`；
- 花括号里放变量名或表达式；
- 不加 `f`，花括号会被原样打印。

这在 AI 开发中尤其常用：把用户输入、检索结果、系统提示拼进同一个提示词模板。

```python
user_input = "总结这份文档"
prompt = f"你是一个助手。用户请求：{user_input}"
```

## 字符串方法

方法是「挂在对象上的函数」，用点号调用：

```python
name = "Dave"
print(name.lower())   # dave
print(name.upper())   # DAVE

sentence = "hi my name is dave"
print(sentence.title())  # Hi My Name Is Dave
```

常用方法：

```python
message = "I love the Python programming language"

print(message.startswith("I"))        # True
print(message.endswith("language"))   # True
print("Python" in message)            # True
print(message.count("Python"))        # 1
print(message.replace("Python", "JavaScript"))
# I love the JavaScript programming language
```

作者明确说：这些不需要背，遇到问题时查文档或问 AI 即可；当前目标只是知道「Python 自带大量现成能力」，不必每次都手写逻辑。

## 控制流初探

`if` 让程序按条件分支：

```python
temperature = 26

if temperature > 25:
    print("It's hot")
```

结构固定：`if` + 条件 + 冒号 + 换行 + 四空格缩进。

加 `else` 处理其余情况：

```python
temperature = 25

if temperature > 25:
    print("It's hot")
else:
    print("It's nice weather")
# It's nice weather
```

多个条件用 `elif` 串联，**从上到下判断，命中一个就结束**：

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "需要改进"

print(grade)  # B
```

如果写成两个独立的 `if`，两个条件可能同时成立、同时执行，这通常不是想要的结果。`elif` 保证只走一条分支。

## 本章结论

- 程序由存储、判断、重复、计算四类动作组合而成。
- Python 用缩进划分代码块；PEP 8 是可读性约定，不遵守不报错。
- 读错误按「哪一行 → 什么错 → 具体位置」三步走。
- 变量用 `=` 赋值，命名用小写加下划线；`=` 与 `==` 含义不同。
- 基本类型：`int`、`float`、`str`、`bool`；布尔值来自比较。
- `and`/`or`/`not` 组合条件；`+=` 是复合赋值。
- f-string 是在字符串中插入变量的标准方式。
- `if`/`elif`/`else` 按顺序判断，命中即停。

## 理解检验

**1. 为什么 Python 的缩进错误会导致程序出错，而不像其他语言那样只是排版问题？**

参考答案：Python 没有花括号来标记代码块，它直接用缩进表示层级。解释器在读到冒号后会根据缩进判断哪些行属于这个块，缩进不一致会产生 `IndentationError`，缩进层级错误则会让语句挂到别的块下，程序照常运行但逻辑与预期不同。也就是说，缩进在这里是语法的一部分，而不是可选的排版。

**2. 写一个判断能否驾车的条件：年龄至少 16、持有驾照、且没有喝酒。说明为什么不需要写 `== True`。**

参考答案：

```python
age = 25
has_license = True
is_drunk = False

can_drive = age >= 16 and has_license and not is_drunk
```

`has_license` 本身的值就是 `True` 或 `False`，`and` 直接使用它；`has_license == True` 只是再比较一次，结果相同但更啰嗦。`not is_drunk` 则把「没喝酒」表达为对布尔值的取反。

**3. 下面两段代码在 `score = 85` 时结果相同吗？如果 `score = 95` 呢？**

```python
# A
if score >= 80:
    print("B")
if score >= 90:
    print("A")
```

```python
# B
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
```

参考答案：`score = 85` 时两段都只打印 B。`score = 95` 时 A 会同时打印 B 和 A，因为两个 `if` 彼此独立，都成立就都执行；B 只打印 A，因为 `elif` 在前一个条件成立后就被跳过。要表达「互斥的等级」，必须用 `elif`。

**4. `print(len("Dave"))` 输出什么？`len(" Dave ")` 呢？这说明 `len` 计的是什么？**

参考答案：分别输出 `4` 和 `6`。`len` 计算的是字符串中的字符数量，包括空格，不做任何裁剪。若要忽略首尾空格，需要先调用 `strip()`：`len(" Dave ".strip())` 得到 4。

**5. 已知 `name = "Alice"`，下面两行分别输出什么？为什么？**

```python
print(f"Hello, {name}")
print("Hello, {name}")
```

参考答案：第一行输出 `Hello, Alice`，第二行原样输出 `Hello, {name}`。f-string 前面的 `f` 告诉 Python 解析花括号中的表达式并替换成变量的值；没有 `f` 时，花括号只是普通字符。

## 与前后章的关系

本章建立了语言的最小词汇表：值、变量、类型、运算符与分支。下一章把「重复」补上（`for` 循环），并引入能一次存放多个值的数据结构（列表、字典、元组、集合），这些结构正是后续处理 API 返回的 JSON 与表格数据的基础。
