---
name: test-driven-development
description: Use when 明确行为变更或缺陷修复存在稳定且符合生产调用方式的测试接缝，且 TDD 能实质降低当前工作单元风险
---

# Test-Driven Development：以真实行为驱动实现

## 核心原则

用失败行为测试证明实现尚未满足已知需求。以下条件是 TDD 的适用前提，不是满足即必须使用的充分条件；只在它能实质降低当前工作单元风险时选择。

## 检查前提

- 将新增代码或改变行为；
- 必需结果或不变量明确；
- 真实调用方会使用被测试的输入和输出；
- 接缝保留待改变行为；
- 失败具有确定性并能指导实现。

缺少前提时改用更合适的方法：删除用 [caller-driven-cleanup](../caller-driven-cleanup/SKILL.md)，外部契约未知用 [contract-verification](../contract-verification/SKILL.md)，根因未知用 [systematic-debugging](../systematic-debugging/SKILL.md)，可行性未知用 [technical-spike](../technical-spike/SKILL.md)。

## TDD 循环

1. 写明一个必需的可观察行为及其真实调用方。
2. 在保留该行为的最低测试接缝编写最小测试。
3. 确认测试因目标行为缺失而失败，而不是准备过程、过时假设或无关错误。
4. 只实现满足需求所需的最小生产行为。
5. 运行定向测试和相关相邻检查。
6. 在已验证行为保持通过时重构。

实现前已经通过的测试不能证明目标行为缺失；因错误原因失败时先修正测试或环境。行为保持型重构在旧实现上通过的核心行为基线不属于 TDD 红灯，由 [evidence-based-testing](../evidence-based-testing/SKILL.md) 建立并在重构后重复验证。

## 保持接缝真实

接缝必须符合真实调用方式并保留待改变行为；只模拟时钟、网络、进程、随机性或不可用外部服务等真实外部边界。不要为测试添加生产开关、包装层、回退分支或公共方法。

测试与实现冲突、序列化或框架边界可能被模拟掉时，使用 [evidence-based-testing](../evidence-based-testing/SKILL.md) 核验后再决定修改哪一边。
