---
slug: 05-packages-apis-data
title: "第三方包、API 与数据处理"
summary: "长视频第五章：用 pip 安装与锁定依赖、管理 requirements.txt，用 requests 调用天气 API 解析嵌套字典，再把七天数据装进 pandas DataFrame。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, pip, requests, api, pandas]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 5 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=10151s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

这是长视频的第五章，对应 2:49:11–3:14:58。上一章末尾已经出现 `import`，本章把它用起来：安装第三方包、用 `requirements.txt` 复现环境、调用真实 API 拿数据、把 JSON 解析成字典、再用 pandas 变成表格。

作者把这一章称为「开始像程序员」的地方：先有底层积木（变量、循环、函数），再借助别人写好的包，几十行代码就能做出以前要几百行才能完成的事。API 部分尤其重要——AI 系统本质上就是从一个系统取数据、处理、再写回另一个系统，而这一步几乎都通过 API 完成。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 2:49:11 | `pip install pandas`，导入与别名 `pd` |
| 2:50:04 | `ModuleNotFoundError` 的两个常见原因 |
| 2:50:58 | 安装指定版本（`==`）与降级 |
| 2:52:11 | 一次安装多个包 |
| 2:52:42 | `requirements.txt`：`pip install -r` 与 `pip freeze` |
| 2:54:59 | 拿到别人的项目后如何一键装依赖 |
| 2:56:07 | 如何寻找合适的包；命名冲突的坑 |
| 2:56:53 | API 是什么：系统之间通信的方式 |
| 2:58:14 | 用 `requests.get` 调用天气 API |
| 2:59:34 | 状态码 200；`response.json()` |
| 3:01:30 | 嵌套字典逐层取值 |
| 3:03:42 | 封装成 `get_weather(lat, lon)` 函数 |
| 3:06:29 | 取七天数据：`datetime` 与 `timedelta` |
| 3:11:22 | 用 pandas 转成 DataFrame |
| 3:14:16 | 把日期字符串转成真正的日期类型 |

## 安装与锁定依赖

### 安装与导入

```bash
pip install pandas
```

```python
import pandas as pd
```

`as pd` 是社区约定，几乎所有 pandas 代码都这么写，读别人的代码时也按这个来。

### ModuleNotFoundError 的两种原因

```python
from pydantic import BaseModel
# ModuleNotFoundError: No module named 'pydantic'
```

这个错误只有两种常见成因：

1. 包确实没装；
2. 包装到了别的环境——最常见的是终端没有激活 `.venv`，于是包进了全局 Python。

排查顺序：先看终端提示符是否有 `(.venv)`；再看 VS Code 右下角的解释器是否指向 `.venv`；若刚创建环境，关掉旧终端重开。

### 安装指定版本

有时旧项目依赖特定版本，新版本改了 API 就会报错：

```bash
pip install requests==2.31.0
```

`==` 是精确匹配；如果当前装的是更新版本，pip 会先卸载再安装旧版本。

一次安装多个：

```bash
pip install pandas numpy matplotlib
```

### requirements.txt

这是 Python 项目里最常见的文件之一：把项目依赖及其版本写进一个文本文件，别人（或未来的你）一条命令就能复现环境。

**从零写一个：**

```text
requests==2.32.3
pandas==2.2.3
matplotlib==3.9.2
```

```bash
pip install -r requirements.txt
```

**从现有环境导出：**

```bash
pip freeze > requirements.txt
```

`pip freeze` 会列出当前环境里所有包与精确版本。它比手写更完整，也会包含间接依赖，因此文件可能很长——这是正常现象。

**拿到别人项目时：**

1. 打开项目文件夹；
2. 新建虚拟环境（或让 VS Code 提示创建）；
3. 打开 `requirements.txt` 时 VS Code 会询问是否安装依赖，选是；
4. 环境与依赖一次装好。

这一步之所以重要，是因为别人代码能跑，前提是依赖版本一致；版本不同，报错往往发生在很意外的地方。

### 命名冲突

```python
import datetime
datetime = "2025-01-01"   # 覆盖了模块名
datetime.now()            # AttributeError
```

`import` 得到的也是一个名字，重新赋值就会把它覆盖。变量命名时避开已导入的模块名（`datetime`、`random`、`json` 等）。

## 调用 API

### API 是什么

API 是系统之间约定好的通信接口：你按约定的地址和参数发请求，对方按约定格式返回数据。AI 系统里常见的操作——从 CRM 拉客户、从电商后台取订单、通过 Slack 发消息、调用大模型——都是 API 调用。

本章用一个免费的天气 API（Open-Meteo）演示。它不需要密钥，地址形如：

```text
https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m
```

### 第一次请求

```python
import requests

latitude = 48.85
longitude = 2.35

url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m"

response = requests.get(url)
print(response.status_code)
# 200
```

`200` 表示成功。状态码是 HTTP 的约定：2xx 成功，4xx 请求有问题（如参数错、无权限），5xx 服务端出错。这里用 f-string 把经纬度拼进 URL，正好复用了上一章的语法。

### 解析 JSON

```python
data = response.json()
print(type(data))
# <class 'dict'>
```

`response.json()` 把返回的 JSON 文本解析成 Python 字典。用上一章学的索引方式逐层取值：

```python
print(data["current"]["temperature_2m"])
# 13.1
```

嵌套结构要看缩进：`data` 是字典，其中 `current` 又是一个字典，`temperature_2m` 是它的键。取错层级会得到 `KeyError`，这时打印 `data.keys()` 逐层确认即可。

### 封装成函数

把重复的逻辑收进函数，参数化位置：

```python
import requests

def get_weather(latitude, longitude):
    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={latitude}&longitude={longitude}"
        "&current=temperature_2m"
    )
    response = requests.get(url)
    data = response.json()
    return data["current"]["temperature_2m"]

print(get_weather(48.85, 2.35))   # 巴黎
print(get_weather(51.51, -0.13))  # 伦敦
print(get_weather(35.68, 139.69)) # 东京
```

这一步体现了函数的价值：调用方只关心「传经纬度、拿温度」，URL 拼接与嵌套解析都藏在函数里。

### 请求—解析的固定模式

所有 API 调用都可以归纳成同一个流程：

1. 按文档构造 URL 与参数；
2. 发送请求（`GET` 取数据，`POST` 提交数据）；
3. 检查状态码；
4. 解析 JSON 成字典；
5. 取出需要的字段。

## 用 pandas 处理数据

### 取一段时间的数据

```python
from datetime import datetime, timedelta

end_date = datetime.now().date()
start_date = end_date - timedelta(days=7)

print(start_date.isoformat())  # 2025-10-25
print(end_date.isoformat())    # 2025-11-01
```

`timedelta(days=7)` 表示七天的时间间隔，日期相减得到一周前。API 要求的日期格式是 `YYYY-MM-DD`，`isoformat()` 正好输出这个格式。

把日期拼进请求：

```python
url = (
    "https://api.open-meteo.com/v1/forecast"
    f"?latitude=48.85&longitude=2.35"
    f"&start_date={start_date.isoformat()}"
    f"&end_date={end_date.isoformat()}"
    "&daily=temperature_2m_max,temperature_2m_min"
)

data = requests.get(url).json()
print(data["daily"].keys())
# dict_keys(['time', 'temperature_2m_max', 'temperature_2m_min'])
```

返回的 `daily` 是三个等长列表：日期、每日最高温、每日最低温。

### 转成 DataFrame

pandas 的 DataFrame 可以理解为「Python 里的 Excel 表格」：

```python
import pandas as pd

df = pd.DataFrame({
    "date": data["daily"]["time"],
    "max_temp": data["daily"]["temperature_2m_max"],
    "min_temp": data["daily"]["temperature_2m_min"],
})

print(df)
```

```text
         date  max_temp  min_temp
0  2025-10-25      15.2       8.1
1  2025-10-26      14.8       7.9
...
```

字典的每个键成为列名，每个列表成为一列。相比嵌套字典，表格更适合人阅读，也方便后续筛选、统计与画图。

### 转换日期类型

JSON 里所有值都是字符串或数字，日期也只是一个字符串。把它转成真正的日期类型，才能按时间排序、按周期聚合、正确画折线：

```python
df["date"] = pd.to_datetime(df["date"])
print(df.dtypes)
# date        datetime64[ns]
# max_temp           float64
# min_temp           float64
```

到这一步，数据已经可以直接用于绘图（下一章会继续）。

## 本章结论

- `pip install` 装包，`import ... as ...` 导入并起别名（pandas 约定为 `pd`）。
- `ModuleNotFoundError` 要么没装，要么装错了环境；先检查 `(.venv)` 与解释器。
- 用 `==` 锁定版本；`requirements.txt` 让环境可复现，`pip freeze` 从现有环境导出。
- API 调用是固定五步：构造 URL、发请求、查状态码、解析 JSON、取字段。
- `response.json()` 得到字典，按嵌套层级用键取值。
- 把调用逻辑封装成函数，调用方只需传参数。
- pandas 的 DataFrame 把字典列表变成表格；日期需用 `pd.to_datetime` 转换。

## 理解检验

**1. 已经 `pip install pydantic`，运行时仍报 `No module named 'pydantic'`。列出两种可能原因和对应排查方法。**

参考答案：其一，安装与运行不在同一环境——装包时终端没有激活 `.venv`，包装进了全局 Python；排查：看终端提示符是否有 `(.venv)`，执行 `python -c "import sys; print(sys.executable)"` 确认解释器路径，并与 VS Code 右下角显示的解释器比对。其二，包确实没有安装成功（比如安装时网络中断或命令拼错）；排查：`pip show pydantic` 看是否已安装、`pip list` 看列表里有没有。若两者都正常，重启 VS Code 刷新语言服务器。

**2. `requirements.txt` 解决什么问题？`pip install -r` 与 `pip freeze` 分别做什么？**

参考答案：它把项目依赖及其版本固定下来，让任何人（包括未来的你）能在干净环境里装出完全一致的依赖，避免「在我机器上能跑」。`pip install -r requirements.txt` 读取文件并安装其中列出的所有包与版本；`pip freeze` 输出当前环境已安装的全部包及精确版本，通常重定向到文件：`pip freeze > requirements.txt`。前者是「按单装配」，后者是「盘点现有环境」。

**3. 调用天气 API 后，`data["current"]["temperature_2m"]` 能取到值，而 `data["temperature_2m"]` 报 `KeyError`。为什么？**

参考答案：`response.json()` 返回的顶层字典包含若干键（如 `latitude`、`longitude`、`current` 等），温度不在顶层，而在 `current` 这个嵌套字典里。直接用 `data["temperature_2m"]` 等于在顶层找这个键，找不到就抛 `KeyError`。正确做法是先取 `data["current"]` 得到内层字典，再取其中键；不确定结构时先打印 `data.keys()` 逐层查看。

**4. 为什么要把 API 调用封装成 `get_weather(latitude, longitude)`，而不是每次复制那几行？**

参考答案：封装后调用方只需传经纬度，URL 拼接、请求、状态码与嵌套解析都集中在一处。好处有三个：重复调用只需一行；接口字段变化时只改函数内部；函数可以被其他模块导入复用。这也正是上一章 `return` 的意义——函数把温度交出来，调用方才能拿它参与比较或写入文件。

**5. JSON 里 `date` 字段已经是 `"2025-10-25"` 这样的字符串，为什么还要 `pd.to_datetime`？**

参考答案：字符串只能按字典序比较，不能表达时间间隔，也无法被绘图库正确识别为时间轴。`pd.to_datetime` 把它转成日期时间类型后，才能按时间排序、按天/周聚合、计算间隔，并在折线图上生成连续的时间刻度。这是「数据看起来对」与「数据能参与计算」的区别。

## 与前后章的关系

本章打通了「外部世界 → Python → 表格」的链路：包管理、API、JSON、pandas。下一章进入工程实践——项目结构、文件路径、模块拆分与异常处理，把现在写在单个文件里的脚本整理成可维护的项目。再往后是类与面向对象、Git 与工具链。
