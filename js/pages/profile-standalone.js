/**
 * Profile页面独立JavaScript文件
 * 包含所有profile页面需要的功能，无需外部依赖
 * 功能：二维码弹窗、技能动画、社交链接、时间线动画
 */

(function() {
    'use strict';
    
    // ============================================
    // 页面加载完成后初始化
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Profile: 初始化开始');
        
        // 初始化各个功能模块
        initSkillAnimations();
        initTimelineAnimations();
        initBadgeEffects();
        initSocialIcons();
        initQRCodeModals();
        initAccessibility();
        
        console.log('Profile: 所有功能初始化完成');
    });
    
    // ============================================
    // 技能条动画
    // ============================================
    function initSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        const skillProgress = document.querySelectorAll('.skill-progress');
        
        // 技能卡片逐个显示动画
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // 技能进度条动画
        skillProgress.forEach((progress, index) => {
            const targetWidth = progress.style.width || progress.getAttribute('data-width') || '0%';
            progress.style.width = '0';
            
            setTimeout(() => {
                progress.style.transition = 'width 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                progress.style.width = targetWidth;
            }, 300 + index * 150);
        });
        
        console.log('Profile: 技能动画初始化完成');
    }
    
    // ============================================
    // 时间线动画
    // ============================================
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // 观察器配置
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInLeft 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.animationDelay = `${index * 0.2}s`;
            observer.observe(item);
            
            // 鼠标悬停效果
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // 添加动画定义
        if (!document.getElementById('timeline-animations')) {
            const style = document.createElement('style');
            style.id = 'timeline-animations';
            style.textContent = `
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('Profile: 时间线动画初始化完成');
    }
    
    // ============================================
    // 标签(Badge)效果
    // ============================================
    function initBadgeEffects() {
        const badges = document.querySelectorAll('.badge');
        
        badges.forEach((badge, index) => {
            // 初始动画
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                badge.style.transition = 'all 0.4s ease';
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, 300 + index * 100);
            
            // 悬停效果
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        console.log('Profile: 标签效果初始化完成');
    }
    
    // ============================================
    // 社交图标
    // ============================================
    function initSocialIcons() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach(icon => {
            // 点击事件
            icon.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // 如果是QR码触发器
                if (this.getAttribute('onclick')) {
                    e.preventDefault();
                    return;
                }
                
                // 如果没有有效链接
                if (!href || href === '#') {
                    e.preventDefault();
                    console.log('社交媒体图标点击');
                }
            });
            
            // 悬停动画
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotate(0deg)';
            });
        });
        
        console.log('Profile: 社交图标初始化完成');
    }
    
    // ============================================
    // 二维码弹窗
    // ============================================
    function initQRCodeModals() {
        // 为全局提供showQRCode和closeQRCode函数
        window.showQRCode = function(type) {
            const modal = document.getElementById(type + 'Modal');
            if (!modal) {
                console.error('未找到模态框:', type + 'Modal');
                return;
            }
            
            // 显示模态框
            modal.style.opacity = '0';
            modal.style.display = 'block';
            
            setTimeout(() => {
                modal.style.transition = 'opacity 0.3s ease';
                modal.style.opacity = '1';
            }, 10);
            
            // 图片动画
            const qrImg = modal.querySelector('.qr-img');
            if (qrImg) {
                qrImg.style.opacity = '0';
                qrImg.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    qrImg.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    qrImg.style.opacity = '1';
                    qrImg.style.transform = 'scale(1)';
                }, 100);
            }
            
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
            
            // 聚焦关闭按钮
            const closeBtn = modal.querySelector('.qr-close');
            if (closeBtn) {
                setTimeout(() => closeBtn.focus(), 100);
            }
            
            // ESC关闭
            const keyHandler = function(event) {
                if (event.key === 'Escape') {
                    window.closeQRCode(type);
                    document.removeEventListener('keydown', keyHandler);
                }
            };
            document.addEventListener('keydown', keyHandler);
            
            // 点击背景关闭
            modal.onclick = function(event) {
                if (event.target === modal) {
                    window.closeQRCode(type);
                }
            };
        };
        
        window.closeQRCode = function(type) {
            const modal = document.getElementById(type + 'Modal');
            if (!modal) return;
            
            // 淡出效果
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
            
            // 返回焦点到触发按钮
            const triggerButton = document.querySelector(`[onclick*="showQRCode('${type}')"]`);
            if (triggerButton) {
                triggerButton.focus();
            }
        };
        
        console.log('Profile: 二维码弹窗初始化完成');
    }
    
    // ============================================
    // 无障碍增强
    // ============================================
    function initAccessibility() {
        // 为所有外部链接添加noopener
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (!link.rel || !link.rel.includes('noopener')) {
                link.rel = link.rel ? link.rel + ' noopener' : 'noopener';
            }
        });
        
        // 为社交图标添加键盘支持
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.setAttribute('role', 'button');
            
            if (icon.getAttribute('onclick')) {
                icon.setAttribute('tabindex', '0');
                
                icon.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            }
        });
        
        // 为所有按钮添加焦点样式
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid #667eea;
                outline-offset: 2px;
            }
            
            .social-icon:focus,
            .badge:focus,
            .back-btn:focus {
                outline: 3px solid #667eea;
                outline-offset: 3px;
            }
        `;
        document.head.appendChild(style);
        
        console.log('Profile: 无障碍功能初始化完成');
    }
    
})();
