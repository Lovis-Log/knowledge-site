---
slug: "06-project-structure-and-errors"
title: "From Script to Project: Structure, Paths, Files and Error Handling"
summary: "Turn scattered scripts into a project with data and output folders, learn how Python resolves relative paths against the working directory, read and write CSV, JSON and Excel with pandas, move functions into modules, and keep a program alive with try/except."
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

## What this chapter covers

The previous chapter showed how to call an API, process data with pandas and draw charts — but the code still lived in unrelated scripts. This chapter turns those pieces into a project: how to lay out folders, where Python looks for files, how to read and write several data formats, how to split code into reusable modules, and how to keep a program running when something fails.

This is chapter 6 of the long course, covering 3:14:58–3:45:49. The first few minutes finish the visualization example from the previous chapter before the "Practical Python" section begins.

## Timeline

| Time | Topic |
| --- | --- |
| 3:14:58 | Recap: pandas DataFrame and a matplotlib chart |
| 3:17:06 | Project structure: creating the `sales_analysis` project |
| 3:22:05 | Paths: `data/`, `output/` and the current working directory |
| 3:26:42 | Moving up directories, `..`, and VS Code's working-directory setting |
| 3:28:40 | File formats: CSV, JSON, XML, Parquet and pandas readers/writers |
| 3:34:15 | Organizing code: `helpers.py` and module imports |
| 3:39:48 | Error handling: kinds of errors and `try/except` |
| 3:45:24 | Transition to classes and object-oriented programming |

## Start from the finished pipeline

Before discussing structure, the lecture shows what a complete pipeline looks like: fetch weather data from an API, tidy it with pandas, plot it with matplotlib and save the image, then export the table as a CSV.

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

The `plt` alias is not required by the language; it is a community convention. Everyone writes it this way, so a reader immediately knows what it refers to. `savefig` writes the chart to a PNG that can be attached to an email.

Exporting the table takes one line:

```python
import os

os.makedirs("data", exist_ok=True)
df.to_csv("data/paris_weather.csv", index=False)
print("saved to data/paris_weather.csv")
```

As the course points out, this small script already exercises the core skills of a junior data analyst: connecting to a real API, handling dates, processing data with pandas, drawing a chart, working with files and folders, and saving results. A program that computes a weekly sales report, writes it to Excel and sends it out while nobody is watching is exactly what automation looks like.

## Project structure: a place for everything

A real project does not mix code and data in one folder. The lecture creates a `sales_analysis` project:

```text
sales_analysis/
├─ analyzer.py
├─ helpers.py
├─ data/
│  └─ sales.csv
└─ output/
```

The rules are simple:

- `data/` holds inputs, `output/` holds results; images can go in `figures/`.
- Keep the main script at the top level and add depth only when needed.
- Do not reference files from the desktop or from other projects; keep the project self-contained.
- Test as you go: run lines in the interactive window, then run the whole file. Both must work.

The last rule is easy to skip. Code that works in the interactive session but fails when the whole file runs usually has a working-directory problem — the subject of the next section.

## How Python finds files

The lecture runs an experiment inside `sales_analysis/analyzer.py`:

```python
import os

print("cwd:", os.getcwd())
print("exists:", os.path.exists("data/sales.csv"))
```

The output shows the working directory is `sales_analysis` and the file exists. Changing the path to `sales.csv` makes the check return `False`: the interpreter searches only the current working directory, and `sales.csv` actually sits inside `data/`.

This gives a mental model:

- **Which file you are editing does not matter; the current working directory does.**
- `data/sales.csv` means "enter `data` from the current directory, then take `sales.csv`".
- `../data/sales.csv` means "go up one level, then into `data`"; `..` can be stacked.
- Use `/` as the separator; Windows accepts it too.

There is one more trap: if the VS Code Python extension is not configured, a script may run with the project root as its working directory instead of the script's own folder. The lecture recommends pinning the execution path to the file's directory, otherwise every relative path is wrong.

## Reading and writing different formats

Real data comes in many shapes: CSV, JSON, XML, plain text, and Parquet for columnar storage. pandas provides readers and writers for the common ones:

```python
import pandas as pd

df = pd.read_csv("data/sales.csv")
print(df.shape)                       # (rows, columns)

df["total"] = df["quantity"] * df["price"]

df.to_csv("output/sales_with_totals.csv", index=False)
df.to_json("output/sales.json", orient="records", indent=2)
df.to_excel("output/sales.xlsx", index=False)
```

The column arithmetic feels like a spreadsheet: `df["quantity"] * df["price"]` multiplies row by row, and the result is stored in a new `total` column.

`to_excel` fails with `ModuleNotFoundError: No module named 'openpyxl'`. The code is fine; pandas delegates Excel handling to an optional engine. Install it:

```bash
pip install openpyxl
```

After that, one run produces CSV, JSON and XLSX files in `output/`. Save the script as a file and run it with the play button: it creates the folder and writes every output, which is exactly what a scheduled job needs.

The readers mirror the writers — `read_csv`, `read_json`, `read_excel` — each with many options for skipping rows, setting encodings and converting types.

## Moving functions into modules

Once `analyzer.py` grows past a few hundred lines it becomes hard to read. The fix is to move general-purpose logic into its own file:

```python
# helpers.py
def calculate_total(quantity, price):
    """Return quantity * price."""
    return quantity * price


def format_currency(amount):
    """Format a number as a dollar amount with two decimals."""
    return f"${amount:,.2f}"
```

Then import it in `analyzer.py`:

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

Points to note:

- A module is just a `.py` file. `from helpers import ...` looks up names **exactly as defined**; a typo raises `ImportError`.
- `helpers.py` must sit next to `analyzer.py` for Python to find it directly.
- Other analysis scripts can reuse the same functions; change one place and every caller updates.
- The triple-quoted string is a docstring, shown when hovering over the function in the editor.

This mirrors a common progression: one file → extract functions → split into files → organize with classes. The next chapter is the fourth step.

## Error handling: do not let one failure end everything

Errors come in two families. Some are self-inflicted: typos, a missing colon, wrong indentation (syntax errors), division by zero, undefined variables, mismatched types (runtime errors). Others come from outside: a user types `abc` where a number is expected, a file is deleted, an API goes offline or changes its interface.

Without protection, any error stops the script and everything after it never runs. Imagine a pipeline that pulls data from five systems and builds a report: if the first system fails, the other four never run.

`try/except` exists for this:

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("cannot divide by zero")

print("this line still runs")
```

The syntax resembles `if`: the risky code goes indented under `try:`, and the failure is handled in `except`. A `try` must have at least one `except` or `finally`, otherwise the editor reports an error.

Different exceptions can be handled separately:

```python
try:
    with open("data/sales.csv") as f:
        content = f.read()
except FileNotFoundError:
    print("data file is missing")
except ValueError:
    print("data has the wrong format")
```

You can also add `else` (runs when nothing failed) and `finally` (always runs, typically for closing connections or cleaning up):

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

The advice for beginners is direct: wrap the risky part in the simplest `try/except` first, rather than building five levels of exception classes on day one.

## Takeaways

- Give projects a structure: code at the top level, inputs in `data/`, results in `output/`; never mix them.
- Python resolves relative paths against the **current working directory**; `..` moves up; VS Code's working-directory setting changes the outcome.
- pandas unifies tabular I/O: `read_csv` / `to_csv`, `read_json` / `to_json`, `read_excel` / `to_excel`; Excel needs `openpyxl`.
- Move reusable functions into modules and import them with `from module import name`; names must match exactly.
- `try/except` lets a program continue after a local failure; `else` and `finally` cover the remaining cases.

## Comprehension check

**1. Why can the interactive window read `data/sales.csv` while running the whole file reports that it is missing?**

Reference answer: the **current working directory** can differ between the two. `os.path.exists("data/sales.csv")` is relative and is resolved against that directory. The interactive window usually starts in the project root, while a script launched by some run configurations may use another directory (VS Code's default, for instance). Diagnose by printing `os.getcwd()`, then write paths relative to that, or pin the run configuration to the script's directory. Absolute paths also work but cost portability.

**2. What is the difference between `../data/paris_weather.csv` and `data/paris_weather.csv`?**

Reference answer: the first goes up one directory and then into `data`; the second enters `data` from the current directory. If the script is `sales_analysis/analyzer.py`, then `data/paris_weather.csv` means `sales_analysis/data/paris_weather.csv`, while `../data/paris_weather.csv` means the `data` folder one level above the project. `..` can be repeated: `../../data/...` goes up two levels.

**3. `df.to_excel("output/sales.xlsx")` raises `ModuleNotFoundError`. Why, and how do you fix it?**

Reference answer: pandas does not implement the Excel file format itself; writing `.xlsx` requires the third-party engine `openpyxl`, which is an optional dependency and not installed by default. Run `pip install openpyxl` in the project's virtual environment and re-run. Make sure the terminal has the project's environment activated, otherwise the package lands somewhere else and the error persists.

**4. After moving `calculate_total` into `helpers.py`, what happens if `analyzer.py` writes `from helpers import calculate_totals`?**

Reference answer: Python raises `ImportError` (`cannot import name 'calculate_totals'`). `from module import name` looks objects up by **exact name**; one extra letter is a different name. There is no fuzzy matching and no "did you mean" suggestion. Use the precise name from the function definition.

**5. What is the difference between these two blocks, and when is the second one appropriate?**

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

Reference answer: the first catches everything and silently discards it. The program keeps running, but the cause is lost and a downstream step may receive `None` and fail later in a more confusing place. The second handles failures by type: a missing file falls back to an empty frame so the pipeline can continue; malformed data is reported and re-raised so the caller knows the run cannot be trusted. In real projects, catch specific exception types and either log or re-raise what you cannot handle, rather than swallowing everything with `pass`.

**6. A script pulls data from five systems and then builds a report. The first system's API is down. How do you keep the other four running?**

Reference answer: wrap each system call in its own `try/except` rather than putting one `try` around the whole pipeline:

```python
results = {}
for name, fetch in systems.items():
    try:
        results[name] = fetch()
    except Exception as exc:
        print(f"{name} failed: {exc}")
        results[name] = None
```

A failure then affects only its own system; the rest continue, and the `None` entries in `results` tell you whether the report is complete. With a single `try` around all five steps, an exception in the first jumps straight to `except` and the remaining four never run.

## How it connects

The previous chapter covered single building blocks: calling an API, processing data, drawing charts. This chapter assembles them into a project and stops a local failure from taking down the whole run. The next chapter introduces classes, which bundle data together with the functions that operate on it — the next level of modularity. The last two chapters turn to everyday tools: Git for version control, `.env` for secrets, and Ruff and uv for style and dependencies.
