/**
 * 验证相关功能的脚本
 * 用于管理需要验证的页面访问权限
 */

// 检查是否已经通过验证
function isVerified(key) {
    try {
        return sessionStorage.getItem(key) === 'true';
    } catch (e) {
        console.error('验证状态检查失败:', e);
        return false;
    }
}

// 标记为已验证
function markAsVerified(key) {
    try {
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
        sessionStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('清除验证状态失败:', e);
        return false;
    }
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

    if (redirectPage.includes('profile.html')) {
        verificationKey = 'profile_verified';
    } else if (redirectPage.includes('en/profile-en.html')) {
        verificationKey = 'profile_en_verified';
    } else if (redirectPage.includes('it/profile-it.html')) {
        verificationKey = 'profile_it_verified';
    } else if (redirectPage.includes('jp/profile-jp.html')) {
        verificationKey = 'profile_jp_verified';
    } else if (redirectPage.includes('contact.html')) {
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
            window.location.href = redirectPage;
        };

        // 启动自动跳转
        startAutoRedirect(5);
    }, 1500);
}

// 当页面加载时初始化
document.addEventListener('DOMContentLoaded', function () {
    // 如果是验证页面，添加页面特定的行为
    if (window.location.pathname.includes('verify.html')) {
        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.style.display = 'none';
        }
    }
});
