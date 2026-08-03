---
name: executing-plans
description: Use when 已有开发任务计划文档需要执行、同步进展并完成最终独立评审，或新证据要求在继续实现前修正计划
---

# Executing Plans：自适应执行计划

## 核心原则

执行计划想要实现的结果，而不是逐字服从过时文字。计划是可修正的工作假设和多代理共享状态；当前需求、调用方、契约和新证据优先。

## 执行

1. 完整阅读计划、仓库说明、工作树状态和已有进展。开发任务没有落盘计划时，先使用 [writing-plans](../writing-plans/SKILL.md)。
2. 确认计划包含目标、范围、工作单元、主要方法、验证和最终独立评审安排，并核对用户确认状态；需要确认但尚未取得时停止，不进入正式实现。
3. 每个单元开始前，以最小成本确认相关文件、真实调用方、依赖契约、前置状态和授权边界仍成立。
4. 执行下一个依赖就绪的工作单元；主要问题变化时，通过 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 重新选法。
5. 验证单元结果并同步计划；正式实现完成后再验证组合结果和真实运行链路。
6. 根代理通过 [requesting-code-review](../requesting-code-review/SKILL.md) 派发独立评审，并使用 [receiving-code-review](../receiving-code-review/SKILL.md) 核验意见。实质修复后重新验证并复审最终版本。
7. 使用 [verification-before-completion](../verification-before-completion/SKILL.md) 核对实现、验证和评审证据，再报告未完成事项和未执行操作。

## 根据新事实修正

证据与计划冲突时停止受影响路径，并按 [writing-plans](../writing-plans/SKILL.md) 的边界更新计划：原目标、范围、业务行为、交付结果和授权不变且无新增副作用时，告知用户后继续；否则暂停并请求确认。

根代理或单代理写回状态、关键证据、偏差和剩余风险。子代理只回报变化，由根代理核验并维护统一计划；使用 [subagent-driven-development](../subagent-driven-development/SKILL.md) 管理具体委派，不让多个代理并发编辑计划。

## 边界

- 计划不会自动授权提交、推送、合并、部署、外部消息、破坏性清理或正式环境数据写入。
- 保留用户的无关改动；编辑重叠文件前重新读取当前内容。
- 不因后续步骤依赖错误假设而继续执行冲突路径。
- 不统一强制实现子代理、TDD、工作树、PR/MR 或提交；开发任务的最终独立评审不可省略。
