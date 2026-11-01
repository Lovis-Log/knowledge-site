---
slug: "09-env-ruff-uv-workflow"
title: "密钥、代码风格与依赖：.env、Ruff 与 uv"
summary: "把 API key 从代码里移到环境变量和 .env 文件，用 python-dotenv 自动加载；用 Ruff 一键格式化、查错并整理 import；再用 uv 完成建项目、装包、同步依赖的整套流程。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - python
  - environment-variables
  - ruff
  - uv
  - workflow
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 9 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=17073s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

最后一章不讲语言本身，而讲「真正开始做项目时需要的那套工具」。三件事：怎样安全地存放 API key，怎样让代码风格保持一致，以及怎样用一个命令管理项目、依赖和虚拟环境。

课程把这三件事放在一起，是因为它们共同决定了「别人拿到你的项目能不能跑起来」。这一章对应长视频第 9 章，时间范围 4:44:33–5:15:15。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 4:44:33 | 为什么密钥不能写进代码 |
| 4:46:00 | 环境变量与 `os.environ.get` |
| 4:47:58 | `export` 的局限：只在当前终端会话有效 |
| 4:49:57 | `.env` 文件与 `python-dotenv` |
| 4:52:56 | `load_dotenv` 的查找路径问题 |
| 4:55:45 | Ruff：格式化、检查、import 排序 |
| 5:01:23 | uv：现代的项目与依赖管理 |
| 5:03:38 | `uv init`、`uv add`、`uv remove`、`uv sync` |
| 5:08:28 | 完整工作流与收尾 |

## 为什么不能把密钥写进代码

课程展示了一段很常见的代码：

```python
API_KEY = "sk-proj-xxxxxxxxxxxxxxxx"
```

一旦这段代码进入 Git，任何能访问仓库的人——同事、客户、公开仓库的浏览者——都能拿走这个 key。对很多服务来说，一个 key 就足以读取全部客户数据、替客户发消息、产生真实账单。

正确做法是：**代码里只写「去哪里取」，密钥本身放在代码之外**。

## 环境变量

环境变量存在操作系统里，不在 Python 文件里。程序通过标准库读取：

```python
import os

api_key = os.environ.get("API_KEY")
database = os.environ.get("DATABASE_URL", "sqlite:///local.db")

print(api_key)
print(database)
```

没有设置时 `os.environ.get` 返回 `None`；第二个参数提供默认值，于是 `database` 会拿到默认字符串。

设置方式是在终端里 export：

```bash
export API_KEY="sk-proj-xxxxxxxx"
```

但课程马上指出了它的局限：**export 只对当前终端会话有效**。关掉终端、开一个新窗口，变量就没了，程序又只能读到 `None`。而且每次开新终端都要重新 export，非常繁琐。

（Windows PowerShell 的写法是 `$env:API_KEY = "sk-..."`，作用范围同样只限当前会话。）

## `.env` 文件

更实用的做法是把变量写进项目根目录的 `.env`：

```text
API_KEY=sk-proj-xxxxxxxx
DATABASE_URL=postgresql://localhost:5432/app
APP_ENV=development
```

再用 `python-dotenv` 加载：

```bash
pip install python-dotenv
```

```python
from dotenv import load_dotenv
import os

loaded = load_dotenv()      # 返回 True 表示找到了文件
print("loaded:", loaded)

api_key = os.environ.get("API_KEY")
print(api_key)
```

`load_dotenv()` 会在当前目录（有时也向上查找）寻找 `.env`，把它里面的键值对写进 `os.environ`。之后所有读取方式都和真正的环境变量一样。

如果 `.env` 不在当前目录，可以显式指定路径：

```python
load_dotenv(".env")            # 当前目录
load_dotenv("config/.env")     # 子目录
load_dotenv("../.env")         # 上一层
```

找不到文件时 `load_dotenv()` 返回 `False`，不会抛异常。这是最容易出错的地方：程序能跑，但读到的 key 是 `None`，过一会儿才在调用 API 时失败。养成先打印返回值的习惯。

### 别忘了 `.gitignore`

`.env` 必须写进 `.gitignore`：

```text
.env
.venv/
__pycache__/
```

否则 `git add .` 会把密钥一起提交。可以放一个 `.env.example` 进仓库，里面只写变量名和占位值，告诉别人需要配置哪些项，但不泄露真实值。

## Ruff：格式化、检查与 import 排序

Python 的语法只有一种写法，但风格有很多种。PEP 8 定义了官方风格，而 Ruff 负责把代码自动整理成符合风格的样子。

安装很简单：在 VS Code 扩展市场搜索 Ruff，选 Astral 发布的那个，点安装。

然后在设置里开启保存时格式化：

1. 打开设置（`Ctrl+,`），搜索 `format on save`，勾选；
2. 搜索 `default formatter`，选择 Ruff。

之后保存文件时，Ruff 会自动修正空格、空行、缩进、行宽，以及列表与字典的换行方式。课程的原话是：「第一次看到的时候觉得太爽了」。

Ruff 同时提供三项能力：

- **格式化**：把代码排成统一风格；
- **检查（lint）**：找出未使用的变量与 import、可疑写法等，对应编辑器里的黄色波浪线；
- **import 排序**：把 import 按标准库、第三方库、本地模块分组排序。

自动修复通过命令面板完成：`Ctrl+Shift+P` → 输入 `Ruff` → 选择 `Ruff: Fix all auto-fixable problems`。未使用的 `import os` 会被直接删掉。

课程强调：这不会改变程序逻辑，只是让所有文件看起来像同一个人写的。团队协作时，代码评审就不用再讨论空格问题。

## uv：一个工具管到底

传统流程要记三样东西：`pip install` 装包、`requirements.txt` 记录依赖、`venv` 管理虚拟环境。`pip freeze` 还会把依赖的依赖一起写进去，文件很快变得又长又乱。

uv 用一个工具替代全部：

```bash
uv --version
```

### 新建项目

```bash
uv init my_new_project
cd my_new_project
code .
```

生成的结构大致是：

```text
my_new_project/
├─ .gitignore
├─ .python-version
├─ README.md
├─ main.py
└─ pyproject.toml
```

`pyproject.toml` 是现代 Python 项目的配置文件，记录项目名、Python 版本和依赖列表。uv 还会创建一个虚拟环境，只是把它藏在 `.venv` 里，不打扰你。

### 添加与删除依赖

```bash
uv add pandas numpy
```

这一条命令同时完成三件事：安装到虚拟环境、写入 `pyproject.toml` 的依赖列表、更新锁文件。速度比 pip 快很多。

```bash
uv remove pandas
```

删除依赖并同步更新配置。

### 重建环境

别人克隆了你的仓库，没有虚拟环境，只需要：

```bash
uv sync
```

uv 会读取 `pyproject.toml` 与锁文件，把环境完整还原。这正是「换台电脑也能跑」的实现方式。

### 交互式窗口

在 VS Code 里使用 Jupyter 交互窗口时，需要额外安装内核：

```bash
uv add ipykernel
```

然后选择项目对应的虚拟环境解释器，否则交互窗口会提示找不到内核。

课程给出的日常结论很干脆：装包用 `uv add`，删包用 `uv remove`，重建环境用 `uv sync`，其余交给 uv。可以完全不碰 pip、`requirements.txt` 和手动创建虚拟环境。

## 完整工作流

课程最后把所有工具串成一张清单，建议亲手走一遍：

1. 用 `uv init` 创建项目，进入目录并在 VS Code 中打开；
2. 用 `uv add` 安装需要的包；
3. 写代码，保存时由 Ruff 自动格式化；
4. 用 `git init` 初始化仓库，确认 `.gitignore` 包含 `.venv/` 与 `.env`；
5. 把密钥写进 `.env`，用 `load_dotenv()` 读取；
6. `git add`、`git commit`、`git push` 推送到 GitHub；
7. 别人用 `git clone` 加 `uv sync` 就能还原环境；
8. 之后每天只需要：改代码 → 保存 → 提交 → 推送。

课程的说法是：这套流程正是他们工作室给客户做项目时的起点，很多教程省略它，是因为教程只做玩具项目。

## 本章结论

- 密钥不能硬编码；用环境变量或 `.env`，代码里只留读取逻辑。
- `export` 只在当前终端会话有效，`.env` 才能长期保存。
- `python-dotenv` 的 `load_dotenv()` 返回布尔值，找不到文件时不会报错，需要主动检查。
- `.env` 必须进 `.gitignore`；用 `.env.example` 说明需要哪些变量。
- Ruff 一次解决格式化、lint 与 import 排序，配合「保存时格式化」几乎无需手动干预。
- uv 用 `init` / `add` / `remove` / `sync` 覆盖项目创建、依赖管理与环境还原。
- 完整工作流把代码、密钥、版本、依赖四件事固定下来，之后只剩日常的提交与推送。

## 理解检验

**1. 为什么 `export API_KEY=...` 之后新开一个终端就读不到这个变量了？**

参考答案：`export` 设置的是当前 shell 进程及其子进程的环境变量，生命周期与这个终端会话绑定。关闭终端后进程结束，变量随之消失；新开的终端是一个新进程，继承的是系统级或用户级的初始环境，不包含上一个会话里临时 export 的值。要跨会话保留，应当写进 `.env` 由程序加载，或写进 shell 的启动配置文件（如 `~/.zshrc`、`~/.bashrc`），但后者仍不适合存放项目密钥。

**2. `load_dotenv()` 返回 `False` 时程序会怎样？为什么这是一个危险的状态？**

参考答案：返回 `False` 只说明没找到 `.env` 文件，函数本身不抛异常，程序继续运行。危险之处在于后续 `os.environ.get("API_KEY")` 会返回 `None`，而这个 `None` 可能一路传到调用 API 的地方才报错，错误信息往往与「文件没找到」无关，排查成本高。稳妥做法是检查返回值，或在取到 `None` 时立即抛出明确错误：

```python
if not load_dotenv():
    raise RuntimeError(".env not found")
```

**3. `.env` 已经写进 `.gitignore`，为什么还要提供一个 `.env.example`？**

参考答案：`.gitignore` 只保证密钥不被提交，但别人克隆仓库后看不到项目需要哪些环境变量，程序会因为缺配置而失败。`.env.example` 列出所有变量名与占位值（如 `API_KEY=your-key-here`），不含真实密钥，既说明了配置清单，又不会泄露。新成员复制成 `.env` 再填自己的值即可。

**4. Ruff 的「格式化」和「lint」有什么区别？各自解决什么问题？**

参考答案：格式化只调整排版——空格、空行、缩进、行宽、换行方式——不改变代码含义，目的是让所有文件风格一致、易读。lint 则分析代码找出潜在问题，例如未使用的 import、未使用的变量、可疑的比较写法；它可能提示真正的 bug，也可能只是风格建议。Ruff 同时提供两者，还附带 import 排序：把标准库、第三方库与本地模块分组并排序。

**5. `uv add pandas` 与 `pip install pandas` 相比，多做/少做了哪些事？**

参考答案：`pip install` 只把包装进当前环境，不记录到项目配置里；要留下记录必须另外执行 `pip freeze > requirements.txt`，而且 freeze 会把所有间接依赖一并写死。`uv add pandas` 会同时：把包安装到项目虚拟环境、把直接依赖写入 `pyproject.toml`、更新锁文件（记录精确版本），并且速度快得多。结果是依赖声明干净（只列你主动要的），环境可由 `uv sync` 精确重建。

**6. 同事克隆了你的项目，运行时报 `ModuleNotFoundError: No module named 'pandas'`。他应该执行什么？为什么这样能解决问题？**

参考答案：在项目根目录执行 `uv sync`。它会读取 `pyproject.toml` 和锁文件，创建或更新 `.venv`，安装全部声明的依赖及其精确版本。`ModuleNotFoundError` 的原因是克隆下来只有源码，虚拟环境不在仓库里（被 `.gitignore` 排除），所以本机没有安装这些包；`uv sync` 正是用来从配置重建环境的命令。执行后还需要在编辑器中选中该项目的虚拟环境解释器，否则运行器可能仍在使用别的环境。

## 与前后章的关系

第 6 章把脚本整理成项目，第 7 章用类组织代码，第 8 章给代码加上版本与远程备份，这一章补齐密钥、风格与依赖三块拼图。四章合起来是一个可以直接交付的项目骨架：结构清楚、可复用、有历史、密钥安全、换机器能一键还原。

下一门课会在这个骨架上叠加 AI 能力——调用模型 API、构建 agent、接入数据源。那时你需要的不是新的语法，而是这里已经建立的工程习惯。
