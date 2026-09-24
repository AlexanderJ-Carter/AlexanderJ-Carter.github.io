# 架构速览（2026-09）

> **主站已是 Folio。** 下文「Astro 目录」仅描述遗留树，便于迁内容；改版请改 `folio/`。  
> 部署与职责：[FOLIO-CUTOVER.md](./FOLIO-CUTOVER.md)。站群控制面：[architecture/site-fleet.md](./architecture/site-fleet.md)。

## 运行时拓扑

```
浏览器
  ├─ www.alexander.xin  → Cloudflare → nginx(cloud) → Tailscale → folio:3040 (tencent)
  └─ *.github.io        → GitHub Pages ← gateway/
```

| 路径 | 角色 |
|------|------|
| `folio/` | Payload CMS + Next 前台（主站） |
| `gateway/` | Pages 跳转 + security 镜像 |
| `src/` + `public/` | Astro 遗留（迁移源） |
| `ops-portal/` / `workers/` | 运维/边缘实验（非主站） |

## Folio 目录（主开发面）

```
folio/src/
  app/(frontend)/   # 页面与 API（含 Gate、OIDC、views）
  app/(payload)/    # 后台
  collections/      # Pages / Posts / Media …
  components/       # 前台与后台组件
  data/             # 画廊等结构化数据
```

## Astro 遗留目录（参考）

```
src/
  components/   # chrome / widgets / templates
  pages/        # 旧路由
  content/      # 写作 Markdown（migrate-site 可读）
  i18n/         # 多语文案
public/         # 旧静态资源；画廊原图勿提交
```

## 路由约定（遗留）

- 默认语言曾为 `zh-CN` → `/about`；其他语言 `/en/about` 等  
- Folio 侧以中文为主；语言前缀请求由 `folio/redirects.ts` 收束

## 体验底线（Folio 与遗留共用原则）

- `prefers-reduced-motion`、可见焦点、键盘可达  
- 机密不进仓库；安全资产见 CLAUDE.md
