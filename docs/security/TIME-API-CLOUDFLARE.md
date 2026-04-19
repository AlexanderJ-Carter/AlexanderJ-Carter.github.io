# 时间 API 与 Cloudflare 部署说明

本站时间页面展示的 API 为：`GET https://api.alexander.xin/time/now`。它不是普通访客必须使用的功能，而是给前端调试、监控、小工具复用或外部调用准备的 JSON 时间接口。下面提供两种部署方式：**Cloudflare Workers**（推荐，无需隧道）和 **Cloudflare Tunnel**（仅在需要暴露已有本地服务时使用）。

---

## 方式一：Cloudflare Workers（推荐）

无需隧道，在 Cloudflare 控制台创建 Worker，绑定自定义域名 `api.alexander.xin` 即可。只做“当前时间”接口时优先选这种方式。

### 1. 创建 Worker

在 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Create Worker**。

### 2. 编写 Worker 代码

将以下代码粘贴到 Worker 的代码编辑器中（替换默认内容）：

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method !== 'GET' || !url.pathname.startsWith('/time')) {
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const now = new Date();
    const body = {
      iso: now.toISOString(),
      timestamp: Math.floor(now.getTime() / 1000),
      timezone: 'Asia/Shanghai',
      datetime: now.toLocaleString('en-CA', {
        timeZone: 'Asia/Shanghai',
        hour12: false,
      }),
    };

    return new Response(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  },
};
```

- **路径**：可只响应 `/time/now`，或任意 `/time*`（如上）。
- **CORS**：`Access-Control-Allow-Origin: *` 允许前端跨域调用；若只给自己站用，可改为 `https://alexander.xin`。

### 3. 部署并绑定域名

1. 点击 **Save and Deploy**。
2. **Workers & Pages** → 你的 Worker → **Settings** → **Domains & Routes** → **Add**。
3. 添加自定义域名：例如 `api.alexander.xin`，并确保该域名已在 Cloudflare 中接入（同一账号下会自动解析）。

完成后即可访问：`https://api.alexander.xin/time/now`，返回示例：

```json
{
  "iso": "2025-02-19T12:00:00.000Z",
  "timestamp": 1740000000,
  "timezone": "Asia/Shanghai",
  "datetime": "2025-02-19 20:00:00"
}
```

---

## 方式二：Cloudflare Tunnel（暴露本地服务）

若你已经有跑在自己电脑或服务器上的本地程序（如 Node/Express），并且需要临时或长期暴露到公网，可用 Cloudflare Tunnel 把本地端口映射出去。仅提供当前时间时不建议为了它单独使用 Tunnel。

### 1. 安装 cloudflared

- **Windows**：从 [Cloudflare Tunnel 下载页](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/) 下载安装包，或使用 `winget install Cloudflare.cloudflared`。
- **macOS**：`brew install cloudflared`。

### 2. 登录并创建隧道

```bash
cloudflared tunnel login
```

浏览器会打开，选择域名（如 alexander.xin）完成授权。

```bash
cloudflared tunnel create time-api
```

记下输出的 **Tunnel ID**。

### 3. 配置隧道路由

创建配置文件（如 `~/.cloudflared/config.yml` 或项目下的 `tunnel.yml`）：

```yaml
tunnel: <你的 Tunnel ID>
credentials-file: /path/to/<Tunnel ID>.json

ingress:
  - hostname: api.alexander.xin
    service: http://localhost:3000
  - service: http_status:404
```

表示：访问 `api.alexander.xin` 的流量转发到本机 `http://localhost:3000`。

### 4. 本地运行一个简单时间 API

例如用 Node.js + Express：

```bash
mkdir time-api && cd time-api
npm init -y
npm install express
```

**index.js**：

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/time/now', (req, res) => {
  const now = new Date();
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });
  res.json({
    iso: now.toISOString(),
    timestamp: Math.floor(now.getTime() / 1000),
    timezone: 'Asia/Shanghai',
    datetime: now.toLocaleString('en-CA', {
      timeZone: 'Asia/Shanghai',
      hour12: false,
    }),
  });
});

app.listen(port, () => console.log(`Time API on http://localhost:${port}`));
```

运行：`node index.js`。

### 5. 在 DNS 中创建 CNAME

Cloudflare Dashboard → **DNS** → 为 `api.alexander.xin` 添加记录：

- 类型：**CNAME**
- 名称：`api`（或 `api.alexander` 视你的根域而定）
- 目标：`<Tunnel ID>.cfargotunnel.com`
- 代理状态：已代理（橙色云）

### 6. 启动隧道

```bash
cloudflared tunnel run time-api
```

保持该窗口运行；本地 `node index.js` 也需保持运行。此时访问 `https://api.alexander.xin/time/now` 会由隧道转发到本机 3000 端口。

---

## 小结

| 方式        | 优点                                   | 适用场景                        |
| ----------- | -------------------------------------- | ------------------------------- |
| **Workers** | 无需服务器、不关机、延迟低、免费额度足 | 推荐，仅需返回当前时间          |
| **Tunnel**  | API 逻辑可任意复杂、跑在本地或自有机房 | 需要本地/私有环境或其它后端服务 |

若只提供「当前时间」接口，用 **Workers** 即可，无需隧道。隧道适合「本地/内网服务整体暴露」或与现有后端一起用。
