---
name: behavior-driven-development
description: Use when 跨业务和技术角色需要围绕具体真实示例共同发现、表述并自动化可观察行为，以澄清规则、边界、验收条件或共享语言
---

# Behavior-Driven Development：行为驱动开发

## 核心原则

BDD 围绕用户视角的具体真实示例，让业务、开发与测试角色共同理解问题，再以小增量把这份理解推进到实现。它是持续协作的开发方法；测试语法、工具选型、文档和自动化检查都服务于有价值的可工作软件。

## 检查前提

- **采用判据**：需求没有明确具体设计，需以可执行行为表达用户需求时采用 BDD；有 / 会产生规格文档时转 [spec-driven-development](../spec-driven-development/SKILL.md)；行为单一的小功能（bug 修复、函数开发 / 重构）时转 [test-driven-development](../test-driven-development/SKILL.md)。
- **可行前提**：预期业务行为、规则边界、异常结果或范围存在会影响实现的理解差异；能识别真实用户、业务角色或调用方并取得领域规则或权威输入；示例能在真实系统边界观察业务结果，而非只检查内部字段或协作者调用；工作能切成即将交付的小行为增量。具体做法见下文各节。

行为已明确且不存在共享理解缺口时，直接进入适合的实现方法。不为采用 BDD 组织无助于澄清共享理解的会议、场景文件或自动化。

## Discovery

1. 选择一个小的待交付变化，用用户问题或业务结果界定讨论范围。
2. 让能代表业务、开发和测试视角的参与者，或相应的权威材料，共同检查具体真实示例。
3. 从示例中识别业务规则、边界、反例、范围外内容和待回答问题。优先暴露理解差异，不急于讨论测试代码。
4. 推迟当前增量不需要的低优先级行为，保持反馈周期短小。

Discovery 是「讨论节点」内以具体示例为中心的收敛型对话：头脑风暴（[brainstorming](../brainstorming/SKILL.md)）负责发散生成选项与业务取舍，Discovery 用示例暴露差异并收敛出规则边界，两者衔接而非替代。可用 Example Mapping（规则 / 示例 / 问题卡片）或 Three Amigos（业务、开发、测试三角色）等可选技术组织对话，非必需。Discovery 的结果是共享理解和仍待确认的问题，不是越多越好的示例清单。

## Formulation

1. 选择能区分正确与错误行为的代表性示例，用领域语言表述前置情境、事件和可观察结果。
2. 让表述既便于业务人员审阅，也能连接自动化，并再次确认各角色对结果含义一致。
3. 保留业务意图，移除数据库字段、私有方法、界面选择器等非必要实现细节。
4. 只在确有表达收益时使用 Given / When / Then 或其他结构化格式；格式不是 BDD 的判据。

## Automation

1. 一次选择一个已达成共识且有长期回归价值的示例，连接到能保留该业务行为的真实系统边界。
2. 依据已确认示例推进实现，并在同一真实边界自动化观察结果。自动化可随当前小增量演进，但不能用未确认断言改写约定行为。
3. 内部确定性规则具有独立目标、产物和反证边界时，返回 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md)，把它拆成实现与证据单元并重新选法。完成后回到当前 Automation 验证业务结果。

   不能独立拆分时，低层测试只是 Automation 的辅助技术，不能用内部单元测试替代验收行为。
4. 运行自动化示例并核对业务结果。出现新信息时返回 Discovery 或 Formulation，不让代码或测试单方面改写约定行为。

BDD 由 Discovery、Formulation 与 Automation 共同组成。同一行为切片不重复叠加需求发现、场景表述或自动化流程。

## 形成证据

- 经共同确认的规则、示例、反例、范围和未决问题；
- 以领域语言表述、能被真实调用方观察的验收场景；
- 有自动化收益时，连接真实系统行为的可执行规格及其运行结果；
- 新反馈出现后，共享理解、场景和实现重新一致的记录。

Discovery 与 Formulation 证明团队已形成可审查的共享理解；只有连接系统并运行的 Automation 能证明当前实现与示例一致。

## 排除与衔接

- 已指定的静态内容、内部字面量、类型声明、私有结构或协作调用不需要制造业务场景。精确内容本身属于外部契约时，在真实使用边界验证其效果。
- 业务示例揭示出值得编码的稳定领域状态时，把类型建模拆成独立工作单元，交给 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md)。BDD 继续拥有可观察业务结果，不检查内部类型形状。
- 不自动化所有示例。通过 [evidence-management](../evidence-management/SKILL.md) 按回归风险、失败信号和维护成本选择长期证据。
- 关键业务取舍尚未决定时使用 [brainstorming](../brainstorming/SKILL.md)。BDD 用示例揭示差异，不替用户决定业务政策。
- 复杂功能还需要让需求、设计、任务和实现持续可追溯时，把规格链交给独立 [spec-driven-development](../spec-driven-development/SKILL.md) 单元。BDD 只拥有当前行为切片的 Discovery、Formulation 与 Automation；SDD 链接其场景和结果而不重复实现。
- [documentation](../documentation/SKILL.md) 与 [execution](../execution/SKILL.md) 分别负责文档管理与执行，不替代 Discovery、Formulation 与 Automation。
