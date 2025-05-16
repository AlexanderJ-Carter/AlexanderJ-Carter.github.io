/**
 * 验证页面特定的脚本
 * 处理 Cloudflare Turnstile 回调和页面交互
 */

// 在页面加载时确保清除任何潜在的验证状态
document.addEventListener('DOMContentLoaded', function () {
    // 清除所有可能的验证状态，确保每次访问都需要验证
    clearAllVerifications();

    // 根据目标页面语言调整验证页面文字
    adjustLanguageBasedOnRedirect();
});

// 获取URL中的重定向参数
const urlParams = new URLSearchParams(window.location.search);
const redirectPage = urlParams.get('redirect') || 'index.html';

// 清除所有可能的验证状态
function clearAllVerifications() {
    // 中文版
    clearVerification('profile_verified');
    clearVerification('contact_verified');

    // 英文版
    clearVerification('profile_en_verified');
    clearVerification('contact_en_verified');

    // 意大利文版
    clearVerification('profile_it_verified');
    clearVerification('contact_it_verified');
}

// 根据目标页面语言调整验证页面文字
function adjustLanguageBasedOnRedirect() {
    // 当前页面元素
    const titleElement =
        document.querySelector('.verification-title i + span') ||
        document.querySelector('.verification-title');
    const textElement = document.querySelector('.verification-text');
    const continueBtn = document.getElementById('continue-btn');
    const loadingText = document.querySelector('.loading-indicator p');
    const autoRedirectText = document.getElementById('auto-redirect-text');
    const countdownText = document.getElementById('countdown-text');
    const securityInfo = document.querySelector('.security-info');

    // 根据重定向目标调整语言
    if (redirectPage.includes('/en/')) {
        // 英文界面
        if (titleElement) titleElement.textContent = 'Human Verification';
        if (textElement)
            textElement.textContent =
                'To ensure website security and provide a better browsing experience, please complete the verification below.';
        if (continueBtn)
            continueBtn.innerHTML =
                '<i class="fas fa-check-circle me-2"></i>Continue';
        if (loadingText) loadingText.textContent = 'Verifying, please wait...';
        if (autoRedirectText) {
            const countdownSpan = autoRedirectText.querySelector('#countdown');
            autoRedirectText.innerHTML =
                '<i class="fas fa-clock"></i>Redirecting in <span id="countdown">5</span> seconds';
            if (countdownSpan)
                autoRedirectText.querySelector('#countdown').textContent =
                    countdownSpan.textContent;
        }
        if (securityInfo)
            securityInfo.innerHTML =
                '<i class="fas fa-lock"></i>This verification is provided by Cloudflare Turnstile';

        document.querySelector('.back-btn').innerHTML =
            '<i class="fas fa-arrow-left me-2"></i>Back to Home';
    } else if (redirectPage.includes('/it/')) {
        // 意大利文界面
        if (titleElement) titleElement.textContent = 'Verifica Umana';
        if (textElement)
            textElement.textContent =
                'Per garantire la sicurezza del sito web e fornire una migliore esperienza di navigazione, completa la verifica qui sotto.';
        if (continueBtn)
            continueBtn.innerHTML =
                '<i class="fas fa-check-circle me-2"></i>Continua';
        if (loadingText)
            loadingText.textContent = 'Verifica in corso, attendere prego...';
        if (autoRedirectText) {
            const countdownSpan = autoRedirectText.querySelector('#countdown');
            autoRedirectText.innerHTML =
                '<i class="fas fa-clock"></i>Reindirizzamento in <span id="countdown">5</span> secondi';
            if (countdownSpan)
                autoRedirectText.querySelector('#countdown').textContent =
                    countdownSpan.textContent;
        }
        if (securityInfo)
            securityInfo.innerHTML =
                '<i class="fas fa-lock"></i>Questa verifica è fornita da Cloudflare Turnstile';

        document.querySelector('.back-btn').innerHTML =
            '<i class="fas fa-arrow-left me-2"></i>Torna alla Home';
    }
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
    setTimeout(function () {
        // 隐藏加载指示器
        document.getElementById('loading-indicator').style.display = 'none';

        // 根据重定向页面设置相应的验证标记
        if (redirectPage.includes('profile')) {
            // 根据语言版本设置不同的验证标记
            if (redirectPage.includes('/en/')) {
                setVerified('profile_en_verified');
            } else if (redirectPage.includes('/it/')) {
                setVerified('profile_it_verified');
            } else {
                setVerified('profile_verified');
            }
        } else if (redirectPage.includes('contact')) {
            // 根据语言版本设置不同的验证标记
            if (redirectPage.includes('/en/')) {
                setVerified('contact_en_verified');
            } else if (redirectPage.includes('/it/')) {
                setVerified('contact_it_verified');
            } else {
                setVerified('contact_verified');
            }
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
