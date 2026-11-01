---
slug: 01-setup-and-tooling
title: "环境搭建：Python、VS Code 与虚拟环境"
summary: "长视频第一章：安装 Python 与 VS Code，配置扩展与解释器，建立项目与工作区，用 venv 隔离依赖，并用 Jupyter 交互窗口运行代码。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, environment, venv, vscode, tooling]
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 1 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=0s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

这是 5 小时 15 分长视频的第一章，对应 0:00–52:07。整门课没有官方分章，这里按主题重新划分；本章只做一件事：把一个能长期使用的 Python 工作环境搭起来。

作者的理由很直接：现在让 AI 写一段 Python 代码并不难，难的是知道代码该放在哪、用什么解释器运行、依赖装在哪里、项目如何复现。多数教程装完 Python 就跳进孤立的小例子，学员一离开教程就不会自己起项目。所以本章刻意把工具链讲完整——安装 Python、安装 VS Code、配置扩展、创建项目与工作区、建立虚拟环境、安装第一个包、用交互窗口执行代码。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 课程定位：面向 AI 应用的 Python 全流程 |
| 1:43 | 课程结构与学习建议（手册、倍速、章节跳转） |
| 4:13 | 在 Windows 安装 Python，务必勾选 Add Python to PATH |
| 5:12 | 在 macOS 检查并安装 Python |
| 7:07 | 安装 VS Code |
| 8:56 | 安装 Python、Pylance、Jupyter 扩展 |
| 10:52 | 设置：在文件所在目录执行 Python |
| 13:56 | 创建项目文件夹与命名规范 |
| 16:01 | 把文件夹保存为 VS Code 工作区 |
| 18:22 | 创建 hello.py，写第一个 print |
| 20:15 | 选择 Python 解释器 |
| 21:19 | 运行脚本：播放按钮、快捷键与底层命令 |
| 28:01 | 调整资源管理器的树形缩进 |
| 31:25 | 为什么需要虚拟环境 |
| 34:05 | 用命令面板创建 venv；37:04 用终端创建 |
| 38:55 | 用 pip 安装 requests，并 import 使用 |
| 44:35 | 安装 ipykernel，启用 Jupyter 交互窗口 |
| 49:51 | 本章练习：从零独立搭一个项目 |

## 为什么要先搭环境

课程有一句判断值得记住：**写代码本身不是最难的，环境才是**。一个项目跑不起来，绝大多数时候不是语法不会，而是解释器选错、依赖装到了别处、或者根本不知道该在哪个目录执行。

把环境搭对之后，后续所有章节看到的现象才能和作者屏幕上一致：同样的文件结构、同样的解释器、同样的终端行为。这也是本章不能跳过的原因。

## 安装 Python

**Windows。** 打开 python.org/downloads，点下载，运行安装程序。安装过程中有一个必须勾选的选项：**Add Python to PATH**。勾上之后，才能在任意终端里直接使用 `python` 命令。其余选项保持默认，不要自定义。

**macOS。** 先检查是否已安装。打开终端（Spotlight 搜索 Terminal），执行：

```bash
python3 --version
```

如果输出版本号（例如 `Python 3.13.5`），说明已经装好；如果提示 command not found，就去 python.org/downloads 下载安装。

```bash
# 安装后验证
python3 --version
# Python 3.13.5
```

Windows 上对应的是：

```bash
python --version
```

## 安装 VS Code 与扩展

VS Code 免费、跨平台、扩展生态完整。作者提到，Cursor 这类 AI 编辑器建立在 VS Code 之上，因此这里的所有配置都能迁移过去。

安装后需要三个扩展，都在扩展面板搜索安装：

| 扩展 | 作用 |
| --- | --- |
| Python（Microsoft） | 语言支持、运行与调试的基础 |
| Pylance | 类型提示、补全与静态检查 |
| Jupyter | 提供交互窗口，本章后半段会用到 |

再改两项设置（设置面板搜索即可）：

- `Python › Terminal: Execute In File Dir`：勾选。运行脚本时以文件所在目录为工作目录，而不是工作区根目录。之后读写相对路径文件时，这一步能省掉很多困惑。
- `Explorer › Tree: Indent`：默认 8，作者改成 20，项目层级多时更容易看清结构。

主题是纯装饰，可选。

## 项目、工作区与第一个脚本

### 目录约定

先建一个总目录存放所有 Python 项目，例如 `PythonProjects`；再在下面按项目建子目录。**项目目录名用小写字母加连字符（kebab-case）**，例如 `python-for-ai`。理由是 GitHub 上的仓库名也用这种风格，保持一致可以少一次改名。

### 工作区

打开项目文件夹后，执行 File → Save Workspace As，会在文件夹里生成一个 `.code-workspace` 文件。它就是项目的书签：双击这个文件，VS Code 会恢复整个项目状态——打开的文件、布局、选中的解释器。没有工作区，每次重启编辑器都要重新打开文件夹。

### hello.py

新建 `hello.py`。**文件扩展名决定语言**：`.py` 让 VS Code 识别为 Python 文件并启用语法高亮。名字本身可以随意。

```python
print("Hello world!")
print("I am learning AI")
```

Python 从上到下、从左到右执行，两行会依次输出。

### 选择解释器

VS Code 右下角会显示当前解释器版本，例如 `3.13.5`。点击它可以切换。这一步不能省：机器上可能装了好几个 Python（系统自带、Homebrew、venv），选错就会用错环境。

### 运行

三种等价方式：

1. 右上角的播放按钮；
2. 默认快捷键 `Ctrl+F5`（macOS 为 `Cmd+F5`），也可以在键盘快捷方式里改成 `Ctrl/Cmd+Enter`；
3. 在终端里直接执行命令。

播放按钮背后执行的其实是一条终端命令，大意是：

```bash
cd "项目目录"
"/绝对路径/python" "项目目录/hello.py"
```

所以「点按钮」和「手敲命令」没有魔法，只是前者帮你拼好了路径。理解这一点，在终端里跑别人的项目时就不会慌。

终端可以在 VS Code 内打开（`Ctrl/Cmd+J` 显示或隐藏），它就是系统终端，可以直接执行 `pip`、`python` 等命令。

## 虚拟环境：本课的关键概念

### 问题

真实工作中常常同时维护多个项目。假设项目 A 依赖某个包的 1.0 版，项目 B 依赖 2.0 版。如果所有包都装在全局 Python 里，为 B 升级到 2.0 的那一刻，A 就被破坏了——第二天打开 A，代码报错，而且很难立刻想到是依赖被换掉了。

### 解决

**虚拟环境**是项目自己的私有 Python 副本：解释器和依赖都放在项目目录下的一个文件夹里，项目之间互不影响。删除项目时，把文件夹一起删掉即可，不会污染系统。

创建方式有两种，效果相同。

**方式一：命令面板（推荐给新手）。**

1. `Ctrl/Cmd+Shift+P` 打开命令面板；
2. 输入 `Python: Create Environment`；
3. 选择 `Venv`；
4. 选择基础解释器版本（一般选最新的）；
5. VS Code 会在项目下创建 `.venv` 文件夹，并自动为工作区选中它。

**方式二：终端。**

```bash
python -m venv .venv
```

创建后需要在 VS Code 里重新选择解释器，指向 `.venv` 里的 Python。

### 验证与常见坑

在 VS Code 新建终端时，如果虚拟环境已激活，提示符前面会出现 `(.venv)`。**安装依赖前必须确认这一点**，否则包装进了全局环境，项目里 `import` 会找不到。

```bash
# 提示符应为 (.venv) ...
python -c "import sys; print(sys.executable)"
# 输出应指向 项目目录/.venv/...
```

最典型的错误：先在终端装包，之后才创建虚拟环境，于是那个终端仍指向全局环境。解决办法是关掉旧终端，新建一个。

## pip：安装第一个包

`pip` 从 PyPI（Python Package Index）下载包，装进当前激活的环境。

```bash
pip install requests
```

安装完成后，包的文件会出现在 `.venv/Lib/site-packages/requests/`（macOS 为 `.venv/lib/python3.x/site-packages/`）。本质上就是别人写好的 Python 文件，不需要去读它，知道位置即可。

使用方式是在文件顶部 `import`：

```python
import requests

response = requests.get("https://example.com")
print(response.status_code)
# 200
```

如果编辑器仍显示导入警告（波浪线），先确认解释器选对了；若确认无误，重启 VS Code 通常即可消除——这是语言服务器的缓存问题，不是安装失败。

## Jupyter 交互窗口

作者把交互窗口称为「改变工作方式」的功能。它解决的是终端输出的噪声问题：整个脚本一次性执行，所有输出混在一起，想看某个变量还得加 `print`。

配置步骤：

```bash
pip install ipykernel
```

然后在设置里搜索 `Jupyter: Interactive Window: Text Editor Execution Selection` 并启用。之后：

- `Shift+Enter` 把当前行或选中的代码发送到右侧交互窗口执行；
- 可以逐行、逐段执行，随时查看中间变量；
- 输出与代码分开显示，干净得多。

```python
import requests

response = requests.get("https://example.com")
response.status_code
# 200
```

注意交互窗口有「内存」概念：变量存在于会话中，关掉会话就要从头执行。调试时这是优点，重现问题时也可能成为陷阱——如果看到 `NameError`，先检查对应的定义是否已经在本会话里执行过。

## 本章结论

- 先装 Python（Windows 勾选 Add to PATH），再装 VS Code 与 Python、Pylance、Jupyter 三个扩展。
- 项目目录用 kebab-case；打开文件夹后保存为 `.code-workspace`，下次双击即可恢复。
- 每个项目建一个 `.venv`；装包前确认终端提示符带 `(.venv)`。
- `pip install` 装包，`import` 使用；`ModuleNotFoundError` 大多源于解释器或环境选错。
- 播放按钮只是替你拼接 `python 文件路径` 命令。
- Jupyter 交互窗口适合逐段探索；整脚本运行仍用终端。

## 理解检验

**1. 项目 A 需要某包的 1.0 版、项目 B 需要 2.0 版。如果都装在全局 Python 里会发生什么？虚拟环境如何避免？**

参考答案：全局环境只有一个 `site-packages`，同一个包只能存在一个版本。为 B 安装 2.0 会覆盖 1.0，A 下次运行时可能因 API 变化而报错，且错误出现在与改动无关的项目里，很难定位。虚拟环境让每个项目拥有独立的解释器副本与 `site-packages`：A 的 `.venv` 里是 1.0，B 的 `.venv` 里是 2.0，两者的 `import` 各自解析到自己的目录，互不覆盖。

**2. 点击运行按钮和在终端执行 `python hello.py`，底层有什么区别？**

参考答案：没有本质区别。按钮执行的是等价命令：先切到项目目录，再用工作区选中的解释器执行该文件的绝对路径。区别只在两点：按钮使用的是 VS Code 记录的解释器（可能是 `.venv` 里的），而终端里的 `python` 取决于 PATH 与当前是否激活虚拟环境；按钮会自动处理路径与工作目录。理解这一点后，在终端手动运行别人的项目就只是「选对解释器 + 给对路径」。

**3. 已经 `pip install requests`，`import requests` 仍报 ModuleNotFoundError，最可能的原因是什么？如何排查？**

参考答案：最常见的原因是安装与运行不在同一个环境：装包时终端没有激活 `.venv`，包进入了全局 Python；或者 VS Code 选中的解释器不是 `.venv`。排查顺序：① 看终端提示符是否有 `(.venv)`；② 执行 `python -c "import sys; print(sys.executable)"` 确认解释器路径；③ 在 VS Code 右下角确认选中的解释器与之一致；④ 若刚创建环境，关闭旧终端重新打开。若以上都对，重启 VS Code 以刷新语言服务器缓存。

**4. `.venv` 文件夹和系统里的 Python 是什么关系？删除它会怎样？**

参考答案：`.venv` 是项目私有的环境，里面有一份指向（或复制自）某个基础解释器的 Python，以及独立的 `site-packages`。创建时通过 `python -m venv .venv` 指定基础版本，之后安装的包只进这个文件夹。删除 `.venv` 不会影响系统 Python，也不会影响其他项目；代价是该项目已安装的依赖全部丢失，需要重新创建环境并按 `requirements.txt` 重装。

**5. 交互窗口和「在终端运行整个脚本」各自适合什么场景？**

参考答案：交互窗口适合探索与调试：逐行执行、随时查看中间变量、输出与代码分离，写数据处理和 API 调试时反馈最快。终端运行适合最终验证：它模拟真实的执行方式——从干净的内存开始，按文件顺序执行一次，能暴露「依赖上一次会话残留变量」这类问题。常见工作流是先在交互窗口把逻辑跑通，再用终端完整运行确认可复现。

## 与前后章的关系

本章产出的是一个可复用的工作台：解释器、项目结构、虚拟环境与交互窗口。下一章开始进入语言本身——语法规则、变量、数据类型与运算符；之后是控制流与数据结构、函数与作用域。后面所有代码都默认在 `.venv` 中运行，因此本章的环境约定会一直生效。
