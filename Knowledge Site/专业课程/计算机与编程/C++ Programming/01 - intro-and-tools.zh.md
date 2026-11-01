---
slug: 01-intro-and-tools
title: "第 1 章：开发工具链与第一个 C++ 程序"
summary: "整门课原本是一个 31 小时的无分章长视频，本章对应 0:00–1:55:35。内容是把编辑器、编译器与构建配置接到一起，并在 Windows、Linux、macOS 上各跑通一个 C++20 测试程序，最后读懂第一个程序里的 include、main、cout、endl 与 return。"
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, toolchain, compiler, vscode, cpp20]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 1 章）"
    url: https://www.youtube.com/watch?v=8jLOx1hD3_o&t=0s
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

## 这一章在讲什么

这是 31 小时长视频的第 1 章，覆盖 0:00–1:55:35。它不教语法，只解决一个前置问题：**怎样让写下来的 C++ 代码真正变成能在机器上运行的程序**。

课程把这件事拆成两个工具：一个用来写代码（编辑器或 IDE），一个用来把代码翻译成机器能执行的二进制（编译器）。本章在 Windows、Linux、macOS 三个平台上分别装好这两样东西，并把它们接进 VS Code 的构建任务；最后用一段最小的程序验证整条链路，再逐行解释这段程序。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 0:00 | 课程定位、适合谁、学习方式 |
| 4:37 | 两类工具：编辑器与编译器 |
| 8:19 | 编译器选择：gcc、clang/LLVM、MSVC |
| 11:14 | Windows 安装 gcc 与 clang（winlibs）、配置 PATH |
| 20:22 | Windows 安装 Visual Studio Community 与 MSVC |
| 24:42 | 安装 VS Code 与 C/C++ 扩展 |
| 27:54 | 配置 VS Code 构建任务，跑通测试程序 |
| 45:29 | 把 MSVC 接进 VS Code |
| 53:04 | 配置 IntelliSense 与 C++ 标准 |
| 57:24 | Linux（Ubuntu 20.04）安装 gcc、clang、gdb |
| 1:03:59 | Linux 安装 VS Code 并配置构建任务 |
| 1:22:42 | macOS：Homebrew、Xcode 命令行工具、clang |
| 1:28:06 | macOS 安装 VS Code 并配置 |
| 1:35:20 | 三个在线编译器：onebox、Kodiru、Compiler Explorer |
| 1:42:57 | 第一个 C++ 程序：include、main、cout、endl、return |

## 两个必需的工具

写 C++ 至少需要两类软件，它们的分工不能混：

- **编辑器 / IDE**：只负责输入文本、语法高亮、自动补全。它不理解程序语义，也不生成可执行文件。
- **编译器**：把 `.cpp` 文本翻译成目标平台可直接运行的二进制（Windows 上是 `.exe`，Linux 上是 ELF 可执行文件）。

课程用 VS Code 作编辑器，原因是跨平台、安装简单、扩展生态好；编译器以 **gcc**（通过 MinGW 在 Windows 上提供）为主线，同时演示 clang/LLVM 与 MSVC。同一份代码在三个编译器上都能编译，是检验可移植性的好办法。

> **一句话总结：** 编辑器写文本，编译器造程序；VS Code 本身不会编译任何东西，它只是调用你配置好的编译器。

## 编译器：gcc、clang、MSVC

C++ 标准每年都在扩展（C++11、C++14、C++17、C++20……），但不同编译器对同一特性的支持进度不同。选编译器前可以先查它对目标标准的支持情况：搜索 "cpp compiler support"，cppreference 上有一张按特性、按编译器列出的支持表。

课程选 gcc 作主线，原因是它跨平台、文档多、出错信息相对直白。clang 的报错更友好，MSVC 是 Windows 上的原生工具链。三者装在同一台机器上并不冲突，只要构建配置里写清用哪一个。

## Windows 环境搭建

### 一次装好 gcc 与 clang：winlibs

1. 搜索 "winlibs"，进入项目的 releases 页面。
2. 选择**同时包含 LLVM/Clang 与 MinGW** 的 64 位压缩包。
3. 解压到固定位置，例如 `C:\mingw64`。
4. 打开解压后的 `bin` 目录，确认里面有 `g++.exe`、`gcc.exe`、`clang++.exe`、`gdb.exe`。

### 把编译器加入 PATH

编译器装在磁盘上，但终端默认不一定找得到它。把 `C:\mingw64\bin` 加进系统环境变量 `Path` 后，任意目录下的终端都能直接调用：

```bash
g++ --version
clang++ --version
```

两条命令都能打印版本号，说明 PATH 生效。这一步很关键：VS Code 的 "Configure Tasks" 之所以能自动发现编译器，靠的就是它在 PATH 里扫描。

### 安装 MSVC

MSVC 不随 VS Code 安装，它来自 Visual Studio：下载 Community 版本，在安装器里勾选 **"使用 C++ 的桌面开发"**。安装完成后，普通终端里直接敲 `cl` 会提示找不到命令——这是故意的，因为一台机器上可能装了多个版本的 MSVC。正确做法是从开始菜单打开 **Developer Command Prompt**（或 Developer PowerShell），这个终端预先设置好了 `INCLUDE`、`LIB`、`PATH`，在里面执行 `cl.exe` 才能看到版本信息。

### 安装 VS Code 与 C/C++ 扩展

装完 VS Code 后，打开扩展面板，搜索并安装 Microsoft 的 **C/C++** 扩展。没有它，VS Code 只是普通文本编辑器：没有补全、没有错误提示，也不会提供 "Configure Tasks" 这类 C++ 专用命令。

## 模板工程：把 VS Code 接到编译器

后面的每一章都会从一个"模板工程"复制文件开始。它的价值在于：**构建配置只做一次，之后每个新工程复制过去就能用**。

### 第一个测试程序

先建一个空文件夹，用 VS Code 打开，新建 `main.cpp`：

```cpp
#include <iostream>

int main() {
    auto result = (10 <=> 20) > 0;
    std::cout << result << std::endl;
    return 0;
}
```

这里故意用了 C++20 的**三路比较运算符** `<=>`。它比普通语法更能暴露问题：如果编译器没有按 C++20 模式编译，这段代码会直接报错。程序输出 `0`，因为 `10 <=> 20` 表示"小于"，`> 0` 为假。

> **补充：** `std::strong_ordering` 类型正式定义在 `<compare>` 头文件中。多数实现在包含 `<iostream>` 时也会间接引入，但更稳妥的写法是额外加上 `#include <compare>`。课程为了让测试代码保持最短，省略了它。

### tasks.json 是怎么来的

按 `Ctrl+Shift+P` 打开命令面板，执行 **Tasks: Configure Task**，VS Code 会扫描 PATH，把找到的编译器列出来。选 `g++` 后，它会生成 `.vscode/tasks.json`，大致如下：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "cppbuild",
      "label": "Build with g++ 11.2.0",
      "command": "C:\\mingw64\\bin\\g++.exe",
      "args": [
        "-std=c++20",
        "-g",
        "${workspaceFolder}\\*.cpp",
        "-o",
        "${workspaceFolder}\\rooster.exe"
      ],
      "options": { "cwd": "${workspaceFolder}" },
      "problemMatcher": ["$gcc"],
      "group": { "kind": "build", "isDefault": true }
    }
  ]
}
```

几个参数值得逐个读懂：

| 参数 | 作用 |
| --- | --- |
| `-std=c++20` | 以 C++20 标准编译；缺了它，`<=>` 会报错 |
| `-g` | 生成调试信息，供 gdb 使用 |
| `${workspaceFolder}\\*.cpp` | 编译当前工程下所有源文件，而不是只编译 `main.cpp` |
| `-o rooster.exe` | 指定输出文件名；课程统一用 `rooster`，便于和视频对照 |
| `group.isDefault` | 让 `Ctrl+Shift+B` 直接执行这个任务 |

保存后执行 **Terminal → Run Task → Build with g++**，终端出现 `Build finished successfully`，文件夹里就会多出 `rooster.exe`。

### 接入 clang 与 MSVC

同一个工程可以登记多个构建任务：再次执行 Configure Task，选 `clang++.exe` 生成第二条任务；用 Developer PowerShell 启动 VS Code（在该终端里执行 `code .`）后，MSVC 也会出现在列表里，可以再加一条。

之后 `Run Task` 会弹出选择列表，想换编译器只需换一条任务，代码一行都不用改。

### 配置 IntelliSense

补全与跳转由独立的配置控制，与构建任务无关。执行 **C/C++: Edit Configurations (UI)**，选择编译器路径和 C++ 标准（这里选 c++20），VS Code 会生成 `c_cpp_properties.json`。配置正确后，编辑器里不再出现 `<=>` 报红。

## Linux 与 macOS

Linux（Ubuntu 20.04）上的步骤是同一套逻辑，只是命令不同：

```bash
sudo apt-get install gcc-10 g++-10 gdb
sudo apt-get install clang-12
```

apt 仓库里的 gcc 往往落后于最新版；想要最新版本可以用 Homebrew 安装。VS Code 下载 `.deb` 后用 `sudo dpkg -i` 安装，C/C++ 扩展与 Windows 上相同，`tasks.json` 里的路径改成 `/usr/bin/g++` 即可。

macOS 上先执行 `xcode-select --install` 安装 Xcode 命令行工具（它带 Apple 版 clang），再用 Homebrew 安装更新版本的 gcc 与 LLVM：

```bash
brew install gcc
brew install llvm
```

课程作者没有 Mac 设备，这一段是描述性的；实际配置时最需要注意的是编译器路径，Apple 的 clang 在 `/usr/bin`，Homebrew 装的在 `/usr/local/opt` 或 `/opt/homebrew/opt` 下。

## 在线编译器

不想在本机装工具链、或想快速把代码发给别人复现问题时，可以用在线编译器：

- **onebox**：界面像 IDE，可切换多个 gcc/clang 版本，支持分享链接。
- **Kodiru**：只提供 g++，功能简单，点 Compile 即可运行。
- **Compiler Explorer**：主打查看生成的汇编代码，也能运行程序；编译器种类最多，包括 MSVC。

三者共同的注意点：**必须自己传对标准参数**。在 Compiler Explorer 里如果漏了 `-std=c++20`，`<=>` 那段代码就会被判为错误，这不是代码的问题。

## 读懂第一个 C++ 程序

回到最小的 Hello World：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}
```

### `#include <iostream>`

C++ 的核心语言只有语法规则，输入输出这类功能放在**标准库**里。`#include` 是预处理指令，把 `iostream` 头文件的内容在编译前插入当前文件，相当于把"控制台输入输出"的能力借进来。

可以做个实验：删掉这行，`std::cout` 立刻报错 `namespace std has no member cout`。这不是拼写错误，而是程序根本没见过这个名字。

注意这行末尾**没有分号**：它是预处理指令，不是语句。

### `main` 函数

`main` 是程序的入口。操作系统启动程序时，第一个执行的就是它。函数体里的语句按从上到下的顺序执行，直到遇到右花括号。

### `std::cout` 与 `<<`

`std::cout` 是标准输出流，代表"程序通往控制台的那条管道"。`<<` 是流插入运算符，把右边的数据送进左边的流：

```cpp
std::cout << "Hello World" << std::endl;
```

两个 `<<` 的方向都指向 `cout`，正好提示数据流向：从程序流向控制台。链式写法等价于连续两次插入。

### `std::endl` 与 `'\n'`

`std::endl` 输出一个换行符并刷新缓冲区。`'\n'` 只输出换行符。两者在控制台上看起来一样，但 `endl` 多了一次刷新。本章只需要知道：**不加换行，多条输出会挤在同一行**。

### `return 0`

`main` 的返回值交给操作系统，`0` 约定表示"正常结束"，非零表示出错。现代 C++ 允许省略这一行（会隐式返回 0），但课程统一保留，让意图更明确。

## 本章结论

- 编辑器负责写，编译器负责翻译成二进制；VS Code 只是调用编译器。
- gcc、clang、MSVC 可以共存，用哪个由 `tasks.json` 里的任务决定。
- 编译器必须在 PATH 里，VS Code 才能自动发现它；MSVC 例外，必须从 Developer Prompt 启动。
- `tasks.json` 的关键参数是 `-std=c++20`、源文件通配和 `-o` 输出名。
- `#include <iostream>` 引入输入输出能力；`main` 是入口；`std::cout <<` 把数据送往控制台；`std::endl` 换行；`return 0` 告诉系统程序正常结束。

## 理解检验

**1. 为什么装了 VS Code 还不够，还必须单独装编译器？**

参考答案：VS Code 是编辑器，只处理文本：高亮、补全、保存文件。它没有把 C++ 翻译成机器码的能力。编译器（g++/clang++/cl）负责这一步：读入 `.cpp`，做语法与类型检查，生成目标平台的二进制。VS Code 的构建任务本质上只是在终端里替你执行一条编译器命令，因此编译器必须另行安装并放进 PATH。

**2. `tasks.json` 里把 `-std=c++20` 删掉会发生什么？为什么课程特意用一个 `<=>` 的测试程序？**

参考答案：删掉之后编译器按默认标准（g++ 11 的默认是 gnu++17）编译，`<=>` 是三路比较运算符，C++20 才引入，因此会报语法/未定义运算符错误，构建失败。课程用这段代码，是因为它无法在旧标准下"碰巧编译通过"——只要构建成功，就能证明 C++20 模式确实生效了，这比写 Hello World 更能验证工具链配置正确。

**3. 已经装好 MSVC，为什么在普通终端敲 `cl` 提示找不到命令，而在 Developer Command Prompt 里就可以？**

参考答案：MSVC 的 `cl.exe` 没有加进系统 PATH。Visual Studio 的做法是：打开 Developer Command Prompt 时，由脚本临时设置一组环境变量（PATH、INCLUDE、LIB 等），并且这些设置只对那个终端会话有效。普通终端没有这些变量，自然找不到 `cl`。同理，想让 VS Code 也能用 MSVC，需要先在那个 Developer 终端里执行 `code .` 启动 VS Code，让它继承这套环境。

**4. 模板工程里的 `tasks.json` 为什么把 `${workspaceFolder}\\*.cpp` 写进参数，而不是只写 `main.cpp`？**

参考答案：写通配符表示编译当前工程目录下所有 `.cpp` 文件，并一次性链接成一个可执行文件。这样后面章节把代码拆到多个源文件时，不用每次修改构建配置。只写 `main.cpp` 的话，新增的源文件不会被编译，链接阶段会出现"未定义符号"。

**5. 在 Compiler Explorer 里运行 `<=>` 的测试代码报错，但在本机 g++ 上能通过，最可能的原因是什么？**

参考答案：在线编译器不会自动按 C++20 编译，需要在编译选项里显式加上 `-std=c++20`。它默认使用该编译器的默认标准（通常是 C++14/17），所以 C++20 的运算符被判为非法。这不是代码错误，而是编译参数缺失；补上标准参数后即可通过。

**6. `#include <iostream>` 末尾为什么不写分号，而 `std::cout << ...` 必须写？**

参考答案：`#include` 是预处理指令，由预处理器在编译前处理，语法上不参与 C++ 语句体系，因此不需要分号。`std::cout << ...` 是一条表达式语句，C++ 要求语句以分号结束；漏掉分号会得到"expected ';' before ..."一类的编译错误。

## 与前后章的关系

本章把工具链搭好，产出一个可复用的模板工程。第 2 章开始真正写代码：注释、三类错误、语句与函数、输入输出流，并用这个模板工程跑通"输入名字与年龄、打印问候"的完整程序。第 3 章再进入变量与数据类型，解释内存里的 0 和 1 怎样对应到人类可读的数值。
