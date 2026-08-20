# Adaptive Development Skills

一套面向 Codex 等编程代理、按工作单元选择方法的通用开发技能包。用途是让代理在**办事效率**与**任务准确度**之间取得平衡：效率 = 少绕路、少做无用功、快速交付；准确度 = 少出错、少返工、满足真实需求与契约。平衡点不固定，由代理根据任务实际情况临场决定。`adaptive-development-workflow` 说明工作节点是什么与各自规矩，`execution` 提供方法名录并决定“具体怎么做”。设计思路与完整技能清单见 [设计文档](docs/design.md)。

## 安装

支持 standalone Skills、Codex Plugin、VS Code Copilot 插件三种安装方式。三个渠道都先安装第三方 [Ponytail](#第三方依赖)，再安装本技能包；完整顺序见 [安装文档](docs/installation.md)。

## 技能目录

所有工作节点与方法都是可选的，不预设任何节点或方法“必须”或“不能”使用；选中某个节点或方法，就要按它的规矩办事。当目标、真实调用方和契约已经足以实施，且专项方法没有额外反馈或证据收益时，直接实现也是一等选择，不需要为它创建专用技能。

### 决策入口

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 工作节点（讨论 / 调查 / 设计 / 作业 / 验证 / 评审）是什么、各自规矩，以及串起全部节点的完整工作流参考例子 |
| `execution` | 微观执行入口：执行循环 + 方法名录（调查、开发、验证、文档、评审、交付方法与执行机制），判断证据充分性，落实动作并根据结果反馈 |

### 方法 · 执行与机制

| 技能 | 用途 |
|---|---|
| `using-git-worktrees` | 隔离分支与并行写入，维护工作树所有权、共享资源和串行集成边界 |
| `finishing-a-development-branch` | 核对分支就绪状态，按实际 `git remote` 完成默认 Git 交付，先回报 MR/PR 与 CI，再等待自动流水线终态 |
| `requesting-code-review` | 在独立视角能补充风险证据时准备和执行评审 |
| `receiving-code-review` | 先核验审查意见，再决定是否以及如何修改 |
| `verification-before-completion` | 独立核对完成声明和节点转换就绪状态，为最终增量匹配最新且直接的验证、CI、观测或评审证据 |
| `maintenance-operations` | 安全执行清理死代码、依赖升级等不改变行为或只改变解析的维护变更 |
| `agent-and-parallel-dispatch` | 选择执行形态，判断委派或并行是否确有收益，管理任务内子代理及独立会话的派发、回报与粗粒度并行编排 |
| `documentation` | 按读者任务选择最小充分形态，编写临时计划，并创建、组织和持续维护 README、Wiki 与其他正式项目文档 |
| `delivery` | 通过主干集成、持续保持可发布到正式环境受控暴露管理交付节奏 |

### 方法 · 调查（独立技能入口）

| 技能 | 用途 |
|---|---|
| `system-understanding` | 梳理仓库结构、真实运行路径与历史演进，交付事实模型和决策输入 |
| `contract-verification` | 以确切安装版本核验 SDK、框架、协议与外部边界契约事实 |
| `unknown-exploration` | 以最小可丢弃试验或受控探索会话回答技术未知与行为风险 |

### 方法 · 公开标准方法（execution 方法名录内，无独立技能入口）

公开标准方法（系统化调试、基于属性的测试、消费者驱动契约测试等）不设独立技能入口，在 `execution` 的方法名录中按完整名字提及，AI 按需选用：

| 方法 | 用途 |
|---|---|
| 系统化调试（Systematic Debugging） | 从已观察症状追踪到第一个错误状态和因果链 |
| 基于属性的测试（Property-Based Testing） | 以独立属性、生成器、执行、收缩和回归反例验证广泛输入空间 |
| 消费者驱动契约测试（Consumer-Driven Contract Testing） | 用真实使用方期望、版本化契约和提供方验证持续判断服务兼容 |

## 第三方依赖

- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)

## 参考文献

### 方法来源

这些资料用于校准方法的标准术语、阶段和边界。本仓库不跟踪上游版本，也不承担对具体工具实现的兼容义务；工具专用命令和模板不会被泛化为通用方法要求。

- **规格驱动开发（Spec-Driven Development，SDD）**：[GitHub Spec Kit](https://github.com/github/spec-kit)、[Spec-Driven Development methodology](https://github.com/github/spec-kit/blob/main/spec-driven.md)、[Evolving specifications](https://github.com/github/spec-kit/blob/main/docs/guides/evolving-specs.md) 与 [Kiro Specs](https://kiro.dev/docs/specs/)。
- **行为驱动开发（Behavior-Driven Development，BDD）**：[Cucumber, Behaviour-Driven Development](https://cucumber.io/docs/bdd/)。
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
