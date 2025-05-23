/**
 * 评论系统相关功能
 * 处理 Giscus 评论加载、显示和交互
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 初始化评论区域
    initCommentContainer();

    // 监听 Giscus 消息
    setupGiscusMessageListener();
});

/**
 * 初始化评论容器
 */
function initCommentContainer() {
    console.log('初始化评论容器...');
    const commentContainer = document.getElementById('comments-container');

    if (commentContainer) {
        console.log('找到评论容器!');

        // 清除现有内容，避免重复显示
        if (!commentContainer.querySelector('.giscus')) {
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
        }
    } else {
        console.error(
            '找不到评论容器! 请检查HTML中是否有id为"comments-container"的元素。'
        );
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
    console.log('Giscus加载成功');
    const commentContainer = document.getElementById('comments-container');
    if (commentContainer) {
        // 移除加载提示
        const loadingElements =
            commentContainer.querySelectorAll('.comments-loading');
        loadingElements.forEach((el) => el.remove());
    }
}

/**
 * 处理Giscus加载错误
 */
function handleGiscusError(data) {
    console.error('Giscus加载失败:', data.message || '未知错误');
    const commentContainer = document.getElementById('comments-container');
    if (commentContainer) {
        // 清除所有内容
        commentContainer.innerHTML = '';

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

// 监听 Giscus iframe 加载完成
setTimeout(() => {
    const giscusFrame = document.querySelector('.giscus-frame');
    if (giscusFrame) {
        console.log('Giscus iframe 已加载');
        handleGiscusSuccess({});
    }
}, 3000); // 3秒后检查是否已加载

// 导出可能在其他地方需要使用的函数
window.CommentsManager = {
    initCommentContainer,
    reloadComments: function () {
        const iframe = document.querySelector('.giscus-frame');
        if (iframe) {
            iframe.src = iframe.src;
        }
    },
};
