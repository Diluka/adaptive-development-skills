---
name: execution
description: Use when 需要作为默认微观入口决定并落实当前工作单元具体怎么做，包括选择开发、调查、文档、验证、评审、交付方法或执行机制，判断证据是否充分，或根据执行结果反馈修正后继续；也用于已直接指定的方法执行中需要重选方法、证据或机制
---

# Execution：选择并执行具体做法

## 职责

[adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 决定工作单元、级别和节点；本技能只处理当前单元下一步怎么做。以用户选定结果、真实调用方和已核验契约为边界，直接完成足以交付该结果的最小实现与证据。

用户已指定独立标准方法，且无需组合其他方法、证据或机制时，直接加载该方法并核验其前提。否则只读取当前决定需要的资源：

| 当前决定 | 资源 |
|---|---|
| 选择调查、开发、文档、评审、交付方法或执行机制 | [resources/method-selection.md](resources/method-selection.md) |
| 已确认存在跨业务与技术角色的共享行为理解缺口 | [resources/behavior-driven-development.md](resources/behavior-driven-development.md) |
| 已有正式规格被明确选为实施依据 | [resources/spec-driven-development.md](resources/spec-driven-development.md) |
| 稳定不变量适合由当前类型系统表达 | [resources/type-driven-design.md](resources/type-driven-design.md) |
| 选择验证手段或判断证据是否充分 | [resources/verification-selection.md](resources/verification-selection.md) / [resources/evidence.md](resources/evidence.md) |
| 复杂旧行为或主观、概率性结果需要专项方法 | [resources/baseline-and-evaluation.md](resources/baseline-and-evaluation.md) |

专项方法没有额外反馈或证据收益时，直接实现、直接检查或直接操作。

## 执行循环

1. **确认当前边界**：读取仓库说明、相关计划和工作状态；确认用户选定结果、真实调用方、适用契约、授权与仍会改变行动的证据缺口。复用条件未变的已有证据。
2. **选择下一步**：有真实缺口时选择一个主要方法；目标和做法已经清楚时直接执行。验证与机制只覆盖当前增量的具体需要。
3. **执行并核对**：修改完成选定结果所需的最小范围，经真实消费或激活路径核对需求明确提及的场景，并运行仓库对该增量要求的检查。
4. **反馈**：动作、方法或证据需要调整时在当前节点继续；工作单元、级别、节点、范围、授权、交付结果或副作用变化时返回 Workflow。

计划是共享状态，不产生额外需求或批准状态。用户收窄范围时，停止对应路径并移除本任务为其产生的改动；已投入时间和已有实现不是保留理由。

当前实现遇到事实性阻塞时，先证明它确实阻止选定结果。局部、可逆且不改变既定行为和契约的实现细节由当前单元直接解决；需要新增产品行为、公共接口、架构层、配置开关、权限、风险或外部副作用时，回到 Workflow 重新选择范围。

即将声称完成时，使用 [verification-before-completion](../verification-before-completion/SKILL.md) 核对最终增量与已有证据。

## 执行边界

- 方法、工具和交付机制不扩大原任务授权；合并、发布、部署、外部消息、破坏性清理和正式环境写入仍需相应授权。
- 保留用户与其他任务的改动；编辑重叠文件前重新读取当前内容。
- 只读 lint / format 可覆盖必要范围；自动修复限制在本任务改动的最小语法单元。
- 需要分支或隔离写入时，再按 [using-git-worktrees](../using-git-worktrees/SKILL.md) 处理工作树。
