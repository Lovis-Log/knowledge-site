---
slug: 06-unit-tests
title: "Unit Tests: From assert to pytest"
summary: "Hand-written if/print tests give way to assert and try/except, and finally to pytest taking over the boilerplate. Through calculator.py and hello.py, the chapter shows how to test return values, test exceptions, and why testability pushes functions away from side effects."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, unit-tests, pytest, testing, assert]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 6 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=22177s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

This is chapter 6 of the long single video (about 16 hours), corresponding to CS50P lecture 5, "Unit Tests", covering 6:09:37–7:00:32. The previous chapters wrote code and tested it by hand; this one turns testing itself into code and brings in pytest to automate it.

## Why tests should be code

Manual testing looks like this: run the program, type `2`, see `4`; run it again, type `3`, see `9`. The problem is not whether those two answers were right. It is three other things:

1. Every code change demands another manual run, so people skip it;
2. Nobody else knows what you tested;
3. You only test inputs you happen to think of, and the corners you never imagined stay untested.

Once tests are code, they can be rerun with one command, handed to CI, and used to tell you immediately when a change breaks existing behaviour.

## Timeline

| Time | Topic |
| --- | --- |
| 6:09:37 | Motivation: write your own tests |
| 6:10:29 | Back to `calculator.py`, reviewing `square` and `main` |
| 6:12:31 | Adding `if __name__ == "__main__":` so the file can be imported |
| 6:13:27 | Creating `test_calculator.py` with hand-written `if ... print` tests |
| 6:19:16 | Switching to `assert`: half the code, unfriendly errors |
| 6:22:13 | Catching `AssertionError` with `try/except` to restore readable output |
| 6:24:34 | Adding `-2`, `-3`, `0`; exposing the lucky coincidence that $2+2=2\times2$ |
| 6:26:33 | pytest: installation, conventions, running it, reading its output |
| 6:37:49 | Splitting one test into `test_positive`, `test_negative`, `test_zero` |
| 6:46:01 | `with pytest.raises(...)` for testing exceptions |
| 6:47:52 | `hello.py`: why printing cannot be tested, and how returning fixes it |
| 6:57:03 | Putting tests in a `test/` folder with `__init__.py` |
| 6:59:21 | Conclusion: automated tests are what make collaboration possible |

## Starting point: a function that needs testing

The final version of `calculator.py`:

```python
def main():
    x = int(input("What's x? "))
    print("x squared is", square(x))

def square(n):
    return n * n

if __name__ == "__main__":
    main()
```

Manually, `2` gives `4` and `3` gives `9`, which looks fine. It only proves two inputs.

### Add the `__main__` guard first

```python
if __name__ == "__main__":
    main()
```

With this guard, `from calculator import square` does not also run `main()` and its input prompt. It is the standard way to let one file be both a program and a library.

## Hand-written tests: from if to assert

Create `test_calculator.py`:

```python
from calculator import square

def main():
    test_square()

def test_square():
    if square(2) != 4:
        print("2 squared was not 4")
    if square(3) != 9:
        print("3 squared was not 9")

if __name__ == "__main__":
    main()
```

This is already better than manual testing: the checks are fixed in code and can be rerun. But every check costs an `if` and a `print`.

### Compress with `assert`

```python
from calculator import square

def main():
    test_square()

def test_square():
    assert square(2) == 4
    assert square(3) == 9

if __name__ == "__main__":
    main()
```

`assert` states that the boolean expression is true. If it is, nothing happens; if it is false, Python raises `AssertionError` with the file and line number.

### Introduce a deliberate bug

Change `square` to `return n + n`:

```python
def square(n):
    return n + n
```

Run the tests: only the `3` check fails; `2` still passes because $2+2=2\times2=4$. The coincidence shows that **one input is not enough** — tests need representative and boundary values.

### Trade back for readable output with try/except

```python
def test_square():
    try:
        assert square(2) == 4
    except AssertionError:
        print("2 squared was not 4")
    try:
        assert square(3) == 9
    except AssertionError:
        print("3 squared was not 9")
```

`assert` raises exactly `AssertionError`, so the exception handling from earlier chapters can catch it. The price is length: more than thirty lines to test a two-line function.

## pytest: hand off the boilerplate

pytest is a third-party library, installed with `pip install pytest`. It takes over three jobs: running tests, catching assertion failures, and reporting results.

### Conventions

- files named `test_*.py`;
- functions named `test_*`;
- plain `assert` inside, with no `main` and no `try/except`.

```python
from calculator import square

def test_square():
    assert square(2) == 4
    assert square(3) == 9
    assert square(-2) == 4
    assert square(-3) == 9
    assert square(0) == 0
```

Run it:

```bash
pytest test_calculator.py
```

One character per test: `.` means pass, `F` means fail. After fixing the bug the output is `.....`, five passing assertions.

### Reading a failure

With the bug in place, pytest points at the failing line and prints the actual value:

```
assert 6 == 9
 +  where 6 = square(3)
```

It does not tell you "you typed plus instead of times"; it gives you the clue that `square(3)` returned `6`. Diagnosis is still your job.

### One test function per category

With five assertions in one `test_square`, the first failure stops the rest, leaving a single clue. Split them:

```python
def test_positive():
    assert square(2) == 4
    assert square(3) == 9

def test_negative():
    assert square(-2) == 4
    assert square(-3) == 9

def test_zero():
    assert square(0) == 0
```

pytest runs all three even if one fails. The summary "2 failed, 1 passed" says at once: `3` fails in positives, `-2` fails in negatives, `0` passes — the bug's range narrows immediately.

## Testing exceptions: `pytest.raises`

Sometimes the right behaviour is to raise, not to return. Pass a string to `square`:

```python
square("cat")
```

and you get `TypeError: can't multiply sequence by non-int of type 'str'`. To assert that:

```python
import pytest
from calculator import square

def test_str():
    with pytest.raises(TypeError):
        square("cat")
```

`with pytest.raises(TypeError):` means the block must raise `TypeError`, otherwise the test fails. Error behaviour becomes part of the specification.

## Second example: testing a function with side effects

`hello.py`:

```python
def main():
    name = input("What's your name? ")
    hello(name)

def hello(to="world"):
    print("hello,", to)

if __name__ == "__main__":
    main()
```

This test:

```python
from hello import hello

def test_hello():
    assert hello("David") == "hello, David"
```

always fails — not because the logic is wrong, but because `hello` has no return value. It calls `print` and returns `None`. Printing produces a side effect on the screen, not a value an assertion can compare.

### Refactor to return

```python
def hello(to="world"):
    return f"hello, {to}"

def main():
    name = input("What's your name? ")
    print(hello(name))
```

The printing responsibility moves to the caller; the function only builds a string. Now the test works:

```python
from hello import hello

def test_default():
    assert hello() == "hello, world"

def test_argument():
    assert hello("David") == "hello, David"
```

The general lesson: **return rather than print when you can**. Side effects make functions hard to test; push them to the boundary (`main`) and the core becomes a pure function.

## Putting tests in a folder

Once there are many tests, create a `test/` directory:

```
test/
├── __init__.py
└── test_hello.py
```

`__init__.py`, even empty, tells Python to treat the folder as a package. Then:

```bash
pytest test
```

pytest searches the whole directory for files and functions that follow the naming conventions.

Note: CS50's own `check50` is similar in spirit — it runs a set of automated checks and reports results — but it targets assignment grading, while pytest is a general tool. They are not mutually exclusive.

## Takeaways

- Tests must be code so they can be rerun, shared and used as regression checks.
- `assert` checks a boolean and raises `AssertionError` on failure; `try/except` can turn that into readable output.
- pytest handles running, catching and reporting; test functions only contain `assert`. `.` is a pass, `F` is a failure.
- One test function per category; splitting them yields multiple clues when something breaks.
- `with pytest.raises(TypeError):` asserts that an exception is raised.
- Functions that return are easy to test; functions that print are not. Prefer returning and let the caller print.
- A `test/` directory with `__init__.py` becomes a package, so `pytest test` runs everything inside.

## Comprehension check

**1. Why do two manual runs showing $2^2=4$ and $3^2=9$ still fail to establish that `square` is correct?**

Reference answer: Manual testing covers only two inputs that happen to be right, and leaves no rerunnable record. The counterexample is decisive: if `square` is mistakenly written as `n + n`, the test for `2` still passes because $2+2=2\times2$. A single input can land exactly where the bug does not show. The fix is to write automated tests over representative inputs — positives, negatives, zero, boundary values — that can be rerun after every change.

**2. What happens when `assert square(3) == 9` fails, and how does pytest exploit that?**

Reference answer: When the asserted expression is false, Python raises `AssertionError` with a traceback naming the file and line. pytest catches exactly that exception to decide a test failed, which is why test functions need no `try/except` and no `print`: pytest handles catching and reporting. `.` means no exception (pass), `F` means an `AssertionError` was caught (fail).

**3. Why is splitting five assertions into `test_positive`, `test_negative` and `test_zero` better than one function?**

Reference answer: Inside one function, the first failing assertion aborts the rest, so later inputs are never checked and you get only one clue. With three functions, pytest runs each separately; even if some fail, the others still execute. A summary like "2 failed, 1 passed" then tells you simultaneously that `3` fails among positives, `-2` fails among negatives, and `0` passes — narrowing the bug to "nonzero inputs other than 2" and speeding up diagnosis.

**4. Why does `hello("David") == "hello, David"` necessarily fail on the original version, and how do you change the code to make it pass?**

Reference answer: The original `hello` calls `print("hello,", to)` and has no `return`, so it returns `None`; the assertion compares `None` with a string and is false. The fix is to return `f"hello, {to}"` and move printing to the caller (`print(hello(name))` in `main`). The function becomes pure, so the test has a value to compare. This is why "return rather than print": side effects cannot be checked by `assert`.

**5. How do you test that passing a string should raise an error, and why can it not be written as `assert square("cat") == ...`?**

Reference answer: Use
```python
with pytest.raises(TypeError):
    square("cat")
```
which asserts that the block must raise `TypeError`. It cannot be written as an `assert` on the return value, because the call never returns normally — it raises and interrupts the statement, so the assertion itself fails and cannot express "I expect this exception".

**6. Why does the `if __name__ == "__main__":` line matter for testing?**

Reference answer: The test file needs `from calculator import square`. Without the guard, importing the module immediately runs `main()`, opening an `input` prompt and blocking the test run. With the guard, `main()` runs only when the file is executed directly; on import, only the definitions execute. That is what lets one file be both a program and a library.

## How it connects

Chapter 5 extended programs with libraries such as `sys`, `random` and `csv`; this chapter hands the job of checking the program to a library too — pytest. The next chapter moves to file I/O, where programs interact with data on disk, and the testing habit carries straight over (for example, testing what happens when a file does not exist). Chapters 8 and 9 — regular expressions and classes — are tested the same way.
