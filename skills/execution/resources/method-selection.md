# 工作方法与执行机制选择

Use when 当前工作节点已经由工作流确定，需要为工作单元选择具体调查、开发、文档、评审、交付方法或执行机制。

## 选择原则

从当前单元最主要的不确定性、待产生产物和可独立反驳的风险出发，只选一个主要方法。辅助方法和生命周期机制只在覆盖不同缺口时叠加；能拆成独立目标时建立有依赖的单元，不把多个完整方法循环揉在一起。

专项方法没有额外反馈、设计或证据收益时直接执行。现有证据是否充分影响验证安排，不自动决定开发方法；声明式数据、映射、文案、普通字段和简单标注通常直接实现并使用真实装配或消费路径核对，不写同源镜像测试。

## 讨论与调查方法

| 当前主要问题 | 首选做法 |
|---|---|
| 需求边界、竞争方案或成功标准仍有会改变方案的关键歧义 | [brainstorming](../../brainstorming/SKILL.md) |
| 现有仓库结构、真实运行路径、职责边界或历史演进未知 | [system-understanding](../../system-understanding/SKILL.md) |
| 实际安装 / 运行版本的 SDK、框架、协议、HTTP API、CLI 或序列化契约未知 | [contract-verification](../../contract-verification/SKILL.md) |
| 已有失败、事故、性能回归或意外行为，但第一个错误状态和因果链未知 | [systematic-debugging](../../systematic-debugging/SKILL.md) |
| 技术可行性、依赖行为、性能或集成形态真实未知，需要可丢弃试验；或可运行系统仍有重要未知风险 | [unknown-exploration](../../unknown-exploration/SKILL.md) |
| 只需核对一个可直接读取的确定事实 | 直接读取权威源并报告证据，不加载专项调查方法 |

探索发现稳定症状后结束探索单元，再以系统化调试追因。调查达到足以回答原问题的证据后停止；需要保留实现或长期产物时返回工作流建立开发单元。

## 开发方法

| 当前主要目标 | 首选做法 |
|---|---|
| 需求、调用方和契约已清楚，专项方法不增加独立反馈 | 直接实现，并按 `verification-selection.md` 补最小充分证据 |
| 已有或将产生高标准、可演进规格，需要贯通需求、设计、任务与实现 | [spec-driven-development](../../spec-driven-development/SKILL.md) |
| 跨业务与技术角色需要以真实示例共同发现、表述和自动化可观察行为 | [behavior-driven-development](../../behavior-driven-development/SKILL.md) |
| 精确、自包含、确定性零件具有独立稳定判据和真实接缝，Red-first 有设计反馈 | [test-driven-development](../../test-driven-development/SKILL.md) |
| 删除、依赖变更或其他行为保持维护，需要证明调用方、加载面与解析边界 | [maintenance-operations](../../maintenance-operations/SKILL.md) |
| 稳定领域状态、公共 API、协议阶段、权限或单位值得由类型排除非法状态 | 把 [type-driven-design](../../type-driven-design/SKILL.md) 作为独立或正交设计单元；不可信外部输入仍运行时解析 |
| 广泛输入空间的独立不变量本身是主要风险 | [property-based-testing](../../property-based-testing/SKILL.md) 可作为开发单元的主要验证方法，具体证据选择见 `verification-selection.md` |
| 独立演进的 consumer / provider 需要持续证明版本兼容 | [consumer-driven-contract-testing](../../consumer-driven-contract-testing/SKILL.md) |
| 复杂旧行为需在改动前建立可审阅行为基线，或概率性能力需由代表任务驱动 | 读取 [baseline-and-evaluation.md](baseline-and-evaluation.md)，按结果形状选择两个不同方法之一 |

用户直接要求某个标准方法时读取该方法，并先核验其方法内前提。不能得到合法 Red、不存在独立属性、真实 consumer 不可识别或规格并非正式项目依据时，方法名称不能替代适用性。

## 写作与操作作业

按内容是否已存在、操作是否可逆及方式是否已知选择做法。需要新增设计或调查节点时返回 Workflow 安排；`documentation` 只负责选定后的文档写作与生命周期，不作为路由入口。

| 当前作业形状 | 做法 |
|---|---|
| 记录 / 总结，内容已经存在 | 直接写，并核对事实准确性 |
| 说明 / 指南，需要说明已有系统 | 先调查真实现状，再写并对照已核实事实验证 |
| 规划 / 设计，内容尚不存在 | 返回 Workflow 安排设计节点 |
| 操作小而可逆 | 直接操作，再验证结果 |
| 操作影响大、难回退 | 返回 Workflow 先安排设计，再按 `dry-run` / `plan` → 执行 → 验证推进，必要时安排评审 |
| 操作方式未知 | 返回 Workflow 插入调查节点 |

## 文档、评审与交付方法

| 当前节点内的具体目标 | 首选做法 |
|---|---|
| 落盘计划以协调、恢复上下文或控制风险，或维护正式项目文档 | [documentation](../../documentation/SKILL.md)；文档类型和位置由其资源判断 |
| 按可演进规格贯通复杂实现 | [spec-driven-development](../../spec-driven-development/SKILL.md)，并用 `documentation` 管理文档位置与生命周期 |
| 发起独立评审或处理评审意见 | [requesting-code-review](../../requesting-code-review/SKILL.md) / [receiving-code-review](../../receiving-code-review/SKILL.md) |
| 管理主干集成、持续可发布或渐进暴露节奏 | [delivery](../../delivery/SKILL.md) |
| 交接开发分支、提交、推送、PR/MR、同步或清理 | [finishing-a-development-branch](../../finishing-a-development-branch/SKILL.md) |

评审是否为当前节点由工作流决定；本资源只选择评审如何执行。完成声明的最终核验继续由 [verification-before-completion](../../verification-before-completion/SKILL.md) 独立承担。

## 执行机制

| 情况 | 机制 |
|---|---|
| 单元短小、状态集中，切换成本高于收益 | 当前代理直接执行 |
| 当前任务内有边界清晰、短小、可独立回报的只读或局部单元，多个单元可安全并行，或需要编排独立会话的派发、回报与串行集成 | [agent-and-parallel-dispatch](../../agent-and-parallel-dispatch/SKILL.md) |
| 项目改动需要分支、根路径被占用、存在重叠改动、高风险 Git 操作或粗粒度并行写入 | [using-git-worktrees](../../using-git-worktrees/SKILL.md) |
| 需要共享顺序、阻塞前置、证据和恢复点 | [documentation](../../documentation/SKILL.md) 维护唯一计划，按主技能执行 |
| 操作影响大、难回退且工具支持安全预览 | 在方法内先执行 `dry-run` / `plan` / 预览，再核对精确目标后执行 |

委派和并行只有在节省上下文、提供独立判断或缩短关键路径的收益高于交接成本时使用。计划、实现、自查、独立评审、CI 和运行时验证是不同机制，不能互相冒充。
