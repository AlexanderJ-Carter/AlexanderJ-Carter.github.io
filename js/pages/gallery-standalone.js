/**
 * Gallery页面独立JavaScript文件
 * 包含所有gallery页面需要的功能，无需外部依赖
 * 功能：图片过滤、灯箱效果、返回顶部、动画效果
 */

(function() {
    'use strict';
    
    // ============================================
    // 页面加载完成后初始化
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Gallery: 初始化开始');
        
        // 初始化各个功能模块
        initFilters();
        initLightbox();
        initBackToTop();
        initAnimations();
        initImageLoading();
        
        console.log('Gallery: 所有功能初始化完成');
    });
    
    // ============================================
    // 图片过滤功能
    // ============================================
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (filterButtons.length === 0) {
            console.log('Gallery: 未找到过滤按钮');
            return;
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除所有active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // 添加active类到当前按钮
                this.classList.add('active');
                
                // 获取过滤值
                const filterValue = this.getAttribute('data-filter');
                
                // 过滤项目
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        // 显示项目
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        // 隐藏项目
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        console.log('Gallery: 过滤器初始化完成');
    }
    
    // ============================================
    // 简单灯箱效果
    // ============================================
    function initLightbox() {
        const viewButtons = document.querySelectorAll('.btn-view');
        
        if (viewButtons.length === 0) {
            console.log('Gallery: 未找到查看按钮');
            return;
        }
        
        // 创建灯箱容器
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="关闭">&times;</button>
                <button class="lightbox-prev" aria-label="上一张">&#10094;</button>
                <button class="lightbox-next" aria-label="下一张">&#10095;</button>
                <img src="" alt="图片预览">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // 添加灯箱样式
        const style = document.createElement('style');
        style.textContent = `
            .gallery-lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 9999;
                align-items: center;
                justify-content: center;
            }
            
            .gallery-lightbox.active {
                display: flex;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(102, 126, 234, 0.3);
            }
            
            .lightbox-close,
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                background: rgba(255, 255, 255, 0.9);
                color: #667eea;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                padding: 10px 15px;
                border-radius: 50%;
                transition: all 0.3s ease;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-close {
                top: 20px;
                right: 20px;
            }
            
            .lightbox-prev {
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .lightbox-next {
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .lightbox-close:hover,
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: white;
                transform: scale(1.1);
            }
            
            .lightbox-prev:hover {
                transform: translateY(-50%) scale(1.1);
            }
            
            .lightbox-next:hover {
                transform: translateY(-50%) scale(1.1);
            }
            
            .lightbox-caption {
                position: absolute;
                bottom: -50px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 1.1rem;
                text-align: center;
                white-space: nowrap;
            }
        `;
        document.head.appendChild(style);
        
        // 获取所有图片
        const images = Array.from(viewButtons).map(btn => ({
            src: btn.href,
            title: btn.closest('.gallery-item').getAttribute('data-title') || '',
            description: btn.closest('.gallery-item').getAttribute('data-description') || ''
        }));
        
        let currentIndex = 0;
        
        // 显示图片
        function showImage(index) {
            const img = lightbox.querySelector('img');
            const caption = lightbox.querySelector('.lightbox-caption');
            
            img.src = images[index].src;
            caption.textContent = images[index].title || images[index].description;
            currentIndex = index;
        }
        
        // 查看按钮点击事件
        viewButtons.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                lightbox.classList.add('active');
                showImage(index);
                document.body.style.overflow = 'hidden';
            });
        });
        
        // 关闭按钮
        lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // 上一张
        lightbox.querySelector('.lightbox-prev').addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
        
        // 下一张
        lightbox.querySelector('.lightbox-next').addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
        
        // 点击背景关闭
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 键盘导航
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }
        });
        
        console.log('Gallery: 灯箱初始化完成');
    }
    
    // ============================================
    // 返回顶部功能
    // ============================================
    function initBackToTop() {
        let backToTopBtn = document.querySelector('.btn-back-to-top');
        
        // 如果不存在，创建一个
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'btn-back-to-top';
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.setAttribute('aria-label', '返回顶部');
            document.body.appendChild(backToTopBtn);
        }
        
        // 滚动显示/隐藏
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // 点击返回顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('Gallery: 返回顶部按钮初始化完成');
    }
    
    // ============================================
    // 动画效果
    // ============================================
    function initAnimations() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // 简单的滚动动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
        
        console.log('Gallery: 动画效果初始化完成');
    }
    
    // ============================================
    // 图片懒加载
    // ============================================
    function initImageLoading() {
        const images = document.querySelectorAll('.gallery-card img');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log('Gallery: 图片加载初始化完成');
    }
    
})();
