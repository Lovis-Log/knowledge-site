---
slug: 01-setup-and-tooling
title: "Setting Up: Python, VS Code and Virtual Environments"
summary: "Chapter 1 of the long-form course: install Python and VS Code, configure extensions and the interpreter, create a project and workspace, isolate dependencies with venv, and run code in the Jupyter interactive window."
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

## What this chapter covers

This is the first chapter of a single 5-hour-15-minute video, covering 0:00–52:07. The course ships without chapters, so this note is one of nine thematic divisions. The chapter does exactly one thing: it builds a Python working environment you can keep using.

The reasoning is direct. Getting an AI to write a snippet of Python is easy now; knowing where the code lives, which interpreter runs it, where dependencies are installed and how to reproduce a project is the hard part. Most tutorials install Python and jump straight into isolated examples, and learners cannot start a project on their own afterwards. So the chapter deliberately covers the whole toolchain: install Python, install VS Code, configure extensions, create a project and a workspace, create a virtual environment, install the first package, and run code in the interactive window.

## Timeline

| Time | Topic |
| --- | --- |
| 0:00 | Positioning: the full path toward AI applications |
| 1:43 | Course structure and study advice (handbook, speed, chapters) |
| 4:13 | Installing Python on Windows — check Add Python to PATH |
| 5:12 | Checking and installing Python on macOS |
| 7:07 | Installing VS Code |
| 8:56 | Installing the Python, Pylance and Jupyter extensions |
| 10:52 | Setting: execute Python in the file's directory |
| 13:56 | Creating the project folder and naming convention |
| 16:01 | Saving the folder as a VS Code workspace |
| 18:22 | Creating hello.py and the first print |
| 20:15 | Selecting the Python interpreter |
| 21:19 | Running the script: play button, shortcut, underlying command |
| 28:01 | Adjusting explorer tree indentation |
| 31:25 | Why virtual environments exist |
| 34:05 | Creating a venv from the command palette; 37:04 from the terminal |
| 38:55 | Installing requests with pip and importing it |
| 44:35 | Installing ipykernel and enabling the Jupyter interactive window |
| 49:51 | Chapter exercise: stand up a project from scratch |

## Why the environment comes first

One claim is worth keeping: **writing the code is not the hard part; the environment is**. When a project will not run, it is rarely a missing syntax feature. It is the wrong interpreter, dependencies installed elsewhere, or no idea which directory the command runs in.

Once the environment is right, everything in later chapters matches the instructor's screen: the same file layout, the same interpreter, the same terminal behaviour. That is why this chapter should not be skipped.

## Installing Python

**Windows.** Go to python.org/downloads, download, run the installer. One option is mandatory: **Add Python to PATH**. Without it, `python` is not available in a terminal. Leave everything else at defaults.

**macOS.** Check first. Open Terminal (Spotlight → Terminal) and run:

```bash
python3 --version
```

A version such as `Python 3.13.5` means it is already installed; "command not found" means you need python.org/downloads.

```bash
# Verify after installing
python3 --version
# Python 3.13.5
```

On Windows the command is:

```bash
python --version
```

## Installing VS Code and extensions

VS Code is free, cross-platform and has a large extension ecosystem. The instructor notes that AI editors such as Cursor are built on top of VS Code, so this setup transfers to them unchanged.

Install three extensions from the Extensions panel:

| Extension | Purpose |
| --- | --- |
| Python (Microsoft) | Language support, running and debugging |
| Pylance | Type hints, completion, static checks |
| Jupyter | Provides the interactive window used later |

Then change two settings:

- `Python › Terminal: Execute In File Dir`: enable. Scripts run with the file's directory as the working directory instead of the workspace root. This removes a lot of confusion with relative paths later.
- `Explorer › Tree: Indent`: default 8; the instructor uses 20 for easier reading of deeper trees.

Themes are cosmetic and optional.

## Projects, workspaces and the first script

### Folder convention

Create one master folder for all Python projects, for example `PythonProjects`, then one subfolder per project. **Project folders use lowercase words joined by hyphens (kebab-case)**, such as `python-for-ai`. GitHub repository names follow the same convention, so nothing has to be renamed later.

### Workspace

After opening the project folder, use File → Save Workspace As. This writes a `.code-workspace` file into the folder. It is a bookmark: double-clicking it restores the whole project state — open files, layout and the selected interpreter. Without a workspace, every editor restart means reopening the folder and resetting things.

### hello.py

Create `hello.py`. **The extension determines the language**: `.py` makes VS Code treat the file as Python and enables highlighting. The name itself is arbitrary.

```python
print("Hello world!")
print("I am learning AI")
```

Python executes top to bottom, left to right, so both lines print in order.

### Selecting the interpreter

The bottom-right corner shows the current interpreter, e.g. `3.13.5`. Click it to switch. This step matters: a machine may hold several Pythons (system, Homebrew, venv), and picking the wrong one runs the wrong environment.

### Running

Three equivalent ways:

1. The play button in the top-right corner;
2. `Ctrl+F5` by default (`Cmd+F5` on macOS), rebindable to `Ctrl/Cmd+Enter`;
3. A command typed in the terminal.

Behind the play button is an ordinary terminal command, roughly:

```bash
cd "project-directory"
"/absolute/path/to/python" "project-directory/hello.py"
```

So the button is not magic; it assembles the paths for you. Understanding this removes the fear of running someone else's project from a terminal.

The integrated terminal (`Ctrl/Cmd+J` toggles it) is the system terminal, so `pip` and `python` work there directly.

## Virtual environments: the key concept

### The problem

Real work involves several projects at once. Suppose project A needs version 1.0 of a package and project B needs 2.0. With one global Python, upgrading for B to 2.0 breaks A at the same moment — and the failure shows up in a project you did not touch, which makes it hard to diagnose.

### The solution

A **virtual environment** is a private Python copy for one project: interpreter and dependencies live in a folder inside the project, isolated from other projects. Deleting the project deletes the folder, leaving the system Python untouched.

Two equivalent ways to create one.

**Option 1: command palette (recommended for beginners).**

1. `Ctrl/Cmd+Shift+P`;
2. type `Python: Create Environment`;
3. choose `Venv`;
4. choose a base interpreter (usually the newest);
5. VS Code creates `.venv` in the project and selects it for the workspace.

**Option 2: terminal.**

```bash
python -m venv .venv
```

Afterwards, reselect the interpreter in VS Code so it points into `.venv`.

### Verifying and the usual trap

A new terminal inside VS Code shows `(.venv)` in the prompt when the environment is active. **Check this before installing anything**, otherwise packages go into the global environment and the project cannot import them.

```bash
# prompt should read (.venv) ...
python -c "import sys; print(sys.executable)"
# should point inside project/.venv/
```

The classic mistake: install packages first, create the venv afterwards. The old terminal still points at the global environment. Close it and open a new one.

## pip: the first package

`pip` downloads packages from PyPI into the active environment.

```bash
pip install requests
```

The files land in `.venv/Lib/site-packages/requests/` on Windows, or `.venv/lib/python3.x/site-packages/` on macOS. They are just Python files written by someone else; you rarely open them, but knowing where they live helps.

Import at the top of a file:

```python
import requests

response = requests.get("https://example.com")
print(response.status_code)
# 200
```

If the editor still underlines the import, first confirm the interpreter. If it is correct, restarting VS Code usually clears it — that is a language-server cache issue, not a failed install.

## The Jupyter interactive window

The instructor calls this a workflow changer. It solves terminal noise: a whole script runs at once, all output is mixed together, and inspecting a variable means adding a `print`.

Setup:

```bash
pip install ipykernel
```

Then enable `Jupyter: Interactive Window: Text Editor Execution Selection` in Settings. Afterwards:

- `Shift+Enter` sends the current line or selection to the interactive window on the right;
- code can run line by line or block by block, with intermediate variables visible;
- output is separated from code.

```python
import requests

response = requests.get("https://example.com")
response.status_code
# 200
```

The interactive window keeps state in memory: variables exist only in the session, and closing it means starting over. That helps debugging but can also hide problems — on a `NameError`, first check whether the definition actually ran in this session.

## Takeaways

- Install Python (Add to PATH on Windows), then VS Code plus the Python, Pylance and Jupyter extensions.
- Use kebab-case project folders; save the opened folder as `.code-workspace`.
- Give every project a `.venv`; confirm `(.venv)` in the prompt before installing.
- `pip install` adds packages, `import` uses them; `ModuleNotFoundError` usually means the wrong interpreter or environment.
- The play button simply assembles a `python <file>` command.
- Use the interactive window for exploration and the terminal for full runs.

## Check your understanding

**1. Project A needs version 1.0 of a package and project B needs 2.0. What happens with one global Python, and how does a virtual environment prevent it?**

Reference answer: A global environment has a single `site-packages`, so only one version of a package can exist. Installing 2.0 for B overwrites 1.0, and A may break on its next run because of API changes — in a project you did not touch, which makes diagnosis hard. A virtual environment gives each project its own interpreter copy and `site-packages`: A's `.venv` holds 1.0, B's holds 2.0, and each `import` resolves inside its own directory.

**2. What is the difference between the play button and running `python hello.py` in a terminal?**

Reference answer: There is no essential difference. The button runs an equivalent command: change to the project directory, then execute the file's absolute path with the interpreter recorded for the workspace. Two differences remain: the button uses the interpreter VS Code has selected (possibly inside `.venv`), while `python` in a terminal depends on PATH and whether a venv is active; and the button handles paths and working directory for you. Once that is clear, running someone else's project manually is just "pick the right interpreter and give the right path".

**3. After `pip install requests`, `import requests` still raises ModuleNotFoundError. What is the most likely cause, and how do you check?**

Reference answer: Install and run are in different environments — the terminal was not inside `.venv` when the package was installed, so it went into the global Python, or VS Code's interpreter is not the `.venv` one. Check in order: (1) does the prompt show `(.venv)`; (2) run `python -c "import sys; print(sys.executable)"` and compare with the interpreter shown in the VS Code status bar; (3) if the environment was just created, close the old terminal and open a new one; (4) if all match, restart VS Code to clear the language-server cache.

**4. How does the `.venv` folder relate to the system Python, and what happens if you delete it?**

Reference answer: `.venv` is a project-private environment holding a Python that points at (or is copied from) a base interpreter, plus its own `site-packages`. It is created with `python -m venv .venv`, and anything installed afterwards goes only into that folder. Deleting it leaves the system Python and other projects untouched; the cost is losing the project's installed dependencies, which must be recreated and reinstalled from `requirements.txt`.

**5. When should you use the interactive window, and when should you run the whole script in a terminal?**

Reference answer: The interactive window suits exploration and debugging: line-by-line execution, visible intermediate variables, output separated from code — the fastest feedback for data work and API calls. A terminal run suits final verification: it mimics real execution, starting from fresh memory and running the file once in order, which exposes problems such as relying on variables left over from an earlier session. A common workflow is to get the logic working interactively, then confirm reproducibility with a full terminal run.

## How it connects

This chapter produces a reusable workbench: interpreter, project layout, virtual environment and interactive window. The next chapter moves into the language itself — syntax rules, variables, data types and operators — followed by control flow and data structures, then functions and scope. All later code assumes it runs inside `.venv`, so the conventions set here stay in force.
