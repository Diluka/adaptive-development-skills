---
name: finishing-a-development-branch
description: Use when 用户要求提交、推送、创建 PR/MR、同步目标分支、合并或清理开发分支，需要核对精确差异、验证状态和远端结果
---

# Finishing a Development Branch

## 目标

把已经完成的变更交付到用户指定的 Git 阶段，并准确区分本地修改、提交、推送、PR/MR、合并、发布和部署。执行一个阶段不自动授权后续阶段。

## 确认范围与就绪状态

```bash
git status --short --branch
git branch --show-current
git remote -v
git worktree list --porcelain
```

根据仓库说明、跟踪关系和用户意图确定目标分支与远端，不硬编码 `main`、`master` 或托管平台。已有基点时检查完整交付范围：

```bash
git merge-base HEAD <target-branch>
git log --oneline --decorate <merge-base>..HEAD
git diff --stat <merge-base>..HEAD
```

使用 [verification-before-completion](../verification-before-completion/SKILL.md) 核对准备声明的结果。范围内未提交改动不会进入提交、推送或 PR/MR；只暂存用户要求交付的文件，并保留其他改动。

## 同步与冲突

先读取目标分支新增内容和实际冲突文件，再按双方业务语义解决。机械文档或 metadata 冲突可用差异审阅和结构检查证明；运行代码、公共契约、依赖或生成结果重叠时，补覆盖交互的定向检查。同步方式服从仓库策略，不自动 pull、rebase、merge 或 force push。

## 执行指定阶段

- **提交**：遵循仓库提交规范，预览暂存差异并记录实际提交。
- **推送**：核对目标远端、分支和 upstream；成功后读回远端引用。
- **PR/MR**：使用实际托管平台与模板，正文准确说明目标、差异、验证和剩余风险。
- **合并**：确认必要检查和用户授权，再使用仓库允许的合并策略并验证目标分支结果。
- **清理**：确认工作已交接且没有未提交内容，再移除精确工作树或分支。

版本发布、制品发布、部署、正式环境写入和权限修改属于各自独立操作，只在用户明确要求时执行。

## 报告

分别说明本地差异、提交、远端分支、PR/MR、合并和清理的实际状态。命令失败或用户只授权到某一阶段时，准确停在对应状态，不把未执行阶段描述为完成。
