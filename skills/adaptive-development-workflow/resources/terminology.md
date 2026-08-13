# Technical Terminology：常见开发术语中英对照

## 核心原则

中文工程文档优先使用自然、稳定的中文术语，不在每次出现时重复括注英文。

本表只收录容易混淆、存在多种合理译法，或会影响本技能包规则判断的词。显然的一对一常识翻译不占用上下文。

以下内容保留原始英文：

- 产品、项目、语言、框架和包的正式名称；
- API、SDK、CLI、HTTP、SQL、PR/MR、APM 等通行缩写；
- 命令、参数、环境变量、路径、文件名、配置键、符号、类型和错误信息；
- 技能名、Git 引用、协议标记和传输字段等必须精确匹配的值。

同一英文词有多种含义时，按实际语义选择中文。例如，`path` 可以是文件路径、调用链或执行路径；`state` 可以是状态或外部数据。

## 开发工作流与歧义缩写

缩写在中文正文中保持原样。本节只收录展开后有助于查阅的开发工作流缩写，以及存在多个合理展开的歧义缩写。

| 缩写 | English expansion | 中文释义与语境 |
|---|---|---|
| ADR | Architecture Decision Record | 架构决策记录 |
| RFC | Request for Comments | 征求意见文档；IETF 语境也指正式发布的技术文档 |
| RFD | Request for Discussion | 讨论请求；工程提案或设计讨论文档 |
| RFD | Reflected File Download | 反射型文件下载；Web 安全漏洞语境 |
| DoR | Definition of Ready | 就绪定义 |
| DoD | Definition of Done | 完成定义 |
| SDD | Spec-Driven Development | 规格驱动开发；不要与单纯编写规格或实施计划混同 |
| BDD | Behavior-Driven Development | 行为驱动开发；核心实践为 Discovery、Formulation、Automation |
| PBT | Property-Based Testing | 属性测试；缩写没有上下文时优先写完整方法名 |
| CDC | Consumer-Driven Contract Testing | 使用方驱动契约测试；也可能表示 Change Data Capture，必须结合语境判断 |
| RCA | Root Cause Analysis | 根因分析 |
| APM | Application Performance Monitoring / Application Performance Management | 应用性能监控 / 应用性能管理 |
| APM | Actions Per Minute | 每分钟操作数；交互或游戏语境 |
| CD | Continuous Delivery / Continuous Deployment | 持续交付 / 持续部署；前者保持可按需发布，后者把合格变化自动部署到正式环境，必须结合语境判断 |

## 需求、方法与证据

| English | 中文与使用边界 |
|---|---|
| development task | 开发任务 |
| investigation | 调查 |
| technical spike | 技术探索 |
| temporary artifact | 临时产物 |
| project artifact / deliverable | 项目产物 / 交付产物 |
| work unit | 工作单元 |
| development method | 开发方式；交付需要项目保留的正式变更 |
| investigation method | 调查方法；交付事实、证据、根因或决策输入，不承接正式实现 |
| lifecycle support | 生命周期支持；计划、文档、验证、评审、工作树、交接与代理编排等正交能力 |
| invariant | 不变量 |
| trade-off | 权衡 |
| assumption / hypothesis | 假设；调试时可写“原因假设” |
| claim | 声明；强调判断结果时可写“结论” |
| verification | 验证 / 核验；检查是否满足明确规格或声明 |
| validation | 验证；确认满足用户需求或真实用途；输入与格式检查语境可写“校验” |
| regression | 回归 |
| baseline | 基线 |
| decision point | 决策点 |
| acceptance criteria | 验收标准 |
| non-goal | 非目标 |
| spec-driven development | 规格驱动开发 |
| spec chain vs spec document | 规格链 / 规格文档：规格链是需求→设计→任务→实现的可追溯推导链（SDD 的工作对象）；规格文档是承载规格链的高标准正式技术文档（项目附件，可对外交付，如语言规格书）。进入 SDD 的触发信号是「已有或将要产生规格文档」 |
| behavior-driven development | 行为驱动开发 |
| Type-Driven Design / Type-Driven Development | 类型驱动设计 / 类型驱动开发；技能名使用 `type-driven-design` |
| property-based testing | 属性测试 |
| consumer-driven contract testing | 使用方驱动契约测试 |
| characterization testing | 特征测试；描述系统当前实际行为，不自动代表正确需求 |
| Golden Master | 保留英文；指从真实执行产生并经审阅批准的行为基线 |
| Approval Testing | 批准测试；通过 received / approved 差异审阅和显式批准维护基线 |
| eval-driven development | 评估驱动开发 |
| exploratory testing | 探索性测试 |
| trunk-based development | 主干开发 |
| continuous delivery / continuous deployment | 持续交付 / 持续部署 |
| progressive delivery | 渐进式交付 |

## 实现、测试与运行

| English | 中文与使用边界 |
|---|---|
| production / production environment / production env / product environment / product env | 正式环境；这些项目内写法视为同一概念，固定搭配仍写“生产代码”“生产事故” |
| runtime | 运行时 |
| contract | 契约 |
| caller | 调用方 |
| consumer / provider | 使用方 / 提供方 |
| adapter / wrapper | 适配器 / 包装层 |
| fallback | 回退分支；恢复策略语境写“回退方案” |
| feature flag | 功能开关 |
| call path | 调用链 |
| data flow / control flow | 数据流 / 控制流 |
| mutable state | 可变状态 |
| breaking change | 破坏性变更 |
| generated output | 生成产物 |
| test seam | 测试接缝 |
| test double | 测试替身；`dummy`、`fake`、`stub`、`spy` 和 `mock` 等替代对象的总称 |
| fake | 伪实现；可工作但采用不适合正式环境的简化实现 |
| mock | 模拟对象；预置交互预期并在验证时检查 |
| test fixture | 测试夹具 |
| instrumentation | 观测代码；强调机制时写“插桩” |
| probe | 探测；契约验证语境可写“最小验证” |
| span | 跟踪片段；作为 APM 字段名时保留 `span` |
| property / generator / shrinking | 属性 / 生成器 / 收缩；属性测试语境 |
| counterexample | 反例 |
| algebraic data type / ADT | 代数数据类型；ADT 也可能表示抽象数据类型，需要结合语境判断 |
| discriminated union / tagged union | 判别联合 / 带标签联合 |
| opaque / branded / refinement type | 不透明类型 / 品牌类型 / 精化类型；作为语言构造名时保留项目原词 |
| typestate | 类型状态；用类型表达协议或对象所处阶段 |
| exhaustive matching | 穷尽匹配 |
| parse, don't validate | 解析而非仅校验；把不可信输入解析为能够携带已验证约束的可信类型 |
| grader / rubric | 评分器 / 评价量表；作为工具字段或类型名时保留英文 |
| trial | 单次试验；评估中同一任务的一次运行 |
| transcript / trace / trajectory | 执行记录 / 轨迹；作为产品字段或 API 名时保留英文 |
| charter / session / debrief | 测试章程 / 探索会话 / 复盘；探索性测试与 SBTM 语境 |
| canary release / blast radius | 金丝雀发布 / 爆炸半径 |

## Git、依赖与代理协作

| English | 中文与使用边界 |
|---|---|
| worktree | 工作树 |
| merge base | 合并基点 |
| finding | 审查意见；缺陷报告语境可写“问题” |
| handoff | 交接 |
| diff | 差异；指 Git 输出时可保留 `diff` |
| staged / unstaged | 已暂存 / 未暂存 |
| dirty working tree | 有未提交改动的工作树 |
| lockfile | 锁文件 |
| manifest | 清单文件 |
| peer / transitive dependency | 对等依赖 / 传递依赖 |
| override / resolution | 覆盖规则 / 解析规则 |
| lifecycle script | 生命周期脚本 |
| version pin | 版本锁定 |
| root agent / subagent | 根代理 / 子代理 |
| delegation | 委派 |
| bounded task | 边界明确的任务 |
| coordinating session / worker session | 协调会话 / 工作会话；显式派发关系中也可称上级会话 / 子会话，不表示产品中的会话层级 |
| temporary session / side session | 临时会话（侧边会话）；不因并存就自动加入多会话协调图或回报链 |
| management handoff | 任务管理权移交；改变对应路径的任务级管理归属，只有同时明确“无需回复”才解除对原上级会话的回报义务 |
| independent review | 独立评审 |
