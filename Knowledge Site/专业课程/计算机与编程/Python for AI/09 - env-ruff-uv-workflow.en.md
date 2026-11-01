---
slug: "09-env-ruff-uv-workflow"
title: "Secrets, Style and Dependencies: .env, Ruff and uv"
summary: "Move API keys out of code into environment variables and a .env file loaded by python-dotenv, let Ruff format, lint and sort imports, and use uv to create projects, add packages and rebuild environments."
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

## What this chapter covers

The final chapter is not about the language but about the tooling a real project needs. Three things: how to store API keys safely, how to keep code style consistent, and how to manage a project, its dependencies and its virtual environment with one command.

They belong together because they jointly decide whether someone else can run your project. This is chapter 9 of the long course, covering 4:44:33–5:15:15.

## Timeline

| Time | Topic |
| --- | --- |
| 4:44:33 | Why keys must never live in code |
| 4:46:00 | Environment variables and `os.environ.get` |
| 4:47:58 | The limit of `export`: only the current terminal session |
| 4:49:57 | The `.env` file and `python-dotenv` |
| 4:52:56 | How `load_dotenv` searches for the file |
| 4:55:45 | Ruff: formatting, linting, import sorting |
| 5:01:23 | uv: modern project and dependency management |
| 5:03:38 | `uv init`, `uv add`, `uv remove`, `uv sync` |
| 5:08:28 | The complete workflow and wrap-up |

## Why keys must not live in code

The lecture shows a very common pattern:

```python
API_KEY = "sk-proj-xxxxxxxxxxxxxxxx"
```

As soon as this file enters Git, anyone with access to the repository — colleagues, clients, visitors to a public repo — can take the key. For many services a single key is enough to read all customer data, send messages on the customer's behalf, or run up a real bill.

The rule: **code says where to fetch the secret; the secret itself lives outside the code**.

## Environment variables

Environment variables live in the operating system, not in the Python file. The standard library reads them:

```python
import os

api_key = os.environ.get("API_KEY")
database = os.environ.get("DATABASE_URL", "sqlite:///local.db")

print(api_key)
print(database)
```

If the variable is unset, `os.environ.get` returns `None`; the second argument supplies a default, so `database` falls back to the given string.

Setting one happens in the terminal:

```bash
export API_KEY="sk-proj-xxxxxxxx"
```

The lecture immediately points out the limitation: **export only affects the current terminal session**. Close the terminal or open a new window and the variable is gone, so the program reads `None` again. Re-exporting every time is tedious.

(In Windows PowerShell the equivalent is `$env:API_KEY = "sk-..."`, which is also limited to the current session.)

## The `.env` file

A more practical approach is to put the variables in `.env` at the project root:

```text
API_KEY=sk-proj-xxxxxxxx
DATABASE_URL=postgresql://localhost:5432/app
APP_ENV=development
```

and load them with `python-dotenv`:

```bash
pip install python-dotenv
```

```python
from dotenv import load_dotenv
import os

loaded = load_dotenv()      # True when the file was found
print("loaded:", loaded)

api_key = os.environ.get("API_KEY")
print(api_key)
```

`load_dotenv()` looks for `.env` in the current directory (sometimes also above it) and copies the key-value pairs into `os.environ`. Everything downstream reads them exactly like real environment variables.

If the file lives elsewhere, pass the path explicitly:

```python
load_dotenv(".env")            # current directory
load_dotenv("config/.env")     # subdirectory
load_dotenv("../.env")         # one level up
```

When the file is missing, `load_dotenv()` returns `False` instead of raising. That is the most common trap here: the program runs, the key is `None`, and the failure only appears later at the API call. Check the return value.

### Do not forget `.gitignore`

`.env` must be listed in `.gitignore`:

```text
.env
.venv/
__pycache__/
```

Otherwise `git add .` commits the key. A `.env.example` can go in the repository with variable names and placeholder values only, telling others what to configure without exposing anything.

## Ruff: formatting, linting, import sorting

Python has one syntax but many styles. PEP 8 defines the official conventions, and Ruff enforces them automatically.

Install the extension from the VS Code marketplace: search for Ruff and pick the one published by Astral.

Then enable format on save:

1. Open settings (`Ctrl+,`), search for `format on save`, tick it.
2. Search for `default formatter` and choose Ruff.

From then on, saving fixes spacing, blank lines, indentation, line length and the wrapping of lists and dictionaries. In the lecture's words, the first time you see it is delightful.

Ruff provides three capabilities:

- **Formatting**: uniform layout across the codebase.
- **Linting**: unused variables and imports, suspicious patterns — the yellow squiggles in the editor.
- **Import sorting**: groups and orders imports by standard library, third-party and local modules.

Auto-fixes run from the command palette: `Ctrl+Shift+P` → type `Ruff` → `Ruff: Fix all auto-fixable problems`. An unused `import os` disappears immediately.

The lecture stresses that this changes no behaviour; it only makes every file look like it was written by the same person. In teams, code review stops arguing about whitespace.

## uv: one tool for the whole job

The traditional flow requires three things: `pip install` for packages, `requirements.txt` for recording them, and `venv` for the environment. `pip freeze` also writes every transitive dependency, so the file grows long and messy.

uv replaces all of it:

```bash
uv --version
```

### Creating a project

```bash
uv init my_new_project
cd my_new_project
code .
```

The generated layout is roughly:

```text
my_new_project/
├─ .gitignore
├─ .python-version
├─ README.md
├─ main.py
└─ pyproject.toml
```

`pyproject.toml` is the modern project file, recording the name, Python version and dependencies. uv also creates a virtual environment, hidden in `.venv` so it stays out of the way.

### Adding and removing dependencies

```bash
uv add pandas numpy
```

One command does three things: installs into the virtual environment, records the dependencies in `pyproject.toml`, and updates the lock file. It is far faster than pip.

```bash
uv remove pandas
```

Removes the dependency and updates the configuration.

### Rebuilding the environment

When someone clones your repository without a virtual environment, they need only:

```bash
uv sync
```

uv reads `pyproject.toml` and the lock file and restores the environment exactly. That is what makes "it runs on another machine" true.

### The interactive window

To use VS Code's Jupyter interactive window, add the kernel:

```bash
uv add ipykernel
```

Then select the project's virtual environment as the interpreter, or the window reports that no kernel is available.

The lecture's daily rule is blunt: `uv add` to install, `uv remove` to uninstall, `uv sync` to rebuild. pip, `requirements.txt` and manual virtual environments can be forgotten entirely.

## The complete workflow

The lecture closes with a checklist worth walking through once:

1. `uv init` the project, open the folder in VS Code.
2. `uv add` the packages you need.
3. Write code; Ruff formats it on save.
4. `git init`, confirm `.gitignore` covers `.venv/` and `.env`.
5. Put secrets in `.env` and read them with `load_dotenv()`.
6. `git add`, `git commit`, `git push` to GitHub.
7. Anyone else runs `git clone` plus `uv sync` to restore the project.
8. Every day after that: edit, save, commit, push.

The lecture notes this is exactly the starting point their agency uses for client work; tutorials skip it because they build toy projects.

## Takeaways

- Never hardcode secrets; use environment variables or `.env`, and keep only the reading logic in code.
- `export` lasts only for the current terminal session; `.env` persists.
- `load_dotenv()` returns a boolean and does not raise when the file is missing — check it.
- `.env` must be in `.gitignore`; ship a `.env.example` to document the required variables.
- Ruff covers formatting, linting and import sorting; with format on save it becomes invisible.
- uv's `init` / `add` / `remove` / `sync` handle project creation, dependencies and environment restoration.
- The complete workflow fixes the four pillars — code, secrets, version, dependencies — leaving only everyday commits and pushes.

## Comprehension check

**1. Why does a variable set with `export API_KEY=...` disappear in a new terminal?**

Reference answer: `export` sets an environment variable for the current shell process and its children, so its lifetime is tied to that session. Closing the terminal ends the process and the variable with it; a new terminal is a new process that inherits only the system or user environment, not values exported in the previous session. To persist across sessions, use `.env` and load it from the program, or put a line in the shell startup file (`~/.zshrc`, `~/.bashrc`) — though that still is not the right place for project secrets.

**2. What happens when `load_dotenv()` returns `False`, and why is that dangerous?**

Reference answer: `False` only means the `.env` file was not found; the function raises nothing and execution continues. The danger is that later `os.environ.get("API_KEY")` returns `None`, and that `None` may travel all the way to the API call before failing, with an error message unrelated to the missing file. Check the return value, or fail fast:

```python
if not load_dotenv():
    raise RuntimeError(".env not found")
```

**3. `.env` is already in `.gitignore`. Why also ship a `.env.example`?**

Reference answer: `.gitignore` only keeps the secret out of the repository; it does not tell a person who clones it which environment variables the project expects, and the program will fail on missing configuration. `.env.example` lists every variable name with a placeholder (for example `API_KEY=your-key-here`), documenting the required setup without exposing a real key. A new teammate copies it to `.env` and fills in their own values.

**4. What is the difference between Ruff's "formatting" and "linting"?**

Reference answer: formatting only changes layout — spaces, blank lines, indentation, line length, wrapping — without changing meaning, so every file looks consistent. Linting analyses the code for potential problems such as unused imports, unused variables or suspicious comparisons; it can point at real bugs as well as style issues. Ruff provides both, plus import sorting, which groups standard-library, third-party and local imports and orders them.

**5. Compared with `pip install pandas`, what does `uv add pandas` do more or less?**

Reference answer: `pip install` only installs into the current environment and records nothing in the project; keeping a record needs a separate `pip freeze > requirements.txt`, and freeze writes every transitive dependency as well. `uv add pandas` installs into the project environment, records the direct dependency in `pyproject.toml`, and updates the lock file with exact versions — much faster too. The result is a clean declaration of what you asked for, and an environment that `uv sync` can rebuild exactly.

**6. A colleague cloned your project and got `ModuleNotFoundError: No module named 'pandas'`. What should they run, and why does it fix it?**

Reference answer: run `uv sync` in the project root. It reads `pyproject.toml` and the lock file, creates or updates `.venv`, and installs every declared dependency at the recorded version. The error appears because cloning brings only source files — the virtual environment is excluded by `.gitignore` — so nothing is installed locally. After syncing, they should also select the project's virtual environment as the interpreter in the editor, otherwise the runner may still use a different environment.

## How it connects

Chapter 6 turned scripts into a project, chapter 7 organized code with classes, chapter 8 added version history and a remote backup, and this chapter completes the set with secrets, style and dependencies. Together they form a project skeleton ready for delivery: clear structure, reusable code, history, safe secrets, and a one-command rebuild on another machine.

The next course layers AI on top of this skeleton — calling model APIs, building agents, connecting data sources. What you need then is not new syntax but the engineering habits established here.
