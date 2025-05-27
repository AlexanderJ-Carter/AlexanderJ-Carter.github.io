# Beta 用户认证系统部署指南

## 🚀 Cloudflare Workers 部署步骤

### 1. 准备工作
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 导航到 "Workers & Pages" 部分

### 2. 创建 KV 存储
1. 在 Cloudflare Dashboard 中，点击 "Workers & Pages"
2. 点击 "KV" 标签
3. 点击 "Create a namespace"
4. 命名空间名称：`BETA_USERS`
5. 点击 "Add"

### 3. 创建 Worker
1. 点击 "Create application"
2. 选择 "Create Worker"
3. 命名您的 Worker（建议：`beta-auth`）
4. 点击 "Deploy"

### 4. 配置 Worker 代码
1. 点击刚创建的 Worker
2. 点击 "Edit code"
3. 删除默认代码，复制粘贴 `cloudflare-worker.js` 的完整内容
4. 点击 "Save and deploy"

### 5. 绑定 KV 命名空间
1. 在 Worker 页面，点击 "Settings" 标签
2. 点击 "Variables" 部分
3. 在 "KV Namespace Bindings" 下点击 "Add binding"
4. Variable name: `BETA_USERS`
5. KV namespace: 选择之前创建的 `BETA_USERS`
6. 点击 "Save and deploy"

### 6. 获取 Worker URL
部署完成后，您会得到一个 Worker URL，格式为：
`https://beta-auth.您的用户名.workers.dev`

### 7. 更新前端配置
在 `user-auth.js` 文件中，将 `this.apiBase` 更新为您的实际 Worker URL + `/api`

例如：
```javascript
this.apiBase = 'https://beta-auth.alexanderj-carter.workers.dev/api';
```

## 🔧 使用方法

### 注册新用户
1. 访问 `/beta/login.html`
2. 点击 "注册新账户"
3. 输入用户名、密码和邀请码（目前设置为：`beta2025`）
4. 点击注册

### 用户登录
1. 在登录页面输入用户名和密码
2. 点击登录
3. 成功后将跳转到 Beta 内容页面

### 管理员功能
- 查看所有注册用户
- 可以在 Cloudflare KV 中直接管理用户数据

## 🔐 安全特性

1. **密码加密**：使用 SHA-256 哈希存储密码
2. **JWT 认证**：使用 JSON Web Token 进行身份验证
3. **邀请码系统**：防止随意注册
4. **CORS 保护**：跨域请求安全控制
5. **令牌过期**：JWT 令牌有效期 24 小时

## 📝 默认配置

- **邀请码**：`beta2025`
- **JWT 密钥**：`your-secret-key-change-in-production`
- **令牌有效期**：24 小时

⚠️ **重要**：在生产环境中，请更改 `cloudflare-worker.js` 中的 JWT 密钥！

## 🎯 测试流程

1. 部署 Worker 并绑定 KV
2. 更新前端 API 地址
3. 访问 `/beta/login.html` 注册测试账户
4. 登录并验证功能是否正常
5. 检查 KV 存储中是否有用户数据

## 🛠️ 故障排除

**如果遇到 CORS 错误**：
- 确认 Worker 中的 CORS 头设置正确
- 检查前端请求的 API 地址是否正确

**如果注册失败**：
- 检查邀请码是否正确（`beta2025`）
- 确认 KV 命名空间绑定是否正确

**如果登录失败**：
- 检查用户名和密码是否正确
- 确认 JWT 密钥配置一致
