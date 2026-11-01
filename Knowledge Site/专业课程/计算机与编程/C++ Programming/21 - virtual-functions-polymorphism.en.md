---
slug: "21-virtual-functions-polymorphism"
title: "Virtual Functions and Polymorphism: Dynamic Binding, Slicing and override"
summary: "virtual makes the call choose its version at run time from the real object; polymorphic objects grow because of the vtable pointer; storing derived objects by value in base containers slices them, references cannot be stored, pointers and smart pointers can; override catches signature mistakes, overloading and overriding hide each other; polymorphism can be established at any level; static members are not duplicated by inheritance; final restricts overriding and inheritance; default arguments bind statically and virtual destructors keep the whole chain alive."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, polymorphism, virtual-functions, object-slicing, override, final]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 21 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=96910s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

This is chapter 21 of the 31-hour course, covering **26:55:10–29:35:36**. The previous chapter ended with a counterexample: calling an ordinary function through a base pointer runs the base version. This chapter replaces that compile-time decision with a run-time one using `virtual`, and works through every consequence.

## What this chapter is about

One chain, `Shape → Oval → Circle`, runs through the whole chapter. The central question is: **how does a `Shape*` call the version belonging to the object it actually manages?**

The answer is one keyword, `virtual`. But that keyword drags in a chain of consequences:

- Why do objects suddenly get larger?
- Why does storing derived objects in a base array still call the base version?
- Why can references not be stored in a container while pointers can?
- What do `override` and `final` each protect against?
- Why do default arguments ignore polymorphism?
- Why must the destructor be virtual too?

These questions are the chapter.

## Timeline

| Time | Topic |
| --- | --- |
| 26:55 | `virtual` enables dynamic binding through base pointers and references |
| 27:05 | One `draw_shape` function for every shape; arrays of base pointers |
| 27:09 | Non-virtual functions do not participate: `get_x_rad` fails to compile |
| 27:14 | Size of polymorphic objects: the vtable pointer makes objects larger |
| 27:17 | Object slicing: assigning a derived object to a base object |
| 27:26 | Polymorphic objects in containers: slicing, references rejected, pointers work |
| 27:45 | `override` lets the compiler catch signature mistakes |
| 27:52 | Overloading, overriding and hiding |
| 28:07 | Polymorphism at different levels: Animal / Feline / Bird |
| 28:33 | Static members and inheritance: same-named statics are not independent |
| 28:49 | `final`: forbid further overriding, or forbid inheritance |
| 29:07 | Virtual functions with default arguments: arguments bind at compile time |
| 29:23 | Virtual destructors: deleting derived objects through base pointers |

## From static to dynamic binding

![Figure](/images/virtual-table-rich-en.svg)

*Figure：Class hierarchy, object and vtable, and the four steps of one call。*

```cpp
class Shape {
public:
    virtual void draw() const { std::cout << "Shape draw\n"; }
};

class Oval : public Shape {
public:
    void draw() const override { std::cout << "Oval draw\n"; }
};

class Circle : public Oval {
public:
    void draw() const override { std::cout << "Circle draw\n"; }
};

Shape* p = new Circle();
p->draw();   // Circle draw
```

One keyword changes everything:

- **Without virtual**, the compiler looks at the static type of `p` (`Shape*`) and calls `Shape::draw`.
- **With virtual**, the compiler emits a call resolved at run time from the dynamic type of the object, so `Circle::draw` runs.

The lecture calls this **dynamic binding** (also late binding, or polymorphism). Derived versions should also say `override` (below); it is optional but prevents signature mistakes.

### One function for every shape

With dynamic binding there is no need for one drawing function per shape:

```cpp
void draw_shape(const Shape* s) {
    s->draw();
}

// A reference parameter works too
void draw_shape_ref(const Shape& s) {
    s.draw();
}

draw_shape(&shape1);   // Shape draw
draw_shape(&oval1);    // Oval draw
draw_shape(&circle1);  // Circle draw
```

Containers behave the same way: store base pointers and one loop handles every derived type:

```cpp
std::vector<Shape*> shapes{&shape1, &oval1, &circle1};
for (const Shape* s : shapes) {
    s->draw();
}
```

This is the reason polymorphism exists: **write code against the base class, let behaviour follow the actual object.** Without it, a hundred shapes would need a hundred functions and a hundred containers.

### Non-virtual functions do not participate

```cpp
Shape* p = new Oval();
p->get_x_rad();   // compile error: Shape has no member named get_x_rad
```

`get_x_rad` is declared only in Oval and is not virtual. The compiler resolves the call from the static type `Shape*`, finds nothing, and reports an error. **Only functions declared virtual in the base class can be called polymorphically through a base pointer.**

## The price: objects get larger

Polymorphism is not free. To resolve calls at run time, the compiler gives every polymorphic object a pointer to its class's virtual function table (vtable). On the instructor's machine:

| Type | Polymorphism off | Polymorphism on |
| --- | --- | --- |
| Shape | 32 bytes | 40 bytes |
| Oval | 48 bytes | 56 bytes |
| Circle | — | 56 bytes |

(The exact numbers depend on the compiler and standard library, but "polymorphic objects are larger" is universal.)

The extra bytes are mostly the vtable pointer. The more objects you create and the smaller they are, the larger the relative overhead. So: **use virtual only where run-time polymorphism is genuinely needed**, not on every function out of habit.

## Object slicing

When a derived object is assigned **by value** to a base object, the derived part is cut off:

```cpp
Circle circle1(10, "circle one");
Shape shape1 = circle1;   // slicing: Circle and Oval parts discarded
shape1.draw();            // Shape draw, not Circle draw
```

The reason is space: `shape1` is only as large as a Shape and cannot hold the Oval and Circle members. The compiler copies the base layer and discards the rest. Nothing is "wrong" syntactically and no diagnostic appears, but **the polymorphic information is gone permanently**.

Slicing happens when:

- a derived object is assigned by value to a base object;
- a derived object is passed by value to a function taking a base object;
- a derived object is copied into a container of base objects.

### Three ways to store objects in a container

```cpp
std::vector<Shape> shapes;        // objects → slicing, all become Shape
shapes.push_back(circle1);        // only the Shape layer is copied

std::vector<Shape&> refs;         // compile error: references cannot be stored
std::vector<Shape*> ptrs;         // fine, polymorphism preserved
std::vector<std::shared_ptr<Shape>> smart;  // fine too
```

Three conclusions:

1. **Storing objects slices.** The container allocates space for the base size; the derived data does not fit.
2. **References cannot be stored.** Containers require element types to be assignable (left-assignable). A reference, once bound, cannot be rebound, so assigning to it modifies the referenced object rather than replacing the reference. C++ therefore forbids arrays of references.
3. **Pointers (raw or smart) work.** A base pointer aimed at a derived object is exactly the shape polymorphism was designed for.

Taking the address afterwards does not help:

```cpp
Shape sliced = circle1;        // derived part already lost
Shape* p = &sliced;
p->draw();                     // still Shape draw; the data no longer exists
```

## override: let the compiler check the signature

Suppose `draw` is mistyped as `Draw`:

```cpp
class Oval : public Shape {
public:
    void Draw() const { ... }   // a new function, not an override
};
```

This compiles. Oval gains an unrelated function called `Draw`, while `draw` remains the inherited `Shape::draw`. Every call through a base pointer skips the intended override, and nothing in the code looks wrong.

`override` exists for exactly this:

```cpp
class Oval : public Shape {
public:
    void draw() const override { ... }      // correct
    void Draw() const override { ... }      // compile error
};
```

The second line reports:

```text
error: 'void Oval::Draw() const' marked 'override' but does not override
```

**Whenever you intend to override a virtual function, write `override`.** It changes no behaviour; it turns a silent runtime bug into a compile error.

## Overloading, overriding and hiding

| Term | Where | Condition | Effect |
| --- | --- | --- | --- |
| overload | same scope | same name, different parameters | pick by arguments |
| override | derived vs base | same name, same signature, base function virtual | pick at run time by real object |
| hide | derived vs base | same name only | base members of that name become invisible |

The counter-intuitive part is that hiding beats overloading:

```cpp
class Shape {
public:
    virtual void draw() const { ... }
    virtual void draw(int color_depth) const { ... }   // overload
};

class Oval : public Shape {
public:
    void draw() const override { ... }   // overrides only the no-argument version
};

Oval o;
o.draw(44);   // compile error: Oval has only one draw()
```

Once Oval declares `draw()`, **every** same-named function in Shape is hidden, including `draw(int)`. To keep them:

- override `draw(int)` in Oval as well; or
- write `using Shape::draw;` inside Oval to reintroduce the base overloads.

Likewise, an overload introduced downstream, such as `Oval::draw(int, std::string)`, **does not participate in Shape polymorphism**: a `Shape*` cannot call it, because the base class has never heard of it.

**Rule: only functions declared in the base class and marked virtual take part in base-class polymorphism.**

## Polymorphism at different levels

Polymorphism need not start at the top. Consider:

```text
Animal
├─ Feline ── Dog, Cat
└─ Bird   ── Pigeon, Crow
```

`breathe` can be declared virtual at the Animal level and overridden by every animal — Animal polymorphism. `run` can be declared virtual at the Feline level and overridden only by felines — Feline polymorphism.

```cpp
Feline* f1 = new Dog();
Feline* f2 = new Cat();
f1->run();   // Dog::run
f2->run();   // Cat::run

Feline* bad = new Pigeon();   // compile error: a bird is not a feline
Feline* bad2 = new Animal();  // compile error: base cannot be stored in a derived-typed handle
```

**Polymorphism established at a level works at that level and below.** A Feline pointer cannot hold a Bird, and an Animal pointer cannot call a `run` that exists only in Feline. This gives real design freedom: there is no need to invent one common top interface for everything; establish polymorphism wherever behaviour is genuinely shared.

## Static members and inheritance

A static member belongs to the class, not to objects. Derived classes may use the base's static member, but they **do not automatically get an independent copy**:

```cpp
class Shape {
public:
    Shape() { ++m_count; }
    virtual int get_count() const { return m_count; }
    static int m_count;
protected:
    std::string m_description;
};
int Shape::m_count = 0;

class Ellipse : public Shape { /* no m_count of its own */ };

Shape s1, s2, s3;
Ellipse e1;
std::cout << Shape::m_count;     // 4
std::cout << Ellipse::m_count;   // 4 — the same variable
```

To count each type separately, declare a same-named static member in the derived class and override `get_count`:

```cpp
class Ellipse : public Shape {
public:
    Ellipse() { ++m_count; }
    int get_count() const override { return m_count; }
    static int m_count;
};
int Ellipse::m_count = 0;
```

Now `Shape::m_count` is 4 and `Ellipse::m_count` is 1. Calling `get_count()` through a base pointer is polymorphic: an object of type Shape reports 4, an Ellipse reports 1.

One subtlety: constructing an Ellipse runs the base constructor first, so **both** counters increase. If only the derived type should be counted, either do not increment again in the derived constructor or separate the two meanings in the design.

## final: two restrictions

**One, forbid further overriding of a virtual function:**

```cpp
class Feline : public Animal {
public:
    virtual void run() const { ... }
};

class Dog : public Feline {
public:
    void run() const final { ... }   // stops here
};

class Bulldog : public Dog {
public:
    void run() const override;       // compile error
};
```

**Two, forbid inheritance from a class:**

```cpp
class Cat final : public Feline { ... };

class WildCat : public Cat { ... };  // compile error: cannot derive from a final base
```

The lecture also shows two "legal but pointless" forms to mark the boundary:

- declaring a new virtual function inside a final class — nobody can inherit, so it can never be overridden;
- writing `virtual` and `final` together — virtual means "may be overridden", final means "must not be"; final wins and the function stays frozen.

Neither is rejected by the compiler, but both mislead readers.

## Virtual functions and default arguments

This is the most subtle trap in the chapter. Default arguments are filled in at **compile time** from the static type, while the function body is chosen at **run time** from the dynamic type. The two can come from different classes:

```cpp
class Base {
public:
    virtual double add(int a = 5, int b = 5) const { return a + b + 1; }
};

class Derived : public Base {
public:
    double add(int a = 10, int b = 10) const override { return a + b + 2; }
};
```

```cpp
Base* p = new Derived();
p->add();        // 12 = 5 + 5 + 2
Derived d;
d.add();         // 22 = 10 + 10 + 2
Base b;
b.add();         // 11 = 5 + 5 + 1
```

`p->add()` is the surprise: **the body comes from Derived (+2), the arguments from Base (5, 5)**. The compiler only saw `Base*` and inserted `5, 5` while compiling.

Conclusion: **default arguments always bind statically.** Mixing them with virtual functions produces results that are hard to explain; the lecture advises avoiding the combination entirely.

## Virtual destructors

Deleting a derived object through a base pointer requires a virtual destructor:

```cpp
class Animal {
public:
    virtual ~Animal() { std::cout << "Animal destructor\n"; }
};

class Feline : public Animal {
public:
    ~Feline() override { std::cout << "Feline destructor\n"; }
};

class Dog : public Feline {
public:
    ~Dog() override { std::cout << "Dog destructor\n"; }
};

Animal* p = new Dog();
delete p;   // Dog → Feline → Animal, all run
```

With a non-virtual destructor, `delete p` calls only `Animal::~Animal`. Two consequences:

1. **Resource leaks** — memory allocated by the derived layers is never released;
2. **Undefined behaviour** — deleting a derived object through a base pointer whose destructor is not virtual is undefined behaviour by the standard, and compilers may behave differently.

**Rule: if a class has any virtual function, make its destructor virtual too.** It costs almost nothing and prevents serious bugs.

## Chapter summary

- `virtual` enables dynamic binding: the call selects its version from the real object type.
- Only functions declared virtual in the base class participate; non-virtual calls resolve statically.
- Polymorphic objects grow because of the vtable pointer; polymorphism is not free.
- Storing derived objects by value in base objects or containers slices them; derived data is lost permanently.
- Containers cannot hold references (not assignable); pointers and smart pointers preserve polymorphism.
- Write `override` when overriding; it moves signature mistakes to compile time.
- Overriding one overload hides all base overloads of that name; use `using` or override each.
- Polymorphism can be established at any level, but only works at that level and below.
- Static members are not duplicated by inheritance; declare a same-named static in the derived class when separate counts are wanted.
- `final` forbids further overriding of a function, or inheritance from a class.
- Default arguments bind at compile time and interact badly with virtual functions.
- A class with virtual functions must have a virtual destructor.

## Comprehension check

**1. What changes in the generated call when `virtual` is added, and why does that make objects larger?**

Reference answer: Without virtual, the compiler determines the target at compile time and emits a direct call. With virtual, it no longer hard-codes the target: it follows the object's **vtable pointer** to the virtual function table for the object's type, indexes the right slot and calls through it, so the target is chosen at run time. The vtable pointer is one extra pointer stored in every polymorphic object, which raises `sizeof` (32→40 and 48→56 in the demo). Storing it is precisely what makes run-time lookup possible.

**2. What happens when a derived object is passed by value to a function taking a base object? What if the parameter becomes `const Base&`?**

Reference answer: Passing by value constructs a base object inside the function and copies only the base layer; the derived part is sliced off, so the function has no derived information and virtual calls land on the base version. With `const Base&`, no new object is created: the reference binds to the original derived object, virtual calls still resolve from the real type, and polymorphism is preserved. This is why polymorphic interfaces take references or pointers.

**3. Why does `std::vector<Base&>` fail to compile while `std::vector<Base*>` works?**

Reference answer: Container element types must be assignable (left-assignable), because the container needs to replace an element with `elem = new_value`. A reference cannot be rebound once bound; assigning to it modifies the referenced object rather than replacing the reference. So references fail the requirement and arrays of references are forbidden. A pointer is an assignable variable: assigning a new address merely points it elsewhere. Hence pointer containers are legal, and a base pointer aimed at a derived object preserves polymorphism exactly as intended.

**4. What problems do `override` and `virtual` solve, and why write both?**

Reference answer: `virtual` in the base declares "this function may be overridden at run time". `override` in the derived declares "I intend to override a base virtual function", and makes the compiler verify the signature; if no matching base virtual exists — a typo such as `Draw`, a missing `const`, a wrong parameter type — it reports an error. `virtual` alone gives polymorphism, but a typo silently creates a new function, and the symptom at run time is "polymorphism does not work", which is very hard to diagnose. Writing both enables polymorphism and lets the compiler guard the signature.

**5. In Oval only `draw()` is overridden. Why does `draw(int)` stop working on an Oval object, and how is it restored?**

Reference answer: Once a derived class declares a member named `draw`, it hides every member of that name in the base scope, regardless of parameters. `Shape::draw(int)` therefore becomes invisible in Oval, and `o.draw(44)` finds no match. Restore it either by overriding `draw(int)` in Oval, or with `using Shape::draw;` to reintroduce all base `draw` overloads into Oval's scope. Note that even after restoration, a call through `Shape*` still resolves `draw(int)` to the base version, because Oval does not override it.

**6. Is declaring `virtual void meow()` inside `class Cat final : public Feline` meaningful?**

Reference answer: No. Marking Cat final means no class may inherit from it, while `virtual` only matters because derived classes may override. Without derived classes the function can never be overridden, so `virtual` accomplishes nothing. The code compiles but misleads readers into thinking overriding is possible. Writing `virtual` and `final` together is equally contradictory: final wins and the function stays frozen at its current implementation.

**7. Why does `Base* p = new Derived(); p->add();` produce 12 rather than 22?**

Reference answer: `add` is virtual, so the function body is chosen from the dynamic type and `Derived::add` runs (+2). But default arguments are inserted at **compile time** from the static type: the compiler sees only `Base*` and uses `Base::add`'s defaults `5, 5`. The result is $5+5+2=12$. Calling directly on a Derived object makes the static type Derived, so the defaults are `10, 10` and the result is 22. Default arguments simply do not participate in dynamic binding.

**8. What happens if the base destructor is not virtual and `delete base_ptr` is executed?**

Reference answer: The compiler resolves the call from the static type and runs `Base::~Base` only; the derived destructors never execute. Two consequences follow: resources acquired by the derived layers (heap memory, file handles) are never released, and the standard declares "deleting a derived object through a base pointer with a non-virtual destructor" to be undefined behaviour, so behaviour varies by compiler and may crash or appear to work. Any class with virtual functions should therefore declare a virtual destructor.

## Relation to neighbouring chapters

This chapter established run-time polymorphism and its boundaries: non-virtual functions, by-value storage and default arguments all stay static. The next chapter extends the same machinery: `dynamic_cast` turns a base pointer back into a derived pointer safely, pure virtual functions define abstract classes, and a class with only pure virtual functions and no member variables describes an interface.
