# Adaptive Development Skills

这是一套按工作单元选择方法的通用开发技能。

## 如何选择和组合技能

`adaptive-development-workflow` 按当前增量和工作单元路由。显式调用的方法自行核验适用性；专项方法无独立收益时可直接实现。集成、交付、计划、验证、评审、工作树和代理编排按需叠加，不与主要方法竞争。

调查只交付事实、根因、可行性或决策输入；结论转为长期项目变更时重新路由。常规与复杂任务按等级组合计划、实现、测试、评审和返工；这不是新的主要方法，除实现外可按证据收益省略。当前任务内子代理只做短小局部协作；持续写入的并行单元使用负责会话和独立工作树。

开发变更默认按仓库约定完成 Git 交付，用户可收窄；合并、发布、部署、正式环境写入、权限和其他高影响操作须明确授权。完整规则见 `adaptive-development-workflow`。

## 安装

以下三种方式是替代渠道。同一个 Codex 运行环境不要同时安装 Plugin Skills 与同名 standalone Skills，以免重复发现并形成分开的更新状态。

### 只安装 Skills

现有 `npx skills` 安装方式保持不变，也不会安装 Hook：

```bash
npx skills add Diluka/adaptive-development-skills
```

### 安装 Codex Plugin

Plugin 复用仓库根目录的同一份 `skills/`，并额外提供可选的 `task-handoff` Hook：

```bash
codex plugin marketplace add Diluka/adaptive-development-skills --ref main
codex plugin add adaptive-development-skills@adaptive-development-skills
```

#### 启动与信任

安装后启动新任务，让 Codex 载入 Plugin Skills。Plugin 安装不会自动信任携带的命令 Hook；通过 `/hooks` 审阅当前定义后，可以选择信任、保持未信任或单独禁用。

未信任或禁用 Hook 不影响 Plugin Skills。marketplace 也使用 `AVAILABLE`，不会默认安装 Plugin。

#### 运行时与权限

Hook launcher 优先使用 Deno 2；只有找不到 `deno` 可执行文件时，才使用 Node 24 的 TypeScript type stripping 运行同一脚本。选中的运行时执行失败时，launcher 原样返回退出码，不会换另一个运行时重试；两者都不存在时，只向 stderr 提示并以 0 退出，不阻止可选 Hook、用户回合或压缩。

Deno 分支禁用远程与 npm 依赖解析。业务代码只读取 `TASK_HANDOFF_DATA`；Deno 的 Node 兼容层可读取 `NODE_V8_COVERAGE`，并在 launcher 拼接出的 Plugin 专属临时子目录内读写检查点和启动 `git`。读写权限不覆盖整个系统临时目录。

Node fallback 使用同一子目录，但只能整体开放 `child_process`，不能限制为仅执行 `git`，其权限模型也不限制环境变量或网络，因此 Deno 始终优先。两条路径都只用 `git rev-parse` 读取 HEAD，不执行会扫描工作区内容的 `git status`。环境不满足时也可以保持 Hook 未信任或禁用，Plugin Skills 仍可独立使用。

#### 检查点与恢复

`task-handoff` 在 POSIX 的 `${TMPDIR:-/tmp}/adaptive-development-skills-task-handoff/handoffs/<sha256(session_id)>/state.md` 或 Windows 的 `%TEMP%\adaptive-development-skills-task-handoff\handoffs\<sha256(session_id)>\state.md` 维护会话检查点；Windows 在 `TEMP` 缺失时回退 `TMP`。

它不写目标项目，也不读取 transcript 的内部 JSONL 格式。每个会话只维护一个 `state.md`；会话不再恢复后 Hook 不会再次读取，文件由系统临时目录的清理策略回收，不另设 TTL 或清理器。检查点包含当前用户请求、最后一次完成的代理回复和 Git HEAD，因此可能包含任务上下文；请在信任 Hook 前审阅实现。

Codex 当前不能把 `PreCompact` 的普通输出送给模型，所以 Hook 不声称能在压缩瞬间要求代理再总结一次。它会在用户回合开始时提前提醒，在限定的代表性事件上刷新已有状态，由 `PreCompact` 完成压缩前的最后一次状态刷新，再通过 `SessionStart` 的 `compact` 恢复入口把同一会话文件送回模型。`status=complete` 只表示检查点保存流程完成，不表示任务已经完成。

### 在 VS Code 中安装 Copilot 插件

仓库以 VS Code Agent plugins（预览）格式复用同一份 `skills/`，只提供 Skills，不提供 Hook。VS Code 中 Copilot 插件的 Hook 执行存在已知问题：远程会话会误用本地路径，当前不进行适配。

两种安装方式：

- 从源码安装：命令面板运行 `Chat: Install Plugin From Source`，输入 `https://github.com/Diluka/adaptive-development-skills`。
- 作为 marketplace：在用户 `settings.json` 中设置 `"chat.plugins.marketplaces": ["Diluka/adaptive-development-skills"]`，然后在扩展视图搜索 `@agentPlugins` 安装 `adaptive-development-skills`。

确保 VS Code 已启用 Agent plugins（设置 `chat.plugins.enabled`，默认开启）。

## 技能目录

当目标、真实调用方和契约已经足以实施，且专项方法没有额外反馈或证据收益时，直接实现也是一等选择，不需要为它创建专用技能。现有证据是否存在不决定开发方式；真实缺口由 `evidence-management` 判断证据充分性并收敛。

### 共享入口

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 宏观决策入口：定义工作节点类型、动态编排工作流、处理重编排，进入节点时推荐适用技能集；`resources/` 提供微观决策资源（`node-decisions/` 六节点判据、`verification-selection.md` 验证方式选择、`terminology.md` 术语对照），对应代理按需读取 |

### 方法 · 执行与机制

| 技能 | 用途 |
|---|---|
| `execution` | 在工作节点上执行工作单元，有计划时引用计划、无计划时直接执行，衔接适用验证、评审与必要复审 |
| `using-git-worktrees` | 隔离分支与并行写入，维护工作树所有权、共享资源和串行集成边界 |
| `finishing-a-development-branch` | 核对分支就绪状态，按实际 `git remote` 和仓库约定完成默认 Git 交付，并分开处理合并或清理 |
| `requesting-code-review` | 在独立视角能补充风险证据时准备和执行评审 |
| `receiving-code-review` | 先核验审查意见，再决定是否以及如何修改 |
| `verification-before-completion` | 为当前完成声明匹配最新且直接的验证、CI、观测或评审证据 |
| `evidence-management` | 判断证据充分性、复用既有证据并收敛长期证据组合 |
| `brainstorming` | 讨论方法：先发散探索再收敛，澄清会实质改变方案的关键歧义并明确界限 |
| `maintenance-operations` | 安全执行清理死代码、依赖升级等不改变行为或只改变解析的维护变更 |

### 方法 · 合并后

| 技能 | 用途 |
|---|---|
| `agent-and-parallel-dispatch` | 选择执行形态，判断委派或并行是否确有收益，管理任务内子代理委派与粗粒度并行编排 |
| `documentation` | 编写临时实施计划并创建、更新、验证与版本控制正式项目文档（需求、设计、决策、交付对外文档） |

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
| `baseline-and-eval-testing` | 以可审阅基线或代表任务评估验证复杂、旧行为或概率性主观输出 |

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
