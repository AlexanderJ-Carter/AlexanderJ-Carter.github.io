// 画廊页面功能脚本

document.addEventListener("DOMContentLoaded", function () {
  // 初始化AOS动画库
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // 初始化GLightbox
  const lightbox = GLightbox({
    selector: ".btn-view",
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });

  // 过滤器功能
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // 为过滤按钮添加点击事件
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 移除所有按钮的active类
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // 为当前点击的按钮添加active类
      button.classList.add("active");

      // 获取过滤类别
      const filterValue = button.getAttribute("data-filter");

      // 显示或隐藏画廊项目
      galleryItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          // 重新触发AOS动画
          setTimeout(() => {
            AOS.refresh();
          }, 100);
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // 添加滚动监听，以触发导航高亮
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      document.querySelector(".navbar").classList.add("navbar-scrolled");
    } else {
      document.querySelector(".navbar").classList.remove("navbar-scrolled");
    }
  });

  // 回到顶部按钮功能
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 初始化页面加载器
  window.addEventListener("load", function () {
    document.querySelector(".page-loader").classList.add("loaded");
    setTimeout(function () {
      document.querySelector(".page-loader").style.display = "none";
    }, 500);
  });
});
