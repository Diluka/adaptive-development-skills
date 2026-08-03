---
name: using-git-worktrees
description: Use when 高风险 Git 历史操作、并行分支或版本隔离、目标文件与现有改动重叠，或用户或仓库明确要求隔离工作树
---

# Using Git Worktrees：按风险建立隔离

## 核心原则

只有隔离能降低具体 Git、版本或并发风险时才创建工作树。任意未提交改动本身不是隔离理由；干净、低风险且无冲突的工作继续使用当前工作区。

## 判断是否需要

适用场景包括高风险历史操作、大型迁移或冲突解决；不同分支或依赖的并行工作；目标文件与现有改动重叠；验证另一个分支或版本；以及用户或仓库明确要求。

## 创建前检查

```bash
git rev-parse --show-toplevel
git rev-parse --git-dir
git rev-parse --git-common-dir
git rev-parse --show-superproject-working-tree
git branch --show-current
git status --short
git worktree list --porcelain
```

Git 目录与公共目录不同时，当前工作区通常已是关联工作树。它仍可创建同级工作树，但不得把新目标放在当前关联工作树目录内；用 `git worktree list --porcelain` 确认目标分支未在其他位置检出。

没有初始提交的仓库无法提供工作树基点。继续使用当前工作区，除非用户明确要求，否则不为创建工作树自动生成提交。

## 选择位置并创建

优先遵循仓库说明。主工作树可使用 `<repo>/.worktrees/<name>`；关联工作树优先使用仓库指定的同级目录或从主工作树解析目标。

在承载 `.worktrees/` 的工作树根目录确认忽略规则：

```bash
git check-ignore -q --no-index .worktrees/
```

未被忽略时，只有仓库配置属于当前范围才添加精确规则，不静默提交。优先使用执行环境的原生工作树能力；否则以明确分支和解析后的路径运行 `git worktree add`，不从未检查变量或宽泛路径推导目标。

## 创建后

1. 确认路径、分支或分离 HEAD 状态及干净状态。
2. 阅读新工作区的仓库说明。
3. 开发任务读取协调工作树中的计划绝对路径，不复制计划；非开发调查读取共享目标和证据边界。
4. 只执行任务需要且已授权的准备。不要自动安装依赖、运行全量测试、提交、拉取、推送、合并或删除其他工作树。
5. 条件具备时运行能区分新回归与基线失败的最小检查；缺依赖时报告限制。

报告工作树路径和分支。集成与移除交给 [finishing-a-development-branch](../finishing-a-development-branch/SKILL.md) 或用户明确请求；删除前确认没有会丢失的未提交工作。
