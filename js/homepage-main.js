/**
 * Homepage JavaScript for Alexander James Carter Website
 * 主页交互脚本
 */

// 自动语言跳转脚本
(function initLanguageRedirect() {
    // 仅在根目录页面执行
    var isRoot =
        location.pathname === '/' || location.pathname === '/index.html';
    if (!isRoot) return;

    // 延迟加载语言跳转脚本，给用户时间看到页面
    setTimeout(function () {
        var script = document.createElement('script');
        script.src = '/js/lang-redirect.js';
        script.defer = true;
        document.head.appendChild(script);
    }, 3000); // 3秒后再执行自动跳转
})();

// 导航栏滚动效果
function initNavbarScrollEffect() {
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 页面加载动画初始化
function initPageLoadAnimation() {
    document.addEventListener('DOMContentLoaded', function () {
        // 确保所有动画元素始终可见，移除可能导致内容隐藏的样式
        const animatedElements = document.querySelectorAll('.animate-in');
        animatedElements.forEach(function (element) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });

        // 添加淡入动画类
        setTimeout(function () {
            animatedElements.forEach(function (element, index) {
                element.classList.add('fade-in-visible');
            });
        }, 100);
    });
}

// 处理即将推出的语言选项
function showComingSoon(language) {
    const messages = {
        Français:
            'Français 版本正在开发中，敬请期待！\nFrançais version is coming soon, stay tuned!',
        Deutsch:
            'Deutsch 版本正在开发中，敬请期待！\nDeutsch version is coming soon, stay tuned!',
        Español:
            'Español 版本正在开发中，敬请期待！\nEspañol version is coming soon, stay tuned!',
        Русский:
            'Русский 版本正在开发中，敬请期待！\nРусский version is coming soon, stay tuned!',
    };

    const message =
        messages[language] ||
        `${language} 版本正在开发中，敬请期待！\n${language} version is coming soon, stay tuned!`;
    alert(message);
}

// 平滑滚动到指定锚点
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.offsetTop - 80; // 考虑固定导航栏的高度

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
    });
}

// 处理导航栏链接点击
function initNavigationLinks() {
    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;

        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
    });
}

// 语言选择卡片交互效果增强
function initLanguageCardEffects() {
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(function (option) {
        // 鼠标进入效果
        option.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.05)';

            // 添加光晕效果
            const flag = this.querySelector('.lang-flag');
            if (flag) {
                flag.style.filter =
                    'drop-shadow(0 8px 16px rgba(255, 107, 53, 0.5))';
            }
        });

        // 鼠标离开效果
        option.addEventListener('mouseleave', function () {
            this.style.transform = '';

            const flag = this.querySelector('.lang-flag');
            if (flag) {
                flag.style.filter = '';
            }
        });

        // 点击效果
        option.addEventListener('click', function (event) {
            // 如果是即将推出的语言，阻止默认行为
            if (this.classList.contains('coming-soon')) {
                event.preventDefault();
                const langName = this.querySelector('.lang-name').textContent;
                showComingSoon(langName);
                return;
            }

            // 添加点击动画
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 特色卡片悬停效果增强
function initFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(function (card, index) {
        card.addEventListener('mouseenter', function () {
            // 添加轻微的旋转效果
            this.style.transform = 'translateY(-12px) scale(1.02) rotate(1deg)';

            // 增强图标效果
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(-1deg)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';

            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// 背景动画控制
function initBackgroundAnimationControl() {
    let isReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isReducedMotion) {
        // 如果用户偏好减少动画，禁用背景动画
        const style = document.createElement('style');
        style.textContent = `
            body::before,
            .hero::before,
            .footer::before {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// 错误处理和回退
function handleErrors() {
    window.addEventListener('error', function (event) {
        console.warn('页面脚本错误:', event.error);
        // 确保核心功能仍然可用
        initBasicFunctionality();
    });
}

// 基础功能初始化（错误回退）
function initBasicFunctionality() {
    // 确保导航栏滚动效果可用
    if (typeof initNavbarScrollEffect === 'function') {
        try {
            initNavbarScrollEffect();
        } catch (e) {
            console.warn('导航栏滚动效果初始化失败:', e);
        }
    }

    // 确保页面内容可见
    try {
        const elements = document.querySelectorAll(
            '.animate-in, [style*="opacity: 0"]'
        );
        elements.forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    } catch (e) {
        console.warn('页面可见性修复失败:', e);
    }
}

// 初始化所有功能
function initHomepage() {
    try {
        initNavbarScrollEffect();
        initPageLoadAnimation();
        initNavigationLinks();
        initLanguageCardEffects();
        initFeatureCardEffects();
        initBackgroundAnimationControl();
        handleErrors();

        console.log('主页脚本初始化完成');
    } catch (error) {
        console.warn('主页脚本初始化部分失败:', error);
        initBasicFunctionality();
    }
}

// 当DOM加载完成时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomepage);
} else {
    // DOM已经加载完成
    initHomepage();
}

// 导出全局函数供HTML使用
window.showComingSoon = showComingSoon;
window.smoothScrollTo = smoothScrollTo;
