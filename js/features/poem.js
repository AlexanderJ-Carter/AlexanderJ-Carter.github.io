function initPoemAndHistory() {
    // 加载诗词
    jinrishici.load(function (result) {
        const sentence = document.querySelector('#poem_sentence');
        const info = document.querySelector('#poem_info');

        if (sentence && info) {
            sentence.innerHTML = result.data.content;
            info.innerHTML = `【${result.data.origin.dynasty}】${result.data.origin.author}《${result.data.origin.title}》`;

            // 添加淡入动画
            sentence.style.opacity = 0;
            info.style.opacity = 0;

            setTimeout(() => {
                sentence.style.transition = 'opacity 0.8s ease';
                sentence.style.opacity = 1;
            }, 300);

            setTimeout(() => {
                info.style.transition = 'opacity 0.8s ease';
                info.style.opacity = 1;
            }, 600);
        }
    });

    // 加载历史上的今天（使用 Wikipedia REST v1 On This Day，支持多语言与回退）
    function getTodayInHistory() {
        const historyEl = document.querySelector('#history-today');
        if (!historyEl) return;

        const now = new Date();
        const monthNum = now.getMonth() + 1; // 1-12
        const dayNum = now.getDate(); // 1-31

        // 根据页面语言选择 API 语言
        const docLang = (
            document.documentElement.lang || 'zh-CN'
        ).toLowerCase();
        const lang = docLang.startsWith('en')
            ? 'en'
            : docLang.startsWith('ja')
            ? 'ja'
            : docLang.startsWith('it')
            ? 'it'
            : 'zh';

        // 本地静态缓存文件（可选）
        const localJson = `/data/history/${monthNum}-${dayNum}.json`;

        // REST v1 端点（CORS 兼容更好）
        const endpoint = (l) =>
            `https://${l}.wikipedia.org/api/rest_v1/feed/onthisday/events/${monthNum}/${dayNum}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        let didRender = false;
        function render(items) {
            if (!Array.isArray(items) || items.length === 0) {
                const msg =
                    lang === 'en'
                        ? 'No events available today'
                        : lang === 'ja'
                        ? '本日の出来事はありません'
                        : lang === 'it'
                        ? 'Nessun evento disponibile oggi'
                        : '今天暂无事件数据';
                historyEl.innerHTML = `<div class="history-event">${msg}</div>`;
                didRender = true;
                return;
            }
            const item = items[Math.floor(Math.random() * items.length)];
            const year = item.year || '';
            const text =
                item.text ||
                (item.pages && item.pages[0] && item.pages[0].displaytitle) ||
                '历史事件';
            const dateLabel = (function () {
                if (lang === 'zh' || lang === 'ja')
                    return `${year ? year + '年 ' : ''}${monthNum}/${dayNum}`;
                if (lang === 'it')
                    return `${dayNum}/${monthNum}${year ? ' ' + year : ''}`;
                return `${monthNum}/${dayNum}${year ? ' ' + year : ''}`; // en default
            })();
            historyEl.innerHTML = `<div class="history-date">${dateLabel}</div>
                                   <div class="history-event">${text}</div>`;
            didRender = true;

            // 动画
            historyEl.style.opacity = 0;
            setTimeout(() => {
                historyEl.style.transition = 'opacity 0.8s ease';
                historyEl.style.opacity = 1;
            }, 300);
        }

        // 1) localStorage 缓存（6 小时）
        const cacheKey = `history:${lang}:${monthNum}-${dayNum}`;
        try {
            const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
            if (cached && Date.now() - cached.ts < 6 * 60 * 60 * 1000) {
                render(cached.events);
                return;
            }
        } catch {}

        // 2) 静态文件回退（可选）
        fetch(localJson, { headers: { accept: 'application/json' } })
            .then((r) => (r.ok ? r.json() : Promise.reject('no-local')))
            .then((data) => render(data && data.events))
            .catch(() => {
                // 3) 维基百科：先本地语言，再英文
                fetch(endpoint(lang), {
                    signal: controller.signal,
                    headers: { accept: 'application/json' },
                })
                    .then((r) =>
                        r.ok
                            ? r.json()
                            : Promise.reject(new Error('HTTP ' + r.status))
                    )
                    .then((data) => {
                        render(data && data.events);
                        try {
                            localStorage.setItem(
                                cacheKey,
                                JSON.stringify({
                                    ts: Date.now(),
                                    events: (data && data.events) || [],
                                })
                            );
                        } catch {}
                    })
                    .catch(() => {
                        fetch(endpoint('en'), {
                            headers: { accept: 'application/json' },
                        })
                            .then((r) =>
                                r.ok
                                    ? r.json()
                                    : Promise.reject(
                                          new Error('HTTP ' + r.status)
                                      )
                            )
                            .then((data) => {
                                render(data && data.events);
                                try {
                                    localStorage.setItem(
                                        cacheKey,
                                        JSON.stringify({
                                            ts: Date.now(),
                                            events: (data && data.events) || [],
                                        })
                                    );
                                } catch {}
                            })
                            .catch((error) => {
                                console.error(
                                    'Error fetching historical event:',
                                    error
                                );
                                const errMsg =
                                    lang === 'en'
                                        ? 'Failed to load historical data'
                                        : lang === 'ja'
                                        ? '歴史データの取得に失敗しました'
                                        : lang === 'it'
                                        ? 'Impossibile caricare i dati storici'
                                        : '历史数据获取失败';
                                historyEl.innerHTML = `<div class=\"history-event\">${errMsg}</div>`;
                                didRender = true;
                            })
                            .finally(() => clearTimeout(timeoutId));
                    });
            });

        // 最终兜底：若 8 秒后仍未渲染任何内容，显示日期占位
        setTimeout(() => {
            if (!didRender) {
                const fallback =
                    lang === 'en'
                        ? `Today: ${monthNum}/${dayNum}`
                        : lang === 'ja'
                        ? `本日: ${monthNum}/${dayNum}`
                        : lang === 'it'
                        ? `Oggi: ${dayNum}/${monthNum}`
                        : `今天: ${monthNum}/${dayNum}`;
                historyEl.innerHTML =
                    `<div class=\"history-date\">${fallback}</div><div class=\"history-event\">` +
                    (lang === 'en'
                        ? '未能获取历史事件'
                        : lang === 'ja'
                        ? '出来事を取得できませんでした'
                        : lang === 'it'
                        ? 'Impossibile ottenere gli eventi storici'
                        : '未能获取历史事件') +
                    `</div>`;
            }
        }, 8000);
    }

    getTodayInHistory();

    // 设置背景图片
    function updateBackgroundImage() {
        const poemSection = document.querySelector('.poem-history-section');
        if (!poemSection) return;

        const keywords = ['nature', 'sky', 'mountains', 'forest', 'flowers'];
        const keyword = keywords[Math.floor(Math.random() * keywords.length)];

        fetch(
            `https://api.unsplash.com/photos/random?query=${keyword}&client_id=EdmgsPIwdA-ys_S2lRWjkqQJgNwDJSUSPLgWMJPJ1lg`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data && data.urls && data.urls.regular) {
                    poemSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${data.urls.regular})`;
                    poemSection.style.backgroundSize = 'cover';
                    poemSection.style.backgroundPosition = 'center';
                }
            })
            .catch((error) => {
                console.error('Error fetching background image:', error);
            });
    }

    // 初始化背景图片
    updateBackgroundImage();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPoemAndHistory);
} else {
    initPoemAndHistory();
}
