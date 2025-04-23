// 高级交互与动画效果

document.addEventListener("DOMContentLoaded", function () {
  // 初始化AOS动画库
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // 初始化Vanilla Tilt
  initVanillaTilt();

  // 初始化粒子效果
  initParticles();

  // 初始化导航栏滚动效果
  initNavbarScroll();

  // 初始化滚动平滑效果
  initSmoothScroll();

  // 初始化作品集筛选
  initPortfolioFilter();

  // 初始化灯箱效果
  initLightbox();

  // 3D视差效果
  initParallaxEffect();

  // 添加页面加载器
  addPageLoader();
});

// 初始化3D倾斜效果
function initVanillaTilt() {
  if (window.innerWidth > 768) {
    const cardElements = document.querySelectorAll(".card-3d, .glass-card");
    if (cardElements.length > 0 && typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(cardElements, {
        max: 5,
        speed: 300,
        glare: true,
        "max-glare": 0.1,
      });
    }
  }
}

// 初始化粒子效果
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    // 为英雄区域添加粒子
    if (document.querySelector(".hero-particles")) {
      particlesJS("hero-particles", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
        },
        retina_detect: true,
      });
    }

    // 为页脚添加粒子
    if (document.querySelector(".footer-particles")) {
      particlesJS("footer-particles", {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.2, random: false },
          size: { value: 2, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "repulse" },
            resize: true,
          },
        },
        retina_detect: true,
      });
    }
  }
}

// 导航栏滚动效果
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const scrollProgress = document.querySelector(".scroll-progress");

  if (navbar) {
    window.addEventListener("scroll", function () {
      // 导航栏背景变化
      if (window.scrollY > 100) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }

      // 滚动进度条
      if (scrollProgress) {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
      }
    });
  }
}

// 滚动平滑效果
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // 如果在小屏幕上且导航菜单是展开的，点击后关闭导航菜单
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (
          window.innerWidth < 992 &&
          navbarCollapse.classList.contains("show")
        ) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });
}

// 作品集筛选功能
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // 移除所有按钮的active类
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // 给当前按钮添加active类
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // 筛选项目
        portfolioItems.forEach((item) => {
          if (filterValue === "all") {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 100);
          } else {
            if (item.getAttribute("data-category").includes(filterValue)) {
              item.style.display = "block";
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
              }, 100);
            } else {
              item.style.opacity = "0";
              item.style.transform = "scale(0.8)";
              setTimeout(() => {
                item.style.display = "none";
              }, 300);
            }
          }
        });
      });
    });
  }
}

// 灯箱效果
function initLightbox() {
  const lightbox = GLightbox({
    selector: ".portfolio-link",
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });
}

// 3D视差效果
function initParallaxEffect() {
  document.addEventListener("mousemove", (e) => {
    const parallaxElements = document.querySelectorAll(
      ".parallax-hero, .about-image, .feature-item, .service-card"
    );

    if (window.innerWidth > 992) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      parallaxElements.forEach((el) => {
        const depth = 20;
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;

        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    }
  });

  // 滚动视差效果
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    const parallaxSections = document.querySelectorAll(".parallax-section");

    parallaxSections.forEach((section) => {
      const speed = 0.5;
      section.style.backgroundPositionY = `${scrollPosition * speed}px`;
    });
  });
}

// 预加载图片函数
function preloadImages(sources, callback) {
  let counter = 0;

  function onLoad() {
    counter++;
    if (counter >= sources.length && callback) {
      callback();
    }
  }

  for (let i = 0; i < sources.length; i++) {
    const img = new Image();
    img.onload = onLoad;
    img.onerror = onLoad;
    img.src = sources[i];
  }
}

// 页面加载优化
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // 延迟加载不重要的资源
  setTimeout(() => {
    const lazyScripts = document.querySelectorAll("script[data-src]");
    lazyScripts.forEach((script) => {
      script.src = script.getAttribute("data-src");
    });
  }, 2000);

  // 添加按钮点击波纹效果
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 添加页脚淡入效果
  const footerElements = document.querySelectorAll(
    ".site-footer .footer-content > div"
  );
  footerElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("footer-fade-in");
    }, 300 + index * 150);
  });

  // 鼠标移动时对卡片添加光影效果
  const cards = document.querySelectorAll(".glass-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.setProperty("--x-pos", `${x}px`);
      this.style.setProperty("--y-pos", `${y}px`);
    });
  });

  // 滚动到顶部按钮
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });
  }

  // 运行新增的增强功能
  enhanceImageLoading();
  fixTextOverlap();
  enhanceNavigation();
  enhanceInteractionHints();
  fixParticleContainers();
  handleMediaQueries();
  setupDarkModeDetection(); // 新增自动检测系统暗黑模式偏好

  // 移除页面加载器
  const pageLoader = document.querySelector(".page-loader");
  if (pageLoader) {
    pageLoader.classList.add("loaded");
    setTimeout(() => {
      pageLoader.remove();
    }, 500);
  }
});

// 暗黑模式切换
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    toggleDarkMode();
  });

  // 检查用户之前的主题偏好
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    applyDarkMode();
  } else if (savedTheme === "light") {
    applyLightMode();
  } else {
    // 如果没有保存过偏好，则检查系统偏好
    checkSystemThemePreference();
  }
}

// 新增：检测系统暗黑模式偏好
function setupDarkModeDetection() {
  // 检查系统偏好
  checkSystemThemePreference();

  // 监听系统偏好变化
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (darkModeMediaQuery.addEventListener) {
      darkModeMediaQuery.addEventListener("change", (e) => {
        // 仅当用户没有手动设置偏好时，才跟随系统变化
        if (!localStorage.getItem("theme")) {
          if (e.matches) {
            applyDarkMode(false); // false表示不保存到localStorage
          } else {
            applyLightMode(false);
          }
        }
      });
    }
  }
}

// 检查系统主题偏好
function checkSystemThemePreference() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme")
  ) {
    applyDarkMode(false);
  }
}

// 切换暗黑模式
function toggleDarkMode() {
  if (document.body.classList.contains("dark-mode")) {
    applyLightMode();
  } else {
    applyDarkMode();
  }
}

// 应用暗黑模式
function applyDarkMode(savePreference = true) {
  document.body.classList.add("dark-mode");

  // 切换图标
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  if (savePreference) {
    localStorage.setItem("theme", "dark");
  }

  // 触发自定义事件，通知其他组件主题已改变
  document.dispatchEvent(
    new CustomEvent("themeChanged", {
      detail: { theme: "dark" },
    })
  );
}

// 应用亮色模式
function applyLightMode(savePreference = true) {
  document.body.classList.remove("dark-mode");

  // 切换图标
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  if (savePreference) {
    localStorage.setItem("theme", "light");
  }

  // 触发自定义事件，通知其他组件主题已改变
  document.dispatchEvent(
    new CustomEvent("themeChanged", {
      detail: { theme: "light" },
    })
  );
}

// 检测视窗可见性变化
document.addEventListener("visibilitychange", function () {
  const title = document.title;
  const siteName = "Alexander James Carter";

  if (document.hidden) {
    document.title = `👋 欢迎回来 | ${siteName}`;
  } else {
    document.title = title;
  }
});

// 添加打字机效果
function typeWriter(element, text, speed = 50, callback) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

// 添加页面加载进度条
(function () {
  // 创建进度条元素
  const progressBar = document.createElement("div");
  progressBar.classList.add("page-load-progress");
  document.body.appendChild(progressBar);

  // 获取资源总数
  const resourceCount = performance.getEntriesByType("resource").length;
  let loadedCount = 0;

  // 更新进度条
  function updateProgress() {
    loadedCount++;
    const progress = (loadedCount / resourceCount) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      setTimeout(() => {
        progressBar.classList.add("complete");
        setTimeout(() => {
          progressBar.remove();
        }, 500);
      }, 500);
    }
  }

  // 监听资源加载
  window.addEventListener("load", () => {
    updateProgress();
  });

  // 给每个资源添加加载事件
  performance.getEntriesByType("resource").forEach(() => {
    updateProgress();
  });
})();

// 优化图片加载
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // 降级处理，直接加载所有图片
    images.forEach((img) => {
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
    });
  }
});

// 添加交互提示
function addInteractionHints() {
  // 向可滚动区域添加提示
  const scrollableElements = document.querySelectorAll(".scrollable");
  scrollableElements.forEach((el) => {
    const hint = document.createElement("div");
    hint.classList.add("scroll-hint");
    hint.innerHTML = '<i class="fas fa-chevron-down"></i>';
    el.appendChild(hint);

    el.addEventListener("scroll", () => {
      if (el.scrollTop > 20) {
        hint.classList.add("hidden");
      }
    });
  });
}

// 调用函数
addInteractionHints();

// 修复图片加载问题
function enhanceImageLoading() {
  const images = document.querySelectorAll("img:not([data-src])");

  images.forEach((img) => {
    // 为每个图片添加加载错误处理
    img.onerror = function () {
      this.onerror = null;
      this.src = "img/placeholder.jpg"; // 替换为默认图片
      this.classList.add("img-error");
      console.log(`Image failed to load: ${this.src}`);
    };

    // 为图片添加加载完成事件
    img.onload = function () {
      this.classList.add("loaded");

      // 移除可能的占位符
      const parent = this.parentNode;
      const placeholder = parent.querySelector(".img-placeholder");
      if (placeholder) {
        placeholder.style.opacity = "0";
        setTimeout(() => {
          placeholder.remove();
        }, 300);
      }
    };

    // 对已经加载的图片触发onload事件
    if (img.complete) {
      img.onload();
    }
  });

  // 处理延迟加载的图片
  const lazyImages = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // 添加占位符
          const parent = img.parentNode;
          if (!parent.querySelector(".img-placeholder")) {
            const placeholder = document.createElement("div");
            placeholder.className = "img-placeholder";
            parent.prepend(placeholder);
          }

          // 设置加载错误处理
          img.onerror = function () {
            this.onerror = null;
            this.src = "img/placeholder.jpg";
            this.classList.add("img-error");
            console.log(
              `Lazy image failed to load: ${this.getAttribute("data-src")}`
            );
          };

          // 设置加载完成处理
          img.onload = function () {
            this.classList.add("loaded");

            // 移除占位符
            const placeholder = parent.querySelector(".img-placeholder");
            if (placeholder) {
              placeholder.style.opacity = "0";
              setTimeout(() => {
                placeholder.remove();
              }, 300);
            }
          };

          // 开始加载图片
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");

          // 停止观察这个元素
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1,
    }
  );

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
}

// 修复文本重叠问题
function fixTextOverlap() {
  const checkTextOverflow = () => {
    const textContainers = document.querySelectorAll(
      ".text-content, .card-title, h1, h2, h3, p"
    );

    textContainers.forEach((container) => {
      // 检查文本是否溢出
      if (container.scrollHeight > container.clientHeight) {
        container.classList.add("text-overflow");

        // 调整字体大小
        const currentSize = parseFloat(
          window.getComputedStyle(container).fontSize
        );
        container.style.fontSize = `${currentSize * 0.95}px`;
      }
    });
  };

  // 初始检查
  setTimeout(checkTextOverflow, 500);

  // 窗口大小改变时重新检查
  window.addEventListener("resize", checkTextOverflow);
}

// 修复导航栏问题
function enhanceNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  // 初始激活当前导航链接
  function updateActiveNav() {
    const scrollPosition = window.scrollY;

    // 获取所有锚点对应的区域
    const sections = Array.from(navLinks)
      .map((link) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#") && href !== "#") {
          const section = document.querySelector(href);
          if (section) {
            return {
              id: href,
              element: section,
              link: link,
              offset: section.offsetTop - 100,
              height: section.offsetHeight,
            };
          }
        }
        return null;
      })
      .filter(Boolean);

    // 找到当前滚动位置对应的区域
    let currentSection = null;

    for (const section of sections) {
      if (
        scrollPosition >= section.offset &&
        scrollPosition < section.offset + section.height
      ) {
        currentSection = section;
        break;
      }
    }

    // 如果没有找到匹配的区域，检查是否在页面顶部
    if (!currentSection && scrollPosition < 100) {
      currentSection = sections.find((s) => s.id === "#intro");
    }

    // 更新激活状态
    navLinks.forEach((link) => link.classList.remove("active"));
    if (currentSection) {
      currentSection.link.classList.add("active");
    }
  }

  // 页面加载时和滚动时更新导航激活状态
  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav);

  // 平滑滚动效果增强
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#") && href !== "#") {
        e.preventDefault();

        const targetSection = document.querySelector(href);
        if (targetSection) {
          const headerHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // 在移动设备上关闭菜单
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }
        }
      }
    });
  });
}

// 增强交互提示
function enhanceInteractionHints() {
  // 创建一个向下滚动提示
  const introSection = document.getElementById("intro");
  if (introSection) {
    const scrollHint = document.createElement("div");
    scrollHint.className = "scroll-hint";
    scrollHint.innerHTML = '<i class="fas fa-chevron-down"></i>';
    introSection.appendChild(scrollHint);

    // 滚动时隐藏提示
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollHint.classList.add("hidden");
      } else {
        scrollHint.classList.remove("hidden");
      }
    });
  }
}

// 修复粒子效果容器
function fixParticleContainers() {
  const fixContainer = (selector) => {
    const container = document.querySelector(selector);
    if (container) {
      const parentElement = container.parentElement;
      if (parentElement) {
        // 确保父元素有相对定位
        const position = window.getComputedStyle(parentElement).position;
        if (position !== "relative" && position !== "absolute") {
          parentElement.style.position = "relative";
        }
      }
    }
  };

  fixContainer(".hero-particles");
  fixContainer(".footer-particles");
}

// 媒体查询更新
function handleMediaQueries() {
  const updateForScreenSize = () => {
    const width = window.innerWidth;
    const elements = document.querySelectorAll("[data-aos]");

    // 在小屏幕上禁用AOS动画
    if (width < 768) {
      elements.forEach((el) => {
        el.setAttribute("data-aos-disabled", "true");
      });
    } else {
      elements.forEach((el) => {
        el.removeAttribute("data-aos-disabled");
      });
    }
  };

  // 初始检查
  updateForScreenSize();

  // 窗口大小改变时更新
  window.addEventListener("resize", updateForScreenSize);
}

// 添加页面加载器
function addPageLoader() {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
    <div class="loader-content">
      <div class="spinner"></div>
      <p>正在加载精彩内容...</p>
    </div>
  `;
  document.body.prepend(loader);
}
