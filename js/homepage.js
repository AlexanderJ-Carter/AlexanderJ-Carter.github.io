/* Homepage JavaScript - Interactive Features */

// 全局变量
let isScrolled = false;
let animationElements = [];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    initializeHomepage();
});

// 初始化主页功能
function initializeHomepage() {
    initScrollEffects();
    initAnimations();
    initLanguageFeatures();
    initInteractiveElements();
    loadLanguageRedirect();
}

// 滚动效果初始化
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener(
        'scroll',
        throttle(function () {
            const scrollY = window.scrollY;

            // 导航栏滚动效果
            if (scrollY > 50 && !isScrolled) {
                navbar.classList.add('scrolled');
                isScrolled = true;
            } else if (scrollY <= 50 && isScrolled) {
                navbar.classList.remove('scrolled');
                isScrolled = false;
            }

            // 视差滚动效果
            updateParallaxEffects(scrollY);
        }, 16),
        { passive: true }
    );
}

// 视差滚动效果
function updateParallaxEffects(scrollY) {
    const hero = document.querySelector('.hero');
    const features = document.querySelector('.features');

    if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom > 0) {
            const parallaxSpeed = scrollY * 0.5;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    }

    if (features) {
        const featuresRect = features.getBoundingClientRect();
        if (featuresRect.top < window.innerHeight && featuresRect.bottom > 0) {
            const parallaxSpeed = (scrollY - featuresRect.top) * 0.1;
            features.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    }
}

// 动画初始化
function initAnimations() {
    // 获取所有需要动画的元素
    animationElements = document.querySelectorAll('.animate-in');

    // 创建交叉观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
    };

    const observer = new IntersectionObserver(
        handleAnimationIntersection,
        observerOptions
    );

    // 观察所有动画元素
    animationElements.forEach((element) => {
        observer.observe(element);
    });

    // 初始化页面加载动画
    setTimeout(() => {
        triggerInitialAnimations();
    }, 100);
}

// 处理动画交叉观察
function handleAnimationIntersection(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // 添加动画完成类
            setTimeout(() => {
                entry.target.classList.add('animation-complete');
            }, 800);
        }
    });
}

// 触发初始动画
function triggerInitialAnimations() {
    const heroElements = document.querySelectorAll('.hero .animate-in');

    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// 语言功能初始化
function initLanguageFeatures() {
    initLanguageHover();
    initComingSoonLanguages();
    initLanguageSelection();
}

// 语言悬停效果
function initLanguageHover() {
    const langTexts = document.querySelectorAll('.lang-text');

    langTexts.forEach((text) => {
        text.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
        });

        text.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// 即将推出语言处理
function initComingSoonLanguages() {
    // 全局函数，供HTML调用
    window.showComingSoon = function (languageName) {
        showLanguageNotification(languageName);
    };
}

// 显示语言通知
function showLanguageNotification(languageName) {
    // 创建通知元素
    const notification = createNotificationElement(languageName);
    document.body.appendChild(notification);

    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // 自动隐藏
    setTimeout(() => {
        hideNotification(notification);
    }, 4000);
}

// 创建通知元素
function createNotificationElement(languageName) {
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">🚀</div>
            <div class="notification-text">
                <strong>${languageName}</strong> version is coming soon!<br>
                <small>We're working hard to bring you content in your language.</small>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // 添加样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
        transform: 'translateX(400px)',
        transition: 'all 0.3s ease',
        zIndex: '10000',
        maxWidth: '320px',
        fontSize: '0.9rem',
    });

    notification.classList.add('language-notification');
    return notification;
}

// 隐藏通知
function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';

    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// 语言选择功能
function initLanguageSelection() {
    const langOptions = document.querySelectorAll('.lang-option[data-lang]');

    langOptions.forEach((option) => {
        option.addEventListener('click', function (e) {
            const lang = this.getAttribute('data-lang');

            // 如果是即将推出的语言，阻止默认行为
            if (this.classList.contains('coming-soon')) {
                e.preventDefault();
                return;
            }

            // 保存语言选择到localStorage
            try {
                localStorage.setItem('site:lang', lang);
                console.log(`Language preference saved: ${lang}`);
            } catch (error) {
                console.warn('Could not save language preference:', error);
            }

            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 交互式元素初始化
function initInteractiveElements() {
    initFeatureCards();
    initSocialLinks();
    initScrollToTop();
}

// 特性卡片交互
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            // 添加倾斜效果
            const tiltX = (Math.random() - 0.5) * 10;
            const tiltY = (Math.random() - 0.5) * 10;

            this.style.transform = `translateY(-10px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

        // 添加点击波纹效果
        card.addEventListener('click', function (e) {
            createRippleEffect(e, this);
        });
    });
}

// 创建波纹效果
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple-effect';

    // 添加样式
    Object.assign(ripple.style, {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(102, 126, 234, 0.3)',
        transform: 'scale(0)',
        animation: 'ripple 0.6s linear',
        pointerEvents: 'none',
    });

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // 移除波纹元素
    setTimeout(() => {
        if (ripple.parentElement) {
            ripple.parentElement.removeChild(ripple);
        }
    }, 600);
}

// 社交链接交互
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach((link) => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// 滚动到顶部功能
function initScrollToTop() {
    // 创建滚动到顶部按钮
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');

    // 添加样式
    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: '1000',
        opacity: '0',
        transform: 'scale(0)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    });

    document.body.appendChild(scrollTopBtn);

    // 滚动显示/隐藏按钮
    window.addEventListener(
        'scroll',
        throttle(() => {
            if (window.scrollY > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.transform = 'scale(1)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.transform = 'scale(0)';
            }
        }, 100)
    );

    // 点击滚动到顶部
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

// 加载语言跳转脚本
function loadLanguageRedirect() {
    const isRoot =
        location.pathname === '/' || location.pathname === '/index.html';
    if (!isRoot) return;

    // 延迟加载语言跳转脚本，给用户时间看到页面
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = '/js/lang-redirect.js';
        script.defer = true;
        script.onerror = () => {
            console.warn('Could not load language redirect script');
        };
        document.head.appendChild(script);
    }, 3000); // 3秒后再执行自动跳转
}

// 工具函数：节流
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：防抖
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .language-notification.show {
        transform: translateX(0) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

document.head.appendChild(style);

// 导出函数供全局使用
window.HomepageJS = {
    showComingSoon: window.showComingSoon,
    throttle,
    debounce,
};
