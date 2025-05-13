// 博客页面交互脚本

document.addEventListener("DOMContentLoaded", function () {
    // 元素引用
    const blogSearch = document.getElementById("blog-search");
    const blogPosts = document.querySelectorAll("#blog-posts-container > div");
    const filterPills = document.querySelectorAll(".filter-pill");
    const sortSelect = document.getElementById("sort-select");
    const noResults = document.getElementById("no-results");
    const clearFilters = document.getElementById("clear-filters");
    const backToTop = document.getElementById("back-to-top");

    // 当前筛选标签
    let currentTag = "all";

    // 返回顶部按钮显示/隐藏逻辑
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    // 返回顶部按钮点击事件
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // 搜索功能
    blogSearch.addEventListener("input", filterBlogPosts);

    // 标签筛选功能
    filterPills.forEach((pill) => {
        pill.addEventListener("click", function () {
            // 移除所有标签的active类
            filterPills.forEach((p) => p.classList.remove("active"));

            // 添加当前标签的active类
            this.classList.add("active");

            // 更新当前标签
            currentTag = this.getAttribute("data-tag");

            // 执行筛选
            filterBlogPosts();
        });
    });

    // 排序功能
    sortSelect.addEventListener("change", sortBlogPosts);

    // 清除筛选按钮
    clearFilters.addEventListener("click", function () {
        // 重置搜索框
        blogSearch.value = "";

        // 重置标签筛选
        filterPills.forEach((p) => p.classList.remove("active"));
        document.querySelector('[data-tag="all"]').classList.add("active");
        currentTag = "all";

        // 重置排序
        sortSelect.value = "newest";

        // 显示所有文章
        blogPosts.forEach((post) => {
            post.style.display = "block";
        });

        // 隐藏无结果提示
        noResults.classList.add("d-none");

        // 执行默认排序
        sortBlogPosts();
    });

    // 筛选博客文章功能
    function filterBlogPosts() {
        const searchText = blogSearch.value.toLowerCase();
        let visible = 0;

        blogPosts.forEach((post) => {
            const title = post
                .querySelector(".blog-card-title")
                .textContent.toLowerCase();
            const content = post
                .querySelector(".blog-card-text")
                .textContent.toLowerCase();
            const tags = post.getAttribute("data-tags").toLowerCase();

            // 检查是否匹配搜索文本和标签筛选条件
            const matchSearch =
                title.includes(searchText) || content.includes(searchText);
            const matchTag =
                currentTag === "all" || tags.includes(currentTag.toLowerCase());

            if (matchSearch && matchTag) {
                post.style.display = "block";
                visible++;
            } else {
                post.style.display = "none";
            }
        });

        // 如果没有匹配结果，显示提示
        if (visible === 0) {
            noResults.classList.remove("d-none");
        } else {
            noResults.classList.add("d-none");
        }

        // 执行排序
        sortBlogPosts();
    }

    // 排序博客文章功能
    function sortBlogPosts() {
        const postsContainer = document.getElementById("blog-posts-container");
        const posts = Array.from(blogPosts);
        const sortBy = sortSelect.value;

        // 仅对可见的文章进行排序
        const visiblePosts = posts.filter((post) => post.style.display !== "none");

        switch (sortBy) {
            case "newest":
                // 按日期从新到旧排序
                visiblePosts.sort((a, b) => {
                    const dateA = getPostDate(a);
                    const dateB = getPostDate(b);
                    return dateB - dateA;
                });
                break;

            case "oldest":
                // 按日期从旧到新排序
                visiblePosts.sort((a, b) => {
                    const dateA = getPostDate(a);
                    const dateB = getPostDate(b);
                    return dateA - dateB;
                });
                break;

            // 移除按评论数量排序的功能
        }

        // 重新排列DOM元素
        visiblePosts.forEach((post) => {
            postsContainer.appendChild(post);
        });

        // 使用CSS动画效果使过渡更平滑
        visiblePosts.forEach((post, index) => {
            setTimeout(() => {
                post.style.opacity = "0";
                setTimeout(() => {
                    post.style.opacity = "1";
                }, 50);
            }, index * 50);
        });
    }

    // 获取文章发布日期
    function getPostDate(post) {
        const day = parseInt(post.querySelector(".day").textContent);
        const month = getMonthNumber(post.querySelector(".month").textContent);

        // 假设所有文章都是2023年的
        return new Date(2023, month, day).getTime();
    }

    // 获取月份对应的数字
    function getMonthNumber(monthText) {
        const months = {
            一月: 0,
            二月: 1,
            三月: 2,
            四月: 3,
            五月: 4,
            六月: 5,
            七月: 6,
            八月: 7,
            九月: 8,
            十月: 9,
            十一月: 10,
            十二月: 11,
        };

        return months[monthText] || 0;
    }

    // 博客卡片悬停效果增强
    document.querySelectorAll(".blog-card").forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px)";
            this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";

            // 让图片有轻微放大效果
            const cardImg = this.querySelector(".blog-card-img");
            if (cardImg) {
                cardImg.style.transform = "scale(1.05)";
                cardImg.style.transition = "transform 0.5s ease";
            }

            // 让阅读全文链接有轻微右移效果
            const readMoreLink = this.querySelector(".blog-card-link i");
            if (readMoreLink) {
                readMoreLink.style.transform = "translateX(5px)";
                readMoreLink.style.transition = "transform 0.3s ease";
            }
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "";
            this.style.boxShadow = "";

            // 恢复图片大小
            const cardImg = this.querySelector(".blog-card-img");
            if (cardImg) {
                cardImg.style.transform = "";
            }

            // 恢复阅读全文链接位置
            const readMoreLink = this.querySelector(".blog-card-link i");
            if (readMoreLink) {
                readMoreLink.style.transform = "";
            }
        });
    });
});

// 模拟加载动画
window.addEventListener("load", function () {
    document.body.classList.add("page-loaded");
});
