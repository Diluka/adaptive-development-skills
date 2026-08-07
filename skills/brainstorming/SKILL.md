---
name: brainstorming
description: Use when 关键歧义、互相竞争的设计选择或不明确的成功标准会实质改变实施方案
---

# Brainstorming：澄清会改变方案的选择

## 核心原则

只澄清现有证据无法回答且会改变方案的不确定性；可核实事实先查，明确要求直接推进。

## 判断与澄清

1. 核对状态、调用方、不变量和依赖，列出证据缺口。
2. 只将会影响公开行为、数据模型、架构、不可逆操作或范围的问题列为选择。
3. 比较真实路径并推荐，不凑伪选项；只问最少缺失决定。
4. 记录选定约束或成功标准，再通过 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md) 推进；有计划写入计划，否则保留在共享目标和约束中。

## 边界

- 缺失的选择会改变用户意图、授权或不可逆取舍时，必须询问用户。
- 不强制创建设计文档或提交。需要长期保存的内容使用 [project-documentation](../project-documentation/SKILL.md)。
- 不把无关的重新设计带入当前范围。
