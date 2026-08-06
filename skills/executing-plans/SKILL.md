---
name: executing-plans
description: Use when 已有开发任务计划文档需要执行或同步进展，适用的验证与独立评审需要衔接，或新证据要求在继续实现前修正计划
---

# Executing Plans：自适应执行计划

## 核心原则

执行计划想要实现的结果，而不是逐字服从过时文字。计划是可修正的工作假设和多代理共享状态；当前需求、调用方、契约和新证据优先。

## 执行

1. 完整阅读计划、仓库说明、工作树状态和已有进展。没有落盘计划时，先通过 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 判断是否本来就不需要；只有满足落盘条件时才使用 [writing-plans](../writing-plans/SKILL.md)，不要为微小任务补造计划。
2. 确认计划包含目标、范围、工作单元、主要方法、验证，以及独立评审是否适用和对应依据，并核对原任务整体授权；计划不产生独立于原请求的批准状态。原任务授权尚未取得，或 [writing-plans](../writing-plans/SKILL.md) 判断仍有未解决取舍、越界方案或高风险操作需要确认时停止，不进入受影响实现。执行中新出现的逐路径确认事项按下文只暂停受影响路径，不阻断其他已授权工作。
3. 每个单元开始前，以最小成本确认相关文件、真实调用方、依赖契约、前置状态和授权边界仍成立。首次准备修改计划未列出的路径时，先按 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 判断它是否为本次变更直接影响的既有伴生产物；不是时，再确认保持它不变是否会阻止当前任务正确实现、验证或交付。
4. 执行下一个依赖就绪的工作单元；主要问题变化时，通过 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 重新选法。
5. 验证单元结果并同步计划；正式实现完成后，按 [writing-plans](../writing-plans/SKILL.md) 的授权边界最小同步本次变更直接影响的既有伴生产物，再验证组合结果和真实运行链路。
6. 计划或新风险要求独立评审时，根代理通过 [requesting-code-review](../requesting-code-review/SKILL.md) 派发，并使用 [receiving-code-review](../receiving-code-review/SKILL.md) 核验意见。实质修复后只重新验证和复审受影响范围。
7. 使用 [verification-before-completion](../verification-before-completion/SKILL.md) 核对实现、验证和适用评审证据，再报告未完成事项和未执行操作。

## 根据新事实修正

计划外发现先按 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 的任务范围规则分类。本次变更直接影响的既有伴生产物作为收尾同步写回计划，不归为阻塞项或任务外发现；需要新授权时保留在计划内并只暂停该同步路径。不影响当前任务的其他问题只报告，不超出分类所需的最小证据继续调查或修改。不能因为某个问题与当前代码有关联、容易修复或已有测试，就把它加入计划。

确认问题会阻塞当前任务时，按 [writing-plans](../writing-plans/SKILL.md) 的阻塞前置条件规则发出非阻塞询问，说明默认方案，并继续不依赖它的工作。用户未及时回复且满足默认纳入条件时，更新计划并处理最小前置内容；需要明确确认时只暂停受影响路径。

其他证据与计划冲突时停止受影响路径，并按 [writing-plans](../writing-plans/SKILL.md) 的边界更新计划：原目标、范围、业务行为、交付结果和授权不变且无新增副作用时，告知用户后继续；否则暂停并请求确认。

用户明确收窄或排除某个工作单元时，立即停止该路径并从交付差异中移除本任务为它产生的改动；已经投入的时间、已有实现或通过的测试都不是保留理由。只移除自己为本任务产生的内容，保留用户和其他工作的改动。

协调者或单代理写回状态、关键证据、偏差和剩余风险，其他执行者只回报变化，由协调者核验并维护统一计划。当前 Codex 任务内的委派使用 [subagent-driven-development](../subagent-driven-development/SKILL.md)；只有用户明确授权跨会话执行，且粗粒度单元需要独立上下文、工作区或恢复生命周期时，才使用 [orchestrating-multi-session-work](../orchestrating-multi-session-work/SKILL.md)。两种方式都不让多个执行者并发编辑计划。

## 边界

- 计划不会自动授权提交、推送、合并、部署、外部消息、破坏性清理或正式环境数据写入。
- 保留用户的无关改动；编辑重叠文件前重新读取当前内容。
- lint 与格式化的只读检查可按仓库契约覆盖必要范围；自动修复或格式化改写默认只作用于当前任务修改行。工具不支持行级处理时，依次扩大到最小必要语法单元或受影响文件，并审阅、移除与任务无关且非项目契约所需的差异；不得借机批量修复存量问题。
- 不因后续步骤依赖错误假设而继续执行冲突路径。
- 不统一强制任务创建开发分支、实现子代理、TDD、独立评审、PR/MR 或提交；一旦为可能产生项目改动的工作创建或检出开发分支，且用户没有指定其他安排，按 [using-git-worktrees](../using-git-worktrees/SKILL.md) 默认绑定独立工作树。纯只读分支审查可由执行者按同一技能判断是否安全使用根路径。
