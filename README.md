# Adaptive Development Skills

这是一套按工作单元选择方法的通用开发技能。`adaptive-development-workflow` 是共享分类与路由入口：先按当前增量决定最低充分流程，再按独立目标与证据边界把请求拆成调查或开发单元；用户明确调用独立方法时，该方法按自身触发条件核验适用性。集成与交付方法、计划、文档、验证、评审、工作树和代理编排按需叠加，不与主要方法竞争。

调查方法只交付事实、根因、可行性或决策输入。调查结论一旦要转成项目长期保留的实现、测试、契约或文档，就返回入口重新选择开发方式。开发方式保持各自的行业标准流程；小而明确的增量仍可直接实现，不为形式强制 SDD、BDD 或 TDD。

常规与复杂开发任务默认按“计划 → 实现 → 测试 → 评审 → 返工”的组合流程推进：这是对既有方法的编排组合，不是新的主要开发方式。除实现外各步骤可按任务级别省略；各步骤可由子代理推进以隔离会话步骤，评审只能由独立子代理进行或省略。完整定义与简化规则见 `adaptive-development-workflow`。

## 技能体系

### 共享入口

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 分级当前增量，拆分并分类工作单元，选择主要方法及正交支持；`resources/terminology.md` 提供术语对照 |

### 工作节点技能

| 技能 | 用途 |
|---|---|
| `writing-plans` | 为需要协调、恢复上下文或高风险控制的任务编写共享计划 |
| `executing-plans` | 执行并同步已有计划，衔接适用验证、评审与必要复审 |
| `requesting-code-review` | 在独立视角能补充风险证据时准备和执行评审 |
| `receiving-code-review` | 先核验审查意见，再决定是否以及如何修改 |
| `subagent-driven-development` | 在同一 Codex 任务内为上下文收益或独立证据委派工作单元 |
| `dispatching-parallel-agents` | 判断工作单元能否安全并行以及并行是否有实际收益 |
| `orchestrating-multi-session-work` | 按明确授权编排可恢复、隔离的独立 Codex 工作任务 |
| `using-git-worktrees` | 为项目改动分支提供本地工作树隔离，并处理只读访问等例外 |
| `finishing-a-development-branch` | 核对具体分支就绪状态，并按授权完成同步、交接或清理 |
| `verification-before-completion` | 为当前完成声明匹配最新且直接的验证、CI、观测或评审证据 |
| `choosing-tests` | 根据任务形状与优先级选择端到端、单元、TDD、属性或契约测试等方式 |
| `evidence-management` | 判断证据充分性、复用既有证据并收敛长期证据组合 |
| `brainstorming` | 只澄清会实质改变方案的关键歧义 |
| `project-documentation` | 维护需要长期保存并版本控制的需求、设计、决策和其他正式项目文档 |

### 方法技能

#### 开发方法

| 技能 | 用途 |
|---|---|
| `spec-driven-development` | 以可演进规格贯通 Requirements、Design / Plan、Tasks 与 Implement |
| `behavior-driven-development` | 通过 Discovery、Formulation、Automation 和真实业务示例形成共享行为 |
| `test-driven-development` | 仅适用于定义精确、自包含的零件开发；需求模糊或大功能开发不适用 |
| `type-driven-design` | 把稳定领域不变量编码为类型约束，在可信边界内排除非法表示 |
| `maintenance-operations` | 安全执行清理死代码、依赖升级等不改变行为或只改变解析的维护变更 |

#### 测试方法

| 技能 | 用途 |
|---|---|
| `property-based-testing` | 以独立属性、生成器、执行、收缩和回归反例验证广泛输入空间 |
| `consumer-driven-contract-testing` | 用真实使用方期望、版本化契约和提供方验证持续判断服务兼容 |
| `baseline-and-eval-testing` | 以可审阅基线或代表任务评估验证复杂、旧行为或概率性主观输出 |

#### 调查方法

| 技能 | 用途 |
|---|---|
| `system-understanding` | 理解现有系统的结构、运行路径、历史演进与架构决策 |
| `contract-verification` | 核验确切版本下已安装或运行的 SDK、协议、框架与外部边界事实 |
| `systematic-debugging` | 从已观察症状追踪到第一个错误状态和因果链 |
| `unknown-exploration` | 以最小可丢弃试验或受控探索会话回答技术未知与行为风险 |

#### 交付方法

| 技能 | 用途 |
|---|---|
| `delivery` | 通过主干集成、持续保持可发布到正式环境受控暴露管理交付节奏 |

目标、真实调用方和契约已经足以实施，且专项方法没有额外反馈或证据收益时，直接实现也是一等选择，不需要为它创建专用技能；现有证据是否存在不决定开发方式，真实缺口由 `evidence-management` 判断证据充分性并收敛。

## 方法来源

这些资料用于校准方法的标准术语、阶段和边界。本仓库不跟踪上游版本，也不承担对具体工具实现的兼容义务；工具专用命令和模板不会被泛化为通用方法要求。

- **TDD**：Kent Beck, [Test-Driven Development: By Example](https://www.pearson.com/en-us/subject-catalog/p/test-driven-development-by-example/P200000009421/9780321146533)。
- **SDD**：[GitHub Spec Kit](https://github.com/github/spec-kit)、[Spec-Driven Development methodology](https://github.com/github/spec-kit/blob/main/spec-driven.md)、[Evolving specifications](https://github.com/github/spec-kit/blob/main/docs/guides/evolving-specs.md) 与 [Kiro Specs](https://kiro.dev/docs/specs/)。
- **BDD / ATDD 边界**：[Cucumber, Behaviour-Driven Development](https://cucumber.io/docs/bdd/)。
- **Type-Driven Design**：[Edwin Brady, Type-Driven Development with Idris](https://www.manning.com/books/type-driven-development-with-idris)、[Scott Wlaschin, Making illegal states unrepresentable](https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/) 与 [Alexis King, Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)。语言能力边界参考 [Rust typestate](https://docs.rust-embedded.org/book/static-guarantees/typestate-programming.html)、[TypeScript discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) 和 [Kotlin sealed classes](https://kotlinlang.org/docs/sealed-classes.html)。
- **Property-Based Testing**：[Hypothesis introduction](https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html)、[Replaying failures](https://hypothesis.readthedocs.io/en/latest/tutorial/replaying-failures.html) 与 [QuickCheck API](https://hackage-content.haskell.org/package/QuickCheck-2.18.0.0/docs/Test-QuickCheck.html)。
- **Consumer-Driven Contract Testing**：[Pact, How Pact works](https://docs.pact.io/getting_started/how_pact_works)、[When to use Pact](https://docs.pact.io/getting_started/what_is_pact_good_for) 与 [Can I Deploy](https://docs.pact.io/pact_broker/can_i_deploy)。
- **Characterization / Golden Master / Approval Testing**：[Michael Feathers, Characterization Testing](https://michaelfeathers.silvrback.com/characterization-testing) 与 [ApprovalTests concepts](https://github.com/approvals/ApprovalTests.Documentation/blob/main/explanations/approval_testing.md)。
- **Eval-Driven Development**：[Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) 与 [Claude evaluation tool documentation](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)。
- **Exploratory Testing**：[James Bach and Michael Bolton, Exploratory Testing 3.0](https://www.satisfice.com/blog/archives/1509)、[Exploratory Testing](https://www.satisfice.com/exploratory-testing) 与 [Session-Based Test Management](https://www.satisfice.com/download/session-based-test-management)。
- **Trunk-Based Development**：[Trunk Based Development](https://trunkbaseddevelopment.com/)、[Short-Lived Feature Branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/) 与 [DORA capability](https://dora.dev/capabilities/trunk-based-development/)。
- **Continuous Delivery**：[DORA, Continuous delivery](https://dora.dev/capabilities/continuous-delivery/)。
- **Progressive Delivery**：[James Governor, Towards Progressive Delivery](https://web.archive.org/web/20180807003203/https://redmonk.com/jgovernor/2018/08/06/towards-progressive-delivery/) 与 [Argo Rollouts](https://argo-rollouts.readthedocs.io/en/stable/)。

## 其他思想来源

- [obra/superpowers](https://github.com/obra/superpowers)
- [lzj960515/codex-workbench](https://github.com/lzj960515/codex-workbench)
- [lzj960515/codrive](https://github.com/lzj960515/codrive)
