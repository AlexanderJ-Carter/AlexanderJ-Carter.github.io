document.addEventListener("DOMContentLoaded", function () {
  // 滚动效果变量
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollProgress = document.querySelector(".scroll-progress");
  const backToTop = document.querySelector(".back-to-top");
  const themeToggleBtn = document.getElementById("theme-toggle");

  // 检查当前主题
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // 处理滚动事件
  window.addEventListener("scroll", function () {
    // 更新导航栏样式
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
      backToTop.classList.add("show");
    } else {
      navbar.classList.remove("scrolled");
      backToTop.classList.remove("show");
    }

    // 更新滚动进度条
    const scrollPercentage =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    scrollProgress.style.width = scrollPercentage + "%";

    // 更新当前活动的导航项
    updateActiveNavItem();
  });

  // 返回顶部按钮
  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 主题切换
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      this.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem("theme", "light");
      this.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  // 平滑滚动到各部分
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 获取目标部分
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          // 计算滚动位置
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;

          // 滚动到目标位置
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // 如果在移动设备上，关闭导航菜单
          if (window.innerWidth < 992) {
            const navbarCollapse = document.querySelector(".navbar-collapse");
            if (navbarCollapse.classList.contains("show")) {
              const bsCollapse = new bootstrap.Collapse(navbarCollapse);
              bsCollapse.hide();
            }
          }
        }
      }
    });
  });

  // 更新当前活动的导航项
  function updateActiveNavItem() {
    // 获取所有部分
    const sections = document.querySelectorAll("section");
    const navbarHeight = navbar.offsetHeight;

    // 确定当前滚动位置的部分
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 50;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;

      // 如果当前滚动位置在这一部分内
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const currentId = section.getAttribute("id");

        // 移除所有活动类
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // 添加活动类到当前导航项
        const activeLink = document.querySelector(
          `.nav-link[href="#${currentId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  // 页面加载时更新当前活动的导航项
  updateActiveNavItem();

  // 添加导航顶部动画效果
  const navbarBrand = document.querySelector(".navbar-brand");
  navbarBrand.addEventListener("click", function (e) {
    if (window.scrollY > 0) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  // 语言选择器的动画效果
  const languageDropdown = document.getElementById("navbarDropdown");
  if (languageDropdown) {
    languageDropdown.addEventListener("mouseenter", function () {
      const dropdownMenu = this.nextElementSibling;
      if (dropdownMenu && window.innerWidth >= 992) {
        dropdownMenu.classList.add("show");
      }
    });

    const navItem = languageDropdown.closest(".nav-item");
    navItem.addEventListener("mouseleave", function () {
      const dropdownMenu = this.querySelector(".dropdown-menu");
      if (dropdownMenu && window.innerWidth >= 992) {
        dropdownMenu.classList.remove("show");
      }
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
});
