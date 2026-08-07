---
name: choosing-tests
description: Use when 需要为开发工作单元选择测试方式，判断端到端、单元、属性或契约测试等手段是否合适，或评估现有测试组合是否已覆盖当前风险
---

# 选择测试方式

## 核心原则

按任务形状、真实调用方、风险和证据缺口，以最少能拒绝合理错误的测试决定是否测试及其方式，不按习惯或仪式。任务级别见 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md)。

## 类型能证明的部分

类型能排除的稳定不变量不另测；只验证类型无法证明的算法、副作用、并发、性能和概率性风险，见 [type-driven-design](../type-driven-design/SKILL.md)。

## 按任务形状选择

| 开发内容 | 首选测试方式 |
|---|---|
| 接口、API 或完整用户流程 | 端到端测试：在真实入口验收；仅为定位或独立失效面补单元测试 |
| 算法、解析器、状态机等广泛输入空间 | [property-based-testing](../property-based-testing/SKILL.md) |
| 跨服务或跨版本的消费者与提供者 | [consumer-driven-contract-testing](../consumer-driven-contract-testing/SKILL.md) |
| 遗留重构、重写、复杂稳定输出或 AI/Agent 等概率性、主观结果 | [baseline-and-eval-testing](../baseline-and-eval-testing/SKILL.md) |
| 已指定的声明式数据、映射、文案、普通字段 | 直接实现并复用现有检查，不需要专门测试；消费这些内容的行为按自身风险另选方式 |
| 可类型化约束 | [type-driven-design](../type-driven-design/SKILL.md)；只补运行时行为 |

## 判断手段与强度

- 只新增判据独立且能拒绝合理错误的测试；强度以此为下限，已有证据覆盖同一风险不重复。
- 结合现有代码、真实接缝和运行成本决定具体手段。能复用真实入口就优先复用，不为人工测试增加生产开关、包装层或公共接口。

## 边界

- 本技能只负责选择测试方式；选中后进入对应技能。
- 证据充分性判断、复用与长期收敛由 [evidence-management](../evidence-management/SKILL.md) 负责。
