---
name: behavior-driven-development
description: Use when 跨业务与技术角色需要围绕具体真实示例共同发现、表述并自动化可观察行为，以澄清规则、边界、验收条件或共享语言
---

# Behavior-Driven Development：行为驱动开发

## 核心原则

围绕用户视角的具体真实示例，让业务、开发与测试角色共同理解要解决的问题，并以小增量把这种理解推进到实现。BDD 是持续协作的开发方法，不是测试语法、工具选型或覆盖率活动；文档和自动化检查服务于有价值的可工作软件。

## 检查前提

- 预期业务行为、规则边界、异常结果或范围仍存在会影响实现的理解差异；
- 能识别真实用户、业务角色或调用方，并取得领域规则、代表性场景或权威输入；
- 示例可以观察系统产生的业务结果，而不是只能检查内部字段或协作者调用；
- 工作可以切成一个即将交付的小行为增量，便于快速获得反馈。

行为已经明确且不存在共享理解缺口时，直接进入适合的实现方法。不要为了采用 BDD 组织无收益的会议、场景文件或自动化。

## Discovery

1. 选择一个小的待交付变化，以用户问题或业务结果界定讨论范围。
2. 让能代表业务、开发和测试视角的参与者或权威材料共同检查具体真实示例。
3. 从示例中识别业务规则、边界、反例、范围外内容和仍需回答的问题；优先暴露理解差异，不急于讨论测试代码。
4. 推迟当前增量不需要的低优先级行为，保持反馈周期短小。

Discovery 的结果是共享理解和仍待确认的问题，不是越多越好的示例清单。

## Formulation

1. 选择能够区分正确与错误行为的代表性示例，用领域语言表述前置情境、事件和可观察结果。
2. 让表述同时便于业务人员审阅和自动化连接，并再次确认各角色对结果含义一致。
3. 保留业务意图，移除数据库字段、私有方法、界面选择器等非必要实现细节。
4. 只在确有表达收益时使用 Given / When / Then 或其他结构化格式；格式不是 BDD 的判据。

## Automation

1. 一次选择一个已经达成共识且有长期回归价值的示例，连接到能够保留该业务行为的真实系统边界。
2. 在行为尚未实现时确认检查因目标行为缺失而失败，再实现使示例成立的最小行为。
3. 内部确定性规则具有独立目标、产物和反证边界时，返回 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 把它拆成实现与证据单元并重新选法；只有同时具备独立稳定判据、真实测试接缝、具体回归风险和 Red-first 额外反馈收益时才进入 [test-driven-development](../test-driven-development/SKILL.md)，否则可以直接实现并补最低充分证据。完成后再回到当前 Automation 验证业务结果。不能独立拆分时，低层测试只是 Automation 的辅助技术，不再执行第二套完整流程，也不能用内部单元测试替代验收行为。
4. 运行自动化示例并核对业务结果。出现新信息时返回 Discovery 或 Formulation，而不是让代码或测试单方面改写约定行为。

稳定验收示例在实现前成为失败检查时具有 ATDD 的测试先行性质；BDD 还包含上游的 Discovery 与 Formulation，二者不能简单视为同义词。不要为同一组触发、流程和证据再套一层重复的 ATDD 仪式。

## 形成证据

- 经共同确认的规则、示例、反例、范围与未决问题；
- 使用领域语言表述、能够被真实调用方观察的验收场景；
- 有自动化收益时，连接真实系统行为的可执行规格及其运行结果；
- 新反馈出现后，共享理解、场景和实现重新一致的记录。

Discovery 与 Formulation 证明团队对预期行为形成了可审查的共享理解；只有连接系统并运行的 Automation 才能证明当前实现与示例一致。

## 排除与衔接

- 不为已指定的静态内容、内部字面量、类型声明、私有结构或协作调用制造业务场景；精确内容本身属于外部契约时，在真实使用边界验证其效果。
- 业务示例揭示出值得编码的稳定领域状态时，把类型建模拆成独立工作单元交给 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md)；BDD 继续拥有可观察业务结果，不检查内部类型形状。
- 不自动化所有示例。通过 [evidence-based-testing](../evidence-based-testing/SKILL.md) 按回归风险、失败信号和维护成本选择长期证据。
- 关键业务取舍尚未决定时使用 [brainstorming](../brainstorming/SKILL.md)；BDD 用示例揭示差异，但不替用户决定业务政策。
- 复杂功能还需要需求、设计、任务和实现持续可追溯时，把规格链交给独立 [spec-driven-development](../spec-driven-development/SKILL.md) 单元；BDD 只拥有当前行为切片的 Discovery、Formulation 与 Automation，SDD 链接其场景和结果而不重复实现。
- [writing-plans](../writing-plans/SKILL.md)、[executing-plans](../executing-plans/SKILL.md) 和 [project-documentation](../project-documentation/SKILL.md) 分别负责协调、执行状态和长期文档，不替代 Discovery、Formulation 与 Automation。
