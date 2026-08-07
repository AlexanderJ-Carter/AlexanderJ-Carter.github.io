---
title: 'Security headers на статических сайтах: _headers, CSP и компромиссы'
description: 'Статический сайт может серьёзно относиться к заголовкам. _headers Cloudflare/Pages, боль строгого CSP и баланс на этом сайте.'
category: 'Technical Practice'
pubDate: 2026-07-06
updatedDate: 2026-08-07
lang: ru
tags: ['безопасность', 'CSP', 'Cloudflare']
timeToRead: '13 min'
---

Нет серверных сессий — не значит игнорировать браузер. Clickjacking, MIME sniffing, сторонние скрипты — личный сайт тоже страдает. Хорошая новость: GitHub Pages + Cloudflare, `_headers` раздаёт базовые заголовки по всему сайту.

## Baseline сначала, идеальный CSP потом

Минимум:

- **`X-Content-Type-Options: nosniff`**
- **`Referrer-Policy`** по задаче
- **`X-Frame-Options` или CSP `frame-ancestors`**
- **`Permissions-Policy`** без лишних сенсоров

Дешёво и полезно. Не жди «идеальный CSP» для деплоя.

## Как думать про `_headers`

Cloudflare Pages читает `_headers` из build output. Файл в `public/_headers`, копируется при сборке.

```txt
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

Сначала глобально безопасно, потом исключения.

## CSP: полезен и легко заблокировать себя

CSP ограничивает script, style, frame, connect. Идеал: `default-src 'self'`, короткий allowlist.

Реальная боль:

- Тема, analytics, Turnstile, AdSense, font CDN — каждому строка;
- Inline = hash/nonce или `'unsafe-inline'`, ослабляющий политику;
- Один пропуск — белый экран в prod.

Стратегия:

1. **Инвентарь реальных источников**
2. **Расширять по feature flag** — не открывать ad-домены заранее
3. **Smoke test** после изменений — главная, статья, contact, tool
4. **Report-Only**, если есть сборщик

Security-страницы, `security.txt`, PGP — человеческая поза; заголовки — машинная. Вместе.

## Честно про третьи стороны

Строгий CSP + реклама + Turnstile + внешние шрифты = длинный allowlist. Продуктовый выбор, не провал. Провал — бейдж «security» при пустых или трёхлетних заголовках.

## Статика всё равно требует внимания

- **Supply chain**: lockfiles
- **XSS**: Markdown и `set:html`
- **Секреты**: не в публичный repo
- **Кэш**: старый CSP прилипает к пользователям

## AdSense + CSP

Включая рекламу — `pagead2.googlesyndication.com` и др. В тот же день: `_headers`, privacy policy, `ads.txt`. Проверить iframe в приватном окне.

## HSTS и TLS

HTTPS-редиректы, HSTS когда цепочка стабильна. Без mixed content.

## Документировать изменения

Коммит: «CSP: Turnstile на contact» — не «update headers».

## security.txt

`/.well-known/security.txt` — как связаться. Заголовки защищают пользователей; security.txt — когда нашли реальную дыру.

## Итог

Security headers на статике — высокий рычаг: baseline, постепенный CSP, минимум дыр для включённых третьих сторон. `_headers` в Git, ревью, откат. Безопасность — открыть Network после deploy и проверить, что загрузилось только обещанное.
