---
slug: "06-project-structure-and-errors"
title: "从脚本到项目：结构、路径、文件与错误处理"
summary: "把散落的脚本整理成有 data/output 目录的项目，理解 Python 如何按当前工作目录找文件，用 pandas 读写 CSV、JSON、Excel，把函数拆进模块，再用 try/except 让程序在出错时继续运行。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - python
  - project-structure
  - pathlib
  - error-handling
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 6 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=11698s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

上一章把 API、pandas、文件操作各自讲了一遍，但代码仍然散落在几个互不相干的脚本里。这一章处理的是「把它们变成一个项目」：怎样组织目录、Python 到哪里找文件、怎样读写不同格式的数据、怎样把代码拆成可复用的模块，以及程序遇到错误时怎样不整个崩溃。

这一章对应长视频第 6 章，时间范围 3:14:58–3:45:49。开头几分钟仍在收尾上一章的可视化例子，随后进入「Practical Python」小节。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 3:14:58 | 回顾：pandas DataFrame 与 matplotlib 绘图 |
| 3:17:06 | 项目结构：创建 `sales_analysis` 项目 |
| 3:22:05 | 理解路径：`data/`、`output/` 与当前工作目录 |
| 3:26:42 | 上下层目录、`..` 与 VS Code 的工作目录设置 |
| 3:28:40 | 文件格式：CSV、JSON、XML、Parquet 与 pandas 读写 |
| 3:34:15 | 组织代码：`helpers.py` 与模块导入 |
| 3:39:48 | 错误处理：错误类型与 `try/except` |
| 3:45:24 | 转入类与面向对象 |

## 先看结果：一张图和一个 CSV

在进入项目结构之前，课程先演示了「完整的一条流水线」长什么样：调用天气 API 拿到数据，用 pandas 整理，用 matplotlib 画图并保存，再把数据导出成 CSV。

```python
import matplotlib.pyplot as plt

plt.plot(dates, t_min, label="min temperature")
plt.plot(dates, t_max, label="max temperature")
plt.title("Paris weather, past 7 days")
plt.xlabel("date")
plt.ylabel("temperature (°C)")
plt.legend()
plt.savefig("output/paris_weather.png")
```

`import matplotlib.pyplot as plt` 里的 `plt` 不是语法要求，而是社区约定：所有人都这么写，读代码的人一眼就知道它指什么。画完用 `savefig` 存成 PNG，就能直接发邮件给客户。

导出数据只需要一行：

```python
import os

os.makedirs("data", exist_ok=True)
df.to_csv("data/paris_weather.csv", index=False)
print("saved to data/paris_weather.csv")
```

课程特别指出，这一步已经用到了数据分析师的核心技能：连接真实的 API、处理日期、用 pandas 加工、画图、处理文件与目录、保存结果。「你的程序可以在没人看着的时候，把每周销售报告算好、导出成 Excel、发出去」——这就是自动化脚本的雏形。

## 项目结构：让文件各就各位

一个真实的项目不应该把代码和数据混在同一个文件夹里。课程新建了一个 `sales_analysis` 项目：

```text
sales_analysis/
├─ analyzer.py
├─ helpers.py
├─ data/
│  └─ sales.csv
└─ output/
```

规则很简单：

- `data/` 放输入文件，`output/` 放结果，图片可以再单独放 `figures/`。
- 主脚本放在项目顶层，需要时再往深处建目录。
- 不要引用桌面或其它项目里的文件，保持项目自包含。
- 边写边测：交互式窗口逐行跑一遍，再把整个文件跑一遍，两种方式都要能用。

最后一条容易被忽略。交互式会话里运行正常，但整个文件运行时找不到文件，通常是因为工作目录不同——这正是下一节的主题。

## Python 怎样找文件

课程做了一个实验。在 `sales_analysis/analyzer.py` 里写：

```python
import os

print("cwd:", os.getcwd())
print("exists:", os.path.exists("data/sales.csv"))
```

输出显示当前目录是 `sales_analysis`，文件存在。把路径改成 `sales.csv` 后，同样的检查返回 `False`：解释器只在当前工作目录里找，而 `sales.csv` 实际在 `data/` 里面。

由此得到一张心智地图：

- **你在哪个文件里不重要，重要的是当前工作目录在哪。**
- `data/sales.csv` 表示「从当前目录进入 `data`，再取 `sales.csv`」。
- `../data/sales.csv` 表示「先向上一层，再进入 `data`」，`..` 可以叠加。
- 路径分隔符统一用 `/`，Windows 也接受。

还有一个容易踩的坑：VS Code 的 Python 扩展如果没配置好，运行脚本时的工作目录可能是项目根目录而不是脚本所在目录。课程建议在设置里把执行路径固定到文件所在目录，否则所有相对路径都会错位。

## 读写不同格式的数据

真实项目里数据有各种形状：CSV、JSON、XML、纯文本，还有 Parquet 这种列式存储。pandas 对常见格式都提供了读写函数：

```python
import pandas as pd

df = pd.read_csv("data/sales.csv")
print(df.shape)                       # (行数, 列数)

df["total"] = df["quantity"] * df["price"]

df.to_csv("output/sales_with_totals.csv", index=False)
df.to_json("output/sales.json", orient="records", indent=2)
df.to_excel("output/sales.xlsx", index=False)
```

列运算的写法很像 Excel：`df["quantity"] * df["price"]` 会按行相乘，结果赋给新列 `total`。

`to_excel` 会报错 `ModuleNotFoundError: No module named 'openpyxl'`。这不是代码写错了，而是 pandas 把 Excel 的读写交给了一个可选依赖。装上即可：

```bash
pip install openpyxl
```

装完以后再运行，`output/` 下会同时出现 CSV、JSON 和 XLSX 三个文件。把整个脚本保存成文件、用「运行」按钮跑一遍，它会自动创建目录并产出全部结果——这就是可以交给定时任务自动执行的脚本。

读回来的函数与写出去一一对应：`read_csv`、`read_json`、`read_excel`，都带有大量参数（跳过行、指定编码、转换类型等），需要时查文档即可。

## 把函数拆进模块

一开始所有代码都在 `analyzer.py` 里，几百行以后就很难读。解决办法是把通用逻辑移到单独的文件：

```python
# helpers.py
def calculate_total(quantity, price):
    """Return quantity * price."""
    return quantity * price


def format_currency(amount):
    """Format a number as a dollar amount with two decimals."""
    return f"${amount:,.2f}"
```

然后在 `analyzer.py` 里导入：

```python
import pandas as pd
from helpers import calculate_total, format_currency

df = pd.read_csv("data/sales.csv")

totals = []
for _, row in df.iterrows():
    totals.append(calculate_total(row["quantity"], row["price"]))

df["total"] = [format_currency(t) for t in totals]
print(df)
```

几个要点：

- 模块就是一个 `.py` 文件；`from helpers import ...` 导入的是文件里的函数名，**名字必须完全一致**，否则报 `ImportError`。
- `helpers.py` 与 `analyzer.py` 在同一目录，Python 才能直接找到它。
- 拆开以后，别的分析脚本也可以复用同一批函数；修改一处，所有调用处都更新。
- 函数里的三引号字符串是文档字符串（docstring），写清用途，编辑器悬停时能看到。

这条路径对应一个常见的成长顺序：单文件 → 抽出函数 → 拆成多个文件 → 用类组织。下一章就是第四步。

## 错误处理：让程序不要一崩到底

错误分两类。一类是自己造成的：拼写错误、漏冒号、缩进不对（语法错误），或者除以零、用未定义的变量、类型不匹配（运行时错误）。另一类来自外部：用户输入了 `abc` 而不是年龄、文件被删除、API 掉线或改了接口。

没有保护时，任何一处出错都会让整个脚本停下，后面的代码一律不执行。设想一个数据管道要依次从五个系统取数并生成报告：如果第一个系统失败，后面四个也全都不会跑。

`try/except` 就是为此而设：

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("cannot divide by zero")

print("this line still runs")
```

语法与 `if` 类似：`try:` 后面缩进放可能出错的代码，`except` 分支处理失败。`try` 必须至少配一个 `except` 或 `finally`，否则编辑器会直接报错。

可以针对不同异常分别处理：

```python
try:
    with open("data/sales.csv") as f:
        content = f.read()
except FileNotFoundError:
    print("data file is missing")
except ValueError:
    print("data has the wrong format")
```

还能加 `else`（没有异常时执行）与 `finally`（无论成功失败都执行，常用于关闭连接、清理临时文件）：

```python
try:
    value = int(user_input)
except ValueError:
    print("not a number")
else:
    print(f"you entered {value}")
finally:
    print("done")
```

初学阶段的建议很直接：需要保护的地方先套一个最简单的 `try/except`，不要一上来就写五层异常分类。

## 本章结论

- 项目要有结构：代码在顶层，输入放 `data/`，结果放 `output/`，不要混在一起。
- Python 按**当前工作目录**解析相对路径；`..` 向上一层；VS Code 的工作目录设置会直接影响结果。
- pandas 统一了表格数据的读写：`read_csv` / `to_csv`、`read_json` / `to_json`、`read_excel` / `to_excel`；Excel 需要额外安装 `openpyxl`。
- 把通用函数拆进独立模块，用 `from module import name` 复用；名字必须精确匹配。
- `try/except` 让程序在局部失败后继续执行；`else` 与 `finally` 处理补充逻辑。

## 理解检验

**1. 为什么在交互式窗口里能读到 `data/sales.csv`，直接运行整个文件却报找不到文件？**

参考答案：两处运行时的**当前工作目录**可能不同。`os.path.exists("data/sales.csv")` 是相对路径，解释器会把它拼在当前工作目录后面。交互式窗口通常从项目根目录启动，而脚本被某些运行配置调用时，工作目录可能变成别的位置（例如 VS Code 的默认设置）。排查方法是先打印 `os.getcwd()`，再据此写出相对路径，或在运行配置里把工作目录固定为脚本所在目录。绝对路径也能解决，但会牺牲项目的可移植性。

**2. `../data/paris_weather.csv` 和 `data/paris_weather.csv` 有什么区别？**

参考答案：前者先向上一层目录，再进入 `data`；后者从当前目录直接进入 `data`。假设脚本在 `sales_analysis/analyzer.py`：`data/paris_weather.csv` 指向 `sales_analysis/data/paris_weather.csv`，而 `../data/paris_weather.csv` 指向项目外层的 `data/paris_weather.csv`。`..` 可以连续使用，`../../data/...` 表示向上两层。

**3. `df.to_excel("output/sales.xlsx")` 报 `ModuleNotFoundError`，原因是什么？怎么修？**

参考答案：pandas 本身不实现 Excel 文件格式，写 `.xlsx` 需要第三方引擎 `openpyxl`，它属于可选依赖，默认不随 pandas 安装。在项目的虚拟环境里执行 `pip install openpyxl` 后重新运行即可。注意要确认当前终端激活的是项目所用的虚拟环境，否则会装到别处、仍然报同样的错。

**4. 把 `calculate_total` 放进 `helpers.py` 后，`analyzer.py` 里写成 `from helpers import calculate_totals` 会发生什么？为什么？**

参考答案：会抛出 `ImportError`（或 `ImportError: cannot import name 'calculate_totals'`）。`from module import name` 按**精确名称**查找模块里的对象，多一个字母就不是同一个名字。Python 不会做模糊匹配，也不会提示「你是不是想导入 calculate_total」。修改为函数定义时的准确名字即可。

**5. 下面两段代码的区别是什么？什么时候需要用第二种？**

```python
try:
    data = load_data()
except Exception:
    pass
```

```python
try:
    data = load_data()
except FileNotFoundError:
    print("missing input file")
    data = pd.DataFrame()
except ValueError as exc:
    print(f"bad input: {exc}")
    raise
```

参考答案：第一段捕获所有异常并静默忽略，程序不会崩溃，但失败原因被完全隐藏，下游可能拿到 `None` 并在更远的地方以更难懂的方式出错。第二段按异常类型分别处理：文件缺失时退回到空表，让流程继续；数据格式错误时打印原因并重新抛出，让调用者知道这次运行不可信。实际项目里应尽量捕获具体的异常类型，对无法处理的错误选择记录或重新抛出，而不是一律 `pass`。

**6. 有一个脚本要依次从五个系统取数并生成报告。第一个系统的 API 挂了。用 `try/except` 怎样让后面四个系统照常处理？**

参考答案：把每个系统的调用各自包在独立的 `try/except` 里，而不是用一个大的 `try` 包住全部流程：

```python
results = {}
for name, fetch in systems.items():
    try:
        results[name] = fetch()
    except Exception as exc:
        print(f"{name} failed: {exc}")
        results[name] = None
```

这样单个系统的失败只影响它自己，其余系统继续执行，最后还能根据 `results` 里的 `None` 判断报告是否完整。如果用一个 `try` 包住五步，第一步抛异常就会直接跳到 `except`，后面四步全部跳过。

## 与前后章的关系

上一章解决「单个程序块怎么写」：读 API、处理数据、画图。这一章把它们组织成项目，并让程序在局部出错时不至于全盘失败。下一章引入类，把「数据 + 操作这些数据的函数」打包在一起，是模块化路线的下一层。再往后两章转向日常工具：Git 管理版本，`.env` 管理密钥，Ruff 与 uv 管理代码风格和依赖。
