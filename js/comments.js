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

        // 添加加载状态样式
        commentContainer.style.position = 'relative';
        commentContainer.style.minHeight = '200px';
        commentContainer.style.transition = 'all 0.3s ease';

        // 显示加载提示
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'text-center p-4';
        loadingMsg.innerHTML = `
            <div class="spinner-border text-primary mb-2" role="status">
                <span class="visually-hidden">加载中...</span>
            </div>
            <p class="text-muted">评论区域正在加载，请稍候...</p>
        `;
        commentContainer.appendChild(loadingMsg);
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

            // 消息类型处理
            switch (giscusData.error) {
                case true:
                    handleGiscusError(giscusData);
                    break;
                default:
                    handleGiscusSuccess(giscusData);
                    break;
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
        // 清除初始加载提示
        commentContainer
            .querySelectorAll('.text-center.p-4')
            .forEach((el) => el.remove());
    }
}

/**
 * 处理Giscus加载错误
 */
function handleGiscusError(data) {
    console.error('Giscus加载失败:', data.message || '未知错误');
    const commentContainer = document.getElementById('comments-container');
    if (commentContainer) {
        // 显示错误提示
        commentContainer.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                评论系统加载失败。请检查您的网络连接或稍后再试。
            </div>
        `;
    }
}

// 导出可能在其他地方需要使用的函数
window.CommentsManager = {
    initCommentContainer,
    reloadComments: function () {
        const iframe = document.querySelector('.giscus-frame');
        if (iframe) iframe.src = iframe.src;
    },
};
