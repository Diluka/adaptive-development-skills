---
name: using-git-worktrees
description: Use when 用户要求 Git worktree，现有工作区有不可混入的改动，多个分支需要同时检出，或并行开发需要隔离 Git 状态和文件所有权
---

# Git Worktrees

## 目标

用独立工作目录隔离分支、索引和文件改动，同时保留共享 Git 仓库。创建工作树不自动授权创建分支、移动现有改动、提交、推送或清理；这些结果服从用户与目标仓库的安排。

多个工作树只隔离工作目录、索引和检出状态。对象库、远端引用、仓库配置、hooks、`refs/stash`、端口、进程、数据库和外部服务仍然共享，需要分别协调。

准备并行开发时读取 [resources/parallel-development.md](resources/parallel-development.md)。

## 先检查现状

```bash
git rev-parse --show-toplevel
git rev-parse --git-dir
git rev-parse --git-common-dir
git rev-parse --verify HEAD
git branch --show-current
git status --short
git worktree list --porcelain
```

根据仓库说明、远端元数据和用户目标确认基点、目标分支、现有工作树归属和未提交改动。当前已经位于目标分支的关联工作树时直接复用。目标分支属于其他任务或归属不明时保持原状。

未提交改动不会自动进入新工作树。任务依赖这些改动时，先确认安全搬移方式；保留用户状态，不用隐式 stash、临时提交、重置或复制来制造干净基线。

## 选择位置

优先使用用户、执行环境和目标仓库指定的位置。没有约定时，使用根工作树下的 `<repo>/.worktrees/<name>`，并先确认该目录已被仓库的本地或版本化规则忽略：

```bash
git check-ignore -q --no-index .worktrees/
```

忽略规则属于当前任务范围时再添加；否则报告需要的最小配置。当前已位于关联工作树时，从 `git worktree list --porcelain` 解析根工作树，不创建嵌套工作树。

## 创建或复用

新分支使用已经核实的基点：

```bash
git worktree add -b <branch> <path> <base>
```

已有分支先确认未被其他工作树占用，再使用：

```bash
git worktree add <path> <branch>
```

当前 `HEAD` 不可解析时，先检查其他 refs 是否存在可用基点。只有确认仓库没有可用提交、目标确实需要未出生分支，且当前 Git 支持时，才按用户意图使用 `git worktree add --orphan`。

创建失败时保留原状态并报告准确错误，不使用 `--force`、分支重置、删除其他工作树或切回根目录绕过隔离。

## 创建后核对

1. 确认目标路径、分支或 detached HEAD、基点、上游和状态符合预期。
2. 阅读新工作区的仓库说明，安装或验证只执行当前任务需要的步骤。
3. 并行工作明确文件、生成物和外部运行资源的所有权，最后串行集成共享结果。
4. 报告工作树路径和分支。移除前确认对应工作已交接，且没有会丢失的未提交内容。
