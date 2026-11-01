---
slug: "18-classes-constructors-methods"
title: "Classes, Constructors and Destructors: From a Cylinder to the this Pointer"
summary: "Building a Cylinder class to separate data from behaviour: default access rules, constructors and the compiler-generated default, setters and getters, splitting a class across files with include guards, managing objects through pointers, destructor call sites and reverse-order destruction, and the three uses of this."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, classes, constructors, destructors, this-pointer, header-files]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 18 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=73058s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

This is chapter 18 of a 31-hour single-video course, covering **20:17:38–22:33:31**. Until now programs were built from free functions and plain structs; from here on, data and behaviour live inside one type.

## What this chapter is about

The running example is a cylinder: it is determined by a radius $r$ and a height $h$, and it supports two computations, the base area $\pi r^2$ and the volume $\pi r^2 h$. That maps directly onto the two halves of a class:

- **member variables** describe what the object *is* (`base_radius`, `height`);
- **member functions** describe what the object *can do* (`volume()`).

The chapter answers six questions in order: how to declare a class, how objects are constructed, how outsiders safely read and write data, how to split code across files, how to manage objects through pointers, and when objects are destroyed. It closes with the `this` pointer — the handle a member function has on the object it is operating on.

## Timeline

| Time | Topic |
| --- | --- |
| 20:17 | The first class, Cylinder; public/private and the private default |
| 20:37 | Constructors: no return type, same name as the class, optional parameters; compiler default |
| 20:53 | `= default` to ask the compiler for the default constructor |
| 20:59 | Setters and getters as a controlled interface over private data |
| 21:09 | Splitting into files: `constants.h`, `cylinder.h`, `cylinder.cpp`, include guards |
| 21:30 | Managing objects through pointers: addresses of stack objects, `new`/`delete`, `->` |
| 21:42 | Destructors: when they run and why resources must be released |
| 22:05 | Construction in declaration order, destruction in reverse |
| 22:11 | `this`: printing the address, resolving name clashes, chained calls |

## Declaring a class

```cpp
const double PI {3.14159265358979323846};

class Cylinder {
public:
    double volume() {
        return PI * base_radius * base_radius * height;
    }

private:
    double base_radius {0.0};
    double height {0.0};
};
```

Rules worth memorising:

1. **The class definition ends with a semicolon.** Omit it and the compiler reports an error that usually points at an unrelated later line.
2. **`class` members are private by default**; `struct` members are public (chapter 19).
3. Everything after `public:` is public until the next access specifier; same for `private:`.
4. A member function defined inside the class can use every member, public or private, because it is inside the class scope.

Reaching for `cylinder1.base_radius` from `main` produces

```text
error: 'double Cylinder::base_radius' is private within this context
```

That is encapsulation in its simplest form: the class uses its own data freely, outsiders must go through the public interface.

### Member variables cannot be references

A member may be a value or a pointer, never a reference. A reference must be bound to an object when it is created, but at the point where members are declared there is no object yet. Classes constantly rely on "declare now, assign later"; references cannot do that.

## Constructors: how objects come into being

A constructor is the special member function the compiler calls when an object is created:

- **no return type** (not even `void`);
- **same name as the class**;
- may take parameters or none;
- normally puts members into a usable state.

```cpp
class Cylinder {
public:
    Cylinder() {                 // default constructor, no parameters
        base_radius = 2.0;
        height = 2.0;
    }

    Cylinder(double radius_param, double height_param) {
        base_radius = radius_param;
        height = height_param;
    }

    double volume() { return PI * base_radius * base_radius * height; }

private:
    double base_radius {1.0};
    double height {1.0};
};
```

`Cylinder c1;` calls the parameterless one; `Cylinder c2(10.0, 4.0);` calls the two-argument one. Parameters are passed **by value**, so the body works on copies — harmless for `double`, worth thinking about for large objects (chapter 15).

### The compiler supplies a default constructor

If a class declares **no constructor at all**, the compiler generates an empty default constructor: no parameters, empty body. So this compiles:

```cpp
class Cylinder {
public:
    double volume() { /* ... */ }
private:
    double base_radius {1.0};
    double height {1.0};
};

Cylinder c1;   // compiler-generated default constructor, member initialisers apply
```

But **as soon as you declare any constructor**, the compiler stops generating the default one. `Cylinder c1;` then fails:

```text
error: no matching function for call to 'Cylinder::Cylinder()'
```

To keep both, write an empty parameterless constructor, or ask the compiler for one:

```cpp
Cylinder() = default;
```

`= default` does not mean "do nothing"; it means "generate the default version". It states the intent more clearly than an empty body and leaves room for compiler optimisation.

### Constructors must be public

A private constructor cannot be called from outside, so no object can be created (`is inaccessible`). The exception is intentional designs such as the singleton, where the constructor is hidden on purpose.

## Setters and getters: protecting the data

Once members are private, outsiders need controlled access:

```cpp
class Cylinder {
public:
    double get_base_radius() const { return base_radius; }
    double get_height() const { return height; }

    void set_base_radius(double radius_param) { base_radius = radius_param; }
    void set_height(double height_param) { height = height_param; }

private:
    double base_radius {1.0};
    double height {1.0};
};
```

- Setters and getters must be **public**, otherwise callers hit `is private within this context`.
- Mark getters `const`: they do not modify the object, and const objects can still call them.
- A getter returning by value hands back a **copy**; modifying it does not touch the original, so changes go through setters.

This interface matters even more under inheritance: callers depend on "I can ask for the radius", not on how the radius is stored.

## Splitting the class across files

Keeping everything in `main.cpp` stops scaling quickly. The conventional split is:

```text
constants.h      // const double PI
cylinder.h       // class declaration: members and function prototypes
cylinder.cpp     // member function definitions
main.cpp         // uses the class
```

`cylinder.h`:

```cpp
#ifndef CYLINDER_H
#define CYLINDER_H

class Cylinder {
public:
    Cylinder();
    Cylinder(double radius_param, double height_param);
    double volume() const;
    double get_base_radius() const;
    void set_base_radius(double radius_param);

private:
    double base_radius {1.0};
    double height {1.0};
};

#endif
```

`cylinder.cpp`:

```cpp
#include "cylinder.h"
#include "constants.h"

Cylinder::Cylinder() = default;

Cylinder::Cylinder(double radius_param, double height_param)
    : base_radius{radius_param}, height{height_param} {}

double Cylinder::volume() const {
    return PI * base_radius * base_radius * height;
}
```

Three new pieces of syntax:

1. **`::`, the scope resolution operator.** `Cylinder::volume` means "the `volume` declared inside `Cylinder`", telling the compiler which declaration this definition belongs to.
2. **The member initialiser list** `: base_radius{...}, height{...}` initialises before the body runs, which is more direct than assigning inside the body.
3. **Include guards:**

```cpp
#ifndef CYLINDER_H
#define CYLINDER_H
// ... contents ...
#endif
```

The preprocessor pastes included files verbatim. If `cylinder.h` includes `constants.h` and `main.cpp` also includes it, the same definition appears twice:

```text
error: redefinition of 'const double PI'
```

The guard makes the second inclusion a no-op. `#pragma once` is the modern alternative.

### A common trap: definitions left in the header

After moving functions to the `.cpp`, the header must contain **declarations only**:

```cpp
double volume() const;        // correct
double volume() const { ... } // wrong: definition still in the header
```

With both copies present, compilation succeeds and the **linker** fails:

```text
multiple definition of 'Cylinder::volume() const'
```

The linker cannot choose between two definitions. It is hard to diagnose because no single line is syntactically wrong.

## Managing objects through pointers

Objects live on the stack or on the heap:

```cpp
Cylinder c1(10.0, 3.0);              // stack object

Cylinder* p_c1 = &c1;                // pointer to a stack object
std::cout << p_c1->volume() << "\n"; // -> dereferences for you

Cylinder* p_c2 = new Cylinder(100.0, 10.0); // heap object
std::cout << p_c2->volume() << "\n";
delete p_c2;                          // must be released manually
```

`->` is shorthand for "dereference, then use `.`":

```cpp
(*p_c1).volume();   // equivalent; the parentheses are required
```

`*p_c1.volume()` is wrong because `.` binds tighter than `*`, so it would try to call `p_c1.volume()` first.

Anything created with `new` does not disappear on its own; the matching `delete` is mandatory. Forgetting it leaks memory; deleting the same pointer twice is undefined behaviour and commonly crashes.

## Destructors: how objects are destroyed

A destructor runs when an object's lifetime ends. Its name is the class name prefixed with `~`:

```cpp
class Dog {
public:
    Dog(std::string_view name) : m_name{name} {
        m_age = new int{2};          // heap allocation in the constructor
    }

    ~Dog() {
        delete m_age;                // released in the destructor
        m_age = nullptr;
    }

private:
    std::string m_name;
    int* m_age {nullptr};
};
```

Rules:

- a destructor takes **no parameters** and cannot be overloaded;
- it has no return type;
- a class has exactly one destructor.

### When the destructor runs

1. **A stack object goes out of scope** — end of a function or block;
2. **`delete` is applied to a heap object** — destructor first, then memory is freed;
3. **An object is passed by value** — the copy inside the function dies on return;
4. **A local object is returned by value** — an extra copy may be created and destroyed, though compilers often elide it (RVO), so you may not observe the call.

Case 3 carries a warning: the default copy is **member-wise and shallow**. If a member is a raw pointer, both objects point at the same heap block, and each destructor deletes it — a double free. Fixing this requires a user-defined copy constructor and copy assignment, or smart pointers (later chapters).

## Construction and destruction order

Creating several objects in one scope:

```cpp
Dog d1("one"), d2("two"), d3("three");
```

produces:

```text
Dog constructor called for one
Dog constructor called for two
Dog constructor called for three
Dog destructor called for three
Dog destructor called for two
Dog destructor called for one
```

**Constructors run in declaration order; destructors run strictly in reverse.** Think of stacking plates: the first placed is at the bottom, the last placed is removed first. The compiler enforces this because later objects may depend on earlier ones; destroying the dependants first avoids leaving dangling references behind.

## The this pointer

`this` is a pointer the compiler passes implicitly to every non-static member function; it points at **the object currently being operated on**. Three standard uses:

### 1. Printing the object's own address

```cpp
void print_info() const {
    std::cout << "object at " << this << "\n";
}
```

Without `this`, only the caller knows the address; with it, the member function can see its own object.

### 2. Disambiguating a parameter from a member

```cpp
void set_name(std::string_view name) {
    this->name = name;   // left: member, right: parameter
}
```

Writing `name = name;` assigns the parameter to itself. Some compilers accept it silently — the program compiles and runs, but no data changes. This is a genuinely dangerous bug precisely because nothing appears wrong.

### 3. Chained calls

Returning the current object from a setter allows calls to be chained:

```cpp
class Dog {
public:
    Dog* set_name(std::string_view n) {
        this->name = n;
        return this;
    }
    Dog* set_breed(std::string_view b) {
        this->breed = b;
        return this;
    }
    Dog* set_age(int a) {
        this->age = a;
        return this;
    }

private:
    std::string name;
    std::string breed;
    int age {0};
};

Dog* p = new Dog();
p->set_name("Fluffy")->set_breed("Shepherd")->set_age(4);
```

Returning a reference works too:

```cpp
Dog& set_name(std::string_view n) { this->name = n; return *this; }
```

The caller then uses `.`: `d.set_name("Fluffy").set_breed("Shepherd");`. The only difference is whether the handle is a pointer or a reference; the idea is the same — return yourself so the next call lands on the same object.

## Chapter summary

- `class` members are private by default; `struct` members are public.
- Members may be values or pointers, never references.
- Constructors have no return type and the class's name; declaring any constructor suppresses the implicit default, so use `= default` when you need it.
- Setters and getters must be public; getters are `const` and return copies by value.
- Multi-file layout: declarations plus include guards in the header, definitions in the `.cpp`, linked by `::`.
- Heap objects need `delete`; `->` is `(*p).`.
- Destructors take no parameters and cannot be overloaded; construction is in order, destruction in reverse.
- `this` points at the current object and serves address printing, name disambiguation and chaining.

## Comprehension check

**1. Why can the semicolon after a class definition not be omitted, and what happens if it is?**

Reference answer: A class definition is a declaration statement and, like `int x;`, must end with a semicolon. Without it the compiler treats the following statement as part of the class definition. If `int main() {` comes next, the diagnostic is typically "expected ';' after class definition" plus a cascade of errors that point at `main` rather than at the class. The practical lesson: when errors appear in a line that looks fine, check the preceding class definition for its semicolon.

**2. A class declares only `Cylinder(double, double)`. Why does `Cylinder c;` fail, and how do you restore the no-argument constructor?**

Reference answer: As soon as a user-declared constructor exists, the compiler no longer generates the implicit default constructor. `Cylinder c;` requires a no-argument constructor, but only the two-argument one exists, so the compiler reports `no matching function for call`. Either write `Cylinder() {}` explicitly, or write `Cylinder() = default;`. The latter states the intent and leaves optimisation opportunities open.

**3. `cylinder1.base_radius = 10;` fails with a private-access error, yet `volume()` reads the same member without trouble. Why?**

Reference answer: Access control is checked at the **location of the access**, relative to the class scope, not against the object. `volume()` is defined inside the class body, so it is within class scope and may touch every member, private included. `main()` is outside the class and may only use public members. That asymmetry is the point of encapsulation: internals are open to the class and closed to everyone else, who must go through a public interface such as a setter.

**4. A header has both an include guard and `#include "constants.h"`, yet a redefinition error still appears. Why?**

Reference answer: An include guard prevents the **same header file** from being included twice. If `main.cpp` includes `constants.h` and `cylinder.h` also includes it, that is the same file and the guard works. But if two different headers each **define** the same entity — for instance both declare `const double PI = ...;`, or both provide a function body — the guard cannot help, because they are different files. The result is a `redefinition` or multiple-definition error. The fix is to keep definitions in a `.cpp`, or use `inline constexpr` variables in C++17 and later.

**5. Why do constructors run forwards and destructors backwards?**

Reference answer: Objects may depend on objects created earlier, so construction must follow dependency order (dependencies first). Destruction must guarantee that dependants disappear before what they depend on; otherwise a dependant still holds a reference or pointer to something already destroyed and would touch dangling data. Hence destruction runs strictly in reverse. It is the rule of a stack: last in, first out.

**6. In `set_name(std::string_view name)`, what is the difference between `this->name = name;` and `name = name;`?**

Reference answer: `this->name` unambiguously names the member, while the right-hand `name` is the parameter, so the parameter is stored into the member. With `name = name;`, both sides resolve to the parameter — the local scope wins — so the parameter is assigned to itself and the member is untouched. Some compilers warn (`-Wself-assign`), but none is required to reject it. The program compiles, runs, and silently fails to update the object.

## Relation to neighbouring chapters

This chapter put data and behaviour into one type and settled object lifetimes. The next chapter compares `class` and `struct` defaults, examines object size and alignment, and then uses inheritance for the first time: building a new type on top of an existing one. Constructors, destructors and `this` are exactly the three tools the inheritance chapters keep reusing.
