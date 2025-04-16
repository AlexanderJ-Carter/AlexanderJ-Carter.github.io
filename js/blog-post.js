/**
 * 博客文章页面交互脚本
 */

document.addEventListener("DOMContentLoaded", function () {
  // 阅读进度条
  window.addEventListener("scroll", function () {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("reading-progress").style.width = scrolled + "%";

    // 显示/隐藏返回顶部按钮
    if (winScroll > 300) {
      document.getElementById("scroll-top").classList.add("visible");
    } else {
      document.getElementById("scroll-top").classList.remove("visible");
    }
  });

  // 返回顶部按钮功能
  document.getElementById("scroll-top").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 平滑滚动到目录锚点
  document.querySelectorAll(".toc-list a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // 图片懒加载
  const blogImages = document.querySelectorAll(".blog-content img");
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    blogImages.forEach((img) => {
      if (img.dataset.src) {
        img.classList.add("lazy-load");
        imageObserver.observe(img);
      }
    });
  }

  // 代码块复制功能
  document.querySelectorAll("pre code").forEach((block) => {
    // 创建复制按钮
    const button = document.createElement("button");
    button.className = "copy-code-btn";
    button.innerHTML = '<i class="fas fa-copy"></i>';

    // 在代码块上添加复制按钮
    block.parentNode.classList.add("code-block-wrapper");
    block.parentNode.appendChild(button);

    // 添加复制功能
    button.addEventListener("click", function () {
      const code = block.textContent;
      navigator.clipboard.writeText(code).then(() => {
        // 提示复制成功
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      });
    });
  });

  // 估算阅读时间
  function calculateReadingTime() {
    const text = document.querySelector(".blog-content").textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 假设平均阅读速度为每分钟200字

    // 更新阅读时间显示
    const readingTimeElement = document.querySelector(
      ".post-meta-item:nth-child(2) span"
    );
    if (readingTimeElement) {
      readingTimeElement.textContent = `${readingTime}分钟阅读`;
    }
  }

  calculateReadingTime();

  // 代码高亮初始化
  if (typeof hljs !== "undefined") {
    document.querySelectorAll("pre code").forEach(function (block) {
      hljs.highlightElement(block);
    });
  }
});
