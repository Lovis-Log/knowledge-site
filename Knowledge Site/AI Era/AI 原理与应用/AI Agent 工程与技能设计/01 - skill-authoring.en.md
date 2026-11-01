---
slug: 01-skill-authoring
title: "Writing Skills: Short, Specific, Verifiable"
summary: "What separates a Skill from a prompt is that context is a shared resource. Five threads — concision, degrees of freedom, progressive disclosure, workflows, and evaluation — plus a checklist to run before shipping."
updatedAt: 2026-11-01
content_type: reference
categories: [ai-agents]
tags: [agent-skills, instruction-design, evaluation, workflows]
sources:
  - kind: article
    title: "Skill authoring best practices"
    url: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
---

## Why writing a Skill differs from writing a prompt

The context window is a **shared resource**. A Skill competes for it with the system prompt, conversation history, the metadata of every other Skill, and the user's actual request.

Not everything loads at once. At startup only the metadata — `name` and `description` — of every Skill enters the system prompt. `SKILL.md` is read when the Skill becomes relevant, and bundled files are read only as needed. Even so, once `SKILL.md` loads, every token in it competes with conversation history.

So the default assumption when authoring is: **Claude is already very smart.** Add only what it does not already know, and interrogate each piece of content three times:

- Does Claude really need this explanation?
- Can I assume Claude has this information?
- Does this paragraph justify its token cost?

A concrete comparison. The version below is roughly 50 tokens:

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

The version below is roughly 150 tokens, and almost all the extra text is information the model already has — what a PDF is, how libraries are installed:

> PDF (Portable Document Format) files are a common file format that contains text, images, and other content. To extract text from a PDF, you'll need to use a library. There are many libraries available for PDF processing, but pdfplumber is recommended because it's easy to use and handles most cases well. First, you'll need to install it using pip. Then you can use the code below…

Concision is not about saving characters. It is about writing **only what cannot be derived**: project conventions, hard-won edge cases, mandatory ordering.

## Degrees of freedom

Different steps inside one Skill can carry different levels of constraint.

### High freedom: text instructions

Use when several approaches are valid, decisions depend on context, and heuristics guide the work. A code review:

```
1. Analyze the code structure and organization
2. Check for potential bugs or edge cases
3. Suggest improvements for readability and maintainability
4. Verify adherence to project conventions
```

### Medium freedom: pseudocode or parameterized templates

Use when a preferred pattern exists but some variation is acceptable.

```python
def generate_report(data, format="markdown", include_charts=True):
    # Process data
    # Generate output in specified format
    # Optionally include visualizations
```

### Low freedom: fixed scripts, few or no parameters

Use when operations are fragile, consistency is critical, and the sequence must not change.

```bash
python scripts/migrate.py --verify --backup
```

Say explicitly: do not modify this command or add flags.

One analogy: picture Claude as a robot walking a path. A **narrow bridge with cliffs on both sides** has exactly one safe route — supply guardrails and exact instructions. An **open field with no hazards** merely needs a direction, and Claude can find its own route. Database migrations are the bridge; code reviews are the field.

### Test across models

A Skill is an addition to a model, so its effectiveness depends on which model runs it. Test on every model you plan to use:

- Haiku (fast, economical): is there enough guidance?
- Sonnet (balanced): is it clear and efficient?
- Opus (strong reasoning): does it avoid over-explaining?

What is exactly right for Opus may be insufficient for Haiku. When serving several models, aim for instructions that work for all of them.

## Structure

### Naming

`name` may use only lowercase letters, numbers, and hyphens. Prefer the **gerund form** (verb + -ing), which names the activity the Skill provides:

- `processing-pdfs`
- `analyzing-spreadsheets`
- `managing-databases`
- `testing-code`

Noun phrases (`pdf-processing`) and imperatives (`process-pdfs`) are acceptable too. Avoid vague names (`helper`, `utils`, `tools`), overly generic ones (`documents`, `data`, `files`), and reserved words (`anthropic-helper`). Keep one style across a collection.

### The description decides discoverability

Each Skill has exactly one `description`, and Claude uses it to pick among a hundred or more candidates. It must answer two questions at once: **what the Skill does**, and **when to use it**.

Effective examples:

- PDF: `Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.`
- Excel: `Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.`
- Git: `Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.`

Ineffective examples: `Helps with documents`, `Processes data`, `Does stuff with files`. They carry no signal for selection.

### Progressive disclosure

`SKILL.md` is a table of contents and overview; details live in files loaded on demand. Rule of thumb: **keep the body under 500 lines** and split when you approach it.

Three common organizations.

**One — high-level guide with references.** The main file covers quick start; advanced material is split out:

```
## Advanced features

**Form filling**: See FORMS.md for complete guide
**API reference**: See REFERENCE.md for all methods
**Examples**: See EXAMPLES.md for common patterns
```

**Two — organize by domain.** A multi-domain Skill splits by topic so a sales question reads only sales content:

```
reference/finance.md   revenue and billing metrics
reference/sales.md     opportunities and pipeline
reference/product.md   usage and features
reference/marketing.md campaigns and attribution
```

**Three — conditional details.** Basics stay in the main file; advanced capabilities live elsewhere and are read only when needed:

```
## Editing documents

For simple edits, modify the XML directly. See REDLINING.md for tracked changes; see OOXML.md for OOXML details.
```

### Keep references one level deep

When file A references B and B references C, Claude may preview rather than fully read — `head -100` and similar — and act on incomplete information. The rule: **every reference file links directly from `SKILL.md`, one level only.**

Bad:

```
SKILL.md → advanced.md → details.md → the real content
```

Good:

```
SKILL.md
**Basic usage**: inline in SKILL.md
**Advanced features**: advanced.md
**API reference**: reference.md
**Examples**: examples.md
```

For reference files longer than 100 lines, put a table of contents at the top so even a partial read reveals the full scope.

## Workflows and feedback loops

### Checklists for complex processes

Break complex operations into ordered steps and provide a checklist Claude can copy into its response and tick off:

```
Research Progress:
- [ ] Step 1: Read all source documents
- [ ] Step 2: Identify key themes
- [ ] Step 3: Cross-reference claims
- [ ] Step 4: Create structured summary
- [ ] Step 5: Verify citations
```

The checklist is not decoration: it stops Claude from skipping critical validation steps.

### Validate, fix, repeat

The most common quality pattern is "run the validator → fix errors → repeat". It works without code too: treat a style guide as the validator and review against it item by item.

With code it is explicit:

```
1. Edit word/document.xml
2. Validate immediately: python ooxml/scripts/validate.py unpacked_dir/
3. If validation fails, fix the reported issues and validate again
4. Only proceed when validation passes
5. Rebuild: python ooxml/scripts/pack.py unpacked_dir/ output.docx
6. Test the output document
```

The load-bearing sentence is "only proceed when validation passes". Without it, models tend to carry errors forward.

## Content guidelines

### Avoid time-sensitive information

A sentence like "before August 2025 use the old API" is wrong a few months later. Layer instead: the main content describes the current method, and legacy material goes into an "old patterns" section with its deprecation date. History is preserved without cluttering the main path.

### Keep terminology consistent

- Good: always "API endpoint", always "field", always "extract".
- Bad: mixing "API endpoint / URL / API route / path", or "field / box / element / control".

Consistency directly affects whether the model matches instructions correctly.

## Common patterns

### Template pattern

For output with strict format requirements (API responses, data files), give the exact template and say it must be used verbatim. For output that needs judgment, give a sensible default and note that sections may be adapted.

### Examples pattern

When style is hard to express as rules, supply input/output pairs. Commit messages are the classic case: three worked examples beat a paragraph telling the model to be concise.

### Conditional workflow pattern

Make decision points explicit:

```
1. Determine the modification type:
   Creating new content? → follow the creation workflow
   Editing existing content? → follow the editing workflow
2. Creation: build from scratch with docx-js, export .docx
3. Editing: unpack → modify XML → validate after each change → repack
```

## Evaluation-driven development

**Build evaluations before writing extensive documentation.** Otherwise you document imagined problems.

The loop:

1. **Find gaps**: run Claude on representative tasks without a Skill and record specific failures.
2. **Create evaluations**: three scenarios that test those gaps.
3. **Establish a baseline**: measure performance without the Skill.
4. **Write minimal instructions**: just enough to close the gaps.
5. **Iterate**: run evaluations, compare against baseline, refine.

An evaluation entry can be plain JSON:

```json
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from this PDF file and save it to output.txt",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "Reads the PDF with an appropriate library or command-line tool",
    "Extracts text from every page without omissions",
    "Saves the result to output.txt in a clear, readable format"
  ]
}
```

### Iterate with two Claudes

The most effective development process uses Claude in two roles:

- **Claude A** helps design, trim, and restructure instructions.
- **Claude B** loads the Skill and does real work with it.

The cycle: complete a task without any Skill and notice what context you keep supplying; have Claude A capture that as a Skill; test it with Claude B on related tasks; bring observations back, e.g. "it forgot to filter test accounts — is that rule prominent enough?"; revise and test again.

This works because Claude A understands what an agent needs, you supply domain expertise, and Claude B exposes gaps through real usage.

### Watch how it navigates

While iterating, watch for four signals:

- **Unexpected exploration paths**: the structure is less intuitive than you thought.
- **Missed links**: references need to be more prominent.
- **Repeated reads of one file**: that content may belong in the main file.
- **Files never opened**: probably unnecessary, or poorly signaled.

## Skills with executable code

### Solve, don't defer

Handle error conditions instead of pushing them back to the model:

```python
def process_file(path):
    """Read a file, creating it with default content if missing."""
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        print(f"File {path} not found, creating default")
        with open(path, "w") as f:
            f.write("")
        return ""
    except PermissionError:
        print(f"Cannot access {path}, using default")
        return ""
```

The anti-pattern is `return open(path).read()`: on failure it hands all diagnosis to the model.

### No voodoo constants

Every constant should explain itself:

```python
# HTTP requests typically complete within 30 seconds;
# longer timeout accounts for slow connections
REQUEST_TIMEOUT = 30

# Three retries balances reliability versus speed;
# most intermittent failures resolve by the second retry
MAX_RETRIES = 3
```

`TIMEOUT = 47  # why 47?` leaves the model unable to judge whether it may change the value.

### Prefer bundled scripts over generated code

Scripts are more reliable than generated code, consume no context, and behave identically across uses. In the instructions, **distinguish "run" from "read"**:

- Run (most common): `Run analyze_form.py to extract fields`
- Read as reference (complex logic): `See analyze_form.py for the field extraction algorithm`

### plan → validate → execute

For batch, destructive, or high-stakes changes, have Claude produce a structured plan file, validate it with a script, then execute. Example: updating 50 PDF form fields from a spreadsheet.

```
analyze → create changes.json → validate plan → execute → verify
```

This catches missing fields, conflicting values, and omitted required fields before anything is written, and the plan can be revised without touching the originals. Make validation messages specific: `Field 'signature_date' not found. Available fields: customer_name, order_total, signature_date_signed`.

### Dependencies and runtime

Environments differ. claude.ai can install from npm and PyPI and pull GitHub repositories; the Claude API has no network access and no runtime installation. List required packages in `SKILL.md` and **state the install step explicitly** rather than assuming a library is present.

### Fully qualify MCP tool names

Use `ServerName:tool_name`, for example `BigQuery:bigquery_schema` or `GitHub:create_issue`. Without the server prefix, tool lookup fails readily when several MCP servers are available.

### Forward slashes only

`reference/guide.md` works everywhere; `reference\guide.md` breaks on Unix. Name files for their content: `form_validation_rules.md` beats `doc2.md`.

## Anti-patterns

- Offering many options without a default ("you could use pypdf, or pdfplumber, or PyMuPDF…").
- Nested references (A → B → C).
- Time-sensitive statements in the main content.
- Switching terms for the same concept.
- Scripts that dump errors back on the model.
- Unexplained magic numbers.
- Windows-style paths.

## Pre-ship checklist

Core quality:

- The description is specific, includes key terms, and states both what and when.
- `SKILL.md` is under 500 lines; the rest is split out.
- No time-sensitive information, or it lives in an "old patterns" section.
- Terminology is consistent; examples are concrete.
- References are one level deep.
- Workflows have clear steps.

Code and scripts:

- Scripts handle their own errors.
- No unexplained constants.
- Dependencies are listed and verified.
- All paths use forward slashes.
- Critical operations have validation steps.
- Quality-critical tasks have feedback loops.

Testing:

- At least three evaluation scenarios exist.
- Tested on every model you plan to use.
- Tested on real tasks.

## Comprehension check

**1. Why does `description` often matter more than the body of `SKILL.md` for whether a Skill fires?**

Reference answer: Selection happens before the body is read. Only the metadata — `name` and `description` — of every Skill is preloaded into the system prompt, and the model uses that to decide whether the current task belongs to this Skill; `SKILL.md` is read only after that decision. No matter how good the body is, if the description misses the vocabulary and contexts a user is likely to use, the Skill is never loaded. That is why the description must state both capability and trigger conditions.

**2. When should you choose low freedom — a fixed script with parameters you forbid changing?**

Reference answer: When the operation is fragile or error-prone, or when order and consistency must be exact. A database migration is the canonical case: a wrong order or an added flag can cause irreversible data damage. The test is "is there only one safe path". Conversely, tasks where context determines the best approach — a code review, say — should get high freedom.

**3. Why must reference files stay one level deep?**

Reference answer: Nested references invite partial reading. When file A references B and B references C, the model may preview rather than read fully — `head`-style — and act on incomplete information. Linking every file directly from `SKILL.md` ensures complete content is read when needed.

**4. What is the first step of evaluation-driven development, and why not start by writing documentation?**

Reference answer: The first step is running Claude on representative tasks **without** a Skill and recording specific failures and missing context, then building evaluations and a baseline from that. Writing documentation first means solving imagined problems: you may spend effort on things the model already knows while missing the real gaps, and without a baseline you cannot tell whether a change helped.

**5. What situations suit `plan → validate → execute`, and what does it actually prevent? Give an example.**

Reference answer: Batch operations, destructive changes, complex validation rules, and high-stakes actions. Example: updating 50 PDF form fields from a spreadsheet — Claude first analyzes the form and writes `changes.json`, a script then checks that fields exist, values do not conflict, and required fields are covered, and only then does execution happen. It prevents referencing non-existent fields, writing conflicting values, and missing required fields — errors that are hard to undo once applied.

**6. Why are unexplained constants unacceptable in Skill scripts?**

Reference answer: The model needs to judge whether a value may be changed and under what conditions. `TIMEOUT = 47` gives no basis, so the model can neither reuse it nor adapt it when the environment changes. A comment such as "HTTP requests typically complete within 30 seconds; a longer timeout accounts for slow connections" states the reason and the boundary, which is exactly what the model needs to decide.

## How this connects

This note is about how instructions are read and executed. It and the Codex agent loop are two sides of one problem: a Skill decides **what context the model receives**, while the agent loop decides **how that context is repeatedly sent, cached, and compacted**. See the Codex agent loop chapter for the engineering side.
