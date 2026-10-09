# Adaptive Development Skills

一套面向 Codex 等编程代理的开发技能包。用户通常从一句话需求开始；技能帮助代理根据**当前事实与授权**选择下一步，而不是要求用户先提供正式规格，或向代理复述它已经掌握的标准方法。

技能只收录**模型容易判断错、且错了代价大**的内容：静态搜索查不到调用方不等于死代码、外部行为以实际安装版本为准、正式环境禁写、评审必须独立、交付范围按可逆性决定。通用开发方法论（怎么追调用方、怎么写测试、怎么做 spike、怎么读迁移指南）不重复收录。

## 安装

支持 standalone Skills、Codex Plugin、VS Code Copilot 插件三种安装方式。详见 [安装文档](docs/installation.md)。

## 技能目录

| 技能 | 用途 |
|---|---|
| `adaptive-development-workflow` | 唯一根入口：从短需求选择下一步，并按可逆性决定交付动作 |
| `code-and-contract-safety` | 外部契约、死代码判定、正式环境禁写、评审独立性与证据独立性 |
| `delegation-and-isolation` | 委派、并行独立性判断与工作树隔离边界 |
| `finishing-a-development-branch` | 提交、推送、MR/PR 与 CI 等待的交付边界 |
| `documentation` | 文档确为交付物时按读者问题维护，不为普通任务预造规格 |

## 其他思想来源

- [obra/superpowers](https://github.com/obra/superpowers)
- [lzj960515/codex-workbench](https://github.com/lzj960515/codex-workbench)
- [lzj960515/codrive](https://github.com/lzj960515/codrive)
