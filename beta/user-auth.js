// Beta用户认证系统 - 前端
class BetaUserAuth {
    constructor() {
        // Cloudflare Worker API端点
        // 请在部署Worker后替换为您的实际API地址
        this.apiBase = 'https://auth.haoyu6huang.workers.dev/api';

        this.init();
    }

    init() {
        // 检查是否已登录
        if (this.isAuthenticated()) {
            this.showBetaContent();
        } else {
            this.showAuthForm();
        }

        this.bindEvents();
    }

    bindEvents() {
        // 注册表单
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) =>
                this.handleRegister(e)
            );
        }

        // 登录表单
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // 切换表单
        const switchToLogin = document.getElementById('switch-to-login');
        const switchToRegister = document.getElementById('switch-to-register');

        if (switchToLogin) {
            switchToLogin.addEventListener('click', () =>
                this.switchForm('login')
            );
        }

        if (switchToRegister) {
            switchToRegister.addEventListener('click', () =>
                this.switchForm('register')
            );
        }

        // 退出登录
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // 功能按钮
        document.querySelectorAll('.feature-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => this.handleFeatureClick(e));
        });
    }

    async handleRegister(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.auth-btn');

        const userData = {
            username: formData.get('username'),
            password: formData.get('password'),
            email: formData.get('email'),
            inviteCode: formData.get('inviteCode'),
        };

        // 验证输入
        if (!userData.username || !userData.password) {
            this.showMessage('请填写用户名和密码', 'error');
            return;
        }

        if (userData.username.length < 3) {
            this.showMessage('用户名至少需要3个字符', 'error');
            return;
        }

        if (userData.password.length < 6) {
            this.showMessage('密码至少需要6个字符', 'error');
            return;
        }

        // 显示加载状态
        this.setButtonLoading(submitBtn, true);

        try {
            const response = await fetch(`${this.apiBase}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (result.success) {
                // 保存令牌
                localStorage.setItem('beta_token', result.token);
                localStorage.setItem('beta_user', JSON.stringify(result.user));

                this.showMessage('注册成功！正在跳转...', 'success');

                setTimeout(() => {
                    this.showBetaContent();
                }, 1500);
            } else {
                this.showMessage(result.error || '注册失败', 'error');
            }
        } catch (error) {
            this.showMessage('网络错误，请稍后重试', 'error');
            console.error('注册错误:', error);
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.auth-btn');

        const userData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        if (!userData.username || !userData.password) {
            this.showMessage('请填写用户名和密码', 'error');
            return;
        }

        this.setButtonLoading(submitBtn, true);

        try {
            const response = await fetch(`${this.apiBase}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('beta_token', result.token);
                localStorage.setItem('beta_user', JSON.stringify(result.user));

                this.showMessage('登录成功！正在跳转...', 'success');

                setTimeout(() => {
                    this.showBetaContent();
                }, 1500);
            } else {
                this.showMessage(result.error || '登录失败', 'error');
            }
        } catch (error) {
            this.showMessage('网络错误，请稍后重试', 'error');
            console.error('登录错误:', error);
        } finally {
            this.setButtonLoading(submitBtn, false);
        }
    }

    async verifyToken() {
        const token = localStorage.getItem('beta_token');
        if (!token) return false;

        try {
            const response = await fetch(`${this.apiBase}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('beta_user', JSON.stringify(result.user));
                return true;
            } else {
                this.clearAuth();
                return false;
            }
        } catch (error) {
            console.error('令牌验证错误:', error);
            this.clearAuth();
            return false;
        }
    }

    isAuthenticated() {
        const token = localStorage.getItem('beta_token');
        const user = localStorage.getItem('beta_user');

        if (!token || !user) return false;

        try {
            // 简单的令牌过期检查
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp < Math.floor(Date.now() / 1000)) {
                this.clearAuth();
                return false;
            }
            return true;
        } catch (error) {
            this.clearAuth();
            return false;
        }
    }

    switchForm(formType) {
        const registerContainer = document.getElementById('register-container');
        const loginContainer = document.getElementById('login-container');

        if (formType === 'login') {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        } else {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        }

        this.clearMessage();
    }

    showAuthForm() {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('beta-content').style.display = 'none';
        document.body.style.background =
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    showBetaContent() {
        // 跳转到Beta功能选择页面，而不是直接进入金融仪表板
        window.location.href = 'beta-dashboard.html';
    }

    updateUserInfo() {
        const userStr = localStorage.getItem('beta_user');
        if (userStr) {
            const user = JSON.parse(userStr);
            const userInfoEl = document.getElementById('user-info');
            if (userInfoEl) {
                userInfoEl.textContent = `欢迎，${user.username}！`;
            }
        }
    }

    logout() {
        this.clearAuth();
        location.reload();
    }

    clearAuth() {
        localStorage.removeItem('beta_token');
        localStorage.removeItem('beta_user');
    }

    showMessage(message, type = 'info') {
        const messageEl = document.getElementById('auth-message');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `auth-message ${type}`;
            messageEl.style.display = 'block';

            // 自动隐藏成功消息
            if (type === 'success') {
                setTimeout(() => {
                    messageEl.style.display = 'none';
                }, 3000);
            }
        }
    }

    clearMessage() {
        const messageEl = document.getElementById('auth-message');
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }

    setButtonLoading(button, loading) {
        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = '处理中...';
        } else {
            button.disabled = false;
            button.textContent =
                button.dataset.originalText || button.textContent;
        }
    }

    handleFeatureClick(e) {
        const button = e.target;
        const featureName = button.textContent;

        // 模拟功能交互
        const originalText = button.textContent;
        button.textContent = '执行中...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;

            // 显示功能演示
            this.showFeatureDemo(featureName);
        }, 1500);
    }

    showFeatureDemo(featureName) {
        const messages = {
            '测试功能 A': '✅ 功能 A 测试完成！',
            '测试功能 B': '🔧 功能 B 正在实验中！',
            打开分析工具: '📊 数据分析工具已启动！',
            提交反馈: '💬 反馈系统已打开！',
        };

        const message = messages[featureName] || '功能演示完成！';

        // 创建临时提示
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-size: 14px;
            max-width: 300px;
        `;

        toast.textContent = message;
        document.body.appendChild(toast);

        // 自动移除提示
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new BetaUserAuth();
});
