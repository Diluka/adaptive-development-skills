---
name: choosing-tests
description: Use when 需要为开发工作单元选择测试方式，判断端到端、单元测试、TDD、属性测试或契约测试等哪种手段最合适，或评估现有测试组合是否已覆盖当前风险
---

# Choosing Tests：选择测试方式

## 核心原则

测试方式的选择取决于任务形状、真实调用方、回归风险和验证效率，不从流程仪式或既有习惯出发。先按任务级别与证据缺口确认是否需要测试步骤，再选手段与强度；目标是用能拒绝合理错误的最少测试获得可靠反馈。

## 优先级

1. **类型驱动设计优先于测试**：语言特性能把不变量编码为不可表示的非法状态时，不再为此专门编写测试；先落实类型建模，再补运行时证据，见 [type-driven-design](../type-driven-design/SKILL.md)。
2. **测试本身也受类型约束**：类型已排除的场景无需构造；对已转换为可信类型的值，只验证类型无法证明的运行时行为。
3. 类型无法覆盖的算法、副作用、并发、性能与概率性风险，才由测试、契约、观测或评估提供证据。

## 按任务形状选择

| 开发内容 | 首选测试方式 |
|---|---|
| 接口、API 或完整用户流程 | 端到端测试为主：在真实入口验证可观察结果，是最直接的验收手段；单元测试只在端到端无法精确定位失败、存在独立稳定规则或不同失效面时补充 |
| 定义精确、自包含的零件或组件（需求与契约完全明确） | [test-driven-development](../test-driven-development/SKILL.md)：适用场景狭窄，只在能写出准确描述需求的测试时使用；需求模糊或大功能开发不适用 |
| 算法、解析器、状态机等广泛输入空间 | [property-based-testing](../property-based-testing/SKILL.md) |
| 跨服务或跨版本的消费者与提供者 | [consumer-driven-contract-testing](../consumer-driven-contract-testing/SKILL.md) |
| 遗留重构、重写或复杂稳定输出 | [characterization-testing](../characterization-testing/SKILL.md) |
| AI、Agent 或概率性、主观结果 | [eval-driven-development](../eval-driven-development/SKILL.md) |
| 已指定的声明式数据、映射、文案、普通字段 | 直接实现并复用现有检查，不需要专门测试；消费这些内容的行为按自身风险另选方式 |
| 稳定领域状态、协议阶段、权限或单位等可类型化约束 | 由 [type-driven-design](../type-driven-design/SKILL.md) 建模排除非法组合，不再为此专门编写测试；只补类型无法覆盖的运行时行为 |

## 判断手段与强度

- 新增测试前确认判据独立来自需求、真实调用方或契约，且检查能拒绝至少一种合理错误实现。
- 端到端与单元测试不是二选一：端到端覆盖主链路验收；单元测试在端到端无法定位失败、或低层规则有独立失效面时补充。
- 强度以能拒绝当前任务会引入的合理错误为下限，不以覆盖率数字或流程齐全为目标；已有证据覆盖同一风险时不重复增加。
- 结合现有代码、真实接缝和运行成本决定具体手段：能复用真实入口就优先复用，不为人工测试增加生产开关、包装层或公共接口。

## 边界

- 本技能只负责选择测试方式；选中后进入对应技能。
- 证据充分性判断、复用与长期收敛由 [evidence-based-testing](../evidence-based-testing/SKILL.md) 负责。
- 是否需要测试步骤由任务级别与证据缺口决定，见 [adaptive-development-workflow](../adaptive-development-workflow/SKILL.md)。
