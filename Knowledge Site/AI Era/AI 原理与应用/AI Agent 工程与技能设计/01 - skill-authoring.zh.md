---
slug: 01-skill-authoring
title: "Skill 写作：让指令短、准、可验证"
summary: "Skill 与提示词的关键差别在于上下文是公共资源。本文按「精炼、自由度、渐进披露、工作流、评测」五条主线，给出 description、结构拆分、脚本与验证循环的具体写法，并列出交付前的检查清单。"
updatedAt: 2026-11-01
content_type: reference
categories: [ai-agents]
tags: [agent-skills, instruction-design, evaluation, workflows]
sources:
  - kind: article
    title: "Skill authoring best practices"
    url: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
---

## 为什么写 Skill 和写提示词不一样

上下文窗口是**公共资源**。一个 Skill 要和系统提示、对话历史、其他 Skill 的元数据、以及用户当前的请求共享同一份预算。

启动时并不会加载全部内容：只有每个 Skill 的元数据（`name` 与 `description`）被预载进系统提示；当任务与某个 Skill 相关时，才读取它的 `SKILL.md`；其余文件按需读取。即便有这种分层，`SKILL.md` 一旦被读入，其中每个 token 都在和对话历史竞争。

因此作者要持有的默认假设是：**Claude 本身已经很聪明**。只补充它不知道的东西。对每一段内容追问三次：

- Claude 真的需要这段解释吗？
- 这段信息能不能默认为已知？
- 这段文字付得起它的 token 成本吗？

一个直观对比。下面约 50 token：

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

下面约 150 token，多出来的部分几乎全是「PDF 是什么」「库怎么装」这类模型已知的信息：

> PDF（Portable Document Format）是一种常见文件格式，包含文本、图像和其他内容。要提取文本，你需要使用一个库。有很多库可以处理 PDF，但推荐 pdfplumber，因为它易用且覆盖大多数情况。首先你需要用 pip 安装它。然后可以使用下面的代码……

精炼不是省字，而是**只写不可推导的部分**：项目约定、踩过的坑、必须遵守的顺序。

## 自由度：按任务的脆弱程度调节

同一个 Skill 里，不同步骤可以给不同的约束强度。

### 高自由度：文本指令

适用于多种做法都成立、决策依赖上下文、靠启发式判断的场景。例如代码审查：

```
1. 分析代码结构与组织
2. 检查潜在缺陷与边界情况
3. 提出可读性与可维护性改进
4. 核对是否符合项目约定
```

### 中自由度：带参数的伪代码或模板

适用于存在首选模式、但允许一定变化的场景。

```python
def generate_report(data, format="markdown", include_charts=True):
    # 处理数据
    # 按指定格式输出
    # 可选地加入可视化
```

### 低自由度：固定脚本、几乎无参数

适用于操作脆弱、必须保持一致、顺序不可变的场景。

```bash
python scripts/migrate.py --verify --backup
```

并明确写出：不要修改这条命令，也不要加额外参数。

一个类比：把 Claude 想成在路径上行走的机器人。**两侧是悬崖的窄桥**只有一条安全路线，要给足护栏和精确指令；**没有障碍的旷野**则给出方向即可，让它自己找路。数据库迁移属于窄桥，代码审查属于旷野。

### 跨模型测试

Skill 是模型的附加物，效果取决于底层模型。计划在哪些模型上使用，就要在哪些模型上测试：

- Haiku（快、经济）：指令是否足够？
- Sonnet（均衡）：是否清晰高效？
- Opus（推理强）：有没有过度解释？

对 Opus 恰到好处的说明，对 Haiku 可能不够；跨模型使用时，取三者都能工作的写法。

## 结构

### 命名

`name` 只能用大写之外的小写字母、数字与连字符。推荐**动名词形式**（动词 + -ing），直接说明这个 Skill 提供的活动：

- `processing-pdfs`
- `analyzing-spreadsheets`
- `managing-databases`
- `testing-code`

也可接受名词短语（`pdf-processing`）或祈使式（`process-pdfs`）。要避免的是：`helper`、`utils`、`tools` 这类模糊名；`documents`、`data`、`files` 这类过泛名；以及 `anthropic-helper` 这类保留词。同一套 Skill 里保持同一种命名风格。

### description 决定能不能被发现

每个 Skill 只有一个 `description` 字段，Claude 靠它在上百个候选里挑选。写法必须同时回答两件事：**它做什么**、**什么时候用**。

有效的例子：

- PDF：`Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.`
- Excel：`Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.`
- Git：`Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.`

无效的例子：`Helps with documents`、`Processes data`、`Does stuff with files`。它们没有提供任何可用于选择的信号。

### 渐进披露

`SKILL.md` 的定位是目录与总览，细节放进按需读取的文件。经验规则：**正文控制在 500 行以内**，接近上限就拆分。

三种常见组织方式。

**一、高层指南 + 引用。** 主文件给快速上手，高级内容指向独立文件：

```
## Advanced features

**Form filling**: See FORMS.md for complete guide
**API reference**: See REFERENCE.md for all methods
**Examples**: See EXAMPLES.md for common patterns
```

**二、按领域组织。** 多领域 Skill 按主题分文件，问销售指标时只读销售相关 schema：

```
reference/finance.md   收入、账单指标
reference/sales.md     商机、管道
reference/product.md   使用量与功能
reference/marketing.md 活动与归因
```

**三、条件细节。** 基础内容写在主文件，高级能力单独成文，只在需要时读取：

```
## Editing documents

简单修改直接改 XML。需要修订痕迹时看 REDLINING.md；需要 OOXML 细节时看 OOXML.md。
```

### 引用不要嵌套

当文件 A 引用文件 B、文件 B 再引用文件 C 时，Claude 可能用 `head -100` 之类的方式预览，而不是完整读取，结果拿到的是残缺信息。规则是：**所有引用文件都直接从 `SKILL.md` 链接，深度只有一层。**

反例：

```
SKILL.md → advanced.md → details.md → 真正的内容
```

正例：

```
SKILL.md
**Basic usage**: 直接写在 SKILL.md
**Advanced features**: advanced.md
**API reference**: reference.md
**Examples**: examples.md
```

超过 100 行的参考文件，在顶部加目录，这样即使只预览开头也能看到全貌。

## 工作流与反馈循环

### 用清单固定复杂流程

把复杂操作拆成顺序步骤，并给出一份可以复制到回复里逐项勾选的清单：

```
Research Progress:
- [ ] Step 1: Read all source documents
- [ ] Step 2: Identify key themes
- [ ] Step 3: Cross-reference claims
- [ ] Step 4: Create structured summary
- [ ] Step 5: Verify citations
```

每个步骤下面再写具体要求。清单的价值不只是好看：它让 Claude 不会跳过关键验证步骤。

### 验证 → 修复 → 再验证

最常见的质量模式是「运行校验器 → 修正错误 → 重复」。没有代码的 Skill 也能用：把风格指南当作「校验器」，逐条比对后修订。

有代码时更直接：

```
1. 修改 word/document.xml
2. 立即验证：python ooxml/scripts/validate.py unpacked_dir/
3. 验证失败就按错误信息修正，再验证
4. 只有验证通过才继续
5. 打包：python ooxml/scripts/pack.py unpacked_dir/ output.docx
6. 测试输出文档
```

关键在「只有通过才继续」这一句。没有它，模型倾向于带着错误往下走。

## 内容准则

### 不要写会过期的事实

「2025 年 8 月之前用旧 API」这类句子，几个月后就是错的。替代写法是分层：主内容只写当前方法，旧方法收进「旧模式」小节，并注明弃用日期。历史信息保留但不干扰主流程。

### 术语保持一致

- 好：始终用「API endpoint」「field」「extract」。
- 差：在「API endpoint / URL / API route / path」之间混用，在「field / box / element / control」之间混用。

一致性直接影响模型能否正确匹配指令。

## 常见模式

### 模板模式

对格式严格要求的输出（API 响应、数据文件），给出固定模板并写「必须完全使用这个结构」。对需要灵活判断的输出，给出一个「合理默认」，并说明可按分析类型调整。

### 示例模式

当输出风格难以用规则描述时，给输入输出对。提交信息就是典型：三条「输入 → 输出」示例，比一段「要写得简洁清楚」有效得多。

### 条件工作流模式

把决策点显式写出来：

```
1. 判断修改类型：
   新建内容？→ 走「创建流程」
   编辑已有内容？→ 走「编辑流程」
2. 创建流程：用 docx-js 从零构建，导出 .docx
3. 编辑流程：解包 → 改 XML → 每步验证 → 重新打包
```

## 评测驱动开发

**先建评测，再写文档。** 否则你写的是想象中的问题。

流程：

1. **找缺口**：让 Claude 在没有 Skill 的情况下跑代表性任务，记录具体失败点。
2. **建评测**：针对这些缺口设计三个场景。
3. **测基线**：记录没有 Skill 时的表现。
4. **写最小指令**：只为补上缺口而写。
5. **迭代**：跑评测、对比基线、改进。

评测条目的结构可以直接用 JSON 描述：

```json
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from this PDF file and save it to output.txt",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "使用合适的 PDF 库或命令行工具读取文件",
    "提取所有页面的文本，不遗漏",
    "将结果以清晰可读的格式保存到 output.txt"
  ]
}
```

### 用两个 Claude 迭代

最有效的开发方式是让 Claude 同时扮演两个角色：

- **Claude A**：帮你设计、精简、重构指令。
- **Claude B**：加载 Skill 后在真实任务里使用它。

流程是：先不用 Skill 完成任务，注意自己反复提供了哪些上下文；让 Claude A 把这些固化成 Skill；用 Claude B 在相近任务上测试；把观察到的失败带回给 Claude A，例如「它忘了过滤测试账号，这条规则是不是不够显眼？」；改完再测。

这个循环之所以有效，是因为 Claude A 懂「agent 需要什么信息」，你提供领域知识，Claude B 用真实使用暴露缺口。

### 观察它怎么读你的 Skill

迭代时留意四类信号：

- **意外的探索顺序**：说明目录结构不够直观。
- **漏掉的链接**：引用需要更显眼。
- **反复读同一个文件**：那段内容也许该放进主文件。
- **从不打开的文件**：可能是多余的，或者入口提示太弱。

## 带可执行代码的 Skill

### 让脚本自己解决问题，而不是把问题丢回去

处理错误，而不是让 Claude 兜底：

```python
def process_file(path):
    """读取文件；不存在时创建默认文件并返回空内容。"""
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

反例只有一行 `return open(path).read()`：失败时把诊断工作全部推给模型。

### 不要留「巫毒常数」

每个常量都要说明取值理由：

```python
# HTTP 请求通常在 30 秒内完成，放宽以照顾慢连接
REQUEST_TIMEOUT = 30

# 三次重试在可靠性与速度之间平衡，多数间歇性故障第二次重试即可恢复
MAX_RETRIES = 3
```

`TIMEOUT = 47  # 为什么是 47？` 这种写法让 Claude 无法判断能否修改。

### 预置脚本优于现场生成

把确定性操作写成脚本，好处是：比生成的代码更可靠、不占用上下文、跨次使用保持一致。同时要在指令里**区分「运行」与「阅读」**：

- 运行（最常见）：`Run analyze_form.py to extract fields`
- 当参考阅读（逻辑复杂时）：`See analyze_form.py for the field extraction algorithm`

### plan → validate → execute

对批量、破坏性、高风险的改动，先让 Claude 产出一份结构化的计划文件，用脚本校验，再执行。例如批量更新 50 个 PDF 表单字段：

```
analyze → create changes.json → validate plan → execute → verify
```

这样做能提前发现「字段不存在」「值冲突」「漏了必填项」等问题，而且计划可以反复修改而不触碰原文件。校验脚本要把错误写具体：`Field 'signature_date' not found. Available fields: customer_name, order_total, signature_date_signed`。

### 依赖与环境

不同运行环境的能力不同：claude.ai 可以从 npm、PyPI 安装包并从 GitHub 拉取仓库；Claude API 没有网络访问，也不能在运行时安装。所以要在 `SKILL.md` 里列出依赖，并**显式写出安装步骤**，不要假设库已经装好。

### MCP 工具要写全限定名

格式是 `ServerName:tool_name`，例如 `BigQuery:bigquery_schema`、`GitHub:create_issue`。省略服务器前缀时，多服务器环境下容易「找不到工具」。

### 路径一律用正斜杠

`reference/guide.md` 可以跨平台工作，`reference\guide.md` 在 Unix 系统上会出错。参考文件名要能说明内容：`form_validation_rules.md` 好过 `doc2.md`。

## 反模式清单

- 给出一堆并列选项而不给默认值（「你可以用 pypdf，或 pdfplumber，或 PyMuPDF……」）。
- 嵌套引用（A → B → C）。
- 把时效性信息写进正文。
- 同一概念换着词说。
- 脚本站不住脚时把错误推给模型。
- 无理由的魔法数字。
- Windows 风格路径。

## 交付前检查

核心质量：

- description 具体、含关键词，且同时说明「做什么」与「何时用」。
- `SKILL.md` 正文少于 500 行，其余内容已拆分。
- 没有时效信息，或已收进「旧模式」。
- 术语一致，示例具体。
- 引用只有一层深。
- 工作流有明确步骤。

代码与脚本：

- 脚本自己处理错误。
- 没有未解释的常量。
- 依赖已列出并验证可用。
- 全部使用正斜杠。
- 关键操作有验证步骤。
- 质量关键任务有反馈循环。

测试：

- 至少三个评测场景。
- 在计划使用的模型上都测过。
- 用真实任务验证过。

## 理解检验

**1. 为什么 `description` 对 Skill 能否被触发的影响，往往大于 `SKILL.md` 正文？**

参考答案：因为选择发生在读取正文之前。启动时进入系统提示的只有每个 Skill 的元数据（`name` 与 `description`），模型要先根据这些信息判断「当前任务是否属于这个 Skill」，只有判定相关才会去读 `SKILL.md`。正文写得再好，如果 description 没有覆盖用户可能使用的关键词与场景，Skill 根本不会被加载。所以 description 要同时写清能力与触发条件。

**2. 什么情况下应该给低自由度（固定脚本、禁止改参数）？**

参考答案：当操作脆弱、易错，或者必须严格保持顺序与一致性时。典型例子是数据库迁移：顺序错了或参数被改动，可能造成不可逆的数据损坏。判断标准是「是否只有一条安全路径」。反之，像代码审查这种上下文决定最优做法的任务，应给高自由度。

**3. 为什么要求引用文件最多只有一层深度？**

参考答案：因为嵌套引用会让模型在读取时偷懒。遇到 A 引用 B、B 再引用 C 时，模型可能不完整读取，而是用 `head` 之类的方式预览，从而拿到残缺信息并据此行动。所有文件都直接从 `SKILL.md` 链接，能保证需要时读到完整内容。

**4. 评测驱动开发的第一步是什么？为什么不能直接从写文档开始？**

参考答案：第一步是在**没有 Skill** 的情况下让 Claude 跑代表性任务，记录具体的失败与缺失上下文，然后据此建立评测与基线。直接从写文档开始，等于在解决想象中的问题：可能写了很多模型本来就懂的内容，却漏掉真正的缺口，而且没有基线就无法判断改动是否有效。

**5. `plan → validate → execute` 适合什么场景？举一个例子说明它防住了什么错误。**

参考答案：适合批量操作、破坏性改动、复杂校验规则或高风险操作。例子是批量更新 PDF 表单的 50 个字段：先让模型分析表单并生成 `changes.json`，再用脚本校验字段是否存在、值是否冲突、必填项是否遗漏，确认后才执行。它防住的是「引用了不存在的字段」「生成了互相冲突的值」「漏改必填字段」这类在执行后很难回滚的错误。

**6. 为什么脚本里不能出现没有解释的常量？**

参考答案：因为模型需要判断这个值能不能改、在什么条件下改。`TIMEOUT = 47` 不提供任何依据，模型既无法复用也无法在环境变化时调整；而「HTTP 请求通常 30 秒内完成，放宽以照顾慢连接」这样的注释，说明了取值理由与适用边界，模型据此可以判断是否该调整。

## 与前后内容的关系

这篇是 Skill 的写法规范，重点在「指令如何被模型读取与执行」。它和 Codex 那样的 agent 循环是同一问题的两面：Skill 决定**给模型什么上下文**，agent 循环决定**这些上下文如何被反复送入模型、如何被缓存与压缩**。阅读《AI Agent 工程》的「拆解 Codex 的 Agent 循环」一篇，可以看到后者在工程上的实现。
