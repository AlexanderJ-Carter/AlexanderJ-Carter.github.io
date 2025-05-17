/**
 * GitHub Pages 404 检测器
 * 检测并处理GitHub Pages上的404错误
 */
(function () {
    // 检测当前是否可能是GitHub Pages的404
    function detectGithubPages404() {
        // 如果URL包含正常的文件扩展名但返回了404页面，那很可能是404
        const path = window.location.pathname;
        const hasFileExtension = /\.[a-z]+$/i.test(path);

        // 检查页面是否具有404页面的特征
        const pageTitle = document.title || '';
        const pageContent = document.body ? document.body.innerText : '';

        const is404Page =
            pageTitle.includes('404') ||
            pageTitle.toLowerCase().includes('not found') ||
            pageContent.includes('404') ||
            // GitHub Pages自动生成的默认404页面特征
            pageContent.includes('File not found') ||
            pageContent.includes('Page not found');

        if (hasFileExtension && is404Page) {
            console.log('检测到可能是GitHub Pages 404页面:', path);
            redirectTo404();
        }
    }

    // 重定向到适当的404页面
    function redirectTo404() {
        const path = window.location.pathname.toLowerCase();
        let redirectUrl = '/404.html'; // 默认中文

        if (
            path.match(/\/en\//) ||
            path.match(/\/en-.*\.html$/) ||
            path.match(/\/.*-en\.html$/)
        ) {
            redirectUrl = '/en/404-en.html';
        } else if (
            path.match(/\/it\//) ||
            path.match(/\/it-.*\.html$/) ||
            path.match(/\/.*-it\.html$/)
        ) {
            redirectUrl = '/it/404-it.html';
        } else if (
            path.match(/\/jp\//) ||
            path.match(/\/jp-.*\.html$/) ||
            path.match(/\/.*-jp\.html$/)
        ) {
            redirectUrl = '/jp/404-jp.html';
        }

        // 处理GitHub Pages项目子路径
        const projectPath = detectProjectPath();

        // 检查我们是否已在相应的404页面上，以避免无限循环
        if (!window.location.pathname.endsWith(redirectUrl.split('/').pop())) {
            console.log(`重定向到: ${projectPath}${redirectUrl}`);
            window.location.replace(`${projectPath}${redirectUrl}`);
        }
    }

    // 检测GitHub Pages项目路径
    function detectProjectPath() {
        let projectPath = '';

        // 从脚本标签推断
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].src;
            if (src && src.includes('404-detector.js')) {
                const urlParts = new URL(src).pathname.split('/');
                if (urlParts.length > 2) {
                    projectPath = '/' + urlParts[1];
                }
                break;
            }
        }

        // 如果无法从脚本推断，尝试从URL推断
        if (!projectPath) {
            const hostParts = window.location.hostname.split('.');
            if (
                hostParts[0] !== 'localhost' &&
                !(hostParts[1] === 'github' && hostParts[2] === 'io') &&
                window.location.pathname.split('/')[1]
            ) {
                projectPath = '/' + window.location.pathname.split('/')[1];
            }
        }

        return projectPath;
    }

    // 监听DOMContentLoaded事件来检测404
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detectGithubPages404);
    } else {
        // 文档已加载完成
        detectGithubPages404();
    }

    // 也监听load事件以防某些情况下DOMContentLoaded不触发
    window.addEventListener('load', detectGithubPages404);
})();
