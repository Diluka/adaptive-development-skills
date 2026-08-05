# Adaptive Development Skills

这是一套自用的开发工作流技能。任务是否属于开发任务，取决于最终是否要保留项目产物。确定任务类型后，再拆分工作单元，并按结果确定性和可用证据选择 TDD、直接实现、行为基线、快照、评估或专项调查。

开发任务用一份共享计划对齐执行，交付前接受独立评审。临时调研代码不会自动进入开发流程；是否使用子代理，取决于上下文成本和独立证据的价值。

## 技能清单

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 将需求具体化为工作单元，并自适应选择最合适的方法 |
| `evidence-based-testing` | 在测试、快照、评估和观测之间选择足够且有效的证据 |
| `contract-verification` | 核验 SDK、协议、框架与依赖的真实契约 |
| `caller-driven-cleanup` | 依据真实调用方、导出和运行时加载完成删除清理 |
| `technical-spike` | 用可丢弃试验回答未知可行性，决定保留时转入开发任务 |
| `dependency-upgrade` | 基于实际依赖图与工具链规划升级 |
| `technical-terminology` | 统一常见开发术语的中英文表达与英文标识边界 |
| `project-documentation` | 按开发任务流程维护需要长期保存并版本控制的正式项目文档 |
| `brainstorming` | 只澄清会实质改变方案的关键歧义 |
| `writing-plans` | 为每个开发任务写入可长可短、可修正的共享计划 |
| `executing-plans` | 执行并同步计划，衔接验证、独立评审与必要复审 |
| `systematic-debugging` | 从运行时证据、调用方与契约追踪根因 |
| `test-driven-development` | 只对具有独立稳定判据、真实接缝和具体回归风险的确定性行为使用 TDD |
| `using-git-worktrees` | 让会产生改动的开发分支默认绑定独立工作树，并判断只读访问等隔离例外 |
| `dispatching-parallel-agents` | 为吞吐或独立对照并行可安全隔离的工作单元 |
| `subagent-driven-development` | 为上下文收益或独立证据委派工作单元，禁止嵌套派发 |
| `receiving-code-review` | 先核验审查意见，再决定是否和如何修改 |
| `requesting-code-review` | 为所有开发任务准备独立评审，按风险调整深度 |
| `verification-before-completion` | 用最新验证和独立评审证据支撑完成声明 |
| `finishing-a-development-branch` | 在验证和独立评审完成后交接分支与集成操作 |

## 思想来源

最初的设计参考了 [obra/superpowers](https://github.com/obra/superpowers) 等项目，目前独立维护。
