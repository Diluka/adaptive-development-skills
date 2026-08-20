# 仓库规则与当前迭代方向

## 当前迭代：技能包重构（方向舵）

本仓库正处于一次技能包重构迭代。本节为本迭代的设计思想与实现方法的摘要；**目标状态以 `docs/design.md` 为唯一权威源**，长期仓库规则见下文。

### 目标状态（设计思想）

- **结构**：`adaptive-development-workflow` 说明工作节点（讨论 / 调查 / 设计 / 作业 / 验证 / 评审）是什么与各自规矩；`execution` 提供执行循环与方法名录；独立机制技能（git 工作树、评审、交付、文档等）负责选定后的方法闭环。
- **放权原则**：技能提供「方法目录 + 规矩」，不教代理如何决策。所有工作节点与方法都是可选的，选中就要按规矩办事；何时进入哪个节点、选择哪个方法，由代理根据任务实际情况临场发挥，技能不预设「什么情况必须/不能做什么」。
- **经验沉淀**：公开标准方法（测试驱动开发 Test-Driven Development、行为驱动开发 Behavior-Driven Development、属性测试、契约测试、主干开发等）AI 预训练已覆盖，只提完整名字与一句话适用，不复述标准流程；仓库踩坑换来的判据与红线（动态调用方清单、实际安装版本优先、评审必须独立、正式环境禁写等）必须保留——这是技能包不可替代的价值。
- **缩写规则**：方法名 / 技能名一律全称，不写缩写（防止缩写歧义，如 TDD 同时是 Test-Driven Development 与 Type-Driven Design 的缩写）。有歧义的方法缩写（SDD、BDD 等）在每个文件首次出现处写「完整中文名 + 英文全称 + 缩写 + 声明后续使用缩写」，每个文件独立声明，不跨文件继承；无歧义的通用技术词（API、CLI、SDK 等）不声明。

### 实现方法

- 以 `docs/design.md` 为唯一权威源，现有技能逐个映射：复用 / 调整 / 拆分 / 合并 / 删除 / 补充。
- 已决策项：公开方法删独立入口并入 `execution` 方法名录（系统化调试、基于属性的测试、消费者驱动契约测试、规格驱动开发、行为驱动开发、类型驱动设计、特征化 / 黄金主 / 批准测试、评估驱动开发）；头脑风暴并入 workflow 讨论节点；`node-routing.md`、`terminology.md`、`method-selection.md` 已删除。
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
- 普通 Git 交付包含创建 MR/PR、立即回报链接与当前 CI 状态，并等待最终推送提交的所有自动任务进入成功、失败或取消终态；手动可选任务不阻塞，流水线内自动 review 环境任务参与等待。合并、发布、主动环境变更、正式环境部署、正式环境写入、权限和其他高影响操作须明确授权。

## 任务分级

- 按当前增量的行为、契约、影响、未知、可逆性、副作用和证据选择与风险相称的最简工作方式，不继承父任务或 PR/MR 的复杂度；从最低充分级别开始，随事实升降。风险越高，越要保留落盘计划、验证与独立评审等证据；风险低时直接执行并做必要检查。复杂度只由任务交付内容决定；代理数、会话数、工作树、计划篇幅、验证数量和协作方式属于执行机制。

## 计划与协作

- 计划只承载已经完成选择的内容。影响用户可见行为、公共契约、架构边界或风险的候选先完成选择；多步骤工作最多维护简短执行清单。
- 已授权、无关键歧义且风险受控时，计划是执行依据，不是二次批准。偏离已授权行为、范围或交付，关键歧义，高风险/难回退，正式环境或非普通 Git 外写，权限扩大或新增副作用时先确认。
- 新事实不改变目标、范围、行为、交付、授权或副作用时，告知后继续；否则暂停受影响路径并确认。
- 多会话协同时，纳入协调流程并明确收到派发任务的工作会话必须向直接投放任务的上级会话回报终态；只有上级会话明确声明“任务管理权已移交且无需回复”时例外，局部编排权不构成该声明。临时会话（侧边会话）不适用这一默认回报义务，按用户安排执行。

## 委派与独立评审

- 仅在边界清晰且收益高于交接成本时委派；根代理持有需求、范围、授权、写入、跨单元决策、集成和最终结论。
- 评审者必须独立于实现、证据设计与差异修改（不能自审），只读需求、计划、完整差异和最新证据，按严重性报告文件和行号；不得修改，也不得擅自转派评审或发起其他任务级流程。实质修改只使受影响评审失效。
- 自查、已有评审、PR/MR 评审、CI 和运行时验证不能互相冒充。没有可用独立评审者时，只阻止本来需要评审的完成声明。

## 方法、测试与证据

- 可实施逻辑追溯到明确需求、真实调用方、已核验契约、已观察问题，或通过 Execution 统一门禁的必要技术前置。
- 每个调查或开发单元只选一个主要方法；交付和生命周期支持按需叠加。选定方法保留标准核心循环。
- 调查只交付可追溯事实；长期测试、契约、文档或实现都作为新的开发单元重新路由。交付方法不替代功能证据，也不扩大默认授权。
- 需求、不变量、真实调用方和契约高于实现、测试与流程；冲突时修正违反者。
- 替身只用于时钟、网络、进程等真实外部边界。不为测试增加生产开关、包装、回退、分支或公共接口；不镜像实现或普通字面量，外部契约除外。
- 有可靠静态类型时，优先在当前开发单元内用类型表达稳定不变量；这项设计原则不要求独立工作单元。只主张当前工具链真实证明的约束，不可信输入仍须运行时解析，已由类型证明的约束不再用运行时测试重复。
- 快照来自稳定真实输出，更新须审阅。主观或概率结果用代表任务、评价标准、实验、冒烟或独立评估；已确认稳定不变量才转长期测试。
- 复用仍覆盖相同输入、环境、版本、路径和风险的证据；最终集成 CI 是组合证据。结构检查和代理模拟只证明有限范围。
- 验证默认从真实消费或激活路径直接证明需求明确提及的正常场景，再执行适用于当前增量的仓库强制检查。主动追加的类型检查、构建、更多测试、完整 CI 或评审各自覆盖具体未证风险；证据足以支撑当前交付声明后停止追加。
- 开发和审查期间不得写入、修改、删除或迁移正式环境数据源。

## 技能编写

- **技能包结构**：`adaptive-development-workflow`（节点定义 + 规矩）+ `execution`（执行循环 + 方法名录，含按需 `resources/`）+ 独立机制技能。
- **放权优先**：技能提供判据与规矩，不提供决策预设——不写「什么情况必须/不能进入某个节点」，不写分级强制流程；是否使用由代理临场决定。技能保留核心循环、停止条件与红线。
- **独立 / 资源判据**：公开标准方法不设独立入口，在 `execution` 方法名录提完整名字 + 一句话适用；仓库特有机制（git 工作树、评审、交付、文档等）独立成技能。
- **加载策略**：简单方法可直接提及；复杂方法经决策确定适用后再按需读取其说明，避免污染上下文；触发描述（`Use when`）只回答"这是什么"，不回答"你现在该不该用"。
- 每个技能位于 `skills/<skill-name>/SKILL.md`，目录与 `name` 为相同的英文短横线名；`resources/` 存放随技能安装、按需读取的纯 Markdown 参考。
- `description` 以 `Use when` 开头，用中英描述触发条件，不概述流程；触发描述应足以让代理判断是否需要读取全文（配合加载策略）。正文以中文为主。
- **命名优先**：技能命名（含 `agents/openai.yaml` 的 `display_name`）是对事物最高度的概括，比简介更重要——先取一个能涵盖同类能力的好名字，再写简介与正文。名字写全称，不写缩写。
- **缩写规则**：有歧义的方法缩写（SDD、BDD 等）在每个文件首次出现处写「完整中文名 + 英文全称 + 缩写 + 声明后续使用缩写」，每个文件独立声明，不跨文件继承；无歧义的通用技术词不声明；不设全局术语对照表。
- 写简洁、正面的决策规则。项目产物以当前路线为主体，范围在一个权威位置由目标、穷尽的纳入项、必要约束和验收标准闭合；该范围已经完整承载用户列出的排除要求时，省略被排除对象的名称。相邻路线会改变实施、验收、授权或契约 / 兼容性判断时，只在决策依据处记录一次其与决策标准冲突的原因，决策、实施和后果继续描述当前路线。定稿时逐句检查否定标记，只保留安全 / 授权 / 隐私 / 合规红线、真实负向行为契约、影响结论的证据缺口和一处带具体原因的淘汰路线，其余内容正向改写或删除。
- `adaptive-development-workflow` 说明节点是什么与规矩；`execution` 提供执行循环与方法名录。用户直调独立标准方法时由该方法自行核验；规格驱动开发（SDD）、行为驱动开发（BDD）和类型驱动设计先由 Execution 核验方法名录中的适用前提。独立技能与方法资源各自维护自己的核心循环和边界。
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
