---
slug: 05-packages-apis-data
title: "Third-Party Packages, APIs and Data"
summary: "Chapter 5 of the long-form course: install and pin dependencies with pip, reproduce environments from requirements.txt, call a weather API with requests, parse nested JSON, and load a week of data into a pandas DataFrame."
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

## What this chapter covers

This is chapter 5 of the long-form video, covering 2:49:11–3:14:58. The previous chapter introduced `import`; this one puts it to work: install third-party packages, reproduce an environment with `requirements.txt`, call a real API, parse the JSON into a dictionary, and turn it into a table with pandas.

The instructor calls this the point where the code starts to feel like programming: once the basic blocks (variables, loops, functions) exist, a few dozen lines plus someone else's package can do what used to take hundreds. The API section matters most — an AI system essentially reads data from one system, processes it, and writes to another, and that step almost always happens through an API.

## Timeline

| Time | Topic |
| --- | --- |
| 2:49:11 | `pip install pandas`, importing with the `pd` alias |
| 2:50:04 | The two usual causes of `ModuleNotFoundError` |
| 2:50:58 | Installing a specific version (`==`) and downgrading |
| 2:52:11 | Installing several packages at once |
| 2:52:42 | `requirements.txt`: `pip install -r` and `pip freeze` |
| 2:54:59 | Installing dependencies when you receive someone's project |
| 2:56:07 | Finding packages; the naming-conflict trap |
| 2:56:53 | What an API is: how systems talk to each other |
| 2:58:14 | Calling a weather API with `requests.get` |
| 2:59:34 | Status 200; `response.json()` |
| 3:01:30 | Walking nested dictionaries |
| 3:03:42 | Wrapping it in `get_weather(lat, lon)` |
| 3:06:29 | Seven days of data: `datetime` and `timedelta` |
| 3:11:22 | Turning the result into a pandas DataFrame |
| 3:14:16 | Converting date strings into real dates |

## Installing and pinning dependencies

### Install and import

```bash
pip install pandas
```

```python
import pandas as pd
```

`as pd` is a community convention; nearly all pandas code uses it, and reading others' code assumes it.

### Two causes of ModuleNotFoundError

```python
from pydantic import BaseModel
# ModuleNotFoundError: No module named 'pydantic'
```

There are only two common causes:

1. the package is not installed;
2. it went into a different environment — most often the terminal was not inside `.venv`, so it landed in the global Python.

Check in this order: does the prompt show `(.venv)`; does the interpreter shown in the VS Code status bar point into `.venv`; if the environment was just created, close the old terminal and open a new one.

### Pinning a version

Older projects sometimes need a specific version, and a newer release changes the API:

```bash
pip install requests==2.31.0
```

`==` is an exact match; if a newer version is present, pip uninstalls it first.

Install several at once:

```bash
pip install pandas numpy matplotlib
```

### requirements.txt

One of the most common files in a Python project: it records dependencies and versions so anyone — including future you — can rebuild the environment with one command.

**Writing it by hand:**

```text
requests==2.32.3
pandas==2.2.3
matplotlib==3.9.2
```

```bash
pip install -r requirements.txt
```

**Exporting from an existing environment:**

```bash
pip freeze > requirements.txt
```

`pip freeze` lists every installed package with its exact version. It is more complete than handwriting and includes transitive dependencies, so the file can be long — that is normal.

**Receiving someone's project:**

1. open the project folder;
2. create a virtual environment (VS Code usually offers to);
3. when `requirements.txt` is open, VS Code asks whether to install dependencies;
4. environment and dependencies are installed in one step.

This matters because the code only runs as expected with matching versions; version drift produces errors in surprising places.

### Naming conflicts

```python
import datetime
datetime = "2025-01-01"   # overwrites the module name
datetime.now()            # AttributeError
```

`import` binds a name, and reassigning it overwrites that binding. Avoid variable names that collide with imported modules (`datetime`, `random`, `json`, ...).

## Calling an API

### What an API is

An API is an agreed interface between systems: you send a request to an address with parameters, and the other side returns data in an agreed format. The common operations in AI systems — pulling customers from a CRM, reading orders from a shop backend, posting to Slack, calling a language model — are all API calls.

The chapter uses a free weather API (Open-Meteo) that needs no key. The address looks like:

```text
https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m
```

### The first request

```python
import requests

latitude = 48.85
longitude = 2.35

url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m"

response = requests.get(url)
print(response.status_code)
# 200
```

`200` means success. Status codes follow HTTP: 2xx succeeds, 4xx means the request is wrong (bad parameters, no permission), 5xx means the server failed. The f-string that inserts latitude and longitude reuses the previous chapter's syntax.

### Parsing JSON

```python
data = response.json()
print(type(data))
# <class 'dict'>
```

`response.json()` turns the returned JSON text into a Python dictionary. Use the indexing from the previous chapter to walk it:

```python
print(data["current"]["temperature_2m"])
# 13.1
```

Read the nesting from the indentation: `data` is a dictionary, `current` is another dictionary inside it, and `temperature_2m` is a key of that inner dictionary. The wrong level raises `KeyError`; print `data.keys()` and descend one level at a time.

### Wrapping it in a function

Repeated logic belongs in a function with the location as a parameter:

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

print(get_weather(48.85, 2.35))   # Paris
print(get_weather(51.51, -0.13))  # London
print(get_weather(35.68, 139.69)) # Tokyo
```

This is the value of a function: callers pass coordinates and receive a temperature, while URL assembly and nested parsing stay hidden.

### The fixed request-and-parse pattern

Every API call reduces to the same flow:

1. build the URL and parameters from the documentation;
2. send the request (`GET` to read, `POST` to submit);
3. check the status code;
4. parse JSON into a dictionary;
5. extract the fields you need.

## Processing data with pandas

### Fetching a date range

```python
from datetime import datetime, timedelta

end_date = datetime.now().date()
start_date = end_date - timedelta(days=7)

print(start_date.isoformat())  # 2025-10-25
print(end_date.isoformat())    # 2025-11-01
```

`timedelta(days=7)` is an interval of seven days, and subtracting it from a date gives a week ago. The API wants `YYYY-MM-DD`, which `isoformat()` produces.

Put the dates into the request:

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

The `daily` value holds three equal-length lists: dates, daily maxima, daily minima.

### Building a DataFrame

A pandas DataFrame is best understood as "Excel inside Python":

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

Each key becomes a column, each list a column's values. Compared with nested dictionaries, a table is easier for humans to read and easier to filter, aggregate and plot.

### Converting the date column

In JSON every value is a string or a number, so a date is only a string. Converting it to a real date type is what enables sorting by time, grouping by period and correct plotting:

```python
df["date"] = pd.to_datetime(df["date"])
print(df.dtypes)
# date        datetime64[ns]
# max_temp           float64
# min_temp           float64
```

At this point the data is ready to plot (the next chapter continues).

## Takeaways

- `pip install` adds packages; `import ... as ...` binds them (pandas conventionally as `pd`).
- `ModuleNotFoundError` means either not installed or installed into the wrong environment — check `(.venv)` and the interpreter first.
- Pin versions with `==`; `requirements.txt` makes an environment reproducible, and `pip freeze` exports the current one.
- An API call is five fixed steps: build the URL, send, check status, parse JSON, extract fields.
- `response.json()` yields a dictionary; index it level by level.
- Wrap API logic in a function so callers only pass parameters.
- A pandas DataFrame turns those lists into a table; convert dates with `pd.to_datetime`.

## Check your understanding

**1. `pip install pydantic` succeeded, but the program still raises `No module named 'pydantic'`. Give two causes and how to check each.**

Reference answer: First, install and run use different environments — the terminal was not inside `.venv`, so the package went to the global Python. Check whether the prompt shows `(.venv)`, run `python -c "import sys; print(sys.executable)"` and compare it with the interpreter shown in the VS Code status bar. Second, the install itself failed (interrupted download, typo). Check with `pip show pydantic` or `pip list`. If both are fine, restart VS Code to refresh the language server.

**2. What problem does `requirements.txt` solve, and what do `pip install -r` and `pip freeze` each do?**

Reference answer: It pins a project's dependencies and versions so anyone — including you later — can rebuild an identical environment, avoiding "works on my machine". `pip install -r requirements.txt` reads the file and installs every listed package at the listed version; `pip freeze` prints everything installed in the current environment with exact versions, usually redirected into the file. The first installs from a list; the second inventories the environment.

**3. After the weather call, `data["current"]["temperature_2m"]` works but `data["temperature_2m"]` raises `KeyError`. Why?**

Reference answer: `response.json()` returns a top-level dictionary with keys such as `latitude`, `longitude` and `current`. The temperature is not at the top level; it lives inside the nested `current` dictionary. Indexing the top level with `"temperature_2m"` therefore fails. The correct path takes `data["current"]` first, then indexes the inner dictionary; when unsure, print `data.keys()` and descend one level at a time.

**4. Why wrap the call in `get_weather(latitude, longitude)` instead of copying those lines each time?**

Reference answer: After wrapping, callers pass coordinates and get a temperature; URL assembly, the request, the status code and the nested parsing live in one place. That gives three benefits: repeated calls cost one line; a change in the API's fields is fixed in one spot; and the function can be imported by other modules. It is also exactly what `return` was for — the function hands the temperature back so the caller can compare it or write it to a file.

**5. The `date` field in the JSON is already `"2025-10-25"`. Why call `pd.to_datetime`?**

Reference answer: As a string it can only be compared lexicographically; it cannot express intervals, and plotting libraries will not treat it as a time axis. Converting it to a datetime type enables sorting by time, aggregating by day or week, computing gaps, and drawing a continuous time axis. That is the difference between data that looks right and data that can be computed on.

## How it connects

This chapter connects the outside world to Python to a table: package management, APIs, JSON and pandas. The next chapter turns to engineering practice — project structure, file paths, splitting code into modules, and exception handling — shaping today's single-file scripts into maintainable projects. Later come classes and object-oriented design, then Git and the toolchain.
