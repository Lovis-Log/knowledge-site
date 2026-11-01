---
slug: 01-image-prompting
title: "Image Prompting and Editing: Turning a Brief into a Verifiable Spec"
summary: "Start with model and parameter choices, break the image into subject, composition, style, and constraints, then edit with a strict 'change only X, preserve Y' pattern. Includes templates for generation and editing, a six-step migration workflow, and an acceptance checklist."
updatedAt: 2026-11-01
content_type: reference
categories: [ai-coding]
tags: [image-generation, prompting, image-editing, evaluation]
sources:
  - kind: article
    title: "Image prompting | OpenAI API"
    url: https://developers.openai.com/api/docs/guides/image-prompting
---

## The problem this solves

Most image failures are not the model being weak; they are underspecified briefs: what the subject is, where the image will be used, what must be preserved, and what must not appear. The working method is to define the result as an image someone could inspect, state the constraints one by one, and check the output against a list.

The core instruction is one sentence: **start with the image you need, then describe subject, composition, style, and constraints; for edits, say what changes and what must stay; change one thing at a time and inspect every result.**

## Choose the model first

There are two choices in the family:

| Model | Positioning | When to start here |
| --- | --- | --- |
| `gpt-image-2.5-flare` | Small model, optimized for speed, quality comparable to the previous generation | An existing workflow already meets quality and you want lower latency |
| `gpt-image-2.5-sunburst` | Base model, optimized for quality, higher quality than the previous generation | Complex use cases the previous generation cannot satisfy |

Both support generation, editing, and transparent backgrounds. The order is **establish quality first, then optimize latency**: if Sunburst meets requirements, test Flare with the same prompts, references, and dimensions; switch only if quality remains acceptable and latency improves.

Migration guidance:

| Current workflow | Start by testing |
| --- | --- |
| A validated second-generation workflow already meets quality | Flare, checking whether acceptable quality survives a latency reduction |
| A complex use case the second generation cannot satisfy | Sunburst, first establishing that quality is sufficient |

One subtlety: **the same quality label does not imply the same image quality or latency across models.** Speed gains must be measured on your own workload; they cannot be extrapolated from someone else's results.

## Keep parameters out of the prompt

API parameters are set separately from the prompt text:

| Parameter | Values |
| --- | --- |
| `model` | `gpt-image-2.5-flare` or `gpt-image-2.5-sunburst` |
| `quality` | `auto` (default), `low`, `medium`, `high`, `xhigh`, `max` |
| `size` | `auto` or a custom resolution |
| `background` | `auto`, `opaque`, `transparent` |

Common sizes: `1024x1024` (square), `1536x1024` (landscape), `1024x1536` (portrait), `2048x2048` (2K square), `2048x1152` (2K landscape), `3840x2160` (4K landscape), `2160x3840` (4K portrait).

Custom resolutions use `WIDTHxHEIGHT` and must satisfy:

- Each edge no more than 3,840 pixels.
- Both edges multiples of 16.
- Long edge to short edge no more than 3:1.
- Total pixels between 655,360 and 8,294,400.
- More than 3,686,400 pixels (`2560x1440`) is experimental.

How to tune quality: pick the model for the job first, then adjust `quality`. For the first comparison, hold quality, prompt, references, and dimensions fixed and change only the model. If output falls short, raise the setting; once it passes, test lower settings to reduce latency. Use `xhigh` or `max` only when they fix an unmet requirement within your latency budget — a higher setting does not guarantee a better result for every prompt.

For transparent assets, explicitly request `background="transparent"` and use PNG or WebP. `output_compression` applies only to JPEG or WebP; do not set it for PNG.

## Migrating an existing workflow in six steps

1. **Save a baseline.** Collect representative production prompts and references, including difficult edits, exact text, faces, product geometry, and transparent assets. Record the current model, settings, and results.
2. **Choose the first candidate.** If the old model meets quality, start with Flare and test latency. If it falls short on a complex case, start with Sunburst and establish quality first. Keep prompt, references, dimensions, and output format unchanged for the first comparison.
3. **Check the complete result.** Compare instruction following, identity and product preservation, text accuracy, unwanted changes, and transparency. Repeat requests to measure consistency; for editing, test the full sequence as well as individual steps.
4. **Test for latency only after quality passes.** If you started on Sunburst and it meets requirements, evaluate Flare against the same requirements. Switch only if quality stays acceptable and latency improves.
5. **Tune one setting at a time.** Compare quality levels before rewriting the prompt. Record typical and slow responses, failures, retries, and cost per accepted image. Check current pricing rather than assuming the faster model is cheaper.
6. **Roll out by workflow.** Once the candidate passes acceptance, move a small share of traffic, monitor the same measures, and expand gradually. Keep the previous model available for rollback.

One reality to accept: **repeated edits can still change details you meant to preserve.** Restate the constraints and inspect each result. If a region must remain pixel-identical, composite the approved edit into the original instead of relying on prompting.

## Seven prompting principles

1. **Define the result.** Name the subject and intended use (product photo, ad, diagram), and specify composition, aspect ratio, and placement constraints. For complex requests, organize the prompt as scene, subject, details, and constraints.
2. **Choose a maintainable format.** Short prompts, paragraphs, JSON-like structures, instructions, and tags can all express the same intent. Pick the one that is easiest to read and update; do not rely on special syntax.
3. **Describe visible details.** Name materials, lighting, colors, and medium. Ask for "photorealistic" or "real photograph" explicitly when that is the goal, and describe framing and texture. Camera specs are cues for appearance, not physical simulation. For wide, cinematic, low-light, rainy, or neon scenes, specify scale, atmosphere, and color instead of piling up mood words.
4. **Specify people and actions.** Describe framing, relative scale, gaze, and interaction with objects. Lines such as "full body visible, feet included", "looking down at the open book", or "hands naturally gripping the handlebars" remove ambiguity.
5. **Quote exact text.** Put required copy in quotes and describe position and typography. Spell unusual words or brand names letter by letter when needed. Ask for no extra text, and check spelling and legibility afterwards. Compare medium and high quality for small text, dense information, or multiple fonts.
6. **Separate changes from constraints.** For edits, say "change only X", then list what must be preserved: identity, geometry, layout, lighting, labels. State exclusions (unwanted text, logos, watermarks). For precise local edits, also freeze saturation, contrast, arrows, camera angle, and surrounding objects.
7. **Assign roles to references.** Identify each input by number and purpose: subject, style, clothing, background. Explain how they combine and which element moves where.

For iteration: feed the previous output in as the next input, request one change, and repeat the details to preserve. References like "same style as before" carry context, but if the result drifts, restate the critical constraints in full.

## Generation scenarios

### Control style and lighting

Split a photograph into subject, framing, light, and texture, and explicitly exclude processing you do not want.

```text
Create a photorealistic candid photograph of an elderly sailor on a small fishing boat.
Weathered skin with visible pores and sun texture; faded traditional tattoos.
Shot like a 35mm film photograph, medium close-up at eye level, 50mm lens.
Soft coastal daylight, shallow depth of field, subtle film grain.
Honest and unposed. No glamorization, no heavy retouching.
```

### Explain a process visually

State the process, the audience, and the information to convey. For diagrams and infographics, verify labels and factual relationships, not just appearance.

```text
Create a detailed infographic of the flow inside an automatic coffee machine:
bean basket → grinding → scale → water tank → boiler.
Make the technical and visual flow understandable.
```

### Render exact text

Put the copy in quotes and state how many times it should appear. Keep the prompt focused on the copy and the visual treatment.

```text
A campaign image for a youth streetwear brand called Thread.
Render the tagline "Yours to Create." exactly once, clearly and legibly.
No extra text, no watermarks, no unrelated logos.
```

### Design a reusable logo

Describe the brand and the shapes that define the mark; require legibility at any size; use `n` to request variations.

```text
Original, non-infringing logo for Field & Flour, a local bakery.
Warm, simple, timeless; clean vector-like shapes, strong silhouette, balanced negative space.
Flat design, minimal strokes, no gradients unless essential.
Fully transparent background, centered, generous padding, clean alpha edges,
no backdrop, no checkerboard, no watermark.
```

### Historical and real-world settings

Name the place and date to anchor the period, then inspect clothing, staging, and surroundings for accuracy.

```text
A realistic outdoor crowd scene in Bethel, New York on August 16, 1969.
Photorealistic, period-accurate clothing, staging, and environment.
```

### Story to comic strip

Break the narrative into clear visual beats, one per panel, with concrete action-focused descriptions.

```text
Create a short vertical comic-style reel with 4 panels.
Panel 1: The owner leaves through the front door...
Panel 2: The door clicks shut. Silence breaks...
Panel 3: The house transformed...
Panel 4: The door opens...
```

### Interface preview

Describe the product as if it already exists. Focus on layout, hierarchy, spacing, and real controls; avoid concept-art language or the result will look like a sketch rather than a shipped interface.

```text
A realistic mobile app UI mockup for a local farmers market.
Header, vendor list with small photos and categories, a "Today's specials" section,
location and hours. White background, subtle natural accents, clear typography.
Place the mockup in an iPhone frame.
```

### Scientific and educational visuals

Prompt it like an instructional design brief: audience, learning objective, visual format, required labels, scientific constraints. Ask for a clean, flat icon system with consistent style, clear arrows, and enough whitespace. Use `quality="high"` for dense labels.

```text
A simple biology diagram titled "Cellular Respiration at a Glance" for high school students.
Show glycolysis, the Krebs cycle, and the electron transport chain.
Label glucose, pyruvate, ATP, NADH, FADH2, CO2, O2, H2O.
White background, simple icons, clear labels, readable text. Avoid tiny text and decoration.
```

### Slides and charts

Write the prompt as an artifact spec, not an illustration request: name the deliverable (slide, workflow diagram, chart, page), the canvas, and the hierarchy, and give the real text and data. Use landscape sizes for deck-style output and `quality="high"` when there is small text, legends, axes, or footnotes.

```text
One pitch-deck slide titled "Market Opportunity", in the style of a real Series A deck.
TAM/SAM/SOM concentric circles with values $42B / $8.7B / $340M.
A bar chart of growth from 2021 to 2026; footnotes "AGI Research, 2024" and "Internal analysis".
Clean white background, Inter-like sans-serif, crisp minimal layout.
Avoid clip art, stock photography, gradients, shadows, decorative elements.
```

## Editing scenarios

Use `client.images.edit` for edits, and a mask when the local region must be exact.

| Task | What to specify |
| --- | --- |
| Translate while preserving layout | Replace text only, state "do not change any other aspect", then check for leftover source-language words |
| Transfer a visual style | Assign the reference a role (palette, texture, medium) and describe the new subject separately |
| Preserve identity, change clothing | List invariant properties: face, features, skin tone, body shape, pose, expression, hairstyle, proportions; allow only clothing to change |
| Combine references | Number the inputs, say which element moves where and what stays; close with "change nothing else" |
| Transparent cutout | Request an isolated subject in the prompt and set `background="transparent"`; output PNG or WebP |
| Sketch to photoreal | Preserve layout, proportions, perspective; specify plausible materials and lighting; forbid new elements and text |
| Remove an object | Name the object, preserve person, pose, lighting, and composition |
| Insert a person into a scene | Specify natural lighting, body framing, gaze, interaction; state which facial features and proportions are fixed |

A typical transparent cutout prompt:

```text
Extract the product from the input image and isolate it on a fully transparent background.
Centered product, crisp silhouette, no halos or fringing.
Preserve product geometry and label legibility exactly.
Add only light polishing. Do not add a solid backdrop, checkerboard, scenery, or shadow.
```

Two reminders: **a drawn checkerboard is not transparency**, and subsequent edits must repeat the requirement to preserve the transparent background.

## Refining across turns

Start from one output, inspect it, then pass it in as the next input. Keep each follow-up narrow so you can tell which change helped.

A typical chain: produce a billboard mockup (quote the copy verbatim and require it to appear once), change only the weather ("make it a snowy winter evening"), then keep a character consistent by writing the appearance, proportions, outfit, and personality as reusable constraints and repeating them in each new scene with "do not redesign the character".

## Acceptance checklist

Check each output before using it:

- Is required text accurate and legible? Are diagram labels and relationships correct?
- Are identities, product shapes, labels, and reference details intact?
- Did the edit change only what was requested?
- If transparency is required, does the file carry a real alpha channel rather than a painted background?
- When changing prompts or models, were quality, latency, and cost compared on representative inputs?

## Comprehension check

**1. Why hold quality, prompt, references, and dimensions fixed during the first model comparison?**

Reference answer: All of them affect image quality and latency. Changing only the model lets you attribute differences to the model itself. If quality changes at the same time, you cannot tell whether the result came from the model or the setting; and because the same quality label is not equivalent across models, mixing them makes the comparison meaningless.

**2. What are the hard constraints on a custom resolution? Give an invalid example and explain why.**

Reference answer: Each edge at most 3,840 pixels; both edges multiples of 16; long-to-short edge ratio at most 3:1; total pixels between 655,360 and 8,294,400. `1000x1000` is invalid because 1000 is not a multiple of 16; `4000x1000` violates the edge limit, sits exactly on the 3:1 boundary, and exceeds the pixel budget.

**3. Why is a drawn checkerboard not transparency? What must be done at the API level?**

Reference answer: A checkerboard is just pixels painted to look transparent; the file itself is an opaque RGB image and will show a white box on another background. Real transparency requires an alpha channel: set `background="transparent"`, output PNG or WebP, and do not apply `output_compression` to PNG.

**4. Why is "change only X" insufficient without a list of things to preserve?**

Reference answer: Because "don't change" is vague to the model. Explicitly listing identity, geometry, layout, lighting, and labels gives checkable constraints; otherwise the model may adjust adjacent regions while completing X. This matters even more across multiple edits, where drift accumulates, so constraints must be restated and results inspected every round.

**5. Why request only one change per refinement round?**

Reference answer: To establish causality. With a single change, an improvement or regression can be attributed to it; with several at once, a failure gives no way to tell which change caused it or which direction to keep. Feeding the previous output in and repeating the preservation constraints moves the result toward the target step by step.

**6. When migrating, when should you stay on Sunburst instead of switching to Flare?**

Reference answer: When Flare cannot meet the requirements at an acceptable quality. The procedure is to confirm Sunburst meets quality, then test Flare with the same prompts, references, and dimensions; switch only if Flare's quality stays acceptable and latency actually drops. If Flare fails at every acceptable quality level, keep Sunburst — quality outranks latency.

## How this connects

This note covers producing and editing a single image. Applying it to batches moves the hard part to verification and reuse: confirming every asset has an alpha channel, checking chart data against the source, and reproducing the same prompts reliably. Those are covered in the transparent assets chapter.
