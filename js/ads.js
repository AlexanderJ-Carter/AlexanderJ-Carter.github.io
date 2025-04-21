/**
 * 广告页面交互脚本
 */

document.addEventListener("DOMContentLoaded", function () {
  // 价格卡片悬停效果增强
  const priceCards = document.querySelectorAll(".price-card");

  priceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("popular")) {
        this.style.transform = "translateY(-10px)";
      } else {
        this.style.transform = "translateY(-15px)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("popular")) {
        this.style.transform = "";
      } else {
        this.style.transform = "translateY(-5px)";
      }
    });
  });

  // 平滑滚动到指定位置
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop - 80,
      });
    }
  };

  // 为链接添加平滑滚动效果
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToElement(targetId);
    });
  });
});
