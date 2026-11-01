---
slug: "20-inheritance-constructors-scope"
title: "Construction, Copying and Name Hiding under Inheritance"
summary: "Reviving members hidden by private inheritance with using declarations; derived objects are constructed in layers from base to most derived, and custom constructors forward arguments through initialiser lists; copy constructors should slice with Base(source) to reuse the base version; base constructors can be inherited but only initialise the base part; destruction runs in reverse; same-named members hide the base version and need Parent:: to reach it."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, inheritance, constructors, copy-constructor, name-hiding]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 20 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=87986s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

This is chapter 20 of the 31-hour course, covering **24:26:26–26:55:10**. The previous chapter settled the access rules of inheritance; what is still missing is how a derived object is born correctly: construction order, forwarding arguments to the base, reusing copy logic, and destruction.

## What this chapter is about

Along one chain, `Person → Engineer → CivilEngineer`, six questions are answered in order:

1. After private inheritance seals everything, how do you reopen a few members?
2. In what order do the constructors of a three-level object run?
3. How does a derived class hand arguments to the base constructor?
4. When copying a derived object, how is the base copy constructor reused?
5. Can a derived class simply inherit the base constructors?
6. When derived and base declare the same name, which one is used?

The last question leads straight to static binding and sets up the virtual functions of the next chapter.

## Timeline

| Time | Topic |
| --- | --- |
| 24:26 | Reviving hidden members with `using`; private base members cannot be revived |
| 24:46 | Default construction order: base first, derived after |
| 24:57 | Custom constructors: call the base constructor in the initialiser list |
| 25:18 | Two wrong approaches: assignment in the body, base members in the initialiser list |
| 25:26 | Copy construction and inheritance: what member-wise copy does not solve |
| 25:31 | The correct form `Person(source)`: slice, then reuse the base copy constructor |
| 25:52 | `using Person::Person`; copy constructors are not inherited |
| 26:05 | Destruction order is the reverse of construction |
| 26:12 | Name hiding and explicit `Parent::` calls |
| 26:21 | Static binding: why a base pointer calls the base version |

## Reviving members with using

From the previous chapter: `Engineer : private Person` demotes Person's public and protected members to private members of Engineer, so `CivilEngineer` cannot reach them at all. If a few of them should still travel downstream, a `using` declaration in the derived class brings them back:

```cpp
class Engineer : private Person {
public:
    void do_something() const { std::cout << "Engineer work\n"; }

protected:
    using Person::get_full_name;   // revived as protected
    using Person::get_age;
    using Person::get_address;
};
```

Three rules:

1. **The revived access level is the section the `using` sits in.** Under `public:` it is public; under `protected:` it is protected.
2. **Only members the base already lets derived classes see can be revived.** If a member is private upstream, `using Person::m_address` fails to compile — the name is not even visible, so there is nothing to revive.
3. **A `using` on a function name brings back every overload.** `using Person::add;` restores both `add(int,int)` and `add(int,int,int)` at once.

The lecture is sceptical of the technique: private inheritance exists to cut the chain, and reopening members one by one makes the design hard to predict. **If those members were meant to travel downstream, public or protected inheritance would have been the honest choice.**

## Construction order: base to derived

```cpp
class Person {
public:
    Person() { std::cout << "Person default constructor\n"; }
};

class Engineer : public Person {
public:
    Engineer() { std::cout << "Engineer default constructor\n"; }
};

class CivilEngineer : public Engineer {
public:
    CivilEngineer() { std::cout << "CivilEngineer default constructor\n"; }
};

CivilEngineer ce1;
```

Output:

```text
Person default constructor
Engineer default constructor
CivilEngineer default constructor
```

The nesting explains it: a CivilEngineer needs an Engineer subobject, which needs a Person subobject. Construction therefore proceeds bottom-up, layer by layer.

**If a derived constructor does not name a base constructor, the compiler calls the base's default constructor.** That creates a practical requirement: **every class in the chain should provide a default constructor**, or every derived class must explicitly call some base constructor. Otherwise the first attempt to create an object fails:

```text
error: no matching function for call to 'Person::Person()'
```

## Custom constructors: forwarding through the initialiser list

Passing name, age, address and contract count in one go:

```cpp
class Person {
public:
    Person(std::string_view full_name, int age, std::string_view address)
        : m_full_name{full_name}, m_age{age}, m_address{address} {}
    // ...
};

class Engineer : public Person {
public:
    Engineer(std::string_view full_name, int age, std::string_view address,
             int contract_count)
        : Person(full_name, age, address), m_contract_count{contract_count} {}
    // ...
};

class CivilEngineer : public Engineer {
public:
    CivilEngineer(std::string_view full_name, int age, std::string_view address,
                  int contract_count, std::string_view speciality)
        : Engineer(full_name, age, address, contract_count), m_speciality{speciality} {}
    // ...
};
```

The first entry in the initialiser list, `Person(...)` or `Engineer(...)`, **calls the base constructor**; it is not an assignment. Arguments travel up the chain, and each layer initialises only its own part.

### Two wrong approaches

**Wrong approach one: assigning base members in the constructor body.**

```cpp
CivilEngineer::CivilEngineer(std::string_view fn, int age, std::string_view addr, ...) {
    m_full_name = fn;    // fine if public
    m_age = age;         // fine if protected
    m_address = addr;    // error: private to Person
}
```

Even when the first two compile, `m_address` can never be written. Worse, the base constructor was never invoked with real data, so the base part was default-constructed and the information is lost.

**Wrong approach two: naming base members in the initialiser list.**

```cpp
CivilEngineer::CivilEngineer(...)
    : m_full_name{fn}, m_age{age}, m_address{addr}   // all errors
{}
```

The error reads `CivilEngineer does not have any field called m_full_name`. **An initialiser list may only initialise members declared by the current class.** `m_full_name` belongs to Person; CivilEngineer has no right to initialise it and must ask the base to do so — by calling the base constructor.

## Copy construction and inheritance

The default copy is member-wise. For classes without raw pointers that usually works:

```cpp
Engineer e1("Daniel", 41, "Some address", 12);
Engineer e2 = e1;   // default copy: member by member
```

The problem appears when a user-defined copy constructor is needed (for instance because the class allocates memory). Start with the base:

```cpp
Person::Person(const Person& source)
    : m_full_name{source.m_full_name},
      m_age{source.m_age},
      m_address{source.m_address} {}
```

Then write the derived one. There are three ways; only the third is right.

**Option one: initialise only the derived members.**

```cpp
Engineer::Engineer(const Engineer& source)
    : m_contract_count{source.m_contract_count} {}
```

The base part is built by **Person's default constructor**, so name, age and address become defaults (`"None"`, `0`). The data is silently lost.

**Option two: call the base's ordinary constructor with individual members.**

```cpp
Engineer::Engineer(const Engineer& source)
    : Person{source.m_full_name, source.m_age, source.get_address()},
      m_contract_count{source.m_contract_count} {}
```

This compiles (using a getter for the private address), but it builds a **temporary Person object** and copies from it, and it bypasses the Person copy constructor entirely — duplicating the copy logic.

**Option three: pass the whole derived object and let the compiler slice.**

```cpp
Engineer::Engineer(const Engineer& source)
    : Person{source},                       // slice: take only the Person layer
      m_contract_count{source.m_contract_count} {}
```

`source` is an Engineer while `Person`'s copy constructor wants `const Person&`. The compiler sees the Person subobject inside Engineer and passes exactly that layer, which matches the copy constructor. No temporary, no duplicate code, and the base logic is reused.

The same pattern for three levels:

```cpp
CivilEngineer::CivilEngineer(const CivilEngineer& source)
    : Engineer{source},                     // slice to Engineer, reuse its copy constructor
      m_speciality{source.m_speciality} {}
```

## Inheriting base constructors

Since C++11 one declaration can pull the base constructors into a derived class:

```cpp
class Engineer : public Person {
public:
    using Person::Person;   // inherit every Person constructor
    // ...
};
```

The compiler generates matching Engineer constructors that simply forward their arguments to Person. They **do not initialise Engineer's own members**.

```cpp
Engineer e1("Daniel", 41, "Some address");   // works; m_contract_count stays default
```

Limits worth knowing:

- **Copy and move constructors are not inherited.** Write them yourself if needed.
- **The access level follows the base declaration.** public stays public; protected is usable only inside derived classes.
- **Only the base part is initialised**; derived members keep their defaults.

The lecture's verdict: possible, but not recommended. A hand-written constructor is clearer, because the inherited one creates the illusion that it initialises the derived object. Reading someone else's code, at least know that it only covers the base layer.

## Destruction runs in reverse

```cpp
CivilEngineer ce1;
```

prints:

```text
Person constructor
Engineer constructor
CivilEngineer constructor
CivilEngineer destructor
Engineer destructor
Person destructor
```

Construction bottom-up, destruction top-down: the last thing constructed is destroyed first. The reason matches chapter 18 — a derived layer may depend on base data, so dependants must be torn down first.

## Same-named members: hiding and explicit calls

A derived class may declare a member with the same name as one in the base:

```cpp
class Parent {
public:
    void print_var() const { std::cout << "Parent: " << m_var << "\n"; }
protected:
    int m_var{100};
};

class Child : public Parent {
public:
    void show() const {
        std::cout << "Child: " << m_var << "\n";          // Child's m_var
        std::cout << "Parent: " << Parent::m_var << "\n"; // explicit base version
    }
protected:
    int m_var{1000};
};
```

Rule: **a derived member hides the same-named base member.** Inside `Child`, `m_var` is `m_var{1000}`; `Parent::m_var` reaches the base copy.

Member functions behave the same way:

```cpp
Child c;
c.print_var();          // if Child has none, Parent's is used
c.Parent::print_var();  // always available, explicitly the base version
```

Keep three terms apart:

- **overload**: same scope, same name, different parameters;
- **hide**: a derived member shadows a base member of the same name, regardless of parameters;
- **override**: a derived class rewrites a **virtual** base function with the same signature — the next chapter's topic.

Once a derived class declares one function of a given name, **all** base overloads of that name are hidden; `using Parent::func;` brings the whole set back (the same mechanism used earlier to revive members).

## The setup for static binding

The chapter closes by comparing a direct call with a call through a base pointer:

```cpp
class Shape {
public:
    void draw() const { std::cout << "Shape draw\n"; }
};
class Oval : public Shape {
public:
    void draw() const { std::cout << "Oval draw\n"; }
};

Oval oval;
Shape* p = &oval;
p->draw();   // prints Shape draw
```

Although `p` points at an Oval, `Shape::draw` runs. The compiler looks only at the **static type of the pointer** (`Shape*`) and binds the call at compile time. This is **static binding**.

Making the call follow the actual object needs virtual functions and dynamic binding — the entire content of the next chapter. For now, the point is the default behaviour: **without `virtual`, polymorphism does not happen.**

## Chapter summary

- `using Base::name` revives members hidden by private inheritance; the level is set by the section it appears in; private base members cannot be revived; a function name brings all its overloads.
- Construction order is base → intermediate → derived; without an explicit choice the base default constructor runs.
- Custom constructors call the base constructor in the initialiser list and forward arguments layer by layer.
- An initialiser list can only initialise members of the current class; base members are the base constructor's job.
- A derived copy constructor should use `Base{source}` to slice and reuse the base copy constructor.
- `using Base::Base` inherits base constructors, but only initialises the base part and does not inherit copy construction.
- Destruction is the reverse of construction.
- Same-named members hide base versions; use `Parent::` to reach them, and remember that hiding covers all overloads.
- Without virtual functions, a call through a base pointer runs the base version (static binding).

## Comprehension check

**1. What is the difference between placing `using Person::get_full_name;` under `protected:` and under `public:`? Why can `using Person::m_address;` not be written at all?**

Reference answer: A `using` declaration introduces the member into the derived class with the access level of the section it appears in. Under protected, derived classes (and their derived classes) may use it while outsiders may not; under public it is fully visible. For `m_address`: if it is private in Person, its name is not visible outside Person's scope, so `using` has nothing to refer to and compilation fails. `using` adjusts the level of members that derived classes can already access; it cannot break through private.

**2. Why does `using Person::add;` bring back both `add` overloads at once? Can a single overload be revived on its own?**

Reference answer: `using` targets a **name**, not a signature. `using Person::add;` introduces every declaration named `add` from Person's scope, so both `add(int,int)` and `add(int,int,int)` return. The standard provides no syntax for importing a single overload; to keep just one, either write a forwarding function in the derived class or give the overloads distinct names in the base.

**3. When a CivilEngineer is constructed, why must Person's constructor run first?**

Reference answer: A CivilEngineer contains an Engineer subobject, which contains a Person subobject. An object cannot be constructed before its subobjects are ready, otherwise the derived constructor could read uninitialised base data. The compiler therefore enforces deepest base → intermediate → most derived. Conversely, destruction must run in the opposite order, tearing down the dependent derived layers first.

**4. Why does `m_address = addr;` fail inside a CivilEngineer constructor body, and why does putting `m_address` in the initialiser list also fail?**

Reference answer: The two failures differ. Assignment in the body fails because `m_address` is private in Person and a CivilEngineer member function has no access, producing `is private within this context`. Putting it in the initialiser list fails because an initialiser list may only initialise **members declared by the current class**; `m_address` belongs to Person, CivilEngineer has no such field, and the compiler says `does not have any field called m_address`. The correct form calls `Person(full_name, age, address)` in the initialiser list and lets Person initialise its own members.

**5. Why is `Engineer::Engineer(const Engineer& source) : Person{source}, ...` considered optimal? How does it differ essentially from `Person{source.m_full_name, ...}`?**

Reference answer: `Person{source}` passes the whole Engineer object to a `const Person&` parameter, and the compiler slices out the Person subobject, which matches Person's copy constructor exactly. The base copy logic is reused and no temporary is created. The other form calls Person's ordinary three-argument constructor: it must read three members, build a temporary Person and copy from it, and it re-implements the copy logic. If Person's copy behaviour changes later, that version will not follow.

**6. When a derived class has a member named like a base member, which one does `m_var` mean inside the derived member function, and how do you reach the other?**

Reference answer: Derived scope wins, so `m_var` means the derived member and the base one is hidden. The base version is reached with `Parent::m_var` (or `obj.Parent::m_var` outside the class). Member functions behave identically: once a derived class declares a function with that name, every base overload of the name is hidden, and `using Parent::func;` is needed to bring the set back. This hiding is distinct from overriding: it depends only on the name, not on signatures or virtual.

**7. After `using Person::Person;`, what does `m_contract_count` hold in `Engineer("Daniel", 41, "addr")`, and why?**

Reference answer: It holds its default value (say 0), not anything derived from the arguments. An inherited constructor is only a forwarder: it passes its arguments to Person's constructor to build the base subobject, while Engineer's own members are default-initialised. That is exactly the illusion the lecture warns about — the constructor looks like it initialises the derived object but only covers the base part.

## Relation to neighbouring chapters

This chapter completed the lifecycle of inheritance: construction, copying, destruction, and telling same-named members apart. It also exposed a limit of the default behaviour — calling a non-virtual function through a base pointer runs the base version. The next chapter introduces `virtual`, replacing compile-time static binding with run-time dynamic binding: polymorphism.
