# 安装

以下三种方式是替代渠道。同一个 Codex 运行环境不要同时安装 Plugin Skills 与同名
standalone Skills，以免重复发现并形成分开的更新状态。每种方式都先安装 Ponytail，
再安装本技能包；两个项目保持各自的安装与更新来源。

## 只安装 Skills

两个项目都只安装 Skills，不安装 Hook；Ponytail 只选择代码简化所需的核心 skill：

```bash
npx skills add DietrichGebert/ponytail --skill ponytail
npx skills add Diluka/adaptive-development-skills
```

## 安装 Codex Plugin

两个 Plugin 使用各自的 marketplace 与插件身份。本仓库的 Plugin 复用根目录的同一份
`skills/`，并额外提供可选的 `task-handoff` Hook：

```bash
codex plugin marketplace add DietrichGebert/ponytail
codex plugin add ponytail@ponytail
codex plugin marketplace add Diluka/adaptive-development-skills --ref main
codex plugin add adaptive-development-skills@adaptive-development-skills
```

### 启动与信任

安装后通过 `/hooks` 分别审阅两个 Plugin 携带的命令 Hook，再启动新任务，让 Codex
载入 Plugin Skills。Ponytail 的模式、运行时和 Hook 行为以其
[上游文档](https://github.com/DietrichGebert/ponytail) 为准。

未信任或禁用 Hook 不影响 Plugin Skills。marketplace 也使用
`AVAILABLE`，不会默认安装 Plugin。

### task-handoff 运行时与权限

Hook launcher 优先使用 Deno 2；只有找不到 `deno` 可执行文件时，才使用 Node 24 的
TypeScript type stripping 运行同一脚本。选中的运行时执行失败时，launcher
原样返回退出码，不会换另一个运行时重试；两者都不存在时，只向 stderr 提示并以 0
退出，不阻止可选 Hook、用户回合或压缩。

Deno 分支禁用远程与 npm 依赖解析。业务代码只读取 `TASK_HANDOFF_DATA`；Deno 的
Node 兼容层可读取 `NODE_V8_COVERAGE`，并在 launcher 拼接出的 Plugin
专属临时子目录内读写检查点和启动 `git`。读写权限不覆盖整个系统临时目录。

Node fallback 使用同一子目录，但只能整体开放 `child_process`，不能限制为仅执行
`git`，其权限模型也不限制环境变量或网络，因此 Deno 始终优先。两条路径都只用
`git rev-parse` 读取 HEAD，不执行会扫描工作区内容的
`git status`。环境不满足时也可以保持 Hook 未信任或禁用，Plugin Skills
仍可独立使用。

### 检查点与恢复

`task-handoff` 在 POSIX 的
`${TMPDIR:-/tmp}/adaptive-development-skills-task-handoff/handoffs/<sha256(session_id)>/state.md`
或 Windows 的
`%TEMP%\adaptive-development-skills-task-handoff\handoffs\<sha256(session_id)>\state.md`
维护会话检查点；Windows 在 `TEMP` 缺失时回退 `TMP`。

它不写目标项目，也不读取 transcript 的内部 JSONL 格式。每个会话只维护一个
`state.md`；会话不再恢复后 Hook
不会再次读取，文件由系统临时目录的清理策略回收，不另设 TTL
或清理器。检查点包含当前用户请求、最后一次完成的代理回复和 Git
HEAD，因此可能包含任务上下文；请在信任 Hook 前审阅实现。

Codex 当前不能把 `PreCompact` 的普通输出送给模型，所以 Hook
不声称能在压缩瞬间要求代理再总结一次。它会在用户回合开始时提前提醒，在限定的代表性事件上刷新已有状态，由
`PreCompact` 完成压缩前的最后一次状态刷新，再通过 `SessionStart` 的 `compact`
恢复入口把同一会话文件送回模型。`status=complete`
只表示检查点保存流程完成，不表示任务已经完成。

## 在 VS Code 中安装 Copilot 插件

仓库以 VS Code Agent plugins（预览）格式复用同一份 `skills/`，只提供
Skills，不提供 Hook。VS Code 中 Copilot 插件的 Hook
执行存在已知问题：远程会话会误用本地路径，当前不进行适配。

两种安装方式：

- 从源码安装：命令面板分别运行 `Chat: Install Plugin From Source`，依次输入
  `https://github.com/DietrichGebert/ponytail` 和
  `https://github.com/Diluka/adaptive-development-skills`。
- 作为 marketplace：在用户 `settings.json` 中设置
  `"chat.plugins.marketplaces": ["DietrichGebert/ponytail", "Diluka/adaptive-development-skills"]`，
  然后在扩展视图搜索 `@agentPlugins`，依次安装 `ponytail` 和
  `adaptive-development-skills`。

确保 VS Code 已启用 Agent plugins（设置 `chat.plugins.enabled`，默认开启）。
