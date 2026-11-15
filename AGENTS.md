# 仓库规则与当前迭代方向

## 当前迭代：技能包重构（方向舵）

本仓库正处于一次技能包重构迭代。本节为本迭代的设计思想与实现方法的摘要；**目标状态以 `docs/design.md` 为唯一权威源**，长期仓库规则见下文。

### 目标状态（设计思想）

- **从需求选路**：用户通常从一句话需求开始。技能帮助代理从已有事实、关键缺口、风险与授权选择下一步：直接实施、澄清用户决定、核实真实契约或根因、有限探索，再用相称证据结束。工作路径由事实与需求缺口决定，正式规格依实际需要维护。
- **结构**：`adaptive-development-workflow` 是唯一根入口；`requirements-discussion`、`code-and-contract-safety`、`delegation-and-isolation`、`finishing-a-development-branch`、`documentation` 在对应场景按需读取，承载模型容易判断错的专门约束。
- **存在理由**：公开标准方法只保留完整名字和辨别相邻方法的一句话；仓库经验与红线（动态调用方、实际安装版本、评审独立、正式环境禁写等）必须保留。能否让相同事实下的选择更可靠、事实变化时及时改路，是内容取舍的依据。
- **缩写规则**：方法名 / 技能名一律全称，不写歧义缩写；有歧义时在每个文件首次出现处独立写全称与缩写并说明后续用法，无歧义的通用技术词无需声明。

### 实现方法

- 以 `docs/design.md` 为本迭代目标的唯一权威源；重构时先确定选择会怎样改变真实动作，再改技能与引用，并用事实翻转的短请求场景检验。
- 分批实施、定向验证、独立评审，按当前增量的实际风险调整强度。

## 工作范围

- Git 仓库是唯一 Skill 源码；运行时安装副本作为部署产物保持原样。每次仅修改当前任务文件，并保留无关改动。
- 默认 Git 交付的开发分支，除非另有约定，放在 `<repo>/.worktrees/<name>`；只读审查可在能保持或恢复默认基线的位置进行。
- 只读 lint/format 覆盖必要范围。自动修复优先限定于任务改动行；工具粒度较粗时扩大到最小语法单元或受影响文件，并清理无关差异。
- 根代理统筹任务级流程，并持有工作单元、计划、评审和交付的管理权。其他代理依委派授权完成工作；委派说明授予局部编排权时，执行者可在原单元范围内派发更小的执行单元，并负责回收结果。

## 文本内容维护

- 创建、组织、改写、修订或维护本仓库文本内容前，必须完整读取并遵循源码 [`skills/documentation/SKILL.md`](skills/documentation/SKILL.md)，并按文档形态读取其指向的资源。至少包括根 `README.md`、`AGENTS.md`、`docs/` 与 `skills/` 中的 Markdown 正文。

## 开发任务与工作单元

- 开发任务涵盖需要保留、集成或交付的代码、配置、依赖、测试、脚本、技能、工作流与正式文档变更；只交付事实或证据的调查按调查工作处理，即使使用可丢弃实验。任务分类依据最终交付内容与保留要求。
- 临时试验在隔离环境中进行并作为可丢弃产物管理；结束时检查依赖、锁文件、配置、生成物和工作区。决定保留实验产物时，按正式增量核对范围、风险与适用验证，将验证充分的结果纳入实现。
- 一句话请求同时要求调查和实现时，整体按开发目标处理：在已授权范围内取得必要事实后直接实施，将必要调查纳入当前工作单元。新事实改变用户可见行为、契约、风险、授权或副作用时，先澄清并重选路径。已完成成果的提交、推送、PR/MR 或部署沿用原开发目标的交付流程。
- 用户对当前任务明确指定的交付方式优先于仓库默认，后续补充或修正继续生效；未指定时，开发变更默认按实际 `git remote` 完成分支、提交、推送及 GitLab MR/GitHub PR。交付方式始终遵循用户授权；调查工作以事实与证据交付。
- 普通 Git 交付包含创建 MR/PR、立即回报链接与当前 CI 状态，并等待最终推送提交的所有自动任务进入成功、失败或取消终态；手动可选任务不阻塞，流水线内自动 review 环境任务参与等待。合并、发布、主动环境变更、正式环境部署、权限和其他高影响操作须明确授权；正式环境数据源保持只读。

## 工作机制选择

- 按当前增量的影响、未知、副作用、可回退性和已有证据，分别决定计划、独立评审、隔离与追加验证是否必要。每项额外动作都应覆盖一个具体缺口；可核实的未知先取最小证据。任务风险由当前增量本身评估，代理数、会话数、工作树、计划篇幅和验证数量用于安排执行机制。

## 计划与协作

- 计划只承载已经完成选择的内容。影响用户可见行为、公共契约、架构边界或风险的候选先完成选择；多步骤工作最多维护简短执行清单。
- 已授权、无关键歧义且风险受控时，计划直接作为执行依据。出现已授权行为、范围或交付的偏离，关键歧义，高风险/难回退，正式环境或非普通 Git 外写，权限扩大或新增副作用时先确认。
- 新事实只改变选定路线内的实现细节时告知并继续；若改变目标、范围、用户可见行为、公共契约、架构边界、风险、交付、授权或副作用，暂停受影响路径，确认关键决定和高风险/难回退新动作后继续。
- 多会话协同时，纳入协调流程并明确收到派发任务的工作会话必须向直接投放任务的上级会话回报终态；只有上级会话明确声明“任务管理权已移交且无需回复”时例外，局部编排权不构成该声明。临时会话（侧边会话）不适用这一默认回报义务，按用户安排执行。

## 委派与独立评审

- 当边界清晰且收益高于交接成本时委派；根代理持有需求、范围、授权、写入、跨单元决策、集成和最终结论。
- 评审者与实现、证据设计及差异修改环节保持独立，并以只读方式查看需求、计划、完整差异和最新证据，按严重性报告文件和行号。评审者仅提供评审结果；实质修改后重新核对受影响部分。
- 自查、已有评审、PR/MR 评审、CI 和运行时验证分别提供各自范围的证据。需要独立评审的完成声明依据独立评审结果。

## 方法、测试与证据

- 可实施逻辑追溯到用户目标、真实调用方、已核验契约、已观察问题或使当前目标成立的必要技术前置；关键业务取舍以用户决定和经核实的来源为准。
- 按当前缺口选择一个主要方法；事实充分时直接实施或回答。调查与实现可在同一已授权开发请求中依次完成；新事实改变目标、范围、公共契约、架构边界、风险、授权或副作用时，暂停受影响路径并重新选路；高风险或难回退的新动作先确认。选定标准方法时保留其核心循环，技能聚焦仓库经验与专门约束。
- 调查交付以事实与证据为准；功能完成由相应功能证据支持，默认授权边界始终有效。
- 需求、不变量、真实调用方和契约优先指导实现、测试与流程；冲突时修正偏离者。
- 替身仅隔离时钟、网络、进程等真实外部边界；测试隔离围绕这些边界构建，生产代码保持专注于产品行为。
- 有可靠静态类型时，在当前开发单元内用类型表达稳定不变量；此设计原则可直接应用于当前单元。只主张当前工具链真实证明的约束；不可信输入在边界进行运行时解析，已由类型证明的约束由类型证据覆盖，运行时测试聚焦其余行为。
- 快照来自稳定真实输出，更新须审阅。主观或概率结果用代表任务、评价标准、实验、冒烟或独立评估；稳定不变量经确认后转为长期测试。
- 复用覆盖相同输入、环境、版本、路径和风险的证据；最终集成 CI 作为组合证据。结构检查和代理模拟提供其覆盖范围内的证据。
- 验证从真实消费或激活路径直接证明需求明确提及的正常场景，再执行适用于当前增量的仓库强制检查。主动追加的类型检查、构建、更多测试、完整 CI 或评审分别覆盖具体未证风险；证据足以支撑当前交付声明后停止追加。
- 开发和审查期间，正式环境数据源保持只读且结构不变。

## 技能编写

- **技能包结构**：`adaptive-development-workflow` 是唯一根入口；`requirements-discussion`、`code-and-contract-safety`、`delegation-and-isolation`、`finishing-a-development-branch`、`documentation` 在对应场景按需读取。
- **选择判据优先**：明确当前事实中会改变下一步的缺口、直接行动条件、澄清时机、所需证据与停止信号；工作选择由事实与需求缺口引导，用户动词和文档状态作为上下文信息。完整标准方法流程由模型已有知识承担，技能保留不可替代的失败经验和安全红线。
- **加载策略**：简单方法直接引用，复杂机制选中后按需读取；`description` 以 `Use when` 开头，精准描述真实用户问题与独有缺口，使各入口在对应场景清晰触发。
- 每个技能位于 `skills/<skill-name>/SKILL.md`，目录与 `name` 为相同英文短横线名；`resources/` 存放随技能安装、按需读取的纯 Markdown 参考，正文以中文为主。
- **缩写规则**：方法和技能名用全称；有歧义的方法缩写在每个文件首次出现处独立声明中文名、英文全称和后续用法；通用技术词不需声明。
- 项目产物以读者要完成的事为主体，范围、事实、授权与有决策价值的取舍准确表达；安全限制和真实负向行为照实保留，长度由内容决定。
- 完成声明与最终证据核对按 `code-and-contract-safety` 的证据独立性要求执行；证据复用、失效与收敛在声称完成前核对输入、环境、版本与调用路径是否仍适用。
- 技能内容聚焦通用开发方法与仓库特有机制；生态、框架、业务手册及托管平台专属 CLI/API/字段由各自产品文档承载。静态编译或分析作为证据类型；实际需要形式化模型检查时，再选相应专门方法。
- 修改技能后，用当前 `skill-creator` 的 `scripts/quick_validate.py` 校验；技能链接用相对 Markdown，并运行 `scripts/check-cross-references.ts`。思想来源在 `README.md` 底部以来源链接呈现；聚合仓库中，单个插件、技能或独立单元链接至该单元，整体作为全面参考对象时链接仓库根。与上游的关系保持为来源归属与链接说明。

## Plugin 与 Hook 发行

- `skills/` 是 standalone `npx skills` 与可选 Codex Plugin 共用的唯一源码，两个渠道复用同一份 Skill。Skills 承载可复用方法，Hook 承载运行时交接机制，两者职责分明。
- standalone 发行 Skills；Hook 作为可选 Codex Plugin 内容分发。维护 Plugin/Hook 时保留显式可选安装与独立信任审阅，并验证 standalone 安装内容聚焦于 Skills。
- 可写状态限定于 launcher 派生的 Plugin 临时子目录，经 `TASK_HANDOFF_DATA` 传递；Deno 获得该目录的读写权限。脚本通过 `PLUGIN_ROOT` 定位安装位置，在约定范围内读写并采用已承诺的数据格式。
- 通过获准子进程读取项目元数据时，选用只读取所需元数据的精确命令，并确认其执行路径不会触发 Git hook、filter、helper 或其他外部进程。Deno 的 `--allow-run` 仅授予启动子进程的权限；子进程使用当前操作系统用户权限运行，Deno 权限只约束 Deno 进程本身。
- 生产脚本（仅 `hooks/` 下需在 Deno 与 Node 双运行时运行的脚本）采用 Deno 2 与 Node 24 共用的 Node 内置 API；`scripts/` 下的仓库内部工具使用各自适用的能力。launcher 优先 Deno，并在找不到 `deno` 时启动 Node；选定运行时的退出码原样返回。Node fallback 拥有较宽的子进程、环境和网络权限；改入口或权限时同时审阅两条路径。Windows 的 `commandWindows` 显式通过 `cmd.exe` 执行 `.cmd`。
- `hooks/codex-hook-types.ts` 以当前最低核对 Codex 版本的生成 schema 约束 stdin 与逐事件 stdout。改事件、字段或支持版本时先更新类型边界，再用 `deno check`；每个已配置 Hook 保留一个代表性脚本逻辑测试，Codex 集成场景由相应的集成证据覆盖。
- 发布 Plugin 使用 `scripts/bump-version.ts <major|minor|patch|x.y.z>` 同步 Codex、Copilot manifest 与 marketplace。Git marketplace 用户通过 `codex plugin marketplace upgrade` 获取新快照；本地验证按 `plugin-creator` 的 cachebuster 和重装流程进行，版本缓存更新遵循各自平台的发行机制。

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
- 这些检查覆盖脚本与 Plugin 的运行时冒烟；Codex 压缩集成需要独立的集成证据。
