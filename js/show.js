document.addEventListener("DOMContentLoaded", function () {
  // 初始化代码高亮
  hljs.highlightAll();

  // 暂停轮播当鼠标悬停在代码上
  const codeCarousel = document.getElementById("codeCarousel");
  const carousel = new bootstrap.Carousel(codeCarousel, {
    interval: 5000,
  });

  codeCarousel.addEventListener("mouseenter", () => {
    carousel.pause();
  });

  codeCarousel.addEventListener("mouseleave", () => {
    carousel.cycle();
  });
});

/**
 * 交互和动画效果展示组件
 * 用于增强用户界面交互体验和展示动态效果
 */

// 页面过渡效果
function initPageTransitions() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    const targetUrl = link ? link.getAttribute("href") : null;

    if (
      link &&
      link.hostname === window.location.hostname &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();

      // 添加页面过渡效果
      document.body.classList.add("page-transition-out");

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400);
    }
  });
}

// 初始化图片懒加载
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;

            // 创建一个临时占位符
            const placeholder = document.createElement("div");
            placeholder.className = "image-placeholder";
            img.parentNode.insertBefore(placeholder, img);

            // 加载实际图片
            const actualSrc = img.dataset.src;
            const tempImage = new Image();

            tempImage.onload = function () {
              img.src = actualSrc;
              img.removeAttribute("data-src");

              // 添加淡入效果
              img.classList.add("fade-in");

              // 移除占位符
              setTimeout(() => {
                if (placeholder.parentNode) {
                  placeholder.parentNode.removeChild(placeholder);
                }
              }, 500);

              imageObserver.unobserve(img);
            };

            tempImage.onerror = function () {
              // 加载失败时显示一个默认图片
              img.src = "img/image-placeholder.jpg";
              img.removeAttribute("data-src");

              if (placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
              }

              imageObserver.unobserve(img);
            };

            tempImage.src = actualSrc;
          }
        });
      },
      {
        rootMargin: "0px 0px 200px 0px", // 提前200px加载
      }
    );

    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // 对于不支持IntersectionObserver的浏览器提供回退方案
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.add("fade-in");
    });
  }
}

// 添加样式
const style = document.createElement("style");
style.textContent = `
  .fade-in {
    animation: fadeIn 0.8s ease forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .page-transition-out {
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.4s ease;
  }
  
  .image-placeholder {
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    animation: shimmer 1.5s linear infinite;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
  }
  
  @keyframes shimmer {
    to {
      background-position-x: -200%;
    }
  }
`;

document.head.appendChild(style);

// 初始化滚动动画
function initScrollAnimations() {
  if ("IntersectionObserver" in window) {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            elementObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((el) => elementObserver.observe(el));
  }
}

// 代码展示轮播
function initCodeCarousel() {
  const codeBlocks = document.querySelectorAll("pre code");

  if (window.hljs && codeBlocks.length > 0) {
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block);

      // 添加复制代码按钮
      const container = block.parentElement;
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-code-btn";
      copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
      copyBtn.title = "复制代码";

      copyBtn.addEventListener("click", () => {
        const code = block.textContent;
        navigator.clipboard
          .writeText(code)
          .then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
              copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
          })
          .catch((err) => {
            console.error("复制失败:", err);
            copyBtn.innerHTML = '<i class="fas fa-times"></i>';
            setTimeout(() => {
              copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
          });
      });

      container.classList.add("code-container");
      container.appendChild(copyBtn);
    });
  }
}

// 预加载资源
function preloadAssets() {
  // 预加载重要图片
  const preloadImages = [
    "img/Background.jpg",
    "img/logo.png",
    "img/AboutMe.jpg",
  ];

  preloadImages.forEach((imgPath) => {
    const img = new Image();
    img.src = imgPath;
  });

  // 预加载字体
  if ("fonts" in document) {
    Promise.all([
      document.fonts.load('1rem "Montserrat"'),
      document.fonts.load('1rem "Cardo"'),
      document.fonts.load('1rem "Roboto"'),
    ]).then(() => {
      console.log("字体预加载完成");
    });
  }
}

// 进度条逻辑
function initProgressBar() {
  window.addEventListener("scroll", () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.querySelector(".scroll-progress");
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });
}

// 作品集合过滤功能
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-card");

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // 移除所有按钮的active类
        filterBtns.forEach((b) => b.classList.remove("active"));
        // 为当前按钮添加active类
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        portfolioItems.forEach((item) => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }
}

// 导出所有功能
window.showUtils = {
  initPageTransitions,
  initLazyLoading,
  initScrollAnimations,
  initCodeCarousel,
  preloadAssets,
  initProgressBar,
  initPortfolioFilters,
};
