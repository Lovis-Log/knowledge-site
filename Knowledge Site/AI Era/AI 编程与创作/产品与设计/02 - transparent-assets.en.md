---
slug: 02-transparent-assets
title: "Transparent Assets: Generate Real Alpha, Then Verify and Reuse"
summary: "A transparent PNG is worth having because one file works on any background. This note gives complete code for generating, validating, and compositing, across four use cases, and explains why prompts override the background parameter."
updatedAt: 2026-11-01
content_type: technical-tutorial
categories: [ai-coding]
tags: [image-generation, transparency, assets, quality-assurance]
sources:
  - kind: article
    title: "Generate Transparent Image Assets for Campaigns and Presentations"
    url: https://developers.openai.com/cookbook/examples/multimodal/transparent-image-assets-for-campaigns-and-presentations
---

## Why real alpha matters

A good image should work on any background. A PNG with a real alpha channel can serve campaign pages, websites, presentations, and product catalogs at once, with no manual cutout and no white box.

Four typical uses:

- **Seasonal e-commerce campaigns**: generate product images once, reuse them across holiday storefronts.
- **Enterprise presentations**: place transparent charts directly on a required PowerPoint theme and gradient background.
- **Design templates**: icons, stickers, and decorative elements that drop onto any layout without masking.
- **Print-on-demand merchandise**: apply one print design to different blank garments and product mockups.

## Setup

```bash
pip install openai pillow
```

Set `OPENAI_API_KEY`. The examples use `gpt-image-2.5-flare`, request PNG output, and set `background="transparent"`. To compare a model optimized for demanding quality, switch to `gpt-image-2.5-sunburst`. Both support transparent backgrounds. For the first comparison, keep prompts, sizes, and `quality="high"` unchanged; inspect transparency, fine edges, and text before tuning quality or latency.

```python
import base64
import os
from pathlib import Path

from openai import OpenAI
from PIL import Image

if not os.getenv("OPENAI_API_KEY"):
    raise RuntimeError("Set OPENAI_API_KEY before running this notebook.")

IMAGE_MODEL = "gpt-image-2.5-flare"

client = OpenAI()
asset_dir = Path("images/transparent-image-assets")
asset_dir.mkdir(parents=True, exist_ok=True)
```

## The rule that bites: prompts override the background parameter

If the prompt describes a backdrop, scene, color, or an object "on" something, the model may generate that background instead of returning transparency.

So the prompt must do two things at once:

1. Describe **only an isolated subject**.
2. Explicitly demand **real transparent alpha**, excluding backdrop, rectangle, plinth, cast shadow, label text, and watermark.

A reusable brand-plus-transparency constraint:

```text
One object from STILLROOM, an understated luxury botanical home-fragrance atelier:
artisanal warm amber and honey-tinted hand-blown glass, subtle brushed brass hardware,
natural ivory cotton cord, quiet Japanese-Scandinavian restraint,
warm side-lit editorial studio photography, photorealistic micro-detail.
Full object completely visible and generously padded. Preserve every natural transparency,
refraction, translucent layer and fine material edge.
Output an isolated object on actual fully transparent alpha; no backdrop, no rectangle,
no plinth, no cast shadow, no readable writing, no label text, no watermark.
```

Combining this with each product's own description keeps a collection visually consistent.

## Generating transparent PNGs

```python
products = {
    "amber-parfum": "A sculptural clear honey-amber faceted glass eau-de-parfum bottle, ...",
    "botanical-oil": "A slim cylindrical deep honey-amber transparent hand-blown glass bottle, ...",
    "reed-diffuser": "A rounded low smoked-amber translucent glass diffuser vessel, ...",
    "garden-candle": "A handmade botanical candle in a thick translucent smoked-amber tumbler, ...",
}

for filename, product_prompt in products.items():
    result = client.images.generate(
        model=IMAGE_MODEL,
        prompt=f"{product_prompt} {brand_prompt}",
        background="transparent",
        size="1024x1536",
        quality="high",
        output_format="png",
    )
    image_bytes = base64.b64decode(result.data[0].b64_json)
    (asset_dir / f"{filename}.png").write_bytes(image_bytes)
```

`output_format="png"` and `background="transparent"` must appear together. Setting the background flag while describing a scene in the prompt falls back to an opaque image.

## Verify alpha: do not trust your eyes

What looks like a white background may just be white pixels. Check the channel and the transparent-pixel share with Pillow:

```python
for filename in products:
    with Image.open(asset_dir / f"{filename}.png") as image:
        if image.mode != "RGBA":
            raise ValueError(f"{filename}.png does not have an alpha channel.")

        transparent_pixels = image.getchannel("A").histogram()[0]
        total_pixels = image.width * image.height
        transparent_percentage = 100 * transparent_pixels / total_pixels

        print(
            f"{filename}.png: {image.width}x{image.height}, "
            f"{transparent_percentage:.2f}% fully transparent"
        )
```

Three checks:

- `mode` must be `RGBA`; `RGB` means there is no alpha channel at all.
- The transparent share must be clearly above 0. Zero means the whole image is opaque.
- It must not be near 100% either — that usually means the subject failed to generate.

Expected output looks like:

```text
amber-parfum.png: 1024x1536, 78.41% fully transparent
botanical-oil.png: 1024x1536, 81.02% fully transparent
```

## Use case 1: seasonal e-commerce campaigns

Goal: one set of product images, four seasonal backgrounds, no re-cutout.

The sequence is: define four product prompts → generate transparent PNGs → validate with the code above → hand the PNGs and page requirements to Codex for a single-page storefront → switch between Spring and Winter and inspect the same PNGs on new backgrounds.

Tell Codex explicitly not to replace the images or add a background-removal step:

```text
Build a responsive single-page campaign website for STILLROOM using these existing transparent PNGs:
- images/transparent-image-assets/amber-parfum.png
- ...
Add Spring, Summer, Autumn, and Winter controls that change the background and copy.
Let visitors choose one product, two products, or the full collection.
Add a "Show transparency" checkerboard toggle.
Do not generate replacement images or run a separate background-removal step.
```

**Edges to inspect**: clear and frosted glass, the perfume bottle's sheer ribbon, the diffuser's thin reeds and feathery pampas fibers, the candle's fine cotton cord. Conventional background-removal tools clip these details, add halos, or flatten translucent materials. Generating the alpha channel directly is what preserves them.

## Use case 2: enterprise presentation charts

Enterprise templates often mandate a background color or gradient. An AI-generated chart with a white background leaves a visible white patch. A transparent PNG lets the theme show through.

```python
quarterly_revenue = {"Q1": 42, "Q2": 51, "Q3": 63, "Q4": 78}
regional_pipeline = {"North America": 46, "Europe": 29, "APAC": 25}
```

The prompt must ask for transparency across the entire chart, not just outside its silhouette. For a dark theme, also specify white or pale labels, bright colors, and no card, frame, panel, or filled plot area:

```text
Create one polished enterprise bar chart on a genuinely transparent background
for a dark navy PowerPoint slide.
Use exactly four ascending bars with these values: Q1 = $42M, Q2 = $51M, Q3 = $63M, Q4 = $78M.
Add white quarter labels below each bar and white dollar-value labels above.
Keep the plot area, grid, and space between bars transparent.
Do not add a background, filled panel, frame, title, or card.
```

Use a landscape `1536x1024` to leave room for labels, and `quality="high"` to help small text.

**A boundary to accept**: the model receives exact values, but the output is raster. Verify labels, values, and proportions against the source data before use. For production reporting where numerical precision is critical, render charts with a deterministic tool and reserve image generation for illustrative elements.

## Use case 3: design-template assets

The key for icons, stickers, and decorative elements is "transparent outside":

```text
Create one premium rounded-square app icon with an abstract folded paper bird
in cobalt blue, lavender, and peach. Keep everything outside the rounded icon tile transparent.

Create one illustrated strawberry character sticker with a close-fitting cream die-cut border.
Keep everything outside the sticker border transparent.

Create one delicate editorial botanical sprig.
Keep all space around and between the thin branches and leaves transparent.
```

Gaps between thin branches and leaves are the most likely regions to be filled white; inspect them specifically.

## Use case 4: print-on-demand merchandise

Generating the design and the blank garments separately is what lets one artwork serve several products:

```text
merchandise-design: an outdoor circular composition with mountains, pines, a setting sun, a river;
keep the surrounding area and the spaces between elements transparent.
merchandise-blank-tshirt: a flat, front-facing ivory crew-neck tee with a blank chest;
everything outside the garment silhouette transparent.
merchandise-blank-sweatshirt: the same, in forest green.
```

When compositing, trim the transparent padding and place the artwork proportionally on the chest:

```python
def visible_region(image):
    # Remove fully transparent padding without changing visible pixels.
    bounds = image.getchannel("A").getbbox()
    if bounds is None:
        raise ValueError("Expected a transparent PNG with visible artwork.")
    return image.crop(bounds)

with Image.open(asset_dir / "merchandise-design.png") as image:
    print_design = visible_region(image.convert("RGBA"))

with Image.open(asset_dir / "merchandise-blank-tshirt.png") as image:
    garment = visible_region(image.convert("RGBA"))

artwork = print_design.copy()
artwork.thumbnail((round(garment.width * 0.32), round(garment.height * 0.32)),
                  Image.Resampling.LANCZOS)

chest_x = (garment.width - artwork.width) // 2
chest_y = round(garment.height * 0.28)
garment.alpha_composite(artwork, dest=(chest_x, chest_y))
```

`alpha_composite` blends by alpha rather than overwriting, so the artwork's edges sit naturally on fabric. Using `paste` without a mask turns transparent regions black or white.

## Evaluating generated assets

Evaluate transparency, edge quality, brand fit, and usefulness across representative campaigns, slides, templates, and mockups.

Human review can be paired with a vision-capable model against a clear rubric, flagging opaque backgrounds, clipped details, mislocated prints on garments, and chart labels that disagree with the source data.

## Comprehension check

**1. `background="transparent"` is set, so why can the result still come back with a white background?**

Reference answer: Because the prompt takes priority over the parameter. If the prompt describes a backdrop, scene, color, or an object "on" something, the model may generate that background. The fix is to describe only an isolated subject and to state explicitly that the output must be on real transparent alpha with no backdrop, rectangle, plinth, or cast shadow.

**2. Why is "it looks like a white background" insufficient, and how should you verify?**

Reference answer: White may be opaque white pixels. Check the file itself: open it with Pillow and confirm `mode == "RGBA"`, then use the alpha channel histogram to measure the share of fully transparent pixels. Zero means the image is entirely opaque; near 100% means the subject failed to generate. Both extremes should raise an error or trigger regeneration.

**3. Why generate charts and products with transparency instead of cutting them out of a finished image?**

Reference answer: Conventional cutout tools clip fine detail on translucent materials, thin fibers, sheer fabric, and hair, and often add halos or flatten transparency. Generating the alpha channel directly preserves those edges, and the assets stay independent so they can be reused on different backgrounds, garments, and layouts.

**4. When placing a design on a T-shirt, why use `alpha_composite` rather than `paste`?**

Reference answer: `alpha_composite` blends according to the alpha channel, so the artwork's semi-transparent edges transition naturally into the fabric. `paste` without a mask overwrites a rectangular region, filling transparent areas with black or white and leaving hard edges.

**5. Why does the chart prompt ask for the plot area, grid, and gaps between bars to be transparent, not just the outside?**

Reference answer: The chart is placed on a dark gradient. If the plot area or grid carries a light background, it forms a visible rectangular panel that breaks the template. Requiring internal transparency lets the background show through between bars and around the legend.

**6. What non-visual check is mandatory before using a chart asset?**

Reference answer: Verify the numbers. The model received exact values, but the output is raster, so labels, values, and proportions can be wrong. Each item must be checked against the source data; for precision-critical reporting, render charts with deterministic tools and use image generation only for illustrations.

## How this connects

This note moves from producing a single image to producing reusable assets, where the hard part shifts from prompting to validation and compositing. It relies on the prompting principles and parameter constraints in the image prompting chapter; conversely, any batch pipeline — campaign pages, decks, catalogs — should pass the alpha checks here before layout.
