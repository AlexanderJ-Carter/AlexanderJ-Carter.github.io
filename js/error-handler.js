window.addEventListener('error', function(e) {
    console.error('页面错误:', e.message);
    // 记录错误日志
    logError(e);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
    // 记录错误日志
    logError(e.reason);
});

function logError(error) {
    // 这里可以添加错误上报逻辑
    console.log('错误已记录:', error);
}

// 处理404错误
function handle404() {
    window.location.href = '/404.html';
}