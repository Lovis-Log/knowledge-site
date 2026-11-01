---
slug: 02-transparent-assets
title: "透明素材：生成真 alpha 通道，再验证与复用"
summary: "透明 PNG 的价值在于一张图能复用到任何背景。本文给出生成、校验、合成三步的完整代码，覆盖电商、演示图表、设计模板与印花商品四类场景，并说明为什么提示词会覆盖 background 参数。"
updatedAt: 2026-11-01
content_type: technical-tutorial
categories: [ai-coding]
tags: [image-generation, transparency, assets, quality-assurance]
sources:
  - kind: article
    title: "Generate Transparent Image Assets for Campaigns and Presentations"
    url: https://developers.openai.com/cookbook/examples/multimodal/transparent-image-assets-for-campaigns-and-presentations
---

## 为什么需要真 alpha

一张好图应该能放在任何背景上。带 alpha 通道的 PNG 可以同时用于活动页、网站、演示文稿与商品目录，而不必每次手动抠图，也不会留下白框。

透明素材的四个典型用途：

- **季节性电商活动**：产品图只生成一次，反复铺在不同节日的门店背景上。
- **企业演示**：透明图表直接叠在指定的 PowerPoint 主题与渐变背景上，不破坏模板。
- **设计模板**：图标、贴纸、装饰元素交给用户，放任意模板都不需要遮罩。
- **按需印花**：一份设计稿套到不同颜色的空白服装与商品图上。

## 准备工作

```bash
pip install openai pillow
```

设置环境变量 `OPENAI_API_KEY`。本文使用 `gpt-image-2.5-flare`，请求 PNG 输出并设置 `background="transparent"`；要比较更重质量的模型，把模型名换成 `gpt-image-2.5-sunburst`。两者都支持透明背景。第一次比较时保持提示词、尺寸、`quality="high"` 不变，先看透明度、边缘细节与文字，再调质量或延迟。

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

## 一条容易踩的规则：提示词优先于 background 参数

如果提示词里描述了背景、场景、颜色或「放在某物上」，模型可能照着描述生成背景，而不是给你透明底。

所以提示词必须同时做到两件事：

1. 只描述**孤立的主体**；
2. 明确要求**真正的透明 alpha**，并排除 backdrop、矩形、底座、投影、标签文字与水印。

一个可复用的「品牌 + 透明」约束段落：

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

把这段和每个产品的具体描述拼起来，就能让同系列的四件产品在视觉上保持一致。

## 生成透明 PNG

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

注意 `output_format="png"` 与 `background="transparent"` 必须同时出现；只设背景参数、却让提示词描述场景，结果会退回不透明。

## 验证 alpha：不要相信肉眼

肉眼看到的「白底」可能只是白色像素。用 Pillow 检查通道与透明像素比例：

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

三个检查点：

- `mode` 必须是 `RGBA`。若是 `RGB`，说明根本没有 alpha 通道。
- 透明像素占比应当明显大于 0。为 0 意味着整幅图不透明。
- 占比也不能接近 100%——那通常意味着主体没生成出来。

预期的输出形态类似：

```text
amber-parfum.png: 1024x1536, 78.41% fully transparent
botanical-oil.png: 1024x1536, 81.02% fully transparent
```

## 用例一：季节性电商活动

目标：同一组产品图，换四种节日背景，不重新抠图。

流程是：先定义四个产品提示词 → 生成透明 PNG → 用上面那段代码验证 → 把 PNG 与页面需求交给 Codex 生成单页门店 → 在春冬两套背景间切换，检查同一批 PNG 在新背景上的边缘。

交给 Codex 的指令要写清「不要生成替代图，也不要跑额外的去背步骤」：

```text
Build a responsive single-page campaign website for STILLROOM using these existing transparent PNGs:
- images/transparent-image-assets/amber-parfum.png
- ...
Add Spring, Summer, Autumn, and Winter controls that change the background and copy.
Let visitors choose one product, two products, or the full collection.
Add a "Show transparency" checkerboard toggle.
Do not generate replacement images or run a separate background-removal step.
```

**要盯住的难点边缘**：透明玻璃与磨砂玻璃、香水瓶的薄纱丝带、藤条与羽毛状的蒲苇纤维、蜡烛上的细棉绳。传统去背工具容易把这些细节剪掉、加光晕，或把半透明材质压平。直接生成 alpha 通道，正是为了保住这些边缘。

## 用例二：企业演示图表

企业模板常规定背景色或渐变，AI 生成的图表如果自带白底，放上去就是一块白斑。透明 PNG 能让主题背景透出来。

```python
quarterly_revenue = {"Q1": 42, "Q2": 51, "Q3": 63, "Q4": 78}
regional_pipeline = {"North America": 46, "Europe": 29, "APAC": 25}
```

图表提示词要明确「整块图表都透明」，而不只是轮廓外透明。深色主题还要指定白色或浅色标签、亮色系、不要卡片、边框、面板或填充的绘图区：

```text
Create one polished enterprise bar chart on a genuinely transparent background
for a dark navy PowerPoint slide.
Use exactly four ascending bars with these values: Q1 = $42M, Q2 = $51M, Q3 = $63M, Q4 = $78M.
Add white quarter labels below each bar and white dollar-value labels above.
Keep the plot area, grid, and space between bars transparent.
Do not add a background, filled panel, frame, title, or card.
```

用横版 `1536x1024` 给标签留空间，`quality="high"` 帮助小字清晰。

**一个必须承认的边界**：模型收到的是准确数值，但生成的是位图。使用前必须逐项核对标签、数值与比例是否与源数据一致。对数字精度要求高的正式报表，应当用确定性工具渲染图表，图像生成只用于插画类元素。

## 用例三：设计模板素材

图标、贴纸、装饰元素的关键是「外侧全透明」：

```text
Create one premium rounded-square app icon with an abstract folded paper bird
in cobalt blue, lavender, and peach. Keep everything outside the rounded icon tile transparent.

Create one illustrated strawberry character sticker with a close-fitting cream die-cut border.
Keep everything outside the sticker border transparent.

Create one delicate editorial botanical sprig.
Keep all space around and between the thin branches and leaves transparent.
```

细枝、叶片之间的空隙最容易被填成白色，检验时尤其要看这些区域。

## 用例四：印花商品

把设计稿与空白服装分开生成，才能一套稿子套多种商品：

```text
merchandise-design: 户外主题圆形构图，山、松树、落日、河流，四周与图形间留空透明。
merchandise-blank-tshirt: 正面平铺的象牙色 T 恤，胸前留空，轮廓外全透明。
merchandise-blank-sweatshirt: 同样的平铺森林绿卫衣。
```

合成时用 Pillow 去掉透明留白，再按比例贴到胸前：

```python
def visible_region(image):
    # 去掉全透明外边距，不改变可见像素
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

`alpha_composite` 会按 alpha 混合，而不是直接覆盖，因此设计的边缘能自然融入布料。若用 `paste` 且不给遮罩，透明区域会变成黑色或白色。

## 评估生成素材

评估维度：透明度、边缘质量、品牌契合度、在后四种场景中的可用性。

可以组织人工评审，也用具备视觉能力的模型按固定评分表复核，重点标记：不透明背景、被剪掉的细节、服装上位置不对的印花、与源数据不符的图表标签。

## 理解检验

**1. `background="transparent"` 已经设置了，为什么还可能在结果里看到白色背景？**

参考答案：因为提示词优先于参数。如果提示词描述了背景、场景、颜色或「放在某物上」，模型可能照着描述生成背景。解决办法是让提示词只描述孤立主体，并明确写出「输出在真正的透明 alpha 上，不要 backdrop、矩形、底座、投影」。

**2. 只检查「看起来是白底」为什么不够？应该怎么验证？**

参考答案：白色可能是不透明的白像素。必须检查文件本身：用 Pillow 打开后确认 `mode == "RGBA"`，再用 alpha 通道的直方图统计完全透明像素的比例。占比为 0 说明整幅不透明；接近 100% 说明主体没生成出来。两个极端都要报错或重生成。

**3. 为什么透明素材要分别生成图表与商品，而不是在成品图上抠图？**

参考答案：因为传统去背工具在处理半透明材质、细纤维、薄纱、发丝时容易剪掉细节、产生光晕或把透明压平。直接在生成阶段获得 alpha 通道，能保留这些边缘；而且素材是独立的，可以反复复用到不同背景、不同服装与不同版式上。

**4. 把设计稿贴到 T 恤上时，为什么用 `alpha_composite` 而不是 `paste`？**

参考答案：`alpha_composite` 会按 alpha 通道混合，设计图的半透明边缘能与布料自然过渡；`paste` 不带遮罩时直接把矩形区域覆盖过去，透明部分会被填成黑色或白色，边缘也会出现硬切。

**5. 生成企业图表时，为什么提示词要求「绘图区、网格、柱间空隙都透明」，而不只是轮廓外透明？**

参考答案：因为图表要叠在深色渐变背景上，如果绘图区或网格自带浅色底，就会形成一块可见的矩形面板，破坏模板。要求内部也透明，才能让背景从柱子之间、图例周围透出来。

**6. 图表素材在正式使用前必须做哪一项与视觉无关的检查？**

参考答案：核对数值。模型虽然收到了准确数字，但输出是位图，标签、数值、比例都可能出错。必须逐项对照源数据；对精度要求高的正式报表，应改用确定性工具渲染，图像生成只用于插画。

## 与前后内容的关系

这篇把单张图的生成推进到「可复用素材」：难点从写提示词转到验证与合成。它依赖同系列「图像提示与编辑」一篇里的提示词原则与参数约束；反过来，任何需要批量出图的流程（活动页、演示、商品目录）都应当先通过这里的 alpha 校验，再进入排版环节。
