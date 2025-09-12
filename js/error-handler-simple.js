// 简化版错误处理脚本 - 临时修复版本

console.log('错误处理脚本已加载（简化版）');

window.addEventListener('error', function (e) {
    console.error('页面错误:', e.message);
    // 记录错误但不自动跳转
    console.log('错误已记录（无自动跳转）:', e);
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('未处理的Promise拒绝:', e.reason);
    // 记录错误但不自动跳转
    console.log('错误已记录（无自动跳转）:', e.reason);
});

// 禁用所有自动404检测和跳转逻辑
console.log('自动404检测已禁用，防止误跳转');
