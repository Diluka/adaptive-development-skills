# 行为基线与评估方法分流

Use when 目标缺少简单唯一断言，需要判断应保护可稳定重放的现有行为，还是评价主观、多解或概率性能力。

这是一项**选法经验**，不是第三种复合测试方法。Characterization / Approval 与 Eval-Driven Development 都会执行、记录和比较，但证据对象、成功语义和核心循环不同：

| 结果形状 | 选择 |
|---|---|
| 现有或复杂行为可从真实入口稳定重放，目标是发现改动前后漂移 | [Characterization / Golden Master / Approval](characterization-and-approval.md) |
| 结果有多种合理答案，质量主观或执行具有概率性，目标是定义并持续改进能力 | [Eval-Driven Development](eval-driven-development.md) |
| 简单确定性行为已有独立稳定判据 | 不使用本资源；回到 `verification-selection.md` 选择明确断言、属性或其他更直接证据 |
| 连什么输出、任务或评价依据能够区分结果都未知 | 先用 [unknown-exploration](../../unknown-exploration/SKILL.md) 调查 |

当前行为、一次候选输出或一次模型评分都不自动成为正确目标。两个结果形状同时存在时，按独立产物和反证边界拆成有依赖的工作单元，再分别加载对应方法；不要因为都需要“比较基线”就把它们合成一个循环。

两种方法产生的都是证据，不自动成为确定性产品契约；证据独立性、复用、失效和长期收敛统一见 [evidence.md](evidence.md)。
