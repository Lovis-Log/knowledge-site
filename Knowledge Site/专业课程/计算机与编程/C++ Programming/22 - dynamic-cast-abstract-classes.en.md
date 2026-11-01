---
slug: "22-dynamic-cast-abstract-classes"
title: "dynamic_cast, Abstract Classes and Interfaces"
summary: "dynamic_cast safely turns a base pointer or reference into a derived type at run time, returning nullptr on failure for pointers and throwing for references; virtual calls inside constructors and destructors only reach the current layer; pure virtual functions make a class abstract and force every derived class to implement them; a class with only pure virtual functions and no member variables is an interface."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, dynamic-cast, abstract-class, pure-virtual, interface, typeid]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 22 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=106536s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

This is chapter 22, the final chapter of the 31-hour course, covering **29:35:36–31:07:05**. It closes the boundaries of polymorphism: how to turn a base pointer back into a derived pointer safely, why polymorphism is unavailable during construction and destruction, how pure virtual functions define abstract classes, and how to package a capability as a reusable interface.

## What this chapter is about

The previous chapter covered "call the derived version through a base pointer". Real code also needs the opposite direction:

1. You hold an `Animal*` but need to call an ordinary function that only `Dog` has.
2. You want a base class that is pure contract with no implementation, and nobody should be able to instantiate it.

The first need is `dynamic_cast`; the second is pure virtual functions and abstract classes. The chapter ends by combining them into the standard C++ approximation of an interface.

## Timeline

| Time | Topic |
| --- | --- |
| 29:35 | `dynamic_cast`: base pointer to derived pointer, `nullptr` on failure |
| 29:41 | Reference casts: failure throws `std::bad_cast`, no check possible |
| 29:43 | Reference-to-pointer casts for safe checking; typical function parameters |
| 29:44 | Overusing downcasts signals a design problem |
| 30:05 | `dynamic_cast` only applies to polymorphic types |
| 30:08 | Never call virtual functions from constructors or destructors |
| 30:24 | Pure virtual functions and abstract classes: `= 0` |
| 30:36 | `typeid` to inspect the dynamic type |
| 30:43 | Interfaces: abstract classes with only pure virtual functions |
| 30:53 | The StreamInsertable interface: making any type printable with `std::cout` |

## dynamic_cast: safe downcasting

### The pointer form

```cpp
class Animal {
public:
    virtual void breathe() const {}
    virtual ~Animal() = default;
};

class Feline : public Animal {
public:
    void do_some_feline_thing() const { /* exists only in Feline */ }
};

Animal* animal = new Feline();

Feline* f = dynamic_cast<Feline*>(animal);   // succeeds, same object
if (f) {
    f->do_some_feline_thing();               // non-virtual call now allowed
}

Dog* d = dynamic_cast<Dog*>(animal);         // fails, returns nullptr
if (!d) {
    std::cout << "cast to Dog failed\n";
}
```

Key points:

- Failure yields a **null pointer**, so the result must be checked;
- Success keeps the **same object**, only the pointer's type changes, which is what allows calling derived-specific non-virtual functions;
- Success depends on the object's **dynamic type**, not the pointer's static type. `animal` really points at a Feline, so casting to Feline succeeds and casting to Dog fails.

### The reference form

```cpp
Animal& animal_ref = *animal;
Feline& fref = dynamic_cast<Feline&>(animal_ref);   // succeeds
Dog& dref = dynamic_cast<Dog&>(animal_ref);         // fails, throws std::bad_cast
```

There is no such thing as a null reference, so failure can only be reported by throwing `std::bad_cast`. Consequences:

- no `if` check is possible;
- the exception propagates up the call stack and terminates the program if uncaught.

**Practical advice: prefer the pointer form whenever failure is possible.** If only a reference is available, take its address first:

```cpp
Feline* fp = dynamic_cast<Feline*>(&animal_ref);
if (fp) {
    fp->do_some_feline_thing();
} else {
    std::cout << "cast failed\n";
}
```

This keeps the reference-style parameter while regaining a checkable failure signal.

### The typical setting: function parameters

Downcasting most often appears where a function takes a base type but needs a derived interface:

```cpp
void do_something_with_animal(Animal* animal) {
    if (Feline* f = dynamic_cast<Feline*>(animal)) {
        f->do_some_feline_thing();
    } else {
        std::cout << "not a feline\n";
    }
}

void do_something_with_animal(Animal& animal) {
    if (Feline* f = dynamic_cast<Feline*>(&animal)) {
        f->do_some_feline_thing();
    } else {
        std::cout << "not a feline\n";
    }
}
```

The lecture adds an important warning: **if you keep needing downcasts to call some function, the design is probably wrong.** The cleaner fix is to make that function virtual and let polymorphism dispatch it, instead of casting on every call.

### Polymorphic types only

`dynamic_cast` relies on run-time type information, which exists only for **classes with virtual functions**. Using it across unrelated types fails to compile:

```cpp
int data = 45;
// std::string s = dynamic_cast<std::string>(data);      // error: target is not a pointer or reference
// std::string* sp = dynamic_cast<std::string*>(&data);  // error: int is not polymorphic
```

Rule: **source and target must belong to the same polymorphic inheritance hierarchy, and the cast moves along that hierarchy.**

## typeid: inspecting the dynamic type

```cpp
Animal* p = new Rectangle(10, 10);
std::cout << typeid(*p).name() << "\n";   // e.g. "9Rectangle"
```

`typeid(*p)` yields the **dynamic type** (the dereference makes the difference); `typeid(p)` would give the static type `Animal*`. When debugging polymorphic code this is more informative than printing an address.

Note that `name()` is implementation-defined — GCC prefixes a length — so never use it as a stable string in program logic.

## Virtual calls during construction and destruction

A rule to memorise: **never call virtual functions from constructors or destructors.**

```cpp
class Base {
public:
    Base() {
        setup();              // calls Base::setup
    }
    virtual ~Base() {
        cleanup();            // calls Base::cleanup
    }
    virtual void setup()   { m_value = 10; }
    virtual void cleanup() { std::cout << "Base cleanup\n"; }
    int get_value() const { return m_value; }
protected:
    int m_value{0};
};

class Derived : public Base {
public:
    void setup() override   { m_value = 100; }
    void cleanup() override { std::cout << "Derived cleanup\n"; }
};

Base* p = new Derived();
std::cout << p->get_value();   // prints 10, not 100
```

The construction order explains it:

1. Constructing a Derived first constructs the Base subobject;
2. While Base's constructor runs, the Derived part **does not exist yet**;
3. Allowing dynamic dispatch there would call a member function on an object not yet constructed — undefined behaviour;
4. The standard therefore specifies that during construction or destruction, virtual calls resolve only to **the layer currently being constructed or destroyed**.

Destruction mirrors this: when `Base::~Base` runs, the Derived part has already been destroyed, so only the Base version is reachable.

The lecture's remedy is to call `setup()` / `cleanup()` explicitly after construction and before destruction:

```cpp
Base* p = new Derived();
p->setup();      // object complete, dynamic binding works, m_value becomes 100
// ... use ...
p->cleanup();    // dynamic binding works, Derived::cleanup runs
delete p;
```

## Pure virtual functions and abstract classes

Consider a `Shape` base: it can declare "compute the perimeter" and "compute the area" but cannot implement either, because it does not know whether the shape is a circle, a rectangle or a triangle.

```cpp
class Shape {
public:
    Shape() = default;
    explicit Shape(std::string_view description) : m_description{description} {}
    virtual ~Shape() = default;

    virtual double perimeter() const = 0;   // pure virtual
    virtual double surface() const = 0;     // pure virtual

protected:
    std::string m_description;
};
```

`= 0` marks a **pure virtual function**: a declaration with no implementation in this class. Three consequences:

1. `Shape` becomes an **abstract class** and cannot be instantiated:

```cpp
// Shape s;              // error: object of abstract class type is not allowed
Shape* p = new Shape();  // same error
```

2. Every derived class **must implement all pure virtual functions**, otherwise it is abstract too:

```cpp
class Rectangle : public Shape {
public:
    double perimeter() const override { return 2 * (m_width + m_height); }
    double surface() const override { return m_width * m_height; }
private:
    double m_width{0}, m_height{0};
};

class Circle : public Shape {
public:
    double perimeter() const override { return 2 * PI * m_radius; }
    double surface() const override { return PI * m_radius * m_radius; }
private:
    double m_radius{0};
};
```

If `Circle` implemented only `surface`, creating a `Circle` object would fail with `object of abstract class type is not allowed` — not because Circle wrote `= 0`, but because it left an inherited pure virtual unimplemented.

3. An abstract class **may** still have constructors, used by derived classes to build the base subobject; it simply cannot be instantiated from outside.

The value of an abstract class is that it encodes "every shape must be able to report perimeter and area" in the type system, so no incomplete derived class can compile. Base pointers still work:

```cpp
std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Rectangle>(10, 10));
shapes.push_back(std::make_unique<Circle>(5));

for (const auto& s : shapes) {
    std::cout << s->surface() << "\n";   // polymorphic dispatch
}
```

### Can a pure virtual function have a definition?

Yes, but only outside the class, and the class remains abstract:

```cpp
// Shape.cpp
double Shape::perimeter() const { return 0; }   // legal; derived classes must still override
```

The common mistake is writing the body inside the class: `virtual double perimeter() const = 0 { return 0; }` reports `pure specifier on function definition`, because `= 0` means "no implementation here".

## Interfaces: abstract classes of pure virtual functions

The lecture defines an interface as:

> An abstract class containing only pure virtual functions and no member variables.

```cpp
class StreamInsertable {
    friend std::ostream& operator<<(std::ostream& out, const StreamInsertable& operand) {
        operand.stream_insert(out);
        return out;
    }

public:
    virtual void stream_insert(std::ostream& out) const = 0;
    virtual ~StreamInsertable() = default;
};
```

This interface does exactly one thing: let any type that inherits from it be printed with `std::cout << obj`.

### How it works

1. `operator<<` is a friend of the interface and accepts any `StreamInsertable` reference;
2. It calls `operand.stream_insert(out)`, a pure virtual function dispatched at run time to the real type;
3. A derived class implements `stream_insert` and automatically gains `<<`, **without writing its own output operator**.

```cpp
class Point : public StreamInsertable {
public:
    Point(double x, double y) : m_x{x}, m_y{y} {}

    void stream_insert(std::ostream& out) const override {
        out << "Point[x:" << m_x << ", y:" << m_y << "]";
    }

private:
    double m_x{0};
    double m_y{0};
};

Point p{10, 20};
std::cout << p << "\n";   // Point[x:10, y:20]
```

`Point` has no `operator<<` of its own, yet it prints — the capability comes from the interface.

### Attaching the interface to a hierarchy

```cpp
class Animal : public StreamInsertable {
public:
    void stream_insert(std::ostream& out) const override {
        out << "Animal[" << m_description << "]";
    }
protected:
    std::string m_description;
};
```

Every derived layer must implement `stream_insert` (otherwise that layer stays abstract) and print its own data. Printing through a base pointer dispatches to the most specific layer:

```cpp
std::vector<std::shared_ptr<Animal>> animals;
animals.push_back(std::make_shared<Dog>("dog one"));
animals.push_back(std::make_shared<Cat>("cat one"));

for (const auto& a : animals) {
    std::cout << *a << "\n";   // each in its own format
}
```

That is the use of an interface: **extract one capability (printable, comparable, serialisable) into an abstract class, and any type that inherits it acquires that capability**, without reimplementing it in every class.

## Chapter summary

- `dynamic_cast` converts base pointers or references to derived types at run time; pointers return `nullptr` on failure, references throw `std::bad_cast`.
- Always check the result; prefer the pointer form when failure is possible.
- Downcasting only applies to polymorphic types (hierarchies with virtual functions).
- Frequent downcasting signals a design problem: consider making that function virtual.
- During construction and destruction, virtual calls resolve only to the current layer, so never call virtual functions there.
- Pure virtual functions (`= 0`) make a class abstract; derived classes must implement all of them or remain abstract.
- Abstract classes cannot be instantiated but can still be used through base pointers.
- An interface is an abstract class with only pure virtual functions and no member variables; inheriting it grants the capability.
- `typeid` reveals the dynamic type, but `name()` is implementation-defined.

## Comprehension check

**1. What does `dynamic_cast<Derived*>(base_ptr)` return on failure, and what happens with `dynamic_cast<Derived&>(base_ref)`?**

Reference answer: The pointer form returns `nullptr`, so the caller must test it. The reference form throws `std::bad_cast`, because there is no null reference to test; if nobody catches it, the program terminates. Both succeed under the same condition: the object's dynamic type is the target type or a type derived from it.

**2. Why does the lecture recommend downcasting through pointers rather than references?**

Reference answer: A pointer can represent the failure state (null), letting the caller branch with `if` and choose a fallback. A reference must bind to a valid object, so failure can only be an exception, which is expensive for what is often an optional capability and makes control flow harder to follow. If only a reference is at hand, take its address with `&ref` and cast that to a pointer: the reference-style parameter is preserved and a checkable failure signal is regained.

**3. Can `dynamic_cast` turn an `int*` into a `std::string*`? Why or why not?**

Reference answer: No. `dynamic_cast` depends on run-time type information, which exists only for classes with virtual functions. `int` is not polymorphic, and `int*` and `std::string*` are not in the same hierarchy, so compilation fails (target is not a class pointer, or the source is not polymorphic). Its only designed use is moving within one polymorphic hierarchy from a base type to a derived type.

**4. Why does calling the virtual `setup()` inside Base's constructor execute `Base::setup` rather than `Derived::setup`?**

Reference answer: Constructing a Derived first constructs the Base subobject; while Base's constructor runs, the Derived part is not initialised. Allowing dynamic dispatch there would call a Derived member function on an object that is not yet a Derived, touching uninitialised data — undefined behaviour. The standard therefore specifies that during construction or destruction, virtual calls resolve only to the layer currently being constructed or destroyed. Destruction mirrors this: when `Base::~Base` runs, the Derived part is gone, so only the Base version exists. Call such functions explicitly after construction and before destruction instead.

**5. A derived class implements only one of the two inherited pure virtual functions. What happens, and what does the error look like?**

Reference answer: The derived class remains abstract because it still carries an unimplemented pure virtual function. Attempting to instantiate it reports `object of abstract class type 'Circle' is not allowed`, plus a note that the listed virtual functions are pure within Circle. The error appears at the **use site**, not at the missing implementation, which is why beginners are confused — they never wrote `= 0`. Implementing all inherited pure virtual functions fixes it.

**6. Can a pure virtual function have an implementation? How is it written legally?**

Reference answer: Yes, but not at the in-class declaration. `virtual double perimeter() const = 0 { return 0; }` reports `pure specifier on function definition`, because `= 0` means "no implementation here". The legal form defines it outside the class: `double Shape::perimeter() const { return 0; }`. Even then Shape stays abstract and derived classes must still override the function; the base body only runs if a derived class explicitly calls `Shape::perimeter()`.

**7. By the lecture's definition, what makes a class an interface, and why does inheriting one remove the need to write `operator<<`?**

Reference answer: An interface is an abstract class containing only pure virtual functions and no member variables (a virtual destructor does not count as a member variable). `StreamInsertable` implements `operator<<` as a friend that does one thing: call `operand.stream_insert(out)`. Since `stream_insert` is pure virtual, the call dispatches at run time to the real type. A derived class that implements `stream_insert` therefore gets `operator<<` for free, and no per-class output operator is needed. The essence of an interface is extracting a capability so that inheritance grants it.

## Relation to neighbouring chapters

This chapter marks the edge of the inheritance-and-polymorphism block: dynamic type conversion, abstract contracts and interfaces. The course has now covered the full chain from variables, control flow, pointers and functions to classes, inheritance, polymorphism and abstract design. Templates, smart pointers, exceptions and the standard containers all build on these ideas; looking back at abstract classes and interfaces makes it easier to see why the standard library models capabilities such as "streamable" and "comparable" as separate type requirements.
