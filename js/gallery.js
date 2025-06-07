// 画廊页面功能脚本

document.addEventListener('DOMContentLoaded', function () {
    // Gallery页面专用的页面加载器处理
    let galleryInitComplete = false;

    function ensurePageLoaderRemoval() {
        const pageLoader = document.querySelector('.page-loader');
        if (pageLoader && galleryInitComplete) {
            console.log('Gallery: 所有组件初始化完成，移除页面加载器');
            pageLoader.classList.add('loaded');
            setTimeout(() => {
                if (pageLoader.parentNode) {
                    pageLoader.remove();
                }
            }, 500);
        }
    }

    // 初始化AOS动画库（如果存在）
    let aosReady = false;
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 50,
        });
        aosReady = true;
        console.log('Gallery: AOS初始化完成');
    }

    // 初始化GLightbox（如果存在）
    let glightboxReady = false;
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.btn-view, .view-btn',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            openEffect: 'zoom',
            closeEffect: 'fade',
        });
        glightboxReady = true;
        console.log('Gallery: GLightbox初始化完成');
    }

    // 修复所有图片项结构，确保一致性
    fixGalleryItems();

    // 强制所有图片显示为小正方形
    enforceSquareImages();

    // 设置过滤器
    setupFilters(); // 设置交互效果
    setupInteractions();

    // 标记Gallery初始化完成
    galleryInitComplete = true;
    console.log('Gallery: 所有初始化完成');

    // 延迟一点时间确保所有动画和效果准备就绪，然后移除页面加载器
    setTimeout(() => {
        ensurePageLoaderRemoval();
    }, 500);

    /**
     * 修复画廊项目结构，确保所有项目结构一致
     */
    function fixGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach((item) => {
            // 检查gallery-card是否存在
            let cardElement = item.querySelector('.gallery-card');
            if (!cardElement) {
                // 创建card元素
                cardElement = document.createElement('div');
                cardElement.className = 'gallery-card';

                // 移动内容到card
                Array.from(item.childNodes).forEach((node) => {
                    if (node.tagName === 'IMG') {
                        cardElement.appendChild(node.cloneNode(true));
                        node.remove();
                    }
                });

                item.appendChild(cardElement);
            }

            // 确保图片有正确的类名
            const img = cardElement.querySelector('img');
            if (img) {
                img.classList.add('img-fluid');
            }

            // 检查overlay是否存在
            if (!cardElement.querySelector('.gallery-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';

                const info = document.createElement('div');
                info.className = 'gallery-info';

                // 使用data属性或默认值创建标题和描述
                const title = item.getAttribute('data-title') || '作品';
                const desc =
                    item.getAttribute('data-description') || '摄影作品';

                const titleEl = document.createElement('h5');
                titleEl.textContent = title;
                info.appendChild(titleEl);

                const descEl = document.createElement('p');
                descEl.textContent = desc;
                info.appendChild(descEl);

                // 添加查看按钮
                const viewBtn = document.createElement('a');
                viewBtn.href = img ? img.src : '#';
                viewBtn.className = 'btn-view';
                viewBtn.setAttribute('data-gallery', 'gallery-all');
                viewBtn.innerHTML = '<i class="fas fa-search-plus"></i>';
                info.appendChild(viewBtn);

                overlay.appendChild(info);
                cardElement.appendChild(overlay);
            }
        });
    }

    /**
     * 确保所有图片以小正方形显示
     */
    function enforceSquareImages() {
        const galleryCards = document.querySelectorAll('.gallery-card');

        galleryCards.forEach((card) => {
            // 设置为正方形
            card.style.aspectRatio = '1/1';

            // 确保图片正确填充
            const img = card.querySelector('img');
            if (img) {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
            }
        });
    }

    /**
     * 设置过滤器功能
     */
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                // 移除所有active类
                filterButtons.forEach((btn) => btn.classList.remove('active'));

                // 添加active类到当前按钮
                button.classList.add('active');

                // 获取过滤值
                const filterValue = button.getAttribute('data-filter');

                // 处理项目的显示/隐藏
                galleryItems.forEach((item) => {
                    if (
                        filterValue === 'all' ||
                        item.getAttribute('data-category') === filterValue
                    ) {
                        item.style.display = 'block';
                        // 使用淡入效果
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        // 使用淡出效果
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });

                // 如果有AOS，刷新它
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => {
                        AOS.refresh();
                    }, 500);
                }
            });
        });
    }

    /**
     * 设置交互功能
     */
    function setupInteractions() {
        // 点赞按钮
        document.querySelectorAll('.like-btn').forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                this.classList.toggle('liked');

                if (this.classList.contains('liked')) {
                    this.innerHTML = '<i class="fas fa-heart"></i>';
                    showNotification('已添加到收藏夹');
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i>';
                    showNotification('已从收藏夹移除');
                }
            });
        });

        // 收藏按钮
        document.querySelectorAll('.save-btn').forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                this.classList.toggle('saved');

                if (this.classList.contains('saved')) {
                    this.innerHTML = '<i class="fas fa-bookmark"></i>';
                    showNotification('已保存到您的列表');
                } else {
                    this.innerHTML = '<i class="far fa-bookmark"></i>';
                    showNotification('已从您的列表移除');
                }
            });
        });

        // 3D悬停效果 - 针对方形图片优化
        document.querySelectorAll('.gallery-item').forEach((item) => {
            item.addEventListener('mousemove', function (e) {
                if (window.innerWidth <= 768) return;

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // 减小旋转角度以适应方形图片
                const rotateY = (x / rect.width - 0.5) * 4;
                const rotateX = (y / rect.height - 0.5) * -4;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }

    /**
     * 显示通知消息
     */
    function showNotification(message) {
        let notification = document.querySelector('.gallery-notification');

        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'gallery-notification';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Gallery页脚功能初始化
    initGalleryFooter();

    // 检查所有初始化是否完成
    galleryInitComplete = aosReady && glightboxReady;
    console.log('Gallery: 初始化状态', {
        aosReady,
        glightboxReady,
        galleryInitComplete,
    });

    // 延迟检查并移除页面加载器
    setTimeout(() => {
        ensurePageLoaderRemoval();
    }, 1000);
});

/**
 * Gallery页脚功能初始化
 */
function initGalleryFooter() {
    console.log('Gallery: 初始化页脚功能');

    // 初始化返回顶部按钮
    initBackToTop();

    // 初始化社交分享功能
    initSocialShare();

    // 初始化页脚导航过滤功能
    initFooterNavigation();

    // 初始化语言切换功能
    initLanguageSwitch();

    // 初始化页脚动画观察器
    initFooterAnimations();

    // 更新gallery统计数据
    updateGalleryStats();
}

/**
 * 初始化返回顶部按钮
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top-gallery');
    const backToTopBtn = document.querySelector('.btn-back-to-top');

    if (!backToTop || !backToTopBtn) return;

    // 监听滚动事件显示/隐藏按钮
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 点击返回顶部
    backToTopBtn.addEventListener('click', function () {
        // 添加涟漪效果
        const ripple = this.querySelector('.btn-ripple');
        if (ripple) {
            ripple.style.width = '60px';
            ripple.style.height = '60px';
            setTimeout(() => {
                ripple.style.width = '0';
                ripple.style.height = '0';
            }, 400);
        }

        // 平滑滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

/**
 * 初始化社交分享功能
 */
function initSocialShare() {
    const socialIcons = document.querySelectorAll('.social-icon');

    socialIcons.forEach((icon) => {
        icon.addEventListener('click', function (e) {
            const platform = this.getAttribute('data-platform');

            // GitHub链接直接跳转
            if (platform === 'github') {
                return; // 让默认行为执行
            }

            e.preventDefault();

            // 添加点击涟漪效果
            const ripple = this.querySelector('.icon-ripple');
            if (ripple) {
                ripple.style.width = '40px';
                ripple.style.height = '40px';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';

                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                    ripple.style.background = '';
                }, 400);
            }

            // 分享功能
            const currentUrl = window.location.href;
            const title = document.title;

            switch (platform) {
                case 'weibo':
                    shareToWeibo(currentUrl, title);
                    break;
                case 'wechat':
                    shareToWechat(currentUrl, title);
                    break;
                case 'instagram':
                    showInstagramInfo();
                    break;
                default:
                    console.log('未知的社交平台:', platform);
            }
        });

        // 悬浮效果增强
        icon.addEventListener('mouseenter', function () {
            const ripple = this.querySelector('.icon-ripple');
            if (ripple) {
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });

        icon.addEventListener('mouseleave', function () {
            const ripple = this.querySelector('.icon-ripple');
            if (ripple) {
                ripple.style.width = '0';
                ripple.style.height = '0';
                ripple.style.background = '';
            }
        });
    });
}

/**
 * 分享到微博
 */
function shareToWeibo(url, title) {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(
        url
    )}&title=${encodeURIComponent(title)}&pic=`;
    window.open(weiboUrl, '_blank', 'width=600,height=400');
}

/**
 * 分享到微信（显示二维码）
 */
function shareToWechat(url, title) {
    // 创建二维码分享弹窗
    const modal = document.createElement('div');
    modal.className = 'wechat-share-modal';
    modal.innerHTML = `
        <div class="modal-content" style="background: white; padding: 20px; border-radius: 10px; text-align: center; max-width: 300px;">
            <div class="modal-header" style="margin-bottom: 15px;">
                <h5 style="margin: 0; color: #333;">分享到微信</h5>
                <button class="close-btn" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
            </div>
            <div class="modal-body">
                <p style="color: #666; margin-bottom: 15px;">扫描二维码分享到微信</p>
                <div class="qr-code-placeholder" style="padding: 20px; background: #f5f5f5; border-radius: 8px; margin-bottom: 15px;">
                    <i class="fab fa-weixin" style="font-size: 2rem; color: #07c160; margin-bottom: 10px;"></i>
                    <p style="color: #999; font-size: 0.9rem; margin: 0;">请使用微信扫一扫功能<br>扫描页面URL分享</p>
                </div>
                <p class="share-url" style="font-size: 0.8rem; color: #999; word-break: break-all;">${url}</p>
            </div>
        </div>
    `;

    // 添加样式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    document.body.appendChild(modal);

    // 关闭按钮事件
    modal.querySelector('.close-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

/**
 * Instagram信息提示
 */
function showInstagramInfo() {
    showGalleryNotification('请访问我们的Instagram账号查看更多精彩作品！');
}

/**
 * 初始化页脚导航过滤功能
 */
function initFooterNavigation() {
    const navLinks = document.querySelectorAll('.nav-filter-link');

    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const filter = this.getAttribute('data-filter');

            // 添加点击动画
            this.style.transform = 'translateX(10px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // 执行过滤
            if (filter && typeof filterGalleryItems === 'function') {
                filterGalleryItems(filter);
            }

            // 滚动到gallery区域
            const gallerySection = document.querySelector('.gallery-section');
            if (gallerySection) {
                gallerySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
}

/**
 * 初始化语言切换功能
 */
function initLanguageSwitch() {
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach((option) => {
        option.addEventListener('click', function (e) {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // 键盘导航支持
        option.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * 初始化页脚动画
 */
function initFooterAnimations() {
    const footer = document.querySelector('.gallery-footer');
    if (!footer) return;

    // 创建观察器监听页脚进入视口
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('footer-in-view');

                    // 依次显示页脚元素
                    const footerElements = entry.target.querySelectorAll(
                        '.footer-brand-info, .footer-nav-section, .footer-connect-section'
                    );
                    footerElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.style.animation = `fadeInUp 0.6s ease-out ${
                                index * 0.2
                            }s both`;
                        }, 100);
                    });
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    observer.observe(footer);
}

/**
 * 更新画廊统计数据
 */
function updateGalleryStats() {
    // 统计画廊图片数量
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryCountElement = document.getElementById('gallery-count');

    if (galleryCountElement && galleryItems.length > 0) {
        // 动画更新数字
        let currentCount = 0;
        const targetCount = galleryItems.length;
        const increment = Math.ceil(targetCount / 20);

        const updateCount = () => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                currentCount = targetCount;
                galleryCountElement.textContent = `${currentCount}+`;
                return;
            }
            galleryCountElement.textContent = `${currentCount}+`;
            setTimeout(updateCount, 50);
        };

        // 延迟开始动画
        setTimeout(updateCount, 500);
    }

    // 模拟更新浏览量（实际项目中应该从服务器获取）
    const viewCountElement = document.querySelector(
        '.stat-item:last-child strong'
    );
    if (viewCountElement) {
        // 简单的浏览量增长动画
        let views = 10000;
        views += Math.floor(Math.random() * 1000);
        viewCountElement.textContent = `${(views / 1000).toFixed(1)}k+`;
    }
}

/**
 * 过滤画廊项目（与主要过滤功能集成）
 */
function filterGalleryItems(filter) {
    const items = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 更新过滤按钮状态
    filterBtns.forEach((btn) => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });

    // 执行过滤
    items.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (item.style.opacity === '0') {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });

    console.log(`Gallery: 过滤器应用 - ${filter}`);
}

/**
 * 显示Gallery专用通知
 */
function showGalleryNotification(message) {
    let notification = document.querySelector('.gallery-notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'gallery-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            font-size: 0.9rem;
        `;
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}
