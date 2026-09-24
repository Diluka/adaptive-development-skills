# Adaptive Development Skills

一套面向 Codex 等编程代理的开发技能包。用户通常从一句话需求开始；技能帮助代理根据**当前事实、关键缺口、风险与授权**选择下一步，而不是要求用户先提供正式规格，或向代理复述它已经掌握的标准方法。`adaptive-development-workflow` 判断何时直接做、澄清或调查；具体方法与证据选择只有在存在真实缺口时才读取它的按需资源，独立机制技能保留实际需要的安全边界。目标是少绕路、少返工，交付符合真实需求与契约。设计与验收场景见 [设计文档](docs/design.md)。

## 安装

支持 standalone Skills、Codex Plugin、VS Code Copilot 插件三种安装方式。详见 [安装文档](docs/installation.md)。

## 技能目录

先问哪项缺口会改变下一步：缺用户拥有的业务决定才澄清；缺可查的事实先取证；目标、接缝和授权足够时直接实施或回答。计划、规格、专项方法与独立评审各自只在能拒绝当前合理错误时加入；最终结论仍需与证据相称。

### 选择入口

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 唯一根入口：从短需求选择下一步；确有方法或证据缺口时读取其 `resources/method-selection.md` 等按需资源 |

原独立 `$execution` 入口已并入 `$adaptive-development-workflow`；明确方法的委派子代理仍可只读选中的机制技能。显式调用旧技能名的用户需要改用新入口。

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
