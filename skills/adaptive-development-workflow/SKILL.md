---
name: adaptive-development-workflow
description: Use when 处理任何讨论、调查、作业或验证为主的任务，需要识别任务侧重点、按当前增量分级、按目标与证据边界拆分工作单元，并动态编排工作流节点、进入节点时推荐适用技能集
---

# Adaptive Development Workflow：自适应开发工作流

<SUBAGENT-STOP>
如果你是为边界明确的工作单元派发的子代理，跳过任务级路由，只执行派发给你的单元和主要方法，不得继续派生代理。
</SUBAGENT-STOP>

## 1. 入口职责

本技能是唯一承载决策的入口：定义工作节点类型、编排工作流、处理重编排，并在进入节点时推荐适用技能集。它只管分类、选法和转换；具体方法由对应方法技能落实，用户直接调用标准方法时由该方法自行核验适用性。

- **工作节点**：讨论 / 调查 / 设计 / 作业 / 验证 / 评审。
- **微观判据**在 `resources/` 按需读取、正文不展开：节点决策规则见 `resources/node-decisions/`，验证方式选择见 `resources/verification-selection.md`，术语与中英对照见 `resources/terminology.md`。

## 2. 识别任务侧重点

任务类型是模糊的大分类而非严格分类，可看作任务的**侧重点**：讨论 / 调查 / 作业 / 验证。一个任务通常以一类为主，可能掺有其他类型；按侧重点识别主类型并叠加附加类型，侧重点决定主工作流。

先判断整体交付意图：

- **开发任务**：最终需要项目保留、集成或交付代码、配置、依赖、测试、脚本、技能、工作流或版本控制文档，可先包含调查单元。
- **非开发任务**：只交付解释、评审意见、事实、根因、可行性证据或决策输入，不自动产生分支、提交、推送或 MR/PR。

调查中使用的可丢弃脚本、原型、测试或插桩不改变这一判断。开发任务和准备正式纳入版本控制的项目变更默认完成普通 Git 交付：通过目标仓库实际的 `git remote` 判断托管平台，在 GitLab 创建 MR、在 GitHub 创建 PR，并遵循仓库自己的分支前缀、Draft/Ready、指派和其他交接约定。用户明确要求仅修改本地、只提供差异、不提交、不推送或不创建 MR/PR 时，按限制逐项收窄。

默认普通 Git 交付停在 MR/PR。合并、发布、部署、正式环境写入、权限修改和其他高影响外部操作，只有在用户明确要求且安全边界成立时才执行。

## 3. 拆分工作单元

按可独立描述的目标、权威判据、交付物和证据边界拆分，不按文件、对象、技术层或「属于同一请求」打包。一个单元只承担一种主要方法；上游方法产生的新目标继续拆成后续单元。

先分类每个单元：

- **调查单元**：消除对当前系统、根因、契约、可行性、设计取舍或未知行为的不确定性，只交付事实、证据或决策输入。
- **开发单元**：交付项目需要保留、集成或发布的变更，以明确需求、真实调用方、已核验契约或已接受的调查结论为依据。

调查单元达到足以决策的证据后立即结束。若结论要求正式修复、长期测试、契约产物、规格或实现，把这些目标带回入口，重新分级并选择开发方式；不得让调查技能顺手实施。决定保留临时产物时，立即停止扩展它，明确保留、重写和删除范围后重新路由。

## 4. 分级

只按当前请求造成的实际增量分级，不继承父任务、现有分支或整个 PR/MR 的复杂度。文件数和行数只是信号；运行行为、公共契约、影响范围、不确定性、可逆性、外部副作用和直接证据更重要。

| 级别 | 可观察条件 | 最低充分流程 |
|---|---|---|
| 微小 | 目标明确、局部可逆；不改变运行行为或公共契约，不涉及依赖、生成规则、权限或产物自身的外部副作用；可直接检查 | 直接实现、审阅差异、运行必要检查并简要总结；不落盘计划，不派最终独立评审 |
| 常规 | 有边界明确的行为或配置变化，或需要若干相关步骤；没有重大未知或高风险 | 按协调成本决定是否落盘计划，使用覆盖受影响路径的定向验证；仅在独立视角能补充真实风险证据时评审 |
| 复杂或高风险 | 涉及跨模块或公共契约、架构与依赖迁移、安全、身份、资金、数据、并发、破坏性或难回退操作、正式环境、显著未知，或多代理共享状态 | 使用 [documentation](../documentation/SKILL.md) 维护统一计划，按风险扩展验证，并通过 [requesting-code-review](../requesting-code-review/SKILL.md) 完成独立评审 |

从最低充分级别开始，真实影响面变化时升降级；级别只定下限。计划、委派、测试、评审和交付节点都要能说明它能发现哪种合理错误；已有证据覆盖同一风险或节点没有实际收益时跳过。

如果为项目改动创建或检出开发分支，且用户和仓库没有另行指定，通过 [using-git-worktrees](../using-git-worktrees/SKILL.md) 使用独立工作树。任务分级和方法选择本身不要求创建分支。

## 5. 编排工作流

工作流在六个节点间动态编排：讨论 / 调查 / 设计 / 作业 / 验证 / 评审。节点与工作流都是灵活的，理想是从头干到尾，实际可能反反复复。

- **动态编排**：任务刚出现而目的不明确时，工作流从一个「讨论」节点开始，随讨论逐渐清晰而派生出设计、作业、验证等节点；只是小问题则直接回答或直接操作；明确指令 / 已有方案则直接进入对应节点。
- **重编排 = 返工循环 + 插入子流程**：验证失败或评审需修改 → 返回相应节点（内部迭代回路）；作业中遇未知 → 插入调查，遇无法自行解决的突发情况 → 插入讨论（子流程，父流程主干稳定、扰动被隔离）。
- **任务分裂**：一个任务变成多个时，各自重新编排。
- **节点间转换判据**（精简概述，详细见 `resources/node-decisions/`）：讨论收敛 → 发散分支一一确认或有默认推荐；设计 → 作业只要行为能覆盖需求即可开始；作业 → 验证实现完成、可观察行为就绪；验证通过以需求 happy case 通过为下限；评审在独立功能、高危操作或改动较大时触发；完成 → 验证与评审就绪后收尾交付。

常规与复杂任务按「计划 → 实现 → 测试 → 评审 → 返工」编排闭环，不另成主要方法；实现必经，其余步骤只在能补现有证据缺口时保留，复杂或高风险任务保留完整闭环：

1. **计划**：用 [documentation](../documentation/SKILL.md) 落盘目标、范围、工作单元和验证方式。需要以文档描述功能开发步骤时，由 [spec-driven-development](../spec-driven-development/SKILL.md) 贯通 Requirements、Design / Plan、Tasks 与 Implement。
2. **实现**：按计划执行工作单元，见 [execution](../execution/SKILL.md)。
3. **测试**：按真实缺口经 [resources/verification-selection.md](resources/verification-selection.md) 选择验证方式与强度，从需求或规格派生验收证据并验证可观察结果。
4. **评审**：任务级别要求时，由未参与实现、证据设计和差异修改的独立评审者检查完整差异，见 [requesting-code-review](../requesting-code-review/SKILL.md)。
5. **返工**：按 [receiving-code-review](../receiving-code-review/SKILL.md) 核验意见并实施最小修复，重新验证后复审失效范围，直到评审同意或确认无需处理。

短小、只读、无持久写入所有权的局部步骤走 [agent-and-parallel-dispatch](../agent-and-parallel-dispatch/SKILL.md)；粗粒度持续写入单元走 [using-git-worktrees](../using-git-worktrees/SKILL.md) 并另配负责上下文，仍受环境能力和用户授权约束，评审者保持独立。

## 6. 进入节点推荐技能集

进入某个工作节点时，推荐适用的技能集：判据（何时做、做到什么程度）在 `resources/` 对应资源按需读取，正文只列推荐表。加载策略：简单方法可直接提及；复杂方法先经决策确定适用再按需读取其说明，避免无关工作污染上下文。

| 节点 | 判据 | 推荐技能（类别 · 主辅 · 加载） |
|---|---|---|
| 讨论 | `resources/node-decisions/` | [brainstorming](../brainstorming/SKILL.md)（方法 · 主） |
| 调查 | `resources/node-decisions/` | [system-understanding](../system-understanding/SKILL.md)（系统结构、运行路径、历史演进未知） / [contract-verification](../contract-verification/SKILL.md)（第三方 SDK / 框架 / 协议 / API / CLI 契约未知） / [systematic-debugging](../systematic-debugging/SKILL.md)（已有症状、因果链未知） / [unknown-exploration](../unknown-exploration/SKILL.md)（可行性 / 依赖行为 / 性能 / 集成形态未知）（方法 · 主，按问题类型选一） |
| 设计 | `resources/node-decisions/` | [documentation](../documentation/SKILL.md)（方法 · 主） |
| 作业 | `resources/node-decisions/` | [execution](../execution/SKILL.md)（方法 · 主）；[spec-driven-development](../spec-driven-development/SKILL.md)（有 / 会产生规格文档） / [behavior-driven-development](../behavior-driven-development/SKILL.md)（需求没有明确具体设计） / [test-driven-development](../test-driven-development/SKILL.md)（行为单一的小功能） / [maintenance-operations](../maintenance-operations/SKILL.md)（维护变更）（方法 · 主，默认一种、可拆分）；[type-driven-design](../type-driven-design/SKILL.md)（设计方式 · 叠加推荐）；[property-based-testing](../property-based-testing/SKILL.md) / [consumer-driven-contract-testing](../consumer-driven-contract-testing/SKILL.md) / [baseline-and-eval-testing](../baseline-and-eval-testing/SKILL.md)（方法 · 辅）；[documentation](../documentation/SKILL.md)（方法 · 辅）；[using-git-worktrees](../using-git-worktrees/SKILL.md) / [agent-and-parallel-dispatch](../agent-and-parallel-dispatch/SKILL.md)（机制 · 辅） |
| 验证 | `resources/verification-selection.md` | [execution](../execution/SKILL.md)（方法 · 主）；[property-based-testing](../property-based-testing/SKILL.md) / [consumer-driven-contract-testing](../consumer-driven-contract-testing/SKILL.md) / [baseline-and-eval-testing](../baseline-and-eval-testing/SKILL.md)（方法 · 主/辅）；[verification-before-completion](../verification-before-completion/SKILL.md) / [evidence-management](../evidence-management/SKILL.md)（方法 · 辅）；[agent-and-parallel-dispatch](../agent-and-parallel-dispatch/SKILL.md)（机制 · 辅） |
| 评审 | `resources/node-decisions/` | [requesting-code-review](../requesting-code-review/SKILL.md) / [receiving-code-review](../receiving-code-review/SKILL.md)（方法 · 主）；[agent-and-parallel-dispatch](../agent-and-parallel-dispatch/SKILL.md)（机制 · 评审必须分离）；[using-git-worktrees](../using-git-worktrees/SKILL.md)（机制 · 辅） |

机制类使用判据：代理机制是「如何完成工作」的方法，处理任务时默认有其他代理并行处理本项目其他任务。委派判据 = 保护主代理上下文 + 防止多次压缩后指挥跑偏；实现 / 验证分离按规模权衡（小规模同代理，大规模独立验证者）；实现 / 评审分离是硬约束，不能自审。

方法选择要点：

- 多个方法条件同时成立时，先检查是否有独立目标、产物和反证边界；可分开就建有依赖的单元，否则选最直接解决主要不确定性或回归风险的方法。
- 声明式数据、映射、文案、普通字段和简单标注通常直接实现，不要求编码前证据齐备；缺少既有证据不改变主方法。
- 只有「不合法状态不可表示」本身能排除合理错误且值得独立建模单元时才选用 Type-Driven Design；外部 JSON、HTTP、数据库或用户输入解析前仍不可信，必须保留运行时解析与边界验证。
- 探索发现稳定症状后，结束探索单元，再以系统化调试追因。

## 7. 叠加交付与生命周期支持

集成与交付可叠加但不能代替功能、契约或质量证据：[delivery](../delivery/SKILL.md) 管节奏，[finishing-a-development-branch](../finishing-a-development-branch/SKILL.md) 管 Git 交接。选择交付方法不纳入合并、发布、部署、流量调整、功能开关或正式环境写入。

| 条件 | 支持技能 |
|---|---|
| 关键歧义会实质改变方案 | [brainstorming](../brainstorming/SKILL.md) |
| 需要协调、恢复上下文或高风险控制 | [documentation](../documentation/SKILL.md) 与 [execution](../execution/SKILL.md) |
| 需要选择验证方式（动态执行 / 静态检查 / 审视核对） | [resources/verification-selection.md](resources/verification-selection.md) |
| 需要判断证据充分性、复用或收敛长期证据 | [evidence-management](../evidence-management/SKILL.md) |
| 方法产物需要长期保存为正式项目文档 | [documentation](../documentation/SKILL.md) |
| 分支、版本或多个工作树需要隔离与协调 | [using-git-worktrees](../using-git-worktrees/SKILL.md) |
| 当前任务内局部委派或多个单元需要判断并行收益 | [agent-and-parallel-dispatch](../agent-and-parallel-dispatch/SKILL.md) |
| 独立评审能覆盖定向验证之外的风险 | [requesting-code-review](../requesting-code-review/SKILL.md)；意见通过 [receiving-code-review](../receiving-code-review/SKILL.md) 核验 |
| 即将声明完成或交付 | [verification-before-completion](../verification-before-completion/SKILL.md) 与 [finishing-a-development-branch](../finishing-a-development-branch/SKILL.md) |

## 8. 执行与转换

证据冲突时按以下优先级判断：明确需求与不变量 > 真实调用方和运行行为 > 依赖、协议与框架契约 > 实现与测试 > 计划、清单与方法偏好。测试是证据，不得发明业务行为；计划是可修正的工作依据。

先复用输入、环境、版本、路径和风险面仍适用的测试、评审、观测与 CI，只补受当前增量影响的缺口。行为保持型重构缺少有效基线时，先选择最小充分证据再开始修改。只同步本次变更直接影响的既有伴生产物；保持额外问题不变仍能完成任务时，它不属当前范围，收集最小证据并报告，不自动实施。

按依赖执行：

1. 明确整体交付意图、当前增量、完成声明和最低充分级别。
2. 按目标与证据边界拆分工作单元，标明依赖关系。
3. 为每个单元判断调查或开发性质并选择一个主要方法；按需叠加交付和生命周期支持。
4. 按依赖执行。调查单元结束后，先交付事实，再为任何正式变更回到入口重新路由。
5. 新证据改变需求、契约、风险或单元性质时，更新适用计划并重新选择，不让既有流程绑架事实。
6. 在最终状态上验证受影响路径；复杂或高风险任务由未参与实现、证据设计或相关差异修改的独立评审者检查完整差异。
7. 开发任务完成默认普通 Git 交付或用户明确收窄后的结果；非开发任务只交付结论与证据。合并、发布、部署和其他高影响外部操作只按用户明确要求执行，并报告实际结果、限制和剩余风险。

## 9. 安全边界

- 调查、开发和验证期间不得写入正式环境数据源；只读证据不授权数据修复。
- 不为测试制造真实调用方不需要的生产分支、开关、包装层、回退或公共接口。
- 保留用户和其他任务的改动；不通过暂存、提交、重置、清理或移动来占用其状态。
- 微小任务不为形式增加规格、计划、测试、代理或评审；标准方法一旦选中则忠实执行其核心流程。
