---
slug: "08-git-and-github"
title: "Git 与 GitHub：给代码加上版本与备份"
summary: "用快照的方式理解 Git，分清仓库、暂存、提交、推送、拉取与克隆，完成从安装、认证到把本地项目推上 GitHub 的全过程，并用 .gitignore 挡住虚拟环境与密钥。"
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - git
  - github
  - version-control
  - workflow
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 8 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=15004s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## 这一章在讲什么

写代码绕不开两个问题：改坏了怎么退回去，以及怎样把代码交给别人。Git 解决前者，GitHub 解决后者。这一章只讲日常会用到的部分——大约占全部 Git 功能的 80%–90%——剩下的查速查表即可。

这一章对应长视频第 8 章，时间范围 4:10:04–4:44:33。

## 时间轴

| 时间 | 内容 |
| --- | --- |
| 4:10:04 | Git 与 GitHub 分别是什么 |
| 4:12:33 | 版本控制要解决的问题与核心概念 |
| 4:13:57 | 仓库、暂存、提交、推送、拉取、克隆 |
| 4:15:29 | 检查与安装 Git |
| 4:16:52 | 最小工作流：init → add → commit → push |
| 4:18:50 | 创建 GitHub 账号与配置身份 |
| 4:20:30 | 认证：GitHub CLI 与 SSH |
| 4:22:40 | 克隆别人的仓库 |
| 4:28:20 | 创建仓库与 `.gitignore` |
| 4:32:37 | 把本地项目推到 GitHub（完整命令） |
| 4:36:36 | 日常循环：status → add → commit → push |
| 4:38:08 | VS Code 图形界面操作 |

## 没有版本控制时会发生什么

课程先复现了一个所有人都经历过的场景：代码改坏了，于是复制一份备份，命名为 `final.py`；再改坏，就有了 `final_v2.py`、`final_actually_final.py`。文件名越来越长，却没人记得哪一版能用。

Git 解决的就是这件事。它给代码拍快照，每次快照记录**改了什么、谁改的、什么时候改的、为什么改**。比如周一按原价计算，周二客户要求加 25% 加价，周三又要求回到 20%——有 Git 时，回到周一的版本只是一次切换。

改动一个数字当然可以手动改回来；但一个大项目突然跑不通时，「回到上一个能跑的版本」就变成了救命功能。

## 六个词，先记住

- **仓库（repository）**：被 Git 跟踪的项目。
- **暂存（staging）**：挑选这次要保存的改动，像装箱前先挑货。
- **提交（commit）**：真正拍下快照，并附一句说明。
- **推送（push）**：把提交上传到 GitHub。
- **拉取（pull）**：把别人推送的改动下载回来。
- **克隆（clone）**：把 GitHub 上的仓库整个下载到本地。

课程的说法很直白：Git 的词汇听起来专业，本质就是保存文件、上传、下载，只是每一步都有自己的名字。

另外要分清 Git 和 GitHub：**Git 是装在你电脑上的版本控制工具，GitHub 是托管仓库的网站**。不用 GitHub 也能用 Git，但没有 GitHub 就很难分享与协作。

## 安装与配置

先检查是否已经安装：

```bash
git --version
```

有版本号就跳过安装。Windows 从 git-scm.com 下载安装包；macOS 可以用 Homebrew 装，也可以让系统在首次运行时安装 Xcode Command Line Tools。

装好后设置身份（只需一次）：

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

这两项会写进每一次提交，别人看历史时能看到是谁改的。名字和邮箱建议与 GitHub 账号一致。

## 认证：让本地能推送到 GitHub

本地 Git 需要知道「你是 GitHub 上的哪个账号」。课程推荐用 GitHub CLI，因为它把认证流程包成了几条命令。

macOS 用 `brew install gh`，Windows 从 cli.github.com 下载安装包。然后：

```bash
gh auth login
```

按提示选择 `GitHub.com`、协议（推荐 SSH），在浏览器里完成授权，把终端显示的一次性代码贴进去即可。这一步只需要做一次。

另外两种方式是 HTTPS token 与 SSH key，也能用，但配置步骤更多。课程的建议是先把 CLI 跑通。

## 克隆别人的仓库

看到想跑的示例代码时，先进入准备存放项目的文件夹，然后：

```bash
git clone https://github.com/openai/openai-quickstart-python.git
```

终端里可以在目标文件夹右键选择「新建终端」，省去 `cd` 的麻烦。克隆完成后，整个仓库连同提交历史都在本地。

想在 VS Code 里直接打开这个项目，可以用 `code` 命令：

```bash
code .
```

第一次使用前需要在命令面板（`Ctrl+Shift+P` / `Cmd+Shift+P`）里执行一次 `Shell Command: Install 'code' command in PATH`。

## `.gitignore`：有些文件不该进仓库

把项目推到 GitHub 之前，必须排除不该上传的文件。最典型的是虚拟环境：课程里那个 `.venv` 有 270 MB，里面是一整套 Python 解释器和依赖，传上去既慢又没意义——别人用 `requirements.txt` 或 `pyproject.toml` 就能重建。

在项目根目录新建 `.gitignore`：

```text
.venv/
__pycache__/
.env
.DS_Store
*.pyc
```

规则是：**环境、缓存、密钥、系统文件一律不跟踪**。`.env` 一定要在里面，否则密钥会被推上 GitHub。

## 把本地项目推到 GitHub

先在 GitHub 网页上点「New repository」，填名字、选可见性。课程特别提醒：**默认选 private**，只有确实要公开时才选 public；需要协作时可以在 private 仓库里邀请成员。

然后在项目目录里依次执行：

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

逐条解释：

- `git init` 在当前目录创建仓库，生成隐藏的 `.git/` 文件夹，所有历史都存在里面。
- `git add .` 把当前所有改动放进暂存区；`.` 表示全部。不想全部提交时才逐个指定文件。
- `git commit -m "..."` 拍下快照并写说明。
- `git branch -M main` 把默认分支改名为 `main`，这是现在的通用约定。
- `git remote add origin <url>` 把本地仓库与 GitHub 上的仓库关联起来，`origin` 是远程的默认名字。
- `git push -u origin main` 推送，并用 `-u` 记住这条默认路径，以后直接 `git push` 即可。

第一次操作步骤很多，但其中 80%–90% 是一次性的。装好、认证好、关联好之后，日常只剩下四步。

## 日常循环

```bash
git status
git add .
git commit -m "add grand total to report"
git push
```

`git status` 先看有哪些改动（未跟踪、已修改、已暂存），再决定提交什么。提交之后在 GitHub 上能看到这次改动具体修改了哪些行，「改坏了就回退」的能力就是从这里来的。

## VS Code 图形界面

课程自己日常使用的是 VS Code 的源代码管理面板：

- 左侧图标显示改动数量；
- 输入提交信息，点「提交」等价于 `git commit -m`；
- 点「提交并推送」（Commit & Push）一步完成提交与上传；
- 第一次推送时如果没有远程，界面会提示「发布分支」（Publish Branch），按向导选择 public/private 即可创建仓库并关联。

还有一个便利：在一个空文件夹里初始化仓库、写一个 README、点提交并推送，VS Code 会引导你创建对应的 GitHub 仓库，不用先去网页操作。

安装 GitHub Copilot 后，提交信息还可以让 AI 根据改动自动生成——课程坦言「写提交信息大概是开发者最难的事情之一」。

## 本章结论

- Git 给代码拍快照；GitHub 托管这些快照并与他人协作。
- 六个核心词：仓库、暂存、提交、推送、拉取、克隆。
- 一次性配置：安装、`user.name`/`user.email`、`gh auth login`。
- 推送到 GitHub 的五条命令：`init`、`add`、`commit`、`branch -M main`、`remote add` + `push -u`。
- 日常只需 `status → add → commit → push`，或用 VS Code 面板点两下。
- `.gitignore` 必须排除虚拟环境、缓存与 `.env`。
- 仓库默认设为 private，需要分享时再单独处理。

## 理解检验

**1. Git 和 GitHub 有什么区别？只用其中一个可以吗？**

参考答案：Git 是本地运行的版本控制程序，负责记录提交、管理分支与历史；GitHub 是托管 Git 仓库的在线服务，负责备份、分享与协作。只用 Git 完全可以：所有提交都存在本机，可以在本地回退、分支、合并，但换电脑或与别人协作时没有统一的远程副本。只用 GitHub 则不行，因为推送与拉取都要通过本地 Git 完成。

**2. `git add` 和 `git commit` 各自做了什么？为什么需要两步？**

参考答案：`git add` 把选中的改动放进暂存区，决定「这次提交包含哪些文件、哪些改动」；`git commit` 把暂存区的内容固化成一次快照，并记录提交信息、作者与时间。分两步是为了能精确控制提交内容：例如你同时改了三个文件，但只想提交其中两个相关的改动，就先 `add` 那两个再 `commit`，历史会更清晰。`git add .` 是「全部加入」的快捷方式。

**3. 为什么 `.venv/` 和 `.env` 必须写进 `.gitignore`？**

参考答案：`.venv/` 是虚拟环境，里面有几十到几百 MB 的解释器与依赖副本，而且换一台机器、换一个 Python 版本就无法复用；这些依赖应当通过 `requirements.txt` 或 `pyproject.toml` 重建，而不是存进仓库。`.env` 保存 API key、数据库密码等密钥，一旦推送到 GitHub，尤其是公开仓库，任何能看到仓库的人都能拿到，可能造成数据泄露或费用损失。把 `.env` 加入 `.gitignore`，密钥就只留在本地。

**4. `git push -u origin main` 里的 `-u` 有什么用？**

参考答案：`-u`（`--set-upstream`）把本地 `main` 分支与远程 `origin/main` 关联起来，并把这个关联记下来。之后在 `main` 分支上直接执行 `git push` 或 `git pull`，Git 就知道该和哪个远程分支同步，不需要每次写全 `origin main`。第一次推送时设置一次即可。

**5. 你在本地提交了几次，但忘了先 `git remote add origin`。现在执行 `git push` 会怎样？应该怎么补救？**

参考答案：会提示没有配置远程仓库（类似 `fatal: No configured push destination`）。已经提交的历史不会丢失。补上远程地址后再推送即可：

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

如果推送时提示远程已有内容（例如创建仓库时勾选了 README），需要先 `git pull --rebase origin main` 把远程的提交合并进来，再推送。

**6. 你在周一提交了一个版本，周三把代码改坏了。怎样回到周一的状态？回到之后，改坏的那次提交还在吗？**

参考答案：可以用 `git log` 找到周一的提交哈希，再执行 `git checkout <hash>` 查看当时的代码，或者用 `git revert` 生成一个反向提交来撤销改动。如果只是想让工作区回到某次提交的状态而不改写历史，`git checkout <hash> -- .` 或 `git restore` 都可以。改坏的那次提交**仍然在历史里**：Git 的提交不会被普通操作删除，这正是不用再复制 `final_v2.py` 的原因——任何时候都能找回。只有 `git reset --hard` 这类会移动分支指针的操作才会让提交从当前历史中「消失」，但对象仍会在本地保留一段时间。

## 与前后章的关系

上一章用类把代码组织起来，这一章给代码加上版本与远程备份。下一章处理项目的另外两件「日常装备」：用 `.env` 把密钥从代码里分离出来，用 Ruff 统一代码风格，再用 uv 替代 pip 管理依赖。三章合起来，构成一个可以直接拿去交付的项目骨架。
