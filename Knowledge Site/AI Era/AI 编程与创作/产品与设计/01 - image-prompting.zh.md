---
slug: 01-image-prompting
title: "图像提示与编辑：把需求写成可验收的规格"
summary: "从模型与参数选择开始，把画面拆成主体、构图、风格与约束，再用「只改 X、保留 Y」的写法做局部编辑。附生成与编辑两类场景的提示模板、迁移工作流的六个步骤和验收清单。"
updatedAt: 2026-11-01
content_type: reference
categories: [ai-coding]
tags: [image-generation, prompting, image-editing, evaluation]
sources:
  - kind: article
    title: "Image prompting | OpenAI API"
    url: https://developers.openai.com/api/docs/guides/image-prompting
---

## 这一篇解决什么问题

图像生成的失败，多数不是「模型不够强」，而是需求没有写清楚：主体是什么、用在哪里、哪些必须保留、哪些不许出现。这篇文章给出一套可复用的写法：先把结果定义成一幅可以被检查的图，再逐项写出约束，最后按清单验收。

核心思路只有一句：**先说你需要的图，再描述主体、构图、风格与限制；编辑时说清改什么、保留什么；一次只改一件事，并且每次都检查结果。**

## 先选模型

同一个系列里有两个选择：

| 模型 | 定位 | 何时从它开始 |
| --- | --- | --- |
| `gpt-image-2.5-flare` | 小模型，优化速度，质量接近上一代 | 现有工作流已满足质量要求，想降低延迟 |
| `gpt-image-2.5-sunburst` | 基座模型，优化质量，质量高于上一代 | 复杂用例，上一代达不到要求 |

两者都支持生成、编辑与透明背景。选择顺序应当是**先确认质量，再优化延迟**：如果 Sunburst 满足质量要求，再用同一组提示词、参考图和尺寸去测 Flare；只有质量仍可接受且延迟下降，才切换。

迁移时的对照：

| 当前工作流 | 先测哪个 |
| --- | --- |
| 已有的第二代流程已满足质量要求 | Flare，看能否在不掉质量的前提下降延迟 |
| 复杂用例，第二代达不到质量要求 | Sunburst，先确认质量够用 |

一个容易忽略的点：**同样的 quality 标签，在不同模型上不等于同样的画质和延迟**。速度提升必须在你自己的工作负载上测，不能从别人的结果外推。

## 参数与提示词分开

API 参数不写进提示词，单独设置：

| 参数 | 取值 |
| --- | --- |
| `model` | `gpt-image-2.5-flare` 或 `gpt-image-2.5-sunburst` |
| `quality` | `auto`（默认）、`low`、`medium`、`high`、`xhigh`、`max` |
| `size` | `auto` 或自定义分辨率 |
| `background` | `auto`、`opaque`、`transparent` |

常见尺寸：`1024x1024`（方）、`1536x1024`（横）、`1024x1536`（竖）、`2048x2048`（2K 方）、`2048x1152`（2K 横）、`3840x2160`（4K 横）、`2160x3840`（4K 竖）。

自定义分辨率写成 `宽x高`，必须满足：

- 每条边不超过 3840 像素。
- 两边都是 16 的倍数。
- 长边与短边之比不超过 3:1。
- 总像素在 655,360 到 8,294,400 之间。
- 超过 3,686,400 像素（即 `2560x1440`）属于实验性范围。

质量参数怎么调：先按用途选模型，再调 `quality`。第一次比较时，把 quality、提示词、参考图、尺寸全部固定，只换模型。输出不达标就升一档；达标后再往下降，看能否在可接受的质量下降低延迟。`xhigh` 与 `max` 只在确有未满足的质量要求、且延迟预算允许时使用——更高的档位不保证每个提示词都更好。

需要透明素材时，必须显式写 `background="transparent"` 并使用 PNG 或 WebP；`output_compression` 只对 JPEG 或 WebP 有效，对 PNG 不要设置。

## 迁移已有工作流的六步

1. **保存基线。** 收集有代表性的生产提示词与参考图，要包含难例：精确文字、人脸、产品几何、透明素材。记录当前模型、参数与结果。
2. **选第一个候选。** 旧模型已达标就从 Flare 起测延迟；复杂用例达不到质量就从 Sunburst 起测质量。第一轮比较时提示词、参考图、尺寸、输出格式都保持不变。
3. **检查完整结果。** 对照指令遵循、身份与产品保留、文字准确度、非预期改动、透明度五项。重复请求以测稳定性；编辑流程要把整条编辑链和单个步骤分别测。
4. **质量通过后再测延迟。** 若从 Sunburst 起步且它已达标，再用同一套要求测 Flare；只有质量仍可接受且延迟下降才切换。
5. **一次只改一个设置。** 先比 quality 再改提示词。记录典型与最慢响应、失败、重试与「每张被接受图片」的成本。价格要查当前报价，不要假设快模型一定更便宜。
6. **按工作流分批放量。** 达到验收标准后先切一小部分流量，监控同样指标，再逐步扩大；旧模型保留可回滚。

一个必须接受的现实：**多轮编辑仍可能改动你本想保留的细节。** 每次都要重申约束并检查结果；如果某个区域必须像素级不变，就把通过验收的编辑合成回原图，而不是指望提示词。

## 写提示词的七条原则

1. **定义结果。** 说出主体与用途（产品图、广告、示意图），指定构图、宽高比与重要的位置约束。复杂需求按「场景、主体、细节、约束」分段。
2. **选可维护的格式。** 短句、段落、类 JSON 结构、指令、标签都能表达同一件事；选最容易读和改的那种，不要依赖特殊语法。
3. **描述可见细节。** 写材质、光线、颜色、视觉媒介。需要照片感就明说 photorealistic 或 real photograph，并描述取景与质感。相机参数只是外观线索，不是物理模拟的保证。宽幅、电影感、低光、雨夜、霓虹这类场景，要写尺度、氛围与颜色，不能只堆情绪词。
4. **写清人物与动作。** 说明取景范围、相对大小、视线与物体的交互。像「全身可见，包含脚」「低头看打开的书」「双手自然握住车把」这样的句子，能显著减少歧义。
5. **精确文字要加引号。** 给出必须出现的文案、位置与字体风格。不常见的词或品牌名逐字母拼出。同时要求「不要额外文字」，并在输出后检查拼写与可读性。小字、密集信息、多字体时对比 medium 与 high。
6. **把改动与约束分开。** 编辑时写「只改 X」，再列出要保留的细节：身份、几何、版式、光线、标签。还要写排除项，例如不要多余文字、logo、水印。做局部精修时，把饱和度、对比度、箭头、机位、周围物体也列为不变项。
7. **给参考图分配角色。** 按编号说明每张输入图的作用：主体、风格、服装、背景；再说明它们如何组合、哪个元素要移到哪里。

迭代方式：把上一轮输出作为下一轮输入，一次只要求一个改动，并重复要保留的细节。像「和之前一样的风格」这种指代能携带上下文，但结果一旦漂移，就要把关键约束重新写全。

## 生成类场景

### 控制风格与光线

把照片拆成主体、取景、光线、质感四层，并显式排除不想要的处理。

```text
Create a photorealistic candid photograph of an elderly sailor on a small fishing boat.
Weathered skin with visible pores and sun texture; faded traditional tattoos.
Shot like a 35mm film photograph, medium close-up at eye level, 50mm lens.
Soft coastal daylight, shallow depth of field, subtle film grain.
Honest and unposed. No glamorization, no heavy retouching.
```

### 用图解释流程

写清流程名称、受众、要传达的信息。信息图与示意图除了外观，还要核对标签与事实关系。

```text
Create a detailed infographic of the flow inside an automatic coffee machine:
bean basket → grinding → scale → water tank → boiler.
Make the technical and visual flow understandable.
```

### 渲染精确文字

把文案放进引号，说明出现次数；只写与文案相关的指令，不要混入无关要求。

```text
A campaign image for a youth streetwear brand called Thread.
Render the tagline "Yours to Create." exactly once, clearly and legibly.
No extra text, no watermarks, no unrelated logos.
```

### 设计可复用 logo

描述品牌与构成标志的形状，要求在不同尺寸下都清晰；用 `n` 一次生成多个方案。

```text
Original, non-infringing logo for Field & Flour, a local bakery.
Warm, simple, timeless; clean vector-like shapes, strong silhouette, balanced negative space.
Flat design, minimal strokes, no gradients unless essential.
Fully transparent background, centered, generous padding, clean alpha edges,
no backdrop, no checkerboard, no watermark.
```

### 历史与真实场景

给出地点与日期来锚定时代，然后逐项检查服装、陈设与环境是否符合史实。

```text
A realistic outdoor crowd scene in Bethel, New York on August 16, 1969.
Photorealistic, period-accurate clothing, staging, and environment.
```

### 故事转漫画

把叙事拆成一组清晰的视觉节拍，一格一个动作；描述要具体、以动作为中心。

```text
Create a short vertical comic-style reel with 4 panels.
Panel 1: The owner leaves through the front door...
Panel 2: The door clicks shut. Silence breaks...
Panel 3: The house transformed...
Panel 4: The door opens...
```

### 界面预览

把产品当作已经存在来描述，聚焦布局、层级、间距与真实控件；避免概念图语言，否则结果会像草图而不是可用界面。

```text
A realistic mobile app UI mockup for a local farmers market.
Header, vendor list with small photos and categories, a "Today's specials" section,
location and hours. White background, subtle natural accents, clear typography.
Place the mockup in an iPhone frame.
```

### 科学教育图

按教学设计的思路写：受众、学习目标、视觉形式、必需标签、科学约束。要求干净扁平的图标体系、一致的风格、清晰箭头与足够留白。标签密集时用 `quality="high"`。

```text
A simple biology diagram titled "Cellular Respiration at a Glance" for high school students.
Show glycolysis, the Krebs cycle, and the electron transport chain.
Label glucose, pyruvate, ATP, NADH, FADH2, CO2, O2, H2O.
White background, simple icons, clear labels, readable text. Avoid tiny text and decoration.
```

### 幻灯片与图表

把提示词当成「成品规格」而不是插画请求：说清交付物（幻灯片、流程图、图表、页面）、画布、层级，直接给出真实文字与数据。演示类用横向尺寸，含小字、图例、坐标轴或脚注时用 `quality="high"`。

```text
One pitch-deck slide titled "Market Opportunity", in the style of a real Series A deck.
TAM/SAM/SOM concentric circles with values $42B / $8.7B / $340M.
A bar chart of growth from 2021 to 2026; footnotes "AGI Research, 2024" and "Internal analysis".
Clean white background, Inter-like sans-serif, crisp minimal layout.
Avoid clip art, stock photography, gradients, shadows, decorative elements.
```

## 编辑类场景

编辑用 `client.images.edit`，需要精确局部时使用遮罩。

| 任务 | 写法要点 |
| --- | --- |
| 翻译并保留版式 | 只替换文字，明确「不要改动其他任何方面」；检查是否有残留原文 |
| 迁移视觉风格 | 指定参考图承担的角色（配色、质感、媒介），另写新主体 |
| 保留身份换装 | 列出不可变项：脸、五官、肤色、体型、姿势、表情、发型、比例；只允许衣服变化 |
| 组合多张参考图 | 按编号说明谁移到哪里、保留什么；用一句「其他都不变」收口 |
| 透明抠图 | 提示词要求独立主体，同时设 `background="transparent"`，输出 PNG/WebP |
| 草图变写实 | 保留布局、比例、透视，指定可信的材质与光线，禁止新增元素与文字 |
| 移除物体 | 点名要移除的对象，保留人物、姿势、光线与构图 |
| 插入人物 | 指定自然光线、身体取景、视线与交互；写明哪些面部特征与比例不可变 |

透明抠图的典型写法：

```text
Extract the product from the input image and isolate it on a fully transparent background.
Centered product, crisp silhouette, no halos or fringing.
Preserve product geometry and label legibility exactly.
Add only light polishing. Do not add a solid backdrop, checkerboard, scenery, or shadow.
```

注意两点：**画出来的棋盘格不是透明**；后续编辑时要重复「保持透明背景」的要求。

## 多轮精修

从一张输出开始，检查后再作为下一轮输入。每次的后续请求都要窄，这样才能看出是哪一步起了作用。

典型链路：先做一张广告牌效果图（文案逐字引用、要求只出现一次），再只改天气（「变成飘雪的冬夜」），最后保持角色一致性——把角色的外观、比例、服装、气质写成可复用的参考，后续场景重复这些约束，并明确「不要重新设计角色」。

## 验收清单

出图后逐条检查：

- 必需文字是否准确、可读？图表的标签与关系是否正确？
- 身份、产品形状、标签与参考细节是否完整保留？
- 编辑是否只改了要求改的部分？
- 需要透明时，文件里是否有真正的 alpha 通道，而不是画出来的背景？
- 更换提示词或模型时，是否在有代表性的输入上比较了质量、延迟与成本？

## 理解检验

**1. 为什么第一次比较两个模型时，要把 quality、提示词、参考图和尺寸全部固定？**

参考答案：因为这些因素都会影响画质与延迟。只换模型而固定其余变量，才能把差异归因于模型本身。如果同时改了 quality，就无法判断结果变化是模型带来的还是参数带来的；而且同样的 quality 标签在不同模型上并不等价，混在一起比较没有意义。

**2. 自定义分辨率有哪些硬性限制？举一个不合法的例子并说明原因。**

参考答案：每条边不超过 3840 像素；两边都是 16 的倍数；长边与短边之比不超过 3:1；总像素在 655,360 到 8,294,400 之间。例如 `1000x1000` 不合法，因为 1000 不是 16 的倍数；`4000x1000` 既不满足边长上限，比例也正好卡在 3:1 边界且总像素超限。

**3. 为什么说「画出来的棋盘格不是透明」？在 API 层要怎么做？**

参考答案：棋盘格只是把「透明」画成了灰白方格的像素，文件本身仍是不透明的 RGB 图像，放到别的背景上会出现白框。真正的透明需要图像格式带 alpha 通道：请求时显式设置 `background="transparent"`，输出用 PNG 或 WebP，并且不要对 PNG 设置 `output_compression`。

**4. 编辑时「只改 X」还不够，为什么还要列出保留项？**

参考答案：因为模型对「不要改」的理解是模糊的。明确列出身份、几何、版式、光线、标签等不变项，等于给出了可检查的约束；否则模型可能为了完成 X 而顺带调整相邻区域。多轮编辑尤其如此——每轮都可能累积漂移，所以每次都要重申约束并在输出后检查。

**5. 多轮精修时，为什么每次只要求一个改动？**

参考答案：为了定位因果。一次只改一件事，结果变好或变坏才能归因到那个改动；同时改多处，失败时无法判断是哪一处引起的，也无法决定保留哪个方向。把上一轮输出作为下一轮输入，再配合重复的保留约束，可以逐步逼近目标。

**6. 从旧模型迁移到新模型时，什么时候应该停在 Sunburst，不再切到 Flare？**

参考答案：当 Flare 无法在可接受质量下满足需求时。流程是先确认 Sunburst 达到质量要求，再用同样的提示词、参考图和尺寸测 Flare；只有当 Flare 的质量仍可接受、且延迟确实下降时才切换。如果 Flare 在任何可接受的质量档位下都不达标，就保留 Sunburst——质量优先于延迟。

## 与前后内容的关系

这篇讲的是「生成与编辑单张图」的写法。把它用于批量素材时，真正的难点会转移到验证与复用：如何确认每张图都带 alpha 通道、如何在图表里核对数据、如何把同一套提示词稳定复现。这些内容在同系列的「透明素材」一篇里展开。
