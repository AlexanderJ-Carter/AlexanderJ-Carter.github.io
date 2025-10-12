/**
 * 隐私政策页面脚本
 */

document.addEventListener("DOMContentLoaded", function () {
    // 滚动高亮当前段落
    const highlightCurrentSection = () => {
        const sections = document.querySelectorAll(".section-card");
        const navLinks = document.querySelectorAll(".nav-link");

        // 获取当前滚动位置
        const scrollPosition = window.scrollY;

        // 添加一些缓冲区，使高亮更友好
        const offset = 150;

        // 检查每个部分的位置
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - offset;
            const sectionBottom = sectionTop + section.offsetHeight;

            // 如果当前滚动位置在这个部分内
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // 移除所有链接的活动状态
                navLinks.forEach((link) => link.classList.remove("active"));
                // 添加活动状态到当前链接
                navLinks[index].classList.add("active");
            }
        });
    };

    // 平滑滚动到部分
    const initSmoothScroll = () => {
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();

                const targetId = this.getAttribute("href");
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // 计算目标位置，添加一些偏移量以避免内容被顶部遮挡
                    const targetPosition = targetSection.offsetTop - 80;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });

                    // 更新URL，但不触发滚动
                    history.pushState(null, null, targetId);
                }
            });
        });
    };

    // 初始化后滚动到URL指定的部分
    const scrollToHashOnLoad = () => {
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: "smooth",
                    });
                }, 100);
            }
        }
    };

    // 添加显示动画
    const addSectionAnimations = () => {
        const sections = document.querySelectorAll(".section-card");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        sections.forEach((section) => {
            section.classList.add("hidden");
            observer.observe(section);
        });
    };

    // 向CSS添加必要的动画类
    const addAnimationStyles = () => {
        const style = document.createElement("style");
        style.textContent = `
            .section-card.hidden {
                opacity: 0;
                transform: translateY(20px);
                transition: none;
            }
            
            .section-card.fade-in {
                opacity: 1;
                transform: translateY(0);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
        `;
        document.head.appendChild(style);
    };

    // 初始化函数
    const init = () => {
        // 添加滚动事件监听器，用于高亮当前部分
        window.addEventListener("scroll", highlightCurrentSection);

        // 初始化平滑滚动
        initSmoothScroll();

        // 页面加载时滚动到hash指定的部分
        scrollToHashOnLoad();

        // 添加动画样式
        addAnimationStyles();

        // 添加部分显示动画
        addSectionAnimations();

        // 初始时就执行一次高亮
        highlightCurrentSection();
    };

    // 运行初始化
    init();
});
