document.addEventListener("DOMContentLoaded", function () {
  // 获取DOM元素
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const progressBar = document.querySelector(".scroll-progress");
  const backToTop = document.querySelector(".back-to-top");

  // 滚动监听
  window.addEventListener("scroll", function () {
    // 获取滚动位置
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    // 导航栏背景效果
    if (winScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // 更新进度条
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";

    // 显示/隐藏返回顶部按钮
    if (winScroll > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    // 更新当前活动链接
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (winScroll >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // 点击导航链接滚动效果
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // 返回顶部功能
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
