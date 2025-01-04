document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 更新活动按钮状态
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // 过滤作品
      const filter = btn.dataset.filter;
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "";
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
});
