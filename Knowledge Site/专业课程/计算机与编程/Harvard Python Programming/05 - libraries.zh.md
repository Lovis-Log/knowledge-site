---
slug: "05-libraries"
title: "库、包与 API：站在别人的代码上"
summary: "CS50P 第 4 周：用 import 引入 random 与 statistics，用 sys.argv 读取命令行参数并做边界检查，用 pip 安装第三方包，用 requests 调用 iTunes API 并解析 JSON，最后把常用函数做成自己的模块并用 __main__ 保护入口。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "modules"
  - "packages"
  - "api"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 5 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=17520s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## 这一章在讲什么

这是长视频的第 5 章，对应 CS50P 第 4 周（04:52:00–06:09:37），主题是**库**。

到目前为止，代码都写在一个文件里，用到的函数不是自己写的，就是 Python 白送的（`print`、`input`、`int`）。但真实程序不可能什么都从头造：随机数、统计、HTTP 请求、JSON 解析，这些早有人做得比你好。库就是**别人写好的代码，你直接拿来用**。

本章按「由近到远」的顺序展开：先用 Python 自带的 `random` 与 `statistics`；再学命令行参数 `sys.argv`，让程序在启动时就拿到输入；然后跳出标准库，用 `pip` 安装第三方包 `cowsay`；接着用 `requests` 调用 iTunes 的 API，把返回的 JSON 变成 Python 字典；最后反过来，把自己的函数打包成模块，并用 `if __name__ == "__main__"` 保护入口。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 4:52:00 | 本周主题：库与模块是什么 |
| 4:53:10 | Python 自带的 `random` 模块 |
| 4:54:52 | `import` 关键字 |
| 4:55:09 | `random.choice`：掷硬币 |
| 4:59:27 | `from ... import ...` 与命名冲突 |
| 5:02:36 | `random.randint`：区间内随机整数 |
| 5:04:27 | `random.shuffle`：原地打乱列表 |
| 5:08:36 | `statistics.mean`：求平均值 |
| 5:10:38 | 命令行参数与 `sys.argv` |
| 5:14:05 | 用 `argv[1]` 读取用户输入 |
| 5:17:14 | `IndexError` 与 `len(argv)` 检查 |
| 5:24:44 | 把错误处理移到前面，用 `sys.exit` 提前退出 |
| 5:30:21 | 支持多个名字：遍历 `argv` |
| 5:32:35 | 切片 `argv[1:]` 去掉程序名 |
| 5:36:31 | 第三方包与 PyPI |
| 5:38:27 | `pip install cowsay` |
| 5:45:00 | API 与 `requests` |
| 5:46:46 | iTunes API 与 JSON 响应 |
| 5:57:23 | 从 JSON 字典中取出 `trackName` |
| 6:02:20 | 写自己的模块 `sayings.py` |
| 6:05:42 | 导入时 `main()` 被误调用的问题 |
| 6:06:37 | `if __name__ == "__main__"` |

## 模块：把代码装进可复用的文件

Python 的模块（module）就是一个文件，里面放着函数、变量或其他东西。`import random` 就是告诉 Python：去把 `random` 里的内容加载进来。

```python
import random

coin = random.choice(["heads", "tails"])
print(coin)
```

`random.choice` 从列表里等概率地挑一个元素。跑几次可能连续出 `heads`，这正是概率的样子——只有次数足够多，才会接近 50/50。

### import 的两种形式

```python
import random
coin = random.choice(["heads", "tails"])
```

```python
from random import choice
coin = choice(["heads", "tails"])
```

第二种把 `choice` 直接放进当前命名空间，调用时不用写模块名。

各有取舍：

- `import random` 保留命名空间，你可以自己定义同名的 `choice` 变量而不冲突；
- `from random import choice` 更短，但如果别处也有 `choice`，就会覆盖。

课程的建议是：短程序怎么都行，长程序更偏向保留命名空间。

### 另外两个常用函数

```python
import random

number = random.randint(1, 10)     # 1 到 10，含两端
cards = ["jack", "queen", "king"]
random.shuffle(cards)              # 原地打乱，没有返回值
```

`randint(a, b)` 包含两端；`shuffle` 直接修改传入的列表，不返回新列表——所以不能写 `cards = random.shuffle(cards)`。

### statistics 模块

```python
import statistics

print(statistics.mean([100, 90]))   # 95
```

`mean` 求平均值，此外还有 `median`、`mode` 等。

## 命令行参数：程序启动时的输入

之前一直用 `input()` 在程序运行时提问。另一种方式是在**启动程序时**就把参数写在命令后面：

```bash
python name.py David
```

Python 把命令行上的词放进 `sys.argv`，它是一个列表：

- `argv[0]` 是脚本名 `name.py`；
- `argv[1]` 是第一个参数 `David`；
- 依此类推。

```python
import sys

print("hello, my name is", sys.argv[1])
```

### 越界与检查

不加参数直接运行：

```text
IndexError: list index out of range
```

`argv` 只有 `argv[0]`，访问 `argv[1]` 就越界了。可以捕获：

```python
import sys

try:
    print("hello, my name is", sys.argv[1])
except IndexError:
    print("Too few arguments")
```

也可以主动检查，给出更细的提示：

```python
import sys

if len(sys.argv) < 2:
    print("Too few arguments")
elif len(sys.argv) > 2:
    print("Too many arguments")
else:
    print("hello, my name is", sys.argv[1])
```

### 用 sys.exit 提前退出

上面的写法把正常逻辑塞进了 `else`。更清晰的结构是：先在开头检查错误并退出，后面就可以放心地假设一切正常：

```python
import sys

if len(sys.argv) < 2:
    sys.exit("Too few arguments")
elif len(sys.argv) > 2:
    sys.exit("Too many arguments")

print("hello, my name is", sys.argv[1])
```

`sys.exit(message)` 会打印消息并立即结束程序。程序本来运行到文件末尾也会退出，这里只是**提前**退出，让后续代码不必再考虑错误情况。

`break` 只能跳出循环，`sys.exit` 结束整个程序，二者不能互换。

### 支持多个名字

```python
import sys

for arg in sys.argv:
    print("hello, my name is", arg)
```

这样会把脚本名也打印出来。用**切片**去掉第一个元素：

```python
for arg in sys.argv[1:]:
    print("hello, my name is", arg)
```

`argv[1:]` 表示「从索引 1 到末尾」。切片语法是 `[start:end]`，两端都可以省略：`[1:]` 省略末尾，`[:2]` 省略开头，`[-1]` 取最后一个。

在命令行上给带空格的名字加引号，它会被当成一个整体：

```bash
python name.py "David Malan"
```

## 第三方包：pip 与 PyPI

标准库之外，还有大量别人发布在 PyPI（Python Package Index）上的包。用 `pip` 安装：

```bash
pip install cowsay
```

装好之后就能像标准库一样导入：

```python
import cowsay
import sys

if len(sys.argv) == 2:
    cowsay.cow("hello, " + sys.argv[1])
```

`cowsay` 会把字符串用 ASCII 艺术包装成一头牛说出来的样子。它本身没什么实际用途，但演示了完整的流程：**搜索 → 安装 → 导入 → 调用**。

> **注意：** 第三方包来自外部，安装前应确认来源可信；生产环境通常用虚拟环境隔离依赖（后续章节会涉及）。

## API：让程序去问别人的服务器

API（Application Programming Interface）是程序之间对话的接口。很多服务把自己的数据通过 HTTP 提供出来，你写代码去请求，它返回 JSON。

iTunes 的搜索接口长这样：

```text
https://itunes.apple.com/search?entity=song&limit=1&term=weezer
```

在浏览器里打开，会下载一段文本。它的结构是 JSON：

```json
{
  "resultCount": 1,
  "results": [
    {
      "trackName": "Say It Ain't So",
      "artistName": "Weezer"
    }
  ]
}
```

JSON 用花括号表示对象、方括号表示数组、引号表示字符串——和 Python 的字典、列表几乎一样。它不是 Python 专用格式，任何语言都能读写。

### 用 requests 请求

```bash
pip install requests
```

```python
import json
import requests
import sys

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=1&term=" + sys.argv[1]
)
print(json.dumps(response.json(), indent=2))
```

`requests.get(url)` 向服务器发请求；`response.json()` 把返回的 JSON 文本解析成 Python 字典；`json.dumps(..., indent=2)` 把它重新排版成方便阅读的缩进格式。

### 取出需要的数据

```python
import requests
import sys

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=10&term=" + sys.argv[1]
)

o = response.json()
for result in o["results"]:
    print(result["trackName"])
```

`o["results"]` 是一个列表，每个元素是一个字典；`result["trackName"]` 取出歌名。键名由服务方决定，`trackName` 的 `N` 是大写，拼错就会得到 `KeyError`。

## 写自己的模块

把重复使用的函数放进一个文件，它就变成了模块。

`sayings.py`：

```python
def main():
    hello("world")
    goodbye("world")


def hello(name):
    print(f"hello, {name}")


def goodbye(name):
    print(f"goodbye, {name}")


main()
```

另一个文件里导入：

```python
import sys
from sayings import hello

if len(sys.argv) == 2:
    hello(sys.argv[1])
```

运行 `python say.py David`，输出却是：

```text
hello, world
goodbye, world
hello, David
```

前三行是 `sayings.py` 被导入时产生的——`import` 会**从头到尾执行整个文件**，包括最后那行 `main()`。

### 用 __main__ 保护入口

```python
def main():
    hello("world")
    goodbye("world")


def hello(name):
    print(f"hello, {name}")


def goodbye(name):
    print(f"goodbye, {name}")


if __name__ == "__main__":
    main()
```

`__name__` 是 Python 自动设置的变量：

- 直接运行这个文件时，它的值是 `"__main__"`；
- 被别的文件导入时，它的值是模块名 `"sayings"`。

所以这行判断的意思是：**只有直接运行本文件时才调用 `main()`；被导入时不执行**。

加上之后，`say.py` 就只输出 `hello, David`。

> **一句话总结：** 任何会被别人导入的模块，都不应该在顶层无条件调用 `main()`。

## 本章结论

- 模块是包含函数与变量的文件；`import` 加载它。
- `import random` 保留命名空间，`from random import choice` 直接引入名字，二者各有取舍。
- `random.choice` 等概率选元素，`randint(a, b)` 含两端，`shuffle` 原地打乱。
- `sys.argv` 是命令行参数的列表，`argv[0]` 是脚本名。
- 访问 `argv` 前要检查 `len`，否则会 `IndexError`。
- `sys.exit(message)` 提前结束程序，比把正常逻辑塞进 `else` 更清晰。
- 切片 `argv[1:]` 去掉脚本名；`[start:end]` 两端可省略。
- `pip install` 安装第三方包，包来自 PyPI，使用前应确认可信。
- `requests.get` 请求 API，`response.json()` 得到字典。
- `json.dumps(..., indent=2)` 美化输出，便于查看结构。
- 自己的模块用 `if __name__ == "__main__":` 保护入口。

## 理解检验

**1. `import random` 与 `from random import choice` 有什么区别？各适合什么场景？**

参考答案：`import random` 只把模块名引入当前命名空间，调用时必须写 `random.choice(...)`；`from random import choice` 把函数本身引入当前命名空间，可以直接写 `choice(...)`。

前者避免命名冲突：你可以同时拥有自己的 `choice` 变量，不会覆盖模块里的函数。后者代码更短，但如果当前文件里也有叫 `choice` 的东西，就会互相覆盖。短程序用哪种都行；长程序或库代码更适合保留模块名前缀。

**2. 为什么不能写 `cards = random.shuffle(cards)`？**

参考答案：`shuffle` 是**原地**修改传入的列表，它的返回值是 `None`。执行 `cards = random.shuffle(cards)` 会把 `cards` 重新赋值为 `None`，原来的列表虽然被打乱了，但变量已经不再指向它，后续访问 `cards[0]` 会报 `TypeError`。正确写法是直接调用：

```python
random.shuffle(cards)
```

**3. `sys.argv` 里第一个元素是什么？不加参数运行时，为什么访问 `argv[1]` 会报错？**

参考答案：`sys.argv[0]` 是脚本文件名（例如 `name.py`）。不加参数时列表只有一个元素，长度是 1，访问索引 1 就越界，抛出 `IndexError: list index out of range`。使用前应先检查 `len(sys.argv)`，或用 `try` / `except IndexError` 捕获。

**4. 下面的程序在命令行输入 `python name.py David Malan` 时会输出什么？为什么？**

```python
import sys

for arg in sys.argv[1:]:
    print("hello, my name is", arg)
```

参考答案：

```text
hello, my name is David
hello, my name is Malan
```

`sys.argv` 是 `["name.py", "David", "Malan"]`，切片 `[1:]` 去掉脚本名，得到 `["David", "Malan"]`。循环遍历这两个元素，各打印一行。如果希望把全名当成一个参数，命令行要加引号：`python name.py "David Malan"`，此时 `argv` 是 `["name.py", "David Malan"]`，只打印一行。

**5. `sys.exit` 和 `break` 有什么区别？**

参考答案：`break` 只能跳出当前所在的循环，循环之后的代码仍会执行；`sys.exit` 会立即终止整个程序，后面的任何代码都不会运行。前者用于结束循环，后者用于「条件不满足，程序没必要继续」。二者的作用范围不同，不能互换。

**6. 为什么导入 `sayings` 时会打印出 `hello, world` 和 `goodbye, world`？如何避免？**

参考答案：`import sayings` 会让 Python 从头到尾执行 `sayings.py`，包括文件末尾那句无条件的 `main()`。

避免的方法是把调用包在判断里：

```python
if __name__ == "__main__":
    main()
```

直接运行 `sayings.py` 时，`__name__` 是 `"__main__"`，`main()` 被调用；被别的文件导入时，`__name__` 是 `"sayings"`，条件不成立，`main()` 不执行，只导入函数定义。

**7. `response.json()` 返回的是什么类型？为什么可以用 `o["results"][0]["trackName"]` 取值？**

参考答案：`response.json()` 把服务器返回的 JSON 文本解析成 Python 的字典（如果顶层是对象）。字典的 `"results"` 键对应一个列表，列表的第一个元素又是一个字典，其中 `"trackName"` 是歌名。因此可以按「字典 → 列表 → 字典」的层次逐级索引。键名由服务方定义，必须与返回值完全一致，大小写不同会触发 `KeyError`。

## 与前后章的关系

库把「自己写」扩展成「复用别人写的」，是程序规模增长的前提。下一章讲单元测试，会用 `pytest` 这个第三方包来验证本章写出的函数；再往后处理文件、正则与面向对象时，也都会以模块的形式组织代码。

`if __name__ == "__main__"` 会在剩余所有章节里出现，成为每个可运行脚本的标准入口。
