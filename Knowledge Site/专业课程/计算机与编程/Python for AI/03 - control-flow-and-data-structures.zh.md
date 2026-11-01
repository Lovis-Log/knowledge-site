---
slug: 03-control-flow-and-data-structures
title: "控制流与数据结构"
summary: "长视频第三章：用 if/elif/else 与 for 循环控制程序走向，再用列表、字典、元组、集合把多个值组织起来，并说明零索引与四种容器的取舍。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, control-flow, lists, dictionaries, data-structures]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 3 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=6034s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

这是长视频的第三章，对应 1:40:34–2:06:10。上一章结尾已经出现 `if`，本章把它讲完（`elif` 链与嵌套），补上「重复」这件基本动作（`for` 循环），然后进入数据结构：当你要一次存放多个值时，Python 提供列表、字典、元组、集合四种容器，各有明确用途。

这一章是「Python 基础」板块的收尾。作者说得很直白：这些概念此刻很抽象，不需要背下来，先建立第一次接触的印象，后面在真实项目里会反复用到。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 1:40:34 | `elif` 链：命中即停，用于等级划分 |
| 1:42:04 | 条件与 `and`/`or`/`not` 组合；嵌套 `if` |
| 1:43:37 | 循环的意义：重复执行而不必复制代码 |
| 1:44:09 | `for` 与 `range`：计数器、零索引 |
| 1:46:27 | `range` 的起点、终点与步长 |
| 1:47:50 | 数据结构总览：列表、字典、元组、集合 |
| 1:49:00 | 列表：创建、索引、切片 |
| 1:53:13 | 列表的增删改：`append`、`insert`、`remove` |
| 1:55:39 | 字典：键值对、查找、增删 |
| 1:59:45 | 元组：不可变 |
| 2:01:37 | 集合：去重 |
| 2:04:05 | 基础板块收尾与练习建议 |

## 条件语句：把分支写完整

### elif 链

评分是最典型的例子。`elif` 从上到下依次判断，**一旦某个条件成立，后面的分支全部跳过**：

```python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("需要改进")
# B
```

顺序很关键。如果把 `>= 80` 放在 `>= 90` 前面，95 分也会先命中 `>= 80`，得到 B。判断顺序应该从最严格到最宽松。

### 与逻辑运算符组合

条件本身可以是复合布尔表达式：

```python
age = 12
has_license = True

if age >= 16 and has_license:
    print("可以开车")
else:
    print("不能开车")
# 不能开车
```

### 嵌套

一个 `if` 里可以再放 `if`，处理分层的判断：

```python
has_ticket = True
age = 15

if has_ticket:
    if age >= 18:
        print("尽情观影")
    else:
        print("需要监护人陪同")
else:
    print("请先购票")
# 需要监护人陪同
```

嵌套层数不宜过深，通常两层以上就该考虑拆成函数或提前返回。

## 循环：让重复只写一次

需要把同一段逻辑执行五次时，复制五遍既冗长又难改。`for` 循环让代码只写一次：

```python
for i in range(5):
    print(i)
# 0
# 1
# 2
# 3
# 4
```

拆开看：

- `for` 开始一个循环；
- `i` 是循环变量，名字随意，常用 `i`；
- `in range(5)` 表示依次取 0、1、2、3、4；
- 冒号与缩进标记循环体。

**Python 从 0 开始计数（zero-indexed）**，所以 `range(5)` 给的是 0 到 4，共五个值，而不是 1 到 5。

### range 的三种写法

```python
range(5)        # 0,1,2,3,4
range(1, 6)     # 1,2,3,4,5   含起点，不含终点
range(0, 10, 2) # 0,2,4,6,8   步长为 2
```

「含头不含尾」是最容易出错的地方：想要 1 到 6，需要写 `range(1, 7)`。作者说他至今仍会在交互窗口里试两次来确认。

### 循环变量可用于循环体

```python
for i in range(3):
    print(f"第 {i + 1} 次")
# 第 1 次
# 第 2 次
# 第 3 次
```

不需要计数器时，可以省略变量：

```python
for _ in range(3):
    print("hello world")
```

## 数据结构：一个变量装多个值

到目前为止每个变量只存一个值。真实数据往往是一组：一页文档的段落、一条订单的多个字段、一批去重后的用户 ID。四种容器对应四种需求：

| 结构 | 语法 | 特点 | 典型用途 |
| --- | --- | --- | --- |
| 列表 list | `[...]` | 有序、可修改、可重复 | 一组同类数据 |
| 字典 dict | `{key: value}` | 键值对、按键查找 | 一条记录的字段 |
| 元组 tuple | `(...)` | 有序、不可修改 | 坐标、RGB、固定配置 |
| 集合 set | `{...}` 或 `set()` | 无序、元素唯一 | 去重、成员判断 |

### 列表

```python
my_list = ["Alice", 25, True]
```

列表可以混装不同类型，Python 不做限制。**索引从 0 开始**：

```python
my_list = ["Alice", 25, True]

print(my_list[0])   # Alice
print(my_list[1])   # 25
print(my_list[-1])  # True  最后一个
print(my_list[-2])  # 25    倒数第二个
```

切片取一段（同样含头不含尾）：

```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:3])   # [20, 30]
print(numbers[:2])    # [10, 20]
print(numbers[2:])    # [30, 40, 50]
```

修改与增删：

```python
my_list = ["Alice", 25, True]

my_list[0] = "Dave"
print(my_list)          # ['Dave', 25, True]

my_list.append("New York")   # 追加到末尾
my_list.insert(1, "engineer")  # 插入到索引 1
my_list.remove("Dave")       # 删除第一个匹配值
print(my_list)          # [25, 'engineer', 'New York']
```

常用方法还有 `len()`、`sort()`、`reverse()`、`count()`。作者提醒：这些方法不必背，知道「列表能做什么」即可，需要时查文档。

### 字典

列表里 `Alice` 和 `25` 只是位置相邻，没有语义关系。字典用键值对表达关系：

```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

print(person["name"])  # Alice
print(person["age"])   # 25
```

语法要点：**创建用花括号，读取用方括号加键**。键通常是字符串，也可以是数字等不可变类型。

修改、新增、删除：

```python
person["name"] = "Dave"      # 修改
person["license"] = True     # 新增（键不存在即新增）
del person["license"]         # 删除
print(person)
# {'name': 'Dave', 'age': 25, 'city': 'New York'}
```

取不存在的键会抛 `KeyError`。更安全的读取方式：

```python
print(person.get("email"))        # None
print(person.get("email", "无"))  # 无
```

查看结构的方法：

```python
print(person.keys())    # dict_keys(['name', 'age', 'city'])
print(person.values())  # dict_values(['Dave', 25, 'New York'])
print(person.items())   # dict_items([('name', 'Dave'), ...])
```

选择列表还是字典的经验：需要按位置顺序遍历用列表；需要按名字查字段用字典。API 返回的 JSON 解析后就是嵌套字典，所以字典在后续章节出现频率最高。

### 元组

元组一旦创建就不能修改：

```python
point = (3, 5)
color = (255, 0, 0)

print(point[0])  # 3
print(color[-1]) # 0
```

```python
point[0] = 10
# TypeError: 'tuple' object does not support item assignment
```

为什么要有不可变的容器？当某个值在语义上不该被改动时（坐标、颜色、一次性配置），元组把这条约定写进类型，程序的其他部分就不能意外修改它。需要改动时，创建一个新元组。

### 集合

集合自动去除重复，判断成员也更快：

```python
scores = [90, 85, 90, 85, 70]
unique_scores = set(scores)
print(unique_scores)  # {90, 85, 70}

fruits = {"apple", "banana", "orange", "banana"}
print(fruits)  # {'apple', 'banana', 'orange'}
```

注意空集合必须写 `set()`，`{}` 会被解释成空字典。

集合无序，因此不能索引；它的用途是去重与成员判断：

```python
print("apple" in fruits)  # True
```

## 本章结论

- `elif` 链从上到下判断，命中即停；顺序应从严格到宽松。
- `for i in range(n)` 重复执行；`range` 含头不含尾，可指定起点与步长。
- Python 索引从 0 开始，负索引从末尾数。
- 列表：有序可改，方括号，用于一组数据。
- 字典：键值对，花括号创建、方括号按键读取，用于带字段的记录。
- 元组：不可变，用于不该改动的值。
- 集合：自动去重，用于去重与成员判断。

## 理解检验

**1. `range(1, 6)` 会输出哪些数？要输出 1 到 6 应该怎么写？为什么？**

参考答案：`range(1, 6)` 产生 1、2、3、4、5，不包含终点 6。要包含 6 就写 `range(1, 7)`。原因是 `range(start, stop)` 的区间是左闭右开，长度为 `stop - start`；这种约定让 `range(n)` 恰好给出 n 个数，也让切片与循环的边界计算保持一致。

**2. 给定 `nums = [10, 20, 30, 40, 50]`，`nums[-2]` 和 `nums[1:4]` 分别是什么？**

参考答案：`nums[-2]` 是 `40`，负索引从末尾计数，-1 是最后一个元素，-2 是倒数第二个。`nums[1:4]` 是 `[20, 30, 40]`，切片从索引 1 取到索引 4 之前，包含 1、2、3 三个位置。

**3. 下面的代码为什么输出 B 而不是 A？如何修改才能输出 A？**

```python
score = 95
if score >= 80:
    print("B")
elif score >= 90:
    print("A")
```

参考答案：`elif` 链自上而下判断，95 已经满足第一个条件 `>= 80`，于是打印 B 并跳过后续分支。要把最严格的判断放在前面：先写 `if score >= 90: print("A")`，再写 `elif score >= 80: print("B")`。

**4. 下面两种存法，哪种更适合「按姓名查年龄」？说明理由。**

```python
people_list = [("Alice", 25), ("Dave", 30)]
people_dict = {"Alice": 25, "Dave": 30}
```

参考答案：字典更合适。按姓名查询时，字典可以直接 `people_dict["Alice"]` 得到 25，平均查找代价接近常数；列表需要遍历并逐个比较姓名，代价随人数线性增长。如果需求是按插入顺序遍历所有人，列表反而更自然。选择取决于访问方式：按位置遍历用列表，按名字查字段用字典。

**5. 为什么 `scores = {90, 85, 90}` 打印出来只有两个元素？这会带来什么限制？**

参考答案：花括号且不含键值对时创建的是集合，集合自动去除重复元素，所以 90 只保留一个。限制是集合无序：不能通过索引取值，也不能依赖遍历顺序；此外元素必须是不可变类型（数字、字符串、元组），列表不能放进集合。

## 与前后章的关系

到这里「Python 基础」板块结束：值、变量、运算、分支、循环、容器都已具备。下一章把这些零件组装起来——用函数封装可复用的逻辑，理解参数、返回值与作用域，然后接触模块与外部库。从下一章起，代码开始像真正的程序，而不是零散的单行练习。
