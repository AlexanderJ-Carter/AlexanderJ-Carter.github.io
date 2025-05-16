/**
 * 验证页面特定的脚本
 * 处理 Cloudflare Turnstile 回调和页面交互
 */

// 在页面加载时确保清除任何潜在的验证状态
document.addEventListener('DOMContentLoaded', function () {
    // 清除所有可能的验证状态，确保每次访问都需要验证
    clearAllVerifications();
});

// 获取URL中的重定向参数
const urlParams = new URLSearchParams(window.location.search);
const redirectPage = urlParams.get('redirect') || 'index.html';

// 清除所有可能的验证状态
function clearAllVerifications() {
    clearVerification('profile_verified');
    clearVerification('contact_verified');
    // 可以添加其他敏感页面的验证标识符
}

// 自动跳转倒计时函数
function startAutoRedirect(seconds) {
    const countdownEl = document.getElementById('countdown');
    const autoRedirectText = document.getElementById('auto-redirect-text');
    let remainingSeconds = seconds;

    // 显示倒计时文本
    autoRedirectText.style.display = 'flex';
    countdownEl.textContent = remainingSeconds;

    // 开始倒计时
    const countdownInterval = setInterval(() => {
        remainingSeconds--;
        countdownEl.textContent = remainingSeconds;

        if (remainingSeconds <= 0) {
            clearInterval(countdownInterval);
            window.location.href = redirectPage;
        }
    }, 1000);

    // 保存倒计时间隔器ID，以便在需要时清除
    window.countdownIntervalId = countdownInterval;
}

// 当Turnstile验证成功时的回调函数
function onTurnstileSuccess(token) {
    // 显示加载指示器
    document.getElementById('loading-indicator').style.display = 'block';

    // 验证过程 - 这里我们直接设置验证成功
    // 在实际应用中，您应该将token发送到服务器验证
    setTimeout(function () {
        // 隐藏加载指示器
        document.getElementById('loading-indicator').style.display = 'none';

        // 根据重定向页面设置相应的验证标记
        if (redirectPage.includes('profile')) {
            setVerified('profile_verified');
        } else if (redirectPage.includes('contact')) {
            setVerified('contact_verified');
        }

        // 显示继续按钮
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.style.display = 'inline-block';

        // 设置继续按钮点击事件
        continueBtn.addEventListener('click', function () {
            // 如果有正在进行的倒计时，清除它
            if (window.countdownIntervalId) {
                clearInterval(window.countdownIntervalId);
            }
            window.location.href = redirectPage;
        });

        // 开始自动跳转倒计时
        startAutoRedirect(5);
    }, 1500);
}
