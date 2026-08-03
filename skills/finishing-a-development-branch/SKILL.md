---
name: finishing-a-development-branch
description: Use when 实现准备进入 Git 分支或工作树交接，需要检查验证与独立评审状态，并决定 PR/MR、合并、推送、保留或清理方式
---

# Finishing a Development Branch：安全交接分支

## 核心原则

明确决定分支集成和清理方式。完成实现不会自动授权拉取、推送、合并、删除分支或移除工作树。

## 确认状态

```bash
git status --short --branch
git branch --show-current
git remote -v
git worktree list --porcelain
```

根据仓库说明、跟踪关系和用户意图确定目标分支，不从硬编码名称猜测。已有有效基点时获取完整集成范围：

```bash
git merge-base HEAD <target-branch>
git log --oneline --decorate <merge-base>..HEAD
git diff --stat <merge-base>..HEAD
```

确认目标、基点、待集成提交、未提交改动、远端跟踪和工作树关系。使用 [verification-before-completion](../verification-before-completion/SKILL.md) 核对最终版本的相关验证与独立评审；评审后又修改项目产物时，就绪状态失效，必须重新验证和复审。

范围内未提交改动不会进入提交、PR/MR、推送或合并结果；未经授权和提交，不得声称它们已交付。只执行已完成开发的交付操作不会创建新开发任务或重复评审，但原版本的验证和评审缺口仍会阻止就绪。

## 提供适用选项

1. 保留分支和工作树，稍后继续。
2. 准备 PR/MR，或在明确授权后创建；内容包含目标、差异、验证和风险。
3. 用户明确要求时推送分支。
4. 仓库策略、验证和独立评审满足且用户明确要求时合并。
5. 集成完成、无未提交工作且用户授权时移除精确工作树或分支。

只提供当前可用选项，并说明各自的外部变更。检查就绪状态不自动授权执行。

## 精确执行

- 遵循当前仓库工作流，不硬编码托管平台专用 CLI、API 或字段。
- 措辞重要时先预览 PR/MR 标题、正文和目标分支。
- 不自动拉取或变基；先展示分叉及影响。
- 不强制推送、破坏性重置、宽泛删除分支或移除工作树。
- 执行后验证实际 PR/MR、Git 状态、推送、合并或清理结果。
- 保留无关未提交文件，不为制造整洁状态而清理或暂存。
