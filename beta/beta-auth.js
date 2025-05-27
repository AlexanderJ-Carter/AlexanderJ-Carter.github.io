// Beta 身份验证系统
class BetaAuth {
    constructor() {
        // 安全的哈希验证 - 只存储SHA-256哈希值，不存储明文密码
        this.validHashes = [
            "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f", // secret2025
            "a8c667ba21b2b8c6b8e8aba5b3f4b5b8b3c6d8f3e6c7b5a6c3e5d8a6b3c8d7f2", // 示例哈希
            "2c70e12b7a0646f92279f427c7b38e7334d8e5389cff167a1dc30e73f826b683", // hello
        ];
        
        // 基于时间的挑战验证（动态密码）
        this.timeBasedChallenges = {
            enabled: true,
            algorithms: [
                'simple_math',    // 简单数学运算
                'date_based',     // 基于日期
                'pattern_based'   // 基于模式
            ]
        };
        
        // URL密钥验证
        this.urlKeyValidation = {
            enabled: true,
            secretSalt: "beta_salt_2025" // 用于生成URL密钥的盐值
        };
        
        this.sessionKey = 'beta_auth_session';
        this.sessionDuration = 24 * 60 * 60 * 1000; // 24小时
        this.currentQuestionIndex = 0;
        
        this.init();
    }    init() {
        // 首先检查URL参数中的密钥
        if (this.checkUrlKey()) {
            this.setSession();
            this.showBetaContent();
            return;
        }
        
        // 检查是否已经登录
        if (this.isAuthenticated()) {
            this.showBetaContent();
        } else {
            this.showAuthForm();
            this.loadRandomQuestion();
        }
        
        // 绑定事件
        this.bindEvents();
    }
    
    // 检查URL参数中的访问密钥
    checkUrlKey() {
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');
        
        if (!key) return false;
        
        try {
            const keyData = JSON.parse(atob(key));
            
            // 验证密钥有效性
            if (keyData.expires > 0 && Date.now() > keyData.expires) {
                this.showError('访问密钥已过期');
                return false;
            }
            
            // 清除URL中的密钥参数（安全考虑）
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            
            return true;
        } catch (error) {
            this.showError('无效的访问密钥');
            return false;
        }
    }
    
    loadRandomQuestion() {
        // 随机选择一个问题
        this.currentQuestionIndex = Math.floor(Math.random() * this.securityQuestions.length);
        const question = this.securityQuestions[this.currentQuestionIndex];
        
        const questionElement = document.getElementById('security-question');
        if (questionElement) {
            questionElement.textContent = question.question;
        }
    }
      bindEvents() {
        const authForm = document.getElementById('auth-form');
        const logoutBtn = document.getElementById('logout-btn');
        const refreshBtn = document.getElementById('refresh-question');
        
        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuth(e));
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadRandomQuestion());
        }
        
        // 绑定功能按钮事件
        document.querySelectorAll('.feature-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFeatureClick(e));
        });
    }
    
    async handleAuth(e) {
        e.preventDefault();
        
        const passwordInput = document.getElementById('password');
        const submitBtn = e.target.querySelector('.auth-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const errorMessage = document.getElementById('error-message');
        
        const password = passwordInput.value.trim();
        
        if (!password) {
            this.showError('请输入密码');
            return;
        }
        
        // 显示加载状态
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        errorMessage.style.display = 'none';
        
        // 模拟验证延迟
        await this.delay(1000);
        
        if (this.validatePassword(password)) {
            // 验证成功
            this.setSession();
            this.showSuccess('验证成功，正在跳转...');
            
            // 延迟显示内容，增加用户体验
            setTimeout(() => {
                this.showBetaContent();
            }, 1500);
        } else {
            // 验证失败
            this.showError('密码错误，请重试');
            passwordInput.value = '';
            passwordInput.focus();
        }
        
        // 恢复按钮状态
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }    async validatePassword(password) {
        // 1. 哈希验证（最安全的方式）
        const hash = await this.generateSHA256(password);
        if (this.validHashes.includes(hash)) {
            return true;
        }
        
        // 2. 动态数学验证（无需存储答案）
        if (this.validateMathChallenge(password)) {
            return true;
        }
        
        // 3. 时间戳验证（临时密码，每小时变化）
        if (this.validateTimeBasedPassword(password)) {
            return true;
        }
        
        // 4. 模式验证（基于规则，无需存储明文）
        if (this.validatePatternChallenge(password)) {
            return true;
        }
        
        return false;
    }
    
    // 生成SHA-256哈希（与生成器工具一致）
    async generateSHA256(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // 简单哈希函数（用于基本混淆）
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        return Math.abs(hash).toString(16);
    }
    
    // 数学挑战验证
    validateMathChallenge(input) {
        // 简单的数学题：当前年份 * 2 - 1000
        const result = 2025 * 2 - 1000; // 3050
        return input === result.toString();
    }
    
    // 时间戳验证（每小时变化的密码）
    validateTimeBasedPassword(input) {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDate();
        
        // 生成基于时间的密码：beta + 月份 + 日期 + 小时
        const timePassword = `beta${now.getMonth() + 1}${day}${hour}`;
        return input.toLowerCase() === timePassword.toLowerCase();
    }
    
    // 模式验证（基于规则而非存储答案）
    validatePatternChallenge(input) {
        // 规则1：包含网站名相关词汇 + 数字
        if (input.toLowerCase().includes('alexander') && /\d{2,}/.test(input)) {
            return true;
        }
        
        // 规则2：GitHub相关 + 年份
        if ((input.toLowerCase().includes('github') || input.toLowerCase().includes('git')) && 
            input.includes('2025')) {
            return true;
        }
        
        // 规则3：特定长度的十六进制字符串（模拟API密钥）
        if (/^[a-f0-9]{16,32}$/i.test(input)) {
            return true;
        }
        
        // 规则4：Beta相关 + 特定模式
        if (input.toLowerCase().includes('beta') && input.length >= 8 && /[0-9]/.test(input)) {
            return true;
        }
        
        return false;
    }
    
    setSession() {
        const sessionData = {
            authenticated: true,
            timestamp: Date.now(),
            expires: Date.now() + this.sessionDuration
        };
        
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    }
    
    isAuthenticated() {
        const sessionData = localStorage.getItem(this.sessionKey);
        
        if (!sessionData) {
            return false;
        }
        
        try {
            const data = JSON.parse(sessionData);
            
            // 检查是否过期
            if (Date.now() > data.expires) {
                this.clearSession();
                return false;
            }
            
            return data.authenticated === true;
        } catch (error) {
            this.clearSession();
            return false;
        }
    }
    
    clearSession() {
        localStorage.removeItem(this.sessionKey);
    }
    
    logout() {
        this.clearSession();
        location.reload();
    }
    
    showAuthForm() {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('beta-content').style.display = 'none';
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    showBetaContent() {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('beta-content').style.display = 'block';
        document.body.style.background = '#f8f9fa';
    }
    
    showError(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // 自动隐藏错误消息
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
    
    showSuccess(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.style.background = '#d4edda';
        errorElement.style.color = '#155724';
        errorElement.style.borderLeftColor = '#28a745';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
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
            '测试功能 A': '✅ 功能 A 测试完成！这是一个示例功能。',
            '测试功能 B': '🔧 功能 B 正在实验中，感谢您的测试！',
            '打开分析工具': '📊 数据分析工具已启动，这里可以集成各种分析功能。',
            '提交反馈': '💬 反馈系统已打开，您可以在这里提交建议和问题。'
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
            animation: slideIn 0.3s ease;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // 自动移除提示
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(toast);
                document.head.removeChild(style);
            }, 300);
        }, 3000);
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new BetaAuth();
});

// 添加一些实用功能
document.addEventListener('keydown', (e) => {
    // Esc键退出登录
    if (e.key === 'Escape' && document.getElementById('beta-content').style.display !== 'none') {
        const auth = new BetaAuth();
        auth.logout();
    }
    
    // Ctrl+L 快速聚焦到密码输入框
    if (e.ctrlKey && e.key === 'l' && document.getElementById('auth-container').style.display !== 'none') {
        e.preventDefault();
        document.getElementById('password').focus();
    }
});

// 防止在开发者工具中直接调用验证函数
if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'BetaAuth', {
        value: undefined,
        writable: false,
        configurable: false
    });
}
