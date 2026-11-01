---
slug: "07-classes-and-oop"
title: "Classes and OOP: Bundling Data with the Operations on It"
summary: "Understand classes through the toolbox analogy, master class, __init__ and self, separate instance attributes from methods, extend an existing class with inheritance, and decide when a class beats plain functions."
updatedAt: "2026-11-01"
content_type: video-course
categories: [software-engineering]
tags:
  - python
  - oop
  - classes
  - inheritance
sources:
  - kind: video
    title: "Python for AI - Full Beginner Course（第 7 章）"
    url: "https://www.youtube.com/watch?v=ygXn5nV5qFc&t=13549s"
    author: "Dave Ebbelaar"
    publishedAt: 2025-10-21
---

## What this chapter covers

This is the most advanced chapter in the course. The goal is not to make you write elaborate class hierarchies immediately, but to build correct intuitions: what a class is, why `self` exists, and when a class is worth the trouble. The lecture repeats that all it asks is for you to see the syntax enough times to recognise it later.

This is chapter 7 of the long course, covering 3:45:49–4:10:04.

## Timeline

| Time | Topic |
| --- | --- |
| 3:45:49 | What OOP is: grouping related data and functions |
| 3:46:28 | The toolbox analogy: organized tools vs scattered tools |
| 3:48:17 | Defining a class: blueprint, attributes, methods |
| 3:49:13 | Why classes: one file → functions → multiple files → classes |
| 3:50:56 | First class: `class Dog`, `__init__`, `self` |
| 3:53:50 | Default arguments, instance attributes, independent instances |
| 3:56:23 | A realistic example: `APIConfig` for settings |
| 3:59:08 | Class vs instance (a common mistake) |
| 4:00:38 | Methods: `DataValidator` accumulating errors |
| 4:05:12 | Inheritance: `Animal` → `Dog` |
| 4:07:44 | When to use classes and when functions suffice |

## Why classes at all

The lecture opens with an honest disclaimer: everything covered so far works without classes. Classes are not a hidden feature of Python; they are another way to organize code.

The analogy is a toolbox. Without object-oriented design, the hammer, screwdriver and nails are all loose in the box, and you dig around whenever you need something. With classes, the box has labelled compartments: the hammer lives here, the screwdrivers there. Nothing new becomes possible, but finding things gets faster.

In code, the "tools" are functions. As a project grows, a related set of data and the functions that operate on it end up scattered, which makes reading painful. Collecting them into one class creates a clear boundary at the call site.

The lecture sketches a typical progression:

1. Everything in a single file.
2. Repeated logic extracted into functions.
3. Functions split across several files.
4. Related functions and data collected into classes.

At step 4 the entry point becomes clearer: instead of a dozen loose functions, you face a named object that carries its own state.

## Class, object, attribute, method

Four terms to keep apart:

- **Class**: the blueprint that says what such a thing stores and can do.
- **Object / instance**: one concrete thing built from the blueprint.
- **Attribute**: data stored on the object.
- **Method**: a function defined inside the class, describing what the object can do.

`class Dog:` is the blueprint; `jerry = Dog("Jerry", "Labrador")` builds one specific dog from it.

## First class: `__init__` and `self`

```python
class Dog:
    def __init__(self, name, breed="unknown"):
        self.name = name
        self.breed = breed

    def bark(self):
        print(f"{self.name} says woof")
```

Line by line:

- `class Dog:` defines the class; class names use CamelCase by convention.
- `__init__` is the initializer, called automatically when an object is created. The double underscores on both sides make it a "dunder" method.
- The first parameter is always `self`, meaning "the object being created".
- `self.name = name` stores the argument on the object as an instance attribute.
- `breed="unknown"` supplies a default, so it can be omitted at creation.

Using it:

```python
jerry = Dog("Jerry", "Labrador")
print(jerry.name)      # Jerry
print(jerry.breed)     # Labrador
jerry.bark()           # Jerry says woof

tim = Dog("Tim")       # breed defaults
print(tim.breed)       # unknown
```

`self` is the awkward part. It exists because one class can produce many objects, and each must remember its own data. `self.name` means "this object's name", not a name shared by the class. Thanks to `self`, `jerry.name` and `tim.name` stay independent.

## Class vs instance: the most common mistake

`APIConfig` is a more realistic example:

```python
class APIConfig:
    def __init__(self, api_key, model, max_tokens, base_url):
        self.api_key = api_key
        self.model = model
        self.max_tokens = max_tokens
        self.base_url = base_url


dev_config = APIConfig(
    api_key="sk-dev",
    model="gpt-3.5-turbo",
    max_tokens=500,
    base_url="https://api.openai.com/v1",
)

prod_config = APIConfig(
    api_key="sk-prod",
    model="gpt-4o",
    max_tokens=4000,
    base_url="https://api.openai.com/v1",
)
```

Development uses a cheap, fast model; production swaps in a stronger one. Both are instances of `APIConfig`, each holding its own settings. Reading `dev_config.model` or `prod_config.max_tokens` is far clearer than a pile of global variables.

One mistake almost everyone makes:

```python
print(APIConfig.model)     # AttributeError
```

`model` belongs to an **instance**, not to the **class**. The class is only a blueprint, and a blueprint does not have a particular model name; you must create an instance first and read the attribute from it.

Other common errors the lecture lists: forgetting `__init__`, omitting `self` in a method, forgetting the parentheses when creating an object, and attaching attributes to the class instead of the instance.

## Methods: giving objects behaviour

Attributes store data; methods give behaviour. `DataValidator` shows how a method can use the object's own state:

```python
class DataValidator:
    def __init__(self):
        self.errors = []

    def validate_email(self, email):
        if "@" not in email:
            self.errors.append(f"invalid email: {email}")
            return False
        return True

    def validate_age(self, age):
        if not 0 <= age <= 150:
            self.errors.append(f"invalid age: {age}")
            return False
        return True

    def get_errors(self):
        return self.errors
```

In use:

```python
validator = DataValidator()

validator.validate_email("bad-email")   # False
validator.validate_age(200)             # False
validator.validate_email("a@b.com")     # True

print(validator.get_errors())
# ['invalid email: bad-email', 'invalid age: 200']
```

The key is `self.errors`: it belongs to this validator instance. Each failure appends to it, so the object **remembers** what happened across calls. That is the real value of a class over plain functions — not new capability, but keeping state and behaviour in one place.

## Inheritance: extending an existing class

Inheritance lets one class take everything from another and then add or change parts.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating")

    def sleep(self):
        print(f"{self.name} is sleeping")


class Dog(Animal):
    def bark(self):
        print(f"{self.name} says woof")


buddy = Dog("Buddy")
buddy.eat()     # Buddy is eating   (from Animal)
buddy.sleep()   # Buddy is sleeping (from Animal)
buddy.bark()    # Buddy says woof   (from Dog)
```

The name in parentheses, `Animal`, is the parent class. `Dog` never defines `eat` or `sleep`, yet instances can call them because they are inherited.

A child can also override a parent method: if the parent defines `make_sound`, the child can redefine it so different animals make different noises.

The lecture keeps inheritance deliberately light: know that a child inherits from its parent and may add its own pieces; polymorphism and abstract classes can wait.

## When to use a class, when a function

This is the most practical section. Both paradigms work; the criterion is which one is clearer.

Functions fit:

- simple input-to-output transformations;
- stateless operations that remember nothing;
- one-off scripts.

Classes fit:

- state must persist across several operations;
- a group of data and the operations on it naturally belong together;
- you need several instances with similar behaviour but different data;
- you are modelling a real-world concept (config, validator, pipeline).

The advice is explicit: **start with functions**. They are simpler and often sufficient. Reach for a class only when you notice you keep passing the same bundle of data between functions, or need to maintain state.

## Takeaways

- A class is a blueprint; an object is an instance built from it. Attributes store data, methods give behaviour.
- `__init__` runs at creation and its first parameter must be `self`; `self` lets each instance remember its own data.
- `Class.attr` reaches the class, `instance.attr` reaches the instance; attributes usually live on instances.
- Methods can mutate instance attributes, so an object can accumulate state across calls.
- Inheritance gives a child the parent's attributes and methods, and lets it add or override.
- Prefer functions; use classes when state or bundling clearly helps.

## Comprehension check

**1. Why does `Dog("Jerry", "Labrador")` not mix its `self.name` with another dog's `name`?**

Reference answer: every call to the class creates a new instance, and `self` inside `__init__` refers to that instance. `self.name = name` writes into that instance's own attribute storage, not onto the class. So `jerry.name` and `tim.name` are two independent values. Only if you wrote a class attribute (assigning `name = ...` in the class body, outside methods) would all instances share one value.

**2. Why does `print(APIConfig.model)` raise `AttributeError`, and how do you get the model name?**

Reference answer: `model` is assigned as `self.model` inside `__init__`, which makes it an **instance attribute** that exists only after an instance is created. The class is only a blueprint and has no particular model bound to it. Create an instance first, e.g. `dev_config = APIConfig(...)`, then read `dev_config.model`. A class-level default can be defined in the class body, but it has different semantics from an instance attribute.

**3. What happens if you define `def bark(self):` as `def bark():` and then call `jerry.bark()`?**

Reference answer: Python still passes the instance as the first positional argument, so the call raises `TypeError: bark() takes 0 positional arguments but 1 was given`. `self` is not a keyword — it is a convention — but the first parameter slot must exist to receive the instance. Writing `def bark(this):` works but violates the convention and confuses readers.

**4. `DataValidator` appends every failure to `self.errors`. Why is the first error still present during the second `validate_email` call?**

Reference answer: `self.errors` is created once in `__init__` as a list belonging to the validator instance. `validate_email` calls `self.errors.append(...)`, mutating that same list object, and the instance persists between calls, so earlier entries remain. This is why `self.errors = []` belongs in `__init__` rather than inside the method: inside the method it would reset every call and nothing would accumulate. A mutable default such as `def __init__(self, errors=[])` is another trap, because all instances would share one list.

**5. In `class Dog(Animal)`, `Dog` never defines `eat`, yet `buddy.eat()` works. Why, and how would you change how a dog eats?**

Reference answer: attribute lookup checks `Dog` first and then its parent `Animal`, so `eat` is inherited. To change the behaviour, redefine the method in `Dog`:

```python
class Dog(Animal):
    def eat(self):
        print(f"{self.name} eats dog food")
```

This is an override. `buddy.eat()` now finds `Dog.eat` first and never reaches the parent version, while `buddy.sleep()` still uses the inherited implementation.

**6. Two needs: (a) multiply a batch of CSV amounts by an exchange rate; (b) validate user input repeatedly, accumulate every error, and return them at the end. Which suits a class, and why?**

Reference answer: (b) does. It must keep state across calls (the error list), and "error list plus validation methods" is naturally one unit. A class gives `validator = DataValidator()`, append on each failure, then `get_errors()` once. With functions you would pass the list in and out on every call, and it is easy to drop or reset. (a) is a stateless transformation — data in, data out — so one function `apply_rate(df, rate)` is enough; a class would add a wrapper with no benefit.

## How it connects

The previous chapter split code into modules; this chapter bundles data with behaviour into objects. The next chapter turns to everyday tooling: Git records versions and GitHub hosts the code, and the VS Code interface turns "save, commit, push" into a few clicks. The final chapter covers secrets and dependency management, which is what delivering a real project requires.
