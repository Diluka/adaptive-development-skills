# 仓库规则与当前迭代方向

## 当前迭代：技能包重构（方向舵）

本仓库正处于一次技能包重构迭代。本节为本迭代的设计思想与实现方法的摘要；**目标状态以 `docs/design.md` 为唯一权威源**，长期仓库规则见下文。

### 目标状态（设计思想）

- **从需求选路**：用户通常从一句话需求开始。技能帮助代理从已有事实、关键缺口、风险与授权选择下一步：直接实施、澄清用户决定、核实真实契约或根因、有限探索，再用相称证据结束；不从任务动词或方法名推导固定流程，也不预设正式规格存在。
- **结构**：`adaptive-development-workflow` 处理从请求到当前工作边界的选择；`execution` 区分相邻方法和证据；独立机制技能保留选中后的专门约束。
- **存在理由**：公开标准方法只保留完整名字和辨别相邻方法的一句话；仓库经验与红线（动态调用方、实际安装版本、评审独立、正式环境禁写等）必须保留。能否让相同事实下的选择更可靠、事实变化时及时改路，是内容取舍的依据；目录完整或篇幅本身不是价值。
- **缩写规则**：方法名 / 技能名一律全称，不写歧义缩写；有歧义时在每个文件首次出现处独立写全称与缩写并说明后续用法，无歧义的通用技术词无需声明。

### 实现方法

- 以 `docs/design.md` 为本迭代目标的唯一权威源；重构时先确定选择会怎样改变真实动作，再改技能与引用，并用事实翻转的短请求场景检验。
- 分批实施、定向验证、独立评审，按当前增量的实际风险调整强度。

## 工作范围

- Git 仓库是唯一 Skill 源码；不编辑运行时安装副本，只改当前任务文件并保留无关改动。
- 默认 Git 交付的开发分支，除非另有约定，放在 `<repo>/.worktrees/<name>`；只读审查可在能保持或恢复默认基线的位置进行。
- 只读 lint/format 可覆盖必要范围。自动修复只及任务改动行；不能行级时扩大到最小语法单元或受影响文件，并移除无关差异。
- 根代理控制任务级流程；其他代理不得擅自发起或转派由根代理控制的任务级工作单元、计划、评审和交付。委派说明明确授予局部编排权时，执行者可以在原单元的范围与授权内继续派发更小的执行单元，并负责回收结果。

## 文本内容维护

- 创建、组织、改写、修订或维护本仓库文本内容前，必须完整读取并遵循源码 [`skills/documentation/SKILL.md`](skills/documentation/SKILL.md)，并按文档形态读取其指向的资源。至少包括根 `README.md`、`AGENTS.md`、`docs/` 与 `skills/` 中的 Markdown 正文。

## 开发任务与工作单元

- 需要保留、集成或交付的代码、配置、依赖、测试、脚本、技能、工作流或正式文档变更是开发任务；只交付事实或证据的调查不是，即使使用可丢弃实验。是否写代码、改文件或只读不是判据。
- 临时试验隔离且可丢弃；结束时检查依赖、锁文件、配置、生成物和工作区。决定保留实验产物时，按正式增量核对范围、风险与适用验证，不把试验残留当实现。
- 一句话请求同时要求调查和实现时，整体按开发目标处理：已授权范围内取得必要事实后可直接实施，不为每个调查动作生造开发单元或再次批准。新事实改变用户可见行为、契约、风险、授权或副作用时再澄清并重选路径。只交付既有成果的提交、推送、PR/MR 或部署不另成开发任务。
- 开发变更默认按实际 `git remote` 和仓库约定完成分支、提交、推送及 GitLab MR/GitHub PR；用户可逐项收窄，非开发任务不产生 Git 交付。
- 普通 Git 交付包含创建 MR/PR、立即回报链接与当前 CI 状态，并等待最终推送提交的所有自动任务进入成功、失败或取消终态；手动可选任务不阻塞，流水线内自动 review 环境任务参与等待。合并、发布、主动环境变更、正式环境部署、正式环境写入、权限和其他高影响操作须明确授权。

## 任务分级

- 按当前增量的行为、契约、影响、未知、可逆性、副作用和证据选择与风险相称的最简工作方式，不继承父任务或 PR/MR 的复杂度；从最低充分级别开始，随事实升降。风险越高，越要保留落盘计划、验证与独立评审等证据；风险低时直接执行并做必要检查。复杂度只由任务交付内容决定；代理数、会话数、工作树、计划篇幅、验证数量和协作方式属于执行机制。

## 计划与协作

- 计划只承载已经完成选择的内容。影响用户可见行为、公共契约、架构边界或风险的候选先完成选择；多步骤工作最多维护简短执行清单。
- 已授权、无关键歧义且风险受控时，计划是执行依据，不是二次批准。偏离已授权行为、范围或交付，关键歧义，高风险/难回退，正式环境或非普通 Git 外写，权限扩大或新增副作用时先确认。
- 新事实只改变选定路线内的实现细节时告知并继续；若改变目标、范围、用户可见行为、公共契约、架构边界、风险、交付、授权或副作用，暂停受影响路径，确认关键决定和高风险/难回退新动作后继续。
- 多会话协同时，纳入协调流程并明确收到派发任务的工作会话必须向直接投放任务的上级会话回报终态；只有上级会话明确声明“任务管理权已移交且无需回复”时例外，局部编排权不构成该声明。临时会话（侧边会话）不适用这一默认回报义务，按用户安排执行。

## 委派与独立评审

- 仅在边界清晰且收益高于交接成本时委派；根代理持有需求、范围、授权、写入、跨单元决策、集成和最终结论。
- 评审者必须独立于实现、证据设计与差异修改（不能自审），只读需求、计划、完整差异和最新证据，按严重性报告文件和行号；不得修改，也不得擅自转派评审或发起其他任务级流程。实质修改只使受影响评审失效。
- 自查、已有评审、PR/MR 评审、CI 和运行时验证不能互相冒充。没有可用独立评审者时，只阻止本来需要评审的完成声明。

## 方法、测试与证据

- 可实施逻辑追溯到用户目标、真实调用方、已核验契约、已观察问题或使当前目标成立的必要技术前置；缺失关键业务取舍时先确认，不用形式规格填空。
- 按当前缺口选一个主要方法；事实已充分时直接实施或回答。调查与实现可在同一已授权开发请求中依次完成；新事实改变目标、范围、公共契约、架构边界、风险、授权或副作用时暂停受影响路径并重新选路；高风险或难回退的新增动作先确认。选定标准方法保留其核心循环，不在技能中复述教程。
- 只交付事实的调查不伪装成修复；交付方法不替代功能证据，也不扩大默认授权。
- 需求、不变量、真实调用方和契约高于实现、测试与流程；冲突时修正违反者。
- 替身只用于时钟、网络、进程等真实外部边界。不为测试增加生产开关、包装、回退、分支或公共接口；不镜像实现或普通字面量，外部契约除外。
- 有可靠静态类型时，优先在当前开发单元内用类型表达稳定不变量；这项设计原则不要求独立工作单元。只主张当前工具链真实证明的约束，不可信输入仍须运行时解析，已由类型证明的约束不再用运行时测试重复。
- 快照来自稳定真实输出，更新须审阅。主观或概率结果用代表任务、评价标准、实验、冒烟或独立评估；已确认稳定不变量才转长期测试。
- 复用仍覆盖相同输入、环境、版本、路径和风险的证据；最终集成 CI 是组合证据。结构检查和代理模拟只证明有限范围。
- 验证默认从真实消费或激活路径直接证明需求明确提及的正常场景，再执行适用于当前增量的仓库强制检查。主动追加的类型检查、构建、更多测试、完整 CI 或评审各自覆盖具体未证风险；证据足以支撑当前交付声明后停止追加。
- 开发和审查期间不得写入、修改、删除或迁移正式环境数据源。

## 技能编写

- **技能包结构**：`adaptive-development-workflow` 负责从请求选择当前工作边界，`execution` 区分方法与证据，独立机制技能承载选定后的专门约束；无实际增益的标准方法不另设入口。
- **选择判据优先**：写出当前事实中哪种缺口会改变下一步，什么时候可以直接做、需要澄清、该取哪类证据、何时停止或改路；不把用户动词、文档有无或固定级别当决策规则。完整标准方法流程由模型已有知识承担，技能保留不可替代的失败经验和安全红线。
- **加载策略**：简单方法直接引用，复杂机制选中后按需读取；`description` 以 `Use when` 开头，描述真实用户问题与独有缺口，避免泛化触发使多个入口在普通任务中同时加载。
- 每个技能位于 `skills/<skill-name>/SKILL.md`，目录与 `name` 为相同英文短横线名；`resources/` 存放随技能安装、按需读取的纯 Markdown 参考，正文以中文为主。
- **缩写规则**：方法和技能名用全称；有歧义的方法缩写在每个文件首次使用处独立声明中文名、英文全称和后续用法；通用技术词不需声明。
- 项目产物以读者要完成的事为主体，范围、事实、授权与有决策价值的取舍准确表达；安全限制和真实负向行为照实保留，不以否定词数量、固定栏目或模板填空评估文档质量。
- `verification-before-completion` 核对完成声明与最终证据，不替代过程中的验证选择；证据复用、失效与收敛见 `execution/resources/evidence.md`，按实际缺口读取。
- 只收录通用开发方法和仓库特有机制，不增加生态、框架或业务手册，不写托管平台专用 CLI/API/字段。静态编译或分析是证据类型，仅在实际需要形式化模型检查时考虑专门方法。
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
