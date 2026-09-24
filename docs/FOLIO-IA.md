# Folio 前台内容地图

站点心智：**摄影主站 + 研究公开面 + 工具边角**。写作暂缓。不向后兼容旧 Astro 多语言壳。

## 导航（建议）

| 入口 | 放什么 | 不放什么 |
|------|--------|----------|
| `/` 首页 | Hero、精选影像、暗房法则、**今日诗词 + 历史上的今天**、研究导览条 | 长履历、完整项目库、留言表单 |
| `/gallery` | 摄影联系单 | 工具、论文 |
| `/research` | **公开论文、学术主页外链、实验室/开源研究项目**（如 AgentSociety） | 生活向小玩具、完整 CV |
| `/projects`（待建） | **个人/生活向项目**：站点工具实验、MyCook 入口说明、硬件/生活项目 | 论文列表（归 research） |
| `/tools` | 实用换算：时间、单位、汇率、QR | 番茄钟/电台（归玩乐） |
| `/fun` | 暗房玩具：番茄钟、倒计时、取色、密码、计算器、曝光三角、今日一帧、天气、电台 | 正式项目介绍 |
| `/about` | 门禁：**个人简介 / 教育 / 兴趣 / Now** | 可公开的论文全文列表（链到 research） |
| `/contact` | 门禁：联系信息表 + 留言表单 | 履历正文 |
| Footer Elsewhere | 站外长期入口：GitHub、IT-Tools、Gitea… | 单次活动文案（用公告横幅） |
| `/posts` | 暂缓 | — |

## 项目放哪里（定案）

```
公开研究项目 ──► /research（instance.research.project + publications）
生活/作品项目 ──► /projects（后续 instance.projects[]，旧 Astro projects 迁此）
站外整站服务 ──► Footer elsewhere（独立域名）
首页只做 1 条研究导览 + 链到 gallery/tools，不堆项目卡
```

## 首页「每日」块

- **今日诗词**：jinrishici（`/api/poem`）— 不是站点自写「语录」
- **历史上的今天**：本地 `on-this-day` 数据

## 公告

临时活动 / 新年祝福 → Payload **站点公告** 横幅，不塞进首页正文。
