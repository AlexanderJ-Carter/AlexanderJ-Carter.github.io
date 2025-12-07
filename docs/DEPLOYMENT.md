# 🚀 部署指南 / Deployment Guide

## 目录 / Table of Contents

- [GitHub Pages 部署](#github-pages-部署)
- [Vercel 部署](#vercel-部署)
- [Netlify 部署](#netlify-部署)
- [Cloudflare Pages 部署](#cloudflare-pages-部署)
- [自定义服务器部署](#自定义服务器部署)
- [Docker 部署](#docker-部署)
- [环境变量配置](#环境变量配置)
- [故障排查](#故障排查)

---

## GitHub Pages 部署

### 自动部署（推荐）

项目已配置 GitHub Actions 自动部署工作流。

#### 配置步骤

1. **确保仓库设置正确**
   
   访问：`Settings` → `Pages`
   - Source: `GitHub Actions`
   - Branch: 保持默认

2. **推送到 main 分支**
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```

3. **等待自动部署**
   - 访问 `Actions` 标签查看进度
   - 构建成功后，网站自动更新

#### 工作流说明

`.github/workflows/deploy.yml` 配置：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]      # main 分支推送时触发
  workflow_dispatch:      # 支持手动触发

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build site
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 自定义域名

1. **添加 CNAME 文件**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **配置 DNS**
   
   添加以下记录到你的 DNS 提供商：
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: your-username.github.io
   ```

3. **更新 Astro 配置**
   ```javascript
   // astro.config.mjs
   export default defineConfig({
     site: 'https://yourdomain.com',
   });
   ```

#### 手动触发部署

1. 访问仓库的 `Actions` 标签
2. 选择 "Deploy to GitHub Pages" workflow
3. 点击 "Run workflow" → "Run workflow"

---

## Vercel 部署

### 通过 CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   # 首次部署
   vercel
   
   # 生产环境部署
   vercel --prod
   ```

### 通过 GitHub 集成部署

1. **导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入 GitHub 仓库

2. **配置构建设置**
   ```
   Framework Preset: Astro
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **部署**
   - 点击 "Deploy"
   - 每次推送到 main 分支自动部署

### 环境变量

在 Vercel 项目设置中添加：
```
Settings → Environment Variables
```

---

## Netlify 部署

### 通过 CLI 部署

1. **安装 Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **登录**
   ```bash
   netlify login
   ```

3. **初始化**
   ```bash
   netlify init
   ```

4. **部署**
   ```bash
   # 预览部署
   netlify deploy
   
   # 生产部署
   netlify deploy --prod
   ```

### 通过 Git 集成部署

1. **连接仓库**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 仓库

2. **配置构建设置**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **高级配置**
   
   创建 `netlify.toml`：
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/404.html"
     status = 404

   [build.environment]
     NODE_VERSION = "20"
   ```

---

## Cloudflare Pages 部署

### 通过 Dashboard 部署

1. **登录 Cloudflare**
   - 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 进入 "Pages"

2. **创建项目**
   - 点击 "Create a project"
   - 连接 GitHub 账户
   - 选择仓库

3. **配置构建**
   ```
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   ```

4. **部署**
   - 点击 "Save and Deploy"
   - 自动构建和部署

### 环境变量

在项目设置中添加：
```
Settings → Environment variables
```

---

## 自定义服务器部署

### 使用 Node.js + Serve

1. **构建项目**
   ```bash
   npm run build
   ```

2. **安装 serve**
   ```bash
   npm i -g serve
   ```

3. **启动服务器**
   ```bash
   serve dist -p 3000
   ```

### 使用 Nginx

1. **构建并上传**
   ```bash
   npm run build
   scp -r dist/* user@server:/var/www/html/
   ```

2. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # 缓存静态资源
       location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Gzip 压缩
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;
   }
   ```

3. **重启 Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

### 使用 Apache

1. **配置 .htaccess**
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
   </IfModule>

   # 启用压缩
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript
   </IfModule>

   # 缓存控制
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType image/jpg "access plus 1 year"
       ExpiresByType image/jpeg "access plus 1 year"
       ExpiresByType image/gif "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType text/css "access plus 1 month"
       ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

---

## Docker 部署

### Dockerfile

创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        gzip on;
        gzip_types text/plain text/css application/json application/javascript;
    }
}
```

### 构建和运行

```bash
# 构建镜像
docker build -t alexander-portfolio .

# 运行容器
docker run -d -p 80:80 alexander-portfolio

# 使用 Docker Compose
docker-compose up -d
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

---

## 环境变量配置

### 构建时环境变量

在 `.env` 文件中定义：

```env
PUBLIC_API_URL=https://api.example.com
PUBLIC_SITE_URL=https://alexander.xin
```

在 Astro 中使用：

```javascript
const apiUrl = import.meta.env.PUBLIC_API_URL;
```

### 平台特定环境变量

#### Vercel
```
Settings → Environment Variables
```

#### Netlify
```
Site settings → Environment variables
```

#### GitHub Actions
```yaml
env:
  PUBLIC_API_URL: ${{ secrets.API_URL }}
```

---

## 故障排查

### 常见问题

#### 1. 构建失败

**问题**: `npm run build` 失败

**解决方案**:
```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install

# 检查 Node.js 版本
node -v  # 应该 >= 18.14.1

# 查看详细错误
npm run build -- --verbose
```

#### 2. 404 错误

**问题**: 部署后某些页面返回 404

**解决方案**:
- 检查路由配置
- 确保 404.astro 存在
- 配置服务器重定向规则

#### 3. 资源加载失败

**问题**: CSS/JS/图片无法加载

**解决方案**:
```javascript
// 检查 astro.config.mjs
export default defineConfig({
  site: 'https://yourdomain.com',  // 确保正确
  base: '/',  // 如果部署在子目录，修改此项
});
```

#### 4. 构建时内存不足

**问题**: `JavaScript heap out of memory`

**解决方案**:
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

#### 5. 部署后样式错误

**问题**: 样式不一致或丢失

**解决方案**:
- 清除浏览器缓存
- 检查 Tailwind 配置
- 验证 CSS 构建输出

### 日志和监控

#### GitHub Actions 日志
```
Actions → 选择工作流 → 查看详细日志
```

#### Vercel 日志
```
Deployments → 选择部署 → View Function Logs
```

#### Netlify 日志
```
Deploys → 选择部署 → Deploy log
```

---

## 性能优化建议

### 1. CDN 配置

使用 CDN 加速静态资源：
- Cloudflare
- AWS CloudFront
- Fastly

### 2. 缓存策略

```nginx
# Nginx 示例
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. 压缩配置

启用 Gzip/Brotli 压缩：
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

brotli on;
brotli_types text/plain text/css application/json application/javascript;
```

### 4. HTTP/2 支持

确保服务器支持 HTTP/2：
```nginx
listen 443 ssl http2;
```

---

## 安全配置

### SSL/TLS

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
```

### 安全头部

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

Made with ❤️ by Alexander Carter
