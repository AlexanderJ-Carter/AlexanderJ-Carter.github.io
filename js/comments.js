/**
 * 评论系统相关功能
 * 处理 Giscus 评论加载、显示和交互
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 延迟初始化，确保 Giscus 脚本先执行
    setTimeout(() => {
        initCommentContainer();
        setupGiscusMessageListener();
    }, 100);
});

/**
 * 初始化评论容器
 */
function initCommentContainer() {
    console.log('初始化评论容器...');
    const commentContainer = document.getElementById('comments-container');

    if (commentContainer) {
        console.log('找到评论容器!');

        // 检查是否已经有 Giscus 组件加载
        const existingGiscus = commentContainer.querySelector(
            '.giscus, .giscus-frame, iframe[src*="giscus"]'
        );

        if (!existingGiscus) {
            // 只有在没有 giscus 组件时才显示加载提示
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'text-center p-4 comments-loading';
            loadingMsg.innerHTML = `
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border text-primary me-3" role="status" style="width: 2rem; height: 2rem;">
                        <span class="visually-hidden">加载中...</span>
                    </div>
                    <span class="text-muted fs-6">评论区域正在加载，请稍候...</span>
                </div>
            `;
            commentContainer.appendChild(loadingMsg);

            // 定期检查 Giscus 是否已加载
            checkGiscusLoaded();
        } else {
            console.log('Giscus 已经加载，跳过加载提示');
        }
    } else {
        console.error(
            '找不到评论容器! 请检查HTML中是否有id为"comments-container"的元素。'
        );
    }
}

/**
 * 定期检查 Giscus 是否已加载
 */
function checkGiscusLoaded() {
    const maxAttempts = 30; // 最多检查30次（15秒）
    let attempts = 0;

    const checkInterval = setInterval(() => {
        attempts++;
        const commentContainer = document.getElementById('comments-container');

        if (commentContainer) {
            // 检查多种可能的 Giscus 元素
            const giscusElements = commentContainer.querySelectorAll(
                '.giscus, .giscus-frame, iframe[src*="giscus"], .giscus-loading'
            );

            // 如果找到 Giscus 相关元素（除了loading），说明已加载
            const loadedElements = Array.from(giscusElements).filter(
                (el) => !el.classList.contains('giscus-loading')
            );

            if (loadedElements.length > 0) {
                console.log('检测到 Giscus 已加载');
                removeLoadingMessage();
                clearInterval(checkInterval);
                return;
            }

            // 也检查是否有iframe（Giscus会创建iframe）
            const iframes = commentContainer.querySelectorAll('iframe');
            if (iframes.length > 0) {
                console.log('检测到 Giscus iframe');
                removeLoadingMessage();
                clearInterval(checkInterval);
                return;
            }
        }

        // 超时后停止检查并显示提示
        if (attempts >= maxAttempts) {
            console.log('Giscus 加载超时');
            showTimeoutMessage();
            clearInterval(checkInterval);
        }
    }, 500); // 每500ms检查一次
}

/**
 * 移除加载消息
 */
function removeLoadingMessage() {
    const commentContainer = document.getElementById('comments-container');
    if (commentContainer) {
        const loadingElements = commentContainer.querySelectorAll('.comments-loading');
        loadingElements.forEach((el) => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease';
            setTimeout(() => el.remove(), 300);
        });
        console.log('已移除加载提示');
    }
}

/**
 * 显示超时消息
 */
function showTimeoutMessage() {
    const commentContainer = document.getElementById('comments-container');
    if (commentContainer) {
        // 移除加载提示
        const loadingElements = commentContainer.querySelectorAll('.comments-loading');
        loadingElements.forEach((el) => el.remove());

        // 显示超时提示
        const timeoutMsg = document.createElement('div');
        timeoutMsg.className = 'alert alert-info text-center';
        timeoutMsg.innerHTML = `
            <div class="d-flex justify-content-center align-items-center">
                <i class="fas fa-clock me-2"></i>
                <span>评论系统加载时间较长，请稍后刷新页面重试。</span>
            </div>
        `;
        commentContainer.appendChild(timeoutMsg);
    }
}

/**
 * 设置Giscus消息监听器
 */
function setupGiscusMessageListener() {
    window.addEventListener('message', function (e) {
        if (e.origin !== 'https://giscus.app') return;

        if (e.data && e.data.giscus) {
            const giscusData = e.data.giscus;
            console.log('收到Giscus消息:', giscusData);

            // 根据消息类型处理
            if (giscusData.error) {
                handleGiscusError(giscusData);
            } else {
                handleGiscusSuccess(giscusData);
            }
        }
    });
}

/**
 * 处理Giscus加载成功
 */
function handleGiscusSuccess(data) {
    console.log('Giscus通过消息确认加载成功');
    removeLoadingMessage();
}

/**
 * 处理Giscus加载错误
 */
function handleGiscusError(data) {
    console.error('Giscus加载失败:', data.message || '未知错误');
    const commentContainer = document.getElementById('comments-container');
    if (commentContainer) {
        // 清除加载提示
        const loadingElements = commentContainer.querySelectorAll('.comments-loading');
        loadingElements.forEach((el) => el.remove());

        // 显示错误提示
        const errorMsg = document.createElement('div');
        errorMsg.className = 'alert alert-warning text-center';
        errorMsg.innerHTML = `
            <div class="d-flex justify-content-center align-items-center">
                <i class="fas fa-exclamation-triangle me-2 text-warning"></i>
                <span>评论系统暂时无法加载，请稍后再试。</span>
            </div>
        `;
        commentContainer.appendChild(errorMsg);
    }
}

// 导出可能在其他地方需要使用的函数
window.CommentsManager = {
    initCommentContainer,
    removeLoadingMessage,
    reloadComments: function () {
        const iframe = document.querySelector('.giscus-frame');
        if (iframe) {
            iframe.src = iframe.src;
        }
    },
};
