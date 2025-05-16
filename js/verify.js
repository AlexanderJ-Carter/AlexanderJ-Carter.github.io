/**
 * 验证页面特定的脚本
 * 处理 Cloudflare Turnstile 回调和页面交互
 */

// 在页面加载时确保清除任何潜在的验证状态
document.addEventListener('DOMContentLoaded', function () {
    // 获取URL中的重定向参数
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPage = urlParams.get('redirect') || 'index.html';

    // 检查是否已经为当前目标页面验证过
    const verificationKey = getVerificationKeyForPage(redirectPage);
    if (isVerified(verificationKey)) {
        console.log(`${redirectPage} 已经通过验证，直接跳转`);
        window.location.href = redirectPage;
        return;
    }

    // 如果没有验证过，才清除
    clearAllVerifications();

    // 根据目标页面语言调整验证页面文字
    adjustLanguageBasedOnRedirect();
});

// 获取URL中的重定向参数
const urlParams = new URLSearchParams(window.location.search);
const redirectPage = urlParams.get('redirect') || 'index.html';

// 获取页面对应的验证键
function getVerificationKeyForPage(page) {
    if (page.includes('profile.html')) {
        return 'profile_verified';
    } else if (page.includes('en/profile-en.html')) {
        return 'profile_en_verified';
    } else if (page.includes('it/profile-it.html')) {
        return 'profile_it_verified';
    } else if (page.includes('jp/profile-jp.html')) {
        return 'profile_jp_verified';
    } else if (page.includes('contact.html')) {
        return 'contact_verified';
    } else if (page.includes('en/contact-en.html')) {
        return 'contact_en_verified';
    } else if (page.includes('it/contact-it.html')) {
        return 'contact_it_verified';
    } else if (page.includes('jp/contact-jp.html')) {
        return 'contact_jp_verified';
    }
    return 'general_verified';
}

// 清除所有可能的验证状态
function clearAllVerifications() {
    // 防止清除当前需要的验证状态
    const currentKey = getVerificationKeyForPage(redirectPage);
    if (isVerified(currentKey)) {
        console.log(`保留当前验证状态: ${currentKey}`);
        return;
    }

    console.log('清除所有验证状态');

    // 中文版
    if (currentKey !== 'profile_verified')
        clearVerification('profile_verified');
    if (currentKey !== 'contact_verified')
        clearVerification('contact_verified');

    // 英文版
    if (currentKey !== 'profile_en_verified')
        clearVerification('profile_en_verified');
    if (currentKey !== 'contact_en_verified')
        clearVerification('contact_en_verified');

    // 意大利文版
    if (currentKey !== 'profile_it_verified')
        clearVerification('profile_it_verified');
    if (currentKey !== 'contact_it_verified')
        clearVerification('contact_it_verified');

    // 日文版
    if (currentKey !== 'profile_jp_verified')
        clearVerification('profile_jp_verified');
    if (currentKey !== 'contact_jp_verified')
        clearVerification('contact_jp_verified');
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

            // 确保在跳转前设置验证标记
            const verificationKey = getVerificationKeyForPage(redirectPage);
            markAsVerified(verificationKey);

            // 添加防循环标记
            sessionStorage.setItem('just_verified', 'true');
            setTimeout(() => sessionStorage.removeItem('just_verified'), 5000); // 5秒后移除

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

    // 获取验证键
    const verificationKey = getVerificationKeyForPage(redirectPage);

    // 模拟后端验证过程
    setTimeout(() => {
        // 标记为已验证
        markAsVerified(verificationKey);

        // 隐藏加载指示器
        document.getElementById('loading-indicator').style.display = 'none';

        // 显示继续按钮
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.style.display = 'block';

        // 添加点击事件
        continueBtn.onclick = function () {
            // 添加防循环标记
            sessionStorage.setItem('just_verified', 'true');
            window.location.href = redirectPage;
        };

        // 启动自动跳转
        startAutoRedirect(5);
    }, 1500);
}
