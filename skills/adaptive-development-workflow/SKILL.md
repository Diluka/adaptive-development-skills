---
name: adaptive-development-workflow
description: Use when 请求可能产生需要项目保留、集成、提交或交付的产物变更，模糊需求需要具体化为工作单元，或需要为不同单元选择合适开发方法
---

# Adaptive Development Workflow：自适应开发工作流

## 核心原则

把需求具体化为可验证的工作单元，再根据每个单元的主要不确定性、风险、真实调用方和证据来源选择最合适的主要方法。整个需求可以组合多种方法，但不要强迫所有单元使用同一种流程。

所有开发任务在正式实现前都必须通过 [writing-plans](../writing-plans/SKILL.md) 落盘一份可长可短的计划，最终版本完成前都必须通过 [requesting-code-review](../requesting-code-review/SKILL.md) 接受独立子代理评审。风险只决定评审深度；TDD、实现子代理、工作树、PR/MR 和提交仍按实际收益、风险与授权选择。

## 判断任务类型

预期交付结果包含需要项目保留、集成、提交或交付的产物变更，就是开发任务。项目产物包括正式代码、配置、依赖与锁文件、构建或 CI 脚本、准备保留的测试、数据模型、迁移、生成规则、技能、插件、工作流和版本控制的项目文档。

以下任务本身不是开发任务：

- 纯解释、咨询、翻译或回答问题；
- 只读调查、只运行检查、只报告评审意见，或只交付已经完成开发的提交、推送、PR/MR 或部署；
- 以结论和证据为交付结果的调查或技术探索，即使过程中产生可丢弃的示例、脚本、原型、测试或诊断插桩。

是否写代码、修改文件或执行写操作都不是判据。临时产物必须隔离且不得混入最终差异；结束调查时检查工作区。外部写入、破坏性操作、正式环境和权限扩大仍受授权与安全边界约束。

决定保留调查产物时，立即停止把它当临时代码扩展，转换为开发任务：使用 [writing-plans](../writing-plans/SKILL.md) 明确保留、重写和删除范围，再完成正式实现、验证和独立评审。一开始就要求“调查并实现”的请求从一开始就是开发任务。

## 确定事实

证据冲突时按以下顺序判断：

1. 明确需求与不变量；
2. 真实生产调用方与运行行为；
3. 依赖、协议与框架契约；
4. 实现与测试；
5. 计划、检查清单与方法偏好。

测试是证据，不是最高权威；计划是可修正的工作假设，不能覆盖当前系统事实。

## 选择主要方法

当结果、调用方、证据来源、风险或改动类型不同时拆分工作单元。每个单元选择一个主要方法，辅助技能只补充必要证据。

| 可观察条件 | 主要方法 |
|---|---|
| 第三方 API、SDK、框架、协议或 CLI 边界不确定 | [contract-verification](../contract-verification/SKILL.md) |
| 需要选择测试层级或接缝，或处理测试与实现冲突 | [evidence-based-testing](../evidence-based-testing/SKILL.md) |
| 明确行为变更存在稳定真实接缝，且 TDD 能降低风险 | [test-driven-development](../test-driven-development/SKILL.md) |
| 需求、调用方式和契约已明确，且无需专项调查、技术探索或依赖变更 | 直接实现，并按影响选择验证 |
| 删除适配器、依赖、导出项或无效路径 | [caller-driven-cleanup](../caller-driven-cleanup/SKILL.md) |
| 根因未知或行为间歇出现 | [systematic-debugging](../systematic-debugging/SKILL.md) |
| 技术可行性未知 | [technical-spike](../technical-spike/SKILL.md) |
| 依赖或工具链版本变化 | [dependency-upgrade](../dependency-upgrade/SKILL.md) |

## 组合生命周期支持

| 条件 | 支持技能 |
|---|---|
| 关键歧义仍会改变方案 | [brainstorming](../brainstorming/SKILL.md) |
| 需要长期维护正式项目文档 | [project-documentation](../project-documentation/SKILL.md) |
| 已有计划需要执行或修正 | [executing-plans](../executing-plans/SKILL.md) |
| 边界清晰的单元可显著节约根代理上下文 | [subagent-driven-development](../subagent-driven-development/SKILL.md) |
| 至少两个单元真正独立且并行有收益 | [dispatching-parallel-agents](../dispatching-parallel-agents/SKILL.md) |
| 即将声明完成 | [verification-before-completion](../verification-before-completion/SKILL.md) |
| 需要分支集成或交接 | [finishing-a-development-branch](../finishing-a-development-branch/SKILL.md) |

## 执行生命周期

1. 按最终交付意图判断任务类型，澄清会改变方案的关键歧义。
2. 拆分工作单元，为每个单元选择主要方法。
3. 开发任务写计划，并按 [writing-plans](../writing-plans/SKILL.md) 的用户确认边界决定直接执行或等待确认。
4. 按依赖顺序调查、实现并同步计划；仅在显著节约上下文时委派实现。
5. 验证各单元及组合链路；新证据推翻假设时更新计划并重新选法。
6. 由未参与实现的独立子代理评审最终完整差异；实质修复后重新验证并复审。
7. 按授权完成 PR/MR、集成与交接，说明未完成事项和剩余风险。

非开发任务不强制计划或独立评审。复杂功能调研可在独立检查能实质提高目标覆盖或结论准确性时选择评审代理；其他未明确强制的步骤也只按任务完整性和准确性的实际收益选择。

## 安全边界

- 调查和验证期间不得写正式环境数据源；只读证据不授权数据修复。
- 修改状态前确认可逆性、工作树和并发状态、外部写入权限以及支撑最终声明的验证。
- 保留用户的无关改动，不把当前范围静默扩大到额外设计、发布或清理。
