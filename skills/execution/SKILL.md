---
name: execution
description: Use when 当前任务的目标已明确，但仍需根据根因、真实契约、可行性或证据缺口选择具体调查、实施或验证方法，并在新证据出现时调整；Use when distinguishing nearby development methods by facts and stopping evidence.
---

# Execution：选对当前方法并收敛证据

<SUBAGENT-STOP>
已收到边界与主要方法明确的委派单元时，执行该方法并回报事实、差异和验证结果；若新事实改变任务边界，报告协调者，不自行重排任务级工作。
</SUBAGENT-STOP>

[adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 从请求确定要做什么、授权与当前工作边界；这里判断**哪个事实缺口在阻止结果**，以及最小动作能否消除它。标准方法的流程无需重述；方法名只是选路索引，不能代替需求、真实调用方或证据。

## 方法选择

先盘点已有事实及其输入、环境和版本：当前证据足够就直接回答、实施或检查。仍有缺口时，指出哪种观察可能改变下一步选择，再挑选一个主要方法；路径事实改变可换方法；公共契约、架构、风险或副作用有实质变化时先核对授权，高风险/难回退的新动作先确认。不为一次取证强制建立新规格、计划或开发单元。用户或仓库明确要求的产物照实交付；代理主动增加规格、跨角色协同或评审时，说明它能比直接行动多拒绝哪种合理错误。

| 当前已确认的障碍 | 优先考虑 | 与相邻方法的分界 |
|---|---|---|
| 已观察到可复现错误状态 | 系统化调试（Systematic Debugging） | 追首个错误状态及因果链；没有稳定症状先调查或探索，不能靠猜测修补 |
| 不知道现有系统的入口、调用方或状态所有权 | [系统理解（System Understanding）](../system-understanding/SKILL.md) | 还原真实可达路径；缺的是第三方实际承诺时转契约核验 |
| SDK、协议、CLI 或服务的实际行为与版本未知 | [契约核验（Contract Verification）](../contract-verification/SKILL.md) | 以实际安装或部署版本的边界事实为准；不是新增持续契约测试 |
| 连可行性、性能边界或要观察的行为组合都未知 | [未知探索（Unknown Exploration）](../unknown-exploration/SKILL.md) | 最小可丢弃探测；取得稳定症状后交调试，足以决定后停止 |
| 行为应保持且需删除或升级 | [安全维护变更（Maintenance Operations）](../maintenance-operations/SKILL.md) | 先查动态调用方及依赖解析，建立真实行为基线；行为将改变时重新核对目标 |
| 已有正式规格被选为权威且确需跨需求、设计、实现追溯 | 规格驱动开发（Spec-Driven Development） | 一句话需求本身不触发写规格；普通功能的事实充分时可直接实现 |
| 真实业务、开发与测试角色对可观察行为有不同理解 | 行为驱动开发（Behavior-Driven Development） | 用具体示例解决会改变实现或验收的分歧；没有这些角色或分歧时无需套用 |
| 当前类型系统能可靠排除稳定非法状态 | 类型驱动设计（Type-Driven Design） | 作为实现内设计选择；外部输入仍先解析，不另建类型工作单元 |

行为与证据已经清楚时直接实现同样是完整选择。实现期间遇到新的外部契约、用户决策或共享根因缺口，先补该缺口；不要让旧计划或方法名替代当前事实。

## 选择与结果相称的证据

| 结果或尚未证明的风险 | 可选手段 |
|---|---|
| 宽输入空间的独立不变量 | 基于属性的测试（Property-Based Testing） |
| 独立演进的消费者与提供方的版本兼容 | 消费者驱动契约测试（Consumer-Driven Contract Testing） |
| 可从真实入口稳定重放的旧行为须保持 | 特征化 / 黄金主 / 批准测试（Characterization / Golden Master / Approval Testing） |
| 多种合理答案或概率性质量 | 评估驱动开发（Eval-Driven Development） |

默认沿真实消费或激活路径核对用户明确要求的正常场景，再做当前仓库强制检查。静态编译、类型检查、测试、审阅、可重复冒烟各证明不同性质；只追加能拒绝一个仍未覆盖风险的证据。具体手段见 [验证方式选择](resources/verification-selection.md)，证据复用、独立性与收敛见 [证据](resources/evidence.md)，复杂输出分流见 [行为基线与评估](resources/baseline-and-evaluation.md)。完成声明另由 [verification-before-completion](../verification-before-completion/SKILL.md) 核对最终增量。

## 专项机制与红线

- 正式文档的创建、组织与更新见 [documentation](../documentation/SKILL.md)；独立评审的发起与反馈分别见 [requesting-code-review](../requesting-code-review/SKILL.md)、[receiving-code-review](../receiving-code-review/SKILL.md)。委派与并行见 [agent-and-parallel-dispatch](../agent-and-parallel-dispatch/SKILL.md)。
- 分支隔离见 [using-git-worktrees](../using-git-worktrees/SKILL.md)，普通 Git 交接见 [finishing-a-development-branch](../finishing-a-development-branch/SKILL.md)，主干集成与受控发布节奏见 [delivery](../delivery/SKILL.md)；选择任何机制都不扩大原有授权。
- 测试期望来自需求、不变量、真实调用方或外部契约；不从待写实现复制，也不为测试增加真实调用方不需要的生产开关或公共接口。替身仅隔离真实外部边界；可靠静态证明不以镜像运行时测试重复。
- 保留用户和其他任务的改动。合并、发布、部署、外部消息、流量调整、破坏性清理及正式环境写入需要对应授权；正式环境数据源不得在开发和验证时写入。
