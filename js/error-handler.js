// 语言页面错误处理豁免检查
(function checkLanguagePageExemption() {
    const currentPath = window.location.pathname;
    const isLanguagePage = currentPath.match(/^\/(zh-CN|en|it|jp)\/(index\.html)?$/);
    
    if (isLanguagePage) {
        // 为语言页面设置标记，避免误触发错误处理
        window.isLanguagePage = true;
        console.log('检测到语言子目录页面，已禁用部分错误处理逻辑');
    }
})();

window.addEventListener('error', function (e) {
    // 语言页面跳过某些错误处理
    if (window.isLanguagePage && (e.message.includes('404') || e.status === 404)) {
        console.log('语言页面404错误已忽略');
        return;
    }
    
    console.error('页面错误:', e.message);
    // 记录错误日志
    logError(e);
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('未处理的Promise拒绝:', e.reason);
    // 记录错误日志
    logError(e.reason);
});

function logError(error) {
    // 这里可以添加错误上报逻辑
    console.log('错误已记录:', error);

    if (
        error &&
        (error.status === 404 ||
            (error.message && error.message.includes('404')))
    ) {
        handle404();
    }
}

function handle404() {
    console.log('检测到404错误，正在跳转到404页面...');

    // 获取当前URL基础路径，处理GitHub Pages可能的子目录问题
    const basePath = getBasePath();

    // 根据当前URL判断语言版本并跳转到相应的404页面
    const currentPath = window.location.pathname.toLowerCase();

    // 更准确的语言路径检测
    if (
        currentPath.match(/\/en(\/|$)/) ||
        currentPath.match(/\/.*-en\.html$/)
    ) {
        console.log('检测到英文环境，跳转到英文404页面');
        window.location.href = `${basePath}/en/404-en.html`;
    } else if (
        currentPath.match(/\/it(\/|$)/) ||
        currentPath.match(/\/.*-it\.html$/)
    ) {
        console.log('检测到意大利语环境，跳转到意大利语404页面');
        window.location.href = `${basePath}/it/404-it.html`;
    } else if (
        currentPath.match(/\/jp(\/|$)/) ||
        currentPath.match(/\/.*-jp\.html$/)
    ) {
        console.log('检测到日语环境，跳转到日语404页面');
        window.location.href = `${basePath}/jp/404-jp.html`;
    } else {
        // 默认中文或未能识别的语言环境
        console.log('默认跳转到中文404页面');
        window.location.href = `../404.html`;
    }
}

/**
 * 获取网站基础路径
 * 处理GitHub Pages上网站可能处于子目录的情况
 */
function getBasePath() {
    // 检测基础URL路径
    const scriptTags = document.getElementsByTagName('script');
    let basePath = '';

    // 尝试从脚本标签中推断基础路径
    for (let i = 0; i < scriptTags.length; i++) {
        const src = scriptTags[i].src;
        if (src.includes('error-handler.js')) {
            basePath = src.split('error-handler.js')[0].replace('/js/', '');
            break;
        }
    }

    // 如果无法从脚本推断，尝试从当前URL推断
    if (!basePath) {
        const pathSegments = window.location.pathname.split('/');

        // 移除最后一个部分（当前页面名称）
        if (
            pathSegments.length > 0 &&
            pathSegments[pathSegments.length - 1].includes('.')
        ) {
            pathSegments.pop();
        }

        // 对于GitHub Pages上的项目网站，第一个段通常是项目名
        // 例如 https://username.github.io/project/
        if (
            pathSegments.length > 1 &&
            !window.location.hostname.includes('.github.io') &&
            pathSegments[1]
        ) {
            basePath = '/' + pathSegments[1];
        }
    }

    return basePath;
}

// 监听AJAX请求错误 - Github Pages优化版本
document.addEventListener('DOMContentLoaded', function () {
    // 拦截XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        this.addEventListener('load', function () {
            if (this.status === 404) {
                console.error('AJAX请求404错误');
                logError({status: 404, message: 'AJAX请求资源未找到'});
            }
        });
        originalXHROpen.apply(this, arguments);
    };

    // 拦截fetch请求
    const originalFetch = window.fetch;
    window.fetch = function () {
        const fetchPromise = originalFetch.apply(this, arguments);

        fetchPromise
            .catch((error) => {
                console.error('Fetch请求错误:', error);
                logError(error);
            })
            .then((response) => {
                if (response && response.status === 404) {
                    console.error('Fetch请求404错误');
                    logError({status: 404, message: 'Fetch请求资源未找到'});
                }
                return response;
            });

        return fetchPromise;
    };

    // 添加全局链接错误处理
    document.body.addEventListener(
        'click',
        function (e) {
            // 检查点击的是否是链接
            let target = e.target;

            // 向上遍历找到可能的a标签
            while (target && target !== document && target.tagName !== 'A') {
                target = target.parentNode;
            }

            if (target && target.tagName === 'A' && target.href) {
                // 排除外部链接、锚点链接和javascript链接
                const url = new URL(target.href, window.location.origin);
                const isInternalLink =
                    url.origin === window.location.origin &&
                    !target.href.startsWith('javascript:') &&
                    !target.href.startsWith('#') &&
                    !target.getAttribute('download');

                // 排除语言子目录页面和重要页面的预检查
                const isLanguageOrImportantPage = target.href.match(/\/(zh-CN|en|it|jp)\//) ||
                                                 target.href.endsWith('/') ||
                                                 target.href.includes('index.html') ||
                                                 target.href.includes('404.html');

                if (isInternalLink && !target.hasAttribute('data-noerror') && !isLanguageOrImportantPage) {
                    // 为内部链接添加错误处理
                    const originalHref = target.href;

                    // 使用fetch预检查链接是否有效
                    e.preventDefault();

                    fetch(originalHref, {method: 'HEAD'})
                        .then((response) => {
                            if (response.ok) {
                                // 链接有效，继续导航
                                window.location.href = originalHref;
                            } else if (response.status === 404) {
                                // 链接无效，处理404
                                console.error(`链接不存在: ${originalHref}`);
                                // 保存当前请求的URL以帮助语言检测
                                sessionStorage.setItem(
                                    'lastRequestedUrl',
                                    originalHref
                                );
                                logError({
                                    status: 404,
                                    message: '链接指向的资源未找到',
                                    url: originalHref,
                                });
                            } else {
                                // 其他错误状态，仍然导航
                                window.location.href = originalHref;
                            }
                        })
                        .catch((error) => {
                            // 网络错误等，尝试正常导航
                            console.error('链接预检查错误:', error);
                            window.location.href = originalHref;
                        });
                }
            }
        },
        false
    );

    // 添加对直接404响应的检测
    // GitHub Pages会直接返回自定义404页面而不是HTTP状态码
    function checkIfGithubPages404() {
        // 如果是语言页面，跳过404检测
        if (window.isLanguagePage) {
            console.log('语言页面跳过404检测');
            return;
        }
        
        // 在GitHub Pages上，通常会在不存在的URL上加载404.html的内容
        // 检查当前页面是否是404页面的特征
        
        const currentPath = window.location.pathname;
        
        // 排除正常的语言目录页面
        const isValidLanguagePage = currentPath.match(/^\/(zh-CN|en|it|jp)\/(index\.html)?$/);
        const isRootPage = currentPath === '/' || currentPath === '/index.html';
        
        // 只有在确实是404页面时才触发
        const isActual404Page = (currentPath.includes('404.html') || 
                               currentPath.includes('404-')) &&
                               (document.title.includes('404') || 
                                document.title.toLowerCase().includes('not found'));
        
        if (isActual404Page && !isValidLanguagePage && !isRootPage) {
            // 检测到可能是GitHub Pages的404响应
            console.log('检测到GitHub Pages 404页面');
            setTimeout(() => {
                handle404();
            }, 100);
        }
    }

    // 执行检测
    checkIfGithubPages404();

    // 对于GitHub Pages，同样监听DOMContentLoaded以检查404
    window.addEventListener('DOMContentLoaded', checkIfGithubPages404);
});

// 添加更多语言检测辅助函数
function detectLanguageFromUrl(url) {
    if (!url) return 'zh-CN'; // 默认中文

    url = url.toLowerCase();

    if (url.includes('/en/') || url.includes('-en.')) return 'en';
    if (url.includes('/it/') || url.includes('-it.')) return 'it';
    if (url.includes('/jp/') || url.includes('-jp.')) return 'jp';

    // 检查HTML lang属性
    const htmlElement = document.documentElement;
    if (htmlElement && htmlElement.lang) {
        const pageLang = htmlElement.lang.toLowerCase();
        if (pageLang.startsWith('en')) return 'en';
        if (pageLang.startsWith('it')) return 'it';
        if (pageLang.startsWith('ja') || pageLang.startsWith('jp')) return 'jp';
    }

    return 'zh-CN';
}

// 添加多语言错误信息
const errorMessages = {
    'zh-CN': {
        notFound: '页面未找到',
        serverError: '服务器错误',
        networkError: '网络连接错误',
    },
    en: {
        notFound: 'Page not found',
        serverError: 'Server error',
        networkError: 'Network connection error',
    },
    it: {
        notFound: 'Pagina non trovata',
        serverError: 'Errore del server',
        networkError: 'Errore di connessione di rete',
    },
    jp: {
        notFound: 'ページが見つかりません',
        serverError: 'サーバーエラー',
        networkError: 'ネットワーク接続エラー',
    },
};

// 获取当前语言的错误信息
function getErrorMessage(key) {
    // 尝试从URL、会话存储或HTML lang属性获取语言
    let lastRequestedUrl = sessionStorage.getItem('lastRequestedUrl') || '';
    let language = detectLanguageFromUrl(
        lastRequestedUrl || window.location.pathname
    );

    return errorMessages[language][key] || errorMessages['zh-CN'][key];
}
