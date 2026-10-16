# Autofix Merge Gate

[English](README.md)

Autofix Merge Gate 是一个可复用的审查 Skill，面向安全团队、仓库维护者以及需要接收 AI 编码代理所生成修复 PR 的开发者。它把 PR 材料整理为逐告警的合并判断，明确区分证据状态、扫描器验证、行为验证、范围风险、责任人和回滚要求。

本项目通过可直接导入的 `.ipollowork-plugin` 安装包支持 [iPolloWork](https://github.com/Devin-AXIS/iPolloWork)，同时提供可用于本地 Skill 文件夹导入的独立 ZIP。

## 解决的问题

自动安全修复通常附带完整的文字总结和通过的扫描结果，但审查者仍需确认每个告警与当前差异相对应、验证运行在同一提交上、行为回归得到覆盖，以及依赖或权限等额外变更已被解释。该 Skill 把这些检查整理为稳定流程，不声称可以访问 GitHub，也不替代仓库策略。

## 目标用户与适用场景

- 审查代理自动修复的应用安全团队；
- 接收单个或多个代码扫描告警修复 PR 的仓库维护者；
- 需要统一人类审批记录的工程负责人；
- 需要追溯安全修复为何获准或被阻止的审计人员。

它可用于 GitHub agentic autofix、其他编码代理或人工整理的修复材料。当一个 PR 同时覆盖多个告警且需要明确显示部分成功时尤其适用。

## 已实现功能

- 为每个告警输出规则、严重性、位置、变更路径、修复机制、证据和判定；
- 使用 observed、reported、missing、not applicable 四种证据状态；
- 分开检查扫描器、行为测试、人类审查和部署证据；
- 独立检查依赖、工作流、权限、生成文件、密钥、配置与迁移风险；
- 仅使用 `ready`、`ready with changes`、`blocked` 三种总体结论；
- 要求人类审查者、上线负责人、观察信号和回滚动作；
- 确定性生成安装包、独立 Skill 包、源码包和 SHA-256。

## 前置条件

- 一份包含差异或变更文件、告警信息、检查结果和测试证据的 PR 审查材料。
- 使用安装包时需要 iPolloWork 0.50.12 或更高版本。Skill 本身不需要运行时、账号、网络或外部服务。
- 可读取 Markdown 和项目文件的模型。

## 输入与输出

输入可以是 Markdown、粘贴文本、导出的 JSON、本地文件或它们的组合。尽量提供基础分支、被审查的 head commit、告警 ID、变更路径、扫描结果、行为测试、审查状态、人类负责人、上线观察项和回滚计划。

输出是一份包含十一部分的 Markdown 报告：总体判定、审查边界、告警到变更矩阵、证据台账、补丁与验证评估、范围风险、必要动作、合并清单、残余风险和建议边界。

## 使用流程

1. 收集 PR 差异、告警清单、检查结果、测试和责任人信息。
2. 要求模型调用 `autofix-merge-gate` 审查材料。
3. 确认报告使用正确的 head commit，并保留全部告警 ID。
4. 修复阻塞项，带着新增证据重新运行审查。
5. 最终由仓库分支规则和安全负责人决定是否合并。

## 端到端示例（End-to-end）

使用 [examples/review-packet.md](examples/review-packet.md)：

```text
请使用 autofix-merge-gate Skill 审查 examples/review-packet.md。
保留告警 ID 和被审查提交，输出完整的合并门禁报告。
```

预期结果：两个告警的逐项修复和验证均通过，但由于变更后的 lockfile 缺少依赖审查证据，总体结论为 `blocked`。摘要示例见 [examples/expected-review.md](examples/expected-review.md)。

## 在 iPolloWork 中安装和使用

1. 从 GitHub Release 下载 `autofix-merge-gate-1.0.0.ipollowork-plugin`。
2. 打开 iPolloWork，依次选择 **扩展 → 插件 → 添加 → 文件**。
3. 选择下载的安装包。在预览页确认发布者为 `sykdhqk`、版本为 `1.0.0`、包含一个 Skill，且不包含 agent、command、MCP、权限或授权资源。
4. 点击 **安装插件**，确认插件和 `autofix-merge-gate` Skill 已启用；如软件提示则重新加载项目。
5. 将审查材料放进项目，新建任务并输入：`使用 autofix-merge-gate 审查 <材料路径>，输出完整报告。`
6. 确认输出保留告警 ID 和 head commit，为每个告警给出判定，分开呈现扫描器与行为证据，并以建议边界结尾。

如果使用本地 Skill 入口，请下载 Skill ZIP、解压，并在本地 Skill 导入页选择直接包含 `SKILL.md` 的文件夹。GitHub 仓库 URL 不是通用的文件安装方式。

## 构建与打包

需要 Node.js 20+ 和系统 `zip` 工具。

```bash
npm test
npm run package
cd dist && shasum -a 256 -c SHA256SUMS.txt
```

构建过程使用干净的 staging 目录。安装包只包含一个根清单和完整 Skill 目录，不包含凭据、本地服务、进程型 MCP、原生代码或非空权限声明。

## 验证说明（Validation）

1.0.0 版本在 macOS 15.5 arm64、iPolloWork 0.50.12 和 OpenCode 引擎上验证。任务标题显示 `GPT 5.6`，但详细模型选择器仍标记另一个提供方条目，因此具体模型变体记为未确认。验证范围包括文件导入、预览、安装、启用、Skill 与引用文件加载、示例调用，以及停用后重新启用的加载检查。卸载后重装、同版本更新、Windows、Linux、其他引擎、实时 GitHub 访问、分支保护强制执行和真实 CodeQL 运行不在本次验证范围内。

## 常见问题（FAQ）

**它会合并 PR 或调用 GitHub 吗？**  
不会。它只审查任务中提供的证据并输出建议报告。

**CodeQL 重新运行成功是否足以得到 `ready`？**  
不足。Skill 还会检查相关行为证据、提交一致性、变更范围、人类责任人和回滚计划。

**可以审查包含多个告警的 PR 吗？**  
可以。每个告警都有独立矩阵行和判定，阻塞项不能被批次总体成功掩盖。

**为什么要检查只有 lockfile 的变化？**  
依赖和生成文件可能扩大原修复范围之外的风险，因此必须提供理由与证据，或移除无关变更。

## 许可证

MIT
