---
title: 'Darkroom Folio：把暗房語言寫進個人站'
description: '藍曬紙色、膠片邊、folio 標記——本站視覺系統不是皮膚，而是一套可複用的編輯室語法。'
category: '設計思考'
pubDate: 2026-08-07
lang: zh-TW
tags: ['設計系統', 'Darkroom Folio', '個人站']
timeToRead: '11 min'
---

個人站很容易長成兩種極端：要么像 SaaS 儀表板，要么像空白 Notion 頁。我在 2026 年的改版裡選了一條中間路——**Darkroom Folio**：用暗房與沖印室的隱喻，把攝影、寫作、工具頁收進同一套視覺語法。

這不是換一套 Tailwind 主題色那麼簡單。它回答的是：**訪客進入任意頁面時，能否感到「仍在同一間編輯室」？**

## 三個錨點：Expose / Focus / Print

首頁「暗房三法則」不是裝飾文案，而是整站的決策順序：

1. **Expose（曝光）** — 第一屏只給一件事：真實影像或一句主命題。
2. **Focus（對焦）** — 每個版塊只做一件事；標題用 folio 標記編號，而不是無限嵌套卡片。
3. **Print（出片）** — 細節在「沖印階段」收斂：字體階、邊框、film-edge 分隔。

任何新頁面上線前，我會問：它屬於曝光、對焦還是出片？如果三項都想做，通常說明資訊架構還沒收乾淨。

## 視覺 token：藍曬紙，不是「深色模式反色」

Darkroom Folio 的底色靈感來自藍曬紙：冷中性、略帶化學感。強調色只給行動；深色模式單獨調階；film-edge 是章節標點，替代到處拉分割線。

## folio-mark：讓導航像翻冊子

`folio-mark` 是小號等寬標記（如 `01 · Studio`）。About 頁的個人檔案區用 `02 · Person` 預留空白槽位——空態也是設計的一部分，用「待寫入」而不是 Lorem ipsum。

## 與功能頁的邊界

工具頁允許更「面板感」，但仍沿用 PageHero + 同一 footer/header。Next 實驗區可以更大膽，但通過 `/next` 門口與主站隔開。

## 小結

Darkroom Folio 把個人站從「頁面集合」變成「一冊正在沖印的 folio」。Expose / Focus / Print 是工作流，藍曬紙 token 與 folio-mark 是語法，空槽位是誠實維護的前提。
