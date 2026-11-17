# Adaptive Development Skills

一套面向 Codex 等编程代理的开发技能包。用户通常从一句话需求开始；技能帮助代理结合**当前事实与授权**选择下一步，并把补充信息聚焦在真正影响行动的决定上。

技能聚焦**模型容易判断错、且判断失误代价大**的经验：静态搜索需结合动态调用证据、外部行为以实际安装版本为准、正式环境数据源保持只读、评审保持独立、交付尊重用户当前任务的明确要求。通用开发方法论（怎么追调用方、怎么写测试、怎么做 spike、怎么读迁移指南）由代理已有能力承担。

## 安装

支持 standalone Skills、Codex Plugin、VS Code Copilot 插件三种安装方式。详见 [安装文档](docs/installation.md)。

## 技能目录

| 技能 | 用途 |
|---|---|
| [`requirements-discussion`](skills/requirements-discussion/SKILL.md) | 按需讨论待定需求与取舍，将共识交回现有流程 |
| [`task-contract`](skills/task-contract/SKILL.md) | 开发任务范围、约束、授权、验证、退役清理与交付 |
| `documentation` | 项目文本作为交付物时按载体与事实来源维护，涵盖文档、产品文案、代码注释、协作记录与沟通 |

## 其他思想来源

- [obra/superpowers](https://github.com/obra/superpowers)
- [lzj960515/codex-workbench](https://github.com/lzj960515/codex-workbench)
- [lzj960515/codrive](https://github.com/lzj960515/codrive)
- [Claude Code Worktrees](https://code.claude.com/docs/en/worktrees)
