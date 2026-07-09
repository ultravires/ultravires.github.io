---
title: 什么是 agent skills ？
date: 2026-02-24 10:12:58
categories:
  - 人工智能
---

[Agent Skills](https://agentskills.io/home) 是具有固定格式 “经验手册”。

---

**Agent Skills** 是由 Anthropic 最初开发并开源的一种**用于扩展 AI Agent（智能体）功能和专业知识的轻量级、开放式文件格式**。

简单来说，它就像是给 AI Agent 的“技能包”或“工作手册”，让 Agent 能够掌握特定的业务流程和专业领域知识。

## 🛠️ Agent Skills 的核心结构

一个 Agent Skill 在本质上是一个**包含特定文件的文件夹**，其标准目录结构如下：

- **`SKILL.md`（必需）**：技能的核心文件，包含该技能的名称（name）、描述（description）以及教导 Agent 如何执行特定任务的详细指令。
- **`scripts/`（可选）**：配套的可执行代码或脚本。
- **`references/`（可选）**：相关的参考文档或背景资料。
- **`assets/`（可选）**：模板、静态资源等。
- **`......`（可选）**：任何可选文件或文件夹。

```plaintext
skill-name/
├── SKILL.md          # 必须: 元信息 + 详细说明
├── scripts/          # 可选: 可执行脚本
├── references/       # 可选: 参考文档
├── assets/           # 可选: 模板文件, 资源文件
└── ...               # 任何可选文件或文件夹
```

## 🔄 它是如何工作的？

为了节省 AI 的上下文窗口（Context Window），Agent Skills 采用了渐进式开启（Progressive Disclosure）的机制，共分为三个阶段：

1. **发现 (Discovery)**：启动时，Agent 只加载所有可用技能的“名称”和“描述”，只需知道它们大概能做什么。
2. **激活 (Activation)**：当用户输入的任务与某个技能的描述相匹配时，Agent 才会把该技能的 `SKILL.md` 完整指令读入到当前对话的上下文中。
3. **执行 (Execution)**：Agent 按照指令一步步操作，并在需要时运行配套的脚本或读取参考资料。

## 🎯 为什么需要它？

- **沉淀领域专家经验**：可以将复杂的业务流程（如法律合同审查、特定格式的数据分析）固化为可复用的 AI 指令。
- **打造标准工作流**：将多步骤的任务变成规范化、可审计的流程，确保 AI 产出的稳定性。
- **跨平台通用**：作为一个开放标准，只需编写一次技能，就可以在所有支持 Agent Skills 格式的 AI 工具和客户端中无缝复用。

## 📖 辅助参考

[7分钟速通Agent Skills是什么？ 跟MCP|Workflow|Command|Prompt有什么关系？](https://www.douyin.com/video/7604675047747259658)
