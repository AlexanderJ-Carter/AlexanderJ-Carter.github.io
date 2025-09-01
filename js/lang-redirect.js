/* Language routing helper
 * - Runs only on site root (/, /index.html)
 * - If ?lang=xx is present, store preference and route
 * - Else, if no stored preference, detect from navigator.languages and route non-zh users
 * - Preferences stored in localStorage key 'site:lang'
 */
(function () {
    try {
        var path = location.pathname || '/';
        var isRoot = path === '/' || path === '/index.html';

        // Map from lang to URLs in current site structure
        function resolveUrl(lang) {
            switch (lang) {
                case 'en':
                    return '/en/';
                case 'it':
                    return '/it/';
                case 'ja':
                    return '/jp/';
                case 'fr':
                    return '/en/'; // 临时重定向到英文，直到法语版完成
                case 'de':
                    return '/en/'; // 临时重定向到英文，直到德语版完成
                case 'es':
                    return '/en/'; // 临时重定向到英文，直到西语版完成
                case 'ru':
                    return '/en/'; // 临时重定向到英文，直到俄语版完成
                case 'zh':
                default:
                    return '/zh-CN/';
            }
        }

        function normalizeLang(code) {
            if (!code) return 'zh';
            code = String(code).toLowerCase();
            if (code.startsWith('en')) return 'en';
            if (code.startsWith('it')) return 'it';
            if (code.startsWith('ja') || code.startsWith('jp')) return 'ja';
            if (code.startsWith('fr')) return 'fr';
            if (code.startsWith('de')) return 'de';
            if (code.startsWith('es')) return 'es';
            if (code.startsWith('ru')) return 'ru';
            if (code.startsWith('zh')) return 'zh';
            return 'en';
        }

        var params = new URLSearchParams(location.search || '');
        var qpLang = params.get('lang');
        if (qpLang) {
            var ln = normalizeLang(qpLang);
            try {
                localStorage.setItem('site:lang', ln);
            } catch {}
            var target = resolveUrl(ln);
            if (isRoot) {
                location.replace(target);
            }
            return;
        }

        // Attach click-to-remember behavior (optional, no-op if no matching elements)
        document.addEventListener(
            'click',
            function (e) {
                var t = e.target;
                if (t && t.closest) {
                    var el = t.closest('[data-lang]');
                    if (el) {
                        var lang = normalizeLang(el.getAttribute('data-lang'));
                        try {
                            localStorage.setItem('site:lang', lang);
                        } catch {}
                    }
                }
            },
            { passive: true }
        );

        if (!isRoot) return;

        // Only auto-route on root if user has no explicit preference
        var pref = null;
        try {
            pref = localStorage.getItem('site:lang');
        } catch {}
        if (!pref) {
            var langs =
                navigator.languages && navigator.languages.length
                    ? navigator.languages
                    : [navigator.language || 'en'];
            var best = normalizeLang(langs[0]);
            if (best !== 'zh') {
                location.replace(resolveUrl(best));
            }
        }
    } catch (e) {
        // Silently ignore routing errors to avoid blocking content
        console && console.debug && console.debug('lang-redirect skipped:', e);
    }
})();
