---
name: technical-terminology
description: Use when 需要统一通用软件开发术语的中英文表达、翻译工程文档，或判断 API、命令、路径等标识是否应保留英文
---

# Technical Terminology：常见开发术语中英对照

## 核心原则

中文工程文档优先使用自然、稳定的中文术语。不要在每次出现时重复括注英文；需要核对原词、翻译文档或统一多个文件的用词时，使用本表。

以下内容保留原始英文，不做意译：

- 产品、项目、语言、框架和包的正式名称；
- API、SDK、CLI、HTTP、SQL、TDD、PR/MR、APM 等通行缩写；
- 命令、参数、环境变量、路径、文件名、配置键、符号、类型和错误信息等字面标识；
- 技能名、Git 引用、协议标记与传输字段等必须精确匹配的值。

同一个英文词在不同上下文含义不同时，按实际语义选择中文，不做机械替换。例如 `path` 可以是“文件路径”“调用链”或“执行路径”，`state` 可以是“状态”或“外部数据”。

## 开发工作流与歧义缩写

缩写在中文正文中保持原样。这里只收录开发工作流领域中不算约定俗成、展开后有助于查阅的缩写，以及在开发语境中存在多个合理展开的歧义缩写。无歧义且约定俗成的基础缩写不重复收录。

| 缩写 | English expansion | 中文释义与适用语境 |
|---|---|---|
| ADR | Architecture Decision Record | 架构决策记录；记录重要架构决策、理由与后果 |
| RFC | Request for Comments | 征求意见文档；IETF 语境中指正式发布的技术文档，工程协作中也常指待评审方案 |
| RFD | Request for Discussion | 讨论请求；部分工程组织用于提案、设计或流程讨论文档 |
| RFD | Reflected File Download | 反射型文件下载；Web 安全漏洞语境 |
| DoR | Definition of Ready | 就绪定义 |
| DoD | Definition of Done | 完成定义 |
| ATDD | Acceptance Test-Driven Development | 验收测试驱动开发 |
| RCA | Root Cause Analysis | 根因分析 |
| APM | Application Performance Monitoring / Application Performance Management | 应用性能监控 / 应用性能管理；两者常混用，但监控只是完整管理实践的一部分 |
| APM | Actions Per Minute | 每分钟操作数；交互或游戏性能语境 |
| CD | Continuous Delivery / Continuous Deployment | 持续交付 / 持续部署；同属持续产品化流程，前者通常保留正式发布的人工批准，后者自动进入正式环境 |

## 需求、方法与证据

| English | 中文 |
|---|---|
| requirement | 需求 |
| development task | 开发任务 |
| investigation | 调查 |
| technical spike | 技术探索 |
| temporary artifact | 临时产物 |
| project artifact / deliverable | 项目产物 / 交付产物 |
| invariant | 不变量 |
| behavior | 行为 |
| work unit | 工作单元 |
| scope | 范围 |
| risk | 风险 |
| trade-off | 权衡 |
| assumption | 假设 |
| hypothesis | 假设；用于调试时也可写“原因假设” |
| evidence | 证据 |
| claim | 声明；强调判断结果时写“结论” |
| verification | 验证 / 核验；检查产物是否满足明确规格或声明 |
| validation | 验证；确认产物满足用户需求、预期用途或真实使用场景；输入、格式或约束检查语境下可写“校验” |
| root cause | 根因 |
| regression | 回归 |
| baseline | 基线 |
| feasibility | 可行性 |
| decision point | 决策点 |
| checklist | 检查清单 |

## 项目文档

| English | 中文 |
|---|---|
| project documentation | 项目文档 |
| requirements document | 需求文档 |
| design document | 设计文档 |
| interface documentation | 接口文档 |
| decision record | 决策记录 |
| acceptance criteria | 验收标准 |
| non-goal | 非目标 |
| unresolved question | 未决问题 |

## 实现与架构

| English | 中文 |
|---|---|
| implementation | 实现 |
| production / production environment / production env / product environment / product env | 正式环境；`production environment` 是标准写法，“生产环境”“产品环境”及 `product env` 等项目内写法在本技能包中均视为同一概念，固定搭配仍写“生产代码”“生产事故” |
| runtime | 运行时 |
| framework | 框架 |
| dependency | 依赖 |
| contract | 契约 |
| caller | 调用方 |
| consumer / provider | 使用方 / 提供方 |
| interface | 接口 |
| adapter | 适配器 |
| wrapper | 包装层 |
| fallback | 回退分支；恢复策略语境下写“回退方案” |
| feature flag | 功能开关 |
| entry point | 入口 |
| call path | 调用链 |
| data flow / control flow | 数据流 / 控制流 |
| boundary | 边界 |
| external system | 外部系统 |
| state / mutable state | 状态 / 可变状态 |
| data model | 数据模型 |
| compatibility | 兼容性 |
| breaking change | 破坏性变更 |
| generated output | 生成产物 |
| artifact | 产物 |

## 测试与调试

| English | 中文 |
|---|---|
| test seam | 测试接缝 |
| unit test | 单元测试 |
| integration test | 集成测试 |
| contract test | 契约测试 |
| end-to-end test | 端到端测试 |
| smoke test | 冒烟测试 |
| regression test | 回归测试 |
| property test | 属性测试 |
| test fixture | 测试夹具 |
| fake | 伪实现；具有可工作实现，但采用不适合正式环境的简化方式 |
| mock | 模拟对象；预置交互预期，并在验证时检查这些预期 |
| test double | 测试替身；`dummy`、`fake`、`stub`、`spy` 和 `mock` 等替代对象的总称 |
| setup / teardown | 准备 / 清理 |
| coverage | 覆盖率 |
| focused test / check | 定向测试 / 定向检查 |
| full test suite | 全量测试套件 |
| failure | 失败 |
| symptom | 症状 |
| reproduction | 复现 |
| instrumentation | 观测代码；强调机制时写“插桩” |
| probe | 探测；验证契约时可写“最小验证” |

## Git 与协作

| English | 中文 |
|---|---|
| repository | 仓库 |
| branch | 分支 |
| worktree | 工作树 |
| commit | 提交 |
| push / pull | 推送 / 拉取 |
| merge / rebase | 合并 / 变基 |
| merge base | 合并基点 |
| remote | 远端 |
| review | 评审 / 审查 |
| reviewer | 评审者 / 审查者 |
| finding | 审查意见；缺陷报告语境下写“问题” |
| handoff | 交接 |
| cleanup | 清理 |
| diff | 差异；指 Git 输出时可保留 `diff` |
| tracked / untracked | 已跟踪 / 未跟踪 |
| staged / unstaged | 已暂存 / 未暂存 |
| dirty working tree | 有未提交改动的工作树 |
| destructive operation | 破坏性操作 |

## 依赖、构建与发布

| English | 中文 |
|---|---|
| package | 包 |
| package manager | 包管理器 |
| dependency graph | 依赖图 |
| lockfile | 锁文件 |
| manifest | 清单文件 |
| toolchain | 工具链 |
| peer dependency | 对等依赖 |
| transitive dependency | 传递依赖 |
| override / resolution | 覆盖规则 / 解析规则 |
| lifecycle script | 生命周期脚本 |
| build | 构建 |
| type check | 类型检查 |
| boot | 启动 |
| deployment | 部署 |
| release | 发布 |
| migration | 迁移 |
| version pin | 版本锁定 |

## 代理工作流

| English | 中文 |
|---|---|
| plan | 计划 |
| plan document / shared plan | 计划文档 / 共享计划 |
| task | 任务 |
| agent | 代理 |
| root agent | 根代理 |
| subagent | 子代理 |
| delegation | 委派 |
| bounded task | 边界明确的任务 |
| independent review | 独立评审 |
| fresh context | 独立上下文；强调时间时写“最新上下文” |
| fresh evidence | 最新证据 |
| progress | 进展 |
| status | 状态 |
| owner | 负责人 |

## 运行与可观测性

| English | 中文 |
|---|---|
| log / metric / trace | 日志 / 指标 / 跟踪 |
| span | 跟踪片段；使用 APM 字段名时保留 `span` |
| production incident | 生产事故 |
| read-only | 只读 |
| payload | 载荷 |
| retry | 重试 |
| time window | 时间范围 |
| downstream | 下游 |
| configuration | 配置 |
| query plan | 查询计划 |
| timeout | 超时 |

## 使用规则

1. 先按语义选择中文词，再检查是否属于必须保持字面精确的标识。
2. 同一文档对同一概念使用同一译法；已有项目术语表或用户明确用词优先于本表。
3. 缩写保持原样；需要解释时从缩写表读取完整英文名称、中文含义和适用语境。有多个合理展开时不得脱离上下文猜测。
4. 中文正文直接使用中文词，不追加逐项英文括注。只有用户要求双语材料、存在真实歧义或正在解释术语本身时才同时展示两种语言。
5. 不把代码、命令输出、错误信息、API 字段或符号翻译成中文。
6. 表中没有的词优先采用行业中稳定、自然的中文；没有公认译法时保留英文，不生造中文。
