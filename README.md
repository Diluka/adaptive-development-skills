# Adaptive Development Skills

自用的自适应开发工作流技能包：按最终是否保留项目产物识别开发任务，把需求具体化为工作单元，用共享计划对齐执行，并为每个单元选择最合适的方法。开发任务完成前统一独立评审；临时调研代码不自动进入开发流程，实现子代理按上下文收益选择。

## 技能清单

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 将需求具体化为工作单元，并自适应选择最合适的方法 |
| `evidence-based-testing` | 选择真实测试接缝，并处理测试与需求冲突 |
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
| `test-driven-development` | 只对明确行为和稳定真实接缝使用 TDD |
| `using-git-worktrees` | 为高风险、并行或存在未提交改动的 Git 工作提供隔离 |
| `dispatching-parallel-agents` | 只并行确有收益且互不冲突的工作单元 |
| `subagent-driven-development` | 在显著节约根代理上下文时委派工作单元，禁止嵌套派发 |
| `receiving-code-review` | 先核验审查意见，再决定是否和如何修改 |
| `requesting-code-review` | 为所有开发任务准备独立评审，按风险调整深度 |
| `verification-before-completion` | 用最新验证和独立评审证据支撑完成声明 |
| `finishing-a-development-branch` | 在验证和独立评审完成后交接分支与集成操作 |

## 本地验证

校验脚本使用 Python 3 和 `requirements.txt` 中声明的 PyYAML。在已激活的隔离 Python 环境中安装依赖后运行：

```bash
python3 -m pip install -r requirements.txt
scripts/validate-skills
scripts/check-cross-references
```

## 思想来源

技能设计受到 [obra/superpowers](https://github.com/obra/superpowers) 等项目启发，之后独立维护。
