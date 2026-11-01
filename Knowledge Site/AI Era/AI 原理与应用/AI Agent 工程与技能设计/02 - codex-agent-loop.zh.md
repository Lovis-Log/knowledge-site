---
slug: 02-codex-agent-loop
title: "拆解 Codex 的 Agent 循环：prompt、缓存与压缩"
summary: "一次用户请求如何变成一串 API 请求：prompt 由哪些项拼成、工具调用结果如何回填、为什么每个新请求都以旧 prompt 为前缀，以及缓存失效与上下文压缩各自在解决什么问题。"
updatedAt: 2026-11-01
content_type: technical-tutorial
categories: [ai-agents, ai-coding]
tags: [agent-loop, codex, tool-use, context-management]
sources:
  - kind: article
    title: "Unrolling the Codex agent loop"
    url: https://openai.com/index/unrolling-the-codex-agent-loop/
    author: Michael Bolin
---

## 术语先对齐

Codex 是 OpenAI 一系列软件 agent 的总称（CLI、Cloud、VS Code 扩展）。本文讨论的是 Codex 的 **harness**：所有 Codex 体验共用的核心循环与执行逻辑，通过 CLI 呈现。文中「Codex」与「Codex CLI」互换使用。

三个容易混淆的词：

- **turn（轮次）**：从一次用户输入到一次 agent 回复之间的完整过程。一次 turn 内部可以包含许多次「模型推理 → 工具调用」的迭代。
- **thread（线程）**：一整段多轮对话。
- **harness**：负责组织这些过程的程序，也就是「agent」本身；模型只是它调用的一个组件。

## 循环本身

Agent loop 的骨架可以写成四步：

1. 接收用户输入，把它和系统指令一起组织成 **prompt**。
2. 调用模型（**inference**）：prompt 先被切成 token，模型采样出新的 token 序列，再还原成文本。
3. 模型要么给出最终回复，要么发出一个 **工具调用**（例如「运行 `ls` 并报告输出」）。
4. 如果是工具调用，harness 执行它，把输出追加到原 prompt 后面，带着新信息再次查询模型。

循环持续到模型不再请求工具、而是输出一条面向用户的 **assistant message** 为止。这条消息是这一轮的终止信号，控制权交回用户。

有一点常被忽略：agent 的「输出」不只限于这条消息。它可能已经在你的机器上写了代码、改了文件；但无论做了多少事，每轮都以一条 assistant message 收尾。

## 一个请求长什么样

Codex 通过 **Responses API** 发请求。请求体里最关键的是三个字段：

| 字段 | 作用 |
| --- | --- |
| `instructions` | 系统或开发者指令，插到模型上下文最前面 |
| `tools` | 模型可以调用的工具列表（JSON Schema 描述） |
| `input` | 文本、图像、文件等输入项组成的列表 |

`instructions` 的来源：如果 `~/.codex/config.toml` 指定了 `model_instructions_file`，就用那个文件；否则用模型自带的 `base_instructions`（例如仓库里的 `gpt-5.2-codex_prompt.md`）。

`tools` 里有三类来源：CLI 自带的（`shell`、`update_plan`）、Responses API 提供的（如 `web_search`）、用户通过 MCP 服务器提供的（如 `mcp__weather__get-forecast`）。

## 初始 prompt 的拼装顺序

用户消息并不是第一个进入 `input` 的项。Codex 在它之前依次插入：

1. **权限说明**（`role=developer`）：描述 sandbox 给哪些目录写权限、有没有网络、什么情况下要请求用户批准。注意它只约束 Codex 自带的 `shell` 工具；MCP 工具不受这个 sandbox 约束，需要各自实现保护措施。
2. **开发者指令**（可选，`role=developer`）：来自 `config.toml` 的 `developer_instructions`。
3. **用户指令**（可选，`role=user`）：这是聚合来的，不是单一文件：
   - `$CODEX_HOME` 下的 `AGENTS.override.md` 与 `AGENTS.md`
   - 从项目根目录到 `cwd` 逐层查找 `AGENTS.override.md`、`AGENTS.md` 或配置里指定的备用文件名，总预算默认 32 KiB
   - 如果配置了 skills：一小段前言、每个 skill 的元数据、以及如何使用 skill 的说明
4. **环境上下文**（`role=user`）：当前工作目录与用户 shell。

```text
<environment_context>
  <cwd>/Users/mbolin/code/codex5</cwd>
  <shell>zsh</shell>
</environment_context>
```

最后才追加真正的用户消息。每条项的格式都是 `type` / `role` / `content` 的 JSON 对象。

一个细节：前三个系统级项的顺序由 **API 服务器**决定，不由客户端决定；但其中 `tools` 与 `instructions` 的内容由客户端控制。

## 流式响应与工具回填

请求发出去后，服务器返回一条 **SSE**（Server-Sent Events）流，每个事件的数据是一个带 `type` 的 JSON：

```text
data: {"type":"response.reasoning_summary_text.delta","delta":"ah ", ...}
data: {"type":"response.output_item.added", "item":{...}}
data: {"type":"response.output_text.delta","delta":"forty-", ...}
data: {"type":"response.completed","response":{...}}
```

Codex 消费这些事件，一类用于界面流式显示（`response.output_text.delta`），另一类被转成对象追加到下一次请求的 `input` 里（`response.output_item.added`）。

假设第一次请求返回了两项：一个 `type=reasoning`（模型的推理摘要，带 `encrypted_content`），一个 `type=function_call`（调用 `cat README.md`）。执行工具后，`input` 变成：

```javascript
[
  /* ... 原来的 5 项 ... */
  { "type": "reasoning", "summary": [...], "encrypted_content": "gAAAAAB..." },
  { "type": "function_call", "name": "shell",
    "arguments": "{\"command\":\"cat README.md\",\"workdir\":\"/Users/mbolin/code/codex5\"}",
    "call_id": "call_8675309..." },
  { "type": "function_call_output", "call_id": "call_8675309...",
    "output": "..." }
]
```

关键性质：**旧 prompt 是新 prompt 的精确前缀**。这不是巧合，而是刻意设计——只有前缀完全一致，才能命中 prompt 缓存。

## 为什么前缀性质决定性能

如果每一轮都把整段对话重新发一遍，JSON 体积会随轮次数呈**二次增长**。Responses API 提供了 `previous_response_id` 参数来避免这一点，但 Codex 没有使用，原因有两个：

- 保持请求**完全无状态**，服务端不需要保存会话。
- 支持 **ZDR**（Zero Data Retention）客户：保存会话状态与「不留存数据」相冲突。ZDR 客户不会因此失去跨轮的专有推理内容，因为对应的 `encrypted_content` 可以在服务端解密（OpenAI 保存解密密钥，但不保存数据）。

真正的成本大头不是网络传输，而是**模型采样**。因此优化重点是让采样复用上一次的计算——这就是 prompt 缓存。命中缓存时，采样代价从二次增长变成线性增长。

缓存只对**精确前缀**生效，所以静态内容（指令、示例）要放前面，易变内容（用户信息）放后面；图像与工具定义在多次请求之间也必须完全一致。

### 什么会让缓存失效

- 对话中途改变 `tools` 列表。
- 更换 `model`（模型专用的 instructions 会变，相当于改了 prompt 的第三项）。
- 改变 sandbox 配置、批准模式或当前工作目录。

Codex 团队在加新功能时必须非常小心。一个真实例子：最初支持 MCP 工具时，枚举工具的顺序不一致，直接导致缓存失效。MCP 尤其麻烦，因为服务器可以随时通过 `notifications/tools/list_changed` 改变工具列表；在长对话中途响应这个通知，代价就是一次昂贵的缓存未命中。

可行的做法是把「中途变化」写成**追加一条新消息**，而不是修改之前的消息：

- sandbox 或批准模式变化：追加一条 `role=developer` 消息，格式与最初的权限说明相同。
- 工作目录变化：追加一条 `role=user` 消息，格式与最初的环境上下文相同。

## 上下文窗口与压缩

即使有缓存，prompt 仍在不断增长，最终会撞上 context window（输入与输出共享同一个上限）。Codex 的策略是：token 数超过阈值就**压缩**对话——用一个更小的项列表替换原来的 `input`，让 agent 带着「到目前为止发生了什么」的理解继续。

早期实现要求用户手动执行 `/compact`，它会把现有对话加上总结指令发给模型，再用返回的总结作为新的 `input`。

后来 Responses API 提供了专门的 `/responses/compact` 端点，压缩更高效：它返回一组可直接替代旧 `input` 的项，其中包含一个 `type=compaction` 的项，内部的 `encrypted_content` 保留了模型对原对话的潜在理解。现在 Codex 在超过 `auto_compact_limit` 时自动调用这个端点。

压缩是**有损**的：细节会被概括掉。因此它解决的是「还能不能继续」，不是「信息是否完整」；需要长期保留的事实应当写进文件或 `AGENTS.md`，而不是指望对话历史不被压缩。

## 本节结论

- 一次 turn 内部可以有多次「推理 → 工具调用」，但总是以 assistant message 结束。
- 请求体由 `instructions`、`tools`、`input` 三部分构成；`input` 的顺序由 Codex 拼装，用户消息排在系统级项之后。
- 每次工具调用后，旧 prompt 会成为新 prompt 的精确前缀，从而命中缓存。
- 缓存失效主要来自工具列表、模型、sandbox/cwd 的变化；MCP 工具顺序是典型陷阱。
- 采样成本远高于传输成本，缓存把二次增长压成线性。
- 上下文压缩用有损摘要换取继续工作的能力，重要事实应落到文件里。

## 理解检验

**1. 为什么说 agent 的「输出」不只是最后那条 assistant message？**

参考答案：因为 agent 在循环中执行工具调用，而工具可以修改本地环境——写文件、改代码、运行命令。这些副作用本身就是工作的主要产物。assistant message 的作用是标记这一轮结束、把控制权交回用户（例如「我已经把你要的 architecture.md 加上了」），但它不代表全部输出。

**2. 旧 prompt 是新 prompt 的精确前缀，这个性质为什么重要？**

参考答案：因为 prompt 缓存只对精确前缀命中。每次工具调用后，Codex 把工具输出追加到原 prompt 末尾，前面所有内容不变，于是下一次请求可以直接复用上一次的采样计算，成本从随轮次二次增长变成线性增长。如果改动出现在中间（例如重排工具定义），前缀就被破坏，缓存失效。

**3. 列出三种会导致缓存未命中的操作，并说明为什么。**

参考答案：一是对话中途改变 `tools` 列表——工具定义属于 prompt 前部内容，一变前缀即断；二是更换模型——模型专用的 instructions 会改变 prompt 的第三项；三是改变 sandbox 配置、批准模式或工作目录——这些内容原本写在系统级项里，Codex 为避免破坏前缀会改为追加新消息，但如果直接修改旧项同样会失效。另外 MCP 服务器动态改变工具列表（顺序或内容）也会造成失效。

**4. Codex 为什么不用 `previous_response_id` 来减小请求体积？**

参考答案：为了保持请求完全无状态，并支持 Zero Data Retention 客户。`previous_response_id` 需要服务端保存会话状态，这与「不留存数据」的要求冲突。放弃它之后，请求体积随轮次二次增长，但真正的成本大头是模型采样，而缓存已经能把采样代价摊平。

**5. 上下文压缩解决了什么问题？它有什么代价？**

参考答案：它解决 prompt 不断增长、最终超出 context window 的问题：把 `input` 替换成一组更小的、能代表对话的项（新版通过 `/responses/compact` 返回包含 `type=compaction` 与 `encrypted_content` 的项），让 agent 能继续工作。代价是有损——细节被概括掉，因此需要长期保留的事实应写进文件或 `AGENTS.md`，不能依赖对话历史。

**6. 如果要新增一个「对话中途改变工作目录」的功能，为什么不能直接改 `input` 里的环境上下文项？**

参考答案：因为那会破坏「旧 prompt 是新 prompt 前缀」的性质，导致整段缓存失效，长对话下代价很高。正确做法是追加一条格式相同的新 `role=user` 消息来记录变化，让前缀保持不变。

## 与前后内容的关系

这篇讲的是 harness 如何组织上下文。它和 Skill 写作正好互补：Skill 决定往上下文里放什么（见同系列的「Skill 写作」一篇），agent loop 决定这些内容如何被反复发送、缓存与压缩。理解了两者，才能解释为什么「把重要约束写进文件」比「在对话里反复强调」更可靠。
