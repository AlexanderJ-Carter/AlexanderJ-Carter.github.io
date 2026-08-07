---
title: 'Архитектура сайта: GitHub Pages и Cloudflare вместе'
description: 'От Markdown до глобального edge. Почему сайт статически генерируется, как деплоится и где границы.'
category: 'Technical Practice'
pubDate: 2026-07-10
updatedDate: 2026-08-07
lang: ru
tags: ['архитектура', 'GitHub Pages', 'Cloudflare']
timeToRead: '12 min'
---

« Какой backend у alexander.xin? » Коротко: обычно никакого классического. Длинно — этот текст: контент, сборка, стек GitHub Pages + Cloudflare.

## Целевая форма

Личный сайт:

- **Дёшево и долговечно** — переживает каникулы без внимания;
- **Быстро** — без налога гидратации на document-страницах;
- **Аудируемо** — конфиг в Git, заголовки и redirects на ревью;
- **Расширяемо** — Workers, формы, реклама позже без переписывания всего.

→ Astro SSG + build в Git + Cloudflare спереди (DNS, cache, защита).

## На сборке

Astro компилирует:

- маршруты `src/pages`;
- layouts в `templates`;
- Markdown `content/writing`;
- строки `i18n`;

в статическое дерево: HTML, CSS, мало JS, изображения, сырой `public/` (`ads.txt`, `_headers`, `.well-known`).

Не «запрос → БД → about». About — HTML на build.

## Роль GitHub Pages

Репозиторий — source of truth. Pages отдаёт output. Для личного: знакомые права, PR, контролируемая цена.

Следить: custom domain + HTTPS, `404`, без секретов в логах Actions.

## Роль Cloudflare

Перед доменом:

- **DNS и proxy**;
- **Edge cache и сжатие**;
- **WAF / боты** (по плану);
- **`_headers`, redirects, Workers** при необходимости.

Понимать cache HTML vs hashed assets — «устаревшая» статья после publish? сначала cache, потом build.

## Динамика на edge, не SSR везде

Формы, Turnstile, особые redirects без sitewide SSR:

- Страницы статичны;
- Отправки → третья сторона или Worker;
- Клиентская верификация (About/Contact на этом сайте).

Ad-скрипты gated на build: нет id — нет инъекции.

## От чего отказался

- **Runtime CMS** — Markdown + Git;
- **Тяжёлый TMS** — пять языков UI достаточно; long-form сначала на китайском;
- **Микросервисы-демо** — статические файлы хватают.

## Когда ломается

1. Build зелёный? (`build` / `astro check`)
2. Правильная ветка / окружение?
3. Cache или правила Cloudflare?
4. 404 только на одной локали?

Отладка по слоям.

## Цена сложности

Деньги ~ ноль (по трафику), но:

- DNS, cache, логи Pages нужно понимать;
- Нет admin UI — Markdown + PR;
- Ты владеешь headers и зависимостями.

Мне подходит: контроль, переносимость. Смена хоста = копирование файлов.

## Карта репо

- `src/content/writing`: long-form;
- `src/components/templates`: форма страниц;
- `src/pages`: тонкие маршруты;
- `public/`: сырьё, `_headers`, `ads.txt`;
- Workers: только где нужна динамика.

Читать папки лучше диаграмм.

## Деплой и ожидания

Статика ≠ мгновенно везде. После merge — минуты: DNS, очередь build, purge cache.

## Миграция

Output = файлы → скопировать `dist` или перенаправить DNS. Контент в Git — актив; хост — сменная «труба».

## Итог

Архитектура намеренно скучная: статические файлы, надёжный хостинг, Cloudflare на edge. Скука освобождает время для текста и фото. Сначала заставь работать этот путь — Workers и БД потом. Часто хватает HTML.
