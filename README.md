# Adaptive Development Skills

一组面向 Codex 等编程代理、可按具体问题独立使用的开发方法 Skill。

它不接管代理的通用工作流：没有专项方法适用时，代理直接依据用户请求和目标仓库规则完成任务。Skill 只补充容易做错或需要稳定反馈循环的专业方法，例如根因调试、遗留行为基线、概率性能力评估、契约测试和受控发布。

## 安装

支持 standalone Skills、Codex Plugin 和 VS Code Copilot 插件三种安装方式。详见 [安装文档](docs/installation.md)。Codex Plugin 额外包含可选的任务交接 Hook；standalone Skills 不依赖 Hook。

## Skills

### 设计与开发

| Skill | 适用问题 |
|---|---|
| `brainstorming` | 关键歧义或竞争方案会实质改变实现，需要先发散再收敛 |
| `spec-driven-development` | 复杂或多人协作开发需要用可演进规格贯通需求、设计、任务与实现 |
| `behavior-driven-development` | 业务与技术角色需要用真实示例共同发现、表述和自动化行为 |
| `type-driven-design` | 稳定领域不变量值得编码进类型系统，以排除非法状态 |

### 测试与评估

| Skill | 适用问题 |
|---|---|
| `property-based-testing` | 算法、解析器、状态机或转换具有可独立定义的广泛输入属性 |
| `consumer-driven-contract-testing` | 可独立演进的使用方与提供方需要持续验证版本兼容性 |
| `characterization-and-approval-testing` | 遗留系统或复杂输出需要从真实执行建立可审阅的行为基线 |
| `eval-driven-development` | AI、Agent 或生成能力需要用代表任务、grader、基线和重复试验改进 |

### 调查与理解

| Skill | 适用问题 |
|---|---|
| `systematic-debugging` | 已观察到 Bug、事故或回归，需要追踪因果链并按需修复根因 |
| `system-understanding` | 需要理解代码结构、真实运行路径、历史演进或架构职责 |
| `contract-verification` | 需要核验实际安装或运行版本的 SDK、协议、CLI 或传输契约 |
| `unknown-exploration` | 技术可行性、性能、集成形态或产品风险仍需最小可丢弃试验 |

### 维护、文档与协作

| Skill | 适用问题 |
|---|---|
| `maintenance-operations` | 删除死代码或升级依赖等行为保持型维护变更 |
| `documentation` | 面向读者实质编写或组织计划、README、Wiki、设计、接口等项目文档 |
| `receiving-code-review` | 核验并处理评审意见，避免按意见字面盲改 |
| `requesting-code-review` | 用户、项目或具体风险需要独立代码评审 |
| `verification-before-completion` | 为行为、测试、集成、CI、发布或生产状态声明匹配最新直接证据 |
| `using-git-worktrees` | 用户要求 worktree，或并行分支与现有改动需要 Git 状态隔离 |
| `finishing-a-development-branch` | 用户要求提交、推送、PR/MR、合并、同步或清理分支 |
| `delivery` | 设计主干集成、持续交付或渐进式受控发布的交付节奏 |

设计边界与取舍见 [设计文档](docs/design.md)。

## 参考

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Cucumber BDD](https://cucumber.io/docs/bdd/)
- [Pact](https://docs.pact.io/getting_started/how_pact_works)
- [Hypothesis](https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html)
- [ApprovalTests concepts](https://github.com/approvals/ApprovalTests.Documentation/blob/main/explanations/approval_testing.md)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Trunk Based Development](https://trunkbaseddevelopment.com/)
- [DORA: Continuous delivery](https://dora.dev/capabilities/continuous-delivery/)

其他思想来源：[obra/superpowers](https://github.com/obra/superpowers)、[openai/plugins](https://github.com/openai/plugins)、[lzj960515/codex-workbench](https://github.com/lzj960515/codex-workbench) 与 [lzj960515/codrive](https://github.com/lzj960515/codrive)。
