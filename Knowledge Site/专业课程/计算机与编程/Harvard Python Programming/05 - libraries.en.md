---
slug: "05-libraries"
title: "Libraries, Packages and APIs: Standing on Other People's Code"
summary: "CS50P week 4: import random and statistics, read command-line arguments through sys.argv with proper bounds checks, install third-party packages with pip, call the iTunes API with requests and parse JSON, and turn your own functions into a module protected by __main__."
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - "python"
  - "modules"
  - "packages"
  - "api"
  - "cs50"
sources:
  - kind: "video"
    title: "Harvard CS50’s Introduction to Programming with Python（第 5 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=17520s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: "2023-05-01"
---

## What this chapter covers

This is chapter 5 of the long video, covering CS50P week 4 (04:52:00–06:09:37), on **libraries**.

So far all code has lived in one file, using functions you wrote yourself or that Python provides (`print`, `input`, `int`). Real programs cannot build everything from scratch: random numbers, statistics, HTTP requests and JSON parsing have all been solved better than you would solve them.

The chapter moves outward: Python's own `random` and `statistics` first; then command-line arguments via `sys.argv`, so a program receives input at launch; then the third-party `cowsay` package installed with `pip`; then the iTunes API through `requests`, with the JSON response turned into a Python dictionary; and finally, in reverse, your own functions packaged as a module and guarded by `if __name__ == "__main__"`.

## Timeline

| Time | Topic |
| --- | --- |
| 4:52:00 | The week's theme: what libraries and modules are |
| 4:53:10 | Python's built-in `random` module |
| 4:54:52 | The `import` keyword |
| 4:55:09 | `random.choice`: flipping a coin |
| 4:59:27 | `from ... import ...` and name collisions |
| 5:02:36 | `random.randint`: a random integer in a range |
| 5:04:27 | `random.shuffle`: shuffling a list in place |
| 5:08:36 | `statistics.mean`: the average |
| 5:10:38 | Command-line arguments and `sys.argv` |
| 5:14:05 | Reading user input from `argv[1]` |
| 5:17:14 | `IndexError` and checking `len(argv)` |
| 5:24:44 | Moving error checks first and exiting with `sys.exit` |
| 5:30:21 | Supporting several names: iterating `argv` |
| 5:32:35 | Slicing `argv[1:]` to drop the program name |
| 5:36:31 | Third-party packages and PyPI |
| 5:38:27 | `pip install cowsay` |
| 5:45:00 | APIs and `requests` |
| 5:46:46 | The iTunes API and its JSON response |
| 5:57:23 | Pulling `trackName` out of the JSON dictionary |
| 6:02:20 | Writing your own module, `sayings.py` |
| 6:05:42 | The problem of `main()` running on import |
| 6:06:37 | `if __name__ == "__main__"` |

## Modules: code in a reusable file

A Python module is a file containing functions, variables or other definitions. `import random` tells Python to load everything in `random`.

```python
import random

coin = random.choice(["heads", "tails"])
print(coin)
```

`random.choice` picks one element from a list with equal probability. Running it a few times may produce several `heads` in a row; that is what probability looks like — only many trials approach 50/50.

### Two forms of import

```python
import random
coin = random.choice(["heads", "tails"])
```

```python
from random import choice
coin = choice(["heads", "tails"])
```

The second puts `choice` directly into the current namespace, so calls omit the module name.

Each has a trade-off:

- `import random` preserves the namespace, so you can define your own `choice` without conflict;
- `from random import choice` is shorter, but if something else is also called `choice`, one overwrites the other.

The lecture's guidance: in short programs either is fine; longer programs benefit from keeping the namespace.

### Two more common functions

```python
import random

number = random.randint(1, 10)     # 1 through 10, inclusive
cards = ["jack", "queen", "king"]
random.shuffle(cards)              # shuffles in place, returns nothing
```

`randint(a, b)` includes both ends. `shuffle` modifies the list it is given and returns `None`, so `cards = random.shuffle(cards)` is wrong.

### The statistics module

```python
import statistics

print(statistics.mean([100, 90]))   # 95
```

`mean` computes the average; `median` and `mode` are also available.

## Command-line arguments: input at launch

Until now, input arrived through `input()` while the program runs. Another route is to write arguments after the command when **starting the program**:

```bash
python name.py David
```

Python places the words from the command line into `sys.argv`, a list:

- `argv[0]` is the script name, `name.py`;
- `argv[1]` is the first argument, `David`;
- and so on.

```python
import sys

print("hello, my name is", sys.argv[1])
```

### Out of range, and checking

Running it without an argument gives:

```text
IndexError: list index out of range
```

`argv` contains only `argv[0]`, so `argv[1]` is out of range. You can catch it:

```python
import sys

try:
    print("hello, my name is", sys.argv[1])
except IndexError:
    print("Too few arguments")
```

Or check first and give a more specific message:

```python
import sys

if len(sys.argv) < 2:
    print("Too few arguments")
elif len(sys.argv) > 2:
    print("Too many arguments")
else:
    print("hello, my name is", sys.argv[1])
```

### Exiting early with sys.exit

The version above buries the normal logic inside `else`. A clearer structure checks for errors at the top and exits, letting the rest of the program assume everything is fine:

```python
import sys

if len(sys.argv) < 2:
    sys.exit("Too few arguments")
elif len(sys.argv) > 2:
    sys.exit("Too many arguments")

print("hello, my name is", sys.argv[1])
```

`sys.exit(message)` prints the message and ends the program immediately. The program would have exited at the end of the file anyway; this just exits **earlier**, freeing the code below from worrying about bad input.

`break` leaves a loop; `sys.exit` ends the whole program. They are not interchangeable.

### Supporting several names

```python
import sys

for arg in sys.argv:
    print("hello, my name is", arg)
```

This also prints the script name. Use a **slice** to drop the first element:

```python
for arg in sys.argv[1:]:
    print("hello, my name is", arg)
```

`argv[1:]` means "from index 1 to the end". The syntax is `[start:end]`, and either end may be omitted: `[1:]` omits the end, `[:2]` omits the start, `[-1]` takes the last element.

On the command line, quote a name containing spaces so it stays one argument:

```bash
python name.py "David Malan"
```

## Third-party packages: pip and PyPI

Beyond the standard library, a large ecosystem lives on PyPI (the Python Package Index). Install with `pip`:

```bash
pip install cowsay
```

Once installed it imports like a standard module:

```python
import cowsay
import sys

if len(sys.argv) == 2:
    cowsay.cow("hello, " + sys.argv[1])
```

`cowsay` wraps the string in ASCII art of a cow saying it. It has little practical use, but it demonstrates the full cycle: **find → install → import → call**.

> **Note:** third-party packages come from outside; confirm the source before installing. Production code usually isolates dependencies in a virtual environment, covered later.

## APIs: having your program ask someone else's server

An API (Application Programming Interface) is an interface through which programs talk to each other. Many services expose their data over HTTP; your code requests it and receives JSON.

The iTunes search endpoint looks like this:

```text
https://itunes.apple.com/search?entity=song&limit=1&term=weezer
```

Opening it in a browser downloads a text file structured as JSON:

```json
{
  "resultCount": 1,
  "results": [
    {
      "trackName": "Say It Ain't So",
      "artistName": "Weezer"
    }
  ]
}
```

JSON uses braces for objects, brackets for arrays and quotes for strings — almost identical to Python dictionaries and lists. It is not Python-specific; any language can read and write it.

### Requesting it with requests

```bash
pip install requests
```

```python
import json
import requests
import sys

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=1&term=" + sys.argv[1]
)
print(json.dumps(response.json(), indent=2))
```

`requests.get(url)` sends the request; `response.json()` parses the returned JSON into a Python dictionary; `json.dumps(..., indent=2)` re-renders it with indentation for easier reading.

### Extracting what you need

```python
import requests
import sys

if len(sys.argv) != 2:
    sys.exit()

response = requests.get(
    "https://itunes.apple.com/search?entity=song&limit=10&term=" + sys.argv[1]
)

o = response.json()
for result in o["results"]:
    print(result["trackName"])
```

`o["results"]` is a list of dictionaries, and `result["trackName"]` retrieves a song title. The key names are chosen by the service; `trackName` has a capital `N`, and a typo raises `KeyError`.

## Writing your own module

Put frequently reused functions into a file and it becomes a module.

`sayings.py`:

```python
def main():
    hello("world")
    goodbye("world")


def hello(name):
    print(f"hello, {name}")


def goodbye(name):
    print(f"goodbye, {name}")


main()
```

Import it from another file:

```python
import sys
from sayings import hello

if len(sys.argv) == 2:
    hello(sys.argv[1])
```

Running `python say.py David` prints:

```text
hello, world
goodbye, world
hello, David
```

The first two lines come from importing `sayings`: `import` **executes the whole file**, including the unconditional `main()` at the bottom.

### Guarding the entry point with __main__

```python
def main():
    hello("world")
    goodbye("world")


def hello(name):
    print(f"hello, {name}")


def goodbye(name):
    print(f"goodbye, {name}")


if __name__ == "__main__":
    main()
```

`__name__` is set automatically by Python:

- when the file is run directly, its value is `"__main__"`;
- when the file is imported, its value is the module name, `"sayings"`.

So the condition means: **call `main()` only when this file is run directly, not when it is imported.**

With the guard in place, `say.py` prints only `hello, David`.

> **Takeaway:** any module that others may import should never call `main()` unconditionally at the top level.

## Chapter summary

- A module is a file containing functions and variables; `import` loads it.
- `import random` keeps the namespace; `from random import choice` brings the name in directly, each with trade-offs.
- `random.choice` picks uniformly, `randint(a, b)` includes both ends, `shuffle` rearranges in place.
- `sys.argv` is the list of command-line arguments, with `argv[0]` the script name.
- Check `len(argv)` before indexing, or you get `IndexError`.
- `sys.exit(message)` ends the program early, which is clearer than burying normal logic in `else`.
- Slicing `argv[1:]` drops the script name; `[start:end]` may omit either end.
- `pip install` adds third-party packages from PyPI; check that the source is trustworthy.
- `requests.get` calls an API and `response.json()` returns a dictionary.
- `json.dumps(..., indent=2)` pretty-prints the structure.
- Guard your own modules with `if __name__ == "__main__":`.

## Comprehension check

**1. What is the difference between `import random` and `from random import choice`, and when is each preferable?**

Reference answer: `import random` brings only the module name into the namespace, so calls must be written `random.choice(...)`; `from random import choice` brings the function itself in, so `choice(...)` suffices.

The first avoids name collisions: you can keep your own variable named `choice` without shadowing the module's function. The second is shorter, but if the current file also defines `choice`, one definition overwrites the other. Short scripts can use either; longer programs and library code generally keep the module prefix.

**2. Why can you not write `cards = random.shuffle(cards)`?**

Reference answer: `shuffle` rearranges the list **in place** and returns `None`. Writing `cards = random.shuffle(cards)` rebinds `cards` to `None`; the list has been shuffled, but the variable no longer points to it, and a later `cards[0]` raises `TypeError`. The correct form is a bare call:

```python
random.shuffle(cards)
```

**3. What is the first element of `sys.argv`? Why does `argv[1]` fail when the program runs with no arguments?**

Reference answer: `sys.argv[0]` is the script filename, such as `name.py`. With no arguments the list has length 1, so index 1 is out of range and Python raises `IndexError: list index out of range`. Check `len(sys.argv)` first, or catch `IndexError` with `try` / `except`.

**4. What does the following print when run as `python name.py David Malan`? Why?**

```python
import sys

for arg in sys.argv[1:]:
    print("hello, my name is", arg)
```

Reference answer:

```text
hello, my name is David
hello, my name is Malan
```

`sys.argv` is `["name.py", "David", "Malan"]`; the slice `[1:]` drops the script name and yields `["David", "Malan"]`. The loop prints one line per element. To treat the full name as one argument, quote it on the command line: `python name.py "David Malan"`, which makes `argv` equal to `["name.py", "David Malan"]` and prints a single line.

**5. What is the difference between `sys.exit` and `break`?**

Reference answer: `break` exits only the current loop; code after the loop still runs. `sys.exit` terminates the entire program immediately, so nothing after it executes. The first ends a loop, the second ends the program; they are not interchangeable.

**6. Why do `hello, world` and `goodbye, world` print when importing `sayings`, and how do you prevent it?**

Reference answer: `import sayings` makes Python execute `sayings.py` from top to bottom, including the unconditional `main()` at the end.

Guard the call:

```python
if __name__ == "__main__":
    main()
```

When `sayings.py` is run directly, `__name__` is `"__main__"` and `main()` runs. When it is imported, `__name__` is `"sayings"`, the condition fails, `main()` is skipped and only the function definitions are imported.

**7. What type does `response.json()` return, and why does `o["results"][0]["trackName"]` work?**

Reference answer: `response.json()` parses the JSON text into a Python dictionary when the top level is an object. The `"results"` key maps to a list, whose first element is another dictionary containing `"trackName"`. Indexing therefore proceeds dictionary → list → dictionary. The key names are defined by the service and must match exactly; a case difference raises `KeyError`.

## Relation to neighbouring chapters

Libraries turn "write it yourself" into "reuse what exists", which is the precondition for programs to grow. The next chapter covers unit testing and uses `pytest`, a third-party package, to check the functions written here. File I/O, regular expressions and object-oriented programming later are all organised as modules too.

`if __name__ == "__main__"` recurs in every remaining chapter as the standard entry point for a runnable script.
