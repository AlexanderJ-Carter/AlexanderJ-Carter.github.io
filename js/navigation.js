document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const progressBar = document.querySelector(".scroll-progress");

  // 更新导航高亮
  function updateActiveLink() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 10;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
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

  // 更新进度条
  function updateProgress() {
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // 滚动事件监听
  window.addEventListener("scroll", () => {
    updateActiveLink();
    updateProgress();

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 点击导航链接平滑滚动
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      const targetPosition = targetSection.offsetTop - navbar.offsetHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // 初始化
  updateActiveLink();
  updateProgress();
});

// 添加语言切换相关功能
document.addEventListener("DOMContentLoaded", function () {
  const langItems = document.querySelectorAll(".lang-item");
  const currentLang = document.querySelector(".current-lang");

  langItems.forEach((item) => {
    item.addEventListener("click", function () {
      // 更新当前语言显示
      currentLang.textContent = this.textContent.trim();

      // 更新活动状态
      langItems.forEach((li) => li.classList.remove("active"));
      this.classList.add("active");

      // 存储语言选择
      localStorage.setItem("selectedLanguage", this.getAttribute("href"));
    });
  });
});
