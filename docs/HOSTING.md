# 仓库托管（公开说明）

**原则**：GitHub 为规范源（canonical）；自建 Gitea（`git.alexander.xin`）做灾备 mirror 与运维清单。禁止双写；禁止提交密钥、`instance/config.json`、`.env*`。

完整仓表与 runner 归属只写在自建运维仓 / 主机 `~/fleet/README.md`，**不在公开仓罗列非公开项目**。

## 公开仓（本组织）

| 仓库 | 说明 |
|------|------|
| AlexanderJ-Carter.github.io | Folio + gateway；Gitea 有 mirror |
| MyCook | 菜谱站；Gitea 有 mirror |
| netq / Git-Workflow-Lab / AlexanderJ-Carter | 工具 / 教学 / 名片 |
| linux-command | 自用 fork，活跃维护 |
| HowToCook / CookLikeHOC | fork，已 archive |
| MIPS-Pipeline-Verilog / BookManagementSystem / awesome-chatgpt-prompts | 已 archive |

## Folio 部署（公开流程）

- Runner：`tencent-folio`（`self-hosted,linux,folio-tencent`），仅服务本仓。
- push `folio/**` → `Deploy Folio (Tencent)`：rsync 后校验 `on-this-day.ts` 导出，再 compose build。
- 改代码只推 GitHub；Gitea mirror 只读同步。
