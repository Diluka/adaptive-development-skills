# 工作方法与执行机制选择

Use when 当前工作节点已经由工作流确定，需要为工作单元选择具体调查、开发、文档、评审、交付方法或执行机制。

## 选择原则

目标和做法已清楚时直接执行。只有当前存在会改变实现或结论的具体缺口时，才选择一个对应的主要方法；辅助方法与机制只覆盖另一项已识别需要。

局部命名、控制流、文件组织和既有框架内的接线属于实现选择。新增用户行为、公共接口、架构层、配置开关、权限或副作用属于范围变化，返回 Workflow 选择后再实施。

## 调查方法

| 当前未知 | 做法 |
|---|---|
| 一个可直接读取的确定事实 | 读取权威源并报告 |
| 仓库结构、真实运行路径、状态所有权或历史演进 | [system-understanding](../../system-understanding/SKILL.md) |
| 实际 SDK、框架、协议、API、CLI 或序列化契约 | [contract-verification](../../contract-verification/SKILL.md) |
| 已有失败或意外行为的因果链 | [systematic-debugging](../../systematic-debugging/SKILL.md) |
| 技术可行性、依赖行为、性能或集成形态需要可丢弃试验 | [unknown-exploration](../../unknown-exploration/SKILL.md) |
| 需求边界或竞争方案仍有关键歧义 | [brainstorming](../../brainstorming/SKILL.md) |

已有事实足以回答时复用证据并停止。调查需要形成长期产物时，返回 Workflow 建立开发单元。

## 开发方法

| 当前目标 | 做法 |
|---|---|
| 需求、调用方和契约已清楚，专项方法不增加反馈 | 直接实现，并选择最小充分验证 |
| 正式规格已被明确选为实施依据 | [spec-driven-development.md](spec-driven-development.md) |
| 跨角色对可观察行为的理解差异会改变实现或验收 | [behavior-driven-development.md](behavior-driven-development.md) |
| 删除、依赖变更或其他行为保持维护 | [maintenance-operations](../../maintenance-operations/SKILL.md) |
| 广泛输入空间的独立不变量是主要风险 | [property-based-testing](../../property-based-testing/SKILL.md) |
| 独立演进的 consumer / provider 需要持续兼容证明 | [consumer-driven-contract-testing](../../consumer-driven-contract-testing/SKILL.md) |
| 复杂旧行为需要可审阅基线，或概率性能力需要代表任务 | [baseline-and-evaluation.md](baseline-and-evaluation.md) |
| 当前类型系统适合表达稳定不变量 | 在所选方法内按 [type-driven-design.md](type-driven-design.md) 处理 |

用户直接指定标准方法时，先核验该行条件。方法名称、任务规模或技术主题本身不触发方法。

## 文档、操作、评审与交付

| 当前目标 | 做法 |
|---|---|
| 记录已有内容 | 直接写并核对事实 |
| 说明已有系统 | 调查真实现状后写作 |
| 落盘计划或维护正式项目文档 | [documentation](../../documentation/SKILL.md) |
| 小而可逆的操作 | 直接操作并验证 |
| 难回退的操作 | 先形成执行与恢复依据；工具支持时预览后执行 |
| 发起或处理独立评审 | [requesting-code-review](../../requesting-code-review/SKILL.md) / [receiving-code-review](../../receiving-code-review/SKILL.md) |
| 管理持续可发布或渐进暴露 | [delivery](../../delivery/SKILL.md) |
| 提交、推送、PR/MR、同步或清理开发分支 | [finishing-a-development-branch](../../finishing-a-development-branch/SKILL.md) |

## 执行机制

| 已知需要 | 机制 |
|---|---|
| 单元短小、状态集中 | 当前代理直接执行 |
| 边界清晰的独立单元能节省上下文、提供独立判断或缩短关键路径 | [agent-and-parallel-dispatch](../../agent-and-parallel-dispatch/SKILL.md) |
| 需要开发分支、隔离重叠改动或高风险 Git 操作 | [using-git-worktrees](../../using-git-worktrees/SKILL.md) |
| 用户 / 仓库要求，或确需跨单元协调、跨会话恢复、高风险控制 | [documentation](../../documentation/SKILL.md) 维护计划 |

机制不改变任务级别，也不替代实现证据。完成声明由 [verification-before-completion](../../verification-before-completion/SKILL.md) 核对。
