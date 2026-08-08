---
name: documentation
description: Use when 需要编写或维护文档——临时实施计划（协调、恢复上下文或降险），或需求、设计、接口、规格、决策记录（ADR）、交付对外文档等正式项目文档；用户或项目规范要求创建、保留、更新或版本控制长期维护资料时（write, maintain or version-control plans or formal project documentation）
---

# Documentation：文档写作与管理

## 核心原则

文档按生命周期分两类：**临时计划**（帮助协调与降险，可丢弃）与**正式项目文档**（记录项目长期事实，进入版本控制）。写不写、写哪种文档由**复杂度 + 用途**判定——临时计划只在降低协调、恢复或风险成本时落盘，正式文档只在用户要求保留或项目规范要求维护时创建；完整判据见入口设计节点资源 `adaptive-development-workflow` 的「何时写什么文档」。需求、真实调用方、契约和新证据优先于文档文字；文档是可修正的工作依据，不产生独立于原请求的批准状态。

## 文档类型判定

| 生命周期 | 类型 | 方法 |
|---|---|---|
| 临时 | 实施计划（协调 / 恢复上下文 / 降险 / 多代理共享状态） | [resources/plans.md](resources/plans.md) |
| 正式 | 需求 / 计划任务 / 技术设计 / 规格 / 决策记录（ADR）/ 交付对外文档 | [resources/project-docs.md](resources/project-docs.md) |

类型判定后选择对应方法写作与维护。正式文档只创建需要的类型，内容跨类型时按项目现有形式和维护成本合并或拆分，不生成固定套装或占位文件。

## 位置规则

用户明确指定 > 项目现有文档规范和既有结构 > 默认：正式文档用 `docs/`，临时材料用被 Git 忽略的 `.docs/`（其中计划位于 `.docs/plans/`）。不要把正式文档放进忽略目录，也不要提交临时过程记录。

## Git 交付边界

- 准备纳入版本控制的正式文档属于开发任务：按 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 根据当前文档增量定级，用户没有收窄交付时与其他项目变更一样完成分支、提交、推送和 MR/PR 的普通 Git 交付。
- 临时计划、调查记录和草稿即使写入文件，也不自动成为项目产物或触发 Git 交付。
- 决定长期保留调查草稿或临时计划时，先按准备保留的实际增量转换并定级，再由正式文档方法整理进正式目录。

## 方法

- **计划写作（临时）**：见 [resources/plans.md](resources/plans.md)——内容要素、确认边界、修正对齐。
- **正式文档维护（长期）**：见 [resources/project-docs.md](resources/project-docs.md)——选择内容、编写与维护、ADR、交付对外文档与文档原则。
