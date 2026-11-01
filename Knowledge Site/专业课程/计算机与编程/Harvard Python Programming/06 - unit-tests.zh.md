---
slug: 06-unit-tests
title: "单元测试：从 assert 到 pytest"
summary: "先手写 if/print 测试，再用 assert 与 try/except 简化，最后由 pytest 接管样板代码；通过 calculator.py 与 hello.py 两个例子，讲清测试返回值、测试异常、以及为什么可测试性要求函数少用副作用。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, unit-tests, pytest, testing, assert]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 6 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=22177s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

本章是整门长视频（约 16 小时）的第 6 章，对应 CS50P 第 5 次讲座「Unit Tests」，时间区间 6:09:37–7:00:32。前五章一直在写代码，测试靠手动运行、手动输入；这一章把测试本身也写成代码，并引入 pytest 自动化。

## 为什么要把测试写成代码

手动测试的做法是：运行程序，输入 `2`，看到 `4`，再运行，输入 `3`，看到 `9`。问题不在这一次对不对，而在三件事：

1. 每次改代码都要重跑一遍，人会烦，就会跳过；
2. 别人接手时不知道你测过什么；
3. 你只会测自己想到的输入，想不到的角落永远测不到。

把测试写成代码之后，测试可以一键重跑，可以交给 CI，也可以在你改动别人的代码时立刻告诉你有没有破坏原有行为。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 6:09:37 | 引入：为什么要写自己的测试 |
| 6:10:29 | 回到 `calculator.py`，复习 `square` 与 `main` |
| 6:12:31 | 加上 `if __name__ == "__main__":`，让文件可以被导入 |
| 6:13:27 | 新建 `test_calculator.py`，手写 `if ... print` 测试 |
| 6:19:16 | 改用 `assert`，代码减半，但报错不友好 |
| 6:22:13 | 用 `try/except` 捕获 `AssertionError`，换回友好输出 |
| 6:24:34 | 补测 `-2`、`-3`、`0`，暴露「2+2 恰好等于 2×2」的巧合 |
| 6:26:33 | pytest：安装、约定、运行与输出解读 |
| 6:37:49 | 把一个大测试拆成 `test_positive`、`test_negative`、`test_zero` |
| 6:46:01 | `with pytest.raises(...)` 测试异常 |
| 6:47:52 | `hello.py`：为什么测试「打印」行不通，改成返回值 |
| 6:57:03 | 把测试放进 `test/` 文件夹，用 `__init__.py` 变成包 |
| 6:59:21 | 总结：自动化测试是可协作的前提 |

## 起点：一个需要被测试的函数

`calculator.py` 的最后版本：

```python
def main():
    x = int(input("What's x? "))
    print("x squared is", square(x))

def square(n):
    return n * n

if __name__ == "__main__":
    main()
```

手动测试 `2` 得到 `4`、`3` 得到 `9`，看起来没问题。但这只说明两个输入正确。

### 先加 `__main__` 保护

```python
if __name__ == "__main__":
    main()
```

这样 `from calculator import square` 时不会顺带执行 `main()`，把输入提示也带出来。这是让文件同时充当「程序」与「库」的标准写法。

## 手写测试：从 if 到 assert

新建 `test_calculator.py`：

```python
from calculator import square

def main():
    test_square()

def test_square():
    if square(2) != 4:
        print("2 squared was not 4")
    if square(3) != 9:
        print("3 squared was not 9")

if __name__ == "__main__":
    main()
```

这已经比手动测试好：测试被固化下来，可以重跑。但每个测试都要写 `if` 加一个 `print`，测五个值就是十行。

### 用 `assert` 压缩

```python
from calculator import square

def main():
    test_square()

def test_square():
    assert square(2) == 4
    assert square(3) == 9

if __name__ == "__main__":
    main()
```

`assert` 的语义是：断言后面的布尔表达式为真。为真时什么也不发生；为假时抛出 `AssertionError`，并给出文件和行号。

### 故意引入一个 bug

把 `square` 改成 `return n + n`：

```python
def square(n):
    return n + n
```

运行测试，只有 `3` 的那条失败，`2` 的那条仍然通过——因为 $2+2=2\times2=4$。这个巧合说明：**只测一个值是不够的**，测试要覆盖有代表性的边界。

### 用 try/except 换回可读输出

```python
def test_square():
    try:
        assert square(2) == 4
    except AssertionError:
        print("2 squared was not 4")
    try:
        assert square(3) == 9
    except AssertionError:
        print("3 squared was not 9")
```

`assert` 抛出的正是 `AssertionError`，所以可以用前面学过的异常处理接住它。代价是代码又变长了：为了测试一个两行的函数，写了三十多行测试。

## pytest：把样板代码交出去

pytest 是第三方库，用 `pip install pytest` 安装。它接管三件事：运行测试、捕获断言失败、输出结果。

### 约定

- 文件名形如 `test_*.py`；
- 函数名形如 `test_*`；
- 测试函数里直接用 `assert`，不需要 `main`、不需要 `try/except`。

```python
from calculator import square

def test_square():
    assert square(2) == 4
    assert square(3) == 9
    assert square(-2) == 4
    assert square(-3) == 9
    assert square(0) == 0
```

运行：

```bash
pytest test_calculator.py
```

结果用一个字符表示一个测试：`.` 是通过，`F` 是失败。修复 bug 之后输出 `.....`，五个断言全部通过。

### 读失败输出

在 bug 版本下，pytest 会指出失败的那一行，并把实际值写出来，例如：

```
assert 6 == 9
 +  where 6 = square(3)
```

它不会告诉你「你把乘号写成了加号」，只给你线索：`square(3)` 返回了 `6`。定位仍然要自己做。

### 一个测试函数只测一类情况

如果把五个断言写在同一个 `test_square` 里，第一个失败后，后面的断言就不会执行，你只拿到一条线索。拆成三个函数：

```python
def test_positive():
    assert square(2) == 4
    assert square(3) == 9

def test_negative():
    assert square(-2) == 4
    assert square(-3) == 9

def test_zero():
    assert square(0) == 0
```

pytest 会把三个函数都跑一遍，即使其中一个失败。输出汇总为「2 failed, 1 passed」，直接告诉你：正数里 3 失败、负数里 -2 失败、0 通过——bug 的范围立刻缩小。

## 测试异常：`pytest.raises`

有些错误不是返回值不对，而是**应该抛异常**。比如把字符串传给 `square`：

```python
square("cat")
```

会得到 `TypeError: can't multiply sequence by non-int of type 'str'`。要断言这一点：

```python
import pytest
from calculator import square

def test_str():
    with pytest.raises(TypeError):
        square("cat")
```

`with pytest.raises(TypeError):` 表示：下面这段代码必须抛出 `TypeError`，否则测试失败。这样连「错误行为」也被固定下来了。

## 第二个例子：有副作用的函数怎么测

`hello.py`：

```python
def main():
    name = input("What's your name? ")
    hello(name)

def hello(to="world"):
    print("hello,", to)

if __name__ == "__main__":
    main()
```

如果这样写测试：

```python
from hello import hello

def test_hello():
    assert hello("David") == "hello, David"
```

一定失败。原因不是逻辑错，而是 `hello` **没有返回值**：它调用 `print`，返回的是 `None`。`print` 的产物是屏幕上的副作用，不是可以被断言的返回值。

### 改成返回值

```python
def hello(to="world"):
    return f"hello, {to}"

def main():
    name = input("What's your name? ")
    print(hello(name))
```

原先「打印」的职责交给调用者，函数本身只负责构造字符串。这样测试就成立了：

```python
from hello import hello

def test_default():
    assert hello() == "hello, world"

def test_argument():
    assert hello("David") == "hello, David"
```

这背后是一条通用的设计建议：**能返回就不要打印**。副作用让函数难以测试；把副作用推到边界（`main`），核心逻辑就变成纯函数。

## 把测试放进文件夹

测试多了之后，可以建一个 `test/` 目录：

```
test/
├── __init__.py
└── test_hello.py
```

`__init__.py` 即使为空，也告诉 Python 把这个目录当作包。然后：

```bash
pytest test
```

pytest 会递归查找目录里所有符合命名约定的测试。

补充：CS50 自带的 `check50` 在思路上与 pytest 类似，都是自动运行一组检查并给出结果；区别是 `check50` 面向作业评分，pytest 是通用工具，两者并不互斥。

## 本章结论

- 测试要写成代码，才能重复运行、协作与回归。
- `assert` 断言布尔表达式，失败时抛 `AssertionError`；`try/except` 可以把它转成可读输出。
- pytest 负责运行、捕获与汇报，测试函数只需写 `assert`；`.` 表示通过，`F` 表示失败。
- 一个测试函数只覆盖一类输入；拆开之后，即使部分失败也能拿到多条线索。
- `with pytest.raises(TypeError):` 用来断言「应该抛出某种异常」。
- 返回值的函数容易测，靠打印产生副作用的函数难测；优先返回，把打印留给调用者。
- 测试目录加 `__init__.py` 成为包，`pytest test` 可以一次跑完整个目录。

## 理解检验

**1. 为什么手动运行两次、看到 `2²=4` 和 `3²=9` 仍不能说明 `square` 正确？**

参考答案：手动测试只覆盖了两个恰好正确的输入，而且没有留下可重复执行的记录。更有说服力的是反例：把 `square` 误写成 `n + n` 时，`2` 的测试仍然通过，因为 $2+2=2\times2$。这说明单个输入可能恰好落在 bug 不暴露的区域。正确做法是把多个有代表性的输入（正数、负数、零、边界值）写成自动化测试，并让每次改动都能重跑。

**2. `assert square(3) == 9` 失败时会发生什么？pytest 又是如何利用这一点的？**

参考答案：`assert` 的表达式为假时，Python 抛出 `AssertionError`，traceback 指出失败的文件与行号。pytest 正是捕获这个异常来判断测试失败，所以测试函数里不需要写 `try/except` 或 `print`：它负责捕获并汇总，`.` 表示没有异常（通过），`F` 表示捕获到了 `AssertionError`。

**3. 为什么把五个断言拆成 `test_positive`、`test_negative`、`test_zero` 比放在一个函数里更好？**

参考答案：同一个函数里，第一个失败的断言会中断后续断言，后面的输入根本不会被检查，你只得到一条线索。拆成三个函数后，pytest 会分别运行，即使部分失败，其余测试仍会执行。输出「2 failed, 1 passed」能同时告诉你：正数中 `3` 失败、负数中 `-2` 失败、`0` 通过——bug 的范围被缩小到「非零且非 2 的输入」，定位更快。

**4. `hello("David") == "hello, David"` 这条测试为什么在原始版本上必然失败？怎样改代码让它通过？**

参考答案：原始 `hello` 用 `print("hello,", to)` 输出，没有 `return`，所以函数返回 `None`；断言 `None == "hello, David"` 必然为假。修改方式是让函数返回字符串 `f"hello, {to}"`，并把打印移到调用者（`main` 里 `print(hello(name))`）。这样函数变成纯函数，测试才有可比较的返回值。补充：这也解释了为什么「能返回就不要打印」——副作用无法被 `assert` 检查。

**5. 怎样测试「传入字符串应该报错」这种行为？为什么不能写成 `assert square("cat") == ...`？**

参考答案：应该用
```python
with pytest.raises(TypeError):
    square("cat")
```
它断言这段代码必须抛出 `TypeError`。不能写成 `assert` 比较返回值，因为此时函数根本不会正常返回，而是直接抛异常中断；`assert` 语句本身会因异常而失败，无法表达「我期望它抛出这个异常」这一意图。

**6. 为什么 `if __name__ == "__main__":` 这一行对测试很重要？**

参考答案：测试文件需要 `from calculator import square`。如果没有这层保护，导入模块时 `main()` 会立即执行，弹出 `input` 提示、阻塞测试进程。加上保护后，只有直接运行该文件时才执行 `main()`；被导入时只定义函数。这是让同一个文件既能当程序、又能当库的前提。

## 与前后章的关系

第 5 章学了用 `sys`、`random`、`csv` 等库扩展程序；本章把「检查程序」也交给了库——pytest。下一章进入文件读写：程序不再只与用户交互，还要与磁盘上的数据交互，而本章的测试习惯会直接用在读写逻辑上（例如测「文件不存在时是否报错」）。再往后第 8 章的正则、第 9 章的类，都会用同样的方式写测试。
