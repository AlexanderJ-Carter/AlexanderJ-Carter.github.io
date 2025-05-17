/**
 * 验证相关功能的脚本
 * 用于管理需要验证的页面访问权限
 */

// 检查是否已经通过验证
function isVerified(key) {
    try {
        // 使用sessionStorage代替localStorage，这样关闭浏览器后会清除验证
        const status = sessionStorage.getItem(key);
        console.log(`Checking verification for ${key}: ${status}`);
        return status === 'true';
    } catch (e) {
        console.error('验证状态检查失败:', e);
        return false;
    }
}

// 标记为已验证
function markAsVerified(key) {
    try {
        console.log(`Marking ${key} as verified`);
        sessionStorage.setItem(key, 'true');
        return true;
    } catch (e) {
        console.error('标记验证状态失败:', e);
        return false;
    }
}

// 清除验证状态
function clearVerification(key) {
    try {
        console.log(`Clearing verification for ${key}`);
        sessionStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('清除验证状态失败:', e);
        return false;
    }
}

// 防止无限重定向
function checkRedirectAttempts(pageType, lang) {
    const key = `${pageType}_${lang}_redirect_attempts`;
    let attempts = parseInt(sessionStorage.getItem(key) || '0');
    const MAX_ATTEMPTS = 2;

    if (attempts >= MAX_ATTEMPTS) {
        console.warn(
            `最大重定向次数已达到(${attempts}/${MAX_ATTEMPTS})，跳过验证`
        );
        // 重置计数器
        sessionStorage.setItem(key, '0');
        return false; // 不再重定向
    }

    // 增加计数器
    attempts++;
    sessionStorage.setItem(key, attempts.toString());
    console.log(`重定向尝试 ${attempts}/${MAX_ATTEMPTS}`);
    return true; // 可以重定向
}

// 重置重定向计数器
function resetRedirectCounter(pageType, lang) {
    const key = `${pageType}_${lang}_redirect_attempts`;
    sessionStorage.setItem(key, '0');
    console.log(`重置重定向计数器: ${key}`);
}

// 获取页面对应的验证标记
function getVerificationKeyForPage(page) {
    if (page.includes('zh-CN/profile.html') || page.includes('profile.html')) {
        return 'profile_verified';
    } else if (page.includes('en/profile-en.html')) {
        return 'profile_en_verified';
    } else if (page.includes('it/profile-it.html')) {
        return 'profile_it_verified';
    } else if (page.includes('jp/profile-jp.html')) {
        return 'profile_jp_verified';
    } else if (
        page.includes('zh-CN/contact.html') ||
        page.includes('contact.html')
    ) {
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

// 当 Turnstile 验证成功时的回调
function onTurnstileSuccess(token) {
    // 显示加载指示器
    document.getElementById('loading-indicator').style.display = 'block';

    // 获取重定向目标页面
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPage = urlParams.get('redirect') || 'index.html';

    // 根据重定向目标设置对应的验证标记
    let verificationKey = 'general_verified';

    if (
        redirectPage.includes('profile.html') ||
        redirectPage.includes('zh-CN/profile.html')
    ) {
        verificationKey = 'profile_verified';
    } else if (redirectPage.includes('en/profile-en.html')) {
        verificationKey = 'profile_en_verified';
    } else if (redirectPage.includes('it/profile-it.html')) {
        verificationKey = 'profile_it_verified';
    } else if (redirectPage.includes('jp/profile-jp.html')) {
        verificationKey = 'profile_jp_verified';
    } else if (
        redirectPage.includes('contact.html') ||
        redirectPage.includes('zh-CN/contact.html')
    ) {
        verificationKey = 'contact_verified';
    } else if (redirectPage.includes('en/contact-en.html')) {
        verificationKey = 'contact_en_verified';
    } else if (redirectPage.includes('it/contact-it.html')) {
        verificationKey = 'contact_it_verified';
    } else if (redirectPage.includes('jp/contact-jp.html')) {
        verificationKey = 'contact_jp_verified';
    }

    // 延迟一点时间，模拟验证过程
    setTimeout(() => {
        // 标记为已验证
        markAsVerified(verificationKey);

        // 隐藏加载指示器
        document.getElementById('loading-indicator').style.display = 'none';

        // 显示继续按钮
        const continueBtn = document.getElementById('continue-btn');
        continueBtn.style.display = 'block';

        // 添加点击事件处理程序
        continueBtn.onclick = function () {
            // 重置相关重定向计数器
            if (redirectPage.includes('profile')) {
                const lang = redirectPage.includes('-en')
                    ? 'en'
                    : redirectPage.includes('-it')
                    ? 'it'
                    : redirectPage.includes('-jp')
                    ? 'jp'
                    : 'cn';
                resetRedirectCounter('profile', lang);
            } else if (redirectPage.includes('contact')) {
                const lang = redirectPage.includes('-en')
                    ? 'en'
                    : redirectPage.includes('-it')
                    ? 'it'
                    : redirectPage.includes('-jp')
                    ? 'jp'
                    : 'cn';
                resetRedirectCounter('contact', lang);
            }

            window.location.href = redirectPage;
        };

        // 启动自动跳转
        startAutoRedirect(5);
    }, 1500);
}

// 用于解决重定向循环的问题
function preventRedirectLoop() {
    const currentLocation = window.location.pathname;
    const referrer = document.referrer;

    // 如果是从验证页面返回的，添加一个标记防止重复验证
    if (referrer && referrer.includes('verify.html')) {
        const tempKey = 'temp_verified_' + Date.now();
        sessionStorage.setItem(tempKey, 'true');
        setTimeout(() => sessionStorage.removeItem(tempKey), 5000); // 5秒后移除临时标记
    }
}

// 当页面加载时初始化
document.addEventListener('DOMContentLoaded', function () {
    // 如果是验证页面，添加页面特定的行为
    if (window.location.pathname.includes('verify.html')) {
        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.style.display = 'none';
        }
    } else {
        // 非验证页面执行防循环逻辑
        preventRedirectLoop();
    }
});
