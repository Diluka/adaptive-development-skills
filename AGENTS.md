# 仓库规则与当前迭代方向

## 当前迭代：技能包重构（方向舵）

本仓库正处于一次技能包重构迭代。本节为本迭代的设计思想与实现方法的摘要；**目标状态以 `docs/design.md` 为唯一权威源**，长期仓库规则见下文。

### 目标状态（设计思想）

- **结构**：`adaptive-development-workflow` 负责宏观工作流决策，`execution` 负责微观执行决策与落实，标准方法技能 / `execution/resources/` 负责选定后的方法闭环。
- **任务类型 = 侧重点**：讨论 / 调查 / 作业 / 验证（模糊大分类，可交叉）；**工作节点**：讨论 / 调查 / 设计 / 作业 / 验证 / 评审；技能与节点**多对多**（一技能可服务多节点）。
- **Workflow = 做什么与何时转换**（分类、拆分、分级、节点编排、范围与授权）；**Execution = 具体怎么做**（开发、调查、验证、评审、文档、交付方法和执行机制选择，证据判断与执行反馈）。
- **原则**：
  - **命名优先**：技能名（含 `agents/openai.yaml` 的 `display_name`）是对事物最高度的概括，比简介更重要。
  - **独立 / 合并判据**：问题能否清晰定位到该技能——能则独立；不能则合并为「决策 + 方法集合」（被合并方法作 `resources/` 资源）。
  - **加载策略**：简单方法可直接提及；复杂方法经决策确定适用后再按需读取，避免污染上下文。
  - **宁少勿滥**：不过度设计（不预堆砌、不设无收益宽泛技能），但**不用于砍掉已详实完善的内容**。
  - **分层职责**：Workflow 只负责宏观编排；Execution 是唯一微观选法入口；标准方法只讲选定后「怎么做」，不承担跨方法路由。

### 实现方法

- 以 `docs/design.md` §5.1 目标技能清单为基准，现有技能**逐个映射**：复用 / 调整 / 拆分 / 合并 / 删除 / 补充。
- 已决策项（旧名仅作来源，现行结构以 `docs/design.md` §5 为唯一权威源）：`choosing-tests` 的验证选择、`evidence-management` 的证据经验、`baseline-and-eval-testing` 的两个成熟方法迁入 `execution/resources/`；`executing-plans` → `execution`；合并 `subagent-driven-development` + `dispatching-parallel-agents` → `agent-and-parallel-dispatch`；合并 `writing-plans` + `project-documentation` → `documentation`。
- Workflow 的 `resources/` 只保留宏观节点路由与术语；具体方法、验证、证据和机制选择集中到 `execution/resources/`，独立方法正文收敛为选定后「怎么做」。
- 依据 `.docs/plans/method-review.md`（42 条改进点 + 二次评审合并判定）与 `.docs/plans/node-skill-allocation.md` 逐技能实施。
- 分批实施、定向验证、独立评审，按任务复杂度分级。

## 工作范围

- Git 仓库是唯一 Skill 源码；不编辑运行时安装副本，只改当前任务文件并保留无关改动。
- 默认 Git 交付的开发分支，除非另有约定，放在 `<repo>/.worktrees/<name>`；只读审查可在能保持或恢复默认基线的位置进行。
- 只读 lint/format 可覆盖必要范围。自动修复只及任务改动行；不能行级时扩大到最小语法单元或受影响文件，并移除无关差异。
- 根代理控制任务级流程；其他代理不得擅自发起或转派由根代理控制的任务级工作单元、计划、评审和交付。委派说明明确授予局部编排权时，执行者可以在原单元的范围与授权内继续派发更小的执行单元，并负责回收结果。

## 文本内容维护

- 创建、组织、改写、修订或维护本仓库文本内容前，必须完整读取并遵循源码 [`skills/documentation/SKILL.md`](skills/documentation/SKILL.md)，并按文档形态读取其指向的资源。至少包括根 `README.md`、`AGENTS.md`、`docs/` 与 `skills/` 中的 Markdown 正文。

## 开发任务与工作单元

- 需要保留、集成或交付的代码、配置、依赖、测试、脚本、技能、工作流或正式文档变更是开发任务；只交付事实或证据的调查不是，即使使用可丢弃实验。是否写代码、改文件或只读不是判据。
- 临时产物须隔离且可丢弃；结束时检查依赖、锁文件、配置、生成物和工作区。保留实验或落实调查结论时，停止扩展实验，由 Workflow 建立并重新分级开发单元，再由 Execution 选法。
- 同时要求调查和实现时，整体仍是开发任务。调查只交付证据；正式变更即使已获授权也要新建开发单元、重新路由。只交付既有成果的提交、推送、PR/MR 或部署不另成开发任务。
- 开发变更默认按实际 `git remote` 和仓库约定完成分支、提交、推送及 GitLab MR/GitHub PR；用户可逐项收窄，非开发任务不产生 Git 交付。
- 默认交付止于 MR/PR；合并、发布、部署、正式环境写入、权限和其他高影响操作须明确授权。

## 任务分级

- 按当前增量的行为、契约、影响、未知、可逆性、副作用和证据分级，不继承父任务或 PR/MR 的复杂度；从最低充分级别开始，随事实升降。

- **微小任务**：目标明确、修改局部可逆、不改变运行行为或公共契约、不涉及依赖、生成规则、权限或产物自身的外部副作用，并能直接检查结果。直接实现、审阅差异、运行必要的直接检查并简要总结；不落盘计划，不派独立评审。
- **常规任务**：包含边界明确的行为或配置变化，或者需要若干相关步骤，但没有高风险或重大不确定性。计划、实现委派和独立评审都按协调成本、证据收益和回归风险决定；使用覆盖受影响路径的定向验证。
- **复杂或高风险任务**：涉及跨模块或公共契约、架构与依赖迁移、安全、身份、资金、数据、并发、破坏性或难回退操作、正式环境、显著未知，或者需要多代理共享状态。必须落盘计划并完成独立评审，按风险增加验证、专项评审和回退安排。

- 计划、确认、委派、测试、评审和交付只在能覆盖现有证据未覆盖的合理错误时使用；远端引用变化不自动提高内容风险。

## 计划与协作

- 已授权、无关键歧义且风险受控时，计划是执行依据，不是二次批准。偏离已授权行为、范围或交付，关键歧义，高风险/难回退，正式环境或非普通 Git 外写，权限扩大或新增副作用时先确认。
- 新事实不改变目标、范围、行为、交付、授权或副作用时，告知后继续；否则暂停受影响路径并确认。
- 多会话协同时，纳入协调流程并明确收到派发任务的工作会话必须向直接投放任务的上级会话回报终态；只有上级会话明确声明“任务管理权已移交且无需回复”时例外，局部编排权不构成该声明。临时会话（侧边会话）不适用这一默认回报义务，按用户安排执行。

## 委派与独立评审

- 仅在边界清晰且收益高于交接成本时委派；根代理持有需求、范围、授权、写入、跨单元决策、集成和最终结论。
- 微小任务不做最终独立评审；常规任务只补定向验证未覆盖的风险；复杂任务由未参与实现、证据设计或相关差异修改者审阅完整最终差异。
- 评审者只读需求、计划、完整差异和最新证据，按严重性报告文件和行号；不得修改，也不得擅自转派评审或发起其他任务级流程。实质修改只使受影响评审失效。
- 自查、已有评审、PR/MR 评审、CI 和运行时验证不能互相冒充。非开发或无独立收益时不强制评审；复杂调查可按收益审查。单元外问题只回报最小证据；没有可用独立评审者时，只阻止本来需要评审的完成声明。

## 方法、测试与证据

- 每个调查或开发单元只选一个主要方法；交付和生命周期支持按需叠加。选定方法保留标准核心循环：TDD 的 Red → Green → Refactor、SDD 的 Requirements/Design/Tasks/Implement、BDD 的 Discovery/Formulation/Automation，以及其他专项方法的独立闭环。
- 调查只交付可追溯事实；长期测试、契约、文档或实现都作为新的开发单元重新路由。交付方法不替代功能证据，也不扩大默认授权。
- 需求、不变量、真实调用方和契约高于实现、测试与流程；冲突时修正违反者。
- 替身只用于时钟、网络、进程等真实外部边界。不为测试增加生产开关、包装、回退、分支或公共接口；不镜像实现或普通字面量，外部契约除外。
- TDD 仅用于有独立稳定判据、真实接缝和回归风险的确定性行为；类型驱动设计仅在类型建模可排除稳定非法状态且有独立收益时使用。不可信输入仍须运行时解析。
- 快照来自稳定真实输出，更新须审阅。主观或概率结果用代表任务、评价标准、实验、冒烟或独立评估；已确认稳定不变量才转长期测试。
- 复用仍覆盖相同输入、环境、版本、路径和风险的证据；最终集成 CI 是组合证据。结构检查和代理模拟只证明有限范围。
- 开发和审查期间不得写入、修改、删除或迁移正式环境数据源。

## 技能编写

- **技能包结构**：`adaptive-development-workflow`（唯一宏观决策入口）+ `execution`（唯一微观决策与执行入口，含按需 `resources/`）+ 独立方法 / 机制技能；技能↔节点多对多。
- **独立 / 资源判据**：问题可清晰定位、有稳定直接触发和独立闭环，且发现 / 加载收益高于入口成本时独立；跨方法路由、横切经验或需先判断工作单元形状的方法集合归 `execution/resources/`。成熟详实不等于必须独立，资源化不得删减方法内核。
- **加载策略**：简单方法可直接提及；复杂方法经决策确定适用后再按需读取其说明，避免污染上下文；触发描述应足以判断是否读取全文。
- 每个技能位于 `skills/<skill-name>/SKILL.md`，目录与 `name` 为相同的英文短横线名；`resources/` 存放随技能安装、按需读取的纯 Markdown 参考。
- `description` 以 `Use when` 开头，用中英描述触发条件，不概述流程；触发描述应足以让代理判断是否需要读取全文（配合加载策略）。正文以中文为主；术语规则集中在 `skills/adaptive-development-workflow/resources/terminology.md`。
- **命名优先**：技能命名（含 `agents/openai.yaml` 的 `display_name`）是对事物最高度的概括，比简介更重要——先取一个能涵盖同类能力的好名字，再写简介与正文。
- 写简洁、正面的决策规则。范围优先由目标、交付物、约束和验收正向界定；只有在用户明确否决相关方案，或相邻方案可能被合理误解为范围内且会改变实施、验收、授权或契约/兼容性判断时，才记录具体排除边界。计划、验证、评审、工作树、TDD、委派和默认交付按单元、风险、证据和授权决定；反面表述仅用于必要禁止。
- `adaptive-development-workflow` 负责分类、拆分、分级、节点编排与转换；`execution` 负责选法、证据与机制并执行。用户直调标准方法时由该方法自行核验，标准方法维护自己的核心循环和边界。
- `verification-before-completion` 保持独立：它核对完成声明与节点转换就绪状态，不负责选择验证手段。证据充分性、复用、失效与收敛由 `execution/resources/evidence.md` 承担，不是其他方法的必经门。
- 只收录通用开发方法；不增加生态、框架或业务手册，也不写托管平台专用 CLI/API/字段。不设宽泛静态验证技能；静态编译 / 分析作为 `execution` 的证据类型，只有实际模型检查或证明需求才考虑形式化验证。
- 修改技能后，用当前 `skill-creator` 的 `scripts/quick_validate.py` 校验；技能链接用相对 Markdown，并运行 `scripts/check-cross-references.ts`。思想来源只在 `README.md` 底部列出来源链接，不说明具体引用、借鉴或吸收内容；只参考聚合仓库内某个插件、技能或其他独立单元时链接该具体单元，整体作为全面参考对象时链接仓库根；不追踪、同步上游或承担上游兼容义务。

## Plugin 与 Hook 发行

- `skills/` 是 standalone `npx skills` 与可选 Codex Plugin 的唯一源码，不为 Plugin 复制、搬迁或生成第二份 Skill。Skill 不引用、依赖或要求 Hook；Hook 不含具体 Skill 方法或触发逻辑。
- Hook 仅随可选 Plugin 分发；standalone 不依赖 Plugin、marketplace 或 Hook。改 Plugin/Hook 时保留显式可选安装和独立信任审阅，并证明 Hook 未进入 standalone 安装。
- 可写状态仅限 launcher 派生的 Plugin 临时子目录，经 `TASK_HANDOFF_DATA` 传递；Deno 仅获该目录读写。脚本用 `PLUGIN_ROOT` 定位，不写项目临时目录、不硬编码安装路径、不解析未承诺的 transcript 格式。
- 通过获准子进程读项目元数据前，确认命令不会触发 Git hook、filter、helper 或其他外部进程；Deno 的 `--allow-run` 不会继续沙箱化子进程。
- 生产脚本（仅 `hooks/` 下需在 Deno 与 Node 双运行时运行的脚本）只用 Deno 2 与 Node 24 共用的 Node 内置 API；`scripts/` 下的仓库内部工具不受此限。launcher 优先 Deno，仅在找不到 `deno` 时回退 Node；选中运行时失败不得再换运行时。Node fallback 的子进程、环境和网络权限更宽；改入口或权限时同时审两条路径。Windows 的 `commandWindows` 显式用 `cmd.exe` 执行 `.cmd`。
- `hooks/codex-hook-types.ts` 以当前最低核对 Codex 版本的生成 schema 约束 stdin 与逐事件 stdout。改事件、字段或支持版本时先更新类型边界，再用 `deno check`；脚本测试只证明自身逻辑，每个已配置 Hook 保留一个代表性测试，不以人工事件镜像重复类型约束，也不称为 Codex 集成测试。
- 发布 Plugin 仅用 `scripts/bump-version.ts <major|minor|patch|x.y.z>` 同步 Codex、Copilot manifest 与 marketplace。Git marketplace 用户通过 `codex plugin marketplace upgrade` 获取新快照；本地验证按 `plugin-creator` 的 cachebuster 和重装流程，不把同版本缓存覆盖当发行契约。

## 完成检查

微小文档改动只运行能直接证明结果的检查和 `git diff --check`。创建或修改单个技能时，用当前 `skill-creator` 校验受影响技能；修改共享入口、生命周期规则或技能间引用时运行以下完整检查：

```bash
skill_creator_dir="${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-creator"
for skill_dir in skills/*; do
  python3 "$skill_creator_dir/scripts/quick_validate.py" "$skill_dir" || exit 1
done
deno check scripts/check-cross-references.ts
scripts/check-cross-references.ts
git diff --check
```

修改 Plugin 或 Hook 时，另运行：

```bash
scripts/bump-version.ts --check
deno fmt --check scripts/bump-version.ts
deno lint --no-config scripts/bump-version.ts
deno check --no-config --no-lock --no-remote scripts/bump-version.ts
deno fmt --check hooks/codex-hook-types.ts hooks/task-handoff.ts hooks/tests/task-handoff.test.ts
deno lint --no-config hooks/codex-hook-types.ts hooks/task-handoff.ts hooks/tests/task-handoff.test.ts
deno check --no-config --no-lock --no-npm --no-remote hooks/codex-hook-types.ts hooks/task-handoff.ts
node --check hooks/codex-hook-types.ts && node --check hooks/task-handoff.ts
sh -n hooks/run-task-handoff.sh
test -x hooks/run-task-handoff.sh
deno test --no-config --no-lock --no-npm --no-remote --allow-read --allow-write --allow-run=deno hooks/tests/task-handoff.test.ts
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/plugin-creator/scripts/validate_plugin.py" .
```

Hook CI 固定使用 Deno 2.9.4、Node 24.15.0 和 Codex CLI 0.146.1。

- Ubuntu 运行上述静态检查、现有四个 Hook 测试、真实 Deno/Node launcher 冒烟和一次临时 `CODEX_HOME` Plugin 安装校验。
- Windows 同时从 PowerShell 外层和 `cmd.exe` 外层执行 `.cmd`，覆盖 Deno 优先、Node fallback、stdin/stdout、检查点以及 `.cmd` 退出码透传。
- 它们是脚本与 Plugin 的运行时冒烟，不是 Codex 压缩集成测试。
