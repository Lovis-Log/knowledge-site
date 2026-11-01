---
slug: 07-file-io
title: "File I/O: From names.txt to CSV and Images"
summary: "Memory is wiped when a program exits; files let data survive. Starting from writing a single name, the chapter explains w versus a, automatic closing with with, line-by-line reading and the extra blank line; then uses CSV to show why hand-written split breaks, how csv.reader and DictReader fix it, and closes with Pillow building an animated GIF — binary files follow the same open/read/save pattern."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, file-io, csv, pillow]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 7 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=25232s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

This is chapter 7 of the long video (about 16 hours), corresponding to CS50P lecture 6, "File I/O", covering 7:00:32–8:32:47. Everything before this chapter kept data in variables and lists, which vanish when the program exits. This chapter puts data on disk: plain text first, then CSV, and finally a binary image.

## The core problem

All data so far lives in memory — variables, lists, dictionaries — and disappears when the program ends. To keep information, write it to a file and read it back next time. File I/O reduces to three questions:

1. In which mode is the file opened (read `r`, write `w`, append `a`)?
2. What shape comes back when reading (the whole text, a line, or a row split into fields)?
3. Who does the parsing (your own `split`, or the standard library)?

## Timeline

| Time | Topic |
| --- | --- |
| 7:00:32 | Motivation: memory is temporary, files persist |
| 7:01:40 | `names.py`: collect three names, sort, print |
| 7:06:08 | `open("names.txt", "w")`; `w` wipes the file every time |
| 7:10:37 | Switching to `"a"`; names run together, so write `\n` yourself |
| 7:14:27 | The `with` statement: automatic closing |
| 7:16:16 | Reading: `readlines()`, `for line in file`, `rstrip()` |
| 7:21:41 | Sorting requires every line to be in memory first |
| 7:25:20 | `sorted(..., reverse=True)` |
| 7:30:12 | CSV: separate name and house with commas |
| 7:33:06 | Hand-written `split(",")`; unpacking with `name, house = row` |
| 7:39:37 | Keeping students as dictionaries and sorting with `key=` |
| 7:54:24 | lambda: no name needed for a function used once |
| 7:57:18 | A comma inside an address → `ValueError: too many values to unpack` |
| 8:01:20 | `csv.reader` takes over parsing |
| 8:08:05 | Header row + `csv.DictReader`, immune to column reordering |
| 8:13:42 | `csv.writer` / `csv.DictWriter` write back |
| 8:23:19 | Binary files: Pillow turns two images into an animated GIF |

## From a list to a file

The first `names.py` handles one name:

```python
name = input("What's your name? ")
print(f"hello, {name}")
```

Extending it to three names and sorting:

```python
names = []
for _ in range(3):
    names.append(input("What's your name? "))

for name in sorted(names):
    print(f"hello, {name}")
```

`_` is the convention for "this loop variable is never used". Enter Hermione, Harry, Ron and the output is alphabetical: Harry, Hermione, Ron. But when the program exits, all three names are gone.

## Writing: the trap in `w`

```python
name = input("What's your name? ")
file = open("names.txt", "w")
file.write(name)
file.close()
```

`open` returns a **file handle**; `write` writes; `close` saves and releases. Run it three times with Hermione, Harry and Ron, and `names.txt` contains only `Ron`.

The cause is `"w"`: it not only creates the file, it **truncates** it on every open. Three runs mean three "truncate, then write". Separately, `write` adds no newline, so even without truncation the three names would run together as `HermioneHarryRon`.

### Switch to append and add the newline

```python
name = input("What's your name? ")
with open("names.txt", "a") as file:
    file.write(f"{name}\n")
```

- `"a"` means append: write at the end, keep what is already there;
- `f"{name}\n"` adds the newline explicitly, because `write` does not behave like `print`.

### `with` closes for you

```python
with open("names.txt", "a") as file:
    file.write(f"{name}\n")
```

When the block ends, `close()` is called automatically, even if an exception was raised inside. A forgotten manual `close()` means unflushed data, a leaked handle, or a corrupted file. That is why file operations almost always use `with`.

## Reading: three ways and one extra blank line

`names.txt` now holds:

```
Hermione
Harry
Ron
Draco
```

### Read everything as a list

```python
with open("names.txt", "r") as file:
    lines = file.readlines()

for line in lines:
    print("hello,", line.rstrip())
```

`readlines()` returns a list of strings, one per line, **including the trailing `\n`**. Printing `line` directly produces a blank line after each name: the line already ends with `\n`, and `print` adds another. Two fixes:

- `line.rstrip()` strips the ending so `print` handles the newline;
- or `print(line, end="")`, letting the file's newline do the work.

The lecture prefers `rstrip()`: the newline is an implementation detail of the file format and should not leak into output logic.

### Iterate the file directly

```python
with open("names.txt") as file:
    for line in file:
        print("hello,", line.rstrip())
```

A file object is itself iterable and yields one line at a time. This avoids the extra copy that `readlines()` makes, and reads almost like English.

### Sort the output

```python
names = []
with open("names.txt") as file:
    for line in file:
        names.append(line.rstrip())

for name in sorted(names):
    print(f"hello, {name}")
```

Why not print while reading? Because printing discards the chance to sort — sorting needs to see every value. So the data is collected first, sorted, then printed. This is the general pattern for file data: **load, process, then output**.

Python also allows a shortcut:

```python
with open("names.txt") as file:
    for line in sorted(file):
        print("hello,", line.rstrip())
```

`sorted` accepts any iterable, files included; it reads everything into memory and sorts. Descending order is `sorted(names, reverse=True)`.

## CSV: several fields per line

Each student now has a name and a house. Mixing them on separate lines makes the file ambiguous — some lines are names, some are houses. The convention is to put one student's fields on one line, separated by commas: CSV (comma-separated values).

`students.csv`:

```
name,house
Hermione,Gryffindor
Harry,Gryffindor
Ron,Gryffindor
Draco,Slytherin
```

### Hand-written parsing

```python
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        print(f"{name} is in {house}")
```

`split(",")` returns a list, and `name, house = ...` is **unpacking**: assign the two elements at once. It reads better than `row[0]` and `row[1]`.

### Sorting: why dictionaries are needed

Building whole sentences and sorting them happens to work, because English reads left to right and the name comes first — a coincidence, not a design. Keeping the structure is better:

```python
students = []
with open("students.csv") as file:
    for line in file:
        name, house = line.rstrip().split(",")
        students.append({"name": name, "house": house})

for student in sorted(students, key=lambda student: student["name"]):
    print(f"{student['name']} is in {student['house']}")
```

`key` takes a function; `sorted` calls it on each element and compares the return values. Here a lambda stands in for `def get_name(student): return student["name"]`, since the function is used once and needs no name.

Note the quoting: the f-string uses double quotes outside, so dictionary keys use single quotes inside — `{student['name']}`. Using double quotes on both sides confuses the parser.

### Where hand-written parsing breaks

Change the column from house to home:

```
name,home
Harry,Number Four, Privet Drive
Ron,The Burrow
Draco,Malfoy Manor
```

The program fails immediately:

```
ValueError: too many values to unpack (expected 2)
```

The comma inside `Number Four, Privet Drive` is treated as a field separator, so `split` produces three pieces while two variables wait for them.

Workarounds are all fragile: switch to a pipe character and the data will eventually contain a pipe; quote fields containing commas and the parser must then learn that "a comma inside quotes is not a separator". At this point the conclusion is: **this is a solved problem — use the standard library**.

## The `csv` module

### `csv.reader`

```python
import csv

students = []
with open("students.csv") as file:
    reader = csv.reader(file)
    for name, home in reader:
        students.append({"name": name, "home": home})
```

`reader` yields each row as a list of fields, handling quotes, commas and line endings correctly. Unpacking still works.

### `csv.DictReader`

Add a header row:

```
name,home
Harry,Number Four, Privet Drive
```

```python
import csv

students = []
with open("students.csv") as file:
    reader = csv.DictReader(file)
    for row in reader:
        students.append({"name": row["name"], "home": row["home"]})
```

Each row becomes a dictionary keyed by the header. The benefit is that **code no longer depends on column order**: if someone moves `home` before `name` in Excel and updates the header, the code runs unchanged.

### Writing: `csv.writer`

```python
import csv

name = input("What's your name? ")
home = input("Where's your home? ")

with open("students.csv", "a") as file:
    writer = csv.writer(file)
    writer.writerow([name, home])
```

Typing `Number Four, Privet Drive` makes the writer quote that field automatically, so a later read will not split on the wrong comma.

### Writing: `csv.DictWriter`

```python
import csv

name = input("What's your name? ")
home = input("Where's your home? ")

with open("students.csv", "a") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "home"])
    writer.writerow({"name": name, "home": home})
```

`fieldnames` fixes the column order; the dictionary's own key order does not matter. Adding columns later does not require rewriting the write logic.

## Binary files: an animated image

Beyond text, Python reads and writes binary too. With Pillow, two static images become an animation:

```python
import sys
from PIL import Image

images = []

for arg in sys.argv[1:]:
    image = Image.open(arg)
    images.append(image)

images[0].save(
    "costumes.gif",
    save_all=True,
    append_images=images[1:],
    duration=200,
    loop=0,
)
```

- `sys.argv[1:]` skips the program name and keeps the image paths from the command line;
- `Image.open` loads an image; `save` creates, writes and closes the file;
- `save_all=True` writes every frame, `append_images` supplies the later frames;
- `duration=200` gives each frame 200 ms, `loop=0` loops forever.

Run it:

```bash
python costumes.py costume1.gif costume2.gif
```

and `costumes.gif` appears. The point is not the GIF; it is that **file I/O follows one pattern** — open, read or write, save — and text, CSV and images differ only in content format.

## On reading and writing at once

A student asked whether a file can be opened for both reading and writing. It can, but it is awkward. A file behaves like a tape: there is a current position, and reading, writing and seeking all move it. Try to edit in place and you must manage that position, handle length changes, and `seek` back before reading again. The robust approach is "read everything → modify in memory → write everything back". Only when the file is huge and rewriting is too expensive is random access worth the complexity.

## Takeaways

- `"w"` truncates before writing; `"a"` appends. Forget this and only the last input survives.
- `write` adds no newline; write `\n` yourself.
- `with open(...) as f` closes the file automatically, preventing leaks and corruption.
- Reading can use `readlines()`, direct iteration, or `sorted(file)`; the file's own `\n` adds a blank line, fixed with `rstrip()`.
- Sorting requires all data in memory: load, process, output.
- Hand-written `split` breaks on commas inside fields; use `csv.reader` / `csv.DictReader` to read and `csv.writer` / `csv.DictWriter` to write.
- `DictReader` depends on the header, not on column positions, so reordering columns does not break code.
- Binary files (images, audio) follow the same open/read-write/save pattern; Pillow is one example.

## Comprehension check

**1. Why does running the program three times with `"w"` leave only the last name in the file?**

Reference answer: `"w"` truncates the file to zero length before writing. Three runs mean "truncate and write Hermione", "truncate and write Harry", "truncate and write Ron", so only Ron remains. To keep history, open with `"a"` (append), which writes at the end without truncating.

**2. Printing each line read from a file gives a blank line between names. Why, and what are two fixes?**

Reference answer: Every line in the file ends with `\n`, and that newline is part of the string; `print` then adds another `\n`, producing two line breaks per name. Fix one: `print(line.rstrip())`, stripping the ending so `print` supplies the newline. Fix two: `print(line, end="")`, suppressing the added newline and using the file's own. The lecture prefers the first, since newline-as-separator is a storage convention that should not leak into output logic.

**3. Why can you not sort while streaming through the file?**

Reference answer: Sorting needs to see every value before it can decide an order. If each line is printed as it is read, the first output happens before later values are known, and by then the order is fixed. So the file must be fully read into a list (or passed wholesale to `sorted(file)`), then sorted, then printed. This is why the general pattern is load, process, output.

**4. Why does `Number Four, Privet Drive` break `name, home = line.split(",")`, and how does `csv` avoid it?**

Reference answer: `split(",")` treats every comma as a field separator, so the comma inside the address produces three pieces while two variables wait for them, raising `ValueError: too many values to unpack (expected 2)`. `csv.reader` follows CSV rules: fields containing commas are quoted when written, and quoted commas are not separators when read, so it returns exactly two fields. The real issue is not how to split but understanding quoting before splitting.

**5. Why can `csv.reader` code break when columns are reordered, while `DictReader` code does not?**

Reference answer: `csv.reader` yields positionally ordered lists, and code unpacks or indexes `row[0]`, `row[1]`, implicitly assuming "first column is name, second is home". Reordering shifts the values or breaks unpacking. `DictReader` reads the header and turns each row into a dictionary keyed by column name, so `row["name"]` is independent of physical position. As long as the header is updated with the data, any column order works.

**6. What does `with open(...) as file:` do beyond calling `close()` manually?**

Reference answer: `with` guarantees `close()` runs when the block ends, including when an exception leaves the block early. A manual `close()` depends on the programmer remembering it and on execution actually reaching it — which an exception prevents. An unclosed file can lose buffered data, leak a handle, or be corrupted. So `with` is not sugar; it turns "must close" into a structural guarantee.

**7. Why is "read everything → modify → write everything back" recommended for changing one field in a CSV?**

Reference answer: Files are sequential: there is a current position, and rewriting from the middle shifts everything after it while requiring you to track position and handle length changes. The simplest reliable approach is to load the whole file into memory, modify the in-memory structures (lists, dictionaries), and write the whole thing back with `"w"`. Only for very large files, where rewriting is too expensive, is `seek`-based random access worth implementing.

## How it connects

The unit tests from chapter 6 apply immediately: file functions can be tested too — does a missing file raise `FileNotFoundError`, does an empty file yield an empty list? The next chapter turns to regular expressions, which extract structured information from a piece of text — the same kind of problem as extracting fields from a file, solved with a different tool. Chapter 9 then wraps data like a student into a class, replacing the temporary dictionaries used here.
