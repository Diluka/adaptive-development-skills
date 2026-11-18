# 安装

以下三种方式是替代渠道。每个 Codex 运行环境为同名 Skills 选择一种安装来源，以保持发现与更新状态一致。

从旧版升级到 0.7.0 时，将提示词和仓库指令中的 `$documentation` 改为 `$writing-style`；直接读取技能源码的相对路径也随目录名更新。

## 安装 standalone Skills

```bash
npx skills add Diluka/adaptive-development-skills
```

## 安装 Codex Plugin

Plugin 复用仓库根目录的同一份 `skills/`：

```bash
codex plugin marketplace add Diluka/adaptive-development-skills --ref main
codex plugin add adaptive-development-skills@adaptive-development-skills
```

安装后启动新任务，让 Codex 载入 Plugin Skills。marketplace 将 Plugin 标记为 `AVAILABLE`，由用户按需选择安装。

## 在 VS Code 中安装 Copilot 插件

仓库以 VS Code Agent plugins（预览）格式复用同一份 `skills/`，提供 Skills。

两种安装方式：

- 从源码安装：命令面板运行 `Chat: Install Plugin From Source`，输入
  `https://github.com/Diluka/adaptive-development-skills`。
- 作为 marketplace：在用户 `settings.json` 中设置
  `"chat.plugins.marketplaces": ["Diluka/adaptive-development-skills"]`，然后在扩展视图搜索
  `@agentPlugins` 安装 `adaptive-development-skills`。

确保 VS Code 已启用 Agent plugins（设置 `chat.plugins.enabled`，默认开启）。
