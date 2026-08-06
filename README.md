# Adaptive Development Skills

这是一套自用的开发工作流技能。任务是否属于开发任务，取决于最终是否要保留项目产物。确定任务类型后，先按当前增量和真实风险选择最低充分流程，再拆分工作单元，并按结果确定性和可用证据选择 TDD、直接实现、行为基线、快照、评估或专项调查。

计划、验证、独立评审和交付节点可以相同，但必要性随任务级别变化：微小任务直接实现、检查和总结；常规任务按证据收益选择；复杂或高风险任务使用共享计划和独立评审。已有测试、评审和 CI 只在当前变化影响其结论时失效。临时调研代码不会自动进入开发流程；是否使用子代理，取决于上下文成本和独立证据的价值。

## 安装

下面两种方式是替代渠道。不要在同一个 Codex 运行环境中同时安装 Plugin Skills 与同名 standalone Skills，避免重复发现和分开的更新状态。

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

安装后请启动新任务，让 Codex 载入 Plugin Skills。Plugin 安装不会自动信任它携带的命令 Hook；通过 `/hooks` 审阅当前定义后，可以选择信任、保持未信任或单独禁用。未信任或禁用 Hook 不影响 Plugin Skills，marketplace 也使用 `AVAILABLE`，不会默认安装 Plugin。

Hook 运行需要 Deno 2 或更高版本。Hook 启动命令禁用远程与 npm 依赖解析，只允许读取 `PLUGIN_DATA` 环境变量、在该目录读写检查点并启动 `git`；脚本只用 `git rev-parse` 读取 HEAD，不执行会扫描工作区内容的 `git status`，也不授予 Deno 网络或目标项目文件读写权限。环境不满足时可以保持 Hook 未信任或禁用，Plugin Skills 仍可独立使用。

`task-handoff` 在 `$PLUGIN_DATA/handoffs/<sha256(session_id)>/state.md` 原子维护会话检查点，不写目标项目，也不读取 transcript 的内部 JSONL 格式。`state.md` 是唯一持久会话正文；同目录的 `.state.lock` 只用于串行化并发更新，临时文件会在原子替换后清理。检查点包含当前用户请求、最后一次完成的代理回复和 Git HEAD，因此可能包含任务上下文；请在信任 Hook 前审阅实现。

Codex 当前不能把 `PreCompact` 的普通输出送给模型，所以 Hook 不声称能在压缩瞬间要求代理再总结一次。它会在用户回合开始时提前提醒，在限定的代表性事件上刷新已有状态，由 `PreCompact` 完成最后的完整性写入，再通过 `SessionStart` 的 `compact` 恢复入口把同一会话文件送回模型。`status=complete` 只表示检查点写入完整，不表示任务已经完成。

## 技能清单

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 按当前增量分级，决定必要流程节点并为工作单元选择方法 |
| `source-repo-study` | 用地图、专题或演进模式建立有源码依据的当前系统理解 |
| `architecture-design-review` | 基于真实系统事实审查目标架构的职责、边界、不变量与风险 |
| `evidence-based-testing` | 复用仍有效证据，在测试、CI、快照、评估和观测之间补足真实缺口 |
| `contract-verification` | 核验 SDK、协议、框架与依赖的真实契约 |
| `caller-driven-cleanup` | 依据真实调用方、导出和运行时加载完成删除清理 |
| `technical-spike` | 用可丢弃试验回答未知可行性，决定保留时转入开发任务 |
| `dependency-upgrade` | 基于实际依赖图与工具链规划升级 |
| `technical-terminology` | 统一常见开发术语的中英文表达与英文标识边界 |
| `project-documentation` | 按当前文档增量维护需要长期保存并版本控制的正式项目文档 |
| `brainstorming` | 只澄清会实质改变方案的关键歧义 |
| `writing-plans` | 为需要协调、恢复上下文或高风险控制的任务编写共享计划 |
| `executing-plans` | 执行并同步已有计划，衔接适用验证、评审与必要复审 |
| `systematic-debugging` | 从运行时证据、调用方与契约追踪根因 |
| `test-driven-development` | 只对具有独立稳定判据、真实接缝和具体回归风险的确定性行为使用 TDD |
| `using-git-worktrees` | 让会产生改动的开发分支默认绑定独立工作树，并判断只读访问等隔离例外 |
| `dispatching-parallel-agents` | 为吞吐或独立对照并行可安全隔离的工作单元 |
| `subagent-driven-development` | 为上下文收益或独立证据委派工作单元，禁止嵌套派发 |
| `receiving-code-review` | 先核验审查意见，再决定是否和如何修改 |
| `requesting-code-review` | 在独立视角能补充风险证据时准备评审，按任务级别调整深度 |
| `verification-before-completion` | 复用仍有效证据，为当前完成声明补足验证、CI 或评审缺口 |
| `finishing-a-development-branch` | 按当前集成增量核对证据并交接分支与集成操作 |

## 思想来源

- [obra/superpowers](https://github.com/obra/superpowers)
- [lzj960515/codex-workbench](https://github.com/lzj960515/codex-workbench)
