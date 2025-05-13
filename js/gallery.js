// 画廊页面功能脚本

document.addEventListener("DOMContentLoaded", function () {
    // 初始化AOS动画库（如果存在）
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            offset: 100,
            delay: 50,
        });
    }

    // 初始化GLightbox（如果存在）
    if (typeof GLightbox !== "undefined") {
        GLightbox({
            selector: ".btn-view, .view-btn",
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            openEffect: "zoom",
            closeEffect: "fade",
        });
    }

    // 修复所有图片项结构，确保一致性
    fixGalleryItems();

    // 强制所有图片显示为小正方形
    enforceSquareImages();

    // 设置过滤器
    setupFilters();

    // 设置交互效果
    setupInteractions();

    /**
     * 修复画廊项目结构，确保所有项目结构一致
     */
    function fixGalleryItems() {
        const galleryItems = document.querySelectorAll(".gallery-item");

        galleryItems.forEach((item) => {
            // 检查gallery-card是否存在
            let cardElement = item.querySelector(".gallery-card");
            if (!cardElement) {
                // 创建card元素
                cardElement = document.createElement("div");
                cardElement.className = "gallery-card";

                // 移动内容到card
                Array.from(item.childNodes).forEach((node) => {
                    if (node.tagName === "IMG") {
                        cardElement.appendChild(node.cloneNode(true));
                        node.remove();
                    }
                });

                item.appendChild(cardElement);
            }

            // 确保图片有正确的类名
            const img = cardElement.querySelector("img");
            if (img) {
                img.classList.add("img-fluid");
            }

            // 检查overlay是否存在
            if (!cardElement.querySelector(".gallery-overlay")) {
                const overlay = document.createElement("div");
                overlay.className = "gallery-overlay";

                const info = document.createElement("div");
                info.className = "gallery-info";

                // 使用data属性或默认值创建标题和描述
                const title = item.getAttribute("data-title") || "作品";
                const desc = item.getAttribute("data-description") || "摄影作品";

                const titleEl = document.createElement("h5");
                titleEl.textContent = title;
                info.appendChild(titleEl);

                const descEl = document.createElement("p");
                descEl.textContent = desc;
                info.appendChild(descEl);

                // 添加查看按钮
                const viewBtn = document.createElement("a");
                viewBtn.href = img ? img.src : "#";
                viewBtn.className = "btn-view";
                viewBtn.setAttribute("data-gallery", "gallery-all");
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
        const galleryCards = document.querySelectorAll(".gallery-card");

        galleryCards.forEach((card) => {
            // 设置为正方形
            card.style.aspectRatio = "1/1";

            // 确保图片正确填充
            const img = card.querySelector("img");
            if (img) {
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "cover";
            }
        });
    }

    /**
     * 设置过滤器功能
     */
    function setupFilters() {
        const filterButtons = document.querySelectorAll(".filter-btn");
        const galleryItems = document.querySelectorAll(".gallery-item");

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                // 移除所有active类
                filterButtons.forEach((btn) => btn.classList.remove("active"));

                // 添加active类到当前按钮
                button.classList.add("active");

                // 获取过滤值
                const filterValue = button.getAttribute("data-filter");

                // 处理项目的显示/隐藏
                galleryItems.forEach((item) => {
                    if (
                        filterValue === "all" ||
                        item.getAttribute("data-category") === filterValue
                    ) {
                        item.style.display = "block";
                        // 使用淡入效果
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0)";
                        }, 50);
                    } else {
                        // 使用淡出效果
                        item.style.opacity = "0";
                        item.style.transform = "translateY(20px)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 300);
                    }
                });

                // 如果有AOS，刷新它
                if (typeof AOS !== "undefined") {
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
        document.querySelectorAll(".like-btn").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                this.classList.toggle("liked");

                if (this.classList.contains("liked")) {
                    this.innerHTML = '<i class="fas fa-heart"></i>';
                    showNotification("已添加到收藏夹");
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i>';
                    showNotification("已从收藏夹移除");
                }
            });
        });

        // 收藏按钮
        document.querySelectorAll(".save-btn").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                this.classList.toggle("saved");

                if (this.classList.contains("saved")) {
                    this.innerHTML = '<i class="fas fa-bookmark"></i>';
                    showNotification("已保存到您的列表");
                } else {
                    this.innerHTML = '<i class="far fa-bookmark"></i>';
                    showNotification("已从您的列表移除");
                }
            });
        });

        // 3D悬停效果 - 针对方形图片优化
        document.querySelectorAll(".gallery-item").forEach((item) => {
            item.addEventListener("mousemove", function (e) {
                if (window.innerWidth <= 768) return;

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // 减小旋转角度以适应方形图片
                const rotateY = (x / rect.width - 0.5) * 4;
                const rotateX = (y / rect.height - 0.5) * -4;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            item.addEventListener("mouseleave", function () {
                this.style.transform = "";
            });
        });
    }

    /**
     * 显示通知消息
     */
    function showNotification(message) {
        let notification = document.querySelector(".gallery-notification");

        if (!notification) {
            notification = document.createElement("div");
            notification.className = "gallery-notification";
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }
});
