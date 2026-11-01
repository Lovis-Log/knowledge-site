---
slug: "19-structs-sizes-inheritance-basics"
title: "Structs, Object Size and First Steps in Inheritance"
summary: "The only difference between struct and class is the default access level; object size is determined by member variables and affected by alignment; inheritance embeds a base-class subobject inside each derived object, public inheritance preserves visibility, protected lets derived classes in while keeping outsiders out, and private inheritance demotes everything it inherits."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [cpp, struct, object-size, inheritance, access-specifiers]
sources:
  - kind: video
    title: "C++ Programming Course - Beginner to Advanced（第 19 章）"
    url: "https://www.youtube.com/watch?v=8jLOx1hD3_o&t=81211s"
    author: "Daniel Gakwaya, freeCodeCamp.org"
    publishedAt: 2022-02-17
---

This is chapter 19 of the 31-hour course, covering **22:33:31–24:26:26**. It closes two loose ends about classes — `struct` versus `class`, and object size — and then builds inheritance from the ground up: how a base class is embedded in a derived object, and how the three access specifiers change visibility.

## What this chapter is about

Three questions, in order:

1. What actually separates `struct` from `class`? Only the default access level.
2. How large is an object in memory? The sum of its member variables plus alignment padding; functions do not count.
3. How does inheritance work? A derived object **contains a base-class subobject**, stacked like nested boxes.

The third point is the spine of the chapter. Once you accept that "the base part is a real subobject inside the derived object", everything that follows — access rules, construction order, object slicing — has a physical explanation.

## Timeline

| Time | Topic |
| --- | --- |
| 22:33 | `struct` versus `class`: different defaults, otherwise identical |
| 22:35 | Modelling a Point with a struct: a lightweight data type |
| 22:42 | Object size: sum of members; pointers do not count what they point to |
| 22:44 | Alignment padding makes objects slightly larger than the sum |
| 22:52 | Why inheritance: person → engineer → civil engineer |
| 22:56 | First inheritance: `class Player : public Person` |
| 23:00 | Derived classes reach public base members only; private stays hidden |
| 23:13 | Using the debugger to see the embedded base subobject |
| 23:20 | `protected`: visible to derived classes, invisible outside |
| 23:31 | Three inheritance forms: the public / protected / private mapping |
| 23:36 | Full demo: Person, Player, Nurse, Engineer, CivilEngineer |

## struct versus class: one default

```cpp
class Dog {
    std::string m_name;   // private by default
};

struct Cat {
    std::string m_name;   // public by default
};
```

Beyond that, the two are interchangeable: both support constructors, member functions, inheritance and access specifiers. The only difference is the access level applied when none is written.

```cpp
Dog dog1;
// dog1.m_name = "Fluffy";   // error: private

Cat cat1;
cat1.m_name = "Johnny";      // fine: struct members are public
```

Write `public:` or `private:` explicitly and the behaviour is identical.

### When to prefer struct

The rule of thumb from the lecture: **use a struct when the type is only public data and carries no member functions**.

```cpp
struct Point {
    double x;
    double y;
};

void print_point(const Point& p) {
    std::cout << "Point[x:" << p.x << ", y:" << p.y << "]\n";
}
```

`Point` maintains no invariant and has no behaviour; exposing its data is the whole point. Using `struct` tells a reader immediately: this is a data aggregate, not an encapsulated object. Once you need to police writes or maintain an invariant (a radius that cannot be negative), switch to `class` with private members and setters.

## Object size: members plus alignment

```cpp
class Wrapper {
    int m_a;
    int m_b;
    std::string m_name;
};
```

`sizeof(Wrapper)` is not "two ints plus the length of the string". Typically:

- two `int`s: $4+4=8$ bytes;
- one `std::string`: **32 bytes** in common implementations, independent of content;
- roughly 40 bytes in total, depending on the standard library.

Three consequences:

1. **Functions do not count.** Member functions belong to the class, not to an individual object. A million objects share one copy of the code; there is no reason to charge each object for it.
2. **A pointer counts only itself.** An `int*` member stores an 8-byte address; the size of the array it points to is irrelevant. `std::string` is internally a pointer plus length and capacity (plus a small-string buffer), so `"hi"` and a thousand-character string occupy the same `sizeof`.
3. **Alignment introduces gaps.** Most compilers require a 4-byte member to start at an address that is a multiple of 4. After a `char` (1 byte) and before an `int` (4 bytes), padding fills the gap:

```cpp
struct Mixed {
    char c;    // 1 byte
    int  i;    // 4 bytes, needs 4-byte alignment
};
// sizeof(Mixed) is typically 8, not 5
```

This is also why reordering members can shrink an object: put the most strictly aligned members first and the padding shrinks.

## Inheritance: building a class on top of a class

Consider a hierarchy of people: Person holds what all people share; Engineer is "a Person who engineers"; CivilEngineer is "an Engineer who specialises in civil works". Each level specialises the one above — exactly what inheritance expresses.

```cpp
class Person {
public:
    Person() = default;
    Person(std::string_view full_name, int age, std::string_view address)
        : m_full_name{full_name}, m_age{age}, m_address{address} {}

    std::string get_full_name() const { return m_full_name; }
    int get_age() const { return m_age; }
    std::string get_address() const { return m_address; }

public:
    std::string m_full_name{"None"};

protected:
    int m_age{0};

private:
    std::string m_address{"None"};
};

class Player : public Person {
public:
    Player() = default;
    explicit Player(std::string_view game) : m_game{game} {}

    void play() const {
        std::cout << "Playing " << m_game << " as " << m_full_name << "\n";
        // m_age is reachable (protected)
        // m_address is not (private)
    }

private:
    std::string m_game{"None"};
};
```

`class Player : public Person` reads as "Player publicly inherits from Person". Creating a Player first builds a complete Person subobject inside it, then adds Player's own members:

```text
Player object
├─ Person subobject
│   ├─ m_full_name   (public)
│   ├─ m_age         (protected)
│   └─ m_address     (private)
└─ m_game           (Player's own private member)
```

Expand a `Player` in the debugger and the `Person` layer appears, with its three members, and `m_game` below it. That is direct evidence for "a derived object embeds its base subobject".

### Access rules: private stays private even for derived classes

- `m_full_name` is public: usable inside and outside.
- `m_age` is protected: usable inside derived classes, not outside.
- `m_address` is private: **not usable even inside Player**. It belongs to Person's private implementation; Player's member functions cannot read or write it directly.

```cpp
void Player::change() {
    m_full_name = "Jon Snow";  // fine
    m_age = 30;                // fine (protected)
    // m_address = "...";      // error: private to Person
}
```

If a derived class truly needs that data, it must go through a public base interface (getter/setter), or the base author must relax the member to protected.

This corrects a common misreading: "public inheritance preserves member access" holds for public and protected members, but not for private ones. Private members belong to the class that declared them, permanently.

## Three forms of inheritance

The keyword after the colon is the **base-class access specifier**. It decides the level base members take in the derived class:

| Base member | public inheritance | protected inheritance | private inheritance |
| --- | --- | --- | --- |
| public | public | protected | private |
| protected | protected | protected | private |
| private | inaccessible | inaccessible | inaccessible |

Three points:

1. **Inheritance can only tighten, never loosen.** public keeps levels as they are; protected lowers public to protected; private lowers both public and protected to private.
2. **Private members are inaccessible under every form.** The last row is the one beginners miss.
3. **The specifier matters for the *next* derivation.** private inheritance makes everything private to the current class, so its own derived classes receive nothing usable.

### Why private inheritance is "selfish"

```cpp
class Engineer : private Person { /* ... */ };
class CivilEngineer : public Engineer { /* ... */ };
```

After `Engineer` privately inherits `Person`, Person's public members (`m_full_name`, `get_full_name`) become private members of `Engineer`. So `CivilEngineer`, even though it publicly inherits `Engineer`, cannot reach them — they were cut off at the `Engineer` level. `Engineer` is effectively saying: "everything I take from Person is mine, and I pass none of it down."

A `CivilEngineer` object still **contains** a complete Person subobject — the debugger shows it — but the interface has been sealed by a design decision upstream. The data is present; the access is gone.

### A complete demonstration

The lecture runs the same Person/Player code through all three forms:

```cpp
class Player  : public    Person { /* inside: public + protected; outside: public */ };
class Nurse   : protected Person { /* inside: public + protected; outside: nothing */ };
class Engineer: private   Person { /* inside: public + protected; outside: nothing, and nothing downstream */ };
```

In `main`:

```cpp
Player p;
p.m_full_name = "Samwell";   // fine: public inheritance preserves public
// p.m_age = 30;             // error: protected, invisible outside
// p.m_address = "Castle";   // error: private to Person

Nurse n;
// n.m_full_name = "Davy";   // error: protected inheritance demoted public to protected

Engineer e;
// e.m_full_name = "Olivier"; // error: private inheritance demoted it to private
```

Inside `Engineer`'s own member functions, `m_full_name` and `m_age` are both usable; `m_address` still is not.

## Chapter summary

- `struct` and `class` differ only in the default access level; prefer `struct` for plain public data.
- Object size is roughly the sum of member variables; functions do not count, pointers count only themselves, and alignment adds padding.
- Inheritance embeds a base subobject inside every derived object; construction, access and destruction all follow that structure.
- public inheritance preserves public and protected levels; private members are invisible to every derived class.
- protected inheritance demotes public to protected; private inheritance demotes public and protected to private.
- private inheritance cuts off visibility downstream, which is why it is called selfish.

## Comprehension check

**1. What is the only difference between `struct` and `class`, and when should a struct be preferred?**

Reference answer: The only difference is the default access level when none is written: `class` members are private, `struct` members are public. Both support constructors, destructors, member functions, inheritance and access specifiers. Prefer `struct` when the type merely bundles data, maintains no invariant and offers no behaviour — `Point{x, y}` for instance — because it tells the reader at a glance that this is an aggregate. Once writes must be policed or an invariant enforced (a non-negative radius, a valid state), switch to `class` with private members.

**2. Why is `sizeof(std::string)` independent of the text it holds? What exactly does object size count?**

Reference answer: A typical `std::string` stores a pointer to a heap buffer, a length and a capacity, possibly plus an inline small-string buffer. The object therefore has a fixed size (commonly 32 bytes); the characters themselves live on the heap and the object only holds the address and metadata. Hence `"hi"` and a thousand-character string occupy the same `sizeof`. Generalising: object size counts member variables only, a pointer counts by its own width rather than the size of its target, and member functions belong to the class and are charged to no object.

**3. Can a derived class access a base class's private members directly? Why is this caught at compile time?**

Reference answer: No. Access to a private member is bound to the scope of the class that declared it. A derived class does look names up in the base class scope, but the access check rejects private members, and the compiler reports `is private within this context`. The check is purely syntactic, based on declarations and scope, so it happens at compile time without running the program. If the data is genuinely needed, the derived class must use a public base interface, or the base author must relax the member to protected.

**4. State the visibility of each base member kind under public inheritance, and explain why private members are special.**

Reference answer: public members stay public; protected members stay protected; private members are **inaccessible**. The first two are inherited members whose level is unchanged. A private member physically exists inside the base subobject of the derived object, but access control binds it permanently to the base class scope, so no derived class may read or write it directly. That is why "public inheritance preserves visibility" is only true for public and protected members.

**5. Why is private inheritance described as selfish? CivilEngineer contains a full Person subobject, so why can it not touch Person's public members?**

Reference answer: `Engineer : private Person` demotes every inherited public and protected member to a private member of Engineer. When `CivilEngineer : public Engineer` is then derived, those members are already private to Engineer, and the rules forbid any derived class from accessing them; visibility cannot be restored downstream. The data is still there — a CivilEngineer contains an Engineer subobject, which contains a Person subobject — but the interface was severed upstream. Engineer keeps everything it took from Person and passes none of it on, hence "selfish".

**6. How do protected and private differ, and when is each appropriate?**

Reference answer: protected members are visible to the class itself and to member functions of its derived classes, but not to outsiders. private members are visible only to the class itself. Use protected when derived classes genuinely need to read or write state that outsiders must not touch — for example a base's `m_age`, which a derived constructor sets. Keep private for details that are purely internal and that derived classes should not depend on, such as caches or bookkeeping fields, to avoid coupling derived classes to implementation.

## Relation to neighbouring chapters

This chapter establishes the syntax and access rules of inheritance, but leaves an obvious problem: private inheritance seals everything off, so what if some members should be passed downstream after all? The next chapter first revives hidden members with `using` declarations, then works through construction order, forwarding arguments to base constructors, copy construction, destruction order and name hiding.
