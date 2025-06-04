# AlexanderJ-Carter.github.io

这是一个用于托管個人網站的靜態頁面倉庫，包含多語言版本的內容與相關資源。

## 目錄結構概覽

- `index.html` – 中文首頁
- `en/`、`it/`、`jp/`、`zh-CN/` – 各語言子站點，存放本地化 HTML
- `beta/` – 一些實驗性頁面與登入範例
- `css/` – 公共樣式表
- `js/` – JavaScript 腳本，例如 `policy.js`（隱私政策與條款共用），以及 `verification-utils.js`、`verification-page.js` 等
- `img/` – 網站使用的圖片與圖示
- `music/` – 音訊檔案

根目錄下還包含 `404.html`、`robots.txt`、`CNAME` 等與部署及搜尋引擎相關的文件。

## 驗證流程

某些頁面（如個人簡介或聯絡頁）需要先通過 `verification.html` 完成 Cloudflare Turnstile 驗證。驗證邏輯由 `js/verification-utils.js` 和 `js/verification-page.js` 提供。

## 建站與優化記錄

- 2024 年：清理未使用的樣式與腳本，部分資源改用 CDN
- 2025 年：合併 `privacy.js` 與 `terms.js`，推出共用的 `policy.js`

歡迎根據需要在各語言目錄中擴充內容，或新增自定義的樣式與腳本。
