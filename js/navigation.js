// 导航栏功能增强
document.addEventListener("DOMContentLoaded", function () {
  // 导航元素
  const navbar = document.querySelector(".navbar");
  const progressBar = document.querySelector(".scroll-progress");
  const backToTopBtn = document.querySelector(".back-to-top");
  const languageDropdown = document.querySelector(".language-dropdown");
  const navLinks = document.querySelectorAll(".nav-link");

  // 滚动处理
  window.addEventListener("scroll", function () {
    // 导航栏背景透明度变化
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // 显示/隐藏返回顶部按钮
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }

    // 更新进度条
    if (progressBar) {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    }

    // 根据滚动位置突出显示当前导航项
    updateActiveNavItem();
  });

  // 返回顶部按钮点击事件
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 语言切换下拉菜单处理
  if (languageDropdown) {
    const navItem = languageDropdown.closest(".nav-item");
    navItem.addEventListener("mouseleave", function () {
      const dropdown = this.querySelector(".dropdown-menu");
      dropdown.classList.remove("show");
    });
  }

  // 导航栏响应式优化
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    }
  });

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // 更新URL但不进行滚动
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // 更新当前活动导航项
  function updateActiveNavItem() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // 初始化激活当前导航项
  updateActiveNavItem();

  // 导出导航功能
  window.navigationUtils = {
    updateActiveNavItem,
    scrollToTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  };
});
