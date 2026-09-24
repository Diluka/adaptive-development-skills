# 当前方法与证据分流

Use when 工作边界已明确，但根因、真实契约、可行性或证据形态仍会改变下一步；事实充分时直接实施、检查或回答，不为选法读取本资源。

先盘点已知事实的输入、环境、版本与来源，指出哪种观察可能改变当前决定。缺口变化时改选方法；公共契约、架构、风险或副作用发生实质变化，先核对授权，高风险或难回退的新动作先确认。用户或仓库明确要求的产物照实交付；代理主动增加规格、协同或评审时，应能说明新增步骤能拒绝哪种合理错误。

| 已确认的缺口 | 可选方法与相邻分界 |
|---|---|
| 已观察到可复现的错误状态 | 系统化调试（Systematic Debugging）：追首个错误状态与因果链；症状尚不稳定时先探索，不猜修复 |
| 不知道现有系统的入口、调用方或状态所有权 | [系统理解（System Understanding）](../../system-understanding/SKILL.md)：还原真实可达路径；外部提供方行为未知则核验契约 |
| SDK、协议、CLI 或服务的实际行为与版本未知 | [契约核验（Contract Verification）](../../contract-verification/SKILL.md)：以实际安装或部署版本为准；一次探测不等于持续契约测试 |
| 连可行性、性能边界或行为组合都未知 | [未知探索（Unknown Exploration）](../../unknown-exploration/SKILL.md)：最小可丢弃探测；取得稳定症状转调试，事实足以决定即停 |
| 行为应保持且需删除或升级 | [安全维护变更（Maintenance Operations）](../../maintenance-operations/SKILL.md)：核对动态调用方、依赖解析和可比较的真实基线 |
| 已有正式规格被选为权威且确需跨需求、设计、实现追溯 | 规格驱动开发（Spec-Driven Development）：一句话需求本身不触发写规格 |
| 真实业务、开发与测试角色对可观察行为有会影响验收的分歧 | 行为驱动开发（Behavior-Driven Development）：用具体示例解决分歧；不存在这些角色或分歧时直接实施 |
| 当前类型系统可靠地排除稳定非法状态 | 类型驱动设计（Type-Driven Design）：在当前实现内建模，外部输入仍须解析 |

| 待证明的结果 | 可选证据方法 |
|---|---|
| 宽输入空间的独立不变量 | 基于属性的测试（Property-Based Testing） |
| 独立演进的消费者与提供方版本兼容 | 消费者驱动契约测试（Consumer-Driven Contract Testing） |
| 从真实入口稳定重放且须保持的旧行为 | 特征化 / 黄金主 / 批准测试（Characterization / Golden Master / Approval Testing） |
| 多种合理答案或概率性质量 | 评估驱动开发（Eval-Driven Development） |

默认沿真实消费或激活路径核对明确要求的正常场景，执行当前仓库强制检查；只追加能拒绝尚未覆盖风险的证据。只有验证手段尚难选择时读 [verification-selection.md](verification-selection.md)，证据适用性或复用有疑问时读 [evidence.md](evidence.md)，复杂输出与概率结果难分时读 [baseline-and-evaluation.md](baseline-and-evaluation.md)。即将声称完成时再由 [verification-before-completion](../../verification-before-completion/SKILL.md) 核对最终增量。
