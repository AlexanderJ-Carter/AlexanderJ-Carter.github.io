---
title: "靜態站安全標頭實戰：_headers、CSP 與取捨"
description: "靜態站也能認真做安全標頭。本文寫 Cloudflare / Pages 風格的 _headers、CSP 過嚴時的痛，以及本站如何取捨。"
category: "技術實踐"
pubDate: 2026-07-06
updatedDate: 2026-07-25
lang: zh-TW
tags: ["安全", "CSP", "Cloudflare"]
timeToRead: "13 min"
---

靜態站沒有伺服器裡的工作階段邏輯，不代表瀏覽器側可以放飛。點擊劫持、MIME 嗅探、失控的第三方腳本，一樣能搞砸個人站。好消息是：在 GitHub Pages + Cloudflare 一類架構裡，用 `_headers`（或平台等價設定）就能把基線安全標頭鋪到全站。

## 先上基線，再談完美 CSP

我對幾乎所有靜態站都建議至少有：

- **`X-Content-Type-Options: nosniff`**
- **`Referrer-Policy`**（按你想暴露的來源資訊選擇）
- **`X-Frame-Options` 或 CSP 的 `frame-ancestors`**
- **`Permissions-Policy`** 關掉不需要的攝影機、麥克風等

這些標頭成本低、收益清楚。不要等「研究完完美 CSP」才部署它們。

## `_headers` 怎麼理解

Cloudflare Pages 會讀取建置產物裡的 `_headers`，按路徑附加回應標頭。常見做法是把檔案放在 `public/_headers`，建置時複製到輸出目錄。

寫法直覺上像：

```txt
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

路徑可以更細：只對 `/admin/*` 更嚴，對靜態資源更鬆。先全域穩妥，再例外。

## CSP：最有用，也最容易把自己鎖死

Content-Security-Policy 用來限制腳本、樣式、框架、連線去向。理想狀態是：`default-src 'self'`，第三方白名單短而明確。

現實痛點：

- 主題腳本、分析、Turnstile、AdSense、字體 CDN 都要進白名單；
- 內聯腳本需要 hash / nonce，否則 `'unsafe-inline'` 會把銳度磨掉；
- 一處遺漏，生產環境「白屏」，本地卻因為開發伺服器策略不同而沒事。

因此我的策略是：

1. **先列清單**：本站真實會載入的來源（Google Fonts？pagead？Cloudflare Turnstile？）。
2. **按功能開關放寬**：廣告未啟用時，不必提前為所有廣告網域開洞；啟用那天再改標頭與隱私政策。
3. **改 CSP 必做一次真機冒煙**：首頁、一篇文章、關於、聯絡、一個工具頁。
4. **用 Report-Only 過渡**（若你有收集端）觀察違規，再切 enforce。

安全頁與 `security.txt`、PGP、致謝頁屬於另一層「人可讀的安全姿態」；回應標頭是機器可讀的姿態。兩者一起才完整。

## 和第三方的誠實關係

想同時做到：

- 嚴格 CSP；
- 個人化廣告；
- 人機驗證；
- 外連字體；

就要接受白名單變長。這不是失敗，是產品選擇。失敗的是：**口頭說注重安全，標頭檔案卻是空的，或複製了一份三年前的範例從未按網域改過。**

## 靜態站仍要小心的事

- **依賴供應鏈**：`npm` 鎖檔案、少裝偶然腳本；
- **XSS**：Markdown 與 `set:html` 類出口；
- **金鑰**：永遠別把 Token 寫進倉庫；公開站尤其誘惑人把「暫時試試」的 key 留下；
- **重新導向與快取**：錯誤的快取標頭可能讓舊 CSP 黏住使用者。

## AdSense 與 CSP 同場時

若計畫啟用廣告，CSP 往往要放行 `pagead2.googlesyndication.com` 等網域，有時還要面對腳本如何載入的現實約束。建議：

- 廣告關閉時保持緊策略；
- 打開廣告的同一天更新 `_headers`、隱私政策與 `ads.txt`；
- 用無痕視窗確認廣告 iframe 與主文件都符合預期，而不是只看首頁「好像有個空位」。

安全標頭與變現不是對立，而是變更管理問題：一起改、一起測、一起寫進說明。

## 小結

靜態站的安全標頭是高性價比工程：先基線標頭，再逐步收緊 CSP，並為真正啟用的第三方開最小洞。`_headers` 讓策略可進 Git、可審閱、可回滾。安全不是首頁徽章，是每次部署後仍願意打開 Network 面板確認「只載入了我答應載入的東西」。
