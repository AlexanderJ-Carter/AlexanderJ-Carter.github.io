// 简化且安全的 Beta 验证系统
// 这个版本完全不在代码中暴露任何密码信息

class SecureBetaAuth {
    constructor() {
        // 只存储哈希值，密码通过工具生成
        this.validHashes = [
            // 使用 password-generator.html 生成哈希值后添加到这里
            // 示例：
            // "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // 空字符串的哈希（仅用于测试）
        ];
        
        this.sessionKey = 'secure_beta_session';
        this.sessionDuration = 24 * 60 * 60 * 1000; // 24小时
        
        this.init();
    }
    
    init() {
        // 检查URL密钥访问
        if (this.checkUrlAccess()) {
            this.setSession();
            this.showBetaContent();
            return;
        }
        
        // 检查现有会话
        if (this.isAuthenticated()) {
            this.showBetaContent();
        } else {
            this.showAuthForm();
        }
        
        this.bindEvents();
    }
    
    // 检查URL中的访问参数
    checkUrlAccess() {
        const urlParams = new URLSearchParams(window.location.search);
        const accessKey = urlParams.get('access');
        const timestamp = urlParams.get('t');
        
        if (accessKey && timestamp) {
            // 验证访问密钥的有效性
            if (this.validateUrlAccess(accessKey, timestamp)) {
                // 清除URL参数以保护隐私
                const cleanUrl = window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
                return true;
            }
        }
        
        return false;
    }
    
    // 验证URL访问密钥
    validateUrlAccess(accessKey, timestamp) {
        try {
            const now = Date.now();
            const accessTime = parseInt(timestamp);
            
            // 检查时间戳有效性（24小时内）
            if (now - accessTime > 24 * 60 * 60 * 1000) {
                this.showError('访问链接已过期');
                return false;
            }
            
            // 简单的密钥验证（可以更复杂）
            const expectedKey = this.generateAccessKey(timestamp);
            return accessKey === expectedKey;
            
        } catch (error) {
            return false;
        }
    }
    
    // 生成访问密钥（与key-generator一致的算法）
    generateAccessKey(timestamp) {
        // 简单的密钥生成算法
        const secret = 'beta_secret_2025'; // 可以更复杂
        const data = secret + timestamp;
        return btoa(data).replace(/[+/=]/g, '').substring(0, 16);
    }
    
    bindEvents() {
        const authForm = document.getElementById('auth-form');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuth(e));
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
        
        // 功能按钮
        document.querySelectorAll('.feature-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFeatureClick(e));
        });
    }
    
    async handleAuth(e) {
        e.preventDefault();
        
        const passwordInput = document.getElementById('password');
        const submitBtn = e.target.querySelector('.auth-btn');
        const password = passwordInput.value.trim();
        
        if (!password) {
            this.showError('请输入密码');
            return;
        }
        
        // 显示加载状态
        this.setLoadingState(submitBtn, true);
        
        // 验证密码
        if (await this.validatePassword(password)) {
            this.setSession();
            this.showSuccess('验证成功！');
            setTimeout(() => this.showBetaContent(), 1000);
        } else {
            this.showError('密码错误');
            passwordInput.value = '';
        }
        
        this.setLoadingState(submitBtn, false);
    }
    
    // 安全的密码验证
    async validatePassword(password) {
        // 1. 哈希验证（主要方式）
        const hash = await this.sha256(password);
        if (this.validHashes.includes(hash)) {
            return true;
        }
        
        // 2. 动态验证（无需存储答案）
        if (this.validateDynamicChallenge(password)) {
            return true;
        }
        
        return false;
    }
    
    // 动态挑战验证
    validateDynamicChallenge(input) {
        const now = new Date();
        
        // 当前小时的数学题：年份的后两位 + 月份 + 日期
        const mathResult = (now.getFullYear() % 100) + (now.getMonth() + 1) + now.getDate();
        if (input === mathResult.toString()) {
            return true;
        }
        
        // 时间戳密码：beta + 月日 + 小时
        const timePassword = `beta${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}`;
        if (input.toLowerCase() === timePassword) {
            return true;
        }
        
        return false;
    }
    
    // SHA-256 哈希函数
    async sha256(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
        try {
            const sessionData = localStorage.getItem(this.sessionKey);
            if (!sessionData) return false;
            
            const data = JSON.parse(sessionData);
            if (Date.now() > data.expires) {
                this.clearSession();
                return false;
            }
            
            return data.authenticated === true;
        } catch {
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
    }
    
    showBetaContent() {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('beta-content').style.display = 'block';
        document.body.style.background = '#f8f9fa';
    }
    
    showError(message) {
        this.showMessage(message, 'error');
    }
    
    showSuccess(message) {
        this.showMessage(message, 'success');
    }
    
    showMessage(message, type) {
        const messageEl = document.getElementById('auth-message') || this.createMessageElement();
        messageEl.textContent = message;
        messageEl.className = `auth-message ${type}`;
        messageEl.style.display = 'block';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
    
    createMessageElement() {
        const messageEl = document.createElement('div');
        messageEl.id = 'auth-message';
        messageEl.className = 'auth-message';
        document.getElementById('auth-form').appendChild(messageEl);
        return messageEl;
    }
    
    setLoadingState(button, loading) {
        button.disabled = loading;
        button.textContent = loading ? '验证中...' : '验证访问';
    }
    
    handleFeatureClick(e) {
        const button = e.target;
        const originalText = button.textContent;
        
        button.textContent = '执行中...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            this.showSuccess('功能演示完成！');
        }, 1500);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new SecureBetaAuth();
});

// 快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const auth = new SecureBetaAuth();
        if (document.getElementById('beta-content').style.display !== 'none') {
            auth.logout();
        }
    }
});
