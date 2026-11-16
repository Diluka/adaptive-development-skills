# 安装

以下三种方式是替代渠道。每个 Codex 运行环境为同名 Skills 选择一种安装来源，以保持发现与更新状态一致。

## 只安装 Skills

此命令安装 standalone Skills；Hook 由 Codex Plugin 渠道提供：

```bash
npx skills add Diluka/adaptive-development-skills
```

## 安装 Codex Plugin

Plugin 复用仓库根目录的同一份 `skills/`，并额外提供可选的 `task-handoff` Hook：

```bash
codex plugin marketplace add Diluka/adaptive-development-skills --ref main
codex plugin add adaptive-development-skills@adaptive-development-skills
```

### 启动与信任

安装后启动新任务，让 Codex 载入 Plugin Skills。安装的命令 Hook 由用户通过 `/hooks` 审阅当前定义后决定信任状态：可以信任、保持未信任或单独禁用。

Plugin Skills 在 Hook 的不同信任状态下均可使用。marketplace 将 Plugin 标记为 `AVAILABLE`，由用户按需选择安装。

### 运行时与权限

Hook launcher 优先使用 Deno 2；当系统找不到 `deno` 可执行文件时，使用 Node 24 的 TypeScript type stripping 运行同一脚本。选定运行时的退出码原样返回；两种运行时均不可用时，launcher 向 stderr 提示并以 0 退出，让可选 Hook、用户回合或压缩继续运行。

Deno 分支禁用远程与 npm 依赖解析。业务代码只读取 `TASK_HANDOFF_DATA`；Deno 的 Node 兼容层读取 `NODE_V8_COVERAGE`，并在 launcher 拼接出的 Plugin 专属临时子目录内读写检查点和启动 `git`。该目录限定了读写权限范围。

Node fallback 使用同一子目录，并以整体权限开放 `child_process`；其权限模型同时允许读取环境变量和访问网络，因此默认优先使用 Deno。两条路径都通过 `git rev-parse` 读取 HEAD 元数据，以保持工作区内容在检查点流程之外。环境条件不满足时，Hook 可保持未信任或禁用，Plugin Skills 仍可独立使用。

### 检查点与恢复

`task-handoff` 在 POSIX 的
`${TMPDIR:-/tmp}/adaptive-development-skills-task-handoff/handoffs/<sha256(session_id)>/state.md`
或 Windows 的
`%TEMP%\adaptive-development-skills-task-handoff\handoffs\<sha256(session_id)>\state.md`
维护会话检查点；Windows 在 `TEMP` 缺失时回退 `TMP`。

检查点写入系统临时目录，项目目录保持独立；Hook 输入依据 Codex Hook 事件 schema 解析，状态使用事件中的适用字段构建，每个会话保留一个 `state.md`。transcript JSONL 格式处于实现读取范围之外。会话不再恢复后，Hook 停止读取该文件，生命周期交由系统临时目录的清理策略管理；Hook 未配置额外 TTL 或专用清理器。检查点包含当前用户请求、最后一次完成的代理回复和 Git HEAD，可能承载任务上下文；信任 Hook 前请审阅实现。

Codex 的 `PreCompact` 普通输出通道不会把内容送入模型上下文；Hook 因此在用户回合开始时提前提醒，并在限定的代表性事件上刷新已有状态。`PreCompact` 完成压缩前的最后一次状态刷新，`SessionStart` 的 `compact` 恢复入口将同一会话文件送回模型。`status=complete` 表示检查点保存流程完成，任务完成状态应以任务结果判断。

## 在 VS Code 中安装 Copilot 插件

仓库以 VS Code Agent plugins（预览）格式复用同一份 `skills/`，提供 Skills。远程会话中的 Copilot Hook 执行可能误用本地路径，因此当前 Hook 适配范围聚焦于本地会话；Skills 可独立使用。

两种安装方式：

- 从源码安装：命令面板运行 `Chat: Install Plugin From Source`，输入
  `https://github.com/Diluka/adaptive-development-skills`。
- 作为 marketplace：在用户 `settings.json` 中设置
  `"chat.plugins.marketplaces": ["Diluka/adaptive-development-skills"]`，然后在扩展视图搜索
  `@agentPlugins` 安装 `adaptive-development-skills`。

确保 VS Code 已启用 Agent plugins（设置 `chat.plugins.enabled`，默认开启）。
