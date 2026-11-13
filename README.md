# Folio

Payload CMS + Next.js 个人站模板。把域名、内容与密钥留在实例侧，模板可直接复用。

[演示](https://www.alexander.xin) · [配置说明](./docs/) · [安全披露](.github/SECURITY.md)

## 快速开始

```bash
cd folio
cp instance/config.example.json instance/config.json
cp .env.example .env
pnpm install && pnpm dev
```

浏览器打开 `http://127.0.0.1:3000`，后台 `/admin`。  
也可在仓库根执行：`npm run folio`。

## 结构

```
folio/      主站（Payload + Next）
gateway/    可选 GitHub Pages 名片
docs/       配置与部署
```

## 许可

代码 [BSD 3-Clause](LICENSE) · 内容 [CC BY-NC-ND 4.0](NOTICE)
