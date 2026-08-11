# Adaptive Development Skills

一套面向 Codex 等编程代理、按工作单元选择方法的通用开发技能包。用途是让代理在**办事效率**与**任务准确度**之间取得平衡：效率 = 少绕路、少做无用功、快速交付；准确度 = 少出错、少返工、满足真实需求与契约。平衡点不固定：`adaptive-development-workflow` 按当前增量编排“做什么与在哪个节点”，`execution` 决定“具体怎么做”。设计思路、分层边界、编排规则与完整技能清单见 [设计文档](docs/design.md)。

## 安装

支持 standalone Skills、Codex Plugin、VS Code Copilot 插件三种安装方式。详见 [安装文档](docs/installation.md)。

## 技能目录

当目标、真实调用方和契约已经足以实施，且专项方法没有额外反馈或证据收益时，直接实现也是一等选择，不需要为它创建专用技能。现有证据是否存在不决定开发方式；`execution` 的按需资源负责方法选择、验证方式与证据充分性。

### 决策入口

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 宏观决策入口：判断任务侧重点与交付意图，拆分和分级工作单元，编排节点与转换；`resources/` 只保留宏观节点路由和术语 |
| `execution` | 微观决策与执行入口：选择开发、调查、文档、验证、评审、交付方法与执行机制，判断证据充分性，落实动作并根据结果反馈 |

`execution/resources/` 按需提供 `method-selection.md`、`verification-selection.md`、`evidence.md`、`baseline-and-evaluation.md`、`characterization-and-approval.md` 和 `eval-driven-development.md`。其中 `baseline-and-evaluation.md` 只按结果形状分流；后两个资源分别完整保留 Characterization / Golden Master / Approval 与 Eval-Driven Development 的成熟方法循环，不再把它们包装成一个独立复合技能。

### 方法 · 执行与机制

| 技能 | 用途 |
|---|---|
| `using-git-worktrees` | 隔离分支与并行写入，维护工作树所有权、共享资源和串行集成边界 |
| `finishing-a-development-branch` | 核对分支就绪状态，按实际 `git remote` 和仓库约定完成默认 Git 交付，并分开处理合并或清理 |
| `requesting-code-review` | 在独立视角能补充风险证据时准备和执行评审 |
| `receiving-code-review` | 先核验审查意见，再决定是否以及如何修改 |
| `verification-before-completion` | 独立核对完成声明和节点转换就绪状态，为最终增量匹配最新且直接的验证、CI、观测或评审证据 |
| `brainstorming` | 讨论方法：先发散探索再收敛，澄清会实质改变方案的关键歧义并明确界限 |
| `maintenance-operations` | 安全执行清理死代码、依赖升级等不改变行为或只改变解析的维护变更 |
| `agent-and-parallel-dispatch` | 选择执行形态，判断委派或并行是否确有收益，管理任务内子代理及独立会话的派发、回报与粗粒度并行编排 |
| `documentation` | 按读者任务选择最小充分形态，编写临时计划，并创建、组织和持续维护 README、Wiki 与其他正式项目文档 |

### 方法 · 标准方法

#### 开发

| 技能 | 用途 |
|---|---|
| `spec-driven-development` | 以可演进规格贯通 Requirements、Design / Plan、Tasks 与 Implement |
| `behavior-driven-development` | 通过 Discovery、Formulation、Automation 和真实业务示例形成共享行为 |
| `test-driven-development` | 仅适用于定义精确、自包含的零件开发；需求模糊或大功能开发不适用 |
| `type-driven-design` | 把稳定领域不变量编码为类型约束，在可信边界内排除非法表示 |

#### 测试

| 技能 | 用途 |
|---|---|
| `property-based-testing` | 以独立属性、生成器、执行、收缩和回归反例验证广泛输入空间 |
| `consumer-driven-contract-testing` | 用真实使用方期望、版本化契约和提供方验证持续判断服务兼容 |

#### 调查

| 技能 | 用途 |
|---|---|
| `system-understanding` | 理解现有系统的结构、运行路径、历史演进与架构决策 |
| `contract-verification` | 核验确切版本下已安装或运行的 SDK、协议、框架与外部边界事实 |
| `systematic-debugging` | 从已观察症状追踪到第一个错误状态和因果链 |
| `unknown-exploration` | 以最小可丢弃试验或受控探索会话回答技术未知与行为风险 |

#### 交付

| 技能 | 用途 |
|---|---|
| `delivery` | 通过主干集成、持续保持可发布到正式环境受控暴露管理交付节奏 |

## 参考文献

### 方法来源

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
- [openai/plugins：`notion-research-documentation`](https://github.com/openai/plugins/tree/main/plugins/notion/skills/notion-research-documentation)
- [lzj960515/codex-workbench](https://github.com/lzj960515/codex-workbench)
- [lzj960515/codrive](https://github.com/lzj960515/codrive)
