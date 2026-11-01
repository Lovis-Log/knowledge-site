---
slug: 09-object-oriented-programming
title: "Object-Oriented Programming: From Tuples and Dicts to Your Own Class"
summary: "One 'student' problem, taken from tuples through lists and dictionaries to a class: __init__ constructs and validates, raise rejects bad data, __str__ controls printing, properties guard attributes, classmethods model a single Sorting Hat, inheritance with super() removes duplication, and __add__ lets two vaults be added."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, oop, classes, inheritance, properties]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 9 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=38267s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

This is chapter 9 of the long video (about 16 hours), corresponding to CS50P lecture 8, "Object-Oriented Programming", covering 10:37:47–13:29:08. Earlier chapters were largely procedural: order the steps, then extract functions. This chapter adds a third paradigm — object orientation — bundling related data and behaviour into a class.

## A concrete problem: storing a student

The program reads a name and a house, then prints them.

```python
name = input("Name: ")
house = input("House: ")
print(f"{name} from {house}")
```

It works but has no structure. Extract the input into functions:

```python
def main():
    name = get_name()
    house = get_house()
    print(f"{name} from {house}")

def get_name():
    return input("Name: ")

def get_house():
    return input("House: ")
```

Functions add a layer of abstraction. The real trouble starts when one function has to return two values.

## Timeline

| Time | Topic |
| --- | --- |
| 10:37:47 | Three paradigms: procedural, functional, object-oriented |
| 10:39:43 | Starting `student.py` and adding features step by step |
| 10:44:34 | `get_student` must return two values: a tuple |
| 10:47:22 | Tuples are immutable; editing Padma's house raises `TypeError` |
| 10:54:06 | Switching to a list: mutable, but positional |
| 10:56:25 | Switching to a dictionary: keyed, more expressive |
| 11:05:46 | `class Student`: inventing a data type |
| 11:17:00 | `__init__`, `self`, instance variables, constructor calls |
| 11:30:23 | Validation in the class: `raise ValueError("missing name")` |
| 11:40:30 | `__str__`: making `print` show something readable |
| 11:46:36 | A custom method: `charm` |
| 12:00:48 | `@property` and setters: closing the bypass |
| 12:18:26 | Python runs on an honour system; `_house` is still writable |
| 12:20:04 | `int`, `str`, `list`, `dict` were classes all along |
| 12:29:15 | `@classmethod` and class variables: the Sorting Hat |
| 12:59:02 | Inheritance: `Wizard` → `Student` / `Professor`, `super().__init__` |
| 13:13:02 | Operator overloading: `__add__` adds two vaults |

## Returning several values: tuples

```python
def get_student():
    name = input("Name: ")
    house = input("House: ")
    return name, house

def main():
    name, house = get_student()
    print(f"{name} from {house}")
```

`return name, house` looks like two values but returns one **tuple** — an ordered, immutable sequence. It can be unpacked or indexed: `student[0]`, `student[1]`.

Immutability is a feature:

```python
student = ("Padma", "Gryffindor")
student[1] = "Ravenclaw"
```

produces

```
TypeError: 'tuple' object does not support item assignment
```

To allow modification, use a list `["Padma", "Gryffindor"]`. But lists still carry the problem that `student[0]` is the name and `student[1]` the house — a convention that lives only in the programmer's memory. With more fields, someone will get it wrong.

## Dictionaries: better semantics, still loose

```python
def get_student():
    name = input("Name: ")
    house = input("House: ")
    return {"name": name, "house": house}

def main():
    student = get_student()
    print(f"{student['name']} from {student['house']}")
```

Keys replace indices and readability improves at once. Mind the quoting in the f-string: with double quotes outside, the keys must use single quotes, or Python cannot tell where the string ends.

The dictionary's weakness is that **it accepts anything**. Any key, any value, no validation, no behaviour. "A student must belong to one of four houses" or "the name cannot be empty" is simply not expressible as a constraint on a dict.

## A class: inventing a data type

```python
class Student:
    ...

def get_student():
    student = Student()
    student.name = input("Name: ")
    student.house = input("House: ")
    return student
```

`class Student:` defines a new type; `Student()` creates an **object** (also called an instance). `student.name = ...` attaches an **attribute** (instance variable).

| Term | Meaning |
| --- | --- |
| class | the blueprint or mould defining what such objects look like |
| object / instance | one concrete thing made from the blueprint |
| attribute / instance variable | data stored inside the object |
| method | a function defined in the class |

## `__init__`: construct and validate

Attaching attributes by hand is loose. `__init__` fixes an object's contents at creation:

```python
class Student:
    def __init__(self, name, house):
        self.name = name
        self.house = house

def get_student():
    name = input("Name: ")
    house = input("House: ")
    return Student(name, house)
```

Points that confuse beginners:

- `Student(name, house)` is a **constructor call**: Python creates an empty object, then calls `__init__` on it automatically;
- `self` is the first parameter Python passes in, referring to the newly created object, which is why the caller does not supply it;
- `self.name = name` stores the argument inside the object as an instance variable.

Now validation can live in `__init__`:

```python
class Student:
    def __init__(self, name, house):
        if not name:
            raise ValueError("Missing name")
        if house not in ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]:
            raise ValueError("Invalid house")
        self.name = name
        self.house = house
```

`raise` signals an error deliberately. Printing and continuing is not enough — the object already exists, and the caller must learn that it is invalid. `sys.exit()` is too much: it kills the whole program when the caller might want to catch the error and process the next record.

```python
try:
    student = Student(name, house)
except ValueError as e:
    print(e)
```

## `__str__`: control printing

`print(student)` by default shows

```
<__main__.Student object at 0x102733e80>
```

the default representation: type name plus memory address. Define `__str__` to override:

```python
class Student:
    def __init__(self, name, house):
        ...
        self.name = name
        self.house = house

    def __str__(self):
        return f"{self.name} from {self.house}"
```

Now `print(student)` calls `__str__` and prints `Harry from Gryffindor`. `__str__` is the user-facing representation; `__repr__` is the developer-facing one, usually including the type.

## Methods: objects that act

```python
class Student:
    ...
    def charm(self):
        match self.patronus:
            case "Stag":
                return "🐴"
            case "Otter":
                return "🦦"
            case "Jack Russell terrier":
                return "🐶"
            case _:
                return "🪄"
```

A method is a function inside a class whose first parameter is always `self`. Calling `student.charm()` makes Python pass `student` as `self`. Unlike `__init__` and `__str__`, this method is not called automatically; you write `student.charm()` yourself.

## `property`: guarding the attribute

The validation above has a hole. Even if `__init__` rejects bad values, later code can still overwrite them:

```python
student = Student("Harry", "Gryffindor")
student.house = "Number Four, Privet Drive"   # bypasses validation
```

`__init__` runs only once. A property closes the gap:

```python
class Student:
    def __init__(self, name, house):
        self.name = name
        self.house = house      # note: this also goes through the setter

    @property
    def house(self):
        return self._house

    @house.setter
    def house(self, house):
        if house not in ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]:
            raise ValueError("Invalid house")
        self._house = house
```

How it works:

- `@property` defines a getter, called on `student.house`;
- `@house.setter` defines a setter, called on `student.house = ...`;
- the real storage is `self._house`, with an underscore to avoid name collision;
- `__init__` assigns `self.house = house` **without** the underscore, so initialisation goes through the setter and validation is written once.

### Python's honour system

Even so, `student._house = "..."` bypasses everything. Python has no `private` keyword as Java does. A leading underscore is a **convention**: one underscore means "please don't touch", two means "really, don't touch", but nothing enforces it.

This is a design stance rather than an oversight: Python assumes adults are using it. Real encapsulation relies on convention, review and documentation rather than the compiler.

## You have been using classes all along

```python
print(type(50))        # <class 'int'>
print(type("hello"))   # <class 'str'>
print(type([]))        # <class 'list'>
print(type({}))        # <class 'dict'>
```

`int`, `str`, `list` and `dict` are all classes. `"Hello".lower()` calls a method of `str`; `list.append()` is a method of `list`. Eight chapters have been object-oriented without naming it.

Built-in classes are lowercase; custom classes are capitalised (`Student`) by PEP 8 convention.

## `classmethod` and class variables

The Sorting Hat exists once in the story, so there is no reason to create many hats. A class method fits:

```python
import random

class Hat:
    houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]

    @classmethod
    def sort(cls, name):
        print(name, "is in", random.choice(cls.houses))

Hat.sort("Harry")
```

- `houses` lives in the class, not in `__init__`: it is a **class variable**, shared by every instance;
- `@classmethod` makes the method receive `cls` (the class) instead of `self` (an object);
- call it as `Hat.sort(...)`; no `Hat()` needed.

This also solves a chicken-and-egg problem: if "get a student" were an instance method, you would need a student object before you could create one. A class method works with no instance at all.

`@staticmethod` is a third kind: it receives neither `self` nor `cls` and is just an ordinary function in the class namespace. The lecture does not develop it.

## Inheritance: removing duplication

Students and professors both have names, and the validation is identical. Copy-paste is a smell:

```python
class Wizard:
    def __init__(self, name):
        if not name:
            raise ValueError("Missing name")
        self.name = name

class Student(Wizard):
    def __init__(self, name, house):
        super().__init__(name)
        self.house = house

class Professor(Wizard):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject
```

- `class Student(Wizard)` makes `Student` inherit from `Wizard`, gaining its attributes and methods;
- `super().__init__(name)` runs the parent's initialiser, so name validation is written once;
- subclasses add their own fields (`house`, `subject`) and may override parent methods.

Inheritance is hierarchical: a grandchild inherits from the grandparent as well. Multiple inheritance is possible in Python, though the lecture keeps a single chain.

Note: Python's exception hierarchy is itself inheritance — `ValueError` descends from `Exception`, which descends from `BaseException`. That is why `except Exception` catches almost everything while `except ValueError` catches one family. Custom exceptions usually subclass an existing one rather than starting from scratch.

## Operator overloading

Adding two vaults naively means pulling out three fields and building a new object:

```python
total = Vault(
    potter.galleons + weasley.galleons,
    potter.sickles + weasley.sickles,
    potter.knuts + weasley.knuts,
)
```

To write `total = potter + weasley`, implement `__add__`:

```python
class Vault:
    def __init__(self, galleons=0, sickles=0, knuts=0):
        self.galleons = galleons
        self.sickles = sickles
        self.knuts = knuts

    def __str__(self):
        return f"{self.galleons} Galleons, {self.sickles} Sickles, {self.knuts} Knuts"

    def __add__(self, other):
        return Vault(
            self.galleons + other.galleons,
            self.sickles + other.sickles,
            self.knuts + other.knuts,
        )
```

`potter + weasley` calls `potter.__add__(weasley)`, with `self` on the left and `other` on the right. Without `__add__`, `Vault + Vault` raises `TypeError: unsupported operand type(s)`.

The same mechanism makes `+` concatenate strings and merge lists: `str` and `list` each implement `__add__`. Other operators can be overloaded too — `-`, `<`, `==` and many more — but **new symbols cannot be invented**.

## Takeaways

- Tuples are ordered and immutable; lists are mutable but positional; dictionaries are keyed but unconstrained.
- A class binds data to behaviour; `class` defines the type and calling the class name creates instances.
- `__init__` initialises and validates at construction time; `self` is the current object.
- Failed validation should `raise ValueError`, letting callers decide, not `print` or `sys.exit`.
- `__str__` decides what `print(obj)` shows; `__repr__` is for developers.
- `@property` plus `@x.setter` routes both read and write through your code; the real store is `_x`.
- Python's privacy is convention, not enforcement; the underscore is a "do not touch" signal.
- `@classmethod` receives `cls`, suiting shared-per-class data or calls that need no instance.
- `class Child(Parent)` plus `super().__init__(...)` reuses code; the exception hierarchy works the same way.
- Special methods such as `__add__` implement operator overloading, letting a class define what `+` means.

## Comprehension check

**1. What does `return name, house` actually return, and why does `student[1] = "Ravenclaw"` fail?**

Reference answer: The comma returns **one tuple**, `(name, house)`, not two independent values; the receiver's `name, house = ...` is unpacking. A tuple is an immutable sequence, so assigning to an index raises `TypeError: 'tuple' object does not support item assignment`. Return a list `[name, house]` if mutation is needed, or a dictionary or class if clearer semantics are wanted.

**2. Why is validation in `__init__` not enough, and what does `@property` add?**

Reference answer: `__init__` runs only when the object is created. Afterwards code can write `student.house = "invalid"` and bypass all checks. `@property` turns `house` into an attribute controlled by a getter and setter: reads call the getter, assignments call the setter, and the setter re-runs validation, raising on bad values. The real value is stored in `self._house` to avoid a name collision. Both construction and later mutation therefore pass through the same validation code.

**3. With properties in place, why can `student._house = ...` still bypass them? What does that say about Python's design?**

Reference answer: Python has no language-level access control such as `private`; a leading underscore is only a naming convention meaning "internal, please don't touch". `_house` remains an ordinary attribute that can be assigned. Python chooses an honour system — trusting users to follow convention — rather than compiler enforcement. Encapsulation is maintained through convention, review and documentation, unlike Java's `private`.

**4. How does `@classmethod` differ from an instance method, and why does the Sorting Hat suit it?**

Reference answer: An instance method's first parameter is `self`, the specific object, so an instance must exist before it can be called. A class method is decorated with `@classmethod`, receives `cls` — the class itself — and can be called as `Hat.sort(...)` without creating a `Hat()`. The Sorting Hat exists once and holds no per-hat state; what it needs is a shared house list and a sorting action, exactly the class-variable-plus-classmethod shape. It also avoids a chicken-and-egg problem: if "get a student" were an instance method, you would need a student before you could create one.

**5. What duplication does `class Student(Wizard)` with `super().__init__(name)` remove? What happens without the `super()` call?**

Reference answer: Both `Student` and `Professor` need to store and validate `name`. Moving that to a parent `Wizard` and calling `super().__init__(name)` reuses it, leaving each subclass with only its own field (`house`, `subject`). Without the call, the parent initialiser never runs: `self.name` is never set and validation never happens, so accessing `student.name` raises `AttributeError`. Inheritance provides the method but does not call the parent constructor for you.

**6. Why does `potter + weasley` need `__add__`, and what do `self` and `other` refer to?**

Reference answer: `+` has no default meaning for a custom type; Python tries the left operand's `__add__` and, if missing, raises `TypeError: unsupported operand type(s) for +: 'Vault' and 'Vault'`. Defining `__add__(self, other)` makes `potter + weasley` equivalent to `potter.__add__(weasley)`: `self` is `potter` on the left, `other` is `weasley` on the right. The method reads both objects' three fields, adds them, and returns a new `Vault`. String concatenation and list merging use the same machinery.

**7. Why raise `ValueError` on invalid data instead of printing a message or calling `sys.exit()`?**

Reference answer: `print` only outputs text and execution continues, so the caller never learns the object is invalid and may store corrupt data. `sys.exit()` terminates the whole program — too heavy when processing many records, where one bad row should not stop the batch. `raise ValueError("Invalid house")` hands the error to the caller, which can handle it immediately or use `try/except` to skip the record and continue. An exception is a recoverable error signal; exiting the program is not.

## How it connects

Chapter 8 used regex to clean user input; this chapter stores the cleaned values in a class that owns its own validation. Chapter 10 assembles classes and functions into a command-line program where `argparse`, file I/O, exceptions and classes all appear together. Beyond that, almost any larger Python project models its entities with classes, and the four handles introduced here — `__init__`, properties, inheritance and special methods — are the ones used most.
