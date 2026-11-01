---
slug: 08-regular-expressions
title: "Regular Expressions: Writing Format as a Pattern"
summary: "Starting from hand-written email validation, the chapter introduces re.search, quantifiers, escaping, anchors, character classes and capture groups. Three examples — validating an email, normalising a name, extracting a Twitter handle — show how regex validates, cleans and extracts data, and why complex patterns must be built up in small steps."
updatedAt: 2026-11-01
content_type: video-course
categories: [software-engineering]
tags: [python, regular-expressions, re-module, validation, parsing]
sources:
  - kind: video
    title: "Harvard CS50’s Introduction to Programming with Python（第 8 章）"
    url: "https://www.youtube.com/watch?v=nLRL_NcnK-4&t=30767s"
    author: "David J. Malan, CS50 / freeCodeCamp.org"
    publishedAt: 2023-05-01
---

This is chapter 8 of the long video (about 16 hours), corresponding to CS50P lecture 7, "Regular Expressions", covering 8:32:47–10:37:47. A regular expression (regex) is a **description of the shape of text**. With it a program can decide whether a string looks like an email address, normalise messy input into one format, or pull the part it wants out of a longer string.

## Starting without regex

Begin with email validation built only from basic string operations:

```python
email = input("What's your email? ").strip()

if "@" in email:
    print("Valid")
else:
    print("Invalid")
```

The flaw is immediate: typing `@` alone counts as valid. Add a requirement for a dot:

```python
if "@" in email and "." in email:
    print("Valid")
```

`@.` still passes. Tighten it by splitting on the at-sign:

```python
username, domain = email.split("@")

if username and "." in domain:
    print("Valid")
else:
    print("Invalid")
```

`if username` uses Python truthiness: an empty string is false. Finally require the domain to end with `.edu`:

```python
if username and domain.endswith(".edu"):
    print("Valid")
```

Now `malan@.edu` passes: the domain ends in `.edu` but has no school name. Every hole patched reveals another. The lecture stops here to make its central point: **patching conditions one at a time gets out of hand quickly; use a tool that describes the whole shape at once.**

## Timeline

| Time | Topic |
| --- | --- |
| 8:32:47 | Motivation: pattern matching for user input |
| 8:33:50 | Hand-written `validate.py`: `in`, `split`, `endswith` |
| 8:43:23 | The `re` module and `re.search` |
| 8:46:57 | Basic symbols: `.`, `*`, `+`, `?`, `{m}`, `{m,n}` |
| 8:53:04 | Finite state machines: how `re.search` matches left to right |
| 8:57:12 | Escaping a literal dot as `\.`; raw strings `r"..."` |
| 9:05:46 | Anchors `^` and `$` |
| 9:10:55 | Character sets `[...]` and negation `[^...]` |
| 9:18:23 | Ranges `[a-zA-Z0-9_]` and shorthands `\w`, `\d`, `\s` |
| 9:24:59 | Groups `(...)`, alternation `\|`, non-capturing `(?:...)` |
| 9:28:43 | The `re.IGNORECASE` flag |
| 9:35:01 | Optional subdomain via `(...)?` |
| 9:45:22 | `re.match` and `re.fullmatch` |
| 9:46:09 | Cleaning a name with capture groups and `.group(n)` |
| 10:02:28 | The walrus operator `:=` |
| 10:05:37 | Extracting a Twitter handle: `replace` → `removeprefix` → `re.sub` → `re.search` |
| 10:30:53 | Non-capturing groups fix the group-numbering bug |

## `re.search`: the smallest regex

```python
import re

email = input("What's your email? ").strip()

if re.search(r"@", email):
    print("Valid")
else:
    print("Invalid")
```

`re.search(pattern, string, flags=0)` looks for the first place matching the pattern. It returns a match object (truthy) on success and `None` otherwise. This version is no stronger than `"@" in email`, but the pattern slot can now hold much more.

### Basic symbols

| Symbol | Meaning |
| --- | --- |
| `.` | any single character except a newline |
| `*` | zero or more repetitions of what precedes |
| `+` | one or more repetitions |
| `?` | zero or one repetition (optional) |
| `{m}` | exactly m repetitions |
| `{m,n}` | between m and n repetitions |

`.*@.*` means "any characters, an at-sign, any characters". It still accepts a lone `@`, because `*` permits zero repetitions. Change to `.+.+` and both sides need at least one character:

```python
if re.search(r".+@.+", email):
```

### Why raw strings

To require an ending of `.edu`, write `r".+@.+\.edu"`. Drop the backslash and write `.+@.+.edu`, and the `.` before `edu` becomes "any character", so `malan@harvard?edu` passes — exactly the trap demonstrated in the lecture.

A backslash also gets interpreted by Python itself in ordinary strings (`\n` is a newline). So regex patterns are written as **raw strings**: `r"..."`, which passes backslashes through untouched.

### What the engine is doing

`re.search` behaves like a finite state machine: start in an initial state, read the input left to right, move between states according to the pattern, and accept if the final state after the last character is an accepting state. For `.*@.*`, the first part loops in place until an `@` appears, the `@` is the one edge that must be crossed, and the second part loops to the end. Understanding this explains why `*` allows "cross immediately" — zero repetitions is still a legal transition.

## Anchors: start and end only

`re.search(r".+@.+\.edu", email)` still accepts a whole sentence:

```
My email address is malan@harvard.edu
```

The pattern only requires that the shape appears somewhere; surrounding text does not matter. Anchors force the whole string to match:

```python
if re.search(r"^.+@.+\.edu$", email):
```

- `^` matches at the start of the string;
- `$` matches at the end (technically just before a trailing newline).

Together they require the entire string to have exactly this shape.

## Character sets: stop using `.`

`^.+@.+\.edu$` still lets `malan@@harvard.edu` through, because `.` can match `@`. What is needed is "any character other than `@`":

```python
if re.search(r"^[^@]+@[^@]+\.edu$", email):
```

Square brackets define a set of characters. `[^@]` is its **complement**: anything that is not `@`. Now only one at-sign can appear.

Careful: `^` outside brackets means "start of string", but inside brackets it means "negate". One symbol, two meanings — one of the most confusing corners of regex.

### Ranges and shorthands

Listing every allowed character is tedious, so a hyphen expresses a range:

```python
r"^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+\.edu$"
```

The usual shorthand is shorter:

| Shorthand | Meaning | Complement |
| --- | --- | --- |
| `\w` | letters, digits, underscore | `\W` |
| `\d` | digits 0–9 | `\D` |
| `\s` | whitespace (space, tab, …) | `\S` |

So:

```python
r"^\w+@\w+\.\w+\.edu$"
```

`\w` excludes the dot, so `first.last@gmail.com` is rejected — a reminder that **shorthand is convenience, not a standard**. Real email addresses allow characters defined by RFC, far beyond `\w`.

### Case

The third argument of `re.search` is a set of flags. `re.IGNORECASE` makes matching case-insensitive:

```python
if re.search(r"^\w+@\w+\.edu$", email, re.IGNORECASE):
```

Now `MALAN@HARVARD.EDU` passes. Lower-casing the input (`email.lower()`) would also work but changes the variable's value; a flag changes only how matching behaves.

## Groups: optional parts, alternatives, captures

### Optional parts

`malan@cs50.harvard.edu` has one more level than `malan@harvard.edu`. Wrap "subdomain plus dot" in parentheses and add `?`:

```python
r"^\w+@(\w+\.)?\w+\.edu$"
```

`(\w+\.)?` occurs zero or one time, so both forms pass. The parentheses cannot be omitted: `\w+\.?` would make only the dot optional and still require `cs50`.

### Alternatives

A vertical bar means "or", and parentheses limit its scope:

```python
r"^\w+@(\w+\.)?\w+\.(edu|com|org)$"
```

`(edu|com|org)` accepts any one of the three top-level domains.

### Non-capturing groups

Parentheses normally **capture** what they match, so it can be extracted later. To group without capturing, use `(?:...)`:

```python
r"^https?://(?:www\.)?twitter\.com/(\w+)$"
```

Here `(?:www\.)?` merely makes `www.` optional without taking a group number; `(\w+)` is the only capture.

## Example one: turning "Last, First" into "First Last"

A form may receive `Malan, David` or `David Malan`; the goal is always the second form.

```python
import re

name = input("What's your name? ").strip()

if matches := re.search(r"^(.+), ?(.+)$", name):
    name = f"{matches.group(2)} {matches.group(1)}"

print(f"hello, {name}")
```

Reading the pattern:

- `^(.+)` captures everything before the first comma — the last name;
- `, ?` matches the comma and **an optional single space**;
- `(.+)$` captures the rest — the first name.

`matches.group(1)` is the first pair of parentheses, `group(2)` the second, and `group(0)` the whole match. Group numbering starts at 1 — a library convention that differs from Python's zero-based indexing.

`:=` is the walrus operator: assign to `matches` and use its truthiness in the `if` at the same time. It is the two-step version collapsed into one line.

Why not `split(", ")`? Because users may omit the space. With `Malan,David`, `split(", ")` returns a single element and `last, first = ...` raises `ValueError`; `, ?` makes the space optional.

Note: this pattern still fails on `Malan, David, Jr.` — `(.+)` is greedy and takes as much as it can. Real systems either constrain input or write finer rules.

## Example two: extracting a handle from a URL

Given `https://twitter.com/davidjmalan`, produce `davidjmalan`.

### Three attempts

**First: `replace`**

```python
username = url.replace("https://twitter.com/", "")
```

This breaks as soon as the protocol is `http`, a `www.` appears, or the user writes "My username is https://…".

**Second: `removeprefix`**

```python
username = url.removeprefix("https://twitter.com/")
```

`removeprefix` only removes from the start, so it cannot damage text in the middle — safer than `replace`. But protocol and `www` must still match exactly.

**Third: `re.sub`**

```python
username = re.sub(r"^(https?://)?(www\.)?twitter\.com/", "", url, flags=re.IGNORECASE)
```

- `(https?://)?`: the whole protocol optional, with `s?` allowing both `http` and `https`;
- `(www\.)?`: `www.` optional;
- `\.`: a literal dot;
- the final `/` is required.

`re.sub(pattern, replacement, string)` replaces every match with the replacement (here, the empty string). It is stronger than `replace` because it matches a pattern, not fixed text.

But `re.sub` is unconditional: give it a non-Twitter URL and it returns the string unchanged, so the program confidently prints garbage as a username.

### Conditional `re.search`

```python
import re

url = input("URL: ").strip()

if matches := re.search(
    r"^https?://(?:www\.)?twitter\.com/([a-z0-9_]+)/?$",
    url,
    re.IGNORECASE,
):
    print(f"Username: {matches.group(1)}")
```

- `(?:www\.)?` makes `www.` optional without using a group number;
- `([a-z0-9_]+)` captures the handle, restricted to letters, digits and underscore (Twitter's actual rule);
- `/?$` tolerates one trailing slash.

This is where the lecture runs into the group-numbering bug: with a capturing `(www\.)?`, that group becomes number 1 and the handle becomes number 2, so `group(1)` yields `www.` or an empty string. Switching to `(?:...)` restores the expected numbering.

`re.match` and `re.fullmatch` are variants of `re.search`: `match` anchors at the start automatically (no `^` needed), and `fullmatch` also requires the end (no `$` needed). With `fullmatch`, both anchors can be dropped.

## Why not write your own email regex

The lecture shows the regex browsers actually use. It spans the screen and includes characters people rarely see but the standard permits. Two conclusions follow:

1. The real standard is far more complex than intuition suggests;
2. Hand-writing such a pattern is almost certain to introduce errors.

So: **for formats with a public standard — email, URLs — use a mature library** (for example `email_validator`). Keep regex for formats specific to your own application: student IDs, room numbers, course codes.

## A method for writing regex

The lecture insists on one practice: never write a complicated pattern in one go. Add one feature, run it, verify, add the next. Regex is dense — a single wrong character among dozens is nearly impossible to find by staring.

This generalises beyond regex: in any dense-expression, vague-error domain — regex, SQL, long boolean conditions — incremental construction beats writing it all at once.

## Takeaways

- A regex describes the shape of text; `re.search` finds a match anywhere, `re.fullmatch` requires the whole string.
- `.` any character, `*` zero or more, `+` one or more, `?` optional, `{m,n}` a repetition range.
- A literal dot is `\.`; write patterns as raw strings `r"..."`.
- `^`/`$` anchor start and end; `^` inside brackets means negation.
- `[a-z0-9_]` equals `\w`; `\w` excludes dots, so it is not "valid email characters".
- `( ... )` groups and captures; `(?: ... )` groups without capturing; `|` means or.
- Captures are read with `.group(n)`; numbering starts at 1, and `group(0)` is the whole match.
- `re.sub` performs pattern-based replacement; `re.split` and `re.findall` split and find all.
- The `re.IGNORECASE` flag makes matching case-insensitive without changing the string.
- Build complex patterns incrementally; for standard formats, prefer an existing library.

## Comprehension check

**1. Why does `.+@.+\.edu` accept `malan@harvard?edu`, and how do you fix it?**

Reference answer: `.` is the metacharacter for "any character", and the dot in `.edu` was left unescaped, so it matched `?`. The fix is to write `r".+@.+\.edu"`, escaping the dot so the engine treats it as a literal period. This is also why regex strings are raw strings: otherwise Python's own string escaping may consume the backslash before the engine sees it.

**2. What is the difference between `.*@.*` and `.+@.+`? Why does the first accept a lone `@`?**

Reference answer: `*` means zero or more repetitions, `+` means one or more. With `.*`, both sides can be empty, so the string `@` satisfies the pattern. With `.+`, each side needs at least one character, so a lone `@` fails. The same distinction explains `\.?` (only the dot optional) versus `(www\.)?` (the whole group optional): parentheses decide what the quantifier applies to.

**3. What do `^` and `$` do, and what happens without them?**

Reference answer: `^` requires a match to begin at the start of the string, `$` requires it to reach the end. Without anchors, `re.search` succeeds if the pattern appears anywhere, so `My email is malan@harvard.edu` is judged a valid email. With `^...$`, the entire string must have exactly that shape and any extra text causes failure.

**4. `[^@]+` and `\w+` can both match a username. How do they differ, and when is each appropriate?**

Reference answer: `\w` equals `[a-zA-Z0-9_]` — letters, digits and underscore only, **excluding dots, spaces and punctuation**. `[^@]+` matches anything except `@`, which is much broader and includes spaces and dots. The first suits an explicit business rule such as "handles contain only letters, digits and underscore" (Twitter's rule); the second suits a coarse constraint such as "exclude the separator". In the lecture the `[^@]+` version accepts inputs with spaces or dots, while `\w+` rejects `first.last@gmail.com` because of the dot; neither is the full email standard.

**5. In `^https?://(?:www\.)?twitter\.com/([a-z0-9_]+)$`, why is `www` wrapped in `(?:...)` rather than `(...)`? What goes wrong with ordinary parentheses?**

Reference answer: Ordinary parentheses create a capture group and consume a group number. Then `(www\.)?` becomes group 1 and the handle `([a-z0-9_]+)` becomes group 2, so `group(1)` returns `www.` or an empty string instead of the username, and the program prints the wrong thing. `(?:...)` is a **non-capturing group**: it still groups `www\.` so `?` can apply to the whole thing, but it takes no number, leaving the handle in group 1. The lecture demonstrates exactly this mistake and then fixes it.

**6. Why does `name.split(", ")` fail on "Last,First", and how does the regex version avoid it?**

Reference answer: `split(", ")` requires exactly one space after the comma. Given `Malan,David`, nothing is split, a one-element list comes back, and unpacking into `last, first` raises `ValueError: not enough values to unpack`. The regex `^(.+), ?(.+)$` makes the space optional with `?`, so both `Malan, David` and `Malan,David` match, and the two capture groups yield the last and first names.

**7. Why should you not hand-write a regex to validate email addresses, and what should you do instead?**

Reference answer: The legal characters and structure of email addresses are defined by RFC standards, permitting many uncommon characters. A complete regex is very long, hard to maintain, and almost certain to be wrong when written by hand — either rejecting valid addresses or accepting invalid ones. The browser regex shown in the lecture is itself a simplified version that catches most mistakes, not all. In practice, use a mature library such as `email_validator` for formats with public standards, and reserve regex for your own application's formats such as student IDs, room numbers or course codes.

## How it connects

Chapter 7 split file rows on a fixed comma; this chapter upgrades splitting to pattern recognition — CSV has a fixed delimiter, while regex can describe varying structure. Chapter 9 puts the cleaned data into classes, so that a `Student` object can own its own name validation instead of scattering it across a script. Chapter 10's command-line tools often need regex as well, for free text that goes beyond the structured arguments.
