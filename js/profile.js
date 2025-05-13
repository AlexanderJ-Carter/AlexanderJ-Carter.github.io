/**
 * Profile页面JS功能
 */

// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
    // 动画效果
    animateElements();

    // 社交媒体按钮点击处理
    setupSocialLinks();
});

/**
 * 为页面元素添加动画效果
 */
function animateElements() {
    // 为技能卡片添加逐个出现的动画效果
    const skillItems = document.querySelectorAll(".skill-item");
    skillItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(() => {
            item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 100 * index);
    });
}

/**
 * 设置社交媒体链接的点击事件
 */
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll(".social-icon");

    socialLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            // 如果没有真实的链接，阻止默认行为
            if (this.getAttribute("href") === "#") {
                e.preventDefault();
                console.log("社交媒体链接点击：", this.querySelector("i").className);
                // 未来可以在这里添加显示二维码或其他功能
            }
        });
    });
}

/**
 * Profile page functionality
 */

// 显示二维码弹窗
function showQRCode(type) {
    const modal = document.getElementById(type + "Modal");

    // 使用淡入效果显示
    modal.style.opacity = "0";
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.opacity = "1";
        modal.style.transition = "opacity 0.3s ease";
    }, 10);

    // 为QR图片添加动画效果
    const qrImg = modal.querySelector(".qr-img");
    if (qrImg) {
        qrImg.style.opacity = "0";
        qrImg.style.transform = "scale(0.9)";
        setTimeout(() => {
            qrImg.style.transition = "all 0.4s ease";
            qrImg.style.opacity = "1";
            qrImg.style.transform = "scale(1)";
        }, 100);
    }

    // 禁止背景滚动
    document.body.style.overflow = "hidden";

    // 捕获焦点到模态框 - 无障碍改进
    const closeBtn = modal.querySelector(".qr-close");
    if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
    }

    // 添加键盘事件 - ESC关闭
    const keyHandler = function (event) {
        if (event.key === "Escape") {
            closeQRCode(type);
            document.removeEventListener("keydown", keyHandler);
        }
    };
    document.addEventListener("keydown", keyHandler);

    modal.onclick = function (event) {
        if (event.target === modal) {
            closeQRCode(type);
        }
    };
}

// 关闭二维码弹窗
function closeQRCode(type) {
    const modal = document.getElementById(type + "Modal");

    // 使用淡出效果关闭
    modal.style.opacity = "0";
    modal.style.transition = "opacity 0.3s ease";

    // 等待动画完成后隐藏
    setTimeout(() => {
        modal.style.display = "none";
        // 恢复背景滚动
        document.body.style.overflow = "";
    }, 300);

    // 将焦点返回到触发按钮
    const triggerButton = document.querySelector(
        `[onclick*="showQRCode('${type}')"]`
    );
    if (triggerButton) {
        triggerButton.focus();
    }
}

// 为标签添加动态效果
function enhanceBadges() {
    // 为个人标签添加不同的颜色和动态效果
    const badges = document.querySelectorAll(".badge");
    const colors = [
        {bg: "#007bff", hover: "#0056b3"}, // 蓝色
        {bg: "#6c757d", hover: "#545b62"}, // 灰色
        {bg: "#17a2b8", hover: "#117a8b"}, // 青色
        {bg: "#28a745", hover: "#1e7e34"}, // 绿色
        {bg: "#ffc107", hover: "#d39e00"}, // 黄色
    ];

    badges.forEach((badge, index) => {
        // 设置随机延迟的动画
        const delay = 300 + index * 100;
        badge.style.opacity = "0";
        badge.style.transform = "translateY(10px)";

        setTimeout(() => {
            badge.style.transition = "all 0.4s ease";
            badge.style.opacity = "1";
            badge.style.transform = "translateY(0)";
        }, delay);

        // 添加鼠标悬停效果
        const color = colors[index % colors.length];

        badge.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-3px) scale(1.05)";
            this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
        });

        badge.addEventListener("mouseleave", function () {
            this.style.transform = "";
            this.style.boxShadow = "";
        });
    });
}

// 页面加载完成后的初始化
document.addEventListener("DOMContentLoaded", function () {
    // 为所有技能进度条添加动画效果
    const skillProgress = document.querySelectorAll(".skill-progress");
    skillProgress.forEach((item, index) => {
        const width = item.style.width;
        item.style.width = "0";
        setTimeout(() => {
            item.style.transition = "width 1s ease-in-out";
            item.style.width = width;
        }, 300 + index * 150); // 增加间隔时间，使动画更明显
    });

    // 为标签添加悬停效果
    document.querySelectorAll(".badge").forEach((badge) => {
        badge.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-2px)";
            this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
        });

        badge.addEventListener("mouseleave", function () {
            this.style.transform = "";
            this.style.boxShadow = "";
        });
    });

    // 确保所有外部链接都有rel="noopener"
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        if (!link.rel || !link.rel.includes("noopener")) {
            link.rel = link.rel ? link.rel + " noopener" : "noopener";
        }
    });

    // 添加键盘无障碍支持 - 使社交图标可通过键盘操作
    document.querySelectorAll(".social-icon").forEach((icon) => {
        icon.setAttribute("role", "button");

        if (icon.getAttribute("onclick")) {
            // 添加键盘支持到带有onclick的元素
            icon.setAttribute("tabindex", "0");
            icon.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });

    // 调用标签增强函数
    enhanceBadges();

    // 为教育经历时间线添加动画
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("animated");
        }, 500 + index * 300); // 逐个显示时间线项目
    });

    // 为时间线项目添加鼠标悬停效果
    timelineItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            this.style.transform = "translateX(5px)";
        });

        item.addEventListener("mouseleave", function () {
            this.style.transform = "translateX(0)";
        });
    });
});
