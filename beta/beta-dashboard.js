// Beta功能选择页面脚本

class BetaDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.checkAuth();
        this.loadUserInfo();
        this.setupEventListeners();
        this.updateUserCount();
        this.enableSmoothScrolling();

        // 每分钟更新用户计数
        setInterval(() => {
            this.updateUserCount();
        }, 60000);
    }

    checkAuth() {
        const token = localStorage.getItem('beta_token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }
    }

    loadUserInfo() {
        const userInfo = localStorage.getItem('beta_user');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            const userInfoEl = document.getElementById('user-info');
            if (userInfoEl) {
                userInfoEl.textContent = `欢迎，${user.username}！`;
            }
        }
    }

    setupEventListeners() {
        // 模块卡片点击事件 - 确保不阻止滚动
        document.querySelectorAll('.module-card').forEach((card) => {
            const moduleBtn = card.querySelector('.module-btn');
            if (moduleBtn && !moduleBtn.disabled) {
                // 只监听按钮点击，不监听卡片点击
                moduleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const moduleCard = e.target.closest('.module-card');
                    const module = moduleCard.dataset.module;
                    this.handleModuleClick(module);
                });
            }
        });

        // 模块按钮单独处理
        document.querySelectorAll('.module-btn').forEach((btn) => {
            if (!btn.disabled) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const moduleCard = btn.closest('.module-card');
                    const module = moduleCard.dataset.module;
                    this.handleModuleClick(module);
                });
            }
        });
    }

    handleModuleClick(module) {
        switch (module) {
            case 'financial':
                this.showApiLimitationModal();
                break;
            case 'analytics':
                this.showComingSoon('数据分析工具');
                break;
            case 'ai':
                this.showComingSoon('AI智能助手');
                break;
            case 'experimental':
                this.showExperimentalFeatures();
                break;
            default:
                console.log('未知模块:', module);
        }
    }

    showApiLimitationModal() {
        const modal = document.getElementById('api-limitation-modal');
        modal.classList.add('show');
    }

    showComingSoon(featureName) {
        const toast = this.createToast(
            `🚧 ${featureName}正在紧张开发中，敬请期待！`,
            'info'
        );
        document.body.appendChild(toast);
    }

    showExperimentalFeatures() {
        const toast = this.createToast(
            '🧪 实验性功能模块即将上线，将包含最前沿的技术演示！',
            'info'
        );
        document.body.appendChild(toast);
    }

    createToast(message, type = 'info') {
        const toast = document.createElement('div');
        const bgColors = {
            info: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
        };

        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1001;
            font-size: 14px;
            max-width: 350px;
            animation: slideInRight 0.3s ease;
        `;

        toast.textContent = message;

        // 自动移除
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 4000);

        return toast;
    }

    updateUserCount() {
        // 模拟在线用户数
        const userCountEl = document.getElementById('user-count');
        if (userCountEl) {
            const count = Math.floor(Math.random() * 50) + 125; // 125-175之间的随机数
            userCountEl.textContent = `${count} 位测试用户`;
        }
    }

    enableSmoothScrolling() {
        // 确保页面可以正常滚动
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';

        // 移除任何可能阻止滚动的事件
        document.removeEventListener('touchmove', this.preventScroll);
        document.removeEventListener('wheel', this.preventScroll);
    }
}

// 全局函数
function logout() {
    localStorage.removeItem('beta_token');
    localStorage.removeItem('beta_user');
    window.location.href = 'login.html';
}

function closeApiModal() {
    const modal = document.getElementById('api-limitation-modal');
    modal.classList.remove('show');
}

function confirmEnterFinancial() {
    closeApiModal();
    // 显示加载提示
    const loadingToast = document.createElement('div');
    loadingToast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(31, 41, 55, 0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        z-index: 1002;
        text-align: center;
        backdrop-filter: blur(10px);
    `;
    loadingToast.innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>正在加载金融仪表板...</p>
    `;
    document.body.appendChild(loadingToast);

    // 延迟跳转到金融仪表板
    setTimeout(() => {
        window.location.href = 'financial-dashboard.html';
    }, 2000);
}

// 点击模态框外部关闭 - 确保不影响滚动
document.addEventListener(
    'click',
    (e) => {
        const modal = document.getElementById('api-limitation-modal');
        if (e.target === modal) {
            closeApiModal();
        }
    },
    { passive: true }
); // 使用 passive 事件监听器

// 优化触摸事件处理
document.addEventListener('touchstart', function () {}, { passive: true });
document.addEventListener('touchmove', function () {}, { passive: true });

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new BetaDashboard();
});
