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

  // 代码块复制功能
  document.querySelectorAll("pre code").forEach((block) => {
    // 创建复制按钮元素
    const copyButton = document.createElement("button");
    copyButton.className = "copy-code-button";
    copyButton.innerHTML = '<i class="far fa-copy"></i> 复制';

    // 设置按钮样式
    copyButton.style.position = "absolute";
    copyButton.style.top = "5px";
    copyButton.style.right = "5px";
    copyButton.style.padding = "5px 10px";
    copyButton.style.fontSize = "12px";
    copyButton.style.background = "rgba(255, 255, 255, 0.2)";
    copyButton.style.color = "white";
    copyButton.style.border = "none";
    copyButton.style.borderRadius = "4px";
    copyButton.style.cursor = "pointer";
    copyButton.style.opacity = "0";
    copyButton.style.transition = "opacity 0.3s ease";

    // 复制功能实现
    copyButton.addEventListener("click", () => {
      const code = block.textContent;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          // 更改按钮文本为"已复制"
          copyButton.innerHTML = '<i class="fas fa-check"></i> 已复制';

          // 2秒后恢复按钮文本
          setTimeout(() => {
            copyButton.innerHTML = '<i class="far fa-copy"></i> 复制';
          }, 2000);
        })
        .catch((err) => {
          console.error("复制失败: ", err);
          copyButton.innerHTML = '<i class="fas fa-times"></i> 复制失败';

          setTimeout(() => {
            copyButton.innerHTML = '<i class="far fa-copy"></i> 复制';
          }, 2000);
        });
    });

    // 将代码块设置为相对定位，以便按钮定位
    const preBlock = block.parentElement;
    preBlock.style.position = "relative";

    // 鼠标悬停时显示复制按钮
    preBlock.addEventListener("mouseenter", () => {
      copyButton.style.opacity = "1";
    });

    preBlock.addEventListener("mouseleave", () => {
      copyButton.style.opacity = "0";
    });

    // 将复制按钮添加到代码块
    preBlock.appendChild(copyButton);
  });

  // 代码块复制功能
  document.querySelectorAll("pre code").forEach((block) => {
    const copyButton = document.createElement("button");
    copyButton.className = "copy-btn";
    copyButton.innerHTML = '<i class="far fa-copy"></i>';
    copyButton.title = "复制代码";
    block.parentNode.insertBefore(copyButton, block);

    copyButton.addEventListener("click", function () {
      const code = block.textContent;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          copyButton.innerHTML = '<i class="fas fa-check"></i>';
          copyButton.classList.add("copied");

          setTimeout(() => {
            copyButton.innerHTML = '<i class="far fa-copy"></i>';
            copyButton.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("复制失败:", err);
          copyButton.innerHTML = '<i class="fas fa-times"></i>';
          setTimeout(() => {
            copyButton.innerHTML = '<i class="far fa-copy"></i>';
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
